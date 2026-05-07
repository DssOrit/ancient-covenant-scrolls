// Load — Retry & Resume System (reliability addendum #5)
//
// Two responsibilities:
//   1. Detect "interrupted" jobs — jobs in a pre-terminal status
//      (Queued / Preparing / Generating / Saving / Attaching to scene
//      / Retrying) whose updatedAt is older than a stale threshold,
//      because the page reloaded mid-job. Mark them Failed with the
//      reason "interrupted by reload" so the queue is honest, and
//      surface them for one-tap retry.
//   2. Persist + recover chat thread state (last prompt, last
//      reference image data URL, last attached scene id) so the
//      chat surface can pick up where it left off.
//
// Public API:
//   window.LoadResume.STALE_MS                                 - default 60000
//   window.LoadResume.scanInterrupted(staleMs?)                -> Promise<[job]>
//   window.LoadResume.lastThread()                             -> Promise<threadId|null>
//   window.LoadResume.recover(threadId)                        -> Promise<recoveryBundle>
//   window.LoadResume.saveChatState(state)                     -> Promise
//   window.LoadResume.loadChatState()                          -> Promise<state|null>
//
// recoveryBundle:
//   { threadId, lastPrompt, lastRefDataUrl, lastSceneId,
//     lastImage, lastVideoBlob, lastAudioBlob, sceneCount, jobCount }

(function () {
'use strict';

var STALE_MS = 60000;
var STATE_KEY = 'chat-studio-state';

function getDB() { return (typeof window !== 'undefined' && window.LoadDB) ? window.LoadDB : null; }
function getQueue() { return (typeof window !== 'undefined' && window.LoadQueue) ? window.LoadQueue : null; }

function nonTerminal(status) {
  return status === 'Queued' || status === 'Preparing' || status === 'Generating' ||
         status === 'Saving' || status === 'Attaching to scene' || status === 'Retrying';
}

// Find non-terminal queue jobs older than staleMs and flip them to Failed
// with error 'interrupted by reload'. Returns the list of jobs that were
// just marked Failed (not the ones already Failed before the scan).
function scanInterrupted(staleMs) {
  var Q = getQueue(); if (!Q) return Promise.resolve([]);
  var threshold = Date.now() - (typeof staleMs === 'number' ? staleMs : STALE_MS);
  return Q.all().then(function (list) {
    var doomed = list.filter(function (j) {
      if (!nonTerminal(j.status)) return false;
      var t = Date.parse(j.updatedAt || j.createdAt || 0);
      return !isNaN(t) && t < threshold;
    });
    return Promise.all(doomed.map(function (j) {
      return Q.update(j.jobId, { status: 'Failed', error: 'interrupted by reload (was ' + j.status + ')' });
    })).then(function () { return doomed; });
  });
}

function lastThread() {
  var Q = getQueue(); if (!Q) return Promise.resolve(null);
  return Q.recent(1).then(function (list) {
    return (list && list[0] && list[0].threadId) ? list[0].threadId : null;
  });
}

function recover(threadId) {
  var db = getDB(); if (!db || !threadId) return Promise.resolve(null);
  return Promise.all([
    db.getAll('scenes', 500),
    db.getAll('image_assets', 500),
    db.getAll('audio_assets', 500),
    db.getAll('video_assets', 500),
    db.getAll('kv', 2000)
  ]).then(function (rows) {
    var scenes = rows[0].map(function (r) { return r.value; })
      .filter(function (v) { return v && v.threadId === threadId; })
      .sort(function (a, b) { return (a.createdAt < b.createdAt) ? 1 : -1; });
    var ids = scenes.map(function (s) { return s.sceneId; });
    var imgRow = rows[1].map(function (r) { return r.value; }).find(function (v) { return v && ids.indexOf(v.sceneId) !== -1; });
    var audRow = rows[2].map(function (r) { return r.value; }).find(function (v) { return v && ids.indexOf(v.sceneId) !== -1; });
    var vidRow = rows[3].map(function (r) { return r.value; }).find(function (v) { return v && ids.indexOf(v.sceneId) !== -1; });
    var jobs = rows[4].filter(function (r) { return typeof r.key === 'string' && r.key.indexOf('queue-') === 0 && r.value && r.value.threadId === threadId; }).map(function (r) { return r.value; });
    var state = rows[4].find(function (r) { return r.key === STATE_KEY; });
    var bundle = {
      threadId: threadId,
      lastPrompt: (state && state.value && state.value.lastPrompt) || (jobs[0] && jobs[0].prompt) || '',
      lastRefDataUrl: (state && state.value && state.value.lastRefDataUrl) || '',
      lastSceneId: scenes[0] ? scenes[0].sceneId : '',
      lastImage: scenes[0] ? scenes[0].image : '',
      lastVideoBlob: vidRow ? vidRow.blob : null,
      lastAudioBlob: audRow ? audRow.blob : null,
      lastImageBlob: imgRow ? imgRow.blob : null,
      sceneCount: scenes.length,
      jobCount: jobs.length
    };
    return bundle;
  });
}

function saveChatState(state) {
  var db = getDB(); if (!db) return Promise.resolve(false);
  if (!state || typeof state !== 'object') return Promise.resolve(false);
  var snapshot = {
    threadId: state.threadId || '',
    mode: state.mode || '',
    style: state.styleName || '',
    size: state.size || '',
    lastPrompt: state.lastPrompt || '',
    lastRefDataUrl: (state.ref && state.ref.dataUrl) ? state.ref.dataUrl.slice(0, 256 * 1024) : '', // cap to 256 KB
    localOnly: !!state.localOnly,
    savedAt: new Date().toISOString()
  };
  return db.put('kv', STATE_KEY, snapshot).then(function () { return true; }).catch(function () { return false; });
}

function loadChatState() {
  var db = getDB(); if (!db) return Promise.resolve(null);
  return db.get('kv', STATE_KEY).catch(function () { return null; });
}

if (typeof window !== 'undefined') {
  window.LoadResume = {
    STALE_MS: STALE_MS,
    scanInterrupted: scanInterrupted,
    lastThread: lastThread,
    recover: recover,
    saveChatState: saveChatState,
    loadChatState: loadChatState
  };
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { STALE_MS: STALE_MS, scanInterrupted: scanInterrupted, lastThread: lastThread, recover: recover, saveChatState: saveChatState, loadChatState: loadChatState };
}
})();
