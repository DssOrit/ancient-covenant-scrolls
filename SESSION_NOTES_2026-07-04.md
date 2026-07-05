# Session Notes — 2026-07-04

## Current state

- Branch: `claude/acr-search-content-checklist-ZgUAQ` (synced to `origin/main`)
- Latest main commit: `30b11a4` — Search: fix chron order vol numbers + add Paleo-Hebrew Alphabet (acr-search-v107)
- Working tree: clean (post-merge)

## Built today

### PR #551 — merged (SHA 3dc79a0) — carried over from 2026-07-03 session
Added a "Chronological Reading Order" gold pill to the Volume Browser section in ACR Search. Tapping it expands a panel grouping all volumes by era, each tappable to jump to that volume.

- `Search/index.html` — pill, panel HTML, CSS, JS (`CHRON_ORDER` array + `toggleChronOrder()`)
- `Search/sw.js` — cache bumped to acr-search-v105

### PR #552 — merged (SHA 30b11a4)
Two fixes in one PR:

**Fix 1 — Chronological order volume numbers corrected**
- `CHRON_ORDER` array was using internal file numbers (1–113) instead of concordance vol numbers (1–48), causing "Volume 114, 0 passages" when any entry was tapped.
- All vol numbers replaced with correct concordance values (1–48).
- `Search/sw.js` — cache bumped to acr-search-v106

**Fix 2 — Paleo-Hebrew Alphabet view added**
- New "Paleo Alphabet" pill added to the nav bar (between Hebrew Roots and Hebrew DNA).
- Dedicated `#alphabet-view` with all 22 paleo-Hebrew letters.
- Full-row strip at top showing all 22 glyphs — tap to copy all.
- 22 individual letter cards — each shows glyph (large), letter name, transliteration — tap to copy that glyph.
- Glyph font: `"Segoe UI Historic","Noto Sans Phoenician",serif` (already present in app).
- `Search/sw.js` — cache bumped to acr-search-v107

## Outstanding / blocking

- Nothing blocking. All sites intact and deployed.

## Pending / parked

- Any further divine name sweeps (Most High usage, El prefixes in place names) — not yet requested.
- Remaining "Lord" edge case: file_38 Ba'al-Zevuv — Lord of the Flies — left as-is per user approval (Lord is the translation of Ba'al, a pagan name).

## Capability gaps this session

- Cannot fetch live deployed site (dssorit.github.io blocked). Use raw.githubusercontent.com to verify deployed content.
- No `gh` CLI — use GitHub MCP tools (`mcp__github__*`) for all PR operations.

## Today's commit log (on main)

```
30b11a4 Search: fix chron order vol numbers + add Paleo-Hebrew Alphabet (acr-search-v107)
3dc79a0 Search: Chronological Reading Order pill in Volume Browser
e82f488 rules: find-first approval + live session notes (locked 2026-07-03)
4f32a47 Reader: replace Lord with YHWH or Creator in verse text — 11 files
c3e1565 Reader: replace capital-G God with YHWH or Creator — word-level fixes only
93c26c0 Reader: remove all Lord/Adonai/Elohim substitutions — YHWH and Creator only
```

## Backups

No new backup branch created this session — no user-verified stable milestone was explicitly confirmed during the session. Last known backup: see SESSION_NOTES_2026-07-01.md.

Divine name rule (confirmed and locked from 2026-07-03 session):
Only YHWH (or 𐤉𐤄𐤅𐤄) and Creator/The Creator throughout. No Lord, Adonai, Elohim, or capital-G God as divine name. Lowercase god allowed for pagan/false claims. Applied to both verse text and commentary — user authorized.
