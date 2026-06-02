# Session Notes — 2026-06-02

## Current state
- `main` HEAD: `76266c6` (acr-v49 + acr2-v10)
- Live: ACR main `acr-v49`; ACR2 `acr2-v10`.
- All features below VERIFIED working by user on device.

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

## Built today (ACR2 — supplementary volumes)
- **acr2-v9 (PR #373):** ported tap-a-verse-to-play into ACR2 (was missing)
  — `speakExactElement()` + `#content` tap handler, mirroring ACR main,
  adapted to ACR2 (`acr2_vp`, deferred speak). Also added an
  "Open ACR Main Reader" link at the bottom of the ACR2 sidebar
  (relative `../index.html`). ACR2 playback engine unchanged.
- **acr2-v10 (PR #374):** the sidebar link now sets `localStorage acr_ok=1`
  before navigating (the same shared-origin sign-in marker Solar's link
  already sets), so the hop to ACR main skips the password. ACR main login
  page NOT edited — it already honors `acr_ok`.

## Verified
- User confirmed on iPad AND iPhone: "ACR main audio fully works."
- User confirmed ACR2 v9 live: tap-to-play and the sidebar link work.
- User confirmed ACR2 v10: "Everything works" — the no-password hop to
  ACR main works.
  Recorded in `VERIFIED_LOG.md` and `HANDOFF.md` (Bug 3).

## Backups
- **`backup/2026-06-02-acr2-v10`** — SHA `76266c6` — LATEST full verified
  state (ACR main v49 + ACR2 v10). Recovery:
  `git checkout backup/2026-06-02-acr2-v10`.
- `backup/2026-06-02-acr-v49` — SHA `d9122045` — ACR main audio only.
- Prior: `backup/2026-06-02-acr-v43` (`a19f966`), superseded.

## Outstanding / awaiting user decision
- **Data follow-up (optional):** re-tag verses in the 11 early-book ACR
  main files with `data-ptype="verse"` so they match the other 101
  volumes; until then the `isVerseEl` number-pattern fallback handles them.
- **Security note (informational):** the ACR2 -> ACR main hop now bypasses
  the password the same way Solar does. Anyone reaching ACR2 (no gate) can
  enter ACR main without the password. User confirmed this is desired and
  consistent with the existing Solar flow.

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
- 76266c6 ACR2 v10: sidebar link skips re-signin to main (#374)
- 5cfe06f ACR2 v9: tap-a-verse-to-play + ACR main link (#373)
- 8a371d7 docs: record acr-v49 verified + rollback backup (#372)
- d912204 acr-v49: detect verses by tag OR verse-number (#371)
- a323c34 acr-v47: remove resume() from vStop (#370)
