"use client";

import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { RoomMaterials } from "../RoomMaterials";
import {
  Sparkles,
  X,
  Code2,
  Palette,
  Layers,
  MapPin,
  GraduationCap,
  Heart,
  CheckCircle2,
} from "lucide-react";

interface AboutNotebookProps {
  materials: RoomMaterials;
  isHovered?: boolean;
  isSelected?: boolean;
  onSelect?: () => void;
  onClose?: () => void;
  onHover?: (hovered: boolean) => void;
  position?: [number, number, number];
}

/**
 * Physical Personal Sketchbook: The "About" In-Room Destination
 * Resting gracefully on the Scandinavian bedside reading table: [0.85, 0.525, -1.95]
 * Features crisp vector typography embedded directly on the open notebook paper spread.
 */
export function AboutNotebook({
  materials,
  isHovered = false,
  isSelected = false,
  onSelect,
  onClose,
  onHover,
  position = [0.85, 0.525, -1.95],
}: AboutNotebookProps) {
  const { invalidate } = useThree();
  const groupRef = useRef<THREE.Group>(null);
  const currentLiftRef = useRef(0);
  const baseY = position[1];

  // Dimensions (meters)
  const bookW = 0.28;
  const bookD = 0.22;
  const bookH = 0.024;
  const coverT = 0.004;

  // Frame loop for slight physical lift when selected
  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const targetLift = isSelected ? 0.015 : 0;
    const curLift = currentLiftRef.current;
    const diffLift = Math.abs(curLift - targetLift);

    if (diffLift > 0.001) {
      const speed = 7.0;
      const newLift = curLift + (targetLift - curLift) * Math.min(delta * speed, 1.0);
      currentLiftRef.current = newLift;
      groupRef.current.position.y = baseY + newLift;
      invalidate();
    }
  });

  // Global Escape key handler
  useEffect(() => {
    if (!isSelected) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose?.();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSelected, onClose]);

  return (
    <group
      ref={groupRef}
      name="about-notebook-object"
      position={position}
      rotation={[0, 0.04, 0]}
    >
      {/* ── 0. Interaction Hitbox ── */}
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
        <boxGeometry args={[bookW * 2 + 0.12, bookH + 0.12, bookD + 0.12]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      {/* ── 1. Closed State Physical Hardcover Sketchbook ── */}
      {!isSelected && (
        <group>
          {/* Bottom Cover */}
          <mesh
            position={[bookW / 2, coverT / 2, 0]}
            castShadow
            receiveShadow
            onClick={(e) => {
              if (!isSelected && onSelect) {
                e.stopPropagation();
                onSelect();
              }
            }}
          >
            <boxGeometry args={[bookW, coverT, bookD]} />
            <meshStandardMaterial color="#CBB996" roughness={0.8} />
          </mesh>

          {/* Spine Binding */}
          <mesh position={[0, bookH / 2, 0]}>
            <cylinderGeometry args={[bookH / 2, bookH / 2, bookD, 16, 1, false, 0, Math.PI]} />
            <meshStandardMaterial color="#AFA07C" roughness={0.7} />
          </mesh>

          {/* Front Cover Board */}
          <mesh
            position={[bookW / 2, bookH - coverT / 2, 0]}
            castShadow
            receiveShadow
            onClick={(e) => {
              if (!isSelected && onSelect) {
                e.stopPropagation();
                onSelect();
              }
            }}
          >
            <boxGeometry args={[bookW, coverT, bookD]} />
            <meshStandardMaterial color="#CBB996" roughness={0.78} />
          </mesh>

          {/* Notebook Title Label on Front Cover */}
          <mesh position={[bookW / 2, bookH + 0.001, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[bookW * 0.75, bookD * 0.45]} />
            <meshStandardMaterial color="#F6EFE2" roughness={0.9} />
          </mesh>

          {/* Closed Page Block */}
          <mesh position={[bookW / 2, bookH / 2, 0]} material={materials.parchmentPaper}>
            <boxGeometry args={[bookW - 0.01, bookH - coverT * 2, bookD - 0.01]} />
          </mesh>
        </group>
      )}

      {/* ── 2. Open State: Physical 3D Open Sketchbook Spread on Table ── */}
      {isSelected && (
        <group name="about-open-sketchbook-3d">
          {/* Left Page Board */}
          <mesh position={[-bookW / 2, 0.005, 0]} castShadow receiveShadow>
            <boxGeometry args={[bookW, coverT, bookD]} />
            <meshStandardMaterial color="#FAF5EB" roughness={0.85} />
          </mesh>
          {/* Right Page Board */}
          <mesh position={[bookW / 2, 0.005, 0]} castShadow receiveShadow>
            <boxGeometry args={[bookW, coverT, bookD]} />
            <meshStandardMaterial color="#FAF5EB" roughness={0.85} />
          </mesh>
          {/* Center Spine Crease */}
          <mesh position={[0, 0.006, 0]}>
            <boxGeometry args={[0.012, 0.006, bookD]} />
            <meshStandardMaterial color="#AFA07C" roughness={0.7} />
          </mesh>
          {/* Page Bookmark Ribbon */}
          <mesh position={[0.02, 0.008, bookD / 2 + 0.02]} rotation={[0.2, 0, 0]}>
            <boxGeometry args={[0.014, 0.002, 0.05]} />
            <meshStandardMaterial color="#C91F2B" roughness={0.6} />
          </mesh>

          {/* ── Left Page: Bio, Background & Story ── */}
          <group position={[-bookW / 2, 0.008, 0]}>
            <Html
              transform
              position={[0, 0, 0]}
              rotation={[-Math.PI / 2, 0, 0]}
              distanceFactor={0.24}
              className="pointer-events-auto select-none"
            >
              <div
                className="w-[780px] h-[610px] bg-[#FAF5EB] text-[#1C1917] p-8 flex flex-col justify-between font-sans border border-[#E0D7C8]"
                style={{ boxSizing: "border-box" }}
              >
                <div>
                  <div className="flex items-center justify-between border-b-2 border-[#1C1917] pb-2 mb-3">
                    <span className="font-mono text-xs font-black text-[#C91F2B] uppercase tracking-wider">
                      SKETCHBOOK // FOLIO 01
                    </span>
                    <span className="font-mono text-xs text-stone-500 uppercase">
                      PERSONAL DOSSIER
                    </span>
                  </div>

                  <h2
                    className="text-3xl font-black text-[#141210] tracking-tight leading-none"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    Taushik Chandana
                  </h2>
                  <p className="text-sm font-semibold text-[#5A524A] mt-1.5 font-mono">
                    Product Designer &amp; Creative Developer
                  </p>
                </div>

                <div className="space-y-3 my-2 text-xs text-[#2D2825] leading-relaxed">
                  <p>
                    I design and build product interfaces that unite high visual craft with solid architectural engineering. My work focuses on product systems, tactile 3D experiences, and expressive typography.
                  </p>
                  <p>
                    Based in Hyderabad, India. Currently studying Computer Science Engineering at CVR College of Engineering, while collaborating on products across fintech, AI developer tooling, and gaming ecosystems.
                  </p>

                  <div className="p-3 rounded-xl bg-[#F0EAE0] border border-[#DFD5C4] space-y-1 font-mono text-[11px] text-stone-700">
                    <div className="flex items-center gap-1.5 font-bold text-[#C91F2B]">
                      <GraduationCap size={13} />
                      <span>EDUCATION &amp; GUILDS</span>
                    </div>
                    <div>CVR College of Engineering — B.Tech CSE (2023 - 2027)</div>
                    <div>Core Member — UI/UX Hyderabad Design Guild</div>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-[#DFD5C4] pt-2 font-mono text-[11px] text-stone-500">
                  <span>HYDERABAD, INDIA</span>
                  <span>CLICK OUTSIDE TO CLOSE</span>
                </div>
              </div>
            </Html>
          </group>

          {/* ── Right Page: Philosophy & Tooling ── */}
          <group position={[bookW / 2, 0.008, 0]}>
            <Html
              transform
              position={[0, 0, 0]}
              rotation={[-Math.PI / 2, 0, 0]}
              distanceFactor={0.24}
              className="pointer-events-auto select-none"
            >
              <div
                className="w-[780px] h-[610px] bg-[#FAF5EB] text-[#1C1917] p-8 flex flex-col justify-between font-sans border border-[#E0D7C8]"
                style={{ boxSizing: "border-box" }}
              >
                <div>
                  <div className="flex items-center justify-between border-b-2 border-[#1C1917] pb-2 mb-3">
                    <span className="font-mono text-xs font-black text-[#C91F2B] uppercase tracking-wider">
                      TOOLKIT &amp; ETHOS
                    </span>
                    <span className="font-mono text-xs text-stone-500 uppercase">
                      FOLIO 02
                    </span>
                  </div>

                  <h3
                    className="text-2xl font-black text-[#141210] tracking-tight"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    Craft Principles
                  </h3>
                </div>

                <div className="space-y-3 my-1">
                  <div className="p-3 rounded-xl bg-[#F0EAE0] border border-[#DFD5C4]">
                    <span className="text-[10px] font-mono font-bold text-[#C91F2B] uppercase tracking-wider block mb-1">
                      01 // TACTILE RESTRAINT
                    </span>
                    <p className="text-xs text-[#2D2825]">
                      Interfaces should feel grounded and physically plausible without unnecessary ornamental clutter.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-[#F0EAE0] border border-[#DFD5C4]">
                    <span className="text-[10px] font-mono font-bold text-[#C91F2B] uppercase tracking-wider block mb-1">
                      02 // CODE-LEVEL CRAFT
                    </span>
                    <p className="text-xs text-[#2D2825]">
                      Design decisions are carried through to the implementation layer: 60fps frame rates, accessible semantics, and clean tokens.
                    </p>
                  </div>

                  {/* Primary Tools */}
                  <div>
                    <span className="text-[10px] font-mono font-bold text-stone-500 uppercase tracking-wider block mb-1.5">
                      PRIMARY WEAPONS OF CHOICE:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {["Figma", "React 19", "Next.js", "Three.js / R3F", "TypeScript", "Tailwind CSS", "Miro", "Gemini API"].map((tool, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded-md bg-white border border-[#DFD5C4] text-[11px] font-mono font-bold text-[#1C1917]"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-[#DFD5C4] pt-2">
                  <span className="font-mono text-[11px] text-stone-500">
                    ESC OR CLICK OUTSIDE TO RETURN
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onClose?.();
                    }}
                    className="px-3 py-1 rounded-lg bg-[#C91F2B] hover:bg-[#b01722] text-white font-mono text-xs font-bold transition-all cursor-pointer"
                  >
                    CLOSE SKETCHBOOK
                  </button>
                </div>
              </div>
            </Html>
          </group>
        </group>
      )}
    </group>
  );
}
