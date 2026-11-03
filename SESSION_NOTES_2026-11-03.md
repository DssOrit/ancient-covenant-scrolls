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

## Round 6 (same day)
- Owner asked: tie the melanin research to the DSS and Orit, pre-Rabbinic, pre-Christian ACR Reader and ACR2 texts; add a refresh circle that refreshes only Load Science.
- Still on branch claude/loadscience-v5 and PR #1190 (open and unmerged when checked). Cache loadscience-v6.
- ACR Reader and ACR2 were READ ONLY (data/file_N.json converted to plain text in scratch). No Reader or ACR2 file was edited. Rule 8 phrases were not needed for reading.
- New page "Ancient texts and the research" (data3.js, 49 cards). 33 quotations, each checked by script against the ACR files; none missing. Findings: ACR's own [ORIT GE'EZ] note on Yirmeyahu 13:23 uses the word melanin (the only occurrence in all ACR Reader and ACR2 data files); Shir HaShirim 1:5-6 pairs dark skin with the sun; Iyov 30:30, Eikha 4:8 and 5:10 pair black skin with heat and famine; Bereshit 10:6 names Kush, Mitzrayim, Put and Kena'an; Orit notes on Tehillim 68:31, Yesha'yahu 18:7, Tzefanyah 3:10, Amos 9:7 and Yirmeyahu 38 place Kush in the northeast African corridor.
- ACR2 items are tagged Held under warning and are not used as evidence: the Animal Apocalypse colour allegory (black bull with Yefet), the Birth of Noah (4Q534) and Chanokh site chapter 71 newborn descriptions.
- For the owner's decision (nothing changed in the Reader): the Yirmeyahu 38 [DSS] note calls Eved-Melekh "a foreigner" and an outsider, while the [ORIT GE'EZ] note on the same chapter ties him to the same cultural geography as the Hebrew people; rule 16 treats the foreigner framing as the overlay.
- Not confirmed (shown as UNVERIFIED in the app): whether Shir HaShirim 1:5-6 is physically attested in 4QCant-a or 4QCant-b (ACR's note does not say); whether Yirmeyahu 13:23 is in the portions of 4QJer-a ACR's note describes (it discusses verses 1-11); the Hebrew wording for dark and skin (the ACR files for those books show English only).
- Refresh circle: top bar, 48 px, scoped. Tested: other sites' caches and a fake other-site service worker survive; only loadscience- caches deleted; only the /loadscience/ worker unregistered; saved claims kept.
