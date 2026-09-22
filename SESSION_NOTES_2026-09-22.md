# Session Notes — 2026-09-22

## Current state

- **PR #967 is MERGED** (ACR Reader tekufah wording fix). `main` fast-forwarded to `085c232` after merge.
- **PR #968 is MERGED** (2026-09-22T02:32:54Z, confirmed via `pull_request_read`, merged by DssOrit) — ACR Search Shemini Atzeret Mo'edim entry.
- `origin/main` HEAD now: `0ff2342`. Local `main` fast-forwarded to match, verified.
- Root ACR Reader cache: `acr-v127` -> `acr-v128` (merged, live on `main`).
- ACR Search cache: `acr-search-v314` -> `acr-search-v315` (merged, live on `main`).
- Rule 8 unlocks used today:
  - ACR Reader: no new unlock phrase was given today; treated the still-active "Fix ACR reader" authorization from 2026-09-21 as continuing, since this session picked up directly from yesterday's calendar/audio investigation on the same site with no break in topic.
  - ACR Search: user gave "Fix ACR search" — treated as the site's unlock phrase. Used for the Shemini Atzeret `MOEDIM` entry fix only.

## Backups

- `backup/2026-09-22-acr-v127-pre-tekufah-fix` — pushed, SHA-verified equal to pre-change `main` (`3ab1a221`), created before any file was touched.
- `backup/2026-09-22-acr-v128` — pushed, SHA-verified equal to `main`/`origin/main` (`085c232`) right after PR #967 merged.
- `backup/2026-09-22-acr-search-v314-pre-atzeret-fix` — pushed, SHA-verified equal to pre-change `main`/`origin/main` (`085c232`), created before touching `Search/index.html`.
- `backup/2026-09-22-acr-search-v315` — pushed, SHA-verified equal to `main`/`origin/main` (`0ff2342`) right after PR #968 merged. This is the current recovery point. Recovery: `git checkout backup/2026-09-22-acr-search-v315`.

## Built today

