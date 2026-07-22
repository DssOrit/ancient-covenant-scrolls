# Session Notes — 2026-07-22

## Current state
- **Branch:** `claude/session-continuation-setup-2zkame` (feature branch); `main` HEAD `2a217a1`.
- Working tree clean. All shipped work is merged to `main` and live via Cloudflare.
- **Cache versions:** Reader `acr-v91`, Search `acr-search-v185`, ACR2 `acr2-v20`.

## Built today (shipped + merged)
1. **PR #727** — Search Volume Browser: moved the 19 excluded volumes into a "Second Temple & Later Additions" warning section; added the 4 missing Torah books (Shemot/Vayikra/Bamidbar/Devarim, 1,842 factual-only verses); reconciled guide/audio "48 volumes / 13 secondary" prose to 28.
2. **PR #728** — Divine-name cleanup: every "Lord"/"LORD" (and the flagged "God") used AS the covenant Name → YHWH / the Creator / Creator, across the Reader canon (8 fixes) + Search (73 concordance passages + covenant quotes). "Creator YHWH" ordering; kept-list (Kyrios/Dominus/NT/pagan/"Lord of Spirits" documentation) left intact. 0 residual.

## Backups
- `backup/2026-07-22-acr-search-v182` (pre-Volume-Browser)
- `backup/2026-07-22-acr-search-v184` @ `6c26bef`
- `backup/2026-07-22-acr-search-v184-prename` @ `6c26bef`
- `backup/2026-07-22-acr-v91-divine-name` @ `2a217a1`
- Recovery: `git checkout backup/<name>`

## Key decision confirmed today
- **The 364-day solar calendar stays** — it lives in the RETAINED Astronomical Book of Enoch (`data/file_14`, Chanokh 37–49, DSS-attested). Excluding Jubilees/Community Rule does NOT gut the calendar; re-anchor calendar content to the Astronomical Book, never delete it.

## Big finding today (the "contradicting references" scan)
The reclassification created a site-wide contradiction: the Volume Browser labels 19 texts "not canonical," but the teaching content relies on them as authoritative sources. Verified against the actual files:
- **Reader** — LIGHT: only 10 true contradictions (3 Genesis Apocryphon in manuscript-authority headers of file_2/3/4; 7 Yovelim "confirms/establishes" citations in file_1/2/3/8) + 4 ambiguous + dangling footers.
- **Search** — SYSTEMIC: ~640 excluded-text references (Jubilees 150, 1QS 71, Damascus Doc 70, War Scroll 61, Community Rule 54…); calendar/feasts/Shabbat/Beliefs/NT-Lookup lean on them.
- **Study** — HEAVIEST (not re-verified against files, subagent scan): `study/` has 24 dedicated units + code (VOL_GROUPS, quizzes, "War Scroll Sealed" achievements); `GESTUDY/` has 7 chapters + a "Primary Source Hierarchy" prose (~466 Jubilees refs).

---

# TO-DO — 2026-07-23

## Quick wins (contained, no scope decision needed)
- [ ] **#2 — Reader dangling footers.** Two clean factual fixes ready: `file_12` "All 108 Chapters — Five Sections" → "Chapters 1 through 49…"; `file_13` "Chapters 37 Through 55" → "Chapters 37 Through 49…". NEEDS: "edit acr reader" + OK to put that phrase in the PR body (CI guard).
- [ ] **#5 — Search Volume Browser numbering.** Relabel gold cards to the Reader's own Vol 1–28 + book names (fixes "more than 28 volumes"). Preview already built. NEEDS: "edit ACR Search".

## The decision that unblocks everything
- [ ] **#1 — Scope call.** Which Tier-2 texts (Jubilees, Community Rule, War Scroll, Damascus Document, Temple Scroll, Hodayot…) are truly excluded AS SOURCES vs. just reorganized in the browser? (Calendar already settled — stays.) This unblocks #3, #6, #7, #8, #10, #11.

## After the decision
- [ ] **#3 — Reader:** fix 10 authority citations + 4 ambiguous Yovelim + the file_65/68 Epistle refs.
- [ ] **#6 — Search:** add the exclusion-evidence section (example ready — pick placement).
- [ ] **#7 — Search:** reconcile the ~640 authority references (re-anchor calendar to Enoch; feasts/Shabbat per-topic; keep protected Curse-of-Ham/Jubilees content).
- [ ] **#8 — Search:** removed-Chanokh concordance — KEEP the Astronomical Book (part 2 is mixed); decide on the Animal Apocalypse passages + the Epistle (part 3).
- [ ] **#10 — Study `study/`:** 24 units + code.
- [ ] **#11 — Study `GESTUDY/`:** 7 chapters + Primary Source Hierarchy prose.

## Other / optional
- [ ] **#4 — Reader:** stop SW prefetching deleted `file_15` (needs "edit acr reader").
- [ ] **#9 — Search:** wire in the relocated ACR2 Animal Apocalypse/Epistle + the debunk tap-view (preview ready).
- [ ] **#12 — Optional:** full "God"-as-the-Name sweep across all sites.

## Notes for tomorrow
- Reader edits need "edit acr reader"; Search edits need "edit ACR Search" (per-task unlock).
- Anything touching root `sw.js` (Reader cache bump) trips the CI guard → the unlock phrase must go in the PR body (needs explicit OK per Rule 27d).
- Never merge without confirmation (Rule 9). Never fabricate a source (Rule 17).
