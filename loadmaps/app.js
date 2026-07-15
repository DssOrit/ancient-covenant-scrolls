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
  if(key==='home'){ renderHome(); showView('home','home'); }
  else if(key==='drive'){ renderRoutes('drive'); showView('guided','drive'); }
  else if(key==='hike'){ renderRoutes('hike'); showView('guided','hike'); }
  else if(key==='places'){ renderChips(); renderPlaces(); showView('places','places'); }
  else if(key==='nearby'){ renderNearby(); showView('nearby','home'); }
  else if(key==='alerts'){ renderAlerts(); showView('alerts','home'); }
  else if(key==='help'){ renderHelp(); showView('help','home'); }
}
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
  LMap.streets = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom:19, attribution:'&copy; OpenStreetMap contributors' });
  LMap.sat = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', { maxZoom:19, attribution:'Imagery &copy; Esri, Maxar, Earthstar Geographics' });
  LMap.streets.addTo(LMap.map); LMap.cur='streets';
  LMap.map.setView([39.5,-8], 6);
}
function openMap(opts){
  if(typeof L==='undefined'){ toast('The live map needs a connection the first time.'); return; }
  el('mapwrap').classList.add('open');
  mapInit();
  if(LMap.routeLayer){ LMap.map.removeLayer(LMap.routeLayer); LMap.routeLayer=null; }
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
function closeMap(){ el('mapwrap').classList.remove('open'); if(LMap.watch!=null && navigator.geolocation){ navigator.geolocation.clearWatch(LMap.watch); LMap.watch=null; } }
function startMapLocate(){
  if(LMap.watch!=null || !navigator.geolocation) return;
  LMap.watch=navigator.geolocation.watchPosition(function(pos){
    var ll=[pos.coords.latitude,pos.coords.longitude];
    state.pos={ lat:pos.coords.latitude, lng:pos.coords.longitude, acc:pos.coords.accuracy };
    if(!LMap.meMarker){ LMap.meMarker=L.circleMarker(ll, { radius:8, color:'#fff', weight:2, fillColor:'#3d8bff', fillOpacity:1 }).addTo(LMap.map); }
    else LMap.meMarker.setLatLng(ll);
  }, function(){}, { enableHighAccuracy:true, maximumAge:5000 });
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
    '<div class="info"><h4>About</h4><p>'+esc(p.blurb)+'</p></div>'+
    (state.pos?'':'<div class="info"><p class="muted small">Tap <b>Guide me there</b> and allow location to see live distance and direction.</p></div>')+
    '<button class="btn green" id="guideBtn">'+ICO.nav+' Guide me there</button>'+
    '<div class="row2" style="margin-top:10px">'+
      '<button class="savebtn'+(isFav(p.id)?' on':'')+'" id="favBtn" style="margin-top:0">'+ICO.star+'<span id="favTxt">'+(isFav(p.id)?'Saved':'Save')+'</span></button>'+
      '<button class="savebtn" id="shareBtn" style="margin-top:0">'+ICO.share+' Share</button>'+
    '</div>'+
    '<button class="btn ghost" id="placeMapBtn" style="margin-top:10px">'+ICO.pin+' Show on live map</button>'+
    (p.pin ? '<button class="btn ghost" id="rmPinBtn" style="margin-top:10px;color:var(--red)">Remove pin</button>' : '')+
    '<div style="height:10px"></div>'+
    '<button class="btn sos" id="sosBtn">'+ICO.phone+' Emergency '+esc(state.curEmergency)+'</button>'+
    '<p class="muted small" style="text-align:center;margin-top:8px">Dials '+esc(state.curEmergency)+' ('+esc(ccName(p.cc))+') and shows your coordinates to read out.</p>';
  showView('detail','places');
  bindBacks(v);
  bindGallery(v);
  loadWeather(p.lat, p.lng, 'wxCard');
  el('guideBtn').onclick=function(){ startPlaceGuide(p); };
  el('sosBtn').onclick=function(){ doSOS(); };
  el('favBtn').onclick=function(){ toggleFav(p.id); var on=isFav(p.id);
    el('favBtn').classList.toggle('on',on); el('favTxt').textContent=on?'Saved':'Save'; };
  el('shareBtn').onclick=function(){ doShare('Load Maps — '+p.name, p.name+' ('+p.area+')  '+p.lat.toFixed(4)+', '+p.lng.toFixed(4)); };
  if(el('placeMapBtn')) el('placeMapBtn').onclick=function(){ openMap({ place:p }); };
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
  var b=el('hrefresh'); if(b){ b.classList.remove('spin'); void b.offsetWidth; b.classList.add('spin'); setTimeout(function(){ b.classList.remove('spin'); },750); }
  updateNet();
  ensurePos(function(){ rerenderCurrent(); });
  rerenderCurrent();
  toast('Refreshed');
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
  var q=el('q'); if(q) q.addEventListener('input', renderPlaces);
  bindVoice(el('voiceToggle')); updateVoiceLabel();
  var note=el('locNote'); if(note){ note.style.cursor='pointer'; note.addEventListener('click', function(){
    ensurePos(function(){ renderPlaces(); note.textContent='Location on — sorted by distance.'; }); }); }
  el('hrefresh').onclick=function(){ hardRefresh(); };
  $$('nav button').forEach(function(b){ b.addEventListener('click', function(){ navTo(b.getAttribute('data-nav')); }); });
  window.addEventListener('online', updateNet);
  window.addEventListener('offline', updateNet);
  // live map controls
  if(el('mapBack')) el('mapBack').onclick=closeMap;
  if(el('mapLayer')) el('mapLayer').onclick=function(){
    if(!LMap.map) return;
    if(LMap.cur==='streets'){ LMap.map.removeLayer(LMap.streets); LMap.sat.addTo(LMap.map); LMap.cur='sat'; el('mapLayer').textContent='Streets'; }
    else { LMap.map.removeLayer(LMap.sat); LMap.streets.addTo(LMap.map); LMap.cur='streets'; el('mapLayer').textContent='Satellite'; }
  };
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
}
init();

})();
