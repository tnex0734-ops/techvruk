# Technical Decision Record (Approved Baseline)

These decisions were verified and approved in `docs/ANTIGRAVITY_WORKSPACE_PREPARATION.md` following the repository audit.

## ADR-001 — Retain Next.js 16 and React 19 Architecture
**Decision:** Preserve the existing Next.js 16.2.6 (Turbopack, App Router) and React 19.2.6 application in place. Redesign visual systems and components without rebuilding or migrating frameworks.

**Reason:** The application compiles cleanly, generates static routes in 6.0s, and has zero TypeScript errors. Preserving the stack avoids duplicate deployments and protects all verified portfolio functionality.

## ADR-002 — SVG and `<textPath>` for About Ribbon Typography
**Decision:** Use inline responsive SVG `<path>` and SVG `<textPath>` elements on a white background for the flowing biography typography, backed by a semantic HTML text layer.

**Reason:** Delivers crisp vector typography at all display resolutions, native curve layout, and full screen-reader accessibility. WebGL, canvas rasterization, and baked images are strictly prohibited for the biography text.

## ADR-003 — 3D Room as an Optional Discovery Layer
**Decision:** The 3D room hero serves as an art-directed visual experience and supplementary navigation affordance. Authoritative navigation and all portfolio content remain accessible via semantic HTML controls and standard keyboard/touch navigation.

**Reason:** Guarantees universal usability, immediate accessibility, SEO visibility, and reliable fallback on devices without WebGL support.

## ADR-004 — Adopt React Three Fiber v9, Three.js, and Drei
**Decision:** Implement the 3D room environment using `@react-three/fiber` v9.8.2, `@react-three/drei` v10.7.9, and `three` v0.187.0.

**Reason:** Dependency audits and dry-run installations proved 100% clean compatibility with React 19.2.6 (0 peer conflicts, 0 errors). R3F's declarative JSX scene graph, automatic GPU memory disposal on unmount, and native pointer raycasting provide a safer, cleaner, and more maintainable architecture than imperative Three.js wrappers.

## ADR-005 — Client-Only Dynamic Import and On-Demand Rendering
**Decision:** Dynamically load the 3D canvas via `next/dynamic` (`ssr: false`) with a lightweight static room poster fallback. Configure the canvas with `<Canvas frameloop="demand">`.

**Reason:** Initial HTML renders instantly without blocking on WebGL initialization. The scene renders frames only during active camera transitions, user interactions, or explicit invalidations, drawing 0% idle GPU utilization when stationary.

## ADR-006 — Art-Directed Room Blockout
**Decision:** Build an art-directed architectural cutaway room adhering to the owner's relative spatial layout: cupboards on the left, workstation in the corner, and bed/window/door on the right. Refine detailing with reference photographs in Phase 4.

**Reason:** Accurately reflects the owner's spatial brief without fabricating unverified architectural measurements.

## ADR-007 — Consolidate Animation on Framer Motion Exclusively
**Decision:** Use `framer-motion` as the sole animation engine across the portfolio. Do not introduce GSAP. Prune the unused `"motion"` package declaration in a subsequent cleanup step.

**Reason:** All 16 existing animated components already use `framer-motion` for scroll progress, spring physics, and layout transitions. Introducing GSAP would add redundant bundle weight (~50 KB) and competing animation tickers.

## ADR-008 — Retain Audio Asset with On-Demand Loading
**Decision:** Retain `public/audio/fitoor.mp3` in the repository for the interactive navbar player. When redesigning navigation, set `audio.preload = "none"`.

**Reason:** Prevents eager buffering of 9.2 MB on initial page load, consuming 0 bytes of network bandwidth unless the user explicitly clicks the audio button. Autoplay remains strictly forbidden.

## ADR-009 — Preserve All Verified Factual Content
**Decision:** All projects, case studies, roles, achievements, awards, dates, and contact details in `src/lib/content.ts` are authoritative and must be preserved verbatim.

**Reason:** Upholds strict factual integrity. No metrics, clients, awards, or personal details may be invented or altered.
