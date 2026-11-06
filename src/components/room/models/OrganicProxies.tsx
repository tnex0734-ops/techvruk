"use client";

import React from "react";
import { ROOM_DIMENSIONS } from "../roomDimensions";
import { RoomMaterials } from "../RoomMaterials";

interface OrganicProxiesProps {
  materials: RoomMaterials;
}

/**
 * Clean Temporary Organic Placeholders (Reserved for Phase 3B.2)
 * 
 * - Glass spherical fishbowl with water level and miniature orange swimmer proxy.
 * - Minimalist ceramic desk plant pot with geometric foliage.
 * - Corner ceramic floor planter with tiered tropical leaf proxy.
 * 
 * In Phase 3B.2, these will be replaced with realistic organic 3D models and animated fish simulation.
 */
export function OrganicProxies({ materials }: OrganicProxiesProps) {
  const deskX = ROOM_DIMENSIONS.desk.position[0];
  const deskY = ROOM_DIMENSIONS.desk.position[1] + ROOM_DIMENSIONS.desk.topThickness / 2;
  const deskZ = ROOM_DIMENSIONS.desk.position[2];
  const floorPlantPos = ROOM_DIMENSIONS.accessories.plantPos;

  return (
    <group name="organic-placeholders">
      {/* ── 1. Desk Glass Fishbowl Proxy ── */}
      <group position={[deskX + 0.56, deskY, deskZ - 0.16]} name="fishbowl-proxy">
        {/* Turned Wooden Base Stand */}
        <mesh position={[0, 0.012, 0]} material={materials.woodTrim}>
          <cylinderGeometry args={[0.08, 0.095, 0.024, 24]} />
        </mesh>
        {/* Physical Translucent Glass Sphere */}
        <mesh position={[0, 0.135, 0]} material={materials.glass}>
          <sphereGeometry args={[0.135, 32, 32]} />
        </mesh>
        {/* Transparent Water Volume */}
        <mesh position={[0, 0.105, 0]} material={materials.water}>
          <sphereGeometry args={[0.115, 24, 24]} />
        </mesh>
        {/* Swimmer Proxy Accent */}
        <mesh position={[0.03, 0.105, 0.02]} rotation={[0, 0.6, 0]} material={materials.fishAccent}>
          <boxGeometry args={[0.032, 0.014, 0.008]} />
        </mesh>
      </group>

      {/* ── 2. Desk Ceramic Plant Pot Proxy ── */}
      <group position={[deskX - 0.60, deskY, deskZ - 0.16]} name="desk-plant-proxy">
        {/* Matte Ceramic Pot */}
        <mesh position={[0, 0.075, 0]} material={materials.plantPot}>
          <cylinderGeometry args={[0.08, 0.065, 0.15, 24]} />
        </mesh>
        {/* Layered Architectural Foliage Fan */}
        <mesh position={[0, 0.18, 0]} material={materials.plantLeaf}>
          <sphereGeometry args={[0.10, 16, 16]} />
        </mesh>
        <mesh position={[-0.04, 0.23, 0.02]} rotation={[0.3, 0.4, -0.2]} material={materials.plantLeaf}>
          <boxGeometry args={[0.10, 0.006, 0.08]} />
        </mesh>
        <mesh position={[0.04, 0.24, -0.02]} rotation={[-0.2, -0.5, 0.3]} material={materials.plantLeaf}>
          <boxGeometry args={[0.09, 0.006, 0.09]} />
        </mesh>
      </group>

      {/* ── 3. Corner Floor Planter Proxy ── */}
      <group position={floorPlantPos} name="floor-planter-proxy">
        {/* Tapered Ceramic Planter */}
        <mesh position={[0, 0.24, 0]} material={materials.plantPot}>
          <cylinderGeometry args={[0.20, 0.15, 0.48, 24]} />
        </mesh>
        {/* Tiered Architectural Foliage Canopy */}
        <mesh position={[0, 0.55, 0]} material={materials.plantLeaf}>
          <cylinderGeometry args={[0.30, 0.08, 0.38, 16]} />
        </mesh>
        <mesh position={[0, 0.78, 0]} material={materials.plantLeaf}>
          <cylinderGeometry args={[0.22, 0.05, 0.30, 12]} />
        </mesh>
      </group>
    </group>
  );
}

