"use client";

import React from "react";
import { RoundedBox } from "@react-three/drei";
import { ROOM_DIMENSIONS } from "../roomDimensions";
import { RoomMaterials } from "../RoomMaterials";

interface BedProps {
  materials: RoomMaterials;
}

/**
 * High-Fidelity Contemporary Platform Bed
 * 
 * Features:
 * - Low-profile Scandinavian solid wood platform frame with floating recessed base.
 * - Architectural headboard with wood surround and upholstered padded fabric inset.
 * - Deep mattress with piped perimeter seams in crisp linen.
 * - Draped volumetric linen duvet with realistic folded-back collar.
 * - Contoured lofted sleeping pillows with natural rest tilt (not flat boxes).
 * - Layered wool throw blanket with rolled edge at foot of bed.
 */
export function Bed({ materials }: BedProps) {
  const d = ROOM_DIMENSIONS.bed;

  return (
    <group position={d.position} name="platform-bed-module">
      
      {/* ── 1. Floating Recessed Base Plinth ── */}
      <mesh position={[0, 0.05, 0]} material={materials.woodDark}>
        <boxGeometry args={[d.width - 0.20, 0.10, d.length - 0.20]} />
      </mesh>

      {/* ── 2. Solid Platform Bed Frame ── */}
      <RoundedBox
        args={[d.width, 0.18, d.length]}
        radius={0.012}
        smoothness={4}
        material={materials.woodLight}
        position={[0, 0.19, 0]}
      />

      {/* ── 3. Architectural Upholstered Headboard ── */}
      <group position={[0, d.headboardHeight / 2 + 0.10, -d.length / 2 + 0.05]} name="headboard">
        {/* Outer Wooden Frame */}
        <RoundedBox
          args={[d.width, d.headboardHeight, 0.08]}
          radius={0.010}
          smoothness={3}
          material={materials.woodLight}
        />
        {/* Soft Upholstered Padded Fabric Cushion Inset */}
        <RoundedBox
          args={[d.width - 0.12, d.headboardHeight - 0.14, 0.04]}
          radius={0.020}
          smoothness={4}
          material={materials.fabricPillow}
          position={[0, 0, 0.035]}
        />
        {/* Vertical Tufting Seam Accents */}
        {[-0.40, 0, 0.40].map((x, idx) => (
          <mesh key={`headboard-seam-${idx}`} position={[x, 0, 0.056]} material={materials.woodTrim}>
            <boxGeometry args={[0.002, d.headboardHeight - 0.20, 0.002]} />
          </mesh>
        ))}
      </group>

      {/* ── 4. Deep Mattress with Piped Edge Seams ── */}
      <group position={[0, 0.38, 0.02]} name="mattress">
        {/* Main Mattress Core */}
        <RoundedBox
          args={[d.width - 0.08, 0.22, d.length - 0.10]}
          radius={0.024}
          smoothness={4}
          material={materials.fabricWhite}
        />
        {/* Top Perimeter Piped Seam */}
        <mesh position={[0, 0.108, 0]} material={materials.fabricPillow}>
          <boxGeometry args={[d.width - 0.084, 0.006, d.length - 0.104]} />
        </mesh>
        {/* Bottom Perimeter Piped Seam */}
        <mesh position={[0, -0.108, 0]} material={materials.fabricPillow}>
          <boxGeometry args={[d.width - 0.084, 0.006, d.length - 0.104]} />
        </mesh>
      </group>

      {/* ── 5. Dual Contoured Lofted Pillows (Soft & Organic) ── */}
      {[-0.42, 0.42].map((xOffset, idx) => (
        <group
          key={`pillow-${idx}`}
          position={[xOffset, 0.54, -d.length / 2 + 0.38]}
          rotation={[-0.28, 0, idx === 0 ? 0.04 : -0.04]}
          name={`pillow-${idx + 1}`}
        >
          {/* Main Contoured Pillow Loft */}
          <RoundedBox
            args={[0.56, 0.13, 0.38]}
            radius={0.055}
            smoothness={5}
            material={materials.fabricPillow}
          />
          {/* Flanged Oxford Border Edge */}
          <mesh position={[0, 0, 0]} material={materials.fabricWhite}>
            <boxGeometry args={[0.58, 0.012, 0.40]} />
          </mesh>
        </group>
      ))}

      {/* ── 6. Draped Linen Duvet with Folded Collar ── */}
      <group position={[0, 0.51, 0.18]} name="duvet-cover">
        {/* Main Volumetric Duvet Body */}
        <RoundedBox
          args={[d.width - 0.04, 0.075, d.length * 0.70]}
          radius={0.028}
          smoothness={4}
          material={materials.fabricDuvet}
          position={[0, 0, 0]}
        />
        {/* Left Side Draped Overhang */}
        <RoundedBox
          args={[0.04, 0.18, d.length * 0.68]}
          radius={0.016}
          smoothness={3}
          material={materials.fabricDuvet}
          position={[-d.width / 2 + 0.01, -0.06, 0]}
        />
        {/* Right Side Draped Overhang */}
        <RoundedBox
          args={[0.04, 0.18, d.length * 0.68]}
          radius={0.016}
          smoothness={3}
          material={materials.fabricDuvet}
          position={[d.width / 2 - 0.01, -0.06, 0]}
        />
        {/* Realistic Folded-Back Duvet Collar (Revealing Sheet) */}
        <group position={[0, 0.038, -d.length * 0.35 + 0.08]} rotation={[0.12, 0, 0]}>
          <RoundedBox
            args={[d.width - 0.06, 0.035, 0.18]}
            radius={0.014}
            smoothness={3}
            material={materials.fabricWhite}
          />
        </group>
      </group>

      {/* ── 7. Folded Wool Throw Blanket (Foot of Bed) ── */}
      <group position={[0, 0.56, d.length / 2 - 0.38]} name="wool-throw">
        <RoundedBox
          args={[d.width - 0.02, 0.045, 0.65]}
          radius={0.018}
          smoothness={4}
          material={materials.fabricThrow}
        />
        {/* Folded Top Layer */}
        <RoundedBox
          args={[d.width - 0.04, 0.025, 0.32]}
          radius={0.012}
          smoothness={3}
          material={materials.fabricThrow}
          position={[0, 0.025, -0.10]}
        />
      </group>

    </group>
  );
}

