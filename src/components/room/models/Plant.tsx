"use client";

import React, { useMemo } from "react";
import * as THREE from "three";
import { ROOM_DIMENSIONS } from "../roomDimensions";
import { RoomMaterials } from "../RoomMaterials";

interface PlantProps {
  materials: RoomMaterials;
}

/**
 * Creates naturally curved, volumetric botanical leaf geometry.
 * Features:
 * - 9 cross-sectional vertex points across blade width (eliminating flat/angular V-shape).
 * - Smooth parabolic blade curvature with distinct central midrib groove.
 * - Graceful gravity arch, downward cascade, and organic 3D twist along the spine.
 * - Double-sided smooth normals preventing paper-like thinness.
 */
function createOrganicLeafGeometry(
  length: number,
  maxWidth: number,
  arch: number,
  curl: number,
  twist: number = 0
) {
  const segLength = 16;
  const segWidth = 8; // 8 quad bands = 9 vertices across width
  const positions: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];

  for (let i = 0; i <= segLength; i++) {
    const t = i / segLength;

    // Organic teardrop leaf width profile (narrow base, wide body, tapered tip)
    const widthFactor = Math.sin(t * Math.PI) * (1 - 0.18 * t);
    const currentWidth = maxWidth * widthFactor;

    // Longitudinal spine trajectory (arches up, then cascades gracefully down)
    const spineY = Math.sin(t * Math.PI * 0.88) * arch - (t * t * 0.040);
    const spineZ = t * length;

    // Spine twist angle along leaf length
    const currentTwist = twist * Math.sin(t * Math.PI);
    const cosT = Math.cos(currentTwist);
    const sinT = Math.sin(currentTwist);

    for (let j = 0; j <= segWidth; j++) {
      // s ranges from -1 (left margin) to 0 (midrib) to +1 (right margin)
      const s = (j / segWidth) * 2 - 1;
      const absS = Math.abs(s);

      // Transverse curvature: smooth parabolic cup with central midrib groove
      // Midrib is slightly sunken; blade curves convexly outward
      const bladeCup = (1 - Math.cos(absS * Math.PI)) * (currentWidth * curl * 0.5);
      const midribIndent = Math.exp(-absS * 8.0) * 0.0018;

      let localX = s * currentWidth;
      let localY = spineY + bladeCup - midribIndent;
      let localZ = spineZ;

      // Apply spine twist around Z
      const twistedX = localX * cosT - (localY - spineY) * sinT;
      const twistedY = spineY + localX * sinT + (localY - spineY) * cosT;

      positions.push(twistedX, twistedY, localZ);
      uvs.push((s + 1) * 0.5, t);
    }
  }

  const stride = segWidth + 1;
  for (let i = 0; i < segLength; i++) {
    for (let j = 0; j < segWidth; j++) {
      const a = i * stride + j;
      const b = (i + 1) * stride + j;
      const c = (i + 1) * stride + (j + 1);
      const d = i * stride + (j + 1);

      indices.push(a, b, d);
      indices.push(d, b, c);
    }
  }

  const geom = new THREE.BufferGeometry();
  geom.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geom.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
  geom.setIndex(indices);
  geom.computeVertexNormals();
  return geom;
}

/**
 * High-Fidelity Architectural Plants (Desk & Floor) — Phase 3B.2.1 Refined
 */
