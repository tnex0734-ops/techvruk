# Implementation Log

## Current Phase
The Room Becomes The Portfolio — Fluid Water Fill Preloader & Editorial Hero Atmosphere Verified

---

## Approved Decisions & Milestones
- **2026-11-15 [Fluid Water Fill Preloader & Hero Atmosphere Verified]** — Re-engineered the entry experience per user request with a real-time fluid simulation preloader and enriched the hero section with professional ambient edge gradients and modernist abstract geometric compositions:
  1. **Water Fill & Name Reveal Preloader (`src/components/WaterFillPreloader.tsx`):**
     * *Fluid Liquid Physics*: Real-time harmonic wave equation using dual SVG paths (`frontLiquidGrad` in radiant `#C91F2B` brand red and `backLiquidGrad` in deep crimson `#971724`) with animated phase offset and foam crest shimmer. Liquid level rises smoothly from bottom ($Y = 100\%$) to top ($Y = 0\%$) over 2.0s with rising micro-bubble particles.
     * *Monumental Name Reveal*: As the liquid floods the screen (surface elevation 100%), the monumental typographic heading **"TAUSHIK CHANDANA"** emerges with specular light gleam, radiant ripple ring, and editorial subtitle *"PRODUCT DESIGNER • CREATIVE DEVELOPER // 2026"*.
     * *Curtain Unveiling*: The fluid veil curtains upward with an undulating wave trailing edge (`exit: { y: "-100%", ease: [0.76, 0, 0.24, 1] }`), gracefully unveiling the hero section.
     * *Accessibility*: Supports instant skip via `[Space]`, `[Escape]`, "SKIP [ESC]" top button, `prefers-reduced-motion`, and `?skipPreloader=true`.
  2. **Editorial Hero Atmosphere (`src/components/hero/HeroAtmosphere.tsx`):**
     * *Atmospheric Edge Gradients*: Soft radial and linear mesh glow on left (`rgba(252, 235, 237, 0.72)`) and right (`rgba(252, 235, 237, 0.65)`) flanks, softening boundaries into warm white `#FFFEFD`.
     * *Grounding Pedestal Glow*: Soft organic elliptical shadow (`radial-gradient`) beneath the desk to ground the 3D diorama in physical space.
     * *Left Flank Bauhaus Composition*: Architectural orbital ring with red accent arc and orbiting satellite dot, isometric cube wireframe prism, `FIG. 01 // SPATIAL` and `GRID // 12-COL ISO` coordinate stamps, and translucent blush floating pill `3D INTERACTION LAB`.
     * *Right Flank Modernist Composition*: Viewfinder reticle with corner brackets, `VIEW // 34° FOV` telemetry, concentric dashed rings, stepped graphic bar array, and floating rotated diamond.
     * *Tactile Motion & Performance*: Gentle ambient float (`y: [0, -8, 0]`, 7.5–8.5s ease-in-out), strictly `pointer-events-none`, and responsive (`hidden lg:block` for dense shapes, gradients on all devices).
  3. **Verification & Delivery:**
     * `tsc --noEmit`: 0 errors.
     * `npm run build`: Turbopack production build succeeded cleanly.
     * Live server running on port 3000.
     * CDP verified across viewports: `preloader-01-water-filling.png`, `water-fill-stage-01-rising.png`, `hero-with-geometric-shapes-and-gradients.png`, `hero-with-geometric-shapes-mobile.png`.

- **2026-11-15 [Hero Section Left Rail Removal Verified]** — Cleaned up the diorama hero section per user request by removing the left vertical navigation rail:
  1. **Removed Left Vertical Rail (`TaushikHero.tsx`):**
     * Removed the absolute left `<nav>` container and its four icon buttons (`Home`, `Bookmark`, `Award`, `Smile`).
     * Cleaned up unused imports and handlers.
     * Preserved top-right social icons (`LinkedIn`, `Email`), centered greeting & descriptor, transparent diorama artwork, and bottom "SCROLL TO MY ROOM" affordance.
  2. **Multi-Viewport Verification:**
     * Verified with CDP on Desktop (1440×900), Tablet (768×1024), and Mobile (390×844): `hasNavRail: false`, `hasHomeBtn: false`.
     * Zero layout shifts; captured artifacts: `hero-without-left-icons-desktop.png`, `hero-without-left-icons-mobile.png`.
     * `tsc --noEmit`: 0 errors. Turbopack production build succeeded. Live server running at `http://localhost:3000`.

- **2026-11-15 [Phone Calibration, Single-Folio Projects Book & Certificate Images Verified]** — Resolved phone sizing and cropping per user feedback, converted Projects book to a single focused project page at a time with page flip navigation, and integrated verified certificate photos into the wardrobe honors section:
  1. **Smartphone In-Display Sizing & Calibration (`DeskPhone.tsx`, `roomInteractionTypes.ts`):**
     * *Root Cause Analysis*: Three.js group scale ($1.65\times$) multiplied quadratically with Drei `<Html transform>` `distanceFactor` and zoomed camera FOV 28, causing the device to blow up to $2214\text{px}$ and crop severely off-screen as seen in user reference (`media_1794729271559_78582061.jpg`).
     * *Geometric Calibration*: Set parent group scale to `1.0`, phone lift to $+0.18\text{m}$, tilt to $0.72\text{ rad}$, and calibrated `distanceFactor` to `0.145`. Restored camera to balanced framing `cameraPosition: [-1.25, 1.20, -1.20]`, `cameraTarget: [-1.25, 0.90, -1.70]`, `cameraFov: 34`.
     * *Result*: Rendered phone height is $530.8\text{px}$ on a $900\text{px}$ viewport ($\approx 59\%$ viewport height). Top is at $Y = 201.5\text{px}$, leaving clean vertical clearance for the glowing cyan volumetric hologram avatar above the phone. Zero cropping at top, bottom, or sides.
     * *Interactive Scrolling*: Full contact details (email copy with toast, phone/WhatsApp connect, LinkedIn, GitHub, capabilities pill stack, preferences, and return button) scroll smoothly inside the phone screen in 3D.
  2. **Single Project Folio Book (`BookPages.tsx`, `ProjectsBook.tsx`):**
     * Removed the left-hand Table of Contents index spread completely.
     * Engineered a focused, single-folio project presentation: One project displayed at a time with Playfair Display serif headline, category badge, live URL launcher, high-resolution mockup card, verified deliverables checklist with red checkmarks, and pagination controls (`< PREV PROJECT`, `01`–`07` quick jumps, `NEXT PROJECT >`).
     * Realistic 3D turning page physics preserved for transitions.
  3. **Honors & Achievements with Real Certificate Photos (`SpatialAchievementCard.tsx`):**
     * Upgraded the wardrobe honors cards to an archival 2-column showcase.
     * Left column showcases the verified certificate photo (`/achievements/uxplosion.png`, `/achievements/cvr.png`, `/achievements/signallabs.png`, `/achievements/scientclg.png`) in an archival bordered frame with "VERIFIED" badge, gold champion pill, and "VIEW FULL RESOLUTION" link.
     * Right column details host organization, honor title, date, narrative, and verified metric callouts (`30+ SCREENS COVERED`, `8+ EDGE CASES MAPPED`).
  4. **Click-Outside to Return to Entire Room Overview:**
     * Verified both in-room click outside (`onPointerMissed`, background backdrop) and ESC / "RETURN (ESC)" buttons immediately return camera to room overview.
  5. **Verification & Delivery:**
     * `tsc --noEmit`: 0 errors.
     * `npm run build`: Turbopack production build succeeded cleanly.
     * Automated Chrome DevTools Protocol suite verified all 4 experiences (`final-01-phone-calibrated.png`, `final-01b-phone-scrolled.png`, `final-02-room-overview.png`, `final-03-single-project-page1.png`, `final-04-achievements-with-images.png`).

- **2026-11-14 [Tactile Overlays Restored & Click-Outside Full Room Overview Verified]** — Rolled back in-room section overlays from the experimental hologram projector modal back to the authentic tactile/archival paper presentation, and engineered complete click-outside behavior across desktop and mobile:
  1. **Restored Previous Tactile Overlays:**
     * **Projects (`ProjectSpotlightOverlay.tsx`)**: Archival paper dossier with semi-translucent washi tape, manila folder tabs, screenshot in archival mat frame, and signature brutalist red launch button.
     * **About (`AboutSpotlightOverlay.tsx`)**: Authentic personal sketchbook spread with yellow post-it note, philosophy callout, core focus domains, and verified engineering toolkit.
     * **Experience (`ExperienceSpotlightOverlay.tsx`)**: Tactile index card pinned to the wall with realistic brass pushpin, horizontal spring swing, and verified deliverables.
     * **Achievements (`AchievementSpotlightOverlay.tsx`)**: Cream paper certificate card with top brass pin & hanging red thread motif, hackathon metrics, and vertical slide physics.
     * **Contact (`ContactSpotlightOverlay.tsx`)**: Stationery calling card with airmail diagonal border stripe, one-click copy email button, LinkedIn visit link, and phone call link.
     * **Music Cassette Deck (`MusicSpotlightOverlay.tsx`)**: Retro cassette deck HUD with rotating spools, animated red equalizer bars, and playback controls.
  2. **Click-Outside Returns to Entire Room Overview (`RoomHero.tsx`, `RoomCanvas.tsx`):**
     * Fixed `handleCloseCurrentTarget()` in `RoomHero.tsx` to unconditionally reset `setActiveTarget(null)` and `setIsBookDossierOpen(false)`.
     * Elevated all overlays to the root layout level (`z-50`) with edge-to-edge backdrop coverage. Clicking outside any card (`onClick={onClose}`) now immediately dismisses the card and glides the camera back to `overview` (`[0, 3.2, 5.8]`), revealing the entire 3D bedroom again.
     * Added `onPointerMissed` to `<Canvas>` in `RoomCanvas.tsx`, so clicking anywhere on the 3D room floor or empty space also returns the camera to the full room overview.
  3. **Verification:**
     * CDP verified on desktop (1440×900) and mobile (390×844):
       - Click on dock item opens restored tactile paper overlay.
       - Click outside content card immediately dismisses overlay and glides camera back to overview (`room-after-clicking-outside-projects.png`, `room-after-clicking-outside-about.png`, `mobile-room-after-tap-outside-390x844.png`).
     * `tsc --noEmit`: 0 errors. Turbopack production build succeeded. Live server running on port 3000.
- **2026-11-14 [Hologram Projector Showcase Across All Sections & Refined Hero Controls Verified]** — Implemented the user-requested hologram showcase aesthetic matching `media_1794641150947_d0f09146.jpg` for every section in the room, cleaned hero navigation, set single "Explore my room" CTA, and added centered scroll indicator:
  1. **Hologram Projector Showcase Architecture (`src/components/ui/HologramProjectorModal.tsx`):**
     * **Projector Base Pedestal**: Cylindrical dark metallic emitter pod at the bottom with concentric glowing neon cyan rings (`#00F0FF`) and high-intensity bright emitter core lens.
     * **Volumetric Light Beam**: Upward-expanding conical fan of light (`clip-path: polygon(42% 100%, 58% 100%, 88% 0%, 12% 0%)`, vertical ray lines, and layered cyan gradient) shooting from the base directly into the floating card.
     * **Floating Holographic HUD Card**: Luminous cyber glass display (`bg-[#050C18]/94`, `border border-[#00F0FF]/60`, `shadow-[0_0_55px_rgba(0,240,255,0.28)]`, scanline raster texture `repeating-linear-gradient(0deg, rgba(0, 240, 255, 0.035) 0px, ...)`), glowing corner brackets, pulsing cyan beacon, and frequency telemetry footer (`HOLOGRAM MATRIX // FREQ: 44.1 kHz`).
     * **100% Accessible & Responsive**: Smooth mobile touch-scrolling (`max-h-[72vh] sm:max-h-[78vh]`, `overflow-y-auto`), $\ge 44\text{px}$ touch targets, backdrop click dismissal, and keyboard `Escape` support.
  2. **Implemented Across Every Portfolio Section:**
     * **Projects (`ProjectSpotlightOverlay.tsx`)**: Replaced archival paper dossier with Hologram Projector Showcase. Features luminous quick-jump project pills (`[ 01 Dev Atlas ]`, `[ 02 Abtalks ]`, etc.), screenshot preview in laser frame, radiant cyan *"LAUNCH LIVE PROJECT ↗"* button, architecture highlights with cyan diamonds, and horizontal slide pagination.
     * **About & Toolkit (`AboutSpotlightOverlay.tsx`)**: Replaced paper sketchbook with Hologram Projector Showcase. Features core philosophy card with cyan border, focus domains, and verified engineering toolkit tags for Frontend, Product Design, and Architecture.
     * **Experience (`ExperienceSpotlightOverlay.tsx`)**: Replaced wall pinboard with Hologram Projector Showcase. Features organization log jump strip, role & timeline metadata, domain focus, and verified deliverables with cyan bullet markers.
     * **Honors & Awards (`AchievementSpotlightOverlay.tsx`)**: Replaced wardrobe sticker card with Hologram Projector Showcase. Features honors jump strip, hackathon certificate preview, key metrics grid (`30+ SCREENS COVERED`, `8+ EDGE CASES MAPPED`), and vertical slide navigation.
     * **Contact (`ContactSpotlightOverlay.tsx`)**: Replaced stationery calling card with Hologram Projector Showcase. Features one-click copy email button with success toast (`taushikok@gmail.com`), direct LinkedIn profile launch, phone/WhatsApp call link, and location.
     * **Music Cassette Deck (`MusicSpotlightOverlay.tsx`)**: Integrated with Hologram Projector Showcase. Features real-time animated equalizer spectrum bars, spinning cassette hub, playback progress bar, and play/pause controls.
  3. **Cleaned Hero Navigation & Centered Scroll Affordance (`HeroNav.tsx`, `HeroIntro.tsx`, `HeroScrollCue.tsx`):**
     * Removed all top navigation links (`Work`, `About`, `Contact`), preserving the clean `TAUSHIK CHANDANA •` wordmark on the left and `PORTFOLIO // 2026` tag on the right.
     * Replaced two-button CTA row with a single prominent red pill CTA: **"Explore my room"** (removed "View résumé").
     * Centered the bottom scroll affordance with **"SCROLL TO EXPLORE ROOM"** and an animated downward arrow pointing below into the 3D bedroom.
  4. **Multi-Viewport Browser Verification:**
     * Verified with CDP on Desktop (1440×900) and Mobile (390×844):
       - Hero with no nav links, single "Explore my room" CTA, and centered scroll cue (`hero-verified-desktop-1440x900.png`, `hero-verified-mobile-390x844.png`).
       - Hologram Projector modal popups verified for Projects, About, Experience, Achievements, Contact, and Music (`hologram-projects-desktop.png`, `hologram-about-desktop.png`, `hologram-experience-desktop.png`, `hologram-achievements-desktop.png`, `hologram-contact-desktop.png`, `hologram-music-desktop.png`, `mobile-hologram-projects-390x844.png`, `mobile-hologram-contact-390x844.png`).
     * `tsc --noEmit`: 0 errors. Turbopack production build succeeded. Server running on port 3000.
