"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

const TOTAL_FRAMES = 240;
const INITIAL_FRAMES = 30; // Show sequence after this many frames are ready

export default function FlaskScrollCanvas() {
  const imagesRef = useRef<HTMLImageElement[]>(new Array(TOTAL_FRAMES));
  const [loadedFrames, setLoadedFrames] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let loadedCount = 0;
    let initialShown = false;

    const loadFrame = (index: number) => {
      if (index >= TOTAL_FRAMES) return;
      const img = new Image();
      const formattedIndex = String(index + 1).padStart(3, "0");
      img.src = `/sequence/ezgif-frame-${formattedIndex}.jpg`;

      const onDone = () => {
        loadedCount++;
        setLoadedFrames(loadedCount);
        if (!initialShown && loadedCount >= INITIAL_FRAMES) {
          initialShown = true;
          setIsLoaded(true);
        }
      };

      img.onload = () => {
        imagesRef.current[index] = img;
        onDone();
      };
      img.onerror = onDone;
    };

    // Fire all 240 requests in parallel — browser will throttle to ~6 concurrent
    for (let i = 0; i < TOTAL_FRAMES; i++) {
      loadFrame(i);
    }
  }, []);

  if (!isLoaded) {
    const progress = (loadedFrames / INITIAL_FRAMES) * 100;
    return (
      <div className="fixed inset-0 bg-[#050505] flex flex-col items-center justify-center z-50">
        <div className="flex flex-col items-center gap-6 w-full max-w-md px-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-16 h-16 border-t-2 border-r-2 border-blue-500 rounded-full animate-spin"
          />
          <div className="w-full h-px bg-white/10 relative overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full loader-bar transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between w-full text-xs font-medium tracking-widest text-white/40 uppercase">
            <span>Loading Sequence</span>
            <span>{Math.round(progress)}%</span>
          </div>
        </div>
      </div>
    );
  }

  return <ScrollSequence imagesRef={imagesRef} />;
}

