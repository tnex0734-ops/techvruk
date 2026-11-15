"use client";

import React, { useState, useEffect } from "react";
import * as THREE from "three";
import { Html } from "@react-three/drei";
import {
  Calendar,
  Briefcase,
  MapPin,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  X,
  Sparkles,
  Layers,
  ArrowUpRight,
} from "lucide-react";
import { RoomMaterials } from "../RoomMaterials";
import { experience, type ExperienceItem } from "@/lib/content";

interface ExperienceWallHangingProps {
  materials: RoomMaterials;
  isHovered?: boolean;
  isSelected?: boolean;
  selectedCardIndex?: number;
  onSelect?: () => void;
  onClose?: () => void;
  onCardChange?: (newIndex: number) => void;
  onHover?: (hovered: boolean) => void;
}

// 4 Verified Experience Card Layouts on the physical pinboard (meters from board center)
const CARD_LAYOUTS = [
  // 0: RamScript (Jan - Feb 2026) - Bottom Left
  { x: -0.32, y: -0.20, rot: 0.015 },
  // 1: Acquiq (May - Jul 2026) - Top Left
  { x: -0.32, y: 0.18, rot: -0.015 },
  // 2: The Regiment (Jun - Sep 2026) - Bottom Right
  { x: 0.32, y: -0.20, rot: -0.02 },
  // 3: UI/UX Hyderabad (May 2026 - Present) - Top Right
  { x: 0.32, y: 0.18, rot: 0.018 },
];

// 4 Verified Roles and Deliverables for each position
const VERIFIED_ROLES: Array<{
  company: string;
  role: string;
  date: string;
  focus: string;
  bullets: string[];
  tags: string[];
}> = [
  {
    company: "RamScript Private Limited",
    role: "UI/UX Intern",
    date: "Jan 2026 - Feb 2026",
    focus: "Product Interface & Prototyping",
    bullets: [
      "Engineered responsive web interfaces and reusable UI component primitives in Figma and code.",
      "Mapped complete user flows, rapid interactive prototypes, and production design system tokens.",
    ],
    tags: ["Figma", "Design Systems", "Prototyping", "User Flows"],
  },
  {
    company: "Acquiq",
    role: "User Experience Designer",
    date: "May 2026 - Jul 2026",
    focus: "AI Hiring Infrastructure & Heuristics",
    bullets: [
      "Designed AI-assisted talent matching heuristics and recruiter dashboard information architecture.",
      "Streamlined complex candidate pipelines, reducing decision latency through clear visual hierarchies.",
    ],
    tags: ["UX Research", "AI Heuristics", "Information Architecture", "Figma"],
  },
  {
    company: "The Regiment",
    role: "UI/UX Design Intern",
    date: "Jun 2026 - Sep 2026",
    focus: "Design Operations & Product Architecture",
    bullets: [
      "Spearheaded design operations for high-velocity cross-platform mobile and web client releases.",
      "Maintained component token libraries ensuring strict consistency between design and engineering.",
    ],
    tags: ["Design Operations", "Mobile UI", "Token Libraries", "Cross-Platform"],
  },
  {
    company: "UI/UX Hyderabad",
    role: "Core Member",
    date: "May 2026 - Present",
    focus: "Design Guild & Community Leadership",
    bullets: [
      "Led and organized Hyderabad design community meetups, portfolio reviews, and hackathon sprints.",
      "Mentored emerging designers in spatial UX principles, modern design systems, and rapid prototyping.",
    ],
    tags: ["Community Leadership", "Mentorship", "Design Sprints", "Design Systems"],
  },
];

interface WallCardItemProps {
  layout: { x: number; y: number; rot: number };
  role: {
    company: string;
    role: string;
    date: string;
    focus: string;
    bullets: string[];
    tags: string[];
  };
  idx: number;
  isFocused: boolean;
  onCardClick: () => void;
  boardT: number;
}

