import * as THREE from "three";
import {
  getLaptopScreenTexture,
  getQuotePrintTexture1,
  getQuotePrintTexture2,
  getWoodGrainTexture,
  getFabricTexture,
} from "./RoomTextures";

/**
 * Architectural PBR Materials & Custom Finishes
 * 
 * Strict Quality Guidelines:
 * - Natural, realistic architectural materials (Scandinavian birch, linen, anodized aluminum, matte steel).
 * - Procedural textures: Retina IDE laptop screen, archival quote prints, organic wood grain.
 * - Selective signature red accent (#C91F2B) on chair upholstery and subtle graphic elements.
 * - Fully disposed / memoized per scene instance.
 */

export const ROOM_PALETTE = {
  wall: "#F5F3EF",          // Warm architectural off-white plaster
  wallAccent: "#EFECE6",    // Slightly deeper tone for architectural depth
  floor: "#E8E2D9",         // Light matte concrete / bleached oak floor
  woodLight: "#D5C5B1",     // Light Scandinavian birch/oak (cabinetry & desk)
  woodTrim: "#BAA791",      // Cabinet seams & wood trim details
  woodDark: "#948270",      // Plinth kickplate and shadow accents
  metalDark: "#222226",     // Dark graphite / anodized aluminum (desk frame, window trim)
  metalSilver: "#C5C7CC",   // Laptop hinge & stand highlights
  metalAluminum: "#D8DADE", // Apple-style matte anodized aluminum for laptop body
  fabricWhite: "#F8F8F9",   // Crisp cotton bed linen
  fabricDuvet: "#EDE8E1",   // Warm natural duvet fabric
  fabricPillow: "#FAF8F5",  // Soft lofted linen pillows
  fabricThrow: "#D4CBC0",   // Neutral wool throw blanket
  glass: "#DCEEF7",         // Architectural window & fishbowl glass with sky tint
  daylightBackdrop: "#F2F7FA", // Soft daylight plane outside window
  water: "#D5ECF2",         // Water proxy inside bowl
  fishAccent: "#E06A3B",    // Subtle warm orange-gold swimmer proxy inside bowl
  plantLeaf: "#2D5A3A",     // Lush architectural olive-forest green
  plantPot: "#E2DCD3",      // Matte ceramic pot
  accentRed: "#C91F2B",     // Portfolio signature red accent (chair cushion / frame border)
  deskMat: "#26262B",       // Charcoal desk pad for high-contrast accessory framing
  doorFrame: "#DDD6CB",     // Clean architectural door architrave
  doorPanel: "#E6DFD3",     // Warm Scandinavian oak door leaf
  windowFrame: "#E5E0D8",   // Architectural window casing
  keycap: "#202024",        // Low-profile keyboard keycaps
} as const;

