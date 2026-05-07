// Load — FFmpeg / Audio-Video Muxing Future Path (reliability addendum #13)
//
// MVP-honest stub. The spec explicitly says "Do not block MVP on
// muxing, but reserve the architecture for it." This library reserves
// that architecture: the route ids, the operation list, and the entry
// points that the real future backends (FFmpeg.wasm / backend FFmpeg /
// Load Local Engine) will wire into.
//
// Every operation entry point REJECTS until a real backend registers
// itself, so no caller can ever claim a successful mux without a real
// playable file behind it (output-proof rule).
//
// Public API:
//   window.LoadMux.ROUTES          - 3 future routes (id, name, tier, notes)
//   window.LoadMux.OPERATIONS      - 5 spec operations
//   window.LoadMux.STATUSES        - 4 outcome strings
//   window.LoadMux.isAvailable()   -> bool (always false in MVP)
//   window.LoadMux.canMux(opId)    -> bool (false in MVP)
//   window.LoadMux.detect()        -> Promise<{ routes, anyAvailable, mvp }>
//   window.LoadMux.registerBackend(impl)
//                                  -> registers a future implementation
//                                     that supplies real ops; intentionally
//                                     a no-op until that future arrives
//   window.LoadMux.muxVideoAudio({ video, audio })            -> Promise<rejects>
//   window.LoadMux.extractAudio({ video })                    -> Promise<rejects>
//   window.LoadMux.convertAudio({ blob, targetMime })         -> Promise<rejects>
//   window.LoadMux.compressVideo({ video, targetBitrate })    -> Promise<rejects>
//   window.LoadMux.createPreviewProxy({ video })              -> Promise<rejects>

(function () {
'use strict';

var ROUTES = [
  { id: 'ffmpeg-wasm',     name: 'FFmpeg.wasm',           tier: 'future-local',        notes: 'In-browser via WebAssembly. ~30 MB one-time download. Highest-fidelity local mux path.' },
  { id: 'ffmpeg-backend',  name: 'Backend FFmpeg',        tier: 'future-server',       notes: 'Server-side FFmpeg if Load adds a backend later. Fastest for large files.' },
  { id: 'load-engine-mux', name: 'Load Local Engine mux', tier: 'future-load-hosted',  notes: 'Future Load-owned local engine. No third-party dependency.' }
];

var OPERATIONS = [
  { id: 'mux-video-audio',    name: 'Mux video + audio into final MP4' },
  { id: 'extract-audio',      name: 'Extract audio from video' },
  { id: 'convert-audio',      name: 'Convert audio formats' },
  { id: 'compress-video',     name: 'Compress video' },
  { id: 'preview-proxy',      name: 'Create preview proxy' }
];

var STATUSES = ['Not implemented in MVP', 'Available', 'Failed', 'Backend missing'];
var BACKEND = null; // populated only when a future backend calls registerBackend(impl)

function isAvailable() { return BACKEND !== null && typeof BACKEND === 'object'; }

function canMux(opId) {
  if (!isAvailable()) return false;
  if (!OPERATIONS.some(function (o) { return o.id === opId; })) return false;
  return typeof BACKEND[opId] === 'function';
}

function registerBackend(impl) {
  if (!impl || typeof impl !== 'object') throw new Error('backend must be an object with operation methods');
  BACKEND = impl;
  return true;
}

function detect() {
  return Promise.resolve(ROUTES.map(function (r) {
    return {
      id: r.id, name: r.name, tier: r.tier, notes: r.notes,
      available: !!(BACKEND && BACKEND.routeId === r.id),
      reason: (BACKEND && BACKEND.routeId === r.id) ? 'backend registered' : 'not implemented in MVP — reserved as ' + r.tier + ' route'
    };
  })).then(function (rows) {
    return { routes: rows, anyAvailable: rows.some(function (r) { return r.available; }), mvp: !rows.some(function (r) { return r.available; }) };
  });
}

function notImplemented(opId) {
  var op = OPERATIONS.find(function (o) { return o.id === opId; });
  var label = op ? op.name : opId;
  return Promise.reject(new Error(label + ' not implemented in MVP. Reserved future routes: ' + ROUTES.map(function (r) { return r.id; }).join(', ') + '. Call LoadMux.registerBackend({...}) when a real backend is wired.'));
}

function muxVideoAudio(spec) {
  if (canMux('mux-video-audio')) return BACKEND['mux-video-audio'](spec);
  return notImplemented('mux-video-audio');
}
function extractAudio(spec) {
  if (canMux('extract-audio')) return BACKEND['extract-audio'](spec);
  return notImplemented('extract-audio');
}
function convertAudio(spec) {
  if (canMux('convert-audio')) return BACKEND['convert-audio'](spec);
  return notImplemented('convert-audio');
}
function compressVideo(spec) {
  if (canMux('compress-video')) return BACKEND['compress-video'](spec);
  return notImplemented('compress-video');
}
function createPreviewProxy(spec) {
  if (canMux('preview-proxy')) return BACKEND['preview-proxy'](spec);
  return notImplemented('preview-proxy');
}

if (typeof window !== 'undefined') {
  window.LoadMux = {
    ROUTES: ROUTES.slice(),
    OPERATIONS: OPERATIONS.slice(),
    STATUSES: STATUSES.slice(),
    isAvailable: isAvailable,
    canMux: canMux,
    detect: detect,
    registerBackend: registerBackend,
    muxVideoAudio: muxVideoAudio,
    extractAudio: extractAudio,
    convertAudio: convertAudio,
    compressVideo: compressVideo,
    createPreviewProxy: createPreviewProxy
  };
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ROUTES: ROUTES, OPERATIONS: OPERATIONS, STATUSES: STATUSES, isAvailable: isAvailable, canMux: canMux, detect: detect, registerBackend: registerBackend, muxVideoAudio: muxVideoAudio, extractAudio: extractAudio, convertAudio: convertAudio, compressVideo: compressVideo, createPreviewProxy: createPreviewProxy };
}
})();