- **2026-11-14 [Taushik Sketchbook Mascot Hero Redesign Verified]** — Rebuilt hero section from the supplied reference composition (`references/hero-layout-preview.jpg`) fitting the portfolio's authentic WHITE + RED brand system:
  1. **Visual Composition & Modular Hierarchy (`src/components/hero/`):**
     * **Quiet Top Navigation (`HeroNav.tsx`)**: Header (64–80px) with `TAUSHIK CHANDANA` wordmark, signature `#C91F2B` dot, and `WORK`, `ABOUT`, `CONTACT` links. Single-line responsive display from 375px mobile up to 4K ultra-wide.
     * **Editorial Intro (`HeroIntro.tsx`)**: Left column (~44% desktop). Bold display headline: *"Hello! I'm Taushik Chandana."* (with *"Taushik Chandana."* in `#C91F2B`), subhead *"Product designer & creative developer"*, and factual summary.
     * **Two Practical CTAs**: Primary solid red pill *"Explore my work"* (smooth scroll to 3D room) and secondary outline pill *"View résumé"* (verified link to `/resume.pdf`).
     * **Mascot Artwork & Open Sketchbook (`HeroMascotComposition.tsx`)**: Right column (~56% desktop). Features `/hero/taushik-sketchbook-mascot.webp` (1315×1196, 276KB) with `priority`, responsive `sizes`, and contain framing over a soft organic blush card (`#FFF3F2`, `rounded-[64px]`). Includes 4 purposeful red hand-drawn SVG doodles (`red-scribble-loop.svg`, `accent-rays.svg`, red accent dot, `sparkle.svg`). Bounded subtle mouse parallax ($\le 4\text{px}$) for desktop hover only.
     * **Bottom Scroll Cue (`HeroScrollCue.tsx`)**: Editorial *"SCROLL TO EXPLORE THE ROOM"* label with circular down arrow button.
  2. **Reversible Scroll Transition (`HeroScrollContainer.tsx`):**
     * Native browser scroll handoff into the 3D room. Hero fades and translates subtly upward as user scrolls into the room; reverses naturally upon upward scroll.
     * Pointer events released immediately on scroll ($\ge 0.2$), guaranteeing zero click interception on in-room interactive objects.
  3. **Multi-Viewport QA & Verification:**
     * Verified with CDP across 1440×900, 1366×768, 1024×768, 768×1024, 390×844, and 375×667 viewports:
       - Mascot, open sketchbook wireframes, character hands, and shoes 100% visible with zero cropping.
       - Zero horizontal overflow (`scrollWidth <= clientWidth` across all widths).
       - Both CTAs and nav links functional.
       - Captured screenshots saved in `screenshots/hero-red-white/`.
     * `tsc --noEmit`: 0 errors. Turbopack production build succeeded. Live server running at `http://localhost:3000`.

- **2026-11-13 [Label Clickability, Solid Wax Pins & Smooth Performance Optimization Verified]** — Resolved hotspot unclickability, removed blinking effects, and restored butter-smooth performance:
  1. **Hotspot Clickability & Pointer Events Interception Fixed (`HeroScrollContainer.tsx`, `RoomHotspot.tsx`):**
     * *Root Cause 1*: The sticky MascotHero container (`z-20`) was previously maintaining `pointerEvents: "auto"` across the full screen while scrolling into the room ($0.65 < \text{scrollExitProgress} < 0.95$), intercepting all mouse clicks before they could reach `RoomHero` ($z-10$).
     * *Fix 1*: Updated `HeroScrollContainer.tsx` so `RoomHero` always has `pointerEvents: "auto"`. The sticky `MascotHero` now releases pointer events (`pointerEvents: "none"`) immediately when scrolling starts ($\ge 0.2$), and applies `visibility: "hidden"` when scrolled away ($\ge 0.7$).
     * *Root Cause 2*: In Three.js, meshes with `visible={false}` are strictly ignored by the Raycaster.
     * *Fix 2*: Replaced `visible={false}` on the generous 3D raycast target with `transparent opacity={0} depthWrite={false}`, enabling instant 3D raycast hits on all objects.
     * *Fix 3*: Added dual `onPointerDown`, `onClick`, and `onTouchEnd` event listeners to `<button>` inside Drei's `<Html>` and raised `zIndexRange` to `[90, 15]`, ensuring instant 0ms event dispatch on desktop clicks and mobile touches alike.
  2. **Eliminated Blinking / Pulsing Effects (`RoomHotspot.tsx`):**
     * Removed `animate-ping` from the beacon dots.
     * Replaced with a steady, calm, solid red wax pin indicator dot (`bg-[#E52424] h-2 w-2 rounded-full shrink-0`) for clean and stable visual appeal.
  3. **High-Performance Smoothness Optimization (`Fishbowl.tsx`, `RoomHotspot.tsx`, `BadmintonPreloader.tsx`):**
     * *Root Cause 3*: `Fishbowl.tsx` was executing an unthrottled `useFrame` that called `invalidate()` every frame (60–120 FPS) indefinitely, preventing the scene from ever reaching 0 FPS idle.
     * *Fix 4*: Guarded `Fishbowl.tsx` swimming animation so it only runs and invalidates when excited/hovered, cleanly settling to rest and zero render calls when idle.
     * *Fix 5*: Removed `backdrop-blur-md` from all 6 in-room hotspot labels, avoiding 6 separate full-screen GPU Gaussian blur passes per frame over the WebGL canvas.
     * *Fix 6*: Upgraded `BadmintonPreloader.tsx` interval from `setInterval(16ms)` to synchronized `requestAnimationFrame(tick)` with cancel cleanup.
  4. **CDP Clickability & Visual Verification:**
     * Verified all 6 hotspot triggers (`hotspot-trigger-book`, `about`, `wall`, `wardrobe`, `phone`, `music`) present and interactive in live DOM.
     * Programmatic click on `[data-testid="hotspot-trigger-book"]` successfully actuated camera zoom and mounted open book spread with `OPEN PROJECT DOSSIER` controls (`clicked-book-label-verified.png`).
     * Programmatic click on `[data-testid="hotspot-trigger-music"]` successfully actuated close-up zoom and mounted cassette player HUD (`clicked-music-label-verified.png`).
     * `tsc --noEmit`: 0 errors.
     * Turbopack production build succeeded; live daemon running on port 3000.

- **2026-11-13 [Room Spatial Reorganization, Outfit Typography & Interactive Music Experience Verified]** — Resolved all label crowding, spaced out room furniture, upgraded label typography, and added a first-class music listening experience:
  1. **Spatial Distribution & Bedside Table (`models/BedsideTable.tsx`):**
     * Introduced a Scandinavian white-oak nightstand beside the bed ($X = 0.85\text{m}$) with solid oak top, bone-matte drawer, turned brass hardware, tapered legs with brass ferrules, and a warm ceramic coffee mug.
     * Relocated the `AboutNotebook` from the desk onto the bedside nightstand, clearing the desk and distributing objects across the entire 7.2m room width.
     * Spaced desk workstation items: `ProjectsBook` at $X = -2.05\text{m}$, `DeskPhone` at $X = -1.25\text{m}$, `ExperienceWall` centered at $X = -0.55\text{m}$, `RetroCassettePlayer` at $X = 0.28\text{m}$, `BedsideTable` at $X = 0.85\text{m}$, and `Bed` at $X = 1.85\text{m}$.
  2. **Outfit Sans-Serif Typography & Non-Colliding Labels (`RoomHotspot.tsx`):**
     * Replaced monospace typography with spacious modern `Outfit` sans-serif (`var(--font-outfit), Outfit, -apple-system, sans-serif`).
     * Calibrated 3D label offsets in distinct spatial quadrants so labels do not overlap on desktop or mobile:
       - `[4] Hackathon Honors`: High-left on wardrobe door ($Y = 2.05\text{m}$).
       - `[1] Selected Projects`: Mid-left shifted UP and LEFT above desk book ($Y = 1.29\text{m}$).
       - `[5] Desk Phone // Contact`: Low-left shifted DOWN and RIGHT on desk phone ($Y = 0.97\text{m}$).
       - `[3] Experience Wall`: Top-center on wall hanging ($Y = 2.25\text{m}$).
       - `[♪] Listen to a song`: Mid-right mounted above cassette deck ($Y = 1.70\text{m}$).
       - `[2] About Taushik`: Low-right on bedside table ($Y = 0.785\text{m}$).
  3. **First-Class Interactive Music Experience (`RetroCassettePlayer.tsx`, `MusicSpotlightOverlay.tsx`):**
     * Added `"music"` as a first-class `RoomInteractionTarget`.
     * Clicking the `[♪] Listen to a song` hotspot or pressing `6` / `M` pivots camera to focused closeup ($Z = -1.95\text{m}$) directly in front of the wall cassette deck.
     * Real-time rotating spools ($2.4\text{ rad/s}$) on the cassette deck during playback with active crimson LED indicator.
     * Tactile paper HUD overlay featuring track metadata ("Fitoor" by Arijit Singh & Amit Trivedi), real-time animated equalizer bars, progress scrubber, Play/Pause toggle ([Spacebar]), continuous ambient audio note, and "RETURN TO ROOM (ESC)".
     * Dock integration with 7th audio item and direct keyboard shortcut.
  4. **Verification & Testing:**
     * `tsc --noEmit`: 0 errors.
     * `npm run build`: Production Turbopack build succeeded.
     * Production server verified on `http://localhost:3000`.
     * Captured and verified screenshots:
       - `spacious-room-desktop-1440x900.png`
       - `spacious-room-mobile-390x844.png`
       - `music-experience-desktop-1440x900.png`
       - `music-experience-mobile-390x844.png`

- **2026-11-13 [Mobile Room Responsiveness & Dynamic Aspect-Ratio Framing Verified]** — Resolved complete room visibility on mobile viewports:
  1. **Dynamic Aspect-Ratio Adaptive Camera Framing (`RoomCamera.tsx`):**
     * Solved Three.js portrait vertical FOV truncation where narrow mobile viewports ($W/H \approx 0.46 - 0.56$) previously cropped out the left wardrobe and right bed.
     * Engineered dynamic calculation based on viewport aspect ratio: computes exact camera distance along normalized 3/4 isometric vector to guarantee the entire 7.2m room width ($X: -3.6$ to $+3.6$) is 100% visible with comfortable 1m breathing margins on any device.
     * Adaptive distance multiplier for focused object closeups: dynamically scales camera distance by $1 / \text{aspect}$ so the open hardcover Projects Book ($0.56\text{m}$ spread), Experience Wall Hanging, and Wardrobe Stickers fit fully within the phone screen without horizontal clipping.
  2. **Uncrowded Mobile Tactile Hotspots (`RoomHotspot.tsx`):**
     * Re-calibrated 3D world-space offsets across distinct vertical and horizontal quadrants:
       - `[4] Awards`: Elevated high on the wardrobe upper door panel ($Y = 2.15$), completely clear of desk furniture.
       - `[3] Experience`: High on the back wall pinboard ($Y = 2.23$).
       - `[2] About`: Mid-level above workstation screens ($Y = 1.39$).
       - `[1] Projects`: Lower front-left near desk edge ($Y = 1.09$).
       - `[5] Contact`: Lower front-right near desk phone ($Y = 1.06$).
     * Concise mobile action labels: `[1] Projects ↗`, `[2] About ↗`, `[3] Experience ↗`, `[4] Awards ↗`, `[5] Contact ↗`.
     * Responsive distance factor scaling ($12.0$ on mobile, $6.8$ on desktop) ensuring crisp, legible paper tags with zero collision.
  3. **Responsive Modal Containers:**
     * Enforced `max-h-[88vh] overflow-y-auto` across all spotlight overlays (`ProjectSpotlightOverlay.tsx`, `ExperienceSpotlightOverlay.tsx`, `AchievementSpotlightOverlay.tsx`, `AboutSpotlightOverlay.tsx`, `ContactSpotlightOverlay.tsx`) ensuring zero content clipping on small screens.
  4. **Multi-Device CDP Verification:**
     * Verified at 390×844 (iPhone 14/15/16), 375×667 (iPhone SE), and 1440×900 (Desktop):
       - Entire room is 100% visible from left wardrobe to right bed and door threshold.
       - Open Projects Book top reading view is completely framed without clipping.
       - Zero TypeScript errors (`tsc --noEmit`), Next.js Turbopack build passed, and 0 FPS idle on-demand rendering preserved.

- **2026-11-13 [The Room Becomes The Portfolio — Complete Single-Room Redirection Verified]** — Fulfilled all requirements of `PORTFOLIO_ROOM_REDIRECTION_KIT/ANTIGRAVITY_MASTER_PROMPT.md`:
  1. **Legacy Multi-Section Scrolling Retired**: Main portfolio operates as a unified 3D creative bedroom. All portfolio data is mapped directly to physical in-room objects.
  2. **Projects Book on Desk**: Hardcover buckram book with 180° flat open spread, high-DPI Table of Contents, verified project spreads, and rising tactile paper dossier (`ProjectSpotlightOverlay.tsx`) with washi tape strip, live links, and spring slide physics.
  3. **Experience Wall Hanging**: Fabric/corkboard archive mounted on wall with wooden hanging rails, verified career roles, and tactile pin-pivot horizontal swing physics (`ExperienceSpotlightOverlay.tsx`).
  4. **Achievement Stickers on Wardrobe**: Solid walnut wardrobe with 3D thread curve linking die-cut achievement pins, verified hackathon trophies, and vertical slide physics (`AchievementSpotlightOverlay.tsx`).
  5. **Desk Phone & Hologram**: Luminous pale aqua spatial hologram and tactile stationery calling card with verified email copy, mailto, and LinkedIn profile. (Eliminated false availability / response-time claims).
  6. **Lived-In Bed & Storytelling**: Composed student mess (hoodie, backpack, open assignments, stationery) with cornflower blue checker throw blanket. Accompanied by wall-mounted crossed badminton rackets and rotating retro cassette deck.
  7. **Tactile Scrapbook Visual Language**: Warm plaster (`#F3EEDB`), parchment (`#F7F1E5`), chalk (`#FFFDF7`), walnut (`#76513B`), oak (`#B78352`), cornflower blue (`#8CB7E5`), butter yellow (`#EFCB75`), and deep ink (`#273246`).
  8. **Performance & Reliability**: Zero TypeScript compilation errors (`tsc --noEmit`), Next.js Turbopack production build verified, and on-demand rendering (`frameloop="demand"`, 0 FPS idle).
