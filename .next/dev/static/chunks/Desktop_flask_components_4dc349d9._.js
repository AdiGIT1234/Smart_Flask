(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Desktop/flask/components/DashboardSection.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DashboardSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Desktop/flask/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/flask/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/flask/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/flask/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/flask/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
/* eslint-disable @typescript-eslint/no-unused-vars */ "use client";
;
;
function DashboardSection() {
    _s();
    const [data, setData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isSimulatingLeak, setIsSimulatingLeak] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [history, setHistory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    // Simulation logic: fetch data every 2 seconds
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DashboardSection.useEffect": ()=>{
            const interval = setInterval({
                "DashboardSection.useEffect.interval": async ()=>{
                    // 1. Generate realistic synthetic sensor data matching the Safe dataset
                    let mq6 = Math.random() * 90 + 260; // 260-350 ppm
                    let mq7 = Math.random() < 0.9 ? 1 : 0; // mostly 1 (based on dataset)
                    let temp = Math.random() * 1.5 + 28.2; // 28.2-29.7 C
                    let hum = Math.random() * 7 + 56; // 56-63 %
                    // Inject Danger/Spikes if user clicks "Simulate Leak"
                    if (isSimulatingLeak) {
                        mq6 = Math.random() * 150 + 450; // 450-600 ppm (Danger)
                        mq7 = 0; // predominantly 0 in the Danger range of dataset
                        temp = Math.random() * 3 + 31.0; // 31.0-34.0 C (Danger)
                        hum = Math.random() * 13 + 33; // 33-46 % (Danger)
                    }
                    // 2. Post to our new Flask ML API (Environment Variable pointing to Render.com URL if available)
                    try {
                        const apiUrl = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_API_URL || "http://localhost:5001";
                        const res = await fetch(`${apiUrl}/predict`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                mq6_gas: mq6,
                                mq7_gas: mq7,
                                temperature: temp,
                                humidity: hum
                            })
                        });
                        const result = await res.json();
                        setData(result);
                        // Keep last 20 logs for the dashboard chart and feed
                        setHistory({
                            "DashboardSection.useEffect.interval": (prev)=>{
                                const updated = [
                                    result,
                                    ...prev
                                ];
                                if (updated.length > 20) return updated.slice(0, 20);
                                return updated;
                            }
                        }["DashboardSection.useEffect.interval"]);
                    } catch (err) {
                        console.error("ML Backend disconnected:", err);
                    }
                }
            }["DashboardSection.useEffect.interval"], 2000);
            return ({
                "DashboardSection.useEffect": ()=>clearInterval(interval)
            })["DashboardSection.useEffect"];
        }
    }["DashboardSection.useEffect"], [
        isSimulatingLeak
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "min-h-screen bg-[#050505] text-white pt-24 pb-48 px-6 md:px-12 lg:px-24",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-7xl mx-auto",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                initial: {
                    opacity: 0,
                    y: 40
                },
                whileInView: {
                    opacity: 1,
                    y: 0
                },
                viewport: {
                    once: true,
                    margin: "-100px"
                },
                transition: {
                    duration: 0.8,
                    ease: "easeOut"
                },
                className: "grid grid-cols-1 lg:grid-cols-3 gap-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "lg:col-span-3 mb-10 flex flex-col md:flex-row justify-between items-center md:items-start text-center md:text-left gap-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-3xl md:text-5xl font-medium tracking-tight text-white/90 mb-4",
                                        children: "Intelligence in Action"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/flask/components/DashboardSection.tsx",
                                        lineNumber: 91,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-lg text-white/50 max-w-2xl",
                                        children: "Live streaming Random Forest Classification mapped directly to our ESP32 ML API. Anomalies are detected instantly."
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/flask/components/DashboardSection.tsx",
                                        lineNumber: 94,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/flask/components/DashboardSection.tsx",
                                lineNumber: 90,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setIsSimulatingLeak(!isSimulatingLeak),
                                className: `px-6 py-3 rounded-full font-semibold transition-all shadow-lg text-sm shrink-0 mt-4 md:mt-0 ${isSimulatingLeak ? 'bg-red-600 hover:bg-red-500 shadow-red-500/50 text-white' : 'bg-white/10 hover:bg-white/20 text-white'}`,
                                children: isSimulatingLeak ? 'Stop Leak Simulation' : 'Simulate Hardware Leak'
                            }, void 0, false, {
                                fileName: "[project]/Desktop/flask/components/DashboardSection.tsx",
                                lineNumber: 98,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/flask/components/DashboardSection.tsx",
                        lineNumber: 89,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `lg:col-span-3 p-6 rounded-2xl border transition-all duration-500 flex items-center justify-between ${data?.status_label === 'Danger' ? 'bg-red-900/20 border-red-500/50 shadow-[0_0_40px_rgba(239,68,68,0.2)]' : data?.status_label === 'Warning' ? 'bg-amber-900/20 border-amber-500/50 shadow-[0_0_40px_rgba(245,158,11,0.2)]' : 'bg-emerald-900/20 border-emerald-500/50 shadow-[0_0_40px_rgba(16,185,129,0.1)]'}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: `w-5 h-5 rounded-full ${data?.status_label === 'Danger' ? 'bg-red-500 animate-pulse' : data?.status_label === 'Warning' ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'}`
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/flask/components/DashboardSection.tsx",
                                                lineNumber: 110,
                                                columnNumber: 20
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: `absolute inset-0 rounded-full animate-ping opacity-75 ${data?.status_label === 'Danger' ? 'bg-red-500' : data?.status_label === 'Warning' ? 'bg-amber-500' : 'bg-emerald-500'}`
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/flask/components/DashboardSection.tsx",
                                                lineNumber: 111,
                                                columnNumber: 20
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/flask/components/DashboardSection.tsx",
                                        lineNumber: 109,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: `text-xl font-bold uppercase ${data?.status_label === 'Danger' ? 'text-red-400' : data?.status_label === 'Warning' ? 'text-amber-400' : 'text-emerald-400'}`,
                                            children: [
                                                "STATUS: ",
                                                data?.status_label || 'SYSTEM NORMAL'
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/flask/components/DashboardSection.tsx",
                                            lineNumber: 114,
                                            columnNumber: 20
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/flask/components/DashboardSection.tsx",
                                        lineNumber: 113,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/flask/components/DashboardSection.tsx",
                                lineNumber: 108,
                                columnNumber: 14
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-right",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs tracking-widest text-gray-500 uppercase",
                                        children: "ML Confidence"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/flask/components/DashboardSection.tsx",
                                        lineNumber: 120,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "font-mono text-lg",
                                        children: data?.anomaly_score !== undefined ? (data.anomaly_score * 100).toFixed(1) + '%' : '100%'
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/flask/components/DashboardSection.tsx",
                                        lineNumber: 121,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/flask/components/DashboardSection.tsx",
                                lineNumber: 119,
                                columnNumber: 14
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/flask/components/DashboardSection.tsx",
                        lineNumber: 107,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col gap-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Card, {
                                title: "MQ6 Gas (LPG)",
                                value: data?.sensor_data?.mq6_gas?.toFixed(1) ?? "--",
                                unit: "ppm",
                                accent: isSimulatingLeak ? "glow-red" : "glow-blue",
                                change: "--"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/flask/components/DashboardSection.tsx",
                                lineNumber: 127,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Card, {
                                title: "Core Temp",
                                value: data?.sensor_data?.temperature?.toFixed(1) ?? "--",
                                unit: "°C",
                                accent: isSimulatingLeak ? "glow-red" : "glow-amber",
                                change: "--"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/flask/components/DashboardSection.tsx",
                                lineNumber: 128,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `glass-card p-6 flex flex-col gap-4 relative overflow-hidden group`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: `absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl transition-all duration-700 ${data?.status_label === 'Danger' ? 'bg-red-500/20 group-hover:bg-red-500/30' : data?.status_label === 'Warning' ? 'bg-amber-500/20 group-hover:bg-amber-500/30' : 'bg-green-500/10 group-hover:bg-green-500/20'}`
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/flask/components/DashboardSection.tsx",
                                        lineNumber: 132,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex justify-between items-start z-10",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-sm font-medium tracking-wide text-white/50 uppercase",
                                                children: "ML Diagnosis"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/flask/components/DashboardSection.tsx",
                                                lineNumber: 134,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: `flex items-center gap-2 text-xs font-semibold px-2 py-1 rounded-full ${data?.status_label === 'Danger' ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: `w-1.5 h-1.5 rounded-full pulse-dot ${data?.status_label === 'Danger' ? 'bg-red-400' : 'bg-green-400'}`
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/flask/components/DashboardSection.tsx",
                                                        lineNumber: 138,
                                                        columnNumber: 19
                                                    }, this),
                                                    " Live"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/flask/components/DashboardSection.tsx",
                                                lineNumber: 137,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/flask/components/DashboardSection.tsx",
                                        lineNumber: 133,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col z-10",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: `text-3xl font-medium tracking-tight mb-1 ${data?.status_label === 'Danger' ? 'text-red-400' : data?.status_label === 'Warning' ? 'text-amber-400' : 'text-green-400'}`,
                                                children: data?.status_label || '--'
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/flask/components/DashboardSection.tsx",
                                                lineNumber: 142,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-3 mt-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: `h-full transition-all duration-300 ${data?.status_label === 'Danger' ? 'bg-red-400' : 'bg-green-400'}`,
                                                            style: {
                                                                width: `${data?.anomaly_score !== undefined ? data.anomaly_score * 100 : 100}%`
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/flask/components/DashboardSection.tsx",
                                                            lineNumber: 147,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/flask/components/DashboardSection.tsx",
                                                        lineNumber: 146,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-sm text-white/70 font-mono",
                                                        children: [
                                                            data?.anomaly_score !== undefined ? (data.anomaly_score * 100).toFixed(0) : '100',
                                                            "% Conf."
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Desktop/flask/components/DashboardSection.tsx",
                                                        lineNumber: 152,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/flask/components/DashboardSection.tsx",
                                                lineNumber: 145,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/flask/components/DashboardSection.tsx",
                                        lineNumber: 141,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/flask/components/DashboardSection.tsx",
                                lineNumber: 131,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/flask/components/DashboardSection.tsx",
                        lineNumber: 126,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "lg:col-span-2 glass-card p-8 flex flex-col relative overflow-hidden group",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute top-0 left-1/4 w-64 h-64 bg-violet-600/10 rounded-full blur-[100px] group-hover:bg-violet-600/20 transition-all duration-1000"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/flask/components/DashboardSection.tsx",
                                lineNumber: 160,
                                columnNumber: 14
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between items-center mb-8",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                        className: "text-lg font-medium tracking-wide text-white/80",
                                        children: "Reaction Dynamics timeline"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/flask/components/DashboardSection.tsx",
                                        lineNumber: 163,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex gap-4 text-xs font-medium text-white/50",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "w-2 h-2 rounded-full bg-blue-500"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/flask/components/DashboardSection.tsx",
                                                        lineNumber: 167,
                                                        columnNumber: 59
                                                    }, this),
                                                    " Gas"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/flask/components/DashboardSection.tsx",
                                                lineNumber: 167,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "w-2 h-2 rounded-full bg-amber-500"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/flask/components/DashboardSection.tsx",
                                                        lineNumber: 168,
                                                        columnNumber: 59
                                                    }, this),
                                                    " Temp"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/flask/components/DashboardSection.tsx",
                                                lineNumber: 168,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/flask/components/DashboardSection.tsx",
                                        lineNumber: 166,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/flask/components/DashboardSection.tsx",
                                lineNumber: 162,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1 min-h-[300px] w-full chart-grid rounded-lg border border-white/5 relative flex items-end",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        className: "absolute inset-0 w-full h-full preserve-3d",
                                        viewBox: "0 10 100 100",
                                        preserveAspectRatio: "none",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                d: (()=>{
                                                    if (history.length === 0) return "M0,100 L100,100";
                                                    const pts = [
                                                        ...history
                                                    ].reverse();
                                                    if (pts.length === 1) return `M0,${100 - (pts[0].sensor_data.temperature - 26) / 10 * 100} L100,${100 - (pts[0].sensor_data.temperature - 26) / 10 * 100}`;
                                                    return "M" + pts.map((d, i)=>`${i / (pts.length - 1) * 100},${Math.max(0, Math.min(100, 100 - (d.sensor_data.temperature - 26) / 10 * 100))}`).join(" L");
                                                })(),
                                                fill: "none",
                                                stroke: "currentColor",
                                                strokeWidth: "2",
                                                className: "text-amber-500/80 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)] transition-all duration-300",
                                                vectorEffect: "non-scaling-stroke",
                                                style: {
                                                    strokeLinejoin: "round",
                                                    strokeLinecap: "round"
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/flask/components/DashboardSection.tsx",
                                                lineNumber: 177,
                                                columnNumber: 18
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                d: (()=>{
                                                    if (history.length === 0) return "M0,100 L100,100 Z";
                                                    const pts = [
                                                        ...history
                                                    ].reverse();
                                                    if (pts.length === 1) return `M0,${100 - (pts[0].sensor_data.temperature - 26) / 10 * 100} L100,${100 - (pts[0].sensor_data.temperature - 26) / 10 * 100} L100,110 L0,110 Z`;
                                                    return "M" + pts.map((d, i)=>`${i / (pts.length - 1) * 100},${Math.max(0, Math.min(100, 100 - (d.sensor_data.temperature - 26) / 10 * 100))}`).join(" L") + " L100,110 L0,110 Z";
                                                })(),
                                                fill: "url(#amber-gradient)",
                                                className: "opacity-20 transition-all duration-300"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/flask/components/DashboardSection.tsx",
                                                lineNumber: 192,
                                                columnNumber: 18
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("linearGradient", {
                                                id: "amber-gradient",
                                                x1: "0",
                                                y1: "0",
                                                x2: "0",
                                                y2: "1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                                        offset: "0%",
                                                        stopColor: "#f59e0b",
                                                        stopOpacity: "1"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/flask/components/DashboardSection.tsx",
                                                        lineNumber: 203,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                                        offset: "100%",
                                                        stopColor: "#f59e0b",
                                                        stopOpacity: "0"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/flask/components/DashboardSection.tsx",
                                                        lineNumber: 204,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/flask/components/DashboardSection.tsx",
                                                lineNumber: 202,
                                                columnNumber: 18
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/flask/components/DashboardSection.tsx",
                                        lineNumber: 176,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        className: "absolute inset-0 w-full h-full preserve-3d",
                                        viewBox: "0 10 100 100",
                                        preserveAspectRatio: "none",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                d: (()=>{
                                                    if (history.length === 0) return "M0,100 L100,100";
                                                    const pts = [
                                                        ...history
                                                    ].reverse();
                                                    if (pts.length === 1) return `M0,${100 - (pts[0].sensor_data.mq6_gas - 200) / 450 * 100} L100,${100 - (pts[0].sensor_data.mq6_gas - 200) / 450 * 100}`;
                                                    return "M" + pts.map((d, i)=>`${i / (pts.length - 1) * 100},${Math.max(0, Math.min(100, 100 - (d.sensor_data.mq6_gas - 200) / 450 * 100))}`).join(" L");
                                                })(),
                                                fill: "none",
                                                stroke: "currentColor",
                                                strokeWidth: "2.5",
                                                className: "text-blue-500 drop-shadow-[0_0_8px_rgba(59,130,246,0.6)] transition-all duration-300",
                                                vectorEffect: "non-scaling-stroke",
                                                style: {
                                                    strokeLinejoin: "round",
                                                    strokeLinecap: "round"
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/flask/components/DashboardSection.tsx",
                                                lineNumber: 210,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                d: (()=>{
                                                    if (history.length === 0) return "M0,100 L100,100 Z";
                                                    const pts = [
                                                        ...history
                                                    ].reverse();
                                                    if (pts.length === 1) return `M0,${100 - (pts[0].sensor_data.mq6_gas - 200) / 450 * 100} L100,${100 - (pts[0].sensor_data.mq6_gas - 200) / 450 * 100} L100,110 L0,110 Z`;
                                                    return "M" + pts.map((d, i)=>`${i / (pts.length - 1) * 100},${Math.max(0, Math.min(100, 100 - (d.sensor_data.mq6_gas - 200) / 450 * 100))}`).join(" L") + " L100,110 L0,110 Z";
                                                })(),
                                                fill: "url(#blue-gradient)",
                                                className: "opacity-20 transition-all duration-300"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/flask/components/DashboardSection.tsx",
                                                lineNumber: 225,
                                                columnNumber: 18
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("linearGradient", {
                                                id: "blue-gradient",
                                                x1: "0",
                                                y1: "0",
                                                x2: "0",
                                                y2: "1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                                        offset: "0%",
                                                        stopColor: "#3b82f6",
                                                        stopOpacity: "1"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/flask/components/DashboardSection.tsx",
                                                        lineNumber: 236,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                                        offset: "100%",
                                                        stopColor: "#3b82f6",
                                                        stopOpacity: "0"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/flask/components/DashboardSection.tsx",
                                                        lineNumber: 237,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/flask/components/DashboardSection.tsx",
                                                lineNumber: 235,
                                                columnNumber: 18
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/flask/components/DashboardSection.tsx",
                                        lineNumber: 209,
                                        columnNumber: 15
                                    }, this),
                                    history.some((log)=>log.is_anomaly) && (()=>{
                                        const pts = [
                                            ...history
                                        ].reverse();
                                        const spikeIndex = pts.findIndex((log)=>log.is_anomaly);
                                        if (spikeIndex !== -1 && pts.length > 1) {
                                            const xPercent = spikeIndex / (pts.length - 1) * 100;
                                            const yVal = 100 - (pts[spikeIndex].sensor_data.mq6_gas - 200) / 450 * 100;
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                                initial: {
                                                    opacity: 0,
                                                    scale: 0
                                                },
                                                animate: {
                                                    opacity: 1,
                                                    scale: 1
                                                },
                                                className: "absolute w-3 h-3 bg-white rounded-full glow-blue translate-x-[-50%] translate-y-[-50%] z-20",
                                                style: {
                                                    left: `${xPercent}%`,
                                                    top: `calc(${Math.max(10, Math.min(90, yVal))}% + 10px)`
                                                },
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "absolute top-[-30px] left-[50%] bg-blue-500/10 border border-blue-500/30 text-blue-300 text-[10px] px-2 py-0.5 rounded backdrop-blur-md -translate-x-1/2 whitespace-nowrap",
                                                    children: "Spike"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/flask/components/DashboardSection.tsx",
                                                    lineNumber: 255,
                                                    columnNumber: 26
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/flask/components/DashboardSection.tsx",
                                                lineNumber: 249,
                                                columnNumber: 23
                                            }, this);
                                        }
                                        return null;
                                    })()
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/flask/components/DashboardSection.tsx",
                                lineNumber: 173,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between w-full mt-4 text-xs font-mono text-white/30 px-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "00:00"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/flask/components/DashboardSection.tsx",
                                        lineNumber: 267,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "15:00"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/flask/components/DashboardSection.tsx",
                                        lineNumber: 268,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "30:00"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/flask/components/DashboardSection.tsx",
                                        lineNumber: 269,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "45:00"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/flask/components/DashboardSection.tsx",
                                        lineNumber: 270,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "60:00"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/flask/components/DashboardSection.tsx",
                                        lineNumber: 271,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/flask/components/DashboardSection.tsx",
                                lineNumber: 266,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/flask/components/DashboardSection.tsx",
                        lineNumber: 159,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-8 mt-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "glass-card p-6 border-l-4 border-l-violet-500",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                        className: "text-sm font-medium tracking-wide text-white/70 mb-4 uppercase",
                                        children: "Automated Reaction Log"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/flask/components/DashboardSection.tsx",
                                        lineNumber: 280,
                                        columnNumber: 16
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col gap-3 font-mono text-xs text-white/60",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                            children: [
                                                history.slice(0, 4).map((log, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                                        initial: {
                                                            opacity: 0,
                                                            x: -10
                                                        },
                                                        animate: {
                                                            opacity: 1,
                                                            x: 0
                                                        },
                                                        className: "flex gap-4 p-2 rounded bg-white/5",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-white/30 shrink-0",
                                                                children: [
                                                                    "T-",
                                                                    i * 2,
                                                                    "s"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Desktop/flask/components/DashboardSection.tsx",
                                                                lineNumber: 290,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: `font-semibold shrink-0 ${log.status_label === 'Danger' ? 'text-red-400' : log.status_label === 'Warning' ? 'text-amber-400' : 'text-blue-400'}`,
                                                                children: [
                                                                    "[",
                                                                    log.status_label.toUpperCase(),
                                                                    "]"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Desktop/flask/components/DashboardSection.tsx",
                                                                lineNumber: 291,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "flex-1 truncate",
                                                                children: [
                                                                    "MQ6: ",
                                                                    log.sensor_data.mq6_gas.toFixed(0),
                                                                    "ppm | TMP: ",
                                                                    log.sensor_data.temperature.toFixed(1),
                                                                    "°C"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Desktop/flask/components/DashboardSection.tsx",
                                                                lineNumber: 294,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, i + log.sensor_data.mq6_gas, true, {
                                                        fileName: "[project]/Desktop/flask/components/DashboardSection.tsx",
                                                        lineNumber: 284,
                                                        columnNumber: 22
                                                    }, this)),
                                                history.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-white/30 p-2",
                                                    children: "Waiting for first classification..."
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/flask/components/DashboardSection.tsx",
                                                    lineNumber: 300,
                                                    columnNumber: 22
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/flask/components/DashboardSection.tsx",
                                            lineNumber: 282,
                                            columnNumber: 18
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/flask/components/DashboardSection.tsx",
                                        lineNumber: 281,
                                        columnNumber: 16
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/flask/components/DashboardSection.tsx",
                                lineNumber: 279,
                                columnNumber: 14
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "glass-card p-6 flex items-center justify-between",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                className: "text-sm font-medium tracking-wide text-white/70 mb-2 uppercase",
                                                children: "Global Intel"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/flask/components/DashboardSection.tsx",
                                                lineNumber: 309,
                                                columnNumber: 20
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm text-white/40",
                                                children: "Shared insights from connected labs"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/flask/components/DashboardSection.tsx",
                                                lineNumber: 310,
                                                columnNumber: 20
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/flask/components/DashboardSection.tsx",
                                        lineNumber: 308,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-right",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-3xl font-light text-white/90",
                                                children: [
                                                    "12.4",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-lg text-white/40 ml-1",
                                                        children: "k"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/flask/components/DashboardSection.tsx",
                                                        lineNumber: 314,
                                                        columnNumber: 26
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/flask/components/DashboardSection.tsx",
                                                lineNumber: 313,
                                                columnNumber: 20
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-xs text-green-400 mt-1",
                                                children: "Reactions Analyzed Today"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/flask/components/DashboardSection.tsx",
                                                lineNumber: 316,
                                                columnNumber: 20
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/flask/components/DashboardSection.tsx",
                                        lineNumber: 312,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/flask/components/DashboardSection.tsx",
                                lineNumber: 307,
                                columnNumber: 14
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/flask/components/DashboardSection.tsx",
                        lineNumber: 277,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/flask/components/DashboardSection.tsx",
                lineNumber: 81,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/Desktop/flask/components/DashboardSection.tsx",
            lineNumber: 80,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Desktop/flask/components/DashboardSection.tsx",
        lineNumber: 79,
        columnNumber: 5
    }, this);
}
_s(DashboardSection, "ox6QDI6Ed/9WaQmS5PBpFTww6/Q=");
_c = DashboardSection;
// Reusable card component
function Card({ title, value, unit, change, accent }) {
    const isPositive = change.startsWith("+");
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `glass-card p-6 flex flex-col gap-2 relative overflow-hidden group glass-card-hover transition-all duration-300`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `absolute -right-12 -top-12 w-32 h-32 rounded-full blur-[60px] opacity-20 group-hover:opacity-40 transition-opacity duration-500 bg-current text-${accent.split('-')[1]}-500`
            }, void 0, false, {
                fileName: "[project]/Desktop/flask/components/DashboardSection.tsx",
                lineNumber: 344,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-sm font-medium tracking-wide text-white/50 uppercase z-10",
                children: title
            }, void 0, false, {
                fileName: "[project]/Desktop/flask/components/DashboardSection.tsx",
                lineNumber: 346,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-end gap-2 drop-shadow-lg z-10 mt-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: `text-5xl font-medium tracking-tighter text-white ${accent}`,
                        children: value
                    }, void 0, false, {
                        fileName: "[project]/Desktop/flask/components/DashboardSection.tsx",
                        lineNumber: 351,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-xl text-white/40 mb-1",
                        children: unit
                    }, void 0, false, {
                        fileName: "[project]/Desktop/flask/components/DashboardSection.tsx",
                        lineNumber: 354,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/flask/components/DashboardSection.tsx",
                lineNumber: 350,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4 flex items-center gap-2 text-sm font-medium z-10",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: isPositive ? "text-red-400" : "text-green-400",
                        children: change
                    }, void 0, false, {
                        fileName: "[project]/Desktop/flask/components/DashboardSection.tsx",
                        lineNumber: 358,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-white/30 text-xs font-mono",
                        children: "from last hour"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/flask/components/DashboardSection.tsx",
                        lineNumber: 361,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/flask/components/DashboardSection.tsx",
                lineNumber: 357,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/flask/components/DashboardSection.tsx",
        lineNumber: 342,
        columnNumber: 5
    }, this);
}
_c1 = Card;
var _c, _c1;
__turbopack_context__.k.register(_c, "DashboardSection");
__turbopack_context__.k.register(_c1, "Card");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/flask/components/PreviousReadingsSection.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PreviousReadingsSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Desktop/flask/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/flask/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/flask/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/flask/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
/* eslint-disable react/jsx-no-comment-textnodes */ /* eslint-disable react/no-unescaped-entities */ "use client";
;
;
function PreviousReadingsSection() {
    _s();
    const [readings, setReadings] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PreviousReadingsSection.useEffect": ()=>{
            const apiUrl = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_API_URL || "http://localhost:5001";
            fetch(`${apiUrl}/history`).then({
                "PreviousReadingsSection.useEffect": (res)=>res.json()
            }["PreviousReadingsSection.useEffect"]).then({
                "PreviousReadingsSection.useEffect": (data)=>{
                    if (data.history) {
                        // Map to correct types and mix in mock timestamps/durations
                        const formatted = data.history.map({
                            "PreviousReadingsSection.useEffect.formatted": (h, i)=>{
                                // Because the dataset CSV lacks timestamps, we generate sequential recent times anchored to *right now* 
                                const readingDate = new Date(Date.now() - i * 45 * 60000); // Subtract 45 mins per row iteratively
                                return {
                                    id: h.id,
                                    date: readingDate.toLocaleString('en-US', {
                                        month: 'short',
                                        day: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    }),
                                    gasSpike: h.gasSpike,
                                    maxTemp: h.maxTemp,
                                    status: h.status,
                                    duration: `${45 + i % 15}m ${12 + i % 48}s` // Sequential static duration bounds, not purely random
                                };
                            }
                        }["PreviousReadingsSection.useEffect.formatted"]);
                        setReadings(formatted);
                    }
                }
            }["PreviousReadingsSection.useEffect"]).catch({
                "PreviousReadingsSection.useEffect": (err)=>console.error("Could not load history:", err)
            }["PreviousReadingsSection.useEffect"]).finally({
                "PreviousReadingsSection.useEffect": ()=>setLoading(false)
            }["PreviousReadingsSection.useEffect"]);
        }
    }["PreviousReadingsSection.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "bg-[#050505] text-white py-24 px-6 md:px-12 lg:px-24 border-t border-white/5 relative z-10",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-7xl mx-auto",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                initial: {
                    opacity: 0,
                    y: 40
                },
                whileInView: {
                    opacity: 1,
                    y: 0
                },
                viewport: {
                    once: true,
                    margin: "-100px"
                },
                transition: {
                    duration: 0.8,
                    ease: "easeOut"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col md:flex-row justify-between items-start md:items-end mb-12",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-3xl md:text-5xl font-medium tracking-tight text-white/90 mb-4",
                                        children: "Previous Readings"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/flask/components/PreviousReadingsSection.tsx",
                                        lineNumber: 58,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-lg text-white/50 max-w-2xl",
                                        children: "// eslint-disable-next-line react/no-unescaped-entities Historical records of your lab's syntheses and captured reaction data over time."
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/flask/components/PreviousReadingsSection.tsx",
                                        lineNumber: 61,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/flask/components/PreviousReadingsSection.tsx",
                                lineNumber: 57,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "mt-6 md:mt-0 px-6 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-sm font-medium transition-colors",
                                children: "Export All CSV"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/flask/components/PreviousReadingsSection.tsx",
                                lineNumber: 66,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/flask/components/PreviousReadingsSection.tsx",
                        lineNumber: 56,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "glass-card overflow-hidden",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "overflow-x-auto",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                    className: "w-full text-left text-sm whitespace-nowrap",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                className: "border-b border-white/5 text-white/40 uppercase tracking-widest text-[10px] md:text-xs",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "px-6 py-4 font-medium",
                                                        children: "Run ID"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/flask/components/PreviousReadingsSection.tsx",
                                                        lineNumber: 76,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "px-6 py-4 font-medium",
                                                        children: "Timestamp"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/flask/components/PreviousReadingsSection.tsx",
                                                        lineNumber: 77,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "px-6 py-4 font-medium",
                                                        children: "Gas Spike"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/flask/components/PreviousReadingsSection.tsx",
                                                        lineNumber: 78,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "px-6 py-4 font-medium",
                                                        children: "Max Temp"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/flask/components/PreviousReadingsSection.tsx",
                                                        lineNumber: 79,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "px-6 py-4 font-medium",
                                                        children: "Duration"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/flask/components/PreviousReadingsSection.tsx",
                                                        lineNumber: 80,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "px-6 py-4 font-medium text-right",
                                                        children: "Status"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/flask/components/PreviousReadingsSection.tsx",
                                                        lineNumber: 81,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/flask/components/PreviousReadingsSection.tsx",
                                                lineNumber: 75,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/flask/components/PreviousReadingsSection.tsx",
                                            lineNumber: 74,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                            className: "divide-y divide-white/5",
                                            children: loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    colSpan: 6,
                                                    className: "px-6 py-12 text-center text-white/40 border-b border-white/5",
                                                    children: "Loading historical datasets from ML Pipeline..."
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/flask/components/PreviousReadingsSection.tsx",
                                                    lineNumber: 87,
                                                    columnNumber: 24
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/flask/components/PreviousReadingsSection.tsx",
                                                lineNumber: 86,
                                                columnNumber: 21
                                            }, this) : readings.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    colSpan: 6,
                                                    className: "px-6 py-12 text-center text-white/40 border-b border-white/5",
                                                    children: "No synthesis history found."
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/flask/components/PreviousReadingsSection.tsx",
                                                    lineNumber: 91,
                                                    columnNumber: 24
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/flask/components/PreviousReadingsSection.tsx",
                                                lineNumber: 90,
                                                columnNumber: 21
                                            }, this) : readings.map((reading)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                    className: "hover:bg-white/2 transition-colors cursor-pointer group",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "px-6 py-5 font-mono text-blue-400 group-hover:text-amber-400 transition-colors",
                                                            children: reading.id
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/flask/components/PreviousReadingsSection.tsx",
                                                            lineNumber: 96,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "px-6 py-5 text-white/70",
                                                            children: reading.date
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/flask/components/PreviousReadingsSection.tsx",
                                                            lineNumber: 99,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "px-6 py-5 text-white/70",
                                                            children: reading.gasSpike
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/flask/components/PreviousReadingsSection.tsx",
                                                            lineNumber: 100,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "px-6 py-5 text-white/70",
                                                            children: reading.maxTemp
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/flask/components/PreviousReadingsSection.tsx",
                                                            lineNumber: 101,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "px-6 py-5 text-white/70",
                                                            children: reading.duration
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/flask/components/PreviousReadingsSection.tsx",
                                                            lineNumber: 102,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "px-6 py-5 text-right",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: `inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] md:text-xs font-medium border uppercase
                            ${reading.status === 'Safe' || reading.status === 'Nominal' ? 'bg-green-500/10 text-green-400 border-green-500/20' : ''}
                            ${reading.status === 'Warning' || reading.status === 'Anomalous' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : ''}
                            ${reading.status === 'Danger' || reading.status === 'Critical' ? 'bg-red-500/10 text-red-400 border-red-500/20' : ''}
                          `,
                                                                children: reading.status
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/flask/components/PreviousReadingsSection.tsx",
                                                                lineNumber: 104,
                                                                columnNumber: 27
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/flask/components/PreviousReadingsSection.tsx",
                                                            lineNumber: 103,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, reading.id, true, {
                                                    fileName: "[project]/Desktop/flask/components/PreviousReadingsSection.tsx",
                                                    lineNumber: 95,
                                                    columnNumber: 23
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/flask/components/PreviousReadingsSection.tsx",
                                            lineNumber: 84,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/flask/components/PreviousReadingsSection.tsx",
                                    lineNumber: 73,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Desktop/flask/components/PreviousReadingsSection.tsx",
                                lineNumber: 72,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "px-6 py-4 border-t border-white/5 bg-white/1 flex justify-center",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors",
                                    children: "Load More Records ↓"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/flask/components/PreviousReadingsSection.tsx",
                                    lineNumber: 120,
                                    columnNumber: 16
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Desktop/flask/components/PreviousReadingsSection.tsx",
                                lineNumber: 119,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/flask/components/PreviousReadingsSection.tsx",
                        lineNumber: 71,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/flask/components/PreviousReadingsSection.tsx",
                lineNumber: 50,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/Desktop/flask/components/PreviousReadingsSection.tsx",
            lineNumber: 49,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Desktop/flask/components/PreviousReadingsSection.tsx",
        lineNumber: 48,
        columnNumber: 5
    }, this);
}
_s(PreviousReadingsSection, "wHbIEmo3ZrnTf9O/9iumjgBW/dY=");
_c = PreviousReadingsSection;
var _c;
__turbopack_context__.k.register(_c, "PreviousReadingsSection");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=Desktop_flask_components_4dc349d9._.js.map