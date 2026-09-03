# Session Notes — 2026-09-03

## Start here next session

**Yovelim (Jubilees) Part 1 rebuild is mid-diagnosis, blocked on sourcing
access — nothing written to any site yet.** Read "Outstanding / blocking"
below before doing anything else with Yovelim. The user gave the "edit ACR
reader" unlock phrase today and asked to fix Chapter 17 specifically, but
the fix could not start because there is currently no working way to pull
real primary-source text (DSS transcription or Ge'ez Orit) for the missing
verses — using Charles's translation instead would repeat the exact
violation (Rule 35) that started this whole audit. Three options are on
the table for the user to choose from (see below) — nothing should be
written for Chapter 17 (or any other Yovelim chapter) until one is picked.

## Current state

- Branch: `claude/dead-sea-scrolls-resources-vuxq1q`. Working tree clean,
  nothing uncommitted.
- `main` HEAD at session start / still current: `1ae5212`.
- No PRs opened today. No site file has been written to.
- ACR Reader `sw.js` cache: `acr-v118` (unchanged today).

## Built today

Today was entirely diagnosis and a source-access investigation — no
shipping. Full detail:

1. **Verified five/seven of the user's named Yovelim source URLs are
   reachable** (`deadseascrolls.org.il`, `www.deadseascrolls.org.il`,
   `wellcomecollection.org`, `kb.osu.edu`, `lirias.kuleuven.be`,
   `archive.org`, `pseudepigrapha.com/jubilees/`) — all return HTTP 200 to
   a plain request. **Important caveat added later in the session: "reachable"
   only meant the server responds to a basic HTTP request — it does NOT
   mean usable manuscript/article content can actually be pulled from
   them.** That distinction wasn't made clear when first reported, and the
   user acted on the reachability claim (updated the environment's network
   policy) before the gap surfaced. See "Capability gaps" below for the
   full account, including where an explanation given to the user (network
   policy applies from session start) was checked and found **not** to be
   the actual cause — that self-correction is recorded here in full since
   Rule 33 requires naming a wrong claim out loud, not just quietly fixing
   the next answer.

2. **Reviewed 5 uploaded files** (a ChatGPT-authored PDF report, two
   "NEW" Part 1/Part 2 scaffold `.docx` files, one `__YOVELIM_PART_ONE_
   COMPLETE.docx`, one `Yovelim_Ch3_7_10_REPAIRED.docx`) by unzipping each
   `.docx` and reading `word/document.xml` directly — never trusted a
   file's name or its own self-description. Findings:
   - The two "NEW" files are confirmed reconstruction-audit **scaffolds**
     (ledger + disposition table + quarantined "CURRENT ACR TEXT — AUDIT
     ARTIFACT" per chapter), not finished replacement text — matches what
     the PDF claimed.
   - **The PDF's central example (Chapter 1) is stale.** Checked the
     scaffold's own "current ACR text" for Ch 1 against the actual live
     `data/file_16.json` — they don't match. Live Chapter 1 already has
     the correct 29-unit apostasy→restoration→creation-transition
     structure; the scaffold's captured "31-unit, creation-displaced"
     version is an older snapshot.
   - Systematically compared the scaffold's "Current labels" verse counts
     against live data for all 50 chapters: **Part 2 (ch 26–50) matches
     live exactly on all 25 chapters** (scaffold's audit is still current
     there). **Part 1 (ch 1–25) mismatches on 20 of 25 chapters** — Part 1
     was edited on the live site after this scaffold was captured, so its
     numbers are stale and should not be trusted as-is.
   - **Confirmed via direct comparison against R. H. Charles's actual 1902
     translation** (fetched live from `pseudepigrapha.com/jubilees/`, the
     user's own named control source) that both `__YOVELIM_PART_ONE_
     COMPLETE.docx` and `Yovelim_Ch3_7_10_REPAIRED.docx` contain Charles's
     own English wording verbatim in substance — Hebrew names Hebraized
     (Moses→Moshe, Israel→Yisra'EL, Egypt→Mitzrayim) and "Lord/God"→"YHWH"
     — not independent Ge'ez/DSS-sourced reconstruction, despite the
     "COMPLETE" file's own header claiming "Complete and Verified" against
     primary sources. This is the exact failure mode Rule 35 (added to
     `CLAUDE.md` earlier today via PR #874, before this session started)
     exists to catch. Live Chapter 1 text also matches this Charles-based
     pattern — this is not a new problem introduced by today's files, it
     looks like the volume's existing baseline.
   - `Yovelim_Ch3_7_10_REPAIRED.docx`'s stated reason for replacing
     Chapter 7 ("inverted curse — Kham not cursed" + "fabricated verses
     14, 16–17") does **not** hold up against live Chapter 7, which
     already correctly reads "Cursed be Kena'an" at 7:9–11, and doesn't
     even contain verses 14/16/17 (they're skipped, not fabricated). That
     claim describes some other/older version, not current `main`.

3. **Independent, from-scratch verification pass against the live site**
   (not relying on any uploaded document) — extracted every chapter's
   verse numbers directly from the `data-ptype="verse"` HTML spans in
   `data/file_16.json` and `data/file_17.json`:
   - **Part 1, chapters 1–5: clean, no internal gaps.**
   - **Part 1, chapters 6–25 (20 of 25 chapters): severe internal verse
     gaps**, confirmed against raw HTML, not just a text-extraction
     artifact (caught and fixed one real regex bug of my own along the
     way — a chapter-header token contaminating a verse-count regex —
     before it produced a false reading, per Rule 33/34). Worst case:
     **Chapter 17 has only 3 verses present (17:14–16)** — the entire
     opening of the Akedah chapter is gone. Other examples: Ch 8 (9 of 29
     verses), Ch 13 (7 of 29), Ch 10 (skips 10:4 and 10:6, cuts off
     completely at 10:14, missing the whole Tower of Bavel section), Ch 7
     (skips 7:12–19 and 7:24–26, ends at 7:28).
   - **Part 2, chapters 26–50: no internal gaps** — every verse present in
     the current range is there — but most chapters end well short of the
     traditional/Charles-control range (trailing truncation, a different
     defect pattern than Part 1's scattered gaps).
   - Full missing-verse list for all 20 affected Part 1 chapters exists in
     scratch output from this session (not yet written to a permanent
     repo file) — regenerate with the extraction script logic described
     in this session's transcript if needed again; it was not saved as a
     standalone script.
   - **Not yet verified**: the `[DSS]`/`[ORIT GE'EZ]` note-apparatus
     claims (e.g. "4QJube (4Q220) preserves portions of Chapter 10")
     against actual IAA records — blocked, see below.

4. **User gave the "edit ACR reader" unlock phrase and asked to fix
   Chapter 17**, with the sequence: backup → verify no break → confirm
   accuracy per plan → PR link for user to merge (never self-merge, per
   Rule 9). Backup step completed and verified (see "Backups" below).
   **The actual fix could not start** — see "Outstanding / blocking".

## Outstanding / blocking

- **No working source of real primary-source wording for the missing
  Yovelim verses right now.** Rule 35 requires DSS Hebrew fragments
  (where extant) and the Ge'ez Orit continuous text as the actual sources
  — Charles is control-only, never source. Investigated all of the user's
  named sources this session; none currently yield usable manuscript
  content:
  - `deadseascrolls.org.il` (IAA Leon Levy Library) — real content is
    loaded by client-side JavaScript (Vue app); plain `curl` only returns
    the empty shell. A headless browser (Playwright + Chromium, available
    in this sandbox) was tried multiple ways and fails every time with
    the *same* host-specific failure — see "Capability gaps".
  - `kb.osu.edu` (home of VanderKam & Milik's 1994 preliminary edition of
    4Q221 — one of the two manuscripts the site's own live notes cite for
    Ch 17) — same problem, different framework (Angular/DSpace).
  - `wellcomecollection.org` — root domain loads, but a search-query
    request returned HTTP 403.
  - What *is* reachable: `archive.org` and `pseudepigrapha.com` (both
    Charles — control-only, unusable as source per Rule 35), and LIRIAS
    (Tigchelaar's papers, direct PDF links work) — but Tigchelaar's papers
    are textual-critical argument pieces, not a transcription of
    4Q218/4Q221 covering Ch 17's missing verses.
  - **Three options put to the user, awaiting a decision:**
    1. User supplies the actual source text directly (a Ge'ez Orit
       translation already in hand, or the VanderKam/Milik 1994 4Q221
       article / DJD XIII pages as a file upload).
    2. Keep trying alternate access routes to IAA/OSU from this sandbox
       (no guarantee of success — see capability gap below).
    3. Leave Chapter 17 as-is (verses 14–16 only) with an honest in-app
       gap note, rather than force a fix without real sourcing.
  - **Not yet answered by the user as of end of session.**

## Pending / parked

- **Yovelim Part 1, chapters 6–25 (20 chapters) need real reconstruction**
  once the sourcing-access question above is resolved — this is a large
  body of work, not just Chapter 17. Chapter 17 was picked as the first
  target because it's the worst confirmed case.
- **Yovelim Part 2, chapters 26–50** have a different, second defect
  pattern (trailing truncation vs. Part 1's internal gaps) — not yet
  scoped for a fix plan, flagged for awareness only.
- **DSS/Ge'ez note-apparatus verification** (the `[DSS]`/`[ORIT GE'EZ]`
  claims in existing chapter notes) against actual IAA records — blocked
  on the same sourcing-access problem above.

## Capability gaps in this session

- **Headless browser (Playwright + Chromium) cannot reach
  `www.deadseascrolls.org.il` from this sandbox.** Confirmed via the
  agent-proxy status endpoint (`$HTTPS_PROXY/__agentproxy/status`,
  `recentRelayFailures`): every attempt logs as `ws_closed_mid_exchange`
  (tunnel opened, ~1.7–1.8KB sent — consistent with a TLS ClientHello —
  only 39 bytes received back, connection dead ~6s later). This is a
  **different failure category** from an actual policy block (compare:
  `www.google.com`/`android.clients.google.com` failures in the same log
  show `connect_rejected` / "403 to CONNECT", i.e. an explicit policy
  denial). Plain `curl` completes a full TLS handshake and gets a real
  200 response from the identical host in the identical session. Ruled
  out an explanation offered mid-session ("session predates a network
  policy update") by re-testing after the user updated the policy and
  seeing the identical `ws_closed_mid_exchange` failure — that explanation
  was wrong and was corrected to the user directly. Root cause is
  unconfirmed; working hypothesis (not verified) is TLS-fingerprint-based
  discrimination between a browser client and `curl` at the destination or
  an intermediate layer, unrelated to the proxy's domain policy. Worth
  trying a different approach next session (e.g. a different browser
  engine, or check whether OSU KB's Angular/DSpace app has the same
  browser-specific failure or a different one) if the user wants sandbox
  access pursued further rather than supplying source material directly.
- **`kb.osu.edu`'s DSpace item pages are also a JS SPA** (Angular) — same
  category of problem as IAA, not yet tested with a headless browser
  (session ran out of scope investigating IAA first).
- **`wellcomecollection.org`'s search endpoint returned HTTP 403** to a
  plain `curl` request — not investigated further this session.

## Today's commit log (newest first)

No commits to `main` today from this session. `main` HEAD is still
`1ae5212` (last commit before this session started, PR #874 merge — Rule
35/36 additions to `CLAUDE.md`, done in an earlier session).

## Backups

- **`backup/2026-09-03-acr-v118`** — created and pushed this session,
  pointing at `main` HEAD `1ae5212` (`acr-v118`). Verified: the pushed
  branch's remote SHA matches `origin/main`'s SHA at the moment of backup
  (`git ls-remote origin refs/heads/backup/2026-09-03-acr-v118` returned
  `1ae52122b9998acc259666a298ed4bb67b2a32cb`, identical to `origin/main`).
  This covers the current state of `main` — no site file has changed
  since, so this backup is still the correct recovery point at end of
  session.
