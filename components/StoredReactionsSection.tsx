"use client";

import { motion } from "framer-motion";
import { STORED_REACTIONS } from "@/lib/reactions";
import Link from "next/link";
import { Beaker, Clock, Zap } from "lucide-react";

const difficultyColor = {
  Beginner: "text-green-400 border-green-500/30 bg-green-500/10",
  Intermediate: "text-amber-400 border-amber-500/30 bg-amber-500/10",
  Advanced: "text-red-400 border-red-500/30 bg-red-500/10",
};

export default function StoredReactionsSection() {
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
        </motion.div>

        {/* Reaction Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {STORED_REACTIONS.map((reaction, index) => (
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
