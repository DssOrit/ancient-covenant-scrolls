# Session Notes — 2026-07-26

## Current state
- Working branch: `claude/session-continuation-setup-2zkame`
- Branch HEAD: d523593 (ahead of `origin/main`, NOT merged, NOT live)
- Search cache: `acr-search-v263` — UNBUMPED. Tonight's edits are on the
  feature branch only; nothing shipped to `main`, nothing live yet.
- Backup: `backup/2026-07-26-acr-search-v263` @ d523593 (feature tip).
  Recovery: `git checkout backup/2026-07-26-acr-search-v263`
- Nothing uncommitted.

## Task context (continuing multi-session work)
Reconciling ACR Search so NO excluded text is used as a validating/authoritative
reference. Excluded texts may appear ONLY in debunk/exclusion contexts.
Walking the 14-text list one by one, spot by spot, per user cadence.
**Item 1 of 14 = Community Rule (1QS).**

Standing rules for this work (locked by user):
- Authority is the ACR Reader covenant record (Torah, prophets, in-canon texts),
  cited by verse reference — never an outside or excluded text.
- Talmud references stay only as the debunk record, never as authority.
- Pre-Rabbinic, pre-Second-Temple, pre-Christian. No softening, no Western framing.
- Minimal change only — keep card/entry wording + structure; change only the
  excluded source tags/sentences. "No touching of nothing but the excluded part."
- The DSS/Qumran COMMUNITY (the people) is kept and honored; only their EXCLUDED
  sectarian rulebooks (1QS, CD, War Scroll, Temple Scroll, Pesharim, MMT, Hodayot)
  are removed as sources.
- Scripture swaps must be a logical swap that fits the point; research/verify
  every verse before applying (user: "research because this is important").
- Never merge — user merges. Show exact wording before applying.

## Built today (all on feature branch, one commit per spot)
1QS Q&A cards:
- Spot 17 — government/voting card re-sourced off 1 Samuel 8; removed
  Qumran/Teacher/CD sentence block; keySrc + src -> 1 Samuel 8:1-22. (5913d6a)
- Spot 18 — new-covenant card: stripped CD + 1QS validating refs (surgical,
  only the excluded parts); kept Jeremiah 31 + Devarim 30:6. (66f2aec)
- Spot 19 — satan/Belial card: dropped 1QS/1QM from keySrc; debunk body
  (Belial fabrication, Jubilees Mastema) kept as debunk. (05e4c7b)
- Spot 20 — faith-miracles card: pulled 1QpHab interpretive clause + 1QS from
  keySrc/body/src; kept Habakkuk 2:4, Devarim 18:10-12, 4Q521. (7b4ddfa)

