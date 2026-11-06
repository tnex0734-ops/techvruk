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

/**
 * Modular Furniture & Architectural Asset Composer (Phase 3B.2)
 * 
 * Assembles all high-fidelity hard-surface and organic models:
 * - Wardrobe (Left Storage & Archive)
 * - Workstation Suite: Desk, Apple MacBook Pro on stand, Peripherals, Task Chair
 * - High-Fidelity Glass Fishbowl with animated swimming goldfish
 * - Realistic Desk & Floor Botanical Plants with curved leaves and ceramic pots
 * - Platform Bed with sculpted draped linen duvet, cushioned pillows & wool throw
 * - Architectural 4-Pane Window with Daylight Box (Right Daylight Zone)
 * - Detailed Architectural Door (Right Entrance Zone)
 * - Archival Typography Wall Prints
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

      {/* ── 3. Organic Assets (Fishbowl & Botanicals) ── */}
      <Fishbowl materials={materials} />
      <Plant materials={materials} />

      {/* ── 4. Right Rest & Architectural Envelope ── */}
      <Bed materials={materials} />
      <Window materials={materials} />
      <Door materials={materials} />
    </group>
  );
}
