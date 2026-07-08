# Session Notes — 2026-07-08

## Current state

- Branch: `claude/acr-search-content-checklist-ZgUAQ`
- Latest main tip (after all merges): `02c4756` — PR #591 squash merge (acr-search-v138)
- Working tree: clean
- Live cache marker: `acr-search-v138`

## Built today

All 8 interactive Explore Hub features now complete and live at acrscrolls.com/Search/.

### PR #581 — 364-Day Solar Calendar (acr-search-v132, merged)
Interactive calendar view grounded in the 364-day covenant calendar from 1 Enoch (4Q201), Jubilees (4Q216), and Songs of the Sabbath Sacrifice. Tap any month to see the season block; year-round structure showing why the calendar never drifts; primary-source citations for every era-grouping and appointment.

### PR #583 — Exodus Journey (acr-search-v133, merged)
10-waypoint journey from Kemet to the plains of Moab. SVG route map with animated path; each waypoint tap-to-expand with primary-source body text (DSS, Ge'ez Orit) and archive location. Waypoints: Goshen, Avaris, Red Sea crossing, Sinai, Kadesh-Barnea, Mount Hor, Plains of Moab, etc.

### PR #584 — Diaspora Scatter (acr-search-v134, merged)
3 scatter events (Assyrian, Babylonian, Roman) shown on an SVG Africa map. Tap a scatter to see named destinations, primary-source citations (Tarikh al-Sudan, Tarikh al-Fattash, Sefer Yosippon, DSS). All destinations in Africa and the African diaspora per the record.

### PR #586 — The Courtroom (acr-search-v135, merged)
6 cases: NT Invention, Masoretic Vowel Pointing, Council of Nicaea, Hamitic Hypothesis, Dead Sea Scrolls Monopoly, African Hebrew Identity Erasure. Each case has evidence exhibits and a tap-to-reveal verdict screen. Prosecution draws exclusively from DSS, Ge'ez Orit, named historical documents.

### PR #588 — Explore Hub restructure (acr-search-v136, merged)
Replaced 6 individual nav pills (Uncover, Library, SolarCal, Exodus, Diaspora, Courtroom) with a single "Explore" pill containing an 8-tile card grid. Tiles 7 and 8 showed as "coming soon" until built. EXPLORE_SUB array keeps Explore pill active when inside any sub-feature. User chose Option B when presented with three nav options.

### PR #590 — Qumran Cave Explorer (acr-search-v137, merged)
11 caves rendered as an SVG cliff-face schematic. Each cave dot is tappable — marks as found (gold dot), updates HUD find-count, shows detail panel with what was discovered and archive location. Content: all 11 caves with key scroll finds, Ecole Biblique custodians, scroll locations (Jerusalem, Amman, Rockefeller). Citywalker tile in Explore Hub unlocked from "coming soon".

### PR #591 — Ancient City Walker (acr-search-v138, merged)
Feature 8 — the final Explore Hub feature. 3 city tabs with city-specific SVG schematic maps:
- **Yerushalayim** (c.1000 BCE — 70 CE): Temple Mount, City of David, Upper City, Lower City, Gihon Spring
- **Waset / Luxor** (c.2000–1070 BCE New Kingdom peak): Ipet-Isut (Karnak), Luxor Temple precinct, Valley of the Kings, Deir el-Medina, Medinet Habu
- **Babylon** (c.626–539 BCE Neo-Babylonian peak): Ishtar Gate, Esagila (Marduk temple), Nebuchadnezzar's Palace, Tel Abib (Hebrew exile quarter), Hanging Gardens

15 districts total (5 per city), each tap-to-expand with era, primary-source body text, and source citations. Sources: DSS, Ge'ez Orit, Tarikh al-Sudan/Fattash, Nabonidus Chronicle, Taylor Prism. City Walker tile in Explore Hub unlocked. Cache v137 -> v138.

## Explore Hub — complete feature map

| Tile | Mode | Version merged |
|------|------|---------------|
| Uncover the Text | uncover | v130 (pre-session) |
| Scroll Library Room | library | v131 (pre-session) |
| 364-Day Solar Calendar | solarcal | v132 |
| Exodus Journey | exodus | v133 |
| Diaspora Scatter | diaspora | v134 |
| The Courtroom | courtroom | v135 |
| Qumran Cave Explorer | qumran | v137 |
| Ancient City Walker | citywalker | v138 |

## Outstanding / blocking

- None. All 8 features live.
- Image integration (183-user images, hosting workflow) still pending from prior sessions — no urgency, user is thinking.
- Documentary image prompt script in scratchpad only — user may want it committed.

## Pending / parked

- Image hosting workflow (R2 requires credit card, GitHub web UI rejected large files) — no change.
- Any further divine name sweeps — not requested.
- Ba'al-Zevuv "Lord of the Flies" — left as-is by user approval.

## Capability gaps this session

- `dssorit.github.io` blocked — verify via `raw.githubusercontent.com` or GitHub MCP.
- No `gh` CLI — GitHub MCP tools for all PR operations.
- `initApp()` requires 23MB concordance file; verification done by calling render functions directly in headless Chromium.

## Backups

Backup needed once user confirms features working on device. Last known backup: `backup/2026-07-06-v129` (SHA acfdc4e).
Create next backup pointing at main HEAD (02c4756) once user confirms v138 live.
Recovery: `git checkout backup/2026-07-06-v129`

## Today's commit log

```
47c64c0 Search: Ancient City Walker — 3 cities, 15 districts, primary sources (acr-search-v138)
8d13263 Search: Qumran Cave Explorer — 11 caves, DSS finds, archive locations (acr-search-v137) [PR #590]
e96b047 Search: Explore Hub — 8-tile grid replacing 6 individual nav pills (acr-search-v136) [PR #588]
d60021c Search: The Courtroom — 6 cases, evidence exhibits, verdict screens (acr-search-v135) [PR #586]
147b248 Search: Diaspora Scatter — 3 scatter events, Africa SVG map, named sources (acr-search-v134) [PR #584]
8adf661 Search: Exodus Journey — 10 waypoints Kemet to Moab, primary sources (acr-search-v133) [PR #583]
(Solar Calendar v132 — pre-session)
(Scroll Library v131 — pre-session)
(Uncover the Text v130 — pre-session)
```

## Great Eraser Study, modules/quizzes pass (gestudy-v11)

Architecture found: the live Study app loads ONLY `data/app_data.json`. Each
chapter's Connected Verses + quiz come from `verse_map[chapter-id]`. The
`connections.json` "modules" file is orphaned dead code (never fetched); left
untouched.

Coverage before: 140/183 chapters had verses (Vols 1-4,10 complete; Vol 5
partial; Vols 6,7,8 empty; Vol 9 falsely "covered" via id collisions).

Built this pass (all grounded in each chapter's own named primary sources, no
fabrication per rule 17; authored by 11 parallel subagents then merged +
validated):
- Filled every gap: Vol 5 (+4), Vol 6 (+7), Vol 7 (+10), Vol 8 (+34) with
  primary-source verses + auto-quizzes matching the Vol 1 standard.
- BUG FIX: Vol 9 (Sharks) 52 chapters reused Vol 1-4 ids (ch1, ch2, ch4...),
  so they displayed the WRONG verses (e.g. "The Emperor's New Groove" showed
  Vol 1 cartography). Re-keyed all Vol 9 chapters to a unique `v9_` namespace
  and authored Sharks-specific verses/quizzes for all 52.
- Coverage after: 183/183 chapters. 434 verses, 200 quiz items total.
- Rule cleanup in the shipped data file: removed 1 emoji (in a Vol 9 chapter
  body) and normalized 658 em/en dashes to plain punctuation across the older
  study data (verse_map, timelines, memory_cards). New content had none.
- Cache bumped `gestudy-v10` -> `gestudy-v11`. No on-screen version badge in
  GESTUDY. No INLINE_DATA constant is defined; app relies on the fetched file.
- Verified in headless Chromium: DATA loads, 10 volumes, 184 verse_map entries,
  all volumes 100% covered, Sharks now shows its own verses, Vol 1-4 unchanged.

Files changed: `GESTUDY/data/app_data.json`, `GESTUDY/sw.js`. Shipped via PR
(feature branch `claude/wsa-acr-design-alignment-ji5poy`). NOT merged; awaiting
user confirmation per rule 9.

## Divine name rule (kept)

Only YHWH and Creator. No Lord, Adonai, Elohim, capital-G God as divine name. Applied to all new content this session.
