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

