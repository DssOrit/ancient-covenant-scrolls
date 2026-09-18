# Load Words

A multisensory vocabulary PWA built for a high-level dyslexic learner — audio pronunciation, plain-English meanings, and real conversation examples, on a dyslexia-friendly reading surface.

Part of the **Load** app family.

## What's inside

```
index.html          — app shell (loads wordbank.js + app.js)
app.js               — all app logic: rendering, spaced repetition, speech, storage
wordbank.js          — the core word bank (525 words across 7 categories, tagged with 7 themes)
manifest.json        — PWA install metadata
service-worker.js    — offline app-shell caching
icons/               — app icons (48–512px, plus maskable + favicon)
assets/               — splash art, wired in via apple-touch-startup-image
```

**Study modes:** flashcard Study (spaced repetition), Test (meaning match / word match / sentence fill / typed recall / context quiz / daily upgrade / word builder / confusing pairs sort / drag &amp; drop), Upgrade Slider, Vocabulary Deal or No Deal, Memory Match, Higher or Lower, The Imposter, Thread-Link Board, Vocab Feud, Stack &amp; Match, Word Blocks, Story Quest, Debate &amp; Meeting Arena, and Listen Mode — hands-free audio playback of word → meaning → example → conversation, either looping continuously or auto-pausing for a quick retention quiz every 5/8/10 words. Any word can be flagged "difficult" during Listen Mode for later focused review. The Word Vault is a persistent rewards layer that runs alongside all of them.

