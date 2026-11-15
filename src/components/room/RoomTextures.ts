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
 * Procedural Natural Scandinavian Birch Wood Grain Texture
 * Features deterministic organic growth rings, cathedral arches, and fine fiber pores.
 */
export function getWoodGrainTexture(): THREE.CanvasTexture | null {
  if (typeof document === "undefined") return null;

  const key = "wood-grain-birch";
  if (textureCache.has(key)) return textureCache.get(key)!;

  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  // Base Light Scandinavian Birch Tone
  ctx.fillStyle = "#D6C7B3";
  ctx.fillRect(0, 0, 512, 512);

  // Soft Organic Longitudinal Grain Waves & Cathedrals
  for (let y = 0; y < 512; y += 2) {
    const v = y / 512;
    // Cathedral arch modulation
    const cathedral = Math.sin(v * Math.PI * 4.2) * Math.cos(v * Math.PI * 1.8) * 16;
    const wave = Math.sin(v * 28 + cathedral * 0.1) * 6;
    const alpha = 0.04 + 0.08 * Math.sin(v * Math.PI * 14 + wave * 0.2);

    ctx.fillStyle = `rgba(164, 142, 120, ${alpha.toFixed(3)})`;
    ctx.fillRect(0, y, 512, 1.8);
  }

  // Fine Micro-Fiber Streaks (Pores)
  ctx.fillStyle = "rgba(142, 122, 102, 0.05)";
  for (let i = 0; i < 400; i++) {
    const seedX = (Math.sin(i * 12.9898) * 43758.5453) % 1;
    const seedY = (Math.cos(i * 78.233) * 43758.5453) % 1;
    const x = Math.abs(seedX) * 512;
    const y = Math.abs(seedY) * 512;
    const len = 8 + Math.abs(Math.sin(i)) * 24;
    ctx.fillRect(x, y, 1.2, len);
  }

  // Soft Cathedral Arches in Center
  ctx.strokeStyle = "rgba(155, 133, 112, 0.06)";
  ctx.lineWidth = 2.5;
  for (let c = 0; c < 5; c++) {
    const centerY = 100 + c * 80;
    ctx.beginPath();
    ctx.moveTo(0, centerY + 60);
    ctx.quadraticCurveTo(256, centerY - 40, 512, centerY + 60);
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(1.5, 1.5);
  textureCache.set(key, texture);

  return texture;
}

/**
 * Procedural Fine Linen Fabric Micro-Texture
 */
export function getFabricTexture(): THREE.CanvasTexture | null {
  if (typeof document === "undefined") return null;

  const key = "fabric-linen";
  if (textureCache.has(key)) return textureCache.get(key)!;

  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  ctx.fillStyle = "#FAF8F5";
  ctx.fillRect(0, 0, 256, 256);

  // Soft organic cross-hatch linen weave
  ctx.strokeStyle = "rgba(40, 30, 20, 0.035)";
  ctx.lineWidth = 1;
  for (let x = 0; x < 256; x += 3) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, 256); ctx.stroke();
  }
  for (let y = 0; y < 256; y += 3) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(256, y); ctx.stroke();
  }

  // Alternating warp/weft slub accents
  ctx.fillStyle = "rgba(0, 0, 0, 0.02)";
  for (let s = 0; s < 60; s++) {
    const sx = ((s * 47) % 256);
    const sy = ((s * 83) % 256);
    ctx.fillRect(sx, sy, 4, 1.5);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(6, 6);
  textureCache.set(key, texture);

  return texture;
}

/**
 * Procedural Wool Knit / Twill Throw Blanket Micro-Texture
 */
