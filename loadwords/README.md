# Load Words

A multisensory vocabulary PWA built for a high-level dyslexic learner — audio pronunciation, plain-English meanings, and real conversation examples, on a dyslexia-friendly reading surface.

Part of the **Load** app family.

## What's inside

```
index.html          — app shell (loads wordbank.js + app.js)
app.js               — all app logic: rendering, spaced repetition, speech, storage
wordbank.js          — the core word bank (309 words across 6 categories)
manifest.json        — PWA install metadata
service-worker.js    — offline app-shell caching
icons/               — app icons (48–512px, plus maskable + favicon)
assets/               — splash art, wired in via apple-touch-startup-image
```

**Study modes:** flashcard Study (spaced repetition), Test (meaning match / word match / sentence fill), and Listen Mode — hands-free audio playback of word → meaning → example → conversation, either looping continuously or auto-pausing for a quick retention quiz every 5/8/10 words. Any word can be flagged "difficult" during Listen Mode for later focused review.

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
  conv:["...","..."], register:"formal", category:"ad" // or add a new category
}
```

`stress` is the 0-based index into `syllables` for the stressed syllable. If you add a new `category` key, also add it to `CATEGORY_META` at the bottom of the file so it gets a label and color in the UI.

## Icons

The icons in `/icons` (and the splash art in `/assets/splash.jpg`) are cropped directly from the original "Load Words PWA Icon Pack" design file — not placeholders. Sizes above roughly 380px are upscaled slightly since the source was a flattened preview composite, so if true full-resolution exports become available later, dropping them in under the same filenames is a straight swap.

## Known v1 limits

- Word images are user-supplied links, not bundled photos — paste an image URL per word from the word's detail page or the Add Word form.
- Pronunciation audio uses the device's built-in text-to-speech (`speechSynthesis`), so voice quality depends on the browser/OS — no external API or key required.
