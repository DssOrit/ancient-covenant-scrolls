# Session notes — 2026-07-17

## Current state
- Branch: `claude/acr-search-content-checklist-ZgUAQ`
- Latest `main` HEAD: `c17c3ae` — PR #693 (ACR Maps touch scroll fix, acr-maps-v18)
- ACR Maps cache: **acr-maps-v18**
- Load Studio cache: **loadstudio-complete-v253**
- Nothing uncommitted. Branch is clean.

---

## Built today

### Morning block — Load Studio emergency fixes

1. **PR #687 — Scope hard refresh across all three PWAs**
   Root cause: `hardRefresh()` in `maps/index.html`, `loadmaps/app.js`, and `load/load.js`
   called `caches.keys()` and `getRegistrations()` with no scope filter — wiping every
   SW and cache on the origin. ACR Reader's SW and `acr-v81` cache were destroyed after
   a Maps hard refresh on iPhone.
   Fix: filtered `caches.keys()` to each app's own prefix and `getRegistrations()` to
   each app's own scope path. Added locked rule #21 to CLAUDE.md. Added standard scoped
   template to HANDOFF.md.
   Files: `maps/index.html`, `loadmaps/app.js`, `load/load.js`, `CLAUDE.md`, `HANDOFF.md`.

2. **PR #688 — Load Maps CARTO raster fallback fix**
   MapLibre auto-init was failing silently. Switched default to CARTO raster tiles.

3. **PR #689 — Load Studio hard refresh scope + network-first SW nav**
   a. Scoped the inline `onclick` hard refresh in `loadstudio/index.html` and both
      `hardRefresh()` functions in `loadstudio/lseditor.js`.
   b. Fixed "Safari can't open the page" on cold open: SW was cache-first for
      navigation with an empty cache, returning `undefined` from `respondWith()`.
      Changed to network-first with cache fallback. Bumped to `loadstudio-complete-v252`.

4. **PR #690 — Load Studio SW redirected-response fix (v253)**
   `/loadstudio` (no trailing slash) → 301 to `/loadstudio/`. SW intercepted navigation,
   `fetch()` followed redirect returning `res.redirected===true`. Browsers reject this
   from SWs for navigation. Fixed with `clean()` helper (re-wraps body as `new Response()`
   to strip redirected flag). Same pattern already in `maps/sw.js`. Bumped to v253.
   User confirmed working after re-saving to home screen.

### Afternoon block — ACR Maps Layer 4

5. **PR #691 — ACR Maps Layer 4: 7 ancient covenant geography places (v16)**
   Added to `maps/acr_places.json` (`places` array):
   - `eg-goshen` — Goshen, Egypt (Africa, history)
   - `sd-meroe-kush` — Meroe/Kush, Sudan (Africa, history)
   - `iq-nineveh` — Nineveh, Iraq (Mesopotamia, history)
   - `iq-babylon` — Babylon, Iraq (Mesopotamia, history)
   - `il-qumran-cave4` — Qumran Cave 4, Israel (Israel, discovery)
   - `il-masada` — Masada, Israel (Israel, resistance)
   - `eg-cairo-geniza` — Cairo Geniza, Egypt (Africa, archive)
   Added Mesopotamia region pill to `maps/index.html`. Bumped to `acr-maps-v16`.
   Note: places initially landed in `genetic_corridors` array — corrected via Python
   before PR was opened.

6. **PR #692 — ACR Maps ancient covenant geography route + route field wiring (v17)**
   Added route `ancient-covenant-geography` ("Ancient Covenant Geography — Primary Sites")
   to `routes` array in `acr_places.json`. All 7 Layer 4 places wired with
   `"route": "ancient-covenant-geography"` so "View Full Route" amber button appears
   in place detail sheets. `distance_km: 0` triggers global route display (no
   distance/time, wider fitBounds). Bumped to `acr-maps-v17`.

### Evening block — ACR Maps touch scroll fix

7. **PR #693 — Enable touch scroll on region and layer bars (v18)**
   Root cause: `#region-bar` and `#layer-bar` both had `pointer-events:none` on the
   container. The individual pills had `pointer-events:all` for taps, but iOS needs
   the container to receive touch events to register the horizontal swipe/scroll gesture.
   Fix: removed `pointer-events:none` from both containers. Map touches above the bars
   still pass through — the containers' height is only the pill row height (no top padding),
   so nothing above the bars is blocked. Bumped to `acr-maps-v18`.
   User confirmed: fixed on iPad and iPhone.

---

## Completed this session

- CLAUDE.md rule #21 locked (scoped hard refresh)
- HANDOFF.md standard scoped hard refresh template added
- Load Studio fully working on home screen (cold open + redirect fix)
- ACR Maps Layer 4 complete: 7 places, 1 route, Mesopotamia region pill
- ACR Maps region/layer bars now horizontally scrollable on iOS
- ACR Maps build plan: **complete** (no remaining backlog items)

---

## Outstanding / to verify on device

- ACR Maps: use gold refresh button to pick up `acr-maps-v18`, then verify
  region bar and layer bar swipe left/right on iPad and iPhone.

---

## Pending / parked

- **Load Maps dark features** (waiting on Cloudflare setup by user):
  - Shared hazards: user must create D1 database, bind as `DB` in Pages → Functions.
  - NL find: user must add `ANTHROPIC_API_KEY` to Pages env for `loadmaps`.
- **Load Studio backlog**: LS-Backend (wire drawer items), LS-2 (import wiring),
  LS-3 (stock library), LS-MKT-1 (sample marketplace).
- **Load Main large roadmap** (not started): X-AI-PROVIDERS, X-AI-CHAT-STUDIO,
  X-VIDEO-AI, X-AI-AUDIO, X-DB, X-SUBS.

---

## Capability gaps this session

- Live deployed URL (`dssorit.github.io`) not reachable from sandbox.
- Use gold refresh button or `raw.githubusercontent.com` to verify deployed state.

---

## Today's commit log (oneline)

```
c17c3ae fix(maps): enable touch scroll on region and layer bars (v18) (#693)
101c4d5 feat(maps): Ancient Covenant Geography route + v17 (#692)
f81faac feat(maps): Layer 4 — ancient covenant geography (7 places, v16) (#691)
ddd2cd5 fix(loadstudio/sw): strip redirected-response flag for navigation requests (#690)
9394a80 fix(loadstudio): scope hard refresh + network-first nav SW + rule 21 (#689)
5450a33 fix(loadmaps): use CARTO raster by default — drop MapLibre auto-init (#688)
dde193e fix: scope hard-refresh to each app's own SW and caches only (#687)
```
