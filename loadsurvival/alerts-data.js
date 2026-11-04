/* Alerts: a Home card that always shows how to get official alerts, a beta "Check alerts now" button, and one guide. Added 4 Nov 2026 at the owner request (both options combined).
   The button reads two official public feeds directly from the browser: US National Weather Service alerts and England Environment Agency flood warnings.
   We could NOT test either feed from the build machine (network blocked), so browser access (CORS) is NOT confirmed. If a feed cannot be read, the button says so and points to the official site.
   Portugal has no feed here: no official feed was confirmed. The app never claims to detect an emergency. No result is never an all clear. */
(function () {
  var KEY = 'loadsurvival:alerts';
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function load() { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; } }
  function store(o) { try { localStorage.setItem(KEY, JSON.stringify(o)); } catch (e) { } }

  var SITES = {
    us: ['National Weather Service alerts', 'https://www.weather.gov/alerts'],
    uk: ['Check for flooding in England', 'https://check-for-flooding.service.gov.uk/'],
    pt: ['IPMA weather warnings', 'https://www.ipma.pt/en/otempo/prev.significativa/']
  };

  function card() {
    var s = load(), place = s.place || 'us', st = s.state || '';
    function opt(v, t) { return '<option value="' + v + '"' + (place === v ? ' selected' : '') + '>' + t + '</option>'; }
    return '<div class="notice" id="alertcard">' +
      '<b>This app cannot receive alerts while it is closed.</b> ' +
      'Turn on your phone’s official emergency alerts. Keep a battery radio. Open the guide "Alerts that reach you when the app is closed" in Guides.' +
      '<div style="margin-top:10px"><b>Check alerts now (beta)</b>' +
      '<p class="muted" style="margin:6px 0">Works only when you are online and the app is open. It reads an official feed. It has not been tested on your device. No result is not an all clear.</p>' +
      '<label for="al-place">Where</label> <select id="al-place" data-al="place">' +
      opt('us', 'United States (state)') + opt('uk', 'England (flood warnings)') + opt('pt', 'Portugal (official links)') + '</select> ' +
      '<span id="al-st" ' + (place === 'us' ? '' : 'hidden') + '><label for="al-state">State code</label> <input id="al-state" data-al="state" maxlength="2" size="3" value="' + esc(st) + '" placeholder="CA" aria-label="State code, two letters"></span> ' +
      '<button type="button" data-al="go">Check alerts now</button>' +
      '<div id="al-out" role="status" aria-live="polite" style="margin-top:8px"></div></div></div>';
  }

  function out(html) { var o = document.getElementById('al-out'); if (o) o.innerHTML = html; }
  function fail(place, why) {
    var l = SITES[place] || SITES.us;
    out('<p><b>Could not get alerts.</b> ' + esc(why) + ' This does NOT mean there are none. Open the official page: <a href="' + l[1] + '" target="_blank" rel="noopener noreferrer">' + esc(l[0]) + '</a>.</p>');
  }
  function stamp() { return new Date().toLocaleString(); }
  function get(url, headers) {
    var ctl = typeof AbortController === 'function' ? new AbortController() : null;
    var t = ctl ? setTimeout(function () { ctl.abort(); }, 12000) : null;
    return fetch(url, { headers: headers, signal: ctl ? ctl.signal : undefined }).then(function (r) { if (t) clearTimeout(t); if (!r.ok) throw new Error('The feed answered with status ' + r.status + '.'); return r.json(); });
  }

  function checkUS(code) {
    code = String(code || '').toUpperCase().replace(/[^A-Z]/g, '');
    if (code.length !== 2) return out('<p>Type your two-letter state code first, for example CA or FL.</p>');
    out('<p>Checking...</p>');
    get('https://api.weather.gov/alerts/active?area=' + code, { 'Accept': 'application/geo+json' }).then(function (j) {
      var f = (j && j.features) || [];
      if (!f.length) return out('<p>The feed lists no active alerts for ' + esc(code) + ' at ' + esc(stamp()) + '. This is not an all clear. Use your phone alerts and the official page.</p>');
      var order = { Extreme: 0, Severe: 1, Moderate: 2, Minor: 3, Unknown: 4 };
      f.sort(function (a, b) { return (order[a.properties.severity] != null ? order[a.properties.severity] : 4) - (order[b.properties.severity] != null ? order[b.properties.severity] : 4); });
      var h = '<p>' + f.length + ' active alert' + (f.length === 1 ? '' : 's') + ' listed for ' + esc(code) + ' at ' + esc(stamp()) + '. Showing up to 8.</p><ul>';
      f.slice(0, 8).forEach(function (x) { var p = x.properties || {}; h += '<li><b>' + esc(p.event) + '</b> (' + esc(p.severity) + ') ' + esc(p.areaDesc ? String(p.areaDesc).slice(0, 140) : '') + (p.ends || p.expires ? ' Ends: ' + esc(new Date(p.ends || p.expires).toLocaleString()) : '') + '</li>'; });
      out(h + '</ul><p>Source: National Weather Service. Read the full text on <a href="https://www.weather.gov/alerts" target="_blank" rel="noopener noreferrer">weather.gov</a>.</p>');
    }).catch(function (e) { fail('us', navigator.onLine === false ? 'You are offline.' : (e && e.name === 'AbortError' ? 'The feed did not answer in time.' : (e && e.message) || 'The browser could not read the feed.')); });
  }

  function checkUK() {
    out('<p>Checking...</p>');
    get('https://environment.data.gov.uk/flood-monitoring/id/floods?min-severity=3', { 'Accept': 'application/json' }).then(function (j) {
      var it = (j && j.items) || [];
      var by = {}; it.forEach(function (x) { var k = x.severityLevel || 0; (by[k] = by[k] || []).push(x); });
      var names = { 1: 'Severe flood warning', 2: 'Flood warning', 3: 'Flood alert' };
      var h = '<p>England flood list read at ' + esc(stamp()) + ': ' + (by[1] || []).length + ' severe flood warnings, ' + (by[2] || []).length + ' flood warnings, ' + (by[3] || []).length + ' flood alerts.</p>';
      var shown = (by[1] || []).concat(by[2] || []).slice(0, 8);
      if (shown.length) { h += '<ul>'; shown.forEach(function (x) { h += '<li><b>' + esc(names[x.severityLevel] || 'Flood') + '</b>: ' + esc(x.description || x.eaAreaName || '') + '</li>'; }); h += '</ul>'; }
      else h += '<p>No severe flood warnings or flood warnings are listed. This is not an all clear.</p>';
      out(h + '<p>Contains public sector information licensed under the Open Government Licence v3.0 (Environment Agency flood-monitoring API). Check your own area on <a href="' + SITES.uk[1] + '" target="_blank" rel="noopener noreferrer">check-for-flooding.service.gov.uk</a>.</p>');
    }).catch(function (e) { fail('uk', navigator.onLine === false ? 'You are offline.' : (e && e.name === 'AbortError' ? 'The feed did not answer in time.' : (e && e.message) || 'The browser could not read the feed.')); });
  }

  document.addEventListener('change', function (e) {
    var el = e.target.closest && e.target.closest('[data-al]'); if (!el) return;
    var s = load();
    if (el.dataset.al === 'place') { s.place = el.value; store(s); var sp = document.getElementById('al-st'); if (sp) sp.hidden = el.value !== 'us'; out(''); }
    if (el.dataset.al === 'state') { s.state = String(el.value).toUpperCase().replace(/[^A-Za-z]/g, ''); store(s); }
  });
  document.addEventListener('click', function (e) {
    var el = e.target.closest && e.target.closest('[data-al="go"]'); if (!el) return;
    var s = load(), place = s.place || 'us';
    var inp = document.getElementById('al-state'); if (inp) { s.state = String(inp.value).toUpperCase().replace(/[^A-Za-z]/g, ''); store(s); }
    if (navigator.onLine === false) return fail(place, 'You are offline.');
    if (place === 'us') return checkUS(s.state);
    if (place === 'uk') return checkUK();
    out('<p>No feed is connected for Portugal. Open the official pages: <a href="' + SITES.pt[1] + '" target="_blank" rel="noopener noreferrer">IPMA weather warnings</a> and <a href="https://prociv.gov.pt/" target="_blank" rel="noopener noreferrer">Proteccao Civil</a>. Call 112 in danger to life.</p>');
  });
  window.LOAD_ALERTS = { card: card };

  /* ---------------- guide ---------------- */
  var LINKED = 'OFFICIAL SOURCE LINKED BUT NOT OPENED';
  var UNV = 'DATA UNVERIFIED';
  var NOTE = 'We did not open any source page for this guide. Names, menu paths and phone numbers are general knowledge. Check each on the official page before you rely on it.';
  var g = {
    id: 'alerts-when-closed', area: 'Emergency • Alerts', icon: 'alert', difficulty: 'Easy',
    title: 'Alerts that reach you when the app is closed',
    intro: 'This app is an offline reference. It cannot wake you or warn you when it is closed. These are the ways that do reach you. Set them up BEFORE a crisis.',
    first: [
      'In danger to life, call 911 (California, Florida), 999 or 112 (London) or 112 (Portugal) first, if the phone works.',
      NOTE,
      'Do three things now: step 1, turn on the phone government alerts. Step 2, get a battery radio. Step 3, sign up for your local alert list.',
      'The "Check alerts now" button on Home is a beta. It only works when you are online and the app is open. No result is not an all clear.'
    ],
    do: [
      'Step 1. Phone alerts. Open the phone settings and look for emergency or government alerts. Turn on the severe and extreme alerts. On an iPhone the setting is usually under Notifications, near the bottom (general practice, check your own phone). Leave it on.',
      'Step 2. Test it. The United States, United Kingdom and Portugal have national alert systems on mobile phones. Learn what your phone shows and what the sound is. Not confirmed: the exact name and test dates for each country.',
      'Step 3. Battery or hand-crank radio. Keep fresh batteries. In the United States, a weather radio with an alert tone can wake you. Not confirmed: coverage in your exact area.',
      'Step 4. Local sign-up. Look for your county, city or council emergency notice list. Many send text or email. In England, search for the flood warning sign-up on the Environment Agency pages. In Portugal, see the civil protection and IPMA pages.',
      'Step 5. Pick a family signal. Agree who calls whom if the phones work, and a meeting place if they do not. Use the check-ins tool in the Tools tab.',
      'Step 6. Charge the phone every night in an alert-prone season. A dead phone gets no alert. Use the power budget tool for spare charge.',
      'Step 7. Know your zone. Write down your evacuation zone or flood area name, so an alert makes sense when it comes.',
      'Step 8. Use the Home button only as an extra. If it cannot read the feed, open the official page shown on screen.'
    ],
    warn: [
      'This app cannot detect an emergency or confirm an evacuation order. Follow the order from your local authority.',
      'A quiet phone is not an all clear. Alerts can be late, missed or turned off.',
      'Do not wait for an alert if you see danger. Leave or shelter as your plan says.',
      'Beware of fake alerts and fake texts. Check a message on the official page before you act on it, unless it is a phone alert you recognise.'
    ],
    tip: [
      'Silent mode may still allow emergency alerts on some phones. Test yours (general practice).',
      'Write the radio station or frequency your area uses on the radio.',
      'Tell neighbours who have no phone or radio.'
    ],
    after: [
      'Check the phone alert setting again after each phone update.',
      'Replace radio batteries each season.'
    ],
    sections: [
      { h: 'What the Home button reads', items: [
        'United States: National Weather Service active alerts for the state code you type.',
        'England: the Environment Agency flood-monitoring list of flood alerts and warnings.',
        'Portugal: no feed. The button shows the official links.',
        'London is covered by the England list. Other parts of the United Kingdom are not.',
        'It needs a connection. It is not a live alarm. It does not run while the app is closed.'
      ] }
    ],
    sources: [
      ['FEMA: alerts and warnings, ready.gov (' + LINKED + ')', 'https://www.ready.gov/alerts'],
      ['US National Weather Service: alerts (' + LINKED + ')', 'https://www.weather.gov/alerts'],
      ['UK Government: Emergency Alerts (' + LINKED + ')', 'https://www.gov.uk/alerts'],
      ['Environment Agency: check for flooding in England (' + LINKED + ')', 'https://check-for-flooding.service.gov.uk/'],
      ['IPMA: weather warnings, Portugal (' + LINKED + ')', 'https://www.ipma.pt/en/otempo/prev.significativa/'],
      ['Proteccao Civil, Portugal (' + LINKED + ')', 'https://prociv.gov.pt/']
    ],
    unconfirmed: [
      NOTE,
      'Not confirmed: that the Home button can read the National Weather Service or Environment Agency feed from a browser. We could not test it from the build machine. If it fails, the app says so and shows the official page.',
      'Not confirmed: any official feed for Portugal. None is connected.',
      UNV + ': the phone menu paths, the national alert system names and test dates, and the Floodline details.',
      'Not confirmed: coverage of weather radio in your area.',
      'DEVICE TEST PENDING: the guide and the Home button have not been used on an iPad yet.'
    ]
  };
  g.checkedOn = '4 Nov 2026'; g.status = 'partly'; g.source = g.sources[0][1];
  if (window.LOAD_CORE && window.LOAD_CORE.guides) window.LOAD_CORE.guides.push(g);
})();
