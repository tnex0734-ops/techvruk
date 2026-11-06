"use client";

import React from "react";

/**
 * Architectural Lighting Rig
 * 
 * - Key Light: Soft natural daylight entering from the right-wall window.
 * - Fill Light: Balanced hemispheric sky/floor ambient to prevent harsh shadows.
 * - Accent Light: Warm subtle glow focused on the corner laptop workstation.
 */

export function RoomLighting() {
  return (
    <group name="room-lighting">
      {/* ── 1. Soft Ambient Hemispheric Fill (Sky/Ground) ── */}
      <hemisphereLight
        color="#F8FAFC"
        groundColor="#EAE5DE"
        intensity={1.05}
      />

      {/* ── 2. Primary Natural Daylight (Entering through the Right Window) ── */}
      <directionalLight
        position={[6.0, 4.2, -0.65]}
        intensity={2.2}
        color="#FFF7EE"
        castShadow={false}
      />

      {/* ── 3. Front Fill (Illuminates Open Front Cutaway & Architectural Details) ── */}
      <directionalLight
        position={[2.0, 4.5, 6.0]}
        intensity={0.65}
        color="#F2F5FA"
        castShadow={false}
      />

      {/* ── 4. Workstation Spotlight (Accents Laptop Screen, Accessories & Quotes) ── */}
      <pointLight
        position={[-2.05, 1.55, -1.75]}
        intensity={0.75}
        color="#FFF3E6"
        distance={3.5}
        decay={2}
      />
    </group>
  );
}
