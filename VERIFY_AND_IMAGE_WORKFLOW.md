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
