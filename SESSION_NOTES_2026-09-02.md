# Session Notes — 2026-09-02

## Start here next session

**Reminder for tomorrow, first thing:** look at safe ways to add the
Promised Land / tribal-allotment reference material (see "Built today"
below) to ACR Search. Options already scoped, none started:
1. Concordance passages — tag Bereshit 15:18-21, Bamidbar 32,
   Bamidbar 34:1-12, and the Yehoshua 13-19 allotment chapters with a
   shared theme/root so they surface together.
2. A dedicated panel (matching `renderRacismPanel`/`renderOritPanel`/
   `renderWatchersPanel` etc.) — the two maps plus source text as its
   own explorable section.
3. Volume Browser cross-reference — a short note/link on the Bamidbar
   and Yehoshua volume cards pointing to whichever of the above gets
   built.
Nothing in ACR Search has been touched yet — this needs the "edit ACR
Search" unlock phrase and a decision on which option(s) before any
file in `/Search/` is opened, per Rule 8 and Rule 11.

## Current state

- `main` HEAD: `fa0cb31`. Nothing uncommitted, no open PRs from
  today's work (all closed or merged, see below).
- ACR2 cache: `acr2-v27` — live, verified (PR #869, merged, see
  `SESSION_NOTES_2026-08-31.md` for the full audit/fix writeup).
- No site files were touched today — today's work was research,
  investigation, and two reference deliverables (below), not shipping.

## Built today

1. **War Scroll re-investigated, kept in the Reader.** User pushed back
   hard on the earlier same-session call to move War Scroll to ACR2,
   pointing out the exact same test (First Temple covenant tradition
   vs. Second Temple sectarian content) had been applied inconsistently
   across the session. Ran real WebSearch research rather than
   re-deriving from memory: confirmed the War Scroll's holy-war ritual
   mechanics (trumpets, camp purity) are genuinely First Temple
   (Numbers 10, Deuteronomy 20/23), but its defining content — the
   Sons of Light/Darkness cosmic dualism and Belial as a named cosmic
   antagonist — is a documented Second Temple development (VanderKam,
   Collins; Persian-period conceptual parallel, though direct borrowing
   is scholarly-disputed). User pushed further on Western-bias framing
   in that research (fair correction — "attestation-date" dating is
   itself a Western historical-critical method, and applying it to War
   Scroll while extending Enoch's "tradition carried, not physical
   date" latitude was an inconsistency running in a biased direction).
   Also pressure-tested a "lens vs. root" counter-argument (the
   purity-law "root" is genuinely First Temple, the dualistic "lens" is
   the Second Temple layer) — noted honestly that this argument, if
   accepted, applies equally to Community Rule/Damascus Document/Temple
   Scroll/4QMMT (already in ACR2), so it doesn't give a principled
   reason to treat War Scroll differently from its siblings without
   reopening all twelve. **User's final call: keep War Scroll in the
   Reader for now.** No site change made — this was a decision, not a
   fix, and nothing needed touching either way.

2. **Two reference maps built and published as an Artifact**
   (https://claude.ai/code/artifact/92972ba7-f0be-4309-b7bc-6305c0cf97dd,
   title "Boundaries of the Land"), both sourced directly from the
   site's own text:
   - Map 1: Bereshit 15:18-21 (maximalist Egypt-to-Euphrates promise)
     vs. Bamidbar 34:1-12 (the actual surveyed inheritance boundary),
     plotted schematically with modern place names. Originally included
     Qatar/Dubai as an out-of-bounds comparison point (that was the
     question that started this) — user later said Qatar didn't need
     to be in the ACR Search version, just the actual ancient/modern
     name pairs.
   - Map 2: the twelve tribes' allotments, east of the Jordan (Bamidbar
     32 — Re'uven, Gad, half-Menasheh) and west of it (Yehoshua 13-19 —
     the other nine and a half tribes), with a note that Levi received
     no territorial allotment at all (Yehoshua 21, 48 cities only).
   Both maps also sent as standalone downloadable PNGs (the artifact
   page itself can't offer a working download — the viewer sandbox
   blocks in-page downloads — so real files were sent via SendUserFile
   instead).

