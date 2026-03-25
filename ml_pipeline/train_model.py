import pandas as pd
import numpy as np
from sklearn.ensemble import IsolationForest
import joblib
import os

print("Loading dataset...")
data_path = os.path.join(os.path.dirname(__file__), 'synthetic_sensor_data.csv')

try:
    data = pd.read_csv(data_path)
except Exception as e:
    print(f"Error loading dataset: {e}")
    exit(1)

# The features are the sensor readings expected from ESP32
features = ['mq6_gas', 'mq7_gas', 'temperature', 'humidity']
X = data[features]

print(f"Training Isolation Forest model on {len(X)} samples...")
# Isolation forest for anomaly detection
# contamination is the expected percentage of anomalies in the dataset
model = IsolationForest(n_estimators=100, contamination=0.05, random_state=42)

model.fit(X)

# Evaluate performance on synthetic dataset
predictions = model.predict(X)
# In IsolationForest: -1 is anomaly, 1 is normal. Let's map it to 1 = anomaly, 0 = normal
predictions = np.where(predictions == -1, 1, 0)
actual = data['is_anomaly']

correct = np.sum(predictions == actual)
accuracy = correct / len(data)
print(f"Model Training completed.\nTraining Accuracy on synthetic labels: {accuracy * 100:.2f}%")

# Save model using joblib
model_path = os.path.join(os.path.dirname(__file__), 'anomaly_model.pkl')
joblib.dump(model, model_path)
print(f"Model saved to {model_path}")
