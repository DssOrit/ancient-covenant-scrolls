# Session Notes — 2026-07-28

## Current state
- Live: `origin/main` at 0d7b5c6, ACR Search cache **acr-search-v273** (verified live).
- Working branch: `claude/session-continuation-setup-2zkame`, reset onto origin/main at end of day (clean, nothing uncommitted except these notes).
- git identity: Claude / noreply@anthropic.com (feature commits verified).
- Continuing the excluded-text reconciliation of ACR Search: no excluded text used as a validating/authoritative reference; excluded texts appear only in debunk/exclusion context.

## Working method (LOCKED — keep exactly this tomorrow)
One spot at a time. For each spot:
1. Complete BEFORE (full current text).
2. Suggested AFTER (full proposed text).
3. Contradiction analysis — just say whether there are contradictions or not.
4. Wait for the user's "go"; then apply, verify (node --check), commit.
Only touch excluded-chapter references that VALIDATE. Debunk references stay.
Minimal change; re-source rules to a covenant verse where one exists (don't just delete).
NO softening. NO tiny/monospace font (no backticks) in anything shown to the user.
Never merge — the user merges every PR. Verify every replacement verse in the concordance before proposing.

## Built today (merged, live at v273) — all Damascus Document (CD) pass, item #3
Shipped across PRs #770–#775 (cache v267 -> v273):
- Shabbat rule-credit lines (L1532, L1824, L5909); Sunday-worship card (L4446); lunar-calendar card (L4899);
  Shabbat primary-source card (L5095); convergence card (L5096); Shabbat-practice section (L5247, L5263).
- women-men card (L7364/L7365): CD 4:20-5:2 + 11QT 57:15-19 + 1QSa I:9-11 out -> Shemot 15:20; Malakhi 2:14-16; Bamidbar 1:3; Vayikra 27:3.
- 800-doc counter-record card (L10297): 1QS/CD/1QM out -> covenant record; retitled "The Covenant Record the Covenant People Carried"; trimmed to user's wording.
- Shabbat-timing Q&A (L7382/L7383): CD 10:14-11:18 / 4QMMT / 4Q400-407 out -> Shemot 35:3; 16:29; Yirmeyahu 17:21-22; Amos 8:5; Nechemiah 13:15-22 (4Q320-321 calendar kept).
- Shabbat-violations (L7385): VIOLATION FOUR off CD/4QMMT -> covenant record; 39-melachot debunk kept.
- Racism card (L7427/L7428): CD XIV:3-6 + 1QM out -> Bamidbar 15:15-16; Shemot 12:38; Yeshayahu 56:6-7 (Numbers 12 verdict kept).
- Same-sex card (L7463/L7464): CD 4:20-5:6 + 11QT 66 + 1QSa I:4-5 out -> Vayikra 18 / 18:26 (Torah stance + Romans-1:26 debunk kept).
- Dividing Line card (L3804): 1QS/CD XIV:3-6/1QM out -> Bamidbar 15:15-16; Shemot 12:38; Yeshayahu 56:6-7; retitled "In the Covenant Record...".
- Shabbat lexicon (L7668): CD 10:14-11:18 -> Shemot 20:8-11; 35:3; 16:29; Amos 8:5; Yirmeyahu 17:21-22 (calendar line kept).
- Cain/Kayin lexicon (L7803): CD 3:1 -> Bereshit 4:7; Yirmeyahu 5:23; Yeshayahu 46:12 (1 Enoch line kept).
- mishpat lexicon (L2793): Community Rule + Damascus Document -> Devarim 16:18-20.
- brit/covenant card (L3769): Community Rule + Damascus Document dropped from source tag (DSS-manuscript + Torah kept).
- Fabrication One card (L3877): "in the Damascus Document" citation dropped (Talmud debunk kept).
- Teacher of Righteousness feature (L4576+): reframed off CD/1QpHab to covenant-record template
  (Devarim 18:15-18; Yeshayahu 30:20; Yirmeyahu 20:11; Amos 3:7; Shemot 24:11; Vayikra 15:13-16);
  note now carries the law-breaking verdict (Shemot 20:3-5; Devarim 24:16; Yirmeyahu 19:5);
  three section/claim headings realigned off "DSS Precursor"; NT-invention debunk kept.

## Outstanding / pick up tomorrow (same manner, one by one)
CD (item #3) — 2 validating spots left:
- L2784 — tzedek lexicon entry ("The Teacher of Righteousness (moreh ha-tzedek)... restores correct legal and cultic order").
- L4615 — mashiach point ("the figures the covenant community awaited... the Teacher of Righteousness, are agents of YHWH").
After those two, CD is complete (all other CD occurrences are debunk/dossier/leave: L4707, L4877, L6345-6406 dossier, L6840 nav, L7793 books entry, L9491-9499 discovery cards, and glossary debunk lines).

## Remaining texts (Bucket 1, after CD) — same one-by-one method
- #4 Pesher Habakkuk (1QpHab)
- #5 Temple Scroll (11QT) — partially cleared incidentally (women-men, same-sex)
- #6 War Scroll (1QM) — partially cleared incidentally (racism, dividing line, TOR)
- #7 Book of War (4Q285)
- #8 4QMMT — partially cleared incidentally (Shabbat cards)
- #9 Rule of Congregation (1QSa) — partially cleared incidentally (women-men, same-sex)
- #10 Words of the Luminaries (4Q504-506)
- #11 Songs of Sabbath Sacrifice (4Q400-407) — partially cleared incidentally (Shabbat-timing card)
- #12 Book of Giants
- #13 Raz Nihyeh / 4QInstruction (raz lexicon L2777 already handled as debunk)
Done earlier: #1 Community Rule (1QS), #2 Hodayot (1QH), #14 Jubilees.
Working checklist: SEARCH_EXCLUDED_TEXT_VALIDREF_AUDIT_2026-07-25.md (frozen 312-occurrence scan).

## Backups (recovery: git checkout backup/<name>)
- backup/2026-07-28-acr-search-v273 @ 0d7b5c6 (today's final live state)
- backup/2026-07-28-acr-search-v272 @ a51c5d0
- backup/2026-07-28-acr-search-v271 @ ff411b0
- earlier: v268/v269/v270 backups from the first half of the CD pass.

## Capability gaps this session
- None new. Concordance (Search/acr_concordance.json, 19,743 passages) is the reliable verse-verification source.
- GitHub merge commits show as "Unverified" (committer noreply@github.com) in the stop-hook nag; harmless, clears on the next real commit.
