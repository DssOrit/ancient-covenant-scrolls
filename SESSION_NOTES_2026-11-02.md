# Session notes 2026-11-02 (covers work done on 2026-11-01)

## Current state
- origin/main at b9a60c85 (PR #1175 merged). Cache on main: loadsurvival-p135-v153.
- PR #1176 (four 90-day worked examples, cache p136-v154) is open and not merged when this was written. Branch claude/loadsurvival-worked-examples.
- Backups pushed: backup/2026-11-01-loadsurvival-p134-v152 (0d778a1a), backup/2026-11-01-loadsurvival-p135-v153 (b9a60c85). Recovery: git checkout backup/<name>.

## Built (Load Survival, each round needed the phrase)
- #1175 (merged): Coimbra 90-day worked example, two guides coimbra-90-plan and coimbra-90-numbers (4 people, 5 small dogs of 8, 10, 10, 11 and 16 lb). Cache p135-v153.
- #1176 (open): four more worked examples in worked90-data.js: w90-ca-single, w90-ca-couple (15 lb dog), w90-fl-pregnant (20 lb dog, 10 lb cat, woman 30 weeks pregnant at start), w90-london-elder (boarding house room, no-cook, no flame). Each has a Start here list, easy shopping list, ten weekly lots, every sum, totals table, Not confirmed list. Fish is the only meat for people and pets.
- Word document (not in the repo): Coimbra_90_Day_Survival_Plan_Example.docx, dyslexia-friendly, about 47 pages: Start here page, easy shopping list, exact totals, ten-week buying schedule, fish-only meat, dog pee pads, wipes, paper towels, bin bags, battery cooking, chargers, low-cost solar and batteries. Built from downloads-local/build.js (excluded from git); the generator for the four new guides is downloads-local/gen90.js. Both are lost if the container is reset.

## WHERE WE LEFT OFF ON PICTURES (owner asked that this is remembered)
- Picture work for the stories is finished except two frames. All other story frames are in main (PRs #1167 to #1170, cache p134-v152).
- Still missing, owner said images would wait until a later day:
  1. Flood story 5 (story-05-sanitation), frame 3: urine and solids kept apart. File name story-05-f3.jpg. Prompt: the woman with curly dark hair, a dark apron and gloves kneels in a utility room beside two strong lidded buckets side by side, one with a blue tape band and one with a brown tape band, fitting a liner in one; roll of paper and a bag of dry sawdust beside them.
  2. Flood story 9 (story-09-lost-glasses), frame 6: getting new glasses. File name story-09-f6.jpg. Prompt: an older woman in her 70s with grey hair and a red cardigan sits in a bright eye clinic chair, her adult daughter beside her, a clinician holds a plain pair of glasses ready; no signs or charts with writing.
- Master style for both: realistic documentary-style colour photograph, 16:9, natural soft light, muted colours, no words, letters, numbers, signs, labels or logos; same people and style as the reference picture; no wading, flames, roofs, attics, sealing, towels in drains, live wires, generator indoors.
- When the owner sends them: new round needs the phrase "edit Load Survival"; cut to 16:9 at 1280x720, add to flood-story-data via story-frames-data.js rows, caption and screen-reader text, bump cache.
- Part 8 story 6 frames 2 and 4 now use the owner family pictures (PR #1170). Frames 1 and 3 use older object-only pictures. Optional family-matched replacements for 7 older frames were offered and left as is.
- Older picture ideas still undecided: Part 3 step photos (16 prompts) and flat strips (19 prompts).
- Real iPad Safari test still pending (DEVICE TEST PENDING).

## Next requested (waiting on the phrase and on #1176 being merged first)
- Add the exact-totals and weekly-buying format and the Start here list to the two Coimbra site guides, to match the new four guides. Needs "edit Load Survival" for that round, a fresh backup, and a fresh branch from main after #1176 merges.

## Capability notes
- The GitHub tool dropped and reconnected several times in this session; check it before relying on PR status.
- Render tests: set lazy images to eager; test the real index.html in page order.
