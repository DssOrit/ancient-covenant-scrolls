# Session Notes — 2026-07-24

## Current state
- Branch: `claude/session-continuation-setup-2zkame` (synced to `origin/main`)
- `origin/main` HEAD: `8331fcf` (Merge PR #753)
- Search SW cache on main: `acr-search-v255`
- Nothing uncommitted.

## Built today
- **PR #753 (MERGED)** — Search Card 5 (`hell-heaven` belief card): placed the
  user-approved afterlife evidence content into the card's DSS panel.
  - Full body preserved (sourcing audit, witness-by-witness, spatial geography,
    torment zones, deep heavens, suffering mechanics). Duplicated summary blocks
    kept as-is per user review; "Rach" kept as pasted.
  - 7 ASCII diagrams rebuilt as scoped HTML boxes (`c5-` classes, larger readable
    font) with the user's original labels: Pristine Historical Baseline, Total
    Boundary Wall, The Subterranean Separation System, The Valley of Death,
    Chamber 1/2, The Torment Chamber Metric, The Mechanics of Rebellious Torment,
    Separation Criteria, Punitive Metric. No shared `.dbk-` styles touched.
  - Divine-name rule applied: "YHWH your God" -> "YHWH your Creator";
    "will God indeed dwell" -> "will the Creator indeed dwell".
  - `dss.src` for the card cleaned to the primary sources actually cited
    (dropped 1QS IV, 4Q400-407, Nehemiah 9:6).
  - Cache `v254` -> `v255`.
  - Verified before push: `node --check` on inline scripts OK; no niqqud in the
    card region; no rule-28 softening hedges; div balance OK.

## Outstanding / blocking (user to verify or decide)
- **Verify on iPad:** hard-refresh Search, confirm badge/behaviour shows v255 and
  Card 5 renders the new content + boxes.
- **Card 5 `keySrc`** (bottom "Key DSS sources" line) still lists `1QS IV:6-14`
  and `1QH` (excluded scrolls). Awaiting user decision to clean or leave.
- **Search `hardRefresh()` (index.html ~line 2941)** is an unscoped global cache
  wipe — deletes ALL caches on the origin, violating locked Rule 21. Pre-existing;
  flagged, not yet fixed (awaiting approval).

## Pending / parked (belief-card reconciliation project)
- Pile A precise cuts (10 cards: 4,6,7,11,13,14,15,18,20,22) recorded in
  `scratchpad/belief_pileA.json` — NOT yet applied.
- Belief cards 1 & 2 recorded — NOT yet applied.
- Pile B remaining: 8 (End times), 9 (Sabbath), 10 (how to pray), 12 (spiritual
  warfare), 17 (new covenant), 19 (marriage), 21 (Satan/Belial) — one at a time.

## Capability gaps this session
- Cannot reach live `dssorit.github.io` / Pages config from the sandbox — verify
  deploy via user on iPad or via `raw.githubusercontent.com` on `main`.

## Backups
- Pre-change: `backup/2026-07-24-acr-search-v254` @ `32aea72`.
- Post-merge shipped state: `backup/2026-07-24-acr-search-v255` @ `8331fcf`.
- Recovery: `git checkout backup/<name>`.

## Today's commit log
- `8331fcf` Merge pull request #753 (Card 5 afterlife evidence + diagrams)
- `fb45865` Search: Card 5 (hell-heaven) afterlife evidence + diagrams in DSS panel

## Update — PR #754 MERGED (festival corrections, v256)
- Shemini Atzeret: cut Rabbinic "70 nations" midrash -> primary sacrifice count (Bamidbar 29:12-36).
- Sukkot: removed Zekharyah 14 (post-exilic) -> Vayikra 23:39-43 + Bamidbar 29 + 1 Enoch 72:19 solar grid.
- Bikkurim: wave-sheaf wording fixed (Shabbat that FOLLOWS Chag HaMatzot -> 1/26 Sunday).
- Yom Kippur: dropped unverifiable "Ge'ez Orit Zalavit 23:27" citation.
- origin/main HEAD: f51c4e3. Backup: backup/2026-07-24-acr-search-v256 @ f51c4e3.

## In progress — softening (Rule 28) review
- 32 hedge hits found live; walking one at a time. Most are honest notes about
  genuinely uncertain things (place locations, word roots, manuscript dates) or
  are quotes; a few soften a verdict. Currently at item 1/32.
- Also parked: strict pre-Second-Temple pass on post-exilic prophets cited
  elsewhere (Zekharyah 14 in final-days section, Chaggai/Malakhi/Daniyel).