// Extracted into a separate component so that `useScroll` and `useTransform`
// only execute when the component is fully mounted and ready.
function ScrollSequence({ imagesRef }: { imagesRef: React.RefObject<HTMLImageElement[]> }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Scroll tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Frame rendering
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Render function
    const renderFrame = (progress: number) => {
      let frameIndex = Math.floor(progress * (TOTAL_FRAMES - 1));
      frameIndex = Math.max(0, Math.min(frameIndex, TOTAL_FRAMES - 1));

      const img = imagesRef.current[frameIndex];
      if (!img || !img.complete || img.naturalWidth === 0) return;

      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();

      // Clear canvas
      ctx.clearRect(0, 0, rect.width, rect.height);
      
      // Black background
      ctx.fillStyle = "#050505";
      ctx.fillRect(0, 0, rect.width, rect.height);

      // Object fit: contain
      const scale = Math.min(
        rect.width / img.naturalWidth,
        rect.height / img.naturalHeight
      );
      
      const x = (rect.width - img.naturalWidth * scale) / 2;
      const y = (rect.height - img.naturalHeight * scale) / 2;
      
      ctx.drawImage(
        img,
        0, 0, img.naturalWidth, img.naturalHeight,
        x, y, img.naturalWidth * scale, img.naturalHeight * scale
      );
    };

    // Set canvas dimensions to parent, with device pixel ratio for retina
    const updateCanvasSize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;

      const dpr = window.devicePixelRatio || 1;
      const rect = parent.getBoundingClientRect();
      
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      
      ctx.scale(dpr, dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      
      // Force initial render
      renderFrame(smoothProgress.get());
    };

    window.addEventListener("resize", updateCanvasSize);
    updateCanvasSize();

    // Subscribe to scroll progress
    const unsubscribe = smoothProgress.on("change", renderFrame);

    return () => {
      window.removeEventListener("resize", updateCanvasSize);
      unsubscribe();
    };
  }, [imagesRef, smoothProgress]);

  // Text Animations
  // Beat A: 0-20%
  const beatA_Opacity = useTransform(smoothProgress, [0, 0.05, 0.15, 0.2], [0, 1, 1, 0]);
  const beatA_Y = useTransform(smoothProgress, [0, 0.05, 0.15, 0.2], [20, 0, 0, -20]);

  // Beat B: 25-45%
  const beatB_Opacity = useTransform(smoothProgress, [0.25, 0.3, 0.4, 0.45], [0, 1, 1, 0]);
  const beatB_Y = useTransform(smoothProgress, [0.25, 0.3, 0.4, 0.45], [20, 0, 0, -20]);

  // Beat C: 50-70%
  const beatC_Opacity = useTransform(smoothProgress, [0.5, 0.55, 0.65, 0.7], [0, 1, 1, 0]);
  const beatC_Y = useTransform(smoothProgress, [0.5, 0.55, 0.65, 0.7], [20, 0, 0, -20]);

  // Beat D: 75-95%
  const beatD_Opacity = useTransform(smoothProgress, [0.75, 0.8, 0.9, 0.95], [0, 1, 1, 0]);
  const beatD_Y = useTransform(smoothProgress, [0.75, 0.8, 0.9, 0.95], [20, 0, 0, -20]);

  // CTA: 95-100%
  const cta_Opacity = useTransform(smoothProgress, [0.95, 0.98, 1], [0, 1, 1]);
  const cta_Y = useTransform(smoothProgress, [0.95, 0.98, 1], [20, 0, 0]);

  // Scroll Indicator
  const indicator_Opacity = useTransform(smoothProgress, [0, 0.1], [1, 0]);

  return (
    <div ref={containerRef} className="relative h-[600vh] bg-[#050505]">
      {/* Sticky Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Canvas */}
        <div className="absolute inset-0 w-full h-full">
          <canvas ref={canvasRef} className="w-full h-full block" />
        </div>

        {/* Text Overlays */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-4 text-center">
          {/* Beat A */}
          <motion.div
            style={{ opacity: beatA_Opacity, y: beatA_Y }}
            className="absolute inset-0 flex flex-col items-center justify-center"
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tighter text-white/90 mb-4">
              REAL-TIME CHEMISTRY
            </h1>
            <p className="text-xl md:text-2xl text-white/60 tracking-tight">
              Every reaction. Captured. Instantly.
            </p>
          </motion.div>

          {/* Beat B */}
          <motion.div
            style={{ opacity: beatB_Opacity, y: beatB_Y }}
            className="absolute inset-0 flex flex-col items-center justify-center"
          >
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tighter text-white/90 mb-4">
              SEE THE INVISIBLE
            </h2>
            <p className="text-xl md:text-2xl text-white/60 tracking-tight">
              Gas, temperature, and reaction dynamics in motion
            </p>
          </motion.div>

          {/* Beat C */}
          <motion.div
            style={{ opacity: beatC_Opacity, y: beatC_Y }}
            className="absolute inset-0 flex flex-col items-center justify-center"
          >
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tighter text-white/90 mb-4 drop-shadow-[0_0_30px_rgba(59,130,246,0.3)]">
              INTELLIGENCE BUILT IN
            </h2>
            <p className="text-xl md:text-2xl text-white/60 tracking-tight">
              ML detects anomalies before you do
            </p>
          </motion.div>

          {/* Beat D */}
          <motion.div
            style={{ opacity: beatD_Opacity, y: beatD_Y }}
            className="absolute inset-0 flex flex-col items-center justify-center"
          >
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tighter text-white/90 mb-4 drop-shadow-[0_0_30px_rgba(139,92,246,0.3)]">
              PRECISION. SAFETY. CONTROL.
            </h2>
            <p className="text-xl md:text-2xl text-white/60 tracking-tight">
              From lab experiment to verified insight
            </p>
          </motion.div>

          {/* CTA */}
          <motion.div
            style={{ opacity: cta_Opacity, y: cta_Y }}
            className="absolute inset-0 flex flex-col items-center justify-center pb-24"
          >
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tighter text-white/90 mb-6 drop-shadow-[0_0_30px_rgba(245,158,11,0.3)]">
              START SMART EXPERIMENTATION
            </h2>
            <p className="text-xl md:text-2xl text-white/60 tracking-tight mb-12">
              Experience the future of lab monitoring
            </p>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          style={{ opacity: indicator_Opacity }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 pointer-events-none"
        >
          <span className="text-xs uppercase tracking-[0.2em] text-white/40">Scroll to Explore</span>
          <div className="w-px h-12 bg-linear-to-b from-white/30 to-transparent relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[30%] bg-white rounded-full animate-[scrolldown_1.5s_ease-in-out_infinite]" />
          </div>
        </motion.div>

        {/* Extra CSS for scroll indicator animation */}
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes scrolldown {
            0% { transform: translateY(-100%); opacity: 0; }
            50% { opacity: 1; }
            100% { transform: translateY(300%); opacity: 0; }
          }
        `}} />
      </div>
    </div>
  );
}
