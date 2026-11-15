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
  getWalnutWoodTexture,
  getOakWoodTexture,
  getWoodPlankFloorTexture,
  getCheckerFabricTexture,
  getParchmentPaperTexture,
  getNotebookDottedTexture,
  getBookCoverTexture,
  getPinboardFabricTexture,
} from "./RoomTextures";

/**
 * Architectural PBR Materials & Custom Finishes (Warm Tactile Scrapbook Direction)
 * 
 * Strict Quality Guidelines:
 * - Warm, tactile student/designer bedroom aesthetic from PORTFOLIO_ROOM_REDIRECTION_KIT/VISUAL_DIRECTION.md.
 * - Palette: Warm plaster, natural oak, warm walnut, cornflower blue, butter yellow, muted coral, sage, deep ink.
 * - Procedural PBR textures: Plank floor, walnut wardrobe, oak desk, checker throw, parchment paper, dotted notebook, book cover, pinboard.
 * - Restrained cool luminous aqua for desk phone hologram.
 * - Fully disposed / memoized per scene instance.
 */

export const ROOM_PALETTE = {
  wall: "#F3EEDB",          // Warm architectural plaster base
  wallAccent: "#EBE5D0",    // Architectural wall depth tone
  floor: "#C2A88F",         // Warm natural wood plank floor
  woodLight: "#B78352",     // Natural golden oak
  woodTrim: "#94653B",      // Oak seams & wood trim details
  woodDark: "#583A27",      // Walnut kickplate & shadow accents
  woodWalnut: "#76513B",    // Rich warm walnut wardrobe
  woodOak: "#B78352",       // Natural oak desk & bed frame
  parchment: "#F7F1E5",     // Warm paper, pages, assignments, notes
  chalk: "#FFFDF7",         // Clean paper highlight, card edges
  deepInk: "#273246",       // Primary ink, headers, dark cloth cover
  softGraphite: "#5F5B57",  // Secondary ink, descriptions, doodles
  cornflower: "#8CB7E5",    // Cornflower blue accent, checker motif
  paleBlue: "#DCEAF4",      // Secondary paper & fabric panels
  butterYellow: "#EFCB75",  // Bookmarks, sun doodles, pins, CTA accents
  mutedCoral: "#DE8D7F",    // Thread tags, sticker accents
  sage: "#A3B29A",          // Plant accents, muted badges
  metalDark: "#273246",     // Deep ink graphite metal
  metalSilver: "#C5C7CC",   // Hardware highlights
  metalAluminum: "#D8DADE", // Apple-style aluminum
  metalGold: "#EFCB75",     // Warm brass / gold trophy finish
  fabricWhite: "#FAF7F0",   // Crisp cotton bed linen
  fabricDuvet: "#EDE5D8",   // Warm natural linen duvet fabric
  fabricPillow: "#FAF7F0",  // Soft lofted linen pillows
  fabricThrow: "#8CB7E5",   // Cornflower blue throw blanket
  fabricBeige: "#D8CEBE",   // Natural woven linen
  glass: "#DCEEF7",         // Architectural window glass
  fishbowlGlass: "#FFFFFF", // Crystal clear refractive fishbowl glass
  daylightBackdrop: "#F2F7FA", // Soft daylight plane outside window
  water: "#EBF7FA",         // Crystal water volume
  waterSurface: "#E0F5F8",  // Reflective liquid meniscus
  fishOrange: "#FF5214",    // Goldfish orange
  fishDorsal: "#E63E00",    // Dorsal ridge
  fishBelly: "#FFF6ED",     // Pearlescent cream belly
  fishFin: "#FFA680",       // Translucent fin
  plantLeaf: "#244F32",     // Botanical forest green
  plantLeafMature: "#1D4227",
  plantLeafMedium: "#2B5E38",
  plantLeafYoung: "#3D7A4D",
  plantStem: "#44704B",
  soil: "#261D18",          // Rich dark potting mix
  plantPot: "#ECE8E1",      // Ceramic pot
  riverStone: "#726B63",
  accentRed: "#DE8D7F",     // Muted coral accent
  deskMat: "#273246",       // Deep ink desk pad
  doorFrame: "#DDD6CB",
  doorPanel: "#E6DFD3",
  windowFrame: "#E5E0D8",
  keycap: "#202024",
  hologramAqua: "#B9DCDD",  // Restrained pale aqua hologram
} as const;

let cachedRoomMaterials: any = null;

export function createRoomMaterials() {
  if (cachedRoomMaterials) return cachedRoomMaterials;

  const woodTexture = getWoodGrainTexture();
  const walnutTexture = getWalnutWoodTexture();
  const oakTexture = getOakWoodTexture();
  const floorPlankTexture = getWoodPlankFloorTexture();
  const checkerTexture = getCheckerFabricTexture();
  const parchmentTexture = getParchmentPaperTexture();
  const notebookTexture = getNotebookDottedTexture();
  const bookCoverTexture = getBookCoverTexture();
  const pinboardTexture = getPinboardFabricTexture();
  const fabricTexture = getFabricTexture();
  const woolTexture = getWoolTexture();
  const leafTexture = getLeafTexture();
  const plasterTexture = getPlasterTexture();
  const daylightTexture = getDaylightBackdropTexture();
  const screenTexture = getLaptopScreenTexture();
  const quote1Texture = getQuotePrintTexture1();
  const quote2Texture = getQuotePrintTexture2();

  const materials = {
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
      map: floorPlankTexture,
      bumpMap: plasterTexture,
      bumpScale: 0.002,
      roughness: 0.72,
      metalness: 0.02,
    }),
    woodWalnut: new THREE.MeshStandardMaterial({
      color: ROOM_PALETTE.woodWalnut,
      map: walnutTexture,
      roughness: 0.48,
      metalness: 0.03,
    }),
    woodOak: new THREE.MeshStandardMaterial({
      color: ROOM_PALETTE.woodOak,
      map: oakTexture,
      roughness: 0.52,
      metalness: 0.02,
    }),
    checkerFabric: new THREE.MeshStandardMaterial({
      color: "#FFFFFF",
      map: checkerTexture,
      roughness: 0.92,
      metalness: 0.0,
    }),
    parchmentPaper: new THREE.MeshStandardMaterial({
      color: ROOM_PALETTE.parchment,
      map: parchmentTexture,
      roughness: 0.88,
      metalness: 0.01,
      roughnessMap: plasterTexture,
    }),
    notebookDotted: new THREE.MeshStandardMaterial({
      color: "#FFFFFF",
      map: notebookTexture,
      roughness: 0.85,
      metalness: 0.01,
    }),
    bookCover: new THREE.MeshStandardMaterial({
      color: "#FFFFFF",
      map: bookCoverTexture,
      roughness: 0.65,
      metalness: 0.04,
    }),
    pinboard: new THREE.MeshStandardMaterial({
      color: "#FFFFFF",
      map: pinboardTexture,
      roughness: 0.94,
      metalness: 0.01,
    }),
    hologram: new THREE.MeshPhysicalMaterial({
      color: ROOM_PALETTE.hologramAqua,
      emissive: "#6CAFB2",
      emissiveIntensity: 0.28,
      roughness: 0.08,
      transmission: 0.85,
      thickness: 0.04,
      transparent: true,
      opacity: 0.72,
      ior: 1.48,
      depthWrite: false,
    }),
    thread: new THREE.MeshStandardMaterial({
      color: ROOM_PALETTE.mutedCoral,
      roughness: 0.60,
      metalness: 0.05,
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

  cachedRoomMaterials = materials;
  return materials;
}

export type RoomMaterials = ReturnType<typeof createRoomMaterials>;
