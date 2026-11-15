"use client";

import React, { useRef, useState, useEffect, useMemo } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import {
  Mail,
  Phone as PhoneIcon,
  MapPin,
  ExternalLink,
  Copy,
  Check,
  PhoneOff,
  Sparkles,
  Wifi,
  Battery,
  Code2,
  Layers,
  ArrowUpRight,
  Briefcase,
} from "lucide-react";
import { RoomMaterials } from "../RoomMaterials";
import {
  createPhoneScreenTexture,
  disposePhoneScreenTextures,
} from "./PhoneScreenTexture";

interface DeskPhoneProps {
  materials: RoomMaterials;
  isHovered?: boolean;
  isSelected?: boolean;
  onSelect?: () => void;
  onClose?: () => void;
  onHover?: (hovered: boolean) => void;
}

/**
 * Physical Desk Phone Object with Interactive In-Display OLED UI & Scrolling Profile
 * Conforms to User Feedback:
 * - Phone physically arises (+0.16m) and tilts towards the camera when selected.
 * - Inside the mobile display, renders an authentic, fully scrollable profile interface
 *   with Taushik's verified details, bio, channels, skills, and work availability.
 * - The user can scroll directly inside the mobile screen in 3D.
 * - Clicking outside the phone lowers it back to the desk and returns camera to room overview.
 */
