"use client";

import * as THREE from "three";
import { BookProject } from "./projectData";

// Cache textures so we don't recreate them needlessly
const textureCache = new Map<string, THREE.CanvasTexture>();

/**
 * Helper to create an in-memory high-DPI HTML canvas
 */
function createHiDPICanvas(w: number, h: number): { canvas: HTMLCanvasElement; ctx: CanvasRenderingContext2D } {
  if (typeof document === "undefined") {
    return { canvas: {} as HTMLCanvasElement, ctx: {} as CanvasRenderingContext2D };
  }
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d")!;
  return { canvas, ctx };
}

/**
 * Generate Hardcover Book Front Cover Texture
 * Deep ink buckram cloth with embossed gold typography
 */
export function createBookCoverTexture(): THREE.CanvasTexture | null {
  if (typeof document === "undefined") return null;
  const key = "book-cover-gold-emboss";
  if (textureCache.has(key)) return textureCache.get(key)!;

  const w = 1024;
  const h = 768;
  const { canvas, ctx } = createHiDPICanvas(w, h);
  if (!ctx) return null;

  // 1. Buckram cloth background
  ctx.fillStyle = "#1E2738";
  ctx.fillRect(0, 0, w, h);

  // Subtle linen weave texture overlay
  ctx.fillStyle = "rgba(255, 255, 255, 0.02)";
  for (let x = 0; x < w; x += 4) {
    ctx.fillRect(x, 0, 1, h);
  }
  for (let y = 0; y < h; y += 4) {
    ctx.fillRect(0, y, w, 1);
  }

  // 2. Gold Dual Filigree Border
  const pad = 44;
  ctx.strokeStyle = "#D4AF37";
  ctx.lineWidth = 4;
  ctx.strokeRect(pad, pad, w - pad * 2, h - pad * 2);

  ctx.strokeStyle = "rgba(212, 175, 55, 0.4)";
  ctx.lineWidth = 1.5;
  ctx.strokeRect(pad + 12, pad + 12, w - (pad + 12) * 2, h - (pad + 12) * 2);

  // Corner decorative marks
  const corners = [
    [pad + 12, pad + 12],
    [w - pad - 12, pad + 12],
    [pad + 12, h - pad - 12],
    [w - pad - 12, h - pad - 12],
  ];
  ctx.fillStyle = "#D4AF37";
  for (const [cx, cy] of corners) {
    ctx.beginPath();
    ctx.arc(cx, cy, 5, 0, Math.PI * 2);
    ctx.fill();
  }

  // 3. Gold Embossed Title Typography
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  // Eyebrow
  ctx.font = "bold 22px 'Space Grotesk', system-ui, sans-serif";
  ctx.fillStyle = "#E5C158";
  ctx.letterSpacing = "6px";
  ctx.fillText("TAUSHIK CHANDANA", w / 2, 220);

  // Gold divider diamond
  ctx.font = "16px serif";
  ctx.fillText("◆  ◆  ◆", w / 2, 260);

  // Main Title
  ctx.font = "900 68px 'Playfair Display', Georgia, serif";
  ctx.fillStyle = "#F3E2A9";
  ctx.letterSpacing = "4px";
  ctx.fillText("SELECTED WORKS", w / 2, 340);

  // Subtitle
  ctx.font = "italic 32px 'Playfair Display', Georgia, serif";
  ctx.fillStyle = "#E5C158";
  ctx.letterSpacing = "3px";
  ctx.fillText("Volume 01  •  2026 Archive", w / 2, 420);

  // Divider rule
  ctx.strokeStyle = "rgba(212, 175, 55, 0.6)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(w / 2 - 160, 470);
  ctx.lineTo(w / 2 + 160, 470);
  ctx.stroke();

  // Bottom Label
  ctx.font = "600 20px 'Space Grotesk', system-ui, sans-serif";
  ctx.fillStyle = "#D4AF37";
  ctx.letterSpacing = "4px";
  ctx.fillText("PRODUCT DESIGNER & CREATIVE BUILDER", w / 2, 530);

  ctx.font = "500 16px monospace";
  ctx.fillStyle = "rgba(212, 175, 55, 0.7)";
  ctx.letterSpacing = "2px";
  ctx.fillText("7 VERIFIED PROJECTS  //  HYDERABAD & BENGALURU", w / 2, 575);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  textureCache.set(key, texture);
  return texture;
}

