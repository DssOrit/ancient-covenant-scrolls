# Load Science

Offline-first iPad PWA. Melanin research with every claim tagged by how well it is verified.

- Path: `/loadscience/`
- Cache: `loadscience-v14` (goes forward only)
- Content: `data.js` (one file, ported from the research note dated 2026-11-03)
- Tags: VERIFIED, SECONDARY, READING, NOT SUPPORTED, OPEN, CONFLICTING, HYPOTHESIS
- VERIFIED means abstract or summary level. Full texts were not read.
- Hard refresh is scoped to this app only (prefix `loadscience-`, scope `/loadscience/`).
- Design follows ACR Search: dark ground and gold accent, top bar with search box and tag pills, feature cards with a gold left edge, result cards.
- Dyslexia-friendly: Arial, 20 px default with A-/A+ (18 to 32), left-aligned, 1.8 line height, extra letter and word spacing (Wide option), no italics, no justified text, no tables (rows are cards), 44 px or larger touch targets, Dark and Cream colour options, read aloud, search with highlight. Every tag is a word, never colour alone.

To add or change a claim, edit `data.js`, then bump the cache name in `sw.js` and the `version` field in `data.js` together.

Logo and splash: trimmed from the owner-supplied icon and splash sheet. `icons/logo-hero.jpg` (home page), the app icons, and `icons/splash.jpg` (launch screen, shown once per browser session, tap anywhere or Get started to continue, skipped on deep links). The sheet was 1536 x 1024, so the 512 px icon is the 396 px source scaled up.

## Interactive tools (explore.js, data2.js)
- Photon shielding explorer: energy and thickness sliders, melanin, cellulose, water and lead. Calculated from the Elam tables (xraydb 4.5.8) summed by element mass fraction, log-log interpolation. Not NIST XCOM. Melanin density 1.3, 1.5 or 1.7 is an assumption.
- Spectrum explorer: step from radio to gamma. Each band shows its status tag and the related claims.
- Claim check: ten-claim rounds, guess the tag.
- Saved claims: stored in localStorage on the device, copy as text.
- Glossary: plain-word science terms.
- Did you know: quick facts on the home page.
- Lesser-known research page: 12 groups of findings, each tagged and linked.

Favicon: `favicon.ico` (16, 32, 48) and PNGs in `icons/`, from the flask icon on the owner's sheet.
Splash: a real, visible Get started button covers the artwork's printed button.

## Ancient texts page (data3.js)
- Ties the melanin research to the ACR Reader (main record: DSS and Ge'ez Orit, before the Rabbinic and Christian layers) and to ACR2 (held under warning, documented as the later layer, never the baseline).
- Quotations use ACR's own wording and verse numbers, read from the ACR data files on 2026-11-03. Each is checked by script against those files. A "Where" line gives the volume and the data file.
- New tags: ACR text (quoted from the Reader), Held under warning (ACR2), Not in the text (searched, absent). A tie to the science is tagged Reading.
- The Reader and ACR2 were only read. No file in either site was changed.

## Refresh circle
- Round button at the top right. It deletes only caches named `loadscience-*`, unregisters only service workers whose scope contains `/loadscience/`, re-fetches this app's own files past the browser cache, and reloads. Saved claims and reading settings (localStorage) are kept. No other site's cache or worker is touched (locked rule 21).

## Photon calculation and supernatural claims pages (data4.js)
- Photon calculation page: tables of stopping per gram (melanin as three unit formulas, cellulose, water, lead) at seven energies, half-value layers at three assumed densities, a log-log chart, the patent check, and what the calculation means for the mouse results. Elam tables through xraydb 4.5.8, not NIST XCOM.
- Supernatural claims page: the unexplained science with sources, the measurement gaps (microwave, ultrafast), a claims table with claimants and findings, the pineal gland (melatonin is not melanin), a pointer to the ancient texts page, and a space for the owner's reading.

## Wording standard (2026-11-03, owner direction: no downplaying of melanin or dark-skin findings)
- Lead with the result. Put the limit second, stated once, and keep it only where the source states it (mice, observational, one study).
- Do not use only, just, merely or ordinary to shrink a finding. Tags say where a source was seen (Secondary). They never say how important a finding is.
- Dark skin is named first in comparisons (Black skin lets through about one fifth of the UV that reaches the upper dermis in Caucasian skin).

## Dark skin, overlooked scientists, genetic diversity, programs (data5.js)
- Dark skin and melanin at full strength: Fajuyigbe 2018 (8.0-fold overall, 59.0-fold basal layer), cancer incidence, the dose that reddens skin (MED) with the studies that disagree on size, eumelanin against pheomelanin, the acral melanoma findings stated plainly, oxidative stress as an open question, photoaging.
- Overlooked scientists: Jewel Plummer Cobb (1956 X-ray work on pigmented melanoma), Cheikh Anta Diop (melanin test, contested), Susan C. Taylor, McGinness, Corry and Proctor.
- Genes page: Tishkoff 2009 and Popejoy and Fullerton 2016. Photon page: per-gram melanin against lead (half of lead near 454 keV, 2.8 percent at 100 keV). Gamma page: the NASA Glenn space station flight (PNAS 2025), the NRL Artemis I experiment, the Army STTR topic. Claims page: a pasted claim set checked row by row.
- Both source reports were re-checked before this was written. Corrections made: Diop's birth year was dropped (not in any tool result), the Fajuyigbe comparison group is stated as the paper's title states it (extreme skin types), and the Springer review is cited by DOI only.

## Pasted reports page and claims check (data7.js, round 12)
- Page "Your pasted reports, word for word": the owner's nine pastes kept exactly as pasted with the PASTED tag, not reworded, softened or summarised. Only the owner's own request lines are left out. A part pasted twice is shown twice.
- The claims page now holds a row-by-row check for each paste, with a tag and what was found.
- PASTED does not rate the text. It is left out of the Claim check quiz.
- Diagrams in the pastes scroll sideways inside their card, so the page itself does not overflow.

- Claims check tables: the claim column quotes the owner's pasted sentence exactly (a test confirms each quote is found word for word in its paste). The other columns are the check.

- Round 15: the Unverified tag is removed from the whole site (no pill, quiz button, legend entry, card or row), by owner direction. Claims that carried it are removed from the claims tables; the pastes themselves are unchanged on the pasted reports page.