- **2026-11-13 [Taushik Mascot Editorial Hero + Shader-Driven Pixel-to-Room Reveal]** — Implemented high-craft editorial opening hero and seamless scroll transition into the 3D bedroom scene:
  1. **Editorial Composition & Real HTML/CSS Typography (`MascotHero.tsx`):**
     * Faithfully reproduced visual art direction from `references/taushik-portfolio-hero-reference.png`:
       - Warm pale blush background (`#FFF7F6`) paired with confident signature red (`#EF2628`) and near-black text (`#171719`).
       - Top rail: `TAUSHIK CHANDANA •`, red hairline rule, and `• 2026` with corner brackets.
       - Huge two-line split display wordmark (`PO/FO` on left, `RT/LIO.` on right) framing the central mascot.
       - Background red graphic card accent, starburst sparks, and `TAUSHIK ★` pill sticker with red offset shadow.
       - Centered `SCROLL TO ENTER MY ROOM ↓` action button.
       - Responsive layout adapting to stacked portrait layout (`PORT` on top, mascot in center, `FOLIO.` on bottom) on tablet (<1024px) and mobile (<768px).
  2. **Shader-Based Pixel Dissolve (`MascotPixelShader.tsx`, `MascotCanvas.tsx`):**
     * Fragment shader on a single plane mesh with zero DOM particle overhead.
     * Samples cropped transparent WebP asset (`/mascot/taushik-mascot-fullbody.webp`) with clean alpha and deterministic noise texture (`/mascot/pixel-dissolve-noise-256.png`).
     * Initial 1.2s cubic ease-out pixel assembly from coarse blocks (20px) to fine (360px) to pristine settled quality ($uSettled = 1.0$).
     * Pointer-reactive 2.5D tilt within ±2.5° for tactile depth.
     * Bounded `dpr={[1, 1.5]}` and `frameloop="demand"` (0 FPS idle at rest; `frameloop="never"` when user enters room).
     * Instant fallback for `prefers-reduced-motion` and non-WebGL environments.
  3. **Scroll-to-Room Choreography (`HeroScrollContainer.tsx`):**
     * As user scrolls down ($15\% \to 75\%$), mascot coarsens into pixel blocks and dissolves away while typography translates upward and fades out.
     * 3D bedroom scene smoothly ascends into full interactive view.
     * Reverse scroll cleanly restores the mascot hero without flash or state snapping.
     * Brand wordmark `Taushik / UX` in navbar provides 1-click smooth return to mascot hero from room overview.
  4. **Multi-Viewport & Interaction Verification:**
     * Verified across 1440×900, 1366×768, 1024×768, 768×1024, 390×844, and 375×667 viewports.
     * Zero room regressions: all 5 interactive objects (Projects Book, Sketchbook, Wall, Cupboard, Desk Phone), badminton rackets, and cassette player operate smoothly.
     * Performance verified: JS Heap at 24.15 MB (baseline 19.07 MB), well within budget.
- **2026-11-12 [Badminton Smash Loading Preloader, 3D Wall Badminton Rackets & Retro Cassette Deck]** — Engineered custom loading choreography, athletic wall storytelling, and synchronized 3D retro music deck:
  1. **Badminton Smash & Parabolic Arc Loading Preloader (`BadmintonPreloader.tsx`):**
     * **Racket Smash**: Vector badminton racket on the left winds up and smashes the feathered shuttlecock with an energetic kinetic impact shockwave ring in `#E52424` red.
     * **Aerodynamic Parabolic Trajectory**: The shuttlecock flies across the screen from left to right along a mathematical parabolic arc ($x(t), y(t)$ with continuous tangent rotation $\operatorname{atan2}(v_y, v_x)$ so the cork base always leads the flight path).
     * **Sequential "TAUSHIK" Letter Reveal**: As the shuttlecock arcs over each letter station (`T - A - U - S - H - I - K`), each letter pops into bold black typography (`font-sans font-black text-neutral-950`) with an active red underbar line and micro-burst impact ring.
     * **Resolution & Room Unveil**: Full name `TAUSHIK` and subtitle `PRODUCT DESIGNER & CREATIVE DEVELOPER` are presented with 100% progress, followed by a smooth upward curtain wipe revealing the 3D bedroom hero.
     * **Accessibility & Bypass**: Includes `[SKIP (SPACE)]` button, Escape/Space key listeners, and query parameter bypass (`?skipPreloader=true`).
  2. **Wall-Mounted 3D Badminton Rackets & Shuttlecock (`BadmintonRackets.tsx`):**
     * Two crossed professional graphite rackets mounted on a minimalist turned birch peg on the back wall ($X = 0.58\text{m}$, $Y = 1.95\text{m}$, $Z = -2.675\text{m}$).
     * Features isometric carbon hoop frames with signature red/white racing decals, high-tension nylon string beds, molded T-joints, slim shafts with silver rings, and spiral-wrapped polyurethane cushion grip handles.
     * Miniature wooden wall shelf displaying a feathered shuttlecock with natural cork dome and 16 goose feathers.
  3. **3D Wall Retro Cassette Player & Synchronized Audio (`RetroCassettePlayer.tsx`, `RoomHero.tsx`, `Version1Navbar.tsx`):**
     * Vintage 1980s Dieter Rams-inspired wall-mounted cassette player ($X = 0.58\text{m}$, $Y = 1.35\text{m}$, $Z = -2.675\text{m}$) with warm bone resin casing, brushed faceplate, top piano-key buttons, and smoked acrylic door window.
     * "FITOOR • SIDE A" cassette tape inside featuring **two toothed tape spools that rotate in real-time** whenever music is playing (`useFrame` delta loop).
     * Glowing crimson status LED indicator and point light illuminating the playback head.
     * Readable in-room paper callout label: `[♪] CASSETTE DECK // FITOOR • CLICK TO PLAY/PAUSE`.
     * Clicking either the 3D cassette deck or the top navbar "Play song" button toggles playback in 100% synchronized state.
  4. **Verification & Testing:**
     * Zero TypeScript errors (`tsc --noEmit`), successful Turbopack production build.
     * Automated Chrome CDP test suite verified captures:
       - `badminton-01-preloader-smash.png`: Badminton racket smash, shockwave burst, and letter `T` activation.
       - `badminton-02-preloader-mid-arc-letters.png`: Parabolic flight with red trajectory arc trailing the shuttlecock.
       - `badminton-04-room-wall-rackets-and-cassette.png`: 3D room overview showing crossed badminton rackets and retro cassette deck mounted on the back wall.
       - `badminton-05-cassette-playing-fitoor.png`: Playing state with active music deck.
- **2026-11-11 [Tactile Paper-Style UI, Uncrowded In-Room Labels, High-DPI Book & Fun Desk Props]** — Delivered comprehensive UI and spatial refinement based on direct visual feedback, replacing dark neon cyberpunk styling with tactile archival paper cards, uncrowding in-scene labels, rendering high-contrast 2048x1536 book textures, and adding fun lived-in props:
  1. **Uncrowded In-Scene Paper Tag Labels (`RoomHotspot.tsx`):**
     * Eliminated label collision and crowding across desk objects by spreading 3D offsets generously:
       - Book: `[-0.26, 0.48, 0.16]` (elevated to $Y=1.224$, pushed left to $X=-2.58$)
       - Personal Sketchbook: `[0.0, 0.84, -0.16]` (elevated to $Y=1.584$)
       - Desk Phone: `[0.28, 0.38, 0.18]` (pushed right to $X=-0.97$)
       - Wardrobe: `[0.15, 0.52, 0.0]`
       - Experience Wall: `[0.0, 0.52, 0.08]`
     * Restyled tags with warm off-white archival paper styling (`#FCFAF7`), `#E2DBD1` hairline border, signature `#E52424` pin dot, numeric keys `[1]–[5]`, and subtle leader pin lines.
  2. **Intimate High-DPI 3D Book Experience (`roomInteractionTypes.ts`, `BookPageTextures.ts`, `BookPages.tsx`):**
     * Calibrated camera to an intimate top-down reading view (`cameraPosition: [-2.32, 1.44, -1.62]`, `FOV: 32°`), bringing the open book to fill ~80% of the viewport.
     * Upgraded procedural canvas textures from 1024x768 to 2048x1536 high-DPI with `anisotropy = 16`, rendering crisp typography on both Table of Contents and Project Spread.
     * Recalibrated Table of Contents UV raycast click coordinates (`(pixelY - 340) / 130`) to precisely match 1536px height for 1-click page jumping.
  3. **Tactile Archival Paper-Style UI Overlays:**
     * Converted all 5 detail overlays from dark HUDs to warm, physical paper cards:
       - `ProjectSpotlightOverlay.tsx`: Archival project dossier with Manila paper tabs, washi tape, 2-column layout, and signature brutalist red CTA button.
       - `AchievementSpotlightOverlay.tsx`: Cream parchment certificate card with brass pin, red thread, and gold honors seal.
       - `ExperienceSpotlightOverlay.tsx`: Pinned paper index card with brass pushpin, date, role, and deliverables.
       - `AboutSpotlightOverlay.tsx`: Editorial sketchbook spread with yellow Post-It note ("Obsessed with tactile micro-interactions...") and engineering toolkit.
       - `ContactSpotlightOverlay.tsx`: Stationery calling card with airmail diagonal stripes, 1-click email copy, phone call, and LinkedIn link.
  4. **Fun Lived-In Desk Props (`Desk.tsx`):**
     * Added ceramic coffee mug with espresso rim.
     * Added layered pastel sticky notes (yellow and coral) on the desk surface.
     * Added tactile Polaroid snapshot photo taped with washi tape.
     * Added minimalist matte black drafting stylus with brass accent ring.
  5. **Verification & Testing:**
     * Zero TypeScript errors (`npm run check`), successful Next.js Turbopack production build.
     * Restarted production daemon on port 3000 (`task-7970`).
     * Automated Chrome test suite verified 7 full-resolution captures:
       - `paper-01-room-overview-clean-labels.png`: Uncrowded paper labels and fun desk props.
       - `paper-02-book-top-view-readable.png`: Intimate top-down 3D book reading view.
       - `paper-03-project-dossier-paper-style.png`: Archival paper project dossier.
       - `paper-04-experience-pinned-card.png`: Tactile pinned paper index card.
       - `paper-05-honors-certificate-card.png`: Cream parchment certificate card.
       - `paper-06-about-sketchbook-note.png`: Editorial sketchbook spread with yellow Post-It note.
       - `paper-07-contact-stationery-card.png`: Stationery calling card.
- **2026-11-10 [Version 1 GitHub Top Navbar Integration & Scope Conformance]** — Restored and integrated the authentic **Version 1 Top Navigation Bar** from the original GitHub repository (`16cb1bb`) into the 3D room hero:
  1. **Authentic Version 1 Layout & Visual Identity (`Version1Navbar.tsx`, `RoomHero.tsx`):**
     * **Brand Wordmark (Left)**: Bold, tight `Taushik / UX` with signature red slash (`#e52424`), with subtitle `Product Designer & Creative Developer` and one-click return to full room overview.
     * **In-Room Navigation Destinations (Center)**: Seamlessly connects the original top nav (`Work`, `About`, `Experience`, `Honors`, `Contact`) directly to in-room 3D objects (`book`, `about`, `wall`, `wardrobe`, `phone`), featuring active indicator dot, underline, and `subtle-link` hover interaction.
     * **Right Action Group**:
       - Stoppable "Play a song" / "Fitoor" audio player toggle (`/audio/fitoor.mp3`) with live equalizer waveform animation and loop.
       - Signature **Red Brutalist Resume Button**: `border-2 border-[var(--color-ink)] bg-[#e52424] text-white font-black uppercase text-xs shadow-[2px_2px_0_#220608]` with `<Download size={13} />` icon, triggering direct download of `/Taushik_ux_resume.pdf`.
       - Circular **Mail Icon Button**: `<Mail size={16} />` linking to `mailto:taushikok@gmail.com`.
       - Focused Object Mode: Displays `RETURN (ESC)` button (`<RotateCcw size={12} />`) to quickly glide back to room overview.
     * **Responsive Mobile Drawer**: Collapses to circular hamburger toggle (`<Menu size={16} />` / `<X size={16} />`) on mobile screens, revealing a smooth AnimatePresence dropdown with destination keys and audio/resume actions.
  2. **Architectural Layout Integration**:
     * Positioned edge-to-edge across the top with `w-full border-b border-[var(--color-border)] bg-white/95 backdrop-blur-md` and standard `section-shell` container max-width.
     * 3D room canvas fills the full remainder of the viewport below the navbar (`flex-1 min-h-0`) inside rounded architectural borders.
  3. **Verification**:
     * TypeScript compilation: `npm run check` (`tsc --noEmit`) completed with 0 errors.
     * Production build: Next.js Turbopack optimized build succeeded in 5.4s + 903ms static pages.
     * Automated Chrome CDP suite verified 7 full-resolution captures:
       - `nav-v1-01-room-overview.png`: Top Version 1 navbar with brand, nav links, audio player, resume button, mail button, and bedroom overview.
       - `nav-v1-02-click-work-book.png`: Clicking `Work` transitions smoothly to top-down 3D book, shows active indicator and `RETURN (ESC)` button.
       - `nav-v1-03-click-experience-wall.png`: Clicking `Experience` focuses on wall hanging.
       - `nav-v1-04-click-contact-phone.png`: Clicking `Contact` focuses on desk phone hologram.
       - `nav-v1-05-return-to-room.png`: Clicking `RETURN (ESC)` glides back to room overview.
       - `nav-v1-06-mobile-drawer.png`: Mobile hamburger drawer with touch destinations and quick actions.
       - `nav-v1-07-book-with-hologram-card.png`: Wide holographic project card open over book under the Version 1 navbar.