/**
 * Generate Left Page Texture: Editorial Colophon & Table of Contents (High-DPI 2048x1536)
 */
export function createLeftPageTexture(
  activeProjectIndex: number,
  projects: BookProject[]
): THREE.CanvasTexture | null {
  if (typeof document === "undefined") return null;
  const key = `book-left-page-${activeProjectIndex}`;
  if (textureCache.has(key)) return textureCache.get(key)!;

  const w = 2048;
  const h = 1536;
  const { canvas, ctx } = createHiDPICanvas(w, h);
  if (!ctx) return null;

  // 1. Warm Archival Parchment Paper Background
  ctx.fillStyle = "#FBF9F4";
  ctx.fillRect(0, 0, w, h);

  // Subtle paper grain overlay
  ctx.fillStyle = "rgba(0, 0, 0, 0.015)";
  for (let x = 0; x < w; x += 6) {
    ctx.fillRect(x, 0, 1, h);
  }

  // Spine gutter shadow on right edge
  const gutterGrad = ctx.createLinearGradient(w - 120, 0, w, 0);
  gutterGrad.addColorStop(0, "rgba(0, 0, 0, 0)");
  gutterGrad.addColorStop(1, "rgba(50, 35, 20, 0.18)");
  ctx.fillStyle = gutterGrad;
  ctx.fillRect(w - 120, 0, 120, h);

  // Double perimeter archival frame
  ctx.strokeStyle = "rgba(120, 100, 80, 0.35)";
  ctx.lineWidth = 3;
  ctx.strokeRect(100, 80, w - 200, h - 160);

  ctx.strokeStyle = "rgba(229, 36, 36, 0.3)";
  ctx.lineWidth = 1.5;
  ctx.strokeRect(115, 95, w - 230, h - 190);

  // 2. Colophon Header
  ctx.textAlign = "left";
  ctx.textBaseline = "top";

  ctx.font = "bold 34px 'Space Grotesk', system-ui, sans-serif";
  ctx.fillStyle = "#E52424";
  ctx.fillText("TAUSHIK CHANDANA // ARCHIVE", 160, 135);

  ctx.font = "900 68px 'Playfair Display', Georgia, serif";
  ctx.fillStyle = "#18181B";
  ctx.fillText("TABLE OF CONTENTS", 160, 195);

  ctx.strokeStyle = "rgba(229, 36, 36, 0.5)";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(160, 290);
  ctx.lineTo(w - 240, 290);
  ctx.stroke();

  // 3. Project Index Rows (7 Verified Projects)
  const startY = 340;
  const rowHeight = 130;

  projects.forEach((proj, idx) => {
    const y = startY + idx * rowHeight;
    const isActive = idx === activeProjectIndex;

    if (isActive) {
      // Active item highlight box
      ctx.fillStyle = "rgba(229, 36, 36, 0.08)";
      ctx.fillRect(150, y - 10, w - 340, rowHeight - 16);

      // Red vertical marker pill
      ctx.fillStyle = "#E52424";
      ctx.fillRect(150, y - 10, 10, rowHeight - 16);
    }

    // Number
    ctx.font = isActive ? "bold 44px monospace" : "600 40px monospace";
    ctx.fillStyle = isActive ? "#E52424" : "#716B64";
    ctx.fillText(proj.number, 190, y);

    // Title
    ctx.font = isActive
      ? "bold 44px 'Space Grotesk', system-ui, sans-serif"
      : "600 40px 'Space Grotesk', system-ui, sans-serif";
    ctx.fillStyle = isActive ? "#18181B" : "#2C2520";
    ctx.fillText(proj.title, 300, y);

    // Category
    ctx.font = "30px 'Space Grotesk', system-ui, sans-serif";
    ctx.fillStyle = isActive ? "#E52424" : "#8A7E72";
    ctx.fillText(`—  ${proj.category}`, 880, y + 4);

    // Dot leader
    ctx.fillStyle = isActive ? "rgba(229, 36, 36, 0.4)" : "rgba(100, 80, 60, 0.25)";
    ctx.fillText("....................................................", 1400, y);

    // Status / Page tag
    ctx.textAlign = "right";
    ctx.font = isActive ? "bold 32px monospace" : "30px monospace";
    ctx.fillStyle = isActive ? "#E52424" : "#716B64";
    ctx.fillText(isActive ? "[ VIEWING SPREAD ]" : `P. 0${idx + 1}`, w - 220, y + 2);
    ctx.textAlign = "left";
  });

  // Footer notes with tactile paper stamps
  ctx.font = "bold 26px monospace";
  ctx.fillStyle = "#E52424";
  ctx.fillText("✦ [ CLICK ANY PROJECT ROW TO TURN PAGE ]", 160, h - 160);

  ctx.font = "24px monospace";
  ctx.fillStyle = "#716B64";
  ctx.fillText("GENUINE PRODUCTION CASE STUDIES • HYDERABAD & BENGALURU", 160, h - 115);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.anisotropy = 16;
  textureCache.set(key, texture);
  return texture;
}

