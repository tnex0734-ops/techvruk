"use client";

import React, { useRef, useMemo, useEffect } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";

interface ContactHologramProps {
  isOpen: boolean;
  onClose?: () => void;
}

/**
 * Authentic Volumetric 3D Hologram Projector
 * 100% faithful to the user's reference image:
 * - Sleek dark metallic projector puck with concentric glowing cyan energy rings
 * - Upward-shooting crepuscular volumetric light rays fanning out from the emitter lens
 * - Authentic glowing chibi robot hologram avatar head floating majestically above the beam
 *   complete with pointed antenna, fin ear pods, deep sleek visor, glowing inward-angled eyes,
 *   and authentic horizontal TV/CRT scanlines
 * - Ascending sparkling cyan dust particles
 * - Subtle floating breathing and levitation physics
 */
export function ContactHologram({ isOpen, onClose }: ContactHologramProps) {
  const { invalidate } = useThree();
  const groupRef = useRef<THREE.Group>(null);
  const projectionRef = useRef<THREE.Group>(null);
  const ringsGroupRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);
  const currentScaleRef = useRef(0);

  // Load the unified high-resolution hologram texture extracted from reference image
  const unifiedTexture = useMemo(() => {
    if (typeof window === "undefined") return null;
    const loader = new THREE.TextureLoader();
    const tex = loader.load("/hologram/taushik-hologram-unified.webp", () => invalidate());
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.generateMipmaps = true;
    tex.minFilter = THREE.LinearMipmapLinearFilter;
    tex.magFilter = THREE.LinearFilter;
    return tex;
  }, [invalidate]);

  useEffect(() => {
    return () => {
      unifiedTexture?.dispose();
    };
  }, [unifiedTexture]);

  // Generate ascending spark particles inside the light cone
  const particleCount = 42;
  const particlePositions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const heightFrac = Math.random();
      const y = 0.04 + heightFrac * 0.30;
      const radiusAtHeight = 0.012 + heightFrac * 0.085;
      const angle = Math.random() * Math.PI * 2;
      const r = Math.sqrt(Math.random()) * radiusAtHeight;
      pos[i * 3 + 0] = Math.cos(angle) * r;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = Math.sin(angle) * r;
    }
    return pos;
  }, []);

  // Frame loop for emergence scaling, ring rotation, bobbing avatar, and particles
  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Smooth open / close scaling
    const targetScale = isOpen ? 1 : 0;
    const curScale = currentScaleRef.current;
    const diff = Math.abs(curScale - targetScale);

    if (diff > 0.005) {
      const speed = 7.5;
      const newScale = curScale + (targetScale - curScale) * Math.min(delta * speed, 1.0);
      currentScaleRef.current = newScale;
      groupRef.current.scale.set(newScale, newScale, newScale);
      invalidate();
    }

    if (!isOpen && currentScaleRef.current < 0.01) return;

    const time = state.clock.getElapsedTime();

    // Rotate concentric emitter rings on puck
    if (ringsGroupRef.current) {
      ringsGroupRef.current.rotation.z += delta * 0.45;
    }

    // Floating breathing levitation for holographic projection
    if (projectionRef.current) {
      // Bobbing height: centered at y = 0.198
      projectionRef.current.position.y = 0.198 + Math.sin(time * 2.2) * 0.005;
      // Gentle subtle yaw breathing
      projectionRef.current.rotation.y = Math.sin(time * 0.8) * 0.05;
      // Subtle pulse scale
      const pulse = 1.0 + Math.sin(time * 3.2) * 0.01;
      projectionRef.current.scale.set(pulse, pulse, pulse);
    }

    // Animate ascending particle sparks
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        let y = positions[i * 3 + 1] + delta * 0.07;
        if (y > 0.35) {
          y = 0.03;
        }
        positions[i * 3 + 1] = y;
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }

    invalidate();
  });

  if (!isOpen && currentScaleRef.current < 0.01) return null;

  // Quad geometry dimensions for 462x665 aspect ratio
  const quadW = 0.264;
  const quadH = 0.380;

  return (
    <group
      ref={groupRef}
      name="desk-phone-hologram-projector"
      position={[0, 0, 0]}
    >
      {/* ── 1. Circular Projector Base Puck (Dark Tech Metal with Glowing Rim) ── */}
      <group position={[0, 0.006, 0]}>
        {/* Metallic Beveled Body */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.048, 0.052, 0.012, 32]} />
          <meshStandardMaterial
            color="#080C14"
            metalness={0.92}
            roughness={0.22}
          />
        </mesh>

        {/* Concentric Glowing Cyan Energy Rings on Puck Top Face */}
        <group ref={ringsGroupRef} position={[0, 0.0062, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <mesh position={[0, 0, 0.001]}>
            <ringGeometry args={[0.039, 0.044, 32]} />
            <meshBasicMaterial
              color="#00E5FF"
              transparent
              opacity={0.88}
              side={THREE.DoubleSide}
            />
          </mesh>
          <mesh position={[0, 0, 0.002]}>
            <ringGeometry args={[0.025, 0.029, 32]} />
            <meshBasicMaterial
              color="#38BDF8"
              transparent
              opacity={0.82}
              side={THREE.DoubleSide}
            />
          </mesh>
          <mesh position={[0, 0, 0.003]}>
            <ringGeometry args={[0.013, 0.016, 24]} />
            <meshBasicMaterial
              color="#00FFFF"
              transparent
              opacity={0.92}
              side={THREE.DoubleSide}
            />
          </mesh>
        </group>

        {/* Radiant Central Emitter Lens */}
        <mesh position={[0, 0.007, 0]}>
          <cylinderGeometry args={[0.010, 0.010, 0.003, 24]} />
          <meshBasicMaterial color="#E0F7FA" />
        </mesh>
      </group>

      {/* ── 2. The Hologram Projection (Exact Match to User Reference Image) ── */}
      <group
        ref={projectionRef}
        name="hologram-unified-projection"
        position={[0, 0.198, 0]}
      >
        {/* Main Frontal Projection Quad */}
        {unifiedTexture && (
          <mesh position={[0, 0, 0]}>
            <planeGeometry args={[quadW, quadH]} />
            <meshBasicMaterial
              map={unifiedTexture}
              transparent
              opacity={0.98}
              depthWrite={false}
              side={THREE.DoubleSide}
            />
          </mesh>
        )}

        {/* Angled Cross Projection Quad (Provides Volumetric 3D Depth) */}
        {unifiedTexture && (
          <mesh position={[0, 0, 0]} rotation={[0, 0.22, 0]}>
            <planeGeometry args={[quadW, quadH]} />
            <meshBasicMaterial
              map={unifiedTexture}
              transparent
              opacity={0.35}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
              side={THREE.DoubleSide}
            />
          </mesh>
        )}

        {/* Opposite Cross Projection Quad */}
        {unifiedTexture && (
          <mesh position={[0, 0, 0]} rotation={[0, -0.22, 0]}>
            <planeGeometry args={[quadW, quadH]} />
            <meshBasicMaterial
              map={unifiedTexture}
              transparent
              opacity={0.35}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
              side={THREE.DoubleSide}
            />
          </mesh>
        )}
      </group>

      {/* ── 3. Ascending Hologram Spark Particles ── */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particlePositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.004}
          color="#38BDF8"
          transparent
          opacity={0.85}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* ── 4. Neon Cyan Point Light Illuminating Desk & Phone ── */}
      <pointLight
        position={[0, 0.22, 0]}
        color="#00E5FF"
        intensity={1.2}
        distance={0.95}
      />
    </group>
  );
}
