# Content and Asset Audit Rules

This document is a checklist for the first repository audit. It is not a statement that these items have already been found in the repository.

## Content inventory
Inspect the actual code and data files to locate:
- Name, role, headline and biography.
- Project list, descriptions, roles, dates, technologies and links.
- Case studies and their sections.
- Employment/experience details and dates.
- Competition achievements, certificates and awards.
- Skills and tools.
- Contact details and social URLs.
- Résumé/CV assets and download links.
- Testimonials, metrics or client details, if any.

For each field, record its source file and whether it is verified. Never infer or invent missing information.

## Asset inventory
Inspect `public/`, `assets/`, `src/assets/`, image imports and other media locations as applicable. Record:
- Filename and format.
- Pixel dimensions and file size.
- Where it is used.
- Whether it is original, licensed, stock, generated or unknown.
- Whether it is still relevant.
- Whether it needs responsive variants or optimisation.

Do not delete or overwrite original assets during the audit.

## Keep / replace / verify decisions
Classify each existing component/content group as:
- KEEP: useful and technically sound.
- REDESIGN: content is useful, but visual/interaction treatment should change.
- REFACTOR: functionality should remain, but implementation needs improvement.
- REMOVE: demonstrably obsolete or duplicated; requires reason.
- VERIFY: ownership, accuracy, source or use is unclear.

## Third-party asset policy
- Verify licence and usage rights before adding 3D models, textures, HDRIs, fonts, icons, illustrations or photos.
- Keep attribution/credits where required.
- Do not scrape assets from other portfolio websites.
- Do not use reference screenshots as final production assets.
- Do not invent room photographs or claim generated scene assets are photographs of the owner's actual room.
- Prefer original custom assets or clearly licensed assets.

## Secrets and privacy
- Never print `.env` values, API keys, tokens, private email credentials or other secrets.
- Do not include secrets in the audit report or ZIP pack.
- Preserve existing environment variable names and functionality without exposing values.
