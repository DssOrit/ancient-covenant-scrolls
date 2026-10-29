/* Download and print: turns guides into plain files that work with no app and no internet.
   Makes single guide files, one-page print files, and zip packs. The zip is written here, with no outside library. */
(function () {
  var enc = typeof TextEncoder !== 'undefined' ? new TextEncoder() : null;
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function slug(s) { return String(s || 'guide').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 60) || 'guide'; }
  function bytes(s) { if (enc) return enc.encode(s); var out = [], i, c; s = unescape(encodeURIComponent(s)); for (i = 0; i < s.length; i++) { c = s.charCodeAt(i); out.push(c); } return new Uint8Array(out); }

  /* ---------- one guide as a simple model ---------- */
  var statusFn = null;
  function stat(l) { return statusFn ? statusFn(l) : { status: l.status, checkedOn: l.checkedOn, sources: l.sources || [], unconfirmed: l.unconfirmed || [] }; }
  function statusLine(l) {
    var s = stat(l), st = s.status === 'checked' ? 'Checked' : s.status === 'partly' ? 'Partly checked' : 'General guidance, not checked against a named official source';
    return st + (s.checkedOn ? ' (' + s.checkedOn + ')' : '');
  }
  function model(l) {
    var b = [];
    function add(h, kind, items) { if (items && items.length) b.push({ h: h, kind: kind, items: items }); }
    if (l.first) {
      add('Do this first', 'ol', l.first); add('What to do', 'ol', l.do);
      (l.sections || []).forEach(function (s) { add(s.h, 'ul', s.items); });
      add('Warnings', 'ul', l.warn); add('Tips', 'ul', l.tip); add('After', 'ul', l.after);
    } else {
      add('Steps', 'ol', (l.steps || []).map(function (x) { return Array.isArray(x) ? x[0] + ': ' + x[1] : x; }));
      if (l.warning) add('Warning', 'ul', [l.warning]);
    }
    var S = stat(l), unc = (S.unconfirmed || []).slice();
    if (S.status === 'general' && unc.length > 1) unc = unc.slice(1);
    var src = (S.sources || []).map(function (x) { return x[0] + ' - ' + x[1]; });
    var fb = window.LOAD_FALLBACK && window.LOAD_FALLBACK[l.id];
    if (fb) { var at = 0; for (var q = 0; q < b.length; q++) if (/^(Warnings|Warning)$/.test(b[q].h)) { at = q; break; } if (!at) at = b.length; b.splice(at, 0, { h: fb.h + ': ' + fb.lead, kind: 'ol', items: fb.items }); }
    return { title: l.title, area: l.area || '', intro: l.intro || '', status: statusLine(l), table: l.table || null, blocks: b, unconfirmed: unc, sources: src };
  }
  function tableHtml(t) {
    if (!t || !t.head) return '';
    return '<table><thead><tr>' + t.head.map(function (h) { return '<th>' + esc(h) + '</th>'; }).join('') + '</tr></thead><tbody>' +
      (t.rows || []).map(function (r) { return '<tr>' + r.map(function (c) { return '<td>' + esc(c) + '</td>'; }).join('') + '</tr>'; }).join('') + '</tbody></table>';
  }
  function bodyHtml(l) {
    var m = model(l), h = '<article><h1>' + esc(m.title) + '</h1><p class="meta">' + esc(m.area) + '</p><p>' + esc(m.intro) + '</p><p class="stat">' + esc(m.status) + '</p>';
    m.blocks.forEach(function (b) {
      var tag = b.kind === 'ol' ? 'ol' : 'ul';
      h += '<h2>' + esc(b.h) + '</h2><' + tag + '>' + b.items.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</' + tag + '>';
      if (b.h === 'What to do') h += tableHtml(m.table);
    });
    if (m.table && !m.blocks.some(function (b) { return b.h === 'What to do'; })) h += tableHtml(m.table);
    if (m.unconfirmed.length) h += '<h2>Not confirmed</h2><ul>' + m.unconfirmed.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>';
    if (m.sources.length) h += '<h2>Sources (need internet)</h2><ul>' + m.sources.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>';
    return h + '<p class="foot">General information only. In immediate danger call 911 (US) or 112 (Portugal). Local official instructions override this page.</p></article>';
  }
  var CSS = 'body{font-family:Arial,Helvetica,sans-serif;font-size:20px;line-height:1.6;max-width:760px;margin:0 auto;padding:16px;color:#111;background:#fff}h1{font-size:28px;line-height:1.25}h2{font-size:22px;margin-top:1.4em;border-bottom:2px solid #444;padding-bottom:4px}li{margin:.5em 0}.meta,.foot{color:#444;font-size:16px}.stat{background:#eee;padding:8px 12px;border-radius:8px;font-size:17px}table{border-collapse:collapse;width:100%;font-size:17px}th,td{border:1px solid #666;padding:6px 8px;text-align:left}article{page-break-after:always}a{color:#000}@media print{body{font-size:12pt;max-width:none;padding:0}.noprint{display:none}}';
  function page(title, inner) { return '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>' + esc(title) + '</title><style>' + CSS + '</style></head><body>' + inner + '</body></html>'; }
  function guideFile(l) { return page(l.title, bodyHtml(l)); }

  /* ---------- zip, store only ---------- */
  var T = null;
  function crc(u8) { if (!T) { T = []; for (var n = 0; n < 256; n++) { var c = n; for (var k = 0; k < 8; k++) c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1; T[n] = c >>> 0; } } var r = 0xFFFFFFFF; for (var i = 0; i < u8.length; i++) r = T[(r ^ u8[i]) & 255] ^ (r >>> 8); return (r ^ 0xFFFFFFFF) >>> 0; }
  function zip(files) {
    var parts = [], cen = [], off = 0, d = new Date(), time = (d.getHours() << 11) | (d.getMinutes() << 5) | (d.getSeconds() >> 1), date = ((d.getFullYear() - 1980) << 9) | ((d.getMonth() + 1) << 5) | d.getDate();
    function u16(v) { return [v & 255, (v >> 8) & 255]; } function u32(v) { return [v & 255, (v >> 8) & 255, (v >> 16) & 255, (v >>> 24) & 255]; }
    files.forEach(function (f) {
      var nm = bytes(f.name), data = bytes(f.data), c = crc(data);
      var lh = [].concat(u32(0x04034b50), u16(20), u16(0x0800), u16(0), u16(time), u16(date), u32(c), u32(data.length), u32(data.length), u16(nm.length), u16(0));
      parts.push(new Uint8Array(lh), nm, data);
      cen.push({ nm: nm, c: c, len: data.length, off: off });
      off += lh.length + nm.length + data.length;
    });
    var cs = off;
    cen.forEach(function (e) {
      var h = [].concat(u32(0x02014b50), u16(20), u16(20), u16(0x0800), u16(0), u16(time), u16(date), u32(e.c), u32(e.len), u32(e.len), u16(e.nm.length), u16(0), u16(0), u16(0), u16(0), u32(0), u32(e.off));
      parts.push(new Uint8Array(h), e.nm); off += h.length + e.nm.length;
    });
    var end = [].concat(u32(0x06054b50), u16(0), u16(0), u16(cen.length), u16(cen.length), u32(off - cs), u32(cs), u16(0));
    parts.push(new Uint8Array(end));
    return new Blob(parts, { type: 'application/zip' });
  }
  function save(name, blob) {
    try {
      var url = URL.createObjectURL(blob), a = document.createElement('a');
      a.href = url; a.download = name; a.style.display = 'none'; document.body.appendChild(a); a.click();
      setTimeout(function () { try { document.body.removeChild(a); URL.revokeObjectURL(url); } catch (e) {} }, 4000);
      return true;
    } catch (e) { return false; }
  }

  /* ---------- packs ---------- */
  function packs(ctx) {
    var L = ctx.lessons, by = {}; L.forEach(function (l) { by[l.id] = l; });
    function ids(f) { return L.filter(f).map(function (l) { return l.id; }); }
    function uniq(a) { var s = {}; return a.filter(function (x) { if (s[x] || !by[x]) return false; s[x] = 1; return true; }); }
    var P = window.LOAD_PLACES || { portugal: [], us: [], names: {} }, places = [];
    P.portugal.forEach(function (id) { places.push(id); });
    P.us.forEach(function (s) { s.ids.forEach(function (id) { places.push(id); }); });
    var out = { people: [], places: [], topics: [], all: [] };
    function pk(group, id, label, list) { list = uniq(list); if (list.length) out[group].push({ id: id, label: label, ids: list }); }
    pk('people', 'p-older', 'The older woman', ['hh-older-woman', 'hh-menopause', 'hh-dust-allergy'].concat(ids(function (l) { return /^sen-/.test(l.id); })));
    pk('people', 'p-seniors', 'Seniors', ids(function (l) { return ctx.cat(l) === 'seniors'; }));
    pk('people', 'p-preg', 'Pregnancy', ids(function (l) { return ctx.cat(l) === 'pregnancy'; }));
    pk('people', 'p-dogs', 'Dogs and pets', ids(function (l) { return /(^|-)(dog|dogs|pet|pets)(-|$)/.test(l.id) || /\b(dog|dogs|pets?)\b/i.test(l.title); }));
    pk('people', 'p-house', 'Our household (6 people, 5 dogs)', ids(function (l) { return /^hh-/.test(l.id); }).concat(['stockpile-basics', 'dog-stockpile', 'g-pets', 'g-power-outage']));
    places.forEach(function (id) { var g = by[id]; if (g) pk('places', id, P.names[id] || g.title, [id].concat(ctx.related[id] || [])); });
    [['water', 'Water'], ['power', 'Power'], ['fire', 'Fire'], ['shelter', 'Shelter'], ['food', 'Food'], ['home', 'Home skills'], ['security', 'Security'], ['medical', 'Medical'], ['disasters', 'Disasters'], ['scenarios', 'Scenarios'], ['essentials', 'Essentials'], ['longterm', 'Long-term']].forEach(function (c) {
      pk('topics', 't-' + c[0], c[1], ids(function (l) { return ctx.cat(l) === c[0]; }));
    });
    pk('topics', 't-comms', 'Communicate when phones fail', ids(function (l) { return /^comm-/.test(l.id) || ['lim-comms', 'es-radios-alerts', 'lt-ham-radio'].indexOf(l.id) >= 0; })),
    pk('topics', 't-solar', 'Solar and battery projects', ids(function (l) { return /^sol-/.test(l.id) || ['lt2-solar', 'ps-sizing', 'ps-safety', 'ps-lithium'].indexOf(l.id) >= 0; })),
    pk('topics', 't-blackout', 'Total blackout', ids(function (l) { return ['scn-total-blackout', 'pw-station-plug-play', 'pw-electrician-ask', 'sal-salvage-inspect', 'san-two-bucket', 'comm-listen-log', 'sec-dark-night', 'lim-power-outage', 'lim-water-none', 'lim-sanitation', 'warm-one-room'].indexOf(l.id) >= 0; })),
    pk('topics', 't-grow', 'Grow food, eat and trap', ids(function (l) { return /^(gr-|eat-|trap-|gather-|diet-)/.test(l.id) || ['lt2-seeds', 'hs-grow-small', 'lt-garden-plan', 'wf-trapping', 'wf-fishing-gear', 'crabs-shrimp-lobster'].indexOf(l.id) >= 0; }));
    pk('all', 'all', 'Every guide', ids(function () { return true; }));
    return out;
  }
  function readme(label, list, by) {
    return 'LOAD Survival pack: ' + label + '\r\n' + list.length + ' guides. Made on ' + new Date().toISOString().slice(0, 10) + '.\r\n\r\n' +
      'How to use:\r\n1. Open index.html. Tap a guide to read it. No internet and no app needed.\r\n2. To print: open print-all.html and use Print on your device.\r\n3. Keep a copy on paper and on a second device.\r\n\r\n' +
      'These are general guides, many only partly checked. Each says what is not confirmed. Local official instructions override them. Emergency numbers: 911 (US), 112 (Portugal).\r\n';
  }
  function build(pack, by) {
    var files = [], idx = '<h1>' + esc(pack.label) + '</h1><p class="meta">' + pack.ids.length + ' guides. Open any one. Works with no internet.</p><p><a href="print-all.html">One file for printing: print-all.html</a></p><ul>', all = '';
    pack.ids.forEach(function (id, i) {
      var l = by[id], nm = ('00' + (i + 1)).slice(-3) + '-' + slug(l.title) + '.html';
      files.push({ name: nm, data: guideFile(l) });
      idx += '<li><a href="' + nm + '">' + esc(l.title) + '</a></li>';
      all += bodyHtml(l);
    });
    files.unshift({ name: 'index.html', data: page(pack.label, idx + '</ul>') });
    files.push({ name: 'print-all.html', data: page(pack.label + ' (print)', all) });
    files.push({ name: 'README.txt', data: readme(pack.label, pack.ids, by) });
    return files;
  }
  function zipPack(pack, by) { return zip(build(pack, by)); }
  function onePage(pack, by) { return new Blob([page(pack.label + ' (print)', pack.ids.map(function (id) { return bodyHtml(by[id]); }).join(''))], { type: 'text/html' }); }

  window.LOAD_EXPORT = { setStatus: function (f) { statusFn = f; }, guideFile: guideFile, packs: packs, build: build, zip: zip, zipPack: zipPack, onePage: onePage, save: save, slug: slug, crc: crc };
})();
