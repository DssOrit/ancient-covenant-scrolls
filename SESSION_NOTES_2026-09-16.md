# Session Notes — 2026-09-16

## Current state

- Latest commit on `origin/main`: `dac8069` (Merge PR #938)
- Branch: `main`
- Working tree: clean, no uncommitted work outstanding

## Built today

**ACR Search — Lineage Explorer rebuilt as a cinematic Adam-to-Moshe chart (PR #938, merged)**

- Session began with content questions, answered from primary sources already in
  the Reader (Yovelim/Jubilees ch. 4-12, Bereshit, Shemot, Yehoshua) rather than
  guessed:
  - Whether a pre-Rabbinic/pre-Christian DSS/Orit prophecy names the Euphrates in
    an end-of-days context — found in the site's own existing NT-borrowing
    dataset: Yirmeyahu 46:6,10 ("the day of YHWH... by the river Euphrates"),
    with Revelation 9:14 correctly framed as the borrower, not the source.
  - How Avraham relates to Adam and to Chanokh — the full Adam-to-Avraham
    genealogy (20-21 generations depending on the Kainam variant) pulled
    directly from Yovelim ch. 4-12, with Anno Mundi years computed from
    Yovelim's own jubilee/week/year markers (49 years per jubilee).
  - Why Avraham was told to leave his kindred despite descending from the
    righteous line — resolved from Yovelim 11-12 (Terach's household in Ur of
    the Chaldees had fallen into idol worship; Avram confronts Terach, who
    admits he already knows; Avram burns the house of idols, his brother Haran
    dies) plus Yehoshua 24:2-3's direct confirmation ("your fathers... served
    other gods... I took your father Avraham").
  - Moshe's exact relationship to Avraham — Yehoshua 24:2-6 and Shemot 6:16-20,
    both already in the Reader: Avraham -> Yitzchak -> Yaakov -> Levi -> Kehat
    -> Amram -> Moshe (7th generation from Avraham, through Levi).
- User asked to see the chart as examples before touching any site, per Rule 20.
  Two preview artifacts were built and shown first (not published to any site):
  an initial "Adam to Avraham" chart, then a revised, more cinematic "Adam to
  Moshe" version with chapter title cards, scene captions on the falling-away
  sequence, and scroll-reveal — both approved before any site file was touched.
- User gave the exact Rule 8 unlock phrase ("edit ACR Search") to begin the
  build, with an explicit follow-up instruction: never add anything to
  CLAUDE.md notes without prior approval (respected all session — no CLAUDE.md
  edits made).
- Found during the build: the app already had a "Lineage Explorer" tool under
  Useful Tools covering this same territory (Adam through the twelve tribes),
  but only as a bare clickable name-chain with no meanings, years, quotes, or
  the falling-away story. Rather than add a second, competing feature, the
  existing tool was upgraded in place (`LINEAGE` -> `LINEAGE_TREE`,
  `buildLineage()` rewritten) — flagged transparently in the PR.
- Shipped: 27 generations Adam-to-Moshe, each a tap-to-expand card with a
  one-line fact, computed AM year, and source quote/citation; the falling-away
  story as its own chapter positioned where it actually happens in the
  narrative (after Avram's birth, not as an afterword); three chapter title
  cards (I/II/III) plus a fourth for the falling away; an act filter; a
  progress counter; scroll-reveal respecting `prefers-reduced-motion`; the
  Kainam/Cainan textual variant flagged plainly; the existing Tribes &
  Territory cross-navigation and twelve-tribes grid preserved exactly as they
  worked, now inserted at the Yaakov card.
- Cache bumped `acr-search-v312` -> `v313`.
- Verified before shipping: `node --check` on extracted JS clean; `<div>` tag
  balance +27/+27 (matches the new nodes, no imbalance); live Playwright
  verification of all 35 data entries rendering, tap-to-expand, the act
  filter, and the existing tribes cross-navigation all working exactly as
  before; re-confirmed the earlier Name Explorer and banner-crash fix
  unaffected; zero page errors.
- Backups: `backup/2026-09-16-acr-search-v312-pre-familytree` (SHA `271212f`,
  before the change) and `backup/2026-09-16-acr-search-v313` (SHA `dac8069`,
  current merged stable state).

## Outstanding / blocking

- **"Site not opening" incident — resolved itself, root cause NOT conclusively
  identified.** After PR #938 merged, the user reported ACR Search would not
  open on iPad Safari. Investigated: confirmed the deployed `sw.js` showed
  `CACHE = 'acr-search-v313'` (the new version had reached the device, ruling
  out a stuck-old-cache explanation); re-ran the real boot sequence (tap
  Enter -> loading screen -> full data load) in a local sandbox test with the
  complete file set and got a clean open with zero errors from the new code.
  A rollback to the pre-PR-938 backup was staged locally (never committed or
  pushed) when the user reported the site had opened on its own. No revert was
  applied — PR #938's content is still live. Because the fix was never
  isolated, **if this recurs, it is not yet explained** and deserves a closer
  look (candidates not yet ruled out: a transient GitHub Pages propagation
  delay, an intermittent service-worker install race specific to real Safari
  that a sandboxed Chromium test can't reproduce, or something environmental
  on that one device).
- No other new blocking items from today's work.

## Pending / parked

- Nothing newly parked today. Carried over from prior sessions, not addressed
  today (status not re-verified this session, stated here only as "last known,
  not confirmed still true"): the Yovelim `data/file_16.json` chapter fixes
  (7, 11, 12, 17/19, 22) noted as paused in earlier session notes; Rule 36
  status noted as disputed in earlier session notes; the holy-day email/push
  reminder feature undecided.

## Capability gaps in this session

- This sandbox cannot reach `acrscrolls.com` or `dssorit.github.io` directly
  (confirmed 403 from both during tonight's troubleshooting) — live-site
  behavior has to be inferred from `raw.githubusercontent.com` content checks
  and local re-creation of the app's boot sequence, never a direct load of the
  real deployed page.
- A local Playwright re-test of the real boot sequence produced console errors
  that turned out to be caused by the local test copy missing
  `acr_concordance.json` (a 22MB file not copied into the scratch test
  directory) — a false alarm from the test setup, not the shipped code. Worth
  remembering: any future "reproduce the real boot flow" test needs the full
  file set copied first, including that large file, or it will look like a
  data-load failure that isn't real.
- Remaining console errors even with the full file set (`ERR_TUNNEL_CONNECTION_FAILED`,
  `ERR_CERT_AUTHORITY_INVALID`, a 404 "fetching the script") are believed to be
  this sandbox's own network policy blocking an external resource (most likely
  a Google Fonts or icon-font request the page makes), not a defect in the
  shipped page — but this was inferred, not independently proven, since the
  sandbox can't reach those external hosts either to confirm what's being
  blocked.

## Today's commit log

```
dac8069 Merge pull request #938 from DssOrit/claude/acr-search-lineage-tree-2026-09-16
213405d ACR Search: rebuild Lineage Explorer as a cinematic Adam-to-Moshe chart
```

## Backups

- `backup/2026-09-16-acr-search-v312-pre-familytree` — SHA `271212f43de2db6978b755a0fbafa6ee013687c2` (before PR #938)
- `backup/2026-09-16-acr-search-v313` — SHA `dac8069fd4f972d6ed0b365b277cfee0da8c8860` (current merged stable state)

Recovery: `git checkout backup/<name>`
