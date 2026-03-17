"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function AccountSection() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <section className="bg-[#050505] text-white py-32 px-6 md:px-12 lg:px-24 border-t border-white/5 relative z-10 overflow-hidden">
      
      {/* Background decorations */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg h-full max-h-lg bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-md mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="glass-card p-10 flex flex-col items-center"
        >
          <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-blue-500/20 to-violet-500/20 flex items-center justify-center mb-8 border border-white/10 glow-blue">
             {/* Simple Flask SVG Icon */}
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                <path d="M10 2v7.31M14 9.31V2M8.5 2h7M14 9.31L22.5 22H1.5L10 9.31Z"/>
             </svg>
          </div>
          
          <h3 className="text-2xl font-medium tracking-tight text-white/90 mb-2 text-center">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h3>
          <p className="text-sm text-white/50 mb-8 text-center px-4">
            {isLogin ? "Access your smart chemistry portal and live reaction dashboards." : "Join the smartest labs in the world with AI-powered synthesis."}
          </p>

          <form className="w-full flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
            {!isLogin && (
              <div className="flex flex-col gap-1.5">
                 <label className="text-xs font-medium text-white/40 uppercase tracking-widest pl-1">Full Name</label>
                 <input 
                   type="text" 
                   placeholder="Dr. Marie Curie" 
                   className="w-full bg-white/3 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-blue-500/50 focus:bg-white/5 transition-all"
                 />
              </div>
            )}
            
            <div className="flex flex-col gap-1.5">
               <label className="text-xs font-medium text-white/40 uppercase tracking-widest pl-1">Work Email</label>
               <input 
                 type="email" 
                 placeholder="name@university.edu" 
                 className="w-full bg-white/3 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-blue-500/50 focus:bg-white/5 transition-all"
               />
            </div>
            
            <div className="flex flex-col gap-1.5">
               <div className="flex justify-between items-center pl-1">
                 <label className="text-xs font-medium text-white/40 uppercase tracking-widest">Password</label>
                 {isLogin && <button type="button" className="text-xs text-blue-400 hover:text-blue-300">Forgot?</button>}
               </div>
               <input 
                 type="password" 
                 placeholder="••••••••" 
                 className="w-full bg-white/3 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-blue-500/50 focus:bg-white/5 transition-all"
               />
            </div>

            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg px-4 py-3 mt-4 transition-colors glow-blue">
              {isLogin ? "Sign In" : "Create Account"}
            </button>
            
            <div className="mt-6 text-center text-sm text-white/40">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button 
                type="button" 
                onClick={() => setIsLogin(!isLogin)}
                className="text-white hover:text-blue-400 font-medium transition-colors"
              >
                {isLogin ? "Sign Up" : "Sign In"}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
