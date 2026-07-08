# Session Notes — 2026-07-07 (Great Eraser redesign + original-text recovery)

> Device clock read "Wed Jul 8" late in the session; system date was 2026-07-07.
> Work continues **tomorrow**. READ THIS FIRST next session.

## TOP OF LIST — decision to resolve TOMORROW before touching anything

**Do NOT change site text until the user confirms this in the next session.**

The user's exact open question (their words): *"This swaps the site from the reworked
819k edition to your original 367k edition — your real writing, but shorter than what's
up there now. That's what you want, correct?"* — **They want to go over this tomorrow
before I do anything.**

### What was discovered (the important part)
- The **current live Great Eraser** (`/GreatE/`, cache `great-eraser-v10`) renders a
  **reworked / expanded edition**: 57 GE chapters, **~819,000 chars**. Different chapter
  titles and wording than what the user wrote (e.g. Vol 1 Ch 1 = "THE GEOLOGICAL REALITY").
- The user's **ORIGINAL edition** is 8 volumes, **111 chapters, ~367,000 chars**
  (e.g. Vol 1 Ch 1 = "THE AFRICAN TECTONIC FRAMEWORK — THE LAND BEFORE THE RENAMING").
- The rework was already in the repo data **before this project started** (came in via a
  prior commit, "Load Tasks OCC #534") — NOT from this redesign work. The redesign only
  changed the *reader/design*; text retention through the rebuild was **99.99%** of
  whatever data was in the repo.
- Proven: the current site is byte-identical to the user's `ge_final` PWA zip (the reworked
  edition). The original edition is a *different, earlier, shorter* book.

### The user's original text is PRESERVED here (scratchpad is ephemeral, so it's in git)
- `/_restore_original/data/vol1.json … vol8.json` — **the user's original 8 volumes**
  (from the zip `__TheGreatEraser_PWA_GitHub.zip` → `pwa_eraser/`). Confirmed present:
  vol1 contains "AFRICAN TECTONIC FRAMEWORK". 111 chapters total.
- `/_restore_original/original-reader-index.html` — the original PWA's reader (reference).
- `/_restore_original/build/` — the build pipeline used to generate the new app
  (`build_phase1.py` = GE transform + table reshaping; `build_full.py` = merge Sharks as
  Vol 9; `build_final.py` = final self-contained app incl. partial interactions code;
  `sharks_blocks.json` = the 52-chapter When Sharks Attack converted to blocks).
- **This `_restore_original/` folder lives only on branch
  `claude/wsa-acr-design-alignment-ji5poy`. Do NOT merge it to main.** Use it to rebuild,
  then remove it before any main PR.

### The plan (once user confirms tomorrow)
1. Back up current live data first (branch already made: `backup/2026-07-08-pre-original-ch1`).
2. Replace `GreatE/data/vol1–8.json` with the **original** from `_restore_original/data/`.
3. Re-run the build pipeline (`_restore_original/build/build_final.py` reads GreatE/data)
   so the new ACR-Search design renders **the original text**. Keep **When Sharks Attack
   (Vol 9)** as-is.
4. Bump cache `great-eraser-v10 → v11`, PR into main, get explicit merge OK (locked rule 9).
   User is cautious after the text scare — they asked to see **Chapter 1 as a proof first**.
   Offer a viewable/preview of the original before shipping the full swap.

### ALTERNATIVE the user proposed (discuss BEFORE deciding tomorrow)
Instead of replacing the rewrite with the original, **merge/union** them:
- Scan the original text against the new text; find the original passages that are
  **missing** from the new edition (recall: only ~10% of the original's exact wording is
  in the new edition, so ~90% is "missing").
- **Add only the missing original text to the site without deleting the new text.**
  Result = a superset: the reworked edition PLUS the user's original passages restored.

Points to work through with the user tomorrow (do not assume):
- **Placement**: original and new have different chapter structures — where do the missing
  original passages go (own chapters? appended per-topic? a separate "Original" section or
  edition toggle?).
- **Duplication risk**: many topics exist in BOTH (original wording + rewritten wording),
  so a naive union repeats content in two voices. Need a rule for that.
