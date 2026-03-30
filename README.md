# ⚡️ Smart Flask

![Next.js](https://img.shields.io/badge/Next.js-16+-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?logo=react)
![Flask](https://img.shields.io/badge/Flask-API-green?logo=flask)
![Python](https://img.shields.io/badge/Python-3.12-blue?logo=python)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-cyan?logo=tailwindcss)

**Smart Flask** is a real-time chemical reaction monitoring platform. It uses **Next.js** to visualize incoming sensor data (MQ6, MQ7, Temperature, Humidity) and an integrated **Python Flask Machine Learning API** (powered by Scikit-Learn's Isolation Forest algorithm) to immediately detect dangerous atmospheric spikes or synthesis anomalies.

---

## ✨ Features
* 🌡️ **Real-Time ESP32 Input Dashboard**: Watch synthesized live arrays dynamically updating.
* 🧠 **Machine Learning Intrusion / Anomaly Detection**: Connects with a Python backend to run Isolation Forest predictions over local hardware readings.
* 🌐 **Global Intelligence Map**: Crowdsourced analysis models based on historical user reaction parameters.
* 📱 **Beautiful UI/UX**: Built entirely on Next.js 16+, Framer Motion for flawless physics-based layouts, and TailwindCSS for styling.

---

## 🛠 Prerequisites
Ensure you have the following installed on your local development machine:
- **Node.js** (v18+)
- **Python** (v3.10+)

---

## 🚀 Getting Started

Follow these instructions to get the project explicitly running on your local machine.

### 1. Clone the repository
```bash
git clone https://github.com/your-username/smart-flask.git
cd smart-flask
```

### 2. Frontend Setup (Next.js)
Install the strictly required node modules for the web dashboard:
```bash
npm install
```

### 3. Backend Setup (Flask & ML Pipeline)
Navigate to the ML pipeline directory, create a virtual environment, and install the Python dependencies:
```bash
cd ml_pipeline
python -m venv venv
source venv/bin/activate  # On Windows, use: venv\\Scripts\\activate
pip install -r requirements.txt
cd ..
```

### 4. Run the Platform 
We have bundled the startup sequence! You do not need to boot up development servers independently. Simply run the startup script from the root of the project:

```bash
# Make the startup script executable (first time only)
chmod +x start.sh

# Launch both Next.js and Flask Backend!
./start.sh
```

- **Frontend Application** will be running at: `http://localhost:3000`
- **Flask ML API** will listen synchronously at: `http://localhost:5001`

*(To quit both background services cleanly, simply hit `Ctrl + C` in your terminal).*

---

## 📂 Project Structure

```
├── app/                  # Next.js 16+ App Router pages
├── components/           # Reusable React UI Components (Dashboards, Navs, Forms)
├── lib/                  # Utilities, mock data engines, and Supabase client
├── ml_pipeline/          # Python backend environment
│   ├── app.py            # Flask API Router for ESP32 & Web inputs
│   ├── train_model.py    # Generates Isolation Forest predictive models
│   └── anomaly_model.pkl # Pickled compiled ML model parameters
├── start.sh              # Unified Bash Launcher
└── package.json          # Node dependencies
```

---

## 👨‍🔬 Authors
Designed and maintained natively for modern chemistry workflows. 

*Enjoy experimenting locally and tracking real-time models safely!*
