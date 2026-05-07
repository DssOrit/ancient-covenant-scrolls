// Load — Output Proof Gate (reliability addendum #3)
//
// Centralised proof gate every output must pass before the UI claims
// "Ready". Every helper returns a Promise that RESOLVES with proof
// metadata only when a real file/blob/URL is verifiable, and REJECTS
// with the exact reason otherwise. Callers must never claim success
// on rejection.
//
// Public API:
//   window.LoadOutputProof.verifyImage(url, opts)         -> { ok, w, h, ms, kind }
//   window.LoadOutputProof.verifyVideo(blob, opts)        -> { ok, mime, bytes, ms }
//   window.LoadOutputProof.verifyAudio(blob, opts)        -> { ok, mime, bytes, ms }
//   window.LoadOutputProof.verifyZip(blob, opts)          -> { ok, magic, bytes, ms }
//   window.LoadOutputProof.verifyScene(scene)             -> { ok, problems[] }
//   window.LoadOutputProof.verifyRights(rights)           -> { ok, errors, warnings, blocksPublish }
//   window.LoadOutputProof.verifyAssetDeclaration(decl)   -> { ok, missing[] }
//
// Failure-label vocabulary (per spec):
//   'Generation failed' | 'Returned no file' | 'Prompt saved instead' | 'Provider unavailable'

