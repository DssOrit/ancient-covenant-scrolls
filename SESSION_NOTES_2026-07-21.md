# Session Notes — 2026-07-21

## Current state
- Branch: `main` at `2006163` (PR #717 merged). Working tree clean; local `main` == `origin/main`.
- ACR Search cache: `acr-search-v182`.
- ACR Reader (root) cache: unchanged today (last touched a prior session). No root-app files touched this session.
- All work this session was in ACR Search only (`Search/index.html`, `Search/sw.js`), under the "edit ACR Search" unlock.

## Built today (chronological, all Search, all verified against the primary source)
1. **PR #713 — `acr-search-v178`.** New top-level section **"The Watchers and the Unseen"** (11 entries across 5 groups: death/Sheol chambers, day of judgement, end-times war [War Scroll 1QM + Gog], Hermon→Dudael binding, Chanokh-21 prison of fire, demons, demon possession, sirens, portals of heaven, where the beings are now, Satan/Azazel/Yeshua). Full wiring: mpill, view, panel, `renderWatchersPanel()`, `initApp` call, `setMode` views array, `PANEL_LABELS`, `buildSiteIndex` tab, `goToSiteEntry`. Also added 2 entries to the Paganism pill: astrology-vs-astronomy and astral-projection-vs-translation. Add-only.
2. **PR #714 — `acr-search-v179`.** Into "The Watchers and the Unseen": entry **"Dudael and Mount Hermon Are Two Different Places"** (Hermon = descent north; Dudael = desert prison), and new group **"The Day of Atonement and the Azazel Goat"** with **"Yom Kippur Is Pre-Rabbinic and Pre-Second-Temple"** (Torah + DSS Temple Scroll 11Q19 col 26 + Ge'ez Orit; goat sent alive per Vayikra 16:22; cliff-killing + synagogue liturgy named as later overlay). Add-only.
3. **PR #715 — `acr-search-v180`.** Fixed a real contradiction: the Ancient Places **"Dudael"** card said the scapegoat "was pushed" off a cliff to its death (Mishnah Yoma 67b). Corrected the description to lead with the primary source (goat sent away **alive**, Vayikra 16:22; not killed) and named the cliff-killing as a later Rabbinic practice, not the original. Scholarly-debate box left as-is.
4. **PR #716 — `acr-search-v181`.** Corrected source-direction inversion in three **Cosmological** place-card "Cosmological context" boxes (The Abyss, The Mountains of Darkness, The Sheol Chambers). They had framed Chanokh's cosmology as *drawn from / derived from* Mesopotamian and Greek myth, citing Coblentz Bautch as authority. Rewritten at full strength, verse-anchored: **the covenant record is the original, revealed account; the Greek/Mesopotamian underworld myths are the later counterfeits / corrupted echoes, not its source.**
5. **PR #717 — `acr-search-v182`.** Fixed false info in the Mountains of Darkness "What the texts say" description ("imprisoned wives of the Watchers"; mis-cited 19:2). Corrected to state exactly Chanokh 19:1 (Watchers stand till judgment) and 19:2 (women become sirens); text does not imprison the wives.

Also handled (no code): several primary-source content questions (demon possession, is Satan Azazel, is Yeshua Azazel, Dudael/Hermon geography, Yom Kippur pre-Rabbinic standing) answered from DSS/Orit/Chanokh.

## New STANDING RULE established this session (carry forward)
**Do not offer any proposed wording/revision without first verifying against the actual ACR Reader source (`data/file_*.json`) AND the DSS & Ge'ez Orit, and confirming the pre-Second-Temple / pre-Rabbinic / pre-Christian standard.** Order is always: read the source + quote the verses → preview → wait for approval → write. Locked by user after two overstatements were caught in draft (a) "sirens imprisoned with the Watchers" and (b) "Abel's blood" (text says Abel's *spirit* makes his suit, Chanokh 22:8). No drafting from memory.

## Outstanding / to verify (user)
- Confirm the five Search changes on iPad once Cloudflare deploys `main`: cache should read `acr-search-v182`; hard-refresh once if stale. Check ACR Search → "The Watchers and the Unseen", Paganism pill (astrology/astral), and Ancient Places → Dudael + the three Cosmological cards.

## Pending / parked
- **Bucket 2 — LEFT AS-IS by explicit user direction.** The Ancient Places location-ID cards (Land of Nod, Garden of Righteousness, Abel-Main, and the Dudael *scholarly-debate* box) still name Western scholars (Milik, Stuckenbruck, Nickelsburg) as the identifying authority. User's ruling: these do not *contradict* the text (they fill a location gap the text leaves open), so **do nothing** — leave as is.
- **Bucket 3 (minor, not requested):** Ancient Places refs use English book names (Genesis, Deuteronomy, Isaiah, etc.) instead of Hebrew. Style inconsistency, not a rule violation. Not touched.

## Capability gaps this session
- None blocking. Working: git push, GitHub MCP (PRs/merge), Cloudflare Pages preview deploys, `node --check` inline-script syntax harness, headless Chromium render harness (playwright-core in scratchpad, CHROME=/opt/pw-browsers/chromium-1194/chrome-linux/chrome). The lone headless page error ("Cannot read properties of null (reading 'addEventListener')") is pre-existing/harmless offline-init, present before and after every edit.

## Backups (recovery: `git checkout backup/<name>`)
- `backup/2026-07-21-v177` — main before PR #713
- `backup/2026-07-21-v178` — main before PR #714
- `backup/2026-07-21-v179` — main before PR #715
- `backup/2026-07-21-v180` — main before PR #716
- `backup/2026-07-21-v181` — main before PR #717
- `backup/2026-07-21-v182` — **final verified state** (= current `main` `2006163`)

## Today's commit log (oneline)
```
2006163 Search: fix false "imprisoned wives" claim in Mountains of Darkness card (#717)
6c88e99 Search: correct source-direction inversion in three Cosmological place cards (#716)
cb2b6a4 Search: fix Dudael card contradiction — scapegoat sent away alive, not killed (#715)
cee7730 Search: add Dudael/Hermon clarity and Yom Kippur pre-Rabbinic entries (#714)
3b47699 Search: add Watchers/Unseen section and astrology + astral-projection entries (#713)
```
