// Load — Provider Timeout Rules (reliability addendum #6)
//
// Centralised per-intent timeout matrix. Every fetch / poll / probe in
// the AI pipeline should call LoadTimeouts.withTimeout(promise, ms,
// label) so we never leave Safari hanging on a slow or unreachable
// provider, and we always emit a clear timeout error message.
//
// Public API:
//   window.LoadTimeouts.DEFAULTS                   - { intent -> ms }
//   window.LoadTimeouts.byIntent(intent)           -> ms (fallback 30000)
//   window.LoadTimeouts.withTimeout(p, ms, label)  -> Promise (rejects on timeout)
//   window.LoadTimeouts.list()                     -> [{ intent, ms, range, source }]

(function () {
'use strict';

// Spec defaults (reliability addendum item 6):
//   image: 45 s
//   image-to-image: 60 s
//   video/animation: 3-8 min  -> upper bound 480 s
//   audio/SFX: 60-120 s       -> upper bound 120 s
//   voice/narration: 60-120 s -> upper bound 120 s
//   local server check: 10 s
//   provider connection test: 10 s
//
// Aliases included so callers can pass either spec wording or the
// intent ids that LoadAICore already exposes.
var DEFAULTS = {
  // Spec rows
  'image':                    45000,
  'image-to-image':            60000,
  'video':                    480000,
  'animation':                480000,
  'audio':                    120000,
  'sfx':                      120000,
  'voice':                    120000,
  'narration':                120000,
  'local-server-check':        10000,
  'provider-connection-test':  10000,
  // Intent-id aliases used by LoadAICore
  'image-gen':                 45000,
  'image-anim':               480000,
  'ambience':                 120000,
  'music':                    120000,
  'mux':                      120000,
  // Chat / text — addendum doesn't list, sensible default
  'chat':                      30000,
  'text':                      30000,
  // Provider-specific overrides
  'pollinations-text':         30000,
  'pollinations-image':        45000,
  'horde-text':                60000,
  'horde-image':              120000,
  'kenburns-record':           30000,
  'web-audio-render':          30000
};

var SPEC_RANGES = {
  'image':                    '45 s',
  'image-to-image':           '60 s',
  'video':                    '3-8 min',
  'animation':                '3-8 min',
  'audio':                    '60-120 s',
  'sfx':                      '60-120 s',
  'voice':                    '60-120 s',
  'narration':                '60-120 s',
  'local-server-check':       '10 s',
  'provider-connection-test': '10 s'
};

function byIntent(intent) {
  if (intent && Object.prototype.hasOwnProperty.call(DEFAULTS, intent)) return DEFAULTS[intent];
  return 30000;
}

function withTimeout(promise, ms, label) {
  return new Promise(function (resolve, reject) {
    var to = setTimeout(function () { reject(new Error((label || 'request') + ' timed out (' + ms + ' ms)')); }, ms);
    Promise.resolve(promise).then(function (v) { clearTimeout(to); resolve(v); }, function (e) { clearTimeout(to); reject(e); });
  });
}

function list() {
  return Object.keys(DEFAULTS).map(function (k) {
    return { intent: k, ms: DEFAULTS[k], range: SPEC_RANGES[k] || '-', isSpec: !!SPEC_RANGES[k] };
  });
}

if (typeof window !== 'undefined') {
  window.LoadTimeouts = { DEFAULTS: DEFAULTS, byIntent: byIntent, withTimeout: withTimeout, list: list };
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { DEFAULTS: DEFAULTS, byIntent: byIntent, withTimeout: withTimeout, list: list };
}
})();
