"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Layers,
  Sparkles,
  BookOpen,
  ArrowUpRight,
} from "lucide-react";
import { BOOK_PROJECTS, BookProject } from "./projectData";

interface ProjectDossierModalProps {
  isOpen: boolean;
  pageIndex: number;
  onClose: () => void;
  onPageChange: (newIndex: number) => void;
}

/**
 * Tactical Paper Dossier Detail Modal
 * - Displays complete verified project details, screenshots, highlights, and verified links
 * - Keyboard navigation (Escape to close, ArrowLeft / ArrowRight to change project)
 * - Returns to exact same book page on close
 */
export function ProjectDossierModal({
  isOpen,
  pageIndex,
  onClose,
  onPageChange,
}: ProjectDossierModalProps) {
  const totalProjects = BOOK_PROJECTS.length;
  const project = BOOK_PROJECTS[pageIndex] || BOOK_PROJECTS[0];

  // Keyboard navigation inside modal
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowLeft") {
        if (pageIndex > 0) {
          e.preventDefault();
          onPageChange(pageIndex - 1);
        }
      } else if (e.key === "ArrowRight") {
        if (pageIndex < totalProjects - 1) {
          e.preventDefault();
          onPageChange(pageIndex + 1);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, pageIndex, totalProjects, onClose, onPageChange]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8 select-text">
          {/* ── 1. Soft Backdrop (Preserves 3D Book context underneath) ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/45 backdrop-blur-[3px]"
            aria-hidden="true"
          />

          {/* ── 2. Tactile Paper Dossier Dialog ── */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`Project Dossier: ${project.title}`}
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ type: "spring", damping: 26, stiffness: 280 }}
            className="relative z-10 w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-[#FCFAF6] border-2 border-[var(--color-border)] rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col font-sans"
          >
            {/* Top Red Dossier File Strip */}
            <div className="h-2 w-full bg-[var(--color-red)] rounded-t-2xl sm:rounded-t-3xl" />

            {/* Header Bar */}
            <div className="p-4 sm:p-6 border-b border-[var(--color-border)] flex items-start justify-between gap-4 bg-white/70">
              <div className="flex flex-col gap-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-[var(--color-red)] text-white font-mono text-[10px] font-bold tracking-wider uppercase">
                    PROJECT {project.number} // 0{totalProjects}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-neutral-100 border border-[var(--color-border)] text-[var(--color-ink)] font-mono text-[10px] font-bold">
                    {project.category}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-mono text-[10px] font-bold">
                    {project.status}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-serif font-black text-[var(--color-ink)] mt-1">
                  {project.title}
                </h2>
                <p className="text-xs sm:text-sm text-[var(--color-muted)] font-medium">
                  {project.tagline}
                </p>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={onClose}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-100 hover:bg-[var(--color-red)] hover:text-white text-[var(--color-ink)] border border-[var(--color-border)] text-xs font-mono font-bold transition-all cursor-pointer shadow-2xs"
                aria-label="Close dossier and return to open book"
              >
                <X size={14} />
                <span className="hidden sm:inline">BACK TO BOOK</span>
                <span className="text-[10px] opacity-70">(ESC)</span>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-4 sm:p-6 md:p-8 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column: Visual Screenshot & Quick Links (7 cols) */}
              <div className="lg:col-span-7 flex flex-col gap-4">
                <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-[var(--color-border)] bg-neutral-100 shadow-sm group">
                  <Image
                    src={project.screenshot}
                    alt={`${project.title} interface capture`}
                    fill
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-102"
                    sizes="(max-width: 768px) 100vw, 550px"
                    priority
                  />
                </div>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-xs font-mono font-bold text-[var(--color-muted)] mr-1">
                    TECH:
                  </span>
                  {project.tools.map((tool) => (
                    <span
                      key={tool}
                      className="px-2.5 py-1 rounded-md bg-white border border-[var(--color-border)] text-xs font-mono font-semibold text-[var(--color-ink)] shadow-2xs"
                    >
                      {tool}
                    </span>
                  ))}
                </div>

                {/* Primary & Subproject Action Triggers */}
                <div className="flex flex-col gap-2 pt-2">
                  {project.hasModal && project.subProjects ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {project.subProjects.map((sub) => (
                        <a
                          key={sub.type}
                          href={sub.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between p-3 rounded-xl bg-white border border-[var(--color-border)] hover:border-[var(--color-red)] hover:shadow-xs transition-all text-xs font-mono font-bold text-[var(--color-ink)] hover:text-[var(--color-red)]"
                        >
                          <div className="flex flex-col">
                            <span className="text-[10px] text-[var(--color-muted)] font-normal">
                              {sub.badge}
                            </span>
                            <span>{sub.actionLabel}</span>
                          </div>
                          <ExternalLink size={14} className="text-[var(--color-red)] shrink-0 ml-2" />
                        </a>
                      ))}
                    </div>
                  ) : (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[var(--color-red)] hover:bg-[var(--color-red)]/90 text-white font-mono text-xs font-bold tracking-wider uppercase shadow-sm transition-all"
                    >
                      <span>LAUNCH PROJECT / INSPECT WORK</span>
                      <ArrowUpRight size={16} />
                    </a>
                  )}
                </div>
              </div>

              {/* Right Column: Factual Description & Bullet Highlights (5 cols) */}
              <div className="lg:col-span-5 flex flex-col gap-5 bg-white/70 p-4 sm:p-5 rounded-2xl border border-[var(--color-border)]">
                <div>
                  <h3 className="text-xs font-mono font-bold tracking-wider uppercase text-[var(--color-red)] mb-2 flex items-center gap-1.5">
                    <Sparkles size={12} />
                    <span>PROJECT OVERVIEW</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--color-ink)] leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="border-t border-[var(--color-border)] pt-4">
                  <h3 className="text-xs font-mono font-bold tracking-wider uppercase text-[var(--color-ink)] mb-3 flex items-center gap-1.5">
                    <Layers size={12} className="text-[var(--color-red)]" />
                    <span>VERIFIED HIGHLIGHTS</span>
                  </h3>
                  <ul className="space-y-2.5">
                    {project.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-[var(--color-ink)]/90 leading-snug">
                        <CheckCircle2
                          size={14}
                          className="text-[var(--color-red)] shrink-0 mt-0.5"
                        />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-[var(--color-border)] pt-3 text-[10px] font-mono text-[var(--color-muted)]">
                  <span>✓ 100% Verified Production Data from Taushik's Portfolio Archive</span>
                </div>
              </div>
            </div>

            {/* Footer Navigation: Next / Prev inside Dossier */}
            <div className="p-4 sm:p-5 border-t border-[var(--color-border)] bg-neutral-50 flex flex-wrap items-center justify-between gap-3 rounded-b-2xl sm:rounded-b-3xl">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={pageIndex === 0}
                  onClick={() => onPageChange(pageIndex - 1)}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                    pageIndex === 0
                      ? "opacity-50 cursor-not-allowed text-neutral-400"
                      : "bg-white border border-[var(--color-border)] text-[var(--color-ink)] hover:border-[var(--color-red)] hover:text-[var(--color-red)] cursor-pointer"
                  }`}
                  aria-label="Previous project in dossier"
                >
                  <ChevronLeft size={14} />
                  <span>PREV PROJECT</span>
                </button>

                <button
                  type="button"
                  disabled={pageIndex === totalProjects - 1}
                  onClick={() => onPageChange(pageIndex + 1)}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                    pageIndex === totalProjects - 1
                      ? "opacity-50 cursor-not-allowed text-neutral-400"
                      : "bg-white border border-[var(--color-border)] text-[var(--color-ink)] hover:border-[var(--color-red)] hover:text-[var(--color-red)] cursor-pointer"
                  }`}
                  aria-label="Next project in dossier"
                >
                  <span>NEXT PROJECT</span>
                  <ChevronRight size={14} />
                </button>
              </div>

              <div className="text-xs font-mono text-[var(--color-muted)]">
                <span>Page {pageIndex + 1} of {totalProjects}</span>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[var(--color-ink)] text-white hover:bg-neutral-800 text-xs font-mono font-bold transition-all cursor-pointer shadow-xs"
              >
                <BookOpen size={14} />
                <span>RETURN TO BOOK SPREAD</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

