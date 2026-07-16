/* Load Maps — app (Stage 1)
   Offline-first. Live GPS distances + direction, Samantha voice, guided route with
   spoken hazards, emergency card, How to Use search. No external calls in this stage. */
(function(){
'use strict';

/* ---------------- splash sequencing (intro -> splash -> app) ---------------- */
(function(){
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion:reduce)').matches;
  var intro = document.getElementById('boot-intro');
  var splash = document.getElementById('splash');
  var t1 = reduce ? 300 : 1700;   // how long the auto loader shows
  var t2 = reduce ? 500 : 2500;   // how long the splash shows after that
  function reveal(){
    if(intro) intro.classList.add('gone');
    setTimeout(function(){ if(splash) splash.classList.add('gone'); }, t2);
  }
  setTimeout(reveal, t1);
  if(splash) splash.addEventListener('click', function(){ if(intro) intro.classList.add('gone'); splash.classList.add('gone'); });
})();

/* ---------------- helpers ---------------- */
var $$ = function(s,r){ return Array.prototype.slice.call((r||document).querySelectorAll(s)); };
function el(id){ return document.getElementById(id); }
function esc(s){ return String(s==null?'':s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];}); }
function byId(arr,id){ for(var i=0;i<arr.length;i++){ if(arr[i].id===id) return arr[i]; } return null; }

var ICO = {
  up:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20V6"/><path d="M6 12l6-6 6 6"/></svg>',
  nav:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11l19-9-9 19-2-8-8-2z"/></svg>',
  phone:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3 19.5 19.5 0 01-6-6 19.8 19.8 0 01-3-8.6A2 2 0 014.1 2h3a2 2 0 012 1.7c.1 1 .4 1.9.7 2.8a2 2 0 01-.5 2.1L8.1 9.9a16 16 0 006 6l1.3-1.2a2 2 0 012.1-.5c.9.3 1.8.6 2.8.7a2 2 0 011.7 2z"/></svg>',
  play:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 4l14 8-14 8z"/></svg>',
  shield:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11z"/><path d="M9 12l2 2 4-4"/></svg>',
  warn:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.3 3.9 1.8 18a2 2 0 001.7 3h17a2 2 0 001.7-3L13.7 3.9a2 2 0 00-3.4 0z"/><path d="M12 9v4M12 17v.4"/></svg>',
  left:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>',
  voice:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 10v4h4l5 5V5L7 10H3z"/><path d="M16 9a3 3 0 010 6"/></svg>'
};

var state = { view:'places', cc:'ALL', pos:null, watchId:null, voiceOn:true, voice:null,
              curPlace:null, curGuide:null, detailKind:null, curEmergency:'112', curSpeed:null, _lastFix:null, _lastNext:null };
function emergencyFor(cc){ return (LM.emergencyFor ? LM.emergencyFor(cc) : LM.EMERGENCY_DEFAULT); }

ICO.star='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l2.6 5.6 6 .6-4.5 4 1.3 5.9L12 18l-5.4 3.1 1.3-5.9-4.5-4 6-.6z"/></svg>';
ICO.check='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>';
ICO.share='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12v7a2 2 0 002 2h12a2 2 0 002-2v-7"/><path d="M16 6l-4-4-4 4"/><path d="M12 2v13"/></svg>';
ICO.car='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 17h14M6 17l-1-5 2-5h10l2 5-1 5"/><circle cx="7.5" cy="17.5" r="1.5"/><circle cx="16.5" cy="17.5" r="1.5"/></svg>';
ICO.hiker='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3l3 6-3 5 4 7"/><circle cx="13" cy="5" r="1.6"/></svg>';
ICO.pin='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 6-9 12-9 12s-9-6-9-12a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>';
ICO.q='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 015 .2c0 1.7-2.5 2-2.5 3.8"/><path d="M12 17v.4"/></svg>';
ICO.x='<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>';
ICO.download='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12"/><path d="M7 10l5 5 5-5"/><path d="M4 21h16"/></svg>';
ICO.fuel='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20V5a2 2 0 012-2h6a2 2 0 012 2v15"/><path d="M3 20h12"/><path d="M14 9h2.5A1.5 1.5 0 0118 10.5V16a2 2 0 004 0V8l-3-3"/></svg>';

/* favorites (saved on the device) */
function favs(){ try{ return JSON.parse(localStorage.getItem('lm_favs')||'[]'); }catch(e){ return []; } }
function isFav(id){ return favs().indexOf(id)>=0; }
function toggleFav(id){ var f=favs(), i=f.indexOf(id); if(i>=0) f.splice(i,1); else f.push(id); try{ localStorage.setItem('lm_favs', JSON.stringify(f)); }catch(e){} }

/* custom pins (your own saved places, on the device) */
function getPins(){ try{ return JSON.parse(localStorage.getItem('lm_pins')||'[]'); }catch(e){ return []; } }
function savePins(a){ try{ localStorage.setItem('lm_pins', JSON.stringify(a)); }catch(e){} }
function addPin(lat, lng, name){
  var a=getPins();
  var id='pin-'+Math.abs(Math.round(lat*10000))+'-'+Math.abs(Math.round(lng*10000))+'-'+a.length;
  a.push({ id:id, name:name||('Pin '+(a.length+1)), area:'Your pin', cc:'', lat:lat, lng:lng, pin:true });
  savePins(a); return a;
}
function removePin(id){ savePins(getPins().filter(function(p){ return p.id!==id; })); }

/* prep checklist state */
function getPrep(id){ try{ return JSON.parse(localStorage.getItem('lm_prep_'+id)||'[]'); }catch(e){ return []; } }
function setPrep(id, arr){ try{ localStorage.setItem('lm_prep_'+id, JSON.stringify(arr)); }catch(e){} }

/* ---------------- geo ---------------- */
function toRad(d){ return d*Math.PI/180; }
function haversine(la1,lo1,la2,lo2){
  var R=6371000, dLat=toRad(la2-la1), dLng=toRad(lo2-lo1);
  var s=Math.sin(dLat/2)*Math.sin(dLat/2)+Math.cos(toRad(la1))*Math.cos(toRad(la2))*Math.sin(dLng/2)*Math.sin(dLng/2);
  return 2*R*Math.asin(Math.min(1,Math.sqrt(s)));
}
function bearing(la1,lo1,la2,lo2){
  var y=Math.sin(toRad(lo2-lo1))*Math.cos(toRad(la2));
  var x=Math.cos(toRad(la1))*Math.sin(toRad(la2))-Math.sin(toRad(la1))*Math.cos(toRad(la2))*Math.cos(toRad(lo2-lo1));
  return (Math.atan2(y,x)*180/Math.PI+360)%360;
}
function compass(b){ return ['N','NE','E','SE','S','SW','W','NW'][Math.round(b/45)%8]; }
function fmtDist(m){ if(m==null) return '—'; if(m<1000) return Math.round(m)+' m'; return (m/1000).toFixed(m<10000?1:0)+' km'; }
function ccName(cc){ for(var i=0;i<LM.countries.length;i++){ if(LM.countries[i].cc===cc) return LM.countries[i].name; } return cc; }
function speedKmh(pos){
  var s=pos.coords.speed;
  if(s!=null && !isNaN(s) && s>=0) return s*3.6;
  var t=pos.timestamp||Date.now();
  if(state._lastFix){
    var dt=(t-state._lastFix.t)/1000;
    if(dt>0.4){ var d=haversine(state._lastFix.lat,state._lastFix.lng,pos.coords.latitude,pos.coords.longitude);
      var v=(d/dt)*3.6; state._lastFix={lat:pos.coords.latitude,lng:pos.coords.longitude,t:t}; return v<0.8?0:v; }
    return state.curSpeed;
  }
  state._lastFix={lat:pos.coords.latitude,lng:pos.coords.longitude,t:t};
  return null;
}

/* ---------------- voice (Samantha by default) ---------------- */
function pickVoice(){
  if(!('speechSynthesis' in window)) return;
  var vs = window.speechSynthesis.getVoices() || [];
  state.voice = vs.filter(function(v){ return /samantha/i.test(v.name); })[0]
             || vs.filter(function(v){ return /^en[-_]?US/i.test(v.lang) && v.localService; })[0]
             || vs.filter(function(v){ return /^en/i.test(v.lang); })[0]
             || vs[0] || null;
  updateVoiceLabel();
}
if('speechSynthesis' in window){ pickVoice(); window.speechSynthesis.onvoiceschanged = pickVoice; }
var lastSpoke='';
function speak(text, force){
  if(!state.voiceOn || !('speechSynthesis' in window)) return;
  if(!force && text===lastSpoke) return;
  lastSpoke=text;
  try{
    var u=new SpeechSynthesisUtterance(text);
    if(state.voice){ u.voice=state.voice; u.lang=state.voice.lang; } else { u.lang='en-US'; }
    u.rate=1; u.pitch=1;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
  }catch(e){}
}
function updateVoiceLabel(){
  var name = (state.voice && /samantha/i.test(state.voice.name)) ? 'Samantha' : (state.voice ? state.voice.name : 'device voice');
  var a=el('voiceLabel'); if(a) a.textContent = state.voiceOn ? ('Voice on — '+name) : 'Voice off — tap to turn on';
  var b=el('liveVoiceLabel'); if(b) b.textContent = state.voiceOn ? ('Voice on — '+name) : 'Voice off';
}
function bindVoice(btn){
  if(!btn) return;
  btn.onclick=function(){
    state.voiceOn=!state.voiceOn;
    if(state.voiceOn){ speak('Voice on.', true); } else { try{ window.speechSynthesis.cancel(); }catch(e){} }
    updateVoiceLabel();
  };
}

/* ---------------- toast ---------------- */
var toastT;
function toast(msg){ var t=el('toast'); if(!t) return; t.textContent=msg; t.classList.add('show'); clearTimeout(toastT); toastT=setTimeout(function(){ t.classList.remove('show'); },2400); }

/* ---------------- location ---------------- */
function ensurePos(cb){
  if(!('geolocation' in navigator)){ toast('Location is not available on this device'); return; }
  navigator.geolocation.getCurrentPosition(function(p){
    state.pos={ lat:p.coords.latitude, lng:p.coords.longitude, acc:p.coords.accuracy };
    if(cb) cb();
  }, function(){ toast('Turn on location to see distances'); }, { enableHighAccuracy:true, timeout:12000, maximumAge:15000 });
}
function stopWatch(){ if(state.watchId!=null && navigator.geolocation){ navigator.geolocation.clearWatch(state.watchId); state.watchId=null; } }

/* ---------------- view switching ---------------- */
function showView(id, navKey){
  $$('.view').forEach(function(s){ s.classList.remove('on'); });
  var v=el('v-'+id); if(v) v.classList.add('on');
  $$('nav button').forEach(function(b){ b.classList.toggle('on', b.getAttribute('data-nav')===navKey); });
  window.scrollTo(0,0);
  state.view=id;
}
function navTo(key){
  stopWatch();
  closeDrawer();
  // Map-first: "home" IS the map. Every other section closes the map to show over it.
  if(key==='home' || key==='map'){ openMap({}); return; }
  closeMap();
  if(key==='drive'){ renderRoutes('drive'); showView('guided','drive'); }
  else if(key==='hike'){ renderRoutes('hike'); showView('guided','hike'); }
  else if(key==='places'){ renderChips(); renderPlaces(); showView('places','places'); }
  else if(key==='nearby'){ renderNearby(); showView('nearby','home'); }
  else if(key==='assistant'){ renderAssistant(); showView('assistant','home'); }
  else if(key==='offline'){ renderOffline(); showView('offline','home'); }
  else if(key==='fuel'){ renderFuel(); showView('fuel','home'); }
  else if(key==='alerts'){ renderAlerts(); showView('alerts','home'); }
  else if(key==='help'){ renderHelp(); showView('help','home'); }
}
/* ---------------- map-first menu drawer ---------------- */
var NAV_ITEMS=[
  { key:'drive',     label:'Drive',         sub:'Road routes with directions', ico:'car' },
  { key:'hike',      label:'Hike',          sub:'Trail routes and safety', ico:'hiker' },
  { key:'places',    label:'Explore places',sub:'Famous places to guide you to', ico:'pin' },
  { key:'nearby',    label:'Near me',       sub:'Waterfalls, beaches, EV and more', ico:'pin' },
  { key:'fuel',      label:'Fuel prices',   sub:'Live petrol and diesel near you', ico:'fuel' },
  { key:'offline',   label:'Offline maps',  sub:'Use the map with no signal', ico:'download' },
  { key:'alerts',    label:'Alerts',        sub:'Route notes and reports', ico:'warn' },
  { key:'assistant', label:'Ask Load Maps', sub:'Plan a trip or ask about a place', ico:'q' },
  { key:'help',      label:'How to use',    sub:'Simple guide, with search', ico:'q' }
];
function buildDrawer(){
  var host=el('navList'); if(!host || host.getAttribute('data-built')) return;
  host.setAttribute('data-built','1');
  host.innerHTML=NAV_ITEMS.map(function(it){
    return '<button data-navitem="'+it.key+'">'+(ICO[it.ico]||ICO.pin)+'<span>'+esc(it.label)+'<span class="nd-sub">'+esc(it.sub)+'</span></span></button>';
  }).join('');
  $$('[data-navitem]',host).forEach(function(b){ b.onclick=function(){ navTo(b.getAttribute('data-navitem')); }; });
}
function openDrawer(){ buildDrawer(); var d=el('navDrawer'), b=el('navBackdrop'); if(d) d.classList.add('on'); if(b) b.classList.add('on'); }
function closeDrawer(){ var d=el('navDrawer'), b=el('navBackdrop'); if(d) d.classList.remove('on'); if(b) b.classList.remove('on'); }
function renderHome(){
  var v=el('v-home');
  v.innerHTML=
    '<div class="home-hi"><div class="logo"></div><div><b>Load Maps</b><span>Where do you want to go?</span></div></div>'+
    '<div class="home-grid">'+
      '<button class="hcard drive" data-go="drive"><div class="hi">'+ICO.car+'</div><b>Drive</b><span>Road routes with directions</span></button>'+
      '<button class="hcard hike" data-go="hike"><div class="hi">'+ICO.hiker+'</div><b>Hike</b><span>Trail routes and safety</span></button>'+
      '<button class="hcard places wide" data-go="places"><div class="hi">'+ICO.pin+'</div><div class="ht"><b>Explore places</b><span>Famous places to guide you to</span></div></button>'+
      '<button class="hcard nearby wide" data-go="nearby"><div class="hi">'+ICO.pin+'</div><div class="ht"><b>Near me</b><span>Waterfalls, beaches, EV, camping and more</span></div></button>'+
      '<button class="hcard alerts" data-go="alerts"><div class="hi">'+ICO.warn+'</div><b>Alerts</b><span>Route notes and reports</span></button>'+
      '<button class="hcard help" data-go="help"><div class="hi">'+ICO.q+'</div><b>How to use</b><span>Simple guide, with search</span></button>'+
      '<button class="hcard livemap wide" data-go="livemap"><div class="hi">'+ICO.pin+'</div><div class="ht"><b>Live map</b><span>Scrollable street &amp; satellite map, with your position</span></div></button>'+
      '<button class="hcard assistant wide" data-go="assistant"><div class="hi">'+ICO.q+'</div><div class="ht"><b>Ask Load Maps</b><span>Plan a trip or ask about a place (needs setup)</span></div></button>'+
      '<button class="hcard fuel wide" data-go="fuel"><div class="hi">'+ICO.fuel+'</div><div class="ht"><b>Fuel prices</b><span>Live petrol and diesel prices near you (Spain, and Portugal where available)</span></div></button>'+
      '<button class="hcard offline wide" data-go="offline"><div class="hi">'+ICO.download+'</div><div class="ht"><b>Offline maps</b><span>Load a map file onto your device so the map works with no signal</span></div></button>'+
    '</div>';
  $$('[data-go]',v).forEach(function(b){ b.onclick=function(){ var k=b.getAttribute('data-go'); if(k==='livemap'){ openMap({}); } else { navTo(k); } }; });
}
function routeThumb(type){ return '<div class="thumb '+(type==='drive'?'drive':'hike')+'">'+(type==='drive'?ICO.car:ICO.hiker)+'</div>'; }
function renderRoutes(type){
  var v=el('v-guided');
  var list=LM.guided.filter(function(g){ return (g.type||'hike')===type; });
  var title=type==='drive'?'Road routes':'Trail routes';
  var sub=type==='drive'?'Driving directions with road cautions and stops.':'Walking trails with waypoints and hazard warnings.';
  var html='<h2 class="sec">'+title+'</h2><p class="muted small" style="margin:0 0 12px">'+sub+'</p>';
  if(!list.length){ html+='<div class="info flat"><p class="muted">More '+title.toLowerCase()+' coming soon.</p></div>'; }
  html+=list.map(function(g){
    return '<button class="card place" data-guide="'+g.id+'"><div class="top">'+routeThumb(g.type)+
      '<div><h3>'+esc(g.name)+'</h3><div class="area">'+esc(g.area)+'</div></div></div>'+
      '<div class="muted small" style="margin-top:8px">'+g.distanceKm+' km · '+g.timeMin+' min · '+esc(g.difficulty)+'</div>'+
      '<span class="tag '+(g.type==='drive'?'drive':'hike')+'">'+(g.type==='drive'?'Drive':'Hike')+'</span><span class="tag ok">Offline ready</span></button>';
  }).join('');
  v.innerHTML=html;
  $$('[data-guide]',v).forEach(function(b){ b.onclick=function(){ openGuided(byId(LM.guided,b.getAttribute('data-guide'))); }; });
}
function galleryHTML(images){
  if(!images || !images.length) return '';
  return '<div class="gallery">'+images.map(function(im){
    return '<figure><img loading="lazy" src="'+esc(im.src)+'" alt="'+esc(im.cap)+'" data-img="'+esc(im.src)+'"><figcaption>'+esc(im.cap)+'</figcaption></figure>';
  }).join('')+'</div>';
}
function bindGallery(v){ $$('[data-img]',v).forEach(function(im){ im.onclick=function(){ openLightbox(im.getAttribute('data-img')); }; }); }
function openLightbox(src){
  var lb=document.getElementById('lightbox');
  if(!lb){
    lb=document.createElement('div'); lb.id='lightbox'; lb.className='lightbox';
    lb.innerHTML='<button class="x" aria-label="Close">'+ICO.x+'</button><img alt="">';
    document.body.appendChild(lb);
    lb.addEventListener('click',function(e){ if(e.target===lb || (e.target.closest && e.target.closest('.x'))) lb.classList.remove('open'); });
  }
  lb.querySelector('img').src=src;
  lb.classList.add('open');
}

