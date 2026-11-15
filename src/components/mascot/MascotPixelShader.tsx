"use client";

import React, { useRef, useMemo, useEffect } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";

interface MascotPixelShaderProps {
  /** Intro animation progress (0 to 1) */
  introProgress?: number;
  /** Scroll exit progress (0 = fully visible hero, 1 = fully dissolved into room) */
  scrollExitProgress?: number;
  /** Whether user prefers reduced motion */
  reducedMotion?: boolean;
  /** Mouse normalized coordinates [-1 to 1] for gentle pointer tilt */
  pointerX?: number;
  pointerY?: number;
}

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform sampler2D uMascot;
  uniform sampler2D uNoise;
  uniform float uProgress;       // Intro progress 0 -> 1
  uniform float uExitProgress;   // Exit progress 0 -> 1
  uniform float uGridSize;       // Pixel block density
  uniform float uFeather;        // Edge feathering
  uniform float uSettled;        // 1.0 = completely settled, razor sharp
  uniform float uNoiseSize;      // 256.0

  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;

    // 1. Quantized cell UV
    vec2 cell = floor(uv * uGridSize);
    vec2 pixelUv = (cell + 0.5) / uGridSize;

    // In fully settled state, sample original UV directly to ensure pristine high-DPI quality
    vec2 sampleUv = mix(pixelUv, uv, uSettled);
    vec4 source = texture2D(uMascot, sampleUv);

    // If source texture is completely transparent, discard immediately
    if (source.a < 0.005) {
      discard;
    }

    // 2. Sample deterministic grayscale noise at the quantized cell coordinate with directional bias
    vec2 noiseUv = mod(cell, uNoiseSize) / uNoiseSize;
    float rawNoise = texture2D(uNoise, noiseUv).r;
    // Bias toward lower-left: face/hand (top-right) resolves first, bottom-left resolves last
    float bias = ((1.0 - uv.y) * 0.45 + (1.0 - uv.x) * 0.35) * 0.30;
    float noiseVal = clamp(rawNoise + bias - 0.12, 0.0, 1.0);

    // 3. Intro Reveal calculation: noiseVal <= uProgress reveals the block
    float introReveal = smoothstep(noiseVal - uFeather, noiseVal + uFeather, uProgress);

    // 4. Scroll Exit calculation: as uExitProgress increases (0 -> 1), blocks dissolve away
    float exitThreshold = 1.0 - uExitProgress;
    float exitReveal = smoothstep(noiseVal - uFeather, noiseVal + uFeather, exitThreshold);

    // Combine reveals
    float activeReveal = mix(introReveal, exitReveal, step(0.001, uExitProgress));
    
    // When settled in hero state (no exit scroll), enforce 1.0
    float finalReveal = mix(activeReveal, 1.0, uSettled * (1.0 - step(0.001, uExitProgress)));

    float finalAlpha = source.a * finalReveal;

    if (finalAlpha < 0.01) {
      discard;
    }

    gl_FragColor = vec4(source.rgb, finalAlpha);
  }
