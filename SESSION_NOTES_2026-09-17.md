# Session Notes — 2026-09-17

## Current state

- Latest commit on `claude/load-words-pwa-setup-nf1pcn`: `c4d5fdf` ("Load
  Words: remove basic-tier words, add 76 more advanced words, thesaurus")
- Branch restarted from `origin/main` twice today, per the merged-PR rule —
  once after PR #941 merged, once after PR #942 merged. PR #943 stayed open
  through this round, so no third restart was needed — pushed straight onto it.
- PR #941: **merged** — https://github.com/DssOrit/ancient-covenant-scrolls/pull/941
- PR #942: **merged** — https://github.com/DssOrit/ancient-covenant-scrolls/pull/942
- PR #943 open: https://github.com/DssOrit/ancient-covenant-scrolls/pull/943
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
- Verified structurally and live via headless-browser before shipping.
  Backup branch `backup/2026-09-17-acr-v123` created and SHA-verified first.
  PR #941 opened, presented for merge, user merged it.

**Load Words — splash fix + ACR Study re-theme (PR #942, merged)**

- User reported no icon/splash after installing and asked for Study's
  font/icon/color style ("setup, colors, etc.").
- Investigated instead of guessing: the icon was never actually broken
  (already wired via `apple-touch-icon`); the real bug was `assets/splash.jpg`
  never being referenced in `index.html` (the original package's own README
  said as much). Fixed with `apple-touch-startup-image`, matching
  `attain-jr/index.html`'s pattern, precached in the service worker.
- Re-themed to match ACR Study, reading Study's actual design tokens
  read-only (`study/study.css`, `study/index.html`, `study/study.js`) — no
  file inside `/study/` touched: Inter for headings (Atkinson Hyperlegible
  body font already shared), fixed dark-navy-gradient top/bottom nav chrome,
  Study's exact color tokens (blue `#2563EB`, purple `#7C3AED`, green
  `#059669`, red `#DC2626`, cream `#FAF6F0`), gradient primary buttons,
  16px/12px radius + single soft shadow, 1.7 icon stroke-width, category
  colors remapped to Study's palette.
- **Mid-review correction**: user then shared two actual iPad screenshots of
  ACR Study's activity grid and said "I like the tabs" / "fonts, colors,
  layout, icons, etc." — the real design language Study uses for its
  activity cards is a dark navy tile (`#1a1a2e`, fixed regardless of theme)
  with a 2px colored border and matching icon/label color, confirmed by
  reading `study.js`'s `actCard()`/`lbIcon()` functions directly rather than
  inferring from CSS alone. The first re-theme pass had used a white card
  with a soft pastel icon badge instead — corrected by porting the actual
  dark-tile pattern onto Home's 4 actions, the Test type picker, and Word
  Detail's utility buttons, each given its own distinct border/icon/label
  color via a `--c` custom property.
- Verified with headless-browser screenshots at each step, compared side by
  side against the user's own reference images before shipping.
- Backup `backup/2026-09-17-loadwords-v2` created and SHA-verified before
  the first push in this round. PR #942 opened, corrected via a follow-up
  commit on the same still-open PR, then merged by the user.

**Load Words — 133 new advanced words, new "Super Advanced" category (PR #943, open)**

- User said the word bank was too basic for an "advanced vocabulary" app and
  shared five rounds of Instagram vocabulary infographics (C2/IELTS Band 9
  word lists, "Elite L Words," confusing-word pairs) as the level to target.
- Pulled the actual current word list from the repo first (243... then 110
  words at the time) to dedupe against, rather than guessing what was
  already there.
- Added 98 new C2-level words (new "sa"/"Super Advanced" category) and 35
  new Confusing Pairs entries (17 pairs plus a 3-way accept/except/expect
  group), each with full syllables/stress/definition/example/conversation,
  matching the existing schema exactly, with `related` ids wired the same
  way the original 30 pairs were.
- Wrote definitions directly rather than copying the source infographics
  verbatim — a couple of the source images had internal errors (e.g.
  "conducive" and "dormant" sharing an identical, wrong-for-conducive
  definition), so accurate ones were written instead of propagating the
  error, per the source-verification standard (don't trust a source's
  self-description without checking).
- Verified programmatically (243 total words, zero duplicate ids/words,
  every `related` reference resolves) and live via headless-browser
  (category chip renders, filtering to "Super Advanced" shows exactly 98
  words, opened `labyrinthine` and the 3-way `except` pair and confirmed
  both render correctly) before shipping. Cache bumped to `loadwords-v4`.
  README's stale word count and "splash not wired" note corrected.
- Branch restarted from `origin/main` again (PR #942 had merged), new
  backup `backup/2026-09-17-loadwords-v3` created and SHA-verified. PR #943
  opened, presented for merge.

**Load Words — remove basic words, 76 more advanced words, thesaurus feature (pushed onto open PR #943)**

- Before user merged PR #943, they sent five more rounds of vocabulary
  infographics and three explicit instructions: find more words at this
  advanced level, remove the basic words from the site, and add a
  thesaurus option for every word.
- Pulled the exact current 243-word list from the repo first (not memory)
  to dedupe the new batch against.
- **Removed** the 10 literal basic-tier words from Upgrade Ladders (help,
  buy, ask, show, start, think, try, fast, happy, old) via script, keeping
  the intermediate/advanced rungs; reworded their notes since several
  referenced the now-deleted basic word by name ("Mid-level upgrade of
  'help'" -> "A more formal way to offer help").
- **Added 76 more words** (36 Super Advanced, 40 Advanced) from the new
  infographics — e.g. byzantine, contumacious, grandiloquent, quixotic,
  vituperative, zeitgeist, hubris, meticulous, discrepancy. Skipped
  anything illegible in the low-resolution images (a couple of -phile/
  -phobia coinages) rather than guessing at an OCR read, per the
  never-fabricate-content standard.
- **Added a thesaurus.** Every one of the 309 words now has a `syn` field
  (2 synonyms) — wrote all 233 for the pre-existing words directly, the 76
  new ones got synonyms authored alongside their definitions. Built a new
  "Thesaurus" block on every word card: a synonym chip that exactly
  matches another word already in the bank is clickable and jumps to that
  word's page (verified this actually navigates, not just that it
  renders); a synonym with no match in the bank renders as plain text.
- Verified programmatically (309 words, zero duplicate ids/words, every
  `related` and thesaurus link resolves) and live via headless-browser
  (home shows "309", Upgrade Ladders list no longer contains "help",
  clicking a live thesaurus chip on "eloquent" actually navigated to
  "articulate") before pushing. Cache bumped to `loadwords-v5`.
- PR #943 was still open (not yet merged) when this round finished, so no
  new branch restart or backup was needed — pushed straight onto it as an
  additional commit.

## Outstanding / blocking

- **PR #943 needs user review and explicit merge instruction** (now
  carries three commits: the 133-word addition, plus this round's
  basic-word removal / 76-word addition / thesaurus feature). Files
  changed: 5, all inside `loadwords/`. Risk: low — content and one UI
  feature, no other site touched.
- Not verified on an actual iPad Safari across any of today's PRs —
  flagged explicitly each time rather than claimed. Splash screen, the
  navy chrome, the new word count, and the thesaurus links should be
  spot-checked on-device.

## Pending / parked

- None from today — all approved work is in PR #941 (merged), PR #942
  (merged), and PR #943 (open).

## Capability gaps in this session

- No iPad/physical device access — PWA install, offline behavior, actual
  splash-screen appearance, and speech-synthesis voice quality could not be
  verified live; verified everything else (structure + headless interaction
  + screenshots, compared directly against the user's own iPad screenshots
  where given) instead and said so plainly rather than claiming full
  verification.
- `dssorit.github.io` (live Pages URL) and `instagram.com` unreachable from
  this sandbox per the standing network policy; verified deployed repo state
  via `raw.githubusercontent.com` and the GitHub API, and worked from the
  user's own screenshots for the infographic content instead.

## Backups

- `backup/2026-09-17-acr-v123` at `00a3220` (pre-Load-Words `origin/main`
  HEAD)
- `backup/2026-09-17-loadwords-v2` at `11d6e2a` (post-PR-941-merge
  `origin/main` HEAD)
- `backup/2026-09-17-loadwords-v3` at `5fa1fe5` (post-PR-942-merge
  `origin/main` HEAD, before the vocabulary-expansion push)

## Today's commit log

```
c4d5fdf Load Words: remove basic-tier words, add 76 more advanced words, thesaurus
d89a515 Load Words: add 133 advanced words, new Super Advanced category
f16d944 Load Words: dark activity-tile cards matching ACR Study's grid
8970edf Load Words: fix missing iOS splash, re-theme to match ACR Study
5752e79 Add session notes for 2026-09-17
2ee7ca3 Add Load Words PWA: dyslexia-focused vocabulary trainer
```
