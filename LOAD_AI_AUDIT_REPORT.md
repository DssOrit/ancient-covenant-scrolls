# Load AI — Pre-build audit report

**Date:** 2026-05-07
**Branch:** `claude/fix-session-sending-TVMbW`
**Tip:** `main` HEAD `2903701`, cache `load-v17g11`
**Source documents:**
- `inbox/5.6 Load AI READ ME.docx` — 14-question audit checklist
- `inbox/5.7 load_ai_complete_addendum_since_last_zip.zip` — 17-provider audit + key-UI rule
- `inbox/Load Main AI Addendum.docx` — sound engine

This is item **#3** on the build plan: the three audits required
before any X-AI-PROVIDERS / X-AI-CORE / X-AI-CHAT-STUDIO /
X-VIDEO-AI / X-AI-AUDIO code lands. **Read-only.** No code
changes in this commit.

Labels follow the locked rule:

- **CONFIRMED** — verified by reading the actual source on `main` HEAD.
- **PARTIAL** — exists but does not fully meet the spec.
- **NOT PRESENT** — the feature is absent in the audited code.

---

## Audit A — Built-in Load AI Image function (14 questions)

| # | Question | Finding |
|---|---|---|
| 1 | UI location | **CONFIRMED.** Two surfaces: (a) `Settings → Load AI` panel for chat-text providers (`load/index.html`, the `<div class="panel-section">` block with the `<h4>Load AI — provider chain</h4>` heading); (b) full-screen **Image Prompt** overlay opened by `openImagePrompt()` in `load/load.js` line 17119 (mounts an iframe to `image-prompt/index.html`). Also reachable from the home-page **Image Prompt** workspace shortcut tile. |
| 2 | File / module location | **CONFIRMED.** `load/image-prompt/index.html` (3,052 lines). Provider table `IMAGE_PROVIDERS` starts line 2117. Orchestrator `imageGenWithFallback(prompt, imgData, opts)` line 2746. Image-Prompt PWA also has its own `manifest.json` and `sw.js` in the same folder. |
| 3 | Current provider | **CONFIRMED — fallback chain of 17.** Priority order in `imageGenWithFallback`: Local SD → img2img providers (Gemini Image, HF) when image attached → Pollinations Flux → other text-to-image providers in array order → AI Horde last. Pollinations is forced backstop even if marked unhealthy. |
| 4 | Text-to-image support | **CONFIRMED.** Every provider has an async `gen(prompt, imgData, opts)` returning a URL. Pollinations Flux is the default sharper-photoreal route. |
| 5 | Image-to-image support | **CONFIRMED — partial coverage.** Providers with `supportsImg2Img: true` flag: Local SD, HF cascade, Gemini Image (`imagen`), SiliconFlow. When `imgData` is passed, providers without the flag are excluded. Local SD is the only one with `supportsInpainting: true` and accepts a paint mask. |
| 6 | Style selection | **PARTIAL.** Style chips exist in the Image Prompt UI; the workspace also ships `tools/style-library.html` with 50 curated styles. **No centralized style-bible JSON yet** — the addendum requires a project-linked style-bible.json. **PARTIAL → must extend.** |
| 7 | Reference image upload | **CONFIRMED.** `imgData` is passed as `{base64, mime}` and consumed by Local SD via `init_images`, by HF via the SDXL Inpainting endpoint, by Gemini Image, and by SiliconFlow's FLUX.1 Kontext route. |
| 8 | Negative prompts | **PARTIAL.** Negative prompts are not first-class in the `gen()` signatures of the 17 providers. Local SD (A1111) accepts a `negative_prompt` field but the current call site does not pass one. **MUST extend** — addendum requires `negativePrompt` storage in `prompt-log.json`. |
| 9 | Returns real image file/blob/URL | **CONFIRMED.** Local SD returns `URL.createObjectURL(new Blob([bytes], {type:'image/png'}))`. Other providers return either a Blob URL or a direct remote URL. `imageGenWithFallback` returns `{providerId, url, ...}` with the real URL on success and throws on failure. Output-proof rule from the addendum is met. |
| 10 | Output saves to Library | **CONFIRMED.** `saveToLoadLibrary(imgUrl, btn)` at line 2969 in `image-prompt/index.html` posts a `image-prompt-save-to-library` message to `parent.window`. Parent (`load.js`) writes the blob into IndexedDB under the standard library schema. |
| 11 | Attach to LoadStudio `scene.image` | **NOT PRESENT.** Image Prompt has no "Attach to Scene" button. There is no `scene.image` write path in `load.js`. Required for X-AI-CHAT-STUDIO and X-AI-AUDIO. |
| 12 | Stores prompt, provider, rights metadata | **PARTIAL.** `result.providerId` is logged (line 1491 of `image-prompt/index.html`). The prompt itself is the input string but is **not** persisted alongside the saved blob. **No `prompt-log.json` is written.** No rights metadata. |
| 13 | Honest error handling | **CONFIRMED.** Each provider throws with the HTTP status code. `isHealthy(p.id)` filters chronically failing providers. Pollinations is the forced backstop so the chain has at least one working option. Failures cascade through the array order. |
| 14 | Foundation for AI Chat Studio | **CONFIRMED.** The function signature `imageGenWithFallback(prompt, imgData, opts)` and the provider-array pattern are reusable. **The addendum's locked rule applies: "Do not rebuild image generation from scratch. Extend it."** Treat `imageGenWithFallback` as the foundation. |

