/* Load Maps service worker — offline-first app shell */
var CACHE = 'loadmaps-v7';
var CORE = [
  'index.html',
  'app.js',
  'data.js',
  'manifest.webmanifest',
  'icon.png',
  'icon-192.png',
  'icon-512.png',
  'favicon-32.png',
  'favicon-180.png',
  'splash/splash-1284x2778.png',
  'splash/splash-1668x2388.png'
];

self.addEventListener('install', function(e){
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(function(c){ return c.addAll(CORE); }).catch(function(){}));
});

self.addEventListener('activate', function(e){
  e.waitUntil(
    caches.keys().then(function(keys){
      return Promise.all(keys.map(function(k){ if(k!==CACHE) return caches.delete(k); }));
    }).then(function(){ return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function(e){
  var req=e.request;
  if(req.method!=='GET') return;
  var url=new URL(req.url);
  if(url.origin!==self.location.origin) return; // let cross-origin (future live data) go to network
  e.respondWith(
    caches.match(req).then(function(hit){
      if(hit) return hit;
      return fetch(req).then(function(res){
        if(res && res.status===200 && res.type==='basic'){
          var copy=res.clone();
          caches.open(CACHE).then(function(c){ c.put(req, copy); });
        }
        return res;
      }).catch(function(){
        if(req.mode==='navigate') return caches.match('index.html');
      });
    })
  );
});
