# Load Science

Offline-first iPad PWA. Melanin research with every claim tagged by how well it is verified.

- Path: `/loadscience/`
- Cache: `loadscience-v1` (goes forward only)
- Content: `data.js` (one file, ported from the research note dated 2026-11-03)
- Tags: VERIFIED, SECONDARY, UNVERIFIED, READING, NOT SUPPORTED, OPEN, CONFLICTING, HYPOTHESIS
- VERIFIED means abstract or summary level. Full texts were not read.
- Hard refresh is scoped to this app only (prefix `loadscience-`, scope `/loadscience/`).
- Reading aids: text size, read aloud, left-aligned text, wide line spacing, tag shown as a word and a border style, never colour alone.

To add or change a claim, edit `data.js`, then bump the cache name in `sw.js` and the `version` field in `data.js` together.
