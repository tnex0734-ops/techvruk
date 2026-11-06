export type RoomInteractionTarget = "laptop" | "wardrobe" | "door" | null;

export interface RoomHotspotData {
  id: "laptop" | "wardrobe" | "door";
  title: string;
  category: string;
  badge: string;
  position: [number, number, number];
  cameraPosition: [number, number, number];
  cameraTarget: [number, number, number];
  cameraFov: number;
  accessibleLabel: string;
}

export const ROOM_HOTSPOTS: Record<"laptop" | "wardrobe" | "door", RoomHotspotData> = {
  laptop: {
    id: "laptop",
    title: "Selected Work",
    category: "AI Products & UX/UI",
    badge: "WORK",
    position: [-2.05, 1.15, -1.88],
    cameraPosition: [-2.05, 1.20, -1.05],
    cameraTarget: [-2.05, 0.98, -1.88],
    cameraFov: 44,
    accessibleLabel: "Explore Selected Projects and Digital Products (Laptop)",
  },
  wardrobe: {
    id: "wardrobe",
    title: "Experience & Awards",
    category: "Journey & Achievements",
    badge: "JOURNEY",
    position: [-2.85, 2.22, 0.40],
    cameraPosition: [0.10, 1.45, 2.75],
    cameraTarget: [-2.95, 1.10, 0.40],
    cameraFov: 46,
    accessibleLabel: "View Professional Experience and Hackathon Achievements (Wardrobe)",
  },
  door: {
    id: "door",
    title: "Contact & Connect",
    category: "Inquiries & Socials",
    badge: "CONTACT",
    position: [2.75, 1.80, 1.15],
    cameraPosition: [1.35, 1.60, 0.85],
    cameraTarget: [3.50, 1.25, 0.55],
    cameraFov: 46,
    accessibleLabel: "Open Contact Information and Collaboration Details (Door)",
  },
};
