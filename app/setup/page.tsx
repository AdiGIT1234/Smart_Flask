"use client";

import { motion } from "framer-motion";
import { Wifi, Cpu, Settings, CheckCircle2, ChevronRight, Activity, Terminal } from "lucide-react";

export default function SetupPage() {
  const steps = [
    {
      title: "Power on the Hardware",
      description: "Connect your ESP8266 board to a power source (USB or battery). The built-in LED should begin blinking to indicate it is in configuration mode.",
      icon: Cpu,
      color: "text-blue-400",
      bg: "bg-blue-500/10 border-blue-500/20"
    },
    {
      title: "Connect to Setup Network",
      description: "On your phone or laptop, open your WiFi settings and connect to the network named 'Smart Flask Config'. No password is required.",
      icon: Wifi,
      color: "text-violet-400",
      bg: "bg-violet-500/10 border-violet-500/20"
    },
    {
      title: "Configure WiFi",
      description: "A setup page should automatically pop up. If it doesn't, open a browser and go to http://192.168.4.1. Select your home or lab WiFi network and enter its password.",
      icon: Settings,
      color: "text-amber-400",
      bg: "bg-amber-500/10 border-amber-500/20"
    },
    {
      title: "Start Monitoring",
      description: "The ESP8266 will restart and connect to your local network. You can now go to the Live Dashboard to see your sensor data streaming in real-time.",
      icon: Activity,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10 border-emerald-500/20"
    }
  ];

  return (
    <main className="bg-[#050505] min-h-screen text-white pt-24 pb-24 selection:bg-cyan-500/30">
      {/* Background glows */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-600/5 blur-[150px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-600/5 blur-[120px] rounded-full" />
      </div>

      <div className="px-6 md:px-12 lg:px-24 max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <span className="text-cyan-400 font-medium tracking-widest uppercase text-sm mb-3 block flex items-center gap-2">
            <Terminal size={14} /> Documentation
          </span>
          <h1 className="text-5xl md:text-6xl font-medium tracking-tighter mb-6 leading-[1.1]">
            Hardware <span className="text-white/40">Setup Guide</span>
          </h1>
          <p className="text-lg text-white/50 font-light leading-relaxed">
            Follow these instructions to connect your physical sensor rig to the Smart Flask platform.
            Our built-in WiFi Manager makes it easy to provision your device on any new network without editing code.
          </p>
        </motion.div>

        <div className="relative">
          {/* Vertical connection line */}
          <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-white/5 hidden md:block" />

          <div className="flex flex-col gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative flex flex-col md:flex-row gap-6 md:gap-8 items-start group"
              >
                {/* Step Number Bubble */}
                <div className={`shrink-0 w-12 h-12 rounded-full border-2 flex items-center justify-center font-bold text-lg transition-all duration-300 z-10 bg-[#050505] ${step.bg} ${step.color} group-hover:scale-110 shadow-[0_0_15px_rgba(0,0,0,0.5)]`}>
                  {index + 1}
                </div>

                {/* Card */}
                <div className="flex-1 glass-card p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
                  <div className="flex items-center gap-3 mb-3">
                    <step.icon size={20} className={step.color} />
                    <h3 className="text-xl font-semibold tracking-tight text-white/90">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-white/50 leading-relaxed text-sm">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-16 p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div>
            <h4 className="font-semibold text-white/90 mb-1 flex items-center gap-2">
              <CheckCircle2 size={16} className="text-emerald-400" />
              Ready to test?
            </h4>
            <p className="text-sm text-white/50">
              Once connected, head over to the live dashboard to view your sensor streams.
            </p>
          </div>
          <a
            href="/dashboard"
            className="shrink-0 px-6 py-3 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-colors flex items-center gap-2 text-sm"
          >
            Open Live Dashboard <ChevronRight size={16} />
          </a>
        </motion.div>
      </div>
    </main>
  );
}
