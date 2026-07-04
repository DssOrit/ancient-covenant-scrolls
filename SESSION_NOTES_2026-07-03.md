# Session Notes — 2026-07-03

## Current state

- Branch: `claude/acr-search-content-checklist-ZgUAQ` (synced to `origin/main`)
- Latest main commit: `e82f488` — rules: find-first approval + live session notes (locked 2026-07-03)
- Working tree: clean

## Built today

Three PRs shipped and merged into main in this session:

### PR #547 — merged (pre-context, carried over from prior session)
- `data/file_5.json` — "O Adonai" x2 → YHWH (Shemot/Moshe passages)
- `data/file_23.json` — "Please, Adonai" → YHWH
- `data/file_24.json` — "O Adonai, please" → YHWH
- `data/file_44.json` — "O Adonai" x2 → YHWH (Yeshayahu 38)
- `data/file_45.json` — "Adonai has forgotten me" x2 → YHWH (Yeshayahu 49)
- `data/file_86.json` — 14 Adonai occurrences in Daniyel 9 → YHWH
- `data/file_40.json` — "mocked the Lord" → "mocked YHWH"
- `data/file_106.json` — "Praise the Creator of the Elohim of Knowledge" → "Praise YHWH the Creator of knowledge" (user-specified exact wording)
- Multiple files — all Elohim occurrences removed/replaced (files 1, 12, 26, 31, 65, 67, 106)

### PR #548 — merged (SHA c3e1565)
Capital-G God → YHWH or Creator across 16 data files. Word-level replacements authorized by user. Includes both verse text and commentary.

- `data/file_27.json` — "God do so to me" → "YHWH do so to me"
- `data/file_29.json` — "The covenant God who works through Khannah" → "The Creator" (verse + commentary)
- `data/file_42.json` — "the God of Yisra'EL" → "The Creator" (verse + commentary); header note updated
- `data/file_43.json` — "The covenant God will not share" → "The Creator" (verse + commentary)
- `data/file_57.json` — "I Am a God" → "I Am a god" (pagan king, lowercase — user approved; verse + commentary heading)
- `data/file_61.json` — "covenant God does not act" → "The Creator" (verse + commentary)
- `data/file_62.json` — 3x "covenant God" → "The Creator" (verse + commentary)
- `data/file_63.json` — 2x "covenant God" → "The Creator" (verse + commentary)
- `data/file_64.json` — 2x "covenant God" → "The Creator" (verse + commentary)
- `data/file_68.json` — "YHWH, God of My Salvation" → "YHWH, Creator of My Salvation" (verse + commentary heading)
- `data/file_69.json` — 2x "the God who" → "The Creator who" (verse + commentary)
- `data/file_84.json` — "covenant God of Avraham" → "The Creator of Avraham" (verse + commentary)
- `data/file_86.json` — "Above Every God" → "Above every god" (pagan context, lowercase — user approved; verse + commentary); Daniyel 9 "O Lord" x3 → "O YHWH" in commentary quotes
- `data/file_88.json` — "God-fearing" → "YHWH-fearing"
- `data/file_97.json` — header word-level fix
- `data/file_106.json` — "God of gods" → "Creator of creators"
- `data/file_93.json` — restored to origin/main (God occurrence was in commentary — untouched per rule)

### PR #549 — merged (SHA 4f32a47)
Lord → YHWH or Creator across 11 data files. Verse text targeted; commentary changes confirmed authorized by user.

- `data/file_13.json` — "Lord of the ages", "Lord of lords", "Lord of majesty" → YHWH (Chanokh)
- `data/file_14.json` — "Lord of Glory", "Lord of the sheep" x multiple (Animal Apocalypse) → YHWH
- `data/file_15.json` — "the holy Lord", "the Lord bade" → YHWH (Chanokh Epistle)
- `data/file_34.json` — "the Ark of the Lord YHWH" → "the Ark of the Creator YHWH"
- `data/file_42.json` — 12 verse blocks "Lord YHWH of hosts" etc → Creator
- `data/file_43.json` — 5 verse blocks "Lord YHWH of hosts" etc → Creator
- `data/file_44.json` — 4 verse blocks "Lord YHWH" etc → Creator
- `data/file_45.json` — 8 verse blocks "Lord YHWH", "your Lord, YHWH" → Creator; commentary quote "my Lord" → YHWH (authorized)
- `data/file_46.json` — 5 verse blocks "Lord YHWH of hosts", "Spirit of the Lord YHWH" → Creator
- `data/file_85.json` — "Lord of kings" → "Creator of kings", "Lord of heaven" → "YHWH of heaven" (Daniyel)
- `data/file_107.json` — "the great Lord", "name of the Lord" → Creator (Genesis Apocryphon)

## Divine name rule (confirmed this session)

Only YHWH (or 𐤉𐤄𐤅𐤄) and Creator/The Creator are used throughout. No Lord, Adonai, Elohim, or God (capital-G as divine name). Lowercase god allowed for pagan/false claims. Applied to both verse text and commentary/notes — user confirmed authorized.

Exceptions left in place (not changed):
- "Ba'al-Zevuv — Lord of the Flies" (file_38) — Lord is the translation of Ba'al, a pagan name
- "Lord" occurrences inside commentary that were NOT in scope of any scan

## Outstanding / blocking

- User asked to verify no unauthorized commentary changes — confirmed all Creator/YHWH substitutions in commentary are authorized per user direction this session.
- ACR Reader app files (index.html, acr.css, sw.js, content/) — verified untouched throughout session.
- Files 105, 108, 109 — verified identical to pre-session state (commentary fully intact).
- file_93.json — restored to origin/main state (commentary intact).

## Pending / parked

- Remaining "Lord" scan: file_38 Ba'al translation left as-is per user approval.
- Any further divine name sweeps (e.g. "Most High" usage, "El" prefixes in place names) not yet requested.

## Capability gaps this session

- Cannot fetch live deployed site (dssorit.github.io blocked). Use raw.githubusercontent.com to verify deployed content.
- No `gh` CLI — use GitHub MCP tools (`mcp__github__*`) for all PR operations.

## Today's commit log (on main)

```
e82f488 rules: find-first approval + live session notes (locked 2026-07-03)
4f32a47 Reader: replace Lord with YHWH or Creator in verse text — 11 files
c3e1565 Reader: replace capital-G God with YHWH or Creator — word-level fixes only
93c26c0 Reader: remove all Lord/Adonai/Elohim substitutions — YHWH and Creator only
```

### PR #550 — merged (SHA e82f488)
- `CLAUDE.md` — two new locked rules added:
  - Rule 11: Find first, report findings, wait for approval, then fix only what was approved
  - Rule 12: Session notes are live documents — update after every PR, scan, approval, and direction change

## Backups

No new backup branch created this session (no user-verified stable milestone reached). Last known backup: see SESSION_NOTES_2026-07-01.md.
