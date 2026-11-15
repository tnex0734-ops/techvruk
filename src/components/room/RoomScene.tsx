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
 * WebGL Performance & Runtime Auditor
 * Gathers exact render calls, triangle counts, geometry instances,
 * texture counts, frame timing, and demand rendering behavior.
 * Caches scene graph traversal to eliminate per-frame CPU bottleneck.
 */
function WebGLStatsCollector() {
  const { gl, scene, camera } = useThree();
  const frameCountRef = useRef(0);
  const lastTimeRef = useRef(typeof performance !== "undefined" ? performance.now() : 0);
  const fpsRef = useRef(60);
  const cachedSceneStatsRef = useRef<{ triangles: number; meshCount: number; lines: number; points: number } | null>(null);

  useFrame(() => {
    if (typeof window === "undefined") return;

    frameCountRef.current += 1;
    const now = performance.now();
    const elapsed = now - lastTimeRef.current;

    (window as any).__SCENE__ = scene;
    (window as any).__CAMERA__ = camera;

    if (elapsed >= 500) {
      fpsRef.current = Math.round((frameCountRef.current * 1000) / elapsed);
      frameCountRef.current = 0;
      lastTimeRef.current = now;
    }

    // Only traverse scene graph once or every ~120 frames to avoid per-frame CPU overhead
    if (!cachedSceneStatsRef.current || frameCountRef.current % 120 === 0) {
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

      cachedSceneStatsRef.current = { triangles: Math.round(triangles), meshCount, lines, points };
    }

    const cached = cachedSceneStatsRef.current;

    // Texture memory estimation based on known procedural maps & shadow FBO
    const proceduralTextureBytes =
      (1024 * 640 * 4) + // IDE screen
      (512 * 680 * 4) * 2 + // 2 typography posters
      (512 * 512 * 4) * 4 + // wood, leaf, plaster, daylight
      (256 * 256 * 4) * 2;  // linen, wool
    const shadowMapBytes = 1024 * 1024 * 4; // PCF 1024 shadow depth buffer
    const totalTextureBytes = proceduralTextureBytes + shadowMapBytes;

    const auditData = {
      calls: gl.info.render.calls,
      triangles: gl.info.render.triangles || (cached ? cached.triangles : 0),
      sceneTriangles: cached ? cached.triangles : 0,
      meshCount: cached ? cached.meshCount : 0,
      lines: cached ? cached.lines : 0,
      points: cached ? cached.points : 0,
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
  });

  return null;
}

import { RoomInteractionTarget } from "./roomInteractionTypes";
import { BookProject } from "./objects/projectData";

export interface RoomSceneProps {
  cameraPreset?: CameraPreset;
  activeTarget?: RoomInteractionTarget;
  hoveredTarget?: RoomInteractionTarget;
  onSelect?: (target: "book" | "about" | "wall" | "wardrobe" | "phone" | "laptop" | "door" | "music") => void;
  onHover?: (target: "book" | "about" | "wall" | "wardrobe" | "phone" | "laptop" | "door" | "music" | null) => void;
  enableOrbit?: boolean;
  bookPageIndex?: number;
  isBookDossierEmerging?: boolean;
  onBookPageChange?: (newIndex: number) => void;
  onBookSelectProject?: (project: BookProject) => void;
  onCloseCurrentTarget?: () => void;
  selectedCardIndex?: number;
  onCardChange?: (index: number) => void;
  selectedAchievementIndex?: number;
  onAchievementChange?: (index: number) => void;
  isPlayingAudio?: boolean;
  onToggleAudio?: () => void;
}

export function RoomScene({
  cameraPreset,
  activeTarget = null,
  hoveredTarget = null,
  onSelect,
  onHover,
  enableOrbit = false,
  bookPageIndex = 0,
  isBookDossierEmerging = false,
  onBookPageChange,
  onBookSelectProject,
  onCloseCurrentTarget,
  selectedCardIndex = 0,
  onCardChange,
  selectedAchievementIndex = 0,
  onAchievementChange,
  isPlayingAudio = false,
  onToggleAudio,
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
        bookPageIndex={bookPageIndex}
        isBookDossierEmerging={isBookDossierEmerging}
        onBookPageChange={onBookPageChange}
        onBookSelectProject={onBookSelectProject}
        onCloseCurrentTarget={onCloseCurrentTarget}
        selectedCardIndex={selectedCardIndex}
        onCardChange={onCardChange}
        selectedAchievementIndex={selectedAchievementIndex}
        onAchievementChange={onAchievementChange}
        isPlayingAudio={isPlayingAudio}
        onToggleAudio={onToggleAudio}
      />
    </>
  );
}
