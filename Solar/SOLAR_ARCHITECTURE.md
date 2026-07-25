# ACR Solar — Modular Architecture (Stage 2, candidate)

Permanent architectural requirement (locked by user 2026-07-25): the solar and
prayer systems are **decoupled, platform-independent modules**. The Prayer Engine
never talks to Safari; it dispatches to a pluggable Notification Provider.

## Modules (all plain, offline, deterministic — no network, no AI)

| File | Responsibility | Depends on |
|---|---|---|
| `solar-engine.js` | NOAA astronomical calculator: civil dawn, sunrise, solar noon, sunset, civil dusk. Returns absolute UTC instants. | — |
| `timezone-manager.js` | IANA timezone resolution, DST detection, formatting, device-vs-GPS mismatch. Never a bare UTC offset. | Intl |
| `location-manager.js` | Home/Manual/Automatic-Travel modes, priority resolution, 10 km travel detection, fail-safes (default Coimbra, never invent coords). | — |
| `prayer-engine.js` | Turns solar events into a prayer schedule from anchors + offsets. Emits data + metadata; hands schedule to the provider. | solar-engine |
| `notification-provider.js` | Provider abstraction: Web (real, foreground-only) + Native/Android/iOS/Future stubs + NotificationManager dispatch. | — |
| `solar-diagnostics.js` | Assembles the full diagnostics data object. | tz-manager |

## Data flow
```
Location Manager ─▶ (active lat/lon/tz)
                      │
Timezone Manager ─────┤
                      ▼
              Solar Engine ─▶ UTC solar events ─▶ Prayer Engine ─▶ schedule
                                                       │              │
                                              Countdown (display)   Notification
                                                                     Manager ─▶ active Provider
                                                       │
                                                  Diagnostics (reads all of the above)
```

## Source of truth
After production approval, **every** prayer timestamp originates from the Solar
Engine. No AI, no cached tables, no hardcoded dates, no estimates.

## Status (Stage 2)
- These are **candidate** modules. The existing production scheduler in
  `index.html` (`getSunTimes`) is **unchanged** and still active. Nothing here
  drives production prayer times yet.
- Cutover happens only after full validation + in-browser integration testing.

## Mathematical source
NOAA Solar Calculator equations (Jean Meeus, *Astronomical Algorithms*, 2nd ed.).
Refraction −0.833° (sunrise/sunset), −6° (civil twilight); optional elevation dip;
polar day/night returned explicitly (never a fabricated time).

## Verified in this environment (Node, deterministic)
Individual events, travel simulation (9 legs, 0 stale timestamps), extreme
latitude/polar (Tromsø polar day/night), DST transitions, IANA timezone handling,
old-vs-new comparison, prayer schedule + countdown + provider dispatch, location
mode priority + travel detection + fail-safe. See the Stage 2 report.

## NOT verifiable in this environment (no browser / GPS / iOS)
Live GPS acquisition, `watchPosition`, service-worker runtime, offline launch on
device, notification delivery, background/resume behaviour, and DOM rendering.
These are marked unverified and require on-device testing.

## Known platform limitation (documented, not worked around)
iOS Safari PWAs **cannot** fire scheduled local notifications at a future prayer
time while the app is closed — no web API provides OS-level background alarms.
The Web Notification Provider reports `backgroundAlarms: false` and fires
foreground-only notifications. A future native iOS/Android provider (stubbed)
would set `backgroundAlarms: true` without any change to the Solar or Prayer engines.
