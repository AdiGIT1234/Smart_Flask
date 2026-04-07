"use client";

import { motion } from "framer-motion";
import { Brain, Sparkles, Activity, ShieldCheck } from "lucide-react";

export default function ProblemStatementSection() {
  return (
    <section className="bg-[#050505] text-white py-32 px-6 md:px-12 lg:px-24 border-t border-white/5 relative z-10 overflow-hidden">
      
      {/* Background radial gradient for subtle glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center"
        >
          {/* Left: Text Content */}
          <div>
             <span className="text-blue-500 font-medium tracking-widest uppercase text-sm mb-4 block">
                The Problem
             </span>
             <h2 className="text-5xl md:text-6xl font-medium tracking-tighter text-white border-white mb-6 leading-[1.1]">
                Invisible variables ruin <span className="text-white/50">chemical synthesis</span>.
             </h2>
             <p className="text-lg md:text-xl text-white/50 mb-8 font-light leading-relaxed">
                Traditional lab sensors lag. By the time a thermistor detects an exothermic spike or pressure builds from unseen gas, your synthesis yield drops—or a safety hazard triggers. Real-time invisible variables dictate the purity of standard compounds.
             </p>
             
             <div className="flex flex-col gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full border border-red-500/20 bg-red-500/10 shrink-0 flex items-center justify-center glow-red">
                     <span className="text-red-400 font-bold">!</span>
                  </div>
                  <div>
                    <h4 className="text-xl font-medium text-white/90 mb-1 tracking-tight">Standard Sensor Lag</h4>
                    <p className="text-white/50 text-sm">Hardware sensors delay structural readings by 3–15 seconds, creating dangerous blind spots during mixing.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full border border-blue-500/20 bg-blue-500/10 shrink-0 flex items-center justify-center glow-blue">
                     <Brain size={20} className="text-blue-400"/>
                  </div>
                  <div>
                    <h4 className="text-xl font-medium text-white/90 mb-1 tracking-tight">Our ML Intelligence</h4>
                    <p className="text-white/50 text-sm">We use a trained Random Forest model predicting safety bands in under 10ms directly from your hardware stream.</p>
                  </div>
                </div>
             </div>
          </div>

          {/* Right: Abstract ML Neural Representation */}
          <div className="relative">
             <div className="absolute inset-0 bg-linear-to-tr from-violet-600/20 to-blue-600/20 blur-[100px] rounded-full pointer-events-none" />
             
             <div className="glass-card p-8 relative z-10 overflow-hidden h-[500px] flex flex-col justify-between">
                
                {/* Abstract Data Stream Visualization */}
                <div className="relative flex-1 flex flex-col items-center justify-center">
                  
                  {/* Floating abstract elements representing continuous ML processing */}
                  <motion.div 
                    animate={{ rotate: 360 }} 
                    transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                    className="absolute w-64 h-64 border border-white/5 rounded-full border-dashed"
                  />
                  <motion.div 
                    animate={{ rotate: -360 }} 
                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                    className="absolute w-48 h-48 border border-blue-500/20 rounded-full"
                  />
                  
                  {/* Central Node */}
                  <div className="relative z-10 w-24 h-24 rounded-full bg-linear-to-tr from-blue-600 to-violet-600 shadow-[0_0_50px_rgba(59,130,246,0.3)] flex items-center justify-center p-0.5">
                    <div className="w-full h-full bg-[#050505] rounded-full flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-linear-to-b from-blue-500/20 to-transparent"></div>
                      <Brain size={32} className="text-white relative z-10" />
                    </div>
                  </div>

                  {/* Connecting lines */}
                  <div className="absolute top-[30%] left-[10%] p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                     <Activity size={18} className="text-cyan-400" />
                  </div>
                  <div className="absolute bottom-[20%] right-[10%] p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                     <Sparkles size={18} className="text-amber-400" />
                  </div>
                  <div className="absolute bottom-[25%] left-[20%] p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                     <ShieldCheck size={18} className="text-emerald-400" />
                  </div>

                </div>

                {/* Bottom stats replacing the old bar chart */}
                <div className="w-full bg-[#0a0a0a] rounded-xl p-6 border border-white/10 mt-8 grid grid-cols-2 gap-4 relative">
                   <div className="absolute top-0 left-0 w-32 h-32 bg-blue-500/10 blur-[40px] rounded-full pointer-events-none" />
                   <div>
                     <p className="text-xs text-white/40 uppercase tracking-widest mb-1">Inference Time</p>
                     <p className="text-3xl text-white font-medium">&lt;10<span className="text-lg text-blue-400 ml-1">ms</span></p>
                   </div>
                   <div>
                     <p className="text-xs text-white/40 uppercase tracking-widest mb-1">Model Accuracy</p>
                     <p className="text-3xl text-white font-medium">99.8<span className="text-lg text-emerald-400 ml-1">%</span></p>
                   </div>
                </div>

             </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
