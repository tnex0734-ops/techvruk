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
import { OrganicProxies } from "./models/OrganicProxies";

/**
 * Modular Furniture & Architectural Asset Composer (Phase 3B.1)
 * 
 * Assembles all high-fidelity hard-surface models:
 * - Wardrobe (Left Storage & Archive)
 * - Workstation Suite: Desk, Apple MacBook Pro on stand, Peripherals, Task Chair
 * - Platform Bed & Upholstered Headboard (Right Rest Zone)
 * - Architectural 4-Pane Window with Daylight Box (Right Daylight Zone)
 * - Detailed Architectural Door (Right Entrance Zone)
 * - Archival Typography Wall Prints
 * - Clean Organic Proxies (Fishbowl, Plants — for Phase 3B.2)
 *
 * Every component is modular and independently interactive for Phase 3C.
 */
export function RoomFurniture() {
  const materials = useMemo(() => createRoomMaterials(), []);

  return (
    <group name="room-furniture-scene">
      {/* ── 1. Left Storage Archive ── */}
      <Wardrobe materials={materials} />

      {/* ── 2. Corner Creative Workstation ── */}
      <Desk materials={materials} />
      <Laptop materials={materials} />
      <Peripherals materials={materials} />
      <Chair materials={materials} />
      <HangingQuotes materials={materials} />

      {/* ── 3. Right Rest & Architectural Envelope ── */}
      <Bed materials={materials} />
      <Window materials={materials} />
      <Door materials={materials} />

      {/* ── 4. Organic Placeholders (Targeted for Phase 3B.2) ── */}
      <OrganicProxies materials={materials} />
    </group>
  );
}
