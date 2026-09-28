# Session Notes — 2026-09-10

## Current state

- Latest commit on `origin/main`: `029f1aa8` (Merge PR #917)
- Working tree: clean
- No uncommitted work outstanding

## Built today

**CLAUDE.md — added Rule 37, citation standard for external AI relay content (PR #917, merged)**

- Continuation of the multi-day ACR2 Damascus Document / Community Rule
  (1QS) reconstruction audit (PR #890, #895, #896 from prior sessions).
  User uploaded a new "FINAL SOURCE_CONTROLLED" docx batch; audit against
  the live site and the saved DSS Study Edition (García Martínez–
  Tigchelaar) primary-source text turned up new, independently-verified
  findings beyond the docx's own claims:
  - CD Column 3 v1 ("led astray after Baal Peor and ate of the dead") has
    zero attestation anywhere in the ~78,000-line saved DSS corpus and is
    structurally impossible at that position — fabricated text.
  - Real Column III content (Noah/Abraham/Kadesh/well/Ezekiel citation) is
    misplaced inside Column 2; what's labeled "Column 3" is actually real
    Column V content (ark/David/Uriah/purity law), verbatim-matched.
  - The "Aleph and Lamed / Aleph and Daleth" oath formula (real Column XV,
    4Q266 frg. 8i) is duplicated in three wrong places — CD Columns 5 and
    6, and `file_20.json` Column 9 — and missing from Column 15 itself,
    which is its actual, correct, and now-absent opening.
  - CD "Column 5" vv11-12 is 1QS Column 9 content bled into the wrong
    document — confirmed by direct comparison, already correct in
    `file_21.json`.
  - 1QS Column 8's DSS/Masoretic notes wrongly assert the manuscript
    spells out "YHWH" at the Isaiah 40:3 citation; the actual scroll uses
    a four-dot scribal convention there (confirmed directly against the
    Study Edition's own rendering).
  - Remaining Column 5/6 verses stayed genuinely unresolved after
    exhausting available search methods (Qumran-Digital's line concordance
    is blocked in this sandbox) — reported as open, not guessed at.
  - Full 7-item find-first report written (file, current text, exact
    proposed text) per Rule 11. **User said "Hold for tomorrow" — nothing
    written to any ACR2 file. Report stands ready for approval next
    session.**
- Mid-audit, the user directed Claude to relay the still-unresolved
  Column 5/6 verses to a second AI service (with Qumran-Digital access
  this sandbox lacks) for citation lookup, then pushed back hard on
  Claude's initial refusal to include anything Claude couldn't personally
  re-verify. Resolved by adding **Rule 37** to CLAUDE.md: a specific,
  named, checkable manuscript citation (column/line/fragment) is what
  makes relayed content includable, not Claude's personal confirmation of
  it — but a bare "verified" claim with no citation behind it is still
  rejected exactly as Rule 29 already required. Purely additive: verified
  via diff before commit (38 lines added, 0 removed, 0 changed) and
  reconfirmed after merge.
- Backup: `backup/2026-09-10-rule37` (SHA `029f1aa8`, current stable
  state, after PR #917 merged).

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

## Investigated today (no code change — decided to leave as-is)

- **ACR Search daily-brief pipeline: "Africa map vote" not appearing.**
  User asked why yesterday's new Mercator/Equal Earth/"Correct the Map"
  keywords (added to `.github/scripts/build_daily_brief.js`'s "Awakening"
  theme on 2026-09-09) showed nothing in today's brief. Investigated
  directly, not guessed:
  - Confirmed the keywords are correctly present in the script.
  - Confirmed today's `Search/daily_brief.json` (generated 2026-09-10
    11:00 UTC) genuinely ran with the updated script.
  - Confirmed via web search the real UN "Correct the Map" vote happened
    **September 4, 2026** — six days before the keywords were added
    (Sept 9) and the brief that should catch it ran (Sept 10). The
    pipeline only scores each RSS source's current ~40 most-recent
    headlines per run; it can't retroactively reach back into a news
    cycle that already scrolled off those feeds before the keyword
    existed. Not a wiring bug — a structural limit of the daily-snapshot
    design.
  - Offered two options: leave it (catches only future/follow-up
    coverage) or do a one-time manual backfill of the Sept 4 vote itself
    into today's brief. **User's decision: leave it** — no backfill, no
    code change. Future coverage of this story will be caught correctly
    since the keywords are live; the original vote-day coverage stays
    uncaptured by design.

## Outstanding / blocking (carried over, not from today)

- **ACR2 7-item find-first report awaiting approval — "Hold for
  tomorrow."** Fully verified, ready to ship on approval, nothing written
  yet:
  1. CD `file_19.json` Column 3 v1 — delete (fabricated "Baal Peor" line).
  2. CD `file_19.json` Column 5 v1 — delete (duplicate oath formula).
  3. CD `file_19.json` Column 5 vv11-12 — delete (1QS content bled into CD).
  4. CD `file_19.json` Column 6 v10 — trim (keep only the real second
     sentence, cut the duplicate oath formula).
  5. CD `file_20.json` Column 9 v1 — replace with the real opening
     (Leviticus 27:29 vow-to-destruction / do-not-avenge-yourself).
  6. CD `file_20.json` Column 15 — insert the real missing opening (3 new
     verses, cascading renumbering of the rest of the column + its notes).
  7. 1QS `file_21.json` Column 8 — correct the DSS/Masoretic notes'
     tetrapuncta claim (verse text itself unchanged).
  Also still open, not part of the 7 (needs the relayed-AI citation lookup
  under new Rule 37 before it can be resolved): the rest of CD Column 5
  (vv2-9, 13-17 after the above cuts) and Column 6 (vv9, 11-14) — thematic
  overlap with already-correct Columns 9/11/12/13/14 content, but no
  confirmed exact locus yet.
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

- ACR2 7-item CD/1QS fix report — parked pending user approval, "hold for tomorrow."
- ACR2 remaining Column 5/6 verse tracing — parked pending relayed AI citation lookup (Rule 37).
- Yovelim Ch7/11/12/17-19/22 fixes — parked pending verified source content.
- Rule 36 keep-or-remove — parked pending user decision.
- Email vs. push reminder for holy days — parked pending user decision.
- Jubilees-based year numbering — parked, named as an option, not requested yet.

## Today's commit log

```
2cf49240 CLAUDE.md: add Rule 37 (citation is the standard for external AI relay content)
0e4fe7a ACR Solar: rename New Year to Rosh Chodashim, disclose the Hebrew Year epoch
```

## Backups

- `backup/2026-09-10-acr-solar-v47` — SHA `14e4d88` (before PR #913)
- `backup/2026-09-10-acr-solar-v48` — SHA `231ec21` (stable state after PR #913)
- `backup/2026-09-10-rule37` — SHA `029f1aa8` (current stable state, after PR #917)

Recovery: `git checkout backup/<name>`
