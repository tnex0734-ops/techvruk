"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Briefcase,
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  MapPin,
  CheckCircle2,
} from "lucide-react";
import { experience, type ExperienceItem } from "@/lib/content";

export interface ExperienceSpotlightOverlayProps {
  isOpen: boolean;
  activeIndex: number;
  onClose: () => void;
  onIndexChange: (newIndex: number) => void;
}

/**
 * ExperienceSpotlightOverlay
 * Tactile index card pinned to the wall with a brass pushpin motif.
 * When clicking Next/Prev, the card slides horizontally left-to-right
 * with authentic physical spring and swing motion.
 * Clicking outside the content card returns the user to the entire room.
 */
export function ExperienceSpotlightOverlay({
  isOpen,
  activeIndex,
  onClose,
  onIndexChange,
}: ExperienceSpotlightOverlayProps) {
  const total = experience.length;
  const item: ExperienceItem = experience[activeIndex] || experience[0];
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
      } else if (e.key === "ArrowRight") {
        if (activeIndex < total - 1) {
          setDirection(1);
          onIndexChange(activeIndex + 1);
        }
      } else if (e.key === "ArrowLeft") {
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

  // Tactile wall pin horizontal swing variants
  const pinSlideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 140 : -140,
      rotate: dir > 0 ? 3.5 : -3.5,
      opacity: 0,
      scale: 0.96,
    }),
    center: {
      x: 0,
      rotate: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring" as const, stiffness: 280, damping: 24 },
        rotate: { type: "spring" as const, stiffness: 240, damping: 20 },
        opacity: { duration: 0.18 },
        scale: { duration: 0.2 },
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -140 : 140,
      rotate: dir > 0 ? -3.5 : 3.5,
      opacity: 0,
      scale: 0.96,
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
        {/* ── Tactile Pinned Paper Index Card ── */}
        <div
          data-testid="experience-spotlight-card"
          className="relative rounded-2xl sm:rounded-3xl border border-[#E2DBD1] bg-[#FCFAF7] shadow-[0_24px_65px_rgba(23,21,21,0.22)] p-5 sm:p-7 max-h-[88vh] overflow-y-auto text-[#1C1917] pt-7"
        >
          {/* ── Realistic Brass Pushpin Motif at Top Center ── */}
          <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 flex flex-col items-center z-20 pointer-events-none">
            <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#FFE89E] via-[#EFCB75] to-[#B38F36] shadow-md border-2 border-white flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-[#8A6D1C]" />
            </div>
          </div>

          {/* ── Top Header Strip ── */}
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#E8E1D5]">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E52424] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E52424] shadow-[0_0_6px_#e52424]" />
              </span>
              <span className="text-[#E52424] font-mono text-xs font-black uppercase tracking-wider">
                WORK ARCHIVE // 0{activeIndex + 1} OF 0{total}
              </span>
            </div>

            <button
              type="button"
              data-testid="close-experience-card"
              onClick={onClose}
              className="flex items-center gap-1.5 px-3 py-1.5 min-h-[38px] rounded-full bg-stone-100 hover:bg-[#E52424] hover:text-white text-stone-700 text-xs font-mono font-bold border border-stone-200 transition-all cursor-pointer shadow-2xs"
              aria-label="Return to entire room overview"
            >
              <X size={15} />
              <span>ESC</span>
            </button>
          </div>

          {/* ── Animated Horizontal Pinboard Content Slider ── */}
          <div className="relative overflow-hidden min-h-[300px]">
            <AnimatePresence mode="popLayout" custom={direction} initial={false}>
              <motion.div
                key={item.company + item.role}
                custom={direction}
                variants={pinSlideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full"
              >
                {/* Role & Company */}
                <div className="mb-4">
                  <span className="text-xs font-mono font-bold text-[#E52424] uppercase tracking-wider">
                    {item.company}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-serif font-black text-[#171515] mt-1 leading-tight">
                    {item.role}
                  </h2>
                  <div className="flex items-center gap-2 mt-2 text-xs font-mono text-stone-600 font-semibold">
                    <Calendar size={13} className="text-[#E52424]" />
                    <span>{item.date}</span>
                    <span className="text-stone-300">•</span>
                    <MapPin size={13} className="text-stone-500" />
                    <span>Hyderabad / Remote</span>
                  </div>
                </div>

                {/* Core Focus Box */}
                {item.tagline && (
                  <div className="p-3.5 rounded-xl bg-white border border-[#E2DBD1] shadow-2xs mb-4">
                    <div className="text-[10px] font-mono font-bold text-[#E52424] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                      <Sparkles size={12} className="text-[#E52424]" />
                      <span>DOMAIN FOCUS</span>
                    </div>
                    <p className="text-sm font-bold text-[#171515]">
                      {item.tagline}
                    </p>
                    {item.focus && (
                      <p className="text-xs text-stone-600 mt-0.5 font-medium">
                        {item.focus}
                      </p>
                    )}
                  </div>
                )}

                {/* Verified Deliverables */}
                <div className="space-y-2 mb-4">
                  <div className="text-[11px] font-mono font-bold text-stone-500 uppercase tracking-wider mb-1.5">
                    KEY DELIVERABLES &amp; IMPACT:
                  </div>
                  {activeIndex === 0 && (
                    <>
                      <div className="flex items-start gap-2 text-xs text-[#2D2620] font-medium leading-relaxed">
                        <CheckCircle2 size={14} className="text-[#E52424] shrink-0 mt-0.5" />
                        <span>Engineered responsive web interfaces and reusable UI component primitives in Figma and code.</span>
                      </div>
                      <div className="flex items-start gap-2 text-xs text-[#2D2620] font-medium leading-relaxed">
                        <CheckCircle2 size={14} className="text-[#E52424] shrink-0 mt-0.5" />
                        <span>Mapped complete user flows, rapid interactive prototypes, and production design system tokens.</span>
                      </div>
                    </>
                  )}
                  {activeIndex === 1 && (
                    <>
                      <div className="flex items-start gap-2 text-xs text-[#2D2620] font-medium leading-relaxed">
                        <CheckCircle2 size={14} className="text-[#E52424] shrink-0 mt-0.5" />
                        <span>Designed AI-assisted talent matching heuristics and recruiter dashboard information architecture.</span>
                      </div>
                      <div className="flex items-start gap-2 text-xs text-[#2D2620] font-medium leading-relaxed">
                        <CheckCircle2 size={14} className="text-[#E52424] shrink-0 mt-0.5" />
                        <span>Streamlined complex candidate pipelines, reducing decision latency through clear visual hierarchies.</span>
                      </div>
                    </>
                  )}
                  {activeIndex === 2 && (
                    <>
                      <div className="flex items-start gap-2 text-xs text-[#2D2620] font-medium leading-relaxed">
                        <CheckCircle2 size={14} className="text-[#E52424] shrink-0 mt-0.5" />
                        <span>Spearheaded design operations for high-velocity cross-platform mobile and web client releases.</span>
                      </div>
                      <div className="flex items-start gap-2 text-xs text-[#2D2620] font-medium leading-relaxed">
                        <CheckCircle2 size={14} className="text-[#E52424] shrink-0 mt-0.5" />
                        <span>Maintained component token libraries ensuring strict consistency between design and engineering.</span>
                      </div>
                    </>
                  )}
                  {activeIndex === 3 && (
                    <>
                      <div className="flex items-start gap-2 text-xs text-[#2D2620] font-medium leading-relaxed">
                        <CheckCircle2 size={14} className="text-[#E52424] shrink-0 mt-0.5" />
                        <span>Led and organized Hyderabad design community meetups, portfolio reviews, and hackathon sprints.</span>
                      </div>
                      <div className="flex items-start gap-2 text-xs text-[#2D2620] font-medium leading-relaxed">
                        <CheckCircle2 size={14} className="text-[#E52424] shrink-0 mt-0.5" />
                        <span>Mentored emerging designers in spatial UX principles, modern design systems, and rapid prototyping.</span>
                      </div>
                    </>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ── Footer Navigation (Left-to-Right Physical Switch) ── */}
          <div className="flex items-center justify-between pt-3 mt-3 border-t border-[#E8E1D5]">
            <div className="flex items-center gap-2">
              <button
                type="button"
                data-testid="experience-prev-btn"
                disabled={activeIndex === 0}
                onClick={handlePrev}
                className={`flex items-center gap-1.5 px-3 py-2 min-h-[44px] rounded-xl border text-xs font-mono font-bold transition-all shadow-2xs ${
                  activeIndex === 0
                    ? "opacity-35 border-stone-200 text-stone-400 bg-stone-50 cursor-not-allowed"
                    : "border-[#E2DBD1] bg-white hover:bg-stone-100 text-stone-800 cursor-pointer"
                }`}
                aria-label="Previous role (ArrowLeft)"
              >
                <ChevronLeft size={16} />
                <span>PREV</span>
              </button>

              <span className="text-xs font-mono font-bold text-stone-800 px-2">
                {activeIndex + 1} / {total}
              </span>

              <button
                type="button"
                data-testid="experience-next-btn"
                disabled={activeIndex === total - 1}
                onClick={handleNext}
                className={`flex items-center gap-1.5 px-3 py-2 min-h-[44px] rounded-xl border text-xs font-mono font-bold transition-all shadow-2xs ${
                  activeIndex === total - 1
                    ? "opacity-35 border-stone-200 text-stone-400 bg-stone-50 cursor-not-allowed"
                    : "border-[#E2DBD1] bg-white hover:bg-stone-100 text-stone-800 cursor-pointer"
                }`}
                aria-label="Next role (ArrowRight)"
              >
                <span>NEXT</span>
                <ChevronRight size={16} />
              </button>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-stone-500 hidden sm:inline font-bold">
                [ ✦ SLIDE (←/→) ]
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