1QS covenant-word glossary entries (8) — each: remove 1QS line, swap in a
verified covenant-record source:
- kippur -> Vayikra 16 (27b4ef7)
- light/or -> Tehillim 119:105 (ed22283)
- yachad -> Devarim 33:5 + Tehillim 133:1 (verified) (bf77b81)
- heart/lev -> Tehillim 24:3-4 + Devarim 10:16 (bdc84e9)
- bread/lechem -> Shemot 24:11 + Bereshit 14:18 (306685b)
- sin/chet -> Shemot 34:7 + Vayikra 16:21 (verified) (f851615)
- wine/yayin -> Bamidbar 28:14 (yayin, not 28:7/shekar) + Bereshit 14:18 (4a1f7bd)
- people/am -> Devarim 29:9-14 (d523593)
- darkness/choshekh — SKIPPED on purpose: 1QS/1QM there is debunk ("held under
  warning"), stays.

Every commit: python surgical edit -> node --check on extracted scripts (JS OK)
-> commit -> push. All green.

## PARKED tonight — pick up TOMORROW, one by one, same cadence
**The glossary "books" dictionary (index.html lines ~7778-7801).** Dedicated
neutral reference entries for the excluded scrolls, presented with NO exclusion
framing. Needs the same treatment:
- Serekh HaYachad / Community Rule (1QS) — 7792 ("Essential for understanding
  DSS communal life")
- Berit Damesek / Damascus Document (CD) — 7793
- Megillat HaMilchamah / War Scroll (1QM) — 7794
- Megillat HaMikdash / Temple Scroll (11QT) — 7795
- Hodayot / Thanksgiving Hymns (1QH) — 7796
- Sefer HaYovelim / Jubilees — 7797
- Pesher / Commentary (1QpHab) — 7800
- **Sefer Chanoch / Book of Enoch — 7798 — PRIORITY.** Still lists "the Book of
  Dreams, the Epistle of Enoch, and the Similitudes" as contents and says the
  DSS community "treated 1 Enoch as authoritative scripture" with NO exclusion
  flag. This undercuts the Enoch reconciliation already shipped in v263. Fix
  first tomorrow.
- Also passing mentions of excluded scrolls inside the Torah/prophet book entries
  (7778-7791): "The Temple Scroll reworks the Shemot legislation," "Genesis
  Apocryphon," "Songs of the Sabbath Sacrifice," "War Scroll draws on...",
  "Hodayot...". Decide per-entry tomorrow.
User decision: PARK (option 2) — finish this cluster tomorrow one by one, then
continue the rest of the 14-text list.

## Outstanding / still on the 14-text list (not yet started)
Item 1 (1QS) is nearly done: Q&A cards + covenant-word glossary DONE; "books"
dictionary parked. Remaining borderline 1QS spots to decide later (used as
counter-record / historical evidence against NT/institution, not as covenant
authority — user to rule on these):
- Guide panel line ~1631: "DSS vs institutional Bible showing 1QS, CD, 1QM
  contain no submission framework."
- 800-document Qumran library card (~10297) and Belial-fabrication cards
  (~10234): 1QS/1QM named to expose/counter — currently read as debunk, KEEP,
  but user flagged 800-doc as borderline.
Then items 2-14: Hodayot 1QH, Damascus Document CD, Pesher Habakkuk, Temple
Scroll, War Scroll 1QM, Book of War 4Q285, 4QMMT, Rule of Congregation 1QSa,
Words of the Luminaries, Songs of Sabbath Sacrifice, Book of Giants,
Raz Nihyeh/4QInstruction, Book of Jubilees.
Working checklist file: `SEARCH_EXCLUDED_TEXT_VALIDREF_AUDIT_2026-07-25.md`.

## Shipping status
- Nothing merged/live tonight. Cache still v263.
- When the batch is done (or when the user wants a checkpoint live): bump
  `Search/sw.js` cache v263 -> v264, open PR into `main`, list files + risk,
  WAIT for user approval, user merges. Per locked rules 6 + 9.

## Capability gaps this session
- Cannot reach live dssorit.github.io or the Pages API. Verified state via git +
  node --check locally. (Unchanged from prior sessions.)

## Today's commit log (oneline)
d523593 glossary people/am -> Devarim 29:9-14
4a1f7bd glossary wine/yayin -> Bamidbar 28:14 + Bereshit 14:18
f851615 glossary sin/chet -> Shemot 34:7 + Vayikra 16:21
306685b glossary bread/lechem -> Shemot 24:11 + Bereshit 14:18
bdc84e9 glossary heart/lev -> Tehillim 24:3-4 + Devarim 10:16
bf77b81 glossary yachad -> Devarim 33:5 + Tehillim 133:1
ed22283 glossary light/or -> Tehillim 119:105
27b4ef7 glossary kippur -> Vayikra 16
7b4ddfa spot 20 faith-miracles: 1QpHab + 1QS out
05e4c7b spot 19 satan card: 1QS/1QM out of keySrc, debunk kept
66f2aec spot 18 new-covenant: CD + 1QS out
5913d6a spot 17 government/voting: re-sourced off 1 Samuel 8

## Backups
- backup/2026-07-26-acr-search-v263 @ d523593 (feature tip tonight).
  Recovery: `git checkout backup/2026-07-26-acr-search-v263`
