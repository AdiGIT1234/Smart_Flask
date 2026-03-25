"use client";

import React, { useState, useEffect } from "react";

// Types
type SensorData = {
  mq6_gas: number;
  mq7_gas: number;
  temperature: number;
  humidity: number;
};

type PredictionResult = {
  is_anomaly: boolean;
  anomaly_score: number;
  sensor_data: SensorData;
  error?: string;
};

export default function LiveMonitorPage() {
  const [data, setData] = useState<PredictionResult | null>(null);
  const [isSimulatingLeak, setIsSimulatingLeak] = useState(false);
  const [history, setHistory] = useState<PredictionResult[]>([]);

  // Simulation logic: fetch data every 2 seconds
  useEffect(() => {
    const interval = setInterval(async () => {
      // 1. Generate realistic synthetic sensor data
      let mq6 = Math.random() * 50 + 200; // 200-250 ppm normal
      let mq7 = Math.random() * 10 + 30;  // 30-40 ppm normal
      const temp = Math.random() * 2 + 24;  // 24-26 C normal
      const hum = Math.random() * 5 + 45;   // 45-50 % normal
      
      // Inject huge spikes if user clicks "Simulate Leak"
      if (isSimulatingLeak) {
        mq6 = Math.random() * 500 + 1000; // 1000+ ppm
        mq7 = Math.random() * 200 + 400; // 400+ ppm
      }

      // 2. Post to our new Flask ML API
      try {
        const res = await fetch("http://localhost:5001/predict", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            mq6_gas: mq6,
            mq7_gas: mq7,
            temperature: temp,
            humidity: hum
          })
        });
        const result: PredictionResult = await res.json();
        
        setData(result);
        
        // Keep last 10 logs
        setHistory(prev => {
          const updated = [result, ...prev];
          if (updated.length > 8) return updated.slice(0, 8);
          return updated;
        });

      } catch (err) {
        console.error("ML Backend disconnected:", err);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [isSimulatingLeak]);

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-24 px-6 md:px-20 font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight mb-2">Live ESP32 Anomaly Monitor</h1>
            <p className="text-gray-400">Real-time ML streaming analysis using Isolation Forest.</p>
          </div>
          <button 
             onClick={() => setIsSimulatingLeak(!isSimulatingLeak)}
             className={`px-6 py-3 rounded-full font-semibold transition-all shadow-lg ${isSimulatingLeak ? 'bg-red-600 hover:bg-red-500 shadow-red-500/50 text-white' : 'bg-white/10 hover:bg-white/20 text-white'}`}
          >
            {isSimulatingLeak ? 'Stop Gas Leak Simulation' : 'Simulate Gas Leak'}
          </button>
        </div>

        {/* Global Status Banner */}
        <div className={`p-8 rounded-2xl mb-10 border transition-all duration-500 flex items-center justify-between ${data?.is_anomaly ? 'bg-red-900/20 border-red-500/50 shadow-[0_0_40px_rgba(239,68,68,0.2)]' : 'bg-emerald-900/20 border-emerald-500/50 shadow-[0_0_40px_rgba(16,185,129,0.1)]'}`}>
          <div className="flex items-center gap-6">
             <div className="relative">
                <div className={`w-6 h-6 rounded-full ${data?.is_anomaly ? 'bg-red-500 animate-pulse' : 'bg-emerald-500'}`}></div>
                <div className={`absolute inset-0 rounded-full animate-ping opacity-75 ${data?.is_anomaly ? 'bg-red-500' : 'bg-emerald-500'}`}></div>
             </div>
             <div>
                <h2 className={`text-2xl font-bold ${data?.is_anomaly ? 'text-red-400' : 'text-emerald-400'}`}>
                   {data?.is_anomaly ? 'CRITICAL ANOMALY DETECTED' : 'SYSTEM NORMAL'}
                </h2>
                <p className="text-gray-400 text-sm mt-1">
                   Anomaly Score: {data?.anomaly_score !== undefined ? data.anomaly_score.toFixed(3) : 'Loading...'}
                </p>
             </div>
          </div>
          <div className="text-right">
             <p className="text-xs tracking-widest text-gray-500 uppercase">ML Model</p>
             <p className="font-mono text-sm">Isolation Forest (v1.0)</p>
          </div>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <MetricCard title="MQ6 Gas (LPG)" value={`${data?.sensor_data?.mq6_gas?.toFixed(1) ?? 0} ppm`} isAnomalous={isSimulatingLeak} />
          <MetricCard title="MQ7 Gas (CO)" value={`${data?.sensor_data?.mq7_gas?.toFixed(1) ?? 0} ppm`} isAnomalous={isSimulatingLeak} />
          <MetricCard title="Temperature" value={`${data?.sensor_data?.temperature?.toFixed(1) ?? 0} °C`} />
          <MetricCard title="Humidity" value={`${data?.sensor_data?.humidity?.toFixed(1) ?? 0} %`} />
        </div>

        {/* Log History */}
        <div>
          <h3 className="text-xl font-semibold mb-4 border-b border-white/10 pb-2">Analysis Log</h3>
          <div className="space-y-3 font-mono text-sm">
            {history.map((log, i) => (
              <div key={i} className={`p-4 rounded-lg flex flex-col md:flex-row justify-between md:items-center border gap-3 ${log.is_anomaly ? 'bg-red-950/30 border-red-500/30 text-red-300' : 'bg-[#0a0a0a] border-white/5 text-gray-400'}`}>
                <div className="flex items-center gap-4">
                  <span className="opacity-50">T-{i*2}s</span>
                  <span>[ML_PREDICT] MQ6:{log.sensor_data?.mq6_gas?.toFixed(0) ?? 0} | MQ7:{log.sensor_data?.mq7_gas?.toFixed(0) ?? 0} | TMP:{log.sensor_data?.temperature?.toFixed(1) ?? 0}</span>
                </div>
                <span>{log.is_anomaly ? '⚠️ ANOMALY' : '✅ OK'}</span>
              </div>
            ))}
            {history.length === 0 && <p className="text-gray-500">Waiting for sensor data stream...</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ title, value, isAnomalous = false }: { title: string, value: string, isAnomalous?: boolean }) {
  return (
    <div className={`p-6 rounded-2xl border transition-colors ${isAnomalous ? 'bg-red-950/20 border-red-500/30' : 'bg-[#0f0f0f] border-white/5'}`}>
      <h4 className="text-gray-400 text-sm font-medium mb-3">{title}</h4>
      <p className={`text-3xl font-light tracking-tight ${isAnomalous ? 'text-red-400' : 'text-white'}`}>{value}</p>
    </div>
  );
}
