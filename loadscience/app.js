/* Load Science app. Static, offline-first. All content comes from data.js.
   Layout follows ACR Search: top bar with search and tag pills, feature cards,
   result cards. Reading aids: text size, colours, spacing, read aloud. */
(function () {
  "use strict";
  var LS = window.LS;
  var view = document.getElementById("view");
  var qInput = document.getElementById("q");
  var qClear = document.getElementById("qclear");
  var pillsEl = document.getElementById("pills");
  var settings = document.getElementById("settings");
  var root = document.documentElement;
  var KEY = "loadscience-";

  var LABEL = {
    VERIFIED: "Verified", SECONDARY: "Secondary only", UNVERIFIED: "Unverified",
    READING: "Reading", NOTSUPPORTED: "Not supported", OPEN: "Open",
    CONFLICTING: "Conflicting", HYPOTHESIS: "Hypothesis", CALCULATED: "Calculated",
    TEXT: "ACR text", HELD: "Held under warning", NOTEXT: "Not in the text",
    PASTED: "Your paste"
  };
  var tagKeys = Object.keys(LS.tags);
  var curTag = "all";

  function store(get, k, v) {
    try { if (get) { return localStorage.getItem(KEY + k); } localStorage.setItem(KEY + k, v); } catch (e) {}
    return null;
  }
  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) { n.className = cls; }
    if (text !== undefined) { n.textContent = text; }
    return n;
  }
  function ext(label, url) {
    var a = el("a", "", label);
    a.href = url; a.target = "_blank"; a.rel = "noopener noreferrer";
    return a;
  }
  function badge(tag) {
    var b = el("span", "tag", LABEL[tag] || tag);
    b.title = LS.tags[tag] || "";
    return b;
  }
  function srcLine(src) {
    var s = el("p", "src", "Source: ");
    src.forEach(function (x, i) {
      if (i) { s.appendChild(document.createTextNode(" | ")); }
      s.appendChild(ext(x.l, x.u));
    });
    return s;
  }
  function esc(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }

  function withMarks(text, words) {
    if (!words.length) { return document.createTextNode(text); }
    var re = new RegExp("(" + words.map(esc).join("|") + ")", "gi");
    var f = document.createDocumentFragment();
    var last = 0, m;
    while ((m = re.exec(text)) !== null) {
      if (m.index > last) { f.appendChild(document.createTextNode(text.slice(last, m.index))); }
      f.appendChild(el("mark", "", m[0]));
      last = m.index + m[0].length;
      if (m[0].length === 0) { re.lastIndex++; }
    }
    if (last < text.length) { f.appendChild(document.createTextNode(text.slice(last))); }
    return f;
  }

  /* Stable id for a claim, so it can be saved. */
  function idOf(title, text) {
    var str = (title || "") + "|" + text, h = 5381;
    for (var i = 0; i < str.length; i++) { h = ((h << 5) + h + str.charCodeAt(i)) | 0; }
    return "c" + (h >>> 0).toString(36);
  }
  function savedIds() {
    var raw = store(true, "saved"), a = [];
    try { a = JSON.parse(raw || "[]"); } catch (e) { a = []; }
    return Array.isArray(a) ? a : [];
  }
  function isSaved(id) { return savedIds().indexOf(id) >= 0; }
  function toggleSave(id) {
    var a = savedIds(), i = a.indexOf(id);
    if (i >= 0) { a.splice(i, 1); } else { a.push(id); }
    store(false, "saved", JSON.stringify(a));
    return i < 0;
  }
  function clearSaved() { store(false, "saved", "[]"); }

  /* One claim card. Used on section pages and in search results. */
  function claimCard(it, opts) {
    opts = opts || {};
    var c = el("div", "card t-" + it.tag);
    if (opts.ref) { c.appendChild(el("div", "ref", opts.ref)); }
    if (it.title) { c.appendChild(el("h3", "", it.title)); }
    c.appendChild(badge(it.tag));
    var p = el("p", it.pre ? (it.diagram ? "pre diagram" : "pre") : "");
    p.appendChild(withMarks(it.t, opts.words || []));
    c.appendChild(p);
    if (it.cite) { c.appendChild(el("p", "src", "Where: " + it.cite)); }
    if (it.src && it.src.length) { c.appendChild(srcLine(it.src)); }
    var foot = el("div", "row-actions");
    if (!opts.noSave) {
      var cid = idOf(it.title, it.t);
      var sv = el("button", "btn save", isSaved(cid) ? "Saved" : "Save");
      sv.type = "button";
      sv.setAttribute("aria-pressed", String(isSaved(cid)));
      sv.setAttribute("aria-label", (isSaved(cid) ? "Remove from saved: " : "Save this claim: ") + it.t.slice(0, 60));
      sv.addEventListener("click", function () {
        var on = toggleSave(cid);
        sv.textContent = on ? "Saved" : "Save";
        sv.setAttribute("aria-pressed", String(on));
        if (opts.onSave) { opts.onSave(on); }
      });
      foot.appendChild(sv);
    }
    if (it.go) {
      var g = el("a", "open", it.goLabel || "Open");
      g.href = "#/" + it.go; foot.appendChild(g);
    }
    if (opts.open) {
      var a = el("a", "open", "Open this page");
      a.href = "#/s/" + opts.open; foot.appendChild(a);
    }
    if (foot.childNodes.length) { c.appendChild(foot); }
    return c;
  }

  /* Index of every claim, for search */
  var INDEX = [];
  LS.sections.forEach(function (s) {
    s.blocks.forEach(function (b) {
      (b.items || []).forEach(function (it) {
        INDEX.push({ id: idOf(it.title, it.t), sec: s, block: b.h, tag: it.tag, t: it.t, src: it.src, cite: it.cite, go: it.go, goLabel: it.goLabel });
      });
      if (b.table) {
        b.table.rows.forEach(function (r) {
          INDEX.push({ id: idOf(r[0], r[1]), sec: s, block: b.h, tag: r[r.length - 1], title: r[0], t: r[1] });
        });
      }
    });
  });

  var BYID = {};
  INDEX.forEach(function (e) { if (!BYID[e.id]) { BYID[e.id] = e; } });
  function entryById(id) { return BYID[id] || null; }

  /* Spectrum ladder, low energy at top */
  var LADDER = [
    ["Radio and extremely low frequency", "Verified in cells. Radio exposure: conflicting."],
    ["Microwave", "Unverified. No melanin data found."],
    ["Terahertz", "Verified."],
    ["Infrared", "Verified in nanoparticles."],
    ["Visible light", "Verified."],
    ["Ultraviolet", "Verified."],
    ["X-ray", "Unverified. No published coefficients."],
    ["Gamma ray", "Verified: radical quenching."]
  ];
  function ladderSvg() {
    var NS = "http://www.w3.org/2000/svg";
    var rowH = 72, W = 360, H = LADDER.length * rowH + 44;
    var svg = document.createElementNS(NS, "svg");
    svg.setAttribute("viewBox", "0 0 " + W + " " + H);
    svg.setAttribute("class", "spec");
    svg.setAttribute("role", "img");
    svg.setAttribute("aria-label", "Electromagnetic spectrum from radio at the top to gamma at the bottom, with the status of the melanin evidence for each band.");
    function t(x, y, s, size, weight) {
      var n = document.createElementNS(NS, "text");
      n.setAttribute("x", x); n.setAttribute("y", y);
      n.setAttribute("font-size", size); n.setAttribute("fill", "currentColor");
      if (weight) { n.setAttribute("font-weight", weight); }
      n.textContent = s; return n;
    }
    svg.appendChild(t(12, 22, "Low energy", 15, "bold"));
    LADDER.forEach(function (r, i) {
      var y = 36 + i * rowH;
      var w = 40 + (i / (LADDER.length - 1)) * (W - 76);
      var bar = document.createElementNS(NS, "rect");
      bar.setAttribute("class", "bar");
      bar.setAttribute("x", 12); bar.setAttribute("y", y);
      bar.setAttribute("width", w); bar.setAttribute("height", 10);
      bar.setAttribute("rx", 5);
      bar.setAttribute("opacity", String(0.35 + 0.65 * (i / (LADDER.length - 1))));
      svg.appendChild(bar);
      svg.appendChild(t(12, y + 32, r[0], 17, "bold"));
      svg.appendChild(t(12, y + 54, r[1], 14));
    });
    svg.appendChild(t(12, H - 8, "High energy", 15, "bold"));
    return svg;
  }

  /* Photon chart: stopping per gram against photon energy, both axes log. */
  function photonChartSvg() {
    var P = LS.photon, NS = "http://www.w3.org/2000/svg";
    var W = 360, H = 330, L = 46, R = 84, T = 30, B = 52, pw = W - L - R, ph = H - T - B;
    var xMin = 10, xMax = 700, yMin = 0.05, yMax = 200;
    function X(e) { return L + Math.log(e / xMin) / Math.log(xMax / xMin) * pw; }
    function Y(m) { return T + (1 - Math.log(m / yMin) / Math.log(yMax / yMin)) * ph; }
    var svg = document.createElementNS(NS, "svg");
    svg.setAttribute("viewBox", "0 0 " + W + " " + H);
    svg.setAttribute("class", "spec");
    svg.setAttribute("role", "img");
    svg.setAttribute("aria-label", "Chart of how much melanin, cellulose, water and lead stop per gram, from 10 to 700 keV, both axes on a log scale. Melanin sits just under cellulose and water. Lead is far higher, with jumps at its absorption edges.");
    function node(n, a, txt) {
      var e = document.createElementNS(NS, n);
      Object.keys(a).forEach(function (k) { e.setAttribute(k, a[k]); });
      if (txt !== undefined) { e.textContent = txt; }
      return e;
    }
    svg.appendChild(node("text", { x: 8, y: 18, "font-size": 13, "font-weight": "bold", fill: "currentColor" }, "Stopping per gram (cm2 per gram)"));
    [0.1, 1, 10, 100].forEach(function (v) {
      svg.appendChild(node("line", { x1: L, x2: W - R, y1: Y(v), y2: Y(v), stroke: "currentColor", "stroke-opacity": 0.18 }));
      svg.appendChild(node("text", { x: L - 6, y: Y(v) + 4, "font-size": 12, "text-anchor": "end", fill: "currentColor" }, String(v)));
    });
    [10, 30, 100, 300].forEach(function (v) {
      svg.appendChild(node("line", { x1: X(v), x2: X(v), y1: T, y2: T + ph, stroke: "currentColor", "stroke-opacity": 0.18 }));
      svg.appendChild(node("text", { x: X(v), y: T + ph + 16, "font-size": 12, "text-anchor": "middle", fill: "currentColor" }, String(v)));
    });
    svg.appendChild(node("text", { x: L + pw / 2, y: H - 10, "font-size": 13, "text-anchor": "middle", fill: "currentColor", "font-weight": "bold" }, "Photon energy (keV)"));
    var styles = {
      lead: { c: "#9a9a9a", w: 2, d: "" },
      water: { c: "#4d8fd1", w: 2.4, d: "2 4" },
      cellulose: { c: "#5aa66b", w: 2.4, d: "7 4" },
      melanin: { c: "#C8971F", w: 3.6, d: "" }
    };
    var ends = [];
    ["lead", "water", "cellulose", "melanin"].forEach(function (m) {
      var d = "";
      P.E.forEach(function (e, i) { d += (i ? "L" : "M") + X(e).toFixed(1) + " " + Y(P.mu[m][i]).toFixed(1) + " "; });
      var st = styles[m];
      var attrs = { d: d, fill: "none", stroke: st.c, "stroke-width": st.w, "stroke-linejoin": "round", "stroke-linecap": "round" };
      if (st.d) { attrs["stroke-dasharray"] = st.d; }
      svg.appendChild(node("path", attrs));
      ends.push({ m: m, y: Y(P.mu[m][P.E.length - 1]), c: st.c });
    });
    ends.sort(function (a, b) { return a.y - b.y; });
    for (var i = 1; i < ends.length; i++) { if (ends[i].y - ends[i - 1].y < 15) { ends[i].y = ends[i - 1].y + 15; } }
    ends.forEach(function (e) {
      svg.appendChild(node("text", { x: W - R + 6, y: e.y + 4, "font-size": 13, "font-weight": "bold", fill: "currentColor" }, P.names[e.m]));
    });
    return svg;
  }

  function sectionIndex(id) {
    for (var i = 0; i < LS.sections.length; i++) { if (LS.sections[i].id === id) { return i; } }
    return -1;
  }
  function countClaims(s) {
    var n = 0;
    s.blocks.forEach(function (b) { n += (b.items || []).length + (b.table ? b.table.rows.length : 0); });
    return n;
  }

  /* VIEWS */
  function homeView() {
    var f = document.createDocumentFragment();
    var logo = el("img", "home-logo");
    logo.src = "icons/logo-hero.jpg"; logo.alt = "Load Science logo"; logo.width = 132; logo.height = 132;
    f.appendChild(logo);
    f.appendChild(el("div", "home-title", "Load Science"));
    f.appendChild(el("div", "home-sub", "Melanin research"));
    f.appendChild(el("div", "home-tagline", "Every claim carries a tag. Research date " + LS.date + "."));
    f.appendChild(el("p", "home-welcome", "Tap a page below. Or type a word in the search box above."));
    if (window.LSX) { f.appendChild(window.LSX.didYouKnow(helpers())); }
    f.appendChild(el("h2", "", "Try it"));
    var tools = el("div", "feat-grid");
    [["x/photon", "Photon shielding explorer", "Slide energy and thickness."],
     ["x/spectrum", "Spectrum explorer", "Radio waves up to gamma rays."],
     ["x/quiz", "Claim check", "Guess the tag. Learn why."],
     ["saved", "Saved claims", "Your own list, kept on this device."],
     ["glossary", "Glossary", "Plain-word science terms."]].forEach(function (t) {
      var a = el("a", "feat-card"); a.href = "#/" + t[0];
      a.appendChild(el("span", "fc-title", t[1]));
      a.appendChild(el("span", "fc-desc", t[2]));
      tools.appendChild(a);
    });
    f.appendChild(tools);
    f.appendChild(el("h2", "", "Read the research"));
    var grid = el("div", "feat-grid");
    LS.sections.forEach(function (s) {
      var a = el("a", "feat-card"); a.href = "#/s/" + s.id;
      a.appendChild(el("span", "fc-title", s.title));
      a.appendChild(el("span", "fc-desc", s.blurb + " (" + countClaims(s) + " claims)"));
      grid.appendChild(a);
    });
    var src = el("a", "feat-card feat-wide"); src.href = "#/sources";
    src.appendChild(el("span", "fc-title", "All sources"));
    src.appendChild(el("span", "fc-desc", "Every link used in this app."));
    grid.appendChild(src);
    f.appendChild(grid);
    f.appendChild(el("h2", "", "What the tags mean"));
    tagKeys.forEach(function (k) { f.appendChild(claimCard({ tag: k, t: LS.tags[k] }, { noSave: true })); });
    return f;
  }

  function sectionView(id) {
    var idx = sectionIndex(id);
    if (idx < 0) { return notFound(); }
    var s = LS.sections[idx];
    var f = document.createDocumentFragment();
    var back = el("a", "back", "Back to home"); back.href = "#/"; f.appendChild(back);
    f.appendChild(el("h1", "", s.title));
    f.appendChild(el("p", "lead", s.blurb));
    s.blocks.forEach(function (b) {
      f.appendChild(el("h2", "", b.h));
      if (b.intro) { f.appendChild(el("p", "", b.intro)); }
      if (b.spectrum) { f.appendChild(ladderSvg()); }
      if (b.chart === "photon") { f.appendChild(photonChartSvg()); }
      if (b.table) {
        b.table.rows.forEach(function (r) {
          f.appendChild(claimCard({ tag: r[r.length - 1], title: r[0], t: r[1] }));
        });
      }
      (b.items || []).forEach(function (it) { f.appendChild(claimCard(it)); });
    });
    var nav = el("div", "nav");
    var prev = LS.sections[idx - 1], next = LS.sections[idx + 1];
    var a1 = el("a", "", prev ? "Back: " + prev.title : "Home");
    a1.href = prev ? "#/s/" + prev.id : "#/";
    nav.appendChild(a1);
    var a2 = el("a", "", next ? "Next: " + next.title : "All sources");
    a2.href = next ? "#/s/" + next.id : "#/sources";
    nav.appendChild(a2);
    f.appendChild(nav);
    return f;
  }

  function sourcesView() {
    var f = document.createDocumentFragment();
    var back = el("a", "back", "Back to home"); back.href = "#/"; f.appendChild(back);
    f.appendChild(el("h1", "", "All sources"));
    f.appendChild(el("p", "lead", "Checked at abstract or summary level. Full texts were not read. The radio and terahertz entry (PMC12631427) came up with the Motovilov broadband work; confirm which record holds the paper before citing."));
    LS.sources.forEach(function (s) {
      var c = el("div", "card");
      c.appendChild(ext(s.l, s.u));
      f.appendChild(c);
    });
    return f;
  }

  function findView() {
    var f = document.createDocumentFragment();
    var q = qInput.value.trim().toLowerCase();
    var words = q ? q.split(/\s+/) : [];
    if (!words.length && curTag === "all") {
      f.appendChild(el("h1", "", "Search"));
      f.appendChild(el("p", "lead", "Type a word, or pick a tag above. Try one of these."));
      var chips = el("div", "chips");
      ["gamma", "MFSD12", "SLC24A5", "iron", "superconductor", "microwave", "Cs-137", "barrier"].forEach(function (w) {
        var b = el("button", "chip", w); b.type = "button";
        b.addEventListener("click", function () { qInput.value = w; qClear.hidden = false; render(); });
        chips.appendChild(b);
      });
      f.appendChild(chips);
      return f;
    }
    var hits = INDEX.filter(function (e) {
      if (curTag !== "all" && e.tag !== curTag) { return false; }
      var hay = (e.t + " " + (e.title || "") + " " + e.block + " " + e.sec.title + " " + (LABEL[e.tag] || "")).toLowerCase();
      return words.every(function (w) { return hay.indexOf(w) >= 0; });
    });
    var hdr = el("div", "results-hdr",
      hits.length + (hits.length === 1 ? " claim found" : " claims found") +
      (curTag !== "all" ? " with the tag " + LABEL[curTag] : ""));
    f.appendChild(hdr);
    if (curTag !== "all") { f.appendChild(el("p", "sub", LS.tags[curTag])); }
    hits.forEach(function (e) {
      f.appendChild(claimCard(
        { tag: e.tag, title: e.title, t: e.t, src: e.src, cite: e.cite, go: e.go, goLabel: e.goLabel },
        { ref: e.sec.title + "  >  " + e.block, words: words, open: e.sec.id }
      ));
    });
    if (!hits.length) { f.appendChild(el("p", "lead", "Nothing found. Try a shorter word.")); }
    return f;
  }

  function notFound() {
    var f = document.createDocumentFragment();
    f.appendChild(el("h1", "", "Page not found"));
    var a = el("a", "back", "Go to home"); a.href = "#/"; f.appendChild(a);
    return f;
  }

  /* Helpers handed to the interactive tools in explore.js */
  function helpers() {
    return {
      el: el, ext: ext, badge: badge, claimCard: claimCard, INDEX: INDEX, LABEL: LABEL, tagKeys: tagKeys,
      savedIds: savedIds, clearSaved: clearSaved, entryById: entryById,
      rerender: function () { render(); },
      goSearch: function (term) { qInput.value = term; curTag = "all"; qClear.hidden = false; if (inFind()) { render(); } else { location.hash = "#/find"; } }
    };
  }

  /* ROUTER */
  function inFind() { return location.hash === "#/find"; }

  function render() {
    var h = location.hash.replace(/^#\/?/, "");
    var p = h.split("/");
    var node;
    if (p[0] === "find") { node = findView(); }
    else if (!h) { node = homeView(); }
    else if (p[0] === "s") { node = sectionView(p[1]); }
    else if (p[0] === "sources") { node = sourcesView(); }
    else if (p[0] === "explore" && window.LSX) { node = window.LSX.views.explore(helpers()); }
    else if (p[0] === "x" && window.LSX && window.LSX.views[p[1]]) { node = window.LSX.views[p[1]](helpers()); }
    else if ((p[0] === "saved" || p[0] === "glossary") && window.LSX) { node = window.LSX.views[p[0]](helpers()); }
    else { node = notFound(); }
    if (window.speechSynthesis) { window.speechSynthesis.cancel(); }
    view.textContent = "";
    view.appendChild(node);
    var t = view.querySelector("h1, .home-title");
    document.title = (t ? t.textContent + " - " : "") + "Load Science";
    qClear.hidden = !qInput.value;
    updatePills();
  }

  function onHash() {
    if (!inFind()) { qInput.value = ""; curTag = "all"; }
    render();
    window.scrollTo(0, 0);
    document.getElementById("main").focus({ preventScroll: true });
  }

  /* Tag pills */
  function buildPills() {
    var all = el("button", "mpill", "All"); all.type = "button"; all.dataset.tag = "all";
    pillsEl.appendChild(all);
    tagKeys.forEach(function (k) {
      var b = el("button", "mpill", LABEL[k]); b.type = "button"; b.dataset.tag = k;
      b.title = LS.tags[k];
      pillsEl.appendChild(b);
    });
    pillsEl.addEventListener("click", function (e) {
      var b = e.target.closest ? e.target.closest(".mpill") : null;
      if (!b) { return; }
      curTag = b.dataset.tag;
      goFind();
    });
  }
  function updatePills() {
    var show = inFind() || document.activeElement === qInput;
    pillsEl.hidden = !show;
    Array.prototype.forEach.call(pillsEl.children, function (b) {
      b.setAttribute("aria-pressed", String(b.dataset.tag === curTag));
    });
  }
  function goFind() {
    if (!inFind()) { location.hash = "#/find"; } else { render(); }
  }

  qInput.addEventListener("input", function () {
    qClear.hidden = !qInput.value;
    if (!qInput.value && curTag === "all" && inFind()) { render(); return; }
    goFind();
  });
  qInput.addEventListener("focus", updatePills);
  qInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") { qInput.blur(); goFind(); }
  });
  qClear.addEventListener("click", function () {
    qInput.value = ""; curTag = "all"; qClear.hidden = true; qInput.focus(); goFind();
  });

  /* READING SETTINGS */
  var fs = parseInt(store(true, "fs"), 10);
  if (!(fs >= 18 && fs <= 32)) { fs = 20; }
  var theme = store(true, "theme") === "cream" ? "cream" : "dark";
  var spacing = store(true, "spacing") === "wide" ? "wide" : "normal";

  function applyReading() {
    root.style.setProperty("--fs", fs + "px");
    root.setAttribute("data-theme", theme);
    root.setAttribute("data-spacing", spacing);
    document.getElementById("fsval").textContent = String(fs);
    document.getElementById("th-dark").setAttribute("aria-pressed", String(theme === "dark"));
    document.getElementById("th-cream").setAttribute("aria-pressed", String(theme === "cream"));
    document.getElementById("sp-normal").setAttribute("aria-pressed", String(spacing === "normal"));
    document.getElementById("sp-wide").setAttribute("aria-pressed", String(spacing === "wide"));
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) { meta.setAttribute("content", theme === "cream" ? "#f6f1e4" : "#0D0B07"); }
    store(false, "fs", String(fs)); store(false, "theme", theme); store(false, "spacing", spacing);
  }
  applyReading();

  var aa = document.getElementById("aa");
  aa.addEventListener("click", function () {
    var open = settings.hidden;
    settings.hidden = !open;
    aa.setAttribute("aria-expanded", String(open));
  });
  document.getElementById("bigger").addEventListener("click", function () { if (fs < 32) { fs += 2; applyReading(); } });
  document.getElementById("smaller").addEventListener("click", function () { if (fs > 18) { fs -= 2; applyReading(); } });
  document.getElementById("th-dark").addEventListener("click", function () { theme = "dark"; applyReading(); });
  document.getElementById("th-cream").addEventListener("click", function () { theme = "cream"; applyReading(); });
  document.getElementById("sp-normal").addEventListener("click", function () { spacing = "normal"; applyReading(); });
  document.getElementById("sp-wide").addEventListener("click", function () { spacing = "wide"; applyReading(); });

  /* Read aloud */
  var speakBtn = document.getElementById("speak");
  speakBtn.addEventListener("click", function () {
    var s = window.speechSynthesis;
    if (!s) { speakBtn.textContent = "No voice here"; return; }
    if (s.speaking) { s.cancel(); speakBtn.textContent = "Read aloud"; return; }
    var u = new SpeechSynthesisUtterance(view.innerText);
    u.rate = 0.9;
    u.onend = function () { speakBtn.textContent = "Read aloud"; };
    speakBtn.textContent = "Stop";
    s.speak(u);
  });

  /* Refresh circle. Hard refresh scoped to Load Science only (locked rule 21):
     it deletes only caches whose name starts with "loadscience-", unregisters only
     service workers whose scope contains "/loadscience/", then re-fetches this
     app's own files past the browser cache. Other sites are never touched, and the
     saved claims and reading settings (localStorage) are kept. */
  var refreshBtn = document.getElementById("refresh");
  var OWN_FILES = ["./", "index.html", "style.css", "data.js", "data2.js", "data3.js", "explore.js", "app.js", "sw.js", "manifest.webmanifest"];
  refreshBtn.addEventListener("click", async function () {
    if (refreshBtn.classList.contains("spin")) { return; }
    refreshBtn.classList.add("spin");
    refreshBtn.setAttribute("aria-busy", "true");
    try {
      var keys = await caches.keys();
      await Promise.all(
        keys.filter(function (k) { return k.indexOf("loadscience-") === 0; })
          .map(function (k) { return caches.delete(k); })
      );
      var regs = await navigator.serviceWorker.getRegistrations();
      await Promise.all(
        regs.filter(function (r) { return r.scope.indexOf("/loadscience/") >= 0; })
          .map(function (r) { return r.unregister(); })
      );
    } catch (e) {}
    try {
      await Promise.all(OWN_FILES.map(function (u) { return fetch(u, { cache: "reload" }).catch(function () {}); }));
    } catch (e) {}
    location.reload();
  });


  /* SPLASH: shown once per browser session, never on a deep link. Tap anywhere,
     use the Get started area, or press Enter or Escape to continue. */
  function showSplash() {
    var seen = null;
    try { seen = sessionStorage.getItem(KEY + "splash"); } catch (e) {}
    var h = location.hash;
    if (seen || (h && h !== "#/")) { return; }
    var ov = el("div", "splash");
    ov.setAttribute("role", "dialog");
    ov.setAttribute("aria-modal", "true");
    ov.setAttribute("aria-label", "Welcome to Load Science");
    var wrap = el("div", "splash-wrap");
    var img = el("img", "splash-img");
    img.src = "icons/splash.jpg";
    img.alt = "Load Science. Explore, experiment, discover, innovate.";
    img.width = 682; img.height = 989;
    wrap.appendChild(img);
    var go = el("button", "splash-go", "Get started");
    go.type = "button";
    wrap.appendChild(go);
    ov.appendChild(wrap);
    function close() {
      try { sessionStorage.setItem(KEY + "splash", "1"); } catch (e) {}
      document.removeEventListener("keydown", onKey);
      ov.classList.add("out");
      setTimeout(function () { if (ov.parentNode) { ov.parentNode.removeChild(ov); } }, 250);
      document.getElementById("main").focus({ preventScroll: true });
    }
    function onKey(e) { if (e.key === "Escape" || e.key === "Enter") { close(); } }
    ov.addEventListener("click", close);
    document.addEventListener("keydown", onKey);
    document.body.appendChild(ov);
    go.focus({ preventScroll: true });
  }

  document.getElementById("ver").textContent = LS.version;
  buildPills();
  window.addEventListener("hashchange", onHash);
  onHash();
  showSplash();

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
      navigator.serviceWorker.register("sw.js", { scope: "./" }).catch(function () {});
    });
  }
})();
