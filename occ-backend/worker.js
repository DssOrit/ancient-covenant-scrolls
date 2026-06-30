/* ===========================================================================
 * OCC — Operations Command Center : Cloudflare Worker API
 * ---------------------------------------------------------------------------
 * Standalone Worker. Works regardless of how the front-end is hosted
 * (Cloudflare Pages OR Cloudflare in front of GitHub Pages), because the
 * front-end just calls this Worker's URL.
 *
 * Bindings required (set in the Cloudflare dashboard or wrangler.toml):
 *   - DB        : D1 database (run schema.sql against it first)
 *   - EVIDENCE  : R2 bucket (for uploaded screenshots/videos)   [optional]
 *   - SETUP_SECRET : a secret string, used ONCE to create the first users
 *
 * Auth: username + password (PBKDF2-HMAC-SHA256). Login returns a bearer
 * token stored in the `sessions` table. The front-end sends it back as
 * `Authorization: Bearer <token>`.
 *
 * NOTE: This file has NOT been run against Cloudflare from the build
 * environment (network-blocked). Deploy + smoke-test per HANDOFF before
 * trusting it in production. No false-positive completion claims.
 * =========================================================================== */

const JSON_HEADERS = { 'Content-Type': 'application/json' };

function cors(origin) {
  return {
    'Access-Control-Allow-Origin': origin || '*',
    'Access-Control-Allow-Methods': 'GET,POST,PATCH,DELETE,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type,Authorization',
    'Access-Control-Max-Age': '86400'
  };
}
function json(data, status, origin) {
  return new Response(JSON.stringify(data), {
    status: status || 200,
    headers: { ...JSON_HEADERS, ...cors(origin) }
  });
}
function uid(prefix) {
  return (prefix || 'id') + '_' + crypto.randomUUID().replace(/-/g, '').slice(0, 16);
}
function b64(buf) { return btoa(String.fromCharCode.apply(null, new Uint8Array(buf))); }
function fromB64(s) { return Uint8Array.from(atob(s), c => c.charCodeAt(0)); }

/* ---- password hashing (PBKDF2-HMAC-SHA256, 100k iterations) ---- */
async function hashPassword(password, saltB64) {
  const salt = saltB64 ? fromB64(saltB64) : crypto.getRandomValues(new Uint8Array(16));
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveBits']);
  const bits = await crypto.subtle.deriveBits({ name: 'PBKDF2', salt, iterations: 100000, hash: 'SHA-256' }, key, 256);
  return { hash: b64(bits), salt: b64(salt) };
}
async function verifyPassword(password, saltB64, hashB64) {
  const { hash } = await hashPassword(password, saltB64);
  // constant-time-ish compare
  if (hash.length !== hashB64.length) return false;
  let diff = 0;
  for (let i = 0; i < hash.length; i++) diff |= hash.charCodeAt(i) ^ hashB64.charCodeAt(i);
  return diff === 0;
}

/* ---- auth helpers ---- */
async function userFromToken(env, req) {
  const auth = req.headers.get('Authorization') || '';
  const token = auth.replace(/^Bearer\s+/i, '').trim();
  if (!token) return null;
  const row = await env.DB.prepare(
    'SELECT u.* FROM sessions s JOIN users u ON u.id = s.user_id WHERE s.token = ? AND s.expires_at > ?'
  ).bind(token, new Date().toISOString()).first();
  return row || null;
}

