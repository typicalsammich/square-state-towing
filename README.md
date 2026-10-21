# Square State Towing website

Dependency-free, static multipage website. Node 20+ is needed only to generate, validate, or preview it; the deployed website needs no Node server.

```powershell
npm run build
npm run check
npm run dev
```

Preview: http://127.0.0.1:4189 . Stop with Ctrl+C. `dist/` is the complete deployable artifact. There is no install step and no framework bundle.

## Edit

- `business.mjs`: centralized business details, services, cities, photography, origin, cinematic configuration.
- `build.mjs`: reusable layouts and unique page content. Generates 22 indexable HTML pages, 404, sitemap, and robots.
- `dist/style.css`: responsive visual system, typography, motion preferences.
- `dist/app.js`: menu, area selector, gallery dialog, request preparation, optional video lifecycle.
- `dist/assets/`: local optimized images and licensed fonts. Keep these source assets and CSS/JS when regenerating; `build` replaces generated HTML, not the entire directory.

## Contact integration

Calls and email links are functional. The form intentionally prepares a summary locally, supports copying it, and opens an email draft. It sends no request, stores no personal details, and never reports delivery. An email application is required to open the draft.

For server submission, implement a real HTTPS endpoint with server-side validation, abuse/rate controls, email or CRM delivery, error handling, logging minimization, and appropriate retention. Change the form copy and privacy policy only after actual delivery is verified. `formEndpoint` is reserved for future configuration; setting it alone does not implement submission. No service-booking or dispatch API is configured.

## Cinematic implementation

Current experience: a 1.2-second subtle reveal of authentic nighttime company photography. Navigation, text, and calls work immediately. The photo is the hero throughout; there is no unrelated scene cut or artificial loading sequence. Motion is disabled for reduced-motion preferences and subsequent same-tab home visits.

Optional footage: set `cinematic.video` to a local authorized video path, `poster` to its matching final frame, and optionally `audio` to a separately licensed sound file. Build again. The player provides a skip button, remembers skipping in local storage, limits playback to six seconds, catches playback failure, stops when hidden, bypasses mobile/save-data/slow connections, and respects reduced motion. Sound requires an explicit button click. A matching final poster is essential to avoid a visual jump. These optional media paths are not populated or claimed tested with real footage.

## Deployment

Sites identity and `dist` output are saved in `.openai/hosting.json`. Preserve the project ID on future updates. Push source and use the Sites source/version workflow for publishing; keep the audience private unless the owner requests otherwise.

For Vercel: import the source directory, choose Other, use `node build.mjs` as the build command and `dist` as the output directory. Set `business.origin` to the real deployed HTTPS origin before building so canonical, sitemap, Open Graph, and JSON-LD URLs are correct. Existing old paths can redirect `/about-us` to `/about`, `/testimonials` to `/reviews`, and old service/contact/gallery URLs to their new trailing-slash equivalents through the host's redirect configuration. No DNS or existing production domain was changed.

## Verification

`npm run check` checks one H1, unique titles/descriptions, canonical URLs, local asset and page references, call links, JSON-LD parseability, image alt/dimension attributes, sitemap count, and robots. It does not claim Google rich-result eligibility or replace a full accessibility audit. See `PROJECT_COMPLETION_REPORT.md` for actual browser checks and limits.
