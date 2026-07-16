# Load Maps — living build plan

Load Maps is an offline-first route and trail guide for iPad (and any device),
matching the look and voice-feel of the popular navigation apps, in the Load Maps
neon-on-black brand. It guides you along curated routes and to saved places, speaks
the next step aloud (default voice **Samantha**), warns about hazards, and works with
**no signal**. It uses live data when a connection is available.

App folder: `/loadmaps`. Worldwide by design — Portugal is simply the first content.

## Core principles

- **Offline-first, online when available.** Nothing core needs a signal. Live extras
  update when online, then show the last copy offline.
- **Honest data only.** Destination coordinates are real and checkable. Hazards and
  trail waypoints are only shown where verified. Guessed safety data is never presented
  as fact. Waypoints not yet walked are marked **approx**.
- **Worldwide.** A place or route is just data (name, coordinates, notes). Any country
  can be added over time. Emergency number, units and language adjust per place.

## Stages

**Stage 1 — the offline core (this build)**
- Catalog of ~48 major places across Portugal, Spain, UK, France, Italy, Greece — real
  coordinates, "guide me there" (live distance + compass direction + voice), local
  emergency number.
- Sete Lagoas as the first fully-guided route: waypoints, elevation, comfort mode,
  spoken hazard warnings, live "nearest waypoint / distance to next".
- Emergency 112 card with live coordinates.
- How to Use with instant search.
- Auto loading intro + brand splash (from the supplied splash pack).
- PWA: installable, offline service worker (`loadmaps-v1`).

**Stage 2 — in progress**
- Done: favorites ("Save" + Saved filter, on device), prep checklist per route
  (tickable, saved), speedometer on the live guide, share place / share plan,
  per-country emergency numbers, proper PWA icons + favicon, a driving route
  (Coimbra to Sete Lagoas: road sections, fuel/stops, tolls, comfort mode),
  report button (offline hazard log shown in Alerts), arrival/waypoint chimes,
  hard-refresh circle re-renders the current view.
- Next: proper street-level turn cards (needs Stage 3 map data), gas/rest live
  search.

**UX pass (dyslexia-friendly)**
- Home screen with big glassy Drive / Hike / Places / Alerts / How-to cards so
  road vs trail maps are obvious. Bottom nav: Home, Drive, Hike, Places.
- Real imagery: the supplied trail maps show on the hike route and the road maps
  on the drive route, in a swipeable gallery with tap-to-enlarge (`loadmaps/routes/`).
- Modern transparent glass styling (blur, subtle borders), readable type, plain
  labels. Cache `loadmaps-v6`.
- Route images use runtime caching (cached after first online view), not the
  install list, to keep install light.

**Map stack (all free / no key):** Leaflet + **OpenFreeMap** vector tiles (via
self-hosted MapLibre, with an OSM-raster fallback if WebGL is unavailable) +
**Valhalla** multi-modal routing (drive / walk / cycle, keyless public server) +
**Photon** geocoding (search anywhere). Esri satellite layer as a toggle.

**Stage 3 — the live map (in progress)**
- Done: real scrolling map (Leaflet, self-hosted in `vendor/leaflet/`) with an
  OpenStreetMap streets layer and an Esri satellite layer (toggle), the route drawn
  on it (polyline + colored waypoint markers), live "you are here", recenter, zoom.
  Opens from any route, any place, and a Home "Live map" card. Tiles load online
  (attribution shown); offline still uses the coordinate guide + cached route images.
- Done (free/no-key tranche, 2026-07-16): rain radar overlay (RainViewer, keyless,
  freshest frame, toggle button); reachability "Reach" isochrone (Valhalla keyless
  /isochrone, 15/30/45 min contours coloured by time, follows the active travel
  mode); GPX export (current route or dropped pins -> downloadable .gpx with
  waypoints + track + elevation) and GPX import (view any .gpx track, start/end
  markers, auto-fit, elevation profile if the track carries ele); elevation profile
  panel for guided routes (uses each route's own waypoint elevations — climb, range,
  distance + inline area sparkline). Cache `loadmaps-v21`.
- Done (smart tranche, 2026-07-16, cache `loadmaps-v22`):
  - **Nearest-on-route** ("On route" button): in-browser spatial math (point-to-
    segment distance, no library) finds the nearest fuel / EV / food / water /
    rest / toilets along the open route and marks the closest + how far off-route.
  - **Speed-limit warning**: throttled Overpass `maxspeed` lookup vs GPS speed;
    the speed pill turns red and Samantha says "slow down" when over. Works on
    guided routes and live map navigation. Pure logic, no AI.
  - **Live ETA**: a map ETA pill recomputes remaining time + distance from the
    drawn route as you move; nudges to re-route when you drift off it.
  - **Reroute around a hazard**: reporting a Hazard/Closure/Animal while navigating
    re-runs Valhalla with that point excluded (`exclude_locations`).
  - **Shared hazard layer (Cloudflare D1, dark)**: `functions/api/loadmaps/hazards.js`
    + `schema.sql`. Reads/writes a D1 table bound as `DB`; until the binding exists
    it returns `{configured:false}` and the app stays local-only, silently. When on,
    reports post to the shared layer and nearby hazards show as pins on the map.
  - **Natural-language find (one Haiku call, dark)**: `ai.js` gains a `mode:'parse'`
    that returns a small JSON intent; the client ("Find it on the map") acts on it
    with plain logic — geocode a place via Photon and open it, or find a facility
    category on the route / near a place. Dark until `ANTHROPIC_API_KEY` is set.
