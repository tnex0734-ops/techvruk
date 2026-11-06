"use client";

import React from "react";
import { OrbitControls } from "@react-three/drei";
import { RoomCamera, CameraPreset } from "./RoomCamera";
import { RoomLighting } from "./RoomLighting";
import { RoomShell } from "./RoomShell";
import { RoomFurniture } from "./RoomFurniture";

export interface RoomSceneProps {
  cameraPreset?: CameraPreset;
  enableOrbit?: boolean;
}

export function RoomScene({ cameraPreset, enableOrbit = false }: RoomSceneProps) {
  return (
    <>
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
