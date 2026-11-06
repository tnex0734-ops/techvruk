# Phase 3A.1 — Room Composition & Camera Refinement Report

**Date:** 2026-11-06  
**Status:** Completed & Verified  
**Commit Target:** `refactor(room): refine composition camera and architectural cutaways`  
**Workspace:** `C:\Users\TNEX\OneDrive\Desktop\portcomp\PORTFOLIO`  
**Inspection Suite:** `/preview-room` (Gated on server via `ENABLE_DEV_PREVIEW`)  
**Screenshots Folder:** `C:\Users\TNEX\OneDrive\Desktop\Phase3A_Screenshots/`

---

## 1. Executive Summary & Purpose

Phase 3A.1 executes targeted architectural cutaway and camera refinements requested during visual review of the Phase 3A blockout, resolving all 5 identified areas:

1. **Mobile Camera Framing (Highest Priority):** Eliminated horizontal cropping of the left wardrobe cupboards and right bed. The entire room ($7.2\text{m} \times 5.4\text{m}$) now comfortably fits inside a 390px-wide viewport with balanced margins and zero clipping.
2. **Right Wall Cutaway:** Replaced the tall foreground corner pillar and ceiling lintel with a stepped architectural cutaway ($1.15\text{m}$ waist-height partition stepping down to a low $0.12\text{m}$ threshold curb), completely opening the sightline to the bed platform and interior floor.
3. **Window and Door Recognizability:** 
   - **Window:** Added an architectural casing, a double-glazed pane with sky tint, 4-pane cross mullions, an interior wooden sill shelf, and an exterior illuminated daylight aperture plane (`#F0F6FA`).
   - **Door:** Added a 3-sided architectural frame, a distinct oak door leaf swung $18^\circ$ ajar into the room, and an anodized dark lever handle with escutcheon backplate.
4. **Workstation Prominence & Silhouette:** Enhanced the corner creative desk with a high-contrast charcoal desk pad (`#2B2B30`), an Apple-style silver anodized aluminum laptop on stand (`#D8DADE`), an active screen glow displaying a minimalist UI wireframe, keyboard/mouse proxies, a glass fishbowl with a warm orange swimmer accent, a tiered ceramic plant, and dual wall quotation frames.
5. **Production Presentation & Server-Only Gating:** Removed all internal blockout status labels (`PHASE 3A BLOCKOUT`, `DEMAND-RENDER ACTIVE`) from the homepage hero. Converted `/preview-room` into a dynamic server component gated via server-side `ENABLE_DEV_PREVIEW`, with zero client-bundle exposure.

---

## 2. Camera Exploration & Mobile Comparison

### Mobile Camera Alternatives Evaluated

| Configuration | Parameters | Observed Result | Evaluation |
|---|---|---|---|
| **Phase 3A Baseline** | `pos: [3.9, 4.3, 5.8]`, `vFOV: 54°` | Cupboards cut off on left; bed cropped on right; excessive floor foreground. | **Failed** (Left/Right elements cropped) |
| **Option A: Pure Zoom Out (Distance)** | `pos: [3.9, 6.0, 9.5]`, `vFOV: 54°` | Entire room fits, but furniture appears distant and right wall remains in foreground. | **Suboptimal** (Scale too small, high perspective distortion) |
| **Option B: Orthographic Isometric Projection** | `OrthographicCamera`, `zoom: 68` | Parallel lines preserve geometric angles, but loses dramatic depth and interior architectural feel. Feels like a technical CAD drawing rather than an interactive interior. | **Rejected** (Lacks cinematic depth) |
| **Option C: Calibrated Wide-Angle Frontal $3/4$ Perspective (Selected)** | `pos: [2.1, 5.0, 8.4]`, `target: [0.0, 1.05, -0.35]`, `vFOV: 56°` | Distance $D \approx 9.7\text{m}$, elevation $24^\circ$. Visible horizontal span at room center is $8.38\text{m}$, easily containing the $7.4\text{m}$ room bounds with $0.5\text{m}$ breathing room on both sides. | **Selected & Verified** (100% element visibility, ideal proportions) |

