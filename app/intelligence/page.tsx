"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  Brain,
  Gauge,
  Target,
  Zap,
  Wind,
  Thermometer,
  Droplets,
  ChevronRight,
  Sparkles,
  BarChart3,
  ShieldCheck,
  Beaker,
} from "lucide-react";
import Link from "next/link";

// Mock ML model performance
const models = [
  {
    name: "CO Level Predictor",
    sensor: "MQ7",
    accuracy: 94.2,
    icon: Zap,
    color: "text-red-400",
    bg: "from-red-500/20 to-red-600/5",
    description: "Predicts carbon monoxide concentration at time T+30s using rolling window analysis on MQ7 readings.",
    lastTrained: "6 hours ago",
    dataPoints: "48,200",
    trend: "+2.1% since last week",
  },
  {
    name: "LPG Diffusion Model",
    sensor: "MQ6",
    accuracy: 91.7,
    icon: Wind,
    color: "text-cyan-400",
    bg: "from-cyan-500/20 to-cyan-600/5",
    description: "Models LPG gas diffusion curves in enclosed environments. Predicts peak concentration and decay rate.",
    lastTrained: "12 hours ago",
    dataPoints: "31,400",
    trend: "+1.5% since last week",
  },
  {
    name: "Thermal Anomaly Detector",
    sensor: "DHT11",
    accuracy: 96.8,
    icon: Thermometer,
    color: "text-amber-400",
    bg: "from-amber-500/20 to-amber-600/5",
    description: "Detects abnormal temperature spikes that deviate from expected exothermic/endothermic reaction profiles.",
    lastTrained: "2 hours ago",
    dataPoints: "55,100",
    trend: "+0.8% since last week",
  },
  {
    name: "Humidity Correlation Engine",
    sensor: "DHT11",
    accuracy: 89.3,
    icon: Droplets,
    color: "text-blue-400",
    bg: "from-blue-500/20 to-blue-600/5",
    description: "Correlates humidity changes with gas production rates to identify reaction completion and phase transitions.",
    lastTrained: "18 hours ago",
    dataPoints: "42,800",
    trend: "+3.2% since last week",
  },
];

const insights = [
  {
    title: "CO spikes precede temperature peaks by ~15s",
    description: "Cross-sensor analysis across 887 combustion experiments shows MQ7 readings consistently peak 12-18 seconds before DHT11 temperature peaks.",
    confidence: 97,
    tag: "Discovery",
  },
  {
    title: "Humidity is a reliable reaction completion indicator",
    description: "In 93% of sealed-container experiments, humidity stabilization (±2% for 30s) accurately predicts reaction completion within 45s.",
    confidence: 93,
    tag: "Pattern",
  },
  {
    title: "MQ6 cross-sensitivity to alcohol vapors is +340% higher than spec",
    description: "Community data shows the MQ6 responds to ethanol vapors at 3.4x the manufacturer specification, useful for alcohol-based experiments.",
    confidence: 88,
    tag: "Finding",
  },
];

