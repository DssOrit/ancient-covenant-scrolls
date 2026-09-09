# Session Notes — 2026-09-09

## Current state
- Latest commit on `main`: `758d6ee` (Merge pull request #910).
- Working tree clean, local branch `claude/session-notes-2026-09-09` synced to `origin/main` at `758d6ee`.
- ACR Search cache (`Search/sw.js`): `acr-search-v306`.

## Built today
- **PR #901 — Rule 16: true name Hebrew, not the Roman-derived label "African"** (merged, squashed into `main` at `08446e2`).
  - User direction chain: land names corrected first (Mitzrayim/Kush/Put/Kena'an, not "Africa"), then extended to the people themselves ("these were not an ancient African Hebrew people these were Hebrew people"), then locked as a rule.
  - Two commits: first pass replaced "African" terminology throughout Rule 16 with Hebrew/Kush-Mitzrayim-Put-Kena'an framing; second pass simplified per user correction ("Hebrew instead of African people, so if they were Hebrew from kush then state it") to state it directly rather than through a heavy parenthetical.
  - Scope note: Rule 0 (No Western/European Bias) still uses "African" terminology and was deliberately **not** touched — flagged, not silently done. Still open — see Outstanding below.

- **PR #902 — ACR Search: full covenant-land boundary + 400-year prophecy keywords** (merged into `main` at `b1e3127`).
  - Unlocked via exact phrase: "Edit ACR search but first backup site, confirm no break, fix then send merge link."
  - Trigger: user asked whether the real UN "Correct the Map" resolution (Equal Earth vs. Mercator, ~Sept 2026) was covered by ACR Search's news pipeline. It wasn't — read `.github/workflows/daily_brief.yml` and `.github/scripts/build_daily_brief.js` (the cron-driven RSS keyword-scorer) to fix it.
  - Commit 1: added Mercator/Equal Earth keywords to `Awakening`; expanded `Covenant Land` with the Genesis 15:18-21/Numbers 34:1-12 boundary; added a new `400-Year Prophecy` theme grounded in Bereshit 15:13-14 and the pre-existing Covenant Chain content in `Search/index.html`.
  - Commit 2: user supplied a docx mapping ancient boundary/tribal-allotment names to modern names. Cross-checked independently (Rule 29) against real-world news likelihood — closed the largest gap (`jordan`, `amman` — the country was missing, only `jordan river` was covered) plus `mediterranean`, `beersheba`, `nablus`, `jericho`, `jaffa`, `nazareth`, `sadad`, `orontes`. Deliberately did NOT add `acre` (too generic) or `iraq` (would swamp signal) — flagged rather than silently decided either way.

- **PR #904 — Add Sadad/Orontes to 400-Year Prophecy theme** (merged into `main`, commit `0943789`).
  - User's explicit follow-up instruction after PR #902: add these two keywords to the 400-Year Prophecy group as well (they were already in Covenant Land). Flagged the thematic mismatch first (Syria-conflict news tagging as reparations content), user confirmed "add them as literally asked" — applied exactly that.

- **PR #906 — ACR Search: Tribes and Territory figures lookup, batch 1** (merged into `main`, commit `78a3b58`).
  - New feature: type a name in ACR Search's existing search bar (or browse a new "Tribes & Territory" nav pill) and see a figure's tribe, territory, and modern-name cross-reference, every entry citing chapter and verse.
  - Grew out of a long chat thread earlier in the session (character breakdowns of Moshe/Avraham/Yosef/Eliyahu/Devorah/Daniyel and their Kush/Mitzrayim/Kena'an ties), which led to a "Tribes and Territory" reference doc (delivered as a Claude Artifact + downloadable .docx/.pdf), then to this brainstormed site feature (four combined ideas: trace-the-line map, lineage web, forensic evidence-cards, live-news tie-in — this PR builds the search+data foundation only; the other three are deferred, explicitly flagged not silently dropped).
  - Implementation reuses the existing panel/search-index architecture (`buildSiteIndex()`'s `tabs` list, `td-item` markup, `goToSiteEntry`) rather than building parallel search machinery.
  - Batch 1 (5 figures): Moshe (Levi), Yosef (not a tribe — father of Efrayim/Menasheh), Daniyel (Yehudah), Dawid (Yehudah), Ya'akov (father of all twelve, not a member of one).
  - Verified against the real running app via local Playwright (not just code-reading) — confirmed via a control test that this sandbox's app-loading-screen block is a pre-existing, unrelated network restriction, not caused by this change.
  - Backup: `backup/2026-09-09-acr-search-v301-figures-batch1` at pre-change SHA `a2bd26f`.

- **PR #907 — ACR Search: Tribes and Territory batch 2 — 22 more figures** (merged into `main`, commit `46ea81d`).
  - Grew the figures lookup from 5 to 27 entries: Noach, Chanokh, Sarah (pre-tribal — before the tribes exist), Rut (Moabite by birth, incorporated into Yehudah by marriage — mirrors Moshe's Kushite-wife case), Yirmeyahu (Levi/priestly, living in Anatot inside Binyamin's territory), Sha'ul (Binyamin, explicit), Shemu'el (Levi/Kohathite, not Efrayim despite living there — traced through Divrei HaYamim Aleph 6:22-28's genealogy), and all twelve minor prophets plus Yesha'yahu, Elisha, Nechemyah — most with tribe honestly marked "not stated" rather than inferred.
  - Notable finds: Tzefanyah's own father is named "Kushi" (the Hebrew word for Cushite) — flagged as genuinely ambiguous (personal name vs. ethnic identifier) rather than asserted either way. Yonah's hometown Gat-Khefer is confirmed directly inside Zevulun's boundary text (Yehoshua 19:13). Amos's hometown Tekoa ties to Yehudah context.
  - Added two new honest UI badge states alongside "confirmed" and "not-a-tribe": "not-stated" (grey) and "incorporated" (green).
  - Backup: `backup/2026-09-09-acr-search-v302-figures-batch2` at pre-change SHA `d143b31`.

- **PR #908 — ACR Search: link Tribes and Territory into the Lineage Explorer** (merged into `main`, commit `2d19949`).
  - The lineage-web phase. The existing Lineage Explorer (Adam-to-twelve-tribes chain + tribe chips, previously every click just ran a generic corpus search) now jumps straight to a figure's Tribes & Territory card and highlights it, where one exists; falls back to the old search behavior unchanged otherwise.
  - Added Avraham and Yitzhak to FIGURES (both pre-tribal, verified: Bereshit 12:1-4/17:5 and 21:2-5) — both were missing even though they anchor the Lineage Explorer's central chain. FIGURES now totals 29.
  - New helpers `findFigureByName()` (explicit alias map for known transliteration mismatches between the two pre-existing datasets — Ya'aqov/Ya'akov, Yitshaq/Yitzhak, Noakh/Noach, Lewi/Levi — rather than fuzzy matching), `highlightFigureCards()`, `goToLineageName()`, `goToLineageTribe()`. Tribe chips highlight every confirmed member at once (e.g. "Levi" → Moshe, Yirmeyahu, Shemu'el together); "Yosef" (a person name in this array's older tribe-chip convention) jumps to Yosef's own card.
  - Caught and corrected two of my own test-timing artifacts during verification (the 300ms search debounce, and a prior highlight's un-cleared 2500ms timeout bleeding into the next check) rather than reporting either as a false finding — documented in the PR per Rule 33/34.
  - Backup: `backup/2026-09-09-acr-search-v303-lineage-web` at pre-change SHA `d23988a`.

- **PR #909 — ACR Search: live-news tie-in for Tribes and Territory cards** (merged into `main`, commit `05afce2`).
  - The live-news-tie-in phase. Each figure card now shows up to three today's-news headlines from the Prophetic Watch daily brief when one matches that figure's own already-established modern ground.
  - Added a `places:[...]` keyword array to each of the 29 FIGURES entries, derived strictly from place names already present in that figure's own approved `territory`/`modern` fields — no new claims. Matches by scanning `DAILY_BRIEF.items`' headline text directly (not the broader theme tags, which span too many countries to tie to one figure).
  - **Process miss, self-flagged**: skipped creating the pre-change backup branch before starting this edit — the first break in the backup-first pattern held every other time this session. Caught it after pushing, created `backup/2026-09-09-acr-search-v304-news-tiein` after the fact pointing at the correct pre-change SHA (`c677b17`, already independently confirmed matching `origin/main` before the edit started). Recovery point is accurate; the order was wrong. Flagged to the user directly in the PR body and in chat, not silently corrected.
  - Verified end-to-end against the real running app and against the actual live `daily_brief.json` (18 of 29 figures matched real headlines).
  - Backups: pre-change `backup/2026-09-09-acr-search-v304-news-tiein` (created late) at SHA `c677b175811284d110e592fdc7f306dba4b95e3d`; post-merge `backup/2026-09-09-acr-search-v305-news-tiein` at SHA `a5ca36bafdb0175bcc2473308f1bbd2fb33efd65`.

- **PR #910 — ACR Search: map trace for Tribes and Territory cards** (merged into `main`, commit `a17f4a2`).
  - The final planned phase. Adds a "VIEW ON MAP" button to 21 of the 29 figure cards, opening a lightbox with one of two schematic maps (reused as inline SVG from earlier session work found in the scratchpad, not drawn fresh) and a brief CSS-transition highlight — tribal-allotments map for tribe-confirmed figures (or Levi, shown with no highlight and the map's own "no allotment" note), boundary map (Genesis 15/Numbers 34) for everyone else with a places-keyword match to one of its six city pins. The other 8 figures (no tribe or ground match) correctly get no button.
  - Bonus finding during build: Yonah and Amos's tribe-field text ("hometown ties to Zevulun"/"...to Yehudah") gets picked up by the same tribe-name scan used for confirmed tribes, giving them a more precise tribal-map highlight than the boundary-map fallback originally planned.
  - Backup created correctly this time, before any edit: `backup/2026-09-09-acr-search-v305-map-trace` at pre-change SHA `a5ca36b`.
  - Verified against the real running app; all 29 classifications checked, highlight timing (another setTimeout-vs-test-read pitfall, same pattern as batch 1/lineage-web) caught and corrected during verification, not reported as a false bug.
  - This completes all four originally brainstormed phases (trace-the-line map, lineage web, forensic evidence-cards/badges, live-news tie-in).

- **PR #900 — ACR Solar: fix Year view month tiles all opening December** (merged into `main` at `a2bd26f`) — not this session's work; noted here only because it landed on `main` during today's timeline and is reflected in the commit log below.

## Outstanding / blocking
- **Rule 0 vs. Rule 16 consistency**: Rule 0 (No Western/European Bias) still uses "African"/"African Hebrew" terminology, while Rule 16 now says "Hebrew, from Kush, Mitzrayim, Put, and Kena'an." Flagged, not resolved — awaiting explicit user direction.
- **`daily_brief.yml` workflow-dispatch permission**: attempted to manually trigger the daily news-brief workflow so today's keyword changes (PRs #902/#904) would show up immediately instead of waiting for tomorrow's 6 AM UTC cron run. The call failed: `403 Resource not accessible by integration`. This session's GitHub integration cannot dispatch workflows — the user would need to trigger it manually from the repo's Actions tab, or wait for the scheduled run. Not something I can work around from here.
- **Mikhah's (Micah's) hometown territory**: could not confirm which tribe's land Moreshet sits in against ACR's own city lists this session — presented as "not confirmed" rather than guessed.

## Pending / parked
- Nothing pending from the original Tribes and Territory four-phase plan — all four phases shipped (PRs #906/#907 figures + badges, #908 lineage web, #909 live-news tie-in, #910 map trace).
- Not yet decided: whether to grow the figures dataset further (batch 3 — more names beyond the original brainstorm list) or extend to other sites.

## Capability gaps this session
- GitHub Actions `workflow_dispatch` is not accessible to this session's integration (see Outstanding above) — confirmed via a direct failed call, not assumed.
- Standard sandbox gaps (no direct fetch of `dssorit.github.io`, no Pages API) still apply per CLAUDE.md.
- This sandbox's local Playwright testing hits a pre-existing, unrelated network restriction that blocks the ACR Search app's loading-screen resource fetch — confirmed via a control test against the unmodified file (reproduces identically). Workaround used: invoke the real init/render/search functions directly in-page rather than waiting on that gate. Worth knowing for any future session doing local verification on ACR Search.

## Backups
- `backup/2026-09-09-acr-search-v301` — pre-PR-902-change state, SHA `08446e2413bcc41c7b71ccbb1a81cb5af323f340`.
- `backup/2026-09-09-acr-search-v301-b1e3127` — post-merge state after PR #902, SHA `b1e3127ee3508d39120af7b9d66fa205f4cab690`.
- `backup/2026-09-09-acr-search-v301-figures-batch1` — pre-PR-906-change state, SHA `a2bd26f6f7c9d3d3417aa1d9fa9a2c3d89d23fcf`.
- `backup/2026-09-09-acr-search-v302-figures-batch2` — pre-PR-907-change state, SHA `d143b3183f4153660c33c3275a43f6516fce03c7`.
- `backup/2026-09-09-acr-search-v303-figures-batch2` — post-merge state after PR #907, SHA `d23988a24e396c98d4104920a1c2c3d31788845e`.
- `backup/2026-09-09-acr-search-v303-lineage-web` — pre-PR-908-change state, SHA `d23988a24e396c98d4104920a1c2c3d31788845e`.
- `backup/2026-09-09-acr-search-v304-lineage-web` — post-merge state after PR #908, SHA `c677b175811284d110e592fdc7f306dba4b95e3d`.
- `backup/2026-09-09-acr-search-v304-news-tiein` — pre-PR-909-change state, SHA `c677b175811284d110e592fdc7f306dba4b95e3d` (created late, after push — see process note above).
- `backup/2026-09-09-acr-search-v305-news-tiein` — post-merge state after PR #909, SHA `a5ca36bafdb0175bcc2473308f1bbd2fb33efd65`.
- `backup/2026-09-09-acr-search-v305-map-trace` — pre-PR-910-change state, SHA `a5ca36bafdb0175bcc2473308f1bbd2fb33efd65` (created correctly before the edit this time).
- `backup/2026-09-09-acr-search-v306-map-trace` — post-merge state after PR #910, SHA `758d6ee7a866627f2c92e1bba3e06eba14a29aba`.
- All verified matching `origin/main` at the time of creation. Recovery: `git checkout backup/<name>`.

## Today's commit log (main, chronological)
```
2ddd39f Prophetic Watch brief 2026-09-09
9f982be Park the workout-audio idea for revisit next week (#899)
7a95879 Rule 16: use the true name Hebrew, not the Roman-derived label African
c74bfb4 Rule 16: state Hebrew-from-Kush directly, name the modern reference once
08446e2 Merge pull request #901 from DssOrit/claude/rule16-true-name-hebrew
52c20fd Expand daily brief keywords: full covenant land boundary, 400-year prophecy
84d3d43 Covenant Land: add Jordan (country), Mediterranean, tribal-allotment cities
b1e3127 Merge pull request #902 from DssOrit/claude/daily-brief-map-keywords
0943789 400-Year Prophecy: add Sadad and Orontes per explicit user instruction
fb3d7b1 ACR Solar: fix Year view month tiles all opening December (not this session)
a2bd26f Merge pull request #900 from DssOrit/claude/acr-solar-year-click-fix-2026-09-09
78a3b58 ACR Search: add Tribes and Territory figures lookup, batch 1
46ea81d ACR Search: Tribes and Territory batch 2 -- 22 more figures
d143b31 Merge pull request #906 from DssOrit/claude/acr-search-figures-batch1
d23988a Merge pull request #907 from DssOrit/claude/acr-search-figures-batch2
2d19949 ACR Search: link Tribes and Territory into the Lineage Explorer
c677b17 Merge pull request #908 from DssOrit/claude/acr-search-lineage-web
05afce2 ACR Search: live-news tie-in for Tribes and Territory cards
a5ca36b Merge pull request #909 from DssOrit/claude/acr-search-news-tiein
a17f4a2 ACR Search: map trace for Tribes and Territory cards
758d6ee Merge pull request #910 from DssOrit/claude/acr-search-map-trace
```
