# Session Notes — 2026-09-10

## Current state

- Latest commit on `origin/main`: `231ec21` (Merge PR #913)
- Working tree: clean
- No uncommitted work outstanding

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

## Today's commit log

```
0e4fe7a ACR Solar: rename New Year to Rosh Chodashim, disclose the Hebrew Year epoch
```

## Backups

- `backup/2026-09-10-acr-solar-v47` — SHA `14e4d88` (before PR #913)
- `backup/2026-09-10-acr-solar-v48` — SHA `231ec21` (current stable state)

Recovery: `git checkout backup/<name>`
