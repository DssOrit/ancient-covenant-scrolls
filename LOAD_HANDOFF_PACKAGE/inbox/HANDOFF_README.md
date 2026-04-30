# Load PWA — Standalone Handoff Package (v17e8)

Built **2026-04-30** at git tip **`1bd6cea`** (Load v17e8). Site loading
confirmed working by the user at this version.

This is a self-contained snapshot of the Load PWA suite (ACR Reader, Load,
Attain, Attain Jr, Study) plus every plan / spec / inbox source / session
note / verification record in the project.

---

## What's in the box

```
LOAD_HANDOFF_PACKAGE/
├── HANDOFF_README.md          ← this file
├── load/                      ← the live PWA (deploy as-is to GitHub Pages)
│   ├── index.html · load.js · load.css · sw.js · manifest.json
│   ├── image-prompt/          ← Image Prompt sub-PWA (current focus)
│   ├── book-video/            ← future Book-to-Video module (specced)
│   ├── fonts/  lib-*.js  icon.png
├── inbox/                     ← every source doc the user uploaded
├── PLAN_LOAD_AI.md            ← merged build plan v10 (single source of truth)
├── PLAN_IMAGE_PROMPT.md · PLAN_IMAGE_PROMPT_v3.md · PLAN_BOOK_TO_VIDEO.md
├── HANDOFF.md  · VERIFIED_LOG.md · CLAUDE.md
├── SESSION_NOTES_*.md (5 days)
├── LOAD_FEATURES.md · LOAD_MARKETING.md · MEDIA_MODULE_SPEC.md
├── SECURITY.md · SECURITY_PLAN.md · SECURITY_AUDIT_REPORT.md
├── NOTICE.md · CONTENT_LICENSE.md · PROTECTION_GUIDE.md · README.md
```

---

## Current state at this snapshot (v17e8, commit `1bd6cea`)

**User-confirmed at this snapshot:** site loads on iPad Safari.
**User-verified prior:** v17e0 — Manual Mask painter sunglasses test.
**v17e8 over v17e0 added (built, not all individually verified):**

- 4 new providers: SiliconFlow (FLUX.1 Kontext img2img — opt-in), Real-ESRGAN (HF upscale), GFPGAN (HF face restore), CodeFormer (HF face restore alt)
- `callPuter` response normalized at source (fixes `reply.match` error)
- Settings UI for SiliconFlow key + 4 new toggles
- `taskOnly` flag groundwork for filtering upscale/face-restore providers out of generic chain

**Image providers in code (17 entries):**

| # | Provider | Cost | Default |
|---|---|---|---|
| 0 | Local SD (A1111-compat) | free, user GPU | OFF (companion-machine) |
| 1 | Pollinations Flux | free, no key | ON |
| 2 | Pollinations classic | free, no key | ON |
| 3 | Hugging Face cascade | free, HF token | ON if key set |
| 4 | Cloudflare AI | free, CF tokens | ON if keys set |
| 5 | Together AI | free, key | OFF (free credits not sustained) |
| 6 | AI Horde | free, anonymous | ON |
| 7 | Google Imagen (Gemini 2.5 Flash Image) | free, Gemini key | OFF (opt-in) |
| 8 | DeepAI | free tier, key | OFF (opt-in) |
| 9 | Pollinations Turbo | free, no key | ON |
| 10 | AI Horde SDXL | free, anonymous | ON |
| 11 | Cloudflare SDXL-Lightning | free, CF tokens | ON if keys set |
| 12 | HF SDXL-Turbo | free, HF token | ON if key set |
| 13 | **SiliconFlow** (FLUX.1 Kontext) | **free-entry credits** | **OFF (opt-in)** |
| 14 | **Real-ESRGAN (HF)** upscale | free, HF token | ON if key set |
| 15 | **GFPGAN (HF)** face restore | free, HF token | ON if key set |
| 16 | **CodeFormer (HF)** face restore | free, HF token | ON if key set |

**Chat providers (6, lock rules enforced):**

| Provider | Image use? | Notes |
|---|---|---|
| Puter.js | partial (vision) | No key, default first |
| Google Gemini | yes (via Imagen) | Free key |
| OpenRouter | NEVER | TEXT-ONLY locked |
| Cerebras | NEVER | TEXT-ONLY locked |
| Anthropic | yes (vision, paid) | OFF by default |
| HF Mistral | NEVER | TEXT-ONLY — `HF_TEXT_ONLY_MODELS` regex pre-call block |

**What is parked / unbuilt:**

See `PLAN_LOAD_AI.md` for the 35-item roadmap. Highlights still open:

- #2 Background removal — **PARKED** (OpenCV.js 8 MB WASM crashed iPad in
  v17e1, HF briaai/RMBG-1.4 also crashed in v17e2)
- #5 Output Verification (vision diff + auto-retry)
- #5b Identity Lock (IP-Adapter / InstantID via HF Spaces)
- #5c Structured prompt-rewrite layer
- #6 Character Cards UI
- #7 3-mode toggle UI
- #7a/7b/7c Add object explicit / Remove object Erase / Merge images
- #18a-e Image → Video (5 tiers — basic motion, SVD, AnimateDiff, Talking
  Avatar, Effects layer)
