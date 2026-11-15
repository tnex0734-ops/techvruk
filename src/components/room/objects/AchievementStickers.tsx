"use client";

import React, { useMemo } from "react";
import * as THREE from "three";
import { RoomMaterials } from "../RoomMaterials";
import { achievements } from "@/lib/content";
import { SpatialAchievementCard } from "./SpatialAchievementCard";

interface AchievementStickersProps {
  materials: RoomMaterials;
  isHovered?: boolean;
  isSelected?: boolean;
  selectedAchievementIndex?: number;
  onSelect?: () => void;
  onClose?: () => void;
  onAchievementChange?: (newIndex: number) => void;
  onHover?: (hovered: boolean) => void;
}

/**
 * Physical Achievement Stickers & Connecting Thread on Wardrobe Door
 * - Mounted on the visible rightmost cupboard door (Front face at X = -2.86m)
 * - Die-cut paper/vinyl stickers with physical thickness and bevels
 * - Visible brass pushpins and 3D connecting thread between them
 * - Spatial 3D achievement presentation card lifts forward toward camera when selected
 */
export function AchievementStickers({
  materials,
  isHovered = false,
  isSelected = false,
  selectedAchievementIndex = 0,
  onSelect,
  onClose,
  onAchievementChange,
  onHover,
}: AchievementStickersProps) {
  // Relative positions [Z_local, Y_local] on the door surface
  const stickerConfigs = [
    // 0: Uxplosion 3.0 (Hexagon badge - Top Left of cluster)
    { id: "uxplosion", z: -0.22, y: 0.28, rot: 0.04, color: "#EFCB75", shape: "hexagon", label: "UXPLOSION 3.0 // 1ST" },
    // 1: CVR College (Circle stamp - Top Right)
    { id: "cvr", z: 0.20, y: 0.24, rot: -0.06, color: "#8CB7E5", shape: "circle", label: "CVR // 1ST PRIZE" },
    // 2: Signal Labs (Shield arch - Bottom Left)
    { id: "signallabs", z: -0.18, y: -0.18, rot: -0.03, color: "#A3B29A", shape: "shield", label: "SIGNAL LABS // AI 1ST" },
    // 3: SCIENT College (Banner - Bottom Right)
    { id: "scientclg", z: 0.18, y: -0.22, rot: 0.05, color: "#DE8D7F", shape: "banner", label: "SCIENT // RUNNER UP" },
  ];

  // 3D Spline Thread connecting pushpin points
  const threadPoints = useMemo(() => {
    return [
      new THREE.Vector3(stickerConfigs[0].z, stickerConfigs[0].y, 0.012),
      new THREE.Vector3(0.0, 0.12, 0.015),
      new THREE.Vector3(stickerConfigs[1].z, stickerConfigs[1].y, 0.012),
      new THREE.Vector3(0.04, 0.02, 0.016),
      new THREE.Vector3(stickerConfigs[3].z, stickerConfigs[3].y, 0.012),
      new THREE.Vector3(0.0, -0.26, 0.014),
      new THREE.Vector3(stickerConfigs[2].z, stickerConfigs[2].y, 0.012),
    ];
  }, []);

  const threadCurve = useMemo(() => {
    return new THREE.CatmullRomCurve3(threadPoints, false, "centripetal", 0.5);
  }, [threadPoints]);

  const threadGeo = useMemo(() => {
    return new THREE.TubeGeometry(threadCurve, 40, 0.002, 6, false);
  }, [threadCurve]);

  return (
    <group
      name="achievement-stickers-object"
      position={[-2.865, 1.40, 0.50]}
      rotation={[0, Math.PI / 2, 0]}
      onClick={(e) => {
        if (!isSelected && onSelect) {
          e.stopPropagation();
          onSelect();
        }
      }}
      onPointerOver={(e) => {
        if (!isSelected && onHover) {
          e.stopPropagation();
          document.body.style.cursor = "pointer";
          onHover(true);
        }
      }}
      onPointerOut={() => {
        if (onHover) {
          document.body.style.cursor = "auto";
          onHover(false);
        }
      }}
    >
      {/* ── 0. Generous Invisible Interaction Hitbox ── */}
      <mesh position={[0, 0, 0.03]} visible={false}>
        <boxGeometry args={[0.75, 0.75, 0.10]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      {/* ── 1. Connecting Physical Thread Curve ── */}
      <mesh geometry={threadGeo} material={materials.thread} castShadow />

      {/* ── 2. Die-Cut Physical Stickers ── */}
      {stickerConfigs.map((sticker, idx) => {
        const isSelectedSticker = isSelected && selectedAchievementIndex === idx;
        const liftX = isSelectedSticker ? 0.045 : 0.005;

        return (
          <group
            key={`sticker-${sticker.id}`}
            position={[sticker.z, sticker.y, liftX]}
            rotation={[0, 0, sticker.rot]}
            onClick={(e) => {
              e.stopPropagation();
              if (onAchievementChange) {
                onAchievementChange(idx);
              }
              if (!isSelected && onSelect) {
                onSelect();
              }
            }}
          >
            {/* Sticker Base Shape with Printed Paper Finish */}
            <mesh receiveShadow>
              {sticker.shape === "circle" ? (
                <cylinderGeometry args={[0.075, 0.075, 0.003, 24]} />
              ) : sticker.shape === "hexagon" ? (
                <cylinderGeometry args={[0.08, 0.08, 0.003, 6]} />
              ) : sticker.shape === "shield" ? (
                <boxGeometry args={[0.14, 0.15, 0.003]} />
              ) : (
                <boxGeometry args={[0.16, 0.12, 0.003]} />
              )}
              <meshStandardMaterial
                color={sticker.color}
                roughness={0.82}
                metalness={0.02}
              />
            </mesh>

            {/* Inner Graphic Inset Badge */}
            <mesh position={[0, 0, 0.002]}>
              <planeGeometry args={[0.11, 0.08]} />
              <meshStandardMaterial
                color="#FFFDF7"
                roughness={0.9}
                metalness={0.0}
              />
            </mesh>

            {/* Graphic / Label Bar Indicator */}
            <mesh position={[0, -0.015, 0.0025]}>
              <planeGeometry args={[0.08, 0.022]} />
              <meshBasicMaterial color="#273246" transparent opacity={0.85} />
            </mesh>

            {/* Brass Pushpin Anchor */}
            <group position={[0, 0.05, 0.005]}>
              <mesh>
                <sphereGeometry args={[0.007, 10, 10]} />
                <meshStandardMaterial color="#EFCB75" roughness={0.3} metalness={0.85} />
              </mesh>
              <mesh position={[0, 0, -0.004]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.0015, 0.0015, 0.008, 6]} />
                <meshStandardMaterial color="#666666" metalness={0.9} />
              </mesh>
            </group>
          </group>
        );
      })}

      {/* ── 3. Spatial 3D Achievement Presentation Card ── */}
      <SpatialAchievementCard
        isOpen={isSelected}
        activeIndex={selectedAchievementIndex}
        onIndexChange={onAchievementChange ? onAchievementChange : () => {}}
        onClose={onClose ? onClose : () => {}}
      />
    </group>
  );
}