/* ---- route handlers ---- */
async function handle(req, env, origin) {
  const url = new URL(req.url);
  const path = url.pathname.replace(/\/+$/, '');
  const seg = path.split('/').filter(Boolean); // e.g. ['api','occ','issues']
  const method = req.method;
  const body = (method === 'POST' || method === 'PATCH')
    ? await req.json().catch(() => ({})) : {};

  // ---- one-time setup: create initial users (guarded by SETUP_SECRET) ----
  if (method === 'POST' && path.endsWith('/api/occ/setup')) {
    if (!env.SETUP_SECRET || body.secret !== env.SETUP_SECRET) return json({ error: 'forbidden' }, 403, origin);
    const list = Array.isArray(body.users) ? body.users : [];
    for (const u of list) {
      const { hash, salt } = await hashPassword(u.password);
      await env.DB.prepare(
        'INSERT OR REPLACE INTO users (id,name,role,title,pass_hash,pass_salt,created_at) VALUES (?,?,?,?,?,?,?)'
      ).bind(uid('usr'), u.name, u.role, u.title || '', hash, salt, new Date().toISOString()).run();
    }
    return json({ ok: true, created: list.length }, 200, origin);
  }

  // ---- login ----
  if (method === 'POST' && path.endsWith('/api/occ/login')) {
    const u = await env.DB.prepare('SELECT * FROM users WHERE name = ? AND role = ?')
      .bind((body.name || '').trim(), body.role).first();
    if (!u || !(await verifyPassword(body.password || '', u.pass_salt, u.pass_hash)))
      return json({ error: 'invalid credentials' }, 401, origin);
    const token = crypto.randomUUID() + crypto.randomUUID();
    const expires = new Date(Date.now() + 7 * 24 * 3600 * 1000).toISOString();
    await env.DB.prepare('INSERT INTO sessions (token,user_id,expires_at) VALUES (?,?,?)')
      .bind(token, u.id, expires).run();
    return json({ token, user: { name: u.name, role: u.role, title: u.title } }, 200, origin);
  }

  // everything below requires a valid session
  const me = await userFromToken(env, req);
  if (!me) return json({ error: 'unauthorized' }, 401, origin);
  const owner = me.role === 'owner';

  if (method === 'POST' && path.endsWith('/api/occ/logout')) {
    const token = (req.headers.get('Authorization') || '').replace(/^Bearer\s+/i, '').trim();
    await env.DB.prepare('DELETE FROM sessions WHERE token = ?').bind(token).run();
    return json({ ok: true }, 200, origin);
  }

  // ---- bootstrap: everything the app needs in one call ----
  if (method === 'GET' && path.endsWith('/api/occ/bootstrap')) {
    const [assignments, checklist, issues, evidence, messages, alerts] = await Promise.all([
      env.DB.prepare('SELECT * FROM assignments').all(),
      env.DB.prepare('SELECT * FROM checklist ORDER BY day, idx').all(),
      env.DB.prepare('SELECT * FROM issues ORDER BY created_at DESC').all(),
      env.DB.prepare('SELECT * FROM evidence ORDER BY created_at DESC').all(),
      env.DB.prepare('SELECT * FROM messages ORDER BY created_at DESC').all(),
      env.DB.prepare('SELECT * FROM alerts ORDER BY created_at DESC').all()
    ]);
    return json({
      me: { name: me.name, role: me.role, title: me.title },
      assignments: assignments.results, checklist: checklist.results,
      issues: issues.results, evidence: evidence.results,
      messages: messages.results, alerts: alerts.results
    }, 200, origin);
  }

  const last = seg[seg.length - 1];

  // ---- issues ----
  if (path.includes('/api/occ/issues')) {
    if (method === 'POST') {
      const id = uid('iss');
      await env.DB.prepare(
        'INSERT INTO issues (id,title,site,page,browser,device,steps,expected,actual,severity,status,shot,notes,created_by,created_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)'
      ).bind(id, body.title, body.site, body.page, body.browser, body.device, body.steps,
             body.expected, body.actual, body.severity, 'New', body.shot, body.notes,
             me.name, new Date().toISOString()).run();
      return json({ ok: true, id }, 200, origin);
    }
    if (method === 'PATCH') { // owner updates status
      if (!owner) return json({ error: 'owner only' }, 403, origin);
      await env.DB.prepare('UPDATE issues SET status = ? WHERE id = ?').bind(body.status, last).run();
      return json({ ok: true }, 200, origin);
    }
  }

  // ---- messages ----
  if (path.endsWith('/api/occ/messages') && method === 'POST') {
    await env.DB.prepare(
      'INSERT INTO messages (id,sender,sender_role,recipient,priority,assignment,body,created_at) VALUES (?,?,?,?,?,?,?,?)'
    ).bind(uid('msg'), me.name, me.role, body.recipient, body.priority, body.assignment, body.body, new Date().toISOString()).run();
    return json({ ok: true }, 200, origin);
  }

  // ---- alerts ----
  if (path.endsWith('/api/occ/alerts') && method === 'POST') {
    await env.DB.prepare(
      'INSERT INTO alerts (id,what,site,browser,device,urgency,shot,notes,created_by,created_at) VALUES (?,?,?,?,?,?,?,?,?,?)'
    ).bind(uid('al'), body.what, body.site, body.browser, body.device, body.urgency, body.shot, body.notes, me.name, new Date().toISOString()).run();
    return json({ ok: true }, 200, origin);
  }

  // ---- evidence metadata ----
  if (path.endsWith('/api/occ/evidence') && method === 'POST') {
    await env.DB.prepare(
      'INSERT INTO evidence (id,shot,video,issue,browser,device,notes,r2_key,created_by,created_at) VALUES (?,?,?,?,?,?,?,?,?,?)'
    ).bind(uid('ev'), body.shot, body.video, body.issue, body.browser, body.device, body.notes, body.r2_key || '', me.name, new Date().toISOString()).run();
    return json({ ok: true }, 200, origin);
  }

  // ---- evidence FILE upload to R2 ----
  if (path.endsWith('/api/occ/evidence/upload') && method === 'POST') {
    if (!env.EVIDENCE) return json({ error: 'R2 bucket not bound' }, 501, origin);
    const form = await req.formData();
    const file = form.get('file');
    if (!file) return json({ error: 'no file' }, 400, origin);
    const key = 'evidence/' + Date.now() + '_' + (file.name || 'file');
    await env.EVIDENCE.put(key, file.stream());
    await env.DB.prepare(
      'INSERT INTO evidence (id,shot,video,issue,browser,device,notes,r2_key,created_by,created_at) VALUES (?,?,?,?,?,?,?,?,?,?)'
    ).bind(uid('ev'), file.name || '', '', form.get('issue') || '', form.get('browser') || '', form.get('device') || '', form.get('notes') || '', key, me.name, new Date().toISOString()).run();
    return json({ ok: true, key }, 200, origin);
  }

  // ---- assignments ----
  if (path.includes('/api/occ/assignments')) {
    if (method === 'PATCH') { // owner edit
      if (!owner) return json({ error: 'owner only' }, 403, origin);
      await env.DB.prepare(
        'UPDATE assignments SET status=?, bonus=?, owner_notes=?, approved_date=COALESCE(approved_date,?), paid_date=COALESCE(paid_date,?) WHERE id=?'
      ).bind(body.status, body.bonus || 0, body.owner_notes || '',
             body.status === 'Approved' ? new Date().toISOString() : null,
             body.status === 'Paid' ? new Date().toISOString() : null, last).run();
      return json({ ok: true }, 200, origin);
    }
    if (method === 'POST' && last === 'submit') { // employee submit (…/assignments/:id/submit)
      const aid = seg[seg.length - 2];
      await env.DB.prepare('UPDATE assignments SET status=?, submitted_date=? WHERE id=?')
        .bind('Submitted', new Date().toISOString(), aid).run();
      return json({ ok: true }, 200, origin);
    }
  }

  // ---- checklist toggle ----
  if (path.endsWith('/api/occ/checklist') && method === 'PATCH') {
    await env.DB.prepare('UPDATE checklist SET done=? WHERE id=?').bind(body.done ? 1 : 0, body.id).run();
    return json({ ok: true }, 200, origin);
  }

  return json({ error: 'not found' }, 404, origin);
}

export default {
  async fetch(req, env) {
    const origin = req.headers.get('Origin') || '*';
    if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors(origin) });
    try {
      return await handle(req, env, origin);
    } catch (err) {
      return json({ error: 'server error', detail: String(err && err.message || err) }, 500, origin);
    }
  }
};
