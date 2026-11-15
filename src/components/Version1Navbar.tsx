"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Download,
  Mail,
  Play,
  Pause,
  RotateCcw,
  Menu,
  X,
  ExternalLink,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { RoomInteractionTarget } from "./room/roomInteractionTypes";

interface Version1NavbarProps {
  activeTarget: RoomInteractionTarget;
  onSelectTarget: (target: RoomInteractionTarget) => void;
  onCloseTarget: () => void;
  targetTitle?: string;
  isPlaying?: boolean;
  onToggleAudio?: () => void;
}

interface NavDestination {
  label: string;
  target: RoomInteractionTarget;
  keyNumber: string;
}

const NAV_DESTINATIONS: NavDestination[] = [
  { label: "Work", target: "book", keyNumber: "1" },
  { label: "About", target: "about", keyNumber: "2" },
  { label: "Experience", target: "wall", keyNumber: "3" },
  { label: "Honors", target: "wardrobe", keyNumber: "4" },
  { label: "Contact", target: "phone", keyNumber: "5" },
];

/**
 * Version 1 Portfolio Top Navigation Bar
 * Authentic reproduction of the original GitHub repository navbar:
 * - Brand: "Taushik / UX" with return-to-room action.
 * - Center: Work | About | Experience | Honors | Contact destinations linking to 3D room objects.
 * - Right: "Play a song" / "Fitoor" audio player, signature red brutalist Resume download button, and circular Mail button.
 * - Mobile drawer for smaller viewports with full accessibility.
 */
