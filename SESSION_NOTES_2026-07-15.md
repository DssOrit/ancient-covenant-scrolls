# Session Notes — 2026-07-15

## Current State

- Latest commit on main: `25c2b8d` (PR #635 squash merge)
- Cache: `acr-search-v169`, `acr-solar-v23`
- Branch: `claude/acr-search-content-checklist-ZgUAQ` (PRs #633, #635 merged, stale)
- ACR Search: Final Days DST section (v168), hard refresh button + How to Use updates (v169)
- ACR Solar: true solar time fix (v22), hard refresh button + How to Use panel (v23)
- Nothing uncommitted

## Built Today

- **PR #633 — Dani'el 7:25 / DST in Final Days + ACR Solar true solar time** (acr-search-v168 / acr-solar-v22)

  *ACR Search — Final Days panel:*
  New five-item section "Dani'el 7:25 in the Present Era — Changing the Appointed Times by Law" inserted inside the 364-Day Covenant Calendar block, before Yirmeyahu 30-31.
  1. Dani'el 7:25 (DSS confirmed, 4QDan-a/b/c) — moadim defined, fourth beast = Rome, act is not only historical.
  2. Full legal sequence: Constantine Sunday edict 321 CE; Gregorian calendar Inter gravissimas 1582; standard time zones 1880s (first clock/sun disconnect); DST 1916/1918 Germany/UK/US.
  3. What DST IS — government decree advancing the civil clock one hour from true solar time. Sun position unchanged. Clock changed.
  4. Permanent DST — Sunshine Protection Act, US Senate unanimous 2022. Removes the twice-yearly fall-back correction, making the substitution invisible and permanent.
  5. Covenant community position — Bereshit 1:14 anchors moadim to the sun; ACR Solar shows true solar time; gap between ACR Solar and government clock during DST is the government offset made visible.

  *ACR Solar — true solar time fix:*
  - `getSunTimes(date, lat, lon)` now accepts 4th parameter `utcOffset`.
  - When `utcOffset` is provided, uses it directly (no DST contamination).
  - When `utcOffset` is undefined (old localStorage data), falls back to January standard-offset calculation to strip DST.
  - Default Coimbra location: `utcOffset: 0` (Portugal WET = UTC+0 standard).
  - GPS success: `utcOffset` computed from January standard offset (strips DST).
  - GPS fallback and `resetLocation()`: `utcOffset: 0`.
  - All 4 `getSunTimes` call sites updated (renderSunView, scheduleAlerts, Shabbat sat/sun).
  - "True Solar Time" note added below sun widget — explains times shown are actual solar position, not government clock.
  - Dani'el 7:25 educational panel added — full time-change sequence, Bereshit 1:14 anchor, how ACR Solar relates to the offset.
  - CSS classes added: `.solar-true-note`, `.solar-dst-panel` and children.

## Outstanding / Blocking

- User to verify ACR Search Final Days panel: Dani'el 7:25 section appears after 1 Enoch 72-82 item, before Yirmeyahu 30-31.
- User to verify ACR Search How to Use: new "Refreshing the App" section and updated ACR Suite step 4 visible.
- User to verify ACR Solar: "True Solar Time" note, Dani'el 7:25 panel, "How to Use ACR Solar" collapsible panel all appear below sun widget.
- User to verify ACR Solar: hard refresh button (circular arrow) visible in topbar; ACR Search: same button right of journal icon.
- User to confirm Great Eraser opens (splash auto-dismisses within 2 seconds) — from prior session, not yet confirmed.
- User to verify Covenant Table section renders on iPad (ACR Search, Orit Record tab) — from prior session, not yet confirmed.

## Pending / Parked

- None from this session.

## Capability Gaps This Session

- Cannot reach live `acrscrolls.com` directly to verify deployment — must rely on user confirmation or `raw.githubusercontent.com`.
- GitHub MCP `get_file_contents` can confirm main HEAD content if needed.

## Locked Rules Applied This Session

- Rule 0 (no Western/European bias): all content presented on its own terms.
- Rule 1 (no narration during build): silent build, single end-of-build summary.
- Rule 9 (merge requires user confirmation): PR #633 waited for explicit "Merge".
- Rule 13 (source integrity): DST content anchored in Dani'el 7:25 (DSS), Bereshit 1:14 (DSS).
- No-hedging rule: DST stated directly as government substitution of the moadim, no softening.
- No-glossing rule: primary source requirements stated explicitly.

## Backups

- `backup/2026-07-15-v169` — SHA `25c2b8d` — hard refresh buttons + How to Use updates merged.
  Recovery: `git checkout backup/2026-07-15-v169`

- `backup/2026-07-15-v168` — SHA `3d85f49` — Dani'el 7:25/DST content and Solar true time fix merged.
  Recovery: `git checkout backup/2026-07-15-v168`

Previous backups: `backup/2026-07-14-v167`, `backup/2026-07-14-v21`, `backup/2026-07-14-v156`, `backup/2026-07-12-v144`, `backup/2026-07-11-v142`

## Today's Commit Log

```
25c2b8d Search + Solar: hard refresh button + How to Use updates (v169/v23) (#635)
3d85f49 Search: DST/Dani'el 7:25 in Final Days; Solar: true solar time fix (v168/v22) (#633)
31214a9 Prophetic Watch brief 2026-07-15
25a129a Add Nevelah/Treifah sourcing item; rewrite Modern Practice (v167) (#632)
```

## Note for Next Session

- ACR Solar `getSunTimes` now accepts `utcOffset` as 4th parameter. Old localStorage location data (no utcOffset field) falls back to January standard-offset calculation automatically.
- If a user is in the Southern Hemisphere (where January IS DST), the January fallback will strip the wrong hour. For now this is acceptable — the primary user base is Northern Hemisphere / Coimbra default.
- The Covenant Table section is at `// SECTION, The Covenant Table` in `Search/index.html` between Roman denominations and Who Controls the Covenant Claim.
- The Dani'el 7:25 / DST section is inside the 364-Day Covenant Calendar `<div class="hr-sec-head">` block, after the 1 Enoch 72-82 item.
- Before any content append to `Search/index.html` or `GreatE/index.html`, extract the `<script>` block and run `node --check` to catch syntax errors before pushing.
- Great Eraser HOWTO_HTML is a massive single-quoted JS string — any future edits must escape every apostrophe as `\'`.

---

## Load Maps + OCC (later session, same day)

### Built
- **OCC How to Use — instant offline search** (shipped in PR #575). Filters guide
  cards / section cards / FAQ as the employee types. Cache `load-tasks-cache-v2.5.3`.
- **PR #575 merged** (Load AI boot intro + OCC search).
- **Load Maps** — brand-new offline-first PWA at `/loadmaps` (PR #639, merged):
  - Stage 1: ~48 major places across PT/ES/GB/FR/IT/GR (real coordinates), live
    distance + compass, guide-me-there with Samantha voice, per-country emergency
    numbers, Sete Lagoas guided route (waypoints/elevation/comfort/spoken hazards,
    waypoints approx / parking exact), Alerts (curated offline), How to Use search,
    auto intro + brand splash (supplied pack), installable PWA.
  - Stage 2 batch: favorites/Save + Saved filter, prep checklist per route,
    speedometer on live guide, share place/plan, proper 192/512 icons + 32/180
    favicons. Cache `loadmaps-v4`.
- **PR #639 merged** → live on main (`dfab618`).
- `LOAD_MAPS_PLAN.md` is the living spec (stages, researched live-data sources).

### Outstanding / verify on iPad
- Open `https://acrscrolls.com/loadmaps/` after Pages deploys: intro+splash, allow
  location, Places → guide, Guided → Sete Lagoas → Start guiding (voice + speed),
  Save/star, prep checklist, Add to Home Screen. Samantha may fall back to the iOS
  default voice on some iPads (known limit).

### Pending / parked (Load Maps)
- Stage 2 remainder: driving turn cards, report button, gas/rest/tolls per route,
  arrival/reroute chimes.
- Stage 3 (needs signal): Protomaps map layer on Cloudflare R2, Open-Meteo weather,
  NASA FIRMS fire watch. Keys in Cloudflare env, never the repo.
- Stage 4: car-to-trail handoff, auto check-in, route packs, battery-saver guidance,
  landmark photos, group mode.
- Expand catalog / add guided routes (worldwide, real data only).

### Capability gaps
- No image tools (ImageMagick/sips/sharp) — resized icons/favicons via headless Chromium.
- Live Pages URLs not fetchable from sandbox — deploy verified on device only.

### Backups
- `backup/2026-07-15-loadmaps-v4` at `dfab618`. Recover: `git checkout backup/2026-07-15-loadmaps-v4`.

### Load Maps commit log
```
dfab618 Load Maps: Stage 1 + Stage 2 batch — offline-first route + trail guide (#639)
e8c6198 Load AI boot intro + OCC How-to instant search (#575)
```

### Load Maps — Stage 2 + friendly redesign (PR #640, merged)
- Driving route "Coimbra to Sete Lagoas" (road sections, cautions, stops, no-tolls,
  Start driving, speedometer), Report button (offline log -> Alerts), arrival/waypoint
  chimes, hard-refresh circle re-renders current view.
- Friendly redesign: Home screen (big glassy Drive/Hike/Places/Alerts/How-to cards);
  bottom nav Home/Drive/Hike/Places; real trail/road map imagery in a swipeable
  gallery with tap-to-enlarge (loadmaps/routes/); transparent glass styling; bigger
  readable type. Cache loadmaps-v6.
- Merged as 8edeb59. Backup: backup/2026-07-15-loadmaps-v6.
- Known: place catalog still has no photos (only the 2 Sete Lagoas routes have real
  imagery). CodeQL check red is the known benign config-only fail (real Analyze passed).
