"use client";

import React, { useMemo, useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { ROOM_DIMENSIONS } from "../roomDimensions";
import { RoomMaterials } from "../RoomMaterials";

interface FishbowlProps {
  materials: RoomMaterials;
}

/**
 * High-Fidelity Glass Fishbowl with Detailed Swimmer
 * 
 * Features:
 * - Authentic hollow curved glass bowl with open rolled rim generated via LatheGeometry.
 * - Precision-fitted physical water volume with reflective surface meniscus.
 * - Turned Scandinavian birch base ring with bevelled rim.
 * - Smooth river pebbles and delicate aquatic plant sprig at the bowl bottom.
 * - Detailed small goldfish: streamlined body, pearlescent belly, dual-lobe tail fin,
 *   dorsal and pectoral fins, glossy eyes with orbital rings.
 * - Gentle swimming animation with tail flutter, pausing automatically when document is hidden
 *   or prefers-reduced-motion is active, strictly respecting demand rendering.
 */
export function Fishbowl({ materials }: FishbowlProps) {
  const deskX = ROOM_DIMENSIONS.desk.position[0];
  const deskY = ROOM_DIMENSIONS.desk.position[1] + ROOM_DIMENSIONS.desk.topThickness / 2;
  const deskZ = ROOM_DIMENSIONS.desk.position[2];

  const bowlPosition: [number, number, number] = [
    deskX + 0.58,
    deskY,
    deskZ - 0.16,
  ];

  const { invalidate } = useThree();
  const fishGroupRef = useRef<THREE.Group>(null);
  const tailRef = useRef<THREE.Group>(null);
  const prefersReducedMotionRef = useRef(false);

  // Check prefers-reduced-motion on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      prefersReducedMotionRef.current = mediaQuery.matches;
      const handler = (e: MediaQueryListEvent) => {
        prefersReducedMotionRef.current = e.matches;
      };
      mediaQuery.addEventListener("change", handler);
      return () => mediaQuery.removeEventListener("change", handler);
    }
  }, []);

  // 1. Procedural Glass Bowl Profile (LatheGeometry)
  const bowlGeometry = useMemo(() => {
    const pts: THREE.Vector2[] = [];
    // Flat bottom base
    pts.push(new THREE.Vector2(0.001, 0.002));
    pts.push(new THREE.Vector2(0.065, 0.002));
    // Curving upward and bowing outward
    pts.push(new THREE.Vector2(0.095, 0.018));
    pts.push(new THREE.Vector2(0.124, 0.052));
    pts.push(new THREE.Vector2(0.138, 0.096));
    pts.push(new THREE.Vector2(0.136, 0.138));
    // Inward neck
    pts.push(new THREE.Vector2(0.112, 0.174));
    // Rolled opening rim
    pts.push(new THREE.Vector2(0.114, 0.188));
    pts.push(new THREE.Vector2(0.120, 0.194));
    pts.push(new THREE.Vector2(0.116, 0.198));
    pts.push(new THREE.Vector2(0.106, 0.194));
    return new THREE.LatheGeometry(pts, 36);
  }, []);

  // 2. Procedural Water Volume Profile (LatheGeometry)
  const waterGeometry = useMemo(() => {
    const pts: THREE.Vector2[] = [];
    pts.push(new THREE.Vector2(0.001, 0.005));
    pts.push(new THREE.Vector2(0.062, 0.005));
    pts.push(new THREE.Vector2(0.090, 0.020));
    pts.push(new THREE.Vector2(0.119, 0.052));
    pts.push(new THREE.Vector2(0.132, 0.096));
    pts.push(new THREE.Vector2(0.128, 0.136));
    pts.push(new THREE.Vector2(0.115, 0.155));
    pts.push(new THREE.Vector2(0.001, 0.155)); // Flat top meniscus
    return new THREE.LatheGeometry(pts, 32);
  }, []);

  // 3. Natural River Pebbles
  const pebbles = useMemo(() => [
    { pos: [0.015, 0.010, 0.012] as [number, number, number], scale: [0.022, 0.012, 0.018] as [number, number, number], rot: 0.4 },
    { pos: [-0.025, 0.009, 0.018] as [number, number, number], scale: [0.019, 0.010, 0.015] as [number, number, number], rot: -0.8 },
    { pos: [0.022, 0.009, -0.020] as [number, number, number], scale: [0.024, 0.011, 0.020] as [number, number, number], rot: 1.2 },
    { pos: [-0.018, 0.008, -0.022] as [number, number, number], scale: [0.018, 0.009, 0.016] as [number, number, number], rot: -0.3 },
    { pos: [0.002, 0.011, -0.004] as [number, number, number], scale: [0.020, 0.012, 0.017] as [number, number, number], rot: 2.1 },
  ], []);

  // 4. Lightweight Swimming Animation Loop
  useFrame((state) => {
    if (prefersReducedMotionRef.current) return;
    if (typeof document !== "undefined" && document.hidden) return;

    const t = state.clock.getElapsedTime();

    if (fishGroupRef.current) {
      // Gentle circular orbit inside water volume (radius = 0.046m, water radius is 0.12m)
      const orbitSpeed = 0.75;
      const angle = t * orbitSpeed;
      const radiusX = 0.046;
      const radiusZ = 0.040;

      const posX = Math.cos(angle) * radiusX;
      const posZ = Math.sin(angle) * radiusZ;
      const posY = 0.088 + Math.sin(t * 1.5) * 0.014;

      fishGroupRef.current.position.set(posX, posY, posZ);

      // Tangent velocity heading
      const heading = Math.atan2(-Math.sin(angle) * radiusZ, -Math.cos(angle) * radiusX);
      fishGroupRef.current.rotation.y = heading - Math.PI / 2;

      // Subtle roll bank on turns
      fishGroupRef.current.rotation.z = Math.sin(t * 1.5) * 0.08;
      fishGroupRef.current.rotation.x = Math.cos(t * 1.5) * 0.05;

      // Realistic tail fin propulsion flutter
      if (tailRef.current) {
        tailRef.current.rotation.y = Math.sin(t * 7.5) * 0.35;
      }

      // Request next frame under demand rendering
      invalidate();
    }
  });

  return (
    <group position={bowlPosition} name="fishbowl-module">
      
      {/* ── 1. Turned Scandinavian Birch Base Ring ── */}
      <group position={[0, 0.009, 0]} name="wooden-stand">
        <mesh material={materials.woodLight}>
          <cylinderGeometry args={[0.076, 0.088, 0.018, 32]} />
        </mesh>
        {/* Recessed Lip Channel */}
        <mesh position={[0, 0.0095, 0]} material={materials.woodTrim}>
          <cylinderGeometry args={[0.068, 0.068, 0.002, 32]} />
        </mesh>
      </group>

      {/* ── 2. Natural River Pebbles Cluster (Bottom of Bowl) ── */}
      <group position={[0, 0.008, 0]} name="river-pebbles">
        {pebbles.map((p, idx) => (
          <mesh
            key={`pebble-${idx}`}
            position={p.pos}
            scale={p.scale}
            rotation={[0, p.rot, 0]}
            material={materials.riverStone}
          >
            <sphereGeometry args={[1, 12, 10]} />
          </mesh>
        ))}

        {/* Delicate Aquatic Plant Stem */}
        <group position={[-0.01, 0.01, 0.01]}>
          <mesh position={[0, 0.024, 0]} material={materials.plantStem}>
            <cylinderGeometry args={[0.0015, 0.002, 0.048, 8]} />
          </mesh>
          {/* Miniature aquatic leaves */}
          {[0.018, 0.034, 0.046].map((leafY, i) => (
            <mesh
              key={`aquatic-leaf-${i}`}
              position={[i % 2 === 0 ? 0.006 : -0.006, leafY, 0]}
              rotation={[0, 0, i % 2 === 0 ? -0.4 : 0.4]}
              material={materials.plantLeaf}
            >
              <planeGeometry args={[0.012, 0.006]} />
            </mesh>
          ))}
        </group>
      </group>

      {/* ── 3. High-Fidelity Swimmer (Small Goldfish) ── */}
      <group
        ref={fishGroupRef}
        position={[0.042, 0.088, 0]}
        name="goldfish"
      >
        {/* Streamlined Main Fish Body (Torpedo form) */}
        <mesh scale={[0.010, 0.013, 0.024]} material={materials.fishBody}>
          <sphereGeometry args={[1, 16, 14]} />
        </mesh>

        {/* Soft Pearlescent Underbelly */}
        <mesh position={[0, -0.003, 0.001]} scale={[0.009, 0.009, 0.022]} material={materials.fishBelly}>
          <sphereGeometry args={[1, 14, 12]} />
        </mesh>

        {/* Left Eye */}
        <group position={[-0.0085, 0.003, 0.014]}>
          <mesh material={materials.fishEye}>
            <sphereGeometry args={[0.0024, 10, 10]} />
          </mesh>
          {/* Delicate orbital ring */}
          <mesh material={materials.fishBelly}>
            <ringGeometry args={[0.0023, 0.0029, 12]} />
          </mesh>
        </group>

        {/* Right Eye */}
        <group position={[0.0085, 0.003, 0.014]}>
          <mesh material={materials.fishEye}>
            <sphereGeometry args={[0.0024, 10, 10]} />
          </mesh>
          <mesh material={materials.fishBelly}>
            <ringGeometry args={[0.0023, 0.0029, 12]} />
          </mesh>
        </group>

        {/* Dorsal Fin (Top) */}
        <mesh
          position={[0, 0.013, -0.003]}
          rotation={[0.35, 0, 0]}
          material={materials.fishFin}
        >
          <planeGeometry args={[0.002, 0.010]} />
        </mesh>

        {/* Left Pectoral Fin */}
        <mesh
          position={[-0.009, -0.002, 0.006]}
          rotation={[0.2, 0.45, -0.4]}
          material={materials.fishFin}
        >
          <planeGeometry args={[0.007, 0.009]} />
        </mesh>

        {/* Right Pectoral Fin */}
        <mesh
          position={[0.009, -0.002, 0.006]}
          rotation={[0.2, -0.45, 0.4]}
          material={materials.fishFin}
        >
          <planeGeometry args={[0.007, 0.009]} />
        </mesh>

        {/* Articulated Tail Assembly */}
        <group ref={tailRef} position={[0, 0, -0.020]}>
          {/* Tapered Caudal Peduncle */}
          <mesh position={[0, 0, -0.004]} scale={[0.004, 0.006, 0.008]} material={materials.fishBody}>
            <sphereGeometry args={[1, 10, 8]} />
          </mesh>
          {/* Dual-Lobe Fan Tail Fin */}
          <mesh position={[0, 0.003, -0.014]} rotation={[0.1, 0, 0]} material={materials.fishFin}>
            <planeGeometry args={[0.002, 0.018]} />
          </mesh>
          <mesh position={[0, -0.003, -0.014]} rotation={[-0.1, 0, 0]} material={materials.fishFin}>
            <planeGeometry args={[0.002, 0.016]} />
          </mesh>
        </group>
      </group>

      {/* ── 4. Physical Water Volume (Rendered behind glass) ── */}
      <mesh
        geometry={waterGeometry}
        material={materials.water}
        renderOrder={1}
      />

      {/* Water Surface Meniscus Disc */}
      <mesh
        position={[0, 0.155, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        material={materials.waterSurface}
        renderOrder={2}
      >
        <circleGeometry args={[0.115, 32]} />
      </mesh>

      {/* ── 5. Curved Physical Glass Fishbowl (Rendered with depthWrite: false) ── */}
      <mesh
        geometry={bowlGeometry}
        material={materials.fishbowlGlass}
        renderOrder={3}
      />

    </group>
  );
}
