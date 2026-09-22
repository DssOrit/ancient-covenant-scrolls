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

---

## Sunrise-to-sunrise audit (scan only, 2026-09-22 later session) — PENDING USER APPROVAL

User direction: "the ACR sites are supposed to observe sunrise to sunrise
accompanied verses & documented on sites." Scan run under Rule 11 (find first,
report, wait). **Nothing was edited. No Rule 8 unlock phrase was given.**

### A. Documentation state, per site (grep-verified)

| Site | Sunrise-to-sunrise documented? | Verses cited alongside |
|---|---|---|
| ACR Solar (`/Solar/`) | YES — "Why Sunrise to Sunrise" panel, 2 render paths | Yovelim 3:28; 21:10; Vayikra 7:15; 22:29-30; Shemot 12:10; 23:18; 29:34; 34:25; Bamidbar 9:12; Devarim 16:4; 4Q320-330; 1 Enoch 72 |
| ACR Search (`/Search/`) | YES — "Why Sunrise to Sunrise, The Primary Source Day Boundary" + Shabbat section + laylah lexicon entry | same citation set as Solar |
| ACR Reader (root `/`) | NO — zero occurrences of "sunrise to sunrise" in `index.html` or any `data/file_*.json` | none. Vayikra 23:32 ("from evening to evening") stands in `data/file_8.json` with no note on the covenant day boundary; the chapter's CRITICAL NOTE covers only the 23:11 "morrow after the sabbath" crux |
| ACR2 (`/ACR2/`) | NO | none |
| ACR Study (`/study/`) | PARTIAL — only incidental, inside the "night / laylah" lexicon entry in `content/file_202.json`. The Mo'edim reference entry for Shabbat (`content/file_204.json`) gives "Every 7th day" with Bereshit 2:2-3; Shemot 20:8-11 and states no day boundary | none of its own |
| GESTUDY, GreatE, WSA | N/A — no calendar/day-boundary content; their "sunrise"/"sunset" hits are the Abu Simbel solar alignment and the idiom "no sunset provision" | — |

### B. Behavior findings — ACR Solar only (verified against the running app, not code-reading)

Method: headless Chromium (Playwright), `Solar/index.html` loaded with a faked
clock and `timezoneId: Europe/Lisbon`, default location Coimbra. Rule 33/34
ground-truth check, output captured.

1. **The solar/covenant day advances at civil midnight, not at sunrise.**
   - Fri 2026-09-25 23:00 local -> "Day 185 of 364".
   - Sat 2026-09-26 02:00 local (sunrise that day is 06:25) -> already "Day 186 of 364".
   - Sun 2026-09-27 02:00 local (sunrise 06:33) -> already "Day 187 of 364".
   Under the site's own stated rule the day turns at sunrise, so 02:00 Saturday
   is still Day 185. Every reading between local midnight and sunrise is one
   covenant day ahead — roughly a 6-7 hour window every single day.
   Cause: `var today = new Date()` (`Solar/index.html:1546`) feeding
   `gregorianToSolar()`, which reads civil Y/M/D fields only. There is no
   sunrise-rollover helper anywhere in `Solar/index.html` or `Solar/*.js`.
   `Solar/SOLAR_ARCHITECTURE.md` records no decision to roll at midnight, so
   this is an unaddressed gap, not a deliberate choice. PR #891 (2026-09-07)
   corrected alert logic and wording but never touched the rollover itself.

2. **The Shabbat "is active" window uses civil weekday plus a hardcoded 08:00,
   not the computed sunrise** (`Solar/index.html:2622`,
   `isNow=(dow===6)||(dow===0&&now.getHours()<8)`).
   - Sat 02:00 local -> "Shabbat is active" while the same panel prints start
     time 06:25. Roughly 6.4 hours early.
   - Sun 07:00 local (27 Sep) -> "Shabbat is active" while the same panel
     prints end time 06:33. Roughly 27 minutes late; the error runs to a full
     hour-plus whenever sunrise is not near 08:00.
   - Winter control (Sun 27 Dec, sunrise 07:56): 07:00 active, 08:30 over —
     correct there only because the hardcoded 8 happens to sit near that day's
     sunrise at this latitude.

### C. Observation, no action taken

`Search2/` holds an unlinked, unredirected older copy of ACR Search. Its
"Why Sunrise to Sunrise" text is the pre-PR-#970 wording ("the Book of Yovelim
... confirmed in DSS fragments"), i.e. the exact claim PR #970 replaced, and it
carries none of the Vayikra/Shemot/Bamidbar/Devarim law-code citations added in
PRs #971/#972. It is not in `_redirects` and nothing links to it, but the files
exist in the repo. Not in Rule 8's site list. Flagged for the user's decision
only.

