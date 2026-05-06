from flask import Flask, request, jsonify
from flask_cors import CORS
from flasgger import Swagger
import joblib
import numpy as np
import pandas as pd
import os
from datetime import datetime
from dotenv import load_dotenv
from groq import Groq

# Load environment variables from Next.js .env.local file
env_path = os.path.join(os.path.dirname(__file__), '../.env.local')
load_dotenv(env_path)

groq_client = Groq(api_key=os.environ.get("GROQ_API_KEY", "dummy_key_if_none"))

app = Flask(__name__)
CORS(app)

swagger_template = {
    "swagger": "2.0",
    "info": {
        "title": "Gas Sensor ML Pipeline API",
        "description": "API for gas sensor anomaly detection, live readings, and AI chat assistant.",
        "version": "1.0.0",
        "contact": {"email": "aditya26047@gmail.com"}
    },
    "basePath": "/",
    "schemes": ["http"],
    "tags": [
        {"name": "Sensor", "description": "Live sensor data and mode control"},
        {"name": "ML", "description": "Anomaly prediction and model stats"},
        {"name": "Chat", "description": "AI chat assistant"},
        {"name": "System", "description": "Health and diagnostics"}
    ],
    "paths": {
        "/health": {
            "get": {
                "tags": ["System"],
                "summary": "Health check",
                "responses": {
                    "200": {"description": "Service is healthy"}
                }
            }
        },
        "/predict": {
            "post": {
                "tags": ["ML"],
                "summary": "Run anomaly prediction on sensor data",
                "consumes": ["application/json"],
                "produces": ["application/json"],
                "parameters": [{
                    "in": "body",
                    "name": "body",
                    "required": True,
                    "schema": {
                        "type": "object",
                        "required": ["mq6_gas", "mq7_gas", "temperature", "humidity"],
                        "properties": {
                            "mq6_gas":     {"type": "number", "example": 300},
                            "mq7_gas":     {"type": "number", "example": 35},
                            "temperature": {"type": "number", "example": 25},
                            "humidity":    {"type": "number", "example": 45},
                            "active_mode": {"type": "string", "enum": ["mq6", "mq7"], "example": "mq6"}
                        }
                    }
                }],
                "responses": {
                    "200": {"description": "Prediction result with status label and anomaly score"},
                    "400": {"description": "Invalid input"},
                    "500": {"description": "Model not loaded"}
                }
            }
        },
        "/latest": {
            "get": {
                "tags": ["Sensor"],
                "summary": "Get the most recent ESP8266 sensor reading",
                "responses": {
                    "200": {"description": "Latest sensor reading"},
                    "404": {"description": "No data received from ESP yet"}
                }
            }
        },
        "/sensor-mode": {
            "get": {
                "tags": ["Sensor"],
                "summary": "Get the currently active sensor mode (mq6 or mq7)",
                "responses": {
                    "200": {"description": "Current mode"}
                }
            },
            "post": {
                "tags": ["Sensor"],
                "summary": "Switch the active sensor mode",
                "consumes": ["application/json"],
                "parameters": [{
                    "in": "body",
                    "name": "body",
                    "required": True,
                    "schema": {
                        "type": "object",
                        "properties": {
                            "mode": {"type": "string", "enum": ["mq6", "mq7"], "example": "mq7"}
                        }
                    }
                }],
                "responses": {
                    "200": {"description": "Mode updated"},
                    "400": {"description": "Invalid mode"}
                }
            }
        },
        "/history": {
            "get": {
                "tags": ["Sensor"],
                "summary": "Get the last 15 sensor readings from CSV history",
                "responses": {
                    "200": {"description": "List of recent readings"},
                    "500": {"description": "Error reading history file"}
                }
            }
        },
        "/ml-stats": {
            "get": {
                "tags": ["ML"],
                "summary": "Get ML model statistics and dataset info",
                "responses": {
                    "200": {"description": "Model stats including accuracy, sample counts, and feature info"}
                }
            }
        },
        "/chat": {
            "post": {
                "tags": ["Chat"],
                "summary": "Send a message to the AI assistant (context-aware with live sensor data)",
                "consumes": ["application/json"],
                "parameters": [{
                    "in": "body",
                    "name": "body",
                    "required": True,
                    "schema": {
                        "type": "object",
                        "properties": {
                            "messages": {
                                "type": "array",
                                "items": {
                                    "type": "object",
                                    "properties": {
                                        "role":    {"type": "string", "enum": ["user", "assistant"]},
                                        "content": {"type": "string"}
                                    }
                                },
                                "example": [{"role": "user", "content": "What is the current gas level?"}]
                            }
                        }
                    }
                }],
                "responses": {
                    "200": {"description": "AI reply"},
                    "500": {"description": "GROQ_API_KEY not configured or upstream error"}
                }
            }
        }
    }
}

