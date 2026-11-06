"use client";

import React, { useMemo } from "react";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import { ROOM_DIMENSIONS } from "../roomDimensions";
import { RoomMaterials } from "../RoomMaterials";

interface BedProps {
  materials: RoomMaterials;
}

/**
 * Procedural Draped Duvet Geometry Generator
 * Generates an organic, volumetric duvet surface with natural down loft,
 * soft rolling folds, micro-creases, and smooth gravitational side drapes.
 */
function createDrapedDuvetGeometry(width: number, length: number) {
  const segX = 40;
  const segZ = 40;
  const positions: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];

  const halfW = width / 2;
  const drapeDepth = 0.22; // depth of side overhang
  const crestW = halfW - 0.08; // where the mattress edge starts

  for (let j = 0; j <= segZ; j++) {
    const v = j / segZ;
    // Z from head fold to foot drape
    const z = -0.36 + v * (length + 0.12);

    for (let i = 0; i <= segX; i++) {
      const u = i / segX;
      // Map u to X coordinate from left drape edge to right drape edge
      const x = -halfW + u * width;

      // 1. Base height profile
      let y = 0.045; // base loft above mattress

      // 2. Center volumetric down puffiness
      const centerFactor = Math.sin(u * Math.PI) * Math.sin(v * Math.PI * 0.95);
      y += centerFactor * 0.024;

      // 3. Subtle natural bedding folds & undulations
      const fold1 = Math.sin(x * 9.5 + z * 5.2) * 0.007;
      const fold2 = Math.cos(z * 11.0 - x * 4.8) * 0.005;
      const fold3 = Math.sin((x + z) * 16.0) * 0.003;
      y += (fold1 + fold2 + fold3) * centerFactor;

      // 4. Side drapes (left and right edges curving down)
      const absX = Math.abs(x);
      let drop = 0;
      if (absX > crestW) {
        const dropRatio = Math.min(1, (absX - crestW) / (halfW - crestW));
        drop = Math.pow(dropRatio, 1.6) * drapeDepth;
        drop -= Math.sin(v * 18.0) * 0.003 * dropRatio;
      }

      // 5. Foot drape (front edge curving down)
      if (v > 0.88) {
        const footDropRatio = (v - 0.88) / 0.12;
        const footDrop = Math.pow(footDropRatio, 1.8) * 0.13;
        // Smoothly blend side drape and foot drape to avoid corner spike
        drop = Math.max(drop, footDrop) + Math.min(drop, footDrop) * 0.25;
      }

      // Clamp max drop so it never extends past platform
      drop = Math.min(drop, drapeDepth);
      y -= drop;

      positions.push(x, y, z);
      uvs.push(u * 3, v * 3);
    }
  }

  for (let j = 0; j < segZ; j++) {
    for (let i = 0; i < segX; i++) {
      const a = j * (segX + 1) + i;
      const b = (j + 1) * (segX + 1) + i;
      const c = (j + 1) * (segX + 1) + (i + 1);
      const d = j * (segX + 1) + (i + 1);

      indices.push(a, b, d);
      indices.push(d, b, c);
    }
  }

  const geom = new THREE.BufferGeometry();
  geom.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geom.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
  geom.setIndex(indices);
  geom.computeVertexNormals();
  return geom;
}

/**
 * Procedural Cushioned Oxford Pillow Geometry Generator
 * Generates an organic lofted pillow with natural sleep depression,
 * rounded plump crown, and pinched perimeter seam flange.
 */
function createCushionedPillowGeometry(width: number, length: number, height: number) {
  const segX = 26;
  const segY = 26;
  const positions: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];

  // Top surface with center depression
  for (let j = 0; j <= segY; j++) {
    const v = (j / segY) * 2 - 1; // -1 to 1
    const z = (v * length) / 2;

    for (let i = 0; i <= segX; i++) {
      const u = (i / segX) * 2 - 1; // -1 to 1
      const x = (u * width) / 2;

      // Pillow crown loft
      const crown = Math.cos((u * Math.PI) / 2) * Math.cos((v * Math.PI) / 2);
      let y = Math.pow(Math.max(0, crown), 0.7) * height;

      // Organic center depression where head rests
      const centerDistSq = u * u * 3.5 + v * v * 4.5;
      const sleepIndent = Math.exp(-centerDistSq) * 0.35;
      y *= (1 - sleepIndent);

      // Subtle organic creasing
      y += Math.sin(u * 12 + v * 8) * 0.0025 * crown;

      positions.push(x, y, z);
      uvs.push((u + 1) / 2, (v + 1) / 2);
    }
  }

  for (let j = 0; j < segY; j++) {
    for (let i = 0; i < segX; i++) {
      const a = j * (segX + 1) + i;
      const b = (j + 1) * (segX + 1) + i;
      const c = (j + 1) * (segX + 1) + (i + 1);
      const d = j * (segX + 1) + (i + 1);

      indices.push(a, b, d);
      indices.push(d, b, c);
    }
  }

  const geom = new THREE.BufferGeometry();
  geom.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geom.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
  geom.setIndex(indices);
  geom.computeVertexNormals();
  return geom;
}

/**
 * High-Fidelity Contemporary Platform Bed with Soft Textiles
 * 
 * Features:
 * - Low-profile Scandinavian solid wood platform frame with floating recessed base.
 * - Architectural headboard with wood surround and upholstered padded fabric inset.
 * - Deep mattress with piped perimeter seams.
 * - Draped volumetric linen duvet with natural down loft, soft rolling folds,
 *   edge drape, and organic rolled collar.
 * - Cushioned Oxford sleeping pillows with sleep depression and gentle backward lean.
 * - Layered heavy wool throw blanket with realistic textile drape.
 */
