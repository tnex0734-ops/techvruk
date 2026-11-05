# About Section — Flowing Ribbon Typography Specification

## Visual references
- `references/about-wave-reference.png`: layered, flowing wave/ribbon paths with multilingual characters distributed around and along the waves.
- `references/about-type-grid-reference.png`: modular typographic specimen, mixed scale/weight/orientation and editorial grid.

Study the composition principles; do not trace, reproduce or directly copy either reference. The site palette remains white and red. Do not reproduce the rainbow palette or the purple background.

## Main statement
Use the owner's requested statement as the central typographic message:

> I am a self-taught product designer and product builder.

Preserve this wording unless the owner explicitly revises it. Supporting phrases may include:
- SELF-TAUGHT
- PRODUCT DESIGNER
- PRODUCT BUILDER
- IDEAS INTO EXPERIENCES
- DESIGN THROUGH CURIOSITY
- BUILD WITH INTENT

These phrases should support the main statement, not compete with it. Do not turn them into unsupported credentials or claims.

## Composition
- White background.
- Three or four intentional red ribbon paths with an organic S-curve rhythm.
- One dominant path carries the main biography.
- Secondary thinner paths create depth and rhythm.
- Use a restrained monochrome red family (primary/deep/soft red) plus white and near-black.
- Use selected outlined, vertical, oversized or small-caps typography as accents, inspired by the second reference's typographic variety.
- Keep ample negative space so the graphic has a clear silhouette and does not become a crowded typographic collage.

## Correct technical approach
Use inline SVG paths and `<textPath>` for text that follows curves. Keep the primary biography as selectable, semantic HTML elsewhere in the DOM (or an accessible equivalent) so screen readers and text selection do not depend on SVG rendering alone.

Do not use WebGL, Canvas text rendering, rasterised text, or a large pre-rendered image for the central biography. Text must remain sharp at all viewport sizes.

## Typography treatment
- Text must follow the path naturally without distorted glyphs.
- Adjust path length and font size rather than squeezing or stretching characters.
- Avoid collisions, awkward wraps and unreadable curve angles.
- If the full sentence is too long for one curve at a given viewport, divide it into carefully composed phrase segments while preserving the exact sentence in the accessible text layer.
- Ensure sufficient contrast between text and ribbon surface.
- Any engraved/embossed look must remain subtle: small offset highlight/shadow or restrained SVG filter only if legibility remains excellent.

## Motion
Use restrained, optional motion:
- gentle path/shape reveal;
- typography reveal along the path;
- slight secondary line drift or scroll-linked parallax.

Do not continuously move the main text. It must remain stable and readable. Respect `prefers-reduced-motion` and provide a still composition.

## Responsive behaviour
Create a deliberate mobile composition, not just a scaled desktop SVG. Recompose curves, phrase placement and negative space for narrow screens. Ensure no clipping or horizontal overflow.

## Acceptance checks
- Main statement is readable at desktop and mobile sizes.
- Text genuinely follows a vector path.
- Artwork uses only the intended white/red/ink palette.
- No pseudo-script or inaccurate non-English characters.
- The section does not depend on JavaScript or WebGL to expose the biography.
- Reduced-motion users receive a polished static state.
