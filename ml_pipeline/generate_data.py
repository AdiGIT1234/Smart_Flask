import pandas as pd
import numpy as np
import os

# Set random seed for reproducibility
np.random.seed(42)

# Parameters
NUM_SAMPLES = 5000
ANOMALY_RATE = 0.05  # 5% of data will be simulated gas/temp leaks

# Generate normal data
# MQ6 (LPG, Butane): normal range ~200-400 ppm (analog value roughly 100-300 in some calibratons, let's use 200-400)
# MQ7 (Carbon Monoxide): normal range ~20-50 ppm
# DHT11 Temperature: normal room/lab temp ~20-30 C
# DHT11 Humidity: normal ~30-60 %

mq6_normal = np.random.normal(loc=300, scale=30, size=NUM_SAMPLES)
mq7_normal = np.random.normal(loc=35, scale=5, size=NUM_SAMPLES)
temp_normal = np.random.normal(loc=31, scale=2, size=NUM_SAMPLES)
hum_normal = np.random.normal(loc=45, scale=5, size=NUM_SAMPLES)

data = pd.DataFrame({
    'mq6_gas': mq6_normal,
    'mq7_gas': mq7_normal,
    'temperature': temp_normal,
    'humidity': hum_normal,
    'label': 'Safe',
    'is_anomaly': 0
})

# Inject anomalies
num_anomalies = int(NUM_SAMPLES * ANOMALY_RATE)
anomaly_indices = np.random.choice(data.index, num_anomalies, replace=False)

for idx in anomaly_indices:
    # Randomly pick which sensor goes haywire (1, 2, or 3 of them)
    # Gas leaks: High MQ6 / MQ7
    # Fire/Overheating: High Temp, low Hum
    anomaly_type = np.random.choice(['gas_leak_mq6', 'gas_leak_mq7', 'overheating'])
    
    if anomaly_type == 'gas_leak_mq6':
        data.at[idx, 'mq6_gas'] = np.random.uniform(800, 2000) # huge spike
        data.at[idx, 'label'] = 'Danger'
    elif anomaly_type == 'gas_leak_mq7':
        data.at[idx, 'mq7_gas'] = np.random.uniform(200, 1000)
        data.at[idx, 'label'] = 'Danger'
    elif anomaly_type == 'overheating':
        data.at[idx, 'temperature'] = np.random.uniform(50, 100)
        data.at[idx, 'humidity'] = np.random.uniform(10, 25)
        data.at[idx, 'label'] = 'Warning' if np.random.random() > 0.5 else 'Danger'
    
    data.at[idx, 'is_anomaly'] = 1

# Clip values to realistic minimums (e.g. no negative gas or temp)
data['mq6_gas'] = data['mq6_gas'].clip(lower=0)
data['mq7_gas'] = data['mq7_gas'].clip(lower=0)
data['temperature'] = data['temperature'].clip(lower=0)
data['humidity'] = data['humidity'].clip(lower=0, upper=100)

output_dir = os.path.dirname(os.path.abspath(__file__))
output_file = os.path.join(output_dir, 'synthetic_sensor_data.csv')

data.to_csv(output_file, index=False)
print(f"Dataset generated successfully with {NUM_SAMPLES} records ({num_anomalies} anomalies).")
print(f"Saved to: {output_file}")
