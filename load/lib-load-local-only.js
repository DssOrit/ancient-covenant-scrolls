// Load — Local-only Mode (reliability addendum #7)
//
// When Local-only mode is on, every cloud / free-api / load-hosted-future
// route is BLOCKED. Only built-in, local, prompt-only, and user-imported
// provider types are allowed. State is persisted in LoadDB.kv so the
// toggle survives Safari reloads.
//
// Public API:
//   window.LoadLocalOnly.init()                       -> Promise<bool>  (called automatically)
//   window.LoadLocalOnly.isOn()                       -> bool (synchronous after init)
//   window.LoadLocalOnly.setOn(on)                    -> Promise<bool>
//   window.LoadLocalOnly.subscribe(fn)                -> unsubscribe()
//   window.LoadLocalOnly.isAllowed(providerType)      -> bool
//   window.LoadLocalOnly.ALLOWED_TYPES                - 4-string array
//   window.LoadLocalOnly.guardedFetch(url, init)      -> Promise (rejects when on)

(function () {
'use strict';

var KEY = 'local-only';
var ALLOWED_TYPES = ['built-in', 'local', 'prompt-only', 'user-imported'];
var SUBS = [];
var CACHED = false;
var INITED = false;
var INIT_PROMISE = null;

function getDB() { return (typeof window !== 'undefined' && window.LoadDB) ? window.LoadDB : null; }

function init() {
  if (INIT_PROMISE) return INIT_PROMISE;
  var db = getDB();
  if (!db) {
    INITED = true;
    INIT_PROMISE = Promise.resolve(false);
    return INIT_PROMISE;
  }
  INIT_PROMISE = db.get('kv', KEY).then(function (v) {
    CACHED = !!(v && v.on);
    INITED = true;
    return CACHED;
  }).catch(function () {
    INITED = true;
    return false;
  });
  return INIT_PROMISE;
}

function isOn() { return CACHED; }

function setOn(on) {
  on = !!on;
  var db = getDB();
  function emit() {
    CACHED = on;
    SUBS.forEach(function (fn) { try { fn(on); } catch (_) {} });
    return on;
  }
  if (!db) return Promise.resolve(emit());
  return db.put('kv', KEY, { on: on, savedAt: new Date().toISOString() }).then(emit).catch(function () {
    return emit();
  });
}

function subscribe(fn) {
  if (typeof fn !== 'function') return function () {};
  SUBS.push(fn);
  return function () { var i = SUBS.indexOf(fn); if (i >= 0) SUBS.splice(i, 1); };
}

function isAllowed(providerType) {
  if (!CACHED) return true;
  return ALLOWED_TYPES.indexOf(providerType) !== -1;
}

// Cloud-fetch guard. Use this in place of fetch() for any call that
// must respect Local-only mode. When the mode is on, the returned
// promise rejects with a clear, copy-pasteable error message before
// any network traffic leaves the device.
function guardedFetch(url, opts) {
  if (CACHED) {
    return Promise.reject(new Error('Local-only mode is on — cloud fetch blocked: ' + url));
  }
  return fetch(url, opts);
}

if (typeof window !== 'undefined') {
  window.LoadLocalOnly = {
    ALLOWED_TYPES: ALLOWED_TYPES.slice(),
    init: init,
    isOn: isOn,
    setOn: setOn,
    subscribe: subscribe,
    isAllowed: isAllowed,
    guardedFetch: guardedFetch
  };
  // Eager init so isOn() is correct on first synchronous access after
  // the host page's DOMContentLoaded completes.
  init();
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ALLOWED_TYPES: ALLOWED_TYPES, init: init, isOn: isOn, setOn: setOn, subscribe: subscribe, isAllowed: isAllowed, guardedFetch: guardedFetch };
}
})();
