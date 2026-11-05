# 3D Room — Environment and Interaction Specification

## Purpose
The room is the homepage/hero's signature visual environment. It should represent the owner's actual bedroom/workspace and creative process. It is a 3D architectural interior, not an illustrated scene or a game level.

## Known spatial brief
The owner supplied this arrangement:
- **Left:** cupboards.
- **Corner:** laptop workstation with laptop stand, keyboard, mouse, fishbowl, hanging quotes and a plant.
- **Right:** door, window and bed.

Exact room dimensions, wall/floor finishes, furniture sizes, window orientation and reference photographs are not currently available. Do not describe inferred dimensions or furniture as verified facts. Ask for photos/measurements if the precise room replica becomes important; otherwise create a clearly art-directed interpretation that obeys the relative layout.

## Composition
- Use an architectural cutaway / open-front room composition so the visitor can see inside.
- Initial camera: carefully framed three-quarter view showing the entire layout.
- Avoid extreme perspective and toy-like miniature proportions.
- Preserve spatial relationships: cupboards left, workstation in corner, bed/door/window on right.
- The desk/laptop area is the main focal point.
- The room itself should remain predominantly white/neutral; the website's red identity appears in restrained details and HTML controls.

## Environment details
### Cupboards (left)
Use realistic cabinet proportions, door thickness, seams, handles/hinges where visible, material variation and believable contact shadows. A designated compartment/door can act as an optional experience/achievement archive trigger.

### Workstation (corner; key focal area)
Include a desk, laptop, laptop stand, keyboard, mouse, fishbowl, plant and hanging quote cards. Give objects believable dimensions and placement. The laptop should read clearly as a real laptop with screen, hinge, keyboard and stand. The keyboard and mouse must be positioned naturally. The bowl should use transparent glass and water materials with a small fish if performance permits. Fish motion must be subtle, not distracting. Use a believable plant silhouette and realistic paper/framed quote details.

### Right side
Include a realistic door, framed window/glass and bed. Use fabric geometry/materials that suggest folds and thickness, without excessive simulation. Natural light from the window should help shape the room. The door may be an optional contact-section trigger; contact must also be reachable in normal navigation.

## Asset production strategy
1. Build a proportionally correct greybox/blockout first.
2. Review camera framing and furniture placement before details.
3. For the final scene, prefer custom Blender models exported as GLB or detailed, properly licensed assets.
4. Procedural Three.js geometry may be used for small custom details, bevels, trim, handles and simple props, but not as a shortcut for a final photorealistic room made entirely of primitive boxes.
5. Record source, author, licence and modifications for every third-party model, texture, HDRI or font.
6. Optimise GLB assets, geometry and textures. Avoid large uncompressed textures and unnecessary mesh complexity.
7. If Blender or a credible asset pipeline is unavailable, stop at a labelled greybox and report the limitation rather than falsely claiming realistic final quality.

## Interaction model
3D interactions are optional discovery affordances, never the only way to use the portfolio.

- **Laptop:** focus/push-in transition; opens selected work or scrolls to Work.
- **Cupboard:** subtle designated door animation; opens experience/achievement archive.
- **Door:** subtle opening or transition; opens Contact.
- **Quote cards:** hover/focus reveals full quote if needed; quote content must be verified and unattributed unless a source is verified.
- **Fishbowl/plant:** decorative ambient motion only. Do not add click actions without a clear purpose.

Use a small number of accessible hotspots. Each hotspot needs a semantic HTML control, accessible name, keyboard focus, touch target and visible focus state. Provide matching normal navigation links.

## Rendering and performance
- Load the 3D scene lazily; the first visible HTML content and navigation must render without waiting for it.
- Supply a lightweight poster/static fallback.
- Use React Three Fiber v9 (`@react-three/fiber` v9.8.2 + `@react-three/drei` v10.7.9 + `three` v0.187.0) with `<Canvas frameloop="demand">` for static scenes, rendering only while a visible camera transition or user interaction is active.
- Cap device pixel ratio based on device class; do not blindly render at full native DPR on mobile.
- Limit real-time shadow-casting lights. Consider baked lighting/lightmaps where suitable.
- Pause expensive scene updates when the scene is not visible or the tab is backgrounded.
- Dispose geometries, materials, textures, render targets, event listeners and controls correctly.
- Handle resize and context loss gracefully.
- Respect `prefers-reduced-motion`: present a stable composition and disable nonessential camera/parallax motion.
- Do not force audio or capture microphone/camera input.

## Mobile strategy
Mobile is a deliberate alternate composition, not a squeezed desktop scene. Use a simpler camera/framing, lower detail/texture resolution and fewer animated objects. Keep controls touch-friendly. If WebGL performance or support is poor, show a carefully composed static room scene with working HTML links.

## Acceptance checks
- Room layout matches the left/corner/right specification.
- Camera shows all essential room zones at initial desktop load.
- Furniture and props have convincing relative scale and placement.
- No obvious intersecting meshes, floating furniture, z-fighting or clipping.
- Hotspots have accessible HTML equivalents.
- Scene does not prevent navigation if WebGL fails.
- No continuous render loop for a fully static scene.
- Assets have documented licences and reasonable file sizes.
