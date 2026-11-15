"use client";

import React, { useRef, useMemo, useEffect } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { RoomMaterials } from "../RoomMaterials";
import { BookPages } from "./BookPages";
import { BOOK_PROJECTS, BookProject } from "./projectData";
import { createBookCoverTexture } from "./BookPageTextures";

interface ProjectsBookProps {
  materials: RoomMaterials;
  isHovered?: boolean;
  isSelected?: boolean;
  pageIndex?: number;
  isDossierEmerging?: boolean;
  onSelect?: () => void;
  onCloseDossier?: () => void;
  onHover?: (hovered: boolean) => void;
  onPageChange?: (newIndex: number) => void;
  onSelectProject?: (project: BookProject) => void;
}

/**
 * Volumetric Holographic Projector Beam
 * Emits glowing cyan laser light cone and emitter rings rising from the book's center spine
 * into the floating detail card.
 */
function HologramBookEmitter({ isOpen }: { isOpen: boolean }) {
  const beamRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!isOpen) return;
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.4;
    }
  });

  if (!isOpen) return null;

  return (
    <group position={[0, 0.02, 0]} name="book-hologram-emitter">
      {/* ── Hologram Emitter Base Ring on Book Spine ── */}
      <group ref={ringRef} rotation={[-Math.PI / 2, 0, 0]}>
        <mesh position={[0, 0, 0.002]}>
          <ringGeometry args={[0.025, 0.045, 32]} />
          <meshBasicMaterial color="#38BDF8" transparent opacity={0.65} side={THREE.DoubleSide} />
        </mesh>
        <mesh position={[0, 0, 0.003]}>
          <ringGeometry args={[0.048, 0.052, 32]} />
          <meshBasicMaterial color="#7AC5C7" transparent opacity={0.4} side={THREE.DoubleSide} />
        </mesh>
      </group>

      {/* ── Subtle Volumetric Hologram Light Cone Shooting Upward ── */}
      <mesh
        ref={beamRef}
        position={[0, 0.35, 0]}
        rotation={[0, 0, 0]}
      >
        <cylinderGeometry args={[0.18, 0.04, 0.70, 24, 1, true]} />
        <meshBasicMaterial
          color="#38BDF8"
          transparent
          opacity={0.065}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>

      {/* Point light providing ambient aqua illumination on book surface */}
      <pointLight
        position={[0, 0.25, 0]}
        color="#38BDF8"
        intensity={0.6}
        distance={1.2}
      />
    </group>
  );
}

/**
 * Physical Hardcover Projects Book on Desk
 * - Resting position on desk: [-2.32, 0.744, -1.75]
 * - Closed state: Deep ink buckram cloth cover with gold embossed serif typography
 * - Open state: Symmetrical buckram hardcover resting flat on desk with thick page block
 * - Left Page: Table of contents with active project highlighted and click affordance
 * - Right Page: Clean card-style project spread with title, stack, preview, and dossier callout
 * - Intact physical book geometry: pristine binding, no disconnected meshes or stuck leaves
 */
