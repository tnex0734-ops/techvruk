"use client";

import React, { useMemo } from "react";
import { createRoomMaterials } from "./RoomMaterials";
import { Wardrobe } from "./models/Wardrobe";
import { Desk } from "./models/Desk";
import { Laptop } from "./models/Laptop";
import { Peripherals } from "./models/Peripherals";
import { Chair } from "./models/Chair";
import { Bed } from "./models/Bed";
import { Window } from "./models/Window";
import { Door } from "./models/Door";
import { HangingQuotes } from "./models/HangingQuotes";
import { Fishbowl } from "./models/Fishbowl";
import { Plant } from "./models/Plant";
import { RoomHotspot } from "./RoomHotspot";
import { RoomInteractionTarget, ROOM_HOTSPOTS } from "./roomInteractionTypes";

export interface RoomFurnitureProps {
  activeTarget?: RoomInteractionTarget;
  hoveredTarget?: RoomInteractionTarget;
  onSelect?: (target: "laptop" | "wardrobe" | "door") => void;
  onHover?: (target: "laptop" | "wardrobe" | "door" | null) => void;
}

/**
 * Modular Furniture & Architectural Asset Composer (Phase 3C.1 Interactive)
 */
export function RoomFurniture({
  activeTarget = null,
  hoveredTarget = null,
  onSelect,
  onHover,
}: RoomFurnitureProps) {
  const materials = useMemo(() => createRoomMaterials(), []);

  return (
    <group name="room-furniture-scene">
      {/* ── 1. Left Storage Archive (Interactive Target: "wardrobe") ── */}
      <Wardrobe
        materials={materials}
        isSelected={activeTarget === "wardrobe"}
        isHovered={hoveredTarget === "wardrobe"}
        onSelect={onSelect ? () => onSelect("wardrobe") : undefined}
        onHover={onHover ? (h) => onHover(h ? "wardrobe" : null) : undefined}
      />

      {/* ── 2. Corner Creative Workstation (Interactive Target: "laptop") ── */}
      <Desk materials={materials} />
      <Laptop
        materials={materials}
        isSelected={activeTarget === "laptop"}
        isHovered={hoveredTarget === "laptop"}
        onSelect={onSelect ? () => onSelect("laptop") : undefined}
        onHover={onHover ? (h) => onHover(h ? "laptop" : null) : undefined}
      />
      <Peripherals materials={materials} />
      <Chair materials={materials} />
      <HangingQuotes materials={materials} />

      {/* ── 3. Organic Assets (Fishbowl & Botanicals) ── */}
      <Fishbowl materials={materials} />
      <Plant materials={materials} />

      {/* ── 4. Right Rest & Architectural Envelope (Interactive Target: "door") ── */}
      <Bed materials={materials} />
      <Window materials={materials} />
      <Door
        materials={materials}
        isSelected={activeTarget === "door"}
        isHovered={hoveredTarget === "door"}
        onSelect={onSelect ? () => onSelect("door") : undefined}
        onHover={onHover ? (h) => onHover(h ? "door" : null) : undefined}
      />

      {/* ── 5. 3D Navigation Hotspots (Phase 3C.1) ── */}
      {onSelect && (
        <group name="room-interactive-hotspots">
          <RoomHotspot
            hotspot={ROOM_HOTSPOTS.laptop}
            activeTarget={activeTarget}
            onSelect={onSelect}
          />
          <RoomHotspot
            hotspot={ROOM_HOTSPOTS.wardrobe}
            activeTarget={activeTarget}
            onSelect={onSelect}
          />
          <RoomHotspot
            hotspot={ROOM_HOTSPOTS.door}
            activeTarget={activeTarget}
            onSelect={onSelect}
          />
        </group>
      )}
    </group>
  );
}
