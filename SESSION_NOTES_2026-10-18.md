# Session notes 2026-10-18

## Current state
- Branch `claude/loadsurvival-green`, PR #1038 open (not merged). Cache `load-survival-p10-v24`.
- Backups: `backup/2026-10-18-acr-v133` (before PR #1037), `backup/2026-10-18-lsp8-v20` (before PR #1038). Recover with `git checkout backup/<name>`.

## Built today (Load Survival, /loadsurvival/ only)
- PR #1037 merged by the owner: premium redesign, PNG icons, scoped refresh circle, service-worker cache cleanup limited to `load-survival-`.
- PR #1038: green and silver design from the new brand board, new logo icons and favicon.
- Gap fill (same PR): hash router, Guides/Lists/Tools/Plan/Search/About pages, 21 spec-format guides (8 disasters, 5 essentials, 8 medical), 8 checklists, 7 tools (water and food, bleach dose, fridge timer, watt-hours, unit converter, screen flashlight, SOS flash), family plan (save, print, copy), site-wide search, emergency numbers strip (US 911, Portugal 112, UK 999 in strip only), "I need help now", Rule of 3s, region boxes (US, Portugal, Both), install hint, offline badge, About and sources.

## Outstanding / needs the owner
- Guide text for items not in the supplied KEY CONTENT (choking, fractures, shock, hypothermia details, pets, grid-down, group, winter storm, hurricane, signaling, typical device watts) was written as standard general guidance and needs expert review.
- Existing ChatGPT water lessons say "never guess bleach drops"; the new bleach tool and Making electricity guide use the supplied figures (6% bleach, 8 drops per gallon, 30 minutes).
- Existing ChatGPT lesson pictures are purple-toned; regenerate in green.
- Portuguese text is machine-supplied, not reviewed by a native speaker. New guides are English only.
- Offline mode and iPad install not tested on a real device.

## Pending / parked
- Real logo and icon source files (current icons cropped from a ~400 px board).
- Splash photos from the brand board.

## Capability gaps
- No live site access from the sandbox; live URL unverified.

## Update (later 2026-10-18): WHERE WE LEFT OFF
- PR #1038 merged. PR #1039 open (not merged): 12 water pictures, 2 new water lessons, and 22 new "Home skills" guides (cache p13-v29).
- Home skills guides built from the owner's idea screenshots, rewritten in our own words with safety limits. Left out on purpose: EMP-proof car, flu/tincture/stop-bleeding/painkiller/mullein/papaya remedies, intruder traps, evading checkpoints and tracking, thermal hiding, elicitation, detecting mics, zip-tie escape, narcissist/disrespect, hidden underground shelter, bacon 5-year, nettle soup.
- Image prompts for the 22 Home skills guides sent in chat. Owner will generate and send pictures; place them via `image` field in `home-skills-data.js` and add paths to the service worker.
- NEXT: (1) place Home skills pictures when they arrive; (2) write Part 3 prompts (power, fire, shelter) in the text-free green style; (3) review pass on medical guide wording; (4) native Portuguese review; (5) real iPad offline test.
- Water pictures needing no more fixes: storage, rain, disinfection were regenerated text-free.

## Update: per-step pictures
- Owner reported one picture showing for every step. Fixed: each 4-panel picture is split into its own panels (`assets/steps/<lesson>-<n>.jpg`) and `step-images.js` maps steps to panels. 20 lessons now change picture with each step (cache p14-v30). Combined pictures removed.
- Old purple ChatGPT diagrams (Parts 2 to 6 SVG lessons, 22 lessons) still show one picture per lesson.

## Update: panel beside each "What to do" step
- PR #1039 and #1040 merged. Guides now show one picture panel beside each "What to do" step when `window.LOAD_STEP_IMAGES[<guide id>]` has panels (cache p15-v31).
- Home skills pictures: owner generates 5-panel pictures (2 on top, 3 below), one panel per "What to do" step. Split with `python3 -I scripts/loadsurvival_split_panels.py hs-beans=beans.png ...`, then add the new files to the service worker list and bump the cache.
- NEXT: place Home skills pictures when they arrive; Part 3 prompts (power, fire, shelter); medical wording review; Portuguese review; real iPad offline test.
- Placed first 6 Home skills pictures (bread, hardtack, beans, eggs, food storage, canning). Remaining 16 prompts not yet sent/generated. Cache p16-v32.
- Placed 15 more Home skills pictures (21 of 22 have panels). Missing: hs-seawater. Notes: car-escape picture shows children in a flooded car and a burning car (owner chose to use it); faraday step 2 caption typo 'toutching', dry-bread-mix has 'Buttemilk' typo, hand-pump filter is a mesh strainer. Splitter now handles 2+3, 3+2 and a custom hand-pump layout. Cache p17-v33.
- Placed hs-seawater picture: all 22 Home skills guides now have pictures (cache p19-v35). Added water guides wx-river, wx-rain, wx-sea (no pictures yet; prompts sent).
- Placed wx-river, wx-rain, wx-sea pictures (cache p20-v36).
- Placed first 6 older-guide pictures (power outage, winter storm, hurricane, tornado, earthquake, wildfire). Prompts sent for all 21; choking and burns reworded. Cache p21-v37.
- Placed 9 more older-guide pictures (heat wave, electricity, pets, grid-down, group, bleeding, CPR, choking, burns; burns cut from a combined choking+burns board). 15 of 21 older guides illustrated. Left: flood, signaling, hypothermia, heat illness, fractures, shock. Cache p22-v38.
- Placed shock, fractures, heat illness, hypothermia; replaced burns with the standalone picture. 19 of 21 older guides illustrated. Left: flood, signaling. Cache p23-v39.
