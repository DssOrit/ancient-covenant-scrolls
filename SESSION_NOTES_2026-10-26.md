# Session Notes — 2026-10-25 through 2026-10-26

## Current state
- Latest commit on `main`: `0fdae8e` (automated "Prophetic Watch brief 2026-10-26", touching `Search/daily_brief.json` only — not built in this session).
- Open PR awaiting merge: **#1108** — `claude/solar-study-story-games` — ACR Solar Family Study/Story/Covenant Arc/Games feature. Not yet merged.
- ACR Solar `sw.js` cache: `acr-solar-v90` on `main`; `acr-solar-v91` on the open PR branch.
- Working tree clean on this branch, nothing uncommitted.

## Built this session

- **ACR Solar: restructured Yom Todah and Yom Berachah — menorah timing, DIY crafts, light verses, Yom Berachah split into a two-day event** — PR #1106, merged by DssOrit.
  - Started from a content mix-up: the user asked whether Yom Teruah was meant to land the day after Thanksgiving. Checked the live calendar engine directly (not memory) and confirmed Yom Teruah (month 7, day 1 — a real covenant moed) falls on Sep 23, 2026, nowhere near Thanksgiving — the day-after-Thanksgiving slot belongs to **Yom Todah**, the unrelated family-tradition entry.
  - Verified the structural fact directly from `getSolarYearStart`'s own code: every solar year starts on a Wednesday and is exactly 52 weeks (364 days), so any fixed (month, day) position lands on the *same weekday every year, forever*. Mapped the full weekday table for month 9 and placed Yom Berachah on day 27 (Friday)/28 (Saturday) — the 3rd weekend of December in 14 of 15 years (2026-2040), verified.
  - Confirmed Yom Todah already lands on Friday permanently, zero exceptions 2026-2040.
  - Moved the menorah setup from Yom Berachah to Yom Todah (lit after the meal, stays lit through the season — confirmed by the user: "The menorah should already be up by the time of Yom Berachah").
  - Added grounded decorations/activities: wheat-sheaf bundle (Devarim 26:10), gratitude scroll (loosely inspired by 4Q504-506's recounting structure), stones of remembrance (Yehoshua 4:1-9), almond-blossom motif (Shemot 25:31-40).
  - Pulled four verses directly from the live ACR Reader corpus for the gratitude-scroll reading: Bereshit 15:13-14, Shemot 1:11-14, Shemot 2:23-25, Shemot 6:6-8. Added real "light" verses from ACR Search: Tehillim 119:105, Tehillim 27:1, Yesha'yahu 60:19-20, Bamidbar 6:25.
  - Split Yom Berachah into Day One (Friday, prep/decorate/cook/wrap/game-night) and Day Two (Saturday, main gathering — no menorah-setup step, already lit from Yom Todah).
  - Verified before shipping: `node --check`, `HOLIDAYS` array parse (24 -> 25 entries), full headless-browser pass on all 25 entries, zero failures.
  - Re-verified both structural claims after merge; self-caught and corrected a flawed re-verification method for the "3rd weekend" claim before confirming the original result stood.

- **ACR Solar: Family Study, Story, Covenant Arc & Games for Yom Todah / Yom Berachah** — **PR #1108, open, awaiting merge.**
  - User originally asked for two standalone PWAs ("ACR Yom Todah", "ACR Yom Berachah") encompassing lesson plans, the day's ACR Solar info, and games sourced from GESTUDY's "Truth Uncovered" and Load Words' "Clue Grid." Built substantially, then the user redirected: "Actually would it be easier to simply add this feature to ACR Solar instead... so that when we tap the holidays it opens to these features." Final instruction: **"Scrap the two PWAs, build it into Solar instead but include every single request for them."**
  - Recognized Solar already has proven, working TTS infrastructure (`openTextPage()`, `pronounceTP()`, `tpPlay()`) — reused it entirely rather than building new audio infrastructure, avoiding duplicate work across two new PWAs.
  - Added five new buttons to the Yom Todah / Yom Berachah (both days) event-detail modal only: **Study Guide**, **The Story**, **The Covenant Arc**, **Activities**, **Games**.
  - **Study Guide**: Nine Conditions of Bereshit 15, the Covenant Land map, Voices From the Record, the 140-Year Cartographer Chain, Gratitude Scroll reading (Todah); Covenant Chain, 400-Year Timeline, Names Before the Renaming, Equiano's testimony, Ancient Miracles Record (Berachah) — all content reused from material already researched and verified earlier in this session.
  - **The Story**: an 11-chapter narrated telling from the Soleb inscription (c. 1400 BCE) through the Lemba genetic findings (2012 CE), each chapter naming what erased it and what restored it, per the site's established "erased by / restored by" framing.
  - **The Covenant Arc**: a new four-part verse arc (Where We Come From / Taken / Now / Shall Go) — Devarim 26:5-6, Devarim 28:64-65, Devarim 30:3-4, Amos 9:11-12, Yesha'yahu 60:19-20. Per Rule 29, pulled each verse directly from the site's own live Reader data files (`data/file_12.json` for Devarim, `data/file_61.json` for Amos, `data/file_46.json` for Yesha'yahu) rather than from memory, so the wording matches what's already published on `main`.
  - **Activities**: the DIY checklists already shipped in PR #1106, made TTS-readable.
  - **Games**: three engines built fresh for this integration, using Solar's own CSS variables and styled consistently with the rest of the app:
    - **Covenant Board** — Family-Feud/Evidence-Board-style reveal (inspired by GESTUDY's "Truth Uncovered"), themed per day.
    - **Scroll or Deal** — Deal-or-No-Deal-style pick-and-bank mechanic, themed per day.
    - **Clue Grid** — memory-match tile game with a trap-tile pair (inspired by Load Words' "Clue Grid"), themed per day.
    - All game content drawn only from facts already verified earlier in the session (the 140-Year Cartographer Chain, the Story timeline, Names Before the Renaming) — no new unverified claims introduced.
  - Followed Rule 38's order: confirmed the existing `backup/2026-10-26-acr-solar-v90` (SHA `ac7beaf3`) already covered the pre-change state (no new backup needed, since `main` hadn't moved since that backup was taken); ran full verification before pushing; opened the PR with the merge link, per Rule 9, and is waiting for the user.
  - Verification: `node --check` on `sw.js`; all 4 inline `<script>` blocks parse; `HOLIDAYS` array still parses with all 25 entries intact; div/script/style tags balanced; full Playwright pass — `showEventDetail()` on all 25 holidays (regression check), new buttons render only on the 3 feast entries, Study/Story/Arc/Activities each open with a correctly populated TTS verse-paragraph queue, all 3 games fully playable end-to-end — zero page errors, zero script errors, no horizontal overflow at 390px width.
  - Confirmed `Search/` was not touched; the only non-`Solar/` file in the branch diff (`Search/daily_brief.json`) came from a clean fast-forward merge of an unrelated automated commit already on `main`, per Rule 39.

## Content questions answered this session (no further site changes)
- Explained cotton is not classified as wool (cotton = plant/cellulose fiber, same category as linen; wool = animal/protein fiber).
- Explained the "Prophetic Watch brief" automated commit touching `Search/daily_brief.json` is a pre-existing automated process unrelated to this session.
- Confirmed via the real `figure_studies.json` data that ACR Search's "Figure Studies" feature currently has one entry (not used in this session's shipped content).

## Outstanding / blocking
- **PR #1108 is open and needs the user's review and merge decision** — not yet live on `main`.
- Carried over, unresolved: the Reader's own duplicate-volume-number bug (`data/file_18.json` Book of Giants and `data/file_98.json` Community Rule both claiming "Volume Thirty-One").
- Carried over, unresolved: the three open Sukkot/holy-days-prayers questions from the 2026-10-22 check-in (trigger `trig_01H1copsW51KnEdsobY3NeGe`).
- `SUGGESTIONS_PARKED.md`'s top-of-file "review by" date (2026-10-09) is still past due and has not yet been resurfaced to the user.

## Pending / parked (carried over, unchanged this session)
- ACR Solar auto-refresh-on-open — parked 2026-10-24, user confirmed they always refresh manually.
- ACR Search "concordance/reference book" project — parked per user: "too fiat [flat] this time."
- ACR2 read-only reconnaissance — parked per user: "We will hold off on this too."
- 16 remaining un-pulled Qumran-sectarian ACR Reader volumes — deferred to the ACR2 print pass.

## Capability gaps this session
- None new.

## Backups
- `backup/2026-10-26-acr-solar-v89` — pre-change, PR #1106. SHA-verified. Recovery: `git checkout backup/2026-10-26-acr-solar-v89`.
- `backup/2026-10-26-acr-solar-v90` — stable-state after PR #1106 merged, and also the confirmed pre-change state for PR #1108 (main had not moved). SHA `ac7beaf3`, SHA-verified. Recovery: `git checkout backup/2026-10-26-acr-solar-v90`.

## Today's commit log (oneline, this session's work only)
```
df68747 Restructure Yom Todah and Yom Berachah: menorah timing, DIY crafts, light verses
9f4e04e Add Family Study, Story, Covenant Arc, and Games to Yom Todah and Yom Berachah  (open PR #1108, not yet merged)
```