- **2026-11-08 [Phase 9.3 Hologram Detail Showcases, Intact 3D Book & Small In-Room Click Affordance Labels]** — Completed comprehensive creative direction rework resolving book geometry, detail showcase presentation, and object discoverability:
  1. **Luminous Holographic Showcase Effect (`ProjectSpotlightOverlay.tsx`, `ContactSpotlightOverlay.tsx`, `ExperienceSpotlightOverlay.tsx`, `AchievementSpotlightOverlay.tsx`, `AboutSpotlightOverlay.tsx`):**
     * Applied an authentic holographic HUD aesthetic: semi-transparent glassmorphic panels with cyan/aqua/gold laser scanlines (`bg-neutral-950/92 backdrop-blur-2xl border border-cyan-400/40 shadow-[0_0_60px_rgba(56,189,248,0.22)]`).
     * Added glowing corner HUD brackets `[ + ]` at all four corners with technical telemetry readouts (`HOLOGRAPHIC ARCHIVE // PROJECTION ACTIVE`).
     * Added a horizontal quick-jump project switcher strip (`[ 01 Dev Atlas ]  [ 02 Abtalks ]  [ 03 Creonix ] ...`) allowing single-click navigation across all 7 projects.
     * Preserved 100% verified factual integrity and ensured all project links are standard accessible semantic HTML `<a>` tags with `target="_blank" rel="noopener noreferrer"`, $\ge 44\text{px}$ touch targets, and high-contrast glowing action buttons (`LAUNCH LIVE PROJECT ↗`).
  2. **100% Intact 3D Physical Book on Desk (`ProjectsBook.tsx`, `BookPages.tsx`, `BookPageTextures.ts`):**
     * Fixed book geometry and alignment: symmetrical left and right hardcover buckram casing boards resting flat on the desk with center spine hinge strip and dark gutter crease.
     * Symmetrical thick archival paper page blocks underneath both pages with realistic deckled paper edge material.
     * Integrated a **Volumetric Hologram Emitter Ring & Light Cone** centered on the book spine, casting subtle cyan laser beams upward from the open book into the floating detail card.
     * Left Page: Crisp, high-contrast Table of Contents with active marker and clear indicator note `✦ [ CLICK ANY PROJECT ROW TO SWITCH PAGE ]`.
     * Right Page: Crisp project folio spread with verified details, tags, interface mockup, and red callout `➔ [ ✦ CLICK TO OPEN HOLOGRAPHIC 3D DOSSIER ]`.
     * Cleaned up page turn transitions with a guaranteed safety timeout (380ms) and unmounted leaf state, eliminating frozen cylinder geometry.
  3. **Small In-Room Callout Labels Indicating Where Users Should Click (`RoomHotspot.tsx`):**
     * Replaced hover-only affordances in room overview (`activeTarget === null`) with small, elegant, permanent floating labels hovering directly above each of the 5 interactive objects:
       - `[ 1 ] ✦ PROJECTS BOOK • CLICK ↗`
       - `[ 2 ] ✦ SKETCHBOOK • CLICK ↗`
       - `[ 3 ] ✦ EXPERIENCE WALL • CLICK ↗`
       - `[ 4 ] ✦ HONORS & STICKERS • CLICK ↗`
       - `[ 5 ] ✦ DESK PHONE • CLICK ↗`
     * Staggered in 3D world space to guarantee zero label overlap from the default 3/4 camera viewpoint.
     * Features pulsing cyan/gold indicator beacons, numeric shortcut tags, glassmorphic dark pills, and $\ge 44\text{px}$ touch/click targets.
     * Unmounts cleanly when focusing on any object (`activeTarget !== null`) to keep in-object exploration clear and focused.
  4. **Directional Object Motion & Contextual Indicator Labels:**
     * Experience Wall: Pinned cards slide horizontally with pin-swing physics and small indicator `[ ✦ CLICK PREV / NEXT TO SLIDE ]`.
     * Wardrobe Cupboard: Achievement certificates slide vertically top-to-bottom along the hanging thread with small indicator `[ ✦ CLICK PREV / NEXT TO SLIDE (↑/↓) ]`.
     * Desk Phone: One-click email copy with indicator `[ ✦ CLICK TO COPY EMAIL ]`, direct phone call, and LinkedIn link.
  5. **Verification & Testing:**
     * 0 TypeScript errors (`npm run check`), Next.js Turbopack production build succeeded in 5.7s.
     * Verified with Chrome CDP automated test suite capturing 8 high-resolution screenshots into artifacts directory:
       - `hologram-01-room-overview-labels.png` (Room overview with non-colliding floating callout labels)
       - `hologram-02-book-top-view-intact.png` (Intact 3D book on desk with top-down reading view and hologram emitter)
       - `hologram-02b-book-page2-after-turn.png` (Book page turn with updated active marker)
       - `hologram-03-project-hologram-showcase.png` (Clean card layout with hologram HUD effect, project switcher, and accessible links)
       - `hologram-04-project-jump-creonix.png` (Quick project jump to Creonix via switcher pills)
       - `hologram-05-contact-hologram-phone.png` (Desk phone contact hologram HUD)
       - `hologram-06-experience-pinboard.png` (Experience wall pinboard hologram card)
       - `hologram-07-achievement-cupboard.png` (Wardrobe cupboard achievement hologram card)

  1. **Top-Down Book Experience (`roomInteractionTypes.ts`, `ProjectsBook.tsx`, `BookPages.tsx`, `BookOverlayControls.tsx`):**
     * Calibrated camera to an intimate top-down reading view (`cameraPosition: [-2.32, 1.62, -1.68]`, `cameraTarget: [-2.32, 0.744, -1.75]`, `FOV: 35°`), looking directly into the open pages on the desk.
     * When selecting Projects Book, opens the physical book flat on the desk without obstructing overlays.
     * Left page renders the complete **Table of Contents & Archive** with clickable project rows that turn directly to any project.
     * Right page renders the active project with verified headline, category, tools, and mockup preview.
     * Bottom in-room controls (`[PREV]`, `[INSPECT DOSSIER]`, `[NEXT]`) enable page flipping with 3D bending leaf physics and inspection of the emerging 3D dossier.
  2. **Arising Desk Phone with OLED Screen & Hologram HUD (`DeskPhone.tsx`, `PhoneScreenTexture.ts`, `ContactHologram.tsx`, `ContactSpotlightOverlay.tsx`):**
     * When selected, the physical phone on the desk **arises** $+0.16\text{m}$ into the air and tilts smoothly towards the camera view.
     * Embedded native high-DPI procedural OLED screen texture displaying 9:41, dynamic island, Taushik Chandana profile, "Available for Q1 2026 Roles" status badge, email, phone, and professional links.
     * Above the phone, pale aqua volumetric holographic projector light rays shoot upward from the device corners.
     * Anchored directly above the rays, the Direct Communicator Hologram HUD floats with 1-click email copy, direct phone dial, and LinkedIn links.
     * Closing or pressing Escape lowers the phone back to the desk and glides the camera back to room overview.
  3. **Directional Object-Based Navigation:**
     * Experience Wall: Cards swing horizontally with brass pushpins.
     * Wardrobe Cupboard: Certificates slide vertically top-to-bottom along the hanging thread.
  4. **Verification & Testing:**
     * Zero TypeScript errors (`tsc --noEmit`), successful Turbopack production build (8.4s).
     * Automated Playwright test suite passed with high-resolution visual evidence:
       - `spatial-01-book-top-view.png` (Direct top-down overhead reading view into open book)
       - `spatial-01b-book-page2-top-view.png` (Page turn with Table of Contents active marker update)
       - `spatial-02-book-dossier-emerged.png` (3D dossier emerged with 0px scrollbars)
       - `spatial-03-phone-arise-oled-hologram.png` (Desk phone arisen with floating hologram HUD)
       - `spatial-04-room-overview-after-phone.png` (Return to architectural room overview)
       - `spatial-05-experience-pinboard.png` (Experience wall pinboard with brass pushpin)
       - `spatial-06-achievement-cupboard.png` (Wardrobe cupboard certificate along vertical thread)
- **2026-11-08 [Phase 9.1 React Bits UI & Visual Clarity Upgrade]** — Upgraded all in-room portfolio destinations to high-performance **React Bits** UI components (`SpotlightCard.tsx`, `ShinyText.tsx`, `Dock.tsx`) to resolve blurred CSS `matrix3d` text projection caused by Drei `<Html transform>` on high-DPI and scaled laptop displays.
  1. Built core React Bits foundation in `src/components/ui/`: `SpotlightCard` with cursor-following radial gradient glow, border glare highlight, and glassmorphic backdrop; `ShinyText` with animated metallic gradient sweep; and `Dock` floating bottom navigation with spring hover scaling, tooltips, and keyboard shortcuts [1–5, ESC].
  2. Implemented dedicated screen-space Spotlight presentation overlays: `ProjectSpotlightOverlay` (Projects Book), `ExperienceSpotlightOverlay` (Experience Wall), `AchievementSpotlightOverlay` (Wardrobe Honors), `AboutSpotlightOverlay` (About Sketchbook & Toolkit), and `ContactSpotlightOverlay` (Desk Phone Hologram & Communicator).
  3. Preserved 100% of the 3D bedroom scene, physical 3D object models, lighting, and camera glide transitions in the background while ensuring 100% vector-sharp, razor-crisp typography, zero clipping, and $\ge 44\text{px}$ touch targets.
  4. Verified via Playwright automated audit across all 5 sections and overview: zero clipping, perfect horizontal/vertical centering, 0 TypeScript errors, successful Next.js production build, and HTTP 200 on `http://localhost:3000`. (Artifacts: `reactbits-01` to `reactbits-06b`).