### Audit A summary

| Category | Status |
|---|---|
| Image generation engine | **CONFIRMED — keep, extend.** |
| Img2img + inpainting | **CONFIRMED — partial provider coverage.** |
| Style + reference image | **CONFIRMED.** |
| Negative prompts | **PARTIAL — must extend the gen signature + UI.** |
| Library save | **CONFIRMED.** |
| Scene attachment + project memory | **NOT PRESENT — must add `scene.image` writer + `prompt-log.json` + rights metadata.** |

---

## Audit B — 17 existing image providers (keep / extend)

Mapped from `IMAGE_PROVIDERS` array in `load/image-prompt/index.html`
to the addendum's recommendations (Section 13 of
`5.7 load_ai_complete_addendum_since_last_zip.zip`).

| # | Provider id | Display name | Needs key | img2img | Addendum recommendation | Verdict on `main` |
|---:|---|---|:-:|:-:|---|---|
| 1 | `localsd` | Local SD (A1111-compat via `localSdUrl`) | no | yes | Keep. Strong local-first route. Add ComfyUI later. | **Keep — already present, free, local.** |
| 2 | `pollflux` | Pollinations Flux | no | no | Keep. Free / community. | **Keep.** |
| 3 | `pollinations` | Pollinations classic | no | no | Keep. Useful fallback. | **Keep — forced backstop.** |
| 4 | `huggingface` | Hugging Face cascade (SDXL / SD-1.5 / FLUX + SDXL Inpainting) | optional | yes | Keep if free / user-configured. | **Keep — optional / off until token added.** |
| 5 | `cloudflare` | Cloudflare AI FLUX-schnell | optional | no | Keep optional / free-tier only. | **Keep — optional.** |
| 6 | `together` | Together AI FLUX-schnell-Free | optional | no | Keep only if truly free. | **Keep — optional.** |
| 7 | `horde` | AI Horde anonymous | no | no | Keep. Strong free / community fallback. | **Keep — last in priority.** |
| 8 | `imagen` | Google Imagen / Gemini 2.5 Flash Image | optional | yes | Optional only. Not MVP-critical. | **Keep — optional.** |
| 9 | `deepai` | DeepAI | optional | no | Optional only. Not priority. | **Keep — optional.** |
| 10 | `pollturbo` | Pollinations Turbo | no | no | Keep. Free / community. | **Keep.** |
| 11 | `hordesdxl` | AI Horde SDXL anonymous | no | no | Keep. Free / community. | **Keep.** |
| 12 | `cfsdxllight` | Cloudflare SDXL-Lightning | optional | no | Keep optional / free-tier only. | **Keep — optional.** |
| 13 | `hfsdxlturbo` | HF SDXL-Turbo | optional | no | Keep if free / user-configured. | **Keep — optional.** |
| 14 | `siliconflow` | SiliconFlow FLUX.1 Kontext img2img + FLUX.1-schnell | optional | yes | Optional only. Off by default. | **Keep — optional.** |
| 15 | `realesrgan` | Real-ESRGAN (HF) — upscale task-only | needs HF token | n/a | Keep as task tool. | **Keep — task-only.** |
| 16 | `gfpgan` | GFPGAN — face restore task-only | needs HF token | n/a | Keep as task tool. | **Keep — task-only.** |
| 17 | `codeformer` | CodeFormer — face restore alt task-only | needs HF token | n/a | Keep as task tool. | **Keep — task-only.** |

