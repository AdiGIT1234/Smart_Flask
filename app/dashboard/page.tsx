import DashboardSection from "@/components/DashboardSection";
import PreviousReadingsSection from "@/components/PreviousReadingsSection";

export default function DashboardPage() {
  return (
    <main className="bg-[#050505] min-h-screen text-white pt-24 selection:bg-violet-500/30">
      <div className="px-6 md:px-12 lg:px-24 mb-12">
        <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-white/90">
          Live Syntheses <span className="text-blue-500 font-bold ml-3 mt-1 inline-block w-3 h-3 rounded-full glow-blue" />
        </h1>
        <p className="text-white/50 text-lg mt-2">
          Monitor your active chemical reactions in real-time.
        </p>
      </div>
      
      {/* 
        Section 2: The Dashboard
      */}
      <DashboardSection />

      {/* 
        Section 3: Previous Readings
      */}
      <PreviousReadingsSection />
    </main>
  );
}
