# Suggestions parked — review by 2026-05-25

User direction 2026-05-04: capture and revisit in a few weeks. **Do not
implement until the user explicitly requests one of these.**

These are exploratory ideas the user asked me to brainstorm for the
suite (Load, LoadStudio, LoadPlay, ACR Reader, Attain, Attain Jr,
Study). Grouped by theme. Each is offline-friendly, dyslexia-aware,
avoids external product names.

---

## Security — parked by user 2026-06-30 (revisit when ready)

- **Cloudflare Access in front of `/LoadTasks/*` (the OCC internal tool).**
  User chose to SKIP for now (wants the simplest login), but asked to
  remember it for later. What it does: adds an edge "front door" so only
  approved emails can even load the internal tool; their existing
  username/password login is unchanged and still works. To keep it easy,
  set the Access **session to 30 days** so the email-code step is rare.
  Does NOT touch Claude's workflow or the repo (Cloudflare dashboard only),
  and does NOT make the repo private. Fits locked rule 10.
  Setup: Cloudflare → Zero Trust → Access → Applications → Add (Self-hosted)
  → domain `loadeco.app`, path `LoadTasks` → policy Allow = owner + employee
  emails. (Emails stay private in Cloudflare, never in the repo.)
- **Also still available (all fit rule 10):** GitHub branch protection on
  `main` (block force-push/delete, require checks), Secret scanning + Push
  protection, account 2FA, Cloudflare WAF rate-limit on `/api/occ/login`,
  Turnstile on the OCC login, edge logging for `/LoadTasks/*` visibility.

---

## Cross-suite (highest leverage)

- **Universal voice layer.** Web Speech command bar across all six apps. "Open Bereshit." "Make this into a study deck." "Resume my last edit." iPad supports this offline.
- **Shared local knowledge graph.** One IndexedDB the whole suite reads/writes. A "covenant" tag in ACR Reader surfaces as a study card in Attain, a scene tag in LoadStudio, a chapter marker in Load. No server needed.
- **Personal color-of-meaning palette.** Instead of red/blue defaults, the user maps their own colors to concepts. Same palette appears across every app. The brain learns the mapping once.
- **Cross-app reading handoff.** Pause a passage in ACR Reader, resume the same point as audio in Load while doing something else, then study it in Attain. One reading "session" object spans apps.
- **Cadence learner.** The suite quietly tracks where the user slows down or backtracks. Auto-scroll speed, voice pace, BeeLine timing, and Attain review intervals tune to that cadence.
- **Visual save-history.** Every save anywhere produces a thumbnail in a scrubbable timeline. "Time-travel" without filenames.

## ACR Reader + Attain

- **Pre-read schema.** Two-line plain-language preview at the top of every chapter so dyslexic readers have context before sentences.
- **Semantic bookmarks.** "Bookmark all passages about courage" via local-LLM tagging, not just positions.
- **Difficult-word predictor.** Inline pronunciation hints appear right before words the user has historically paused on.
- **Concept map that grows as you read.** Tap any term to see every other passage that uses it. Builds itself silently.

## Load main

- **"Rewrite for clarity" overlay.** Select any paragraph in any imported HTML app → instant simpler-language version. Toggleable in the viewer.
- **One-click study export.** Any imported book → Attain deck, automatically.
- **Lost-focus auto-bookmarks.** Detects back-scroll patterns and silently marks where the reader struggled.

## LoadStudio

- **Scene whisper.** Quiet plain-language line per editing step ("add a wide shot first so viewers know where they are").
- **Director presets.** Pick a voice (Documentary / Calm / Energetic) and the studio shifts pacing, color, and music suggestions.
- **PWA dry-run preview.** See the published book/video as a viewer would, with throttled network simulation.
- **Project state thumbnails on the dashboard.** At-a-glance where every project sits (drafted / scored / awaiting cover / ready).

## LoadPlay

- **Quiet mode feed.** Low-stimulation rail. Long-form, ambient, no autoplay, soft palette.
- **LAN co-watch handoff.** Scan a QR on a second iPad to continue the same playback. Works offline on the same Wi-Fi.
- **Family progress garden.** Educational watch time grows a visual garden the whole family sees.

---

## Truth Uncovered — Stage 2: phones-as-buzzers multiplayer (parked by user 2026-07-09)

