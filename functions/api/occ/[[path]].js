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

/* Screenshots are stored in the existing D1 database as small downscaled
   images — no R2, no payment method needed. A self-enforced cap keeps the
   database light; uploads stop before the cap so nothing ever bills. */
const STORAGE_CAP_BYTES = 50 * 1024 * 1024; // 50 MB total of stored images
const MAX_FILE_BYTES = 600 * 1024;          // 600 KB per image (after client downscale)

async function evidenceBytesUsed(env) {
  const r = await env.DB.prepare("SELECT COALESCE(SUM(size),0) AS n FROM evidence WHERE r2_key IS NOT NULL AND r2_key != ''").first();
  return (r && r.n) || 0;
}

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
  { day: 1, items: ['Open https://loadeco.app on PC (Chrome)','Confirm homepage loads','Take homepage screenshot','List every visible menu','List every visible section','List every visible tile/card','List every major page discovered','Record notes','Repeat basic access on iPad and phone (Safari)'] },
  { day: 2, items: ['Click every visible menu item','Click every visible button','Verify destination loads','Record broken links','Record dead buttons','Mark each item Working, Broken, Confusing, or Needs Retest','Screenshot broken or confusing areas'] },
  { day: 3, items: ['Pretend you are a brand-new visitor','Write what the site appears to be','Write whether the next step is clear','Write what is confusing','Write what instructions are missing','Write what would help a new user','Rate overall clarity 1 to 10'] },
  { day: 4, items: ['Test on PC (Chrome)','Test on PC (Opera)','Test on iPad (Safari)','Test on phone (Safari)','Test on phone (Chrome)','Record layout differences','Record browser-only issues','Record mobile/phone problems','Record desktop problems','Take screenshots of differences'] },
  { day: 5, items: ['Submit site inventory','Submit issue list','Submit browser comparison','Submit top 10 improvement suggestions','Submit release-readiness score','Submit screenshot/video evidence list','Mark assignment ready for owner review'] }
];

const SEED_SECTIONS = ['Homepage loads','Main navigation menu','Each menu link opens','Mobile / iPad layout','Sign-in / gate (if any)','Footer links'];

const SEED_SITES = [
  { id: 'asg_eco',    site: 'https://loadeco.app',               name: 'Load Eco' },
  { id: 'asg_studio', site: 'https://loadeco.app/loadstudio/',   name: 'Load Studio' },
  { id: 'asg_play',   site: 'https://loadeco.app/LoadPlay/',     name: 'Load Play' },
  { id: 'asg_ai',     site: 'https://loadeco.app/LoadAI/',       name: 'Load AI' }
];
/* Daily $60 plan for Load Eco (mirrors the client). Each day = a checklist
   of items, each tested on PC/iPad/phone across Safari/Chrome/Opera. */
const DAY_PLAN_ECO = {
  site: 'https://loadeco.app',
  days: [
    { title: 'Day 1 — Top bar & Front page', items: ['Top bar — Aa theme switcher','Top bar — A− decrease text','Top bar — A+ increase text','Top bar — Reset word size','Front page — Tutorial','Front page — Image prompt','Front page — Video to audio','Front page — Handoff tools','Front page — Style library','Front page — Image upscaler','Front page — Face Restore'] },
    { title: 'Day 2 — Help/FAQ & Import', items: ['Help/FAQ — main page','Help/FAQ — "I pressed the wrong button"','Help/FAQ — "Can each item have its own look"','Help/FAQ — "Install Load as a real app"','Library — Ask AI about this','Import — Import a PWA','Import — Media','Import — Edit video entry'] },
    { title: 'Day 3 — Workspace & Create new', items: ['Workspace — open from Library','Workspace — File tree','Workspace — Live preview','Workspace — line-6 tools','Create new — PWA Reader Book template','Create new — other templates','Create new — start a blank file','Workspace — access points'] },
    { title: 'Day 4 — Library uploads', items: ['Library — upload audio','Library — upload video','Library — upload PDF','Library — upload images','Library — HTML cover editing','Library — webapp upload (iPad)','Library — editing words in webapp','Library — tool icons on HTML/webapp','Library — Book check button'] },
    { title: 'Day 5 — Reader & Edit video', items: ['Reader — EPUB formatting','Reader — EPUB table of contents','Reader — EPUB navigation','Reader — viewer frame status','Edit video — speed up / slow down','Edit video — trim / cut','Edit video — export','Edit video — audio'] }
  ]
};
/* Auto-create the daily assignments + their checklist sections if none exist,
   so the employee never waits for the owner to hand them out. */
