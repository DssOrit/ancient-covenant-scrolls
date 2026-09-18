# Session Notes — 2026-09-18

## Current state

- Branch: `claude/load-words-pwa-setup-nf1pcn`
- Latest commit: `25fbef6` — "Load Words: add Word Blocks game"
- Working tree: clean, all shipped work pushed.
- Open PR: **#954** ("Load Words: add The Imposter card-flip game" — title is stale, now carries 5 commits: The Imposter, Thread-Link Board, Vocab Feud, Stack & Match, Word Blocks). Base `bbc0dce`, head `25fbef6`. Still open — per CLAUDE.md Rule 9, presenting it and waiting for the user's explicit merge go-ahead before touching the merge tool.
- `APP_VERSION` / `CACHE_NAME`: `v23` / `loadwords-v23`.

## Built today

Continuing a long-running "advanced vocabulary games" build (user pasted a series of AI-generated game concepts and asked for each to be implemented). Shipped this session, in order:

1. **Vocab Feud** — a random theme becomes the round's "survey topic"; 6 words from that theme fill a board ranked by `wordPointValue()`, mixed into a shuffled chip pool with 4 distractors from other themes. Tap a chip that belongs to reveal it and score; 3 wrong taps ends the round.
2. **Stack & Match** — an untimed Columns/Connect-Four-style game. 6 word/definition pairs become 12 blocks in a queue; tap a column to drop the next block (no falling timer). A word landing adjacent to its matching definition clears both and scores.
3. **Word Blocks** — a block-puzzle spelling game built entirely on each word's existing `syllables` field (446 eligible words, no new content authoring). 4 words each get a row of empty cells; drag syllable chunks from a shuffled pool onto the right cell. A completed row shatters, reveals the definition, and scores.

`README.md` updated after each feature; `APP_VERSION`/`CACHE_NAME` bumped each time (v21 → v22 → v23).

## Bugs found and fixed today (both caught by live Playwright verification, not just code review)

- **Double-bind bug (Vocab Feud + Stack & Match):** both games' click handlers called `render(); bindEvents();`, but `render()` already calls `bindEvents()` internally — so every click after the first double-bound listeners, causing wrong guesses/drops to fire twice (Vocab Feud's strike counter jumped 0→2 on a single wrong tap). Fixed by dropping the redundant `bindEvents()` call, matching every other game's existing `render()`-only convention. Confirmed no other game in the codebase had this pattern.
- **Render-race bug (Word Blocks):** the shatter/wrong-flash cosmetic flags were cleared via a delayed `setTimeout(...) => render()`. Since `render()` does a full `innerHTML` DOM rebuild, that timer could fire mid-drag and detach the exact chip a user (or the test) was about to grab — intermittently breaking a solve sequence a few chips from the end. Fixed by clearing both flags synchronously at the start of `blockPlaceChip()` instead of on a timer, removing the race entirely. Reran the full solve path 5x clean afterward.

## Outstanding / blocking

- **PR #954 needs the user's review and explicit merge go-ahead.** Per Rule 9, only the user can say "merge #954" — not implied by "build and merge all once finished." Presenting: PR #954, https://github.com/DssOrit/ancient-covenant-scrolls/pull/954, files changed `loadwords/app.js`, `loadwords/index.html`, `loadwords/service-worker.js`, `loadwords/README.md`, 5 commits (The Imposter, Thread-Link Board, Vocab Feud, Stack & Match, Word Blocks).
- **Word-bank basicness audit still open.** Earlier in this multi-day build the user asked "Are all 500 words advanced lexical items, high-tier vocabulary?" The investigation (specifically re-screening the original 60-word `ad` category, which predates the later "ultra advanced only" standard) was interrupted by a rejected tool call and never resumed. Flagging again here so it isn't lost.

## Pending / parked

- **Story-based "Choose Your Own Vocabulary" narrative quiz** — multi-chapter, branching, richer atmospheric detail, multi-tier vocabulary checkpoints. Explicitly a content-authoring task (real prose/narrative writing), different in kind from the game-mechanic builds above. Next up.
- **7-Day Streak Lock / "Word Vault" unlockable card-pack currency** — part of the original Memory Match scoring spec but explicitly flagged in that PR as a separate, larger persistent cross-session meta-progression feature. Not started.
- Whether Word Tetris needed a check-in over the app's untimed/low-pressure design principle — resolved by building it as Stack & Match: tap-to-drop placement with no falling-block timer, so no conflict with the existing design principle.

## Capability gaps this session

- No new gaps beyond what's already documented in CLAUDE.md (no direct access to `dssorit.github.io` or the Pages API from this sandbox).

## Today's commit log

```
25fbef6 Load Words: add Word Blocks game
c988cdb Load Words: add Stack & Match game, fix double-bind bug
6c2b05b Load Words: add Vocab Feud game
```

(Thread-Link Board and The Imposter, `6c721a0` and `6b95338`, were the tail end of the prior session's build, carried over onto the same still-open PR.)
