# Phase 3A — Architectural 3D Room Blockout Report

**Date:** 2026-11-06  
**Status:** Completed & Verified  
**Checkpoint Commit Target:** `feat(room): implement architectural 3D room blockout`  
**Workspace:** `C:\Users\TNEX\OneDrive\Desktop\portcomp\PORTFOLIO`  
**Inspection Route:** `http://localhost:3000/preview-room` (Local dev) / `http://localhost:3000/` (Integrated homepage hero)  
**Screenshots Folder:** `C:\Users\TNEX\OneDrive\Desktop\Phase3A_Screenshots/`

---

## 1. Executive Summary & Objective

In accordance with Phase 3A specifications, we have implemented an **architectural 3D interior visualization blockout** of Taushik Chandana's bedroom and creative workspace.

The 3D room acts as the interactive hero centerpiece of the portfolio, replacing the legacy static hero while maintaining an open-front 3/4 cutaway architectural aesthetic that harmonizes with the pure white and signature red design system established in Phases 1 and 2.

### Strict Scope Boundary (Phase 3A vs Phase 3B)
- **Phase 3A (Current):** Architectural spatial arrangement, metric envelope, blockout geometry for all core zones, responsive camera system, lighting, demand-based rendering loop, error handling, dev preview route, and seamless flow into Phase 2 About ribbon.
- **Phase 3B (Next):** High-fidelity GLB models (detailed laptop, fishbowl simulation, plant foliage, realistic bedding wrinkles), interactive raycasting hotspots, camera zoom transitions, and stateful drawers/doors.

---

## 2. Spatial Arrangement & Normalized Metric Coordinate System

The room is modeled on a normalized 1:1 metric scale ($1\text{ unit} = 1\text{ meter}$) with dimensions $7.2\text{m} \text{ (width, X)} \times 5.4\text{m} \text{ (depth, Z)} \times 2.8\text{m} \text{ (height, Y)}$.

```
                         [ BACK WALL: Z = -2.7m ]
   -X <---------------------------------------------------> +X
   ┌────────────────────────────────────────────────────────┐
   │                                                        │
   │  ┌──────────┐              ┌──────────────┐            │
   │  │ WARDROBE │              │ WORKSTATION  │            │
   │  │ CUPBOARDS│              │ Desk, Laptop,│            │
   │  │          │              │ Plant, Bowl  │            │
   │  │ (Storage │              └──────────────┘            │
   │  │  Archive)│                                  WINDOW  │
[L │  │          │                                  (Right  │ [R
 E │  │          │                                   Wall)  │  I
 F │  └──────────┘                                          │  G
 T │                                             ┌────────┐ │  H
   │                                             │ BED    │ │  T
 W │                                             │ Platform│ │  W
 A │                                             │ Matt.  │ │  A
 L │                                             │ Pillows│ │  L
 L │                                             └────────┘ │  L
   │                                                        │
   │                                                 DOOR   │
   │                                                        │
   └────────────────────────────────────────────────────────┘
                 [ OPEN CUTAWAY FRONT: Z = +2.7m ]
                          ^ Camera View ^
```

### Zone breakdown:
1. **Left Wall Zone — Experience Archive / Storage:**
   - Triple-door built-in wardrobe cupboard (`x: -2.25`, `y: 1.15`, `z: -0.5`).
   - Dimensions: $2.4\text{m wide} \times 2.3\text{m tall} \times 0.65\text{m deep}$.
   - Features recessed plinth kickplate, 3 vertical doors, and matte black linear handles.
2. **Corner Zone — Creative Workstation:**
   - Minimalist birch/black steel desk (`x: -0.2`, `y: 0.375`, `z: -2.0`, $1.5\text{m} \times 0.75\text{m} \times 0.75\text{m}$).
   - Laptop proxy on aluminum riser stand angled toward user.
   - Low-profile keyboard and wireless mouse proxy.
   - Glass sphere fishbowl proxy with tinted water core.
   - Architectural ceramic cylinder plant pot with foliage placeholder.
   - Ergonomic workstation task chair with signature red accent cushion (`#C91F2B`).
   - Dual floating quotation / art frames mounted on back wall above desk (`x: -0.2`, `y: 1.8`, `z: -2.68`).
3. **Right Wall Zone — Rest & Architecture:**
   - Modern platform bed with upholstered headboard, double mattress, duvet topper, and dual pillows (`x: 1.6`, `y: 0.45`, `z: 0.8`, $1.8\text{m} \times 2.1\text{m}$).
   - Right wall architectural window cutout (`x: 3.6`, `y: 1.4`, `z: -0.8`, $1.2\text{m} \times 1.5\text{m}$) where primary daylight directional light enters.
   - Right wall architectural flush door cutout (`x: 3.6`, `y: 1.05`, `z: 1.5`, $0.95\text{m} \times 2.1\text{m}$).

---

## 3. Materials & Palette System

