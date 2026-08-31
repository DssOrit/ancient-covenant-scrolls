# Session Notes — 2026-08-31

## Current state

- `main` HEAD: `420b249` (PR #853 merged). Nothing uncommitted, no open
  PRs left from today's work.
- ACR Reader cache: `acr-v116`.
- ACR Search cache: `acr-search-v298`.
- `EXCLUDED_TEXTS_DOSSIER.md` entry 2 (Book of Jubilees) marked
  RESTORED, 2026-08-31, no longer excluded. Collective status line
  updated to "10 of 11 entries remain excluded."

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
- **Discovered but NOT touched, flagged only:** the Summer/Winter
  Tekufah entries' existing (pre-dating this session) `desc`/`practice`
  text claims these days "fall outside the seven-day week entirely" —
  which the actual Chanokh Ch. 40 text I just read directly supports
  ("not reckoned in the reckoning of the year"). But the app's actual
  `gregorianToSolar()` code does NOT implement this — it computes an
  ordinary weekday for every day including the four Tekufah days, with
  no special-casing to exclude them from the week count. This is a
  real structural gap between the site's own content claim and its
  code, separate from the weekday-anchor bug fixed earlier today (PR
  #862) and NOT approved or touched — reported to the user for a
  separate decision.

## Pending / parked

- **Tekufah days' week-exclusion claim vs. code, found 2026-08-31, not
  yet actioned.** See note above — the four Tekufah entries' own text
  says these days sit outside the 7-day week (matching Chanokh Ch. 40),
  but `gregorianToSolar()` assigns them an ordinary weekday like any
  other day. Whether to change the engine so Tekufah days are excluded
  from weekday computation (a materially bigger change than today's
  anchor fix — it would affect day-counting for every date after each
  Tekufah in the year) needs the user's explicit direction before any
  work starts.

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
