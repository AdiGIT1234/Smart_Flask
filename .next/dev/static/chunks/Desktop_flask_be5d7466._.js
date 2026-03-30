(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Desktop/flask/lib/reactions.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "STORED_REACTIONS",
    ()=>STORED_REACTIONS
]);
const STORED_REACTIONS = [
    {
        id: "rxn-charcoal-combustion",
        name: "Charcoal Combustion",
        formula: "C + O₂ → CO₂  (incomplete: 2C + O₂ → 2CO)",
        category: "Combustion",
        difficulty: "Beginner",
        duration_minutes: 15,
        thumbnail_color: "from-orange-500 to-red-400",
        theory: "Burning charcoal in limited oxygen produces significant carbon monoxide (CO) alongside carbon dioxide. The MQ7 sensor detects CO concentration in the surrounding air, while DHT11 tracks the temperature rise from the exothermic combustion. In a well-ventilated setup the CO levels rise sharply and then taper as the charcoal is consumed.",
        chemicals: [
            "Charcoal briquette — 1 piece (~10g)",
            "Lighter/matchbox",
            "Heat-resistant container (crucible)",
            "Tongs"
        ],
        steps: [
            {
                order: 1,
                title: "Set Up Apparatus",
                description: "Place the crucible on a heat-resistant surface. Position the MQ6, MQ7, and DHT11 sensors 10-15 cm above the crucible.",
                expected_duration_seconds: 45
            },
            {
                order: 2,
                title: "Ignite the Charcoal",
                description: "Using tongs, hold the charcoal piece with a lighter until it glows red. Place it in the crucible.",
                expected_duration_seconds: 30,
                warning: "Ensure proper ventilation. CO is toxic — do not inhale fumes directly."
            },
            {
                order: 3,
                title: "Partially Cover",
                description: "Place a heat-resistant lid partially over the crucible to restrict oxygen, promoting incomplete combustion and higher CO output.",
                expected_duration_seconds: 15
            },
            {
                order: 4,
                title: "Monitor Sensors",
                description: "Observe the MQ7 (CO) readings rising sharply. The DHT11 should show a gradual temperature increase. MQ6 may show minor readings from trace hydrocarbons in smoke.",
                expected_duration_seconds: 300
            },
            {
                order: 5,
                title: "Remove the Lid",
                description: "Remove the lid to allow full combustion. CO levels should drop as more complete combustion (CO₂) occurs.",
                expected_duration_seconds: 180
            },
            {
                order: 6,
                title: "Record Final Readings",
                description: "Wait for the charcoal to burn down. Record the peak and final sensor values. Stop the timer.",
                expected_duration_seconds: 30
            }
        ],
        expected_outputs: [
            {
                time_seconds: 0,
                mq6_ppm: 5,
                mq7_ppm: 2,
                temp_celsius: 25,
                humidity: 55,
                label: "Start"
            },
            {
                time_seconds: 30,
                mq6_ppm: 15,
                mq7_ppm: 35,
                temp_celsius: 28,
                humidity: 52
            },
            {
                time_seconds: 75,
                mq6_ppm: 30,
                mq7_ppm: 120,
                temp_celsius: 34,
                humidity: 48
            },
            {
                time_seconds: 150,
                mq6_ppm: 45,
                mq7_ppm: 280,
                temp_celsius: 42,
                humidity: 42,
                label: "Peak CO"
            },
            {
                time_seconds: 300,
                mq6_ppm: 50,
                mq7_ppm: 350,
                temp_celsius: 50,
                humidity: 38,
                label: "Lid On Peak"
            },
            {
                time_seconds: 420,
                mq6_ppm: 25,
                mq7_ppm: 120,
                temp_celsius: 55,
                humidity: 35,
                label: "Lid Off"
            },
            {
                time_seconds: 600,
                mq6_ppm: 10,
                mq7_ppm: 40,
                temp_celsius: 45,
                humidity: 40
            },
            {
                time_seconds: 780,
                mq6_ppm: 5,
                mq7_ppm: 8,
                temp_celsius: 35,
                humidity: 45,
                label: "End"
            }
        ]
    },
    {
        id: "rxn-lpg-leak-detection",
        name: "LPG Leak Simulation",
        formula: "C₃H₈ / C₄H₁₀ detection via MQ6",
        category: "Gas Detection",
        difficulty: "Beginner",
        duration_minutes: 10,
        thumbnail_color: "from-blue-500 to-cyan-400",
        theory: "The MQ6 sensor is specifically designed to detect LPG (Liquefied Petroleum Gas), which is primarily a mixture of propane (C₃H₈) and butane (C₄H₁₀). This experiment simulates a controlled gas leak using a regulated LPG source (such as a lighter) and monitors the sensor response curve. This teaches students about gas diffusion rates and sensor response times.",
        chemicals: [
            "Butane lighter (as controlled LPG source)",
            "Transparent enclosure / bell jar",
            "Sensor mount (MQ6, MQ7, DHT11 positioned inside)"
        ],
        steps: [
            {
                order: 1,
                title: "Prepare Enclosure",
                description: "Place the sensor array inside the transparent enclosure. Ensure the enclosure has a small opening for gas introduction but limits diffusion.",
                expected_duration_seconds: 30
            },
            {
                order: 2,
                title: "Record Baseline",
                description: "Wait 30 seconds for sensors to stabilize. Note the baseline MQ6, MQ7, and DHT11 readings.",
                expected_duration_seconds: 30
            },
            {
                order: 3,
                title: "Release Gas",
                description: "Press the gas release on the butane lighter (without igniting) near the enclosure opening for 3 seconds. This introduces a small amount of LPG.",
                expected_duration_seconds: 10,
                warning: "Do NOT ignite the lighter. Keep away from all ignition sources. Work in a ventilated area."
            },
            {
                order: 4,
                title: "Monitor Diffusion",
                description: "Watch the MQ6 readings spike rapidly. The MQ7 should remain largely unaffected (butane is not CO). DHT11 may show a very slight temperature drop due to gas expansion.",
                expected_duration_seconds: 120
            },
            {
                order: 5,
                title: "Ventilate",
                description: "Open the enclosure to allow gas to dissipate. Observe how quickly the MQ6 readings return to baseline.",
                expected_duration_seconds: 180
            },
            {
                order: 6,
                title: "Record Results",
                description: "Note the peak MQ6 value, response time, and recovery time. Stop the timer.",
                expected_duration_seconds: 30
            }
        ],
        expected_outputs: [
            {
                time_seconds: 0,
                mq6_ppm: 10,
                mq7_ppm: 2,
                temp_celsius: 26,
                humidity: 50,
                label: "Baseline"
            },
            {
                time_seconds: 30,
                mq6_ppm: 12,
                mq7_ppm: 2,
                temp_celsius: 26,
                humidity: 50
            },
            {
                time_seconds: 65,
                mq6_ppm: 450,
                mq7_ppm: 5,
                temp_celsius: 25,
                humidity: 50,
                label: "Gas Released"
            },
            {
                time_seconds: 90,
                mq6_ppm: 1200,
                mq7_ppm: 8,
                temp_celsius: 25,
                humidity: 49,
                label: "Peak LPG"
            },
            {
                time_seconds: 120,
                mq6_ppm: 900,
                mq7_ppm: 6,
                temp_celsius: 25,
                humidity: 49
            },
            {
                time_seconds: 200,
                mq6_ppm: 500,
                mq7_ppm: 4,
                temp_celsius: 26,
                humidity: 50,
                label: "Ventilated"
            },
            {
                time_seconds: 300,
                mq6_ppm: 80,
                mq7_ppm: 3,
                temp_celsius: 26,
                humidity: 50
            },
            {
                time_seconds: 400,
                mq6_ppm: 15,
                mq7_ppm: 2,
                temp_celsius: 26,
                humidity: 50,
                label: "Recovered"
            }
        ]
    },
    {
        id: "rxn-candle-jar",
        name: "Candle in a Jar (O₂ Depletion)",
        formula: "CₙH₂ₙ₊₂ + O₂ → CO₂ + H₂O + CO (limited O₂)",
        category: "Combustion",
        difficulty: "Beginner",
        duration_minutes: 8,
        thumbnail_color: "from-amber-500 to-orange-400",
        theory: "A burning candle (paraffin wax) in a sealed jar consumes oxygen and produces CO₂, water vapour, and increasingly CO as oxygen depletes. The MQ7 sensor detects the rising CO from incomplete combustion, DHT11 tracks the temperature rise and humidity increase from water vapour produced, and MQ6 picks up trace hydrocarbons from the paraffin vapour. The candle extinguishes when O₂ drops below ~16%.",
        chemicals: [
            "Tea light candle",
            "Glass jar (500ml) with lid",
            "Lighter/matchbox",
            "Sensor mount inside the jar"
        ],
        steps: [
            {
                order: 1,
                title: "Position Sensors",
                description: "Mount the MQ6, MQ7, and DHT11 sensors inside the glass jar near the top (gases rise). Place the tea light at the bottom.",
                expected_duration_seconds: 30
            },
            {
                order: 2,
                title: "Light the Candle",
                description: "Light the tea light and quickly record baseline readings before sealing.",
                expected_duration_seconds: 15
            },
            {
                order: 3,
                title: "Seal the Jar",
                description: "Place the lid on the jar to seal it. The combustion now has limited oxygen.",
                expected_duration_seconds: 5,
                warning: "The jar will get warm. Handle carefully. Ensure the jar is heat-resistant glass."
            },
            {
                order: 4,
                title: "Monitor Until Flame Dies",
                description: "Watch the sensors: CO (MQ7) rises as oxygen depletes, humidity increases from water vapour production, temperature rises then stabilizes. The candle will extinguish in 1-3 minutes.",
                expected_duration_seconds: 180
            },
            {
                order: 5,
                title: "Record Post-Extinction",
                description: "After the flame dies, continue monitoring for 2 minutes. CO levels may continue to rise briefly from the smoldering wick. Temperature will begin to drop.",
                expected_duration_seconds: 120
            },
            {
                order: 6,
                title: "Unseal and Record",
                description: "Remove the lid. Observe how quickly readings return to baseline as fresh air enters. Record final values.",
                expected_duration_seconds: 60
            }
        ],
        expected_outputs: [
            {
                time_seconds: 0,
                mq6_ppm: 8,
                mq7_ppm: 3,
                temp_celsius: 24,
                humidity: 50,
                label: "Sealed"
            },
            {
                time_seconds: 30,
                mq6_ppm: 25,
                mq7_ppm: 15,
                temp_celsius: 28,
                humidity: 53
            },
            {
                time_seconds: 60,
                mq6_ppm: 40,
                mq7_ppm: 60,
                temp_celsius: 33,
                humidity: 58
            },
            {
                time_seconds: 90,
                mq6_ppm: 55,
                mq7_ppm: 130,
                temp_celsius: 37,
                humidity: 64,
                label: "High CO"
            },
            {
                time_seconds: 120,
                mq6_ppm: 60,
                mq7_ppm: 180,
                temp_celsius: 39,
                humidity: 68,
                label: "Flame Dies"
            },
            {
                time_seconds: 180,
                mq6_ppm: 50,
                mq7_ppm: 200,
                temp_celsius: 36,
                humidity: 70,
                label: "Peak Smolder"
            },
            {
                time_seconds: 240,
                mq6_ppm: 35,
                mq7_ppm: 150,
                temp_celsius: 32,
                humidity: 65,
                label: "Unsealed"
            },
            {
                time_seconds: 360,
                mq6_ppm: 10,
                mq7_ppm: 10,
                temp_celsius: 26,
                humidity: 52,
                label: "Recovered"
            }
        ]
    },
    {
        id: "rxn-alcohol-evaporation",
        name: "Alcohol Evaporation & Vapour Detection",
        formula: "C₂H₅OH (liquid) → C₂H₅OH (vapour)",
        category: "Phase Change",
        difficulty: "Intermediate",
        duration_minutes: 12,
        thumbnail_color: "from-violet-500 to-purple-400",
        theory: "Ethanol (rubbing alcohol) evaporates rapidly at room temperature. The MQ6 sensor has cross-sensitivity to alcohol vapours and will detect the rising concentration. As ethanol evaporates it absorbs heat (endothermic), causing the DHT11 to register a temperature drop and humidity change. This experiment demonstrates phase-change thermodynamics and sensor cross-sensitivity.",
        chemicals: [
            "Isopropyl Alcohol (70%) — 20ml",
            "Petri dish or shallow container",
            "Transparent enclosure / bell jar",
            "Dropper"
        ],
        steps: [
            {
                order: 1,
                title: "Prepare Enclosure",
                description: "Place the petri dish inside the enclosure. Mount sensors above the dish. Ensure the enclosure can be sealed.",
                expected_duration_seconds: 30
            },
            {
                order: 2,
                title: "Record Baseline",
                description: "With the enclosure open, record baseline readings from all three sensors for 30 seconds.",
                expected_duration_seconds: 30
            },
            {
                order: 3,
                title: "Add Alcohol",
                description: "Using the dropper, add 20ml of isopropyl alcohol to the petri dish.",
                expected_duration_seconds: 15
            },
            {
                order: 4,
                title: "Seal and Monitor",
                description: "Seal the enclosure. Watch the MQ6 readings climb as alcohol vapour accumulates. Note the temperature drop from evaporative cooling on DHT11.",
                expected_duration_seconds: 300,
                warning: "Alcohol vapour is flammable. No ignition sources. Work in ventilated area."
            },
            {
                order: 5,
                title: "Unseal and Observe Recovery",
                description: "Open the enclosure. Monitor how MQ6 readings drop as vapours dissipate. Temperature should gradually normalize.",
                expected_duration_seconds: 180
            },
            {
                order: 6,
                title: "Record Results",
                description: "Note peak MQ6, temperature trough, and recovery time. Compare MQ7 readings (should be minimal). Stop timer.",
                expected_duration_seconds: 30
            }
        ],
        expected_outputs: [
            {
                time_seconds: 0,
                mq6_ppm: 10,
                mq7_ppm: 2,
                temp_celsius: 25,
                humidity: 50,
                label: "Baseline"
            },
            {
                time_seconds: 30,
                mq6_ppm: 12,
                mq7_ppm: 2,
                temp_celsius: 25,
                humidity: 50
            },
            {
                time_seconds: 60,
                mq6_ppm: 150,
                mq7_ppm: 4,
                temp_celsius: 23,
                humidity: 48,
                label: "Alcohol Added"
            },
            {
                time_seconds: 120,
                mq6_ppm: 400,
                mq7_ppm: 5,
                temp_celsius: 21,
                humidity: 45
            },
            {
                time_seconds: 200,
                mq6_ppm: 650,
                mq7_ppm: 6,
                temp_celsius: 20,
                humidity: 43,
                label: "Peak Vapour"
            },
            {
                time_seconds: 350,
                mq6_ppm: 750,
                mq7_ppm: 6,
                temp_celsius: 19,
                humidity: 42,
                label: "Unsealed"
            },
            {
                time_seconds: 480,
                mq6_ppm: 200,
                mq7_ppm: 3,
                temp_celsius: 22,
                humidity: 47
            },
            {
                time_seconds: 600,
                mq6_ppm: 20,
                mq7_ppm: 2,
                temp_celsius: 24,
                humidity: 49,
                label: "Recovered"
            }
        ]
    },
    {
        id: "rxn-baking-soda-vinegar-co",
        name: "Baking Soda & Vinegar (Heat Effect)",
        formula: "NaHCO₃ + CH₃COOH → CO₂ + H₂O + NaCH₃COO",
        category: "Acid-Carbonate",
        difficulty: "Beginner",
        duration_minutes: 8,
        thumbnail_color: "from-emerald-500 to-teal-400",
        theory: "Sodium bicarbonate reacts with acetic acid (vinegar) producing CO₂, water, and sodium acetate. While the MQ sensors don't directly detect CO₂, the rapid gas displacement affects their baseline readings slightly. The key observable is the DHT11: the reaction is endothermic (absorbs heat), causing a measurable temperature drop. Humidity rises from water vapour. This demonstrates endothermic reactions and gas displacement effects.",
        chemicals: [
            "Sodium Bicarbonate (baking soda) — 10g",
            "White vinegar (5% acetic acid) — 100ml",
            "Beaker (500ml)",
            "Enclosure for sensors"
        ],
        steps: [
            {
                order: 1,
                title: "Set Up Sensors",
                description: "Place the beaker inside the enclosure. Position all three sensors above the beaker opening.",
                expected_duration_seconds: 20
            },
            {
                order: 2,
                title: "Add Vinegar",
                description: "Pour 100ml of white vinegar into the beaker. Record initial temperature.",
                expected_duration_seconds: 15
            },
            {
                order: 3,
                title: "Add Baking Soda",
                description: "Quickly add 10g of baking soda to the vinegar. Observe immediate vigorous fizzing.",
                expected_duration_seconds: 10,
                warning: "Reaction is immediate and vigorous. CO₂ will overflow if container is too small."
            },
            {
                order: 4,
                title: "Monitor Reaction",
                description: "Watch DHT11: temperature should DROP (endothermic). Humidity increases. MQ6/MQ7 may show slight baseline shifts from CO₂ displacing air. The fizzing peaks in 30-60 seconds.",
                expected_duration_seconds: 180
            },
            {
                order: 5,
                title: "Record Results",
                description: "Note the temperature drop magnitude, humidity peak, and any gas sensor shifts. Stop the timer.",
                expected_duration_seconds: 30
            }
        ],
        expected_outputs: [
            {
                time_seconds: 0,
                mq6_ppm: 10,
                mq7_ppm: 3,
                temp_celsius: 24,
                humidity: 50,
                label: "Start"
            },
            {
                time_seconds: 25,
                mq6_ppm: 18,
                mq7_ppm: 5,
                temp_celsius: 22,
                humidity: 55,
                label: "Fizzing"
            },
            {
                time_seconds: 60,
                mq6_ppm: 25,
                mq7_ppm: 8,
                temp_celsius: 19,
                humidity: 62,
                label: "Peak Fizz"
            },
            {
                time_seconds: 120,
                mq6_ppm: 20,
                mq7_ppm: 6,
                temp_celsius: 18,
                humidity: 65,
                label: "Temp Trough"
            },
            {
                time_seconds: 180,
                mq6_ppm: 15,
                mq7_ppm: 4,
                temp_celsius: 20,
                humidity: 60
            },
            {
                time_seconds: 255,
                mq6_ppm: 12,
                mq7_ppm: 3,
                temp_celsius: 22,
                humidity: 55,
                label: "End"
            }
        ]
    },
    {
        id: "rxn-sugar-dehydration",
        name: "Sulfuric Acid & Sugar Dehydration",
        formula: "C₁₂H₂₂O₁₁ + H₂SO₄ → 12C + 11H₂O + CO + CO₂",
        category: "Dehydration",
        difficulty: "Advanced",
        duration_minutes: 20,
        thumbnail_color: "from-rose-500 to-pink-400",
        theory: "Concentrated sulfuric acid dehydrates sucrose (table sugar), stripping out water molecules and leaving behind a carbon tower (the famous \"sugar snake\"). The reaction is highly exothermic and produces CO, CO₂, and steam. The MQ7 sensor detects significant CO levels, DHT11 shows a dramatic temperature spike and humidity surge from steam, and MQ6 may detect trace hydrocarbons from partial decomposition.",
        chemicals: [
            "Table sugar (sucrose) — 30g",
            "Concentrated Sulfuric Acid (H₂SO₄) — 30ml",
            "Heat-resistant beaker (500ml)",
            "Fume hood (mandatory)",
            "Safety goggles and gloves"
        ],
        steps: [
            {
                order: 1,
                title: "Safety Check",
                description: "Ensure fume hood is ON. Wear full PPE (goggles, gloves, lab coat). Position sensors at a safe distance (30 cm+) above the beaker.",
                expected_duration_seconds: 60,
                warning: "CONCENTRATED H₂SO₄ IS EXTREMELY CORROSIVE. This reaction generates toxic fumes. FUME HOOD IS MANDATORY."
            },
            {
                order: 2,
                title: "Add Sugar",
                description: "Place 30g of table sugar into the heat-resistant beaker.",
                expected_duration_seconds: 15
            },
            {
                order: 3,
                title: "Add Sulfuric Acid",
                description: "Slowly pour 30ml of concentrated H₂SO₄ onto the sugar. The reaction begins within seconds — the sugar darkens and a carbon column begins to rise.",
                expected_duration_seconds: 15,
                warning: "Do NOT touch the beaker. The reaction is violently exothermic. Stand back after pouring."
            },
            {
                order: 4,
                title: "Observe Carbon Tower",
                description: "Watch the carbon 'snake' rise. Monitor all sensors: MQ7 will spike (CO from decomposition), DHT11 shows a massive temp and humidity spike, MQ6 picks up hydrocarbons.",
                expected_duration_seconds: 300
            },
            {
                order: 5,
                title: "Monitor Cooling",
                description: "After the reaction peaks, continue monitoring as the carbon tower cools. Readings should gradually normalize. Do NOT touch the carbon — it contains residual acid.",
                expected_duration_seconds: 600
            },
            {
                order: 6,
                title: "Record Results",
                description: "Note peak values for all sensors. Record sensor recovery times. Stop the timer.",
                expected_duration_seconds: 30
            }
        ],
        expected_outputs: [
            {
                time_seconds: 0,
                mq6_ppm: 8,
                mq7_ppm: 3,
                temp_celsius: 24,
                humidity: 48,
                label: "Start"
            },
            {
                time_seconds: 30,
                mq6_ppm: 80,
                mq7_ppm: 60,
                temp_celsius: 40,
                humidity: 55
            },
            {
                time_seconds: 60,
                mq6_ppm: 200,
                mq7_ppm: 250,
                temp_celsius: 65,
                humidity: 72,
                label: "Tower Rising"
            },
            {
                time_seconds: 120,
                mq6_ppm: 350,
                mq7_ppm: 500,
                temp_celsius: 85,
                humidity: 82,
                label: "Peak"
            },
            {
                time_seconds: 200,
                mq6_ppm: 280,
                mq7_ppm: 380,
                temp_celsius: 75,
                humidity: 78
            },
            {
                time_seconds: 400,
                mq6_ppm: 120,
                mq7_ppm: 150,
                temp_celsius: 55,
                humidity: 65
            },
            {
                time_seconds: 700,
                mq6_ppm: 40,
                mq7_ppm: 50,
                temp_celsius: 38,
                humidity: 55
            },
            {
                time_seconds: 1000,
                mq6_ppm: 12,
                mq7_ppm: 8,
                temp_celsius: 28,
                humidity: 50,
                label: "End"
            }
        ]
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/flask/components/Stopwatch.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Stopwatch
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/flask/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/flask/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
function Stopwatch({ onLap, onStop, onStart, running: externalRunning }) {
    _s();
    const [time, setTime] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0); // milliseconds
    const [isRunning, setIsRunning] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [laps, setLaps] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const intervalRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const startTimeRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const accumulatedRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    // Sync with external running state
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Stopwatch.useEffect": ()=>{
            if (externalRunning !== undefined) {
                if (externalRunning && !isRunning) {
                    handleStart();
                } else if (!externalRunning && isRunning) {
                    handleStop();
                }
            }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }["Stopwatch.useEffect"], [
        externalRunning
    ]);
    const handleStart = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "Stopwatch.useCallback[handleStart]": ()=>{
            if (isRunning) return;
            setIsRunning(true);
            startTimeRef.current = Date.now();
            intervalRef.current = setInterval({
                "Stopwatch.useCallback[handleStart]": ()=>{
                    setTime(accumulatedRef.current + (Date.now() - startTimeRef.current));
                }
            }["Stopwatch.useCallback[handleStart]"], 16); // ~60fps
            onStart?.();
        }
    }["Stopwatch.useCallback[handleStart]"], [
        isRunning,
        onStart
    ]);
    const handleStop = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "Stopwatch.useCallback[handleStop]": ()=>{
            if (!isRunning) return;
            setIsRunning(false);
            accumulatedRef.current += Date.now() - startTimeRef.current;
            if (intervalRef.current) clearInterval(intervalRef.current);
            onStop?.(time);
        }
    }["Stopwatch.useCallback[handleStop]"], [
        isRunning,
        onStop,
        time
    ]);
    const handleLap = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "Stopwatch.useCallback[handleLap]": ()=>{
            if (!isRunning) return;
            setLaps({
                "Stopwatch.useCallback[handleLap]": (prev)=>[
                        ...prev,
                        time
                    ]
            }["Stopwatch.useCallback[handleLap]"]);
            onLap?.(time);
        }
    }["Stopwatch.useCallback[handleLap]"], [
        isRunning,
        time,
        onLap
    ]);
    const handleReset = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "Stopwatch.useCallback[handleReset]": ()=>{
            setIsRunning(false);
            setTime(0);
            setLaps([]);
            accumulatedRef.current = 0;
            if (intervalRef.current) clearInterval(intervalRef.current);
        }
    }["Stopwatch.useCallback[handleReset]"], []);
    // Cleanup
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Stopwatch.useEffect": ()=>{
            return ({
                "Stopwatch.useEffect": ()=>{
                    if (intervalRef.current) clearInterval(intervalRef.current);
                }
            })["Stopwatch.useEffect"];
        }
    }["Stopwatch.useEffect"], []);
    const formatTime = (ms)=>{
        const totalSeconds = Math.floor(ms / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        const centiseconds = Math.floor(ms % 1000 / 10);
        return {
            minutes: String(minutes).padStart(2, "0"),
            seconds: String(seconds).padStart(2, "0"),
            centiseconds: String(centiseconds).padStart(2, "0")
        };
    };
    const { minutes, seconds, centiseconds } = formatTime(time);
    // Angle of the sweep hand (1 full rotation = 60 seconds)
    const sweepAngle = time / 1000 % 60 * 6; // 360/60 = 6 degrees per second
    // Small dial: minutes (1 full rotation = 30 minutes)
    const minuteAngle = time / 60000 % 30 * 12; // 360/30 = 12 degrees per minute
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col items-center gap-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute -top-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: isRunning ? handleStop : handleStart,
                                className: "w-10 h-10 rounded-full bg-linear-to-b from-[#3a3a3a] to-[#1a1a1a] border-2 border-[#555] shadow-[0_4px_12px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.1)] hover:scale-105 active:scale-95 transition-transform cursor-pointer flex items-center justify-center",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `w-3 h-3 rounded-full ${isRunning ? "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]" : "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"}`
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/flask/components/Stopwatch.tsx",
                                    lineNumber: 105,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Desktop/flask/components/Stopwatch.tsx",
                                lineNumber: 101,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-1 h-3 bg-linear-to-b from-[#555] to-[#333] rounded-b"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/flask/components/Stopwatch.tsx",
                                lineNumber: 107,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/flask/components/Stopwatch.tsx",
                        lineNumber: 100,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleLap,
                        className: "absolute top-4 -right-4 z-20 w-6 h-10 bg-linear-to-r from-[#3a3a3a] to-[#2a2a2a] border border-[#555] rounded-r-md shadow-[2px_2px_8px_rgba(0,0,0,0.4)] hover:brightness-125 active:brightness-90 transition-all cursor-pointer"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/flask/components/Stopwatch.tsx",
                        lineNumber: 111,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative w-[260px] h-[260px] rounded-full bg-linear-to-br from-[#2a2a2a] to-[#0a0a0a] border-[3px] border-[#444] shadow-[0_8px_32px_rgba(0,0,0,0.8),inset_0_2px_4px_rgba(255,255,255,0.05)]",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute inset-[6px] rounded-full bg-linear-to-br from-[#1a1a1a] to-[#0d0d0d] border border-[#333]",
                            children: [
                                Array.from({
                                    length: 60
                                }).map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute left-1/2 top-0 origin-bottom",
                                        style: {
                                            height: "50%",
                                            width: "1px",
                                            transform: `rotate(${i * 6}deg)`,
                                            transformOrigin: "bottom center"
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: `w-px ${i % 5 === 0 ? "h-[12px] bg-white/80" : "h-[6px] bg-white/30"}`,
                                            style: {
                                                marginTop: "8px"
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/flask/components/Stopwatch.tsx",
                                            lineNumber: 132,
                                            columnNumber: 17
                                        }, this)
                                    }, i, false, {
                                        fileName: "[project]/Desktop/flask/components/Stopwatch.tsx",
                                        lineNumber: 122,
                                        columnNumber: 15
                                    }, this)),
                                [
                                    0,
                                    5,
                                    10,
                                    15,
                                    20,
                                    25,
                                    30,
                                    35,
                                    40,
                                    45,
                                    50,
                                    55
                                ].map((num)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute text-[9px] font-mono text-white/50 font-medium",
                                        style: {
                                            left: `${50 + 38 * Math.sin(num * 6 * Math.PI / 180)}%`,
                                            top: `${50 - 38 * Math.cos(num * 6 * Math.PI / 180)}%`,
                                            transform: "translate(-50%, -50%)"
                                        },
                                        children: num
                                    }, `label-${num}`, false, {
                                        fileName: "[project]/Desktop/flask/components/Stopwatch.tsx",
                                        lineNumber: 145,
                                        columnNumber: 15
                                    }, this)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute top-[60%] left-1/2 -translate-x-1/2 w-[60px] h-[60px] rounded-full border border-white/10 bg-[#0a0a0a]",
                                    children: [
                                        Array.from({
                                            length: 30
                                        }).map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "absolute left-1/2 top-0 origin-bottom",
                                                style: {
                                                    height: "50%",
                                                    width: "1px",
                                                    transform: `rotate(${i * 12}deg)`,
                                                    transformOrigin: "bottom center"
                                                },
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: `w-px ${i % 5 === 0 ? "h-[5px] bg-white/60" : "h-[3px] bg-white/20"}`,
                                                    style: {
                                                        marginTop: "3px"
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/flask/components/Stopwatch.tsx",
                                                    lineNumber: 172,
                                                    columnNumber: 19
                                                }, this)
                                            }, `m-${i}`, false, {
                                                fileName: "[project]/Desktop/flask/components/Stopwatch.tsx",
                                                lineNumber: 162,
                                                columnNumber: 17
                                            }, this)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "absolute left-1/2 bottom-1/2 origin-bottom",
                                            style: {
                                                transform: `translateX(-50%) rotate(${minuteAngle}deg)`,
                                                width: "2px",
                                                height: "22px"
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-full h-full bg-blue-400 rounded-full shadow-[0_0_4px_rgba(59,130,246,0.6)]"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/flask/components/Stopwatch.tsx",
                                                lineNumber: 189,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/flask/components/Stopwatch.tsx",
                                            lineNumber: 181,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "absolute left-1/2 top-1/2 w-[4px] h-[4px] rounded-full bg-blue-400 -translate-x-1/2 -translate-y-1/2"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/flask/components/Stopwatch.tsx",
                                            lineNumber: 192,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/flask/components/Stopwatch.tsx",
                                    lineNumber: 159,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute left-1/2 bottom-1/2 origin-bottom transition-none",
                                    style: {
                                        transform: `translateX(-50%) rotate(${sweepAngle}deg)`,
                                        width: "2px",
                                        height: "45%"
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-full h-full bg-linear-to-t from-red-500 to-red-400 rounded-full shadow-[0_0_6px_rgba(239,68,68,0.5)]"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/flask/components/Stopwatch.tsx",
                                            lineNumber: 204,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "absolute -bottom-3 left-1/2 -translate-x-1/2 w-[6px] h-[12px] bg-red-500/60 rounded-full"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/flask/components/Stopwatch.tsx",
                                            lineNumber: 206,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/flask/components/Stopwatch.tsx",
                                    lineNumber: 196,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute left-1/2 top-1/2 w-[10px] h-[10px] rounded-full bg-linear-to-br from-[#666] to-[#333] border border-[#777] -translate-x-1/2 -translate-y-1/2 shadow-[0_0_4px_rgba(0,0,0,0.5)] z-10"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/flask/components/Stopwatch.tsx",
                                    lineNumber: 210,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute top-[30%] left-1/2 -translate-x-1/2 bg-[#0a0a0a] border border-white/10 rounded-md px-3 py-1",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-mono text-lg tracking-widest text-white/90",
                                        children: [
                                            minutes,
                                            ":",
                                            seconds,
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-white/40 text-sm",
                                                children: [
                                                    ".",
                                                    centiseconds
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/flask/components/Stopwatch.tsx",
                                                lineNumber: 216,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/flask/components/Stopwatch.tsx",
                                        lineNumber: 214,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/flask/components/Stopwatch.tsx",
                                    lineNumber: 213,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/flask/components/Stopwatch.tsx",
                            lineNumber: 119,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/flask/components/Stopwatch.tsx",
                        lineNumber: 117,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/flask/components/Stopwatch.tsx",
                lineNumber: 98,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: isRunning ? handleLap : handleReset,
                        className: "px-5 py-2 rounded-full text-sm font-medium border border-white/10 bg-white/3 text-white/60 hover:text-white hover:bg-white/6 transition-all",
                        children: isRunning ? "Step ⬇" : "Reset"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/flask/components/Stopwatch.tsx",
                        lineNumber: 225,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: isRunning ? handleStop : handleStart,
                        className: `px-6 py-2 rounded-full text-sm font-semibold transition-all ${isRunning ? "bg-red-600 hover:bg-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.3)]" : "bg-green-600 hover:bg-green-500 text-white shadow-[0_0_15px_rgba(34,197,94,0.3)]"}`,
                        children: isRunning ? "Stop" : time > 0 ? "Resume" : "Start"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/flask/components/Stopwatch.tsx",
                        lineNumber: 231,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/flask/components/Stopwatch.tsx",
                lineNumber: 224,
                columnNumber: 7
            }, this),
            laps.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-full max-w-[260px] mt-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-xs text-white/40 uppercase tracking-widest mb-2 font-medium",
                        children: "Step Recordings"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/flask/components/Stopwatch.tsx",
                        lineNumber: 246,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col gap-1 max-h-[120px] overflow-y-auto",
                        children: laps.map((lap, i)=>{
                            const f = formatTime(lap);
                            const delta = i === 0 ? lap : lap - laps[i - 1];
                            const df = formatTime(delta);
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between items-center text-xs font-mono px-3 py-1.5 rounded bg-white/2 border border-white/5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-white/50",
                                        children: [
                                            "Step ",
                                            i + 1
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/flask/components/Stopwatch.tsx",
                                        lineNumber: 260,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-white/70",
                                        children: [
                                            f.minutes,
                                            ":",
                                            f.seconds,
                                            ".",
                                            f.centiseconds
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/flask/components/Stopwatch.tsx",
                                        lineNumber: 261,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-violet-400",
                                        children: [
                                            "+",
                                            df.minutes,
                                            ":",
                                            df.seconds
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/flask/components/Stopwatch.tsx",
                                        lineNumber: 264,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, i, true, {
                                fileName: "[project]/Desktop/flask/components/Stopwatch.tsx",
                                lineNumber: 256,
                                columnNumber: 17
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/Desktop/flask/components/Stopwatch.tsx",
                        lineNumber: 249,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/flask/components/Stopwatch.tsx",
                lineNumber: 245,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/flask/components/Stopwatch.tsx",
        lineNumber: 96,
        columnNumber: 5
    }, this);
}
_s(Stopwatch, "5crlQczDu8j5F54ALoRvhNW0wZ0=");
_c = Stopwatch;
var _c;
__turbopack_context__.k.register(_c, "Stopwatch");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/flask/app/reaction/[id]/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ReactionPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/flask/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/flask/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/flask/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/flask/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/flask/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$lib$2f$reactions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/flask/lib/reactions.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$components$2f$Stopwatch$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/flask/components/Stopwatch.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$components$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/flask/components/AuthContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__ = __turbopack_context__.i("[project]/Desktop/flask/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-client] (ecmascript) <export default as ArrowLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$beaker$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Beaker$3e$__ = __turbopack_context__.i("[project]/Desktop/flask/node_modules/lucide-react/dist/esm/icons/beaker.js [app-client] (ecmascript) <export default as Beaker>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/Desktop/flask/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__ = __turbopack_context__.i("[project]/Desktop/flask/node_modules/lucide-react/dist/esm/icons/triangle-alert.js [app-client] (ecmascript) <export default as AlertTriangle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/Desktop/flask/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__ = __turbopack_context__.i("[project]/Desktop/flask/node_modules/lucide-react/dist/esm/icons/circle-check-big.js [app-client] (ecmascript) <export default as CheckCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$globe$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Globe$3e$__ = __turbopack_context__.i("[project]/Desktop/flask/node_modules/lucide-react/dist/esm/icons/globe.js [app-client] (ecmascript) <export default as Globe>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__ = __turbopack_context__.i("[project]/Desktop/flask/node_modules/lucide-react/dist/esm/icons/lock.js [app-client] (ecmascript) <export default as Lock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__ = __turbopack_context__.i("[project]/Desktop/flask/node_modules/lucide-react/dist/esm/icons/zap.js [app-client] (ecmascript) <export default as Zap>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__ = __turbopack_context__.i("[project]/Desktop/flask/node_modules/lucide-react/dist/esm/icons/book-open.js [app-client] (ecmascript) <export default as BookOpen>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$list$2d$checks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ListChecks$3e$__ = __turbopack_context__.i("[project]/Desktop/flask/node_modules/lucide-react/dist/esm/icons/list-checks.js [app-client] (ecmascript) <export default as ListChecks>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__ = __turbopack_context__.i("[project]/Desktop/flask/node_modules/lucide-react/dist/esm/icons/play.js [app-client] (ecmascript) <export default as Play>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$column$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart3$3e$__ = __turbopack_context__.i("[project]/Desktop/flask/node_modules/lucide-react/dist/esm/icons/chart-column.js [app-client] (ecmascript) <export default as BarChart3>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$droplets$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Droplets$3e$__ = __turbopack_context__.i("[project]/Desktop/flask/node_modules/lucide-react/dist/esm/icons/droplets.js [app-client] (ecmascript) <export default as Droplets>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$thermometer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Thermometer$3e$__ = __turbopack_context__.i("[project]/Desktop/flask/node_modules/lucide-react/dist/esm/icons/thermometer.js [app-client] (ecmascript) <export default as Thermometer>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wind$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wind$3e$__ = __turbopack_context__.i("[project]/Desktop/flask/node_modules/lucide-react/dist/esm/icons/wind.js [app-client] (ecmascript) <export default as Wind>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/flask/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
function ReactionPage() {
    _s();
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const { user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$components$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const reactionId = params?.id;
    const reaction = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$lib$2f$reactions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STORED_REACTIONS"].find((r)=>r.id === reactionId);
    const [phase, setPhase] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("theory");
    const [currentStep, setCurrentStep] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [stopwatchRunning, setStopwatchRunning] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [, setStepTimings] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [totalTime, setTotalTime] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [waitingForUser, setWaitingForUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [autoAdvanceCountdown, setAutoAdvanceCountdown] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [simulatedData, setSimulatedData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [saveChoice, setSaveChoice] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [saved, setSaved] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const autoAdvanceTimerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const dataSimulationRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const executionStartRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    // ── Auto-advance logic ──
    // After each step completion, wait 4-5 seconds then auto-advance to next step.
    // If user clicks "Continue" before the timer, skip to next step immediately.
    const startAutoAdvanceTimer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ReactionPage.useCallback[startAutoAdvanceTimer]": ()=>{
            setWaitingForUser(true);
            setAutoAdvanceCountdown(5);
            autoAdvanceTimerRef.current = setInterval({
                "ReactionPage.useCallback[startAutoAdvanceTimer]": ()=>{
                    setAutoAdvanceCountdown({
                        "ReactionPage.useCallback[startAutoAdvanceTimer]": (prev)=>{
                            if (prev <= 1) {
                                // Auto-advance to the next step
                                if (autoAdvanceTimerRef.current) clearInterval(autoAdvanceTimerRef.current);
                                setWaitingForUser(false);
                                setCurrentStep({
                                    "ReactionPage.useCallback[startAutoAdvanceTimer]": (s)=>s + 1
                                }["ReactionPage.useCallback[startAutoAdvanceTimer]"]);
                                return 0;
                            }
                            return prev - 1;
                        }
                    }["ReactionPage.useCallback[startAutoAdvanceTimer]"]);
                }
            }["ReactionPage.useCallback[startAutoAdvanceTimer]"], 1000);
        }
    }["ReactionPage.useCallback[startAutoAdvanceTimer]"], []);
    // ── Simulated data generation ──
    const startDataSimulation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ReactionPage.useCallback[startDataSimulation]": (rxn)=>{
            executionStartRef.current = Date.now();
            const totalExpectedTime = rxn.expected_outputs[rxn.expected_outputs.length - 1].time_seconds;
            dataSimulationRef.current = setInterval({
                "ReactionPage.useCallback[startDataSimulation]": ()=>{
                    const elapsed = (Date.now() - executionStartRef.current) / 1000;
                    const fraction = Math.min(elapsed / totalExpectedTime, 1);
                    // Interpolate expected outputs
                    const expected = interpolateExpected(rxn.expected_outputs, elapsed);
                    // Add some noise to simulate real sensor data
                    const noise_mq6 = (Math.random() - 0.5) * 30;
                    const noise_mq7 = (Math.random() - 0.5) * 20;
                    const noise_temp = (Math.random() - 0.5) * 2;
                    const noise_hum = (Math.random() - 0.5) * 3;
                    const mq6 = Math.max(0, expected.mq6_ppm + noise_mq6);
                    const mq7 = Math.max(0, expected.mq7_ppm + noise_mq7);
                    const temp = Math.max(0, expected.temp_celsius + noise_temp);
                    const hum = Math.max(0, Math.min(100, expected.humidity + noise_hum));
                    // Detect anomaly: if deviation is > 40% from expected on any sensor
                    const mq6Dev = Math.abs(mq6 - expected.mq6_ppm) / (expected.mq6_ppm || 1);
                    const mq7Dev = Math.abs(mq7 - expected.mq7_ppm) / (expected.mq7_ppm || 1);
                    const tempDev = Math.abs(temp - expected.temp_celsius) / (expected.temp_celsius || 1);
                    const anomaly = mq6Dev > 0.4 || mq7Dev > 0.4 || tempDev > 0.4;
                    setSimulatedData({
                        "ReactionPage.useCallback[startDataSimulation]": (prev)=>[
                                ...prev,
                                {
                                    time_seconds: Math.round(elapsed),
                                    mq6_ppm: Math.round(mq6),
                                    mq7_ppm: Math.round(mq7),
                                    temp_celsius: Math.round(temp * 10) / 10,
                                    humidity: Math.round(hum * 10) / 10,
                                    anomaly
                                }
                            ]
                    }["ReactionPage.useCallback[startDataSimulation]"]);
                    if (fraction >= 1) {
                        if (dataSimulationRef.current) clearInterval(dataSimulationRef.current);
                    }
                }
            }["ReactionPage.useCallback[startDataSimulation]"], 2000); // every 2 seconds
        }
    }["ReactionPage.useCallback[startDataSimulation]"], []);
    // Cleanup
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ReactionPage.useEffect": ()=>{
            return ({
                "ReactionPage.useEffect": ()=>{
                    if (autoAdvanceTimerRef.current) clearInterval(autoAdvanceTimerRef.current);
                    if (dataSimulationRef.current) clearInterval(dataSimulationRef.current);
                }
            })["ReactionPage.useEffect"];
        }
    }["ReactionPage.useEffect"], []);
    if (!reaction) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
            className: "bg-[#050505] min-h-screen text-white flex items-center justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-4xl font-medium tracking-tight mb-4",
                        children: "Reaction Not Found"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                        lineNumber: 148,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-white/50 mb-8",
                        children: "This reaction doesn't exist in our database."
                    }, void 0, false, {
                        fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                        lineNumber: 151,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: "/",
                        className: "px-6 py-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors",
                        children: "← Back Home"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                        lineNumber: 154,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                lineNumber: 147,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
            lineNumber: 146,
            columnNumber: 7
        }, this);
    }
    const handleStartExecution = ()=>{
        setPhase("execution");
        setCurrentStep(0);
        setStopwatchRunning(true);
        setSimulatedData([]);
        startDataSimulation(reaction);
    };
    const handleStepComplete = (lapTime)=>{
        setStepTimings((prev)=>[
                ...prev,
                lapTime
            ]);
        if (currentStep < reaction.steps.length - 1) {
            startAutoAdvanceTimer();
        } else {
            // Last step — finish
            setStopwatchRunning(false);
            setTotalTime(lapTime);
            if (dataSimulationRef.current) clearInterval(dataSimulationRef.current);
            setPhase("results");
        }
    };
    const handleContinueToNextStep = ()=>{
        if (autoAdvanceTimerRef.current) clearInterval(autoAdvanceTimerRef.current);
        setWaitingForUser(false);
        setAutoAdvanceCountdown(0);
        setCurrentStep((prev)=>prev + 1);
    };
    const handleSave = (mode)=>{
        setSaveChoice(mode);
        // In production, save to Supabase here
        setTimeout(()=>setSaved(true), 800);
    };
    const currentStepData = reaction.steps[Math.min(currentStep, reaction.steps.length - 1)];
    // Get the most recent anomaly
    const latestAnomaly = simulatedData.filter((d)=>d.anomaly).slice(-1)[0];
    const hasRecentAnomaly = latestAnomaly && simulatedData.length > 0 && simulatedData.indexOf(latestAnomaly) > simulatedData.length - 4;
    const latestData = simulatedData.length > 0 ? simulatedData[simulatedData.length - 1] : null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "bg-[#050505] min-h-screen text-white pt-20 pb-24 selection:bg-violet-500/30",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 pointer-events-none",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-linear-to-br ${reaction.thumbnail_color} opacity-[0.03] blur-[150px] rounded-full`
                }, void 0, false, {
                    fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                    lineNumber: 217,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                lineNumber: 216,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-6 md:px-12 lg:px-24 mb-8 flex items-center gap-4 relative z-10",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>router.back(),
                        className: "w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                            size: 16
                        }, void 0, false, {
                            fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                            lineNumber: 228,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                        lineNumber: 224,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-2xl md:text-3xl font-medium tracking-tight",
                                children: reaction.name
                            }, void 0, false, {
                                fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                lineNumber: 231,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm font-mono text-white/40",
                                children: reaction.formula
                            }, void 0, false, {
                                fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                lineNumber: 234,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                        lineNumber: 230,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                lineNumber: 223,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-6 md:px-12 lg:px-24 mb-8 flex gap-2 relative z-10",
                children: [
                    {
                        key: "theory",
                        label: "Theory",
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__["BookOpen"]
                    },
                    {
                        key: "steps",
                        label: "Procedure",
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$list$2d$checks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ListChecks$3e$__["ListChecks"]
                    },
                    {
                        key: "execution",
                        label: "Execute",
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__["Play"]
                    },
                    {
                        key: "results",
                        label: "Results",
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$column$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart3$3e$__["BarChart3"]
                    }
                ].map(({ key, label, icon: Icon })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>{
                            if (key === "execution" && phase !== "execution" && phase !== "results") return;
                            if (key === "results" && phase !== "results") return;
                            setPhase(key);
                        },
                        className: `flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${phase === key ? "bg-white/10 text-white border border-white/20" : key === "execution" && phase !== "execution" && phase !== "results" ? "text-white/20 border border-white/5 cursor-not-allowed" : key === "results" && phase !== "results" ? "text-white/20 border border-white/5 cursor-not-allowed" : "text-white/40 border border-white/5 hover:bg-white/5 hover:text-white/60"}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                size: 14
                            }, void 0, false, {
                                fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                lineNumber: 270,
                                columnNumber: 13
                            }, this),
                            label
                        ]
                    }, key, true, {
                        fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                        lineNumber: 248,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                lineNumber: 239,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-6 md:px-12 lg:px-24 relative z-10",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                    mode: "wait",
                    children: [
                        phase === "theory" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            initial: {
                                opacity: 0,
                                y: 20
                            },
                            animate: {
                                opacity: 1,
                                y: 0
                            },
                            exit: {
                                opacity: 0,
                                y: -20
                            },
                            transition: {
                                duration: 0.4
                            },
                            className: "max-w-5xl",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-1 lg:grid-cols-3 gap-8",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "lg:col-span-2",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "glass-card p-8",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                    className: "text-2xl font-medium tracking-tight mb-6 flex items-center gap-3",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__["BookOpen"], {
                                                            size: 20,
                                                            className: "text-blue-400"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                                            lineNumber: 294,
                                                            columnNumber: 23
                                                        }, this),
                                                        "Theory & Background"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                                    lineNumber: 293,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-white/60 leading-relaxed text-lg",
                                                    children: reaction.theory
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                                    lineNumber: 297,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "mt-8 p-4 bg-blue-500/5 border border-blue-500/10 rounded-xl",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                            className: "text-sm font-medium text-blue-400 uppercase tracking-widest mb-3",
                                                            children: "Expected Sensor Peaks"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                                            lineNumber: 302,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "grid grid-cols-2 lg:grid-cols-4 gap-4",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-xs text-white/40 block mb-1",
                                                                            children: "MQ6 (LPG)"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                                                            lineNumber: 307,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-2xl font-medium text-cyan-300",
                                                                            children: [
                                                                                Math.max(...reaction.expected_outputs.map((o)=>o.mq6_ppm)),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    className: "text-sm text-white/40 ml-1",
                                                                                    children: "ppm"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                                                                    lineNumber: 310,
                                                                                    columnNumber: 29
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                                                            lineNumber: 308,
                                                                            columnNumber: 27
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                                                    lineNumber: 306,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-xs text-white/40 block mb-1",
                                                                            children: "MQ7 (CO)"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                                                            lineNumber: 314,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-2xl font-medium text-red-300",
                                                                            children: [
                                                                                Math.max(...reaction.expected_outputs.map((o)=>o.mq7_ppm)),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    className: "text-sm text-white/40 ml-1",
                                                                                    children: "ppm"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                                                                    lineNumber: 317,
                                                                                    columnNumber: 29
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                                                            lineNumber: 315,
                                                                            columnNumber: 27
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                                                    lineNumber: 313,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-xs text-white/40 block mb-1",
                                                                            children: "Temperature"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                                                            lineNumber: 321,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-2xl font-medium text-amber-300",
                                                                            children: [
                                                                                Math.max(...reaction.expected_outputs.map((o)=>o.temp_celsius)),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    className: "text-sm text-white/40 ml-1",
                                                                                    children: "°C"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                                                                    lineNumber: 324,
                                                                                    columnNumber: 29
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                                                            lineNumber: 322,
                                                                            columnNumber: 27
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                                                    lineNumber: 320,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-xs text-white/40 block mb-1",
                                                                            children: "Humidity"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                                                            lineNumber: 328,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-2xl font-medium text-blue-300",
                                                                            children: [
                                                                                Math.max(...reaction.expected_outputs.map((o)=>o.humidity)),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    className: "text-sm text-white/40 ml-1",
                                                                                    children: "%"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                                                                    lineNumber: 331,
                                                                                    columnNumber: 29
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                                                            lineNumber: 329,
                                                                            columnNumber: 27
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                                                    lineNumber: 327,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                                            lineNumber: 305,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                                    lineNumber: 301,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                            lineNumber: 292,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                        lineNumber: 291,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "glass-card p-6",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "text-lg font-medium tracking-tight mb-4 flex items-center gap-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$beaker$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Beaker$3e$__["Beaker"], {
                                                                size: 16,
                                                                className: "text-violet-400"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                                                lineNumber: 343,
                                                                columnNumber: 23
                                                            }, this),
                                                            "Chemicals Required"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                                        lineNumber: 342,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                        className: "space-y-3",
                                                        children: reaction.chemicals.map((chem, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                                className: "flex items-start gap-3 text-sm text-white/60",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "w-1.5 h-1.5 rounded-full bg-violet-500 mt-2 shrink-0"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                                                        lineNumber: 352,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    chem
                                                                ]
                                                            }, i, true, {
                                                                fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                                                lineNumber: 348,
                                                                columnNumber: 25
                                                            }, this))
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                                        lineNumber: 346,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                                lineNumber: 341,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "glass-card p-6 mt-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-3 mb-3",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                                                size: 16,
                                                                className: "text-amber-400"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                                                lineNumber: 361,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-sm text-white/50",
                                                                children: "Estimated Duration"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                                                lineNumber: 362,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                                        lineNumber: 360,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-3xl font-medium",
                                                        children: [
                                                            reaction.duration_minutes,
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-lg text-white/40 ml-1",
                                                                children: "min"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                                                lineNumber: 368,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                                        lineNumber: 366,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                                lineNumber: 359,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setPhase("steps"),
                                                className: "w-full mt-4 px-6 py-3 bg-linear-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white font-medium rounded-xl transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(59,130,246,0.2)]",
                                                children: [
                                                    "View Procedure",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                                        size: 16
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                                        lineNumber: 377,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                                lineNumber: 372,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                        lineNumber: 340,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                lineNumber: 289,
                                columnNumber: 15
                            }, this)
                        }, "theory", false, {
                            fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                            lineNumber: 281,
                            columnNumber: 13
                        }, this),
                        phase === "steps" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            initial: {
                                opacity: 0,
                                y: 20
                            },
                            animate: {
                                opacity: 1,
                                y: 0
                            },
                            exit: {
                                opacity: 0,
                                y: -20
                            },
                            transition: {
                                duration: 0.4
                            },
                            className: "max-w-4xl",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "glass-card p-8",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "text-2xl font-medium tracking-tight mb-8 flex items-center gap-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$list$2d$checks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ListChecks$3e$__["ListChecks"], {
                                                    size: 20,
                                                    className: "text-violet-400"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                                    lineNumber: 396,
                                                    columnNumber: 19
                                                }, this),
                                                "Step-by-Step Procedure"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                            lineNumber: 395,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-0",
                                            children: reaction.steps.map((step, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex gap-6 relative group",
                                                    children: [
                                                        i < reaction.steps.length - 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "absolute left-[19px] top-[42px] w-[2px] h-[calc(100%-10px)] bg-white/10"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                                            lineNumber: 405,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-sm font-mono text-white/60 group-hover:bg-white/10 group-hover:border-white/20 transition-all z-10",
                                                            children: step.order
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                                            lineNumber: 409,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "pb-8 flex-1",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                    className: "text-lg font-medium text-white/90 mb-1",
                                                                    children: step.title
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                                                    lineNumber: 414,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-sm text-white/50 leading-relaxed mb-2",
                                                                    children: step.description
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                                                    lineNumber: 417,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-xs text-white/30 font-mono",
                                                                    children: [
                                                                        "~",
                                                                        step.expected_duration_seconds,
                                                                        "s expected"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                                                    lineNumber: 420,
                                                                    columnNumber: 25
                                                                }, this),
                                                                step.warning && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "mt-3 p-3 bg-amber-500/5 border border-amber-500/15 rounded-lg flex items-start gap-2",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                                                                            size: 14,
                                                                            className: "text-amber-400 mt-0.5 shrink-0"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                                                            lineNumber: 425,
                                                                            columnNumber: 29
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-xs text-amber-300/80",
                                                                            children: step.warning
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                                                            lineNumber: 429,
                                                                            columnNumber: 29
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                                                    lineNumber: 424,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                                            lineNumber: 413,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, i, true, {
                                                    fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                                    lineNumber: 402,
                                                    columnNumber: 21
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                            lineNumber: 400,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                    lineNumber: 394,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: handleStartExecution,
                                    className: "mt-8 px-8 py-4 bg-linear-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-semibold rounded-xl transition-all flex items-center gap-3 shadow-[0_0_25px_rgba(34,197,94,0.2)] text-lg mx-auto",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__["Play"], {
                                            size: 20
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                            lineNumber: 444,
                                            columnNumber: 17
                                        }, this),
                                        "Start Experiment"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                    lineNumber: 440,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, "steps", true, {
                            fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                            lineNumber: 386,
                            columnNumber: 13
                        }, this),
                        phase === "execution" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            initial: {
                                opacity: 0,
                                y: 20
                            },
                            animate: {
                                opacity: 1,
                                y: 0
                            },
                            exit: {
                                opacity: 0,
                                y: -20
                            },
                            transition: {
                                duration: 0.4
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-1 lg:grid-cols-3 gap-8",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col items-center gap-8",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$components$2f$Stopwatch$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            running: stopwatchRunning,
                                            onLap: (time)=>handleStepComplete(time)
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                            lineNumber: 462,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                        lineNumber: 461,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "lg:col-span-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "glass-card p-8 relative overflow-hidden",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                                        children: hasRecentAnomaly && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                                            initial: {
                                                                opacity: 0,
                                                                y: -20
                                                            },
                                                            animate: {
                                                                opacity: 1,
                                                                y: 0
                                                            },
                                                            exit: {
                                                                opacity: 0,
                                                                y: -20
                                                            },
                                                            className: "absolute top-0 left-0 w-full p-3 bg-red-500/10 border-b border-red-500/20 z-20 flex items-center gap-3",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                                                                    size: 18,
                                                                    className: "text-red-400 animate-pulse"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                                                    lineNumber: 481,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-sm text-red-300 font-medium",
                                                                    children: [
                                                                        "Anomaly Detected — MQ6: ",
                                                                        latestAnomaly?.mq6_ppm,
                                                                        "ppm, MQ7: ",
                                                                        latestAnomaly?.mq7_ppm,
                                                                        "ppm, Temp: ",
                                                                        latestAnomaly?.temp_celsius,
                                                                        "°C"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                                                    lineNumber: 485,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                                            lineNumber: 475,
                                                            columnNumber: 25
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                                        lineNumber: 473,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center justify-between mb-6",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center gap-3",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "w-10 h-10 rounded-full bg-linear-to-tr from-blue-500 to-violet-500 flex items-center justify-center text-sm font-bold",
                                                                        children: currentStep + 1
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                                                        lineNumber: 494,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "text-xs text-white/40 uppercase tracking-widest block",
                                                                                children: [
                                                                                    "Step ",
                                                                                    currentStep + 1,
                                                                                    " of ",
                                                                                    reaction.steps.length
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                                                                lineNumber: 498,
                                                                                columnNumber: 27
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                                className: "text-xl font-medium",
                                                                                children: currentStepData.title
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                                                                lineNumber: 501,
                                                                                columnNumber: 27
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                                                        lineNumber: 497,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                                                lineNumber: 493,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-xs font-mono text-white/30 bg-white/5 px-3 py-1 rounded-full",
                                                                children: [
                                                                    "~",
                                                                    currentStepData.expected_duration_seconds,
                                                                    "s"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                                                lineNumber: 506,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                                        lineNumber: 492,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-white/60 leading-relaxed mb-6",
                                                        children: currentStepData.description
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                                        lineNumber: 511,
                                                        columnNumber: 21
                                                    }, this),
                                                    currentStepData.warning && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "p-4 bg-amber-500/5 border border-amber-500/15 rounded-xl flex items-start gap-3 mb-6",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                                                                size: 16,
                                                                className: "text-amber-400 mt-0.5 shrink-0"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                                                lineNumber: 517,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-sm text-amber-300/80",
                                                                children: currentStepData.warning
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                                                lineNumber: 521,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                                        lineNumber: 516,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                                        mode: "wait",
                                                        children: waitingForUser ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                                            initial: {
                                                                opacity: 0
                                                            },
                                                            animate: {
                                                                opacity: 1
                                                            },
                                                            exit: {
                                                                opacity: 0
                                                            },
                                                            className: "flex items-center justify-between bg-white/3 border border-white/10 rounded-xl p-4",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex items-center gap-3",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "w-8 h-8 rounded-full border-2 border-violet-500/50 flex items-center justify-center",
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "text-sm font-mono text-violet-400",
                                                                                children: autoAdvanceCountdown
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                                                                lineNumber: 539,
                                                                                columnNumber: 31
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                                                            lineNumber: 538,
                                                                            columnNumber: 29
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-sm text-white/50",
                                                                            children: "Next step loading..."
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                                                            lineNumber: 543,
                                                                            columnNumber: 29
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                                                    lineNumber: 537,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    onClick: handleContinueToNextStep,
                                                                    className: "px-5 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-medium transition-colors flex items-center gap-2",
                                                                    children: [
                                                                        "Continue Now",
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                                                            size: 14
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                                                            lineNumber: 552,
                                                                            columnNumber: 29
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                                                    lineNumber: 547,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, "waiting", true, {
                                                            fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                                            lineNumber: 530,
                                                            columnNumber: 25
                                                        }, this) : !waitingForUser && currentStep < reaction.steps.length - 1 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                                            initial: {
                                                                opacity: 0
                                                            },
                                                            animate: {
                                                                opacity: 1
                                                            },
                                                            exit: {
                                                                opacity: 0
                                                            },
                                                            className: "text-center",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-xs text-white/30 mb-3",
                                                                    children: [
                                                                        "Press the ",
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                            className: "text-white/50",
                                                                            children: '"Step ⬇"'
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                                                            lineNumber: 564,
                                                                            columnNumber: 39
                                                                        }, this),
                                                                        " button on the stopwatch or below when done"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                                                    lineNumber: 563,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    onClick: ()=>handleStepComplete(0),
                                                                    className: "px-6 py-2.5 bg-violet-600 hover:bg-violet-500 rounded-lg text-sm font-medium transition-colors",
                                                                    children: "Mark Step Complete ✓"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                                                    lineNumber: 566,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, "step-active", true, {
                                                            fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                                            lineNumber: 556,
                                                            columnNumber: 25
                                                        }, this) : null
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                                        lineNumber: 528,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "mt-6 flex gap-1",
                                                        children: reaction.steps.map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: `h-1 flex-1 rounded-full transition-all duration-500 ${i < currentStep ? "bg-green-500" : i === currentStep ? "bg-blue-500" : "bg-white/10"}`
                                                            }, i, false, {
                                                                fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                                                lineNumber: 579,
                                                                columnNumber: 25
                                                            }, this))
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                                        lineNumber: 577,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                                lineNumber: 471,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "glass-card p-4",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-xs text-white/40 uppercase tracking-widest mb-1 flex items-center gap-1",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wind$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wind$3e$__["Wind"], {
                                                                        size: 10
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                                                        lineNumber: 597,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    " MQ6 (LPG)"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                                                lineNumber: 596,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-3xl font-medium text-cyan-400",
                                                                children: [
                                                                    latestData ? latestData.mq6_ppm : "--",
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-sm text-white/30 ml-1",
                                                                        children: "ppm"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                                                        lineNumber: 601,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                                                lineNumber: 599,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                                        lineNumber: 595,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "glass-card p-4",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-xs text-white/40 uppercase tracking-widest mb-1 flex items-center gap-1",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__["Zap"], {
                                                                        size: 10
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                                                        lineNumber: 606,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    " MQ7 (CO)"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                                                lineNumber: 605,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-3xl font-medium text-red-400",
                                                                children: [
                                                                    latestData ? latestData.mq7_ppm : "--",
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-sm text-white/30 ml-1",
                                                                        children: "ppm"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                                                        lineNumber: 610,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                                                lineNumber: 608,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                                        lineNumber: 604,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "glass-card p-4",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-xs text-white/40 uppercase tracking-widest mb-1 flex items-center gap-1",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$thermometer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Thermometer$3e$__["Thermometer"], {
                                                                        size: 10
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                                                        lineNumber: 615,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    " Temp"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                                                lineNumber: 614,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-3xl font-medium text-amber-400",
                                                                children: [
                                                                    latestData ? latestData.temp_celsius : "--",
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-sm text-white/30 ml-1",
                                                                        children: "°C"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                                                        lineNumber: 619,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                                                lineNumber: 617,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                                        lineNumber: 613,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "glass-card p-4",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-xs text-white/40 uppercase tracking-widest mb-1 flex items-center gap-1",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$droplets$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Droplets$3e$__["Droplets"], {
                                                                        size: 10
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                                                        lineNumber: 624,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    " Humidity"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                                                lineNumber: 623,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-3xl font-medium text-blue-400",
                                                                children: [
                                                                    latestData ? latestData.humidity : "--",
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-sm text-white/30 ml-1",
                                                                        children: "%"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                                                        lineNumber: 628,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                                                lineNumber: 626,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                                        lineNumber: 622,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                                lineNumber: 594,
                                                columnNumber: 19
                                            }, this),
                                            simulatedData.length > 2 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "glass-card p-6",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                className: "text-sm font-medium text-cyan-400/60 uppercase tracking-widest mb-4",
                                                                children: "MQ6 (LPG) — Expected vs Actual"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                                                lineNumber: 637,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "h-[100px] relative border border-white/5 rounded-lg overflow-hidden bg-[#0a0a0a]",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MiniChart, {
                                                                    expected: reaction.expected_outputs,
                                                                    actual: simulatedData,
                                                                    field: "mq6_ppm",
                                                                    color: "rgba(34,211,238,0.8)"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                                                    lineNumber: 641,
                                                                    columnNumber: 27
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                                                lineNumber: 640,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                                        lineNumber: 636,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "glass-card p-6",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                className: "text-sm font-medium text-red-400/60 uppercase tracking-widest mb-4",
                                                                children: "MQ7 (CO) — Expected vs Actual"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                                                lineNumber: 650,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "h-[100px] relative border border-white/5 rounded-lg overflow-hidden bg-[#0a0a0a]",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MiniChart, {
                                                                    expected: reaction.expected_outputs,
                                                                    actual: simulatedData,
                                                                    field: "mq7_ppm",
                                                                    color: "rgba(248,113,113,0.8)"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                                                    lineNumber: 654,
                                                                    columnNumber: 27
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                                                lineNumber: 653,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                                        lineNumber: 649,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                                lineNumber: 635,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                        lineNumber: 469,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                lineNumber: 459,
                                columnNumber: 15
                            }, this)
                        }, "execution", false, {
                            fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                            lineNumber: 452,
                            columnNumber: 13
                        }, this),
                        phase === "results" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            initial: {
                                opacity: 0,
                                y: 20
                            },
                            animate: {
                                opacity: 1,
                                y: 0
                            },
                            exit: {
                                opacity: 0,
                                y: -20
                            },
                            transition: {
                                duration: 0.4
                            },
                            className: "max-w-5xl mx-auto",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-center mb-12",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                            initial: {
                                                scale: 0
                                            },
                                            animate: {
                                                scale: 1
                                            },
                                            transition: {
                                                type: "spring",
                                                damping: 10,
                                                stiffness: 200,
                                                delay: 0.2
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                                                size: 64,
                                                className: "text-green-400 mx-auto mb-4"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                                lineNumber: 690,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                            lineNumber: 680,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "text-4xl font-medium tracking-tight mb-2",
                                            children: "Experiment Complete"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                            lineNumber: 695,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-white/50",
                                            children: [
                                                reaction.name,
                                                " — finished in",
                                                " ",
                                                Math.round(totalTime / 1000),
                                                "s"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                            lineNumber: 698,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                    lineNumber: 679,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-2 md:grid-cols-4 gap-4 mb-8",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "glass-card p-5 text-center",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wind$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wind$3e$__["Wind"], {
                                                    size: 20,
                                                    className: "text-cyan-400 mx-auto mb-2"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                                    lineNumber: 707,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xs text-white/40 uppercase tracking-widest block mb-1",
                                                    children: "Peak MQ6"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                                    lineNumber: 708,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-2xl font-medium",
                                                    children: [
                                                        simulatedData.length > 0 ? Math.max(...simulatedData.map((d)=>d.mq6_ppm)) : "--",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-sm text-white/30 ml-1",
                                                            children: "ppm"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                                            lineNumber: 711,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                                    lineNumber: 709,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                            lineNumber: 706,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "glass-card p-5 text-center",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__["Zap"], {
                                                    size: 20,
                                                    className: "text-red-400 mx-auto mb-2"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                                    lineNumber: 715,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xs text-white/40 uppercase tracking-widest block mb-1",
                                                    children: "Peak MQ7"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                                    lineNumber: 716,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-2xl font-medium",
                                                    children: [
                                                        simulatedData.length > 0 ? Math.max(...simulatedData.map((d)=>d.mq7_ppm)) : "--",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-sm text-white/30 ml-1",
                                                            children: "ppm"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                                            lineNumber: 719,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                                    lineNumber: 717,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                            lineNumber: 714,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "glass-card p-5 text-center",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$thermometer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Thermometer$3e$__["Thermometer"], {
                                                    size: 20,
                                                    className: "text-amber-400 mx-auto mb-2"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                                    lineNumber: 723,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xs text-white/40 uppercase tracking-widest block mb-1",
                                                    children: "Peak Temp"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                                    lineNumber: 724,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-2xl font-medium",
                                                    children: [
                                                        simulatedData.length > 0 ? Math.max(...simulatedData.map((d)=>d.temp_celsius)) : "--",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-sm text-white/30 ml-1",
                                                            children: "°C"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                                            lineNumber: 727,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                                    lineNumber: 725,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                            lineNumber: 722,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "glass-card p-5 text-center",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                                    size: 20,
                                                    className: "text-violet-400 mx-auto mb-2"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                                    lineNumber: 731,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xs text-white/40 uppercase tracking-widest block mb-1",
                                                    children: "Duration"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                                    lineNumber: 732,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-2xl font-medium",
                                                    children: [
                                                        Math.round(totalTime / 1000),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-sm text-white/30 ml-1",
                                                            children: "sec"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                                            lineNumber: 735,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                                    lineNumber: 733,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                            lineNumber: 730,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                    lineNumber: 705,
                                    columnNumber: 15
                                }, this),
                                !saved ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "glass-card p-8 text-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "text-xl font-medium mb-2",
                                            children: "Save Your Results?"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                            lineNumber: 743,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-white/40 text-sm mb-8 max-w-md mx-auto",
                                            children: user ? "Choose whether to contribute to the global database (visible to everyone & used for ML training) or save privately." : "Sign in to save results privately, or contribute anonymously to the global database."
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                            lineNumber: 746,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex justify-center gap-4 flex-wrap",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>handleSave("global"),
                                                    className: `flex items-center gap-3 px-6 py-3 rounded-xl border transition-all ${saveChoice === "global" ? "border-blue-500 bg-blue-500/10" : "border-white/10 bg-white/2 hover:bg-white/5"}`,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$globe$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Globe$3e$__["Globe"], {
                                                            size: 18,
                                                            className: "text-blue-400"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                                            lineNumber: 761,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-left",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "block text-sm font-medium",
                                                                    children: "Share Globally"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                                                    lineNumber: 763,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "block text-xs text-white/40",
                                                                    children: "Contribute to community & ML"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                                                    lineNumber: 766,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                                            lineNumber: 762,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                                    lineNumber: 753,
                                                    columnNumber: 21
                                                }, this),
                                                user && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>handleSave("private"),
                                                    className: `flex items-center gap-3 px-6 py-3 rounded-xl border transition-all ${saveChoice === "private" ? "border-violet-500 bg-violet-500/10" : "border-white/10 bg-white/2 hover:bg-white/5"}`,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__["Lock"], {
                                                            size: 18,
                                                            className: "text-violet-400"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                                            lineNumber: 781,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-left",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "block text-sm font-medium",
                                                                    children: "Save Privately"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                                                    lineNumber: 783,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "block text-xs text-white/40",
                                                                    children: "Only you can see this"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                                                    lineNumber: 786,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                                            lineNumber: 782,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                                    lineNumber: 773,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                            lineNumber: 752,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                    lineNumber: 742,
                                    columnNumber: 17
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                    initial: {
                                        opacity: 0,
                                        scale: 0.95
                                    },
                                    animate: {
                                        opacity: 1,
                                        scale: 1
                                    },
                                    className: "glass-card p-8 text-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                                            size: 32,
                                            className: "text-green-400 mx-auto mb-3"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                            lineNumber: 800,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "text-xl font-medium mb-1",
                                            children: "Saved!"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                            lineNumber: 804,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-white/40 text-sm mb-6",
                                            children: saveChoice === "global" ? "Your results are now part of the global database." : "Your results are stored privately."
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                            lineNumber: 805,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/dashboard",
                                            className: "inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl transition-colors",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$column$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart3$3e$__["BarChart3"], {
                                                    size: 16
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                                    lineNumber: 814,
                                                    columnNumber: 21
                                                }, this),
                                                "View Dashboard"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                            lineNumber: 810,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                                    lineNumber: 795,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, "results", true, {
                            fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                            lineNumber: 671,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                    lineNumber: 278,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                lineNumber: 277,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
        lineNumber: 214,
        columnNumber: 5
    }, this);
}
_s(ReactionPage, "YmGCdpz8si77K7u4II1vgssHdtQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$components$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"]
    ];
});
_c = ReactionPage;
// ── Helper: Interpolate expected outputs ──
function interpolateExpected(points, timeSeconds) {
    if (timeSeconds <= points[0].time_seconds) return points[0];
    if (timeSeconds >= points[points.length - 1].time_seconds) return points[points.length - 1];
    for(let i = 0; i < points.length - 1; i++){
        if (timeSeconds >= points[i].time_seconds && timeSeconds <= points[i + 1].time_seconds) {
            const range = points[i + 1].time_seconds - points[i].time_seconds;
            const fraction = (timeSeconds - points[i].time_seconds) / range;
            const lerp = (a, b)=>a + (b - a) * fraction;
            return {
                time_seconds: timeSeconds,
                mq6_ppm: lerp(points[i].mq6_ppm, points[i + 1].mq6_ppm),
                mq7_ppm: lerp(points[i].mq7_ppm, points[i + 1].mq7_ppm),
                temp_celsius: lerp(points[i].temp_celsius, points[i + 1].temp_celsius),
                humidity: lerp(points[i].humidity, points[i + 1].humidity)
            };
        }
    }
    return points[points.length - 1];
}
function MiniChart({ expected, actual, field, color }) {
    const maxTime = expected[expected.length - 1].time_seconds;
    const allVals = [
        ...expected.map((e)=>e[field]),
        ...actual.map((a)=>a[field])
    ];
    const maxVal = Math.max(...allVals) * 1.1 || 1;
    const toX = (t)=>`${t / maxTime * 100}`;
    const toY = (v)=>`${100 - v / maxVal * 100}`;
    const expectedPath = expected.map((p, i)=>`${i === 0 ? "M" : "L"}${toX(p.time_seconds)},${toY(p[field])}`).join(" ");
    const actualPath = actual.map((p, i)=>`${i === 0 ? "M" : "L"}${toX(p.time_seconds)},${toY(p[field])}`).join(" ");
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        viewBox: "0 0 100 100",
        preserveAspectRatio: "none",
        className: "w-full h-full",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: expectedPath,
                fill: "none",
                stroke: "rgba(255,255,255,0.15)",
                strokeWidth: "1.5",
                vectorEffect: "non-scaling-stroke",
                strokeDasharray: "4 4"
            }, void 0, false, {
                fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                lineNumber: 890,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: actualPath,
                fill: "none",
                stroke: color,
                strokeWidth: "2",
                vectorEffect: "non-scaling-stroke"
            }, void 0, false, {
                fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                lineNumber: 898,
                columnNumber: 7
            }, this),
            actual.length > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: `${actualPath} L${toX(actual[actual.length - 1].time_seconds)},100 L${toX(actual[0].time_seconds)},100 Z`,
                fill: color.replace(/[\d.]+\)$/, "0.1)")
            }, void 0, false, {
                fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
                lineNumber: 906,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/flask/app/reaction/[id]/page.tsx",
        lineNumber: 889,
        columnNumber: 5
    }, this);
}
_c1 = MiniChart;
var _c, _c1;
__turbopack_context__.k.register(_c, "ReactionPage");
__turbopack_context__.k.register(_c1, "MiniChart");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=Desktop_flask_be5d7466._.js.map