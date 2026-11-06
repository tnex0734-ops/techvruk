"use client";

import { useEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";

export type CameraPreset = "desktop" | "laptop" | "tablet" | "mobile" | "workstation";

export interface CameraConfig {
  position: [number, number, number];
  target: [number, number, number];
  fov: number;
}

export const CAMERA_CONFIGS: Record<CameraPreset, CameraConfig> = {
  // Desktop (1440px+): Balanced 3/4 architectural framing filling ~75% of view with stepped cutaway sightlines
  desktop: {
    position: [3.4, 3.8, 5.8],
    target: [-0.2, 1.0, -0.3],
    fov: 44,
  },
  // Laptop (1024px - 1439px): Crisp proportioned overview
  laptop: {
    position: [3.5, 3.9, 6.0],
    target: [-0.2, 1.0, -0.3],
    fov: 45,
  },
  // Tablet (768px - 1023px): Slightly steeper elevation for 3:4 portrait aspect
  tablet: {
    position: [2.8, 4.4, 6.8],
    target: [-0.15, 1.0, -0.3],
    fov: 48,
  },
  // Mobile (< 768px): Calibrated wide-angle architectural composition
  // Entire room (Left cupboards, center workstation, right bed, window, door) 100% visible without cropping
  mobile: {
    position: [2.1, 5.0, 8.4],
    target: [0.0, 1.05, -0.35],
    fov: 56,
  },
  // Workstation Close-Up: Intimate focal view of the creative desk, laptop on stand, peripherals, fishbowl and art
  workstation: {
    position: [-0.65, 1.35, -0.65],
    target: [-1.65, 0.95, -1.85],
    fov: 40,
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
