"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  FlaskConical,
  ChevronDown,
  Wind,
  Zap,
  Thermometer,
  Droplets,
  Activity,
  AlertTriangle,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { STORED_REACTIONS } from "@/lib/reactions";
import type { ExpectedDataPoint, RecordedDataPoint } from "@/lib/supabase";

type ExperimentRow = {
  id: string;
  reaction_id: string;
  data: RecordedDataPoint[];
  is_public: boolean;
  total_duration_seconds: number;
  created_at: string;
  user_id?: string;
};

type SensorKey = "mq6_ppm" | "mq7_ppm" | "temp_celsius" | "humidity";

const SENSOR_CONFIG: {
  key: SensorKey;
  label: string;
  unit: string;
  color: string;
  dimColor: string;
  icon: React.ElementType;
}[] = [
  { key: "mq6_ppm", label: "MQ6 (LPG)", unit: "ppm", color: "#22d3ee", dimColor: "#22d3ee33", icon: Wind },
  { key: "mq7_ppm", label: "MQ7 (CO)", unit: "ppm", color: "#f87171", dimColor: "#f8717133", icon: Zap },
  { key: "temp_celsius", label: "Temperature", unit: "°C", color: "#fbbf24", dimColor: "#fbbf2433", icon: Thermometer },
  { key: "humidity", label: "Humidity", unit: "%", color: "#60a5fa", dimColor: "#60a5fa33", icon: Droplets },
];

function buildSvgPath(
  points: { t: number; v: number }[],
  maxT: number,
  minV: number,
  maxV: number,
  w = 100,
  h = 100
): string {
  if (points.length === 0) return `M0,${h} L${w},${h}`;
  const range = maxV - minV || 1;
  return (
    "M" +
    points
      .map((p) => {
        const x = (p.t / maxT) * w;
        const y = h - ((p.v - minV) / range) * h;
        return `${x.toFixed(1)},${Math.max(0, Math.min(h, y)).toFixed(1)}`;
      })
      .join(" L")
  );
}

function timeAgo(dateStr: string) {
  const diff = (Date.now() - new Date(dateStr).getTime()) / 1000;
  if (diff < 60) return `${Math.round(diff)}s ago`;
  if (diff < 3600) return `${Math.round(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.round(diff / 3600)}h ago`;
  return `${Math.round(diff / 86400)}d ago`;
}

