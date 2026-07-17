# Session notes — 2026-07-16

Two separate build blocks today: Load Maps in the morning, ACR Maps fixes in the evening.

## Current state
- Branch: `claude/acr-search-content-checklist-ZgUAQ` (reset to `origin/main` after each
  squash-merge; commit identity `noreply@anthropic.com`).
- Latest `main` HEAD: `ef91b07` — PR #686 (ACR Maps isolation fix + searchbar safe-area).
- ACR Maps cache: **acr-maps-v14**
- Nothing uncommitted. Branch is clean.

---

## Built today — Morning block (Load Maps)
1. **Rain radar overlay** (RainViewer, keyless) — PR #654, merged. v21.
2. **Reach isochrone + GPX import/export + elevation profile** — PR #654. v21.
3. **Nearest-on-route, speed/ETA/reroute, D1 hazards, NL find** — PR #655, merged. v22.
4. **Offline map packs (PMTiles + OPFS)** — PR #659, merged. v23.
5. **AR heads-up walk** — PR #660, merged. v24.

Load Maps roadmap 1–6 complete.

## Built today — Evening block (ACR Maps)
All PRs merged into main.

1. **PR #685 — z-index fix (v12)**
   Root cause: Leaflet injects `transform:translate3d()` onto `.leaflet-map-pane` at
   runtime, creating a stacking context. Child panes (tile-pane z-index:200,
   marker-pane z-index:600) were rendering above UI elements set at z-index:100-200.
   On iPhone the entire topbar was hidden behind the tile layer.
   Fix: raised all UI overlays to z-index:9000+ range.

2. **PR #686 — Leaflet isolation + searchbar safe-area fix (v14)**
   a. DOM restructure: moved all UI overlay elements out of `#map` and made them
      direct siblings inside `#app`. Added `isolation:isolate` to `#map` — Leaflet's
      stacking context is now permanently sealed. Any future UI element added at any
      z-index will naturally sit above the map.
   b. Searchbar safe-area fix: `top:58px` did not account for
      `env(safe-area-inset-top)` (~24px on iPad). Changed to
      `top:calc(env(safe-area-inset-top,0px) + 58px)`. Same offset on
      `#search-results`.

---

## Outstanding / to verify on device
- iPad: searchbar appears as floating pill with rounded corners, separated from topbar.
- iPhone: topbar fully visible — logo, title, calendar chip, gold refresh button, hamburger.
- Both devices should be on **acr-maps-v14**. Use gold refresh button if still on old cache.

## Known bug found morning of 2026-07-17 — PENDING APPROVAL
**Hard refresh nukes all origin SWs and caches.**
`hardRefresh()` in `maps/index.html` calls `navigator.serviceWorker.getRegistrations()`
(no scope filter) and `caches.keys()` + delete all — wiping every SW and cache on the
entire `acrscrolls.com` origin. This is why ACR Reader broke on iPhone after a Maps
hard refresh: its SW was unregistered and its `acr-v81` cache deleted.
Same bug exists in `loadmaps/app.js` and `load/load.js`.
Fix: scope each app's refresh to only unregister its own SW and delete its own caches.
Waiting for user approval before touching anything.

## Pending / parked
- **ACR Maps Layer 4** — ancient covenant geography: Meroe/Kush, Cairo Geniza,
  Babylon, Nineveh, Masada, Goshen, Cave 4 at Qumran. Discussed but not started.
- **Load Maps dark features** (waiting on Cloudflare bindings):
  - Shared hazards: create D1, bind as `DB` in Pages → Functions.
  - NL find: set `ANTHROPIC_API_KEY` in Pages env.

## Capability gaps this session
- Live deployed URL (`dssorit.github.io`) not reachable from sandbox.
- GitHub MCP `list_pull_requests` returned 503 briefly.

## Today's commit log (oneline)
```
ef91b07 fix(maps): isolate Leaflet stacking context structurally (v13) (#686)
cb52106 fix(maps): raise UI z-indices to 9000+ to clear Leaflet stacking context (#685)
7757e57 ACR Maps: Vendor Leaflet locally — eliminate CDN dependency (#684)
4458242 Load Maps: clean-restrooms finder + iPhone loading safeguard (#683)
c744052 ACR Maps: Fix white screen — move Leaflet JS to end of body, drop adapter (#682)
6bad1be ACR Maps: Add gold hard-refresh button to topbar (#681)
23e1518 ACR Maps: Switch to Leaflet — fixes map on iPhone (#680)
94ec605 ACR Maps: Fix map tiles not loading on iPhone (#678)
052d44a Load Maps: AR heads-up walk (camera + compass arrow) (#660)
a2ac1da Load Maps: offline map packs (PMTiles + OPFS) (#659)
0ee630b Load Maps: nearest-on-route, speed/ETA/reroute, D1 hazards, NL find (#655)
dd02876 Load Maps: rain radar, reach isochrone, GPX, elevation profile (#654)
```
