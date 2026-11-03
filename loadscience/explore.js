/* Load Science: interactive tools. Loaded before app.js. app.js passes a helper
   object H at render time. Everything works offline. */
(function () {
  "use strict";
  var LS = window.LS;

  function backLink(H, text, href) {
    var a = H.el("a", "back", text || "Back to home");
    a.href = href || "#/";
    return a;
  }

  function lbl(H, id, text) {
    var l = H.el("label", "ctl-label", text);
    l.setAttribute("for", id);
    return l;
  }

  /* ---------- Explore hub ---------- */
  var TOOLS = [
    ["x/photon", "Photon shielding explorer", "Slide the energy and thickness. See how much melanin, cellulose, water and lead stop."],
    ["x/spectrum", "Spectrum explorer", "Step from radio waves up to gamma rays. See the melanin evidence for each band."],
    ["x/quiz", "Claim check", "Read a claim. Guess its tag. Learn why."],
    ["saved", "Saved claims", "Your own list. Kept on this device. Copy it as text."],
    ["glossary", "Glossary", "Plain-word meanings for the science terms."]
  ];
  function exploreView(H) {
    var f = document.createDocumentFragment();
    f.appendChild(backLink(H));
    f.appendChild(H.el("h1", "", "Try it"));
    f.appendChild(H.el("p", "lead", "Interactive tools. They all work offline."));
    var grid = H.el("div", "feat-grid");
    TOOLS.forEach(function (t) {
      var a = H.el("a", "feat-card"); a.href = "#/" + t[0];
      a.appendChild(H.el("span", "fc-title", t[1]));
      a.appendChild(H.el("span", "fc-desc", t[2]));
      grid.appendChild(a);
    });
    f.appendChild(grid);
    return f;
  }

  /* ---------- Did you know ---------- */
  function didYouKnow(H) {
    var card = H.el("div", "card dyk");
    var last = -1;
    function show() {
      var i;
      do { i = Math.floor(Math.random() * LS.facts.length); } while (i === last && LS.facts.length > 1);
      last = i;
      var f = LS.facts[i];
      card.textContent = "";
      card.className = "card dyk t-" + f.tag;
      card.appendChild(H.el("div", "ref", "Did you know?"));
      card.appendChild(H.badge(f.tag));
      card.appendChild(H.el("p", "", f.t));
      var row = H.el("div", "row-actions");
      if (f.src) {
        var s = H.el("span", "src", "Source: "); s.appendChild(H.ext(f.src.l, f.src.u)); row.appendChild(s);
      }
      var more = H.el("button", "btn", "Show another"); more.type = "button";
      more.addEventListener("click", show);
      row.appendChild(more);
      var open = H.el("a", "open", "Open this page"); open.href = "#/" + (f.page.indexOf("/") > 0 ? f.page : "s/" + f.page);
      row.appendChild(open);
      card.appendChild(row);
    }
    show();
    return card;
  }

  /* ---------- Photon explorer ---------- */
  var P = LS.photon;
  var MAT = ["melanin", "cellulose", "water", "lead"];
  function muAt(mat, e) {
    var xs = P.E, ys = P.mu[mat];
    if (e <= xs[0]) { return ys[0]; }
    if (e >= xs[xs.length - 1]) { return ys[ys.length - 1]; }
    var lo = 0, hi = xs.length - 1;
    while (hi - lo > 1) { var m = (lo + hi) >> 1; if (xs[m] <= e) { lo = m; } else { hi = m; } }
    var t = (Math.log(e) - Math.log(xs[lo])) / (Math.log(xs[hi]) - Math.log(xs[lo]));
    return Math.exp(Math.log(ys[lo]) * (1 - t) + Math.log(ys[hi]) * t);
  }
  function fmtE(e) { return (e < 100 ? e.toFixed(1) : e.toFixed(0)).replace(/\.0$/, "") + " keV"; }
  function fmtT(mm) {
    if (mm < 1) { return mm.toFixed(2) + " mm"; }
    if (mm < 10) { return mm.toFixed(1) + " mm"; }
    return mm.toFixed(0) + " mm";
  }
  function fmtLen(cm) {
    if (cm < 0.1) { return (cm * 10).toFixed(3) + " mm"; }
    if (cm < 1) { return (cm * 10).toFixed(2) + " mm"; }
    if (cm < 100) { return cm.toFixed(cm < 10 ? 2 : 1) + " cm"; }
    return (cm / 100).toFixed(2) + " m";
  }
  function fmtPct(p) {
    if (p < 0.01) { return "under 0.01%"; }
    if (p < 1) { return p.toFixed(2) + "%"; }
    if (p < 10) { return p.toFixed(1) + "%"; }
    return p.toFixed(0) + "%";
  }

  function photonView(H) {
    var f = document.createDocumentFragment();
    f.appendChild(backLink(H, "Back to Try it", "#/explore"));
    f.appendChild(H.el("h1", "", "Photon shielding explorer"));
    f.appendChild(H.el("p", "lead", "Slide the photon energy and the thickness. See what share of X-ray and gamma photons gets through."));

    var st = { eV: Math.round(1000 * Math.log(100 / 10) / Math.log(70)), tV: Math.round(1000 * Math.log(10 / 0.1) / Math.log(1000)), mel: 1.5 };
    var eMin = 10, eMax = 700, tMin = 0.1, tMax = 100;
    function eOf(v) { return eMin * Math.pow(eMax / eMin, v / 1000); }
    function tOf(v) { return tMin * Math.pow(tMax / tMin, v / 1000); }
    function vOfE(e) { return Math.round(1000 * Math.log(e / eMin) / Math.log(eMax / eMin)); }
    function vOfT(t) { return Math.round(1000 * Math.log(t / tMin) / Math.log(tMax / tMin)); }

    var box = H.el("div", "card");
    var eOut = H.el("div", "ctl-out"); eOut.id = "e-out";
    var eIn = H.el("input"); eIn.type = "range"; eIn.id = "e-in"; eIn.min = 0; eIn.max = 1000; eIn.step = 1; eIn.value = st.eV;
    box.appendChild(lbl(H, "e-in", "Photon energy"));
    box.appendChild(eOut); box.appendChild(eIn);
    var ep = H.el("div", "chips");
    [[10, "10 keV"], [30, "30 keV"], [60, "60 keV"], [100, "100 keV"], [200, "200 keV"], [400, "400 keV"], [661.6, "Cs-137 661.6 keV"]].forEach(function (p) {
      var b = H.el("button", "chip", p[1]); b.type = "button";
      b.addEventListener("click", function () { st.eV = vOfE(p[0]); eIn.value = st.eV; update(); });
      ep.appendChild(b);
    });
    box.appendChild(ep);

    var tOut = H.el("div", "ctl-out"); tOut.id = "t-out";
    var tIn = H.el("input"); tIn.type = "range"; tIn.id = "t-in"; tIn.min = 0; tIn.max = 1000; tIn.step = 1; tIn.value = st.tV;
    box.appendChild(lbl(H, "t-in", "Thickness"));
    box.appendChild(tOut); box.appendChild(tIn);
    var tp = H.el("div", "chips");
    [[1, "1 mm"], [10, "1 cm"], [30, "3 cm"], [100, "10 cm"]].forEach(function (p) {
      var b = H.el("button", "chip", p[1]); b.type = "button";
      b.addEventListener("click", function () { st.tV = vOfT(p[0]); tIn.value = st.tV; update(); });
      tp.appendChild(b);
    });
    box.appendChild(tp);

    box.appendChild(H.el("div", "ctl-label", "Melanin density (assumed)"));
    var dp = H.el("div", "chips");
    var dbtn = [];
    [1.3, 1.5, 1.7].forEach(function (d) {
      var b = H.el("button", "chip", d.toFixed(1) + " g/cm3"); b.type = "button";
      b.addEventListener("click", function () { st.mel = d; update(); });
      dbtn.push([b, d]); dp.appendChild(b);
    });
    box.appendChild(dp);
    f.appendChild(box);

    var res = H.el("div", "card"); res.setAttribute("aria-live", "polite");
    f.appendChild(res);
    var summary = H.el("div", "card t-CALCULATED");
    f.appendChild(summary);

    function rho(m) { return m === "melanin" ? st.mel : P.rho[m]; }
    function update() {
      var e = eOf(+eIn.value), t = tOf(+tIn.value);
      st.eV = +eIn.value; st.tV = +tIn.value;
      eOut.textContent = fmtE(e);
      tOut.textContent = fmtT(t);
      eIn.setAttribute("aria-valuetext", fmtE(e));
      tIn.setAttribute("aria-valuetext", fmtT(t));
      dbtn.forEach(function (x) { x[0].setAttribute("aria-pressed", String(x[1] === st.mel)); });
      res.textContent = "";
      res.appendChild(H.el("h2", "plain", "Share of photons that get through"));
      MAT.forEach(function (m) {
        var mu = muAt(m, e), r = rho(m);
        var pass = 100 * Math.exp(-mu * r * (t / 10));
        var hvl = Math.LN2 / (mu * r);
        var row = H.el("div", "bar-row");
        row.appendChild(H.el("div", "bar-name", P.names[m] + (m === "melanin" ? " (density " + st.mel.toFixed(1) + ")" : "")));
        var track = H.el("div", "bar-track");
        var fill = H.el("div", "bar-fill b-" + m);
        fill.style.width = Math.max(0, Math.min(100, pass)) + "%";
        track.appendChild(fill);
        row.appendChild(track);
        row.appendChild(H.el("div", "bar-val", fmtPct(pass) + " pass through"));
        row.appendChild(H.el("div", "bar-sub", "Half-value layer: " + fmtLen(hvl)));
        res.appendChild(row);
      });
      var mel = muAt("melanin", e), wat = muAt("water", e), cel = muAt("cellulose", e);
      var vsW = 100 * (1 - mel / wat), vsC = 100 * (1 - mel / cel);
      summary.textContent = "";
      summary.appendChild(H.badge("CALCULATED"));
      summary.appendChild(H.el("p", "", "At " + fmtE(e) + ", per gram, melanin stops about " + vsW.toFixed(1) + " percent less than water and about " + vsC.toFixed(1) + " percent less than cellulose. Its photon stopping is close to water and cellulose. The calculation says the protection seen in mice is not from blocking the beam. It points to melanin's chemistry."));
      summary.appendChild(H.el("p", "", "Per centimetre, lead at " + fmtE(e) + " stops about " + (muAt("lead", e) * P.rho.lead / (mel * st.mel)).toFixed(0) + " times as much as melanin, because lead is far denser and has heavy atoms."));
    }
    eIn.addEventListener("input", update);
    tIn.addEventListener("input", update);
    update();

    var notes = H.el("div", "card t-OPEN");
    notes.appendChild(H.badge("OPEN"));
    notes.appendChild(H.el("p", "", "How this was calculated: total mass attenuation coefficients from the Elam tables (xraydb 4.5.8), summed by element mass fraction. Checked against known values for water and lead. Between table points the tool interpolates on a log-log scale, within about 0.3 percent. Lead has sharp jumps at 13.0, 15.2, 15.9 and 88.0 keV (its absorption edges). Try the slider across 88 keV."));
    notes.appendChild(H.el("p", "", "Melanin is shown as the unit C8H5NO2 (indolequinone). DHI and DHICA units give results within a few percent. Real melanin also holds water, metals and protein. Density 1.5 g/cm3 is an assumption. The mass coefficient does not depend on density. Thickness results do."));
    notes.appendChild(H.el("p", "", "Not NIST XCOM. The NIST site could not be reached when this was built. Recheck against XCOM before citing."));
    f.appendChild(notes);

    var rd = H.el("div", "card t-READING");
    rd.appendChild(H.badge("READING"));
    rd.appendChild(H.el("p", "", "Melanin does not physically block gamma photons better than water or cellulose. So the survival of melanin-fed mice at a lethal 9 Gy points to chemistry in the tissue, radical scavenging, not shielding. This is a reading of the calculation and the mouse paper together."));
    f.appendChild(rd);
    return f;
  }

  /* ---------- Spectrum explorer ---------- */
  function spectrumView(H) {
    var f = document.createDocumentFragment();
    f.appendChild(backLink(H, "Back to Try it", "#/explore"));
    f.appendChild(H.el("h1", "", "Spectrum explorer"));
    f.appendChild(H.el("p", "lead", "Move from low energy (radio) to high energy (gamma). Each band shows what is known about melanin."));
    var N = LS.bands.length, idx = 3;
    var rl = H.el("label", "ctl-label", "Band"); rl.setAttribute("for", "band-in");
    var rin = H.el("input"); rin.type = "range"; rin.id = "band-in"; rin.min = 0; rin.max = N - 1; rin.step = 1; rin.value = idx;
    var scale = H.el("div", "scale-ends");
    scale.appendChild(H.el("span", "", "Low energy"));
    scale.appendChild(H.el("span", "", "High energy"));
    var pills = H.el("div", "chips");
    var pb = [];
    LS.bands.forEach(function (b, i) {
      var x = H.el("button", "chip", b.name.replace("Radio and extremely low frequency", "Radio")); x.type = "button";
      x.addEventListener("click", function () { idx = i; rin.value = i; update(); });
      pb.push(x); pills.appendChild(x);
    });
    var nav = H.el("div", "row-actions");
    var prev = H.el("button", "btn", "Lower energy"); prev.type = "button";
    var next = H.el("button", "btn", "Higher energy"); next.type = "button";
    prev.addEventListener("click", function () { if (idx > 0) { idx--; rin.value = idx; update(); } });
    next.addEventListener("click", function () { if (idx < N - 1) { idx++; rin.value = idx; update(); } });
    nav.appendChild(prev); nav.appendChild(next);
    var ctl = H.el("div", "card");
    ctl.appendChild(rl); ctl.appendChild(rin); ctl.appendChild(scale); ctl.appendChild(pills); ctl.appendChild(nav);
    f.appendChild(ctl);
    var out = H.el("div"); out.setAttribute("aria-live", "polite");
    f.appendChild(out);

    function update() {
      idx = +rin.value;
      rin.setAttribute("aria-valuetext", LS.bands[idx].name);
      pb.forEach(function (b, i) { b.setAttribute("aria-pressed", String(i === idx)); });
      prev.disabled = idx === 0; next.disabled = idx === N - 1;
      var b = LS.bands[idx];
      out.textContent = "";
      var c = H.el("div", "card t-" + b.tag);
      c.appendChild(H.el("h2", "plain", b.name));
      c.appendChild(H.el("p", "sub", "Wavelength about: " + b.range));
      c.appendChild(H.badge(b.tag));
      c.appendChild(H.el("p", "", b.sum));
      out.appendChild(c);
      var terms = b.terms.map(function (t) { return t.toLowerCase(); });
      var hits = H.INDEX.filter(function (e) {
        var hay = (e.t + " " + (e.title || "")).toLowerCase();
        return terms.some(function (t) { return hay.indexOf(t) >= 0; });
      });
      out.appendChild(H.el("h2", "", "Related claims (" + hits.length + ")"));
      hits.slice(0, 8).forEach(function (e) {
        out.appendChild(H.claimCard({ tag: e.tag, title: e.title, t: e.t, src: e.src, cite: e.cite, go: e.go, goLabel: e.goLabel }, { ref: e.sec.title + "  >  " + e.block, open: e.sec.id }));
      });
      if (hits.length > 8) {
        var more = H.el("button", "btn", "Search all " + hits.length + " for " + b.terms[0]); more.type = "button";
        more.addEventListener("click", function () { H.goSearch(b.terms[0]); });
        out.appendChild(more);
      }
      if (!hits.length) { out.appendChild(H.el("p", "lead", "No matching claims. That is a gap, not a result.")); }
    }
    rin.addEventListener("input", update);
    update();
    return f;
  }

  /* ---------- Claim check quiz ---------- */
  function shuffle(a) {
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  }
  function quizView(H) {
    var f = document.createDocumentFragment();
    f.appendChild(backLink(H, "Back to Try it", "#/explore"));
    f.appendChild(H.el("h1", "", "Claim check"));
    f.appendChild(H.el("p", "lead", "Read the claim. Pick the tag you think it carries. Ten claims a round."));
    var legend = H.el("details", "card");
    legend.appendChild(H.el("summary", "", "What the tags mean"));
    H.tagKeys.forEach(function (k) { var p = H.el("p", ""); p.appendChild(H.el("strong", "", H.LABEL[k] + ": ")); p.appendChild(document.createTextNode(LS.tags[k])); legend.appendChild(p); });
    f.appendChild(legend);
    var stage = H.el("div"); stage.setAttribute("aria-live", "polite");
    f.appendChild(stage);

    var ROUND = 10, pool, n, score;
    function start() {
      pool = shuffle(H.INDEX.filter(function (e) { return e.t.length > 30 && e.tag !== "PASTED"; })).slice(0, ROUND);
      n = 0; score = 0; ask();
    }
    function ask() {
      stage.textContent = "";
      if (n >= pool.length) { finish(); return; }
      var e = pool[n];
      stage.appendChild(H.el("div", "results-hdr", "Claim " + (n + 1) + " of " + pool.length + ". Score " + score + "."));
      var c = H.el("div", "card");
      c.appendChild(H.el("div", "ref", e.sec.title));
      c.appendChild(H.el("p", "q-text", (e.title ? e.title + ": " : "") + e.t));
      stage.appendChild(c);
      stage.appendChild(H.el("h2", "plain", "Which tag?"));
      var grid = H.el("div", "ans-grid");
      var btns = [];
      H.tagKeys.forEach(function (k) {
        if (k === "PASTED") { return; }
        var b = H.el("button", "btn ans", H.LABEL[k]); b.type = "button"; b.dataset.tag = k;
        b.addEventListener("click", function () { answer(k, e, btns); });
        btns.push(b); grid.appendChild(b);
      });
      stage.appendChild(grid);
      var skip = H.el("button", "btn", "Skip"); skip.type = "button";
      skip.addEventListener("click", function () { n++; ask(); });
      stage.appendChild(skip);
    }
    function answer(k, e, btns) {
      var ok = k === e.tag;
      if (ok) { score++; }
      btns.forEach(function (b) {
        b.disabled = true;
        if (b.dataset.tag === e.tag) { b.classList.add("right"); }
        else if (b.dataset.tag === k) { b.classList.add("wrong"); }
      });
      var fb = H.el("div", "card t-" + e.tag);
      fb.appendChild(H.el("h2", "plain", ok ? "Correct." : "Not quite."));
      fb.appendChild(H.el("p", "", "This claim is tagged "));
      fb.lastChild.appendChild(H.badge(e.tag));
      fb.appendChild(H.el("p", "", LS.tags[e.tag]));
      if (e.src && e.src.length) {
        var s = H.el("p", "src", "Source: ");
        e.src.forEach(function (x, i) { if (i) { s.appendChild(document.createTextNode(" | ")); } s.appendChild(H.ext(x.l, x.u)); });
        fb.appendChild(s);
      }
      var row = H.el("div", "row-actions");
      var nx = H.el("button", "btn primary", n + 1 >= pool.length ? "See score" : "Next claim"); nx.type = "button";
      nx.addEventListener("click", function () { n++; ask(); });
      row.appendChild(nx);
      var op = H.el("a", "open", "Open this page"); op.href = "#/s/" + e.sec.id; row.appendChild(op);
      fb.appendChild(row);
      stage.appendChild(fb);
      nx.focus();
    }
    function finish() {
      var c = H.el("div", "card");
      c.appendChild(H.el("h2", "plain", "Round done"));
      c.appendChild(H.el("p", "", "You scored " + score + " out of " + pool.length + "."));
      var again = H.el("button", "btn primary", "Play again"); again.type = "button";
      again.addEventListener("click", start);
      c.appendChild(again);
      stage.appendChild(c);
    }
    start();
    return f;
  }

  /* ---------- Saved claims ---------- */
  function savedView(H) {
    var f = document.createDocumentFragment();
    f.appendChild(backLink(H));
    f.appendChild(H.el("h1", "", "Saved claims"));
    var ids = H.savedIds();
    var entries = ids.map(function (id) { return H.entryById(id); }).filter(Boolean);
    f.appendChild(H.el("p", "lead", entries.length
      ? entries.length + (entries.length === 1 ? " claim" : " claims") + " saved on this device."
      : "Nothing saved yet. Tap Save on any claim."));
    if (entries.length) {
      var row = H.el("div", "row-actions");
      var copy = H.el("button", "btn primary", "Copy as text"); copy.type = "button";
      var msg = H.el("span", "sub", "");
      copy.addEventListener("click", function () {
        var text = entries.map(function (e, i) {
          var s = (i + 1) + ". [" + H.LABEL[e.tag] + "] " + (e.title ? e.title + ": " : "") + e.t + " (" + e.sec.title + ")";
          if (e.cite) { s += "\n   Where: " + e.cite; }
          if (e.src && e.src.length) { s += "\n   Source: " + e.src.map(function (x) { return x.l + " " + x.u; }).join("; "); }
          return s;
        }).join("\n\n");
        function done(ok) { msg.textContent = ok ? "Copied." : "Could not copy. Select and copy by hand."; }
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(function () { done(true); }, function () { done(false); });
        } else { done(false); }
      });
      var clear = H.el("button", "btn", "Remove all"); clear.type = "button";
      var armed = false;
      clear.addEventListener("click", function () {
        if (!armed) { armed = true; clear.textContent = "Tap again to remove all"; return; }
        H.clearSaved(); H.rerender();
      });
      row.appendChild(copy); row.appendChild(clear); row.appendChild(msg);
      f.appendChild(row);
    }
    entries.forEach(function (e) {
      f.appendChild(H.claimCard({ tag: e.tag, title: e.title, t: e.t, src: e.src, cite: e.cite, go: e.go, goLabel: e.goLabel },
        { ref: e.sec.title + "  >  " + e.block, open: e.sec.id, onSave: function () { H.rerender(); } }));
    });
    return f;
  }

  /* ---------- Glossary ---------- */
  function glossaryView(H) {
    var f = document.createDocumentFragment();
    f.appendChild(backLink(H));
    f.appendChild(H.el("h1", "", "Glossary"));
    f.appendChild(H.el("p", "lead", "Plain-word meanings. These are settled science, so they carry no tag."));
    var input = H.el("input", "search-input g-search"); input.type = "search";
    input.placeholder = "Find a word"; input.setAttribute("aria-label", "Find a glossary word");
    input.autocomplete = "off"; input.autocapitalize = "off"; input.spellcheck = false;
    f.appendChild(input);
    var list = H.el("div", "g-list"); f.appendChild(list);
    function draw() {
      var q = input.value.trim().toLowerCase();
      list.textContent = "";
      var n = 0;
      LS.glossary.forEach(function (g) {
        if (q && (g[0] + " " + g[1]).toLowerCase().indexOf(q) < 0) { return; }
        var c = H.el("div", "card");
        c.appendChild(H.el("h3", "", g[0]));
        c.appendChild(H.el("p", "", g[1]));
        list.appendChild(c); n++;
      });
      if (!n) { list.appendChild(H.el("p", "lead", "No match. Try a shorter word.")); }
    }
    input.addEventListener("input", draw);
    draw();
    return f;
  }

  window.LSX = {
    views: { explore: exploreView, photon: photonView, spectrum: spectrumView, quiz: quizView, saved: savedView, glossary: glossaryView },
    didYouKnow: didYouKnow
  };
})();
