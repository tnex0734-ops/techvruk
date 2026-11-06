"use client";

import React from "react";
import { OrbitControls } from "@react-three/drei";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { RoomCamera, CameraPreset } from "./RoomCamera";
import { RoomLighting } from "./RoomLighting";
import { RoomShell } from "./RoomShell";
import { RoomFurniture } from "./RoomFurniture";

function WebGLStatsCollector() {
  const { gl, scene } = useThree();
  useFrame(() => {
    if (typeof window !== "undefined") {
      let triangles = 0;
      scene.traverse((obj) => {
        if ((obj as THREE.Mesh).isMesh) {
          const mesh = obj as THREE.Mesh;
          if (mesh.geometry) {
            if (mesh.geometry.index) {
              triangles += mesh.geometry.index.count / 3;
            } else if (mesh.geometry.attributes?.position) {
              triangles += mesh.geometry.attributes.position.count / 3;
            }
          }
        }
      });
      (window as any).__ROOM_WEBGL_STATS__ = {
        calls: gl.info.render.calls,
        triangles: gl.info.render.triangles || Math.round(triangles),
        sceneTriangles: Math.round(triangles),
        geometries: gl.info.memory.geometries,
        textures: gl.info.memory.textures,
      };
    }
  });
  return null;
}

export interface RoomSceneProps {
  cameraPreset?: CameraPreset;
  enableOrbit?: boolean;
}

export function RoomScene({ cameraPreset, enableOrbit = false }: RoomSceneProps) {
  return (
    <>
      <WebGLStatsCollector />

      {/* ── Responsive Perspective Camera ── */}
      <RoomCamera forcedPreset={cameraPreset} enableOrbit={enableOrbit} />

      {/* ── Optional Dev / Inspection Orbit Controls ── */}
      {enableOrbit && (
        <OrbitControls
          makeDefault
          target={[-0.4, 0.9, -0.3]}
          minDistance={3.5}
          maxDistance={18}
          maxPolarAngle={Math.PI / 2 - 0.05} // prevent going below floor
        />
      )}

      {/* ── Natural Architectural Daylight Rig ── */}
      <RoomLighting />

      {/* ── Open-Front Architectural Cutaway Room Shell ── */}
      <RoomShell />

      {/* ── Specified Furniture Blockout (Left / Corner / Right) ── */}
      <RoomFurniture />
    </>
  );
}