- **2026-11-07 [Room Redirection — Stage 3 Interactive Projects Book]** — Implemented the physical 3D Projects Book on the desk (`ProjectsBook.tsx`, `BookPages.tsx`, `BookPageTextures.ts`, `BookOverlayControls.tsx`, `ProjectDossierModal.tsx`, `projectData.ts`). Features smooth front cover board 180° swing around spine hinge, subdivided 24-segment leaf geometry with dynamic curved paper bending (lift, bow, tip curl, and settle), high-DPI canvas textures for Left Spread (Table of Contents with active project highlighted) and Right Spread (verified project headline, category, tech pills, and summary). Built 3D paper dossier emergence ($55\text{mm}$ lift, $-0.28\text{ rad}$ tilt, drop shadow separation) paired with a high-readability tactile paper modal displaying full screenshots and verified links (Dev Atlas, Abtalks, Creonix, PrepBlitz, Nexus GG, Palmist.io, Equifiz). Guaranteed close-to-same-page state retention (closing dossier returns card into page and preserves active page index). Multi-modal navigation: ArrowLeft/ArrowRight, direct 01-07 jump pills, Home/End, Enter, Escape, and screen-reader `aria-live` announcements. Verified TypeScript 0 errors, Turbopack build 4.6s, zero idle render loops, and 11 captures across desktop, tablet, and mobile with interactive QA hub `Phase3_Projects_Book_Screenshots/index.html`. (Report: `docs/PHASE_3_PROJECTS_BOOK_REPORT.md`)
- **2026-11-07 [Room Redirection — Stage 1 Visual Reset & Composition Blockout]** — Executed complete visual reset and room-only spatial composition according to ANTIGRAVITY MASTER PROMPT and reference video. Integrated warm scrapbook color palette (`#F3EEDB`, `#76513B`, `#B78352`, `#8CB7E5`, `#EFCB75`, `#273246`, `#B9DCDD`) and procedural PBR materials (walnut, natural oak, plank floor, checker fabric, parchment paper, dotted notebook, buckram cloth, cork/linen pinboard). Blocked out 5 dedicated in-room objects: Hardcover Projects Book on desk (`[-2.05, 0.744, -1.75]`), Desk Phone (`[-1.50, 0.744, -1.68]`), Cork/Linen Experience Wall Hanging (`[-0.45, 1.65, -2.675]`), Wardrobe front Walnut finish with die-cut Achievement Stickers and 3D Spline Thread Curve (`[-2.865, 1.40, 0.50]`), and art-directed lived-in Bed Clutter (`[1.85, 0.545, -1.45]`). Verified camera presets, demand rendering, TypeScript 0 errors, Turbopack build 7.2s, and captured 8 responsive screenshots with zero horizontal overflow into `Phase1_Room_Composition_Screenshots/`. (Report: `docs/PHASE_1_ROOM_COMPOSITION_REPORT.md`)
- **2026-11-05 [Phase 1 Foundation]** — Implemented design tokens, typography scales, container system, and restrained editorial direction. (Commit: `f6a0650`)
- **2026-11-05 [Phase 1.1 Mobile Refinement]** — Added dedicated mobile typography, expandable mobile navigation, increased illustration contrast, and settled preloader animation. (Commit: `f6a0650`)
- **2026-11-05 [Phase 1.2 Tablet Navigation]** — Shifted horizontal navigation links from `sm:` (640px) to `lg:` (1024px) to transition tablet viewports (768px, 820px) to the compact pill and drawer navigation, eliminating 5px clipping with 224px breathing space. (Commit: `8f8c75a`)
- **2026-11-05 [Phase 2 Red Ribbon About Experience]** — Transformed the solid-red grid universe into a pure white background with a sculptural 3D Red Ribbon typography centerpiece. Vector text follows genuine SVG curved paths (`<textPath>`) with engraved dual-layer rendering. Modular specimen grid added alongside verified narrative and personal illustration plate. (Commit: `bc44207`, Owner Approval: 8.7/10)
- **2026-11-05 [Phase 2.1 About Polish]** — Replaced metadata label with "TAUSHIK CHANDANA // PRODUCT DESIGNER & BUILDER". Refined mobile ribbon fold at the right edge into an organic 3D continuous loop with subtle bevel and shadow, preserving composition and central negative space. (Commit: `2008658`)
- **2026-11-06 [Phase 3A 3D Room Blockout]** — Implemented normalized metric architectural interior blockout ($7.2\text{m} \times 5.4\text{m} \times 2.8\text{m}$) of Taushik's workspace. Integrated Three.js + R3F + Drei with demand-based rendering loop, responsive camera presets, dev inspection route (`/preview-room`), and accessible semantic HTML companion. (Commit: `159aa3b`, Gating: `bdb2c6b`)
- **2026-11-06 [Phase 3A.1 Room Composition & Camera Refinement]** — Refined mobile camera framing (`fov: 56°`, `pos: [2.1, 5.0, 8.4]`) achieving 100% room visibility with zero cropping. Stepped down right wall cutaway ($1.15\text{m}$ partition + $0.12\text{m}$ curb) opening sightlines to the bed and interior. Transformed window (architectural casing, cross mullions, daylight plane) and door (3-sided frame, $18^\circ$ ajar oak leaf, lever handle). Enhanced workstation (charcoal desk mat, silver laptop with screen wireframe, keyboard/mouse, fishbowl swimmer proxy, plant, wall quotes). Converted `/preview-room` to server-gated dynamic route via `ENABLE_DEV_PREVIEW`. (Commit: `c79da85`)
- **2026-11-06 [Phase 3B.1 High-Fidelity Hard-Surface Modelling]** — Upgraded room blockout to modular hard-surface furniture components (`src/components/room/models/`): 3-door wardrobe with shadow reveals and graphite handles; architectural desk with square-tube trestle legs, leveling feet, cable grommet, and stitched desk mat; Apple MacBook Pro on aluminum stand with individual QWERTY keycaps, glass trackpad, and active Retina IDE screen texture; studio ergonomic chair with 5-star wheeled base, pneumatic lift, mesh back, and signature red cushion; floating platform bed with tufted headboard, piped mattress, draped duvet, and throw blanket; architectural window with casing, mullions, birch sill, and daylight plane; architectural door swung $18^\circ$ ajar with threshold and lever handle; framed archival typography prints. In-memory procedural PBR textures for Retina IDE, wall prints, wood grain, and fabric weave. (Commit: `14c5f61`)
- **2026-11-06 [Phase 3B.2 Organic Assets, Soft Textiles & Environmental Realism]** — Replaced procedural proxies with dedicated lathe glass fishbowl, refractive water volume, aquarium flora and pebbles, detailed goldfish with bifurcated fan tail and lightweight idle swimming physics (`Fishbowl.tsx`); multi-leaf botanical desk plant in tapered ceramic pot with open soil bed plus corner floor planter (`Plant.tsx`); grounded platform bed on floor with sculpted draped linen duvet (`createDrapedDuvetGeometry`), lofted Oxford flanged pillows, and layered heavy wool throw (`Bed.tsx`); procedural PBR textures for leaf venation, wool twill weave, plaster stipple, and daylight horizon (`RoomTextures.ts`); enabled `PCFSoftShadowMap` with window daylight directional key light casting realistic contact shadows under bed, desk, and wardrobe (`RoomLighting.tsx`, `RoomCanvas.tsx`, `RoomShell.tsx`); recalibrated close-up cameras for wardrobe, bed, fishbowl, plant, and door/window (`RoomCamera.tsx`). (Commit: `085687c`)
- **2026-11-06 [Phase 3B.2.1 Final Visual Polish & Performance Audit]** — Executed focused design refinements across the 5 review priorities: (1) Sculpted flowing draped wool blanket with side waterfalls (`createDrapedThrowGeometry`) and organic double-curved cushioned pillows with sleep depressions (`createOrganicPillowGeometry`); (2) Upgraded botanical leaves to 9 cross-sectional vertex points, 16 longitudinal segments with spine twist, and 3 distinct PBR leaf materials (`plantLeafMature`, `plantLeafMedium`, `plantLeafYoung`); (3) Replaced flat opaque water disk with curved liquid meniscus profile and specular contact boundary ring, boosted glass transmission to 0.98, and sculpted detailed anatomical goldfish (dorsal ridge, pearlescent belly, dual fan caudal fin, golden iris); (4) Softened lighting with `shadow-radius={2.8}`, balanced daylight key (`1.90`), and boosted ambient fill (`1.38`); (5) Conducted WebGL performance audit via CDP instrumentation recording 130 draw calls, 69,192 triangles, 25.66 MB texture memory, 58–61 FPS, and verified offscreen/tab-hidden/reduced-motion throttling. (Commit: `06bcf2c`)
- **2026-11-06 [Phase 3C.1 Interactive 3D Hotspots & Portfolio Navigation]** — Transformed 3D workspace into an interactive navigation environment with dual-layer 3D/HTML hotspots, slide-over contextual drawers, and companion shortcuts. (Commit: `2b41b14`)
- **2026-11-06 [Phase 3C.1.1 Visual Refinement & Hotspot Polish]** — Resolved header collision by auto-hiding global navigation on mobile when drawer is active, expanded tablet drawer to $480\text{px}$, verified achievements and external links. (Commit: `e296e21`)
- **2026-11-06 [Phase 3C.1.2 Hotspot Visibility & Boundary Fixes]** — Fixed WORK hotspot React 19 hydration churn with sacrificial anchor and explicit keys; shifted CONTACT hotspot to $[2.75, 1.80, 1.15]$ eliminating mobile boundary clipping ($26\text{px}$ safe padding on $390\text{px}$ viewport). (Commit: `18f746d`, Owner Approved)
- **2026-11-06 [Phase 3C.2 Physical Animations & Fine Interactions]** — Implemented physical wardrobe door swing animation opening outward to reveal illuminated interior archives (shelves, SIH golden trophy, project documentation binders, linen boxes); implemented entrance door swing animation swinging from resting ajar ($18^\circ$) to $75^\circ$ ($1.30\text{ rad}$) on Contact selection; added MacBook Pro responsive lid tilt and dynamic MagSafe status LED; added wall quotation frame hover lift and dynamic tilt; added fishbowl interactive speed boost and accelerated caudal tail flutter; verified smooth camera transitions with demand rendering (zero idle render loops) across desktop, tablet, and mobile with zero horizontal overflow. (Commit: `54eb12d`, Visually Approved)
- **2026-11-06 [Phase 3C.2 Motion QA & Hotspot Polish]** — Completed the 3 owner-requested refinements: (A) Shifted CONTACT hotspot to $[3.28, 2.05, 1.62]$ on desktop ($101\text{px}$ right) directly aligning with the entrance doorway architrave without floating over bed while keeping $25\text{px}$ safe padding on mobile; (B) Captured high-resolution unobstructed archive and door close-ups via `/preview-room` without drawer blur overlay; (C) Captured 4 native 30 FPS video recordings (`.webm`) proving smooth hinge lerps for wardrobe doors, entrance door $75^\circ$ swing, workstation camera glide/lid tilt, and rapid interaction switching stress-test. Built integrated Motion QA HTML hub. (Commit: `0ba6131`)
- **2026-11-06 [Phase 4 Selected Work Showcase & Case Studies]** — Replaced four fragmented legacy sections with `SelectedWorkSection.tsx`: Dev Atlas flagship editorial dossier, secondary 6-project grid, 4 category filter tabs, interactive Nexus GG modal, backward-compatible anchors (`#work`, `#products`, `#ux-ui`, `#figma`), and 3D workstation bridge integration. Verified across 6 viewports with 0px overflow.
- **2026-11-06 [Phase 5 Journey, Experience & Achievements]** — Unified professional experience timeline (UI/UX Hyderabad, The Regiment, Acquiq, RamScript) and 4 collegiate hackathon honors into `JourneySection.tsx`. Integrated high-resolution certificate lightbox modal, category filtering with animated spring pills, 3D wardrobe bridge navigation, and backward-compatible anchors (`#journey`, `#experience`, `#achievements`). Verified across 6 viewports with 0px overflow.
- **2026-11-06 [Phase 6 Contact & Direct Collaboration]** — Replaced legacy 2D envelope section with `ContactSection.tsx`: architectural threshold narrative ("Step Through the Threshold. Let's Build Exceptional Software."), live Hyderabad studio time and availability status badge, 3-way Collaboration Intent Selector, hero email dossier (`taushikok@gmail.com`) with instant clipboard copy feedback, direct collaboration brief composer, 4 secondary channels (LinkedIn, Phone/WhatsApp, Resume download, Studio base), "Less Chaos. More Design." artwork showcase, smooth "Return to Top / 3D Room" button, and end-to-end 3D entrance door bridge navigation. Verified across 6 viewports with 0px overflow.
- **2026-11-06 [Phase 7 Complete Audit & Production Readiness]** — Executed complete end-to-end portfolio audit: added server-side security gates to preview routes (`preview-all`, `preview-contact`, `preview-experience`), implemented native Next.js `robots.ts` and `sitemap.ts`, configured complete Open Graph, Twitter cards, and viewport metadata in `layout.tsx`, aligned UI/UX Hyderabad title to `Core Member` and updated availability badge to `"Open for Inquiries & New Opportunities"`, added `RoomFallbackBlueprint` for graceful WebGL failure handling in `RoomHero.tsx`, and updated `FloatingNavbar.tsx` with direct `#work` and `#journey` anchors. Verified 26 visual and functional captures across 6 viewports (1440px to 375px) with 0px horizontal overflow. Production build passed in 5.7s. Ready for production deployment.
- **2026-11-06 [Phase 8 Production Launch & Domain Verification]** — Executed pre-launch engineering verification: audited git remotes (`tnex0734-ops/portfolio_v2.git`), verified hosting infrastructure (Vercel project `portfolio-v2` at `https://portfolio-v2.vercel.app`), verified domain DNS for `taushik.space` (public DNS status: `NXDOMAIN`, not yet configured), configured canonical URLs and sitemaps to default safely to `portfolio-v2.vercel.app` with `NEXT_PUBLIC_SITE_URL` override support, validated TypeScript (`tsc --noEmit` 0 errors), executed production build (Turbopack 5.8s, 9 routes verified), completed secret scan across source code (0 credentials or tokens found), verified external link security (100% `rel="noopener noreferrer"` compliance), confirmed preview route security gating, and generated complete pre-launch checklist and step-by-step owner deployment guide (`docs/PHASE_8_PRODUCTION_LAUNCH_READINESS_REPORT.md`). All local pre-flight checks passed; ready for owner git commit, push, PR merge, and domain connection.

---

## Completed Work (Phase 3C.1 Interaction Foundation)
1. **Interaction State & Spatial Target Architecture (`roomInteractionTypes.ts`):** Defined stateful interaction targets (`laptop`, `wardrobe`, `door`, `null`), calibrated world-space hotspot locations, camera focus coordinates, and accessible labels. Content dynamically sourced from `src/lib/content.ts`.
2. **Smooth Cinematic Camera Lerp (`RoomCamera.tsx`):** Delta-timed exponential easing for position, target lookAt, and FOV. Demands frames via `invalidate()` only while moving; snaps and stops all render calls when within threshold ($< 5\text{mm}$). Instantly respects `prefers-reduced-motion`.
3. **Dual-Layer 3D Hotspots (`RoomHotspot.tsx`):** 3D planar ring markers in Three.js space coupled with Drei `<Html>` interactive pill buttons. Monospace badge labels, pulsing red indicators, expanding tooltips on hover, and mobile touch support.
4. **Generous Touch/Pointer Hitboxes:** Embedded invisible bounding boxes in `Laptop.tsx`, `Wardrobe.tsx`, and `Door.tsx` for effortless mouse clicking and mobile tapping.
5. **Contextual Slide-Over Navigation Panel (`RoomContextPanel.tsx`):** Single reusable Framer Motion component. Slides over from right edge on desktop ($520\text{px}$ width) preserving the illuminated 3D room on the left; full-screen touch drawer on mobile. Features category filter tabs, live external links, direct contact copy cards, and Escape key dismissal.
6. **Accessible Companion Navigation Bar (`RoomHero.tsx`):** Companion HTML button pill bar (`WORK [LAPTOP]`, `JOURNEY [CUPBOARDS]`, `CONTACT [DOOR]`, `RESET OVERVIEW`) enabling keyboard users to navigate seamlessly with full screen-reader compliance.

---

## Files Changed
- `src/components/room/roomInteractionTypes.ts` — Interaction targets, hotspot coordinates, camera configurations.
- `src/components/room/RoomHotspot.tsx` — 3D and HTML hotspot markers.
- `src/components/room/RoomContextPanel.tsx` — Reusable slide-over panel for Work, Experience, and Contact.
- `src/components/room/RoomCamera.tsx` — Delta-timed smooth camera lerp with demand-rendering control.
- `src/components/room/RoomHero.tsx` — State orchestrator, accessible companion navigation bar, panel integration.
- `src/components/room/RoomFurniture.tsx` — Mounted hotspots and interaction callbacks.
- `src/components/room/RoomScene.tsx` — Passed interaction states.
- `src/components/room/RoomCanvas.tsx` — Canvas props interface.
- `src/components/room/models/Laptop.tsx` — Hitbox and pointer events.
- `src/components/room/models/Wardrobe.tsx` — Hitbox and pointer events.
- `src/components/room/models/Door.tsx` — Hitbox and pointer events.
- `docs/PHASE_3C_1_INTERACTION_FOUNDATION_REPORT.md` — Complete verification report.
- `screenshots/phase-3c-1/*` — 8 verification screenshots across 5 destinations.

---

## Verification & Audit Metrics
| Check / Test | Method | Result | Notes |
|---|---|---|---|
| `tsc --noEmit` | Automated CLI | **0 errors** | Clean types across all components |
| `next build` (Turbopack) | Production Build | **Compiled successfully** in 7.4s | 6 static routes, 1 dynamic route |
| `git diff --check` | Formatting Check | **0 issues** | Zero trailing whitespace |
| Laptop Selection $\rightarrow$ Work Panel | CDP Interaction | **PASSED** | Camera glided to screen; Dev Atlas & Nexus GG verified |
| Wardrobe Selection $\rightarrow$ Experience Panel | CDP Interaction | **PASSED** | Camera glided to cupboards; RamScript & Uxplosion verified |
| Door Selection $\rightarrow$ Contact Panel | CDP Interaction | **PASSED** | Camera glided to door; email & phone verified |
| Escape Key Dismissal | CDP Keyboard | **PASSED** | Closes active panel and smoothly returns camera to overview |
| Return to Room Button | CDP Click | **PASSED** | Dismisses panel and smoothly returns camera |
| Tablet Overview ($768 \times 1024$) | CDP Capture | **PASSED** | Balanced portrait framing; `0px` overflow |
| Mobile Interactions ($390 \times 844$) | CDP Touch Emulation | **PASSED** | Touch-friendly drawers; clean return paths; `0px` overflow |
| Demand Rendering Loop | CDP Runtime | **PASSED** | `invalidate()` active during lerp; 0 FPS when settled |
| Screenshots Saved | Automated Script | **8 files** | Synced across all 5 destination folders |

---

## 2026-11-06 — Phase 3C.1.1: Interaction Visual Refinement & Responsive QA

