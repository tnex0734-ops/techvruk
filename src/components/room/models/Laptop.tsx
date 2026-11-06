"use client";

import React, { useMemo, useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { RoundedBox } from "@react-three/drei";
import { ROOM_DIMENSIONS } from "../roomDimensions";
import { RoomMaterials } from "../RoomMaterials";

interface LaptopProps {
  materials: RoomMaterials;
  isHovered?: boolean;
  isSelected?: boolean;
  onSelect?: () => void;
  onHover?: (hovered: boolean) => void;
}

/**
 * High-Fidelity Apple MacBook Pro on Aluminum Ergonomic Stand (Phase 3C.2 Animated)
 * 
 * Features:
 * - Precision aluminum riser stand with angled cradle and retaining lips.
 * - MacBook Pro wedge unibody chassis with rounded corners.
 * - Recessed dark keyboard well with individual QWERTY keycaps and tactile spacebar.
 * - Precision glass trackpad with tactile click perimeter.
 * - MagSafe power connector with dynamic amber/green status LED.
 * - Display lid open at 110° viewing angle with responsive tilt feedback on interaction.
 * - High-resolution active Retina display screen rendering Taushik's Portfolio IDE.
 * - Demand-rendering compliant (invalidates strictly while transitioning).
 * - Full reduced-motion accessibility support.
 */
export function Laptop({
  materials,
  isHovered = false,
  isSelected = false,
  onSelect,
  onHover,
}: LaptopProps) {
  const d = ROOM_DIMENSIONS.laptop;
  const deskY = ROOM_DIMENSIONS.desk.position[1] + ROOM_DIMENSIONS.desk.topThickness / 2;

  const { invalidate } = useThree();
  const lidPivotRef = useRef<THREE.Group>(null);
  const lidAngleRef = useRef(-0.30);
  const isMovingRef = useRef(false);
  const prefersReducedMotionRef = useRef(false);

  // Check prefers-reduced-motion
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

  // Trigger smooth tilt on selection or hover
  useEffect(() => {
    isMovingRef.current = true;
    invalidate();
  }, [isSelected, isHovered, invalidate]);

  // Responsive lid tilt animation strictly integrated with demand rendering
  useFrame((_, delta) => {
    if (!isMovingRef.current) return;

    const targetAngle = isSelected ? -0.36 : (isHovered ? -0.33 : -0.30);

    if (prefersReducedMotionRef.current) {
      lidAngleRef.current = targetAngle;
      isMovingRef.current = false;
    } else {
      const speed = Math.min(1, delta * 5.2);
      lidAngleRef.current = THREE.MathUtils.lerp(lidAngleRef.current, targetAngle, speed);

      if (Math.abs(lidAngleRef.current - targetAngle) < 0.002) {
        lidAngleRef.current = targetAngle;
        isMovingRef.current = false;
      } else {
        invalidate();
      }
    }

    if (lidPivotRef.current) {
      lidPivotRef.current.rotation.x = lidAngleRef.current;
    }
  });

  // Keycap grid layout definitions
  const keyRows = useMemo(() => {
    const rows = [
      { count: 14, width: 0.016, height: 0.008, spacing: 0.019, z: -0.045 }, // Function row
      { count: 14, width: 0.016, height: 0.012, spacing: 0.019, z: -0.030 }, // Number row
      { count: 14, width: 0.016, height: 0.012, spacing: 0.019, z: -0.015 }, // QWERTY row
      { count: 13, width: 0.017, height: 0.012, spacing: 0.020, z: 0.000 },  // ASDF row
      { count: 12, width: 0.019, height: 0.012, spacing: 0.022, z: 0.015 },  // ZXCV row
    ];
    return rows;
  }, []);

  return (
    <group
      position={[d.position[0], deskY, d.position[2]]}
      name="laptop-stand-module"
      onClick={(e) => {
        if (onSelect) {
          e.stopPropagation();
          onSelect();
        }
      }}
      onPointerOver={(e) => {
        if (onHover) {
          e.stopPropagation();
          document.body.style.cursor = "pointer";
          onHover(true);
        }
      }}
      onPointerOut={() => {
        if (onHover) {
          document.body.style.cursor = "auto";
          onHover(false);
        }
      }}
    >
      {/* Invisible Generous Touch / Click Hitbox */}
      <mesh position={[0, 0.16, 0]} visible={false}>
        <boxGeometry args={[0.52, 0.45, 0.48]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
      {/* ══════════════════════════════════════════════════════════════ */}
      {/*  1. ALUMINUM RISER STAND                                       */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <group position={[0, 0, 0]} name="aluminum-stand">
        {/* Base Plate with Anti-Slip Silicone Feet */}
        <RoundedBox
          args={[0.22, 0.008, 0.20]}
          radius={0.004}
          smoothness={3}
          material={materials.metalSilver}
          position={[0, 0.004, -0.05]}
        />
        {/* Silicone Feet */}
        {[-0.09, 0.09].map((x, i) =>
          [-0.13, 0.03].map((z, j) => (
            <mesh key={`foot-${i}-${j}`} position={[x, 0.001, z]} material={materials.metalDark}>
              <cylinderGeometry args={[0.008, 0.008, 0.002, 12]} />
            </mesh>
          ))
        )}

        {/* Dual Angled Supporting Arms (15° Backward Tilt) */}
        <mesh position={[-0.07, 0.062, -0.075]} rotation={[-0.26, 0, 0]} material={materials.metalSilver}>
          <boxGeometry args={[0.022, 0.115, 0.016]} />
        </mesh>
        <mesh position={[0.07, 0.062, -0.075]} rotation={[-0.26, 0, 0]} material={materials.metalSilver}>
          <boxGeometry args={[0.022, 0.115, 0.016]} />
        </mesh>

        {/* Angled Laptop Cradle Platform with Front Retaining Lips */}
        <group position={[0, 0.115, -0.06]} rotation={[-0.24, 0, 0]}>
          {/* Cradle Cross Plate */}
          <mesh position={[0, 0, -0.02]} material={materials.metalSilver}>
            <boxGeometry args={[0.24, 0.006, 0.16]} />
          </mesh>
          {/* Left Retaining Hook */}
          <mesh position={[-0.09, 0.014, 0.06]} material={materials.metalSilver}>
            <boxGeometry args={[0.02, 0.022, 0.012]} />
          </mesh>
          {/* Right Retaining Hook */}
          <mesh position={[0.09, 0.014, 0.06]} material={materials.metalSilver}>
            <boxGeometry args={[0.02, 0.022, 0.012]} />
          </mesh>
        </group>
      </group>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/*  2. LAPTOP CHASSIS & SCREEN (Apple MacBook Pro Silhouette)    */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <group position={[0, 0.125, -0.06]} rotation={[-0.24, 0, 0]} name="macbook-pro">
        
        {/* ── 2A. Unibody Bottom Chassis ── */}
        <RoundedBox
          args={[d.baseWidth, d.baseHeight, d.baseDepth]}
          radius={0.006}
          smoothness={4}
          material={materials.metalAluminum}
          position={[0, 0, 0]}
        />

        {/* Recessed Dark Keyboard Well */}
        <mesh position={[0, d.baseHeight / 2 + 0.0005, -0.015]} material={materials.metalDark}>
          <boxGeometry args={[0.274, 0.001, 0.125]} />
        </mesh>

        {/* Individual QWERTY Keycaps */}
        {keyRows.map((row, rIdx) => {
          const startX = -((row.count - 1) * row.spacing) / 2;
          return Array.from({ length: row.count }).map((_, cIdx) => (
            <mesh
              key={`key-${rIdx}-${cIdx}`}
              position={[
                startX + cIdx * row.spacing,
                d.baseHeight / 2 + 0.0018,
                row.z,
              ]}
              material={materials.keycap}
            >
              <boxGeometry args={[row.width, 0.002, row.height]} />
            </mesh>
          ));
        })}

        {/* Spacebar Row */}
        <group position={[0, d.baseHeight / 2 + 0.0018, 0.032]}>
          {/* Left Modifiers */}
          <mesh position={[-0.105, 0, 0]} material={materials.keycap}>
            <boxGeometry args={[0.025, 0.002, 0.014]} />
          </mesh>
          <mesh position={[-0.075, 0, 0]} material={materials.keycap}>
            <boxGeometry args={[0.025, 0.002, 0.014]} />
          </mesh>
          {/* Prominent Spacebar */}
          <mesh position={[0, 0, 0]} material={materials.keycap}>
            <boxGeometry args={[0.105, 0.002, 0.014]} />
          </mesh>
          {/* Right Modifiers */}
          <mesh position={[0.075, 0, 0]} material={materials.keycap}>
            <boxGeometry args={[0.025, 0.002, 0.014]} />
          </mesh>
          {/* Inverted-T Arrow Keys */}
          <mesh position={[0.110, 0, 0]} material={materials.keycap}>
            <boxGeometry args={[0.022, 0.002, 0.014]} />
          </mesh>
        </group>

        {/* Precision Glass Trackpad */}
        <group position={[0, d.baseHeight / 2 + 0.0008, 0.072]}>
          <mesh material={materials.metalSilver}>
            <boxGeometry args={[0.115, 0.0006, 0.065]} />
          </mesh>
          {/* Click Outline Groove */}
          <mesh position={[0, -0.0002, 0]} material={materials.metalDark}>
            <boxGeometry args={[0.117, 0.0004, 0.067]} />
          </mesh>
        </group>

        {/* MagSafe Power Connector LED Indicator */}
        <group position={[-d.baseWidth / 2 - 0.002, 0.002, -d.baseDepth / 2 + 0.05]} name="magsafe-led">
          <mesh material={materials.metalSilver}>
            <boxGeometry args={[0.004, 0.005, 0.012]} />
          </mesh>
          <mesh position={[-0.0025, 0, 0]}>
            <sphereGeometry args={[0.002, 8, 8]} />
            <meshBasicMaterial color={isSelected ? "#10b981" : (isHovered ? "#34d399" : "#f59e0b")} />
          </mesh>
        </group>

        {/* Display Hinge Barrel */}
        <mesh
          position={[0, d.baseHeight / 2 + 0.002, -d.baseDepth / 2 + 0.006]}
          rotation={[0, 0, Math.PI / 2]}
          material={materials.metalDark}
        >
          <cylinderGeometry args={[0.005, 0.005, 0.24, 16]} />
        </mesh>

        {/* ── 2B. Display Lid (Responsive Tilt Pivot on Hinge Line) ── */}
        <group
          ref={lidPivotRef}
          position={[0, 0.006, -d.baseDepth / 2]}
          rotation={[-0.30, 0, 0]}
          name="display-lid"
        >
          
          {/* Outer Aluminum Lid Enclosure */}
          <RoundedBox
            args={[d.baseWidth, d.screenHeight, 0.006]}
            radius={0.005}
            smoothness={4}
            material={materials.metalAluminum}
            position={[0, d.screenHeight / 2, -0.003]}
          />

          {/* Edge-to-Edge Dark Bezel Mask */}
          <mesh position={[0, d.screenHeight / 2, 0.0005]} material={materials.metalDark}>
            <boxGeometry args={[d.baseWidth - 0.008, d.screenHeight - 0.008, 0.001]} />
          </mesh>

          {/* Top Camera Notch Proxy */}
          <mesh position={[0, d.screenHeight - 0.012, 0.0012]} material={materials.metalDark}>
            <boxGeometry args={[0.028, 0.008, 0.001]} />
          </mesh>

          {/* Active Retina Display Screen (High-Res Procedural IDE Texture) */}
          <mesh position={[0, d.screenHeight / 2 - 0.004, 0.0015]} material={materials.screenDisplay}>
            <planeGeometry args={[d.baseWidth - 0.024, d.screenHeight - 0.026]} />
          </mesh>
        </group>

      </group>
    </group>
  );
}

