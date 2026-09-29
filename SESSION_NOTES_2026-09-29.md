# Session Notes — 2026-09-29

## Current state

- No site code was touched this session — every action was either a read-only pull of existing ACR Reader content into personal `.docx` files (delivered directly to the user, not committed to the repo) or read-only reconnaissance of the ACR Search and ACR2 sites.
- `origin/main` at session end: `1594d95` ("Prophetic Watch brief 2026-09-29"). This branch (`claude/session-notes-2026-09-29`) is cut from that tip and carries only this notes file.
- No unlock phrase was invoked or needed (Rule 8) — nothing in any site folder was edited.

## Built today

This was a personal-library-pull session (continuing the ACR Reader -> Word-document project from prior sessions) plus planning work for a possible ACR Search reference book, which ended parked. No PRs, no merges.

1. **Continued the ACR Reader -> `.docx` pull**, same 7-step verification standard as prior sessions (independent double-extraction, round-trip build+extract+compare, colophon/banner exact-match checks), one volume per user "continue":
   - file_78 (Iyov Part Two), file_79 (Iyov Part Three — completes Iyov), file_80 (Shir HaShirim), file_81 (Ruth), file_82 (Eikha), file_83 (Kohelet), file_84 (Esther), file_85–86 (Daniyel Parts One–Two — completes Daniyel), file_87–88 (Ezra, Nekhemyah — completes the Ezra-Nekhemyah volume), file_89–90 (Divrei HaYamim Aleph Parts One–Two — completes 1 Chronicles), file_91–92 (Divrei HaYamim Bet Parts Three–Four — completes 2 Chronicles and the whole four-part Chronicles sequence), file_93 (4Q246, the Aramaic Apocalypse), file_94 (1QM, the War Scroll), file_18 (the Book of Giants — found under a stale/reused filename, not the sequential number expected; confirmed directly against source content before pulling), file_95 (4QMMT).
   - All delivered as individually verified `.docx` files via `SendUserFile`. Ninety-five items delivered total by end of session (previously ~seventy-five at session start).
2. **Two genuine parser bugs found and fixed on file_94 (1QM)**, both real content gaps, not false positives — caught by the full-sequence word-diff audit, not assumed:
   - A "SUMMARY" zone (a banner + 19 real per-column summary lines) sitting between the last chapter and the true colophon was being silently absorbed into "colophon" — added a new `closing_summary`/`closing_summary_heading` field to `parse.py` and a matching renderer in `render.js`, splitting real content from true back-matter. Verified against 7 previously-delivered volumes to confirm no regression.
   - A **first fix attempt introduced a duplication bug**: the new mid-chapter "part_break" extraction (added to catch an internal "END OF PART ONE... CONTINUES IN PART TWO" block between Column X and Column XI) also re-captured the entire closing_summary+colophon a second time on the last chapter, since that chapter's body runs to end-of-document. Caught before delivery, fixed by excluding the last chapter from that extraction, re-verified, re-regression-tested, then delivered.
