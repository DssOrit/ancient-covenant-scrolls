const CACHE = 'great-eraser-v22';
const PRECACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  'cover.png',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(PRECACHE))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// iOS Safari refuses a service-worker response that carries a redirect for a
// page navigation ("Response served by service worker has redirections").
// The site's _redirects file 301-normalises bare paths, so rebuild any
// redirected response as a plain one before returning or caching it.
function clean(res){
  if (!res || !res.redirected) return Promise.resolve(res);
  return res.blob().then(b => new Response(b, { status: res.status, statusText: res.statusText, headers: res.headers }));
}

self.addEventListener('fetch', e => {
  const req = e.request;
  let url;
  try { url = new URL(req.url); } catch (_) { return; }
  // Network-first for data files and the shell (navigations, index.html, sw.js)
  // so updates land and a stale redirect can never stick; cache is the fallback.
  const isShell = req.mode === 'navigate' || url.pathname.endsWith('/index.html') || url.pathname.endsWith('/sw.js');
  if (url.pathname.includes('/data/') || isShell) {
    e.respondWith(
      fetch(req)
        .then(r => clean(r).then(c => {
          if (c && c.ok) { const cl = c.clone(); caches.open(CACHE).then(cache => cache.put(req, cl)).catch(() => {}); }
          return c;
        }))
        .catch(() => caches.match(req).then(r => r || caches.match('/index.html')))
    );
  } else {
    e.respondWith(
      caches.match(req).then(r => r || fetch(req).then(res => clean(res).then(c => {
        if (c && c.ok) { const cl = c.clone(); caches.open(CACHE).then(cache => cache.put(req, cl)).catch(() => {}); }
        return c;
      })))
    );
  }
});
