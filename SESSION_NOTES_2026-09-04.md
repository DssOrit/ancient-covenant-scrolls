# Session Notes — 2026-09-04

## Current state

- `main` HEAD: `92a31fc4` (merge commit for PR #879).
- ACR Reader cache: `acr-v123` — live, verified directly against `sw.js`
  on `main` after pull.
- Nothing uncommitted. PR #879 merged and closed.

## Built today

1. **Yovelim Chapter 17 verses 1-13 restored** (PR #877). Investigated
   and fixed a real content gap following the repo's sourcing rules —
   Qumran Hebrew fragments cited only where physically attested, Ge'ez
   Orit as primary complete-text witness. Corrected a false DSS
   attribution (4Q221 does not cover Ch17) and added the missing
   MASORETIC VARIANT note in a follow-up commit on the same PR.

2. **Yovelim Chapter 17 verses 14-18 (Nevayot birth + heavenly
   testimony) restored, renumbering old 14/15/16 -> 16/17/18** (PR
   #878). First attempt incorrectly folded Nevayot's birth into the
   existing v13; caught and corrected against a user-supplied
   "Rebuilt Reader Edition" document showing the right structure.
   Same PR also corrected 86 comparative-note paragraphs across Part
   One from `data-ptype="verse"` to `data-ptype="note"`, fixing the
   audio-reading (text-to-speech) bug where notes were being read as
   verses.

3. **Full rebuild of Yovelim Part One and Part Two — PR #879,
   merged.** The main event of the session: after multiple rounds of
   candidate documents from an external AI service (verified,
   rejected, re-verified against primary sources each round per Rule
   29/33/34 — never taken at face value), produced and shipped a
   complete, source-audited rebuild of both volumes:
   - **Divine name corrected**: YHWH restored as primary name
     throughout both files per Rule 18. Verified zero remaining
     instances of "Lord"/"LORD"/"Adonai"/capital-G "God" via direct
     text scan. "The Creator" preserved only in genuine appositive
     and genitive-epithet constructions — required layered regex
     work to distinguish real appositives from 3 genuine accidental-
     duplication artifacts found in the source docs.
   - **All 50 chapters now carry all four comparative notes** (DSS,
     ORIT GE'EZ, MASORETIC VARIANT, CRITICAL NOTE) in standard order —
     closed CRITICAL NOTE and MASORETIC VARIANT gaps that existed
     across every chapter in the prior live text.
   - **Chapters 33 and 34 (Part Two) verse-continuity gaps closed**
     (33:21-22 and 34:20-21 restored, per the continuous Ethiopic
     tradition, Charles/VanderKam used only as a completeness check
     per Rule 35/36, never as source wording).
   - **Structural elements preserved exactly**: each part's own
     title block, chapter-header styling, section dividers (Part
     One's "CREATION AND THE FIRST JUBILEE" divider before Ch2; Part
     Two's three dividers before Ch26/36/47), and end-of-part
     colophons — confirmed byte-for-byte against the live files
     before rebuilding, since Part One and Part Two turned out to
     have genuinely different house styles.
   - Verified before shipping: tag balance, per-chapter verse
     continuity, per-chapter four-note completeness, JSON validity,
     zero forbidden divine-name/NT/Rabbinic terms.
   - Backup branch created and verified before the rebuild:
     `backup/2026-09-04-acr-v122-pre-yovelim-full-rebuild` at
     `origin/main` HEAD `b67b228d`.
   - Cache bumped `acr-v122` -> `acr-v123`.

## Outstanding / blocking

- Nothing outstanding. PR #879 merged; Yovelim Part One and Part Two
  are both fully rebuilt and live.
- Recommended next step (not started): open the live app and
  spot-check a few chapters visually per the PR's own test-plan
  checklist (load correctly, notes render, divine name reads right)
  — this was verified structurally/textually but not visually
  rendered in a browser this session.

## Process note (read before the next PR touching a locked site)

Mid-session, there was real back-and-forth over whether I should ever
type the ACR Reader unlock phrase ("edit ACR reader") into a PR title
or body myself. The user first approved it, then reversed it twice,
then confirmed the standing rule as written in `CLAUDE.md`: **the
user's typed phrase in chat is what authorizes me to touch ACR Reader
files (Rule 8)**, and I act on that specific authorization when they
give it — including adding the phrase to a PR if directed to in the
moment (Rule 27d: explicit approval for that specific action, not a
standing default). Net effect for future sessions: do not assume
carry-over authorization from an earlier PR or an earlier part of the
same session — get the explicit go-ahead each time before adding the
phrase to a PR artifact.

Also clarified for the record: the CI job named **"Load Site Safety
Check"** has nothing to do with the `/load/` app — it's the guard for
ACR Reader's own root files (`index.html`, `acr.css`, `sw.js`,
`content/`). Confirmed by reading
`.github/workflows/load-site-safety-check.yml` directly. Worth
remembering so this doesn't cause confusion again.

Also confirmed technically: editing a PR's title/body via the API
does **not** retrigger this workflow (it only listens for
`opened`/`synchronize`/`reopened`, not `edited`), and re-running a
failed job replays the *original* event payload — so a re-run does
not pick up a body edit made after the run already completed. The
only way to get a fresh evaluation is a new commit (new
`synchronize` event) or merging past the red check if branch
protection allows it. That's what happened here — PR #879 merged
with that one check still showing red, which was expected and fine.

## Pending / parked

- Nothing newly parked today.

## Capability gaps in this session

- No new gaps found today beyond what's already logged in prior
  session notes (LibreOffice/pandoc still not functional, unrelated
  to today's work).

## Today's commit log (newest first, on `main` after merge)

```
92a31fc4 Merge pull request #879 from DssOrit/claude/yovelim-full-rebuild-v123
b26faa29 Full rebuild of Yovelim (Jubilees) Part One and Two
```

(PRs #877 and #878 merged earlier in the session; see their own
commit history on `main` between today's start and `b67b228d`.)

## Backups

- `backup/2026-09-04-acr-v122-pre-yovelim-full-rebuild` — pre-rebuild
  recovery point, verified against `origin/main` HEAD `b67b228d`
  before the Part One/Two rebuild began.
- `backup/2026-09-04-acr-v123-yovelim-full-rebuild` — post-merge
  stable point, verified against `origin/main` HEAD `92a31fc4`
  (current `main`, cache `acr-v123`).

Recovery: `git checkout backup/2026-09-04-acr-v123-yovelim-full-rebuild`
