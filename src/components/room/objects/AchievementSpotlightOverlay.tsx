"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trophy,
  Award,
  X,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { achievements, type Achievement } from "@/lib/content";

export interface AchievementSpotlightOverlayProps {
  isOpen: boolean;
  activeIndex: number;
  onClose: () => void;
  onIndexChange: (newIndex: number) => void;
}

/**
 * AchievementSpotlightOverlay
 * Tactile achievement sticker mounted along the cupboard's vertical connecting thread.
 * When clicking Next/Prev, the card slides vertically top-to-bottom
 * with authentic spring physics.
 * Clicking outside the content card returns the user to the entire room.
 */
export function AchievementSpotlightOverlay({
  isOpen,
  activeIndex,
  onClose,
  onIndexChange,
}: AchievementSpotlightOverlayProps) {
  const total = achievements.length;
  const item: Achievement = achievements[activeIndex] || achievements[0];
  const [direction, setDirection] = useState<number>(1);

  const handleNext = () => {
    if (activeIndex < total - 1) {
      setDirection(1);
      onIndexChange(activeIndex + 1);
    }
  };

  const handlePrev = () => {
    if (activeIndex > 0) {
      setDirection(-1);
      onIndexChange(activeIndex - 1);
    }
  };

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        if (activeIndex < total - 1) {
          setDirection(1);
          onIndexChange(activeIndex + 1);
        }
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        if (activeIndex > 0) {
          setDirection(-1);
          onIndexChange(activeIndex - 1);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, activeIndex, total, onIndexChange, onClose]);

  if (!isOpen) return null;

  // Vertical object sliding variants along cupboard thread
  const verticalStickerVariants = {
    enter: (dir: number) => ({
      y: dir > 0 ? 110 : -110,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        y: { type: "spring" as const, stiffness: 280, damping: 24 },
        scale: { type: "spring" as const, stiffness: 240, damping: 22 },
        opacity: { duration: 0.18 },
      },
    },
    exit: (dir: number) => ({
      y: dir > 0 ? -110 : 110,
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.15 },
    }),
  };

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
        className="w-full max-w-lg cursor-default"
      >
        {/* ── Tactile Cream Paper Certificate Card ── */}
        <div
          data-testid="achievement-spotlight-card"
          className="relative rounded-2xl sm:rounded-3xl border border-[#E5DECF] bg-[#FDFBF7] shadow-[0_24px_65px_rgba(23,21,21,0.22)] p-5 sm:p-7 max-h-[88vh] overflow-y-auto text-[#1C1917]"
        >
          {/* Top Brass Pin & Hanging Red Thread Motif */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-6 bg-[#E52424] opacity-80" />
          <div className="absolute top-5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#C8942E] border-2 border-white shadow-xs" />

          {/* ── Top Header Strip ── */}
          <div className="flex items-center justify-between pb-3 mb-4 mt-2 border-b border-[#E8E1D5]">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C8942E] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C8942E] shadow-[0_0_6px_#c8942e]" />
              </span>
              <span className="text-[#C8942E] font-mono text-xs font-black uppercase tracking-wider">
                HACKATHON HONORS // 0{activeIndex + 1} OF 0{total}
              </span>
              {item.badge && (
                <span className="px-2.5 py-0.5 rounded-full bg-[#C8942E]/15 text-[#8C6212] border border-[#C8942E]/30 font-mono text-[10px] font-bold">
                  ★ {item.badge}
                </span>
              )}
            </div>

            <button
              type="button"
              data-testid="close-achievement-card"
              onClick={onClose}
              className="flex items-center gap-1.5 px-3 py-1.5 min-h-[38px] rounded-full bg-stone-100 hover:bg-[#E52424] hover:text-white text-stone-700 text-xs font-mono font-bold border border-stone-200 transition-all cursor-pointer shadow-2xs"
              aria-label="Return to entire room overview"
            >
              <X size={15} />
              <span>ESC</span>
            </button>
          </div>

          {/* ── Animated Vertical Content Slider (Top-to-Bottom) ── */}
          <div className="relative overflow-hidden min-h-[320px]">
            <AnimatePresence mode="popLayout" custom={direction} initial={false}>
              <motion.div
                key={item.id}
                custom={direction}
                variants={verticalStickerVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full"
              >
                {/* Certificate Preview inside Crisp Archival Frame */}
                {item.image && (
                  <div className="relative w-full h-44 mb-3 rounded-xl overflow-hidden border border-[#E2DBD1] bg-white shadow-xs p-1">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-contain p-2"
                      sizes="(max-width: 640px) 100vw, 500px"
                      priority
                    />
                  </div>
                )}

                {/* Award Title & Host */}
                <div className="mb-3">
                  <span className="text-xs font-mono font-bold text-[#C8942E] uppercase tracking-wider">
                    {item.host} // {item.date || "2026"}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-serif font-black text-[#171515] mt-1 leading-tight">
                    {item.title}
                  </h2>
                  <p className="text-xs sm:text-sm font-mono text-[#E52424] font-bold mt-1">
                    ★ {item.award}
                  </p>
                </div>

                {/* Metrics Grid */}
                {item.metrics && item.metrics.length > 0 && (
                  <div className="grid grid-cols-2 gap-2.5 mb-3">
                    {item.metrics.map((m, i) => (
                      <div
                        key={i}
                        className="p-3 rounded-xl bg-white border border-[#E2DBD1] text-center shadow-2xs"
                      >
                        <div className="text-base font-black font-mono text-[#C8942E]">
                          {m.value}
                        </div>
                        <div className="text-[10px] font-mono text-stone-500 uppercase tracking-wider mt-0.5 font-bold">
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Description */}
                <p className="text-xs sm:text-sm text-[#443E38] leading-relaxed mb-2 font-medium">
                  {item.description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ── Footer Navigation (Top/Bottom + Prev/Next Controls) ── */}
          <div className="flex items-center justify-between pt-3 mt-3 border-t border-[#E8E1D5]">
            <div className="flex items-center gap-2">
              <button
                type="button"
                data-testid="achievement-prev-btn"
                disabled={activeIndex === 0}
                onClick={handlePrev}
                className={`flex items-center gap-1 px-3 py-2 min-h-[44px] rounded-xl border text-xs font-mono font-bold transition-all shadow-2xs ${
                  activeIndex === 0
                    ? "opacity-35 border-stone-200 text-stone-400 bg-stone-50 cursor-not-allowed"
                    : "border-[#E2DBD1] bg-white hover:bg-stone-100 text-stone-800 cursor-pointer"
                }`}
                aria-label="Previous achievement (ArrowUp)"
              >
                <ChevronUp size={16} />
                <span>PREV</span>
              </button>

              <span className="text-xs font-mono font-bold text-stone-800 px-2">
                {activeIndex + 1} / {total}
              </span>

              <button
                type="button"
                data-testid="achievement-next-btn"
                disabled={activeIndex === total - 1}
                onClick={handleNext}
                className={`flex items-center gap-1 px-3 py-2 min-h-[44px] rounded-xl border text-xs font-mono font-bold transition-all shadow-2xs ${
                  activeIndex === total - 1
                    ? "opacity-35 border-stone-200 text-stone-400 bg-stone-50 cursor-not-allowed"
                    : "border-[#E2DBD1] bg-white hover:bg-stone-100 text-stone-800 cursor-pointer"
                }`}
                aria-label="Next achievement (ArrowDown)"
              >
                <span>NEXT</span>
                <ChevronDown size={16} />
              </button>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-[#C8942E] hidden sm:inline font-bold">
                [ ✦ SLIDE (↑/↓) ]
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
        </div>
      </motion.div>
    </div>
  );
}
