"use client";

import React, { useRef, useState } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { RoundedBox, Html } from "@react-three/drei";
import { RoomMaterials } from "../RoomMaterials";
import { Music, Play, Pause, Disc } from "lucide-react";

interface RetroCassettePlayerProps {
  materials: RoomMaterials;
  isPlaying?: boolean;
  onTogglePlay?: () => void;
  onSelect?: () => void;
  position?: [number, number, number];
}

/**
 * Wall-Mounted Retro Cassette Deck & Rotating Spool Music Player
 * 
 * Features:
 * - Vintage 1980s Dieter Rams / Sony Walkman aesthetic wall-mounted unit.
 * - Warm bone/cream ABS casing with rounded corners and brushed aluminum accents.
 * - Smoked acrylic cassette door showing the "FITOOR • SIDE A" cassette tape.
 * - Dual toothed tape spools that physically spin in real-time when audio is playing.
 * - Glowing crimson status LED indicator illuminating the playback head.
 * - Top piano-key mechanical controls (PLAY, STOP/EJECT, REW, FF).
 * - Tactile archival paper label: "[♪] CASSETTE DECK // FITOOR • CLICK TO PLAY/PAUSE".
 * - Clicking the 3D deck or label toggles playback seamlessly in sync with the top navbar.
 */
