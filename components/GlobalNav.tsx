"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "./AuthContext";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function GlobalNav() {
  const { user, logout, login, signup } = useAuth();
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const [showNav, setShowNav] = useState(!isHomePage);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [isLoginView, setIsLoginView] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (!isHomePage) {
      timer = setTimeout(() => setShowNav(true), 0);
      return () => clearTimeout(timer);
    }
    const handleScroll = () => {
      // Show when scrolled past 500vh (approaching the end of the 600vh canvas)
      if (window.scrollY > window.innerHeight * 4.5) {
        setShowNav(true);
      } else {
        setShowNav(false);
        setSidebarOpen(false); // Auto close sidebar if scrolled back up
      }
    };
    // Initialize state
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  const handleAuthSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAuthError(null);
    setAuthLoading(true);
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    let result: { error: string | null };
    if (isLoginView) {
      result = await login(email, password);
    } else {
      const name = (formData.get("name") as string) || "Researcher";
      result = await signup(name, email, password);
    }

    setAuthLoading(false);
    if (result.error) {
      setAuthError(result.error);
    } else {
      setAuthModalOpen(false);
    }
  };

  return (
    <>
      {/* Top Fixed Area */}
      <AnimatePresence>
        {showNav && (
          <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.8, ease: "circOut" }}
            className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 md:px-12 py-6 bg-[#050505]/80 backdrop-blur-xl border-b border-white/5"
          >
            {/* Hamburger (Left) */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-white/70 hover:text-white transition-colors flex items-center gap-3 group"
            >
              <Menu size={28} className="group-hover:scale-110 transition-transform"/>
              <span className="text-sm font-medium tracking-widest uppercase hidden md:block">Menu</span>
            </button>

            {/* Auth / Profile (Right) */}
            <div>
              {!mounted ? (
                <div className="w-[140px] h-10" />
              ) : user ? (
                <div className="flex flex-col items-center group relative cursor-pointer">
                  <div className="flex items-center gap-3">
                    {user.email === 'aditya26047@gmail.com' && (
                      <div className="px-2 py-1 bg-red-600 border border-red-500 rounded text-[10px] font-bold tracking-widest text-white shadow-[0_0_10px_rgba(220,38,38,0.5)]">
                        ADMIN
                      </div>
                    )}
                    <div className="w-10 h-10 rounded-full bg-linear-to-tr from-blue-500 to-violet-500 flex items-center justify-center text-white font-medium shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                  </div>
                  {/* Dropdown for quick access */}
                  <div className="absolute top-12 right-0 w-48 bg-[#0a0a0a] border border-white/10 rounded-xl overflow-hidden opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                     <div className="p-4 border-b border-white/5 disabled">
                        <p className="text-xs text-white/50 truncate">Signed in as</p>
                        <p className="text-sm font-medium text-white truncate">{user.email}</p>
                     </div>
                     <button onClick={logout} className="w-full text-left px-4 py-3 text-sm text-red-400 hover:bg-white/5 transition-colors">
                       Sign Out
                     </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => { setAuthModalOpen(true); setIsLoginView(false); setAuthError(null); }}
                  className="px-6 py-2.5 bg-white text-black font-semibold tracking-tight rounded-full hover:bg-blue-50 hover:text-blue-600 transition-all shadow-[0_0_20px_rgba(255,255,255,0.15)]"
                >
                  Login / Signup
                </button>
              )}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <div className="fixed inset-0 z-60 flex">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="absolute inset-0 bg-[#050505]/60 backdrop-blur-sm cursor-pointer"
            />
            {/* Drawer */}
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-[300px] md:w-[400px] h-full bg-[#050505] border-r border-white/10 p-8 flex flex-col"
            >
              <button
                onClick={() => setSidebarOpen(false)}
                className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors"
               >
                <X size={28} />
              </button>

              <h2 className="text-2xl font-medium tracking-tighter text-white/90 mb-12">
                SMART FLASK
              </h2>

              <nav className="flex flex-col gap-6 text-xl tracking-tight text-white/70">
                <Link href="/" onClick={() => setSidebarOpen(false)} className="hover:text-white hover:translate-x-2 transition-all group flex items-center gap-4">
                   <div className="w-1.5 h-1.5 rounded-full bg-blue-500 opacity-0 group-hover:opacity-100 transition-all" />
                   Home
                </Link>
                <Link href="/dashboard" onClick={() => setSidebarOpen(false)} className="hover:text-white hover:translate-x-2 transition-all group flex items-center gap-4">
                   <div className="w-1.5 h-1.5 rounded-full bg-violet-500 opacity-0 group-hover:opacity-100 transition-all" />
                   Dashboard (Live)
                </Link>

                <Link href="/account" onClick={() => setSidebarOpen(false)} className="hover:text-white hover:translate-x-2 transition-all group flex items-center gap-4">
                   <div className="w-1.5 h-1.5 rounded-full bg-amber-500 opacity-0 group-hover:opacity-100 transition-all" />
                   Account Info
                </Link>
                <Link href="/community" onClick={() => setSidebarOpen(false)} className="hover:text-white hover:translate-x-2 transition-all group flex items-center gap-4">
                   <div className="w-1.5 h-1.5 rounded-full bg-green-500 opacity-0 group-hover:opacity-100 transition-all" />
                   Reaction Results
                </Link>
                <Link href="/intelligence" onClick={() => setSidebarOpen(false)} className="hover:text-white hover:translate-x-2 transition-all group flex items-center gap-4">
                   <div className="w-1.5 h-1.5 rounded-full bg-rose-500 opacity-0 group-hover:opacity-100 transition-all" />
                   Global Intelligence
                </Link>
                <Link href="/setup" onClick={() => setSidebarOpen(false)} className="hover:text-white hover:translate-x-2 transition-all group flex items-center gap-4">
                   <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 opacity-0 group-hover:opacity-100 transition-all" />
                   Hardware Setup Guide
                </Link>
              </nav>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>

      {/* Auth Modal */}
      <AnimatePresence>
        {authModalOpen && !user && (
          <div className="fixed inset-0 z-70 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setAuthModalOpen(false)}
              className="absolute inset-0 bg-[#050505]/70 backdrop-blur-md cursor-pointer"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 shadow-2xl overflow-hidden"
            >
              {/* Subtle blue accent glow inside modal */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 blur-[80px] rounded-full pointer-events-none" />
              
              <button 
                onClick={() => setAuthModalOpen(false)}
                className="absolute top-4 right-4 text-white/40 hover:text-white"
              >
                <X size={20} />
              </button>

              <h3 className="text-2xl font-medium tracking-tight text-white/90 mb-2 relative z-10">
                {isLoginView ? "Welcome Back" : "Create Account"}
              </h3>
              <p className="text-sm text-white/50 mb-8 relative z-10">
                {isLoginView 
                  ? "Access your live reaction dashboards globally." 
                  : "Join the smartest labs in the world with AI-powered synthesis."}
              </p>

              <form className="flex flex-col gap-4 relative z-10" onSubmit={handleAuthSubmit}>
                {!isLoginView && (
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium text-white/40 uppercase tracking-widest pl-1">Full Name</label>
                    <input 
                      name="name"
                      type="text" 
                      required
                      placeholder="Dr. Marie Curie" 
                      className="w-full bg-white/3 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-blue-500/50 focus:bg-white/5 transition-all"
                    />
                  </div>
                )}
                
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-white/40 uppercase tracking-widest pl-1">Work Email</label>
                  <input 
                    name="email"
                    type="email" 
                    required
                    placeholder="name@university.edu" 
                    className="w-full bg-white/3 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-blue-500/50 focus:bg-white/5 transition-all"
                  />
                </div>
                
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-center pl-1">
                    <label className="text-xs font-medium text-white/40 uppercase tracking-widest">Password</label>
                    {isLoginView && <button type="button" className="text-xs text-blue-400 hover:text-blue-300">Forgot?</button>}
                  </div>
                  <input 
                    name="password"
                    type="password" 
                    required
                    placeholder="••••••••" 
                    className="w-full bg-white/3 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-blue-500/50 focus:bg-white/5 transition-all"
                  />
                </div>

                {authError && (
                  <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                    {authError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={authLoading}
                  className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium rounded-lg px-4 py-3 mt-4 transition-colors glow-blue"
                >
                  {authLoading ? "Please wait..." : isLoginView ? "Sign In" : "Create Account"}
                </button>
                
                <div className="mt-4 text-center text-sm text-white/40">
                  {isLoginView ? "Don't have an account? " : "Already have an account? "}
                  <button
                    type="button"
                    onClick={() => { setIsLoginView(!isLoginView); setAuthError(null); }}
                    className="text-white hover:text-blue-400 font-medium transition-colors"
                  >
                    {isLoginView ? "Sign Up" : "Sign In"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
