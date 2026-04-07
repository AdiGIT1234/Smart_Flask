"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

type LiveData = {
  is_anomaly: boolean;
  status_label: string;
  anomaly_score: number;
  sensor_mode?: string;
  sensor_data: {
    mq6_gas: number;
    mq7_gas: number;
    temperature: number;
    humidity: number;
  };
};

function Sparkline({ values }: { values: number[] }) {
  if (values.length < 2) return null;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const pts = values.map((v, i) => {
    const x = (i / (values.length - 1)) * 100;
    const y = 100 - ((v - min) / range) * 80 - 10;
    return `${x},${y}`;
  });
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
      <defs>
        <linearGradient id="spark-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(34,211,238,0.3)" />
          <stop offset="100%" stopColor="rgba(34,211,238,0)" />
        </linearGradient>
      </defs>
      <polyline
        points={pts.join(" ")}
        fill="none"
        stroke="rgba(34,211,238,0.7)"
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <polygon
        points={`0,100 ${pts.join(" ")} 100,100`}
        fill="url(#spark-fill)"
      />
    </svg>
  );
}

function Dot({ active }: { active: boolean }) {
  return (
    <span className="relative flex h-2 w-2">
      {active && (
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
      )}
      <span className={`relative inline-flex rounded-full h-2 w-2 ${active ? "bg-emerald-400" : "bg-white/20"}`} />
    </span>
  );
}

function SensorTile({
  label, value, unit, color, delay
}: {
  label: string; value: string; unit: string; color: string; delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.4 }}
      className="bg-white/[0.03] border border-white/[0.07] rounded-xl p-4 flex flex-col justify-between"
    >
      <span className="text-[10px] uppercase tracking-widest text-white/30 mb-2">{label}</span>
      <span className={`text-2xl font-light ${color}`}>
        {value}
        <span className="text-xs text-white/30 ml-1">{unit}</span>
      </span>
    </motion.div>
  );
}

