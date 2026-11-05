# Technical Stack and Agent Skills

## Approved Architecture Baseline
The repository audit and workspace preparation verified the existing application dependencies and established the approved technical baseline.

### Final Technical Choices

| Capability | Approved Solution | Implementation Rules |
|---|---|---|
| **Framework & Runtime** | Next.js 16.2.6 (Turbopack, App Router) + React 19.2.6 | Retained in place; preserve clean static generation and zero type errors. |
| **3D Environment** | React Three Fiber v9 (`@react-three/fiber` v9.8.2) + Drei v10 (`@react-three/drei` v10.7.9) + Three.js (`three` v0.187.0) | Dynamically imported (`ssr: false`); on-demand rendering (`frameloop="demand"`). Zero peer conflicts verified. |
| **Animation System** | `framer-motion` (latest) | Sole animation library. Do not introduce GSAP. Unused `"motion"` package to be pruned. |
| **About Wave Typography** | Inline SVG paths + `<textPath>` + semantic HTML layer | Pure SVG/CSS on white background. WebGL and canvas text are strictly prohibited. |
| **Audio Playback** | Native HTML5 Audio (`public/audio/fitoor.mp3`) | Retained for interactive navbar player; preload set to `"none"`. Autoplay prohibited. |
| **Styling & Design Tokens** | Tailwind CSS v4 + CSS custom variables | White dominant background (`#FFFFFF`), red signature accent (`#C91F2B`), near-black ink (`#171515`). |
| **3D Asset Pipeline** | Custom Blender / Licensed GLB + glTF-Transform | Draco/meshopt compression; documented credits/licences. |

### Core Runtime Dependencies

- **React Three Fiber v9**: https://github.com/pmndrs/react-three-fiber (3D scene graph & lifecycle)
- **Drei helpers v10**: https://github.com/pmndrs/drei (camera controls, GLTF loaders, environment helpers)
- **Three.js**: https://github.com/mrdoob/three.js (WebGL rendering engine)
- **Framer Motion**: https://github.com/motiondivision/motion (UI choreography, layout animations, scroll progress)
- **glTF Transform**: https://github.com/donmccurdy/glTF-Transform (3D mesh and texture optimization)

*(Note: GSAP is explicitly not adopted to avoid competing animation loops and redundant bundle overhead).*

Only add what the repository and approved implementation phase need. Check compatibility and package versions before installation.

## Agent skill sources

These are GitHub repositories containing `SKILL.md` agent instructions. They are not application dependencies.

1. **Anthropic Frontend Design** — visual direction, typography, distinctive non-template UI:
   https://github.com/anthropics/skills/tree/main/skills/frontend-design

2. **SoftwareInFocus Three.js skill** — scene/camera/lighting/GLTF/performance workflows:
   https://github.com/SoftwareInFocus/threejs-skills/tree/main/agent-skills/web-design/threejs

3. **SoftwareInFocus Awwwards-quality site skill** — composition and higher-craft site workflows:
   https://github.com/SoftwareInFocus/threejs-skills/tree/main/agent-skills/web-design/build-awwwards-quality-sites

4. **Ponytail Senior Engineering Skill** — enforces minimal code, YAGNI, standard library / platform native features over extra dependencies, zero unnecessary abstractions, and root-cause fixes:
   Local repository: `c:\Users\TNEX\OneDrive\Desktop\portcomp\ponytail-main\skills\ponytail`

5. **Vercel React Best Practices** — React/Next.js performance, dynamic code splitting, and bundle size optimization:
   https://github.com/vercel-labs/agent-skills/tree/main/skills/react-best-practices

*(Note: GSAP skill modules are omitted since GSAP is not adopted).*

## Official / primary technical documentation

- Antigravity project instructions (`AGENTS.md`)
- React Three Fiber docs: https://r3f.docs.pmnd.rs/
- Drei docs: https://drei.docs.pmnd.rs/
- Three.js docs: https://threejs.org/docs/
- Framer Motion docs: https://motion.dev/docs
- SVG `<textPath>`: https://developer.mozilla.org/en-US/docs/Web/SVG/Element/textPath
- `prefers-reduced-motion`: https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion

## Engineering principle
The best stack is the smallest stack that safely delivers the approved design. Do not add a dependency before explaining the problem it solves and confirming compatibility with the repository.
