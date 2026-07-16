# ACR Reader — Complete Design & Rebuild Handoff (authoritative reference)

Purpose: the single source of truth for how the ACR Reader (the root app,
"The Ancient Covenant Record") is built, so it can be rebuilt or reasoned about
without re-reading the whole codebase. Treat this as a rule: read it before any
work that touches, questions, or rebuilds the Reader.

Verified against live source on 2026-07-16 at `main` commit `c6eeead`
(cache `acr-v81`, on-screen build marker `ACR v58`). All values below are quoted
from the actual code unless marked otherwise.

ACR Reader is LOCKED (CLAUDE.md Rule 8). This document is read-only reference —
editing the Reader still requires the exact approval phrase ("edit ACR reader"
/ "fix the reader").

---

## 0. Locked source rules (apply to every volume, non-negotiable)

- **Primary source hierarchy:** (1) Dead Sea Scrolls (DSS, Qumran, carbon-dated,
  primary witness); (2) Orit Ge'ez (Ethiopian canon incl. Chanokh, Yovelim,
  Meqabyan 1 & 2) — co-primary with DSS; (3) ancient Hebrew predating the
  Masoretic compilation. Masoretic Text (10th c. CE) = **variant only, never primary**.
- **Divine names (absolute):** `YHWH` always; Paleo-Hebrew `𐤉𐤄𐤅𐤄` at the top of
  every text page; "The Creator" is the only acceptable alternative. **Never**
  Lord, God, El, Elohim, or any substitute title.
