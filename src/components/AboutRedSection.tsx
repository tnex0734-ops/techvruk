"use client";

import React, { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { MapPin, Sparkle, Compass, Terminal, Cpu } from "lucide-react";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Authentic Pixel Art Exports (Retained for Full Backward Compat)   */
/* ------------------------------------------------------------------ */

export function PixelSunflower({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 22 40"
      className={cn("w-6 h-11 select-none overflow-visible inline-block origin-bottom", className)}
      shapeRendering="crispEdges"
      aria-hidden="true"
    >
      <rect x="9" y="0" width="4" height="2" fill="#ffd000" />
      <rect x="9" y="14" width="4" height="2" fill="#ffd000" />
      <rect x="2" y="7" width="2" height="4" fill="#ffd000" />
      <rect x="18" y="7" width="2" height="4" fill="#ffd000" />
      <rect x="5" y="2" width="4" height="4" fill="#ffd000" />
      <rect x="13" y="2" width="4" height="4" fill="#ffd000" />
      <rect x="5" y="10" width="4" height="4" fill="#ffd000" />
      <rect x="13" y="10" width="4" height="4" fill="#ffd000" />
      <rect x="8" y="5" width="6" height="6" fill="#5c3818" />
      <rect x="10" y="16" width="2" height="24" fill="#16a34a" />
      <rect x="6" y="26" width="4" height="2" fill="#15803d" />
      <rect x="12" y="22" width="4" height="2" fill="#15803d" />
    </svg>
  );
}

export function PixelTulipRed({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 10 16"
      className={cn("w-4 h-6 select-none overflow-visible origin-bottom", className)}
      shapeRendering="crispEdges"
      aria-hidden="true"
    >
      <rect x="3" y="0" width="4" height="2" fill="#ef4444" />
      <rect x="3" y="6" width="4" height="2" fill="#ef4444" />
      <rect x="0" y="2" width="2" height="4" fill="#ef4444" />
      <rect x="8" y="2" width="2" height="4" fill="#ef4444" />
      <rect x="2" y="2" width="6" height="4" fill="#ffd000" />
      <rect x="4" y="8" width="2" height="8" fill="#16a34a" />
    </svg>
  );
}

export function PixelTulipYellow({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 10 16"
      className={cn("w-4 h-6 select-none overflow-visible origin-bottom", className)}
      shapeRendering="crispEdges"
      aria-hidden="true"
    >
      <rect x="3" y="0" width="4" height="2" fill="#ffd000" />
      <rect x="3" y="6" width="4" height="2" fill="#ffd000" />
      <rect x="0" y="2" width="2" height="4" fill="#ffd000" />
      <rect x="8" y="2" width="2" height="4" fill="#ffd000" />
      <rect x="2" y="2" width="6" height="4" fill="#5c3818" />
      <rect x="4" y="8" width="2" height="8" fill="#16a34a" />
    </svg>
  );
}

export function PixelStarFlower({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 6 6"
      className={cn("w-3 h-3 select-none overflow-visible", className)}
      shapeRendering="crispEdges"
      aria-hidden="true"
    >
      <rect x="2" y="0" width="2" height="6" fill="#ffd000" />
      <rect x="0" y="2" width="6" height="2" fill="#ffd000" />
      <rect x="2" y="2" width="2" height="2" fill="#ffffff" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Phase 2: Red Ribbon About Experience Component                   */
/*  - Dominant pure white canvas background (#FFFFFF)                 */
/*  - Signature 3D Red Ribbon Typographic Sculpture                   */
/*  - Real SVG <textPath> following curved trajectory                 */
/*  - Engraved / embossed recessed typography                         */
/*  - Modular editorial typographic grid (Reference Inspiration)      */
/*  - Complete accessible semantic DOM layer                          */
/* ------------------------------------------------------------------ */

export function AboutRedSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const softEase = [0.16, 1, 0.3, 1] as const;

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative z-20 w-full pt-16 pb-24 sm:pt-24 sm:pb-32 bg-[var(--color-bg)] text-[var(--color-ink)] overflow-x-clip select-none scroll-mt-20 border-t border-[var(--color-border)] transition-colors duration-300"
    >
      {/* ── Accessible Semantic Layer for Screen Readers & SEO ── */}
      <div className="sr-only">
        <h2>About Taushik Chandana</h2>
        <p>I am a self-taught product designer and product builder based in Hyderabad, India.</p>
        <p>
          I bridge the gap between user experience, visual craft, and design engineering. I build intuitive digital interfaces and product architectures that turn complex systems into seamless user journeys.
        </p>
        <p>
          Beyond traditional screens, I focus on how products are built and shipped—combining design systems, modern frontend code, AI stack workflows, vibe coding, and rapid prototyping to turn bold ideas into production-ready software.
        </p>
        <ul>
          <li>Vibe Coding</li>
          <li>UI/UX &amp; Product Design</li>
          <li>Design Systems &amp; Tokens</li>
          <li>Interactive Prototypes</li>
          <li>AI Stack Workflows</li>
          <li>Rapid Prototyping</li>
        </ul>
      </div>

      <div className="section-shell relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── 1. Top Architectural Specimen Header & Coordinates ── */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: softEase }}
          className="w-full flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[var(--color-border)] text-xs font-mono uppercase tracking-wider"
        >
          {/* Chapter & Identity Indicator */}
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[var(--color-red-soft)] border border-[var(--color-red)]/20 text-[var(--color-red)] font-bold text-[10px] sm:text-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-red)] animate-pulse" />
              <span>01 // DIRECTION &amp; CRAFT</span>
            </span>
            <span className="hidden sm:inline-block text-[var(--color-muted)] text-[11px]">
              TAUSHIK CHANDANA // PRODUCT DESIGNER &amp; BUILDER
            </span>
          </div>

          {/* Technical Geographical Coordinates */}
          <div className="flex items-center gap-4 text-[var(--color-muted)] text-[11px] font-bold">
            <span className="flex items-center gap-1.5">
              <Compass size={13} className="text-[var(--color-red)]" />
              <span>17.3850° N, 78.4867° E</span>
            </span>
            <span className="hidden md:inline-block text-[var(--color-border-strong)]">|</span>
            <span className="hidden md:inline-block">HYDERABAD, IN</span>
          </div>
        </motion.div>

        {/* ── 2. The Signature Red Ribbon Typographic Sculpture (Centerpiece) ── */}
        <div className="relative w-full my-8 sm:my-14 overflow-visible">
          
          {/* ── DESKTOP & TABLET SCULPTURAL S-CURVE (md and up: 768px+) ── */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.75, ease: softEase }}
            className="hidden md:block relative w-full"
            aria-hidden="true"
          >
            <svg
              viewBox="0 0 1440 600"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-auto block overflow-visible select-none"
            >
              <defs>
                {/* Main Dynamic Red Ribbon Gradient */}
                <linearGradient id="mainRibbonGradDesktop" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stop-color="#A51522" />
                  <stop offset="18%" stop-color="#C91F2B" />
                  <stop offset="42%" stop-color="#E53340" />
                  <stop offset="68%" stop-color="#C91F2B" />
                  <stop offset="88%" stop-color="#B31825" />
                  <stop offset="100%" stop-color="#8E101D" />
                </linearGradient>

                {/* 3D Extruded Depth Under-Rim (Deep Crimson Cavity) */}
                <linearGradient id="extrusionGradDesktop" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stop-color="#6B0A13" />
                  <stop offset="45%" stop-color="#870E1A" />
                  <stop offset="75%" stop-color="#6B0A13" />
                  <stop offset="100%" stop-color="#4F050D" />
                </linearGradient>

                {/* Upper Complementary Wave Ribbon */}
                <linearGradient id="upperRibbonGradDesktop" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stop-color="#C91F2B" stop-opacity="0.85" />
                  <stop offset="45%" stop-color="#E84855" stop-opacity="0.9" />
                  <stop offset="85%" stop-color="#C91F2B" stop-opacity="0.7" />
                  <stop offset="100%" stop-color="#971724" stop-opacity="0.6" />
                </linearGradient>

                {/* Lower Supporting Wave Ribbon */}
                <linearGradient id="lowerRibbonGradDesktop" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#971724" stop-opacity="0.7" />
                  <stop offset="50%" stop-color="#C91F2B" stop-opacity="0.55" />
                  <stop offset="100%" stop-color="#6B0E17" stop-opacity="0.4" />
                </linearGradient>

                {/* Soft Ambient Elevation Shadow */}
                <filter id="ribbonElevationDesktop" x="-4%" y="-10%" width="108%" height="135%" filterUnits="userSpaceOnUse">
                  <feDropShadow dx="0" dy="16" stdDeviation="20" flood-color="#8E101D" flood-opacity="0.16" />
                </filter>

                {/* Central Mathematical S-Curve Vector Spine for Typography */}
                <path
                  id="spineDesktopSvg"
                  d="M 30,360 C 240,360 360,150 590,150 C 820,150 890,440 1120,440 C 1270,440 1350,280 1420,230"
                />
              </defs>

              {/* ── Background Watermark Specimen (Reference Inspiration) ── */}
              <g opacity="0.04" font-family="'Syne', 'Archivo Black', sans-serif" font-weight="900" fill="none" stroke="#C91F2B" stroke-width="2.5" letter-spacing="0.1em">
                <text x="50" y="105" font-size="120">SELF-TAUGHT</text>
                <text x="640" y="565" font-size="120">PRODUCT BUILDER</text>
              </g>

              {/* ── Harmonic Contour Waves ── */}
              <path
                d="M 15,310 C 225,310 345,95 575,95 C 805,95 875,385 1105,385 C 1255,385 1335,225 1425,175"
                stroke="#C91F2B"
                stroke-width="1.5"
                stroke-opacity="0.25"
                stroke-dasharray="4 6"
                fill="none"
              />
              <path
                d="M 15,420 C 225,420 345,210 575,210 805,210 875,500 1105,500 C 1255,500 1335,340 1425,290"
                stroke="#971724"
                stroke-width="1.5"
                stroke-opacity="0.2"
                fill="none"
              />

              {/* Vertical Craft Frequency Resonance Ticks */}
              <g stroke="#C91F2B" stroke-opacity="0.2" stroke-width="1">
                <line x1="530" y1="50" x2="530" y2="85" />
                <line x1="545" y1="40" x2="545" y2="95" stroke-width="1.5" />
                <line x1="560" y1="30" x2="560" y2="105" stroke-width="2" stroke-opacity="0.3" />
                <line x1="575" y1="45" x2="575" y2="90" />
                <line x1="590" y1="55" x2="590" y2="80" />

                <line x1="1060" y1="460" x2="1060" y2="495" />
                <line x1="1075" y1="450" x2="1075" y2="505" stroke-width="1.5" />
                <line x1="1090" y1="440" x2="1090" y2="515" stroke-width="2" stroke-opacity="0.3" />
                <line x1="1105" y1="455" x2="1105" y2="500" />
              </g>

              {/* ── Upper Complementary Ribbon ── */}
              <path
                d="M 20,290 C 230,290 350,90 580,90 C 800,90 870,360 1100,360 C 1240,360 1330,230 1420,180 L 1420,215 C 1330,265 1240,395 1100,395 C 870,395 800,125 580,125 C 350,125 230,325 20,325 Z"
                fill="url(#upperRibbonGradDesktop)"
              />

              {/* ── Lower Deep Foundation Ribbon ── */}
              <path
                d="M 25,450 C 265,450 385,260 615,260 C 835,260 915,510 1135,510 C 1275,510 1365,390 1425,340 L 1425,378 C 1365,428 1275,548 1135,548 C 915,548 835,298 615,298 C 385,298 265,488 25,488 Z"
                fill="url(#lowerRibbonGradDesktop)"
              />

              {/* ── Main Foreground Ribbon with 3D Extrusion ── */}
              {/* Extruded Rim */}
              <path
                d="M 25,395 C 235,395 355,185 585,185 C 815,185 885,475 1115,475 C 1265,475 1345,315 1415,265 L 1415,278 C 1345,328 1265,488 1115,488 C 885,488 815,198 585,198 C 355,198 235,408 25,408 Z"
                fill="url(#extrusionGradDesktop)"
              />

              {/* Main Elevated Surface */}
              <g filter="url(#ribbonElevationDesktop)">
                <path
                  d="M 25,325 C 235,325 355,115 585,115 C 815,115 885,405 1115,405 C 1265,405 1345,245 1415,195 L 1415,265 C 1345,315 1265,475 1115,475 C 885,475 815,185 585,185 C 355,185 235,395 25,395 Z"
                  fill="url(#mainRibbonGradDesktop)"
                />
              </g>

              {/* Dimensional Bevel Reflection Line */}
              <path
                d="M 25,326 C 235,326 355,116 585,116 C 815,116 885,406 1115,406 C 1265,406 1345,246 1415,196"
                stroke="#FFFFFF"
                stroke-width="1.8"
                stroke-opacity="0.45"
                fill="none"
              />

              {/* ── Engraved Typography along Vector Curve ── */}
              {/* Layer 1: Recessed Carved Shadow */}
              <text
                font-family="'Syne', 'Archivo Black', 'Arial Black', sans-serif"
                font-weight="900"
                font-size="24.5"
                fill="#4A050C"
                letter-spacing="0.05em"
              >
                <textPath href="#spineDesktopSvg" startOffset="50%" text-anchor="middle" dy="2.2">
                  I AM A SELF-TAUGHT PRODUCT DESIGNER AND PRODUCT BUILDER.
                </textPath>
              </text>

              {/* Layer 2: Pure Crisp White Lettering */}
              <text
                font-family="'Syne', 'Archivo Black', 'Arial Black', sans-serif"
                font-weight="900"
                font-size="24.5"
                fill="#FFFFFF"
                letter-spacing="0.05em"
              >
                <textPath href="#spineDesktopSvg" startOffset="50%" text-anchor="middle" dy="0">
                  I AM A SELF-TAUGHT PRODUCT DESIGNER AND PRODUCT BUILDER.
                </textPath>
              </text>

              {/* Precision Crest & Trough Specimen Badges */}
              <g transform="translate(585, 92)" font-family="'Space Grotesk', monospace" font-size="8.5" font-weight="700" fill="#971724" letter-spacing="0.12em">
                <circle cx="0" cy="0" r="2.5" fill="#C91F2B" />
                <text x="8" y="3" fill="#706B6B">CREST // 17.3850° N</text>
              </g>

              <g transform="translate(1115, 502)" font-family="'Space Grotesk', monospace" font-size="8.5" font-weight="700" fill="#971724" letter-spacing="0.12em">
                <circle cx="0" cy="0" r="2.5" fill="#C91F2B" />
                <text x="8" y="3" fill="#706B6B">TROUGH // 78.4867° E</text>
              </g>
            </svg>
          </motion.div>

          {/* ── DEDICATED MOBILE COMPOSITION (below 768px) ── */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7, ease: softEase }}
            className="block md:hidden relative w-full"
            aria-hidden="true"
          >
            <svg
              viewBox="0 0 390 440"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-auto block overflow-visible select-none"
            >
              <defs>
                <linearGradient id="mobRibbonGrad1Comp" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stop-color="#A51522" />
                  <stop offset="35%" stop-color="#E53340" />
                  <stop offset="75%" stop-color="#C91F2B" />
                  <stop offset="100%" stop-color="#971724" />
                </linearGradient>
                <linearGradient id="mobRibbonGrad2Comp" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stop-color="#971724" />
                  <stop offset="35%" stop-color="#C91F2B" />
                  <stop offset="70%" stop-color="#E53340" />
                  <stop offset="100%" stop-color="#8E101D" />
                </linearGradient>
                <linearGradient id="mobExtrusionGradComp" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stop-color="#6B0A13" />
                  <stop offset="100%" stop-color="#4F050D" />
                </linearGradient>
                <linearGradient id="mobOrganicFoldGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stop-color="#8E101D" />
                  <stop offset="40%" stop-color="#6E0C16" />
                  <stop offset="75%" stop-color="#8E101D" />
                  <stop offset="100%" stop-color="#A81624" />
                </linearGradient>
                <filter id="mobElevationComp" x="-5%" y="-10%" width="110%" height="135%" filterUnits="userSpaceOnUse">
                  <feDropShadow dx="0" dy="10" stdDeviation="14" flood-color="#8E101D" flood-opacity="0.18" />
                </filter>

                <path id="mobSpine1Comp" d="M 8,150 C 110,65 260,65 382,150" />
                <path id="mobSpine2Comp" d="M 8,300 C 125,385 265,385 382,300" />
              </defs>

              {/* Watermark Accents */}
              <g opacity="0.04" font-family="'Syne', 'Archivo Black', sans-serif" font-weight="900" fill="none" stroke="#C91F2B" stroke-width="2" letter-spacing="0.06em">
                <text x="15" y="50" font-size="44">SELF-TAUGHT</text>
                <text x="75" y="425" font-size="44">BUILDER</text>
              </g>

              {/* Harmonic Echo Lines */}
              <path d="M 5,185 C 105,100 255,100 385,185" stroke="#C91F2B" stroke-width="1.2" stroke-opacity="0.25" stroke-dasharray="3 5" fill="none" />
              <path d="M 5,265 C 125,350 265,350 385,265" stroke="#971724" stroke-width="1.2" stroke-opacity="0.2" stroke-dasharray="3 5" fill="none" />

              {/* ── ORGANIC 3D FOLD LOOP (Smooth C-curve transition at right edge) ── */}
              <path
                d="M 378,125 C 388,140 390,185 388,225 C 386,265 382,295 372,325 C 362,310 354,285 356,250 C 358,215 365,165 378,125 Z"
                fill="url(#mobOrganicFoldGrad)"
              />
              <path
                d="M 368,145 C 378,180 376,245 358,285 C 352,270 348,245 352,220 C 356,195 360,165 368,145 Z"
                fill="#550A11"
                opacity="0.4"
              />
              <path
                d="M 378,125 C 388,140 390,185 388,225 C 386,265 382,295 372,325"
                stroke="#FFFFFF"
                stroke-width="1.2"
                stroke-opacity="0.35"
                fill="none"
              />

              {/* ── UPPER RIBBON TIER ── */}
              <path d="M 8,175 C 110,90 260,90 382,175 L 382,183 C 260,98 110,98 8,183 Z" fill="url(#mobExtrusionGradComp)" />

              <g filter="url(#mobElevationComp)">
                <path d="M 8,125 C 110,40 260,40 382,125 L 382,175 C 260,90 110,90 8,175 Z" fill="url(#mobRibbonGrad1Comp)" />
              </g>

              <path d="M 8,126 C 110,41 260,41 382,126" stroke="#FFFFFF" stroke-width="1.5" stroke-opacity="0.45" fill="none" />

              <text font-family="'Syne', 'Archivo Black', 'Arial Black', sans-serif" font-weight="900" font-size="10.2" fill="#4A050C" letter-spacing="0.03em">
                <textPath href="#mobSpine1Comp" startOffset="50%" text-anchor="middle" dy="1.6">
                  I AM A SELF-TAUGHT PRODUCT DESIGNER
                </textPath>
              </text>
              <text font-family="'Syne', 'Archivo Black', 'Arial Black', sans-serif" font-weight="900" font-size="10.2" fill="#FFFFFF" letter-spacing="0.03em">
                <textPath href="#mobSpine1Comp" startOffset="50%" text-anchor="middle" dy="0">
                  I AM A SELF-TAUGHT PRODUCT DESIGNER
                </textPath>
              </text>

              {/* ── LOWER RIBBON TIER ── */}
              <path d="M 8,325 C 125,410 265,410 382,325 L 382,333 C 265,418 125,418 8,333 Z" fill="url(#mobExtrusionGradComp)" />

              <g filter="url(#mobElevationComp)">
                <path d="M 8,275 C 125,360 265,360 382,275 L 382,325 C 265,410 125,410 8,325 Z" fill="url(#mobRibbonGrad2Comp)" />
              </g>

              <path d="M 8,276 C 125,361 265,361 382,276" stroke="#FFFFFF" stroke-width="1.5" stroke-opacity="0.45" fill="none" />

              <text font-family="'Syne', 'Archivo Black', 'Arial Black', sans-serif" font-weight="900" font-size="13.2" fill="#4A050C" letter-spacing="0.04em">
                <textPath href="#mobSpine2Comp" startOffset="50%" text-anchor="middle" dy="1.8">
                  AND PRODUCT BUILDER.
                </textPath>
              </text>
              <text font-family="'Syne', 'Archivo Black', 'Arial Black', sans-serif" font-weight="900" font-size="13.2" fill="#FFFFFF" letter-spacing="0.04em">
                <textPath href="#mobSpine2Comp" startOffset="50%" text-anchor="middle" dy="0">
                  AND PRODUCT BUILDER.
                </textPath>
              </text>
            </svg>
          </motion.div>
        </div>

        {/* ── 3. Modular Typographic Specimen Grid (about-type-grid-reference Inspiration) ── */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: softEase }}
          className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[var(--color-border)] rounded-xl sm:rounded-2xl overflow-hidden border border-[var(--color-border)] my-8 sm:my-12 shadow-xs"
        >
          {/* Tile 1: Self-Taught Discipline */}
          <div className="bg-[var(--color-bg)] p-5 sm:p-7 flex flex-col justify-between group hover:bg-[var(--color-bg-subtle)] transition-colors">
            <div>
              <div className="flex items-center justify-between text-[10px] font-mono text-[var(--color-muted)] uppercase tracking-wider mb-2">
                <span>// 01.01 · ORIGIN</span>
                <span className="font-bold text-[var(--color-red)]">DISCIPLINE</span>
              </div>
              <h3 className="font-display font-black text-xl sm:text-2xl text-[var(--color-ink)] tracking-tight">
                SELF-TAUGHT
              </h3>
            </div>
            <p className="mt-4 text-xs sm:text-sm text-[var(--color-muted)] leading-relaxed font-medium">
              Curiosity-driven engineering, continuous self-directed learning, and relentless craft refinement across UI, code, and systems.
            </p>
          </div>

          {/* Tile 2: Product Designer */}
          <div className="bg-[var(--color-bg)] p-5 sm:p-7 flex flex-col justify-between group hover:bg-[var(--color-bg-subtle)] transition-colors">
            <div>
              <div className="flex items-center justify-between text-[10px] font-mono text-[var(--color-muted)] uppercase tracking-wider mb-2">
                <span>// 01.02 · METHOD</span>
                <span className="font-bold text-[var(--color-red)]">CURIOSITY</span>
              </div>
              <h3 className="font-display font-black text-xl sm:text-2xl text-[var(--color-ink)] tracking-tight">
                DESIGN SYSTEMS
              </h3>
            </div>
            <p className="mt-4 text-xs sm:text-sm text-[var(--color-muted)] leading-relaxed font-medium">
              Architecting modular token systems, scalable typography hierarchies, and tactile micro-interactions that clarify user intent.
            </p>
          </div>

          {/* Tile 3: Product Builder */}
          <div className="bg-[var(--color-bg)] p-5 sm:p-7 flex flex-col justify-between group hover:bg-[var(--color-bg-subtle)] transition-colors">
            <div>
              <div className="flex items-center justify-between text-[10px] font-mono text-[var(--color-muted)] uppercase tracking-wider mb-2">
                <span>// 01.03 · OUTCOME</span>
                <span className="font-bold text-[var(--color-red)]">INTENT</span>
              </div>
              <h3 className="font-display font-black text-xl sm:text-2xl text-[var(--color-ink)] tracking-tight">
                BUILD WITH INTENT
              </h3>
            </div>
            <p className="mt-4 text-xs sm:text-sm text-[var(--color-muted)] leading-relaxed font-medium">
              Bridging Figma canvases to production-grade Next.js, TypeScript, and AI workflows—shipping working products that matter.
            </p>
          </div>
        </motion.div>

        {/* ── 4. Unified Editorial Narrative Plate (Illustration + Verified Bio) ── */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, ease: softEase }}
          className="rounded-2xl sm:rounded-3xl border border-[var(--color-border)] bg-[var(--color-bg-subtle)] p-6 sm:p-10 lg:p-12 shadow-xs"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

            {/* Left Column: Sketch of Taushik with laptop */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center">
              <motion.div
                animate={shouldReduceMotion ? undefined : { y: [0, -6, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="w-full max-w-[240px] xs:max-w-[280px] sm:max-w-[320px] relative"
              >
                <div className="absolute inset-0 bg-radial from-[var(--color-red-soft)] to-transparent rounded-full filter blur-xl pointer-events-none" />
                <img
                  src="/taushik_laptop_sketch.png"
                  alt="Taushik Chandana sitting relaxed with laptop sketch"
                  className="w-full h-auto object-contain select-none pointer-events-none relative z-10 filter contrast-105"
                />
              </motion.div>

              <div className="mt-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-ink-subtle)] text-xs font-mono font-bold shadow-2xs">
                <MapPin size={12} className="text-[var(--color-red)]" />
                <span>BASED IN HYDERABAD</span>
              </div>
            </div>

            {/* Right Column: Factual Narrative & Authentic Discipline Badges */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-6 text-center lg:text-left">
              <div className="space-y-3">
                <p className="text-base sm:text-xl md:text-2xl font-bold leading-relaxed sm:leading-snug text-[var(--color-ink)] tracking-tight">
                  I&apos;m a UI/UX &amp; Product Designer bridging the gap between user experience, visual craft, and design engineering. I build intuitive digital interfaces and product architectures that turn complex systems into seamless user journeys.
                </p>

                <p className="text-xs sm:text-sm md:text-base leading-relaxed text-[var(--color-muted)] font-medium">
                  Beyond traditional screens, I focus on how products are built and shipped—combining design systems, modern frontend code, AI stack workflows, vibe coding, and rapid prototyping to turn bold ideas into production-ready software.
                </p>
              </div>

              {/* Verified Pill Badges with Vibe Coding */}
              <div className="pt-4 border-t border-[var(--color-border)] flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-2.5">
                {/* Signature Vibe Coding Pill */}
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[var(--color-red)] text-white font-mono text-[11px] sm:text-xs font-black uppercase tracking-wider shadow-xs hover:brightness-110 transition-all cursor-default">
                  <motion.span
                    animate={shouldReduceMotion ? undefined : { rotate: 360 }}
                    transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
                    className="inline-block origin-center"
                  >
                    <Sparkle size={12} fill="currentColor" />
                  </motion.span>
                  <span>Vibe Coding</span>
                </span>

                {[
                  "UI/UX & Product Design",
                  "Design Systems & Tokens",
                  "Interactive Prototypes",
                  "AI Stack Workflows",
                  "Rapid Prototyping",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="inline-block px-3 py-1.5 rounded-full bg-[var(--color-bg)] hover:border-[var(--color-red)] border border-[var(--color-border)] text-[var(--color-ink-subtle)] font-mono text-[11px] sm:text-xs font-bold tracking-wider transition-colors shadow-2xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
