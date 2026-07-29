# Session Notes — 2026-07-29

## Current state
- Working branch: `claude/session-continuation-setup-2zkame`.
- **PR #784 MERGED** (`bd1cac7`, cache v281) — War Scroll re-source pass (7 spots).
- **PR #785 MERGED** to main (`d4f2fda`), cache **acr-search-v282** — CONFIRMED LIVE ON IPAD by user.
  Consistency fixes: L7691 (soul/nefesh dead-state) + L4116 (War Scroll card -> shelf 4).
- Backups: `backup/2026-07-29-acr-search-v282` @ `d4f2fda` (latest verified-live);
  `backup/2026-07-29-acr-search-v281` @ `bd1cac7`. Recovery: git checkout <branch>.
- Both post-merge contradictions (issues 1 & 2 below) are now RESOLVED and LIVE. Issue 3 remains.
- Next session: continue issue 3 (remaining ~dozen validating 1QM spots). Branch is even with
  main after #785; start fresh work from latest origin/main, new PR when shipping.
- git identity: Claude / noreply@anthropic.com. The stop-hook "Unverified (N)" nag is the
  missing GPG signature only (this env cannot sign); commits carry the correct email. Harmless.
- Continuing the excluded-text reconciliation of ACR Search: no excluded text used as a
  validating/authoritative reference; excluded texts appear only in debunk/exclusion context.

## Post-merge consistency assessment (this session, after #784)
User asked to assess the site for inconsistency/contradiction after the partial War Scroll pass.
Three issues found; two fixed (held, unshipped), one logged.
- **Issue 1 — state of the dead (FIXED, `05a361e`, held).** L7717 (fixed earlier today) removed
  the "unconscious Sheol" claim per the Shmuel/En-dor account (1 Shmuel 28 — Shmuel roused, knew
  Saul, foretold his death). L7691 (soul/nefesh) still said "unconscious waiting" — contradicted
  L7717 and the site's own L7311 ("rest, not conscious glory," Shmuel "disturbed from rest").
  Fixed L7691: dropped "unconscious," dropped "in DSS," added 1 Shmuel 28:15 rousable ref. All
  three dead-state entries (L7311, L7691, L7717) now agree: rest in Sheol, not heaven, not
  oblivion, rousable.
- **Issue 2 — War Scroll card vs debunk cards (FIXED, `1a19c76`, held).** L4116 catalog card was
  shelf 1 / type dss, presenting the War Scroll neutrally-positive ("YHWH's army fights alongside
  the covenant community"), while L6356/L6489 call it "a sectarian forgery." User approved
  Option A. IMPORTANT method note: user asked "did you search the included chapters to see if this
  links" FIRST — the answer was YES it links (Devarim 20:4; Yehoshua 5:14 commander of YHWH's army;
  Bamidbar 10:9 war-trumpet; Bamidbar 14:33 forty years; Ovadyah 1:19,21 Edom/Pelishtim; Yoel 3;
  Zecharyah 14). So the reframe does NOT claim the themes are "absent from the covenant record"
  (that would be false/overstated). Card moved to shelf 4 / type manipulated, reframed as a "late
  sectarian rewrite of the covenant war": covenant themes are real and link; the OVERLAY (Roman-era
  battle drill, Kittim=Rome dating tell, Persian Sons-of-Light/Darkness dualism, personified
  Belial) is the manipulation. LESSON: always search included chapters before writing an "absent /
  fabricated" verdict.
