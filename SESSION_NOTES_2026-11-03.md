# Session notes 2026-11-03

## Current state
- Branch claude/loadscience-v1 from origin/main a55523d (cache on main: loadsurvival-p142-v160).
- Backup pushed: backup/2026-11-03-loadsurvival-p142-v160 at a55523d224f3fd572b216811bea8ce7194f46926 (matches origin/main). Recovery: git checkout backup/2026-11-03-loadsurvival-p142-v160.

## Built today
- Melanin research note (scratchpad, not in repo): UV, DNA, barrier, neuromelanin, African pigmentation genetics, full electromagnetic spectrum, gamma, electronics. Every item tagged VERIFIED, SECONDARY, UNVERIFIED, READING, NOT SUPPORTED, OPEN, CONFLICTING or HYPOTHESIS.
- New app Load Science at /loadscience/ (cache loadscience-v6): the research note as an offline-first iPad PWA. Files: index.html, style.css, data.js, app.js, sw.js, manifest.webmanifest, icons, README.md. New folder only; no existing site was touched.

## Verification run (headless browser, real index.html)
- node --check on app.js, data.js, sw.js: pass. Manifest parses. Every file in the sw.js CORE list exists.
- 16 routes at 820 px and 375 px: all render, no page errors, no console errors, no horizontal overflow.
- Service worker registers and caches 11 core files under loadscience-v1.
- Real iPad Safari test: DEVICE TEST PENDING.

## Outstanding
- PR for user to review and merge on GitHub. Claude does not merge.
- Open research checks are listed inside the app (Open checks page): Crawford and Martin full texts, identical-by-descent claim, Kaidbey protection factors, peer-reviewed ISS result, gamma attenuation coefficient, Beleza and Pagani, NIST XCOM calculation.
- The PMC12631427 record is listed as "record to confirm" for the Motovilov radio and terahertz work.

## Capability gaps
- pmc.ncbi.nlm.nih.gov is not in this session's allowed network domains, so no full texts were read.

## Round 2 (same day)
- Owner supplied the Load Science logo image. Applied as the home-page hero (icons/logo-hero.jpg) and as the app icons (192, 512, maskable, apple-touch, favicon). Manifest colours set to the logo background #090107. Cache bumped to loadscience-v2. Same branch, PR #1188 still open and unmerged, main unchanged at a55523d (backup branch still matches).

## Round 3 (same day)
- Owner did not like the design: must resemble ACR Search and be dyslexia friendly. Redesigned /loadscience/ (index.html, style.css, app.js) on the same branch and PR #1188. ACR Search was only read, never edited. New: ACR Search dark and gold look, top bar with search and tag pills, feature cards, result cards with highlight, settings panel (text size, Dark or Cream, spacing, read aloud, refresh), tables turned into cards. Cache loadscience-v3.

## Round 4 (same day)
- Owner supplied a new icon pack and splash sheet (green and silver art, 1536x1024) and asked to trim it for the logo and splash page. Trimmed: big icon (square 396 px) to logo-hero.jpg and all app icons; splash panel (682x989) to icons/splash.jpg. Splash overlay added in app.js: once per session, skipped on deep links, tap anywhere or Get started. The Get started area is a transparent real button over the baked-in button. Cache loadscience-v4. Same branch and PR #1188.

## Round 5 (same day)
- Owner asked: make the site interactive, create a favicon, add innovative little-known melanin research, and give the splash page a Get started button.
- PR #1188 (v3) and PR #1189 (v4: logo, icons, splash) are both merged. Round 5 is a fresh branch claude/loadscience-v5 from origin/main 923db623. Backup: backup/2026-11-03-loadscience-v4 at 923db623.
- Added: lesser-known research page (12 groups: inner-ear melanocytes and hearing, vitamin D binding protein, fossil melanosomes, feather structural colour, heart melanocytes, neuromelanin MRI, fungal melanin and MelLec, light-driven radical, hair graying, melanin battery anode, polydopamine, melanin water splitting). Every item tagged; items seen only through summaries are tagged SECONDARY.
- Added interactive tools: photon shielding explorer, spectrum explorer, claim check quiz, saved claims, glossary, Did you know card. New tag: CALCULATED.
- Favicon from the flask icon. Splash Get started button is now a real visible button.
- Nothing outside /loadscience/ was touched.

