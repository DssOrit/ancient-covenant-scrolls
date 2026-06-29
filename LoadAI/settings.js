/*
 * Load AI — Settings screen.
 * API key, model selection (free models included), appearance, language,
 * data controls, and the visible Constitution.
 */
(function () {
  "use strict";

  function $(id) { return document.getElementById(id); }

  function flashSaved(node) {
    if (!node) return;
    node.hidden = false;
    node.classList.add("show");
    setTimeout(function () {
      node.classList.remove("show");
      node.hidden = true;
    }, 1800);
  }

  function buildModelOptions(sel) {
    if (!sel) return;
    sel.innerHTML = "";
    LoadAI.MODELS.forEach(function (m) {
      var opt = document.createElement("option");
      opt.value = m.id;
      opt.textContent = m.label;
      sel.appendChild(opt);
    });
    sel.value = LoadAI.getModel();
  }

  function buildLangOptions(sel) {
    if (!sel) return;
    sel.innerHTML = "";
    LoadAI.LANGS.forEach(function (l) {
      var opt = document.createElement("option");
      opt.value = l.code;
      opt.textContent = l.label;
      sel.appendChild(opt);
    });
    sel.value = LoadAI.getLang().code;
  }

  function syncToggleGroup(group, value) {
    if (!group) return;
    var btns = group.querySelectorAll("[data-value]");
    for (var i = 0; i < btns.length; i++) {
      var on = btns[i].getAttribute("data-value") === value;
      btns[i].classList.toggle("active", on);
      btns[i].setAttribute("aria-pressed", on ? "true" : "false");
    }
  }

  var Settings = {
    init: function () {
      var K = LoadAI.KEYS;

      // ── API key ──
      var keyInput = $("apiKeyInput");
      var saveKeyBtn = $("saveKeyBtn");
      var keySaved = $("keySavedMark");
      if (keyInput) keyInput.value = LoadAI.getApiKey();
      if (saveKeyBtn) saveKeyBtn.addEventListener("click", function () {
        LoadAI.set(K.apiKey, (keyInput ? keyInput.value : "").trim());
        flashSaved(keySaved);
      });

      // ── Model (user-selectable, free models included) ──
      var modelSel = $("modelSelect");
      buildModelOptions(modelSel);
      if (modelSel) modelSel.addEventListener("change", function () {
        LoadAI.set(K.model, modelSel.value);
      });

      // ── Font toggle ──
      var fontGroup = $("fontToggle");
      syncToggleGroup(fontGroup, LoadAI.get(K.font, "standard"));
      if (fontGroup) fontGroup.addEventListener("click", function (e) {
        var b = e.target.closest("[data-value]");
        if (!b) return;
        LoadAI.set(K.font, b.getAttribute("data-value"));
        syncToggleGroup(fontGroup, b.getAttribute("data-value"));
        LoadAI.applyAppearance();
      });

      // ── Theme toggle ──
      var themeGroup = $("themeToggle");
      syncToggleGroup(themeGroup, LoadAI.get(K.theme, "dark"));
      if (themeGroup) themeGroup.addEventListener("click", function (e) {
        var b = e.target.closest("[data-value]");
        if (!b) return;
        LoadAI.set(K.theme, b.getAttribute("data-value"));
        syncToggleGroup(themeGroup, b.getAttribute("data-value"));
        LoadAI.applyAppearance();
      });

      // ── Text size slider ──
      var sizeSlider = $("textSizeSlider");
      var sizeLabel = $("textSizeLabel");
      var SIZES = ["small", "medium", "large", "xlarge"];
      var SIZE_LABELS = { small: "Small", medium: "Medium", large: "Large", xlarge: "Extra Large" };
      if (sizeSlider) {
        var cur = LoadAI.get(K.textSize, "medium");
        sizeSlider.value = String(Math.max(0, SIZES.indexOf(cur)));
        if (sizeLabel) sizeLabel.textContent = SIZE_LABELS[cur] || "Medium";
        sizeSlider.addEventListener("input", function () {
          var v = SIZES[Number(sizeSlider.value)] || "medium";
          LoadAI.set(K.textSize, v);
          if (sizeLabel) sizeLabel.textContent = SIZE_LABELS[v];
          LoadAI.applyAppearance();
        });
      }

      // ── Language preference ──
      var langSel = $("langSelect");
      buildLangOptions(langSel);
      if (langSel) langSel.addEventListener("change", function () {
        LoadAI.set(K.lang, langSel.value);
      });

      // ── Clear conversation history ──
      var clearHistBtn = $("clearHistoryBtn");
      if (clearHistBtn) clearHistBtn.addEventListener("click", function () {
        if (!window.confirm("Clear all conversation history from this device?")) return;
        LoadAI.setHistory([]);
        if (LoadAI.chat) LoadAI.chat.onShow();
        if (LoadAI.home) LoadAI.home.refresh();
        window.alert("Conversation history cleared.");
      });

      // ── Clear ALL data ──
      var clearAllBtn = $("clearAllBtn");
      if (clearAllBtn) clearAllBtn.addEventListener("click", function () {
        if (!window.confirm("Clear ALL Load AI data on this device? This removes your API key, history, and all settings. This cannot be undone.")) return;
        [K.apiKey, K.history, K.model, K.font, K.theme, K.textSize, K.lang].forEach(function (k) {
          LoadAI.remove(k);
        });
        if (keyInput) keyInput.value = "";
        LoadAI.applyAppearance();
        buildModelOptions(modelSel);
        buildLangOptions(langSel);
        syncToggleGroup(fontGroup, "standard");
        syncToggleGroup(themeGroup, "dark");
        if (sizeSlider) { sizeSlider.value = "1"; if (sizeLabel) sizeLabel.textContent = "Medium"; }
        if (LoadAI.chat) LoadAI.chat.onShow();
        if (LoadAI.home) LoadAI.home.refresh();
        window.alert("All Load AI data cleared.");
      });

      // ── Constitution show / hide ──
      var consBtn = $("constitutionToggle");
      var consBox = $("constitutionBox");
      if (consBox) consBox.textContent = window.LOAD_AI_CONSTITUTION || "Constitution unavailable.";
      if (consBtn && consBox) consBtn.addEventListener("click", function () {
        var open = consBox.hidden;
        consBox.hidden = !open;
        consBtn.textContent = open ? "Hide constitution" : "Show constitution";
        consBtn.setAttribute("aria-expanded", open ? "true" : "false");
      });

      // ── Version ──
      var ver = $("versionLabel");
      if (ver) ver.textContent = LoadAI.VERSION;
    },
    onShow: function () {
      var keyInput = $("apiKeyInput");
      if (keyInput) keyInput.value = LoadAI.getApiKey();
    }
  };

  window.LoadAI = window.LoadAI || {};
  window.LoadAI.settings = Settings;
})();
