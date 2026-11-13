# Session Notes — 2026-11-13

## Current state
- `main` HEAD `ec3899e` (PR #1248 merge commit), confirmed via `mcp__github__pull_request_read` (`merged: true`, `merged_by: DssOrit`).
- `Solar/sw.js` cache: `acr-solar-v99` (unchanged by PR #1247 or #1248 — neither touched the SW cache-list files).
- Working tree clean, nothing uncommitted. Nothing outstanding — all five PRs from today (#1244, #1245, #1246, #1247, #1248) are merged.

## Built today
- **PR #1244 (merged)** — split Yom Todah into Day One (Friday, prep/cooking) and Day Two (Saturday, Sabbath meal), matching Yom Berachah's existing two-day structure. Expanded the weekly Shabbat page's Cooking guidance for keeping dishes warm into Day Two without kindling on the Sabbath.
- **PR #1245 (merged)** — added the interactive RSVP & Food Planner to ACR Solar: guest list with attending/not-attending toggles, live headcount, and a food-quantity calculator that scales each family dish to headcount. Added the family's traditional food lists (`familyFoods`) to Yom Todah Day One and Yom Berachah Day One, styled colorful and dyslexic-friendly per the user's reference screenshots.
- **PR #1246 (merged)** — added a photo to every family dish in the RSVP planner; tapping a dish with a recipe (26 of 27 — only Ice Cream is purchased, not made) opens a new supply-list-and-recipe detail overlay (photo, prep/cook time, servings, ingredients, numbered steps). Added a new "Extras — Either Day" section for 14 untagged additional dishes (Salmon, Cod Stuffed, Hake Cakes, Seafood Stuffing, Sea Bream Stuffed, Baked Beans, Asparagus, Fried String Beans, Fried Cod, Egusi Soup, Jollof Rice, Mayonnaise Biscuits, Cheddar Bay Cornbread, Three-Cheese Corn). Renamed dishes to the user's exact terms: "Stuffed Eggs" (never "deviled"), "Pilaf Rice", "Pecan & Raisin Cake", "Meat Loaf". Bumped cache to `acr-solar-v99`.
  - Verification before shipping: backup branch confirmed against pre-change `origin/main` SHA, `node --check` on all inline `<script>` blocks, `<div>` tag-balance check (662/662), all 30 food images resized/recompressed from 85MB to 5.2MB total and verified valid, headless-browser (Playwright) test against the real running app confirming all 27 food cards render with working images, quantity math, and correct recipe-detail open behavior for both a family-dish card and an Extras card.
- Created and pushed stable-state backup branch `backup/2026-11-13-acr-solar-v99` at `main` HEAD `6c5c4d5` after the user confirmed PR #1246 merged.
- Wrote and pushed this session-notes file directly to `main` (`f67216b`).
- **PR #1247 (merged)** — see "Shopping-list reconciliation" below for the full resolution of the handwritten-list cross-check. Backup branch `backup/2026-11-13-acr-solar-v99b` taken before this fix, SHA `f67216b71e1e91b33d338377a21b05afd308616e`, confirmed matching pre-change `origin/main`. Verification: `node --check` on inline scripts passes, `<div>` tags balanced (662/662), headless-browser test confirmed all 5 new/updated notes render with the exact text and Stuffing's first ingredient reads "8 mushroom or vegetable broth cubes, per batch of 2 pans," zero page errors. Confirmed merged via `mcp__github__pull_request_read` (`merged_by: DssOrit`), merge commit `5d401d1`.
- Created and pushed stable-state backup branch `backup/2026-11-13-acr-solar-v99c` at `main` HEAD `5d401d1` after the user confirmed PR #1247 merged.
- **PR #1248 (merged)** — the user noticed "Turkey / Salmon" in Yom Todah Day One's food list had no photo (no single existing image covered the combo item). User supplied a new photo (turkey legs + salmon fillet on the gold plate). Added as `Solar/images/food/turkey-salmon.jpg` (900px max, JPEG, 164 KB) and wired into the `familyFoods` entry. Backup branch `backup/2026-11-13-acr-solar-v99d` taken before this fix, SHA `3ec34b64ba9baf77ad5896bd3036335f861bf8ca`, confirmed matching pre-change `origin/main`. Verification: `node --check` passes, `<div>` tags balanced (662/662), headless-browser test confirmed the photo renders (`naturalWidth: 900`), zero page errors. Confirmed merged via `mcp__github__pull_request_read` (`merged_by: DssOrit`), merge commit `ec3899e`.
- Created and pushed stable-state backup branch `backup/2026-11-13-acr-solar-v99e` at `main` HEAD `ec3899e` after the user confirmed PR #1248 merged.

## Outstanding / blocking
None. All five PRs from today (#1244, #1245, #1246, #1247, #1248) are merged and confirmed.

## Shopping-list reconciliation — all items resolved this session
After PR #1246 merged, the user supplied an old handwritten family shopping list and asked whether it reconciles with the shipped recipes. Cross-checked all 29 `FOOD_RECIPES` ingredient lists directly against the list, reported every finding, and got explicit per-item direction. Resolution:

- **Meat/seafood substitutes — user confirmed intentional, no change.** Collard Greens, Baked Beans, and Stuffed Mushrooms stay as shipped (pareve/meat-free stock, hake instead of imitation crab). User's exact words: "meat free yes."
- **Mayo/mustard/pickles/butter/chili-powder/cake-mix gaps — fixed as side notes, PR #1247.** User asked for these "as side notes," not as ingredient-list rewrites. Applied: Stuffed Eggs note now also records the family's mayo/mustard/pickles version; Cornbread note now also records butter instead of oil plus mayo; Mac n Cheese note now also records added mayo and mustard; Pecan & Raisin Cake gets a new note recording the boxed-cake-mix-plus-mayo version; Baked Beans gets a new note recording the added chili powder. None of the main `ingredients`/`steps` arrays changed — these are side notes only, appended to (or newly added alongside) the existing kosher/pareve explanation already on each recipe.
- **Chicken broth in Stuffing — fixed as a direct swap, PR #1247.** User said "switch chicken broth for mushrooms or veggies broth" (a straight substitution, not a side note). "8 chicken broth cubes" is now "8 mushroom or vegetable broth cubes."
- **Apple pie — declined, no action.** User: "No apple pie."
- **Chicken-rice dish — declined, no action.** User: "no chicken rice."
- **Cheese-It / powdered cheese** — no action needed; these never had a dish tie, flagged for completeness only, user raised no objection.

**Confirmed consistent, no action needed:** D.eggs = Stuffed Eggs naming; Stuffing's Auchan/Goya ingredients; Pecan Pie correctly absent (user had crossed it out); sweet potato/graham crust/vanilla/nutmeg/condensed milk/ketchup-in-beans/garlic-onion seasoning; the turkey storyline (list shows turkey planned then "No Turkey" at the end, matching the site's current no-recipe "Turkey / Salmon" item).

## Pending / parked
- None newly parked this session.

## Capability gaps in this session
- None encountered this session beyond the standing sandbox network gaps already documented above (Pages URL and Pages API unreachable; raw.githubusercontent.com and GitHub MCP used instead).

## Backups
- `backup/2026-11-13-acr-solar-v96` — pre-existing, from earlier in the day (before this session's work).
- `backup/2026-11-13-acr-solar-v97` — pre-existing, from earlier in the day (before this session's work).
- `backup/2026-11-13-acr-solar-v98` — pre-change backup taken before PR #1246's edits, SHA `1ac70fd976bda7a97005ffdfcf2de93800840825`, verified matching pre-change `origin/main`.
- `backup/2026-11-13-acr-solar-v99` — stable-state backup at `main` HEAD `6c5c4d52e36ed3bfc50be9ee51dd5b0065c90043`, taken after the user confirmed PR #1246 merged and working. Recovery: `git checkout backup/2026-11-13-acr-solar-v99`.
- `backup/2026-11-13-acr-solar-v99b` — pre-change backup taken before PR #1247's edits, SHA `f67216b71e1e91b33d338377a21b05afd308616e`, confirmed matching pre-change `origin/main`.
- `backup/2026-11-13-acr-solar-v99c` — stable-state backup at `main` HEAD `5d401d1`, taken after the user confirmed PR #1247 merged and working. Recovery: `git checkout backup/2026-11-13-acr-solar-v99c`.
- `backup/2026-11-13-acr-solar-v99d` — pre-change backup taken before PR #1248's edits, SHA `3ec34b64ba9baf77ad5896bd3036335f861bf8ca`, confirmed matching pre-change `origin/main`.
- `backup/2026-11-13-acr-solar-v99e` — stable-state backup at `main` HEAD `ec3899e`, taken after the user confirmed PR #1248 merged and working. Recovery: `git checkout backup/2026-11-13-acr-solar-v99e`.

## Today's commit log
```
ec3899e Merge pull request #1248 from DssOrit/claude/solar-turkey-salmon-img-2026-11-13
c791cdf Solar: add Turkey & Salmon photo to Yom Todah Day One's food list
5d401d1 Merge pull request #1247 from DssOrit/claude/solar-recipe-notes-2026-11-13
f8d60d8 session notes 2026-11-13: shopping-list reconciliation resolved, PR #1247 opened
ff970d8 Solar: add family-version side notes to 4 recipes, swap Stuffing to veggie broth
6c5c4d5 Merge pull request #1246 from DssOrit/claude/solar-recipe-detail-2026-11-13
c3c0ec6 Add food photos, recipes, and Extras section to Solar RSVP planner
9d42a6b Prophetic Watch brief 2026-11-13
1ac70fd Merge pull request #1245 from DssOrit/claude/solar-rsvp-planner-2026-11-13
ddce104 Solar: add RSVP & Food Planner and the family food lists
d01f581 Merge pull request #1244 from DssOrit/claude/solar-yomtodah-twoday-2026-11-13
e0c04f8 Solar: split Yom Todah into Day One (Fri) / Day Two (Sat), expand Cooking guidance
```
