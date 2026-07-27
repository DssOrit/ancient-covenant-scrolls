# Session Notes — 2026-07-27

## Current state
- Working branch: `claude/session-continuation-setup-2zkame`
- Branch HEAD: 1367a6e (ahead of `origin/main`, NOT merged, NOT live yet)
- Base: reset fresh off origin/main at session start (438f7da), cache v264.
- Search cache: `acr-search-v264` — NOT bumped again yet this session. Bump to
  v265 before the next PR (JS/HTML edits shipped on the branch).
- Nothing uncommitted.
- git identity set: Claude / noreply@anthropic.com (for verified commits).

## Task context
Continuing the excluded-text reconciliation of ACR Search. Yesterday (v264,
merged PR #766) finished the 1QS Q&A cards + covenant-word glossary. Today =
the glossary "books" dictionary + a site-wide softening harden.

Standing rules in force (unchanged): covenant record (Torah/prophets/in-canon)
is the only authority, cited by verse; excluded texts only in debunk context;
minimal change / show full "after" before applying; research + verify every
scripture swap; NEVER merge (user merges); when user says "both," confirm no
contradiction first; NO softening (rule 28) — factual assertions, not
"difference of opinion" framing.

## Built today (branch, one+ commit per unit)
Books dictionary entries (each: exclusion framing / flag, matched to site voice):
- Book of Enoch (7798): Watchers 1-36 + Astronomical 72-82 kept as covenant
  baseline; Similitudes/Dreams/Epistle named as text manipulation. (f5e342f)
- Community Rule 1QS (7792): flag + 4Q258 forgery finding. (70ebbc4)
- Damascus Document CD (7793): flag + 390-year/Yechezkel 4:5 self-dating
  (verified). Teacher-of-Righteousness clause dropped (contradicted Hodayot). (301a2ba)
- War Scroll 1QM (7794): flag + Persian-dualism/Belial overlay (matches satan
  card). (c79dcdf)
- Temple Scroll 11QT (7795): flag (option A). (f44c1a2)
- Hodayot 1QH (7796): user's exact wording (dropped Teacher/Cave detail). (b1eed34)
  Later hardened + reworded per site-wide pass.

Harden pass #1 — "held under warning" (lowercase, 18 spots): swapped to factual
"a later manipulated addition" / "Manipulated Text, Not Canonical". Also
re-hardened books flags 1QS/CD/1QM/11QT (dropped "held under warning",
verdict-first "Not covenant scripture — ... the covenant record excludes"). (8beb773)

CORRECTION logged: my first "zero held under warning left" was WRONG — a
case-sensitive grep missed ~60 capitalized "Held under warning" in the
excluded-texts dossier. Owned it, then fixed in pass #2.

Jubilees decision (user ruling): the site already has a full forgery dossier on
Jubilees (lines 6442-6452) that keeps the 364-day calendar and excludes the
forged Noakh speech. User chose: bring the books entry IN LINE with that dossier
(not keep-as-Orit). Done.

Harden pass #2 (1367a6e):
- Jubilees books entry (7797) rewritten to match the forgery dossier (calendar
  kept authentic; forgery = manufactured Noakh speech; Ge'ez-preserved but
  documented as late-2nd-c-BCE forgery, not covenant scripture).
- 58 dossier verdict codas "Held under warning." -> "Excluded from the covenant
  record."
- 1 title tag "(Held Under Warning)" -> "(A Later Manipulated Addition)".
- 1 section note -> "A later manipulated addition — documented, not canonical."
- Verified: 0 "held under warning" (any case) remain. JS OK.

Every commit: python surgical edit -> node --check on extracted scripts -> commit
-> push. All green.

## Remaining — books dictionary
- Pesher / Commentary (1QpHab) entry (~7800) — NOT done yet. NEXT.
- Passing mentions of excluded scrolls inside Torah/prophet book entries
  (7778-7791): "Temple Scroll reworks the Shemot legislation," "Genesis
  Apocryphon," "Songs of the Sabbath Sacrifice," "War Scroll draws on...",
  "Hodayot..." — decide per-entry.

## Remaining — 14-text list (items 2-14, after books dictionary)
Hodayot 1QH, Damascus Document CD, Pesher Habakkuk, Temple Scroll, War Scroll
1QM, Book of War 4Q285, 4QMMT, Rule of Congregation 1QSa, Words of Luminaries,
Songs of Sabbath Sacrifice, Book of Giants, Raz Nihyeh/4QInstruction, Jubilees.
Note: several of these are USED as validating primary sources in big debunk cards
(e.g. War Scroll card ~5056, 800-doc card ~10297, 1QM 13:4-6 card ~10237) — the
site treats the scroll as a real document while flagging the Belial construct.
Those are the deeper reconciliation calls still pending user direction.
Working checklist: `SEARCH_EXCLUDED_TEXT_VALIDREF_AUDIT_2026-07-25.md`.

## Shipping status
- All of today is on the branch, ahead of origin/main, NOT live. Cache still v264
  on the branch (needs bump to v265 before PR).
- When ready: bump v264->v265, open PR into main, list files + risk, WAIT for
  user approval, user merges (rules 6 + 9).

## Backups
- backup/2026-07-26-acr-search-v264 @ 50c8487 (yesterday's shipped/live state).
- Create a new backup at today's tip once the batch is verified/shipped.

## Today's commit log (oneline, this session)
1367a6e Jubilees entry -> dossier alignment; harden 60 dossier verdicts
8beb773 harden 'held under warning' site-wide (18) + re-harden books flags
b1eed34 Hodayot books entry -> user's exact wording
ac5c4eb harden books flags 1QS/CD/1QM/11QT + Hodayot option B
f44c1a2 Temple Scroll books entry flag
c79dcdf War Scroll books entry flag + finding
301a2ba Damascus Document books entry flag + 390/Yechezkel finding
70ebbc4 Community Rule books entry flag + 4Q258 finding
f5e342f Book of Enoch books entry -> mark Similitudes/Dreams/Epistle manipulation
