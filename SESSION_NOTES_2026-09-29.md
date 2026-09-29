# Session Notes — 2026-09-29

## Current state

- `origin/main` HEAD: `25660f6` (merge of PR #1002)
- Working tree clean, nothing uncommitted.
- ACR Solar cache: `acr-solar-v68` (`Solar/sw.js`).

## Built today

- Searched ACR Reader's own content (`data/file_*.json`) for referenced
  prayer times per the user's question — confirmed a morning-and-evening
  (tamid) pattern, not a single daily time, across Torah, Tehillim, Ezra,
  Chanokh/Yovelim, and Daniyel, each cited to exact chapter/verse.
- ACR Solar: added a new "Primary Source References — The Daily Tamid"
  section to the Morning Prayer and Evening Prayer categories in the
  Prayer Library (`buildPrayer()`, `PCATS` id 10/11, `Solar/index.html`).
  9 references on both categories (Bamidbar 28:3-4, Tehillim 55:17,
  1 Divrei HaYamim 16:39-40, 2 Divrei HaYamim 2:4, 2 Divrei HaYamim 31:3,
  Daniyel 8:11, Temple Scroll 11Q19 Column 2:12, Community Rule 1QS
  Column 10:8, Yovelim 16:24), plus 3 evening-specific (Tehillim 141:2,
  Ezra 9:4-5, Daniyel 9:21). Existing compact `src`/`ms` citation lines
  left untouched — new section, not an append, per user direction.
  Every citation independently re-verified word-for-word against the
  actual source JSON in this session after the user flagged two earlier
  mistaken attributions (see "Corrections" below). Cache bumped to
  `acr-solar-v68` (PR #1002, merged by DssOrit `25660f6` 06:18:34Z,
  confirmed directly via `pull_request_read`).

## Corrections made this session (Rule 33/34)

- Two citations first reported to the user as "Chanokh" were wrong and
  corrected before anything was written to a file:
  - "morning and evening he burnt fragrant substances" / "causes it to
    rain morning and evening" → actually **Yovelim (Jubilees) 16:24**
    and 12, not Chanokh.
  - "with the coming of day... the going out of evening and morning I
    will speak his laws" → actually **Community Rule, 1QS Column 10:8**,
    not Chanokh.
- Every one of the 12 final citations was individually re-traced to its
  exact chapter/column/verse marker and quoted text in the source JSON
  before being written to `Solar/index.html`, after the user explicitly
  asked for full re-verification.

## Outstanding / blocking

- Nothing outstanding flagged by the user this session.

## Pending / parked

- `data/file_98.json` (1QS / Community Rule) and `data/file_109.json`
  (Temple Scroll 11Q19) were found not to be present in `data/nav.json`'s
  `ids`/`labels` arrays during this session's citation work. Not touched
  or investigated further — flagging for a future session in case it's a
  real navigation gap (same class of issue as the 2026-08-25 volume-
  numbering incident logged in CLAUDE.md).

## Capability gaps in this session

- None encountered.

## Today's commit log (origin/main, oneline, today's commits only)

```
25660f6 Merge pull request #1002 from DssOrit/claude/solar-tamid-references-2026-09-29
ece8226 Solar: add primary-source references for the daily morning/evening tamid
```

## Backups

- `backup/2026-09-29-acr-solar-v68` — `25660f6` (newest; matches
  `origin/main` HEAD exactly, verified via `git ls-remote`).
- `backup/2026-09-29-acr-solar-pre-tamid-refs` — `8ba3c7c` (pre-change
  point for the tamid-references edit, per Rule 26).
- Recovery: `git checkout backup/2026-09-29-acr-solar-v68`.
