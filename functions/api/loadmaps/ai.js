/* Load Maps — AI assistant proxy (Cloudflare Pages Function)
   Keeps the AI key server-side. Set AI_KEY (and optionally AI_MODEL, default a small
   OpenRouter model) in the Pages env to enable.
   POST /api/loadmaps/ai  { q: "question" }  ->  { configured, answer } */
export async function onRequestPost(context) {
  const { request, env } = context;
  const headers = { 'content-type': 'application/json', 'cache-control': 'no-store' };
  const key = env.AI_KEY;
  if (!key) return new Response(JSON.stringify({ configured: false }), { headers });

  let body;
  try { body = await request.json(); } catch (e) {
    return new Response(JSON.stringify({ configured: true, error: 'bad request' }), { status: 400, headers });
  }
  const q = ((body && body.q) || '').toString().slice(0, 800).trim();
  if (!q) return new Response(JSON.stringify({ configured: true, error: 'empty' }), { status: 400, headers });

  const sys = 'You are Load Maps, a friendly travel and trail assistant. Give short, clear, practical answers about places, routes, hikes, drives, fuel/EV, weather and safety. Keep it brief and plain-spoken. Prefer a few concrete tips over long text.';
  try {
    const r = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: { 'Authorization': 'Bearer ' + key, 'content-type': 'application/json' },
      body: JSON.stringify({
        model: env.AI_MODEL || 'openai/gpt-4o-mini',
        messages: [{ role: 'system', content: sys }, { role: 'user', content: q }],
        max_tokens: 450
      })
    });
    const j = await r.json();
    const answer = (j && j.choices && j.choices[0] && j.choices[0].message && j.choices[0].message.content) || 'Sorry, no answer right now.';
    return new Response(JSON.stringify({ configured: true, answer }), { headers });
  } catch (e) {
    return new Response(JSON.stringify({ configured: true, error: 'ai failed' }), { status: 502, headers });
  }
}