- **Definition of "missing"**: verbatim phrase-level vs topic/paragraph-level. Verbatim
  (~90% missing) will pull in almost the whole original; topic-level needs judgment.
- Compare against the simpler option (full swap to original). Let the user choose.
- Tooling ready: `_restore_original/` has the original data + build pipeline to do either.

## Current state
- Live: **Great Eraser** cache `great-eraser-v10`; **GESTUDY** cache `gestudy-v9`.
- Branch `claude/wsa-acr-design-alignment-ji5poy` = `origin/main` + this notes/preserve commit.
- No live-site content changes were made today regarding the original-text swap.
- Live URLs: https://acrscrolls.com/GreatE/  ·  https://acrscrolls.com/GESTUDY/

## Built + SHIPPED today (all merged to main, all live)
- **PR #576** — Great Eraser rebuilt in ACR Search style: dark shell, search, colored
  category pills (Evidence/Timeline/Places/People/Sources — real filters), color-coded
  volumes, SVG buttons, refresh, orange/red/gold accent switch, Samantha read-aloud,
  Restore-the-Name interaction, tap-to-enlarge image support, rebuilt tables, password gate
  REMOVED, **When Sharks Attack merged as Volume 9** (9 vols / 109 chapters, author credit
  removed). manifest/app icons → icon.png.
- **PR #577** — first-open **splash screen** (cover.png), no password; cache v9→v10;
  precache cover.png.
- **PR #578** — GESTUDY: all **emoji → inline SVG icons** (91 icons, 0 emoji left),
  check/x marks → SVG, **refresh arrow** on home, **real back navigation + Home button on
  every page**; cache gestudy-v8→v9.

## Pending / parked (NOT started or paused)
- **[BLOCKING] Original-text swap** — see top of file. Resolve with user first.
- **Three interactions** (Timeline, Map of the Name, Three Witnesses) — curated data +
  render code was being added to `build_final.py` (preserved in `_restore_original/build/`)
  but was **paused mid-build and never shipped**. Redo/finish after the text decision.
- **Images** — user said "another day." ACR Search image pattern (tap-to-enlarge) is
  already supported in the new app; images go beside the evidence they document. ACR Search
  already has ~30 relevant images in `Search/images/` that map to GE chapters.

## Backups (recovery = `git checkout <branch>`)
- `backup/2026-07-07-great-eraser-v8`  — pre-redesign live site (old reader + gate)
- `backup/2026-07-07-great-eraser-v9`  — after Great Eraser rebuild
- `backup/2026-07-07-great-eraser-v10` — after splash
- `backup/2026-07-07-gestudy-v9`       — after GESTUDY icon/nav work
- `backup/2026-07-08-pre-original-ch1` — current main, before any original-text work
- NOTE: none of the backups contain the user's ORIGINAL text (it was already gone from the
  repo before backups were taken). The original lives only in `_restore_original/` on the
  feature branch.

## Capability gaps this session (so next session doesn't rediscover)
- Cannot reach the live URL (`acrscrolls.com` / `dssorit.github.io`) from the sandbox —
  the USER is the only one who can visually verify the deployed site.
- No Playwright/browser here — cannot screenshot/verify rendered HTML; verify via
  node --check + structural/text-diff checks, and the user's eyes.
- The scratchpad is ephemeral (reclaimed between sessions) — that is why the original data
  + build scripts were committed to `_restore_original/`.
- Stop-hook keeps flagging merged commit `d2cad80` as "unverified": it is GitHub's own
  squash-merge commit on main. Do NOT amend/rebase it (would force-push main). Git identity
  is set to `noreply@anthropic.com` / `Claude` for future commits.

## Today's commit log (feature branch / merges)
- fcd5549 Great Eraser: ACR Search rebuild + When Sharks Attack (#576)
- e1298b9 Great Eraser: first-open splash screen, no password (#577)
- d2cad80 GESTUDY: emoji→SVG icons, refresh, back+home nav (#578)
- (this commit) session notes + preserve original edition under _restore_original/
