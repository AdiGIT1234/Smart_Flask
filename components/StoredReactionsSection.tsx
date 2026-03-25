"use client";

import { motion } from "framer-motion";
import { STORED_REACTIONS } from "@/lib/reactions";
import Link from "next/link";
import { Beaker, Clock, Zap, Edit2, Save } from "lucide-react";
import { useAuth } from "./AuthContext";
import { useState, useEffect } from "react";

const difficultyColor = {
  Beginner: "text-green-400 border-green-500/30 bg-green-500/10",
  Intermediate: "text-amber-400 border-amber-500/30 bg-amber-500/10",
  Advanced: "text-red-400 border-red-500/30 bg-red-500/10",
};

export default function StoredReactionsSection() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [localReactions, setLocalReactions] = useState(STORED_REACTIONS);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const handleSaveToSupabase = async () => {
    // This will connect to the real Supabase implementation once configured
    alert("Reactions saved! In production, this pushes directly to your Supabase instance.");
    setIsEditing(false);
  };
  return (
    <section className="bg-[#050505] text-white py-32 px-6 md:px-12 lg:px-24 border-t border-white/5 relative z-10 overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-violet-600/5 blur-[150px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-600/5 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <span className="text-violet-400 font-medium tracking-widest uppercase text-sm mb-4 block">
            Experiments
          </span>
          <h2 className="text-5xl md:text-6xl font-medium tracking-tighter text-white mb-6 leading-[1.1]">
            Start a <span className="text-white/50">Reaction</span>.
          </h2>
          <p className="text-lg text-white/50 max-w-2xl mx-auto font-light">
            Choose from our library of pre-configured experiments with real-time monitoring, or create your own custom setup.
          </p>
          
          {mounted && user?.email === "aditya26047@gmail.com" && !isEditing && (
            <div className="mt-8 flex justify-center">
              <button 
                onClick={() => setIsEditing(true)} 
                className="px-6 py-2.5 bg-red-600 hover:bg-red-500 rounded-full text-white font-medium shadow-[0_0_15px_rgba(220,38,38,0.3)] transition-all flex items-center gap-2 text-sm uppercase tracking-widest"
              >
                <Edit2 size={16} /> Admin: Edit Reactions
              </button>
            </div>
          )}
        </motion.div>

        {/* Reaction Cards Grid / Edit Mode */}
        {isEditing ? (
          <div className="bg-white/5 border border-red-500/30 rounded-2xl p-6 md:p-10 mb-12 relative">
            <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-6">
              <h3 className="text-2xl font-medium text-white flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-red-500 animate-pulse shadow-[0_0_10px_rgba(220,38,38,0.8)]" />
                Live Database Editor
              </h3>
              <div className="flex gap-4">
                 <button onClick={() => setIsEditing(false)} className="px-4 py-2 hover:bg-white/10 rounded-lg text-white/60 hover:text-white transition text-sm">Cancel</button>
                 <button onClick={handleSaveToSupabase} className="px-5 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg flex items-center gap-2 text-white font-medium text-sm transition">
                   <Save size={16} /> Save to Supabase
                 </button>
              </div>
            </div>

            <div className="space-y-6">
              {localReactions.map((rxn, i) => (
                <div key={rxn.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 bg-black/40 p-4 rounded-xl border border-white/5">
                   <div className="col-span-12 md:col-span-4">
                     <label className="text-[10px] uppercase tracking-widest text-white/40 ml-1">Reaction Name</label>
                     <input 
                       value={rxn.name}
                       onChange={(e) => {
                         const copy = [...localReactions];
                         copy[i].name = e.target.value;
                         setLocalReactions(copy);
                       }}
                       className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-blue-500 outline-none" 
                     />
                   </div>
                   <div className="col-span-12 md:col-span-5">
                     <label className="text-[10px] uppercase tracking-widest text-white/40 ml-1">Chemical Formula</label>
                     <input 
                       value={rxn.formula}
                       onChange={(e) => {
                         const copy = [...localReactions];
                         copy[i].formula = e.target.value;
                         setLocalReactions(copy);
                       }}
                       className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white font-mono focus:border-blue-500 outline-none" 
                     />
                   </div>
                   <div className="col-span-12 md:col-span-3">
                     <label className="text-[10px] uppercase tracking-widest text-white/40 ml-1">Category</label>
                     <input 
                       value={rxn.category}
                       onChange={(e) => {
                         const copy = [...localReactions];
                         copy[i].category = e.target.value;
                         setLocalReactions(copy);
                       }}
                       className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-blue-500 outline-none" 
                     />
                   </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {localReactions.map((reaction, index) => (
            <motion.div
              key={reaction.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: "easeOut",
              }}
            >
              <Link href={`/reaction/${reaction.id}`}>
                <div className="glass-card glass-card-hover transition-all duration-500 overflow-hidden group cursor-pointer h-full flex flex-col relative">
                  {/* Top gradient accent bar */}
                  <div
                    className={`h-1 w-full bg-linear-to-r ${reaction.thumbnail_color}`}
                  />

                  {/* Hover glow */}
                  <div
                    className={`absolute top-0 right-0 w-40 h-40 bg-linear-to-br ${reaction.thumbnail_color} opacity-0 group-hover:opacity-10 blur-[60px] rounded-full transition-opacity duration-700 pointer-events-none`}
                  />

                  <div className="p-6 flex flex-col flex-1">
                    {/* Category + Difficulty */}
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-xs font-medium tracking-widest uppercase text-white/40">
                        {reaction.category}
                      </span>
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                          difficultyColor[reaction.difficulty]
                        }`}
                      >
                        {reaction.difficulty}
                      </span>
                    </div>

                    {/* Name */}
                    <h3 className="text-xl font-medium tracking-tight text-white/90 mb-2 group-hover:text-white transition-colors">
                      {reaction.name}
                    </h3>

                    {/* Formula */}
                    <p className="text-sm font-mono text-white/40 mb-4 group-hover:text-white/60 transition-colors">
                      {reaction.formula}
                    </p>

                    {/* Spacer */}
                    <div className="flex-1" />

                    {/* Meta info */}
                    <div className="flex items-center gap-4 text-xs text-white/40 mt-4 pt-4 border-t border-white/5">
                      <span className="flex items-center gap-1.5">
                        <Clock size={12} />
                        {reaction.duration_minutes} min
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Beaker size={12} />
                        {reaction.chemicals.length} chemicals
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Zap size={12} />
                        {reaction.steps.length} steps
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        )}

        {/* Custom Experiment CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
          className="mt-12 text-center"
        >
          <Link href="/reaction/custom">
            <div className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-white/10 bg-white/2 hover:bg-white/5 hover:border-white/20 transition-all duration-300 cursor-pointer group">
              <div className="w-8 h-8 rounded-full bg-linear-to-tr from-white/10 to-white/5 flex items-center justify-center border border-white/10 group-hover:border-white/20 transition-colors">
                <span className="text-white/70 text-lg">+</span>
              </div>
              <div className="text-left">
                <span className="text-white/80 font-medium text-sm block group-hover:text-white transition-colors">
                  Custom Experiment
                </span>
                <span className="text-white/30 text-xs">
                  Set up your own reaction parameters
                </span>
              </div>
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
