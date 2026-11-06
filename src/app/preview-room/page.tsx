"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { CameraPreset, CAMERA_CONFIGS } from "@/components/room/RoomCamera";
import { Move, Box, ShieldAlert } from "lucide-react";

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

export default function PreviewRoomPage() {
  // Production security gate: Prevent inadvertent public exposure in production
  // Can be enabled in staging/preview environments by setting NEXT_PUBLIC_ENABLE_DEV_PREVIEW="true"
  if (
    process.env.NODE_ENV === "production" &&
    process.env.NEXT_PUBLIC_ENABLE_DEV_PREVIEW !== "true"
  ) {
    notFound();
  }

  const [selectedPreset, setSelectedPreset] = useState<CameraPreset>("desktop");
  const [enableOrbit, setEnableOrbit] = useState(false);

  return (
    <div className="w-screen h-screen flex flex-col bg-[#FDFDFC] text-[#171515] overflow-hidden select-none font-sans">
      {/* ── Top Dev Control Bar ── */}
      <header className="h-14 border-b border-[#E9E2E3] px-6 flex items-center justify-between bg-white z-20">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-[#C91F2B] animate-pulse" />
          <h1 className="font-mono text-xs font-black tracking-wider uppercase">
            3D ROOM ARCHITECTURAL BLOCKOUT // DEV INSPECTION
          </h1>
        </div>

        {/* Camera Preset Switcher */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono font-bold text-neutral-400 mr-1">
            CAMERA PRESET:
          </span>
          {(["desktop", "laptop", "tablet", "mobile"] as CameraPreset[]).map((preset) => (
            <button
              key={preset}
              onClick={() => {
                setSelectedPreset(preset);
                setEnableOrbit(false);
              }}
              className={`px-3 py-1 rounded-md text-[11px] font-mono font-bold uppercase transition-all ${
                selectedPreset === preset && !enableOrbit
                  ? "bg-[#C91F2B] text-white shadow-xs"
                  : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
              }`}
            >
              {preset}
            </button>
          ))}

          <div className="h-4 w-px bg-neutral-200 mx-2" />

          {/* Free Orbit Toggle */}
          <button
            onClick={() => setEnableOrbit((prev) => !prev)}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-[11px] font-mono font-bold uppercase transition-all ${
              enableOrbit
                ? "bg-[#171515] text-white shadow-xs"
                : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
            }`}
          >
            <Move size={12} />
            <span>FREE ORBIT {enableOrbit ? "[ON]" : "[OFF]"}</span>
          </button>
        </div>
      </header>

      {/* ── Main Canvas Viewport ── */}
      <div className="flex-1 relative bg-[#F7F5F2]">
        <DynamicRoomCanvas
          cameraPreset={selectedPreset}
          enableOrbit={enableOrbit}
        />

        {/* HUD Info Panel */}
        <div className="absolute bottom-6 left-6 z-10 bg-white/95 backdrop-blur-xs p-4 rounded-xl border border-[#E9E2E3] shadow-md max-w-sm pointer-events-none font-mono text-[11px] space-y-1.5">
          <div className="text-[#C91F2B] font-bold flex items-center gap-1.5">
            <Box size={13} />
            <span>SPATIAL ARRANGEMENT AUDIT</span>
          </div>
          <div className="text-neutral-600">
            • <b>LEFT:</b> Wardrobe Cupboards (Storage / Archive)
          </div>
          <div className="text-neutral-600">
            • <b>CORNER:</b> Desk, Laptop, Keyboard, Fishbowl, Plant
          </div>
          <div className="text-neutral-600">
            • <b>RIGHT:</b> Platform Bed, Daylight Window, Exit Door
          </div>
          <div className="text-neutral-400 pt-1 border-t border-neutral-100 text-[10px]">
            Active Preset: {selectedPreset.toUpperCase()} | FOV: {CAMERA_CONFIGS[selectedPreset].fov}°
          </div>
        </div>
      </div>
    </div>
  );
}
