# Implementation Log

## Current Phase
Phase 3B.2 — Organic Assets, Soft Textiles & Environmental Realism (Completed & Verified)

---

## Approved Decisions & Milestones
- **2026-11-05 [Phase 1 Foundation]** — Implemented design tokens, typography scales, container system, and restrained editorial direction. (Commit: `f6a0650`)
- **2026-11-05 [Phase 1.1 Mobile Refinement]** — Added dedicated mobile typography, expandable mobile navigation, increased illustration contrast, and settled preloader animation. (Commit: `f6a0650`)
- **2026-11-05 [Phase 1.2 Tablet Navigation]** — Shifted horizontal navigation links from `sm:` (640px) to `lg:` (1024px) to transition tablet viewports (768px, 820px) to the compact pill and drawer navigation, eliminating 5px clipping with 224px breathing space. (Commit: `8f8c75a`)
- **2026-11-05 [Phase 2 Red Ribbon About Experience]** — Transformed the solid-red grid universe into a pure white background with a sculptural 3D Red Ribbon typography centerpiece. Vector text follows genuine SVG curved paths (`<textPath>`) with engraved dual-layer rendering. Modular specimen grid added alongside verified narrative and personal illustration plate. (Commit: `bc44207`, Owner Approval: 8.7/10)
- **2026-11-05 [Phase 2.1 About Polish]** — Replaced metadata label with "TAUSHIK CHANDANA // PRODUCT DESIGNER & BUILDER". Refined mobile ribbon fold at the right edge into an organic 3D continuous loop with subtle bevel and shadow, preserving composition and central negative space. (Commit: `2008658`)
- **2026-11-06 [Phase 3A 3D Room Blockout]** — Implemented normalized metric architectural interior blockout ($7.2\text{m} \times 5.4\text{m} \times 2.8\text{m}$) of Taushik's workspace. Integrated Three.js + R3F + Drei with demand-based rendering loop, responsive camera presets, dev inspection route (`/preview-room`), and accessible semantic HTML companion. (Commit: `159aa3b`, Gating: `bdb2c6b`)
- **2026-11-06 [Phase 3A.1 Room Composition & Camera Refinement]** — Refined mobile camera framing (`fov: 56°`, `pos: [2.1, 5.0, 8.4]`) achieving 100% room visibility with zero cropping. Stepped down right wall cutaway ($1.15\text{m}$ partition + $0.12\text{m}$ curb) opening sightlines to the bed and interior. Transformed window (architectural casing, cross mullions, daylight plane) and door (3-sided frame, $18^\circ$ ajar oak leaf, lever handle). Enhanced workstation (charcoal desk mat, silver laptop with screen wireframe, keyboard/mouse, fishbowl swimmer proxy, plant, wall quotes). Converted `/preview-room` to server-gated dynamic route via `ENABLE_DEV_PREVIEW`. (Commit: `c79da85`)
- **2026-11-06 [Phase 3B.1 High-Fidelity Hard-Surface Modelling]** — Upgraded room blockout to modular hard-surface furniture components (`src/components/room/models/`): 3-door wardrobe with shadow reveals and graphite handles; architectural desk with square-tube trestle legs, leveling feet, cable grommet, and stitched desk mat; Apple MacBook Pro on aluminum stand with individual QWERTY keycaps, glass trackpad, and active Retina IDE screen texture; studio ergonomic chair with 5-star wheeled base, pneumatic lift, mesh back, and signature red cushion; floating platform bed with tufted headboard, piped mattress, draped duvet, and throw blanket; architectural window with casing, mullions, birch sill, and daylight plane; architectural door swung $18^\circ$ ajar with threshold and lever handle; framed archival typography prints. In-memory procedural PBR textures for Retina IDE, wall prints, wood grain, and fabric weave. (Commit: `14c5f61`)
- **2026-11-06 [Phase 3B.2 Organic Assets, Soft Textiles & Environmental Realism]** — Replaced procedural proxies with dedicated lathe glass fishbowl, refractive water volume, aquarium flora and pebbles, detailed goldfish with bifurcated fan tail and lightweight idle swimming physics (`Fishbowl.tsx`); multi-leaf botanical desk plant in tapered ceramic pot with open soil bed plus corner floor planter (`Plant.tsx`); grounded platform bed on floor with sculpted draped linen duvet (`createDrapedDuvetGeometry`), lofted Oxford flanged pillows, and layered heavy wool throw (`Bed.tsx`); procedural PBR textures for leaf venation, wool twill weave, plaster stipple, and daylight horizon (`RoomTextures.ts`); enabled `PCFSoftShadowMap` with window daylight directional key light casting realistic contact shadows under bed, desk, and wardrobe (`RoomLighting.tsx`, `RoomCanvas.tsx`, `RoomShell.tsx`); recalibrated close-up cameras for wardrobe, bed, fishbowl, plant, and door/window (`RoomCamera.tsx`).

---