3. **Corrected a self-check with the user watching**: when asked "did we complete ACR reader," cross-checked the actual delivery log (via `caption` strings in the session's own prior tool calls, not memory) against the site's own `NAVIDS`/`LABELS`/`TOC` arrays in `index.html`. Confirmed all 31 volumes / 92 parts currently in the site's live navigation are delivered — but found 17 (later corrected to 16, see below) additional Qumran-sectarian volumes sitting in `data/file_96.json`–`file_115.json` that exist as raw content but were never wired into `index.html`'s own navigation and were not yet pulled. User chose to hold these for a later ACR2-focused pass rather than pull them now.
4. **Explored a "concordance from ACR Search" request at length, then parked it** (user's own call, "too flat this time" / "hold off"):
   - Found `Search/acr_concordance.json` (21.9 MB): 20,866 passages, 17 Hebrew roots, 25 themes, 8 DSS-vs-Masoretic contradictions.
   - Found `Search/acr_search_data.json`: NT lookup database (25 entries), suppressed verses (12 categories), timeline, apocrypha audit, restoration path, audio pronunciation guide.
   - Found the live site itself has ~54 named JS data arrays and 25 real top-navigation tabs, plus an 8-panel "Explore" hub nested inside one of those tabs — confirmed each Explore sub-panel against its own data array by matching entry counts to the site's own advertised tags (15 scrolls, 10 Exodus waypoints, 11 Qumran caves, 6 courtroom cases, etc.).
   - Went through three visual-format iterations per user feedback: a light book-style mockup (rejected — "doesn't look like the site"), a dark-theme mockup pulling colors directly from `Search/index.html`'s own CSS (`.rc` cards, thread-tag colors, root-chip styling) — accepted as accurate to the site but then reframed by the user as "not a concordance, I don't like the layout, I want a manual reference book" — rebuilt again in the light book-style visual language but using only content unique to ACR Search (NT Lookup analysis, Covenant for All Nations person-cards, Contradictions) after the user pointed out the second draft was still just re-printing ACR Reader verse content.
   - Resolved a "6 still-unplaced sections" question mid-way: 3 of the 6 turned out to be sub-sections of one already-found home-screen panel ("Covenant for All Nations" — its own Foundational Texts / People of All Nations / Communities sub-sections), not separate items.
   - Surfaced, but did not resolve, evidence of yet more un-inventoried sub-tabs (an "Orit Record tab," "Historical Docs tab," "Communities tab," and a multi-tab "Hebrew DNA" panel) not caught in the first navigation sweep. **Not chased down** — session ended with the whole project on hold before that sweep happened.
5. **Explored ACR2 read-only** at the user's request: listed all 32 `data/file_N.json` files, cross-referenced against `data/nav.json`. 31 are wired into the live site (Volumes 1–25); one (`file_14.json`, Volume Fourteen, the Messianic Apocalypse / 4Q521) exists but isn't linked into navigation, carrying the same "Held Under Warning — Documented, Not Canonical" quarantine framing already used for the Animal Apocalypse and Epistle of Chanokh.
6. **Cross-checked the "17 remaining ACR Reader volumes" against ACR2's own 25-volume list** at the user's request: 16 of them are already published as their own numbered ACR2 volumes (15–25); **Songs of the Sabbath Sacrifice is the one title missing from ACR2 too** — checked directly (not just by title-search) that its only appearances in ACR2's 32 files are as passing cross-references inside four *other* volumes' critical notes, not a dedicated volume.
7. **Corrected the "17" count to "16" out loud**, mid-conversation, when the user asked for the exact list and a direct recount of the files didn't match the number stated earlier in the session — named as a self-caught miscount, not left uncorrected.

## Outstanding / blocking

- Nothing blocking. Both the ACR Search reference-book project and the ACR2 pull are explicitly parked by the user, not stuck on any technical or approval issue.

## Pending / parked

- **ACR Search reference book** — parked by the user ("too flat this time" / "we will hold off on this too"). State when parked: format direction settled (light book-style visual language, matching content the ACR Reader books don't already have — NT Lookup, Contradictions, Covenant for All Nations, etc.), but the full chapter list is still unconfirmed — the last-known task in flight was a full sub-tab sweep to catch sections missed in the first navigation pass (Orit Record, Historical Docs, Communities, Hebrew DNA's own sub-tabs). Nothing built beyond preview pages (in the session scratchpad only, never delivered as a "final" file).
- **The 16 (previously misstated as 17) remaining Qumran-sectarian ACR Reader volumes** (`data/file_96.json`–`file_115.json` — Damascus Document, Community Rule, Rule of the Congregation, Rule of Blessings, Words of the Luminaries, Pesher Nahum, Thanksgiving Hymns, Pesher Habakkuk, Songs of the Sabbath Sacrifice, Genesis Apocryphon, Temple Scroll x3, Raz Nihyeh) — parked by the user, intended to be covered together with the ACR2 print pass rather than pulled individually from ACR Reader now.
- **ACR2's own pull into personal `.docx` files** — not started, parked alongside the above.
- **Songs of the Sabbath Sacrifice** — confirmed missing as a standalone volume on *both* ACR Reader and ACR2 (only exists as cross-references inside other volumes on ACR2). Not flagged as a site bug to fix — just noted for whenever this pull resumes, since neither site currently has this text as its own volume to pull from.
- **file_14.json on ACR2** (Messianic Apocalypse, 4Q521, Held Under Warning) — exists but unlinked from ACR2's live navigation, same situation the Book of Giants was in on ACR Reader before it was found. Not on the original "16" list. Noted for whenever the ACR2 pull resumes.

## Capability gaps this session

- None encountered. All source files (ACR Reader `data/`, `Search/acr_concordance.json`, `Search/acr_search_data.json`, `Search/index.html`, ACR2 `data/`) were fully readable throughout.

## Today's commit log

- No commits to any site branch this session (no site edits made). This notes file is the only commit, on its own branch (`claude/session-notes-2026-09-29`), per the mandatory session-logging rule.