Great Eraser Study now has **Truth Uncovered** (game-show hub: Evidence Board +
The Eraser's Offer, 1-4 teams, TV stage toggle) shipped as **Stage 1**, which is
single-device / offline (teams gather around one iPad, AirPlay/mirror to the TV).

**Stage 2 (deferred, DO NOT build until user asks):** let each person play on
their **own phone** as a buzzer, host on the iPad, board on the TV.

User's hard constraint (2026-07-09): **no paid Cloudflare storage.** Build it the
exact way the OCC backend already works, so it is provably $0:

- Add a Cloudflare **Pages Function** (e.g. `functions/api/games/[[path]].js`) in
  THIS repo (auto-deploys with the site, same-origin, no CORS). Stays in one public
  repo, no standalone worker, no second repo. Fits locked rule 10.
- State in **free-tier D1** (same free plan as OCC `DB`; no payment method needed).
  A `rooms` table: `code`, `state` (JSON blob), `updated_at`. Optionally a `players`
  table. A room is a few tiny rows.
- **Rooms auto-expire** (short TTL, e.g. delete on `updated_at` older than ~2h) and a
  **self-enforced row/byte cap that refuses new rooms before any billable limit** —
  mirror OCC's `STORAGE_CAP_BYTES` pattern ("writes stop before the cap so nothing
  ever bills").
- **Sync by light polling** (~1s) from phones/TV against the Pages Function. Do NOT
  use **Durable Objects** or WebSockets (Durable Objects require a paid Workers plan).
- Flow: host taps Host in Truth Uncovered -> room `code` + QR shown on the iPad/TV ->
  players open the site on their phone, enter code -> buzz/answer -> host screen and
  TV stage reflect it via polling. A standalone **TV "Stage" view** URL
  (`?room=CODE&stage=1`) can be opened directly in a smart-TV browser or Chromecast.
- Setup the user must do once (their side): create the D1 database in the Cloudflare
  Pages dashboard and bind it (Settings -> Functions -> D1 binding), same as OCC `DB`.
  Claude writes all the code and hands over the exact click-path.

Everything else (the two shows, teams, scoreboard, TV stage layout) already exists in
`GESTUDY/index.html` from Stage 1, so Stage 2 is mostly the room/sync layer plus a
Host/Join entry point.

---

## Reminder logistics

I can't actually wake up on a specific date — my session is reactive,
not scheduled. To make sure these resurface, do one of:

1. Set a calendar reminder on your iPad for **2026-05-25** that says
   "Open `SUGGESTIONS_PARKED.md` in the repo and ask Claude to revisit."
2. Each new session, look at `CLAUDE.md` — I added a
   "**Active reminders**" section that lists this file's review date
   so future sessions surface it automatically.

---

## Waking Up — ACR Search transition content — parked 2026-07-21 (SAVED REFERENCE)

(Pill working name: "Waking Up". Was "Crossing Over" — renamed by user 2026-07-21.)

NOTE TO FUTURE SESSIONS: This is a passive saved reference. The user does NOT
want it surfaced each session. A single one-time reminder is scheduled via a
trigger for ~2026-08-14; that is the only reminder. Do NOT auto-surface this
entry on session start, and do not treat it as an active "review by" item.

User asked (2026-07-21) to save this plan to possibly add later, and to be
reminded once in a few weeks (handled by the one-time trigger, not by
per-session surfacing). **Do not build until the user explicitly requests it.
Per the standing rule, verify every section against the ACR Reader source +
DSS + Orit (pre-Second-Temple, pre-Rabbinic, pre-Christian) BEFORE drafting
any wording.**

### The gap (from a full structural scan of ACR Search)
The site is deep on (1) deconstruction (NT Lookup, Paganism, Rome/Canon,
Contradictions, Suppressed, Rabbinic record, Masoretic-vs-DSS) and (2)
identity/evidence (African Hebrew record, DNA, calendar, covenant chain,
practices). The gaps are on the CONSTRUCTIVE / PASTORAL / TRANSITION side —
the "I believe you, now what?" journey for people crossing over from a
Christian or Rabbinic background.

### The 9 gaps
1. Atonement / how sin is forgiven now (biggest — only debunk of the cross exists, no constructive replacement). [Both]
2. No background-specific on-ramp ("Start Here" is generic). [Both]
3. Fear deprogramming (afterlife is descriptive, not pastoral). [Both]
4. "What to do now" transition guide (stop/start at your pace). [Both]
5. Grief / family / community loss (the human cost). [Both]
6. The "relationship with Jesus" constructive replacement. [Christian]
7. "Grace vs law" reframed — the law as the path of life. [Christian]
8. "If not the rabbis/Talmud, how do I practice?" — DSS/Orit/Beta Israel as the replacement system. [Rabbinic]
9. Consolidated "what your pastor/rabbi will say" rebuttal toolkit. [Both]

### Placement plan — one new "Waking Up" pill
A single new top-level pill houses all nine as sections (kept together,
fully searchable via buildSiteIndex). Gap 9 can double as Beliefs Q&A cards.

### Wiring mechanism (how any ACR Search addition is made)
1. New pill: mpill + `-view` div + `-panel` div + `render...Panel()` + initApp call + setMode views array + PANEL_LABELS + buildSiteIndex tabs + goToSiteEntry handler. Bump SW cache.
2. New section in an existing pill: subhead + td-items in a render function.
3. New Beliefs Q&A card: object pushed into BELIEFS_QA.
4. Guide step: guide-step in "How to Use".

### VERIFIED FLAGSHIP CONTENT (ready to ship as-is) — "How Sin Is Atoned — Return to YHWH, Not a Dying Savior"
All anchors verified in the ACR Reader corpus on 2026-07-21:
- Return/teshuvah: Devarim 30 (file_12); Yechezkel 33:11 "no pleasure in the death of the wicked, but that the wicked turn from his way and live" (file_58); 18:32 "no pleasure in the death of anyone, so turn and live" (file_55).
- Heart over sacrifice: Hoshea 6:6 (in Search); Tehillim 51 "a broken and contrite heart, O Creator, you will not despise" (file_67); Micah 6:8 "do justice, love kindness, walk humbly with your Creator" (file_62).
- Yom Kippur covering, goat sent away alive: Vayikra 16:22.
- DSS Yahad atonement, no temple/no dying messiah: 1QS Community Rule "by the spirit of true counsel of the Creator are atoned the paths of a man, all his iniquities, so that he may look upon the light of life" (file_98).
- Christian-facing close: return directly with a whole/broken heart; the "forgiveness requires the invented figure's blood" teaching is the manipulation over the covenant.
Five td-items drafted (see scratchpad atonement_preview.html at draft time). Divine name rendered YHWH / Creator.

### Still to verify before drafting (do NOT draft from memory)
Sections for gaps 2-9 each need their own primary-source verification pass
against the ACR corpus + DSS + Orit before any wording is written or previewed.
Suggested next: the two on-ramps (the front door).
