const CACHE='wsa-v4';
const ASSETS=['./index.html','./ge_data.js','./splash.jpg','./icon.png','./apple-touch-icon.png','./icon-192.png','./icon-512.png','./manifest.json'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(res=>{if(res.ok){var c=res.clone();caches.open(CACHE).then(cache=>cache.put(e.request,c));}return res;})));});
