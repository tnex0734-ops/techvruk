"use client";

import React, { useMemo } from "react";
import { createRoomMaterials } from "./RoomMaterials";
import { Wardrobe } from "./models/Wardrobe";
import { Desk } from "./models/Desk";
import { Laptop } from "./models/Laptop";
import { Peripherals } from "./models/Peripherals";
import { Chair } from "./models/Chair";
import { Bed } from "./models/Bed";
import { BedsideTable } from "./models/BedsideTable";
import { Window } from "./models/Window";
import { Door } from "./models/Door";
import { HangingQuotes } from "./models/HangingQuotes";
import { Fishbowl } from "./models/Fishbowl";
import { Plant } from "./models/Plant";
import { ProjectsBook } from "./objects/ProjectsBook";
import { AboutNotebook } from "./objects/AboutNotebook";
import { DeskPhone } from "./objects/DeskPhone";
import { ContactHologram } from "./objects/ContactHologram";
import { ExperienceWallHanging } from "./objects/ExperienceWallHanging";
import { AchievementStickers } from "./objects/AchievementStickers";
import { BedClutter } from "./objects/BedClutter";
import { BadmintonRackets } from "./objects/BadmintonRackets";
import { RetroCassettePlayer } from "./objects/RetroCassettePlayer";
import { Html } from "@react-three/drei";
import { RoomHotspot } from "./RoomHotspot";
import { RoomInteractionTarget, ROOM_HOTSPOTS } from "./roomInteractionTypes";
import { BookProject } from "./objects/projectData";

export interface RoomFurnitureProps {
  activeTarget?: RoomInteractionTarget;
  hoveredTarget?: RoomInteractionTarget;
  onSelect?: (target: "book" | "about" | "wall" | "wardrobe" | "phone" | "laptop" | "door" | "music") => void;
  onHover?: (target: "book" | "about" | "wall" | "wardrobe" | "phone" | "laptop" | "door" | "music" | null) => void;
  bookPageIndex?: number;
  isBookDossierEmerging?: boolean;
  onBookPageChange?: (newIndex: number) => void;
  onBookSelectProject?: (project: BookProject) => void;
  onCloseCurrentTarget?: () => void;
  selectedCardIndex?: number;
  onCardChange?: (index: number) => void;
  selectedAchievementIndex?: number;
  onAchievementChange?: (index: number) => void;
  isPlayingAudio?: boolean;
  onToggleAudio?: () => void;
}

/**
 * Modular Furniture & Architectural Asset Composer (Warm Tactile Scrapbook Direction)
 * The room contains five purposeful interactive objects:
 * 1. Projects Book on Desk
 * 2. About Sketchbook on Desk
 * 3. Experience Wall Hanging on Back Wall
 * 4. Achievement Stickers & Thread on Wardrobe Door
 * 5. Desk Phone with Hologram
 * Plus the art-directed lived-in student/designer bed clutter.
 */
