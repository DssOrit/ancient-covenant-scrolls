# Session Notes — 2026-09-10

## Current state

- Latest commit on `origin/main`: `b17a336` (Merge PR #912)
- Working tree: clean
- No uncommitted work outstanding
- ACR Search cache (`Search/sw.js`): `acr-search-v309`

## Built today

**ACR Solar — full accuracy/thoroughness audit, then closed two known gaps (PR #913, merged)**

- User asked to confirm ACR Solar's calendars are thorough and accurate.
  Ran a fresh, comprehensive verification against live `main` (not memory):
  all 22 `HOLIDAYS` entries, List/Month/Year views, this year and next
  year, across 7 timezones (UTC, Portugal, California, Texas, Florida,
  Auckland, Jerusalem) — 0 date mismatches, 0 page errors, weekly-cycle
  integrity confirmed (Yom Kippur lands on one single weekday every year
  2020-2035), the December-only Year-view click bug and the DST-crossing
  date bug both confirmed still fixed.
- That audit surfaced two known-but-unresolved accuracy gaps (flagged in
  an earlier session, never decided): the New Year entry was labeled
  "Rosh HaShanah" (Rabbinic terminology, and doubly misapplied since
  Rabbinic tradition itself reserves that name for the autumn new year),
  and every "Hebrew Year" number on the site uses `+3760`, the Rabbinic
  Anno Mundi epoch from *Seder Olam Rabbah* — not a DSS/Orit-sourced count.
- Explored what a DSS/Orit-sourced replacement year-count would actually
  look like (Yovelim's jubilee/week-of-years structure, attested at
  Qumran via 4Q216) and was upfront that it would be accurate but not
  readable without a permanent explainer, unlike the familiar-looking
  (if wrongly-epoched) current number.
- **User's decision**: fix the easy one, leave the other, but disclose it
  honestly. Shipped:
  - "New Year — Rosh HaShanah" → "New Year — Rosh Chodashim" (Shemot
    12:2's actual term for month 1), with a verified paleo `ancientName`
    field added to match the other 8 named appointments.
  - Hebrew Year `+3760` numbering left functionally unchanged, but a new
    "Year Numbering" row added to Settings' About section stating plainly
    it's the Rabbinic Anno Mundi count, not DSS/Orit-sourced, and naming
    Yovelim's jubilee structure as the closest sourced alternative not
    yet adopted.
- Cache bumped `acr-solar-v47` → `acr-solar-v48`.
- Backup: `backup/2026-09-10-acr-solar-v47` (SHA `14e4d88`, before the fix).
- Verified: paleo string decoded letter-by-letter against Unicode
  codepoints before writing; live-rendered confirmation of the rename,
  the ancientName field, and the Settings disclosure text; full 22-entry
  round-trip regression check, zero mismatches, zero page errors.

**ACR Search — Paleo-Hebrew Explorer built, then a real bug fixed against a user-supplied reference example (PR #912, merged)**

- Carryover from yesterday: PR #911 (Geʽez Foundation letters + provisional
  Lev 22:21-27 parallel reading) had already merged. This is the separate
  Phase 1 scope agreed yesterday ("everything except stroke tracing"),
  built today under the exact unlock phrase, explicitly told NOT to be
  named after the outside PWA concept it was inspired by anywhere in the
  app, code, or commits — confirmed it isn't.
- Added to the existing Paleo-Hebrew Alphabet view: a "Explore a Name or
  Word" tool (Transliterate mode + Word Lookup mode reusing the existing
  sourced `HR_WORDS` corpus), an alphabet-card upgrade (gematria numeric
  value + pictographic origin on all 22 letters), and a Confusable Pairs
  Practice duel (Dalet/Resh, Bet/Kaph, Waw/Zayin, He/Het). TTS reuses the
  existing `speakText()`.
- **User caught a real bug the next morning**, not by re-reading code but
  by handing over a worked reference example (name "Sabrina" transliterated
  to a two-table chart: Segment/Sound/Letter/Role, then
  Letter/Pictograph/Role, spelling Samekh-Bet-Resh-Yod-Nun-He) and asking
  whether our tool matched it. It didn't, on two counts: (1) the tool only
  produced a flat chip row, nothing chart-shaped; (2) actually running
  "Sabrina" through the real tool (Playwright, not a hand-trace) showed it
  silently dropped the word-final "a" instead of rendering it as He, the
  standard mater lectionis for a final "-ah" sound (Torah, Sarah use the
  same convention) — a genuine, reproducible algorithm gap, confirmed
  before saying anything, per the session's verify-before-reporting rule.
- Reported both gaps and waited; user said "fix ACR search" the next
  message. Fixed on the same branch/PR rather than opening a competing one:
  word-final `a` now maps to He; mid-word `a` still silently merges into
  the preceding consonant. Rebuilt the output as two tables (Transliteration,
  Pictographic reading) driven from one shared per-letter analysis so they
  can't disagree with each other. Deliberately did NOT auto-generate poetic
  "stacked reading" prose like the reference example's own hand-written
  line — flagged as unreliable to produce honestly for arbitrary input
  words — used a plain consonant-chain pictograph summary instead, with an
  explicit disclaimer that it's illustrative wordplay, not a scholarly
  claim about a word's real historical origin.
- Verified against the actual running tool both times (initial build and
  the fix): "Sabrina" now reproduces the user's reference chart exactly,
  row for row. Checked "David" (word ending in a consonant) and "Anna"
  (vowel at both word-start and word-end) as edge cases for the new
  lookahead logic. Regression-checked the alphabet grid, Word Lookup mode,
  the duel, and the separate Geʽez Foundation view from PR #911 — all
  unaffected. Two of my own test-harness artifacts (an unrelated
  pre-existing splash/auth overlay intercepting headless clicks, and a bad
  `eval()`-based click simulation) caught and corrected during verification
  rather than reported as app bugs.
- Cache bumped `acr-search-v307` → `v308` (initial build) → `v309` (fix).
- Backups: pre-build `backup/2026-09-09-acr-search-v307-explorer-pre` (SHA
  `2a0d40b3a18007f04c49fd4b256e58a225a25706`); pre-fix
  `backup/2026-09-10-acr-search-v308-explorer-fix-pre` (SHA
  `231ec219ce7822878aa3205b21424a8e6f770e34`); post-merge
  `backup/2026-09-10-acr-search-v309` (SHA
  `b17a3368fe44336733f916b5e7fc624df888d5d7`).

## Outstanding / blocking (carried over, not from today)

- **Yovelim `data/file_16.json` fix is still paused.** Chapters 7, 11, 12,
  17/19 (contradiction), and 22 (false heading) unresolved; no verified
  source yet. Recovery point: `backup/2026-09-03-acr-v118` (SHA `1ae5212`).
- **CLAUDE.md Rule 36 status is still disputed and unresolved.**
- **Holy-day email reminder feature — still not decided** (Cloudflare
  Worker backend vs. client-side push notification).
- **Jubilees/Yovelim jubilee-cycle year-count is now a named, sourced
  option** for a future ACR Solar year-numbering overhaul, if ever wanted
  — flagged today, not started, would need its own design pass (readability
  requires a permanent explainer panel, and the "year 1 = creation" anchor
  point is itself interpretive).
- **PR #892 and the 2026-09-09 session-notes branch collision** remain
  loose ends from prior days — low priority, no content lost either time.

## Pending / parked

- Yovelim Ch7/11/12/17-19/22 fixes — parked pending verified source content.
- Rule 36 keep-or-remove — parked pending user decision.
- Email vs. push reminder for holy days — parked pending user decision.
- Jubilees-based year numbering — parked, named as an option, not requested yet.
- **Load Paleo Phase 2 remainder — still not built**: Attested-genealogy
  names lexicon (needs a real sourced names/etymology dataset), and any
  Parallel Reading entries beyond Leviticus 22:21-27 (no other passages
  sourced yet).
- **Two audit items still open on the shipped Lev 22:21-27 entry** (PR
  #911): direct Dillmann-image collation, and final adjudication of
  ዘጽንጵው vs. ዘጽንጰው at 22:24. Tracked live in the app's own metadata.
  Passage must stay labeled PROVISIONAL GEʽEZ READING until resolved.
- **"Unattested in early inscriptions" claim for ጰ/ፐ** — still deliberately
  withheld from the UI pending a directly-checked primary source.

## Today's commit log

```
0e4fe7a ACR Solar: rename New Year to Rosh Chodashim, disclose the Hebrew Year epoch
f485262 Fix Transliterate mode: word-final -a to He, render as a chart
346aaf6 Merge remote-tracking branch 'origin/main' into claude/acr-search-paleo-explorer
b17a336 Merge pull request #912 from DssOrit/claude/acr-search-paleo-explorer
```

## Backups

- `backup/2026-09-10-acr-solar-v47` — SHA `14e4d88` (before PR #913)
- `backup/2026-09-10-acr-solar-v48` — SHA `231ec21` (current stable state)
- `backup/2026-09-09-acr-search-v307-explorer-pre` — SHA `2a0d40b3a18007f04c49fd4b256e58a225a25706` (before PR #912's initial build)
- `backup/2026-09-10-acr-search-v308-explorer-fix-pre` — SHA `231ec219ce7822878aa3205b21424a8e6f770e34` (before PR #912's fix commit)
- `backup/2026-09-10-acr-search-v309` — SHA `b17a3368fe44336733f916b5e7fc624df888d5d7` (current stable state, after PR #912)

Recovery: `git checkout backup/<name>`
