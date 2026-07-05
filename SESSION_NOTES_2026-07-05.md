# Session Notes — 2026-07-05

## Current state

- Branch: `claude/acr-search-content-checklist-ZgUAQ`
- Latest main commit: `9f514a5` — Search: update How to Use guide (acr-search-v109) — PR #555 merged
- Working tree: clean

## Built today (and late 2026-07-04 continuation)

### PR #553 — merged (SHA 92ec382)
Useful Tools hub: single "Useful Tools" nav pill housing 5 sub-tools, all data from DSS and Ge'ez Orit. No Rabbinic, no Christian sources.

- **Covenant Promises** — 18 covenant promises with source reference, recipient, category, text. Tap a promise to search for it.
- **Hebrew Names** — 31 names with paleo-Hebrew glyph (where applicable), name, transliteration, meaning.
- **Lineage Explorer** — 3 ancestral lines (Shem / Africa / Israel in Egypt) with chain of descent and tribe lists.
- **Mo'edim** — 8 appointed times: timing, description, scripture refs.
- **Event Timeline** — 10 eras with events sourced from DSS/Orit.
- `Search/index.html` — all new views + nav pill
- `Search/sw.js` — cache bumped to acr-search-v108
- `CLAUDE.md` — Rule 13 (Source Integrity) locked

### CLAUDE.md additions locked
- **Rule 13 — Source Integrity (locked 2026-07-04):** All content must draw exclusively from pre-Rabbinic, pre-Christian primary sources (DSS, Ge'ez Orit). Does NOT restrict features that expose, document, or critique manipulation.
- **Cloudflare Infrastructure section:** All ACR sites served through Cloudflare CDN from repo. Images/clips load fast globally. Documentary/long-form video = Cloudflare Stream. SW handles core app; rich media is Cloudflare-delivered.

### Search/images/ folder created (not yet integrated into HTML)
PR #554 — merged. 4 images committed to `Search/images/`. User paused integration: "Let's wait & I will think on it as a later addition."

- `ancient-hebrew-evidence.png` (3.2MB) — dark Ramesses/Herodotus/Beni Hassan composite
- `haplogroup-e-m2-distribution.png` (2.2MB) — haplogroup distribution map
- `qumran-cave4-similitudes.png` (2.7MB) — cave 4 DSS image
- `ramesses-herodotus-benihasan.png` (3.3MB) — colorful Ramesses/Herodotus/Beni Hassan composite

Planned placements when user is ready:
- `qumran-cave4-similitudes.png` → Suppressed section header
- `ancient-hebrew-evidence.png` + `ramesses-herodotus-benihasan.png` → Hebrew DNA section
- `haplogroup-e-m2-distribution.png` → Hebrew DNA section

### Documentary image prompt script
90 image prompts across 16 sections for user to feed into ChatGPT (DALL-E 3) to generate a documentary on ACR Search content. Delivered as rendered HTML with copy buttons. Saved in session scratchpad. NOT committed to repo.

Sections covered:
1. Creation & Eden (1-7)
2. The Watchers & Pre-Flood World (8-12)
3. Noakh & the Flood (13-16)
4. The Patriarchs (17-24)
5. Egypt & the Exodus (25-32)
6. Sinai & the Wilderness (33-36)
7. Judges & the Kingdom (37-40)
8. The Prophets (41-44)
9. Captivity & the Diaspora (45-48)
10. The Dead Sea Scrolls (49-56)
11. African Hebrew Identity — The Evidence (57-63)
12. What Was Hidden — Suppressed Texts (64-68)
13. The NT Manipulation Exposed (69-76)
14. The Rabbinic & Masoretic Overlay (77-80)
15. The Covenant Standing (81-87)
16. The Conclusion (88-90)

All Hebrew/Israelite figures depicted as dark-skinned Africans. No video — images only.
Also delivered as plain text file (`acr-documentary-prompts.txt`) for direct use on iPad.

### PR #555 — merged (SHA 9f514a5)
How to Use guide updated — three features from last week had no guide coverage.

- **Volume Browser section** — added step 4 documenting the Chronological Reading Order gold pill: era-grouped panel, tap to jump to a volume directly. Audio text also updated.
- **Paleo Alphabet** — new guide section added (after Hebrew Roots): 4 steps covering the 22-letter script, full-row copy strip, individual letter cards, font details, and a note on why DSS scribes used paleo script for the divine name even in square-script documents.
- **Useful Tools** — new guide section added (before ACR Suite): 6 steps covering all 5 sub-tools — Covenant Promises, Hebrew Names, Lineage Explorer, Mo'edim, Event Timeline.
- All three sections have working speaker/audio text.
- `Search/sw.js` — cache bumped to acr-search-v109

## Outstanding / blocking

- Image integration into HTML pending (user decision: "later addition")
- 183 total images the user has — no final hosting workflow established (R2 requires credit card; GitHub web UI rejected large files). Workflow when ready: share images in conversation in batches → I sort which fit → compress → commit.
- Documentary prompt script sitting in scratchpad only — user may want it committed to repo as a reference.

## Pending / parked

- Any further divine name sweeps (Most High usage, El prefixes in place names)
- Ba'al-Zevuv "Lord of the Flies" — left as-is by user approval (Lord = translation of Ba'al, a pagan name)
- 183-image hosting solution — no urgency, user is thinking

## Capability gaps this session

- `dssorit.github.io` blocked — use `raw.githubusercontent.com` to verify deployed content
- No `gh` CLI — use GitHub MCP tools for all PR operations
- Cloudflare R2 requires credit card even on free tier — not currently viable
- Cannot read images hosted on external URLs (only repo images via Read, or conversation-shared images)

## Today's commit log

```
9f514a5 Search: update How to Use guide — Paleo Alphabet, Useful Tools, Chron Order (acr-search-v109) [PR #555]
49952e6 docs: session notes 2026-07-05
7979f41 Search: add 4 reference images for DNA and Suppressed sections
9576aa4 Search: create images folder
3b5cea4 docs: record Cloudflare as permanent infrastructure layer
92ec382 Search: Useful Tools hub — 5 new tools + Rule 13 source integrity (acr-search-v108) [PR #553]
0715d34 Prophetic Watch brief 2026-07-05
30b11a4 Search: fix chron order vol numbers + add Paleo-Hebrew Alphabet (acr-search-v107) [PR #552]
```

## Backups

No user-confirmed stable milestone this session — user has not yet verified the Useful Tools build on device. Create backup branch once user confirms working.

Last known backup: see SESSION_NOTES_2026-07-01.md.

## Divine name rule (locked)

Only YHWH (or 𐤉𐤄𐤅𐤄) and Creator/The Creator. No Lord, Adonai, Elohim, or capital-G God as divine name. Lowercase god allowed for pagan/false claims. Applies to verse text and commentary.