/* ---------------- live map (Stage 3, Leaflet) ---------------- */
var LMap = { map:null, streets:null, sat:null, cur:'streets', routeLayer:null, meMarker:null, watch:null };
function mapInit(){
  if(LMap.map || typeof L==='undefined') return;
  try{ L.Icon.Default.imagePath='vendor/leaflet/images/'; }catch(e){}
  LMap.map = L.map('map', { zoomControl:false });
  L.control.zoom({ position:'bottomleft' }).addTo(LMap.map);
  LMap.raster = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', { maxZoom:19, subdomains:'abcd', attribution:'&copy; OpenStreetMap &copy; CARTO' });
  LMap.sat = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', { maxZoom:19, attribution:'Imagery &copy; Esri, Maxar, Earthstar Geographics' });
  LMap.base=null;
  // OpenFreeMap vector via MapLibre (keyless, unlimited); fall back to OSM raster
  try{
    if(L.maplibreGL && typeof maplibregl!=='undefined'){
      LMap.vector = L.maplibreGL({ style:'https://tiles.openfreemap.org/styles/dark', attribution:'&copy; OpenFreeMap &copy; OpenStreetMap' });
      LMap.vector.addTo(LMap.map); LMap.base=LMap.vector; LMap.cur='vector';
    }
  }catch(e){ LMap.vector=null; LMap.base=null; }
  if(!LMap.base){ LMap.raster.addTo(LMap.map); LMap.base=LMap.raster; LMap.cur='streets'; }
  LMap.map.setView([39.5,-8], 6);
}
function decodePoly(str, precision){
  var index=0, lat=0, lng=0, coords=[], factor=Math.pow(10, precision||6), shift, result, b, dlat, dlng;
  while(index<str.length){
    shift=0; result=0;
    do{ b=str.charCodeAt(index++)-63; result|=(b&0x1f)<<shift; shift+=5; } while(b>=0x20);
    dlat=(result&1)?~(result>>1):(result>>1); lat+=dlat;
    shift=0; result=0;
    do{ b=str.charCodeAt(index++)-63; result|=(b&0x1f)<<shift; shift+=5; } while(b>=0x20);
    dlng=(result&1)?~(result>>1):(result>>1); lng+=dlng;
    coords.push([lat/factor, lng/factor]);
  }
  return coords;
}
function openMap(opts){
  if(typeof L==='undefined'){ toast('The live map needs a connection the first time.'); return; }
  el('mapwrap').classList.add('open');
  mapInit();
  buildMapChrome();
  // Map-first: with no route/place this map IS the home screen -> show the ☰ menu, not Back.
  var isHome=!(opts && (opts.route || opts.place || opts.directions));
  var mMenu=el('mapMenu'), mBack=el('mapBack');
  if(mMenu) mMenu.style.display=isHome?'':'none';
  if(mBack) mBack.style.display=isHome?'none':'';
  if(LMap.searchMarker){ try{ LMap.map.removeLayer(LMap.searchMarker); }catch(e){} LMap.searchMarker=null; }
  var msb=el('mapSearch'); if(msb) msb.value=''; var msr=el('mapSearchRes'); if(msr){ msr.classList.remove('on'); msr.innerHTML=''; }
  clearMapCats();
  if(LMap.routeLayer){ LMap.map.removeLayer(LMap.routeLayer); LMap.routeLayer=null; }
  if(LMap.driveLayer){ LMap.map.removeLayer(LMap.driveLayer); LMap.driveLayer=null; }
  if(LMap.reachLayer){ LMap.map.removeLayer(LMap.reachLayer); LMap.reachLayer=null; var rb=el('mapReach'); if(rb) rb.classList.remove('on'); }
  if(LMap.gpxLayer){ LMap.map.removeLayer(LMap.gpxLayer); LMap.gpxLayer=null; }
  if(LMap.onRouteLayer){ LMap.map.removeLayer(LMap.onRouteLayer); LMap.onRouteLayer=null; }
  if(LMap.camLayer){ LMap.map.removeLayer(LMap.camLayer); LMap.camLayer=null; LMap.cams=null; var cb=el('mapCam'); if(cb) cb.classList.remove('on'); }
  if(LMap.hazardLayer){ LMap.map.removeLayer(LMap.hazardLayer); LMap.hazardLayer=null; }
  if(LMap.offline){ try{ LMap.map.removeLayer(LMap.offline); }catch(e){} LMap.offline=null; if(LMap.base){ try{ LMap.base.addTo(LMap.map); LMap.cur=(LMap.base===LMap.vector?'vector':'streets'); }catch(e){} } var ml=el('mapLayer'); if(ml) ml.textContent='Satellite'; }
  LMap.route=null; LMap.avoid=null; LMap._hzLoaded=false; _spd.limit=null; _spd.at=0;
  var ee=el('mapEta'); if(ee) ee.classList.remove('on');
  var rt=el('mapRouteTools'); if(rt) rt.classList.remove('open');
  var em=el('mapElev'); if(em) em.classList.remove('on');
  LMap.curRoute=(opts && opts.route) || null;
  var title='Live map', bounds=null, center=null;
  if(opts && opts.route){
    var g=opts.route; title=g.name;
    var pts=g.waypoints.map(function(w){ return [w.lat,w.lng]; });
    var grp=L.layerGroup();
    L.polyline(pts, { color:'#2fd85f', weight:5, opacity:.92 }).addTo(grp);
    g.waypoints.forEach(function(w){
      var col=w.hazard ? (w.hazard.level==='high'?'#ff4d3d':'#ffb023') : (w.n===1?'#2fd85f':'#3d8bff');
      L.circleMarker([w.lat,w.lng], { radius:9, color:'#04140a', weight:2, fillColor:col, fillOpacity:1 })
        .bindPopup('<b>'+esc(w.name)+'</b>'+(w.hazard?'<br>'+esc(w.hazard.text):'')).addTo(grp);
    });
    grp.addTo(LMap.map); LMap.routeLayer=grp; bounds=L.latLngBounds(pts);
    showElevation(g);
  } else if(opts && opts.place){
    var p=opts.place; title=p.name;
    var grp2=L.layerGroup();
    L.marker([p.lat,p.lng]).bindPopup('<b>'+esc(p.name)+'</b>').addTo(grp2);
    grp2.addTo(LMap.map); LMap.routeLayer=grp2; center=[p.lat,p.lng];
  } else if(state.pos){ center=[state.pos.lat,state.pos.lng]; }
  renderPins();
  el('mapTitle').textContent=title;
  setTimeout(function(){
    LMap.map.invalidateSize();
    if(bounds) LMap.map.fitBounds(bounds, { padding:[50,50] });
    else if(center) LMap.map.setView(center, 14);
  }, 80);
  startMapLocate();
  var mm=el('mapModes');
  if(opts && opts.directions && opts.place){
    if(mm){ mm.classList.add('on'); $$('#mapModes button').forEach(function(x){ x.classList.toggle('on', x.getAttribute('data-mode')==='auto'); }); }
    ensurePos(function(){ if(state.pos) drawRoute([state.pos.lat,state.pos.lng], [opts.place.lat,opts.place.lng], 'auto'); });
  } else if(mm){ mm.classList.remove('on'); }
}
function drawRoute(from, to, costing){
  if(!from){ toast('Turn on location for directions'); return; }
  if(!navigator.onLine){ toast('Directions need a connection'); return; }
  costing=costing||'auto';
  LMap.from=from; LMap.dest=to; LMap.costing=costing;
  toast('Getting directions…');
  var body={ locations:[{ lat:from[0], lon:from[1] },{ lat:to[0], lon:to[1] }], costing:costing, directions_options:{ units:'kilometers' } };
  if(LMap.avoid && LMap.avoid.length) body.exclude_locations=LMap.avoid.slice(0,20);
  fetch('https://valhalla.openstreetmap.de/route', { method:'POST', headers:{ 'content-type':'application/json' }, body:JSON.stringify(body) })
    .then(function(r){ return r.json(); }).then(function(j){
      var leg=j && j.trip && j.trip.legs && j.trip.legs[0];
      if(!leg || !leg.shape){ toast('No route found'); return; }
      var coords=decodePoly(leg.shape, 6);
      if(LMap.driveLayer){ LMap.map.removeLayer(LMap.driveLayer); }
      var col=costing==='pedestrian'?'#2fd85f':(costing==='bicycle'?'#ffb023':'#3d8bff');
      LMap.driveLayer=L.polyline(coords, { color:col, weight:6, opacity:.92 }).addTo(LMap.map);
      LMap.map.fitBounds(L.latLngBounds(coords), { padding:[50,50] });
      var s=j.trip.summary, km=s.length.toFixed(s.length<10?1:0), min=Math.round(s.time/60);
      var lab=costing==='pedestrian'?'on foot':(costing==='bicycle'?'by bike':'by car');
      var t=el('mapTitle'); if(t) t.textContent=km+' km · '+min+' min '+lab;
      LMap.route={ coords:coords, lengthM:s.length*1000, timeSec:s.time, offNotified:false };
      updateEta();
      fetchRouteElevation(coords);
    }).catch(function(){ toast('Could not get directions'); });
}
function renderPins(){
  if(!LMap.map) return;
  if(LMap.pinLayer){ LMap.map.removeLayer(LMap.pinLayer); }
  LMap.pinLayer=L.layerGroup();
  getPins().forEach(function(pn){
    L.marker([pn.lat,pn.lng]).bindPopup('<b>'+esc(pn.name)+'</b><br>your pin').addTo(LMap.pinLayer);
  });
  LMap.pinLayer.addTo(LMap.map);
}
function closeMap(){ el('mapwrap').classList.remove('open'); var mm=el('mapModes'); if(mm) mm.classList.remove('on'); if(LMap.watch!=null && navigator.geolocation){ navigator.geolocation.clearWatch(LMap.watch); LMap.watch=null; } }
// Reachability (isochrone) — how far you can get in 15/30/45 min. Valhalla, keyless.
function toggleReach(){
  if(!LMap.map) return;
  var btn=el('mapReach');
  if(LMap.reachLayer){ LMap.map.removeLayer(LMap.reachLayer); LMap.reachLayer=null; if(btn) btn.classList.remove('on'); return; }
  if(!navigator.onLine){ toast('Reach needs a connection'); return; }
  ensurePos(function(){
    if(!state.pos){ toast('Turn on location for reach'); return; }
    var costing=LMap.costing || 'auto';
    toast('Working out how far you can get…');
    var body={ locations:[{ lat:state.pos.lat, lon:state.pos.lng }], costing:costing,
      contours:[{ time:15, color:'2fd85f' },{ time:30, color:'ffb023' },{ time:45, color:'ff4d3d' }], polygons:true, denoise:0.5 };
    fetch('https://valhalla.openstreetmap.de/isochrone', { method:'POST', headers:{ 'content-type':'application/json' }, body:JSON.stringify(body) })
      .then(function(r){ return r.json(); }).then(function(j){
        if(!j || !j.features || !j.features.length){ toast('No reach area found here'); return; }
        LMap.reachLayer=L.geoJSON(j, { style:function(ft){
          var c='#'+((ft.properties&&ft.properties.color)||'3d8bff');
          return { color:c, weight:2, opacity:.9, fillColor:c, fillOpacity:.14 };
        }, onEachFeature:function(ft,layer){
          var m=ft.properties&&ft.properties.contour; if(m) layer.bindPopup(m+' min '+(costing==='pedestrian'?'on foot':costing==='bicycle'?'by bike':'by car'));
        } }).addTo(LMap.map);
        try{ LMap.map.fitBounds(LMap.reachLayer.getBounds(), { padding:[40,40] }); }catch(e){}
        if(btn) btn.classList.add('on');
        toast('Reach: 15 / 30 / 45 min');
      }).catch(function(){ toast('Could not work out reach'); });
  });
}
// Speed cameras — OpenStreetMap via Overpass (same keyless endpoint used elsewhere).
function toggleCameras(){
  if(!LMap.map) return;
  var btn=el('mapCam');
  if(LMap.camLayer){ LMap.map.removeLayer(LMap.camLayer); LMap.camLayer=null; LMap.cams=null; if(btn) btn.classList.remove('on'); toast('Cameras off'); return; }
  if(!navigator.onLine){ toast('Cameras need a connection'); return; }
  var b=LMap.map.getBounds();
  if(LMap.map.getZoom()<9){ toast('Zoom in to load cameras'); return; }
  toast('Loading speed cameras…');
  var box='('+b.getSouth()+','+b.getWest()+','+b.getNorth()+','+b.getEast()+')';
  var body='[out:json][timeout:20];(node["highway"="speed_camera"]'+box+';node["highway"="enforcement"]'+box+';);out 300;';
  fetch('https://overpass-api.de/api/interpreter', { method:'POST', body:body })
    .then(function(r){ return r.json(); }).then(function(j){
      var cams=[];
      if(j && j.elements){ j.elements.forEach(function(e){ if(e.lat!=null && e.lon!=null) cams.push({ lat:e.lat, lng:e.lon }); }); }
      if(!cams.length){ toast('No speed cameras in view'); return; }
      LMap.cams=cams;
      LMap.camLayer=L.layerGroup();
      cams.forEach(function(c){
        L.circleMarker([c.lat,c.lng], { radius:6, color:'#1a0d04', weight:2, fillColor:'#ff4d3d', fillOpacity:.95 })
          .bindPopup('Speed camera').addTo(LMap.camLayer);
      });
      LMap.camLayer.addTo(LMap.map);
      if(btn) btn.classList.add('on');
      toast(cams.length+' speed camera'+(cams.length===1?'':'s')+' shown');
    }).catch(function(){ toast('Could not load cameras'); });
}
// Voice warning when driving up on a loaded speed camera.
var _camWarn={ at:0, key:null };
function checkCameraAhead(){
  if(!LMap.cams || !state.pos) return;
  var best=Infinity, bc=null;
  for(var i=0;i<LMap.cams.length;i++){ var d=haversine(state.pos.lat,state.pos.lng,LMap.cams[i].lat,LMap.cams[i].lng); if(d<best){ best=d; bc=LMap.cams[i]; } }
  if(bc && best<220){
    var key=bc.lat.toFixed(4)+','+bc.lng.toFixed(4);
    if(_camWarn.key!==key && Date.now()-_camWarn.at>15000){ _camWarn.key=key; _camWarn.at=Date.now(); chime('next'); speak('Speed camera ahead.', true); }
  }
}
// Real elevation for ANY route — Open-Meteo elevation (same keyless host as the weather).
function sampleCoords(coords, n){
  if(coords.length<=n) return coords.slice();
  var out=[], step=(coords.length-1)/(n-1);
  for(var i=0;i<n;i++){ out.push(coords[Math.round(i*step)]); }
  return out;
}
function fetchRouteElevation(coords){
  if(!coords || coords.length<2 || !navigator.onLine) return;
  var pts=sampleCoords(coords, 40);
  var lats=pts.map(function(p){ return p[0].toFixed(5); }).join(',');
  var lngs=pts.map(function(p){ return p[1].toFixed(5); }).join(',');
  fetch('https://api.open-meteo.com/v1/elevation?latitude='+lats+'&longitude='+lngs)
    .then(function(r){ return r.json(); }).then(function(j){
      var el2=j && j.elevation;
      if(!el2 || !el2.length || el2.length!==pts.length) return;
      var wps=pts.map(function(p,i){ return { n:i+1, name:'', lat:p[0], lng:p[1], elev:el2[i] }; });
      showElevation({ name:'route', waypoints:wps });
    }).catch(function(){});
}
// Elevation profile for a guided route (uses the route's own waypoint elevations).
function showElevation(g){
  var panel=el('mapElev'); if(!panel) return;
  var wps=(g && g.waypoints) || [];
  var pts=[]; for(var i=0;i<wps.length;i++){ if(typeof wps[i].elev==='number') pts.push({ e:wps[i].elev, lat:wps[i].lat, lng:wps[i].lng }); }
  if(pts.length<2){ panel.classList.remove('on'); panel.innerHTML=''; return; }
  var cum=0, dists=[0];
  for(var k=1;k<pts.length;k++){ cum+=haversine(pts[k-1].lat,pts[k-1].lng,pts[k].lat,pts[k].lng); dists.push(cum); }
  var total=cum||1, minE=Infinity, maxE=-Infinity, gain=0;
  for(var m=0;m<pts.length;m++){ if(pts[m].e<minE)minE=pts[m].e; if(pts[m].e>maxE)maxE=pts[m].e; if(m>0 && pts[m].e>pts[m-1].e) gain+=pts[m].e-pts[m-1].e; }
  var W=300, H=64, pad=6, span=(maxE-minE)||1, poly='';
  for(var n=0;n<pts.length;n++){
    var x=pad + (dists[n]/total)*(W-2*pad);
    var y=(H-pad) - ((pts[n].e-minE)/span)*(H-2*pad);
    poly+=(n?' ':'')+x.toFixed(1)+','+y.toFixed(1);
  }
  var area='M'+pad+','+(H-pad)+' L'+poly.replace(/ /g,' L')+' L'+(W-pad)+','+(H-pad)+' Z';
  panel.innerHTML='<div class="el-top"><span class="el-lab">Elevation</span>'
    +'<span class="el-meta">'+Math.round(minE)+'–'+Math.round(maxE)+' m · +'+Math.round(gain)+' m climb · '+fmtDist(total)+'</span>'
    +'<button class="el-x" id="elClose" aria-label="Close">&times;</button></div>'
    +'<svg viewBox="0 0 '+W+' '+H+'" preserveAspectRatio="none" aria-hidden="true">'
    +'<path d="'+area+'" fill="rgba(47,216,95,.18)"/>'
    +'<polyline points="'+poly+'" fill="none" stroke="#2fd85f" stroke-width="2" stroke-linejoin="round"/></svg>';
  panel.classList.add('on');
  var xb=el('elClose'); if(xb) xb.onclick=function(){ panel.classList.remove('on'); };
}
// GPX export of the current route (waypoints) and GPX import to view a track.
function gpxExport(){
  var g=LMap.curRoute;
  var name, segs=[];
  if(g && g.waypoints && g.waypoints.length){
    name=g.name;
    segs=g.waypoints.map(function(w){ return { lat:w.lat, lng:w.lng, name:w.name, elev:w.elev }; });
  } else {
    var pins=getPins();
    if(!pins.length){ toast('Open a route or drop pins to export'); return; }
    name='Load Maps pins'; segs=pins.map(function(p){ return { lat:p.lat, lng:p.lng, name:p.name }; });
  }
  var head='<?xml version="1.0" encoding="UTF-8"?>\n<gpx version="1.1" creator="Load Maps" xmlns="http://www.topografix.com/GPX/1/1">\n';
  var meta='  <metadata><name>'+esc(name)+'</name></metadata>\n';
  var wpt=segs.map(function(s){ return '  <wpt lat="'+s.lat+'" lon="'+s.lng+'">'+(typeof s.elev==='number'?'<ele>'+s.elev+'</ele>':'')+'<name>'+esc(s.name||'Point')+'</name></wpt>'; }).join('\n');
  var trk='\n  <trk><name>'+esc(name)+'</name><trkseg>\n'
    + segs.map(function(s){ return '    <trkpt lat="'+s.lat+'" lon="'+s.lng+'">'+(typeof s.elev==='number'?'<ele>'+s.elev+'</ele>':'')+'</trkpt>'; }).join('\n')
    + '\n  </trkseg></trk>\n';
  var gpx=head+meta+wpt+trk+'</gpx>\n';
  var blob=new Blob([gpx], { type:'application/gpx+xml' });
  var url=URL.createObjectURL(blob);
  var a=document.createElement('a'); a.href=url; a.download=(name.replace(/[^a-z0-9]+/gi,'-').toLowerCase()||'route')+'.gpx';
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
  setTimeout(function(){ URL.revokeObjectURL(url); }, 4000);
  toast('GPX saved');
}
function gpxImport(file){
  if(!file){ return; }
  var reader=new FileReader();
  reader.onload=function(ev){
    var pts=parseGpx(ev.target.result);
    if(!pts.length){ toast('No track points in that file'); return; }
    if(LMap.gpxLayer){ LMap.map.removeLayer(LMap.gpxLayer); }
    var line=pts.map(function(p){ return [p.lat, p.lng]; });
    LMap.gpxLayer=L.layerGroup();
    L.polyline(line, { color:'#b46bff', weight:5, opacity:.95, dashArray:'1' }).addTo(LMap.gpxLayer);
    L.circleMarker(line[0], { radius:7, color:'#04140a', weight:2, fillColor:'#2fd85f', fillOpacity:1 }).bindPopup('Track start').addTo(LMap.gpxLayer);
    L.circleMarker(line[line.length-1], { radius:7, color:'#04140a', weight:2, fillColor:'#ff4d3d', fillOpacity:1 }).bindPopup('Track end').addTo(LMap.gpxLayer);
    LMap.gpxLayer.addTo(LMap.map);
    try{ LMap.map.fitBounds(L.latLngBounds(line), { padding:[50,50] }); }catch(e){}
    // elevation from the imported track, if present
    var withE=pts.filter(function(p){ return typeof p.elev==='number'; });
    if(withE.length>1){ showElevation({ name:'Imported track', waypoints:withE.map(function(p,i){ return { n:i+1, name:'pt', lat:p.lat, lng:p.lng, elev:p.elev }; }) }); }
    toast('Track loaded ('+pts.length+' points)');
  };
  reader.onerror=function(){ toast('Could not read that file'); };
  reader.readAsText(file);
}
function parseGpx(text){
  var out=[];
  try{
    var doc=new DOMParser().parseFromString(text, 'application/xml');
    if(doc.getElementsByTagName('parsererror').length) return out;
    var nodes=doc.getElementsByTagName('trkpt');
    if(!nodes.length) nodes=doc.getElementsByTagName('rtept');
    if(!nodes.length) nodes=doc.getElementsByTagName('wpt');
    for(var i=0;i<nodes.length;i++){
      var la=parseFloat(nodes[i].getAttribute('lat')), lo=parseFloat(nodes[i].getAttribute('lon'));
      if(isNaN(la)||isNaN(lo)) continue;
      var eles=nodes[i].getElementsByTagName('ele'), e;
      if(eles.length){ var ev=parseFloat(eles[0].textContent); if(!isNaN(ev)) e=ev; }
      out.push({ lat:la, lng:lo, elev:e });
    }
  }catch(err){}
  return out;
}
// ---------------- Nearest-on-route (in-browser spatial, no library) ----------------
var ROUTE_CATS=[
  { key:'fuel',    label:'Fuel',    q:'["amenity"="fuel"]' },
  { key:'ev',      label:'EV',      q:'["amenity"="charging_station"]' },
  { key:'food',    label:'Food',    q:'["amenity"~"restaurant|cafe|fast_food"]' },
  { key:'water',   label:'Water',   q:'["amenity"="drinking_water"]' },
  { key:'rest',    label:'Rest',    q:'["highway"="rest_area"]' },
  { key:'toilets', label:'Toilets', q:'["amenity"="toilets"]' }
];
function routeCoords(){
  if(LMap.driveLayer && LMap.driveLayer.getLatLngs){ var ll=LMap.driveLayer.getLatLngs(); if(ll && ll.length) return ll.map(function(p){ return [p.lat,p.lng]; }); }
  if(LMap.curRoute && LMap.curRoute.waypoints) return LMap.curRoute.waypoints.map(function(w){ return [w.lat,w.lng]; });
  return null;
}
function segDistMeters(plat,plng, alat,alng, blat,blng){
  var R=6371000, rad=Math.PI/180, latc=Math.cos(alat*rad);
  var bx=(blng-alng)*rad*latc*R, by=(blat-alat)*rad*R;
  var px=(plng-alng)*rad*latc*R, py=(plat-alat)*rad*R;
  var len2=bx*bx+by*by, t=len2?(px*bx+py*by)/len2:0; t=t<0?0:(t>1?1:t);
  var ex=px-t*bx, ey=py-t*by;
  return Math.sqrt(ex*ex+ey*ey);
}
function distToRoute(plat,plng, coords){
  var min=Infinity;
  for(var i=1;i<coords.length;i++){ var d=segDistMeters(plat,plng, coords[i-1][0],coords[i-1][1], coords[i][0],coords[i][1]); if(d<min) min=d; }
  return min;
}
function bboxOf(coords, padM){
  var minLa=90,maxLa=-90,minLo=180,maxLo=-180;
  coords.forEach(function(c){ if(c[0]<minLa)minLa=c[0]; if(c[0]>maxLa)maxLa=c[0]; if(c[1]<minLo)minLo=c[1]; if(c[1]>maxLo)maxLo=c[1]; });
  var midLa=(minLa+maxLa)/2, dLa=padM/111000, dLo=padM/((111000*Math.cos(midLa*Math.PI/180))||1);
  return { s:minLa-dLa, w:minLo-dLo, n:maxLa+dLa, e:maxLo+dLo };
}
function nearestOnRoute(cat){
  var coords=routeCoords();
  if(!coords || coords.length<2){ toast('Open or draw a route first'); return; }
  if(!navigator.onLine){ toast('On-route search needs a connection'); return; }
  toast('Finding '+cat.label.toLowerCase()+' on your route…');
  var bb=bboxOf(coords, 3000);
  var box='('+bb.s+','+bb.w+','+bb.n+','+bb.e+')';
  var body='[out:json][timeout:20];(node'+cat.q+box+';way'+cat.q+box+';);out center 200;';
  fetch('https://overpass-api.de/api/interpreter', { method:'POST', body:body })
    .then(function(r){ return r.json(); }).then(function(j){
      var pts=parsePoi(j);
      if(!pts.length){ toast('No '+cat.label.toLowerCase()+' found near this route'); return; }
      pts.forEach(function(p){ p.off=distToRoute(p.lat,p.lng, coords); });
      pts.sort(function(a,b){ return a.off-b.off; });
      var best=pts[0];
      if(LMap.onRouteLayer){ LMap.map.removeLayer(LMap.onRouteLayer); }
      LMap.onRouteLayer=L.layerGroup();
      pts.slice(0,8).forEach(function(p,i){
        var top=i===0;
        L.circleMarker([p.lat,p.lng], { radius:top?9:6, color:'#04140a', weight:2, fillColor:top?'#2fd85f':'#3d8bff', fillOpacity:1 })
          .bindPopup('<b>'+esc(p.name||cat.label)+'</b><br>'+fmtDist(p.off)+' off route').addTo(LMap.onRouteLayer);
      });
      LMap.onRouteLayer.addTo(LMap.map);
      try{ LMap.map.panTo([best.lat,best.lng]); }catch(e){}
      toast('Nearest '+cat.label.toLowerCase()+': '+fmtDist(best.off)+' off route');
      speak('Nearest '+cat.label.toLowerCase()+' is '+fmtDist(best.off)+' off your route.');
    }).catch(function(){ toast('Could not search right now'); });
}
// ---------------- Smart logic: speed-limit warning, live ETA, reroute (no AI) ----------------
var _spd={ limit:null, at:0, lat:0, lng:0, warnedAt:0 };
function checkSpeedLimit(){
  if(!state.pos || !navigator.onLine) return;
  var now=Date.now(), moved=_spd.lat? haversine(state.pos.lat,state.pos.lng,_spd.lat,_spd.lng):9999;
  if(_spd.at && (now-_spd.at)<15000 && moved<250){ evalSpeed(); return; }
  _spd.at=now; _spd.lat=state.pos.lat; _spd.lng=state.pos.lng;
  var la=state.pos.lat, lo=state.pos.lng;
  var body='[out:json][timeout:10];way(around:25,'+la+','+lo+')["highway"]["maxspeed"];out tags 1;';
  fetch('https://overpass-api.de/api/interpreter', { method:'POST', body:body })
    .then(function(r){ return r.json(); }).then(function(j){
      var lim=null;
      if(j && j.elements){ for(var i=0;i<j.elements.length;i++){ var mx=j.elements[i].tags && j.elements[i].tags.maxspeed; if(mx){ var m=parseInt(mx,10); if(!isNaN(m)){ lim=/mph/i.test(mx)?Math.round(m*1.60934):m; break; } } } }
      _spd.limit=lim; evalSpeed();
    }).catch(function(){});
}
function evalSpeed(){
  var sp=el('speedpill');
  if(_spd.limit==null || state.curSpeed==null){ if(sp) sp.classList.remove('over'); return; }
  var over=state.curSpeed-_spd.limit;
  if(sp) sp.classList.toggle('over', over>5);
  if(over>7 && Date.now()-_spd.warnedAt>20000){ _spd.warnedAt=Date.now(); chime('next'); speak('Slow down. The limit here is '+_spd.limit+'.', true); }
}
function updateEta(){
  var pill=el('mapEta'); if(!pill) return;
  var R=LMap.route;
  if(!R || !state.pos){ return; }
  var coords=R.coords, best=Infinity, bi=0;
  for(var i=0;i<coords.length;i++){ var d=haversine(state.pos.lat,state.pos.lng,coords[i][0],coords[i][1]); if(d<best){ best=d; bi=i; } }
  var rem=0; for(var k=bi+1;k<coords.length;k++){ rem+=haversine(coords[k-1][0],coords[k-1][1],coords[k][0],coords[k][1]); }
  var frac=R.lengthM? rem/R.lengthM : 0, secs=Math.max(0, Math.round(R.timeSec*frac));
  var mins=Math.round(secs/60);
  pill.innerHTML='<b>'+(mins<1?'<1':mins)+'</b><span>MIN · '+fmtDist(rem)+'</span>';
  pill.classList.add('on');
  if(best>70 && !R.offNotified){ R.offNotified=true; toast('Off route — tap a mode to re-route'); }
  else if(best<=70){ R.offNotified=false; }
}
function rerouteAvoiding(lat,lng){
  if(!LMap.from || !LMap.dest){ return; }
  LMap.avoid=LMap.avoid||[]; LMap.avoid.push({ lat:lat, lon:lng });
  toast('Re-routing around the hazard…');
  drawRoute(LMap.from, LMap.dest, LMap.costing||'auto');
}
function toggleRain(){
  if(!LMap.map) return;
  var btn=el('mapRain');
  if(LMap.rainLayer){ LMap.map.removeLayer(LMap.rainLayer); LMap.rainLayer=null; if(btn) btn.classList.remove('on'); return; }
  if(!navigator.onLine){ toast('Rain radar needs a connection'); return; }
  toast('Loading rain radar…');
  fetch('https://api.rainviewer.com/public/weather-maps.json').then(function(r){ return r.json(); }).then(function(j){
    var frames=(j && j.radar && j.radar.past) || [];
    if(j && j.radar && j.radar.nowcast && j.radar.nowcast.length) frames=frames.concat(j.radar.nowcast);
    if(!frames.length){ toast('No radar available right now'); return; }
    var f=frames[frames.length-1], host=j.host || 'https://tilecache.rainviewer.com';
    var url=host + f.path + '/256/{z}/{x}/{y}/2/1_1.png';
    LMap.rainLayer=L.tileLayer(url, { opacity:0.6, attribution:'Radar &copy; RainViewer' }).addTo(LMap.map);
    if(btn) btn.classList.add('on');
    toast('Rain radar on');
  }).catch(function(){ toast('Could not load radar'); });
}
function startMapLocate(){
  if(LMap.watch!=null || !navigator.geolocation) return;
  LMap.watch=navigator.geolocation.watchPosition(function(pos){
    var ll=[pos.coords.latitude,pos.coords.longitude];
    state.pos={ lat:pos.coords.latitude, lng:pos.coords.longitude, acc:pos.coords.accuracy };
    state.curSpeed=speedKmh(pos);
    if(!LMap.meMarker){ LMap.meMarker=L.circleMarker(ll, { radius:8, color:'#fff', weight:2, fillColor:'#3d8bff', fillOpacity:1 }).addTo(LMap.map); }
    else LMap.meMarker.setLatLng(ll);
    updateEta();
    checkSpeedLimit();
    checkCameraAhead();
    if(!LMap._hzLoaded){ LMap._hzLoaded=true; loadHazards(state.pos.lat, state.pos.lng); }
  }, function(){}, { enableHighAccuracy:true, maximumAge:5000 });
}
/* ---------------- Map browser chrome (dark map: search, region pills, category pins) ---------------- */
var MAP_CATS=[
  { key:'fuel',      label:'Fuel',        letter:'F', color:'#ff8c1e', q:['["amenity"="fuel"]'] },
  { key:'ev',        label:'EV charging', letter:'E', color:'#2fd85f', q:['["amenity"="charging_station"]'] },
  { key:'waterfall', label:'Waterfalls',  letter:'W', color:'#3d8bff', q:['["natural"="waterfall"]'] },
  { key:'beach',     label:'Beaches',     letter:'B', color:'#c8971f', q:['["natural"="beach"]'] },
  { key:'camp',      label:'Camping',     letter:'C', color:'#9b27d4', q:['["tourism"="camp_site"]'] },
  { key:'view',      label:'Viewpoints',  letter:'V', color:'#e84c3d', q:['["tourism"="viewpoint"]'] }
];
var MAP_REGIONS=[
  { key:'all', label:'All',            lat:44.0, lng:2.0,  zoom:4 },
  { key:'pt',  label:'Portugal',       lat:39.6, lng:-8.0, zoom:6 },
  { key:'es',  label:'Spain',          lat:40.2, lng:-3.7, zoom:6 },
  { key:'fr',  label:'France',         lat:46.6, lng:2.5,  zoom:6 },
  { key:'it',  label:'Italy',          lat:42.5, lng:12.5, zoom:6 },
  { key:'gr',  label:'Greece',         lat:39.0, lng:22.0, zoom:6 },
  { key:'gb',  label:'United Kingdom', lat:54.0, lng:-2.5, zoom:6 }
];
function buildMapChrome(){
  var reg=el('mapRegions');
  if(reg && !reg.getAttribute('data-built')){
    reg.setAttribute('data-built','1');
    reg.innerHTML=MAP_REGIONS.map(function(r,i){ return '<button data-region="'+r.key+'"'+(i===0?' class="on"':'')+'>'+esc(r.label)+'</button>'; }).join('');
    $$('[data-region]',reg).forEach(function(b){ b.onclick=function(){ $$('[data-region]',reg).forEach(function(x){ x.classList.remove('on'); }); b.classList.add('on'); jumpRegion(b.getAttribute('data-region')); }; });
  }
  var leg=el('mapLegend');
  if(leg && !leg.getAttribute('data-built')){
    leg.setAttribute('data-built','1');
    leg.innerHTML=MAP_CATS.map(function(c){ return '<button data-mcat="'+c.key+'"><span class="ldot" style="background:'+c.color+'"></span>'+esc(c.label)+'</button>'; }).join('');
    $$('[data-mcat]',leg).forEach(function(b){ b.onclick=function(){ toggleMapCat(b.getAttribute('data-mcat'), b); }; });
  }
}
function jumpRegion(key){
  var r=null; for(var i=0;i<MAP_REGIONS.length;i++){ if(MAP_REGIONS[i].key===key) r=MAP_REGIONS[i]; }
  if(r && LMap.map) LMap.map.setView([r.lat,r.lng], r.zoom);
}
function catPin(cat, p){
  var icon=L.divIcon({ className:'cat-pin', html:'<span style="background:'+cat.color+'">'+cat.letter+'</span>', iconSize:[30,30], iconAnchor:[15,15] });
  return L.marker([p.lat,p.lng], { icon:icon }).bindPopup('<b>'+esc(p.name||cat.label)+'</b><br>'+esc(cat.label));
}
function toggleMapCat(key, btn){
  if(!LMap.map) return;
  if(!LMap.catLayers) LMap.catLayers={};
  var cat=null; for(var i=0;i<MAP_CATS.length;i++){ if(MAP_CATS[i].key===key) cat=MAP_CATS[i]; }
  if(!cat) return;
  if(LMap.catLayers[key]){ LMap.map.removeLayer(LMap.catLayers[key]); delete LMap.catLayers[key]; if(btn) btn.classList.remove('on'); return; }
  if(!navigator.onLine){ toast('Categories need a connection'); return; }
  if(LMap.map.getZoom()<7){ toast('Zoom in to load '+cat.label.toLowerCase()); return; }
  if(btn) btn.classList.add('on');
  var b=LMap.map.getBounds(), box='('+b.getSouth()+','+b.getWest()+','+b.getNorth()+','+b.getEast()+')';
  var body='[out:json][timeout:20];(';
  cat.q.forEach(function(f){ body+='node'+f+box+';way'+f+box+';'; });
  body+=');out center 120;';
  toast('Loading '+cat.label.toLowerCase()+'…');
  fetch('https://overpass-api.de/api/interpreter', { method:'POST', body:body }).then(function(r){ return r.json(); }).then(function(j){
    var pts=parsePoi(j);
    if(!pts.length){ toast('No '+cat.label.toLowerCase()+' in view'); if(btn) btn.classList.remove('on'); return; }
    var lay=L.layerGroup();
    pts.forEach(function(p){ catPin(cat, p).addTo(lay); });
    lay.addTo(LMap.map); LMap.catLayers[key]=lay;
    toast(pts.length+' '+cat.label.toLowerCase());
  }).catch(function(){ toast('Could not load '+cat.label.toLowerCase()); if(btn) btn.classList.remove('on'); });
}
function clearMapCats(){
  if(LMap.catLayers){ for(var k in LMap.catLayers){ try{ LMap.map.removeLayer(LMap.catLayers[k]); }catch(e){} } LMap.catLayers={}; }
  var leg=el('mapLegend'); if(leg) $$('[data-mcat]',leg).forEach(function(b){ b.classList.remove('on'); });
}
var _msRes=[], _msT;
function mapSearchRun(){
  var box=el('mapSearch'), res=el('mapSearchRes'); if(!box||!res) return;
  var q=(box.value||'').trim();
  clearTimeout(_msT);
  if(q.length<3 || !navigator.onLine){ res.classList.remove('on'); res.innerHTML=''; return; }
  _msT=setTimeout(function(){
    fetch('https://photon.komoot.io/api/?limit=6&q='+encodeURIComponent(q)).then(function(r){ return r.json(); }).then(function(j){
      var feats=(j&&j.features)||[];
      _msRes=feats.map(function(f){ var c=(f.geometry&&f.geometry.coordinates)||[], pr=f.properties||{};
        return { name:pr.name||pr.city||pr.street||'Place', area:[pr.city,pr.state,pr.country].filter(Boolean).join(', '), lat:c[1], lng:c[0] }; })
        .filter(function(x){ return x.lat!=null && x.lng!=null; });
      if(!_msRes.length){ res.classList.remove('on'); res.innerHTML=''; return; }
      res.innerHTML=_msRes.map(function(p,i){ return '<button data-msr="'+i+'"><b>'+esc(p.name)+'</b><span>'+esc(p.area||'Result')+'</span></button>'; }).join('');
      res.classList.add('on');
      $$('[data-msr]',res).forEach(function(b){ b.onclick=function(){
        var p=_msRes[parseInt(b.getAttribute('data-msr'),10)]; if(!p) return;
        res.classList.remove('on'); box.value=p.name; try{ box.blur(); }catch(e){}
        showSearchResult(p);
      }; });
    }).catch(function(){ res.classList.remove('on'); });
  }, 400);
}
function showSearchResult(p){
  if(!LMap.map) return;
  if(LMap.searchMarker){ try{ LMap.map.removeLayer(LMap.searchMarker); }catch(e){} }
  LMap.searchMarker=L.marker([p.lat,p.lng]).addTo(LMap.map).bindPopup('<b>'+esc(p.name)+'</b>').openPopup();
  LMap.map.setView([p.lat,p.lng], 13);
  LMap.dest=[p.lat,p.lng];
  var mm=el('mapModes'); if(mm){ mm.classList.add('on'); $$('#mapModes button').forEach(function(x){ x.classList.toggle('on', x.getAttribute('data-mode')==='auto'); }); }
}
function bindBacks(scope){
  $$('[data-back]',scope).forEach(function(b){
    b.onclick=function(){
      stopWatch();
      var t=b.getAttribute('data-back');
      if(t==='guided-detail' && state.curGuide){ openGuided(state.curGuide); }
      else { navTo(t); }
    };
  });
}

