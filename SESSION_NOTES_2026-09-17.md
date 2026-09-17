# Session Notes — 2026-09-17

## Current state

- Latest commit on `claude/load-words-pwa-setup-nf1pcn`: `8970edf` ("Load
  Words: fix missing iOS splash, re-theme to match ACR Study")
- Branch restarted from `origin/main` after PR #941 merged (per the
  merged-PR rule — same branch name, fresh history from `main`'s tip)
- PR #941: **merged** by DssOrit — https://github.com/DssOrit/ancient-covenant-scrolls/pull/941
- PR #942 open: https://github.com/DssOrit/ancient-covenant-scrolls/pull/942
  — waiting on user review/merge, per Rule 9 (never merged automatically)
- Working tree: clean

## Built today

**Load Words — new PWA added at `/loadwords/` (PR #941, merged)**

- User uploaded a finished "Load Words" PWA package (dyslexia-focused
  vocabulary trainer, 110 words across 5 categories, flashcard spaced
  repetition, 3 test types, Listen Mode) and asked for a review plus
  dyslexia-friendly/innovative suggestions.
- Review found two real issues, fixed before shipping:
  - `service-worker.js`'s `activate` handler did an unscoped cache wipe
    (could have destroyed every other app's offline cache on the shared
    origin — this exact failure already happened once, per `HANDOFF.md` /
    Rule 21). Fixed to match `attain-jr/sw.js`'s prefix-filter pattern.
  - `manifest.json` had `"id": "/"` (absolute) — could collide with another
    installed app's PWA identity. Changed to `"./"`.
- User approved 8 of 9 suggested features (declined "trace mode" only):
  synced word-highlighting during audio, minimal-pair audio contrast,
  tap-to-advance "sound it out" mode, 3-point confidence grading, typed-recall
  test type, tricky letter-cluster highlighting, a gentle daily streak, and
  word-card PNG export.
- Verified structurally and live via headless-browser (Playwright/Chromium)
  before shipping. Backup branch `backup/2026-09-17-acr-v123` created and
  SHA-verified first. PR #941 opened, presented for merge, user merged it
  themselves.
- Confirmed post-merge (Rule 33 — checked the actual merged state, not
  assumed): PR shows `merged: true`, `merged_by: DssOrit`; `loadwords/index.html`
  present on `main` via `raw.githubusercontent.com`.

**Load Words — splash fix + ACR Study re-theme (PR #942, open)**

- User reported no icon/splash after installing and asked for Study's
  font/icon/color style ("setup, colors, etc.").
- Investigated instead of guessing: downloaded and viewed the actual
  committed icon/splash images from `main` — both were real, correctly
  drawn, and present. The icon was never broken (`apple-touch-icon` was
  already wired correctly). The real bug: `assets/splash.jpg` was never
  referenced anywhere in `index.html` — the original package's own README
  said as much ("not wired into the manifest"), which I missed in the first
  review since it read as a content note, not a correctness/security issue.
  Fixed by adding `apple-touch-startup-image`, matching `attain-jr/index.html`'s
  exact pattern, and precaching the asset in the service worker
  (`loadwords-v3`).
- Re-themed to match ACR Study, reading Study's actual design tokens
  read-only (`study/study.css`, `study/index.html`, `study/study.js`'s
  `lbIcon`) — no file inside `/study/` was touched:
  - Heading/UI font switched Lexend -> Inter (matches Study's `--font-ui`);
    Atkinson Hyperlegible body font already shared.
  - Top bar + bottom nav switched to Study's fixed dark navy gradient chrome
    (`#1a1a2e -> #2a2a4e`), independent of the reading-surface theme.
  - Color tokens ported from Study's palette (accent blue `#2563EB`, accent-2
    purple `#7C3AED`, good green `#059669`, warn red `#DC2626`, cream bg
    `#FAF6F0`, white cards, indigo-black text); dark reading theme re-tuned
    to Study's navy dark-mode equivalents.
  - Primary buttons switched to Study's blue-to-purple gradient treatment.
  - Card radius/shadow tightened to Study's 16px/12px + single soft shadow.
  - Icon stroke-width matched to Study's `lbIcon` weight (1.7 vs 2).
  - Category colors + word-list tile palette remapped onto Study's
    vol1-vol8 accent set.
  - `manifest.json` theme/background color and meta theme-color updated to
    match.
- Verified: `node --check` clean on all JS, manifest parses, live headless
  run with screenshots reviewed (Home, Study, Test, Settings) before
  shipping — confirmed the navy chrome, gradient buttons, and Inter
  headings actually render, not just that the CSS was written.
- Per Rule 26: since the day's `acr-v123` backup slot was already used
  (pointing at the pre-Load-Words main tip), created a second, uniquely
  named backup `backup/2026-09-17-loadwords-v2` at the new main tip
  (post-PR-941-merge), SHA-verified before any push.
- PR #942 opened against `main`, presented for merge, waiting on the user.

## Outstanding / blocking

- **PR #942 needs user review and explicit merge instruction.** Files
  changed: 5, all inside `loadwords/` (`index.html`, `app.js`, `wordbank.js`,
  `manifest.json`, `service-worker.js`). Risk: low — same isolated app
  folder, no existing site touched.
- Not verified on an actual iPad Safari in either PR — flagged explicitly
  each time rather than claimed. Splash screen and the new navy chrome
  should be spot-checked on-device once merged.

## Pending / parked

- None from today — all approved work is in PR #941 (merged) and PR #942
  (open).

## Capability gaps in this session

- No iPad/physical device access — PWA install, offline behavior, actual
  splash-screen appearance, and speech-synthesis voice quality could not be
  verified live; verified everything else (structure + headless interaction
  + screenshots) instead and said so plainly rather than claiming full
  verification.
- `dssorit.github.io` (live Pages URL) unreachable from this sandbox per the
  standing network policy; verified deployed state via
  `raw.githubusercontent.com` and the GitHub API instead.

## Backups

- `backup/2026-09-17-acr-v123` at `00a3220` (pre-Load-Words `origin/main`
  HEAD)
- `backup/2026-09-17-loadwords-v2` at `11d6e2a` (post-PR-941-merge
  `origin/main` HEAD, before the splash-fix/re-theme push)

## Today's commit log

```
8970edf Load Words: fix missing iOS splash, re-theme to match ACR Study
5752e79 Add session notes for 2026-09-17
2ee7ca3 Add Load Words PWA: dyslexia-focused vocabulary trainer
```
