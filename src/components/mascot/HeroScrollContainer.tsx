"use client";

import React, { useState, useEffect, useRef } from "react";
import { TaushikHero } from "@/components/hero/TaushikHero";
import { RoomHero } from "@/components/room/RoomHero";
import { RoomInteractionTarget } from "@/components/room/roomInteractionTypes";

export function HeroScrollContainer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollExitProgress, setScrollExitProgress] = useState<number>(0);
  const [isHeroActive, setIsHeroActive] = useState<boolean>(true);
  const [selectedTarget, setSelectedTarget] = useState<RoomInteractionTarget>(null);

  // Monitor vertical scroll position via Lenis smooth scrolling with native fallback
  useEffect(() => {
    let ticking = false;

    const updateProgress = (scrollY: number) => {
      if (!containerRef.current) return;
      const viewportH = window.innerHeight;
      
      // Total transition zone is 1.1 viewports
      const transitionZone = viewportH * 1.1;
      const normalized = Math.min(Math.max(scrollY / transitionZone, 0), 1.0);

      setScrollExitProgress(normalized);
      setIsHeroActive(normalized < 0.95);
    };

    // Attach to Lenis smooth scroll emitter if available
    let cleanupLenis: (() => void) | null = null;
    const lenis = (window as unknown as { __lenis?: { on: (event: string, cb: (e: { scroll: number }) => void) => () => void } }).__lenis;

    if (lenis && typeof lenis.on === "function") {
      cleanupLenis = lenis.on("scroll", ({ scroll }: { scroll: number }) => {
        updateProgress(scroll);
      });
    }

    const handleNativeScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateProgress(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleNativeScroll, { passive: true });
    updateProgress(window.scrollY);

    return () => {
      window.removeEventListener("scroll", handleNativeScroll);
      if (cleanupLenis) cleanupLenis();
    };
  }, []);

  // Jump directly to room when scroll affordance is clicked using Lenis smooth scroll
  const handleEnterRoom = () => {
    const targetY = window.innerHeight * 1.25;
    const lenis = (window as unknown as { __lenis?: { scrollTo: (target: number, opts?: { duration?: number }) => void } }).__lenis;
    if (lenis && typeof lenis.scrollTo === "function") {
      lenis.scrollTo(targetY, { duration: 1.1 });
    } else {
      window.scrollTo({
        top: targetY,
        behavior: "smooth",
      });
    }
  };

  // Navigate to specific in-room targets when clicked from hero navigation
  const handleNavigateToTarget = (target: "work" | "about" | "contact" | "journey") => {
    if (target === "work") {
      setSelectedTarget("book");
    } else if (target === "about") {
      setSelectedTarget("about");
    } else if (target === "contact") {
      setSelectedTarget("phone");
    } else if (target === "journey") {
      setSelectedTarget("wardrobe");
    }
    handleEnterRoom();
  };

  return (
    <div ref={containerRef} className="relative w-full min-h-[220vh] bg-[#FFFEFE]">
      {/* ── Fixed Room Scene Layer (Always Mounted, Always Interactive) ── */}
      <div
        className="fixed inset-0 w-full h-screen z-10"
        style={{
          pointerEvents: "auto",
        }}
      >
        <RoomHero
          externalTarget={selectedTarget}
          isHeroCovering={scrollExitProgress < 0.08}
        />
      </div>

      {/* ── Sticky Editorial Hero Overlay (Pins at top until dissolved) ── */}
      <div
        className="sticky top-0 w-full h-screen z-20 overflow-hidden"
        style={{
          // Interactive only when viewing the hero; releases pointer events immediately on scroll into room
          pointerEvents: scrollExitProgress >= 0.2 ? "none" : "auto",
          // Completely un-render from composite tree when scrolled away to eliminate CPU/compositing overhead
          visibility: scrollExitProgress >= 0.7 ? "hidden" : "visible",
        }}
      >
        <TaushikHero
          scrollExitProgress={scrollExitProgress}
          onEnterRoom={handleEnterRoom}
          onNavigateToTarget={handleNavigateToTarget}
          isHeroActive={isHeroActive && scrollExitProgress < 0.7}
        />
      </div>

      {/* ── Scroll Track Spacer to provide natural browser scroll distance ── */}
      <div className="relative w-full h-[120vh] pointer-events-none" />
    </div>
  );
}

