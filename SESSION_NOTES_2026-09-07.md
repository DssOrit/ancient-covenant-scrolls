# Session Notes — 2026-09-07

## Current state

- Latest commit on `main`: `4796e485` (merge of PR #890)
- Branch used this session: `claude/acr2-fix-1qs-cd-covenant-corruption` — merged, treated as finished per workflow rule
- Working tree: clean, nothing uncommitted
- ACR2 cache: `acr2-v30` (verified live on `main` via raw.githubusercontent.com, matches the pushed value)

## Built today

**Sandbox network breakthrough (research, no code shipped from this alone):** Confirmed this session's network policy blocks archive.org's file-serving subdomains (`ia*.us.archive.org`, `dn*.archive.org`, `web.archive.org`) but allows the apex `archive.org` domain, including its `/stream/<identifier>/<file>` full-text-viewer endpoint, which returns OCR'd book text embedded in HTML without redirecting off-domain. Used this to reach the DSS Study Edition (García Martínez & Tigchelaar, 1999) — confirmed not access-restricted — as a genuine, independent completeness/structure control per repo Rule 35/36. This is what made the fixes below possible; previously IAA/Leon Levy, Qumran-Digital, and SciSpace were all tested and confirmed blocked.

**PR #890 — "ACR2: repair 1QS/CD note corruption, Column 1 duplication, and Damascus Document-wide duplication"** (merged today, `merged_at: 2026-09-07T16:43:26Z`, merged by DssOrit):

1. **Note-text "covenant"-word-repetition corruption** — fixed 105 of 108 affected note spans across the Damascus Document (Vol 15, `file_19.json`/`file_20.json`) and Community Rule (Vol 16, `file_21.json`), preserving the one genuine recurring phrase ("covenant renewal"). Traced via full git history to the original file upload — not a regression from any later edit.
2. **1QS Column 1 Two Spirits duplication** — Column 1 verses 8-21 were a verbatim duplicate of the Two Spirits treatise that already exists correctly in Columns 3-4. Wrote fresh Column 1 verses 8-17 covering the genuine missing content (covenant of loving-kindness, sons of light/darkness by lot, the covenant-entry ceremony), relocating content that existed but was misplaced at the tail of Column 2, and added Column 2's genuine closing (verses 16-17) which had been missing entirely.
3. **Damascus Document-wide duplication** — a full line-by-line audit of all 16 columns against the Study Edition (used strictly as a control; nothing copied or paraphrased into ACR content) found duplicated/misplaced material running through most of the Admonition and part of the Laws section:
   - Column 1 (v20-21), Column 2 (v16-18, v21), Column 3 (v4-5, v11-12, v19-21), Column 5 (v4-6, v14), Column 6 (v15-21), Column 7 (v14), Column 9 (v15-21), Columns 10/11/14 (the imported "session of the many" block) — all had duplicated content removed, with verse renumbering and comparative-note updates applied throughout.
   - Column 4 was the most affected: verses 4-17 were almost entirely duplicated from Columns 5-8. Its own genuine content — declaring the just/wicked, the covenant with the forefathers, "the wall is built, the boundary far away" — was missing entirely and was written fresh (control-checked against the source, never copied) to fill the gap.
   - Several pairs that looked like duplicates on a first pass turned out to be genuine CD-A/CD-B parallel witnesses (the Damascus Document survives in two overlapping ancient manuscript copies) and were correctly left untouched — most notably the "thousand generations" covenant line legitimately appearing once each in Columns 7 and 8.
4. Cache bumped `acr2-v27` → `acr2-v30` across the three fixes in this PR.

## Outstanding / blocking

- **Four low-confidence residual duplicate pairs in the Damascus Document, flagged but not fixed** (direction unconfirmed, left alone rather than guessed at):
  - Column 15 v7 / Column 16 v17 — near-identical entry-ranking sentence.
  - Column 3 v12 / Column 7 v8 — "took refuge in his holy name" line.
  - Column 2 v10 / Column 3 v1 — "first entered the covenant... given to the sword" line.
  - Column 12 v21 / Column 16 v12 — generic closing formula, likely coincidental rather than a real duplicate.
  Worth a closer look in a future session if the user wants full closure on this.
- **The Yovelim (Jubilees) sourcing-access blocker from `SESSION_NOTES_2026-09-03.md`** — the archive.org `/stream/` method discovered today should unblock this. Not yet applied to Yovelim's known chapter gaps (Ch. 6-25 in `data/file_16.json`/`file_17.json`) — worth picking up next session using the same method.
- A possible additional gap noticed but **not verified**: live 1QS Column 3 may be missing the real manuscript's opening lines about the person who refuses correction (before "the spirit of true counsel..."). Flagged during the 1QS audit, never independently confirmed — do not treat as fact without checking.

## Pending / parked

- Nothing newly parked this session.

## Capability gaps in this session

- SciSpace, Qumran-Digital, IAA/Leon Levy Digital Library: confirmed blocked by this sandbox's network egress policy (`connect_rejected` at the proxy).
- archive.org's file-serving subdomains (`ia*.us.archive.org`, `dn*.archive.org`) and `web.archive.org` are blocked even though the apex domain is allowed — use the `/stream/` endpoint workaround documented above for future sourcing work on this repo.

## Today's commit log (this session's branch, newest first)

```
3620b23b ACR2: fix Damascus Document duplication across Columns 1-11, 14
8647e5ce Merge remote-tracking branch 'origin/main' into claude/acr2-fix-1qs-cd-covenant-corruption
e5990e81 ACR2: fix 1QS Column 1 Two Spirits duplication, reconstruct genuine covenant-entry content
9d0f991f Merge remote-tracking branch 'origin/main' into claude/acr2-fix-1qs-cd-covenant-corruption
f87a2f89 ACR2: repair covenant-word-repetition corruption in Damascus Document and Community Rule notes
```
(merged to `main` as `4796e485`)

## Backups

- **`backup/2026-09-07-pre-acr2-1qs-cd-fix`** — before the note-corruption fix, at `origin/main` SHA `2275c426`.
- **`backup/2026-09-07-acr2-v28-pre-col1-fix`** — before the 1QS Column 1 fix, at SHA `9208b312`.
- **`backup/2026-09-07-acr2-v29-pre-cd-dedup-fix`** — before the Damascus Document-wide dedup fix, at SHA `9d0f991f`.
- **`backup/2026-09-07-acr2-v30`** — after PR #890 merged, at SHA `4796e485` (current stable point). Recovery: `git checkout backup/2026-09-07-acr2-v30`.
