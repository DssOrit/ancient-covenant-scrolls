# Session Notes — 2026-07-23

## Current state
- Branch: `claude/session-continuation-setup-2zkame` (reset onto `origin/main` after each merge)
- `origin/main` HEAD: `d06bb32` (PR #731 merge)
- Live cache marker: `acr-search-v195` (confirmed on `origin/main`)
- Working tree: clean

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