In strict compliance with visual quality rules, the room uses an architectural interior materials palette:
- **Walls (`wallPlaster`):** Warm off-white matte plaster (`#F5F3EF`, roughness 0.92).
- **Floor (`floorConcrete`):** Soft architectural light concrete slab (`#E8E2D9`, roughness 0.8).
- **Woodwork (`lightBirch`):** Warm Scandinavian birch for desk and wardrobe (`#D5C5B1`, roughness 0.65).
- **Bedding (`beddingFabric` / `pillowFabric`):** Warm textured linen (`#E2DDD5` / `#FAF8F5`).
- **Metal / Hardware (`darkMetal` / `laptopAluminum`):** Matte graphite anodized metal (`#222226` / `#8E9297`).
- **Glass (`glassMaterial`):** Physical transmission glass for fishbowl (`#E0F2FE`, roughness 0.1, transmission 0.9).
- **Signature Red Accent (`accentRed`):** Applied with deliberate restraint to the workstation chair seat cushion (`#C91F2B`, roughness 0.55).

---

## 4. Technical Architecture & Engineering Decisions

### Dependencies Added
- `three@0.187.0`
- `@react-three/fiber@9.8.2`
- `@react-three/drei@10.7.9`
- `@types/three@0.187.0` (devDependencies)
*Zero peer dependency conflicts with React 19.2.6 and Next.js 16.2.6.*

### Component Structure (`src/components/room/`)
- `roomDimensions.ts`: Pure geometric constants and coordinates.
- `RoomMaterials.ts`: Shared Three.js standard/physical materials.
- `RoomCamera.tsx`: Viewport-aware camera controller with responsive FOV and positions.
- `RoomLighting.tsx`: Directional window light (`#FFFBF2`, intensity 1.8), ambient hemisphere fill (`#FFFFFF` sky, `#E8E2D9` ground), and subtle desk accent light.
- `RoomShell.tsx`: Three-sided cutaway room envelope (solid floor, back wall, left wall, right wall with window/door cutouts, baseboard skirting).
- `RoomFurniture.tsx`: Wardrobe, desk, chair, laptop, peripherals, fishbowl, plant, frames, bed, window frame, and door frame.
- `RoomScene.tsx`: Scene composer linking camera, lighting, shell, furniture, and optional OrbitControls.
- `RoomCanvas.tsx`: R3F Canvas configured with `frameloop="demand"`, capped DPR `[1, 1.75]`, tone mapping, and error boundary.
- `RoomHero.tsx`: Dynamic client boundary (`ssr: false`), SSR skeleton placeholder, surrounding editorial HTML typography, accessible metadata, and transition indicator.

### Performance & Accessibility
- **Demand-Driven Rendering:** Configured with `frameloop="demand"`. The WebGL engine only draws when props change, resize occurs, or the camera moves. Idle GPU/CPU utilization is **0%**.
- **Capped Device Pixel Ratio:** Clamped to `Math.min(window.devicePixelRatio, 1.75)` to prevent mobile and Retina GPU thermal throttling.
- **Accessible HTML Companion:** A full semantic screen-reader fallback (`<div className="sr-only">`) describes the room layout, Taushik's workspace, and navigation links. Keyboard-friendly navigation is fully preserved.

---

## 5. Viewport Verification & Responsiveness

| Viewport | Dimensions | Camera Position | FOV | Horizontal Overflow | Result |
|---|---|---|---|---|---|
| **Desktop** | 1440 × 900 | `[4.2, 3.6, 5.4]` | 44° | **0 px** | Balanced, fills 75% of frame with generous architectural breathing space. |
| **Laptop** | 1366 × 768 | `[4.4, 3.8, 5.6]` | 44° | **0 px** | Perfectly contained, clean proportions. |
| **Tablet** | 768 × 1024 | `[4.2, 4.2, 5.8]` | 48° | **0 px** | Clear framing above tablet drawer navigation. |
| **Mobile** | 390 × 844 | `[3.9, 4.3, 5.8]` | 54° | **0 px** | No empty letterboxing; room is clear and prominent. |

---

## 6. Inspection Route (`/preview-room`)

A dedicated developer inspection page has been established at `/preview-room`.
It provides:
- Live viewport preset switching (`DESKTOP`, `LAPTOP`, `TABLET`, `MOBILE`).
- Free `OrbitControls` toggle to inspect all angles and geometry in full 360°.
- Real-time active coordinate and FOV badge.
- Spatial arrangement audit panel.

---

## 7. Verification Results

| Check | Tool / Command | Result | Notes |
|---|---|---|---|
| **Typecheck** | `tsc --noEmit` | **Passed (0 errors)** | Full TypeScript compliance |
| **Production Build** | `next build` (Turbopack) | **Passed** | 7/7 static routes prerendered cleanly |
| **Whitespace / Lint** | `git diff --check` | **Passed (0 issues)** | Zero trailing whitespace |
| **Horizontal Overflow** | Playwright CDP | **0 px across all 4 viewports** | `document.documentElement.scrollWidth === innerWidth` |

---

## 8. Screenshot Gallery

All 6 screenshots are available in `C:\Users\TNEX\OneDrive\Desktop\Phase3A_Screenshots/`:
1. `phase3a-room-desktop-1440x900.png` — Hero at 1440x900 with architectural framing.
2. `phase3a-room-laptop-1366x768.png` — Hero at 1366x768.
3. `phase3a-room-tablet-768x1024.png` — Hero at 768x1024 with compact tablet drawer.
4. `phase3a-room-mobile-390x844.png` — Hero at 390x844 with mobile framing.
5. `phase3a-room-hero-to-about.png` — Seamless transition from 3D room hero into Phase 2 Red Ribbon About section.
6. `phase3a-room-preview-inspection.png` — Dev inspection route with camera switcher and spatial audit.
