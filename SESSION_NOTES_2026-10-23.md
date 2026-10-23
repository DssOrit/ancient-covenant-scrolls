# Session Notes — 2026-10-23

## Current state
- Latest commit on `main`: `d614bc5` (PRs #1095 and #1096 both merged by DssOrit, confirmed via `pull_request_read` — `merged: true`, `merged_by: "DssOrit"` on both).
- ACR Search `sw.js` cache: `acr-search-v330`.
- ACR Solar `sw.js` cache: `acr-solar-v87`.
- Working tree clean, nothing uncommitted.

## Built this session

- **ACR Search: removed dangling vol45 refs; scoped sw.js cache cleanup** — PR #1095, merged by DssOrit.
  - Carried-over flagged item from a prior session ("Pre-existing dangling `themes`/`roots` references to a non-existent `vol45` passage id... 12 occurrences") was re-verified from scratch per Rule 33/34 before touching anything, since the user explicitly asked for a check against past false-positive incidents. The "12 occurrences" figure from the earlier flag was itself stale/wrong — actual count verified by loading the real JSON: 254 references (168 across 9 themes, 86 across 6 roots, 25 distinct `vol45` ids), and `vol45` doesn't exist anywhere in the site (not in `acr_concordance.json`'s own `passages` array — max real volume is 31 — not in `acr_search_data.json`, not in the Reader's `NAVIDS`/`LABELS`/`TOC`).
  - Checked real behavioral impact against the actual consumption code (`doRootSearch`, `openParallelView` in `Search/index.html`) before calling it a "bug": both silently drop unresolved ids via `.filter(Boolean)`, so no crash — the one real, verified effect was an inflated "(showing 50 of X)" count in root-search for 6 roots (e.g. `mashiach` showed "of 89" instead of the true 64).
  - Surgical removal (not a full JSON re-dump, to avoid a 22MB-file reformatting diff): line-level regex removal of the 254 matching entries with trailing-comma repair where a removed id was an array's last element. Verified post-edit: JSON still parses, `meta.total_passages` (20866) and `passages` count unchanged, zero `vol45` refs remain anywhere, every affected theme/root array shrank by exactly the expected count.
  - **Separate, more serious finding surfaced while reading `sw.js` for this fix** (not something the user asked about): the `activate` handler's cache cleanup used `k !== CACHE` with no prefix filter — meaning every ACR Search deploy could delete every other app's cache on the shared origin (ACR Reader, Solar, Load, etc.), the same failure mode Rule 21 was locked over. Flagged to the user before touching it; user approved fixing it in the same PR. Fixed to match Solar's existing correct pattern (`k.indexOf('acr-search-') === 0 && k !== CACHE`).
  - Verified in a real headless-browser run (local server + Playwright) against the actual `doRootSearch()`/`openParallelView()` functions for all 9 affected theme keys and all 6 affected root keys: zero page errors, and the previously-inflated counts are now correct live in the app (e.g. `mashiach` now reads "of 64").
  - Backup: `backup/2026-10-23-acr-search-v329-71b83eb` (pre-change, SHA-verified against `origin/main` at the time).

- **ACR Solar: added Lent/Easter avoidance notes to Pesach — First Day** — PR #1096, merged by DssOrit.
  - User direction: "If it's Christian then it's against the text" — add Lent and "Christian Passover" (Easter) to an avoid-list.
  - Researched both before writing anything, per Rule 29/33/34: Lent is a Christian institutional fast (short pre-Pascha fast attested 2nd century; the 40-day form standardized church-wide at the Council of Nicaea, 325 CE) with no DSS/Orit grounding — excludable under Rules 13/25 on institutional-origin grounds alone, no pagan-deity citation needed. Easter/Pascha is stronger: the Council of Nicaea (325 CE) explicitly decoupled its calculation from the Hebrew Nisan 14 reckoning specifically to separate the Christian observance from the Hebrew Passover — a named council, date, and stated reason, matching the site's own evidentiary bar; also ties directly to Rule 14 (built around the NT's invented resurrection figure).
  - Confirmed unlock phrase ("edit ACR Solar") before any file was touched. Confirmed placement (Pesach — First Day's `steps` array, matching the existing avoid-item pattern already used on Yom Todah/Yom Berachah) as part of the find-first-report step.
  - Verified before shipping: extracted and parsed the full `HOLIDAYS` array in Node (24 entries, unchanged count, no syntax breakage); `node --check` on `sw.js`; ran the real app in a headless browser and called the actual `showEventDetail()` function against all 24 holiday entries (same thorough pattern as the prior session's PR #1091 fix) — zero failures, and confirmed the new Lent/Easter text actually renders in the Pesach detail view.
  - Backup: `backup/2026-10-23-acr-solar-v86` (pre-change, SHA-verified against `origin/main` at the time).

- **Stable-state backups after both merges confirmed**: `backup/2026-10-23-acr-search-v330` and `backup/2026-10-23-acr-solar-v87`, both pointing at `main` HEAD (`d614bc5`), both SHA-verified.

## Content questions answered this session (no site changes)
- Research on which "Western/pagan holiday" claims hold up under Rule 34 scrutiny (Halloween/Christmas/Easter/New Year's solid; Valentine's Day genuinely contested, flagged as such; St. Patrick's Day/April Fools'/Mother's-Father's Day don't fit the "Torah forbids this" framing and were recommended for exclusion). This research didn't result in a site change this session — the Lent/Easter addition above was a separate, later request scoped specifically to Pesach.

## Outstanding / blocking
- Carried over, unresolved, not touched this session: the Reader's own duplicate-volume-number bug (`data/file_18.json` Book of Giants and `data/file_98.json` Community Rule both claiming "Volume Thirty-One").
- Carried over, unresolved: the three open Sukkot/holy-days-prayers questions from the 2026-10-22 check-in (trigger `trig_01H1copsW51KnEdsobY3NeGe`) — still not asked/answered this session.

## Pending / parked (carried over, unchanged this session)
- ACR Search "concordance/reference book" project — parked per user: "too fiat [flat] this time."
- ACR2 read-only reconnaissance — parked per user: "We will hold off on this too."
- 16 remaining un-pulled Qumran-sectarian ACR Reader volumes — deferred to the ACR2 print pass.

## Capability gaps this session
- None new. Headless-browser verification (Playwright, Node — not Python; the `playwright` Python package isn't installed in this environment, only the Node package) worked well for exercising real app behavior on both ACR Search and ACR Solar before shipping, per Rule 33/34. Note for next session: use `node` + the `playwright` npm package directly, not `python3 -m playwright`.

## Backups
- `backup/2026-10-23-acr-search-v329-71b83eb` — pre-change, PR #1095. SHA-verified. Recovery: `git checkout backup/2026-10-23-acr-search-v329-71b83eb`.
- `backup/2026-10-23-acr-solar-v86` — pre-change, PR #1096. SHA-verified. Recovery: `git checkout backup/2026-10-23-acr-solar-v86`.
- `backup/2026-10-23-acr-search-v330` — stable-state, pointing at `main` HEAD (`d614bc5`) after both PRs merged and the owner confirmed. SHA-verified. Recovery: `git checkout backup/2026-10-23-acr-search-v330`.
- `backup/2026-10-23-acr-solar-v87` — stable-state, same HEAD (`d614bc5`). SHA-verified. Recovery: `git checkout backup/2026-10-23-acr-solar-v87`.

## Today's commit log (oneline, this session's work only)
```
d614bc5 Merge pull request #1096 from DssOrit/claude/solar-pesach-christian-avoid
68da761 Merge pull request #1095 from DssOrit/claude/search-concordance-sw-fix
8de2827 Add Lent/Easter avoidance notes to Pesach — First Day
c4a79d8 Remove dangling vol45 refs in concordance; scope sw.js cache cleanup to Search
```

Note: `71b83eb` ("Prophetic Watch brief 2026-10-23", touching `Search/daily_brief.json`) landed on `main` between this session's backups but was not built in this session — it appears to be an automated/parallel update, not touched or reviewed here.
