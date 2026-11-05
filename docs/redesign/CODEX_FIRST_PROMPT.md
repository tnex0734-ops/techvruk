# Codex Prompt 01 — Read-only repository audit

Paste this as the first task after copying the pack into the root of the existing portfolio repository.

---

You are working in my existing personal portfolio repository. Read `AGENTS.md` and all relevant documents under `docs/` before acting.

**This task is READ-ONLY. Do not modify application code, install dependencies, edit package manifests, alter deployment configuration, delete/rename assets, or make commits.**

Perform a comprehensive audit of the repository as it actually exists.

Inspect:
1. Git status and branch state (do not change either).
2. Framework, language, package manager, dependency versions and scripts.
3. Routing and page/component architecture.
4. All current portfolio sections and the source of their content.
5. Projects, case studies, experience, awards, skills, resume and contact links.
6. All public assets, images, fonts, icons and media; note formats, dimensions and likely usage.
7. Existing animation, interaction and WebGL/canvas code, if any.
8. Responsive breakpoints and current mobile behaviour.
9. Accessibility semantics, keyboard behaviour and reduced-motion handling.
10. Build, lint, typecheck and test setup.
11. Vercel/deployment configuration and any environment-variable names (never reveal values).
12. Potential performance, bundle-size, dependency and maintenance risks.

Use evidence from actual files. For each finding, include the path and relevant symbol/section where practical. Clearly label facts, inferences and unknowns. Do not infer that the app is Next.js, Vite, React or any other stack until verified.

Then evaluate the planned redesign in `docs/PROJECT_BRIEF.md` and make a repository-specific recommendation for:
- what to keep;
- what to redesign;
- what to refactor;
- what to remove only if obsolete;
- whether Three.js + React Three Fiber is compatible and justified;
- whether an existing animation library should be retained or GSAP added;
- where the 3D room should live in the app;
- how SVG About artwork should be implemented;
- which existing content/assets can be reused;
- which additional 3D assets or owner-provided room photos are required.

Return a structured audit with these sections:
A. Repository facts and architecture.
B. Content inventory.
C. Asset inventory.
D. Existing components to keep/redesign/refactor/remove/verify.
E. Compatibility and dependency analysis.
F. 3D room feasibility and asset plan.
G. About SVG implementation plan.
H. Proposed component/route architecture.
I. Risks and mitigations.
J. Exact checks to run and their current status.
K. Recommended phase order and smallest first implementation step.

Do not begin implementation after the report. Wait for my review and approval.
