/* Load Maps: Survival Maps view (phase 1, static). Add-only. Needs survival-data.js.
   Shows 12 locations with the four safety warnings, waterway fields that stay DATA UNVERIFIED, a fishing section that stays LEGAL STATUS UNVERIFIED,
   official source starting pages, and links to the Load Survival river guides. No map layers, coordinates or live data are included. */
(function () {
  if (typeof LMS === 'undefined') return;
  var st = { cc: 'us', loc: null, tab: 'overview', host: null };

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function find(arr, f) { for (var i = 0; i < arr.length; i++) if (f(arr[i])) return arr[i]; return null; }
  function srcUrl(title) { var all = LMS.sources.us.concat(LMS.sources.pt), s = find(all, function (x) { return x[0] === title; }); return s ? s[1] : ''; }
  function tag(cls, txt) { return '<span class="svx-tag ' + cls + '">' + esc(txt) + '</span>'; }
  function guideLink(id, t) { return '<a class="svx-link" href="' + LMS.guideBase + esc(id) + '">' + esc(t) + '</a>'; }
  function isPT(l) { return l.cc === 'pt'; }

  function warnings(open) {
    return '<details class="svx-warn"' + (open ? ' open' : '') + '><summary>Safety and map limits</summary>' + LMS.warnings.map(function (w) {
      return '<div class="svx-w"><b>' + esc(w.t) + '</b><p>' + esc(w.en) + '</p></div>';
    }).join('') + '</details>';
  }

  function listView() {
    var locs = LMS.locations.filter(function (l) { return l.cc === st.cc; });
    var h = '<h1>Survival Maps</h1><p class="muted small">Twelve places in the United States and Portugal. Each page shows hazards to review, water and river cautions, fishing checks and official source pages. Nothing here is verified yet, and nothing is live. ' + esc(LMS.labels.device) + '.</p>' +
      warnings(false) +
      '<div class="chips svx-tabs" role="tablist" aria-label="Country">' +
      '<button class="chip' + (st.cc === 'us' ? ' on' : '') + '" role="tab" aria-selected="' + (st.cc === 'us') + '" data-svx-cc="us">United States</button>' +
      '<button class="chip' + (st.cc === 'pt' ? ' on' : '') + '" role="tab" aria-selected="' + (st.cc === 'pt') + '" data-svx-cc="pt">Portugal</button></div>' +
      '<div id="svxList">' + locs.map(function (l) {
        return '<button class="card svx-card" data-svx-loc="' + esc(l.id) + '"><b>' + esc(l.name) + '</b><div class="muted small">' + esc(l.juris) + '</div><div class="small" style="margin-top:6px">' + esc(l.emphasis) + '</div><div style="margin-top:8px">' + tag('amber', LMS.labels.unverified) + '</div></button>';
      }).join('') + '</div>' +
      '<p class="muted small">Source directory: official starting pages are on each place page. They are linked, not opened here, and need the internet.</p>';
    return h;
  }

  function tabBar(l) {
    var pt = isPT(l);
    var T = [['overview', 'Overview', 'Resumo'], ['water', 'Water', 'Fontes de água'], ['fishing', 'Fishing', 'Pesca'], ['hazards', 'Hazards', 'Perigos'], ['sources', 'Sources', 'Fontes']];
    return '<div class="chips svx-tabs" role="tablist" aria-label="Sections">' + T.map(function (t) {
      return '<button class="chip' + (st.tab === t[0] ? ' on' : '') + '" role="tab" aria-selected="' + (st.tab === t[0]) + '" data-svx-tab="' + t[0] + '">' + esc(t[1]) + (pt ? ' / ' + esc(t[2]) : '') + '</button>';
    }).join('') + '</div>';
  }

  function fieldTable(extra) {
    return '<table class="svx-table"><tbody>' + LMS.waterFields.map(function (f) {
      return '<tr><th scope="row">' + esc(f) + '</th><td>' + tag('amber', LMS.labels.unverified) + '</td></tr>';
    }).join('') + (extra || '') + '</tbody></table>';
  }

  function tabBody(l) {
    var pt = isPT(l), h = '';
    if (st.tab === 'overview') {
      h += '<div class="card flat"><b>Where</b><p class="muted small">' + esc(l.juris) + '</p><b>Hazards to review first</b><p class="small">' + esc(l.emphasis) + '</p></div>';
      h += '<div class="card flat"><b>Map</b><p class="small">A map layer is not built for this place yet. No coordinates are shown, because none are verified. ' + tag('amber', LMS.labels.unverified) + '</p></div>';
      h += '<div class="card flat"><b>Load Survival guide for this place</b><p class="small">' + guideLink(l.guide, 'Open the full guide for ' + l.name) + '</p><p class="muted small">Opens the Load Survival app. It works offline after you have opened it once.</p></div>';
    } else if (st.tab === 'water') {
      h += '<h2>' + (pt ? 'Water sources / Fontes de água' : 'Water and rivers') + '</h2>';
      h += '<div class="svx-alert">Rivers, lakes, ponds, wells and springs are NOT confirmed drinking-water sources.' + (pt ? ' Rios, lagos, poços e nascentes NÃO são fontes de água potável confirmadas.' : '') + '</div>';
      l.water.forEach(function (w) {
        h += '<div class="card flat"><b>' + esc(w.n) + (pt && w.pt ? ' / ' + esc(w.pt) : '') + '</b><div style="margin:6px 0">' + tag('blue', 'Surface water - not certified potable') + '</div><p class="muted small">' + esc(w.note) + '</p>' + fieldTable() + '</div>';
      });
      h += '<div class="card flat"><b>Load Survival lessons</b><ul class="svx-ul">' +
        ['river-10a-water', 'river-10c-microhydro', 'p11c-water', 'river-10b-plants'].map(function (id) { var g = find(LMS.riverGuides, function (x) { return x.id === id; }); return '<li>' + guideLink(id, g.t) + '</li>'; }).join('') + '</ul></div>';
    } else if (st.tab === 'fishing') {
      h += '<h2>' + (pt ? 'Fishing / Pesca' : 'Fishing') + '</h2>';
      h += '<div class="svx-alert">' + esc(LMS.labels.legal) + '</div>';
      h += '<div class="card flat"><b>Who sets the rules (to check)</b><p class="small">' + esc(l.fish) + '</p><p class="muted small">Nothing about gear, licences, seasons, species, advisories or access is confirmed for this place.</p></div>';
      h += '<div class="card flat"><b>Seven checks before any method is shown</b><table class="svx-table"><tbody>' + LMS.fishChecks.map(function (c) { return '<tr><th scope="row">' + esc(c) + '</th><td>' + tag('amber', LMS.labels.unverified) + '</td></tr>'; }).join('') + '</tbody></table><p class="small">No fishing method is shown for this place until all seven are answered from a current official source with a date.</p></div>';
      h += '<div class="card flat"><b>Load Survival lessons</b><ul class="svx-ul">' + ['river-10b-fishing', 'p11e-bamboo-fishing', 'river-10a-water'].map(function (id) { var g = find(LMS.riverGuides, function (x) { return x.id === id; }); return '<li>' + guideLink(id, g.t) + '</li>'; }).join('') + '</ul></div>';
    } else if (st.tab === 'hazards') {
      h += '<h2>' + (pt ? 'Hazards / Perigos' : 'Hazards') + '</h2>';
      h += '<div class="card flat"><b>Hazards to review</b><p class="small">' + esc(l.emphasis) + '</p><p class="muted small">This is a plain list from our research file. It is not a hazard map, not a live alert and not an evacuation instruction. Official orders override anything here. ' + tag('amber', LMS.labels.unverified) + '</p></div>';
      h += '<div class="card flat"><b>Live alerts</b><p class="small">' + tag('amber', LMS.labels.live) + '</p><p class="muted small">Alerts and closures need the internet and a current official source.</p></div>';
      h += '<div class="card flat"><b>More help</b><p class="small">' + guideLink(l.guide, 'Open the Load Survival guide for ' + l.name) + '</p></div>';
    } else if (st.tab === 'sources') {
      h += '<h2>' + (pt ? 'Sources / Fontes' : 'Sources') + '</h2><p class="muted small">Official starting pages. They are linked, not opened here, and are not proof that any map layer works. They need the internet.</p>';
      l.srcs.forEach(function (t) {
        var u = srcUrl(t);
        h += '<div class="card flat"><b>' + esc(t) + '</b><div style="margin:6px 0">' + tag('amber', LMS.labels.linked) + ' ' + tag('grey', LMS.labels.live) + '</div>' + (u ? '<a class="svx-link" href="' + esc(u) + '" target="_blank" rel="noopener">View original source</a>' : '') + '<p class="muted small">Last checked: not checked.</p></div>';
      });
      h += '<p class="muted small">Report incorrect data: not built yet.</p>';
    }
    return h;
  }

  function detailView() {
    var l = find(LMS.locations, function (x) { return x.id === st.loc; });
    if (!l) { st.loc = null; return listView(); }
    return '<button class="back" data-svx-back="1">&larr; All places</button><h1>' + esc(l.name) + '</h1>' + tabBar(l) + '<div id="svxBody">' + tabBody(l) + '</div>' + warnings(false);
  }

  function paint() {
    if (!st.host) return;
    st.host.innerHTML = '<div class="svx">' + (st.loc ? detailView() : listView()) + '</div>';
    window.scrollTo(0, 0);
  }

  function onClick(e) {
    var t = e.target.closest && e.target.closest('[data-svx-cc],[data-svx-loc],[data-svx-tab],[data-svx-back]');
    if (!t || !st.host || !st.host.contains(t)) return;
    if (t.hasAttribute('data-svx-cc')) { st.cc = t.getAttribute('data-svx-cc'); st.loc = null; paint(); }
    else if (t.hasAttribute('data-svx-loc')) { st.loc = t.getAttribute('data-svx-loc'); st.tab = 'overview'; paint(); }
    else if (t.hasAttribute('data-svx-tab')) { st.tab = t.getAttribute('data-svx-tab'); paint(); }
    else if (t.hasAttribute('data-svx-back')) { st.loc = null; paint(); }
  }

  LMS.render = function (host) {
    if (!host) return;
    if (st.host !== host) { st.host = host; host.addEventListener('click', onClick); }
    paint();
  };
})();
