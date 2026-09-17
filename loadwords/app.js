// ================= Load Words — app logic =================

// ---------------- splash sequencing (intro -> splash -> app) ----------------
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

const APP_VERSION = 'v8';
const BOX_INTERVAL_DAYS = [0,1,3,7,14,30];
const TRICKY_PATTERNS = ['augh','eigh','ough','tious','cious','sion','tion','dge','que','gue','igh','kn','wr','mb','ck','ph','gh','ei','ie'].sort((a,b)=>b.length-a.length);

const ICONS = {
  home:'<path d="M4 11.5 12 4l8 7.5"/><path d="M6 10v9a1 1 0 0 0 1 1h4v-6h2v6h4a1 1 0 0 0 1-1v-9"/>',
  book:'<path d="M4 5.5c2-1 5-1 8 0v14c-3-1-6-1-8 0z"/><path d="M20 5.5c-2-1-5-1-8 0v14c3-1 6-1 8 0z"/>',
  test:'<circle cx="12" cy="12" r="8.5"/><path d="M9 12l2 2 4-4.5"/>',
  plus:'<path d="M12 5v14M5 12h14"/>',
  gear:'<circle cx="12" cy="12" r="3.2"/><path d="M19.4 13.5a7.6 7.6 0 0 0 0-3l1.9-1.4-2-3.4-2.2.7a7.6 7.6 0 0 0-2.6-1.5L14 2h-4l-.5 2.3a7.6 7.6 0 0 0-2.6 1.5l-2.2-.7-2 3.4L4.6 10.5a7.6 7.6 0 0 0 0 3L2.7 15l2 3.4 2.2-.7c.8.7 1.6 1.2 2.6 1.5L10 22h4l.5-2.3c1-.3 1.8-.8 2.6-1.5l2.2.7 2-3.4z"/>',
  speaker:'<path d="M4 9v6h4l5 4V5L8 9z"/><path d="M16.5 9a4.5 4.5 0 0 1 0 6"/><path d="M19 6.5a8.5 8.5 0 0 1 0 11"/>',
  speakerSm:'<path d="M4 9v6h4l5 4V5L8 9z"/><path d="M16.5 9a4.5 4.5 0 0 1 0 6"/>',
  chevL:'<path d="M15 5 8 12l7 7"/>',
  chevR:'<path d="M9 5l7 7-7 7"/>',
  chevD:'<path d="M6 9l6 6 6-6"/>',
  x:'<path d="M6 6l12 12M18 6 6 18"/>',
  image:'<rect x="3.5" y="4.5" width="17" height="15" rx="2.5"/><circle cx="9" cy="10" r="1.7"/><path d="M4 17l5-5 4 4 3-3 4 4"/>',
  edit:'<path d="M4 20l.9-4L16.5 4.4a1.8 1.8 0 0 1 2.5 0l.6.6a1.8 1.8 0 0 1 0 2.5L8 19l-4 1z"/>',
  search:'<circle cx="11" cy="11" r="6.5"/><path d="M20 20l-4.3-4.3"/>',
  star:'<path d="M12 3.5l2.6 5.4 5.9.8-4.3 4.2 1 5.9-5.2-2.8-5.2 2.8 1-5.9-4.3-4.2 5.9-.8z"/>',
  alert:'<path d="M12 3 2 20h20z"/><path d="M12 10v4"/><circle cx="12" cy="17" r="0.6" fill="currentColor" stroke="none"/>',
  fire:'<path d="M12 2c1 3-3 4-3 8a3 3 0 0 0 6 0c1 1 1.5 2.5 1.5 4a4.5 4.5 0 0 1-9 0C7.5 9 9 6 12 2z"/>',
  clock:'<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
  layers:'<path d="M12 3 3 8l9 5 9-5z"/><path d="M3 13l9 5 9-5"/>',
  check:'<path d="M5 12.5l4.5 4.5L19 7"/>',
  photo:'<rect x="3.5" y="4.5" width="17" height="15" rx="2.5"/><circle cx="9" cy="10" r="1.7"/><path d="M4 17l5-5 4 4 3-3 4 4"/>',
  play:'<path d="M7 5.5v13l11-6.5z"/>',
  pause:'<rect x="6.5" y="5" width="4" height="14" rx="1"/><rect x="13.5" y="5" width="4" height="14" rx="1"/>',
  stop:'<rect x="6" y="6" width="12" height="12" rx="2"/>',
  skipBack:'<path d="M18 6.5v11L9 12z"/><rect x="5.5" y="6" width="2" height="12" rx="0.6" fill="currentColor" stroke="none"/>',
  skipFwd:'<path d="M6 6.5v11l9-5.5z"/><rect x="16.5" y="6" width="2" height="12" rx="0.6" fill="currentColor" stroke="none"/>',
  heart:'<path d="M12 20s-7-4.35-9.5-9C.8 7.2 3 4 6.3 4c2 0 3.4 1.1 4.2 2.3C11.3 5.1 12.7 4 14.7 4 18 4 20.2 7.2 18.5 11 16 15.65 12 20 12 20z"/>',
  headphones:'<path d="M4 13v-1a8 8 0 0 1 16 0v1"/><rect x="3" y="13" width="4" height="7" rx="1.5"/><rect x="17" y="13" width="4" height="7" rx="1.5"/>',
  download:'<path d="M12 3v12m0 0 4-4m-4 4-4-4"/><path d="M4 19h16"/>',
  compare:'<path d="M8 4v16M16 4v16"/><path d="M4 9l4-4 4 4M12 15l4 4 4-4"/>',
  refresh:'<path d="M3 12a9 9 0 0 1 15.4-6.4L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-15.4 6.4L3 16"/><path d="M3 21v-5h5"/>'
};
function ic(name,extra){ return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" ${extra||''}>${ICONS[name]||''}</svg>`; }

// ---------------- storage helpers (browser localStorage — works standalone, no backend needed) ----------------
const LS_PREFIX = 'loadwords:';
async function sGet(key, fallback){
  try{
    const raw = window.localStorage.getItem(LS_PREFIX+key);
    if(raw===null || raw===undefined) return fallback;
    return JSON.parse(raw);
  }catch(e){ console.error('storage get failed', key, e); return fallback; }
}
async function sSet(key, value){
  try{ window.localStorage.setItem(LS_PREFIX+key, JSON.stringify(value)); }
  catch(e){ console.error('storage set failed', key, e); }
}

// ---------------- state ----------------
const State = {
  view:'home',           // home | list | study | test | add | settings | wordDetail | listen
  words:[],               // merged CORE_WORDS + customWords
  progress:{},             // id -> {box, next, correct, wrong}
  images:{},               // id -> url
  difficultWords:[],       // array of word ids the user flagged in Listen mode
  settings:{ theme:'cream', size:'m', spacing:'normal', rate:0.85 },
  streak:{ count:0, lastDate:null },
  studyQueue:[], studyIndex:0, studyRevealed:false,
  testQueue:[], testIndex:0, testScore:0, testType:'meaning', testAnswered:false,
  spellAttempt:'', spellCorrect:false,
  soundItOut:{ active:false, wordId:null, index:0 },
  listFilter:'all', listSearch:'',
  detailId:null,
  editingWord:null,
  listen:{
    started:false, source:'due', roundMode:'loop', repeatWord:1,
    queue:[], index:0, segIndex:0, segs:[],
    playing:false, sinceQuiz:0, recentIds:[],
    quiz:null, // {queue:[ids], index, score, answered}
  },
};

function todayStr(){ return new Date().toISOString().slice(0,10); }
function addDays(dateStr, n){ const d=new Date(dateStr+'T00:00:00'); d.setDate(d.getDate()+n); return d.toISOString().slice(0,10); }

async function loadAll(){
  const customWords = await sGet('customWords', []);
  State.words = CORE_WORDS.concat(customWords);
  State.progress = await sGet('progress', {});
  State.images = await sGet('images', {});
  State.difficultWords = await sGet('difficultWords', []);
  State.streak = await sGet('streak', { count:0, lastDate:null });
  const s = await sGet('settings', null);
  if(s) State.settings = Object.assign(State.settings, s);
  applyTheme();
}
function applyTheme(){
  document.body.setAttribute('data-theme', State.settings.theme);
  document.body.setAttribute('data-size', State.settings.size);
  document.body.setAttribute('data-spacing', State.settings.spacing);
}

// ---------------- speech ----------------
function speak(text, rate){
  if(!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.rate = rate || State.settings.rate || 0.85;
  u.lang = 'en-US';
  window.speechSynthesis.speak(u);
}
function speakSyllables(word){
  if(!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const chips = Array.from(document.querySelectorAll('.syll'));
  let i = 0;
  function next(){
    chips.forEach(c=>c.classList.remove('lit'));
    if(i >= word.syllables.length){
      setTimeout(()=>speak(word.word, (State.settings.rate||0.85)), 150);
      return;
    }
    const u = new SpeechSynthesisUtterance(word.syllables[i]);
    u.rate = 0.7; u.lang='en-US';
    if(chips[i]) chips[i].classList.add('lit');
    u.onend = ()=>{ i++; setTimeout(next, 80); };
    u.onerror = ()=>{ i++; setTimeout(next, 80); };
    window.speechSynthesis.speak(u);
  }
  next();
}
// speak() with live word-by-word highlighting inside a text container (bimodal reading).
// containerEl must hold .wword spans produced by wordSpansHtml(). Falls back to a plain
// speak when the browser doesn't fire onboundary — nothing breaks, it just won't highlight.
function speakBound(text, rate, containerEl, onEnd){
  if(!('speechSynthesis' in window)){ if(onEnd) onEnd(); return; }
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.rate = rate || State.settings.rate || 0.85;
  u.lang = 'en-US';
  const spans = containerEl ? Array.from(containerEl.querySelectorAll('.wword')) : [];
  spans.forEach(s=>s.classList.remove('lit'));
  if(spans.length){
    u.onboundary = (ev)=>{
      if(ev.name && ev.name!=='word') return;
      const idx = ev.charIndex;
      let current = null;
      for(const s of spans){ const st=parseInt(s.getAttribute('data-start'),10); if(st<=idx) current=s; else break; }
      spans.forEach(s=>s.classList.toggle('lit', s===current));
    };
  }
  const finish = ()=>{ spans.forEach(s=>s.classList.remove('lit')); if(onEnd) onEnd(); };
  u.onend = finish;
  u.onerror = finish;
  window.speechSynthesis.speak(u);
}
// wraps each word of `text` in a <span class="wword" data-start="charIndex"> so speakBound
// can highlight it in sync with speech. data-start indexes into the RAW (unescaped) text,
// matching the charIndex speechSynthesis reports.
function wordSpansHtml(text){
  const tokens = String(text).split(/(\s+)/);
  let out = '', idx = 0;
  tokens.forEach(tok=>{
    if(tok===''){ return; }
    if(/^\s+$/.test(tok)){ out += tok; idx += tok.length; return; }
    out += `<span class="wword" data-start="${idx}">${escapeHtml(tok)}</span>`;
    idx += tok.length;
  });
  return out;
}

// ---------------- confusing-pair audio contrast ----------------
function playPairContrast(w){
  if(!('speechSynthesis' in window)) return;
  const relatedWords = (w.related||[]).map(id=>State.words.find(x=>x.id===id)).filter(Boolean);
  if(!relatedWords.length) return;
  window.speechSynthesis.cancel();
  const seq = [w, ...relatedWords];
  let i = 0;
  function highlight(word){
    document.querySelectorAll('.pair-chip').forEach(c=>c.classList.toggle('on', c.getAttribute('data-pid')===word.id));
  }
  function next(){
    if(i >= seq.length){ document.querySelectorAll('.pair-chip').forEach(c=>c.classList.remove('on')); return; }
    const word = seq[i];
    highlight(word);
    const u = new SpeechSynthesisUtterance(word.word);
    u.rate = (State.settings.rate||0.85) * 0.9; u.lang='en-US';
    u.onend = ()=>{ i++; setTimeout(next, 550); };
    u.onerror = ()=>{ i++; setTimeout(next, 550); };
    window.speechSynthesis.speak(u);
  }
  next();
}

// ---------------- sound-it-out (slow, tap-to-advance syllable blend) ----------------
function soundItOutClick(w){
  const s = State.soundItOut;
  if(s.wordId !== w.id){ s.wordId = w.id; s.active = false; s.index = 0; }
  const chips = Array.from(document.querySelectorAll('.syll'));
  if(!s.active){ s.active = true; s.index = 0; }
  if(s.index < w.syllables.length){
    chips.forEach(c=>c.classList.remove('lit'));
    if(chips[s.index]) chips[s.index].classList.add('lit');
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(w.syllables[s.index]);
    u.rate = 0.5; u.lang='en-US';
    window.speechSynthesis.speak(u);
    s.index++;
    render();
  } else {
    chips.forEach(c=>c.classList.remove('lit'));
    s.active = false; s.index = 0;
    speak(w.word, 0.7);
    render();
  }
}

// ---------------- tricky letter-cluster highlighting ----------------
function hasTrickyPattern(word){
  const lower = word.toLowerCase();
  return TRICKY_PATTERNS.some(p=>lower.includes(p));
}
function trickySpellingHtml(word){
  const lower = word.toLowerCase();
  let i = 0, out = '';
  while(i < word.length){
    let matched = null;
    for(const pat of TRICKY_PATTERNS){
      if(lower.startsWith(pat, i)){ matched = pat; break; }
    }
    if(matched){
      out += `<span class="tricky">${escapeHtml(word.slice(i, i+matched.length))}</span>`;
      i += matched.length;
    } else {
      out += escapeHtml(word[i]);
      i += 1;
    }
  }
  return out;
}

// ---------------- word card image export ----------------
function roundRect(ctx,x,y,w,h,r){
  ctx.beginPath();
  ctx.moveTo(x+r,y);
  ctx.arcTo(x+w,y,x+w,y+h,r);
  ctx.arcTo(x+w,y+h,x,y+h,r);
  ctx.arcTo(x,y+h,x,y,r);
  ctx.arcTo(x,y,x+w,y,r);
  ctx.closePath();
}
function wrapCanvasText(ctx,text,x,y,maxWidth,lineHeight,maxLines){
  const words = String(text).split(' ');
  let line = '', cy = y, lines = 0;
  for(const word of words){
    const test = line + word + ' ';
    if(ctx.measureText(test).width > maxWidth && line){
      ctx.fillText(line.trim(), x, cy);
      line = word + ' '; cy += lineHeight; lines++;
      if(maxLines && lines >= maxLines-1){
        const rest = words.slice(words.indexOf(word)).join(' ');
        ctx.fillText(rest.length>60 ? rest.slice(0,57)+'...' : rest, x, cy);
        return cy + lineHeight;
      }
    } else { line = test; }
  }
  ctx.fillText(line.trim(), x, cy);
  return cy + lineHeight;
}
function exportWordCardImage(w){
  const canvas = document.createElement('canvas');
  const W = 1000, H = 620;
  canvas.width = W; canvas.height = H;
  const ctx = canvas.getContext('2d');
  const isDark = State.settings.theme === 'dark';
  const bg = isDark ? '#0A1628' : '#FAF6F0';
  const card = isDark ? '#142040' : '#FFFFFF';
  const text = isDark ? '#D0E0F8' : '#1A1A2E';
  const soft = isDark ? '#8098C0' : '#5A5A6E';
  const accent = isDark ? '#5B8DEF' : '#2563EB';
  ctx.fillStyle = bg; ctx.fillRect(0,0,W,H);
  ctx.fillStyle = card;
  roundRect(ctx,40,40,W-80,H-80,24); ctx.fill();
  ctx.textBaseline = 'top';
  ctx.fillStyle = accent;
  ctx.font = '700 56px Arial, sans-serif';
  ctx.fillText(w.word, 80, 90);
  ctx.fillStyle = soft;
  ctx.font = '600 22px Arial, sans-serif';
  ctx.fillText(w.syllables.join(' · ') + '   ·   ' + w.pos, 80, 165);
  ctx.fillStyle = text;
  ctx.font = '400 28px Arial, sans-serif';
  let y = wrapCanvasText(ctx, w.definition, 80, 220, W-160, 38, 3);
  ctx.fillStyle = soft;
  ctx.font = 'italic 24px Arial, sans-serif';
  wrapCanvasText(ctx, '"' + w.example + '"', 80, Math.max(y+16, H-160), W-160, 32, 2);
  ctx.font = '600 18px Arial, sans-serif';
  ctx.fillStyle = accent;
  ctx.fillText('Load Words', 80, H-60);
  canvas.toBlob(blob=>{
    if(!blob) return;
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `loadwords-${w.id}.png`;
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    setTimeout(()=>URL.revokeObjectURL(url), 4000);
  }, 'image/png');
}

// ---------------- streak ----------------
async function bumpStreak(){
  const today = todayStr();
  const st = State.streak;
  if(st.lastDate === today) return;
  const yesterday = addDays(today, -1);
  st.count = (st.lastDate === yesterday) ? (st.count||0) + 1 : 1;
  st.lastDate = today;
  await sSet('streak', st);
}

// ---------------- spaced repetition ----------------
// level: 0 = still learning (box down), 1 = getting there (box unchanged, short recheck),
// 2 = got it (box up). Test/Listen-quiz answers map their boolean correctness to 2 or 0.
function getProgress(id){ return State.progress[id] || {box:0, next:todayStr(), correct:0, wrong:0}; }
async function gradeWord(id, level){
  const p = getProgress(id);
  if(level>=2){ p.box = Math.min(p.box+1, 5); p.correct=(p.correct||0)+1; }
  else if(level===1){ p.correct=(p.correct||0); }
  else{ p.box = Math.max(p.box-1, 0); p.wrong=(p.wrong||0)+1; }
  const interval = level===1 ? Math.min(BOX_INTERVAL_DAYS[p.box], 3) : BOX_INTERVAL_DAYS[p.box];
  p.next = addDays(todayStr(), interval);
  State.progress[id] = p;
  await sSet('progress', State.progress);
  await bumpStreak();
}
function dueWords(){
  const t = todayStr();
  return State.words.filter(w=>{
    const p = State.progress[w.id];
    if(!p) return true;
    return p.next <= t;
  });
}
function masteredCount(){ return State.words.filter(w=>(State.progress[w.id]||{}).box>=5).length; }
function newCount(){ return State.words.filter(w=>!State.progress[w.id]).length; }

// ---------------- toast ----------------
let toastTimer;
function toast(msg){
  const t = document.getElementById('toast');
  t.textContent = msg; t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(()=>t.classList.remove('show'), 1800);
}

// ---------------- hard refresh (scoped to this app only) ----------------
// Only ever touches caches prefixed 'loadwords-' and the service worker
// registered at /loadwords/ — never a site-wide wipe. See HANDOFF.md's
// "Standard Scoped Hard Refresh Template".
async function hardRefresh(){
  try{
    if('caches' in window){
      const keys = await caches.keys();
      await Promise.all(
        keys.filter(k=>k.indexOf('loadwords-')===0).map(k=>caches.delete(k))
      );
    }
    if('serviceWorker' in navigator){
      const regs = await navigator.serviceWorker.getRegistrations();
      await Promise.all(
        regs.filter(r=>r.scope.indexOf('/loadwords/')>=0).map(r=>r.unregister())
      );
    }
  }catch(e){ console.warn('hard refresh cleanup failed', e); }
  location.reload(true);
}

// ---------------- image tile ----------------
function imageTile(word, size){
  const url = State.images[word.id];
  if(url){
    return `<div class="imgtile"><img src="${escapeAttr(url)}" alt="${escapeAttr(word.word)}" onerror="this.parentElement.innerHTML=window.__phFallback()"></div>`;
  }
  return phFallback();
}
function phInner(){
  return `<div class="ph">${ic('photo')}<span>No image added yet</span></div>`;
}
function phFallback(){
  return `<div class="imgtile">${phInner()}</div>`;
}
window.__phFallback = ()=> phInner();

function escapeAttr(s){ return String(s).replace(/"/g,'&quot;'); }
function escapeHtml(s){ return String(s).replace(/[&<>]/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c])); }

function tileColor(id){
  const colors = ['#2563EB','#7C3AED','#0891B2','#DC2626','#D97706'];
  let h=0; for(const c of id) h = (h*31 + c.charCodeAt(0))>>>0;
  return colors[h % colors.length];
}

// ================= RENDER =================
function render(){
  const app = document.getElementById('app');
  let html = topbarHtml();
  html += `<main>${renderView()}</main>`;
  html += bottomNavHtml();
  app.innerHTML = html;
  bindEvents();
}

function topbarHtml(){
  return `<div class="topbar">
    <div class="brand">
      <div class="brand-mark">${ic('book',{})}</div>
      <div class="brand-name">Load <b>Words</b></div>
    </div>
    <div class="topbar-actions">
      <button class="icon-btn refresh-btn" id="hardRefreshBtn" aria-label="Refresh app" title="Refresh app">${ic('refresh')}</button>
      <button class="icon-btn" data-nav="settings" aria-label="Settings">${ic('gear')}</button>
    </div>
  </div>`;
}

function bottomNavHtml(){
  const items = [
    {v:'home', icon:'home', label:'Home'},
    {v:'study', icon:'book', label:'Study'},
    {v:'test', icon:'test', label:'Test'},
    {v:'add', icon:'plus', label:'Add'},
    {v:'list', icon:'layers', label:'Words'},
  ];
  return `<div class="bottomnav"><div class="inner">
    ${items.map(i=>`<button class="navbtn ${State.view===i.v?'on':''}" data-nav="${i.v}">${ic(i.icon)}<span>${i.label}</span></button>`).join('')}
  </div></div>`;
}

function renderView(){
  switch(State.view){
    case 'home': return renderHome();
    case 'list': return renderList();
    case 'wordDetail': return renderWordDetail();
    case 'study': return renderStudy();
    case 'listen': return renderListen();
    case 'test': return renderTest();
    case 'add': return renderAdd();
    case 'settings': return renderSettings();
    default: return renderHome();
  }
}

// ---------------- HOME ----------------
function renderHome(){
  const due = dueWords().length;
  const mastered = masteredCount();
  const total = State.words.length;
  return `
  <div class="stat-grid">
    <div class="stat"><div class="num">${total}</div><div class="lbl">Words</div></div>
    <div class="stat"><div class="num">${due}</div><div class="lbl">Due today</div></div>
    <div class="stat"><div class="num">${mastered}</div><div class="lbl">Mastered</div></div>
  </div>
  ${State.streak.count>0 ? `<div style="text-align:center;"><div class="streak-pill">${ic('fire')}${State.streak.count}-day streak</div></div>` : ''}
  <div class="section-title">Jump in</div>
  <div class="action-row">
    <button class="action" data-nav="study" style="--c:#059669">
      <div class="a-ic">${ic('book')}</div>
      <div class="a-txt"><b>Study due words</b><span>${due} word${due===1?'':'s'} ready for review</span></div>
      <div class="a-chev">${ic('chevR')}</div>
    </button>
    <button class="action" data-nav="listen" style="--c:#4F46E5">
      <div class="a-ic">${ic('headphones')}</div>
      <div class="a-txt"><b>Listen mode</b><span>Hands-free audio: word, meaning, example &amp; usage on a loop</span></div>
      <div class="a-chev">${ic('chevR')}</div>
    </button>
    <button class="action" data-nav="test" style="--c:#7C3AED">
      <div class="a-ic">${ic('test')}</div>
      <div class="a-txt"><b>Take a test</b><span>Meaning match, sentence fill, typed recall &amp; more</span></div>
      <div class="a-chev">${ic('chevR')}</div>
    </button>
    <button class="action" data-nav="add" style="--c:#D97706">
      <div class="a-ic">${ic('plus')}</div>
      <div class="a-txt"><b>Add a word</b><span>Build your own list, with images</span></div>
      <div class="a-chev">${ic('chevR')}</div>
    </button>
  </div>
  <div class="section-title">Browse by category</div>
  <div class="chip-row">
    ${Object.keys(CATEGORY_META).map(k=>`<div class="chip" data-nav="list" data-cat="${k}">${CATEGORY_META[k].label}</div>`).join('')}
    <div class="chip" data-nav="list" data-cat="all">All words</div>
    ${State.difficultWords.length?`<div class="chip" data-nav="list" data-cat="difficult">Difficult (${State.difficultWords.length})</div>`:''}
  </div>`;
}

// ---------------- LIST ----------------
function renderList(){
  const words = State.words.filter(w=>{
    const catOk = State.listFilter==='all' || (State.listFilter==='difficult' ? State.difficultWords.includes(w.id) : w.category===State.listFilter);
    const s = State.listSearch.toLowerCase();
    const searchOk = !s || w.word.toLowerCase().includes(s) || w.definition.toLowerCase().includes(s);
    return catOk && searchOk;
  }).sort((a,b)=>a.word.localeCompare(b.word));

  return `
  <div class="pagehead"><h2>All Words</h2></div>
  <div class="search-box">${ic('search')}<input id="searchInput" type="text" placeholder="Search words or meanings" value="${escapeAttr(State.listSearch)}"></div>
  <div class="chip-row" style="margin-bottom:16px;">
    <div class="chip ${State.listFilter==='all'?'on':''}" data-filter="all">All</div>
    ${Object.keys(CATEGORY_META).map(k=>`<div class="chip ${State.listFilter===k?'on':''}" data-filter="${k}">${CATEGORY_META[k].label}</div>`).join('')}
    ${State.difficultWords.length?`<div class="chip ${State.listFilter==='difficult'?'on':''}" data-filter="difficult">Difficult</div>`:''}
  </div>
  <div class="card" style="padding:8px 16px;">
    ${words.length? words.map(w=>{
      const p = getProgress(w.id);
      return `<div class="wlist-item" data-word="${w.id}">
        <div class="tile" style="background:${tileColor(w.id)}">${w.word[0].toUpperCase()}</div>
        <div class="wtxt"><b>${escapeHtml(w.word)}</b><span>${CATEGORY_META[w.category]? CATEGORY_META[w.category].label : 'Your word'} · Box ${p.box}/5</span></div>
      </div>`;
    }).join('') : `<div class="empty" style="padding:30px 10px;"><p>No words match. Try a different search.</p></div>`}
  </div>`;
}

// ---------------- WORD DETAIL (from list, no grading) ----------------
function renderWordDetail(){
  const w = State.words.find(x=>x.id===State.detailId);
  if(!w) return renderList();
  const isCustom = w.category==='custom';
  return `<div class="pagehead"><button class="back" data-nav="list">${ic('chevL')}</button><h2>${escapeHtml(w.word)}</h2></div>
  <div class="action-row" style="margin-bottom:16px;">
    <button class="action" id="addImgBtn" style="--c:#2563EB"><div class="a-ic">${ic('image')}</div><div class="a-txt"><b>${State.images[w.id]?'Change image':'Add an image'}</b><span>Paste a link to a photo for this word</span></div></button>
    ${isCustom?`<button class="action" id="editWordBtn" style="--c:#7C3AED"><div class="a-ic">${ic('edit')}</div><div class="a-txt"><b>Edit this word</b><span>Update meaning, example or conversation</span></div></button>`:''}
    <button class="action" id="exportImgBtn" style="--c:#D97706"><div class="a-ic">${ic('download')}</div><div class="a-txt"><b>Save as image</b><span>Download a card with the word, meaning &amp; example</span></div></button>
  </div>
  ${wordCardHtml(w, true)}`;
}

// ---------------- STUDY ----------------
function startStudy(){
  State.studyQueue = dueWords();
  State.studyIndex = 0;
  State.studyRevealed = false;
}
function renderStudy(){
  if(!State.studyQueue.length){
    return `<div class="empty"><div>${ic('check')}</div><h3>Nothing due right now</h3><p>Great work — check back later, or browse all words anytime.</p>
    <button class="big-btn" style="margin-top:20px;" data-nav="list">Browse all words</button></div>`;
  }
  if(State.studyIndex >= State.studyQueue.length){
    return `<div class="empty"><div>${ic('star')}</div><h3>Session complete</h3><p>You reviewed ${State.studyQueue.length} word${State.studyQueue.length===1?'':'s'}.</p>
    <button class="big-btn" style="margin-top:20px;" data-nav="home">Back home</button></div>`;
  }
  const w = State.studyQueue[State.studyIndex];
  const pct = Math.round((State.studyIndex/State.studyQueue.length)*100);
  return `<div class="study-wrap">
    <div class="progress-bar"><i style="width:${pct}%"></i></div>
    ${wordCardHtml(w, State.studyRevealed)}
    ${!State.studyRevealed?`<button class="reveal-btn" id="revealBtn">Show meaning &amp; usage</button>`:`
      <div class="grade-row">
        <button class="grade-btn no" data-grade="0">${ic('x')}Still learning</button>
        <button class="grade-btn mid" data-grade="1">${ic('clock')}Getting there</button>
        <button class="grade-btn yes" data-grade="2">${ic('check')}Got it</button>
      </div>`}
  </div>`;
}

function wordCardHtml(w, revealed){
  const catLabel = CATEGORY_META[w.category] ? CATEGORY_META[w.category].label : 'Your word';
  const s = State.soundItOut;
  const soundActive = s.active && s.wordId===w.id;
  const soundLabel = soundActive ? (s.index < w.syllables.length ? 'Next sound' : 'Hear whole word') : 'Sound it out';
  const trickyHtml = hasTrickyPattern(w.word) ? `<div class="spell-pattern">${trickySpellingHtml(w.word)}</div>` : '';
  const relatedWords = (w.related||[]).map(id=>State.words.find(x=>x.id===id)).filter(Boolean);
  const thesaurusHtml = (w.syn && w.syn.length) ? `
    <div class="wblock">
      <div class="row-h"><h4>Thesaurus</h4></div>
      <div class="chip-row">
        ${w.syn.map(s=>{
          const match = findWordByExactText(s);
          return match
            ? `<div class="chip syn-live" data-syn-id="${match.id}">${escapeHtml(s)}</div>`
            : `<div class="chip syn-static">${escapeHtml(s)}</div>`;
        }).join('')}
      </div>
    </div>` : '';
  return `<div class="wcard">
    <div class="badge-row">
      <span class="badge reg">${w.register}</span>
      <span class="badge pos">${w.pos}</span>
      <span class="badge cat">${catLabel}</span>
    </div>
    ${imageTile(w)}
    <div class="syll-row" id="syllRow">
      ${w.syllables.map((s2,i)=>`<span class="syll ${i===w.stress?'stress':''}">${escapeHtml(s2)}</span>`).join('')}
    </div>
    ${trickyHtml}
    <div class="word-audio-row">
      <button class="spk-btn" id="playWordBtn">${ic('speaker')}Hear it</button>
      <button class="spk-btn ghost" id="playSyllBtn">${ic('layers')}By syllable</button>
      <button class="spk-btn ghost" id="soundItOutBtn">${ic('clock')}${soundLabel}</button>
    </div>
    ${revealed ? `
    <div class="wblock">
      <div class="row-h"><h4>Meaning</h4><div class="mini-spk" data-speak="${escapeAttr(w.definition)}" data-target="defText">${ic('speakerSm')}</div></div>
      <p id="defText">${wordSpansHtml(w.definition)}</p>
    </div>
    <div class="wblock">
      <div class="row-h"><h4>Example sentence</h4><div class="mini-spk" data-speak="${escapeAttr(w.example)}" data-target="exText">${ic('speakerSm')}</div></div>
      <p id="exText">${wordSpansHtml(w.example)}</p>
    </div>
    <div class="wblock">
      <div class="row-h"><h4>In conversation</h4></div>
      <div class="convo">
        <div class="line a"><p id="conv0Text">${wordSpansHtml(w.conv[0])}</p><div class="mini-spk" data-speak="${escapeAttr(w.conv[0])}" data-target="conv0Text">${ic('speakerSm')}</div></div>
        <div class="line b"><p id="conv1Text">${wordSpansHtml(w.conv[1])}</p><div class="mini-spk" data-speak="${escapeAttr(w.conv[1])}" data-target="conv1Text">${ic('speakerSm')}</div></div>
      </div>
    </div>
    ${thesaurusHtml}
    ${relatedWords.length ? `
    <div class="wblock">
      <div class="row-h"><h4>Sounds similar to</h4></div>
      <div class="chip-row">
        <div class="chip pair-chip" data-pid="${w.id}">${escapeHtml(w.word)}</div>
        ${relatedWords.map(rw=>`<div class="chip pair-chip" data-pid="${rw.id}">${escapeHtml(rw.word)}</div>`).join('')}
      </div>
      <button class="spk-btn ghost" id="pairContrastBtn" style="margin-top:10px;">${ic('compare')}Hear the difference</button>
    </div>` : ''}
    ${w.note?`<div class="note-box">${ic('alert')}<span>${escapeHtml(w.note)}</span></div>`:''}
    ` : ''}
  </div>`;
}

// ---------------- LISTEN MODE ----------------
let LISTEN_TOKEN = 0; // bumping this invalidates any in-flight speech callbacks

function listenPool(source){
  if(source==='difficult') return State.words.filter(w=>State.difficultWords.includes(w.id));
  if(source==='due') return dueWords();
  if(source==='all') return State.words;
  return State.words.filter(w=>w.category===source); // a category key
}

function buildWordSegments(w, repeatWord){
  const segs = [];
  for(let r=0; r<repeatWord; r++){
    segs.push({label:'Word', type:'syllables', word:w});
    segs.push({label:'Word', type:'text', text:w.word});
  }
  segs.push({label:'Meaning', type:'text', text:w.definition});
  segs.push({label:'Example', type:'text', text:w.example});
  segs.push({label:'Conversation', type:'text', text:w.conv[0]});
  segs.push({label:'Conversation', type:'text', text:w.conv[1]});
  return segs;
}

function startListenSession(){
  const L = State.listen;
  const pool = shuffle(listenPool(L.source));
  L.queue = pool;
  L.index = 0; L.segIndex = 0; L.sinceQuiz = 0; L.recentIds = [];
  L.quiz = null;
  L.started = true;
  L.playing = false;
  if(L.queue.length){
    L.segs = buildWordSegments(L.queue[0], L.repeatWord);
  }
}

function currentListenWord(){ return State.listen.queue[State.listen.index]; }

function listenPlay(){
  const L = State.listen;
  if(!L.queue.length) return;
  L.playing = true;
  render();
  listenStepLoop();
}
function listenPause(){
  LISTEN_TOKEN++;
  window.speechSynthesis.cancel();
  State.listen.playing = false;
  render();
}
function listenStop(){
  LISTEN_TOKEN++;
  window.speechSynthesis.cancel();
  State.listen.started = false;
  State.listen.playing = false;
  render();
}
function listenSkip(dir){
  LISTEN_TOKEN++;
  window.speechSynthesis.cancel();
  const L = State.listen;
  markRecent(L);
  L.index = (L.index + dir + L.queue.length) % L.queue.length;
  L.segIndex = 0;
  L.segs = buildWordSegments(L.queue[L.index], L.repeatWord);
  if(L.playing){ render(); listenStepLoop(); } else { render(); }
}
function markRecent(L){
  const w = currentListenWord();
  if(w && !L.recentIds.includes(w.id)) L.recentIds.push(w.id);
}

function listenStepLoop(){
  const myToken = LISTEN_TOKEN;
  const L = State.listen;
  const seg = L.segs[L.segIndex];
  if(!seg){ // finished this word — advance
    markRecent(L);
    L.sinceQuiz++;
    render();
    const numericRound = typeof L.roundMode === 'number';
    if(numericRound && L.sinceQuiz >= L.roundMode){
      L.sinceQuiz = 0;
      openListenQuiz();
      return;
    }
    setTimeout(()=>{
      if(myToken !== LISTEN_TOKEN) return;
      L.index++;
      if(L.index >= L.queue.length){
        if(L.roundMode==='loop'){ L.index = 0; L.recentIds = []; }
        else { listenStop(); return; }
      }
      L.segIndex = 0;
      L.segs = buildWordSegments(L.queue[L.index], L.repeatWord);
      render();
      listenStepLoop();
    }, 900);
    return;
  }
  render();
  const advance = ()=>{
    if(myToken !== LISTEN_TOKEN) return;
    L.segIndex++;
    listenStepLoop();
  };
  if(seg.type==='syllables'){
    speakSyllableSequence(seg.word, myToken, advance);
  } else {
    const container = document.getElementById('listenSegText');
    speakBound(seg.text, State.settings.rate || 0.85, container, advance);
  }
}
function speakSyllableSequence(word, myToken, onDone){
  let i = 0;
  function next(){
    if(myToken !== LISTEN_TOKEN) return;
    const chips = document.querySelectorAll('#listenSyllRow .syll');
    chips.forEach(c=>c.classList.remove('lit'));
    if(i >= word.syllables.length){ onDone(); return; }
    if(chips[i]) chips[i].classList.add('lit');
    const u = new SpeechSynthesisUtterance(word.syllables[i]);
    u.rate = 0.7; u.lang='en-US';
    u.onend = ()=>{ if(myToken!==LISTEN_TOKEN) return; i++; next(); };
    u.onerror = ()=>{ if(myToken!==LISTEN_TOKEN) return; i++; next(); };
    window.speechSynthesis.speak(u);
  }
  next();
}

function openListenQuiz(){
  const L = State.listen;
  LISTEN_TOKEN++;
  window.speechSynthesis.cancel();
  const ids = L.recentIds.length ? L.recentIds.slice(-8) : [currentListenWord().id];
  L.quiz = { queue: shuffle(ids), index:0, score:0, answered:false };
  L.recentIds = [];
  L.playing = false;
  render();
}
function closeListenQuizAndResume(){
  State.listen.quiz = null;
  listenPlay();
}

function toggleDifficult(id){
  const i = State.difficultWords.indexOf(id);
  if(i>=0) State.difficultWords.splice(i,1); else State.difficultWords.push(id);
  sSet('difficultWords', State.difficultWords);
}

function renderListen(){
  const L = State.listen;
  if(!L.started) return renderListenSetup();
  if(L.quiz) return renderListenQuiz();
  return renderListenPlayer();
}

function renderListenSetup(){
  const L = State.listen;
  const sources = [
    {k:'due', label:`Due words (${dueWords().length})`},
    {k:'all', label:`All words (${State.words.length})`},
    ...(State.difficultWords.length ? [{k:'difficult', label:`Difficult words (${State.difficultWords.length})`}] : []),
    ...Object.keys(CATEGORY_META).map(k=>({k, label:CATEGORY_META[k].label})),
    ...(State.words.some(w=>w.category==='custom') ? [{k:'custom', label:'Your words'}] : []),
  ];
  const rounds = [{k:'loop',label:'Loop continuously'},{k:5,label:'Quiz every 5'},{k:8,label:'Quiz every 8'},{k:10,label:'Quiz every 10'}];
  return `
  <div class="pagehead"><h2>Listen Mode</h2></div>
  <p class="sub">Hands-free audio: word, meaning, example and a conversation, read aloud in sequence.</p>
  <div class="setup-row"><label>What to listen to</label>
    <div class="chip-row">${sources.map(s=>`<div class="chip ${L.source===s.k?'on':''}" data-lset="source" data-val="${s.k}">${s.label}</div>`).join('')}</div>
  </div>
  <div class="setup-row"><label>Round</label>
    <div class="chip-row">${rounds.map(r=>`<div class="chip ${L.roundMode===r.k?'on':''}" data-lset="round" data-val="${r.k}">${r.label}</div>`).join('')}</div>
    <div class="hint">"Quiz every N" auto-pauses for a quick retention check, then keeps going. You can also tap Quiz any time.</div>
  </div>
  <div class="setup-row"><label>Repeat each word</label>
    <div class="repeat-chip-row">${[1,2,3].map(n=>`<div class="chip ${L.repeatWord===n?'on':''}" data-lset="repeat" data-val="${n}">${n}×</div>`).join('')}</div>
  </div>
  <button class="big-btn" id="startListenBtn">${ic('play')} Start listening</button>`;
}

function renderListenPlayer(){
  const L = State.listen;
  if(!L.queue.length){
    return `<div class="empty"><div>${ic('headphones')}</div><h3>Nothing to listen to</h3><p>That source has no words right now.</p>
    <button class="big-btn" style="margin-top:20px;" id="listenBackBtn">Back to setup</button></div>`;
  }
  const w = currentListenWord();
  const seg = L.segs[L.segIndex];
  const isFlagged = State.difficultWords.includes(w.id);
  const roundLabel = L.roundMode==='loop' ? `Word ${L.index+1} of ${L.queue.length} · looping` : `Word ${L.index+1} of ${L.queue.length} · quiz in ${L.roundMode - L.sinceQuiz}`;
  const showSegText = seg && seg.type==='text' && seg.label!=='Word';
  const segText = showSegText ? seg.text : w.definition;
  return `<div class="study-wrap">
    <div class="round-progress">${roundLabel}</div>
    <div class="listen-word-wrap">
      <button class="flag-btn ${isFlagged?'on':''}" id="flagBtn" aria-label="Save as difficult">${ic('heart')}</button>
      <div class="listen-card">
        <div class="now-playing"><span class="dot"></span>${!L.playing ? 'Paused' : (seg ? seg.label : 'Next word…')}</div>
        <div class="badge-row" style="justify-content:center;">
          <span class="badge reg">${w.register}</span>
          <span class="badge cat">${CATEGORY_META[w.category]?CATEGORY_META[w.category].label:'Your word'}</span>
        </div>
        <div class="syll-row" id="listenSyllRow">
          ${w.syllables.map((s,i)=>`<span class="syll ${i===w.stress?'stress':''}">${escapeHtml(s)}</span>`).join('')}
        </div>
        <div class="wblock" style="border-top:none; margin-top:10px;">
          <p id="listenSegText" style="font-size:calc(var(--fs-base) * 0.97);">${wordSpansHtml(segText)}</p>
        </div>
        <div class="listen-controls">
          <button class="ctrl-btn" id="skipBackBtn">${ic('skipBack')}</button>
          <button class="ctrl-btn main" id="playPauseBtn">${ic(L.playing?'pause':'play')}</button>
          <button class="ctrl-btn" id="skipFwdBtn">${ic('skipFwd')}</button>
          <button class="ctrl-btn stop" id="stopListenBtn">${ic('stop')}</button>
        </div>
        <button class="quiz-now-btn" id="quizNowBtn">${ic('test')} Quiz me now</button>
      </div>
    </div>
  </div>`;
}

function renderListenQuiz(){
  const L = State.listen;
  const q = L.quiz;
  if(q.index >= q.queue.length){
    const pct = Math.round((q.score/q.queue.length)*100);
    return `<div class="empty">
      <div class="score-ring"><div class="n">${pct}%</div></div>
      <h3>Quick check done</h3><p>${q.score} of ${q.queue.length} correct</p>
      <button class="big-btn" style="margin-top:20px;" id="resumeListenBtn">${ic('play')} Resume listening</button>
    </div>`;
  }
  const w = State.words.find(x=>x.id===q.queue[q.index]);
  const options = shuffle([w.definition, ...sample(State.words,3,w.id).map(x=>x.definition)]);
  return `
  <div class="test-q">Retention check — ${q.index+1} of ${q.queue.length}</div>
  <div class="test-prompt">${escapeHtml(w.word)}</div>
  <div class="test-sub">Which meaning is correct?
    <span class="mini-spk" data-speak="${escapeAttr(w.word)}" style="display:inline-flex;vertical-align:middle;margin-left:6px;">${ic('speakerSm')}</span>
  </div>
  <div class="opt-grid" id="optGrid">
    ${options.map(o=>`<button class="opt" data-answer="${escapeAttr(o)}" data-correct="${escapeAttr(w.definition)}">${escapeHtml(o)}</button>`).join('')}
  </div>
  <div class="test-footer"><button class="big-btn" id="nextListenQ" disabled>Next</button></div>`;
}

// ---------------- TEST ----------------
function startTest(type){
  const pool = State.words.filter(w=>w.definition);
  State.testType = type || 'meaning';
  State.testQueue = shuffle(pool).slice(0, Math.min(10, pool.length));
  State.testIndex = 0; State.testScore = 0; State.testAnswered=false;
  State.spellAttempt = ''; State.spellCorrect = false;
}
function shuffle(arr){ const a=arr.slice(); for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]];} return a; }
function sample(arr,n,excludeId){ return shuffle(arr.filter(w=>w.id!==excludeId)).slice(0,n); }

