# Load AI

Load AI is a globally inclusive, bias-audited chat intelligence. The Enter
button on the splash opens a ChatGPT-style app: Home, Chat, Voice, and
Settings, with a bottom navigation bar.

## Core rule

The Load AI Constitution lives in `constitution.js` as a single constant
(`window.LOAD_AI_CONSTITUTION`) and is injected as the system message in
**every** API call, in full, without exception. It is never shortened.

## Backend

- Provider: OpenRouter (OpenAI-compatible chat completions).
- Endpoint: `https://openrouter.ai/api/v1/chat/completions`.
- Models: user-selectable in Settings, defaulting to free (`:free`)
  models. Default `meta-llama/llama-3.3-70b-instruct:free`.
- The API key is entered by the user in Settings and stored only on the
  device under `loadai_openrouter_key`.
- Each call sends `[constitution] + [all prior turns] + [new user message]`.

## Files

- `index.html` — shell, intro, splash, four screens, bottom nav.
- `constitution.js` — the system prompt (single source of truth).
- `app.js` — routing, intro, Enter flow, appearance, offline banner, Home,
  and the shared `LoadAI.callAI()`.
- `chat.js` — chat thread, send, copy, bias-transparency note.
- `voice.js` — Web Speech input/output, language selector, waveform.
- `settings.js` — API key, model, font, theme, text size, language, data
  controls, visible constitution.
- `styles.css` — chat-app styles appended below the original styles.
- `sw.js` — offline app-shell cache (API traffic is never cached).

## localStorage keys

`loadai_openrouter_key`, `loadai_history`, `loadai_model`, `loadai_font`,
`loadai_theme`, `loadai_textsize`, `loadai_lang`.

## Prior build

The previous "Load AI Director Studio v7" image/video tool is preserved on
the branch `backup/2026-06-29-loadai-studio-v7-1-0`.
