# Session notes 2026-11-03

## Current state
- Branch claude/loadscience-v1 from origin/main a55523d (cache on main: loadsurvival-p142-v160).
- Backup pushed: backup/2026-11-03-loadsurvival-p142-v160 at a55523d224f3fd572b216811bea8ce7194f46926 (matches origin/main). Recovery: git checkout backup/2026-11-03-loadsurvival-p142-v160.

## Built today
- Melanin research note (scratchpad, not in repo): UV, DNA, barrier, neuromelanin, African pigmentation genetics, full electromagnetic spectrum, gamma, electronics. Every item tagged VERIFIED, SECONDARY, UNVERIFIED, READING, NOT SUPPORTED, OPEN, CONFLICTING or HYPOTHESIS.
- New app Load Science at /loadscience/ (cache loadscience-v2): the research note as an offline-first iPad PWA. Files: index.html, style.css, data.js, app.js, sw.js, manifest.webmanifest, icons, README.md. New folder only; no existing site was touched.

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
