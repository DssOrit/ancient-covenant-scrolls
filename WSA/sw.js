const CACHE='wsa-v7';
const ASSETS=['./index.html','./ge_data.js','./splash.jpg','./icon.png','./apple-touch-icon.png','./icon-192.png','./icon-512.png','./manifest.json'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
// iOS Safari refuses a service-worker response that carries a redirect for a page
// navigation ("Response served by service worker has redirections"). The site's
// _redirects file 301-normalises bare paths, so rebuild any redirected response
// as a plain one before returning or caching it.
function clean(res){
  if(!res || !res.redirected) return Promise.resolve(res);
  return res.blob().then(b=>new Response(b,{status:res.status,statusText:res.statusText,headers:res.headers}));
}
self.addEventListener('fetch',e=>{
  const req=e.request; let url;
  try{ url=new URL(req.url); }catch(_){ return; }
  const isCore = req.mode==='navigate' || url.pathname.endsWith('/index.html') || url.pathname.endsWith('/sw.js') || url.pathname.endsWith('ge_data.js');
  if(isCore){
    e.respondWith(
      fetch(req).then(res=>clean(res).then(c=>{
        if(c && c.ok){ var cl=c.clone(); caches.open(CACHE).then(cache=>cache.put(req,cl)).catch(()=>{}); }
        return c;
      })).catch(()=>caches.match(req).then(r=>r||caches.match('./index.html')))
    );
    return;
  }
  e.respondWith(
    caches.match(req).then(r=>r||fetch(req).then(res=>clean(res).then(c=>{
      if(c && c.ok){ var cl=c.clone(); caches.open(CACHE).then(cache=>cache.put(req,cl)).catch(()=>{}); }
      return c;
    })))
  );
});
