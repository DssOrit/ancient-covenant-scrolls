# Session notes — 2026-07-17

## Map sites — all fixes up to date (user-noted 2026-07-17)

Both map sites are current and merged to `main`:
- **Load Maps** `/loadmaps` — cache **`loadmaps-v33`**. All fixes shipped and merged
  (map-first dark redesign, favicon, cameras, fuel prices, restrooms, stale-version
  loading fix + iPhone loading safeguard).
- **ACR Maps** `/maps` — cache **`acr-maps-v18`**. Fixes from the concurrent session
  merged (Leaflet switch/vendor, iPhone tile + z-index/stacking fixes, gold refresh,
  searchbar safe-area, isolation fix).

Per user: **all fixes are up to date for the Map sites.**

### Hard-refresh scope bug — FIXED (verified on main 2026-07-17)
The origin-wide hard-refresh bug is resolved. Each app's refresh now scopes to its own
service worker + caches, so a refresh in one app no longer wipes the others:
- **ACR Maps** (`maps/index.html`): unregisters only its own `/maps/` SW and deletes
  only `acr-maps-` caches.
- **Load** (`load/load.js`): deletes only `load-` caches (uses `.update()`, not unregister).
- **Load Maps** (`loadmaps/app.js`): only `loadmaps-` caches — was already scoped.

### Cross-suite status
- Full 2026-07-17 status refresh (all Load apps, live versions) lives in
  `MASTER_BACKLOG.md` → "2026-07-17 STATUS REFRESH".
- Load Maps dark features still waiting on setup: Cloudflare **D1** (hazards + restroom
  ratings) and **`ANTHROPIC_API_KEY`** (Ask / smart Find). Free, no card.
