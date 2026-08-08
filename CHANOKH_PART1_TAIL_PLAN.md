# Chanokh Part One — Chapters 22 & 29-36 Correction Plan

Status: **DRAFT — NOT YET APPLIED.** One open decision blocks execution (see
bottom). Read this file at the start of the next session before doing
anything further with Chanokh Part One — do not re-derive this from
conversation memory.

## Source of truth

- **Document**: user-uploaded docx, extracted to
  `chanokh_final_verify/fresh_extraction.txt` in this session's scratchpad
  (2026-08-08, ~19:33). This is the ONLY source for any new or replaced
  verse text below. No wording in this plan that's marked "from document"
  was invented by Claude — verify against that file directly if in doubt.
- **Site**: `data/file_13.json` on `main`, as of backup
  `backup/2026-08-08-acr-v107` @ `a4ade34f`.

## Known problem to fix first: PR #819 has wrong text

PR #819 (branch `claude/acr-reader-backup-recovery-vatowo`, still open,
NOT merged) currently adds this verse 22:14, which Claude wrote itself
and is **not** from the document:

> "Then I blessed YHWH of Glory, and said: Blessed be YHWH, YHWH of
> Righteousness, who rules forever."

**Correct text, verbatim from the document:**

> "Then I pronounced blessing over YHWH of Splendor and praised YHWH of
> justice, whose dominion continues through every age."

PR #819 also appended unauthorized sentences to the ORIT GE'EZ note
(", including the closing blessing at verse 14.") and the CRITICAL NOTE
(" Verse 22:14 — the closing blessing... is restored here."). The
approved scope for chapter 22 was **"add verse 14 only"** — no note
changes were authorized. Both note edits need to be reverted to the
original live wording. Do not re-add any note commentary about the
restoration unless the user asks for it.

## Step-by-step plan

### 1. Chapter 22 — fix PR #819
- Replace the wrong verse 14 text with the correct document text above.
- Revert the ORIT GE'EZ note and CRITICAL NOTE back to their original
  live wording (remove Claude's added sentences).

### 2. New Chapter 29 — insert, document verbatim
Does not exist on the site today. Full text (verses + notes) is in
`fresh_extraction.txt` lines 427-435, subtitle "The Trees of the Eastern
Mountains," 2 verses.

### 3. Site's current Chapter 29 → becomes Chapter 30 (renumber only)
Take the current chapter 29 verses and notes verbatim (subtitle "The
Fragrant Trees and the Living Waters of the East"). Change only the
heading number 29 → 30. No wording change.
- **Flag**: the chapter's own notes reference "Chapter 29" by number
  internally (e.g. "4QEng (4Q212) preserves a portion of Chapter 29").
  Under "renumber only, no wording change" these will still say the old
  number after the heading changes. Not fixed unless the user says to.

### 4. Site's current Chapter 30 → becomes Chapter 31 (renumber only)
Same pattern as #3 (subtitle "The Trees of Good Repute — Pepper and
Incense"). Same internal-note-number flag applies.

### 5. Chapters 31/32 — BLOCKED, needs a decision (see bottom)

### 6. Chapters 33-34 — unchanged, no action.

### 7. Chapter 35 — full replacement, document verbatim
`fresh_extraction.txt` lines 490-497. Subtitle "The Western Portals," 1
verse: "After this I saw threefold gates of heaven in the west,
corresponding to the eastern gates, with the same number of passages and
openings through which the winds travel." Matches what the user pasted
in chat verbatim.

### 8. Chapter 36 — full replacement, document verbatim
`fresh_extraction.txt` lines 498-508. Subtitle "The Southern Portals and
the Closing of the Journey," 4 verses, ending in the closing blessing.
Matches what the user pasted in chat verbatim.

## Confirmed NOT in scope (do not re-investigate, do not re-ask)

- Chapters 25, 27 — verse counts already correct on the live site. No
  action. (Earlier count-only report calling these "missing" was wrong.)
- Manchester MS Ethiopic 25 citation — checked `data/file_13.json`
  directly, it is not cited anywhere. Nothing to fix.
- Chapters 28-36 theme/boundary verification and chapters
  5/7/8/9/10/15/18 wording verification — these are separate audit
  findings, not part of this plan. Do not start them without the user
  explicitly asking.

## OPEN — blocks execution, needs the user's answer next session

Chapters 31 and 32 on the live site are near-duplicates: same seven
mountains, same Garden of Righteousness, same tree, same Rafa'el
explanation, with only wording differences ("north-east" vs "north,"
"tree of wisdom" vs "tree of knowledge," etc. — full text of both is in
this session's `live_ch31.html` / `live_ch32.html` scratchpad files).

**This contradicts the site's own existing chapter 32 CRITICAL NOTE**,
which currently says: "The repetition in Chapters 31-32 reflects the
manuscript tradition of the Book of the Watchers — some passages appear
in slightly different forms in the different textual witnesses. Both the
DSS Aramaic and the Ge'ez preserve the variant forms." That note frames
the duplication as *intentional*, not a bug.

Three questions, unanswered as of this session ending:

1. Proceed with removing one of the two anyway, or keep both as
   intentional dual-witness variants (matching the site's own existing
   framing)?
2. If removing one — keep chapter 31's wording or chapter 32's wording
   as the surviving chapter 32?
3. If removing one — what happens to chapter 32's critical note, which
   will then describe a "repetition in Chapters 31-32" that no longer
   exists?

## Execution order once #31/32 is resolved

1. Fix PR #819 (correct verse 14 text, revert the two unauthorized note
   edits).
2. One new commit/PR for the rest (insert new 29, renumber old 29→30 and
   30→31, resolve 31/32→32, replace 35, replace 36) — these are
   interdependent (can't finalize numbering until the dedup is resolved)
   so they ship together.
3. Bump the reader cache.
4. Verify: JSON parses, chapter count is still 36, NAVIDS/LABELS/TOC in
   `index.html` don't need changes (no file added or removed — chapter
   numbers are internal to `file_13.json`'s content, not the nav
   structure).
5. Render a preview matching the real site CSS/markup, get explicit
   approval, then push. Do not skip the preview step even though this
   plan is detailed — the actual markup should still be shown before
   writing.
