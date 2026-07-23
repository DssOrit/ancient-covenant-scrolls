# Session Notes — 2026-07-23

## Current state (updated after PR #737 opened)
- Branch: `claude/session-continuation-setup-2zkame` @ `b51ea84` (feasts pass; pushed, PR open)
- `origin/main` HEAD: `624f030` (PR #736 merge). **Live cache: `acr-search-v202`; branch/PR = `v203`.**
- **PR #737 OPEN (awaiting user merge, Rule 9):** now carries TWO passes, cache v202→v204:
  1. Feasts (`b51ea84`, v203): all 8 panels off Jubilees/11QT/1QM/4QMMT onto
     Vayikra 23 + Fourth-Gate Solar Matrix. Pesach 14th=Tue confirmed by user's
     calibration audit; Wednesday/creation anchor on 15th/Matzot. All weekdays verified.
  2. Debunk overlays (`3466018`, v204): swept all 32 for cards stating an excluded
     text's internal content as FACT. Fixed 6 — Vol 41 Hodayot (Teacher-of-
     Righteousness/Man-of-Lies reframed as sect construct + exposed later Christian
     retrojection of the NT invented Son figure, Rules 14/24); ACR2 #5 Nabonidus
     ("correction patch"→forgery); ACR2 #10 Pseudo-Jubilees ("secondary commentary"
     →forgery stacked on forgery, Mastema as invented demon-prince); ACR2 #1/#2
     4QInstruction + #8 Words of Michael (soft verdict nouns→"fabrication"). Other
     26 already debunk-framed, left as-is.
  3. Detailed evidence tabs (`4e39edb`, v205): new structured long-form debunk
     layout (.dbk-* CSS) — lead verdict, section headers, quoted manuscript
     receipts, historical-vs-overlay flow, baseline-vs-graft comparison, verdict
     box. openExcludedDebunk + openACR2Debunk render optional per-text detail
     (VB_EXCLUDED_DETAIL / ACR2_EXCLUDED_DETAIL), fall back to one-line summary.
     FIRST detailed tab: Vol 41 Hodayot (user-supplied two-layer forensic debunk,
     1QHa Col XV/XI receipts + Christian-graft exposure). Remaining 31 to follow
     in reviewed BATCHES (user approved: format=this, scope=Hodayot now then batches).
  Backup before these changes: `backup/2026-07-23-acr-search-v202b` @ `624f0306`.
  Detailed-tab format preview: scratchpad/hodayot_detail_preview.html (user approved).
  NEXT: batch-expand the other 31 excluded-text tabs to the detailed .dbk-* format,
  pulling evidence from EXCLUDED_TEXTS_DOSSIER.md + web-verifying, previewing each batch.
- **PR #738 MERGED** (`2ac8853`, v206): detailed tabs batch 1 — Vol 7 Jubilees,
  Vol 44 Genesis Apocryphon, Vol 46 Temple Scroll. Backup `backup/2026-07-23-acr-search-v206` @ `2ac8853`.
- **PR #739 OPEN** (v208, awaiting merge): detailed tabs batches 2 AND 3 —
  batch 2: Vol 8 Book of Giants, Vol 9 Visions of Amram, ACR2 #10 Pseudo-Jubilees;
  batch 3: Vol 33 War Scroll, Vol 40 Pesher Nahum, Vol 42 Pesher Habakkuk. Web-verified.
  Progress: 10 of 32 tabs detailed (41 + 7/44/46 live; 8/9/ACR2-10/33/40/42 in #739). 22 remain.
  Detail mechanism: VB_EXCLUDED_DETAIL (concordance) + ACR2_EXCLUDED_DETAIL (scrolls),
  render via .dbk-* CSS, fall back to one-line VB_EXCLUDED_WHY/ACR2_EXCLUDED_WHY.
  Thin-dossier texts to ask user about later: Songs of Sabbath Sacrifice (43),
  Rule of Blessings 1QSb (38), Rule of Congregation 1QSa (37), Book of Mysteries (47).
- LIVE now: all 32 overlays verdict-first debunk framing; Solar Calendar Independent
  Verification block (4Q208/4Q209 + MUL.APIN + 11Q5); `FORENSIC_PROTOCOL.md` +
  `EXCLUDED_TEXTS_DOSSIER.md` on main; CLAUDE.md wired to read both first.
- NOTE: PR #735 merged early (only dossier landed, v200); PR #736 carried the rest.
- Backups: `backup/2026-07-23-acr-search-v202` (current stable) + earlier v188..v201.
- **NEXT: feasts panel pass** — the 8 feast `source:` lines still cite excluded texts
  (Jubilees / 11QT / 4QMMT / 1QM). Drop those, re-anchor to Torah + Astronomical Book
  (1 En 72-82) + canon prophets. Awaiting user confirm of the excluded list first.
- Confirmed excluded set = 19 concordance vols (7,8,9,32-44,46,47,48) + 13 ACR2 scrolls
  + 3 removed Chanokh sections (Similitudes 37-71, Animal Apoc 85-90, Epistle/Weeks 91-105).

## >>> READ FIRST NEXT SESSION: `EXCLUDED_TEXTS_DOSSIER.md` (repo root)
ALL of the user's warning / exclusion / debunk texts (12 transcript sections:
the Warning Placards, Forensic Exclusion Registry, Master Evidence Checklist,
Deconstruction, and the exclusion registries) are compiled there. Pull the
per-volume debunk wording from that file — do NOT ask the user to re-paste.
- Name rule (Rule 18) already applied inside the file: quoted "Lord/God" for the
  covenant deity -> YHWH / Creator; the documented "Son of God" title (4Q246 /
  Augustus Divi Filius) is kept.
