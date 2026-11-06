import * as THREE from "three";
import {
  getLaptopScreenTexture,
  getQuotePrintTexture1,
  getQuotePrintTexture2,
  getWoodGrainTexture,
  getFabricTexture,
  getWoolTexture,
  getLeafTexture,
  getPlasterTexture,
  getDaylightBackdropTexture,
} from "./RoomTextures";

/**
 * Architectural PBR Materials & Custom Finishes
 * 
 * Strict Quality Guidelines:
 * - Natural, realistic architectural materials (Scandinavian birch, linen, wool, anodized aluminum, matte steel).
 * - Procedural textures: Retina IDE laptop screen, archival quote prints, organic wood grain, linen & wool weaves, botanical leaves.
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
  metalGold: "#D4AF37",     // Polished gold trophy finish
  fabricWhite: "#F8F8F9",   // Crisp cotton bed linen
  fabricDuvet: "#EDE7DE",   // Warm natural natural linen duvet fabric
  fabricPillow: "#FAF8F5",  // Soft lofted linen pillows
  fabricThrow: "#C7BDAE",   // Neutral wool throw blanket
  fabricBeige: "#D8CEBE",   // Natural woven linen for storage boxes
  glass: "#DCEEF7",         // Architectural window glass
  fishbowlGlass: "#FFFFFF", // Crystal clear refractive fishbowl glass
  daylightBackdrop: "#F2F7FA", // Soft daylight plane outside window
  water: "#EBF7FA",         // Crystal water volume inside fishbowl
  waterSurface: "#E0F5F8",  // Reflective liquid meniscus
  fishOrange: "#FF5214",    // Vibrant warm goldfish orange
  fishDorsal: "#E63E00",    // Rich orange-red dorsal ridge
  fishBelly: "#FFF6ED",     // Pearlescent cream belly
  fishFin: "#FFA680",       // Translucent salmon fin
  plantLeaf: "#244F32",     // Deep botanical forest green
  plantLeafMature: "#1D4227", // Deep lush mature botanical green
  plantLeafMedium: "#2B5E38", // Vibrant botanical green
  plantLeafYoung: "#3D7A4D",  // Fresh lime-olive young leaf green
  plantStem: "#44704B",     // Organic stem green
  soil: "#261D18",          // Rich dark potting mix
  plantPot: "#ECE8E1",      // Warm matte ceramic pot
  riverStone: "#726B63",    // Smooth aquarium pebbles
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
  const woolTexture = getWoolTexture();
  const leafTexture = getLeafTexture();
  const plasterTexture = getPlasterTexture();
  const daylightTexture = getDaylightBackdropTexture();
  const screenTexture = getLaptopScreenTexture();
  const quote1Texture = getQuotePrintTexture1();
  const quote2Texture = getQuotePrintTexture2();

  return {
    wall: new THREE.MeshStandardMaterial({
      color: ROOM_PALETTE.wall,
      bumpMap: plasterTexture,
      bumpScale: 0.002,
      roughness: 0.92,
      metalness: 0.01,
    }),
    wallRight: new THREE.MeshStandardMaterial({
      color: ROOM_PALETTE.wallAccent,
      bumpMap: plasterTexture,
      bumpScale: 0.002,
      roughness: 0.90,
      metalness: 0.01,
    }),
    floor: new THREE.MeshStandardMaterial({
      color: ROOM_PALETTE.floor,
      bumpMap: plasterTexture,
      bumpScale: 0.003,
      roughness: 0.76,
      metalness: 0.03,
    }),
    woodLight: new THREE.MeshStandardMaterial({
      color: ROOM_PALETTE.woodLight,
      map: woodTexture,
      roughness: 0.52,
      metalness: 0.02,
    }),
    woodTrim: new THREE.MeshStandardMaterial({
      color: ROOM_PALETTE.woodTrim,
      roughness: 0.60,
      metalness: 0.03,
    }),
    woodDark: new THREE.MeshStandardMaterial({
      color: ROOM_PALETTE.woodDark,
      roughness: 0.65,
      metalness: 0.03,
    }),
    metalDark: new THREE.MeshStandardMaterial({
      color: ROOM_PALETTE.metalDark,
      roughness: 0.38,
      metalness: 0.82,
    }),
    metalSilver: new THREE.MeshStandardMaterial({
      color: ROOM_PALETTE.metalSilver,
      roughness: 0.20,
      metalness: 0.88,
    }),
    metalAluminum: new THREE.MeshStandardMaterial({
      color: ROOM_PALETTE.metalAluminum,
      roughness: 0.30,
      metalness: 0.75,
    }),
    metalGold: new THREE.MeshStandardMaterial({
      color: ROOM_PALETTE.metalGold,
      roughness: 0.22,
      metalness: 0.88,
    }),
    fabricWhite: new THREE.MeshStandardMaterial({
      color: ROOM_PALETTE.fabricWhite,
      map: fabricTexture,
      roughness: 0.94,
      metalness: 0.0,
    }),
    fabricDuvet: new THREE.MeshStandardMaterial({
      color: ROOM_PALETTE.fabricDuvet,
      map: fabricTexture,
      roughness: 0.90,
      metalness: 0.0,
    }),
    fabricPillow: new THREE.MeshStandardMaterial({
      color: ROOM_PALETTE.fabricPillow,
      map: fabricTexture,
      roughness: 0.88,
      metalness: 0.0,
    }),
    fabricThrow: new THREE.MeshStandardMaterial({
      color: ROOM_PALETTE.fabricThrow,
      map: woolTexture,
      roughness: 0.95,
      metalness: 0.0,
    }),
    fabricBeige: new THREE.MeshStandardMaterial({
      color: ROOM_PALETTE.fabricBeige,
      map: fabricTexture,
      roughness: 0.92,
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
    fishbowlGlass: new THREE.MeshPhysicalMaterial({
      color: "#FFFFFF",
      roughness: 0.02,
      transmission: 0.98,
      thickness: 0.025,
      transparent: true,
      opacity: 0.22,
      ior: 1.49,
      reflectivity: 0.88,
      depthWrite: false, // Ensures internal fish, water and pebbles render cleanly
    }),
    water: new THREE.MeshPhysicalMaterial({
      color: ROOM_PALETTE.water,
      roughness: 0.03,
      transmission: 0.93,
      transparent: true,
      opacity: 0.38,
      ior: 1.333, // True physical water IOR
      depthWrite: false,
    }),
    waterSurface: new THREE.MeshPhysicalMaterial({
      color: ROOM_PALETTE.waterSurface,
      roughness: 0.04,
      transmission: 0.94,
      transparent: true,
      opacity: 0.45,
      ior: 1.333,
      depthWrite: false,
    }),
    riverStone: new THREE.MeshStandardMaterial({
      color: ROOM_PALETTE.riverStone,
      roughness: 0.82,
      metalness: 0.02,
    }),
    fishBody: new THREE.MeshStandardMaterial({
      color: ROOM_PALETTE.fishOrange,
      roughness: 0.22,
      metalness: 0.12,
    }),
    fishDorsal: new THREE.MeshStandardMaterial({
      color: ROOM_PALETTE.fishDorsal,
      roughness: 0.25,
      metalness: 0.10,
    }),
    fishBelly: new THREE.MeshStandardMaterial({
      color: ROOM_PALETTE.fishBelly,
      roughness: 0.32,
      metalness: 0.06,
    }),
    fishFin: new THREE.MeshStandardMaterial({
      color: ROOM_PALETTE.fishFin,
      roughness: 0.24,
      transparent: true,
      opacity: 0.70,
      side: THREE.DoubleSide,
      depthWrite: false,
    }),
    fishEye: new THREE.MeshStandardMaterial({
      color: "#111114",
      roughness: 0.10,
      metalness: 0.40,
    }),
    plantLeaf: new THREE.MeshStandardMaterial({
      color: ROOM_PALETTE.plantLeaf,
      map: leafTexture,
      roughness: 0.42,
      metalness: 0.01,
      side: THREE.DoubleSide,
    }),
    plantLeafMature: new THREE.MeshStandardMaterial({
      color: ROOM_PALETTE.plantLeafMature,
      map: leafTexture,
      roughness: 0.46,
      metalness: 0.01,
      side: THREE.DoubleSide,
    }),
    plantLeafMedium: new THREE.MeshStandardMaterial({
      color: ROOM_PALETTE.plantLeafMedium,
      map: leafTexture,
      roughness: 0.38,
      metalness: 0.01,
      side: THREE.DoubleSide,
    }),
    plantLeafYoung: new THREE.MeshStandardMaterial({
      color: ROOM_PALETTE.plantLeafYoung,
      map: leafTexture,
      roughness: 0.34,
      metalness: 0.01,
      side: THREE.DoubleSide,
    }),
    plantStem: new THREE.MeshStandardMaterial({
      color: ROOM_PALETTE.plantStem,
      roughness: 0.48,
      metalness: 0.02,
    }),
    soil: new THREE.MeshStandardMaterial({
      color: ROOM_PALETTE.soil,
      roughness: 0.96,
      metalness: 0.0,
    }),
    plantPot: new THREE.MeshStandardMaterial({
      color: ROOM_PALETTE.plantPot,
      roughness: 0.78,
      metalness: 0.02,
    }),
    daylightBackdrop: new THREE.MeshBasicMaterial({
      color: ROOM_PALETTE.daylightBackdrop,
      map: daylightTexture,
      toneMapped: false,
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
    fishAccent: new THREE.MeshStandardMaterial({
      color: ROOM_PALETTE.fishOrange,
      roughness: 0.35,
    }),
    accentRed: new THREE.MeshStandardMaterial({
      color: ROOM_PALETTE.accentRed,
      roughness: 0.55,
      metalness: 0.08,
    }),
  };
}

export type RoomMaterials = ReturnType<typeof createRoomMaterials>;
