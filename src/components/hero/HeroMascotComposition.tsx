"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Mascot & Sketchbook Illustration Composition (Right Column)
 * Faithfully matches the composition reference:
 * - Large transparent 2.5D illustration of Taushik seated on an open sketchbook
 * - Wireframe drawings and design notes visible on the open pages
 * - Soft blush/pale-red rounded backing card (#FFF3F2)
 * - 2-4 intentional red hand-drawn SVG accents (scribble loop, accent rays, sparkle, accent dot)
 * - Subtle desktop mouse parallax (max 4px) disabled on touch & reduced motion
 * - Object-fit: contain guarantees the open book, character, hands and shoes are never cropped
 */
export function HeroMascotComposition() {
  const shouldReduceMotion = useReducedMotion();
  const [mouseOffset, setMouseOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const xRel = (e.clientX - rect.left) / rect.width - 0.5;
    const yRel = (e.clientY - rect.top) / rect.height - 0.5;
    // Bounded subtle parallax: max 4px
    setMouseOffset({
      x: xRel * 8,
      y: yRel * 6,
    });
  };

  const handleMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-[620px] lg:max-w-[700px] xl:max-w-[760px] flex items-center justify-center my-auto py-4 sm:py-6"
    >
      {/* ── 1. Soft Pale Blush Organic Backing Card ── */}
      <motion.div
        initial={shouldReduceMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-4 sm:top-6 right-2 sm:right-6 bottom-8 sm:bottom-12 left-10 sm:left-14 rounded-[40px] sm:rounded-[56px] lg:rounded-[64px] bg-[#FFF3F2] border border-[#FCEBED] shadow-xs pointer-events-none z-0"
        aria-hidden="true"
      />

      {/* ── 2. Hand-Drawn Red Accent SVG Doodles (Aria-Hidden, Decorative) ── */}
      {/* Doodle A: Red Scribble Loop (Arching over top-left of the book) */}
      <motion.div
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="absolute -top-1 sm:top-2 left-6 sm:left-10 w-16 sm:w-24 md:w-28 pointer-events-none z-10"
        aria-hidden="true"
      >
        <img
          src="/hero/red-scribble-loop.svg"
          alt=""
          className="w-full h-auto select-none"
        />
      </motion.div>

      {/* Doodle B: Radiating Accent Rays (Above character's raised hand / head) */}
      <motion.div
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="absolute top-2 sm:top-6 right-6 sm:right-12 w-8 sm:w-11 md:w-12 pointer-events-none z-10"
        aria-hidden="true"
      >
        <img
          src="/hero/accent-rays.svg"
          alt=""
          className="w-full h-auto select-none"
        />
      </motion.div>

      {/* Doodle C: Solid Red Accent Dot */}
      <div
        className="absolute top-16 sm:top-20 right-4 sm:right-6 w-2.5 h-2.5 rounded-full bg-[#C91F2B] pointer-events-none z-10 shadow-xs"
        aria-hidden="true"
      />

      {/* Doodle D: 4-Point Star Sparkle (Near bottom edge of open sketchbook) */}
      <motion.div
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="absolute bottom-10 sm:bottom-16 left-2 sm:left-6 w-5 sm:w-7 pointer-events-none z-10"
        aria-hidden="true"
      >
        <img
          src="/hero/sparkle.svg"
          alt=""
          className="w-full h-auto select-none"
        />
      </motion.div>

      {/* ── 3. High-Quality Transparent 2.5D Character & Sketchbook Art ── */}
      <motion.div
        initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        animate={{
          opacity: 1,
          y: mouseOffset.y,
          x: mouseOffset.x,
        }}
        transition={{
          y: { duration: 0.25, ease: "easeOut" },
          x: { duration: 0.25, ease: "easeOut" },
          opacity: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
        }}
        className="relative z-10 w-full flex items-center justify-center"
      >
        <Image
          src="/hero/taushik-sketchbook-mascot.webp"
          alt="Taushik Chandana seated on an open design sketchbook with wireframe drawings"
          width={1315}
          height={1196}
          priority
          sizes="(max-width: 640px) 94vw, (max-width: 1024px) 70vw, 680px"
          className="w-full h-auto max-h-[46vh] sm:max-h-[58vh] lg:max-h-[72vh] object-contain drop-shadow-[0_16px_36px_rgba(23,21,21,0.08)] select-none pointer-events-none"
        />
      </motion.div>
    </div>
  );
}