/* ---------------- Places ---------------- */
function renderChips(){
  var c=el('ccChips');
  var fc=favs().length;
  var html='<button class="chip'+(state.cc==='ALL'?' on':'')+'" data-cc="ALL">All</button>';
  html+='<button class="chip fav-chip'+(state.cc==='FAV'?' on':'')+'" data-cc="FAV">Saved'+(fc?(' '+fc):'')+'</button>';
  var pc=getPins().length;
  html+='<button class="chip fav-chip'+(state.cc==='PINS'?' on':'')+'" data-cc="PINS">My pins'+(pc?(' '+pc):'')+'</button>';
  LM.countries.forEach(function(k){ html+='<button class="chip'+(state.cc===k.cc?' on':'')+'" data-cc="'+k.cc+'">'+esc(k.name)+'</button>'; });
  c.innerHTML=html;
  $$('.chip',c).forEach(function(b){ b.onclick=function(){ state.cc=b.getAttribute('data-cc'); renderChips(); renderPlaces(); }; });
}
function allItems(){
  var items=[];
  LM.guided.forEach(function(g){ items.push({ kind:'guided', ref:g, name:g.name, area:g.area, cc:g.cc, lat:g.waypoints[0].lat, lng:g.waypoints[0].lng, blurb:'Guided trail · '+g.distanceKm+' km · '+g.timeMin+' min' }); });
  LM.places.forEach(function(p){ items.push({ kind:'place', ref:p, name:p.name, area:p.area, cc:p.cc, lat:p.lat, lng:p.lng, blurb:p.blurb }); });
  return items;
}
function renderPlaces(){
  var q=((el('q')&&el('q').value)||'').trim().toLowerCase();
  var base = state.cc==='PINS'
    ? getPins().map(function(pn){ return { kind:'pin', ref:pn, name:pn.name, area:pn.area, cc:pn.cc, lat:pn.lat, lng:pn.lng, blurb:pn.lat.toFixed(4)+', '+pn.lng.toFixed(4) }; })
    : allItems();
  var items=base.filter(function(it){
    if(state.cc==='FAV'){ if(!isFav(it.ref.id)) return false; }
    else if(state.cc!=='ALL' && state.cc!=='PINS' && it.cc!==state.cc) return false;
    if(q){ if((it.name+' '+it.area+' '+it.blurb).toLowerCase().indexOf(q)<0) return false; }
    return true;
  });
  if(state.pos){ items.sort(function(a,b){ return haversine(state.pos.lat,state.pos.lng,a.lat,a.lng)-haversine(state.pos.lat,state.pos.lng,b.lat,b.lng); }); }
  var host=el('placeList');
  if(!items.length){
    host.innerHTML = state.cc==='FAV'
      ? '<div class="info flat"><p class="muted">No saved places yet. Tap the star on any place to save it here.</p></div>'
      : (state.cc==='PINS'
        ? '<div class="info flat"><p class="muted">No pins yet. Open the <b>Live map</b> and tap <b>Drop pin</b> to save your own spot.</p></div>'
        : '<div class="info flat"><p class="muted">No match. Try another word or a different country.</p></div>');
    return;
  }
  host.innerHTML=items.map(function(it){
    var dist='';
    if(state.pos){ var d=haversine(state.pos.lat,state.pos.lng,it.lat,it.lng), br=bearing(state.pos.lat,state.pos.lng,it.lat,it.lng);
      dist='<div class="dist"><b>'+fmtDist(d)+'</b><span>'+compass(br)+'</span></div>'; }
    var flag = it.kind==='pin' ? 'PIN' : esc(it.cc);
    var tags = it.kind==='guided'
      ? '<span class="tag guide">Guided route</span><span class="tag ok">Offline ready</span>'
      : (it.kind==='pin' ? '<span class="tag">Your pin</span>' : '<span class="tag">'+esc(ccName(it.cc))+'</span>');
    var star = it.kind==='pin' ? '' : '<span class="fav'+(isFav(it.ref.id)?' on':'')+'" data-fav="'+it.ref.id+'" role="button" aria-label="Save">'+ICO.star+'</span>';
    return '<button class="card place" data-open="'+it.kind+':'+it.ref.id+'">'+ star +
      '<div class="top">'+
      '<div class="flag">'+flag+'</div>'+
      '<div><h3>'+esc(it.name)+'</h3><div class="area">'+esc(it.area)+'</div></div>'+ dist +
      '</div><div class="muted small" style="margin-top:8px">'+esc(it.blurb)+'</div>'+ tags +'</button>';
  }).join('');
  $$('[data-fav]',host).forEach(function(s){ s.onclick=function(e){ e.stopPropagation(); e.preventDefault();
    toggleFav(s.getAttribute('data-fav')); renderChips(); renderPlaces(); }; });
  $$('[data-open]',host).forEach(function(b){ b.onclick=function(){ var pr=b.getAttribute('data-open').split(':');
    if(pr[0]==='guided'){ openGuided(byId(LM.guided,pr[1])); }
    else if(pr[0]==='pin'){ openPlace(byId(getPins(),pr[1])); }
    else { openPlace(byId(LM.places,pr[1])); } }; });
}
/* search anywhere (Photon geocoder, free/no key) */
var _world=[], _worldT;
function searchWorld(){
  var box=el('q'), host=el('worldResults'); if(!host) return;
  var q=((box&&box.value)||'').trim();
  clearTimeout(_worldT);
  if(q.length<3 || !navigator.onLine){ host.innerHTML=''; return; }
  _worldT=setTimeout(function(){
    host.innerHTML='<p class="muted small" style="margin:12px 2px 6px">Searching everywhere…</p>';
    fetch('https://photon.komoot.io/api/?limit=8&q='+encodeURIComponent(q)).then(function(r){ return r.json(); }).then(function(j){
      var feats=(j&&j.features)||[];
      _world=feats.map(function(f,i){
        var c=(f.geometry&&f.geometry.coordinates)||[], pr=f.properties||{};
        var name=pr.name||pr.street||pr.city||'Place';
        var area=[pr.city,pr.state,pr.country].filter(Boolean).join(', ');
        return { id:'world-'+i, name:name, area:area||'Search result', cc:(pr.countrycode||'').toUpperCase(), lat:c[1], lng:c[0] };
      }).filter(function(x){ return x.lat!=null && x.lng!=null; });
      if(!_world.length){ host.innerHTML=''; return; }
      host.innerHTML='<h2 class="sec" style="font-size:1.05rem">Search results (worldwide)</h2>'+
        _world.map(function(p){
          var d=state.pos?(' · '+fmtDist(haversine(state.pos.lat,state.pos.lng,p.lat,p.lng))):'';
          return '<button class="card place" data-world="'+p.id+'"><div class="top"><div class="thumb place">'+ICO.pin+'</div><div><h3>'+esc(p.name)+'</h3><div class="area">'+esc(p.area)+esc(d)+'</div></div></div></button>';
        }).join('');
      $$('[data-world]',host).forEach(function(b){ b.onclick=function(){ var id=b.getAttribute('data-world');
        for(var i=0;i<_world.length;i++){ if(_world[i].id===id){ openPlace(_world[i]); break; } } }; });
    }).catch(function(){ if(host) host.innerHTML=''; });
  }, 450);
}
function doShare(title, text){
  if(navigator.share){ navigator.share({title:title, text:text}).catch(function(){}); }
  else if(navigator.clipboard){ navigator.clipboard.writeText(text).then(function(){ toast('Copied'); }, function(){ toast(text); }); }
  else { toast(text); }
}

