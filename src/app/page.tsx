"use client";

import { useEffect } from "react";
import { CustomCursor } from "@/components/CustomCursor";
import { WaterFillPreloader } from "@/components/WaterFillPreloader";
import { HeroScrollContainer } from "@/components/mascot/HeroScrollContainer";

/**
 * Taushik Chandana — Product Designer & Creative Developer Portfolio
 * Signature Editorial Experience:
 * 1. Fluid Liquid Preloader: Real-time harmonic wave filling, specular "TAUSHIK" reveal & veil curtain
 * 2. Workspace Diorama Hero: Ambient side gradients, architectural abstract geometric shapes, centered greeting & diorama
 * 3. Interactive 3D Bedroom Architecture: Physical in-room objects for projects, about, experience, awards, and contact
 */
export default function Home() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, []);

  return (
    <>
      <CustomCursor />
      <div className="grain" />
      <WaterFillPreloader />

      <main className="relative z-10 w-full min-h-screen bg-[var(--color-bg)]">
        <HeroScrollContainer />
      </main>
    </>
  );
}
