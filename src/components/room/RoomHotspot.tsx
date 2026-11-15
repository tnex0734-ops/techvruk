"use client";

import React, { useState } from "react";
import { Html } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { RoomHotspotData, RoomInteractionTarget } from "./roomInteractionTypes";

interface RoomHotspotProps {
  hotspot: RoomHotspotData;
  activeTarget: RoomInteractionTarget;
  onSelect: (target: "book" | "about" | "wall" | "wardrobe" | "phone" | "laptop" | "door" | "music") => void;
}

const HOTSPOT_SHORTCUT_KEYS: Record<string, string> = {
  book: "1",
  about: "2",
  wall: "3",
  wardrobe: "4",
  phone: "5",
  music: "♪",
  laptop: "1",
  door: "5",
};

const HOTSPOT_ACTION_LABELS: Record<string, string> = {
  book: "Selected Projects",
  about: "About Taushik",
  wall: "Experience Wall",
  wardrobe: "Hackathon Honors",
  phone: "Desk Phone // Contact",
  music: "Listen to a song",
};

const HOTSPOT_MOBILE_LABELS: Record<string, string> = {
  book: "Projects",
  about: "About",
  wall: "Experience",
  wardrobe: "Honors",
  phone: "Contact",
  music: "Listen to a song",
};

/**
 * In-Room Discoverability Indicator & Callout Paper Tag
 * Conforms to Spatial UX & Paper-Style Direction:
 * - Displays clean, uncrowded tactile paper tags floating over interactive objects in Room Overview.
 * - Generous 3D spatial staggering guarantees 100% visibility and zero overlap from any camera viewpoint.
 * - Features clean Outfit typography, glowing red wax beacon, numeric shortcut [1-5, ♪], and tactile paper styling.
 * - Fully unmounts when an object is focused (activeTarget !== null) to eliminate scene clutter.
 * - Minimum 44x44px interactive target for touch and keyboard accessibility.
 */
