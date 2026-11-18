/* Load Maps — Fire watch proxy (Cloudflare Pages Function)
   Keeps the NASA FIRMS key server-side. Set FIRMS_KEY in the Pages env to enable.
   GET /api/loadmaps/fire?lat=..&lng=..  ->  { configured, count, points }

   Rate-limited per caller IP via the edge Cache API (best-effort, per-colo —
   a Cloudflare dashboard Rate Limiting rule on this route is the real
   defense against sustained abuse). Unauthenticated proxy to a shared FIRMS
   key, so uncapped abuse risks that key being throttled/banned for everyone. */
const RL_LIMIT = 15;      // max requests
const RL_WINDOW_S = 60;   // per rolling window (seconds)
async function underRateLimit(request, routeKey) {
  try {
    const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
    const bucket = Math.floor(Date.now() / (RL_WINDOW_S * 1000));
    const cacheKey = new Request('https://ratelimit.internal/' + routeKey + '/' + ip + '/' + bucket);
    const cache = caches.default;
    const prior = await cache.match(cacheKey);
    const count = prior ? parseInt(await prior.text(), 10) || 0 : 0;
    if (count >= RL_LIMIT) return false;
    await cache.put(cacheKey, new Response(String(count + 1), { headers: { 'Cache-Control': 'max-age=' + RL_WINDOW_S } }));
    return true;
  } catch (e) {
    return true;
  }
}

export async function onRequestGet(context) {
  const { request, env } = context;
  const headers = { 'content-type': 'application/json', 'cache-control': 'no-store' };
  const key = env.FIRMS_KEY;
  if (!key) return new Response(JSON.stringify({ configured: false }), { headers });

  if (!(await underRateLimit(request, 'fire'))) {
    return new Response(JSON.stringify({ configured: true, error: 'rate limited, try again shortly' }), { status: 429, headers });
  }

  const url = new URL(request.url);
  const lat = parseFloat(url.searchParams.get('lat'));
  const lng = parseFloat(url.searchParams.get('lng'));
  if (isNaN(lat) || isNaN(lng)) {
    return new Response(JSON.stringify({ configured: true, error: 'bad coords' }), { status: 400, headers });
  }

  const d = 0.7; // ~75 km box
  const bbox = [(lng - d).toFixed(4), (lat - d).toFixed(4), (lng + d).toFixed(4), (lat + d).toFixed(4)].join(',');
  const api = `https://firms.modaps.eosdis.nasa.gov/api/area/csv/${key}/VIIRS_SNPP_NRT/${bbox}/1`;
  try {
    const r = await fetch(api);
    const text = await r.text();
    const lines = text.trim().split('\n');
    if (lines.length <= 1) {
      return new Response(JSON.stringify({ configured: true, count: 0, points: [] }), { headers });
    }
    const head = lines[0].split(',');
    const li = head.indexOf('latitude');
    const oi = head.indexOf('longitude');
    const points = [];
    for (let i = 1; i < lines.length && points.length < 80; i++) {
      const c = lines[i].split(',');
      const la = parseFloat(c[li]);
      const lo = parseFloat(c[oi]);
      if (!isNaN(la) && !isNaN(lo)) points.push([la, lo]);
    }
    return new Response(JSON.stringify({ configured: true, count: lines.length - 1, points }), { headers });
  } catch (e) {
    return new Response(JSON.stringify({ configured: true, error: 'fetch failed' }), { status: 502, headers });
  }
}
