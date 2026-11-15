"use client";

import React from "react";
import * as THREE from "three";
import { RoomMaterials } from "../RoomMaterials";

interface BedClutterProps {
  materials: RoomMaterials;
}

/**
 * Art-Directed Lived-In Student/Designer Bed Clutter
 * - Positioned on bed mattress/duvet (Bed center: [1.85, 0.54, -1.45])
 * - 4 distinct composed clusters with real contact and no clipping:
 *   1. Study cluster: Open dotted notebook, loose assignment sheets, pencil case, pens
 *   2. Clothing cluster: Dropped hoodie with folds and casual drape
 *   3. College backpack: Structured canvas backpack with straps resting against pillow
 *   4. Checkerboard motif: Cornflower blue and cream woven throw blanket accent
 */
export function BedClutter({ materials }: BedClutterProps) {
  // Bed mattress surface is at Y = 0.54m
  // Local bed center [0, 0, 0] is at [1.85, 0.54, -1.45]
  const bedY = 0.545;

  return (
    <group name="bed-lived-in-clutter" position={[1.85, bedY, -1.45]}>
      
      {/* ── 1. Study Cluster (Center-Left of Bed, Z: -0.10, X: -0.35) ── */}
      <group position={[-0.32, 0.005, -0.15]} rotation={[0, 0.18, 0]}>
        {/* Open Notebook Left Page */}
        <mesh position={[-0.10, 0.003, 0]} rotation={[-0.02, 0, -0.01]} receiveShadow>
          <boxGeometry args={[0.19, 0.004, 0.26]} />
          <meshStandardMaterial color="#FFFDF7" roughness={0.88} />
        </mesh>
        {/* Open Notebook Right Page with Dotted Grid & Sketch */}
        <mesh position={[0.09, 0.003, 0]} rotation={[-0.02, 0, 0.01]} material={materials.notebookDotted} receiveShadow>
          <boxGeometry args={[0.19, 0.004, 0.26]} />
        </mesh>
        {/* Notebook Spine Binding */}
        <mesh position={[-0.005, 0.002, 0]}>
          <cylinderGeometry args={[0.003, 0.003, 0.26, 8]} />
          <meshStandardMaterial color="#273246" roughness={0.6} />
        </mesh>

        {/* Loose Assignment Sheet #1 (Slight curl) */}
        <mesh position={[0.22, 0.006, 0.08]} rotation={[-0.03, -0.32, 0.02]} receiveShadow>
          <boxGeometry args={[0.18, 0.002, 0.24]} />
          <meshStandardMaterial color="#F7F1E5" roughness={0.9} />
        </mesh>
        {/* Loose Assignment Sheet #2 */}
        <mesh position={[-0.24, 0.004, 0.12]} rotation={[0.02, 0.25, -0.02]} receiveShadow>
          <boxGeometry args={[0.18, 0.002, 0.24]} />
          <meshStandardMaterial color="#FFFDF7" roughness={0.9} />
        </mesh>

        {/* Canvas Pencil Case */}
        <group position={[0.05, 0.014, -0.20]} rotation={[0, -0.12, 0]}>
          <mesh castShadow receiveShadow>
            <cylinderGeometry args={[0.024, 0.024, 0.20, 12]} />
            <meshStandardMaterial color="#273246" roughness={0.85} />
          </mesh>
          {/* Brass Zipper Runner */}
          <mesh position={[0, 0.025, 0]}>
            <boxGeometry args={[0.004, 0.004, 0.18]} />
            <meshStandardMaterial color="#EFCB75" roughness={0.3} metalness={0.8} />
          </mesh>
          {/* Two Writing Pens resting beside case */}
          <mesh position={[0.04, -0.01, 0.02]} rotation={[0, 0.08, 0]}>
            <cylinderGeometry args={[0.004, 0.004, 0.14, 8]} />
            <meshStandardMaterial color="#EFCB75" roughness={0.4} metalness={0.6} />
          </mesh>
          <mesh position={[0.055, -0.01, -0.01]} rotation={[0, -0.05, 0]}>
            <cylinderGeometry args={[0.004, 0.004, 0.14, 8]} />
            <meshStandardMaterial color="#8CB7E5" roughness={0.4} />
          </mesh>
        </group>
      </group>

      {/* ── 2. Clothing Cluster: Dropped Casual Hoodie (Center-Right, Z: 0.15, X: 0.25) ── */}
      <group position={[0.22, 0.018, 0.10]} rotation={[0, -0.28, 0]}>
        {/* Hoodie Torso Body with Organic Folds */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.42, 0.038, 0.38]} />
          <meshStandardMaterial color="#88988C" roughness={0.92} />
        </mesh>
        {/* Left Folded Sleeve */}
        <mesh position={[-0.24, -0.005, 0.06]} rotation={[0, 0.35, -0.08]}>
          <cylinderGeometry args={[0.045, 0.04, 0.32, 10]} />
          <meshStandardMaterial color="#88988C" roughness={0.92} />
        </mesh>
        {/* Right Draped Sleeve */}
        <mesh position={[0.22, -0.008, -0.04]} rotation={[0, -0.45, 0.05]}>
          <cylinderGeometry args={[0.045, 0.038, 0.30, 10]} />
          <meshStandardMaterial color="#88988C" roughness={0.92} />
        </mesh>
        {/* Dropped Hood Volume */}
        <mesh position={[0.02, 0.025, -0.18]} rotation={[-0.25, 0, 0]}>
          <sphereGeometry args={[0.09, 12, 10, 0, Math.PI * 2, 0, Math.PI / 1.6]} />
          <meshStandardMaterial color="#7E8E82" roughness={0.94} />
        </mesh>
      </group>

      {/* ── 3. College Backpack (Upper-Right near Headboard/Pillow, Z: -0.65, X: 0.38) ── */}
      <group position={[0.38, 0.12, -0.68]} rotation={[-0.15, -0.25, 0.05]}>
        {/* Main Backpack Body */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.30, 0.38, 0.18]} />
          <meshStandardMaterial color="#273246" roughness={0.88} />
        </mesh>
        {/* Front Accessory Pocket */}
        <mesh position={[0, -0.06, 0.10]}>
          <boxGeometry args={[0.24, 0.20, 0.05]} />
          <meshStandardMaterial color="#1E2636" roughness={0.90} />
        </mesh>
        {/* Top Carry Handle */}
        <mesh position={[0, 0.20, 0]}>
          <boxGeometry args={[0.10, 0.03, 0.02]} />
          <meshStandardMaterial color="#181D26" roughness={0.7} />
        </mesh>
        {/* Brass Zipper Runner */}
        <mesh position={[0, 0.04, 0.128]}>
          <boxGeometry args={[0.22, 0.005, 0.005]} />
          <meshStandardMaterial color="#EFCB75" roughness={0.3} metalness={0.8} />
        </mesh>
        {/* Left Padded Shoulder Strap */}
        <mesh position={[-0.10, 0.04, -0.10]} rotation={[0.45, 0, 0.1]}>
          <boxGeometry args={[0.05, 0.32, 0.015]} />
          <meshStandardMaterial color="#181D26" roughness={0.9} />
        </mesh>
        {/* Right Padded Shoulder Strap */}
        <mesh position={[0.10, 0.04, -0.10]} rotation={[0.45, 0, -0.1]}>
          <boxGeometry args={[0.05, 0.32, 0.015]} />
          <meshStandardMaterial color="#181D26" roughness={0.9} />
        </mesh>
      </group>

      {/* ── 4. Blue & Cream Checkerboard Accent Throw (Lower Foot of Bed) ── */}
      <group position={[-0.25, 0.016, 0.62]} rotation={[0, 0.10, 0]}>
        <mesh material={materials.checkerFabric} castShadow receiveShadow>
          <boxGeometry args={[0.75, 0.025, 0.55]} />
        </mesh>
        {/* Fringed Edge Accent */}
        <mesh position={[0, -0.008, 0.28]}>
          <boxGeometry args={[0.74, 0.006, 0.03]} />
          <meshStandardMaterial color="#FFFDF7" roughness={0.9} />
        </mesh>
      </group>

      {/* ── 5. Studio Over-Ear Headphones (Resting on duvet near pillow) ── */}
      <group position={[-0.10, 0.022, -0.55]} rotation={[0.08, 0.42, 0]}>
        {/* Headband Arch */}
        <mesh position={[0, 0.045, 0]} rotation={[0, 0, 0]}>
          <torusGeometry args={[0.065, 0.007, 8, 16, Math.PI]} />
          <meshStandardMaterial color="#273246" roughness={0.6} />
        </mesh>
        {/* Left Ear Cup */}
        <group position={[-0.065, 0.015, 0]} rotation={[0, 0, 0.2]}>
          <mesh>
            <cylinderGeometry args={[0.028, 0.028, 0.016, 16]} />
            <meshStandardMaterial color="#1E2024" roughness={0.4} metalness={0.7} />
          </mesh>
          {/* Soft Leather Cushion */}
          <mesh position={[0.004, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <torusGeometry args={[0.022, 0.007, 8, 16]} />
            <meshStandardMaterial color="#18191C" roughness={0.9} />
          </mesh>
        </group>
        {/* Right Ear Cup */}
        <group position={[0.065, 0.015, 0]} rotation={[0, 0, -0.2]}>
          <mesh>
            <cylinderGeometry args={[0.028, 0.028, 0.016, 16]} />
            <meshStandardMaterial color="#1E2024" roughness={0.4} metalness={0.7} />
          </mesh>
          {/* Soft Leather Cushion */}
          <mesh position={[-0.004, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <torusGeometry args={[0.022, 0.007, 8, 16]} />
            <meshStandardMaterial color="#18191C" roughness={0.9} />
          </mesh>
        </group>
      </group>

    </group>
  );
}

