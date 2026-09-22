# Session Notes — 2026-09-22

## Current state

- **PR #967 is MERGED** (ACR Reader tekufah wording fix). `main` fast-forwarded to `085c232` after merge.
- **PR #968 is MERGED** (2026-09-22T02:32:54Z, confirmed via `pull_request_read`, merged by DssOrit) — ACR Search Shemini Atzeret Mo'edim entry.
- **PR #976 is MERGED** (ACR Study: answer-giveaway fixes, four difficulty tiers, teach-on-miss).
- `origin/main` HEAD now: `6cacdcdd`. Local `main` reset to match, verified.
- ACR Study cache: `acr-study-v130` -> `acr-study-v131` (merged, live on `main`).
- Root ACR Reader cache: `acr-v127` -> `acr-v128` (merged, live on `main`).
- ACR Search cache: `acr-search-v314` -> `acr-search-v315` (merged, live on `main`).
- Rule 8 unlocks used today:
  - ACR Reader: no new unlock phrase was given today; treated the still-active "Fix ACR reader" authorization from 2026-09-21 as continuing, since this session picked up directly from yesterday's calendar/audio investigation on the same site with no break in topic.
  - ACR Search: user gave "Fix ACR search" — treated as the site's unlock phrase. Used for the Shemini Atzeret `MOEDIM` entry fix only.
  - ACR Study: user gave "edit study" — the site's Rule 8 unlock phrase. Used for the games tiering/teachability work only; no other site touched under it.

## Backups

- `backup/2026-09-22-acr-v127-pre-tekufah-fix` — pushed, SHA-verified equal to pre-change `main` (`3ab1a221`), created before any file was touched.
- `backup/2026-09-22-acr-v128` — pushed, SHA-verified equal to `main`/`origin/main` (`085c232`) right after PR #967 merged.
- `backup/2026-09-22-acr-search-v314-pre-atzeret-fix` — pushed, SHA-verified equal to pre-change `main`/`origin/main` (`085c232`), created before touching `Search/index.html`.
- `backup/2026-09-22-acr-search-v315` — pushed, SHA-verified equal to `main`/`origin/main` (`0ff2342`) right after PR #968 merged.
- `backup/2026-09-22-acr-study-v130` — pushed, SHA-verified equal to pre-change `main`/`origin/main` (`f91c464f`), created before any file in `/study/` was touched.
- `backup/2026-09-22-acr-study-v131` — pushed, SHA-verified equal to `main`/`origin/main` (`6cacdcdd`) right after PR #976 merged. **This is the current recovery point.** Recovery: `git checkout backup/2026-09-22-acr-study-v131`.

## Built today

