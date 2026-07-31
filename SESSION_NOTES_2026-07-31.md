# Session Notes — 2026-07-31

## Current state
- Working branch: `claude/session-continuation-setup-2zkame`.
- Continuing the excluded-text reconciliation of ACR Search (`Search/index.html`): no excluded
  sectarian DSS text used as a validating/authoritative reference; excluded texts appear only in
  debunk/exclusion context. Working checklist:
  `SEARCH_EXCLUDED_TEXT_VALIDREF_AUDIT_2026-07-25.md` (has the live OPERATING STATE + per-text log).
- Guard (`tools/reconciliation_guard.py`) run before every edit; no no-touch zone touched except
  two spots the user explicitly approved (#11 L10204/L10247).

## Shipped today (merged to main, verified)
- **PR #789 MERGED** (merge commit `3e8d2f8`), cache **acr-search-v286** — #8 4QMMT + #9 1QSa.
  Verified on origin/main.
- **PR #790 MERGED** (merge commit `a55ad6d`), cache **acr-search-v287** — #11 Songs of the
  Sabbath Sacrifice (5 spots). User confirmed "Merged verify"; verified on origin/main
  (header/card present, old validating text gone, v287).
- #10 Words of the Luminaries — verified clean, no edits (all refs debunk/nav in the dossier zone).

## Shipped today (merged to main, verified)
- **PR #791 MERGED** (merge commit `26e2439`), cache **acr-search-v288** — #12 Book of Giants
  (partial, Spots 1-4). User confirmed "Merged"; verified on origin/main: Spot 1 header present,
  Spot 3 flipped card present + old "Confirmed" card gone, Spot 4 unbundled. Spots 5/6 confirmed
  still present on main (expected — saved for tomorrow).
  Branch commits since v287: `8a4963b`, `f510c9c`, `375b003`, `836787f`, plus cache bump + docs.
  - Spot 1 L4925-4926: header -> "The Watchers & the Giants, DSS and Covenant Record"; sub
    re-sourced (covenant giant-chain; Book of the Watchers kept).
  - Spot 2 L4928 Noach Tamim: dropped Book of Giants, kept Book of the Watchers; added
    Bereshit 6:4 + Bamidbar 13:33.
  - Spot 3 L4932: FLIPPED the "Book of Giants, Confirmed... primary source" card to the covenant
    giant-record (Bereshit 6:4; Bamidbar 13:33; Yehoshua 15:14/14:15/11:21-22; Shofetim 1:20;
    Devarim 3:11; 2 Shemuel 21:20-22; 1 Shemuel 17:4) + the app's own exclusion verdict. Option 2
    (user choice): NO manuscript-level Gilgamesh claim (Gilgamesh is 0 in the concordance; the
    fragment claim is dossier-sourced, not concordance-verifiable).
  - Spot 4 L4933: unbundled the excluded Book of Giants from the Watchers/1 Chanokh suppression
    argument (two surgical removals).

## Outstanding / pick up tomorrow (same one-by-one method, both already presented + approved-pending-go)
- **#12 Spot 5 — Abel-Main place card (L2479-2490).** Re-source the 4 "Book of Giants 4Q203" refs
  to **1 Chanokh 13:9** (Book of the Watchers, VALID, in the Ge'ez Orit / concordance as Chanokh v9:
  "...weeping in Abelsjail, which is between Lebanon and Seneser, with their faces covered."). Keep
  the card; re-source only. Abelsjail = Abel-Main; covenant place = Avel Beit-Ma'akhah
  (1 Melachim 15:20; 2 Melachim 15:29). BEFORE/AFTER is in the chat log, ready to apply on "go".
  - Separate flag (NOT the excluded-text task): the status box credits Western scholars
    Milik/Stuckenbruck for the modern-site identification — rule-0/24 concern, left for the user.
- **#12 Spot 6 — Watcher/ir glossary (L7699).** Drop "the Book of Giants (4Q203)"; keep the valid
  1 Enoch 6-11 Watchers source.
- After Spots 5-6: #12 complete -> **#13 Raz Nihyeh** (the last text on the frozen list).

## Method (LOCKED, honored this session)
One spot at a time: guard-check -> full BEFORE + full AFTER -> contradiction y/n -> wait for user
"go" -> apply -> node --check on inline scripts -> commit. Re-source to covenant verses (don't just
delete). No softening (rule 28), verdict-first. Divine name YHWH/Creator only. NT figure documented
as invented. No niqqud in pre-Rabbinic citations. Every replacement verse verified verbatim in
`Search/acr_concordance.json` before proposing. Never merge — user merges every PR.

## Analytical note logged today (giants)
The giants/Nephilim are a TRUE covenant theme, not a sectarian invention — the covenant record
carries the whole arc: origin (Bereshit 6:4), survival to the conquest (Bamidbar 13:33), the named
clans (Anakim, Rephaim), and their destruction by YHWH's people (Yehoshua 11:21-22; 2 Shemuel
21:20-22; Goliath 1 Shemuel 17:4). So the Book of Giants adds nothing true — only the foreign
Mesopotamian import. Reconciliation affirms the giants from the covenant record and removes only the
excluded text.

## Backups
- `backup/2026-07-31-acr-search-v287` @ `a55ad6d` (verified-live #11 state; recovery:
  `git checkout backup/2026-07-31-acr-search-v287`).

## Capability gaps this session
- Cannot reach live Pages URL (`dssorit.github.io`); verify ships against `origin/main` via git +
  GitHub MCP. Live confirmation on iPad = open `.../Search/sw.js` and read the `CACHE = '...'` value.
- Cannot GPG-sign commits here; the stop-hook "Unverified" nag is environmental (committer email is
  correct). Harmless.
- Concordance (`Search/acr_concordance.json`, 19,743 passages) reliable for covenant-record verse
  checks. It does NOT contain excluded texts (e.g. Book of Giants), so manuscript-level claims about
  excluded texts cannot be verified there — flagged and handled (see #12 Spot 3 Option 2).

## Today's commit log (branch, since v287 merge a55ad6d)
- 8a4963b Search: #12 Book of Giants - re-source section header+sub (L4925-4926)
- f510c9c Search: #12 Book of Giants - re-source Noach Tamim card (L4928)
- 375b003 Search: #12 Book of Giants - flip the Confirmed card (L4932) to covenant giant-record
- 836787f Search: #12 Book of Giants - unbundle Giants from Watchers suppression card (L4933)
- (this wrap: cache v288 + audit + session notes)