export function createRoomMaterials() {
  const woodTexture = getWoodGrainTexture();
  const fabricTexture = getFabricTexture();
  const screenTexture = getLaptopScreenTexture();
  const quote1Texture = getQuotePrintTexture1();
  const quote2Texture = getQuotePrintTexture2();

  return {
    wall: new THREE.MeshStandardMaterial({
      color: ROOM_PALETTE.wall,
      roughness: 0.90,
      metalness: 0.02,
    }),
    wallRight: new THREE.MeshStandardMaterial({
      color: ROOM_PALETTE.wallAccent,
      roughness: 0.88,
      metalness: 0.02,
    }),
    floor: new THREE.MeshStandardMaterial({
      color: ROOM_PALETTE.floor,
      roughness: 0.72,
      metalness: 0.04,
    }),
    woodLight: new THREE.MeshStandardMaterial({
      color: ROOM_PALETTE.woodLight,
      map: woodTexture,
      roughness: 0.55,
      metalness: 0.03,
    }),
    woodTrim: new THREE.MeshStandardMaterial({
      color: ROOM_PALETTE.woodTrim,
      roughness: 0.62,
      metalness: 0.04,
    }),
    woodDark: new THREE.MeshStandardMaterial({
      color: ROOM_PALETTE.woodDark,
      roughness: 0.68,
      metalness: 0.04,
    }),
    metalDark: new THREE.MeshStandardMaterial({
      color: ROOM_PALETTE.metalDark,
      roughness: 0.35,
      metalness: 0.80,
    }),
    metalSilver: new THREE.MeshStandardMaterial({
      color: ROOM_PALETTE.metalSilver,
      roughness: 0.20,
      metalness: 0.88,
    }),
    metalAluminum: new THREE.MeshStandardMaterial({
      color: ROOM_PALETTE.metalAluminum,
      roughness: 0.28,
      metalness: 0.75,
    }),
    fabricWhite: new THREE.MeshStandardMaterial({
      color: ROOM_PALETTE.fabricWhite,
      map: fabricTexture,
      roughness: 0.92,
      metalness: 0.0,
    }),
    fabricDuvet: new THREE.MeshStandardMaterial({
      color: ROOM_PALETTE.fabricDuvet,
      map: fabricTexture,
      roughness: 0.88,
      metalness: 0.0,
    }),
    fabricPillow: new THREE.MeshStandardMaterial({
      color: ROOM_PALETTE.fabricPillow,
      map: fabricTexture,
      roughness: 0.85,
      metalness: 0.0,
    }),
    fabricThrow: new THREE.MeshStandardMaterial({
      color: ROOM_PALETTE.fabricThrow,
      map: fabricTexture,
      roughness: 0.94,
      metalness: 0.0,
    }),
    glass: new THREE.MeshPhysicalMaterial({
      color: ROOM_PALETTE.glass,
      roughness: 0.06,
      transmission: 0.90,
      thickness: 0.25,
      transparent: true,
      opacity: 0.55,
      ior: 1.52,
    }),
    daylightBackdrop: new THREE.MeshBasicMaterial({
      color: ROOM_PALETTE.daylightBackdrop,
    }),
    screenDisplay: new THREE.MeshBasicMaterial({
      map: screenTexture,
      toneMapped: false,
    }),
    quotePrint1: new THREE.MeshBasicMaterial({
      map: quote1Texture,
      toneMapped: false,
    }),
    quotePrint2: new THREE.MeshBasicMaterial({
      map: quote2Texture,
      toneMapped: false,
    }),
    deskMat: new THREE.MeshStandardMaterial({
      color: ROOM_PALETTE.deskMat,
      roughness: 0.78,
      metalness: 0.05,
    }),
    chairFabric: new THREE.MeshStandardMaterial({
      color: ROOM_PALETTE.accentRed,
      map: fabricTexture,
      roughness: 0.65,
      metalness: 0.06,
    }),
    chairMesh: new THREE.MeshStandardMaterial({
      color: "#1E1E22",
      roughness: 0.85,
      metalness: 0.15,
    }),
    doorFrame: new THREE.MeshStandardMaterial({
      color: ROOM_PALETTE.doorFrame,
      roughness: 0.65,
      metalness: 0.05,
    }),
    doorPanel: new THREE.MeshStandardMaterial({
      color: ROOM_PALETTE.doorPanel,
      map: woodTexture,
      roughness: 0.55,
      metalness: 0.04,
    }),
    windowFrame: new THREE.MeshStandardMaterial({
      color: ROOM_PALETTE.windowFrame,
      roughness: 0.50,
      metalness: 0.15,
    }),
    keycap: new THREE.MeshStandardMaterial({
      color: ROOM_PALETTE.keycap,
      roughness: 0.40,
      metalness: 0.20,
    }),
    water: new THREE.MeshStandardMaterial({
      color: ROOM_PALETTE.water,
      roughness: 0.15,
      transparent: true,
      opacity: 0.65,
    }),
    fishAccent: new THREE.MeshStandardMaterial({
      color: ROOM_PALETTE.fishAccent,
      roughness: 0.4,
    }),
    plantLeaf: new THREE.MeshStandardMaterial({
      color: ROOM_PALETTE.plantLeaf,
      roughness: 0.65,
      metalness: 0.02,
    }),
    plantPot: new THREE.MeshStandardMaterial({
      color: ROOM_PALETTE.plantPot,
      roughness: 0.85,
      metalness: 0.02,
    }),
    accentRed: new THREE.MeshStandardMaterial({
      color: ROOM_PALETTE.accentRed,
      roughness: 0.55,
      metalness: 0.08,
    }),
  };
}

export type RoomMaterials = ReturnType<typeof createRoomMaterials>;