- #19a Batch edits
- 14 polish-tier backlog items (#20-35)

---

## Hard rules (from CLAUDE.md — must not be broken)

1. **Never send image-editing requests to text-only models.**
2. **Never claim an edit succeeded unless an actual image file/blob/URL
   is returned.** Text/JSON/markdown response = provider failed.
3. **Edits route to img2img / inpainting only.** No silent text-to-image
   fallback for edits.
4. **Capability-based routing, not hard-coded assumptions.**
5. **Every provider call has a hard timeout** (45/60/120 s with
   AbortController). Loading state must always clear in `finally{}`.
6. **Cache strings only go forward, never backward.** Going backwards
   leaves iOS Safari with the broken old SW running.
7. **Surgical revert only.** When something breaks, revert ONLY the
   specific file/function — never blanket `git reset --hard`.
8. **No iPad-side WASM or large-model loads** without a strict memory
   test first.

---

## How to deploy / run

### Deploy as-is to GitHub Pages

1. Push the entire repo to a public GitHub repo.
2. Settings → Pages → Source = `main` branch, root.
3. Live URL: `https://<user>.github.io/<repo>/load/`

### Local test

```
python3 -m http.server 8000
# open http://localhost:8000/load/
```

### Cache version discipline

Every JS / HTML / CSS edit must bump:

- `load/sw.js` — `var CACHE = 'load-vXXY'` (alpha-incremented forward)
- `load/load.js` — the on-screen badge `<span id="ve-version">vXXY</span>`
- `load/image-prompt/sw.js` — `const CACHE = 'image-prompt-vNN'`

Always FORWARD. Never backward.

---

## Backups (recoverable forever)

`git checkout backup/<name>`:

- `backup/2026-04-29-v17dg` — pre-spec verified baseline
- `backup/2026-04-30-v17dn` through `backup/2026-04-30-v17dy`
- `backup/2026-04-30-v17e0` — Manual Mask painter verified (sunglasses test)

Last fully-verified state: **v17e0** (`593d410`). Anything past that —
including this v17e8 — is built but only loading-confirmed, not
feature-by-feature verified.

---

## Inbox source documents

| File | Purpose |
|------|---------|
| `Load_AI_Free_Open_Source_Provider_and_Image_System_Documentation.pdf` | Full provider strategy + 6-pipeline architecture |
| `Load_AI_Deeper_Workarounds_Addendum.pdf` | Browser workarounds, Manual Rescue Mode, plug-in registry |
| `Load_AI_Glam_Style_System_Research_and_Developer_Plan.zip` | 7-layer Glam architecture, capability schema, future model tracking |
| `AI Prompt Anti Blur.docx` | Task classify + route + reject text-as-success |
| `Load AI Lock My Providers Correctly.docx` | Capability checks + skip-and-continue |
| `Fix Hang & regeneration errors.docx` | Timeouts + AbortController + finally{} cleanup |
| `AI Key Diagnostic.docx` | Test Keys + masked keys + status icons |
| `load_ai_character_consistency_with_code.zip` | Reference JS modules + character profile schema |
| `Load_Book_to_Video_*.zip`, `deliverable_premium_icon_pack*.zip` | Adjacent project assets |

---

## Where the build plan lives

`PLAN_LOAD_AI.md` (also mirrored in `inbox/`) is the single source of
truth. It contains: 7 source docs, Provider Lock List, hard rules,
routing order, capability fields, operating modes, consistency modes,
task type catalog, Editor Tools section, 35+ roadmap items with source
attribution + acceptance test, original-wave → merged-item map.

Update this file at the end of every shipped version.

---

## Known incidents this session (so the next dev doesn't repeat them)

| Date | What happened | Root cause | Fix |
|------|---------------|------------|-----|
| 2026-04-30 | OpenCV.js GrabCut crashed iPad | 8 MB WASM exceeded iOS Safari memory budget | Don't load OpenCV in browser |
| 2026-04-30 | HF briaai/RMBG-1.4 also crashed | Possibly same memory pressure | Background removal parked entirely |
| 2026-04-30 | Site stopped loading after sentinel-throw refactor | Bad change + stale SW | Restored image-prompt source byte-identical to v17e0 |
| 2026-04-30 | Cache bumped backwards left iPad's stuck SW | iOS doesn't trigger SW update on equal/lower cache name | Always bump forward |
| 2026-04-30 | `reply.match is not a function` on "Create a girl" | Puter SDK returned object not string | callPuter normalized at source v17e8 |

---

## Final word

Read `CLAUDE.md` first. Treat `PLAN_LOAD_AI.md` as the source of truth.
Ship one small surgical change at a time. Verify on real iPad Safari
before claiming anything works. Cache strings always forward. No WASM in
the browser without a memory test. Surgical reverts only.

Live tip: `1bd6cea` (Load v17e8 — site loading confirmed).
Last user-verified feature: `593d410` (Load v17e0 — Manual Mask painter
sunglasses test).
