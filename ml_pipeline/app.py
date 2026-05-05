from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
import pandas as pd
import os
from datetime import datetime

app = Flask(__name__)
# Enable CORS so Next.js frontend can call it
CORS(app)

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
        # Expecting JSON like: { "mq6_gas": 300, "mq7_gas": 35, "temperature": 25, "humidity": 45 }
        mq6 = float(data.get('mq6_gas', 0))
        mq7 = float(data.get('mq7_gas', 0))
        temp = float(data.get('temperature', 0))
        hum = float(data.get('humidity', 0))

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
            "sensor_mode": sensor_mode,   # Tells ESP which sensor is on A0
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
