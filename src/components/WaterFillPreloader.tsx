"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowRight, Droplets } from "lucide-react";

interface WaterFillPreloaderProps {
  onComplete?: () => void;
}

/**
 * WaterFillPreloader — Fluid Liquid Fill & Name Reveal Loading Experience
 * 
 * Choreography:
 * 1. Fluid Chamber & Water Filling:
 *    - Real-time harmonic undulating wave equation with dual-layer fluid crests.
 *    - Liquid rises smoothly from 0% to 100% with floating micro-bubbles.
 *    - Monospace fluid telemetry & progress counter (00% -> 100%).
 * 2. Name Reveal Stage:
 *    - The rising liquid floods and reveals the monumental typography: "TAUSHIK CHANDANA".
 *    - Specular light gleam sweeps across the letterforms with radiant fluid ripple rings.
 *    - Subtitle: "PRODUCT DESIGNER & CREATIVE DEVELOPER // 2026".
 * 3. Fluid Curtain Reveal of Hero Section:
 *    - Liquid veil curtains upward with an undulating wave trailing edge, unveiling the hero.
 * 4. Full Accessibility:
 *    - Respects prefers-reduced-motion, Escape/Space skip, SKIP button, and ?skipPreloader=true.
 */
export function WaterFillPreloader({ onComplete }: WaterFillPreloaderProps) {
  const shouldReduceMotion = useReducedMotion();
  const [{ progress, waveOffset }, setFluid] = useState({ progress: 0, waveOffset: 0 });
  const [phase, setPhase] = useState<"filling" | "revealed" | "complete">("filling");
  const [isFinished, setIsFinished] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const animFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  // Generate deterministic floating water bubble seeds
  const bubbles = useRef(
    Array.from({ length: 18 }, (_, i) => ({
      id: i,
      x: 10 + (i * 5.2) % 80,
      size: 4 + (i * 3.7) % 10,
      speed: 0.8 + (i * 0.4) % 1.2,
      delay: (i * 0.15) % 1.8,
      drift: ((i % 2 === 0 ? 1 : -1) * (6 + (i * 2) % 12)),
    }))
  ).current;

  useEffect(() => {
    setIsMounted(true);

    // Instant bypass if skipPreloader query is present
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("skipPreloader") === "true") {
        setIsFinished(true);
        onComplete?.();
        return;
      }
    }

    if (shouldReduceMotion) {
      const timer = setTimeout(() => {
        setIsFinished(true);
        onComplete?.();
      }, 400);
      return () => clearTimeout(timer);
    }

    const fillDuration = 2000; // 2.0s to fill water completely
    const holdDuration = 900;  // 0.9s to celebrate and read revealed name

    const tick = (now: number) => {
      if (!startTimeRef.current) startTimeRef.current = now;
      const elapsed = now - startTimeRef.current;

      if (elapsed < fillDuration) {
        // Fluid filling stage (cubic ease-out for physical water buoyancy)
        const rawT = elapsed / fillDuration;
        const easedProgress = Math.min(1, Math.sin((rawT * Math.PI) / 2));
        const newOffset = (elapsed * 0.0035) % (Math.PI * 2);
        setFluid({ progress: easedProgress, waveOffset: newOffset });
        animFrameRef.current = requestAnimationFrame(tick);
      } else {
        // Reached 100% water fill!
        setFluid({ progress: 1, waveOffset: 0 });
        setPhase("revealed");

        // After name reveal hold, curtain upward to unveil hero section
        const timer = setTimeout(() => {
          setPhase("complete");
          setIsFinished(true);
          onComplete?.();
        }, holdDuration);

        return () => clearTimeout(timer);
      }
    };

    animFrameRef.current = requestAnimationFrame(tick);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [shouldReduceMotion, onComplete]);

  // Global keyboard shortcuts (Space / Escape) to skip preloader
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.key === "Escape") {
        e.preventDefault();
        setIsFinished(true);
        onComplete?.();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onComplete]);

  const handleSkip = () => {
    setIsFinished(true);
    onComplete?.();
  };

  if (!isMounted) return null;

  // ── Fluid Wave Mathematics ──
  // Coordinate space: 1000 width × 1000 height
  // As progress goes from 0 to 1, waterLevelY goes from 1020 down to -20
  const waterLevelY = 1000 - progress * 1020;
  
  // Wave amplitudes: dampen as progress approaches 100% for smooth full flood
  const amp1 = (1 - progress * 0.75) * 28;
  const amp2 = (1 - progress * 0.75) * 20;

  // Generate SVG path for primary front wave
  const steps = 24;
  let wavePath1 = `M 0 1000 L 0 ${waterLevelY}`;
  for (let i = 0; i <= steps; i++) {
    const x = (i / steps) * 1000;
    const normX = x / 1000;
    const y =
      waterLevelY +
      Math.sin(normX * Math.PI * 4 + waveOffset * 2.2) * amp1 +
      Math.cos(normX * Math.PI * 2 + waveOffset * 1.4) * (amp1 * 0.4);
    wavePath1 += ` L ${x.toFixed(1)} ${y.toFixed(1)}`;
  }
  wavePath1 += ` L 1000 1000 Z`;

  // Generate SVG path for secondary back wave (phase offset & different wavelength)
  let wavePath2 = `M 0 1000 L 0 ${waterLevelY}`;
  for (let i = 0; i <= steps; i++) {
    const x = (i / steps) * 1000;
    const normX = x / 1000;
    const y =
      waterLevelY +
      Math.cos(normX * Math.PI * 3.5 - waveOffset * 1.8) * amp2 +
      Math.sin(normX * Math.PI * 2.2 - waveOffset) * (amp2 * 0.5) +
      8;
    wavePath2 += ` L ${x.toFixed(1)} ${y.toFixed(1)}`;
  }
  wavePath2 += ` L 1000 1000 Z`;

  const percentDisplay = Math.min(100, Math.floor(progress * 100));

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          key="water-fill-preloader"
          initial={{ y: 0 }}
          exit={{
            y: "-100%",
            transition: { duration: 0.65, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[99999] flex flex-col justify-between bg-[#0C0E14] text-white select-none overflow-hidden p-6 sm:p-10"
        >
          {/* Subtle Archival Grid Matrix Texture */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(#C91F2B 1px, transparent 1px), linear-gradient(90deg, #C91F2B 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          {/* ── 1. Top Header Strip ── */}
          <header className="relative z-30 w-full flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C91F2B] opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#C91F2B]" />
              </span>
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-neutral-300">
                FLUID_INIT <span className="text-[#C91F2B]">//</span> 2026
              </span>
            </div>

            {/* Skip Button */}
            <button
              type="button"
              onClick={handleSkip}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-[#C91F2B] text-neutral-300 hover:text-white text-xs font-mono font-bold border border-white/15 transition-all cursor-pointer shadow-xs group"
              aria-label="Skip water loading animation and enter portfolio"
            >
              <span>SKIP</span>
              <span className="opacity-50 text-[10px] group-hover:text-white">[ESC]</span>
              <ArrowRight size={13} className="text-[#C91F2B] group-hover:text-white transition-colors" />
            </button>
          </header>

          {/* ── 2. Fluid Wave Simulation Layer ── */}
          <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
            <svg
              viewBox="0 0 1000 1000"
              preserveAspectRatio="none"
              className="absolute inset-0 w-full h-full"
            >
              <defs>
                {/* Back Liquid Layer Gradient */}
                <linearGradient id="backLiquidGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#971724" stopOpacity="0.75" />
                  <stop offset="100%" stopColor="#640D17" stopOpacity="0.95" />
                </linearGradient>

                {/* Front Liquid Layer Gradient: Signature Brand Red */}
                <linearGradient id="frontLiquidGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#E52424" stopOpacity="0.95" />
                  <stop offset="35%" stopColor="#C91F2B" stopOpacity="0.98" />
                  <stop offset="100%" stopColor="#971724" stopOpacity="1" />
                </linearGradient>

                {/* Foam / Shimmer Highlight */}
                <linearGradient id="foamShimmer" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.3" />
                  <stop offset="50%" stopColor="#FCEBED" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.3" />
                </linearGradient>
              </defs>

              {/* Back Wave (Deep Crimson Depth) */}
              <path d={wavePath2} fill="url(#backLiquidGrad)" />

              {/* Front Wave (Signature Radiant Red) */}
              <path d={wavePath1} fill="url(#frontLiquidGrad)" />

              {/* Luminous Wave Crest Rim */}
              <path
                d={wavePath1}
                fill="none"
                stroke="url(#foamShimmer)"
                strokeWidth="2.5"
                opacity="0.85"
              />
            </svg>

            {/* Rising Fluid Bubble Particles */}
            {bubbles.map((b) => {
              // Bubble appears only when water level has reached its height
              const bubbleBaseY = 100 - (b.id * 5.5);
              const isSubmerged = (1 - progress) * 100 <= bubbleBaseY;
              if (!isSubmerged) return null;

              return (
                <motion.div
                  key={b.id}
                  initial={{ y: 0, opacity: 0 }}
                  animate={{
                    y: -120 * b.speed,
                    x: [0, b.drift, 0],
                    opacity: [0, 0.7, 0],
                  }}
                  transition={{
                    duration: 2.2 / b.speed,
                    repeat: Infinity,
                    delay: b.delay,
                    ease: "easeOut",
                  }}
                  className="absolute rounded-full bg-white/40 border border-white/60 pointer-events-none backdrop-blur-2xs"
                  style={{
                    left: `${b.x}%`,
                    bottom: `${100 - bubbleBaseY}%`,
                    width: `${b.size}px`,
                    height: `${b.size}px`,
                  }}
                />
              );
            })}
          </div>

          {/* ── 3. Central Stage: Water Filling & Name Revealing ── */}
          <div className="relative z-20 w-full max-w-4xl mx-auto flex-1 flex flex-col items-center justify-center text-center px-4">
            
            {/* Fluid Metric Pill */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-6 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/40 border border-white/15 backdrop-blur-md"
            >
              <Droplets size={13} className="text-[#C91F2B] animate-pulse" />
              <span className="font-mono text-xs font-semibold text-neutral-300 tracking-wider">
                SURFACE ELEVATION: <span className="text-white font-bold">{percentDisplay}%</span>
              </span>
            </motion.div>

            {/* Monumental Name Reveal */}
            <div className="relative overflow-hidden py-2 px-4">
              {/* Main Name Heading */}
              <motion.h1
                initial={{ opacity: 0, scale: 0.94, y: 14 }}
                animate={
                  phase === "revealed"
                    ? {
                        opacity: 1,
                        scale: 1,
                        y: 0,
                        transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
                      }
                    : {
                        opacity: Math.max(0.2, progress * 0.9),
                        scale: 0.96 + progress * 0.04,
                        y: (1 - progress) * 12,
                      }
                }
                className="text-4xl xs:text-5xl sm:text-7xl md:text-8xl font-black tracking-tight leading-none uppercase"
                style={{
                  fontFamily: "var(--font-outfit), Outfit, -apple-system, sans-serif",
                  textShadow:
                    phase === "revealed"
                      ? "0 0 40px rgba(255, 255, 255, 0.5), 0 8px 30px rgba(0, 0, 0, 0.7)"
                      : "0 4px 20px rgba(0, 0, 0, 0.5)",
                }}
              >
                <span>TAUSHIK</span>{" "}
                <span className="text-[#FF4A57]">CHANDANA</span>
              </motion.h1>

              {/* Specular Light Gleam Sweep on Name Reveal */}
              {phase === "revealed" && (
                <motion.div
                  initial={{ x: "-100%", opacity: 0 }}
                  animate={{ x: "200%", opacity: [0, 0.8, 0] }}
                  transition={{ duration: 0.85, ease: "easeInOut" }}
                  className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/70 to-transparent skew-x-[-25deg] pointer-events-none"
                />
              )}
            </div>

            {/* Editorial Subtitle: Reveals gracefully with name */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={
                phase === "revealed"
                  ? { opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.12 } }
                  : { opacity: Math.max(0, (progress - 0.6) * 2.5), y: 0 }
              }
              className="mt-4 sm:mt-5 flex items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm md:text-base font-semibold tracking-wide text-neutral-300"
            >
              <span>PRODUCT DESIGNER</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#C91F2B]" />
              <span>CREATIVE DEVELOPER</span>
            </motion.div>

            {/* Radiant Ripple Ring on Reveal */}
            {phase === "revealed" && (
              <motion.div
                initial={{ scale: 0.6, opacity: 0.9 }}
                animate={{ scale: 1.8, opacity: 0 }}
                transition={{ duration: 0.9, ease: "easeOut" }}
                className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full border border-white/40 pointer-events-none"
              />
            )}
          </div>

          {/* ── 4. Bottom Telemetry Bar ── */}
          <footer className="relative z-30 w-full flex items-center justify-between text-[11px] font-mono text-neutral-400">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>HYDRAULIC_SYS // ACTIVE</span>
            </div>

            <div className="hidden sm:flex items-center gap-4">
              <span>LAT: 17.3850° N</span>
              <span>LONG: 78.4867° E</span>
              <span>PORTFOLIO_RELEASE // v2.6</span>
            </div>

            <div className="font-bold text-white tracking-widest">
              {percentDisplay < 100 ? `FILLING [${percentDisplay}%]` : "UNVEILING PORTFOLIO..."}
            </div>
          </footer>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
