# Session Notes — 2026-08-09

## Current state

- Branch: `main`, HEAD `3dbc3da4` — nothing shipped yet this session
- Working branch for this task: `claude/acr-reader-text-additions-mo2b4k`
- Reader cache: `acr-v107` (unchanged so far)
- Working tree: clean
- **No site file has been touched yet.** Everything below is find-first
  reporting per Rule 11 — waiting on the unlock phrase ("edit ACR reader"
  / "fix the reader") before any write to `data/file_13.json`.

## IMPORTANT — paleo YHWH glyph is correct, do not "fix" it again

Verified 2026-08-09: `data/file_13.json`'s title-block glyph still carries
the exact codepoints corrected last week in PR #797/#799 —
`0x10909 0x10904 0x10905 0x10904` (Yod-He-Waw-He). Confirmed directly
against the live file, untouched by anything in this session.

Any local/sandbox preview of this glyph (headless Chromium, no access to
the proprietary "Segoe UI Historic" font the site's CSS asks for first)
will render it using a substitute font (Noto Sans Phoenician, once
installed via `apt-get install fonts-noto-extra`) and may look
stroke-different from the real iPad rendering. **This is a font-
substitution artifact of the preview environment, not a data or site
defect.** Confirmed with user 2026-08-09 by comparing rendered variants —
do not mistake this for a regression of the PR #797/#799 fix in any
future session.

## In progress — Chanokh Part 1 (Chapters 1-36) verse audit

User delivered `ACR_Chanokh_Part1_Ch136_RECONSTRUCTION_FOR_INDEPENDENT_VERIFICATION.docx`
(Book of the Watchers, Ch.1-36), mapped on the live reader to
`data/file_13.json` (NAVIDS `file_13`, "Vol 6 — Chanokh (1 Enoch) — Part 1
— Chapters 1-36 — Book of Watchers").

### Scope decided by the user this session (supersedes earlier framing)

- Original ask was a full retranslation swap from the docx. **User narrowed
  this**: ignore translation/wording differences for now. Focus only on
  **missing verses** and **duplicate verses/chapters**.
- **No verse renumbering, ever, for this pass.** Any content found missing
  gets attached/merged into the nearest existing verse (previous verse for
  a trailing closing line, next verse for a leading opening line) — never
  becomes a new standalone verse number. This avoids any renumbering
  cascade to later verses, other chapters, Search, or Study.
- Where docx wording is adopted for newly-attached content, it is adapted
  to the site's existing archaic register and terminology (e.g. "YHWH of
  Glory" not the docx's "YHWH of Splendor") rather than pasted verbatim —
  confirmed by user.

### Findings — verified directly against the docx and the live site

| Chapter | Site currently has | Docx has | Verdict | Planned fix |
|---|---|---|---|---|
| 22 | v1-13, ends mid-judgment | v1-13 + a 14th closing-blessing verse, docx note: "restored as verse 14" | Genuinely missing on site | Attach blessing sentence to end of existing v13 (no renumber) |
| 25 | v1-7 (count matches docx by coincidence — site splits v1 into two where docx keeps it as one, which masked a real gap) | v1-7, v7 = "I then pronounced blessing over the Creator of Splendor..." | Genuinely missing on site — verse-by-verse mapping confirmed no site verse carries this content | Attach blessing sentence to end of existing v7 (no renumber) |
| 27 | v1-5, opens directly with Uriel's answer | v1 = Chanokh's opening question ("Why does this land of goodness...lie beside an accursed valley?"), then v2-5 the answer/blessing | Opening question genuinely missing on site | Attach question to the *start* of existing v1, before "Then Uriel answered me..." (no renumber) |
| 27 (closing, v5 equiv.) | v5 = "Then I blessed YHWH of Glory..." | v5 = "Then I pronounced blessing over YHWH of Splendor..." | Already present on site, content matches | No action |
| 22:9 note citation | CRITICAL NOTE cites "Verse 22:9" for the Hevel/Qa'in content, but that content is actually v8 on the site | — | Pre-existing citation bug, unrelated to the docx | **User decision: leave as-is** — content is present in the chapter, just under a different number; not to be touched |
| 29-32 | Superseded finding, see below | Superseded finding, see below | **Root cause found: not a simple 31/32 doublet.** Chapter 29's real content (frankincense & myrrh) is missing from the site entirely. Site's current Ch.29 actually holds what should be Ch.30's content (valley of water/cinnamon); site's current Ch.30 holds what should be Ch.31's content (sarara/galbanum/aloe); site's current Ch.31 is a duplicate of Ch.32, backfilled because nothing else was left to put there. Ch.32 and Ch.33-36 are unaffected — confirmed no further drift past Ch.32. | **User decision: treat as a bug to resolve.** Fix = reslot content, not renumber chapters: Ch.30's slot gets the site's own existing Ch.29 text moved down (reused verbatim); Ch.31's slot gets the site's own existing Ch.30 text moved down (reused verbatim); Ch.29's slot needs genuinely new content adapted from the docx (never existed on site before); Ch.32 untouched. Each moved chapter's 4 notes move with its text. Ch.32's CRITICAL NOTE ("repetition... reflects manuscript tradition") becomes false once fixed and must be corrected — this is a factual-error fix, not a new documenting note, so it is NOT covered by the "no new notes for now" hold. Nothing outside Ch.29-31 is renumbered or touched. |

### Worked example approved so far

Chapter 1 preview (verse text only, docx source, site's exact numbering/
notes/style tokens) was rendered and shown — no objection raised on the
format itself; conversation moved to the missing/duplicate-verse audit
before Chapter 1 was formally signed off.

Before/after text for the three attach-fixes (22:13, 25:7, 27:1) was
presented in adapted register — **awaiting explicit approval of the exact
wording**.

**User decision (2026-08-09): no new CRITICAL NOTE clauses for now.**
Do not add documenting text to the four comparative notes for this pass.
Revisit after the fix is successfully shipped to the live site — user
asked to be reminded then, not before.

### FINAL approach for Ch.29-31 (user corrected course 2026-08-09 — simpler than the draft above)

User flagged the reslotting/move-content-between-chapters idea above as
scope drift and too complicated to follow. **Replaced with the simple
version**, same pattern as the 22/25/27 fixes:

- Site Ch.29 verses -> replaced with docx's own Chapter 29 verses (frankincense/myrrh), adapted to site register.
- Site Ch.30 verses -> replaced with docx's own Chapter 30 verses (valley of water/cinnamon), adapted to site register.
- Site Ch.31 verses -> replaced with docx's own Chapter 31 verses (sarara/galbanum/aloe), adapted to site register. Fixes the Ch.32 duplicate.
- Site Ch.32 -> untouched, verses and notes both.
- Same chapter number keeps the same chapter number. Nothing moves between chapters, nothing renumbered.

Built the real-site-chrome preview with only verse text swapped, notes
left untouched. **Result: the notes for 29/30/31 now visibly describe the
wrong content** (e.g. Ch.31's CRITICAL NOTE still talks about the Garden
of Righteousness/tree of wisdom, which is no longer that chapter's
content). Screenshot shown to user as proof.

Offered to pull matching notes from the docx for 29/30/31 instead.
**User declined — "Just don't add that part of the notes to those."**
Final decision: **verse text only changes for Ch.29/30/31. The four
comparative notes for Ch.29, 30, and 31 stay exactly as they currently
are on the site, mismatch accepted for now, not fixed in this pass.**
Same treatment as the "no new note clauses" decision for 22/25/27 —
consistent policy: this pass only touches verse text, never notes.

**This is the final, approved shape of the Ch.29-32 fix.** Ready to build
final preview / ship once the unlock phrase is given.

## Outstanding / blocking

1. Approve or amend the exact before/after wording for 22:13, 25:7, 27:1.
2. ~~Decide: add a short note clause documenting each attachment~~ —
   resolved: no new note clauses for now. **REMINDER: raise this again
   once the 22:13/25:7/27:1 fix is successfully shipped and confirmed
   live.**
3. Approve or amend the draft new Chapter 29 content above. Once approved,
   build the full Ch.29-32 before/after preview (real site chrome, per the
   established process) before writing anything.
4. Unlock phrase not yet given — nothing can be written to `data/file_13.json`
   until the user says "edit ACR reader" or "fix the reader".
5. Chapters 2-21, 23-24, 26, 33-36 not yet individually audited for the
   same missing/duplicate-verse pattern — this was only done for the
   chapters the user specifically flagged, plus the 29-32 block found
   while checking notes for citation impact. Full-chapter audit still
   pending if the user wants every chapter checked before shipping.

## Pending / parked

- Full retranslation of Ch.1-36 (the original ask) — superseded for now by
  the narrower missing/duplicate-verse scope. May resume after this pass.

## Capability gaps in this session

- None new. Standing sandbox gaps unchanged.

## Backups

- `backup/2026-08-09-acr-v107` — SHA `3dbc3da425910a3e0773c43416260b4a41d0828d`,
  verified matching pre-change `origin/main`. Cut before any Chanokh audit
  work touches the site (none has yet).

Recovery: `git checkout backup/2026-08-09-acr-v107`.
