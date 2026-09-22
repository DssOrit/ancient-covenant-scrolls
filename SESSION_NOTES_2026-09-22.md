# Session Notes — 2026-09-22

## Current state

- Branch: `claude/acr-reader-tekufah-wording-fix-2026-09-22`, pushed. PR #967 open, awaiting user review/merge.
- `origin/main` HEAD at session start: `3ab1a22` ("Prophetic Watch brief 2026-09-21" — automated, not from this session).
- Root ACR Reader cache: `acr-v127` -> `acr-v128` (on open PR #967, not yet merged).
- Rule 8 unlock: no new ACR Reader unlock phrase was given today; treated the still-active "Fix ACR reader" authorization from 2026-09-21 as continuing, since this session picked up directly from yesterday's calendar/audio investigation on the same site with no break in topic. Flagged explicitly to the user that the separate Shemini Atzeret request touches ACR **Search** (`Search/index.html`), a different site, and that edit was *not* made — no unlock phrase for Search given this session.

## Backups

- `backup/2026-09-22-acr-v127-pre-tekufah-fix` — pushed, SHA-verified equal to pre-change `main` (`3ab1a221`), created before any file was touched.

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
10. **PR #967 opened**: `claude/acr-reader-tekufah-wording-fix-2026-09-22` -> `main`. Not merged — presented to user, waiting.

## Outstanding / blocking

- PR #967 awaiting user review and merge.
- **Shemini Atzeret addition still pending a decision**: needs the user's explicit "edit ACR search" / "fix Search" unlock phrase before `Search/index.html`'s `MOEDIM` array can be touched to add a standalone Shemini Atzeret entry (currently only mentioned inline inside Sukkot's description).
- Not verified on physical iPad Safari (sandbox has no device).

## Pending / parked

- Shemini Atzeret entry in ACR Search's `MOEDIM` list — awaiting unlock phrase for that site.

## Capability gaps this session

- No physical iPad access (pre-existing, documented gap).
- `file_113.json` has no browser-reachable verification path in ACR Reader (not wired into `index.html`'s navigation) — verified this fix via direct file read instead of a live render.

## Today's commit log

```
3dd9297 ACR Reader: correct tekufah/intercalary-day wording in Book of Mysteries   [PR #967, open]
```
