# Session Notes — 2026-09-17

## Current state

- Branch restarted from `origin/main` five times today, per the merged-PR
  rule — after PR #941 merged, after PR #942 merged, after PR #943 merged,
  after PR #945 merged, and after PR #946 merged.
- PR #941: **merged** — https://github.com/DssOrit/ancient-covenant-scrolls/pull/941
- PR #942: **merged** — https://github.com/DssOrit/ancient-covenant-scrolls/pull/942
- PR #943: **merged** — https://github.com/DssOrit/ancient-covenant-scrolls/pull/943
  (4 commits: the 133-word addition, then the basic-word-removal /
  76-word addition / thesaurus round pushed onto the same open PR)
- PR #944: **merged** — https://github.com/DssOrit/ancient-covenant-scrolls/pull/944
  (4 commits: session-notes confirmation of #943, the scoped hard-refresh
  button, and the boot-intro/splash sequence, all pushed onto the same
  open PR)
- PR #945: **merged** — https://github.com/DssOrit/ancient-covenant-scrolls/pull/945
  (3 commits: session-notes confirmation of #944, the stuck-boot-splash
  fix, and the Confusing-Pairs/Upgrade-Ladders trim). Confirmed via API:
  `merged: true`, `merged_by: DssOrit`, head SHA `b9fbf19` matching what
  was pushed.
- PR #946: **merged** — https://github.com/DssOrit/ancient-covenant-scrolls/pull/946
  (2 commits: the 63-word C1/C2 replacement batch, then theme tagging +
  31 more words + the Context Quiz test mode). Confirmed via API:
  `merged: true`, `merged_by: DssOrit`, head SHA `d51627b` matching what
  was pushed.
- PR #947: **open, awaiting user merge** — https://github.com/DssOrit/ancient-covenant-scrolls/pull/947
  (1 commit: 156 more words to reach exactly 500 total, plus the new
  Daily Upgrade scenario quiz)
- Latest commit on the branch: `ee6716c` — "Load Words: reach 500 words,
  add Daily Upgrade scenario quiz". Pushed, not yet merged.
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
  matching those specific sources. User clarified the goal instead:
  cultivating an elevated lexicon / grandiloquence for speaking style —
  CEFR C1/C2-level lexical items — which the already-drafted batch
  matched, so it shipped as-is (see next entry).

