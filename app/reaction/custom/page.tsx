"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Stopwatch from "@/components/Stopwatch";
import { useAuth } from "@/components/AuthContext";
import {
  ArrowLeft,
  Settings,
  Play,
  BarChart3,
  Thermometer,
  Wind,
  Zap,
  Droplets,
  AlertTriangle,
  Beaker,
  CheckCircle,
  Globe,
  Lock,
} from "lucide-react";
import Link from "next/link";

type Phase = "setup" | "execution" | "results";

export default function CustomReactionPage() {
  const router = useRouter();
  const { user } = useAuth();
  
  const [phase, setPhase] = useState<Phase>("setup");

  // Setup Form
  const [name, setName] = useState("My Custom Experiment");
  const [formula, setFormula] = useState("");
  const [chemicalsStr, setChemicalsStr] = useState("");
  const [durationMinutes, setDurationMinutes] = useState("10");

  // Execution
  const [stopwatchRunning, setStopwatchRunning] = useState(false);
  const [totalTime, setTotalTime] = useState(0);
  const [espConnected, setEspConnected] = useState(false);
  const [sensorMode, setSensorMode] = useState<'mq6' | 'mq7'>('mq6');
  const [, setStepTimings] = useState<number[]>([]);
  const executionStartRef = useRef<number>(0);
  const dataSimulationRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [simulatedData, setSimulatedData] = useState<
    { time_seconds: number; mq6_ppm: number; mq7_ppm: number; temp_celsius: number; humidity: number; anomaly?: boolean; status_label?: string }[]
  >([]);

  // Result state
  const [saveChoice, setSaveChoice] = useState<"global" | "private" | null>(null);
  const [saved, setSaved] = useState(false);

  // Stop simulation on unmount
  useEffect(() => {
    return () => {
      if (dataSimulationRef.current) clearInterval(dataSimulationRef.current);
    };
  }, []);

  const handleStartExecution = () => {
    if (!name) return;
    setPhase("execution");
    setStopwatchRunning(true);
    setSimulatedData([]);
    executionStartRef.current = Date.now();

    dataSimulationRef.current = setInterval(async () => {
      const elapsed = (Date.now() - executionStartRef.current) / 1000;
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";
        const res = await fetch(`${apiUrl}/latest`);

        if (res.status === 404) {
          setEspConnected(false);
          return; // No ESP data yet — wait silently
        }

        const result = await res.json();
        setEspConnected(true);
        if (result.sensor_mode) setSensorMode(result.sensor_mode as 'mq6' | 'mq7');

        setSimulatedData((prev) => [
          ...prev,
          {
            time_seconds: Math.round(elapsed),
            mq6_ppm: Math.round(result.sensor_data.mq6_gas),
            mq7_ppm: Math.round(result.sensor_data.mq7_gas),
            temp_celsius: Math.round(result.sensor_data.temperature * 10) / 10,
            humidity: Math.round(result.sensor_data.humidity * 10) / 10,
            anomaly: result.is_anomaly,
            status_label: result.status_label,
          },
        ]);
      } catch {
        setEspConnected(false);
      }
    }, 2000);
  };

  const handleFinishExperiment = (time: number) => {
    setStopwatchRunning(false);
    setTotalTime(time);
    if (dataSimulationRef.current) clearInterval(dataSimulationRef.current);
    setPhase("results");
  };

  const handleSave = (mode: "global" | "private") => {
    setSaveChoice(mode);
    setSaved(true);
  };

  const latestData = simulatedData.length > 0 ? simulatedData[simulatedData.length - 1] : null;
  const latestAnomaly = simulatedData.filter((d) => d.anomaly).slice(-1)[0];
  const hasRecentAnomaly =
    latestAnomaly && simulatedData.length > 0 && simulatedData.indexOf(latestAnomaly) > simulatedData.length - 4;

  return (
    <main className="bg-[#050505] min-h-screen text-white pt-20 pb-24 selection:bg-violet-500/30">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className={`absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-linear-to-br from-violet-600 to-indigo-600 opacity-[0.03] blur-[150px] rounded-full`} />
      </div>

      {/* Top Bar */}
      <div className="px-6 md:px-12 lg:px-24 mb-8 flex items-center gap-4 relative z-10">
        <button
          onClick={() => router.back()}
          className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
        >
          <ArrowLeft size={16} />
        </button>
        <div>
          <h1 className="text-2xl md:text-3xl font-medium tracking-tight">
            Custom Experiment
          </h1>
          <p className="text-sm font-mono text-white/40">Open sandbox</p>
        </div>
      </div>

      {/* Phase Navigation Tabs */}
      <div className="px-6 md:px-12 lg:px-24 mb-8 flex gap-2 relative z-10">
        {(
          [
            { key: "setup", label: "Setup", icon: Settings },
            { key: "execution", label: "Execute", icon: Play },
            { key: "results", label: "Results", icon: BarChart3 },
          ] as const
        ).map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => {
              if (key === "execution" && phase !== "execution" && phase !== "results") return;
              if (key === "results" && phase !== "results") return;
              setPhase(key);
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
              phase === key
                ? "bg-white/10 text-white border border-white/20"
                : "text-white/40 border border-white/5 hover:bg-white/5 hover:text-white/60"
            }`}
             disabled={key !== phase && (key === "execution" || key === "results")}
          >
            <Icon size={14} />
            {label}
          </button>
        ))}
      </div>

      <div className="px-6 md:px-12 lg:px-24 relative z-10">
        <AnimatePresence mode="wait">
          
          {/* ═══════════════════ SETUP PHASE ═══════════════════ */}
          {phase === "setup" && (
            <motion.div
              key="setup"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="max-w-2xl"
            >
              <div className="glass-card p-8">
                <h2 className="text-2xl font-medium tracking-tight mb-8">Define Parameters</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="text-sm text-white/50 mb-2 block uppercase tracking-widest font-medium">Experiment Name</label>
                    <input
                      type="text"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500/50 transition-colors"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Copper Sulfate Synthesis"
                    />
                  </div>

                  <div>
                    <label className="text-sm text-white/50 mb-2 block uppercase tracking-widest font-medium">Chemical Formula (Optional)</label>
                    <input
                      type="text"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white font-mono focus:outline-none focus:border-violet-500/50 transition-colors"
                      value={formula}
                      onChange={(e) => setFormula(e.target.value)}
                      placeholder="e.g. CuSO4 + H2O"
                    />
                  </div>

                  <div>
                    <label className="text-sm text-white/50 mb-2 block uppercase tracking-widest font-medium">Expected Duration (Minutes)</label>
                    <input
                      type="number"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500/50 transition-colors"
                      value={durationMinutes}
                      onChange={(e) => setDurationMinutes(e.target.value)}
                      placeholder="10"
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm text-white/50 mb-2 block uppercase tracking-widest font-medium">Chemicals (Comma separated)</label>
                    <textarea
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500/50 transition-colors min-h-[100px]"
                      value={chemicalsStr}
                      onChange={(e) => setChemicalsStr(e.target.value)}
                      placeholder="Copper, Sulfuric Acid..."
                    />
                  </div>
                </div>

                <div className="mt-8 flex justify-end">
                   <button
                    onClick={handleStartExecution}
                    className="px-8 py-4 bg-linear-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white font-medium rounded-xl transition-all shadow-[0_0_20px_rgba(139,92,246,0.3)] flex items-center gap-2"
                   >
                     Launch Experiment <Play size={16} />
                   </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* ═══════════════════ EXECUTION PHASE ═══════════════════ */}
          {phase === "execution" && (
            <motion.div
              key="execution"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left: Stopwatch */}
                <div className="flex flex-col items-center gap-8">
                  <Stopwatch
                    running={stopwatchRunning}
                    onLap={(time) => setStepTimings(prev => [...prev, time])}
                  />
                  <div className="w-full max-w-[280px]">
                     <button
                        onClick={() => handleFinishExperiment(totalTime !== 0 ? totalTime : Date.now() - executionStartRef.current)}
                        className="w-full px-6 py-3 bg-red-600/20 hover:bg-red-600/40 text-red-400 border border-red-500/30 rounded-xl transition-all flex items-center justify-center gap-2"
                     >
                        <CheckCircle size={18} /> Finish Experiment manually
                     </button>
                  </div>
                </div>

                {/* Center: Live Monitoring */}
                <div className="lg:col-span-2">
                  <div className="glass-card p-8 relative overflow-hidden">
                    <AnimatePresence>
                      {hasRecentAnomaly && (
                        <motion.div
                          initial={{ opacity: 0, y: -20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          className="absolute top-0 left-0 w-full p-3 bg-red-500/10 border-b border-red-500/20 z-20 flex items-center gap-3"
                        >
                          <AlertTriangle size={18} className="text-red-400 animate-pulse" />
                          <span className="text-sm text-red-300 font-medium">
                            Anomaly Detected! Status: {latestAnomaly?.status_label}
                          </span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    
                    <div className="mb-6 flex items-center justify-between">
                       <div>
                         <h3 className="text-xl font-medium tracking-tight mb-1 flex items-center gap-2">
                           <Beaker size={20} className="text-violet-400" />
                           {name}
                         </h3>
                         <p className="text-white/40 text-sm font-mono">{formula || "Custom Sandbox"}</p>
                       </div>
                       <div className="flex flex-col items-end gap-2">
                         <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border ${
                           espConnected
                             ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                             : 'bg-white/5 border-white/10 text-white/40'
                         }`}>
                           <span className={`w-1.5 h-1.5 rounded-full ${espConnected ? 'bg-emerald-400 animate-pulse' : 'bg-white/30'}`} />
                           {espConnected ? 'ESP8266 Live' : 'Waiting for ESP...'}
                         </div>
                         <span className="flex items-center gap-2 text-sm text-green-400">
                            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" /> Live Monitoring
                         </span>
                       </div>
                    </div>

                    <div className="glass-card p-6 bg-[#0a0a0a] border-white/5 relative overflow-hidden">
                       <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/10 rounded-full blur-[80px]" />
                       <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                         <div>
                            <span className="text-xs text-white/40 uppercase tracking-widest flex items-center gap-1 mb-2">
                               <Wind size={12} /> {sensorMode === 'mq6' ? 'MQ6 (LPG)' : 'MQ7 (CO)'}
                            </span>
                            <span className="text-4xl font-light text-cyan-400">
                               {latestData ? (sensorMode === 'mq6' ? latestData.mq6_ppm : latestData.mq7_ppm) : "--"}
                            </span>
                         </div>
                         <div>
                            <span className="text-xs text-white/40 uppercase tracking-widest flex items-center gap-1 mb-2">
                               <Zap size={12} /> MQ7 (CO)
                            </span>
                            <span className="text-4xl font-light text-red-400">
                               {latestData ? latestData.mq7_ppm : "--"}
                            </span>
                         </div>
                         <div>
                            <span className="text-xs text-white/40 uppercase tracking-widest flex items-center gap-1 mb-2">
                               <Thermometer size={12} /> Temp
                            </span>
                            <span className="text-4xl font-light text-amber-400">
                               {latestData ? latestData.temp_celsius : "--"}
                            </span>
                         </div>
                         <div>
                            <span className="text-xs text-white/40 uppercase tracking-widest flex items-center gap-1 mb-2">
                               <Droplets size={12} /> Humidity
                            </span>
                            <span className="text-4xl font-light text-blue-400">
                               {latestData ? latestData.humidity : "--"}
                            </span>
                         </div>
                       </div>
                    </div>

                    {/* Basic Line Timeline SVG (Visual flair) */}
                    {simulatedData.length > 1 && (
                      <div className="mt-8 relative h-32 w-full border border-white/5 rounded-lg overflow-hidden bg-black/50 p-2">
                         <span className="absolute top-2 left-2 text-[10px] uppercase font-mono text-white/20">Timeline (Gas & Temp)</span>
                         <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full pt-4">
                           <path
                             d={`M 0,100 ` + simulatedData.map((d, i) => `L ${i / (simulatedData.length - 1) * 100},${100 - (d.mq6_ppm - 200) / 400 * 100}`).join(" ")}
                             fill="none" stroke="rgba(34,211,238,0.5)" strokeWidth="1" vectorEffect="non-scaling-stroke"
                           />
                           <path
                             d={`M 0,100 ` + simulatedData.map((d, i) => `L ${i / (simulatedData.length - 1) * 100},${100 - (d.temp_celsius - 20) / 20 * 100}`).join(" ")}
                             fill="none" stroke="rgba(251,191,36,0.5)" strokeWidth="1" vectorEffect="non-scaling-stroke"
                           />
                         </svg>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ═══════════════════ RESULTS PHASE ═══════════════════ */}
          {phase === "results" && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="max-w-5xl mx-auto"
            >
              <div className="text-center mb-12">
                <CheckCircle size={64} className="text-green-400 mx-auto mb-4" />
                <h2 className="text-4xl font-medium tracking-tight mb-2">Experiment Halted</h2>
                <p className="text-white/50">{name} — Sandbox closed.</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="glass-card p-5 text-center">
                  <Wind size={20} className="text-cyan-400 mx-auto mb-2" />
                  <span className="text-xs text-white/40 uppercase tracking-widest block mb-1">Peak {sensorMode === 'mq6' ? 'MQ6' : 'MQ7'}</span>
                  <span className="text-2xl font-medium">
                    {simulatedData.length > 0 ? Math.max(...simulatedData.map((d) => sensorMode === 'mq6' ? d.mq6_ppm : d.mq7_ppm)) : "--"}
                    <span className="text-sm text-white/30 ml-1">ppm</span>
                  </span>
                </div>
                <div className="glass-card p-5 text-center">
                  <Zap size={20} className="text-red-400 mx-auto mb-2" />
                  <span className="text-xs text-white/40 uppercase tracking-widest block mb-1">Peak MQ7</span>
                  <span className="text-2xl font-medium">
                    {simulatedData.length > 0 ? Math.max(...simulatedData.map((d) => d.mq7_ppm)) : "--"}
                    <span className="text-sm text-white/30 ml-1">ppm</span>
                  </span>
                </div>
                <div className="glass-card p-5 text-center">
                  <Thermometer size={20} className="text-amber-400 mx-auto mb-2" />
                  <span className="text-xs text-white/40 uppercase tracking-widest block mb-1">Peak Temp</span>
                  <span className="text-2xl font-medium">
                    {simulatedData.length > 0 ? Math.max(...simulatedData.map((d) => d.temp_celsius)) : "--"}
                    <span className="text-sm text-white/30 ml-1">°C</span>
                  </span>
                </div>
                <div className="glass-card p-5 text-center">
                  <Activity size={20} className="text-violet-400 mx-auto mb-2" />
                  <span className="text-xs text-white/40 uppercase tracking-widest block mb-1">Anomalies</span>
                  <span className="text-2xl font-medium">
                    {simulatedData.filter(d => d.anomaly).length}
                    <span className="text-sm text-white/30 ml-1">flags</span>
                  </span>
                </div>
              </div>

              {!saved ? (
                <div className="glass-card p-8 text-center max-w-2xl mx-auto">
                  <h3 className="text-xl font-medium mb-2">Save Custom Data?</h3>
                  <p className="text-white/40 text-sm mb-8">
                    {user
                      ? "Store this run in your private ledger or broadcast to global nodes."
                      : "Sign in to save this custom sandbox run."}
                  </p>

                  <div className="flex justify-center gap-4 flex-wrap">
                    <button
                      onClick={() => handleSave("global")}
                      className={`flex items-center gap-3 px-6 py-3 rounded-xl border transition-all ${
                        saveChoice === "global" ? "border-blue-500 bg-blue-500/10" : "border-white/10 bg-white/2 hover:bg-white/5"
                      }`}
                    >
                      <Globe size={18} className="text-blue-400" />
                      <div className="text-left">
                        <span className="block text-sm font-medium">Broadcase Globally</span>
                        <span className="block text-xs text-white/40">Contribute to community</span>
                      </div>
                    </button>

                    {user && (
                      <button
                        onClick={() => handleSave("private")}
                        className={`flex items-center gap-3 px-6 py-3 rounded-xl border transition-all ${
                          saveChoice === "private" ? "border-violet-500 bg-violet-500/10" : "border-white/10 bg-white/2 hover:bg-white/5"
                        }`}
                      >
                        <Lock size={18} className="text-violet-400" />
                        <div className="text-left">
                          <span className="block text-sm font-medium">Save Privately</span>
                          <span className="block text-xs text-white/40">Only you can see this</span>
                        </div>
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass-card p-8 text-center max-w-2xl mx-auto">
                  <CheckCircle size={32} className="text-green-400 mx-auto mb-3" />
                  <h3 className="text-xl font-medium mb-1">Data Cataloged!</h3>
                  <p className="text-white/40 text-sm mb-6">Your sandbox run was recorded successfully.</p>
                  <Link href="/dashboard" className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl transition-colors">
                    <BarChart3 size={16} /> Return to Dashboard
                  </Link>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}

const Activity = ({ size, className }: { size: number; className?: string }) => (
  // simple lucid icon replacement for Activity
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
  </svg>
);
