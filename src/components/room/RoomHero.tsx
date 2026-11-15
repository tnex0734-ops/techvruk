"use client";

import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "framer-motion";
import {
  RotateCcw,
  BookOpen,
  Briefcase,
  Award,
  Phone,
  FileEdit,
  Menu,
  X,
  Compass,
  Music,
} from "lucide-react";
import { RoomInteractionTarget, ROOM_HOTSPOTS } from "./roomInteractionTypes";
import { Version1Navbar } from "../Version1Navbar";
import { BookOverlayControls } from "./objects/BookOverlayControls";
import { Dock } from "../ui/Dock";
import { MusicSpotlightOverlay } from "./objects/MusicSpotlightOverlay";

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
    <div className="w-full h-full min-h-[500px] flex flex-col items-center justify-center bg-[var(--color-bg-subtle)] border border-[var(--color-border)] rounded-2xl animate-pulse text-[var(--color-muted)] font-mono text-xs">
      <span className="text-[var(--color-ink)] font-bold mb-1">TAUSHIK CHANDANA</span>
      <span>INITIALIZING 3D BEDROOM ARCHITECTURE...</span>
    </div>
  );
}

function RoomFallbackBlueprint({ onSelect }: { onSelect: (target: RoomInteractionTarget) => void }) {
  return (
    <div className="w-full h-full min-h-[500px] flex flex-col items-center justify-center p-6 bg-[var(--color-bg-subtle)] text-center font-mono">
      <span className="font-bold text-xs uppercase tracking-wider text-[var(--color-ink)] mb-2">
        Architectural Room Portfolio Blueprint
      </span>
      <p className="text-xs text-[var(--color-muted)] max-w-md mb-6">
        WebGL acceleration operating in accessible blueprint mode. Select an in-room destination below:
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => onSelect("book")}
          className="px-4 py-2.5 min-h-[44px] min-w-[44px] rounded-xl bg-white border border-[var(--color-border)] hover:border-[var(--color-red)] text-xs font-bold text-[var(--color-ink)] shadow-2xs hover:shadow-xs transition-all flex items-center gap-2 cursor-pointer"
        >
          <BookOpen size={14} className="text-[var(--color-red)]" />
          <span>Projects Book</span>
        </button>
        <button
          type="button"
          onClick={() => onSelect("about")}
          className="px-4 py-2.5 min-h-[44px] min-w-[44px] rounded-xl bg-white border border-[var(--color-border)] hover:border-[var(--color-red)] text-xs font-bold text-[var(--color-ink)] shadow-2xs hover:shadow-xs transition-all flex items-center gap-2 cursor-pointer"
        >
          <FileEdit size={14} className="text-[var(--color-red)]" />
          <span>About Sketchbook</span>
        </button>
        <button
          type="button"
          onClick={() => onSelect("wall")}
          className="px-4 py-2.5 min-h-[44px] min-w-[44px] rounded-xl bg-white border border-[var(--color-border)] hover:border-[var(--color-red)] text-xs font-bold text-[var(--color-ink)] shadow-2xs hover:shadow-xs transition-all flex items-center gap-2 cursor-pointer"
        >
          <Briefcase size={14} className="text-[var(--color-red)]" />
          <span>Experience Wall</span>
        </button>
        <button
          type="button"
          onClick={() => onSelect("wardrobe")}
          className="px-4 py-2.5 min-h-[44px] min-w-[44px] rounded-xl bg-white border border-[var(--color-border)] hover:border-[var(--color-red)] text-xs font-bold text-[var(--color-ink)] shadow-2xs hover:shadow-xs transition-all flex items-center gap-2 cursor-pointer"
        >
          <Award size={14} className="text-[var(--color-red)]" />
          <span>Achievement Cupboard</span>
        </button>
        <button
          type="button"
          onClick={() => onSelect("phone")}
          className="px-4 py-2.5 min-h-[44px] min-w-[44px] rounded-xl bg-white border border-[var(--color-border)] hover:border-[var(--color-red)] text-xs font-bold text-[var(--color-ink)] shadow-2xs hover:shadow-xs transition-all flex items-center gap-2 cursor-pointer"
        >
          <Phone size={14} className="text-[var(--color-red)]" />
          <span>Desk Phone</span>
        </button>
        <button
          type="button"
          onClick={() => onSelect("music")}
          className="px-4 py-2.5 min-h-[44px] min-w-[44px] rounded-xl bg-white border border-[var(--color-border)] hover:border-[var(--color-red)] text-xs font-bold text-[var(--color-ink)] shadow-2xs hover:shadow-xs transition-all flex items-center gap-2 cursor-pointer"
        >
          <Music size={14} className="text-[var(--color-red)]" />
          <span>Listen to a song</span>
        </button>
      </div>
    </div>
  );
}

