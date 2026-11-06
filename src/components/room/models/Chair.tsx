"use client";

import React from "react";
import { RoundedBox } from "@react-three/drei";
import { ROOM_DIMENSIONS } from "../roomDimensions";
import { RoomMaterials } from "../RoomMaterials";

interface ChairProps {
  materials: RoomMaterials;
}

/**
 * High-Fidelity Studio Ergonomic Task Chair
 * 
 * Features:
 * - 5-star arched base with 5 dual-wheel hooded casters.
 * - Pneumatic hydraulic cylinder and under-seat tilt mechanism housing.
 * - Contoured seat cushion upholstered in signature portfolio red fabric (#C91F2B).
 * - Ergonomic curved backrest with ventilated mesh and lumbar support contour.
 * - Carefully proportioned so as not to obscure the laptop from the primary camera.
 */
export function Chair({ materials }: ChairProps) {
  const deskX = ROOM_DIMENSIONS.desk.position[0];
  const deskZ = ROOM_DIMENSIONS.desk.position[2];
  const chairZ = deskZ + 0.58;

  const casterAngles = [0, 72, 144, 216, 288].map((deg) => (deg * Math.PI) / 180);

  return (
    <group position={[deskX, 0, chairZ]} rotation={[0, -0.15, 0]} name="studio-chair">
      
      {/* ── 1. 5-Star Arched Base & Casters ── */}
      <group position={[0, 0, 0]} name="base-casters">
        {/* Central Hub */}
        <mesh position={[0, 0.07, 0]} material={materials.metalDark}>
          <cylinderGeometry args={[0.05, 0.055, 0.06, 16]} />
        </mesh>

        {/* 5 Radial Arched Legs */}
        {casterAngles.map((angle, idx) => {
          const armLength = 0.28;
          const endX = Math.cos(angle) * armLength;
          const endZ = Math.sin(angle) * armLength;
          return (
            <group key={`leg-${idx}`}>
              {/* Sloped Leg Strut */}
              <mesh
                position={[endX / 2, 0.055, endZ / 2]}
                rotation={[0, -angle, 0.08]}
                material={materials.metalDark}
              >
                <boxGeometry args={[armLength, 0.016, 0.024]} />
              </mesh>
              {/* Caster Wheel Housing */}
              <group position={[endX, 0.03, endZ]}>
                <mesh material={materials.metalDark}>
                  <cylinderGeometry args={[0.012, 0.012, 0.02, 12]} />
                </mesh>
                {/* Dual Caster Wheels */}
                <mesh position={[0, -0.012, 0]} rotation={[0, angle, Math.PI / 2]} material={materials.metalDark}>
                  <cylinderGeometry args={[0.022, 0.022, 0.024, 16]} />
                </mesh>
              </group>
            </group>
          );
        })}
      </group>

      {/* ── 2. Hydraulic Pneumatic Cylinder ── */}
      <group position={[0, 0.18, 0]} name="hydraulic-column">
        {/* Outer Steel Shroud */}
        <mesh position={[0, 0, 0]} material={materials.metalDark}>
          <cylinderGeometry args={[0.026, 0.026, 0.18, 16]} />
        </mesh>
        {/* Inner Chrome Piston */}
        <mesh position={[0, 0.11, 0]} material={materials.metalSilver}>
          <cylinderGeometry args={[0.018, 0.018, 0.12, 16]} />
        </mesh>
      </group>

      {/* ── 3. Under-Seat Mechanism Housing ── */}
      <group position={[0, 0.38, 0]} name="seat-mechanism">
        <mesh material={materials.metalDark}>
          <boxGeometry args={[0.18, 0.05, 0.18]} />
        </mesh>
        {/* Tilt Tension Knob */}
        <mesh position={[0, -0.03, 0.06]} material={materials.metalDark}>
          <cylinderGeometry args={[0.025, 0.025, 0.04, 16]} />
        </mesh>
        {/* Height Adjustment Lever */}
        <mesh position={[0.12, -0.01, 0]} rotation={[0, 0, 0.2]} material={materials.metalSilver}>
          <cylinderGeometry args={[0.005, 0.005, 0.10, 8]} />
        </mesh>
      </group>

      {/* ── 4. Contoured Cushion (Signature Red Accent) ── */}
      <group position={[0, 0.44, 0]} name="seat-cushion">
        <RoundedBox
          args={[0.48, 0.075, 0.48]}
          radius={0.020}
          smoothness={4}
          material={materials.chairFabric}
          castShadow
          receiveShadow
        />
        {/* Ergonomic Waterfall Front Edge */}
        <mesh position={[0, -0.01, 0.23]} rotation={[0.4, 0, 0]} material={materials.chairFabric}>
          <boxGeometry args={[0.46, 0.03, 0.04]} />
        </mesh>
      </group>

      {/* ── 5. Ergonomic Curved Backrest & Lumbar Frame ── */}
      <group position={[0, 0.72, 0.21]} rotation={[-0.08, 0, 0]} name="backrest-assembly">
        {/* Spine Spine Stanchion */}
        <mesh position={[0, -0.15, 0.02]} material={materials.metalDark}>
          <boxGeometry args={[0.05, 0.28, 0.025]} />
        </mesh>

        {/* Outer Ergonomic Backrest Frame */}
        <RoundedBox
          args={[0.44, 0.48, 0.025]}
          radius={0.012}
          smoothness={4}
          material={materials.metalDark}
        />

        {/* Ventilated Breathable Mesh Inset */}
        <mesh position={[0, 0, -0.004]} material={materials.chairMesh}>
          <boxGeometry args={[0.40, 0.44, 0.012]} />
        </mesh>

        {/* Lumbar Support Rib (Rear) */}
        <mesh position={[0, -0.08, 0.016]} material={materials.metalDark}>
          <boxGeometry args={[0.34, 0.06, 0.018]} />
        </mesh>
      </group>

    </group>
  );
}

