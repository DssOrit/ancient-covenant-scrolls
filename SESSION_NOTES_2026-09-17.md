# Session Notes — 2026-09-17

## Current state

- Branch restarted from `origin/main` three times today, per the merged-PR
  rule — after PR #941 merged, after PR #942 merged, and after PR #943
  merged.
- PR #941: **merged** — https://github.com/DssOrit/ancient-covenant-scrolls/pull/941
- PR #942: **merged** — https://github.com/DssOrit/ancient-covenant-scrolls/pull/942
- PR #943: **merged** — https://github.com/DssOrit/ancient-covenant-scrolls/pull/943
  (4 commits: the 133-word addition, then the basic-word-removal /
  76-word addition / thesaurus round pushed onto the same open PR)
- PR #944: **merged** — https://github.com/DssOrit/ancient-covenant-scrolls/pull/944
  (4 commits: session-notes confirmation of #943, the scoped hard-refresh
  button, and the boot-intro/splash sequence, all pushed onto the same
  open PR)
- PR #945: **open, awaiting user merge** — https://github.com/DssOrit/ancient-covenant-scrolls/pull/945
  (3 commits so far: session-notes confirmation of #944, the stuck-boot-
  splash fix, and this round's Confusing-Pairs/Upgrade-Ladders trim)
- Confirmed post-merge (Rule 33 — checked the actual state, not assumed):
  PR #944 shows `merged: true`, `merged_by: DssOrit`; `main`'s
  `loadwords/index.html` contains the `boot-intro` markup and
  `loadwords/service-worker.js` shows `CACHE_NAME = 'loadwords-v7'` via
  `raw.githubusercontent.com`.
- Latest commit on the branch: `6ca264c` — "Load Words: trim Confusing
  Pairs and Upgrade Ladders to advanced-only". Pushed, not yet merged.
- Working tree: clean (this commit is pushed)

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
  additional commit. PR #943 later merged (confirmed via API + 309-word
  count check on `main`); a small follow-up PR #944 was opened just to log
  that confirmation in these notes.

**Load Words — scoped hard-refresh button (pushed onto open PR #944)**

- User asked for a refresh button like ACR Search and other sites have,
  explicitly requiring it stay scoped to Load Words only.
- Read ACR Search's actual `hardRefresh()` implementation before copying
  it, and found it does NOT follow Rule 21 — it calls `caches.keys()` and
  deletes every result with no prefix filter, the exact global-wipe
  pattern that already took down ACR Reader's cache once (documented in
  this same file, "maps/index.html" incident). Did not copy it, and did
  not touch Search itself (would need its own unlock phrase) — flagged
  this finding to the user instead of silently fixing or silently
  ignoring it.
- Built Load Words' own `hardRefresh()` from HANDOFF.md's "Standard Scoped
  Hard Refresh Template" instead: filters `caches.keys()` to the
  `loadwords-` prefix and `getRegistrations()` to the `/loadwords/` scope
  before touching anything. Added a gold refresh icon button to the top
  bar (matching the repo-wide `#C8971F` hard-refresh color convention).
- Added Load Words to HANDOFF.md's per-app cache-prefix/SW-scope
  reference table.
- Verified live, not just read: seeded four simulated caches on the page
  (`loadwords-v6`, plus `acr-`, `attain-jr-`, `load-` standing in for
  other apps), called the function, and confirmed only the `loadwords-`
  one was deleted while the other three survived untouched. Also clicked
  the actual button in the UI and confirmed it triggers a real page
  reload. Cache bumped to `loadwords-v6`.

**Load Words — boot-intro + full splash screen (pushed onto open PR #944)**

- User reported the app "isn't opening to a large splash page like the
  other Load sites" and pointed at Load Maps as the reference.
- Read Load Maps' actual boot sequence (`loadmaps/index.html` +
  `loadmaps/app.js`) instead of guessing: a two-stage sequence — a brief
  branded `#boot-intro` overlay (icon + gradient wordmark + animated
  loading bar, ~1.7s), then a full-screen `#splash` overlay showing the
  brand splash artwork (~2.5s more, or dismissed early on tap), then both
  fade to reveal the app underneath. This is separate from the native iOS
  `apple-touch-startup-image` mechanism wired up earlier today — that one
  only fires for an installed home-screen app and Apple doesn't reliably
  honor it; this in-app sequence shows every time, in any browser tab.
- Ported the same two-stage pattern into Load Words, in its own navy/
  blue/purple colors, reusing the `assets/splash.jpg` art already in the
  repo (previously only linked to the iOS-only mechanism).
- Verified live: screenshotted all three stages on a timer (intro visible
  at t=0, splash visible at t=1.8s once the intro faded, app revealed at
  t~4.4s once the splash faded) and confirmed the timed class
  transitions actually fire, not just that the CSS was written. Sent the
  intro and splash screenshots to the user. Cache bumped to `loadwords-v7`.

