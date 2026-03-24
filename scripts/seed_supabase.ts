import { createClient } from "@supabase/supabase-js";
import { STORED_REACTIONS } from "../lib/reactions";
import * as dotenv from "dotenv";

// Load from .env.local or .env
dotenv.config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase environment variables.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function seed() {
  console.log("Seeding data to Supabase...");
  
  const { data, error } = await supabase
    .from("reactions")
    .upsert(STORED_REACTIONS)
    .select();

  if (error) {
    console.error("Error seeding data:", error.message);
  } else {
    console.log("Successfully seeded", data?.length || 0, "reactions into Supabase!");
  }
}

seed();
