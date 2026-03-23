"use client";

import { useState, useRef, useCallback, useEffect } from "react";

type StopwatchProps = {
  onLap?: (time: number) => void;
  onStop?: (time: number) => void;
  onStart?: () => void;
  running?: boolean;
};

export default function Stopwatch({
  onLap,
  onStop,
  onStart,
  running: externalRunning,
}: StopwatchProps) {
  const [time, setTime] = useState(0); // milliseconds
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef<number>(0);
  const accumulatedRef = useRef<number>(0);

  // Sync with external running state
  useEffect(() => {
    if (externalRunning !== undefined) {
      if (externalRunning && !isRunning) {
        handleStart();
      } else if (!externalRunning && isRunning) {
        handleStop();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [externalRunning]);

  const handleStart = useCallback(() => {
    if (isRunning) return;
    setIsRunning(true);
    startTimeRef.current = Date.now();
    intervalRef.current = setInterval(() => {
      setTime(accumulatedRef.current + (Date.now() - startTimeRef.current));
    }, 16); // ~60fps
    onStart?.();
  }, [isRunning, onStart]);

  const handleStop = useCallback(() => {
    if (!isRunning) return;
    setIsRunning(false);
    accumulatedRef.current += Date.now() - startTimeRef.current;
    if (intervalRef.current) clearInterval(intervalRef.current);
    onStop?.(time);
  }, [isRunning, onStop, time]);

  const handleLap = useCallback(() => {
    if (!isRunning) return;
    setLaps((prev) => [...prev, time]);
    onLap?.(time);
  }, [isRunning, time, onLap]);

  const handleReset = useCallback(() => {
    setIsRunning(false);
    setTime(0);
    setLaps([]);
    accumulatedRef.current = 0;
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, []);

  // Cleanup
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const centiseconds = Math.floor((ms % 1000) / 10);
    return {
      minutes: String(minutes).padStart(2, "0"),
      seconds: String(seconds).padStart(2, "0"),
      centiseconds: String(centiseconds).padStart(2, "0"),
    };
  };

  const { minutes, seconds, centiseconds } = formatTime(time);

  // Angle of the sweep hand (1 full rotation = 60 seconds)
  const sweepAngle = ((time / 1000) % 60) * 6; // 360/60 = 6 degrees per second
  // Small dial: minutes (1 full rotation = 30 minutes)
  const minuteAngle = ((time / 60000) % 30) * 12; // 360/30 = 12 degrees per minute

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Stopwatch Body */}
      <div className="relative">
        {/* Crown / button on top */}
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
          <button
            onClick={isRunning ? handleStop : handleStart}
            className="w-10 h-10 rounded-full bg-linear-to-b from-[#3a3a3a] to-[#1a1a1a] border-2 border-[#555] shadow-[0_4px_12px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.1)] hover:scale-105 active:scale-95 transition-transform cursor-pointer flex items-center justify-center"
          >
            <div className={`w-3 h-3 rounded-full ${isRunning ? "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]" : "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"}`} />
          </button>
          <div className="w-1 h-3 bg-linear-to-b from-[#555] to-[#333] rounded-b" />
        </div>

        {/* Side button (Lap) */}
        <button
          onClick={handleLap}
          className="absolute top-4 -right-4 z-20 w-6 h-10 bg-linear-to-r from-[#3a3a3a] to-[#2a2a2a] border border-[#555] rounded-r-md shadow-[2px_2px_8px_rgba(0,0,0,0.4)] hover:brightness-125 active:brightness-90 transition-all cursor-pointer"
        />

        {/* Watchface Ring */}
        <div className="relative w-[260px] h-[260px] rounded-full bg-linear-to-br from-[#2a2a2a] to-[#0a0a0a] border-[3px] border-[#444] shadow-[0_8px_32px_rgba(0,0,0,0.8),inset_0_2px_4px_rgba(255,255,255,0.05)]">
          {/* Inner bezel */}
          <div className="absolute inset-[6px] rounded-full bg-linear-to-br from-[#1a1a1a] to-[#0d0d0d] border border-[#333]">
            {/* Tick marks */}
            {Array.from({ length: 60 }).map((_, i) => (
              <div
                key={i}
                className="absolute left-1/2 top-0 origin-bottom"
                style={{
                  height: "50%",
                  width: "1px",
                  transform: `rotate(${i * 6}deg)`,
                  transformOrigin: "bottom center",
                }}
              >
                <div
                  className={`w-px ${
                    i % 5 === 0
                      ? "h-[12px] bg-white/80"
                      : "h-[6px] bg-white/30"
                  }`}
                  style={{ marginTop: "8px" }}
                />
              </div>
            ))}

            {/* Number labels at 5-second intervals */}
            {[0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55].map((num) => (
              <div
                key={`label-${num}`}
                className="absolute text-[9px] font-mono text-white/50 font-medium"
                style={{
                  left: `${50 + 38 * Math.sin((num * 6 * Math.PI) / 180)}%`,
                  top: `${50 - 38 * Math.cos((num * 6 * Math.PI) / 180)}%`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                {num}
              </div>
            ))}

            {/* Small minute sub-dial */}
            <div className="absolute top-[60%] left-1/2 -translate-x-1/2 w-[60px] h-[60px] rounded-full border border-white/10 bg-[#0a0a0a]">
              {/* Minute tick marks */}
              {Array.from({ length: 30 }).map((_, i) => (
                <div
                  key={`m-${i}`}
                  className="absolute left-1/2 top-0 origin-bottom"
                  style={{
                    height: "50%",
                    width: "1px",
                    transform: `rotate(${i * 12}deg)`,
                    transformOrigin: "bottom center",
                  }}
                >
                  <div
                    className={`w-px ${
                      i % 5 === 0 ? "h-[5px] bg-white/60" : "h-[3px] bg-white/20"
                    }`}
                    style={{ marginTop: "3px" }}
                  />
                </div>
              ))}
              {/* Minute hand */}
              <div
                className="absolute left-1/2 bottom-1/2 origin-bottom"
                style={{
                  transform: `translateX(-50%) rotate(${minuteAngle}deg)`,
                  width: "2px",
                  height: "22px",
                }}
              >
                <div className="w-full h-full bg-blue-400 rounded-full shadow-[0_0_4px_rgba(59,130,246,0.6)]" />
              </div>
              {/* Center dot */}
              <div className="absolute left-1/2 top-1/2 w-[4px] h-[4px] rounded-full bg-blue-400 -translate-x-1/2 -translate-y-1/2" />
            </div>

            {/* Main sweep hand */}
            <div
              className="absolute left-1/2 bottom-1/2 origin-bottom transition-none"
              style={{
                transform: `translateX(-50%) rotate(${sweepAngle}deg)`,
                width: "2px",
                height: "45%",
              }}
            >
              <div className="w-full h-full bg-linear-to-t from-red-500 to-red-400 rounded-full shadow-[0_0_6px_rgba(239,68,68,0.5)]" />
              {/* Counter weight */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-[6px] h-[12px] bg-red-500/60 rounded-full" />
            </div>

            {/* Center cap */}
            <div className="absolute left-1/2 top-1/2 w-[10px] h-[10px] rounded-full bg-linear-to-br from-[#666] to-[#333] border border-[#777] -translate-x-1/2 -translate-y-1/2 shadow-[0_0_4px_rgba(0,0,0,0.5)] z-10" />

            {/* Digital time display */}
            <div className="absolute top-[30%] left-1/2 -translate-x-1/2 bg-[#0a0a0a] border border-white/10 rounded-md px-3 py-1">
              <span className="font-mono text-lg tracking-widest text-white/90">
                {minutes}:{seconds}
                <span className="text-white/40 text-sm">.{centiseconds}</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Controls below */}
      <div className="flex gap-4">
        <button
          onClick={isRunning ? handleLap : handleReset}
          className="px-5 py-2 rounded-full text-sm font-medium border border-white/10 bg-white/3 text-white/60 hover:text-white hover:bg-white/6 transition-all"
        >
          {isRunning ? "Step ⬇" : "Reset"}
        </button>
        <button
          onClick={isRunning ? handleStop : handleStart}
          className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
            isRunning
              ? "bg-red-600 hover:bg-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.3)]"
              : "bg-green-600 hover:bg-green-500 text-white shadow-[0_0_15px_rgba(34,197,94,0.3)]"
          }`}
        >
          {isRunning ? "Stop" : time > 0 ? "Resume" : "Start"}
        </button>
      </div>

      {/* Laps list */}
      {laps.length > 0 && (
        <div className="w-full max-w-[260px] mt-2">
          <div className="text-xs text-white/40 uppercase tracking-widest mb-2 font-medium">
            Step Recordings
          </div>
          <div className="flex flex-col gap-1 max-h-[120px] overflow-y-auto">
            {laps.map((lap, i) => {
              const f = formatTime(lap);
              const delta =
                i === 0 ? lap : lap - laps[i - 1];
              const df = formatTime(delta);
              return (
                <div
                  key={i}
                  className="flex justify-between items-center text-xs font-mono px-3 py-1.5 rounded bg-white/2 border border-white/5"
                >
                  <span className="text-white/50">Step {i + 1}</span>
                  <span className="text-white/70">
                    {f.minutes}:{f.seconds}.{f.centiseconds}
                  </span>
                  <span className="text-violet-400">
                    +{df.minutes}:{df.seconds}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
