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

        {/* ── High-Contrast Charcoal Desk Pad ── */}
        <mesh position={[0, d.desk.topThickness / 2 + 0.001, 0.04]} material={materials.deskMat}>
          <boxGeometry args={[0.92, 0.003, 0.48]} />
        </mesh>

        {/* ── Laptop on Stand (Identifiable Modern Silhouette) ── */}
        <group position={[0, d.desk.topThickness / 2, 0]} name="laptop-setup">
          {/* Aluminum Stand Base & Upright Arms */}
          <mesh position={[0, 0.004, -0.07]} material={materials.metalSilver}>
            <boxGeometry args={[0.22, 0.008, 0.20]} />
          </mesh>
          {/* Dual Stand Risers */}
          <mesh position={[-0.08, 0.06, -0.08]} material={materials.metalSilver}>
            <boxGeometry args={[0.02, 0.11, 0.02]} />
          </mesh>
          <mesh position={[0.08, 0.06, -0.08]} material={materials.metalSilver}>
            <boxGeometry args={[0.02, 0.11, 0.02]} />
          </mesh>

          {/* Angled Laptop Chassis in Aluminum */}
          <group position={[0, 0.11, -0.06]} rotation={[-0.24, 0, 0]}>
            {/* Laptop Base Body (Silver Anodized Aluminum) */}
            <mesh position={[0, 0, 0]} material={materials.metalAluminum}>
              <boxGeometry args={[d.laptop.baseWidth, d.laptop.baseHeight, d.laptop.baseDepth]} />
            </mesh>
            {/* Recessed Keyboard Well (Dark Graphite) */}
            <mesh position={[0, 0.006, -0.01]} material={materials.metalDark}>
              <boxGeometry args={[0.27, 0.002, 0.12]} />
            </mesh>
            {/* Keyrow proxy slats for tactile silhouette */}
            {[-0.045, -0.02, 0.005, 0.03].map((zRow, idx) => (
              <mesh key={`keyrow-${idx}`} position={[0, 0.0075, zRow]} material={materials.metalSilver}>
                <boxGeometry args={[0.26, 0.0015, 0.016]} />
              </mesh>
            ))}
            {/* Precision Trackpad Plate */}
            <mesh position={[0, 0.006, 0.075]} material={materials.metalSilver}>
              <boxGeometry args={[0.11, 0.002, 0.06]} />
            </mesh>

            {/* Laptop Display Lid (Open at 110° relative to base) */}
            <group position={[0, 0.006, -d.laptop.baseDepth / 2]} rotation={[1.92, 0, 0]}>
              {/* Outer Lid Shell (Silver Anodized Aluminum) */}
              <mesh position={[0, d.laptop.screenHeight / 2, -0.004]} material={materials.metalAluminum}>
                <boxGeometry args={[d.laptop.baseWidth, d.laptop.screenHeight, 0.008]} />
              </mesh>
              {/* Thin Dark Display Bezel */}
              <mesh position={[0, d.laptop.screenHeight / 2, 0.0005]} material={materials.metalDark}>
                <boxGeometry args={[d.laptop.baseWidth, d.laptop.screenHeight, 0.001]} />
              </mesh>
              {/* Active Screen Display (Crisp Illuminated Glow) */}
              <mesh position={[0, d.laptop.screenHeight / 2, 0.0015]} material={materials.screenGlow}>
                <boxGeometry args={[d.laptop.baseWidth - 0.022, d.laptop.screenHeight - 0.022, 0.001]} />
              </mesh>
              {/* Minimalist UI Layout Wireframe on Display */}
              <mesh position={[0, d.laptop.screenHeight - 0.025, 0.0025]} material={materials.metalDark}>
                <boxGeometry args={[d.laptop.baseWidth - 0.04, 0.012, 0.0005]} />
              </mesh>
              <mesh position={[-0.08, d.laptop.screenHeight / 2 - 0.01, 0.0025]} material={materials.accentRed}>
                <boxGeometry args={[0.06, d.laptop.screenHeight - 0.07, 0.0005]} />
              </mesh>
              <mesh position={[0.04, d.laptop.screenHeight / 2 - 0.01, 0.0025]} material={materials.woodTrim}>
                <boxGeometry args={[0.14, d.laptop.screenHeight - 0.07, 0.0005]} />
              </mesh>
            </group>
          </group>

          {/* ── External Keyboard & Mouse on Desk Pad ── */}
          <group position={[0, 0.004, 0.20]}>
            {/* Keyboard Body in Silver Aluminum */}
            <mesh position={[-0.04, 0.004, 0]} material={materials.metalAluminum}>
              <boxGeometry args={[0.31, 0.009, 0.12]} />
            </mesh>
            {/* Keyboard Keys in Graphite */}
            <mesh position={[-0.04, 0.009, 0]} material={materials.metalDark}>
              <boxGeometry args={[0.29, 0.004, 0.10]} />
            </mesh>
            {/* Ergonomic Wireless Mouse */}
            <mesh position={[0.25, 0.012, 0]} material={materials.metalDark}>
              <boxGeometry args={[0.065, 0.022, 0.11]} />
            </mesh>
            {/* Mouse Scroll Wheel Accent */}
            <mesh position={[0.25, 0.024, -0.02]} material={materials.metalSilver}>
              <boxGeometry args={[0.008, 0.004, 0.02]} />
            </mesh>
          </group>

          {/* ── Glass Fishbowl Proxy with Water & Swimmer Accent ── */}
          <group position={[0.56, 0, -0.16]} name="fishbowl">
            {/* Turned Wood Base Stand */}
            <mesh position={[0, 0.01, 0]} material={materials.woodTrim}>
              <cylinderGeometry args={[0.08, 0.09, 0.02, 16]} />
            </mesh>
            {/* Translucent Glass Sphere Bowl */}
            <mesh position={[0, 0.13, 0]} material={materials.glass}>
              <sphereGeometry args={[0.13, 24, 24]} />
            </mesh>
            {/* Water Volume Inside */}
            <mesh position={[0, 0.10, 0]} material={materials.water}>
              <sphereGeometry args={[0.11, 16, 16]} />
            </mesh>
            {/* Tiny Swimmer Proxy Accent */}
            <mesh position={[0.03, 0.10, 0.02]} rotation={[0, 0.6, 0]} material={materials.fishAccent}>
              <boxGeometry args={[0.032, 0.014, 0.008]} />
            </mesh>
          </group>

          {/* ── Desk Plant Pot with Layered Architectural Leaves ── */}
          <group position={[-0.60, 0, -0.16]} name="desk-plant">
            {/* Matte Ceramic Pot */}
            <mesh position={[0, 0.07, 0]} material={materials.plantPot}>
              <cylinderGeometry args={[0.08, 0.06, 0.14, 16]} />
            </mesh>
            {/* Layered Architectural Foliage */}
            <mesh position={[0, 0.17, 0]} material={materials.plantLeaf}>
              <sphereGeometry args={[0.10, 12, 12]} />
            </mesh>
            <mesh position={[-0.04, 0.22, 0.02]} rotation={[0.3, 0.4, -0.2]} material={materials.plantLeaf}>
              <boxGeometry args={[0.09, 0.005, 0.07]} />
            </mesh>
            <mesh position={[0.04, 0.23, -0.02]} rotation={[-0.2, -0.5, 0.3]} material={materials.plantLeaf}>
              <boxGeometry args={[0.08, 0.005, 0.08]} />
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
        {/* Tiered Architectural Foliage Canopy */}
        <mesh position={[0, 0.52, 0]} material={materials.plantLeaf}>
          <cylinderGeometry args={[0.28, 0.08, 0.36, 12]} />
        </mesh>
        <mesh position={[0, 0.74, 0]} material={materials.plantLeaf}>
          <cylinderGeometry args={[0.20, 0.04, 0.28, 10]} />
        </mesh>
      </group>

      {/* ── Hanging Quotation Frames (Above Desk on Back Wall) ── */}
      <group position={d.accessories.hangingQuotesPos} name="hanging-quotes">
        {/* Quote Frame 1 (Left: Editorial Graphic Quote) */}
        <group position={[-0.32, 0, 0]}>
          <mesh material={materials.metalDark}>
            <boxGeometry args={[0.42, 0.54, 0.02]} />
          </mesh>
          <mesh position={[0, 0, 0.012]} material={materials.fabricWhite}>
            <boxGeometry args={[0.36, 0.48, 0.002]} />
          </mesh>
          {/* Signature Red Typography Line Accent */}
          <mesh position={[0, 0.06, 0.014]} material={materials.accentRed}>
            <boxGeometry args={[0.26, 0.006, 0.001]} />
          </mesh>
          <mesh position={[0, 0.02, 0.014]} material={materials.metalDark}>
            <boxGeometry args={[0.24, 0.004, 0.001]} />
          </mesh>
          <mesh position={[-0.04, -0.02, 0.014]} material={materials.woodTrim}>
            <boxGeometry args={[0.16, 0.004, 0.001]} />
          </mesh>
        </group>

        {/* Quote Frame 2 (Right: Minimalist Typography Print) */}
        <group position={[0.32, 0.08, 0]}>
          <mesh material={materials.metalDark}>
            <boxGeometry args={[0.36, 0.46, 0.02]} />
          </mesh>
          <mesh position={[0, 0, 0.012]} material={materials.fabricWhite}>
            <boxGeometry args={[0.30, 0.40, 0.002]} />
          </mesh>
          <mesh position={[0, 0.04, 0.014]} material={materials.metalDark}>
            <boxGeometry args={[0.20, 0.004, 0.001]} />
          </mesh>
          <mesh position={[0, -0.01, 0.014]} material={materials.accentRed}>
            <boxGeometry args={[0.18, 0.004, 0.001]} />
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

      {/* ── 3B. Window (Right Wall Architectural Opening with Natural Daylight) ── */}
      <group position={d.window.position} rotation={[0, -Math.PI / 2, 0]} name="window">
        {/* Exterior Daylight Backdrop: Illuminates the window aperture with soft warm daylight */}
        <mesh position={[0, 0, -0.06]} material={materials.daylightBackdrop}>
          <planeGeometry args={[d.window.width + 0.20, d.window.height + 0.20]} />
        </mesh>

        {/* Window Architectural Outer Frame / Casing */}
        <mesh material={materials.windowFrame}>
          <boxGeometry args={[d.window.width, d.window.height, 0.14]} />
        </mesh>

        {/* Semi-Translucent Window Glass with Sky Tint */}
        <mesh position={[0, 0, 0]} material={materials.glass}>
          <boxGeometry args={[d.window.width - 0.08, d.window.height - 0.08, 0.015]} />
        </mesh>

        {/* Architectural Window Mullions (4-Pane Pattern) */}
        {/* Horizontal Mullion */}
        <mesh position={[0, 0.12, 0.01]} material={materials.windowFrame}>
          <boxGeometry args={[d.window.width - 0.08, 0.04, 0.05]} />
        </mesh>
        {/* Vertical Mullion */}
        <mesh position={[0, 0, 0.01]} material={materials.windowFrame}>
          <boxGeometry args={[0.04, d.window.height - 0.08, 0.05]} />
        </mesh>

        {/* Interior Wooden Window Sill Shelf */}
        <mesh position={[0, -d.window.height / 2 - 0.02, 0.10]} material={materials.woodLight}>
          <boxGeometry args={[d.window.width + 0.14, 0.04, 0.22]} />
        </mesh>
      </group>

      {/* ── 3C. Door (Right Wall Architectural Entrance with Ajar Leaf) ── */}
      <group position={d.door.position} rotation={[0, -Math.PI / 2, 0]} name="door">
        {/* Architectural 3-Sided Door Casing / Architrave Frame */}
        {/* Left Jamb */}
        <mesh position={[-d.door.width / 2 + 0.03, 0, 0]} material={materials.doorFrame}>
          <boxGeometry args={[0.06, d.door.height, 0.16]} />
        </mesh>
        {/* Right Jamb */}
        <mesh position={[d.door.width / 2 - 0.03, 0, 0]} material={materials.doorFrame}>
          <boxGeometry args={[0.06, d.door.height, 0.16]} />
        </mesh>
        {/* Top Header */}
        <mesh position={[0, d.door.height / 2 - 0.03, 0]} material={materials.doorFrame}>
          <boxGeometry args={[d.door.width, 0.06, 0.16]} />
        </mesh>
        {/* Floor Threshold Strip */}
        <mesh position={[0, -d.door.height / 2 + 0.01, 0]} material={materials.woodTrim}>
          <boxGeometry args={[d.door.width, 0.02, 0.18]} />
        </mesh>

        {/* Distinct Door Leaf Panel — Swung Inward Ajar by 18° for immediate architectural realism */}
        <group position={[-d.door.width / 2 + 0.06, 0, 0]} rotation={[0, 0.31, 0]}>
          {/* Main Door Leaf Slab */}
          <mesh position={[(d.door.width - 0.10) / 2, 0, 0]} material={materials.doorPanel}>
            <boxGeometry args={[d.door.width - 0.10, d.door.height - 0.07, 0.045]} />
          </mesh>
          {/* Subtle Inset Door Molding Lines */}
          <mesh position={[(d.door.width - 0.10) / 2, 0.35, 0.024]} material={materials.woodTrim}>
            <boxGeometry args={[d.door.width - 0.22, 0.85, 0.003]} />
          </mesh>
          <mesh position={[(d.door.width - 0.10) / 2, -0.45, 0.024]} material={materials.woodTrim}>
            <boxGeometry args={[d.door.width - 0.22, 0.65, 0.003]} />
          </mesh>

          {/* Architectural Lever Handle & Escutcheon Plate */}
          <group position={[d.door.width - 0.18, 0, 0.026]}>
            {/* Escutcheon Backplate */}
            <mesh material={materials.metalDark}>
              <boxGeometry args={[0.035, 0.16, 0.006]} />
            </mesh>
            {/* Horizontal Lever Handle */}
            <mesh position={[0.04, 0.02, 0.03]} material={materials.metalDark}>
              <boxGeometry args={[0.11, 0.02, 0.02]} />
            </mesh>
          </group>
        </group>
      </group>

    </group>
  );
}
