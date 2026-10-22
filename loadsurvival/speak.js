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
  var reading = false, readDone = null;
  function stop() { reading = false; try { if (supported()) window.speechSynthesis.cancel(); } catch (e) {} finish(); }
  function finish() { var d = readDone; readDone = null; if (d) { try { d(); } catch (e) {} } }
  function pickEn() {
    var v = voices(), i;
    for (i = 0; i < v.length; i++) if (/^en[-_]US/i.test(v[i].lang)) return v[i];
    for (i = 0; i < v.length; i++) if (/^en[-_]GB/i.test(v[i].lang)) return v[i];
    for (i = 0; i < v.length; i++) if (/^en/i.test(v[i].lang)) return v[i];
    return null;
  }
  function chunks(list) {
    var out = [];
    list.forEach(function (t) {
      t = String(t || '').replace(/\s+/g, ' ').trim(); if (!t) return;
      var parts = t.match(/[^.!?]+[.!?]*/g) || [t], cur = '';
      parts.forEach(function (p) { if ((cur + p).length > 200 && cur) { out.push(cur.trim()); cur = p; } else cur += p; });
      if (cur.trim()) out.push(cur.trim());
    });
    return out;
  }
  /* Read a list of English sentences one after another. Short pieces keep iPad Safari from cutting off. */
  function readList(list, done, lang) {
    if (!supported()) { msg('This device cannot read aloud.'); return false; }
    var c = chunks(list); if (!c.length) return false;
    stop(); readDone = done || null; reading = true;
    var pt = lang === 'pt', v = pt ? pick() : pickEn(), i = 0;
    if (!v && voices().length) msg(pt ? 'No Portuguese voice found. On iPad: Settings, Accessibility, Spoken Content, Voices, Portuguese.' : 'No English voice found. The device will use its default voice.');
    function next() {
      if (!reading || i >= c.length) { reading = false; finish(); return; }
      var u = new window.SpeechSynthesisUtterance(c[i++]);
      u.lang = pt ? 'pt-PT' : 'en-US'; if (v) { u.voice = v; u.lang = v.lang; }
      u.rate = slow ? 0.7 : 0.95;
      u.onend = next;
      u.onerror = function (e) { if (e && (e.error === 'interrupted' || e.error === 'canceled')) return; reading = false; msg('Could not play the sound. Check the volume.'); finish(); };
      try { window.speechSynthesis.speak(u); } catch (x) { reading = false; msg('Could not play the sound.'); finish(); }
    }
    setTimeout(next, 80);
    return true;
  }
  function isReading() { return reading; }
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
  function readBtn() {
    return '<div class="readrow"><button type="button" id="readbtn" class="speakbtn" data-action="read-guide" aria-label="Listen to this guide read aloud">' + ICON + '<span>' + (reading ? 'Stop reading' : 'Listen to this guide') + '</span></button>' + slowToggle() + '</div>';
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
  window.LOAD_SPEAK = { btn: btn, speak: speak, stop: stop, slowToggle: slowToggle, supported: supported, readList: readList, isReading: isReading, readBtn: readBtn };
})();
