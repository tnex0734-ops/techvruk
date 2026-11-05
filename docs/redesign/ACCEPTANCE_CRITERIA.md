# Acceptance Criteria

Use these checks throughout implementation. Mark each as Pass / Fail / Not tested, with evidence.

## Content integrity
- All existing project names, descriptions, roles, dates, links and case-study content are preserved accurately.
- All existing verified experience, awards, achievements, skills and contact details remain accurate.
- No invented metrics, client names, dates, testimonials or credentials.
- Resume and social/contact links still work.

## Visual system
- White is the dominant page background.
- Red is the recognisable accent; black/near-black is used for readable text.
- No accidental purple/neon/rainbow theme drift.
- Typography and spacing have consistent hierarchy.
- The design does not look like a generic portfolio template.
- Sections feel related without being visually identical.

## 3D room
- Left cupboards, corner workstation, right door/window/bed are clearly represented.
- The initial camera composition shows the room layout and laptop focal area.
- Furniture is grounded, scaled convincingly and not intersecting/floating.
- Materials and lighting look intentional and believable.
- Final room does not consist solely of unmodified primitive boxes.
- Third-party asset licences and credits are documented.
- No unnecessary always-on render loop.
- Resize, WebGL fallback and context/resource cleanup are handled.

## About ribbons
- The main biography is exactly: “I am a self-taught product designer and product builder.”
- The text follows SVG paths rather than being positioned as ordinary straight text.
- It remains readable at all supported sizes.
- The artwork uses white/red/ink only, with restrained tonal variation.
- Mobile has a deliberately recomposed SVG, not a clipped desktop image.
- Semantic text is available to assistive technology.
- Reduced-motion state is attractive and complete.

## Usability and accessibility
- Main nav works with keyboard, mouse and touch.
- 3D hotspots have accessible names and HTML navigation alternatives.
- No required information is available only through hover or WebGL.
- Focus indicators are visible.
- Text contrast is sufficient.
- Reduced-motion preferences are respected.
- No forced audio, camera, microphone, timed overlays or scroll lock.

## Responsive
Test at minimum:
- 1440 × 900 desktop.
- 1366 × 768 laptop.
- 768 × 1024 tablet.
- 390 × 844 mobile.

Check horizontal overflow, navigation, text wrapping, scene framing, hot-spot targets and section order.

## Engineering
- Existing project scripts and conventions are respected.
- Production build succeeds.
- Type-check/lint/tests pass where configured.
- No new browser console errors.
- No missing assets or broken links.
- No leaked WebGL resources or event listeners.
- New dependencies are justified and compatible.
- Secrets and `.env` values are not exposed or committed.

## Report format
For every phase, report:
- Pass / Fail / Not tested.
- Evidence (commands, screenshots, paths or specific observations).
- Known limitations.
- Any owner decision required.
