# Load Fit — placeholder

**Status: not built yet.** This folder is a reserved home in the repo for
Load Fit, a new app in the Load family. No code lives here yet.

## How this gets filled in

1. ChatGPT builds Load Fit outside this repo.
2. The user hands the finished build to Claude for review.
3. Claude reviews it against this repo's standing rules (see below), fixes
   or flags anything that doesn't fit, and places the reviewed files into
   this folder — following the same backup -> verify -> apply -> merge-link
   sequence used for every other change in this repo.
4. Once placed, this README is replaced with the app's real one, and Load
   Fit gets added to `MASTER_BACKLOG.md`'s Load apps table alongside Load,
   LoadAI, LoadPlay, LoadStudio, LoadTasks, and Load Maps.

## What the review checks for, going in

Matching the conventions every other app in this repo already follows:

- **No emoji** anywhere — code, UI strings, comments. SVG icons or plain
  text only.
- **Offline-first PWA shape**: its own `index.html`, `manifest.json`, and a
  service worker with its own cache-prefix (e.g. `loadfit-`) — never
  reusing another app's cache name or SW scope.
- **Scoped hard refresh only**: any cache-clear / SW-unregister control
  filters to Load Fit's own cache prefix and scope path. Never a global
  wipe (this has broken other apps on this origin before).
- **Cache version discipline**: once shipped, the cache string only ever
  moves forward, never decrements.
- **No external product names** in user-facing labels.
- **No secrets or user data committed** — anything like that goes in
  Cloudflare env vars / D1, never into this repo, even though the repo
  itself stays public.

## Before this folder is touched for real

Per this repo's standing rules, nothing gets written here for real without:
a SHA-verified backup branch first, a no-break-risk check, then the apply,
then a merge link sent to the user to merge themselves. Same process as
every other shipping change in this repo.
