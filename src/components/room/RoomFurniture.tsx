"use client";

import React, { useMemo } from "react";
import { ROOM_DIMENSIONS } from "./roomDimensions";
import { createRoomMaterials } from "./RoomMaterials";

/**
 * Architectural Blockout Furniture
 * 
 * Arranged strictly according to specification:
 * - LEFT: Cupboards (Storage / Archive).
 * - CORNER: Workstation (Desk, Laptop, Stand, Keyboard, Mouse, Fishbowl, Plant, Quotes).
 * - RIGHT: Bed, Window, Door.
 */

export function RoomFurniture() {
  const materials = useMemo(() => createRoomMaterials(), []);
  const d = ROOM_DIMENSIONS;

  return (
    <group name="room-furniture">
      
      {/* ══════════════════════════════════════════════════════════════ */}
      {/*  1. LEFT WALL: CUPBOARDS (Storage / Experience Archive)        */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <group position={d.cupboard.position} name="cupboards">
        {/* Plinth (Recessed Base Kickboard) */}
        <mesh position={[0.02, -d.cupboard.height / 2 + 0.04, 0]} material={materials.woodTrim}>
          <boxGeometry args={[d.cupboard.width - 0.04, 0.08, d.cupboard.length]} />
        </mesh>

        {/* Main Cabinet Carcass */}
        <mesh position={[0, 0.04, 0]} material={materials.woodLight}>
          <boxGeometry args={[d.cupboard.width, d.cupboard.height - 0.08, d.cupboard.length]} />
        </mesh>

        {/* 3 Vertical Door Panels with Seams (Facing Interior +X) */}
        {[-1.05, 0, 1.05].map((zOffset, idx) => (
          <group key={`door-${idx}`} position={[d.cupboard.width / 2 + 0.005, 0.04, zOffset]}>
            {/* Door Panel Front */}
            <mesh material={materials.woodLight}>
              <boxGeometry args={[0.015, d.cupboard.height - 0.12, 1.02]} />
            </mesh>
            {/* Slim Vertical Handle */}
            <mesh position={[0.012, 0, -0.42]} material={materials.metalDark}>
              <boxGeometry args={[0.012, 0.45, 0.018]} />
            </mesh>
            {/* Vertical Door Shadow Reveal Line */}
            <mesh position={[0.008, 0, 0.51]} material={materials.woodTrim}>
              <boxGeometry args={[0.002, d.cupboard.height - 0.12, 0.01]} />
            </mesh>
          </group>
        ))}

        {/* Top Cornice Cap */}
        <mesh position={[0, d.cupboard.height / 2 + 0.015, 0]} material={materials.woodTrim}>
          <boxGeometry args={[d.cupboard.width + 0.02, 0.03, d.cupboard.length + 0.02]} />
        </mesh>
      </group>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/*  2. CORNER WORKSTATION (The Creative Focal Zone)              */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <group position={d.desk.position} name="workstation">
        {/* Desktop Surface */}
        <mesh position={[0, 0, 0]} material={materials.woodLight}>
          <boxGeometry args={[d.desk.width, d.desk.topThickness, d.desk.depth]} />
        </mesh>

        {/* Minimalist Architectural Steel Frame & Legs */}
        {/* Left Leg Frame */}
        <mesh position={[-d.desk.width / 2 + 0.06, -d.desk.height / 2 + d.desk.topThickness / 2, 0]} material={materials.metalDark}>
          <boxGeometry args={[0.04, d.desk.height - d.desk.topThickness, d.desk.depth - 0.12]} />
        </mesh>
        {/* Right Leg Frame */}
        <mesh position={[d.desk.width / 2 - 0.06, -d.desk.height / 2 + d.desk.topThickness / 2, 0]} material={materials.metalDark}>
          <boxGeometry args={[0.04, d.desk.height - d.desk.topThickness, d.desk.depth - 0.12]} />
        </mesh>
        {/* Rear Stretcher Bar */}
        <mesh position={[0, -0.15, -d.desk.depth / 2 + 0.08]} material={materials.metalDark}>
          <boxGeometry args={[d.desk.width - 0.16, 0.03, 0.03]} />
        </mesh>

        {/* ── Studio Ergonomic Chair Proxy ── */}
        <group position={[0, -d.desk.height / 2, 0.55]} name="chair">
          {/* Chair Base (Wheeled 5-star cylinder) */}
          <mesh position={[0, 0.06, 0]} material={materials.metalDark}>
            <cylinderGeometry args={[0.28, 0.28, 0.04, 16]} />
          </mesh>
          {/* Hydraulic Cylinder */}
          <mesh position={[0, 0.22, 0]} material={materials.metalDark}>
            <cylinderGeometry args={[0.03, 0.03, 0.32, 12]} />
          </mesh>
          {/* Seat Cushion (Restrained Portfolio Red Accent) */}
          <mesh position={[0, 0.42, 0]} material={materials.accentRed}>
            <boxGeometry args={[0.46, 0.08, 0.46]} />
          </mesh>
          {/* Ergonomic Curved Backrest */}
          <mesh position={[0, 0.72, 0.20]} material={materials.metalDark}>
            <boxGeometry args={[0.42, 0.44, 0.04]} />
          </mesh>
        </group>

        {/* ── Laptop on Stand (Focal Hero Asset) ── */}
        <group position={[0, d.desk.topThickness / 2, 0]} name="laptop-setup">
          {/* Aluminum Stand Base & Riser */}
          <mesh position={[0, 0.045, -0.06]} material={materials.metalSilver}>
            <boxGeometry args={[0.22, 0.09, 0.18]} />
          </mesh>
          {/* Angled Laptop Cradle */}
          <group position={[0, 0.09, -0.04]} rotation={[-0.22, 0, 0]}>
            {/* Laptop Base Chassis */}
            <mesh position={[0, 0, 0]} material={materials.metalDark}>
              <boxGeometry args={[d.laptop.baseWidth, d.laptop.baseHeight, d.laptop.baseDepth]} />
            </mesh>
            {/* Keyboard Well Relief */}
            <mesh position={[0, 0.007, 0.01]} material={materials.woodTrim}>
              <boxGeometry args={[0.28, 0.002, 0.11]} />
            </mesh>
            {/* Trackpad Proxy */}
            <mesh position={[0, 0.007, 0.08]} material={materials.metalSilver}>
              <boxGeometry args={[0.11, 0.002, 0.06]} />
            </mesh>

            {/* Laptop Display Lid (Open at 115° relative to base) */}
            <group position={[0, 0.006, -d.laptop.baseDepth / 2]} rotation={[1.95, 0, 0]}>
              {/* Outer Display Shell */}
              <mesh position={[0, d.laptop.screenHeight / 2, -0.004]} material={materials.metalDark}>
                <boxGeometry args={[d.laptop.baseWidth, d.laptop.screenHeight, 0.008]} />
              </mesh>
              {/* Active Screen Display (Soft Warm Emissive Glow) */}
              <mesh position={[0, d.laptop.screenHeight / 2, 0.001]} material={materials.screenGlow}>
                <boxGeometry args={[d.laptop.baseWidth - 0.02, d.laptop.screenHeight - 0.02, 0.002]} />
              </mesh>
            </group>
          </group>

          {/* ── External Keyboard & Mouse Proxies ── */}
          <group position={[0, 0.008, 0.22]}>
            {/* Keyboard */}
            <mesh position={[-0.04, 0.006, 0]} material={materials.metalDark}>
              <boxGeometry args={[0.30, 0.012, 0.12]} />
            </mesh>
            {/* Mouse */}
            <mesh position={[0.24, 0.014, 0]} material={materials.metalDark}>
              <boxGeometry args={[0.07, 0.024, 0.11]} />
            </mesh>
          </group>

          {/* ── Glass Fishbowl Proxy ── */}
          <group position={[0.55, 0, -0.16]} name="fishbowl">
            {/* Flat Base Stand */}
            <mesh position={[0, 0.01, 0]} material={materials.woodTrim}>
              <cylinderGeometry args={[0.08, 0.09, 0.02, 16]} />
            </mesh>
            {/* Glass Sphere Bowl */}
            <mesh position={[0, 0.13, 0]} material={materials.glass}>
              <sphereGeometry args={[0.13, 24, 24]} />
            </mesh>
            {/* Water Volume Inside */}
            <mesh position={[0, 0.10, 0]} material={materials.water}>
              <sphereGeometry args={[0.11, 16, 16]} />
            </mesh>
          </group>

          {/* ── Desk Plant Pot Proxy ── */}
          <group position={[-0.62, 0, -0.18]} name="desk-plant">
            {/* Ceramic Pot */}
            <mesh position={[0, 0.07, 0]} material={materials.plantPot}>
              <cylinderGeometry args={[0.08, 0.06, 0.14, 16]} />
            </mesh>
            {/* Architectural Foliage Blockout */}
            <mesh position={[0, 0.18, 0]} material={materials.plantLeaf}>
              <sphereGeometry args={[0.10, 12, 12]} />
            </mesh>
          </group>
        </group>
      </group>

      {/* ── Corner Floor Plant (Behind/Beside Desk) ── */}
      <group position={d.accessories.plantPos} name="floor-plant">
        {/* Ceramic Planter */}
        <mesh position={[0, 0.22, 0]} material={materials.plantPot}>
          <cylinderGeometry args={[0.18, 0.14, 0.44, 16]} />
        </mesh>
        {/* Architectural Foliage Canopy */}
        <mesh position={[0, 0.58, 0]} material={materials.plantLeaf}>
          <cylinderGeometry args={[0.28, 0.05, 0.48, 8]} />
        </mesh>
      </group>

      {/* ── Hanging Quotation Frames (Above Desk on Back Wall) ── */}
      <group position={d.accessories.hangingQuotesPos} name="hanging-quotes">
        {/* Quote Frame 1 (Left) */}
        <group position={[-0.32, 0, 0]}>
          <mesh material={materials.metalDark}>
            <boxGeometry args={[0.42, 0.54, 0.02]} />
          </mesh>
          <mesh position={[0, 0, 0.012]} material={materials.fabricWhite}>
            <boxGeometry args={[0.36, 0.48, 0.002]} />
          </mesh>
          {/* Subtle Red Mat Line */}
          <mesh position={[0, 0, 0.014]} material={materials.accentRed}>
            <boxGeometry args={[0.28, 0.004, 0.001]} />
          </mesh>
        </group>

        {/* Quote Frame 2 (Right) */}
        <group position={[0.32, 0.08, 0]}>
          <mesh material={materials.metalDark}>
            <boxGeometry args={[0.36, 0.46, 0.02]} />
          </mesh>
          <mesh position={[0, 0, 0.012]} material={materials.fabricWhite}>
            <boxGeometry args={[0.30, 0.40, 0.002]} />
          </mesh>
        </group>
      </group>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/*  3. RIGHT SIDE: BED, WINDOW, DOOR                             */}
      {/* ══════════════════════════════════════════════════════════════ */}

      {/* ── 3A. Bed (Platform Bed with Headboard against Back Wall) ── */}
      <group position={d.bed.position} name="bed">
        {/* Headboard against Back Wall */}
        <mesh position={[0, d.bed.headboardHeight / 2 - 0.26, -d.bed.length / 2 + 0.04]} material={materials.woodLight}>
          <boxGeometry args={[d.bed.width, d.bed.headboardHeight, 0.08]} />
        </mesh>

        {/* Bed Platform Frame */}
        <mesh position={[0, 0.12, 0]} material={materials.woodLight}>
          <boxGeometry args={[d.bed.width, 0.24, d.bed.length]} />
        </mesh>

        {/* Mattress */}
        <mesh position={[0, 0.35, 0.04]} material={materials.fabricWhite}>
          <boxGeometry args={[d.bed.width - 0.08, 0.24, d.bed.length - 0.10]} />
        </mesh>

        {/* Pillows */}
        <mesh position={[-0.40, 0.52, -d.bed.length / 2 + 0.38]} rotation={[-0.18, 0, 0]} material={materials.fabricPillow}>
          <boxGeometry args={[0.55, 0.14, 0.38]} />
        </mesh>
        <mesh position={[0.40, 0.52, -d.bed.length / 2 + 0.38]} rotation={[-0.18, 0, 0]} material={materials.fabricPillow}>
          <boxGeometry args={[0.55, 0.14, 0.38]} />
        </mesh>

        {/* Folded Duvet / Blanket Throw (Foot of Bed) */}
        <mesh position={[0, 0.49, 0.45]} material={materials.fabricThrow}>
          <boxGeometry args={[d.bed.width - 0.06, 0.06, 1.05]} />
        </mesh>
      </group>

      {/* ── 3B. Window (Right Wall Architectural Opening) ── */}
      <group position={d.window.position} rotation={[0, -Math.PI / 2, 0]} name="window">
        {/* Window Outer Frame */}
        <mesh material={materials.metalDark}>
          <boxGeometry args={[d.window.width, d.window.height, 0.12]} />
        </mesh>
        {/* Glass Pane */}
        <mesh position={[0, 0, 0]} material={materials.glass}>
          <boxGeometry args={[d.window.width - 0.10, d.window.height - 0.10, 0.01]} />
        </mesh>
        {/* Horizontal Mullion Divider */}
        <mesh position={[0, 0.15, 0.01]} material={materials.metalDark}>
          <boxGeometry args={[d.window.width - 0.10, 0.03, 0.04]} />
        </mesh>
        {/* Vertical Mullion Divider */}
        <mesh position={[0, 0, 0.01]} material={materials.metalDark}>
          <boxGeometry args={[0.03, d.window.height - 0.10, 0.04]} />
        </mesh>
        {/* Interior Wooden Window Sill */}
        <mesh position={[0, -d.window.height / 2 - 0.02, 0.08]} material={materials.woodTrim}>
          <boxGeometry args={[d.window.width + 0.12, 0.04, 0.22]} />
        </mesh>
      </group>

      {/* ── 3C. Door (Right Wall Flush Interior Door) ── */}
      <group position={d.door.position} rotation={[0, -Math.PI / 2, 0]} name="door">
        {/* Door Frame Trim */}
        <mesh material={materials.woodTrim}>
          <boxGeometry args={[d.door.width, d.door.height, 0.12]} />
        </mesh>
        {/* Flush Door Panel */}
        <mesh position={[0, 0, 0]} material={materials.doorPanel}>
          <boxGeometry args={[d.door.width - 0.06, d.door.height - 0.06, 0.04]} />
        </mesh>
        {/* Door Handle Lever */}
        <mesh position={[d.door.width / 2 - 0.12, 0, 0.045]} material={materials.metalDark}>
          <boxGeometry args={[0.12, 0.025, 0.04]} />
        </mesh>
      </group>

    </group>
  );
}
