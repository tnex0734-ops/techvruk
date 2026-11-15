"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Layers,
  ArrowUpRight,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import { RoomMaterials } from "../RoomMaterials";
import { BOOK_PROJECTS, BookProject } from "./projectData";
import { SpatialProjectDossier } from "./SpatialProjectDossier";

interface BookPagesProps {
  materials: RoomMaterials;
  isOpen: boolean;
  pageIndex: number;
  isDossierEmerging: boolean;
  onPageTurnComplete?: () => void;
  onSelectProject?: (project: BookProject) => void;
  onCloseDossier?: () => void;
  onPageChange?: (newIndex: number) => void;
  onTurnNext?: () => void;
  onTurnPrev?: () => void;
}

/**
 * Single-Page Physical 3D Projects Book Folio
 * Conforms strictly to User Direction:
 * - Shows ONLY the single project page at one time (no index page splitting focus).
 * - Clicking "NEXT PROJECT" or "PREV PROJECT" flips the page with authentic 3D page curl/motion.
 * - Generous 2-column layout with Playfair serif typography, verified highlights, stack badges, and live demo link.
 * - Crisp native HTML typography with calibrated distanceFactor for razor-sharp readability.
 */
export function BookPages({
  materials,
  isOpen,
  pageIndex,
  isDossierEmerging,
  onPageTurnComplete,
  onSelectProject,
  onCloseDossier,
  onPageChange,
  onTurnNext,
  onTurnPrev,
}: BookPagesProps) {
  const { invalidate } = useThree();

  // Dimensions of single folio page (meters)
  const pageW = 0.68; // Spans across the open book
  const pageD = 0.38;

  const [displayIndex, setDisplayIndex] = useState(pageIndex);
  const [isTurning, setIsTurning] = useState(false);
  const [turnDirection, setTurnDirection] = useState<"forward" | "backward">("forward");
  const turnProgressRef = useRef(0);
  const turningGroupRef = useRef<THREE.Group>(null);
  const turnTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const totalProjects = BOOK_PROJECTS.length;
  const currentProject = BOOK_PROJECTS[displayIndex] || BOOK_PROJECTS[0];

  // Handle page turn request from parent
  useEffect(() => {
    if (pageIndex !== displayIndex) {
      const direction = pageIndex > displayIndex ? "forward" : "backward";
      setTurnDirection(direction);
      turnProgressRef.current = 0;
      setIsTurning(true);
      invalidate();

      if (turnTimeoutRef.current) clearTimeout(turnTimeoutRef.current);
      turnTimeoutRef.current = setTimeout(() => {
        setIsTurning(false);
        setDisplayIndex(pageIndex);
        onPageTurnComplete?.();
        invalidate();
      }, 350);
    }
  }, [pageIndex, displayIndex, onPageTurnComplete, invalidate]);

  // Frame loop for smooth page turn animation
  useFrame((_, delta) => {
    if (!isOpen || !isTurning || !turningGroupRef.current) return;
    const speed = 3.6;
    turnProgressRef.current += delta * speed;
    const p = Math.min(turnProgressRef.current, 1);
    const eased = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;

    if (turnDirection === "forward") {
      turningGroupRef.current.rotation.y = -eased * Math.PI * 0.45;
      turningGroupRef.current.position.y = 0.003 + Math.sin(eased * Math.PI) * 0.04;
    } else {
      turningGroupRef.current.rotation.y = (1 - eased) * Math.PI * 0.45;
      turningGroupRef.current.position.y = 0.003 + Math.sin(eased * Math.PI) * 0.04;
    }

    invalidate();

    if (p >= 1) {
      if (turnTimeoutRef.current) clearTimeout(turnTimeoutRef.current);
      setIsTurning(false);
      setDisplayIndex(pageIndex);
      if (turningGroupRef.current) {
        turningGroupRef.current.rotation.y = 0;
        turningGroupRef.current.position.y = 0.003;
      }
      onPageTurnComplete?.();
      invalidate();
    }
  });

  if (!isOpen) return null;

  return (
    <group name="single-project-folio-page" position={[0, 0.002, 0]}>
      {/* ── Base Parchment Page Block Mesh ── */}
      <mesh receiveShadow position={[0, 0.001, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[pageW, pageD]} />
        <meshStandardMaterial color="#FAF7F0" roughness={0.88} />
      </mesh>

      {/* ── Animated Page-Turn Container ── */}
      <group ref={turningGroupRef} position={[0, 0.003, 0]}>
        {/* Crisp Native HTML Typography Layer */}
        <Html
          transform
          position={[0, 0.004, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          distanceFactor={0.28}
          className="pointer-events-auto select-none"
        >
          <div
            data-testid="single-project-folio"
            className="w-[780px] h-[520px] bg-[#FAF7F0] text-[#1C1917] p-6 flex flex-col justify-between font-sans border-2 border-[#E5DFD3] rounded-2xl shadow-xl relative"
            style={{ boxSizing: "border-box" }}
          >
            {/* Tactile Washi Tape Strip at Top Edge */}
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-36 h-4 bg-[#EADECE]/90 border-y border-[#D6C4B0] shadow-2xs rotate-[-0.8deg] rounded-xs pointer-events-none z-10" />

            {/* ── 1. Top Header Bar ── */}
            <div>
              <div className="flex items-center justify-between border-b-2 border-[#1C1917] pb-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#C91F2B] animate-pulse" />
                  <span className="font-mono text-xs font-black tracking-widest text-[#C91F2B] uppercase">
                    TAUSHIK ARCHIVE // PROJECT {currentProject.number} OF 0{totalProjects}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#1C1917] text-white font-mono text-[10px] font-bold uppercase">
                    {currentProject.category}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 font-mono text-[10px] font-bold">
                    ● {currentProject.status}
                  </span>
                </div>

                {/* Live App Link Button */}
                {currentProject.link && currentProject.link !== "#" && (
                  <a
                    href={currentProject.link}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white hover:bg-[#C91F2B] hover:text-white text-[#1C1917] border border-[#D5C9B8] text-xs font-mono font-bold transition-all shadow-2xs"
                  >
                    <span>OPEN LIVE APP</span>
                    <ExternalLink size={12} />
                  </a>
                )}
              </div>
            </div>

            {/* ── 2. Generous Two-Column Project Presentation ── */}
            <div className="grid grid-cols-12 gap-5 flex-1 my-1 items-start">
              {/* Left Column: Project Identity, Tagline, Description & Stack */}
              <div className="col-span-7 flex flex-col justify-between space-y-2.5 pr-2">
                <div>
                  <h2
                    className="text-3xl font-black text-[#141210] tracking-tight leading-tight"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    {currentProject.title}
                  </h2>
                  <p className="text-sm font-semibold text-[#C91F2B] mt-1 leading-snug">
                    {currentProject.tagline}
                  </p>
                  <p className="text-xs text-[#3D3732] leading-relaxed mt-2 font-normal">
                    {currentProject.description}
                  </p>
                </div>

                {/* Production Tech Stack */}
                <div className="pt-1">
                  <div className="text-[10px] font-mono font-bold text-stone-500 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                    <Layers size={11} className="text-[#C91F2B]" />
                    <span>PRODUCTION STACK &amp; TOOLS</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {currentProject.tools.map((t, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-md bg-white border border-[#E0D7C8] text-[10px] font-mono font-bold text-[#1C1917] shadow-2xs"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Key Deliverables & Screenshot Frame */}
              <div className="col-span-5 flex flex-col justify-between space-y-2.5">
                {/* Screenshot Card */}
                <div className="relative w-full h-[155px] rounded-xl overflow-hidden border-2 border-[#E0D7C8] bg-white shadow-xs">
                  {currentProject.screenshot ? (
                    <Image
                      src={currentProject.screenshot}
                      alt={currentProject.title}
                      fill
                      className="object-cover"
                      sizes="320px"
                      unoptimized
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs font-mono text-stone-400">
                      Archival Interface Preview
                    </div>
                  )}
                  <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-black/80 text-white font-mono text-[9px] font-bold">
                    {currentProject.status}
                  </div>
                </div>

                {/* Key Highlights Box (Tactile index paper motif) */}
                <div className="p-3 rounded-xl bg-[#F6F2EA] border border-[#E8E1D5] space-y-1.5 shadow-2xs">
                  <div className="text-[10px] font-mono font-bold text-[#C91F2B] uppercase tracking-wider flex items-center gap-1">
                    <Sparkles size={11} className="text-[#C91F2B]" />
                    <span>VERIFIED DELIVERABLES &amp; OUTCOMES</span>
                  </div>
                  {currentProject.highlights.slice(0, 3).map((h, i) => (
                    <div key={i} className="flex items-start gap-1.5 text-[11px] text-[#2D2825] leading-snug">
                      <CheckCircle2 size={13} className="text-[#C91F2B] shrink-0 mt-0.5" />
                      <span className="line-clamp-2">{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── 3. Bottom Page Controls & Folio Jumpers ── */}
            <div className="border-t-2 border-[#E0D7C8] pt-2.5">
              <div className="flex items-center justify-between">
                {/* Previous Page Button */}
                <button
                  type="button"
                  data-testid="folio-prev-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (displayIndex > 0) onPageChange?.(displayIndex - 1);
                  }}
                  disabled={displayIndex === 0}
                  className="px-3.5 py-1.5 rounded-xl bg-[#F3EFEA] hover:bg-[#C91F2B] hover:text-white disabled:opacity-30 disabled:pointer-events-none text-xs font-mono font-bold text-[#1C1917] flex items-center gap-1.5 transition-all cursor-pointer border border-[#E2DBD1]"
                >
                  <ChevronLeft size={14} />
                  <span>PREV PROJECT</span>
                </button>

                {/* Project Jumper Pills (01 - 07) */}
                <div className="flex items-center gap-1">
                  {BOOK_PROJECTS.map((proj, idx) => {
                    const isActive = idx === displayIndex;
                    return (
                      <button
                        key={proj.id}
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onPageChange?.(idx);
                        }}
                        className={`w-7 h-7 rounded-lg font-mono text-[11px] font-bold transition-all flex items-center justify-center cursor-pointer ${
                          isActive
                            ? "bg-[#C91F2B] text-white shadow-xs font-black scale-105"
                            : "bg-white hover:bg-stone-200 text-stone-600 border border-[#E0D7C8]"
                        }`}
                        title={`${proj.number}: ${proj.title}`}
                      >
                        {proj.number}
                      </button>
                    );
                  })}
                </div>

                {/* Next Page Button */}
                <button
                  type="button"
                  data-testid="folio-next-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (displayIndex < totalProjects - 1) onPageChange?.(displayIndex + 1);
                  }}
                  disabled={displayIndex === totalProjects - 1}
                  className="px-3.5 py-1.5 rounded-xl bg-[#F3EFEA] hover:bg-[#C91F2B] hover:text-white disabled:opacity-30 disabled:pointer-events-none text-xs font-mono font-bold text-[#1C1917] flex items-center gap-1.5 transition-all cursor-pointer border border-[#E2DBD1]"
                >
                  <span>NEXT PROJECT</span>
                  <ChevronRight size={14} />
                </button>
              </div>

              {/* Colophon Note */}
              <div className="flex items-center justify-between text-[10px] font-mono text-stone-500 mt-1.5">
                <span>FOLIO 0{displayIndex + 1} OF 0{totalProjects}</span>
                <span>CLICK NEXT OR USE ← → ARROW KEYS TO FLIP PAGE • ESC TO EXIT</span>
              </div>
            </div>
          </div>
        </Html>
      </group>

      {/* ── 4. Dimensional Project Dossier Rising in 3D (Optional Deep Dive) ── */}
      <SpatialProjectDossier
        isOpen={isDossierEmerging}
        pageIndex={displayIndex}
        onClose={onCloseDossier ? onCloseDossier : () => {}}
        onPageChange={onPageChange ? onPageChange : () => {}}
      />
    </group>
  );
}
