# ACR Torah Site Verification Scan Protocol

Locked 2026-08-07. Read-only structural verification of the 12 live Torah
files on ACR Reader (`data/file_1.json` through `data/file_12.json`)
against the frozen production totals. This scan never modifies the site,
never modifies any JSON, never modifies any docx, never regenerates
anything, and never repairs anything it finds. It reports only.

**Do not run this scan without confirming with the user first.** A
monthly reminder is scheduled (see "Monthly cadence" below) but firing
the reminder is not the same as approval to run — always ask, wait for
the answer, then run.

## What this verifies

1. Every required chapter exists, in the correct order, no duplicates.
2. Every expected verse is present, contiguous, no duplicates, no silent
   merges or splits, no missing final verse.
3. Fresh per-chapter/per-part/per-volume/Torah totals match the locked
   totals below (never trust a prior report's numbers — re-derive).
4. Known Hebrew/English versification-difference chapters carry a
   disclosure note (keyword-level check, not full semantic read).
5. No stale old-Reader routing — confirms `index.html`'s file loader
   (`fetch('data/'+fid+'.json')`, driven by `NAVIDS`) points only at
   `file_1`–`file_12` for the 12 Torah slots, in the correct order.
6. No ESV/KJV/JPS-derived stale text silently serving as verse content
   (checked directly against every verse-text span, not just a raw
   string search, so a legitimate disclosed methodology note doesn't
   get confused with actual stale content — but is still reported).
7. Every chapter carries at least DSS, Masoretic Variant, and Critical
   Note. Orit/Ge'ez is checked for presence only where the underlying
   source actually provides it — its absence is not automatically a
   defect (Vayikra's source material carries no Orit Ge'ez evidence,
   confirmed with the user during the original build).
8. Niqqud/maqaf: zero actual vowel points (patach, kamatz, sheva, etc.)
   is the requirement. Maqaf (־, U+05BE, a word-divider, not a vowel)
   is reported separately if found, since Rule 22's own wording bans
   "dots and dashes" and maqaf is literally a dash — this scan doesn't
   pre-judge that ambiguity, it just reports the count and location.
9. Zero "Lord"/"God" as the divine name inside actual verse text
   (checked against every verse-text span directly, not notes, where
   documenting a substitution is expected and fine per the Name Rule).
10. No chapter or verse content from one Torah volume appearing inside
    another volume's file.

## Authoritative production totals (locked)

| Volume | Chapters | Verses | Part 1 | Part 2 | Part 3 | Part 4 |
|---|---|---|---|---|---|---|
| Bereshit | 50 | 1,533 | file_1: 1–11 = 299 | file_2: 12–25 = 394 | file_3: 26–37 = 427 | file_4: 38–50 = 413 |
| Shemot | 40 | 1,209 | file_5: 1–18 = 494 | file_6: 19–40 = 715 | — | — |
| Vayikra | 27 | 859 | file_7: 1–16 = 490 | file_8: 17–27 = 369 | — | — |
| Bamidbar | 36 | 1,288 | file_9: 1–18 = 685 | file_10: 19–36 = 603 | — | — |
| Devarim | 34 | 955 | file_11: 1–17 = 488 | file_12: 18–34 = 467 | — | — |

**Torah total: 5 volumes, 12 parts, 187 chapters, 5,844 verses.**

If a future rebuild changes any of these numbers, update this table in
the same PR as the content change — this table is the scan's ground
truth, not a historical record.

## Known versification-difference cases (spot-checked each run)

Bereshit 31/32 · Vayikra 5/6 · Bamidbar 16/17 · Bamidbar 29/30 ·
Devarim 5 · Devarim 13 · Devarim 22/23 · Devarim 28/29 ·
Shemot 20 (Decalogue numbering)

## How to run it

```
python3 scripts/torah_verification_scan.py
```

Run from the repo root, against a clean/synced `main` (fetch and check
out `origin/main` first — never scan a stale local branch). The script
parses two coexisting verse-display conventions directly from the live
HTML, not from memory:

- **Bare, per-chapter-resetting numbers** (`data-ptype="verse"`,
  `padding-left:1.8em`) — used only by `file_1` (Bereshit Part 1).
- **`chapter:verse` refs** (no `data-ptype="verse"` needed, relies on
  the reader's own `isVerseEl()` regex fallback) — used by every other
  Torah file, `file_2` through `file_12`.

Never assume one convention for a file you haven't checked this run —
confirm which pattern is present before trusting a zero-count result.

## Output format

On a clean run, state exactly:

```
ACR TORAH SITE VERIFICATION SCAN: PASS
187/187 chapters present
5,844/5,844 verses present
Zero missing verses
Zero duplicated verses
Zero cross-volume leakage
No stale active Reader lineage detected
```

On any defect: do not fix it. List every defect found, with exact file
paths and chapter/verse numbers, and stop. Report secondary/gray-area
findings (maqaf, disclosed methodology notes, etc.) separately from
actual missing/duplicate/shifted-verse defects so the user isn't misled
about what the scan is actually telling them.

## Monthly cadence

A Routine is scheduled to remind the user roughly monthly that a scan is
due. When it fires, ask before running — do not run automatically, even
though the reminder itself is routine. If the user says no or wants to
defer, that's fine, just ask again next month.
