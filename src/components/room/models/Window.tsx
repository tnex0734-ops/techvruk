"use client";

import React from "react";
import { RoundedBox } from "@react-three/drei";
import { ROOM_DIMENSIONS } from "../roomDimensions";
import { RoomMaterials } from "../RoomMaterials";

interface WindowProps {
  materials: RoomMaterials;
}

/**
 * High-Fidelity Architectural 4-Pane Window
 * 
 * Features:
 * - Full 4-sided bevelled architectural casing / architrave with 16cm jamb depth.
 * - Precision sash frame and extruded cross mullions dividing into 4 architectural panes.
 * - Deep Scandinavian birch window sill shelf with bullnose front edge.
 * - Double-glazed physical glass pane with realistic transmission and sky reflection.
 * - Exterior daylight aperture backdrop that illuminates the window as a natural opening to the outside.
 */
export function Window({ materials }: WindowProps) {
  const d = ROOM_DIMENSIONS.window;

  return (
    <group
      position={d.position}
      rotation={[0, -Math.PI / 2, 0]}
      name="architectural-window-module"
    >
      {/* ── 1. Exterior Soft Daylight Sky Aperture ── */}
      {/* Positioned just outside the glass plane (exterior +Z relative to window group) */}
      <mesh position={[0, 0, -0.08]} material={materials.daylightBackdrop}>
        <planeGeometry args={[d.width + 0.35, d.height + 0.35]} />
      </mesh>

      {/* ── 2. Outer Architectural Wall Casing Frame (16cm Depth) ── */}
      {/* Top Header Casing */}
      <mesh position={[0, d.height / 2 - 0.035, 0]} material={materials.windowFrame}>
        <boxGeometry args={[d.width, 0.07, 0.16]} />
      </mesh>
      {/* Bottom Sill Sub-Base */}
      <mesh position={[0, -d.height / 2 + 0.035, 0]} material={materials.windowFrame}>
        <boxGeometry args={[d.width, 0.07, 0.16]} />
      </mesh>
      {/* Left Jamb */}
      <mesh position={[-d.width / 2 + 0.035, 0, 0]} material={materials.windowFrame}>
        <boxGeometry args={[0.07, d.height - 0.14, 0.16]} />
      </mesh>
      {/* Right Jamb */}
      <mesh position={[d.width / 2 - 0.035, 0, 0]} material={materials.windowFrame}>
        <boxGeometry args={[0.07, d.height - 0.14, 0.16]} />
      </mesh>

      {/* ── 3. Inner Window Sash Frame with Bevel ── */}
      <group position={[0, 0, 0.015]} name="window-sash">
        {/* Top Sash */}
        <mesh position={[0, d.height / 2 - 0.09, 0]} material={materials.windowFrame}>
          <boxGeometry args={[d.width - 0.14, 0.045, 0.06]} />
        </mesh>
        {/* Bottom Sash */}
        <mesh position={[0, -d.height / 2 + 0.09, 0]} material={materials.windowFrame}>
          <boxGeometry args={[d.width - 0.14, 0.045, 0.06]} />
        </mesh>
        {/* Left Sash */}
        <mesh position={[-d.width / 2 + 0.09, 0, 0]} material={materials.windowFrame}>
          <boxGeometry args={[0.045, d.height - 0.22, 0.06]} />
        </mesh>
        {/* Right Sash */}
        <mesh position={[d.width / 2 - 0.09, 0, 0]} material={materials.windowFrame}>
          <boxGeometry args={[0.045, d.height - 0.22, 0.06]} />
        </mesh>

        {/* ── 4. Architectural Cross Mullions (4-Pane Pattern) ── */}
        {/* Horizontal Transom Mullion */}
        <RoundedBox
          args={[d.width - 0.18, 0.042, 0.05]}
          radius={0.003}
          smoothness={2}
          material={materials.windowFrame}
          position={[0, 0.10, 0.005]}
        />
        {/* Vertical Central Mullion */}
        <RoundedBox
          args={[0.042, d.height - 0.22, 0.05]}
          radius={0.003}
          smoothness={2}
          material={materials.windowFrame}
          position={[0, 0, 0.005]}
        />

        {/* ── 5. Double-Glazed Glass Pane (Sky Tint & Reflection) ── */}
        <mesh position={[0, 0, -0.005]} material={materials.glass}>
          <boxGeometry args={[d.width - 0.18, d.height - 0.22, 0.016]} />
        </mesh>
      </group>

      {/* ── 6. Deep Scandinavian Birch Interior Window Sill Shelf ── */}
      <group position={[0, -d.height / 2 - 0.02, 0.12]} name="interior-sill">
        <RoundedBox
          args={[d.width + 0.16, 0.038, 0.24]}
          radius={0.006}
          smoothness={3}
          material={materials.woodLight}
        />
        {/* Bottom Sill Apron Trim */}
        <mesh position={[0, -0.03, -0.02]} material={materials.woodTrim}>
          <boxGeometry args={[d.width + 0.10, 0.024, 0.02]} />
        </mesh>
      </group>
    </group>
  );
}

