# Verify + Image Workflow (reference)

Saved 2026-07-06 by user direction. Read this before verifying a deploy or
adding/compressing images for ACR Search.

## How to verify the live / deployed state

The live site (acrscrolls.com / dssorit.github.io) deploys from `main` via
Cloudflare / Pages. The sandbox usually cannot fetch `dssorit.github.io`
directly (it is blocked), so verify the source that gets deployed instead.

1. **Confirm what is on `main`** (this is what deploys):
   - `git fetch origin main && git show origin/main:Search/sw.js | grep CACHE`
     shows the live cache version, or
   - fetch `https://raw.githubusercontent.com/DssOrit/ancient-covenant-scrolls/main/Search/sw.js`, or
   - use GitHub MCP `get_file_contents`.

2. **Confirm the app actually renders** (headless Chromium on the local file):
   - `playwright-core` is available in the session; the Chromium binary lives
     under `/opt/pw-browsers` (global playwright at
     `/opt/node22/lib/node_modules/playwright`, reachable via
     `NODE_PATH=/opt/node22/lib/node_modules`).
   - Load `Search/index.html` via `file://`, call the render functions / set
     the mode, then check panel and image counts and that there are no JS
     page errors. When a file:// page error appears, confirm it is pre-existing
     by running the same check against the pristine `origin/main` copy before
     blaming the change.

3. **True on-device check** (only the user can do this): ask the user to open
   `https://dssorit.github.io/ancient-covenant-scrolls/Search/sw.js` and read
   the top `CACHE = '...'` line. That confirms Pages finished deploying.

## How to compress images and verify legibility

Compress with Python Pillow to WebP:

- **Text-heavy infographics:** quality 88-90, resize longest edge to
  ~2000-2200px, `method=6`.
- **Photos / little text:** quality 82-86, ~1600-1800px.

```python
from PIL import Image
im = Image.open(src).convert("RGB")
im = im.resize((w, h), Image.LANCZOS)
im.save(name + ".webp", "WEBP", quality=Q, method=6)
```

**Verify legibility (required).** After compressing, open each `.webp` with the
Read tool and actually read the text in the image. If any text is blurry,
re-compress at higher quality / resolution. Legibility is the only bar
(Rule 15). If the source itself has garbled or wrong baked-in text (an AI
artifact), hold it and ask the user — do not ship it.

**Check for duplicates.** Before adding any image, `md5sum` it against
`Search/images/*.webp` to make sure it is not a duplicate of one already there.

## Page-verification harness (set up once per session, in the scratchpad)

Chromium is already installed at `/opt/pw-browsers` (env `PLAYWRIGHT_BROWSERS_PATH`
points to it). Do NOT run `playwright install`. You only need the `playwright-core`
npm package. Use the scratchpad path from the system prompt as `$SCRATCHPAD`.

1. Install `playwright-core` in the scratchpad:

   ```bash
   cd "$SCRATCHPAD" && npm install playwright-core
   ```

2. Find the Chromium binary (verified path shown; the version dir may change):

   ```bash
   find /opt/pw-browsers -type f -name chrome -path '*chromium-*'
   # -> /opt/pw-browsers/chromium-1194/chrome-linux/chrome
   ```

Two levels of verification before shipping any `Search/index.html` edit:

**(a) JS syntax check** (no browser) — extract inline `<script>` blocks (skip ones
with `src=`) and `vm`-check each:

```bash
node -e '
const fs=require("fs"), vm=require("vm");
const html=fs.readFileSync("Search/index.html","utf8");
const re=/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi;
let m,i=0,bad=0;
while((m=re.exec(html))){ try{ new vm.Script(m[1]); }catch(e){ bad++; console.log("BLOCK",i,e.message);} i++; }
console.log("checked",i,"blocks,",bad,"errors");
'
```

**(b) Headless render check** — launch Chromium on the local file, block external
requests, call the render functions, count panels / steps / images, collect JS
errors. Run with `CHROME=<path from step 2> node render_check.cjs`:

```js
const { chromium } = require('playwright-core');
(async () => {
  const b = await chromium.launch({ executablePath: process.env.CHROME });
  const p = await b.newPage();
  const errs = [];
  p.on('pageerror', e => errs.push(e.message));
  await p.route('**', r => r.request().url().startsWith('file:') ? r.continue() : r.abort());
  await p.goto('file:///home/user/ancient-covenant-scrolls/Search/index.html');
  await p.waitForTimeout(400);
  const info = await p.evaluate(() => {
    // call renderXPanel() functions / setMode('...') as needed, then count:
    const gb = document.getElementById('guide-body');
    return { guideBodySteps: gb ? gb.querySelectorAll('.guide-step').length : -1 };
  });
  console.log(JSON.stringify(info), 'errors:', JSON.stringify(errs));
  await b.close();
})();
```

Notes:
- Init throws a harmless `Cannot read properties of null (reading 'addEventListener')`
  error offline, and blocked external resources are expected — that is why you call
  the `renderXPanel()` functions directly and abort non-`file:` requests. To be sure a
  page error is pre-existing (not from your edit), run the same check against the
  pristine copy: `git show origin/main:Search/index.html > pristine.html` and load that.
- Never `await img.decode()` (it hangs headless). Check `naturalWidth > 0` or just
  confirm the file exists on disk.

Everything else (viewing images, compressing, editing content, git, GitHub merges)
works out of the box with no setup.