**Context quiz:** a sentence-with-blank, 4-option multiple-choice test that shows why the correct answer fits (and why a wrong pick doesn't) after you answer, plus a collapsible hint — generated automatically from each word's own definition and example, so it works across the whole bank.

**Daily upgrade quiz:** a smaller, hand-curated set (`SCENARIOS` in `wordbank.js`) of relatable everyday situations paired with a "casual thought" and an "advanced upgrade" — e.g. a messy roommate's room → "byzantine." Same 4-option format and inline explanation as the context quiz, but scoped to situations rather than bare definitions. Add more by appending to `SCENARIOS`: `{id, wordId, situation, casual, upgrade}`.

**Word Builder (etymology):** a smaller, hand-curated set (`MORPHEME_WORDS` in `wordbank.js`, 16 words) that breaks a word into its color-coded root/prefix/suffix pieces (e.g. trans + luc + ent → "translucent"), each with its own meaning and audio button, plus a small CSS-animated scene illustrating the word's concept. Tap blocks from a shuffled pool (correct pieces + distractors from other words) into the build area in the right order, then Verify. Add more by appending to `MORPHEME_WORDS`: `{wordId, scene, blocks:[{text, meaning, type}]}` — `scene` must match one of the `.scene-*` CSS classes in `index.html`, or a new one can be added there.

**Confusing Pairs sort:** a two-option version of the Context Quiz scoped to the Confusing Pairs category — a blanked sentence and two "Sort to X" buttons for the pair, with the distinguishing `note` (or definition) shown as the explanation after answering.

**Upgrade Slider:** reuses the `SCENARIOS` data from the Daily Upgrade quiz. Drag a slider and watch a simple sentence crossfade into its advanced-vocabulary version, with the target word bolded once revealed — no right/wrong, pure recognition, untimed.

**Drag & Drop:** a touch-drag variant of the Context Quiz — same blanked-sentence data, but you drag a word chip onto the blank instead of tapping a multiple-choice button. Built with pointer events (not native HTML5 drag-and-drop, which iOS Safari doesn't support well for touch), so it works reliably on iPad.

**Vocabulary Deal or No Deal:** pick 1 of 6 briefcases to keep, then open the other 5 one at a time — each pops open with a brief animation and reveals a definition, eliminating its matching word from the board. The Banker calls after the 2nd open (then after every open after that) as a dedicated modal overlay, with a points offer computed from the average value of the words still in play, scaled by an escalating "greed" factor. Deal takes the offer and ends the round; No Deal closes the modal and keeps going until either a deal is taken or all other cases are opened, revealing your own case's word. Word point values are computed from category tier + word length (`wordPointValue()` in `app.js`), not hand-authored.

**Memory Match:** a 3x4 grid of face-down cards (6 words + their 6 definitions), flipped two at a time with a 3D CSS flip. A match locks both cards open; a mismatch flips them back after a short pause. Scoring: +100 per match, multiplied by a consecutive-match streak (1st=100, 2nd=200, 3rd=300...) that resets on any mismatch; a 50-point "efficiency" bonus pool loses 1 point per mismatch and pays out in full once the board is cleared. The running total persists as a daily score across sessions (`memoryScore` in localStorage, reset once the calendar date changes).

**Higher or Lower:** shows an advanced word; pick which of 3 plain-English definitions belongs to it. A correct guess builds a streak (100/200/300... points at risk) with a choice to Bank (keep the points, safe) or risk it on the next word for more. A wrong guess loses only the current streak's at-risk points — nothing already banked.

**The Imposter:** shows a matching 3-card set (Simple Concept / Advanced Upgrade / Example Sentence) for one word, but one card has been secretly swapped for a different word's content. Cards briefly shuffle face-down, then reveal — tap the one that doesn't belong. Uses each word's `syn[0]` for the "Simple Concept" card where available, falling back to its definition.

**Thread-Link Board:** 4 advanced words on the left, their 4 simpler matches (`syn[0]`) on the right, both shuffled independently. Drag from a left card to its match — a real line is drawn between them (Pointer Events + a live-updated SVG `<line>`, not native HTML5 drag-and-drop). A correct connection locks green and stays drawn; a wrong one flashes red and resets automatically, no separate "check" step needed.

**Vocab Feud:** a random theme (from the same 7 `THEME_META` tags used for Browse-by-theme) becomes the round's "survey topic." 6 words from that theme fill the board, ranked highest-value first using the same `wordPointValue()` used by Deal or No Deal, mixed into a shuffled chip pool with 4 distractor words pulled from other themes. Tap a chip that belongs to the board and it flips open revealing its point value, added to your score; tap one that doesn't belong and it's a strike. Clear all 6 slots to win the round — 3 strikes ends it and reveals the board.

**Stack &amp; Match:** an untimed, tap-to-drop take on Columns/Connect Four. 6 word/definition pairs become 12 blocks, shuffled into a queue one at a time; tap a column to drop the next block into it (no falling-block timer, no time pressure). Land a word block directly beside its matching definition block (up, down, left, or right) and both clear immediately, scoring `wordPointValue()` points. Clear all 6 pairs to win; the round ends early if every column fills before the queue is exhausted.

**Word Blocks:** a block-puzzle take on spelling, built entirely from each word's existing `syllables` field (no new content authoring — works across all 446 eligible words in the bank). 4 words are chosen, each laid out as a row of empty cells (one per syllable). A shuffled pool of syllable chunks sits below — drag each chunk (Pointer Events, same touch-drag approach as Drag & Drop and Thread-Link Board) onto the cell it belongs in. Land the right chunk in the right slot and it locks in; a wrong chunk bounces back to the pool with a brief red flash. Complete a whole row and it "shatters" with a scale-pulse animation (respects `prefers-reduced-motion`), reveals the word's definition beneath it, and scores `wordPointValue()` points. Clear all 4 words to win.

**Story Quest:** a short, hand-written 3-chapter mystery (`STORY_QUEST` in `wordbank.js`) — "The Lighthouse Keeper's Ledger." Each chapter is a few short paragraphs of atmospheric narrative with one inline vocabulary choice (a blanked sentence, pick the word that fits) that genuinely branches the next passage — pick right and the story continues with a more vivid follow-on paragraph; pick wrong and it continues plainer, then both paths rejoin. Each chapter ends with a recall checkpoint (multiple-choice: what does this word from the chapter mean?), pulling its correct definition and two random distractor definitions live from the word bank. A final score out of 6 selects one of three encouraging endings.

**Grammar Coach:** 10 short, hand-written grammar lessons (`GRAMMAR_TOPICS` in `wordbank.js`) covering commonly-confused rules — who/whom, its/it's, affect/effect, fewer/less, lay/lie, subject-verb agreement, comma splices, dangling modifiers, parallel structure, who's/whose. Each rule shows a plain-English explanation and an example, then an immediate practice question testing that exact rule, with an explanation either way. Separate from the vocabulary games — reachable from its own Home-screen tile.

**Debate & Meeting Arena:** 5 hand-written workplace scenarios (`DEBATE_SCENARIOS` in `wordbank.js`) — two colleagues in conversation, the second one's reply containing a blank that needs the right high-tier verb (`substantiate`, `elucidate`, `castigate`, `equivocate`, `capitulate`). A collapsible hint shows the target word's definition. Uses the app's existing SVG icon set for the speaker avatars — no external images or fonts.

**Word Vault:** a persistent, cross-session rewards layer (Home screen tile + its own view). Every calendar day you complete at least one graded interaction (in any study mode or game — anything that calls the existing spaced-repetition grading), you earn 1 key, on top of the existing daily streak counter. Every 7th consecutive day adds a 5-key bonus, and the first time you hit a 7-day streak you permanently earn a "7-Day Crown" badge shown on the Vault screen. Keys spend on 7 themed word packs (`WORD_PACKS` in `wordbank.js`, one per existing `THEME_META` theme, costs 5 through 35 keys) — unlocking a pack is permanent and reveals up to 8 real words and definitions from that theme in a simple gallery view. All state (`vault` in localStorage) persists the same way the streak and memory score already do.

**Themes:** every word also carries a `theme` tag (Intellectual & Mental States, Character & Personal Behavior, Emotions & Human Experience, Analytical & Academic Concepts, Communication & Rhetoric, Conflict & Social Dynamics, Usage & Precision) — browsable from Home or the All Words list, alongside the existing difficulty-tier categories.

No build step, no dependencies, no backend. It's plain HTML/CSS/JS — open `index.html` in any modern browser and it runs.

## Running it locally

Any static file server works, e.g.:

```
python3 -m http.server 8000
```

then open `http://localhost:8000`. (Opening `index.html` directly via `file://` mostly works too, but the service worker only registers over `http(s)://` or `localhost`.)

## Deploying to GitHub Pages

1. Push this folder to a GitHub repo (root, or a `/docs` folder — either works).
2. Repo **Settings → Pages** → set source to the branch/folder you used.
3. Once it publishes, the URL is installable: open it on an iPad/iPhone in Safari, tap Share → **Add to Home Screen**, and it installs as a standalone app using `manifest.json` and the icons in `/icons`.

No custom domain or HTTPS setup needed — GitHub Pages serves both by default, which is what the service worker requires.

## How data is stored

Everything (word progress, spaced-repetition state, your added words, any images you attach, and your display settings) is stored in the browser's own `localStorage`, under keys prefixed `loadwords:`. That means:

- It's private to that browser/device — nothing is sent anywhere.
- It persists across visits, including offline.
- Clearing Safari's site data for this app will reset it.

## Word-bank tiers and the "ad" category rebuild

The bank spans 7 difficulty categories (see `CATEGORY_META` in `wordbank.js`): Confusing Pairs, Upgrade Ladders, Advanced, C2/Elite, Literary, Super Advanced, and **Philosophical** — the newest, hardest tier (25 words spanning epistemology, metaphysics, linguistics, and system dynamics — e.g. `aporia`, `reification`, `nihilism`, `ataraxia`).

The **Advanced** (`ad`) category was audited and rebuilt: 43 of its original 60 words were too close to everyday vocabulary for an advanced-learner app (e.g. `abundant`, `genuine`, `crucial`) and were replaced in place with genuinely C1/C2-level words (e.g. `magnanimous`, `temerity`, `officious`, `opprobrium`). 17 words that were already solidly advanced were kept as-is, along with `poignant` and `paradigm` specifically at the user's request. Every replacement was checked against the other 524 words first to avoid duplicating a word that already existed elsewhere in the bank under a different tier.

## Adding more words

Two ways:

1. **In the app** — the Add Word screen, which also lets you attach an image URL per word.
2. **Directly in `wordbank.js`** — append objects to the `CORE_WORDS` array following the existing shape:

```js
{
  id:"unique_id", word:"resilient", syllables:["re","sil","ient"], stress:1,
  pos:"adjective", definition:"...", example:"...",
  conv:["...","..."], register:"formal", category:"ad", // or add a new category
  theme:"character", // one of THEME_META's keys — used for the Browse-by-theme filter
  syn:["tough","hardy"] // optional — powers the Thesaurus block
}
```

`stress` is the 0-based index into `syllables` for the stressed syllable. If you add a new `category` key, also add it to `CATEGORY_META` at the bottom of the file so it gets a label and color in the UI.

## Icons

The icons in `/icons` (and the splash art in `/assets/splash.jpg`) are cropped directly from the original "Load Words PWA Icon Pack" design file — not placeholders. Sizes above roughly 380px are upscaled slightly since the source was a flattened preview composite, so if true full-resolution exports become available later, dropping them in under the same filenames is a straight swap.

## Known v1 limits

- Word images are user-supplied links, not bundled photos — paste an image URL per word from the word's detail page or the Add Word form.
- Pronunciation audio uses the device's built-in text-to-speech (`speechSynthesis`), so voice quality depends on the browser/OS — no external API or key required.
