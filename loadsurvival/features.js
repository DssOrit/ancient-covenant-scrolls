/* Load Survival features: guides view, lists, tools, family plan, search, about, home extras.
   Loaded before app.js. app.js calls window.LSX(api) and uses the returned views and actions. */
window.LSX = function (A) {
  'use strict';
  var state = A.state, D = A.D, esc = A.esc, btn = A.btn, ico = A.ico, region = A.region, switchView = A.switchView;
  var C = window.LOAD_CORE || { guides: [], lists: [], numbers: [], regionBoxes: {}, sources: [], rule3: [], helpNow: [] };

  /* guides join the lesson list so Learn, search and routing all work */
  C.guides.forEach(function (g) { D.lessons.push(g); });

  /* local data, one key, always guarded */
  var SK = 'loadsurvival:v1', S = {};
  try { S = JSON.parse(localStorage.getItem(SK) || '{}') || {}; } catch (e) { S = {}; }
  S.lists = S.lists || {}; S.plan = S.plan || {};
  function put() { try { localStorage.setItem(SK, JSON.stringify(S)); } catch (e) {} }

  var timers = [];
  function clearTimers() { timers.forEach(function (t) { clearInterval(t); clearTimeout(t); }); timers = []; }

  function li(arr, cls) { return '<ul' + (cls ? ' class="' + cls + '"' : '') + '>' + arr.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>'; }
  function ol(arr) { return '<ol class="stepsol">' + arr.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ol>'; }
  function table(t) {
    if (!t) return '';
    return '<div class="tblwrap"><table class="tbl"><thead><tr>' + t.head.map(function (h) { return '<th>' + esc(h) + '</th>'; }).join('') + '</tr></thead><tbody>' +
      t.rows.map(function (r) { return '<tr>' + r.map(function (c, i) { return (i === 0 ? '<th scope="row">' : '<td>') + esc(c) + (i === 0 ? '</th>' : '</td>'); }).join('') + '</tr>'; }).join('') + '</tbody></table></div>';
  }
  function verify() { return '<span class="verify">Verify before you rely on it</span>'; }

  /* ---------- region boxes ---------- */
  function regionBox(key) {
    var b = C.regionBoxes[key]; if (!b) return '';
    return '<div class="panel regionbox"><h2>' + esc(b.title) + '</h2>' +
      '<ul class="nums">' + b.numbers.map(function (n) { return '<li><span>' + esc(n[0]) + '</span><a href="tel:' + esc(n[2]) + '">' + esc(n[1]) + '</a>' + verify() + '</li>'; }).join('') + '</ul>' +
      li(b.lines) + '<p class="muted">' + esc(b.hazards) + '</p>' +
      (b.blackout ? '<div class="tipbox"><strong>' + esc(b.blackout.title) + '</strong>' + li(b.blackout.items) + '</div>' : '') + '</div>';
  }
  function callScript() {
    var d = window.LOAD_CALL112; if (!d) return '';
    var h = '<section class="call112"><h2>What to say when you call 112</h2><p>' + esc(d.intro) + '</p><div class="notice">' + esc(d.status) + '</div>' + (window.LOAD_SPEAK ? '<p class="speakrow">' + window.LOAD_SPEAK.slowToggle() + ' <span class="muted">Tap Listen to hear the Portuguese. It uses a voice on your device.</span></p>' : '');
    d.groups.forEach(function (g, i) {
      h += '<details class="callgroup"' + (i === 0 ? ' open' : '') + '><summary>' + esc(g.title) + '</summary><ul class="callrows">' + g.rows.map(function (r) {
        return '<li><span class="en">' + esc(r[0]) + '</span><span class="pt" lang="pt">' + esc(r[1]) + '</span>' + (window.LOAD_SPEAK ? window.LOAD_SPEAK.btn((r[2] || r[1]).replace(/\//g, ' '), 'Listen') : '') + '</li>';
      }).join('') + '</ul></details>';
    });
    h += '<div class="tipbox"><strong>Tips</strong>' + li(d.tips) + '</div>';
    h += '<div class="statusbox"><strong>Not confirmed</strong>' + li(d.unconfirmed) + '<p class="muted">Sources: ' + d.sources.map(function (s) { return '<a href="' + esc(s[1]) + '" target="_blank" rel="noopener">' + esc(s[0]) + '</a>'; }).join(', ') + '. Links need internet.</p></div></section>';
    return h;
  }
  function regionBoxes() {
    var r = state.region;
    return '<section><h2>Your region</h2><div class="grid two-up">' + (r === 'pt' ? '' : regionBox('us')) + (r === 'us' ? '' : regionBox('pt')) + '</div></section>' + (r === 'us' ? '' : callScript());
  }

  /* ---------- home extras ---------- */
  function isIOS() { return /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1); }
  function standalone() { return (window.navigator.standalone === true) || (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches); }
  function netText() {
    var on = navigator.onLine !== false, ready = !!(navigator.serviceWorker && navigator.serviceWorker.controller);
    return (on ? 'Online' : 'Offline') + ' · ' + (ready ? 'Offline mode ready' : 'Open once online to enable offline mode');
  }
  function homeExtras() {
    var strip = '<div class="numstrip" role="group" aria-label="Emergency numbers">' + C.numbers.map(function (n) {
      return '<a class="num" href="tel:' + esc(n.tel) + '"><b>' + esc(n.num) + '</b><span>' + esc(n.who) + '</span></a>';
    }).join('') + '</div><p class="micro center">' + verify().replace('<span', '<span') + ' Numbers can change.</p>';
    var help = '<section><h2>I need help now</h2><div class="helpgrid">' + C.helpNow.map(function (h) {
      return '<button class="helpbtn" data-open-lesson="' + esc(h[1]) + '"><span class="symbol">' + ico(h[2]) + '</span><b>' + esc(h[0]) + '</b></button>';
    }).join('') + '</div></section>';
    var r3 = '<section><h2>Rule of 3s</h2>' + table({ head: ['You can survive about', 'Without'], rows: C.rule3.map(function (r) { return [r[1], r[0]]; }) }) + '<p class="muted">Order of priority: air, shelter, water, food.</p></section>';
    var status = '<div class="statusrow"><span class="badge" id="netbadge">' + esc(netText()) + '</span></div>';
    var inst = (isIOS() && !standalone() && !S.hideInstall) ?
      '<div class="tipbox"><strong>Install on your iPad</strong><p>Open this page once online in Safari. Tap Share. Tap Add to Home Screen. Then it opens like an app and works offline.</p>' + btn('Hide this tip', 'hide-install', 'secondary') + '</div>' : '';
    return strip + status + inst + help + r3 + regionBoxes();
  }
  function home() {
    var h = A.home();
    h = h.replace('data-action="checklist"', 'data-action="lists"');
    var i = h.indexOf('<div class="notice">');
    return i < 0 ? h + homeExtras() : h.slice(0, i) + homeExtras() + h.slice(i);
  }
  function updateBadge() { var b = document.getElementById('netbadge'); if (b) b.textContent = netText(); }
  window.addEventListener('online', updateBadge); window.addEventListener('offline', updateBadge);

  /* ---------- status label: Checked / Partly checked / Not confirmed ---------- */
  var SMAP = window.LOAD_STATUS || {};
  function statusOf(l) {
    var m = SMAP[l.id] || {};
    return { status: l.status || m.status || 'general', checkedOn: l.checkedOn || m.checkedOn || '', sources: l.sources || m.sources || (l.source ? [['Source linked in the lesson', l.source]] : []), unconfirmed: l.unconfirmed || m.unconfirmed || [] };
  }
  function statusHtml(l) {
    var s = statusOf(l), name = s.status === 'checked' ? 'Checked' : s.status === 'partly' ? 'Partly checked' : 'Not confirmed';
    var icon = s.status === 'checked' ? 'check' : s.status === 'partly' ? 'alert' : 'search';
    var line = s.status === 'checked' ? 'Figures match a named official source' + (s.checkedOn ? ' on ' + s.checkedOn : '') + '.' :
      s.status === 'partly' ? 'Some figures match a named official source' + (s.checkedOn ? ' on ' + s.checkedOn : '') + '. Items we could not confirm are listed below.' :
      'General guidance. It was not checked against a named official source. Check it before you rely on it.';
    var h = '<div class="status st-' + s.status + '" role="note"><span class="stbadge">' + ico(icon) + ' ' + name + '</span><span class="stline">' + esc(line) + '</span></div>';
    if (s.unconfirmed.length && s.status !== 'general') h += '<div class="unconf"><strong>Not confirmed</strong>' + li(s.unconfirmed) + '</div>';
    else if (s.unconfirmed.length > 1) h += '<div class="unconf"><strong>Not confirmed</strong>' + li(s.unconfirmed.slice(1)) + '</div>';
    if (s.sources.length) h += '<div class="srcs"><strong>Sources</strong><ul>' + s.sources.map(function (x) { return '<li><a href="' + esc(x[1]) + '" target="_blank" rel="noopener noreferrer">' + esc(x[0]) + '</a></li>'; }).join('') + '</ul><p class="muted">Links need internet.</p></div>';
    return h;
  }
  function catOf(l) { return A.catKey ? A.catKey(l.area) : 'essentials'; }

  /* ---------- guide view ---------- */
  /* one picture panel beside each "What to do" step (panels come from window.LOAD_STEP_IMAGES[id]) */
  function panelsFor(l) { var m = window.LOAD_STEP_IMAGES && window.LOAD_STEP_IMAGES[l.id]; return m && m.length ? m : null; }
  function doSteps(l) {
    var steps = l.do || [], P = panelsFor(l);
    if (!P) return ol(steps);
    return '<ol class="stepcards">' + steps.map(function (x, i) {
      var src = P[Math.min(i, P.length - 1)];
      return '<li class="stepcard"><img src="' + esc(src) + '" alt="Step ' + (i + 1) + ' picture" loading="lazy" width="800" height="450"><div class="stepbody"><span class="stepnum">' + (i + 1) + '</span><p>' + esc(x) + '</p></div></li>';
    }).join('') + '</ol>';
  }

  /* ---------- "see the picture guide" links for guides that overlap a guide with pictures ---------- */
  var SEE_ALSO = {
    'ht-warm-cool': ['lim-heat-cold'],
    'ht-store-water': ['lim-water-none', 'lt-permanent-water'],
    'ht-family-plan': ['lim-comms', 'foundation-communication'],
    'ht-kit-quantities': ['es-kit-tiers', 'stockpile-basics'],
    'ht-buy-order': ['es-kit-tiers', 'stockpile-basics'],
    'lt-community': ['lim-stay-safe'],
    'p6-emergency-handwashing': ['lim-sanitation'],
    'p6-sanitation-when-toilets-fail': ['lim-sanitation'],
    'sanitation': ['lim-sanitation'],
    'p6-food-after-a-blackout': ['lim-food-none'],
    'p6-no-flame-emergency-meals': ['lim-food-none'],
    'food': ['lim-food-none'],
    'p6-documents-and-emergency-cash': ['lim-banks-down']
  };
  /* related guides (not picture links) */
  var RELATED = {
    'lt-fishing': ['wf-fishing-gear', 'wf-clean-fish', 'wf-wild-food-rules'],
    'lt2-foraging': ['wf-find-plants', 'wf-shore-shellfish'],
    'hs-fire-pit': ['wf-fire-wet', 'wf-fire-nomatches'],
    'fire-ignition': ['wf-fire-wet', 'wf-fire-nomatches'],
    'fire-ferro': ['wf-fire-nomatches', 'wf-fire-wet'],
    'hs-pemmican': ['wf-smoke-dry-salt'],
    'lt2-preserve': ['wf-smoke-dry-salt'],
    'wf-fire-wet': ['wf-fire-nomatches', 'hs-fire-pit', 'g-hypothermia'],
    'wf-fire-nomatches': ['wf-fire-wet'],
    'wf-clean-fish': ['wf-fishing-gear', 'wf-smoke-dry-salt'],
    'wf-fishing-gear': ['lt-fishing', 'wf-clean-fish'],
    'wf-game-handling': ['wf-trapping', 'wf-smoke-dry-salt', 'wf-field-kitchen'],
    'wf-find-plants': ['wf-plant-method', 'wf-plants-watch', 'lt2-foraging', 'wf-wild-food-rules'],
    'wf-plants-us': ['wf-plant-method', 'wf-plants-watch', 'wf-find-plants'],
    'wf-raft-build': ['wf-raft-river', 'g-hypothermia', 'wf-fire-wet'],
    'wf-plant-method': ['wf-plants-us', 'wf-plants-watch', 'wf-find-plants', 'lt2-foraging'],
    'wf-plants-watch': ['wf-plants-us', 'wf-plant-method', 'wf-find-plants', 'wf-pt-study-poison', 'wf-pt-study-trees'],
    'wf-shelter-build': ['wf-shelter-secure', 'wf-fire-wet', 'g-hypothermia'],
    'wf-shelter-secure': ['wf-shelter-build', 'shelter-tarp', 'shelter-site'],
    'wf-raft-river': ['wf-raft-build', 'wf-fire-wet', 'g-hypothermia', 'g-flood'],
    'wf-field-kitchen': ['wf-clean-fish', 'wf-smoke-dry-salt', 'wf-game-handling'],
    'shelter': ['wf-shelter-build', 'wf-shelter-secure'],
    'shelter-tarp': ['wf-shelter-secure', 'wf-shelter-build'],
    'shelter-site': ['wf-shelter-secure'],
    'shelter-cold': ['wf-shelter-build', 'wf-fire-wet'],
    'g-flood': ['flood-at-home', 'wf-raft-river', 'wf-storm-fire-out', 'car-in-water'],
    'fire-upper-floors': ['sc-fire-safety', 'g-wildfire', 'med-carbon-monoxide', 'hs-car-escape'],
    'sc-fire-safety': ['fire-upper-floors'],
    'flood-at-home': ['g-flood', 'car-in-water', 'g-power-outage', 'med-carbon-monoxide'],
    'robbery': ['break-in', 'security-intrusion', 'lim-city-event'],
    'break-in': ['robbery', 'security-intrusion', 'fire-upper-floors', 'lim-city-event'],
    'stockpile-basics': ['ht-kit-quantities', 'ht-buy-order', 'es-kit-tiers', 'lt-year-pantry', 'lt2-staples', 'hs-food-storage'],
    'lt-year-pantry': ['stockpile-basics'],
    'car-in-water': ['hs-car-escape', 'flood-at-home', 'g-flood', 'g-hurricane', 'med-child-cpr'],
    'hs-car-escape': ['car-in-water', 'g-flood'],
    'wf-pt-study-trees': ['wf-pt-study-greens', 'wf-pt-study-herbs', 'wf-pt-study-poison', 'wf-plant-method'],
    'wf-pt-study-greens': ['wf-pt-study-trees', 'wf-pt-study-herbs', 'wf-pt-study-poison', 'wf-plant-method'],
    'wf-pt-study-herbs': ['wf-pt-study-trees', 'wf-pt-study-greens', 'wf-pt-study-poison', 'wf-plant-method'],
    'wf-pt-study-poison': ['wf-pt-study-greens', 'wf-pt-study-trees', 'wf-plants-watch', 'wf-plant-method'],
    'med-carbon-monoxide': ['g-power-outage', 'g-making-electricity', 'med-poison', 'lim-power-outage'],
    'pt-beach-sun': ['g-heat-illness', 'g-heat-wave', 'wx-sea', 'wf-shore-shellfish'],
    'med-child-cpr': ['g-cpr', 'g-choking', 'g-bleeding', 'g-shock'],
    'g-cpr': ['med-child-cpr', 'g-choking'],
    'g-choking': ['med-child-cpr', 'g-cpr'],
    'g-heat-illness': ['pt-beach-sun', 'g-heat-wave'],
    'g-power-outage': ['med-carbon-monoxide', 'lim-power-outage'],
    'med-poison': ['med-carbon-monoxide'],
    'wf-practice-plan': ['wf-shelter-build', 'wf-plant-method', 'wf-field-kitchen', 'wf-fishing-gear'],
    'wf-pt-words': ['wf-wild-food-rules', 'wf-storm-fire-out'],
    'wf-storm-fire-out': ['wf-shelter-secure', 'wf-fire-wet', 'g-flood']
  };
  function relatedBox(id) {
    var ids = RELATED[id]; if (!ids) return '';
    var links = ids.map(function (x) {
      var g = D.lessons.filter(function (l) { return l.id === x; })[0];
      return g ? '<li><a href="#/lesson/' + encodeURIComponent(x) + '">' + esc(g.title) + '</a></li>' : '';
    }).join('');
    return links ? '<div class="tipbox seealso"><strong>Related guides</strong><ul>' + links + '</ul></div>' : '';
  }
  function seeAlso(id) {
    var ids = SEE_ALSO[id]; if (!ids) return relatedBox(id);
    var links = ids.map(function (x) {
      var g = D.lessons.filter(function (l) { return l.id === x; })[0];
      return g ? '<li><a href="#/lesson/' + encodeURIComponent(x) + '">' + esc(g.title) + '</a></li>' : '';
    }).join('');
    return links ? '<div class="tipbox seealso"><strong>See the guide with pictures</strong><ul>' + links + '</ul></div>' : '';
  }

  function guideView(l) {
    var h = '<div class="guide" data-cat="' + catOf(l) + '"><div class="breadcrumbs">' + btn('← All guides', 'learn') + '</div><span class="pill cat" data-cat="' + catOf(l) + '"><i class="dot"></i>' + esc(l.area) + ' · ' + esc(l.difficulty) + '</span>' +
      '<h1>' + ico(l.icon) + ' ' + esc(l.title) + '</h1><p>' + esc(l.intro) + '</p>' + (window.LOAD_SPEAK && window.LOAD_SPEAK.supported() ? window.LOAD_SPEAK.readBtn() : '') + statusHtml(l) + seeAlso(l.id);
    if (l.note || l.noteText) h += '<div class="notice">' + esc(l.noteText || C.note) + '</div>';
    if (l.image && !panelsFor(l)) h += '<img class="lesson-illustration" src="' + esc(l.image) + '" alt="Illustration for ' + esc(l.title) + '" loading="lazy">';
    h += '<section class="gblock first"><h2>Do this first</h2>' + ol(l.first) + '</section>';
    h += '<section class="gblock"><h2>What to do</h2>' + doSteps(l) + '</section>';
    if (l.table) h += table(l.table);
    (l.sections || []).forEach(function (s) { h += '<section class="gblock"><h2>' + esc(s.h) + '</h2>' + li(s.items) + '</section>'; });
    h += '<div class="dangerbox"><strong>Warnings</strong>' + li(l.warn) + '</div>';
    h += '<div class="tipbox"><strong>Tips</strong>' + li(l.tip) + '</div>';
    h += '<section class="gblock"><h2>After</h2>' + li(l.after) + '</section>';
    h += '<p class="muted">General information only. In immediate danger call ' + esc(region().emergency) + '. ' + verify() + '</p>';
    return h + '</div>';
  }
  function lessonView() {
    var l = D.lessons.filter(function (x) { return x.id === state.opened; })[0];
    if (l && l.first) return guideView(l);
    var b = A.lessonBase(); if (!l) return b;
    var i = b.indexOf('<div class="dangerbox">'); return i < 0 ? b : b.slice(0, i) + statusHtml(l) + seeAlso(l.id) + b.slice(i);
  }

  /* ---------- lists ---------- */
  function listDone(id) { var s = S.lists[id] || {}, n = 0; Object.keys(s).forEach(function (k) { if (s[k]) n++; }); return n; }
  function listsView() {
    return '<h1>Checklists</h1><p class="muted">Tick items as you get them. Saved on this device.</p><div class="grid">' + C.lists.map(function (L) {
      var n = listDone(L.id), p = Math.round(n * 100 / L.items.length);
      return '<button class="card" data-action="open-list" data-list="' + esc(L.id) + '"><span class="symbol">' + ico('check') + '</span><b>' + esc(L.title) + '</b><small>' + n + ' of ' + L.items.length + ' done</small><span class="progress"><i style="width:' + p + '%"></i></span></button>';
    }).join('') + '</div>';
  }
  function listView() {
    var L = C.lists.filter(function (x) { return x.id === state.opened; })[0]; if (!L) return listsView();
    var s = S.lists[L.id] || {}, n = listDone(L.id), p = Math.round(n * 100 / L.items.length);
    return '<div class="breadcrumbs">' + btn('← All checklists', 'lists') + '</div><h1>' + esc(L.title) + '</h1>' +
      '<div class="panel"><div class="stage"><b id="lprog">' + n + ' of ' + L.items.length + ' done</b><span class="muted">Saved on this device</span></div><div class="progress big"><i id="lbar" style="width:' + p + '%"></i></div>' +
      L.items.map(function (it, i) { return '<label class="checkrow"><input type="checkbox" data-lcheck="' + esc(L.id) + '|' + i + '" ' + (s[i] ? 'checked' : '') + '><span>' + esc(it) + '</span></label>'; }).join('') +
      '<div class="actions">' + btn('Reset this list', 'list-reset', 'secondary') + '</div></div>';
  }

  /* ---------- tools ---------- */
  var TOOLS = [
    ['water', 'drop', 'Water and food', 'People and days to gallons, liters and calories'],
    ['bleach', 'flask', 'Bleach dose', 'Drops of household bleach for clear water'],
    ['fridge', 'fridge', 'Fridge and freezer timer', 'Deadlines after the power goes out'],
    ['watts', 'battery', 'Watt-hours', 'What a power station can run'],
    ['units', 'convert', 'Unit converter', 'Gallons, liters, degrees, feet, meters'],
    ['flashlight', 'flash', 'Screen flashlight', 'Full white screen. Tap to close'],
    ['sos', 'alert', 'SOS flash', 'Screen blinks the SOS signal'],
    ['cpr', 'heart', 'CPR rhythm', 'Steady beat for chest compressions'],
    ['stock', 'can', 'Stockpile planner', 'Food, water and supplies for 3 days to 10 years']
  ];
  function toolsView() {
    return '<h1>Tools</h1><p class="muted">Simple calculators and signals. Everything works offline.</p><div class="grid">' + TOOLS.map(function (t) {
      return '<button class="card" data-action="open-tool" data-tool="' + t[0] + '"><span class="symbol">' + ico(t[1]) + '</span><b>' + esc(t[2]) + '</b><small>' + esc(t[3]) + '</small></button>';
    }).join('') + '</div>';
  }
  function num(id, def, step, min, max) { return '<input id="' + id + '" type="number" inputmode="decimal" value="' + def + '" step="' + (step || 'any') + '" min="' + (min === undefined ? 0 : min) + (max ? '" max="' + max : '') + '">'; }
  function toolFrame(t, inner) {
    var T = TOOLS.filter(function (x) { return x[0] === t; })[0];
    return '<div class="breadcrumbs">' + btn('← All tools', 'tools') + '</div><h1>' + ico(T[1]) + ' ' + esc(T[2]) + '</h1>' + inner;
  }
  function toolView() {
    clearTimers();
    var t = state.opened;
    if (t === 'water') return toolFrame(t, '<div class="panel"><label for="w-people">People</label>' + num('w-people', 4, 1, 1, 100) + '<label for="w-days">Days</label>' + num('w-days', 3, 1, 1, 365) + '<div id="w-out" class="kpis"></div><p class="muted">Water: 1 gal (3.8 L) per person per day. 3 days minimum, 2 weeks ideal. Food: about 2,000 kcal per person per day. Raise water for heat, illness, pregnancy and pets.</p></div>');
    if (t === 'bleach') return toolFrame(t, '<div class="panel"><label for="b-vol">Amount of clear water</label>' + num('b-vol', 1, 'any', 0.1) + '<label for="b-unit">Unit</label><select id="b-unit"><option value="gal">US gallons</option><option value="l">Liters</option></select><div id="b-out" class="kpis"></div></div><div class="dangerbox"><strong>Read first</strong>' + li(['Three steps: strain through cloth, filter, then disinfect.', 'Use only plain, unscented household bleach that is 5 to 6%. If yours is a different strength, follow its label or use water purification tablets.', 'Stir. Wait 30 minutes. The water should have a slight chlorine smell. If not, repeat once and wait 15 more minutes.', 'Cloudy or cold water: settle or filter it first, then use double the dose (16 drops per gallon). Source: CDC. A dose for 1% bleach is not included because we found no official source.', 'Bleach does not make fuel, chemical or flood-contaminated water safe.', 'Or boil water for 1 minute (3 minutes above 6,500 ft / 2,000 m).']) + '</div>');
    if (t === 'fridge') return toolFrame(t, '<div class="panel" id="f-panel"></div><div class="notice">Discard perishables above 40 F (4 C) for more than 2 hours. When in doubt, throw it out. Keep doors closed.</div>');
    if (t === 'watts') {
      var devs = [['Phone charging', 10, 2], ['LED lamp', 8, 5], ['Radio', 5, 4], ['Laptop', 50, 3], ['Wi-Fi router', 12, 8], ['Mini fridge', 60, 8], ['Fan', 40, 6], ['CPAP', 40, 8], ['Television', 80, 2]];
      return toolFrame(t, '<div class="panel"><label for="p-cap">Battery or power station size (Wh)</label>' + num('p-cap', 500, 'any', 1) + '<h2 style="margin-top:18px">What do you want to run?</h2><p class="muted">Watts are typical. Check the label on your device.</p>' +
        devs.map(function (d, i) { return '<div class="devrow"><label class="checkrow"><input type="checkbox" data-dev="' + i + '" data-w="' + d[1] + '"><span>' + esc(d[0]) + ' (' + d[1] + ' W)</span></label><input aria-label="Hours per day for ' + esc(d[0]) + '" type="number" inputmode="decimal" data-hrs="' + i + '" value="' + d[2] + '" min="0" max="24" step="0.5"></div>'; }).join('') +
        '<div id="p-out" class="kpis"></div><p class="muted">Energy (Wh) = watts x hours. Runtime is estimated with 85% efficiency because some energy is lost as heat.</p></div>');
    }
    if (t === 'units') return toolFrame(t, '<div class="panel"><label for="u-gal">US gallons</label>' + num('u-gal', 1, 'any') + '<label for="u-l">Liters</label>' + num('u-l', 3.785, 'any') +
      '<label for="u-f">Degrees Fahrenheit</label>' + num('u-f', 40, 'any', -100) + '<label for="u-c">Degrees Celsius</label>' + num('u-c', 4.4, 'any', -100) +
      '<label for="u-ft">Feet</label>' + num('u-ft', 6500, 'any') + '<label for="u-m">Meters</label>' + num('u-m', 1981, 'any') + '<label for="u-in">Inches</label>' + num('u-in', 6, 'any') + '<label for="u-cm">Centimeters</label>' + num('u-cm', 15.2, 'any') + '</div>');
    if (t === 'flashlight') return toolFrame(t, '<div class="panel"><p>Turns the whole screen bright white. Tap anywhere to close. Turn brightness up first.</p><div class="actions">' + btn('Turn on screen flashlight', 'flash-on', 'button') + '</div></div>');
    if (t === 'sos') return toolFrame(t, '<div class="panel"><p>The screen blinks three short, three long, three short flashes. Tap anywhere to stop.</p><div class="dangerbox"><strong>Warning</strong><p>Flashing light can trigger seizures in some people. Do not use if you are sensitive to flashing light.</p></div><div class="actions">' + btn('Start SOS flash', 'sos-on', 'danger') + '</div></div>');
    if (t === 'stock') {
      var SK = window.LOAD_STOCK; if (!SK) return toolFrame(t, '<div class="panel"><p>The planner could not load.</p></div>');
      var c0 = state.region === 'pt' ? 'pt' : 'us';
      return toolFrame(t, '<div class="panel stkpanel"><p class="muted">Pick your country, how many people and how long. You get a full shopping list with quantities. It works offline.</p>' +
        '<label for="stk-c">Country</label><select id="stk-c"><option value="us"' + (c0 === 'us' ? ' selected' : '') + '>United States</option><option value="pt"' + (c0 === 'pt' ? ' selected' : '') + '>Portugal</option></select>' +
        '<label for="stk-n">People in your household</label><select id="stk-n">' + SK.sizes.map(function (n) { return '<option value="' + n + '"' + (n === 4 ? ' selected' : '') + '>' + n + ' people</option>'; }).join('') + '<option value="x">Other number</option></select>' +
        '<div id="stk-nnbox" hidden><label for="stk-nn">Number of people (1 to 50)</label>' + num('stk-nn', 12, 1, 1, 50) + '</div>' +
        '<label for="stk-p">How long</label><select id="stk-p">' + SK.periods.map(function (p) { return '<option value="' + p.days + '"' + (p.id === '1m' ? ' selected' : '') + '>' + p.label + '</option>'; }).join('') + '</select>' +
        '<label for="stk-k">Children under 10 (they eat about 60 percent)</label>' + num('stk-k', 0, 1, 0, 50) +
        '<label class="checkrow"><input type="checkbox" id="stk-lt" checked><span>For 1 year or more, I will use long-term packing (sealed cans, buckets with oxygen absorbers)</span></label>' +
        '<div class="actions">' + btn('Copy the list', 'stk-copy', 'button') + btn('Print', 'stk-print', 'secondary') + '</div><p id="stk-msg" class="muted" role="status"></p></div>' +
        '<div id="stk-out"></div>');
    }
    if (t === 'cpr') return toolFrame(t, '<div class="panel cprpanel"><div class="dangerbox"><strong>Call 112 (Portugal) or 911 (US) first.</strong><p>This tool only keeps the beat. It does not replace a course or the operator. Push hard in the centre of the chest, and let it come fully back up.</p></div>' +
      '<div id="cprpulse" class="cprpulse" aria-hidden="true"><span id="cprcount">0</span></div><p id="cprmsg" class="cprmsg" role="status" aria-live="polite">Ready</p>' +
      '<label for="cprbpm">Beats a minute</label><select id="cprbpm"><option value="100">100</option><option value="110" selected>110</option><option value="120">120</option></select>' +
      '<label for="cprcycle">Pause for breaths</label><select id="cprcycle"><option value="30">After 30 pushes</option><option value="15">After 15 pushes</option><option value="0">Never (keep pushing)</option></select>' +
      '<label class="checkrow"><input type="checkbox" id="cprsound" checked><span>Sound (turn volume up)</span></label>' +
      '<div class="actions">' + btn('Start', 'cpr-start', 'danger') + btn('Stop', 'cpr-stop', 'secondary') + '</div>' +
      '<p class="muted">The 100 to 120 a minute rate comes from Red Cross and ERC pages seen in search results. See the child and infant CPR guide for hands, depth and the breaths. Adult hands-only CPR is in the CPR guide.</p></div>');
    return toolsView();
  }
  function setOut(id, html) { var e = document.getElementById(id); if (e) e.innerHTML = html; }
  function kpi(l, v) { return '<div class="kpi">' + esc(l) + '<strong>' + esc(v) + '</strong></div>'; }
  function nf(x, d) { return Number(x).toLocaleString(undefined, { maximumFractionDigits: d === undefined ? 1 : d }); }
  function val(id) { var e = document.getElementById(id); return e ? Number(e.value) : NaN; }
  function calcWater() {
    var p = val('w-people'), d = val('w-days');
    if (!(p > 0) || !(d > 0)) return setOut('w-out', '<p>Enter people and days.</p>');
    var g = p * d;
    setOut('w-out', kpi('Water', nf(g) + ' gal / ' + nf(g * 3.785) + ' L') + kpi('Food', nf(p * d * 2000, 0) + ' kcal') + kpi('Per day', nf(p) + ' gal / ' + nf(p * 3.785) + ' L'));
  }
  function calcBleach() {
    var v = val('b-vol'), u = (document.getElementById('b-unit') || {}).value;
    if (!(v > 0)) return setOut('b-out', '<p>Enter an amount of water.</p>');
    var gal = u === 'l' ? v / 3.785 : v, drops = Math.max(1, Math.round(gal * 8));
    setOut('b-out', kpi('Bleach drops (5 to 6%)', drops + ' drops') + kpi('About', nf(gal * 0.125, 2) + ' tsp') + kpi('Wait', '30 minutes'));
  }
  function calcWatts() {
    var cap = val('p-cap'), total = 0, watts = 0, n = 0;
    Array.prototype.forEach.call(document.querySelectorAll('[data-dev]'), function (c) {
      if (c.checked) { var w = Number(c.dataset.w), h = val2('[data-hrs="' + c.dataset.dev + '"]'); if (w > 0 && h > 0) { total += w * h; watts += w; n++; } }
    });
    if (!(cap > 0)) return setOut('p-out', '<p>Enter battery size.</p>');
    if (n === 0) return setOut('p-out', '<p>Pick at least one device.</p>');
    var days = cap * 0.85 / total;
    setOut('p-out', kpi('Energy per day', nf(total, 0) + ' Wh') + kpi('Running together', nf(watts, 0) + ' W') + kpi('Battery lasts', days >= 1 ? nf(days) + ' days' : nf(days * 24) + ' hours'));
  }
  function val2(sel) { var e = document.querySelector(sel); return e ? Number(e.value) : 0; }
  function convert(id, v) {
    var m = { 'u-gal': ['u-l', function (x) { return x * 3.785; }], 'u-l': ['u-gal', function (x) { return x / 3.785; }], 'u-f': ['u-c', function (x) { return (x - 32) * 5 / 9; }], 'u-c': ['u-f', function (x) { return x * 9 / 5 + 32; }], 'u-ft': ['u-m', function (x) { return x * 0.3048; }], 'u-m': ['u-ft', function (x) { return x / 0.3048; }], 'u-in': ['u-cm', function (x) { return x * 2.54; }], 'u-cm': ['u-in', function (x) { return x / 2.54; }] };
    var t = m[id]; if (!t || !isFinite(v)) return; var e = document.getElementById(t[0]); if (e) e.value = Math.round(t[1](v) * 100) / 100;
  }
  /* fridge timer */
  function fridgePanel() {
    var p = document.getElementById('f-panel'); if (!p) return;
    if (!S.outage) { p.innerHTML = '<p>Tap the button when the power goes out. Deadlines are saved on this device.</p><div class="actions">' + btn('Power went out', 'fridge-start', 'button') + '</div>'; return; }
    var t0 = S.outage;
    function row(l, h) { var end = t0 + h * 3600000, left = end - Date.now(); return '<div class="kpi">' + esc(l) + '<strong>' + (left <= 0 ? 'Time is up' : fmt(left)) + '</strong><small>Until ' + new Date(end).toLocaleString([], { weekday: 'short', hour: '2-digit', minute: '2-digit' }) + '</small></div>'; }
    function fmt(ms) { var s = Math.floor(ms / 1000), h = Math.floor(s / 3600), m = Math.floor(s % 3600 / 60); return h + ' h ' + (m < 10 ? '0' : '') + m + ' min'; }
    p.innerHTML = '<p>Power went out at <b>' + new Date(t0).toLocaleString([], { weekday: 'short', hour: '2-digit', minute: '2-digit' }) + '</b>. Time open: ' + fmt(Date.now() - t0) + '.</p><div class="kpis">' + row('Fridge (closed): about 4 h', 4) + row('Full freezer: about 48 h', 48) + row('Half-full freezer: about 24 h', 24) + '</div><div class="actions">' + btn('Power is back', 'fridge-stop', 'secondary') + '</div>';
  }

  /* overlays */
  function overlay(cls) { closeOverlay(); var d = document.createElement('div'); d.id = 'ov'; d.className = 'ov ' + cls; d.setAttribute('role', 'button'); d.setAttribute('tabindex', '0'); d.setAttribute('aria-label', 'Tap to close'); d.addEventListener('click', closeOverlay); d.addEventListener('keydown', closeOverlay); document.body.appendChild(d); try { if (navigator.wakeLock) navigator.wakeLock.request('screen').then(function (w) { d._wl = w; }).catch(function () {}); } catch (e) {} return d; }
  function closeOverlay() { var d = document.getElementById('ov'); if (!d) return; if (d._t) clearTimeout(d._t); try { if (d._wl) d._wl.release(); } catch (e) {} d.remove(); }
  function sos() {
    var d = overlay('sos'), seq = [], U = 260, i;
    for (i = 0; i < 3; i++) seq.push([U, 1], [U, 0]); seq[seq.length - 1] = [U * 3, 0];
    for (i = 0; i < 3; i++) seq.push([U * 3, 1], [U, 0]); seq[seq.length - 1] = [U * 3, 0];
    for (i = 0; i < 3; i++) seq.push([U, 1], [U, 0]); seq[seq.length - 1] = [U * 7, 0];
    var k = 0;
    (function step() { if (!document.getElementById('ov')) return; var s = seq[k % seq.length]; d.classList.toggle('on', !!s[1]); k++; d._t = setTimeout(step, s[0]); })();
  }

  /* ---------- plan ---------- */
  var PLAN = [
    ['members', 'Household members', 'Names, ages, special needs'],
    ['meet1', 'Meeting place 1 (near home)', 'For example, the corner by the school'],
    ['meet2', 'Meeting place 2 (outside the area)', 'For example, a relative’s home'],
    ['contact', 'Out-of-area contact', 'Name and phone number'],
    ['numbers', 'Local emergency numbers', 'Police, fire, doctor, poison line'],
    ['meds', 'Medications and medical needs', 'Names, doses, allergies, equipment'],
    ['shutoff', 'Utility shutoff locations', 'Water, gas and power controls'],
    ['pets', 'Pets', 'Names, vet, food'],
    ['route', 'Evacuation route', 'Primary and backup route'],
    ['notes', 'Notes', 'Anything else']
  ];
  function planView() {
    return '<h1>Family plan</h1><p class="muted">Fill it in once. It saves on this device. Print it or copy it as text.</p><div class="panel planform" id="plan">' +
      PLAN.map(function (f) { return '<label for="pl-' + f[0] + '">' + esc(f[1]) + '</label><textarea id="pl-' + f[0] + '" data-plan="' + f[0] + '" rows="' + (f[0] === 'members' || f[0] === 'notes' ? 4 : 2) + '" placeholder="' + esc(f[2]) + '">' + esc(S.plan[f[0]] || '') + '</textarea>'; }).join('') +
      '<div class="actions noprint">' + btn('Print', 'plan-print', 'button') + ' ' + btn('Copy as text', 'plan-copy', 'secondary') + ' ' + btn('Clear plan', 'plan-clear', 'secondary') + '</div><p class="muted noprint" id="plan-msg" aria-live="polite"></p></div>' +
      '<div class="printonly"><h2>LOAD Survival family plan</h2>' + PLAN.map(function (f) { return '<p><b>' + esc(f[1]) + '</b><br>' + esc(S.plan[f[0]] || '').replace(/\n/g, '<br>') + '</p>'; }).join('') + '</div>';
  }
  function planText() { return 'LOAD Survival family plan\n\n' + PLAN.map(function (f) { return f[1] + ':\n' + (S.plan[f[0]] || '-') + '\n'; }).join('\n'); }
  function copy(txt, msg) {
    function ok() { setOut('plan-msg', 'Copied.'); }
    function fb() { var t = document.createElement('textarea'); t.value = txt; t.style.position = 'fixed'; t.style.opacity = '0'; document.body.appendChild(t); t.select(); try { document.execCommand('copy'); ok(); } catch (e) { setOut('plan-msg', 'Could not copy. Select the text and copy it yourself.'); } t.remove(); }
    try { if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(txt).then(ok, fb); else fb(); } catch (e) { fb(); }
  }

  /* ---------- search ---------- */
  var index = null;
  function flat(v) { return Array.isArray(v) ? v.map(flat).join(' ') : (v && typeof v === 'object' ? Object.keys(v).map(function (k) { return flat(v[k]); }).join(' ') : String(v == null ? '' : v)); }
  function buildIndex() {
    index = [];
    D.lessons.forEach(function (l) { index.push({ t: l.title, k: 'lesson', id: l.id, a: l.area, body: flat([l.title_pt, l.intro, l.intro_pt, l.warning, l.warning_pt, l.steps, l.steps_pt, l.first, l.do, l.warn, l.tip, l.after, l.table]) }); });
    (D.scenarios || []).forEach(function (s) { index.push({ t: s.title, k: 'scenario', id: s.id, a: 'Emergency', body: flat(s.times) }); });
    (window.LOAD_PART5 || []).forEach(function (x) { index.push({ t: x.title.en, k: 'regional', id: x.id, a: 'Regional ' + x.region, body: flat([x.title.pt, x.warning, x.steps]) }); });
    C.lists.forEach(function (L) { index.push({ t: L.title, k: 'list', id: L.id, a: 'Checklist', body: flat(L.items) }); });
  }
  function searchResults(q) {
    if (!index) buildIndex();
    q = q.trim().toLowerCase(); if (q.length < 2) return '<p class="muted">Type at least 2 letters.</p>';
    var words = q.split(/\s+/), out = [];
    index.forEach(function (it) {
      var tl = it.t.toLowerCase(), bl = it.body.toLowerCase(), sc = 0, ok = true;
      words.forEach(function (w) { var a = tl.indexOf(w) >= 0, b = bl.indexOf(w) >= 0; if (!a && !b) ok = false; sc += (a ? 3 : 0) + (b ? 1 : 0); });
      if (ok) { var i = bl.indexOf(words[0]), sn = i >= 0 ? it.body.slice(Math.max(0, i - 40), i + 90) : ''; out.push([sc, it, sn]); }
    });
    out.sort(function (a, b) { return b[0] - a[0]; });
    if (!out.length) return '<p>No results. Try a simpler word.</p>';
    return '<p class="muted">' + out.length + ' result' + (out.length > 1 ? 's' : '') + '</p><div class="results">' + out.slice(0, 40).map(function (r) {
      var it = r[1], attr = it.k === 'lesson' ? 'data-open-lesson="' + esc(it.id) + '"' : it.k === 'scenario' ? 'data-open-scenario="' + esc(it.id) + '"' : it.k === 'regional' ? 'data-open-regional="' + esc(it.id) + '"' : 'data-action="open-list" data-list="' + esc(it.id) + '"';
      return '<button class="result" data-cat="' + (A.catKey ? A.catKey(it.a) : 'essentials') + '" ' + attr + '><b>' + esc(it.t) + '</b><small>' + esc(it.a) + '</small>' + (r[2] ? '<span>…' + esc(r[2]) + '…</span>' : '') + '</button>';
    }).join('') + '</div>';
  }
  function searchView() {
    return '<h1>Search</h1><p class="muted">Search every guide, lesson, checklist and regional card.</p><input class="search" id="gsearch" type="search" autocomplete="off" placeholder="Try: bleeding, bleach, generator, tsunami" value="' + esc(state.gq || '') + '"><div id="gresults">' + (state.gq ? searchResults(state.gq) : '') + '</div>';
  }

  /* ---------- about ---------- */
  function aboutView() {
    return '<h1>About and sources</h1><div class="panel"><h2>What this is</h2><p>Load Survival is an offline guide to survival and preparedness for disasters, storms and power-grid outages. It is for the United States and Portugal.</p><p>It is general information only. It is not medical, legal or professional advice. In an emergency call your local emergency number. ' + verify() + '</p><p>First-aid pages are a reference, not a substitute for training. Take a certified first-aid course.</p><p>Nothing here tells anyone to confront an intruder. Laws on self-defense differ by US state and in Portugal. Ask a local professional.</p></div>' +
      '<section><h2>Sources</h2><p class="muted">Figures follow FEMA, CDC, EPA and Red Cross guidance. Links need internet.</p><ul class="sources">' + C.sources.map(function (s) { return '<li><a href="' + esc(s[1]) + '" target="_blank" rel="noopener noreferrer">' + esc(s[0]) + '</a></li>'; }).join('') + '</ul></section>' +
      picSection() + '<section><h2>On this device</h2><p>Your lists, plan and settings stay in this browser. Nothing is sent anywhere. No accounts, no tracking.</p><div class="actions">' + btn('Settings', 'profile', 'secondary') + ' ' + btn('Refresh Load Survival', 'refresh', 'secondary') + '</div></section>';
  }

  /* ---------- save all pictures for offline ---------- */
  /* Step pictures are cached when first viewed (service-worker.js, cache PICS). This fills that same cache on request. */
  var PICS = 'loadsurvival-pics-2', picRun = false, picStop = false;
  function picUrls() {
    var m = window.LOAD_STEP_IMAGES || {}, seen = {}, out = [];
    Object.keys(m).forEach(function (k) { m[k].forEach(function (p) { if (/^assets\/steps\//.test(p) && !seen[p]) { seen[p] = 1; out.push(new URL(p, location.href).href); } }); });
    return out;
  }
  function picBar(done, total) { var b = document.getElementById('picbar'); if (b) b.style.width = (total ? Math.round(done * 100 / total) : 0) + '%'; }
  function picStatus() {
    if (!window.caches) { setOut('picmsg', 'This browser cannot save pictures for offline use.'); return; }
    var urls = picUrls();
    caches.open(PICS).then(function (c) { return Promise.all(urls.map(function (u) { return c.match(u); })); }).then(function (r) {
      var have = r.filter(Boolean).length;
      setOut('picmsg', have + ' of ' + urls.length + ' pictures are saved on this device.' + (have < urls.length ? ' About ' + Math.max(1, Math.round((urls.length - have) * 36 / 1024)) + ' MB left to save.' : ' All saved.'));
      picBar(have, urls.length);
    }).catch(function () {});
  }
  function savePics() {
    if (picRun) return;
    if (!window.caches) { setOut('picmsg', 'This browser cannot save pictures for offline use.'); return; }
    if (navigator.onLine === false) { setOut('picmsg', 'You are offline. Connect to Wi-Fi and try again.'); return; }
    picRun = true; picStop = false;
    try { if (navigator.storage && navigator.storage.persist) navigator.storage.persist(); } catch (e) {}
    caches.open(PICS).then(function (c) {
      var urls = picUrls();
      return Promise.all(urls.map(function (u) { return c.match(u).then(function (f) { return f ? null : u; }); })).then(function (r) {
        var todo = r.filter(Boolean), total = todo.length, done = 0, fail = 0;
        if (!total) { setOut('picmsg', 'All ' + urls.length + ' pictures are already saved.'); picBar(1, 1); return; }
        function worker() {
          if (picStop || !todo.length) return Promise.resolve();
          var u = todo.shift();
          return fetch(u).then(function (resp) { if (resp.ok) return c.put(u, resp); fail++; }).catch(function () { fail++; }).then(function () {
            done++; setOut('picmsg', 'Saving pictures: ' + done + ' of ' + total + (fail ? ' (' + fail + ' failed)' : '')); picBar(done, total); return worker();
          });
        }
        return Promise.all([worker(), worker(), worker(), worker()]).then(function () {
          setOut('picmsg', (picStop ? 'Stopped. ' : (fail ? 'Finished with ' + fail + ' failed. Tap Save again to retry. ' : 'Done. ')) + (done - fail) + ' pictures saved this time.');
        });
      });
    }).catch(function () { setOut('picmsg', 'Could not save pictures. Check space on this device and try again.'); }).then(function () { picRun = false; });
  }
  function picSection() {
    var n = picUrls().length;
    return '<section><h2>Pictures offline</h2><p>Step pictures are saved on this device the first time you open a guide. To save all ' + n + ' now, use Wi-Fi and keep this page open. It is about ' + Math.max(1, Math.round(n * 36 / 1024)) + ' MB.</p>' +
      '<div class="actions">' + btn('Save all pictures', 'save-pics', 'button') + ' ' + btn('Stop', 'save-pics-stop', 'secondary') + '</div>' +
      '<div class="progress" aria-hidden="true"><i id="picbar" style="width:0%"></i></div><p id="picmsg" class="muted" role="status" aria-live="polite">Checking...</p></section>';
  }

  /* ---------- wiring ---------- */
  var views = {
    home: home, lesson: lessonView, lists: listsView, list: listView, tools: toolsView, tool: toolView, plan: planView, search: searchView, about: aboutView,
    emergency: function () { return A.emergency() + regionBoxes(); }
  };
  var actions = {
    lists: function () { switchView('lists'); },
    plan: function () { switchView('plan'); },
    search: function () { switchView('search'); },
    about: function () { switchView('about'); },
    enter: function () { S.welcomed = true; put(); switchView('home'); },
    tools: function () { switchView('tools'); },
    'open-list': function (x) { switchView('list', x.dataset.list); },
    'open-tool': function (x) { switchView('tool', x.dataset.tool); },
    'list-reset': function () { S.lists[state.opened] = {}; put(); A.render(); },
    'hide-install': function () { S.hideInstall = true; put(); A.render(); },
    'fridge-start': function () { S.outage = Date.now(); put(); fridgePanel(); startFridge(); },
    'fridge-stop': function () { S.outage = null; put(); clearTimers(); fridgePanel(); },
    'flash-on': function () { overlay('flash'); },
    'sos-on': sos,
    'cpr-start': cprStart,
    'stk-copy': function () { copy(stkText()); setOut('stk-msg', 'Copied. Paste it into Notes or Messages.'); },
    'stk-print': function () { try { window.print(); } catch (e) {} },
    'cpr-stop': cprStop,
    'cpr-go': cprGo,
    'read-guide': readGuide,
    'plan-print': function () { try { window.print(); } catch (e) {} },
    'plan-copy': function () { copy(planText()); },
    'plan-clear': function () { S.plan = {}; put(); A.render(); },
    'save-pics': savePics,
    'save-pics-stop': function () { picStop = true; }
  };
  /* ---------- read a guide aloud (English) ---------- */
  function guideText(l) {
    var t = [l.title, l.intro];
    if (l.first && l.first.length) t.push('Do this first.'), (l.first || []).forEach(function (x) { t.push(x); });
    if (l.do && l.do.length) { t.push('What to do.'); l.do.forEach(function (x, i) { t.push('Step ' + (i + 1) + '. ' + x); }); }
    if (l.warn && l.warn.length) { t.push('Warnings.'); l.warn.forEach(function (x) { t.push(x); }); }
    return t;
  }
  function readReset() { var b = document.getElementById('readbtn'); if (b) { var s = b.querySelector('span'); if (s) s.textContent = 'Listen to this guide'; b.setAttribute('aria-label', 'Listen to this guide read aloud'); } }
  function readGuide() {
    var Sp = window.LOAD_SPEAK; if (!Sp) return;
    if (Sp.isReading()) { Sp.stop(); readReset(); return; }
    var txt = null, lang = 'en';
    if (state.view === 'regional-detail') {
      var x = (window.LOAD_PART5 || []).filter(function (y) { return y.id === state.opened; })[0]; if (!x) return;
      lang = state.language === 'pt' ? 'pt' : 'en';
      txt = [x.title[lang], x.warning[lang]]; (x.steps[lang] || []).forEach(function (s, i) { txt.push((lang === 'pt' ? 'Passo ' : 'Step ') + (i + 1) + '. ' + s[0] + '. ' + s[1]); });
    } else if (state.view === 'scenario') {
      var sc = (D.scenarios || []).filter(function (y) { return y.id === state.opened; })[0]; if (!sc) return;
      txt = [sc.title, 'Risk changes quickly. Follow current local emergency warnings, shelter orders and evacuation directions.']; (sc.times || []).forEach(function (t, i) { txt.push('Phase ' + (i + 1) + '. ' + t[0] + '. ' + t[1]); });
    } else {
      var l = D.lessons.filter(function (x) { return x.id === state.opened; })[0]; if (!l) return; txt = guideText(l);
    }
    var b = document.getElementById('readbtn');
    if (Sp.readList(txt, readReset, lang) && b) { var s = b.querySelector('span'); if (s) s.textContent = 'Stop reading'; b.setAttribute('aria-label', 'Stop reading'); }
  }
  /* ---------- stockpile planner ---------- */
  function stkInputs() {
    var n = (document.getElementById('stk-n') || {}).value, nn = Number((document.getElementById('stk-nn') || {}).value);
    var people = n === 'x' ? Math.max(1, Math.min(50, Math.round(nn) || 1)) : Number(n) || 4;
    var days = Number((document.getElementById('stk-p') || {}).value) || 30;
    var kids = Math.max(0, Math.round(Number((document.getElementById('stk-k') || {}).value) || 0));
    var us = ((document.getElementById('stk-c') || {}).value || 'us') === 'us';
    return { people: people, days: days, kids: Math.min(kids, people), us: us, lt: !!(document.getElementById('stk-lt') || {}).checked };
  }
  function stkShelf(y) { return y < 1 ? Math.round(y * 12) + ' months' : (y === 1 ? '1 year' : y + ' years'); }
  function stkPlan() {
    var I = stkInputs(), SK = window.LOAD_STOCK, R = SK.compute(I.us ? 'us' : 'pt', I.people, I.days, { lt: I.lt, kids: I.kids });
    return { I: I, R: R, SK: SK };
  }
  function stkWater(R, us, SK) {
    var w = R.water, L = Math.round(w.litres), gal = Math.round(w.gallons);
    var text = us ? gal + ' gallons (' + L + ' litres), about ' + gal + ' one-gallon jugs' : L + ' litres, about ' + Math.ceil(w.litres / 1.5) + ' bottles of 1.5 L or ' + Math.ceil(w.litres / 5) + ' jugs of 5 L';
    var line = 'Store ' + w.storeDays + ' days of drinking and cooking water: ' + text + '.';
    if (w.treatDays > 0) line += ' For the other ' + w.treatDays + ' days, plan a filter and plain unscented bleach, or boiling. About ' + nf(Math.round(w.totalGal), 0) + ' gallons (' + nf(Math.round(w.totalGal * 3.785), 0) + ' litres) to treat in total.';
    return line;
  }
  function stkRender() {
    var P = stkPlan(), I = P.I, R = P.R, SK = P.SK, us = I.us, h = '';
    var cats = [], seen = {}; R.food.forEach(function (f) { if (!seen[f.cat]) { seen[f.cat] = 1; cats.push(f.cat); } });
    var totalKeep = R.grams;
    h += '<div class="kpis">' + kpi('People', I.people + (I.kids ? ' (' + I.kids + ' children)' : '')) + kpi('Length', I.days >= 365 ? nf(I.days / 365, 0) + (I.days === 365 ? ' year' : ' years') : (I.days === 7 ? '1 week' : I.days === 30 ? '1 month' : I.days === 90 ? '3 months' : I.days === 180 ? '6 months' : I.days + ' days')) +
      kpi('Food to store', SK.fmtMass(totalKeep, us)) + kpi('Calories a day each', '~' + nf(Math.round(R.perDayKcal / 50) * 50, 0)) + '</div>';
    h += '<section class="gblock"><h2>Water</h2><ul><li>' + esc(stkWater(R, us, SK)) + '</li><li>1 gallon (3.8 L) per person per day: drinking, cooking and a little washing. Add more for heat, pregnancy, illness and pets.</li></ul></section>';
    cats.forEach(function (c) {
      h += '<section class="gblock"><h2>' + esc(c) + '</h2><ul class="stklist">';
      R.food.filter(function (f) { return f.cat === c; }).forEach(function (f) {
        h += '<li class="stkrow"><b>' + esc(f.name) + '</b>' + (f.fav ? ' <span class="pill">Favourite</span>' : '') + (f.alt ? ' <small class="muted">(' + esc(f.alt) + ')</small>' : '') +
          '<div class="stkqty">' + f.packs + ' ' + esc(f.unit) + ' <span class="muted">(' + SK.fmtMass(f.keep, us) + ')</span></div>';
        var note = []; if (f.rotate) note.push('Keeps about ' + stkShelf(f.shelf) + '. Eat the oldest first and replace it. Over the whole plan you will use about ' + SK.fmtMass(f.total, us) + '.'); if (f.cook) note.push('Needs fire or a stove and water.'); if (f.note) note.push(f.note);
        if (note.length) h += '<small class="muted">' + esc(note.join(' ')) + '</small>';
        h += '</li>';
      });
      h += '</ul></section>';
    });
    var ncats = [], ns = {}; R.nonfood.forEach(function (f) { if (!ns[f.cat]) { ns[f.cat] = 1; ncats.push(f.cat); } });
    ncats.forEach(function (c) {
      h += '<section class="gblock"><h2>' + esc(c) + '</h2><ul class="stklist">';
      R.nonfood.filter(function (f) { return f.cat === c; }).forEach(function (f) {
        h += '<li class="stkrow"><b>' + esc(f.name) + '</b>' + (f.alt ? ' <small class="muted">(' + esc(f.alt) + ')</small>' : '') + '<div class="stkqty">' + nf(f.q, 1) + ' ' + esc(f.unit) + '</div>' + (f.note ? '<small class="muted">' + esc(f.note) + '</small>' : '') + '</li>';
      });
      h += '</ul></section>';
    });
    if (I.days > 365) h += '<div class="notice">Soap, paper, batteries and gas are listed for up to 1 year. Buy more each year. For batteries, use rechargeable ones with a solar charger.</div>';
    h += '<div class="notice">Planner estimates. The 3-day and 1 to 2 week amounts follow official advice. Longer amounts are our estimate from a standard long-term storage pattern, and each guide below the list says what we could not confirm. See the Stockpile basics guide. Also stock any medicines, baby food, formula, pet food and special diet needs. Check dates and rotate.</div>';
    setOut('stk-out', h);
  }
  function stkText() {
    var P = stkPlan(), I = P.I, R = P.R, SK = P.SK, us = I.us, t = 'LOAD Survival stockpile list\n' + (us ? 'United States' : 'Portugal') + ', ' + I.people + ' people, ' + I.days + ' days\n\n';
    t += 'WATER\n' + stkWater(R, us, SK) + '\n\n';
    var seen = {};
    R.food.forEach(function (f) { if (!seen[f.cat]) { seen[f.cat] = 1; t += '\n' + f.cat.toUpperCase() + '\n'; } t += '[ ] ' + f.name + ': ' + f.packs + ' ' + f.unit + ' (' + SK.fmtMass(f.keep, us) + ')\n'; });
    var s2 = {};
    R.nonfood.forEach(function (f) { if (!s2[f.cat]) { s2[f.cat] = 1; t += '\n' + f.cat.toUpperCase() + '\n'; } t += '[ ] ' + f.name + ': ' + nf(f.q, 1) + ' ' + f.unit + '\n'; });
    return t;
  }
  /* ---------- CPR rhythm ---------- */
  var cpr = null;
  function cprEls() { return { pulse: document.getElementById('cprpulse'), count: document.getElementById('cprcount'), msg: document.getElementById('cprmsg') }; }
  function cprClick(ctx, high) {
    try { var o = ctx.createOscillator(), g = ctx.createGain(); o.frequency.value = high ? 1000 : 800; o.type = 'square'; g.gain.setValueAtTime(0.0001, ctx.currentTime); g.gain.exponentialRampToValueAtTime(0.35, ctx.currentTime + 0.005); g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.08); o.connect(g); g.connect(ctx.destination); o.start(); o.stop(ctx.currentTime + 0.09); } catch (e) {}
  }
  function cprStop() {
    if (cpr) { clearTimeout(cpr.t); try { if (cpr.wl) cpr.wl.release(); } catch (e) {} try { if (cpr.ctx && cpr.ctx.close) cpr.ctx.close(); } catch (e) {} cpr = null; }
    var e = cprEls(); if (e.msg) e.msg.textContent = 'Stopped'; if (e.pulse) e.pulse.classList.remove('beat');
  }
  function cprBeat() {
    if (!cpr || cpr.paused) return;
    var e = cprEls(), bpm = cpr.bpm, per = 60000 / bpm;
    cpr.n += 1; cpr.cycleN += 1;
    if (e.count) e.count.textContent = cpr.cycle ? cpr.cycleN : cpr.n;
    if (e.pulse) { e.pulse.classList.remove('beat'); void e.pulse.offsetWidth; e.pulse.classList.add('beat'); }
    if (e.msg) e.msg.textContent = 'Push';
    if (cpr.sound && cpr.ctx) cprClick(cpr.ctx, cpr.cycle && cpr.cycleN === 1);
    if (cpr.cycle && cpr.cycleN >= cpr.cycle) {
      cpr.paused = true; cpr.cycleN = 0;
      if (e.msg) e.msg.innerHTML = 'Give 2 breaths now. Then tap <b>Keep pushing</b>.';
      var a = document.querySelector('.cprpanel .actions'); if (a && !document.getElementById('cprgo')) { var bt = document.createElement('button'); bt.type = 'button'; bt.id = 'cprgo'; bt.className = 'button'; bt.setAttribute('data-action', 'cpr-go'); bt.textContent = 'Keep pushing'; a.appendChild(bt); }
      return;
    }
    cpr.next += per; cpr.t = setTimeout(cprBeat, Math.max(10, cpr.next - Date.now()));
  }
  function cprGo() {
    if (!cpr) return; var b = document.getElementById('cprgo'); if (b) b.remove();
    cpr.paused = false; cpr.next = Date.now(); cprBeat();
  }
  function cprStart() {
    cprStop();
    var bpm = Number((document.getElementById('cprbpm') || {}).value) || 110, cyc = Number((document.getElementById('cprcycle') || {}).value);
    var snd = !!(document.getElementById('cprsound') || {}).checked, ctx = null;
    if (snd) { try { var AC = window.AudioContext || window.webkitAudioContext; if (AC) { ctx = new AC(); if (ctx.state === 'suspended' && ctx.resume) ctx.resume(); } } catch (e) {} }
    cpr = { bpm: bpm, cycle: cyc || 0, n: 0, cycleN: 0, sound: snd && !!ctx, ctx: ctx, paused: false, next: Date.now(), t: null, wl: null };
    try { if (navigator.wakeLock && navigator.wakeLock.request) navigator.wakeLock.request('screen').then(function (w) { if (cpr) cpr.wl = w; else w.release(); }).catch(function () {}); } catch (e) {}
    cprBeat();
  }
  function startFridge() { clearTimers(); if (S.outage) timers.push(setInterval(fridgePanel, 30000)); }
  function after() {
    var v = state.view;
    if (v === 'tool') {
      var t = state.opened;
      if (t === 'stock') { var sb = document.getElementById('stk-nnbox'); if (sb) sb.hidden = ((document.getElementById('stk-n') || {}).value !== 'x'); stkRender(); } else if (t === 'water') calcWater(); else if (t === 'bleach') calcBleach(); else if (t === 'watts') calcWatts(); else if (t === 'fridge') { fridgePanel(); startFridge(); }
    } else clearTimers();
    if (v !== 'tool' || state.opened !== 'cpr') cprStop();
    if (v === 'about') picStatus();
    if (v === 'search') { var g = document.getElementById('gsearch'); if (g && !('ontouchstart' in window)) { try { g.focus(); } catch (e) {} } }
  }
  function welcome() {
    return '<div class="wel"><figure><img src="assets/images/welcome.jpg" alt="Load Survival. Know, prepare, survive, thrive." width="1214" height="2160"><button type="button" data-action="enter" aria-label="Get started"></button></figure></div>';
  }
  function firstRoute() { return S.welcomed ? null : ['welcome', null]; }

  function onInput(e) {
    var t = e.target, id = t.id || '';
    if (id === 'gsearch') { state.gq = t.value; setOut('gresults', searchResults(t.value)); return true; }
    if (t.dataset && t.dataset.plan) { S.plan[t.dataset.plan] = t.value; put(); return true; }
    if (id === 'w-people' || id === 'w-days') { calcWater(); return true; }
    if (id === 'b-vol') { calcBleach(); return true; }
    if (id === 'stk-nn' || id === 'stk-k') { stkRender(); return true; }
    if (id === 'p-cap' || (t.dataset && t.dataset.hrs !== undefined)) { calcWatts(); return true; }
    if (id.indexOf('u-') === 0) { convert(id, Number(t.value)); return true; }
    return false;
  }
  function onChange(e) {
    var t = e.target, id = t.id || '';
    if (t.dataset && t.dataset.lcheck) {
      var p = t.dataset.lcheck.split('|'); S.lists[p[0]] = S.lists[p[0]] || {}; S.lists[p[0]][p[1]] = t.checked; put();
      var L = C.lists.filter(function (x) { return x.id === p[0]; })[0], n = listDone(p[0]);
      setOut('lprog', n + ' of ' + L.items.length + ' done'); var b = document.getElementById('lbar'); if (b) b.style.width = Math.round(n * 100 / L.items.length) + '%'; return true;
    }
    if (t.dataset && t.dataset.dev !== undefined) { calcWatts(); return true; }
    if (id === 'b-unit') { calcBleach(); return true; }
    if (id.indexOf('stk-') === 0) { var bx = document.getElementById('stk-nnbox'); if (bx) bx.hidden = ((document.getElementById('stk-n') || {}).value !== 'x'); stkRender(); return true; }
    return false;
  }
  return { views: views, actions: actions, onInput: onInput, onChange: onChange, after: after, welcome: welcome, firstRoute: firstRoute };
};
