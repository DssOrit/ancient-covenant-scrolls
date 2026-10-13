# Session Notes — 2026-09-08

## Current state

- Latest commit on `origin/main`: `2cd18b9` (Merge PR #897)
- Working tree: clean
- No uncommitted work outstanding

## Built today

**ACR Solar — fixed a real, user-reported DST-crossing date bug (PR #897, merged)**

- A user reported holy day dates looked "off, like a day ahead." Traced this
  precisely rather than guessing:
  - First independently re-verified the underlying calendar math from
    scratch (Python, not the app's own code) — confirmed the true,
    correct date for Yom Kippur 2026 is October 2, and confirmed this
    matched what the app's List view already showed.
  - The user then clarified: the List is correct, but the **annual
    (Year) calendar** marks the date wrong, and after a confirmed hard
    refresh (ruling out stale cache) — user is in **Portugal**.
  - Reproduced the exact bug in headless Chromium under `Europe/Lisbon`
    timezone emulation before writing any fix: the Year view's badge
    landed on Oct 3, while `solarToGregorian()` (used by the List)
    correctly said Oct 2.
  - **Root cause**: `gregorianToSolar()` computed elapsed days via raw
    millisecond subtraction, and `solarToGregorian()` added raw
    milliseconds to build a date. Portugal (WET/WEST) observes DST, and
    2026's spring-forward transition (March 29) falls between the solar
    year's anchor (March 25) and every autumn holy day. One real day in
    that span is only 23 hours long, so millisecond math undercounts
    elapsed calendar days by exactly one from the transition onward —
    shifting every date the Year view computes (which walks day-by-day
    via `gregorianToSolar`) one day later than the List's direct
    `solarToGregorian` calculation for the same day. This also affected
    the Month view's per-day solar-date labels (confirmed via a
    screenshot the user sent from the live, still-unfixed site).
- **Fix**: added `calendarDaysBetween()`, comparing two dates' local
  Y/M/D fields via `Date.UTC()` instead of raw elapsed milliseconds
  (sidesteps DST entirely); `solarToGregorian()` now advances via
  `setDate()` instead of millisecond addition, which the JS engine
  handles DST-safely.
- **Verification, in stages, each one requested by the user before being
  accepted as complete:**
  1. Reproduced the bug under `Europe/Lisbon` before any fix.
  2. Confirmed the fix resolves that exact case.
  3. Regression-tested 7 timezones (UTC, Lisbon, NY, LA, Auckland's
     reversed-season DST, Jerusalem's own DST schedule, Kolkata/no DST)
     — round-trip check across all 22 `HOLIDAYS` entries, zero
     mismatches.
  4. User specifically asked about California, Texas, and Florida —
     tested each by name (Pacific/Central/Eastern) across List, Month,
     and Year views — all correct.
  5. User asked "did you confirm all the dates" — ran a full sweep: all
     22 holy days, in every view (List, Month, Year), across all 8
     locations (176 checks). **First pass found 3 false-positive
     "mismatches" that turned out to be a bug in my own test script**
     (matching Year-view badges by background color, which breaks when
     two holidays share a color, e.g. Pesach Eve and Pesach First Day
     are both red) — caught this because the same 3 "mismatches"
     appeared identically even in UTC and Kolkata, timezones with no DST
     at all, which a real DST bug cannot produce. Fixed the test to
     match by actual date logic instead of color, re-ran: 0 mismatches
     across all 176 checks.
- Cache bumped `acr-solar-v45` → `acr-solar-v46`.
- Backup: `backup/2026-09-08-acr-solar-v45` (SHA `64fbb51`, before the fix).

## Outstanding / blocking (carried over, not from today)

- **Yovelim `data/file_16.json` fix is still paused.** Chapters 7, 11, 12,
  17/19 (contradiction), and 22 (false heading) unresolved; no verified
  source yet. Recovery point: `backup/2026-09-03-acr-v118` (SHA `1ae5212`).
- **CLAUDE.md Rule 36 status is still disputed and unresolved** — added
  2026-09-03, user later said they never asked for it as a rule. No
  decision made.
- **Holy-day email reminder feature — still not decided** (Cloudflare
  Worker backend vs. client-side push notification).
- **PR #892 ("Session notes: 2026-09-07") is now stale/superseded** — a
  concurrent session working on ACR2 today independently merged a
  combined Sept 7 notes file (covering both that session's ACR2 work and
  this session's Solar work) directly into `main` via a different PR path
  (`e68c814`). PR #892's branch content has already been incorporated;
  it just needs closing, no further merge needed from it.

## Pending / parked

- Yovelim Ch7/11/12/17-19/22 fixes — parked pending verified source content.
- Rule 36 keep-or-remove — parked pending user decision.
- Email vs. push reminder for holy days — parked pending user decision.
- Closing stale PR #892 — low priority, no content lost.

## Capability notes

- `WebSearch` continues to be the reliable path for verifying primary-text
  and factual claims (equinox timing, Leviticus text) when direct
  `WebFetch` is blocked.
- Playwright's timezone emulation (`newPage({ timezoneId })`) was the key
  tool for this session's bug hunt — let the actual bug be reproduced and
  the fix be verified against the real reported conditions rather than
  guessed at.

## Today's commit log

```
83c5254 ACR Solar: fix DST-crossing date bug on the Year view (real user report)
```

## Backups

- `backup/2026-09-08-acr-solar-v45` — SHA `64fbb51` (before PR #897)
- `backup/2026-09-08-acr-solar-v46` — SHA `2cd18b9` (current stable state, end of session)

Recovery: `git checkout backup/<name>`
