"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "framer-motion";
import { Compass, Box, Layers, Eye } from "lucide-react";
import { CameraPreset } from "./RoomCamera";

// Dynamic client-only loading of the 3D Canvas
const DynamicRoomCanvas = dynamic(
  () => import("./RoomCanvas").then((mod) => mod.RoomCanvas),
  {
    ssr: false,
    loading: () => <RoomLoadingPlaceholder />,
  }
);

function RoomLoadingPlaceholder() {
  return (
    <div className="w-full h-full min-h-[460px] sm:min-h-[560px] lg:min-h-[640px] flex flex-col items-center justify-center bg-[var(--color-bg-subtle)] border border-[var(--color-border)] rounded-2xl animate-pulse text-[var(--color-muted)] font-mono text-xs">
      <Box size={24} className="text-[var(--color-red)] mb-2 animate-bounce" />
      <span>INITIALIZING ARCHITECTURAL BLOCKOUT...</span>
    </div>
  );
}

/* ── 4 Corners Kinetic Border Box: Restrained architectural registration mark ── */
function KineticCornerBox({
  className = "",
  initialCorner = "top-left",
}: {
  className?: string;
  initialCorner?: "top-left" | "top-right" | "bottom-right" | "bottom-left";
}) {
  const getCoordinates = () => {
    switch (initialCorner) {
      case "top-right":
        return {
          x: ["100%", "100%", "0%", "0%", "100%"],
          y: ["0%", "100%", "100%", "0%", "0%"],
        };
      case "bottom-right":
        return {
          x: ["100%", "0%", "0%", "100%", "100%"],
          y: ["100%", "100%", "0%", "0%", "100%"],
        };
      case "bottom-left":
        return {
          x: ["0%", "0%", "100%", "100%", "0%"],
          y: ["100%", "0%", "0%", "100%", "100%"],
        };
      case "top-left":
      default:
        return {
          x: ["0%", "100%", "100%", "0%", "0%"],
          y: ["0%", "0%", "100%", "100%", "0%"],
        };
    }
  };

  const coords = getCoordinates();

  return (
    <div
      className={`relative w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8 border border-[var(--color-red)]/50 bg-white/40 overflow-hidden shadow-2xs ${className}`}
    >
      <motion.div
        animate={{
          x: coords.x,
          y: coords.y,
        }}
        transition={{
          duration: 4.8,
          repeat: Infinity,
          ease: "easeInOut",
          times: [0, 0.25, 0.5, 0.75, 1],
        }}
        className="absolute top-0.5 left-0.5 w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5 bg-[var(--color-red)] flex items-center justify-center shadow-xs"
      />
    </div>
  );
}