/* ---------------- Place detail + guide-to ---------------- */
function openPlace(p){
  if(!p) return;
  state.curPlace=p; state.detailKind='place';
  state.curEmergency=emergencyFor(p.cc);
  var d=state.pos?haversine(state.pos.lat,state.pos.lng,p.lat,p.lng):null;
  var br=state.pos?bearing(state.pos.lat,state.pos.lng,p.lat,p.lng):null;
  var v=el('v-detail');
  v.innerHTML=
    '<button class="back" data-back="places">'+ICO.left+' Places</button>'+
    '<div class="hero"><div class="flag">'+esc(p.cc)+'</div><h2>'+esc(p.name)+'</h2><div class="area">'+esc(p.area)+'</div>'+
      '<div class="bigdist"><b id="dd">'+(d!=null?fmtDist(d):'--')+'</b> <span id="ddc">'+(br!=null?('· head '+compass(br)):'')+'</span></div>'+
      '<div class="arrow" id="darrow" style="transform:rotate('+(br||0)+'deg)">'+ICO.up+'</div>'+
      '<div class="coordline">'+p.lat.toFixed(4)+', '+p.lng.toFixed(4)+'</div></div>'+
    galleryHTML(p.images)+
    '<div class="wx" id="wxCard"></div>'+
    '<div class="fire" id="fireCard"></div>'+
    '<div class="info"><h4>About</h4><p>'+esc(p.blurb)+'</p></div>'+
    (state.pos?'':'<div class="info"><p class="muted small">Tap <b>Guide me there</b> and allow location to see live distance and direction.</p></div>')+
    '<button class="btn green" id="guideBtn">'+ICO.nav+' Guide me there</button>'+
    '<div class="row2" style="margin-top:10px">'+
      '<button class="savebtn'+(isFav(p.id)?' on':'')+'" id="favBtn" style="margin-top:0">'+ICO.star+'<span id="favTxt">'+(isFav(p.id)?'Saved':'Save')+'</span></button>'+
      '<button class="savebtn" id="shareBtn" style="margin-top:0">'+ICO.share+' Share</button>'+
    '</div>'+
    '<button class="btn ghost" id="placeMapBtn" style="margin-top:10px">'+ICO.pin+' Show on live map</button>'+
    '<button class="btn ghost" id="dirBtn" style="margin-top:10px">'+ICO.nav+' Directions (drive)</button>'+
    (p.pin ? '<button class="btn ghost" id="rmPinBtn" style="margin-top:10px;color:var(--red)">Remove pin</button>' : '')+
    '<div style="height:10px"></div>'+
    '<button class="btn sos" id="sosBtn">'+ICO.phone+' Emergency '+esc(state.curEmergency)+'</button>'+
    '<p class="muted small" style="text-align:center;margin-top:8px">Dials '+esc(state.curEmergency)+' ('+esc(ccName(p.cc))+') and shows your coordinates to read out.</p>';
  showView('detail','places');
  bindBacks(v);
  bindGallery(v);
  loadWeather(p.lat, p.lng, 'wxCard');
  loadFire(p.lat, p.lng, 'fireCard');
  el('guideBtn').onclick=function(){ startPlaceGuide(p); };
  el('sosBtn').onclick=function(){ doSOS(); };
  el('favBtn').onclick=function(){ toggleFav(p.id); var on=isFav(p.id);
    el('favBtn').classList.toggle('on',on); el('favTxt').textContent=on?'Saved':'Save'; };
  el('shareBtn').onclick=function(){ doShare('Load Maps — '+p.name, p.name+' ('+p.area+')  '+p.lat.toFixed(4)+', '+p.lng.toFixed(4)); };
  if(el('placeMapBtn')) el('placeMapBtn').onclick=function(){ openMap({ place:p }); };
  if(el('dirBtn')) el('dirBtn').onclick=function(){ openMap({ place:p, directions:true }); };
  if(el('rmPinBtn')) el('rmPinBtn').onclick=function(){ removePin(p.id); toast('Pin removed'); state.cc='PINS'; renderChips(); navTo('places'); };
}
function startPlaceGuide(p){
  state.voiceOn=true; updateVoiceLabel();
  speak('Guiding to '+p.name+'.', true);
  stopWatch();
  var lastT=0;
  state.watchId=navigator.geolocation.watchPosition(function(pos){
    state.pos={ lat:pos.coords.latitude, lng:pos.coords.longitude, acc:pos.coords.accuracy };
    var d=haversine(state.pos.lat,state.pos.lng,p.lat,p.lng), br=bearing(state.pos.lat,state.pos.lng,p.lat,p.lng);
    var dd=el('dd'), ddc=el('ddc'), ar=el('darrow');
    if(dd) dd.textContent=fmtDist(d);
    if(ddc) ddc.textContent='· head '+compass(br);
    if(ar) ar.style.transform='rotate('+br+'deg)';
    var now=Date.now();
    if(d<40){ speak('You have arrived at '+p.name+'.', true); stopWatch(); }
    else if(now-lastT>25000){ lastT=now; speak(fmtDist(d)+' to '+p.name+', head '+compass(br)+'.'); }
  }, function(){ toast('Location needed for guidance'); }, { enableHighAccuracy:true, maximumAge:5000, timeout:15000 });
  toast('Guiding — keep the app open');
}
function doSOS(){
  var coords = state.pos ? (state.pos.lat.toFixed(4)+', '+state.pos.lng.toFixed(4)) : 'unknown — enable location';
  var num = state.curEmergency || LM.EMERGENCY_DEFAULT;
  toast('Calling '+num+' · your location: '+coords);
  try{ window.location.href='tel:'+num; }catch(e){}
}

