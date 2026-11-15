"use client";

import React from "react";

/**
 * Architectural Lighting Rig (Phase 3B.2.1 Refined)
 * 
 * - Key Light: Soft, natural daylight entering through the right-wall window.
 *   Uses PCF soft shadow radius (2.8) to eliminate harsh, dark edges.
 * - Fill Light: Architectural hemispheric sky/floor ambient fill (1.38) lifting shadow density.
 * - Front Fill: Non-shadow directional light (0.58) illuminating open architectural cutaways.
 * - Window Rim Bounce: Cool atmospheric daylight rim dispersion.
 * - Workstation Accent: Clean, subtle warm task light accentuating the glowing MacBook display.
 */

export function RoomLighting() {
  return (
    <group name="room-lighting">
      {/* ── 1. Soft Ambient Hemispheric Fill (Sky/Ground Architectural Bounce) ── */}
      <hemisphereLight
        color="#F8FAFC"
        groundColor="#ECE5DC"
        intensity={1.38}
      />

      {/* ── 2. Primary Natural Daylight (Entering through the Right Window) ── */}
      <directionalLight
        position={[5.2, 4.2, -0.65]}
        intensity={1.90}
        color="#FFFBF5"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={0.5}
        shadow-camera-far={14}
        shadow-camera-left={-4.5}
        shadow-camera-right={4.5}
        shadow-camera-top={3.8}
        shadow-camera-bottom={-2.2}
        shadow-bias={-0.0002}
        shadow-radius={2.5}
      />

      {/* ── 3. Soft Window Aperture Rim Bounce ── */}
      <directionalLight
        position={[3.8, 2.2, 0.8]}
        intensity={0.45}
        color="#EFF4FA"
        castShadow={false}
      />

      {/* ── 4. Front Fill (Illuminates Open Front Cutaway & Architecture) ── */}
      <directionalLight
        position={[1.6, 4.0, 5.2]}
        intensity={0.58}
        color="#F5F7FA"
        castShadow={false}
      />

      {/* ── 5. Workstation Soft Accent (Illuminates Laptop Screen, Keycaps & Art) ── */}
      <pointLight
        position={[-2.05, 1.60, -1.75]}
        intensity={0.48}
        color="#FFF8F0"
        distance={3.2}
        decay={2}
      />
    </group>
  );
}
