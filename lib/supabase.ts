import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ── Database Types ──

export type Profile = {
  id: string;
  username: string;
  email: string;
  avatar_url?: string;
  created_at: string;
};

export type Reaction = {
  id: string;
  name: string;
  formula: string;
  category: string;
  theory: string;
  chemicals: string[];
  steps: ReactionStep[];
  expected_outputs: ExpectedDataPoint[];
  thumbnail_color: string; // gradient accent
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  duration_minutes: number;
};

export type ReactionStep = {
  order: number;
  title: string;
  description: string;
  expected_duration_seconds: number;
  warning?: string;
};

export type ExpectedDataPoint = {
  time_seconds: number;
  mq6_ppm: number;   // LPG / butane / propane (MQ6)
  mq7_ppm: number;   // Carbon Monoxide (MQ7)
  temp_celsius: number; // Temperature (DHT11)
  humidity: number;     // Humidity % (DHT11)
  label?: string;
};

export type RecordedDataPoint = {
  time_seconds: number;
  mq6_ppm: number;
  mq7_ppm: number;
  temp_celsius: number;
  humidity: number;
  anomaly?: boolean;
};

export type ExperimentResult = {
  id: string;
  user_id: string | null;
  reaction_id: string;
  data: RecordedDataPoint[];
  is_public: boolean;
  total_duration_seconds: number;
  step_timings: number[];
  notes?: string;
  created_at: string;
};
