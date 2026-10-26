# Session Notes — 2026-10-25 through 2026-10-26

## Current state
- Latest commit on `main`: `ac7beaf` (PR #1106 merged by DssOrit, confirmed via `pull_request_read` — `merged: true`, `merged_by: "DssOrit"`).
- ACR Solar `sw.js` cache: `acr-solar-v90`.
- Working tree clean, nothing uncommitted.

## Built this session

- **ACR Solar: restructured Yom Todah and Yom Berachah — menorah timing, DIY crafts, light verses, Yom Berachah split into a two-day event** — PR #1106, merged by DssOrit.
  - Started from a content mix-up: the user asked whether Yom Teruah was meant to land the day after Thanksgiving. Checked the live calendar engine directly (not memory) and confirmed Yom Teruah (month 7, day 1 — a real covenant moed, `categories:['moed','miqraQodesh','shabbaton']`, `source:'DSS/Orit'`) falls on Sep 23, 2026, nowhere near Thanksgiving — the day-after-Thanksgiving slot belongs to **Yom Todah**, the unrelated family-tradition entry. The two names (Teruah/Todah) are easy to confuse but are not the same day.
  - User asked whether Yom Berachah (currently a fixed Wednesday, Dec 16) could be made to land on a Friday/Saturday weekend. Verified the key structural fact directly from `getSolarYearStart`'s own code comment and confirmed empirically: because every solar year starts on a Wednesday and the year is exactly 52 weeks (364 days), any fixed (month, day) position lands on the *same weekday every year, forever* — a stronger guarantee than Yom Todah's Thanksgiving-tracking, which only approximates a moving Gregorian target. Mapped out the full weekday table for month 9 and offered day 27 (Friday)/28 (Saturday) as the 3rd-weekend-of-December option, verified against 15 years (2026-2040) before the user picked it.
  - User then asked to confirm Yom Todah could also always land on Friday — verified directly: it already does, permanently, zero exceptions 2026-2040 (same structural fact), with no change needed.
  - User asked to add a menorah + decorations step to Yom Todah itself (not Yom Berachah, confirmed via an explicit clarifying question after ambiguity in phrasing), then clarified further: "The menorah should already be up by the time of Yom Berachah" — meaning the menorah moves from being set up at Yom Berachah to being set up after the meal at Yom Todah, staying lit through the season. This reshaped the whole plan.
  - Brainstormed and researched (web search, verified) decoration/activity ideas grounded in the actual text rather than invented: wheat-sheaf bundle (Devarim 26:10), gratitude scroll (inspired loosely by 4Q504-506's recounting structure), stones of remembrance (Yehoshua 4:1-9), almond-blossom motif (Shemot 25:31-40's own menorah description). Researched Sigd (the real Beta Israel covenant-renewal festival) as a possible inspiration for the gratitude-scroll reading, verified via web search, but the user correctly caught that Sigd's fast-then-feast structure doesn't match these feast-only family days — that framing was dropped in favor of the user's own alternative: a narrated history reading.
  - Pulled four verses directly from the live ACR Reader corpus (not paraphrased) to build a short history-of-the-covenant-people reading for Yom Todah's gratitude scroll: Bereshit 15:13-14 (the promise given before the slavery, `data/file_2.json`), Shemot 1:11-14 (the affliction itself) and Shemot 2:23-25 (the groaning and remembrance, `data/file_5.json`), and Shemot 6:6-8 (the redemption promise, `data/file_5.json`).
  - Researched real "light" verses from the ACR Search concordance (not invented) to ground the menorah/light theme positively rather than leaving it as only a prohibition: Tehillim 119:105, Tehillim 27:1, Yesha'yahu 60:19-20 (used to directly counter the existing solstice-light-festival avoid-caution), Bamidbar 6:25.
  - Split Yom Berachah into two linked entries (Day One, Friday day 27 — prep/decorate/cook/wrap/pack-charity/game-night; Day Two, Saturday day 28 — the main gathering, no menorah-setup step since it's already lit from Yom Todah, dinner, prayers, charity delivery, gift exchange, games), matching the site's existing multi-day pattern (Pesach Eve/First Day/Seventh Day).
  - Built the full edit via programmatic extraction of the exact pre-existing entries (not retyped, to avoid transcription errors on content this size) plus targeted substitutions, each verified to match exactly once before applying.
  - Verified thoroughly before shipping: `node --check` on `sw.js`; the `HOLIDAYS` array parses as valid JS with the correct entry count (24 -> 25) and correct date order; a full headless-browser run (Playwright, `timezoneId: Europe/Lisbon`) of all 25 entries via the real `showEventDetail()` function with zero failures and zero page errors; specifically confirmed Yom Todah's detail view contains every new element and Yom Berachah Day Two's detail view does *not* contain a menorah-setup step.
  - After merge, re-verified both structural claims fresh against the actual shipped file (not reused prior output): Yom Todah always lands on Friday 2026-2040 confirmed again; Yom Berachah's weekend placement re-checked with a **self-caught correction** — the first re-verification attempt used a flawed "independently count the 3rd Friday and 3rd Saturday of the month" method, which can land in different calendar weeks when the month doesn't start cleanly (2029 exposed this: produced a nonsensical Dec 21/Dec 15 non-adjacent "pair"). Corrected to the right method (Friday = the day immediately before the 3rd Saturday) and reconfirmed the original claim: matches the true 3rd weekend of December in 14 of 15 years (2026-2040), missing only 2030 (lands on the 2nd weekend instead).
  - Explicitly confirmed with the user mid-session, more than once, that no file in `Search/` or any other site was touched — this session stayed entirely scoped to `Solar/`.

## Content questions answered this session (no further site changes)
- Explained cotton is not classified as wool (cotton = plant/cellulose fiber, same category as linen; wool = animal/protein fiber) in response to a follow-up on the linen/cotton mixing question from the prior session.
- Explained the "Prophetic Watch brief" automated commit touching `Search/daily_brief.json` seen in a git-sync step was not an action taken by this session — it was a pre-existing commit from an unrelated automated process, only observed via `git log` while syncing, never written to.
- Confirmed via the real `figure_studies.json` data that ACR Search's "Figure Studies" feature currently has one entry (Eliyahu/Elisha covenant-succession study) as a possible future reading source — not used in this session's shipped content, since the user redirected to a different, self-authored history reading instead.

## Outstanding / blocking
- Carried over, unresolved, not touched this session: the Reader's own duplicate-volume-number bug (`data/file_18.json` Book of Giants and `data/file_98.json` Community Rule both claiming "Volume Thirty-One").
- Carried over, unresolved: the three open Sukkot/holy-days-prayers questions from the 2026-10-22 check-in (trigger `trig_01H1copsW51KnEdsobY3NeGe`) — still not asked/answered.
- `SUGGESTIONS_PARKED.md`'s top-of-file "review by" date (2026-10-09) is still past due and has not yet been resurfaced to the user this session or last.

## Pending / parked (carried over, unchanged this session)
- ACR Solar auto-refresh-on-open (`visibilitychange` listener) — parked 2026-10-24, user confirmed they always refresh manually so this isn't needed now.
- ACR Search "concordance/reference book" project — parked per user: "too fiat [flat] this time."
- ACR2 read-only reconnaissance — parked per user: "We will hold off on this too."
- 16 remaining un-pulled Qumran-sectarian ACR Reader volumes — deferred to the ACR2 print pass.

## Capability gaps this session
- None new.

## Backups
- `backup/2026-10-26-acr-solar-v89` — pre-change, PR #1106. SHA-verified. Recovery: `git checkout backup/2026-10-26-acr-solar-v89`.
- `backup/2026-10-26-acr-solar-v90` — stable-state, pointing at `main` HEAD (`ac7beaf`) after the merge was confirmed. SHA-verified. Recovery: `git checkout backup/2026-10-26-acr-solar-v90`.

## Today's commit log (oneline, this session's work only)
```
df68747 Restructure Yom Todah and Yom Berachah: menorah timing, DIY crafts, light verses
```