### Intent & Scope
Address user feedback on Phase 3C.1:
1. Re-position WORK hotspot directly above laptop display (`[-2.05, 1.15, -1.88]`) for clear discovery.
2. Remove oversized Drei `<Html>` banners on object selection; replace with subtle 3D surface ring indicators.
3. Eliminate collision between FloatingNavbar and mobile interaction drawer by gracefully hiding navbar while drawer is active (`y: -90, opacity: 0`).
4. Upgrade tablet drawer (768px-1023px) to a spacious 620px overlay drawer with backdrop blur, preventing narrow room squeezing.
5. Refine contact cards: replace exact GPS coordinates with "Hyderabad, India", add dedicated "COPY" email button with feedback.
6. Conduct content integrity audit confirming `content.ts` as single source of truth (RamScript is UI/UX Intern).
7. Capture 12 responsive visual QA screenshots across Desktop, Tablet, and Mobile.

### Files Modified & Created
- `src/components/room/roomInteractionTypes.ts` — Updated laptop hotspot position to `[-2.05, 1.15, -1.88]`.
- `src/components/room/RoomHotspot.tsx` — Replaced oversized HTML banners with 3D selection rings; hid non-active hotspots during selection; enhanced WORK badge styling.
- `src/components/room/RoomContextPanel.tsx` — Responsive 620px tablet overlay drawer; compact mobile header with CLOSE button; dedicated email copy button; removed coordinates; dynamic achievement badges.
- `src/components/FloatingNavbar.tsx` — Added `isHidden` prop with smooth Framer Motion transition.
- `src/components/room/RoomHero.tsx` — Passed `onPanelToggle` callback.
- `src/app/page.tsx` — Wired `isRoomPanelOpen` state to `FloatingNavbar`.
- `docs/PHASE_3C_1_1_VISUAL_REFINEMENT_REPORT.md` — Detailed engineering report.
- `screenshots/phase-3c-1-1/*` — 12 screenshots across 5 destinations.

### Verification & Metrics
- `tsc --noEmit`: 0 errors.
- `next build`: Compiled successfully in 7.2s.
- `git diff --check`: 0 issues.
- All 12 screenshots captured via CDP automated script with 0px horizontal overflow.
- Demand rendering preserved; zero continuous render loop.

---

## [Phase 3C.1.2] Hotspot Visibility & Mobile Clipping Resolution — 2026-11-06

### Intent & Scope
Resolve the two specific visual review findings from Phase 3C.1.1:
1. **Mobile CONTACT Hotspot Clipping:** The floating CONTACT badge was cut off at the right edge on 390px viewports because the original door 3D coordinate (`X = 3.45`) projected too close to the right screen boundary (screen $X = 360\text{px}$, clipping by ~10px).
2. **WORK Hotspot Visibility Confirmation:** In overview captures, the WORK label was missing from the 3D room above the laptop due to React 19 async portal hydration with `@react-three/drei` `<Html>`.

### Root Cause Analysis & Engineering Solutions
1. **Door Hotspot Repositioning (`roomInteractionTypes.ts`):**
   - Shifted `ROOM_HOTSPOTS.door.position` from `[3.45, 2.08, 0.55]` to `[2.75, 1.80, 1.15]`.
   - On 390px mobile, center anchor projects to screen $X = 321\text{px}$ (right edge $X = 364\text{px}$), leaving a healthy 26px padding inside the cutaway card.
   - On 1440px desktop, center anchor projects to $X = 1038\text{px}$, naturally framing the entrance threshold without obscuring the bed or window.

2. **Drei HTML Hydration & Portal Anchor (`RoomFurniture.tsx`):**
   - In React 19, R3F's initial event container reconnection triggered an unmount/remount on the first Drei `<Html>` element in the scene graph, causing its root container to become unmounted with empty innerHTML.
   - Added a lightweight sacrificial Drei `<Html style={{ display: "none" }}>` anchor at the start of the hotspot group to absorb the initial portal connection lifecycle.
   - Added explicit, stable keys (`key="laptop"`, `key="wardrobe"`, `key="door"`) to ensure permanent DOM attachment for all 3 interactive markers.

### Verification & Metrics
- `tsc --noEmit`: 0 errors.
- `next build`: Production build passes in 3.0s.
- `DOM Inspection`: All three buttons (`WORK`, `JOURNEY`, `CONTACT`) verified simultaneously in the DOM with active bounding boxes:
  - Mobile (390x844): WORK `[left: 113, right: 160]`, JOURNEY `[left: 29, right: 99]`, CONTACT `[left: 278, right: 364]`. `clippedRight: false` for all. Horizontal overflow: 0px.
  - Desktop (1440x900): WORK `[left: 612, top: 398]`, JOURNEY `[left: 395, top: 335]`, CONTACT `[left: 926, top: 511]`. All visible.
  - Tablet (768x1024): All three hotspots visible with > 180px safe margins.
- `Interaction Testing`: Click on 3D WORK button opens Selected Work drawer with full project portfolio (Dev Atlas, Abtalks, Creonix, PrepBlitz, Nexus GG, Palmist.io, Equifiz).
- All 12 screenshots re-captured and synchronized across all 5 destinations:
  - `C:\Users\TNEX\OneDrive\Desktop\Phase3C1_1_Screenshots\`
  - `C:\Users\TNEX\Desktop\Phase3C1_1_Screenshots\`
  - `C:\Users\TNEX\OneDrive\Desktop\techvruk\Phase3C1_1_Screenshots\`
  - `C:\Users\TNEX\OneDrive\Desktop\portcomp\PORTFOLIO\screenshots\phase-3c-1-1\`
  - `C:\Users\TNEX\.gemini\antigravity\brain\a525ee37-e34c-4994-9a91-364c9e0f7797\`


---

## [Phase 4] Curated Selected Work Showcase & Case Studies — 2026-11-06

### Intent & Scope
1. Implement the next highest-impact portfolio milestone across the integrated product workflow.
2. Bridge the 3D room's Work workstation and About Ribbon with the rest of the portfolio by replacing fragmented legacy sections (`AiProductsSection` with ASCII hands, `UxUiProjectsSection` with zigzag lanyard cards) with a unified, high-craft **Selected Work Showcase & Case Studies Section** (`SelectedWorkSection.tsx`).
3. Preserve 100% of verified repository content from `src/lib/content.ts` (Dev Atlas, Abtalks, Creonix, PrepBlitz, Nexus GG, Palmist.io, Equifiz).
4. Preserve backward compatibility for navigation links and contextual drawer links (`#work`, `#products`, `#ux-ui`, `#figma`).
5. Build an accessible interactive dual-flow modal for Nexus GG (UX Research on Miro + Interactive UI Prototype on Stitch).
6. Implement smooth category filtering (`ALL 7`, `AI PRODUCTS 4`, `UX / UI 3`) with Framer Motion `layoutId="workActiveTabPill"`.

### Files Modified & Created
- `src/components/work/SelectedWorkSection.tsx` — Unified editorial showcase, flagship Dev Atlas card, 2-column secondary project cards, spring-animated category tabs, accessible Nexus GG modal.
- `src/app/page.tsx` — Replaced inline legacy AI Products and UX/UI sections with `<SelectedWorkSection />`; cleaned up dead brutalist helper code.
- `scratch/verify_phase4_selected_work.js` — Automated Chrome DevTools Protocol visual QA test runner.
- `screenshots/phase-4-selected-work/*` — 14 high-resolution verification screenshots.
- `Phase4_Selected_Work_Screenshots/index.html` — Interactive QA evidence gallery.

### Verification & Metrics
- `tsc --noEmit`: 0 errors.
- `next build`: Compiled successfully in 4.7s with Turbopack (6 static routes, 1 dynamic route).
- Viewports tested via CDP:
  - 1440px Desktop: 0px overflow (Client: 1425px, Scroll: 1425px).
  - 1366px Laptop: 0px overflow (Client: 1351px, Scroll: 1351px).
  - 1024px Tablet Landscape: 0px overflow (Client: 1009px, Scroll: 1009px).
  - 768px Tablet Portrait: 0px overflow (Client: 753px, Scroll: 753px). Stacked responsive header with single-line filter pills.
  - 390px Mobile: 0px overflow (Client: 390px, Scroll: 390px).
  - 375px Mobile: 0px overflow (Client: 375px, Scroll: 375px).
- Nexus GG Modal: Verified opening on trigger click, focus trapping, Escape key dismissal, and 0px overflow on mobile.
- End-to-End Integration: Click on 3D room's companion `WORK [LAPTOP]` button opens contextual drawer; click on "EXPLORE ALL PROJECTS IN FULL VIEW" smoothly navigates to `#products` in Selected Work.
- Evidence saved to `Phase4_Selected_Work_Screenshots/` on Desktop, OneDrive, repo, and brain.


---

## [Phase 5] Professional Journey, Experience & Achievements — 2026-11-06

### Intent & Scope
1. Implement Phase 5: Career Progression, Guild Leadership & Hackathon Honors (`JourneySection.tsx`).
2. Establish the digital continuation of the 3D room's physical wardrobe archive, replacing legacy `<AchievementsSection />` (360vh scroll-jack) and `<ExperienceBooksSection />` (literal book spines with rotating sparkles).
3. Synthesize Concept A (Editorial Career Archive) and Concept B (Personal Achievement Collection) into a unified two-pillar architectural layout.
4. Preserve 100% of verified professional roles (UI/UX Hyderabad, The Regiment, Acquiq, RamScript) and hackathon achievements (Uxplosion 3.0, CVR College, Signal Labs, SCIENT) from `src/lib/content.ts`.
5. Support backward-compatible anchors: `#journey`, `#experience`, `#achievements`.
6. Implement an accessible high-resolution certificate lightbox modal with keyboard Escape listener.
7. Wire the 3D room wardrobe contextual drawer's action button ("Explore Full Archive & Journey") to navigate smoothly to `#journey`.

### Files Modified & Created
- `src/components/journey/JourneySection.tsx` — Unified career timeline, achievement cards, spring-animated category filters, accessible certificate lightbox.
- `src/components/room/RoomContextPanel.tsx` — Updated wardrobe drawer bridge button to point to `#journey`.
- `src/app/page.tsx` — Replaced legacy `<AchievementsSection />` and `<ExperienceBooksSection />` with `<JourneySection />`.
- `scratch/verify_phase5_journey.js` — Automated Chrome DevTools Protocol visual verification script.
- `docs/PHASE_5_JOURNEY_IMPLEMENTATION_REPORT.md` — Detailed engineering and design report.
- `screenshots/phase-5-journey/*` — 15 high-resolution verification screenshots.
- `Phase5_Journey_Screenshots/index.html` — Interactive visual QA evidence gallery.

### Verification & Metrics
- `tsc --noEmit`: 0 errors.
- `next build`: Compiled successfully in 4.3s with Turbopack (6 static routes, 1 dynamic route).
- Viewports tested via CDP:
  - 1440px Desktop: 0px overflow (Client: 1425px, Scroll: 1425px).
  - 1366px Laptop: 0px overflow (Client: 1351px, Scroll: 1351px).
  - 1024px Tablet Landscape: 0px overflow (Client: 1009px, Scroll: 1009px).
  - 768px Tablet Portrait: 0px overflow (Client: 753px, Scroll: 753px).
  - 390px Mobile: 0px overflow (Client: 390px, Scroll: 390px). Compact single-line filter tabs.
  - 375px Mobile: 0px overflow (Client: 375px, Scroll: 375px).
- Certificate Modal: Verified full-scale certificate display, Student Developers Community signature, award metrics, focus trapping, and Escape key dismissal.
- End-to-End Wardrobe Integration: Click on 3D room's companion `JOURNEY [CUPBOARDS]` button opens contextual drawer; click on "Explore Full Archive & Journey" smoothly navigates to `#journey`.
- Evidence saved to `Phase5_Journey_Screenshots/` on Desktop, OneDrive, repo, and brain.


---

## [Phase Spatial-Pure] The 3D Room Becomes the Portfolio — 2026-11-07

### Intent & Scope
1. Implement the user's non-negotiable creative direction: **"THE ROOM IS THE WEBSITE. THE OBJECTS ARE THE NAVIGATION. ALL CONTENT IS EXPERIENCED THROUGH PHYSICAL OBJECT INTERACTIONS IN 3D PERSPECTIVE SPACE."**
2. Completely remove split-screen website layouts, side drawers, blurred backgrounds, and conventional scroll sections from the primary visitor experience (`src/app/page.tsx`).
3. Build and verify the 5 authentic spatial destinations:
   - **Projects Book on Desk** (`[-2.32, 0.744, -1.75]`): Hardcover book opens $180^\circ$, curved 3D page turns through all 7 verified projects. Inspecting opens perspective-anchored 3D paper dossier (`SpatialProjectDossier.tsx`).
   - **About Notebook on Desk** (`[-1.65, 0.744, -1.85]`): Opens into two-page dimensional spread (`AboutNotebook.tsx`) with authentic bio, philosophy ("Less Chaos. More Design."), core focus areas, and engineering toolkit.
   - **Experience Wall Pinboard** (`[-0.45, 1.85, -2.55]`): Cork/linen board with pinned cards; selecting lifts a 3D paper card (`SpatialExperienceCard.tsx`) $+0.28\text{m}$ into dimensional perspective space.
   - **Achievement Cupboard / Wardrobe** (`[-2.85, 1.55, 0.45]`): Die-cut stickers connected by 3D spline thread curve; selecting lifts an authentic certificate card (`SpatialAchievementCard.tsx`) with verified hackathon honors.
   - **Contact Desk Phone** (`[-1.25, 0.744, -1.68]`): Physical phone lifts and tilts $22^\circ$, emitting an upright, luminous pale aqua translucent hologram (`ContactHologram.tsx`) with verified email (`taushikok@gmail.com`), copy feedback, LinkedIn, phone, and location.

