# Session Notes — 2026-07-11

## Current state

- Branch: `claude/acr-search-content-checklist-ZgUAQ`
- Latest local commit: `6883983` — GESTUDY content additions (gestudy-v17)
- PR open: #601 — covers all three apps (Search, Great Eraser, GESTUDY)
- Awaiting user "Merge" confirmation before merging (Rule 9)
- Working tree: clean after push

## Built today

### Large content addition across three apps — PR #601 (open, awaiting merge)

All content from the user's document added without omission across ACR Search, Great Eraser, and Great Eraser Study.

---

**ACR Search (Search/index.html) — acr-search-v141**

Racism panel — new sections appended before closing of `renderRacismPanel()`:
- The Curse of Ham — The Full Primary-Source Record (14+ td-items):
  - What the text actually says: Bereshit 9:20-27 (Canaan cursed, no color, no race, no skin)
  - Primary text: 4QGen-Exoda (Cave 4, IAA) and Jubilees 7 and 8 (Ge'ez Orit)
  - Jubilees 9:14-15 (land boundaries, Afro-Asiatic corridor, Nile valley)
  - Jubilees 10:29-34 (land dispute, not racial hierarchy)
  - What primary sources explicitly contradict (Jubilees 8:7-9, DSS, Orit)
  - Fabrication One: Talmud Sanhedrin 70a c. 500 CE (3 misreadings, absent from DSS and Orit)
  - Fabrication Two: Thornton Stringfellow 1856 (American pro-slavery application)
  - Who built doctrine (Stringfellow, Virginia statutes, Slave Bible)
  - Ham's actual descendants per Bereshit 10 (Cush, Mitzrayim, Put, Canaan — African)
  - Three-version comparison: primary source / Talmudic addition / colonial application
- The Financial Suppression Chain (4 td-items): Barclays, HSBC, Lloyds 2023, UCL database (£17 billion, 47,000 enslavers, 1833)
- The Legal Architecture and Reparations Suppression (6 td-items): Virginia 1705, SC 1740, British Slave Trade Act 1807, Haiti 1825-1947, H.R. 40 1989-present, Evanston 2022

Suppressed view — two new panels:
- `#suppression-docs-panel` added before `#suppressed-list` in HTML
- `#covenant-record-panel` added before `#suppressed-list` in HTML
- `renderSuppressionPanel()` added: 44-year embargo (Strugnell Ha'aretz 1990, Huntington 1991), YHWH naming (Nahal Hever 8HevXIIgr, 6,828 KJV substitutions), Slave Bible (Select Parts 1807, British Museum), Operational Framework (Code Noir 1724, Barbados 1661, NT submission passages, CMS Archive), Canon Selection (Athanasius 367 CE, Nicaea 325 CE, Sol Invictus coinage), Direct Line (Dum Diversas 1452 → Slave Bible 1807 → Code Noir 1724 — 355 years), Pattern/Tension/Evidence (Lloyds 2023, Bank of England 2020, Glasgow 2018, Yavneh/Nicaea alignment, Berlin Conference 1884-1885, Diop/Sorbonne, Obenga/UNESCO, IAA/British Museum/Vatican/Library of Congress holding evidence of what they suppressed, what makes evidence usable)
- `renderCovenantRecordPanel()` added: Covenant Declarations (Damascus Document Col I, 1Q27, 4Q521, 1QM Col I, Jubilees 1:15-18/23:26-27, 1 Enoch 1:7-8), Land Record (1QH XIV, 1QS VIII, 4Q500, 1 Enoch 10:16-22, Jubilees 1:29/50:5), Yehezkel 36 full text from 4QEzek (vv. 1-7, 8-12, 19-20, 24-26, 34-35), Geographic territory (Jubilees 8:12, Gihon/Kush in 4QGen-Exoda, Soleb/Amarah-West, African tectonic plate), Covenant Land Promises (4QGen-Exoda Gen 15:18, 4QDeut-j Deut 11:24, CD Col I, Jubilees 14:18/22:27/50:5, Yehezkel 36:24-28), Legal Consequences (1 Enoch 99:14/104:10, 4QDeut-j Deut 19:14/27:17, Jubilees 29:11, 4QJer 50:29-33/51:56, 1 Enoch 96:5-6/97:8-10, 1QpHab Col X and XII, CD Col VIII, Jubilees 4:5-6/36:9-10, 1 Enoch 103:9-15)
- `renderSuppressionPanel()` and `renderCovenantRecordPanel()` wired up in `initApp()` before `renderSuppressedLibrary()`

How to Use guide — both sections updated:
- Racism section: 7 steps (was 5) — added Curse of Ham full record step, financial suppression chain step, legal architecture step
- Suppressed section: 6 steps (was 3) — fully rewritten to describe suppression docs panel, covenant record panel, pattern/tension/evidence, verse library

Cache: acr-search-v139 → acr-search-v141 (v140 was already on main from redirect hardening)

---

**Great Eraser (GreatE/index.html) — great-eraser-v16**

Blocks added to 10 chapters:

- Vol 4 Ch 47 (Hamitic Hypothesis): Full Curse of Ham primary-source record — 4QGen-Exoda, Jubilees 7/8/9/10, Fabrication One (Sanhedrin 70a), Fabrication Two (Stringfellow 1856), Ham's actual descendants (Cush, Mitzrayim, Put, Canaan), three-version comparison. 4→13 blocks.
- Vol 9 Ch 18 (44-Year Suppression): Strugnell Ha'aretz 1990, Huntington Library September 1991, intellectual property argument, Yavneh/Nicaea aligned exclusions. 5→9 blocks.
- Vol 3 Ch 26 (Transatlantic Slave Trade): Financial suppression chain (Barclays, HSBC, Lloyds, UCL £17B/47K), legal architecture (Virginia 1705, SC 1740, British Act 1807), Haiti 1825-1947 (French Treasury records), reparations suppression (H.R. 40, Evanston 2022). 30→34 blocks.
- Vol 5 Ch 55 (Haitian Debt): French Treasury record, final 1947 payment, broader financial architecture. 6→8 blocks.
- Vol 5 Ch 60 (Present Moment): H.R. 40 1989-present legislative record, Evanston 2022 program. 14→16 blocks.
- Vol 7 Ch 71 (Council of Nicaea): Athanasius Festal Letter 367 CE, excluded books (1 Enoch/Jubilees), Constantine Sol Invictus coinage (British Museum). 16→19 blocks.
- Vol 8 Ch 80 (Paul of Tarsus): NT submission passages deployed (Eph 6:5/Col 3:22/1 Pet 2:18), CMS Archive Birmingham/SOAS record, DSS contains no submission framework. 6→9 blocks.
- Vol 8 Ch 86 (Single Unified System): Direct line (Dum Diversas 1452→Slave Bible 1807→sermon records→Code Noir 1724, 355 years), pattern/tension/evidence (Lloyds 2023, Bank of England 2020, Glasgow 2018, aligned exclusions, Berlin Conference, Diop/Sorbonne, Obenga/UNESCO, what makes evidence usable). 4→6 blocks.
- Vol 3 Ch 27 (Covenant Framework): Covenant declarations from DSS and Orit, land record (1QH XIV, 1QS VIII, 4Q500, 1 Enoch, Jubilees), Yehezkel 36 full text from 4QEzek (vv. 1-7, 8-12, 19-20, 24-26, 34-35), covenant land promises (4 named sources). 22→26 blocks.
- Vol 3 Ch 29 (Covenant Justice Framework): Consequences for text fabricators (1 Enoch 99:14/104:10), for those who moved boundaries (4QDeut-j 19:14/27:17, Jubilees 29:11), for those who suppressed covenant people (4QJer 50:29-33/51:56, 1 Enoch 96:5-6/97:8-10), institutional declaration (1QpHab Col X and XII), full framework (CD Col VIII, Jubilees 4:5-6/36:9-10, 1 Enoch 103:9-15). 10→15 blocks.

Cache: great-eraser-v15 → great-eraser-v16

---

**Great Eraser Study (GESTUDY/data/app_data.json) — gestudy-v17**

New verses and quiz added to 9 chapter IDs:
- ch47 (Hamitic Hypothesis, Vol 4 Ch 16): 3 new verses (4QGen-Exoda Bereshit 9, Sanhedrin 70a, Stringfellow 1856), 2 new quiz items. Now 5 verses / 3 quiz.
- v9_ch18 (44-Year Suppression, Vol 9 Ch 12): 2 new verses (Strugnell Ha'aretz 1990, Yavneh/Nicaea aligned exclusions), 1 new quiz. Now 4 verses / 2 quiz.
- v9_ch22 (Name Suppression Chain, Vol 9 Ch 16): 2 new verses (Nahal Hever 8HevXIIgr, KJV 6,828 substitutions). Now 5 verses / 1 quiz.
- v9_ch26 (Council of Nicaea, Vol 9 Ch 19): 2 new verses (Athanasius Festal Letter 367 CE, Constantine Sol Invictus coinage). Now 5 verses / 1 quiz.
- v9_ch28 (What DSS Actually Show, Vol 9 Ch 20): 1 new verse (1QS/CD/1QM — no submission framework). Now 4 verses / 1 quiz.
- v9_ch40 (What Ancient Texts Actually State, Vol 9 Ch 30): 2 new verses (Yehezkel 36:24-26 from 4QEzek, covenant land promises from 4 sources), 1 new quiz. Now 5 verses / 2 quiz.
- v9_ch45 (Scale of Middle Passage, Vol 9 Ch 35): 2 new verses (UCL Legacies database, H.R. 40 and Evanston 2022), 1 new quiz. Now 5 verses / 3 quiz.
- v9_ch52 (Who the Covenant People Are, Vol 9 Ch 42): 1 new verse (Slave Bible 1807, 90% removed). Now 4 verses / 2 quiz.
- cm_i (Covenant Entity, Vol 10 Ch 0): 2 new verses (Yehezkel 36:34-35 from 4QEzek, 1 Enoch 99:14/104:10 on text fabrication), 1 new quiz. Now 4 verses / 2 quiz.

9 new memory cards added (total: 27):
- mc_curseham1: 4QGen-Exoda Bereshit 9 — Canaan cursed, no race
- mc_curseham2: Talmud Sanhedrin 70a — Fabrication One
- mc_stringfellow: Stringfellow 1856 — Fabrication Two
- mc_ucl_slavery: UCL Legacies database, £17B to 47,000 enslavers
- mc_hr40: H.R. 40, 1989-present, never voted
- mc_evanston: Evanston 2022 municipal reparations
- mc_slavebible: Slave Bible 1807, 90% removed, Exodus removed
- mc_yehezkel36: Yehezkel 36:24-26, gathering from nations
- mc_dum_diversas: Direct line Dum Diversas 1452 → Slave Bible 1807 → Code Noir 1724

Cache: gestudy-v16 → gestudy-v17

## PR open — awaiting merge

**PR #601** — `claude/acr-search-content-checklist-ZgUAQ` → `main`
Covers: Search/index.html, Search/sw.js, GreatE/index.html, GreatE/sw.js, GESTUDY/data/app_data.json, GESTUDY/sw.js

User must say "Merge" before merging (Rule 9).

## Outstanding / blocking

- Nothing blocking. All three apps verified working on device by user.

## Pending / parked

- Image integration (183 user images, hosting workflow) — still pending, no urgency
- Documentary image prompt script in scratchpad only — user may want committed
- Any further divine name sweeps — not requested

## Capability gaps this session

- `dssorit.github.io` blocked — verify via `raw.githubusercontent.com` or GitHub MCP
- No `gh` CLI — GitHub MCP tools for all PR operations
- `initApp()` in Search requires 23MB concordance; verification done via Chromium render functions directly

## Backups

Last backup: `backup/2026-07-11-v142` (SHA b79dbcf) — verified working by user 2026-07-11
Previous backup: `backup/2026-07-06-v129` (SHA acfdc4e)
Recovery: `git checkout backup/2026-07-11-v142`
Recovery: `git checkout backup/2026-07-06-v129`

## Today's commit log

```
6883983 Great Eraser Study: Curse of Ham verses, suppression chain, covenant promises, land, reparations memory cards (gestudy-v17)
fb57935 Great Eraser: Curse of Ham full record, suppression chain, covenant promises, land, Yehezkel 36, legal consequences (great-eraser-v16)
e103244 Search: Curse of Ham full record, suppression chain, covenant promises, land restoration, legal consequences (acr-search-v141)
7bbff49 Merge origin/main (bce0faa) into content-checklist branch
```

## Divine name rule (kept)

Only YHWH and Creator. No Lord, Adonai, Elohim, capital-G God as divine name. Applied to all new content this session.

## Content standard (kept)

All content anchored to named primary sources (archive + document). No conciliation framing. Institutions, documents, and dates named. African and African-diaspora scholarship presented on its own terms, as fact.
