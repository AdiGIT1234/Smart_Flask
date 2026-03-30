"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function DashboardSection() {
  const [espData, setEspData] = useState<{
    mq6: string | number;
    temp: string | number;
    mlConfidence: string;
    totalAnalyzed: string;
  }>({
    mq6: "--",
    temp: "--",
    mlConfidence: "--",
    totalAnalyzed: "--"
  });

  // Placeholder effect for when ESP32 WebSocket/API is integrated
  useEffect(() => {
    // e.g. socket.on('data', (data) => setEspData({ ... }))
  }, []);

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
          <div className="lg:col-span-3 mb-12 flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="text-3xl md:text-5xl font-medium tracking-tight text-white/90 mb-4">
              Intelligence in Action
            </h3>
            <p className="text-lg text-white/50 max-w-2xl">
              Live data from the latest synthesis run. Anomalies are detected and resolved automatically by the Smart Reaction Engine.
            </p>
          </div>

          {/* Left Column - Live Cards */}
          <div className="flex flex-col gap-8">
            <Card title="Live Gas Level" value={espData.mq6.toString()} unit="ppm" accent="glow-blue" change="--" />
            <Card title="Core Temp" value={espData.temp.toString()} unit="°C" accent="glow-amber" change="--" />
            
            {/* ML Output */}
            <div className={`glass-card p-6 flex flex-col gap-4 relative overflow-hidden group`}>
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-3xl group-hover:bg-green-500/20 transition-all duration-700" />
              <div className="flex justify-between items-start">
                <span className="text-sm font-medium tracking-wide text-white/50 uppercase">
                  ML Diagnosis
                </span>
                <span className="flex items-center gap-2 text-xs font-semibold px-2 py-1 bg-green-500/20 text-green-400 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 pulse-dot" /> Live
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-medium tracking-tight text-green-400 mb-1">
                  Correct
                </span>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-green-400 w-[96%]" />
                  </div>
                  <span className="text-sm text-white/70 font-mono">{espData.mlConfidence} Conf.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Center Column - Charts */}
          <div className="lg:col-span-2 glass-card p-8 flex flex-col relative overflow-hidden group">
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

            {/* Fake Chart Area */}
            <div className="flex-1 min-h-[300px] w-full chart-grid rounded-lg border border-white/5 relative flex items-end">
              
              {/* Temp Line SVG (Amber) */}
              <svg className="absolute inset-0 w-full h-full preserve-3d" viewBox="0 0 100 100" preserveAspectRatio="none">
                 <path 
                   d="M0,80 Q25,85 40,60 T70,40 T100,50" 
                   fill="none" 
                   stroke="currentColor" 
                   strokeWidth="2" 
                   className="text-amber-500/80 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]" 
                   vectorEffect="non-scaling-stroke"
                 />
                 {/* Area under curve */}
                 <path 
                   d="M0,80 Q25,85 40,60 T70,40 T100,50 L100,100 L0,100 Z" 
                   fill="url(#amber-gradient)" 
                   className="opacity-20"
                 />
                 <linearGradient id="amber-gradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f59e0b" stopOpacity="1" />
                    <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
                 </linearGradient>
              </svg>

              {/* Gas Line SVG (Blue) */}
              <svg className="absolute inset-0 w-full h-full preserve-3d" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path 
                  d="M0,90 Q30,80 50,40 T80,20 T100,15" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2.5" 
                  className="text-blue-500 drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]" 
                  vectorEffect="non-scaling-stroke"
                />
                 {/* Area under curve */}
                 <path 
                   d="M0,90 Q30,80 50,40 T80,20 T100,15 L100,100 L0,100 Z" 
                   fill="url(#blue-gradient)" 
                   className="opacity-20"
                 />
                 <linearGradient id="blue-gradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="1" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                 </linearGradient>
              </svg>

              {/* Data tooltips/dots */}
              <div className="absolute top-[35%] left-[50%] w-3 h-3 bg-white rounded-full glow-blue translate-x-[-50%] translate-y-[-50%]" />
              <div className="absolute top-[28%] left-[50%] bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs px-2 py-1 rounded backdrop-blur-md -translate-x-1/2 -translate-y-full">
                Spike Detected
              </div>

            </div>

            {/* X Axis Labels */}
            <div className="flex justify-between w-full mt-4 text-xs font-mono text-white/30 px-2">
              <span>00:00</span>
              <span>15:00</span>
              <span>30:00</span>
              <span>45:00</span>
              <span>60:00</span>
            </div>

          </div>

          {/* Bottom Log Feed */}
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
             {/* Log Activity */}
             <div className="glass-card p-6 border-l-4 border-l-violet-500">
               <h4 className="text-sm font-medium tracking-wide text-white/70 mb-4 uppercase">Automated Reaction Log</h4>
               <div className="flex flex-col gap-3 font-mono text-xs text-white/60">
                  <div className="flex gap-4">
                     <span className="text-white/30">14:02:11</span>
                     <span className="text-blue-400 font-semibold">[INFO]</span>
                     <span className="flex-1 truncate">Catalyst introduced to mixture.</span>
                  </div>
                  <div className="flex gap-4">
                     <span className="text-white/30">14:02:43</span>
                     <span className="text-amber-400 font-semibold">[WARN]</span>
                     <span className="flex-1 truncate">Minor exothermic spike detected. Heating reduced.</span>
                  </div>
                  <div className="flex gap-4">
                     <span className="text-white/30">14:05:09</span>
                     <span className="text-violet-400 font-semibold">[ANALYSIS]</span>
                     <span className="flex-1 truncate">Reaction stabilized. Phase 2 complete.</span>
                  </div>
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
                     {espData.totalAnalyzed}
                   </div>
                   <div className="text-xs text-green-400 mt-1">Reactions Analyzed Today</div>
                </div>
             </div>
          </div>
        </motion.div>
      </div>
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
