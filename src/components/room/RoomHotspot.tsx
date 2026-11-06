"use client";

import React, { useState } from "react";
import { Html } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { RoomHotspotData, RoomInteractionTarget } from "./roomInteractionTypes";

interface RoomHotspotProps {
  hotspot: RoomHotspotData;
  activeTarget: RoomInteractionTarget;
  onSelect: (target: "laptop" | "wardrobe" | "door") => void;
}

export function RoomHotspot({
  hotspot,
  activeTarget,
  onSelect,
}: RoomHotspotProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { invalidate } = useThree();
  const isSelected = activeTarget === hotspot.id;

  return (
    <group position={hotspot.position} name={`hotspot-${hotspot.id}`}>
      {/* ── 1. 3D Anchoring Ring Marker ── */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.05, 0]}
      >
        <ringGeometry args={[0.04, 0.055, 32]} />
        <meshBasicMaterial
          color={isSelected ? "#E52424" : isHovered ? "#E52424" : "#BAA791"}
          transparent
          opacity={isSelected ? 0.9 : isHovered ? 0.8 : 0.4}
        />
      </mesh>

      {/* ── 2. Interactive DOM Marker via Drei Html ── */}
      <Html
        center
        distanceFactor={7.5}
        zIndexRange={[40, 0]}
        className="pointer-events-auto select-none"
      >
        <button
          type="button"
          onClick={(e) => {
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
          className={`group flex items-center gap-1.5 px-2.5 py-1 rounded-full border transition-all duration-300 shadow-sm font-mono text-[10px] tracking-wider uppercase cursor-pointer backdrop-blur-md outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-red)] ${
            isSelected
              ? "bg-[var(--color-red)] border-[var(--color-red)] text-white shadow-md scale-105"
              : isHovered
              ? "bg-white border-[var(--color-red)] text-[var(--color-red)] scale-105 shadow-md"
              : "bg-white/90 border-[var(--color-border)] text-[var(--color-ink)] hover:border-[var(--color-red)]"
          }`}
        >
          {/* Animated Red Pulse Dot */}
          <span
            className={`w-1.5 h-1.5 rounded-full transition-colors ${
              isSelected ? "bg-white" : "bg-[var(--color-red)] animate-pulse"
            }`}
          />

          {/* Badge Label */}
          <span className="font-bold">{hotspot.badge}</span>

          {/* Tooltip detail on hover or selection */}
          <span
            className={`transition-all duration-200 overflow-hidden whitespace-nowrap text-[9px] ${
              isHovered || isSelected
                ? "max-w-[120px] opacity-100 pl-1 border-l border-current"
                : "max-w-0 opacity-0"
            }`}
          >
            {hotspot.title}
          </span>
        </button>
      </Html>
    </group>
  );
}
