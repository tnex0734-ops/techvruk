"use client";

import { useEffect, useRef } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { RoomInteractionTarget, ROOM_HOTSPOTS } from "./roomInteractionTypes";

export type CameraPreset =
  | "desktop"
  | "laptop"
  | "tablet"
  | "mobile"
  | "workstation"
  | "wardrobe"
  | "bed"
  | "fishbowl"
  | "plant"
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
  // Workstation Close-Up: Frontal perspective centering the open laptop screen, flanked by plant & fishbowl
  workstation: {
    position: [-2.05, 1.20, -1.05],
    target: [-2.05, 0.98, -1.88],
    fov: 44,
  },
  // Wardrobe Close-Up: Recalibrated wider framing to show the entire 3-door wardrobe, reveals, plinth and handles
  wardrobe: {
    position: [0.10, 1.45, 2.75],
    target: [-2.95, 1.10, 0.40],
    fov: 46,
  },
  // Bed Close-Up: Recalibrated framing showcasing the platform frame, tufted headboard, soft pillows & draped duvet
  bed: {
    position: [-0.20, 1.45, 0.95],
    target: [1.90, 0.48, -1.35],
    fov: 46,
  },
  // Fishbowl Close-Up: Focused inspection of curved glass bowl, water volume, swimming goldfish and pebbles
  fishbowl: {
    position: [-1.47, 0.98, -1.60],
    target: [-1.47, 0.86, -2.01],
    fov: 34,
  },
  // Plant Close-Up: Focused inspection of ceramic pot, drainage saucer, soil and curved botanical leaves
  plant: {
    position: [-2.20, 1.05, -1.35],
    target: [-2.60, 0.88, -1.95],
    fov: 32,
  },
  // Door & Window Close-Up: Architectural window casing, cross mullions, daylight plane and ajar door
  doorWindow: {
    position: [1.35, 1.60, 0.85],
    target: [3.50, 1.25, 0.55],
    fov: 46,
  },
};

export function getPresetForWidth(width: number): CameraPreset {
  if (width >= 1440) return "desktop";
  if (width >= 1024) return "laptop";
  if (width >= 768) return "tablet";
  return "mobile";
}

export interface RoomCameraProps {
  forcedPreset?: CameraPreset;
  activeTarget?: RoomInteractionTarget;
  enableOrbit?: boolean;
}

export function RoomCamera({
  forcedPreset,
  activeTarget,
  enableOrbit = false,
}: RoomCameraProps) {
  const { camera, size, invalidate } = useThree();

  const currentLookAtRef = useRef<THREE.Vector3>(new THREE.Vector3(-0.2, 1.0, -0.3));
  const targetPosRef = useRef<THREE.Vector3>(new THREE.Vector3());
  const targetLookAtRef = useRef<THREE.Vector3>(new THREE.Vector3());
  const targetFovRef = useRef<number>(44);
  const isTransitioningRef = useRef<boolean>(false);
  const prefersReducedMotionRef = useRef<boolean>(false);

  // Check prefers-reduced-motion
  useEffect(() => {
    if (typeof window !== "undefined") {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      prefersReducedMotionRef.current = mq.matches;
      const handler = (e: MediaQueryListEvent) => {
        prefersReducedMotionRef.current = e.matches;
      };
      mq.addEventListener("change", handler);
      return () => mq.removeEventListener("change", handler);
    }
  }, []);

  // Calculate target configuration whenever activeTarget, forcedPreset or size changes
  useEffect(() => {
    if (enableOrbit) return;

    let config: CameraConfig;

    if (activeTarget && ROOM_HOTSPOTS[activeTarget]) {
      const hotspot = ROOM_HOTSPOTS[activeTarget];
      config = {
        position: hotspot.cameraPosition,
        target: hotspot.cameraTarget,
        fov: hotspot.cameraFov,
      };
    } else {
      const preset = forcedPreset || getPresetForWidth(size.width);
      config = CAMERA_CONFIGS[preset];
    }

    targetPosRef.current.set(...config.position);
    targetLookAtRef.current.set(...config.target);
    targetFovRef.current = config.fov;

    const perspCam = camera as THREE.PerspectiveCamera;

    // Instant snap if reduced motion
    if (prefersReducedMotionRef.current) {
      perspCam.position.copy(targetPosRef.current);
      currentLookAtRef.current.copy(targetLookAtRef.current);
      perspCam.lookAt(currentLookAtRef.current);
      perspCam.fov = targetFovRef.current;
      perspCam.updateProjectionMatrix();
      isTransitioningRef.current = false;
    } else {
      isTransitioningRef.current = true;
    }

    invalidate();
  }, [camera, size.width, forcedPreset, activeTarget, enableOrbit, invalidate]);

  // Smooth lerp animation loop strictly integrated with demand rendering
  useFrame((_, delta) => {
    if (enableOrbit || !isTransitioningRef.current) return;

    const perspCam = camera as THREE.PerspectiveCamera;
    const t = Math.min(1, delta * 4.2);

    perspCam.position.lerp(targetPosRef.current, t);
    currentLookAtRef.current.lerp(targetLookAtRef.current, t);
    perspCam.lookAt(currentLookAtRef.current);

    perspCam.fov = THREE.MathUtils.lerp(perspCam.fov, targetFovRef.current, t);
    perspCam.updateProjectionMatrix();

    const distPos = perspCam.position.distanceTo(targetPosRef.current);
    const distLook = currentLookAtRef.current.distanceTo(targetLookAtRef.current);
    const diffFov = Math.abs(perspCam.fov - targetFovRef.current);

    // Stop transitioning when within threshold
    if (distPos < 0.005 && distLook < 0.005 && diffFov < 0.05) {
      perspCam.position.copy(targetPosRef.current);
      currentLookAtRef.current.copy(targetLookAtRef.current);
      perspCam.lookAt(currentLookAtRef.current);
      perspCam.fov = targetFovRef.current;
      perspCam.updateProjectionMatrix();
      isTransitioningRef.current = false;
    } else {
      invalidate();
    }
  });

  return null;
}
