# Session notes — 2026-07-01 (into early 2026-07-02)

## Current state
- `main` at `89c6a7b` — cache `load-tasks-cache-v2.5.2`.
- Open PR: **#546** (docs-only: records branch protection as enabled/confirmed;
  also carries this notes file). Not merged yet.
- Branch `claude/load-progress-check-v9mrb4` is the working branch (reset from
  `origin/main` for each new unit; force-with-lease pushes are expected since it
  keeps being restarted after each merge).
- User confirmed live: the OCC redesign, the Employee login (see below), and the
  branch-protection ruleset.

## Built today (chronological, all merged to main unless noted)
1. **#539** — LoadTasks UI redesign: left slide-out subject-grouped side menu
   (like Load Studio), transparent-gold OCC Login, glassy translucent cards.
2. **#540** — removed the leftover horizontal scroll strip (the duplicate
   `.side-rail`); dashboard full-width; navigate only via the Menu drawer.
3. **#541** — made the Menu reachable from the splash (moved the drawer out of
   the hidden header; added a Menu button to the splash actions).
4. **#542** — Menu button moved to the dashboard View bar (before Step-by-Step);
   menu subject titles bold/larger, tool names lighter (fixed a legacy inline
   `<style>` that was shrinking `.nav-group-sep` to 10px gray).
5. **#544** — OCC verification upgrades (dyslexia-friendly): big Works/Broken/
   Blocked buttons with auto-save; per-section Add photo/file and Add link
   (Google Docs share links); uploads accept photos + common documents (PDF,
   doc, txt, rtf, csv, sheets, slides) up to 1.4 MB (safe under D1's 2 MB row
   limit) — **no videos** (per user); one-screen-per-day. New `sections.ev_key`
   column.
6. **#545** — tap-to-note feedback (1-5 rating, quick problem chips, saved
   phrases; `sections.tags` + `sections.rating` columns) AND restyle of the OCC
   tool to the main gold/navy glass theme (background, cards, gold Sign In and
   progress). How-to step-by-step updated to the new tap flow.
7. **#546 (open)** — security doc update recording branch protection.

## Login fix (resolved with user)
- Employee login on loadeco.app failed ("Wrong name or password"). Cause: we
  removed names from the **repo code** earlier, but the **D1 `users` table** is
  separate — the employee row was still under the old real name, so logging in
  as "Employee" didn't match.
- Fix: user re-ran **occ-setup.html** and created the employee as name
  **`Employee`** + password. **Confirmed working.** (Login matches name+role+
  password exactly, case-sensitive.)

## Security — branch protection (done this session)
- Enabled a GitHub **ruleset `protect-main`**: Active, targets `main`, empty
  bypass, **Block force pushes** + **Restrict deletions**. Verified in the UI.
- This blocks history tampering on `main`; PR merges and Cloudflare deploys are
  unaffected. Recorded in SECURITY.md + SECURITY_AUDIT_REPORT.md (PR #546).

## Privacy status (confirmed with user)
- Current files on `main`: **no real name, no email** — clean. OCC login uses
  generic `Employee`/`Owner`.
- Old name **"Witness Bond"** + email `vintageandmore71@gmail.com` still exist in
  **git history** (name in ~5 commits; email removed by #538 from
  CLOUDFLARE_SETUP.md). Left as-is — history rewrite is off the table (risky,
  repo hosts live sites). Commit author uses the GitHub noreply alias, not the
  real gmail. Also note: a `Copyright (c) 2026 LBond` line is in two ACR
  standalone files (locked ACR files; user aware, not touched).

## Outstanding / blocking
- **Merge #546** (docs-only) when the user says so.

## Pending / parked (offered, not built)
- Login niceties for the OCC sign-in: a "Show" password toggle, and stop the
  Name box auto-capitalizing (add `autocapitalize=none`). User hasn't asked yet.
- Optional stricter branch rules (require PR / approvals / CodeQL check) — not
  enabled to keep the merge flow smooth.
- Cloudflare Access for `/LoadTasks/*` — still parked (SUGGESTIONS_PARKED.md).

## Capability gaps this session
- Can't reach live URLs (`loadeco.app`, `dssorit.github.io`) or `api.github.com`
  from the sandbox — verified blocked. `raw.githubusercontent.com/.../main/...`
  works for confirming `main`. Could NOT read branch-protection settings via any
  tool; relied on the user's screenshots to verify (worked well).
- GitHub MCP dropped/reconnected a couple times (needs re-auth when it drops).
- perl `-0pi` without UTF-8 flags double-encoded occ.html once (mojibake across
  192 lines) — reverted with `git checkout` and redid edits with sed/Edit
  (byte-safe). Lesson: don't use perl with `\x{...}` literals on this UTF-8 file.
- Headless Chromium preview via playwright-core works; used to preview every UI
  change and to exercise the OCC offline (login `Employee`/`employee-change-me`).

## Backups
- Latest verified-working: `backup/2026-07-01-v2.5.2` -> `main` HEAD `89c6a7b`
  (cache v2.5.2). Recover with `git checkout backup/2026-07-01-v2.5.2`.
- Earlier: backup/2026-07-01-v2.4.4, -v2.4.0; backup/2026-06-30-v2.3.7/-v2.3.6/-v2.3.5.

## Today's commit log (oneline, main)
- 89c6a7b OCC: tap-to-note feedback + restyle to match the main Load Tasks look (#545)
- ef445d8 OCC verification upgrades: per-item photo/file/link, big buttons, any-file evidence (#544)
- 6f76853 LoadTasks menu tweaks: Menu on View bar, bold subject titles + session notes (#542)
- e70a03d LoadTasks: make the Menu reachable from the splash screen (#541)
- 3f63b50 LoadTasks: remove horizontal scroll strip, navigate via Menu drawer (#540)
- b769e8d LoadTasks UI redesign: slide-out subject-grouped menu, glassy cards, gold OCC Login (#539)
