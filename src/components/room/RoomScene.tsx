"use client";

import React, { useRef } from "react";
import { OrbitControls } from "@react-three/drei";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { RoomCamera, CameraPreset } from "./RoomCamera";
import { RoomLighting } from "./RoomLighting";
import { RoomShell } from "./RoomShell";
import { RoomFurniture } from "./RoomFurniture";

/**
 * High-Precision WebGL Performance & Runtime Auditor
 * Gathers exact render calls, triangle counts, geometry instances,
 * texture counts, frame timing, and demand rendering behavior.
 */
function WebGLStatsCollector() {
  const { gl, scene } = useThree();
  const frameCountRef = useRef(0);
  const lastTimeRef = useRef(typeof performance !== "undefined" ? performance.now() : 0);
  const fpsRef = useRef(60);

  useFrame(() => {
    if (typeof window !== "undefined") {
      frameCountRef.current += 1;
      const now = performance.now();
      const elapsed = now - lastTimeRef.current;

      if (elapsed >= 1000) {
        fpsRef.current = Math.round((frameCountRef.current * 1000) / elapsed);
        frameCountRef.current = 0;
        lastTimeRef.current = now;
      }

      let triangles = 0;
      let meshCount = 0;
      let points = 0;
      let lines = 0;

      scene.traverse((obj) => {
        if ((obj as THREE.Mesh).isMesh) {
          meshCount += 1;
          const mesh = obj as THREE.Mesh;
          if (mesh.geometry) {
            if (mesh.geometry.index) {
              triangles += mesh.geometry.index.count / 3;
            } else if (mesh.geometry.attributes?.position) {
              triangles += mesh.geometry.attributes.position.count / 3;
            }
          }
        } else if ((obj as THREE.Line).isLine) {
          lines += 1;
        } else if ((obj as THREE.Points).isPoints) {
          points += 1;
        }
      });

      // Texture memory estimation based on known procedural maps & shadow FBO
      const proceduralTextureBytes =
        (1024 * 640 * 4) + // IDE screen
        (512 * 680 * 4) * 2 + // 2 typography posters
        (512 * 512 * 4) * 4 + // wood, leaf, plaster, daylight
        (256 * 256 * 4) * 2;  // linen, wool
      const shadowMapBytes = 2048 * 2048 * 4; // PCF 2048 shadow depth buffer
      const totalTextureBytes = proceduralTextureBytes + shadowMapBytes;

      const auditData = {
        calls: gl.info.render.calls,
        triangles: gl.info.render.triangles || Math.round(triangles),
        sceneTriangles: Math.round(triangles),
        meshCount,
        lines,
        points,
        geometries: gl.info.memory.geometries,
        textures: gl.info.memory.textures,
        textureMemoryMB: +(totalTextureBytes / (1024 * 1024)).toFixed(2),
        textureMemoryBytes: totalTextureBytes,
        fps: fpsRef.current,
        dpr: +(window.devicePixelRatio || 1).toFixed(2),
        isDocumentVisible: !document.hidden,
      };

      (window as any).__ROOM_WEBGL_STATS__ = auditData;
      (window as any).__ROOM_PERF_AUDIT__ = auditData;
    }
  });

  return null;
}

import { RoomInteractionTarget } from "./roomInteractionTypes";

export interface RoomSceneProps {
  cameraPreset?: CameraPreset;
  activeTarget?: RoomInteractionTarget;
  hoveredTarget?: RoomInteractionTarget;
  onSelect?: (target: "laptop" | "wardrobe" | "door") => void;
  onHover?: (target: "laptop" | "wardrobe" | "door" | null) => void;
  enableOrbit?: boolean;
}

export function RoomScene({
  cameraPreset,
  activeTarget = null,
  hoveredTarget = null,
  onSelect,
  onHover,
  enableOrbit = false,
}: RoomSceneProps) {
  return (
    <>
      <WebGLStatsCollector />

      {/* ── Responsive Perspective Camera with Smooth Focus Animation ── */}
      <RoomCamera
        forcedPreset={cameraPreset}
        activeTarget={activeTarget}
        enableOrbit={enableOrbit}
      />

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

      {/* ── Specified Furniture Blockout & Interactive Hotspots ── */}
      <RoomFurniture
        activeTarget={activeTarget}
        hoveredTarget={hoveredTarget}
        onSelect={onSelect}
        onHover={onHover}
      />
    </>
  );
}
