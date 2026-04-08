import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL || "", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "");
async function get() {
   const { data } = await supabase.from("experiment_results").select("id, created_at").order("created_at", { ascending: false });
   console.log(data);
}
get();