/* ---------------- Guided routes ---------------- */
function renderGuidedList(){
  var v=el('v-guided');
  v.innerHTML='<h2 class="sec">Guided routes</h2>'+
    '<p class="muted small" style="margin:0 0 12px">Full trails with waypoints, the climb and spoken hazard warnings. They work offline.</p>'+
    LM.guided.map(function(g){
      return '<button class="card place" data-guide="'+g.id+'"><div class="top"><div class="flag">'+esc(g.cc)+'</div>'+
        '<div><h3>'+esc(g.name)+'</h3><div class="area">'+esc(g.area)+'</div></div></div>'+
        '<div class="muted small" style="margin-top:8px">'+g.distanceKm+' km · '+g.timeMin+' min · '+esc(g.difficulty)+'</div>'+
        '<span class="tag hike">Hike</span><span class="tag ok">Offline ready</span></button>';
    }).join('');
  $$('[data-guide]',v).forEach(function(b){ b.onclick=function(){ openGuided(byId(LM.guided,b.getAttribute('data-guide'))); }; });
}
function elevSvg(g){
  var els=g.waypoints.map(function(w){ return w.elev; });
  if(els.some(function(e){ return e==null || isNaN(e); })) return ''; // no elevation data -> no chart
  var min=Math.min.apply(null,els), max=Math.max.apply(null,els);
  var W=280,H=70,n=els.length;
  var pts=els.map(function(e,i){ var x=(i/(n-1))*W; var y=H-6-((e-min)/((max-min)||1))*(H-16); return x.toFixed(0)+','+y.toFixed(0); });
  return '<div class="elev"><div class="l">Elevation — climbs about '+g.elevGainM+' m</div>'+
    '<svg width="100%" height="'+H+'" viewBox="0 0 '+W+' '+H+'" preserveAspectRatio="none">'+
    '<polygon points="0,'+H+' '+pts.join(' ')+' '+W+','+H+'" fill="rgba(47,216,95,.12)"/>'+
    '<polyline points="'+pts.join(' ')+'" fill="none" stroke="#2fd85f" stroke-width="2.5"/></svg></div>';
}
function prepCard(g){
  var type=g.type||'hike', items=(LM.prep&&LM.prep[type])||(LM.prep&&LM.prep.hike)||[], saved=getPrep(g.id);
  var pct=items.length?Math.round(saved.length/items.length*100):0;
  return '<div class="info"><h4>Prep checklist</h4><div class="prepbar"><i style="width:'+pct+'%"></i></div>'+
    items.map(function(t,i){ var on=saved.indexOf(i)>=0;
      return '<label class="chk'+(on?' on':'')+'" data-prep="'+i+'"><span class="box">'+(on?ICO.check:'')+'</span>'+esc(t)+'</label>'; }).join('')+'</div>';
}
function routeMapSVG(g){
  var wps=g.waypoints; if(!wps || wps.length<2) return '';
  var lats=wps.map(function(w){return w.lat;}), lngs=wps.map(function(w){return w.lng;});
  var minLa=Math.min.apply(null,lats), maxLa=Math.max.apply(null,lats);
  var minLo=Math.min.apply(null,lngs), maxLo=Math.max.apply(null,lngs);
  var midLa=(minLa+maxLa)/2, k=Math.cos(midLa*Math.PI/180)||1;
  var W=320, H=190, pad=28;
  var spanX=Math.max((maxLo-minLo)*k, 1e-6), spanY=Math.max(maxLa-minLa, 1e-6);
  var s=Math.min((W-2*pad)/spanX, (H-2*pad)/spanY);
  var offX=((W-2*pad)-spanX*s)/2, offY=((H-2*pad)-spanY*s)/2;
  function X(lo){ return pad + (lo-minLo)*k*s + offX; }
  function Y(la){ return H-pad - (la-minLa)*s - offY; }
  var pts=wps.map(function(w){ return X(w.lng).toFixed(1)+','+Y(w.lat).toFixed(1); }).join(' ');
  var grid='';
  for(var gx=0; gx<=W; gx+=26){ grid+='<line x1="'+gx+'" y1="0" x2="'+gx+'" y2="'+H+'"/>'; }
  for(var gy=0; gy<=H; gy+=26){ grid+='<line x1="0" y1="'+gy+'" x2="'+W+'" y2="'+gy+'"/>'; }
  var pins=wps.map(function(w,i){
    var x=X(w.lng), y=Y(w.lat);
    var col=w.hazard ? (w.hazard.level==='high'?'#ff4d3d':'#ffb023') : (i===0?'#2fd85f':(i===wps.length-1?'#ffb023':'#3d8bff'));
    return '<g transform="translate('+x.toFixed(1)+' '+y.toFixed(1)+')">'+
      (w.hazard?'<circle r="13" fill="'+col+'" opacity=".18"/>':'')+
      '<circle r="9" fill="#0b1120" stroke="'+col+'" stroke-width="2.5"/>'+
      '<text y="3.4" text-anchor="middle" font-size="9" font-weight="800" fill="'+col+'">'+w.n+'</text></g>';
  }).join('');
  var svg='<svg viewBox="0 0 '+W+' '+H+'" preserveAspectRatio="xMidYMid meet">'+
    '<defs><linearGradient id="rmbg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#12203a"/><stop offset="1" stop-color="#0a1020"/></linearGradient>'+
    '<linearGradient id="rmline" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="#3d8bff"/><stop offset="1" stop-color="#2fd85f"/></linearGradient></defs>'+
    '<rect width="'+W+'" height="'+H+'" fill="url(#rmbg)"/>'+
    '<g stroke="rgba(255,255,255,.05)" stroke-width="1">'+grid+'</g>'+
    '<polyline points="'+pts+'" fill="none" stroke="#0b3a6b" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" opacity=".7"/>'+
    '<polyline points="'+pts+'" fill="none" stroke="url(#rmline)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>'+
    pins+
    '<g transform="translate('+(W-16)+' 18)"><circle r="10" fill="rgba(10,16,32,.7)" stroke="rgba(255,255,255,.2)"/><path d="M0 -6 L3 3 L0 1 L-3 3 Z" fill="#e9edf6"/><text y="-11" text-anchor="middle" font-size="7" fill="#95a0b6">N</text></g>'+
    '</svg>';
  return '<div class="routemap">'+svg+'<div class="cap">Route map &middot; '+esc(g.name)+' &middot; '+g.distanceKm+' km'+
    ' <span style="opacity:.8">(green = start, amber = end, red = hazard)</span></div></div>';
}
function openGuided(g){
  if(!g) return;
  state.curGuide=g; state.detailKind='guide';
  state.curEmergency=emergencyFor(g.cc);
  var wl=g.waypoints.map(function(w){
    var hz = w.hazard ? '<div class="hz '+w.hazard.level+'">'+ICO.warn+esc(w.hazard.text)+'</div>' : '';
    var meta = (w.elev!=null ? w.elev+' m' : '') + (w.approx ? ((w.elev!=null?'<br>':'')+'approx') : '');
    return '<div class="wp"><div class="wpn">'+w.n+'</div><div class="wt"><b>'+esc(w.name)+'</b>'+
      '<div class="d">'+esc(w.desc)+'</div>'+hz+'</div>'+
      '<div class="wpmeta">'+meta+'</div></div>';
  }).join('');
  var stopsCard = (g.stops&&g.stops.length) ? '<div class="info"><h4>Fuel &amp; stops</h4>'+
    g.stops.map(function(s){ return '<p style="margin:0 0 4px">'+esc(s)+'</p>'; }).join('')+'</div>' : '';
  var gallery = (g.images&&g.images.length) ? '<div class="gallery">'+g.images.map(function(im){
    return '<figure><img loading="lazy" src="'+esc(im.src)+'" alt="'+esc(im.cap)+'" data-img="'+esc(im.src)+'"><figcaption>'+esc(im.cap)+'</figcaption></figure>';
  }).join('')+'</div>' : '';
  var backKey = (g.type==='drive'?'drive':'hike');
  var backLabel = (g.type==='drive'?'Drive':'Hike');
  var v=el('v-detail');
  v.innerHTML=
    '<button class="back" data-back="'+backKey+'">'+ICO.left+' '+backLabel+'</button>'+
    '<h2 class="sec" style="margin-top:2px">'+esc(g.name)+'</h2>'+
    '<p class="muted small" style="margin:0 0 12px">'+esc(g.area)+' · '+g.distanceKm+' km · '+g.timeMin+' min · '+esc(g.difficulty)+'</p>'+
    routeMapSVG(g)+
    '<button class="btn ghost" id="mapBtn" style="margin-bottom:14px">'+ICO.pin+' Open live map</button>'+
    gallery+
    '<div class="wx" id="wxCard"></div>'+
    '<div class="fire" id="fireCard"></div>'+
    '<div class="comfort">'+ICO.shield+'<div><b>Comfort mode</b><span class="s">'+esc(g.comfort)+'</span></div></div>'+
    (g.type==='hike'?elevSvg(g):'')+
    '<div class="info flat"><h4>'+(g.type==='drive'?'Road sections':'Waypoints')+'</h4>'+wl+'</div>'+
    stopsCard+
    '<div class="info"><h4>Good to know</h4><p>'+esc(g.signal)+' '+esc(g.tolls)+'</p>'+
      (g.coordsApprox?'<p class="small" style="margin-top:6px">Waypoints marked <b>approx</b> are placed roughly for now — they get fine-tuned by walking the trail.</p>':'')+'</div>'+
    prepCard(g)+
    '<button class="btn green" id="startGuide">'+ICO.play+' '+(g.type==='drive'?'Start driving':'Start guiding')+'</button>'+
    '<div class="row2" style="margin-top:10px">'+
      '<button class="savebtn'+(isFav(g.id)?' on':'')+'" id="favG" style="margin-top:0">'+ICO.star+'<span id="favGt">'+(isFav(g.id)?'Saved':'Save')+'</span></button>'+
      '<button class="savebtn" id="shareG" style="margin-top:0">'+ICO.share+' Share plan</button>'+
    '</div>'+
    '<div style="height:10px"></div>'+
    '<button class="btn sos" id="sosG">'+ICO.phone+' Emergency '+esc(state.curEmergency)+'</button>';
  showView('detail', backKey);
  bindBacks(v);
  $$('[data-img]',v).forEach(function(im){ im.onclick=function(){ openLightbox(im.getAttribute('data-img')); }; });
  loadWeather(g.waypoints[0].lat, g.waypoints[0].lng, 'wxCard');
  loadFire(g.waypoints[0].lat, g.waypoints[0].lng, 'fireCard');
  el('startGuide').onclick=function(){ startGuidedLive(g); };
  if(el('mapBtn')) el('mapBtn').onclick=function(){ openMap({ route:g }); };
  el('sosG').onclick=function(){ doSOS(); };
  el('favG').onclick=function(){ toggleFav(g.id); var on=isFav(g.id); el('favG').classList.toggle('on',on); el('favGt').textContent=on?'Saved':'Save'; };
  el('shareG').onclick=function(){ doShare('Load Maps — '+g.name, g.name+' ('+g.area+') — '+g.distanceKm+' km, '+g.timeMin+' min. Parking '+g.waypoints[0].lat.toFixed(4)+', '+g.waypoints[0].lng.toFixed(4)); };
  $$('[data-prep]',v).forEach(function(lb){ lb.onclick=function(){
    var i=parseInt(lb.getAttribute('data-prep'),10), s=getPrep(g.id), k=s.indexOf(i);
    if(k>=0) s.splice(k,1); else s.push(i); setPrep(g.id,s); openGuided(g); }; });
}
function startGuidedLive(g){
  state.voiceOn=true; state._lastNext=null; state._lastFix=null; state.curSpeed=null; updateVoiceLabel();
  try{ if(!audioCtx){ var _AC=window.AudioContext||window.webkitAudioContext; if(_AC) audioCtx=new _AC(); } if(audioCtx&&audioCtx.state==='suspended') audioCtx.resume(); }catch(e){}
  var v=el('v-live');
  v.innerHTML=
    '<button class="back" data-back="guided-detail">'+ICO.left+' '+esc(g.name)+'</button>'+
    '<div class="liveturn" id="liveturn"><div class="ic" id="liveic">'+ICO.up+'</div>'+
      '<div><div class="d" id="lived">--</div><div class="s" id="lives">Getting your position…</div></div></div>'+
    '<div class="speedpill" id="speedpill"><b>--</b><span>KM/H</span></div>'+
    '<div class="gstat"><div class="box"><b id="gnext">--</b><span>waypoint</span></div>'+
      '<div class="box"><b id="gto">--</b><span>to next</span></div>'+
      '<div class="box"><b id="gleft">--</b><span>left</span></div></div>'+
    '<button class="voicebar" id="liveVoice">'+ICO.voice+'<span id="liveVoiceLabel">Voice on — Samantha</span></button>'+
    '<button class="btn ghost" id="arBtn" style="margin-bottom:10px">'+ICO.pin+' AR walk (camera)</button>'+
    '<button class="btn ghost" id="reportBtn" style="margin-bottom:10px">'+ICO.warn+' Report</button>'+
    '<div class="reprow" id="reprow">'+
      ['Hazard','Closure','Animal','Police'].map(function(k){ return '<button class="repchip" data-rep="'+k+'">'+k+'</button>'; }).join('')+
    '</div>'+
    '<button class="btn sos" id="sosLive">'+ICO.phone+' Emergency '+esc(state.curEmergency)+'</button>'+
    '<div style="height:10px"></div>'+
    '<button class="btn ghost" id="stopGuide">Stop guiding</button>';
  showView('live', (g.type==='drive'?'drive':'hike'));
  bindBacks(v);
  bindVoice(el('liveVoice'));
  updateVoiceLabel();
  el('sosLive').onclick=function(){ doSOS(); };
  el('stopGuide').onclick=function(){ stopWatch(); openGuided(g); };
  if(el('arBtn')) el('arBtn').onclick=function(){ openAR({ route:g }); };
  el('reportBtn').onclick=function(){ var r=el('reprow'); r.classList.toggle('open'); };
  $$('[data-rep]',v).forEach(function(c){ c.onclick=function(){ addReport(c.getAttribute('data-rep')); el('reprow').classList.remove('open'); }; });
  var spoken={};
  if(!('geolocation' in navigator)){ el('lives').textContent='Location is not available on this device.'; return; }
  stopWatch();
  state.watchId=navigator.geolocation.watchPosition(function(pos){
    state.pos={ lat:pos.coords.latitude, lng:pos.coords.longitude, acc:pos.coords.accuracy };
    state.curSpeed=speedKmh(pos);
    updateGuided(g, spoken);
  }, function(){ var s=el('lives'); if(s) s.textContent='Turn on location to guide you.'; }, { enableHighAccuracy:true, maximumAge:4000, timeout:15000 });
  speak('Starting '+g.name+'. '+g.comfort, true);
}
function updateGuided(g, spoken){
  var wps=g.waypoints, p=state.pos, nearIdx=0, nearD=Infinity, i, d;
  for(i=0;i<wps.length;i++){ d=haversine(p.lat,p.lng,wps[i].lat,wps[i].lng); if(d<nearD){ nearD=d; nearIdx=i; } }
  var nextIdx = nearIdx<wps.length-1 ? nearIdx+1 : nearIdx;
  var next=wps[nextIdx];
  var dToNext=haversine(p.lat,p.lng,next.lat,next.lng);
  var left=wps.length-1-nearIdx; if(left<0) left=0;
  var lt=el('liveturn'); if(lt) lt.className='liveturn'+(next.hazard?(' '+next.hazard.level):'');
  var a=el('lived'); if(a) a.textContent=fmtDist(dToNext);
  var s=el('lives'); if(s) s.textContent=(nextIdx===nearIdx?('At '+next.name):('Next: '+next.name))+(next.hazard?(' — '+next.hazard.text):'');
  var gn=el('gnext'); if(gn) gn.textContent=next.n;
  var gt=el('gto'); if(gt) gt.textContent=fmtDist(dToNext);
  var gl=el('gleft'); if(gl) gl.textContent=left;
  var sp=el('speedpill'); if(sp){ var sb=sp.querySelector('b'); if(sb) sb.textContent = (state.curSpeed==null?'--':Math.round(state.curSpeed)); }
  if(state._lastNext!==next.n && state._lastNext!=null){ chime('next'); }
  if(next.hazard && dToNext<80 && !spoken['h'+next.n]){ spoken['h'+next.n]=1; speak('Caution ahead. '+next.name+'. '+next.hazard.text, true); }
  else if(state._lastNext!==next.n){ speak((nextIdx===nearIdx?'At ':'Heading to ')+next.name+', '+fmtDist(dToNext)+'.'); }
  state._lastNext=next.n;
  if(nearIdx===wps.length-1 && nearD<30 && !spoken.done){ spoken.done=1; chime('arrive'); speak('You have reached '+wps[wps.length-1].name+'.', true); }
  checkSpeedLimit();
}

