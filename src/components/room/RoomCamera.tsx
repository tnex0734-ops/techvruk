"use client";

import { useEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";

export type CameraPreset =
  | "desktop"
  | "laptop"
  | "tablet"
  | "mobile"
  | "workstation"
  | "wardrobe"
  | "bed"
  | "doorWindow";

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
  // Workstation Close-Up: Frontal perspective directly facing the laptop screen, keyboard, peripherals and wall art
  workstation: {
    position: [-1.95, 1.22, -1.05],
    target: [-2.05, 0.98, -1.88],
    fov: 46,
  },
  // Wardrobe Close-Up: 3-door wardrobe with handles, reveals and plinth
  wardrobe: {
    position: [-1.15, 1.45, 1.85],
    target: [-3.05, 1.25, 0.70],
    fov: 42,
  },
  // Bed Close-Up: Platform bed, upholstered headboard, draped duvet, pillows and throw
  bed: {
    position: [0.25, 1.45, 0.45],
    target: [1.85, 0.65, -1.45],
    fov: 42,
  },
  // Door & Window Close-Up: Architectural window casing, cross mullions, daylight plane and ajar door
  doorWindow: {
    position: [1.35, 1.65, 0.75],
    target: [3.60, 1.45, 0.55],
    fov: 46,
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
