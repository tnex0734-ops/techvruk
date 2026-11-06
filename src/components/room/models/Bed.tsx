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
  const segX = 42;
  const segZ = 42;
  const positions: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];

  const halfW = width / 2;
  const drapeDepth = 0.23; // depth of side overhang
  const crestW = halfW - 0.085; // where the mattress edge starts

  for (let j = 0; j <= segZ; j++) {
    const v = j / segZ;
    // Z from head fold to foot drape
    const z = -0.36 + v * (length + 0.12);

    for (let i = 0; i <= segX; i++) {
      const u = i / segX;
      // Map u to X coordinate from left drape edge to right drape edge
      const x = -halfW + u * width;

      // 1. Base height profile
      let y = 0.046; // base loft above mattress

      // 2. Center volumetric down puffiness
      const centerFactor = Math.sin(u * Math.PI) * Math.sin(v * Math.PI * 0.94);
      y += centerFactor * 0.026;

      // 3. Subtle natural bedding folds & undulations
      const fold1 = Math.sin(x * 9.2 + z * 5.0) * 0.0075;
      const fold2 = Math.cos(z * 10.8 - x * 4.6) * 0.0055;
      const fold3 = Math.sin((x + z) * 15.5) * 0.0035;
      y += (fold1 + fold2 + fold3) * centerFactor;

      // 4. Side drapes (left and right edges curving down)
      const absX = Math.abs(x);
      let drop = 0;
      if (absX > crestW) {
        const dropRatio = Math.min(1, (absX - crestW) / (halfW - crestW));
        // Soft continuous cubic ease-in
        drop = Math.pow(dropRatio, 1.55) * drapeDepth;
        drop -= Math.sin(v * 16.0) * 0.0035 * dropRatio;
      }

      // 5. Foot drape (front edge curving down)
      if (v > 0.88) {
        const footDropRatio = (v - 0.88) / 0.12;
        const footDrop = Math.pow(footDropRatio, 1.75) * 0.14;
        // Smoothly blend side drape and foot drape to avoid corner spike
        drop = Math.max(drop, footDrop) + Math.min(drop, footDrop) * 0.22;
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
 * Procedural Draped Throw Blanket Geometry Generator
 * Replaces rigid geometric boxes with a natural, flowing textile drape.
 * Conforms smoothly across the foot of the bed with soft gravitational overhangs.
 */
function createDrapedThrowGeometry(width: number, length: number) {
  const segX = 36;
  const segZ = 28;
  const positions: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];

  const halfW = width / 2;
  const drapeDepth = 0.22;
  const crestW = halfW - 0.08;

  for (let j = 0; j <= segZ; j++) {
    const v = j / segZ;
    // Z spans across the throw blanket length
    const z = -length / 2 + v * length;

    for (let i = 0; i <= segX; i++) {
      const u = i / segX;
      const x = -halfW + u * width;

      // Base loft matching duvet crown below
      let y = 0.016;

      // Heavy wool rolling cross-folds
      const foldZ = Math.sin(v * Math.PI * 4.2) * 0.007;
      const foldX = Math.cos(u * Math.PI * 3.0) * 0.004;
      y += foldZ + foldX;

      // Side drapes
      const absX = Math.abs(x);
      let drop = 0;
      if (absX > crestW) {
        const dropRatio = Math.min(1, (absX - crestW) / (halfW - crestW));
        drop = Math.pow(dropRatio, 1.6) * drapeDepth;
        drop -= Math.sin(v * 12.0) * 0.003 * dropRatio;
      }

      // Foot drape (front overhang)
      if (v > 0.85) {
        const footDropRatio = (v - 0.85) / 0.15;
        const footDrop = Math.pow(footDropRatio, 1.7) * 0.16;
        drop = Math.max(drop, footDrop) + Math.min(drop, footDrop) * 0.25;
      }

      drop = Math.min(drop, drapeDepth);
      y -= drop;

      positions.push(x, y, z);
      uvs.push(u * 2.5, v * 2.0);
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
 * Procedural Organic Plump Pillow Geometry
 * Models an authentic down-filled sleeping pillow:
 * convex parabolic loft, soft center sleep depression, and pinched perimeter seam flange.
 */
function createOrganicPillowGeometry(width: number, length: number, thickness: number) {
  const segX = 28;
  const segZ = 24;
  const positions: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];

  const halfW = width / 2;
  const halfL = length / 2;

  // Generate upper shell of pillow
  for (let j = 0; j <= segZ; j++) {
    const v = (j / segZ) * 2 - 1; // -1 to 1
    const z = v * halfL;

    for (let i = 0; i <= segX; i++) {
      const u = (i / segX) * 2 - 1; // -1 to 1
      const x = u * halfW;

      // Elliptical crown profile (pinched at margins, thick at center)
      const rSq = u * u + v * v;
      const falloff = Math.max(0, 1 - rSq * 0.88);
      let y = Math.pow(falloff, 0.65) * thickness;

      // Organic sleep depression where the head rests
      const indentDistSq = u * u * 4.2 + (v + 0.1) * (v + 0.1) * 5.0;
      const sleepIndent = Math.exp(-indentDistSq) * 0.32;
      y *= (1 - sleepIndent);

      // Subtle organic creasing
      y += Math.sin(u * 9.5 + v * 6.5) * 0.0022 * falloff;

      positions.push(x, y, z);
      uvs.push((u + 1) / 2, (v + 1) / 2);
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
 * High-Fidelity Contemporary Platform Bed with Soft Textiles (Phase 3B.2.1 Refined)
 */
export function Bed({ materials }: BedProps) {
  const d = ROOM_DIMENSIONS.bed;

  // Procedural soft textile geometries
  const duvetGeom = useMemo(() => createDrapedDuvetGeometry(d.width + 0.06, d.length * 0.68), [d.width, d.length]);
  const throwGeom = useMemo(() => createDrapedThrowGeometry(d.width + 0.07, 0.58), [d.width]);
  const pillowTopGeom = useMemo(() => createOrganicPillowGeometry(0.62, 0.42, 0.13), []);

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

      {/* ── 5. Cushioned Lofted Sleeping Pillows (Organic Surface & Flanged Seam) ── */}
      {[-0.42, 0.42].map((xOffset, idx) => (
        <group
          key={`pillow-${idx}`}
          position={[xOffset, 0.525, -d.length / 2 + 0.38]}
          rotation={[-0.24, idx === 0 ? 0.04 : -0.04, 0]}
          name={`pillow-${idx + 1}`}
        >
          {/* Main Organic Volumetric Pillow Body */}
          <mesh
            geometry={pillowTopGeom}
            material={materials.fabricPillow}
            castShadow
            receiveShadow
          />
          {/* Pillow Lower Loft (Slightly mirrored for plump volume) */}
          <mesh
            geometry={pillowTopGeom}
            material={materials.fabricWhite}
            rotation={[Math.PI, 0, 0]}
            position={[0, 0.015, 0]}
            receiveShadow
          />
          {/* Oxford Flanged Perimeter Border Edge */}
          <mesh position={[0, 0.008, 0]} material={materials.fabricPillow}>
            <boxGeometry args={[0.65, 0.006, 0.45]} />
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
        <group position={[0, 0.050, -0.37]} rotation={[0.16, 0, 0]}>
          {/* Rounded rolled duvet collar */}
          <RoundedBox
            args={[d.width - 0.04, 0.048, 0.19]}
            radius={0.022}
            smoothness={4}
            material={materials.fabricDuvet}
            castShadow
          />
          {/* Crisp Under-Sheet Fold */}
          <RoundedBox
            args={[d.width - 0.06, 0.025, 0.15]}
            radius={0.012}
            smoothness={3}
            material={materials.fabricWhite}
            position={[0, 0.012, -0.06]}
          />
        </group>
      </group>

      {/* ── 7. Soft Draped Wool Throw Blanket (Foot of Bed) ── */}
      <group position={[0, 0.548, d.length / 2 - 0.34]} name="wool-throw">
        {/* Draped flowing blanket mesh cascading down the sides and foot */}
        <mesh
          geometry={throwGeom}
          material={materials.fabricThrow}
          castShadow
          receiveShadow
        />
        {/* Soft Folded Blanket Top Hem Roll */}
        <RoundedBox
          args={[d.width - 0.04, 0.030, 0.18]}
          radius={0.014}
          smoothness={3}
          material={materials.fabricThrow}
          position={[0, 0.026, -0.14]}
          castShadow
        />
      </group>

    </group>
  );
}
