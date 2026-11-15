"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

export interface HeroIntroProps {
  onExploreWork?: () => void;
}

/**
 * Editorial Introduction Block (Left Column)
 * Matches the reference composition:
 * - Headline: "Hello! I'm Taushik Chandana." (Signature red name accent)
 * - Supporting role line: "Product designer & creative developer"
 * - Concise, verified description of design and creative engineering focus
 * - Primary CTA ("Explore my work") & Secondary CTA ("View résumé")
 */
export function HeroIntro({ onExploreWork }: HeroIntroProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col justify-center text-left max-w-[620px] z-10"
    >
      {/* ── Main Editorial Display Headline ── */}
      <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-[54px] lg:text-[58px] xl:text-[68px] font-extrabold text-[#171515] leading-[1.06] sm:leading-[1.04] tracking-tight mb-2.5 sm:mb-5">
        Hello! I’m
        <br />
        <span className="text-[#C91F2B]">Taushik Chandana.</span>
      </h1>

      {/* ── Core Role Statement ── */}
      <p className="text-base sm:text-[20px] md:text-[21px] font-semibold text-[#171515] tracking-tight mb-2 sm:mb-4">
        Product designer &amp; creative developer
      </p>

      {/* ── Verified Description Paragraph ── */}
      <p className="text-[13.5px] sm:text-base md:text-[17px] text-[#706B6B] leading-[1.55] sm:leading-[1.62] max-w-[500px] mb-6 sm:mb-10 font-normal">
        I build thoughtful digital products, playful interfaces, and experiences
        that bring design and technology together.
      </p>

      {/* ── Single Action CTA: Explore my room (Per User Request) ── */}
      <div className="flex items-center">
        <button
          type="button"
          onClick={onExploreWork}
          className="inline-flex items-center justify-center min-h-[48px] sm:min-h-[52px] px-8 sm:px-9 py-3 sm:py-3.5 rounded-full bg-[#C91F2B] hover:bg-[#971724] text-white font-semibold text-sm sm:text-base shadow-[0_4px_18px_rgba(201,31,43,0.24)] hover:shadow-[0_8px_26px_rgba(201,31,43,0.34)] hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#C91F2B]"
        >
          Explore my room
        </button>
      </div>
    </motion.div>
  );
}