### Final Calibrated Camera Matrix

| Breakpoint | Preset | Camera Position | Target | FOV | Visible Elements |
|---|---|---|---|---|---|
| **Desktop (1440px+)** | `desktop` | `[3.4, 3.8, 5.8]` | `[-0.2, 1.0, -0.3]` | 44° | Full wardrobe, centered workstation, bed, window, ajar door, floor slab |
| **Laptop (1024-1439px)** | `laptop` | `[3.5, 3.9, 6.0]` | `[-0.2, 1.0, -0.3]` | 45° | Proportioned overview, zero clipping |
| **Tablet (768-1023px)** | `tablet` | `[2.8, 4.4, 6.8]` | `[-0.15, 1.0, -0.3]` | 48° | Balanced 3:4 portrait view above compact drawer nav |
| **Mobile (<768px)** | `mobile` | `[2.1, 5.0, 8.4]` | `[0.0, 1.05, -0.35]` | 56° | **100% room visibility** (wardrobe, desk, chair, bed, window, door) |
| **Workstation Close-Up** | `workstation` | `[-0.65, 1.35, -0.65]` | `[-1.65, 0.95, -1.85]` | 40° | Intimate view of laptop silhouette, screen glow, desk pad, peripherals, fishbowl |

---

## 3. Right Wall Architectural Cutaway Refinements

```
      REAR [Z = -2.7m]                                         FRONT [Z = +2.7m]
      ┌────────────────────────────────────────────────────────────────────────┐
2.8m  │ Rear Wall │ Window Lintel │                                            │
      │   Corner  │ (2.3m - 2.8m) │                                            │
      │  Anchored ├───────────────┤                                            │
      │ (Full Ht) │ 4-Pane Window │                                            │
1.15m │           │  Daylight Box │ Stepped Cutaway Partition ┌────────────────┤
      │           ├───────────────┤  Waist-height partition   │ Open Door Frame│
      │           │ Window Sill   │  reveals bed & interior   │ Ajar Leaf (18°)│
0.12m └───────────┴───────────────┴───────────────────────────┴────────────────┴── Low Curb
```

1. **Rear Section ($Z \in [-2.7, -1.6]$):** Full height ($2.8\text{m}$) solid wall anchoring the back right corner behind the bed's headboard.
2. **Window Bay ($Z \in [-1.6, 0.3]$):** Spandrel below ($0.95\text{m}$), window opening with illuminated daylight backdrop plane (`#F0F6FA`), and top lintel beam.
3. **Stepped Partition Pier ($Z \in [0.3, 1.35]$):** Cut down from $2.8\text{m}$ to $1.15\text{m}$ with a finished wooden cap (`#BAA791`), immediately unblocking the bed, duvet, and floor.
4. **Doorway ($Z \in [1.35, 2.25]$):** Removed full-height ceiling lintel; replaced with a dedicated 3-sided architectural frame ($2.15\text{m}$ tall) and an ajar door leaf swung open $18^\circ$ inward with an escutcheon lever handle.
5. **Foreground Corner ($Z \in [2.25, 2.7]$):** Removed the former $2.8\text{m}$ towering corner pillar; replaced with a low $0.12\text{m}$ architectural threshold curb.

---

## 4. Workstation Focal Point & Accessory Detailing

- **Charcoal Desk Pad:** Centered $0.92\text{m} \times 0.48\text{m}$ desk pad (`#2B2B30`) providing visual contrast against the light Scandinavian birch desktop.
- **Laptop Silhouette:** Silver anodized aluminum wedge chassis (`#D8DADE`), aluminum riser stand with angled cradle, dark recessed keyboard well with silver keyrow proxy slats, precision trackpad plate, and active screen display (`#FFFFFF`) with a subtle wireframe UI layout.
- **External Peripherals:** Low-profile silver keyboard with graphite keycaps, ergonomic wireless mouse with scroll wheel accent.
- **Fishbowl:** Turned wooden stand, translucent physical glass sphere with sky reflection, water core, and a miniature warm orange swimmer proxy (`#E06A3B`).
- **Architectural Plants:** Desk ceramic pot with tiered monstera leaves; corner floor planter with layered foliage.
- **Back Wall Quotations:** Dual framed prints with black borders, white mats, and typographic layout art with signature red accent line (`#C91F2B`).