export interface RoomHeroProps {
  externalTarget?: RoomInteractionTarget;
  isHeroCovering?: boolean;
}

export function RoomHero({ externalTarget, isHeroCovering = false }: RoomHeroProps = {}) {
  const shouldReduceMotion = useReducedMotion();
  const [activeTarget, setActiveTarget] = useState<RoomInteractionTarget>(externalTarget ?? null);

  useEffect(() => {
    if (externalTarget !== undefined) {
      setActiveTarget(externalTarget);
    }
  }, [externalTarget]);
  const [hoveredTarget, setHoveredTarget] = useState<RoomInteractionTarget>(null);
  const [bookPageIndex, setBookPageIndex] = useState<number>(0);
  const [isBookDossierOpen, setIsBookDossierOpen] = useState<boolean>(false);
  const [selectedCardIndex, setSelectedCardIndex] = useState<number>(0);
  const [selectedAchievementIndex, setSelectedAchievementIndex] = useState<number>(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Unified audio element synchronized across Navbar and in-room 3D Cassette Deck
  useEffect(() => {
    const audio = new Audio("/audio/fitoor.mp3");
    audio.preload = "none";
    audio.loop = true;

    const handlePlay = () => setIsPlayingAudio(true);
    const handlePause = () => setIsPlayingAudio(false);
    const handleEnded = () => setIsPlayingAudio(false);
    const handleError = (e: Event) => {
      console.warn("Audio load error:", e);
      setIsPlayingAudio(false);
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
  }, []);

  const handleToggleAudio = () => {
    if (!audioRef.current) return;
    if (isPlayingAudio) {
      audioRef.current.pause();
      setIsPlayingAudio(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlayingAudio(true))
        .catch((err) => {
          console.warn("Audio autoplay blocked by browser policy:", err);
          setIsPlayingAudio(false);
        });
    }
  };

  // Automatically reset book dossier state when switching focus away from book
  useEffect(() => {
    if (activeTarget !== "book") {
      setIsBookDossierOpen(false);
    }
  }, [activeTarget]);

  // Close handler for whatever object is currently active - ALWAYS returns to entire room overview
  const handleCloseCurrentTarget = () => {
    setIsBookDossierOpen(false);
    setActiveTarget(null);
  };

  // Keyboard shortcut listener: 1-5 to navigate, Escape to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.key === "Escape") {
        e.preventDefault();
        handleCloseCurrentTarget();
      } else if (e.key === "1") {
        setActiveTarget("book");
        setIsBookDossierOpen(false);
      } else if (e.key === "2") {
        setActiveTarget("about");
      } else if (e.key === "3") {
        setActiveTarget("wall");
      } else if (e.key === "4") {
        setActiveTarget("wardrobe");
      } else if (e.key === "5") {
        setActiveTarget("phone");
      } else if (e.key === "6" || e.key.toLowerCase() === "m") {
        setActiveTarget("music");
        if (!isPlayingAudio) {
          handleToggleAudio();
        }
      } else if (e.key === "0") {
        setActiveTarget(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isBookDossierOpen, activeTarget, isPlayingAudio]);

  const getTargetTitle = () => {
    switch (activeTarget) {
      case "book":
        return "Selected Projects Book";
      case "about":
        return "Personal Sketchbook // About & Toolkit";
      case "wall":
        return "Experience Pinboard // Timeline";
      case "wardrobe":
        return "Cupboard Stickers // Hackathon Honors";
      case "phone":
        return "Desk Phone // Contact Hologram";
      case "music":
        return "Analog Cassette Deck // Audio Experience";
      default:
        return "";
    }
  };

  return (
    <section
      id="room"
      aria-label="Interactive 3D bedroom workspace"
      className="relative w-full h-screen min-h-[600px] flex flex-col justify-between bg-[var(--color-bg)] select-none overflow-hidden"
    >
      {/* ── Accessible Semantic Text Layer for Screen Readers & SEO ── */}
      <div className="sr-only">
        <h1>Taushik Chandana — Product Designer &amp; Creative Developer Portfolio</h1>
        <p>
          Immersive 3D bedroom portfolio. All portfolio content is explored through physical interactive objects:
          1. Selected Projects in the Hardcover Book on the desk.
          2. About, Philosophy and Toolkit in the Sketchbook on the desk.
          3. Professional Experience on the Wall Hanging Pinboard.
          4. Hackathon Honors and Awards as stickers on the wardrobe cupboard.
          5. Contact Information and Hologram via the physical desk phone.
        </p>
      </div>

      {/* ── 1. Authentic Version 1 Top Navigation Bar (Edge-to-Edge) ── */}
      <Version1Navbar
        activeTarget={activeTarget}
        isPlaying={isPlayingAudio}
        onToggleAudio={handleToggleAudio}
        onSelectTarget={(target) => {
          if (target === "book") {
            setActiveTarget("book");
            setIsBookDossierOpen(false);
          } else {
            setActiveTarget(target);
          }
        }}
        onCloseTarget={handleCloseCurrentTarget}
        targetTitle={getTargetTitle()}
      />

      {/* ── Main Single-Room Layout Container ── */}
      <div className="relative z-10 w-full flex-1 flex flex-col justify-between p-2 sm:p-4 min-h-0">
        
        {/* ── 2. The 3D Interactive Room Canvas ── */}
        <div className="relative w-full flex-1 rounded-2xl sm:rounded-3xl border border-[var(--color-border)] bg-[var(--color-bg-subtle)] overflow-hidden shadow-xs">
          
          {/* The R3F 3D Canvas */}
          <DynamicRoomCanvas
            activeTarget={activeTarget}
            hoveredTarget={hoveredTarget}
            bookPageIndex={bookPageIndex}
            isBookDossierEmerging={isBookDossierOpen}
            selectedCardIndex={selectedCardIndex}
            selectedAchievementIndex={selectedAchievementIndex}
            isPlayingAudio={isPlayingAudio}
            onToggleAudio={handleToggleAudio}
            onBookPageChange={(idx) => setBookPageIndex(idx)}
            onBookSelectProject={() => setIsBookDossierOpen(true)}
            onCloseCurrentTarget={handleCloseCurrentTarget}
            onCardChange={(idx) => setSelectedCardIndex(idx)}
            onAchievementChange={(idx) => setSelectedAchievementIndex(idx)}
            isHeroCovering={isHeroCovering && !activeTarget}
            onSelect={(target) => {
              if (target === "laptop") {
                setActiveTarget("book");
                setIsBookDossierOpen(false);
              } else if (target === "door") {
                setActiveTarget("phone");
              } else if (target === "book") {
                setActiveTarget("book");
                setIsBookDossierOpen(false);
              } else if (target === "music") {
                setActiveTarget("music");
                if (!isPlayingAudio) {
                  handleToggleAudio();
                }
              } else {
                setActiveTarget(target);
              }
            }}
            onHover={(target) => setHoveredTarget(target)}
            fallback={<RoomFallbackBlueprint onSelect={(target) => setActiveTarget(target)} />}
          />

          {/* ── 3. Projects Book Controls (Mounted ONLY when book is active) ── */}
          <BookOverlayControls
            isOpen={activeTarget === "book"}
            pageIndex={bookPageIndex}
            isDossierOpen={isBookDossierOpen}
            onPageChange={(idx) => setBookPageIndex(idx)}
            onOpenDossier={() => setIsBookDossierOpen(true)}
            onCloseBook={handleCloseCurrentTarget}
          />
        </div>

        {/* ── 4. React Bits In-Room Navigation Dock ── */}
        <Dock
          activeTarget={activeTarget}
          onSelect={(target) => {
            if (activeTarget === target && (target !== "book" || isBookDossierOpen)) {
              handleCloseCurrentTarget();
            } else {
              setActiveTarget(target);
              if (target === "book") {
                setIsBookDossierOpen(false);
              }
            }
          }}
        />
      </div>

      {/* ── 5. In-Room Interactive Experiences ── */}
      {/* Interactive Music Cassette Deck Spotlight Overlay */}
      <MusicSpotlightOverlay
        isOpen={activeTarget === "music"}
        isPlaying={isPlayingAudio}
        onTogglePlay={handleToggleAudio}
        onClose={handleCloseCurrentTarget}
      />
    </section>
  );
}
