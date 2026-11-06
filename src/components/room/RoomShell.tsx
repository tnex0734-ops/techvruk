"use client";

import React, { useMemo } from "react";
import { ROOM_DIMENSIONS } from "./roomDimensions";
import { createRoomMaterials } from "./RoomMaterials";

/**
 * Architectural Open-Front Cutaway Shell
 * 
 * - Floor slab with clean architectural thickness.
 * - Solid Back Wall & Left Wall with baseboard trim.
 * - Right Wall with framed architectural cutouts for Window and Door.
 * - Open Front for unobstructed three-quarter viewing without clipping.
 */

export function RoomShell() {
  const materials = useMemo(() => createRoomMaterials(), []);
  const d = ROOM_DIMENSIONS;

  const wt = d.wallThickness;
  const ft = d.floorThickness;
  const h = d.height;
  const halfW = d.width / 2; // 3.6
  const halfD = d.depth / 2; // 2.7

  return (
    <group name="room-shell">
      {/* ── 1. Floor Slab ── */}
      <mesh
        position={[0, -ft / 2, 0]}
        material={materials.floor}
        receiveShadow={false}
      >
        <boxGeometry args={[d.width + wt * 2, ft, d.depth + wt]} />
      </mesh>

      {/* ── 2. Back Wall ── */}
      <mesh
        position={[0, h / 2, -halfD - wt / 2]}
        material={materials.wall}
        receiveShadow={false}
      >
        <boxGeometry args={[d.width + wt * 2, h, wt]} />
      </mesh>

      {/* ── 3. Left Wall ── */}
      <mesh
        position={[-halfW - wt / 2, h / 2, 0]}
        material={materials.wall}
        receiveShadow={false}
      >
        <boxGeometry args={[wt, h, d.depth + wt]} />
      </mesh>

      {/* ── 4. Right Wall with Window & Door Cutouts ── */}
      {/* 4A. Right Wall - Rear Section (Behind Window) */}
      <mesh
        position={[halfW + wt / 2, h / 2, -2.15]}
        material={materials.wallRight}
      >
        <boxGeometry args={[wt, h, 1.10]} />
      </mesh>

      {/* 4B. Right Wall - Below Window (Spandrel) */}
      <mesh
        position={[halfW + wt / 2, d.window.sillHeight / 2, d.window.position[2]]}
        material={materials.wallRight}
      >
        <boxGeometry args={[wt, d.window.sillHeight, d.window.width]} />
      </mesh>

      {/* 4C. Right Wall - Above Window (Lintel) */}
      <mesh
        position={[halfW + wt / 2, (d.window.sillHeight + d.window.height + h) / 2, d.window.position[2]]}
        material={materials.wallRight}
      >
        <boxGeometry args={[wt, h - (d.window.sillHeight + d.window.height), d.window.width]} />
      </mesh>

      {/* 4D. Right Wall - Middle Pier (Between Window and Door) */}
      <mesh
        position={[halfW + wt / 2, h / 2, 0.85]}
        material={materials.wallRight}
      >
        <boxGeometry args={[wt, h, 1.10]} />
      </mesh>

      {/* 4E. Right Wall - Above Door (Door Lintel) */}
      <mesh
        position={[halfW + wt / 2, (d.door.height + h) / 2, d.door.position[2]]}
        material={materials.wallRight}
      >
        <boxGeometry args={[wt, h - d.door.height, d.door.width]} />
      </mesh>

      {/* 4F. Right Wall - Front Corner Post */}
      <mesh
        position={[halfW + wt / 2, h / 2, 2.50]}
        material={materials.wallRight}
      >
        <boxGeometry args={[wt, h, 0.50]} />
      </mesh>

      {/* ── 5. Architectural Skirting / Baseboard Trim ── */}
      {/* Back Wall Skirting */}
      <mesh position={[0, 0.04, -halfD + 0.01]} material={materials.woodTrim}>
        <boxGeometry args={[d.width, 0.08, 0.02]} />
      </mesh>
      {/* Left Wall Skirting */}
      <mesh position={[-halfW + 0.01, 0.04, 0]} material={materials.woodTrim}>
        <boxGeometry args={[0.02, 0.08, d.depth]} />
      </mesh>
    </group>
  );
}