**Load Words — fix app permanently stuck on boot splash (pushed onto open PR #945)**

- User sent a live iPad screenshot showing the app frozen on the
  `#boot-intro` loading bar, and separately reported "no audio" and asked
  whether the scoped refresh button was in place.
- Root cause: the code that removes the `#boot-intro`/`#splash` overlay
  classes lived entirely inside `app.js`, loaded cache-first by the
  service worker. With five cache-version bumps shipped in one day
  (v941 through v945), a slow/blocked/stale `app.js` load meant the
  reveal logic never ran and the user was stuck forever with no way out
  (the in-app refresh button is itself rendered by the never-executing
  app.js).
- Fixed with two independent layers: (1) `service-worker.js` now serves
  `app.js`/`wordbank.js` network-first instead of cache-first, so a
  fresh cache-version bump is never masked by a stale script; (2) an
  inline safety-net `<script>` in `index.html`, independent of app.js,
  force-removes both overlay classes after 10 seconds no matter what.
- Verified by reproducing the actual failure, not just reading the fix:
  used Playwright to abort every `app.js` network request, confirmed the
  boot-intro was still stuck at t=500ms, then confirmed the safety net
  fired and both overlays cleared by t~11s. Also confirmed a normal,
  unblocked load still completes on its regular ~4.6s schedule,
  unaffected by the new safety net. Cache bumped to `loadwords-v8`.
- Audio (TTS) and the scoped refresh button could not be independently
  re-verified on the user's actual device from this sandbox — flagged
  explicitly rather than claimed working.

**Load Words — trim Confusing Pairs and Upgrade Ladders to advanced-only (pushed onto open PR #945)**

- User pushed back again with a live screenshot (Listen Mode, the word
  "site" tagged CASUAL/CONFUSING PAIRS) and said "Only ultra advanced
  words."
- Used `AskUserQuestion` before deleting anything, since removing whole
  category content is a bigger decision than adding words: confirmed
  "keep Confusing Pairs but only the harder pairs" and "keep only the
  advanced half of Upgrade Ladders."
- Removed 49 of 65 Confusing Pairs entries (capital/capitol, site/cite/
  sight, dear/deer, dairy/diary, aisle/isle, etc. — the plainly everyday
  ones) and 10 of 20 Upgrade Ladders entries (assist, purchase, begin,
  inquire, display, believe, attempt, quick, glad, aged). Kept 8 pairs
  (climactic/climatic, elicit/illicit, eminent/imminent, allusion/
  illusion, dependant/dependent, envelope/envelop, economic/economical,
  emigrate/immigrate) and 10 advanced Upgrade Ladders words (facilitate,
  procure, interrogate, demonstrate, commence, contemplate, endeavor,
  rapid, delighted, elderly).
- Fixed 5 dangling text references in surviving Upgrade Ladders entries
  that mentioned now-deleted sibling words by name (e.g. commence's
  synonym list referenced "begin," now removed).
- Verified programmatically (250 total words, zero duplicate ids, exact
  per-category counts `{cp:16, up:10, ad:60, ce:15, li:15, sa:134}`, no
  dangling `related` references) and live via headless-browser (app
  still boots and renders, Study mode opens, `CORE_WORDS.length` reads
  250 in the live page) before shipping. Cache bumped to `loadwords-v9`.
- User then asked to replace the 59 removed words with new scholarly
  words. Asked whether those replacements should come from the user's
  earlier Instagram vocabulary infographic screenshots — those images
  aren't retrievable from this session's earlier (now-summarized)
  context, only their text descriptions carried forward — rather than
  silently drafting a batch from general knowledge and presenting it as
  matching those specific sources. Awaiting the user's answer before
  writing any replacement words.

## Outstanding / blocking

- **Awaiting user decision**: whether the ~59 replacement words (for the
  trimmed Confusing Pairs/Upgrade Ladders content) should be drawn from
  the user's earlier Instagram infographic screenshots (would need
  re-sharing, since the images aren't retrievable from this session's
  compacted context) or drafted fresh. Nothing written for this yet.
- **PR #945 is open, not yet merged** — contains the session-notes
  confirmation of #944, the stuck-splash fix, and this round's word-bank
  trim. Presented to the user; awaiting explicit merge instruction per
  Rule 9.
- Separate from Load Words: **ACR Search's own hard-refresh button is
  unscoped** (a pre-existing bug, not something touched today) — flagged
  for the user's awareness and decision; fixing it would need the
  "edit ACR Search" unlock phrase per Rule 8.
- Not verified on an actual iPad Safari across any of today's PRs —
  flagged explicitly each time rather than claimed. The boot-intro/splash
  timing, the navy chrome, the trimmed word count, audio/TTS output, and
  the thesaurus links should be spot-checked on-device.

## Pending / parked

- Replacement words for the 59 trimmed from Confusing Pairs/Upgrade
  Ladders — parked pending the user's answer on sourcing (see
  Outstanding above).

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
6ca264c Load Words: trim Confusing Pairs and Upgrade Ladders to advanced-only
6886db4 Load Words: fix app getting permanently stuck on the boot splash
dab9fbe Update session notes: PR #944 merged
d1c1e74 Load Words: add boot-intro + full splash screen like other Load apps
aae2f1a Update session notes: scoped hard-refresh button, ACR Search finding
67a5ddb Load Words: add scoped hard-refresh button
c3339f0 Update session notes: PR #943 merged
12a4ddc Update session notes for 2026-09-17
c4d5fdf Load Words: remove basic-tier words, add 76 more advanced words, thesaurus
d89a515 Load Words: add 133 advanced words, new Super Advanced category
f16d944 Load Words: dark activity-tile cards matching ACR Study's grid
8970edf Load Words: fix missing iOS splash, re-theme to match ACR Study
5752e79 Add session notes for 2026-09-17
2ee7ca3 Add Load Words PWA: dyslexia-focused vocabulary trainer
```
