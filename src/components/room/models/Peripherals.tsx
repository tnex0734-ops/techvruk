"use client";

import React from "react";
import { RoundedBox } from "@react-three/drei";
import { ROOM_DIMENSIONS } from "../roomDimensions";
import { RoomMaterials } from "../RoomMaterials";

interface PeripheralsProps {
  materials: RoomMaterials;
}

/**
 * High-Fidelity Desktop Peripherals
 * 
 * - Low-profile wireless keyboard (Magic Keyboard / MX Keys profile) with individual key rows.
 * - Sculpted ergonomic wireless mouse with thumb rest and tactile metal scroll wheel.
 */
export function Peripherals({ materials }: PeripheralsProps) {
  const deskY = ROOM_DIMENSIONS.desk.position[1] + ROOM_DIMENSIONS.desk.topThickness / 2 + 0.003;
  const deskX = ROOM_DIMENSIONS.desk.position[0];
  const deskZ = ROOM_DIMENSIONS.desk.position[2];

  return (
    <group name="desk-peripherals">
      {/* ── 1. Low-Profile Wireless Keyboard ── */}
      <group position={[deskX - 0.05, deskY, deskZ + 0.18]} name="wireless-keyboard">
        {/* Aluminum Chassis (Slightly Wedge Shaped) */}
        <RoundedBox
          args={[0.29, 0.007, 0.115]}
          radius={0.004}
          smoothness={3}
          material={materials.metalAluminum}
          position={[0, 0.0035, 0]}
        />

        {/* Keycap Tray */}
        <mesh position={[0, 0.0075, 0]} material={materials.metalDark}>
          <boxGeometry args={[0.278, 0.001, 0.105]} />
        </mesh>

        {/* 5 Distinct Rows of Keys */}
        {[-0.038, -0.019, 0, 0.019, 0.038].map((z, rowIdx) => (
          <mesh
            key={`kbd-row-${rowIdx}`}
            position={[0, 0.009, z]}
            material={materials.keycap}
          >
            <boxGeometry args={[0.27, 0.002, 0.014]} />
          </mesh>
        ))}
      </group>

      {/* ── 2. Sculpted Ergonomic Wireless Mouse ── */}
      <group position={[deskX + 0.26, deskY, deskZ + 0.18]} name="ergonomic-mouse">
        {/* Main Contoured Mouse Body */}
        <RoundedBox
          args={[0.064, 0.024, 0.11]}
          radius={0.010}
          smoothness={4}
          material={materials.metalDark}
          position={[0, 0.012, 0]}
        />

        {/* Ergonomic Thumb Rest Wing (Left Side) */}
        <mesh position={[-0.032, 0.006, 0.01]} material={materials.metalDark}>
          <boxGeometry args={[0.014, 0.008, 0.05]} />
        </mesh>

        {/* Split Click Button Separation Seam */}
        <mesh position={[0, 0.0245, -0.025]} material={materials.woodTrim}>
          <boxGeometry args={[0.001, 0.001, 0.045]} />
        </mesh>

        {/* Brushed Metal Scroll Wheel with Rubber Ribs */}
        <group position={[0, 0.024, -0.022]}>
          <mesh rotation={[0, 0, Math.PI / 2]} material={materials.metalSilver}>
            <cylinderGeometry args={[0.006, 0.006, 0.006, 16]} />
          </mesh>
          <mesh rotation={[0, 0, Math.PI / 2]} material={materials.metalDark}>
            <cylinderGeometry args={[0.0062, 0.0062, 0.003, 16]} />
          </mesh>
        </group>
      </group>
    </group>
  );
}

