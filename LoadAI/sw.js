const CACHE_NAME="load-ai-director-studio-v7-0-8";
const ASSETS=["./","./index.html","./styles.css","./app.js","./manifest.json","./data/provider-registry.json","./data/sample-project.json","./data/feature-matrix.json","./splash/splash-1080x1920.jpg","./icons/icon-72x72.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(ASSETS)));self.skipWaiting()});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)))));self.clients.claim()});
self.addEventListener("fetch",e=>{if(e.request.method!=="GET")return;e.respondWith(caches.match(e.request).then(c=>c||fetch(e.request).then(r=>{const copy=r.clone();caches.open(CACHE_NAME).then(cache=>cache.put(e.request,copy)).catch(()=>{});return r}).catch(()=>caches.match("./index.html"))))});
