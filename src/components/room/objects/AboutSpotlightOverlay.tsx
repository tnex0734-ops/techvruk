"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  X,
  Code2,
  Palette,
  Layers,
  MapPin,
  Compass,
} from "lucide-react";

export interface AboutSpotlightOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * AboutSpotlightOverlay
 * Renders verified philosophy, focus areas, and engineering toolkit
 * inside an authentic personal sketchbook spread.
 * Clicking outside the content card returns the user to the entire room.
 */
export function AboutSpotlightOverlay({
  isOpen,
  onClose,
}: AboutSpotlightOverlayProps) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 pointer-events-auto select-none bg-black/40 backdrop-blur-xs cursor-pointer"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 16 }}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl max-h-[90vh] overflow-y-auto cursor-default"
      >
        {/* ── Tactile Editorial Sketchbook Spread ── */}
        <div
          data-testid="about-spotlight-card"
          className="relative rounded-2xl sm:rounded-3xl border border-[#E5DFD5] bg-[#FCFAF7] shadow-[0_24px_65px_rgba(23,21,21,0.22)] p-6 sm:p-8 text-[#1C1917]"
        >
          {/* Fun Tactile Element: Yellow Post-It Note Stuck at Top Edge */}
          <div className="hidden sm:block absolute -top-4 right-28 w-38 p-2.5 rounded-sm bg-[#FFF8CC] border border-[#F0E6A2] shadow-sm rotate-[4deg] text-[10px] font-mono text-stone-800 pointer-events-none z-10 leading-snug">
            <span className="font-bold text-[#E52424]">NOTE:</span> Obsessed with tactile micro-interactions, physical craft &amp; good coffee ☕
          </div>

          {/* ── Top Header Strip ── */}
          <div className="flex items-center justify-between pb-3 mb-5 border-b border-[#E8E1D5]">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E52424] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E52424] shadow-[0_0_6px_#e52424]" />
              </span>
              <span className="text-[#E52424] font-mono text-xs font-black uppercase tracking-wider">
                PERSONAL SKETCHBOOK // TAUSHIK CHANDANA
              </span>
            </div>

            <button
              type="button"
              data-testid="close-about-notebook"
              onClick={onClose}
              className="flex items-center gap-1.5 px-3 py-1.5 min-h-[38px] rounded-full bg-stone-100 hover:bg-[#E52424] hover:text-white text-stone-700 text-xs font-mono font-bold border border-stone-200 transition-all cursor-pointer shadow-2xs"
              aria-label="Return to entire room overview"
            >
              <X size={15} />
              <span>ESC</span>
            </button>
          </div>

          {/* ── Two Column Spread ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Left Column: Philosophy & Focus */}
            <div className="flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#E52424] uppercase tracking-wider">
                  DESIGN ENGINEER // HYDERABAD
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif font-black text-[#171515] mt-1 leading-tight">
                  Taushik Chandana
                </h2>
                <p className="text-xs sm:text-sm text-[#443E38] leading-relaxed mt-2.5 font-medium">
                  I craft digital products at the intersection of intentional UX, rapid AI prototyping, and tactile 3D spatial engineering.
                </p>

                {/* Core Philosophy Callout */}
                <div className="p-4 rounded-xl bg-white border border-[#E2DBD1] shadow-2xs my-4">
                  <div className="text-[10px] font-mono font-bold text-[#E52424] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <Sparkles size={12} className="text-[#E52424]" />
                    <span>PHILOSOPHY // LESS CHAOS. MORE CRAFT.</span>
                  </div>
                  <p className="text-xs italic font-serif text-[#1C1917] leading-relaxed font-semibold">
                    “Every pixel, motion transition, and component must have a clear physical or functional motivation — never decorative noise.”
                  </p>
                </div>

                {/* Core Focus Areas */}
                <div className="text-[10px] font-mono font-bold text-[#E52424] uppercase tracking-wider mb-2">
                  CORE FOCUS:
                </div>
                <ul className="text-xs text-[#2D2620] space-y-2 font-medium">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E52424]" />
                    <span>Full-stack web products &amp; design engineering</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E52424]" />
                    <span>Spatial 3D web experiences with Three.js &amp; R3F</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E52424]" />
                    <span>AI diagnostic interfaces &amp; human-AI workflows</span>
                  </li>
                </ul>
              </div>

              <div className="pt-3 mt-4 border-t border-[#E8E1D5] flex items-center justify-between text-[11px] font-mono text-stone-500 font-bold">
                <span className="flex items-center gap-1">
                  <MapPin size={12} className="text-[#E52424]" />
                  <span>Hyderabad &amp; Bengaluru, IN</span>
                </span>
                <span>P. 01</span>
              </div>
            </div>

            {/* Right Column: Engineering Toolkit */}
            <div className="flex flex-col justify-between">
              <div>
                <div className="text-[11px] font-mono font-bold text-[#E52424] uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <Compass size={13} className="text-[#E52424]" />
                  <span>ENGINEERING TOOLKIT</span>
                </div>

                {/* 1. Core Stack */}
                <div className="mb-3.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#171515] mb-1.5">
                    <Code2 size={13} className="text-[#E52424]" />
                    <span>Frontend &amp; Creative Engineering</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      "TypeScript",
                      "React 19",
                      "Next.js",
                      "Three.js",
                      "React Three Fiber",
                      "Tailwind CSS v4",
                      "Framer Motion",
                      "WebGL Shaders",
                    ].map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-md bg-white border border-[#E2DBD1] text-[10px] font-mono text-stone-800 font-semibold shadow-2xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 2. Product Design */}
                <div className="mb-3.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#171515] mb-1.5">
                    <Palette size={13} className="text-[#E52424]" />
                    <span>Product &amp; Systems Design</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      "Design Systems",
                      "Figma Tokens",
                      "Micro-interactions",
                      "User Research",
                      "Rapid Prototyping",
                    ].map((tool) => (
                      <span
                        key={tool}
                        className="px-2.5 py-1 rounded-md bg-white border border-[#E2DBD1] text-[10px] font-mono text-stone-800 font-semibold shadow-2xs"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 3. AI & Architecture */}
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#171515] mb-1.5">
                    <Layers size={13} className="text-[#E52424]" />
                    <span>Architecture &amp; Intelligence</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      "Demand Rendering (0% Idle CPU)",
                      "FastAPI & Python",
                      "Gemini API & LLMs",
                      "Accessible Semantics",
                    ].map((tool) => (
                      <span
                        key={tool}
                        className="px-2.5 py-1 rounded-md bg-white border border-[#E2DBD1] text-[10px] font-mono text-stone-800 font-semibold shadow-2xs"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-3 mt-4 border-t border-[#E8E1D5] flex items-center justify-between text-[11px] font-mono text-stone-500 font-bold">
                <span>Verified Creative Record</span>
                <span>P. 02</span>
              </div>
            </div>
          </div>

          {/* ── Footer ── */}
          <div className="pt-3 border-t border-[#E8E1D5] flex items-center justify-between">
            <span className="text-[11px] font-mono text-stone-400">
              [ Click outside or press ESC to view entire room ]
            </span>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 min-h-[44px] rounded-full bg-stone-100 hover:bg-[#E52424] hover:text-white text-stone-800 border border-[#E2DBD1] font-mono text-xs font-bold transition-all cursor-pointer shadow-2xs"
            >
              SEE ENTIRE ROOM
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
