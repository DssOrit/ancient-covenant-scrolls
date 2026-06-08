# Cloudflare Setup Handoff

## Goal

Connect two custom domains to the existing GitHub repo so both serve the live site with Cloudflare CDN, SSL, and DDoS protection.

---

## Repo details

- **GitHub account:** DssOrit
- **Repo:** `DssOrit/ancient-covenant-scrolls`
- **Current live site:** `https://dssorit.github.io/ancient-covenant-scrolls`
- **Hosted by:** GitHub Pages, serving from the `main` branch
- **Site type:** Static site — pure HTML/CSS/JS, no build step, no package.json

---

## Domains

| Domain | Purpose | Registrar |
|---|---|---|
| `acrscrolls.com` | ACR suite — ACR Reader, ACR2, ACR Search, ACR Solar, ACR Study, WSA, Great Eraser | Namecheap |
| `loadeco.app` | Load suite — Load, Load Studio, Load Play, Load Tasks, Load AI, Attain, Attain Jr | Namecheap |

Both domains are currently registered on **Namecheap** and not yet connected to anything.

---

## What needs to be built

### One Cloudflare Pages project

Create a single Cloudflare Pages project connected to the GitHub repo. Both custom domains attach to the same project. The repo root serves the full site.

**Project settings:**
- Repository: `DssOrit/ancient-covenant-scrolls`
- Production branch: `main`
- Build command: **leave blank** (no build step — static site)
- Build output directory: **leave blank** (serve from repo root)
- Framework preset: **None**

### Two custom domains on that project

After the Pages project is created and deployed:

1. Add `acrscrolls.com` as a custom domain
2. Add `loadeco.app` as a custom domain

Cloudflare will provide two nameservers for each domain (e.g. `ada.ns.cloudflare.com`, `bob.ns.cloudflare.com`). These nameservers need to be set in Namecheap for each domain respectively.

### One redirect rule

`loadeco.app` serves the full repo at root, which means its homepage currently shows the ACR Reader. A single redirect rule is needed so `loadeco.app` root routes visitors to the Load app:

- **Rule:** `loadeco.app/` (root only) → `loadeco.app/load/` (301 redirect)
- This can be set as a Cloudflare Redirect Rule or Page Rule on the `loadeco.app` domain

`acrscrolls.com` needs no redirect — the ACR Reader lives at the repo root.

---

## Files already in the repo

A `_redirects` file is already committed at the repo root. This handles path-based redirects within Cloudflare Pages (e.g. bare paths like `/load` → `/load/`). It is ignored by GitHub Pages so it is safe to leave in the repo.

---

## Namecheap steps (for each domain)

After Cloudflare generates nameservers for each domain:

1. Log in to Namecheap
2. Go to Domain List → click Manage on the domain
3. Under Nameservers, switch from "Namecheap BasicDNS" to "Custom DNS"
4. Enter the two Cloudflare nameservers provided
5. Save — DNS propagation takes up to 24 hours but is usually under 1 hour

Repeat for both domains.

---

## Result after setup

| URL | What it shows |
|---|---|
| `https://acrscrolls.com` | ACR Reader (same as repo root) |
| `https://acrscrolls.com/Search/` | ACR Search |
| `https://acrscrolls.com/ACR2/` | ACR2 |
| `https://acrscrolls.com/Solar/` | ACR Solar |
| `https://acrscrolls.com/study/` | ACR Study |
| `https://acrscrolls.com/WSA/` | When Sharks Attack |
| `https://acrscrolls.com/GreatE/` | The Great Eraser |
| `https://loadeco.app` | Redirects to `loadeco.app/load/` |
| `https://loadeco.app/load/` | Load |
| `https://loadeco.app/loadstudio/` | Load Studio |
| `https://loadeco.app/LoadPlay/` | Load Play |
| `https://loadeco.app/attain/` | Attain |
| `https://loadeco.app/attain-jr/` | Attain Jr |

---

## Notes

- The Cloudflare account is already created at `dash.cloudflare.com` under `vintageandmore71@gmail.com`
- GitHub is already authorized on that Cloudflare account (completed during setup session)
- The repo is public, so no GitHub token is required for Cloudflare to read it
- Do NOT enable "Always use HTTPS" redirect on GitHub Pages side — Cloudflare handles SSL
- Cloudflare free plan is sufficient for this setup
