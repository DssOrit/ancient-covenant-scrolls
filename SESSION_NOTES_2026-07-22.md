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

## #1 — SCOPE DECISION: RESOLVED (user, 2026-07-22)
"We removed the chapters, therefore nothing should contradict this move." Scope = reconcile every reference to the ACTUALLY-REMOVED content ONLY: the **Animal Apocalypse** (Chanokh 50–55), the **Epistle / Apocalypse of Weeks** (56–73), and the already-excluded **Similitudes**. NO locked-rule conflict — those are the genuine composition-date exclusions already shipped.
- The **19 DSS scrolls** (Jubilees, Community Rule, War Scroll, Temple Scroll, Damascus Document, etc.) were REORGANIZED in the browser, NOT removed. They stay VALID Second-Temple witnesses (Rules 23/25), stay cited. LABELING only — soften "held under warning / not canonical" to "supplementary Second-Temple witness."
- Calendar stays (retained Astronomical Book). Curse-of-Ham / African-origins content on Jubilees KEPT (Rules 15–17).
- This shrinks the work massively: ~11 removed-chapter refs in Search (not ~640), 2 Study units (not 24), the Reader file_65/68 Epistle refs. Genesis Apocryphon / Yovelim citations are now FINE (valid sources).

## Removed-chapter reconciliation (the real remaining work)
- [ ] **#3 — Reader:** reconcile file_65 & file_68 Epistle references (re-anchor file_68 to retained Psalm 69:28).
- [ ] **#6 — Search:** add exclusion-evidence panel for Animal Apoc + Epistle + Similitudes ONLY (example ready).
- [ ] **#7 — Search:** reconcile the ~11 Animal-Apoc/Epistle/Apocalypse-of-Weeks refs; RELABEL the 19 scrolls to "supplementary witness"; re-anchor the 364-calendar citation to Enoch. (The ~640 Jubilees/DSS citations STAY.)
- [ ] **#8 — Search:** concordance — KEEP the Astronomical Book (part 2 is mixed); handle only the Animal Apocalypse passages + the Epistle (part 3).
- [ ] **#10 — Study `study/`:** only the 2 removed-chapter units (file_14 Animal Apoc, file_15 Epistle). The other 22 units STAY as valid supplementary study material.
- [ ] **#11 — Study `GESTUDY/`:** only the removed-chapter refs. The Jubilees/DSS "Primary Source Hierarchy" prose STAYS.

## Other / optional
- [ ] **#4 — Reader:** stop SW prefetching deleted `file_15` (needs "edit acr reader").
- [ ] **#9 — Search:** wire in the relocated ACR2 Animal Apocalypse/Epistle + the debunk tap-view (preview ready).
- [ ] **#12 — Optional:** full "God"-as-the-Name sweep across all sites.

## Notes for tomorrow
- Reader edits need "edit acr reader"; Search edits need "edit ACR Search" (per-task unlock).
- Anything touching root `sw.js` (Reader cache bump) trips the CI guard → the unlock phrase must go in the PR body (needs explicit OK per Rule 27d).
- Never merge without confirmation (Rule 9). Never fabricate a source (Rule 17).
