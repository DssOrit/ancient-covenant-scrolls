# Session Notes — 2026-11-13

## Current state
- Branch: `main`, HEAD `6c5c4d5` (merge commit for PR #1246), confirmed via `mcp__github__pull_request_read` (`merged: true`, `merged_by: DssOrit`).
- `Solar/sw.js` cache: `acr-solar-v99`.
- Working tree clean, nothing uncommitted.

## Built today
- **PR #1244 (merged)** — split Yom Todah into Day One (Friday, prep/cooking) and Day Two (Saturday, Sabbath meal), matching Yom Berachah's existing two-day structure. Expanded the weekly Shabbat page's Cooking guidance for keeping dishes warm into Day Two without kindling on the Sabbath.
- **PR #1245 (merged)** — added the interactive RSVP & Food Planner to ACR Solar: guest list with attending/not-attending toggles, live headcount, and a food-quantity calculator that scales each family dish to headcount. Added the family's traditional food lists (`familyFoods`) to Yom Todah Day One and Yom Berachah Day One, styled colorful and dyslexic-friendly per the user's reference screenshots.
- **PR #1246 (merged)** — added a photo to every family dish in the RSVP planner; tapping a dish with a recipe (26 of 27 — only Ice Cream is purchased, not made) opens a new supply-list-and-recipe detail overlay (photo, prep/cook time, servings, ingredients, numbered steps). Added a new "Extras — Either Day" section for 14 untagged additional dishes (Salmon, Cod Stuffed, Hake Cakes, Seafood Stuffing, Sea Bream Stuffed, Baked Beans, Asparagus, Fried String Beans, Fried Cod, Egusi Soup, Jollof Rice, Mayonnaise Biscuits, Cheddar Bay Cornbread, Three-Cheese Corn). Renamed dishes to the user's exact terms: "Stuffed Eggs" (never "deviled"), "Pilaf Rice", "Pecan & Raisin Cake", "Meat Loaf". Bumped cache to `acr-solar-v99`.
  - Verification before shipping: backup branch confirmed against pre-change `origin/main` SHA, `node --check` on all inline `<script>` blocks, `<div>` tag-balance check (662/662), all 30 food images resized/recompressed from 85MB to 5.2MB total and verified valid, headless-browser (Playwright) test against the real running app confirming all 27 food cards render with working images, quantity math, and correct recipe-detail open behavior for both a family-dish card and an Extras card.
- Created and pushed stable-state backup branch `backup/2026-11-13-acr-solar-v99` at current `main` HEAD `6c5c4d5` after the user confirmed PR #1246 merged.

## Outstanding / blocking — pending user decision (find-first-report-wait, nothing fixed yet)
After PR #1246 merged, the user supplied an old handwritten family shopping list and asked whether it reconciles with the shipped recipes. Cross-checked all 29 `FOOD_RECIPES` ingredient lists directly against the list. Findings reported to the user, **no fix applied yet — awaiting explicit approval on each item**:

**Systemic pattern — real meat/seafood vs. shipped meat-free substitutes (needs a yes/no on intent):**
- Collard Greens: list calls for beef bone + beef chunks; shipped recipe is labeled "(Pareve)," vegetable/mushroom stock only, no beef.
- Baked Beans: list calls for beef chunks; shipped recipe is labeled "(Meat-Free)," smoked tofu/plant mince/mushrooms, no beef.
- Stuffed Mushrooms: list says "cheese, stuffing & imitation crab"; shipped recipe is "Cheesy Hake-Stuffed Mushrooms" — real hake fish, no imitation crab, no bread/stuffing component.

**Specific missing ingredients (named on the list, absent from the shipped recipe):**
- Mayo missing from Cornbread, Mac n Cheese, Pecan & Raisin Cake, Stuffed Eggs (only Mayonnaise Biscuits has it).
- Mustard missing from Stuffed Eggs and Mac n Cheese.
- Pickles missing from Stuffed Eggs entirely.
- Salad dressing (list calls for it in Stuffed Eggs) — recipe uses olive oil + lemon juice instead.
- Butter missing from Cornbread (recipe uses oil).
- Cake mix (list implies boxed mix) — shipped Pecan & Raisin Cake is fully scratch-built.
- Chili powder missing from Baked Beans (recipe uses smoked paprika + optional cayenne instead).

**Minor, needs a yes/no:**
- Chicken broth: list says 2 cans (14.5 oz); Stuffing recipe says 8 broth cubes — same idea, different format, confirm quantity intent.
- "Apples for pie" on the list, but no Apple Pie exists on the site (only Sweet Potato Pie and Pumpkin Pie) — dropped idea or add it?
- "(Order Chinese or fry mixed chicken rice)" — alternative dish idea on the list; neither Jollof Rice nor Pilaf Rice has chicken. Still wanted as its own item?
- Cheese-It / powdered cheese on the list, unused in any of the 29 recipes — likely snacks, not a dish ingredient, flagged for completeness only.

**Confirmed consistent, no action needed:** D.eggs = Stuffed Eggs naming; Stuffing's Auchan/Goya ingredients; Pecan Pie correctly absent (user had crossed it out); sweet potato/graham crust/vanilla/nutmeg/condensed milk/ketchup-in-beans/garlic-onion seasoning; the turkey storyline (list shows turkey planned then "No Turkey" at the end, matching the site's current no-recipe "Turkey / Salmon" item).

Waiting on the user to say which of the above to correct (and specifically whether the three meat/seafood substitutions were an intentional pareve/kosher choice or should be reverted to the real ingredients).

## Pending / parked
- None newly parked this session.

## Capability gaps in this session
- None encountered this session beyond the standing sandbox network gaps already documented above (Pages URL and Pages API unreachable; raw.githubusercontent.com and GitHub MCP used instead).

## Backups
- `backup/2026-11-13-acr-solar-v96` — pre-existing, from earlier in the day (before this session's work).
- `backup/2026-11-13-acr-solar-v97` — pre-existing, from earlier in the day (before this session's work).
- `backup/2026-11-13-acr-solar-v98` — pre-change backup taken before PR #1246's edits, SHA `1ac70fd976bda7a97005ffdfcf2de93800840825`, verified matching pre-change `origin/main`.
- `backup/2026-11-13-acr-solar-v99` — stable-state backup at current `main` HEAD `6c5c4d52e36ed3bfc50be9ee51dd5b0065c90043`, taken after the user confirmed PR #1246 merged and working. Recovery: `git checkout backup/2026-11-13-acr-solar-v99`.

## Today's commit log
```
6c5c4d5 Merge pull request #1246 from DssOrit/claude/solar-recipe-detail-2026-11-13
c3c0ec6 Add food photos, recipes, and Extras section to Solar RSVP planner
9d42a6b Prophetic Watch brief 2026-11-13
1ac70fd Merge pull request #1245 from DssOrit/claude/solar-rsvp-planner-2026-11-13
ddce104 Solar: add RSVP & Food Planner and the family food lists
d01f581 Merge pull request #1244 from DssOrit/claude/solar-yomtodah-twoday-2026-11-13
e0c04f8 Solar: split Yom Todah into Day One (Fri) / Day Two (Sat), expand Cooking guidance
```