/* ---------------- Alerts ---------------- */
function alertIcon(level){
  if(level==='green') return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>';
  if(level==='red') return ICO.warn;
  return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>';
}
function ago(t){ var s=Math.round((Date.now()-t)/1000); if(s<60) return 'just now'; var m=Math.round(s/60); if(m<60) return m+' min ago'; var h=Math.round(m/60); return h+' h ago'; }
function renderAlerts(){
  var host=el('alertList');
  var html='<p class="muted small" style="margin:0 0 12px">Updated just now — tap the orange refresh circle any time to check again.</p>';
  html+=LM.notes.map(function(n){
    var cls={ amber:'a-amber', red:'a-red', green:'a-green', blue:'a-blue' }[n.level]||'a-blue';
    return '<div class="alert '+cls+'"><div class="ai">'+alertIcon(n.level)+'</div><div><h4>'+esc(n.title)+'</h4><p>'+esc(n.body)+'</p></div></div>';
  }).join('');
  var rs=reports();
  if(rs.length){
    html+='<div class="updated" style="margin-top:16px"><h4 style="margin:0">Your reports</h4><button id="clrRep" style="background:none;border:none;color:var(--muted);font:inherit;font-weight:700;cursor:pointer">Clear</button></div>';
    html+=rs.map(function(r){
      var loc = (r.lat!=null) ? (r.lat.toFixed(4)+', '+r.lng.toFixed(4)) : 'location was off';
      return '<div class="alert a-amber"><div class="ai">'+alertIcon('amber')+'</div><div><h4>'+esc(r.kind)+'</h4><p>'+ago(r.t)+' · '+loc+'</p></div></div>';
    }).join('');
  }
  host.innerHTML=html;
  if(el('clrRep')) el('clrRep').onclick=function(){ clearReports(); renderAlerts(); };
}

/* ---------------- How to Use (with search) ---------------- */
function renderHelp(){
  var host=el('htBody');
  host.innerHTML=LM.help.map(function(h){
    return '<div class="htblock card flat" data-q="'+esc((h.q+' '+h.a).toLowerCase())+'"><b>'+esc(h.q)+'?</b>'+
      '<div class="muted small" style="margin-top:4px">'+esc(h.a)+'</div></div>';
  }).join('');
  var box=el('htq'), none=el('htNone');
  function run(){
    var q=(box.value||'').trim().toLowerCase(), shown=0;
    $$('.htblock',host).forEach(function(b){ var m=!q||b.getAttribute('data-q').indexOf(q)>=0; b.style.display=m?'':'none'; if(m) shown++; });
    none.style.display=(q&&!shown)?'':'none';
  }
  box.oninput=run;
}

/* ---------------- hard refresh (the circle-arrow button) ---------------- */
function rerenderCurrent(){
  if(state.view==='places') renderPlaces();
  else if(state.view==='alerts') renderAlerts();
  else if(state.view==='detail'){
    if(state.detailKind==='guide' && state.curGuide) openGuided(state.curGuide);
    else if(state.detailKind==='place' && state.curPlace) openPlace(state.curPlace);
  }
}
function hardRefresh(){
  var b=el('hrefresh'); if(b){ b.classList.remove('spin'); void b.offsetWidth; b.classList.add('spin'); }
  toast('Getting the newest version…');
  clearAndReload();
}
function clearAndReload(){
  var steps=[];
  try{
    if('serviceWorker' in navigator && navigator.serviceWorker.getRegistrations){
      steps.push(navigator.serviceWorker.getRegistrations().then(function(regs){
        return Promise.all(regs.map(function(r){ return r.update(); }));
      }));
    }
    if('caches' in window){
      steps.push(caches.keys().then(function(keys){
        // clear only Load Maps caches so the other Load/ACR apps keep their offline data
        return Promise.all(keys.filter(function(k){ return k.indexOf('loadmaps-')===0; }).map(function(k){ return caches.delete(k); }));
      }));
    }
  }catch(e){}
  Promise.all(steps).catch(function(){}).then(function(){
    location.replace(location.pathname + '?_=' + Date.now());
  });
}

/* ---------------- chimes (arrival / waypoint) ---------------- */
var audioCtx=null;
function chime(kind){
  try{
    if(!audioCtx){ var AC=window.AudioContext||window.webkitAudioContext; if(!AC) return; audioCtx=new AC(); }
    if(audioCtx.state==='suspended'){ audioCtx.resume(); }
    function beep(freq, at, dur){
      var o=audioCtx.createOscillator(), g=audioCtx.createGain();
      o.type='sine'; o.frequency.value=freq; o.connect(g); g.connect(audioCtx.destination);
      var t=audioCtx.currentTime+at;
      g.gain.setValueAtTime(0.0001,t);
      g.gain.exponentialRampToValueAtTime(0.18,t+0.02);
      g.gain.exponentialRampToValueAtTime(0.0001,t+dur);
      o.start(t); o.stop(t+dur+0.02);
    }
    if(kind==='arrive'){ beep(660,0,0.18); beep(880,0.16,0.28); }
    else { beep(620,0,0.16); }
  }catch(e){}
}

/* ---------------- your reports (offline hazard log) ---------------- */
function reports(){ try{ return JSON.parse(localStorage.getItem('lm_reports')||'[]'); }catch(e){ return []; } }
function addReport(kind){
  var r=reports();
  r.unshift({ kind:kind, lat:state.pos?state.pos.lat:null, lng:state.pos?state.pos.lng:null, t:Date.now() });
  if(r.length>30) r=r.slice(0,30);
  try{ localStorage.setItem('lm_reports', JSON.stringify(r)); }catch(e){}
  toast(kind+' reported'+(state.pos?' here':''));
  shareHazard(kind, state.pos);
  // If we're actively navigating a Valhalla route, re-route around this hazard.
  if(state.pos && LMap.map && LMap.driveLayer && LMap.from && LMap.dest && (kind==='Hazard'||kind==='Closure'||kind==='Animal')){
    rerouteAvoiding(state.pos.lat, state.pos.lng);
  }
}
function clearReports(){ try{ localStorage.removeItem('lm_reports'); }catch(e){} }

/* ---------------- weather (Stage 3, Open-Meteo, free/no key) ---------------- */
var WMO = { 0:'Clear',1:'Mainly clear',2:'Partly cloudy',3:'Overcast',45:'Fog',48:'Fog',
  51:'Light drizzle',53:'Drizzle',55:'Heavy drizzle',56:'Freezing drizzle',57:'Freezing drizzle',
  61:'Light rain',63:'Rain',65:'Heavy rain',66:'Freezing rain',67:'Freezing rain',
  71:'Light snow',73:'Snow',75:'Heavy snow',77:'Snow grains',
  80:'Light showers',81:'Showers',82:'Heavy showers',85:'Snow showers',86:'Snow showers',
  95:'Thunderstorm',96:'Thunderstorm',99:'Thunderstorm' };
function wxRainy(code){ return (code>=51&&code<=67)||(code>=80&&code<=82)||(code>=95); }
function wxIcon(code){
  var s='stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"';
  if(code<=1) return '<svg viewBox="0 0 24 24" '+s+'><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4"/></svg>';
  if(code<=48) return '<svg viewBox="0 0 24 24" '+s+'><path d="M18 10a4 4 0 010 8H7A5 5 0 117 8a6 6 0 0111 2z"/></svg>';
  if((code>=71&&code<=77)||(code>=85&&code<=86)) return '<svg viewBox="0 0 24 24" '+s+'><path d="M18 8a4 4 0 010 8H7A5 5 0 117 6a6 6 0 0111 2z"/><path d="M8 20v.4M12 20v.4M16 20v.4"/></svg>';
  if(code>=95) return '<svg viewBox="0 0 24 24" '+s+'><path d="M18 8a4 4 0 010 8H7A5 5 0 117 6a6 6 0 0111 2z"/><path d="M13 14l-3 4h4l-3 4"/></svg>';
  return '<svg viewBox="0 0 24 24" '+s+'><path d="M18 8a4 4 0 010 8H7A5 5 0 117 6a6 6 0 0111 2z"/><path d="M8 19l-1 2M12 19l-1 2M16 19l-1 2"/></svg>';
}
function parseWeather(j){
  if(!j || !j.current) return null;
  var c=j.current, d=j.daily||{};
  return {
    tempC: Math.round(c.temperature_2m),
    code: c.weather_code,
    desc: WMO[c.weather_code]||'—',
    rainy: wxRainy(c.weather_code),
    hiC: (d.temperature_2m_max&&d.temperature_2m_max.length)?Math.round(d.temperature_2m_max[0]):null,
    loC: (d.temperature_2m_min&&d.temperature_2m_min.length)?Math.round(d.temperature_2m_min[0]):null,
    rainPct: (d.precipitation_probability_max&&d.precipitation_probability_max.length)?d.precipitation_probability_max[0]:null
  };
}
function weatherCardHTML(w, note){
  if(!w) return '';
  var hilo=(w.hiC!=null&&w.loC!=null)?(' · H '+w.hiC+'° L '+w.loC+'°'):'';
  var rain=(w.rainPct!=null&&w.rainPct>0)?(' · '+w.rainPct+'% rain'):'';
  var warn=w.rainy?'<div class="wx-warn">'+ICO.warn+'Rain around — rocks and roads get slippery.</div>':'';
  return '<div class="wx-row"><div class="wx-ic">'+wxIcon(w.code)+'</div>'+
    '<div><b>'+esc(w.desc)+' · '+w.tempC+'°C</b><span class="wx-sub">'+esc(hilo+rain)+(note?(' · '+note):'')+'</span></div></div>'+warn;
}
function loadWeather(lat, lng, elId){
  var host=el(elId); if(!host) return;
  var key='lm_wx_'+lat.toFixed(2)+'_'+lng.toFixed(2), cached=null;
  try{ cached=JSON.parse(localStorage.getItem(key)||'null'); }catch(e){}
  if(!navigator.onLine){
    host.innerHTML = cached ? weatherCardHTML(cached.w,'last update') : '<span class="muted small">Weather updates when you are online.</span>';
    return;
  }
  host.innerHTML='<span class="muted small">Loading weather…</span>';
  var url='https://api.open-meteo.com/v1/forecast?latitude='+lat+'&longitude='+lng+
    '&current=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto&forecast_days=1';
  fetch(url).then(function(r){ return r.json(); }).then(function(j){
    var w=parseWeather(j);
    if(!w){ if(host) host.innerHTML='<span class="muted small">Weather unavailable.</span>'; return; }
    if(host) host.innerHTML=weatherCardHTML(w,'now');
    try{ localStorage.setItem(key, JSON.stringify({ w:w, t:Date.now() })); }catch(e){}
  }).catch(function(){
    if(host) host.innerHTML = cached ? weatherCardHTML(cached.w,'last update') : '<span class="muted small">Could not load weather.</span>';
  });
}

/* ---------------- Near me: POI categories (Stage 4, OpenStreetMap) ---------------- */
var CATS=[
  { key:'waterfall', label:'Waterfalls',     q:['["natural"="waterfall"]'] },
  { key:'beach',     label:'Beaches',        q:['["natural"="beach"]'] },
  { key:'ev',        label:'EV charging',    q:['["amenity"="charging_station"]'] },
  { key:'camp',      label:'Camping',        q:['["tourism"="camp_site"]'] },
  { key:'fuel',      label:'Fuel',           q:['["amenity"="fuel"]'] },
  { key:'view',      label:'Viewpoints',     q:['["tourism"="viewpoint"]'] },
  { key:'toilets',   label:'Restrooms',      q:['["amenity"="toilets"]'] },
  { key:'water',     label:'Drinking water', q:['["amenity"="drinking_water"]'] },
  { key:'dog',       label:'Dog parks',      q:['["leisure"="dog_park"]'] },
  { key:'park',      label:'Nature & parks', q:['["leisure"="nature_reserve"]','["boundary"="national_park"]'] }
];
function renderNearby(){
  var v=el('v-nearby');
  v.innerHTML='<button class="back" data-back="home">'+ICO.left+' Home</button>'+
    '<h2 class="sec">Near me</h2>'+
    '<p class="muted small" style="margin:0 0 12px">Find places around you from OpenStreetMap. Needs a connection and your location.</p>'+
    '<div class="cat-grid">'+CATS.map(function(c){ return '<button class="cat" data-cat="'+c.key+'">'+ICO.pin+'<span>'+esc(c.label)+'</span></button>'; }).join('')+'</div>'+
    '<div id="poiResults"></div>';
  bindBacks(v);
  $$('[data-cat]',v).forEach(function(b){ b.onclick=function(){
    $$('.cat',v).forEach(function(x){ x.classList.remove('on'); }); b.classList.add('on');
    var k=b.getAttribute('data-cat'), c=null;
    for(var i=0;i<CATS.length;i++){ if(CATS[i].key===k) c=CATS[i]; }
    if(c) runPoi(c);
  }; });
}
function parsePoi(json){
  if(!json || !json.elements) return [];
  var out=[];
  json.elements.forEach(function(e){
    var lat=(e.lat!=null)?e.lat:(e.center&&e.center.lat), lng=(e.lon!=null)?e.lon:(e.center&&e.center.lon);
    if(lat==null || lng==null) return;
    out.push({ name:(e.tags&&(e.tags.name||e.tags['name:en']))||null, lat:lat, lng:lng });
  });
  return out;
}
var _poi=[];
function renderPoiList(cat, list){
  var host=el('poiResults');
  if(!list.length){ host.innerHTML='<div class="info flat"><p class="muted">Nothing found nearby for '+esc(cat.label)+'. Try another category.</p></div>'; return; }
  _poi=list.map(function(it,i){ return { id:'poi-'+i, name:it.name||cat.label, area:cat.label+' · nearby', cc:'', lat:it.lat, lng:it.lng }; });
  host.innerHTML='<p class="muted small" style="margin:6px 2px 10px">'+_poi.length+' found — nearest first</p>'+
    _poi.map(function(p){
      var d=state.pos?fmtDist(haversine(state.pos.lat,state.pos.lng,p.lat,p.lng)):'';
      return '<button class="card place" data-poi="'+p.id+'"><div class="top"><div class="thumb place">'+ICO.pin+'</div>'+
        '<div><h3>'+esc(p.name)+'</h3><div class="area">'+esc(p.area)+'</div></div>'+(d?'<div class="dist"><b>'+d+'</b></div>':'')+'</div></button>';
    }).join('');
  $$('[data-poi]',host).forEach(function(b){ b.onclick=function(){ var id=b.getAttribute('data-poi');
    for(var i=0;i<_poi.length;i++){ if(_poi[i].id===id){ openPlace(_poi[i]); break; } } }; });
}
function runPoi(cat){
  var host=el('poiResults');
  if(!navigator.onLine){ host.innerHTML='<div class="info flat"><p class="muted">Nearby search needs a connection.</p></div>'; return; }
  host.innerHTML='<p class="muted small">Finding your location…</p>';
  ensurePos(function(){
    if(!state.pos){ host.innerHTML='<div class="info flat"><p class="muted">Turn on location to search near you.</p></div>'; return; }
    var lat=state.pos.lat, lng=state.pos.lng, r=25000;
    host.innerHTML='<p class="muted small">Searching '+esc(cat.label)+' nearby…</p>';
    var body='[out:json][timeout:20];(';
    cat.q.forEach(function(f){ body+='node'+f+'(around:'+r+','+lat+','+lng+');way'+f+'(around:'+r+','+lat+','+lng+');'; });
    body+=');out center 60;';
    fetch('https://overpass-api.de/api/interpreter', { method:'POST', body:body })
      .then(function(x){ return x.json(); })
      .then(function(j){
        var list=parsePoi(j);
        list.forEach(function(it){ it.d=haversine(lat,lng,it.lat,it.lng); });
        list.sort(function(a,b){ return a.d-b.d; });
        renderPoiList(cat, list.slice(0,40));
      })
      .catch(function(){ host.innerHTML='<div class="info flat"><p class="muted">Could not search right now. Try again in a moment.</p></div>'; });
  });
}

