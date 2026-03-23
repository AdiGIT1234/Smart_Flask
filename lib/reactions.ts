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
    duration_minutes: 15,
    thumbnail_color: "from-orange-500 to-red-400",
    theory:
      "Burning charcoal in limited oxygen produces significant carbon monoxide (CO) alongside carbon dioxide. The MQ7 sensor detects CO concentration in the surrounding air, while DHT11 tracks the temperature rise from the exothermic combustion. In a well-ventilated setup the CO levels rise sharply and then taper as the charcoal is consumed.",
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
          "Place the crucible on a heat-resistant surface. Position the MQ6, MQ7, and DHT11 sensors 10-15 cm above the crucible.",
        expected_duration_seconds: 45,
      },
      {
        order: 2,
        title: "Ignite the Charcoal",
        description:
          "Using tongs, hold the charcoal piece with a lighter until it glows red. Place it in the crucible.",
        expected_duration_seconds: 30,
        warning: "Ensure proper ventilation. CO is toxic — do not inhale fumes directly.",
      },
      {
        order: 3,
        title: "Partially Cover",
        description:
          "Place a heat-resistant lid partially over the crucible to restrict oxygen, promoting incomplete combustion and higher CO output.",
        expected_duration_seconds: 15,
      },
      {
        order: 4,
        title: "Monitor Sensors",
        description:
          "Observe the MQ7 (CO) readings rising sharply. The DHT11 should show a gradual temperature increase. MQ6 may show minor readings from trace hydrocarbons in smoke.",
        expected_duration_seconds: 300,
      },
      {
        order: 5,
        title: "Remove the Lid",
        description:
          "Remove the lid to allow full combustion. CO levels should drop as more complete combustion (CO₂) occurs.",
        expected_duration_seconds: 180,
      },
      {
        order: 6,
        title: "Record Final Readings",
        description:
          "Wait for the charcoal to burn down. Record the peak and final sensor values. Stop the timer.",
        expected_duration_seconds: 30,
      },
    ],
    expected_outputs: [
      { time_seconds: 0, mq6_ppm: 5, mq7_ppm: 2, temp_celsius: 25, humidity: 55, label: "Start" },
      { time_seconds: 30, mq6_ppm: 15, mq7_ppm: 35, temp_celsius: 28, humidity: 52 },
      { time_seconds: 75, mq6_ppm: 30, mq7_ppm: 120, temp_celsius: 34, humidity: 48 },
      { time_seconds: 150, mq6_ppm: 45, mq7_ppm: 280, temp_celsius: 42, humidity: 42, label: "Peak CO" },
      { time_seconds: 300, mq6_ppm: 50, mq7_ppm: 350, temp_celsius: 50, humidity: 38, label: "Lid On Peak" },
      { time_seconds: 420, mq6_ppm: 25, mq7_ppm: 120, temp_celsius: 55, humidity: 35, label: "Lid Off" },
      { time_seconds: 600, mq6_ppm: 10, mq7_ppm: 40, temp_celsius: 45, humidity: 40 },
      { time_seconds: 780, mq6_ppm: 5, mq7_ppm: 8, temp_celsius: 35, humidity: 45, label: "End" },
    ],
  },
  {
    id: "rxn-lpg-leak-detection",
    name: "LPG Leak Simulation",
    formula: "C₃H₈ / C₄H₁₀ detection via MQ6",
    category: "Gas Detection",
    difficulty: "Beginner",
    duration_minutes: 10,
    thumbnail_color: "from-blue-500 to-cyan-400",
    theory:
      "The MQ6 sensor is specifically designed to detect LPG (Liquefied Petroleum Gas), which is primarily a mixture of propane (C₃H₈) and butane (C₄H₁₀). This experiment simulates a controlled gas leak using a regulated LPG source (such as a lighter) and monitors the sensor response curve. This teaches students about gas diffusion rates and sensor response times.",
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
          "Place the sensor array inside the transparent enclosure. Ensure the enclosure has a small opening for gas introduction but limits diffusion.",
        expected_duration_seconds: 30,
      },
      {
        order: 2,
        title: "Record Baseline",
        description:
          "Wait 30 seconds for sensors to stabilize. Note the baseline MQ6, MQ7, and DHT11 readings.",
        expected_duration_seconds: 30,
      },
      {
        order: 3,
        title: "Release Gas",
        description:
          "Press the gas release on the butane lighter (without igniting) near the enclosure opening for 3 seconds. This introduces a small amount of LPG.",
        expected_duration_seconds: 10,
        warning: "Do NOT ignite the lighter. Keep away from all ignition sources. Work in a ventilated area.",
      },
      {
        order: 4,
        title: "Monitor Diffusion",
        description:
          "Watch the MQ6 readings spike rapidly. The MQ7 should remain largely unaffected (butane is not CO). DHT11 may show a very slight temperature drop due to gas expansion.",
        expected_duration_seconds: 120,
      },
      {
        order: 5,
        title: "Ventilate",
        description:
          "Open the enclosure to allow gas to dissipate. Observe how quickly the MQ6 readings return to baseline.",
        expected_duration_seconds: 180,
      },
      {
        order: 6,
        title: "Record Results",
        description:
          "Note the peak MQ6 value, response time, and recovery time. Stop the timer.",
        expected_duration_seconds: 30,
      },
    ],
    expected_outputs: [
      { time_seconds: 0, mq6_ppm: 10, mq7_ppm: 2, temp_celsius: 26, humidity: 50, label: "Baseline" },
      { time_seconds: 30, mq6_ppm: 12, mq7_ppm: 2, temp_celsius: 26, humidity: 50 },
      { time_seconds: 65, mq6_ppm: 450, mq7_ppm: 5, temp_celsius: 25, humidity: 50, label: "Gas Released" },
      { time_seconds: 90, mq6_ppm: 1200, mq7_ppm: 8, temp_celsius: 25, humidity: 49, label: "Peak LPG" },
      { time_seconds: 120, mq6_ppm: 900, mq7_ppm: 6, temp_celsius: 25, humidity: 49 },
      { time_seconds: 200, mq6_ppm: 500, mq7_ppm: 4, temp_celsius: 26, humidity: 50, label: "Ventilated" },
      { time_seconds: 300, mq6_ppm: 80, mq7_ppm: 3, temp_celsius: 26, humidity: 50 },
      { time_seconds: 400, mq6_ppm: 15, mq7_ppm: 2, temp_celsius: 26, humidity: 50, label: "Recovered" },
    ],
  },
  {
    id: "rxn-candle-jar",
    name: "Candle in a Jar (O₂ Depletion)",
    formula: "CₙH₂ₙ₊₂ + O₂ → CO₂ + H₂O + CO (limited O₂)",
    category: "Combustion",
    difficulty: "Beginner",
    duration_minutes: 8,
    thumbnail_color: "from-amber-500 to-orange-400",
    theory:
      "A burning candle (paraffin wax) in a sealed jar consumes oxygen and produces CO₂, water vapour, and increasingly CO as oxygen depletes. The MQ7 sensor detects the rising CO from incomplete combustion, DHT11 tracks the temperature rise and humidity increase from water vapour produced, and MQ6 picks up trace hydrocarbons from the paraffin vapour. The candle extinguishes when O₂ drops below ~16%.",
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
          "Mount the MQ6, MQ7, and DHT11 sensors inside the glass jar near the top (gases rise). Place the tea light at the bottom.",
        expected_duration_seconds: 30,
      },
      {
        order: 2,
        title: "Light the Candle",
        description:
          "Light the tea light and quickly record baseline readings before sealing.",
        expected_duration_seconds: 15,
      },
      {
        order: 3,
        title: "Seal the Jar",
        description:
          "Place the lid on the jar to seal it. The combustion now has limited oxygen.",
        expected_duration_seconds: 5,
        warning: "The jar will get warm. Handle carefully. Ensure the jar is heat-resistant glass.",
      },
      {
        order: 4,
        title: "Monitor Until Flame Dies",
        description:
          "Watch the sensors: CO (MQ7) rises as oxygen depletes, humidity increases from water vapour production, temperature rises then stabilizes. The candle will extinguish in 1-3 minutes.",
        expected_duration_seconds: 180,
      },
      {
        order: 5,
        title: "Record Post-Extinction",
        description:
          "After the flame dies, continue monitoring for 2 minutes. CO levels may continue to rise briefly from the smoldering wick. Temperature will begin to drop.",
        expected_duration_seconds: 120,
      },
      {
        order: 6,
        title: "Unseal and Record",
        description:
          "Remove the lid. Observe how quickly readings return to baseline as fresh air enters. Record final values.",
        expected_duration_seconds: 60,
      },
    ],
    expected_outputs: [
      { time_seconds: 0, mq6_ppm: 8, mq7_ppm: 3, temp_celsius: 24, humidity: 50, label: "Sealed" },
      { time_seconds: 30, mq6_ppm: 25, mq7_ppm: 15, temp_celsius: 28, humidity: 53 },
      { time_seconds: 60, mq6_ppm: 40, mq7_ppm: 60, temp_celsius: 33, humidity: 58 },
      { time_seconds: 90, mq6_ppm: 55, mq7_ppm: 130, temp_celsius: 37, humidity: 64, label: "High CO" },
      { time_seconds: 120, mq6_ppm: 60, mq7_ppm: 180, temp_celsius: 39, humidity: 68, label: "Flame Dies" },
      { time_seconds: 180, mq6_ppm: 50, mq7_ppm: 200, temp_celsius: 36, humidity: 70, label: "Peak Smolder" },
      { time_seconds: 240, mq6_ppm: 35, mq7_ppm: 150, temp_celsius: 32, humidity: 65, label: "Unsealed" },
      { time_seconds: 360, mq6_ppm: 10, mq7_ppm: 10, temp_celsius: 26, humidity: 52, label: "Recovered" },
    ],
  },
  {
    id: "rxn-alcohol-evaporation",
    name: "Alcohol Evaporation & Vapour Detection",
    formula: "C₂H₅OH (liquid) → C₂H₅OH (vapour)",
    category: "Phase Change",
    difficulty: "Intermediate",
    duration_minutes: 12,
    thumbnail_color: "from-violet-500 to-purple-400",
    theory:
      "Ethanol (rubbing alcohol) evaporates rapidly at room temperature. The MQ6 sensor has cross-sensitivity to alcohol vapours and will detect the rising concentration. As ethanol evaporates it absorbs heat (endothermic), causing the DHT11 to register a temperature drop and humidity change. This experiment demonstrates phase-change thermodynamics and sensor cross-sensitivity.",
    chemicals: [
      "Isopropyl Alcohol (70%) — 20ml",
      "Petri dish or shallow container",
      "Transparent enclosure / bell jar",
      "Dropper",
    ],
    steps: [
      {
        order: 1,
        title: "Prepare Enclosure",
        description:
          "Place the petri dish inside the enclosure. Mount sensors above the dish. Ensure the enclosure can be sealed.",
        expected_duration_seconds: 30,
      },
      {
        order: 2,
        title: "Record Baseline",
        description:
          "With the enclosure open, record baseline readings from all three sensors for 30 seconds.",
        expected_duration_seconds: 30,
      },
      {
        order: 3,
        title: "Add Alcohol",
        description:
          "Using the dropper, add 20ml of isopropyl alcohol to the petri dish.",
        expected_duration_seconds: 15,
      },
      {
        order: 4,
        title: "Seal and Monitor",
        description:
          "Seal the enclosure. Watch the MQ6 readings climb as alcohol vapour accumulates. Note the temperature drop from evaporative cooling on DHT11.",
        expected_duration_seconds: 300,
        warning: "Alcohol vapour is flammable. No ignition sources. Work in ventilated area.",
      },
      {
        order: 5,
        title: "Unseal and Observe Recovery",
        description:
          "Open the enclosure. Monitor how MQ6 readings drop as vapours dissipate. Temperature should gradually normalize.",
        expected_duration_seconds: 180,
      },
      {
        order: 6,
        title: "Record Results",
        description:
          "Note peak MQ6, temperature trough, and recovery time. Compare MQ7 readings (should be minimal). Stop timer.",
        expected_duration_seconds: 30,
      },
    ],
    expected_outputs: [
      { time_seconds: 0, mq6_ppm: 10, mq7_ppm: 2, temp_celsius: 25, humidity: 50, label: "Baseline" },
      { time_seconds: 30, mq6_ppm: 12, mq7_ppm: 2, temp_celsius: 25, humidity: 50 },
      { time_seconds: 60, mq6_ppm: 150, mq7_ppm: 4, temp_celsius: 23, humidity: 48, label: "Alcohol Added" },
      { time_seconds: 120, mq6_ppm: 400, mq7_ppm: 5, temp_celsius: 21, humidity: 45 },
      { time_seconds: 200, mq6_ppm: 650, mq7_ppm: 6, temp_celsius: 20, humidity: 43, label: "Peak Vapour" },
      { time_seconds: 350, mq6_ppm: 750, mq7_ppm: 6, temp_celsius: 19, humidity: 42, label: "Unsealed" },
      { time_seconds: 480, mq6_ppm: 200, mq7_ppm: 3, temp_celsius: 22, humidity: 47 },
      { time_seconds: 600, mq6_ppm: 20, mq7_ppm: 2, temp_celsius: 24, humidity: 49, label: "Recovered" },
    ],
  },
  {
    id: "rxn-baking-soda-vinegar-co",
    name: "Baking Soda & Vinegar (Heat Effect)",
    formula: "NaHCO₃ + CH₃COOH → CO₂ + H₂O + NaCH₃COO",
    category: "Acid-Carbonate",
    difficulty: "Beginner",
    duration_minutes: 8,
    thumbnail_color: "from-emerald-500 to-teal-400",
    theory:
      "Sodium bicarbonate reacts with acetic acid (vinegar) producing CO₂, water, and sodium acetate. While the MQ sensors don't directly detect CO₂, the rapid gas displacement affects their baseline readings slightly. The key observable is the DHT11: the reaction is endothermic (absorbs heat), causing a measurable temperature drop. Humidity rises from water vapour. This demonstrates endothermic reactions and gas displacement effects.",
    chemicals: [
      "Sodium Bicarbonate (baking soda) — 10g",
      "White vinegar (5% acetic acid) — 100ml",
      "Beaker (500ml)",
      "Enclosure for sensors",
    ],
    steps: [
      {
        order: 1,
        title: "Set Up Sensors",
        description:
          "Place the beaker inside the enclosure. Position all three sensors above the beaker opening.",
        expected_duration_seconds: 20,
      },
      {
        order: 2,
        title: "Add Vinegar",
        description:
          "Pour 100ml of white vinegar into the beaker. Record initial temperature.",
        expected_duration_seconds: 15,
      },
      {
        order: 3,
        title: "Add Baking Soda",
        description:
          "Quickly add 10g of baking soda to the vinegar. Observe immediate vigorous fizzing.",
        expected_duration_seconds: 10,
        warning: "Reaction is immediate and vigorous. CO₂ will overflow if container is too small.",
      },
      {
        order: 4,
        title: "Monitor Reaction",
        description:
          "Watch DHT11: temperature should DROP (endothermic). Humidity increases. MQ6/MQ7 may show slight baseline shifts from CO₂ displacing air. The fizzing peaks in 30-60 seconds.",
        expected_duration_seconds: 180,
      },
      {
        order: 5,
        title: "Record Results",
        description:
          "Note the temperature drop magnitude, humidity peak, and any gas sensor shifts. Stop the timer.",
        expected_duration_seconds: 30,
      },
    ],
    expected_outputs: [
      { time_seconds: 0, mq6_ppm: 10, mq7_ppm: 3, temp_celsius: 24, humidity: 50, label: "Start" },
      { time_seconds: 25, mq6_ppm: 18, mq7_ppm: 5, temp_celsius: 22, humidity: 55, label: "Fizzing" },
      { time_seconds: 60, mq6_ppm: 25, mq7_ppm: 8, temp_celsius: 19, humidity: 62, label: "Peak Fizz" },
      { time_seconds: 120, mq6_ppm: 20, mq7_ppm: 6, temp_celsius: 18, humidity: 65, label: "Temp Trough" },
      { time_seconds: 180, mq6_ppm: 15, mq7_ppm: 4, temp_celsius: 20, humidity: 60 },
      { time_seconds: 255, mq6_ppm: 12, mq7_ppm: 3, temp_celsius: 22, humidity: 55, label: "End" },
    ],
  },
  {
    id: "rxn-sugar-dehydration",
    name: "Sulfuric Acid & Sugar Dehydration",
    formula: "C₁₂H₂₂O₁₁ + H₂SO₄ → 12C + 11H₂O + CO + CO₂",
    category: "Dehydration",
    difficulty: "Advanced",
    duration_minutes: 20,
    thumbnail_color: "from-rose-500 to-pink-400",
    theory:
      "Concentrated sulfuric acid dehydrates sucrose (table sugar), stripping out water molecules and leaving behind a carbon tower (the famous \"sugar snake\"). The reaction is highly exothermic and produces CO, CO₂, and steam. The MQ7 sensor detects significant CO levels, DHT11 shows a dramatic temperature spike and humidity surge from steam, and MQ6 may detect trace hydrocarbons from partial decomposition.",
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
          "Ensure fume hood is ON. Wear full PPE (goggles, gloves, lab coat). Position sensors at a safe distance (30 cm+) above the beaker.",
        expected_duration_seconds: 60,
        warning: "CONCENTRATED H₂SO₄ IS EXTREMELY CORROSIVE. This reaction generates toxic fumes. FUME HOOD IS MANDATORY.",
      },
      {
        order: 2,
        title: "Add Sugar",
        description:
          "Place 30g of table sugar into the heat-resistant beaker.",
        expected_duration_seconds: 15,
      },
      {
        order: 3,
        title: "Add Sulfuric Acid",
        description:
          "Slowly pour 30ml of concentrated H₂SO₄ onto the sugar. The reaction begins within seconds — the sugar darkens and a carbon column begins to rise.",
        expected_duration_seconds: 15,
        warning: "Do NOT touch the beaker. The reaction is violently exothermic. Stand back after pouring.",
      },
      {
        order: 4,
        title: "Observe Carbon Tower",
        description:
          "Watch the carbon 'snake' rise. Monitor all sensors: MQ7 will spike (CO from decomposition), DHT11 shows a massive temp and humidity spike, MQ6 picks up hydrocarbons.",
        expected_duration_seconds: 300,
      },
      {
        order: 5,
        title: "Monitor Cooling",
        description:
          "After the reaction peaks, continue monitoring as the carbon tower cools. Readings should gradually normalize. Do NOT touch the carbon — it contains residual acid.",
        expected_duration_seconds: 600,
      },
      {
        order: 6,
        title: "Record Results",
        description:
          "Note peak values for all sensors. Record sensor recovery times. Stop the timer.",
        expected_duration_seconds: 30,
      },
    ],
    expected_outputs: [
      { time_seconds: 0, mq6_ppm: 8, mq7_ppm: 3, temp_celsius: 24, humidity: 48, label: "Start" },
      { time_seconds: 30, mq6_ppm: 80, mq7_ppm: 60, temp_celsius: 40, humidity: 55 },
      { time_seconds: 60, mq6_ppm: 200, mq7_ppm: 250, temp_celsius: 65, humidity: 72, label: "Tower Rising" },
      { time_seconds: 120, mq6_ppm: 350, mq7_ppm: 500, temp_celsius: 85, humidity: 82, label: "Peak" },
      { time_seconds: 200, mq6_ppm: 280, mq7_ppm: 380, temp_celsius: 75, humidity: 78 },
      { time_seconds: 400, mq6_ppm: 120, mq7_ppm: 150, temp_celsius: 55, humidity: 65 },
      { time_seconds: 700, mq6_ppm: 40, mq7_ppm: 50, temp_celsius: 38, humidity: 55 },
      { time_seconds: 1000, mq6_ppm: 12, mq7_ppm: 8, temp_celsius: 28, humidity: 50, label: "End" },
    ],
  },
];
