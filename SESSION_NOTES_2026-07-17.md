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

### One open review item (not a confirmed fix — flagged, awaiting user go)
- Hard-refresh scope: the other session flagged that `maps/index.html`'s hard refresh
  may clear service workers/caches across the whole `acrscrolls.com` origin, and noted
  the "same" concern for `loadmaps/app.js` / `load/load.js`. Load Maps' refresh was
  written scoped (deletes only `loadmaps-` caches, uses `.update()` not unregister), so
  it may not apply there. No code touched — logged for review only, pending user approval.

### Cross-suite status
- Full 2026-07-17 status refresh (all Load apps, live versions) lives in
  `MASTER_BACKLOG.md` → "2026-07-17 STATUS REFRESH".
- Load Maps dark features still waiting on setup: Cloudflare **D1** (hazards + restroom
  ratings) and **`ANTHROPIC_API_KEY`** (Ask / smart Find). Free, no card.
