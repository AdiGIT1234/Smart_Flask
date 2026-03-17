/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable react/no-unescaped-entities */
"use client";

import { motion } from "framer-motion";

const PREVIOUS_READINGS = [
  {
    id: "SYN-8921",
    date: "Oct 12, 14:32",
    gasSpike: "412 ppm",
    maxTemp: "145°C",
    status: "Anomalous",
    duration: "45m 12s",
  },
  {
    id: "SYN-8920",
    date: "Oct 12, 11:15",
    gasSpike: "105 ppm",
    maxTemp: "98°C",
    status: "Nominal",
    duration: "1h 05m",
  },
  {
    id: "SYN-8919",
    date: "Oct 11, 16:45",
    gasSpike: "89 ppm",
    maxTemp: "95°C",
    status: "Nominal",
    duration: "58m 30s",
  },
  {
    id: "SYN-8918",
    date: "Oct 11, 09:20",
    gasSpike: "840 ppm",
    maxTemp: "180°C",
    status: "Critical",
    duration: "12m 04s (Halted)",
  },
];

export default function PreviousReadingsSection() {
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
                  {PREVIOUS_READINGS.map((reading) => (
                    <tr key={reading.id} className="hover:bg-white/2 transition-colors cursor-pointer group">
                      <td className="px-6 py-5 font-mono text-blue-400 group-hover:text-amber-400 transition-colors">
                        {reading.id}
                      </td>
                      <td className="px-6 py-5 text-white/70">{reading.date}</td>
                      <td className="px-6 py-5 text-white/70">{reading.gasSpike}</td>
                      <td className="px-6 py-5 text-white/70">{reading.maxTemp}</td>
                      <td className="px-6 py-5 text-white/70">{reading.duration}</td>
                      <td className="px-6 py-5 text-right">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] md:text-xs font-medium border
                          ${reading.status === 'Nominal' ? 'bg-green-500/10 text-green-400 border-green-500/20' : ''}
                          ${reading.status === 'Anomalous' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : ''}
                          ${reading.status === 'Critical' ? 'bg-red-500/10 text-red-400 border-red-500/20' : ''}
                        `}>
                          {reading.status}
                        </span>
                      </td>
                    </tr>
                  ))}
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
