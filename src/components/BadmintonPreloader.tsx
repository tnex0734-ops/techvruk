"use client";

import React, { useEffect, useState, useRef, useMemo } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";

interface BadmintonPreloaderProps {
  onComplete?: () => void;
}

const NAME_LETTERS = ["T", "A", "U", "S", "H", "I", "K"];

/**
 * High-Craft Badminton Smash & Parabolic Arc Loading Preloader
 * 
 * Choreography:
 * 1. Racket swings and strikes the feathered shuttlecock with an energetic kinetic impact burst.
 * 2. Shuttlecock flies along an aerodynamic parabolic arc trajectory from left to right.
 * 3. Each letter of "TAUSHIK" dynamically pops into view with impact rings as the shuttlecock passes.
 * 4. Trajectory line draws in real-time in portfolio signature red.
 * 5. Smooth curtain unveiling of the 3D room.
 * 6. Accessible bypass via "?skipPreloader=true", Space, Escape, or "SKIP" button.
 */
export function BadmintonPreloader({ onComplete }: BadmintonPreloaderProps) {
  const [progress, setProgress] = useState(0); // 0 to 1
  const [isFinished, setIsFinished] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    // Instant bypass if query parameter present
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("skipPreloader") === "true") {
        setIsFinished(true);
        onComplete?.();
        return;
      }
    }

    const duration = 2400; // 2.4s total animation duration
    const startTime = performance.now();
    let animFrameId: number;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(1, elapsed / duration);
      setProgress(t);

      if (t < 1) {
        animFrameId = requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          setIsFinished(true);
          onComplete?.();
        }, 350);
      }
    };

    animFrameId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(animFrameId);
  }, [onComplete]);

  // Derived letter count (1 to 7) bound directly to animation progress
  const revealedCount =
    progress < 0.20
      ? 1
      : progress < 0.32
      ? 2
      : progress < 0.44
      ? 3
      : progress < 0.56
      ? 4
      : progress < 0.68
      ? 5
      : progress < 0.80
      ? 6
      : 7;

  const hasSmashImpacted = progress >= 0.12;

  // Keyboard shortcut listener: Space or Escape to skip immediately
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

  // ── Mathematical Parabolic Arc Trajectory ──
  // Canvas coordinate box: 1000 width, 400 height
  const startX = 140;
  const startY = 260;
  const endX = 860;
  const endY = 260;
  const peakHeight = 160; // Apex elevation above baseline

  // Normalized flight progress between t=0.14 and t=0.88
  const flightT = Math.max(0, Math.min(1, (progress - 0.14) / 0.72));

  // Current shuttlecock position along parabola
  const curX = startX + flightT * (endX - startX);
  // Parabola: y(u) = startY - 4 * peakHeight * u * (1 - u)
  const curY = startY - 4 * peakHeight * flightT * (1 - flightT);

  // Tangent angle in degrees so cork always points forward along flight vector
  const vx = endX - startX;
  const vy = -4 * peakHeight * (1 - 2 * flightT);
  const tangentAngle = (Math.atan2(vy, vx) * 180) / Math.PI;

  // Generate SVG path string for the complete trajectory arc
  const arcPath = `M ${startX} ${startY} Q ${(startX + endX) / 2} ${startY - peakHeight * 2} ${endX} ${endY}`;

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          key="badminton-preloader"
          initial={{ y: 0 }}
          exit={{
            y: "-100%",
            transition: { duration: 0.42, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[99999] flex flex-col justify-between bg-[#FCFAF7] text-[#171515] select-none overflow-hidden p-6 sm:p-10"
        >
          {/* Subtle Archival Grid Pattern */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.035]"
            style={{
              backgroundImage:
                "linear-gradient(#e52424 1px, transparent 1px), linear-gradient(90deg, #e52424 1px, transparent 1px)",
              backgroundSize: "36px 36px",
            }}
          />

          {/* ── Top Header Strip ── */}
          <header className="relative z-10 w-full flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E52424] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E52424]" />
              </span>
              <span className="font-mono text-xs font-black uppercase tracking-wider text-[#171515]">
                TAUSHIK CHANDANA <span className="text-[#E52424]">//</span> ARCHIVE 2026
              </span>
            </div>

            <button
              type="button"
              onClick={handleSkip}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-stone-100 hover:bg-[#E52424] hover:text-white text-stone-700 text-xs font-mono font-bold border border-stone-200 transition-all cursor-pointer shadow-2xs group"
              aria-label="Skip loading animation and enter room"
            >
              <span>SKIP</span>
              <span className="opacity-60 text-[10px] group-hover:text-white">[SPACE]</span>
              <ArrowRight size={13} className="text-[#E52424] group-hover:text-white" />
            </button>
          </header>

          {/* ── Main Animation Arena (Vector Parabolic Flight Stage) ── */}
          <div className="relative z-10 w-full max-w-5xl mx-auto flex-1 flex flex-col items-center justify-center min-h-[360px]">
            
            {/* SVG Flight Stage Overlay */}
            <div className="relative w-full aspect-[2.4/1] max-w-4xl flex items-center justify-center">
              <svg
                viewBox="0 0 1000 400"
                className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
              >
                {/* 1. Subtle Dotted Guide Arc */}
                <path
                  d={arcPath}
                  fill="none"
                  stroke="#E8E2D8"
                  strokeWidth="2"
                  strokeDasharray="6 6"
                />

                {/* 2. Active Glowing Red Trajectory Trail */}
                {flightT > 0 && (
                  <path
                    d={arcPath}
                    fill="none"
                    stroke="#E52424"
                    strokeWidth="3.5"
                    strokeDasharray="800"
                    strokeDashoffset={800 * (1 - flightT)}
                    strokeLinecap="round"
                    className="transition-[stroke-dashoffset] duration-75"
                  />
                )}

                {/* 3. Badminton Racket (Left Side at Smash Position) */}
                <g
                  transform={`translate(${startX - 60}, ${startY + 20}) rotate(${
                    progress < 0.12 ? -35 : progress < 0.22 ? 38 : 15
                  })`}
                  style={{
                    transformOrigin: "0px 100px",
                    transition: progress >= 0.12 ? "transform 140ms ease-out" : "transform 400ms ease-out",
                  }}
                >
                  {/* Grip Handle */}
                  <rect x="-7" y="55" width="14" height="60" rx="3" fill="#FAF5EE" stroke="#171515" strokeWidth="2" />
                  {/* Handle Ribs */}
                  <line x1="-7" y1="70" x2="7" y2="70" stroke="#E52424" strokeWidth="2" />
                  <line x1="-7" y1="85" x2="7" y2="85" stroke="#171515" strokeWidth="1.5" />
                  <line x1="-7" y1="100" x2="7" y2="100" stroke="#E52424" strokeWidth="2" />

                  {/* Shaft */}
                  <line x1="0" y1="-20" x2="0" y2="55" stroke="#171515" strokeWidth="4.5" strokeLinecap="round" />
                  <circle cx="0" cy="15" r="4" fill="#E52424" />

                  {/* Isometric Hoop Frame */}
                  <ellipse cx="0" cy="-75" rx="38" ry="52" fill="none" stroke="#171515" strokeWidth="4.5" />
                  {/* Red Frame Racing Decals */}
                  <path d="M -30 -100 A 38 52 0 0 1 30 -100" fill="none" stroke="#E52424" strokeWidth="5" />

                  {/* String Lattice Grid */}
                  {[-24, -16, -8, 0, 8, 16, 24].map((x, i) => (
                    <line
                      key={`v-${i}`}
                      x1={x}
                      y1={-120}
                      x2={x}
                      y2={-30}
                      stroke="#FFFFFF"
                      strokeWidth="1.2"
                      strokeOpacity="0.85"
                    />
                  ))}
                  {[-110, -95, -80, -65, -50, -35].map((y, i) => (
                    <line
                      key={`h-${i}`}
                      x1={-30}
                      y1={y}
                      x2={30}
                      y2={y}
                      stroke="#FFFFFF"
                      strokeWidth="1.2"
                      strokeOpacity="0.85"
                    />
                  ))}
                  {/* Center Stencil Mark */}
                  <circle cx="0" cy="-75" r="14" fill="#E52424" fillOpacity="0.3" />
                </g>

                {/* 4. Smash Kinetic Burst Rings at Impact Point */}
                {hasSmashImpacted && flightT < 0.35 && (
                  <g transform={`translate(${startX}, ${startY})`}>
                    <circle cx="0" cy="0" r={40 * (1 - flightT * 2)} fill="none" stroke="#E52424" strokeWidth="3" opacity={1 - flightT * 2} />
                    <circle cx="0" cy="0" r={24 * (1 - flightT * 2)} fill="none" stroke="#FF5757" strokeWidth="2" opacity={1 - flightT * 2} />
                    {/* Sparks */}
                    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, idx) => (
                      <line
                        key={`spark-${idx}`}
                        x1={Math.cos((angle * Math.PI) / 180) * 10}
                        y1={Math.sin((angle * Math.PI) / 180) * 10}
                        x2={Math.cos((angle * Math.PI) / 180) * 28}
                        y2={Math.sin((angle * Math.PI) / 180) * 28}
                        stroke="#E52424"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        opacity={1 - flightT * 2.5}
                      />
                    ))}
                  </g>
                )}

                {/* 5. Aerodynamic Feathered Shuttlecock Flying along Arc */}
                {progress >= 0.12 && (
                  <g
                    transform={`translate(${curX}, ${curY}) rotate(${tangentAngle})`}
                    style={{ transformOrigin: "0px 0px" }}
                  >
                    {/* Feather Skirt (16 Conical Feathers) */}
                    <path
                      d="M 6 -14 L -22 -19 L -20 0 L -22 19 L 6 14 Z"
                      fill="#FAF8F5"
                      stroke="#E5DFD5"
                      strokeWidth="1.2"
                    />
                    {/* Feather Vane Lines */}
                    <line x1="-16" y1="-17" x2="3" y2="-10" stroke="#D8D2C5" strokeWidth="1" />
                    <line x1="-18" y1="-9" x2="4" y2="-4" stroke="#D8D2C5" strokeWidth="1" />
                    <line x1="-18" y1="9" x2="4" y2="4" stroke="#D8D2C5" strokeWidth="1" />
                    <line x1="-16" y1="17" x2="3" y2="10" stroke="#D8D2C5" strokeWidth="1" />

                    {/* Dual Thread Rings */}
                    <line x1="-10" y1="-16" x2="-10" y2="16" stroke="#E52424" strokeWidth="1.8" />
                    <line x1="-2" y1="-13" x2="-2" y2="13" stroke="#FAF5EE" strokeWidth="1.5" />

                    {/* Red Ribbon Waist Band */}
                    <rect x="5" y="-12" width="4" height="24" rx="1" fill="#E52424" />

                    {/* Natural Cork Dome (Leading the flight path) */}
                    <path
                      d="M 8 -12 A 12 12 0 0 1 20 0 A 12 12 0 0 1 8 12 Z"
                      fill="#D9C5A0"
                      stroke="#171515"
                      strokeWidth="1.5"
                    />
                  </g>
                )}
              </svg>

              {/* ── Sequential Typography Reveal: "T - A - U - S - H - I - K" ── */}
              <div className="relative z-20 flex items-center justify-center gap-2 sm:gap-4 md:gap-6 mt-16 sm:mt-20">
                {NAME_LETTERS.map((char, index) => {
                  const isRevealed = index < revealedCount;
                  const isCurrentHit = index === revealedCount - 1 && progress < 0.88;

                  return (
                    <div
                      key={`char-${char}-${index}`}
                      className="relative flex flex-col items-center justify-center"
                    >
                      {/* Character Tile */}
                      <div
                        className={`w-12 h-16 sm:w-16 sm:h-22 md:w-22 md:h-28 flex items-center justify-center rounded-xl sm:rounded-2xl border transition-all duration-150 select-none ${
                          isRevealed
                            ? "bg-white border-[#E2DBD1] shadow-[0_12px_32px_rgba(23,21,21,0.08)] scale-100 opacity-100"
                            : "bg-[#FCFAF7]/50 border-stone-200/50 scale-95 opacity-25"
                        } ${isCurrentHit ? "ring-4 ring-[#E52424]/40 scale-105" : ""}`}
                      >
                        <span
                          className={`font-sans font-black text-3xl sm:text-5xl md:text-6xl transition-colors duration-150 tracking-tight ${
                            isRevealed
                              ? isCurrentHit
                                ? "text-[#E52424]"
                                : "text-neutral-950"
                              : "text-stone-300"
                          }`}
                        >
                          {char}
                        </span>

                        {/* Impact Burst Accent on Reveal */}
                        {isCurrentHit && (
                          <div className="absolute -top-2 -right-2">
                            <span className="flex h-3 w-3">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E52424] opacity-75" />
                              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#E52424]" />
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Bottom Active Red Indicator Line */}
                      <div
                        className={`mt-2.5 h-1 sm:h-1.5 rounded-full transition-all duration-200 ${
                          isRevealed ? "w-8 sm:w-12 bg-[#E52424]" : "w-2 bg-stone-300"
                        }`}
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Reveal Caption */}
            <div className="mt-8 sm:mt-12 text-center flex flex-col items-center">
              <span className="font-mono text-xs sm:text-sm font-black uppercase tracking-widest text-[#171515]">
                PRODUCT DESIGNER &amp; CREATIVE DEVELOPER
              </span>
              <span className="font-mono text-[10px] sm:text-xs text-[#8A8279] mt-1.5 flex items-center gap-1.5">
                <Sparkles size={12} className="text-[#E52424]" />
                <span>INTERACTIVE 3D ARCHITECTURAL BEDROOM • HYDERABAD &amp; BENGALURU</span>
              </span>
            </div>
          </div>

          {/* ── Bottom Progress Bar ── */}
          <footer className="relative z-10 w-full flex items-center justify-between font-mono text-[11px] text-[#8A8279]">
            <div className="flex items-center gap-2">
              <span className="text-[#171515] font-bold">READY TO SERVE</span>
              <span>•</span>
              <span>{Math.round(progress * 100)}%</span>
            </div>

            <div className="w-32 sm:w-48 h-1.5 bg-stone-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#E52424] transition-all duration-100 ease-out"
                style={{ width: `${progress * 100}%` }}
              />
            </div>

            <span>{revealedCount} / 7 LETTERS</span>
          </footer>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
