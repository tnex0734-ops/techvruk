# Repository Instructions — Taushik Portfolio Redesign

## Mission
Redesign the existing personal portfolio into a polished, distinctive, accessible and performant white-and-red portfolio. The intended signature experiences are (1) a realistic interactive 3D interpretation of the owner's bedroom/workspace as the homepage/hero and (2) an expressive SVG ribbon-typography About section. Preserve all verified content and working functionality unless a deliberate replacement is implemented and tested.

## Read before changing code
At the start of a task, read:
- `docs/redesign/PROJECT_BRIEF.md`
- The relevant section specification under `docs/redesign/`
- `docs/redesign/CONTENT_AND_ASSET_AUDIT.md`
- `docs/redesign/IMPLEMENTATION_PLAN.md` when working across phases

Read the current repository before making assumptions. Existing code is the source of truth for framework, routes, content, assets, commands and deployment.

## Non-negotiable engineering rules
1. **Audit before implementation.** The first task is read-only. Do not install dependencies, modify source, or change deployment files until the audit has been reviewed.
2. **Preserve the existing application.** Do not scaffold a new app or migrate frameworks unless the audit establishes a concrete technical reason and the owner approves it.
3. **Preserve factual content.** Do not invent or silently rewrite projects, case studies, dates, experience, awards, outcomes, clients, metrics, links or contact information. If data is missing, flag it and use a clearly marked placeholder only in local development.
4. **Keep scope focused.** Implement one approved phase at a time. Do not combine a major 3D build, all section redesigns, dependency migrations and content rewrites in one change.
5. **Make small, reviewable changes.** Prefer focused commits/diffs and existing project conventions. Avoid broad refactors unrelated to the current phase.
6. **Explain material decisions.** Before adding a major dependency, describe why existing tools are insufficient, its bundle/runtime cost, compatibility and maintenance implications.
7. **No fake realism.** Primitive boxes may be used for a temporary spatial blockout only. Do not represent a primitive scene as the finished photorealistic room. Use appropriately licensed detailed GLB assets or a documented custom Blender asset pipeline.
8. **No unnecessary WebGL.** The About wave typography must be SVG/HTML/CSS, not a Three.js text scene. Project text and navigation must remain real HTML.
9. **Accessible navigation is mandatory.** 3D hotspots are supplementary. Every destination must also be reachable through ordinary semantic navigation and keyboard/touch controls.
10. **Performance is part of quality.** Lazy-load the 3D scene, provide a useful fallback, respect reduced motion, avoid unnecessary render loops, cap pixel ratio and dispose of WebGL resources.
11. **No secret exposure.** Never read secrets into logs, echo environment values, commit `.env*` files, API keys, tokens or personal credentials. Preserve existing environment-variable names without revealing values.
12. **Verify actual results.** Run the repository's existing checks and relevant browser/device tests. Never claim tests passed unless they were run and passed.

## Codex efficiency rules
- Work from the existing repository; do not ask the user to paste files that are already available locally.
- Read only relevant files and targeted ranges. Do not dump the entire repository or huge files into chat.
- Keep progress summaries concise: files changed, reason, commands run, results, remaining risks.
- Maintain `docs/IMPLEMENTATION_LOG.md` after implementation begins. Record decisions and completed verification so future sessions do not repeat discovery work.
- Ask a question only when an unknown blocks safe implementation. Otherwise make a conservative, clearly documented decision.
- Do not generate multiple design variants or duplicate components unless requested.

## Visual quality rules
- White is the dominant site background; red is the signature accent; near-black is used for readable text.
- Red is an accent, not a fill applied to every surface.
- Avoid generic dark neon, purple gradients, glassmorphism overload, random floating spheres, random 3D objects and template-like card grids.
- Typography, spacing, composition, imagery and states must be designed intentionally.
- Keep a clear hierarchy between personal introduction, selected work, case studies, experience/achievements and contact.
- Motion must clarify hierarchy or reveal content; it must not obstruct reading or navigation.

## Definition of done for every phase
- Acceptance criteria for that phase are checked.
- Relevant lint/typecheck/build/test commands are run where present.
- No known console errors or broken links are introduced.
- Responsive and keyboard behaviour are checked for affected components.
- `docs/IMPLEMENTATION_LOG.md` records what changed and what remains.
- The agent reports verified results separately from assumptions or untested items.
