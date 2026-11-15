"use client";

import React from "react";
import { RoundedBox } from "@react-three/drei";
import { RoomMaterials } from "../RoomMaterials";

interface BedsideTableProps {
  materials: RoomMaterials;
  position?: [number, number, number];
}

/**
 * Scandinavian White Oak Bedside Table / Reading Console
 * 
 * Positioned beside the bed (at [0.85, 0, -1.95]), this piece bridges the space
 * between the workstation desk and the bed. It holds the interactive Personal Sketchbook,
 * a ceramic coffee mug, and gives the room balanced, spacious architectural rhythm.
 */
export function BedsideTable({
  materials,
  position = [0.85, 0, -1.95],
}: BedsideTableProps) {
  const tableW = 0.46;
  const tableD = 0.46;
  const tableH = 0.52;
  const legH = 0.28;
  const topT = 0.024;
  const bodyH = tableH - legH - topT; // ~0.216m

  return (
    <group position={position} name="scandinavian-bedside-table">
      {/* ── 1. Warm Solid Oak Table Top ── */}
      <RoundedBox
        args={[tableW, topT, tableD]}
        radius={0.008}
        smoothness={4}
        position={[0, tableH - topT / 2, 0]}
        material={materials.woodTrim}
        castShadow
        receiveShadow
      />

      {/* ── 2. Storage Drawer Unit (Bone/Cream Matte Lacquer) ── */}
      <RoundedBox
        args={[tableW - 0.03, bodyH, tableD - 0.03]}
        radius={0.006}
        smoothness={4}
        position={[0, legH + bodyH / 2, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          color="#F5F0E6"
          roughness={0.55}
          metalness={0.05}
        />
      </RoundedBox>

      {/* Front Drawer Seam & Brass Knob */}
      <group position={[0, legH + bodyH / 2, tableD / 2 - 0.012]}>
        {/* Horizontal Seam Line */}
        <mesh position={[0, 0, 0.001]}>
          <planeGeometry args={[tableW - 0.06, 0.003]} />
          <meshBasicMaterial color="#D1C7BA" />
        </mesh>
        {/* Turned Brass Pull Knob */}
        <mesh position={[0, 0.012, 0.008]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.008, 0.008, 0.014, 16]} />
          <meshStandardMaterial
            color="#EFCB75"
            metalness={0.8}
            roughness={0.3}
          />
        </mesh>
      </group>

      {/* ── 3. Four Tapered Architectural Legs with Brass Ferrule Caps ── */}
      {[
        [-tableW / 2 + 0.04, -tableD / 2 + 0.04],
        [tableW / 2 - 0.04, -tableD / 2 + 0.04],
        [-tableW / 2 + 0.04, tableD / 2 - 0.04],
        [tableW / 2 - 0.04, tableD / 2 - 0.04],
      ].map(([x, z], idx) => (
        <group key={`leg-${idx}`} position={[x, 0, z]}>
          {/* Main Wood Leg Cylinder */}
          <mesh position={[0, legH / 2, 0]} castShadow>
            <cylinderGeometry args={[0.012, 0.008, legH, 12]} />
            <meshStandardMaterial
              color="#B78352"
              roughness={0.6}
            />
          </mesh>
          {/* Brass Foot Cap */}
          <mesh position={[0, 0.018, 0]}>
            <cylinderGeometry args={[0.009, 0.008, 0.036, 12]} />
            <meshStandardMaterial
              color="#EFCB75"
              metalness={0.85}
              roughness={0.25}
            />
          </mesh>
        </group>
      ))}

      {/* ── 4. Cozy Ceramic Reading Mug on Table Corner ── */}
      <group position={[tableW / 2 - 0.09, tableH + 0.038, -tableD / 2 + 0.09]} rotation={[0, 0.4, 0]}>
        {/* Mug Body */}
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.026, 0.022, 0.076, 18]} />
          <meshStandardMaterial
            color="#EAE3D5"
            roughness={0.35}
          />
        </mesh>
        {/* Hot Black Coffee Top */}
        <mesh position={[0, 0.034, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.022, 16]} />
          <meshStandardMaterial
            color="#2B1810"
            roughness={0.2}
          />
        </mesh>
        {/* Ceramic Handle */}
        <mesh position={[0.026, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
          <torusGeometry args={[0.016, 0.004, 8, 16, Math.PI]} />
          <meshStandardMaterial
            color="#EAE3D5"
            roughness={0.35}
          />
        </mesh>
      </group>
    </group>
  );
}

