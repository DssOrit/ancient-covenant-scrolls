/* lib-export-receipt.js — Load shared export receipt helper
 *
 * Build Plan Part 5: every export path produces a structured
 * receipt with file metadata, included/missing files, manifest +
 * service worker + rights + offline + safety status, and a
 * "next recommended action". Receipts persist to localStorage
 * key `load_receipts_v1` so the Receipts tool at
 * /load/tools/export-receipts.html can list them.
 *
 * Public API on window.LoadReceipt:
 *   LoadReceipt.create(opts) -> receipt object
 *   LoadReceipt.save(receipt) -> stored receipt id
 *   LoadReceipt.list() -> array of saved receipts
 *   LoadReceipt.get(id) -> receipt or null
 *   LoadReceipt.remove(id) -> boolean
 *   LoadReceipt.clear() -> void
 *   LoadReceipt.toJson(receipt) -> string
 *   LoadReceipt.toBlob(receipt) -> Blob
 *
 * Receipt fields match Build Plan Part 12 spec.
 */
(function (root) {
  var STORAGE_KEY = 'load_receipts_v1';
  var SCHEMA_VERSION = 1;

  function readAll() {
    try {
      var raw = root.localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      var arr = JSON.parse(raw);
      return Array.isArray(arr) ? arr : [];
    } catch (e) { return []; }
  }

  function writeAll(arr) {
    try {
      root.localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
      return true;
    } catch (e) { return false; }
  }

  function makeId() {
    return 'rcpt_' + Date.now().toString(36) + '_' +
      Math.random().toString(36).slice(2, 8);
  }

  function defaultStatus(v) {
    return v == null ? 'NOT TESTED' : v;
  }

  // Legacy field-name mapping for callers that predate the
  // Load_Main_Claude_Handoff_Report spec field names. Earlier
  // tools (chapter-splitter, epub-builder, ...) pass
  //   { tool, kind, files: <count>, sizeBytes, nextStep }.
  // The report (Section 11 / Part F) requires spec-shaped fields:
  //   { exportType, fileName, fileSize, includedFiles, ...,
  //     nextAction }.
  // We accept both and normalize so existing callers don't break.
  function normalize(opts) {
    var o = {};
    for (var k in opts) if (Object.prototype.hasOwnProperty.call(opts, k)) o[k] = opts[k];
    if (!o.exportType && o.kind) o.exportType = o.kind;
    if (!o.exportType && o.tool) o.exportType = o.tool;
    if (typeof o.fileSize !== 'number' && typeof o.sizeBytes === 'number') o.fileSize = o.sizeBytes;
    if (!o.nextAction && o.nextStep) o.nextAction = o.nextStep;
    if (!Array.isArray(o.includedFiles) && typeof o.files === 'number') {
      o.notes = (o.notes ? o.notes + ' ' : '') + 'fileCount=' + o.files;
    }
    return o;
  }

  function create(opts) {
    opts = normalize(opts || {});
    return {
      id: opts.id || makeId(),
      schemaVersion: SCHEMA_VERSION,
      exportType: opts.exportType || 'unknown',
      fileName: opts.fileName || '',
      fileSize: typeof opts.fileSize === 'number' ? opts.fileSize : 0,
      createdAt: opts.createdAt || new Date().toISOString(),
      includedFiles: Array.isArray(opts.includedFiles) ? opts.includedFiles.slice() : [],
      missingFiles: Array.isArray(opts.missingFiles) ? opts.missingFiles.slice() : [],
      warnings: Array.isArray(opts.warnings) ? opts.warnings.slice() : [],
      manifestStatus: defaultStatus(opts.manifestStatus),
      serviceWorkerStatus: defaultStatus(opts.serviceWorkerStatus),
      rightsStatus: defaultStatus(opts.rightsStatus),
      offlineStatus: defaultStatus(opts.offlineStatus),
      safetyStatus: defaultStatus(opts.safetyStatus),
      nextAction: opts.nextAction || '',
      notes: opts.notes || ''
    };
  }

  // Canonical export types from Section 11 (Part F).
  var EXPORT_TYPES = [
    'Standalone HTML',
    'PWA ZIP',
    'LoadStudio Package',
    'Backup',
    'Diagnostic Report',
    'LoadPlay Publish-Prep',
    'Standalone Book PWA'
  ];

  // The three required actions from Section 11 / Part F:
  // Download Receipt, Copy Receipt, Save Receipt to Library.
  function download(receipt, opts) {
    opts = opts || {};
    var safe = (receipt.fileName || receipt.exportType || 'export').replace(/[^A-Za-z0-9_.-]/g, '_');
    var name = opts.fileName || ('receipt-' + safe + '-' + receipt.id + '.json');
    var blob = toBlob(receipt);
    var url = root.URL.createObjectURL(blob);
    var a = root.document.createElement('a');
    a.href = url; a.download = name;
    root.document.body.appendChild(a); a.click();
    setTimeout(function () { root.URL.revokeObjectURL(url); a.parentNode && a.parentNode.removeChild(a); }, 200);
    return name;
  }

  function copy(receipt) {
    var t = toJson(receipt);
    if (root.navigator && root.navigator.clipboard && root.navigator.clipboard.writeText) {
      return root.navigator.clipboard.writeText(t);
    }
    return Promise.reject(new Error('Clipboard not available'));
  }

  function saveToLibrary(receipt) {
    return save(receipt);
  }

  function save(receipt) {
    if (!receipt || typeof receipt !== 'object') return null;
    if (!receipt.id) receipt.id = makeId();
    var arr = readAll();
    var i = arr.findIndex(function (r) { return r && r.id === receipt.id; });
    if (i >= 0) arr[i] = receipt;
    else arr.unshift(receipt);
    if (arr.length > 200) arr = arr.slice(0, 200);
    writeAll(arr);
    return receipt.id;
  }

  function list() { return readAll(); }

  function get(id) {
    var arr = readAll();
    return arr.find(function (r) { return r && r.id === id; }) || null;
  }

  function remove(id) {
    var arr = readAll();
    var n = arr.filter(function (r) { return r && r.id !== id; });
    var changed = n.length !== arr.length;
    if (changed) writeAll(n);
    return changed;
  }

  function clear() { writeAll([]); }

  function toJson(receipt) {
    return JSON.stringify(receipt, null, 2);
  }

  function toBlob(receipt) {
    return new Blob([toJson(receipt)], { type: 'application/json' });
  }

  root.LoadReceipt = {
    create: create,
    save: save,
    saveToLibrary: saveToLibrary,
    list: list,
    get: get,
    remove: remove,
    clear: clear,
    toJson: toJson,
    toBlob: toBlob,
    download: download,
    copy: copy,
    EXPORT_TYPES: EXPORT_TYPES,
    STORAGE_KEY: STORAGE_KEY,
    SCHEMA_VERSION: SCHEMA_VERSION
  };
})(typeof window !== 'undefined' ? window : globalThis);
