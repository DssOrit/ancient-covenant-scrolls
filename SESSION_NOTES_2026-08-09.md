# Session Notes — 2026-08-09

## In progress — Chanokh Part 2 (Astronomical Book, Ch.37-49) audit

Two docs delivered for Part 2, same reliability split as Part 1:
- `ACR_Chanokh_Part2_ACR3747_Astronomical_Book_RECONSTRUCTION_FOR_VERIFICATION.docx`
  — chapter numbering (37-47) confirmed to align 1:1 with the site's own
  numbering (verified via Ch.38 and Ch.42 content matching exactly).
  Notes are boilerplate/templated (Rule 29 red flag) but verse TEXT
  independently verified accurate against my own extraction of the file,
  spot-checked twice, both exact matches.
- `For_checking_only_Chanokh_Part2_Ch37_55.docx` — user's old pre-exclusion
  Part 2 draft. Chapter-specific notes (reliable per Rule 29). Uses a
  DIFFERENT internal chapter numbering than the site/reconstruction-doc —
  do not cross-map numbers between this doc and the site directly.

### Scope boundary confirmed via ACR2 cross-check

- Chapters 50-55 (Animal Apocalypse, standard 1EN 85-90): confirmed
  deliberately relocated to ACR2 Vol 13 ("RELOCATED FROM THE MAIN
  RECORD... Held Under Warning"). Not missing, not in scope.
- "Dwelling of Wisdom" (standard 1EN 42) and the "Head of Days/Fanuel"
  scene (standard 1EN 71): both fall inside the range documented by the
  site's own `file_115.json` ("The Book of Parables — Why It Is Excluded
  — Chapters 37 through 71 in the Traditional Numbering"). Confirmed via
  ACR2 search: this content has NOT been relocated anywhere (unlike the
  Animal Apocalypse) — it's a leftover error with no home in the ACR
  ecosystem, not an intentional relocation. **User confirmed: excluded
  material (Parables, Animal Apocalypse, Epistle) is never added, no
  matter which document it turns up in.**
- ACR's own chapter numbers do NOT match standard 1 Enoch chapter
  numbers 1:1 (e.g. ACR chapter 42 = standard 1 Enoch 77, not standard
  42). Established via the reconstruction doc's own "Original 1 Enoch NN"
  headers on each ACR chapter.

### Confirmed fix — Ch.49 (settled, not yet built/shipped)

Site's Ch.49 currently holds the wrong content (standard 1EN 71, Parables
— "Head of Days," Mikha'el/Gavri'el/Rafa'el/Fanuel, "fear not... scribe
of righteousness"). Title and notes already correctly describe "Chapter
84" (the real content — Prayer After the First Vision) — only the verse
text is wrong. Three-way verified (doc / site / ACR2). Fix: replace all
6 verses with the checking-doc's real Ch.46 ("Prayer After the First
Vision") text, register-adapted thee/thou/thy -> you/your. Title and
notes untouched (already correct). Before/after text already shown and
not objected to — awaiting grouped-fix approval below before building.

### Full Ch.37-48 verse-level findings (site vs. reconstruction doc)

| Ch | Finding | Type |
|---|---|---|
| 37 | Site cuts off mid-cycle (12v), missing the return journey through the gates + closing line that the doc's 37v version has | One-directional gap |
| 38 | Matches, different wording only | No action |
| 39 | v3 day-count math is broken (1,062/977/7,136 — internally impossible, 5yr < 3yr); doc gives 1,092/1,820/2,912 | Bug fix (not addition) |
| 39 | v5 is a verbatim duplicate of Ch.40 v1 (intercalary-leaders sentence), doesn't belong in the moon chapter | Bug fix (dedupe) |
| 40 | Doc's proposed v5 duplicates existing site v3 — do NOT add | Redundancy caught, no action |
| 40 | Doc's v6-v9 (gate-by-gate specifics, "one circuit greater than others") look genuinely absent from site's 4 verses | One-directional gap (partial) |
| 41 | Site (5v) is missing the entire gate-by-gate wind catalog (9v) that's the core of the chapter | One-directional gap (large) |
| 41 | Site's v5 ("shown thee all the laws...") reads as a premature closing statement — may belong at Ch.44's end instead | Possible misplacement, flagged not resolved |
| 42 | Doc has "seven great islands" (v8) absent from site | One-directional gap |
| 42 | Site has "Yarden/Jordan -> Dead Sea" specific detail absent from doc | Two-way — site content must be preserved |
| 43 | Site (7v) is missing the day-by-day waning sequence entirely; doc (17v) has full waxing+waning detail | One-directional gap (large) |
| 44 | Site has specific portal-based waning detail (6th/1st portal, exact day counts) absent from doc | Two-way — site content must be preserved |
| 44 | Doc has "5 days shorter" lunar/solar half-year comparison + closing line absent from site | One-directional gap (partial) |
| 45 | Site has two unique passages absent from doc: sun's evening-chariot journey (v5), and the stars-mistaken-for-deities idolatry warning (v7) | Two-way — site content must be preserved |
| 46 | **v5≈v7 and v6≈v8 are near-duplicate pairs within the site's own text** — internal bug, independent of the doc | Bug fix (dedupe) |
| 46 | Site says "seven holy ones," doc says "three sacred messengers" — factual mismatch, not resolved which is correct | Discrepancy flagged, not resolved |
| 46 | Doc's closing line (upright encourage one another, wrongdoers meet their outcome) absent from site | One-directional gap |
| 47 | Site (7v) missing the doc's (20v) sequential leader-rotation detail and closing charge to Metushelakh | One-directional gap (large) |
| 47 | Site has specific leader names (Melkiel, Tame'el, Hesfael, Keel, Peeel, Kerael) absent from doc entirely | Two-way — site content must be preserved |
| 48 | Site (11v) has an extra v10 ("from heaven... great destruction") not in doc's (10v) version — restates v8, possible redundancy | Flagged, not confirmed as error |
| 49 | Wrong content entirely (see confirmed fix above) | Whole-chapter replacement, settled |

**Full sweep of Ch.37-49 complete at this level of scrutiny — every chapter
checked, not just the ones with obvious problems.**

### Outstanding — grouped by type, awaiting user approval before building

1. **Clear one-directional additions** (safe to pull from doc, nothing
   to lose): 37 (return journey), 40 (partial), 41 (gate catalog), 43
   (waning sequence), 46 (closing line), 47 (leader-rotation detail).
2. **Two-way merges** — both site and doc have unique content, neither
   side gets overwritten: 42, 44, 45, 47 (names).
3. **Bug fixes independent of either doc**: 39 (math + duplicate), 46
   (internal duplicate pair v5/v7, v6/v8).
4. **Discrepancies flagged, unresolved, need user call**: 46 ("seven
   holy ones" vs "three sacred messengers"), 41's v5 possible
   misplacement, 48's possible v10 redundancy.
5. **Ch.49**: settled, whole-chapter content replacement (see above).

Nothing written yet. Backup will be cut fresh immediately before any
write, per Rule 26 — the last Part 2 backup point is whatever `main`
currently is (unchanged since PR #822 merged).

## IMPORTANT — LOCKED 2026-08-09: never add fabricated text to this site

User directive, verbatim: **"Never add fabricated text ever to this
site."** Binding standing rule from this point forward, same weight as
the CLAUDE.md locked rules. Applies to every future edit, every volume,
every site. Do not port content from any source document without
verifying it against the site's own established wording (or another
independently reliable source) first — a document merely being
delivered by the user is not proof its content is accurate; documents
can themselves contain invented content (see incident below).

## Current state

- PR **#821** (merged by user) shipped 6 edits to Chanokh Part 1 —
  3 of them turned out to be **fabricated text**, sourced from an
  unreliable draft docx. **Corrected same day in PR #822**, see incident
  writeup below. `main` HEAD after both: cache `acr-v109`.
- PR **#822** (merged by user, 2026-08-09 17:00 UTC): "Fix fabricated
  text + add full comparative notes (Chanokh Ch.22/25/27/29-32)" —
  contained both the fabrication fix and the full comparative notes for
  all 7 touched chapters, sourced from and verified against
  `For_checking_only_Chanokh_Part1_Ch1_36.docx`. **Merge verified
  directly against live `main`** (HEAD `441bcb7`): fabricated Ch.22/25/27
  text confirmed gone, real Ch.22:13 content confirmed present, all new
  note citations confirmed present (Bamidbar 17, Shemot 30:23/30:34,
  Yirmeyahu 7:31-32, patrilineal, 622 years), structure intact (144
  notes, 229 verses, chapters 1-36 sequence unbroken).
- Reader cache: `acr-v107` (session start) -> `acr-v108` (PR #821) ->
  `acr-v109` (fabrication fix) -> `acr-v110` (notes added) — **all live**.
- **Both PRs for today's Chanokh work are now merged and verified live.**
  Incident closed; Rule 29 stays locked permanently going forward.

## INCIDENT — fabricated text shipped to live site, same-day catch and fix

**What happened:** The docx originally used as the source for the
22:13/25:7/27:1 "missing verse" fixes
(`ACR_Chanokh_Part1_Ch136_RECONSTRUCTION_FOR_INDEPENDENT_VERIFICATION.docx`)
contained invented content for those three spots that does not match
the site's actual established text. This was shipped in PR #821 and
merged before the error was caught.

**How it was caught:** User provided a second, more reliable document
(`For_checking_only_Chanokh_Part1_Ch1_36.docx`) to compare notes for
Ch.29-32. Reading it closely (proper XML parse via `xml.etree`, not the
looser regex-based extraction used earlier — that regex approach had
already shown signs of unreliability and should be avoided in favor of
proper XML parsing for any future docx work) showed its wording matches
the site's own KJV-style register almost verbatim across every chapter
checked (22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32). Verse-by-verse
comparison against this source proved:
- Ch.22's real missing content is NOT a closing blessing — it's a
  distinct 4th category of the dead ("men who were not righteous but
  sinners... complete in transgression... not raised from thence").
- Ch.25 was never missing anything — the fabricated blessing invented
  content that doesn't exist in the accurate source.
- Ch.27 was never missing an opening question — the site's original
  wording was already correct; the fabricated question invented content.
- Ch.29/30/31 (the verse-swap fixes) were independently confirmed
  correct against this same reliable source — no issue there.

**Fix (PR #822):** Removed the three fabricated sentences. Added the
real Ch.22 v13 continuation (verified word-for-word against the
checking-only source) in place of the fabricated blessing. Ch.25 and
Ch.27 reverted to their original site wording with nothing added.

**Lesson, locked above:** verify any source document against the site's
own established wording before trusting it — never assume a delivered
docx is accurate just because it was delivered as a "reconstruction" or
"verification" file.

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
  pre-PR#821 state (before the original 6-edit Chanokh fix).
- `backup/2026-08-09-acr-v108` — SHA `05f108ddaccdfac53742bc014bdf4392826c34f9`,
  post-PR#821 state (includes the fabricated text later corrected in
  PR #822) — verified matching `origin/main` before PR #822's edits.

Recovery: `git checkout backup/2026-08-09-acr-v108` for the most recent
pre-correction snapshot; `git checkout backup/2026-08-09-acr-v107` to go
all the way back to before any Chanokh work today.