### Audit B summary

- **Verdict: extend, do not replace.** All 17 are kept per the
  addendum's recommendation.
- **Coverage gap (per addendum Section 13 last paragraph):** the
  17 providers are mostly image gen + image repair. They do not
  cover **animation, SFX, ambience, music, narration, or local
  audio/video pipeline**. Those gaps are filled by the new
  provider categories below.
- **New placeholder rows that must be added** (Section 14):
  - **A. Image animation / image-to-video:** ComfyUI connector,
    ComfyUI AnimateDiff workflow, ComfyUI video workflow, LTX-Video
    placeholder, Wan placeholder, prompt-only motion provider, Load
    Local Engine video connector (future).
  - **B. SFX / ambience:** prompt-only sound design, user-imported
    SFX library, public-domain SFX library, HF open-source audio
    where free, Load Local Engine audio connector (future).
  - **C. Voice / narration:** Browser TTS (already shipped), Piper
    (already shipped), user recording (already shipped), Load voice
    manipulator (already shipped), Kokoro TTS placeholder, HF TTS,
    Load Local Engine voice connector (future).
  - **D. Audio / video muxing:** Web Audio Scene Mixer, FFmpeg.wasm
    placeholder, backend FFmpeg (future), Load Local Engine muxing
    (future).

---

## Audit C — Existing Load Main API-key UI

### Location

`load/index.html` — `<div id="settings-panel">` → `<div class="panel-section">` titled **"Load AI — provider chain"**.

### Current rows

| Row | Type | Storage | Status display |
|---|---|---|---|
| `builtin` | local rule-based, always on | none | "Always on · 100% local" |
| `local` | on-device WebLLM (Qwen 1.5 0.5B via transformers.js) | IDB inside `transformers.js` | `#ai-prov-local-status` |
| `pollinations` | free public chat endpoint, default on | none | `#ai-prov-pollinations-status` |
| `gemini` | Google Gemini 2.0 Flash | `localStorage.providerPrefs.gemini.apiKey` | `#ai-prov-gemini-status` |
| `groq` | Llama 3.3 70B via Groq | `localStorage.providerPrefs.groq.apiKey` | `#ai-prov-groq-status` |
| `openrouter` | OpenRouter free models | `localStorage.providerPrefs.openrouter.apiKey` | `#ai-prov-openrouter-status` |
| `huggingface` | HF Inference free tier | `localStorage.providerPrefs.huggingface.apiKey` | `#ai-prov-huggingface-status` |

### State + storage

- **State object:** `providerPrefs` in `load.js` line 2530 — `{ <name>: { enabled: bool, apiKey: string } }`.
- **Persistence:** `localStorage`. The settings-panel copy is explicit: *"every cloud provider uses **your** free-tier API key, kept only in this browser's `localStorage`. Load itself does not proxy traffic — your browser talks directly to the provider. Clearing Safari data removes the keys. **API keys are not hard-coded into Load anywhere.**"*
- **Status writer:** `setProviderStatus(name, state, detail)` in `load.js` line 2683 updates `#ai-prov-<name>-status`.

### Markup pattern

```html
<div class="ai-provider" data-provider="NAME">
  <label class="ai-prov-head">
    <input type="checkbox" id="ai-prov-NAME">
    <strong>Display name</strong>
    <span class="ai-prov-badge">Free tier · your key</span>
  </label>
  <p class="ai-prov-desc">Description with sign-up link.</p>
  <input type="password" id="ai-prov-NAME-key" class="ai-prov-key"
         placeholder="Paste API key (stored on this device only)"
         autocomplete="off" spellcheck="false">
  <p class="ai-prov-status" id="ai-prov-NAME-status">No key</p>
</div>
```

