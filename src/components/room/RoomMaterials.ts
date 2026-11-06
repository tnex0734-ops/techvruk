import * as THREE from "three";

/**
 * Architectural Materials & Color Palette
 * 
 * Strict Aesthetic Guidelines:
 * - Neutral, realistic architectural finishes (plaster, light oak, concrete, linen).
 * - Restrained portfolio red accent (#C91F2B) used on selective details only.
 * - Soft diffuse lighting response; avoids harsh specular glare.
 */

export const ROOM_PALETTE = {
  wall: "#F5F3EF",          // Warm architectural off-white plaster
  wallAccent: "#EFECE6",    // Slightly deeper tone for architectural depth
  floor: "#E8E2D9",         // Light matte concrete / bleached oak floor
  woodLight: "#D5C5B1",     // Light Scandinavian birch/oak (cabinetry & desk)
  woodTrim: "#BAA791",      // Cabinet seams & wood trim details
  metalDark: "#222226",     // Dark graphite / anodized aluminum (desk frame, laptop, window trim)
  metalSilver: "#C5C7CC",   // Laptop hinge & stand highlights
  metalAluminum: "#D8DADE", // Apple-style matte anodized aluminum for laptop body
  fabricWhite: "#F8F8F9",   // Crisp cotton bed linen
  fabricPillow: "#ECEAE8",  // Soft linen pillows
  fabricThrow: "#D6CEBF",   // Neutral wool throw blanket
  glass: "#DCEEF7",         // Architectural window & fishbowl glass with sky tint
  daylightBackdrop: "#F0F6FA", // Soft daylight plane outside window
  water: "#D5ECF2",         // Water proxy inside bowl
  fishAccent: "#E06A3B",    // Subtle warm orange-gold swimmer proxy inside bowl
  plantLeaf: "#2D5A3A",     // Lush architectural olive-forest green
  plantPot: "#E2DCD3",      // Matte ceramic pot
  accentRed: "#C91F2B",     // Portfolio signature red accent (chair cushion / frame border)
  screenGlow: "#FFFFFF",    // Laptop screen emissive display
  deskMat: "#2B2B30",       // Charcoal desk pad for high-contrast accessory framing
  doorFrame: "#DDD6CB",     // Clean architectural door architrave
  doorPanel: "#E6DFD3",     // Warm Scandinavian oak door leaf
  windowFrame: "#E5E0D8",   // Architectural window casing
} as const;

export function createRoomMaterials() {
  return {
    wall: new THREE.MeshStandardMaterial({
      color: ROOM_PALETTE.wall,
      roughness: 0.88,
      metalness: 0.02,
    }),
    wallRight: new THREE.MeshStandardMaterial({
      color: ROOM_PALETTE.wallAccent,
      roughness: 0.85,
      metalness: 0.02,
    }),
    floor: new THREE.MeshStandardMaterial({
      color: ROOM_PALETTE.floor,
      roughness: 0.70,
      metalness: 0.05,
    }),
    woodLight: new THREE.MeshStandardMaterial({
      color: ROOM_PALETTE.woodLight,
      roughness: 0.60,
      metalness: 0.04,
    }),
    woodTrim: new THREE.MeshStandardMaterial({
      color: ROOM_PALETTE.woodTrim,
      roughness: 0.65,
      metalness: 0.04,
    }),
    metalDark: new THREE.MeshStandardMaterial({
      color: ROOM_PALETTE.metalDark,
      roughness: 0.35,
      metalness: 0.75,
    }),
    metalSilver: new THREE.MeshStandardMaterial({
      color: ROOM_PALETTE.metalSilver,
      roughness: 0.25,
      metalness: 0.85,
    }),
    metalAluminum: new THREE.MeshStandardMaterial({
      color: ROOM_PALETTE.metalAluminum,
      roughness: 0.28,
      metalness: 0.70,
    }),
    fabricWhite: new THREE.MeshStandardMaterial({
      color: ROOM_PALETTE.fabricWhite,
      roughness: 0.92,
      metalness: 0.0,
    }),
    fabricPillow: new THREE.MeshStandardMaterial({
      color: ROOM_PALETTE.fabricPillow,
      roughness: 0.90,
      metalness: 0.0,
    }),
    fabricThrow: new THREE.MeshStandardMaterial({
      color: ROOM_PALETTE.fabricThrow,
      roughness: 0.94,
      metalness: 0.0,
    }),
    glass: new THREE.MeshPhysicalMaterial({
      color: ROOM_PALETTE.glass,
      roughness: 0.08,
      transmission: 0.88,
      thickness: 0.25,
      transparent: true,
      opacity: 0.6,
      ior: 1.52,
    }),
    daylightBackdrop: new THREE.MeshBasicMaterial({
      color: ROOM_PALETTE.daylightBackdrop,
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
    screenGlow: new THREE.MeshBasicMaterial({
      color: ROOM_PALETTE.screenGlow,
    }),
    deskMat: new THREE.MeshStandardMaterial({
      color: ROOM_PALETTE.deskMat,
      roughness: 0.80,
      metalness: 0.05,
    }),
    doorFrame: new THREE.MeshStandardMaterial({
      color: ROOM_PALETTE.doorFrame,
      roughness: 0.65,
      metalness: 0.05,
    }),
    doorPanel: new THREE.MeshStandardMaterial({
      color: ROOM_PALETTE.doorPanel,
      roughness: 0.60,
      metalness: 0.04,
    }),
    windowFrame: new THREE.MeshStandardMaterial({
      color: ROOM_PALETTE.windowFrame,
      roughness: 0.55,
      metalness: 0.10,
    }),
  };
}