function renderTest(){
  if(!State.testQueue.length){
    return `
    <div class="pagehead"><h2>Take a Test</h2></div>
    <p class="sub">Pick a test type. Every question is speakable — tap the speaker to hear it read aloud.</p>
    <div class="action-row">
      <button class="action" data-testtype="meaning" style="--c:#7C3AED"><div class="a-ic">${ic('book')}</div><div class="a-txt"><b>Meaning match</b><span>See the word, pick the right meaning</span></div><div class="a-chev">${ic('chevR')}</div></button>
      <button class="action" data-testtype="word" style="--c:#0891B2"><div class="a-ic">${ic('layers')}</div><div class="a-txt"><b>Word match</b><span>See the meaning, pick the right word</span></div><div class="a-chev">${ic('chevR')}</div></button>
      <button class="action" data-testtype="sentence" style="--c:#EA580C"><div class="a-ic">${ic('edit')}</div><div class="a-txt"><b>Sentence fill</b><span>Choose the word that completes the sentence</span></div><div class="a-chev">${ic('chevR')}</div></button>
      <button class="action" data-testtype="spelling" style="--c:#DC2626"><div class="a-ic">${ic('star')}</div><div class="a-txt"><b>Typed recall</b><span>Read the meaning, type the word yourself</span></div><div class="a-chev">${ic('chevR')}</div></button>
    </div>`;
  }
  if(State.testIndex >= State.testQueue.length){
    const pct = Math.round((State.testScore/State.testQueue.length)*100);
    return `<div class="empty">
      <div class="score-ring"><div class="n">${pct}%</div></div>
      <h3>Test complete</h3><p>${State.testScore} of ${State.testQueue.length} correct</p>
      <button class="big-btn" style="margin-top:20px;" id="testAgain">Take another test</button>
    </div>`;
  }
  const w = State.testQueue[State.testIndex];
  const pct = Math.round((State.testIndex/State.testQueue.length)*100);

  if(State.testType==='spelling'){
    return `<div class="progress-bar"><i style="width:${pct}%"></i></div>
    <div class="test-q">Question ${State.testIndex+1} of ${State.testQueue.length}</div>
    <div class="test-prompt">${escapeHtml(w.definition)}</div>
    <div class="test-sub">Type the word that matches this meaning.
      <span class="mini-spk" data-speak="${escapeAttr(w.example)}" style="display:inline-flex;vertical-align:middle;margin-left:6px;">${ic('speakerSm')}</span>
    </div>
    <div class="field"><input type="text" id="spellInput" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" placeholder="Type the word" ${State.testAnswered?'disabled':''} value="${escapeAttr(State.spellAttempt||'')}"></div>
    ${State.testAnswered? `<div class="note-box" style="background:${State.spellCorrect?'var(--good-soft)':'var(--warn-soft)'};color:${State.spellCorrect?'var(--good)':'var(--warn)'}">${ic(State.spellCorrect?'check':'x')}<span>${State.spellCorrect?'Correct!':'The word is: '+escapeHtml(w.word)}</span></div>` : ''}
    <div class="test-footer">
      ${State.testAnswered? `<button class="big-btn" id="nextQ">Next</button>` : `<button class="big-btn" id="submitSpellBtn">Check</button>`}
    </div>`;
  }

  let prompt, options, correctText;
  if(State.testType==='meaning'){
    prompt = w.word;
    correctText = w.definition;
    options = shuffle([w.definition, ...sample(State.words,3,w.id).map(x=>x.definition)]);
  } else if(State.testType==='word'){
    prompt = w.definition;
    correctText = w.word;
    options = shuffle([w.word, ...sample(State.words,3,w.id).map(x=>x.word)]);
  } else {
    const blanked = w.example.replace(new RegExp(w.word + '\\w*', 'i'), '<span class="blank">____</span>');
    prompt = blanked;
    correctText = w.word;
    options = shuffle([w.word, ...sample(State.words,3,w.id).map(x=>x.word)]);
  }

  return `<div class="progress-bar"><i style="width:${pct}%"></i></div>
  <div class="test-q">Question ${State.testIndex+1} of ${State.testQueue.length}</div>
  <div class="test-prompt">${State.testType==='sentence'?prompt:escapeHtml(prompt)}</div>
  <div class="test-sub">
    ${State.testType==='meaning'?'Which meaning is correct?':State.testType==='word'?'Which word matches this meaning?':'Pick the word that fits the blank.'}
    <span class="mini-spk" data-speak="${escapeAttr(State.testType==='sentence'?w.example:prompt)}" style="display:inline-flex;vertical-align:middle;margin-left:6px;">${ic('speakerSm')}</span>
  </div>
  <div class="opt-grid" id="optGrid">
    ${options.map(o=>`<button class="opt" data-answer="${escapeAttr(o)}" data-correct="${escapeAttr(correctText)}">${escapeHtml(o)}</button>`).join('')}
  </div>
  <div class="test-footer"><button class="big-btn" id="nextQ" disabled>Next</button></div>`;
}

