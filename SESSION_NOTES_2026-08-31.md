# Session Notes — 2026-08-31

## Current state

- `main` HEAD: `562996f` (PR #864 merged) before this round's ACR2 work;
  an ACR2 restoration PR is open on top of it (see below) and not yet
  merged.
- ACR Reader cache: `acr-v118` (Vol 7 Jubilees + Vol 31 Book of Giants
  restored, War Scroll at Vol 30).
- ACR Search cache: `acr-search-v299` (Jubilees + War Scroll + Book of
  Giants concordance/Volume Browser restored).
- ACR Study cache: `acr-study-v118` (PR #863, merged — War Scroll/Book
  of Giants quiz cross-wire fixed).
- ACR Solar cache: `acr-solar-v40` (PR #862, merged — weekday-anchor fix).
- ACR2 cache: `acr2-v26` on the open restoration branch (was `acr2-v25`
  on `main`) — 12 texts (16 content files) added, Vol 14–25, not yet
  merged.
- `EXCLUDED_TEXTS_DOSSIER.md` entry 2 (Book of Jubilees) and entry 9
  (Book of Giants) marked RESTORED, 2026-08-31, no longer excluded from
  the Reader. Collective status line updated to "9 of 11 entries remain
  excluded." Not touched by the ACR2 work below — those texts remain
  correctly excluded from the Reader's main canon; what changed is
  their availability in ACR2, a separate, lower-standard archive site.

## Built today

The whole session was one thread: reversing the July 2026 removal of
the **Book of Jubilees** across every site that had it, after the
user asked whether that removal was actually correct.

1. **Reinvestigation (read-only).** User asked me to reconsider the
   Jubilees exclusion, contrasting it with Enoch's earlier *surgical*
   removal (only specific late chapters cut, not the whole book).
   Did a deep, multi-pass content scan of both ACR Reader Jubilees
   files (`data/file_16.json`, `data/file_17.json` — never deleted,
   only unlinked from nav in July): zero Trinity/Yeshua/Christian
   content, zero false-deity worship (Mastema always a subordinate
   accuser under YHWH, never worshipped), zero lunar-calendar content
   (book is explicitly anti-lunar/pro-solar — Jubilees 6:32-38 has its
   own `[DSS]`/`[CRITICAL NOTE]` transparently sourcing the
   anti-lunar polemic to 4QJub fragments, not hiding it), correct
   title-block format, correct paleo-YHWH usage. Confirmed via
   WebSearch: Jubilees carries First Temple covenant tradition
   (Rule 25's "tradition not carbon date" test) and has equal Ge'ez/
   DSS standing under Rule 23. User's specific worry — Ethiopian
   Orthodox influence pushing a "false Christian-similar deity" —
   traced to zero actual textual evidence in the two content files.
   Verdict: the wholesale July removal was inconsistent with the
   site's own Enoch precedent and not supported by a rule violation.

2. **ACR Reader restoration — PR #850, merged.** Backup branch
   `backup/2026-08-31-acr-v115` cut and verified (SHA `bab882e`,
   matched `origin/main`) before any write. Restored Jubilees as
   **Vol 7** (immediately after Chanokh), renumbering every subsequent
   volume +1 through the new Vol 29 (Divrei HaYamim Bet) —
   `NAVIDS`/`LABELS`/`TOC` in `index.html`, plus `data/nav.json` (fixed
   a pre-existing drift between `nav.json` and `index.html` labels
   while there, per Rule 20's "index.html is the driver" instruction).
   Renumbering done programmatically (Python, not hand-edited) to
   avoid the exact bug class that caused the earlier Temple Scroll
   Vol 45/46 incident. Cache `acr-v115` -> `acr-v116`. Verified via
   headless Playwright calling the real `loadSection()`/`buildSB()`
   functions, not just static review. `EXCLUDED_TEXTS_DOSSIER.md`
   updated to document the reversal and its reasoning.

3. **ACR2 investigation (read-only, no change).** User asked to remove
   Jubilees from ACR2 too. Found ACR2 does NOT contain the actual Book
   of Jubilees — only **Pseudo-Jubilees (4Q225-227)**, a genuinely
   distinct DSS composition (Aqedah retelling + Chanokh
   book-transmission tradition, not Jubilees' calendar/legal content).
   Confirmed via `NAVIDS`/`TOC` index math and reading the actual
   content file. Scanned it too — no rule violations found in its own
   right. Reported the distinction; user agreed no change was needed
   in ACR2 itself, and to move on to ACR Search.

4. **ACR Search Stage 3 restore — PR #851, merged.** User specifically
   recalled that older ACR Search content had to be *reworded away*
   from Jubilees when the exclusion was added (not just a debunk-tab
   addition). Git-archaeology'd the actual pre-removal text (commits
   `74b5d62`, `8046f38`, `9812d89`, `06517da`, `928a875` — the real
   scope turned out to be ~35 commits across the July 22-24 sweep, not
   the 3 first found) and restored it **verbatim, no rewriting** across
   three named sections: Curse of Ham (8 items), calendar authority
   (2 items), Mastema/spirit-world (demons/satan QA entries, Isaac
   dictionary entry, Origin of Cruelty section, Spirits That Remain,
   Naming the Adversary — ~13 items total). Backup
   `backup/2026-08-31-acr-search-v296` cut and verified first. Verified
   by loading the page headlessly and calling the actual render
   functions (`renderRacismPanel`, `renderOritPanel`,
   `renderFinalDaysPanel`, `renderWatchersPanel`) directly — all render
   clean, restored text confirmed present in real output. Cache
   `acr-search-v296` -> `v297`.

5. **Contradiction check — PR #852, merged.** User asked me to confirm
   no contradictions remained on ACR Search regarding Jubilees before
   merging #851. Found six: Search's own **Volume Browser** still had
   Jubilees in its excluded-volumes list with a full "forgery"
   writeup (`VB_EXCLUDED_VOLS`/`NAMES`/`WHY`/`DETAIL`), plus a
   dictionary entry, a Qumran Cave 2 fragment entry, and a
   suppression-evidence-panel sentence, all still calling it a
   fabrication. Fixed all six: removed Jubilees from the excluded list,
   added it back into the main Volume Browser grid at its correct
   position (Vol 7), renumbering later volumes +1 (mirroring #850's
   Reader renumbering) so the grid stays continuous 1-29 with no
   duplicate/missing numbers — verified by simulating real volume data
   and calling `renderVolumeGrid()` directly. Restored the Cave 2 and
   suppression-panel text verbatim from git history; rewrote the
   dictionary entry's verdict using the neutral description already
   live elsewhere in the file (not composed from scratch). Cache
   `v297` -> stayed `v297` at push time, actual merged cache is `v297`.

6. **Second contradiction, caught by user — PR #853, merged.** User
   pushed back that leaving the Pseudo-Jubilees/Angels of Mastemah
   debunk entries' "the already-fabricated Book of Jubilees" language
   in place (framed by me as "a separate judgment call") was itself
   still an unresolved direct contradiction — correctly so, since that
   specific sentence is factually false regardless of whether
   Pseudo-Jubilees or Angels of Mastemah themselves stay excluded.
   Fixed narrowly: removed the false Jubilees-is-a-forgery premise from
   all four entries (`ACR2_EXCLUDED_WHY`/`DETAIL`, keys 10 and 11),
   left every other part of those two texts' own separate exclusion
   reasoning untouched. Verified via regex check against the actual
   rendered strings — zero matches for `already-fabricated|
   already-late|Jubilees forgery` in any of the four. Cache
   `v297` -> `v298`.

7. **User merged #851 and #853; verified live on `main`.** Confirmed
   directly against `origin/main` (not PR metadata): cache
   `acr-search-v298`, 4 Jubilees calendar/Curse-of-Ham citations
   present, zero forgery-language matches remaining, `node --check`
   passes on the actual merged file.

## Outstanding / blocking

- None from the Jubilees thread. All four PRs (#850, #851, #852, #853)
  are merged and verified live on `main`.
- **Note:** this file's "Built today" section above only covers the
  Jubilees-restoration thread. Later in the same session, substantial
  ACR Solar holy-day work also shipped and merged (PRs #854 New Wine
  date fix, #855 Volume-of-Day reliability fix + Holy Days tab +
  DSS/Orit observance content, #856 modern preparation checklists,
  #858 prayer/liturgy sourcing — cache now `acr-solar-v39` on `main`)
  plus unrelated Reader/Search restorations (#857 War Scroll, #859
  Book of Giants, #860 Search War Scroll/Giants restore) — none of
  that was logged here in real time per Rule 12; flagging the gap
  honestly rather than reconstructing full details from memory.

## ACR Solar — weekday-anchor bug: found, reported, fixed

- **User's report (verbatim claim):** the DSS calendrical texts fix
  Yom Kippur (7/10) on the 6th day (Friday) — "Yom HaKippurim falls on
  the sixth day" is written in the calendar texts — and the priestly
  rotation only works if dates never move through the week. User was
  explicit that Gregorian alignment (which real date is "1 Aviv" this
  year) is genuine unattested guesswork and NOT part of this claim.
- **Investigated (read-only) and confirmed the bug**, reported to user
  in full before any write, per Rule 11: `Solar/index.html`
  `gregorianToSolar()` hardcoded `weekDay = (dayOfSolarYear % 7) + 1`,
  assigning 1 Aviv (dayOfYear 0) = Sunday with no citation. WebSearch
  confirmed the actual scholarly reconstruction (4Q320/4Q321 Mishmarot
  texts): the year begins on the *4th day* (Wednesday), tied to the
  creation of sun/moon/stars on day 4 (Gen 1:14-19). Recomputed Yom
  Kippur (dayOfYear 191) under both anchors using the app's own
  `SOLAR_MONTHS` day-count table: old Sunday anchor -> Tuesday;
  correct Wednesday anchor -> Friday, matching the user's claim.
  Cross-checked Shavuot (dayOfYear 74) -> Sunday under the Wednesday
  anchor, matching well-documented "Shavuot always falls on Sunday in
  the Qumran calendar" scholarship.
- **User approved with the exact unlock phrase ("edit ACR Solar").**
  Backup branch `backup/2026-08-31-acr-solar-v39` cut at `main` HEAD
  `5b6af55` and verified (SHA match confirmed) before any write.
- **Fix applied** on branch `claude/acr-solar-weekday-anchor`: changed
  the anchor offset from Sunday to Wednesday (`weekDay = ((dayOfSolarYear
  + 3) % 7) + 1`), and derived `isShabbat` from the corrected `weekDay`
  instead of a separate duplicate modulo calculation (removes a second
  place the two could drift out of sync). Comment added citing
  4Q320/4Q321 and the Gen 1:14-19 creation-of-luminaries basis.
- **Verified no break:** `node --check` clean on all 11 inline script
  blocks; HTML tag-balance check shows one pre-existing false-positive
  pattern (confirmed identical on unmodified `origin/main` baseline via
  direct diff, so not introduced by this change). Real headless-browser
  (Playwright, iPad viewport) pass confirmed: Yom Kippur 2026 (Sep 27)
  -> Friday, Shavuot 2026 (Jun 2) -> Sunday, 1 Aviv 2026 (Mar 20) ->
  Wednesday; app still renders (bottom nav, Holy Days tab, month title,
  solar month sub all present); zero page errors (one blocked external
  font/icon CDN console warning, expected in this sandboxed
  environment, unrelated to the change).
- **Known residual limitation, disclosed to user, not fixed here:**
  because `getSolarYearStart()` still re-anchors to Gregorian March 20
  fresh every year (the "guesswork" the user themselves flagged as
  out of scope), the `isShabbat` grid-highlight's alignment with the
  *real* Gregorian Saturday can still vary by year depending on what
  real weekday March 20 falls on that year. This fix corrects the
  month/day -> weekday-*label* mapping (the documented, never-drifting
  part) exactly as asked; it does not and was not asked to solve the
  separate Gregorian-alignment question.
- Scope: single shared constant, but the effect is app-wide — every
  date's weekday label and the Shabbat grid highlight all shift by the
  same fixed 3 days. `Solar/sw.js` cache bumped `acr-solar-v39` ->
  `v40`.
- **User confirmed with "merged"; verified directly against `origin/main`**
  (PR #862, `merged: true`, merged by DssOrit at 22:33:01 UTC 2026-08-31):
  `Solar/sw.js` shows `acr-solar-v40`, `Solar/index.html` shows the
  corrected `weekDay = ((dayOfSolarYear + 3) % 7) + 1` formula, both
  read straight from `origin/main`, not from PR metadata.
- **Follow-up check, also verified against the live running formula
  (not just reasoned about):** user asked "does Yom Kippur always land
  on Friday" — ran `solarToGregorian`/`gregorianToSolar` in a real
  headless browser across 16 years (2020-2035). Every single year
  computes Yom Kippur (7/10) as Friday, with zero exceptions, even
  though the real Gregorian date it lands on varies year to year. This
  is the structural "never drifts" property (364 = 52 x 7), confirmed
  computationally rather than asserted from the math alone.
- **User then asked how the ~1.25-day/year drift (364-day calendar vs.
  the true ~365.24-day solar year) was handled in the ancient texts.**
  Answered first via WebSearch (no established DSS/Orit correction
  mechanism survives; modern scholarly proposals like Thiering's 17.5
  days/14yr and VanderKam's 35 days/28yr are reconstructions, not
  attested procedure), then went back and read the actual primary text
  already on ACR Reader (`data/file_14.json`, Vol 6 Chanokh/1 Enoch
  Astronomical Book, Ch. 37-49 internal numbering) instead of relying
  only on secondary sources, per the user's direct challenge. Found the
  real substance is different from what WebSearch alone suggested: Ch.
  40 describes four "intercalary days" (360 = 12x30 months, plus these
  four, "not reckoned in the reckoning of the year") — this is about
  reaching 364 from 360, not a multi-year correction; Ch. 75 frames
  skipping these days as covenant unfaithfulness ("men go wrong
  therein"); Ch. 79:6 states the 364-day year "is accurately completed"
  with no acknowledgment of further drift or any correction mechanism.
  Also surfaced (not fixed, out of scope — different site, no unlock
  given) that `GESTUDY/data/app_data.json` currently overstates this as
  settled fact, misattributed to 4Q319 rather than the real 2018
  Ratson/Ben-Dov 4Q324d decipherment, and without the "hypothesis, not
  confirmed text" hedging the actual scholarship carries. Flagged to
  user, no action taken.
- **User approved adding this Chanokh content into ACR Solar's own four
  Tekufah entries** (the only site being worked on), with the exact
  unlock phrase. Backup `backup/2026-08-31-acr-solar-v40b` cut at `main`
  HEAD `562996f`, verified matching `origin/main`, before any write.
  Edited all four Tekufah `practice` fields in `HOLIDAYS`
  (Summer/Autumn/Winter/Year End, `Solar/index.html`), distributing the
  three points (intercalary-day definition, covenant-faithfulness
  framing, "accurately completed"/no-correction-attested) one or two
  per entry so the four don't read identically. Cache `acr-solar-v40`
  -> `v41`.
- **Verified no break:** `node --check` clean on all 11 script blocks;
  `HOLIDAYS` array still parses via direct JS eval with all 22 entries
  intact, 4 Tekufah entries confirmed updated; real headless-browser
  pass confirms the Holidays view renders, the detail modal opens via
  the actual `showEventDetail()` function and contains the new Chanokh
  text, zero page errors.
- **Flagged a "gap" that turned out to be a false positive on my own
  part — corrected, per Rule 33.** Originally reported: the Summer/
  Winter Tekufah entries' pre-existing text claims these days "fall
  outside the seven-day week entirely," but `gregorianToSolar()`
  computes an ordinary weekday for them with no exclusion, calling this
  a real content/code gap. User asked for deep research to rule out a
  false positive before touching anything. On re-examination this does
  NOT hold up:
  - Chanokh Ch. 40:2 itself states the total year is accomplished
    through "three hundred and sixty-four stations" — 364 total, not
    360 with 4 additional/excluded days.
  - The "outside the week" framing traces to ACR Reader's own
    pre-existing critical note ("the extra days beyond the 52 complete
    weeks of the solar year"), which is arithmetically self-
    contradictory: 52 complete weeks = 364 days already; "beyond" that
    would total 368, contradicting Ch. 40:2's own "364 stations."
  - Decisive check: if the 4 Tekufah days were truly excluded from
    weekday-counting, the weekday label would shift by 4 (mod 7) every
    year and Yom Kippur could not land on the same weekday every year
    — but the 16-year check (2020-2035) already run this session shows
    zero exceptions, which is only possible if all 364 days, Tekufah
    days included, participate in one continuous week count.
  - The "Tekufah days never fall on Shabbat" claim found via WebSearch
    is real but is a *consequence* of 91 (days/quarter) being a clean
    multiple of 7 (91 mod 7 = 0), not evidence of exclusion from the
    week — confirmed by computing all four Tekufah days' weekday under
    the corrected anchor: all four land on the identical weekday
    (Tuesday), never Shabbat, exactly as the arithmetic predicts.
  - **Conclusion: `gregorianToSolar()` has no bug here and needs no
    change.** The only real (much narrower) issue is that the site's
    own pre-existing wording overstates a true, smaller fact — these
    days aren't counted among the twelve *named months'* day-count,
    but they are full week participants. That is a content-precision
    question, not a code fix, and remains unactioned pending the user's
    choice on whether it's worth a small wording pass.

## ACR Study — War Scroll / Book of Giants quiz cross-wire — found, fixed, merged

- User asked where Jubilees/War Scroll/Book of Giants show up in
  Study's games. Investigation found Study's `VOL_GROUPS` already had
  the full pre-removal 47-volume structure (Study was never touched by
  the July 22 removal), but `TRIAL_QUESTIONS['8']` held 5 real War
  Scroll questions (1QM 1:1-2, 3:9, 6:9, 2:6, 4:10) mislabeled under
  Book of Giants' vol slot, `TRIAL_QUESTIONS['33']` (War Scroll's real
  vol) didn't exist, and `war_scroll_seal`'s achievement/`volSealMap`
  entry, the `allTrials` "Ancient Seals" check, and `VOL_NAMES`/
  `VOL_COLORS`/`VOL_ICONS` all still pointed at vol `'8'` instead of
  `'33'` — so the study-session banner showed "War Scroll 1QM" over
  actual Book of Giants content and a blank banner over actual War
  Scroll content.
- User approved the fix ("same process, backup first, confirm no
  break, send me the link"). Backup `backup/2026-08-31-acr-study-v117`
  cut and verified at `main` HEAD `25749cd` before any write, per
  Rule 26.
- Fixed all six references (`TRIAL_QUESTIONS` key, achievement `vol`,
  `volSealMap` entry, `allTrials` array, `VOL_NAMES`/`VOL_COLORS`/
  `VOL_ICONS`), leaving the 5 War Scroll questions' actual content
  untouched and inventing nothing for Book of Giants (it has no quiz
  content of its own, per Rule 29). `study/sw.js` cache bumped
  `acr-study-v117` -> `v118`.
- Verified via headless browser against the real `study.js`:
  `TRIAL_QUESTIONS['8']` undefined, `TRIAL_QUESTIONS['33']` holds the 5
  War Scroll questions, `TRIAL_QUESTIONS['7']` (Jubilees) unaffected,
  achievement reads `vol:'33'`, zero page errors.
- **PR #863 merged** (user confirmed).

## ACR2 — 12 texts removed from Reader on 2026-07-22 restored (never relocated as originally planned)

- User noticed Community Rule and several other Reader-removed texts
  were never added to ACR2, despite the original removal commit
  (`8a837ae`) stating explicitly: "The 24 removed content files are
  left in data/ (unreferenced) for relocation to ACR2 in a follow-up
  step; nothing is deleted." That follow-up only ever covered 13 of
  the 24 files. Verified this claim directly against the commit
  message (not from memory) before reporting it back.
- Reported the gap in full per Rule 11 (13 texts genuinely missing:
  4QMMT, Damascus Document, Community Rule, Rule of the Congregation,
  Rule of Blessings, Words of the Luminaries, Pesher Nahum, Hodayot,
  Pesher Habakkuk, Genesis Apocryphon, Temple Scroll, Sefer Ha-Razim,
  Raz Nihyeh), excluding 4Q246/Songs of Sabbath Sacrifice/Visions of
  Amram per the user's earlier explicit exclusion. User confirmed all
  13, gave the Rule 8 unlock phrase ("edit ACR2"), and specified: use
  the original text/notes as they were, backup first, confirm no
  break, send the merge link.
- **Backup `backup/2026-08-31-acr2-v25` cut and verified at `main` HEAD
  `562996f` before any write, per Rule 26.**
- **Finding requiring a scope adjustment, reported rather than silently
  worked around:** Sefer Ha-Razim (Vol 46) could not be restored.
  `data/file_112.json` never existed in the repository, even before the
  July 22 removal — the pre-removal `index.html`'s own NAVIDS array had
  a typo (`"file 112"` with a space, not `"file_112"`), meaning this
  volume's nav entry was already broken and pointing at content that
  was never on disk. There is no original text to restore for this one;
  restoring it would mean inventing content, which Rule 29 forbids. All
  other 12 texts (16 content files — Damascus Document, Hodayot, and
  Temple Scroll are multi-part) had real, substantial original content
  confirmed present in git history at `8a837ae^`.
- **Rule 30 check before adding:** grepped all 16 restored files for
  polytheism/deified-intermediary/divine-family red flags. Two hits,
  both in Temple Scroll (covenant law *forbidding* worship of other
  gods/false prophets — the opposite of a violation); no other hits.
  All 12 texts confirmed clean.
- **Content transformation, matching the exact pattern already used for
  every other ACR2 volume** (verified against 4 existing ACR2 files,
  e.g. Aramaic Levi Document): stripped only the original two-paragraph
  Reader header (paleo-YHWH glyph + "THE ANCIENT COVENANT RECORD"
  line), prepended the same site-wide standard ACR2 banner every other
  non-quarantined volume already carries ("SECOND TEMPLE & LATER
  ADDITIONS" / "HELD UNDER WARNING — DOCUMENTED, NOT CANONICAL" /
  one-line disclaimer), and left every byte after that point —
  "Volume X" line, book title, manuscript authorities, chapter text,
  all four comparative notes — untouched. Verified programmatically:
  the post-banner body of all 16 new files is byte-identical to the
  original `8a837ae^` Reader content. This is the same standard tier
  used for normal ACR2 volumes, not the fuller "Held Under
  Warning"-with-forensic-essay tier used for the two Rule-30 quarantine
  cases (Animal Apocalypse, Epistle of Chanokh) — these 12 don't carry
  that kind of concern, they were excluded from the Reader for a dating
  reason (Rule 25), not a doctrinal one.
- Added as `ACR2/data/file_18.json` through `file_33.json` (Vol 14
  through Vol 25 in ACR2's own numbering, continuing after its existing
  Vol 13 — append-only, nothing renumbered). `ACR2/index.html`
  NAVIDS/LABELS/TOC and `ACR2/data/nav.json` updated to match. `ACR2/
  sw.js` cache bumped `acr2-v25` -> `v26`.
- **Verified no break:** JSON validity on all touched/added files,
  NAVIDS/LABELS length match (31/31), every NAVIDS entry resolves to an
  existing data file, all TOC `idx` values in range, HTML tag balance
  clean. Real headless-browser run: app loads, navigated to the new
  Temple Scroll and 4QMMT volumes and confirmed the actual original
  text renders correctly under the standard banner; zero page errors
  beyond the same pre-existing, unrelated `addEventListener` null
  warning already established as harmless noise in this app family.
- **Did not touch `EXCLUDED_TEXTS_DOSSIER.md`'s numbered exclusion
  entries** — the Reader's exclusion of these texts is unchanged and
  still correct (Rule 25); only their ACR2 availability changed, and
  the dossier's per-text forensic essays don't map cleanly onto a
  single numbered list for all 12, so editing it risked introducing an
  inaccuracy under time pressure rather than fixing one.
- **Not merged — PR opened, link sent to user, awaiting explicit
  merge instruction per Rule 9.**

## Pending / parked

- **Tekufah "outside the week" wording — resolved as a false positive,
  no code fix needed.** See the corrected note above: deep research
  (primary text + the arithmetic + the already-verified 16-year
  no-drift check) confirms `gregorianToSolar()` is correct as-is. The
  only optional remaining item is a small content-wording pass on the
  Summer/Winter Tekufah entries' pre-existing "falls outside the
  seven-day week entirely" phrasing, to replace it with the accurate,
  narrower fact (not counted among the twelve named months, but a full
  week participant) — not urgent, not a bug, awaiting the user's choice.

- **Pseudo-Jubilees (4Q225-227) and Angels of Mastemah (4Q390) remain
  excluded on their own separate merits** — this was never
  reinvestigated the way Jubilees itself was. Their "stacked on a
  forgery" premise about Jubilees is now fixed (#853), but nobody has
  checked whether their *own* independent reasoning (Pseudo-Jubilees'
  invented Mastema "chain of command"; Angels of Mastemah's late
  dating) actually holds up, or whether either deserves the same
  reinvestigation Jubilees got. Explicitly left open for the user to
  request separately — not a bug, a deliberate pause.

## Capability gaps in this session

- None encountered. All verification done directly: git archaeology
  (`git show`/`git log -S`/pickaxe) for original pre-removal text,
  headless Playwright (Chromium) calling real app functions for
  runtime verification, `node --check` for syntax, GitHub MCP tools
  for PR creation and live-`main` state checks.

## Today's commit log (newest first)

```
562996f Merge pull request #864 from DssOrit/claude/acr-solar-session-notes-backup
2b114a5 Merge pull request #863 from DssOrit/claude/study-war-scroll-giants-fix
ef148b4 Fix War Scroll / Book of Giants quiz content cross-wire in ACR Study
c413bb5 Merge pull request #862 from DssOrit/claude/acr-solar-weekday-anchor
25749cd Merge pull request #861 from DssOrit/claude/acr-search-restore-war-scroll-giants
420b249 Merge pull request #853 from DssOrit/claude/acr-search-fix-pseudo-jubilees-premise
286db36 Merge pull request #851 from DssOrit/claude/acr-search-restore-jubilees
603b573 Search: fix stale 'already-fabricated Book of Jubilees' premise in Pseudo-Jubilees and Angels of Mastemah debunk entries — cache v298
12bf950 Merge pull request #852 from DssOrit/claude/acr-search-remove-jubilees-exclusion
75c8835 Search: remove Jubilees exclusion/forgery framing from Volume Browser, dictionary, Cave 2, suppression panel — cache v297
553ca8b Search: restore Jubilees positive citations — Curse of Ham, calendar authority, Mastema/spirit-world — cache v297
a07661a Merge pull request #850 from DssOrit/claude/acr-reader-restore-jubilees
d1bf2c8 ACR Reader: restore the Book of Jubilees (Vol 7) after reinvestigation
```

## Backups

- `backup/2026-08-31-acr-v115` — SHA `bab882e0da1103c67d7363005049f33f18749aae`,
  `main` HEAD right before the ACR Reader Jubilees restoration (PR
  #850). Cut and verified before any write, per Rule 26.
- `backup/2026-08-31-acr-search-v296` — SHA `a07661a2aac89b044c0418a0c3dd35f660f901e4`,
  `main` HEAD right before any ACR Search Jubilees edit (covers #851,
  #852, and #853 — none of those PRs' base state changed until #850
  merged). Cut and verified before the first write.

Recovery: `git checkout backup/2026-08-31-acr-v115` to go back to
before the Reader restoration; `git checkout
backup/2026-08-31-acr-search-v296` to go back to before any of the
Search fixes (Reader restoration would still be in place at that
point, since it's a later commit on `main`).

- `backup/2026-08-31-acr-solar-v39` — SHA `5b6af555eab1c746d19cd60fa37d29d0d5e37a7b`,
  `main` HEAD right before the Solar weekday-anchor fix (PR #862). Cut
  and verified before any write, per Rule 26.
- `backup/2026-08-31-acr-solar-v40` — SHA `c413bb53afda2eb49b1696f66d1f6c7ae1f32240`,
  `main` HEAD right after PR #862 merged and verified live (the current
  verified-working state — user confirmed "merged" and it was checked
  directly against `origin/main`). Recovery: `git checkout
  backup/2026-08-31-acr-solar-v40`.
- `backup/2026-08-31-acr-study-v117` — SHA
  `25749cd725ee513be2841658761f9da525adf636`, `main` HEAD right before
  the Study War Scroll/Book of Giants quiz fix (PR #863, merged). Cut
  and verified before any write, per Rule 26.
- `backup/2026-08-31-acr2-v25` — SHA
  `562996fe1009a47aee042434ada901d81c3c3e94`, `main` HEAD right before
  the ACR2 12-text restoration. Cut and verified before any write, per
  Rule 26. Recovery: `git checkout backup/2026-08-31-acr2-v25`.
- `backup/2026-08-31-acr-solar-v41` — SHA
  `1f73642c8248f790135eb4da39deed25f462da2a`, `main` HEAD right after PR
  #866 (Chanokh content on the four Tekufah entries) merged and
  verified live. Recovery: `git checkout backup/2026-08-31-acr-solar-v41`.
- `backup/2026-08-31-session-end` — SHA
  `c49231968057dc69d051d38446b641d1c6c954e3`, final `main` HEAD at
  session close (includes PR #868/Rule 34 and other sessions' concurrent
  work). Recovery: `git checkout backup/2026-08-31-session-end`.

## Session close — 2026-09-01 (late 2026-08-31 wall clock)

- **PR #866 (Chanokh content, 4 Tekufah entries) — merged, verified.**
  Before merge, re-confirmed the exact diff scope against a *fresh*
  `origin/main` fetch after an earlier check had accidentally diffed
  against a stale local `main` ref and shown 31 unrelated files — caught
  and corrected before reporting it to the user. Also caught that the
  PR's own description still carried the retracted false-positive claim
  from before the correction and fixed the PR body to match the
  corrected session notes, so nothing false was left standing anywhere
  in the PR. Re-ran the full verification suite (syntax, `HOLIDAYS`
  parse, headless-browser render + modal + Yom Kippur weekday check) a
  second time against the real PR branch content, not from memory,
  before telling the user it was safe to merge. User merged; verified
  directly against `origin/main` (cache `acr-solar-v41`, Chanokh Ch.
  40/75/79 citations all present in the live file).
- **New locked rule — CLAUDE.md Rule 34, merged.** User said "New rule,
  important... ALWAYS DO THOROUGH CHECKS BEFORE REPORTING ISSUES! Never
  report false errors" after the Tekufah false-positive. Added Rule 34
  (full text in the file) requiring the available checks be exhausted
  — re-derive the math/logic, re-read primary text closely, cross-check
  already-established results — before any "found an issue" report.
  Opened as PR #868; a "close this for now" instruction crossed with
  the user separately merging it via the PR link — reconciled directly
  with the user (confirmed: "Yes I merged because you sent the link"),
  no actual conflict, just a timing mix-up. Merged and live on `main`.
- **Follow-up spot-checks, both held up.** User asked "what do you mean
  wood offering days" (a plain content question, answered from the live
  file) and then specifically demanded a fresh, from-scratch re-check of
  the "no prayer text preserved" claim for the Wood Offering festival,
  given the earlier false positive. Re-verified via git history (PR
  #858 did genuinely touch this entry, not skipped) plus two new
  WebSearches targeting the Temple Scroll's Wood Offering columns
  specifically for any liturgical/oath content — found festival
  structure detail (six days, tribal pairs) but nothing contradicting
  "no prayer text attested," unlike Shavuot's genuinely-quoted 1QS
  covenant-renewal liturgy used as the contrast case. Claim held up
  under fresh scrutiny, reported as such rather than just reasserted.
- User said "Then we are done." Cut the final session-end backup at
  current `main` HEAD (`c492319`, see Backups above) and closing this
  log. No uncommitted work; everything shipped this session is either
  merged and verified, or explicitly logged as pending the user's
  choice (see Pending/parked).
