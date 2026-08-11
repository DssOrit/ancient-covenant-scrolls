# Session Notes — 2026-08-11

## Current state

- **Direction changed mid-session.** Started as export + research/review
  only ("Only review & research do not make changes to either sites").
  User later had a separate Claude session independently verify the
  research, then gave the unlock phrase **"edit ACR2 as planned do not
  touch anything else but Chanokh"** — scoping the fix strictly to the
  14-chapter correction plan already reviewed and approved (see below).
- `main` HEAD at session start: `24a2d2f` ("Prophetic Watch brief
  2026-08-11"), cache `acr-v111` / `acr2-v20`.
- PR **#827**: "ACR2: correct Qumran-attestation claims in Animal
  Apocalypse and Epistle notes" — open, branch
  `claude/acr2-qumran-attestation-fixes`, awaiting user merge
  confirmation per Rule 9. Not merged by Claude. ACR2 cache bumped
  `acr2-v20` -> `acr2-v21`.
- PR **#826** (session notes, docs-only) — still open from earlier
  today, unrelated to the ACR2 fix, also awaiting merge.

## Built today

1. **Complete Chanokh volume export (docx).** User asked for a
   downloadable document of the entire Chanokh volume as currently live
   on ACR Reader. Pulled `data/file_13.json` (Part 1, Ch.1-36) and
   `data/file_14.json` (Part 2, Ch.37-49) directly from `origin/main`,
   parsed the HTML into structured blocks (title block, chapter
   headings, verses, notes, colophon), and rendered a Word document
   preserving the site's own colors/structure. Verified via DOCX schema
   (XSD) validation (passed) and content spot-checks (all 49 chapters
   present in order, note counts match exactly: 49 DSS/ORIT/MASO/CRIT
   notes each = 36 for Part 1 + 13 for Part 2). Could not visually
   render/screenshot — LibreOffice headless PDF conversion is broken in
   this sandbox (confirmed environment-wide, not file-specific: even a
   blank test file fails the same way). Delivered to user as
   `Chanokh_Complete_ACR_Reader.docx`. Read-only export, no site files
   touched.

2. **Reviewed 3 user-uploaded docs on Qumran attestation for the
   excluded Chanokh sections** (Animal Apocalypse, Epistle of Chanokh):
   - `ACR_Chanokh_Excluded_Sections_Qumran_Physically_Attested_Portions.docx`
   - `ACR_Chanokh_Qumran_Attested_Portions_Animal_Apocalypse_and_Epistle.docx`
   - `ACR_Chanokh_Qumran_Evidence_Custody_and_Verification_Methodology.docx`

   Extracted via proper XML parsing (`xml.etree.ElementTree`, standard
   practice for this session — regex-on-`<w:t>` is unreliable).

   **Report's core claims, cross-checked against independent
   scholarship** (Drawnel & Puech, *Qumran Cave 4: The Aramaic Books of
   Enoch*, OUP 2019 — the standard critical edition; could not reach
   `deadseascrolls.org.il` directly, blocked by sandbox network policy,
   same standing gap as `dssorit.github.io`):
   - 4Q201/202/204/205/206/207/212 as the seven genuine Aramaic Enoch
     manuscripts from Qumran Cave 4 — **confirmed, settled scholarship**.
   - 4Q204-207 physically attest portions of the Animal Apocalypse
     (Milik 1976, re-edited by Drawnel/Puech) — **confirmed**, and the
     report's fragment-to-verse mapping matches the critical edition
     closely.
   - 4Q212 attests substantial Apocalypse of Weeks/Epistle material —
     **confirmed**. One thing the report omits: 4Q212 preserves the
     Apocalypse of Weeks in correct chronological order, while the
     Ge'ez tradition has it split and reversed.
   - Book of Parables has **zero** Qumran attestation, unlike every
     other Enochic section — **confirmed, uncontested consensus**.
   - Caveat: fragment-level (not just manuscript-level) detail couldn't
     be independently re-verified against the actual archive photos —
     web search can confirm chapter/manuscript-level claims, not
     letter-by-letter fragment attribution.

   **Comparison against what ACR2 currently has** (read-only, via
   `ACR2/data/nav.json`, `file_15.json`, `file_16.json`, `file_17.json`):
   - Confirmed ACR2 contains **exactly two** Chanokh-related volumes —
     `file_15.json` (Vol 13, Animal Apocalypse, Ch.85-90, "Held Under
     Warning") and `file_16.json` (Vol 14, Epistle, 1 Enoch 91-105,
     "Held Under Warning"). No Book of Parables volume exists in ACR2 —
     it isn't held anywhere, consistent with `data/file_115.json` on
     the main site.
   - `file_17.json` ("Read First — Second Temple and Later Additions")
     is an auxiliary explainer, not a Chanokh text — documents the
     exclusion reasoning for all three (Parables as Exhibit D, Animal
     Apocalypse as Exhibit E), even though Parables has no dedicated
     volume.
   - **ACR2 already does most of what the uploaded report recommends.**
     Both `file_15.json` and `file_16.json` already cite the Qumran
     manuscripts by name in per-chapter `[DSS]` notes (same 4-note
     format as the Main Record), and already state plainly that
     exclusion is on "the chronological-composition standard"
     (Second-Temple-period content/theology), **not** manuscript
     absence. The uploaded report corroborates the site's own existing
     citations rather than contradicting them.

   **Two concrete gaps found** (not fixed — review only, per user
   instruction):
   - `file_16.json` (Epistle) never cites 4Q204 anywhere, but the
     report + critical edition agree 4Q204 frgs. 5a-b attest the
     Epistle's closing section (traditional 104:13-105:2) — looks like
     a missing citation.
   - `file_15.json` (Animal Apocalypse) Chapter 86's note currently
     cites 4Q205 ("4QEnd (4Q205) preserves portions of Chapter 86"),
     but the report and the critical edition both attribute the 86:1-3
     opening specifically to **4Q207**, not 4Q205 — possible existing
     siglum error on the site. Not independently confirmed against the
     archive photo (network-blocked); flagged, not asserted as certain.

   **Strategic question answered: should Animal Apocalypse/Epistle be
   renumbered and moved back into ACR Reader's Main Record, given
   Qumran attestation?** Recommended **no**. Reasoning: CLAUDE.md Rule
   25 (Pre-Corruption Standard) already states the test is the
   tradition/content carried, explicitly not the physical manuscript
   date. The report only establishes ancient Aramaic *copies* existed —
   it doesn't change what the content itself reflects. ACR2's own
   existing forensic notes independently document Second-Temple-period
   composition signatures for both (vaticinium ex eventu ending for
   Animal Apocalypse; apocalyptic ten-week periodization for the
   Epistle's Apocalypse of Weeks) — the actual disqualifying factor
   under Rule 25. Qumran attestation proves antiquity of the Aramaic
   witness, not pre-Corruption standing. Recommended keeping both in
   ACR2 as-is; the report's only real practical use is tightening the
   two citation gaps above, if the user wants that done later.

3. **ACR2 Qumran-attestation fix — SHIPPED, PR OPEN (#827).** User had
   a separate Claude session independently verify the review above,
   then asked for a full chapter-by-chapter audit ("are these fragments
   already in ACR2 & can we make sure that only these findings remain
   in ACR2"). Re-extracted every `[DSS]` note from both volumes and
   compared each to the report + an additional round of independent
   scholarship (confirmed 4Q212's real coverage stops at 94:2; the
   "Epistle of Enoch B" section, traditional 94:6-104:8, has no known
   Qumran Aramaic witness at all). Found the existing ACR2 notes
   overclaimed attestation in 14 chapters — most significantly, a
   single manuscript (4Q212) was cited identically across 17 straight
   Epistle chapters when its real coverage is roughly 4 chapters plus
   scattered verses.

   User confirmed the fix policy: correct chapters the report actively
   contradicts (86, 89, 90, 95-103, 104, 105); leave chapters the report
   is merely silent on unchanged (85, 87, 106-107). User also confirmed
   the correction style for "no manuscript attested" chapters: a plain
   sentence ("No Qumran Aramaic manuscript is presently identified for
   this chapter; the passage is known only from later Ge'ez
   transmission"), not a blank field and not a new note color (the
   site's note colors are fixed by the locked format spec — no new
   color introduced).

   Full 14-chapter before/after table shown and approved before any
   file was touched. User then gave the ACR2 unlock phrase, scoped
   explicitly to this plan only ("edit ACR2 as planned do not touch
   anything else but Chanokh").

   **Shipped:**
   - Backup branch `backup/2026-08-11-acr2-v20` cut and verified against
     `origin/main` before any write.
   - `ACR2/data/file_15.json` (Animal Apocalypse): 3 chapters corrected
     — Ch.51/trad.86 (4Q205 -> 4Q207), Ch.54/trad.89 (added 4Q205 +
     4Q204, removed unsupported 4Q212), Ch.55/trad.90 (removed
     unsupported 4Q212, states no manuscript identified).
   - `ACR2/data/file_16.json` (Epistle): 11 chapters corrected —
     Ch.60-68/trad.95-103 (removed blanket unsupported 4Q212 claim
     across all 9), Ch.69-70/trad.104-105 (4Q212 -> 4Q204, removed an
     unsupported verse 104:9-10 claim).
   - No verse text, exclusion framing, or "Held Under Warning" status
     touched on either volume — only the `[DSS]` attestation notes.
   - `ACR2/sw.js` cache bumped `acr2-v20` -> `acr2-v21`.
   - Verified: both files parse as valid JSON, `<p>`/`<span>` tags
     balanced, `[DSS]` note counts unchanged (8 and 19 — no notes added
     or removed, only corrected). Rendered in real site chrome
     (ACR2's own `index.html`/CSS/`sw.js` against the patched data)
     for all 3 corrected Animal Apocalypse chapters and 3 of the 11
     corrected Epistle chapters — all confirmed correct. The remaining
     8 Epistle chapters use an identical, already-verified replacement
     string, verified structurally rather than individually
     screenshotted.
   - **PR #827 opened, NOT merged.** Awaiting explicit user merge
     confirmation per Rule 9.

## Outstanding / blocking

- **PR #827 needs user merge confirmation.** Link:
  https://github.com/DssOrit/ancient-covenant-scrolls/pull/827
- **PR #826 (session notes, unrelated) also still needs merge
  confirmation.** Link:
  https://github.com/DssOrit/ancient-covenant-scrolls/pull/826
- None else. The two citation gaps originally flagged are now the
  substance of PR #827, not a separate open item.
  / "fix ACR2" unlock phrase (Rule 8), and full before/after findings
  shown first (Rule 11) before any write.

## Pending / parked

- Two ACR2 citation gaps identified above (4Q204 missing from Epistle
  end-notes; possible 4Q205->4Q207 correction for Animal Apocalypse
  Ch.86) — not scheduled, awaiting user decision.

## Capability gaps in this session

- `deadseascrolls.org.il` blocked by the sandbox network egress proxy —
  could not fetch primary archive pages directly; used WebSearch against
  independent scholarship instead. Same category of gap as the standing
  `dssorit.github.io` / Pages-API block already logged in prior sessions.
- LibreOffice headless PDF conversion (`soffice --convert-to pdf`) is
  broken in this sandbox — confirmed by testing a blank/minimal file,
  not specific to the Chanokh export docx. Structural verification
  (DOCX XSD schema validation, XML well-formedness, content spot-checks)
  was used instead of a visual screenshot.

## Backups

- `backup/2026-08-11-acr2-v20` — SHA `24a2d2f6faa0dce484a8731ecb55dba135403c06`,
  pre-ACR2-fix state (before the 14-chapter Qumran-attestation
  correction), matches `origin/main` at the time. Cut and verified
  before any write, per Rule 26.

Recovery: `git checkout backup/2026-08-11-acr2-v20` to go back to the
state before today's ACR2 fix.