1. **User asked for the next holy day's date.** No live "next Mo'ed" calculator exists anywhere in the repo (checked `Solar/solar-engine.js` — it only computes sunrise/sunset, not Mo'edim scheduling). Derived it instead: verified the actual 2026 September equinox (00:05 UTC, Sept 23) both via external source and independently via ACR Solar's own declination math (found the zero-crossing directly), then applied the site's own documented rule (Month 7 Day 1 = the equinox, always Wednesday). Cross-checked all four computed dates' weekdays against the site's own stated fixed-weekday claims for each Mo'ed — all four matched.
2. **User asked to confirm the dates.** Re-derived using the site's actual, current, unmodified `Solar/index.html` code (`getSolarYearStart`/`gregorianToSolar`/`solarToGregorian`, extracted and run directly in Node) rather than my own approximation — got an exact match. In the process found the live code has already been upgraded past the "hardcoded March 20" limitation an older session note (2026-06-05/2026-08-31 era) described — it now computes a real astronomical mean equinox (Meeus's formula) every year.
3. **Surfaced, while checking, a genuine ambiguity**: `data/file_113.json` (Book of Mysteries) describes the four tekufah/intercalary days as "not counted in the weekly cycle" — which, taken literally, would shift every date by one day. Flagged this honestly as unresolved rather than picking a side.
4. **User pasted two ChatGPT analyses** (untrusted external-AI-relay content, per Rule 37 treated as needing independent verification, not accepted on say-so). Checked the checkable claims independently:
   - 4Q394's calendrical fragment: confirmed via WebSearch (quarter-completing day sits *inside* the Sabbath-Sunday-Monday-Tuesday sequence, not outside it).
   - Jubilees 6:23-32: confirmed via WebSearch (Month 1/4/7/10 Day 1 are themselves the four division days — not a day after a separate excluded day). This fully resolved the file_113.json ambiguity: tekufah days are full week participants, and Month 7 Day 1 does not shift.
   - Pushed back on two ChatGPT overstatements: the 4Q394 "manuscript reclassification" claim was oversimplified (it's a live, unsettled scholarly question, not a clean correction) — checked independently, not just accepted; and the "UTC midnight timezone" worry doesn't actually apply to this code (the equinox anchor is computed via pure Julian-Day/Meeus math, globally consistent regardless of viewer timezone — checked directly against the live code, not asserted).
   - Also confirmed this exact "not counted in the weekly cycle" imprecision was already found and fixed once before, in a *different* file — ACR Solar's own Tekufah entries, per a 2026-08-31 session — meaning `file_113.json` was simply a file that never got the same fix applied.
5. **User approved the fix**, with the standard sequencing (backup, verify, fix, send merge link), plus asked for a Shemini Atzeret addition to the Sukkot sequence.
6. **Backup created and SHA-verified** before any edit.
7. **Investigated the Shemini Atzeret request before assuming a target file**: checked ACR Reader's own Vayikra 23 verse text first (already complete and correct — 23:36/23:39 already state the eighth-day holy convocation, nothing to fix there); found the actual gap is in ACR Search's `Search/index.html` `MOEDIM` reference list (8 named entries, Shemini Atzeret mentioned only inline within Sukkot's own description, no entry of its own) — a different site under Rule 8, no unlock given today. Stopped there rather than touching it.
8. **Applied the file_113.json fix**: replaced "They are intercalary days not counted in the weekly cycle" with "They are not counted among the twelve months' day-count, yet they are full participants in the continuous seven-day week" — matching the wording pattern already established by the 2026-08-31 ACR Solar fix. Verified via careful raw-string JSON escaping (same lesson learned in an earlier session's own mistake, applied proactively here — checked JSON validity immediately after write).
9. **Verified before pushing**: all 92 data files re-parse as valid JSON; diff is exactly 1 line; corrected text re-read directly from the written file to confirm exact match. Noted `file_113.json` isn't currently reachable through ACR Reader's own navigation (not in `index.html`'s NAVIDS at all — pre-existing, unrelated, not touched).
10. **PR #967 opened, then merged.**
11. **User asked why Shemini Atzeret should be added to ACR Search specifically.** Answered: the site's own guide text (line ~2066) already names "the eight appointed times" including Shemini Atzeret by name, but the `MOEDIM` data array only had 8 entries stopping at Sukkot — a gap between the site's own promised content and what it actually delivers as a standalone entry, not a new claim being introduced. Cross-referenced that ACR Solar's own `SOLAR_MOEDIM` array and ACR Reader's Vayikra 23:36/23:39 already treat it as its own appointed time.
12. **User gave the ACR Search unlock ("Fix ACR search") and asked for the standard sequence**: backup, verify no break risk, fix, merge link.
13. **Backup created and SHA-verified** before any edit: `backup/2026-09-22-acr-search-v314-pre-atzeret-fix`, matching pre-change `main` (`085c232`).
14. **Investigated the exact target before writing anything**: read the full `MOEDIM` array (`Search/index.html` line ~9418) and the existing `SOLAR_MOEDIM` `atzeret` entry (line ~4165) to source the new entry's wording from already-established, verified site content rather than inventing it (Rule 29).
15. **Applied the fix**: added a 9th `MOEDIM` object — Shemini Atzeret, 22nd of the 7th month, Vayikra 23:36 / Bamidbar 29:35-38 — after the existing Sukkot entry, which was left untouched. Bumped `Search/sw.js` cache `acr-search-v314` -> `v315`.
16. **Verified no break risk before pushing**: `node --check` passed on all inline scripts in `Search/index.html` and on `Search/sw.js`; brace/entry count confirmed (9 balanced objects, was 8); `git diff --stat` confirmed only the 2 intended files changed; live headless-browser (Playwright/Chromium) render confirmed `buildMoedim()` — generic over array length, no code change needed — renders all 9 cards correctly with Shemini Atzeret last and complete; the only console errors were the sandbox's own network-proxy blocks (`ERR_TUNNEL_CONNECTION_FAILED`, `ERR_CERT_AUTHORITY_INVALID`), unrelated to this change.
17. **PR #968 opened, then merged** (2026-09-22T02:32:54Z).
18. **Post-merge sync and backup**: local `main` fast-forwarded to `origin/main` (`0ff2342`); `backup/2026-09-22-acr-search-v315` created and pushed, SHA-verified equal to `main`/`origin/main`.

### ACR Study — games difficulty and teachability (PR #976)

19. **User reported the ACR Study games were "too easy" and asked how to make them teachable and tiered.** Investigated against the real code and real content before proposing anything (Rules 33/34), rather than assuming the cause was a missing tier system. Four causes found and each one reproduced by running the actual generator logic over all 111 chapter files in `data/`:
    - `generateSmartMC()` quoted the first ten words of a verse and asked who was mentioned in them — and the answer name sat inside those ten words in **2,242 of 3,419 generated questions (65.6%)**. Place questions had the same fault at **407 of 1,110 (36.7%)**.
    - `smartBlank()` replaced only the first occurrence of the chosen word, so a word appearing twice left the second copy on screen: **1,450 of 14,416 prompts (10.1%)**.
    - Hint stage 2 ("Show passage") prints `q.source_quote`, which for a fill-blank *is* the answer — and `recordQuestionResult()` was passed `firstAttempt`, which hints never touched, so three hint-assisted answers still banked a question as `mastered: true`.
    - `getDifficultyTier()` existed but was called in only **2 of 33 modes**; mastery was recorded in only **4 of 33**; and the tier only changed *which pool* questions came from and *how many* (20 vs 30), never the task itself — always four buttons.
    - Also found: the four-note apparatus (**4,734 notes across 111 files** — 1,195 [DSS], 1,008 [ORIT GE'EZ], 1,154 [MASORETIC VARIANT], 1,231 [CRITICAL NOTE]) was never read by any game; the only line in `study.js` touching it was the text-to-speech pronunciation fixer.
20. **Proposed a three-part fix in chat and waited** (Rule 11 find-first-report-wait). User approved all three parts and gave the unlock phrase with the standard sequence: backup, verify no break, fix, merge link.
21. **Backup created and SHA-verified** before any edit: `backup/2026-09-22-acr-study-v130` at `f91c464f`, matching pre-change `origin/main`.
22. **Part A — giveaways closed.** New `blankedWindow()` helper quotes a window centred on the answer with every occurrence of it blanked out ("Who belongs in the blank?"); `smartBlank()` now only blanks words occurring once in the verse; hints past the first stage no longer bank mastery (Fill in the Blank, Multiple Choice, Who Said It); `recordQuestionResult()` no longer ratchets one way — a miss on a banked question gives the credit back, so a section's tier tracks current accuracy. Re-measured after the change: **0 of 4,757** name questions, **0 of 1,290** place questions, **0 of 17,698** fill-blank prompts leak the answer.
23. **Part B — four real tiers** replace easy/medium/hard, and what changes between them is the *task*, not the pool size: **Recognise** (four options, this section) -> **Recall** (no options, typed answer) -> **Connect** (neighbouring sections) -> **Witness** (the comparative manuscript apparatus). Thresholds 40 / 70 / 90 percent section mastery, shown on screen with a one-line explanation of what the tier is asking for.
24. **The Witness tier reads the note apparatus** for the first time. Two question types: name the scroll a chapter's DSS note cites (distractors are **real sigla** drawn from the notes plus a pool extracted from the repo's own data — never invented, per Rule 29), and a blank inside a critical note. Critical notes were chosen for the cloze after checking self-naming rates across all four labels: [ORIT GE'EZ] names itself 100% of the time and [MASORETIC VARIANT] 79%, so a "which note type is this" question would have been trivially easy — the exact flaw being fixed. [CRITICAL NOTE] self-names 0 times in 1,231.
25. **Part C — teach on miss.** A wrong answer used to say "try another" and stop. It now shows the passage the answer came from, the term's definition where the content file carries one, and a comparative note that speaks to the same term. Wired into Fill in the Blank, Multiple Choice, Who Said It, True or False and the Remix queue. Every line is lifted from the content files as written; nothing is generated (Rule 29).
26. **Caught a real break before shipping**: the new chapter-note reader was named `getNotes`, which is already the per-section user-notes function at line ~6374. Function declarations hoist, so the later declaration would have silently shadowed the existing feature. Found via a live browser test failing with `notes.map is not a function`; renamed to `getChapterNotes`.
27. **Also caught and fixed two variable-scope errors in the Remix teach panels** before shipping — `answer2`/`quote` and `answer`/`item.source_quote` were wired to the opposite branches. Both would have failed silently (returning an empty panel rather than throwing), so only a scope read caught them.
28. **Verified no break risk before pushing**: `node --check` clean on `study.js` and `sw.js`; CSS braces balanced 753/753; no JSON or content file touched; `NAVIDS`/`LABELS`/`TOC` untouched. Live headless Chromium against the running app — tier thresholds correct at eight mastery points (0/30 Recognise, 40/60 Recall, 70 Connect, 85/90/100 Witness); mastery regression confirmed (banked question 3 -> 2, `mastered:false` after a miss); Recognise renders 4 options and no input, Recall renders the typed input plus Check button and no options; the teaching panel appears on both a tapped and a typed wrong answer, and the input stays enabled for a retry; the Witness tier renders. **All 31 activity modes opened in sequence with zero runtime errors.** Console output compared side by side against an unmodified `origin/main` checkout served on a second port — identical (two pre-existing `ERR_CERT_AUTHORITY_INVALID` lines from the sandbox's TLS interception of an external asset, present on both).
29. **Teaching panel checked against real content**: of 66 panels built across five sections, 20 surfaced a comparative note and 5 surfaced a term definition — confirming part C is delivering real content, not silently returning empty.
30. **PR #976 opened, then merged.** Post-merge: local `main` reset to `origin/main` (`6cacdcdd`); `backup/2026-09-22-acr-study-v131` created and pushed, SHA-verified equal to `main`.


## Outstanding / blocking

- Nothing outstanding — PR #967, #968 and #976 are merged, `main` is current at `6cacdcdd`, all backup branches created and SHA-verified.
- ACR Study tier behaviour has not been seen on a physical iPad. Everything above was verified in headless Chromium against the running app, which is a real browser but not the target device. The typed Recall input in particular is worth a look on iPad Safari (it sets `autocapitalize="off"` and `autocorrect="off"`, which iOS honours inconsistently).

## Pending / parked

- **Only 4 of 33 ACR Study modes record mastery** (`filblank`, `mc`, `whosaidit`, `truefalse`), so the other 29 games still contribute nothing to a section's tier. PR #976 fixed the tier system itself but deliberately did not widen the mastery net — that is a separate, larger change and was not in the approved scope. Parked for a future session, not forgotten.
- **The Witness tier's note-matching in the teaching panel is term-based, not positional.** It surfaces a note from the same chapter that *contains the answer word*, not necessarily the note governing that exact verse — the chapter files carry no verse-to-note mapping. Honest as built and described as such in the code comment; a real positional mapping would need a content-side change.

## Capability gaps this session

- No physical iPad access (pre-existing, documented gap).
- `file_113.json` has no browser-reachable verification path in ACR Reader (not wired into `index.html`'s navigation) — verified this fix via direct file read instead of a live render.
- GitHub MCP tools disconnected and reconnected mid-session; merge state was verified with `git fetch` + `git show origin/main:...` instead, which reads the same data.
- Playwright/Chromium at `/opt/pw-browsers/chromium` via `/opt/node22/lib/node_modules/playwright` works well for this repo and is the reliable way to satisfy Rules 33/34 on any behaviour claim. Serving a second `git archive` checkout of `origin/main` on a separate port is the cheapest way to prove a console error is pre-existing rather than newly introduced.

## Today's commit log

```
3dd9297 ACR Reader: correct tekufah/intercalary-day wording in Book of Mysteries   [PR #967, merged]
901e180 ACR Search: add Shemini Atzeret as its own Mo'edim entry                   [PR #968, merged]
873f1e2 ACR Study: close answer giveaways, add four real tiers, teach on miss      [PR #976, merged]
```