## Round 15 (same day, placed here so it merges cleanly beside the Round 7 rules PR)
PR #1195 merged by the owner (main 817183e1, cache v13). Owner gave the phrase and the direction: no Unverified tab, button or note anywhere. Backup of main: backup/2026-11-03-loadscience-v13 at 817183e1 (verified). Fresh branch claude/loadscience-v14, cache v14.
- The Unverified tag is gone from the tag set: no filter pill, no quiz button, no legend entry, no spectrum label. 28 cards and 41 table rows that carried it were removed (30 rows from the pasted-claims check in data7.js, the rest by a runtime filter at the end of data7.js). The two spectrum bands that carried it now read Not supported (microwave, X-ray), with the text "No melanin data found" and "No published coefficients".
- Pastes are unchanged on the pasted reports page. Not supported and Not in the text rows are still there.
- Tests updated for the removed rows; a new test checks no route, pill, quiz button or tooltip contains the word.
- Open: 4Q186 reject or hold; Damascus Document notes with repeated covenant; Yirmeyahu 38; blocked hosts.

## Round 14 (same day, placed here so it merges cleanly beside the Round 7 rules PR)
PR #1194 was merged by the owner (main f01319c8, cache v12). Owner gave the phrase and the rule: the claim column of every check row quotes the pasted sentence exactly. Backup of main: backup/2026-11-03-loadscience-v12 at f01319c8 (verified). Fresh branch claude/loadscience-v13, cache v13.
- All 126 check rows (Pastes 1 to 9, the government claims table, the later pasted sets table) now quote the pasted text exactly. Extra rows were added where one old row had covered two separate pasted sentences. A test confirms each claim column is found word for word in a paste. The supernatural-claims table is not from a paste and is unchanged.
- Check results (tags and what was found) are unchanged except where a row was split or merged.
- Open: 4Q186 reject or hold; Damascus Document notes with repeated "covenant" (needs edit ACR reader and approval of the list); Yirmeyahu 38 note difference; blocked hosts.

## Round 13 (same day, placed here so it merges cleanly beside the Round 7 rules PR)
Owner gave the phrase and set the rule: pasted text is not rephrased, softened or summarised. Same open PR #1194, cache v12. Backup of main unchanged: backup/2026-11-03-loadscience-v9 at a86d5ec7.
- Pasted reports page now holds nine pastes exactly as pasted (Paste 8: institutions, APOL1, minerals, fail-safe; Paste 9: Kavod, mountain fortresses). Earlier version dropped a part pasted twice and two invisible characters; both are now kept. Only the owner's own instruction lines are left out. A test checks every line over 40 characters of all nine pastes, with the invisible characters kept.
- Claims page: check groups for Paste 8 and Paste 9. New rows quote the pasted claim in the owner's words. Older rows (Pastes 1 to 7) shorten the claim in the first column; the full text is on the pasted reports page.
- Found, not changed: the Damascus Document critical notes (data/file_96, 97, 98, plus a few in 38, 77, 85, 86, 111) have the word covenant repeated inside sentences. Needs "edit ACR reader" and the owner's approval of the exact list first.
- Open: 4Q186 reject or hold; Yirmeyahu 38 note difference; blocked hosts for full texts.

## Round 12 (same day, placed here so it merges cleanly beside the Round 7 rules PR)
Owner gave the phrase and asked that every pasted report be kept so nothing is lost. Same open PR #1194 (not merged), cache v11. Backup for main already exists: backup/2026-11-03-loadscience-v9 at a86d5ec7.
- data7.js: new page "Your pasted reports, word for word" with all seven pastes in full (PASTED tag; request lines omitted, two invisible marker characters removed, the part pasted twice shown once). A test checks that every line over 40 characters from each paste is present.
- Claims page: row-by-row check for each paste (about 70 rows), grouped by paste. New searches this round: Meredith and Riesz 2004 (99.9 percent), insect cuticle sclerotization, 4Q186 script (Geller), 1 Enoch 106 light imagery, Selig buying power, BLS workforce shares, phytoplankton sunscreens.
- app.js: PASTED label and sideways-scrolling diagram cards. explore.js: PASTED left out of the quiz.
- Owner decision still open: 4Q186 reject or hold; nothing added to the Reader.

