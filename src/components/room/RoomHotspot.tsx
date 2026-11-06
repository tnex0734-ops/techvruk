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
  const { size, invalidate } = useThree();
  const isSelected = activeTarget === hotspot.id;
  const isAnotherActive = activeTarget !== null && !isSelected;

  // Responsive hotspot positioning: Doorway anchor aligns directly with entrance door
  // on desktop/tablet while maintaining safe right-side padding on mobile.
  const position = React.useMemo((): [number, number, number] => {
    if (hotspot.id === "door") {
      if (size.width >= 1024) return [3.28, 2.05, 1.62]; // Direct doorway header on desktop
      if (size.width >= 768) return [3.05, 1.95, 1.48];  // Doorway opening on tablet
      return [2.76, 1.84, 1.20];                         // Safe margin on compact mobile
    }
    return hotspot.position;
  }, [hotspot.id, hotspot.position, size.width]);

  // If another object is selected, hide this hotspot to maintain focus
  if (isAnotherActive) {
    return null;
  }

  // When selected: Render ONLY a subtle, elegant 3D selection ring near the object
  // (No oversized HTML banners, no text duplication, no clipping against drawer)
  if (isSelected) {
    return (
      <group position={position} name={`hotspot-selected-${hotspot.id}`}>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]}>
          <ringGeometry args={[0.045, 0.065, 32]} />
          <meshBasicMaterial color="#E52424" transparent opacity={0.85} />
        </mesh>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.051, 0]}>
          <ringGeometry args={[0.065, 0.08, 32]} />
          <meshBasicMaterial color="#E52424" transparent opacity={0.25} />
        </mesh>
      </group>
    );
  }

  // Overview mode: Clean, prominent interactive pill above target object
  return (
    <group position={position} name={`hotspot-${hotspot.id}`}>
      {/* ── 1. 3D Anchoring Ring Marker ── */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.05, 0]}
      >
        <ringGeometry args={[0.04, 0.055, 32]} />
        <meshBasicMaterial
          color={isHovered ? "#E52424" : "#BAA791"}
          transparent
          opacity={isHovered ? 0.9 : 0.45}
        />
      </mesh>

      {/* ── 2. Interactive DOM Marker via Drei Html ── */}
      <Html
        center
        distanceFactor={7.0}
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
          className={`group flex items-center gap-1.5 px-3 py-1.5 rounded-full border-2 transition-all duration-200 shadow-md font-mono text-[11px] tracking-wider uppercase cursor-pointer backdrop-blur-md outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-red)] ${
            isHovered
              ? "bg-[var(--color-red)] border-[var(--color-red)] text-white scale-110 shadow-lg"
              : "bg-white border-[var(--color-red)] text-[var(--color-ink)] hover:border-[var(--color-red)] shadow-sm"
          }`}
        >
          {/* Animated Red Pulse Dot */}
          <span
            className={`w-2 h-2 rounded-full transition-colors ${
              isHovered ? "bg-white" : "bg-[var(--color-red)] animate-pulse"
            }`}
          />

          {/* Badge Label */}
          <span className="font-extrabold tracking-widest text-[var(--color-red)] group-hover:text-white">
            {hotspot.badge}
          </span>

          {/* Tooltip detail on hover */}
          <span
            className={`transition-all duration-200 overflow-hidden whitespace-nowrap text-[10px] font-semibold ${
              isHovered
                ? "max-w-[130px] opacity-100 pl-1.5 border-l border-white/60 text-white"
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
