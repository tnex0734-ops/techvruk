"use client";

import React, { useMemo } from "react";
import * as THREE from "three";
import { ROOM_DIMENSIONS } from "../roomDimensions";
import { RoomMaterials } from "../RoomMaterials";

interface PlantProps {
  materials: RoomMaterials;
}

/**
 * Creates naturally curved, double-sided botanical leaf geometry
 * with central vein indentation, graceful arching, and downward droop.
 */
function createCurvedLeafGeometry(length: number, maxWidth: number, arch: number, curl: number) {
  const segments = 10;
  const positions: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];

  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    // Teardrop profile width
    const w = maxWidth * Math.sin(t * Math.PI) * (1 - 0.15 * t);
    // Gravity droop arch: arches up, then cascades gracefully down
    const y = Math.sin(t * Math.PI * 0.85) * arch - (t * t * 0.035);
    const z = t * length;
    // Transverse cup (central midrib is depressed)
    const veinDrop = w * curl;

    // Left vertex
    positions.push(-w, y + veinDrop, z);
    uvs.push(0, t);

    // Center midrib vertex
    positions.push(0, y, z);
    uvs.push(0.5, t);

    // Right vertex
    positions.push(w, y + veinDrop, z);
    uvs.push(1, t);
  }

  for (let i = 0; i < segments; i++) {
    const row1 = i * 3;
    const row2 = (i + 1) * 3;

    // Left quad
    indices.push(row1, row2, row1 + 1);
    indices.push(row1 + 1, row2, row2 + 1);

    // Right quad
    indices.push(row1 + 1, row2 + 1, row1 + 2);
    indices.push(row1 + 2, row2 + 1, row2 + 2);
  }

  const geom = new THREE.BufferGeometry();
  geom.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geom.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
  geom.setIndex(indices);
  geom.computeVertexNormals();
  return geom;
}

