var CACHE = 'acr-search-v164';
var FILES = [
  './',
  './index.html',
  './acr_search_data.json',
  './manifest.json',
  './icon.png',
  './icon-152.png',
  './daily_brief.json'
];
self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(CACHE).then(function(c) { return c.addAll(FILES); })
  );
  self.skipWaiting();
});
self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(keys.filter(function(k) { return k !== CACHE; }).map(function(k) { return caches.delete(k); }));
    }).then(function(){ return self.clients.claim(); })
  );
});
// iOS Safari refuses a service-worker response that carries a redirect for a page
// navigation ("Response served by service worker has redirections"). The site's
// _redirects file 301-normalises bare paths, so rebuild any redirected response
// as a plain one before returning or caching it.
function clean(res){
  if (!res || !res.redirected) return Promise.resolve(res);
  return res.blob().then(function(b){ return new Response(b, { status: res.status, statusText: res.statusText, headers: res.headers }); });
}
self.addEventListener('fetch', function(e) {
  var req = e.request;
  var url;
  try { url = new URL(req.url); } catch (_) { return; }
  // Network-first for the shell + data so updates land and no stale redirect sticks.
  var isCore = req.mode === 'navigate' ||
    url.pathname.endsWith('/index.html') ||
    url.pathname.endsWith('/sw.js') ||
    url.pathname.endsWith('acr_search_data.json') ||
    url.pathname.endsWith('daily_brief.json');
  if (isCore) {
    e.respondWith(
      fetch(req).then(function(res){
        return clean(res).then(function(c){
          if (c && c.ok) { var cl = c.clone(); caches.open(CACHE).then(function(cache){ cache.put(req, cl); }).catch(function(){}); }
          return c;
        });
      }).catch(function(){
        return caches.match(req).then(function(r){ return r || caches.match('./index.html'); });
      })
    );
    return;
  }
  e.respondWith(
    caches.match(req).then(function(r){
      if (r) return r;
      return fetch(req).then(function(res){
        return clean(res).then(function(c){
          if (c && c.ok) { var cl = c.clone(); caches.open(CACHE).then(function(cache){ cache.put(req, cl); }).catch(function(){}); }
          return c;
        });
      });
    })
  );
});