// ---------------- ADD WORD ----------------
function renderAdd(){
  const e = State.editingWord;
  return `
  <div class="pagehead"><h2>${e?'Edit word':'Add a word'}</h2></div>
  <p class="sub">Fill in as much as you like — meaning and one example are enough to start. Syllables help pronunciation practice.</p>
  <div class="card">
    <div class="field"><label>Word</label><input type="text" id="f_word" value="${e?escapeAttr(e.word):''}" placeholder="e.g. resilient"></div>
    <div class="field"><label>Syllables (separate with a dash)</label><input type="text" id="f_syll" value="${e?e.syllables.join('-'):''}" placeholder="e.g. re-sil-ient"></div>
    <div class="field-2">
      <div class="field"><label>Part of speech</label><input type="text" id="f_pos" value="${e?escapeAttr(e.pos):''}" placeholder="e.g. adjective"></div>
      <div class="field"><label>Register</label>
        <select id="f_reg">
          ${['casual','formal','academic','literary'].map(r=>`<option value="${r}" ${e&&e.register===r?'selected':''}>${r[0].toUpperCase()+r.slice(1)}</option>`).join('')}
        </select>
      </div>
    </div>
    <div class="field"><label>Meaning (plain, one sentence)</label><textarea id="f_def">${e?escapeHtml(e.definition):''}</textarea></div>
    <div class="field"><label>Example sentence</label><textarea id="f_ex">${e?escapeHtml(e.example):''}</textarea></div>
    <div class="field"><label>Conversation — line 1</label><input type="text" id="f_c1" value="${e?escapeAttr(e.conv[0]):''}" placeholder="e.g. Are you coming tonight?"></div>
    <div class="field"><label>Conversation — line 2 (uses the word)</label><input type="text" id="f_c2" value="${e?escapeAttr(e.conv[1]):''}" placeholder="e.g. I'll be there momentarily."></div>
    <div class="field"><label>Image URL (optional)</label><input type="url" id="f_img" value="${e&&State.images[e.id]?escapeAttr(State.images[e.id]):''}" placeholder="Paste a link to an image"></div>
    <div class="hint">Tip: dual coding — pairing a real image with a word helps it stick. Add one now or later from the word's page.</div>
    <button class="big-btn" style="margin-top:8px;" id="saveWordBtn">${e?'Save changes':'Add word'}</button>
  </div>`;
}