/* ---------------- Fire watch (Stage 3, via Cloudflare function) ---------------- */
function loadFire(lat, lng, elId){
  var host=el(elId); if(!host) return;
  host.innerHTML='';
  if(!navigator.onLine) return;
  fetch('/api/loadmaps/fire?lat='+lat+'&lng='+lng).then(function(r){ return r.json(); }).then(function(j){
    if(!host) return;
    if(!j || j.configured===false || j.error){ host.innerHTML=''; return; } // not set up -> silent
    if(j.count>0){ host.innerHTML='<div class="fire-warn">'+ICO.warn+'Fire watch: '+j.count+' heat hotspot'+(j.count===1?'':'s')+' detected within ~75 km (last 24h). Check local advice.</div>'; }
    else { host.innerHTML='<div class="fire-ok">'+ICO.check+'Fire watch: none detected nearby.</div>'; }
  }).catch(function(){ if(host) host.innerHTML=''; });
}

/* ---------------- Shared hazard layer (Cloudflare D1; dark until DB bound) ---------------- */
function shareHazard(kind, pos){
  if(!navigator.onLine || !pos) return;
  fetch('/api/loadmaps/hazards', { method:'POST', headers:{ 'content-type':'application/json' },
    body:JSON.stringify({ kind:kind, lat:pos.lat, lng:pos.lng }) }).catch(function(){});
}
function loadHazards(lat, lng){
  if(!LMap.map || !navigator.onLine) return;
  fetch('/api/loadmaps/hazards?lat='+lat+'&lng='+lng).then(function(r){ return r.json(); }).then(function(j){
    if(!j || j.configured===false || !j.hazards) return; // not set up -> silent, local-only
    if(LMap.hazardLayer){ LMap.map.removeLayer(LMap.hazardLayer); }
    LMap.hazardLayer=L.layerGroup();
    j.hazards.forEach(function(h){
      if(h.lat==null||h.lng==null) return;
      L.circleMarker([h.lat,h.lng], { radius:7, color:'#1a0d04', weight:2, fillColor:'#ffb023', fillOpacity:.95 })
        .bindPopup('<b>'+esc(h.kind||'Hazard')+'</b>'+(h.ago?('<br>'+esc(h.ago)):'')).addTo(LMap.hazardLayer);
    });
    LMap.hazardLayer.addTo(LMap.map);
  }).catch(function(){});
}

/* ---------------- AI assistant (Stage 5, via Cloudflare function) ---------------- */
function renderAssistant(){
  var v=el('v-assistant');
  v.innerHTML='<button class="back" data-back="home">'+ICO.left+' Home</button>'+
    '<h2 class="sec">Ask Load Maps</h2>'+
    '<p class="muted small" style="margin:0 0 12px">Ask about a place, a route, or plan a trip. Needs a connection.</p>'+
    '<div class="ask-row"><input id="askIn" type="text" autocomplete="off" placeholder="e.g. take me somewhere I can get fuel near the motorway"><button class="btn green" id="askBtn">Ask</button></div>'+
    '<div class="ask-row2"><button class="btn ghost" id="findBtn">'+ICO.pin+' Find it on the map</button></div>'+
    '<div id="askOut" class="ask-out"></div>'+
    '<div class="ask-eg"><b>Ask:</b> "history of Coimbra" · "avoid narrow mountain roads to Gerês"<br><b>Find:</b> "fuel on my route" · "nearest EV charging near Porto" · "take me to Sete Lagoas"</div>';
  bindBacks(v);
  el('askBtn').onclick=doAsk;
  el('findBtn').onclick=smartFind;
  el('askIn').addEventListener('keydown', function(e){ if(e.key==='Enter') doAsk(); });
}
// Feature: natural-language "find" — one Haiku parse call, then plain logic acts on it.
function smartFind(){
  var q=((el('askIn')&&el('askIn').value)||'').trim(); if(!q) return;
  var out=el('askOut');
  if(!navigator.onLine){ if(out) out.innerHTML='<div class="info flat"><p class="muted">Smart find needs a connection.</p></div>'; return; }
  if(out) out.innerHTML='<p class="muted small">Working it out…</p>';
  fetch('/api/loadmaps/ai', { method:'POST', headers:{ 'content-type':'application/json' }, body:JSON.stringify({ q:q, mode:'parse' }) })
    .then(function(r){ return r.json(); }).then(function(j){
      if(!j || j.configured===false){ if(out) out.innerHTML='<div class="info flat"><p class="muted">Smart find needs an AI key in Cloudflare. Plain search still works.</p></div>'; return; }
      var it=j.intent;
      if(!it || it.action==='unknown' || j.error){ if(out) out.innerHTML='<div class="info flat"><p class="muted">Not sure what to find. Try a place name, or "fuel on my route".</p></div>'; return; }
      if(it.action==='category' && it.category){
        var cat=null; for(var i=0;i<ROUTE_CATS.length;i++){ if(ROUTE_CATS[i].key===it.category) cat=ROUTE_CATS[i]; }
        if(!cat){ if(out) out.innerHTML='<div class="info flat"><p class="muted">Could not match that category.</p></div>'; return; }
        if(routeCoords()){ if(out) out.innerHTML='<div class="ask-answer">Finding '+esc(cat.label.toLowerCase())+' on your open route…</div>'; nearestOnRoute(cat); return; }
        geocodeOne(it.near||q, function(ctr){
          if(!ctr && state.pos) ctr={ name:'you', lat:state.pos.lat, lng:state.pos.lng };
          if(!ctr){ if(out) out.innerHTML='<div class="info flat"><p class="muted">Tell me where — e.g. "fuel near Coimbra".</p></div>'; return; }
          nearbyCategory(cat, ctr, out);
        });
        return;
      }
      geocodeOne(it.query||it.near||q, function(ctr){
        if(!ctr){ if(out) out.innerHTML='<div class="info flat"><p class="muted">Could not find that place.</p></div>'; return; }
        if(out) out.innerHTML='<div class="ask-answer">Opening '+esc(ctr.name)+' on the map.</div>';
        openMap({ place:{ name:ctr.name, lat:ctr.lat, lng:ctr.lng }, directions:true });
      });
    }).catch(function(){ if(out) out.innerHTML='<div class="info flat"><p class="muted">Could not run smart find.</p></div>'; });
}
function geocodeOne(q, cb){
  if(!q){ cb(null); return; }
  fetch('https://photon.komoot.io/api/?limit=1&q='+encodeURIComponent(q)).then(function(r){ return r.json(); }).then(function(j){
    var f=(j&&j.features&&j.features[0]); if(!f){ cb(null); return; }
    var c=(f.geometry&&f.geometry.coordinates)||[], pr=f.properties||{};
    if(c[1]==null||c[0]==null){ cb(null); return; }
    cb({ name:pr.name||pr.city||q, lat:c[1], lng:c[0] });
  }).catch(function(){ cb(null); });
}
function nearbyCategory(cat, ctr, out){
  var box='(around:20000,'+ctr.lat+','+ctr.lng+')';
  var body='[out:json][timeout:20];(node'+cat.q+box+';way'+cat.q+box+';);out center 60;';
  fetch('https://overpass-api.de/api/interpreter', { method:'POST', body:body }).then(function(r){ return r.json(); }).then(function(j){
    var pts=parsePoi(j);
    if(!pts.length){ if(out) out.innerHTML='<div class="info flat"><p class="muted">No '+esc(cat.label.toLowerCase())+' found near '+esc(ctr.name)+'.</p></div>'; return; }
    pts.forEach(function(p){ p.d=haversine(ctr.lat,ctr.lng,p.lat,p.lng); }); pts.sort(function(a,b){ return a.d-b.d; });
    var best=pts[0];
    if(out) out.innerHTML='<div class="ask-answer">Nearest '+esc(cat.label.toLowerCase())+' to '+esc(ctr.name)+': '+esc(best.name||cat.label)+', '+fmtDist(best.d)+' away. Opening the map.</div>';
    openMap({ place:{ name:best.name||cat.label, lat:best.lat, lng:best.lng }, directions:true });
  }).catch(function(){ if(out) out.innerHTML='<div class="info flat"><p class="muted">Could not search right now.</p></div>'; });
}
/* ---------------- Fuel prices (government open data via Cloudflare function) ---------------- */
var _fuel=[];
function fuelPriceStr(p){ return p!=null ? ('€'+p.toFixed(3)) : '—'; }
function renderFuel(){
  var v=el('v-fuel');
  v.innerHTML='<button class="back" data-back="home">'+ICO.left+' Home</button>'+
    '<h2 class="sec">Fuel prices</h2>'+
    '<p class="muted small" style="margin:0 0 12px">Live petrol and diesel prices near you, from government open data. Needs a connection and your location. Covers Spain now; Portugal where the feed is available.</p>'+
    '<div id="fuelBody"><p class="muted small">Finding your location…</p></div>';
  bindBacks(v);
  if(!navigator.onLine){ el('fuelBody').innerHTML='<div class="info flat"><p class="muted">Fuel prices need a connection.</p></div>'; return; }
  ensurePos(function(){
    var host=el('fuelBody'); if(!host) return;
    if(!state.pos){ host.innerHTML='<div class="info flat"><p class="muted">Turn on location to see prices near you.</p></div>'; return; }
    host.innerHTML='<p class="muted small">Getting live prices…</p>';
    fetch('/api/loadmaps/fuel?lat='+state.pos.lat+'&lng='+state.pos.lng).then(function(r){ return r.json(); }).then(function(j){
      var list=(j && j.stations)||[];
      if(!list.length){ fuelFallback(host); return; }
      _fuel=list;
      var cd=null, cp=null;
      list.forEach(function(s){ if(s.diesel!=null && (cd==null||s.diesel<cd.diesel)) cd=s; if(s.petrol!=null && (cp==null||s.petrol<cp.petrol)) cp=s; });
      var banner='';
      if(cd) banner+='<div class="fuel-best"><b>Cheapest diesel</b> €'+cd.diesel.toFixed(3)+' · '+esc(cd.name)+' · '+fmtDist(cd.dist*1000)+'</div>';
      if(cp) banner+='<div class="fuel-best petrol"><b>Cheapest petrol 95</b> €'+cp.petrol.toFixed(3)+' · '+esc(cp.name)+' · '+fmtDist(cp.dist*1000)+'</div>';
      host.innerHTML=banner+'<p class="muted small" style="margin:10px 2px 8px">'+list.length+' station'+(list.length===1?'':'s')+' within 25 km'+(j.updated?(' · '+esc(String(j.updated))):'')+'</p>'+
        list.map(function(s,i){
          return '<button class="card place" data-fuel="'+i+'"><div class="top"><div class="thumb place">'+ICO.fuel+'</div>'+
            '<div><h3>'+esc(s.name||'Station')+'</h3><div class="area">'+esc(s.address||'')+(s.address?' · ':'')+fmtDist(s.dist*1000)+'</div></div></div>'+
            '<div class="fuel-prices"><span>Diesel <b>'+fuelPriceStr(s.diesel)+'</b></span><span>Petrol 95 <b>'+fuelPriceStr(s.petrol)+'</b></span></div></button>';
        }).join('');
      $$('[data-fuel]',host).forEach(function(b){ b.onclick=function(){ var s=_fuel[parseInt(b.getAttribute('data-fuel'),10)]; if(s) openMap({ place:{ name:s.name, lat:s.lat, lng:s.lng }, directions:true }); }; });
    }).catch(function(){ fuelFallback(host); });
  });
}
function fuelFallback(host){
  if(!host) return;
  host.innerHTML='<div class="info flat"><p class="muted">No live prices for your area yet. Live prices cover Spain (and Portugal where the feed is available). You can still find stations near you below.</p></div>'+
    '<button class="btn ghost" id="fuelStations" style="margin-top:10px">Show fuel stations near me</button>';
  if(el('fuelStations')) el('fuelStations').onclick=function(){
    navTo('nearby');
    setTimeout(function(){
      var btn=document.querySelector('[data-cat="fuel"]');
      if(btn) btn.classList.add('on');
      var c=null; for(var i=0;i<CATS.length;i++){ if(CATS[i].key==='fuel') c=CATS[i]; }
      if(c) runPoi(c);
    }, 60);
  };
}
function doAsk(){
  var q=((el('askIn')&&el('askIn').value)||'').trim(); if(!q) return;
  var out=el('askOut'); if(!out) return;
  if(!navigator.onLine){ out.innerHTML='<div class="info flat"><p class="muted">The assistant needs a connection.</p></div>'; return; }
  out.innerHTML='<p class="muted small">Thinking…</p>';
  fetch('/api/loadmaps/ai', { method:'POST', headers:{ 'content-type':'application/json' }, body:JSON.stringify({ q:q }) })
    .then(function(r){ return r.json(); }).then(function(j){
      if(!j || j.configured===false){ out.innerHTML='<div class="info flat"><p class="muted">The assistant is not set up yet. Add an AI key in Cloudflare to switch it on.</p></div>'; return; }
      if(j.error || !j.answer){ out.innerHTML='<div class="info flat"><p class="muted">Could not answer right now. Try again.</p></div>'; return; }
      out.innerHTML='<div class="ask-answer">'+esc(j.answer).replace(/\n/g,'<br>')+'</div>';
    }).catch(function(){ out.innerHTML='<div class="info flat"><p class="muted">Could not reach the assistant.</p></div>'; });
}

/* ---------------- Offline map packs (PMTiles + OPFS, no cloud storage) ----------------
   Import a .pmtiles map file (made once) — it is stored on THIS device via the
   Origin Private File System (free, no Cloudflare storage). The live map can then
   use it as the base with no signal. Raster .pmtiles render directly; vector packs
   need a matching style, so raster packs are the supported offline base. */
