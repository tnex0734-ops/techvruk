import * as THREE from "three";

/**
 * Procedural PBR Texture Generator
 * 
 * Generates custom, resolution-independent procedural textures directly in-memory:
 * - High-resolution Retina Laptop IDE / Design prototype display.
 * - Archival museum typography prints for wall quotations.
 * - Subtle organic wood grain and fabric micro-weave maps.
 * 
 * 100% self-contained, zero external asset dependencies or HTTP latency.
 */

// Global Texture Cache
const textureCache = new Map<string, THREE.CanvasTexture>();

/**
 * High-Resolution Retina Laptop Screen UI
 * Displays an authentic IDE and Portfolio Design preview representing Taushik Chandana
 */
export function getLaptopScreenTexture(): THREE.CanvasTexture | null {
  if (typeof document === "undefined") return null;

  const key = "laptop-screen-ui";
  if (textureCache.has(key)) return textureCache.get(key)!;

  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 640;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  // 1. Dark Theme Background
  ctx.fillStyle = "#121214";
  ctx.fillRect(0, 0, 1024, 640);

  // 2. Window Title Bar
  ctx.fillStyle = "#1E1E22";
  ctx.fillRect(0, 0, 1024, 42);

  // macOS Window Control Dots
  const dotY = 21;
  ctx.fillStyle = "#EF4444";
  ctx.beginPath(); ctx.arc(28, dotY, 6, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#F59E0B";
  ctx.beginPath(); ctx.arc(48, dotY, 6, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#10B981";
  ctx.beginPath(); ctx.arc(68, dotY, 6, 0, Math.PI * 2); ctx.fill();

  // Window Title
  ctx.fillStyle = "#8E9099";
  ctx.font = "bold 13px 'SF Mono', 'Fira Code', monospace";
  ctx.textAlign = "center";
  ctx.fillText("taushik-workspace — src/app/page.tsx", 512, 26);

  // 3. Left Sidebar (File Explorer)
  ctx.fillStyle = "#18181C";
  ctx.fillRect(0, 42, 220, 598);

  ctx.fillStyle = "#5A5D66";
  ctx.font = "bold 11px sans-serif";
  ctx.textAlign = "left";
  ctx.fillText("EXPLORER", 20, 72);

  const files = [
    { name: "▾ portfolio-v2", color: "#C91F2B", indent: 20 },
    { name: "▾ src/components", color: "#8E9099", indent: 32 },
    { name: "• RoomHero.tsx", color: "#60A5FA", indent: 44 },
    { name: "• AboutRibbon.tsx", color: "#60A5FA", indent: 44 },
    { name: "• Workstation.tsx", color: "#34D399", indent: 44 },
    { name: "• SelectedWork.tsx", color: "#8E9099", indent: 44 },
    { name: "• globals.css", color: "#F472B6", indent: 44 },
  ];

  let fileY = 100;
  ctx.font = "12px 'SF Mono', monospace";
  files.forEach((f) => {
    ctx.fillStyle = f.color;
    ctx.fillText(f.name, f.indent, fileY);
    fileY += 26;
  });

  // 4. Code Editor Pane
  ctx.fillStyle = "#121214";
  ctx.fillRect(220, 42, 440, 598);

  const codeLines = [
    { text: "import { ProductBuilder } from '@/core';", color: "#C084FC" },
    { text: "", color: "" },
    { text: "/**", color: "#6B7280" },
    { text: " * @author Taushik Chandana", color: "#6B7280" },
    { text: " * @location Hyderabad, India", color: "#6B7280" },
    { text: " */", color: "#6B7280" },
    { text: "export const taushik = new ProductBuilder({", color: "#60A5FA" },
    { text: "  craft: 'Design Systems & AI Products',", color: "#34D399" },
    { text: "  philosophy: 'Make Ideas Real',", color: "#FBBF24" },
    { text: "  status: 'Available for Select Roles'", color: "#34D399" },
    { text: "});", color: "#60A5FA" },
    { text: "", color: "" },
    { text: "export default function Hero() {", color: "#C084FC" },
    { text: "  return <Workspace3D interactive />;", color: "#F43F5E" },
    { text: "}", color: "#C084FC" },
  ];

  let codeY = 82;
  ctx.font = "12px 'SF Mono', monospace";
  codeLines.forEach((l, idx) => {
    ctx.fillStyle = "#4B5563";
    ctx.textAlign = "right";
    ctx.fillText(String(idx + 1), 246, codeY);

    if (l.text) {
      ctx.fillStyle = l.color;
      ctx.textAlign = "left";
      ctx.fillText(l.text, 260, codeY);
    }
    codeY += 22;
  });

  // 5. Right Preview Pane (Interactive Prototype Window)
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(660, 42, 364, 598);

  // Header Bar in Preview
  ctx.fillStyle = "#F5F5F7";
  ctx.fillRect(660, 42, 364, 38);

  ctx.fillStyle = "#C91F2B";
  ctx.beginPath(); ctx.arc(686, 61, 7, 0, Math.PI * 2); ctx.fill();

  ctx.fillStyle = "#171515";
  ctx.font = "bold 12px sans-serif";
  ctx.textAlign = "left";
  ctx.fillText("Taushik.", 702, 65);

  ctx.fillStyle = "#8E8A85";
  ctx.font = "bold 10px monospace";
  ctx.fillText("WORK // ABOUT", 920, 65);

  // Big Red Brand Banner in Preview
  ctx.fillStyle = "#C91F2B";
  ctx.fillRect(682, 105, 320, 140);
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "900 24px sans-serif";
  ctx.fillText("PORTFOLIO", 702, 160);
  ctx.font = "bold 11px monospace";
  ctx.fillText("PRODUCT DESIGNER & BUILDER", 702, 185);

  // Prototype UI Cards
  ctx.fillStyle = "#F4F4F6";
  ctx.fillRect(682, 265, 150, 110);
  ctx.fillRect(852, 265, 150, 110);
  ctx.fillRect(682, 395, 320, 90);

  ctx.fillStyle = "#C91F2B";
  ctx.fillRect(696, 280, 40, 6);
  ctx.fillRect(866, 280, 40, 6);
  ctx.fillRect(696, 410, 60, 6);

  ctx.fillStyle = "#171515";
  ctx.font = "bold 11px sans-serif";
  ctx.fillText("AI Studio App", 696, 310);
  ctx.fillText("Design Tokens", 866, 310);
  ctx.fillText("Interactive 3D Workspace", 696, 440);

  // Texture settings
  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = false;
  textureCache.set(key, texture);

  return texture;
}

/**
 * Archival Typography Print 1: "MAKE IDEAS REAL."
 */
export function getQuotePrintTexture1(): THREE.CanvasTexture | null {
  if (typeof document === "undefined") return null;

  const key = "quote-print-1";
  if (textureCache.has(key)) return textureCache.get(key)!;

  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 680;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  // Archival Matte Paper
  ctx.fillStyle = "#FAF8F5";
  ctx.fillRect(0, 0, 512, 680);

  // Subtle Outer Hairline Border
  ctx.strokeStyle = "#E5DFD7";
  ctx.lineWidth = 1;
  ctx.strokeRect(32, 32, 448, 616);

  // Metadata Badge
  ctx.fillStyle = "#9C968F";
  ctx.font = "bold 11px 'SF Mono', monospace";
  ctx.textAlign = "left";
  ctx.fillText("MANIFESTO // 01", 54, 76);

  ctx.textAlign = "right";
  ctx.fillText("17.3850° N, 78.4867° E", 458, 76);

  // Main Typographic Headline
  ctx.fillStyle = "#171515";
  ctx.font = "900 46px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.textAlign = "left";
  ctx.fillText("MAKE", 54, 210);
  ctx.fillText("IDEAS", 54, 265);
  ctx.fillText("REAL.", 54, 320);

  // Signature Red Accent Rule
  ctx.fillStyle = "#C91F2B";
  ctx.fillRect(54, 348, 80, 5);

  // Manifesto Supporting Text
  ctx.fillStyle = "#5A5652";
  ctx.font = "bold 13px -apple-system, sans-serif";
  ctx.fillText("TAUSHIK CHANDANA", 54, 395);

  ctx.fillStyle = "#7A756F";
  ctx.font = "12px 'SF Mono', monospace";
  ctx.fillText("PRODUCT DESIGNER & BUILDER", 54, 418);
  ctx.fillText("HYDERABAD, INDIA", 54, 438);

  ctx.fillStyle = "#8E8882";
  ctx.font = "italic 12px serif";
  ctx.fillText("From intuition to execution.", 54, 520);
  ctx.fillText("Craft without compromise.", 54, 540);

  // Bottom Registration Mark
  ctx.fillStyle = "#C91F2B";
  ctx.fillRect(54, 610, 14, 14);
  ctx.fillStyle = "#171515";
  ctx.font = "bold 10px monospace";
  ctx.fillText("CRAFT & CODE", 80, 622);

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = false;
  textureCache.set(key, texture);

  return texture;
}

/**
 * Archival Typography Print 2: "DESIGN WITH INTENT."
 */
export function getQuotePrintTexture2(): THREE.CanvasTexture | null {
  if (typeof document === "undefined") return null;

  const key = "quote-print-2";
  if (textureCache.has(key)) return textureCache.get(key)!;

  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 620;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  // Archival Matte Paper
  ctx.fillStyle = "#FAF8F5";
  ctx.fillRect(0, 0, 512, 620);

  // Subtle Border
  ctx.strokeStyle = "#E5DFD7";
  ctx.lineWidth = 1;
  ctx.strokeRect(32, 32, 448, 556);

  // Top Metadata
  ctx.fillStyle = "#9C968F";
  ctx.font = "bold 11px 'SF Mono', monospace";
  ctx.textAlign = "left";
  ctx.fillText("PHILOSOPHY // 02", 54, 76);

  // Main Headline
  ctx.fillStyle = "#171515";
  ctx.font = "900 42px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.textAlign = "left";
  ctx.fillText("DESIGN", 54, 195);
  ctx.fillText("WITH", 54, 245);
  ctx.fillText("INTENT.", 54, 295);

  // Red Accent Stripe
  ctx.fillStyle = "#C91F2B";
  ctx.fillRect(54, 320, 60, 4);

  // Supporting Body
  ctx.fillStyle = "#5A5652";
  ctx.font = "bold 13px -apple-system, sans-serif";
  ctx.fillText("SYSTEMS & ARCHITECTURE", 54, 365);

  ctx.fillStyle = "#7A756F";
  ctx.font = "12px 'SF Mono', monospace";
  ctx.fillText("CLARITY OVER NOISE.", 54, 390);
  ctx.fillText("SPEED WITH PURPOSE.", 54, 410);

  // Signature Circle Mark
  ctx.strokeStyle = "#C91F2B";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(62, 530, 12, 0, Math.PI * 2);
  ctx.stroke();

  ctx.fillStyle = "#171515";
  ctx.font = "bold 10px monospace";
  ctx.fillText("PORTFOLIO 2026", 88, 534);

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = false;
  textureCache.set(key, texture);

  return texture;
}

/**
 * Procedural Natural Wood Grain Bump / Roughness Texture
 */
export function getWoodGrainTexture(): THREE.CanvasTexture | null {
  if (typeof document === "undefined") return null;

  const key = "wood-grain";
  if (textureCache.has(key)) return textureCache.get(key)!;

  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  // Base Warm Birch
  ctx.fillStyle = "#D5C5B1";
  ctx.fillRect(0, 0, 512, 512);

  // Grain Lines
  ctx.fillStyle = "rgba(180, 160, 140, 0.18)";
  for (let i = 0; i < 512; i += 3) {
    const wave = Math.sin(i * 0.05) * 8;
    ctx.fillRect(0, i + wave, 512, 1.5);
  }

  // Soft Organic Knots / Noise
  for (let j = 0; j < 30; j++) {
    const x = Math.random() * 512;
    const y = Math.random() * 512;
    const r = 4 + Math.random() * 12;
    ctx.fillStyle = "rgba(160, 140, 120, 0.12)";
    ctx.beginPath();
    ctx.ellipse(x, y, r * 2.5, r, Math.PI / 4, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 2);
  textureCache.set(key, texture);

  return texture;
}

/**
 * Procedural Fine Linen Fabric Micro-Texture
 */
export function getFabricTexture(): THREE.CanvasTexture | null {
  if (typeof document === "undefined") return null;

  const key = "fabric-weave";
  if (textureCache.has(key)) return textureCache.get(key)!;

  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  ctx.fillStyle = "#FAF8F5";
  ctx.fillRect(0, 0, 256, 256);

  // Cross-hatch weave
  ctx.strokeStyle = "rgba(0, 0, 0, 0.04)";
  ctx.lineWidth = 1;
  for (let x = 0; x < 256; x += 4) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, 256); ctx.stroke();
  }
  for (let y = 0; y < 256; y += 4) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(256, y); ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(8, 8);
  textureCache.set(key, texture);

  return texture;
}

