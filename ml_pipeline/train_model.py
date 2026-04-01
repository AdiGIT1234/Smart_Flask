import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
import joblib
import os

print("Loading real sensor dataset...")
data_path = os.path.join(os.path.dirname(__file__), 'real_sensor_data.csv')

try:
    data = pd.read_csv(data_path)
except Exception as e:
    print(f"Error loading dataset: {e}")
    exit(1)

# Features from the dataset
features = ['mq6_gas', 'mq7_gas', 'temperature', 'humidity']
X = data[features]

# We will map the 'label' from string to numeric classes for training
# Safe -> 0
# Warning -> 1
# Danger -> 2
label_mapping = {'Safe': 0, 'Warning': 1, 'Danger': 2}
y = data['label'].map(label_mapping)

print(f"Training Random Forest model on {len(X)} samples with Multi-Class classification...")
model = RandomForestClassifier(n_estimators=100, random_state=42)

model.fit(X, y)

# Evaluate performance on dataset
predictions = model.predict(X)
correct = np.sum(predictions == y)
accuracy = correct / len(data)
print(f"Model Training completed.\nTraining Accuracy: {accuracy * 100:.2f}%")

# Save model using joblib
model_path = os.path.join(os.path.dirname(__file__), 'anomaly_model.pkl')
joblib.dump(model, model_path)
print(f"Model saved to {model_path}")
