"use client";

import React, { useMemo } from "react";
import * as THREE from "three";
import { RoomMaterials } from "../RoomMaterials";

interface BadmintonRacketsProps {
  materials: RoomMaterials;
  position?: [number, number, number];
}

/**
 * High-Fidelity 3D Wall-Mounted Badminton Rackets & Feathered Shuttlecock
 * 
 * Features:
 * - Two crossed professional graphite rackets mounted on a minimalist turned birch peg.
 * - Isometric racket hoop frame with signature red/white racing decals on matte carbon.
 * - High-tension nylon string bed with criss-cross lattice and tension grommets.
 * - Aerodynamic molded T-joint throat and slender carbon shaft.
 * - Polyurethane spiral-wrapped cushion grip handle with red finishing tape and butt cap.
 * - Realistic natural cork feathered shuttlecock resting on a small wall shelf.
 */
export function BadmintonRackets({
  materials,
  position = [0.58, 1.95, -2.675],
}: BadmintonRacketsProps) {
  // Dimensions (meters)
  const hoopRadiusX = 0.105;
  const hoopRadiusY = 0.135;
  const frameThickness = 0.005;
  const shaftLength = 0.32;
  const shaftRadius = 0.0035;
  const handleLength = 0.15;
  const handleRadius = 0.011;

  // Create an elliptical curve for the racket hoop frame
  const hoopCurve = useMemo(() => {
    return new THREE.EllipseCurve(
      0, 0,
      hoopRadiusX, hoopRadiusY,
      0, 2 * Math.PI,
      false,
      0
    );
  }, [hoopRadiusX, hoopRadiusY]);

  // Generate hoop frame geometry from curve
  const hoopGeometry = useMemo(() => {
    const points = hoopCurve.getPoints(48);
    // Create a 3D tube along the ellipse curve
    const path3D = new THREE.CatmullRomCurve3(
      points.map((p) => new THREE.Vector3(p.x, p.y, 0)),
      true
    );
    return new THREE.TubeGeometry(path3D, 48, frameThickness, 8, true);
  }, [hoopCurve, frameThickness]);

  // Generate string bed lines (mains and crosses)
  const stringPositions = useMemo(() => {
    const coords: number[] = [];
    const numMains = 14;
    const numCrosses = 18;

    // Vertical strings (mains)
    for (let i = 1; i < numMains; i++) {
      const u = (i / numMains) * 2 - 1; // -1 to +1
      const x = u * (hoopRadiusX - 0.008);
      // y bounds on ellipse: (x/a)^2 + (y/b)^2 = 1 => y = b * sqrt(1 - (x/a)^2)
      const ratio = Math.abs(x) / hoopRadiusX;
      if (ratio < 0.98) {
        const yBound = hoopRadiusY * Math.sqrt(Math.max(0, 1 - ratio * ratio)) - 0.006;
        coords.push(x, -yBound, 0, x, yBound, 0);
      }
    }

    // Horizontal strings (crosses)
    for (let j = 1; j < numCrosses; j++) {
      const v = (j / numCrosses) * 2 - 1;
      const y = v * (hoopRadiusY - 0.008);
      const ratio = Math.abs(y) / hoopRadiusY;
      if (ratio < 0.98) {
        const xBound = hoopRadiusX * Math.sqrt(Math.max(0, 1 - ratio * ratio)) - 0.006;
        coords.push(-xBound, y, 0, xBound, y, 0);
      }
    }

    return new Float32Array(coords);
  }, [hoopRadiusX, hoopRadiusY]);

  /**
   * Helper component rendering a single single racket assembly
   */
  const SingleRacket = ({
    accentColor = "#E52424",
    gripColor = "#F5F3ED",
  }: {
    accentColor?: string;
    gripColor?: string;
  }) => {
    return (
      <group>
        {/* ── 1. Isometric Hoop Frame ── */}
        <group position={[0, hoopRadiusY + 0.02, 0]}>
          <mesh geometry={hoopGeometry} castShadow>
            <meshStandardMaterial
              color="#1B1E23"
              roughness={0.35}
              metalness={0.6}
            />
          </mesh>

          {/* Accent Livery Decal Blocks (Top Corners) */}
          <mesh position={[0, hoopRadiusY - 0.015, 0]}>
            <boxGeometry args={[0.07, 0.012, 0.012]} />
            <meshStandardMaterial color={accentColor} roughness={0.4} />
          </mesh>
          <mesh position={[hoopRadiusX - 0.01, 0, 0]}>
            <boxGeometry args={[0.012, 0.06, 0.012]} />
            <meshStandardMaterial color="#FAF5EE" roughness={0.4} />
          </mesh>
          <mesh position={[-hoopRadiusX + 0.01, 0, 0]}>
            <boxGeometry args={[0.012, 0.06, 0.012]} />
            <meshStandardMaterial color="#FAF5EE" roughness={0.4} />
          </mesh>

          {/* High-Tension String Lattice */}
          <lineSegments>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                args={[stringPositions, 3]}
              />
            </bufferGeometry>
            <lineBasicMaterial
              color="#FFFFFF"
              transparent
              opacity={0.7}
              linewidth={1}
            />
          </lineSegments>

          {/* Center Red Stencil Mark (Subtle Yonex Logo Impression) */}
          <mesh position={[0, 0, 0.001]}>
            <planeGeometry args={[0.05, 0.04]} />
            <meshBasicMaterial
              color={accentColor}
              transparent
              opacity={0.35}
              side={THREE.DoubleSide}
            />
          </mesh>
        </group>

        {/* ── 2. Molded T-Joint Throat ── */}
        <group position={[0, 0.015, 0]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.008, 0.005, 0.03, 16]} />
            <meshStandardMaterial color="#1B1E23" roughness={0.3} metalness={0.7} />
          </mesh>
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[0.0082, 0.0082, 0.006, 16]} />
            <meshStandardMaterial color={accentColor} roughness={0.3} />
          </mesh>
        </group>

        {/* ── 3. Ultra-Slim Carbon Graphite Shaft ── */}
        <mesh position={[0, -shaftLength / 2, 0]} castShadow>
          <cylinderGeometry args={[shaftRadius, shaftRadius, shaftLength, 16]} />
          <meshStandardMaterial color="#1A1C20" roughness={0.25} metalness={0.75} />
        </mesh>

        {/* Shaft Metallic Decal Rings */}
        <mesh position={[0, -0.08, 0]}>
          <cylinderGeometry args={[shaftRadius + 0.0005, shaftRadius + 0.0005, 0.018, 16]} />
          <meshStandardMaterial color="#D1D5DB" roughness={0.2} metalness={0.9} />
        </mesh>
        <mesh position={[0, -0.22, 0]}>
          <cylinderGeometry args={[shaftRadius + 0.0005, shaftRadius + 0.0005, 0.015, 16]} />
          <meshStandardMaterial color={accentColor} roughness={0.3} metalness={0.5} />
        </mesh>

        {/* ── 4. Handle Cone Collar ── */}
        <mesh position={[0, -shaftLength - 0.012, 0]}>
          <cylinderGeometry args={[shaftRadius + 0.001, handleRadius, 0.024, 16]} />
          <meshStandardMaterial color="#111315" roughness={0.5} />
        </mesh>

        {/* ── 5. Polyurethane Spiral Cushion Grip Handle ── */}
        <group position={[0, -shaftLength - 0.024 - handleLength / 2, 0]}>
          {/* Main Handle Core */}
          <mesh castShadow>
            <cylinderGeometry args={[handleRadius, handleRadius, handleLength, 8]} />
            <meshStandardMaterial color={gripColor} roughness={0.85} />
          </mesh>

          {/* Grip Tape Overlap Ribs (Spiral feel) */}
          {[-0.05, -0.025, 0, 0.025, 0.05].map((yOffset, idx) => (
            <mesh key={`grip-band-${idx}`} position={[0, yOffset, 0]}>
              <cylinderGeometry args={[handleRadius + 0.0006, handleRadius + 0.0006, 0.004, 16]} />
              <meshStandardMaterial color="#E8E2D5" roughness={0.9} />
            </mesh>
          ))}

          {/* Top Grip Finishing Tape (Black & Red) */}
          <mesh position={[0, handleLength / 2 - 0.006, 0]}>
            <cylinderGeometry args={[handleRadius + 0.0008, handleRadius + 0.0008, 0.012, 16]} />
            <meshStandardMaterial color="#1B1E23" roughness={0.4} />
          </mesh>

          {/* Butt Cap at Handle End */}
          <mesh position={[0, -handleLength / 2 - 0.003, 0]}>
            <cylinderGeometry args={[handleRadius + 0.002, handleRadius + 0.002, 0.006, 8]} />
            <meshStandardMaterial color={accentColor} roughness={0.4} />
          </mesh>
        </group>
      </group>
    );
  };

  return (
    <group position={position} name="wall-badminton-rackets-module">
      {/* ── Wall Mount Peg (Solid Turned Birch) ── */}
      <mesh position={[0, 0, -0.015]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.012, 0.012, 0.035, 16]} />
        <meshStandardMaterial color="#D7C4A5" roughness={0.6} />
      </mesh>
      {/* Peg Brass Retention Cap */}
      <mesh position={[0, 0, 0.015]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.016, 0.016, 0.006, 16]} />
        <meshStandardMaterial color="#D4AF37" roughness={0.3} metalness={0.8} />
      </mesh>

      {/* ── Racket 1: Left Tilted (+24 deg) ── */}
      <group position={[-0.01, 0, 0]} rotation={[0, 0, 0.42]}>
        <SingleRacket accentColor="#E52424" gripColor="#FCFAF7" />
      </group>

      {/* ── Racket 2: Right Tilted (-24 deg, slightly forward along Z) ── */}
      <group position={[0.01, 0, 0.014]} rotation={[0, 0, -0.42]}>
        <SingleRacket accentColor="#38BDF8" gripColor="#1B1E23" />
      </group>

      {/* ── Miniature Wooden Wall Shelf for Feathered Shuttlecock ── */}
      <group position={[0.26, -0.15, 0]} name="shuttlecock-shelf">
        {/* Birch Shelf Plank */}
        <mesh position={[0, 0, 0.035]} castShadow receiveShadow>
          <boxGeometry args={[0.11, 0.012, 0.08]} />
          <meshStandardMaterial color="#D7C4A5" roughness={0.6} />
        </mesh>
        {/* Shelf Brass L-Bracket */}
        <mesh position={[0, -0.02, 0.01]}>
          <boxGeometry args={[0.016, 0.03, 0.004]} />
          <meshStandardMaterial color="#D4AF37" roughness={0.3} metalness={0.8} />
        </mesh>

        {/* ── Natural Feathered Shuttlecock Resting on Shelf ── */}
        <group position={[0, 0.018, 0.035]} rotation={[0, 0, 0]}>
          {/* Cork Base (Dome resting on shelf) */}
          <mesh position={[0, 0.012, 0]} castShadow>
            <sphereGeometry args={[0.013, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshStandardMaterial color="#E0D2B8" roughness={0.9} />
          </mesh>
          <mesh position={[0, 0.006, 0]}>
            <cylinderGeometry args={[0.013, 0.013, 0.012, 16]} />
            <meshStandardMaterial color="#E0D2B8" roughness={0.9} />
          </mesh>

          {/* Red Leather Ribbon Band around Cork Waist */}
          <mesh position={[0, 0.012, 0]}>
            <cylinderGeometry args={[0.0132, 0.0132, 0.004, 16]} />
            <meshStandardMaterial color="#E52424" roughness={0.4} />
          </mesh>

          {/* 16 Goose Feathers Conical Skirt (Pointing Upwards) */}
          <mesh position={[0, 0.036, 0]} castShadow>
            <cylinderGeometry args={[0.032, 0.014, 0.044, 16, 1, true]} />
            <meshStandardMaterial
              color="#FAF8F5"
              roughness={0.6}
              transparent
              opacity={0.92}
              side={THREE.DoubleSide}
            />
          </mesh>

          {/* Dual Feather Binding Thread Rings */}
          <mesh position={[0, 0.028, 0]}>
            <cylinderGeometry args={[0.021, 0.021, 0.002, 16, 1, true]} />
            <meshBasicMaterial color="#E52424" side={THREE.DoubleSide} />
          </mesh>
          <mesh position={[0, 0.044, 0]}>
            <cylinderGeometry args={[0.028, 0.028, 0.002, 16, 1, true]} />
            <meshBasicMaterial color="#FAF5EE" side={THREE.DoubleSide} />
          </mesh>
        </group>
      </group>
    </group>
  );
}
