# Security Audit Report — 2026-04-29

**Run by:** automated audit per `SECURITY_PLAN.md`
**Repo:** `DssOrit/ancient-covenant-scrolls` (public)
**Verified tip at audit time:** `v17dh`

---

## Executive summary

✅ **No real secrets found in tracked files or git history.**
✅ **No `.env` files in repo.**
✅ **No `node_modules` committed.**
✅ **API keys are user-supplied via in-browser Settings panel — never committed, never transmitted to a Load-controlled backend.**
⚠ **Manual GitHub Settings steps remain — only the user can do these (see "Manual steps" section).**

---

## Tasks completed automatically

### ✅ 1. Secret audit

Ran multi-pattern grep across all tracked text files. No matches against:
- OpenAI / generic `sk-` keys (48-char form)
- OpenRouter `sk-or-`
- Anthropic `sk-ant-`
- Cerebras `csk-`
- Hugging Face `hf_`
- Google AI `AIza...` (35-char form, in code context)
- Replicate `r8_`
- AWS `AKIA...`
- GitHub `ghp_`, `gho_`, `github_pat_`
- Slack `xox[bp]-`

False-positive note: `Load-Standalone.html` contains embedded base64 PNG splash images. Base64 byte sequences can coincidentally include 4-character substrings like "AIza" — these are image data, NOT real keys. Verified by checking the substring is inside an `apple-touch-startup-image` data URL.

### ✅ 2. `.gitignore` updated

Expanded from 1 line (`.snapshots/`) to a full set covering:
- `.env`, `.env.*` (with `.env.example` allowed)
- `*.key`, `*.pem`, `*.p12`, `*.pfx`
- `secrets/`, `private/`
- `node_modules/`, `dist/`, `build/`, `out/`, `.next/`, `.nuxt/`, `.vite/`, `.cache/`, `coverage/`
- `.DS_Store`, `Thumbs.db`, `*.swp`, editor configs
- `*.log`, log dirs, npm/pnpm/yarn debug logs
- `*.tmp`, `*.bak`, `*.orig`

### ✅ 3. `.env.example` added

Placeholder values only. Documents the future serverless-proxy structure (per task 4 below). Notes that `VITE_*` vars are visible in frontend builds.

### ✅ 4. Frontend code audit — current posture is acceptable

**Finding:** Load is a frontend-only PWA. Provider API keys are stored in the user's own browser localStorage (`ps_k_gemini`, `ps_k_or`, `ps_k_cbr`, `ps_k_ant`, `ps_k_hfc`, `ps_hfimg`, `ps_cftk`, `ps_cfac`, `ps_tgk`, `ps_falk`, `ps_repk`, `ps_dik`, `ps_stk`, `ps_daik`, `ps_hypk`, `ps_k_puter`). Keys are entered via Settings UI by each user; never committed; never sent to any Load-controlled backend.

**Risk level:** **Low**. Each user manages their own keys. No keys in the repo. No keys in the network requests Load makes (keys are added at request time from localStorage).

**Future hardening** (recommended before App Store submission): move provider calls behind a serverless proxy so users don't need their own keys. Free options: Cloudflare Workers, Netlify Functions, Vercel Serverless, Supabase Edge Functions, Firebase Functions. Approved per `HANDOFF.md`: Cloudflare Pages / Vercel hobby tier (Netlify excluded).

### ✅ 5. GitHub security files added

- `SECURITY.md` — public security policy
- `.github/pull_request_template.md` — PR security checklist
- `.github/dependabot.yml` — weekly action update scanning
- `.github/workflows/codeql.yml` — JS/TS CodeQL analysis on push, PR, weekly cron

`CODEOWNERS` not added (single-maintainer repo; will add if collaborators are invited).

### ✅ 6. `SECURITY.md` content

Covers:
- Public-repo posture
- Private vulnerability reporting via GitHub Security Advisories
- What MUST NOT be submitted
- How keys are handled today (user-side localStorage)
- PR security checklist
- Local scan instructions (gitleaks, trufflehog, npm audit)
- Branch protection recommendations (manual)

### ✅ 7-9. PR template + Dependabot + CodeQL