export default function ProblemStatementSection() {
  const [liveData, setLiveData] = useState<LiveData | null>(null);
  const [sensorMode, setSensorMode] = useState<"mq6" | "mq7">("mq6");
  const [gasHistory, setGasHistory] = useState<number[]>([]);
  const [tick, setTick] = useState(0);
  const connected = liveData !== null;

  useEffect(() => {
    const poll = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";
        const res = await fetch(`${apiUrl}/latest`);
        if (res.status === 404) return;
        const data: LiveData = await res.json();
        setLiveData(data);
        if (data.sensor_mode) setSensorMode(data.sensor_mode as "mq6" | "mq7");
        const gasVal = data.sensor_mode === "mq7"
          ? data.sensor_data.mq7_gas
          : data.sensor_data.mq6_gas;
        setGasHistory(prev => [...prev.slice(-29), Math.round(gasVal)]);
        setTick(t => t + 1);
      } catch { /* backend offline */ }
    };
    poll();
    const interval = setInterval(poll, 2000);
    return () => clearInterval(interval);
  }, []);

  const statusColor =
    liveData?.status_label === "Danger"
      ? "text-red-400"
      : liveData?.status_label === "Warning"
      ? "text-amber-400"
      : "text-emerald-400";

  const statusBg =
    liveData?.status_label === "Danger"
      ? "bg-red-500/10 border-red-500/20 shadow-[0_0_40px_rgba(239,68,68,0.1)]"
      : liveData?.status_label === "Warning"
      ? "bg-amber-500/10 border-amber-500/20 shadow-[0_0_40px_rgba(245,158,11,0.1)]"
      : connected
      ? "bg-emerald-500/10 border-emerald-500/20 shadow-[0_0_40px_rgba(16,185,129,0.08)]"
      : "bg-white/[0.02] border-white/[0.07]";

  const gasVal = liveData
    ? sensorMode === "mq7"
      ? liveData.sensor_data.mq7_gas.toFixed(0)
      : liveData.sensor_data.mq6_gas.toFixed(0)
    : "--";

  const confidence = liveData
    ? (100 - liveData.anomaly_score * 100).toFixed(1)
    : "--";

  return (
    <section className="bg-[#050505] text-white py-32 px-6 md:px-12 lg:px-24 border-t border-white/5 relative z-10 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center"
        >
          {/* Left: Text Content */}
          <div>
            <span className="text-blue-500 font-medium tracking-widest uppercase text-sm mb-4 block">
              The Problem
            </span>
            <h2 className="text-5xl md:text-6xl font-medium tracking-tighter text-white border-white mb-6 leading-[1.1]">
              Invisible variables ruin{" "}
              <span className="text-white/50">chemical synthesis</span>.
            </h2>
            <p className="text-lg md:text-xl text-white/50 mb-8 font-light leading-relaxed">
              Traditional lab sensors lag. By the time a thermistor detects an
              exothermic spike or pressure builds from unseen gas, your synthesis
              yield drops—or a safety hazard triggers. Real-time invisible
              variables dictate the purity of standard compounds.
            </p>

            <div className="flex flex-col gap-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full border border-red-500/20 bg-red-500/10 shrink-0 flex items-center justify-center">
                  <span className="text-red-400 font-bold">!</span>
                </div>
                <div>
                  <h4 className="text-xl font-medium text-white/90 mb-1 tracking-tight">Standard Sensor Lag</h4>
                  <p className="text-white/50 text-sm">Hardware sensors delay structural readings by 3–15 seconds, creating dangerous blind spots during mixing.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full border border-blue-500/20 bg-blue-500/10 shrink-0 flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-xl font-medium text-white/90 mb-1 tracking-tight">Our ML Intelligence</h4>
                  <p className="text-white/50 text-sm">Random Forest classifier trained on real sensor data classifies conditions in under 10ms — live from the hardware chip.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Live ESP8266 Sensor Monitor */}
          <div className="relative">
            <div className="absolute inset-0 bg-linear-to-tr from-violet-600/20 to-cyan-600/15 blur-[100px] rounded-full pointer-events-none" />

            <div className="glass-card p-6 relative z-10 overflow-hidden flex flex-col gap-4" style={{ minHeight: 500 }}>
              {/* Header */}
              <div className="flex items-center justify-between">
                <h5 className="text-[10px] tracking-widest uppercase text-white/30">
                  Live Sensor Feed · ESP8266
                </h5>
                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-semibold uppercase tracking-widest border transition-all duration-700 ${
                  connected
                    ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                    : "bg-white/5 border-white/10 text-white/30"
                }`}>
                  <Dot active={connected} />
                  {connected ? "Live" : "Offline"}
                </div>
              </div>

              {/* ML Status Banner */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={liveData?.status_label ?? "empty"}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.4 }}
                  className={`rounded-xl p-5 border transition-all duration-700 ${statusBg}`}
                >
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-white/30 mb-1">
                        ML Classification
                      </p>
                      <p className={`text-4xl font-light tracking-tight ${statusColor}`}>
                        {liveData?.status_label ?? "—"}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] uppercase tracking-widest text-white/30 mb-1">Confidence</p>
                      <p className="text-2xl font-light text-white/60">
                        {confidence}
                        <span className="text-sm ml-0.5 text-white/30">%</span>
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Sensor Tiles 2x2 */}
              <div className="grid grid-cols-2 gap-3 flex-1">
                <SensorTile
                  label={sensorMode === "mq7" ? "MQ7 Gas (CO)" : "MQ6 Gas (LPG)"}
                  value={gasVal}
                  unit="ppm"
                  color="text-cyan-400"
                  delay={0}
                />
                <SensorTile
                  label="Temperature"
                  value={liveData ? liveData.sensor_data.temperature.toFixed(1) : "--"}
                  unit="°C"
                  color="text-amber-400"
                  delay={0.05}
                />
                <SensorTile
                  label="Humidity"
                  value={liveData ? liveData.sensor_data.humidity.toFixed(0) : "--"}
                  unit="%"
                  color="text-blue-400"
                  delay={0.1}
                />
                <SensorTile
                  label="Anomaly Score"
                  value={liveData ? (liveData.anomaly_score * 100).toFixed(1) : "--"}
                  unit="%"
                  color={liveData?.is_anomaly ? "text-red-400" : "text-emerald-400"}
                  delay={0.15}
                />
              </div>

              {/* Sparkline */}
              <div className="mt-1">
                <p className="text-[10px] uppercase tracking-widest text-white/20 mb-2">
                  Gas History · Last {gasHistory.length} readings
                </p>
                <div className="h-14 w-full relative">
                  {gasHistory.length > 1 ? (
                    <Sparkline values={gasHistory} />
                  ) : (
                    <div className="w-full h-full border border-white/5 rounded-lg flex items-center justify-center">
                      <span className="text-[10px] text-white/20 uppercase tracking-widest">
                        {connected ? "collecting data…" : "waiting for ESP8266…"}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Timestamp row */}
              {liveData && (
                <div className="flex items-center justify-between pt-2 border-t border-white/5">
                  <span className="text-[10px] text-white/20 uppercase tracking-widest font-mono">
                    A0 → {sensorMode === "mq7" ? "MQ7" : "MQ6"}
                  </span>
                  <span className="text-[10px] text-white/20 font-mono">
                    #{tick} readings
                  </span>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