async function saveWordFromForm(){
  const word = document.getElementById('f_word').value.trim();
  if(!word){ toast('Please enter a word'); return; }
  const syllInput = document.getElementById('f_syll').value.trim();
  const syllables = syllInput ? syllInput.split('-').map(s=>s.trim()).filter(Boolean) : [word];
  const pos = document.getElementById('f_pos').value.trim() || 'word';
  const reg = document.getElementById('f_reg').value;
  const def = document.getElementById('f_def').value.trim() || 'No definition added yet.';
  const ex = document.getElementById('f_ex').value.trim() || word;
  const c1 = document.getElementById('f_c1').value.trim() || '...';
  const c2 = document.getElementById('f_c2').value.trim() || word;
  const img = document.getElementById('f_img').value.trim();

  const e = State.editingWord;
  const id = e ? e.id : 'custom_'+Date.now();
  const entry = {id, word, syllables, stress:0, pos, definition:def, example:ex, conv:[c1,c2], register:reg, category:e?e.category:'custom', note: e?e.note:undefined};

  const custom = await sGet('customWords', []);
  const idx = custom.findIndex(w=>w.id===id);
  if(idx>=0) custom[idx]=entry; else custom.push(entry);
  await sSet('customWords', custom);

  if(img){ State.images[id]=img; await sSet('images', State.images); }

  State.words = CORE_WORDS.concat(custom);
  State.editingWord = null;
  toast(e?'Word updated':'Word added');
  State.view='list'; State.listFilter='all';
  render();
}