export function RetroCassettePlayer({
  materials,
  isPlaying = false,
  onTogglePlay,
  onSelect,
  position = [0.28, 1.42, -2.675],
}: RetroCassettePlayerProps) {
  const { invalidate } = useThree();
  const leftSpoolRef = useRef<THREE.Group>(null);
  const rightSpoolRef = useRef<THREE.Group>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Rotate cassette tape spools in real-time when audio is playing
  useFrame((_, delta) => {
    if (!isPlaying) return;
    const speed = 2.4; // smooth ~2.4 rad/s rotation
    if (leftSpoolRef.current) {
      leftSpoolRef.current.rotation.z += delta * speed;
    }
    if (rightSpoolRef.current) {
      rightSpoolRef.current.rotation.z += delta * speed;
    }
    invalidate();
  });

  const handleClick = (e: any) => {
    e.stopPropagation();
    onSelect?.();
    if (!isPlaying) {
      onTogglePlay?.();
    }
  };

  // Dimensions (meters)
  const deckW = 0.28;
  const deckH = 0.19;
  const deckD = 0.045;

  return (
    <group
      position={position}
      name="retro-cassette-player-module"
      onClick={handleClick}
      onPointerOver={(e) => {
        e.stopPropagation();
        document.body.style.cursor = "pointer";
        setIsHovered(true);
      }}
      onPointerOut={() => {
        document.body.style.cursor = "auto";
        setIsHovered(false);
      }}
    >
      {/* ── 0. Generous Invisible Interaction Hitbox ── */}
      <mesh position={[0, 0, deckD / 2]} visible={false}>
        <boxGeometry args={[deckW + 0.08, deckH + 0.08, deckD + 0.06]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      {/* ── 1. Main Vintage Housing (Warm Bone Resin) ── */}
      <RoundedBox
        args={[deckW, deckH, deckD]}
        radius={0.008}
        smoothness={4}
        castShadow
        receiveShadow
        position={[0, 0, deckD / 2]}
      >
        <meshStandardMaterial
          color={isHovered ? "#F4EFEA" : "#ECE7DE"}
          roughness={0.4}
          metalness={0.1}
        />
      </RoundedBox>

      {/* Brushed Silver Front Faceplate Inset */}
      <mesh position={[0, 0, deckD + 0.001]} receiveShadow>
        <planeGeometry args={[deckW - 0.018, deckH - 0.018]} />
        <meshStandardMaterial
          color="#D8D4CC"
          roughness={0.3}
          metalness={0.4}
        />
      </mesh>

      {/* ── 2. Top Mechanical Piano Keys (PLAY, STOP, REW, FF, REC) ── */}
      <group position={[-0.04, deckH / 2 + 0.006, deckD / 2]}>
        {[-0.05, -0.025, 0, 0.025, 0.05].map((xOffset, idx) => {
          const isPlayBtn = idx === 1;
          const isRecBtn = idx === 4;
          return (
            <mesh
              key={`key-${idx}`}
              position={[xOffset, 0, 0]}
              castShadow
            >
              <boxGeometry args={[0.02, 0.012, 0.022]} />
              <meshStandardMaterial
                color={
                  isPlayBtn && isPlaying
                    ? "#E52424"
                    : isRecBtn
                    ? "#8B1E1E"
                    : "#22252A"
                }
                roughness={0.35}
                metalness={0.3}
              />
            </mesh>
          );
        })}
      </group>

      {/* ── 3. Left Stereo Speaker Grille Slots ── */}
      <group position={[-deckW / 2 + 0.038, 0, deckD + 0.002]}>
        {[-0.05, -0.03, -0.01, 0.01, 0.03, 0.05].map((yOffset, idx) => (
          <mesh key={`slot-${idx}`} position={[0, yOffset, 0]}>
            <planeGeometry args={[0.036, 0.005]} />
            <meshBasicMaterial color="#1E2024" />
          </mesh>
        ))}
      </group>

      {/* ── 4. Cassette Well Compartment ── */}
      <group position={[0.035, 0, deckD + 0.002]}>
        {/* Recessed Cassette Well Background */}
        <mesh position={[0, 0, -0.002]}>
          <planeGeometry args={[0.165, 0.11]} />
          <meshStandardMaterial color="#1A1C20" roughness={0.8} />
        </mesh>

        {/* ── Cassette Tape Shell ── */}
        <group position={[0, 0, 0.003]}>
          {/* Smoked Cassette Body */}
          <mesh>
            <planeGeometry args={[0.155, 0.098]} />
            <meshStandardMaterial
              color="#22252A"
              roughness={0.3}
              metalness={0.2}
            />
          </mesh>

          {/* Vintage Paper Tape Label (Cream & Red Band) */}
          <mesh position={[0, 0.008, 0.001]}>
            <planeGeometry args={[0.138, 0.058]} />
            <meshStandardMaterial color="#FAF5EE" roughness={0.85} />
          </mesh>
          {/* Red Accent Label Stripe */}
          <mesh position={[0, 0.026, 0.0015]}>
            <planeGeometry args={[0.138, 0.012]} />
            <meshBasicMaterial color="#E52424" />
          </mesh>

          {/* Central Tape Clear Window */}
          <mesh position={[0, -0.002, 0.002]}>
            <planeGeometry args={[0.082, 0.028]} />
            <meshStandardMaterial
              color="#111315"
              roughness={0.1}
              transparent
              opacity={0.8}
            />
          </mesh>

          {/* ── Rotating Left Tape Spool Hub ── */}
          <group ref={leftSpoolRef} position={[-0.032, -0.002, 0.003]}>
            {/* White Hub Cylinder */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.014, 0.014, 0.002, 18]} />
              <meshStandardMaterial color="#FAF5EE" roughness={0.5} />
            </mesh>
            {/* Center Hole */}
            <mesh position={[0, 0, 0.0015]}>
              <circleGeometry args={[0.006, 16]} />
              <meshBasicMaterial color="#111315" />
            </mesh>
            {/* 3 Teeth Driving Spokes */}
            {[0, (2 * Math.PI) / 3, (4 * Math.PI) / 3].map((rad, idx) => (
              <mesh
                key={`left-tooth-${idx}`}
                position={[Math.cos(rad) * 0.009, Math.sin(rad) * 0.009, 0.002]}
                rotation={[0, 0, rad]}
              >
                <boxGeometry args={[0.003, 0.003, 0.002]} />
                <meshBasicMaterial color="#FAF5EE" />
              </mesh>
            ))}
          </group>

          {/* ── Rotating Right Tape Spool Hub ── */}
          <group ref={rightSpoolRef} position={[0.032, -0.002, 0.003]}>
            {/* White Hub Cylinder */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.014, 0.014, 0.002, 18]} />
              <meshStandardMaterial color="#FAF5EE" roughness={0.5} />
            </mesh>
            {/* Center Hole */}
            <mesh position={[0, 0, 0.0015]}>
              <circleGeometry args={[0.006, 16]} />
              <meshBasicMaterial color="#111315" />
            </mesh>
            {/* 3 Teeth Driving Spokes */}
            {[0, (2 * Math.PI) / 3, (4 * Math.PI) / 3].map((rad, idx) => (
              <mesh
                key={`right-tooth-${idx}`}
                position={[Math.cos(rad) * 0.009, Math.sin(rad) * 0.009, 0.002]}
                rotation={[0, 0, rad]}
              >
                <boxGeometry args={[0.003, 0.003, 0.002]} />
                <meshBasicMaterial color="#FAF5EE" />
              </mesh>
            ))}
          </group>

          {/* Magnetic Ribbon Tape Strand Between Spools */}
          <mesh position={[0, -0.002, 0.0025]}>
            <planeGeometry args={[0.064, 0.004]} />
            <meshBasicMaterial color="#3D2B1F" />
          </mesh>
        </group>

        {/* ── Smoked Acrylic Door Glass Window ── */}
        <mesh position={[0, 0, 0.008]} castShadow>
          <planeGeometry args={[0.168, 0.114]} />
          <meshPhysicalMaterial
            color="#A8B4C0"
            transparent
            opacity={0.28}
            roughness={0.1}
            transmission={0.65}
            thickness={0.004}
          />
        </mesh>
      </group>

      {/* ── 5. Status Power & Playback Indicator LED ── */}
      <group position={[0.115, deckH / 2 - 0.022, deckD + 0.004]}>
        <mesh>
          <sphereGeometry args={[0.0035, 16, 16]} />
          <meshBasicMaterial
            color={isPlaying ? "#E52424" : "#4A2020"}
          />
        </mesh>
        {isPlaying && (
          <pointLight
            color="#E52424"
            intensity={0.6}
            distance={0.35}
          />
        )}
      </group>
    </group>
  );
}