### Files Modified & Created
- `src/app/page.tsx` — Transformed into isolated single-room 3D portfolio architecture with zero legacy scroll sections.
- `src/components/room/RoomHero.tsx` — Architectural HUD, bottom in-room object dock (`PROJECTS [BOOK]`, `ABOUT [NOTEBOOK]`, `EXPERIENCE [WALL]`, `ACHIEVEMENTS [CUPBOARD]`, `CONTACT [PHONE]`), top-right `[ ↺ RETURN TO ROOM (ESC) ]`, keyboard shortcuts (`1-5`, `0`, `Escape`), and auto-resetting child dossiers.
- `src/components/room/objects/AboutNotebook.tsx` — Refactored to Drei `<Html transform>` two-page spread (`scale={0.032}`, `rotation={[-0.66, 0, 0]}` facing camera directly), eliminating all canvas texture / depth-sorting anomalies.
- `src/components/room/objects/ContactHologram.tsx` — Re-aligned rotation (`[-0.38, 0.18, 0]`, `<Html transform rotation={[0, 0, 0]}>`, `scale={0.038}`), eliminating mirroring/inversion and framing all contact info, live transmission header, copy button, and end call button.
- `src/components/room/RoomFurniture.tsx` — Conditioned `Chair` visibility during desk close-up focuses (`activeTarget !== "book" && activeTarget !== "about" && activeTarget !== "phone"`) to prevent near-plane camera frustum clipping.
- `src/components/room/roomInteractionTypes.ts` — Re-calibrated spatial object coordinates across the $1.60\text{m}$ desk with $0.70\text{m}$ clearance to prevent visual overlap.
- `scratch/capture_all_spatial_experiences.js` — Automated Chrome DevTools Protocol verification test suite for all 5 destinations.

### Verification & Metrics
- `npm run build`: Compiled with 0 errors (`next build --turbo`).
- `npm run start`: Running live on `http://localhost:3000` (`task-5373`).
- 11 high-resolution screenshots captured via CDP across Desktop (1440px), Tablet (768px), and Mobile (390px):
  - `01-desktop-1440-room-overview.png`
  - `02-desktop-1440-projects-book-open.png`
  - `03-desktop-1440-projects-book-turn.png`
  - `04-desktop-1440-projects-3d-dossier.png`
  - `05-desktop-1440-about-notebook-open.png`
  - `06-desktop-1440-about-notebook-page2.png`
  - `07-desktop-1440-experience-wall-card.png`
  - `08-desktop-1440-achievement-cupboard-card.png`
  - `09-desktop-1440-contact-phone-hologram.png`
  - `10-tablet-768-room-composition.png`
  - `11-mobile-390-room-composition.png`
