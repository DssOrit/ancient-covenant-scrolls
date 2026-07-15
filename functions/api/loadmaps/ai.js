/* Load Maps — AI assistant proxy (Cloudflare Pages Function)
   Limited AI: a single Claude Haiku call for parsing ambiguous input. Keeps the
   key server-side. Set ANTHROPIC_API_KEY (and optionally AI_MODEL) in the Pages
   env to enable. Haiku at one call per request is near-zero cost.
   POST /api/loadmaps/ai  { q: "question" }  ->  { configured, answer } */
export async function onRequestPost(context) {
  const { request, env } = context;
  const headers = { 'content-type': 'application/json', 'cache-control': 'no-store' };
  const key = env.ANTHROPIC_API_KEY;
  if (!key) return new Response(JSON.stringify({ configured: false }), { headers });

  let body;
  try { body = await request.json(); } catch (e) {
    return new Response(JSON.stringify({ configured: true, error: 'bad request' }), { status: 400, headers });
  }
  const q = ((body && body.q) || '').toString().slice(0, 800).trim();
  if (!q) return new Response(JSON.stringify({ configured: true, error: 'empty' }), { status: 400, headers });

  const sys = 'You are Load Maps, a concise travel and trail assistant. Give short, clear, practical answers about places, routes, hikes, drives, fuel/EV, weather and safety. Prefer a few concrete tips over long text. Plain-spoken.';
  try {
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'x-api-key': key, 'anthropic-version': '2023-06-01', 'content-type': 'application/json' },
      body: JSON.stringify({
        model: env.AI_MODEL || 'claude-haiku-4-5-20251001',
        max_tokens: 450,
        system: sys,
        messages: [{ role: 'user', content: q }]
      })
    });
    const j = await r.json();
    const answer = (j && j.content && j.content[0] && j.content[0].text) || 'Sorry, no answer right now.';
    return new Response(JSON.stringify({ configured: true, answer }), { headers });
  } catch (e) {
    return new Response(JSON.stringify({ configured: true, error: 'ai failed' }), { status: 502, headers });
  }
}
