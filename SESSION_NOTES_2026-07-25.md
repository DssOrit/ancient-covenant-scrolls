# Session Notes — 2026-07-25

## Current state
- main HEAD: bcbc301 (Merge PR #760, merged by DssOrit)
- Search cache: acr-search-v263 (on main)
- Designated branch: claude/session-continuation-setup-2zkame (synced to main)
- Backup: backup/2026-07-25-acr-search-v263 @ d65e536

## Built today — merged via PR #760 (Enoch excluded-chapter reconciliation of ACR Search)
Excluded Enoch = Similitudes (37-71), Book of Dreams (83-90), Epistle/Apocalypse of Weeks (91-108)
per EXCLUDED_TEXTS_DOSSIER.md lines 87-90. Kept = Book of Watchers (1-36), Astronomical Book (72-82).

- Group A: 10 excluded-Enoch reference/quote removals across the Revelation cross-reference
  entries and concordance blocks; in-canon and non-Enoch sources kept.
- Group B: 4 Revelation entries — excluded Enoch removed, verdicts de-softened.
- Verdict pass: all 42 Revelation cross-reference verdicts reframed to the debunk voice
  (Revelation borrowed from the older primary source; no compare-as-valid framing).
- Group C — 3 whole-block replacements:
  - "Those Who Fabricated Texts" -> Yirmeyahu 8:8 + 16:19
  - "Chanokh 93:1-2" verse entry -> Bereshit 15:13-14 + Yeshayahu 65:9
  - "1 Enoch 62-63" Judgment Record -> in-canon 1 Enoch 1:9/5:6-7 + Yirmeyahu 22:13,
    Yeshayahu 10:1-3, Devarim 32:35 (modern-application paragraph + Reader pointer kept)
- Group D:
  - Book of Enoch library card body -> evidence-first exposure of the three sections as
    text manipulation (user's exact words)
  - Similitudes-debunk "What Was Found at Qumran" -> no longer frames Dreams/Epistle as
    authoritative; contrasts the Similitudes absence against the kept Watchers + Astronomical Book
- Cache bump acr-search-v262 -> v263.

## Decisions logged
- Verdict standard: every Revelation verdict debunks (borrowed-from-source), never compare-as-valid; no softening.
- User declined adding Book of Dreams / Epistle exclusion cards to the Suppressed shelf. Shelf
  keeps its 3 existing cards (Similitudes, Book of Giants, Extra Psalms). Draft wording for the
  two cards is set aside (recorded in chat if revived).

## Outstanding / to verify (user, on iPad)
- Confirm live: https://dssorit.github.io/ancient-covenant-scrolls/Search/sw.js should show
  CACHE 'acr-search-v263'; hard-refresh Search once Cloudflare/Pages deploys.

## Pending / parked (NOT requested this session)
- "Problem 1" from the scan: Second Temple sectarian texts (1QS, 1QH, CD, Pesharim, 1QM, 11QT,
  4QMMT) are used as authoritative "primary source" in many Search spots while also being debunked
  as "held under warning" — a large internal contradiction. Left untouched; user scoped this
  session to Enoch chapters only.
- Card 5 keySrc still lists 1QS IV / 1QH.
- Search hardRefresh() global cache-wipe scoping (Rule 21, pre-existing).
- The two set-aside exclusion cards (Dreams, Epistle).

## Capability gaps this session
- Cannot reach live dssorit.github.io or the GitHub Pages API from this environment. Verified main
  state via git fetch + GitHub MCP (pull_request_read) instead.

## Backups
- backup/2026-07-25-acr-search-v263 @ d65e536 (branch tip before merge). Recovery:
  git checkout backup/2026-07-25-acr-search-v263
