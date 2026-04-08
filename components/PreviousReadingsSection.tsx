/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable react/no-unescaped-entities */
"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type Reading = {
  id: string;
  date: string;
  gasSpike: string;
  maxTemp: string;
  status: string;
  duration: string;
};

import { supabase } from "@/lib/supabase";

export default function PreviousReadingsSection() {
  const [readings, setReadings] = useState<Reading[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const { data, error } = await supabase
          .from("experiment_results")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Supabase Error:", error);
          return;
        }

        if (data && data.length > 0) {
          const formatted = data.map((d: {
            id: string;
            created_at: string;
            data: { anomaly?: boolean; mq6_ppm?: number; mq7_ppm?: number; temp_celsius?: number }[];
            total_duration_seconds: number;
          }) => {
            const hasAnomaly = d.data.some((dp) => dp.anomaly);
            const maxGas = Math.max(
              ...d.data.map((dp) => dp.mq6_ppm || 0),
              ...d.data.map((dp) => dp.mq7_ppm || 0)
            );
            const maxTemp = Math.max(...d.data.map((dp) => dp.temp_celsius || 0));

            return {
              id: d.id ? d.id.substring(0, 8) : "SYN-UNK",
              date: new Date(d.created_at).toLocaleString("en-US", {
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              }),
              gasSpike: `${Math.round(maxGas)} ppm`,
              maxTemp: `${maxTemp.toFixed(1)} °C`,
              status: hasAnomaly ? "Warning" : "Safe",
              duration: `${Math.floor(d.total_duration_seconds / 60)}m ${d.total_duration_seconds % 60}s`,
            };
          });
          setReadings(formatted);
        }
      } catch (err) {
        console.error("Could not load history from Supabase:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);
  return (
    <section className="bg-[#050505] text-white py-24 px-6 md:px-12 lg:px-24 border-t border-white/5 relative z-10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
            <div>
              <h3 className="text-3xl md:text-5xl font-medium tracking-tight text-white/90 mb-4">
                Previous Readings
              </h3>
              <p className="text-lg text-white/50 max-w-2xl">
                // eslint-disable-next-line react/no-unescaped-entities
                Historical records of your lab's syntheses and captured reaction data over time.
              </p>
            </div>
            <button className="mt-6 md:mt-0 px-6 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-sm font-medium transition-colors">
              Export All CSV
            </button>
          </div>

          <div className="glass-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead>
                  <tr className="border-b border-white/5 text-white/40 uppercase tracking-widest text-[10px] md:text-xs">
                    <th className="px-6 py-4 font-medium">Run ID</th>
                    <th className="px-6 py-4 font-medium">Timestamp</th>
                    <th className="px-6 py-4 font-medium">Gas Spike</th>
                    <th className="px-6 py-4 font-medium">Max Temp</th>
                    <th className="px-6 py-4 font-medium">Duration</th>
                    <th className="px-6 py-4 font-medium text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {loading ? (
                    <tr>
                       <td colSpan={6} className="px-6 py-12 text-center text-white/40 border-b border-white/5">Loading historical datasets from ML Pipeline...</td>
                    </tr>
                  ) : readings.length === 0 ? (
                    <tr>
                       <td colSpan={6} className="px-6 py-12 text-center text-white/40 border-b border-white/5">No synthesis history found.</td>
                    </tr>
                  ) : (
                    readings.map((reading) => (
                      <tr key={reading.id} className="hover:bg-white/2 transition-colors cursor-pointer group">
                        <td className="px-6 py-5 font-mono text-blue-400 group-hover:text-amber-400 transition-colors">
                          {reading.id}
                        </td>
                        <td className="px-6 py-5 text-white/70">{reading.date}</td>
                        <td className="px-6 py-5 text-white/70">{reading.gasSpike}</td>
                        <td className="px-6 py-5 text-white/70">{reading.maxTemp}</td>
                        <td className="px-6 py-5 text-white/70">{reading.duration}</td>
                        <td className="px-6 py-5 text-right">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] md:text-xs font-medium border uppercase
                            ${reading.status === 'Safe' || reading.status === 'Nominal' ? 'bg-green-500/10 text-green-400 border-green-500/20' : ''}
                            ${reading.status === 'Warning' || reading.status === 'Anomalous' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : ''}
                            ${reading.status === 'Danger' || reading.status === 'Critical' ? 'bg-red-500/10 text-red-400 border-red-500/20' : ''}
                          `}>
                            {reading.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            {/* Pagination / View More */}
            <div className="px-6 py-4 border-t border-white/5 bg-white/1 flex justify-center">
               <button className="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors">
                 Load More Records ↓
               </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
