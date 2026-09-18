# Session Notes — 2026-09-18

## Current state

- Branch: `claude/load-words-pwa-setup-nf1pcn`, restarted from `origin/main` after today's merge (`git checkout -B claude/load-words-pwa-setup-nf1pcn origin/main`).
- **PR #954 is MERGED** — merged by the user (DssOrit) via the GitHub UI at 2026-09-18T03:17:31Z, confirmed via `pull_request_read`. New `main` HEAD: `1d60779`.
- Working tree: clean.
- `APP_VERSION` / `CACHE_NAME`: `v24` / `loadwords-v24` (now live on `main`).

## Backups

- `backup/2026-09-18-loadwords-v24` — pushed, SHA-verified equal to `origin/main` (`1d60779`) right after today's merge landed. Recovery: `git checkout backup/2026-09-18-loadwords-v24`.

## Built today

Continuing a long-running "advanced vocabulary games" build (user pasted a series of AI-generated game concepts and asked for each to be implemented). This completes the full game-concept queue from that batch of requests. Shipped this session, in order:

1. **Vocab Feud** — a random theme becomes the round's "survey topic"; 6 words from that theme fill a board ranked by `wordPointValue()`, mixed into a shuffled chip pool with 4 distractors from other themes. Tap a chip that belongs to reveal it and score; 3 wrong taps ends the round.
2. **Stack & Match** — an untimed Columns/Connect-Four-style game (the "Word Tetris" concept, adapted to be tap-to-drop with no falling-block timer so it doesn't conflict with the app's untimed/low-pressure design principle). 6 word/definition pairs become 12 blocks in a queue; tap a column to drop the next block. A word landing adjacent to its matching definition clears both and scores.
3. **Word Blocks** — the block-puzzle spelling game, built entirely on each word's existing `syllables` field (446 eligible words, no new content authoring). 4 words each get a row of empty cells; drag syllable chunks from a shuffled pool onto the right cell. A completed row shatters, reveals the definition, and scores.
4. **Story Quest** — a short, hand-written 3-chapter branching mystery ("The Lighthouse Keeper's Ledger", `STORY_QUEST` in `wordbank.js`). Each chapter has one inline vocabulary choice that genuinely branches the next passage, plus an end-of-chapter recall checkpoint built live from the word bank (real definition + 2 random distractors). Score out of 6 selects one of three encouraging endings. The only new authored content — the 6 vocabulary moments all reuse real existing words and definitions (meticulous, byzantine, taciturn, cantankerous, audacious, ephemeral).

`README.md` updated after each feature; `APP_VERSION`/`CACHE_NAME` bumped each time (v21 → v22 → v23 → v24).

## Bugs found and fixed today (both caught by live Playwright verification, not just code review)

- **Double-bind bug (Vocab Feud + Stack & Match):** both games' click handlers called `render(); bindEvents();`, but `render()` already calls `bindEvents()` internally — so every click after the first double-bound listeners, causing wrong guesses/drops to fire twice (Vocab Feud's strike counter jumped 0→2 on a single wrong tap). Fixed by dropping the redundant `bindEvents()` call, matching every other game's existing `render()`-only convention. Confirmed no other game in the codebase had this pattern.
- **Render-race bug (Word Blocks):** the shatter/wrong-flash cosmetic flags were cleared via a delayed `setTimeout(...) => render()`. Since `render()` does a full `innerHTML` DOM rebuild, that timer could fire mid-drag and detach the exact chip a user (or the test) was about to grab — intermittently breaking a solve sequence a few chips from the end. Fixed by clearing both flags synchronously at the start of `blockPlaceChip()` instead of on a timer, removing the race entirely. Reran the full solve path 5x clean afterward.

## Outstanding / blocking

- **Word-bank basicness audit still open.** Earlier in this multi-day build the user asked "Are all 500 words advanced lexical items, high-tier vocabulary?" The investigation (specifically re-screening the original 60-word `ad` category, which predates the later "ultra advanced only" standard) was interrupted by a rejected tool call and never resumed. Flagging again here so it isn't lost.

## Pending / parked

- **7-Day Streak Lock / "Word Vault" unlockable card-pack currency** — part of the original Memory Match scoring spec but explicitly flagged in that PR as a separate, larger persistent cross-session meta-progression feature. Not started, not yet re-requested standalone.
- The full game-concept queue from the user's pasted AI-generated concepts is now built: Deal or No Deal, Memory Match, Higher or Lower, The Imposter, Thread-Link Board, Vocab Feud, Stack & Match (Word Tetris), Word Blocks (block puzzle), and Story Quest (the narrative quiz) all shipped across this and the prior session.

## Capability gaps this session

- No new gaps beyond what's already documented in CLAUDE.md (no direct access to `dssorit.github.io` or the Pages API from this sandbox).

## Today's commit log

```
72dd892 Load Words: add Story Quest branching narrative game
5706caf Session notes: Load Words game build, 2026-09-18
25fbef6 Load Words: add Word Blocks game
c988cdb Load Words: add Stack & Match game, fix double-bind bug
6c2b05b Load Words: add Vocab Feud game
```

(Thread-Link Board and The Imposter, `6c721a0` and `6b95338`, were the tail end of the prior session's build, carried over onto the same still-open PR.)
