// Load — centralized public-facing branding (™ usage).
// Values mirror /branding.json. Loaded as a plain script so any
// HTML page in the suite can do:
//   <script src="/ancient-covenant-scrolls/branding.js"></script>
//   <span class="brand">{LoadBranding.studioNameMixed}</span>
// Do NOT use the registered (R) symbol unless explicitly authorised.

(function () {
'use strict';

var BRANDING = {
  ecosystemName:        'LOAD ECO™',
  ecosystemNameMixed:   'Load Eco™',
  studioName:           'LOAD STUDIO™',
  studioNameMixed:      'Load Studio™',
  playName:             'LOAD PLAY™',
  playNameMixed:        'Load Play™',
  tasksName:            'LOAD TASKS™',
  tasksNameMixed:       'Load Tasks™',
  owner:                'LBond',
  copyrightYear:        2026,
  tagline:              'The offline-first creation suite for iPad'
};

// Visible-text rewriter: walks the DOM after load and inserts a
// <sup class="tm">™</sup> after any plain-text occurrence of the
// four primary brand names that does not already carry one. Skips
// <script>, <style>, <code>, <pre>, <kbd>, <input>, <textarea>,
// and any element with data-brand-skip. Idempotent.
var BRANDS = ['LOAD ECO','LOAD STUDIO','LOAD PLAY','LOAD TASKS','Load Eco','Load Studio','Load Play','Load Tasks'];
var SKIP_TAGS = { SCRIPT:1, STYLE:1, CODE:1, PRE:1, KBD:1, INPUT:1, TEXTAREA:1, NOSCRIPT:1 };

function ensureCss() {
  if (document.getElementById('load-brand-tm-css')) return;
  var s = document.createElement('style');
  s.id = 'load-brand-tm-css';
  // Premium, subtle: small superscript, slightly bolder, tight tracking.
  s.textContent = '.tm{vertical-align:super;font-size:.55em;letter-spacing:.02em;font-weight:700;margin-left:.05em;line-height:0}';
  document.head && document.head.appendChild(s);
}

function rewriteTextNode(node) {
  var text = node.nodeValue;
  if (!text) return;
  var changed = false;
  var html = '';
  var i = 0;
  while (i < text.length) {
    var bestIdx = -1, bestBrand = '';
    for (var b = 0; b < BRANDS.length; b++) {
      var idx = text.indexOf(BRANDS[b], i);
      if (idx !== -1 && (bestIdx === -1 || idx < bestIdx)) { bestIdx = idx; bestBrand = BRANDS[b]; }
    }
    if (bestIdx === -1) { html += escHtml(text.slice(i)); break; }
    var after = bestIdx + bestBrand.length;
    var nextChar = text.charAt(after);
    // Skip if already followed by ™ (or html-encoded equivalent).
    if (nextChar === '™') { html += escHtml(text.slice(i, after + 1)); i = after + 1; continue; }
    // Word-boundary check on right side.
    if (/[A-Za-z0-9_]/.test(nextChar)) { html += escHtml(text.slice(i, after)); i = after; continue; }
    html += escHtml(text.slice(i, after)) + '<sup class="tm">™</sup>';
    i = after;
    changed = true;
  }
  if (changed) {
    var span = document.createElement('span');
    span.innerHTML = html;
    node.parentNode.replaceChild(span, node);
  }
}

function escHtml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function shouldSkip(el) {
  if (!el || !el.tagName) return false;
  if (SKIP_TAGS[el.tagName]) return true;
  if (el.hasAttribute && el.hasAttribute('data-brand-skip')) return true;
  return false;
}

function walk(root) {
  if (!root) return;
  if (shouldSkip(root)) return;
  var children = Array.prototype.slice.call(root.childNodes || []);
  for (var i = 0; i < children.length; i++) {
    var n = children[i];
    if (n.nodeType === 3) rewriteTextNode(n);
    else if (n.nodeType === 1) walk(n);
  }
}

function applyToDocument() {
  ensureCss();
  if (!document.body) return;
  walk(document.body);
  // Patch <title> too.
  if (document.title) {
    var t = document.title;
    BRANDS.forEach(function (b) {
      var re = new RegExp(b.replace(/ /g, '\\s'), 'g');
      t = t.replace(re, function (m, off, full) {
        var after = full.charAt(off + m.length);
        return (after === '™') ? m : (m + '™');
      });
    });
    if (t !== document.title) document.title = t;
  }
}

if (typeof window !== 'undefined') {
  window.LoadBranding = BRANDING;
  window.LoadBranding.applyToDocument = applyToDocument;
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyToDocument);
  } else {
    applyToDocument();
  }
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = BRANDING;
}
})();
