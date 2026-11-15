"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown } from "lucide-react";

interface MascotHeroProps {
  /** Scroll exit progress from 0 (hero) to 1 (room) */
  scrollExitProgress?: number;
  /** Callback when user clicks scroll cue to jump directly to room */
  onEnterRoom?: () => void;
  /** Whether the hero canvas should be actively rendering */
  isHeroActive?: boolean;
}

const softEase = [0.22, 1, 0.36, 1] as const;

/* ── 4 Corners Kinetic Border Box: Inner red box continuously travels in perimeter loop ── */
function KineticCornerBox({
  className = "",
  initialCorner = "top-left",
}: {
  className?: string;
  initialCorner?: "top-left" | "top-right" | "bottom-right" | "bottom-left";
}) {
  const getCoordinates = () => {
    switch (initialCorner) {
      case "top-right":
        return {
          x: ["135%", "135%", "0%", "0%", "135%"],
          y: ["0%", "135%", "135%", "0%", "0%"],
        };
      case "bottom-right":
        return {
          x: ["135%", "0%", "0%", "135%", "135%"],
          y: ["135%", "135%", "0%", "0%", "135%"],
        };
      case "bottom-left":
        return {
          x: ["0%", "0%", "135%", "135%", "0%"],
          y: ["135%", "0%", "0%", "135%", "135%"],
        };
      case "top-left":
      default:
        return {
          x: ["0%", "135%", "135%", "0%", "0%"],
          y: ["0%", "0%", "135%", "135%", "0%"],
        };
    }
  };

  const coords = getCoordinates();

  return (
    <div
      className={`relative w-8 h-8 sm:w-16 sm:h-16 md:w-20 md:h-20 border-2 border-[#e52424] bg-white/20 overflow-hidden shadow-2xs ${className}`}
    >
      <motion.div
        animate={{
          x: coords.x,
          y: coords.y,
        }}
        transition={{
          duration: 4.8,
          repeat: Infinity,
          ease: "easeInOut",
          times: [0, 0.25, 0.5, 0.75, 1],
        }}
        className="absolute top-0.5 left-0.5 w-3.5 h-3.5 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-[#e52424] flex items-center justify-center shadow-xs"
      >
        <span className="w-1 h-1 sm:w-2 sm:h-2 rounded-full bg-white block" />
      </motion.div>
      <div className="absolute bottom-0.5 right-0.5 w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-[#e52424]/40" />
    </div>
  );
}

/**
 * Authentic HeroSection ported from tnex0734-ops/portfolio_v2
 * Featuring:
 * - 4 Corner Kinetic Border Boxes with animated traveling red cube loop
 * - Top editorial bar with pulsing red dot indicators and hairline red rule
 * - Desktop View: P O / F O and R T / L I O in Syne / Archivo Black display font with gentle drift
 * - Centered character_straight.png illustration with hover elevation and shadow
 * - TAUSHIK stamp badge with rotating ✦ spark
 * - Mobile View: responsive stacked PORTFOLIO + character + TAUSHIK ✦ UX badge
 * - Bottom role bar: UI/UX DESIGNER ● PRODUCT DESIGNER
 * - Connected scroll handoff into the 3D Bedroom portfolio
 */
