"use client";

import { motion } from "framer-motion";

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
                     {/* SVG simple eye */}
                     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                  </div>
                  <div>
                    <h4 className="text-xl font-medium text-white/90 mb-1 tracking-tight">Our Optical Intelligence</h4>
                    <p className="text-white/50 text-sm">We use 120fps computer vision mixed with predictive ML to identify cavitation, gas buildup, and thermal gradients instantly.</p>
                  </div>
                </div>
             </div>
          </div>

          {/* Right: Abstract Glass UI Representation */}
          <div className="relative">
             <div className="absolute inset-0 bg-linear-to-tr from-violet-600/20 to-blue-600/20 blur-[100px] rounded-full pointer-events-none" />
             
             <div className="glass-card p-6 relative z-10 overflow-hidden h-[500px] flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-6">
                     <h5 className="text-sm tracking-widest uppercase text-white/40">Real-Time Delta</h5>
                     <div className="flex gap-2">
                        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                     </div>
                  </div>
                  
                  {/* Fake UI bars for visual interest */}
                  <div className="space-y-4">
                     <div className="w-full h-8 bg-white/5 rounded flex overflow-hidden group">
                       <div className="h-full bg-red-500/50 w-[45%] flex pt-1 px-3">
                         <span className="text-[10px] uppercase tracking-widest text-white/70">Legacy Lag</span>
                       </div>
                       <div className="h-full border-l border-red-500 w-[55%] bg-stripes opacity-20" />
                     </div>

                     <div className="w-full h-8 bg-white/5 rounded flex overflow-hidden">
                       <div className="h-full bg-blue-500 glow-blue w-[12%] flex items-center pt-1 px-3 mt-1">
                         <span className="text-[10px] uppercase font-bold tracking-widest text-white">Smart Flask</span>
                       </div>
                     </div>
                  </div>
                </div>

                <div className="w-full bg-[#0a0a0a] rounded-xl p-6 border border-white/10 mt-12 grid grid-cols-2 gap-4 relative">
                   <div className="absolute top-0 right-0 w-24 h-24 bg-green-500/10 blur-[30px] rounded-full" />
                   <div>
                     <p className="text-xs text-white/40 uppercase tracking-widest mb-1">Reaction Yield</p>
                     <p className="text-4xl text-white font-medium">+14<span className="text-xl text-green-400">%</span></p>
                   </div>
                   <div>
                     <p className="text-xs text-white/40 uppercase tracking-widest mb-1">Safety Response</p>
                     <p className="text-4xl text-white font-medium">&lt;10<span className="text-xl text-blue-400">ms</span></p>
                   </div>
                </div>
             </div>
          </div>
        </motion.div>
      </div>
      
      {/* Tiny bit of extra CSS for stripes */}
      <style dangerouslySetInnerHTML={{__html: `
        .bg-stripes {
           background-image: repeating-linear-gradient(
             45deg,
             transparent,
             transparent 10px,
             rgba(255,255,255,0.1) 10px,
             rgba(255,255,255,0.1) 20px
           );
        }
      `}} />
    </section>
  );
}
