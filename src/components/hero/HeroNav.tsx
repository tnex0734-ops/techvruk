"use client";

import React from "react";

export interface HeroNavProps {
  onSelectDestination?: (destination: "work" | "about" | "contact") => void;
}

/**
 * Quiet Top Navigation Bar
 * Faithfully matches the composition reference:
 * - Left wordmark: TAUSHIK CHANDANA with signature red accent dot
 * - Right navigation links: WORK, ABOUT, CONTACT
 * - Height: 72-80px with subtle border-b and generous horizontal padding
 * - 100% accessible semantic buttons & links with keyboard focus rings
 */
export function HeroNav({ onSelectDestination }: HeroNavProps) {
  return (
    <header className="relative z-30 w-full h-[64px] sm:h-[72px] md:h-[80px] border-b border-[#E9E2E3]/60 bg-[#FFFEFE]/90 backdrop-blur-xs select-none">
      <div className="max-w-[1596px] h-full mx-auto px-4 sm:px-8 md:px-14 lg:px-20 flex items-center justify-between">
        {/* ── Left Identity Wordmark ── */}
        <a
          href="#hero"
          className="group inline-flex items-center gap-1.5 text-xs sm:text-[13px] md:text-sm font-bold tracking-[0.16em] sm:tracking-[0.20em] uppercase text-[#171515] hover:text-[#C91F2B] transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[#C91F2B] rounded-xs whitespace-nowrap"
        >
          <span>TAUSHIK CHANDANA</span>
          <span
            className="w-1.5 h-1.5 rounded-full bg-[#C91F2B] group-hover:scale-125 transition-transform shrink-0"
            aria-hidden="true"
          />
        </a>

        {/* ── Right Editorial Minimal Tag (Nav Links Removed Per User Request) ── */}
        <div className="text-[10.5px] xs:text-[11px] sm:text-xs font-mono font-bold tracking-wider text-[#706B6B] uppercase">
          <span>PORTFOLIO // 2026</span>
        </div>
      </div>
    </header>
  );
}
