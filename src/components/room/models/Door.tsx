"use client";

import React from "react";
import { RoundedBox } from "@react-three/drei";
import { ROOM_DIMENSIONS } from "../roomDimensions";
import { RoomMaterials } from "../RoomMaterials";

interface DoorProps {
  materials: RoomMaterials;
  isHovered?: boolean;
  isSelected?: boolean;
  onSelect?: () => void;
  onHover?: (hovered: boolean) => void;
}

/**
 * High-Fidelity Architectural Interior Wooden Door
 * 
 * Features:
 * - 3-sided architectural architrave casing with 16cm jamb depth and hardwood floor threshold.
 * - Solid Scandinavian oak door leaf with 45mm thickness and recessed architectural panel fields.
 * - Swung 18° ajar into the room on interior hinge line for immediate realism.
 * - Mortise butt hinges on jamb.
 * - Matte dark graphite lever handle with rectangular escutcheon backplate.
 * - Interactive pointer selection and hover feedback for Phase 3C.1.
 */
export function Door({
  materials,
  isHovered = false,
  isSelected = false,
  onSelect,
  onHover,
}: DoorProps) {
  const d = ROOM_DIMENSIONS.door;
  const jambWidth = 0.065;
  const jambDepth = 0.16;
  const leafWidth = d.width - 0.08;   // ~0.82m
  const leafHeight = d.height - 0.06; // ~2.09m
  const leafThickness = 0.045;

  return (
    <group
      position={d.position}
      rotation={[0, -Math.PI / 2, 0]}
      name="architectural-door-module"
      onClick={(e) => {
        if (onSelect) {
          e.stopPropagation();
          onSelect();
        }
      }}
      onPointerOver={(e) => {
        if (onHover) {
          e.stopPropagation();
          document.body.style.cursor = "pointer";
          onHover(true);
        }
      }}
      onPointerOut={() => {
        if (onHover) {
          document.body.style.cursor = "auto";
          onHover(false);
        }
      }}
    >
      {/* Invisible Generous Touch / Click Hitbox */}
      <mesh position={[0, 0, 0]} visible={false}>
        <boxGeometry args={[d.width + 0.15, d.height, jambDepth + 0.35]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
      {/* ── 1. Three-Sided Architectural Frame / Architrave ── */}
      {/* Left Jamb (Hinge Side) */}
      <mesh
        position={[-d.width / 2 + jambWidth / 2, 0, 0]}
        material={materials.doorFrame}
      >
        <boxGeometry args={[jambWidth, d.height, jambDepth]} />
      </mesh>
      {/* Right Jamb (Latch Side) */}
      <mesh
        position={[d.width / 2 - jambWidth / 2, 0, 0]}
        material={materials.doorFrame}
      >
        <boxGeometry args={[jambWidth, d.height, jambDepth]} />
      </mesh>
      {/* Header Architrave */}
      <mesh
        position={[0, d.height / 2 - jambWidth / 2, 0]}
        material={materials.doorFrame}
      >
        <boxGeometry args={[d.width, jambWidth, jambDepth]} />
      </mesh>
      {/* Hardwood Floor Threshold Strip */}
      <mesh
        position={[0, -d.height / 2 + 0.012, 0]}
        material={materials.woodTrim}
      >
        <boxGeometry args={[d.width, 0.024, jambDepth + 0.04]} />
      </mesh>

      {/* ── 2. Mortise Butt Hinges ── */}
      {[0.45, -0.45].map((yNorm, idx) => (
        <group
          key={`door-hinge-${idx}`}
          position={[-d.width / 2 + jambWidth, yNorm * leafHeight, 0.02]}
        >
          {/* Hinge Pin Barrel */}
          <mesh material={materials.metalDark}>
            <cylinderGeometry args={[0.007, 0.007, 0.08, 12]} />
          </mesh>
          {/* Frame Leaf */}
          <mesh position={[-0.01, 0, 0]} material={materials.metalDark}>
            <boxGeometry args={[0.018, 0.06, 0.003]} />
          </mesh>
        </group>
      ))}

      {/* ── 3. Oak Door Leaf — Swung 18° Ajar into Room ── */}
      <group
        position={[-d.width / 2 + jambWidth, 0, 0.02]}
        rotation={[0, 0.314, 0]} // 18 degrees ajar
        name="door-leaf-assembly"
      >
        {/* Main Solid Oak Door Slab */}
        <RoundedBox
          args={[leafWidth, leafHeight, leafThickness]}
          radius={0.004}
          smoothness={3}
          material={materials.doorPanel}
          position={[leafWidth / 2, 0, 0]}
        />

        {/* Architectural Recessed Field Panels */}
        {/* Upper Panel */}
        <group position={[leafWidth / 2, 0.38, 0]}>
          <mesh position={[0, 0, leafThickness / 2 + 0.0005]} material={materials.woodTrim}>
            <boxGeometry args={[leafWidth - 0.22, 0.82, 0.002]} />
          </mesh>
          <mesh position={[0, 0, -leafThickness / 2 - 0.0005]} material={materials.woodTrim}>
            <boxGeometry args={[leafWidth - 0.22, 0.82, 0.002]} />
          </mesh>
        </group>
        {/* Lower Panel */}
        <group position={[leafWidth / 2, -0.44, 0]}>
          <mesh position={[0, 0, leafThickness / 2 + 0.0005]} material={materials.woodTrim}>
            <boxGeometry args={[leafWidth - 0.22, 0.62, 0.002]} />
          </mesh>
          <mesh position={[0, 0, -leafThickness / 2 - 0.0005]} material={materials.woodTrim}>
            <boxGeometry args={[leafWidth - 0.22, 0.62, 0.002]} />
          </mesh>
        </group>

        {/* ── 4. Architectural Lever Handle & Escutcheon Hardware ── */}
        {/* Interior Side (Facing into Room) */}
        <group position={[leafWidth - 0.08, 0, leafThickness / 2 + 0.004]}>
          {/* Rectangular Escutcheon Backplate */}
          <RoundedBox
            args={[0.042, 0.18, 0.006]}
            radius={0.003}
            smoothness={2}
            material={materials.metalDark}
            position={[0, 0, 0]}
          />
          {/* Keyhole Slot Proxy */}
          <mesh position={[0, -0.045, 0.0035]} material={materials.metalSilver}>
            <boxGeometry args={[0.006, 0.016, 0.001]} />
          </mesh>
          {/* Handle Shank Standoff */}
          <mesh position={[0, 0.035, 0.018]} rotation={[Math.PI / 2, 0, 0]} material={materials.metalDark}>
            <cylinderGeometry args={[0.009, 0.009, 0.03, 16]} />
          </mesh>
          {/* Ergonomic Horizontal Lever */}
          <RoundedBox
            args={[0.115, 0.018, 0.014]}
            radius={0.004}
            smoothness={3}
            material={materials.metalDark}
            position={[-0.04, 0.035, 0.032]}
          />
        </group>

        {/* Exterior Side (Facing into Hallway) */}
        <group position={[leafWidth - 0.08, 0, -leafThickness / 2 - 0.004]}>
          <RoundedBox
            args={[0.042, 0.18, 0.006]}
            radius={0.003}
            smoothness={2}
            material={materials.metalDark}
            position={[0, 0, 0]}
          />
          <mesh position={[0, 0.035, -0.018]} rotation={[Math.PI / 2, 0, 0]} material={materials.metalDark}>
            <cylinderGeometry args={[0.009, 0.009, 0.03, 16]} />
          </mesh>
          <RoundedBox
            args={[0.115, 0.018, 0.014]}
            radius={0.004}
            smoothness={3}
            material={materials.metalDark}
            position={[-0.04, 0.035, -0.032]}
          />
        </group>

      </group>
    </group>
  );
}