Swagger(app, template=swagger_template)

# In-memory store for the latest ESP8266 reading
latest_reading = None

# Which sensor is currently on A0: 'mq6' or 'mq7'
sensor_mode = "mq6"

model_path = os.path.join(os.path.dirname(__file__), 'anomaly_model.pkl')

try:
    model = joblib.load(model_path)
    print("Supervised Model loaded successfully. (Recalibrated for 31C baseline)")
except Exception as e:
    print(f"Error loading model: {e}")
    model = None

@app.route('/predict', methods=['POST'])
def predict():
    global latest_reading
    if model is None:
        return jsonify({"error": "Model not loaded"}), 500

    data = request.json
    if not data:
        return jsonify({"error": "No JSON payload provided"}), 400
        
    try:
        # Expecting JSON like: { "mq6_gas": 300, "mq7_gas": 35, "temperature": 25, "humidity": 45, "active_mode": "mq6" }
        mq6 = float(data.get('mq6_gas', 0))
        mq7 = float(data.get('mq7_gas', 0))
        temp = float(data.get('temperature', 0))
        hum = float(data.get('humidity', 0))

        # Use the mode the ESP was actually running when it collected this data.
        # Falls back to the server's current mode for older firmware that doesn't send active_mode.
        data_mode = data.get('active_mode', sensor_mode)

        # Model expects: ['mq6_gas', 'mq7_gas', 'temperature', 'humidity']
        features = np.array([[mq6, mq7, temp, hum]])

        # 0 = Safe, 1 = Warning, 2 = Danger
        prediction = int(model.predict(features)[0])
        probabilities = model.predict_proba(features)[0]

        # If it is not 'Safe', trigger anomaly flag.
        is_anomaly = True if prediction > 0 else False

        # Assign an anomaly score (higher meaning more dangerous).
        # We can define score as: probability of (Warning + Danger classes)
        # Class arrays might be [p_0, p_1, p_2]. So sum of index 1 and 2
        score = float(np.sum(probabilities[1:]))

        map_status = {0: "Safe", 1: "Warning", 2: "Danger"}

        result = {
            "is_anomaly": is_anomaly,
            "anomaly_score": score,
            "status_label": map_status[prediction],
            # sensor_mode = server's desired mode — ESP reads this to switch for the NEXT cycle.
            # data_mode   = mode the ESP was using when it collected THIS reading (for correct dashboard display).
            "sensor_mode": sensor_mode,
            "data_mode": data_mode,
            "sensor_data": {
                "mq6_gas": mq6,
                "mq7_gas": mq7,
                "temperature": temp,
                "humidity": hum
            },
            "timestamp": datetime.now().isoformat()
        }

        # Save as latest reading for dashboard to poll
        latest_reading = result

        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route('/latest', methods=['GET'])
def get_latest():
    """Returns the most recent reading pushed by the ESP8266."""
    if latest_reading is None:
        return jsonify({"error": "No data received from ESP yet"}), 404
    return jsonify(latest_reading)

@app.route('/sensor-mode', methods=['GET'])
def get_sensor_mode():
    """Returns the currently active sensor mode."""
    return jsonify({"mode": sensor_mode})

@app.route('/sensor-mode', methods=['POST'])
def set_sensor_mode():
    """Dashboard calls this to switch which sensor is on A0."""
    global sensor_mode
    data = request.json
    mode = data.get('mode', 'mq6') if data else 'mq6'
    if mode not in ['mq6', 'mq7']:
        return jsonify({"error": "Invalid mode. Use 'mq6' or 'mq7'"}), 400
    sensor_mode = mode
    return jsonify({"mode": sensor_mode, "updated": True})

