"use client";

import React, { useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  FileText,
  RotateCcw,
} from "lucide-react";
import { BOOK_PROJECTS, BookProject } from "./projectData";

interface BookOverlayControlsProps {
  isOpen: boolean;
  pageIndex: number;
  isDossierOpen: boolean;
  onPageChange: (newIndex: number) => void;
  onOpenDossier: () => void;
  onCloseBook: () => void;
}

/**
 * Editorial In-Room Controls for 3D Projects Book
 * Positioned cleanly at bottom of viewport when book is active.
 * Guarantees minimum 44x44px touch targets and full keyboard support (Arrow keys, Enter, Esc).
 */
export function BookOverlayControls({
  isOpen,
  pageIndex,
  isDossierOpen,
  onPageChange,
  onOpenDossier,
  onCloseBook,
}: BookOverlayControlsProps) {
  const totalProjects = BOOK_PROJECTS.length;
  const currentProject = BOOK_PROJECTS[pageIndex] || BOOK_PROJECTS[0];

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen || isDossierOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.key === "ArrowRight") {
        e.preventDefault();
        if (pageIndex < totalProjects - 1) onPageChange(pageIndex + 1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        if (pageIndex > 0) onPageChange(pageIndex - 1);
      } else if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onOpenDossier();
      } else if (e.key === "Escape") {
        e.preventDefault();
        onCloseBook();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isDossierOpen, pageIndex, totalProjects, onPageChange, onOpenDossier, onCloseBook]);

  if (!isOpen || isDossierOpen) return null;

  return (
    <div
      data-testid="book-overlay-controls"
      className="absolute bottom-4 left-4 right-4 z-30 pointer-events-none flex flex-wrap items-center justify-between gap-3 select-none"
    >
      {/* ── Left: Page Indicator & Chapter Eyebrow ── */}
      <div className="flex items-center gap-2 px-3.5 py-2 min-h-[44px] rounded-2xl bg-white/95 backdrop-blur-md border border-[var(--color-border)] shadow-sm font-mono text-xs pointer-events-auto">
        <span className="font-bold text-[var(--color-red)]">
          0{pageIndex + 1} / 0{totalProjects}
        </span>
        <span className="text-[var(--color-border-strong)]">|</span>
        <span className="font-bold text-[var(--color-ink)] truncate max-w-[180px] sm:max-w-xs">
          {currentProject.title}
        </span>
        <span className="text-[var(--color-muted)] text-[10px] hidden md:inline">
          ({currentProject.category})
        </span>
      </div>

      {/* ── Right: Page Flip Buttons & Primary Inspect Dossier CTA ── */}
      <div className="flex items-center gap-2 pointer-events-auto">
        {/* Previous Page */}
        <button
          type="button"
          data-testid="book-prev-page"
          disabled={pageIndex === 0}
          onClick={(e) => {
            e.stopPropagation();
            if (pageIndex > 0) onPageChange(pageIndex - 1);
          }}
          className={`flex items-center justify-center gap-1 px-3.5 py-2 min-h-[44px] min-w-[44px] rounded-xl font-mono text-xs font-bold transition-all shadow-xs cursor-pointer ${
            pageIndex === 0
              ? "bg-neutral-100 text-neutral-400 border border-neutral-200 cursor-not-allowed opacity-60"
              : "bg-white text-[var(--color-ink)] border border-[var(--color-border)] hover:border-[var(--color-red)] hover:text-[var(--color-red)]"
          }`}
          aria-label="Previous project spread (ArrowLeft)"
        >
          <ChevronLeft size={16} />
          <span className="hidden sm:inline">PREV</span>
        </button>

        {/* Inspect Dossier Action */}
        <button
          type="button"
          data-testid="book-inspect-dossier"
          onClick={(e) => {
            e.stopPropagation();
            onOpenDossier();
          }}
          className="flex items-center gap-2 px-4 py-2 min-h-[44px] rounded-xl bg-[var(--color-red)] text-white hover:bg-[#b01723] font-mono text-xs font-bold tracking-wider uppercase shadow-[0_0_15px_rgba(201,31,43,0.4)] transition-all cursor-pointer"
          aria-label={`Open holographic project showcase for ${currentProject.title}`}
        >
          <FileText size={15} />
          <span>✦ OPEN PROJECT DOSSIER</span>
        </button>

        {/* Next Page */}
        <button
          type="button"
          data-testid="book-next-page"
          disabled={pageIndex === totalProjects - 1}
          onClick={(e) => {
            e.stopPropagation();
            if (pageIndex < totalProjects - 1) onPageChange(pageIndex + 1);
          }}
          className={`flex items-center justify-center gap-1 px-3.5 py-2 min-h-[44px] min-w-[44px] rounded-xl font-mono text-xs font-bold transition-all shadow-xs cursor-pointer ${
            pageIndex === totalProjects - 1
              ? "bg-neutral-100 text-neutral-400 border border-neutral-200 cursor-not-allowed opacity-60"
              : "bg-white text-[var(--color-ink)] border border-[var(--color-border)] hover:border-[var(--color-red)] hover:text-[var(--color-red)]"
          }`}
          aria-label="Next project spread (ArrowRight)"
        >
          <span className="hidden sm:inline">NEXT</span>
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