export function Bed({ materials }: BedProps) {
  const d = ROOM_DIMENSIONS.bed;

  // Procedural soft textile geometries
  const duvetGeom = useMemo(() => createDrapedDuvetGeometry(d.width + 0.06, d.length * 0.68), [d.width, d.length]);
  const pillowGeom = useMemo(() => createCushionedPillowGeometry(0.58, 0.40, 0.125), []);

  return (
    <group position={d.position} name="platform-bed-module">
      
      {/* ── 1. Floating Recessed Base Plinth ── */}
      <mesh position={[0, 0.05, 0]} material={materials.woodDark} receiveShadow>
        <boxGeometry args={[d.width - 0.20, 0.10, d.length - 0.20]} />
      </mesh>

      {/* ── 2. Solid Platform Bed Frame ── */}
      <RoundedBox
        args={[d.width, 0.18, d.length]}
        radius={0.012}
        smoothness={4}
        material={materials.woodLight}
        position={[0, 0.19, 0]}
        castShadow
        receiveShadow
      />

      {/* ── 3. Architectural Upholstered Headboard ── */}
      <group position={[0, d.headboardHeight / 2 + 0.10, -d.length / 2 + 0.05]} name="headboard">
        {/* Outer Wooden Surround */}
        <RoundedBox
          args={[d.width, d.headboardHeight, 0.08]}
          radius={0.010}
          smoothness={3}
          material={materials.woodLight}
          castShadow
          receiveShadow
        />
        {/* Soft Upholstered Padded Fabric Cushion Inset */}
        <RoundedBox
          args={[d.width - 0.12, d.headboardHeight - 0.14, 0.04]}
          radius={0.020}
          smoothness={4}
          material={materials.fabricPillow}
          position={[0, 0, 0.035]}
          receiveShadow
        />
        {/* Vertical Channel Tufting Seams */}
        {[-0.40, 0, 0.40].map((x, idx) => (
          <mesh key={`headboard-seam-${idx}`} position={[x, 0, 0.056]} material={materials.woodTrim}>
            <boxGeometry args={[0.0025, d.headboardHeight - 0.20, 0.002]} />
          </mesh>
        ))}
      </group>

      {/* ── 4. Deep Mattress with Piped Edge Seams ── */}
      <group position={[0, 0.38, 0.02]} name="mattress">
        <RoundedBox
          args={[d.width - 0.08, 0.22, d.length - 0.10]}
          radius={0.024}
          smoothness={4}
          material={materials.fabricWhite}
          castShadow
          receiveShadow
        />
        {/* Top Perimeter Piped Seam */}
        <mesh position={[0, 0.108, 0]} material={materials.fabricPillow}>
          <boxGeometry args={[d.width - 0.084, 0.006, d.length - 0.104]} />
        </mesh>
      </group>

      {/* ── 5. Cushioned Lofted Sleeping Pillows (Organic Surface & Sleep Dent) ── */}
      {[-0.42, 0.42].map((xOffset, idx) => (
        <group
          key={`pillow-${idx}`}
          position={[xOffset, 0.55, -d.length / 2 + 0.38]}
          rotation={[-0.30, idx === 0 ? 0.05 : -0.05, 0]}
          name={`pillow-${idx + 1}`}
        >
          {/* Main Volumetric Cushioned Pillow */}
          <RoundedBox
            args={[0.60, 0.15, 0.40]}
            radius={0.060}
            smoothness={5}
            material={materials.fabricPillow}
            castShadow
            receiveShadow
          />
          {/* Oxford Flanged Perimeter Border */}
          <mesh position={[0, -0.004, 0]} material={materials.fabricWhite}>
            <boxGeometry args={[0.64, 0.008, 0.44]} />
          </mesh>
          {/* Subtle Sleep Dent Indentation */}
          <mesh position={[0, 0.076, 0]} rotation={[-Math.PI / 2, 0, 0]} material={materials.fabricDuvet}>
            <circleGeometry args={[0.075, 16]} />
          </mesh>
        </group>
      ))}

      {/* ── 6. Draped Volumetric Linen Duvet with Organic Folds ── */}
      <group position={[0, 0.49, 0.22]} name="duvet-cover">
        {/* Sculpted Draped Duvet Surface */}
        <mesh
          geometry={duvetGeom}
          material={materials.fabricDuvet}
          castShadow
          receiveShadow
        />

        {/* Realistic Rolled Duvet Collar (Folded back over mattress) */}
        <group position={[0, 0.052, -0.37]} rotation={[0.18, 0, 0]}>
          {/* Rounded rolled duvet collar */}
          <RoundedBox
            args={[d.width - 0.04, 0.045, 0.18]}
            radius={0.020}
            smoothness={4}
            material={materials.fabricDuvet}
            castShadow
          />
          {/* Crisp Under-Sheet Fold */}
          <RoundedBox
            args={[d.width - 0.06, 0.024, 0.14]}
            radius={0.010}
            smoothness={3}
            material={materials.fabricWhite}
            position={[0, 0.012, -0.06]}
          />
        </group>
      </group>

      {/* ── 7. Folded Wool Throw Blanket (Foot of Bed) ── */}
      <group position={[0, 0.558, d.length / 2 - 0.38]} name="wool-throw">
        {/* Lower draped blanket tier */}
        <RoundedBox
          args={[d.width + 0.02, 0.040, 0.62]}
          radius={0.018}
          smoothness={4}
          material={materials.fabricThrow}
          castShadow
          receiveShadow
        />
        {/* Upper folded blanket roll */}
        <RoundedBox
          args={[d.width - 0.02, 0.034, 0.30]}
          radius={0.015}
          smoothness={3}
          material={materials.fabricThrow}
          position={[0, 0.030, -0.08]}
          castShadow
        />
      </group>

    </group>
  );
}
