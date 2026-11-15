"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { Html } from "@react-three/drei";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  CheckCircle2,
  Layers,
  ArrowUpRight,
} from "lucide-react";
import { BOOK_PROJECTS, BookProject } from "./projectData";

interface SpatialProjectDossierProps {
  isOpen: boolean;
  pageIndex: number;
  onClose: () => void;
  onPageChange: (newIndex: number) => void;
}

/**
 * Dimensional Project Dossier Presentation Card
 * Anchored directly above the open 3D Projects Book in 3D space using <Html transform>
 * Real DOM rendering guarantees vector-sharp typography, full accessibility,
 * and seamless click-outside hierarchy back to the open book spread.
 */
export function SpatialProjectDossier({
  isOpen,
  pageIndex,
  onClose,
  onPageChange,
}: SpatialProjectDossierProps) {
  const project: BookProject = BOOK_PROJECTS[pageIndex] || BOOK_PROJECTS[0];
  const total = BOOK_PROJECTS.length;

  // Keyboard navigation: Escape closes dossier, arrows switch project
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowRight" && pageIndex < total - 1) {
        onPageChange(pageIndex + 1);
      } else if (e.key === "ArrowLeft" && pageIndex > 0) {
        onPageChange(pageIndex - 1);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, pageIndex, total, onClose, onPageChange]);

  if (!isOpen) return null;

  return (
    <group position={[0, 0.22, 0.05]} rotation={[-0.22, 0, 0]}>
      <Html
        transform
        distanceFactor={0.36}
        position={[0, 0, 0]}
        className="pointer-events-auto select-none"
      >
        <div
          className="relative w-[720px] max-h-[520px] rounded-3xl bg-[#FCFAF7] border-2 border-[#E2DBD1] shadow-[0_24px_70px_rgba(20,18,15,0.4)] text-[#1C1917] p-6 flex flex-col font-sans"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top Dossier Header Strip */}
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#E8E1D5]">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#C91F2B] animate-pulse" />
              <span className="font-mono text-xs font-black text-[#C91F2B] tracking-wider uppercase">
                PROJECT DOSSIER // {project.number} OF 0{total}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#C91F2B]/10 text-[#C91F2B] font-mono text-[10px] font-bold">
                {project.category}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F3EFEA] hover:bg-[#C91F2B] hover:text-white text-[#5A524A] text-xs font-mono font-bold transition-all cursor-pointer border border-[#E2DBD1]"
                aria-label="Return to open book spread"
              >
                <X size={14} />
                <span>RETURN TO BOOK (ESC)</span>
              </button>
            </div>
          </div>

          {/* Dossier Body with Scroll */}
          <div className="flex-1 overflow-y-auto pr-2 space-y-3 max-h-[380px] scrollbar-thin scrollbar-thumb-stone-300">
            {/* Title & Tagline */}
            <div>
              <h2
                className="text-2xl font-black text-[#141210] tracking-tight leading-tight"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                {project.title}
              </h2>
              <p className="text-xs font-medium text-[#5A524A] mt-0.5 font-sans">
                {project.tagline}
              </p>
            </div>

            {/* Split Grid: Preview & Core Narrative */}
            <div className="grid grid-cols-12 gap-3.5">
              {/* Screenshot Frame */}
              <div className="col-span-5 rounded-xl overflow-hidden border border-[#E2DBD1] bg-[#F0ECE3] relative h-[140px]">
                {project.screenshot ? (
                  <Image
                    src={project.screenshot}
                    alt={project.title}
                    fill
                    className="object-cover"
                    sizes="280px"
                    unoptimized
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs font-mono text-stone-400">
                    No preview asset
                  </div>
                )}
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/70 backdrop-blur-xs text-white text-[9px] font-mono font-bold">
                  {project.status}
                </div>
              </div>

              {/* Project Overview */}
              <div className="col-span-7 flex flex-col justify-between">
                <p className="text-xs text-[#2D2825] leading-relaxed font-normal">
                  {project.description}
                </p>

                {/* Tech Stack Pills */}
                <div className="mt-2">
                  <div className="text-[9px] font-mono font-bold text-[#8A7968] uppercase tracking-wider mb-1 flex items-center gap-1">
                    <Layers size={10} className="text-[#C91F2B]" />
                    <span>PRODUCTION STACK</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {project.tools.map((tool, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-md bg-white border border-[#E2DBD1] text-[9px] font-mono font-bold text-[#1C1917]"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Verified Highlights / Key Outcomes */}
            <div className="p-3 rounded-xl bg-white border border-[#E2DBD1]">
              <div className="text-[9px] font-mono font-bold text-[#C91F2B] uppercase tracking-wider mb-1.5 flex items-center gap-1">
                <Sparkles size={10} className="text-[#C91F2B]" />
                <span>KEY DELIVERABLES &amp; IMPACT</span>
              </div>
              <div className="space-y-1">
                {project.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-[#2D2825]">
                    <CheckCircle2 size={12} className="text-[#C91F2B] shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Sub-projects if available */}
            {project.subProjects && project.subProjects.length > 0 && (
              <div className="space-y-1.5">
                <div className="text-[9px] font-mono font-bold text-[#8A7968] uppercase tracking-wider">
                  CASE STUDY MODULES:
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {project.subProjects.map((sp, idx) => (
                    <a
                      key={idx}
                      href={sp.link}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2.5 rounded-xl bg-white border border-[#E2DBD1] hover:border-[#C91F2B] hover:shadow-xs transition-all flex flex-col justify-between group"
                    >
                      <div>
                        <span className="text-[8px] font-mono font-bold text-[#C91F2B] uppercase">
                          {sp.badge}
                        </span>
                        <h4 className="text-[11px] font-bold text-[#141210] mt-0.5">
                          {sp.title}
                        </h4>
                        <p className="text-[9px] text-stone-500 mt-0.5 line-clamp-1">
                          {sp.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 text-[9px] font-mono font-bold text-[#C91F2B] mt-1 group-hover:underline">
                        <span>{sp.actionLabel}</span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Bottom Action Footer */}
          <div className="flex items-center justify-between pt-2.5 mt-2.5 border-t border-[#E8E1D5]">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onPageChange(Math.max(0, pageIndex - 1))}
                disabled={pageIndex === 0}
                className="px-2.5 py-1.5 rounded-lg bg-[#F3EFEA] hover:bg-stone-200 disabled:opacity-30 disabled:pointer-events-none text-xs font-mono font-bold text-[#1C1917] flex items-center gap-1 transition-all cursor-pointer"
              >
                <ChevronLeft size={13} />
                <span>PREV</span>
              </button>
              <button
                type="button"
                onClick={() => onPageChange(Math.min(total - 1, pageIndex + 1))}
                disabled={pageIndex === total - 1}
                className="px-2.5 py-1.5 rounded-lg bg-[#F3EFEA] hover:bg-stone-200 disabled:opacity-30 disabled:pointer-events-none text-xs font-mono font-bold text-[#1C1917] flex items-center gap-1 transition-all cursor-pointer"
              >
                <span>NEXT</span>
                <ChevronRight size={13} />
              </button>
            </div>

            {project.link && project.link !== "#" && (
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-1.5 rounded-xl bg-[#C91F2B] hover:bg-[#b01722] text-white text-xs font-mono font-bold flex items-center gap-1.5 shadow-sm transition-all"
              >
                <span>OPEN LIVE PROJECT</span>
                <ArrowUpRight size={13} />
              </a>
            )}
          </div>
        </div>
      </Html>
    </group>
  );
}
