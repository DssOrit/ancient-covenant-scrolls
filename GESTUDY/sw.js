const CACHE='gestudy-v15';
const ASSETS=['index.html','manifest.json','apple-touch-icon.png','icon.png','splash.png','data/app_data.json'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});

// iOS Safari refuses a service-worker response that carries a redirect for a
// page navigation ("Response served by service worker has redirections").
// The site's _redirects file 301-normalises bare paths, so any response we
// hand back must be rebuilt without the redirect flag.
function clean(res){
  if(!res || !res.redirected) return Promise.resolve(res);
  return res.blob().then(function(body){
    return new Response(body,{status:res.status,statusText:res.statusText,headers:res.headers});
  });
}

self.addEventListener('fetch',function(e){
  var req=e.request;
  var url;
  try{ url=new URL(req.url); }catch(_){ return; }
  // Network-first for the shell + data so updates land and redirects never stick;
  // cache is the offline fallback. (Same lesson as study/sw.js.)
  var isCore = req.mode==='navigate' ||
    url.pathname.endsWith('/GESTUDY/') ||
    url.pathname.endsWith('/index.html') ||
    url.pathname.endsWith('/sw.js') ||
    url.pathname.indexOf('/data/')>=0;
  if(isCore){
    e.respondWith(
      fetch(req).then(function(res){
        return clean(res).then(function(r){
          if(r && r.ok){ var c=r.clone(); caches.open(CACHE).then(function(cache){cache.put(req,c);}).catch(function(){}); }
          return r;
        });
      }).catch(function(){
        return caches.match(req).then(function(r){ return r || caches.match('index.html'); });
      })
    );
    return;
  }
  // Cache-first for other static assets, still redirect-safe.
  e.respondWith(
    caches.match(req).then(function(r){
      if(r) return r;
      return fetch(req).then(function(res){
        return clean(res).then(function(c2){
          if(c2 && c2.ok){ var c=c2.clone(); caches.open(CACHE).then(function(cache){cache.put(req,c);}).catch(function(){}); }
          return c2;
        });
      });
    })
  );
});
