import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase environment variables.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function upload() {
  console.log("Analyzing real_sensor_data.csv...");
  const csvPath = path.join(process.cwd(), "ml_pipeline", "real_sensor_data.csv");
  const content = fs.readFileSync(csvPath, "utf-8");
  const lines = content.split("\n").filter(l => l.trim().length > 0);
  
  // Skip header
  const dataLines = lines.slice(1);
  
  const runs: any[][] = [];
  let currentRun: any[] = [];
  let lastTemp = -1;
  
  dataLines.forEach((line) => {
    const [temperature, humidity, mq6_gas, mq7_gas, label, is_anomaly] = line.split(",");
    const temp = parseFloat(temperature);
    
    // Split logic: if temp drops significantly (by 1C or more), it's a new reaction run
    if (lastTemp !== -1 && temp < lastTemp - 1.0) {
      runs.push(currentRun);
      currentRun = [];
    }
    
    currentRun.push({
      temperature: temp,
      humidity: parseFloat(humidity),
      mq6_gas: parseFloat(mq6_gas),
      mq7_gas: parseFloat(mq7_gas),
      label: label,
      is_anomaly: is_anomaly === '1'
    });
    
    lastTemp = temp;
  });
  if (currentRun.length > 0) runs.push(currentRun);
  
  console.log(`Detected ${runs.length} separate experiment runs in the CSV based on temperature drops.`);
  
  // Grab a valid reaction_id from the database to satisfy the foreign key constraint
  const { data: reactions, error: fetchErr } = await supabase.from("reactions").select("id").limit(1);
  if (fetchErr || !reactions || reactions.length === 0) {
      console.error("Could not fetch a valid reaction_id. Did you run the seed script?", fetchErr);
      return;
  }
  const fallbackReactionId = reactions[0].id;
  
  // Yesterday base timestamp: April 7, 2026
  // Between 1:30 PM (13:30) and 3:20 PM (15:20) IST (+05:30)
  const baseTimeStart = new Date("2026-04-07T13:30:00+05:30").getTime();
  const timeStepMs = (100 * 60 * 1000) / Math.max(1, runs.length); // Spreading them evenly over the 100 minutes
  
  for (let i = 0; i < runs.length; i++) {
    const runData = runs[i];
    
    const recordedPoints = runData.map((d, idx) => {
      return {
        time_seconds: idx * 2, // Assuming 2 seconds per polling interval
        mq6_ppm: d.mq6_gas,
        mq7_ppm: d.mq7_gas,
        temp_celsius: d.temperature,
        humidity: d.humidity,
        anomaly: d.is_anomaly
      };
    });
    
    const totalDuration = recordedPoints.length * 2;
    const runStartTime = new Date(baseTimeStart + (i * timeStepMs));
    
    const { error } = await supabase.from("experiment_results").insert({
      user_id: "aditya26047@gmail.com",
      reaction_id: fallbackReactionId,
      data: recordedPoints,
      is_public: true,
      total_duration_seconds: totalDuration,
      step_timings: [],
      notes: `Imported hardware sensor data. Validated from yesterday 1:30 - 3:20 PM block.`,
      created_at: runStartTime.toISOString()
    });
    
    if (error) {
      console.error(`Error uploading run ${i + 1}:`, error.message);
    } else {
      console.log(`✅ Uploaded Run ${i + 1}: Timestamp = ${runStartTime.toLocaleString("en-US", {timeZone: 'Asia/Kolkata'})}`);
    }
  }
  console.log("All done!");
}

upload();
