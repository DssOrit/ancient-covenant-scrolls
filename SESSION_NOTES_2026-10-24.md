# Session Notes — 2026-10-24

## Current state
- Latest commit on `main`: `c6b1895` (PR #1102 merged by DssOrit, confirmed via `pull_request_read` — `merged: true`, `merged_by: "DssOrit"`).
- ACR Solar `sw.js` cache: `acr-solar-v89`.
- Working tree clean, nothing uncommitted.

## Built this session

- **ACR Solar: fixed Shabbat screen DST mismatch across the fall-back transition** — PR #1101, merged by DssOrit.
  - User asked whether ACR Solar would show correct sunrise/sunset through tonight's EU DST change (last Sunday of October). Investigated read-only first, no unlock needed since no edit was made yet.
  - Confirmed the main daily sunrise/sunset display was already correct (verified live against the real Lisbon timezone database — this initial claim later needed a correction, see PR #1102 below).
  - Found a real, live bug: the Shabbat screen's `getDSTHours()` evaluated the current moment ("now") once and applied that single value to both Saturday's and Sunday's sunrise calculation. On an ordinary weekend both days share the same DST status so this never surfaced, but on a transition weekend (this one) they differ — so the Sunday "ends at sunrise" value was off by an hour.
  - Parameterized `getDSTHours()` to accept the date being evaluated, checked at noon of that day rather than midnight (the real transition happens ~1-2am local).
  - Verified against the real Lisbon tz database across six scenarios (before/during/after the transition weekend, the week after, and two ordinary non-transition weekends) with no regressions. Verified live in a headless browser, including all 24 holiday entries with zero failures.

- **ACR Solar: corrected a gap in PR #1101 — fixed DST midnight ambiguity that survived even a reload** — PR #1102, merged by DssOrit.
  - User asked a sharp follow-up ("why does Google say 6:56", then "are you saying it will correct itself at 2am") that exposed a flaw in the PR #1101 verification: the app's own `today` variable is pinned to midnight (`today.setHours(0,0,0,0)`), and midnight on the transition day itself is still technically pre-transition — so even a **fresh reload** on the transition day was showing the old, wrong offset all day. Confirmed this live: reloading the real app at 10am on the transition day still showed `07:55` instead of the correct `06:55`.
  - Said so plainly rather than quietly correcting course, per the session's standing verification rules — named what was claimed, what the real answer was, and what caused the error.
  - Fix: moved the "check at noon" safeguard into `getDSTHours()` itself so it's year-agnostic and applies to every call site automatically, rather than requiring each caller to construct its own noon-shifted date (removed the now-redundant `satNoon`/`sunNoon` workaround from PR #1101).
  - Verified the fix generalizes beyond this one transition: tested both directions (spring-forward, fall-back) across six years (2026-2035) against the real timezone database — every transition landed correctly with no hardcoded dates, since the logic defers entirely to the device's own IANA timezone database (the same mechanism every OS/browser already uses).
  - Re-verified the exact failure scenario (reload at 10am on the transition day) now correctly shows `06:55`.

- **Stable-state backups after both merges confirmed**: `backup/2026-10-24-acr-solar-v87` and `backup/2026-10-24-acr-solar-v88` (pre-change, one per PR), `backup/2026-10-24-acr-solar-v89` (stable-state, pointing at `main` HEAD `c6b1895` after both merges). All SHA-verified.

## Direction given this session (logged per Rule 12)
- User was asked whether the app should be made to detect day-rollover and auto-refresh while left open (since `today` is only ever set once at page load and never reassigned — a reload always gets the correct answer now, but an already-open session won't update itself).
- **User's answer: "The users always refreshes."** No further fix needed on this point — the user refreshes the app routinely, so the stale-`today`-while-open behavior is accepted as-is and is NOT being tracked as an open item.

## Content questions answered this session (no site changes)
- Whether mixing linen with cotton is against ACR Reader's Torah text: answered from the site's own sourced verses (Vayikra 19:19 is generic "two kinds of material"; Devarim 22:11 specifically names wool and linen — cotton isn't named in either, so NOT ADDRESSED by the text itself).
- Follow-up: whether cotton counts as a form of wool — no, cotton is a plant/cellulose fiber, wool is an animal/protein fiber; cotton is in the same fiber category as linen, not wool.

## Outstanding / blocking
- Carried over, unresolved, not touched this session: the Reader's own duplicate-volume-number bug (`data/file_18.json` Book of Giants and `data/file_98.json` Community Rule both claiming "Volume Thirty-One").
- Carried over, unresolved: the three open Sukkot/holy-days-prayers questions from the 2026-10-22 check-in (trigger `trig_01H1copsW51KnEdsobY3NeGe`) — still not asked/answered.

## Pending / parked (carried over, unchanged this session)
- ACR Search "concordance/reference book" project — parked per user: "too fiat [flat] this time."
- ACR2 read-only reconnaissance — parked per user: "We will hold off on this too."
- 16 remaining un-pulled Qumran-sectarian ACR Reader volumes — deferred to the ACR2 print pass.

## Capability gaps this session
- Playwright's Clock API in this environment doesn't have `page.clock.uninstall()` (not available in the installed version) — worked around by opening a fresh page/context instead when a test needed to drop back to the real system clock.

## Backups
- `backup/2026-10-24-acr-solar-v87` — pre-change, PR #1101. SHA-verified. Recovery: `git checkout backup/2026-10-24-acr-solar-v87`.
- `backup/2026-10-24-acr-solar-v88` — pre-change, PR #1102. SHA-verified. Recovery: `git checkout backup/2026-10-24-acr-solar-v88`.
- `backup/2026-10-24-acr-solar-v89` — stable-state, pointing at `main` HEAD (`c6b1895`) after both PRs merged and the owner confirmed. SHA-verified. Recovery: `git checkout backup/2026-10-24-acr-solar-v89`.

## Today's commit log (oneline, this session's work only)
```
9c17195 Fix Shabbat screen DST handling across the fall/spring transition
5fc4db2 Fix getDSTHours midnight ambiguity affecting reload on transition day
```
(Merge commits for PRs #1101 and #1102 landed on top of these on `main`; other commits appearing in `git log` on `main` today, e.g. Load Survival work and an automated "Prophetic Watch brief," were built in other sessions and are not duplicated here.)