var LOffline = { mem:{} };
function opfsOk(){ return !!(navigator.storage && navigator.storage.getDirectory && window.FileSystemWritableFileStream); }
function opfsDir(){ if(!(navigator.storage && navigator.storage.getDirectory)) return Promise.resolve(null); return navigator.storage.getDirectory().catch(function(){ return null; }); }
function fmtBytes(n){ if(n==null) return '—'; if(n<1024) return n+' B'; if(n<1048576) return (n/1024).toFixed(0)+' KB'; if(n<1073741824) return (n/1048576).toFixed(1)+' MB'; return (n/1073741824).toFixed(2)+' GB'; }
function listPacks(){
  return opfsDir().then(function(dir){
    var out=[]; Object.keys(LOffline.mem).forEach(function(k){ out.push({ name:k, size:LOffline.mem[k].size, mem:true }); });
    if(!dir || !dir.values) return out;
    var it=dir.values(), acc=[];
    function step(){
      return it.next().then(function(res){
        if(res.done) return acc;
        var h=res.value;
        if(h.kind==='file' && /\.pmtiles$/i.test(h.name)){
          return h.getFile().then(function(f){ acc.push({ name:h.name, size:f.size }); return step(); });
        }
        return step();
      });
    }
    return step().then(function(fromOpfs){ return out.concat(fromOpfs); });
  });
}
function savePack(file){
  return opfsDir().then(function(dir){
    if(!dir){ LOffline.mem[file.name]=file; return { name:file.name, size:file.size, mem:true }; }
    return dir.getFileHandle(file.name, { create:true }).then(function(fh){
      return fh.createWritable().then(function(w){ return w.write(file).then(function(){ return w.close(); }); });
    }).then(function(){ return { name:file.name, size:file.size }; });
  });
}
function deletePack(name){
  if(LOffline.mem[name]){ delete LOffline.mem[name]; return Promise.resolve(); }
  return opfsDir().then(function(dir){ if(!dir) return; return dir.removeEntry(name).catch(function(){}); });
}
function packFile(name){
  if(LOffline.mem[name]) return Promise.resolve(LOffline.mem[name]);
  return opfsDir().then(function(dir){ if(!dir) return null; return dir.getFileHandle(name).then(function(fh){ return fh.getFile(); }).catch(function(){ return null; }); });
}
function renderOffline(){
  var v=el('v-offline');
  var support = opfsOk() ? '' : '<div class="info flat"><p class="muted">This device keeps imported maps for this session only (it does not support permanent on-device storage). They clear when you fully close the app.</p></div>';
  v.innerHTML='<button class="back" data-back="home">'+ICO.left+' Home</button>'+
    '<h2 class="sec">Offline maps</h2>'+
    '<p class="muted small" style="margin:0 0 12px">Load a map file (.pmtiles) onto your device once. After that the live map works with no signal. Nothing is uploaded — it stays on your device. No cloud storage, no fees.</p>'+
    support+
    '<button class="btn green" id="offImport">'+ICO.download+' Import a map file</button>'+
    '<div id="offStore" class="muted small" style="margin:10px 2px"></div>'+
    '<div id="offList" style="margin-top:6px"></div>'+
    '<div class="ask-eg" style="margin-top:14px"><b>How to make one:</b> a .pmtiles is a single-file map of a region you build once (raster tiles). Keep it on your device and Load Maps reads it offline. A road/satellite raster pack works best as the offline base.</div>';
  bindBacks(v);
  el('offImport').onclick=function(){ var fi=el('packFile'); if(fi){ fi.value=''; fi.click(); } };
  if(navigator.storage && navigator.storage.estimate){
    navigator.storage.estimate().then(function(est){
      var s=el('offStore'); if(!s) return;
      var used=fmtBytes(est.usage||0), quota=fmtBytes(est.quota||0);
      s.textContent='On-device storage used: '+used+' of about '+quota+' available.';
    }).catch(function(){});
  }
  refreshPackList();
}
function refreshPackList(){
  var host=el('offList'); if(!host) return;
  host.innerHTML='<p class="muted small">Checking your device…</p>';
  listPacks().then(function(packs){
    if(!packs.length){ host.innerHTML='<div class="info flat"><p class="muted">No offline maps yet. Import a .pmtiles file to get started.</p></div>'; return; }
    host.innerHTML=packs.map(function(p){
      return '<div class="card flat" style="display:flex;align-items:center;gap:10px;justify-content:space-between">'+
        '<div><b>'+esc(p.name)+'</b><div class="muted small">'+fmtBytes(p.size)+(p.mem?' · session only':' · on device')+'</div></div>'+
        '<div style="display:flex;gap:8px">'+
          '<button class="btn green" data-usepack="'+esc(p.name)+'">Use on map</button>'+
          '<button class="btn ghost" data-delpack="'+esc(p.name)+'">Delete</button>'+
        '</div></div>';
    }).join('');
    $$('[data-usepack]',host).forEach(function(b){ b.onclick=function(){ openMapOffline(b.getAttribute('data-usepack')); }; });
    $$('[data-delpack]',host).forEach(function(b){ b.onclick=function(){
      var n=b.getAttribute('data-delpack');
      deletePack(n).then(function(){ toast('Deleted '+n); refreshPackList(); });
    }; });
  }).catch(function(){ host.innerHTML='<div class="info flat"><p class="muted">Could not read device storage.</p></div>'; });
}
function ensurePmProtocol(){
  if(typeof pmtiles==='undefined' || typeof maplibregl==='undefined') return false;
  if(!LMap.pmProto){ try{ LMap.pmProto=new pmtiles.Protocol(); maplibregl.addProtocol('pmtiles', LMap.pmProto.tile); }catch(e){ return false; } }
  return true;
}
function applyOfflineBase(file){
  if(!ensurePmProtocol() || !L.maplibreGL){ toast('Offline maps need this device\'s map engine'); return false; }
  try{
    var pm=new pmtiles.PMTiles(new pmtiles.FileSource(file));
    LMap.pmProto.add(pm);
    var key=pm.source.getKey();
    var style={ version:8, sources:{ lmoff:{ type:'raster', url:'pmtiles://'+key, tileSize:256, attribution:'Offline map (PMTiles)' } }, layers:[{ id:'lmoff', type:'raster', source:'lmoff' }] };
    if(LMap.offline){ try{ LMap.map.removeLayer(LMap.offline); }catch(e){} LMap.offline=null; }
    try{ if(LMap.base) LMap.map.removeLayer(LMap.base); }catch(e){}
    try{ if(LMap.cur==='sat' && LMap.sat) LMap.map.removeLayer(LMap.sat); }catch(e){}
    LMap.offline=L.maplibreGL({ style:style }); LMap.offline.addTo(LMap.map); LMap.cur='offline';
    pm.getHeader().then(function(h){ try{ var z=Math.max(h.minZoom||3, Math.min(h.maxZoom||14, 10)); LMap.map.setView([h.centerLat, h.centerLon], z); }catch(e){} }).catch(function(){});
    return true;
  }catch(e){ toast('That map file could not be opened'); return false; }
}
function openMapOffline(name){
  packFile(name).then(function(f){
    if(!f){ toast('Could not open that map'); return; }
    openMap({});
    setTimeout(function(){ if(applyOfflineBase(f)) toast('Offline map on — works with no signal'); }, 200);
  });
}

/* ---------------- AR heads-up walk (camera + compass arrow, iPad-friendly) ----------------
   Full-screen back-camera view with a big arrow that points to your next waypoint and
   the live distance. Uses getUserMedia + DeviceOrientation (true compass on iOS) +
   Geolocation. No WebXR (unsupported on iPad Safari) — works on the device you use. */
var AR = { stream:null, watch:null, orient:null, target:null, route:null, heading:null, raf:null };
function openAR(opts){
  var w=el('arwrap'); if(!w) return;
  AR.route=(opts&&opts.route)||null;
  AR.target=(opts&&opts.point)||null;
  AR.heading=null;
  w.classList.add('open');
  var c=el('arCal'); if(c) c.textContent='';
  startAROrientation();
  startARCamera();
  if('geolocation' in navigator){
    AR.watch=navigator.geolocation.watchPosition(function(p){
      state.pos={ lat:p.coords.latitude, lng:p.coords.longitude, acc:p.coords.accuracy };
    }, function(){}, { enableHighAccuracy:true, maximumAge:3000, timeout:15000 });
  }
  if(AR.raf) cancelAnimationFrame(AR.raf);
  arTick();
}
function startARCamera(){
  var v=el('arVideo');
  if(!v || !navigator.mediaDevices || !navigator.mediaDevices.getUserMedia){ var c=el('arCal'); if(c) c.textContent='Camera not available — the arrow still points the way.'; return; }
  navigator.mediaDevices.getUserMedia({ video:{ facingMode:{ ideal:'environment' } }, audio:false })
    .then(function(s){ AR.stream=s; v.srcObject=s; var pl=v.play&&v.play(); if(pl&&pl.catch) pl.catch(function(){}); })
    .catch(function(){ var c=el('arCal'); if(c) c.textContent='Camera is off — allow it in Settings, or use the arrow as-is.'; });
}
function startAROrientation(){
  function handler(e){
    var h=null;
    if(typeof e.webkitCompassHeading==='number' && !isNaN(e.webkitCompassHeading)) h=e.webkitCompassHeading;
    else if(typeof e.alpha==='number') h=360-e.alpha;
    if(h!=null) AR.heading=(h+360)%360;
  }
  AR.orient=handler;
  try{
    if(window.DeviceOrientationEvent && typeof DeviceOrientationEvent.requestPermission==='function'){
      DeviceOrientationEvent.requestPermission().then(function(r){
        if(r==='granted'){ window.addEventListener('deviceorientation', handler, true); }
        else { var c=el('arCal'); if(c) c.textContent='Compass permission off — the arrow points north-up.'; }
      }).catch(function(){});
    } else {
      window.addEventListener('deviceorientationabsolute', handler, true);
      window.addEventListener('deviceorientation', handler, true);
    }
  }catch(e){}
}
function arCurrentTarget(){
  if(AR.target) return AR.target;
  if(AR.route && AR.route.waypoints && AR.route.waypoints.length && state.pos){
    var wps=AR.route.waypoints, nearI=0, nearD=Infinity, i, d;
    for(i=0;i<wps.length;i++){ d=haversine(state.pos.lat,state.pos.lng,wps[i].lat,wps[i].lng); if(d<nearD){ nearD=d; nearI=i; } }
    var ni=nearI<wps.length-1?nearI+1:nearI; return wps[ni];
  }
  return null;
}
function arTick(){
  var w=el('arwrap');
  if(!w || !w.classList.contains('open')){ AR.raf=null; return; }
  var t=arCurrentTarget();
  if(t && state.pos){
    var d=haversine(state.pos.lat,state.pos.lng,t.lat,t.lng);
    var brg=bearing(state.pos.lat,state.pos.lng,t.lat,t.lng);
    var tg=el('arTarget'); if(tg) tg.textContent=(t.name?('Next: '+t.name):'Waypoint')+' · '+compass(brg);
    var di=el('arDist'); if(di) di.textContent=fmtDist(d);
    var rot=(AR.heading!=null)?(brg-AR.heading):brg;
    var ar=el('arArrow'); if(ar) ar.style.transform='rotate('+rot+'deg)';
    var c=el('arCal'); if(c && AR.heading==null && !c.textContent) c.textContent='Hold the iPad flat and point its top where you face.';
  } else {
    var tg2=el('arTarget'); if(tg2) tg2.textContent='Turn on location to guide you';
    var di2=el('arDist'); if(di2) di2.textContent='--';
  }
  AR.raf=requestAnimationFrame(arTick);
}
function closeAR(){
  var w=el('arwrap'); if(w) w.classList.remove('open');
  if(AR.stream){ try{ AR.stream.getTracks().forEach(function(tr){ tr.stop(); }); }catch(e){} AR.stream=null; }
  if(AR.watch!=null && navigator.geolocation){ navigator.geolocation.clearWatch(AR.watch); AR.watch=null; }
  if(AR.orient){ try{ window.removeEventListener('deviceorientation', AR.orient, true); window.removeEventListener('deviceorientationabsolute', AR.orient, true); }catch(e){} AR.orient=null; }
  if(AR.raf){ cancelAnimationFrame(AR.raf); AR.raf=null; }
  var v=el('arVideo'); if(v){ try{ v.srcObject=null; }catch(e){} }
}

/* ---------------- online / offline ---------------- */
function updateNet(){
  var on=navigator.onLine;
  var dot=el('netdot'), txt=el('nettxt');
  if(dot) dot.className='dot '+(on?'on':'off');
  if(txt) txt.textContent=on?'Online':'Offline';
}

/* ---------------- init ---------------- */
function init(){
  renderHome(); renderChips(); renderPlaces(); renderAlerts(); renderHelp(); updateNet();
  var q=el('q'); if(q) q.addEventListener('input', function(){ renderPlaces(); searchWorld(); });
  bindVoice(el('voiceToggle')); updateVoiceLabel();
  var note=el('locNote'); if(note){ note.style.cursor='pointer'; note.addEventListener('click', function(){
    ensurePos(function(){ renderPlaces(); note.textContent='Location on — sorted by distance.'; }); }); }
  el('hrefresh').onclick=function(){ hardRefresh(); };
  $$('nav button').forEach(function(b){ b.addEventListener('click', function(){ navTo(b.getAttribute('data-nav')); }); });
  window.addEventListener('online', updateNet);
  window.addEventListener('offline', updateNet);
  // live map controls
  if(el('mapBack')) el('mapBack').onclick=closeMap;
  if(el('mapMenu')) el('mapMenu').onclick=openDrawer;
  if(el('navClose')) el('navClose').onclick=closeDrawer;
  if(el('navBackdrop')) el('navBackdrop').onclick=closeDrawer;
  if(el('mapRefresh')) el('mapRefresh').onclick=function(){ hardRefresh(); };
  if(el('mapSearch')) el('mapSearch').addEventListener('input', mapSearchRun);
  if(el('mapLayer')) el('mapLayer').onclick=function(){
    if(!LMap.map || !LMap.base) return;
    if(LMap.offline){ try{ LMap.map.removeLayer(LMap.offline); }catch(e){} LMap.offline=null; LMap.base.addTo(LMap.map); LMap.cur=(LMap.base===LMap.vector?'vector':'streets'); el('mapLayer').textContent='Satellite'; toast('Back to live tiles'); return; }
    if(LMap.cur!=='sat'){ LMap.map.removeLayer(LMap.base); LMap.sat.addTo(LMap.map); LMap.cur='sat'; el('mapLayer').textContent='Map'; }
    else { LMap.map.removeLayer(LMap.sat); LMap.base.addTo(LMap.map); LMap.cur=(LMap.base===LMap.vector?'vector':'streets'); el('mapLayer').textContent='Satellite'; }
  };
  $$('#mapModes button').forEach(function(bt){ bt.onclick=function(){
    $$('#mapModes button').forEach(function(x){ x.classList.remove('on'); }); bt.classList.add('on');
    if(LMap.from && LMap.dest) drawRoute(LMap.from, LMap.dest, bt.getAttribute('data-mode'));
  }; });
  if(el('mapRecenter')) el('mapRecenter').onclick=function(){
    if(LMap.meMarker){ LMap.map.setView(LMap.meMarker.getLatLng(), 15); }
    else { ensurePos(function(){ if(state.pos && LMap.map) LMap.map.setView([state.pos.lat,state.pos.lng], 15); }); }
  };
  if(el('mapDrop')) el('mapDrop').onclick=function(){
    if(!LMap.map) return;
    var c=LMap.map.getCenter();
    var name=null;
    try{ name=window.prompt('Name this pin', 'My spot'); }catch(e){}
    if(name===null) name='My spot';
    addPin(c.lat, c.lng, name.trim()||'My spot'); renderPins(); toast('Pin saved to My pins');
  };
  if(el('mapRain')) el('mapRain').onclick=function(){ toggleRain(); };
  if(el('mapReach')) el('mapReach').onclick=function(){ toggleReach(); };
  if(el('mapCam')) el('mapCam').onclick=function(){ toggleCameras(); };
  if(el('mapOnRoute')) el('mapOnRoute').onclick=function(){
    var rt=el('mapRouteTools'); if(!rt) return;
    if(rt.classList.contains('open')){ rt.classList.remove('open'); return; }
    if(!routeCoords()){ toast('Open or draw a route first'); return; }
    rt.innerHTML=ROUTE_CATS.map(function(c){ return '<button data-rcat="'+c.key+'">'+esc(c.label)+' on route</button>'; }).join('');
    $$('[data-rcat]',rt).forEach(function(b){ b.onclick=function(){
      var k=b.getAttribute('data-rcat'), cat=null; for(var i=0;i<ROUTE_CATS.length;i++){ if(ROUTE_CATS[i].key===k) cat=ROUTE_CATS[i]; }
      rt.classList.remove('open'); if(cat) nearestOnRoute(cat);
    }; });
    rt.classList.add('open');
  };
  if(el('mapGpx')) el('mapGpx').onclick=function(){
    var imp=false;
    try{ imp=window.confirm('Load a GPX file?\n\nOK = open a track file to view.\nCancel = save this route as GPX.'); }catch(e){ imp=false; }
    if(imp){ var fi=el('gpxFile'); if(fi){ fi.value=''; fi.click(); } }
    else { gpxExport(); }
  };
  if(el('gpxFile')) el('gpxFile').onchange=function(){ if(this.files && this.files[0]) gpxImport(this.files[0]); };
  if(el('arBack')) el('arBack').onclick=function(){ closeAR(); };
  if(el('packFile')) el('packFile').onchange=function(){
    var f=this.files && this.files[0]; if(!f) return;
    if(!/\.pmtiles$/i.test(f.name)){ toast('Please pick a .pmtiles file'); return; }
    toast('Saving map to your device…');
    savePack(f).then(function(){ toast('Map saved'); if(state.view==='offline') refreshPackList(); })
      .catch(function(){ toast('Could not save that map'); });
  };
  buildDrawer();
  // Map-first: launch straight into the dark map (falls back to the menu if the map engine is missing).
  if(typeof L!=='undefined'){ openMap({}); }
}
init();

})();
