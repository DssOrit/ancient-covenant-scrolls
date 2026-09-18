# Session Notes — 2026-09-18

## Current state

- Branch: `claude/load-words-pwa-setup-nf1pcn`.
- **PR #954 is MERGED** (2026-09-18T03:17:31Z) — Vocab Feud, Stack & Match, Word Blocks, Story Quest, plus the carried-over Imposter/Thread-Link Board.
- **PR #955 is MERGED** (2026-09-18T04:43:16Z) — session notes only.
- **PR #956 is MERGED** (2026-09-18T07:35:53Z, confirmed via `pull_request_read`) — 6 commits: Word Vault, the `ad`-tier rebuild + Philosophical tier, Debate & Meeting Arena, the Deal-or-No-Deal/Feud visual upgrades, and Grammar Coach. (The PR's own title/description only describe the first commit, Word Vault — later commits were pushed to the same open PR without updating its description; this note corrects that gap.)
- **PR #957 is MERGED** (2026-09-18T07:45:51Z, confirmed via `pull_request_read`) — a separate PR opened after #956 merged: Word Mystery (Clue-style deduction game) plus scene illustrations for Story Quest/Debate/Mystery.
- **PR #958 is MERGED** — the word-bank second pass (19 removed, 5 reclassified, 33 added — bank now 541 words) and 5 game banner illustrations (Word Mystery, Vocab Feud, Deal or No Deal, Word Blocks, The Imposter) cropped via CSS `object-position` so no trademarked logos/wordmarks from the user-supplied image pack are ever shown.
- **PR #959 is MERGED** (2026-09-18T08:20:30Z, confirmed via `pull_request_read`) — Weekly Word Master: a Home-screen banner that picks one word a week (weighted toward words missed most in Study/Test) and walks through 4 mastery stages (spelling, definition, use in a sentence, function).
- Working tree: clean.
- `APP_VERSION` / `CACHE_NAME`: `v34` / `loadwords-v34` — live on `main`.
- `origin/main` HEAD: `21b354d7cfc7b6a630834b49e95fcbf06841bfbb`.

## Backups

- `backup/2026-09-18-loadwords-v24` — pushed, SHA-verified equal to `origin/main` (`1d60779`) after the PR #954/#955 merges.
- `backup/2026-09-18-loadwords-v34` — pushed, SHA-verified equal to `origin/main` (`21b354d`) right after PR #959 (Weekly Word Master) merged — this is the current recovery point. Recovery: `git checkout backup/2026-09-18-loadwords-v34`.

## Built today

Continuing a long-running "advanced vocabulary games" build (user pasted a series of AI-generated game concepts and asked for each to be implemented). This completes the full game-concept queue from that batch of requests. Shipped this session, in order:

1. **Vocab Feud** — a random theme becomes the round's "survey topic"; 6 words from that theme fill a board ranked by `wordPointValue()`, mixed into a shuffled chip pool with 4 distractors from other themes. Tap a chip that belongs to reveal it and score; 3 wrong taps ends the round.
2. **Stack & Match** — an untimed Columns/Connect-Four-style game (the "Word Tetris" concept, adapted to be tap-to-drop with no falling-block timer so it doesn't conflict with the app's untimed/low-pressure design principle). 6 word/definition pairs become 12 blocks in a queue; tap a column to drop the next block. A word landing adjacent to its matching definition clears both and scores.
3. **Word Blocks** — the block-puzzle spelling game, built entirely on each word's existing `syllables` field (446 eligible words, no new content authoring). 4 words each get a row of empty cells; drag syllable chunks from a shuffled pool onto the right cell. A completed row shatters, reveals the definition, and scores.
4. **Story Quest** — a short, hand-written 3-chapter branching mystery ("The Lighthouse Keeper's Ledger", `STORY_QUEST` in `wordbank.js`). Each chapter has one inline vocabulary choice that genuinely branches the next passage, plus an end-of-chapter recall checkpoint built live from the word bank (real definition + 2 random distractors). Score out of 6 selects one of three encouraging endings. The only new authored content — the 6 vocabulary moments all reuse real existing words and definitions (meticulous, byzantine, taciturn, cantankerous, audacious, ephemeral).

`README.md` updated after each feature; `APP_VERSION`/`CACHE_NAME` bumped each time (v21 through v29 across the session).