- **Issue 3 — partial 1QM pass (LOGGED, not started).** ~a dozen validating War Scroll spots
  remain and now openly contradict the shelf-4 card. Do these next session, one by one, with the
  same check-first method (search included chapters, re-source accurately, don't overstate).
  Biggest first: **L5056** (whole section "The War Scroll Names What This Is — The Primary Source
  the Covenant Community Sealed"); **L10121-10123** (section "The War Scroll (1QM)... YHWH Fights
  Directly in the Seventh Phase"); **L1530** ("the primary source the covenant community sealed in
  Cave 1"); **L10337** (War Scroll and Gog). Smaller: L1751, L7724 (melekh/king), L7781, L7786
  (Yehoshua), L10212, L10253. Triage each: validate=re-source, debunk=leave, neutral nav/label=leave
  (L6344/L6838/L6850 vol labels; L7347 exclusion list; L3501/L7702 are 11QMelch not 1QM).

## Working method (LOCKED — unchanged)
One spot at a time: full BEFORE, full AFTER, contradiction yes/no, wait for user "go", then
apply, verify (node --check), commit. Only touch excluded references that VALIDATE; debunk
stays. Minimal change; re-source to a covenant verse (don't just delete). NO softening.
NO monospace/backticks in anything shown to the user (slipped once today, corrected).
Verify every replacement verse in Search/acr_concordance.json before proposing. Never merge.

## Built today — War Scroll (1QM) pass, item #6 (all in PR #784, cache v281)
Seven validating 1QM/DSS references re-sourced to the covenant record (Search/index.html):
- L7670 justice / mishpat -> Tehillim 9:8; 96:13; 98:9; Yoel 3:2,12; Malakhi 3:5; Kohelet 12:14.
- L7698 lot / goral -> Mishlei 16:33; Bamidbar 26:55; Vayikra 16:8; Devarim 30:19; Mishlei 4:18-19;
  Tehillim 97:11; 16:5. (lot-of-light re-sourced, NOT denounced — per user correction.)
- L7738 war / milchamah -> Shemot 15:3; Devarim 20:1,4; Tehillim 24:8.
- L7820 Michael -> Daniyel 10:13,21; 12:1 (1 Enoch kept).
- L7794 War Scroll book entry -> RETITLED "the final war / Milchemet YHWH"; end-times war
  re-sourced to Zecharyah 14:3,9; Shemot 15:3; Yoel 3:2,12; Bamidbar 1:3/2:2/10:9;
  Yeshayahu 60:1-2/9:2; Ovadyah 1:21. Presented seriously, NOT denounced (user corrected a
  denouncing draft: the end-times war is valid covenant truth, do not frame it as a sect/scheme).
- L7166 144,000 card -> origin off 1QM onto Bamidbar 1:3; 2:2,17,32, with QUOTED verse text
  (user chose quoted over paraphrase); NT-borrowing verdict kept.
- L7717 death / mavet -> dropped DSS/War Scroll framing AND the "unconscious Sheol / dead know
  nothing" claim (user caught: contradicted by the En-dor account, 1 Shemuel 28 — Shmuel was
  brought up, knew Saul, foretold his death). Re-sourced to Yehezkel 18:20; Kohelet 12:7;
  1 Shemuel 28:15,19; Yeshayahu 25:8; Devarim 34:6.

## Outstanding / pick up next session (same one-by-one method)
War Scroll (1QM) still has validating spots on the frozen audit not yet done, e.g.:
- L7786 Yehoshua lexicon ("The War Scroll draws on the military theology of Yehoshua...").
- L5315 ("The War Scroll (1QM, Cave 1, Qumran) describes the covenant people in active...").
- L1530, L5056, L10122/L10123/L10131 (hard-refresh/section bodies), L10212, L10234, L10237,
  L10337, plus Q&A cards L7373/L7374, L7409/L7410, L7490/L7491, and src-tag lines L7436/L7437.
- L4116 — the physical War Scroll Scroll-Library catalog card. **HELD**: user has NOT approved
  moving it to shelf 4. The "don't denounce the theme" correction means the card decision needs
  explicit user direction before any change. Do not touch without a clear go.
Leave (debunk/dossier): L3747, L3785, L4707, L4877, L5035, L6344-6489, L6603-6703, L6838/6850,
L7347, L7427/7428 (done in CD pass), L7686/7700 (already debunk), L9463, L10297 (done).
Also still open from 2026-07-28: CD spots L2784 (tzedek) and L4615 (mashiach point).

## Remaining texts (Bucket 1) — same one-by-one method
#4 Pesher Habakkuk (1QpHab) [header already moved to shelf 4 earlier], #5 Temple Scroll (11QT,
partial), #6 War Scroll (1QM, IN PROGRESS), #7 Book of War (4Q285), #8 4QMMT (partial),
#9 Rule of Congregation (1QSa, partial), #10 Words of the Luminaries (4Q504-506),
#11 Songs of Sabbath Sacrifice (4Q400-407, partial), #12 Book of Giants,
#13 Raz Nihyeh / 4QInstruction. Done: #1 1QS, #2 Hodayot, #14 Jubilees.
Working checklist: SEARCH_EXCLUDED_TEXT_VALIDREF_AUDIT_2026-07-25.md (frozen 312-occurrence scan).

## Blocking / decisions for the user
- Merge PR #784 when ready (low risk; content + cache bump).
- L4116 War Scroll catalog card: decide move-to-shelf-4 vs leave. Held pending your direction.

## Capability gaps this session
- None new. Concordance (Search/acr_concordance.json, 19,743 passages) reliable for verse checks.
- Stop-hook GPG "Unverified" nag is environmental; cannot sign commits here.

## Today's commit log (oneline)
- edf3e0b Search: bump cache acr-search-v281
- 231744f Search: death/mavet entry (L7717)
- 4d341a2 Search: 144,000 card (L7166)
- ddf838e Search: retitle War Scroll glossary entry (L7794) -> the final war / Milchemet YHWH
- 97a0ee5 Search: Michael entry (L7820)
- 6006ba7 Search: milchamah entry (L7738)
- 0823aed Search: goral entry (L7698)
- e83dbbf Search: mishpat entry (L7670)
- (base: 6d7dfa4 merge of PR #783)
