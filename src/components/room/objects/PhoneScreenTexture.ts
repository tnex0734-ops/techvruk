"use client";

import * as THREE from "three";

const phoneTextureCache = new Map<string, THREE.CanvasTexture>();

/**
 * Generate High-DPI OLED Mobile Phone Screen Texture
 * Features an authentic dark-mode smartphone interface with glowing typography,
 * status icons, Taushik's verified details, and interactive channel callouts.
 */
export function createPhoneScreenTexture(isSelected: boolean): THREE.CanvasTexture | null {
  if (typeof document === "undefined") return null;
  const key = `phone-oled-screen-${isSelected ? "active" : "standby"}`;
  if (phoneTextureCache.has(key)) return phoneTextureCache.get(key)!;

  const w = 512;
  const h = 1024;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  // 1. Deep OLED Midnight Background
  ctx.fillStyle = isSelected ? "#060911" : "#0A0D15";
  ctx.fillRect(0, 0, w, h);

  // Subtle futuristic grid lines
  if (isSelected) {
    ctx.strokeStyle = "rgba(122, 197, 199, 0.05)";
    ctx.lineWidth = 1;
    for (let x = 0; x < w; x += 32) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 0; y < h; y += 32) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }
  }

  // 2. Bezel Border Glow
  ctx.strokeStyle = isSelected ? "rgba(122, 197, 199, 0.4)" : "rgba(255, 255, 255, 0.1)";
  ctx.lineWidth = 4;
  ctx.strokeRect(12, 12, w - 24, h - 24);

  // 3. Status Bar & Dynamic Island
  ctx.fillStyle = "#000000";
  // Speaker notch
  ctx.beginPath();
  ctx.roundRect(w / 2 - 60, 24, 120, 28, 14);
  ctx.fill();
  ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // Green active camera indicator dot
  ctx.fillStyle = "#10B981";
  ctx.beginPath();
  ctx.arc(w / 2 + 42, 38, 4, 0, Math.PI * 2);
  ctx.fill();

  // Time & Status
  ctx.font = "bold 24px monospace";
  ctx.fillStyle = "#FFFFFF";
  ctx.textAlign = "left";
  ctx.fillText("9:41", 36, 44);

  ctx.textAlign = "right";
  ctx.font = "bold 20px monospace";
  ctx.fillStyle = "#7AC5C7";
  ctx.fillText("5G  100%", w - 36, 44);

  if (isSelected) {
    // ── ACTIVE ELEVATED STATE ──

    // Holographic Connection Badge
    ctx.textAlign = "center";
    ctx.fillStyle = "rgba(122, 197, 199, 0.15)";
    ctx.fillRect(w / 2 - 120, 85, 240, 36);
    ctx.strokeStyle = "#7AC5C7";
    ctx.lineWidth = 1.5;
    ctx.strokeRect(w / 2 - 120, 85, 240, 36);

    ctx.font = "bold 16px monospace";
    ctx.fillStyle = "#7AC5C7";
    ctx.fillText("● HOLOGRAPHIC CALL ACTIVE", w / 2, 109);

    // Avatar Circle
    const avatarY = 195;
    ctx.beginPath();
    ctx.arc(w / 2, avatarY, 54, 0, Math.PI * 2);
    ctx.fillStyle = "#111827";
    ctx.fill();
    ctx.strokeStyle = "#C91F2B";
    ctx.lineWidth = 4;
    ctx.stroke();

    ctx.font = "900 38px 'Space Grotesk', system-ui, sans-serif";
    ctx.fillStyle = "#FFFFFF";
    ctx.fillText("TC", w / 2, avatarY + 13);

    // Profile Identity
    ctx.font = "bold 32px 'Space Grotesk', system-ui, sans-serif";
    ctx.fillStyle = "#FFFFFF";
    ctx.fillText("Taushik Chandana", w / 2, 285);

    ctx.font = "bold 19px monospace";
    ctx.fillStyle = "#7AC5C7";
    ctx.fillText("Product Designer & Creative Developer", w / 2, 320);

    ctx.font = "18px monospace";
    ctx.fillStyle = "#9CA3AF";
    ctx.fillText("Hyderabad, India  •  IST (UTC+5:30)", w / 2, 350);

    // Status Pill
    ctx.fillStyle = "rgba(16, 185, 129, 0.18)";
    ctx.fillRect(w / 2 - 150, 385, 300, 38);
    ctx.strokeStyle = "#10B981";
    ctx.lineWidth = 1.5;
    ctx.strokeRect(w / 2 - 150, 385, 300, 38);

    ctx.font = "bold 16px monospace";
    ctx.fillStyle = "#34D399";
    ctx.fillText("🟢 AVAILABLE FOR Q1 2026 ROLES", w / 2, 410);

    // Verified Channels Section
    const cardY = 460;
    const cardH = 95;
    const cardW = w - 60;
    const cardX = 30;

    // Channel 1: Email
    ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
    ctx.fillRect(cardX, cardY, cardW, cardH);
    ctx.strokeStyle = "rgba(122, 197, 199, 0.3)";
    ctx.lineWidth = 1.5;
    ctx.strokeRect(cardX, cardY, cardW, cardH);

    ctx.textAlign = "left";
    ctx.font = "bold 16px monospace";
    ctx.fillStyle = "#7AC5C7";
    ctx.fillText("✉ EMAIL DIRECT", cardX + 20, cardY + 34);

    ctx.font = "bold 22px monospace";
    ctx.fillStyle = "#FFFFFF";
    ctx.fillText("taushikok@gmail.com", cardX + 20, cardY + 70);

    // Channel 2: Phone / WhatsApp
    const card2Y = cardY + cardH + 20;
    ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
    ctx.fillRect(cardX, card2Y, cardW, cardH);
    ctx.strokeStyle = "rgba(122, 197, 199, 0.3)";
    ctx.lineWidth = 1.5;
    ctx.strokeRect(cardX, card2Y, cardW, cardH);

    ctx.font = "bold 16px monospace";
    ctx.fillStyle = "#34D399";
    ctx.fillText("📞 CALL / WHATSAPP", cardX + 20, card2Y + 34);

    ctx.font = "bold 22px monospace";
    ctx.fillStyle = "#FFFFFF";
    ctx.fillText("+91 93922 47346", cardX + 20, card2Y + 70);

    // Channel 3: LinkedIn & GitHub
    const card3Y = card2Y + cardH + 20;
    ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
    ctx.fillRect(cardX, card3Y, cardW, cardH);
    ctx.strokeStyle = "rgba(122, 197, 199, 0.3)";
    ctx.lineWidth = 1.5;
    ctx.strokeRect(cardX, card3Y, cardW, cardH);

    ctx.font = "bold 16px monospace";
    ctx.fillStyle = "#7AC5C7";
    ctx.fillText("🌐 PROFESSIONAL NETWORKS", cardX + 20, card3Y + 34);

    ctx.font = "bold 20px monospace";
    ctx.fillStyle = "#FFFFFF";
    ctx.fillText("linkedin.com/in/taushik-chandana", cardX + 20, card3Y + 70);

    // Disconnect Button Bar
    const btnY = card3Y + cardH + 30;
    ctx.fillStyle = "#C91F2B";
    ctx.fillRect(cardX, btnY, cardW, 60);

    ctx.textAlign = "center";
    ctx.font = "bold 20px monospace";
    ctx.fillStyle = "#FFFFFF";
    ctx.fillText("✕ END CALL / RETURN (ESC)", w / 2, btnY + 38);

    // iOS Home Bar
    ctx.fillStyle = "#6B7280";
    ctx.fillRect(w / 2 - 80, h - 36, 160, 6);
  } else {
    // ── STANDBY STATE ──
    ctx.textAlign = "center";
    ctx.font = "18px monospace";
    ctx.fillStyle = "#9CA3AF";
    ctx.fillText("SUNDAY, NOVEMBER 8", w / 2, 280);

    ctx.font = "900 84px 'Space Grotesk', system-ui, sans-serif";
    ctx.fillStyle = "#FFFFFF";
    ctx.fillText("09:41", w / 2, 380);

    ctx.font = "bold 22px monospace";
    ctx.fillStyle = "#7AC5C7";
    ctx.fillText("Taushik Chandana", w / 2, 480);

    ctx.font = "18px monospace";
    ctx.fillStyle = "#9CA3AF";
    ctx.fillText("Contact Channels Standby", w / 2, 515);

    ctx.fillStyle = "rgba(122, 197, 199, 0.15)";
    ctx.fillRect(w / 2 - 140, 580, 280, 50);
    ctx.strokeStyle = "#7AC5C7";
    ctx.lineWidth = 1.5;
    ctx.strokeRect(w / 2 - 140, 580, 280, 50);

    ctx.font = "bold 18px monospace";
    ctx.fillStyle = "#7AC5C7";
    ctx.fillText("➔ TAP PHONE TO CONNECT", w / 2, 612);

    ctx.fillStyle = "#4B5563";
    ctx.fillRect(w / 2 - 70, h - 36, 140, 6);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  phoneTextureCache.set(key, texture);
  return texture;
}

export function disposePhoneScreenTextures() {
  for (const tex of phoneTextureCache.values()) {
    tex.dispose();
  }
  phoneTextureCache.clear();
}

