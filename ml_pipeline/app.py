from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
import os

app = Flask(__name__)
# Enable CORS so Next.js frontend can call it
CORS(app)

model_path = os.path.join(os.path.dirname(__file__), 'anomaly_model.pkl')

try:
    model = joblib.load(model_path)
    print("Model loaded successfully.")
except Exception as e:
    print(f"Error loading model: {e}")
    model = None

@app.route('/predict', methods=['POST'])
def predict():
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

        # Isolation forest expects 2D array: [[mq6, mq7, temp, hum]]
        features = np.array([[mq6, mq7, temp, hum]])
        
        prediction = model.predict(features)
        
        # -1 = Anomaly, 1 = Normal
        is_anomaly = True if prediction[0] == -1 else False
        
        # Get decision function for an anomaly "score" (lower is more anomalous)
        score = float(model.decision_function(features)[0])

        return jsonify({
            "is_anomaly": is_anomaly,
            "anomaly_score": score,
            "sensor_data": {
                "mq6_gas": mq6,
                "mq7_gas": mq7,
                "temperature": temp,
                "humidity": hum
            }
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route('/health', methods=['GET'])
def health():
    return jsonify({"status": "healthy", "model_loaded": model is not None})

if __name__ == '__main__':
    # Run on port 5001 to avoid conflicting with next.js or other services on 5000 if any
    app.run(host='0.0.0.0', port=5001, debug=True)
