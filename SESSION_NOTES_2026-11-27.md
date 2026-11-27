# Session Notes — 2026-11-27

## Current state
- `main` HEAD `02e86eb690dca80eb8c574ece49d7cf788520383` (PR #1271 merge commit), confirmed via `mcp__github__pull_request_read` (`merged: true`, `merged_by: DssOrit`).
- `Solar/sw.js` cache: `acr-solar-v99` (unchanged across all PRs this window). `Search/sw.js` cache: `acr-search-v349` (unchanged).
- Working tree clean, `main` up to date with `origin/main`.
- This file picks up where `SESSION_NOTES_2026-11-24.md` left off (which covered through PR #1265). Continuous session spanning 2026-11-24 through 2026-11-27.

## Built this window (chronological, PRs #1266-#1271)
- User asked a dietary-law research question (holiday meat, "is it okay to eat kosher meat"), which turned into an extended, heavily-verified research thread answered directly from ACR Reader's own primary-source text (Vayikra 11, Vayikra 17, Devarim 8, 12, 14 — read directly from `data/file_7.json`, `file_8.json`, `file_11.json`, never from memory), then from ACR Search's existing "Covenant Table" section, then from Yovelim 7 and 21 (read directly from `data/file_16.json`) after the user pushed for more precision on the blood-disposal question and the EU-slaughter-method limitation. This research is not itself shipped as new site content beyond what's listed below — it lived in chat, with two content PRs capturing the primary-source gaps it surfaced.
- **PR #1266 (merged)** — Search: added Vayikra 17:11, 17:13-14, and Devarim 12:16/23-24 (the direct Torah blood-law verses) to `covenant_laws → Food Laws`, filling a gap where only the Damascus Document's paraphrase was indexed, not the Torah text itself.
- **PR #1267 (merged)** — Solar: new standalone "Food Law" bottom-nav tab (10th tab), built like the existing Prayer Library (topic cards → `openTextPage`). Five topics: Clean & Unclean Animals, The Blood Law, Meat and Milk, The Blessing Over the Meal, 'Kosher' and 'Halal' — What They Actually Are. All verse text cross-checked against the Reader's own files. Caught and fixed my own bug before shipping: wrong paleo-Hebrew Unicode codepoints for כשר (kasher) — verified the correct ones against the already-proven YHWH glyph mapping in the same file.
  - Disclosed process note: briefly committed this onto the wrong (Search) branch by mistake; caught before pushing, split cleanly via `git rebase --onto`, verified the Solar branch's diff against `origin/main` was exactly the one intended file.
- User then asked for the same "must be drawable in one clear image" rule already applied to Paint & Guess's Songs pool to be applied to this new tab — not applicable (this tab is text, not a party-game pool); no action needed, carried forward correctly in the next round.
- **PR #1268 (merged)** — Search: added Devarim 14:21 (nevelah) and Shemot 22:30 (treifah) citations to `Food Laws`, closing the gap between the site's existing prose ("Covenant Table") and its structured search index.
- **PR #1269 (merged)** — Solar: added a 6th topic, "Nevelah & Treifah," to the Food Law tab — states the full three-condition framework (clean species + deliberate slaughter + blood removed) and the grocery-store-meat confirmation, naming turkey and beef directly.
- User reported (with iPad screenshots) that the paleo-Hebrew kasher glyph rendered garbled and didn't match ACR Reader's clean rendering. **PR #1270 (merged)** — Solar: found and fixed a repo-wide font-stack bug (confirmed, not a false positive, by checking 6 Reader volumes spanning the full 92-file corpus): Solar used an incomplete 2-font paleo stack everywhere (8 occurrences, not the "6" first estimated), while the Reader universally uses a 4-font stack. Fixed all 8, plus wrapped the previously-unstyled kasher glyph in the same corrected span.
- Follow-up screenshot comparison (Solar vs. Reader, same glyph) showed a real visual difference, but PR #1270 had not yet been merged at that point — flagged to the user that the comparison couldn't be meaningful until merged.
- Research continued: user pressed on whether EU commercial slaughter actually satisfies Vayikra 17 / Devarim 12's blood law, citing Yovelim 7 and 21 directly. Read both chapters from the Reader (`file_16.json`) and found they go further than Vayikra/Devarim alone — Yovelim 7:30 generalizes "cover the blood with dust" (Vayikra 17:13's hunting-only rule) to *all* slaughter, and Yovelim 21:17-18 frames it in personal, embodied terms ("let no blood appear upon you"). Answered honestly: this surfaces a genuine, unresolved gap — EU regulation governs food safety, not covenant compliance, and some permitted stunning methods can reduce bleed completeness; no specific supplier's procedure has been verified. Did not overcorrect into a false "therefore forbidden" conclusion either — distinguished the verified conditions (species, nevelah/treifah) from the genuinely open one (disposal-method completeness).
- User pasted a product-recommendation summary (apparently from another AI service) naming Lusiaves/Continente/Auchan/Pingo Doce turkey sourcing. Checked what could be verified via `WebSearch`: Lusiaves is a real, vertically-integrated Portuguese poultry producer; the Criação/Abate/Origem labeling framework is real EU/Portuguese law. The specific "Confirmed/Confirmed/Confirmed" product claims had no working citation in what was pasted (stripped footnote markers, no URLs) — flagged as unverified, not accepted at face value per the standing citation standard. Also noted this doesn't resolve the open blood-disposal-method question from the prior round, since that's a slaughter-method question, not a country-of-origin one.
- Gave practical soak-and-salt instructions (cold water soak, coarse salt, rest, rinse, cook through) matching the method already documented on the site — no site change needed, informational only.
- User flagged (screenshot) that both Yom Todah and Yom Berachah's holiday descriptions called themselves a "family-created observance," and asked that this not say "created" — just "tradition." **PR #1271 (merged)** — Solar: changed "family-created observance" → "family observance" in all 4 occurrences (Yom Todah Day One & Two, Yom Berachah Day One & Two); confirmed via grep this was the complete set (no 5th instance, Yom Berachah already covered as "the December holiday" the user asked about).
- All six Solar/Search PRs this window followed the backup-first → verify → fix → merge-link flow: a fresh unlock phrase every round, a pre-change backup branch verified against the exact `origin/main` SHA before each edit, and every fix checked with `node --check`, `<div>`/`<span>` tag-balance counts, and headless-browser (Playwright) functional tests exercising the real app/search behavior — never just code-reading — before pushing.

## Outstanding / blocking
None on the code side. All six PRs (#1266-#1271) are merged and confirmed via `mcp__github__pull_request_read`.
- **Open research question, not a to-do**: whether any specific Portuguese supplier's slaughter method satisfies the Yovelim-level "blood poured out and covered with dust" standard remains explicitly unverified — this is a standing epistemic gap in the user's own research, not a pending site task.

## Pending / parked
- None newly parked this window.

## Capability gaps in this session
- None beyond the standing sandbox network gaps already documented in `HANDOFF.md`/earlier session notes. `WebSearch` was available and used this window (previously not used in this session).

## Backups
- `backup/2026-11-25-acr-solar-v99_search-v349` — pre-change backup before PR #1266/#1267, SHA `9074fe25b3252171640c6f0df62d0c2c64e045a8`.
- `backup/2026-11-25-acr-solar-v99_search-v349_b` — pre-change backup before PR #1268/#1269, SHA `22a6b3df8671fae2de24ba5f8580e17ba545ba78`.
- `backup/2026-11-25-acr-solar-v99_c` — pre-change backup before PR #1270, SHA `c01eda34ecde89875cad26f07e370d5fb0ecc68f`.
- `backup/2026-11-27-acr-solar-v99` — pre-change backup before PR #1271, SHA `43b6d2bb7aaac1832f62bc837b6e50aeb4b99193`.
- `backup/2026-11-27-acr-solar-v99b` — stable-state backup at `main` HEAD `02e86eb690dca80eb8c574ece49d7cf788520383`, taken after the user confirmed PR #1271 merged. Recovery: `git checkout backup/2026-11-27-acr-solar-v99b`.

## Today's commit log (this window's PRs only)
```
02e86eb Merge pull request #1271 from DssOrit/claude/solar-holiday-desc-wording-2026-11-27
6b46896 Solar: remove "created" from holiday descriptions, keep "family observance"
(PR #1270 merge) Merge pull request #1270 from DssOrit/claude/solar-paleo-font-stack-2026-11-25
6c491a2 Solar: fix paleo-Hebrew font stack to match ACR Reader's convention
(PR #1269 merge) Merge pull request #1269 from DssOrit/claude/solar-nevelah-treifah-2026-11-25
6ca781a Solar: add Nevelah & Treifah topic to Dietary Law tab
(PR #1268 merge) Merge pull request #1268 from DssOrit/claude/search-nevelah-treifah-2026-11-25
3a8ce27 Search: add Nevelah (Devarim 14:21) and Treifah (Shemot 22:30) citations
(PR #1267 merge) Merge pull request #1267 from DssOrit/claude/solar-dietary-law-tab-2026-11-25
94734d2 Solar: add Dietary Law tab (clean animals, blood law, dairy, blessing)
(PR #1266 merge) Merge pull request #1266 from DssOrit/claude/search-food-laws-blood-2026-11-25
1034d90 Search: add Vayikra 17 and Devarim 12 blood-law citations to Food Laws
```