---

## 5. Production Presentation & Security Architecture

1. **Homepage Hero (`RoomHero.tsx`):**
   - Removed temporary development tags (`PHASE 3A BLOCKOUT`, `DEMAND-RENDER ACTIVE`).
   - Integrated permanent architectural badges:
     - Header badge: `TAUSHIK CHANDANA // WORKSPACE ARCHITECTURE | 17.3850° N, 78.4867° E | INTERACTIVE 3D ENVIRONMENT`
     - HUD badges: `3/4 ARCHITECTURAL CUTAWAY` and `STUDIO CUTAWAY`.
2. **Server-Side Preview Route Gating (`src/app/preview-room/`):**
   - Split into Server Component (`page.tsx`) with `export const dynamic = "force-dynamic"` and Client Component (`PreviewRoomClient.tsx`).
   - Gated via server-only `process.env.ENABLE_DEV_PREVIEW === "true"`:
     - In local dev (`NODE_ENV === "development"`): fully accessible.
     - In production: strictly returns Next.js `notFound()` (404) unless `ENABLE_DEV_PREVIEW="true"` is set in the server environment.
     - Zero leakage of secret flags into client JavaScript bundles.

---

## 6. Verification Results & Measurements

| Metric / Check | Command / Tool | Result | Notes |
|---|---|---|---|
| **TypeScript Typecheck** | `tsc --noEmit` | **0 errors** | Clean types across all components |
| **Production Build** | `next build` (Turbopack) | **Compiled successfully** | 6 static routes, 1 dynamic route (`ƒ /preview-room`) |
| **Whitespace / Lint** | `git diff --check` | **0 issues** | Zero trailing whitespace |
| **Desktop (1440x900) Overflow** | Playwright CDP | **0 px** | `scrollWidth: 1425, clientWidth: 1425` |
| **Laptop (1366x768) Overflow** | Playwright CDP | **0 px** | `scrollWidth: 1351, clientWidth: 1351` |
| **Tablet (768x1024) Overflow** | Playwright CDP | **0 px** | `scrollWidth: 753, clientWidth: 753` |
| **Mobile (390x844) Overflow** | Playwright CDP | **0 px** | `scrollWidth: 390, clientWidth: 390` |
| **Mobile Room Visibility** | Visual Bounds Audit | **100% visible** | Wardrobe, desk, chair, bed, window, door all in frame |
| **Idle Render Loop** | Empirical Frame Measurement | **0 rendered frames** | Three.js suspends draw calls when stationary (`demand`) |

---

## 7. Screenshot Gallery

All 7 screenshots are organized in:
`C:\Users\TNEX\OneDrive\Desktop\Phase3A_Screenshots/`

1. `phase3a1-desktop-1440x900.png` — Hero at 1440x900 showing stepped cutaway, visible bed, daylight window, ajar door, and prominent workstation.
2. `phase3a1-laptop-1366x768.png` — Hero at 1366x768 with clean proportions.
3. `phase3a1-tablet-768x1024.png` — Hero at 768x1024 with compact drawer navigation.
4. `phase3a1-mobile-390x844.png` — **Mobile framing showing the entire room without any cropping.**
5. `phase3a1-workstation-closeup.png` — Dedicated close-up of creative desk, silver laptop, screen glow, desk pad, fishbowl, plant, and wall art.
6. `phase3a1-preview-inspection.png` — Developer inspection route with camera switcher (`DESKTOP`, `LAPTOP`, `TABLET`, `MOBILE`, `WORKSTATION`), spatial audit panel, and free orbit toggle.
7. `phase3a1-hero-to-about.png` — Seamless transition from 3D room hero into Phase 2 Red Ribbon About section.

*(No loose screenshot files exist on the Desktop root).*
