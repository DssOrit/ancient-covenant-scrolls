/* Load Science app. Static, offline-first. All content comes from data.js. */
(function () {
  "use strict";
  var LS = window.LS;
  var app = document.getElementById("app");
  var SIZE_KEY = "loadscience-fs";

  function store(get, k, v) {
    try { if (get) { return localStorage.getItem(k); } localStorage.setItem(k, v); } catch (e) {}
    return null;
  }

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) { n.className = cls; }
    if (text !== undefined) { n.textContent = text; }
    return n;
  }

  function link(label, url) {
    var a = el("a", "", label);
    a.href = url; a.target = "_blank"; a.rel = "noopener noreferrer";
    return a;
  }

  function tagBadge(tag) {
    var b = el("span", "tag", tag === "NOTSUPPORTED" ? "NOT SUPPORTED" : tag);
    b.title = LS.tags[tag] || "";
    return b;
  }

  function itemNode(it) {
    var d = el("div", "item t-" + it.tag);
    d.appendChild(tagBadge(it.tag));
    d.appendChild(el("p", "", it.t));
    if (it.src && it.src.length) {
      var s = el("p", "src", "Source: ");
      it.src.forEach(function (x, i) {
        if (i) { s.appendChild(document.createTextNode(" | ")); }
        s.appendChild(link(x.l, x.u));
      });
      d.appendChild(s);
    }
    return d;
  }

  function tableNode(t) {
    var wrap = el("div", "tablewrap");
    var tb = el("table");
    var cap = el("caption", "", "");
    cap.style.display = "none";
    tb.appendChild(cap);
    var hr = el("tr");
    t.head.forEach(function (h) { var th = el("th", "", h); th.scope = "col"; hr.appendChild(th); });
    var thead = el("thead"); thead.appendChild(hr); tb.appendChild(thead);
    var tbody = el("tbody");
    t.rows.forEach(function (r) {
      var tr = el("tr");
      r.forEach(function (c, i) {
        var td = el(i === 0 ? "th" : "td", "", c === "NOTSUPPORTED" ? "NOT SUPPORTED" : c);
        if (i === 0) { td.scope = "row"; }
        if (i === r.length - 1 && LS.tags[c]) { td.style.fontWeight = "bold"; }
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });
    tb.appendChild(tbody);
    wrap.appendChild(tb);
    return wrap;
  }

  /* Vertical spectrum ladder: low energy at top, high energy at bottom. */
  var LADDER = [
    ["Radio and extremely low frequency", "VERIFIED (cells), CONFLICTING (RF)"],
    ["Microwave", "UNVERIFIED"],
    ["Terahertz", "VERIFIED"],
    ["Infrared", "VERIFIED (nanoparticles)"],
    ["Visible light", "VERIFIED"],
    ["Ultraviolet", "VERIFIED"],
    ["X-ray", "UNVERIFIED"],
    ["Gamma ray", "VERIFIED (radical quenching)"]
  ];
  function ladderSvg() {
    var NS = "http://www.w3.org/2000/svg";
    var rowH = 62, W = 360, H = LADDER.length * rowH + 40;
    var svg = document.createElementNS(NS, "svg");
    svg.setAttribute("viewBox", "0 0 " + W + " " + H);
    svg.setAttribute("class", "spec");
    svg.setAttribute("role", "img");
    svg.setAttribute("aria-label", "Electromagnetic spectrum from radio at the top to gamma at the bottom, with the status of melanin evidence for each band.");
    function t(x, y, s, size, weight, anchor) {
      var n = document.createElementNS(NS, "text");
      n.setAttribute("x", x); n.setAttribute("y", y);
      n.setAttribute("font-size", size); n.setAttribute("fill", "currentColor");
      if (weight) { n.setAttribute("font-weight", weight); }
      if (anchor) { n.setAttribute("text-anchor", anchor); }
      n.textContent = s; return n;
    }
    svg.appendChild(t(10, 18, "Low energy", 13, "bold"));
    LADDER.forEach(function (r, i) {
      var y = 30 + i * rowH;
      var w = 40 + (i / (LADDER.length - 1)) * (W - 70);
      var bar = document.createElementNS(NS, "rect");
      bar.setAttribute("x", 10); bar.setAttribute("y", y);
      bar.setAttribute("width", w); bar.setAttribute("height", 12);
      bar.setAttribute("rx", 4); bar.setAttribute("fill", "currentColor");
      bar.setAttribute("opacity", String(0.25 + 0.6 * (i / (LADDER.length - 1))));
      svg.appendChild(bar);
      svg.appendChild(t(10, y + 32, r[0], 16, "bold"));
      svg.appendChild(t(10, y + 50, r[1], 13));
    });
    svg.appendChild(t(10, H - 6, "High energy", 13, "bold"));
    return svg;
  }

  function sectionById(id) {
    for (var i = 0; i < LS.sections.length; i++) { if (LS.sections[i].id === id) { return i; } }
    return -1;
  }

  function homeView() {
    var f = document.createDocumentFragment();
    var logo = el("img", "logo");
    logo.src = "icons/logo-hero.jpg"; logo.alt = "Load Science logo";
    logo.width = 640; logo.height = 640;
    f.appendChild(logo);
    f.appendChild(el("h1", "", "Load Science"));
    f.appendChild(el("p", "lead", "Melanin research. Every claim carries a tag that says how well it is verified. Research date: " + LS.date + "."));
    var ul = el("ul", "menu");
    LS.sections.forEach(function (s) {
      var li = el("li");
      var a = el("a"); a.href = "#/s/" + s.id;
      a.appendChild(el("strong", "", s.title));
      a.appendChild(el("span", "", s.blurb));
      li.appendChild(a); ul.appendChild(li);
    });
    var lt = el("li"); var at = el("a"); at.href = "#/tags";
    at.appendChild(el("strong", "", "Find by tag"));
    at.appendChild(el("span", "", "See every claim with one tag, across all pages."));
    lt.appendChild(at); ul.appendChild(lt);
    var ls = el("li"); var as = el("a"); as.href = "#/sources";
    as.appendChild(el("strong", "", "All sources"));
    as.appendChild(el("span", "", "Every link used in this app."));
    ls.appendChild(as); ul.appendChild(ls);
    f.appendChild(ul);
    f.appendChild(el("h2", "", "What the tags mean"));
    Object.keys(LS.tags).forEach(function (k) {
      f.appendChild(itemNode({ tag: k, t: LS.tags[k] }));
    });
    return f;
  }

  function sectionView(id) {
    var idx = sectionById(id);
    if (idx < 0) { return notFound(); }
    var s = LS.sections[idx];
    var f = document.createDocumentFragment();
    f.appendChild(el("h1", "", s.title));
    f.appendChild(el("p", "lead", s.blurb));
    s.blocks.forEach(function (b) {
      f.appendChild(el("h2", "", b.h));
      if (b.intro) { f.appendChild(el("p", "", b.intro)); }
      if (b.spectrum) { f.appendChild(ladderSvg()); }
      if (b.table) { f.appendChild(tableNode(b.table)); }
      (b.items || []).forEach(function (it) { f.appendChild(itemNode(it)); });
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

  function tagsView(tag) {
    var f = document.createDocumentFragment();
    f.appendChild(el("h1", "", "Find by tag"));
    var row = el("div", "filters");
    row.setAttribute("role", "group"); row.setAttribute("aria-label", "Tag filter");
    Object.keys(LS.tags).forEach(function (k) {
      var b = el("button", "", k === "NOTSUPPORTED" ? "NOT SUPPORTED" : k);
      b.type = "button";
      b.setAttribute("aria-pressed", String(k === tag));
      b.addEventListener("click", function () { location.hash = "#/tags/" + k; });
      row.appendChild(b);
    });
    f.appendChild(row);
    if (!tag || !LS.tags[tag]) {
      f.appendChild(el("p", "lead", "Pick a tag to list every claim that carries it."));
      return f;
    }
    f.appendChild(el("p", "lead", LS.tags[tag]));
    var n = 0;
    LS.sections.forEach(function (s) {
      var hits = [];
      s.blocks.forEach(function (b) {
        (b.items || []).forEach(function (it) { if (it.tag === tag) { hits.push(it); } });
        if (b.table) {
          b.table.rows.forEach(function (r) {
            if (r[r.length - 1] === tag) { hits.push({ tag: tag, t: r[0] + ": " + r[1] }); }
          });
        }
      });
      if (hits.length) {
        var h = el("h2"); var a = el("a", "", s.title); a.href = "#/s/" + s.id; h.appendChild(a);
        f.appendChild(h);
        hits.forEach(function (it) { f.appendChild(itemNode(it)); n++; });
      }
    });
    f.appendChild(el("p", "lead", n + " claims carry this tag."));
    return f;
  }

  function sourcesView() {
    var f = document.createDocumentFragment();
    f.appendChild(el("h1", "", "All sources"));
    f.appendChild(el("p", "lead", "Checked at abstract or summary level. Full texts were not read. The radio and terahertz entry (PMC12631427) came up with the Motovilov broadband work; confirm which record holds the paper before citing."));
    var ul = el("ul", "menu");
    LS.sources.forEach(function (s) {
      var li = el("li", "card");
      li.appendChild(link(s.l, s.u));
      ul.appendChild(li);
    });
    f.appendChild(ul);
    return f;
  }

  function notFound() {
    var f = document.createDocumentFragment();
    f.appendChild(el("h1", "", "Page not found"));
    var a = el("a", "", "Go to home"); a.href = "#/";
    f.appendChild(a);
    return f;
  }

  function route() {
    var h = location.hash.replace(/^#\/?/, "");
    var p = h.split("/");
    var view;
    if (!h) { view = homeView(); }
    else if (p[0] === "s") { view = sectionView(p[1]); }
    else if (p[0] === "tags") { view = tagsView(p[1]); }
    else if (p[0] === "sources") { view = sourcesView(); }
    else { view = notFound(); }
    if (window.speechSynthesis) { window.speechSynthesis.cancel(); }
    app.textContent = "";
    app.appendChild(view);
    var title = app.querySelector("h1");
    document.title = (title ? title.textContent + " - " : "") + "Load Science";
    window.scrollTo(0, 0);
    document.getElementById("main").focus();
  }

  /* Text size */
  var fs = parseInt(store(true, SIZE_KEY), 10);
  if (!(fs >= 16 && fs <= 32)) { fs = 20; }
  function applySize() {
    document.documentElement.style.setProperty("--fs", fs + "px");
    store(false, SIZE_KEY, String(fs));
  }
  applySize();
  document.getElementById("bigger").addEventListener("click", function () { if (fs < 32) { fs += 2; applySize(); } });
  document.getElementById("smaller").addEventListener("click", function () { if (fs > 16) { fs -= 2; applySize(); } });

  /* Read aloud */
  var speakBtn = document.getElementById("speak");
  speakBtn.addEventListener("click", function () {
    var s = window.speechSynthesis;
    if (!s) { speakBtn.textContent = "No voice here"; return; }
    if (s.speaking) { s.cancel(); speakBtn.textContent = "Read aloud"; return; }
    var u = new SpeechSynthesisUtterance(app.innerText);
    u.rate = 0.9;
    u.onend = function () { speakBtn.textContent = "Read aloud"; };
    speakBtn.textContent = "Stop";
    s.speak(u);
  });

  /* Hard refresh, scoped to this app only (locked rule 21). */
  document.getElementById("refresh").addEventListener("click", async function () {
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
    location.reload(true);
  });

  document.getElementById("ver").textContent = LS.version;
  window.addEventListener("hashchange", route);
  route();

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
      navigator.serviceWorker.register("sw.js", { scope: "./" }).catch(function () {});
    });
  }
})();
