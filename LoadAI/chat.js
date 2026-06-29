/*
 * Load AI — Chat screen.
 * Full multi-turn thread. Every send rebuilds the messages array as
 * [constitution] + [all prior turns] + [new user message] via
 * LoadAI.callGroq().
 */
(function () {
  "use strict";

  var BIAS_NOTE =
    "Load AI applies a global equity constitution to every response. " +
    "No cultural framework is treated as default. " +
    "Evidence hierarchy: Primary sources → Indigenous scholarship → " +
    "Peer-reviewed research → Western academic consensus.";

  var MODE_HINTS = {
    write: "Write mode. Describe what you want written — a letter, story, post, or script.",
    research: "Research mode. Ask a question and Load AI will answer with evidence-first accuracy.",
    create: "Create mode. Describe an idea to develop — names, plans, concepts, outlines.",
    chat: "Ask Load AI anything."
  };

  var thread, input, sendBtn, busy = false;

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  function scrollToEnd() {
    if (thread) thread.scrollTop = thread.scrollHeight;
  }

  function copyText(text, btn) {
    function done() {
      if (!btn) return;
      var old = btn.textContent;
      btn.textContent = "Copied";
      setTimeout(function () { btn.textContent = old; }, 1400);
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done, done);
    } else {
      try {
        var ta = document.createElement("textarea");
        ta.value = text; document.body.appendChild(ta); ta.select();
        document.execCommand("copy"); document.body.removeChild(ta); done();
      } catch (e) {}
    }
  }

  function renderUser(content) {
    var row = el("div", "msg-row user");
    var bubble = el("div", "bubble bubble-user");
    bubble.textContent = content;
    row.appendChild(bubble);
    thread.appendChild(row);
    return row;
  }

  function renderAI(content, opts) {
    opts = opts || {};
    var row = el("div", "msg-row ai");
    var card = el("div", "bubble bubble-ai");

    var label = el("div", "ai-label");
    label.appendChild(el("span", "ai-dot"));
    label.appendChild(el("span", null, "Load AI"));
    card.appendChild(label);

    var bodyEl = el("div", "ai-body");
    bodyEl.textContent = content;
    card.appendChild(bodyEl);

    if (!opts.transient) {
      var actions = el("div", "msg-actions");

      var copyBtn = el("button", "msg-action", "Copy");
      copyBtn.type = "button";
      copyBtn.setAttribute("aria-label", "Copy this response");
      copyBtn.addEventListener("click", function () { copyText(content, copyBtn); });
      actions.appendChild(copyBtn);

      var infoBtn = el("button", "msg-action", "Why this answer");
      infoBtn.type = "button";
      infoBtn.setAttribute("aria-label", "How Load AI handles bias");
      infoBtn.setAttribute("aria-expanded", "false");
      var note = el("div", "bias-note", BIAS_NOTE);
      note.hidden = true;
      infoBtn.addEventListener("click", function () {
        note.hidden = !note.hidden;
        infoBtn.setAttribute("aria-expanded", note.hidden ? "false" : "true");
      });
      actions.appendChild(infoBtn);

      card.appendChild(actions);
      card.appendChild(note);
    }

    row.appendChild(card);
    thread.appendChild(row);
    return { row: row, bodyEl: bodyEl };
  }

  function renderError(message) {
    var row = el("div", "msg-row ai");
    var card = el("div", "bubble bubble-error");
    card.setAttribute("role", "alert");
    card.appendChild(el("div", "ai-label", "Load AI — not sent"));
    card.appendChild(el("div", "ai-body", message));
    row.appendChild(card);
    thread.appendChild(row);
  }

  function renderAll() {
    if (!thread) return;
    thread.innerHTML = "";
    var history = LoadAI.getHistory();
    if (!history.length) {
      var hint = el("div", "thread-empty");
      hint.appendChild(el("p", "thread-empty-title", "Start a conversation"));
      hint.appendChild(el("p", "thread-empty-sub", "Load AI answers with evidence first, no cultural default."));
      thread.appendChild(hint);
      return;
    }
    history.forEach(function (m) {
      if (m.role === "user") renderUser(m.content);
      else if (m.role === "assistant") renderAI(m.content, {});
    });
    scrollToEnd();
  }

  function setBusy(state) {
    busy = state;
    if (sendBtn) sendBtn.disabled = state;
    if (input) input.disabled = state;
  }

  function send() {
    if (busy || !input) return;
    var text = input.value.trim();
    if (!text) return;

    LoadAI.pushTurn("user", text);
    // Remove the empty-state hint if present.
    var empty = thread.querySelector(".thread-empty");
    if (empty) empty.remove();
    renderUser(text);
    input.value = "";
    autoGrow();
    scrollToEnd();

    var pending = renderAI("Thinking…", { transient: true });
    pending.row.classList.add("pending");
    scrollToEnd();
    setBusy(true);

    LoadAI.callGroq(LoadAI.getHistory()).then(function (reply) {
      pending.row.remove();
      LoadAI.pushTurn("assistant", reply);
      renderAI(reply, {});
      scrollToEnd();
      setBusy(false);
      if (input) input.focus();
    }).catch(function (err) {
      pending.row.remove();
      renderError((err && err.message) ? err.message : "Something went wrong.");
      scrollToEnd();
      setBusy(false);
    });
  }

  function clearConversation() {
    if (!LoadAI.getHistory().length) return;
    var ok = window.confirm("Clear this conversation? Your saved history will be removed from this device.");
    if (!ok) return;
    LoadAI.setHistory([]);
    renderAll();
    if (LoadAI.home) LoadAI.home.refresh();
  }

  function autoGrow() {
    if (!input) return;
    input.style.height = "auto";
    input.style.height = Math.min(input.scrollHeight, 160) + "px";
  }

  var Chat = {
    init: function () {
      thread = document.getElementById("chatThread");
      input = document.getElementById("chatInput");
      sendBtn = document.getElementById("chatSendBtn");

      if (sendBtn) sendBtn.addEventListener("click", send);
      if (input) {
        input.addEventListener("input", autoGrow);
        input.addEventListener("keydown", function (e) {
          // Enter sends; Shift+Enter makes a new line.
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            send();
          }
        });
      }
      var clearBtn = document.getElementById("chatClearBtn");
      if (clearBtn) clearBtn.addEventListener("click", clearConversation);

      var micBtn = document.getElementById("chatMicBtn");
      if (micBtn) micBtn.addEventListener("click", function () {
        LoadAI.showScreen("voice");
      });

      renderAll();
    },
    onShow: function () {
      renderAll();
      if (input) setTimeout(function () { input.focus(); }, 60);
    },
    primeMode: function (mode) {
      if (input) {
        input.placeholder = MODE_HINTS[mode] || MODE_HINTS.chat;
        setTimeout(function () { input.focus(); }, 60);
      }
    },
    // Used by the Voice screen to push a spoken exchange into the
    // shared thread + history.
    appendExchange: function (userText, aiText) {
      LoadAI.pushTurn("user", userText);
      LoadAI.pushTurn("assistant", aiText);
    }
  };

  window.LoadAI = window.LoadAI || {};
  window.LoadAI.chat = Chat;
})();
