"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { CameraPreset, CAMERA_CONFIGS } from "@/components/room/RoomCamera";
import { RoomInteractionTarget } from "@/components/room/roomInteractionTypes";
import { Move, Box, Sparkles } from "lucide-react";

const DynamicRoomCanvas = dynamic(
  () => import("@/components/room/RoomCanvas").then((mod) => mod.RoomCanvas),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center bg-[#F9F8F6] text-xs font-mono text-neutral-400">
        LOADING 3D ROOM PREVIEW...
      </div>
    ),
  }
);

export default function PreviewRoomClient() {
  const [selectedPreset, setSelectedPreset] = useState<CameraPreset>("desktop");
  const [activeTarget, setActiveTarget] = useState<RoomInteractionTarget>(null);
  const [enableOrbit, setEnableOrbit] = useState(false);

  return (
    <div className="w-screen h-screen flex flex-col bg-[#FDFDFC] text-[#171515] overflow-hidden select-none font-sans">
      {/* ── Top Dev Control Bar ── */}
      <header className="h-14 border-b border-[#E9E2E3] px-6 flex items-center justify-between bg-white z-20 overflow-x-auto">
        <div className="flex items-center gap-3 shrink-0">
          <span className="w-2.5 h-2.5 rounded-full bg-[#C91F2B] animate-pulse" />
          <h1 className="font-mono text-xs font-black tracking-wider uppercase">
            3D ROOM DEV SUITE // PHASE 3C.2 INSPECTION
          </h1>
        </div>

        {/* Camera Preset Switcher */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[10px] font-mono font-bold text-neutral-400 mr-1">
            PRESET:
          </span>
          {(
            [
              "desktop",
              "laptop",
              "tablet",
              "mobile",
              "workstation",
              "wardrobe",
              "bed",
              "fishbowl",
              "plant",
              "doorWindow",
            ] as CameraPreset[]
          ).map((preset) => (
            <button
              key={preset}
              onClick={() => {
                setSelectedPreset(preset);
                setEnableOrbit(false);
              }}
              className={`px-2.5 py-1 rounded-md text-[10px] font-mono font-bold uppercase transition-all ${
                selectedPreset === preset && !enableOrbit
                  ? "bg-[#C91F2B] text-white shadow-xs"
                  : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
              }`}
            >
              {preset}
            </button>
          ))}

          <div className="h-4 w-px bg-neutral-200 mx-2" />

          {/* Interactive Physical Targets (Phase 3C.2) */}
          <div className="flex items-center gap-1.5 bg-neutral-50 px-2 py-0.5 rounded-md border border-neutral-200">
            <Sparkles size={11} className="text-[#C91F2B]" />
            <span className="text-[10px] font-mono font-bold text-neutral-500">PHYSICAL:</span>
            <button
              onClick={() => {
                const next = activeTarget === "wardrobe" ? null : "wardrobe";
                setActiveTarget(next);
                if (next) setSelectedPreset("wardrobe");
              }}
              className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase transition-all ${
                activeTarget === "wardrobe"
                  ? "bg-[#C91F2B] text-white"
                  : "bg-white text-neutral-700 hover:bg-neutral-200"
              }`}
            >
              WARDROBE {activeTarget === "wardrobe" ? "[OPEN]" : "[CLOSED]"}
            </button>
            <button
              onClick={() => {
                const next = activeTarget === "door" ? null : "door";
                setActiveTarget(next);
                if (next) setSelectedPreset("doorWindow");
              }}
              className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase transition-all ${
                activeTarget === "door"
                  ? "bg-[#C91F2B] text-white"
                  : "bg-white text-neutral-700 hover:bg-neutral-200"
              }`}
            >
              DOOR {activeTarget === "door" ? "[OPEN 75°]" : "[AJAR 18°]"}
            </button>
            <button
              onClick={() => {
                const next = activeTarget === "laptop" ? null : "laptop";
                setActiveTarget(next);
                if (next) setSelectedPreset("workstation");
              }}
              className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase transition-all ${
                activeTarget === "laptop"
                  ? "bg-[#C91F2B] text-white"
                  : "bg-white text-neutral-700 hover:bg-neutral-200"
              }`}
            >
              LAPTOP {activeTarget === "laptop" ? "[FOCUS]" : "[REST]"}
            </button>
          </div>

          <div className="h-4 w-px bg-neutral-200 mx-2" />

          {/* Free Orbit Toggle */}
          <button
            onClick={() => setEnableOrbit((prev) => !prev)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-mono font-bold uppercase transition-all ${
              enableOrbit
                ? "bg-[#171515] text-white shadow-xs"
                : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
            }`}
          >
            <Move size={11} />
            <span>ORBIT {enableOrbit ? "[ON]" : "[OFF]"}</span>
          </button>
        </div>
      </header>

      {/* ── Main Canvas Viewport ── */}
      <div className="flex-1 relative bg-[#F7F5F2]">
        <DynamicRoomCanvas
          cameraPreset={selectedPreset}
          activeTarget={activeTarget}
          onSelect={(target) => setActiveTarget(target)}
          enableOrbit={enableOrbit}
        />

        {/* HUD Info Panel */}
        <div className="absolute bottom-6 left-6 z-10 bg-white/95 backdrop-blur-xs p-4 rounded-xl border border-[#E9E2E3] shadow-md max-w-sm pointer-events-none font-mono text-[11px] space-y-1.5">
          <div className="text-[#C91F2B] font-bold flex items-center gap-1.5">
            <Box size={13} />
            <span>SPATIAL ARRANGEMENT AUDIT</span>
          </div>
          <div className="text-neutral-600">
            • <b>LEFT:</b> Wardrobe Cupboards ({activeTarget === "wardrobe" ? "OPEN: Archive Shelves Visible" : "Closed"})
          </div>
          <div className="text-neutral-600">
            • <b>CORNER:</b> Workstation ({activeTarget === "laptop" ? "Focused & Lid Tilted" : "Normal"})
          </div>
          <div className="text-neutral-600">
            • <b>RIGHT:</b> Door ({activeTarget === "door" ? "Swung Open to 75°" : "Resting Ajar 18°"})
          </div>
          <div className="text-neutral-400 pt-1 border-t border-neutral-100 text-[10px]">
            Active Preset: {selectedPreset.toUpperCase()} | Target: {activeTarget ? activeTarget.toUpperCase() : "NONE"}
          </div>
        </div>
      </div>
    </div>
  );
}
