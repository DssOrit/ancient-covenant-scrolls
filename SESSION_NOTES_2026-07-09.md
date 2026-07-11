# Session Notes — 2026-07-09

## Current state (end of session)

- Latest main tip: `2f9401c` — PR #598 (ACR2 + Solar service-worker redirect fix).
- Working tree: clean. Everything shipped is merged and live.
- Live cache markers: ACR Study `acr-study-v109`, Great Eraser `great-eraser-v15`,
  Great Eraser Study `gestudy-v14`, Search `acr-search-v140`, WSA `wsa-v7`,
  ACR2 `acr2-v17`, Solar `acr-solar-v21`.
- (Earlier-in-session content work — restored verses/quizzes, Sharks fix, and the
  divine-name pass — is logged in `SESSION_NOTES_2026-07-08.md`.)

## Built today (chronological, all merged)

1. **PR #594** — Great Eraser Study: university-level verses + quizzes for every
   chapter (140 -> 183/183 covered), Volume 9 (Sharks) id-collision bug fixed
   (re-keyed to `v9_` ids), divine-name normalization across both study apps.
   Cache `gestudy-v11`.
2. **Divine-name rule LOCKED** in `CLAUDE.md` as rule 18: only YHWH and Creator /
   the Creator; keep-list (documentation of the substitution, pagan deities,
   "sons of God" council phrase, DSS title-phrases, Christian constructs, book
   titles) is part of the rule. Scripture appositive rendered as "YHWH your
   Creator" / "the Creator of Abraham" (user's call).
3. **PR #595** — Great Eraser Study: 13 per-chapter games + **Truth Uncovered**
   game-show hub (Evidence Board = Family Feud, The Eraser's Offer = Deal or No
   Deal, 1-4 teams, TV stage toggle). Renamed hub to Truth Uncovered and stripped
   outside product names from the UI. Cache `gestudy-v13`.
4. **PR #596** — Fix Great Eraser Study PWA "Response served by service worker has
   redirections": worker now strips redirects (rebuild as plain 200) and is
   network-first for the shell. Cache `gestudy-v14`. **Root cause:** the
   `_redirects` file 301-normalises bare paths; the naive cache-first worker
   returned/cached that redirect, which iOS refuses for a navigation.
   **User recovery step that mattered:** Settings -> Safari -> Website Data ->
   remove `acrscrolls.com` (deleting the home-screen icon does NOT clear the SW).
   User confirmed the app opened after this.
5. **PR #597** — (a) same redirect fix hardened into GreatE (`v15`), Search
   (`v140`), WSA (`v7`); (b) **ACR Study Truth Uncovered** game show (Evidence
   Board from each book's key_terms with definitions revealed; Sealed Scrolls =
   Deal or No Deal with "the Scribe"; teams; TV stage). ACR Study cache
   `acr-study-v109`. Built in ES5 with data-attribute delegation (the app uses no
   inline handlers). Grounded in each book's curated `key_terms` / `fill_blank`.
6. **PR #598** — same SW redirect fix for **ACR2** (`v17`) and **Solar** (`v21`),
   SW-file-only, authorized with the exact unlock phrases ("fix ACR2" / "fix
   Solar"). ACR Reader not touched.

## Outstanding / to verify on device

- Confirm the new game shows and the redirect fixes on iPad Safari (cache-busted).
  If any app shows a stale version, clear Website Data for `acrscrolls.com` and
  reload in Safari.

## Pending / parked

- **Truth Uncovered Stage 2 — phones-as-buzzers multiplayer** (deferred by user,
  logged in `SUGGESTIONS_PARKED.md`). Design is free-tier only: Cloudflare Pages
  Function + capped, auto-expiring D1 rooms, light polling, no Durable Objects,
  no paid storage. DO NOT build until the user asks.
- ACR Reader (root) worker left as-is per user ("ACR reader is fine").
- The network-first Load/attain family shares only a theoretical redirect
  exposure; not hardened (low priority).

## Capability gaps this session

- Cannot reach the live site (`acrscrolls.com` / `dssorit.github.io`) from the
  sandbox; verified builds in headless Chromium over a local http server instead.
- iOS-specific SW behavior (the redirect error, Website-Data clearing) can only be
  confirmed by the user on device.

## Backups (recovery: `git checkout <branch>`)

- `backup/2026-07-09-sw-hardening` @ `2f9401c` (ACR2 + Solar SW fix; current main)
- `backup/2026-07-09-acr-study-tu` @ `18423ca` (ACR Study Truth Uncovered)
- `backup/2026-07-09-gestudy-v14` @ `d15fa55` (Study PWA redirect fix)
- `backup/2026-07-08-ge-v14` @ `1631c3f` (verses/quizzes + divine name)

## Today's commit log (merges)

```
2f9401c ACR2 + Solar SW redirect fix (#598)
18423ca GreatE/Search/WSA SW hardening + ACR Study Truth Uncovered (#597)
d15fa55 Great Eraser Study PWA redirect fix, gestudy-v14 (#596)
21d67fc Great Eraser Study: 13 games + Truth Uncovered (#595)
1631c3f Study verses/quizzes + Sharks fix + divine-name rule (#594)
```
