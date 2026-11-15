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
    position: [3.1, 4.4, 6.8],
    target: [-0.15, 1.0, -0.3],
    fov: 48,
  },
  // Mobile (< 768px): Calibrated wide-angle architectural composition
  // Entire room (Left cupboards, center workstation, right bed, window, door) 100% visible without cropping
  mobile: {
    position: [3.05, 5.95, 15.64],
    target: [0.0, 1.20, -0.3],
    fov: 54,
  },
  // Workstation Close-Up
  workstation: {
    position: [-2.05, 1.35, -0.95],
    target: [-2.05, 0.98, -1.88],
    fov: 44,
  },
  // Wardrobe Close-Up
  wardrobe: {
    position: [-1.15, 1.40, 0.50],
    target: [-2.86, 1.40, 0.50],
    fov: 42,
  },
  // Bed Close-Up
  bed: {
    position: [-0.20, 1.45, 0.95],
    target: [1.90, 0.48, -1.35],
    fov: 46,
  },
  // Fishbowl Close-Up
  fishbowl: {
    position: [-1.47, 0.98, -1.60],
    target: [-1.47, 0.86, -2.01],
    fov: 34,
  },
  // Plant Close-Up
  plant: {
    position: [-2.20, 1.05, -1.35],
    target: [-2.60, 0.88, -1.95],
    fov: 32,
  },
  // Door & Window Close-Up
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

    let pos: [number, number, number];
    let tgt: [number, number, number];
    let fov: number;

    const aspect = size.width / Math.max(size.height, 1);
    const isPortrait = aspect < 1.0 || size.width < 768;

    if (activeTarget && ROOM_HOTSPOTS[activeTarget]) {
      const hotspot = ROOM_HOTSPOTS[activeTarget];
      tgt = [...hotspot.cameraTarget];
      fov = hotspot.cameraFov;

      if (isPortrait) {
        // Dynamically pull camera back along vector from target to camera position
        // to maintain complete horizontal framing in portrait mode without clipping
        const dx = hotspot.cameraPosition[0] - hotspot.cameraTarget[0];
        const dy = hotspot.cameraPosition[1] - hotspot.cameraTarget[1];
        const dz = hotspot.cameraPosition[2] - hotspot.cameraTarget[2];
        
        // Scale factor inversely proportional to aspect ratio, smoothly bounded
        const aspectScale = Math.max(1.0, 1.35 / Math.max(aspect, 0.38));
        const mult = (hotspot.mobileDistanceMultiplier || 1.25) * (aspectScale * 0.85);

        pos = [
          hotspot.cameraTarget[0] + dx * mult,
          hotspot.cameraTarget[1] + dy * mult,
          hotspot.cameraTarget[2] + dz * mult,
        ];
        // Mild FOV boost for portrait immersion
        fov = hotspot.cameraFov + Math.min(6, Math.max(2, (1.0 - aspect) * 8));
      } else {
        pos = [...hotspot.cameraPosition];
      }
    } else {
      if (isPortrait) {
        // Dynamic portrait room overview framing:
        // Guarantees the entire 7.2m room width (wardrobe on left, bed and door on right)
        // is 100% visible with comfortable breathing room on all screen sizes.
        const targetVisibleWidth = 9.2; // meters (7.2m room + 1m margins)
        const baseFov = 54;
        const tanHalfVFov = Math.tan((baseFov * Math.PI) / 360);
        const tanHalfHFov = tanHalfVFov * aspect;
        const requiredDistance = (targetVisibleWidth / 2) / Math.max(tanHalfHFov, 0.15);

        // Center target at eye level inside the room
        tgt = [0.0, 1.20, -0.3];

        // Normalized 3/4 isometric viewpoint direction
        const dir = new THREE.Vector3(0.18, 0.28, 0.94).normalize();

        pos = [
          tgt[0] + dir.x * requiredDistance,
          tgt[1] + dir.y * requiredDistance,
          tgt[2] + dir.z * requiredDistance,
        ];
        fov = baseFov;
      } else {
        const preset = forcedPreset || getPresetForWidth(size.width);
        const config = CAMERA_CONFIGS[preset];
        pos = [...config.position];
        tgt = [...config.target];
        fov = config.fov;
      }
    }

    targetPosRef.current.set(...pos);
    targetLookAtRef.current.set(...tgt);
    targetFovRef.current = fov;

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
  }, [camera, size.width, size.height, forcedPreset, activeTarget, enableOrbit, invalidate]);

  // Smooth lerp animation loop strictly integrated with demand rendering
  useFrame((_, delta) => {
    if (enableOrbit || !isTransitioningRef.current) return;

    const perspCam = camera as THREE.PerspectiveCamera;
    // Controlled exponential easing (tau ~ 0.2s, smooth ~450ms settle)
    const t = Math.min(1, delta * 4.6);

    perspCam.position.lerp(targetPosRef.current, t);
    currentLookAtRef.current.lerp(targetLookAtRef.current, t);
    perspCam.lookAt(currentLookAtRef.current);

    perspCam.fov = THREE.MathUtils.lerp(perspCam.fov, targetFovRef.current, t);
    perspCam.updateProjectionMatrix();

    const distPos = perspCam.position.distanceTo(targetPosRef.current);
    const distLook = currentLookAtRef.current.distanceTo(targetLookAtRef.current);
    const diffFov = Math.abs(perspCam.fov - targetFovRef.current);

    // Stop transitioning when within threshold to preserve 0% idle CPU
    if (distPos < 0.004 && distLook < 0.004 && diffFov < 0.04) {
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