## Completed Work (Phase 3B.2 Organic Assets & Realism)
1. **Glass Fishbowl & Swimmer (`Fishbowl.tsx`):** Lathe-turned blown glass bowl with open rolled rim, physical water volume with reflective meniscus disk, aquarium river pebbles, aquatic botanical sprig, and detailed goldfish (torpedo body, pearlescent belly, dual-lobe fan caudal fin, dorsal/pectoral fins, anatomical eyes). Dynamic gliding trajectory with tangent yaw alignment and caudal flutter, paused when hidden or on reduced motion, operating within demand rendering.
2. **Botanical House Plants (`Plant.tsx`):** Workstation desk plant with matte white ceramic pot, drainage saucer, hollow rim revealing organic dark soil mix, 9 individually curved botanical leaves with midrib grooves and stems, backed by procedural leaf venation texture. Floor-standing large ceramic planter in the far corner.
3. **Soft Bed Textile Architecture (`Bed.tsx`):** Grounded platform frame directly on floor (`position[1] = 0`); sculpted $28 \times 28$ vertex mesh duvet with realistic down filling loft, rolling top folds, rounded waterfall side drapes, and organic rolled collar; 3D lofted sleeping pillows with sleep impression depressions and $25\text{mm}$ Oxford flanged border seams; layered heavy wool throw blanket with procedural twill weave.
4. **Natural Daylight & Soft Shadows (`RoomLighting.tsx`, `RoomCanvas.tsx`):** Three.js `PCFSoftShadowMap` enabled with high-res ($2048 \times 2048$) directional daylight key light streaming through the right window, casting crisp soft contact shadows under bed, wardrobe plinth, desk trestles, and chair casters. Balanced with architectural hemispheric fill and aperture rim bounce.
5. **Procedural PBR Maps (`RoomTextures.ts` & `RoomMaterials.ts`):** High-res in-memory canvas maps for botanical leaf veins, heavy wool twill, wall plaster micro-stipple, and exterior daylight horizon backdrop.
6. **Recalibrated Close-Up Inspection Cameras (`RoomCamera.tsx`):** Five dedicated inspection views (`wardrobe` wider full-door view, `bed` grounded textile view, `fishbowl` macro macro view, `plant` macro view, `doorWindow` architectural view) accessible via `/preview-room`.

---

## Files Changed
- `src/components/room/models/Fishbowl.tsx` — Lathe glass bowl, water volume, river stones, aquatic plant, detailed goldfish with swimming trajectory.
- `src/components/room/models/Plant.tsx` — Parametric curved leaf geometry, hollow ceramic pot, potting soil, 9 leaves, corner floor planter.
- `src/components/room/models/Bed.tsx` — Grounded platform frame, sculpted draped linen duvet, Oxford flanged pillows, wool throw blanket.
- `src/components/room/models/OrganicProxies.tsx` — Deleted deprecated blockout proxies.
- `src/components/room/RoomTextures.ts` — In-memory procedural maps for leaf venation, wool twill weave, plaster stipple, daylight horizon.
- `src/components/room/RoomMaterials.ts` — PBR material shaders for glass, water, river stones, fish, plant foliage, soil, and wool throw.
- `src/components/room/RoomLighting.tsx` — Directional daylight key light with $2048 \times 2048$ soft shadows, hemispheric fill, window aperture rim light.
- `src/components/room/RoomCanvas.tsx` — Enabled `shadows={{ type: THREE.PCFSoftShadowMap }}`.
- `src/components/room/RoomShell.tsx` — Enabled `receiveShadow={true}` on floor slab and walls for contact shadows.
- `src/components/room/RoomFurniture.tsx` — Modular orchestrator mounting `Fishbowl` and `Plant`.
- `src/components/room/RoomCamera.tsx` — Recalibrated inspection cameras for wardrobe, bed, fishbowl, plant, and door/window.
- `src/app/preview-room/PreviewRoomClient.tsx` — Added preset switcher buttons for `fishbowl` and `plant`.
- `src/components/room/roomDimensions.ts` — Grounded bed base to floor level (`position[1] = 0`).
- `docs/PHASE_3B_2_ORGANIC_ASSETS_REPORT.md` — Full verification report.
- `screenshots/phase-3b-2/*` — 10 high-resolution verification screenshots across 5 destinations.

---

## Verification
| Command / Check | Result | Notes |
|---|---|---|
| `tsc --noEmit` | **0 errors** | Clean types across all components |
| `next build` (Turbopack) | **Compiled successfully** | 6 static routes, 1 dynamic route (`ƒ /preview-room`) |
| `git diff --check` | **0 issues** | Zero trailing whitespace |
| Desktop (1440x900) CDP | **`overflowAmount: 0`** | Grounded bed, contact shadows, detailed fishbowl and plant |
| Workstation Close-Up CDP | **Frontal View** | Active Retina screen, glass fishbowl with swimming fish, potted plant |
| Bed Close-Up CDP | **Calibrated View** | Grounded platform, draped linen duvet, Oxford pillows, wool throw |
| Fishbowl Close-Up CDP | **Macro View** | Refractive water, river pebbles, fan tail goldfish with eyes |
| Plant Close-Up CDP | **Macro View** | Ceramic pot, dark potting soil, 9 curved leaves with visible midribs |
| Mobile (390x844) CDP | **`overflowAmount: 0`** | Complete room framed with zero horizontal overflow |
| Screenshots Saved | **10 files** | Synced to Desktop, OneDrive, techvruk, and repo folders |