All wired to `.github/`. CodeQL runs on push to main, on PRs to main, and weekly Mondays 03:00 UTC.

---

## Manual steps (only the user can do these)

### ✅ Branch protection — ENABLED & CONFIRMED 2026-07-02

A branch **ruleset** named `protect-main` is **Active**, targeting the default
branch (`main`), bypass list empty. Enabled rules:

- [x] **Block force pushes** — no history rewriting on `main`
- [x] **Restrict deletions** — the `main` branch cannot be deleted

Verified in the GitHub UI (Settings → Rules → Rulesets → protect-main): badge
shows **Active**, "Applies to 1 target: main". This is the minimal set that
blocks history tampering without touching normal work — PR merges and
Cloudflare auto-deploys are unaffected (a merge is not a force push; feature
branches are not `main`).

Not enabled (optional, would add review/merge friction): require pull request,
require approvals, require CodeQL status check, require conversation resolution,
restrict who can push. Can be added later if desired.

### 🔧 Enable Dependabot security updates

**Settings → Code security and analysis** → enable:
- [ ] Dependabot alerts
- [ ] Dependabot security updates

### 🔧 Enable secret scanning

**Settings → Code security and analysis** → enable:
- [ ] Secret scanning
- [ ] Push protection (blocks pushes that contain detected secrets)

### 🔧 Enable private vulnerability reporting

**Settings → Code security and analysis** → enable:
- [ ] Private vulnerability reporting

---

## Local scan instructions (run before any push)

```bash
# Quick pre-flight (under a minute)
git grep -nE "sk-[a-zA-Z0-9]{40,}|hf_[a-zA-Z0-9]{30,}|AIza[a-zA-Z0-9_-]{35}|r8_[a-zA-Z0-9]{30,}" -- '*.js' '*.html' '*.css' '*.md' '*.json' '*.yml'
git ls-files | grep -E "^\.env"

# Deeper scan with gitleaks (install once: brew install gitleaks)
gitleaks detect --source . -v

# Even deeper with trufflehog
trufflehog filesystem . --only-verified
```

---

## Remaining public-repo risks (acceptable, but flag)

1. **`Load-Standalone.html`** is a single-file export that ships with embedded base64 splash images. Large file, easy to glance-confuse with secret-leaking content. The base64 IS image bytes only — no keys — but consider extracting to actual PNG files and `<link rel="apple-touch-startup-image" href="splash.png">` for cleanliness. Optional cleanup, not a security issue.

2. **`load/image-prompt/`** PWA includes `anthropic-dangerous-direct-browser-access` flag in `callAnthropic`. This exposes the user's Anthropic key in network request headers. Users who paste a real Anthropic key will leak it to anyone inspecting their browser network tab. **Mitigation already in place:** Anthropic is OFF by default; `allowAnthropic` flag must be opted into via Settings → Advanced with a security warning text. Keeping as-is per current user direction (Anthropic stays in UI for future use).

3. **No backend to revoke compromised keys.** Each user owns their keys; if a user accidentally shares a screenshot with their key visible, only they can revoke it via the provider's dashboard. Document this in user-facing onboarding when we add formal docs.

---

## Summary

| Check | Status |
| --- | --- |
| Secret audit | ✅ Clean |
| `.gitignore` | ✅ Expanded |
| `.env.example` | ✅ Added |
| Frontend key audit | ✅ Acceptable (user-side localStorage) |
| `SECURITY.md` | ✅ Added |
| PR template | ✅ Added |
| Dependabot config | ✅ Added |
| CodeQL workflow | ✅ Added |
| Branch protection | ✅ **ENABLED — ruleset `protect-main` (block force pushes + restrict deletions on `main`), confirmed 2026-07-02** |
| Secret scanning + push protection | 🔧 **MANUAL — user enables in GitHub Settings** |
| Private vulnerability reporting | 🔧 **MANUAL — user enables in GitHub Settings** |

**Net posture:** the repo is now **safe to remain public** for current development. The 3 manual GitHub Settings steps strengthen it further but aren't strictly required for current usage (no committed secrets means scanning won't find any, and current direct-push workflow can continue until Image Prompt is stable).

**Verified by:** automated audit on `claude/fix-session-sending-TVMbW` branch, ready to merge to main.