// ---------------- SETTINGS ----------------
function renderSettings(){
  const s = State.settings;
  const themes = [
    {k:'cream', c:'#FAF6F0', label:'Cream'},
    {k:'bluegrey', c:'#EDF1F5', label:'Blue-grey'},
    {k:'turquoise', c:'#E9F5F3', label:'Turquoise'},
    {k:'white', c:'#FFFFFF', label:'White'},
    {k:'dark', c:'#0A1628', label:'Dark'},
  ];
  return `
  <div class="pagehead"><h2>Settings</h2></div>
  <div class="section-title">Background</div>
  <div class="card">
    <div class="swatch-row">
      ${themes.map(t=>`<button class="swatch ${s.theme===t.k?'on':''}" data-theme="${t.k}" style="background:${t.c}" aria-label="${t.label}"></button>`).join('')}
    </div>
    <div class="hint">No single color works for everyone — try a few and see what feels easiest to read.</div>
  </div>
  <div class="section-title">Text size</div>
  <div class="card">
    <div class="size-row">
      ${['s','m','l','xl'].map(sz=>`<button class="size-btn ${s.size===sz?'on':''}" data-size="${sz}">${sz.toUpperCase()}</button>`).join('')}
    </div>
  </div>
  <div class="section-title">Letter spacing</div>
  <div class="card">
    <div class="toggle-row"><span>Extra wide spacing</span>
      <div class="toggle ${s.spacing==='wide'?'on':''}" id="spacingToggle"><i></i></div>
    </div>
  </div>
  <div class="section-title">Speech rate</div>
  <div class="card">
    <div class="slider-row">
      <span>Slow</span>
      <input type="range" min="0.5" max="1.2" step="0.05" value="${s.rate}" id="rateSlider">
      <span>Fast</span>
    </div>
    <button class="spk-btn ghost" id="testRateBtn" style="margin-top:12px;">${ic('speaker')}Test speech rate</button>
  </div>
  <div class="hint" style="text-align:center;margin-top:24px;">Load Words ${APP_VERSION}</div>`;
}