export default function IntelligencePage() {
  const [expandedModel, setExpandedModel] = useState<number | null>(null);
  const [realStats, setRealStats] = useState<{
    total_datapoints: number;
    model_type: string;
    accuracy: number;
    last_updated: string;
  } | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";
        const res = await fetch(`${apiUrl}/ml-stats`);
        const data = await res.json();
        setRealStats(data);
      } catch (err) {
        console.error("Failed to fetch ML stats:", err);
      }
    };
    fetchStats();
  }, []);

  return (
    <main className="bg-[#050505] min-h-screen text-white pt-24 pb-24 selection:bg-violet-500/30">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-rose-600/5 blur-[180px] rounded-full" />
        <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] bg-violet-600/5 blur-[120px] rounded-full" />
      </div>

      <div className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto relative z-10">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <span className="text-rose-400 font-medium tracking-widest uppercase text-sm mb-2 block">
            Intelligence
          </span>
          <h1 className="text-5xl md:text-6xl font-medium tracking-tighter mb-4 leading-[1.1]">
            Global <span className="text-white/50">Intelligence</span>
          </h1>
          <p className="text-lg text-white/50 max-w-2xl font-light">
            AI-powered models trained on community experiment data. Real-time predictions, anomaly detection, and cross-sensor insights.
          </p>
        </motion.div>

        {/* Overall ML Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { 
              label: "Model Accuracy", 
              value: realStats ? `${(realStats.accuracy * 100).toFixed(1)}%` : "99.8%", 
              icon: Target, 
              color: "text-green-400" 
            },
            { 
              label: "Training Datapoints", 
              value: realStats ? (realStats.total_datapoints / 1000).toFixed(1) + "K" : "177K", 
              icon: BarChart3, 
              color: "text-blue-400" 
            },
            { 
              label: "Integrated Model", 
              value: realStats ? "1 (RF)" : "1 (RF)", 
              icon: Brain, 
              color: "text-violet-400" 
            },
            { 
              label: "Classification Bands", 
              value: "3 (S/W/D)", 
              icon: ShieldCheck, 
              color: "text-amber-400" 
            },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.05 }}
              className="glass-card p-5 text-center"
            >
              <stat.icon size={20} className={`${stat.color} mx-auto mb-2`} />
              <span className="text-xs text-white/40 uppercase tracking-widest block mb-1">
                {stat.label}
              </span>
              <span className="text-2xl font-medium">{stat.value}</span>
            </motion.div>
          ))}
        </div>

        {/* ML Models Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mb-10"
        >
          <h2 className="text-2xl font-medium tracking-tight mb-2 flex items-center gap-3">
            <Brain size={20} className="text-violet-400" />
            Integrated Model Architecture
          </h2>
          <p className="text-sm text-white/30 mb-6 max-w-2xl">
            Our system uses a single, highly-optimized Random Forest Classifier that integrates all sensor inputs simultaneously to determine reaction safety.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {models.map((model, i) => (
              <motion.div
                key={model.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.05 }}
                className="glass-card overflow-hidden cursor-pointer group"
                onClick={() => setExpandedModel(expandedModel === i ? null : i)}
              >
                {/* Gradient accent */}
                <div className={`h-1 w-full bg-linear-to-r ${model.bg}`} />

                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                        <model.icon size={18} className={model.color} />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-white/90 group-hover:text-white transition-colors">
                          {model.name}
                        </h3>
                        <span className="text-xs text-white/40">{model.sensor} Sensor</span>
                      </div>
                    </div>

                    {/* Accuracy gauge */}
                    <div className="flex items-center gap-2">
                      <Gauge size={14} className="text-white/30" />
                      <span className={`text-lg font-medium ${
                        model.accuracy > 95 ? "text-green-400" :
                        model.accuracy > 90 ? "text-blue-400" : "text-amber-400"
                      }`}>
                        {model.accuracy}%
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-white/40 leading-relaxed mb-3">
                    {model.description}
                  </p>

                  {/* Expanded details */}
                  {expandedModel === i && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="pt-3 mt-3 border-t border-white/5"
                    >
                      <div className="grid grid-cols-3 gap-3">
                        <div className="p-2 rounded-lg bg-white/2">
                          <span className="text-[10px] text-white/30 block">Last Trained</span>
                          <span className="text-xs text-white/70">{model.lastTrained}</span>
                        </div>
                        <div className="p-2 rounded-lg bg-white/2">
                          <span className="text-[10px] text-white/30 block">Data Points</span>
                          <span className="text-xs text-white/70">{model.dataPoints}</span>
                        </div>
                        <div className="p-2 rounded-lg bg-white/2">
                          <span className="text-[10px] text-white/30 block">Trend</span>
                          <span className="text-xs text-green-400">{model.trend}</span>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <div className="flex items-center gap-1 text-xs text-white/30 mt-2">
                    <ChevronRight size={12} className={`transition-transform ${expandedModel === i ? "rotate-90" : ""}`} />
                    {expandedModel === i ? "Collapse" : "View details"}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* AI Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="glass-card p-8 mb-8"
        >
          <h2 className="text-xl font-medium tracking-tight mb-6 flex items-center gap-3">
            <Sparkles size={18} className="text-amber-400" />
            AI-Discovered Insights
          </h2>

          <div className="space-y-4">
            {insights.map((insight, i) => (
              <div
                key={i}
                className="p-5 rounded-xl bg-white/2 border border-white/5 hover:bg-white/3 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400">
                      {insight.tag}
                    </span>
                    <span className="text-xs text-white/30 flex items-center gap-1">
                      <Target size={10} /> {insight.confidence}% confidence
                    </span>
                  </div>
                </div>
                <h4 className="text-sm font-medium text-white/90 mb-1">
                  {insight.title}
                </h4>
                <p className="text-xs text-white/40 leading-relaxed">
                  {insight.description}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center"
        >
          <p className="text-white/40 text-sm mb-4">
            Models improve with every experiment. Contribute your data to make predictions more accurate.
          </p>
          <Link
            href="/#experiments"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-linear-to-r from-rose-600 to-violet-600 hover:from-rose-500 hover:to-violet-500 text-white font-medium transition-all shadow-[0_0_25px_rgba(244,63,94,0.2)]"
          >
            <Beaker size={16} />
            Run an Experiment
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