## Round 2 — word-bank audit, new features, visual upgrades (still on open PR #956)

After PR #954/#955 merged, the user gave the word-bank basicness audit's answer plus a large follow-up request. Built and shipped, in order:

5. **`ad`-tier rebuild + Philosophical tier.** Per the user's explicit reply ("Replace all basic & borderline except: poignant, paradigm"), 43 of the `ad` category's 60 words were replaced in place with genuinely C1/C2 words; 17 already-solid words plus poignant/paradigm were kept. Added a new 25-word "Philosophical" tier (`ph`) from the user's supplied word lists. Every word was cross-checked programmatically against the other 524 entries first — of the ~90 words across the user's three source lists, 59 already existed in the bank under other tiers and were left alone rather than duplicated; the 40 ad-tier replacement words beyond the 3 genuinely-new user-supplied ones were independently selected and verified non-duplicate, since the user's lists didn't have enough new content to fill all 43 slots. Bank is now 525 words / 7 categories.
6. **Debate & Meeting Arena** — built from the user's reference screenshot: 5 workplace scenarios where a second speaker's reply needs the right high-tier verb filled in. Added 2 new words (substantiate, capitulate) to match the screenshot exactly; the other 3 scenarios reuse existing words.
7. **Word Vault** — the 7-Day Streak Lock / persistent rewards system flagged as deferred during the Memory Match build. Daily key on any graded interaction, 5-key bonus + permanent crown badge at a 7-day streak, 7 themed word packs (5-35 keys) that unlock and reveal 8 real words each.
8. **Deal or No Deal / Vocab Feud visual upgrades** — case-pop animation on opening a briefcase, the Banker's offer converted from an inline card to a proper modal overlay, and Vocab Feud's board slots now do a real 3D flip reveal (matching Memory Match's established flip technique) instead of a plain color swap. Per the user's explicit choice, kept the app's existing cream/light design system rather than adopting the alternate dark-slate mockup — same for imagery: custom SVG (existing icon-set technique) instead of live Unsplash/Pexels fetching, since that would need an API key and would break this PWA's offline-first design.
9. **Grammar Coach** — a new, separate feature (not a vocabulary game): 10 short lessons on commonly-confused grammar rules (who/whom, its/it's, affect/effect, fewer/less, lay/lie, subject-verb agreement, comma splices, dangling modifiers, parallel structure, who's/whose), each with an immediate practice question.

## Bugs found and fixed today (all caught by live Playwright verification, not just code review)

- **Double-bind bug (Vocab Feud + Stack & Match):** both games' click handlers called `render(); bindEvents();`, but `render()` already calls `bindEvents()` internally — so every click after the first double-bound listeners, causing wrong guesses/drops to fire twice (Vocab Feud's strike counter jumped 0→2 on a single wrong tap). Fixed by dropping the redundant `bindEvents()` call, matching every other game's existing `render()`-only convention.
- **Render-race bug (Word Blocks):** the shatter/wrong-flash cosmetic flags were cleared via a delayed `setTimeout(...) => render()`, which does a full DOM rebuild that could fire mid-drag and detach the chip a user was about to grab. Fixed by clearing both flags synchronously at the start of `blockPlaceChip()` instead of on a timer.
- **`.note-box` icon color bug (app-wide, pre-existing):** `.note-box svg` had a hardcoded `stroke:var(--warn)`, so every "correct" (green) feedback box's checkmark rendered red/orange instead of green, across every game using that class — found via live screenshot review of Grammar Coach's result screen. Fixed to `stroke:currentColor` so the icon follows each instance's own inline color.

## Round 3 — Word Mystery, word-bank round 2, image banners, Weekly Word Master (PRs #957, #958, #959, all merged)

After PR #956 merged, three more shipping rounds landed:

