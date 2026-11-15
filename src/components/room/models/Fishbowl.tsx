"use client";

import React, { useMemo, useRef, useState, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { ROOM_DIMENSIONS } from "../roomDimensions";
import { RoomMaterials } from "../RoomMaterials";

interface FishbowlProps {
  materials: RoomMaterials;
}

/**
 * High-Fidelity Glass Fishbowl with Detailed Goldfish (Phase 3C.2 Interactive)
 * 
 * Features:
 * - Crystal clear blown glass bowl with open rolled rim generated via LatheGeometry.
 * - Deep refractive water volume with physical IOR (1.333) and organic liquid meniscus.
 * - Realistic anatomical goldfish: sculpted dorsal ridge, pearlescent belly, contoured head,
 *   bifurcated double-lobe fan tail fin, delicate fins, and glossy eyes with golden iris rings.
 * - Interactive response: on pointer hover or tap, goldfish accelerates with energetic tail flutter.
 * - Gentle circular swimming trajectory with tangent heading, banking, and caudal tail flutter.
 * - Throttles automatically when offscreen, hidden, or on prefers-reduced-motion.
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
  const [isExcited, setIsExcited] = useState(false);
  const speedFactorRef = useRef(1.0);
  const swimAngleRef = useRef(0);

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
    pts.push(new THREE.Vector2(0.001, 0.002));
    pts.push(new THREE.Vector2(0.065, 0.002));
    pts.push(new THREE.Vector2(0.095, 0.018));
    pts.push(new THREE.Vector2(0.124, 0.052));
    pts.push(new THREE.Vector2(0.138, 0.096));
    pts.push(new THREE.Vector2(0.136, 0.138));
    pts.push(new THREE.Vector2(0.112, 0.174));
    // Rolled opening rim
    pts.push(new THREE.Vector2(0.114, 0.188));
    pts.push(new THREE.Vector2(0.120, 0.194));
    pts.push(new THREE.Vector2(0.116, 0.198));
    pts.push(new THREE.Vector2(0.106, 0.194));
    return new THREE.LatheGeometry(pts, 36);
  }, []);

  // 2. Procedural Water Volume with Curved Liquid Meniscus Profile
  const waterGeometry = useMemo(() => {
    const pts: THREE.Vector2[] = [];
    pts.push(new THREE.Vector2(0.001, 0.005));
    pts.push(new THREE.Vector2(0.062, 0.005));
    pts.push(new THREE.Vector2(0.090, 0.020));
    pts.push(new THREE.Vector2(0.119, 0.052));
    pts.push(new THREE.Vector2(0.132, 0.096));
    pts.push(new THREE.Vector2(0.128, 0.136));
    // Water line contact with glass (curves slightly upward for meniscus tension)
    pts.push(new THREE.Vector2(0.116, 0.154));
    pts.push(new THREE.Vector2(0.114, 0.155));
    pts.push(new THREE.Vector2(0.108, 0.1542));
    pts.push(new THREE.Vector2(0.001, 0.1538)); // Subtle center dip
    return new THREE.LatheGeometry(pts, 32);
  }, []);

  // 3. Natural Tumbled River Pebbles
  const pebbles = useMemo(() => [
    { pos: [0.015, 0.010, 0.012] as [number, number, number], scale: [0.022, 0.012, 0.018] as [number, number, number], rot: 0.4 },
    { pos: [-0.025, 0.009, 0.018] as [number, number, number], scale: [0.019, 0.010, 0.015] as [number, number, number], rot: -0.8 },
    { pos: [0.022, 0.009, -0.020] as [number, number, number], scale: [0.024, 0.011, 0.020] as [number, number, number], rot: 1.2 },
    { pos: [-0.018, 0.008, -0.022] as [number, number, number], scale: [0.018, 0.009, 0.016] as [number, number, number], rot: -0.3 },
    { pos: [0.002, 0.011, -0.004] as [number, number, number], scale: [0.020, 0.012, 0.017] as [number, number, number], rot: 2.1 },
  ], []);

  // 4. Lightweight Swimming Animation Loop (Demand-Safe, Runs Only When Excited)
  useFrame((state, delta) => {
    if (prefersReducedMotionRef.current) return;
    if (typeof document !== "undefined" && document.hidden) return;

    // Preserve true 0% idle GPU: only animate when interacted with (hover/tap)
    if (!isExcited && speedFactorRef.current <= 0.02) {
      return;
    }

    const t = state.clock.getElapsedTime();

    // Smoothly spin up on interaction (2.2) and decay to rest (0) when idle
    const targetFactor = isExcited ? 2.2 : 0.0;
    speedFactorRef.current = THREE.MathUtils.lerp(
      speedFactorRef.current,
      targetFactor,
      Math.min(1, delta * 3.5)
    );

    if (speedFactorRef.current <= 0.01) {
      speedFactorRef.current = 0;
      return;
    }

    // Advance swimming angle based on current speed
    swimAngleRef.current += delta * 0.95 * speedFactorRef.current;
    const angle = swimAngleRef.current;

    if (fishGroupRef.current) {
      // Gentle circular orbit inside water volume (radius = 0.046m, water radius is 0.12m)
      const radiusX = 0.046;
      const radiusZ = 0.040;

      const posX = Math.cos(angle) * radiusX;
      const posZ = Math.sin(angle) * radiusZ;
      const posY = 0.088 + Math.sin(t * 2.0 * speedFactorRef.current) * 0.012;

      fishGroupRef.current.position.set(posX, posY, posZ);

      // Tangent velocity heading
      const heading = Math.atan2(-Math.sin(angle) * radiusZ, -Math.cos(angle) * radiusX);
      fishGroupRef.current.rotation.y = heading - Math.PI / 2;

      // Subtle body banking into turns
      fishGroupRef.current.rotation.z = Math.sin(t * 2.0 * speedFactorRef.current) * 0.09;
      fishGroupRef.current.rotation.x = Math.cos(t * 2.0 * speedFactorRef.current) * 0.05;

      // Rhythmic caudal tail fin flutter
      if (tailRef.current) {
        const flutterFreq = 8.0 * Math.min(2.0, speedFactorRef.current);
        tailRef.current.rotation.y = Math.sin(t * flutterFreq) * (0.32 * Math.min(1.4, speedFactorRef.current));
      }

      // Invalidate demand render loop only while swimming
      invalidate();
    }
  });

  return (
    <group position={bowlPosition} name="fishbowl-module">
      {/* Invisible Generous Touch / Hover Hitbox (Raycast-Ready, No visible=false) */}
      <mesh
        position={[0, 0.10, 0]}
        onPointerOver={(e) => {
          e.stopPropagation();
          document.body.style.cursor = "pointer";
          setIsExcited(true);
          invalidate();
        }}
        onPointerOut={() => {
          document.body.style.cursor = "auto";
          setIsExcited(false);
        }}
        onClick={(e) => {
          e.stopPropagation();
          setIsExcited(true);
          invalidate();
          setTimeout(() => setIsExcited(false), 2400);
        }}
      >
        <sphereGeometry args={[0.16, 16, 12]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
      
      {/* ── 1. Turned Scandinavian Birch Base Ring ── */}
      <group position={[0, 0.009, 0]} name="wooden-stand">
        <mesh material={materials.woodLight} castShadow receiveShadow>
          <cylinderGeometry args={[0.076, 0.088, 0.018, 32]} />
        </mesh>
        {/* Recessed Lip Channel */}
        <mesh position={[0, 0.0095, 0]} material={materials.woodTrim}>
          <cylinderGeometry args={[0.068, 0.068, 0.002, 32]} />
        </mesh>
      </group>

      {/* ── 2. Natural River Pebbles Cluster & Delicate Aquatic Flora ── */}
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

        {/* Delicate Submerged Aquatic Flora Cluster */}
        <group position={[-0.012, 0.010, 0.012]}>
          {/* Main Aquatic Stems */}
          <mesh position={[0, 0.026, 0]} material={materials.plantStem}>
            <cylinderGeometry args={[0.0012, 0.0018, 0.052, 8]} />
          </mesh>
          <mesh position={[0.006, 0.020, -0.004]} rotation={[0.1, 0, 0.2]} material={materials.plantStem}>
            <cylinderGeometry args={[0.0010, 0.0015, 0.040, 8]} />
          </mesh>

          {/* Delicate Curled Aquatic Leaflets */}
          {[
            { y: 0.018, rotZ: -0.45, w: 0.014, l: 0.007 },
            { y: 0.030, rotZ: 0.40, w: 0.015, l: 0.008 },
            { y: 0.042, rotZ: -0.35, w: 0.013, l: 0.007 },
            { y: 0.050, rotZ: 0.25, w: 0.010, l: 0.006 },
          ].map((leaf, i) => (
            <mesh
              key={`aquatic-leaf-${i}`}
              position={[i % 2 === 0 ? 0.006 : -0.006, leaf.y, 0]}
              rotation={[0.15, 0, leaf.rotZ]}
              material={materials.plantLeafMedium}
            >
              <planeGeometry args={[leaf.w, leaf.l]} />
            </mesh>
          ))}
        </group>
      </group>

      {/* ── 3. High-Fidelity Goldfish Model ── */}
      <group
        ref={fishGroupRef}
        position={[0.042, 0.088, 0]}
        name="goldfish"
      >
        {/* Main Contoured Goldfish Body (Streamlined Torpedo Form) */}
        <mesh scale={[0.010, 0.013, 0.025]} material={materials.fishBody}>
          <sphereGeometry args={[1, 16, 14]} />
        </mesh>

        {/* Elevated Dorsal Ridge (Deep Warm Orange) */}
        <mesh position={[0, 0.004, -0.002]} scale={[0.008, 0.009, 0.020]} material={materials.fishDorsal}>
          <sphereGeometry args={[1, 14, 12]} />
        </mesh>

        {/* Soft Pearlescent Underbelly */}
        <mesh position={[0, -0.0035, 0.001]} scale={[0.009, 0.0085, 0.022]} material={materials.fishBelly}>
          <sphereGeometry args={[1, 14, 12]} />
        </mesh>

        {/* Left Eye */}
        <group position={[-0.0085, 0.003, 0.014]}>
          <mesh material={materials.fishEye}>
            <sphereGeometry args={[0.0024, 10, 10]} />
          </mesh>
          {/* Reflective Golden Iris Ring */}
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

        {/* Contoured Dorsal Fin (Top Spine) */}
        <mesh
          position={[0, 0.014, -0.004]}
          rotation={[0.32, 0, 0]}
          material={materials.fishFin}
        >
          <planeGeometry args={[0.002, 0.011]} />
        </mesh>

        {/* Left Pectoral Fin */}
        <mesh
          position={[-0.009, -0.002, 0.006]}
          rotation={[0.2, 0.45, -0.4]}
          material={materials.fishFin}
        >
          <planeGeometry args={[0.008, 0.010]} />
        </mesh>

        {/* Right Pectoral Fin */}
        <mesh
          position={[0.009, -0.002, 0.006]}
          rotation={[0.2, -0.45, 0.4]}
          material={materials.fishFin}
        >
          <planeGeometry args={[0.008, 0.010]} />
        </mesh>

        {/* Ventral Pelvic Fins */}
        <mesh position={[-0.004, -0.010, -0.002]} rotation={[-0.3, 0.2, -0.2]} material={materials.fishFin}>
          <planeGeometry args={[0.004, 0.007]} />
        </mesh>
        <mesh position={[0.004, -0.010, -0.002]} rotation={[-0.3, -0.2, 0.2]} material={materials.fishFin}>
          <planeGeometry args={[0.004, 0.007]} />
        </mesh>

        {/* Articulated Caudal Tail Assembly */}
        <group ref={tailRef} position={[0, 0, -0.021]}>
          {/* Tapered Caudal Peduncle */}
          <mesh position={[0, 0, -0.004]} scale={[0.004, 0.006, 0.009]} material={materials.fishBody}>
            <sphereGeometry args={[1, 10, 8]} />
          </mesh>
          {/* Flowing Upper Fan Caudal Lobe */}
          <mesh position={[0, 0.004, -0.015]} rotation={[0.12, 0, 0]} material={materials.fishFin}>
            <planeGeometry args={[0.002, 0.019]} />
          </mesh>
          {/* Flowing Lower Fan Caudal Lobe */}
          <mesh position={[0, -0.004, -0.015]} rotation={[-0.12, 0, 0]} material={materials.fishFin}>
            <planeGeometry args={[0.002, 0.017]} />
          </mesh>
        </group>
      </group>

      {/* ── 4. Deep Refractive Water Volume (RenderOrder 1) ── */}
      <mesh
        geometry={waterGeometry}
        material={materials.water}
        renderOrder={1}
      />

      {/* Curved Water Meniscus Ring Highlight (RenderOrder 2) */}
      <mesh
        position={[0, 0.154, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        material={materials.waterSurface}
        renderOrder={2}
      >
        <ringGeometry args={[0.106, 0.116, 32]} />
      </mesh>

      {/* ── 5. Crystal Physical Glass Bowl (RenderOrder 3) ── */}
      <mesh
        geometry={bowlGeometry}
        material={materials.fishbowlGlass}
        renderOrder={3}
      />

    </group>
  );
}
