# Implementation Plan — Phase Gates

No phase should start until its prerequisites and acceptance checks are clear. Keep implementation incremental and reviewable.

## Phase 0 — Read-only repository audit
**Changes allowed:** documentation/report only, and only if the owner approves writing audit notes into the repo.

Inspect structure, framework, content, assets, scripts, routing, current interactions, deployment and existing checks. Identify reuse/refactor/replace decisions. Report uncertain facts separately. Do not install packages or modify application code.

**Gate:** Owner reviews the audit and confirms the architecture plan.

## Phase 1 — Design foundation
Establish tokens, typography, container widths, spacing, component conventions, navigation and semantic section skeletons. Do not build the 3D scene yet.

**Gate:** Screenshot review of desktop and mobile design foundation.

## Phase 2 — About ribbon artwork
Implement the About section as responsive SVG + semantic HTML. Validate curve geometry, type readability, contrast, responsive layout and reduced-motion static state.

**Gate:** Owner approves typography art direction before room implementation expands.

## Phase 3 — 3D room blockout
Build only room geometry, camera, major furniture silhouettes and composition. Use temporary greybox assets and label them as placeholders. Confirm left/corner/right arrangement and desktop/mobile framing.

**Gate:** Owner approves room layout and camera before detailed modelling/assets.

## Phase 4 — Room assets and lighting
Replace blockout assets with custom or licensed, detailed models. Add realistic materials, controlled lighting and carefully scoped ambient motion. Optimise GLB/textures.

**Gate:** Visual review and performance smoke test before adding interactivity.

## Phase 5 — Meaningful interactions
Implement laptop → Work, cupboard → Experience/Achievements, door → Contact. Provide semantic HTML navigation alternatives and keyboard/touch functionality.

**Gate:** Test each interaction on desktop, keyboard and mobile.

## Phase 6 — Work, Experience and Contact redesign
Redesign selected-work/project archive and experience/achievement timeline using verified repository content. Keep case studies factually intact and redesign selectively. Make contact straightforward and functional.

**Gate:** Content accuracy and all links verified.

## Phase 7 — Integration and responsive refinement
Check section transitions, global navigation, mobile layouts, loading states, fallbacks, reduced motion, keyboard and touch behaviour.

**Gate:** Full-page review at agreed viewport sizes.

## Phase 8 — Production verification and handoff
Run repository checks, browser tests, broken-link checks and performance inspection. Inspect production build and deployment configuration. Document 3D asset credits/licences, setup, architecture and known limitations.

**Gate:** No release until required checks pass or known blockers are explicitly accepted.

## Iteration protocol
For each phase:
1. State the exact goal and files expected to change.
2. Inspect relevant code and constraints.
3. Implement the smallest coherent change.
4. Run relevant checks.
5. Inspect the browser result/screenshots.
6. Fix regressions.
7. Update `docs/IMPLEMENTATION_LOG.md`.
8. Report changes, commands/results, remaining risks and next gate.

Never claim completion based only on source-code inspection when browser verification is required.