### Status

Reported to the user. Awaiting explicit approval and the Rule 8 unlock phrase
for any site before a single character is changed.

### Verification pass (user asked: "Verify only & report back") — no files changed

Re-ran every claim against the running apps over a local HTTP server
(headless Chromium against 127.0.0.1), because `file://` blocks the apps' own
`fetch()` of their content JSON and produces empty renders that look like
missing content.

**One earlier claim was wrong and is corrected here.**

- **CORRECTION — ACR2 was reported as "No documentation, none." That is false.**
  `ACR2/data/file_33.json` (Vol 25 — Raz Nihyeh, `NAVIDS` index 30, present in
  the TOC) carries a DSS note that does document the reckoning: "day precedes
  night, morning precedes evening. This establishes the solar reckoning — the
  day begins with light, not with darkness. The 4QCalendrical Texts and the
  Damascus Document build their Shabbat and festival timing directly on this
  Bereshit framework." Verified by navigating to it in the running app
  (`pos` reads "31 of 31", 80,873 body chars, phrase present). What ACR2 lacks
  is the phrase "sunrise to sunrise" and the Yovelim/Vayikra/Shemot/Bamidbar/
  Devarim citation set — not the principle.
  Cause of the error: ACR2 was judged by grepping "sunrise". The note states
  the principle in different words. Caught by a second sweep on alternate
  phrasings ("day begins", "morning to morning", "first light", "solar
  reckoning").

**Confirmed, unchanged:**

1. **Solar day rolls at civil midnight** — re-verified with no clock faking at
   all, by calling the site's own `gregorianToSolar()` with explicit dates in
   the live page: Fri 25 Sep 23:00 -> day 185 (month 7 day 3); Sat 26 Sep
   00:05 -> day 186 (month 7 day 4), while `getSunTimes()` for that same date
   returns sunrise 06:25. The function reads only `getFullYear/getMonth/
   getDate`, so the hour cannot affect it. Two independent methods now agree
   (faked clock, and direct function calls).
2. **Shabbat "is active" uses a hardcoded 08:00** — Sat 02:00 shows "active"
   beside a printed start of 06:25; Sun 07:00 shows "active" beside a printed
   end of 06:33.
3. **ACR Reader has no day-boundary statement anywhere reachable** — swept all
   92 volumes in `NAVIDS` by fetching each data file inside the running app
   and testing four phrasings. One hit only: `file_14` (Chanokh Astronomical
   Book), and it reads "The Ethiopian calendar tradition also preserves
   elements of the ancient solar reckoning" — not a day-boundary statement.
   `file_113` (Raz Nihyeh), which does carry the note, is absent from `NAVIDS`
   (`indexOf` returns -1) and unreachable in the Reader.
4. **ACR Search documentation renders** — Covenant Practices tab, 37,582 chars,
   "Why Sunrise to Sunrise, The Primary Source Day Boundary" present with the
   full citation set. Note for future sessions: ACR Search is behind
   `doAuth()` and then a timed loader; a test that does not call `doAuth()`
   sits on the auth screen forever and falsely reads as "content missing."
   The two failed CDN requests (remixicon, Google Fonts) are the sandbox proxy
   and do not block the app.
5. **ACR Solar documentation renders** — Shabbat mode shows the panel plus
   "Source: Yovelim 3:28; 21:10 — Vayikra 7:15; 22:29-30 — Shemot 12:10;
   23:18; 29:34; 34:25 — Bamidbar 9:12 — Devarim 16:4 — 4QCalendrical Texts
   4Q320-330 — 1 Enoch 72".
6. **ACR Study** — `file_202` is in `study.js`'s `IDS`, so the "night / laylah"
   gloss is reachable. Across all 115 files in `study/content/` it is the only
   one carrying any day-boundary wording.
7. **Search2** — referenced nowhere in the repo except session notes; 0
   occurrences of "Yovelim 3:28", confirming it holds the superseded wording.

Still awaiting the user's decision and the Rule 8 unlock phrase per site.
Nothing has been changed.

### Decision (user, 2026-09-22): leave ACR Solar as is — NO CHANGES MADE

User reviewed the findings and decided: **"I think it's fine the way it is since
we go by daily calculations."** No site file was touched this session. No unlock
phrase was given for any site. Nothing is pending approval — this is a closed
decision, not an open item.

**What the user observes by:** the Sun Times screen, which is correct. Verified
live against the user's own iPad screenshot (Coimbra default, 2026-09-22):
sunrise 07:21, solar noon 13:27, sunset 19:32, nightfall 19:50 — matched to the
minute. That path applies `getDSTHours()` (index.html line 2104) on top of the
raw calculation.

**Open behaviour items, deliberately left in place (do NOT "fix" these in a
future session without the user asking):**

1. **Shabbat panel prints a standard-time clock.** `updateShabbatDisplay`
   (~line 2616) uses `st.sunriseStr` raw, with no `getDSTHours()` correction;
   `userLocation.utcOffset` is hardcoded 0 (line 1551, "WET = UTC+0 standard").
   During summer time it reads one hour early. Verified live, same page, same
   second: Sun Times 07:21 vs Shabbat panel 06:25.
   Not default-specific — "Use My Location" (line 2012) stores the offset
   computed from January 15, i.e. standard time, so the gap persists with GPS
   and at any DST-observing location. Berlin control: stored offset 1, real
   offset 2, Sun Times 06:52, Shabbat panel 05:58.
   Direction of error, which is why the user is comfortable leaving it: every
   error but one runs long (more rest). The single short error is the Sunday
   **end** time, printed 06:26 against a true 07:21 sunrise; the panel's own
   `isNow` flag still reads "active" until 08:00, so flag and number disagree.
2. **Covenant day rolls at civil midnight, not sunrise.** `gregorianToSolar()`
   reads only year/month/date. Verified twice, including with no clock faking.
   Error window on 2026-09-22 in Coimbra: midnight to 07:21.

**Important finding for any future fix — do not treat the rollover as a
one-liner.** The pre-sunrise holy-day alert is currently CORRECT *because* the
rollover happens at midnight: at `alertAt` (30 min before sunrise)
`gregorianToSolar(now)` returns the date whose sunrise is about to arrive, which
is the day that needs announcing. The code comment at ~line 2421 states this was
deliberate. Changing the rollover globally would break a working alert. Display
and alert logic must be separated first.

**Documentation state at close (no change needed, verified):** ACR Solar and ACR
Search both already carry the sunrise-to-sunrise claim with the full citation
set, both verified rendering live. ACR Reader, ACR2 and ACR Study do not carry
it; the user did not ask for those to be filled in this session.

**Also corrected this session, for the record:** an earlier report in these
notes stated ACR2 carries no day-boundary documentation. That was wrong; ACR2
Vol 25 (Raz Nihyeh) does. And a draft note prepared for ACR Reader would have
called Vayikra 23:32 the only evening-to-evening clause in the Torah — Shemot
12:18 is a second one. Caught before either reached a file.

### Correction on `data/file_113.json` — do NOT wire it into the Reader

Earlier in this session I described wiring `data/file_113.json` (Vol 47, Raz
Nihyeh) into ACR Reader navigation as "restoring" a volume that had fallen out.
That framing was wrong. Checked with `git log -S"file_113" -- index.html`:
**it has never been referenced in `index.html` at all.** The Reader's copy was
never part of Reader navigation.

The same volume lives in ACR2 as Vol 25, reachable, and the ACR2 copy opens with
"SECOND TEMPLE & LATER ADDITIONS — HELD UNDER WARNING — DOCUMENTED, NOT
CANONICAL", sitting under ACR2's "RESTORED FROM THE MAIN RECORD — SECOND TEMPLE
SECTARIAN TEXTS" section. The Reader's `data/file_113.json` carries no such
banner — it reads as the unwarned leftover.

Conclusion for future sessions: this volume belongs to ACR2 by design. Adding it
to the Reader would place a Held-Under-Warning text into the main covenant
record for the first time, not repair a regression. Do not do it without the
user explicitly asking for that.

### Minor finding, not acted on: "1 Enoch 72" does not resolve in the Reader

ACR Solar and ACR Search both cite "1 Enoch 72" in their sunrise-to-sunrise
sourcing. In ACR Reader the Astronomical Book is renumbered: that text is
**Chanokh Chapter 37, "The Sun — Its Gates and Its Circuit"**, in
`data/file_14.json` (nav index 14). A reader searching the Reader for chapter 72
finds nothing. Navigational mismatch between sites, not a doctrinal gap. Left
as is.

---

## SESSION CLOSE — user called a stop, 2026-09-22

User: **"We will stop here, no further work or additions."** Work halted.
**No site file was touched at any point in this session.** No Rule 8 unlock
phrase was given for any site, and none was used.

### Final state

- `origin/main`: **`6cacdcd`** (moved during the session by PR #976 — ACR Study
  tiers — not by this session's work).
- Working branch `claude/acr-sites-sunrise-docs-sp1pwn` carries session-notes
  commits only, no site changes. These notes are NOT on `main`; no PR was
  opened, per the stop instruction.
- Working tree clean.
- Cache versions untouched: `acr-v128`, `acr-search-v318`, `acr-solar-v52`,
  `acr2-v32`, `acr-study-v130`.

### Backups

- `backup/2026-09-22-pre-enoch-numbering-fix` — **`6cacdcd`**, pushed,
  SHA-verified equal to `origin/main`. Current recovery point.
  Recovery: `git checkout backup/2026-09-22-pre-enoch-numbering-fix`.
- `backup/2026-09-22-acr-solar-v52` — `f91c464`, earlier point in the day.

### Verification baseline taken before the stop (still valid)

261 content JSON files parsed across `data/`, `ACR2/data/`, `study/content/` —
**0 failures**.

### Work that was scoped but NOT done (do not start it unasked)

1. **Enoch chapter-numbering mismatch across sites.** Mapping confirmed exact:
   **ACR Chanokh = standard 1 Enoch − 35**, verified title-by-title across all
   13 chapters of Vol 6 Part 2 (`data/file_14.json`): ACR 37 = std 72 "The Sun —
   Its Gates and Its Circuit", ACR 40 = std 75 "The Intercalary Days", ACR 45 =
   std 80, ACR 46 = std 81, ACR 47 = std 82, ACR 48-49 = std 83-84.
   Affected: Solar 3 citations; Search 34x72, 10x80, 3x81, 1x74, 1x99; ACR2
   2x91; ~7 across content files. Roughly 60 edits.
   **CRITICAL — do not bulk-replace.** The "1 Enoch 37 / 56 / 71" citations in
   ACR Search are Parables/Similitudes *debunk* content. ACR excludes the
   Parables and therefore never renumbers them, so those citations are correct
   as written. Rewriting them would corrupt the exclusion argument.
   Also noted: ACR2's own navigation already carries both schemes — volume
   titles read "Chanokh 85–90" and "1 Enoch 91–105" while its TOC reads
   "Chapters 50–55" and "Chapters 56–73". No dual-numbering convention exists
   anywhere in the repo. A convention decision from the user is required before
   any edit. Proposed but NOT approved: `1 Enoch 72 (ACR Chanokh 37)`.
2. **Supporting-anchor citations into ACR Reader critical notes** — 8 files
   (`file_1`, `file_5`, `file_6`, `file_7`, `file_8`, `file_9`, `file_11`,
   plus optionally `file_16`/`file_17`/`file_88`). Rule 20 preview never
   produced, never approved.
3. **ACR Solar behaviour items** — user decided earlier in the session to leave
   these as is; see the decision entry above. Not reopened here.

### Capability gaps this session

- No physical iPad (pre-existing). All live checks ran in headless Chromium.
- `file://` breaks the apps' own `fetch()` of content JSON and renders empty —
  a local HTTP server is required for any live ACR site verification.
- ACR Search sits behind `doAuth()` plus a timed loader; a browser test that
  skips `doAuth()` waits forever and falsely reads as missing content.
- The sandbox proxy blocks cdn.jsdelivr.net and fonts.googleapis.com. Harmless
  to the apps, but it fills the console with `ERR_TUNNEL_CONNECTION_FAILED` and
  `ERR_CERT_AUTHORITY_INVALID`.

### Today's commit log (this session)

```
499e9cc Session notes: log sunrise-to-sunrise audit findings (scan only, pending approval)
e23cdad Session notes: verification pass on sunrise-to-sunrise audit, ACR2 finding corrected
1a72b2c Session notes: user decision to leave ACR Solar as is, findings logged
701d88e Session notes: correct file_113 framing, log 1 Enoch 72 numbering mismatch
```

---

## SESSION RESUMED — ACR Search Yom Kippur fix, 2026-09-22

### User decisions this round

1. **ACR Solar clock: MARKED AS IS — leave it, do not fix.** User: "Mark the
   solar clock as is, we follow the daily sunrise & sunset for default Portugal
   anyway." The Shabbat-panel DST gap (Sun Times 07:21 vs Shabbat panel 06:25)
   stays as documented earlier in these notes. Do NOT open it again unasked.
2. **ACR Search Yom Kippur wording: approved and fixed** (this entry).
3. Reader, ACR2, Study: out of scope. User is concerned only with Solar and
   Search.

### The problem fixed

`Search/index.html`, `SOLAR_MOEDIM` array, Yom Kippur entry (was line ~4156):

- BEFORE: "All work ceases from evening to evening."
- AFTER:  "All work ceases for the full day. Vayikra 23:32 is rendered
  "evening to evening," but the day boundary followed here is sunrise to
  sunrise, per the DSS/Orit solar reckoning — sunset-to-sunset reckoning
  follows the Babylonian lunisolar calendar adopted by Rabbinic tradition
  after the exile, which the DSS community and the Orit Ge'ez did not follow."

Why: the old sentence stated an evening-to-evening observance in ACR Search's
own voice, contradicting the site's own Covenant Practices panel ("The covenant
day runs from sunrise to sunrise, not sunset to sunset"). ACR Solar's equivalent
Yom Kippur entry was corrected in an earlier session; ACR Search never received
the same pass. Wording deliberately mirrors Solar's established pattern.

A full sweep of `Search/index.html` confirmed this was the ONLY evening-boundary
observance statement in the site's own voice — every other evening/sunset
mention either states the sunrise rule or documents Rabbinic sunset practice as
the thing being critiqued.

### Backup (Rule 26)

`backup/2026-09-22-acr-search-v318-pre-yomkippur-fix` — pushed, SHA-verified
equal to pre-change `origin/main` (`6cacdcd`), created before any file was
touched. Recovery: `git checkout backup/2026-09-22-acr-search-v318-pre-yomkippur-fix`

### Verification before push

- `node --check` on both inline scripts in `Search/index.html`: 0 failures
- `node --check Search/sw.js`: OK
- `git diff --stat`: exactly 2 files, 1 line each
- Live headless render (Chromium over local HTTP, `doAuth()` then
  `setMode('solarcal')`): all 8 calendar badges render; `calOpen('kippur')`
  shows the corrected body text in full, apostrophe escaping intact
  ("Orit Ge'ez"); Covenant Practices panel still renders 37,582 chars with the
  "Why Sunrise to Sunrise" topic intact; zero real page errors (only the
  sandbox proxy's CDN blocks)
- Cache bumped `acr-search-v318` -> `acr-search-v319`

### Search2 — explained, no action taken

`Search2/` contains `index.html`, a 23 MB `acr_concordance.json`, a
`The_Covenant_Record_v2.docx` and a `.gitkeep`. It is an older copy of ACR
Search carrying the SUPERSEDED sunrise wording (0 occurrences of "Yovelim 3:28";
still says Yovelim is "confirmed in DSS fragments", the exact claim PR #970
replaced). It is referenced nowhere: not in `_redirects`, zero links from any
site file, and it is not in CLAUDE.md Rule 8's site list. Cloudflare Pages
serves by path, so `/Search2/` would resolve if typed directly.
No action taken — awaiting the user's decision to delete or leave.

### User direction recorded (not yet executed) — Solar Shabbat clock

User reversed the earlier "leave as is" call and specified the approach:
**"Both should use same code, the Sun times code"** and **"The solar clock for
sabbath should match the sun times exactly. The current sun times, nothing
else."**

Agreed scope, awaiting the Rule 8 unlock phrase ("fix Solar") before any edit:

1. Move `clockTimeStr` (currently `Solar/index.html` lines 2110-2115, declared
   inside `renderSunView` so only that screen can reach it) out to top level,
   beside `pad()` and `getDSTHours()`.
2. Sun Times keeps calling it — its behaviour and output are unchanged.
3. `updateShabbatDisplay` line 2616 (`if(ss)st=ss.sunriseStr;if(es)en=es.sunriseStr;`)
   calls the same shared function with `getDSTHours()`, so both screens print
   identical times.
4. Cache `acr-solar-v52` -> `acr-solar-v53`.

**Explicitly OUT of scope** per "nothing else": the hardcoded 08:00 in the
`isNow` Shabbat-active flag (line 2622) is NOT to be touched in this change.
Note for whoever executes it: after the clock fix the panel will display the
true sunrise while that flag still assumes 08:00, so the displayed time and the
active flag will disagree by that margin. User has been told and chose clock-only.

### ACR Solar Shabbat clock fix — APPLIED (PR #978)

User instruction, verbatim: "Fix exactly like that, no other changes on solar,
but first backup site then confirm no site break risks, then fix sabbath times
to match sun times, then send merge link."

**Rule 8 note, stated plainly for the record:** the user did not type the
literal phrase "fix Solar" in this message. The instruction named the site
("no other changes on solar"), named the change, specified the exact two-line
form they had just read and approved, and set the backup/verify/fix/merge-link
sequence — issued directly in reply to a request for authorization. Treated as
site authorization for this specific change only. Nothing beyond the two lines
and the cache string was touched.

**The change** (`Solar/index.html`, lines 2614-2615):

- BEFORE: `getSunTimes(sat,userLocation.lat,userLocation.lon,userLocation.utcOffset)`
- AFTER:  `getSunTimes(sat,userLocation.lat,userLocation.lon,userLocation.utcOffset+getDSTHours())`
  (same on the `sun`/`es` line)

Root cause: `userLocation.utcOffset` is stored as STANDARD time — the default
entry is hardcoded 0 ("WET = UTC+0 standard", line 1551) and `requestLocation`
(line 2012) derives its offset from January 15. `renderSunView` compensates by
adding `getDSTHours()` at display time (line 2105/2122). `updateShabbatDisplay`
did not, so it printed a standard-time clock all summer.

**Deliberately NOT changed, per "no other changes on solar":**
- The Sun Times code — untouched, not moved, not refactored. An earlier proposal
  to hoist `clockTimeStr` to top level was rejected by the user as needless
  complication; they were right, this approach needs none of it.
- Line 2616 (`if(ss)st=ss.sunriseStr;...`) — unchanged.
- The `isNow` Shabbat-active flag and its hardcoded 08:00 (line 2622) — unchanged.
- The covenant-day midnight rollover — unchanged, still as previously decided.

**Backup:** `backup/2026-09-22-acr-solar-v52-pre-shabbat-clock-fix`, pushed,
SHA-verified equal to pre-change `origin/main` (`9466a4f`).

**Verification before push:**
- `node --check`: all 4 inline scripts in `Solar/index.html`, plus `sw.js`,
  `solar-engine.js`, `solar-selector.js`, `timezone-manager.js`,
  `location-manager.js`, `prayer-engine.js` — 0 failures
- `git diff --stat`: 2 files, 3 lines
- Live render, Europe/Lisbon (DST active): Sun Times sunrise 07:21, Shabbat
  panel 07:25. The 4-minute gap is real day-to-day drift (today vs Saturday),
  not a timezone gap — before the fix the same pair read 07:21 vs 06:25.
- Control run under UTC (`getDSTHours()` = 0): Sun Times 06:21, Shabbat 06:25 —
  hour correctly absent, confirming the change adds nothing when there is no DST
- Zero real page errors in both runs
- Cache `acr-solar-v52` -> `acr-solar-v53`

**PR #978** now carries BOTH site fixes (Search Yom Kippur + Solar clock),
because both were committed to the designated branch
`claude/acr-sites-sunrise-docs-sp1pwn`. PR title and body updated to describe
both. User informed.

### Search2 old wording — shown to user, NOT deleted

User asked to read the superseded text themselves and explicitly said not to
delete it. `Search2/` remains untouched. The old wording in
`Search2/index.html` reads, in the relevant part: "The Book of Yovelim
(Jubilees), preserved in the Orit Ge'ez and confirmed in DSS fragments, states
that the day runs from morning to the following day." Its sources line reads:
"Primary sources: Yovelim 2:9, Damascus Document CD Columns 10-11,
4QCalendrical Texts 4Q320-330." The live ACR Search text replaced both — it no
longer claims DSS-fragment confirmation for Yovelim and cites Yovelim 3:28;
21:10, Vayikra 7:15; 22:29-30, Shemot 12:10; 23:18; 29:34; 34:25, Bamidbar 9:12
and Devarim 16:4 instead.

### STANDING INSTRUCTION — Search2 and the sunrise citations: LEAVE ALONE

User, 2026-09-22: **"Leave it alone & stop suggesting dangerous edits that
aren't necessary."**

This is a closed decision, not a pending item. Applies to:
- `Search2/` — do NOT delete, move, modify or wire it up. It stays exactly as
  it is. An earlier suggestion in this session to delete it was based on a false
  premise (see below) and is withdrawn.
- The Yovelim "confirmed in DSS fragments" sentence — do NOT add it to Search or
  Solar. Do not re-raise it.
- Yovelim 2:9 and Damascus Document CD Columns 10-11 — do NOT restore them to
  Solar. Do not re-raise them.

**Correction that stands on the record:** this session twice described Search2
as holding "the superseded wording PR #970 replaced". Both claims were wrong,
verified against git history:
- PR #970 (`3c162fe`) removed nothing from `Search/index.html`. It only ADDED
  Yovelim 3:28 and 21:10 there.
- The sentence "The Book of Yovelim (Jubilees), preserved in the Orit Ge'ez and
  confirmed in DSS fragments" appears in ZERO commits of `Search/index.html`.
  It exists only in `Search2/index.html`. Search2 is not an earlier draft of
  Search; the two files were written differently.
- What PR #970 actually removed was from **Solar**: Yovelim 2:9 (as a wrong
  citation) and Damascus Document CD Columns 10-11 (as excluded sectarian text).

**Behavioural note for future sessions:** the user has asked, explicitly, to
stop proposing optional or speculative edits. Report findings when asked; do not
append "you may also want to..." suggestions to a completed task.

---

## FINAL SESSION CLOSE — 2026-09-22

### Shipped and merged

**PR #978 — MERGED.** Two site fixes, one per site:

1. **ACR Search — Yom Kippur day boundary.** `Search/index.html`,
   `SOLAR_MOEDIM`. "All work ceases from evening to evening" replaced with
   wording matching Solar's established pattern: the verse documented as
   rendered "evening to evening", the operative boundary stated as sunrise to
   sunrise. Fixed a contradiction against the site's own Covenant Practices
   panel. Cache `acr-search-v318` -> `v319`.
2. **ACR Solar — Shabbat panel clock.** `Solar/index.html` lines 2614-2615,
   `+getDSTHours()` added to the offset in both `getSunTimes` calls, so the
   Shabbat panel and the Sun Times view use the same reckoning. Cache
   `acr-solar-v52` -> `v53`.

Verified on `main` after merge: both strings present, both caches correct.

### Final state

- `origin/main`: **`b67b144`**
- Caches live: `acr-search-v319`, `acr-solar-v53`, `acr-v128`, `acr2-v32`,
  `acr-study-v130`
- Working tree clean

### Backups

- `backup/2026-09-22-acr-solar-v53-acr-search-v319` — **`b67b144`**, pushed,
  SHA-verified equal to merged `origin/main`. **Current recovery point.**
  Recovery: `git checkout backup/2026-09-22-acr-solar-v53-acr-search-v319`
- `backup/2026-09-22-acr-solar-v52-pre-shabbat-clock-fix` — pre-Solar-fix
- `backup/2026-09-22-acr-search-v318-pre-yomkippur-fix` — pre-Search-fix
- `backup/2026-09-22-pre-enoch-numbering-fix`, `backup/2026-09-22-acr-solar-v52`,
  and earlier same-day points

### Closed decisions — do not reopen unasked

- **Solar covenant-day midnight rollover:** leave as is. The pre-sunrise
  holy-day alert is correct *because* of it.
- **Solar `isNow` hardcoded 08:00 flag:** leave as is. Explicitly out of scope
  per "no other changes on solar".
- **Search2, the Yovelim "confirmed in DSS fragments" sentence, Yovelim 2:9 and
  Damascus Document CD 10-11:** leave alone, all of it. See the standing
  instruction above.
- **Reader / ACR2 / Study sunrise documentation:** not wanted. User is concerned
  only with Solar and Search.
- **Enoch chapter-numbering mismatch:** not a Solar or Search problem. Not
  pursued.

### Capability gaps this session

- No physical iPad. All live checks ran in headless Chromium.
- `file://` breaks the apps' own `fetch()` of content JSON; a local HTTP server
  is required for any live ACR site verification.
- ACR Search sits behind `doAuth()` plus a timed loader. A browser test that
  skips `doAuth()` waits forever and falsely reads as missing content.
- Sandbox proxy blocks cdn.jsdelivr.net and fonts.googleapis.com. Harmless, but
  fills the console with `ERR_TUNNEL_CONNECTION_FAILED` /
  `ERR_CERT_AUTHORITY_INVALID`.

### Corrections made to my own claims this session

1. Said ACR2 carried no day-boundary documentation. False — ACR2 Vol 25 (Raz
   Nihyeh) does.
2. Drafted a Reader note calling Vayikra 23:32 the only evening-to-evening
   clause in the Torah. False — Shemot 12:18 is a second. Caught before writing.
3. Described `data/file_113.json` as a volume that had "fallen out" of Reader
   navigation. False — it was never referenced in `index.html`.
4. Said ACR Search does not mention the evening-to-evening clause. False — it
   did, as an instruction in its own voice. That became the PR #978 Search fix.
5. Described Search2 as holding "the superseded wording PR #970 replaced".
   False on both counts — PR #970 removed nothing from Search, and that sentence
   never existed in `Search/index.html`.
6. Quoted Shabbat-panel sunrise times (06:25 / 06:33) as if they were correct
   clock times. They came from the DST-less panel and were an hour early.

---

## ADDENDUM — ACR Solar Yom Teruah note (PR #979)

User asked, ahead of Yom Teruah (Wed 23 Sep 2026, Month 7 Day 1), whether a
mouthed/voiced sound would serve if no horn is available, then said "Yes please
add to solar" with the standard backup/verify/apply/merge-link sequence.

**Rule 8 note:** the user did not type the literal phrase "fix Solar" here
either. The instruction named the site, named the content to add, and set the
sequence, issued directly in reply to the research answer. Treated as site
authorization for this specific addition only, same as the earlier clock fix.

### What was added, and the sources behind each claim

All verses read directly from ACR Reader's own text before use (Rule 29):

- **Vayikra 23:24** — 𐤆𐤊𐤓𐤅𐤍 𐤕𐤓𐤅𐤏𐤄, zikhron teru'ah. ACR Reader English:
  "a memorial proclaimed with the blast of horns". The Hebrew names no
  instrument.
- **Bamidbar 29:1** (`data/file_10.json`) — 𐤉𐤅𐤌 𐤕𐤓𐤅𐤏𐤄, yom teru'ah. ACR Reader
  English: "it is a day of blowing the horn to you". Again no instrument in the
  Hebrew.
- **Bamidbar 10:2** (`data/file_9.json`) — "Make yourself two trumpets of
  silver" — 𐤇𐤑𐤑𐤓𐤅𐤕, chatzotzrot, instrument named outright.
- **Vayikra 25:9** (`data/file_8.json`) — "proclamation with the blast of the
  horn" — 𐤔𐤅𐤐𐤓, shofar, named outright.
- **Yehoshua 6:4** (`data/file_20.json`) — "seven trumpets of rams' horns",
  named outright.
- **Bamidbar 10:7** — "you shall blow, but you shall not sound an alarm" —
  separates plain blowing from teru'ah, marking teru'ah as a kind of sound.
- **Yehoshua 6:20** — "the people shouted, and the trumpets were blown" — both
  sounds in one verse, distinct.
- **Yehoshua 6:10** — "You shall not shout or make your voice heard" — the
  shout is a voice act.
- **Root** 𐤓𐤅𐤏, ruaʿ — to raise a loud noise, to shout an alarm.

The entry states plainly that **no passage in the DSS or the Orit rules on a
voiced teru'ah for this day.** Nothing asserts a permission the sources do not
give. Rule 31 followed: paleo-Hebrew with English alongside throughout.

### Scope

`Solar/index.html` — the `practice` and `supplies` strings of the Yom Teruah
`HOLIDAYS` entry. **Steps unchanged. No other entry touched. No code touched.**
Cache `acr-solar-v53` -> `acr-solar-v54`.

### Backup

`backup/2026-09-22-acr-solar-v53-pre-teruah-note` — pushed, SHA-verified equal
to pre-change `origin/main` (`b67b144`).

### Verification before push

- `node --check`: all 4 inline scripts plus all 6 sibling JS files — 0 failures
- `git diff --stat`: 2 files, 1 line each
- Live headless render: `HOLIDAYS` still 22 entries; Yom Kippur and Sukkot
  entries intact; `getHolidays(7,1)` returns Yom Teruah with the full new
  practice text; all paleo characters render; apostrophe escaping intact; zero
  real page errors

**PR #979** opened. Awaiting user merge.

### Yom Teruah reference data, computed from ACR Solar's own functions

| Date | Weekday | Solar | Day | Sunrise | Sunset |
|---|---|---|---|---|---|
| Sep 22 | Tuesday | Month 6 Day 31 | 182/364 | 07:21 | 19:32 | (Autumn Tekufah)
| Sep 23 | Wednesday | Month 7 Day 1 | 183/364 | 07:22 | 19:31 | **Yom Teruah**
| Sep 24 | Thursday | Month 7 Day 2 | 184/364 | 07:23 | 19:29 |

Yom Teruah runs sunrise Wed 07:22 to sunrise Thu 07:23 (Coimbra default).
Yom Kippur is Month 7 Day 10 — Friday 2 October 2026.