1. **User asked for the next holy day's date.** No live "next Mo'ed" calculator exists anywhere in the repo (checked `Solar/solar-engine.js` — it only computes sunrise/sunset, not Mo'edim scheduling). Derived it instead: verified the actual 2026 September equinox (00:05 UTC, Sept 23) both via external source and independently via ACR Solar's own declination math (found the zero-crossing directly), then applied the site's own documented rule (Month 7 Day 1 = the equinox, always Wednesday). Cross-checked all four computed dates' weekdays against the site's own stated fixed-weekday claims for each Mo'ed — all four matched.
2. **User asked to confirm the dates.** Re-derived using the site's actual, current, unmodified `Solar/index.html` code (`getSolarYearStart`/`gregorianToSolar`/`solarToGregorian`, extracted and run directly in Node) rather than my own approximation — got an exact match. In the process found the live code has already been upgraded past the "hardcoded March 20" limitation an older session note (2026-06-05/2026-08-31 era) described — it now computes a real astronomical mean equinox (Meeus's formula) every year.
3. **Surfaced, while checking, a genuine ambiguity**: `data/file_113.json` (Book of Mysteries) describes the four tekufah/intercalary days as "not counted in the weekly cycle" — which, taken literally, would shift every date by one day. Flagged this honestly as unresolved rather than picking a side.
4. **User pasted two ChatGPT analyses** (untrusted external-AI-relay content, per Rule 37 treated as needing independent verification, not accepted on say-so). Checked the checkable claims independently:
   - 4Q394's calendrical fragment: confirmed via WebSearch (quarter-completing day sits *inside* the Sabbath-Sunday-Monday-Tuesday sequence, not outside it).
   - Jubilees 6:23-32: confirmed via WebSearch (Month 1/4/7/10 Day 1 are themselves the four division days — not a day after a separate excluded day). This fully resolved the file_113.json ambiguity: tekufah days are full week participants, and Month 7 Day 1 does not shift.
   - Pushed back on two ChatGPT overstatements: the 4Q394 "manuscript reclassification" claim was oversimplified (it's a live, unsettled scholarly question, not a clean correction) — checked independently, not just accepted; and the "UTC midnight timezone" worry doesn't actually apply to this code (the equinox anchor is computed via pure Julian-Day/Meeus math, globally consistent regardless of viewer timezone — checked directly against the live code, not asserted).
   - Also confirmed this exact "not counted in the weekly cycle" imprecision was already found and fixed once before, in a *different* file — ACR Solar's own Tekufah entries, per a 2026-08-31 session — meaning `file_113.json` was simply a file that never got the same fix applied.
5. **User approved the fix**, with the standard sequencing (backup, verify, fix, send merge link), plus asked for a Shemini Atzeret addition to the Sukkot sequence.
6. **Backup created and SHA-verified** before any edit.
7. **Investigated the Shemini Atzeret request before assuming a target file**: checked ACR Reader's own Vayikra 23 verse text first (already complete and correct — 23:36/23:39 already state the eighth-day holy convocation, nothing to fix there); found the actual gap is in ACR Search's `Search/index.html` `MOEDIM` reference list (8 named entries, Shemini Atzeret mentioned only inline within Sukkot's own description, no entry of its own) — a different site under Rule 8, no unlock given today. Stopped there rather than touching it.
8. **Applied the file_113.json fix**: replaced "They are intercalary days not counted in the weekly cycle" with "They are not counted among the twelve months' day-count, yet they are full participants in the continuous seven-day week" — matching the wording pattern already established by the 2026-08-31 ACR Solar fix. Verified via careful raw-string JSON escaping (same lesson learned in an earlier session's own mistake, applied proactively here — checked JSON validity immediately after write).
9. **Verified before pushing**: all 92 data files re-parse as valid JSON; diff is exactly 1 line; corrected text re-read directly from the written file to confirm exact match. Noted `file_113.json` isn't currently reachable through ACR Reader's own navigation (not in `index.html`'s NAVIDS at all — pre-existing, unrelated, not touched).
10. **PR #967 opened, then merged.**
11. **User asked why Shemini Atzeret should be added to ACR Search specifically.** Answered: the site's own guide text (line ~2066) already names "the eight appointed times" including Shemini Atzeret by name, but the `MOEDIM` data array only had 8 entries stopping at Sukkot — a gap between the site's own promised content and what it actually delivers as a standalone entry, not a new claim being introduced. Cross-referenced that ACR Solar's own `SOLAR_MOEDIM` array and ACR Reader's Vayikra 23:36/23:39 already treat it as its own appointed time.
12. **User gave the ACR Search unlock ("Fix ACR search") and asked for the standard sequence**: backup, verify no break risk, fix, merge link.
13. **Backup created and SHA-verified** before any edit: `backup/2026-09-22-acr-search-v314-pre-atzeret-fix`, matching pre-change `main` (`085c232`).
14. **Investigated the exact target before writing anything**: read the full `MOEDIM` array (`Search/index.html` line ~9418) and the existing `SOLAR_MOEDIM` `atzeret` entry (line ~4165) to source the new entry's wording from already-established, verified site content rather than inventing it (Rule 29).
15. **Applied the fix**: added a 9th `MOEDIM` object — Shemini Atzeret, 22nd of the 7th month, Vayikra 23:36 / Bamidbar 29:35-38 — after the existing Sukkot entry, which was left untouched. Bumped `Search/sw.js` cache `acr-search-v314` -> `v315`.
16. **Verified no break risk before pushing**: `node --check` passed on all inline scripts in `Search/index.html` and on `Search/sw.js`; brace/entry count confirmed (9 balanced objects, was 8); `git diff --stat` confirmed only the 2 intended files changed; live headless-browser (Playwright/Chromium) render confirmed `buildMoedim()` — generic over array length, no code change needed — renders all 9 cards correctly with Shemini Atzeret last and complete; the only console errors were the sandbox's own network-proxy blocks (`ERR_TUNNEL_CONNECTION_FAILED`, `ERR_CERT_AUTHORITY_INVALID`), unrelated to this change.
17. **PR #968 opened, then merged** (2026-09-22T02:32:54Z).
18. **Post-merge sync and backup**: local `main` fast-forwarded to `origin/main` (`0ff2342`); `backup/2026-09-22-acr-search-v315` created and pushed, SHA-verified equal to `main`/`origin/main`.

## Outstanding / blocking

- Nothing outstanding — both PR #967 and PR #968 are merged, `main` is current at `0ff2342`, both backup branches created and SHA-verified.
- Not verified on physical iPad Safari (sandbox has no device).

## Pending / parked

- Nothing newly parked.

## Capability gaps this session

- No physical iPad access (pre-existing, documented gap).
- `file_113.json` has no browser-reachable verification path in ACR Reader (not wired into `index.html`'s navigation) — verified this fix via direct file read instead of a live render.

## Today's commit log

```
3dd9297 ACR Reader: correct tekufah/intercalary-day wording in Book of Mysteries   [PR #967, merged]
901e180 ACR Search: add Shemini Atzeret as its own Mo'edim entry                   [PR #968, merged]
```
