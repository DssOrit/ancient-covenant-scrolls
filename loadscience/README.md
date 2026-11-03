# Load Science

Offline-first iPad PWA. Melanin research with every claim tagged by how well it is verified.

- Path: `/loadscience/`
- Cache: `loadscience-v3` (goes forward only)
- Content: `data.js` (one file, ported from the research note dated 2026-11-03)
- Tags: VERIFIED, SECONDARY, UNVERIFIED, READING, NOT SUPPORTED, OPEN, CONFLICTING, HYPOTHESIS
- VERIFIED means abstract or summary level. Full texts were not read.
- Hard refresh is scoped to this app only (prefix `loadscience-`, scope `/loadscience/`).
- Design follows ACR Search: dark ground and gold accent, top bar with search box and tag pills, feature cards with a gold left edge, result cards.
- Dyslexia-friendly: Arial, 20 px default with A-/A+ (18 to 32), left-aligned, 1.8 line height, extra letter and word spacing (Wide option), no italics, no justified text, no tables (rows are cards), 44 px or larger touch targets, Dark and Cream colour options, read aloud, search with highlight. Every tag is a word, never colour alone.

To add or change a claim, edit `data.js`, then bump the cache name in `sw.js` and the `version` field in `data.js` together.

Logo: `icons/logo-hero.jpg` (home page) and the app icons are made from the owner-supplied Load Science logo.
