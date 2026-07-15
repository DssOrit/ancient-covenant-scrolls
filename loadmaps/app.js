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
  else if(key==='places'){ renderPlaces(); showView('places','places'); }
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
      '<button class="hcard alerts" data-go="alerts"><div class="hi">'+ICO.warn+'</div><b>Alerts</b><span>Route notes and reports</span></button>'+
      '<button class="hcard help" data-go="help"><div class="hi">'+ICO.q+'</div><b>How to use</b><span>Simple guide, with search</span></button>'+
    '</div>';
  $$('[data-go]',v).forEach(function(b){ b.onclick=function(){ navTo(b.getAttribute('data-go')); }; });
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
  var items=allItems().filter(function(it){
    if(state.cc==='FAV'){ if(!isFav(it.ref.id)) return false; }
    else if(state.cc!=='ALL' && it.cc!==state.cc) return false;
    if(q){ if((it.name+' '+it.area+' '+it.blurb).toLowerCase().indexOf(q)<0) return false; }
    return true;
  });
  if(state.pos){ items.sort(function(a,b){ return haversine(state.pos.lat,state.pos.lng,a.lat,a.lng)-haversine(state.pos.lat,state.pos.lng,b.lat,b.lng); }); }
  var host=el('placeList');
  if(!items.length){
    host.innerHTML = state.cc==='FAV'
      ? '<div class="info flat"><p class="muted">No saved places yet. Tap the star on any place to save it here.</p></div>'
      : '<div class="info flat"><p class="muted">No match. Try another word or a different country.</p></div>';
    return;
  }
  host.innerHTML=items.map(function(it){
    var dist='';
    if(state.pos){ var d=haversine(state.pos.lat,state.pos.lng,it.lat,it.lng), br=bearing(state.pos.lat,state.pos.lng,it.lat,it.lng);
      dist='<div class="dist"><b>'+fmtDist(d)+'</b><span>'+compass(br)+'</span></div>'; }
    var tags = it.kind==='guided'
      ? '<span class="tag guide">Guided route</span><span class="tag ok">Offline ready</span>'
      : '<span class="tag">'+esc(ccName(it.cc))+'</span>';
    return '<button class="card place" data-open="'+it.kind+':'+it.ref.id+'">'+
      '<span class="fav'+(isFav(it.ref.id)?' on':'')+'" data-fav="'+it.ref.id+'" role="button" aria-label="Save">'+ICO.star+'</span>'+
      '<div class="top">'+
      '<div class="flag">'+esc(it.cc)+'</div>'+
      '<div><h3>'+esc(it.name)+'</h3><div class="area">'+esc(it.area)+'</div></div>'+ dist +
      '</div><div class="muted small" style="margin-top:8px">'+esc(it.blurb)+'</div>'+ tags +'</button>';
  }).join('');
  $$('[data-fav]',host).forEach(function(s){ s.onclick=function(e){ e.stopPropagation(); e.preventDefault();
    toggleFav(s.getAttribute('data-fav')); renderChips(); renderPlaces(); }; });
  $$('[data-open]',host).forEach(function(b){ b.onclick=function(){ var pr=b.getAttribute('data-open').split(':');
    if(pr[0]==='guided'){ openGuided(byId(LM.guided,pr[1])); } else { openPlace(byId(LM.places,pr[1])); } }; });
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
    '<div class="info"><h4>About</h4><p>'+esc(p.blurb)+'</p></div>'+
    (state.pos?'':'<div class="info"><p class="muted small">Tap <b>Guide me there</b> and allow location to see live distance and direction.</p></div>')+
    '<button class="btn green" id="guideBtn">'+ICO.nav+' Guide me there</button>'+
    '<div class="row2" style="margin-top:10px">'+
      '<button class="savebtn'+(isFav(p.id)?' on':'')+'" id="favBtn" style="margin-top:0">'+ICO.star+'<span id="favTxt">'+(isFav(p.id)?'Saved':'Save')+'</span></button>'+
      '<button class="savebtn" id="shareBtn" style="margin-top:0">'+ICO.share+' Share</button>'+
    '</div>'+
    '<div style="height:10px"></div>'+
    '<button class="btn sos" id="sosBtn">'+ICO.phone+' Emergency '+esc(state.curEmergency)+'</button>'+
    '<p class="muted small" style="text-align:center;margin-top:8px">Dials '+esc(state.curEmergency)+' ('+esc(ccName(p.cc))+') and shows your coordinates to read out.</p>';
  showView('detail','places');
  bindBacks(v);
  bindGallery(v);
  el('guideBtn').onclick=function(){ startPlaceGuide(p); };
  el('sosBtn').onclick=function(){ doSOS(); };
  el('favBtn').onclick=function(){ toggleFav(p.id); var on=isFav(p.id);
    el('favBtn').classList.toggle('on',on); el('favTxt').textContent=on?'Saved':'Save'; };
  el('shareBtn').onclick=function(){ doShare('Load Maps — '+p.name, p.name+' ('+p.area+')  '+p.lat.toFixed(4)+', '+p.lng.toFixed(4)); };
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
    gallery+
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
  el('startGuide').onclick=function(){ startGuidedLive(g); };
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
}
init();

})();
