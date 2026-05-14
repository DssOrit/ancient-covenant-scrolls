# Load AI PWA v2.0 Cinema Prompt Display

Standalone repo-ready PWA.

## Built features

- Orange and black Load AI brand direction.
- Splash front screen with approved orange/black image.
- PWA icon set with approved orange/black icon.
- Chat-style large prompt composer.
- Prompt tool modes: Image, Scene, Edit, Handoff.
- Large Image Display panel.
- Large Movie Screen Scene Review panel.
- Scene prompt cards.
- Step-by-step Visual Guide cards.
- Prompt Library with saved drafts.
- Session JSON export.
- Handoff TXT export.
- Scene JSON export.
- Offline service worker.
- LocalStorage persistence.

## Upload to GitHub

Upload the full contents into a repo folder such as `/loadai/`.

## Acceptance tests

PASS if index.html opens as a site, splash appears first, Enter opens Load AI, Prompt Studio works, mode buttons switch, Use Template fills the prompt box, Create Preview adds chat output, Image Display shows prompt text, Scene Review displays prompt on movie screen, scene cards render, Save Draft adds Library item, Visual Guide cards render, and exports download files.

FAIL if the app opens as code, splash is missing, buttons do nothing, prompt previews claim live generation, or any output is marked generated without a real file, blob, URL, or provider response.

## Known limitation

This MVP is interface and workflow ready. It does not connect to live AI providers yet. Provider routing should be added later through free, local-first, or open routes first.
