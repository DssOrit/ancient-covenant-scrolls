/*
 * Notification Provider abstraction  —  platform-independent dispatch layer.
 *
 * The Prayer Engine NEVER talks to Safari/Notification directly. It hands its
 * schedule to a NotificationManager, which forwards to whatever provider is
 * active. Swapping platforms (web -> native iOS/Android) changes only the
 * provider, never the Solar or Prayer engines.
 *
 * Every provider implements:
 *   name(), isSupported(), capabilities(), requestPermission()->Promise,
 *   schedule(prayerEvents)->{scheduled,skipped,note}, clearAll()
 *
 * capabilities().backgroundAlarms tells the truth about the platform:
 *   web/iOS Safari  -> false  (no OS-level scheduled alarms while app is closed)
 *   native iOS/Android -> true (future providers)
 */
(function (global) {
  'use strict';

  function Base(nameStr, caps) {
    this._name = nameStr;
    this._caps = caps || { foregroundNotify: false, backgroundAlarms: false };
    this._timers = [];
  }
  Base.prototype.name = function () { return this._name; };
  Base.prototype.capabilities = function () { return this._caps; };
  Base.prototype.isSupported = function () { return false; };
  Base.prototype.requestPermission = function () { return Promise.resolve('unsupported'); };
  Base.prototype.schedule = function () { return { scheduled: 0, skipped: 0, note: 'not implemented' }; };
  Base.prototype.clearAll = function () { this._timers.forEach(function (t) { clearTimeout(t); }); this._timers = []; };

  // --- Web provider: real, but honest about iOS Safari limits. ---
  // While the page is OPEN it can fire in-app Notifications at prayer time via
  // setTimeout. It CANNOT wake the phone with a scheduled alarm when the app is
  // closed — no web API allows that on iOS Safari. Documented, not faked.
  function WebNotificationProvider(win) {
    Base.call(this, 'Web Notification Provider',
      { foregroundNotify: true, backgroundAlarms: false });
    this._win = win || (typeof window !== 'undefined' ? window : null);
  }
  WebNotificationProvider.prototype = Object.create(Base.prototype);
  WebNotificationProvider.prototype.isSupported = function () {
    return !!(this._win && 'Notification' in this._win);
  };
  WebNotificationProvider.prototype.requestPermission = function () {
    if (!this.isSupported()) return Promise.resolve('unsupported');
    try { return this._win.Notification.requestPermission(); }
    catch (e) { return Promise.resolve('error'); }
  };
  WebNotificationProvider.prototype.schedule = function (events) {
    this.clearAll();
    if (!this.isSupported() || this._win.Notification.permission !== 'granted')
      return { scheduled: 0, skipped: events.length, note: 'permission not granted' };
    var self = this, now = Date.now(), n = 0, skip = 0;
    events.forEach(function (ev) {
      var delay = ev.utcTimestamp - now;
      if (delay <= 0) { skip++; return; }            // already passed
      var id = setTimeout(function () {
        try { new self._win.Notification('ACR Solar — ' + ev.name,
          { body: ev.location + ' · ' + ev.displayTime, icon: 'icon.png' }); } catch (e) {}
      }, delay);
      self._timers.push(id); n++;
    });
    // In-app only: these fire only while the tab stays alive.
    return { scheduled: n, skipped: skip,
             note: 'foreground-only; iOS Safari cannot fire alarms while app is closed' };
  };

  // --- Future/native provider stubs (would support true background alarms). ---
  function stub(nameStr) {
    var p = new Base(nameStr, { foregroundNotify: true, backgroundAlarms: true });
    p.schedule = function () {
      return { scheduled: 0, skipped: 0, note: nameStr + ' not implemented in this build' };
    };
    return p;
  }

  function NotificationManager(provider) { this._provider = provider; }
  NotificationManager.prototype.use = function (p) { if (this._provider) this._provider.clearAll(); this._provider = p; };
  NotificationManager.prototype.active = function () { return this._provider; };
  // Prayer Engine calls this — it never knows which provider is behind it.
  NotificationManager.prototype.dispatch = function (schedule) {
    if (!this._provider) return { scheduled: 0, skipped: schedule.length, note: 'no provider' };
    return this._provider.schedule(schedule);
  };

  var API = {
    Base: Base,
    WebNotificationProvider: WebNotificationProvider,
    NativeMobileProvider: function () { return stub('Native Mobile Notification Provider'); },
    AndroidProvider: function () { return stub('Android Provider'); },
    IOSNativeProvider: function () { return stub('iOS Native Provider'); },
    FutureProvider: function () { return stub('Future Provider'); },
    NotificationManager: NotificationManager
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = API;
  else global.ACRNotificationProvider = API;
})(typeof self !== 'undefined' ? self : this);