async function ensureDayPlan(env) {
  const have = await env.DB.prepare("SELECT COUNT(*) AS n FROM assignments WHERE kind = 'verify'").first();
  if (have && have.n > 0) return;
  const SITE = DAY_PLAN_ECO.site, stmts = [];
  DAY_PLAN_ECO.days.forEach((d, i) => {
    const id = 'day_loadecoapp_' + (i + 1);
    const goal = 'Verify all ' + d.items.length + ' items on today’s checklist, on PC, iPad and phone across Safari, Chrome and Opera. Mark each Works or Broken with a screenshot. The day cannot be submitted until every item is done.';
    stmts.push(env.DB.prepare('INSERT OR IGNORE INTO assignments (id,title,site,worker,week,pay,bonus,goal,status,submitted_date,approved_date,paid_date,owner_notes,invoice_submitted,invoice_submitted_date,kind,scope) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,0,?,?,?)')
      .bind(id, d.title, SITE, 'Employee', i + 1, 60, 0, goal, 'Not Started', '', '', '', '', '', 'verify', JSON.stringify(d.items)));
    d.items.forEach((name, j) => stmts.push(env.DB.prepare('INSERT OR IGNORE INTO sections (id,site,name,status,evidence,notes,owner_ok,verified_at,updated_by) VALUES (?,?,?,?,?,?,0,?,?)')
      .bind('secd_' + id + '_' + j, SITE, name, 'Untested', '', '', '', '')));
  });
  await env.DB.batch(stmts);
}
/* Rule B: after two verify days with issues logged (since the last re-cert),
   auto-open a re-certification day. No owner action needed. */
async function ensureRecertIfDue(env) {
  const SITE = DAY_PLAN_ECO.site;
  const pend = await env.DB.prepare("SELECT COUNT(*) AS n FROM assignments WHERE kind = 'recert' AND status != 'Paid'").first();
  if (pend && pend.n > 0) return; // a re-verify day is already open
  const lr = await env.DB.prepare("SELECT COALESCE(MAX(week),0) AS w FROM assignments WHERE kind = 'recert' AND status IN ('Approved','Paid')").first();
  const lastW = (lr && lr.w) || 0;
  const days = await env.DB.prepare("SELECT id FROM assignments WHERE kind = 'verify' AND status IN ('Approved','Paid') AND week > ?").bind(lastW).all();
  let issueDays = 0;
  for (const d of (days.results || [])) {
    const c = await env.DB.prepare("SELECT COUNT(*) AS n FROM issues WHERE assignment = ?").bind(d.id).first();
    if (c && c.n > 0) issueDays++;
  }
  if (issueDays < 2) return;
  const mw = await env.DB.prepare("SELECT COALESCE(MAX(week),0) AS w FROM assignments WHERE kind IN ('verify','recert')").first();
  const w = ((mw && mw.w) || 0) + 1;
  const goal = 'Re-verify the issues that were marked fixed. Retest each fixed item on PC, iPad and phone, and mark it Works (with a screenshot) or still Broken. New areas stay locked until the owner approves this day.';
  await env.DB.prepare('INSERT OR IGNORE INTO assignments (id,title,site,worker,week,pay,bonus,goal,status,submitted_date,approved_date,paid_date,owner_notes,invoice_submitted,invoice_submitted_date,kind,scope) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,0,?,?,?)')
    .bind('recert_loadecoapp_' + w, 'Re-certification (Day ' + w + ') — retest fixes', SITE, 'Employee', w, 60, 0, goal, 'Not Started', '', '', '', '', '', 'recert', '').run();
}
/* Hard 48-hour auto-delete for UPLOADED screenshots only (rows with an
   r2_key, which now holds the D1 image id). Typed-filename evidence (no
   r2_key) is weightless text and is kept. Runs opportunistically on
   bootstrap, so no cron/console is needed. */
async function purgeExpiredEvidence(env) {
  const cutoff = new Date(Date.now() - 48 * 3600 * 1000).toISOString();
  const old = await env.DB.prepare("SELECT id, r2_key FROM evidence WHERE r2_key IS NOT NULL AND r2_key != '' AND created_at < ?").bind(cutoff).all();
  for (const row of (old.results || [])) {
    try { await env.DB.prepare('DELETE FROM evidence_blobs WHERE id = ?').bind(row.r2_key).run(); } catch (e) {}
    await env.DB.prepare('DELETE FROM evidence WHERE id = ?').bind(row.id).run();
  }
}