/**
 * High-Fidelity Architectural Plants (Desk & Floor)
 * 
 * Features:
 * - Desk Plant: Contemporary matte ceramic pot, drainage saucer, dark organic soil,
 *   slender organic stems, and 9 naturally curved leaves with varied lengths, arches and droops.
 * - Floor Planter: Architectural fluted vessel with tall broad-leaf botanical structure.
 * - Natural botanical textures with central midrib and lateral veins.
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

  // Geometries for varied leaf sizes (Desk Plant)
  const largeLeafGeom = useMemo(() => createCurvedLeafGeometry(0.135, 0.052, 0.038, 0.22), []);
  const mediumLeafGeom = useMemo(() => createCurvedLeafGeometry(0.115, 0.046, 0.032, 0.20), []);
  const smallLeafGeom = useMemo(() => createCurvedLeafGeometry(0.090, 0.036, 0.024, 0.18), []);

  // Floor Plant large paddle leaf geometry
  const floorLeafGeom = useMemo(() => createCurvedLeafGeometry(0.38, 0.14, 0.11, 0.24), []);
  const floorMediumLeafGeom = useMemo(() => createCurvedLeafGeometry(0.32, 0.12, 0.09, 0.22), []);

  // Natural phyllotaxis distribution of desk leaves
  const deskLeaves = useMemo(() => [
    // 3 Mature Lower Cascading Leaves
    { geom: largeLeafGeom, yaw: 0.2, pitch: 0.42, roll: -0.15, stemLen: 0.075, stemAngle: 0.35, yOff: 0.02 },
    { geom: largeLeafGeom, yaw: 2.1, pitch: 0.45, roll: 0.20, stemLen: 0.080, stemAngle: 0.38, yOff: 0.02 },
    { geom: largeLeafGeom, yaw: 4.3, pitch: 0.40, roll: -0.10, stemLen: 0.078, stemAngle: 0.36, yOff: 0.02 },
    // 3 Mid-Height Spreading Leaves
    { geom: mediumLeafGeom, yaw: 1.1, pitch: 0.28, roll: 0.12, stemLen: 0.095, stemAngle: 0.22, yOff: 0.04 },
    { geom: mediumLeafGeom, yaw: 3.2, pitch: 0.30, roll: -0.14, stemLen: 0.092, stemAngle: 0.24, yOff: 0.04 },
    { geom: mediumLeafGeom, yaw: 5.4, pitch: 0.26, roll: 0.10, stemLen: 0.098, stemAngle: 0.20, yOff: 0.04 },
    // 3 Young Upright Center Leaves
    { geom: smallLeafGeom, yaw: 0.7, pitch: 0.12, roll: 0.05, stemLen: 0.110, stemAngle: 0.08, yOff: 0.06 },
    { geom: smallLeafGeom, yaw: 2.8, pitch: 0.14, roll: -0.06, stemLen: 0.115, stemAngle: 0.10, yOff: 0.06 },
    { geom: smallLeafGeom, yaw: 4.9, pitch: 0.10, roll: 0.04, stemLen: 0.108, stemAngle: 0.07, yOff: 0.06 },
  ], [largeLeafGeom, mediumLeafGeom, smallLeafGeom]);

  // Floor plant leaf arrangement
  const floorLeaves = useMemo(() => [
    { geom: floorLeafGeom, yaw: 0.3, pitch: 0.38, roll: -0.12, stemLen: 0.42, stemAngle: 0.32, yOff: 0.12 },
    { geom: floorLeafGeom, yaw: 1.8, pitch: 0.42, roll: 0.15, stemLen: 0.46, stemAngle: 0.35, yOff: 0.14 },
    { geom: floorLeafGeom, yaw: 3.4, pitch: 0.36, roll: -0.10, stemLen: 0.44, stemAngle: 0.30, yOff: 0.13 },
    { geom: floorLeafGeom, yaw: 5.1, pitch: 0.40, roll: 0.14, stemLen: 0.48, stemAngle: 0.34, yOff: 0.15 },
    { geom: floorMediumLeafGeom, yaw: 1.1, pitch: 0.22, roll: 0.08, stemLen: 0.52, stemAngle: 0.16, yOff: 0.18 },
    { geom: floorMediumLeafGeom, yaw: 2.9, pitch: 0.24, roll: -0.09, stemLen: 0.54, stemAngle: 0.18, yOff: 0.19 },
    { geom: floorMediumLeafGeom, yaw: 4.4, pitch: 0.18, roll: 0.06, stemLen: 0.56, stemAngle: 0.14, yOff: 0.20 },
  ], [floorLeafGeom, floorMediumLeafGeom]);

  return (
    <group name="botanical-plants">
      
      {/* ══════════════════════════════════════════════════════════════ */}
      {/*  1. DESK BOTANICAL PLANT (Corner Workstation)                  */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <group position={deskPlantPos} name="desk-plant">
        
        {/* Ceramic Drainage Saucer */}
        <mesh position={[0, 0.007, 0]} material={materials.plantPot}>
          <cylinderGeometry args={[0.082, 0.074, 0.014, 28]} />
        </mesh>

        {/* Tapered Modern Ceramic Planter (Hollow body) */}
        <mesh position={[0, 0.075, 0]} material={materials.plantPot}>
          <cylinderGeometry args={[0.076, 0.062, 0.136, 28, 1, true]} />
        </mesh>

        {/* Pot Rim Lip */}
        <mesh position={[0, 0.141, 0]} material={materials.plantPot}>
          <cylinderGeometry args={[0.078, 0.076, 0.012, 28, 1, true]} />
        </mesh>

        {/* Rich Organic Potting Soil Bed (Visible dark soil mix) */}
        <mesh position={[0, 0.132, 0]} rotation={[-Math.PI / 2, 0, 0]} material={materials.soil}>
          <circleGeometry args={[0.074, 28]} />
        </mesh>

        {/* Organic Foliage Canopy */}
        <group position={[0, 0.136, 0]} name="foliage-canopy">
          {deskLeaves.map((leaf, idx) => (
            <group
              key={`desk-leaf-${idx}`}
              rotation={[0, leaf.yaw, 0]}
              position={[0, leaf.yOff, 0]}
            >
              {/* Slender Organic Stem (Petiole) */}
              <group rotation={[leaf.stemAngle, 0, 0]}>
                <mesh position={[0, leaf.stemLen / 2, 0]} material={materials.plantStem}>
                  <cylinderGeometry args={[0.0020, 0.0028, leaf.stemLen, 8]} />
                </mesh>
                
                {/* Curved Leaf Blade at Stem Terminal */}
                <group
                  position={[0, leaf.stemLen, 0]}
                  rotation={[leaf.pitch, 0, leaf.roll]}
                >
                  <mesh
                    geometry={leaf.geom}
                    material={materials.plantLeaf}
                    castShadow
                  />
                </group>
              </group>
            </group>
          ))}
        </group>
      </group>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/*  2. LARGE ARCHITECTURAL FLOOR PLANTER (Left Corner)            */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <group position={floorPlantPos} name="floor-planter">
        
        {/* Floor Saucer */}
        <mesh position={[0, 0.012, 0]} material={materials.plantPot}>
          <cylinderGeometry args={[0.19, 0.17, 0.024, 28]} />
        </mesh>

        {/* Tall Ceramic Planter Vessel */}
        <mesh position={[0, 0.24, 0]} material={materials.plantPot}>
          <cylinderGeometry args={[0.18, 0.13, 0.46, 28]} />
        </mesh>

        {/* Planter Rim */}
        <mesh position={[0, 0.47, 0]} material={materials.plantPot}>
          <cylinderGeometry args={[0.185, 0.18, 0.020, 28]} />
        </mesh>

        {/* Potting Soil Bed */}
        <mesh position={[0, 0.455, 0]} material={materials.soil}>
          <cylinderGeometry args={[0.175, 0.165, 0.020, 24]} />
        </mesh>

        {/* Tall Architectural Broadleaf Stems & Blades */}
        <group position={[0, 0.46, 0]} name="floor-foliage">
          {floorLeaves.map((leaf, idx) => (
            <group
              key={`floor-leaf-${idx}`}
              rotation={[0, leaf.yaw, 0]}
              position={[0, leaf.yOff, 0]}
            >
              {/* Woody/Stout Stem */}
              <group rotation={[leaf.stemAngle, 0, 0]}>
                <mesh position={[0, leaf.stemLen / 2, 0]} material={materials.plantStem}>
                  <cylinderGeometry args={[0.005, 0.009, leaf.stemLen, 8]} />
                </mesh>

                {/* Broad Architectural Blade */}
                <group
                  position={[0, leaf.stemLen, 0]}
                  rotation={[leaf.pitch, 0, leaf.roll]}
                >
                  <mesh
                    geometry={leaf.geom}
                    material={materials.plantLeaf}
                    castShadow
                  />
                </group>
              </group>
            </group>
          ))}
        </group>
      </group>

    </group>
  );
}
