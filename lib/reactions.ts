import type { Reaction } from "./supabase";

/**
 * Seed data for 6 common chemical reactions.
 * 
 * Sensor outputs are aligned to:
 *   • MQ6  — LPG / butane / propane / combustible hydrocarbons (ppm)
 *   • MQ7  — Carbon Monoxide, CO (ppm)
 *   • DHT11 — Temperature (°C) and Humidity (%)
 *
 * In production these come from the Supabase `reactions` table.
 */
export const STORED_REACTIONS: Reaction[] = [
  {
    id: "rxn-charcoal-combustion",
    name: "Charcoal Combustion",
    formula: "C + O₂ → CO₂  (incomplete: 2C + O₂ → 2CO)",
    category: "Combustion",
    difficulty: "Beginner",
    duration_minutes: 10,
    thumbnail_color: "from-orange-500 to-red-400",
    theory:
      "Burning charcoal in limited oxygen produces CO alongside CO₂. CO levels build steadily over 4–5 minutes under a partial cover, peaking around the 5-minute mark before dropping once the lid is removed and full combustion (CO₂) resumes. DHT11 tracks the slow temperature climb from the exothermic burn. Total active monitoring is ~10 minutes.",
    chemicals: [
      "Charcoal briquette — 1 piece (~10g)",
      "Lighter/matchbox",
      "Heat-resistant container (crucible)",
      "Tongs",
    ],
    steps: [
      {
        order: 1,
        title: "Set Up Apparatus",
        description:
          "Place the crucible on a heat-resistant surface. Position MQ6, MQ7, and DHT11 sensors 10–15 cm above the crucible.",
        expected_duration_seconds: 30,
      },
      {
        order: 2,
        title: "Ignite the Charcoal",
        description:
          "Using tongs, hold the charcoal with a lighter until it glows red. Place it in the crucible.",
        expected_duration_seconds: 30,
        warning: "Ensure proper ventilation. CO is toxic — do not inhale fumes directly.",
      },
      {
        order: 3,
        title: "Partially Cover",
        description:
          "Place a heat-resistant lid partially over the crucible to restrict oxygen and promote incomplete combustion.",
        expected_duration_seconds: 10,
      },
      {
        order: 4,
        title: "Monitor Sensors (~5 min)",
        description:
          "Watch MQ7 (CO) readings rise steadily over 4–5 minutes. DHT11 shows a gradual temperature increase. Peak CO typically occurs around the 5-minute mark.",
        expected_duration_seconds: 300,
      },
      {
        order: 5,
        title: "Remove the Lid",
        description:
          "Remove the lid to allow full combustion. CO levels drop within 1–2 minutes as complete combustion (CO₂) resumes. Temperature may still rise briefly.",
        expected_duration_seconds: 120,
      },
      {
        order: 6,
        title: "Record Final Readings",
        description:
          "Wait for sensor readings to stabilise. Record peak and final values. Stop the timer.",
        expected_duration_seconds: 30,
      },
    ],
    expected_outputs: [
      { time_seconds: 0,   mq6_ppm: 5,  mq7_ppm: 2,   temp_celsius: 25, humidity: 55, label: "Start" },
      { time_seconds: 30,  mq6_ppm: 15, mq7_ppm: 40,  temp_celsius: 29, humidity: 52 },
      { time_seconds: 90,  mq6_ppm: 28, mq7_ppm: 140, temp_celsius: 35, humidity: 47 },
      { time_seconds: 180, mq6_ppm: 42, mq7_ppm: 260, temp_celsius: 42, humidity: 42 },
      { time_seconds: 300, mq6_ppm: 52, mq7_ppm: 350, temp_celsius: 50, humidity: 37, label: "Peak CO (Lid On)" },
      { time_seconds: 360, mq6_ppm: 30, mq7_ppm: 180, temp_celsius: 55, humidity: 35, label: "Lid Removed" },
      { time_seconds: 450, mq6_ppm: 14, mq7_ppm: 60,  temp_celsius: 52, humidity: 37 },
      { time_seconds: 600, mq6_ppm: 5,  mq7_ppm: 8,   temp_celsius: 38, humidity: 43, label: "End" },
    ],
  },
  {
    id: "rxn-lpg-leak-detection",
    name: "LPG Leak Simulation",
    formula: "C₃H₈ / C₄H₁₀ detection via MQ6",
    category: "Gas Detection",
    difficulty: "Beginner",
    duration_minutes: 5,
    thumbnail_color: "from-blue-500 to-cyan-400",
    theory:
      "The MQ6 sensor detects LPG (Liquefied Petroleum Gas), primarily a mixture of propane (C₃H₈) and butane (C₄H₁₀). A small, controlled release of gas inside a bell jar causes an immediate MQ6 spike. The gas diffuses quickly, and once ventilated, the sensor recovers within minutes. This simulates the rapid response of an industrial gas leak alarm.",
    chemicals: [
      "Butane lighter (as controlled LPG source)",
      "Transparent enclosure / bell jar",
      "Sensor mount (MQ6, MQ7, DHT11 positioned inside)",
    ],
    steps: [
      {
        order: 1,
        title: "Prepare Enclosure",
        description:
          "Place the sensor array inside the enclosure. Leave a small opening for gas introduction.",
        expected_duration_seconds: 30,
      },
      {
        order: 2,
        title: "Record Baseline",
        description:
          "Wait 15 seconds for sensors to stabilize. Note the baseline MQ6 reading.",
        expected_duration_seconds: 15,
      },
      {
        order: 3,
        title: "Release Gas",
        description:
          "Press the lighter gas release (without igniting) into the opening for exactly 3 seconds.",
        expected_duration_seconds: 10,
        warning: "Do NOT ignite the lighter. Keep away from all ignition sources.",
      },
      {
        order: 4,
        title: "Monitor Diffusion (~1 min)",
        description:
          "Watch the MQ6 readings spike almost immediately, peaking within 30–45 seconds. MQ7 and DHT11 remain largely stable.",
        expected_duration_seconds: 60,
      },
      {
        order: 5,
        title: "Ventilate",
        description:
          "Fully open the enclosure. The MQ6 readings will plummet within 1-2 minutes as fresh air circulates.",
        expected_duration_seconds: 120,
      },
      {
        order: 6,
        title: "Record Results",
        description:
          "Note the peak MQ6 value and recovery time. Stop the timer.",
        expected_duration_seconds: 30,
      },
    ],
    expected_outputs: [
      { time_seconds: 0,   mq6_ppm: 10,   mq7_ppm: 2, temp_celsius: 26, humidity: 50, label: "Baseline" },
      { time_seconds: 15,  mq6_ppm: 12,   mq7_ppm: 2, temp_celsius: 26, humidity: 50, label: "Gas Released" },
      { time_seconds: 25,  mq6_ppm: 550,  mq7_ppm: 4, temp_celsius: 25, humidity: 49 },
      { time_seconds: 45,  mq6_ppm: 1400, mq7_ppm: 6, temp_celsius: 25, humidity: 49, label: "Peak LPG" },
      { time_seconds: 75,  mq6_ppm: 1100, mq7_ppm: 5, temp_celsius: 25, humidity: 49, label: "Ventilating" },
      { time_seconds: 130, mq6_ppm: 300,  mq7_ppm: 3, temp_celsius: 26, humidity: 50 },
      { time_seconds: 190, mq6_ppm: 80,   mq7_ppm: 2, temp_celsius: 26, humidity: 50 },
      { time_seconds: 250, mq6_ppm: 15,   mq7_ppm: 2, temp_celsius: 26, humidity: 50, label: "Recovered" },
    ],
  },
  {
    id: "rxn-candle-jar",
    name: "Candle in a Jar (O₂ Depletion)",
    formula: "CₙH₂ₙ₊₂ + O₂ → CO₂ + H₂O + CO (limited O₂)",
    category: "Combustion",
    difficulty: "Beginner",
    duration_minutes: 5,
    thumbnail_color: "from-amber-500 to-orange-400",
    theory:
      "A burning candle inside a sealed 500ml jar consumes oxygen rapidly. Within 60–90 seconds, O₂ depletes, producing increasing levels of CO (detected by MQ7) due to incomplete combustion. The flame dies when O₂ drops below ~16%. Humidity rises significantly due to water vapour production.",
    chemicals: [
      "Tea light candle",
      "Glass jar (500ml) with lid",
      "Lighter/matchbox",
      "Sensor mount inside the jar",
    ],
    steps: [
      {
        order: 1,
        title: "Position Sensors",
        description:
          "Mount the MQ6, MQ7, and DHT11 sensors inside the jar near the top. Place the tea light at the bottom.",
        expected_duration_seconds: 30,
      },
      {
        order: 2,
        title: "Light & Seal",
        description:
          "Light the tea light, record baseline for 10 seconds, then immediately place the lid on the jar to seal it.",
        expected_duration_seconds: 15,
      },
      {
        order: 3,
        title: "Monitor Combustion (~1 min)",
        description:
          "Watch the MQ7 (CO) rise sharply. Humidity and temperature will increase. The flame will flicker and die within 60–90 seconds.",
        expected_duration_seconds: 90,
      },
      {
        order: 4,
        title: "Record Post-Extinction",
        description:
          "After the flame dies, watch for a brief smoldering peak in CO. Wait 30 seconds.",
        expected_duration_seconds: 30,
      },
      {
        order: 5,
        title: "Unseal and Record",
        description:
          "Remove the lid to let fresh air in. Watch readings drop, record final values, and stop the timer.",
        expected_duration_seconds: 60,
      },
    ],
    expected_outputs: [
      { time_seconds: 0,   mq6_ppm: 8,  mq7_ppm: 3,   temp_celsius: 24, humidity: 50, label: "Baseline" },
      { time_seconds: 15,  mq6_ppm: 10, mq7_ppm: 5,   temp_celsius: 25, humidity: 52, label: "Sealed" },
      { time_seconds: 45,  mq6_ppm: 25, mq7_ppm: 80,  temp_celsius: 32, humidity: 62 },
      { time_seconds: 75,  mq6_ppm: 50, mq7_ppm: 180, temp_celsius: 38, humidity: 68, label: "Flame Dies" },
      { time_seconds: 100, mq6_ppm: 55, mq7_ppm: 220, temp_celsius: 37, humidity: 70, label: "Peak Smolder" },
      { time_seconds: 130, mq6_ppm: 30, mq7_ppm: 140, temp_celsius: 32, humidity: 62, label: "Unsealed" },
      { time_seconds: 190, mq6_ppm: 12, mq7_ppm: 25,  temp_celsius: 26, humidity: 54 },
      { time_seconds: 240, mq6_ppm: 8,  mq7_ppm: 8,   temp_celsius: 24, humidity: 50, label: "Recovered" },
    ],
  },
  {
    id: "rxn-alcohol-evaporation",
    name: "Alcohol Evaporation & Vapour Detection",
    formula: "C₂H₅OH (liquid) → C₂H₅OH (vapour)",
    category: "Phase Change",
    difficulty: "Intermediate",
    duration_minutes: 6,
    thumbnail_color: "from-violet-500 to-purple-400",
    theory:
      "Ethanol evaporates rapidly at room temperature. The MQ6 sensor has cross-sensitivity to alcohol vapours and spikes quickly within 1-2 minutes. The evaporation is endothermic, absorbing heat and causing a distinct temperature drop on the DHT11. Total experiment time is ~6 minutes.",
    chemicals: [
      "Isopropyl Alcohol (70%) — 20ml",
      "Petri dish",
      "Transparent enclosure",
    ],
    steps: [
      {
        order: 1,
        title: "Prepare Enclosure",
        description:
          "Place the petri dish inside the enclosure with sensors mounted directly above. Note baseline readings.",
        expected_duration_seconds: 30,
      },
      {
        order: 2,
        title: "Add Alcohol & Seal",
        description:
          "Pour 20ml of alcohol into the dish and immediately seal the enclosure.",
        expected_duration_seconds: 15,
      },
      {
        order: 3,
        title: "Monitor Vapour & Temp (~2 mins)",
        description:
          "Watch the MQ6 readings climb as vapour accumulates. Note the temperature dropping on the DHT11 due to evaporative cooling.",
        expected_duration_seconds: 120,
        warning: "Alcohol vapour is flammable. No ignition sources.",
      },
      {
        order: 4,
        title: "Unseal and Observe Recovery",
        description:
          "Open the enclosure. The MQ6 readings will drop as vapours dissipate. Temperature gradually normalizes.",
        expected_duration_seconds: 90,
      },
      {
        order: 5,
        title: "Record Results",
        description:
          "Note peak MQ6, temperature trough, and recovery time. Stop timer.",
        expected_duration_seconds: 30,
      },
    ],
    expected_outputs: [
      { time_seconds: 0,   mq6_ppm: 10,  mq7_ppm: 2, temp_celsius: 25, humidity: 50, label: "Baseline" },
      { time_seconds: 20,  mq6_ppm: 180, mq7_ppm: 3, temp_celsius: 24, humidity: 48, label: "Alcohol Added" },
      { time_seconds: 60,  mq6_ppm: 550, mq7_ppm: 4, temp_celsius: 22, humidity: 45 },
      { time_seconds: 120, mq6_ppm: 820, mq7_ppm: 5, temp_celsius: 20, humidity: 42, label: "Peak Vapour" },
      { time_seconds: 160, mq6_ppm: 450, mq7_ppm: 4, temp_celsius: 21, humidity: 44, label: "Unsealed" },
      { time_seconds: 220, mq6_ppm: 150, mq7_ppm: 3, temp_celsius: 23, humidity: 47 },
      { time_seconds: 300, mq6_ppm: 25,  mq7_ppm: 2, temp_celsius: 25, humidity: 50, label: "Recovered" },
    ],
  },
  {
    id: "rxn-baking-soda-vinegar-co",
    name: "Baking Soda & Vinegar (Heat Effect)",
    formula: "NaHCO₃ + CH₃COOH → CO₂ + H₂O + NaCH₃COO",
    category: "Acid-Carbonate",
    difficulty: "Beginner",
    duration_minutes: 4,
    thumbnail_color: "from-emerald-500 to-teal-400",
    theory:
      "Baking soda reacts vigorously with vinegar to produce CO₂ and water. The key observable is the DHT11: the reaction is endothermic, causing a sharp temperature drop within the first 60 seconds. The rapid gas displacement may cause minor MQ sensor baseline shifts.",
    chemicals: [
      "Sodium Bicarbonate (baking soda) — 10g",
      "White vinegar (5% acetic acid) — 100ml",
      "Beaker (500ml)",
    ],
    steps: [
      {
        order: 1,
        title: "Set Up Sensors",
        description:
          "Position sensors directly above the beaker opening. Pour 100ml vinegar and note baseline temperature.",
        expected_duration_seconds: 30,
      },
      {
        order: 2,
        title: "Add Baking Soda",
        description:
          "Dump 10g of baking soda into the vinegar. Fizzing is immediate and intense.",
        expected_duration_seconds: 10,
        warning: "Reaction is immediate. Ensure the beaker is large enough to prevent spillover.",
      },
      {
        order: 3,
        title: "Monitor Fizzing (~1 min)",
        description:
          "Watch the DHT11: temperature drops noticeably (endothermic). The fizzing peaks and subsides within 45–60 seconds.",
        expected_duration_seconds: 60,
      },
      {
        order: 4,
        title: "Record Results",
        description:
          "Note the lowest temperature reached during the reaction. Stop the timer.",
        expected_duration_seconds: 30,
      },
    ],
    expected_outputs: [
      { time_seconds: 0,   mq6_ppm: 10, mq7_ppm: 3, temp_celsius: 24, humidity: 50, label: "Start" },
      { time_seconds: 15,  mq6_ppm: 14, mq7_ppm: 5, temp_celsius: 21, humidity: 58, label: "Fizzing" },
      { time_seconds: 30,  mq6_ppm: 18, mq7_ppm: 6, temp_celsius: 18, humidity: 65, label: "Temp Trough" },
      { time_seconds: 60,  mq6_ppm: 15, mq7_ppm: 4, temp_celsius: 19, humidity: 60, label: "Fizzing Subsides" },
      { time_seconds: 120, mq6_ppm: 10, mq7_ppm: 3, temp_celsius: 22, humidity: 52, label: "End" },
    ],
  },
  {
    id: "rxn-sugar-dehydration",
    name: "Sulfuric Acid & Sugar Dehydration",
    formula: "C₁₂H₂₂O₁₁ + H₂SO₄ → 12C + 11H₂O + CO + CO₂",
    category: "Dehydration",
    difficulty: "Advanced",
    duration_minutes: 3,
    thumbnail_color: "from-rose-500 to-pink-400",
    theory:
      "Concentrated sulfuric acid dehydrates sucrose almost instantaneously — the entire reaction, including carbon tower formation and gas overflow, occurs within 30–60 seconds of acid contact. The reaction is violently exothermic: CO, CO₂, and steam are produced within seconds, causing gas to rapidly overflow the container. The MQ7 sensor will spike sharply (CO burst), DHT11 will show a near-instant temperature jump above 80–90 °C and a humidity surge from steam. MQ6 may detect trace hydrocarbons. The active phase is over in under a minute; the remaining time is simply waiting for the carbon solid to cool.",
    chemicals: [
      "Table sugar (sucrose) — 30g",
      "Concentrated Sulfuric Acid (H₂SO₄) — 30ml",
      "Heat-resistant beaker (500ml)",
      "Fume hood (mandatory)",
      "Safety goggles and gloves",
    ],
    steps: [
      {
        order: 1,
        title: "Safety Check",
        description:
          "Ensure fume hood is ON. Wear full PPE (goggles, gloves, lab coat). Position sensors 20–30 cm above the beaker — the reaction is instantaneous and violent.",
        expected_duration_seconds: 45,
        warning: "CONCENTRATED H₂SO₄ IS EXTREMELY CORROSIVE. Toxic CO and SO₂ fumes are produced IMMEDIATELY on contact. FUME HOOD IS MANDATORY. Do not lean over the beaker at any point.",
      },
      {
        order: 2,
        title: "Add Sugar",
        description:
          "Place 30g of table sugar into the heat-resistant beaker. Start the timer now.",
        expected_duration_seconds: 10,
      },
      {
        order: 3,
        title: "Add Sulfuric Acid & Stand Back",
        description:
          "Pour 30ml of concentrated H₂SO₄ onto the sugar in one controlled motion, then immediately step back. The reaction begins within 3–5 seconds — the sugar blackens, expands, and the carbon tower rises while gas pours out within 30–45 seconds.",
        expected_duration_seconds: 10,
        warning: "Do NOT remain leaning over the beaker after pouring. The gas overflow is immediate. Step back at least 1 metre.",
      },
      {
        order: 4,
        title: "Observe (Active Phase — ~45 seconds)",
        description:
          "Watch from a safe distance. The carbon tower fully forms and the gas overflow phase is complete within 45–60 seconds. All sensor peaks occur during this window.",
        expected_duration_seconds: 60,
      },
      {
        order: 5,
        title: "Monitor Cooling",
        description:
          "After the gas stops, monitor sensor recovery for ~60 seconds. Do NOT touch the carbon — it contains residual acid and is still hot.",
        expected_duration_seconds: 60,
      },
      {
        order: 6,
        title: "Record Results",
        description:
          "Note peak sensor values and recovery times. Stop the timer. Total active experiment time should be under 3 minutes.",
        expected_duration_seconds: 20,
      },
    ],
    expected_outputs: [
      { time_seconds: 0,   mq6_ppm: 8,   mq7_ppm: 3,   temp_celsius: 24, humidity: 48, label: "Start" },
      { time_seconds: 8,   mq6_ppm: 60,  mq7_ppm: 80,  temp_celsius: 45, humidity: 58 },
      { time_seconds: 20,  mq6_ppm: 280, mq7_ppm: 380, temp_celsius: 78, humidity: 74, label: "Tower Rising" },
      { time_seconds: 35,  mq6_ppm: 520, mq7_ppm: 680, temp_celsius: 92, humidity: 84, label: "Peak — Gas Overflow" },
      { time_seconds: 55,  mq6_ppm: 380, mq7_ppm: 490, temp_celsius: 85, humidity: 80 },
      { time_seconds: 80,  mq6_ppm: 160, mq7_ppm: 210, temp_celsius: 65, humidity: 70 },
      { time_seconds: 110, mq6_ppm: 55,  mq7_ppm: 70,  temp_celsius: 45, humidity: 58 },
      { time_seconds: 150, mq6_ppm: 12,  mq7_ppm: 8,   temp_celsius: 30, humidity: 50, label: "End" },
    ],
  },
];
