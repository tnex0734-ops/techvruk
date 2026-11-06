"use client";

import React from "react";
import { RoundedBox } from "@react-three/drei";
import { ROOM_DIMENSIONS } from "../roomDimensions";
import { RoomMaterials } from "../RoomMaterials";

interface DeskProps {
  materials: RoomMaterials;
}

/**
 * High-Fidelity Minimalist Designer Desk
 * 
 * Features:
 * - Solid Scandinavian birch desktop with rounded 5mm perimeter bevel.
 * - Industrial matte black powder-coated steel square-tube leg trestles.
 * - Precision brushed silver leveling feet.
 * - Rear structural stretcher bar and flush black cable grommet.
 * - High-contrast charcoal desk pad with rounded corners and matte leatherette surface.
 */
export function Desk({ materials }: DeskProps) {
  const d = ROOM_DIMENSIONS.desk;
  const legThickness = 0.04;
  const legHeight = d.height - d.topThickness;

  return (
    <group position={d.position} name="desk-module">
      {/* ── 1. Solid Birch Desktop with Bevelled Edges ── */}
      <RoundedBox
        args={[d.width, d.topThickness, d.depth]}
        radius={0.006}
        smoothness={4}
        material={materials.woodLight}
        position={[0, 0, 0]}
      />

      {/* ── 2. Flush Cable Grommet Port (Rear Right) ── */}
      <group position={[d.width / 2 - 0.22, d.topThickness / 2 + 0.0005, -d.depth / 2 + 0.12]}>
        {/* Grommet Outer Ring */}
        <mesh material={materials.metalDark}>
          <cylinderGeometry args={[0.035, 0.035, 0.002, 24]} />
        </mesh>
        {/* Inner Passage Well */}
        <mesh position={[0, -0.001, 0]} material={materials.metalDark}>
          <cylinderGeometry args={[0.024, 0.024, 0.004, 24]} />
        </mesh>
      </group>

      {/* ── 3. Matte Steel Leg Trestles ── */}
      {/* Left Leg Assembly */}
      <group position={[-d.width / 2 + 0.08, -legHeight / 2 - d.topThickness / 2, 0]}>
        {/* Front Upright Tube */}
        <mesh position={[0, 0, d.depth / 2 - 0.08]} material={materials.metalDark}>
          <boxGeometry args={[legThickness, legHeight, legThickness]} />
        </mesh>
        {/* Rear Upright Tube */}
        <mesh position={[0, 0, -d.depth / 2 + 0.08]} material={materials.metalDark}>
          <boxGeometry args={[legThickness, legHeight, legThickness]} />
        </mesh>
        {/* Bottom Floor Rail */}
        <mesh position={[0, -legHeight / 2 + legThickness / 2, 0]} material={materials.metalDark}>
          <boxGeometry args={[legThickness, legThickness, d.depth - 0.12]} />
        </mesh>
        {/* Top Mounting Rail */}
        <mesh position={[0, legHeight / 2 - legThickness / 2, 0]} material={materials.metalDark}>
          <boxGeometry args={[legThickness, legThickness, d.depth - 0.12]} />
        </mesh>
        {/* Leveling Feet (Brushed Silver) */}
        <mesh position={[0, -legHeight / 2 - 0.006, d.depth / 2 - 0.08]} material={materials.metalSilver}>
          <cylinderGeometry args={[0.016, 0.018, 0.012, 16]} />
        </mesh>
        <mesh position={[0, -legHeight / 2 - 0.006, -d.depth / 2 + 0.08]} material={materials.metalSilver}>
          <cylinderGeometry args={[0.016, 0.018, 0.012, 16]} />
        </mesh>
      </group>

      {/* Right Leg Assembly */}
      <group position={[d.width / 2 - 0.08, -legHeight / 2 - d.topThickness / 2, 0]}>
        {/* Front Upright Tube */}
        <mesh position={[0, 0, d.depth / 2 - 0.08]} material={materials.metalDark}>
          <boxGeometry args={[legThickness, legHeight, legThickness]} />
        </mesh>
        {/* Rear Upright Tube */}
        <mesh position={[0, 0, -d.depth / 2 + 0.08]} material={materials.metalDark}>
          <boxGeometry args={[legThickness, legHeight, legThickness]} />
        </mesh>
        {/* Bottom Floor Rail */}
        <mesh position={[0, -legHeight / 2 + legThickness / 2, 0]} material={materials.metalDark}>
          <boxGeometry args={[legThickness, legThickness, d.depth - 0.12]} />
        </mesh>
        {/* Top Mounting Rail */}
        <mesh position={[0, legHeight / 2 - legThickness / 2, 0]} material={materials.metalDark}>
          <boxGeometry args={[legThickness, legThickness, d.depth - 0.12]} />
        </mesh>
        {/* Leveling Feet (Brushed Silver) */}
        <mesh position={[0, -legHeight / 2 - 0.006, d.depth / 2 - 0.08]} material={materials.metalSilver}>
          <cylinderGeometry args={[0.016, 0.018, 0.012, 16]} />
        </mesh>
        <mesh position={[0, -legHeight / 2 - 0.006, -d.depth / 2 + 0.08]} material={materials.metalSilver}>
          <cylinderGeometry args={[0.016, 0.018, 0.012, 16]} />
        </mesh>
      </group>

      {/* ── 4. Rear Structural Stretcher Bar ── */}
      <mesh
        position={[0, -0.16, -d.depth / 2 + 0.08]}
        material={materials.metalDark}
      >
        <boxGeometry args={[d.width - 0.20, 0.03, 0.03]} />
      </mesh>

      {/* ── 5. High-Contrast Charcoal Desk Pad ── */}
      <group position={[0, d.topThickness / 2 + 0.0015, 0.04]} name="desk-pad">
        <RoundedBox
          args={[0.94, 0.003, 0.48]}
          radius={0.012}
          smoothness={4}
          material={materials.deskMat}
        />
        {/* Perimeter Edge Stitching Inset Groove */}
        <mesh position={[0, 0.002, 0]} material={materials.metalDark}>
          <boxGeometry args={[0.92, 0.0005, 0.46]} />
        </mesh>
      </group>
    </group>
  );
}

