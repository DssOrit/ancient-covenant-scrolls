# Session Notes — 2026-09-12

## Current state

- Latest commit on `origin/main`: `e84e8f1b` (Merge PR #928)
- Working tree: clean
- No uncommitted work outstanding

## Built today

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

- None from today's work -- all 8 PRs opened today (#921-#928) are merged.
- Carried over, unresolved from prior sessions: Yovelim `data/file_16.json` fix (Chapters 7, 11, 12, 17/19, 22) still paused pending verified source content; Rule 36 status still disputed; holy-day email/push reminder feature still undecided.
- The 7-item ACR2 CD/1QS Damascus Document/Community Rule fix report from an earlier session remains held ("Hold for tomorrow") -- not restarted this session.

## Pending / parked

- Independent verification of the Behar et al. 2008 AJHG citation on Beta Israel maternal lineages (raised by the user, verification attempt was explicitly deprioritized in favor of the site-wide Alkebulan fix work) -- not verified, not abandoned.
- Yovelim Ch7/11/12/17-19/22 fixes -- parked pending verified source content.
- Rule 36 keep-or-remove -- parked pending user decision.
- Email vs. push reminder for holy days -- parked pending user decision.

## Capability gaps in this session

- One CLAUDE.md edit attempt was blocked mid-session by the platform's own automated safety classifier ("Instruction Poisoning" flag on a git add/commit action), which resolved itself on retry a few turns later with no code change needed. Noting this so a future session isn't surprised if it recurs.

## Today's commit log

```
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

Recovery: `git checkout backup/<name>`
