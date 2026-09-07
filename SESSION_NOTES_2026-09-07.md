# Session Notes — 2026-09-07

## Current state

- Latest commit on `origin/main`: `a14a805` (Merge PR #894)
- Working tree: clean
- No uncommitted work outstanding

## Built today

1. **ACR Solar — real equinox anchor + Gregorian dates + Year-view badges (PR #889, merged)**
   - `getSolarYearStart()` previously hardcoded March 20 every year. Replaced with a
     calculated astronomical spring equinox (Meeus mean-equinox algorithm), then
     anchored 1 Aviv to the Wednesday on/after it — matching the weekday formula
     that already assumed a Wednesday start (4Q320/4Q321).
   - Holy Days tab cards now show the actual Gregorian date (MM/DD/YYYY) under the
     solar month/day.
   - Year view: holy days now show a full circle badge in that holy day's own
     color instead of a flat gray tint.
   - Cache bumped `acr-solar-v41` → `acr-solar-v42`.
   - Backup: `backup/2026-09-07-acr-solar-v41` (SHA `2275c42`).

2. **ACR Solar — sunrise-to-sunrise correction throughout (PR #891, merged)**
   - User directive: "We NEVER observe from sunset, it is ALWAYS sunrise to
     sunrise like the strict covenant" — only Rabbinic tradition uses
     sunset-to-sunset; the ancient covenant people observed sunrise to sunrise.
   - Found: the Shabbat Mode overlay and its "Why Sunrise to Sunrise" panel
     already stated this correctly (Yovelim 2:9, Damascus Document CD 10-11,
     4QCalendrical Texts), but Settings labels, the Shabbat/Holy-day push-alert
     firing logic, and the Yom Kippur/Pesach Eve text were still built on sunset
     — an internal inconsistency, not a doctrinal question.
   - Fixed: Settings "Sunset Alerts" → "Sunrise Alerts" (+ descriptions);
     Shabbat push alert now fires Saturday counting down to sunrise (was
     Friday/sunset); Holy day push alert now fires on the holy day's own date
     counting down to that day's sunrise (was the evening before, counting to
     sunset); upcoming-events cards "Begins at sunrise"; Yom Kippur text keeps
     the verse's own "evening to evening" wording but states the operative
     boundary here is sunrise to sunrise; Pesach Eve's Unleavened Bread start
     corrected to sunrise on the 15th.
   - Cache bumped `acr-solar-v42` → `acr-solar-v43`.
   - Backup: `backup/2026-09-07-acr-solar-v42` (SHA `68b1b2b`).

3. **ACR Solar — real step-by-step and supply-list sections (PR #893, merged)**
   - User asked whether the site had exact step-by-step execution and detailed
     supply lists for each holy day — it had the info (`practice`/`supplies`
     prose) but not itemized/numbered.
   - Added `steps` (ordered array) and `supplyList` (bulleted array, genuinely
     empty where nothing is needed — e.g. Yom Kippur's fast) to all 22
     `HOLIDAYS` entries, built only from facts already in each entry's existing
     text — no new claims added.
   - `showEventDetail()` now renders real numbered/bulleted lists; existing
     prose sections kept intact below for full citations.
   - Cache bumped `acr-solar-v43` → `acr-solar-v44`.
   - Backup: `backup/2026-09-07-acr-solar-v43` (SHA `b63eb1c`).

4. **ACR Solar — ancient consonantal names + Vayikra 23 structural categories, "Mo'adim" (PR #894, merged)**
   - User argument: "holy" is a modern Germanic/English theological gloss not
     present in the DSS/Orit consonantal text; the actual vocabulary is
     Mo'ed (appointed time), Miqra Qodesh (set-apart assembly), and Shabbaton
     (total cessation), plus each appointment's own specific ancient name
     (Pesach, Chag HaMatzot, Yom Teru'ah, etc.).
   - **Caught real transcription errors in user-supplied paleo Hebrew before
     building anything**: a wrong letter substituted for Chet in "Pesach"
     (should be 𐤇, was given as 𐤄), square-script ח mixed into paleo text in
     three "Chag" instances, and two dropped Tsade (צ) characters (Hag
     HaMatzot, Atzeret). Corrected forms verified letter-by-letter against
     Unicode codepoints before use.
   - **Verified every category assignment against actual quoted Leviticus 23
     text via search** (not memory) before writing: e.g. confirmed Sukkot's
     7th day (7:21) gets Mo'ed only — Vayikra 23:34-39 gives Miqra
     Qodesh/Shabbaton to day 1 and day 8 specifically, not the days between.
   - Added `CATEGORY_INFO` lookup + `ancientName`/`categories` fields on all
     22 `HOLIDAYS` entries; `showEventDetail()` renders both as new sections.
   - Renamed "Holy Days" → "Mo'adim" everywhere in the app (nav tab, section
     header, top pill bar, "Mo'ed Alert" setting, "Upcoming Mo'adim") —
     confirmed zero leftover "Holy Day" text anywhere in the file.
   - Cache bumped `acr-solar-v44` → `acr-solar-v45`.
   - Backup: `backup/2026-09-07-acr-solar-v44` (SHA `a177da6`).

**Verification method used across all four PRs**: `node --check` on extracted
inline JS (clean every time), HTML tag-balance checked against the pre-change
baseline (identical each time, pre-existing false-positive only, confirmed not
a regression), and live verification in headless Chromium reading real
DOM/data values (not just source-reading) — no page errors across Month /
Mo'adim / Sun Times / Year / Settings tabs on any of the four builds.

## Outstanding / blocking (carried over, not from today)

- **Yovelim `data/file_16.json` fix is still paused.** Chapters 6, 8, 9, 10,
  13–16, 18, 20, 21, 23–25 have a verified-complete build sitting in scratchpad
  (never pushed). Chapters 7 (truncated), 11–12 (internal gaps), 17/19 (a
  "tenth trial" label contradiction), and 22 (heading falsely claims a death
  not in the chapter's text) are all still unresolved — no verified source yet
  supplies the missing/corrected content. Backup branch
  `backup/2026-09-03-acr-v118` (SHA `1ae5212`) is the recovery point.
- **CLAUDE.md Rule 36 status is disputed and unresolved.** Added 2026-09-03
  from the user's pasted "textual critic" instructions; the user later said
  "I never told you to add any more rules." Never got a decision on
  keep-vs-remove.
- **Holy-day email reminder feature — not decided.** User asked about a
  week-before email alert; real backend build (Cloudflare Worker + Cron +
  email API + private email storage) vs. a fully client-side push-notification
  alternative (using existing `notification-provider.js` scaffolding) were both
  laid out. No choice made yet.

## Pending / parked

- Yovelim Ch7/11/12/17-19/22 fixes — parked pending verified source content.
- Rule 36 keep-or-remove — parked pending user decision.
- Email vs. push reminder for holy days — parked pending user decision.

## Capability notes this session

- `WebSearch` (crawled-content synthesis) worked reliably this session for
  verifying primary-text claims (Leviticus 23 verse text, Numbers 9 wording) —
  used to confirm the Mo'adim/Miqra Qodesh/Shabbaton category mapping before
  it was built into the site. Direct `WebFetch` to most external domains
  remains blocked (confirmed a deliberate organization-level proxy policy
  earlier this session, not a technical fault) — `WebSearch` is the working
  path for text verification when direct fetch is unavailable.
- No physical iPad available — all Solar changes were verified via headless
  Chromium (real DOM/text/data assertions) instead of on-device Safari.

## Today's commit log

```
ac1fe89 ACR Solar: add ancient consonantal names and Vayikra 23 structural categories
3ca9536 ACR Solar: add real step-by-step and supply-list sections to every holy day
f33d017 ACR Solar: correct alert logic and text to sunrise-to-sunrise throughout
bbf788d ACR Solar: real equinox anchor, Gregorian dates on Holy Days, year-view badges
```

## Backups

- `backup/2026-09-07-acr-solar-v41` — SHA `2275c42` (before PR #889)
- `backup/2026-09-07-acr-solar-v42` — SHA `68b1b2b` (before PR #891)
- `backup/2026-09-07-acr-solar-v43` — SHA `b63eb1c` (before PR #893)
- `backup/2026-09-07-acr-solar-v44` — SHA `a177da6` (before PR #894)

Recovery: `git checkout backup/<name>`
