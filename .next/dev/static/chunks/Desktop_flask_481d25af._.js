(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Desktop/flask/components/FlaskScrollCanvas.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>FlaskScrollCanvas
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/flask/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/flask/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/flask/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$scroll$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/flask/node_modules/framer-motion/dist/es/value/use-scroll.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$spring$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/flask/node_modules/framer-motion/dist/es/value/use-spring.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/flask/node_modules/framer-motion/dist/es/value/use-transform.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
const TOTAL_FRAMES = 240;
function FlaskScrollCanvas() {
    _s();
    const [images, setImages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loadedFrames, setLoadedFrames] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [isLoaded, setIsLoaded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Preload frames
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FlaskScrollCanvas.useEffect": ()=>{
            let loadedCount = 0;
            const loadedImages = new Array(TOTAL_FRAMES);
            const preloadNextFrame = {
                "FlaskScrollCanvas.useEffect.preloadNextFrame": (index)=>{
                    if (index >= TOTAL_FRAMES) return;
                    const img = new Image();
                    // Format number to 3 digits e.g., 001, 045, 240
                    const formattedIndex = String(index + 1).padStart(3, "0");
                    img.src = `/sequence/ezgif-frame-${formattedIndex}.jpg`;
                    img.onload = ({
                        "FlaskScrollCanvas.useEffect.preloadNextFrame": ()=>{
                            loadedImages[index] = img;
                            loadedCount++;
                            setLoadedFrames(loadedCount);
                            if (loadedCount === TOTAL_FRAMES) {
                                setImages(loadedImages);
                                setTimeout({
                                    "FlaskScrollCanvas.useEffect.preloadNextFrame": ()=>setIsLoaded(true)
                                }["FlaskScrollCanvas.useEffect.preloadNextFrame"], 500); // Small delay for polish
                            }
                            // Preload next 5 chunks concurrently for speed
                            if (index + 5 < TOTAL_FRAMES) {
                                preloadNextFrame(index + 5);
                            }
                        }
                    })["FlaskScrollCanvas.useEffect.preloadNextFrame"];
                    img.onerror = ({
                        "FlaskScrollCanvas.useEffect.preloadNextFrame": ()=>{
                            // Fallback or retry logic if needed, but for now continue
                            loadedCount++;
                            setLoadedFrames(loadedCount);
                            if (loadedCount === TOTAL_FRAMES) {
                                setImages(loadedImages);
                                setIsLoaded(true);
                            }
                        }
                    })["FlaskScrollCanvas.useEffect.preloadNextFrame"];
                }
            }["FlaskScrollCanvas.useEffect.preloadNextFrame"];
            // Kickoff initial batch
            for(let i = 0; i < 5; i++){
                preloadNextFrame(i);
            }
            return ({
                "FlaskScrollCanvas.useEffect": ()=>{
                    // Cleanup
                    setImages([]);
                }
            })["FlaskScrollCanvas.useEffect"];
        }
    }["FlaskScrollCanvas.useEffect"], []);
    if (!isLoaded) {
        const progress = loadedFrames / TOTAL_FRAMES * 100;
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "fixed inset-0 bg-[#050505] flex flex-col items-center justify-center z-50",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col items-center gap-6 w-full max-w-md px-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        initial: {
                            opacity: 0
                        },
                        animate: {
                            opacity: 1
                        },
                        className: "w-16 h-16 border-t-2 border-r-2 border-blue-500 rounded-full animate-spin"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/flask/components/FlaskScrollCanvas.tsx",
                        lineNumber: 69,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-full h-px bg-white/10 relative overflow-hidden",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute top-0 left-0 h-full loader-bar transition-all duration-300 ease-out",
                            style: {
                                width: `${progress}%`
                            }
                        }, void 0, false, {
                            fileName: "[project]/Desktop/flask/components/FlaskScrollCanvas.tsx",
                            lineNumber: 75,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/flask/components/FlaskScrollCanvas.tsx",
                        lineNumber: 74,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between w-full text-xs font-medium tracking-widest text-white/40 uppercase",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "Loading Sequence"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/flask/components/FlaskScrollCanvas.tsx",
                                lineNumber: 81,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: [
                                    Math.round(progress),
                                    "%"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/flask/components/FlaskScrollCanvas.tsx",
                                lineNumber: 82,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/flask/components/FlaskScrollCanvas.tsx",
                        lineNumber: 80,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/flask/components/FlaskScrollCanvas.tsx",
                lineNumber: 68,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/Desktop/flask/components/FlaskScrollCanvas.tsx",
            lineNumber: 67,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ScrollSequence, {
        images: images
    }, void 0, false, {
        fileName: "[project]/Desktop/flask/components/FlaskScrollCanvas.tsx",
        lineNumber: 89,
        columnNumber: 10
    }, this);
}
_s(FlaskScrollCanvas, "fxY3587Xz8j5nPqSQv/KicldLYw=");
_c = FlaskScrollCanvas;
// Extracted into a separate component so that `useScroll` and `useTransform`
// only execute when the component is fully mounted and ready.
function ScrollSequence({ images }) {
    _s1();
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Scroll tracking
    const { scrollYProgress } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$scroll$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useScroll"])({
        target: containerRef,
        offset: [
            "start start",
            "end end"
        ]
    });
    // Smooth scroll progress
    const smoothProgress = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$spring$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSpring"])(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });
    // Frame rendering
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ScrollSequence.useEffect": ()=>{
            if (!images.length || !canvasRef.current) return;
            const canvas = canvasRef.current;
            const ctx = canvas.getContext("2d");
            if (!ctx) return;
            // Render function
            const renderFrame = {
                "ScrollSequence.useEffect.renderFrame": (progress)=>{
                    let frameIndex = Math.floor(progress * (TOTAL_FRAMES - 1));
                    // Clamp to ensure we don't go out of bounds
                    frameIndex = Math.max(0, Math.min(frameIndex, TOTAL_FRAMES - 1));
                    const img = images[frameIndex];
                    if (!img || !img.complete || img.naturalWidth === 0) return;
                    const parent = canvas.parentElement;
                    if (!parent) return;
                    const rect = parent.getBoundingClientRect();
                    // Clear canvas
                    ctx.clearRect(0, 0, rect.width, rect.height);
                    // Black background
                    ctx.fillStyle = "#050505";
                    ctx.fillRect(0, 0, rect.width, rect.height);
                    // Object fit: contain
                    const scale = Math.min(rect.width / img.naturalWidth, rect.height / img.naturalHeight);
                    const x = (rect.width - img.naturalWidth * scale) / 2;
                    const y = (rect.height - img.naturalHeight * scale) / 2;
                    ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight, x, y, img.naturalWidth * scale, img.naturalHeight * scale);
                }
            }["ScrollSequence.useEffect.renderFrame"];
            // Set canvas dimensions to parent, with device pixel ratio for retina
            const updateCanvasSize = {
                "ScrollSequence.useEffect.updateCanvasSize": ()=>{
                    const parent = canvas.parentElement;
                    if (!parent) return;
                    const dpr = window.devicePixelRatio || 1;
                    const rect = parent.getBoundingClientRect();
                    canvas.width = rect.width * dpr;
                    canvas.height = rect.height * dpr;
                    ctx.scale(dpr, dpr);
                    canvas.style.width = `${rect.width}px`;
                    canvas.style.height = `${rect.height}px`;
                    // Force initial render
                    renderFrame(smoothProgress.get());
                }
            }["ScrollSequence.useEffect.updateCanvasSize"];
            window.addEventListener("resize", updateCanvasSize);
            updateCanvasSize();
            // Subscribe to scroll progress
            const unsubscribe = smoothProgress.on("change", renderFrame);
            return ({
                "ScrollSequence.useEffect": ()=>{
                    window.removeEventListener("resize", updateCanvasSize);
                    unsubscribe();
                }
            })["ScrollSequence.useEffect"];
        }
    }["ScrollSequence.useEffect"], [
        images,
        smoothProgress
    ]);
    // Text Animations
    // Beat A: 0-20%
    const beatA_Opacity = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"])(smoothProgress, [
        0,
        0.05,
        0.15,
        0.2
    ], [
        0,
        1,
        1,
        0
    ]);
    const beatA_Y = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"])(smoothProgress, [
        0,
        0.05,
        0.15,
        0.2
    ], [
        20,
        0,
        0,
        -20
    ]);
    // Beat B: 25-45%
    const beatB_Opacity = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"])(smoothProgress, [
        0.25,
        0.3,
        0.4,
        0.45
    ], [
        0,
        1,
        1,
        0
    ]);
    const beatB_Y = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"])(smoothProgress, [
        0.25,
        0.3,
        0.4,
        0.45
    ], [
        20,
        0,
        0,
        -20
    ]);
    // Beat C: 50-70%
    const beatC_Opacity = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"])(smoothProgress, [
        0.5,
        0.55,
        0.65,
        0.7
    ], [
        0,
        1,
        1,
        0
    ]);
    const beatC_Y = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"])(smoothProgress, [
        0.5,
        0.55,
        0.65,
        0.7
    ], [
        20,
        0,
        0,
        -20
    ]);
    // Beat D: 75-95%
    const beatD_Opacity = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"])(smoothProgress, [
        0.75,
        0.8,
        0.9,
        0.95
    ], [
        0,
        1,
        1,
        0
    ]);
    const beatD_Y = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"])(smoothProgress, [
        0.75,
        0.8,
        0.9,
        0.95
    ], [
        20,
        0,
        0,
        -20
    ]);
    // CTA: 95-100%
    const cta_Opacity = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"])(smoothProgress, [
        0.95,
        0.98,
        1
    ], [
        0,
        1,
        1
    ]);
    const cta_Y = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"])(smoothProgress, [
        0.95,
        0.98,
        1
    ], [
        20,
        0,
        0
    ]);
    // Scroll Indicator
    const indicator_Opacity = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"])(smoothProgress, [
        0,
        0.1
    ], [
        1,
        0
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: containerRef,
        className: "relative h-[600vh] bg-[#050505]",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute inset-0 w-full h-full",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
                        ref: canvasRef,
                        className: "w-full h-full block"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/flask/components/FlaskScrollCanvas.tsx",
                        lineNumber: 216,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Desktop/flask/components/FlaskScrollCanvas.tsx",
                    lineNumber: 215,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-4 text-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            style: {
                                opacity: beatA_Opacity,
                                y: beatA_Y
                            },
                            className: "absolute inset-0 flex flex-col items-center justify-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: "text-5xl md:text-7xl lg:text-8xl font-medium tracking-tighter text-white/90 mb-4",
                                    children: "REAL-TIME CHEMISTRY"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/flask/components/FlaskScrollCanvas.tsx",
                                    lineNumber: 226,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xl md:text-2xl text-white/60 tracking-tight",
                                    children: "Every reaction. Captured. Instantly."
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/flask/components/FlaskScrollCanvas.tsx",
                                    lineNumber: 229,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/flask/components/FlaskScrollCanvas.tsx",
                            lineNumber: 222,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            style: {
                                opacity: beatB_Opacity,
                                y: beatB_Y
                            },
                            className: "absolute inset-0 flex flex-col items-center justify-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-5xl md:text-7xl lg:text-8xl font-medium tracking-tighter text-white/90 mb-4",
                                    children: "SEE THE INVISIBLE"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/flask/components/FlaskScrollCanvas.tsx",
                                    lineNumber: 239,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xl md:text-2xl text-white/60 tracking-tight",
                                    children: "Gas, temperature, and reaction dynamics in motion"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/flask/components/FlaskScrollCanvas.tsx",
                                    lineNumber: 242,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/flask/components/FlaskScrollCanvas.tsx",
                            lineNumber: 235,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            style: {
                                opacity: beatC_Opacity,
                                y: beatC_Y
                            },
                            className: "absolute inset-0 flex flex-col items-center justify-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-5xl md:text-7xl lg:text-8xl font-medium tracking-tighter text-white/90 mb-4 drop-shadow-[0_0_30px_rgba(59,130,246,0.3)]",
                                    children: "INTELLIGENCE BUILT IN"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/flask/components/FlaskScrollCanvas.tsx",
                                    lineNumber: 252,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xl md:text-2xl text-white/60 tracking-tight",
                                    children: "ML detects anomalies before you do"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/flask/components/FlaskScrollCanvas.tsx",
                                    lineNumber: 255,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/flask/components/FlaskScrollCanvas.tsx",
                            lineNumber: 248,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            style: {
                                opacity: beatD_Opacity,
                                y: beatD_Y
                            },
                            className: "absolute inset-0 flex flex-col items-center justify-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-5xl md:text-7xl lg:text-8xl font-medium tracking-tighter text-white/90 mb-4 drop-shadow-[0_0_30px_rgba(139,92,246,0.3)]",
                                    children: "PRECISION. SAFETY. CONTROL."
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/flask/components/FlaskScrollCanvas.tsx",
                                    lineNumber: 265,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xl md:text-2xl text-white/60 tracking-tight",
                                    children: "From lab experiment to verified insight"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/flask/components/FlaskScrollCanvas.tsx",
                                    lineNumber: 268,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/flask/components/FlaskScrollCanvas.tsx",
                            lineNumber: 261,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            style: {
                                opacity: cta_Opacity,
                                y: cta_Y
                            },
                            className: "absolute inset-0 flex flex-col items-center justify-center pb-24",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-5xl md:text-7xl lg:text-8xl font-medium tracking-tighter text-white/90 mb-6 drop-shadow-[0_0_30px_rgba(245,158,11,0.3)]",
                                    children: "START SMART EXPERIMENTATION"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/flask/components/FlaskScrollCanvas.tsx",
                                    lineNumber: 278,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xl md:text-2xl text-white/60 tracking-tight mb-12",
                                    children: "Experience the future of lab monitoring"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/flask/components/FlaskScrollCanvas.tsx",
                                    lineNumber: 281,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/flask/components/FlaskScrollCanvas.tsx",
                            lineNumber: 274,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/flask/components/FlaskScrollCanvas.tsx",
                    lineNumber: 220,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    style: {
                        opacity: indicator_Opacity
                    },
                    className: "absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 pointer-events-none",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-xs uppercase tracking-[0.2em] text-white/40",
                            children: "Scroll to Explore"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/flask/components/FlaskScrollCanvas.tsx",
                            lineNumber: 292,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-px h-12 bg-linear-to-b from-white/30 to-transparent relative overflow-hidden",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute top-0 left-0 w-full h-[30%] bg-white rounded-full animate-[scrolldown_1.5s_ease-in-out_infinite]"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/flask/components/FlaskScrollCanvas.tsx",
                                lineNumber: 294,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Desktop/flask/components/FlaskScrollCanvas.tsx",
                            lineNumber: 293,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/flask/components/FlaskScrollCanvas.tsx",
                    lineNumber: 288,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                    dangerouslySetInnerHTML: {
                        __html: `
          @keyframes scrolldown {
            0% { transform: translateY(-100%); opacity: 0; }
            50% { opacity: 1; }
            100% { transform: translateY(300%); opacity: 0; }
          }
        `
                    }
                }, void 0, false, {
                    fileName: "[project]/Desktop/flask/components/FlaskScrollCanvas.tsx",
                    lineNumber: 299,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Desktop/flask/components/FlaskScrollCanvas.tsx",
            lineNumber: 213,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Desktop/flask/components/FlaskScrollCanvas.tsx",
        lineNumber: 211,
        columnNumber: 5
    }, this);
}
_s1(ScrollSequence, "b9G+8WLBNUweO20s+IYJsKoDIHk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$scroll$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useScroll"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$spring$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSpring"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"]
    ];
});
_c1 = ScrollSequence;
var _c, _c1;
__turbopack_context__.k.register(_c, "FlaskScrollCanvas");
__turbopack_context__.k.register(_c1, "ScrollSequence");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/flask/components/ProblemStatementSection.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ProblemStatementSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/flask/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/flask/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
"use client";
;
;
function ProblemStatementSection() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "bg-[#050505] text-white py-32 px-6 md:px-12 lg:px-24 border-t border-white/5 relative z-10 overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none"
            }, void 0, false, {
                fileName: "[project]/Desktop/flask/components/ProblemStatementSection.tsx",
                lineNumber: 10,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-7xl mx-auto relative z-10",
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
                    className: "grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-blue-500 font-medium tracking-widest uppercase text-sm mb-4 block",
                                    children: "The Problem"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/flask/components/ProblemStatementSection.tsx",
                                    lineNumber: 22,
                                    columnNumber: 14
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-5xl md:text-6xl font-medium tracking-tighter text-white border-white mb-6 leading-[1.1]",
                                    children: [
                                        "Invisible variables ruin ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-white/50",
                                            children: "chemical synthesis"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/flask/components/ProblemStatementSection.tsx",
                                            lineNumber: 26,
                                            columnNumber: 42
                                        }, this),
                                        "."
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/flask/components/ProblemStatementSection.tsx",
                                    lineNumber: 25,
                                    columnNumber: 14
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-lg md:text-xl text-white/50 mb-8 font-light leading-relaxed",
                                    children: "Traditional lab sensors lag. By the time a thermistor detects an exothermic spike or pressure builds from unseen gas, your synthesis yield drops—or a safety hazard triggers. Real-time invisible variables dictate the purity of standard compounds."
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/flask/components/ProblemStatementSection.tsx",
                                    lineNumber: 28,
                                    columnNumber: 14
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col gap-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-start gap-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-12 h-12 rounded-full border border-red-500/20 bg-red-500/10 shrink-0 flex items-center justify-center glow-red",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-red-400 font-bold",
                                                        children: "!"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/flask/components/ProblemStatementSection.tsx",
                                                        lineNumber: 35,
                                                        columnNumber: 22
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/flask/components/ProblemStatementSection.tsx",
                                                    lineNumber: 34,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                            className: "text-xl font-medium text-white/90 mb-1 tracking-tight",
                                                            children: "Standard Sensor Lag"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/flask/components/ProblemStatementSection.tsx",
                                                            lineNumber: 38,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-white/50 text-sm",
                                                            children: "Hardware sensors delay structural readings by 3–15 seconds, creating dangerous blind spots during mixing."
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/flask/components/ProblemStatementSection.tsx",
                                                            lineNumber: 39,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Desktop/flask/components/ProblemStatementSection.tsx",
                                                    lineNumber: 37,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/flask/components/ProblemStatementSection.tsx",
                                            lineNumber: 33,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-start gap-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-12 h-12 rounded-full border border-blue-500/20 bg-blue-500/10 shrink-0 flex items-center justify-center glow-blue",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                        width: "20",
                                                        height: "20",
                                                        viewBox: "0 0 24 24",
                                                        fill: "none",
                                                        stroke: "currentColor",
                                                        strokeWidth: "2",
                                                        strokeLinecap: "round",
                                                        strokeLinejoin: "round",
                                                        className: "text-blue-400",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                d: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/flask/components/ProblemStatementSection.tsx",
                                                                lineNumber: 46,
                                                                columnNumber: 191
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                                cx: "12",
                                                                cy: "12",
                                                                r: "3"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/flask/components/ProblemStatementSection.tsx",
                                                                lineNumber: 46,
                                                                columnNumber: 253
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Desktop/flask/components/ProblemStatementSection.tsx",
                                                        lineNumber: 46,
                                                        columnNumber: 22
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/flask/components/ProblemStatementSection.tsx",
                                                    lineNumber: 44,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                            className: "text-xl font-medium text-white/90 mb-1 tracking-tight",
                                                            children: "Our Optical Intelligence"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/flask/components/ProblemStatementSection.tsx",
                                                            lineNumber: 49,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-white/50 text-sm",
                                                            children: "We use 120fps computer vision mixed with predictive ML to identify cavitation, gas buildup, and thermal gradients instantly."
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/flask/components/ProblemStatementSection.tsx",
                                                            lineNumber: 50,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Desktop/flask/components/ProblemStatementSection.tsx",
                                                    lineNumber: 48,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/flask/components/ProblemStatementSection.tsx",
                                            lineNumber: 43,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/flask/components/ProblemStatementSection.tsx",
                                    lineNumber: 32,
                                    columnNumber: 14
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/flask/components/ProblemStatementSection.tsx",
                            lineNumber: 21,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute inset-0 bg-linear-to-tr from-violet-600/20 to-blue-600/20 blur-[100px] rounded-full pointer-events-none"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/flask/components/ProblemStatementSection.tsx",
                                    lineNumber: 58,
                                    columnNumber: 14
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "glass-card p-6 relative z-10 overflow-hidden h-[500px] flex flex-col justify-between",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex justify-between items-center mb-6",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h5", {
                                                            className: "text-sm tracking-widest uppercase text-white/40",
                                                            children: "Real-Time Delta"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/flask/components/ProblemStatementSection.tsx",
                                                            lineNumber: 63,
                                                            columnNumber: 22
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex gap-2",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "w-2 h-2 rounded-full bg-red-500 animate-pulse"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/flask/components/ProblemStatementSection.tsx",
                                                                lineNumber: 65,
                                                                columnNumber: 25
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/flask/components/ProblemStatementSection.tsx",
                                                            lineNumber: 64,
                                                            columnNumber: 22
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Desktop/flask/components/ProblemStatementSection.tsx",
                                                    lineNumber: 62,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "space-y-4",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "w-full h-8 bg-white/5 rounded flex overflow-hidden group",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "h-full bg-red-500/50 w-[45%] flex pt-1 px-3",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-[10px] uppercase tracking-widest text-white/70",
                                                                        children: "Legacy Lag"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Desktop/flask/components/ProblemStatementSection.tsx",
                                                                        lineNumber: 73,
                                                                        columnNumber: 26
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/flask/components/ProblemStatementSection.tsx",
                                                                    lineNumber: 72,
                                                                    columnNumber: 24
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "h-full border-l border-red-500 w-[55%] bg-stripes opacity-20"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/flask/components/ProblemStatementSection.tsx",
                                                                    lineNumber: 75,
                                                                    columnNumber: 24
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Desktop/flask/components/ProblemStatementSection.tsx",
                                                            lineNumber: 71,
                                                            columnNumber: 22
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "w-full h-8 bg-white/5 rounded flex overflow-hidden",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "h-full bg-blue-500 glow-blue w-[12%] flex items-center pt-1 px-3 mt-1",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-[10px] uppercase font-bold tracking-widest text-white",
                                                                    children: "Smart Flask"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/flask/components/ProblemStatementSection.tsx",
                                                                    lineNumber: 80,
                                                                    columnNumber: 26
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/flask/components/ProblemStatementSection.tsx",
                                                                lineNumber: 79,
                                                                columnNumber: 24
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/flask/components/ProblemStatementSection.tsx",
                                                            lineNumber: 78,
                                                            columnNumber: 22
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Desktop/flask/components/ProblemStatementSection.tsx",
                                                    lineNumber: 70,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/flask/components/ProblemStatementSection.tsx",
                                            lineNumber: 61,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-full bg-[#0a0a0a] rounded-xl p-6 border border-white/10 mt-12 grid grid-cols-2 gap-4 relative",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "absolute top-0 right-0 w-24 h-24 bg-green-500/10 blur-[30px] rounded-full"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/flask/components/ProblemStatementSection.tsx",
                                                    lineNumber: 87,
                                                    columnNumber: 20
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-xs text-white/40 uppercase tracking-widest mb-1",
                                                            children: "Reaction Yield"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/flask/components/ProblemStatementSection.tsx",
                                                            lineNumber: 89,
                                                            columnNumber: 22
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-4xl text-white font-medium",
                                                            children: [
                                                                "+14",
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-xl text-green-400",
                                                                    children: "%"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/flask/components/ProblemStatementSection.tsx",
                                                                    lineNumber: 90,
                                                                    columnNumber: 72
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Desktop/flask/components/ProblemStatementSection.tsx",
                                                            lineNumber: 90,
                                                            columnNumber: 22
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Desktop/flask/components/ProblemStatementSection.tsx",
                                                    lineNumber: 88,
                                                    columnNumber: 20
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-xs text-white/40 uppercase tracking-widest mb-1",
                                                            children: "Safety Response"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/flask/components/ProblemStatementSection.tsx",
                                                            lineNumber: 93,
                                                            columnNumber: 22
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-4xl text-white font-medium",
                                                            children: [
                                                                "<10",
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-xl text-blue-400",
                                                                    children: "ms"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/flask/components/ProblemStatementSection.tsx",
                                                                    lineNumber: 94,
                                                                    columnNumber: 75
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Desktop/flask/components/ProblemStatementSection.tsx",
                                                            lineNumber: 94,
                                                            columnNumber: 22
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Desktop/flask/components/ProblemStatementSection.tsx",
                                                    lineNumber: 92,
                                                    columnNumber: 20
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/flask/components/ProblemStatementSection.tsx",
                                            lineNumber: 86,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/flask/components/ProblemStatementSection.tsx",
                                    lineNumber: 60,
                                    columnNumber: 14
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/flask/components/ProblemStatementSection.tsx",
                            lineNumber: 57,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/flask/components/ProblemStatementSection.tsx",
                    lineNumber: 13,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Desktop/flask/components/ProblemStatementSection.tsx",
                lineNumber: 12,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                dangerouslySetInnerHTML: {
                    __html: `
        .bg-stripes {
           background-image: repeating-linear-gradient(
             45deg,
             transparent,
             transparent 10px,
             rgba(255,255,255,0.1) 10px,
             rgba(255,255,255,0.1) 20px
           );
        }
      `
                }
            }, void 0, false, {
                fileName: "[project]/Desktop/flask/components/ProblemStatementSection.tsx",
                lineNumber: 103,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/flask/components/ProblemStatementSection.tsx",
        lineNumber: 7,
        columnNumber: 5
    }, this);
}
_c = ProblemStatementSection;
var _c;
__turbopack_context__.k.register(_c, "ProblemStatementSection");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
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
"[project]/Desktop/flask/components/StoredReactionsSection.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>StoredReactionsSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/flask/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/flask/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$lib$2f$reactions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/flask/lib/reactions.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/flask/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$beaker$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Beaker$3e$__ = __turbopack_context__.i("[project]/Desktop/flask/node_modules/lucide-react/dist/esm/icons/beaker.js [app-client] (ecmascript) <export default as Beaker>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/Desktop/flask/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__ = __turbopack_context__.i("[project]/Desktop/flask/node_modules/lucide-react/dist/esm/icons/zap.js [app-client] (ecmascript) <export default as Zap>");
"use client";
;
;
;
;
;
const difficultyColor = {
    Beginner: "text-green-400 border-green-500/30 bg-green-500/10",
    Intermediate: "text-amber-400 border-amber-500/30 bg-amber-500/10",
    Advanced: "text-red-400 border-red-500/30 bg-red-500/10"
};
function StoredReactionsSection() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "bg-[#050505] text-white py-32 px-6 md:px-12 lg:px-24 border-t border-white/5 relative z-10 overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute top-0 left-0 w-full h-full pointer-events-none",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-violet-600/5 blur-[150px] rounded-full"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/flask/components/StoredReactionsSection.tsx",
                        lineNumber: 19,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-600/5 blur-[120px] rounded-full"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/flask/components/StoredReactionsSection.tsx",
                        lineNumber: 20,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/flask/components/StoredReactionsSection.tsx",
                lineNumber: 18,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-7xl mx-auto relative z-10",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
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
                        className: "text-center mb-20",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-violet-400 font-medium tracking-widest uppercase text-sm mb-4 block",
                                children: "Experiments"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/flask/components/StoredReactionsSection.tsx",
                                lineNumber: 32,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-5xl md:text-6xl font-medium tracking-tighter text-white mb-6 leading-[1.1]",
                                children: [
                                    "Start a ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-white/50",
                                        children: "Reaction"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/flask/components/StoredReactionsSection.tsx",
                                        lineNumber: 36,
                                        columnNumber: 21
                                    }, this),
                                    "."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/flask/components/StoredReactionsSection.tsx",
                                lineNumber: 35,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-lg text-white/50 max-w-2xl mx-auto font-light",
                                children: "Choose from our library of pre-configured experiments with real-time monitoring, or create your own custom setup."
                            }, void 0, false, {
                                fileName: "[project]/Desktop/flask/components/StoredReactionsSection.tsx",
                                lineNumber: 38,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/flask/components/StoredReactionsSection.tsx",
                        lineNumber: 25,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
                        children: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$lib$2f$reactions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STORED_REACTIONS"].map((reaction, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                initial: {
                                    opacity: 0,
                                    y: 30
                                },
                                whileInView: {
                                    opacity: 1,
                                    y: 0
                                },
                                viewport: {
                                    once: true,
                                    margin: "-50px"
                                },
                                transition: {
                                    duration: 0.6,
                                    delay: index * 0.1,
                                    ease: "easeOut"
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: `/reaction/${reaction.id}`,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "glass-card glass-card-hover transition-all duration-500 overflow-hidden group cursor-pointer h-full flex flex-col relative",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: `h-1 w-full bg-linear-to-r ${reaction.thumbnail_color}`
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/flask/components/StoredReactionsSection.tsx",
                                                lineNumber: 60,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: `absolute top-0 right-0 w-40 h-40 bg-linear-to-br ${reaction.thumbnail_color} opacity-0 group-hover:opacity-10 blur-[60px] rounded-full transition-opacity duration-700 pointer-events-none`
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/flask/components/StoredReactionsSection.tsx",
                                                lineNumber: 65,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "p-6 flex flex-col flex-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex justify-between items-center mb-4",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-xs font-medium tracking-widest uppercase text-white/40",
                                                                children: reaction.category
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/flask/components/StoredReactionsSection.tsx",
                                                                lineNumber: 72,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: `text-[10px] font-semibold px-2 py-0.5 rounded-full border ${difficultyColor[reaction.difficulty]}`,
                                                                children: reaction.difficulty
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/flask/components/StoredReactionsSection.tsx",
                                                                lineNumber: 75,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Desktop/flask/components/StoredReactionsSection.tsx",
                                                        lineNumber: 71,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "text-xl font-medium tracking-tight text-white/90 mb-2 group-hover:text-white transition-colors",
                                                        children: reaction.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/flask/components/StoredReactionsSection.tsx",
                                                        lineNumber: 85,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-sm font-mono text-white/40 mb-4 group-hover:text-white/60 transition-colors",
                                                        children: reaction.formula
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/flask/components/StoredReactionsSection.tsx",
                                                        lineNumber: 90,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex-1"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/flask/components/StoredReactionsSection.tsx",
                                                        lineNumber: 95,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-4 text-xs text-white/40 mt-4 pt-4 border-t border-white/5",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "flex items-center gap-1.5",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                                                        size: 12
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Desktop/flask/components/StoredReactionsSection.tsx",
                                                                        lineNumber: 100,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    reaction.duration_minutes,
                                                                    " min"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Desktop/flask/components/StoredReactionsSection.tsx",
                                                                lineNumber: 99,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "flex items-center gap-1.5",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$beaker$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Beaker$3e$__["Beaker"], {
                                                                        size: 12
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Desktop/flask/components/StoredReactionsSection.tsx",
                                                                        lineNumber: 104,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    reaction.chemicals.length,
                                                                    " chemicals"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Desktop/flask/components/StoredReactionsSection.tsx",
                                                                lineNumber: 103,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "flex items-center gap-1.5",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__["Zap"], {
                                                                        size: 12
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Desktop/flask/components/StoredReactionsSection.tsx",
                                                                        lineNumber: 108,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    reaction.steps.length,
                                                                    " steps"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Desktop/flask/components/StoredReactionsSection.tsx",
                                                                lineNumber: 107,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Desktop/flask/components/StoredReactionsSection.tsx",
                                                        lineNumber: 98,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/flask/components/StoredReactionsSection.tsx",
                                                lineNumber: 69,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/flask/components/StoredReactionsSection.tsx",
                                        lineNumber: 58,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/flask/components/StoredReactionsSection.tsx",
                                    lineNumber: 57,
                                    columnNumber: 15
                                }, this)
                            }, reaction.id, false, {
                                fileName: "[project]/Desktop/flask/components/StoredReactionsSection.tsx",
                                lineNumber: 46,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/Desktop/flask/components/StoredReactionsSection.tsx",
                        lineNumber: 44,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        initial: {
                            opacity: 0,
                            y: 30
                        },
                        whileInView: {
                            opacity: 1,
                            y: 0
                        },
                        viewport: {
                            once: true,
                            margin: "-50px"
                        },
                        transition: {
                            duration: 0.6,
                            delay: 0.6,
                            ease: "easeOut"
                        },
                        className: "mt-12 text-center",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/reaction/custom",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "inline-flex items-center gap-3 px-8 py-4 rounded-full border border-white/10 bg-white/2 hover:bg-white/5 hover:border-white/20 transition-all duration-300 cursor-pointer group",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-8 h-8 rounded-full bg-linear-to-tr from-white/10 to-white/5 flex items-center justify-center border border-white/10 group-hover:border-white/20 transition-colors",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-white/70 text-lg",
                                            children: "+"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/flask/components/StoredReactionsSection.tsx",
                                            lineNumber: 130,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/flask/components/StoredReactionsSection.tsx",
                                        lineNumber: 129,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-left",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-white/80 font-medium text-sm block group-hover:text-white transition-colors",
                                                children: "Custom Experiment"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/flask/components/StoredReactionsSection.tsx",
                                                lineNumber: 133,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$flask$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-white/30 text-xs",
                                                children: "Set up your own reaction parameters"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/flask/components/StoredReactionsSection.tsx",
                                                lineNumber: 136,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/flask/components/StoredReactionsSection.tsx",
                                        lineNumber: 132,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/flask/components/StoredReactionsSection.tsx",
                                lineNumber: 128,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Desktop/flask/components/StoredReactionsSection.tsx",
                            lineNumber: 127,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/flask/components/StoredReactionsSection.tsx",
                        lineNumber: 120,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/flask/components/StoredReactionsSection.tsx",
                lineNumber: 23,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/flask/components/StoredReactionsSection.tsx",
        lineNumber: 16,
        columnNumber: 5
    }, this);
}
_c = StoredReactionsSection;
var _c;
__turbopack_context__.k.register(_c, "StoredReactionsSection");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=Desktop_flask_481d25af._.js.map