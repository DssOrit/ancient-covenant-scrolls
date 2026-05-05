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

  function create(opts) {
    opts = opts || {};
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
    list: list,
    get: get,
    remove: remove,
    clear: clear,
    toJson: toJson,
    toBlob: toBlob,
    STORAGE_KEY: STORAGE_KEY,
    SCHEMA_VERSION: SCHEMA_VERSION
  };
})(typeof window !== 'undefined' ? window : globalThis);
