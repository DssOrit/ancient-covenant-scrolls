# Session Notes — 2026-07-14

## Current State (end of session)

- Latest commit on main: `954370b` (PR #624 squash merge — GESTUDY chapters)
- GreatE cache: `great-eraser-v20` — confirmed working on iPad
- GESTUDY cache: `gestudy-v22` — confirmed working, 14 chapters in Vol 3
- ACR Search cache: `acr-search-v157`
- Working branch: `claude/great-eraser-pwa-password-NPS0x` (session notes committed, nothing else uncommitted)
- All PRs merged. Branch can be treated as stale for next session — start fresh from main.

## Built Today

- **PR #617 — Signs in the Skies** (acr-search-v151)
  Sky signs (Yoel 2), Yehezkel 1 merkavah, Yeshayahu 34:4 / 1 Enoch 80 with current events context added to Final Days panel.

- **PR #618 — Sound, Frequency and the Final Days** (acr-search-v153)
  Full frequency section added to Final Days panel: YHWH's voice as physical force, shofar as final signal, final days earthquake, unexplained global booms, Havana Syndrome / Watcher Pattern, missing scientists (Tesla, GEC-Marconi historical + 2024-2026 cluster: Chavez / quantum superposition, Loureiro / plasma physics, McCasland / UAP+AFRL, Eskridge / anti-gravity, Reza, Maiwald), Schumann resonance anomalies.

- **PR #619 — Fix double-quote syntax error** (acr-search-v154)
  Append script left `</div></div>'' +` (two adjacent quote chars). Site would not open at all. Removed extra quote.

- **PR #620 — Fix unescaped apostrophes** (acr-search-v155)
  Seven apostrophes in the missing scientists section (`MIT's`, `military's`, `United States'`, `NASA JPL's`, `YHWH's` x2, `McCasland's`) were unescaped inside a JS single-quoted string. JS crashed on first bare apostrophe. Escaped all seven as `\'`.

- **PR #621 — Remove stray closing brace** (acr-search-v156)
  Append script added an extra `}` after `renderFinalDaysPanel`'s closing brace. Made the entire script block unparseable — no JS ran, Enter button completely unresponsive. `node --check` confirmed clean after removal.

## Outstanding / Blocking

- None. All sites confirmed working.

## Pending / Parked

- None carried forward from this session.

## Backups

- `backup/2026-07-14-v156` — SHA `9383798` — created earlier this session (ACR Search).
  Recovery: `git checkout backup/2026-07-14-v156`

Previous backups: `backup/2026-07-12-v144`, `backup/2026-07-11-v142`, `backup/2026-07-11-v141`, `backup/2026-07-08-pre-interactive`

## Capability Gaps This Session

- Cannot reach live `acrscrolls.com` directly to verify deployment — must rely on user confirmation.
- `raw.githubusercontent.com` or GitHub MCP `get_file_contents` can be used to verify main HEAD content if needed.

## Today's Commit Log

```
acb4c38 session notes: log GreatE/GESTUDY PRs #623-#624 and standing JS validation rule
0caa815 GESTUDY: add 9 chapters (CH112-CH120) to Vol 3 — matches GreatE update
977f799 GreatE: add 9 chapters (CH112-CH120) — 3 docs + Cities & Ports That Profited (PR #623)
1fe0bc1 ACR Search: Final Days guide entry in How to Use (acr-search-v157)
9383798 fix: remove stray brace — restore Enter button (acr-search-v156)
cc06f33 fix: escape apostrophes — restore Enter button (acr-search-v155)
6481060 Fix JS syntax error in Final Days panel — acr-search-v154
3e1a25e ACR Search: sound, frequency, booms and missing scientists section — acr-search-v153
11b53f6 ACR Search: sky signs section added to Final Days panel — acr-search-v151
```

## Built This Session (continued — GreatE + GESTUDY)

- **PR #623 — Great Eraser: 9 new chapters (CH112–CH120)** — merged to main SHA `977f799`
  Added to Vol 3 (`GreatE/index.html` embedded `var DATA` array). Append-only. SW bumped to `great-eraser-v20`.
  Content: Civilizational Record, Identity Erasure Apparatus, Named Institutions (Bank of England / Lloyd's / Barclays / Glasgow / Harvard / Brown / the Zong), Spanish American Cities (Cartagena / Lima / Mexico City / Veracruz), African Cities (Elmina / Gorée / Luanda / Cape Town), Cities & Ports That Profited — Britain / France / Netherlands & Caribbean / North America.

- **PR #624 — Great Eraser Study: same 9 chapters** — merged to main SHA `954370b`
  Added to `GESTUDY/data/app_data.json` Vol 3, converted to GESTUDY format. SW bumped to `gestudy-v22`.

- **Incident:** Site briefly appeared stuck on splash screen after PR #623 merged. Root cause: SW transition — old v19 still active on first open. Site self-resolved once v20 installed and activated. No code error.

## Standing Rule — LOCKED 2026-07-14

**JS validation before every push to `GreatE/index.html`:**

1. Extract the `<script>` block to a temp file
2. Run `node --check tempfile.js`
3. If it passes — push. If it fails — it shows the exact line number.

This catches all syntax errors (unclosed strings, extra braces, bad escapes) before they reach the live site. Applies to any session that touches `GreatE/index.html`. Same rule already applies to `Search/index.html` from PRs #619–#621.

## Note for Next Session

- GreatE data is embedded in `var DATA` on line 298 of `GreatE/index.html` — NOT in the external `data/vol*.json` files (stale).
- GESTUDY data is in `GESTUDY/data/app_data.json` (external, precached by SW). Chapter format: `{num, title, id, content:[blocks]}`.
- Run `node --check` on the extracted script block before any push to `GreatE/index.html`.
