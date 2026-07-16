/* Load Maps — live fuel prices (Cloudflare Pages Function).
   Keyless: government open data. Fetched server-side because the source feeds do
   not send CORS headers, so a browser cannot read them directly. No API key, no
   account. Everything stays in this one repo/infra.

   Spain  : Ministerio (Minetur) open data — official station prices, no key.
   Portugal: DGEG open data — best effort; if the feed is unreachable/changed,
             Spain still works and the app falls back to keyless Overpass stations.

   GET /api/loadmaps/fuel?lat=..&lng=..  ->
     { ok, source, updated, stations:[{name,brand,lat,lng,address,diesel,petrol,dist}] } */

const ES_FEED = 'https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/';
const MAX_KM = 25;
const MAX_OUT = 15;
const json = (o, s) => new Response(JSON.stringify(o), { status: s || 200, headers: { 'content-type': 'application/json', 'cache-control': 'public, max-age=900' } });

function num(v) {
  if (v == null) return null;
  const s = String(v).trim().replace(',', '.');
  if (!s) return null;
  const n = parseFloat(s);
  return isNaN(n) ? null : n;
}
function haversine(la1, lo1, la2, lo2) {
  const R = 6371, p = Math.PI / 180;
  const a = Math.sin((la2 - la1) * p / 2), b = Math.sin((lo2 - lo1) * p / 2);
  const h = a * a + Math.cos(la1 * p) * Math.cos(la2 * p) * b * b;
  return 2 * R * Math.asin(Math.sqrt(h));
}
function inPortugal(lat, lng) { return lat >= 36.8 && lat <= 42.2 && lng <= -6.2 && lng >= -9.6; }

// Cache the big upstream feed at the edge so only the first request is heavy.
async function cachedFetch(url) {
  const cache = caches.default;
  const key = new Request(url, { method: 'GET' });
  let res = await cache.match(key);
  if (res) return res;
  res = await fetch(url, { headers: { 'accept': 'application/json' }, cf: { cacheTtl: 21600, cacheEverything: true } });
  if (res && res.ok) {
    const copy = new Response(res.clone().body, res);
    copy.headers.set('cache-control', 'public, max-age=21600');
    try { await cache.put(key, copy.clone()); } catch (e) {}
    return copy;
  }
  return res;
}

async function spain(lat, lng) {
  const res = await cachedFetch(ES_FEED);
  if (!res || !res.ok) return null;
  const data = await res.json();
  const list = data && (data.ListaEESSPrecio || data.ListaEESSPrecios) || [];
  const out = [];
  for (let i = 0; i < list.length; i++) {
    const s = list[i];
    const la = num(s['Latitud']), lo = num(s['Longitud (WGS84)'] || s['Longitud']);
    if (la == null || lo == null) continue;
    const d = haversine(lat, lng, la, lo);
    if (d > MAX_KM) continue;
    out.push({
      name: (s['Rótulo'] || s['Rotulo'] || 'Station').trim(),
      brand: (s['Rótulo'] || s['Rotulo'] || '').trim(),
      lat: la, lng: lo,
      address: [s['Dirección'] || s['Direccion'], s['Municipio']].filter(Boolean).join(', '),
      diesel: num(s['Precio Gasoleo A']),
      petrol: num(s['Precio Gasolina 95 E5']),
      dist: Math.round(d * 10) / 10
    });
  }
  out.sort((a, b) => a.dist - b.dist);
  return { source: 'ES', updated: (data && data.Fecha) || null, stations: out.slice(0, MAX_OUT) };
}

async function portugal(lat, lng) {
  // Best effort: DGEG open data. If the endpoint is unavailable or its shape has
  // changed, we return null and the client falls back to keyless Overpass stations.
  try {
    const url = 'https://precoscombustiveis.dgeg.gov.pt/api/PrecoComb/GetDadosPesquisaEstacaoRaio?Lat=' + lat + '&Lng=' + lng + '&Raio=' + MAX_KM;
    const res = await fetch(url, { headers: { 'accept': 'application/json' } });
    if (!res || !res.ok) return null;
    const data = await res.json();
    const list = (data && (data.resultado || data.Resultado || data)) || [];
    if (!Array.isArray(list) || !list.length) return null;
    const out = [];
    for (let i = 0; i < list.length; i++) {
      const s = list[i];
      const la = num(s.Latitude || s.latitude || s.Lat), lo = num(s.Longitude || s.longitude || s.Lng);
      if (la == null || lo == null) continue;
      const prices = s.Combustiveis || s.combustiveis || [];
      let diesel = null, petrol = null;
      for (let k = 0; k < prices.length; k++) {
        const t = String(prices[k].TipoCombustivel || prices[k].tipo || '').toLowerCase();
        const pr = num(prices[k].Preco || prices[k].preco);
        if (/gas.?leo|diesel/.test(t) && diesel == null) diesel = pr;
        else if (/gasolina.*95|95/.test(t) && petrol == null) petrol = pr;
      }
      out.push({
        name: (s.Nome || s.nome || 'Estação').trim(),
        brand: (s.Marca || s.marca || '').trim(),
        lat: la, lng: lo,
        address: [s.Morada || s.morada, s.Localidade || s.localidade].filter(Boolean).join(', '),
        diesel: diesel, petrol: petrol,
        dist: Math.round(haversine(lat, lng, la, lo) * 10) / 10
      });
    }
    out.sort((a, b) => a.dist - b.dist);
    return { source: 'PT', updated: null, stations: out.slice(0, MAX_OUT) };
  } catch (e) { return null; }
}

export async function onRequestGet(context) {
  const { request } = context;
  const url = new URL(request.url);
  const lat = parseFloat(url.searchParams.get('lat'));
  const lng = parseFloat(url.searchParams.get('lng'));
  if (isNaN(lat) || isNaN(lng)) return json({ ok: false, error: 'bad coords' }, 400);
  try {
    let r = inPortugal(lat, lng) ? await portugal(lat, lng) : null;
    if (!r || !r.stations || !r.stations.length) {
      const es = await spain(lat, lng);
      if (es && es.stations && es.stations.length) r = es;
    }
    if (!r || !r.stations || !r.stations.length) return json({ ok: true, source: null, stations: [] });
    return json({ ok: true, source: r.source, updated: r.updated, stations: r.stations });
  } catch (e) {
    return json({ ok: true, source: null, stations: [], error: 'feed unavailable' });
  }
}
