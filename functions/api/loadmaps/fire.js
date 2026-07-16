/* Load Maps — Fire watch proxy (Cloudflare Pages Function)
   Keeps the NASA FIRMS key server-side. Set FIRMS_KEY in the Pages env to enable.
   GET /api/loadmaps/fire?lat=..&lng=..  ->  { configured, count, points } */
export async function onRequestGet(context) {
  const { request, env } = context;
  const headers = { 'content-type': 'application/json', 'cache-control': 'no-store' };
  const key = env.FIRMS_KEY;
  if (!key) return new Response(JSON.stringify({ configured: false }), { headers });

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
