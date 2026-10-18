# LOAD Survival | Part 1: Functional PWA Foundation

This is a functioning static, installable, offline-first Progressive Web App, not a mockup. It is the first module of a multi-part project. Source code is included and requires no build step, paid API, database or external JS runtime.

## Included
- Mobile-first responsive UI and original generated visual concept preview.
- Region selection for the United States, Portugal or universal guidance.
- Emergency directory (911 US / 112 Portugal); no claim of current official alerts.
- Six emergency scenario guides with phase-based steps.
- Ten safety-conscious skill lessons with clickable step navigation, citations and completion state.
- Local preparedness checklist saved in browser localStorage.
- Battery energy calculator with explicit assumptions.
- Installable web manifest, SVG icon and offline service worker for app files.
- No third-party trackers, login or external data transfer.

## Deployment instructions for Claude (upload and deployment only)
1. Extract the ZIP and preserve the directory layout. The web root must contain index.html.
2. Upload **all** files to any static HTTPS hosting service such as Netlify, Cloudflare Pages, GitHub Pages or Vercel static hosting. Do not reconstruct or rewrite the app.
3. Configure index.html as the default document. For GitHub Pages, deploy the contents under the desired Pages root.
4. Test with a modern mobile browser. Navigate to several pages while online, enable airplane mode, reopen the installed PWA and verify existing lessons load.
5. For each subsequent part, merge files according to that part's CHANGELOG. Do not delete users' localStorage data.
6. If you see a blank page, inspect browser console for loading errors, and verify paths / cache refresh. Do not use file:// as the deployment origin.

## Local development
From the extracted folder, run `python3 -m http.server 8080` then visit `http://localhost:8080` (localhost permits service workers). For real installations use HTTPS.

## Verification / limitations
- Current emergency alerts, local hazards, and regional evacuation routes are **not** integrated. The PWA explicitly says this.
- Lesson content is a baseline for further expert review. It is not a clinical or safety certification and does not constitute individualized guidance.
- Geographic profile changes the emergency directory; full region-specific lesson branching and Portuguese translation are **not** yet implemented.
- The wide illustration is a concept preview, not a literal depiction of implemented screens; actual screens are built in HTML/CSS.
- Interactive illustrations, animations, advanced filtration modules, detailed grid-building diagrams, security audit tools, and extensive long-term survival material belong in future parts.

## Next-build modules
Part 2: Water, food, sanitation, first aid instructional illustrations and multi-step content.
Part 3: Solar, battery, backup electricity, shelter and safe outdoor fire training.
Part 4: Non-confrontational home security, rural property resilience, evacuation planners and family profiles.
Part 5: Portuguese translation, U.S./Portugal regional hazard branching, content review and additional accessibility.
Part 6: Offline media packs, QA, licensing, analytics opt-in and production release hardening.

## Safety source references
- CDC emergency water: https://www.cdc.gov/water-emergency/about/
- Ready.gov emergency planning: https://www.ready.gov/plan
- US NWS: https://www.weather.gov/
- Portugal Proteção Civil: https://prociv.gov.pt/
- Portugal IPMA: https://www.ipma.pt/
- FoodSafety.gov outage guidance: https://www.foodsafety.gov/food-safety-charts/food-safety-during-power-outage

## Ownership
This source package may be extended under the LOAD brand. Dependencies: none. The generated image is an original concept visual provided in the package.