export function Version1Navbar({
  activeTarget,
  onSelectTarget,
  onCloseTarget,
  targetTitle = "",
  isPlaying: externalIsPlaying,
  onToggleAudio: externalOnToggleAudio,
}: Version1NavbarProps) {
  const [internalIsPlaying, setInternalIsPlaying] = useState(false);
  const isPlaying = externalIsPlaying !== undefined ? externalIsPlaying : internalIsPlaying;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const navRef = useRef<HTMLDivElement | null>(null);

  // Initialize background audio with lazy preload if not externally controlled
  useEffect(() => {
    if (externalOnToggleAudio) return;

    const audio = new Audio("/audio/fitoor.mp3");
    audio.preload = "none";
    audio.loop = true;

    const handlePlay = () => setInternalIsPlaying(true);
    const handlePause = () => setInternalIsPlaying(false);
    const handleEnded = () => setInternalIsPlaying(false);
    const handleError = (e: Event) => {
      console.warn("Audio load error:", e);
      setInternalIsPlaying(false);
    };

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);

    audioRef.current = audio;

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
      audio.pause();
      audio.src = "";
    };
  }, [externalOnToggleAudio]);

  // Handle click outside to close mobile drawer
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        isMobileMenuOpen &&
        navRef.current &&
        !navRef.current.contains(e.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileMenuOpen]);

  const toggleAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (externalOnToggleAudio) {
      externalOnToggleAudio();
      return;
    }
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setInternalIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setInternalIsPlaying(true))
        .catch((err) => {
          console.warn("Audio play prevented:", err);
          setInternalIsPlaying(false);
        });
    }
  };

  const handleNavClick = (target: RoomInteractionTarget) => {
    onSelectTarget(target);
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      ref={navRef}
      className="relative w-full z-40 bg-white/95 backdrop-blur-md border-b border-[var(--color-border)] select-none shrink-0"
    >
      <div className="section-shell flex h-16 items-center justify-between gap-3">
        
        {/* ── 1. LEFT: Brand Wordmark "Taushik / UX" ── */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => {
              if (activeTarget !== null) {
                onSelectTarget(null);
              } else {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            className="flex items-center gap-1.5 text-sm sm:text-base font-black uppercase tracking-normal text-[var(--color-ink)] hover:text-[#e52424] transition-colors cursor-pointer group"
            aria-label="Return to room overview or mascot hero"
          >
            <span>Taushik</span>
            <span className="text-[#e52424] font-black group-hover:scale-125 transition-transform">/</span>
            <span>UX</span>
          </button>

          <span className="text-[var(--color-muted)] text-[11px] sm:text-xs font-normal hidden xl:inline border-l border-[var(--color-border)] pl-2.5">
            Product Designer &amp; Creative Developer
          </span>
        </div>

        {/* ── 2. CENTER: Nav Destination Links (Desktop & Tablet) ── */}
        <nav
          className="hidden md:flex items-center gap-6 lg:gap-8 text-xs font-bold uppercase tracking-wider text-[var(--color-muted)] font-mono"
          aria-label="Main Navigation"
        >
          {NAV_DESTINATIONS.map((dest) => {
            const isActive = activeTarget === dest.target;
            return (
              <button
                key={dest.label}
                type="button"
                onClick={() => handleNavClick(dest.target)}
                className={`flex items-center gap-1.5 py-1 transition-all cursor-pointer relative subtle-link ${
                  isActive
                    ? "text-[#e52424] font-black !bg-none"
                    : "hover:text-[var(--color-ink)]"
                }`}
              >
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#e52424] shadow-[0_0_6px_#e52424]" />
                )}
                <span>{dest.label}</span>
                {isActive && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#e52424] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* ── 3. RIGHT: Audio Toggle + Red Resume Button + Circular Mail Button ── */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          
          {/* Focused Object Mode: Return to Room Indicator */}
          {activeTarget && (
            <button
              type="button"
              data-testid="return-to-room-button"
              onClick={onCloseTarget}
              className="flex items-center gap-1.5 px-3 py-1.5 min-h-[36px] rounded-full bg-white border border-[#e52424] text-[#e52424] text-xs font-mono font-bold tracking-wider uppercase shadow-xs hover:bg-[#e52424] hover:text-white transition-all cursor-pointer mr-1"
              aria-label="Return to full room overview"
            >
              <RotateCcw size={12} />
              <span className="hidden sm:inline">RETURN</span>
              <span className="text-[10px] opacity-80">(ESC)</span>
            </button>
          )}

          {/* Stoppable "Play a song" / "Fitoor" Audio Button */}
          <button
            onClick={toggleAudio}
            type="button"
            className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-bold transition-all duration-200 shrink-0 cursor-pointer ${
              isPlaying
                ? "bg-[#e52424] border-[#e52424] text-white shadow-sm shadow-[#e52424]/30 hover:bg-[#b01723]"
                : "bg-[var(--color-bg-subtle)] border-[var(--color-border)] text-[var(--color-ink)] hover:border-[#e52424] hover:bg-white shadow-2xs"
            }`}
            title={isPlaying ? "Stop 'Fitoor'" : "Play 'Fitoor' soundtrack"}
            aria-label={isPlaying ? "Stop audio" : "Play audio"}
          >
            <div
              className={`grid h-4 w-4 place-items-center rounded-full transition-colors ${
                isPlaying ? "bg-white text-[#e52424]" : "bg-[var(--color-ink)] text-white"
              }`}
            >
              {isPlaying ? (
                <Pause size={8} fill="currentColor" />
              ) : (
                <Play size={8} className="ml-0.5" fill="currentColor" />
              )}
            </div>

            <span className="whitespace-nowrap tracking-tight font-mono text-[11px]">
              {isPlaying ? "Fitoor" : "Play song"}
            </span>

            {/* Equalizer Waveform */}
            {isPlaying && (
              <div className="flex items-end gap-[1.5px] h-2.5 ml-0.5 shrink-0" aria-hidden="true">
                <span className="w-[1.5px] h-full bg-white animate-pulse" />
                <span className="w-[1.5px] h-2 bg-white animate-bounce" />
                <span className="w-[1.5px] h-full bg-white animate-pulse" />
              </div>
            )}
          </button>

          {/* Signature Red Brutalist Resume Download Button */}
          <a
            href="/Taushik_ux_resume.pdf"
            download="Taushik_ux_resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-1.5 rounded-full border-2 border-[var(--color-ink)] bg-[#e52424] text-white text-[11px] sm:text-xs font-black uppercase tracking-wider shadow-[2px_2px_0_#220608] hover:bg-[var(--color-ink)] hover:border-[var(--color-ink)] transition-all active:translate-x-0.5 active:translate-y-0.5 cursor-pointer shrink-0"
            aria-label="Download Resume"
          >
            <Download size={13} className="shrink-0" />
            <span>Resume</span>
          </a>

          {/* Circular Mail Icon Button */}
          <a
            href="mailto:taushikok@gmail.com"
            className="grid h-9 w-9 place-items-center rounded-full border border-[var(--color-ink)] text-[var(--color-ink)] transition duration-200 hover:bg-[var(--color-ink)] hover:text-white cursor-pointer shrink-0 shadow-2xs"
            aria-label="Email Taushik"
            title="Email taushikok@gmail.com"
          >
            <Mail size={16} />
          </a>

          {/* Mobile Menu Hamburger Toggle */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden grid h-9 w-9 place-items-center rounded-full border border-[var(--color-border)] bg-[var(--color-bg-subtle)] text-[var(--color-ink)] hover:border-[#e52424] hover:text-[#e52424] transition-colors cursor-pointer"
            aria-expanded={isMobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {/* ── 4. Mobile Dropdown Navigation Drawer ── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="md:hidden border-t border-[var(--color-border)] bg-white/98 backdrop-blur-xl px-4 py-3 shadow-lg"
          >
            <div className="flex flex-col gap-1.5 font-mono text-xs">
              <span className="text-[10px] font-bold text-[var(--color-muted)] uppercase tracking-wider pb-1 border-b border-[var(--color-border)]">
                In-Room Destinations
              </span>

              {NAV_DESTINATIONS.map((dest) => (
                <button
                  key={dest.label}
                  type="button"
                  onClick={() => handleNavClick(dest.target)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-left font-bold transition-colors cursor-pointer ${
                    activeTarget === dest.target
                      ? "bg-[var(--color-red-light)] text-[var(--color-red)]"
                      : "text-[var(--color-ink)] hover:bg-[var(--color-bg-subtle)]"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {activeTarget === dest.target && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-red)]" />
                    )}
                    <span>{dest.label}</span>
                  </span>
                  <span className="text-[10px] text-neutral-400">[{dest.keyNumber}]</span>
                </button>
              ))}

              <div className="pt-2 mt-1 border-t border-[var(--color-border)] flex items-center justify-between">
                <button
                  type="button"
                  onClick={toggleAudio}
                  className="flex items-center gap-1.5 text-xs text-[var(--color-ink)] font-bold py-1.5 cursor-pointer"
                >
                  {isPlaying ? <Pause size={13} /> : <Play size={13} />}
                  <span>{isPlaying ? "Pause Music" : "Play Fitoor"}</span>
                </button>

                <a
                  href="/Taushik_ux_resume.pdf"
                  download="Taushik_ux_resume.pdf"
                  className="text-xs font-bold text-[var(--color-red)] flex items-center gap-1"
                >
                  <Download size={12} />
                  <span>Download Resume</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
