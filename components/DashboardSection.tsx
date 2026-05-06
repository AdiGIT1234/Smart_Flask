/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, ShieldAlert, ShieldCheck, X, Siren } from "lucide-react";
import { supabase } from "@/lib/supabase";

type SensorData = {
  mq6_gas: number;
  mq7_gas: number;
  temperature: number;
  humidity: number;
};

type PredictionResult = {
  is_anomaly: boolean;
  status_label: string;
  anomaly_score: number;
  sensor_mode?: string;
  sensor_data: SensorData;
  error?: string;
};

export default function DashboardSection() {
  const [data, setData] = useState<PredictionResult | null>(null);
  const [history, setHistory] = useState<PredictionResult[]>([]);
  const [espConnected, setEspConnected] = useState(false);
  const [sensorMode, setSensorMode] = useState<'mq6' | 'mq7'>('mq6');
  const [togglingMode, setTogglingMode] = useState(false);
  const [globalCount, setGlobalCount] = useState<string | null>(null);

  // Full-screen alert state
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertData, setAlertData] = useState<PredictionResult | null>(null);
  const prevStatusRef = useRef<string | null>(null);

  // Fetch current sensor mode on mount + live experiment count from Supabase
  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";
    fetch(`${apiUrl}/sensor-mode`)
      .then(r => r.json())
      .then(d => setSensorMode(d.mode === 'mq7' ? 'mq7' : 'mq6'))
      .catch(() => {});

    // Fetch total public experiment count from Supabase
    (async () => {
      try {
        const { count } = await supabase
          .from("experiment_results")
          .select("id", { count: "exact", head: true });
        if (count !== null) {
          setGlobalCount(count >= 1000 ? `${(count / 1000).toFixed(1)}k` : String(count));
        }
      } catch {
        // silently ignore — shows "--" if offline
      }
    })();
  }, []);

  // Poll GET /latest every 2 seconds — real data from ESP8266
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";
        const res = await fetch(`${apiUrl}/latest`);

        if (res.status === 404) {
          // No ESP data yet — backend is alive but ESP hasn't posted
          setEspConnected(false);
          return;
        }

        const result: PredictionResult = await res.json();
        setEspConnected(true);
        setData(result);

        // ── Full-screen alert logic ──
        // Fire (or re-fire) if status escalates to Warning/Danger
        const prev = prevStatusRef.current;
        const curr = result.status_label;
        const isAlarm = curr === 'Warning' || curr === 'Danger';
        const escalated =
          isAlarm &&
          (prev !== curr || (prev === 'Warning' && curr === 'Danger'));
        if (escalated) {
          setAlertData(result);
          setAlertOpen(true);
        }
        // Auto-clear overlay when readings return to Safe
        if (curr === 'Safe') {
          setAlertOpen(false);
        }
        prevStatusRef.current = curr;

        // Keep last 20 readings for chart and log feed
        setHistory(prev => {
          const updated = [result, ...prev];
          if (updated.length > 20) return updated.slice(0, 20);
          return updated;
        });

      } catch (err) {
        console.error("ML Backend disconnected:", err);
        setEspConnected(false);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Toggle which sensor is on A0
  const toggleSensorMode = async () => {
    const newMode = sensorMode === 'mq6' ? 'mq7' : 'mq6';
    setTogglingMode(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";
      await fetch(`${apiUrl}/sensor-mode`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode: newMode })
      });
      setSensorMode(newMode);
    } catch (e) {
      console.error('Failed to toggle sensor mode', e);
    } finally {
      setTogglingMode(false);
    }
  };


  const isDanger  = data?.status_label === 'Danger';
  const isWarning = data?.status_label === 'Warning';

  return (
    <section className="min-h-screen bg-[#050505] text-white pt-24 pb-48 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* Header Column */}
          <div className="lg:col-span-3 mb-10 flex flex-col md:flex-row justify-between items-center md:items-start text-center md:text-left gap-6">
            <div>
              <h3 className="text-3xl md:text-5xl font-medium tracking-tight text-white/90 mb-4">
                Intelligence in Action
              </h3>
              <p className="text-lg text-white/50 max-w-2xl">
                Live streaming Random Forest Classification from the ESP8266 chip directly to this dashboard. Anomalies are detected instantly.
              </p>
            </div>
            <div className="flex flex-col items-end gap-3 shrink-0 mt-4 md:mt-0">
              {/* ESP Connection Badge */}
              <div className={`flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold border ${
                espConnected
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                  : 'bg-white/5 border-white/10 text-white/40'
              }`}>
                <span className={`w-2 h-2 rounded-full ${espConnected ? 'bg-emerald-400 animate-pulse' : 'bg-white/30'}`} />
                {espConnected ? 'ESP8266 Live' : 'Waiting for ESP...'}
              </div>
              {/* A0 Sensor Mode Toggle */}
              <div className="flex items-center gap-3">
                <span className="text-xs text-white/40 uppercase tracking-widest">A0 Sensor</span>
                <button
                  onClick={toggleSensorMode}
                  disabled={togglingMode}
                  className="relative flex items-center bg-white/5 border border-white/10 rounded-full p-1 gap-1 transition-all hover:border-white/20"
                >
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                    sensorMode === 'mq6'
                      ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                      : 'text-white/30'
                  }`}>MQ6</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                    sensorMode === 'mq7'
                      ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                      : 'text-white/30'
                  }`}>MQ7</span>
                </button>
                <span className="text-xs text-white/20">{sensorMode === 'mq6' ? 'LPG' : 'CO'}</span>
              </div>
            </div>
          </div>

          {/* ── Status Banner (larger, pulsing border on alarm) ── */}
          <motion.div
            animate={{
              boxShadow: isDanger
                ? ['0 0 30px rgba(239,68,68,0.3)', '0 0 70px rgba(239,68,68,0.6)', '0 0 30px rgba(239,68,68,0.3)']
                : isWarning
                ? ['0 0 20px rgba(245,158,11,0.2)', '0 0 50px rgba(245,158,11,0.5)', '0 0 20px rgba(245,158,11,0.2)']
                : '0 0 20px rgba(16,185,129,0.1)',
            }}
            transition={{ duration: 1.4, repeat: (isDanger || isWarning) ? Infinity : 0, ease: 'easeInOut' }}
            className={`lg:col-span-3 p-8 rounded-2xl border-2 transition-all duration-500 flex items-center justify-between cursor-pointer ${
              isDanger
                ? 'bg-red-950/40 border-red-500/60'
                : isWarning
                ? 'bg-amber-950/40 border-amber-500/60'
                : 'bg-emerald-950/20 border-emerald-500/30'
            }`}
            onClick={() => { if (isDanger || isWarning) { setAlertData(data); setAlertOpen(true); } }}
          >
            <div className="flex items-center gap-6">
              {/* Pulsing dot — bigger */}
              <div className="relative shrink-0">
                <div className={`w-8 h-8 rounded-full ${
                  isDanger ? 'bg-red-500' : isWarning ? 'bg-amber-500' : 'bg-emerald-500'
                }`} />
                {(isDanger || isWarning) && (
                  <div className={`absolute inset-0 rounded-full animate-ping opacity-60 ${
                    isDanger ? 'bg-red-500' : 'bg-amber-500'
                  }`} />
                )}
              </div>

              <div>
                <div className="flex items-center gap-3 mb-1">
                  {isDanger ? (
                    <ShieldAlert size={22} className="text-red-400" />
                  ) : isWarning ? (
                    <AlertTriangle size={22} className="text-amber-400" />
                  ) : (
                    <ShieldCheck size={22} className="text-emerald-400" />
                  )}
                  <h2 className={`text-3xl font-black uppercase tracking-widest ${
                    isDanger ? 'text-red-400' : isWarning ? 'text-amber-400' : 'text-emerald-400'
                  }`}>
                    STATUS: {data?.status_label || 'SYSTEM NORMAL'}
                  </h2>
                </div>
                {(isDanger || isWarning) && (
                  <p className="text-sm text-white/40 ml-9">Click to view full alert details</p>
                )}
              </div>
            </div>

            <div className="text-right shrink-0">
              <p className="text-xs tracking-widest text-white/30 uppercase mb-1">ML Confidence</p>
              <p className={`font-mono text-3xl font-bold ${
                isDanger ? 'text-red-400' : isWarning ? 'text-amber-400' : 'text-emerald-400'
              }`}>
                {data?.anomaly_score !== undefined ? (data.anomaly_score * 100).toFixed(1) + '%' : '100%'}
              </p>
            </div>
          </motion.div>

          {/* Left Column - Live Cards */}
          <div className="flex flex-col gap-6">
            <Card
              title={sensorMode === 'mq6' ? 'MQ6 Gas (LPG)' : 'MQ7 Gas (CO)'}
              value={(sensorMode === 'mq6' ? data?.sensor_data?.mq6_gas : data?.sensor_data?.mq7_gas)?.toFixed(1) ?? "--"}
              unit="ppm"
              accent={data?.status_label === 'Danger' ? "glow-red" : "glow-blue"}
              change="--"
            />
            <Card title="Core Temp" value={data?.sensor_data?.temperature?.toFixed(1) ?? "--"} unit="°C" accent={data?.status_label === 'Danger' ? "glow-red" : "glow-amber"} change="--" />
            
            {/* ML Output */}
            <div className={`glass-card p-6 flex flex-col gap-4 relative overflow-hidden group`}>
              <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl transition-all duration-700 ${data?.status_label === 'Danger' ? 'bg-red-500/20 group-hover:bg-red-500/30' : data?.status_label === 'Warning' ? 'bg-amber-500/20 group-hover:bg-amber-500/30' : 'bg-green-500/10 group-hover:bg-green-500/20'}`} />
              <div className="flex justify-between items-start z-10">
                <span className="text-sm font-medium tracking-wide text-white/50 uppercase">
                  ML Diagnosis
                </span>
                <span className={`flex items-center gap-2 text-xs font-semibold px-2 py-1 rounded-full ${data?.status_label === 'Danger' ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}>
                  <span className={`w-1.5 h-1.5 rounded-full pulse-dot ${data?.status_label === 'Danger' ? 'bg-red-400' : 'bg-green-400'}`} /> Live
                </span>
              </div>
              <div className="flex flex-col z-10">
                <span className={`text-3xl font-medium tracking-tight mb-1 ${data?.status_label === 'Danger' ? 'text-red-400' : data?.status_label === 'Warning' ? 'text-amber-400' : 'text-green-400'}`}>
                  {data?.status_label || '--'}
                </span>
                <div className="flex items-center gap-3 mt-1">
                  <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-300 ${data?.status_label === 'Danger' ? 'bg-red-400' : 'bg-green-400'}`} 
                      style={{ width: `${data?.anomaly_score !== undefined ? (data.anomaly_score * 100) : 100}%` }} 
                    />
                  </div>
                  <span className="text-sm text-white/70 font-mono">{data?.anomaly_score !== undefined ? (data.anomaly_score * 100).toFixed(0) : '100'}% Conf.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Center Column - Charts */}
          <div className="lg:col-span-2 glass-card p-8 flex flex-col relative overflow-hidden group">
            {/* Y Axis Title */}
            <div
              className="absolute left-2 top-1/2 text-[10px] font-semibold tracking-widest text-white/30 uppercase"
              style={{ transform: "translateY(-50%) rotate(-90deg)", transformOrigin: "center center", whiteSpace: "nowrap" }}
            >
              Sensor Reading
            </div>
             <div className="absolute top-0 left-1/4 w-64 h-64 bg-violet-600/10 rounded-full blur-[100px] group-hover:bg-violet-600/20 transition-all duration-1000" />
            
            <div className="flex justify-between items-center mb-8">
              <h4 className="text-lg font-medium tracking-wide text-white/80">
                Reaction Dynamics timeline
              </h4>
              <div className="flex gap-4 text-xs font-medium text-white/50">
                <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-blue-500" /> Gas</span>
                <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-amber-500" /> Temp</span>
              </div>
            </div>

            {/* Dynamic Chart Area */}
            <div className="flex-1 min-h-[300px] w-full chart-grid rounded-lg border border-white/5 relative flex items-end">
              
              {/* Temp Line SVG (Amber) */}
              <svg className="absolute inset-0 w-full h-full preserve-3d" viewBox="0 10 100 100" preserveAspectRatio="none">
                 <path 
                   d={ (() => {
                     if (history.length === 0) return "M0,100 L100,100";
                     const pts = [...history].reverse();
                     if (pts.length === 1) return `M0,${100 - ((pts[0].sensor_data.temperature - 26) / 10 * 100)} L100,${100 - ((pts[0].sensor_data.temperature - 26) / 10 * 100)}`;
                     return "M" + pts.map((d, i) => `${(i / (pts.length - 1)) * 100},${Math.max(0, Math.min(100, 100 - ((d.sensor_data.temperature - 26) / 10 * 100)))}`).join(" L");
                   })() }
                   fill="none" 
                   stroke="currentColor" 
                   strokeWidth="2" 
                   className="text-amber-500/80 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)] transition-all duration-300" 
                   vectorEffect="non-scaling-stroke"
                   style={{ strokeLinejoin: "round", strokeLinecap: "round" }}
                 />
                 {/* Area under curve */}
                 <path 
                   d={ (() => {
                     if (history.length === 0) return "M0,100 L100,100 Z";
                     const pts = [...history].reverse();
                     if (pts.length === 1) return `M0,${100 - ((pts[0].sensor_data.temperature - 26) / 10 * 100)} L100,${100 - ((pts[0].sensor_data.temperature - 26) / 10 * 100)} L100,110 L0,110 Z`;
                     return "M" + pts.map((d, i) => `${(i / (pts.length - 1)) * 100},${Math.max(0, Math.min(100, 100 - ((d.sensor_data.temperature - 26) / 10 * 100)))}`).join(" L") + " L100,110 L0,110 Z";
                   })() }
                   fill="url(#amber-gradient)" 
                   className="opacity-20 transition-all duration-300"
                 />
                 <linearGradient id="amber-gradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f59e0b" stopOpacity="1" />
                    <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
                 </linearGradient>
              </svg>

              {/* Gas Line SVG (Blue) */}
              <svg className="absolute inset-0 w-full h-full preserve-3d" viewBox="0 10 100 100" preserveAspectRatio="none">
                <path 
                  d={ (() => {
                     if (history.length === 0) return "M0,100 L100,100";
                     const pts = [...history].reverse();
                     if (pts.length === 1) return `M0,${100 - ((pts[0].sensor_data.mq6_gas - 200) / 450 * 100)} L100,${100 - ((pts[0].sensor_data.mq6_gas - 200) / 450 * 100)}`;
                     return "M" + pts.map((d, i) => `${(i / (pts.length - 1)) * 100},${Math.max(0, Math.min(100, 100 - ((d.sensor_data.mq6_gas - 200) / 450 * 100)))}`).join(" L");
                   })() }
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2.5" 
                  className="text-blue-500 drop-shadow-[0_0_8px_rgba(59,130,246,0.6)] transition-all duration-300" 
                  vectorEffect="non-scaling-stroke"
                  style={{ strokeLinejoin: "round", strokeLinecap: "round" }}
                />
                 {/* Area under curve */}
                 <path 
                   d={ (() => {
                     if (history.length === 0) return "M0,100 L100,100 Z";
                     const pts = [...history].reverse();
                     if (pts.length === 1) return `M0,${100 - ((pts[0].sensor_data.mq6_gas - 200) / 450 * 100)} L100,${100 - ((pts[0].sensor_data.mq6_gas - 200) / 450 * 100)} L100,110 L0,110 Z`;
                     return "M" + pts.map((d, i) => `${(i / (pts.length - 1)) * 100},${Math.max(0, Math.min(100, 100 - ((d.sensor_data.mq6_gas - 200) / 450 * 100)))}`).join(" L") + " L100,110 L0,110 Z";
                   })() }
                   fill="url(#blue-gradient)" 
                   className="opacity-20 transition-all duration-300"
                 />
                 <linearGradient id="blue-gradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="1" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                 </linearGradient>
              </svg>

              {/* Data tooltips/dots (only show if anomaly exists) */}
              {history.some(log => log.is_anomaly) && (() => {
                 const pts = [...history].reverse();
                 const spikeIndex = pts.findIndex(log => log.is_anomaly);
                 if (spikeIndex !== -1 && pts.length > 1) {
                    const xPercent = (spikeIndex / (pts.length - 1)) * 100;
                    const yVal = 100 - ((pts[spikeIndex].sensor_data.mq6_gas - 200) / 450 * 100);
                    return (
                      <motion.div 
                         initial={{ opacity: 0, scale: 0 }}
                         animate={{ opacity: 1, scale: 1 }}
                         className="absolute w-3 h-3 bg-white rounded-full glow-blue translate-x-[-50%] translate-y-[-50%] z-20"
                         style={{ left: `${xPercent}%`, top: `calc(${Math.max(10, Math.min(90, yVal))}% + 10px)` }}
                      >
                         <div className="absolute top-[-30px] left-[50%] bg-blue-500/10 border border-blue-500/30 text-blue-300 text-[10px] px-2 py-0.5 rounded backdrop-blur-md -translate-x-1/2 whitespace-nowrap">
                           Spike
                         </div>
                      </motion.div>
                    );
                 }
                 return null;
              })()}
            </div>

            {/* X Axis Labels */}
            <div className="flex justify-between w-full mt-4 text-xs font-mono text-white/30 px-2">
              <span>00:00</span>
              <span>15:00</span>
              <span>30:00</span>
              <span>45:00</span>
              <span>60:00</span>
            </div>

            {/* X Axis Title */}
            <div className="w-full text-center mt-2 text-[10px] font-semibold tracking-widest text-white/30 uppercase">
              Time (seconds)
            </div>

          </div>

          {/* Bottom Log Feed */}
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
             {/* Log Activity */}
             <div className="glass-card p-6 border-l-4 border-l-violet-500">
               <h4 className="text-sm font-medium tracking-wide text-white/70 mb-4 uppercase">Automated Reaction Log</h4>
               <div className="flex flex-col gap-3 font-mono text-xs text-white/60">
                 <AnimatePresence>
                   {history.slice(0, 4).map((log, i) => (
                     <motion.div 
                       key={i + log.sensor_data.mq6_gas}
                       initial={{ opacity: 0, x: -10 }}
                       animate={{ opacity: 1, x: 0 }}
                       className="flex gap-4 p-2 rounded bg-white/5"
                     >
                        <span className="text-white/30 shrink-0">T-{i*2}s</span>
                        <span className={`font-semibold shrink-0 ${log.status_label === 'Danger' ? 'text-red-400' : log.status_label === 'Warning' ? 'text-amber-400' : 'text-blue-400'}`}>
                          [{log.status_label.toUpperCase()}]
                        </span>
                        <span className="flex-1 truncate">
                           {(log.sensor_mode ?? 'mq6') !== 'mq7' ? 'MQ6' : 'MQ7'}: {((log.sensor_mode ?? 'mq6') !== 'mq7' ? log.sensor_data.mq6_gas : log.sensor_data.mq7_gas).toFixed(0)}ppm | TMP: {log.sensor_data.temperature.toFixed(1)}°C
                        </span>
                     </motion.div>
                   ))}
                   {history.length === 0 && (
                     <div className="text-white/30 p-2">Waiting for first classification...</div>
                   )}
                 </AnimatePresence>
               </div>
             </div>

             {/* Community Stats */}
             <div className="glass-card p-6 flex items-center justify-between">
                <div>
                   <h4 className="text-sm font-medium tracking-wide text-white/70 mb-2 uppercase">Global Intel</h4>
                   <p className="text-sm text-white/40">Shared insights from connected labs</p>
                </div>
                <div className="text-right">
                   <div className="text-3xl font-light text-white/90">
                     {globalCount ?? "--"}
                   </div>
                   <div className="text-xs text-green-400 mt-1">Total Experiments Run</div>
                </div>
             </div>
          </div>
        </motion.div>
      </div>

      {/* ══════════════════════════════════════════
           FULL-SCREEN ALERT OVERLAY
          ══════════════════════════════════════════ */}
      <AnimatePresence>
        {alertOpen && alertData && (
          <motion.div
            key="alert-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-9999 flex items-center justify-center p-6"
          >
            {/* Blurred dark backdrop */}
            <div
              className={`absolute inset-0 backdrop-blur-sm ${
                alertData.status_label === 'Danger'
                  ? 'bg-red-950/80'
                  : 'bg-amber-950/70'
              }`}
              onClick={() => setAlertOpen(false)}
            />

            {/* Animated screen-edge glow */}
            <motion.div
              animate={{ opacity: [0.4, 0.9, 0.4] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
              className={`absolute inset-0 pointer-events-none border-[6px] rounded-none ${
                alertData.status_label === 'Danger' ? 'border-red-500' : 'border-amber-400'
              }`}
            />

            {/* Alert Card */}
            <motion.div
              initial={{ scale: 0.85, y: 40, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.85, y: 40, opacity: 0 }}
              transition={{ type: 'spring', damping: 20, stiffness: 250 }}
              className={`relative z-10 w-full max-w-lg rounded-3xl border-2 p-8 shadow-2xl overflow-hidden ${
                alertData.status_label === 'Danger'
                  ? 'bg-[#0d0000] border-red-500/70'
                  : 'bg-[#0d0800] border-amber-500/60'
              }`}
            >
              {/* Inner glow */}
              <div className={`absolute inset-0 pointer-events-none ${
                alertData.status_label === 'Danger'
                  ? 'bg-red-600/10'
                  : 'bg-amber-600/10'
              }`} />

              {/* Dismiss */}
              <button
                onClick={() => setAlertOpen(false)}
                className="absolute top-5 right-5 text-white/30 hover:text-white/70 transition-colors z-20"
              >
                <X size={22} />
              </button>

              {/* Icon + Title */}
              <div className="flex items-center gap-4 mb-6 relative z-10">
                <motion.div
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut' }}
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
                    alertData.status_label === 'Danger'
                      ? 'bg-red-500/20 border-2 border-red-500/50'
                      : 'bg-amber-500/20 border-2 border-amber-500/50'
                  }`}
                >
                  {alertData.status_label === 'Danger' ? (
                    <Siren size={32} className="text-red-400" />
                  ) : (
                    <AlertTriangle size={32} className="text-amber-400" />
                  )}
                </motion.div>
                <div>
                  <p className={`text-xs font-semibold tracking-widest uppercase mb-1 ${
                    alertData.status_label === 'Danger' ? 'text-red-400/70' : 'text-amber-400/70'
                  }`}>
                    ML Classification Alert
                  </p>
                  <h2 className={`text-4xl font-black uppercase tracking-wide ${
                    alertData.status_label === 'Danger' ? 'text-red-400' : 'text-amber-300'
                  }`}>
                    {alertData.status_label}
                  </h2>
                </div>
              </div>

              {/* Sensor readings grid */}
              <div className="grid grid-cols-2 gap-3 mb-6 relative z-10">
                {[
                  { label: 'MQ6 Gas (LPG)', value: alertData.sensor_data.mq6_gas?.toFixed(1), unit: 'ppm', threshold: 500 },
                  { label: 'MQ7 Gas (CO)',  value: alertData.sensor_data.mq7_gas?.toFixed(1),  unit: 'ppm', threshold: 100 },
                  { label: 'Temperature',   value: alertData.sensor_data.temperature?.toFixed(1), unit: '°C',  threshold: 50 },
                  { label: 'Humidity',      value: alertData.sensor_data.humidity?.toFixed(1),   unit: '%',   threshold: 85 },
                ].map((s) => {
                  const numeric = parseFloat(s.value ?? '0');
                  const triggered = numeric >= s.threshold;
                  return (
                    <div
                      key={s.label}
                      className={`p-4 rounded-xl border ${
                        triggered
                          ? alertData.status_label === 'Danger'
                            ? 'bg-red-500/15 border-red-500/30'
                            : 'bg-amber-500/15 border-amber-500/30'
                          : 'bg-white/3 border-white/8'
                      }`}
                    >
                      <p className="text-[10px] text-white/40 uppercase tracking-widest mb-1">{s.label}</p>
                      <p className={`text-2xl font-bold font-mono ${
                        triggered
                          ? alertData.status_label === 'Danger' ? 'text-red-300' : 'text-amber-300'
                          : 'text-white/70'
                      }`}>
                        {s.value ?? '--'}
                        <span className="text-sm font-normal ml-1 text-white/30">{s.unit}</span>
                      </p>
                      {triggered && (
                        <p className="text-[10px] text-red-400/70 mt-0.5">Above threshold ({s.threshold}{s.unit})</p>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Confidence bar */}
              <div className="mb-6 relative z-10">
                <div className="flex justify-between text-xs text-white/40 mb-2">
                  <span>ML Anomaly Confidence</span>
                  <span className="font-mono font-semibold text-white/70">
                    {(alertData.anomaly_score * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(alertData.anomaly_score * 100).toFixed(0)}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className={`h-full rounded-full ${
                      alertData.status_label === 'Danger' ? 'bg-red-500' : 'bg-amber-500'
                    }`}
                  />
                </div>
              </div>

              {/* Acknowledge button */}
              <button
                onClick={() => setAlertOpen(false)}
                className={`relative z-10 w-full py-4 rounded-xl font-bold text-sm uppercase tracking-widest transition-all ${
                  alertData.status_label === 'Danger'
                    ? 'bg-red-600 hover:bg-red-500 text-white shadow-[0_0_25px_rgba(239,68,68,0.4)]'
                    : 'bg-amber-600 hover:bg-amber-500 text-black shadow-[0_0_25px_rgba(245,158,11,0.3)]'
                }`}
              >
                Acknowledge &amp; Continue Monitoring
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// Reusable card component
function Card({ 
  title, 
  value, 
  unit, 
  change,
  accent 
}: { 
  title: string, 
  value: string, 
  unit: string, 
  change: string,
  accent: string 
}) {
  const isPositive = change.startsWith("+");
  return (
    <div className={`glass-card p-6 flex flex-col gap-2 relative overflow-hidden group glass-card-hover transition-all duration-300`}>
      {/* Subtle background glow */}
      <div className={`absolute -right-12 -top-12 w-32 h-32 rounded-full blur-[60px] opacity-20 group-hover:opacity-40 transition-opacity duration-500 bg-current text-${accent.split('-')[1]}-500`} />
      
      <span className="text-sm font-medium tracking-wide text-white/50 uppercase z-10">
        {title}
      </span>
      
      <div className="flex items-end gap-2 drop-shadow-lg z-10 mt-2">
        <span className={`text-5xl font-medium tracking-tighter text-white ${accent}`}>
          {value}
        </span>
        <span className="text-xl text-white/40 mb-1">{unit}</span>
      </div>

      <div className="mt-4 flex items-center gap-2 text-sm font-medium z-10">
        <span className={isPositive ? "text-red-400" : "text-green-400"}>
           {change} 
        </span>
        <span className="text-white/30 text-xs font-mono">from last hour</span>
      </div>
    </div>
  )
}