export function ProjectsBook({
  materials,
  isHovered = false,
  isSelected = false,
  pageIndex = 0,
  isDossierEmerging = false,
  onSelect,
  onCloseDossier,
  onHover,
  onPageChange,
  onSelectProject,
}: ProjectsBookProps) {
  const { invalidate } = useThree();
  const groupRef = useRef<THREE.Group>(null);

  // Book Dimensions (meters)
  const bookW = 0.38; // Width along X for one leaf
  const bookD = 0.28; // Depth along Z
  const bookH = 0.038; // Total thickness along Y
  const coverT = 0.005; // Cover board thickness
  const pageH = bookH - coverT * 2; // Page block thickness (~0.028m)

  // Cover Texture
  const coverTexture = useMemo(() => {
    return createBookCoverTexture();
  }, []);

  // Force R3F re-render when book selection or page changes
  useEffect(() => {
    invalidate();
  }, [isSelected, pageIndex, invalidate]);

  const handleNextPage = () => {
    if (pageIndex < BOOK_PROJECTS.length - 1) {
      onPageChange?.(pageIndex + 1);
    }
  };

  const handlePrevPage = () => {
    if (pageIndex > 0) {
      onPageChange?.(pageIndex - 1);
    }
  };

  return (
    <group
      ref={groupRef}
      name="projects-book-object"
      position={[-2.32, 0.744, -1.75]}
      rotation={[0, 0, 0]}
    >
      {/* ── 0. Generous Invisible Interaction Hitbox ── */}
      <mesh
        position={[0, bookH / 2, 0]}
        visible={false}
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
        <boxGeometry args={[bookW * 2 + 0.15, bookH + 0.15, bookD + 0.15]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      {/* ── 1. Closed Book State ── */}
      {!isSelected ? (
        <group name="closed-projects-book">
          {/* Bottom Cover Board */}
          <mesh
            position={[bookW / 2, coverT / 2, 0]}
            material={materials.bookCover}
            castShadow
            receiveShadow
          >
            <boxGeometry args={[bookW, coverT, bookD]} />
          </mesh>

          {/* Spine Binding */}
          <mesh
            position={[0, bookH / 2, 0]}
            material={materials.bookCover}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <cylinderGeometry args={[bookH / 2, bookH / 2, bookD, 16, 1, false, Math.PI / 2, Math.PI]} />
          </mesh>

          {/* Gold Spine Ribs */}
          {[-0.09, -0.03, 0.03, 0.09].map((z, idx) => (
            <mesh
              key={`spine-rib-${idx}`}
              position={[-bookH / 2, bookH / 2, z]}
              material={materials.metalGold}
            >
              <boxGeometry args={[0.003, 0.006, 0.008]} />
            </mesh>
          ))}

          {/* Front Cover Board (Closed atop page block) */}
          <mesh
            position={[bookW / 2, bookH - coverT / 2, 0]}
            castShadow
            receiveShadow
            onClick={(e) => {
              if (onSelect) {
                e.stopPropagation();
                onSelect();
              }
            }}
          >
            <boxGeometry args={[bookW, coverT, bookD]} />
            {coverTexture ? (
              <meshStandardMaterial
                map={coverTexture}
                roughness={0.7}
                metalness={0.15}
              />
            ) : (
              <primitive object={materials.bookCover} attach="material" />
            )}
          </mesh>

          {/* Closed State Page Block */}
          <mesh
            position={[bookW / 2, coverT + pageH / 2, 0]}
            material={materials.parchmentPaper}
            receiveShadow
          >
            <boxGeometry args={[bookW - 0.015, pageH, bookD - 0.012]} />
          </mesh>

          {/* Ribbon Bookmark (Tucked at bottom edge) */}
          <group position={[0, bookH / 2, bookD / 2]}>
            <mesh position={[0.02, -0.005, 0.025]} rotation={[0.25, 0.1, 0]}>
              <boxGeometry args={[0.018, 0.002, 0.06]} />
              <meshStandardMaterial color="#EFCB75" roughness={0.7} />
            </mesh>
            <mesh position={[0.025, -0.016, 0.06]} rotation={[0.65, 0, 0]}>
              <boxGeometry args={[0.018, 0.002, 0.04]} />
              <meshStandardMaterial color="#EFCB75" roughness={0.7} />
            </mesh>
          </group>

          {/* Subtle Hover Glow Ring */}
          {isHovered && (
            <mesh position={[bookW / 2, bookH + 0.004, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <planeGeometry args={[bookW + 0.02, bookD + 0.02]} />
              <meshBasicMaterial color="#38BDF8" transparent opacity={0.22} />
            </mesh>
          )}
        </group>
      ) : (
        /* ── 2. Open Book State (Completely Intact Symmetrical Hardcover) ── */
        <group name="open-projects-book">
          {/* Left Bottom Cover Board (Lying flat on desk) */}
          <mesh
            position={[-bookW / 2, coverT / 2, 0]}
            material={materials.bookCover}
            receiveShadow
          >
            <boxGeometry args={[bookW, coverT, bookD]} />
          </mesh>

          {/* Right Bottom Cover Board (Lying flat on desk) */}
          <mesh
            position={[bookW / 2, coverT / 2, 0]}
            material={materials.bookCover}
            receiveShadow
          >
            <boxGeometry args={[bookW, coverT, bookD]} />
          </mesh>

          {/* Central Spine Hinge Strip (Connecting both covers seamlessly) */}
          <mesh
            position={[0, coverT / 2, 0]}
            material={materials.bookCover}
          >
            <boxGeometry args={[0.024, coverT, bookD]} />
          </mesh>

          {/* Left Archival Paper Block Underneath Left Page */}
          <mesh
            position={[-bookW / 2 + 0.008, coverT + pageH / 2, 0]}
            material={materials.parchmentPaper}
            receiveShadow
          >
            <boxGeometry args={[bookW - 0.016, pageH, bookD - 0.012]} />
          </mesh>

          {/* Right Archival Paper Block Underneath Right Page */}
          <mesh
            position={[bookW / 2 - 0.008, coverT + pageH / 2, 0]}
            material={materials.parchmentPaper}
            receiveShadow
          >
            <boxGeometry args={[bookW - 0.016, pageH, bookD - 0.012]} />
          </mesh>

          {/* Center Spine Gutter Shadow Groove */}
          <mesh position={[0, coverT + pageH + 0.001, 0]}>
            <boxGeometry args={[0.008, 0.002, bookD * 0.94]} />
            <meshStandardMaterial color="#1E2229" roughness={0.95} />
          </mesh>

          {/* Golden Ribbon Bookmark Resting Inside Center Spine Groove */}
          <mesh position={[0, coverT + pageH + 0.002, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[0.014, bookD * 0.92]} />
            <meshStandardMaterial color="#EFCB75" roughness={0.65} />
          </mesh>

          {/* Volumetric Hologram Emitter Beaming Upward from Book */}
          <HologramBookEmitter isOpen={isSelected} />

          {/* Interior Single Folio Page (Single project shown at a time with page flips) */}
          <group position={[0, coverT + pageH + 0.001, 0]}>
            <BookPages
              materials={materials}
              isOpen={isSelected}
              pageIndex={pageIndex}
              isDossierEmerging={isDossierEmerging}
              onTurnNext={handleNextPage}
              onTurnPrev={handlePrevPage}
              onSelectProject={onSelectProject}
              onCloseDossier={onCloseDossier}
              onPageChange={onPageChange}
            />
          </group>
        </group>
      )}
    </group>
  );
}
