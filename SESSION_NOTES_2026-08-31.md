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

- **ACR Solar weekday-anchor bug — found, reported, NOT fixed. Awaiting
  user approval + "edit ACR Solar" unlock (Rule 11).** User asked me to
  check whether the 364-day solar calendar's day-of-week cycle is
  correct, specifically citing that DSS calendrical texts fix Yom
  Kippur (7/10) on the 6th day (Friday). Read `Solar/index.html`
  `gregorianToSolar()`/`getSolarYearStart()` (lines ~1342-1398):
  `weekDay = (dayOfSolarYear % 7) + 1` hardcodes month-1/day-1 (1 Aviv)
  as weekDay=1=Sunday, with no citation. WebSearch confirmed (4Q320/
  4Q321 Mishmarot, "Qumran Calendars and the Creation") the actual
  scholarly reconstruction: the year begins on the *4th day of the
  week* (Wednesday), tied to the creation of sun/moon/stars on day 4
  (Gen 1:14-19) — not Sunday. Recomputed Yom Kippur's weekday using the
  app's own `SOLAR_MONTHS` day-count array (dayOfYear 0-indexed = 191)
  under both anchors: app's current Sunday anchor -> Tuesday; correct
  Wednesday anchor -> **Friday**, matching the user's claim exactly and
  matching well-documented Shavuot-always-Sunday reconstruction as a
  cross-check (3/15, dayOfYear 74, Wednesday anchor -> Sunday). This is
  a single shared constant (one anchor offset), so it is a small,
  precise fix once approved, but it shifts every date's weekday by a
  fixed 3-day offset app-wide (Shabbat marking, every festival's
  weekday, priestly-rotation-adjacent logic) — not just Yom Kippur.
  What is NOT part of this bug and remains genuine guesswork (per the
  user's own framing, not something to "fix"): which real Gregorian
  date corresponds to 1 Aviv in any given year (the equinox-anchoring
  side, `getSolarYearStart` returning Gregorian March 20) — the scrolls
  don't specify that alignment and neither the app nor anyone else can
  derive it with certainty. Reported to user in full per Rule 11; no
  code touched. `Solar/sw.js` still at `acr-solar-v39` (matches PR #858,
  still open/unmerged as of this note).
- Otherwise: all four Jubilees-restoration PRs (#850, #851, #852, #853)
  are merged and verified live on `main`.

## Pending / parked

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
