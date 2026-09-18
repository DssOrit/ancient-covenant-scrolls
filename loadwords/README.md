# Load Words

A multisensory vocabulary PWA built for a high-level dyslexic learner — audio pronunciation, plain-English meanings, and real conversation examples, on a dyslexia-friendly reading surface.

Part of the **Load** app family.

## What's inside

```
index.html          — app shell (loads wordbank.js + app.js)
app.js               — all app logic: rendering, spaced repetition, speech, storage
wordbank.js          — the core word bank (500 words across 6 categories, tagged with 7 themes)
manifest.json        — PWA install metadata
service-worker.js    — offline app-shell caching
icons/               — app icons (48–512px, plus maskable + favicon)
assets/               — splash art, wired in via apple-touch-startup-image
```

**Study modes:** flashcard Study (spaced repetition), Test (meaning match / word match / sentence fill / typed recall / context quiz / daily upgrade / word builder / confusing pairs sort / drag &amp; drop), Upgrade Slider, and Listen Mode — hands-free audio playback of word → meaning → example → conversation, either looping continuously or auto-pausing for a quick retention quiz every 5/8/10 words. Any word can be flagged "difficult" during Listen Mode for later focused review.

**Context quiz:** a sentence-with-blank, 4-option multiple-choice test that shows why the correct answer fits (and why a wrong pick doesn't) after you answer, plus a collapsible hint — generated automatically from each word's own definition and example, so it works across the whole bank.

**Daily upgrade quiz:** a smaller, hand-curated set (`SCENARIOS` in `wordbank.js`) of relatable everyday situations paired with a "casual thought" and an "advanced upgrade" — e.g. a messy roommate's room → "byzantine." Same 4-option format and inline explanation as the context quiz, but scoped to situations rather than bare definitions. Add more by appending to `SCENARIOS`: `{id, wordId, situation, casual, upgrade}`.

**Word Builder (etymology):** a smaller, hand-curated set (`MORPHEME_WORDS` in `wordbank.js`, 16 words) that breaks a word into its color-coded root/prefix/suffix pieces (e.g. trans + luc + ent → "translucent"), each with its own meaning and audio button, plus a small CSS-animated scene illustrating the word's concept. Tap blocks from a shuffled pool (correct pieces + distractors from other words) into the build area in the right order, then Verify. Add more by appending to `MORPHEME_WORDS`: `{wordId, scene, blocks:[{text, meaning, type}]}` — `scene` must match one of the `.scene-*` CSS classes in `index.html`, or a new one can be added there.

**Confusing Pairs sort:** a two-option version of the Context Quiz scoped to the Confusing Pairs category — a blanked sentence and two "Sort to X" buttons for the pair, with the distinguishing `note` (or definition) shown as the explanation after answering.

**Upgrade Slider:** reuses the `SCENARIOS` data from the Daily Upgrade quiz. Drag a slider and watch a simple sentence crossfade into its advanced-vocabulary version, with the target word bolded once revealed — no right/wrong, pure recognition, untimed.

**Drag & Drop:** a touch-drag variant of the Context Quiz — same blanked-sentence data, but you drag a word chip onto the blank instead of tapping a multiple-choice button. Built with pointer events (not native HTML5 drag-and-drop, which iOS Safari doesn't support well for touch), so it works reliably on iPad.

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
