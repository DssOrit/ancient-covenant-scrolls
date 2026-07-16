/* Load Maps — shared hazard layer (Cloudflare Pages Function, D1-backed).
   Keeps everything in this one repo/infra: a D1 database, no third-party service.
   Dark until a D1 binding named DB is attached in the Pages project settings and
   the table is created (see functions/api/loadmaps/schema.sql). Until then every
   response is { configured:false } and the app stays local-only, silently.

   GET  /api/loadmaps/hazards?lat=..&lng=..  -> { configured, hazards:[{kind,lat,lng,ts,ago}] }
   POST /api/loadmaps/hazards  { kind, lat, lng }  -> { configured, ok } */

const KINDS = ['Hazard', 'Closure', 'Animal', 'Police'];
const RADIUS_DEG = 0.35;   // ~35-40 km bounding box
const MAX_AGE_H = 6;       // only show reports from the last 6 hours
const json = (obj, status) => new Response(JSON.stringify(obj), {
  status: status || 200,
  headers: { 'content-type': 'application/json', 'cache-control': 'no-store' }
});

function agoText(ms) {
  const s = Math.round(ms / 1000);
  if (s < 60) return 'just now';
  const m = Math.round(s / 60);
  if (m < 60) return m + ' min ago';
  return Math.round(m / 60) + ' h ago';
}

export async function onRequestGet(context) {
  const { request, env } = context;
  if (!env.DB) return json({ configured: false });
  const url = new URL(request.url);
  const lat = parseFloat(url.searchParams.get('lat'));
  const lng = parseFloat(url.searchParams.get('lng'));
  if (isNaN(lat) || isNaN(lng)) return json({ configured: true, error: 'bad coords' }, 400);
  const cutoff = Date.now() - MAX_AGE_H * 3600 * 1000;
  try {
    const rows = await env.DB.prepare(
      'SELECT kind, lat, lng, ts FROM hazards WHERE ts > ?1 AND lat BETWEEN ?2 AND ?3 AND lng BETWEEN ?4 AND ?5 ORDER BY ts DESC LIMIT 200'
    ).bind(cutoff, lat - RADIUS_DEG, lat + RADIUS_DEG, lng - RADIUS_DEG, lng + RADIUS_DEG).all();
    const now = Date.now();
    const hazards = (rows.results || []).map(r => ({ kind: r.kind, lat: r.lat, lng: r.lng, ts: r.ts, ago: agoText(now - r.ts) }));
    return json({ configured: true, hazards });
  } catch (e) {
    return json({ configured: true, error: 'query failed' }, 502);
  }
}

export async function onRequestPost(context) {
  const { request, env } = context;
  if (!env.DB) return json({ configured: false });
  let body;
  try { body = await request.json(); } catch (e) { return json({ configured: true, error: 'bad request' }, 400); }
  const kind = (body && body.kind || '').toString();
  const lat = parseFloat(body && body.lat);
  const lng = parseFloat(body && body.lng);
  if (KINDS.indexOf(kind) < 0 || isNaN(lat) || isNaN(lng) || lat < -90 || lat > 90 || lng < -180 || lng > 180) {
    return json({ configured: true, error: 'invalid' }, 400);
  }
  try {
    await env.DB.prepare('INSERT INTO hazards (kind, lat, lng, ts) VALUES (?1, ?2, ?3, ?4)')
      .bind(kind, lat, lng, Date.now()).run();
    return json({ configured: true, ok: true });
  } catch (e) {
    return json({ configured: true, error: 'insert failed' }, 502);
  }
}
