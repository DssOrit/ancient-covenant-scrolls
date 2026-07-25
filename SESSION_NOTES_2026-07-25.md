# Session Notes — 2026-07-25

## Current state
- main HEAD: 3ce2a03 (Merge PR #763).
- ACR Solar candidate modular engine is on main as DISABLED candidate
  infrastructure. Selector default mode is legacy. NOAA is OFF. Production
  prayer times still come from the existing getSunTimes scheduler in
  Solar/index.html. No production calculation was changed.
- Nothing uncommitted of substance beyond this notes file.

## Built today (chronological)
- PR #722 (merged): ACR Reader + ACR Search service workers hardened with a
  3.5s network timeout + redirect-strip, matching Load Maps. Fixes iPhone
  "server stopped responding" white-screen on open.
- PR #761 (merged, device-verified): ACR Solar equation-of-time sign fix.
  Solar-noon line changed from + EqT/60 to - EqT/60. Coimbra sunrise now
  06:25 (was ~06:12). Sign-fix only; no NOAA cutover combined in.
- PR #764 (merged, device-verified): ACR Solar service-worker cache cleanup
  scoped to the acr-solar- prefix so the activate step can no longer delete
  other apps' caches.
- PR #763 (merged): ACR Solar Stage 2 + Phase 2 — decoupled candidate modules
  (solar-engine, timezone-manager, location-manager, prayer-engine,
  notification-provider, solar-diagnostics), the diagnostics.html test page,
  SOLAR_ARCHITECTURE.md, and solar-selector.js (the single legacy/compare/noaa
  engine-selection layer). Additive only: index.html gained 7 module script
  tags + a comment; sw.js bumped acr-solar-v33 -> v34 and precaches the new
  files. Preserves the #761 minus-EqT line and the #764 scoped cleanup.
  NOAA disabled; default legacy.

## Phase 3 verification (real browser, puppeteer-core + bundled Chromium)
- 0 page errors; only benign console noise (a 404 for a missing icon asset and
  blocked external font CDNs). No JS exceptions.
- All 7 module globals load as objects; production getSunTimes still present.
- Selector default = legacy; invalid setMode ignored; no localStorage /
  sessionStorage writes.
- Legacy vs NOAA displayed-time deviation = 0 min across Coimbra, Singapore,
  Sydney, New York today. Far-longitude day-shift flag behaves as designed
  (correct time-of-day; raw-UTC calendar-day artifact is legacy-only).
- diagnostics.html renders fully (events, diagnostics, prayers, compare
  tables). Countdown updates on a single 1s interval. GPS-denial handled
  gracefully (alert shown, schedule survived). Manual city switch recomputes.
- SW: 1 registration, cache acr-solar-v34 holds all 11 candidate resources.
  Seeded foreign cache (acr-reader-test-CANARY) survived activation — scoped
  cleanup deletes only acr-solar-* caches.

## Outstanding / device-verification-pending
- Real iOS GPS acquisition / watchPosition on device.
- Notification delivery on device (iOS Safari cannot fire background alarms
  while closed — documented, not worked around).
- Offline cold launch on device.
- iPad Safari rendering + timezone/DST behavior for production index.html
  (getDSTHours reads the device timezone).
- These do NOT block the merged candidate (it is dormant), but MUST be verified
  on iPad before any future NOAA cutover.

## Pending / parked
- NOAA cutover: NOT approved. Selector stays on legacy until the user
  explicitly approves enabling NOAA after device verification.

## Content work earlier in session
- ACR Study: removed Similitudes / Book of Parables / chapters 74-108 /
  removed-Melchizedek / false-deity quiz content from study/content/file_14.json
  and file_15.json, and removed the matching debunk FAQ (PR #711, merged).

## Capability gaps this session
- Live Pages URL (dssorit.github.io) not directly fetchable; verified via git /
  GitHub MCP and raw content instead.
- Browser runtime verification required installing puppeteer-core in /tmp and
  driving the bundled Chromium at /opt/pw-browsers/chromium-1194.

## Backups
- backup/2026-07-25-pre-solar-stage2 @ 1746161
- backup/2026-07-25-pre-763-rebase

## Today's commit log (oneline)
- 3ce2a03 Merge pull request #763 (ACR Solar Stage 2 candidate modules)
- e2e967b ACR Solar Phase 2: engine-selection layer (legacy/compare/noaa)
- f70e8ad ACR Solar Stage 2 (rebased): candidate modules, production intact
- c0bd6a6 Merge pull request #764 (SW cache isolation)
- 314d055 ACR Solar: scope service-worker cache cleanup to Solar caches only
- 4d7d665 Merge pull request #761 (equation-of-time sign fix)
- 16ed0e5 ACR Solar: fix equation-of-time sign error
- 1746161 Merge pull request #762 (lock all repo sites behind unlock phrases)
