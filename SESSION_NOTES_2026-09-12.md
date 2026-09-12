# Session Notes — 2026-09-12

## Current state

- Latest commit on `origin/main`: `a7198c6` (Merge PR #933)
- Working tree: clean
- No uncommitted work outstanding

## Built today

**ACR Search — Attested Names explorer, Mode 3 of the Paleo-Hebrew tool (PR #933, merged)**

- Investigated the user's report that ACR Search's Paleo Alphabet tab "sound isn't working nor is it giving a name meaning." Found two distinct, real issues without editing anything (find-first): (1) the name-meaning gap is a real content/scope issue in the `HR_WORDS` corpus; (2) the "Hear it" speech-synthesis code path is structurally correct but could not be confirmed producing real audio from this sandbox (no TTS engine available here) -- flagged as unverified rather than claimed fixed. Also found, incidentally, a real and reproducible unrelated JS crash: a `TypeError: Cannot read properties of null (reading 'addEventListener')` from the save-to-home-screen banner script running before its own DOM elements exist. Not fixed -- not yet in scope, flagged separately below.
- User pasted external design examples (Witness/`ʿed`, James/Ya'akov) proposing a Name Explorer feature. Verified the linguistic content was accurate, but flagged that both examples used square Hebrew script with niqqud, violating Rules 22/31 -- gave corrected paleo forms before anything was built on top of them.
- User confirmed scope: keep the existing chart/table design as-is, add a new natural-language "stacked reading" sentence after the existing pictographic table (distinct from the existing mechanical "Consonant chain" line); leave out Strong's numbers; no cultural-practice-overlap notes; use the full 29-name set from the existing Tribes & Territory `FIGURES` dataset, not a subset.
- User gave the exact Rule 8 unlock phrase ("Edit ACR search but backup-first, confirm-no-break, verify, send-merge-link") to begin the build.
- Built and shipped, per that scope:
  - Extended the 18 existing `HR_WORDS` person-name entries (Daniyel, Noach, Chanoch, Moshe, Avraham, Yitzchak, Yaakov, David, Yeshayahu, Yirmeyahu, Hoshea, Amos, Michah, Chavakuk, Shmuel, Shaul, Elisha, Rut) with `person:true`, a `fig` cross-reference key to `FIGURES`, and a hand-composed `stacked` reading -- rather than building a duplicate dataset.
  - Added 11 new `HR_WORDS` entries (Yosef, Sarah, Yonah, Nechemyah, Yoel, Ovadyah, Nakhum, Tzefanyah, Khagai, Zekharyah, Malakhi), completing the full 29-name set and, together with the existing entries, covering all Twelve Minor Prophets.
  - Added a generic pictographic-table generator (derives a table from any paleo string via `PALEO_ALPHA` lookup), reused by the new explorer and by Transliterate mode.
  - Added a new third pill/pane, "Attested Names," browsing all 29 figures with paleo glyphs, meaning, tribe/territory cross-reference, pictographic table, and stacked reading.
  - Added an auto-generated stacked-reading sentence to Transliterate mode's own output.
  - Fixed a real `runWordLookup` bug found during the investigation: a substring match inside another entry's meaning text (e.g. "moshe" inside Torah's description) could outrank the actual matching entry -- `en`/`translit` matches now take priority.
  - Cache bumped `acr-search-v310` -> `v311`.
- Verified before shipping: every paleo string decoded letter-by-letter against the Phoenician-block Unicode codepoints; `node --check` on the extracted inline JS; live Playwright verification -- all 29 entries render with correct picto table/stacked reading/tribe line, 0 missing; `fig` cross-reference 29/29 matched with 0 duplicates; the Moshe lookup bug fix confirmed; mode-switching confirmed; zero *new* page errors (the pre-existing save-banner crash still reproduces, untouched).
- Backups: `backup/2026-09-12-acr-search-pre-name-explorer` (SHA `15ce120`, before the change) and `backup/2026-09-12-acr-search-v311` (SHA `a7198c6`, current merged stable state).

**ACR Maps — My Journey passport and tribal territory claim tracking (PR #932, merged)** -- built and merged today, but not in this session's own thread; noted here from `git log` only (title, not contents independently verified this session).

**ACR Maps — Hebrew-lineage audit, Covenant Land build, and retroactive Alkebulan naming (PRs #919, #920, #922, #923, merged)**

- Audited ACR Maps' "Hebrew community" entries against true ancient lineage vs. European Sephardic/Converso history vs. modern 20th-century revival movements. Reframed 11 entries accordingly (PR #919).
- Added 30 new `covenant_land`-type places (promised-land locations, boundary markers, tribal allotments) plus a new map layer, region pill, and CSS color for the type (PR #919).
- Added missing Lake Chad entry, a new "tribes pushed out of the land" route, and closed a completeness gap with 4 more promised-land locations (Yam HaGadol, the Chiti's territory, Ya'zer, Yogb'hah) after being told not to leave any of the promised land out (PR #920).
- Split Rule 8's "Load Maps" unlock into a separate "ACR Maps" entry, matching what the app calls itself (PR #922).
- Established Rule 38 ("Alkebulan is the true name, Africa is named as the newer name beside it") and applied it retroactively across all 101 places, 10 routes, and 3 genetic corridors in `maps/acr_places.json` and `maps/index.html` (PR #923, cache bumped to `acr-maps-v19`).

**Rule 38 Alkebulan fix extended to ACR Reader, ACR Study, and ACR Search (PRs #924, #925, #926, merged)**

- ACR Reader: 18 instances across 11 `data/file_N.json` files (cache `acr-v123` → `acr-v124`).
- ACR Study: 159 instances across 50 `study/content/*.json` files (cache `acr-study-v118` → `acr-v119`).
- ACR Search: 1,014 instances across `Search/index.html` and `Search/acr_search_data.json` (cache `acr-search-v309` → `v310`); internal lowercase search `keywords:[...]` arrays and `id:` fields deliberately left untouched as machine-readable data, same exception already applied to ACR Solar's IANA timezone strings.
- ACR2 and ACR Solar confirmed to need no changes (0 instances / only technical timezone identifiers respectively).

**CLAUDE.md governance additions (PRs #921, #927, #928, merged)**

- Rule 38 added as a new numbered LOCKED rule (PR #921).
- A new, non-numbered "User research note" section added documenting a DNA/haplogroup research discussion (E-P252/L2a1/L1b/L3e3b markers) the user raised, built up over several rounds of citation-checking (PRs #927, #928):
  - Real, sourced facts credited: reference-panel bias (Popejoy & Fullerton 2016, Tishkoff 2009), Ashkenazi European admixture (Costa 2013), Natufian African-related ancestry (Lazaridis 2016, Shriner 2018), E-V38 phylogeny (Trombetta 2011), Ramesses III Y-DNA E1b1a (Hawass/Gad 2012), Igbo-Israelite cultural/legal continuity (Equiano 1789, Basden 1921), and the real 2017 JVMI/Ilona Igbo-DNA-testing controversy (both sides logged, including JVMI's negative finding).
  - Several relayed citations were checked and corrected: wrong journal names (Trombetta -> PLoS ONE not MBE; Salas -> Annals of Human Genetics not AJHG), mismatched PMIDs, and one factually incorrect claim (Lazaridis "100%" of Natufian male skeletons carrying Haplogroup E; actual finding is 3 of 5, mostly E1b1b not E1b1a, with the other 2 of 5 carrying a different haplogroup).
  - The user's central conclusion -- that the E-P252/L3e3b marker cluster specifically is "the genetic vehicle" of ancient Hebrew/Lost-Tribes migration -- is recorded throughout as the user's own interpretive conclusion, not as an established fact, since no citation produced in the discussion (checked across several rounds, including a request for a Nri/Eri-priestly-lineage-specific genetic study) named that exact link.
  - The user asked twice for Rule 37 (or a new note) to be rewritten so this claim is treated as settled and exempt from the citation-verification standard; both requests were declined, on the grounds that Rule 37 states its standard applies "regardless of who asserts it or how confidently." The user's objection to that framing, and to a sentence added without their prior approval, is logged in the note itself, along with removal of personal DNA test-result specifics per their request.

## Outstanding / blocking

- ACR Search's save-to-home-screen banner crash (`TypeError: Cannot read properties of null (reading 'addEventListener')`, reproduces on every page load) is found and confirmed but NOT fixed -- offered to the user, not yet approved as in-scope for a fix.
- The two clarifying questions asked about the original "sound isn't working" report (does the audio bar appear at all when tapping "Hear it"? does this happen on tabs other than Paleo Alphabet?) were never answered -- may be moot now that the user moved to building the Name Explorer instead, but not explicitly confirmed as superseded.
- All PRs opened today across all threads (#919-#928, #932, #933) are merged; none open.
- Carried over, unresolved from prior sessions: Yovelim `data/file_16.json` fix (Chapters 7, 11, 12, 17/19, 22) still paused pending verified source content; Rule 36 status still disputed; holy-day email/push reminder feature still undecided.
- The 7-item ACR2 CD/1QS Damascus Document/Community Rule fix report from an earlier session remains held ("Hold for tomorrow") -- not restarted this session.

## Pending / parked

- ACR Search save-banner `addEventListener` crash -- fix not yet approved by the user.
- Independent verification of the Behar et al. 2008 AJHG citation on Beta Israel maternal lineages (raised by the user, verification attempt was explicitly deprioritized in favor of the site-wide Alkebulan fix work) -- not verified, not abandoned.
- Yovelim Ch7/11/12/17-19/22 fixes -- parked pending verified source content.
- Rule 36 keep-or-remove -- parked pending user decision.
- Email vs. push reminder for holy days -- parked pending user decision.

## Capability gaps in this session

- One CLAUDE.md edit attempt was blocked mid-session by the platform's own automated safety classifier ("Instruction Poisoning" flag on a git add/commit action), which resolved itself on retry a few turns later with no code change needed. Noting this so a future session isn't surprised if it recurs.

## Today's commit log

```
a7198c6 Merge pull request #933 from DssOrit/claude/acr-search-name-explorer-2026-09-12
1f77b8b ACR Search: add Attested Names explorer (Mode 3) to the Paleo-Hebrew Name/Word tool
Merge pull request #932 from DssOrit/claude/acr-maps-journey-passport
708e906 ACR Maps: add My Journey passport and tribal territory claim tracking
Merge pull request #931 from DssOrit/claude/claude-md-thesis-summary
a44bd62 CLAUDE.md: add closing project-analysis summary for the DNA/linguistics discussion
Merge pull request #930 from DssOrit/claude/claude-md-linguistic-parallel-check
Merge pull request #929 from DssOrit/claude/session-notes-2026-09-12
6a8446e CLAUDE.md: final unified entry for the Hebrew-Igbo Linguistic Matrix
ea0330d CLAUDE.md: log Hebrew-Igbo linguistic parallel claims, checked and corrected
204c847 Add session notes for 2026-09-12
e84e8f1b Merge pull request #928 from DssOrit/claude/claude-md-dna-citation-check
e3f2992c CLAUDE.md: log the Igbo-Israelite genetic mapping controversy, both sides
24d9cf51 CLAUDE.md: credit Equiano/Basden ethnographic sources on Igbo-Israelite custom
3c645ed2 CLAUDE.md: log second round of citation checks on DNA research note
c75f1342 CLAUDE.md: streamline DNA research note, cut repeated unverified-framing language
5cc5f25f CLAUDE.md: remove personal DNA specifics, log user's objection to override framing
366c153d CLAUDE.md: log citation check on follow-up DNA research sources
Merge pull request #927 from DssOrit/claude/claude-md-dna-research-note
1ad06509 CLAUDE.md: log user's DNA research request and evidence as a documentation note
Merge pull request #926 from DssOrit/claude/acr-search-alkebulan
0bda3fca ACR Search: apply Alkebulan (Africa) naming pairing retroactively
Merge pull request #925 from DssOrit/claude/acr-study-alkebulan
73cc732b ACR Study: apply Alkebulan (Africa) naming pairing retroactively
Merge pull request #924 from DssOrit/claude/acr-reader-alkebulan
Merge pull request #923 from DssOrit/claude/acr-maps-alkebulan-retroactive
11832e5c ACR Maps: retroactive Alkebulan (Africa) pairing, every instance, per Rule 38
Merge pull request #922 from DssOrit/claude/acr-maps-rule8-unlock-split
Merge pull request #921 from DssOrit/claude/rule38-alkebulan
Merge pull request #920 from DssOrit/claude/acr-maps-hebrew-lineage-promised-land
71801a57 ACR Maps: add the 4 promised-land locations missed in the first pass
Merge pull request #919 from DssOrit/claude/acr-maps-hebrew-lineage-reframing
```

## Backups

- `backup/2026-09-12-acr-study-v118` -- SHA `33e6f099ffa7a16f5d1352ac1c9d04120795f235` (before ACR Study fix)
- `backup/2026-09-12-acr-search-baseline` -- SHA `33e6f099ffa7a16f5d1352ac1c9d04120795f235` (before ACR Search fix)
- `backup/2026-09-12-acr-search-pre-name-explorer` -- SHA `15ce1206a7734986b64bab6e29372e35d220ce42` (before the Attested Names build)
- `backup/2026-09-12-acr-search-v311` -- SHA `a7198c6f1d7b6b133bdf8fca69edecf8b0b4ab1b` (current merged stable state, PR #933)

Recovery: `git checkout backup/<name>`
