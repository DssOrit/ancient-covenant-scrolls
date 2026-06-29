# Session notes — 2026-06-29

## Current state
- Branch: `claude/load-ai-chat-app-81ll0c` (pushed to origin).
- HEAD: `7e76c48` — "Load AI: switch backend from Groq to OpenRouter".
- `main` is UNCHANGED. The live site (loadeco.app/LoadAI) still serves the
  previous Director Studio. The new chat app is on the feature branch only.
  No PR opened, nothing merged. Nothing live can break until a merge is
  approved.
- Working tree: session note + MASTER_BACKLOG update pending commit.

## Built today
- Rebuilt `LoadAI/` from the image/video "Director Studio" into the
  **Load AI Chat Studio** — a ChatGPT-style chat app behind the Enter
  button. Screens: Home, Chat, Voice, Settings, with a bottom nav.
- Auto intro (Load Play style, Load AI black/neon-green/amber colors)
  that plays once then fades into the EXISTING, untouched splash + Enter.
- Splash image, icon, colors, manifest splash entries, and front page
  left unchanged (per the build request).
- Constitution moved to `constitution.js` as a single constant
  (`window.LOAD_AI_CONSTITUTION`, 6,811 chars, all 10 sections). Injected
  in full as the system message on every API call via `LoadAI.callAI()`.
- Chat: multi-turn thread, user (amber) / AI (neon-green border + "Load
  AI" label) bubbles, copy + bias-transparency note per response, clear
  conversation, history in `loadai_history`.
- Voice: Web Speech input + spoken output, 11-language selector, mic glow
  + waveform, auto-send on pause.
- Settings: API key (masked) + saved checkmark, user-selectable model,
  font (Standard / OpenDyslexic), theme (Dark / Light / Sepia), text-size
  slider, language, clear-history, clear-all (confirm), visible
  constitution toggle, version, About.
- Backend switched from Groq to **OpenRouter** per user ("No groq").
  OpenAI-compatible, so request shape unchanged. Endpoint
  `https://openrouter.ai/api/v1/chat/completions`; default model
  `meta-llama/llama-3.3-70b-instruct:free`; key `loadai_openrouter_key`.
- `sw.js` cache bumped to `load-ai-chat-v8b`; API traffic never cached.
- Reconciled Load AI vs Load Studio (see MASTER_BACKLOG 2026-06-29 note):
  Load AI = chat; Load Studio = AI creation engine. The Director Studio's
  planned image/video features stay owned by existing backlog rows
  (X-AI-CHAT-STUDIO, X-STUDIO-AI, X-VIDEO-AI, X-AI-AUDIO, X-CC). Nothing
  dropped.

## Outstanding / blocking (needs user)
- Go-live decision: open a PR into `main` (and merge?) — NOT done yet,
  awaiting explicit approval. Until then live is unaffected.
- To test live: paste an OpenRouter key in Settings (free key at
  openrouter.ai), pick a model, use Chat/Voice. No live API call has been
  verified by me — not claimed as working.
- Optional: a "Create" handoff link from Load AI Home to Load Studio for
  image/video work. Held pending confirmation (changes the shipped app).

## Pending / parked
- Wiring Load Studio's `director-ai` stubs to the shared provider
  registry (image generation) — backlog X-AI-CORE / X-AI-CHAT-STUDIO.
- Still unbuilt anywhere (already on backlog): mask painter, vision
  output-verification, 3-mode character lock, video gen, audio engine,
  batch edits.

## Capability gaps this session
- `AskUserQuestion` tool repeatedly failed ("permission stream closed");
  proceeded with documented-preference defaults (OpenRouter) and stated
  them for the user to redirect.
- GitHub MCP server connected/disconnected intermittently.
- Could not reach the live Pages URL to confirm deploy (expected sandbox
  limit).

## Backups (recovery)
- `backup/2026-06-29-loadai-studio-v7-1-0` — the previous working Director
  Studio, pushed to origin. SHA `ebb3814` lineage.
- Recover the whole old app:  `git checkout backup/2026-06-29-loadai-studio-v7-1-0`
- Restore just the folder onto main if the chat app ever breaks live:
  `git checkout backup/2026-06-29-loadai-studio-v7-1-0 -- LoadAI`
- Or revert the merge commit once it exists. Cache strings only go
  forward (v7 -> v8b), so no stale-worker trap on iPad.
- A new verified-working backup will be created once the user confirms the
  chat app works live.

## Today's commit log
- `7e76c48` Load AI: switch backend from Groq to OpenRouter
- `2a3d048` Load AI: build chat app (Home/Chat/Voice/Settings) behind Enter
- (branch created off `ebb3814` LoadStudio v249)
