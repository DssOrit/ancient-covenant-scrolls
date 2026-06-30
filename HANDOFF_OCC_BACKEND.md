# OCC Backend — Setup Handoff

Plain steps to turn OCC from "saves only in the browser" into a **real
Cloudflare backend** (shared database + logins + file uploads).

You do these once, in the Cloudflare dashboard. No coding needed.

The code is already in the repo:
- `occ-backend/schema.sql` — the database tables
- `occ-backend/worker.js` — the API (login + data)
- `occ-backend/wrangler.toml` — config (only if you use the command line)

> Honesty note: this backend code was written but **not yet run on
> Cloudflare** (the build environment is network-blocked from Cloudflare).
> Treat it as "ready to deploy and test", not "proven live", until you
> finish Step 6 and it works.

---

## Step 0 — First, check your hosting (30 seconds)

In Cloudflare, open the dashboard and look in the left menu.

- If you see **"Workers & Pages"** and your site is listed under **Pages**
  → you are on **Cloudflare Pages**. Good.
- If you only see your **domain** under **Websites** (and your files come
  from GitHub Pages) → Cloudflare is just in **front** of GitHub.

Either way, the steps below work, because the API is a **separate Worker**.
Tell me which one you saw and I will tailor the final wiring.

---

## Step 1 — Create the database (D1)

1. Cloudflare dashboard → **Workers & Pages** → **D1** → **Create database**.
2. Name it: `occ`
3. Open it → **Console** tab.
4. Paste the whole contents of `occ-backend/schema.sql` → **Execute**.
   (This creates the tables. It is safe to run again.)

## Step 2 — Create the file store (R2) — optional

Only if you want real screenshot/video uploads.
1. Dashboard → **R2** → **Create bucket** → name it `occ-evidence`.

## Step 3 — Create the API Worker

1. Dashboard → **Workers & Pages** → **Create** → **Create Worker**.
2. Name it: `occ-api`
3. **Edit code** → delete the sample → paste all of `occ-backend/worker.js`
   → **Deploy**.

## Step 4 — Connect the bindings

In the `occ-api` Worker → **Settings** → **Variables / Bindings**:
1. **D1 database binding** → Variable name `DB` → choose database `occ`.
2. **R2 bucket binding** (if you did Step 2) → Variable name `EVIDENCE`
   → bucket `occ-evidence`.
3. **Secret** → Add → name `SETUP_SECRET` → value = a long random phrase
   you make up. Keep it private. (Used once in Step 5.)
4. **Save** and **Deploy** again.

## Step 5 — Create the first logins

This makes the Owner and Employee accounts. Replace the passwords with
real ones you choose.

Run this once (in the Worker's **Quick edit → HTTP** test, or any tool
that can POST). Send a POST to:

```
https://occ-api.<your-subdomain>.workers.dev/api/occ/setup
```

with this JSON body:

```json
{
  "secret": "THE_SETUP_SECRET_YOU_SET",
  "users": [
    { "name": "OWNER_NAME",    "role": "owner",    "title": "Owner / Admin",                         "password": "CHOOSE_OWNER_PASSWORD" },
    { "name": "EMPLOYEE_NAME", "role": "employee", "title": "Platform Quality Assurance Specialist", "password": "CHOOSE_EMPLOYEE_PASSWORD" }
  ]
}
```

You should get back `{"ok":true,"created":2}`.
After this works, you can rotate or remove `SETUP_SECRET`.

## Step 6 — Smoke test (prove it works — do NOT skip)

POST to `.../api/occ/login` with:
```json
{ "name": "EMPLOYEE_NAME", "role": "employee", "password": "CHOOSE_EMPLOYEE_PASSWORD" }
```
You should get back a `token`. If you do, the backend is live and real.

## Step 7 — (recommended) Same-origin route

So the app and API share `loadeco.app` (no cross-site setup):
- `occ-api` Worker → **Settings → Triggers → Routes → Add route**
  → `loadeco.app/api/occ/*`.

Then the API URL becomes `https://loadeco.app/api/occ/...`.

---

## Step 8 — Tell me the API URL, then I wire the app

Give me the working API base (either the `…workers.dev` URL or
`https://loadeco.app/api/occ`). I will then update `occ.html` to use the
backend, with a safe fall-back to the current browser-only mode so nothing
breaks while we switch over.

---

## What is real vs not (no false claims)
- Real once deployed: shared database, logins, owner/employee roles, file
  uploads (if R2 bound).
- Not built yet: email notifications, password reset screen, multi-employee
  admin UI. Easy to add later.

## Security reminders
- Never paste `SETUP_SECRET` or passwords into chat or the repo.
- Make your Cloudflare API token **scoped** (Workers + D1 + R2 only).
- Keep the GitHub repo — it is your master source. Do not delete it.
