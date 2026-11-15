"use client";

import React, { useEffect, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Radio } from "lucide-react";

export interface HologramProjectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  category?: string;
  badge?: string;
  children: ReactNode;
  maxWidth?: string;
  headerActions?: ReactNode;
}

/**
 * Hologram Projector Showcase Modal
 * Faithfully matches the user's reference image (media_1794641150947_d0f09146.jpg):
 * 1. Dark circular metallic projector base pedestal at bottom with concentric glowing cyan rings and emitter core.
 * 2. Upward volumetric conical light beam radiating from emitter lens into the floating card.
 * 3. Floating luminous holographic glass display with cyan laser borders, corner brackets, scanlines, and telemetry.
 * 4. 100% accessible with Escape key, backdrop click, and smooth mobile touch-scrolling.
 */
export function HologramProjectorModal({
  isOpen,
  onClose,
  title,
  category = "HOLOGRAM ARCHIVE",
  badge = "TRANSMISSION ACTIVE",
  children,
  maxWidth = "max-w-4xl",
  headerActions,
}: HologramProjectorModalProps) {
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

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="hologram-projector-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center p-3 sm:p-5 md:p-6 bg-[#020617]/88 backdrop-blur-md overflow-hidden select-none pointer-events-auto"
          onClick={onClose}
        >
          {/* ── 1. Floating Holographic Content Card ── */}
          <motion.div
            key="hologram-card-container"
            initial={{ opacity: 0, scale: 0.90, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.90, y: 24 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className={`relative z-20 w-full ${maxWidth} max-h-[72vh] sm:max-h-[78vh] flex flex-col rounded-2xl sm:rounded-3xl border border-[#00F0FF]/60 bg-[#050C18]/94 shadow-[0_0_55px_rgba(0,240,255,0.28),inset_0_0_30px_rgba(0,240,255,0.06)] text-white overflow-hidden`}
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, rgba(0, 240, 255, 0.035) 0px, rgba(0, 240, 255, 0.035) 1px, transparent 1px, transparent 3px)",
            }}
          >
            {/* ── Sci-Fi Corner Brackets (Glowing Cyan) ── */}
            <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#00F0FF] pointer-events-none z-30" />
            <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#00F0FF] pointer-events-none z-30" />
            <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#00F0FF] pointer-events-none z-30" />
            <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#00F0FF] pointer-events-none z-30" />

            {/* ── Hologram Top Header Strip ── */}
            <header className="relative z-20 flex items-center justify-between px-4 sm:px-6 py-3 border-b border-[#00F0FF]/30 bg-[#0A172E]/85 backdrop-blur-md flex-wrap gap-2 shrink-0">
              <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                {/* Luminous Pulsing Cyan Beacon */}
                <span className="relative flex h-2.5 w-2.5 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00F0FF] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00F0FF] shadow-[0_0_8px_#00F0FF]" />
                </span>

                <div className="flex items-center gap-2">
                  <span className="text-[#00F0FF] font-mono text-[11px] sm:text-xs font-black tracking-widest uppercase">
                    {title}
                  </span>
                  <span className="hidden xs:inline-block px-2 py-0.5 rounded-full bg-[#00F0FF]/10 text-[#38BDF8] border border-[#00F0FF]/30 font-mono text-[9.5px] font-bold">
                    {category}
                  </span>
                  <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-[#00F0FF]/15 text-[#00F0FF] font-mono text-[9.5px] font-bold tracking-wide">
                    ● {badge}
                  </span>
                </div>
              </div>

              {/* Quick Actions & Close Button */}
              <div className="flex items-center gap-2">
                {headerActions}

                <button
                  type="button"
                  onClick={onClose}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#00F0FF]/10 hover:bg-[#00F0FF] hover:text-[#050C18] text-[#00F0FF] text-xs font-mono font-bold border border-[#00F0FF]/40 shadow-[0_0_12px_rgba(0,240,255,0.2)] transition-all cursor-pointer"
                  aria-label="Close hologram presentation"
                >
                  <X size={14} strokeWidth={2.5} />
                  <span>ESC</span>
                </button>
              </div>
            </header>

            {/* ── Main Holographic Content Scroll Area ── */}
            <div className="relative z-10 flex-1 overflow-y-auto p-4 sm:p-6 text-slate-200">
              {children}
            </div>

            {/* ── Holographic Status Telemetry Footer ── */}
            <footer className="relative z-20 flex items-center justify-between px-4 sm:px-6 py-2 border-t border-[#00F0FF]/25 bg-[#081224]/90 text-[10px] font-mono text-[#38BDF8] shrink-0">
              <div className="flex items-center gap-2">
                <Radio size={12} className="text-[#00F0FF] animate-pulse" />
                <span className="tracking-widest uppercase">
                  HOLOGRAM MATRIX // FREQ: 44.1 kHz
                </span>
              </div>
              <div className="tracking-wider text-[#94A3B8]">
                [ TAP OUTSIDE OR PRESS ESC TO RETURN ]
              </div>
            </footer>
          </motion.div>

          {/* ── 2. Volumetric Upward Conical Light Beam (Radiating into the Card) ── */}
          <div
            className="relative z-10 w-full max-w-2xl h-12 sm:h-18 -mt-1 pointer-events-none flex items-center justify-center overflow-hidden shrink-0"
            aria-hidden="true"
          >
            {/* Conical Light Fan */}
            <div
              className="w-full h-full opacity-75"
              style={{
                background:
                  "linear-gradient(to top, rgba(0, 240, 255, 0.55) 0%, rgba(6, 182, 212, 0.22) 50%, rgba(0, 240, 255, 0.08) 100%)",
                clipPath: "polygon(42% 100%, 58% 100%, 88% 0%, 12% 0%)",
              }}
            />
            {/* Vertical laser light lines */}
            <div
              className="absolute inset-0 opacity-45"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(90deg, rgba(0, 240, 255, 0.35) 0px, rgba(0, 240, 255, 0.35) 2px, transparent 2px, transparent 24px)",
                clipPath: "polygon(44% 100%, 56% 100%, 84% 0%, 16% 0%)",
              }}
            />
          </div>

          {/* ── 3. Dark Circular Projector Base Pedestal (Direct Reference Feature) ── */}
          <div
            className="relative z-10 w-44 sm:w-56 h-8 sm:h-10 -mt-2 pointer-events-none flex flex-col items-center justify-center shrink-0"
            aria-hidden="true"
          >
            {/* Pedestal Top Aperture Rings (Concentric Glowing Cyan) */}
            <div className="relative w-full h-4 sm:h-5 rounded-[100%] bg-[#081224] border-2 border-[#00F0FF] shadow-[0_0_24px_#00F0FF] flex items-center justify-center">
              {/* Inner ring */}
              <div className="w-[70%] h-[60%] rounded-[100%] border border-[#38BDF8] shadow-[0_0_12px_#38BDF8] flex items-center justify-center">
                {/* Center glowing lens */}
                <div className="w-[35%] h-[50%] rounded-[100%] bg-white shadow-[0_0_18px_#00F0FF]" />
              </div>
            </div>

            {/* Pedestal Cylindrical Body */}
            <div className="w-[96%] h-4 sm:h-5 rounded-b-xl bg-gradient-to-b from-[#0A1428] via-[#050C18] to-[#020617] border-x border-b border-[#00F0FF]/30 shadow-[0_8px_20px_rgba(0,0,0,0.8)]" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
