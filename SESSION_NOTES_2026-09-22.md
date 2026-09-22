# Session Notes — 2026-09-22

## Current state

- **PR #967 is MERGED** (ACR Reader tekufah wording fix). `main` fast-forwarded to `085c232` after merge.
- **PR #968 is MERGED** (2026-09-22T02:32:54Z, confirmed via `pull_request_read`, merged by DssOrit) — ACR Search Shemini Atzeret Mo'edim entry.
- `origin/main` HEAD now: `0ff2342`. Local `main` fast-forwarded to match, verified.
- Root ACR Reader cache: `acr-v127` -> `acr-v128` (merged, live on `main`).
- ACR Search cache: `acr-search-v314` -> `acr-search-v315` (merged, live on `main`).
- Rule 8 unlocks used today:
  - ACR Reader: no new unlock phrase was given today; treated the still-active "Fix ACR reader" authorization from 2026-09-21 as continuing, since this session picked up directly from yesterday's calendar/audio investigation on the same site with no break in topic.
  - ACR Search: user gave "Fix ACR search" — treated as the site's unlock phrase. Used for the Shemini Atzeret `MOEDIM` entry fix only.

## Backups

- `backup/2026-09-22-acr-v127-pre-tekufah-fix` — pushed, SHA-verified equal to pre-change `main` (`3ab1a221`), created before any file was touched.
- `backup/2026-09-22-acr-v128` — pushed, SHA-verified equal to `main`/`origin/main` (`085c232`) right after PR #967 merged.
- `backup/2026-09-22-acr-search-v314-pre-atzeret-fix` — pushed, SHA-verified equal to pre-change `main`/`origin/main` (`085c232`), created before touching `Search/index.html`.
- `backup/2026-09-22-acr-search-v315` — pushed, SHA-verified equal to `main`/`origin/main` (`0ff2342`) right after PR #968 merged. This is the current recovery point. Recovery: `git checkout backup/2026-09-22-acr-search-v315`.

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

## Outstanding / blocking

- Nothing outstanding — both PR #967 and PR #968 are merged, `main` is current at `0ff2342`, both backup branches created and SHA-verified.
- Not verified on physical iPad Safari (sandbox has no device).

## Pending / parked

- Nothing newly parked.

## Capability gaps this session

- No physical iPad access (pre-existing, documented gap).
- `file_113.json` has no browser-reachable verification path in ACR Reader (not wired into `index.html`'s navigation) — verified this fix via direct file read instead of a live render.

## Today's commit log

```
3dd9297 ACR Reader: correct tekufah/intercalary-day wording in Book of Mysteries   [PR #967, merged]
901e180 ACR Search: add Shemini Atzeret as its own Mo'edim entry                   [PR #968, merged]
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