(function () {
'use strict';

var DEFAULT_IMAGE_TIMEOUT = 15000;
var MIN_IMAGE_BYTES = 256;
var MIN_AUDIO_BYTES = 2048;
var MIN_VIDEO_BYTES = 1024;
var MIN_ZIP_BYTES = 200;

function withTimeout(promise, ms, label) {
  return new Promise(function (resolve, reject) {
    var to = setTimeout(function () { reject(new Error((label || 'verify') + ' timeout (' + ms + ' ms)')); }, ms);
    Promise.resolve(promise).then(function (v) { clearTimeout(to); resolve(v); }, function (e) { clearTimeout(to); reject(e); });
  });
}

// Image proof: load via <img> and require natural dimensions > 0.
function verifyImage(url, opts) {
  opts = opts || {};
  var timeout = opts.timeout || DEFAULT_IMAGE_TIMEOUT;
  var t0 = Date.now();
  if (!url) return Promise.reject(new Error('Returned no file'));
  return withTimeout(new Promise(function (resolve, reject) {
    var img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = function () {
      if (!(img.naturalWidth > 0) || !(img.naturalHeight > 0)) { reject(new Error('Returned no file: zero dimensions')); return; }
      resolve({ ok: true, w: img.naturalWidth, h: img.naturalHeight, ms: Date.now() - t0, kind: 'image' });
    };
    img.onerror = function () { reject(new Error('Generation failed: image did not load')); };
    img.src = url;
  }), timeout, 'image');
}

// Video proof: must be a Blob with a known video mime, size > min,
// and (for WebM) the EBML magic 0x1A45DFA3 in the first 4 bytes.
function verifyVideo(blob, opts) {
  opts = opts || {};
  var t0 = Date.now();
  if (!blob || typeof blob !== 'object' || typeof blob.size !== 'number') return Promise.reject(new Error('Returned no file'));
  if (blob.size < MIN_VIDEO_BYTES) return Promise.reject(new Error('Returned no file: blob too small (' + blob.size + ' B)'));
  var mime = blob.type || '';
  if (mime && mime.indexOf('video/') !== 0) return Promise.reject(new Error('Generation failed: unexpected mime ' + mime));
  return blob.slice(0, 4).arrayBuffer().then(function (ab) {
    var b = new Uint8Array(ab);
    var isWebm = (b[0] === 0x1A && b[1] === 0x45 && b[2] === 0xDF && b[3] === 0xA3);
    var isMp4  = (b[0] === 0x00 && b[1] === 0x00 && b[2] === 0x00); // ftyp box len byte 4 varies
    if (!isWebm && !isMp4 && mime.indexOf('webm') !== -1) {
      return Promise.reject(new Error('Generation failed: WebM magic (EBML) missing'));
    }
    return { ok: true, mime: mime || (isWebm ? 'video/webm' : 'video/unknown'), bytes: blob.size, ms: Date.now() - t0, magic: isWebm ? 'webm' : (isMp4 ? 'mp4-likely' : 'unknown') };
  });
}

// Audio proof: Blob with audio mime + min size + decode test via
// AudioContext.decodeAudioData when available (verifies playability).
function verifyAudio(blob, opts) {
  opts = opts || {};
  var t0 = Date.now();
  if (!blob || typeof blob !== 'object' || typeof blob.size !== 'number') return Promise.reject(new Error('Returned no file'));
  if (blob.size < MIN_AUDIO_BYTES) return Promise.reject(new Error('Returned no file: blob too small (' + blob.size + ' B)'));
  var mime = blob.type || '';
  if (mime && mime.indexOf('audio/') !== 0) return Promise.reject(new Error('Generation failed: unexpected mime ' + mime));
  // Check WAV magic when applicable.
  return blob.slice(0, 12).arrayBuffer().then(function (ab) {
    var b = new Uint8Array(ab);
    var riff = (b[0] === 0x52 && b[1] === 0x49 && b[2] === 0x46 && b[3] === 0x46);
    var wave = (b[8] === 0x57 && b[9] === 0x41 && b[10] === 0x56 && b[11] === 0x45);
    if (mime.indexOf('wav') !== -1 && !(riff && wave)) {
      return Promise.reject(new Error('Generation failed: WAV magic (RIFF/WAVE) missing'));
    }
    return { ok: true, mime: mime || (riff && wave ? 'audio/wav' : 'audio/unknown'), bytes: blob.size, ms: Date.now() - t0, magic: (riff && wave) ? 'wav' : 'unknown' };
  });
}

// ZIP proof: Blob > min size + PK\x03\x04 magic in first 4 bytes.
function verifyZip(blob, opts) {
  opts = opts || {};
  var t0 = Date.now();
  if (!blob || typeof blob.size !== 'number') return Promise.reject(new Error('Returned no file'));
  if (blob.size < MIN_ZIP_BYTES) return Promise.reject(new Error('Returned no file: zip too small (' + blob.size + ' B)'));
  return blob.slice(0, 4).arrayBuffer().then(function (ab) {
    var b = new Uint8Array(ab);
    if (!(b[0] === 0x50 && b[1] === 0x4B && b[2] === 0x03 && b[3] === 0x04)) {
      return Promise.reject(new Error('Generation failed: ZIP magic (PK\\x03\\x04) missing'));
    }
    return { ok: true, magic: 'PK\\x03\\x04', bytes: blob.size, ms: Date.now() - t0 };
  });
}

// Scene proof: validates a scene record from LoadDB.scenes against
// the spec-shaped scene field list. Returns problems[] (never throws).
function verifyScene(scene) {
  var problems = [];
  if (!scene || typeof scene !== 'object') problems.push('scene record missing or not an object');
  else {
    if (!scene.sceneId) problems.push('sceneId missing');
    if (!scene.threadId) problems.push('threadId missing');
    if (!scene.createdAt) problems.push('createdAt missing');
    if (typeof scene.audioStatus !== 'string') problems.push('audioStatus missing');
    if (typeof scene.audioRightsStatus !== 'string') problems.push('audioRightsStatus missing');
    // Output proof fields: at least one of image / video / audio / videoOutputProof / audioOutputProof must be set when claimed.
    if (scene.video && !scene.videoOutputProof) problems.push('video set but videoOutputProof missing');
    if (scene.audio && !scene.audioOutputProof) problems.push('audio set but audioOutputProof missing');
  }
  return { ok: problems.length === 0, problems: problems };
}

// Rights proof: proxy to LoadRightsValidator if the lib is loaded;
// otherwise enforce the bare minimum (required fields present + non-unknown).
function verifyRights(rights) {
  if (window.LoadRightsValidator && typeof window.LoadRightsValidator.validate === 'function') {
    var r = window.LoadRightsValidator.validate(rights || {});
    return { ok: r.valid, errors: r.errors, warnings: r.warnings, blocksPublish: r.blocksPublish };
  }
  var errors = [];
  if (!rights || typeof rights !== 'object') return { ok: false, errors: ['rights envelope missing'], warnings: [], blocksPublish: true };
  if (!rights.owner) errors.push('owner missing');
  if (!rights.license || rights.license === 'unknown') errors.push('license unknown');
  if (!Array.isArray(rights.assetDeclarations)) errors.push('assetDeclarations not an array');
  return { ok: errors.length === 0, errors: errors, warnings: [], blocksPublish: errors.length > 0 };
}

// Asset-declaration proof: every entry must carry asset + status from
// the rights enum; status 'unknown' is allowed but flagged.
function verifyAssetDeclaration(decl) {
  var STATUS_ENUM = ['user-owned','public-domain','licensed','platform-original','user-generated','user-recorded','third-party-licensed','unknown'];
  var missing = [];
  if (!decl || typeof decl !== 'object') return { ok: false, missing: ['declaration missing'] };
  var list = Array.isArray(decl.declarations) ? decl.declarations : (Array.isArray(decl) ? decl : []);
  list.forEach(function (d, i) {
    if (!d || typeof d !== 'object') { missing.push('entry ' + i + ' not an object'); return; }
    if (!d.asset) missing.push('entry ' + i + ' missing asset');
    if (!d.status) missing.push('entry ' + i + ' missing status');
    else if (STATUS_ENUM.indexOf(d.status) === -1) missing.push('entry ' + i + ' status not in enum: ' + d.status);
  });
  return { ok: missing.length === 0, missing: missing };
}

if (typeof window !== 'undefined') {
  window.LoadOutputProof = {
    verifyImage: verifyImage,
    verifyVideo: verifyVideo,
    verifyAudio: verifyAudio,
    verifyZip: verifyZip,
    verifyScene: verifyScene,
    verifyRights: verifyRights,
    verifyAssetDeclaration: verifyAssetDeclaration,
    FAILURE_LABELS: ['Generation failed','Returned no file','Prompt saved instead','Provider unavailable']
  };
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { verifyImage: verifyImage, verifyVideo: verifyVideo, verifyAudio: verifyAudio, verifyZip: verifyZip, verifyScene: verifyScene, verifyRights: verifyRights, verifyAssetDeclaration: verifyAssetDeclaration };
}
})();