export default function CommunityPage() {
  const [selectedReactionId, setSelectedReactionId] = useState(STORED_REACTIONS[0].id);
  const [experiments, setExperiments] = useState<ExperimentRow[]>([]);
  const [selectedExpId, setSelectedExpId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeSensor, setActiveSensor] = useState<SensorKey>("mq6_ppm");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const reaction = STORED_REACTIONS.find((r) => r.id === selectedReactionId)!;
  const selectedExp = experiments.find((e) => e.id === selectedExpId) ?? null;

  // Map reaction id from lib format to DB format
  const reactionDbId = selectedReactionId
    .replace("rxn-", "")
    .replace(/-co$/, "");

  useEffect(() => {
    setLoading(true);
    setSelectedExpId(null);
    async function fetch_() {
      // Try matching with the full id OR the stripped version
      const { data, error } = await supabase
        .from("experiment_results")
        .select("id, reaction_id, data, is_public, total_duration_seconds, created_at, user_id")
        .or(`reaction_id.eq.${selectedReactionId},reaction_id.eq.${reactionDbId}`)
        .order("created_at", { ascending: false })
        .limit(20);

      if (!error && data) {
        setExperiments(data as ExperimentRow[]);
        if (data.length > 0) setSelectedExpId(data[0].id);
      } else {
        setExperiments([]);
      }
      setLoading(false);
    }
    fetch_();
  }, [selectedReactionId, reactionDbId]);

  // Build chart data
  const expected = reaction.expected_outputs;
  const maxExpT = Math.max(...expected.map((p) => p.time_seconds), 1);
  const recorded: RecordedDataPoint[] = selectedExp?.data ?? [];
  const maxRecT =
    recorded.length > 0
      ? Math.max(...recorded.map((p) => p.time_seconds), 1)
      : maxExpT;
  const maxT = Math.max(maxExpT, maxRecT);

  const sensor = SENSOR_CONFIG.find((s) => s.key === activeSensor)!;

  const expVals = expected.map((p) => p[activeSensor as keyof ExpectedDataPoint] as number);
  const recVals = recorded.map((p) => p[activeSensor as keyof RecordedDataPoint] as number).filter((v) => typeof v === "number");
  const allVals = [...expVals, ...recVals];
  const minV = Math.min(...allVals, 0);
  const maxV = Math.max(...allVals, 1);

  const expectedPath = buildSvgPath(
    expected.map((p) => ({ t: p.time_seconds, v: p[activeSensor as keyof ExpectedDataPoint] as number })),
    maxT, minV, maxV
  );
  const recordedPath = buildSvgPath(
    recorded.map((p) => ({ t: p.time_seconds, v: (p[activeSensor as keyof RecordedDataPoint] as number) ?? 0 })),
    maxT, minV, maxV
  );

  // Stats comparison
  function statFor(arr: number[]) {
    if (arr.length === 0) return { avg: null, peak: null };
    return {
      avg: arr.reduce((a, b) => a + b, 0) / arr.length,
      peak: Math.max(...arr),
    };
  }
  const expStats = statFor(expVals);
  const recStats = statFor(recVals);

  return (
    <main className="bg-[#050505] min-h-screen text-white pt-24 pb-24 selection:bg-violet-500/30">
      {/* Background glows */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-violet-600/5 blur-[150px] rounded-full" />
        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-cyan-600/5 blur-[120px] rounded-full" />
      </div>

      <div className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <span className="text-violet-400 font-medium tracking-widest uppercase text-sm mb-2 block">
            Community
          </span>
          <h1 className="text-5xl md:text-6xl font-medium tracking-tighter mb-4 leading-[1.1]">
            Reaction <span className="text-white/40">Results</span>
          </h1>
          <p className="text-lg text-white/50 max-w-2xl font-light">
            Select a reaction to compare your recorded sensor data against the expected reference outputs — side by side.
          </p>
        </motion.div>

        {/* Reaction Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative mb-8"
        >
          <button
            onClick={() => setDropdownOpen((o) => !o)}
            className="w-full md:w-auto flex items-center gap-3 px-5 py-3 glass-card rounded-xl border border-white/10 hover:border-white/20 transition-all text-left"
          >
            <FlaskConical size={16} className="text-violet-400 shrink-0" />
            <span className="flex-1 font-medium text-white/90">{reaction.name}</span>
            <ChevronDown
              size={14}
              className={`text-white/40 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
            />
          </button>

          {dropdownOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-full mt-2 left-0 z-50 w-full md:w-96 glass-card border border-white/10 rounded-xl overflow-hidden shadow-2xl"
            >
              {STORED_REACTIONS.map((r) => (
                <button
                  key={r.id}
                  onClick={() => {
                    setSelectedReactionId(r.id);
                    setDropdownOpen(false);
                  }}
                  className={`w-full text-left px-5 py-3.5 flex items-center gap-3 hover:bg-white/5 transition-colors border-b border-white/5 last:border-0 ${
                    r.id === selectedReactionId ? "bg-violet-500/10" : ""
                  }`}
                >
                  <div className={`w-2 h-2 rounded-full bg-linear-to-r ${r.thumbnail_color}`} />
                  <div>
                    <p className="text-sm font-medium text-white/90">{r.name}</p>
                    <p className="text-xs text-white/40">{r.category} · {r.difficulty}</p>
                  </div>
                </button>
              ))}
            </motion.div>
          )}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left: Your Runs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="lg:col-span-1 glass-card p-5 flex flex-col gap-3"
          >
            <h2 className="text-sm font-medium tracking-widest text-white/40 uppercase flex items-center gap-2">
              <Clock size={13} /> Your Runs
            </h2>

            {loading ? (
              <div className="text-white/30 text-xs py-6 text-center">Loading…</div>
            ) : experiments.length === 0 ? (
              <div className="text-white/30 text-xs py-6 text-center leading-relaxed">
                No recorded experiments found for this reaction.
                <br />
                <span className="text-violet-400/70">Run it in the lab to compare!</span>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                {experiments.map((exp) => {
                  const hasAnomaly = exp.data.some((d) => d.anomaly);
                  return (
                    <button
                      key={exp.id}
                      onClick={() => setSelectedExpId(exp.id)}
                      className={`text-left p-3 rounded-lg border transition-all ${
                        selectedExpId === exp.id
                          ? "bg-violet-500/15 border-violet-500/30"
                          : "bg-white/2 border-white/5 hover:bg-white/5"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-mono text-white/60">
                          #{exp.id.substring(0, 8).toUpperCase()}
                        </span>
                        {hasAnomaly ? (
                          <AlertTriangle size={11} className="text-amber-400" />
                        ) : (
                          <CheckCircle2 size={11} className="text-emerald-400" />
                        )}
                      </div>
                      <p className="text-[10px] text-white/30">{timeAgo(exp.created_at)}</p>
                      <p className="text-[10px] text-white/25">
                        {Math.floor(exp.total_duration_seconds / 60)}m {exp.total_duration_seconds % 60}s · {exp.data.length} pts
                      </p>
                    </button>
                  );
                })}
              </div>
            )}
          </motion.div>

          {/* Right: Chart + Stats */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            {/* Sensor Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-wrap gap-2"
            >
              {SENSOR_CONFIG.map((s) => (
                <button
                  key={s.key}
                  onClick={() => setActiveSensor(s.key)}
                  style={
                    activeSensor === s.key
                      ? { borderColor: s.color + "55", background: s.color + "18", color: s.color }
                      : {}
                  }
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all border ${
                    activeSensor === s.key
                      ? "border-transparent"
                      : "border-white/5 text-white/40 hover:text-white/60 hover:bg-white/5"
                  }`}
                >
                  <s.icon size={13} />
                  {s.label}
                </button>
              ))}
            </motion.div>

            {/* Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="glass-card p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-medium text-white/80 flex items-center gap-2">
                  <Activity size={16} style={{ color: sensor.color }} />
                  {sensor.label} — Expected vs Recorded
                </h2>
                <div className="flex items-center gap-4 text-xs text-white/40">
                  <span className="flex items-center gap-1.5">
                    <span className="w-6 h-0.5 rounded" style={{ background: sensor.color }} />
                    Expected
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span
                      className="w-6 h-0.5 rounded"
                      style={{
                        background: sensor.color,
                        opacity: 0.4,
                        borderBottom: `2px dashed ${sensor.color}`,
                        height: 0,
                      }}
                    />
                    <span className="opacity-50">Recorded</span>
                  </span>
                </div>
              </div>

              <div className="relative h-56 w-full rounded-lg bg-white/2 border border-white/5 overflow-hidden">
                {/* Y-axis labels */}
                <div className="absolute left-2 top-0 bottom-0 py-2 flex flex-col justify-between text-[10px] text-white/30 font-mono pointer-events-none z-10">
                  <span>{Math.round(maxV)} {sensor.unit}</span>
                  <span>{Math.round(minV + (maxV - minV) * 0.75)}</span>
                  <span>{Math.round(minV + (maxV - minV) * 0.5)}</span>
                  <span>{Math.round(minV + (maxV - minV) * 0.25)}</span>
                  <span>{Math.round(minV)}</span>
                </div>

                <svg
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  className="absolute inset-0 w-full h-full pl-12" // Added left padding for the Y-axis labels
                >
                  {/* Grid lines */}
                  {[25, 50, 75].map((y) => (
                    <line
                      key={y}
                      x1="0"
                      y1={y}
                      x2="100"
                      y2={y}
                      stroke="white"
                      strokeOpacity="0.04"
                      strokeWidth="0.5"
                      vectorEffect="non-scaling-stroke"
                    />
                  ))}

                  {/* Expected area fill */}
                  <path
                    d={expectedPath + ` L100,100 L0,100 Z`}
                    fill={sensor.dimColor}
                  />
                  {/* Expected line */}
                  <path
                    d={expectedPath}
                    fill="none"
                    stroke={sensor.color}
                    strokeWidth="2"
                    vectorEffect="non-scaling-stroke"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  />

                  {/* Recorded line (dashed) — only if data exists */}
                  {recorded.length > 0 && (
                    <path
                      d={recordedPath}
                      fill="none"
                      stroke={sensor.color}
                      strokeOpacity="0.5"
                      strokeWidth="2"
                      strokeDasharray="3 2"
                      vectorEffect="non-scaling-stroke"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                    />
                  )}

                  {/* Expected label markers */}
                  {expected
                    .filter((p) => p.label)
                    .map((p) => {
                      const x = (p.time_seconds / maxT) * 100;
                      const val = p[activeSensor as keyof ExpectedDataPoint] as number;
                      const range = maxV - minV || 1;
                      const y = 100 - ((val - minV) / range) * 100;
                      return (
                        <g key={p.time_seconds}>
                          <circle
                            cx={x}
                            cy={Math.max(2, Math.min(98, y))}
                            r="1.5"
                            fill={sensor.color}
                            vectorEffect="non-scaling-stroke"
                          />
                        </g>
                      );
                    })}
                </svg>

                {/* No data overlay */}
                {recorded.length === 0 && !loading && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-white/20 text-xs text-center px-4">
                      Select a run from the left panel to overlay your recorded data
                    </p>
                  </div>
                )}
              </div>

              {/* X-axis labels */}
              <div className="flex justify-between mt-2 text-[10px] text-white/20 font-mono px-1 pl-12">
                {[0, 0.25, 0.5, 0.75, 1].map((frac) => (
                  <span key={frac}>{Math.round(frac * maxT)}s</span>
                ))}
              </div>
            </motion.div>

            {/* Stats Comparison */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
            >
              {SENSOR_CONFIG.map((s) => {
                const eVals = expected.map((p) => p[s.key as keyof ExpectedDataPoint] as number);
                const rVals = recorded
                  .map((p) => p[s.key as keyof RecordedDataPoint] as number)
                  .filter((v) => typeof v === "number" && !isNaN(v));
                const ePeak = eVals.length ? Math.max(...eVals) : null;
                const rPeak = rVals.length ? Math.max(...rVals) : null;
                const delta = ePeak !== null && rPeak !== null ? rPeak - ePeak : null;
                return (
                  <div
                    key={s.key}
                    onClick={() => setActiveSensor(s.key)}
                    className={`glass-card p-4 cursor-pointer transition-all ${
                      activeSensor === s.key ? "opacity-100" : "opacity-70 hover:opacity-90"
                    }`}
                    style={
                      activeSensor === s.key
                        ? { outline: `1px solid ${s.color}44` }
                        : {}
                    }
                  >
                    <div className="flex items-center gap-1.5 mb-2">
                      <s.icon size={12} style={{ color: s.color }} />
                      <span className="text-[10px] text-white/40 uppercase tracking-widest">{s.label}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-white/30">Expected peak</span>
                        <span className="font-mono" style={{ color: s.color }}>
                          {ePeak !== null ? ePeak.toFixed(0) : "--"} {s.unit}
                        </span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-white/30">Your peak</span>
                        <span className="font-mono text-white/70">
                          {rPeak !== null ? rPeak.toFixed(0) : "--"} {s.unit}
                        </span>
                      </div>
                      {delta !== null && (
                        <div className="flex justify-between text-xs mt-1 border-t border-white/5 pt-1">
                          <span className="text-white/20">Δ diff</span>
                          <span
                            className={`font-mono font-medium ${
                              Math.abs(delta) < ePeak! * 0.15
                                ? "text-emerald-400"
                                : Math.abs(delta) < ePeak! * 0.35
                                ? "text-amber-400"
                                : "text-red-400"
                            }`}
                          >
                            {delta > 0 ? "+" : ""}
                            {delta.toFixed(0)} {s.unit}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </motion.div>

            {/* Reaction Info strip */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="glass-card p-5 flex flex-wrap gap-6 items-center"
            >
              <div>
                <span className="text-[10px] text-white/30 uppercase tracking-widest block mb-0.5">Reaction</span>
                <span className="text-sm font-medium text-white/80">{reaction.name}</span>
              </div>
              <div>
                <span className="text-[10px] text-white/30 uppercase tracking-widest block mb-0.5">Category</span>
                <span className="text-sm text-white/60">{reaction.category}</span>
              </div>
              <div>
                <span className="text-[10px] text-white/30 uppercase tracking-widest block mb-0.5">Difficulty</span>
                <span
                  className={`text-sm font-medium ${
                    reaction.difficulty === "Advanced"
                      ? "text-red-400"
                      : reaction.difficulty === "Intermediate"
                      ? "text-amber-400"
                      : "text-emerald-400"
                  }`}
                >
                  {reaction.difficulty}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-white/30 uppercase tracking-widest block mb-0.5">Expected Duration</span>
                <span className="text-sm text-white/60">{reaction.duration_minutes} min</span>
              </div>
              <div>
                <span className="text-[10px] text-white/30 uppercase tracking-widest block mb-0.5">Reference Points</span>
                <span className="text-sm text-white/60">{expected.length} waypoints</span>
              </div>
              <div>
                <span className="text-[10px] text-white/30 uppercase tracking-widest block mb-0.5">Your Runs Found</span>
                <span className="text-sm font-medium text-violet-400">{experiments.length}</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}