`;

export function MascotPixelShaderPlane({
  introProgress = 1.0,
  scrollExitProgress = 0.0,
  reducedMotion = false,
  pointerX = 0,
  pointerY = 0,
}: MascotPixelShaderProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { invalidate } = useThree();

  // Load production mascot WebP texture and deterministic 256x256 noise texture
  const [mascotTexture, noiseTexture] = useMemo(() => {
    const loader = new THREE.TextureLoader();
    
    const mascot = loader.load("/mascot-hero/taushik-mascot-hero-cutout.webp", () => {
      invalidate();
    });
    mascot.colorSpace = THREE.SRGBColorSpace;
    mascot.wrapS = THREE.ClampToEdgeWrapping;
    mascot.wrapT = THREE.ClampToEdgeWrapping;
    mascot.minFilter = THREE.LinearMipmapLinearFilter;
    mascot.magFilter = THREE.LinearFilter;
    mascot.generateMipmaps = true;

    const noise = loader.load("/mascot-hero/pixel-dissolve-noise-512.png", () => {
      invalidate();
    });
    noise.colorSpace = THREE.NoColorSpace;
    noise.wrapS = THREE.RepeatWrapping;
    noise.wrapT = THREE.RepeatWrapping;
    noise.minFilter = THREE.NearestFilter;
    noise.magFilter = THREE.NearestFilter;
    noise.generateMipmaps = false;

    return [mascot, noise];
  }, [invalidate]);

  // Clean disposal on unmount
  useEffect(() => {
    return () => {
      mascotTexture.dispose();
      noiseTexture.dispose();
    };
  }, [mascotTexture, noiseTexture]);

  // Shader uniforms
  const uniforms = useMemo(() => {
    return {
      uMascot: { value: mascotTexture },
      uNoise: { value: noiseTexture },
      uProgress: { value: reducedMotion ? 1.0 : 0.0 },
      uExitProgress: { value: 0.0 },
      uGridSize: { value: reducedMotion ? 400.0 : 20.0 },
      uFeather: { value: 0.04 },
      uSettled: { value: reducedMotion ? 1.0 : 0.0 },
      uNoiseSize: { value: 256.0 },
    };
  }, [mascotTexture, noiseTexture, reducedMotion]);

  // Target values for smooth interpolation
  const targetProgress = useRef(reducedMotion ? 1.0 : 0.0);
  const targetGridSize = useRef(reducedMotion ? 400.0 : 20.0);
  const targetExit = useRef(0.0);
  const isSettled = useRef(reducedMotion);

  // Update target based on incoming props
  useEffect(() => {
    if (reducedMotion) {
      targetProgress.current = 1.0;
      targetGridSize.current = 400.0;
      targetExit.current = scrollExitProgress;
      isSettled.current = scrollExitProgress <= 0.001;
      if (materialRef.current) {
        materialRef.current.uniforms.uProgress.value = 1.0;
        materialRef.current.uniforms.uGridSize.value = 400.0;
        materialRef.current.uniforms.uExitProgress.value = scrollExitProgress;
        materialRef.current.uniforms.uSettled.value = scrollExitProgress <= 0.001 ? 1.0 : 0.0;
      }
      invalidate();
      return;
    }

    targetProgress.current = introProgress;
    targetExit.current = scrollExitProgress;

    if (scrollExitProgress > 0.005) {
      // Scrolling out: coarsens pixels as character dissolves
      targetGridSize.current = Math.max(16.0, 360.0 * (1.0 - scrollExitProgress * 0.8));
      isSettled.current = false;
    } else if (introProgress >= 0.98) {
      // Settled in hero: full high-res
      targetGridSize.current = 420.0;
      isSettled.current = true;
    } else {
      // Transitioning intro: moves from 20.0 to 360.0
      targetGridSize.current = THREE.MathUtils.lerp(20.0, 360.0, introProgress);
      isSettled.current = false;
    }

    invalidate();
  }, [introProgress, scrollExitProgress, reducedMotion, invalidate]);

  // Subtle pointer-reactive tilt within ±2.5 degrees
  useFrame((_, delta) => {
    if (!materialRef.current || !groupRef.current) return;

    // Pointer tilt smoothing
    const targetRotY = (pointerX * 2.2 * Math.PI) / 180;
    const targetRotX = (-pointerY * 1.8 * Math.PI) / 180;
    groupRef.current.rotation.y = THREE.MathUtils.damp(groupRef.current.rotation.y, targetRotY, 4.0, delta);
    groupRef.current.rotation.x = THREE.MathUtils.damp(groupRef.current.rotation.x, targetRotX, 4.0, delta);

    // Uniform interpolation
    const mat = materialRef.current;
    const currProg = mat.uniforms.uProgress.value;
    const currGrid = mat.uniforms.uGridSize.value;
    const currExit = mat.uniforms.uExitProgress.value;
    const currSettled = mat.uniforms.uSettled.value;

    const diffProg = Math.abs(currProg - targetProgress.current);
    const diffGrid = Math.abs(currGrid - targetGridSize.current);
    const diffExit = Math.abs(currExit - targetExit.current);
    const targetSettledVal = isSettled.current ? 1.0 : 0.0;
    const diffSettled = Math.abs(currSettled - targetSettledVal);

    if (targetProgress.current >= 0.98 && targetExit.current <= 0.001) {
      // Once intro finishes and no scroll exit, enforce razor-sharp settled state immediately
      mat.uniforms.uProgress.value = 1.0;
      mat.uniforms.uSettled.value = 1.0;
      mat.uniforms.uGridSize.value = 512.0;
      mat.uniforms.uExitProgress.value = 0.0;
    } else if (diffProg > 0.001 || diffGrid > 0.5 || diffExit > 0.001 || diffSettled > 0.01) {
      mat.uniforms.uProgress.value = THREE.MathUtils.damp(currProg, targetProgress.current, 6.0, delta);
      mat.uniforms.uGridSize.value = THREE.MathUtils.damp(currGrid, targetGridSize.current, 6.0, delta);
      mat.uniforms.uExitProgress.value = THREE.MathUtils.damp(currExit, targetExit.current, 8.0, delta);
      mat.uniforms.uSettled.value = THREE.MathUtils.damp(currSettled, targetSettledVal, 8.0, delta);
      invalidate();
    }
  });

  // Mascot hero cutout aspect ratio: 697 / 1122 = 0.621212
  // For a plane with height 3.3, width = 3.3 * (697 / 1122) = 2.05
  const planeHeight = 3.3;
  const planeWidth = planeHeight * (697 / 1122);

  return (
    <group ref={groupRef} position={[0, -0.05, 0]}>
      <mesh ref={meshRef}>
        <planeGeometry args={[planeWidth, planeHeight, 1, 1]} />
        <shaderMaterial
          ref={materialRef}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          depthTest={false}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

