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
        material={materials.woodOak || materials.woodLight}
        position={[0, 0, 0]}
        castShadow
        receiveShadow
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
      <group position={[-0.18, d.topThickness / 2 + 0.0015, 0.02]} name="desk-pad">
        <RoundedBox
          args={[1.20, 0.003, 0.52]}
          radius={0.012}
          smoothness={4}
          material={materials.deskMat}
        />
        {/* Perimeter Edge Stitching Inset Groove */}
        <mesh position={[0, 0.002, 0]} material={materials.metalDark}>
          <boxGeometry args={[1.18, 0.0005, 0.50]} />
        </mesh>
      </group>

      {/* ── 6. Fun Lived-in Designer Details & Tactile Props ── */}
      <group name="desk-fun-props">
        {/* Ceramic Coffee Mug (Right Desk Corner) */}
        <group position={[d.width / 2 - 0.14, d.topThickness / 2 + 0.042, -0.18]} name="coffee-mug">
          {/* Mug Body */}
          <mesh castShadow receiveShadow>
            <cylinderGeometry args={[0.038, 0.034, 0.084, 24]} />
            <meshStandardMaterial color="#FAF5EE" roughness={0.35} metalness={0.05} />
          </mesh>
          {/* Hot Espresso Surface */}
          <mesh position={[0, 0.036, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <circleGeometry args={[0.034, 24]} />
            <meshStandardMaterial color="#2B1810" roughness={0.2} />
          </mesh>
          {/* Mug Handle */}
          <mesh position={[0.042, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <torusGeometry args={[0.022, 0.005, 12, 24, Math.PI]} />
            <meshStandardMaterial color="#FAF5EE" roughness={0.35} />
          </mesh>
        </group>

        {/* Playful Pastel Sticky Notes (Front Right Corner) */}
        <group position={[d.width / 2 - 0.26, d.topThickness / 2 + 0.002, 0.22]} name="sticky-notes">
          {/* Yellow Note */}
          <mesh rotation={[-Math.PI / 2, 0, 0.16]} receiveShadow>
            <planeGeometry args={[0.075, 0.075]} />
            <meshStandardMaterial color="#FFF59D" roughness={0.9} />
          </mesh>
          {/* Coral / Peach Note (Layered atop) */}
          <mesh position={[0.018, 0.0008, 0.012]} rotation={[-Math.PI / 2, 0, -0.24]} receiveShadow>
            <planeGeometry args={[0.07, 0.07]} />
            <meshStandardMaterial color="#FFCCBC" roughness={0.9} />
          </mesh>
        </group>

        {/* Tactile Polaroid Photo Snapshot with Washi Tape (Front Left Corner) */}
        <group position={[-d.width / 2 + 0.16, d.topThickness / 2 + 0.002, 0.24]} rotation={[0, 0.12, 0]} name="polaroid-snapshot">
          {/* White Paper Photo Frame */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
            <planeGeometry args={[0.075, 0.09]} />
            <meshStandardMaterial color="#FFFDF9" roughness={0.85} />
          </mesh>
          {/* Photo Emulsion Area */}
          <mesh position={[0, 0.0004, -0.008]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[0.062, 0.062]} />
            <meshStandardMaterial color="#1E2738" roughness={0.4} />
          </mesh>
          {/* Washi Tape Strip at Top */}
          <mesh position={[0, 0.0008, -0.042]} rotation={[-Math.PI / 2, 0, -0.04]}>
            <planeGeometry args={[0.038, 0.014]} />
            <meshStandardMaterial color="#E8D8C4" transparent opacity={0.88} roughness={0.9} />
          </mesh>
        </group>

        {/* Minimalist Matte Black Drafting Stylus */}
        <group position={[d.width / 2 - 0.32, d.topThickness / 2 + 0.004, 0.12]} rotation={[0, 0.45, 0]}>
          <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.004, 0.004, 0.14, 16]} />
            <meshStandardMaterial color="#1E1E1E" roughness={0.4} metalness={0.2} />
          </mesh>
          {/* Brass Accent Ring */}
          <mesh position={[0.05, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.0042, 0.0042, 0.004, 16]} />
            <meshStandardMaterial color="#D4AF37" roughness={0.3} metalness={0.7} />
          </mesh>
        </group>
      </group>
    </group>
  );
}

