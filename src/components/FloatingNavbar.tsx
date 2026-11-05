"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Play, Pause, Menu, X, Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface NavItem {
  label: string;
  href: string;
  isDownload?: boolean;
}

const defaultNavItems: NavItem[] = [
  { label: "Work", href: "#products" },
  { label: "Playground", href: "#tools" },
  { label: "About", href: "#about" },
  { label: "Resume", href: "/Taushik_ux_resume.pdf", isDownload: true },
];

export function FloatingNavbar() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const navContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // ADR-008: Audio retained with preload="none" to prevent eager 9.2MB bandwidth consumption
    const audio = new Audio("/audio/fitoor.mp3");
    audio.preload = "none";
    audio.loop = true;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);
    const handleError = (e: Event) => {
      console.warn("Audio load error:", e);
      setIsPlaying(false);
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

  // Handle escape key to close mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMobileMenuOpen]);

  // Handle click outside to close mobile menu
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        isMobileMenuOpen &&
        navContainerRef.current &&
        !navContainerRef.current.contains(e.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileMenuOpen]);

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.warn("Audio play prevented:", err);
          setIsPlaying(false);
        });
    }
  };

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const targetId = href.replace("#", "");
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header className="fixed inset-x-0 top-3 sm:top-5 z-50 flex justify-center px-3 sm:px-6 pointer-events-none select-none">
      <div
        ref={navContainerRef}
        className="pointer-events-auto flex flex-col items-center w-full max-w-fit mx-auto"
      >
        {/* Main Floating Pill */}
        <div className="flex items-center justify-between gap-2.5 sm:gap-6 rounded-full bg-white/95 backdrop-blur-md border border-[var(--color-border)] px-3 py-1.5 sm:px-4 sm:py-2 shadow-[0_4px_24px_rgba(23,21,21,0.06)] transition-all duration-300 w-full">

          {/* LEFT: Mascot Avatar & Wordmark */}
          <a
            href="#hero"
            onClick={(e) => scrollToSection(e, "#hero")}
            className="flex items-center gap-2 group transition-transform duration-200 hover:scale-[1.02] shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-red)] focus-visible:ring-offset-2 rounded-full"
            aria-label="Taushik Home"
          >
            {/* Avatar with subtle red tinted ring */}
            <div className="relative flex items-center justify-center p-0.5">
              <div className="absolute inset-0 bg-[var(--color-red-light)] rounded-full scale-105 transition-transform duration-300 group-hover:scale-110" />
              <div className="relative w-7 h-7 sm:w-9 sm:h-9 rounded-full overflow-hidden border border-[var(--color-border)] bg-white shadow-xs">
                <Image
                  src="/mascot_avatar.png"
                  alt="Taushik Mascot"
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  sizes="36px"
                  priority
                />
              </div>
            </div>

            {/* Logo Wordmark */}
            <span className="font-extrabold text-sm sm:text-base tracking-tight text-[var(--color-ink)] flex items-center">
              Taushik<span className="text-[var(--color-red)] font-black">.</span>
            </span>
          </a>

          {/* MIDDLE: Desktop Navigation Links (hidden on <sm) */}
          <nav className="hidden sm:flex items-center gap-1 sm:gap-1.5" aria-label="Main Navigation">
            {defaultNavItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                download={item.isDownload ? "Taushik_ux_resume.pdf" : undefined}
                target={item.isDownload ? "_blank" : undefined}
                rel={item.isDownload ? "noreferrer" : undefined}
                onClick={(e) => !item.isDownload && scrollToSection(e, item.href)}
                className="px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold text-[var(--color-muted)] hover:text-[var(--color-ink)] hover:bg-[var(--color-bg-subtle)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-red)] transition-all duration-150"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* RIGHT (Desktop): Full Audio Button + "Let's talk" CTA */}
          <div className="hidden sm:flex items-center gap-2">
            {/* Audio Toggle */}
            <button
              onClick={toggleAudio}
              type="button"
              className={`flex items-center gap-2 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-full border text-xs sm:text-sm font-bold transition-all duration-200 shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-red)] focus-visible:ring-offset-2 ${
                isPlaying
                  ? "bg-[var(--color-red)] border-[var(--color-red)] text-white shadow-sm shadow-[var(--color-red)]/30 hover:bg-[var(--color-red-deep)] active:scale-95"
                  : "bg-[var(--color-bg-subtle)] border-[var(--color-border)] text-[var(--color-ink)] hover:border-[var(--color-red)] hover:bg-[var(--color-red-light)] active:scale-95 shadow-xs"
              }`}
              title={isPlaying ? "Stop 'Fitoor'" : "Play a song"}
              aria-label={isPlaying ? "Stop 'Fitoor'" : "Play a song"}
            >
              <div
                className={`grid h-4 w-4 sm:h-5 sm:w-5 place-items-center rounded-full transition-colors ${
                  isPlaying ? "bg-white text-[var(--color-red)]" : "bg-[var(--color-ink)] text-white"
                }`}
              >
                {isPlaying ? (
                  <Pause size={9} fill="currentColor" />
                ) : (
                  <Play size={9} className="ml-0.5" fill="currentColor" />
                )}
              </div>
              <span className="whitespace-nowrap tracking-tight font-medium">
                {isPlaying ? "Fitoor" : "Play a song"}
              </span>
              {isPlaying && (
                <div className="flex items-end gap-[1.5px] h-3 ml-0.5 shrink-0" aria-hidden="true">
                  <span className="w-[1.5px] h-full bg-white animate-[bounce_0.6s_ease-in-out_infinite_alternate]" />
                  <span className="w-[1.5px] h-2 bg-white animate-[bounce_0.4s_ease-in-out_infinite_alternate_0.2s]" />
                  <span className="w-[1.5px] h-full bg-white animate-[bounce_0.8s_ease-in-out_infinite_alternate_0.1s]" />
                </div>
              )}
            </button>

            {/* "Let's talk" CTA */}
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, "#contact")}
              className="flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[var(--color-ink)] hover:bg-[var(--color-red)] text-white text-xs sm:text-sm font-semibold tracking-tight transition-all duration-200 shadow-xs active:scale-95 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-red)] focus-visible:ring-offset-2"
              aria-label="Let's talk"
            >
              <span>Let&apos;s talk</span>
              <ArrowUpRight size={13} className="shrink-0" />
            </a>
          </div>

          {/* RIGHT (Mobile): Ultra-compact buttons (< sm) */}
          <div className="flex sm:hidden items-center gap-1.5">
            {/* Compact Audio Toggle Icon Button */}
            <button
              onClick={toggleAudio}
              type="button"
              className={`relative grid h-8 w-8 place-items-center rounded-full border transition-all duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-red)] ${
                isPlaying
                  ? "bg-[var(--color-red)] border-[var(--color-red)] text-white shadow-xs"
                  : "bg-[var(--color-bg-subtle)] border-[var(--color-border)] text-[var(--color-ink)] hover:border-[var(--color-red)]"
              }`}
              title={isPlaying ? "Stop audio" : "Play audio"}
              aria-label={isPlaying ? "Stop 'Fitoor'" : "Play a song"}
            >
              {isPlaying ? (
                <Pause size={12} fill="currentColor" />
              ) : (
                <Play size={12} className="ml-0.5" fill="currentColor" />
              )}
              {isPlaying && (
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[var(--color-red)] ring-2 ring-white animate-ping" />
              )}
            </button>

            {/* Compact Talk CTA */}
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, "#contact")}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-[var(--color-ink)] text-white text-xs font-semibold tracking-tight active:scale-95"
              aria-label="Contact"
            >
              <span>Talk</span>
              <ArrowUpRight size={11} />
            </a>

            {/* Mobile Menu Hamburger Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              type="button"
              className="grid h-8 w-8 place-items-center rounded-full border border-[var(--color-border)] bg-[var(--color-bg-subtle)] text-[var(--color-ink)] hover:text-[var(--color-red)] hover:border-[var(--color-red)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-red)] cursor-pointer"
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X size={15} /> : <Menu size={15} />}
            </button>
          </div>

        </div>

        {/* Accessible Mobile Dropdown Menu Drawer (< sm) */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="w-full mt-2 rounded-2xl bg-white/98 backdrop-blur-lg border border-[var(--color-border)] p-3 shadow-xl sm:hidden"
            >
              <nav className="flex flex-col gap-1" aria-label="Mobile Navigation">
                {defaultNavItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    download={item.isDownload ? "Taushik_ux_resume.pdf" : undefined}
                    target={item.isDownload ? "_blank" : undefined}
                    rel={item.isDownload ? "noreferrer" : undefined}
                    onClick={(e) => {
                      if (!item.isDownload) {
                        scrollToSection(e, item.href);
                      } else {
                        setIsMobileMenuOpen(false);
                      }
                    }}
                    className="flex items-center justify-between px-3.5 py-2 rounded-xl text-sm font-semibold text-[var(--color-ink)] hover:text-[var(--color-red)] hover:bg-[var(--color-red-light)] transition-colors"
                  >
                    <span>{item.label}</span>
                    {item.isDownload ? (
                      <Download size={14} className="text-[var(--color-muted)]" />
                    ) : (
                      <ArrowUpRight size={14} className="text-[var(--color-muted)]" />
                    )}
                  </a>
                ))}

                <div className="pt-2 mt-1 border-t border-[var(--color-border)] flex items-center justify-between px-2 text-xs text-[var(--color-muted)]">
                  <span>Audio: {isPlaying ? "Fitoor (Playing)" : "Paused"}</span>
                  <button
                    onClick={toggleAudio}
                    className="text-xs font-bold text-[var(--color-red)] underline underline-offset-2"
                  >
                    {isPlaying ? "Stop" : "Play"}
                  </button>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </header>
  );
}
