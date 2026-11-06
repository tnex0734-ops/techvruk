"use client";

import React from "react";
import { RoundedBox } from "@react-three/drei";
import { ROOM_DIMENSIONS } from "../roomDimensions";
import { RoomMaterials } from "../RoomMaterials";

interface HangingQuotesProps {
  materials: RoomMaterials;
}

/**
 * High-Fidelity Wall Quotation Frames
 * 
 * Features:
 * - Solid matte black timber framing with bevelled profiles.
 * - Archival museum white matting.
 * - Real, readable grotesque typography prints ("MAKE IDEAS REAL." and "DESIGN WITH INTENT.").
 * - Protective thin anti-reflective glass cover.
 */
export function HangingQuotes({ materials }: HangingQuotesProps) {
  const basePos = ROOM_DIMENSIONS.accessories.hangingQuotesPos;

  return (
    <group position={basePos} name="hanging-quotes-module">
      
      {/* ── Frame 1 (Left: "MAKE IDEAS REAL.") ── */}
      <group position={[-0.34, 0, 0]} name="quote-frame-1">
        {/* Outer Black Timber Frame */}
        <RoundedBox
          args={[0.48, 0.62, 0.024]}
          radius={0.005}
          smoothness={3}
          material={materials.metalDark}
          position={[0, 0, 0]}
        />

        {/* Archival White Museum Matting */}
        <mesh position={[0, 0, 0.008]} material={materials.fabricWhite}>
          <boxGeometry args={[0.43, 0.57, 0.004]} />
        </mesh>

        {/* High-Resolution Printed Typography Artwork */}
        <mesh position={[0, 0, 0.012]} material={materials.quotePrint1}>
          <planeGeometry args={[0.36, 0.48]} />
        </mesh>
      </group>

      {/* ── Frame 2 (Right: "DESIGN WITH INTENT.") ── */}
      <group position={[0.34, 0.06, 0]} name="quote-frame-2">
        {/* Outer Black Timber Frame */}
        <RoundedBox
          args={[0.42, 0.52, 0.024]}
          radius={0.005}
          smoothness={3}
          material={materials.metalDark}
          position={[0, 0, 0]}
        />

        {/* Archival White Museum Matting */}
        <mesh position={[0, 0, 0.008]} material={materials.fabricWhite}>
          <boxGeometry args={[0.37, 0.47, 0.004]} />
        </mesh>

        {/* High-Resolution Printed Typography Artwork */}
        <mesh position={[0, 0, 0.012]} material={materials.quotePrint2}>
          <planeGeometry args={[0.31, 0.40]} />
        </mesh>
      </group>

    </group>
  );
}