export function DeskPhone({
  materials,
  isHovered = false,
  isSelected = false,
  onSelect,
  onClose,
  onHover,
}: DeskPhoneProps) {
  const { invalidate } = useThree();
  const phoneGroupRef = useRef<THREE.Group>(null);
  const currentLiftRef = useRef(0);
  const currentTiltRef = useRef(0);
  const [copied, setCopied] = useState(false);

  const phoneW = 0.082; // Along X
  const phoneL = 0.162; // Along Z
  const phoneH = 0.009; // Along Y

  // Dynamic OLED Screen Texture for Standby
  const screenTexture = useMemo(() => {
    return createPhoneScreenTexture(isSelected);
  }, [isSelected]);

  // Force R3F re-render on selection
  useEffect(() => {
    invalidate();
  }, [isSelected, screenTexture, invalidate]);

  useEffect(() => {
    return () => {
      disposePhoneScreenTextures();
    };
  }, []);

  // Frame loop for phone physical lift & tilt when selected
  useFrame((_, delta) => {
    if (!phoneGroupRef.current) return;
    const targetLift = isSelected ? 0.18 : 0; // Natural rise of 18cm from desk surface
    const targetTilt = isSelected ? 0.72 : 0; // Tilts screen to face camera comfortably
    const targetYaw = isSelected ? 0 : -0.18; // Squares up to face visitor when active

    const curLift = currentLiftRef.current;
    const curTilt = currentTiltRef.current;

    const diffLift = Math.abs(curLift - targetLift);
    const diffTilt = Math.abs(curTilt - targetTilt);

    if (diffLift > 0.001 || diffTilt > 0.005) {
      const speed = 7.5;
      const newLift = curLift + (targetLift - curLift) * Math.min(delta * speed, 1.0);
      const newTilt = curTilt + (targetTilt - curTilt) * Math.min(delta * speed, 1.0);

      currentLiftRef.current = newLift;
      currentTiltRef.current = newTilt;

      phoneGroupRef.current.position.y = 0.744 + newLift;
      phoneGroupRef.current.rotation.x = newTilt;
      phoneGroupRef.current.rotation.y = targetYaw;

      invalidate();
    }
  });

  // Global Escape key listener to lower phone and return to room
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

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText("taushikok@gmail.com");
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    }
  };

  return (
    <group
      ref={phoneGroupRef}
      name="desk-phone-object"
      position={[-1.25, 0.744, -1.68]}
      rotation={[0, -0.18, 0]}
    >
      {/* ── 0. Generous Invisible Interaction Hitbox ── */}
      <mesh
        position={[0, phoneH / 2, 0]}
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
        <boxGeometry args={[phoneW + 0.12, phoneH + 0.12, phoneL + 0.12]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      {/* ── 1. Phone Body Chassis (Matte Graphite Aluminum) ── */}
      <mesh
        position={[0, phoneH / 2, 0]}
        material={materials.metalDark}
        castShadow
        receiveShadow
        onClick={(e) => {
          if (!isSelected && onSelect) {
            e.stopPropagation();
            onSelect();
          }
        }}
      >
        <boxGeometry args={[phoneW, phoneH, phoneL]} />
      </mesh>

      {/* ── 2. Beveled Edge Highlight ── */}
      <mesh position={[0, phoneH - 0.0005, 0]} material={materials.metalSilver}>
        <boxGeometry args={[phoneW - 0.002, 0.001, phoneL - 0.002]} />
      </mesh>

      {/* ── 3. Front OLED Glass Screen with High-DPI Procedural Display (Ambient Lockscreen) ── */}
      <mesh position={[0, phoneH + 0.0008, 0]} rotation={[-Math.PI / 2, 0, 0]} visible={!isSelected}>
        <planeGeometry args={[phoneW - 0.006, phoneL - 0.006]} />
        <meshStandardMaterial
          map={screenTexture || undefined}
          color="#FFFFFF"
          roughness={0.12}
          metalness={0.2}
          emissive="#7AC5C7"
          emissiveIntensity={0.15}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* ── 4. Interactive OLED Phone Screen Controls (Embedded on device glass in 3D) ── */}
      <Html
        transform
        position={[0, phoneH + 0.002, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        distanceFactor={0.145}
        className="pointer-events-auto select-none"
      >
        <div
          data-testid="desk-phone-screen-display"
          className="w-[350px] h-[640px] rounded-[38px] bg-[#0A0D15]/95 backdrop-blur-xl border-2 border-white/20 shadow-2xl flex flex-col overflow-hidden text-white font-sans antialiased"
          onClick={(e) => {
            if (!isSelected && onSelect) {
              e.stopPropagation();
              onSelect();
            }
          }}
        >
          {isSelected ? (
            /* ── ACTIVE ELEVATED STATE: Scrollable Profile Inside Smartphone ── */
            <>
              {/* Fixed Top Status Bar & Dynamic Island */}
              <div className="shrink-0 flex items-center justify-between px-4 pt-3 pb-2 border-b border-white/10 font-mono text-xs text-neutral-400 bg-black/60">
                <span className="font-bold text-white text-xs">9:41</span>
                {/* Dynamic Island Pill */}
                <div className="w-28 h-5 bg-black rounded-full border border-neutral-700/60 flex items-center justify-center gap-1.5 px-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] text-[#7AC5C7] font-bold">ONLINE // IST</span>
                </div>
                {/* Quick Close Button at Top */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onClose?.();
                  }}
                  className="px-2 py-0.5 rounded bg-white/10 hover:bg-[#C91F2B] text-neutral-300 hover:text-white font-mono text-[10px] font-bold transition-all cursor-pointer flex items-center gap-1"
                  title="Close phone (ESC)"
                >
                  <span>ESC</span>
                  <span>✕</span>
                </button>
              </div>

              {/* Scrollable Smartphone Body Container */}
              <div
                data-lenis-prevent
                className="flex-1 overflow-y-auto px-4 py-3 space-y-3.5 pointer-events-auto select-text scrollbar-thin scrollbar-thumb-neutral-700/80 scrollbar-track-transparent"
                style={{ scrollbarWidth: "thin", WebkitOverflowScrolling: "touch" }}
              >
                {/* Profile Header Card */}
                <div className="flex flex-col items-center text-center pt-2 pb-2">
                  <div className="relative mb-2.5">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#C91F2B] via-[#7AC5C7] to-white p-0.5 shadow-[0_0_25px_rgba(122,197,199,0.5)]">
                      <div className="w-full h-full rounded-full bg-[#0F1422] flex items-center justify-center font-bold font-mono text-2xl text-white">
                        TC
                      </div>
                    </div>
                    <span className="absolute bottom-0 right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-[#0A0E17]" />
                  </div>

                  <h3 className="text-xl font-black text-white tracking-wide">
                    Taushik Chandana
                  </h3>
                  <p className="text-[#7AC5C7] text-xs font-mono font-bold mt-0.5">
                    Product Designer &amp; Creative Developer
                  </p>
                  <div className="flex items-center gap-1 text-xs text-neutral-400 font-mono mt-1">
                    <MapPin size={12} className="text-[#C91F2B]" />
                    <span>Hyderabad, India (UTC+5:30)</span>
                  </div>

                  <div className="inline-flex items-center gap-1.5 px-3.5 py-1 mt-2.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Available for Roles &amp; Contracts</span>
                  </div>
                </div>

                {/* Bio / Value Proposition */}
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-xs text-neutral-200 leading-relaxed font-sans">
                  <div className="text-[10px] font-mono font-bold text-[#7AC5C7] uppercase tracking-wider mb-1 flex items-center gap-1">
                    <Sparkles size={12} className="text-[#7AC5C7]" />
                    <span>PHILOSOPHY</span>
                  </div>
                  Crafting high-conviction product experiences, tactile 3D interfaces, and editorial design systems. Bridging human intuition with robust, high-performance web engineering.
                </div>

                {/* Direct Contact Channels */}
                <div className="space-y-2.5">
                  <div className="text-[11px] font-mono font-bold text-neutral-300 uppercase tracking-wider px-1">
                    DIRECT CONTACT CHANNELS:
                  </div>

                  {/* Email Direct */}
                  <div className="p-3 rounded-2xl bg-black/70 border border-white/15 hover:border-[#7AC5C7] transition-all">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[11px] font-mono font-bold text-neutral-300 flex items-center gap-1.5">
                        <Mail size={13} className="text-[#7AC5C7]" />
                        EMAIL DIRECT
                      </span>
                      <button
                        type="button"
                        data-testid="phone-copy-email-btn"
                        onClick={handleCopyEmail}
                        className="px-2.5 py-1 rounded-lg bg-[#7AC5C7]/20 hover:bg-[#7AC5C7]/30 text-[#7AC5C7] text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                      >
                        {copied ? <Check size={12} /> : <Copy size={12} />}
                        <span>{copied ? "COPIED" : "COPY"}</span>
                      </button>
                    </div>
                    <a
                      href="mailto:taushikok@gmail.com"
                      className="text-sm font-mono font-bold text-white hover:text-[#7AC5C7] transition-colors truncate block"
                    >
                      taushikok@gmail.com
                    </a>
                  </div>

                  {/* Phone / WhatsApp */}
                  <div className="p-3 rounded-2xl bg-black/70 border border-white/15 hover:border-emerald-400/60 transition-all">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[11px] font-mono font-bold text-neutral-300 flex items-center gap-1.5">
                        <PhoneIcon size={13} className="text-emerald-400" />
                        PHONE / WHATSAPP
                      </span>
                      <a
                        href="tel:+918919237170"
                        className="px-2.5 py-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 text-xs font-mono font-bold flex items-center gap-1.5 transition-all"
                      >
                        <span>CONNECT</span>
                        <ExternalLink size={12} />
                      </a>
                    </div>
                    <span className="text-sm font-mono font-bold text-white">
                      +91 89192 37170
                    </span>
                  </div>

                  {/* Social Profiles Grid */}
                  <div className="grid grid-cols-2 gap-2.5">
                    <a
                      href="https://www.linkedin.com/in/taushik-chandana-16ba14378"
                      target="_blank"
                      rel="noreferrer"
                      className="p-3 rounded-xl bg-black/70 border border-white/15 hover:border-[#7AC5C7] hover:bg-white/5 flex items-center justify-between text-xs font-mono font-bold text-neutral-100 transition-all"
                    >
                      <span className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded bg-[#7AC5C7]/20 border border-[#7AC5C7]/40 flex items-center justify-center text-xs font-bold text-[#7AC5C7]">
                          in
                        </span>
                        LinkedIn
                      </span>
                      <ExternalLink size={12} className="text-neutral-400" />
                    </a>

                    <a
                      href="https://github.com/taushikchandana"
                      target="_blank"
                      rel="noreferrer"
                      className="p-3 rounded-xl bg-black/70 border border-white/15 hover:border-[#7AC5C7] hover:bg-white/5 flex items-center justify-between text-xs font-mono font-bold text-neutral-100 transition-all"
                    >
                      <span className="flex items-center gap-2">
                        <Code2 size={15} className="text-neutral-200" />
                        GitHub
                      </span>
                      <ExternalLink size={12} className="text-neutral-400" />
                    </a>
                  </div>
                </div>

                {/* Core Stack & Skills Chips */}
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-1.5">
                  <div className="text-[10px] font-mono font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-1">
                    <Layers size={11} className="text-[#C91F2B]" />
                    <span>CORE CAPABILITIES &amp; STACK</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {[
                      "Product Design",
                      "Design Systems",
                      "React 19 / Next.js",
                      "Three.js / R3F",
                      "TypeScript",
                      "Tailwind CSS v4",
                      "Figma Mastery",
                      "Motion Design",
                    ].map((skill, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-md bg-white/10 text-[9px] font-mono font-semibold text-neutral-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Role Preferences */}
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-[11px] text-neutral-300">
                  <div className="text-[10px] font-mono font-bold text-neutral-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                    <Briefcase size={11} className="text-emerald-400" />
                    <span>PREFERENCES</span>
                  </div>
                  <span>Open to Full-Time Product Design &amp; Creative Frontend Engineering roles in high-conviction teams (Remote / Hybrid).</span>
                </div>

                {/* End Call / Put Down Phone Button */}
                <div className="pt-2">
                  <button
                    type="button"
                    data-testid="phone-close-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onClose?.();
                    }}
                    className="w-full py-2.5 rounded-xl bg-[#C91F2B] hover:bg-[#b01722] text-white font-mono text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
                  >
                    <PhoneOff size={14} />
                    <span>PUT DOWN PHONE</span>
                    <span className="text-[10px] opacity-75">(ESC)</span>
                  </button>
                  <p className="text-[9px] font-mono text-center text-neutral-500 mt-2">
                    Scroll up/down inside phone • Click outside to exit
                  </p>
                </div>
              </div>

              {/* Fixed Bottom Home Indicator Bar */}
              <div className="shrink-0 py-1.5 flex justify-center bg-black/40">
                <div className="w-28 h-1 bg-neutral-600 rounded-full" />
              </div>
            </>
          ) : (
            /* ── AMBIENT STANDBY LOCKSCREEN STATE (Resting on desk) ── */
            <div className="flex flex-col items-center justify-between h-full py-6 text-center cursor-pointer">
              <div className="font-mono text-[10px] text-neutral-400">
                SUNDAY, NOVEMBER 8
              </div>
              <div className="my-auto">
                <div className="font-bold text-4xl text-white tracking-tight">
                  09:41
                </div>
                <div className="mt-3 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-[11px] font-mono text-[#7AC5C7] inline-flex items-center gap-1.5">
                  <Sparkles size={11} className="text-[#7AC5C7]" />
                  <span>1 Direct Channel Open</span>
                </div>
              </div>
              <div className="flex flex-col items-center gap-1 text-[10px] font-mono text-neutral-400">
                <span className="animate-pulse text-[#7AC5C7] font-bold">
                  ➔ CLICK PHONE TO ARISE &amp; CONNECT
                </span>
                <div className="w-24 h-1 bg-neutral-700 rounded-full mt-2" />
              </div>
            </div>
          )}
        </div>
      </Html>

      {/* ── 5. Rear Camera Island Bump ── */}
      <mesh position={[phoneW / 2 - 0.018, phoneH + 0.001, phoneL / 2 - 0.022]}>
        <boxGeometry args={[0.022, 0.002, 0.022]} />
        <meshStandardMaterial color="#1E2024" roughness={0.3} metalness={0.7} />
      </mesh>
    </group>
  );
}
