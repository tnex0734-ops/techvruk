# Codex Prompt Library — Run One Phase at a Time

**Do not run all prompts at once.** First complete and review `CODEX_FIRST_PROMPT.md`. Replace bracketed notes with facts from the audit. Read the relevant docs and the implementation log at the start of every phase.

## Prompt 02 — Design foundation

Read `AGENTS.md`, `docs/DESIGN_SYSTEM.md`, the accepted repository audit and `docs/IMPLEMENTATION_LOG.md`.

Implement only the approved design-system foundation and semantic section structure. Follow the existing framework and project conventions. Do not build the 3D scene yet. Do not rewrite project content. Add design tokens, typography, responsive container/spacing rules, focus states and the minimal navigation/section skeleton required by the approved architecture. Preserve existing routes and working links. Do not install a new library unless the audit approved it and you explain why.

Run the relevant lint, typecheck, tests and build. Inspect desktop and mobile screenshots. Update the implementation log. Report exact changed files and test results. Stop for review.

## Prompt 03 — About ribbon typography

Read `docs/ABOUT_WAVE_SPEC.md`, `docs/DESIGN_SYSTEM.md` and the implementation log. Inspect the two reference images in `references/`.

Implement only the About section. Create an original white/red ribbon composition with three or four SVG paths. Put the exact biography “I am a self-taught product designer and product builder.” along the dominant path using SVG `<textPath>`. Use supporting phrases only as typographic accents. Use semantic HTML for the accessible biography. Keep the palette red/white/ink; do not copy the reference artwork. Make desktop and mobile compositions deliberately responsive. Add restrained reveal motion only if useful, with a stable reduced-motion state. Do not use WebGL in this section.

Run checks, inspect screenshots at desktop/tablet/mobile sizes, fix clipping/overflow/readability, update the implementation log and stop for review.

## Prompt 04 — Room greybox only

Read `docs/ROOM_3D_SPEC.md`, the accepted audit and implementation log. Confirm the exact app framework and approved 3D architecture first.

Build only a proportionally coherent 3D room blockout: cupboards at left; workstation in a corner; door, window and bed at right. Add a three-quarter open-front camera composition. Use temporary greybox geometry only. Focus on spatial correctness, dimensions, camera and composition; do not add fine detail, complex materials, fancy postprocessing or interactions yet. Clearly label placeholders in code and status reporting. Keep normal navigation visible and functional without WebGL.

If the repository cannot support the approved rendering approach or if an asset workflow is missing, stop and report the blocker rather than scaffolding a new app. Run relevant checks and provide screenshots. Update the implementation log and stop for review.

## Prompt 05 — Room asset and lighting pass

Read `docs/ROOM_3D_SPEC.md` and the approved greybox review. Replace approved placeholders with detailed custom or properly licensed models. Work from verified room photos/dimensions if supplied. If not supplied, preserve relative layout and label the result as an art-directed interpretation, not a faithful measured replica.

Add appropriate PBR materials, controlled daylight, contact shadows and restrained ambient animation. Optimise assets and textures. Record every external asset's source, author and licence in `docs/ASSET_CREDITS.md`. Do not add unsupported decorative items. Do not add click interactions yet.

Run performance smoke checks and inspect screenshots. Update the implementation log and stop for review.

## Prompt 06 — Room interaction pass

Read `docs/ROOM_3D_SPEC.md` and the approved room asset review. Implement only the approved meaningful interactions:
- laptop → Selected Work;
- designated cupboard → Experience/Achievements;
- door → Contact.

Use semantic buttons/links, accessible names, keyboard focus and touch interactions. 3D interactions must be optional; standard navigation must always reach each destination. Keep fishbowl/plant motion decorative. Add reduced-motion behaviour and disable/pause expensive scene updates when not visible. Verify resource cleanup and WebGL fallback.

Test desktop mouse, keyboard and mobile touch. Update the implementation log and stop for review.

## Prompt 07 — Selected Work and Experience redesign

Read the accepted content inventory, `docs/DESIGN_SYSTEM.md`, `docs/CONTENT_AND_ASSET_AUDIT.md` and implementation log. Redesign only Selected Work and Experience/Achievements using verified existing content. Use editorial variation and real project imagery. Do not fabricate project details, metrics or project screenshots. Keep case-study destinations working. Make the cupboard-to-archive connection optional and understandable.

Run content-link checks, responsive checks and project scripts. Update the implementation log and stop for review.

## Prompt 08 — Contact and final integration

Read project docs and implementation log. Make Contact direct, accessible and functional. Use the door metaphor only as a visual transition; preserve ordinary navigation and contact actions. Integrate section transitions and navigation without scroll hijacking. Test external links, email links, resume downloads and form submission where applicable. Preserve existing email service/environment configuration; never print secrets.

Run the full existing quality checks. Inspect all sections and responsive states. Update the implementation log and stop for review.

## Prompt 09 — Release readiness

Perform a final audit only after all implementation phases have been approved. Test the production build, lint, typecheck, tests, link integrity, console errors, keyboard navigation, reduced motion and responsive layouts. Inspect WebGL fallback, asset licensing, file sizes, memory cleanup and deployment configuration. Do not deploy or push unless explicitly instructed.

Produce a release report with Pass/Fail/Not tested and evidence. List all known limitations honestly. Do not claim a perfect Lighthouse score or passing test unless measured.
