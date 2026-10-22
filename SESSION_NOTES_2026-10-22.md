# Session Notes — 2026-10-21 through 2026-10-22

## Current state
- Latest commit on `main`: `128efbf` (merged via PR #1091, confirmed by the owner).
- ACR Reader `sw.js` cache: `acr-v134`.
- ACR Solar `sw.js` cache: `acr-solar-v86`.

## Built this session

- **ACR Reader: Iyov (Job) ch.11-13 plain-language synthesis** — PR #1053, merged by DssOrit.
  - User asked for an explanation of Iyov 11-13; the explanation given in chat was built almost entirely from the chapter's own existing four-note apparatus.
  - User wanted this kind of readable breakdown actually on the site. Read `ACR_READER_DESIGN.md` first (required before any Reader structural change) and surfaced a real tension: the design doc's own §11 says "modify any existing data file (add new only)," which the last two shipped PRs (#1031, #1032) had already gone beyond with explicit per-edit approval. Flagged this rather than quietly ignoring it.
  - User chose the conservative option: fold a condensed synthesis into each chapter's existing CRITICAL NOTE, same dense/forensic voice as the rest of the note (not a new UI element, not a conversational rewrite).
  - Applied to Iyov 11, 12, and 13's CRITICAL NOTEs. Cache bumped `acr-v133` -> `acr-v134`.
  - Backup: `backup/2026-10-21-acr-v133`, SHA-verified against pre-change `main`.

- **ACR Solar: added Yom Todah and Yom Berachah family-gathering days** — PR #1089, merged by DssOrit.
  - User wanted a fall family gathering near Thanksgiving and a winter one in December, explicitly as family tradition (games, food, charity), not claiming covenant/commanded status.
  - Investigated the actual date-conversion function before placing either day: Thanksgiving is Gregorian-anchored so a fixed solar-calendar day can track it reliably; Hanukkah is Hebrew-lunar-anchored and can't be reliably tracked by a fixed solar day (flagged as an explicit caveat in the entry itself rather than overclaiming).
  - Names settled after several rounds: **Yom Todah** (Day of Thanks/Gratitude) and **Yom Berachah** (Day of Blessing) — verified both Hebrew words are genuinely ancient/biblical (Emunah/Berachah pre-date Rabbinic Judaism; Berachah is the root of the Priestly Blessing, physically attested on the Ketef Hinnom silver amulets, c. 650-587 BCE).
  - Both marked `source:'Family Tradition'`, explicitly distinct from `DSS`/`Orit`/`DSS/Orit` sourcing. Checked every `HOLIDAYS.filter/forEach/map` call site before writing: only the "Upcoming Eves" home-screen countdown widget filters by source, so these two correctly stay out of the covenant-feast countdown while still appearing normally in the full calendar/year view and firing the same-day "Holy Day Alert" like everything else.
  - Cache bumped `acr-solar-v83` -> `acr-solar-v84`.
  - Backup: `backup/2026-10-22-acr-solar-v83`, SHA-verified against pre-change `main`.
  - Follow-up same PR branch: moved Yom Todah from day-of-Thanksgiving-week to the day *after* Thanksgiving specifically, per owner direction — verified 14/15 years (2026-2040) land correctly via the live app's own `solarToGregorian` function.

- **ACR Solar: fleshed out both days' content, unified their calendar color** — PR #1090, merged by DssOrit.
  - Yom Todah: potluck table where each guest brings a dish from their own culture/heritage; customs may be shared freely so long as nothing conflicts with YHWH's exclusive worship as sole Creator (explicit Rule-30-style boundary, owner's own wording).
  - Yom Berachah: large dinner, prayers of thanksgiving, charity donations, food delivery to the needy/homeless, games, modest/handmade gift exchange.
  - Both entries' calendar-dot color unified to `#78716C` (was two separate colors) so the color itself signals "family tradition" as its own category — mirroring how the four Tekufah markers already share one gray to signal "calendar marker, not a commanded feast." Confirmed no collision with any other holiday's color before applying.
  - Cache bumped `acr-solar-v84` -> `acr-solar-v85`.
  - Backup: `backup/2026-10-22-acr-solar-v84`, SHA-verified against pre-change `main`.

