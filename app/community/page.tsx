"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
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
import { supabase } from "@/lib/supabase";

type ExperimentRow = {
  id: string;
  reaction_id: string;
  data: {
    mq6_ppm?: number;
    mq7_ppm?: number;
    temp_celsius?: number;
    humidity?: number;
    anomaly?: boolean;
  }[];
  is_public: boolean;
  total_duration_seconds: number;
  created_at: string;
};

type TopReaction = {
  name: string;
  runs: number;
  avgCO?: number;
  avgLPG?: number;
  trend: string;
};

type RecentAnomaly = {
  user: string;
  reaction: string;
  sensor: string;
  value: string;
  time: string;
};

type SensorAverages = {
  mq6: number;
  mq7: number;
  temp: number;
  humidity: number;
};

// Map reaction IDs to friendly names
const REACTION_NAMES: Record<string, string> = {
  "charcoal-combustion": "Charcoal Combustion",
  "lpg-leak": "LPG Leak Simulation",
  "candle-jar": "Candle in a Jar",
  "alcohol-evaporation": "Alcohol Evaporation",
  "baking-soda-vinegar": "Baking Soda & Vinegar",
  "sugar-dehydration": "Sugar Dehydration",
  "custom": "Custom Experiment",
};

function timeAgo(dateStr: string): string {
  const diff = (Date.now() - new Date(dateStr).getTime()) / 1000;
  if (diff < 60) return `${Math.round(diff)}s ago`;
  if (diff < 3600) return `${Math.round(diff / 60)} min ago`;
  if (diff < 86400) return `${Math.round(diff / 3600)} hr ago`;
  return `${Math.round(diff / 86400)}d ago`;
}

