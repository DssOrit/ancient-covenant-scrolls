# Load Science

Offline-first iPad PWA. Melanin research with every claim tagged by how well it is verified.

- Path: `/loadscience/`
- Cache: `loadscience-v5` (goes forward only)
- Content: `data.js` (one file, ported from the research note dated 2026-11-03)
- Tags: VERIFIED, SECONDARY, UNVERIFIED, READING, NOT SUPPORTED, OPEN, CONFLICTING, HYPOTHESIS
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