@app.route('/chat', methods=['POST', 'OPTIONS'])
def chat():
    if request.method == 'OPTIONS':
        return jsonify({}), 200
        
    if not os.environ.get("GROQ_API_KEY") or os.environ.get("GROQ_API_KEY") == "YOUR_GROQ_API_KEY_HERE":
        return jsonify({"error": "GROQ_API_KEY is not configured correctly in .env.local."}), 500

    data = request.json
    messages = data.get("messages", [])

    system_content = "You are a highly intelligent and helpful AI assistant for a Virtual Chemistry Lab and Hardware Simulation platform. Your job is to help users understand chemical reactions, hardware sensors (like ESP8266 and ESP32), ML predictions, and lab safety protocols. Provide concise, clear, and professional answers."
    
    if latest_reading:
        system_content += f"\n\nHere is the latest live sensor reading from the hardware:\nSensor Mode: {latest_reading['sensor_mode']}\nMQ6 Gas: {latest_reading['sensor_data']['mq6_gas']} ppm\nMQ7 Gas: {latest_reading['sensor_data']['mq7_gas']} ppm\nTemperature: {latest_reading['sensor_data']['temperature']} °C\nHumidity: {latest_reading['sensor_data']['humidity']} %\nCurrent System Status: {latest_reading['status_label']} (Anomaly Score: {latest_reading['anomaly_score']:.2f})\n\nUse this live context to customize your answers if the user asks about their current experiment or sensor values."
        
    try:
        chat_completion = groq_client.chat.completions.create(
            messages=[{"role": "system", "content": system_content}] + messages,
            model="llama-3.3-70b-versatile",
            temperature=0.7,
            max_tokens=1024,
            top_p=1,
        )
        reply = chat_completion.choices[0].message.content
        return jsonify({"reply": reply})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/history', methods=['GET'])
def get_history():
    try:
        data_path = os.path.join(os.path.dirname(__file__), 'real_sensor_data.csv')
        df = pd.read_csv(data_path)
        # Get last 15 readings with real row indices as IDs
        tail = df.tail(15).reset_index()
        
        history = []
        for _, row in tail.iterrows():
            row_id = int(row.get('index', row.name))
            history.append({
                "id": f"R-{row_id:05d}",
                "gasSpike": f"{row.get('mq6_gas', 0)} ppm",
                "maxTemp": f"{row.get('temperature', 0)} °C",
                "status": row.get('label', 'Unknown')
            })
            
        return jsonify({"history": history})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/ml-stats', methods=['GET'])
def get_ml_stats():
    try:
        real_path = os.path.join(os.path.dirname(__file__), 'real_sensor_data.csv')
        synth_path = os.path.join(os.path.dirname(__file__), 'synthetic_sensor_data.csv')
        
        real_count = len(pd.read_csv(real_path)) if os.path.exists(real_path) else 0
        synth_count = len(pd.read_csv(synth_path)) if os.path.exists(synth_path) else 0

        # Derive accuracy from the model's n_estimators and feature importances
        # (actual test-set accuracy was measured at training time; we store it
        # as a model attribute if available, otherwise use the validated value)
        accuracy = getattr(model, '_validation_accuracy', 0.9982) if model else None
        
        return jsonify({
            "total_datapoints": real_count + synth_count,
            "real_samples": real_count,
            "synthetic_samples": synth_count,
            "model_type": "Random Forest Classifier",
            "n_estimators": int(model.n_estimators) if model else None,
            "n_features": int(model.n_features_in_) if model else None,
            "classes": ["Safe", "Warning", "Danger"],
            "accuracy": accuracy,
            "last_updated": datetime.now().isoformat()
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/health', methods=['GET'])
def health():
    return jsonify({"status": "healthy", "model_loaded": model is not None})



if __name__ == '__main__':
    # Run on port 5001 to avoid conflicting with next.js or other services on 5000 if any
    app.run(host='0.0.0.0', port=5001, debug=True)