- **Permanently excluded:** New Testament; all Christian theological overlay;
  Rabbinic Talmud; Messianic-group framing; Western/European framing; Hellenistic/
  Roman narratives; **Meqabyan Book 3** (Kristos reference, medieval composition);
  **4Q185** (owner's choice).
- **Calendar / geography:** Shabbat = **Saturday sunrise to Sunday sunrise**
  (DSS/Orit solar reckoning, never sunset-to-sunset); 364-day Qumran solar
  calendar (4 seasons x 91 days); Northeast African / Afro-Asiatic framing;
  reject colonial labels including "Middle East".
- **No false confirmations:** if something cannot be verified, say so directly.

---

## 1. Architecture

- **One HTML file** (`index.html`). All CSS is in a single inline `<style>`; all
  JS is in inline `<script>` blocks (no external `src`). No frameworks, no build
  tools, no web fonts, no icon library loaded in the Reader itself.
- The repo-root `lib-*.js` / `branding.js` are **not** used by the Reader (they
  belong to other suite apps). `content/` is empty/legacy — content lives in `data/`.
- **TTS = browser-native Web Speech API only** (`window.speechSynthesis`). No
  Piper/neural TTS in this app.
- **Host redirect** (first thing in `<head>`): `dssorit.github.io` →
  `acrscrolls.com` (strips the `/ancient-covenant-scrolls` path segment).
- **SW registration:** `navigator.serviceWorker.register('sw.js',{updateViaCache:'none'})`.
- **PWA manifest** (`manifest.json`): name "The Ancient Covenant Record",
  short_name "ACR", `display:standalone`, `background_color:#f5f5f0`,
  `theme_color:#222222`, `orientation:any`, icon `icon.png` (192 + 512).
  Note: the manifest `description` still says "46 Volumes" — stale; the live
  collection is **47 volumes** (see §10).
- **iOS metas:** `viewport-fit=cover`; `apple-mobile-web-app-capable`;
  status bar `black-translucent`; `apple-mobile-web-app-title` "Covenant Record".

---

## 2. Layout regions (exact px + z-index)

Global reset: `*{box-sizing:border-box;margin:0;padding:0}`.
CSS var: `:root{--reader-footer-height:170px}`. Runtime `--fs` / `--lh` on `#content`.

z-index stack (high → low): `#auth` 99999 · `#auth-loading` 99998 · `#prog` 9000 ·
`#hlp` 8000 · `#save-modal` 3000 · `#ch-jump`/`#save-banner` 2000 ·
`#top`/`#acr-build-marker` 1001 · `#nav`/`#reader-footer` 1000 · `#sb` 900 ·
`#sb-ov` 899 · `#notes-viewer` 850 · `#notes-panel` 800 · `#recent-panel`/`#bm-panel` 700.

| Region | Key values |
|---|---|
| `#auth` splash | fixed full-screen `#0a0a0a`; logo `𐤉𐤄𐤅𐤄` 52px `#b03030` |
| `#auth-loading` | `#0a0a0a`; `.al-paleo` 40px `#b03030`; `.al-bar` 240x3px, `.al-fill` `#b03030` |
| `#prog` | top bar height 3px; `#prog-fill` `#666` (dark `#999`) |
| `#nav` | fixed top, height `calc(49px + safe-area-top)`, bg `#222` (dark `#111`), horizontal-scroll toolbar; `.nb` buttons `#bbb`, hover/on `#444`/`#fff` |
| `#sb` sidebar | **width 265px**, bg `#1e1e1e` (dark `#161616`); hidden = `translateX(-265px)`; tree `.ts` (8px section) / `.tv` (10.5px bold volume) / `.tf` (10.5px clickable part) |
| `#main` | `margin-left:265px`, **`max-width:860px`**, padding `24px 40px …`; `#content p` = Arial, `font-size:var(--fs,10.5pt)`, `line-height:var(--lh,1.65)` |
| responsive | `@media(max-width:1023px)` → main full width; sidebar becomes off-canvas drawer (`.mob` slides in, `#sb-ov` scrim) |
| `#reader-footer` | fixed bottom, bg `#111` (dark `#0a0a0a`); row1 `#voice-bar` (44px, `.show`), row2 `#bnav` (44px: `.bb` Prev/Next + `#pos` "X of Y") |
| `#top` | 34px circle scroll-to-top, bottom-right |
| `#notes-panel` | right, width 280px |
| `#notes-viewer` | full inset `49px 0 49px`; `.nve` cards |
| `#ch-jump` | centered popup; `#ch-in` number input |
| `#recent-panel` / `#bm-panel` | drop under nav, chip lists |
| `#hlp` | highlight color popup; 5 `.hc` swatches + `.hx` actions |
| `#save-banner` / `#save-modal` | Add-to-Home banner + numbered Safari steps |
| `#acr-build-marker` | tiny fixed label, `ACR v58`, 7px `#555` |

---

## 3. Colors / themes

| Theme | Background | Text |
|---|---|---|
| Light (default) `body` | `#f5f5f0` | `#111` |
| `body.dark` | `#1a1a1a` | `#e8e8e0` |
| `body.sepia` | `#f4ecd8` | `#3b2a1a` |

- **Signature red** `#b03030` (auth, loader, save banner/modal). **Gold** `#C4A055`
  (favicon). Solar-back accent bg `#1a3a5a` / text `#7abfff`. Voice active-verse
  highlight `rgba(255,235,59,.15)`.
- **Highlight colors** (light / dark): `.hy` `#ffeb3b`/`#6a5000` · `.hg`
  `#90EE90`/`#1a4a1a` · `.hb` `#87CEEB`/`#103a5a` · `.hp` `#DDA0DD`/`#4a1a5a` ·
  `.ho` `#FFB347`/`#5a2a00`. Search `mark` `#ffeb3b` / dark `#5a4a00`.

---

## 4. Typography

### Reader shell (the app UI + fallback)
- **Font:** `Arial,sans-serif` throughout (no web fonts loaded).
- **Base:** `10.5pt` on `body`. `#content p` defaults `font-size:var(--fs,10.5pt)`,
  `line-height:var(--lh,1.65)`.
- **User controls:** `adjFS(d)` = `Math.max(8,Math.min(22,FS+d))` pt, saved to
  `acr_fs`; `adjLH(d)` = `Math.max(1.2,Math.min(2.5,round((LH+d*.1)*10)/10))`,
  saved to `acr_lh`.
- **Paleo / ancient-script stack:** `"Segoe UI Historic","Noto Sans Phoenician",serif`
  (auth glyphs, YHWH rotator).

### Per-page content standard (baked into each JSON `html` — from the build spec)
This is the format the content HTML is authored to, and it can override the shell
fallback per element:
- Verse `1.000em`, note `0.810em`; **minimum 16px**, **line-height minimum 1.8**
  (dyslexia-friendly); max content width **860px** centered.
- Colors (content wrapper): outer `#0D0B07`, content area `#f5f5f0`, verse text
  `#111111`, bold refs `#444444`, chapter headers `#222222` (1.5px `#666` bottom
  border), section banners `#333333` (1.5px `#888` top+bottom borders), subtitles
  `#555555`, italic notes `#555555`, ancient Hebrew `#C8971F` gold RTL.
- Reserved: red `#8B0000` for concern-level volumes only.

> Reconciliation note: the shell `#content p` default (10.5pt / 1.65) is a
> fallback; the content HTML sets its own 16px / 1.8 / 1em-verse sizing. Both are
> intentional — shell = UI defaults, content = locked page standard.

---

## 5. Features

- **Auth splash** — decorative gate (no password; a prior password was removed).
  `doEnter()` runs a 5-step fake loader + YHWH glyph rotator (paleo → Aramaic →
  square Hebrew → Yah → YHWH, 1s each), then reveals nav + footer and calls `start()`.
- **Sidebar tree** — `buildSB()` renders `TOC` (`.ts`/`.tv`/`.tf`); parts call
  `loadSection(idx,true)`. Off-canvas drawer under 1024px.
- **Section load** — `loadSection(idx,restore)` → `fetch('data/'+fid+'.json')` →
  inject `d.html || d.content`; restores highlights, notes, scroll (`acr_sp`),
  voice position (`acr_vp`).
- **Search `#srch`** — in-page `<mark>` wrap via TreeWalker (current section only).
- **Highlighting (5 colors)** — selection popup `#hlp` → `applyHL('hy'|'hg'|'hb'|'hp'|'ho')`;
  stored per section as `{t:text,c:class}` in `acr_hl`; re-wrapped on load by substring.
- **Notes** — per-section textarea (`#notes-panel`, auto-save to `acr_notes`) +
  all-notes viewer (`#notes-viewer`).
- **Voice / TTS (Web Speech)** — bar `#voice-bar`: Play/Pause/Stop, speed
  (0.7/0.85/1/1.2/1.5x), voice picker `#vvoice`, Preview, mode (verses/notes/all),
  Auto-next, volume `#vvol`. Per-verse highlight + scroll while reading; resume via
  `acr_vp`; `pronounce()` normalizes text (chapter:verse → "Chapter N, verse M.",
  YHWH→Yahweh, name respellings, DSS→Dead Sea Scrolls, strips paleo glyphs & bracket
  note labels).
  - **Default voice = Samantha** (verified): on first use (`acr_vi===null`),
    `loadVoices()` scans `speechSynthesis.getVoices()` for `/samantha/i` and
    pre-selects it; the `#vvoice` dropdown shows it `selected`. Samantha is an Apple
    voice, so it appears on iPad/iPhone/Mac Safari; on a device with no Samantha it
    falls back to voice index `0`. Overridable — once changed, `acr_vi` is honored.
    Enhanced/Neural/Premium voices get a `★` prefix.
- **Progress / resume** — `onScroll()` updates `#prog-fill`, shows `#top` past 300px,
  saves scroll per fid to `acr_sp` (debounced 3s).
- **Chapter jump `#ch-jump`** — scrolls to `CHAPTER n`.
- **Themes** — `doDark()` / `doSepia()` (mutually exclusive); `doRead()` reading mode
  (hide sidebar, widen main).
- **Bookmarks** (`acr_bms`, `#bm-panel`) · **Recent** (`acr_rec`, max 10, `#recent-panel`).
- **Hard-refresh button** `↺` (added acr-v77) — clears all caches + unregisters SWs +
  `location.reload(true)`.
- **Add-to-Home banner** — suppressed after 3 dismissals (`acr_save_count`).

---

## 6. Icons (current — KEEP AS-IS)

Per owner decision (2026-07-16) the **existing toolbar glyphs are kept** — no SVG
swap. Current nav set (left → right): `☰` Contents · `\ Solar` back (shown only
when arriving from Solar) · `🕐` Recent · `☆` Bookmarks · `⊕` Chapter jump · `📝`
Notes · `📋` All notes · Search · `A-` `A+` · `↕-` `↕+` · `☀` Sepia · `◑` Dark ·
`⊡` Reading · `🔊` Voice · `↺` Hard refresh. Sidebar header uses `📖`. Voice bar
uses `▶`/`⏸`/`⏹`. (These include color emoji; retained by owner preference.)

---

## 7. Content / data format

- Inline in `index.html`: `NAVIDS` (113 file ids), `LABELS` (113 display strings),
  `TOC` (sidebar tree of `{type:'sec'|'vol'|'file', label, idx?}`).
- Each section = one file `fetch('data/'+fid+'.json')` = `{_copyright,_license,
  _rights, html}`. Renderer uses `d.html || d.content` (`content` is legacy fallback).
- `html` = flat `<p>` string. Paragraphs carry `class="dp"` and
  `data-ptype="verse"|"note"`. **Verse numbering: integers only** (e.g. `vp("1",…)`,
  never `1:1`) for new content — though the Reader still parses legacy `chapter:verse`
  in older files (`isVerseEl`, `pronounce`).
- **Four comparative notes required every chapter:** `[DSS]` `#1A5276` blue ·
  `[ORIT GE'EZ]` `#1E8449` green · `[MASORETIC VARIANT]` `#7D6608` gold ·
  `[CRITICAL NOTE]` `#6E2F8A` purple.
- **Filename irregularity to preserve:** `data/file 112.json` (a space, not
  underscore). There is no `file_112.json`.
- **Build helpers** (build-time script `format.js`, not in the repo): `vp(ref,text)`,
  `np(label,color,body)`, `dss(t)`, `orit(t)`, `maso(t)`, `crit(t)`, `ch(text)`,
  `sb(text)`, `PALEO`.

---

## 8. Storage (localStorage — no IndexedDB)

`acr_last` (section idx) · `acr_fs` (8–22pt, def 10.5) · `acr_lh` (1.2–2.5, def 1.65)
· `acr_dark` · `acr_sepia` · `acr_hl` (highlights) · `acr_notes` · `acr_bms` ·
`acr_rec` (max 10) · `acr_sp` (scroll per fid) · `acr_vp` (voice pos per fid) ·
`acr_vi` (voice idx; `null` → Samantha default) · `acr_vr` (rate) · `acr_vm` (mode) ·
`acr_from_solar` · `acr_save_count`.

---

## 9. Service worker (`sw.js`)

- Cache `acr-v81` (format `acr-vNN`, **forward-only**). Precache SHELL
  `['./','index.html','manifest.json','icon.png']`; DATA_FILES = `data/file_1.json`…
  `file_111.json` + `data/file 112.json` + `data/file_113.json`.
- **HTML shell = network-first** with a `__v=Date.now()` cache-buster (iPad Safari
  ignores `{cache:'no-store'}` alone); never caches non-`ok` responses; offline
  fallback to cached req → `./` → `index.html`.
- **`/data/*` + same-origin assets = cache-first.**
- **Activate** deletes old `acr-*` caches except current and `acr-study-*`, claims
  clients, then `prefetchAllChapters()` (full offline after first online visit).
- **Skips sub-app scopes** (`/study/`,`/load/`,`/LoadPlay/`,`/loadstudio/`,`/attain/`,
  `/attain-jr/`,`/GreatE/`,`/ACR2/`) so each sub-app's own SW handles its scope.
- Bump the cache string every time volumes/content or the shell change.

---

## 10. Inventory (verified current)

- **113 files** (NAVIDS / 113 `TOC` file entries).
- **47 volumes** (Vol 1 → Vol 47; live source has **no Vol 48** — manifest's
  "46 Volumes" is stale, correct current count is 47).
- **7 sidebar sections:** TORAH · SECOND CANON — ORIT GE'EZ · NEVI'IM — FORMER
  PROPHETS · NEVI'IM — LATTER PROPHETS & THE TWELVE · KETUVIM — THE WRITINGS ·
  QUMRAN SECTARIAN TEXTS · QUMRAN CONCERN-LEVEL TEXTS.
- Most recent content addition: Chanokh (1 Enoch) chapters 74–108 (cache → `acr-v81`).

---

## 11. What Claude Code may / must not touch (from the preservation record)

**May:** add new `data/file_N.json`; edit `index.html` **only** to add entries to
`NAVIDS` + `LABELS`; edit `sw.js` **only** to bump the cache version; unzip repo
inbox uploads.

**Must never:** modify `index.html` CSS or JS; modify any existing data file (add
new only); touch the bottom nav, sidebar, or reader controls; touch any file not
named in the prompt. Never `git add .` / `git add -A` — stage specific files only.
Adding a volume = add `file_N` to NAVIDS, add label to LABELS, bump SW cache,
`git add index.html sw.js` only (replicate how the previous volume was added).

**All the above is gated by CLAUDE.md Rule 8:** do not edit the Reader at all
without the exact approval phrase.

---

## 12. Key files

`index.html` (entire app) · `sw.js` (offline) · `manifest.json` · `data/file_*.json`
(113 content files, `{…,html}`) · `icon.png`. Related suite paths the Reader links to
but does not own: `ACR2/`, `Solar/`, `Search/`.