- Saved copies to Desktop (`C:\Users\TNEX\OneDrive\Desktop\Room_Only_Spatial_Screenshots\`) and the conversation artifact directory.


---

## [Phase 9] Spatial UX, Interaction Reliability & Visual Refinement — 2026-11-07

### Intent & Scope
1. Execute the comprehensive rework requested following review of the ~40-second recording (1910 × 906).
2. Eliminate camera frustum clipping on vertical spatial cards (wardrobe achievements and experience wall).
3. Completely remove HUD noise, including spinning corner boxes (`KineticCornerBox`), persistent 5-button bottom dock, and permanent pulsing red rings.
4. Replace oversized panels with correctly scaled 3D cards in perspective space, guaranteeing minimum $44 \times 44\text{px}$ touch targets in screen space.
5. Fix the Projects Book framing to show the entire open book, spine, edges, and desk mat.
6. Guarantee that dismissing a project dossier seamlessly returns to the exact open book spread and page.
7. Keep wardrobe doors closed as a solid natural oak backdrop for stickers and threads.
8. Deliver verifiable proof across 6 standard viewports with an automated Chrome DevTools Protocol test suite.

### Files Modified & Created
- `src/components/room/RoomHero.tsx` — Replaced persistent bottom dock and corner spinners with an accessible top-left `[DESTINATIONS]` dropdown; streamlined focused state to show only object title and $44 \times 44\text{px}$ `[ ↺ RETURN TO ROOM (ESC) ]` button; added Escape key stack handling.
- `src/components/room/RoomHotspot.tsx` — Removed distracting permanent pulsating red rings and HTML pill clutter from room overview; preserved subtle hover indicators.
- `src/components/room/roomInteractionTypes.ts` — Recalibrated camera positions, look-at targets, FOV, and mobile multipliers across all 5 destinations to guarantee headroom clearance and zero clipping.
- `src/components/room/RoomCamera.tsx` — Applied delta-timed exponential lerp dampening with responsive mobile distance multiplier ($1.30–1.35\times$).
- `src/components/room/objects/BookOverlayControls.tsx` — Dedicated bottom bar active only when the Projects Book is focused; page counter, $44 \times 44\text{px}$ `[PREV]` / `[NEXT]` page buttons, and `[INSPECT DOSSIER]` action.
- `src/components/room/objects/SpatialProjectDossier.tsx` — Rescaled to `scale={0.038}`, width $440\text{px}$; elevated $+0.22\text{m}$ along $Z$ above right page; clean dismissal restoring exact spread.
- `src/components/room/objects/ExperienceWallHanging.tsx` — Rendered crisp direct text on all 4 physical wall cards in room space.
- `src/components/room/objects/SpatialExperienceCard.tsx` — Rescaled to `scale={0.046}`; zero top clipping ($Y = 343\text{px}$ on $900\text{px}$ viewport); calibrated $\ge 44\text{px}$ navigation controls with boundary states.
- `src/components/room/models/Wardrobe.tsx` — Kept doors closed to serve as tactile oak canvas for stickers and threads.
- `src/components/room/objects/SpatialAchievementCard.tsx` — Rescaled to `scale={0.046}`; zero top clipping ($Y = 290\text{px}$ on $900\text{px}$ viewport); verified hackathon honors and metrics.
- `src/components/room/objects/ContactHologram.tsx` — Translucent pale aqua projection tilted $-0.42\text{rad}$; verified email mailto, instant "COPIED!" clipboard feedback, LinkedIn link, and $44 \times 44\text{px}$ `[END CALL]` button.
- `src/components/room/objects/AboutNotebook.tsx` — Editorial two-page spread with authentic bio, philosophy, and toolkit.
- `src/components/room/objects/BedClutter.tsx` — Added realistic studio over-ear headphones resting on the bed duvet.
- `scratch/verify_phase9_spatial_ux.js` — Automated Chrome DevTools Protocol verification test suite for all 23 criteria across 6 viewports.
- `docs/PHASE_9_SPATIAL_UX_AND_INTERACTION_REFINEMENT.md` — 15-section exhaustive engineering, mathematical, and spatial UX report.
- `C:\Users\TNEX\OneDrive\Desktop\Room_Only_Spatial_Screenshots\index.html` — Interactive visual QA gallery.

### Verification & Metrics
- `next build --turbo`: Compiled with 0 errors.
- `next start`: Production server active on `http://localhost:3000`.
- Automated CDP test suite: **23 / 23 TESTS PASSED (100%)**.
- Viewports verified:
  - Desktop ($1440 \times 900$): $0\text{px}$ horizontal overflow, zero clipping.
  - Laptop ($1366 \times 768$): $0\text{px}$ horizontal overflow, zero clipping.
  - Tablet Landscape ($1024 \times 768$): $0\text{px}$ horizontal overflow, zero clipping.
  - Tablet Portrait ($768 \times 1024$): $0\text{px}$ horizontal overflow, zero clipping.
  - Mobile ($390 \times 844$): $0\text{px}$ horizontal overflow, camera distance multiplier applied.
  - Compact Mobile ($375 \times 667$): $0\text{px}$ horizontal overflow, camera distance multiplier applied.
- 17 high-resolution verification screenshots captured and stored in `Room_Only_Spatial_Screenshots/` on Desktop and the conversation artifact directory.
- All non-negotiable rules preserved: NO git commit, NO git push, NO deployment, NO remote alterations.


---

## [Phase 9 Recovery] Performance, Interaction Reliability & Spatial UX Recovery — 2026-11-07

### Intent & Scope
1. Execute the emergency performance, interaction reliability, and spatial UX recovery requested following review of the 54.6-second recording (`current-output-review/current-output-review-20261107.mp4`).
2. Eliminate main-thread frame stalls, loading delays, and custom cursor mousemove churn.
3. Fix camera framing and angular orientation across all 5 in-room destinations to eliminate foreshortening, clipping, and detached presentations.
4. Remove floating Drei HTML pills from the 3D room overview to eliminate visual competition and clutter.
5. Reduce excessive shadow casting and downscale shadow depth FBO from $2048^2$ to $1024^2$, reducing VRAM from $25.66\text{MB}$ to $13.66\text{MB}$.
6. Apply Gravitas invariants and the `r3f-performance-engineer` specification to measure empirical baseline vs post-fix performance under identical production conditions.

### Files Modified & Created
- `src/components/room/roomInteractionTypes.ts` — Recalibrated camera positions and targets: Book (`[-2.32, 1.42, -1.25]`, FOV $38^\circ$), Wall (`[-0.45, 1.65, -1.35]`, FOV $42^\circ$), Wardrobe (`[-1.45, 1.40, 0.50]`, FOV $40^\circ$), Phone (`[-1.25, 1.18, -1.15]`, look-at $Y=0.85\text{m}$, FOV $42^\circ$), About (`[-1.65, 1.38, -1.25]`, FOV $38^\circ$).
- `src/components/room/RoomHotspot.tsx` — Replaced permanent floating HTML text badges with subtle in-room floor markers that highlight only on hover, eliminating HUD competition in overview mode.
- `src/components/room/RoomScene.tsx` — Throttled `scene.traverse()` in `WebGLStatsCollector` to run on mount and every 120 frames, eliminating per-frame CPU bottleneck.
- `src/components/room/RoomLighting.tsx` — Optimized shadow map to $1024 \times 1024$ with PCF soft filtering; reduced depth buffer memory from $16\text{MB}$ to $4\text{MB}$.
- `src/components/room/RoomMaterials.ts` — Implemented shared singleton (`cachedRoomMaterials`), eliminating duplicate material instantiations between `RoomFurniture` and `RoomShell`.
- `src/components/room/models/Plant.tsx` — Disabled `castShadow` on 32 individual leaf blades and stems; kept shadow on pots and `receiveShadow` on foliage.
- `src/components/room/objects/BedClutter.tsx` — Disabled `castShadow` on writing pens, hoodie sleeves, and headphone ear cups.
- `src/components/room/objects/ExperienceWallHanging.tsx` — Disabled `castShadow` on 4 pinned paper cards.
- `src/components/room/objects/AchievementStickers.tsx` — Disabled `castShadow` on flat 3mm wardrobe stickers.
- `src/components/room/objects/SpatialProjectDossier.tsx` — Angled dossier toward camera (`rotation={[-Math.PI / 2.6, 0, 0]}`), added direct Prev/Next pagination buttons.
- `src/components/room/objects/ContactHologram.tsx` — Elevated and angled hologram (`rotation={[-0.52, 0, 0]}`, `scale={0.027}`) with verified headroom ($Y = 234\text{px}$).
- `src/components/room/objects/AboutNotebook.tsx` — Angled sketchbook spread (`rotation={[-0.80, 0, 0]}`) perpendicular to sightline.
- `src/components/room/RoomCanvas.tsx` — Capped device pixel ratio at `dpr={[1, 1.5]}`.
- `src/components/EditorialPreloader.tsx` — Replaced artificial $1800\text{ms}$ delay with instant non-blocking transition ($57\text{ms}$ dismissal).
- `src/components/CustomCursor.tsx` — Disabled custom mousemove tracking and synthetic red cursor, restoring native hardware cursor.
- `docs/performance/baseline_metrics.json` — Empirical baseline measurements before code changes.
- `docs/performance/after_fix_metrics.json` — Empirical post-fix measurements under identical test conditions.
- `docs/performance/PERFORMANCE_REPORT.md` — Detailed profiling, root cause analysis, and side-by-side comparison.
- `docs/PHASE_9_PERFORMANCE_AND_INTERACTION_RECOVERY.md` — Master recovery milestone report.
- `scratch/measure_baseline_performance.js` & `scratch/measure_postfix_performance.js` — Automated CDP measurement test suites.

### Measured Empirical Verification
- **Room Time to Interactive**: Dropped from $\approx 2500\text{ms}$ to **$57\text{ms}$** ($-97.7\%$).
- **Peak Frame Stall**: Dropped from **$2062.6\text{ms}$** to **$118.1\text{ms}$** ($-94.3\%$).
- **p95 Frame Time**: Dropped from **$76.2\text{ms}$** to **$34.7\text{ms}$** ($-54.5\%$).
- **Sustained Interaction FPS**: Jumped from **$20\text{ FPS}$** to **$46\text{ FPS}$** ($+130\%$).
- **Texture VRAM Allocation**: Reduced from **$25.66\text{MB}$** to **$13.66\text{MB}$** ($-46.8\%$).
- **Draw Calls**: Reduced from **$727$** to **$682$**.
- **Automated Tests**: **14 / 14 TESTS PASSED (100%)** across Desktop ($1440\text{px}$), Laptop ($1366\text{px}$), Tablet Landscape ($1024\text{px}$), Tablet Portrait ($768\text{px}$), Mobile ($390\text{px}$), and Compact Mobile ($375\text{px}$).
- **Git & Safety**: Zero git commit, zero git push, zero remote alterations.

---

## [Phase Folio & Tactile Motion Redesign] 3D Book Spine Repair, Two-Column Folio Layout & Directional Tactile Animations — 2026-11-08

### Intent & Scope
1. Fix user-reported 3D book presentation defects:
   - Eliminate the vertical cylinder spine standing up in the middle of the book ("blue chimney" defect).
   - Eliminate detached bookmark tabs falling below the book edges onto the desk.
   - Square book group rotation and center camera framing on the open book spread.
   - Center open book symmetrically on an expanded, premium charcoal leather desk pad.
2. Redesign Project Dossier layout:
   - Transform from tall, scrolling single-column card into a wide horizontal two-column folio spread (`grid-cols-1 lg:grid-cols-12`).
   - Left column (5 cols): 16:9 screenshot, verified technology tags, and primary "LAUNCH LIVE PROJECT ↗" action.
   - Right column (7 cols): Project badge/number, title, tagline, description, key architecture highlights, and pagination.
   - Complete project details fit simultaneously on standard screens with **zero vertical scrollbar** (`overflow-hidden`, height $\approx 468\text{px}$).
   - Added clear "VIEW 3D BOOK" and "ESC" controls to inspect the 3D book directly on the desk.
3. Implement authentic physical directional animations:
   - **Projects Book**: Horizontal left-to-right page-turn motion ($x: \pm 120 \to 0$, $y=0$) with Spring damping.
   - **Experience Wall Pinboard**: Horizontal swing motion with realistic metallic brass pushpin motif at the top center.
   - **Achievements Cupboard**: Vertical top-to-bottom motion ($y: \pm 110 \to 0$, $scale: 0.95 \to 1$) along the wardrobe's vertical guide string/thread motif.

### Files Modified & Created
- `src/components/room/objects/ProjectsBook.tsx` — Replaced vertical cylinder spine with flat leather binding crease and silk ribbon gutter when open; squared rotation; added `useEffect` with `invalidate()` for instant R3F repainting.
- `src/components/room/objects/BookPages.tsx` — Calibrated open book spread to balanced 16mm folio leaf height; added `invalidate()` on texture/mount; verified Table of Contents on left leaf and active project on right leaf.
- `src/components/room/models/Desk.tsx` — Expanded desk pad to $1.20\text{m} \times 0.52\text{m}$ at $X = -0.18$, ensuring the open book sits completely and symmetrically atop the pad.
- `src/components/room/roomInteractionTypes.ts` — Calibrated `ROOM_HOTSPOTS.book` camera position and target.
- `src/components/room/objects/ProjectSpotlightOverlay.tsx` — Converted to wide two-column folio layout; added horizontal page slide transitions.
- `src/components/room/objects/ExperienceSpotlightOverlay.tsx` — Added brass pushpin motif and horizontal card swing motion.
- `src/components/room/objects/AchievementSpotlightOverlay.tsx` — Added vertical string guide motif and vertical top-to-bottom slide transitions.

### Verification & Metrics
- `tsc --noEmit`: 0 errors.
- `next build`: Succeeded in Turbopack (0 errors, 5 static routes, 4 dynamic routes).
- Server running live on `http://localhost:3000` (Ready in 177ms).
- Verified Playwright screenshots:
  - `redesign-01-3d-book-open-on-desk.png`: Perfectly flat 3D open book on desk, zero chimney, zero detached tabs, Table of Contents on left, Dev Atlas on right.
  - `redesign-01b-3d-book-page2.png`: 3D book page turn to Abtalks Landing Redesign with active index marker.
  - `redesign-02-wide-two-column-project-folio.png`: Wide 2-column folio dossier with 100% visible project details and zero vertical scrollbar.
  - `redesign-03-project-next-slide.png`: Horizontal slide transition to Creonix (Project 03).
  - `redesign-05-experience-horizontal-slide.png`: Wall pinboard card with brass pushpin and horizontal slide.
  - `redesign-07-achievement-vertical-slide.png`: Wardrobe card with vertical thread guide and top-to-bottom motion.
- Git & Safety: Zero git commit, zero git push, zero remote changes.

---

## [Phase Spatial UX] Interactive Phone Close-up, Single-Folio Book & Certificate Images — 2026-11-15

### Intent & Scope
1. **Interactive Phone View (Contact Experience)**:
   - Bring the phone closer to the camera and scale it up ($1.65\times$) when selected, elevating it $+0.22\text{m}$ from the desk to simulate physically picking up the phone.
   - Expand the in-display OLED screen to `w-[380px] h-[690px]` with larger font sizes, high-contrast badges, dynamic island, bio, contact channels (`taushikok@gmail.com`, `+91 89192 37170`, LinkedIn, GitHub), and clear `PUT DOWN PHONE (ESC)` affordances.
   - Calibrate camera to intimate close-up `cameraPosition: [-1.25, 1.05, -1.36]`, `FOV 28`, and `mobileDistanceMultiplier: 1.0`.
2. **Projects Book (Single Folio Page Only)**:
   - Conforming to user feedback, eliminate the left-page Table of Contents / Index spread that split focus.
   - Show ONLY a single project page at one time (`data-testid="single-project-folio"`), centered across the open book.
   - Feature large Playfair serif title, tagline, description, production stack badges, deliverables box with red checkmarks, and direct live app link.
   - Add page-flip transitions on "NEXT PROJECT" and "PREV PROJECT" and interactive folio jumper pills (`01` through `07`).
3. **Achievements Section (Verified Certificate Images)**:
   - Incorporate verified high-resolution certificate and award images (`/achievements/uxplosion.png`, `/achievements/cvr.png`, `/achievements/signallabs.png`, `/achievements/scientclg.png`) directly into `SpatialAchievementCard.tsx`.
   - Implement an archival two-column showcase: certificate in clean archival matte frame with "VIEW FULL RESOLUTION" link on the left, and verified honor narrative, host, headline, and metrics grid on the right.
4. **Consistency**:
   - Align the visual presentation across Projects, Experience, and Achievements with tactile paper textures, brass pushpin/washi tape motifs, and crisp native HTML typography.

### Files Modified & Created
- `src/components/room/roomInteractionTypes.ts` — Calibrated phone camera closer (`[-1.25, 1.05, -1.36]`, `FOV 28`) and book camera (`[-2.32, 1.34, -1.48]`, `FOV 29`).
- `src/components/room/objects/DeskPhone.tsx` — Added smooth $1.65\times$ scale interpolation on selection, $+0.22\text{m}$ elevation, enlarged OLED display (`distanceFactor: 0.16`), and top status bar close button.
- `src/components/room/objects/BookPages.tsx` — Re-engineered into a single-folio project page showing only one project at a time with 3D page flip animation.
- `src/components/room/objects/ProjectsBook.tsx` — Symmetrically adapted for the single-page folio spread.
- `src/components/room/objects/SpatialAchievementCard.tsx` — Integrated real certificate images with archival frame, award pill, and full-resolution link.
- `scratch/verify_all_enhancements.js` — Automated Chrome DevTools Protocol test runner.

### Verification & Metrics
- `npx tsc --noEmit`: 0 errors.
- `npm run build`: Compiled successfully via Next.js Turbopack (0 errors, 5 static routes, 4 dynamic routes).
- Production daemon running live on `http://localhost:3000`.
- Automated CDP tests passed:
  - Phone: `found: true, width: 380, height: 690, hasCloseBtn: true`. Verified text readability and scrolling.
  - Book: `foundSingleFolio: true, hasLeftSpreadIndex: false, currentProjectTitle: 'Dev Atlas'`. Verified page flip to 'Abtalks Landing Redesign' and single project isolation.
  - Achievements: `hasImage: true, imgSrc: '.../uxplosion.png'`, `imgSrc: '.../cvr.png'`, `imgSrc: '.../signallabs.png'`. Verified certificate rendering.
- Saved screenshots:
  - `enhanced-01-phone-large-and-close.png`
  - `enhanced-01b-phone-scrolled-inside.png`
  - `enhanced-02-single-project-folio-page1.png`
  - `enhanced-03-single-project-folio-page2.png`
  - `enhanced-03b-single-project-folio-nexusgg.png`
  - `enhanced-04-achievement-with-image-uxplosion.png`
  - `enhanced-05-achievement-with-image-cvr.png`
  - `enhanced-06-achievement-with-image-signallabs.png`
- Git & Safety: Zero git commit, zero git push, zero remote changes.


---

## [Phase Hero] Taushik Workspace Diorama Hero — 2026-11-14

### Intent & Scope
1. Implement the focused hero section redesign matching the supplied workspace diorama reference layout within Taushik's authentic white-and-red brand system (`#FFFEFD` canvas, `#C91F2B` primary red, `#171515` ink text).
2. Integrate the centered editorial intro: `"Hi, I'm Taushik"` (with Taushik in signature red) and `"UI/UX designer & product builder creating thoughtful digital experiences"`.
3. Center the transparent 2.5D workspace diorama illustration using responsive `<picture>` WebP sources (`640w`, `960w`, `1092w`).
4. Mount top-right verified social shortcuts (LinkedIn and `taushikok@gmail.com`) with 44px accessible touch targets and proper mobile spacing.
5. Provide a restrained left vertical navigation rail (`Home`, `Work`, `Honors`, `Contact`) that cleanly maps to active 3D room camera hotspots (`hidden md:flex`).
6. Deliver a bottom scroll cue button `"SCROLL TO MY ROOM ↓"` that smoothly transitions window scroll to the existing interactive WebGL room (`#room`, `scrollY = 1080px`).
7. Strictly avoid introducing any second `<Canvas>` or external scroll engines (GSAP/Lenis). Ensure zero horizontal overflow across all tested viewports.

### Files Modified & Created
- `src/components/hero/TaushikHero.tsx` — Complete re-implementation conforming to the workspace diorama layout specification.
- `src/components/mascot/HeroScrollContainer.tsx` — Extended target routing to handle `"journey"` $\to$ `setSelectedTarget("wardrobe")`.
- `src/components/room/RoomHero.tsx` — Renamed section container ID to `id="room"` to resolve duplicate DOM ID collisions.
- `public/hero/workspace/*` — Installed `taushik-workspace-diorama.webp`, `960.webp`, `640.webp`, and `master.png`.
- `scratch/verify_workspace_diorama_hero.js` — Automated Chrome DevTools Protocol visual QA test runner across 6 viewports.
- `docs/PHASE_HERO_WORKSPACE_IMPLEMENTATION_REPORT.md` — Comprehensive phase documentation and metrics report.

### Verification & Metrics
- `tsc --noEmit`: 0 errors.
- `npm run build`: Compiled successfully via Turbopack (0 errors, 5 static routes, 2 dynamic routes).
- Production daemon running live on `http://localhost:3000`.
- Verified across 6 viewports:
  - `1440x900` (Desktop): Diorama $1092\text{w}$ WebP loaded, left rail visible, 0px overflow.
  - `1366x768` (Laptop): Diorama $1092\text{w}$ WebP loaded, left rail visible, 0px overflow.
  - `1024x768` (Tablet Landscape): Diorama $960\text{w}$ WebP loaded, left rail visible, 0px overflow.
  - `768x1024` (Tablet Portrait): Diorama $960\text{w}$ WebP loaded, left rail visible, 0px overflow.
  - `390x844` (Mobile): Diorama $640\text{w}$ WebP loaded ($75\text{ KB}$), rail collapsed, header clear of social shortcuts, 0px overflow.
  - `375x667` (Mobile Small): Diorama $640\text{w}$ WebP loaded ($75\text{ KB}$), rail collapsed, 0px overflow.
- Interaction checks:
  - "SCROLL TO MY ROOM" button smoothly scrolls to `scrollY = 1080px` entering the interactive WebGL room.
  - Left rail "Work" bookmark smoothly targets the Projects Book on the desk.
- Git & Safety: Zero git commit, zero git push, zero remote changes.

---

## [Phase Spatial UX] Interactive Phone Close-up, Single-Folio Book & Certificate Images — 2026-11-15

### Intent & Scope
1. **Interactive Phone View (Contact Experience)**:
   - Bring the phone closer to the camera and scale it up ($1.65\times$) when selected, elevating it $+0.22\text{m}$ from the desk to simulate physically picking up the phone.
   - Expand the in-display OLED screen to `w-[380px] h-[690px]` with larger font sizes, high-contrast badges, dynamic island, bio, contact channels (`taushikok@gmail.com`, `+91 89192 37170`, LinkedIn, GitHub), and clear `PUT DOWN PHONE (ESC)` affordances.
   - Calibrate camera to intimate close-up `cameraPosition: [-1.25, 1.05, -1.36]`, `FOV 28`, and `mobileDistanceMultiplier: 1.0`.
2. **Projects Book (Single Folio Page Only)**:
   - Conforming to user feedback, eliminate the left-page Table of Contents / Index spread that split focus.
   - Show ONLY a single project page at one time (`data-testid="single-project-folio"`), centered across the open book.
   - Feature large Playfair serif title, tagline, description, production stack badges, deliverables box with red checkmarks, and direct live app link.
   - Add page-flip transitions on "NEXT PROJECT" and "PREV PROJECT" and interactive folio jumper pills (`01` through `07`).
3. **Achievements Section (Verified Certificate Images)**:
   - Incorporate verified high-resolution certificate and award images (`/achievements/uxplosion.png`, `/achievements/cvr.png`, `/achievements/signallabs.png`, `/achievements/scientclg.png`) directly into `SpatialAchievementCard.tsx`.
   - Implement an archival two-column showcase: certificate in clean archival matte frame with "VIEW FULL RESOLUTION" link on the left, and verified honor narrative, host, headline, and metrics grid on the right.
4. **Consistency**:
   - Align the visual presentation across Projects, Experience, and Achievements with tactile paper textures, brass pushpin/washi tape motifs, and crisp native HTML typography.

### Files Modified & Created
- `src/components/room/roomInteractionTypes.ts` — Calibrated phone camera closer (`[-1.25, 1.05, -1.36]`, `FOV 28`) and book camera (`[-2.32, 1.34, -1.48]`, `FOV 29`).
- `src/components/room/objects/DeskPhone.tsx` — Added smooth $1.65\times$ scale interpolation on selection, $+0.22\text{m}$ elevation, enlarged OLED display (`distanceFactor: 0.16`), and top status bar close button.
- `src/components/room/objects/BookPages.tsx` — Re-engineered into a single-folio project page showing only one project at a time with 3D page flip animation.
- `src/components/room/objects/ProjectsBook.tsx` — Symmetrically adapted for the single-page folio spread.
- `src/components/room/objects/SpatialAchievementCard.tsx` — Integrated real certificate images with archival frame, award pill, and full-resolution link.
- `scratch/verify_all_enhancements.js` — Automated Chrome DevTools Protocol test runner.

### Verification & Metrics
- `npx tsc --noEmit`: 0 errors.
- `npm run build`: Compiled successfully via Next.js Turbopack (0 errors, 5 static routes, 4 dynamic routes).
- Production daemon running live on `http://localhost:3000`.
- Automated CDP tests passed:
  - Phone: `found: true, width: 380, height: 690, hasCloseBtn: true`. Verified text readability and scrolling.
  - Book: `foundSingleFolio: true, hasLeftSpreadIndex: false, currentProjectTitle: 'Dev Atlas'`. Verified page flip to 'Abtalks Landing Redesign' and single project isolation.
  - Achievements: `hasImage: true, imgSrc: '.../uxplosion.png'`, `imgSrc: '.../cvr.png'`, `imgSrc: '.../signallabs.png'`. Verified certificate rendering.
- Saved screenshots:
  - `enhanced-01-phone-large-and-close.png`
  - `enhanced-01b-phone-scrolled-inside.png`
  - `enhanced-02-single-project-folio-page1.png`
  - `enhanced-03-single-project-folio-page2.png`
  - `enhanced-03b-single-project-folio-nexusgg.png`
  - `enhanced-04-achievement-with-image-uxplosion.png`
  - `enhanced-05-achievement-with-image-cvr.png`
  - `enhanced-06-achievement-with-image-signallabs.png`
- Git & Safety: Zero git commit, zero git push, zero remote changes.