export function RoomFurniture({
  activeTarget = null,
  hoveredTarget = null,
  onSelect,
  onHover,
  bookPageIndex = 0,
  isBookDossierEmerging = false,
  onBookPageChange,
  onBookSelectProject,
  onCloseCurrentTarget,
  selectedCardIndex = 0,
  onCardChange,
  selectedAchievementIndex = 0,
  onAchievementChange,
  isPlayingAudio = false,
  onToggleAudio,
}: RoomFurnitureProps) {
  const materials = useMemo(() => createRoomMaterials(), []);

  return (
    <group name="room-furniture-scene">
      {/* ── 1. Left Storage Wardrobe & Achievement Stickers (Target: "wardrobe") ── */}
      <Wardrobe
        materials={materials}
        isSelected={activeTarget === "wardrobe"}
        isHovered={hoveredTarget === "wardrobe"}
        onSelect={onSelect ? () => onSelect("wardrobe") : undefined}
        onHover={onHover ? (h) => onHover(h ? "wardrobe" : null) : undefined}
      />
      <AchievementStickers
        materials={materials}
        isSelected={activeTarget === "wardrobe"}
        isHovered={hoveredTarget === "wardrobe"}
        selectedAchievementIndex={selectedAchievementIndex}
        onSelect={onSelect ? () => onSelect("wardrobe") : undefined}
        onClose={onCloseCurrentTarget}
        onAchievementChange={onAchievementChange}
        onHover={onHover ? (h) => onHover(h ? "wardrobe" : null) : undefined}
      />

      {/* ── 2. Experience Wall Hanging (Back Wall, Target: "wall") ── */}
      <ExperienceWallHanging
        materials={materials}
        isSelected={activeTarget === "wall"}
        isHovered={hoveredTarget === "wall"}
        selectedCardIndex={selectedCardIndex}
        onSelect={onSelect ? () => onSelect("wall") : undefined}
        onClose={onCloseCurrentTarget}
        onCardChange={onCardChange}
        onHover={onHover ? (h) => onHover(h ? "wall" : null) : undefined}
      />

      {/* ── Wall Storytelling: Badminton Rackets Hung on Wall ── */}
      <BadmintonRackets
        materials={materials}
        position={[0.28, 2.05, -2.675]}
      />

      {/* ── Wall Music Station: Retro Cassette Deck with Rotating Tape Spools (Target: "music") ── */}
      <RetroCassettePlayer
        materials={materials}
        isPlaying={isPlayingAudio}
        onTogglePlay={onToggleAudio}
        onSelect={onSelect ? () => onSelect("music") : undefined}
        position={[0.28, 1.42, -2.675]}
      />

      {/* ── 3. Creative Workstation: Desk, Projects Book, Phone, Chair ── */}
      <Desk materials={materials} />

      {/* Physical Projects Book (Primary Work Object, Target: "book") */}
      <ProjectsBook
        materials={materials}
        isSelected={activeTarget === "book" || activeTarget === "laptop"}
        isHovered={hoveredTarget === "book"}
        pageIndex={bookPageIndex}
        isDossierEmerging={isBookDossierEmerging}
        onSelect={onSelect ? () => onSelect("book") : undefined}
        onCloseDossier={onCloseCurrentTarget}
        onHover={onHover ? (h) => onHover(h ? "book" : null) : undefined}
        onPageChange={onBookPageChange}
        onSelectProject={onBookSelectProject}
      />

      {/* Physical Desk Phone (Primary Contact Object, Target: "phone") */}
      <DeskPhone
        materials={materials}
        isSelected={activeTarget === "phone"}
        isHovered={hoveredTarget === "phone"}
        onSelect={onSelect ? () => onSelect("phone") : undefined}
        onClose={onCloseCurrentTarget}
        onHover={onHover ? (h) => onHover(h ? "phone" : null) : undefined}
      />

      {/* ── Contact 3D Hologram Projector (Mounted on Desk behind Phone) ── */}
      <group position={[-1.25, 0.744, -1.86]}>
        <ContactHologram
          isOpen={activeTarget === "phone"}
          onClose={onCloseCurrentTarget}
        />
      </group>

      <Peripherals materials={materials} />
      {/* Studio Chair (Hidden during desk close-up to prevent near-plane camera clipping while visitor sits at desk) */}
      {activeTarget !== "book" && activeTarget !== "about" && activeTarget !== "phone" && (
        <Chair materials={materials} />
      )}
      <HangingQuotes materials={materials} />

      {/* ── 4. Organic Life & Botanicals ── */}
      <Fishbowl materials={materials} />
      <Plant materials={materials} />

      {/* ── 5. Right Rest Bed, Scandinavian Bedside Table & Sketchbook ── */}
      <Bed materials={materials} />
      <BedClutter materials={materials} />

      {/* Scandinavian White Oak Bedside Table (bridges space between desk & bed) */}
      <BedsideTable
        materials={materials}
        position={[0.85, 0, -1.95]}
      />

      {/* Physical Personal Sketchbook resting on Bedside Table (Target: "about") */}
      <AboutNotebook
        materials={materials}
        position={[0.85, 0.525, -1.95]}
        isSelected={activeTarget === "about"}
        isHovered={hoveredTarget === "about"}
        onSelect={onSelect ? () => onSelect("about") : undefined}
        onClose={onCloseCurrentTarget}
        onHover={onHover ? (h) => onHover(h ? "about" : null) : undefined}
      />

      {/* Architectural Window & Door */}
      <Window materials={materials} />
      <Door
        materials={materials}
        isSelected={activeTarget === "door"}
        isHovered={hoveredTarget === "door"}
        onSelect={onSelect ? () => onSelect("door") : undefined}
        onHover={onHover ? (h) => onHover(h ? "door" : null) : undefined}
      />

      {/* ── 6. 3D In-Scene Navigation Hotspots (Spacious, Zero-Collision) ── */}
      {onSelect && (
        <group name="room-interactive-hotspots">
          {/* Sacrificial Drei HTML anchor to absorb R3F portal initialization in React 19 */}
          <Html style={{ display: "none" }}>
            <span aria-hidden="true" />
          </Html>

          <RoomHotspot
            key="book"
            hotspot={ROOM_HOTSPOTS.book}
            activeTarget={activeTarget}
            onSelect={onSelect}
          />
          <RoomHotspot
            key="about"
            hotspot={ROOM_HOTSPOTS.about}
            activeTarget={activeTarget}
            onSelect={onSelect}
          />
          <RoomHotspot
            key="wall"
            hotspot={ROOM_HOTSPOTS.wall}
            activeTarget={activeTarget}
            onSelect={onSelect}
          />
          <RoomHotspot
            key="wardrobe"
            hotspot={ROOM_HOTSPOTS.wardrobe}
            activeTarget={activeTarget}
            onSelect={onSelect}
          />
          <RoomHotspot
            key="phone"
            hotspot={ROOM_HOTSPOTS.phone}
            activeTarget={activeTarget}
            onSelect={onSelect}
          />
          <RoomHotspot
            key="music"
            hotspot={ROOM_HOTSPOTS.music}
            activeTarget={activeTarget}
            onSelect={onSelect}
          />
        </group>
      )}
    </group>
  );
}
