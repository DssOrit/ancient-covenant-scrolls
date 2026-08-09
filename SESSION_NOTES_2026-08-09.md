# Session Notes — 2026-08-09

## Current state

- Branch: `main`, HEAD `3dbc3da4` — nothing shipped yet this session
- Working branch for this task: `claude/acr-reader-text-additions-mo2b4k`
- Reader cache: `acr-v107` (unchanged so far)
- Working tree: clean
- **No site file has been touched yet.** Everything below is find-first
  reporting per Rule 11 — waiting on the unlock phrase ("edit ACR reader"
  / "fix the reader") before any write to `data/file_13.json`.

## In progress — Chanokh Part 1 (Chapters 1-36) verse audit

User delivered `ACR_Chanokh_Part1_Ch136_RECONSTRUCTION_FOR_INDEPENDENT_VERIFICATION.docx`
(Book of the Watchers, Ch.1-36), mapped on the live reader to
`data/file_13.json` (NAVIDS `file_13`, "Vol 6 — Chanokh (1 Enoch) — Part 1
— Chapters 1-36 — Book of Watchers").

### Scope decided by the user this session (supersedes earlier framing)

- Original ask was a full retranslation swap from the docx. **User narrowed
  this**: ignore translation/wording differences for now. Focus only on
  **missing verses** and **duplicate verses/chapters**.
- **No verse renumbering, ever, for this pass.** Any content found missing
  gets attached/merged into the nearest existing verse (previous verse for
  a trailing closing line, next verse for a leading opening line) — never
  becomes a new standalone verse number. This avoids any renumbering
  cascade to later verses, other chapters, Search, or Study.
- Where docx wording is adopted for newly-attached content, it is adapted
  to the site's existing archaic register and terminology (e.g. "YHWH of
  Glory" not the docx's "YHWH of Splendor") rather than pasted verbatim —
  confirmed by user.

### Findings — verified directly against the docx and the live site

| Chapter | Site currently has | Docx has | Verdict | Planned fix |
|---|---|---|---|---|
| 22 | v1-13, ends mid-judgment | v1-13 + a 14th closing-blessing verse, docx note: "restored as verse 14" | Genuinely missing on site | Attach blessing sentence to end of existing v13 (no renumber) |
| 25 | v1-7 (count matches docx by coincidence — site splits v1 into two where docx keeps it as one, which masked a real gap) | v1-7, v7 = "I then pronounced blessing over the Creator of Splendor..." | Genuinely missing on site — verse-by-verse mapping confirmed no site verse carries this content | Attach blessing sentence to end of existing v7 (no renumber) |
| 27 | v1-5, opens directly with Uriel's answer | v1 = Chanokh's opening question ("Why does this land of goodness...lie beside an accursed valley?"), then v2-5 the answer/blessing | Opening question genuinely missing on site | Attach question to the *start* of existing v1, before "Then Uriel answered me..." (no renumber) |
| 27 (closing, v5 equiv.) | v5 = "Then I blessed YHWH of Glory..." | v5 = "Then I pronounced blessing over YHWH of Splendor..." | Already present on site, content matches | No action |
| 22:9 note citation | CRITICAL NOTE cites "Verse 22:9" for the Hevel/Qa'in content, but that content is actually v8 on the site | — | Pre-existing citation bug, unrelated to the docx | **User decision: leave as-is** — content is present in the chapter, just under a different number; not to be touched |
| 31/32 | Both chapters carry near-duplicate content (seven spice mountains -> Garden of Righteousness -> tree of wisdom -> Rafa'el's explanation). Site's own Ch.32 critical note already frames it as a documented manuscript-tradition doublet. | Docx keeps Ch.31 and Ch.32 as two *different* topics — Ch.31 is a distinct "trees of wisdom and other aromatics" passage (sarara/galbanum/aloe resin), Ch.32 is the Garden of Righteousness/tree-of-wisdom episode. | **User decision: treat as a duplication bug to resolve** (not a legitimate doublet) | **Not yet resolved.** Still owe the user a full explanation of how the fix will look on-site and how it affects numbering (this was interrupted mid-explanation and not yet re-delivered as of this note). Docx's real, distinct Ch.31 content (aromatic-tree mountains) looks like the correct replacement for the site's current duplicate Ch.31. |

### Worked example approved so far

Chapter 1 preview (verse text only, docx source, site's exact numbering/
notes/style tokens) was rendered and shown — no objection raised on the
format itself; conversation moved to the missing/duplicate-verse audit
before Chapter 1 was formally signed off.

Before/after text for the three attach-fixes (22:13, 25:7, 27:1) was
presented in adapted register — **awaiting explicit approval of the exact
wording**.

**User decision (2026-08-09): no new CRITICAL NOTE clauses for now.**
Do not add documenting text to the four comparative notes for this pass.
Revisit after the fix is successfully shipped to the live site — user
asked to be reminded then, not before.

## Outstanding / blocking

1. Approve or amend the exact before/after wording for 22:13, 25:7, 27:1.
2. ~~Decide: add a short note clause documenting each attachment~~ —
   resolved: no new note clauses for now. **REMINDER: raise this again
   once the 22:13/25:7/27:1 fix is successfully shipped and confirmed
   live.**
3. Still owe: full explanation of the Ch.31/32 duplication fix — what
   replaces the current Ch.31, and confirmation it does not renumber
   anything outside those two chapters.
4. Unlock phrase not yet given — nothing can be written to `data/file_13.json`
   until the user says "edit ACR reader" or "fix the reader".
5. Chapters 2-21, 23-24, 26, 28-30, 33-36 not yet individually audited for
   the same missing/duplicate-verse pattern — this was only done for the
   chapters the user specifically flagged. Full-chapter audit still
   pending if the user wants every chapter checked before shipping.

## Pending / parked

- Full retranslation of Ch.1-36 (the original ask) — superseded for now by
  the narrower missing/duplicate-verse scope. May resume after this pass.

## Capability gaps in this session

- None new. Standing sandbox gaps unchanged.

## Backups

- `backup/2026-08-09-acr-v107` — SHA `3dbc3da425910a3e0773c43416260b4a41d0828d`,
  verified matching pre-change `origin/main`. Cut before any Chanokh audit
  work touches the site (none has yet).

Recovery: `git checkout backup/2026-08-09-acr-v107`.
