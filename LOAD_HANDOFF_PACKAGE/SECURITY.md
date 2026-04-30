# Security Policy — Load (Ancient Covenant Scrolls)

## This is a public repository

Everything in this repo is visible to the entire internet, including
commit history. Treat it accordingly.

## Reporting security vulnerabilities

**Do NOT report security problems in public GitHub issues.**

If you find a security vulnerability — a leaked credential, a way to
bypass authentication, an XSS / CSRF / injection vulnerability, or
any other defect that could put users at risk — please report it
privately via GitHub's Security Advisories:

1. Open the repo's **Security** tab
2. Click **Report a vulnerability**
3. GitHub creates a private advisory only the maintainers see

Or contact the maintainer directly through their GitHub profile.

We aim to respond within 7 days.

## What MUST NOT be submitted to this repo

- API keys, tokens, passwords (any provider — OpenRouter, Hugging
  Face, Cloudflare, Google/Gemini, Puter, Replicate, Anthropic, etc.)
- `.env` files (any kind)
- Private user data, including iPad-side localStorage dumps
- Production credentials or admin bypass URLs
- Paid / copyrighted assets without explicit owner approval
- Personally-identifying information from any user
- Internal business notes the maintainer hasn't released

## How API keys are handled today

Load is a frontend-only PWA. Each user's provider API keys are stored
in **their own browser's localStorage** — never transmitted to any
backend, never logged, never committed. Each user supplies their own
keys via the in-app Settings panel.

If we add a serverless proxy in the future (see `SECURITY_PLAN.md`
task 4), provider keys will live as private environment variables on
that proxy, never in the frontend. Frontend code must never embed a
real API key.

## Pull-request security checklist

Every PR must confirm:

- [ ] No API keys / tokens / passwords added to the repo
- [ ] No `.env` file added (use `.env.example` for placeholders only)
- [ ] No provider keys exposed in frontend code
- [ ] No private user data added
- [ ] No paid / copyrighted assets added without owner approval
- [ ] App still builds and runs

## Recommended local scan before pushing

Run any of these locally before committing:

```bash
# gitleaks — pre-built leak scanner
gitleaks detect --source . -v

# trufflehog — deeper secret scanner
trufflehog filesystem .

# npm audit (if package.json present)
npm audit
```

## Branch protection

Maintainers should enable branch protection on `main` via repo
Settings → Branches:

- Require pull request before merge
- Require at least one review
- Require status checks (CodeQL) to pass
- Require conversation resolution
- Block force pushes
- Block branch deletion

## Public-repo posture

- All committed code is, by definition, public.
- All committed assets are, by definition, public.
- Users supply their own provider keys — none are bundled.
- No third-party tracking, no analytics, no telemetry.
- Service worker only caches first-party assets; never caches API
  responses.

If you're a user and want maximum privacy, pin your install to a
specific commit SHA and verify the SW + manifest yourself before
adding any API key.