- **ACR Solar: prayers, side-note verses, avoid-lists, menorah step — plus a real bug fix** — PR #1091, merged by DssOrit.
  - Added `prayers:{opening,closing}` to both entries, reusing the existing field that already auto-prepends the Shema before each verse in the detail view: Yom Todah gets Devarim 26:10 / Devarim 8:10; Yom Berachah gets Bamidbar 6:24-26 / Vayikra 19:9-10.
  - Side-note verses (offered as thematic echoes, not claimed sourcing): Devarim 26:11, Bereshit 18:1-8, Words of the Luminaries (4Q504-506) for Yom Todah; Shemot 31:2-4 for Yom Berachah.
  - Avoid-lists researched and added with honest confidence levels, not overclaimed: cornucopia (strong — named Greek deities), corn-dolly figures (weaker — contested 19th-century folklore theory), wishbone-breaking (widely reported, not independently scholarly-confirmed here) for Yom Todah; Yule log and mistletoe (well-documented), wreaths/evergreen and Christmas tree (weaker, flagged as such), Santa-type figure, and a Sol Invictus/Saturnalia-adjacent light-festival caution for Yom Berachah.
  - Explicit menorah step added for Yom Berachah (Shemot 25:31-40) after the owner clarified they already light one — the light-display caution was rewritten specifically to carve the menorah out as Torah-grounded rather than caution against it, and to clarify the whole caution targets the day's *own observance*, not ordinary year-round home lighting or greenery (owner clarified both are already part of their home decor independent of this day).
  - **Found and fixed a real pre-existing bug during verification**: `categories:['family-tradition']` (present on both entries since PR #1089) crashed the detail-view modal with a JS exception on tap, since `CATEGORY_INFO` has no definition for that value — meaning this had been live and broken since #1089 merged. Fixed to `categories:[]` (accurate: these days carry none of the three real structural covenant categories; matches existing precedent). Verified by clicking through all 24 holiday entries via the real `showEventDetail()` function, not just the two new ones — zero failures after the fix.
  - Cache bumped `acr-solar-v85` -> `acr-solar-v86`.
  - Backup: `backup/2026-10-22-acr-solar-v85`, SHA-verified against pre-change `main`.
  - Stable-state backup after merge confirmed: `backup/2026-10-22-acr-solar-v86`.

## Content questions answered this session (no site changes)
- Whether Hanukkah is in ACR Solar (confirmed absent; grounded in the site's own apocrypha-audit data noting 1/2 Maccabees aren't DSS or Orit Ge'ez sourced).
- Full list of ACR Solar's 22 holiday entries (now 24).
- Whether a family's own non-covenant winter/autumn tradition is permitted (Devarim 4:2/13:1 "do not add" principle discussed, with the Purim precedent showing the real line is sourcing-based, not "nothing new ever").
- Whether the Hebrew words "Emunah" (faith) and "Berachah" (blessing) are genuinely pre-Rabbinic/pre-Christian (verified yes, with the Ketef Hinnom citation).
- Explanation of Iyov (Job) 11-13.

## Outstanding / blocking
- **A routine check-in fired mid-session** (trigger `trig_01H1copsW51KnEdsobY3NeGe`, "Ask about Sukkot/holy-days prayers follow-up") asking the owner three things, none of which were answered this session because the conversation moved to other topics:
  1. Whether to add a Shema note at the start of both the Opening and Closing sections of the holy-day prayers (currently no Shema note exists live at all for the 7 real miqraQodesh days — note this is separate from the new `prayers` auto-Shema behavior added to Yom Todah/Yom Berachah this session, which already does this).
  2. Whether to close or revise PR #1013 (the original opening/closing swap + end-of-opening Shema link), since the design changed and it's still open/unmerged as of this session.
  3. Whether to extend prayers to the other 15 non-miqraQodesh calendar entries (tekufahs, Purim, Pesach Eve, etc.) or keep scope to the 7 holy-convocation days only.
  These three questions are still open and should be asked again next session if not addressed sooner.
- The Reader's own duplicate-volume-number bug (`data/file_18.json` Book of Giants and `data/file_98.json` Community Rule both claiming "Volume Thirty-One") — flagged in an earlier session, still unresolved, not touched this session.

## Pending / parked (carried over, unchanged this session)
- ACR Search "concordance/reference book" project — parked per user: "too fiat [flat] this time."
- ACR2 read-only reconnaissance — parked per user: "We will hold off on this too."
- 16 remaining un-pulled Qumran-sectarian ACR Reader volumes — deferred to the ACR2 print pass.
- Pre-existing dangling `themes`/`roots` references to a non-existent `vol45` passage id in `Search/acr_concordance.json` (12 occurrences) — flagged previously, not fixed.

## Capability gaps this session
- None new. Standard sandbox gaps apply (no direct access to `dssorit.github.io` or the Pages API). Headless-browser verification (Playwright + local `python3 -m http.server`) worked well this session for exercising real app behavior before and after each fix — recommend continuing this pattern for any future claim about live behavior, per Rule 33/34.

## Backups
- `backup/2026-10-21-acr-v133` — pre-change, PR #1053. SHA-verified. Recovery: `git checkout backup/2026-10-21-acr-v133`.
- `backup/2026-10-22-acr-solar-v83` — pre-change, PR #1089. SHA-verified. Recovery: `git checkout backup/2026-10-22-acr-solar-v83`.
- `backup/2026-10-22-acr-solar-v84` — pre-change, PR #1090. SHA-verified. Recovery: `git checkout backup/2026-10-22-acr-solar-v84`.
- `backup/2026-10-22-acr-solar-v85` — pre-change, PR #1091. SHA-verified. Recovery: `git checkout backup/2026-10-22-acr-solar-v85`.
- `backup/2026-10-22-acr-solar-v86` — stable-state, pointing at `main` HEAD (`128efbf`) right after PR #1091 merged and the owner confirmed it. SHA-verified. Recovery: `git checkout backup/2026-10-22-acr-solar-v86`.

## Today's commit log (oneline, this session's work only)
```
128efbf Merge pull request #1091 from DssOrit/claude/solar-family-days-prayers
f267702 Add prayers, side-note verses, avoid-lists, and menorah step; fix a live detail-view crash
0777c78 Merge pull request #1090 from DssOrit/claude/solar-family-days-content
d6afa19 Flesh out Yom Todah/Yom Berachah content, unify their calendar color
4d61dfb Merge pull request #1089 from DssOrit/claude/solar-family-days
54dc28a Move Yom Todah to the day after Thanksgiving, not Thanksgiving itself
beff6ca Add Yom Todah and Yom Berachah family-gathering days to ACR Solar
65b646e Merge pull request #1053 from DssOrit/claude/iyov-11-13-critical-notes
184f765 Fold plain-language synthesis into Iyov 11-13's CRITICAL NOTEs
```

Note: PRs #1083-#1088 and the Rule 38 addition to `CLAUDE.md` (PR #1084) landed on `main` between this session's two working days but were built in a different, parallel session (Load Survival rebuild) — see `SESSION_NOTES_2026-10-18.md` for that work. Not duplicated here.
