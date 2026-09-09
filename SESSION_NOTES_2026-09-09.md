# Session Notes — 2026-09-09

## Current state

- Latest commit on `origin/main`: `a2bd26f` (Merge PR #900)
- Working tree: clean
- No uncommitted work outstanding

## Built today

**ACR Solar — fixed Year view month tiles all opening December (PR #900, merged)**

- User report: clicking any month tile in the Year view always opened
  December 2026, no matter which tile was clicked.
- Reproduced first, before any fix: dispatched click events on all 12
  Year-view tiles — every one resulted in December.
- **Root cause**: `renderYear()`'s click handler used `var m2 = m;` inside
  the loop as an attempted per-iteration closure fix. `var` is
  function-scoped, not block-scoped, so this doesn't actually create a
  separate binding per tile the way it looks like it should — all 12
  click handlers shared the *same* `m2` variable. By the time any click
  fired (after the loop had already finished building all 12 tiles),
  `m2` held whatever value the loop left it at on its final iteration —
  11, December.
- **Fix**: `let m2 = m;` instead of `var` — a `let` declared inside a
  loop body genuinely creates a new binding each iteration, which is
  what the `var` version only appeared to do.
- Re-ran the identical 12-tile click test after the fix: each tile now
  correctly opens its own month (Jan through Dec, in order). Also
  confirmed clicking through actually renders the correct Month view
  title (e.g. July's tile → "July 2026"), not just correct internal
  state.
- Cache bumped `acr-solar-v46` → `acr-solar-v47`.
- Backup: `backup/2026-09-09-acr-solar-v46` (SHA `9f982be`, before the fix).

## Outstanding / blocking (carried over, not from today)

- **Yovelim `data/file_16.json` fix is still paused.** Chapters 7, 11, 12,
  17/19 (contradiction), and 22 (false heading) unresolved; no verified
  source yet. Recovery point: `backup/2026-09-03-acr-v118` (SHA `1ae5212`).
- **CLAUDE.md Rule 36 status is still disputed and unresolved** — added
  2026-09-03, user later said they never asked for it as a rule. No
  decision made.
- **Holy-day email reminder feature — still not decided** (Cloudflare
  Worker backend vs. client-side push notification).
- **PR #892 ("Session notes: 2026-09-07") remains stale/superseded** —
  already incorporated into `main` via a different merge path
  (`e68c814`); just needs closing.

## Pending / parked

- Yovelim Ch7/11/12/17-19/22 fixes — parked pending verified source content.
- Rule 36 keep-or-remove — parked pending user decision.
- Email vs. push reminder for holy days — parked pending user decision.
- Closing stale PR #892 — low priority, no content lost.

## Today's commit log

```
fb3d7b1 ACR Solar: fix Year view month tiles all opening December
```

## Backups

- `backup/2026-09-09-acr-solar-v46` — SHA `9f982be` (before PR #900)
- `backup/2026-09-09-acr-solar-v47` — SHA `a2bd26f` (current stable state)

Recovery: `git checkout backup/<name>`