export function Plant({ materials }: PlantProps) {
  const deskX = ROOM_DIMENSIONS.desk.position[0];
  const deskY = ROOM_DIMENSIONS.desk.position[1] + ROOM_DIMENSIONS.desk.topThickness / 2;
  const deskZ = ROOM_DIMENSIONS.desk.position[2];
  const floorPlantPos = ROOM_DIMENSIONS.accessories.plantPos;

  // Desk pot placement (to the left of the laptop stand)
  const deskPlantPos: [number, number, number] = [
    deskX - 0.60,
    deskY,
    deskZ - 0.16,
  ];

  // Varied organic leaf geometries with individual curvature and twist
  const largeLeafGeom = useMemo(() => createOrganicLeafGeometry(0.140, 0.054, 0.040, 0.24, -0.12), []);
  const mediumLeafGeom = useMemo(() => createOrganicLeafGeometry(0.120, 0.048, 0.034, 0.22, 0.10), []);
  const slenderLeafGeom = useMemo(() => createOrganicLeafGeometry(0.105, 0.038, 0.028, 0.20, -0.08), []);
  const youngLeafGeom = useMemo(() => createOrganicLeafGeometry(0.088, 0.032, 0.022, 0.16, 0.05), []);

  // Floor plant large paddle leaf geometries
  const floorLeafGeom = useMemo(() => createOrganicLeafGeometry(0.40, 0.15, 0.12, 0.26, -0.14), []);
  const floorMediumLeafGeom = useMemo(() => createOrganicLeafGeometry(0.34, 0.13, 0.10, 0.24, 0.12), []);

  // Natural phyllotaxis distribution of desk leaves with color variation
  const deskLeaves = useMemo(() => [
    // 3 Mature Lower Cascading Leaves (Lush Mature Green)
    { geom: largeLeafGeom, mat: materials.plantLeafMature, yaw: 0.25, pitch: 0.44, roll: -0.18, stemLen: 0.076, stemAngle: 0.36, yOff: 0.020 },
    { geom: largeLeafGeom, mat: materials.plantLeafMature, yaw: 2.15, pitch: 0.46, roll: 0.22, stemLen: 0.082, stemAngle: 0.40, yOff: 0.020 },
    { geom: largeLeafGeom, mat: materials.plantLeafMature, yaw: 4.35, pitch: 0.42, roll: -0.12, stemLen: 0.080, stemAngle: 0.38, yOff: 0.020 },
    // 3 Mid-Height Spreading Leaves (Vibrant Botanical Green)
    { geom: mediumLeafGeom, mat: materials.plantLeafMedium, yaw: 1.15, pitch: 0.30, roll: 0.14, stemLen: 0.096, stemAngle: 0.24, yOff: 0.042 },
    { geom: slenderLeafGeom, mat: materials.plantLeafMedium, yaw: 3.25, pitch: 0.32, roll: -0.16, stemLen: 0.094, stemAngle: 0.26, yOff: 0.042 },
    { geom: mediumLeafGeom, mat: materials.plantLeafMedium, yaw: 5.45, pitch: 0.28, roll: 0.12, stemLen: 0.100, stemAngle: 0.22, yOff: 0.042 },
    // 3 Young Center Leaves (Fresh Lime Olive Green)
    { geom: youngLeafGeom, mat: materials.plantLeafYoung, yaw: 0.75, pitch: 0.14, roll: 0.06, stemLen: 0.112, stemAngle: 0.10, yOff: 0.064 },
    { geom: youngLeafGeom, mat: materials.plantLeafYoung, yaw: 2.85, pitch: 0.16, roll: -0.08, stemLen: 0.118, stemAngle: 0.12, yOff: 0.064 },
    { geom: youngLeafGeom, mat: materials.plantLeafYoung, yaw: 4.95, pitch: 0.12, roll: 0.05, stemLen: 0.110, stemAngle: 0.08, yOff: 0.064 },
  ], [largeLeafGeom, mediumLeafGeom, slenderLeafGeom, youngLeafGeom, materials]);

  // Floor plant leaf arrangement
  const floorLeaves = useMemo(() => [
    { geom: floorLeafGeom, mat: materials.plantLeafMature, yaw: 0.3, pitch: 0.38, roll: -0.12, stemLen: 0.42, stemAngle: 0.32, yOff: 0.12 },
    { geom: floorLeafGeom, mat: materials.plantLeafMature, yaw: 1.8, pitch: 0.42, roll: 0.15, stemLen: 0.46, stemAngle: 0.35, yOff: 0.14 },
    { geom: floorLeafGeom, mat: materials.plantLeafMedium, yaw: 3.4, pitch: 0.36, roll: -0.10, stemLen: 0.44, stemAngle: 0.30, yOff: 0.13 },
    { geom: floorLeafGeom, mat: materials.plantLeafMature, yaw: 5.1, pitch: 0.40, roll: 0.14, stemLen: 0.48, stemAngle: 0.34, yOff: 0.15 },
    { geom: floorMediumLeafGeom, mat: materials.plantLeafMedium, yaw: 1.1, pitch: 0.22, roll: 0.08, stemLen: 0.52, stemAngle: 0.16, yOff: 0.18 },
    { geom: floorMediumLeafGeom, mat: materials.plantLeafYoung, yaw: 2.9, pitch: 0.24, roll: -0.09, stemLen: 0.54, stemAngle: 0.18, yOff: 0.19 },
    { geom: floorMediumLeafGeom, mat: materials.plantLeafMedium, yaw: 4.4, pitch: 0.18, roll: 0.06, stemLen: 0.56, stemAngle: 0.14, yOff: 0.20 },
  ], [floorLeafGeom, floorMediumLeafGeom, materials]);

  return (
    <group name="botanical-plants">
      
      {/* ══════════════════════════════════════════════════════════════ */}
      {/*  1. DESK BOTANICAL PLANT (Corner Workstation)                  */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <group position={deskPlantPos} name="desk-plant">
        
        {/* Ceramic Drainage Saucer */}
        <mesh position={[0, 0.007, 0]} material={materials.plantPot} receiveShadow>
          <cylinderGeometry args={[0.082, 0.074, 0.014, 28]} />
        </mesh>

        {/* Tapered Modern Ceramic Planter (Hollow body) */}
        <mesh position={[0, 0.075, 0]} material={materials.plantPot} castShadow receiveShadow>
          <cylinderGeometry args={[0.076, 0.062, 0.136, 28, 1, true]} />
        </mesh>

        {/* Planter Bottom Base Cap */}
        <mesh position={[0, 0.012, 0]} material={materials.plantPot}>
          <cylinderGeometry args={[0.063, 0.063, 0.008, 28]} />
        </mesh>

        {/* Dark Rich Potting Soil Bed */}
        <mesh position={[0, 0.132, 0]} material={materials.soil} receiveShadow>
          <cylinderGeometry args={[0.072, 0.070, 0.016, 28]} />
        </mesh>

        {/* Organic Central Foliage Cluster (9 Naturally Curved Leaves & Stems) */}
        <group position={[0, 0.138, 0]} name="desk-foliage">
          {deskLeaves.map((leaf, idx) => {
            // Calculate stem end point to position the leaf blade naturally
            const stemRad = leaf.stemAngle;
            const endX = Math.sin(leaf.yaw) * Math.sin(stemRad) * leaf.stemLen;
            const endZ = Math.cos(leaf.yaw) * Math.sin(stemRad) * leaf.stemLen;
            const endY = leaf.yOff + Math.cos(stemRad) * leaf.stemLen;

            return (
              <group key={`desk-leaf-node-${idx}`}>
                {/* Organic Curved Petiole (Stem) */}
                <group position={[0, leaf.yOff, 0]} rotation={[0, leaf.yaw, 0]}>
                  <mesh
                    position={[0, (Math.cos(stemRad) * leaf.stemLen) / 2, (Math.sin(stemRad) * leaf.stemLen) / 2]}
                    rotation={[stemRad, 0, 0]}
                    material={materials.plantStem}
                  >
                    <cylinderGeometry args={[0.0016, 0.0024, leaf.stemLen, 8]} />
                  </mesh>
                </group>

                {/* Volumetric Double-Curved Leaf Blade with Varied Shading */}
                <group
                  position={[endX, endY, endZ]}
                  rotation={[leaf.pitch, leaf.yaw, leaf.roll]}
                >
                  <mesh
                    geometry={leaf.geom}
                    material={leaf.mat}
                    receiveShadow
                  />
                </group>
              </group>
            );
          })}
        </group>

      </group>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/*  2. ARCHITECTURAL FLOOR PLANTER (Far Corner Placement)         */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <group position={floorPlantPos} name="floor-planter">
        
        {/* Large Architectural Ceramic Floor Vessel */}
        <mesh position={[0, 0.28, 0]} material={materials.plantPot} castShadow receiveShadow>
          <cylinderGeometry args={[0.22, 0.17, 0.56, 32]} />
        </mesh>

        {/* Vessel Neck Ring */}
        <mesh position={[0, 0.565, 0]} material={materials.plantPot}>
          <cylinderGeometry args={[0.225, 0.225, 0.03, 32]} />
        </mesh>

        {/* Potting Soil Bed */}
        <mesh position={[0, 0.55, 0]} material={materials.soil} receiveShadow>
          <cylinderGeometry args={[0.21, 0.20, 0.02, 32]} />
        </mesh>

        {/* Broadleaf Tropical Foliage */}
        <group position={[0, 0.56, 0]} name="floor-foliage">
          {floorLeaves.map((leaf, idx) => {
            const stemRad = leaf.stemAngle;
            const endX = Math.sin(leaf.yaw) * Math.sin(stemRad) * leaf.stemLen;
            const endZ = Math.cos(leaf.yaw) * Math.sin(stemRad) * leaf.stemLen;
            const endY = leaf.yOff + Math.cos(stemRad) * leaf.stemLen;

            return (
              <group key={`floor-leaf-node-${idx}`}>
                {/* Thick Botanical Petiole */}
                <group position={[0, leaf.yOff, 0]} rotation={[0, leaf.yaw, 0]}>
                  <mesh
                    position={[0, (Math.cos(stemRad) * leaf.stemLen) / 2, (Math.sin(stemRad) * leaf.stemLen) / 2]}
                    rotation={[stemRad, 0, 0]}
                    material={materials.plantStem}
                  >
                    <cylinderGeometry args={[0.004, 0.007, leaf.stemLen, 10]} />
                  </mesh>
                </group>

                {/* Broad Arching Tropical Leaf Blade */}
                <group
                  position={[endX, endY, endZ]}
                  rotation={[leaf.pitch, leaf.yaw, leaf.roll]}
                >
                  <mesh
                    geometry={leaf.geom}
                    material={leaf.mat}
                    receiveShadow
                  />
                </group>
              </group>
            );
          })}
        </group>

      </group>

    </group>
  );
}
