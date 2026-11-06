"use client";

import React, { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { RoundedBox } from "@react-three/drei";
import { ROOM_DIMENSIONS } from "../roomDimensions";
import { RoomMaterials } from "../RoomMaterials";

interface WardrobeProps {
  materials: RoomMaterials;
  isHovered?: boolean;
  isSelected?: boolean;
  onSelect?: () => void;
  onHover?: (hovered: boolean) => void;
}

/**
 * High-Fidelity 3-Door Wardrobe & Physical Experience Archive (Phase 3C.2 Animated)
 * 
 * Features:
 * - Recessed plinth kickboard in contrasting darker wood tone.
 * - Solid carcass with side gables and top cornice capping.
 * - Door 0 (Left): Remains closed as architectural anchor.
 * - Door 1 (Center) & Door 2 (Right): Interactive physical opening animation on hinges.
 * - When selected: Doors swing smoothly outward to reveal illuminated interior archives.
 * - Interior: Vertical partition, 4 oak shelves, archive binders (2024-2026), Hackathon award trophy,
 *   linen archive boxes, and a warm LED interior downlight.
 * - Performance: Smooth frame dampening with demand rendering (invalidates only while moving).
 * - Full reduced-motion accessibility support.
 */
export function Wardrobe({
  materials,
  isHovered = false,
  isSelected = false,
  onSelect,
  onHover,
}: WardrobeProps) {
  const d = ROOM_DIMENSIONS.cupboard;
  const doorWidth = (d.length - 0.08) / 3; // ~1.04m per door
  const doorHeight = d.height - 0.16;     // ~2.29m tall
  const doorThickness = 0.024;
  const leafW = doorWidth - 0.008;

  const { invalidate } = useThree();
  const angle1Ref = useRef(0);
  const angle2Ref = useRef(0);
  const door1PivotRef = useRef<THREE.Group>(null);
  const door2PivotRef = useRef<THREE.Group>(null);
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

  // Trigger animation loop when isSelected state toggles
  useEffect(() => {
    isMovingRef.current = true;
    invalidate();
  }, [isSelected, invalidate]);

  // Smooth lerp animation strictly integrated with demand rendering
  useFrame((_, delta) => {
    if (!isMovingRef.current) return;

    const targetAngle1 = isSelected ? -1.35 : (isHovered ? -0.10 : 0);
    const targetAngle2 = isSelected ? 1.35 : (isHovered ? 0.10 : 0);

    if (prefersReducedMotionRef.current) {
      angle1Ref.current = targetAngle1;
      angle2Ref.current = targetAngle2;
      isMovingRef.current = false;
    } else {
      const speed = Math.min(1, delta * 4.8);
      angle1Ref.current = THREE.MathUtils.lerp(angle1Ref.current, targetAngle1, speed);
      angle2Ref.current = THREE.MathUtils.lerp(angle2Ref.current, targetAngle2, speed);

      if (
        Math.abs(angle1Ref.current - targetAngle1) < 0.003 &&
        Math.abs(angle2Ref.current - targetAngle2) < 0.003
      ) {
        angle1Ref.current = targetAngle1;
        angle2Ref.current = targetAngle2;
        isMovingRef.current = false;
      } else {
        invalidate();
      }
    }

    if (door1PivotRef.current) {
      door1PivotRef.current.rotation.y = angle1Ref.current;
    }
    if (door2PivotRef.current) {
      door2PivotRef.current.rotation.y = angle2Ref.current;
    }
  });

  // Hinge anchors
  const hinge1Z = -leafW / 2;
  const hinge2Z = (doorWidth + 0.008) + leafW / 2;

  return (
    <group
      position={d.position}
      name="wardrobe-module"
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
      <mesh position={[0, 0, 0]} visible={false}>
        <boxGeometry args={[d.width + 0.25, d.height, d.length + 0.15]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      {/* ── 1. Recessed Plinth Kickplate ── */}
      <mesh
        position={[0.03, -d.height / 2 + 0.045, 0]}
        material={materials.woodDark}
      >
        <boxGeometry args={[d.width - 0.06, 0.09, d.length - 0.04]} />
      </mesh>

      {/* ── 2. Main Cabinet Carcass ── */}
      {/* Left Gable (Outer Panel) */}
      <mesh
        position={[0, 0.045, -d.length / 2 + 0.015]}
        material={materials.woodLight}
      >
        <boxGeometry args={[d.width, d.height - 0.09, 0.03]} />
      </mesh>

      {/* Right Gable (Outer Panel) */}
      <mesh
        position={[0, 0.045, d.length / 2 - 0.015]}
        material={materials.woodLight}
      >
        <boxGeometry args={[d.width, d.height - 0.09, 0.03]} />
      </mesh>

      {/* Top Cornice Cap */}
      <mesh
        position={[0, d.height / 2 - 0.015, 0]}
        material={materials.woodTrim}
      >
        <boxGeometry args={[d.width + 0.02, 0.03, d.length + 0.02]} />
      </mesh>

      {/* Back Panel */}
      <mesh
        position={[-d.width / 2 + 0.01, 0.045, 0]}
        material={materials.woodTrim}
      >
        <boxGeometry args={[0.02, d.height - 0.09, d.length - 0.06]} />
      </mesh>

      {/* ── 3. Internal Archive Compartment (Visible when doors open) ── */}
      <group name="wardrobe-interior-archive">
        {/* Vertical Partition dividing Closed Left Bay from Active Archive Bays */}
        <mesh
          position={[0, 0.045, -leafW / 2 - 0.015]}
          material={materials.woodLight}
        >
          <boxGeometry args={[d.width - 0.05, d.height - 0.12, 0.02]} />
        </mesh>

        {/* Interior Horizontal Shelves */}
        {[-0.65, -0.20, 0.25, 0.70].map((y, idx) => (
          <mesh
            key={`shelf-${idx}`}
            position={[0, y, (hinge1Z + hinge2Z) / 2]}
            material={materials.woodLight}
          >
            <boxGeometry args={[d.width - 0.06, 0.02, hinge2Z - hinge1Z - 0.04]} />
          </mesh>
        ))}

        {/* Warm Interior LED Strip (Top of open bay) */}
        <mesh position={[d.width / 2 - 0.06, 0.95, (hinge1Z + hinge2Z) / 2]}>
          <boxGeometry args={[0.015, 0.01, hinge2Z - hinge1Z - 0.06]} />
          <meshBasicMaterial color="#FFF5EB" />
        </mesh>

        {/* ── Shelf 3 Assets: Hackathon Award Trophy & Project Binders ── */}
        {/* Smart India Hackathon Winner Award Trophy (Sculpted Golden Prism) */}
        <group position={[0.02, 0.38, 0.10]} name="hackathon-trophy">
          {/* Obsidian Base */}
          <mesh position={[0, -0.10, 0]} material={materials.metalDark}>
            <boxGeometry args={[0.08, 0.03, 0.08]} />
          </mesh>
          {/* Golden Column Trophy */}
          <mesh position={[0, -0.02, 0]} material={materials.metalGold || materials.metalDark}>
            <cylinderGeometry args={[0.018, 0.032, 0.14, 6]} />
          </mesh>
          {/* Star Top Emblem */}
          <mesh position={[0, 0.065, 0]} material={materials.metalGold || materials.metalDark}>
            <octahedronGeometry args={[0.028, 0]} />
          </mesh>
        </group>

        {/* Archive Binders (Portfolio & Project Documentation) */}
        {[-0.14, -0.08, -0.02].map((zOffset, i) => (
          <group key={`binder-${i}`} position={[0.02, 0.37, zOffset]}>
            <mesh material={i === 0 ? materials.accentRed : (i === 1 ? materials.metalDark : materials.woodDark)}>
              <boxGeometry args={[0.18, 0.22, 0.038]} />
            </mesh>
            {/* Spine Label Proxy */}
            <mesh position={[0.092, 0, 0]} material={materials.fabricWhite}>
              <boxGeometry args={[0.001, 0.16, 0.024]} />
            </mesh>
          </group>
        ))}

        {/* ── Shelf 2 Assets: Organized Storage / Archive Boxes ── */}
        <group position={[0.02, -0.08, 0.40]} name="linen-archive-box-1">
          <RoundedBox
            args={[0.26, 0.20, 0.36]}
            radius={0.008}
            smoothness={3}
            material={materials.fabricBeige}
          />
          {/* Pull Ribbon Handle */}
          <mesh position={[0.132, 0, 0]} material={materials.accentRed}>
            <boxGeometry args={[0.004, 0.06, 0.02]} />
          </mesh>
        </group>

        <group position={[0.02, -0.08, 0.85]} name="linen-archive-box-2">
          <RoundedBox
            args={[0.26, 0.20, 0.38]}
            radius={0.008}
            smoothness={3}
            material={materials.fabricDuvet}
          />
          <mesh position={[0.132, 0, 0]} material={materials.metalDark}>
            <boxGeometry args={[0.004, 0.06, 0.02]} />
          </mesh>
        </group>
      </group>

      {/* ── 4. Door 0 (Left Door: Stays Closed) ── */}
      <group
        position={[d.width / 2 - doorThickness / 2 + 0.01, 0.045, -doorWidth - 0.008]}
        name="door-leaf-1-static"
      >
        <RoundedBox
          args={[doorThickness, doorHeight, leafW]}
          radius={0.004}
          smoothness={4}
          material={materials.woodLight}
          castShadow
          receiveShadow
        />
        {/* Recessed Shaker Inset Accent Line */}
        <mesh
          position={[doorThickness / 2 + 0.001, 0, 0]}
          material={materials.woodTrim}
        >
          <boxGeometry args={[0.001, doorHeight - 0.20, leafW - 0.16]} />
        </mesh>
        {/* Extruded Graphite Handle */}
        <group position={[doorThickness / 2 + 0.016, 0, -leafW * 0.38]}>
          <mesh position={[-0.008, 0.20, 0]} material={materials.metalDark}>
            <boxGeometry args={[0.016, 0.012, 0.012]} />
          </mesh>
          <mesh position={[-0.008, -0.20, 0]} material={materials.metalDark}>
            <boxGeometry args={[0.016, 0.012, 0.012]} />
          </mesh>
          <RoundedBox
            args={[0.012, 0.48, 0.016]}
            radius={0.002}
            smoothness={2}
            material={materials.metalDark}
          />
        </group>
      </group>

      {/* ── 5. Door 1 (Center Door: Hinged on Left, Swings Outward) ── */}
      <group
        ref={door1PivotRef}
        position={[d.width / 2 + 0.01, 0.045, hinge1Z]}
        name="door-leaf-2-pivot"
      >
        <group position={[-doorThickness / 2, 0, leafW / 2]}>
          <RoundedBox
            args={[doorThickness, doorHeight, leafW]}
            radius={0.004}
            smoothness={4}
            material={materials.woodLight}
            castShadow
            receiveShadow
          />
          <mesh
            position={[doorThickness / 2 + 0.001, 0, 0]}
            material={materials.woodTrim}
          >
            <boxGeometry args={[0.001, doorHeight - 0.20, leafW - 0.16]} />
          </mesh>
          {/* Handle */}
          <group position={[doorThickness / 2 + 0.016, 0, leafW * 0.38]}>
            <mesh position={[-0.008, 0.20, 0]} material={materials.metalDark}>
              <boxGeometry args={[0.016, 0.012, 0.012]} />
            </mesh>
            <mesh position={[-0.008, -0.20, 0]} material={materials.metalDark}>
              <boxGeometry args={[0.016, 0.012, 0.012]} />
            </mesh>
            <RoundedBox
              args={[0.012, 0.48, 0.016]}
              radius={0.002}
              smoothness={2}
              material={materials.metalDark}
            />
          </group>
        </group>
      </group>

      {/* ── 6. Door 2 (Right Door: Hinged on Right, Swings Outward) ── */}
      <group
        ref={door2PivotRef}
        position={[d.width / 2 + 0.01, 0.045, hinge2Z]}
        name="door-leaf-3-pivot"
      >
        <group position={[-doorThickness / 2, 0, -leafW / 2]}>
          <RoundedBox
            args={[doorThickness, doorHeight, leafW]}
            radius={0.004}
            smoothness={4}
            material={materials.woodLight}
            castShadow
            receiveShadow
          />
          <mesh
            position={[doorThickness / 2 + 0.001, 0, 0]}
            material={materials.woodTrim}
          >
            <boxGeometry args={[0.001, doorHeight - 0.20, leafW - 0.16]} />
          </mesh>
          {/* Handle */}
          <group position={[doorThickness / 2 + 0.016, 0, -leafW * 0.38]}>
            <mesh position={[-0.008, 0.20, 0]} material={materials.metalDark}>
              <boxGeometry args={[0.016, 0.012, 0.012]} />
            </mesh>
            <mesh position={[-0.008, -0.20, 0]} material={materials.metalDark}>
              <boxGeometry args={[0.016, 0.012, 0.012]} />
            </mesh>
            <RoundedBox
              args={[0.012, 0.48, 0.016]}
              radius={0.002}
              smoothness={2}
              material={materials.metalDark}
            />
          </group>
        </group>
      </group>
    </group>
  );
}