10. **Word Mystery** — a Clue/Cluedo-inspired deduction game (PR #957). 6 candidate words, one secretly the mystery word; up to 5 true clues revealed one at a time via `mysteryGenerateClues()` (syllable count, part of speech, tier, starting letter, theme, a synonym — all from existing fields, no new content). Player crosses off suspects manually (bookkeeping only, not engine-validated), then accuses.
11. **Scene illustrations** (same PR #957) — CSS-animated `.scene-*` illustrations added to Story Quest (storm/candle/beacon per chapter), Debate Arena (meeting-room pulse), and Word Mystery (detective scan) — later the Mystery one was replaced by a real image banner in round 12.
12. **Word-bank second pass** (PR #958) — user pasted a fresh review of the full word list. Removed 19 words still too basic (`ashen`, `wan`, `balmy`, `elderly`, `rapid`, `tedious`, etc.); reclassified 5 down to `ad` (`keen`, `perceptible`, `monotonous`, `nominal`, `obsolete` — verified against live data first: 9 of the user's 15 flagged words were already correctly tiered and didn't need to move); added 33 new words with user-supplied definitions, split 13 to `ph` and 20 to `sa` by character. Skipped `sycophoche` (not a real word, likely a typo). Bank is now **541 words**, zero duplicates, verified programmatically before and after writing.
13. **5 game banner illustrations** (same PR #958) — the user uploaded a 5-game image-asset pack (`Load_Words_All_5_Game_Image_Packs.zip`). Flagged proactively that 3 of the 5 packs (Clue, Family Feud, Deal or No Deal) bake actual Hasbro/Fremantle/Sony-Endemol trademarked logos into the pixels — no image-editing tool was available (PIL/pip install both unavailable/declined), so the crop was done live in CSS (`object-fit:cover` + per-game `object-position`) instead of editing the source PNGs. User's final instruction: "Use images just don't use trademark names." All 5 banners (`assets/games/*.png`) verified via Playwright screenshot review — no trademarked text visible in any of them.
14. **Weekly Word Master** (PR #959) — a new persistent Home-screen banner feature, requested after confirming Grammar Coach already covered "grammar usage." Picks one word a week (weighted toward words missed most in Study/Test via `State.progress[id].wrong`, never repeating the last 4 picks) and walks through 4 fixed mastery stages built from existing fields only: spelling (typed recall), definition (multiple choice), use in a sentence (fill the blank in the word's own example), and function (part of speech). Wrong answers never silently advance — "Try again" resets just that stage. Every answer feeds the same `gradeWord()` spaced-repetition grading as the rest of the app.

## Outstanding / blocking

- Nothing outstanding — PRs #956 through #959 are all merged, `main` is current at `21b354d`, backup branch created and SHA-verified.

## Pending / parked

- Nothing currently parked — the game-concept queue, both word-bank audit rounds, the image-banner work, Grammar Coach, and Weekly Word Master are all resolved or shipped as of this round.

## Capability gaps this session

- No image-generation tool available (couldn't literally produce the user's photo prompts for the earlier SVG-illustration work) — resolved by using the existing SVG icon-set approach instead, per the user's own choice.
- No image-editing tool available for the game-banner pack (`identify`/PIL not installed, `pip3 install Pillow` declined) — resolved with a CSS-only crop (`object-fit`/`object-position`) instead of editing the source PNGs.
- No direct access to `dssorit.github.io` or the Pages API from this sandbox (pre-existing, documented in CLAUDE.md).

## Today's commit log

```
170eaf0 Load Words: add Weekly Word Master
69bad71 Load Words: add game banner illustrations for 5 games
89a2ec4 Load Words: second word-bank pass — remove 19, reclassify 5, add 33
7a68661 Load Words: add scene illustrations to Story Quest, Debate Arena, Word Mystery
c431eb0 Load Words: add Word Mystery, a Clue-style deduction game
71b4ed6 Load Words: add Grammar Coach, fix note-box icon color bug
1401ff4 Load Words: Deal or No Deal case-pop + Banker modal, Feud flip reveal
5513f4a Load Words: add Debate & Meeting Arena game
35e2565 Load Words: rebuild Advanced tier, add Philosophical tier (25 words)
044b1df Load Words: add Word Vault persistent rewards system
aee683f Session notes: PR #954 merged, backup branch created
9027bd8 Session notes: mark Story Quest complete, full game queue shipped
72dd892 Load Words: add Story Quest branching narrative game
5706caf Session notes: Load Words game build, 2026-09-18
25fbef6 Load Words: add Word Blocks game
c988cdb Load Words: add Stack & Match game, fix double-bind bug
6c2b05b Load Words: add Vocab Feud game
```

(Thread-Link Board and The Imposter, `6c721a0` and `6b95338`, were the tail end of the prior session's build, carried over onto the same branch before this session started.)
