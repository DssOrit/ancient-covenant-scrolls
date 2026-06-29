/*
 * Load AI — core controller.
 * Routing, intro, splash/Enter, appearance, offline banner, the Home
 * screen, and the shared OpenRouter API call used by every screen.
 *
 * The Load AI Constitution (constitution.js) is injected as the system
 * message in 100% of API calls via LoadAI.callAI(). It is never
 * omitted and never shortened.
 */
(function () {
  "use strict";

  var VERSION = "load-ai-chat-v8h";

  var KEYS = {
    apiKey: "loadai_openrouter_key",
    history: "loadai_history",
    model: "loadai_model",
    font: "loadai_font",
    theme: "loadai_theme",
    textSize: "loadai_textsize",
    lang: "loadai_lang"
  };

  // OpenRouter chat models. The ":free" variants run at no cost on
  // OpenRouter's free tier. Users can also paste any other OpenRouter
  // model id if they have credits.
  var MODELS = [
    { id: "meta-llama/llama-3.3-70b-instruct:free", label: "Llama 3.3 70B Instruct (free)" },
    { id: "deepseek/deepseek-chat-v3-0324:free", label: "DeepSeek V3 (free)" },
    { id: "meta-llama/llama-3.1-8b-instruct:free", label: "Llama 3.1 8B Instruct (free, fast)" },
    { id: "qwen/qwen-2.5-72b-instruct:free", label: "Qwen 2.5 72B Instruct (free)" },
    { id: "google/gemma-2-9b-it:free", label: "Gemma 2 9B (free)" },
    { id: "mistralai/mistral-7b-instruct:free", label: "Mistral 7B Instruct (free)" }
  ];
  var DEFAULT_MODEL = "meta-llama/llama-3.3-70b-instruct:free";

  // Shared language list (Voice screen + Settings). bcp47 drives both
  // SpeechRecognition and SpeechSynthesis.
  var LANGS = [
    { code: "en", label: "English", bcp47: "en-US" },
    { code: "es", label: "Spanish", bcp47: "es-ES" },
    { code: "fr", label: "French", bcp47: "fr-FR" },
    { code: "ar", label: "Arabic", bcp47: "ar-SA" },
    { code: "am", label: "Amharic", bcp47: "am-ET" },
    { code: "yo", label: "Yoruba", bcp47: "yo-NG" },
    { code: "ha", label: "Hausa", bcp47: "ha-NG" },
    { code: "sw", label: "Swahili", bcp47: "sw-KE" },
    { code: "hi", label: "Hindi", bcp47: "hi-IN" },
    { code: "ht", label: "Creole", bcp47: "ht-HT" },
    { code: "pt", label: "Portuguese", bcp47: "pt-BR" }
  ];

  var ENDPOINT = "https://openrouter.ai/api/v1/chat/completions";

  // ── storage helpers ───────────────────────────────────────────
  function get(key, fallback) {
    try {
      var v = localStorage.getItem(key);
      return v === null ? fallback : v;
    } catch (e) {
      return fallback;
    }
  }
  function set(key, value) {
    try { localStorage.setItem(key, value); } catch (e) {}
  }
  function remove(key) {
    try { localStorage.removeItem(key); } catch (e) {}
  }

  function getHistory() {
    try {
      var raw = localStorage.getItem(KEYS.history);
      var arr = raw ? JSON.parse(raw) : [];
      return Array.isArray(arr) ? arr : [];
    } catch (e) {
      return [];
    }
  }
  function setHistory(arr) {
    try { localStorage.setItem(KEYS.history, JSON.stringify(arr || [])); } catch (e) {}
  }
  function pushTurn(role, content) {
    var h = getHistory();
    h.push({ role: role, content: content, t: Date.now() });
    setHistory(h);
    return h;
  }

  function getApiKey() { return get(KEYS.apiKey, ""); }
  function getModel() { return get(KEYS.model, DEFAULT_MODEL); }
  function getLang() {
    var code = get(KEYS.lang, "en");
    for (var i = 0; i < LANGS.length; i++) { if (LANGS[i].code === code) return LANGS[i]; }
    return LANGS[0];
  }

  // ── AI API call (OpenRouter) ──────────────────────────────────
  // history: array of { role:'user'|'assistant', content:string }.
  // The constitution is ALWAYS prepended as the system message.
  function callAI(history) {
    var key = getApiKey();
    if (!key) {
      return Promise.reject(new Error("No API key. Open Settings and paste your OpenRouter API key."));
    }
    if (typeof window.LOAD_AI_CONSTITUTION !== "string" || !window.LOAD_AI_CONSTITUTION) {
      return Promise.reject(new Error("Constitution failed to load. Reload the app."));
    }
    var messages = [{ role: "system", content: window.LOAD_AI_CONSTITUTION }];
    (history || []).forEach(function (m) {
      if (m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string") {
        messages.push({ role: m.role, content: m.content });
      }
    });
    var body = {
      model: getModel(),
      messages: messages,
      temperature: 0.7,
      max_tokens: 2048,
      stream: false
    };
    return fetch(ENDPOINT, {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + key,
        "Content-Type": "application/json",
        "X-Title": "Load AI"
      },
      body: JSON.stringify(body)
    }).then(function (res) {
      return res.text().then(function (text) {
        var data = null;
        try { data = text ? JSON.parse(text) : null; } catch (e) {}
        if (!res.ok) {
          var msg = (data && data.error && data.error.message) ? data.error.message : ("Request failed (" + res.status + ")");
          throw new Error(msg);
        }
        if (!data || !data.choices || !data.choices[0] || !data.choices[0].message) {
          throw new Error("Empty response from Load AI.");
        }
        return data.choices[0].message.content || "";
      });
    });
  }

  // ── appearance (theme / font / text size) ─────────────────────
  function applyAppearance() {
    var root = document.documentElement;
    root.setAttribute("data-theme", get(KEYS.theme, "dark"));
    root.setAttribute("data-font", get(KEYS.font, "standard"));
    root.setAttribute("data-textsize", get(KEYS.textSize, "medium"));
  }

  // ── screen routing ────────────────────────────────────────────
  var SCREENS = ["home", "chat", "voice", "settings"];
  function showScreen(name) {
    if (SCREENS.indexOf(name) === -1) name = "home";
    SCREENS.forEach(function (s) {
      var el = document.getElementById("screen-" + s);
      if (el) {
        var on = (s === name);
        el.hidden = !on;
        el.classList.toggle("screen-active", on);
      }
    });
    var navBtns = document.querySelectorAll(".bottom-nav .nav-item");
    for (var i = 0; i < navBtns.length; i++) {
      var active = navBtns[i].getAttribute("data-screen") === name;
      navBtns[i].classList.toggle("active", active);
      navBtns[i].setAttribute("aria-current", active ? "page" : "false");
    }
    if (name === "home" && LoadAI.home) LoadAI.home.refresh();
    if (name === "chat" && LoadAI.chat) LoadAI.chat.onShow();
    if (name === "voice" && LoadAI.voice) LoadAI.voice.onShow();
    if (name === "settings" && LoadAI.settings) LoadAI.settings.onShow();
    var shell = document.getElementById("appShell");
    if (shell) shell.scrollTop = 0;
  }

  // ── enter the app (from splash) ───────────────────────────────
  function enterApp() {
    var splash = document.getElementById("splashScreen");
    var shell = document.getElementById("appShell");
    if (splash) splash.hidden = true;
    if (shell) shell.hidden = false;
    showScreen("home");
  }

  // ── intro (auto-playing, Load Play style, Load AI colors) ─────
  function runIntro() {
    var intro = document.getElementById("introScreen");
    if (!intro) return;
    var reduce = false;
    try { reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches; } catch (e) {}
    var hold = reduce ? 350 : 2200;
    window.setTimeout(function () {
      intro.classList.add("gone");
      window.setTimeout(function () { intro.hidden = true; }, 500);
    }, hold);
  }

  // ── offline banner ────────────────────────────────────────────
  function wireOffline() {
    var banner = document.getElementById("offlineBanner");
    if (!banner) return;
    function sync() {
      var off = !navigator.onLine;
      banner.hidden = !off;
    }
    window.addEventListener("online", sync);
    window.addEventListener("offline", sync);
    sync();
  }

  // ── Home screen ───────────────────────────────────────────────
  var Home = {
    refresh: function () {
      var list = document.getElementById("recentList");
      var empty = document.getElementById("recentEmpty");
      if (!list) return;
      var history = getHistory();
      // Show the most recent user turns as conversation entry points.
      var users = history.filter(function (m) { return m.role === "user"; });
      list.innerHTML = "";
      if (!users.length) {
        if (empty) empty.hidden = false;
        return;
      }
      if (empty) empty.hidden = true;
      users.slice(-6).reverse().forEach(function (m) {
        var btn = document.createElement("button");
        btn.type = "button";
        btn.className = "recent-item";
        var preview = (m.content || "").replace(/\s+/g, " ").trim();
        if (preview.length > 80) preview = preview.slice(0, 80) + "…";
        btn.textContent = preview || "Conversation";
        btn.setAttribute("aria-label", "Open conversation: " + preview);
        btn.addEventListener("click", function () { showScreen("chat"); });
        list.appendChild(btn);
      });
    }
  };

  // ── public namespace ──────────────────────────────────────────
  window.LoadAI = {
    VERSION: VERSION,
    KEYS: KEYS,
    MODELS: MODELS,
    DEFAULT_MODEL: DEFAULT_MODEL,
    LANGS: LANGS,
    get: get,
    set: set,
    remove: remove,
    getHistory: getHistory,
    setHistory: setHistory,
    pushTurn: pushTurn,
    getApiKey: getApiKey,
    getModel: getModel,
    getLang: getLang,
    callAI: callAI,
    applyAppearance: applyAppearance,
    showScreen: showScreen,
    home: Home
    // .chat / .voice / .settings are attached by their own files.
  };

  // ── boot ──────────────────────────────────────────────────────
  function boot() {
    applyAppearance();
    runIntro();
    wireOffline();

    // Quick-start mode buttons (Write / Research / Create / Chat).
    var modeBtns = document.querySelectorAll(".quick-mode");
    for (var i = 0; i < modeBtns.length; i++) {
      modeBtns[i].addEventListener("click", function () {
        var mode = this.getAttribute("data-mode");
        showScreen("chat");
        if (LoadAI.chat && LoadAI.chat.primeMode) LoadAI.chat.primeMode(mode);
      });
    }

    // Bottom navigation.
    var navBtns = document.querySelectorAll(".bottom-nav .nav-item");
    for (var j = 0; j < navBtns.length; j++) {
      navBtns[j].addEventListener("click", function () {
        showScreen(this.getAttribute("data-screen"));
      });
    }

    // Enter the app: the "Get Started" hotspot over the printed button,
    // plus the whole splash artwork as a forgiving fallback so a tap can
    // never feel dead.
    var enterBtn = document.getElementById("enterAppBtn");
    if (enterBtn) enterBtn.addEventListener("click", enterApp);
    var splashWrap = document.querySelector("#splashScreen .splash-wrapper");
    if (splashWrap) splashWrap.addEventListener("click", enterApp);

    if (LoadAI.chat && LoadAI.chat.init) LoadAI.chat.init();
    if (LoadAI.voice && LoadAI.voice.init) LoadAI.voice.init();
    if (LoadAI.settings && LoadAI.settings.init) LoadAI.settings.init();

    // Service worker (offline shell).
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", function () {
        navigator.serviceWorker.register("sw.js").catch(function () {});
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
