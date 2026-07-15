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
  per-country emergency numbers, proper PWA icons + favicon.
- Next: turn cards for driving, report button, gas/rest/tolls per route,
  arrival/reroute chimes.

**Stage 3 — online extras (need a signal)** — sources researched, see below.

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
