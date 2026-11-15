export type RoomInteractionTarget =
  | "book"
  | "about"
  | "wall"
  | "wardrobe"
  | "phone"
  | "laptop"
  | "door"
  | "music"
  | null;

export type RoomInteractionState =
  | "room"
  | "approaching"
  | "presenting"
  | "interacting"
  | "returning";

export interface RoomHotspotData {
  id: "book" | "about" | "wall" | "wardrobe" | "phone" | "laptop" | "door" | "music";
  title: string;
  category: string;
  badge: string;
  position: [number, number, number];
  cameraPosition: [number, number, number];
  cameraTarget: [number, number, number];
  cameraFov: number;
  mobileDistanceMultiplier: number;
  accessibleLabel: string;
}

export const ROOM_HOTSPOTS: Record<"book" | "about" | "wall" | "wardrobe" | "phone" | "laptop" | "door" | "music", RoomHotspotData> = {
  book: {
    id: "book",
    title: "Selected Projects",
    category: "Physical Portfolio Book",
    badge: "PROJECTS",
    position: [-2.32, 0.744, -1.75],
    // Calibrated intimate top-down reading view framing the single project folio page
    cameraPosition: [-2.32, 1.34, -1.48],
    cameraTarget: [-2.32, 0.744, -1.75],
    cameraFov: 29,
    mobileDistanceMultiplier: 1.05,
    accessibleLabel: "Explore Selected Projects in the Hardcover Portfolio Book",
  },
  about: {
    id: "about",
    title: "About Taushik",
    category: "Personal Sketchbook",
    badge: "ABOUT",
    // Positioned on the Scandinavian bedside reading table beside the bed
    position: [0.85, 0.54, -1.95],
    cameraPosition: [0.85, 1.15, -1.45],
    cameraTarget: [0.85, 0.54, -1.95],
    cameraFov: 34,
    mobileDistanceMultiplier: 1.28,
    accessibleLabel: "Explore Taushik's Background, Philosophy, and Toolkit in the Sketchbook",
  },
  wall: {
    id: "wall",
    title: "Professional Experience",
    category: "Wall-Hanging Pinboard",
    badge: "EXPERIENCE",
    position: [-0.45, 1.65, -2.675],
    // Framed closer so the 4 pinned cards are prominent, readable, and fill ~70% view
    cameraPosition: [-0.45, 1.65, -1.35],
    cameraTarget: [-0.45, 1.65, -2.675],
    cameraFov: 42,
    mobileDistanceMultiplier: 1.30,
    accessibleLabel: "Explore Professional Experience on the Wall Hanging Pinboard",
  },
  wardrobe: {
    id: "wardrobe",
    title: "Hackathon Honors & Awards",
    category: "Cupboard Achievement Stickers",
    badge: "HONORS",
    position: [-2.865, 1.40, 0.50],
    // Balanced composition with wardrobe oak door as backdrop and centered stickers/certificate
    cameraPosition: [-1.45, 1.40, 0.50],
    cameraTarget: [-2.86, 1.40, 0.50],
    cameraFov: 40,
    mobileDistanceMultiplier: 1.30,
    accessibleLabel: "View Hackathon Honors and Achievement Stickers on the Cupboard",
  },
  phone: {
    id: "phone",
    title: "Contact & Connect",
    category: "Desk Phone & Hologram",
    badge: "CONTACT",
    position: [-1.25, 0.744, -1.68],
    // Balanced composition: frames the elevated smartphone + floating 3D hologram avatar head above it
    cameraPosition: [-1.25, 1.20, -1.20],
    cameraTarget: [-1.25, 0.90, -1.70],
    cameraFov: 34,
    mobileDistanceMultiplier: 1.15,
    accessibleLabel: "Open Contact Hologram and Collaboration Details via the Desk Phone",
  },
  music: {
    id: "music",
    title: "Retro Cassette Deck",
    category: "Wall Audio Station",
    badge: "SONG",
    position: [0.28, 1.42, -2.675],
    // Direct frontal closeup framing wall-mounted retro cassette deck and rotating spools
    cameraPosition: [0.28, 1.42, -1.95],
    cameraTarget: [0.28, 1.42, -2.675],
    cameraFov: 32,
    mobileDistanceMultiplier: 1.22,
    accessibleLabel: "Listen to a song on the wall-mounted retro cassette player",
  },
  laptop: {
    id: "laptop",
    title: "Selected Work",
    category: "AI Products & UX/UI",
    badge: "WORK",
    position: [-2.05, 0.744, -1.75],
    cameraPosition: [-2.05, 1.42, -1.25],
    cameraTarget: [-2.05, 0.76, -1.75],
    cameraFov: 38,
    mobileDistanceMultiplier: 1.32,
    accessibleLabel: "Explore Projects on the Workstation",
  },
  door: {
    id: "door",
    title: "Direct Collaboration",
    category: "Entrance & Connection",
    badge: "CONNECT",
    position: [3.35, 1.15, 0.50],
    cameraPosition: [-1.25, 1.15, -1.20],
    cameraTarget: [-1.25, 0.74, -1.68],
    cameraFov: 38,
    mobileDistanceMultiplier: 1.28,
    accessibleLabel: "Connect directly with Taushik Chandana",
  },
};
