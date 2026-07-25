/*
 * Location Manager  —  platform-independent location state + travel detection.
 *
 * Modes (priority high -> low):
 *   AUTO_TRAVEL  (only while user-enabled; uses GPS)
 *   MANUAL       (user-selected city; overrides GPS)
 *   HOME         (permanent default: Coimbra)
 *
 * GPS acquisition is NOT done here (that is a browser API). This module holds
 * state, resolves the active location by priority, detects meaningful travel,
 * and enforces the fail-safes. Inject coordinates from the platform layer.
 */
(function (global) {
  'use strict';

  var HOME = { name: 'Coimbra', country: 'Portugal', lat: 40.2033, lon: -8.4103, tz: 'Europe/Lisbon' };
  var MODE = { HOME: 'Home', MANUAL: 'Manual', AUTO: 'Automatic Travel' };
  var TRAVEL_KM = 10;   // do not recalc for sub-10km GPS jitter

  function haversineKm(a, b) {
    var R = 6371, RAD = Math.PI / 180;
    var dLat = (b.lat - a.lat) * RAD, dLon = (b.lon - a.lon) * RAD;
    var s = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(a.lat * RAD) * Math.cos(b.lat * RAD) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    return 2 * R * Math.asin(Math.min(1, Math.sqrt(s)));
  }

  // Resolve which location is active given the current state. Never invents
  // coordinates; falls back HOME (Coimbra) when nothing valid exists.
  function resolveActive(state) {
    state = state || {};
    if (state.autoTravelEnabled && valid(state.gpsLocation))
      return tag(state.gpsLocation, MODE.AUTO);
    if (valid(state.manualLocation))
      return tag(state.manualLocation, MODE.MANUAL);
    if (valid(state.homeLocation))
      return tag(state.homeLocation, MODE.HOME);
    return tag(HOME, MODE.HOME);                    // permanent fail-safe
  }

  function valid(l) {
    return l && typeof l.lat === 'number' && typeof l.lon === 'number' &&
      l.lat >= -90 && l.lat <= 90 && l.lon >= -180 && l.lon <= 180 && !!l.tz;
  }
  function tag(l, mode) {
    return { name: l.name || 'Current Location', country: l.country || '',
             lat: l.lat, lon: l.lon, tz: l.tz, mode: mode };
  }

  // Decide whether a recalculation is warranted (battery-friendly).
  function shouldRecalc(prev, next, ctx) {
    ctx = ctx || {};
    var reasons = [];
    if (!prev) reasons.push('first-run');
    else {
      if (prev.tz !== next.tz) reasons.push('timezone-changed');
      if (haversineKm(prev, next) >= TRAVEL_KM) reasons.push('moved>=10km');
    }
    if (ctx.dateChanged) reasons.push('date-changed');
    if (ctx.appResumed) reasons.push('app-resumed');
    if (ctx.manualUpdate) reasons.push('user-pressed-update');
    return { recalc: reasons.length > 0, reasons: reasons };
  }

  var API = { HOME: HOME, MODE: MODE, TRAVEL_KM: TRAVEL_KM,
              haversineKm: haversineKm, resolveActive: resolveActive,
              isValid: valid, shouldRecalc: shouldRecalc };
  if (typeof module !== 'undefined' && module.exports) module.exports = API;
  else global.ACRLocationManager = API;
})(typeof self !== 'undefined' ? self : this);
