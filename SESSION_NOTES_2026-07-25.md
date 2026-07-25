# Session Notes — 2026-07-25

## Current state

- Latest main HEAD: 1746161 (Merge PR #762)
- Branch: claude/lock-all-sites (merged, finished)
- Working tree: clean
- SW cache: acr-v84 (no cache change this session — CLAUDE.md only)

## Built today

- **PR #762 merged** — Rule 8 extended to lock all 16 deployable sites behind unlock phrases.
  Only `CLAUDE.md` changed. All 16 sites now require exact unlock phrase before any file can be touched.
  New sites added: GESTUDY, GreatE, LoadAI, LoadPlay, LoadTasks, WSA, Attain, Attain Jr, Load, Load Maps, LoadStudio, Study.

## Outstanding / blocking

### Chanokh restructuring — NOT complete, NOT merged

PR #701 (branch `claude/acr-search-content-checklist-ZgUAQ`) is open but has conflicts with main and must NOT be merged in its current state. Key issues discovered this session:

1. **Astronomical Book deleted from live reader.** PR #700 (merged last session) deleted `data/file_114.json` (ch.74-108). This removed the Astronomical Book (ch.74-82, 364-day solar calendar, 4Q208-4Q211 attested) from the live ACR Reader. User directed: "Recover backup." Recovery was interrupted — NOT done yet.

2. **Ch.72-73 in file_15.json are not the Astronomical Book.** They are Epistle content — ch.107 (Noakh birth narrative) and ch.108 (reward/fire for wicked). The DSS notes inside those chapters say so explicitly. PR #701 incorrectly labeled them as "Astronomical Book" content.

3. **PR #701 state:** file_14.json deleted, file_15.json stripped to ch.37-38 (wrong content), editorial note added. This PR is broken and should be rebuilt once Astronomical Book recovery is done.

### Approved plan (pending execution)

- Recover Astronomical Book (ch.74-82 only) from backup branch `backup/2026-07-18-acr-v83-post-rules`
- Remove Book of Parables (ch.37-71) from ACR Reader — no renumbering
- Add plain-language exclusion explanation (DSS absence, divine name substitution, scribal inflation of Daniel)
- Remove all traces of removed chapters from ACR Reader notes AND ACR Search (`Search/acr_search_data.json`)
- Scope: only the above. Nothing else touched in either site.

### ACR 3 app

User requested a new `/ACR3/` app to hold Book of Parables, ch.74-108, and Similitudes — all with critical notes explaining exclusion from the official reader. Not started.

## Pending / parked

- ACR 3 app — parked until Chanokh restructuring is complete
- Session continuity setup (PR #760, merged before this session) — no action needed

## Capability gaps this session

- Could not fetch live deployed URL (dssorit.github.io blocked)
- Git merge to feature branch conflicted due to stale PR #701 history

## Backups created this session

- `backup/2026-07-25-acr-v84` → bcbc3015625eaab26081c1ae64ccd6dbf981ebf0 (pre-PR #762, current main before lock rule change)

## Prior session backups (recovery reference)

- `backup/2026-07-18-acr-v83-post-rules` — has file_114.json intact (Astronomical Book recoverable from here)
- `backup/2026-07-18-acr-v84` → c4f0b58 (after PR #700, before PR #701 work)

Recovery command: `git checkout backup/2026-07-18-acr-v83-post-rules -- data/file_114.json`

## Today's commit log

- e74529e Lock all repo sites behind unlock phrases — Rule 8 extended 2026-07-25 (PR #762)