async function ensureSeed(env) {
  const c = await env.DB.prepare('SELECT COUNT(*) AS n FROM assignments').first();
  if (c && c.n > 0) return;
  const stmts = [];
  SEED_SITES.forEach(s => {
    stmts.push(env.DB.prepare('INSERT INTO assignments (id,title,site,worker,week,pay,bonus,goal,status,submitted_date,approved_date,paid_date,owner_notes,invoice_submitted,invoice_submitted_date) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,0,?)')
      .bind(s.id, s.name + ' — Full Section Verification', s.site, 'Employee', 1, 60, 0,
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

  // Serve an uploaded screenshot from D1 (auth required; fetched as a blob
  // by the client so the bearer token never goes in the URL).
  if (method === 'GET' && path.endsWith('/api/occ/evidence/file')) {
    const key = url.searchParams.get('key');
    if (!key) return json({ error: 'no key' }, 400, origin);
    const row = await env.DB.prepare('SELECT data, content_type FROM evidence_blobs WHERE id = ?').bind(key).first();
    if (!row) return new Response('Not found', { status: 404, headers: cors(origin) });
    const bytes = Uint8Array.from(atob(row.data), c => c.charCodeAt(0));
    return new Response(bytes, { headers: { ...cors(origin), 'Cache-Control': 'private, max-age=300', 'Content-Type': row.content_type || 'application/octet-stream' } });
  }

  if (method === 'GET' && path.endsWith('/api/occ/bootstrap')) {
    await ensureSeed(env);
    await ensureDayPlan(env);
    await ensureRecertIfDue(env);
    await purgeExpiredEvidence(env);
    const [a, c, i, e, m, al, sec] = await Promise.all([
      env.DB.prepare('SELECT id,title,site,worker,week,pay,bonus,goal,status, submitted_date AS submittedDate, approved_date AS approvedDate, paid_date AS paidDate, owner_notes AS ownerNotes, invoice_submitted AS invoiceSubmitted, invoice_submitted_date AS invoiceSubmittedDate, kind, scope FROM assignments').all(),
      env.DB.prepare('SELECT id,day,idx,label,done FROM checklist ORDER BY day, idx').all(),
      env.DB.prepare('SELECT id,title,site,page,browser,device,steps,expected,actual,severity,status,shot,notes,assignment, created_by AS by, created_at AS at FROM issues ORDER BY created_at DESC').all(),
      env.DB.prepare('SELECT id,shot,video,issue,browser,device,notes, r2_key AS r2Key, created_by AS by, created_at AS at FROM evidence ORDER BY created_at DESC').all(),
      env.DB.prepare('SELECT id,sender, sender_role AS senderRole, recipient,priority,assignment,body, created_at AS at FROM messages ORDER BY created_at DESC').all(),
      env.DB.prepare('SELECT id,what,site,browser,device,urgency,shot,notes, created_by AS by, created_at AS at FROM alerts ORDER BY created_at DESC').all(),
      env.DB.prepare('SELECT id,site,name,status,evidence,notes, owner_ok AS ownerOk, verified_at AS at, ev_key AS evKey, tags, rating FROM sections').all()
    ]);
    const storageUsed = await evidenceBytesUsed(env);
    return json({ me: { name: me.name, role: me.role, title: me.title }, assignments: a.results, checklist: c.results, issues: i.results, evidence: e.results, messages: m.results, alerts: al.results, sections: sec.results, storageUsed: storageUsed, storageCap: STORAGE_CAP_BYTES, storageEnabled: true }, 200, origin);
  }

  if (path.includes('/api/occ/issues')) {
    if (method === 'POST') {
      const id = uid('iss');
      await env.DB.prepare('INSERT INTO issues (id,title,site,page,browser,device,steps,expected,actual,severity,status,shot,notes,assignment,created_by,created_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)')
        .bind(id, body.title, body.site, body.page, body.browser, body.device, body.steps, body.expected, body.actual, body.severity, 'New', body.shot, body.notes, body.assignment || '', me.name, new Date().toISOString()).run();
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
      const evKey = body.evKey != null ? body.evKey : row.ev_key;
      const tags = body.tags != null ? body.tags : row.tags;
      const rating = body.rating != null ? (parseInt(body.rating, 10) || 0) : row.rating;
      let ownerOk = row.owner_ok;
      if (body.ownerOk != null) { if (!owner) return json({ error: 'owner only' }, 403, origin); ownerOk = body.ownerOk ? 1 : 0; }
      await env.DB.prepare('UPDATE sections SET status=?, evidence=?, notes=?, owner_ok=?, verified_at=?, updated_by=?, ev_key=?, tags=?, rating=? WHERE id=?')
        .bind(status, evidence, notes, ownerOk, new Date().toISOString(), me.name, evKey, tags, rating, last).run();
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
    // Client sends a file as a data URL (data:<mime>;base64,...). Images are
    // downscaled first; any other file (PDF, doc, short video) is stored as-is,
    // as long as it fits under D1's 2 MB per-row limit.
    const m = /^data:([^;]+);base64,(.*)$/.exec(body.dataUrl || '');
    if (!m) return json({ error: 'no file' }, 400, origin);
    const contentType = m[1];
    const b64 = m[2];
    const size = Math.floor(b64.length * 3 / 4); // approx decoded bytes
    const isImg = contentType.indexOf('image/') === 0;
    const fileCap = isImg ? MAX_FILE_BYTES : 1400 * 1024; // 1.4 MB raw keeps base64 under D1's 2 MB row limit
    if (size > fileCap || b64.length > 1900000) {
      return json({ error: isImg ? 'image too big' : 'file too big', limitKB: Math.round(fileCap / 1024) }, 413, origin);
    }
    // Free up space first (delete anything past 48h), then enforce our own cap.
    await purgeExpiredEvidence(env);
    const used = await evidenceBytesUsed(env);
    if (used + size > STORAGE_CAP_BYTES) {
      return json({ error: 'storage cap reached', used, cap: STORAGE_CAP_BYTES }, 507, origin);
    }
    const blobId = uid('blob');
    const now = new Date().toISOString();
    await env.DB.prepare('INSERT INTO evidence_blobs (id,data,content_type,size,created_at) VALUES (?,?,?,?,?)')
      .bind(blobId, b64, contentType, size, now).run();
    await env.DB.prepare('INSERT INTO evidence (id,shot,video,issue,browser,device,notes,r2_key,size,created_by,created_at) VALUES (?,?,?,?,?,?,?,?,?,?,?)')
      .bind(uid('ev'), body.name || '', '', body.issue || '', body.browser || '', body.device || '', body.notes || '', blobId, size, me.name, now).run();
    return json({ ok: true, key: blobId }, 200, origin);
  }

  if (path.includes('/api/occ/assignments')) {
    if (method === 'POST' && last === 'assignments') { // owner creates a day assignment
      if (!owner) return json({ error: 'owner only' }, 403, origin);
      const id = body.id || uid('asg');
      await env.DB.prepare('INSERT OR IGNORE INTO assignments (id,title,site,worker,week,pay,bonus,goal,status,submitted_date,approved_date,paid_date,owner_notes,invoice_submitted,invoice_submitted_date,kind,scope) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,0,?,?,?)')
        .bind(id, body.title || '', body.site || '', body.worker || 'Employee', body.week || 1, body.pay || 60, 0, body.goal || '', 'Not Started', '', '', '', '', '', body.kind || 'verify', body.scope || '').run();
      return json({ ok: true, id }, 200, origin);
    }
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
  try { await env.DB.prepare("ALTER TABLE evidence ADD COLUMN size INTEGER DEFAULT 0").run(); } catch (e) {}
  try { await env.DB.prepare("ALTER TABLE sections ADD COLUMN ev_key TEXT").run(); } catch (e) {}
  try { await env.DB.prepare("ALTER TABLE sections ADD COLUMN tags TEXT").run(); } catch (e) {}
  try { await env.DB.prepare("ALTER TABLE sections ADD COLUMN rating INTEGER DEFAULT 0").run(); } catch (e) {}
  await env.DB.prepare("CREATE TABLE IF NOT EXISTS evidence_blobs (id TEXT PRIMARY KEY, data TEXT, content_type TEXT, size INTEGER DEFAULT 0, created_at TEXT)").run();
  // Daily assignment model: kind ('verify' | 'recert') marks day assignments;
  // issues carry the day assignment they were logged under (for the gate).
  try { await env.DB.prepare("ALTER TABLE assignments ADD COLUMN kind TEXT").run(); } catch (e) {}
  try { await env.DB.prepare("ALTER TABLE assignments ADD COLUMN scope TEXT").run(); } catch (e) {}
  try { await env.DB.prepare("ALTER TABLE issues ADD COLUMN assignment TEXT").run(); } catch (e) {}
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
