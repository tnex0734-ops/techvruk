"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Eye,
} from "lucide-react";
import { BOOK_PROJECTS, BookProject } from "./projectData";

export interface ProjectSpotlightOverlayProps {
  isOpen: boolean;
  pageIndex: number;
  onClose: () => void;
  onViewBookOnly?: () => void;
  onPageChange: (newIndex: number) => void;
}

/**
 * Tactile Archival Paper Project Dossier
 * Features:
 * - Archival paper aesthetic with washi tape strip, manila folder tabs, and warm paper textures.
 * - Clicking outside the content card immediately closes and returns to the entire room overview.
 * - Smooth horizontal slide animation with keyboard and touch support.
 */
export function ProjectSpotlightOverlay({
  isOpen,
  pageIndex,
  onClose,
  onViewBookOnly,
  onPageChange,
}: ProjectSpotlightOverlayProps) {
  const total = BOOK_PROJECTS.length;
  const project: BookProject = BOOK_PROJECTS[pageIndex] || BOOK_PROJECTS[0];
  const [direction, setDirection] = useState<number>(1);

  const handleNext = () => {
    if (pageIndex < total - 1) {
      setDirection(1);
      onPageChange(pageIndex + 1);
    }
  };

  const handlePrev = () => {
    if (pageIndex > 0) {
      setDirection(-1);
      onPageChange(pageIndex - 1);
    }
  };

  const handleSelectProject = (idx: number) => {
    setDirection(idx > pageIndex ? 1 : -1);
    onPageChange(idx);
  };

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowRight") {
        if (pageIndex < total - 1) {
          setDirection(1);
          onPageChange(pageIndex + 1);
        }
      } else if (e.key === "ArrowLeft") {
        if (pageIndex > 0) {
          setDirection(-1);
          onPageChange(pageIndex - 1);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, pageIndex, total, onPageChange, onClose]);

  if (!isOpen) return null;

  // Tactile horizontal slide animation variants
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 120 : -120,
      opacity: 0,
      rotateY: dir > 0 ? 3 : -3,
      scale: 0.98,
    }),
    center: {
      x: 0,
      opacity: 1,
      rotateY: 0,
      scale: 1,
      transition: {
        x: { type: "spring" as const, stiffness: 280, damping: 25 },
        opacity: { duration: 0.18 },
        scale: { duration: 0.2 },
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -120 : 120,
      opacity: 0,
      rotateY: dir > 0 ? -3 : 3,
      scale: 0.98,
      transition: { duration: 0.15 },
    }),
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 pointer-events-auto select-none bg-black/40 backdrop-blur-xs cursor-pointer"
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
        className="w-full max-w-5xl cursor-default"
      >
        {/* ── Tactile Archival Paper Dossier Container ── */}
        <div
          data-testid="project-spotlight-dossier"
          className="relative rounded-2xl sm:rounded-3xl border border-[#E2DBD1] bg-[#FCFAF7] shadow-[0_24px_65px_rgba(23,21,21,0.22)] p-4 sm:p-7 max-h-[88vh] overflow-y-auto text-[#1C1917]"
        >
          {/* Fun Tactile Detail: Semi-Translucent Washi Tape Strip at Top Edge */}
          <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-32 h-4 bg-[#EADECE]/85 border-y border-[#D6C4B0] shadow-2xs rotate-[-1deg] rounded-xs pointer-events-none z-10" />

          {/* ── 1. Top Paper Dossier Header Bar ── */}
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#E8E1D5] flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E52424] opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#E52424] shadow-[0_0_6px_#e52424]" />
              </span>
              <span className="text-[#E52424] font-mono text-xs font-black tracking-wider uppercase">
                TAUSHIK ARCHIVE // PROJECT {project.number} OF 0{total}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-700 border border-stone-200/80 font-mono text-[10px] font-bold">
                {project.category}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-mono text-[10px] font-bold">
                ● {project.status}
              </span>
            </div>

            {/* Quick Actions: Minimize to 3D Book & Close to entire room */}
            <div className="flex items-center gap-2">
              {onViewBookOnly && (
                <button
                  type="button"
                  onClick={onViewBookOnly}
                  className="flex items-center gap-1.5 px-3 py-1.5 min-h-[38px] rounded-full bg-white hover:bg-stone-100 text-stone-800 border border-[#DCD3C5] text-[11px] font-mono font-bold transition-all cursor-pointer shadow-2xs"
                  title="Inspect open book on desk"
                >
                  <Eye size={13} className="text-[#E52424]" />
                  <span>VIEW 3D BOOK</span>
                </button>
              )}

              <button
                type="button"
                data-testid="close-project-dossier"
                onClick={onClose}
                className="flex items-center gap-1 px-3 py-1.5 min-h-[38px] rounded-full bg-stone-100 hover:bg-[#E52424] hover:text-white text-stone-700 text-xs font-mono font-bold border border-stone-200 transition-all cursor-pointer shadow-2xs"
                aria-label="Close project dossier and return to entire room"
              >
                <X size={15} />
                <span>ESC</span>
              </button>
            </div>
          </div>

          {/* ── 2. Quick-Jump Project Switcher Strip: Manila Folder Paper Tabs ── */}
          <div className="flex items-center gap-1.5 pb-3 mb-4 border-b border-[#E8E1D5] overflow-x-auto scrollbar-none">
            <span className="text-[10px] font-mono text-stone-500 font-bold uppercase tracking-wider shrink-0 mr-1">
              [ JUMP: ]
            </span>
            {BOOK_PROJECTS.map((p, idx) => (
              <button
                key={p.id}
                type="button"
                onClick={() => handleSelectProject(idx)}
                className={`px-3 py-1 rounded-lg font-mono text-[11px] font-bold transition-all shrink-0 cursor-pointer ${
                  idx === pageIndex
                    ? "bg-[#E52424] text-white shadow-xs font-black"
                    : "bg-white hover:bg-stone-100 text-stone-700 border border-[#E0D7CC] hover:border-[#E52424]"
                }`}
              >
                {p.number} {p.title}
              </button>
            ))}
          </div>

          {/* ── 3. Animated Horizontal Slide Wrapper ── */}
          <div className="relative overflow-hidden min-h-[360px]">
            <AnimatePresence mode="popLayout" custom={direction} initial={false}>
              <motion.div
                key={project.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch"
              >
                {/* ── LEFT COLUMN (5 cols): Visual Preview & Brutalist Red Action ── */}
                <div className="lg:col-span-5 flex flex-col justify-between">
                  <div>
                    {/* Visual Screenshot with Crisp Archival Mat Border */}
                    <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-[#E2DBD1] bg-stone-100 shadow-sm group">
                      <Image
                        src={project.screenshot}
                        alt={`${project.title} interface capture`}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 1024px) 100vw, 420px"
                        priority
                      />
                    </div>

                    {/* Tools / Tech Stack Tags */}
                    <div className="flex flex-wrap items-center gap-1.5 mt-3">
                      {project.tools.map((tool) => (
                        <span
                          key={tool}
                          className="px-2.5 py-1 rounded-md bg-white border border-[#E2DBD1] text-[11px] font-mono text-stone-800 font-semibold shadow-2xs"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Primary Launch Action: Signature Brutalist Red Button */}
                  {project.link && project.link !== "#" && (
                    <div className="pt-3 mt-4 border-t border-[#E8E1D5]">
                      <div className="mb-1.5 text-[10px] font-mono text-stone-500 flex items-center gap-1 font-bold">
                        <Sparkles size={11} className="text-[#E52424]" />
                        <span>[ ✦ CLICK TO LAUNCH LIVE VERIFIED PROJECT ]</span>
                      </div>
                      <a
                        data-testid="launch-project-link"
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center gap-2 px-5 py-3 min-h-[44px] rounded-full border-2 border-[var(--color-ink)] bg-[#E52424] hover:bg-[var(--color-ink)] text-white font-mono text-xs font-black uppercase tracking-wider shadow-[3px_3px_0_#171515] hover:border-[var(--color-ink)] transition-all active:translate-x-0.5 active:translate-y-0.5 cursor-pointer"
                      >
                        <span>LAUNCH LIVE PROJECT</span>
                        <ExternalLink size={14} />
                      </a>
                    </div>
                  )}
                </div>

                {/* ── RIGHT COLUMN (7 cols): Full Narrative & Key Architecture ── */}
                <div className="lg:col-span-7 flex flex-col justify-between">
                  <div>
                    {/* Title & Tagline */}
                    <h2 className="text-2xl lg:text-3xl font-serif font-black text-[#171515] leading-tight">
                      {project.title}
                    </h2>
                    <p className="text-xs sm:text-sm font-mono text-[#E52424] font-bold mt-1">
                      {project.tagline}
                    </p>

                    {/* Description Paragraph */}
                    <p className="text-xs sm:text-sm text-[#443E38] leading-relaxed mt-2.5">
                      {project.description}
                    </p>

                    {/* Key Architecture Highlights */}
                    {project.highlights && project.highlights.length > 0 && (
                      <div className="p-3.5 rounded-xl bg-white border border-[#E2DBD1] shadow-2xs mt-3.5">
                        <div className="text-[10px] font-mono font-bold text-[#E52424] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                          <Sparkles size={11} className="text-[#E52424]" />
                          <span>KEY ARCHITECTURE &amp; HIGHLIGHTS</span>
                        </div>
                        <ul className="text-xs text-[#2D2620] space-y-1.5 font-medium">
                          {project.highlights.map((hl, i) => (
                            <li key={i} className="flex items-start gap-2 leading-relaxed">
                              <span className="text-[#E52424] font-black mt-0.5">★</span>
                              <span>{hl}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Sub-projects if present */}
                    {project.subProjects && project.subProjects.length > 0 && (
                      <div className="grid grid-cols-2 gap-2.5 mt-3">
                        {project.subProjects.map((sub, i) => (
                          <a
                            key={i}
                            href={sub.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 rounded-xl bg-white hover:bg-stone-50 border border-[#E2DBD1] hover:border-[#E52424] transition-all flex flex-col justify-between group shadow-2xs"
                          >
                            <div>
                              <span className="text-[9px] font-mono font-bold text-[#E52424] uppercase">
                                {sub.badge}
                              </span>
                              <h4 className="text-[11px] font-bold text-[#171515] mt-0.5 group-hover:text-[#E52424] truncate">
                                {sub.title}
                              </h4>
                            </div>
                            <span className="text-[10px] font-mono font-bold text-stone-600 mt-1.5 flex items-center gap-1">
                              <span>{sub.actionLabel}</span>
                              <ExternalLink size={10} className="text-[#E52424]" />
                            </span>
                          </a>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* ── Footer Navigation Controls ── */}
                  <div className="flex items-center justify-between pt-3 mt-4 border-t border-[#E8E1D5]">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        data-testid="project-prev-btn"
                        disabled={pageIndex === 0}
                        onClick={handlePrev}
                        className={`flex items-center gap-1.5 px-3 py-2 min-h-[44px] rounded-xl border text-xs font-mono font-bold transition-all shadow-2xs ${
                          pageIndex === 0
                            ? "opacity-35 border-stone-200 text-stone-400 bg-stone-50 cursor-not-allowed"
                            : "border-[#E2DBD1] bg-white hover:bg-stone-100 text-stone-800 cursor-pointer"
                        }`}
                        aria-label="Previous project (ArrowLeft)"
                      >
                        <ChevronLeft size={16} />
                        <span>PREV</span>
                      </button>

                      <span className="text-xs font-mono font-bold text-stone-800 px-2">
                        {pageIndex + 1} / {total}
                      </span>

                      <button
                        type="button"
                        data-testid="project-next-btn"
                        disabled={pageIndex === total - 1}
                        onClick={handleNext}
                        className={`flex items-center gap-1.5 px-3 py-2 min-h-[44px] rounded-xl border text-xs font-mono font-bold transition-all shadow-2xs ${
                          pageIndex === total - 1
                            ? "opacity-35 border-stone-200 text-stone-400 bg-stone-50 cursor-not-allowed"
                            : "border-[#E2DBD1] bg-white hover:bg-stone-100 text-stone-800 cursor-pointer"
                        }`}
                        aria-label="Next project (ArrowRight)"
                      >
                        <span>NEXT</span>
                        <ChevronRight size={16} />
                      </button>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-[11px] font-mono text-stone-500 hidden sm:inline">
                        Use <kbd className="px-1.5 py-0.5 rounded bg-stone-200/80 text-stone-800">←</kbd> <kbd className="px-1.5 py-0.5 rounded bg-stone-200/80 text-stone-800">→</kbd> to turn pages
                      </span>

                      <button
                        type="button"
                        onClick={onClose}
                        className="px-3.5 py-1.5 rounded-full bg-stone-100 hover:bg-[#E52424] hover:text-white text-stone-700 border border-stone-200 text-xs font-mono font-bold transition-all cursor-pointer shadow-2xs"
                      >
                        SEE ENTIRE ROOM
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
