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
