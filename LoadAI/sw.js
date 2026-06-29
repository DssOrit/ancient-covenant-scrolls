const CACHE_NAME="load-ai-chat-v8n";
const ASSETS=["./","./index.html","./styles.css","./constitution.js","./app.js","./chat.js","./voice.js","./settings.js","./manifest.json","./icons/icon.png","./icons/icon-72x72.png","./splash/splash-1080x1920.jpg"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(ASSETS).catch(()=>{})));self.skipWaiting()});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)))));self.clients.claim()});
self.addEventListener("fetch",e=>{
  if(e.request.method!=="GET")return;
  const url=new URL(e.request.url);
  // Never cache API traffic (OpenRouter). Always go to network.
  if(url.hostname==="openrouter.ai"||url.hostname==="api.openrouter.ai")return;
  e.respondWith(caches.match(e.request).then(c=>c||fetch(e.request).then(r=>{const copy=r.clone();caches.open(CACHE_NAME).then(cache=>cache.put(e.request,copy)).catch(()=>{});return r}).catch(()=>caches.match("./index.html"))));
});