/**
 * Generate Right Page Texture: Active Project Spread (High-DPI 2048x1536)
 */
export function createRightPageTexture(
  project: BookProject,
  pageIndex: number,
  totalProjects: number
): THREE.CanvasTexture | null {
  if (typeof document === "undefined") return null;
  const key = `book-right-page-${project.id}-${pageIndex}`;
  if (textureCache.has(key)) return textureCache.get(key)!;

  const w = 2048;
  const h = 1536;
  const { canvas, ctx } = createHiDPICanvas(w, h);
  if (!ctx) return null;

  // 1. Warm Cream Parchment Paper Background
  ctx.fillStyle = "#FFFDF9";
  ctx.fillRect(0, 0, w, h);

  // Subtle paper grain overlay
  ctx.fillStyle = "rgba(0, 0, 0, 0.015)";
  for (let x = 0; x < w; x += 6) {
    ctx.fillRect(x, 0, 1, h);
  }

  // Spine gutter shadow on left edge
  const spineGrad = ctx.createLinearGradient(0, 0, 120, 0);
  spineGrad.addColorStop(0, "rgba(50, 35, 20, 0.18)");
  spineGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
  ctx.fillStyle = spineGrad;
  ctx.fillRect(0, 0, 120, h);

  // Double perimeter archival frame
  ctx.strokeStyle = "rgba(120, 100, 80, 0.35)";
  ctx.lineWidth = 3;
  ctx.strokeRect(100, 80, w - 200, h - 160);

  ctx.strokeStyle = "rgba(229, 36, 36, 0.3)";
  ctx.lineWidth = 1.5;
  ctx.strokeRect(115, 95, w - 230, h - 190);

  // 2. Top Header Bar
  ctx.textAlign = "left";
  ctx.textBaseline = "top";

  // Project Page Indicator
  ctx.font = "bold 32px monospace";
  ctx.fillStyle = "#E52424";
  ctx.fillText(`PROJECT ${project.number} // 0${totalProjects}`, 160, 130);

  // Category Badge (right aligned)
  ctx.textAlign = "right";
  ctx.font = "bold 30px 'Space Grotesk', system-ui, sans-serif";
  ctx.fillStyle = "#E52424";
  ctx.fillText(`[ ${project.category.toUpperCase()} ]`, w - 160, 130);
  ctx.textAlign = "left";

  // 3. Project Title & Tagline
  ctx.font = "900 92px 'Playfair Display', Georgia, serif";
  ctx.fillStyle = "#18181B";
  ctx.fillText(project.title, 160, 185);

  ctx.font = "600 38px 'Space Grotesk', system-ui, sans-serif";
  ctx.fillStyle = "#574E45";
  ctx.fillText(project.tagline, 160, 295);

  // Divider
  ctx.strokeStyle = "rgba(120, 100, 80, 0.3)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(160, 365);
  ctx.lineTo(w - 160, 365);
  ctx.stroke();

  // 4. Tools Badges Row
  ctx.font = "bold 28px monospace";
  let curX = 160;
  for (const tool of project.tools) {
    const textW = ctx.measureText(tool).width;
    ctx.fillStyle = "rgba(229, 36, 36, 0.08)";
    ctx.fillRect(curX, 400, textW + 40, 56);
    ctx.strokeStyle = "rgba(229, 36, 36, 0.4)";
    ctx.lineWidth = 2;
    ctx.strokeRect(curX, 400, textW + 40, 56);

    ctx.fillStyle = "#E52424";
    ctx.fillText(tool, curX + 20, 414);
    curX += textW + 64;
  }

  // 5. Framed Graphic Preview Card
  const previewY = 495;
  const previewH = 430;
  const previewW = w - 320;

  ctx.fillStyle = "#F2ECE1";
  ctx.fillRect(160, previewY, previewW, previewH);
  ctx.strokeStyle = "rgba(100, 80, 60, 0.45)";
  ctx.lineWidth = 2.5;
  ctx.strokeRect(160, previewY, previewW, previewH);

  // Inner mockup frame
  ctx.fillStyle = "#18181B";
  ctx.fillRect(190, previewY + 30, previewW - 60, previewH - 60);

  // Mockup title and live badge
  ctx.textAlign = "center";
  ctx.font = "bold 44px 'Space Grotesk', system-ui, sans-serif";
  ctx.fillStyle = "#FFFFFF";
  ctx.fillText(project.title, w / 2, previewY + previewH / 2 - 28);

  ctx.font = "bold 30px monospace";
  ctx.fillStyle = "#E52424";
  ctx.fillText(`● STATUS: ${project.status.toUpperCase()}`, w / 2, previewY + previewH / 2 + 32);
  ctx.textAlign = "left";

  // 6. Summary Description (Crisp, High Contrast)
  ctx.font = "500 36px/1.6 'Space Grotesk', system-ui, sans-serif";
  ctx.fillStyle = "#2D2620";
  const descText = project.description;
  const words = descText.split(" ");
  let line1 = "";
  let line2 = "";
  for (const word of words) {
    if (ctx.measureText(line1 + word).width < w - 340) {
      line1 += word + " ";
    } else {
      line2 += word + " ";
    }
  }
  ctx.fillText(line1.trim(), 160, 970);
  if (line2) ctx.fillText(line2.trim(), 160, 1030);

  // 7. Tactical Dossier Inspection Callout Button
  ctx.fillStyle = "#E52424";
  ctx.fillRect(160, 1120, w - 320, 96);
  ctx.strokeStyle = "#18181B";
  ctx.lineWidth = 3;
  ctx.strokeRect(160, 1120, w - 320, 96);

  ctx.textAlign = "center";
  ctx.font = "bold 32px monospace";
  ctx.fillStyle = "#FFFFFF";
  ctx.fillText("➔ [ ✦ CLICK TO OPEN FULL PROJECT DOSSIER ↗ ]", w / 2, 1178);
  ctx.textAlign = "left";

  // 8. Footer Page Number
  ctx.textAlign = "right";
  ctx.font = "bold 30px monospace";
  ctx.fillStyle = "#716B64";
  ctx.fillText(`— 0${pageIndex + 1} OF 0${totalProjects} —`, w - 160, h - 130);
  ctx.textAlign = "left";

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.anisotropy = 16;
  textureCache.set(key, texture);
  return texture;
}

/**
 * Clean up texture cache on unmount
 */
export function disposeBookPageTextures() {
  for (const tex of textureCache.values()) {
    tex.dispose();
  }
  textureCache.clear();
}

