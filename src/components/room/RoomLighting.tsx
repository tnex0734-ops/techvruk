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
      {/* ── 1. Soft Ambient Hemispheric Fill (Sky/Ground Architectural Bounce) ── */}
      <hemisphereLight
        color="#F5F8FC"
        groundColor="#ECE6DE"
        intensity={1.15}
      />

      {/* ── 2. Primary Natural Daylight (Entering through the Right Window) ── */}
      <directionalLight
        position={[5.5, 4.0, -0.65]}
        intensity={2.3}
        color="#FFF9F2"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={0.5}
        shadow-camera-far={14}
        shadow-camera-left={-4.5}
        shadow-camera-right={4.5}
        shadow-camera-top={3.8}
        shadow-camera-bottom={-2.2}
        shadow-bias={-0.00015}
      />

      {/* ── 3. Soft Window Aperture Rim Bounce ── */}
      <directionalLight
        position={[4.0, 2.4, 0.6]}
        intensity={0.55}
        color="#F0F5FA"
        castShadow={false}
      />

      {/* ── 4. Front Fill (Illuminates Open Front Cutaway & Architecture) ── */}
      <directionalLight
        position={[1.8, 4.2, 5.5]}
        intensity={0.45}
        color="#F4F6FA"
        castShadow={false}
      />

      {/* ── 5. Workstation Soft Accent (Illuminates Laptop Screen, Keycaps & Art) ── */}
      <pointLight
        position={[-2.05, 1.65, -1.75]}
        intensity={0.60}
        color="#FFF5E8"
        distance={3.2}
        decay={2}
      />
    </group>
  );
}
