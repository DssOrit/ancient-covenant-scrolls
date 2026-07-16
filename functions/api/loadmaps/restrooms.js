/* Load Maps — community cleanliness ratings for restrooms (Cloudflare Pages Function, D1).
   Keyless, one repo/infra: ratings live in the same D1 as hazards. The restroom
   FACILITIES come from OpenStreetMap keylessly on the client; this only stores and
   returns the crowd cleanliness stars. Dark until a D1 binding named DB exists (see
   functions/api/loadmaps/schema.sql) — until then every response is {configured:false}
   and the app shows OSM badges only.

   GET  /api/loadmaps/restrooms?lat=..&lng=..  -> { configured, ratings:{ ref:{avg,count} } }
   POST /api/loadmaps/restrooms  { ref, lat, lng, stars }  -> { configured, ok } */

const RADIUS_DEG = 0.2;   // ~20 km box around the query point
const json = (o, s) => new Response(JSON.stringify(o), { status: s || 200, headers: { 'content-type': 'application/json', 'cache-control': 'no-store' } });

export async function onRequestGet(context) {
  const { request, env } = context;
  if (!env.DB) return json({ configured: false });
  const url = new URL(request.url);
  const lat = parseFloat(url.searchParams.get('lat'));
  const lng = parseFloat(url.searchParams.get('lng'));
  if (isNaN(lat) || isNaN(lng)) return json({ configured: true, error: 'bad coords' }, 400);
  try {
    const rows = await env.DB.prepare(
      'SELECT ref, AVG(stars) AS avg, COUNT(*) AS count FROM restroom_ratings WHERE lat BETWEEN ?1 AND ?2 AND lng BETWEEN ?3 AND ?4 GROUP BY ref'
    ).bind(lat - RADIUS_DEG, lat + RADIUS_DEG, lng - RADIUS_DEG, lng + RADIUS_DEG).all();
    const ratings = {};
    (rows.results || []).forEach(r => { ratings[r.ref] = { avg: Math.round(r.avg * 10) / 10, count: r.count }; });
    return json({ configured: true, ratings });
  } catch (e) {
    return json({ configured: true, error: 'query failed' }, 502);
  }
}

export async function onRequestPost(context) {
  const { request, env } = context;
  if (!env.DB) return json({ configured: false });
  let body;
  try { body = await request.json(); } catch (e) { return json({ configured: true, error: 'bad request' }, 400); }
  const ref = (body && body.ref || '').toString().slice(0, 64);
  const stars = parseInt(body && body.stars, 10);
  const lat = parseFloat(body && body.lat);
  const lng = parseFloat(body && body.lng);
  if (!ref || !(stars >= 1 && stars <= 5) || isNaN(lat) || isNaN(lng) || lat < -90 || lat > 90 || lng < -180 || lng > 180) {
    return json({ configured: true, error: 'invalid' }, 400);
  }
  try {
    await env.DB.prepare('INSERT INTO restroom_ratings (ref, lat, lng, stars, ts) VALUES (?1, ?2, ?3, ?4, ?5)')
      .bind(ref, lat, lng, stars, Date.now()).run();
    return json({ configured: true, ok: true });
  } catch (e) {
    return json({ configured: true, error: 'insert failed' }, 502);
  }
}
