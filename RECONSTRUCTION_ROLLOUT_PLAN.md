# ACR Reader Reconstruction Rollout Plan

Standing procedure for getting each rebuilt volume-part (DSS/Orit-based
reconstruction, delivered as a docx) into the live ACR Reader, Study, and
Search. Applies to every volume as it is completed and delivered — not a
one-off plan for Shemot alone.

This is a planning document. It does not itself authorize touching any
locked site. Rule 8 unlock phrases, Rule 11 (find first, fix second), Rule
26 (backup before change), and Rule 9 (merge requires user confirmation)
all still apply in full to every step below.

## The two guarantees, every volume, every time

1. **All information added.** Every verse and every note in the delivered
   docx ends up in the reader, Study, and Search. Checked by counting:
   final verse count per chapter equals the docx; final note count per
   chapter equals the docx.
2. **Look, format, and feel unchanged.** The app shell (index.html,
   acr.css, fonts, layout, sidebar, navigation) is never touched, for any
   volume. Inside each content file, every existing style code is kept
   exactly; new verses and notes are stamped from the same style mold
   already in that file.

## Standing decisions (confirmed by the user 2026-08-04, apply to all volumes)

- **Completeness is absolute.** All text, all notes, all verses must be
  added — nothing missing, ever. The reader's older standard of exactly
  four notes per chapter (DSS, Orit Ge'ez, Masoretic Variant, Critical
  Note) is retired for reconstructed content. A chapter holds as many
  notes of each type as the reconstruction actually provides — the shape
  flexes to fit all the content; content is never trimmed, summarized, or
  dropped to fit the old shape. Every note keeps its exact existing style
  (same four color-coded labels, same italic size and spacing), so a
  single note still looks identical to today's — there are simply as many
  as needed. This overrides the ACR_READER_DESIGN.md / CLAUDE.md Rule 20
  "exactly four notes" language for reconstructed content specifically.
- **Verse numbering matches the rebuilt file exactly, always.** The
  reader's chapter:verse numbering must exactly match the rebuilt/
  reconstructed docx as delivered. The converter never re-splits, merges,
  or renumbers a verse to match a different (e.g. standard English/
  Christian, or standard Hebrew/Masoretic) versification. Whatever
  chapter:verse numbers the docx assigns are the numbers that go into the
  reader, Study, and Search, verbatim — even where a docx's own internal
  numbering departs from familiar convention. If a note cites a verse
  number that doesn't match the delivered numbering, the note gets
  corrected to the delivered numbering; the verse boundaries themselves
  are never adjusted to match the note.

## Standing decision — backup before every addition, no exceptions

**The current live state of the ACR Reader must be backed up immediately
before adding any new volume's information — every single time, for every
volume, with no exceptions.** This is not a one-time setup step; it repeats
on every pass of the cycle below, right before Step 4 (Convert) touches
anything. A backup branch is cut from the pre-change `main` HEAD, pushed,
and its SHA verified to match pre-change `origin/main` before any content
is written. The branch name and SHA are reported to the user every time.
This is Rule 26 applied without exception to every volume delivery.

## The repeating cycle — one pass per volume-part

| Step | What happens |
|---|---|
| 1. QA scan | Forensic scan on arrival: chapter/verse completeness, niqqud policy, old-wording check, every note checked against its verse. Reported before anything else happens. |
| 2. User review | User decides whether findings (if any) need fixing before conversion. |
| 3. Backup (every volume, every time) | Sync main, create and verify a backup branch at the pre-change HEAD, report branch and SHA. This step is never skipped, even if a backup was already made for a previous volume. |
| 4. Convert | The docx's verses and notes are poured into the reader's exact existing style tokens for that volume's content file — never hand-typed, never restyled. |
| 5. Preview | A full worked chapter rendered in the real reader CSS, shown before anything is written. User confirms look-and-feel is unchanged and all information is present. |
| 6. Sync Study + Search | **DEFERRED as of 2026-08-05 — see standing decision below.** Not performed during the current phase. |
| 7. Verify | Verse counts and note counts per chapter match the docx exactly; JSON parses; HTML is structurally valid; navigation arrays (NAVIDS/LABELS/TOC) still match the files that exist. Scoped to whichever surfaces were actually changed in the current phase. |
| 8. Ship | Cache versions bumped forward for whichever surfaces changed. Feature branch pushed, PR opened listing every changed file and the risk level. |
| 9. Merge | User merges. Claude only ever sends the link. |

## Standing decision — ACR Reader only for now (confirmed by the user 2026-08-05)

Volumes are being shipped to the **ACR Reader site only** for the current
phase. Study and Search are intentionally left untouched — Step 6 (Sync
Study + Search) is deferred and does not run per-volume right now. Search
and Study will be brought back into sync in a separate, later phase covering
all volumes shipped up to that point, not volume-by-volume alongside the
Reader. Until that later phase, Study and Search legitimately diverge from
the Reader for any volume shipped under this decision — that divergence is
expected, not a defect. When that later phase begins, this plan will be
updated to reactivate Step 6 and define the batch-sync procedure.

## Sequencing across volumes

- Volumes are processed in whatever order the user delivers them — no
  fixed schedule assumed.
- Each volume-part goes through the full nine-step cycle independently.
- State as of 2026-08-04: Shemot Part 1 — reconstructed, one stale note
  (Exodus 1:7) corrected, QA-clean, not yet shipped. Shemot Part 2 —
  reconstructed; QA found two notes (chapter 20) citing verse numbers that
  don't match the chapter's own delivered numbering — per the verse-
  numbering rule above, the fix is to correct those two notes, not the
  verse boundaries; not yet resolved or shipped. Bereshit Part 1 —
  reconstructed, QA-clean, not yet shipped. Bereshit Part 2 — pending
  delivery.
- None of the above have been shipped to the live site yet. QA and
  correction happen first; this rollout plan governs getting each into
  the live reader/Study/Search once shipping begins.

## Gates that never change, for any volume

- No work on the reader without the exact typed unlock phrase for that
  site (Rule 8).
- No text written until the rendered preview is approved.
- Backup made and verified before any change (Rule 26).
- No merge without explicit user confirmation — Claude only sends the
  link (Rule 9).
