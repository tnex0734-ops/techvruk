# Phase 0 Audit & Scene Inventory — Room Redirection

## Executive Summary
This document establishes the baseline audit and change plan for redirecting the Taushik Chandana portfolio into a **single immersive 3D bedroom experience** (the room becomes the portfolio). It inventories the current git state, package dependencies, room dimensions, coordinate system, camera presets, material pipelines, and verified content mappings.

---

## 1. Git & Environment State
- **Workspace:** `C:\Users\TNEX\OneDrive\Desktop\portcomp\PORTFOLIO`
- **Active Branch:** `redesign/portfolio-experience`
- **HEAD Commit:** `f0a1df5`
- **Working Tree:** Preserved without destructive changes; all previous phase assets remain available locally for rollback.
- **Dependencies:**
  - Next.js 16.2.6 (Turbopack)
  - React 19.2.6
  - Three.js `0.187.0`
  - React Three Fiber `^9.8.2`
  - Drei `^10.7.9`
  - Framer Motion `^13.1.0`
  - Tailwind CSS v4
- **TypeScript Check:** `npm run check` (`tsc --noEmit`) passes with 0 errors.
- **Production Build:** `npm run build` succeeds in Turbopack in 5.4s.

---

## 2. Spatial Coordinate System & Dimensions
Origin `[0, 0, 0]` is on the floor plane at the center of the room.
- **Room Width (X):** $7.2\text{m}$ ($-3.6\text{m}$ to $+3.6\text{m}$)
- **Room Depth (Z):** $5.4\text{m}$ ($-2.7\text{m}$ to $+2.7\text{m}$)
- **Room Height (Y):** $2.8\text{m}$ ($0.0\text{m}$ to $2.8\text{m}$)

### Primary Object Locations
1. **Desk (Projects Book + Phone):**
   - Position: `[-2.05, 0.72, -1.85]` ($1.60\text{m} \times 0.80\text{m}$, top at $Y=0.74\text{m}$)
   - **Projects Book target:** Center-left desk surface `[-2.05, 0.75, -1.75]`
   - **Contact Phone target:** Front-right desk surface `[-1.48, 0.75, -1.65]`
2. **Back Wall (Experience Wall Hanging):**
   - Position: `[-0.45, 1.65, -2.68]` (mounting rail on back plaster wall, clearly framed in default 3/4 cutaway)
3. **Left Cupboard (Achievement Stickers & Thread):**
   - Position: `[-3.22, 1.225, 0.70]` ($3.20\text{m}$ length along Z, $2.45\text{m}$ height along Y)
   - **Stickers surface:** Rightmost visible door face around `[-2.85, 1.45, 0.35]`
4. **Right Platform Bed (Lived-in Student Bed):**
   - Position: `[1.85, 0.0, -1.45]` ($1.65\text{m}$ width $\times 2.15\text{m}$ length)
   - Mattress height: $0.52\text{m}$, Duvet surface: $0.56\text{m}$
   - **Clutter clusters:** Study cluster (notebook, loose sheets), clothing cluster (hoodie, trousers), college backpack, and blue/cream checker throw.

---

## 3. Verified Portfolio Content Mapping

| Room Destination | Source Data Array (`src/lib/content.ts`) | Verified Count & Items |
|---|---|---|
| **Projects Book** | `aiProjects` & `uxUiProjects` | **7 Verified Projects:**<br>1. Dev Atlas<br>2. Abtalks Landing<br>3. Creonix<br>4. PrepBlitz<br>5. Nexus GG (Miro + Stitch)<br>6. Palmist.io<br>7. Equifiz |
| **Experience Wall Hanging** | `experience` | **4 Verified Roles:**<br>1. RamScript (UI/UX Intern, Jan–Feb 2026)<br>2. Acquiq (UX Designer, May–Jul 2026)<br>3. The Regiment (UI/UX Intern, Jun–Sep 2026)<br>4. UI/UX Hyderabad (Core Member, May 2026–Present) |
| **Wardrobe Stickers** | `achievements` | **4 Verified Honors with Real Certificates:**<br>1. Uxplosion 3.0 (1st Prize Champion)<br>2. CVR College Contest (1st Prize)<br>3. Signal Labs AI Hackathon (1st Prize)<br>4. SCIENT College Designathon (Quantum Leap Runner) |
| **Desk Phone & Hologram** | `contactLinks` | **Verified Contact Channels:**<br>- Email: `taushikok@gmail.com`<br>- LinkedIn: `in/taushik-chandana-16ba14378`<br>- Phone: `+91 8919237170`<br>- Location: Hyderabad, India<br>- Resume: `/Taushik_ux_resume.pdf` |

---

## 4. Visual Palette Tokens (`VISUAL_DIRECTION.md`)
- **Base Walls:** Warm plaster `#F3EEDB`
- **Paper / Pages:** Parchment `#F7F1E5`, Chalk `#FFFDF7`
- **Typography / Ink:** Deep ink `#273246`, Soft graphite `#5F5B57`
- **Textile & Accents:** Cornflower `#8CB7E5`, Pale blue `#DCEAF4`, Butter yellow `#EFCB75`, Muted coral `#DE8D7F`, Sage `#A3B29A`
- **Wood:** Natural oak `#B78352` (Desk/Bed), Warm walnut `#76513B` (Wardrobe)
- **Hologram:** Restrained pale aqua `#B9DCDD` with translucent glass depth

---

## 5. Architectural Implementation Stages
- **Phase 1:** Visual Reset, Warm Palette & Room Composition Blockout
- **Phase 2:** PBR Texturing, Woodgrain Wardrobe & Bed Clutter Dressing
- **Phase 3:** Interactive Physical Projects Book with Curved Page Turn & Rising Dossier
- **Phase 4:** Experience Wall Hanging Pinboard with Pinned Cards & Timeline
- **Phase 5:** Wardrobe Achievement Stickers with 3D Connecting Thread & Lightbox
- **Phase 6:** Desk Contact Phone & Restrained Aqua Hologram Display
- **Phase 7:** Single-Room Integration, Object Navigator & Removal of Long-Scroll Sections
- **Phase 8:** Multi-Viewport Verification, Keyboard/Touch QA & Regression

