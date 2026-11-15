"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Mail,
  ArrowDown,
} from "lucide-react";
import { HeroAtmosphere } from "./HeroAtmosphere";

function LinkedInIcon({ size = 16, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.6 1.6 0 0 0-1.6 1.6 1.6 1.6 0 0 0 1.6 1.6 1.6 1.6 0 0 0 1.6-1.6 1.6 1.6 0 0 0-1.6-1.6Z" />
    </svg>
  );
}

export interface TaushikHeroProps {
  /** Scroll exit progress from 0 (hero fully visible) to 1 (room fully active) */
  scrollExitProgress?: number;
  /** Callback when user clicks scroll cue to enter the 3D bedroom */
  onEnterRoom?: () => void;
  /** Callback when user clicks specific navigation destinations */
  onNavigateToTarget?: (target: "work" | "about" | "contact" | "journey") => void;
  /** Whether hero is actively interactive */
  isHeroActive?: boolean;
}

/**
 * Taushik Personal Portfolio Workspace Diorama Hero
 * Recreated strictly from the reference layout specification:
 * - Centered greeting and descriptor at the top
 * - Primary name "Taushik" accented in signature red (#C91F2B)
 * - Transparent 2.5D workspace diorama illustration as the central visual anchor
 * - Top-right verified social shortcuts (LinkedIn & Email)
 * - Restrained vertical navigation rail along the left edge with real interactive actions
 * - Clear downward scroll cue at the bottom: "SCROLL TO MY ROOM"
 * - 100% white + red brand system (#FFFEFD canvas, #C91F2B red, #171515 ink)
 */
export function TaushikHero({
  scrollExitProgress = 0,
  onEnterRoom,
  onNavigateToTarget,
  isHeroActive = true,
}: TaushikHeroProps) {
  const shouldReduceMotion = useReducedMotion();

  // Scroll transition: fades out and translates gently upward as user scrolls into the room
  const heroOpacity = Math.max(0, 1 - scrollExitProgress * 1.5);
  const translateY = shouldReduceMotion ? 0 : scrollExitProgress * -40;

  return (
    <section
      id="hero"
      aria-label="Introduction hero"
      className="relative w-full h-screen min-h-[640px] max-h-[1440px] flex flex-col justify-between items-center bg-[#FFFEFD] text-[#171515] overflow-hidden select-none px-4 sm:px-8 py-5 sm:py-7 md:py-8"
      style={{
        opacity: heroOpacity,
        transform: `translate3d(0, ${translateY}px, 0)`,
        pointerEvents: heroOpacity < 0.15 ? "none" : "auto",
        willChange: "transform, opacity",
      }}
    >
      {/* ── 0. Professional Ambient Gradients & Abstract Geometric Shapes ── */}
      <HeroAtmosphere />

      {/* ── 1. Top-Right Social Shortcuts ── */}
      <div className="absolute top-4 sm:top-7 md:top-8 right-4 sm:right-8 md:right-12 lg:right-16 z-30 flex items-center gap-2 sm:gap-2.5">
        <a
          href="https://www.linkedin.com/in/taushik-chandana-16ba14378"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn Profile (opens in new tab)"
          className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-[#E9E2E3] bg-white text-[#706B6B] hover:text-[#C91F2B] hover:border-[#C91F2B] flex items-center justify-center transition-all shadow-2xs hover:shadow-xs outline-none focus-visible:ring-2 focus-visible:ring-[#C91F2B] cursor-pointer"
        >
          <LinkedInIcon size={16} className="transition-transform group-hover:scale-110" />
        </a>
        <a
          href="mailto:taushikok@gmail.com"
          aria-label="Send email to taushikok@gmail.com"
          className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-[#E9E2E3] bg-white text-[#706B6B] hover:text-[#C91F2B] hover:border-[#C91F2B] flex items-center justify-center transition-all shadow-2xs hover:shadow-xs outline-none focus-visible:ring-2 focus-visible:ring-[#C91F2B] cursor-pointer"
        >
          <Mail size={16} className="transition-transform group-hover:scale-110" />
        </a>
      </div>

      {/* ── 2. Centered Editorial Intro Block ── */}
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: -14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-2xl mx-auto flex flex-col items-center text-center mt-7 sm:mt-2 z-20 px-4"
      >
        <h1 className="text-2xl xs:text-[28px] sm:text-4xl md:text-[44px] lg:text-[48px] font-bold tracking-tight text-[#171515] leading-tight sm:leading-none">
          Hi, I&apos;m <span className="text-[#C91F2B]">Taushik</span>
        </h1>
        <p className="mt-2 sm:mt-3 text-xs sm:text-sm md:text-base text-[#706B6B] font-medium tracking-normal leading-relaxed max-w-lg">
          UI/UX designer &amp; product builder creating thoughtful digital experiences
        </p>
      </motion.div>

      {/* ── 4. Main Visual Anchor: Centered Workspace Diorama ── */}
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full flex-1 flex items-center justify-center my-auto min-h-0 py-1 sm:py-2"
      >
        <picture className="w-full h-full flex items-center justify-center">
          <source
            media="(max-width: 640px)"
            srcSet="/hero/workspace/taushik-workspace-diorama-640.webp"
            type="image/webp"
          />
          <source
            media="(max-width: 1024px)"
            srcSet="/hero/workspace/taushik-workspace-diorama-960.webp"
            type="image/webp"
          />
          <source
            srcSet="/hero/workspace/taushik-workspace-diorama.webp"
            type="image/webp"
          />
          <img
            src="/hero/workspace/taushik-workspace-diorama.webp"
            alt="Taushik workspace diorama featuring a designer at desk with monitor, laptop, books, camera, plant, and shelves"
            width={1092}
            height={1167}
            className="w-auto h-auto max-w-[94vw] sm:max-w-[560px] md:max-w-[620px] lg:max-w-[680px] xl:max-w-[730px] max-h-[52vh] sm:max-h-[56vh] md:max-h-[60vh] object-contain drop-shadow-[0_16px_36px_rgba(23,21,21,0.06)]"
            loading="eager"
            decoding="async"
          />
        </picture>
      </motion.div>

      {/* ── 5. Bottom Scroll Cue: "SCROLL TO MY ROOM" ── */}
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="w-full flex justify-center mb-1 sm:mb-2 z-20"
      >
        <button
          type="button"
          onClick={onEnterRoom}
          aria-label="Scroll to explore interactive 3D bedroom"
          className="group px-5 sm:px-6 py-2.5 sm:py-3 rounded-full border border-[#E9E2E3] bg-white/95 hover:border-[#C91F2B] hover:text-[#C91F2B] text-[#171515] transition-all shadow-2xs hover:shadow-xs active:scale-98 flex items-center gap-2.5 sm:gap-3 text-xs sm:text-[13px] font-bold tracking-[0.12em] uppercase outline-none focus-visible:ring-2 focus-visible:ring-[#C91F2B] cursor-pointer"
        >
          <span>SCROLL TO MY ROOM</span>
          <span
            className="w-5 h-5 rounded-full border border-[#C91F2B] text-[#C91F2B] flex items-center justify-center text-[10px] group-hover:translate-y-0.5 transition-transform"
            aria-hidden="true"
          >
            <ArrowDown size={12} strokeWidth={2.5} />
          </span>
        </button>
      </motion.div>
    </section>
  );
}