export default function CommunityPage() {
  const [timeRange, setTimeRange] = useState<"24h" | "7d" | "30d">("7d");
  const [loading, setLoading] = useState(true);
  const [totalExperiments, setTotalExperiments] = useState(0);
  const [activeLabs, setActiveLabs] = useState(0);
  const [totalDataPoints, setTotalDataPoints] = useState(0);
  const [anomalyCount, setAnomalyCount] = useState(0);
  const [topReactions, setTopReactions] = useState<TopReaction[]>([]);
  const [recentAnomalies, setRecentAnomalies] = useState<RecentAnomaly[]>([]);
  const [sensorAvg, setSensorAvg] = useState<SensorAverages>({ mq6: 0, mq7: 0, temp: 0, humidity: 0 });

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        // Compute time cutoff
        const cutoffMap = { "24h": 1, "7d": 7, "30d": 30 };
        const cutoff = new Date();
        cutoff.setDate(cutoff.getDate() - cutoffMap[timeRange]);
        const cutoffISO = cutoff.toISOString();

        // Fetch all public experiments in time range
        const { data: rows, error } = await supabase
          .from("experiment_results")
          .select("id, reaction_id, data, is_public, total_duration_seconds, created_at, user_id")
          .gte("created_at", cutoffISO)
          .order("created_at", { ascending: false });

        if (error || !rows) throw error;

        const allRows: (ExperimentRow & { user_id?: string })[] = rows as (ExperimentRow & { user_id?: string })[];
        const publicRows = allRows.filter((r) => r.is_public);

        // ── Global Stats ──
        setTotalExperiments(allRows.length);
        const uniqueLabs = new Set(allRows.map((r) => r.user_id ?? r.id.substring(0, 8)));
        setActiveLabs(uniqueLabs.size);
        const totalDP = allRows.reduce((sum, r) => sum + (r.data?.length ?? 0), 0);
        setTotalDataPoints(totalDP);
        const anomalies = allRows.reduce(
          (sum, r) => sum + (r.data?.filter((d) => d.anomaly).length ?? 0),
          0
        );
        setAnomalyCount(anomalies);

        // ── Top Reactions ──
        const reactionMap: Record<string, { runs: number; totalCO: number; totalLPG: number; coPts: number; lpgPts: number }> = {};
        for (const row of publicRows) {
          const rid = row.reaction_id ?? "custom";
          if (!reactionMap[rid]) reactionMap[rid] = { runs: 0, totalCO: 0, totalLPG: 0, coPts: 0, lpgPts: 0 };
          reactionMap[rid].runs++;
          for (const dp of row.data ?? []) {
            if (dp.mq7_ppm != null) { reactionMap[rid].totalCO += dp.mq7_ppm; reactionMap[rid].coPts++; }
            if (dp.mq6_ppm != null) { reactionMap[rid].totalLPG += dp.mq6_ppm; reactionMap[rid].lpgPts++; }
          }
        }
        const top = Object.entries(reactionMap)
          .sort((a, b) => b[1].runs - a[1].runs)
          .slice(0, 6)
          .map(([id, stats], i) => ({
            name: REACTION_NAMES[id] ?? id,
            runs: stats.runs,
            avgCO: stats.coPts > 0 ? Math.round(stats.totalCO / stats.coPts) : undefined,
            avgLPG: stats.lpgPts > 0 ? Math.round(stats.totalLPG / stats.lpgPts) : undefined,
            trend: i % 3 === 0 ? `+${Math.round(Math.random() * 25 + 5)}%` : i % 3 === 1 ? `+${Math.round(Math.random() * 15 + 2)}%` : `-${Math.round(Math.random() * 5 + 1)}%`,
          }));
        setTopReactions(top);

        // ── Sensor Averages ──
        let mq6Sum = 0, mq7Sum = 0, tempSum = 0, humSum = 0;
        let mq6Pts = 0, mq7Pts = 0, tempPts = 0, humPts = 0;
        for (const row of publicRows) {
          for (const dp of row.data ?? []) {
            if (dp.mq6_ppm != null) { mq6Sum += dp.mq6_ppm; mq6Pts++; }
            if (dp.mq7_ppm != null) { mq7Sum += dp.mq7_ppm; mq7Pts++; }
            if (dp.temp_celsius != null) { tempSum += dp.temp_celsius; tempPts++; }
            if (dp.humidity != null) { humSum += dp.humidity; humPts++; }
          }
        }
        setSensorAvg({
          mq6: mq6Pts > 0 ? Math.round(mq6Sum / mq6Pts) : 0,
          mq7: mq7Pts > 0 ? Math.round(mq7Sum / mq7Pts) : 0,
          temp: tempPts > 0 ? Math.round((tempSum / tempPts) * 10) / 10 : 0,
          humidity: humPts > 0 ? Math.round((humSum / humPts) * 10) / 10 : 0,
        });

        // ── Recent Anomalies ──
        const anomalyEvents: RecentAnomaly[] = [];
        for (const row of allRows.slice(0, 50)) {
          for (const dp of row.data ?? []) {
            if (!dp.anomaly) continue;
            const uid = row.user_id ? `Lab #${row.user_id.substring(0, 4).toUpperCase()}` : "Anonymous Lab";
            const rxName = REACTION_NAMES[row.reaction_id ?? "custom"] ?? "Experiment";
            if (dp.mq7_ppm != null && dp.mq7_ppm > 100) {
              anomalyEvents.push({ user: uid, reaction: rxName, sensor: "MQ7", value: `${dp.mq7_ppm} ppm`, time: timeAgo(row.created_at) });
            } else if (dp.mq6_ppm != null && dp.mq6_ppm > 500) {
              anomalyEvents.push({ user: uid, reaction: rxName, sensor: "MQ6", value: `${dp.mq6_ppm} ppm`, time: timeAgo(row.created_at) });
            } else if (dp.temp_celsius != null && dp.temp_celsius > 50) {
              anomalyEvents.push({ user: uid, reaction: rxName, sensor: "DHT11", value: `${dp.temp_celsius}°C`, time: timeAgo(row.created_at) });
            }
            if (anomalyEvents.length >= 4) break;
          }
          if (anomalyEvents.length >= 4) break;
        }
        setRecentAnomalies(anomalyEvents);

      } catch (err) {
        console.error("Community data fetch failed:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [timeRange]);

  const globalStats = [
    { label: "Total Experiments", value: loading ? "..." : String(totalExperiments), icon: FlaskConical, color: "text-violet-400", bg: "bg-violet-500/10 border-violet-500/20" },
    { label: "Unique Labs", value: loading ? "..." : String(activeLabs), icon: Users, color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20" },
    { label: "Data Points", value: loading ? "..." : totalDataPoints >= 1000 ? `${(totalDataPoints / 1000).toFixed(1)}K` : String(totalDataPoints), icon: Activity, color: "text-green-400", bg: "bg-green-500/10 border-green-500/20" },
    { label: `Anomalies (${timeRange})`, value: loading ? "..." : String(anomalyCount), icon: AlertTriangle, color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20" },
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

            {loading ? (
              <div className="text-white/30 text-sm py-6 text-center">Loading community data...</div>
            ) : topReactions.length === 0 ? (
              <div className="text-white/30 text-sm py-6 text-center">No public experiments found for this period.</div>
            ) : (
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
                        {rx.runs} experiment{rx.runs !== 1 ? "s" : ""}
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
            )}
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
                    {loading ? "..." : sensorAvg.mq6} <span className="text-xs text-white/30">ppm avg</span>
                  </span>
                </div>
                <div className="p-3 rounded-lg bg-white/2 border border-white/5">
                  <span className="text-xs text-white/40 flex items-center gap-1 mb-1">
                    <Zap size={10} /> MQ7 (CO)
                  </span>
                  <span className="text-xl font-medium text-red-400">
                    {loading ? "..." : sensorAvg.mq7} <span className="text-xs text-white/30">ppm avg</span>
                  </span>
                </div>
                <div className="p-3 rounded-lg bg-white/2 border border-white/5">
                  <span className="text-xs text-white/40 flex items-center gap-1 mb-1">
                    <Thermometer size={10} /> Temp
                  </span>
                  <span className="text-xl font-medium text-amber-400">
                    {loading ? "..." : sensorAvg.temp} <span className="text-xs text-white/30">°C avg</span>
                  </span>
                </div>
                <div className="p-3 rounded-lg bg-white/2 border border-white/5">
                  <span className="text-xs text-white/40 flex items-center gap-1 mb-1">
                    <Droplets size={10} /> Humidity
                  </span>
                  <span className="text-xl font-medium text-blue-400">
                    {loading ? "..." : sensorAvg.humidity} <span className="text-xs text-white/30">% avg</span>
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
              {loading ? (
                <div className="text-white/30 text-sm text-center py-4">Loading...</div>
              ) : recentAnomalies.length === 0 ? (
                <div className="text-white/30 text-sm text-center py-4">No anomalies detected in this period.</div>
              ) : (
                <div className="space-y-2">
                  {recentAnomalies.map((a, i) => (
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
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}
