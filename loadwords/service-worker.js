// Load Words — service worker
// App-shell caching so the study bank works offline once visited.
// Bump CACHE_NAME whenever app.js / wordbank.js / index.html change materially,
// so returning users get the new version instead of a stale cache.

const CACHE_NAME = 'loadwords-v7';
const APP_SHELL = [
  './',
  './index.html',
  './app.js',
  './wordbank.js',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-180.png',
  './assets/splash.jpg',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(names.filter((n) => n !== CACHE_NAME && n.indexOf('loadwords-') === 0).map((n) => caches.delete(n)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  // Navigations (loading the app itself): try the network first so updates
  // show up quickly, fall back to the cached shell when offline.
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req).then((res) => {
        caches.open(CACHE_NAME).then((cache) => cache.put('./index.html', res.clone()));
        return res;
      }).catch(() => caches.match('./index.html'))
    );
    return;
  }

  // Everything else (app.js, wordbank.js, icons, fonts): cache-first,
  // and quietly refresh the cache in the background for next time.
  event.respondWith(
    caches.match(req).then((cached) => {
      const fetchPromise = fetch(req).then((res) => {
        if (res && res.status === 200 && req.url.startsWith(self.location.origin)) {
          caches.open(CACHE_NAME).then((cache) => cache.put(req, res.clone()));
        }
        return res;
      }).catch(() => cached);
      return cached || fetchPromise;
    })
  );
});
