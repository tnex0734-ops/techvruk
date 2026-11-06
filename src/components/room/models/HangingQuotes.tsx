"use client";

import React, { useRef, useState, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { RoundedBox } from "@react-three/drei";
import { ROOM_DIMENSIONS } from "../roomDimensions";
import { RoomMaterials } from "../RoomMaterials";

interface HangingQuotesProps {
  materials: RoomMaterials;
}

interface QuoteFrameItemProps {
  materials: RoomMaterials;
  printMaterial: THREE.Material;
  width: number;
  height: number;
  printWidth: number;
  printHeight: number;
  tiltSign: number;
  position: [number, number, number];
  name: string;
}

function InteractiveQuoteFrame({
  materials,
  printMaterial,
  width,
  height,
  printWidth,
  printHeight,
  tiltSign,
  position,
  name,
}: QuoteFrameItemProps) {
  const { invalidate } = useThree();
  const groupRef = useRef<THREE.Group>(null);
  const [isHovered, setIsHovered] = useState(false);
  const zOffsetRef = useRef(0);
  const rotZRef = useRef(0);
  const isMovingRef = useRef(false);
  const prefersReducedMotionRef = useRef(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      prefersReducedMotionRef.current = mq.matches;
      const handler = (e: MediaQueryListEvent) => {
        prefersReducedMotionRef.current = e.matches;
      };
      mq.addEventListener("change", handler);
      return () => mq.removeEventListener("change", handler);
    }
  }, []);

  useEffect(() => {
    isMovingRef.current = true;
    invalidate();
  }, [isHovered, invalidate]);

  useFrame((_, delta) => {
    if (!isMovingRef.current) return;

    const targetZ = isHovered ? 0.016 : 0;
    const targetRotZ = isHovered ? tiltSign * 0.03 : 0;

    if (prefersReducedMotionRef.current) {
      zOffsetRef.current = targetZ;
      rotZRef.current = targetRotZ;
      isMovingRef.current = false;
    } else {
      const speed = Math.min(1, delta * 6.0);
      zOffsetRef.current = THREE.MathUtils.lerp(zOffsetRef.current, targetZ, speed);
      rotZRef.current = THREE.MathUtils.lerp(rotZRef.current, targetRotZ, speed);

      if (
        Math.abs(zOffsetRef.current - targetZ) < 0.0005 &&
        Math.abs(rotZRef.current - targetRotZ) < 0.001
      ) {
        zOffsetRef.current = targetZ;
        rotZRef.current = targetRotZ;
        isMovingRef.current = false;
      } else {
        invalidate();
      }
    }

    if (groupRef.current) {
      groupRef.current.position.z = position[2] + zOffsetRef.current;
      groupRef.current.rotation.z = rotZRef.current;
    }
  });

  return (
    <group
      ref={groupRef}
      position={position}
      name={name}
      onPointerOver={(e) => {
        e.stopPropagation();
        document.body.style.cursor = "pointer";
        setIsHovered(true);
      }}
      onPointerOut={() => {
        document.body.style.cursor = "auto";
        setIsHovered(false);
      }}
    >
      {/* Outer Black Timber Frame */}
      <RoundedBox
        args={[width, height, 0.024]}
        radius={0.005}
        smoothness={3}
        material={materials.metalDark}
        position={[0, 0, 0]}
      />

      {/* Archival White Museum Matting */}
      <mesh position={[0, 0, 0.008]} material={materials.fabricWhite}>
        <boxGeometry args={[width - 0.05, height - 0.05, 0.004]} />
      </mesh>

      {/* High-Resolution Printed Typography Artwork */}
      <mesh position={[0, 0, 0.012]} material={printMaterial}>
        <planeGeometry args={[printWidth, printHeight]} />
      </mesh>
    </group>
  );
}

/**
 * High-Fidelity Wall Quotation Frames (Phase 3C.2 Animated)
 * 
 * Features:
 * - Solid matte black timber framing with bevelled profiles.
 * - Archival museum white matting.
 * - Real, readable grotesque typography prints ("MAKE IDEAS REAL." and "DESIGN WITH INTENT.").
 * - Interactive hover lift and subtle dynamic tilt with demand rendering.
 * - Full reduced-motion accessibility support.
 */
export function HangingQuotes({ materials }: HangingQuotesProps) {
  const basePos = ROOM_DIMENSIONS.accessories.hangingQuotesPos;

  return (
    <group position={basePos} name="hanging-quotes-module">
      {/* ── Frame 1 (Left: "MAKE IDEAS REAL.") ── */}
      <InteractiveQuoteFrame
        materials={materials}
        printMaterial={materials.quotePrint1}
        width={0.48}
        height={0.62}
        printWidth={0.36}
        printHeight={0.48}
        tiltSign={-1}
        position={[-0.34, 0, 0]}
        name="quote-frame-1"
      />

      {/* ── Frame 2 (Right: "DESIGN WITH INTENT.") ── */}
      <InteractiveQuoteFrame
        materials={materials}
        printMaterial={materials.quotePrint2}
        width={0.42}
        height={0.52}
        printWidth={0.31}
        printHeight={0.40}
        tiltSign={1}
        position={[0.34, 0.06, 0]}
        name="quote-frame-2"
      />
    </group>
  );
}

