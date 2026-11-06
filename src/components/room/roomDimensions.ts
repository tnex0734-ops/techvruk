/**
 * Central Normalized Room Coordinate System & Dimensional Configuration
 * 
 * Coordinate System:
 * - Origin [0, 0, 0] is on the floor plane at the center of the room.
 * - +X points to the RIGHT (Door, Window, Bed).
 * - -X points to the LEFT (Cupboards).
 * - +Y points UP (Ceiling is at +2.8m).
 * - -Z points to the BACK WALL.
 * - +Z points to the OPEN FRONT (Cutaway viewing side).
 * 
 * Scale: 1 unit = 1 meter (believable architectural proportions)
 */

export const ROOM_DIMENSIONS = {
  // Shell Proportions
  width: 7.2,   // X axis: -3.6 to +3.6
  depth: 5.4,   // Z axis: -2.7 to +2.7
  height: 2.8,  // Y axis: 0.0 to 2.8
  wallThickness: 0.18,
  floorThickness: 0.15,

  // Left Cupboards (Wardrobe & Storage Archive)
  cupboard: {
    width: 0.70,   // along X
    length: 3.20,  // along Z
    height: 2.45,  // along Y
    position: [-3.22, 1.225, 0.70] as [number, number, number],
    doors: 3,
  },

  // Corner Workstation (Primary Focal Zone)
  desk: {
    width: 1.60,   // along X
    depth: 0.80,   // along Z
    height: 0.74,  // desk top Y
    topThickness: 0.04,
    position: [-2.05, 0.72, -1.85] as [number, number, number],
  },

  laptop: {
    baseWidth: 0.32,
    baseDepth: 0.22,
    baseHeight: 0.012,
    screenHeight: 0.21,
    standElevation: 0.09,
    position: [-2.05, 0.74, -1.88] as [number, number, number],
  },

  accessories: {
    keyboardPos: [-2.05, 0.746, -1.62] as [number, number, number],
    mousePos: [-1.68, 0.746, -1.62] as [number, number, number],
    fishbowlPos: [-1.42, 0.74, -1.98] as [number, number, number],
    plantPos: [-3.18, 0, -2.38] as [number, number, number],
    hangingQuotesPos: [-2.05, 1.50, -2.68] as [number, number, number],
  },

  // Right Side (Bed, Window, Door)
  bed: {
    width: 1.65,    // along X
    length: 2.15,   // along Z
    mattressHeight: 0.52,
    headboardHeight: 1.05,
    position: [1.85, 0, -1.45] as [number, number, number],
  },

  window: {
    width: 1.90,    // along Z on right wall
    height: 1.35,   // along Y
    sillHeight: 0.95, // Y position of bottom sill
    position: [3.60, 1.625, -0.65] as [number, number, number],
  },

  door: {
    width: 0.90,    // along Z on right wall
    height: 2.15,   // along Y
    position: [3.60, 1.075, 1.80] as [number, number, number],
  },
} as const;

export type RoomDimensions = typeof ROOM_DIMENSIONS;