function WallCardItem({
  layout,
  role,
  idx,
  isFocused,
  onCardClick,
  boardT,
}: WallCardItemProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <group
      position={[layout.x, layout.y, boardT + 0.005]}
      rotation={[0, 0, layout.rot]}
    >
      {/* Paper Card Mesh Base */}
      <mesh receiveShadow position={[0, 0, 0]}>
        <boxGeometry args={[0.54, 0.35, 0.002]} />
        <meshStandardMaterial color="#FAF8F5" roughness={0.88} />
      </mesh>

      {/* Brass Pushpin at Top Center */}
      <group position={[0, 0.165, 0.006]}>
        <mesh>
          <sphereGeometry args={[0.008, 12, 12]} />
          <meshStandardMaterial color="#EFCB75" roughness={0.3} metalness={0.85} />
        </mesh>
        <mesh position={[0, 0, -0.004]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.002, 0.002, 0.008, 8]} />
          <meshStandardMaterial color="#888888" metalness={0.9} />
        </mesh>
      </group>

      {/* Crisp Native HTML Card Content */}
      {mounted && (
        <Html
          transform
          position={[0, 0, 0.008]}
          distanceFactor={0.30}
          className="pointer-events-auto select-none"
        >
          <div
            data-testid={`wall-card-${idx}`}
            className={`w-[540px] h-[350px] p-5 rounded-2xl bg-[#FCFAF7] border-2 border-[#E5DFD3] shadow-md flex flex-col justify-between transition-all font-sans cursor-pointer ${
              isFocused
                ? "ring-4 ring-[#C91F2B] shadow-xl"
                : "hover:border-[#C91F2B] hover:shadow-lg"
            }`}
            onClick={(e) => {
              e.stopPropagation();
              onCardClick();
            }}
          >
            {/* Header */}
            <div>
              <div className="flex items-center justify-between pb-1.5 border-b border-[#EAE3D6] mb-1.5">
                <span className="font-mono text-[11px] font-black text-[#C91F2B] uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#C91F2B]" />
                  {role.company}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#C91F2B]/10 text-[#C91F2B] font-mono text-[10px] font-bold">
                  {role.date}
                </span>
              </div>

              <h3
                className="text-xl font-black text-[#141210] tracking-tight leading-tight"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                {role.role}
              </h3>
              <p className="text-[10px] font-mono text-stone-500 mt-0.5">
                {role.focus}
              </p>
            </div>

            {/* Verified Deliverables Visible Directly on Card */}
            <div className="space-y-1.5 my-1 bg-[#F6F2EA] p-3 rounded-xl border border-[#E8E1D5]">
              {role.bullets.map((b, i) => (
                <div key={i} className="flex items-start gap-1.5 text-[11px] text-[#2D2825] leading-snug">
                  <CheckCircle2 size={12} className="text-[#C91F2B] shrink-0 mt-0.5" />
                  <span className="line-clamp-2">{b}</span>
                </div>
              ))}
            </div>

            {/* Footer with Tags & Affordance */}
            <div className="flex items-center justify-between pt-1.5 border-t border-[#EAE3D6]">
              <div className="flex flex-wrap gap-1">
                {role.tags.slice(0, 3).map((t, i) => (
                  <span
                    key={i}
                    className="px-1.5 py-0.5 rounded bg-white border border-[#E0D7C8] text-[9px] font-mono font-bold text-stone-700"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <span className="text-[11px] font-mono font-bold text-[#C91F2B] flex items-center gap-1">
                <span>INSPECT</span>
                <ArrowUpRight size={12} />
              </span>
            </div>
          </div>
        </Html>
      )}
    </group>
  );
}

/**
 * Physical Wall Hanging Pinboard with Interactive Experience Cards
 * Calibrated with distanceFactor={0.30} so 540x350px HTML maps 1:1 onto 0.54x0.35m card geometry.
 */
export function ExperienceWallHanging({
  materials,
  isHovered = false,
  isSelected = false,
  selectedCardIndex = 0,
  onSelect,
  onClose,
  onCardChange,
  onHover,
}: ExperienceWallHangingProps) {
  const boardW = 1.25;
  const boardH = 0.90;
  const boardT = 0.016;

  // Local state for which card is currently expanded in detail view (null = whole board overview)
  const [focusedCardIndex, setFocusedCardIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!isSelected) {
      setFocusedCardIndex(null);
    }
  }, [isSelected]);

  // Keyboard navigation when wall is active
  useEffect(() => {
    if (!isSelected) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        if (focusedCardIndex !== null) {
          setFocusedCardIndex(null);
        } else {
          onClose?.();
        }
      } else if (focusedCardIndex !== null) {
        if (e.key === "ArrowRight") {
          const next = Math.min(experience.length - 1, focusedCardIndex + 1);
          setFocusedCardIndex(next);
          onCardChange?.(next);
        } else if (e.key === "ArrowLeft") {
          const prev = Math.max(0, focusedCardIndex - 1);
          setFocusedCardIndex(prev);
          onCardChange?.(prev);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSelected, focusedCardIndex, onClose, onCardChange]);

  const activeRoleData = focusedCardIndex !== null ? VERIFIED_ROLES[focusedCardIndex] : null;

  return (
    <group
      name="experience-wall-hanging-object"
      position={[-0.45, 1.65, -2.675]}
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
      {/* ── 0. Generous Interaction Hitbox ── */}
      <mesh position={[0, 0, 0.02]} visible={false}>
        <boxGeometry args={[boardW + 0.15, boardH + 0.25, 0.12]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      {/* ── 1. Hanging Twine & Top Wall Nail ── */}
      <mesh position={[0, boardH / 2 + 0.22, 0.005]}>
        <cylinderGeometry args={[0.005, 0.005, 0.02, 8]} />
        <meshStandardMaterial color="#8A7A68" roughness={0.4} metalness={0.7} />
      </mesh>
      <mesh position={[-boardW * 0.28, boardH / 2 + 0.11, 0.006]} rotation={[0, 0, -0.65]}>
        <boxGeometry args={[0.003, boardW * 0.42, 0.003]} />
        <meshStandardMaterial color="#A49582" roughness={0.8} />
      </mesh>
      <mesh position={[boardW * 0.28, boardH / 2 + 0.11, 0.006]} rotation={[0, 0, 0.65]}>
        <boxGeometry args={[0.003, boardW * 0.42, 0.003]} />
        <meshStandardMaterial color="#A49582" roughness={0.8} />
      </mesh>

      {/* ── 2. Top Natural Oak Suspension Rail ── */}
      <mesh
        position={[0, boardH / 2 + 0.015, boardT / 2]}
        material={materials.woodOak}
        castShadow
      >
        <boxGeometry args={[boardW + 0.06, 0.03, boardT + 0.01]} />
      </mesh>

      {/* ── 3. Linen / Cork Backing Pinboard ── */}
      <mesh
        position={[0, 0, boardT / 2]}
        material={materials.pinboard}
        castShadow
        receiveShadow
        onClick={(e) => {
          if (isSelected && focusedCardIndex !== null) {
            e.stopPropagation();
            setFocusedCardIndex(null);
          }
        }}
      >
        <boxGeometry args={[boardW, boardH, boardT]} />
      </mesh>

      {/* Bottom Oak Rail Capping */}
      <mesh
        position={[0, -boardH / 2 - 0.01, boardT / 2]}
        material={materials.woodOak}
        castShadow
      >
        <boxGeometry args={[boardW + 0.06, 0.02, boardT + 0.01]} />
      </mesh>

      {/* ── 4. Chronological Connecting Threads Linking Roles ── */}
      <group position={[0, 0, boardT + 0.004]}>
        <mesh position={[-0.32, -0.01, 0]}>
          <boxGeometry args={[0.002, 0.36, 0.002]} />
          <meshStandardMaterial color="#DE8D7F" roughness={0.6} />
        </mesh>
        <mesh position={[0, -0.01, 0]} rotation={[0, 0, -0.55]}>
          <boxGeometry args={[0.002, 0.72, 0.002]} />
          <meshStandardMaterial color="#DE8D7F" roughness={0.6} />
        </mesh>
        <mesh position={[0.32, -0.01, 0]}>
          <boxGeometry args={[0.002, 0.36, 0.002]} />
          <meshStandardMaterial color="#DE8D7F" roughness={0.6} />
        </mesh>
      </group>

      {/* ── 5. Four Pinned Experience Cards with Visible Details Inside ── */}
      <WallCardItem
        key="pinned-card-ramscript"
        layout={CARD_LAYOUTS[0]}
        role={VERIFIED_ROLES[0]}
        idx={0}
        isFocused={focusedCardIndex === 0}
        onCardClick={() => {
          setFocusedCardIndex(0);
          onCardChange?.(0);
          if (!isSelected && onSelect) onSelect();
        }}
        boardT={boardT}
      />
      <WallCardItem
        key="pinned-card-acquiq"
        layout={CARD_LAYOUTS[1]}
        role={VERIFIED_ROLES[1]}
        idx={1}
        isFocused={focusedCardIndex === 1}
        onCardClick={() => {
          setFocusedCardIndex(1);
          onCardChange?.(1);
          if (!isSelected && onSelect) onSelect();
        }}
        boardT={boardT}
      />
      <WallCardItem
        key="pinned-card-regiment"
        layout={CARD_LAYOUTS[2]}
        role={VERIFIED_ROLES[2]}
        idx={2}
        isFocused={focusedCardIndex === 2}
        onCardClick={() => {
          setFocusedCardIndex(2);
          onCardChange?.(2);
          if (!isSelected && onSelect) onSelect();
        }}
        boardT={boardT}
      />
      <WallCardItem
        key="pinned-card-hyderabad"
        layout={CARD_LAYOUTS[3]}
        role={VERIFIED_ROLES[3]}
        idx={3}
        isFocused={focusedCardIndex === 3}
        onCardClick={() => {
          setFocusedCardIndex(3);
          onCardChange?.(3);
          if (!isSelected && onSelect) onSelect();
        }}
        boardT={boardT}
      />

      {/* ── 6. Header Pinboard Tag: "PROFESSIONAL ARCHIVE" ── */}
      <group position={[0, boardH / 2 - 0.055, boardT + 0.005]}>
        <Html
          transform
          position={[0, 0, 0.001]}
          distanceFactor={0.35}
          className="pointer-events-none select-none"
        >
          <div className="px-5 py-1.5 rounded-full bg-[#1C1917] text-white font-mono text-xs font-black tracking-widest uppercase border border-white/20 shadow-sm flex items-center gap-2">
            <Briefcase size={12} className="text-[#C91F2B]" />
            <span>PROFESSIONAL TIMELINE // PINNED VERIFIED CARDS</span>
          </div>
        </Html>
      </group>

      {/* ── 7. EXPANDED FOCUSED CARD DETAIL VIEW (When user clicks a card) ── */}
      {isSelected && focusedCardIndex !== null && activeRoleData && (
        <group position={[0, 0, boardT + 0.12]}>
          <Html
            transform
            distanceFactor={0.42}
            position={[0, 0, 0]}
            className="pointer-events-auto select-none"
          >
            {/* Backdrop veil: Clicking outside the focused card returns to whole pinboard */}
            <div
              className="relative w-[680px] max-h-[520px] rounded-3xl bg-[#FCFAF7] border-2 border-[#E2DBD1] shadow-[0_24px_80px_rgba(20,18,15,0.45)] text-[#1C1917] p-6 flex flex-col font-sans"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Brass Pushpin on Expanded Card */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex flex-col items-center z-20 pointer-events-none">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#FFE89E] via-[#EFCB75] to-[#B38F36] shadow-md border-2 border-white flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-[#8A6D1C]" />
                </div>
              </div>

              {/* Top Header */}
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#E8E1D5]">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#C91F2B] animate-pulse" />
                  <span className="text-[#C91F2B] font-mono text-xs font-black uppercase tracking-wider">
                    ROLE 0{focusedCardIndex + 1} OF 0{VERIFIED_ROLES.length}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-700 font-mono text-[10px] font-bold">
                    VERIFIED EXPERIENCE
                  </span>
                </div>

                {/* Back to Pinboard CTA */}
                <button
                  type="button"
                  onClick={() => setFocusedCardIndex(null)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F3EFEA] hover:bg-[#C91F2B] hover:text-white text-[#5A524A] text-xs font-mono font-bold transition-all cursor-pointer border border-[#E2DBD1]"
                >
                  <X size={14} />
                  <span>BACK TO PINBOARD (ESC)</span>
                </button>
              </div>

              {/* Role Title & Organization */}
              <div className="mb-3">
                <span className="text-xs font-mono font-bold text-[#C91F2B] uppercase tracking-wider">
                  {activeRoleData.company}
                </span>
                <h2
                  className="text-2xl sm:text-3xl font-black text-[#141210] mt-0.5 leading-tight"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  {activeRoleData.role}
                </h2>
                <div className="flex items-center gap-3 mt-1.5 text-xs font-mono text-stone-600 font-semibold">
                  <div className="flex items-center gap-1">
                    <Calendar size={13} className="text-[#C91F2B]" />
                    <span>{activeRoleData.date}</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <MapPin size={13} className="text-stone-500" />
                    <span>Hyderabad / Remote</span>
                  </div>
                </div>
              </div>

              {/* Domain Focus Box */}
              <div className="p-3 rounded-xl bg-white border border-[#E2DBD1] shadow-2xs mb-3">
                <div className="text-[10px] font-mono font-bold text-[#C91F2B] uppercase tracking-wider mb-1 flex items-center gap-1">
                  <Sparkles size={11} className="text-[#C91F2B]" />
                  <span>DOMAIN FOCUS</span>
                </div>
                <p className="text-sm font-bold text-[#141210]">
                  {activeRoleData.focus}
                </p>
                <p className="text-xs text-stone-600 mt-0.5">
                  Design systems, interactive prototyping, and cross-platform UX.
                </p>
              </div>

              {/* Key Deliverables & Outcomes */}
              <div className="space-y-1.5 mb-3">
                <div className="text-[10px] font-mono font-bold text-stone-500 uppercase tracking-wider">
                  KEY DELIVERABLES &amp; IMPACT:
                </div>
                <div className="space-y-1.5 bg-[#F6F2EA] p-3 rounded-xl border border-[#E8E1D5]">
                  {activeRoleData.bullets.map((b, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-[#2D2825] leading-relaxed">
                      <CheckCircle2 size={13} className="text-[#C91F2B] shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies & Tools */}
              <div className="mb-3">
                <div className="text-[10px] font-mono font-bold text-stone-500 uppercase tracking-wider mb-1 flex items-center gap-1">
                  <Layers size={11} className="text-[#C91F2B]" />
                  <span>SKILLS &amp; TOOLS UTILIZED:</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {activeRoleData.tags.map((t, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-lg bg-white border border-[#E2DBD1] text-xs font-mono font-bold text-[#1C1917]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Navigation Strip */}
              <div className="flex items-center justify-between pt-2 border-t border-[#E8E1D5] mt-auto">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      const prev = Math.max(0, focusedCardIndex - 1);
                      setFocusedCardIndex(prev);
                      onCardChange?.(prev);
                    }}
                    disabled={focusedCardIndex === 0}
                    className="px-3 py-1.5 rounded-lg bg-[#F3EFEA] hover:bg-stone-200 disabled:opacity-30 disabled:pointer-events-none text-xs font-mono font-bold text-[#1C1917] flex items-center gap-1 transition-all cursor-pointer"
                  >
                    <ChevronLeft size={13} />
                    <span>PREV ROLE</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const next = Math.min(VERIFIED_ROLES.length - 1, focusedCardIndex + 1);
                      setFocusedCardIndex(next);
                      onCardChange?.(next);
                    }}
                    disabled={focusedCardIndex === VERIFIED_ROLES.length - 1}
                    className="px-3 py-1.5 rounded-lg bg-[#F3EFEA] hover:bg-stone-200 disabled:opacity-30 disabled:pointer-events-none text-xs font-mono font-bold text-[#1C1917] flex items-center gap-1 transition-all cursor-pointer"
                  >
                    <span>NEXT ROLE</span>
                    <ChevronRight size={13} />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setFocusedCardIndex(null)}
                  className="px-4 py-2 rounded-xl bg-[#1C1917] hover:bg-[#C91F2B] text-white text-xs font-mono font-bold transition-all cursor-pointer shadow-xs"
                >
                  VIEW ALL PINNED CARDS
                </button>
              </div>
            </div>
          </Html>
        </group>
      )}
    </group>
  );
}
