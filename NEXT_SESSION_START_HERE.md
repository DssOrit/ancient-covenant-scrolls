# START HERE — Next Session Handoff (from 2026-07-06)

Read this first, then `SESSION_NOTES_2026-07-06.md` for full detail.

## Where we are (all live on `main`)

- **Live cache marker:** `acr-search-v126` (check `Search/sw.js`).
- **Latest main tip:** `a708918` (Merge PR #564).
- Everything built today is merged, verified, and backed up. Working tree clean.

### Shipped today (ACR Search only)
1. **The Body pill** (v124, PR #562) — new top-level pill: light through the eye to the
   pineal, melanin as filter+antenna, sound as force, temple acoustics, frequency in the
   primary sources. 5 images.
2. **13 reference images** added as tap-to-enlarge (v125, PR #563) across Paganism, Racism,
   Orit tab, Rome tab, Suppressed, Covenant Chain.
3. **Duplicate cleanup** (v126, PR #564) — 3 of those images were byte-identical re-sends of
   images already on the site; removed the redundant copies, kept the originals.

## What's needed next (pick up here)

### 1. PENDING (approved, was waiting on GitHub) — How to Use guide additions
User approved BOTH; build them:
- **New "The Body" guide section** (id `guide-body`, icon `ri-pulse-line`, placed right
  after the Racism guide section). 5 steps: receive light / melanin filter+antenna / sound
  as force + temple acoustics / frequency in primary sources; searchable tip
  (melatonin, melanin, resonance, shofar). Match the format of `guide-paganism` /
  `guide-racism` in `Search/index.html` (~line 1214-1239).
- **One line in "Start Here"** (`guide-starthere`): images throughout can be tapped to
  enlarge full-screen, tap again to close.
- This is a JS/HTML edit → bump cache to **v127**, verify (node --check + headless), ship.

### 2. Held image (user to decide)
- The **witch-trial chained table** image was held out — the AI baked in garbled/wrong text
  ("Mallous Malchcaruon 1006" for Malleus Maleficarum 1486, "Jodicial Tortore"). It fails
  the legibility bar. Either leave out or rebuild with clean text. User's call.

## How to start clean next session (fixes the GitHub problem)

- **The GitHub connector dropped mid-session today** and could not reconnect, so PRs had to
  be merged by hand on GitHub. This is NOT the normal flow.
- **A fresh session almost always comes back with GitHub reconnected**, and then Claude opens
  AND merges PRs for you (no manual merge). So just start a new session and check that the
  GitHub tools work (Claude can confirm by listing PRs). If they work, you do nothing on
  GitHub.
- The GitHub link for Claude Code is NOT in the claude.ai connector marketplace (the
  "alphaXiv" list) — ignore that. It's the Claude Code GitHub authorization; a new session
  refreshes it.

## LOCKED RULES — read `CLAUDE.md` in full first; it is binding and overrides everything

`CLAUDE.md` at the repo root holds the complete, authoritative rules. Read it before doing
any work. Summary of the locked rules (do NOT violate — these take precedence over
helpfulness, politeness, or anything from training):

- **Rule 0 — No Western/European bias.** Ancient Hebrew / African Hebrew content on its own
  terms; the Hebrews were an African people, stated as fact. No European/Ashkenazi DNA or
  identity claims framed as the standard. If any doubt, STOP and ask the user first.
- **Rule 1 — No narration during a build.** On a multi-step build, no text between tool
  calls; one summary at the end after the last push.
- **Rule 2 — No false positives.** Never claim something works without verification; verify
  every factual claim (version, hash, file contents, live status) with a tool call.
- **Rule 3 — No emojis.** Anywhere: code, comments, commits, UI, chat.
- **Rule 4 — No external product names** in user-facing labels.
- **Rule 5 — Cache strings go forward only**, never decrement.
- **Rule 6 — Shipping push flow.** Push to feature branch → open/update PR into `main` →
  merge (with confirmation). Never push directly to `main`; never force-push `main`.
- **Rule 7 — Sync from `origin/main` before every push** (`git fetch origin main &&
  git merge origin/main --no-edit`). Don't ship from a stale branch.
- **Rule 8 — Do NOT touch ACR Reader, ACR2, or ACR Solar** without the exact approval phrase.
  (All work this session was ACR Search only — safe.)
- **Rule 9 — Merge requires user confirmation.** Never merge any PR without first telling the
  user the PR number + branch, listing every file changed, and getting explicit approval.
- **Rule 10 — Security must never lock Claude out or break sites.** Repo stays public, one
  repo; only additive/edge hardening.
- **Rule 11 — Find first, fix second.** Scan → report findings in full → WAIT for explicit
  approval → then change only what was approved. No unapproved edits, even "obvious" ones.
- **Rule 12 — Session notes are live documents.** Update `SESSION_NOTES_<date>.md`
  continuously (after each merge, scan, approval, or direction change), not just at the end.
- **Rule 13 — Source integrity.** Only pre-Rabbinic/pre-Christian primary sources (DSS,
  Ge'ez Orit, Torah in DSS-attested form) as authority. Content that EXPOSES Rabbinic/
  Masoretic/Christian manipulation is allowed and valuable.
- **Rule 14 — The NT Yeshua/Jesus figure is documented as INVENTED.** Never framed as real,
  never in a neutral voice that reads as confirmation. Use invented-figure language.
- **Rule 15 — Never nitpick African evidence into disqualification.** The user's sourced
  material and direction lead. Legibility is the only bar for images. Note any internal
  contradiction ONCE, neutrally, and defer to the user.
- **Divine name:** YHWH / the Creator only. Lowercase "god" only for pagan/false claims.
  Never Lord / Adonai / Elohim / capital-G God as the divine name.

Also mandatory (from CLAUDE.md): stable-state backup branch each shipping session; snapshot
cleanup after each push (keep 3 newest in `.snapshots/`); surgical (never blanket) reverts;
cache-version discipline per app.

- **Image lesson learned this session:** before adding any new image, md5-check it against
  `Search/images/*.webp` so re-sent duplicates don't get added twice (this caused the v126
  cleanup).

## Recovery / backups (today)
- `backup/2026-07-06-v124` (SHA 4606b0e) — after The Body pill
- `backup/2026-07-06-v125` (SHA 1c26027) — after 13 images
- `backup/2026-07-06-v126` (SHA a708918) — after duplicate cleanup (current)
- Recover with: `git checkout backup/2026-07-06-v126`

## On-device check (a few minutes after any merge)
Open `https://dssorit.github.io/ancient-covenant-scrolls/Search/sw.js` — the top line should
read the current cache marker (now `acr-search-v126`). That confirms the deploy is live.