**Load Words — 63 C1/C2 replacement words (PR #946, open)**

- Drafted 59 CEFR C1/C2-tier words (abstemious, acrimony, aggrandize,
  cogent, complacent, conciliatory, debacle, denigrate, dissemble,
  dogmatic, ebullient, effete, etc.) as replacements for the content
  trimmed above.
- User then pasted a themed vocabulary breakdown (Intellectual & Mental
  States / Character & Personal Behavior / Emotions & Human Experience /
  Analytical & Academic Concepts) and asked to check it against the
  site. Checked programmatically rather than assuming: 18 of 19 named
  words already existed in the bank; only `despondent` was missing.
  Added it, plus `evanescent`, `efficacy`, `disparity`, `causality` from
  an earlier reference list, after confirming those four were genuinely
  absent.
- Verified programmatically (313 total words at that point, zero
  duplicate ids/words, zero missing/invalid fields) and live via
  headless Chromium (`CORE_WORDS.length` reads 313, `evanescent` entry
  resolves, no console errors) before shipping. Cache bumped to
  `loadwords-v10`. Backup `backup/2026-09-17-loadwords-v9` created and
  SHA-verified at `0dd3ba1` (post-PR-#945-merge `origin/main` HEAD)
  before pushing, since PR #945 had merged in the meantime. PR #946
  opened, presented for merge.

**Load Words — theme tagging, 31 more scholarly words, Context Quiz test mode (pushed onto open PR #946)**

- User asked whether the app groups words thematically (e.g.
  "Intellectual & Mental States," "Emotions & Human Experience") like a
  reference breakdown they shared. Checked directly rather than assumed:
  confirmed the app only had difficulty-tier categories, no thematic
  field existed anywhere in the data model. User approved adding real
  theme tagging + a filter.
- User then shared two screenshots of a Google Gemini vocabulary quiz
  (sentence-with-blank, 4 lettered options, green/red highlight with an
  inline explanation per answer, a collapsible hint, a segmented
  progress bar) and asked for "quizzes like this" as a new Test mode.
- User separately relayed two more vocabulary lists from another AI
  session ("words not present anywhere in your screenshots" /
  "ultra-high-tier" academic terms) and asked to add any not already on
  the site, plus make them explorable via the new quiz.
- **Theme tagging**: classified all 313 existing words (at the time)
  into 7 themes — Intellectual & Mental States, Character & Personal
  Behavior, Emotions & Human Experience, Analytical & Academic Concepts,
  Communication & Rhetoric, Conflict & Social Dynamics, and Usage &
  Precision (for the Confusing Pairs / Upgrade Ladders categories, which
  are about correct usage rather than a concept) — added a `theme` field
  to every entry plus a `THEME_META` block, and a "Browse by theme"
  chip-row on Home and the All Words list (reusing the existing
  category-filter click-handling via a `th:` prefix on `State.listFilter`,
  no new event wiring needed).
- **New scholarly words**: checked the two relayed vocabulary lists
  against the current bank programmatically before adding anything:
  8 of the first list's 20 words and 1 of the second list's 19 were
  already present (capricious, ostentatious, venerable, quintessential,
  juxtaposition, obfuscate, vicissitude, etc.), so those were skipped.
  Also skipped two items as not fit for this app's format rather than
  adding them uncritically: `sub specie aeternitatis` (a multi-word Latin
  phrase, not a single lexical item the syllable/pronunciation schema
  can represent) and `apallage` (could not verify this as a real
  English/rhetorical term — the description given matches the
  well-documented term "enallage," not "apallage," so it was left out as
  likely a garbled or fabricated term rather than silently included).
  Added the remaining 31 words (epistemology, solipsism, acumen,
  esoteric, hermeneutics, synecdoche, sesquipedalian, weltanschauung,
  quiddity, heuristic, etc.), each with an original definition/example/
  conversation pair and a theme tag, since these are well-established
  dictionary words I could define accurately without needing external
  verification.
- **Context Quiz test mode**: built as a fully generic engine (not
  hand-authored per word) so it works across the whole bank automatically
  — blanks the word out of its own `example` sentence, picks 3 distractor
  options (preferring same part-of-speech, excluding `related` pairs),
  shows lettered A–D options, and after answering shows an inline
  explanation under the correct option (always) and the chosen option
  (if wrong) built from each option's own `definition` field — plus a
  collapsible native `<details>` hint using the target word's definition.
  Wired into the existing Test flow's grading/scoring, no changes to the
  other four test types.
- Verified live via headless Chromium: clicked into a real Context Quiz
  question, confirmed 4 lettered options render, confirmed the hint text
  matches the word's definition, answered correctly and confirmed one
  green explanation appears, advanced and answered incorrectly and
  confirmed both a red explanation (chosen) and green explanation
  (correct) appear together, and confirmed the theme filter on the All
  Words list returns exactly the words tagged with that theme (42 for
  "Intellectual & Mental States," matching a direct count of the data).
  Zero console/page errors. Cache bumped to `loadwords-v11`.
- Bank now totals 344 words (cp:16, up:10, ad:60, ce:15, li:15, sa:228),
  all tagged with one of 7 themes.

**Load Words — 500 words total, Daily Upgrade scenario quiz (PR #947, open)**

- User asked for the bank to reach exactly 500 CEFR C1/C2 words, and
  described the same four vocabulary categories (low-frequency, high-level
  synonyms, literary/aesthetic, analytical/abstract) as the target.
- Compiled 238 candidate C1/C2 words, checked programmatically against
  the current 344-word bank (zero collisions), and took the first 156
  to land on exactly 500. Wrote full entries (definition, example,
  conversation, syllables/stress, theme, synonyms) for each rather than
  reusing generic content.
- User separately shared a screenshot of a quiz question and asked to
  add `historicism` and `presupposition`. Added both — genuine C1/C2
  academic terms. Declined to add three other words from the same
  message (`philosopher`, `epoch` — too common for this bank's
  advanced-only standard; `unarticulated` — redundant with the existing
  `articulate` entry) and said so rather than adding them silently.
- User then described a second, easier quiz style: a "Context-Matching
  & Scenario-Based Quiz" that drops a word into a relatable daily
  situation (a messy roommate, a blunt friend) with a "casual thought"
  and an "advanced upgrade" phrasing, and gave 4 worked examples.
- Built this as a new **Daily Upgrade** test mode, backed by a new
  hand-curated `SCENARIOS` array (24 entries: id, wordId, situation,
  casual, upgrade) rather than trying to auto-generate scenario prose
  for all 500 words, which would need real authored content per entry.
  Reused the user's 4 given examples (byzantine, taciturn, meticulous,
  ephemeral) plus 20 more drawn from existing relatable-register words
  in the bank (cantankerous, pragmatic, candid, nonchalant, gregarious,
  laconic, apathetic, resilient, articulate, prudent, garrulous,
  frivolous, diligent, haughty, affable, banal, mundane, insipid,
  malleable, and others).
- Same 4-option multiple-choice mechanic as the existing Context Quiz,
  reusing its click-handler and grading logic (extended, not
  duplicated) — after answering, the correct option shows the
  scenario's own authored "upgrade" sentence rather than a bare
  definition, matching the reference format's flavor more closely.
- Verified programmatically (exactly 500 total words, zero duplicate
  ids/words, zero missing/invalid fields, every `SCENARIOS.wordId`
  resolves to a real word) and live via headless Chromium (opened the
  Daily Upgrade quiz, confirmed the situation/casual-thought prompt and
  4 options render, answered correctly and confirmed the authored
  upgrade sentence appears, answered incorrectly on the next question
  and confirmed both explanations appear together, screenshot compared
  against the reference layout). Zero console/page errors. Cache
  bumped to `loadwords-v12`.
- Bank now totals exactly 500 words (cp:16, up:10, ad:60, ce:15, li:15,
  sa:384). Branch restarted from `origin/main` again (PR #946 had
  merged), new backup `backup/2026-09-17-loadwords-v11` created and
  SHA-verified. PR #947 opened, presented for merge.

## Outstanding / blocking

- **PR #947 is open, not yet merged** — contains the 156-word batch that
  brings the bank to exactly 500 words, plus the new Daily Upgrade
  scenario quiz. Presented to the user; awaiting explicit merge
  instruction per Rule 9.
- Separate from Load Words: **ACR Search's own hard-refresh button is
  unscoped** (a pre-existing bug, not something touched today) — flagged
  for the user's awareness and decision; fixing it would need the
  "edit ACR Search" unlock phrase per Rule 8.
- Not verified on an actual iPad Safari across any of today's PRs —
  flagged explicitly each time rather than claimed. The boot-intro/splash
  timing, the navy chrome, the word count, audio/TTS output, the
  thesaurus links, the theme filter, and both new quiz modes (Context
  Quiz, Daily Upgrade) should be spot-checked on-device.

## Pending / parked

- The Daily Upgrade scenario quiz currently draws from a hand-curated
  set of 24 scenarios (`SCENARIOS` in `wordbank.js`), not all 500 words
  — expanding that set is a slower, manual authoring process (each
  needs a real situation + casual phrasing + upgrade sentence) distinct
  from the Context Quiz's auto-generated approach. Parked as a known
  scope limit, not an oversight — flagged in the PR body.
- Otherwise none from today's approved work — everything requested has
  shipped to PR #947, awaiting the user's merge decision.

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
(pending) Load Words: reach 500 words, add Daily Upgrade scenario quiz
6b8cadf Merge pull request #946 from claude/load-words-pwa-setup-nf1pcn
d51627b Load Words: theme tagging, 31 more scholarly words, Context Quiz mode
929303c Load Words: add 63 C1/C2 words to replace the trimmed content
0dd3ba1 Merge pull request #945 from claude/load-words-pwa-setup-nf1pcn
b9fbf19 Update session notes: stuck-splash fix, word-bank trim, PR #945 status
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
