/*
 * Load AI — Voice screen.
 * Web Speech API for input (SpeechRecognition) and output
 * (SpeechSynthesis). Shares the same conversation history as Chat, so a
 * spoken exchange is injected with the full constitution every call.
 */
(function () {
  "use strict";

  var SR = window.SpeechRecognition || window.webkitSpeechRecognition || null;
  var recog = null;
  var listening = false;
  var busy = false;

  var micBtn, statusEl, transcriptEl, responseEl, waveEl, langSel;

  function setStatus(text) {
    if (statusEl) statusEl.textContent = text;
  }

  function populateLang() {
    if (!langSel) return;
    langSel.innerHTML = "";
    LoadAI.LANGS.forEach(function (l) {
      var opt = document.createElement("option");
      opt.value = l.code;
      opt.textContent = l.label;
      langSel.appendChild(opt);
    });
    langSel.value = LoadAI.getLang().code;
  }

  function currentBcp47() {
    return LoadAI.getLang().bcp47;
  }

  function setWave(active) {
    if (!waveEl) return;
    waveEl.classList.toggle("active", active);
    waveEl.setAttribute("aria-hidden", "true");
  }

  function setListening(state) {
    listening = state;
    if (micBtn) {
      micBtn.classList.toggle("listening", state);
      micBtn.setAttribute("aria-pressed", state ? "true" : "false");
    }
    setWave(state);
  }

  function speak(text) {
    if (!("speechSynthesis" in window) || !text) return;
    try {
      window.speechSynthesis.cancel();
      var u = new SpeechSynthesisUtterance(text);
      u.lang = currentBcp47();
      var voices = window.speechSynthesis.getVoices() || [];
      for (var i = 0; i < voices.length; i++) {
        if (voices[i].lang && voices[i].lang.toLowerCase().indexOf(u.lang.slice(0, 2).toLowerCase()) === 0) {
          u.voice = voices[i];
          break;
        }
      }
      window.speechSynthesis.speak(u);
    } catch (e) {}
  }

  function ask(text) {
    if (!text || busy) return;
    busy = true;
    if (transcriptEl) transcriptEl.textContent = text;
    setStatus("Load AI is thinking…");
    LoadAI.pushTurn("user", text);

    LoadAI.callGroq(LoadAI.getHistory()).then(function (reply) {
      LoadAI.pushTurn("assistant", reply);
      if (responseEl) responseEl.textContent = reply;
      setStatus("Tap the mic to speak again");
      speak(reply);
      busy = false;
      if (LoadAI.home) LoadAI.home.refresh();
    }).catch(function (err) {
      if (responseEl) responseEl.textContent = (err && err.message) ? err.message : "Something went wrong.";
      setStatus("Not sent. Check Settings, then try again.");
      busy = false;
    });
  }

  function startListening() {
    if (!SR) {
      setStatus("This browser does not support voice input. Use the Chat screen.");
      return;
    }
    if (listening) { stopListening(); return; }
    try {
      recog = new SR();
      recog.lang = currentBcp47();
      recog.interimResults = true;
      recog.continuous = false; // ends on a natural pause → auto-send
      recog.maxAlternatives = 1;

      var finalText = "";

      recog.onstart = function () {
        setListening(true);
        setStatus("Listening… speak now");
        if (transcriptEl) transcriptEl.textContent = "";
      };
      recog.onresult = function (e) {
        var interim = "";
        finalText = "";
        for (var i = 0; i < e.results.length; i++) {
          var r = e.results[i];
          if (r.isFinal) finalText += r[0].transcript;
          else interim += r[0].transcript;
        }
        if (transcriptEl) transcriptEl.textContent = (finalText || interim).trim();
      };
      recog.onerror = function (e) {
        setListening(false);
        if (e && e.error === "not-allowed") {
          setStatus("Microphone blocked. Allow mic access in your browser settings.");
        } else {
          setStatus("Could not hear you. Tap the mic to try again.");
        }
      };
      recog.onend = function () {
        setListening(false);
        var said = (finalText || "").trim();
        if (said) ask(said);
        else setStatus("Tap the mic to speak");
      };
      recog.start();
    } catch (e) {
      setListening(false);
      setStatus("Voice input could not start. Use the Chat screen.");
    }
  }

  function stopListening() {
    if (recog) {
      try { recog.stop(); } catch (e) {}
    }
    setListening(false);
  }

  var Voice = {
    init: function () {
      micBtn = document.getElementById("voiceMicBtn");
      statusEl = document.getElementById("voiceStatus");
      transcriptEl = document.getElementById("voiceTranscript");
      responseEl = document.getElementById("voiceResponse");
      waveEl = document.getElementById("voiceWave");
      langSel = document.getElementById("voiceLang");

      populateLang();

      if (langSel) langSel.addEventListener("change", function () {
        LoadAI.set(LoadAI.KEYS.lang, langSel.value);
      });
      if (micBtn) micBtn.addEventListener("click", startListening);

      // Prime synth voices (some browsers load them async).
      if ("speechSynthesis" in window) {
        try { window.speechSynthesis.getVoices(); } catch (e) {}
      }

      if (!SR) setStatus("Voice input is not supported here. Speaking answers aloud still works from Chat replies.");
      else setStatus("Tap the mic to speak");
    },
    onShow: function () {
      populateLang();
      stopListening();
    }
  };

  window.LoadAI = window.LoadAI || {};
  window.LoadAI.voice = Voice;
})();
