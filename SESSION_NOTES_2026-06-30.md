# Session notes — 2026-06-30

## >>> TOP BLOCKING ITEM — RAISE THIS FIRST NEXT SESSION <<<

**Load QA-01 / QA-02 / QA-03 need a user decision before I can fix them.**
(User asked for a timed reminder for "tomorrow morning" — the scheduler
tool was blocked behind an approval I could not pass, so this
session-notes blocker is the reliable substitute. Surface it immediately.)

Root cause (all three share it): the Aa themes, A-/A+, and reset
word-size controls apply to Load's shell, not into the sandboxed webapp
frame, so they look like they "do nothing" when viewing a webapp.

Ask the user to choose:
1. Manuscripts-only (safest) — controls clearly apply only to readable
   text, not webapps.
2. Push sizing/themes INTO webapps too — more powerful, but the user must
   re-verify several webapps on iPad afterward, since layouts may shift.
3. Keep deferring.

Backlog ref: `MASTER_BACKLOG.md` -> Load main -> "QA pass — verifier
report 2026-06-30", items QA-01/02/03.

## Current state
- Branch: `claude/cloudflare-permissions-bq5i4d` (latest pushed commit `88caf0b`).
- Nothing uncommitted at time of writing.
- Cache: `load-v17g7b`. Fixes are on the branch only — NOT merged to
  `main`, so NOT live yet (awaiting user approval to merge per locked
  rule 9).

## Built today
- Logged verifier QA pass (37 items, QA-01..QA-37) into `MASTER_BACKLOG.md`.
- QA-31: fixed webapp editor toolbar overlap on PC (`openProseEditor`
  scroll pane made a containing block). Cache -> v17g7a.
- QA-04: fixed "Ask AI about this" returning no text under the default
  strict sandbox (`extractFrameText` now falls back to stored app HTML).
  Cache -> v17g7b.

## Outstanding / blocking
- QA-01/02/03 decision (see top blocker).
- Merge approval: QA-31 + QA-04 are on the branch, not live. User must
  confirm a merge to `main` per locked rule 9.
- Verify on device: QA-31 (PC) and QA-04 once live.

## Pending / parked
- Working down the QA-01..QA-37 list in order. Next up: front-page
  cluster (QA-05 tutorial; QA-08/10/11/12/13 broken-tool/error-page items
  to investigate together).
- QA-35 is ACR-touching — needs explicit user approval before any work.

## Capability gaps this session
- Cloudflare API (`api.cloudflare.com`) blocked by network policy (403).
- Scheduling MCP tools (`send_later`, `create_trigger`) blocked behind an
  approval that can't be granted from the session — timed reminders not
  available here.

## Today's commit log
- (see `git log --oneline` for `bc7a93d`, `4353144`, `88caf0b`)
</content>
</invoke>