// ================= EVENTS =================
function bindEvents(){
  const hardRefreshBtn = document.getElementById('hardRefreshBtn');
  if(hardRefreshBtn){
    hardRefreshBtn.addEventListener('click', ()=>{
      hardRefreshBtn.classList.add('spinning');
      toast('Refreshing Load Words...');
      hardRefresh();
    });
  }
  document.querySelectorAll('[data-nav]').forEach(el=>{
    el.addEventListener('click', ()=>{
      const v = el.getAttribute('data-nav');
      const cat = el.getAttribute('data-cat');
      if(State.view==='listen' && v!=='listen' && State.listen.playing){
        LISTEN_TOKEN++; window.speechSynthesis.cancel(); State.listen.playing=false;
      }
      if(v==='study'){ startStudy(); }
      if(v==='test'){ State.testQueue=[]; }
      if(v==='add'){ State.editingWord=null; }
      if(v==='list' && cat){ State.listFilter = cat; }
      State.view = v;
      render();
      window.scrollTo(0,0);
    });
  });
  document.querySelectorAll('.wlist-item[data-word]').forEach(el=>{
    el.addEventListener('click', ()=>{
      State.detailId = el.getAttribute('data-word');
      State.view = 'wordDetail';
      render();
      window.scrollTo(0,0);
    });
  });

  const searchInput = document.getElementById('searchInput');
  if(searchInput){
    searchInput.addEventListener('input', e=>{ State.listSearch = e.target.value; render(); searchInput.focus(); searchInput.setSelectionRange(searchInput.value.length,searchInput.value.length); });
  }
  document.querySelectorAll('[data-filter]').forEach(el=>{
    el.addEventListener('click', ()=>{ State.listFilter = el.getAttribute('data-filter'); render(); });
  });

  const playWordBtn = document.getElementById('playWordBtn');
  if(playWordBtn){
    playWordBtn.addEventListener('click', ()=>{
      const w = currentDisplayedWord();
      if(w) speak(w.word);
    });
  }
  const playSyllBtn = document.getElementById('playSyllBtn');
  if(playSyllBtn){
    playSyllBtn.addEventListener('click', ()=>{
      const w = currentDisplayedWord();
      if(w) speakSyllables(w);
    });
  }
  const soundItOutBtn = document.getElementById('soundItOutBtn');
  if(soundItOutBtn){
    soundItOutBtn.addEventListener('click', ()=>{
      const w = currentDisplayedWord();
      if(w) soundItOutClick(w);
    });
  }
  const pairContrastBtn = document.getElementById('pairContrastBtn');
  if(pairContrastBtn){
    pairContrastBtn.addEventListener('click', ()=>{
      const w = currentDisplayedWord();
      if(w) playPairContrast(w);
    });
  }
  document.querySelectorAll('.syn-live').forEach(el=>{
    el.addEventListener('click', ()=>{
      State.detailId = el.getAttribute('data-syn-id');
      State.view = 'wordDetail';
      render();
      window.scrollTo(0,0);
    });
  });
  document.querySelectorAll('.mini-spk').forEach(el=>{
    el.addEventListener('click', ()=>{
      const targetId = el.getAttribute('data-target');
      const container = targetId ? document.getElementById(targetId) : null;
      speakBound(el.getAttribute('data-speak'), null, container);
    });
  });

  const addImgBtn = document.getElementById('addImgBtn');
  if(addImgBtn){
    addImgBtn.addEventListener('click', async ()=>{
      const w = State.words.find(x=>x.id===State.detailId);
      const url = window.prompt('Paste an image URL for "'+w.word+'"', State.images[w.id]||'');
      if(url===null) return;
      if(url.trim()===''){ delete State.images[w.id]; }
      else{ State.images[w.id] = url.trim(); }
      await sSet('images', State.images);
      render();
    });
  }
  const editWordBtn = document.getElementById('editWordBtn');
  if(editWordBtn){
    editWordBtn.addEventListener('click', ()=>{
      State.editingWord = State.words.find(x=>x.id===State.detailId);
      State.view = 'add';
      render();
    });
  }
  const exportImgBtn = document.getElementById('exportImgBtn');
  if(exportImgBtn){
    exportImgBtn.addEventListener('click', ()=>{
      const w = State.words.find(x=>x.id===State.detailId);
      if(w) exportWordCardImage(w);
    });
  }

  const revealBtn = document.getElementById('revealBtn');
  if(revealBtn){ revealBtn.addEventListener('click', ()=>{ State.studyRevealed = true; render(); }); }

  document.querySelectorAll('[data-grade]').forEach(el=>{
    el.addEventListener('click', async ()=>{
      const w = State.studyQueue[State.studyIndex];
      await gradeWord(w.id, parseInt(el.getAttribute('data-grade'),10));
      State.studyIndex++; State.studyRevealed=false;
      State.soundItOut = { active:false, wordId:null, index:0 };
      render();
    });
  });

  document.querySelectorAll('[data-testtype]').forEach(el=>{
    el.addEventListener('click', ()=>{ startTest(el.getAttribute('data-testtype')); render(); });
  });
  const inListenQuiz = State.view==='listen' && State.listen.quiz;
  document.querySelectorAll('.opt').forEach(el=>{
    el.addEventListener('click', ()=>{
      const answeredFlag = inListenQuiz ? State.listen.quiz.answered : State.testAnswered;
      if(answeredFlag) return;
      const chosen = el.getAttribute('data-answer');
      const correct = el.getAttribute('data-correct');
      const isCorrect = chosen===correct;
      document.querySelectorAll('.opt').forEach(o=>{
        if(o.getAttribute('data-answer')===correct) o.classList.add('correct');
        else if(o===el) o.classList.add('wrong');
      });
      if(inListenQuiz){
        State.listen.quiz.answered = true;
        if(isCorrect) State.listen.quiz.score++;
        const w = State.words.find(x=>x.id===State.listen.quiz.queue[State.listen.quiz.index]);
        gradeWord(w.id, isCorrect?2:0);
        const nb = document.getElementById('nextListenQ');
        if(nb) nb.disabled = false;
      } else {
        State.testAnswered = true;
        if(isCorrect) State.testScore++;
        const w = State.testQueue[State.testIndex];
        gradeWord(w.id, isCorrect?2:0);
        const nextBtn = document.getElementById('nextQ');
        if(nextBtn) nextBtn.disabled = false;
      }
    });
  });
  const submitSpellBtn = document.getElementById('submitSpellBtn');
  if(submitSpellBtn){
    submitSpellBtn.addEventListener('click', ()=>{
      const input = document.getElementById('spellInput');
      const val = input ? input.value.trim() : '';
      const w = State.testQueue[State.testIndex];
      const correct = val.toLowerCase()===w.word.toLowerCase();
      State.testAnswered = true; State.spellCorrect = correct; State.spellAttempt = val;
      if(correct) State.testScore++;
      gradeWord(w.id, correct?2:0);
      render();
    });
  }
  const spellInput = document.getElementById('spellInput');
  if(spellInput){
    spellInput.focus();
    spellInput.addEventListener('keydown', (e)=>{
      if(e.key==='Enter'){ const btn = document.getElementById('submitSpellBtn'); if(btn) btn.click(); }
    });
  }
  const nextQ = document.getElementById('nextQ');
  if(nextQ){ nextQ.addEventListener('click', ()=>{ State.testIndex++; State.testAnswered=false; State.spellAttempt=''; State.spellCorrect=false; render(); }); }
  const testAgain = document.getElementById('testAgain');
  if(testAgain){ testAgain.addEventListener('click', ()=>{ State.testQueue=[]; render(); }); }
  const nextListenQ = document.getElementById('nextListenQ');
  if(nextListenQ){ nextListenQ.addEventListener('click', ()=>{ State.listen.quiz.index++; State.listen.quiz.answered=false; render(); }); }
  const resumeListenBtn = document.getElementById('resumeListenBtn');
  if(resumeListenBtn){ resumeListenBtn.addEventListener('click', closeListenQuizAndResume); }

  // ---- Listen mode setup ----
  document.querySelectorAll('[data-lset]').forEach(el=>{
    el.addEventListener('click', ()=>{
      const field = el.getAttribute('data-lset');
      let val = el.getAttribute('data-val');
      const stateKey = {source:'source', round:'roundMode', repeat:'repeatWord'}[field];
      if(field==='repeat') val = parseInt(val,10);
      else if(field==='round' && val!=='loop') val = parseInt(val,10);
      State.listen[stateKey] = val;
      render();
    });
  });
  const startListenBtn = document.getElementById('startListenBtn');
  if(startListenBtn){ startListenBtn.addEventListener('click', ()=>{ startListenSession(); render(); listenPlay(); }); }
  const listenBackBtn = document.getElementById('listenBackBtn');
  if(listenBackBtn){ listenBackBtn.addEventListener('click', ()=>{ State.listen.started=false; render(); }); }
  const flagBtn = document.getElementById('flagBtn');
  if(flagBtn){ flagBtn.addEventListener('click', ()=>{ toggleDifficult(currentListenWord().id); render(); }); }
  const playPauseBtn = document.getElementById('playPauseBtn');
  if(playPauseBtn){ playPauseBtn.addEventListener('click', ()=>{ State.listen.playing ? listenPause() : listenPlay(); }); }
  const skipBackBtn = document.getElementById('skipBackBtn');
  if(skipBackBtn){ skipBackBtn.addEventListener('click', ()=>listenSkip(-1)); }
  const skipFwdBtn = document.getElementById('skipFwdBtn');
  if(skipFwdBtn){ skipFwdBtn.addEventListener('click', ()=>listenSkip(1)); }
  const stopListenBtn = document.getElementById('stopListenBtn');
  if(stopListenBtn){ stopListenBtn.addEventListener('click', listenStop); }
  const quizNowBtn = document.getElementById('quizNowBtn');
  if(quizNowBtn){ quizNowBtn.addEventListener('click', ()=>{ markRecent(State.listen); openListenQuiz(); }); }

  const saveWordBtn = document.getElementById('saveWordBtn');
  if(saveWordBtn){ saveWordBtn.addEventListener('click', saveWordFromForm); }

  document.querySelectorAll('.swatch[data-theme]').forEach(el=>{
    el.addEventListener('click', async ()=>{
      State.settings.theme = el.getAttribute('data-theme');
      applyTheme(); await sSet('settings', State.settings); render();
    });
  });
  document.querySelectorAll('.size-btn[data-size]').forEach(el=>{
    el.addEventListener('click', async ()=>{
      State.settings.size = el.getAttribute('data-size');
      applyTheme(); await sSet('settings', State.settings); render();
    });
  });
  const spacingToggle = document.getElementById('spacingToggle');
  if(spacingToggle){
    spacingToggle.addEventListener('click', async ()=>{
      State.settings.spacing = State.settings.spacing==='wide' ? 'normal' : 'wide';
      applyTheme(); await sSet('settings', State.settings); render();
    });
  }
  const rateSlider = document.getElementById('rateSlider');
  if(rateSlider){
    rateSlider.addEventListener('change', async ()=>{
      State.settings.rate = parseFloat(rateSlider.value);
      await sSet('settings', State.settings);
    });
  }
  const testRateBtn = document.getElementById('testRateBtn');
  if(testRateBtn){ testRateBtn.addEventListener('click', ()=>speak('This is how words will sound.')); }
}

function findWordByExactText(text){
  const t = String(text).toLowerCase().trim();
  return State.words.find(w=>w.word.toLowerCase()===t) || null;
}

function currentDisplayedWord(){
  if(State.view==='study') return State.studyQueue[State.studyIndex];
  if(State.view==='wordDetail') return State.words.find(x=>x.id===State.detailId);
  return null;
}

// ================= INIT =================
(async function init(){
  await loadAll();
  render();
  if('serviceWorker' in navigator){
    window.addEventListener('load', ()=>{
      navigator.serviceWorker.register('./service-worker.js').catch(e=>console.warn('SW registration failed', e));
    });
  }
})();
