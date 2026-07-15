# Session Notes — 2026-07-15

## Current State

- Latest commit on main: `3d85f49` (PR #633 squash merge)
- Cache: `acr-search-v168`, `acr-solar-v22`
- Branch: `claude/acr-search-content-checklist-ZgUAQ` (PR #633 merged, stale)
- ACR Search: Final Days panel now includes Dani'el 7:25 / DST section (v168)
- ACR Solar: true solar time fix live (v22)
- Nothing uncommitted

## Built Today

- **PR #633 — Dani'el 7:25 / DST in Final Days + ACR Solar true solar time** (acr-search-v168 / acr-solar-v22)

  *ACR Search — Final Days panel:*
  New five-item section "Dani'el 7:25 in the Present Era — Changing the Appointed Times by Law" inserted inside the 364-Day Covenant Calendar block, before Yirmeyahu 30-31.
  1. Dani'el 7:25 (DSS confirmed, 4QDan-a/b/c) — moadim defined, fourth beast = Rome, act is not only historical.
  2. Full legal sequence: Constantine Sunday edict 321 CE; Gregorian calendar Inter gravissimas 1582; standard time zones 1880s (first clock/sun disconnect); DST 1916/1918 Germany/UK/US.
  3. What DST IS — government decree advancing the civil clock one hour from true solar time. Sun position unchanged. Clock changed.
  4. Permanent DST — Sunshine Protection Act, US Senate unanimous 2022. Removes the twice-yearly fall-back correction, making the substitution invisible and permanent.
  5. Covenant community position — Bereshit 1:14 anchors moadim to the sun; ACR Solar shows true solar time; gap between ACR Solar and government clock during DST is the government offset made visible.

  *ACR Solar — true solar time fix:*
  - `getSunTimes(date, lat, lon)` now accepts 4th parameter `utcOffset`.
  - When `utcOffset` is provided, uses it directly (no DST contamination).
  - When `utcOffset` is undefined (old localStorage data), falls back to January standard-offset calculation to strip DST.
  - Default Coimbra location: `utcOffset: 0` (Portugal WET = UTC+0 standard).
  - GPS success: `utcOffset` computed from January standard offset (strips DST).
  - GPS fallback and `resetLocation()`: `utcOffset: 0`.
  - All 4 `getSunTimes` call sites updated (renderSunView, scheduleAlerts, Shabbat sat/sun).
  - "True Solar Time" note added below sun widget — explains times shown are actual solar position, not government clock.
  - Dani'el 7:25 educational panel added — full time-change sequence, Bereshit 1:14 anchor, how ACR Solar relates to the offset.
  - CSS classes added: `.solar-true-note`, `.solar-dst-panel` and children.

## Outstanding / Blocking

- User to verify ACR Search Final Days panel: Dani'el 7:25 section appears after the 1 Enoch 72-82 item and before Yirmeyahu 30-31.
- User to verify ACR Solar: "True Solar Time" note and Dani'el 7:25 panel appear below the sun widget. Times shown should NOT match government clock during DST.
- User to confirm Great Eraser opens (splash auto-dismisses within 2 seconds) — from earlier session, not yet confirmed.
- User to verify Covenant Table section renders on iPad (ACR Search, Orit Record tab) — from prior session, not yet confirmed.

## Pending / Parked

- None from this session.

## Capability Gaps This Session

- Cannot reach live `acrscrolls.com` directly to verify deployment — must rely on user confirmation or `raw.githubusercontent.com`.
- GitHub MCP `get_file_contents` can confirm main HEAD content if needed.

## Locked Rules Applied This Session

- Rule 0 (no Western/European bias): all content presented on its own terms.
- Rule 1 (no narration during build): silent build, single end-of-build summary.
- Rule 9 (merge requires user confirmation): PR #633 waited for explicit "Merge".
- Rule 13 (source integrity): DST content anchored in Dani'el 7:25 (DSS), Bereshit 1:14 (DSS).
- No-hedging rule: DST stated directly as government substitution of the moadim, no softening.
- No-glossing rule: primary source requirements stated explicitly.

## Backups

- `backup/2026-07-15-v168` — SHA `3d85f49` — end of session, Dani'el 7:25/DST content and Solar true time fix verified merged.
  Recovery: `git checkout backup/2026-07-15-v168`

Previous backups: `backup/2026-07-14-v167`, `backup/2026-07-14-v21`, `backup/2026-07-14-v156`, `backup/2026-07-12-v144`, `backup/2026-07-11-v142`

## Today's Commit Log

```
3d85f49 Search: DST/Dani'el 7:25 in Final Days; Solar: true solar time fix (v168/v22) (#633)
31214a9 Prophetic Watch brief 2026-07-15
25a129a Add Nevelah/Treifah sourcing item; rewrite Modern Practice (v167) (#632)
```

## Note for Next Session

- ACR Solar `getSunTimes` now accepts `utcOffset` as 4th parameter. Old localStorage location data (no utcOffset field) falls back to January standard-offset calculation automatically.
- If a user is in the Southern Hemisphere (where January IS DST), the January fallback will strip the wrong hour. For now this is acceptable — the primary user base is Northern Hemisphere / Coimbra default.
- The Covenant Table section is at `// SECTION, The Covenant Table` in `Search/index.html` between Roman denominations and Who Controls the Covenant Claim.
- The Dani'el 7:25 / DST section is inside the 364-Day Covenant Calendar `<div class="hr-sec-head">` block, after the 1 Enoch 72-82 item.
- Before any content append to `Search/index.html` or `GreatE/index.html`, extract the `<script>` block and run `node --check` to catch syntax errors before pushing.
- Great Eraser HOWTO_HTML is a massive single-quoted JS string — any future edits must escape every apostrophe as `\'`.
