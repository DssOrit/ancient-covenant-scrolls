# Load AI™ — placeholder site folder

This directory is the home for the future **Load AI™** standalone PWA,
the dedicated AI creation studio for the Load Eco™ ecosystem.

Structure mirrors the other Load sub-site layouts (LoadPlay, LoadTasks)
so the build can drop in without re-shaping paths later:

- `icons/`   — app icons (192x192, 512x512, maskable, monochrome).
- `splash/`  — iPad splash images per device size.
- `assets/`  — static images, fonts, audio cues.
- `css/`     — site stylesheets.
- `js/`      — site scripts.
- `data/`    — registry / state / sample JSON.

When the standalone PWA is built, drop in `index.html`, `manifest.json`,
`service-worker.js`, and the existing AI tooling will move from
`/load/tools/ai-chat-studio.html` into this folder.

Centralised branding config: `/branding.json` and `/branding.js` at the
repo root. The `LoadAI™` name maps to `branding.aiName` (added in the
next branding bump).
