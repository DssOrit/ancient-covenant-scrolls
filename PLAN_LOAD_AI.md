# Load AI — Build Plan Source Documents

These are the two source documents that drive the Image Prompt build
direction. Treat them as authoritative reference for any work on
provider routing, character consistency, anti-blur guardrails, and
fallback behavior.

## Source files (in inbox/)

1. **Load_AI_Free_Open_Source_Provider_and_Image_System_Documentation.pdf**
   — The full provider strategy + 6-pipeline architecture (A Vision /
   B Prompt Builder / C Editing / D Generation / E Verification / F
   Fallback) + capability registry + routing order. Authoritative
   provider list and rules.

2. **Load_AI_Deeper_Workarounds_Addendum.pdf** — Browser-first
   workarounds, Manual Rescue Mode, capability fields, AI Output
   Receipt, No Image Returned detector, plug-in registry, MVP phasing.

## Hard rules (extracted, do not violate)

1. **Never send image-editing requests to text-only models.**
2. **Never claim an edit succeeded unless the app receives an actual
   image file, blob, or URL.** Text/JSON/markdown response = provider
   failed for that task.
3. **If a provider returns text instead of image, mark failed and try
   next.**
4. **Edits must route to image-to-image / inpainting providers — never
   silently fall back to text-to-image** (that is the bug that caused
   character drift).
5. **Capability-based routing, not hard-coded assumptions.**

## Capability fields (per provider)

`text_only`, `vision_input`, `image_output`, `image_edit`,
`image_to_image`, `inpainting`, `outpainting`, `background_removal`,
`segmentation`, `object_detection`, `tts`, `stt`, `video`,
`returns_file`, `returns_url`, `returns_blob`, `rate_limit_status`,
`cost_status`.

## Routing order (free-tier priority, summarized)

1. Local SD (ComfyUI / A1111 / Fooocus) — preferred when configured
2. Hugging Face Spaces / Inference (free)
3. Gemini image edit (only if free tier + image edit confirmed)
4. Pollinations — generation only, NOT for preservation
5. Cloudflare Workers AI free tier
6. Replicate / Together / DeepInfra — only when free credits exist
7. Optimized export-prompt fallback for ComfyUI / A1111 / Fooocus

## Three operating modes

- **Browser Mode** — lightweight client-side edits, no cloud calls
- **Free Provider Mode** — Puter / Pollinations / HF / Cloudflare
- **Local Engine Mode** — companion local engine running ComfyUI etc.

## Three consistency modes

- **strict** — preserve face, hair, skin tone, hairstyle, distinctive
  features, clothing silhouette, visual style, age, body type
- **moderate** — preserve identity + overall style, allow pose/framing
  variation
- **loose** — reference as inspiration only

## Task types (canonical set)

`generate`, `improve`, `add_person`, `modify_character`,
`change_background`, `remove_object`, `inpaint`, `outpainting`,
`mask_edit`, `upscale`, `background_removal`, `style_transfer`,
`expression_change`, `pose_change`.

## MVP phasing (from addendum §16)

- **Phase 1:** provider router, capability map, Puter, Pollinations,
  image upload, prompt builder, output verification, no-image-returned
  detector. — *partly shipped through v17dq*
- **Phase 2:** browser compression, cropper, manual mask tool, rembg,
  HF connector, Cloudflare Worker router.
- **Phase 3:** reference memory, character cards, consistency modes,
  vision verification, OpenRouter / Gemini vision fallback.
- **Phase 4:** Load AI Local Engine (ComfyUI API, IOPaint, SAM 2,
  ControlNet, IP-Adapter, Real-ESRGAN).
- **Phase 5:** video / animation, voice tools, batch generation,
  plug-in marketplace.

## Currently shipped (as of v17dq)

- Capability-based task router (`classifyImageTask`,
  `filterImageProvidersForTask`)
- Output-validation guard (empty/non-string response = provider failed)
- Light browser-canvas sharpening on non-localsd output
- Character slot (description / outfit / style / seed / refImage / mode)
  injected into Scene Lock + standalone prompts
- Local SD provider stub (A1111-compatible, slot 0) when
  `localStorage.ps_local_sd_url` is set
- Export-prompt fallback when no img2img provider is available for an
  edit task — returns ready-to-paste ComfyUI / A1111 / Fooocus prompt
- Scene Lock 1000-char preservation context with explicit preserve list
- 12 sustained-free image providers (Pollinations classic + Flux + Turbo,
  HF SDXL cascade + SDXL-Turbo, Cloudflare flux-schnell + SDXL-Lightning,
  Together, AI Horde + SDXL, Imagen, DeepAI)

## Outstanding from build plan (next)

- Wire UI edit-button entry points through a single `runImageTask(opts)`
  facade so taskType / sourceImage / mask / character profile can be
  passed cleanly without UI rebuild
- AI Output Receipt (per-edit log of provider, model, seed, ref ID)
- Manual Rescue Mode (paint mask, lasso) — Phase 2
- Output Verification pass (post-gen vision diff) — Phase 3
- IP-Adapter / InstantID via Local SD workflow — Phase 4
