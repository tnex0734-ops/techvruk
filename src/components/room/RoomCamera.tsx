"use client";

import { useEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";

export type CameraPreset = "desktop" | "laptop" | "tablet" | "mobile";

export interface CameraConfig {
  position: [number, number, number];
  target: [number, number, number];
  fov: number;
}

export const CAMERA_CONFIGS: Record<CameraPreset, CameraConfig> = {
  // Desktop (1440px+): Balanced 3/4 architectural framing filling ~75% of view
  desktop: {
    position: [4.2, 3.6, 5.4],
    target: [-0.35, 1.05, -0.2],
    fov: 44,
  },
  // Laptop (1024px - 1439px): Crisp proportioned overview
  laptop: {
    position: [4.4, 3.8, 5.7],
    target: [-0.35, 1.05, -0.2],
    fov: 46,
  },
  // Tablet (768px - 1023px): Slightly steeper elevation for 3:4 portrait aspect
  tablet: {
    position: [4.2, 4.2, 5.8],
    target: [-0.25, 0.95, -0.15],
    fov: 50,
  },
  // Mobile (< 768px): Intimate architectural view framed for vertical mobile screens
  mobile: {
    position: [3.9, 4.3, 5.8],
    target: [-0.2, 0.9, -0.1],
    fov: 54,
  },
};

export function getPresetForWidth(width: number): CameraPreset {
  if (width >= 1440) return "desktop";
  if (width >= 1024) return "laptop";
  if (width >= 768) return "tablet";
  return "mobile";
}

export function RoomCamera({
  forcedPreset,
  enableOrbit = false,
}: {
  forcedPreset?: CameraPreset;
  enableOrbit?: boolean;
}) {
  const { camera, size, invalidate } = useThree();
  const currentPresetRef = useRef<CameraPreset | null>(null);

  useEffect(() => {
    if (enableOrbit) return;

    const preset = forcedPreset || getPresetForWidth(size.width);
    const config = CAMERA_CONFIGS[preset];

    const perspCam = camera as THREE.PerspectiveCamera;
    perspCam.fov = config.fov;
    perspCam.position.set(...config.position);
    perspCam.lookAt(...config.target);
    perspCam.updateProjectionMatrix();

    currentPresetRef.current = preset;
    invalidate();
  }, [camera, size.width, forcedPreset, enableOrbit, invalidate]);

  return null;
}