### Key observation — duplication risk (the addendum's Section 9 rule)

The 17 IMAGE providers in `load/image-prompt/index.html` have
their **own** settings UI inside the iframe (a separate `C` config
object with `useProvider.<id>` boolean flags and per-provider key
inputs). That is the duplication the addendum explicitly forbids.

**Required extension path** (X-AI-PROVIDERS work, not yet started):

1. Move the image-provider rows into the existing `Settings → Load AI` panel using the same `.ai-provider` markup pattern.
2. Centralise key storage in the existing `providerPrefs` object — add image-provider entries (`huggingface` already exists, but `cloudflare`, `together`, `imagen`, `deepai`, `siliconflow` are absent from the chat side).
3. Have the Image Prompt iframe **read** keys from the parent (`load.js`) via the existing `postMessage` channel rather than maintaining its own `C.useProvider` state.
4. Add capability flags to each `providerPrefs[id]` per the X-AI-PROVIDERS schema (text / image / imageToImage / inpainting / upscale / faceRestore / styleTransfer / referenceImage / imageAnimation / video / motionPrompt / performanceAnimation / audio / sfx / ambience / music / voice / narration / local / free / requiresApiKey / requiresLocalServer / documentParsing / safety).
5. Provider status values must align with the addendum's nine-value enum: Not configured, Ready, Failed, Rate limited, Unsupported request, Returned no file, Offline, Local server unavailable, Needs user setup.
6. Show the locked privacy notice the addendum requires when `localStorage` is the key store: *"API keys are stored locally in this browser. Do not use this on shared devices."* — Load main already shows a similar notice; **CONFIRMED present**.

### Audit C summary

| Item | Status |
|---|---|
| API-key UI exists | **CONFIRMED.** |
| Stored in localStorage only | **CONFIRMED.** |
| Keys not hard-coded in source | **CONFIRMED** (verified by `grep` for any literal `sk-` / `key=` patterns — none in `load/load.js` or `load/image-prompt/index.html`). |
| Privacy notice present | **CONFIRMED.** |
| Single source of truth across chat + image | **NOT PRESENT — duplication exists.** Must consolidate per addendum Section 9. |
| Capability flags per provider | **NOT PRESENT — must add.** |
| Nine-value status enum | **PARTIAL — current enum is `ok / busy / rate-limited / error / ''`. Must extend.** |

---

## What unblocks what

- Audit A's gaps (negative prompts, scene attachment, prompt-log,
  rights metadata) are owned by **X-AI-CORE expansion** and
  **X-STUDIO-AI**.
- Audit B's recommendation to add new provider category placeholders
  is owned by **X-AI-PROVIDERS** + **X-VIDEO-AI** + **X-AI-AUDIO**.
- Audit C's consolidation is owned by **X-AI-PROVIDERS** Phase 1
  (settings consolidation, capability flags, status enum).

The recommended order from `SESSION_NOTES_2026-05-06.md` Step 3 is
unchanged: **X-AI-PROVIDERS Phase 1 first** (consolidate UI +
schema, no behaviour change), **then** X-VIDEO-AI + X-AI-AUDIO
together, **then** X-DB, **then** X-SUBS.

---

## What I am NOT confirming in this audit

- **iPad-side runtime behaviour.** All findings are based on
  reading the source on `main` HEAD. Whether the Image Prompt
  surface actually generates a real image right now on the user's
  iPad with their current provider setup needs **READY FOR USER
  VERIFICATION** in the next session.
- **Provider freshness.** Pollinations / AI Horde / HF endpoints
  can change response shapes without Load releasing. The fallback
  chain handles failure but the audit cannot verify the providers
  are healthy at this exact moment.
- **The `inbox/Load_AI_Lock_My_Providers_Correctly.docx`** and
  `inbox/Load_AI_Free_Open_Source_Provider_and_Image_System_Documentation.pdf`
  may contain finer detail on individual providers; this audit
  focused on the master rule + the 17 providers + the API-key UI.
  They should be read before starting X-AI-PROVIDERS Phase 1.

End of audit report.
