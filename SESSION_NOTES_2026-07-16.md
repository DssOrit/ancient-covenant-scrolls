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

## Continuation (same day, evening) — Load Maps map-first redesign + fixes + restrooms

Shipped after the morning block (Load Maps cache v20 -> **v32**, now **v33** on main):

- **v25** hard-refresh circle now clears cache + updates (like other Load apps) (#663)
- **v26** cleaner tab favicon (emblem, no text) (#665)
- **v27** speed cameras (Overpass) + real elevation on any route (Open-Meteo) (#670)
- **v28** live fuel prices — Spain live, Portugal best-effort, keyless server fn (#673)
- **v29** dark live-map redesign in the ACR Maps style: OpenFreeMap dark + on-map
  search + region pills + category legend pins (#676)
- **v30** map-first shell: app opens straight into the dark map; menu moved to a
  slide-out drawer; sections return to the map (#677)
- **v31** fix stale-version loading (SW network-first for the app shell) + one-time
  reload on SW update + dark/repositioned zoom buttons (#679) — user-verified "fixed"
- **v32** clean-restrooms finder (OSM badges: baby-change/step-free/free/women's;
  + D1 star ratings dark) + iPhone loading safeguard (SW 3.5s network timeout ->
  cache fallback, stops "server stopped responding" on VPN) (#683)

### Load Maps outstanding
- **Set up Cloudflare D1**: `npx wrangler d1 create loadmaps` -> bind as `DB` in Pages
  Functions -> apply `functions/api/loadmaps/schema.sql`. Turns on BOTH hazards and
  restroom ratings. Free, no credit card.
- Still dark until AI key: Ask Load Maps + smart Find (`ANTHROPIC_API_KEY`).
- Location + on-device storage need a **non-Private** Safari tab; category/camera/
  restroom pins load for the **current map view** (zoom in first).
- **2026-07-17:** other session flagged a hard-refresh scope bug in `maps/index.html`
  and (per its note) `loadmaps/app.js` / `load/load.js` — verify Load Maps' refresh
  only clears its own `loadmaps-` caches (it was written scoped) before any change.

### Backups
- `backup/2026-07-16-loadmaps-v31` (verified-working state).
- `backup/2026-07-16-loadmaps-v32` (latest after restrooms + safeguard).

## Today's commit log (oneline, combined — Load Maps + ACR Maps)
```
ef91b07 fix(maps): isolate Leaflet stacking context structurally (v13) (#686)
cb52106 fix(maps): raise UI z-indices to 9000+ to clear Leaflet stacking context (#685)
7757e57 ACR Maps: Vendor Leaflet locally — eliminate CDN dependency (#684)
4458242 Load Maps: clean-restrooms finder + iPhone loading safeguard (#683)
c744052 ACR Maps: Fix white screen — move Leaflet JS to end of body, drop adapter (#682)
6bad1be ACR Maps: Add gold hard-refresh button to topbar (#681)
23e1518 ACR Maps: Switch to Leaflet — fixes map on iPhone (#680)
(Load Maps evening also: #663 refresh, #665 favicon, #670 cameras, #673 fuel,
 #676 dark redesign, #677 map-first, #679 loading fix — see continuation above)
94ec605 ACR Maps: Fix map tiles not loading on iPhone (#678)
052d44a Load Maps: AR heads-up walk (camera + compass arrow) (#660)
a2ac1da Load Maps: offline map packs (PMTiles + OPFS) (#659)
0ee630b Load Maps: nearest-on-route, speed/ETA/reroute, D1 hazards, NL find (#655)
dd02876 Load Maps: rain radar, reach isochrone, GPX, elevation profile (#654)
```
