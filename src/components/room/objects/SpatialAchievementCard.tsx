"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { Html } from "@react-three/drei";
import {
  Trophy,
  ChevronLeft,
  ChevronRight,
  X,
  Sparkles,
  Award,
  Users,
  Calendar,
  ArrowUpRight,
  ExternalLink,
} from "lucide-react";
import { achievements, type Achievement } from "@/lib/content";

interface SpatialAchievementCardProps {
  isOpen: boolean;
  activeIndex: number;
  onIndexChange: (newIndex: number) => void;
  onClose: () => void;
}

/**
 * Dimensional Achievement Presentation Card with Certificate Images
 * Anchored in 3D space directly in front of the wardrobe door stickers using <Html transform>
 * Real DOM typography guarantees crisp readability, verified honors, and seamless click-outside hierarchy.
 */
export function SpatialAchievementCard({
  isOpen,
  activeIndex,
  onIndexChange,
  onClose,
}: SpatialAchievementCardProps) {
  const item: Achievement = achievements[activeIndex] || achievements[0];
  const total = achievements.length;

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowRight" && activeIndex < total - 1) {
        onIndexChange(activeIndex + 1);
      } else if (e.key === "ArrowLeft" && activeIndex > 0) {
        onIndexChange(activeIndex - 1);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, activeIndex, total, onClose, onIndexChange]);

  if (!isOpen) return null;

  return (
    <group position={[0, 0, 0.12]}>
      <Html
        transform
        distanceFactor={0.42}
        position={[0, 0, 0]}
        className="pointer-events-auto select-none"
      >
        <div
          data-testid="spatial-achievement-card"
          className="relative w-[760px] max-h-[560px] rounded-3xl bg-[#FCFAF7] border-2 border-[#E2DBD1] shadow-[0_24px_70px_rgba(20,18,15,0.4)] text-[#1C1917] p-6 flex flex-col font-sans"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#E8E1D5]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#EFCB75] animate-pulse" />
              <span className="font-mono text-xs font-black text-[#C91F2B] uppercase tracking-wider">
                HACKATHON HONOR // 0{activeIndex + 1} OF 0{total}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#EFCB75]/20 text-[#8A6D1C] border border-[#EFCB75]/40 font-mono text-[10px] font-bold">
                ★ {item.badge || "1st Prize Champion"}
              </span>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F3EFEA] hover:bg-[#C91F2B] hover:text-white text-[#5A524A] text-xs font-mono font-bold transition-all cursor-pointer border border-[#E2DBD1]"
            >
              <X size={14} />
              <span>RETURN TO CUPBOARD (ESC)</span>
            </button>
          </div>

          {/* Body Content: Split Layout with Certificate Image on Left & Details on Right */}
          <div className="grid grid-cols-12 gap-5 flex-1 items-start overflow-y-auto pr-1">
            {/* Left Column (5 Cols): Real Verified Certificate / Trophy Image */}
            <div className="col-span-5 flex flex-col space-y-2.5">
              <div className="relative w-full h-[220px] rounded-2xl overflow-hidden border-2 border-[#E5DFD3] bg-white shadow-xs p-1">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-contain p-2"
                    sizes="320px"
                    unoptimized
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs font-mono text-stone-400">
                    Certificate Image
                  </div>
                )}
                <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-black/75 text-white font-mono text-[9px] font-bold">
                  VERIFIED
                </div>
              </div>

              {/* Award Callout Strip */}
              <div className="p-2.5 rounded-xl bg-[#FAF4E5] border border-[#EFCB75] flex items-center gap-2 text-xs font-mono font-bold text-[#8A6D1C]">
                <Trophy size={14} className="text-[#8A6D1C] shrink-0" />
                <span className="truncate">{item.award}</span>
              </div>

              {/* View Full Resolution Certificate Link */}
              {item.image && (
                <a
                  href={item.image}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-xl bg-white hover:bg-stone-100 text-stone-700 border border-[#E0D7C8] font-mono text-[11px] font-bold transition-all shadow-2xs"
                >
                  <span>VIEW FULL RESOLUTION</span>
                  <ExternalLink size={12} />
                </a>
              )}
            </div>

            {/* Right Column (7 Cols): Honor Narrative, Headline & Metrics */}
            <div className="col-span-7 flex flex-col justify-between space-y-3">
              <div>
                <span className="text-xs font-mono font-bold text-[#C91F2B] uppercase tracking-wider">
                  {item.host} // {item.date || "2026"}
                </span>
                <h2
                  className="text-2xl font-black text-[#141210] tracking-tight mt-0.5 leading-tight"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  {item.title}
                </h2>
                <p className="text-xs font-semibold text-stone-600 mt-1">
                  {item.headline}
                </p>
                <p className="text-xs text-[#3D3732] leading-relaxed mt-2 font-normal">
                  {item.description}
                </p>
              </div>

              {/* Metrics Grid */}
              {item.metrics && item.metrics.length > 0 && (
                <div className="grid grid-cols-2 gap-2 pt-1">
                  {item.metrics.map((m, i) => (
                    <div
                      key={i}
                      className="p-2.5 rounded-xl bg-[#F6F2EA] border border-[#E8E1D5] text-center shadow-2xs"
                    >
                      <div className="text-base font-black font-mono text-[#141210]">
                        {m.value}
                      </div>
                      <div className="text-[10px] font-mono text-stone-500 uppercase mt-0.5 truncate">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Bottom Actions & Jumpers */}
          <div className="flex items-center justify-between pt-3 border-t border-[#E8E1D5] mt-3">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onIndexChange(Math.max(0, activeIndex - 1))}
                disabled={activeIndex === 0}
                className="px-3.5 py-1.5 rounded-xl bg-[#F3EFEA] hover:bg-stone-200 disabled:opacity-30 disabled:pointer-events-none text-xs font-mono font-bold text-[#1C1917] flex items-center gap-1 transition-all cursor-pointer border border-[#E2DBD1]"
              >
                <ChevronLeft size={13} />
                <span>PREV</span>
              </button>

              {/* Jumper Pills */}
              <div className="flex items-center gap-1">
                {achievements.map((ach, idx) => {
                  const isActive = idx === activeIndex;
                  return (
                    <button
                      key={ach.id}
                      type="button"
                      onClick={() => onIndexChange(idx)}
                      className={`w-7 h-7 rounded-lg font-mono text-[11px] font-bold transition-all flex items-center justify-center cursor-pointer ${
                        isActive
                          ? "bg-[#C91F2B] text-white shadow-xs font-black scale-105"
                          : "bg-white hover:bg-stone-200 text-stone-600 border border-[#E0D7C8]"
                      }`}
                      title={ach.title}
                    >
                      0{idx + 1}
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={() => onIndexChange(Math.min(total - 1, activeIndex + 1))}
                disabled={activeIndex === total - 1}
                className="px-3.5 py-1.5 rounded-xl bg-[#F3EFEA] hover:bg-stone-200 disabled:opacity-30 disabled:pointer-events-none text-xs font-mono font-bold text-[#1C1917] flex items-center gap-1 transition-all cursor-pointer border border-[#E2DBD1]"
              >
                <span>NEXT</span>
                <ChevronRight size={13} />
              </button>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-[#1C1917] hover:bg-[#C91F2B] text-white text-xs font-mono font-bold transition-all cursor-pointer shadow-xs"
            >
              VIEW ALL CUPBOARD STICKERS (ESC)
            </button>
          </div>
        </div>
      </Html>
    </group>
  );
}
