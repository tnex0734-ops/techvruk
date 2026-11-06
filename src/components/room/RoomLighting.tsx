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
        color="#F4F6F9"
        groundColor="#E5DFD7"
        intensity={0.95}
      />

      {/* ── 2. Primary Natural Daylight (Entering through the Right Window) ── */}
      <directionalLight
        position={[6.5, 4.2, -0.65]}
        intensity={2.1}
        color="#FFF6ED"
        castShadow={false}
      />

      {/* ── 3. Gentle Secondary Fill (Interior Soft Bounce) ── */}
      <directionalLight
        position={[-3.0, 3.5, 4.0]}
        intensity={0.45}
        color="#EAEFF5"
        castShadow={false}
      />

      {/* ── 4. Subtle Workstation Accent (Draws Eye to Laptop & Craft Zone) ── */}
      <pointLight
        position={[-2.05, 1.45, -1.80]}
        intensity={0.55}
        color="#FFEAD9"
        distance={3.2}
        decay={2}
      />
    </group>
  );
}
