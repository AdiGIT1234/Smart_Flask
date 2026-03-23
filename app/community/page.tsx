"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  Users,
  FlaskConical,
  TrendingUp,
  AlertTriangle,
  Wind,
  Zap,
  Thermometer,
  Droplets,
  ArrowUpRight,
  Activity,
} from "lucide-react";

// Mock community data
const topReactions = [
  { name: "Charcoal Combustion", runs: 243, avgCO: 312, trend: "+18%" },
  { name: "LPG Leak Simulation", runs: 189, avgLPG: 980, trend: "+7%" },
  { name: "Candle in a Jar", runs: 156, avgCO: 175, trend: "+24%" },
  { name: "Alcohol Evaporation", runs: 134, avgLPG: 620, trend: "+12%" },
  { name: "Baking Soda & Vinegar", runs: 98, avgCO: 6, trend: "-3%" },
  { name: "Sugar Dehydration", runs: 67, avgCO: 480, trend: "+31%" },
];

const recentAnomaly = [
  { user: "Lab #47", reaction: "Charcoal Combustion", sensor: "MQ7", value: "520 ppm", time: "12 min ago" },
  { user: "Lab #12", reaction: "Sugar Dehydration", sensor: "DHT11", value: "92°C", time: "38 min ago" },
  { user: "Lab #89", reaction: "LPG Leak Simulation", sensor: "MQ6", value: "2100 ppm", time: "1 hr ago" },
];

export default function CommunityPage() {
  const [timeRange, setTimeRange] = useState<"24h" | "7d" | "30d">("7d");

  const globalStats = [
    { label: "Total Experiments", value: "887", icon: FlaskConical, color: "text-violet-400", bg: "bg-violet-500/10 border-violet-500/20" },
    { label: "Active Labs", value: "34", icon: Users, color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20" },
    { label: "Data Points", value: "142K", icon: Activity, color: "text-green-400", bg: "bg-green-500/10 border-green-500/20" },
    { label: "Anomalies (7d)", value: "28", icon: AlertTriangle, color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20" },
  ];

  return (
    <main className="bg-[#050505] min-h-screen text-white pt-24 pb-24 selection:bg-violet-500/30">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-green-600/5 blur-[150px] rounded-full" />
        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-blue-600/5 blur-[120px] rounded-full" />
      </div>

      <div className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto relative z-10">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <span className="text-green-400 font-medium tracking-widest uppercase text-sm mb-2 block">
            Community
          </span>
          <h1 className="text-5xl md:text-6xl font-medium tracking-tighter mb-4 leading-[1.1]">
            Community <span className="text-white/50">Analysis</span>
          </h1>
          <p className="text-lg text-white/50 max-w-2xl font-light">
            Real-time aggregated data from all public experiments. See what the community is running, their results, and emerging trends.
          </p>
        </motion.div>

        {/* Time Range Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex gap-2 mb-8"
        >
          {(["24h", "7d", "30d"] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                timeRange === range
                  ? "bg-white/10 text-white border border-white/20"
                  : "text-white/40 border border-white/5 hover:bg-white/5 hover:text-white/60"
              }`}
            >
              {range}
            </button>
          ))}
        </motion.div>

        {/* Global Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {globalStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.05 }}
              className="glass-card p-5"
            >
              <div className={`w-10 h-10 rounded-xl ${stat.bg} border flex items-center justify-center mb-3`}>
                <stat.icon size={18} className={stat.color} />
              </div>
              <span className="text-xs text-white/40 uppercase tracking-widest block mb-1">
                {stat.label}
              </span>
              <span className="text-3xl font-medium">{stat.value}</span>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Top Reactions - Left Panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-3 glass-card p-8"
          >
            <h2 className="text-xl font-medium tracking-tight mb-6 flex items-center gap-3">
              <TrendingUp size={18} className="text-green-400" />
              Most Performed Reactions
            </h2>

            <div className="space-y-3">
              {topReactions.map((rx, i) => (
                <div
                  key={rx.name}
                  className="flex items-center gap-4 p-4 rounded-xl bg-white/2 border border-white/5 hover:bg-white/5 transition-colors group"
                >
                  <span className="text-lg font-medium text-white/20 w-6 text-right font-mono">
                    {i + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-white/90 group-hover:text-white transition-colors truncate">
                      {rx.name}
                    </h4>
                    <span className="text-xs text-white/40">
                      {rx.runs} experiments
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    {rx.avgCO !== undefined && (
                      <span className="text-xs font-mono text-red-400/70 flex items-center gap-1">
                        <Zap size={10} /> {rx.avgCO}
                      </span>
                    )}
                    {rx.avgLPG !== undefined && (
                      <span className="text-xs font-mono text-cyan-400/70 flex items-center gap-1">
                        <Wind size={10} /> {rx.avgLPG}
                      </span>
                    )}
                    <span
                      className={`text-xs font-medium flex items-center gap-0.5 ${
                        rx.trend.startsWith("+") ? "text-green-400" : "text-red-400"
                      }`}
                    >
                      <ArrowUpRight size={12} />
                      {rx.trend}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Panels */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            {/* Sensor Averages */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="glass-card p-6"
            >
              <h3 className="text-lg font-medium tracking-tight mb-4 flex items-center gap-2">
                <Activity size={16} className="text-blue-400" />
                Global Sensor Averages
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-white/2 border border-white/5">
                  <span className="text-xs text-white/40 flex items-center gap-1 mb-1">
                    <Wind size={10} /> MQ6 (LPG)
                  </span>
                  <span className="text-xl font-medium text-cyan-400">
                    384 <span className="text-xs text-white/30">ppm avg</span>
                  </span>
                </div>
                <div className="p-3 rounded-lg bg-white/2 border border-white/5">
                  <span className="text-xs text-white/40 flex items-center gap-1 mb-1">
                    <Zap size={10} /> MQ7 (CO)
                  </span>
                  <span className="text-xl font-medium text-red-400">
                    187 <span className="text-xs text-white/30">ppm avg</span>
                  </span>
                </div>
                <div className="p-3 rounded-lg bg-white/2 border border-white/5">
                  <span className="text-xs text-white/40 flex items-center gap-1 mb-1">
                    <Thermometer size={10} /> Temp
                  </span>
                  <span className="text-xl font-medium text-amber-400">
                    38.2 <span className="text-xs text-white/30">°C avg</span>
                  </span>
                </div>
                <div className="p-3 rounded-lg bg-white/2 border border-white/5">
                  <span className="text-xs text-white/40 flex items-center gap-1 mb-1">
                    <Droplets size={10} /> Humidity
                  </span>
                  <span className="text-xl font-medium text-blue-400">
                    54.7 <span className="text-xs text-white/30">% avg</span>
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Recent Anomalies */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="glass-card p-6"
            >
              <h3 className="text-lg font-medium tracking-tight mb-4 flex items-center gap-2">
                <AlertTriangle size={16} className="text-red-400" />
                Recent Anomalies
              </h3>
              <div className="space-y-2">
                {recentAnomaly.map((a, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-lg bg-red-500/5 border border-red-500/10"
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-xs font-medium text-white/80">
                        {a.user} — {a.reaction}
                      </span>
                      <span className="text-[10px] text-white/30">{a.time}</span>
                    </div>
                    <span className="text-xs text-red-400">
                      {a.sensor}: {a.value}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}
