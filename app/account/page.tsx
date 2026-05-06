"use client";

import { motion } from "framer-motion";
import { useAuth } from "@/components/AuthContext";
import {
  User,
  Mail,
  Calendar,
  Shield,
  FlaskConical,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";
import Link from "next/link";

export default function AccountPage() {
  const { user, logout } = useAuth();

  if (!user) {
    return (
      <main className="bg-[#050505] min-h-screen text-white flex items-center justify-center selection:bg-violet-500/30">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] bg-amber-600/5 blur-[150px] rounded-full" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center relative z-10"
        >
          <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-6">
            <User size={32} className="text-white/30" />
          </div>
          <h1 className="text-4xl font-medium tracking-tight mb-3">
            Account Info
          </h1>
          <p className="text-white/50 mb-8 max-w-sm">
            Sign in to view your profile, experiment history, and analytics.
          </p>
          <Link
            href="/"
            className="px-6 py-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors inline-block"
          >
            ← Back Home
          </Link>
        </motion.div>
      </main>
    );
  }

  // Mock stats for demo
  const stats = [
    { label: "Experiments Run", value: 12, icon: FlaskConical, color: "text-violet-400" },
    { label: "Anomalies Detected", value: 3, icon: Shield, color: "text-red-400" },
    { label: "Avg Duration", value: "8m 23s", icon: Calendar, color: "text-blue-400" },
    { label: "Data Points", value: "1,847", icon: BarChart3, color: "text-green-400" },
  ];

  return (
    <main className="bg-[#050505] min-h-screen text-white pt-24 pb-24 selection:bg-violet-500/30">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/3 w-[500px] h-[500px] bg-amber-600/5 blur-[150px] rounded-full" />
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-violet-600/5 blur-[120px] rounded-full" />
      </div>

      <div className="px-6 md:px-12 lg:px-24 max-w-5xl mx-auto relative z-10">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-card p-8 md:p-10 mb-8"
        >
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Avatar */}
            <div className="w-24 h-24 rounded-2xl bg-linear-to-br from-amber-500 to-orange-600 flex items-center justify-center text-4xl font-bold shadow-[0_0_30px_rgba(245,158,11,0.2)]">
              {user.name.charAt(0).toUpperCase()}
            </div>

            {/* Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-medium tracking-tight mb-1">
                {user.name}
              </h1>
              <div className="flex items-center justify-center md:justify-start gap-2 text-white/50 mb-4">
                <Mail size={14} />
                <span className="text-sm">{user.email}</span>
              </div>
              <div className="flex flex-wrap justify-center md:justify-start gap-2">
                <span className="text-xs px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400">
                  Researcher
                </span>
                <span className="text-xs px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400">
                  Active
                </span>
                <span className="text-xs px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400">
                  MQ6 + MQ7 + DHT11
                </span>
              </div>
            </div>

            {/* Settings */}
            <button className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors">
              <Settings size={16} className="text-white/50" />
            </button>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.05 }}
              className="glass-card p-5 text-center"
            >
              <stat.icon size={20} className={`${stat.color} mx-auto mb-2`} />
              <span className="text-xs text-white/40 uppercase tracking-widest block mb-1">
                {stat.label}
              </span>
              <span className="text-2xl font-medium">{stat.value}</span>
            </motion.div>
          ))}
        </div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="glass-card p-8 mb-8"
        >
          <h2 className="text-xl font-medium tracking-tight mb-6 flex items-center gap-3">
            <Calendar size={18} className="text-blue-400" />
            Recent Experiments
          </h2>
          <div className="space-y-3">
            {[
              { name: "Charcoal Combustion", date: "2 hours ago", status: "Completed", peakCO: "340 ppm" },
              { name: "LPG Leak Simulation", date: "Yesterday", status: "Completed", peakCO: "8 ppm" },
              { name: "Candle in a Jar", date: "3 days ago", status: "Anomaly Detected", peakCO: "195 ppm" },
            ].map((exp, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 rounded-xl bg-white/2 border border-white/5 hover:bg-white/5 transition-colors"
              >
                <div>
                  <h4 className="text-sm font-medium text-white/90">{exp.name}</h4>
                  <span className="text-xs text-white/40">{exp.date}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs font-mono text-white/50">
                    Peak CO: {exp.peakCO}
                  </span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      exp.status === "Completed"
                        ? "bg-green-500/10 text-green-400 border border-green-500/20"
                        : "bg-red-500/10 text-red-400 border border-red-500/20"
                    }`}
                  >
                    {exp.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          <Link
            href="/dashboard"
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-sm font-medium"
          >
            <BarChart3 size={16} />
            View Dashboard
          </Link>
          <button
            onClick={() => logout()}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 transition-colors text-sm font-medium text-red-400"
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </motion.div>
      </div>
    </main>
  );
}