- Overlay framing is verdict-first debunk (see file header). Keep the user's
  evidence; frame as false/later-manipulation, never neutral description.
- The debunk overlays (32) were restored to this framing in PR #735 (cache v201).

## Built today (chronological, all Search-only, all merged to main + deployed)
- **PR #730 (merged, `5cbcb83`)** — made the 19 excluded texts + 13 ACR2 scrolls debunk-only:
  - Concordance: removed all 3,192 passages of the 19 excluded volumes (22,935 → 19,743); theme/root indexes cleaned.
  - Volume Browser: excluded cards open a forensic "why excluded" debunk overlay; `openVolume` routes excluded vols to the debunk view.
  - Similitudes + Book of Giants library cards reframed to debunking (from Warning Placard 03 + Gilgamesh evidence).
  - Divine-council belief point (line 4572) reworded — dropped the validated "Son of Man" figure.
  - Four excluded overlays strengthened with sourced, web-verified evidence (4Q246, Pesher Nahum, Pesher Habakkuk, Book of Mysteries).
  - 364-day calendar panel re-anchored to the retained Astronomical Book (1 Enoch 72–82; 74:12; 82:4–6) + Torah; Jubilees/4QMMT removed. Calendar remains true/standard.
- **PR #731 (merged, `d06bb32`)** — Volume Browser numbering + remaining overlays:
  - Added `VB_VOL_META`: gold grid relabeled to the Reader's continuous **Vol 1–28 + book name** (was concordance numbers climbing to 31 with gaps).
  - Filled the 9 remaining thin overlays with full forensic evidence (War Scroll, 4QMMT, 1QSa, 1QSb, Words of the Luminaries, Hodayot, Songs of the Sabbath, Genesis Apocryphon, Raz Nihyeh) — each claim web-verified first.
  - Words of the Luminaries + Hodayot rewritten to **pure debunk** (removed validating descriptions; dropped the unsupported 364-day-substitution claim; marked Hodayot's Teacher-of-Righteousness authorship as contested).
  - Chronological Order view relabeled through `VB_VOL_META`: canon shows Vol 1–28, excluded/orphan items show no raw number (fixes "Vol 39/41" appearing).

- **PR #732 (merged, `6f89fcd`)** — rewrote all 19 concordance excluded-text overlays in a debunk-first voice (verdict → two proof-of-forgery lines framed as exposure → "Held under warning"), after user feedback that the descriptive versions read as *confirming* the texts as authentic. Jubilees / Amram / Temple Scroll expanded to three proofs; War Scroll's Roman-gear proof spelled out (scutum, acies triplex, intervalla). Cache v196→v198.
- **PR #733 (merged, `ac6ba5f`)** — same debunk-first voice applied to the 13 ACR2 library-scroll overlays (4QInstruction x2, Aramaic Levi, New Jerusalem, Nabonidus, 4QBeatitudes, Apoc. Joshua, Words of Michael, Birth of Noah, Pseudo-Jubilees, Angels of Mastemah, Wicked and Holy, Book of War). Cache v198→v199. **All 32 excluded overlays now debunk-first.**

## Verification catches (verify-before-adding held)
- Words of the Luminaries (4Q504–506): dossier's "364-day calendar substitution" claim is NOT supported — it is a mid-2nd-c-BCE weekday prayer cycle. Used the verified version.
- Hodayot (1QH): "biographical diary of the Teacher of Righteousness" is contested (Harkins et al.) — marked as traditional reading, not fact.
- Book of Giants 4Q556 confirmed a valid Giants fragment (kept).

## Outstanding / to decide
- Chronological Order: excluded texts still *sit in* the timeline (now un-numbered). User asked only for the relabel; pending decision on whether to remove them from the reading order entirely.
- Feasts panel inline-citation reframe was drafted (drop Jubilees/Temple Scroll/4QMMT/War Scroll, re-anchor each feast to the Torah verses already listed + retained 1 Enoch 10 / Zekharyah 14 / Bamidbar 10 / Shemot 19:1) — **not yet applied**, awaiting go.
- Remaining inline validating citations of the excluded texts in the content panels (Shabbat, Beliefs, Orit Record) — next pass.

## Pending / parked (unchanged)
- Reader SW still prefetches deleted file_15 (needs "edit ACR reader").
- Volume Browser numbering (#5) — DONE this session.
- Study apps (`study/`, `GESTUDY/`) reconciliation.
- Optional full "God"-as-the-Name sweep.

## Backups
- `backup/2026-07-23-acr-search-v188` @ `8fa43c9` (pre-#730 main)
- `backup/2026-07-23-acr-search-v191` @ `5cbcb83` (post-#730 / pre-#731 main)
- `backup/2026-07-23-acr-search-v195` @ `d06bb32` (post-#731 main)
- `backup/2026-07-23-acr-search-v199` @ `ac6ba5f` (post-#733 main — current stable, all 32 overlays debunk-first)
- Recovery: `git checkout backup/2026-07-23-acr-search-v199`

## Capability notes (this session)
- GitHub MCP dropped/reconnected once mid-session; recovered via ToolSearch.
- Live Pages URL (dssorit.github.io) not fetchable from sandbox; verified via `git show origin/main:...` and user screenshots.
