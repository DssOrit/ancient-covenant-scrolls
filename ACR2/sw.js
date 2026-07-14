var CACHE='acr2-v17';
var STATIC=['./','./index.html','./manifest.json','./icon.png','./data/nav.json'];
self.addEventListener('install',function(e){e.waitUntil(caches.open(CACHE).then(function(c){return c.addAll(STATIC);}));self.skipWaiting();});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(keys){return Promise.all(keys.filter(function(k){return k.indexOf('acr2-')===0&&k!==CACHE;}).map(function(k){return caches.delete(k);}));}));self.clients.claim();});
// iOS Safari refuses a service-worker response that carries a redirect for a page
// navigation ("Response served by service worker has redirections"). The site's
// _redirects file 301-normalises bare paths, so rebuild any redirected response
// as a plain one before returning or caching it.
function clean(res){
  if(!res||!res.redirected) return Promise.resolve(res);
  return res.blob().then(function(b){return new Response(b,{status:res.status,statusText:res.statusText,headers:res.headers});});
}
self.addEventListener('fetch',function(e){
  var req=e.request; var url;
  try{ url=new URL(req.url); }catch(_){ return; }
  // Network-first for the shell (navigations, index.html, sw.js) so updates land
  // and no stale redirect sticks; cache is the offline fallback.
  var isShell = req.mode==='navigate' || url.pathname.endsWith('/index.html') || url.pathname.endsWith('/sw.js');
  if(isShell){
    e.respondWith(
      fetch(req).then(function(res){
        return clean(res).then(function(c){
          if(c&&c.ok){ var cl=c.clone(); caches.open(CACHE).then(function(cache){cache.put(req,cl);}).catch(function(){}); }
          return c;
        });
      }).catch(function(){ return caches.match(req).then(function(r){ return r||caches.match('./index.html'); }); })
    );
    return;
  }
  // Cache-first for everything else; keep caching /data/ responses, redirect-safe.
  e.respondWith(caches.match(req).then(function(r){
    if(r) return r;
    return fetch(req).then(function(res){
      return clean(res).then(function(c){
        if(c&&c.ok&&req.url.indexOf('/data/')>=0){ var cl=c.clone(); caches.open(CACHE).then(function(cache){cache.put(req,cl);}).catch(function(){}); }
        return c;
      });
    });
  }));
});
