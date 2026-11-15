"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  X,
  Music,
} from "lucide-react";

export interface MusicSpotlightOverlayProps {
  isOpen: boolean;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onClose: () => void;
}

/**
 * Music Spotlight Overlay — The In-Room Retro Cassette Experience
 * 
 * When visitor clicks "Listen to a song", camera glides right up to the wall-mounted
 * vintage cassette deck. This tactile floating HUD pairs with the real-time spinning
 * 3D cassette spools, presenting track details, animated equalizer, and full audio controls.
 * Clicking outside the content card returns the user to the entire room.
 */
export function MusicSpotlightOverlay({
  isOpen,
  isPlaying,
  onTogglePlay,
  onClose,
}: MusicSpotlightOverlayProps) {
  const [progress, setProgress] = useState<number>(38); // visual playback percentage

  // Spacebar to play/pause, ESC to return to room
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.code === "Space" && !(e.target instanceof HTMLInputElement)) {
        e.preventDefault();
        onTogglePlay();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onTogglePlay, onClose]);

  // Subtle progress ticker when playing
  useEffect(() => {
    if (!isPlaying || !isOpen) return;
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 0.3));
    }, 1000);
    return () => clearInterval(interval);
  }, [isPlaying, isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 pointer-events-auto flex flex-col justify-between p-4 sm:p-7 select-none bg-black/40 backdrop-blur-xs cursor-pointer"
        onClick={onClose}
        aria-modal="true"
        role="dialog"
      >
        {/* ── Top Bar: Experience Title & Return Control ── */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="w-full flex items-center justify-between pointer-events-auto cursor-default"
        >
          <div className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#FCFAF7]/95 border border-[#E2DBD1] shadow-[0_8px_30px_rgba(0,0,0,0.12)] backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E52424] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E52424] shadow-[0_0_8px_#e52424]" />
            </span>
            <span
              className="font-bold text-xs sm:text-sm text-[#1C1917] tracking-tight uppercase"
              style={{ fontFamily: "var(--font-outfit), Outfit, sans-serif" }}
            >
              RETRO CASSETTE DECK // SIDE A
            </span>
            <span className="px-2 py-0.5 rounded-full bg-[#E52424]/10 text-[#E52424] font-mono text-[10px] font-bold">
              {isPlaying ? "● PLAYING" : "❚❚ PAUSED"}
            </span>
          </div>

          <button
            type="button"
            data-testid="close-music-experience"
            onClick={onClose}
            className="flex items-center gap-2 px-4 py-2 min-h-[40px] rounded-full bg-[#FCFAF7]/95 hover:bg-[#E52424] text-[#1C1917] hover:text-white border border-[#E2DBD1] hover:border-[#E52424] shadow-[0_8px_30px_rgba(0,0,0,0.12)] backdrop-blur-md font-mono text-xs font-bold transition-all cursor-pointer"
            aria-label="Return to entire room overview"
          >
            <span>SEE ENTIRE ROOM</span>
            <X size={15} />
            <span className="px-1.5 py-0.5 rounded bg-black/10 text-[10px] font-black">
              ESC
            </span>
          </button>
        </motion.div>

        {/* ── Bottom Floating Audio Console ── */}
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.96 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-xl mx-auto pointer-events-auto cursor-default"
        >
          <div className="relative rounded-2xl sm:rounded-3xl border border-[#E2DBD1] bg-[#FCFAF7]/95 shadow-[0_24px_65px_rgba(23,21,21,0.22)] p-4 sm:p-6 backdrop-blur-xl text-[#1C1917]">
            {/* Vintage Cassette Header Strip */}
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#E8E1D5] flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <Music size={15} className="text-[#E52424]" />
                <span
                  className="font-bold text-xs tracking-wider text-stone-600 uppercase"
                  style={{ fontFamily: "var(--font-outfit), Outfit, sans-serif" }}
                >
                  PERSONAL SOUNDTRACK SELECTION
                </span>
              </div>
              <div className="text-[11px] font-mono text-stone-500 font-bold">
                [ HI-FI STEREO • 44.1 kHz ]
              </div>
            </div>

            {/* Track Info & Animated Equalizer */}
            <div className="flex items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-3.5 min-w-0">
                {/* Rotating Cassette Hub Graphic */}
                <div className="relative w-12 h-12 rounded-xl bg-[#22252A] border border-stone-700 flex items-center justify-center shrink-0 shadow-inner overflow-hidden">
                  <div
                    className={`relative w-8 h-8 rounded-full border-2 border-[#FAF5EE] flex items-center justify-center ${
                      isPlaying ? "animate-spin" : ""
                    }`}
                    style={{ animationDuration: "2.5s" }}
                  >
                    <div className="w-2.5 h-2.5 rounded-full bg-[#E52424]" />
                    <div className="absolute w-1 h-3 bg-[#FAF5EE]" />
                    <div className="absolute w-3 h-1 bg-[#FAF5EE]" />
                  </div>
                </div>

                <div className="min-w-0">
                  <h3
                    className="text-base sm:text-lg font-black text-[#171515] truncate"
                    style={{ fontFamily: "var(--font-outfit), Outfit, sans-serif" }}
                  >
                    Fitoor
                  </h3>
                  <p className="text-xs text-stone-500 font-mono truncate">
                    Arijit Singh &amp; Amit Trivedi • Shamshera
                  </p>
                </div>
              </div>

              {/* Real-Time Animated Equalizer Bars */}
              <div className="flex items-end gap-1 h-8 px-2.5 py-1 rounded-lg bg-stone-100/80 border border-stone-200/80 shrink-0">
                {[0.4, 0.8, 0.6, 1.0, 0.5, 0.9, 0.7, 0.3, 0.85, 0.65].map((h, i) => (
                  <motion.div
                    key={i}
                    animate={
                      isPlaying
                        ? {
                            height: [`${h * 24}px`, `${(1.1 - h) * 24}px`, `${h * 24}px`],
                          }
                        : { height: "4px" }
                    }
                    transition={{
                      repeat: Infinity,
                      duration: 0.6 + (i % 4) * 0.15,
                      ease: "easeInOut",
                    }}
                    className="w-1 bg-[#E52424] rounded-full"
                    style={{ height: isPlaying ? `${h * 24}px` : "4px" }}
                  />
                ))}
              </div>
            </div>

            {/* Playback Progress Scrubber */}
            <div className="mb-4">
              <div className="w-full h-2 rounded-full bg-stone-200 overflow-hidden relative">
                <div
                  className="h-full bg-[#E52424] rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] font-mono text-stone-500 mt-1.5 font-bold">
                <span>01:42</span>
                <span>04:32</span>
              </div>
            </div>

            {/* Main Interactive Controls */}
            <div className="flex items-center justify-between gap-3 pt-2 border-t border-[#E8E1D5]">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onTogglePlay}
                  className={`flex items-center gap-2 px-5 py-2.5 min-h-[44px] rounded-full font-mono text-xs font-black uppercase tracking-wider transition-all cursor-pointer shadow-sm active:scale-95 ${
                    isPlaying
                      ? "bg-[#E52424] text-white hover:bg-[#C91F2B] border border-[#B91C1C]"
                      : "bg-[#171515] text-white hover:bg-[#E52424] border border-[#171515]"
                  }`}
                >
                  {isPlaying ? (
                    <>
                      <Pause size={14} className="fill-current" />
                      <span>PAUSE CASSETTE</span>
                    </>
                  ) : (
                    <>
                      <Play size={14} className="fill-current" />
                      <span>PLAY CASSETTE</span>
                    </>
                  )}
                </button>

                <span className="hidden sm:inline-block text-[11px] font-mono text-stone-500 font-bold ml-1">
                  [ SPACEBAR ]
                </span>
              </div>

              {/* Ambient Continuation Hint */}
              <div className="text-right">
                <span className="text-[10px] font-mono text-stone-500 block leading-tight">
                  ✦ Continuous ambient audio
                </span>
                <span className="text-[10px] font-mono text-[#E52424] font-bold block leading-tight">
                  Plays while exploring room
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
