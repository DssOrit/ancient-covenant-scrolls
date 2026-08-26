# Session Notes — 2026-08-26

## Current state

- `main` HEAD at time of writing: `b41625d` (PR #845 merged), cache `acr-v114`.
- PR **#847** open: "ACR Reader: clean up redundant 'covenant' word-spam
  in comparative notes" — awaiting user merge confirmation per Rule 9.
  Cache bumped `acr-v114` -> `acr-v115`.

## Built today

1. **Nehemiah Chapter 1 verse-count check (read-only).** User asked whether
   Nekhemyah Chapter 1 has the right number of verses. Checked the live
   content file (`data/file_88.json`) directly: 11 verses, numbered 1-11,
   sequential, no gaps or duplicates, content complete and correctly
   ending on "...for I was cupbearer to the king" (the standard,
   intentional chapter-1 ending — not a truncation). User corrected the
   sourcing standard used to confirm this: per Rule 13, DSS/Orit Ge'ez are
   the authority here, not Masoretic agreement — noted for the record that
   the file's own `[DSS]` note says no substantial Nehemiah text exists in
   the Dead Sea Scrolls, so Orit Ge'ez is the actual primary witness, and
   its own `[ORIT GE'EZ]` note independently confirms the chapter's
   content through verse 9. Finding stands: chapter is complete. No
   change made.

2. **Found, scoped, and fixed: a "covenant"-word-spam bug in the
   comparative notes apparatus (PR #847, open).** While checking
   Nehemiah 1, noticed its `[DSS]`/`[ORIT GE'EZ]`/`[MASORETIC
   VARIANT]`/`[CRITICAL NOTE]` text was corrupted with the word
   "covenant" repeated nonsensically (e.g. "Covenant action is preceded
   by covenant genuine covenant grief"). Scanned every content file on
   ACR Reader: **45 files affected, 40 of them live/linked in current
   navigation** — spans Joshua Pt.3, Judges Pt.3, all of Isaiah (5
   parts), Jeremiah (7 parts), Ezekiel (6 parts), The Twelve (5 parts),
   Job (3 parts), Song of Songs, Ruth, Lamentations, Ecclesiastes,
   Esther, Daniel (2 parts), Ezra-Nekhemyah (2 parts), 1 Chronicles (2
   parts), 2 Chronicles Pt.1. Confirmed the corruption is confined to
   the editorial notes only — spot-checked actual scripture verse text
   in several affected files and it is clean/legitimate in every case
   checked.

   User initially said "leave it" for the session; came back later and
   asked for the exact issue plus a planned fix. **User's key framing
   correction: "The word is important. It just should not be redundant
   in one note"** — i.e. the fix is not to purge "covenant" from the
   notes (the word is core to the site's own theme), but to collapse
   redundant repeats within a single note down to one natural mention.

   - **Draft-tested before writing anything**, per "backup first &
     verify no breaking." Built the fix, then deliberately tried to
     break it. Caught and fixed 4 separate bugs in the fix logic itself
     before it was safe: (1) triple/stacked "covenant covenant covenant
     X" repeats didn't fully collapse in one regex pass; (2) an
     over-eager strip rule broke a genuine, correct phrase — "profaning
     the covenant of our fathers" became "profaning the of our
     fathers" — fixed by protecting "covenant of/with/between/before/
     among/and" as legitimate constructions; (3) stripping a
     sentence-initial "Covenant" left the next word lowercase — fixed
     with a capitalization carry-over; (4) found after re-running the
     full batch: a literal "covenant covenant X" double-duplicate (2
     files: Daniel, Nehemiah) corrupted a closing `</span>` tag because
     two overlapping edit decisions collided — fixed with a two-step
     approach (collapse literal stacked duplicates first, then apply
     the keep-first-strip-redundant logic).
   - **Backup:** `backup/2026-08-26-pre-covenant-fix` cut and verified
     against `origin/main` before any write.
   - User gave the ACR Reader unlock phrase ("edit ACR reader") for
     this task specifically before any write, per the site's per-task
     unlock discipline.
   - **Final verification, done directly against `git HEAD`** (not just
     the draft): every one of the 40 files' non-note content (verses,
     titles, colophons) is byte-for-byte unchanged; HTML tag counts and
     note-box counts unchanged in every file; zero broken-grammar
     patterns; zero capitalization slips; all 40 files valid JSON.
     Total "covenant" mentions across the 40 files: 11,832 -> 1,991
     (roughly one meaningful mention per note box). Cache bumped
     `acr-v114` -> `acr-v115`.
   - **PR #847 opened, presented per Rule 9, NOT merged by Claude** —
     awaiting user merge confirmation.

3. **Fixed and shipped: TTS misreads verses starting with "May" as a
   calendar date (PR #845, merged).** User found the bug live in Psalm
   109 — the read-aloud voice said "May 14th" instead of reading verse
   14 ("May the iniquity of his fathers be remembered..."). Root cause:
   the site's `pronounce()` function (which prepares verse text before
   handing it to the browser's `SpeechSynthesisUtterance`) does nothing
   to a plain verse paragraph's raw text ("14  May the iniquity..."), so
   when a verse number sits directly next to the word "May", the OS/
   browser speech engine's own date-detection reads the two together as
   a date instead of "verse 14" + the sentence.
   - **Scan (read-only, before any fix):** searched every content file
     for verse-number-then-month-name adjacency. Found 85 verses total,
     every one triggered by "May" specifically (no other month name
     appeared). Affects Genesis, 1 Samuel, 2 Samuel, Jeremiah, Malakhi
     (The Twelve), 6 of 9 Psalms parts, and Ezra — plus 4 files not
     currently linked in navigation.
   - User scoped the fix explicitly: **"Fix May verses only"** — not the
     covenant-spam bug, not a general month-name fix beyond what's
     actually present. Gave the ACR Reader unlock phrase ("edit ACR
     reader") before any write.
   - **Fix:** one line added to `pronounce()` — inserts a period between
     a verse number and a leading "May" so the speech engine reads them
     as two separate sentences instead of fusing them into a date.
   - **Backup:** `backup/2026-08-26-acr-v113` cut and verified against
     `origin/main` before the write.
   - **Verification:** extracted the real (not reimplemented)
     `pronounce()` function and ran it in Node against the actual text of
     all 85 affected verses — every one gets the fix correctly. Ran the
     same real function against 500 sampled non-"May" verses — output
     byte-for-byte identical before and after, confirming zero side
     effects elsewhere. HTML tag counts balanced, all inline `<script>`
     blocks pass a syntax check, `sw.js` passes `node --check`. Cache
     bumped `acr-v113` -> `acr-v114`.
   - **PR #845 opened, presented per Rule 9, merged by user
     (`merged_by: DssOrit`).** Verified merge live on `main` directly
     (not just from PR metadata): `main` HEAD `b41625d`, `sw.js` shows
     `acr-v114`, `pronounce()` on `main` has the fix.
   - **User confirmed "Verified on iPad."** Stable-state backup
     `backup/2026-08-26-acr-v114` cut immediately per the mandatory
     backup-on-verified-working rule.

## Outstanding / blocking

- **PR #847 needs user merge confirmation** (covenant-word-spam
  cleanup, 40 files):
  https://github.com/DssOrit/ancient-covenant-scrolls/pull/847
- The 5 not-currently-linked files with the same corruption (Damascus
  Document x2, Community Rule, Temple Scroll x2) were NOT touched —
  out of scope since they're unreachable on the live site. One of them
  (Temple Scroll, higher part) also has the corruption bleeding into
  actual verse text, unlike every live file — flagged, not fixed, no
  unlock given for it.

## Pending / parked

- None new today beyond the covenant-spam item above.

## Capability gaps in this session

- None encountered.

## Today's commit log (newest first)

```
49eb83b ACR Reader: clean up redundant 'covenant' word-spam in comparative notes
b41625d Merge pull request #845 from DssOrit/claude/acr-reader-fix-may-verse-tts
2c01a2f ACR Reader: fix TTS misreading verses starting with 'May' as a date
396fba6 Prophetic Watch brief 2026-08-26
```

(the covenant-spam commit is on open branch `claude/acr-reader-covenant-spam-cleanup`, not yet merged to `main`)

## Backups

- `backup/2026-08-26-acr-v113` — SHA `396fba6daa450ed157e1aa5571e93b1a050c2f61`,
  `main` HEAD right before the May-verse TTS fix. Cut and verified
  before any write, per Rule 26.
- `backup/2026-08-26-acr-v114` — SHA `b41625d9e0f04552532f7761d2998a296ebff27d`,
  `main` HEAD after PR #845 merged and the user confirmed it verified
  working on iPad. Cut and verified immediately per the mandatory
  stable-state backup rule.
- `backup/2026-08-26-pre-covenant-fix` — SHA `b41625d9e0f04552532f7761d2998a296ebff27d`,
  same commit as above (main hadn't moved) — cut and verified
  separately per the user's explicit "backup first" instruction before
  the covenant-spam write.

Recovery: `git checkout backup/2026-08-26-pre-covenant-fix` (or
`backup/2026-08-26-acr-v114`, same commit) to go back to just before
today's covenant-spam fix; `git checkout backup/2026-08-26-acr-v113` to
go back further, to before the May-verse TTS fix.
