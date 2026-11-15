"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * HeroAtmosphere — Professional Editorial Ambient Gradients & Abstract Geometric Compositions
 * 
 * Visual Architecture:
 * 1. Soft atmospheric side gradients (Blush #FCEBED & Warm White #FFFEFD) on left and right flanks.
 * 2. Left flank: Bauhaus-inspired architectural orbital ring, isometric wireframe prism,
 *    coordinates matrix, and soft blush floating geometric pill.
 * 3. Right flank: Modernist reticle with concentric arcs, stepped graphic bar array,
 *    viewfinder corner brackets, and editorial telemetry.
 * 4. Center pedestal glow: Grounds the isometric workspace diorama with organic physical presence.
 * 5. Restrained tactile floating motion; strictly pointer-events-none and reduced-motion compliant.
 */
export function HeroAtmosphere() {
  const shouldReduceMotion = useReducedMotion();

  // Floating animation variants for organic ambient drift
  const floatVariant1 = shouldReduceMotion
    ? {}
    : {
        y: [0, -8, 0],
        rotate: [0, 1.2, 0],
        transition: {
          duration: 7.5,
          repeat: Infinity,
          ease: "easeInOut" as const,
        },
      };

  const floatVariant2 = shouldReduceMotion
    ? {}
    : {
        y: [0, 7, 0],
        rotate: [0, -1.5, 0],
        transition: {
          duration: 8.5,
          repeat: Infinity,
          ease: "easeInOut" as const,
          delay: 0.8,
        },
      };

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden select-none z-0"
    >
      {/* ── 1. Atmospheric Ambient Edge Gradients ── */}
      {/* Left Flank Gradient Glow */}
      <div
        className="absolute top-0 left-0 w-[38vw] max-w-[620px] h-full"
        style={{
          background:
            "radial-gradient(ellipse 90% 80% at 0% 50%, rgba(252, 235, 237, 0.72) 0%, rgba(255, 245, 246, 0.38) 45%, transparent 75%)",
        }}
      />

      {/* Right Flank Gradient Glow */}
      <div
        className="absolute top-0 right-0 w-[38vw] max-w-[620px] h-full"
        style={{
          background:
            "radial-gradient(ellipse 90% 80% at 100% 50%, rgba(252, 235, 237, 0.65) 0%, rgba(255, 248, 246, 0.32) 45%, transparent 75%)",
        }}
      />

      {/* Center Diorama Grounding Pedestal Glow */}
      <div
        className="absolute bottom-[14%] left-1/2 -translate-x-1/2 w-[72vw] max-w-[820px] h-[220px]"
        style={{
          background:
            "radial-gradient(ellipse 65% 55% at 50% 50%, rgba(201, 31, 43, 0.04) 0%, rgba(252, 235, 237, 0.25) 45%, transparent 78%)",
        }}
      />

      {/* ── 2. Left Flank: Bauhaus & Architectural Geometric Composition ── */}
      <div className="hidden lg:block absolute left-8 xl:left-14 top-1/2 -translate-y-1/2 w-[240px] xl:w-[280px] h-[480px]">
        {/* Floating Bauhaus Orbital Ring with Accent Satellite */}
        <motion.div
          animate={floatVariant1}
          className="absolute top-6 left-2 flex flex-col items-start gap-3"
        >
          <div className="relative w-36 h-36">
            {/* Outer hairline circle */}
            <svg viewBox="0 0 144 144" className="w-full h-full">
              <circle
                cx="72"
                cy="72"
                r="64"
                fill="none"
                stroke="#E9E2E3"
                strokeWidth="1.2"
                strokeDasharray="4 4"
              />
              {/* Highlight red arc segment */}
              <path
                d="M 72 8 A 64 64 0 0 1 136 72"
                fill="none"
                stroke="#C91F2B"
                strokeWidth="2"
                strokeLinecap="round"
              />
              {/* Inner concentric ring */}
              <circle
                cx="72"
                cy="72"
                r="38"
                fill="none"
                stroke="#E9E2E3"
                strokeWidth="1"
              />
              {/* Center point */}
              <circle cx="72" cy="72" r="2.5" fill="#C91F2B" />
            </svg>
            {/* Orbiting satellite dot */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#C91F2B] shadow-[0_0_8px_rgba(201,31,43,0.5)]" />
          </div>

          {/* Micro Typography / Architectural Coordinate Stamp */}
          <div className="font-mono text-[10px] tracking-widest text-[#706B6B] flex flex-col gap-0.5 pl-1">
            <span className="font-bold text-[#171515]">FIG. 01 // SPATIAL</span>
            <span className="text-[9px] text-[#971724]">GRID // 12-COL ISO</span>
          </div>
        </motion.div>

        {/* Floating Translucent Blush Geometric Pill */}
        <motion.div
          animate={floatVariant2}
          className="absolute bottom-16 left-4 px-3.5 py-1.5 rounded-full bg-[#FCEBED] border border-[#C91F2B]/20 shadow-2xs flex items-center gap-2 will-change-transform"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#C91F2B]" />
          <span className="font-mono text-[10px] font-bold tracking-wider text-[#C91F2B] uppercase">
            3D INTERACTION LAB
          </span>
        </motion.div>

        {/* Minimalist Isometric Cube Wireframe */}
        <motion.div
          animate={floatVariant1}
          className="absolute bottom-36 right-4 opacity-80"
        >
          <svg width="44" height="48" viewBox="0 0 44 48" fill="none">
            {/* Top diamond */}
            <path d="M 22 2 L 42 13 L 22 24 L 2 13 Z" stroke="#C91F2B" strokeWidth="1.2" fill="rgba(201,31,43,0.03)" />
            {/* Left face */}
            <path d="M 2 13 L 22 24 L 22 46 L 2 35 Z" stroke="#E9E2E3" strokeWidth="1.2" />
            {/* Right face */}
            <path d="M 42 13 L 22 24 L 22 46 L 42 35 Z" stroke="#706B6B" strokeWidth="1.2" strokeOpacity="0.4" />
          </svg>
        </motion.div>

        {/* Delicate Crosshair Alignment Ticks */}
        <div className="absolute top-1/2 left-0 text-[#C91F2B]/50 font-mono text-[11px] leading-none select-none">
          +
        </div>
        <div className="absolute top-[68%] left-10 text-[#706B6B]/40 font-mono text-[10px] leading-none select-none">
          +
        </div>
      </div>

      {/* ── 3. Right Flank: Modernist Graphic & Viewfinder Geometric Composition ── */}
      <div className="hidden lg:block absolute right-8 xl:right-14 top-1/2 -translate-y-1/2 w-[240px] xl:w-[280px] h-[480px]">
        {/* Viewfinder Reticle & Concentric Arcs */}
        <motion.div
          animate={floatVariant2}
          className="absolute top-8 right-2 flex flex-col items-end gap-2.5"
        >
          <div className="relative w-32 h-32 flex items-center justify-center">
            {/* Corner Viewfinder Brackets */}
            <svg viewBox="0 0 128 128" className="w-full h-full">
              {/* Top-left bracket */}
              <path d="M 12 28 L 12 12 L 28 12" stroke="#C91F2B" strokeWidth="1.5" strokeLinecap="round" fill="none" />
              {/* Top-right bracket */}
              <path d="M 100 12 L 116 12 L 116 28" stroke="#706B6B" strokeWidth="1.2" strokeLinecap="round" fill="none" />
              {/* Bottom-left bracket */}
              <path d="M 12 100 L 12 116 L 28 116" stroke="#706B6B" strokeWidth="1.2" strokeLinecap="round" fill="none" />
              {/* Bottom-right bracket */}
              <path d="M 100 116 L 116 116 L 116 100" stroke="#C91F2B" strokeWidth="1.5" strokeLinecap="round" fill="none" />
              
              {/* Central Concentric Hairlines */}
              <circle cx="64" cy="64" r="28" stroke="#E9E2E3" strokeWidth="1" strokeDasharray="3 3" fill="none" />
              <circle cx="64" cy="64" r="14" stroke="#C91F2B" strokeWidth="1.2" fill="none" opacity="0.6" />
              <circle cx="64" cy="64" r="2" fill="#171515" />
            </svg>
          </div>

          {/* Telemetry Tag */}
          <div className="font-mono text-[9.5px] tracking-widest text-[#706B6B] flex flex-col items-end gap-0.5 pr-1">
            <span className="font-bold text-[#171515]">VIEW // 34° FOV</span>
            <span className="text-[9px] text-[#971724]">CANVAS // 60FPS</span>
          </div>
        </motion.div>

        {/* Stepped Graphic Bar Matrix (Bauhaus Rhythmic Bars) */}
        <motion.div
          animate={floatVariant1}
          className="absolute bottom-20 right-6 flex items-end gap-2 p-2.5 rounded-xl bg-white/95 border border-[#E9E2E3] shadow-2xs will-change-transform"
        >
          <div className="w-1.5 h-4 rounded-full bg-[#E9E2E3]" />
          <div className="w-1.5 h-8 rounded-full bg-[#C91F2B]" />
          <div className="w-1.5 h-6 rounded-full bg-[#706B6B]/40" />
          <div className="w-1.5 h-11 rounded-full bg-[#971724]" />
          <div className="w-1.5 h-5 rounded-full bg-[#E9E2E3]" />
        </motion.div>

        {/* Abstract Floating Diamond Shape */}
        <motion.div
          animate={floatVariant2}
          className="absolute bottom-40 left-4 w-9 h-9 rotate-45 rounded-sm border border-[#C91F2B]/30 bg-gradient-to-br from-[#FCEBED]/80 to-transparent flex items-center justify-center shadow-2xs"
        >
          <div className="w-2 h-2 rounded-full bg-[#C91F2B]" />
        </motion.div>

        {/* Subtle Registration Crosses */}
        <div className="absolute top-[48%] right-2 text-[#C91F2B]/50 font-mono text-[11px] leading-none select-none">
          +
        </div>
        <div className="absolute bottom-[28%] right-28 text-[#706B6B]/40 font-mono text-[10px] leading-none select-none">
          +
        </div>
      </div>
    </div>
  );
}
