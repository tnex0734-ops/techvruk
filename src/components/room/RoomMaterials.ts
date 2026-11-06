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
  fabricWhite: "#F8F8F9",   // Crisp cotton bed linen
  fabricPillow: "#ECEAE8",  // Soft linen pillows
  fabricThrow: "#D6CEBF",   // Neutral wool throw blanket
  glass: "#E9F1F5",         // Architectural window & fishbowl glass
  water: "#D5ECF2",         // Water proxy inside bowl
  plantLeaf: "#3D6045",     // Muted olive green for plant proxy
  plantPot: "#E2DCD3",      // Matte ceramic pot
  accentRed: "#C91F2B",     // Portfolio signature red accent (chair cushion / frame border)
  screenGlow: "#FFFFFF",    // Laptop screen emissive display
  doorPanel: "#EDE8E1",     // Clean interior door finish
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
      roughness: 0.1,
      transmission: 0.85,
      thickness: 0.2,
      transparent: true,
      opacity: 0.5,
      ior: 1.5,
    }),
    water: new THREE.MeshStandardMaterial({
      color: ROOM_PALETTE.water,
      roughness: 0.15,
      transparent: true,
      opacity: 0.65,
    }),
    plantLeaf: new THREE.MeshStandardMaterial({
      color: ROOM_PALETTE.plantLeaf,
      roughness: 0.75,
      metalness: 0.02,
    }),
    plantPot: new THREE.MeshStandardMaterial({
      color: ROOM_PALETTE.plantPot,
      roughness: 0.80,
      metalness: 0.05,
    }),
    accentRed: new THREE.MeshStandardMaterial({
      color: ROOM_PALETTE.accentRed,
      roughness: 0.45,
      metalness: 0.1,
    }),
    screenGlow: new THREE.MeshStandardMaterial({
      color: "#FFFFFF",
      emissive: new THREE.Color("#FFF2EB"),
      emissiveIntensity: 0.45,
      roughness: 0.2,
    }),
    doorPanel: new THREE.MeshStandardMaterial({
      color: ROOM_PALETTE.doorPanel,
      roughness: 0.65,
      metalness: 0.02,
    }),
  };
}