## Round 11 (same day, placed here so it merges cleanly beside the Round 7 rules PR)
Owner gave the phrase for Load Science. Backup: backup/2026-11-03-loadscience-v9 at a86d5ec7 (verified against origin/main). Cache v10.
- Added data6.js: plain-words cards after the headline findings (dark skin, skin, gamma, photon, start), limits moved to one end-of-page block on dark skin and start, gamma "weak photon stopping" card replaced with the calculated numbers, 2007 wording refined (4-fold NADH capacity, 3-fold 14C-acetate).
- Added the missing findings: Turick 2011, 318 S/cm (copper about 190,000 times higher), Nature Communications 2025 EMI, DEVCOM CBC release, ESA/DLR abstract, hydration range (8 orders), Mostert doubt, Gichon (Bereshit 2:13), Shemot 34:29-35 with ACR's note, 4Q186 check.
- Metal binding numbers added (squid melanin 95 percent Cd and Pb at 2 mM; P. stutzeri capacities; orders differ by melanin type). Cr(VI) squid-ink figure, 97 percent, hard-soft acid-base and irreversible binding: UNVERIFIED.
- Claims check rows added for the Uncompromised Architecture paste and later sets.
- Open for the owner: 4Q186 reject or quarantine (not in ACR, nothing added); Yirmeyahu 38 [DSS] vs [ORIT GE'EZ] note difference; style check before the remaining pages get plain-words cards; hosts to allow (pmc, pubmed, projectbiodiversify, en.wikipedia.org) so primary papers can be read.

## Round 10 (same day, placed here so it merges cleanly beside the Round 7 rules PR)
- Owner pasted a claims summary (with a PMC5132026 link) and then said "edit Load Science, but first check the reports". The reports were re-checked first (the deep research report and the claims check). Corrections found and applied: Diop's birth year was dropped (it was not in any tool result); the Fajuyigbe comparison is worded as the paper's title words it (extreme skin types) because the comparison group was not confirmed; the Springer review is cited by DOI only (journal and year were inferred from the DOI); the earlier "eight of thirteen" tally in the claims reply is not used; the 454 keV crossing was computed to the keV. The earlier search summary that called the Army topic "the reverse" of the pasted claim was wrong: same direction, bigger gap.
- Scope applied: all items in both reports. Added on the same branch and PR #1193 (still open): data5.js with the Dark skin and melanin at full strength page, the Overlooked scientists page, genetic diversity (Tishkoff 2009, Popejoy and Fullerton 2016), per-gram melanin against lead on the photon page, government and space programs on the gamma page (NASA Glenn PNAS 2025, NRL Artemis I, Army STTR A19B-T010), electronics additions, water-splitting claim record, and a row-by-row check of the pasted claim set on the claims page. Three old lines were corrected (SPF line, space station item, attenuation coefficient line). Cache loadscience-v9. Backup: backup/2026-11-03-loadscience-v7 at 18172045 (main unchanged).
- Not confirmed and shown as such: full texts (pmc, pubmed and projectbiodiversify hosts are blocked here); Cobb 1956 details (secondary summary); Diop's measurements and whether his report is in the 1978 UNESCO proceedings; the PMC5132026 article (not opened); the metal-doped eumelanin attenuation study PMC11902467 (not opened); the 2019 to 2023 SEER rates (secondary); Montagna and Carlisle 1991 findings.
- Still waiting: the easy-words and Melanin for kids round (needs a fresh phrase).

## Round 9 (same day, placed here so it merges cleanly beside the Round 7 rules PR)
- Owner direction: "No downplaying the significance of the melanin findings or dark skin findings." A read-only scan of Load Science wording found 7 places that shrink a finding (list given to the owner, nothing changed). Owner then gave the phrase "edit Load Science" in answer to that list. Scope applied: items 1 to 7 as listed. The optional genetic-diversity addition (Tishkoff 2009, Popejoy and Fullerton 2016) was NOT applied; it needs its two citations verified first.
- Built on branch claude/loadscience-v8 from origin/main 18172045 (PR #1192 merged, cache v7 live). Backup: backup/2026-11-03-loadscience-v7 at 18172045. Cache loadscience-v8.
- Changed wording: barrier finding, mouse gamma survival, photon explorer sentence, superconductor claims row (conduction called a real and significant finding, with the transistor), ordered-sheets row, hearing study card (now tagged Verified, "One study. Not settled" removed), UV fact in three places (Black skin named first: lets through about one fifth of the UV).
- Standard written into loadscience/README.md: lead with the result, limit second and once, no only, just, merely or ordinary, tags never rank importance.
- Not done: the easy-words and Melanin for kids round (owner chose main pages first). It needs a fresh phrase. The other service's research report has not arrived.

## Round 8 (same day, placed here so it merges cleanly beside the Round 7 rules PR)
- Owner gave the phrase "edit Load Science" and asked: add the photon calculation and supernatural claims pages. Order followed: phrase, backup (backup/2026-11-03-loadscience-v6 at c80b0b45, matches origin/main), no-break check, change, merge link.
- Built on branch claude/loadscience-v7 from origin/main c80b0b45 (PR #1190 merged; PR #1191, the rule 8 change, still open). Cache loadscience-v7.
- New: data4.js. Photon calculation page (tables for melanin as three unit formulas, cellulose, water and lead at seven energies, half-value layers at three assumed densities, a log-log chart, the patent check, the meaning for the mouse results, still-to-do). Supernatural claims page (unexplained science with sources, microwave and ultrafast gaps, a claims table with claimants, the pineal gland, a pointer to the ancient texts page, a space for the owner's reading). Pointers added on the gamma and claims-with-no-source pages. 14 sources added.
- Calculated numbers come from the Elam tables (xraydb 4.5.8), not NIST XCOM (host returned 403). The table values were regenerated from the calculation, and a test checks the page table against the explorer data at all seven energies.
- Owner's reading on the supernatural claims page is still empty by design. It needs the owner's words and the source they rest on.

## Round 6 (same day)
- Owner asked: tie the melanin research to the DSS and Orit, pre-Rabbinic, pre-Christian ACR Reader and ACR2 texts; add a refresh circle that refreshes only Load Science.
- Still on branch claude/loadscience-v5 and PR #1190 (open and unmerged when checked). Cache loadscience-v6.
- ACR Reader and ACR2 were READ ONLY (data/file_N.json converted to plain text in scratch). No Reader or ACR2 file was edited. Rule 8 phrases were not needed for reading.
- New page "Ancient texts and the research" (data3.js, 49 cards). 33 quotations, each checked by script against the ACR files; none missing. Findings: ACR's own [ORIT GE'EZ] note on Yirmeyahu 13:23 uses the word melanin (the only occurrence in all ACR Reader and ACR2 data files); Shir HaShirim 1:5-6 pairs dark skin with the sun; Iyov 30:30, Eikha 4:8 and 5:10 pair black skin with heat and famine; Bereshit 10:6 names Kush, Mitzrayim, Put and Kena'an; Orit notes on Tehillim 68:31, Yesha'yahu 18:7, Tzefanyah 3:10, Amos 9:7 and Yirmeyahu 38 place Kush in the northeast African corridor.
- ACR2 items are tagged Held under warning and are not used as evidence: the Animal Apocalypse colour allegory (black bull with Yefet), the Birth of Noah (4Q534) and Chanokh site chapter 71 newborn descriptions.
- For the owner's decision (nothing changed in the Reader): the Yirmeyahu 38 [DSS] note calls Eved-Melekh "a foreigner" and an outsider, while the [ORIT GE'EZ] note on the same chapter ties him to the same cultural geography as the Hebrew people; rule 16 treats the foreigner framing as the overlay.
- Not confirmed (shown as UNVERIFIED in the app): whether Shir HaShirim 1:5-6 is physically attested in 4QCant-a or 4QCant-b (ACR's note does not say); whether Yirmeyahu 13:23 is in the portions of 4QJer-a ACR's note describes (it discusses verses 1-11); the Hebrew wording for dark and skin (the ACR files for those books show English only).
- Refresh circle: top bar, 48 px, scoped. Tested: other sites' caches and a fake other-site service worker survive; only loadscience- caches deleted; only the /loadscience/ worker unregistered; saved claims kept.
