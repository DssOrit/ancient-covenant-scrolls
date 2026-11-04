# Session notes 2026-11-04

## Current state
- Branch claude/acr-solar-fix-sandbox-crash, latest commit a1a3b748 (PR #1218, MERGED).
- `main` HEAD after today's merges: acr-solar-v95 (Solar/sw.js), load-v17g88 (load/sw.js).
- Backups pushed today (all verified against origin/main at the time): backup/2026-11-04-load-v17g86, backup/2026-11-04-load-v17g87, backup/2026-11-04-acr-solar-v94.
- Nothing uncommitted.

## Built today
- Delivered the ACR Solar site as a complete zip (590 KB, 13 files) for the user to save, per their request.
- Extended-round functionality audit of Load across 4 parallel background forks (49 items total): text/content tools (14/14 pass), color/image tools + EPUB/PDF export (9/9 pass + EPUB round-trip pass, PDF export confirmed by-design non-in-app), editors/folders/build-tools (10/10 pass), AI/network/audio-adjacent tools (15/16 pass). One real bug found: ai-chat-studio.html crashed on Chat-mode send.
  - **PR #1214 (MERGED)** — fixed the crash: `runChat()` created its "thinking" placeholder card with `text:''` (falsy, so `appendCard()` never created the `<pre>` it then queried, throwing). Changed to `html:'<pre></pre>'`. Cache load-v17g86 -> v17g87.
- Investigated "can Load open the ACR Solar zip" empirically (not just code-read) per user question. Found and root-caused a real, serious Load bug: `injectBundleShim()` embeds every other bundled file as a JSON blob inside a `<script>` tag with no escaping for literal `</script` sequences. Since Solar's zip bundles `diagnostics.html` (which has its own inline `<script>` tag), that literal `</script` prematurely closed the shim's own `<script>` tag in the browser's HTML parser, leaking the rest of diagnostics.html's content into the page as real markup — hijacking `document.title` and the visible body content.
  - **PR #1217 (MERGED)** — escaped `</script` in the bundle JSON before embedding, matching the pattern already used for inlined `<script src>` content in `inlineHtmlAssets()`. Verified: re-imported ACR Solar zip, title/content now correct, zero leak; regression-checked an unaffected zip (ACR Reader) still works. Cache load-v17g87 -> v17g88.
- Re-testing Solar in Load's (now-fixed) sandbox surfaced a second, separate bug: Solar's own `index.html` had unguarded top-level `localStorage`/`serviceWorker` access — same bug class already fixed earlier this session (prior days) in ACR Reader, ACR2, Study — previously masked by the shim-corruption bug above.
  - **PR #1218 (MERGED)** — added the same safe `LS` wrapper pattern (feature-test + in-memory fallback), routed all 16 `localStorage` calls through it, wrapped the `serviceWorker` registration (outer check + deferred `register()`) in try/catch. Verified: direct load still renders correctly (zero errors); re-zipped and re-imported into Load's sandbox — zero uncaught errors now (was 2), real calendar content renders. Cache acr-solar-v94 -> v95.

## Outstanding / blocking
- None from the user. All three PRs shipped today (#1214, #1217, #1218) are merged.

## Pending / parked
- Cosmetic-only Load bug, flagged but not fixed: `load.js`'s `titleGuess` name-extraction regex still picks up the first `<title>` text match anywhere in the processed HTML string — including inert bundle-JSON text from a bundled file like `diagnostics.html` — so the Library tile / viewer-topbar label for the Solar import still reads "ACR Solar — Diagnostics" instead of "ACR Solar", even though the fixed page's actual content and `document.title` are correct. Needs its own "edit Load" round if the user wants it addressed.
- PR #1202 (Load asset-inlining `.replace()` fix, from an earlier day, rebased past #1204/#1208) — status not re-checked today; carried over from prior notes as still open/awaiting merge as of last check.
- PR #1203/#1204/#1198 (ACR2, Study, ACR Reader localStorage fixes from earlier days) — already merged per prior session notes.

## Capability gaps in this session
- None new today. GitHub's PR-creation and branch-push endpoints returned transient 500/502 errors multiple times today (on pushes for both `claude/load-fix-script-tag-escape` and `claude/acr-solar-fix-sandbox-crash`) — all resolved on retry with backoff, no data lost, no PR duplicated (confirmed via `list_pull_requests` before each retry).

## Today's commit log (this session's branches, oneline)
- b82c1db7 Fix zip import corruption when a bundled file contains </script> (PR #1217)
- a1a3b748 Fix ACR Solar crash in Load's sandboxed iframe viewer (PR #1218)
- (Chat Studio crash fix, PR #1214, committed on claude/load-fix-chat-send-crash — see PR for full message)

## Backups
- backup/2026-11-04-load-v17g86 at 57ae80b47bea50253a633fe7a65392976acb4e41
- backup/2026-11-04-load-v17g87 at 583401534440e9aace31be65e5c1c16d36cd19fb
- backup/2026-11-04-acr-solar-v94 at da20be813481efc1b37816a1e7bad13ac54d3705

Recovery: `git checkout backup/<name>`
