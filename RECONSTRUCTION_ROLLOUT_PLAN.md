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
| 4. Convert | The docx's verses and notes are poured into the reader's exact existing style tokens for that volume's content file — never hand-typed, never restyled. See "Per-file style tokens" below: the converter first reads that file's own current live HTML to find its established conventions, never assumes another volume's pattern. |
| 5. Preview | A full worked chapter (or the boundary chapter, if a part boundary changed) rendered in the real reader CSS, shown before anything is written. User confirms look-and-feel is unchanged and all information is present. |
| 6. Sync Study + Search | **DEFERRED as of 2026-08-05 — see standing decision below.** Not performed during the current phase. |
| 7. Verify | See "Verification method" below — verse-by-verse text comparison against the docx, not just counts, plus glyph, niqqud, JSON, and tag-balance checks. Navigation arrays (NAVIDS/LABELS/TOC) confirmed to still match the files that exist. Scoped to whichever surfaces were actually changed in the current phase. |
| 8. Ship | Cache versions bumped forward for whichever surfaces changed. Feature branch pushed, PR opened listing every changed file and the risk level. |
| 9. Merge | User merges. Claude only ever sends the link. After merge, every check in step 7 is re-run directly against `origin/main` (not assumed from the pre-merge branch) and reported before declaring the volume live. |

## Per-file style tokens — read the live file first, every time

Before building any converter for a volume, read that file's *own current*
`data/file_N.json` directly and confirm its established conventions — do not
assume the pattern used for a different volume:
- **Verse ref display**: some files use bare verse numbers with
  `data-ptype="verse"` (e.g. Bereshit Part 1); others use `chapter:verse`
  refs relying on the reader's own chapter:verse text-pattern fallback in
  `index.html` (`isVerseEl()`), with no `data-ptype="verse"` needed (e.g.
  Bereshit Part 2-4, Shemot Part 1-2). Both are real, functional,
  reader-anticipated conventions — confirmed by reading `index.html`'s
  JS, not assumed. Preserve whichever convention that specific file
  already uses; never import one volume's convention into another's file.
- **Section dividers**: preserved in their exact existing wording and
  position. Never invent a new divider for content the docx doesn't
  provide an equivalent grouping label for — if a part boundary shifts a
  chapter into or out of a divider's range, only the range number in the
  existing divider text is corrected; the wording stays the same unless
  there's a clear reason to add a new one (flag this to the user rather
  than deciding unilaterally).
- **Front matter and colophon wording**: "Option B" pattern — reworded to
  reflect the fuller reconstruction detail (manuscript authorities, etc.),
  but using the exact same style tokens (colors, sizes, structure) as the
  live file. If a colophon contains a whole-book summary of all parts
  (e.g. Bereshit Part 4's "VOLUME ONE — FOUR PARTS" block), every part's
  chapter range in that summary is corrected to match reality, not just
  the current part's own range.

## Part-boundary changes — confirm with the user, then propagate everywhere

A delivered docx's own part boundary is authoritative (same principle as
verse numbering) even when it differs from the site's current navigation
split — e.g. Bereshit Part 3's docx included Chapter 37, moving it out of
Part 4, confirmed with the user on 2026-08-05. When this happens:
- Ask the user to confirm before building anything (this is a structural
  navigation decision, not just content).
- Once confirmed, update in the same PR: `index.html` LABELS and TOC
  arrays (both must change together — verified by grep count, not
  assumed), the front matter chapter-range line, the affected section
  divider's range number, and any whole-book colophon summary that lists
  every part's range.
- Verify no chapter appears in two files at once and no chapter is
  skipped — cross-check every part's chapter set against the full
  expected range for that volume (e.g. all 4 Bereshit parts together
  must cover 1-50 exactly once).

## Verification method — verse-by-verse, not just counts

Counting verses and notes per chapter is the first check, not the only
one. Before shipping, and again after merge against `origin/main`:
- **Verse-by-verse text comparison**: every `(chapter, verse)` key from
  the parsed docx is compared against the built file's actual text for
  that same key — reporting 0 missing, 0 extra, 0 text mismatches, not
  just equal counts. Equal counts alone cannot catch a verse that got
  swapped or duplicated into the wrong slot.
- **Niqqud check**: scan every character in the built file against the
  full Hebrew points Unicode block (U+0591-U+05C7 — cantillation marks
  and vowel points together), not a narrow guessed range. Also confirm
  Hebrew consonant characters ARE present somewhere in the file, so a
  zero-niqqud result is a real finding and not vacuously true from having
  no Hebrew text at all.
- **Paleo YHWH glyph check**: the correct sequence is
  `U+10909 U+10904 U+10905 U+10904` (YOD HE WAW HE). Check both that 0
  wrong sequences remain AND that the expected count of correct sequences
  is present — this bug shipped live twice in one day (2026-08-05) because
  a hand-typed codepoint was wrong in two different ways in two different
  build scripts; every new converter script is grepped for `10911` or any
  hand-typed glyph literal before it's ever run, not just the output.
- **JSON validity and HTML tag balance**: `json.load()` succeeds; `<p>`/
  `</p>` and `<span>`/`</span>` open/close counts match exactly.
- **Scope check**: `git diff --stat` confirms only the intended files
  changed before every commit.

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
- State as of 2026-08-05 (end of day): **Shemot Part 1 and Part 2, and
  Bereshit Parts 1-4, are all shipped and live**, each merged and
  re-verified against `origin/main` after merge. Bereshit is now
  complete: all 4 parts cover Genesis 1-50 exactly once, 1,533 verses
  total. Shemot Part 1 also had a two-stage paleo-glyph codepoint bug
  (wrong first letter, then wrong last letter) found and fixed live —
  see the Verification method section above for the check that now
  catches this before shipping.
- Next volumes ship as the user delivers their rebuilt docx and confirms
  each one through the same nine-step cycle.

## Gates that never change, for any volume

- No work on the reader without the exact typed unlock phrase for that
  site (Rule 8).
- No text written until the rendered preview is approved.
- Backup made and verified before any change (Rule 26).
- No merge without explicit user confirmation — Claude only sends the
  link (Rule 9).
