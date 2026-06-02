# Session Notes — 2026-06-02

## Current state
- Branch shipped from: `claude/play-verses-audio-regression-ZxtoL`
- `main` HEAD: `d9122045` (acr-v49)
- Live marker / cache: `ACR v49` / `acr-v49`
- Working tree: doc updates (HANDOFF, VERIFIED_LOG, these notes) pending
  push on the feature branch.

## Built today (ACR main / root reader — Play Verses audio restoration)
- **acr-v47 (PR #370):** removed `window.speechSynthesis.resume()` from
  `vStop()`. v45 had added it; on iOS `resume()` after `cancel()` poisons
  the synth so the next `speak()` is silently dropped. `vStop()` runs on
  every chapter load, so Play Verses broke from the first tap. Removing
  the line restored v43 `vStop()`. The iOS paused-after-cancel case is
  already covered by the `VPAUSED` guard in `vPlay()`.
- **acr-v49 (PR #371):** added `isVerseEl(el)` and rebuilt `buildVP()` +
  the content tap handler to detect a verse by tag OR (when untagged) by
  its leading chapter:verse number (e.g. `1:1`). Fixes "verses only"
  playback and tap-a-verse-to-read on the 11 untagged early-book volumes
  (`file_2`-`file_12`, incl. Bamidbar). Tagged volumes unchanged.
  Playback engine (`vPlay`/`vNext`/`vStop`/`speakExactElement`) untouched.

## Verified
- User confirmed on iPad AND iPhone: "ACR main audio fully works."
  Recorded in `VERIFIED_LOG.md` (acr-v49) and `HANDOFF.md` (Bug 3).

## Backups
- **`backup/2026-06-02-acr-v49`** — SHA `d9122045` — the verified-working
  ACR main state. Recovery: `git checkout backup/2026-06-02-acr-v49`.
- Prior: `backup/2026-06-02-acr-v43` (`a19f966`), now superseded.

## Outstanding / awaiting user decision
- **ACR2 tap-to-play:** user reports ACR2 does not let you tap a verse to
  jump + highlight + play. ACR2 has no content tap handler (confirmed in
  `ACR2/index.html`). ACR2 is LOCKED (rule 8) — NOT touched. Awaiting an
  explicit "edit ACR2" / "fix ACR2" before adding the handler.
- **Data follow-up (optional):** re-tag verses in the 11 early-book files
  with `data-ptype="verse"` so they match the other 101 volumes; until
  then the `isVerseEl` number-pattern fallback handles them.

## Capability gaps this session
- GitHub MCP token expired mid-session once; resolved on retry (auto
  refresh), no user action needed.
- `mcp__github__actions_list` output frequently exceeds the tool token
  limit; had to parse the persisted JSON file with python each time.
- The `Load Site Safety Check` CI job enforces the ACR Reader lock: it
  fails unless the PR title/body contains `edit acr reader` /
  `fix the reader` / `root-app override`. It re-runs on synchronize or
  reopen, not on a plain body edit. Add the unlock phrase up front on any
  future root-app PR to avoid a red check + reopen dance.

## Today's commit log (oneline)
- d912204 acr-v49: detect verses by tag OR verse-number (#371)
- (a323c34) acr-v47: remove resume() from vStop (#370)
