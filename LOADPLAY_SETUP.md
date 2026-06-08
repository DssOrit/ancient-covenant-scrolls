# loadplay.app — Cloudflare Setup Handoff

## What this is

Adding a third custom domain to an existing Cloudflare Pages project.
The Pages project already serves `acrscrolls.com` and `loadeco.app`.
This adds `loadplay.app` to the same project — no new project needed.

---

## Cloudflare account

- **Email:** vintageandmore71@gmail.com
- **Dashboard:** dash.cloudflare.com

---

## Step 1 — Add loadplay.app to the Pages project

1. Log in to dash.cloudflare.com
2. In the left sidebar, click **Workers & Pages**
3. Find the project named **ancient-covenant-scrolls** and click it
4. Click the **Custom domains** tab
5. Click **Set up a custom domain**
6. Type `loadplay.app` and click **Continue**
7. Cloudflare will show two nameservers — write them down (they look like `xxx.ns.cloudflare.com`)

---

## Step 2 — Update nameservers in Namecheap

1. Log in to Namecheap
2. Go to **Domain List** and click **Manage** next to `loadplay.app`
3. Under **Nameservers**, switch from "Namecheap BasicDNS" to **Custom DNS**
4. Enter the two Cloudflare nameservers from Step 1
5. Save

DNS propagation takes a few minutes to 24 hours (usually under 1 hour).

---

## Step 3 — Confirm it is active

Back in Cloudflare, the Custom domains tab for the Pages project will show
`loadplay.app` as **Active** once propagation is complete.

---

## What loadplay.app is for

`loadplay.app` is for the **AA Series books only**. It is not related to the
Load Play app, which lives separately at `loadeco.app/LoadPlay/`.

| URL | Content |
|---|---|
| `https://loadplay.app/AAseries/` | AA Series books |

A redirect rule can be added so that `loadplay.app/` (root) forwards directly
to `loadplay.app/AAseries/` — the same way `loadeco.app/` forwards to `/load/`.

---

## Notes

- No new Pages project is needed — just add the domain to the existing one
- The GitHub repo will be set to private after this is done
- Cloudflare Pages reads private repos at no cost — all sites stay live
- `dssorit.github.io` will stop working once the repo is private, but the
  custom domains (acrscrolls.com, loadeco.app, loadplay.app) are unaffected
