# Session Notes — 2026-10-13 through 2026-10-17

Catch-up entry. Per Rule 12, session notes should have been written and
committed after each PR below merged, in-session. That didn't happen — the
last notes file on disk before this one was `SESSION_NOTES_2026-10-04.md`.
Flagging that lapse plainly, per Rule 33, rather than quietly starting clean.

## Current state
- Latest commit on `main`: `ca5e251` (merged via PR #1034).
- ACR Reader `sw.js` cache: `acr-v133`.
- ACR Search `sw.js` cache: `acr-search-v329`.

## Built this session

- **ACR Reader: Melakhim Bet ch.4 note — oil-widow vs. Tzarefat widow distinction** — PR #1031, merged by DssOrit.
  - Extended the existing ORIT GE'EZ note (no new note block — four-note format preserved) distinguishing Elisha's oil-widow miracle (debt/slavery relief) from Eliyahu's Tzarefat widow (famine provision), noting Eliyahu's one widow gets both miracle-types while Elisha splits them across two women.
  - Verse citations use the dual Hebrew/English book-name convention (e.g. "Melakhim Aleph 17:14 (1 Kings 17:14)"), confirmed against the actual chapter files since this volume has no verse-level Hebrew text to quote directly.
  - Cache bumped `acr-v131` -> `acr-v132`.
  - Backup: `backup/2026-10-14-acr-v131`, SHA-verified against pre-change `main`.

- **ACR Reader: Melakhim Bet ch.6 note — Samaria siege covenant-fidelity distinction** — PR #1032, merged by DssOrit.
  - Extended the existing CRITICAL NOTE (already tied the siege-famine cannibalism to the Devarim 28:53-57 covenant curse) with the identity of the two women: residents of Samaria under Yehoram, who clung to Yarovam's golden-calf cult rather than Jerusalem covenant worship.
  - User caught that my first draft of this note had silently reworded their confirmed wording (dropped second-person framing without flagging it) — named the lapse, offered both versions, user picked the one closer to their original wording.
  - Fixed a quote-style inconsistency (curly quotes) in the new text before committing, to match the file's established no-quotation-marks prose convention.
  - Cache bumped `acr-v132` -> `acr-v133`.
  - Backup: `backup/2026-10-14-acr-v132`, SHA-verified against pre-change `main`.

- **ACR Search: Figure Studies feature** — PR #1033, merged by DssOrit.
  - New additive feature for connected, verse-by-verse comparative essays between covenant figures — distinct from the existing theme-tag "Parallel Passages" auto-feature, which only surfaces bare snippets sharing one of 25 broad themes.
  - First entry: nine-point Eliyahu/Elisha miracle-pattern study plus the closing "double portion of spirit" structural note, each point grounded directly against the live Reader chapter files before writing (oil-widow miracle, dead-son-raised, Jordan-mantle crossing, fire/bears judgment episodes, Eliyahu's three-part commission fulfilled through Elisha, judgment on the house of Akhav, Na'aman, Elisha's bones reviving a corpse, the repeated "my father, my father" cry).
  - New `Search/figure_studies.json` data file; new home feat-card, `figurestudy-view`/mode, `renderFigureStudies()`/`openFigureStudy()` reusing the existing `openTextOverlay()` pattern. Confirmed before writing that the existing `figures` mode was already taken (Tribes and Territory) and avoided colliding with it.
  - Cache bumped `acr-search-v327` -> `acr-search-v328`.
  - Backup: `backup/2026-10-14-acr-search-v327`, SHA-verified against pre-change `main`.

- **ACR Search: `acr_concordance.json` volume-number sync fix** — PR #1034, merged by DssOrit.
  - Investigating the Figure Studies feature surfaced that the concordance's volume numbers were drifted +2 from the live Reader for every book from Yehoshua through Divrei HaYamim Bet (22 volumes), because Book of Giants was relocated out of its old slot (between Yovelim and the historical books) at some point and the concordance was never regenerated.
  - Naive fix would have collided: shifting Yehoshua into volume 8 would land on the Book of Giants entries already there. Reported this to the user explicitly and got confirmation before writing anything (Rule 11): also move Book of Giants' 72 entries 8 -> 31, matching its actual current Reader location.
  - Applied as a single atomic remap computed directly from each original value (no chaining/double-shift risk). Every passage's `id` string and `vol` field updated together, since `themes`/`roots` reference passages by exact id string in 179,374 places.
  - Verified 0 id/vol mismatches across all 20,866 passages post-fix; new distribution matches the Reader's live volume numbers book-by-book; diff was exactly 125,638 insertions / 125,638 deletions (pure value substitution, no passages added/removed/restructured).
  - Found, but explicitly left untouched and flagged separately: 12 dangling `themes`/`roots` references to a `vol45` id with no matching passage — confirmed pre-existing (present in the pre-fix backup too), unrelated to this fix.
  - Cache bumped `acr-search-v328` -> `acr-search-v329`.
  - Backup: `backup/2026-10-17-acr-search-v328`, SHA-verified against pre-change `main`.

## Content questions answered this session (no site changes)
- Full verse-grounded breakdown of parallel miracle stories between Eliyahu and Elisha (the basis for the Figure Studies entry above).
- Whether covenant people are prohibited from wine (Nazirite vow, priestly on-duty rule, Rekhavites — all scoped exceptions, not a blanket rule; wine otherwise sanctioned in tithe-feast law and drink offerings).
- Whether prophets specifically are prohibited from wine (no explicit statute, unlike priests; Amos 2:11-12 and Yesha'yahu 28:7 checked directly).
- Ancient vs. modern wine (no distillation existed yet; dilution was a real practice; but the ACR's own text treats biblical wine as genuinely intoxicating, per Nazirite vow, Yesha'yahu 28:7, Mishlei 23:29-35).
- Etymology of "spirits" for distilled alcohol (medieval alchemy, *spiritus vini* — unrelated to the ACR corpus, no biblical parallel since distillation is centuries later).
- Whether protest is prohibited on Sabbath per the ACR (no direct statement; checked Temple Scroll Column 27 and Yirmeyahu 17:21-22 directly — burden-carrying and travel-beyond-the-city provisions would restrict a typical protest, but a within-the-city, walking-only, nothing-carried scenario doesn't trigger any of Column 27's literally-stated prohibitions). Flagged that the Damascus Document's own more detailed Sabbath code (CD 10-11), referenced by the Temple Scroll's own comparative note, isn't actually present in the Reader's current Serekh Dammesek volume content — only a header reference exists.

## Outstanding / blocking
- None from this session. All four PRs shipped and merged.

## Pending / parked (carried over, unchanged this session)
- ACR Search "concordance/reference book" project — parked per user: "too fiat [flat] this time." (Note: the volume-sync fix above touched the concordance file but did not revisit this parked project.)
- ACR2 read-only reconnaissance — parked per user: "We will hold off on this too."
- 16 remaining un-pulled Qumran-sectarian ACR Reader volumes — deferred to the ACR2 print pass.
- The Reader's own duplicate-volume-number bug: `data/file_18.json` (Book of Giants) and `data/file_98.json` (The Community Rule / 1QS) both claim "Volume Thirty-One" — discovered while mapping the concordance sync fix, explicitly flagged to the user as a separate, unresolved issue, not folded into this session's fix.
- Pre-existing dangling `themes`/`roots` references to a non-existent `vol45` passage id in `acr_concordance.json` (12 occurrences) — flagged, not fixed.

## Capability gaps this session
- None new. Standard sandbox gaps apply (no direct access to `dssorit.github.io` or the Pages API).

## Backups
- `backup/2026-10-14-acr-v131` — pre-change, PR #1031. SHA-verified. Recovery: `git checkout backup/2026-10-14-acr-v131`.
- `backup/2026-10-14-acr-v132` — pre-change, PR #1032. SHA-verified. Recovery: `git checkout backup/2026-10-14-acr-v132`.
- `backup/2026-10-14-acr-search-v327` — pre-change, PR #1033. SHA-verified. Recovery: `git checkout backup/2026-10-14-acr-search-v327`.
- `backup/2026-10-17-acr-search-v328` — pre-change, PR #1034. SHA-verified. Recovery: `git checkout backup/2026-10-17-acr-search-v328`.
- `backup/2026-10-17-acr-search-v329` — stable-state backup, pointing at `main` HEAD (`ca5e251298d8ee394a48da74d7cb6a2beb9f1aef`) right after PR #1034 merged and the user confirmed it. SHA-verified. Recovery: `git checkout backup/2026-10-17-acr-search-v329`.

## Today's commit log (oneline, full session range)
```
ca5e251 Merge pull request #1034 from DssOrit/claude/search-concordance-vol-sync
dec175e Sync acr_concordance.json volume numbers to the live Reader
21f1172 Merge pull request #1033 from DssOrit/claude/search-vol-sync-figures
9b5a594 Prophetic Watch brief 2026-10-16
f936882 Prophetic Watch brief 2026-10-15
75a8dbc Add Figure Studies feature with Eliyahu/Elisha parallel breakdown
2c96514 Prophetic Watch brief 2026-10-14
4cb5cf5 Merge pull request #1032 from DssOrit/claude/reader-mel-bet-ch6-note
1eeaa19 Clarify covenant-fidelity distinction for the Samaria siege famine
f15105a Merge pull request #1031 from DssOrit/claude/reader-mel-bet-ch4-note
ea8703a Distinguish Elisha's oil-widow miracle from Eliyahu's Tzarefat widow
3213d55 Prophetic Watch brief 2026-10-13
```
