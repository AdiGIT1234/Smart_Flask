import FlaskScrollCanvas from "@/components/FlaskScrollCanvas";
import ProblemStatementSection from "@/components/ProblemStatementSection";

export default function Home() {
  return (
    <main className="bg-[#050505] min-h-screen text-white selection:bg-violet-500/30">
      
      {/* 
        Section 1: The Hero Scroll Canvas 
        Contains the 240-frame image sequence, scroll logic, and text overlays
      */}
      <FlaskScrollCanvas />

      {/* 
        Section 2: Problem Statement / Why it matters
        A beautiful section explaining the purpose of the Smart Reaction Flask
      */}
      <ProblemStatementSection />

    </main>
  );
}
