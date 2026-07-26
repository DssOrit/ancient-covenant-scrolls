/*
 * Solar Diagnostics  —  platform-independent data assembler.
 * Builds the full diagnostics object from the other modules. The DOM rendering
 * of this data is a separate UI concern (browser); this module only assembles
 * verifiable facts so the values are testable outside a browser.
 */
(function (global) {
  'use strict';

  // deps: { engine, tzm } modules. runtime = platform-supplied live facts
  // (gpsAccuracy, notificationStatus, swStatus, offline) — may be null in Node.
  function build(active, dateISO, solarUTC, schedule, cn, nowMs, deps, runtime) {
    var tzm = deps.tzm, fmt = tzm.format;
    var d = new Date(nowMs);
    runtime = runtime || {};
    return {
      currentMode: active.mode,
      homeLocation: 'Coimbra, Portugal',
      currentLocation: active.name + (active.country ? ', ' + active.country : ''),
      latitude: active.lat,
      longitude: active.lon,
      timezone: active.tz,
      dstStatus: tzm.isDST(d, active.tz) ? 'DST (summer offset)' : 'Standard time',
      engineVersion: solarUTC.version || 'unknown',
      calcVersion: schedule.length ? schedule[0].calcVersion : 'n/a',
      calcTime: new Date(nowMs).toISOString(),
      sunrise: fmt(solarUTC.sunrise, active.tz),
      solarNoon: fmt(solarUTC.solarNoon, active.tz),
      sunset: fmt(solarUTC.sunset, active.tz),
      civilDawn: fmt(solarUTC.civilDawn, active.tz),
      civilDusk: fmt(solarUTC.civilDusk, active.tz),
      polar: solarUTC.polar || null,
      currentPrayer: cn.current ? cn.current.name : 'none yet today',
      nextPrayer: cn.next ? (cn.next.name + ' at ' + cn.next.displayTime) : 'none remaining today',
      countdownSeconds: cn.secondsToNext,
      gpsAccuracy: runtime.gpsAccuracy != null ? runtime.gpsAccuracy : 'unavailable in this environment',
      notificationStatus: runtime.notificationStatus || 'unknown (no browser)',
      serviceWorkerStatus: runtime.swStatus || 'unknown (no browser)',
      offlineStatus: runtime.offline != null ? runtime.offline : 'unknown (no browser)',
      lastLocationUpdate: runtime.lastLocationUpdate || dateISO,
      lastSolarRecalc: new Date(nowMs).toISOString()
    };
  }

  var API = { build: build };
  if (typeof module !== 'undefined' && module.exports) module.exports = API;
  else global.ACRSolarDiagnostics = API;
})(typeof self !== 'undefined' ? self : this);
