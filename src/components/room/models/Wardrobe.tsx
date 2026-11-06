"use client";

import React from "react";
import { RoundedBox } from "@react-three/drei";
import { ROOM_DIMENSIONS } from "../roomDimensions";
import { RoomMaterials } from "../RoomMaterials";

interface WardrobeProps {
  materials: RoomMaterials;
}

/**
 * High-Fidelity 3-Door Wardrobe (Storage / Experience Archive)
 * 
 * Features:
 * - Recessed plinth kickboard in contrasting darker wood tone.
 * - Solid carcass with side gables and top cornice capping.
 * - 3 individual doors with true 24mm thickness, 8mm shadow reveal seams, and bevelled perimeter edges.
 * - Minimalist extruded graphite door handles with mounting standoffs.
 * - Concealed hinge plate proxies on interior side edges.
 */
export function Wardrobe({ materials }: WardrobeProps) {
  const d = ROOM_DIMENSIONS.cupboard;
  const doorWidth = (d.length - 0.08) / 3; // ~1.04m per door
  const doorHeight = d.height - 0.16;     // ~2.29m tall
  const doorThickness = 0.024;

  const doorPositions = [-doorWidth - 0.008, 0, doorWidth + 0.008];

  return (
    <group position={d.position} name="wardrobe-module">
      {/* ── 1. Recessed Plinth Kickplate ── */}
      <mesh
        position={[0.03, -d.height / 2 + 0.045, 0]}
        material={materials.woodDark}
      >
        <boxGeometry args={[d.width - 0.06, 0.09, d.length - 0.04]} />
      </mesh>

      {/* ── 2. Main Cabinet Carcass ── */}
      {/* Left Gable (Outer Panel) */}
      <mesh
        position={[0, 0.045, -d.length / 2 + 0.015]}
        material={materials.woodLight}
      >
        <boxGeometry args={[d.width, d.height - 0.09, 0.03]} />
      </mesh>
      {/* Right Gable (Outer Panel) */}
      <mesh
        position={[0, 0.045, d.length / 2 - 0.015]}
        material={materials.woodLight}
      >
        <boxGeometry args={[d.width, d.height - 0.09, 0.03]} />
      </mesh>
      {/* Top Cornice Cap */}
      <mesh
        position={[0, d.height / 2 - 0.015, 0]}
        material={materials.woodTrim}
      >
        <boxGeometry args={[d.width + 0.02, 0.03, d.length + 0.02]} />
      </mesh>
      {/* Back Panel */}
      <mesh
        position={[-d.width / 2 + 0.01, 0.045, 0]}
        material={materials.woodTrim}
      >
        <boxGeometry args={[0.02, d.height - 0.09, d.length - 0.06]} />
      </mesh>

      {/* ── 3. Three Individual Bevelled Door Panels ── */}
      {doorPositions.map((zOffset, idx) => (
        <group
          key={`wardrobe-door-${idx}`}
          position={[d.width / 2 - doorThickness / 2 + 0.01, 0.045, zOffset]}
          name={`door-leaf-${idx + 1}`}
        >
          {/* Main Door Leaf with Subtle Bevel */}
          <RoundedBox
            args={[doorThickness, doorHeight, doorWidth - 0.008]}
            radius={0.004}
            smoothness={4}
            material={materials.woodLight}
          />

          {/* Recessed Shaker Inset Accent Line */}
          <mesh
            position={[doorThickness / 2 + 0.001, 0, 0]}
            material={materials.woodTrim}
          >
            <boxGeometry args={[0.001, doorHeight - 0.20, doorWidth - 0.16]} />
          </mesh>

          {/* Extruded Architectural Handle (Matte Dark Graphite) */}
          <group position={[doorThickness / 2 + 0.016, 0, idx === 0 ? -doorWidth * 0.38 : (idx === 1 ? -doorWidth * 0.38 : doorWidth * 0.38)]}>
            {/* Top Standoff */}
            <mesh position={[-0.008, 0.20, 0]} material={materials.metalDark}>
              <boxGeometry args={[0.016, 0.012, 0.012]} />
            </mesh>
            {/* Bottom Standoff */}
            <mesh position={[-0.008, -0.20, 0]} material={materials.metalDark}>
              <boxGeometry args={[0.016, 0.012, 0.012]} />
            </mesh>
            {/* Vertical Grip Bar with Bevel */}
            <RoundedBox
              args={[0.012, 0.48, 0.016]}
              radius={0.002}
              smoothness={2}
              material={materials.metalDark}
            />
          </group>

          {/* Hinge Proxies (Interior Corner) */}
          <mesh position={[-doorThickness / 2 - 0.005, doorHeight * 0.40, idx === 2 ? -doorWidth * 0.45 : doorWidth * 0.45]} material={materials.metalDark}>
            <cylinderGeometry args={[0.006, 0.006, 0.04, 8]} />
          </mesh>
          <mesh position={[-doorThickness / 2 - 0.005, -doorHeight * 0.40, idx === 2 ? -doorWidth * 0.45 : doorWidth * 0.45]} material={materials.metalDark}>
            <cylinderGeometry args={[0.006, 0.006, 0.04, 8]} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

