# Design System — White / Red Editorial

## Design intent
The site should feel precise, confident, contemporary and crafted. It should not resemble a generic dark developer portfolio. White space and typography carry most of the identity; red is the signature accent.

## Initial colour tokens
Treat these as starting tokens to validate against the existing brand/assets, not as immutable values:

| Token | Value | Intended use |
|---|---|---|
| `--color-bg` | `#FFFFFF` | Main page background |
| `--color-bg-soft` | `#F8F7F7` | Quiet section separation |
| `--color-red` | `#C91F2B` | Primary signature accent |
| `--color-red-deep` | `#971724` | Strong red emphasis / depth |
| `--color-red-soft` | `#FCEBED` | Very restrained tinted surfaces |
| `--color-ink` | `#171515` | Primary text |
| `--color-muted` | `#706B6B` | Secondary text |
| `--color-line` | `#E9E2E3` | Borders and dividers |

Do not turn every section red. Do not introduce unrelated purple, cyan, neon gradients or rainbow palettes. The 3D room itself should use believable neutral materials, with restrained red accents in selected desk objects, printed details or site UI.

## Typography
Audit current font assets and licenses before changing font loading. Choose:
- One expressive display family for large headings.
- One highly legible text family for paragraphs and UI.
- Appropriate fallbacks for any non-Latin script that is deliberately used.

Geist, Space Grotesk or another suitable contemporary sans-serif may be evaluated, but do not add a font merely because it is fashionable. Verify visual fit, readability, available weights and licensing.

Use a clear type scale, strong hierarchy, short readable line lengths and deliberate tracking. Avoid all-uppercase body paragraphs and excessive tiny labels.

## Layout
- Use a consistent responsive container and spacing scale.
- Prioritise whitespace and alignment.
- Avoid excessive rounded cards and glass panels.
- Use hairline borders and subtle surface contrast sparingly.
- Keep core text as selectable HTML, not baked into images or WebGL.
- Keep a consistent max-width for long-form case-study copy.

## Interaction design
- Every interactive control has a clear purpose and visible focus/hover/active states.
- Use restrained transitions; do not animate every element.
- Navigation remains visible/usable without the 3D canvas.
- No forced audio, forced intro, scroll hijacking or cursor replacement that blocks normal interaction.
- On touch devices, no feature may rely on hover alone.

## Section-specific visual rules
- Hero: immersive room, neutral daylight, clear name/role and accessible navigation.
- About: bold red ribbon paths and legible curved type on white.
- Work: editorial project layouts, real screenshots and factual metadata.
- Experience: clear chronological structure, not decorative pseudo-data.
- Contact: simple, direct, high-contrast and functional.
