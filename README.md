# ⚡️ Smart Flask

<p align="left">
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nextjs/nextjs-original.svg" width="24" height="24" alt="Next.js" style="vertical-align: middle;" /> <span style="vertical-align: middle; font-weight: 500;">Next.js 16+</span> &nbsp;&nbsp;&nbsp;
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg" width="24" height="24" alt="React" style="vertical-align: middle;" /> <span style="vertical-align: middle; font-weight: 500;">React 19</span> &nbsp;&nbsp;&nbsp;
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg" width="24" height="24" alt="Python" style="vertical-align: middle;" /> <span style="vertical-align: middle; font-weight: 500;">Python 3.12</span> &nbsp;&nbsp;&nbsp;
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/flask/flask-original.svg" width="24" height="24" alt="Flask" style="vertical-align: middle;" /> <span style="vertical-align: middle; font-weight: 500;">Flask</span> &nbsp;&nbsp;&nbsp;
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/tailwindcss/tailwindcss-original.svg" width="24" height="24" alt="Tailwind" style="vertical-align: middle;" /> <span style="vertical-align: middle; font-weight: 500;">Tailwind CSS</span>
</p>

---

**Smart Flask** is a real-time chemical reaction monitoring platform. It uses **Next.js** to visualize incoming sensor data (MQ6, MQ7, Temperature, Humidity) and an integrated **Python Flask Machine Learning API** (powered by Scikit-Learn's Isolation Forest algorithm) to immediately detect dangerous atmospheric spikes or synthesis anomalies.

---

## ✨ Features
* 🌡️ **Real-Time ESP32 Input Dashboard**: Watch synthesized live arrays dynamically updating.
* 🧠 **Machine Learning Intrusion / Anomaly Detection**: Connects with a Python backend to run Isolation Forest predictions over local hardware readings.
* 🧪 **Custom Sandbox Experiments**: Define custom chemical parameters and monitor ad-hoc reactions in real-time.
* 🌐 **Global Intelligence Map**: Crowdsourced analysis models based on historical user reaction parameters.
* 📱 **Beautiful UI/UX**: Built entirely on Next.js 16+, Framer Motion for flawless physics-based layouts, and TailwindCSS for styling.

---

## 🛠 Prerequisites
Ensure you have the following installed on your local development machine:
- **Node.js** (v18+)
- **Python** (v3.10+)

---

## 🚀 Getting Started

Follow these instructions to get the project running on your local machine. 

### 1. Clone the repository
```cmd
git clone https://github.com/your-username/smart-flask.git
cd smart-flask
```

### 2. Frontend Setup (Next.js)
Install the strictly required node modules for the web dashboard:
```cmd
npm install
```

### 3. Backend Setup (Flask & ML Pipeline)
Navigate to the ML pipeline directory, create a virtual environment, and install the Python dependencies:
```cmd
cd ml_pipeline
python -m venv venv
venv\Scripts\activate   (On Mac/Linux, use: source venv/bin/activate)
pip install -r requirements.txt
cd ..
```

### 4. Run the Platform 

Now, launch both the frontend and backend servers.

**Windows users:**
You can open two command prompts:
1. In the root directory, run: `npm run dev`
2. In the `ml_pipeline` directory (with your venv activated), run: `python app.py`

*(Mac/Linux users can simply run `./start.sh` from the root directory to boot both servers in the background simultaneously).*

- **Frontend Application** will be running at: `http://localhost:3000`
- **Flask ML API** will listen synchronously at: `http://localhost:5001`

---

## 📂 Project Structure

```
├── app/                  # Next.js 16+ App Router pages (Dashboard, Admin, Custom Sandbox)
├── components/           # Reusable React UI Components (Dashboards, Navs, Forms)
├── lib/                  # Utilities, mock data engines, and Supabase client
├── ml_pipeline/          # Python backend environment
│   ├── app.py            # Flask API Router for ESP32 & Web inputs
│   ├── train_model.py    # Generates Isolation Forest predictive models
│   └── anomaly_model.pkl # Pickled compiled ML model parameters
├── render.yaml           # Deployment configuration for Render cloud platform
├── start.sh              # Unified Bash Launcher (Mac/Linux)
└── package.json          # Node dependencies
```

---



*Enjoy experimenting locally and tracking real-time models safely!*
