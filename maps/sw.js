var CACHE = 'acr-maps-v15';
var FILES = [
  './',
  './index.html',
  './acr_places.json',
  './manifest.json',
  './icon.png',
  './icon-192.png',
  './icon-512.png',
  './apple-touch-icon.png',
  './vendor/leaflet.css',
  './vendor/leaflet.js',
  './vendor/images/layers.png',
  './vendor/images/layers-2x.png',
  './vendor/images/marker-icon.png',
  './vendor/images/marker-icon-2x.png',
  './vendor/images/marker-shadow.png'
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
    }).then(function() { return self.clients.claim(); })
  );
});
function clean(res) {
  if (!res || !res.redirected) return Promise.resolve(res);
  return res.blob().then(function(b) { return new Response(b, { status: res.status, statusText: res.statusText, headers: res.headers }); });
}
self.addEventListener('fetch', function(e) {
  var req = e.request;
  var url;
  try { url = new URL(req.url); } catch (_) { return; }
  var isCore = req.mode === 'navigate' ||
    url.pathname.endsWith('/index.html') ||
    url.pathname.endsWith('/sw.js') ||
    url.pathname.endsWith('acr_places.json');
  if (isCore) {
    e.respondWith(
      fetch(req).then(function(res) {
        return clean(res).then(function(c) {
          if (c && c.ok) { var cl = c.clone(); caches.open(CACHE).then(function(cache) { cache.put(req, cl); }).catch(function() {}); }
          return c;
        });
      }).catch(function() {
        return caches.match(req).then(function(r) { return r || caches.match('./index.html'); });
      })
    );
    return;
  }
  e.respondWith(
    caches.match(req).then(function(r) {
      if (r) return r;
      return fetch(req).then(function(res) {
        return clean(res).then(function(c) {
          if (c && c.ok) { var cl = c.clone(); caches.open(CACHE).then(function(cache) { cache.put(req, cl); }).catch(function() {}); }
          return c;
        });
      });
    })
  );
});