export function getWoolTexture(): THREE.CanvasTexture | null {
  if (typeof document === "undefined") return null;

  const key = "wool-knit";
  if (textureCache.has(key)) return textureCache.get(key)!;

  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  ctx.fillStyle = "#D6CDBD";
  ctx.fillRect(0, 0, 256, 256);

  // Diagonal twill weave pattern
  ctx.strokeStyle = "rgba(60, 50, 40, 0.06)";
  ctx.lineWidth = 1.5;
  for (let d = -256; d < 512; d += 6) {
    ctx.beginPath(); ctx.moveTo(d, 0); ctx.lineTo(d + 256, 256); ctx.stroke();
  }
  ctx.strokeStyle = "rgba(60, 50, 40, 0.04)";
  for (let d = 512; d > -256; d -= 6) {
    ctx.beginPath(); ctx.moveTo(d, 0); ctx.lineTo(d - 256, 256); ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(8, 8);
  textureCache.set(key, texture);

  return texture;
}

/**
 * Procedural Botanical Leaf Surface Texture
 * Features organic primary/secondary vein lines and chlorophyll tone depth.
 */
export function getLeafTexture(): THREE.CanvasTexture | null {
  if (typeof document === "undefined") return null;

  const key = "botanical-leaf";
  if (textureCache.has(key)) return textureCache.get(key)!;

  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  // Lush Gradient Background (Deep Emerald to Fresh Botanical Green)
  const grad = ctx.createLinearGradient(0, 0, 512, 0);
  grad.addColorStop(0, "#244F32");
  grad.addColorStop(0.5, "#2E5D3C");
  grad.addColorStop(1, "#244F32");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 512);

  // Central Midrib Vein
  ctx.strokeStyle = "rgba(100, 160, 110, 0.35)";
  ctx.lineWidth = 3.5;
  ctx.beginPath();
  ctx.moveTo(256, 0);
  ctx.lineTo(256, 512);
  ctx.stroke();

  // Lateral Secondary Arching Veins
  ctx.strokeStyle = "rgba(90, 150, 100, 0.18)";
  ctx.lineWidth = 1.8;
  for (let y = 30; y < 512; y += 38) {
    // Left arch
    ctx.beginPath();
    ctx.moveTo(256, y);
    ctx.quadraticCurveTo(128, y - 24, 30, y - 10);
    ctx.stroke();
    // Right arch
    ctx.beginPath();
    ctx.moveTo(256, y);
    ctx.quadraticCurveTo(384, y - 24, 482, y - 10);
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  textureCache.set(key, texture);

  return texture;
}

/**
 * Procedural Exterior Daylight Window Horizon View
 * Generates a soft atmospheric daylight sky with subtle distant horizon depth.
 */
export function getDaylightBackdropTexture(): THREE.CanvasTexture | null {
  if (typeof document === "undefined") return null;

  const key = "daylight-backdrop-view";
  if (textureCache.has(key)) return textureCache.get(key)!;

  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  // Soft Daylight Sky Gradient
  const skyGrad = ctx.createLinearGradient(0, 0, 0, 512);
  skyGrad.addColorStop(0, "#D6EAF8");     // Soft morning atmospheric sky
  skyGrad.addColorStop(0.55, "#EDF6FC");  // Luminous daylight horizon
  skyGrad.addColorStop(0.78, "#F7FBFD");  // Warm sun mist near horizon
  skyGrad.addColorStop(1.0, "#E2ECE5");    // Subtle distant garden tree canopy tone
  ctx.fillStyle = skyGrad;
  ctx.fillRect(0, 0, 512, 512);

  // Faint Soft Distant Tree Line Silhouette
  ctx.fillStyle = "rgba(185, 205, 192, 0.35)";
  ctx.beginPath();
  ctx.moveTo(0, 512);
  ctx.lineTo(0, 420);
  for (let x = 0; x <= 512; x += 32) {
    const wave = Math.sin(x * 0.04) * 16 + Math.cos(x * 0.08) * 8;
    ctx.lineTo(x, 410 + wave);
  }
  ctx.lineTo(512, 512);
  ctx.closePath();
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  textureCache.set(key, texture);
  return texture;
}

/**
 * Procedural Warm Architectural Plaster Micro-Bump Texture
 */
export function getPlasterTexture(): THREE.CanvasTexture | null {
  if (typeof document === "undefined") return null;

  const key = "plaster-micro";
  if (textureCache.has(key)) return textureCache.get(key)!;

  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  ctx.fillStyle = "#F6F4F0";
  ctx.fillRect(0, 0, 256, 256);

  // Subtle stipple noise
  for (let i = 0; i < 600; i++) {
    const x = Math.floor(((i * 73) % 256));
    const y = Math.floor(((i * 127) % 256));
    const shade = (i % 2 === 0) ? "rgba(0,0,0,0.018)" : "rgba(255,255,255,0.03)";
    ctx.fillStyle = shade;
    ctx.fillRect(x, y, 2, 2);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(4, 4);
  textureCache.set(key, texture);

  return texture;
}

/**
 * Procedural Warm Walnut Wood Texture
 * Features rich dark walnut tones, vertical cathedral grain, and micro-pores.
 */
export function getWalnutWoodTexture(): THREE.CanvasTexture | null {
  if (typeof document === "undefined") return null;

  const key = "wood-grain-walnut";
  if (textureCache.has(key)) return textureCache.get(key)!;

  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  // Base Warm Walnut Tone
  ctx.fillStyle = "#76513B";
  ctx.fillRect(0, 0, 512, 512);

  // Vertical Grain Waves & Cathedrals
  for (let y = 0; y < 512; y += 2) {
    const v = y / 512;
    const cathedral = Math.sin(v * Math.PI * 3.5) * Math.cos(v * Math.PI * 1.5) * 14;
    const wave = Math.sin(v * 24 + cathedral * 0.12) * 8;
    const alpha = 0.08 + 0.12 * Math.sin(v * Math.PI * 16 + wave * 0.25);

    ctx.fillStyle = `rgba(62, 38, 24, ${alpha.toFixed(3)})`;
    ctx.fillRect(0, y, 512, 2.0);
  }

  // Micro-Fiber Streaks (Deep wood pores)
  ctx.fillStyle = "rgba(45, 26, 16, 0.14)";
  for (let i = 0; i < 500; i++) {
    const seedX = (Math.sin(i * 14.2898) * 43758.5453) % 1;
    const seedY = (Math.cos(i * 82.233) * 43758.5453) % 1;
    const x = Math.abs(seedX) * 512;
    const y = Math.abs(seedY) * 512;
    const len = 10 + Math.abs(Math.sin(i)) * 30;
    ctx.fillRect(x, y, 1.4, len);
  }

  // Soft Cathedral Arches in Center
  ctx.strokeStyle = "rgba(50, 30, 18, 0.12)";
  ctx.lineWidth = 2.8;
  for (let c = 0; c < 4; c++) {
    const centerY = 120 + c * 95;
    ctx.beginPath();
    ctx.moveTo(0, centerY + 50);
    ctx.quadraticCurveTo(256, centerY - 35, 512, centerY + 50);
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(1.5, 2.5);
  textureCache.set(key, texture);

  return texture;
}

/**
 * Procedural Natural Oak Wood Texture (Desk & Bed Frame)
 */
export function getOakWoodTexture(): THREE.CanvasTexture | null {
  if (typeof document === "undefined") return null;

  const key = "wood-grain-oak";
  if (textureCache.has(key)) return textureCache.get(key)!;

  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  // Base Natural Oak Warm Tone
  ctx.fillStyle = "#B78352";
  ctx.fillRect(0, 0, 512, 512);

  // Longitudinal Grain Waves
  for (let y = 0; y < 512; y += 2) {
    const v = y / 512;
    const wave = Math.sin(v * 20) * 5;
    const alpha = 0.05 + 0.09 * Math.sin(v * Math.PI * 12 + wave * 0.2);

    ctx.fillStyle = `rgba(138, 92, 52, ${alpha.toFixed(3)})`;
    ctx.fillRect(0, y, 512, 1.8);
  }

  // Wood Pores
  ctx.fillStyle = "rgba(110, 70, 38, 0.08)";
  for (let i = 0; i < 350; i++) {
    const seedX = (Math.sin(i * 11.23) * 43758.5453) % 1;
    const seedY = (Math.cos(i * 71.45) * 43758.5453) % 1;
    const x = Math.abs(seedX) * 512;
    const y = Math.abs(seedY) * 512;
    const len = 8 + Math.abs(Math.sin(i)) * 22;
    ctx.fillRect(x, y, 1.2, len);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 2);
  textureCache.set(key, texture);

  return texture;
}

/**
 * Procedural Natural Plank Wood Floor Texture
 * Realistic planks with vertical seams, staggered joints, and warm grain.
 */
export function getWoodPlankFloorTexture(): THREE.CanvasTexture | null {
  if (typeof document === "undefined") return null;

  const key = "wood-plank-floor";
  if (textureCache.has(key)) return textureCache.get(key)!;

  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  // Base Warm Natural Floor Tone
  ctx.fillStyle = "#C2A88F";
  ctx.fillRect(0, 0, 1024, 1024);

  const plankWidth = 128; // 8 planks across 1024px
  for (let i = 0; i < 8; i++) {
    const x = i * plankWidth;
    // Slight tone variation per plank
    const toneMod = (Math.sin(i * 1.7) * 12) | 0;
    const r = Math.min(255, Math.max(0, 194 + toneMod));
    const g = Math.min(255, Math.max(0, 168 + toneMod));
    const b = Math.min(255, Math.max(0, 143 + toneMod));
    ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
    ctx.fillRect(x, 0, plankWidth - 2, 1024);

    // Subtle grain within plank
    ctx.fillStyle = "rgba(120, 95, 75, 0.05)";
    for (let gIdx = 0; gIdx < 30; gIdx++) {
      const gx = x + 4 + ((gIdx * 4) % (plankWidth - 8));
      ctx.fillRect(gx, 0, 1.5, 1024);
    }

    // Plank Seam (Dark gap)
    ctx.fillStyle = "rgba(70, 50, 35, 0.45)";
    ctx.fillRect(x + plankWidth - 2, 0, 2, 1024);

    // Staggered horizontal butt joints
    const jointY = (i % 2 === 0) ? 512 : (i % 4 === 1 ? 256 : 768);
    ctx.fillStyle = "rgba(70, 50, 35, 0.40)";
    ctx.fillRect(x, jointY, plankWidth - 2, 2);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(3, 3);
  textureCache.set(key, texture);

  return texture;
}

/**
 * Procedural Cornflower Blue & Cream Checkerboard Fabric Texture
 */
export function getCheckerFabricTexture(): THREE.CanvasTexture | null {
  if (typeof document === "undefined") return null;

  const key = "checker-fabric-blue-cream";
  if (textureCache.has(key)) return textureCache.get(key)!;

  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const size = 64; // 8x8 checkerboard
  const color1 = "#8CB7E5"; // Cornflower Blue
  const color2 = "#F7F1E5"; // Cream Parchment

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      ctx.fillStyle = (row + col) % 2 === 0 ? color1 : color2;
      ctx.fillRect(col * size, row * size, size, size);
    }
  }

  // Woven fabric cross-hatch texture over checkers
  ctx.strokeStyle = "rgba(0, 0, 0, 0.04)";
  ctx.lineWidth = 1;
  for (let p = 0; p < 512; p += 4) {
    ctx.beginPath(); ctx.moveTo(p, 0); ctx.lineTo(p, 512); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0, p); ctx.lineTo(512, p); ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 2);
  textureCache.set(key, texture);

  return texture;
}

/**
 * Procedural Parchment Paper Texture (Warm Ivory with subtle fiber specks)
 */
export function getParchmentPaperTexture(): THREE.CanvasTexture | null {
  if (typeof document === "undefined") return null;

  const key = "parchment-paper";
  if (textureCache.has(key)) return textureCache.get(key)!;

  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  // Base Warm Ivory Parchment
  ctx.fillStyle = "#F7F1E5";
  ctx.fillRect(0, 0, 512, 512);

  // Faint organic fiber specks
  for (let i = 0; i < 400; i++) {
    const x = Math.floor(((i * 67) % 512));
    const y = Math.floor(((i * 131) % 512));
    const isDark = i % 3 === 0;
    ctx.fillStyle = isDark ? "rgba(120, 100, 80, 0.04)" : "rgba(255, 255, 255, 0.08)";
    ctx.fillRect(x, y, 1.5, 2.5);
  }

  const texture = new THREE.CanvasTexture(canvas);
  textureCache.set(key, texture);
  return texture;
}

/**
 * Procedural Dotted Notebook Paper Texture (for bed study cluster)
 */
export function getNotebookDottedTexture(): THREE.CanvasTexture | null {
  if (typeof document === "undefined") return null;

  const key = "notebook-dotted-paper";
  if (textureCache.has(key)) return textureCache.get(key)!;

  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  // Clean Chalk Background
  ctx.fillStyle = "#FFFDF7";
  ctx.fillRect(0, 0, 512, 512);

  // Dotted Grid
  ctx.fillStyle = "rgba(39, 50, 70, 0.18)"; // Soft deep ink dots
  const spacing = 24;
  for (let x = 12; x < 512; x += spacing) {
    for (let y = 12; y < 512; y += spacing) {
      ctx.beginPath();
      ctx.arc(x, y, 1.2, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Hand-drawn Sun doodle in upper corner
  ctx.strokeStyle = "#EFCB75"; // Butter yellow
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.arc(420, 80, 16, 0, Math.PI * 2);
  ctx.stroke();
  for (let a = 0; a < Math.PI * 2; a += Math.PI / 4) {
    const x1 = 420 + Math.cos(a) * 22;
    const y1 = 80 + Math.sin(a) * 22;
    const x2 = 420 + Math.cos(a) * 29;
    const y2 = 80 + Math.sin(a) * 29;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }

  // Hand-drawn sketch diagram
  ctx.strokeStyle = "rgba(39, 50, 70, 0.4)";
  ctx.lineWidth = 1.8;
  ctx.strokeRect(60, 140, 180, 110);
  ctx.beginPath();
  ctx.moveTo(70, 170); ctx.lineTo(150, 170);
  ctx.moveTo(70, 195); ctx.lineTo(210, 195);
  ctx.moveTo(70, 220); ctx.lineTo(180, 220);
  ctx.stroke();

  // Handwritten note
  ctx.fillStyle = "#273246";
  ctx.font = "italic 16px serif";
  ctx.fillText("Design Architecture — v2", 60, 120);

  const texture = new THREE.CanvasTexture(canvas);
  textureCache.set(key, texture);
  return texture;
}

/**
 * Procedural Projects Book Cover Texture
 */
export function getBookCoverTexture(): THREE.CanvasTexture | null {
  if (typeof document === "undefined") return null;

  const key = "projects-book-cover";
  if (textureCache.has(key)) return textureCache.get(key)!;

  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 700;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  // Deep Ink Buckram Cloth Cover
  ctx.fillStyle = "#273246";
  ctx.fillRect(0, 0, 512, 700);

  // Fine cloth texture
  ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
  ctx.lineWidth = 1;
  for (let x = 0; x < 512; x += 3) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, 700); ctx.stroke();
  }
  for (let y = 0; y < 700; y += 3) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(512, y); ctx.stroke();
  }

  // Embossed Gold Border Box
  ctx.strokeStyle = "#EFCB75"; // Butter yellow / gold
  ctx.lineWidth = 2.5;
  ctx.strokeRect(40, 50, 432, 600);
  ctx.lineWidth = 1.0;
  ctx.strokeRect(48, 58, 416, 584);

  // Embossed Title Typography
  ctx.fillStyle = "#FFFDF7"; // Clean chalk
  ctx.font = "bold 26px serif";
  ctx.textAlign = "center";
  ctx.fillText("SELECTED WORKS", 256, 260);

  ctx.fillStyle = "#EFCB75"; // Gold
  ctx.font = "14px monospace";
  ctx.fillText("PORTFOLIO // VOL. 01", 256, 300);

  ctx.fillStyle = "#8CB7E5"; // Cornflower blue accent
  ctx.font = "italic 18px serif";
  ctx.fillText("Taushik Chandana", 256, 360);

  ctx.fillStyle = "rgba(255, 253, 247, 0.6)";
  ctx.font = "11px monospace";
  ctx.fillText("DESIGN SYSTEMS & AI PRODUCTS", 256, 400);

  // Bottom Bookmark Star Mark
  ctx.fillStyle = "#EFCB75";
  ctx.font = "20px serif";
  ctx.fillText("✦", 256, 580);

  const texture = new THREE.CanvasTexture(canvas);
  textureCache.set(key, texture);
  return texture;
}

/**
 * Procedural Natural Pinboard Cork / Linen Fabric Texture (for experience wall hanging)
 */
export function getPinboardFabricTexture(): THREE.CanvasTexture | null {
  if (typeof document === "undefined") return null;

  const key = "pinboard-linen-fabric";
  if (textureCache.has(key)) return textureCache.get(key)!;

  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  // Warm Natural Linen / Cork Tone
  ctx.fillStyle = "#E8DFD1";
  ctx.fillRect(0, 0, 512, 512);

  // Coarse linen weave
  ctx.strokeStyle = "rgba(90, 70, 50, 0.05)";
  ctx.lineWidth = 1.5;
  for (let x = 0; x < 512; x += 4) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, 512); ctx.stroke();
  }
  for (let y = 0; y < 512; y += 4) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(512, y); ctx.stroke();
  }

  // Pores and flecks
  ctx.fillStyle = "rgba(70, 50, 30, 0.04)";
  for (let i = 0; i < 300; i++) {
    const x = Math.floor(((i * 79) % 512));
    const y = Math.floor(((i * 137) % 512));
    ctx.fillRect(x, y, 2.5, 2.5);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 2);
  textureCache.set(key, texture);
  return texture;
}

