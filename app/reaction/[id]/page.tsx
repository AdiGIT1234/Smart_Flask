"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import { STORED_REACTIONS } from "@/lib/reactions";
import type { ExpectedDataPoint } from "@/lib/supabase";
import Stopwatch from "@/components/Stopwatch";
import { useAuth } from "@/components/AuthContext";
import {
  ArrowLeft,
  Beaker,
  Clock,
  AlertTriangle,
  ChevronRight,
  CheckCircle,
  Globe,
  Lock,
  Zap,
  BookOpen,
  ListChecks,
  Play,
  BarChart3,
  Droplets,
  Thermometer,
  Wind,
} from "lucide-react";
import Link from "next/link";

type Phase = "theory" | "steps" | "execution" | "results";

export default function ReactionPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const reactionId = params?.id as string;

  const reaction = STORED_REACTIONS.find((r) => r.id === reactionId);

  const [phase, setPhase] = useState<Phase>("theory");
  const [currentStep, setCurrentStep] = useState(0);
  const [stopwatchRunning, setStopwatchRunning] = useState(false);
  const [stepTimings, setStepTimings] = useState<number[]>([]);
  const [totalTime, setTotalTime] = useState(0);
  const [waitingForUser, setWaitingForUser] = useState(false);
  const [autoAdvanceCountdown, setAutoAdvanceCountdown] = useState(0);
  const [espConnected, setEspConnected] = useState(false);
  const [sensorMode, setSensorMode] = useState<'mq6' | 'mq7'>('mq6');
  const [simulatedData, setSimulatedData] = useState<
    { time_seconds: number; mq6_ppm: number; mq7_ppm: number; temp_celsius: number; humidity: number; anomaly?: boolean }[]
  >([]);
  const [saveChoice, setSaveChoice] = useState<"global" | "private" | null>(
    null
  );
  const [saved, setSaved] = useState(false);

  const autoAdvanceTimerRef = useRef<ReturnType<typeof setInterval> | null>(
    null
  );
  const dataSimulationRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const executionStartRef = useRef<number>(0);

  // ── Auto-advance logic ──
  // After each step completion, wait 4-5 seconds then auto-advance to next step.
  // If user clicks "Continue" before the timer, skip to next step immediately.
  const startAutoAdvanceTimer = useCallback(() => {
    setWaitingForUser(true);
    setAutoAdvanceCountdown(5);

    autoAdvanceTimerRef.current = setInterval(() => {
      setAutoAdvanceCountdown((prev) => {
        if (prev <= 1) {
          // Auto-advance to the next step
          if (autoAdvanceTimerRef.current)
            clearInterval(autoAdvanceTimerRef.current);
          setWaitingForUser(false);
          setCurrentStep((s) => s + 1);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  // ── Real-time ESP8266 data via GET /latest ──
  const startDataSimulation = useCallback(
    () => {
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
            },
          ]);
        } catch {
          setEspConnected(false);
        }
      }, 2000);
    },
    []
  );

  // Cleanup
  useEffect(() => {
    return () => {
      if (autoAdvanceTimerRef.current)
        clearInterval(autoAdvanceTimerRef.current);
      if (dataSimulationRef.current) clearInterval(dataSimulationRef.current);
    };
  }, []);

  if (!reaction) {
    return (
      <main className="bg-[#050505] min-h-screen text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-medium tracking-tight mb-4">
            Reaction Not Found
          </h1>
          <p className="text-white/50 mb-8">
            This reaction doesn&apos;t exist in our database.
          </p>
          <Link
            href="/"
            className="px-6 py-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
          >
            ← Back Home
          </Link>
        </div>
      </main>
    );
  }

  const handleStartExecution = () => {
    setPhase("execution");
    setCurrentStep(0);
    setStopwatchRunning(true);
    setSimulatedData([]);
    startDataSimulation();
  };

  const handleStepComplete = (lapTime: number) => {
    setStepTimings((prev) => [...prev, lapTime]);

    if (currentStep < reaction.steps.length - 1) {
      startAutoAdvanceTimer();
    } else {
      // Last step — finish
      setStopwatchRunning(false);
      setTotalTime(lapTime);
      if (dataSimulationRef.current) clearInterval(dataSimulationRef.current);
      setPhase("results");
    }
  };

  const handleContinueToNextStep = () => {
    if (autoAdvanceTimerRef.current)
      clearInterval(autoAdvanceTimerRef.current);
    setWaitingForUser(false);
    setAutoAdvanceCountdown(0);
    setCurrentStep((prev) => prev + 1);
  };

  const handleSave = async (mode: "global" | "private") => {
    setSaveChoice(mode);
    try {
      const { supabase } = await import("@/lib/supabase");
      const { error } = await supabase.from("experiment_results").insert({
        user_id: user?.email || null,
        reaction_id: reaction.id,
        data: simulatedData,
        is_public: mode === "global",
        total_duration_seconds: Math.round(totalTime / 1000),
        step_timings: stepTimings,
        created_at: new Date().toISOString()
      });
      if (error) {
        console.error("Error saving to Supabase:", error);
      }
    } catch (e) {
      console.error("Supabase import or save failed:", e);
    }
    setTimeout(() => setSaved(true), 800);
  };

  const currentStepData = reaction.steps[Math.min(currentStep, reaction.steps.length - 1)];

  // Get the most recent anomaly
  const latestAnomaly = simulatedData
    .filter((d) => d.anomaly)
    .slice(-1)[0];
  const hasRecentAnomaly =
    latestAnomaly &&
    simulatedData.length > 0 &&
    simulatedData.indexOf(latestAnomaly) > simulatedData.length - 4;
  const latestData = simulatedData.length > 0 ? simulatedData[simulatedData.length - 1] : null;

  return (
    <main className="bg-[#050505] min-h-screen text-white pt-20 pb-24 selection:bg-violet-500/30">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div
          className={`absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-linear-to-br ${reaction.thumbnail_color} opacity-[0.03] blur-[150px] rounded-full`}
        />
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
            {reaction.name}
          </h1>
          <p className="text-sm font-mono text-white/40">{reaction.formula}</p>
        </div>
      </div>

      {/* Phase Navigation Tabs */}
      <div className="px-6 md:px-12 lg:px-24 mb-8 flex gap-2 relative z-10">
        {(
          [
            { key: "theory", label: "Theory", icon: BookOpen },
            { key: "steps", label: "Procedure", icon: ListChecks },
            { key: "execution", label: "Execute", icon: Play },
            { key: "results", label: "Results", icon: BarChart3 },
          ] as const
        ).map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => {
              if (
                key === "execution" &&
                phase !== "execution" &&
                phase !== "results"
              )
                return;
              if (key === "results" && phase !== "results") return;
              setPhase(key);
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
              phase === key
                ? "bg-white/10 text-white border border-white/20"
                : key === "execution" && phase !== "execution" && phase !== "results"
                ? "text-white/20 border border-white/5 cursor-not-allowed"
                : key === "results" && phase !== "results"
                ? "text-white/20 border border-white/5 cursor-not-allowed"
                : "text-white/40 border border-white/5 hover:bg-white/5 hover:text-white/60"
            }`}
          >
            <Icon size={14} />
            {label}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="px-6 md:px-12 lg:px-24 relative z-10">
        <AnimatePresence mode="wait">
          {/* ═══════════════════ THEORY PHASE ═══════════════════ */}
          {phase === "theory" && (
            <motion.div
              key="theory"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="max-w-5xl"
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Theory text */}
                <div className="lg:col-span-2">
                  <div className="glass-card p-8">
                    <h2 className="text-2xl font-medium tracking-tight mb-6 flex items-center gap-3">
                      <BookOpen size={20} className="text-blue-400" />
                      Theory & Background
                    </h2>
                    <p className="text-white/60 leading-relaxed text-lg">
                      {reaction.theory}
                    </p>

                    <div className="mt-8 p-4 bg-blue-500/5 border border-blue-500/10 rounded-xl">
                      <h4 className="text-sm font-medium text-blue-400 uppercase tracking-widest mb-3">
                        Expected Sensor Peaks
                      </h4>
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        <div>
                          <span className="text-xs text-white/40 block mb-1">MQ6 (LPG)</span>
                          <span className="text-2xl font-medium text-cyan-300">
                            {Math.max(...reaction.expected_outputs.map((o) => o.mq6_ppm))}
                            <span className="text-sm text-white/40 ml-1">ppm</span>
                          </span>
                        </div>
                        <div>
                          <span className="text-xs text-white/40 block mb-1">MQ7 (CO)</span>
                          <span className="text-2xl font-medium text-red-300">
                            {Math.max(...reaction.expected_outputs.map((o) => o.mq7_ppm))}
                            <span className="text-sm text-white/40 ml-1">ppm</span>
                          </span>
                        </div>
                        <div>
                          <span className="text-xs text-white/40 block mb-1">Temperature</span>
                          <span className="text-2xl font-medium text-amber-300">
                            {Math.max(...reaction.expected_outputs.map((o) => o.temp_celsius))}
                            <span className="text-sm text-white/40 ml-1">°C</span>
                          </span>
                        </div>
                        <div>
                          <span className="text-xs text-white/40 block mb-1">Humidity</span>
                          <span className="text-2xl font-medium text-blue-300">
                            {Math.max(...reaction.expected_outputs.map((o) => o.humidity))}
                            <span className="text-sm text-white/40 ml-1">%</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Chemicals sidebar */}
                <div>
                  <div className="glass-card p-6">
                    <h3 className="text-lg font-medium tracking-tight mb-4 flex items-center gap-2">
                      <Beaker size={16} className="text-violet-400" />
                      Chemicals Required
                    </h3>
                    <ul className="space-y-3">
                      {reaction.chemicals.map((chem, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-sm text-white/60"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-violet-500 mt-2 shrink-0" />
                          {chem}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="glass-card p-6 mt-4">
                    <div className="flex items-center gap-3 mb-3">
                      <Clock size={16} className="text-amber-400" />
                      <span className="text-sm text-white/50">
                        Estimated Duration
                      </span>
                    </div>
                    <span className="text-3xl font-medium">
                      {reaction.duration_minutes}
                      <span className="text-lg text-white/40 ml-1">min</span>
                    </span>
                  </div>

                  <button
                    onClick={() => setPhase("steps")}
                    className="w-full mt-4 px-6 py-3 bg-linear-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white font-medium rounded-xl transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(59,130,246,0.2)]"
                  >
                    View Procedure
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* ═══════════════════ STEPS PHASE ═══════════════════ */}
          {phase === "steps" && (
            <motion.div
              key="steps"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="max-w-4xl"
            >
              <div className="glass-card p-8">
                <h2 className="text-2xl font-medium tracking-tight mb-8 flex items-center gap-3">
                  <ListChecks size={20} className="text-violet-400" />
                  Step-by-Step Procedure
                </h2>

                <div className="space-y-0">
                  {reaction.steps.map((step, i) => (
                    <div key={i} className="flex gap-6 relative group">
                      {/* Timeline line */}
                      {i < reaction.steps.length - 1 && (
                        <div className="absolute left-[19px] top-[42px] w-[2px] h-[calc(100%-10px)] bg-white/10" />
                      )}

                      {/* Step number circle */}
                      <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-sm font-mono text-white/60 group-hover:bg-white/10 group-hover:border-white/20 transition-all z-10">
                        {step.order}
                      </div>

                      <div className="pb-8 flex-1">
                        <h4 className="text-lg font-medium text-white/90 mb-1">
                          {step.title}
                        </h4>
                        <p className="text-sm text-white/50 leading-relaxed mb-2">
                          {step.description}
                        </p>
                        <span className="text-xs text-white/30 font-mono">
                          ~{step.expected_duration_seconds}s expected
                        </span>
                        {step.warning && (
                          <div className="mt-3 p-3 bg-amber-500/5 border border-amber-500/15 rounded-lg flex items-start gap-2">
                            <AlertTriangle
                              size={14}
                              className="text-amber-400 mt-0.5 shrink-0"
                            />
                            <span className="text-xs text-amber-300/80">
                              {step.warning}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={handleStartExecution}
                className="mt-8 px-8 py-4 bg-linear-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-semibold rounded-xl transition-all flex items-center gap-3 shadow-[0_0_25px_rgba(34,197,94,0.2)] text-lg mx-auto"
              >
                <Play size={20} />
                Start Experiment
              </button>
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
                {/* Left: Stopwatch + Current Step */}
                <div className="flex flex-col items-center gap-8">
                  <Stopwatch
                    running={stopwatchRunning}
                    onLap={(time) => handleStepComplete(time)}
                  />
                </div>

                {/* Center: Step Progress */}
                <div className="lg:col-span-2">
                  {/* Current Step Card */}
                  <div className="glass-card p-8 relative overflow-hidden">
                    {/* Warning overlay */}
                    <AnimatePresence>
                      {hasRecentAnomaly && (
                        <motion.div
                          initial={{ opacity: 0, y: -20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          className="absolute top-0 left-0 w-full p-3 bg-red-500/10 border-b border-red-500/20 z-20 flex items-center gap-3"
                        >
                          <AlertTriangle
                            size={18}
                            className="text-red-400 animate-pulse"
                          />
                          <span className="text-sm text-red-300 font-medium">
                            Anomaly Detected — {sensorMode === 'mq6' ? 'MQ6' : 'MQ7'}: {sensorMode === 'mq6' ? latestAnomaly?.mq6_ppm : latestAnomaly?.mq7_ppm}ppm, Temp: {latestAnomaly?.temp_celsius}°C
                          </span>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-linear-to-tr from-blue-500 to-violet-500 flex items-center justify-center text-sm font-bold">
                          {currentStep + 1}
                        </div>
                        <div>
                          <span className="text-xs text-white/40 uppercase tracking-widest block">
                            Step {currentStep + 1} of {reaction.steps.length}
                          </span>
                          <h3 className="text-xl font-medium">
                            {currentStepData.title}
                          </h3>
                        </div>
                      </div>
                      <span className="text-xs font-mono text-white/30 bg-white/5 px-3 py-1 rounded-full">
                        ~{currentStepData.expected_duration_seconds}s
                      </span>
                    </div>

                    <p className="text-white/60 leading-relaxed mb-6">
                      {currentStepData.description}
                    </p>

                    {currentStepData.warning && (
                      <div className="p-4 bg-amber-500/5 border border-amber-500/15 rounded-xl flex items-start gap-3 mb-6">
                        <AlertTriangle
                          size={16}
                          className="text-amber-400 mt-0.5 shrink-0"
                        />
                        <span className="text-sm text-amber-300/80">
                          {currentStepData.warning}
                        </span>
                      </div>
                    )}

                    {/* Waiting / Continue UI */}
                    <AnimatePresence mode="wait">
                      {waitingForUser ? (
                        <motion.div
                          key="waiting"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center justify-between bg-white/3 border border-white/10 rounded-xl p-4"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full border-2 border-violet-500/50 flex items-center justify-center">
                              <span className="text-sm font-mono text-violet-400">
                                {autoAdvanceCountdown}
                              </span>
                            </div>
                            <span className="text-sm text-white/50">
                              Next step loading...
                            </span>
                          </div>
                          <button
                            onClick={handleContinueToNextStep}
                            className="px-5 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                          >
                            Continue Now
                            <ChevronRight size={14} />
                          </button>
                        </motion.div>
                      ) : !waitingForUser && currentStep < reaction.steps.length - 1 ? (
                        <motion.div
                          key="step-active"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="text-center"
                        >
                          <p className="text-xs text-white/30 mb-3">
                            Press the <strong className="text-white/50">&quot;Step ⬇&quot;</strong> button on the stopwatch or below when done
                          </p>
                          <button
                            onClick={() => handleStepComplete(0)}
                            className="px-6 py-2.5 bg-violet-600 hover:bg-violet-500 rounded-lg text-sm font-medium transition-colors"
                          >
                            Mark Step Complete ✓
                          </button>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>

                    {/* Step progress bar */}
                    <div className="mt-6 flex gap-1">
                      {reaction.steps.map((_, i) => (
                        <div
                          key={i}
                          className={`h-1 flex-1 rounded-full transition-all duration-500 ${
                            i < currentStep
                              ? "bg-green-500"
                              : i === currentStep
                              ? "bg-blue-500"
                              : "bg-white/10"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* ESP Connection Badge + Live Sensor Readings */}
                  <div className={`mt-4 mb-2 flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold w-fit border ${
                    espConnected
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                      : 'bg-white/5 border-white/10 text-white/40'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${espConnected ? 'bg-emerald-400 animate-pulse' : 'bg-white/30'}`} />
                    {espConnected ? 'ESP8266 Live' : 'Waiting for ESP...'}
                  </div>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="glass-card p-4">
                      <span className="text-xs text-white/40 uppercase tracking-widest mb-1 flex items-center gap-1">
                        <Wind size={10} /> {sensorMode === 'mq6' ? 'MQ6 (LPG)' : 'MQ7 (CO)'}
                      </span>
                      <span className="text-3xl font-medium text-cyan-400">
                        {latestData ? (sensorMode === 'mq6' ? latestData.mq6_ppm : latestData.mq7_ppm) : "--"}
                        <span className="text-sm text-white/30 ml-1">ppm</span>
                      </span>
                    </div>
                    <div className="glass-card p-4">
                      <span className="text-xs text-white/40 uppercase tracking-widest mb-1 flex items-center gap-1">
                        <Zap size={10} /> MQ7 (CO)
                      </span>
                      <span className="text-3xl font-medium text-red-400">
                        {latestData ? latestData.mq7_ppm : "--"}
                        <span className="text-sm text-white/30 ml-1">ppm</span>
                      </span>
                    </div>
                    <div className="glass-card p-4">
                      <span className="text-xs text-white/40 uppercase tracking-widest mb-1 flex items-center gap-1">
                        <Thermometer size={10} /> Temp
                      </span>
                      <span className="text-3xl font-medium text-amber-400">
                        {latestData ? latestData.temp_celsius : "--"}
                        <span className="text-sm text-white/30 ml-1">°C</span>
                      </span>
                    </div>
                    <div className="glass-card p-4">
                      <span className="text-xs text-white/40 uppercase tracking-widest mb-1 flex items-center gap-1">
                        <Droplets size={10} /> Humidity
                      </span>
                      <span className="text-3xl font-medium text-blue-400">
                        {latestData ? latestData.humidity : "--"}
                        <span className="text-sm text-white/30 ml-1">%</span>
                      </span>
                    </div>
                  </div>

                  {/* Expected vs Actual mini-charts */}
                  {simulatedData.length > 2 && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
                      <div className="glass-card p-6">
                        <h4 className="text-sm font-medium text-cyan-400/60 uppercase tracking-widest mb-4">
                          {sensorMode === 'mq6' ? 'MQ6 (LPG)' : 'MQ7 (CO)'} — Expected vs Actual
                        </h4>
                        <div className="h-[100px] relative border border-white/5 rounded-lg overflow-hidden bg-[#0a0a0a]">
                          <MiniChart
                            expected={reaction.expected_outputs}
                            actual={simulatedData}
                            field={sensorMode === 'mq6' ? 'mq6_ppm' : 'mq7_ppm'}
                            color={sensorMode === 'mq6' ? "rgba(34,211,238,0.8)" : "rgba(248,113,113,0.8)"}
                          />
                        </div>
                      </div>
                      <div className="glass-card p-6">
                        <h4 className="text-sm font-medium text-red-400/60 uppercase tracking-widest mb-4">
                          MQ7 (CO) — Expected vs Actual
                        </h4>
                        <div className="h-[100px] relative border border-white/5 rounded-lg overflow-hidden bg-[#0a0a0a]">
                          <MiniChart
                            expected={reaction.expected_outputs}
                            actual={simulatedData}
                            field="mq7_ppm"
                            color="rgba(248,113,113,0.8)"
                          />
                        </div>
                      </div>
                    </div>
                  )}
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
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    damping: 10,
                    stiffness: 200,
                    delay: 0.2,
                  }}
                >
                  <CheckCircle
                    size={64}
                    className="text-green-400 mx-auto mb-4"
                  />
                </motion.div>
                <h2 className="text-4xl font-medium tracking-tight mb-2">
                  Experiment Complete
                </h2>
                <p className="text-white/50">
                  {reaction.name} — finished in{" "}
                  {Math.round(totalTime / 1000)}s
                </p>
              </div>

              {/* Summary Cards */}
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
                  <Clock size={20} className="text-violet-400 mx-auto mb-2" />
                  <span className="text-xs text-white/40 uppercase tracking-widest block mb-1">Duration</span>
                  <span className="text-2xl font-medium">
                    {Math.round(totalTime / 1000)}
                    <span className="text-sm text-white/30 ml-1">sec</span>
                  </span>
                </div>
              </div>

              {/* Save Decision */}
              {!saved ? (
                <div className="glass-card p-8 text-center">
                  <h3 className="text-xl font-medium mb-2">
                    Save Your Results?
                  </h3>
                  <p className="text-white/40 text-sm mb-8 max-w-md mx-auto">
                    {user
                      ? "Choose whether to contribute to the global database (visible to everyone & used for ML training) or save privately."
                      : "Sign in to save results privately, or contribute anonymously to the global database."}
                  </p>

                  <div className="flex justify-center gap-4 flex-wrap">
                    <button
                      onClick={() => handleSave("global")}
                      className={`flex items-center gap-3 px-6 py-3 rounded-xl border transition-all ${
                        saveChoice === "global"
                          ? "border-blue-500 bg-blue-500/10"
                          : "border-white/10 bg-white/2 hover:bg-white/5"
                      }`}
                    >
                      <Globe size={18} className="text-blue-400" />
                      <div className="text-left">
                        <span className="block text-sm font-medium">
                          Share Globally
                        </span>
                        <span className="block text-xs text-white/40">
                          Contribute to community & ML
                        </span>
                      </div>
                    </button>

                    {user && (
                      <button
                        onClick={() => handleSave("private")}
                        className={`flex items-center gap-3 px-6 py-3 rounded-xl border transition-all ${
                          saveChoice === "private"
                            ? "border-violet-500 bg-violet-500/10"
                            : "border-white/10 bg-white/2 hover:bg-white/5"
                        }`}
                      >
                        <Lock size={18} className="text-violet-400" />
                        <div className="text-left">
                          <span className="block text-sm font-medium">
                            Save Privately
                          </span>
                          <span className="block text-xs text-white/40">
                            Only you can see this
                          </span>
                        </div>
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="glass-card p-8 text-center"
                >
                  <CheckCircle
                    size={32}
                    className="text-green-400 mx-auto mb-3"
                  />
                  <h3 className="text-xl font-medium mb-1">Saved!</h3>
                  <p className="text-white/40 text-sm mb-6">
                    {saveChoice === "global"
                      ? "Your results are now part of the global database."
                      : "Your results are stored privately."}
                  </p>
                  <Link
                    href="/dashboard"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl transition-colors"
                  >
                    <BarChart3 size={16} />
                    View Dashboard
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



// ── Mini SVG Chart ──
type SensorField = "mq6_ppm" | "mq7_ppm" | "temp_celsius" | "humidity";

function MiniChart({
  expected,
  actual,
  field,
  color,
}: {
  expected: ExpectedDataPoint[];
  actual: { time_seconds: number; mq6_ppm: number; mq7_ppm: number; temp_celsius: number; humidity: number }[];
  field: SensorField;
  color: string;
}) {
  const maxTime = expected[expected.length - 1].time_seconds;
  const allVals = [
    ...expected.map((e) => e[field]),
    ...actual.map((a) => a[field]),
  ];
  const maxVal = Math.max(...allVals) * 1.1 || 1;

  const toX = (t: number) => `${(t / maxTime) * 100}`;
  const toY = (v: number) => `${100 - (v / maxVal) * 100}`;

  const expectedPath = expected
    .map((p, i) => `${i === 0 ? "M" : "L"}${toX(p.time_seconds)},${toY(p[field])}`)
    .join(" ");

  const actualPath = actual
    .map((p, i) => `${i === 0 ? "M" : "L"}${toX(p.time_seconds)},${toY(p[field])}`)
    .join(" ");

  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
      <path
        d={expectedPath}
        fill="none"
        stroke="rgba(255,255,255,0.15)"
        strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
        strokeDasharray="4 4"
      />
      <path
        d={actualPath}
        fill="none"
        stroke={color}
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
      />
      {actual.length > 1 && (
        <path
          d={`${actualPath} L${toX(actual[actual.length - 1].time_seconds)},100 L${toX(actual[0].time_seconds)},100 Z`}
          fill={color.replace(/[\d.]+\)$/, "0.1)")}
        />
      )}
    </svg>
  );
}