3. **Ancient-name/modern-name reference tables built, corrected twice
   on bias grounds, then delivered as a Word doc.** First pass listed
   modern locations but treated broad regional/continental labels
   ("Africa") uncritically — user corrected: give the actual specific
   place, never a constructed regional category standing in as if
   neutral. Redone without continental labels. User then caught a real
   inconsistency: Jordan/Syria/Egypt/Iraq were given as modern-country
   labels but Israel was omitted throughout, with no principled reason
   for the asymmetry — corrected, "Israel" applied consistently
   alongside "West Bank" for the Judea/Samaria hill-country sites
   (Hebron, Jericho, Nablus/Shechem), matching how the other modern
   states were already labeled. Final version covers every named place
   in Bereshit 15, Bamidbar 32, Bamidbar 34, and Yehoshua 13-19, plus a
   standalone breakdown of Yehudah's full territorial extent (it spans
   both the West Bank and Israeli territory, not just Hebron). Sent to
   the user as `promised-land-modern-names.docx` (Word document, via
   SendUserFile — this is the same material the ACR Search reminder
   above refers to).
   - **Note on this docx's verification**: LibreOffice is not
     functioning in this sandbox this session (fails converting even a
     trivial plain-text file to PDF, so it's an environment gap, not a
     file-specific problem) — could not visually render a preview as
     the docx skill normally requires. Fell back to structural XSD
     validation (passed clean) plus a direct check that every table,
     heading, and key phrase is actually present in the document's raw
     text content. Disclosed this limitation to the user rather than
     claiming a visual check that didn't happen.

4. **Two PRs closed without merging, on explicit user instruction**
   ("Close everything right now" — clarified afterward to mean only
   the two from this session, not the ten-plus older/unrelated open
   PRs also found while checking): PR #867 (Rule 13 pre-colonial
   addition to `CLAUDE.md`) and PR #870 (an earlier session-notes
   update PR). Neither was merged; closing is reversible. **Note:**
   this means the Rule 13 "pre-colonial" wording is still NOT live in
   `CLAUDE.md` on `main` — it only exists on the closed, unmerged
   `claude/rule13-precolonial` branch. Flagging this explicitly since
   it could be easy to assume it shipped.

## Outstanding / blocking

- **ACR Search addition — see "Start here next session" above.** This
  is the main open item; nothing else is blocking.
- **Rule 13's "pre-colonial" wording is not live** (see item 4 above) —
  the PR was closed, not merged. If the user still wants that change,
  it needs to be reopened or redone, not assumed done.
- **War Scroll stays in the Reader** — settled, not open, but noting
  here since it was actively re-litigated today after being decided
  once already; no further action expected unless the user reopens it.

## Pending / parked

- Nothing newly parked today beyond the ACR Search reminder above,
  which is active/next-up rather than parked.

## Capability gaps in this session

- LibreOffice (`soffice`) and `pandoc` are not functional in this
  sandbox — `soffice --convert-to pdf` fails even on a trivial `.txt`
  file ("source file could not be loaded"), and `pandoc` is not on
  PATH at all. The docx skill's normal render-and-look verification
  step could not run; used XSD validation + raw-text-content
  inspection as a substitute and disclosed the gap to the user. Worth
  knowing at the start of the next session that this same limitation
  will likely still apply if another docx/rendering task comes up.

## Today's commit log (newest first)

No commits to `main` today — today's work was research, an Artifact
(hosted outside this repo), and a delivered file, not a site change.
The most recent commits on `main` are unrelated automated activity:

```
fa0cb31 Prophetic Watch brief 2026-09-02
c492319 Prophetic Watch brief 2026-09-01
fd07fbf Merge pull request #869 from DssOrit/claude/acr2-fix-divine-naming
```

## Backups

No new backup branch needed today — no site file was written to, so
the most recent backup (`backup/2026-09-01-acr2-v26`, logged in
`SESSION_NOTES_2026-08-31.md`) still covers the current state of
`main`.