export function MascotHero({
  scrollExitProgress = 0,
  onEnterRoom,
  isHeroActive = true,
}: MascotHeroProps) {
  const shouldReduceMotion = useReducedMotion();
  const heroOpacity = Math.max(0, 1 - scrollExitProgress * 1.5);
  const typographyTranslateY = scrollExitProgress * -60;

  return (
    <section
      id="hero"
      className="relative overflow-hidden w-full h-screen min-h-[640px] max-h-[1200px] flex flex-col justify-between pt-6 sm:pt-10 pb-4 sm:pb-6 bg-[var(--paper)] select-none"
      style={{
        opacity: heroOpacity,
        pointerEvents: heroOpacity < 0.2 ? "none" : "auto",
      }}
    >
      {/* 4 Corner Kinetic Border Boxes with Perimeter Motion Loop */}
      {/* Top Left Corner */}
      <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20 pointer-events-none">
        <KineticCornerBox initialCorner="top-left" />
      </div>

      {/* Top Right Corner */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 pointer-events-none">
        <KineticCornerBox initialCorner="top-right" />
      </div>

      {/* Bottom Left Corner */}
      <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 z-20 pointer-events-none hidden sm:block">
        <KineticCornerBox initialCorner="bottom-left" />
      </div>

      {/* Bottom Right Corner */}
      <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-20 pointer-events-none hidden sm:block">
        <KineticCornerBox initialCorner="bottom-right" />
      </div>

      <div className="section-shell relative z-10 w-full max-w-6xl mx-auto px-2 sm:px-6 flex-1 flex flex-col justify-between my-auto">
        <div className="relative flex-1 flex flex-col items-center justify-center my-auto">
          {/* Main Poster Typography Frame */}
          <motion.div
            className="relative w-full max-w-5xl py-1 sm:py-3"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: softEase }}
            style={{
              transform: `translateY(${typographyTranslateY}px)`,
              transition: "transform 0.1s ease-out",
            }}
          >
            {/* Top Frame Bar */}
            <div className="relative flex items-center justify-between text-[#e52424] font-black text-[9px] xs:text-[10px] sm:text-xs md:text-sm tracking-wider uppercase mb-2 sm:mb-4 px-1 sm:px-2">
              <span className="flex items-center gap-1 sm:gap-2 font-bold">
                TAUSHIK CHANDANA
                <motion.span
                  animate={{ scale: [1, 1.4, 1], opacity: [0.8, 1, 0.8] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                  className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#e52424] inline-block shadow-xs"
                />
              </span>
              <div className="flex-1 mx-2 sm:mx-6 h-[1.5px] bg-[#e52424]" />
              <span className="flex items-center gap-1 sm:gap-2 font-bold">
                <motion.span
                  animate={{ scale: [1, 1.4, 1], opacity: [0.8, 1, 0.8] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                  className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#e52424] inline-block shadow-xs"
                />
                2026
              </span>
            </div>

            {/* DESKTOP HERO VIEW (md and up) */}
            <div className="hidden md:flex relative items-center justify-center min-h-[400px] lg:min-h-[460px]">
              {/* Left Side Typography: P O / F O with subtle ambient drift */}
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="z-10 flex flex-col justify-between items-end text-[#e52424] display-font select-none md:mr-[-40px] lg:mr-[-70px]"
              >
                <div className="flex gap-2 text-[7.5rem] lg:text-[10.5rem] xl:text-[12.5rem] font-black leading-[0.78] tracking-tighter">
                  <span>P</span>
                  <span>O</span>
                </div>
                <div className="flex gap-2 text-[7.5rem] lg:text-[10.5rem] xl:text-[12.5rem] font-black leading-[0.78] tracking-tighter mt-2">
                  <span>F</span>
                  <span>O</span>
                </div>
              </motion.div>

              {/* Center Column: Character Illustration */}
              <div className="relative z-20 flex flex-col items-center justify-center shrink-0 my-[-25px]">
                <motion.div
                  className="w-[280px] md:w-[330px] lg:w-[400px] shrink-0 mix-blend-multiply"
                  initial={{ y: 50, opacity: 0, scale: 0.9 }}
                  animate={{
                    y: [0, -8, 0],
                    opacity: 1,
                    scale: 1,
                  }}
                  transition={{
                    y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
                    opacity: { duration: 0.8, delay: 0.25, ease: softEase },
                    scale: { duration: 0.8, delay: 0.25, ease: softEase },
                  }}
                  whileHover={{ scale: 1.05, y: -12 }}
                >
                  <img
                    src="/character_straight.png"
                    alt="Taushik Chandana character illustration"
                    className="w-full h-auto object-contain mix-blend-multiply filter contrast-105"
                  />
                </motion.div>

                {/* TAUSHIK Stamp Badge */}
                <motion.div
                  className="relative cursor-pointer mt-3"
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{ scale: 1, rotate: -6 }}
                  transition={{ type: "spring", stiffness: 120, delay: 0.6 }}
                  whileHover={{ scale: 1.15, rotate: 0 }}
                >
                  <div className="px-5 py-2 rounded-full border-2 border-[#e52424] bg-[var(--paper)] text-[#e52424] font-black text-sm uppercase tracking-widest shadow-[3px_3px_0_#e52424]">
                    TAUSHIK
                  </div>
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-2 -right-2 text-[#e52424] font-black text-xs inline-block origin-center"
                  >
                    ✦
                  </motion.span>
                </motion.div>
              </div>

              {/* Right Side Typography: R T / L I O with subtle ambient drift */}
              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="z-10 flex flex-col justify-between items-start text-[#e52424] display-font select-none md:ml-[-40px] lg:ml-[-70px]"
              >
                <div className="flex gap-2 text-[7.5rem] lg:text-[10.5rem] xl:text-[12.5rem] font-black leading-[0.78] tracking-tighter">
                  <span>R</span>
                  <span>T</span>
                </div>
                <div className="flex gap-2 text-[7.5rem] lg:text-[10.5rem] xl:text-[12.5rem] font-black leading-[0.78] tracking-tighter mt-2">
                  <span>L</span>
                  <span>I</span>
                  <span>O</span>
                </div>
              </motion.div>
            </div>

            {/* MOBILE HERO VIEW (< md, applies to all mobile resolutions from 320px to 767px) */}
            <div className="flex md:hidden flex-col items-center justify-center py-2 relative select-none w-full">
              {/* 1. TEXT ON TOP: Large, high-impact PORTFOLIO title */}
              <div className="text-center display-font text-[#e52424] font-black leading-[0.78] tracking-tighter text-[4.2rem] xs:text-[5.4rem] sm:text-[6.8rem]">
                <div className="tracking-tight">PORT</div>
                <div className="tracking-tight mt-1">FOLIO</div>
              </div>

              {/* 2. IMAGE BELOW TEXT: Large, prominent character illustration */}
              <motion.div
                className="relative z-10 w-[200px] xs:w-[240px] sm:w-[280px] max-w-[85%] mt-3 xs:mt-4 mix-blend-multiply"
                initial={{ y: 20, opacity: 0 }}
                animate={{
                  y: [0, -6, 0],
                  opacity: 1,
                }}
                transition={{
                  y: { duration: 4.2, repeat: Infinity, ease: "easeInOut" },
                  opacity: { duration: 0.6 },
                }}
              >
                <img
                  src="/character_straight.png"
                  alt="Taushik Chandana character illustration"
                  className="w-full h-auto object-contain mix-blend-multiply filter contrast-105"
                />
              </motion.div>

              {/* 3. NAME STAMP DIRECTLY BELOW IMAGE */}
              <motion.div
                className="relative cursor-pointer z-20 mt-3 xs:mt-4"
                initial={{ scale: 0.9, rotate: -6 }}
                whileHover={{ scale: 1.1, rotate: 0 }}
              >
                <div className="px-6 py-2.5 rounded-full border-3 border-[#e52424] bg-[var(--paper)] text-[#e52424] font-black text-sm xs:text-base uppercase tracking-widest shadow-[4px_4px_0_#e52424] flex items-center justify-center gap-1.5">
                  <span>TAUSHIK</span>
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    className="inline-block text-xs origin-center"
                  >
                    ✦
                  </motion.span>
                  <span>UX</span>
                </div>
              </motion.div>
            </div>

            {/* Bottom Frame Bar */}
            <div className="relative flex items-center justify-between text-[#e52424] font-black text-[9px] xs:text-[10px] sm:text-xs md:text-sm tracking-wider uppercase mt-3 sm:mt-5 px-1 sm:px-2">
              <span className="flex items-center gap-1 sm:gap-2 font-bold">
                UI/UX DESIGNER
                <motion.span
                  animate={{ scale: [1, 1.4, 1], opacity: [0.8, 1, 0.8] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                  className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#e52424] inline-block shadow-xs"
                />
              </span>
              <div className="flex-1 mx-2 sm:mx-6 h-[1.5px] bg-[#e52424]" />
              <span className="flex items-center gap-1 sm:gap-2 font-bold">
                <motion.span
                  animate={{ scale: [1, 1.4, 1], opacity: [0.8, 1, 0.8] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                  className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#e52424] inline-block shadow-xs"
                />
                PRODUCT DESIGNER
              </span>
            </div>
          </motion.div>
        </div>

        {/* ── Scroll Transition Affordance into 3D Room ── */}
        <div className="flex justify-center pt-2 sm:pt-3">
          <button
            type="button"
            onClick={onEnterRoom}
            className="group flex flex-col items-center gap-1 text-[#220608] hover:text-[#e52424] font-sans text-xs sm:text-[13px] font-medium tracking-normal transition-colors cursor-pointer select-none"
            aria-label="Scroll to enter the 3D bedroom portfolio"
          >
            <span className="italic">Scroll to enter my room</span>
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full border border-[#e52424] flex items-center justify-center bg-white/60 transition-transform group-hover:translate-y-0.5 shadow-2xs">
              <ArrowDown size={13} className="text-[#e52424] animate-bounce" />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}