- Done (offline packs, 2026-07-16, cache `loadmaps-v23`): **Offline maps** screen
  (Home card). Import a `.pmtiles` map file once; it is stored on the device via
  OPFS (free — no Cloudflare storage, nothing uploaded). The live map then uses it
  as the base with no signal, via a vendored `pmtiles` protocol on MapLibre
  (`loadmaps/vendor/pmtiles/pmtiles.js`). Manage packs (size, use, delete), storage
  estimate shown, graceful session-only fallback where OPFS is unavailable. Raster
  `.pmtiles` are the supported offline base (vector needs a matching style). The
  "Satellite/Map" button returns to live tiles when an offline base is active.
  Verified: library loads + exposes PMTiles/Protocol/FileSource, app boots clean,
  pack-list + byte-format + OPFS-fallback logic pass; live WebGL tile render proves
  out on device with a real pack.
- Done (AR walk, 2026-07-16, cache `loadmaps-v24`): **AR heads-up walk** — an
  "AR walk (camera)" button on the live guide opens a full-screen back-camera view
  with a large arrow that points to your next waypoint plus the live distance and
  compass label. Uses getUserMedia + DeviceOrientation (true compass heading on iOS
  via `webkitCompassHeading`, alpha fallback elsewhere) + Geolocation. **No WebXR** —
  the planned WebXR/A-Frame path does not render on iPad/iPhone Safari, so this is
  the iPad-first equivalent (user chose this, 2026-07-16). Graceful fallbacks: no
  camera -> arrow still points; no compass permission -> north-up arrow. Verified:
  bearing/rotation math, next-waypoint selection, heading conversion, and a clean
  app boot with the AR overlay; live camera + compass prove out on device.

**Roadmap 1-6 complete.** Two features are "dark" pending your setup: shared
hazards (Cloudflare D1 binding `DB`) and natural-language find (`ANTHROPIC_API_KEY`).

**Stage 3 sources (need a signal)** — researched, see below.

**Keys to switch on (Cloudflare Pages env — never in the repo)**
- **Fire watch:** set `FIRMS_KEY` to a free NASA FIRMS map key. The function is
  `functions/api/loadmaps/fire.js`; until the key is set it stays silent.
- **AI assistant (limited):** set `ANTHROPIC_API_KEY` (optional `AI_MODEL`, default
  Claude Haiku). One small Haiku call per request — near-zero cost, no Groq.
  The function is `functions/api/loadmaps/ai.js`; until the key is set the
  "Ask Load Maps" screen shows "not set up yet".
Both keep the key server-side; nothing sensitive is committed.

**Revised direction (2026-07-15, user): no Groq, limited AI.** Almost everything
is pure open-source logic (zero AI): predictive rerouting around reported hazards
(Valhalla), speed-limit warnings (Overpass speed data vs GPS speed), auto ETA
recalculation, smart typo-tolerant search (Photon), Turf.js spatial ("nearest fuel
on my route"). The ONLY AI is a single Claude Haiku call to parse ambiguous
voice/text input. Hazard layer: build on Cloudflare D1 (one-repo/infra), not
Supabase.

**Stage 3 fire watch + Stage 5 AI assistant** are wired (client + Cloudflare
functions), waiting only on the keys above.

**Stage 4 — innovative gaps**
- Car-to-trail handoff, auto check-in, route packs, battery-saver guidance, landmark
  photos, group mode.

## Live-data sources (researched for Portugal / Europe)

| Feed | Verdict | Source / note |
| --- | --- | --- |
| Maps (online + offline) | Build on it | Protomaps / PMTiles regional pack on **Cloudflare R2** (no bandwidth fees). Renders online and offline. |
| Weather | Free & solid | Open-Meteo, no key. Free tier is non-commercial; attribution required. |
| Fire watch | Free (key) | NASA FIRMS / EFFIS. Detected heat ~3h behind — early warning, not official closure. |
| GPS position | Free | Browser Geolocation. Works offline. |
| Voice (Samantha) | Works, caveat | Web Speech API, on-device, offline. iOS may not always honour a forced voice; en-US default is usually Samantha. |
| Fuel prices | With a catch | Portugal DGEG portal; non-commercial, no official API. Curated stations are the reliable fallback. |
| "Near me" search | With a catch | OpenStreetMap Overpass/Nominatim; strict limits, online only. Curated stops offline. |
| Road closures / live traffic | Weak | No reliable free feed for Portugal. Use curated notes + a user Report button. |

Any API key lives in Cloudflare env, never in the repo.

## How to add a place or route

- **Place (catalog):** add an entry to `LM.places` in `loadmaps/data.js` — name, area,
  country code, real `lat`/`lng`, one-line blurb.
- **Guided route:** add to `LM.guided` — waypoints with `lat`/`lng`, `elev`, optional
  `hazard` (`level` + `text`), and set `approx:true` until the points are walked.
- **Curated alert note:** add to `LM.notes` (`level` + title + body).

## Files

- `loadmaps/index.html` — app shell, intro + splash, views.
- `loadmaps/app.js` — logic (GPS, voice, guidance, search, nav).
- `loadmaps/data.js` — places, guided routes, alerts, How-to content.
- `loadmaps/sw.js` — offline service worker (`loadmaps-v1`).
- `loadmaps/manifest.webmanifest` — installable PWA.
- `loadmaps/icon.png` — home-screen icon.
- `loadmaps/splash/` — iOS launch images (supplied splash pack).

## Honest limits (unchanged)

- Guides along curated routes, not worldwide auto-routing to any address.
- Follows a route and tells you when you are off it; it does not recompute a brand-new
  route the way the big apps do.
- Live road closures have no reliable free feed; handled by curated notes + Report.
