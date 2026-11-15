"use client";

import React from "react";
import { ArrowDown } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

export interface HeroScrollCueProps {
  onScrollToRoom?: () => void;
}

/**
 * Centered Bottom Scroll Cue (Per User Request)
 * Centered small interactive cue indicating:
 * "SCROLL TO EXPLORE ROOM" with a downward arrow showing below
 */
export function HeroScrollCue({ onScrollToRoom }: HeroScrollCueProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <footer className="relative z-20 w-full pt-1 pb-4 sm:pb-6 flex items-center justify-center select-none">
      <button
        type="button"
        onClick={onScrollToRoom}
        aria-label="Scroll to explore room"
        className="group inline-flex flex-col items-center gap-1 px-5 py-2 rounded-full border border-[#E9E2E3] hover:border-[#C91F2B] bg-white/90 hover:bg-white text-[#706B6B] hover:text-[#C91F2B] shadow-2xs hover:shadow-xs transition-all cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#C91F2B]"
      >
        <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.20em] uppercase text-[#706B6B] group-hover:text-[#C91F2B] transition-colors">
          SCROLL TO EXPLORE ROOM
        </span>
        <motion.div
          animate={shouldReduceMotion ? { y: 0 } : { y: [0, 3, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="text-[#C91F2B]"
        >
          <ArrowDown size={14} strokeWidth={2.6} />
        </motion.div>
      </button>
    </footer>
  );
}
