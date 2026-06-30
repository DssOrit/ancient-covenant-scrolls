/* ===========================================================================
 * OCC API — Cloudflare Pages Function
 * Auto-deploys with the site (no manual paste). Serves /api/occ/* on the
 * same domain as the front-end, so no CORS setup is needed.
 *
 * Bindings to set on the Pages project (Settings -> Functions):
 *   - DB            : D1 database  (the `occ` database you created)
 *   - EVIDENCE      : R2 bucket    (optional, for file uploads)
 *   - SETUP_SECRET  : secret text  (used once to create the first users)
 *
 * Auth: username + password (PBKDF2-HMAC-SHA256). Login returns a bearer
 * token stored in the `sessions` table.
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
  return new Response(JSON.stringify(data), { status: status || 200, headers: { ...JSON_HEADERS, ...cors(origin) } });
}
function uid(p) { return (p || 'id') + '_' + crypto.randomUUID().replace(/-/g, '').slice(0, 16); }
function b64(buf) { return btoa(String.fromCharCode.apply(null, new Uint8Array(buf))); }
function fromB64(s) { return Uint8Array.from(atob(s), c => c.charCodeAt(0)); }

async function hashPassword(password, saltB64) {
  const salt = saltB64 ? fromB64(saltB64) : crypto.getRandomValues(new Uint8Array(16));
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveBits']);
  const bits = await crypto.subtle.deriveBits({ name: 'PBKDF2', salt, iterations: 100000, hash: 'SHA-256' }, key, 256);
  return { hash: b64(bits), salt: b64(salt) };
}
async function verifyPassword(password, saltB64, hashB64) {
  const { hash } = await hashPassword(password, saltB64);
  if (hash.length !== hashB64.length) return false;
  let diff = 0;
  for (let i = 0; i < hash.length; i++) diff |= hash.charCodeAt(i) ^ hashB64.charCodeAt(i);
  return diff === 0;
}
async function userFromToken(env, req) {
  const token = (req.headers.get('Authorization') || '').replace(/^Bearer\s+/i, '').trim();
  if (!token) return null;
  return await env.DB.prepare('SELECT u.* FROM sessions s JOIN users u ON u.id = s.user_id WHERE s.token = ? AND s.expires_at > ?')
    .bind(token, new Date().toISOString()).first();
}

const SEED_DAYS = [
  { day: 1, items: ['Open https://loadeco.app on Windows Chrome','Confirm homepage loads','Take homepage screenshot','List every visible menu','List every visible section','List every visible tile/card','List every major page discovered','Record notes','Repeat basic access on iPad Safari if available'] },
  { day: 2, items: ['Click every visible menu item','Click every visible button','Verify destination loads','Record broken links','Record dead buttons','Mark each item Working, Broken, Confusing, or Needs Retest','Screenshot broken or confusing areas'] },
  { day: 3, items: ['Pretend you are a brand-new visitor','Write what the site appears to be','Write whether the next step is clear','Write what is confusing','Write what instructions are missing','Write what would help a new user','Rate overall clarity 1 to 10'] },
  { day: 4, items: ['Test in Windows Chrome','Test in Windows Edge','Test on iPad Safari','Record layout differences','Record browser-only issues','Record mobile problems','Record desktop problems','Take screenshots of differences'] },
  { day: 5, items: ['Submit site inventory','Submit issue list','Submit browser comparison','Submit top 10 improvement suggestions','Submit release-readiness score','Submit screenshot/video evidence list','Mark assignment ready for owner review'] }
];

const SEED_SECTIONS = ['Homepage loads','Main navigation menu','Each menu link opens','Mobile / iPad layout','Sign-in / gate (if any)','Footer links'];

const SEED_SITES = [
  { id: 'asg_eco',    site: 'https://loadeco.app',               name: 'Load Eco' },
  { id: 'asg_studio', site: 'https://loadeco.app/loadstudio/',   name: 'Load Studio' },
  { id: 'asg_play',   site: 'https://loadeco.app/LoadPlay/',     name: 'Load Play' },
  { id: 'asg_ai',     site: 'https://loadeco.app/LoadAI/',       name: 'Load AI' }
];
async function ensureSeed(env) {
  const c = await env.DB.prepare('SELECT COUNT(*) AS n FROM assignments').first();
  if (c && c.n > 0) return;
  const stmts = [];
  SEED_SITES.forEach(s => {
    stmts.push(env.DB.prepare('INSERT INTO assignments (id,title,site,worker,week,pay,bonus,goal,status,submitted_date,approved_date,paid_date,owner_notes,invoice_submitted,invoice_submitted_date) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,0,?)')
      .bind(s.id, s.name + ' — Full Section Verification', s.site, 'Witness Bond', 1, 60, 0,
        'Verify that EVERY section, button and link of ' + s.name + ' works before it goes public. Mark each Works or Broken with evidence. You verify and report (you do not fix); broken items become Issues for the owner to fix, then you retest. Not ready for sale until every section is verified Working and the owner approves.',
        'Not Started', '', '', '', '', ''));
    SEED_SECTIONS.forEach((name, i) => {
      stmts.push(env.DB.prepare('INSERT INTO sections (id,site,name,status,evidence,notes,owner_ok,verified_at,updated_by) VALUES (?,?,?,?,?,?,0,?,?)')
        .bind('sec_' + s.id + '_' + i, s.site, name, 'Untested', '', '', '', ''));
    });
  });
  SEED_DAYS.forEach(d => d.items.forEach((label, idx) => {
    stmts.push(env.DB.prepare('INSERT INTO checklist (id,assignment_id,day,idx,label,done) VALUES (?,?,?,?,?,0)')
      .bind('ck_' + d.day + '_' + idx, 'asg_eco', d.day, idx, label));
  }));
  await env.DB.batch(stmts);
}

async function handle(req, env, origin) {
  const url = new URL(req.url);
  const path = url.pathname.replace(/\/+$/, '');
  const seg = path.split('/').filter(Boolean);
  const method = req.method;
  const body = (method === 'POST' || method === 'PATCH') ? await req.json().catch(() => ({})) : {};
  const last = seg[seg.length - 1];

  if (method === 'GET' && path.endsWith('/api/occ/ping')) return json({ ok: true, hasDB: !!env.DB }, 200, origin);

  if (method === 'POST' && path.endsWith('/api/occ/setup')) {
    if (!env.SETUP_SECRET || body.secret !== env.SETUP_SECRET) return json({ error: 'forbidden' }, 403, origin);
    const list = Array.isArray(body.users) ? body.users : [];
    for (const u of list) {
      const { hash, salt } = await hashPassword(u.password);
      await env.DB.prepare('INSERT OR REPLACE INTO users (id,name,role,title,pass_hash,pass_salt,created_at) VALUES (?,?,?,?,?,?,?)')
        .bind(uid('usr'), u.name, u.role, u.title || '', hash, salt, new Date().toISOString()).run();
    }
    return json({ ok: true, created: list.length }, 200, origin);
  }

  if (method === 'POST' && path.endsWith('/api/occ/login')) {
    const u = await env.DB.prepare('SELECT * FROM users WHERE name = ? AND role = ?').bind((body.name || '').trim(), body.role).first();
    if (!u || !(await verifyPassword(body.password || '', u.pass_salt, u.pass_hash))) return json({ error: 'invalid credentials' }, 401, origin);
    const token = crypto.randomUUID() + crypto.randomUUID();
    const expires = new Date(Date.now() + 7 * 24 * 3600 * 1000).toISOString();
    await env.DB.prepare('INSERT INTO sessions (token,user_id,expires_at) VALUES (?,?,?)').bind(token, u.id, expires).run();
    return json({ token, user: { name: u.name, role: u.role, title: u.title } }, 200, origin);
  }

  const me = await userFromToken(env, req);
  if (!me) return json({ error: 'unauthorized' }, 401, origin);
  const owner = me.role === 'owner';

  if (method === 'POST' && path.endsWith('/api/occ/logout')) {
    const token = (req.headers.get('Authorization') || '').replace(/^Bearer\s+/i, '').trim();
    await env.DB.prepare('DELETE FROM sessions WHERE token = ?').bind(token).run();
    return json({ ok: true }, 200, origin);
  }

  if (method === 'GET' && path.endsWith('/api/occ/bootstrap')) {
    await ensureSeed(env);
    const [a, c, i, e, m, al, sec] = await Promise.all([
      env.DB.prepare('SELECT id,title,site,worker,week,pay,bonus,goal,status, submitted_date AS submittedDate, approved_date AS approvedDate, paid_date AS paidDate, owner_notes AS ownerNotes, invoice_submitted AS invoiceSubmitted, invoice_submitted_date AS invoiceSubmittedDate FROM assignments').all(),
      env.DB.prepare('SELECT id,day,idx,label,done FROM checklist ORDER BY day, idx').all(),
      env.DB.prepare('SELECT id,title,site,page,browser,device,steps,expected,actual,severity,status,shot,notes, created_by AS by, created_at AS at FROM issues ORDER BY created_at DESC').all(),
      env.DB.prepare('SELECT id,shot,video,issue,browser,device,notes, r2_key AS r2Key, created_by AS by, created_at AS at FROM evidence ORDER BY created_at DESC').all(),
      env.DB.prepare('SELECT id,sender, sender_role AS senderRole, recipient,priority,assignment,body, created_at AS at FROM messages ORDER BY created_at DESC').all(),
      env.DB.prepare('SELECT id,what,site,browser,device,urgency,shot,notes, created_by AS by, created_at AS at FROM alerts ORDER BY created_at DESC').all(),
      env.DB.prepare('SELECT id,site,name,status,evidence,notes, owner_ok AS ownerOk, verified_at AS at FROM sections').all()
    ]);
    return json({ me: { name: me.name, role: me.role, title: me.title }, assignments: a.results, checklist: c.results, issues: i.results, evidence: e.results, messages: m.results, alerts: al.results, sections: sec.results }, 200, origin);
  }

  if (path.includes('/api/occ/issues')) {
    if (method === 'POST') {
      const id = uid('iss');
      await env.DB.prepare('INSERT INTO issues (id,title,site,page,browser,device,steps,expected,actual,severity,status,shot,notes,created_by,created_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)')
        .bind(id, body.title, body.site, body.page, body.browser, body.device, body.steps, body.expected, body.actual, body.severity, 'New', body.shot, body.notes, me.name, new Date().toISOString()).run();
      return json({ ok: true, id }, 200, origin);
    }
    if (method === 'PATCH') {
      if (!owner) return json({ error: 'owner only' }, 403, origin);
      await env.DB.prepare('UPDATE issues SET status = ? WHERE id = ?').bind(body.status, last).run();
      return json({ ok: true }, 200, origin);
    }
  }

  if (path.includes('/api/occ/sections')) {
    if (method === 'POST') { // add a section
      const id = uid('sec');
      await env.DB.prepare('INSERT INTO sections (id,site,name,status,evidence,notes,owner_ok,verified_at,updated_by) VALUES (?,?,?,?,?,?,0,?,?)')
        .bind(id, body.site, body.name, 'Untested', '', '', '', me.name).run();
      return json({ ok: true, id }, 200, origin);
    }
    if (method === 'PATCH') { // update a section (employee: status/evidence/notes; owner: ownerOk)
      const row = await env.DB.prepare('SELECT * FROM sections WHERE id = ?').bind(last).first();
      if (!row) return json({ error: 'not found' }, 404, origin);
      const status = body.status != null ? body.status : row.status;
      const evidence = body.evidence != null ? body.evidence : row.evidence;
      const notes = body.notes != null ? body.notes : row.notes;
      let ownerOk = row.owner_ok;
      if (body.ownerOk != null) { if (!owner) return json({ error: 'owner only' }, 403, origin); ownerOk = body.ownerOk ? 1 : 0; }
      await env.DB.prepare('UPDATE sections SET status=?, evidence=?, notes=?, owner_ok=?, verified_at=?, updated_by=? WHERE id=?')
        .bind(status, evidence, notes, ownerOk, new Date().toISOString(), me.name, last).run();
      return json({ ok: true }, 200, origin);
    }
    if (method === 'DELETE') {
      await env.DB.prepare('DELETE FROM sections WHERE id = ?').bind(last).run();
      return json({ ok: true }, 200, origin);
    }
  }

  if (path.endsWith('/api/occ/messages') && method === 'POST') {
    await env.DB.prepare('INSERT INTO messages (id,sender,sender_role,recipient,priority,assignment,body,created_at) VALUES (?,?,?,?,?,?,?,?)')
      .bind(uid('msg'), me.name, me.role, body.recipient, body.priority, body.assignment, body.body, new Date().toISOString()).run();
    return json({ ok: true }, 200, origin);
  }

  if (path.endsWith('/api/occ/alerts') && method === 'POST') {
    await env.DB.prepare('INSERT INTO alerts (id,what,site,browser,device,urgency,shot,notes,created_by,created_at) VALUES (?,?,?,?,?,?,?,?,?,?)')
      .bind(uid('al'), body.what, body.site, body.browser, body.device, body.urgency, body.shot, body.notes, me.name, new Date().toISOString()).run();
    return json({ ok: true }, 200, origin);
  }

  if (path.endsWith('/api/occ/evidence') && method === 'POST') {
    await env.DB.prepare('INSERT INTO evidence (id,shot,video,issue,browser,device,notes,r2_key,created_by,created_at) VALUES (?,?,?,?,?,?,?,?,?,?)')
      .bind(uid('ev'), body.shot, body.video, body.issue, body.browser, body.device, body.notes, body.r2_key || '', me.name, new Date().toISOString()).run();
    return json({ ok: true }, 200, origin);
  }

  if (path.endsWith('/api/occ/evidence/upload') && method === 'POST') {
    if (!env.EVIDENCE) return json({ error: 'R2 bucket not bound' }, 501, origin);
    const form = await req.formData();
    const file = form.get('file');
    if (!file) return json({ error: 'no file' }, 400, origin);
    const key = 'evidence/' + Date.now() + '_' + (file.name || 'file');
    await env.EVIDENCE.put(key, file.stream());
    await env.DB.prepare('INSERT INTO evidence (id,shot,video,issue,browser,device,notes,r2_key,created_by,created_at) VALUES (?,?,?,?,?,?,?,?,?,?)')
      .bind(uid('ev'), file.name || '', '', form.get('issue') || '', form.get('browser') || '', form.get('device') || '', form.get('notes') || '', key, me.name, new Date().toISOString()).run();
    return json({ ok: true, key }, 200, origin);
  }

  if (path.includes('/api/occ/assignments')) {
    if (method === 'PATCH') {
      if (!owner) return json({ error: 'owner only' }, 403, origin);
      await env.DB.prepare('UPDATE assignments SET status=?, bonus=?, owner_notes=?, approved_date=COALESCE(approved_date,?), paid_date=COALESCE(paid_date,?) WHERE id=?')
        .bind(body.status, body.bonus || 0, body.owner_notes || '', body.status === 'Approved' ? new Date().toISOString() : null, body.status === 'Paid' ? new Date().toISOString() : null, last).run();
      return json({ ok: true }, 200, origin);
    }
    if (method === 'POST' && last === 'submit') {
      const aid = seg[seg.length - 2];
      await env.DB.prepare('UPDATE assignments SET status=?, submitted_date=? WHERE id=?').bind('Submitted', new Date().toISOString(), aid).run();
      return json({ ok: true }, 200, origin);
    }
    if (method === 'POST' && last === 'invoice') { // employee submits invoice
      const aid = seg[seg.length - 2];
      await env.DB.prepare('UPDATE assignments SET invoice_submitted=1, invoice_submitted_date=? WHERE id=?').bind(new Date().toISOString(), aid).run();
      return json({ ok: true }, 200, origin);
    }
  }

  if (path.endsWith('/api/occ/checklist') && method === 'PATCH') {
    await env.DB.prepare('UPDATE checklist SET done=? WHERE id=?').bind(body.done ? 1 : 0, body.id).run();
    return json({ ok: true }, 200, origin);
  }

  return json({ error: 'not found', path }, 404, origin);
}

let _schemaReady = false;
/* Auto-migrate: create the sections table + add invoice columns if missing,
   so no manual SQL is ever needed. Idempotent; runs once per worker instance. */
async function ensureSchema(env) {
  if (_schemaReady) return;
  await env.DB.prepare("CREATE TABLE IF NOT EXISTS sections (id TEXT PRIMARY KEY, site TEXT, name TEXT, status TEXT DEFAULT 'Untested', evidence TEXT, notes TEXT, owner_ok INTEGER DEFAULT 0, verified_at TEXT, updated_by TEXT)").run();
  try { await env.DB.prepare("ALTER TABLE assignments ADD COLUMN invoice_submitted INTEGER DEFAULT 0").run(); } catch (e) {}
  try { await env.DB.prepare("ALTER TABLE assignments ADD COLUMN invoice_submitted_date TEXT").run(); } catch (e) {}
  _schemaReady = true;
}

export async function onRequest(context) {
  const { request, env } = context;
  const origin = request.headers.get('Origin') || '*';
  if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors(origin) });
  try {
    if (!env.DB) return json({ error: 'database not connected', hint: 'Bind D1 as DB on the Pages project' }, 503, origin);
    await ensureSchema(env);
    return await handle(request, env, origin);
  } catch (err) {
    return json({ error: 'server error', detail: String(err && err.message || err) }, 500, origin);
  }
}
