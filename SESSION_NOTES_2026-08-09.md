# Session Notes — 2026-08-09

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
  writeup below.
- PR **#822**: "Fix fabricated text + add full comparative notes (Chanokh
  Ch.22/25/27/29-32)" — **merged by user**, confirmed live at cache
  `acr-v110`. Contained two parts: (1) the fabrication fix, (2) full
  comparative notes added for all 7 touched chapters, sourced from and
  verified against `For_checking_only_Chanokh_Part1_Ch1_36.docx` — same
  document that exposed the fabrication. Note count unchanged (144),
  verse count 229, chapters 1-36 intact.
- PR **#823**: "Chanokh Part 2: restore missing Astronomical Book content
  (Ch.37-49)" — **merged by user**, confirmed live at cache `acr-v111`,
  `main` HEAD `90a294e`. See Part 2 section below for full detail.
- Reader cache: `acr-v107` (session start) -> `acr-v108` (PR #821) ->
  `acr-v109` (fabrication fix) -> `acr-v110` (notes added, PR #822,
  merged/live) -> `acr-v111` (Part 2 restoration, PR #823, merged/live).

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

## Chanokh Part 1 — SHIPPED AND MERGED (PR #821 + #822)

All Part 1 findings below were resolved, built, previewed, shipped, and
merged. Kept for historical record only — nothing further pending here.

## Chanokh Part 2 (Chapters 37-49) — SHIPPED AND MERGED (PR #823)

### Source documents used
- `For_checking_only_Chanokh_Part2_Ch37_55.docx` — reliable, chapter-specific
  notes, KJV-archaic register matches site.
- `RECONSTRUCTION_FOR_...VERIFICATION` (Part 2) — boilerplate notes (red
  flag per Rule 29) but verse text independently spot-checked accurate
  (Ch.38, Ch.42 confirmed exact matches against own extraction).

### Scope confirmed with user
Excluded material: Book of Parables (traditional 1 Enoch 37-71, per
`data/file_115.json`), Animal Apocalypse (relocated to ACR2, confirmed via
`ACR2/data/file_15.json`), Epistle of Chanokh. None of the restored content
falls in these ranges.

### Fixes applied to `data/file_14.json`
- **Ch.37**: appended v13-23, the sun's gate-cycle return journey.
- **Ch.39**: fixed v3 arithmetic (was internally inconsistent — corrected
  to "one thousand and ninety-two...one thousand eight hundred and
  twenty...two thousand nine hundred and twelve"); removed v5, a verbatim
  duplicate of Ch.40 v1.
- **Ch.40**: appended v5-8 (eastern/western portals, chariots toward
  gates).
- **Ch.41**: appended v5-13 (twelve wind-gate catalog by direction);
  repositioned the pre-existing closing statement to v14 so it follows
  the catalog instead of interrupting it.
- **Ch.42**: appended v8 (the seven great islands).
- **Ch.43**: appended v8-9 (waning process, closing "law of her light"
  statement).
- **Ch.44**: appended v6-7 (5-day lunar/solar comparison, closing
  statement).
- **Ch.46**: corrected v5 — "three sacred messengers", not "seven holy
  ones" (resolved via user's own traditional-numbering research: ACR
  Ch.46 = traditional 1 Enoch 81, and 81:5 reads three, not seven);
  removed a duplicated v7/v8 pair; added the correct closing v7.
- **Ch.47**: appended v8-12 (sequential leader rotation, closing charge
  to Metushelakh).
- **Ch.49**: full 6-verse replacement — removed a misattributed 1EN71
  "Head of Days/Fanuel" scene that did not belong here, replaced with the
  correct "Prayer After the First Vision" (1EN84) content. Register
  adapted (thee/thou/thy -> you/your) to match site voice.

Ch.48's apparent v10 "great destruction" redundancy was investigated and
resolved as NOT a duplicate — user's traditional-numbering research
(ACR 48 = traditional 1 Enoch 83) confirmed both 48:7 and 48:9 are
legitimate distinct positions in the sequence; no change made there.

### Verification performed before shipping
- JSON parses cleanly.
- `<p>` tags 223/223 balanced, `<span>` tags 398/398 balanced.
- Chapter sequence 37-49 intact, no gaps.
- Note count unchanged at 52 (no notes added or removed).
- Verse counts per chapter match corrected structure: 37:23, 38:7, 39:4,
  40:8, 41:14, 42:8, 43:9, 44:7, 45:7, 46:7, 47:12, 48:11, 49:6.
- Local preview built with real `index.html`/CSS/`sw.js` against the
  patched data file, served locally, screenshotted via Playwright +
  Chromium in real site chrome for Ch.37, 39, 41, 46, 47, 49 — all
  confirmed rendering correctly (verse numbering, note colors, colophon,
  paleo YHWH glyph all intact).
- Branch `claude/chanokh-part2-fixes` cut fresh from `origin/main` at
  `441bcb7` (post PR #822 merge) — confirmed no stale-branch risk.

### Shipped
- Cache bumped `acr-v110` -> `acr-v111`.
- Committed and pushed to `claude/chanokh-part2-fixes`.
- **PR #823 merged by user.** Verified live: `main` HEAD `90a294e`, cache
  `acr-v111`, `data/file_14.json` JSON valid, tags balanced (223 `<p>`,
  398 `<span>`), chapters 37-49 intact, 52 notes unchanged, verse counts
  per chapter match exactly (37:23, 38:7, 39:4, 40:8, 41:14, 42:8, 43:9,
  44:7, 45:7, 46:7, 47:12, 48:11, 49:6), Ch.46 reads "three sacred
  messengers" (not "seven holy ones"), Ch.49 carries "The Prayer After
  the First Dream" content.

### Paleo YHWH glyph re-raised and re-closed (same day, post-ship)
User flagged the paleo glyph in the Ch.49 preview screenshot as
"incorrect" and referenced a `format.js` note. User then supplied the
actual `format.js` build-engine source (the Word-doc generator used to
build the reconstruction source docs). Its `paleo` constant —
`\u{10909}\u{10904}\u{10905}\u{10904}` — was compared directly against
`data/file_14.json` and matched byte-for-byte, all 3 occurrences,
confirming (again) the codepoints are correct and unaffected by this
build. User then confirmed the concern was with the appearance in the
*scratchpad preview screenshot* specifically (sandbox font substitution,
already documented above), not the live site. **No site file was
touched by this exchange.** One real, still-open, low-priority item
surfaced during this check: the site's CSS paleo font-family stack
carries an extra `"Noto Serif"` fallback not present in the user's
stated 4-item spec (`'Segoe UI Historic', 'Noto Sans Phoenician',
'Arial Unicode MS', serif`) — present identically in all 289 paleo-glyph
occurrences site-wide, not specific to this PR. Not yet approved or
scheduled for a fix; raised to the user, no decision made either way.

## Outstanding / blocking

None. All items closed for now — see Pending / parked below for the two
non-blocking items carried forward, and the record below for PRs #823/#824
(both merged and verified live).

- PR #823 (Chanokh Part 2 content) — merged and verified live:
  https://github.com/DssOrit/ancient-covenant-scrolls/pull/823
- PR #824 (session notes update) — merged and verified live:
  https://github.com/DssOrit/ancient-covenant-scrolls/pull/824

## Pending / parked

- Full retranslation of Ch.1-36 (the original ask) — superseded for now by
  the narrower missing/duplicate-verse scope. May resume after this pass.
- Chapters 2-21, 23-24, 26, 33-36 (Part 1) and any chapters beyond 49 in
  Part 2 not yet individually audited for the same missing/duplicate-verse
  pattern — only done for chapters the user specifically flagged or that
  surfaced during the note-citation check. Parked, not blocking. Resume
  only if the user asks for a full-chapter audit.
- Site-wide paleo-glyph CSS font-family stack carries an extra
  `"Noto Serif"` fallback not present in the user's stated `format.js`-
  adjacent 4-item spec (present identically in all 289 occurrences,
  harmless in practice since the font has no Phoenician glyphs to serve).
  **User decision 2026-08-09: "Just leave it."** Closed, no fix scheduled.
  Do not re-raise unless the user asks.

## Capability gaps in this session

- None new. Standing sandbox gaps unchanged.

## Backups

- `backup/2026-08-09-acr-v107` — SHA `3dbc3da425910a3e0773c43416260b4a41d0828d`,
  pre-PR#821 state (before the original 6-edit Chanokh fix).
- `backup/2026-08-09-acr-v108` — SHA `05f108ddaccdfac53742bc014bdf4392826c34f9`,
  post-PR#821 state (includes the fabricated text later corrected in
  PR #822) — verified matching `origin/main` before PR #822's edits.
- `backup/2026-08-09-acr-v110` — SHA `441bcb71a1584ed5ea052cb0773ba23eb61040a6`,
  post-PR#822 merge state (Part 1 complete and correct) — pre-Part-2
  snapshot; `claude/chanokh-part2-fixes` was branched from this exact
  commit.
- `backup/2026-08-09-acr-v111` — SHA `90a294ed98d6801fff06af36a83282c004a134a3`,
  post-PR#823 merge state, current `main` HEAD — Part 1 and Part 2 both
  complete, correct, and user-verified. Latest stable point.

Recovery: `git checkout backup/2026-08-09-acr-v111` for the current
stable state (Part 1 + Part 2 both shipped); `git checkout
backup/2026-08-09-acr-v110` for the pre-Part-2 snapshot; `git checkout
backup/2026-08-09-acr-v108` for the pre-correction snapshot; `git
checkout backup/2026-08-09-acr-v107` to go all the way back to before
any Chanokh work today.