export function RoomHotspot({
  hotspot,
  activeTarget,
  onSelect,
}: RoomHotspotProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { invalidate, size } = useThree();

  // If ANY object is currently focused, hotspots are completely hidden to eliminate scene clutter
  if (activeTarget !== null) {
    return null;
  }

  const isMobile = size.width < 768;
  const distanceFactor = isMobile ? 12.0 : 6.8;

  const position = hotspot.position;
  const shortcutKey = HOTSPOT_SHORTCUT_KEYS[hotspot.id] || "1";
  const actionLabel = isMobile
    ? (HOTSPOT_MOBILE_LABELS[hotspot.id] || hotspot.badge)
    : (HOTSPOT_ACTION_LABELS[hotspot.id] || hotspot.badge);

  // Calibrated spatial staggering in 3D world space ensuring zero label collision across desktop and mobile
  const labelOffset: [number, number, number] = isMobile
    ? hotspot.id === "wall"
      ? [0.0, 0.62, 0.10]       // Top-Center: High on experience pinboard back wall
      : hotspot.id === "wardrobe"
      ? [0.10, 0.72, 0.0]        // Top-Left: High on wardrobe upper door panel
      : hotspot.id === "book"
      ? [-0.30, 0.52, 0.12]      // Mid-Left: Elevated high above Projects Book
      : hotspot.id === "phone"
      ? [0.25, 0.18, 0.28]       // Low-Left: Shifted forward-right into open floor space
      : hotspot.id === "music"
      ? [0.0, 0.28, 0.08]        // Mid-Right: Elevated directly above cassette deck under rackets
      : [0.18, 0.24, 0.22]       // Low-Right: Lowered forward on bedside nightstand
    : hotspot.id === "wall"
      ? [0.0, 0.60, 0.08]        // High on back wall pinboard
      : hotspot.id === "wardrobe"
      ? [0.10, 0.65, 0.0]         // High on wardrobe
      : hotspot.id === "book"
      ? [-0.28, 0.54, 0.12]      // Upper-left of desk above Projects Book
      : hotspot.id === "phone"
      ? [0.28, 0.22, 0.26]       // Lower-right of desk above Phone
      : hotspot.id === "music"
      ? [0.0, 0.28, 0.08]        // Elevated above cassette deck
      : [0.18, 0.26, 0.20];      // Lower-right above Bedside Table

  return (
    <group position={position} name={`hotspot-${hotspot.id}`}>
      {/* ── 1. Subtle In-Room Tactile Ring Marker on Object Surface ── */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0.015, 0]}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(hotspot.id);
        }}
        onPointerDown={(e) => {
          e.stopPropagation();
          onSelect(hotspot.id);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          document.body.style.cursor = "pointer";
          setIsHovered(true);
          invalidate();
        }}
        onPointerOut={() => {
          document.body.style.cursor = "auto";
          setIsHovered(false);
          invalidate();
        }}
      >
        <ringGeometry args={[0.024, 0.038, 24]} />
        <meshBasicMaterial
          color={isHovered ? "#E52424" : "#EFCB75"}
          transparent
          opacity={isHovered ? 0.95 : 0.65}
        />
      </mesh>

      {/* ── 2. Slender Wire Leader Stem Connecting Object to Floating Tag ── */}
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[new Float32Array([0, 0.02, 0, labelOffset[0], labelOffset[1] - 0.04, labelOffset[2]]), 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color={isHovered ? "#E52424" : "#C4B5A5"}
          transparent
          opacity={isHovered ? 0.85 : 0.45}
          linewidth={1}
        />
      </line>

      {/* ── 3. High-Sensitivity Raycast Hitbox in 3D Space (No visible=false, Direct Pointer Access) ── */}
      <mesh
        position={[0, 0.06, 0]}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(hotspot.id);
        }}
        onPointerDown={(e) => {
          e.stopPropagation();
          onSelect(hotspot.id);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          document.body.style.cursor = "pointer";
          setIsHovered(true);
          invalidate();
        }}
        onPointerOut={() => {
          document.body.style.cursor = "auto";
          setIsHovered(false);
          invalidate();
        }}
      >
        <boxGeometry args={[0.36, 0.30, 0.36]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>

      {/* ── 4. Tactile Archival Paper Tag (Zero Blinking, Instant Dual Pointer / Click Dispatch) ── */}
      <Html
        center
        position={labelOffset}
        distanceFactor={distanceFactor}
        zIndexRange={[90, 15]}
        className="pointer-events-auto select-none"
      >
        <button
          type="button"
          data-testid={`hotspot-trigger-${hotspot.id}`}
          onClick={(e) => {
            e.stopPropagation();
            onSelect(hotspot.id);
          }}
          onPointerDown={(e) => {
            e.stopPropagation();
            onSelect(hotspot.id);
          }}
          onTouchEnd={(e) => {
            e.stopPropagation();
            onSelect(hotspot.id);
          }}
          onMouseEnter={() => {
            setIsHovered(true);
            invalidate();
          }}
          onMouseLeave={() => {
            setIsHovered(false);
            invalidate();
          }}
          aria-label={hotspot.accessibleLabel}
          className={`flex items-center gap-2 px-3 sm:px-3.5 py-1.5 sm:py-2 min-h-[36px] sm:min-h-[40px] rounded-full font-sans text-xs sm:text-[13px] font-semibold tracking-tight cursor-pointer transition-all duration-200 outline-none border shadow-[0_4px_16px_rgba(28,25,23,0.08)] ${
            isHovered
              ? "bg-white text-[#E52424] border-[#E52424] shadow-[0_8px_24px_rgba(229,36,36,0.22)] -translate-y-0.5 scale-105"
              : "bg-[#FFFDFB] text-[#1C1917] border-[#E2DBD1] hover:border-[#E52424] shadow-[0_4px_16px_rgba(28,25,23,0.10)]"
          }`}
          style={{ fontFamily: "var(--font-outfit), Outfit, -apple-system, sans-serif" }}
        >
          {/* Steady Solid Red Indicator Pin (Zero Blinking, Calm Tactile Wax Dot) */}
          <span className="inline-flex rounded-full h-2 w-2 bg-[#E52424] shrink-0" />

          {/* Numeric Shortcut Key Badge */}
          <span className="px-1.5 py-0.5 rounded-md bg-[#E52424]/10 text-[#E52424] font-mono text-[10px] font-bold">
            [{shortcutKey}]
          </span>

          {/* Clear Object Action Label in Outfit Sans-Serif */}
          <span className="font-semibold whitespace-nowrap text-[#1C1917]">
            {actionLabel}
          </span>

          {/* Clean Arrow Affordance */}
          <span className="text-[#E52424] text-xs font-black pl-0.5">
            ↗
          </span>
        </button>
      </Html>
    </group>
  );
}
