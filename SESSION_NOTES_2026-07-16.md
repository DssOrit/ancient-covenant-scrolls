# Session notes — 2026-07-16

Load Maps (`/loadmaps`) build day. Continued the free/no-key innovation tranche
and the revised "no Groq, limited AI" plan, then worked the roadmap 1–6.

## Current state
- Branch: `claude/load-progress-check-v9mrb4` (reset to `origin/main` after each
  squash-merge; commit identity `noreply@anthropic.com`).
- Latest `main` after merges: PR #660 (`052d44a`) — all of today's PRs merged
  (#654, #655, #659, #660).
- Cache marker progression today: `loadmaps-v20` → **v24**.
- Nothing uncommitted.

## Built today (chronological, all Load Maps)
1. **Rain radar overlay** (RainViewer, keyless) — PR #654, merged (`dd02876`). v21.
2. **Reach isochrone + GPX import/export + elevation profile** — PR #654 (same). v21.
   - Reach: Valhalla `/isochrone` 15/30/45-min zones by travel mode.
   - GPX: export current route/pins, import a track (start/end + elevation).
   - Elevation: inline sparkline from a route's own waypoint elevations.
3. **Nearest-on-route, speed/ETA/reroute, D1 hazards, NL find** — PR #655, merged
   (`0ee630b`). v22.
   - Nearest-on-route: in-browser point-to-segment math (no library); "On route"
     button finds nearest fuel/EV/food/water/rest/toilets along the route.
   - Speed-limit warning (Overpass maxspeed vs GPS), live ETA pill, reroute around
     a reported hazard (Valhalla `exclude_locations`). All pure logic, no AI.
   - Shared hazard layer on **Cloudflare D1** — `functions/api/loadmaps/hazards.js`
     + `schema.sql`. DARK until a D1 binding named `DB` exists.
   - Natural-language "Find it on the map" — `ai.js` `mode:'parse'` returns a JSON
     intent, client acts with Photon/Overpass. DARK until `ANTHROPIC_API_KEY` set.
     One Claude Haiku call, no Groq.
4. **Offline map packs (PMTiles + OPFS)** — PR #659, merged (`a2ac1da`). v23.
   - "Offline maps" Home card. Import a `.pmtiles` file once, stored on-device via
     OPFS (free, no Cloudflare storage). Live map uses it as base with no signal via
     vendored `loadmaps/vendor/pmtiles/pmtiles.js` (npm pmtiles@3.2.1) on MapLibre.
     Raster packs are the supported offline base. Manage/use/delete, storage estimate.
5. **AR heads-up walk** — PR #660 (open). v24.
   - "AR walk (camera)" on the live guide: full-screen back camera + big arrow to the
     next waypoint + live distance + compass. getUserMedia + DeviceOrientation
     (`webkitCompassHeading`, alpha fallback) + Geolocation. Built iPad-first because
     iPad/iPhone Safari has NO immersive WebXR — the planned WebXR/A-Frame path would
     render nothing on the user's device. User chose this approach.

Roadmap 1–6 complete.

## Outstanding / to verify on iPad
- Confirm cache badge reads **v24** on device once Pages deploys.
- Live things only provable on device / Cloudflare: WebGL vector + offline pmtiles
  render, RainViewer/Valhalla/Overpass/Photon/Open-Meteo network paths, AR camera +
  compass, GPX file save/open, OPFS persistence.

## Dark features waiting on the user (no rush)
- **Shared hazards:** create D1 (`npx wrangler d1 create loadmaps`), bind it as `DB`
  in Pages → Functions, apply `functions/api/loadmaps/schema.sql`. Until then the app
  stays local-only, silently.
- **NL find + Ask assistant:** set `ANTHROPIC_API_KEY` (optional `AI_MODEL`, default
  Claude Haiku) in Pages env. Until then plain search still works.

## Decisions logged
- AR built as camera heads-up (not WebXR/A-Frame) — user selected, 2026-07-16.
- Hazard layer on Cloudflare D1 (not Supabase); routing on Valhalla (not ORS) — both
  per the revised plan; corrected from the pasted stack table.

## Capability gaps this session
- CDNs (unpkg, jsdelivr) blocked via the agent proxy (403). npm registry IS allowed —
  vendored pmtiles via `npm pack pmtiles@3.2.1`.
- Sandbox has no WebGL / camera / OPFS / device sensors — all live paths verified on
  device; logic verified in node + headless Chromium (`headless_shell`, dump-dom).
- GitHub MCP briefly disconnected mid-session, reconnected.

## Today's commit log (oneline, Load Maps)
- 052d44a Load Maps: AR heads-up walk (camera + compass arrow) (#660)
- a2ac1da Load Maps: offline map packs (PMTiles + OPFS) (#659)
- 0ee630b Load Maps: nearest-on-route, speed/ETA/reroute, D1 hazards, NL find (#655)
- dd02876 Load Maps: rain radar, reach isochrone, GPX, elevation profile (#654)
