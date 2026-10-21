/* Read Portuguese aloud with the device's own text-to-speech (no internet, no audio files).
   Needs a Portuguese voice on the device. On iPad: Settings, Accessibility, Spoken Content, Voices, Portuguese. */
(function () {
  var KEY = 'loadsurvival:speak', slow = false, msgTimer = null;
  try { slow = JSON.parse(localStorage.getItem(KEY) || '{}').slow === true; } catch (e) {}
  function supported() { return !!(window.speechSynthesis && window.SpeechSynthesisUtterance); }
  function voices() { try { return window.speechSynthesis.getVoices() || []; } catch (e) { return []; } }
  function pick() {
    var v = voices(), i;
    for (i = 0; i < v.length; i++) if (/^pt[-_]PT/i.test(v[i].lang)) return v[i];
    for (i = 0; i < v.length; i++) if (/^pt/i.test(v[i].lang)) return v[i];
    return null;
  }
  function msg(t) {
    var el = document.getElementById('speakmsg');
    if (!el) { el = document.createElement('div'); el.id = 'speakmsg'; el.className = 'speakmsg'; el.setAttribute('role', 'status'); el.setAttribute('aria-live', 'polite'); document.body.appendChild(el); }
    el.textContent = t; el.classList.add('on');
    clearTimeout(msgTimer); msgTimer = setTimeout(function () { el.classList.remove('on'); }, 6000);
  }
  function stop() { try { if (supported()) window.speechSynthesis.cancel(); } catch (e) {} }
  function speak(text) {
    if (!supported()) { msg('This device cannot read aloud.'); return false; }
    text = String(text || '').replace(/[:.\u2026\s]+$/, '').trim(); if (!text) return false;
    stop();
    var u = new window.SpeechSynthesisUtterance(text), v = pick();
    u.lang = 'pt-PT'; if (v) { u.voice = v; u.lang = v.lang; }
    u.rate = slow ? 0.65 : 0.9;
    u.onerror = function () { msg('Could not play the sound. Check the volume and that a Portuguese voice is installed.'); };
    if (!v && voices().length) msg('No Portuguese voice found. On iPad: Settings, Accessibility, Spoken Content, Voices, Portuguese.');
    try { window.speechSynthesis.speak(u); } catch (e) { msg('Could not play the sound.'); return false; }
    return true;
  }
  var ICON = '<svg class="svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9H4zM16 8c2 2 2 6 0 8M19 6c3.500 3.500 3.500 8.500 0 12"/></svg>';
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function btn(text, label) {
    return '<button type="button" class="speakbtn" data-speak="' + esc(text) + '" aria-label="' + esc('Listen in Portuguese: ' + text) + '">' + ICON + '<span>' + esc(label || 'Listen') + '</span></button>';
  }
  function slowToggle() {
    return '<label class="slowtoggle"><input type="checkbox" data-speak-slow' + (slow ? ' checked' : '') + '> Slow speech</label>';
  }
  document.addEventListener('click', function (e) {
    var t = e.target; if (!t || !t.closest) return;
    var b = t.closest('[data-speak]');
    if (b) { e.preventDefault(); e.stopPropagation(); speak(b.getAttribute('data-speak')); }
  }, true);
  document.addEventListener('change', function (e) {
    var t = e.target; if (t && t.hasAttribute && t.hasAttribute('data-speak-slow')) {
      slow = !!t.checked; try { localStorage.setItem(KEY, JSON.stringify({ slow: slow })); } catch (x) {}
    }
  });
  window.addEventListener('hashchange', stop);
  if (supported() && window.speechSynthesis.addEventListener) { try { window.speechSynthesis.addEventListener('voiceschanged', function () {}); } catch (e) {} }
  window.LOAD_SPEAK = { btn: btn, speak: speak, stop: stop, slowToggle: slowToggle, supported: supported };
})();