export function RoomHero() {
  const shouldReduceMotion = useReducedMotion();
  const [activePreset, setActivePreset] = useState<CameraPreset | undefined>(undefined);

  const softEase = [0.16, 1, 0.3, 1] as const;

  return (
    <section
      id="hero"
      className="relative w-full min-h-[90vh] lg:min-h-[95vh] pt-20 sm:pt-24 pb-8 sm:pb-12 flex flex-col justify-between bg-[var(--color-bg)] select-none overflow-x-clip"
    >
      {/* ── 4 Corner Kinetic Architectural Registration Marks ── */}
      <div className="absolute top-3 left-3 sm:top-6 sm:left-6 z-20 pointer-events-none">
        <KineticCornerBox initialCorner="top-left" />
      </div>
      <div className="absolute top-3 right-3 sm:top-6 sm:right-6 z-20 pointer-events-none">
        <KineticCornerBox initialCorner="top-right" />
      </div>
      <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8 z-20 pointer-events-none hidden md:block">
        <KineticCornerBox initialCorner="bottom-left" />
      </div>
      <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 z-20 pointer-events-none hidden md:block">
        <KineticCornerBox initialCorner="bottom-right" />
      </div>

      {/* ── Accessible Semantic Text Layer for Screen Readers & SEO ── */}
      <div className="sr-only">
        <h1>Taushik Chandana — Product Designer &amp; Builder</h1>
        <p>
          Interactive 3D architectural workspace recreation. Room spatial arrangement: Left wall features built-in cupboards and experience archive; corner features the creative workstation desk with laptop, keyboard, mouse, fishbowl, plant, and hanging quotation frames; right wall features the bed, daylight window, and exit door.
        </p>
      </div>

      <div className="section-shell relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex flex-col justify-between">
        
        {/* ── 1. Top Architectural Poster Header Bar ── */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: softEase }}
          className="relative w-full flex flex-wrap items-center justify-between gap-3 text-[var(--color-red)] font-mono text-[9px] xs:text-[10px] sm:text-xs md:text-sm tracking-wider uppercase pb-3 border-b border-[var(--color-border)]"
        >
          <div className="flex items-center gap-2 font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-red)] animate-pulse" />
            <span>TAUSHIK CHANDANA</span>
            <span className="text-[var(--color-muted)] font-normal hidden sm:inline">
              // WORKSPACE ARCHITECTURE
            </span>
          </div>

          <div className="flex items-center gap-3 text-[var(--color-muted)] text-[10px] sm:text-xs font-bold">
            <span className="flex items-center gap-1.5">
              <Compass size={12} className="text-[var(--color-red)]" />
              <span>17.3850° N, 78.4867° E</span>
            </span>
            <span className="text-[var(--color-border-strong)]">|</span>
            <span className="text-[var(--color-red)] font-black">PHASE 3A BLOCKOUT</span>
          </div>
        </motion.div>

        {/* ── 2. The 3D Interactive Room Canvas ── */}
        <div className="relative w-full my-3 sm:my-6 h-[440px] xs:h-[480px] sm:h-[540px] lg:h-[620px] xl:h-[680px] rounded-2xl sm:rounded-3xl border border-[var(--color-border)] bg-[var(--color-bg-subtle)] overflow-hidden shadow-xs">
          
          {/* Subtle Top-Left Architectural HUD Label */}
          <div className="absolute top-4 left-4 z-10 pointer-events-none flex flex-col gap-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-xs border border-[var(--color-border)] text-[var(--color-ink)] font-mono text-[9px] sm:text-[10px] font-bold tracking-wider uppercase shadow-2xs">
              <Layers size={11} className="text-[var(--color-red)]" />
              <span>3/4 ARCHITECTURAL CUTAWAY</span>
            </span>
            <span className="text-[10px] font-mono text-[var(--color-muted)] pl-1 hidden sm:inline">
              LEFT: CUPBOARDS · CORNER: WORKSTATION · RIGHT: BED &amp; WINDOW
            </span>
          </div>

          {/* Top-Right Spatial Layout Diagram Pill */}
          <div className="absolute top-4 right-4 z-10 hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-white/85 backdrop-blur-xs border border-[var(--color-border)] text-[10px] font-mono text-[var(--color-muted)] shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>DEMAND-RENDER ACTIVE</span>
          </div>

          {/* The R3F 3D Canvas */}
          <DynamicRoomCanvas cameraPreset={activePreset} />

          {/* Bottom-Left Furniture Zone Indicators */}
          <div className="absolute bottom-4 left-4 z-10 flex flex-wrap gap-1.5 pointer-events-none">
            <span className="px-2 py-0.5 rounded-sm bg-white/85 border border-[var(--color-border)] text-[9px] font-mono font-bold text-[var(--color-ink-subtle)] uppercase">
              [L] CUPBOARDS
            </span>
            <span className="px-2 py-0.5 rounded-sm bg-white/85 border border-[var(--color-border)] text-[9px] font-mono font-bold text-[var(--color-red)] uppercase">
              [★] WORKSTATION
            </span>
            <span className="px-2 py-0.5 rounded-sm bg-white/85 border border-[var(--color-border)] text-[9px] font-mono font-bold text-[var(--color-ink-subtle)] uppercase">
              [R] BED / WINDOW / DOOR
            </span>
          </div>
        </div>

        {/* ── 3. Bottom Chapter Bridge into Following About Section ── */}
        <div className="pt-2 sm:pt-4 flex flex-col items-center justify-center text-center select-none">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-subtle)] text-[10px] sm:text-xs font-mono font-bold tracking-widest uppercase text-[var(--color-muted)] shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-red)] animate-pulse" />
            <span>01 // ABOUT TAUSHIK</span>
          </div>
          <div className="mt-1.5 text-[11px] font-mono text-[var(--color-muted)] flex items-center gap-1.5">
            <span>Scroll to explore</span>
            <motion.span
              animate={shouldReduceMotion ? undefined : { y: [0, 3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              ↓
            </motion.span>
          </div>
        </div>

      </div>
    </section>
  );
}
