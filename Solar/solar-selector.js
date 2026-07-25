/*
 * Solar Engine Selector  —  the ONE place that decides which solar engine is
 * active. Production would call SolarEngine.getTimes(); nothing else needs to
 * know which engine is running. Rollback = setMode('legacy'), no file edits.
 *
 * Modes:
 *   legacy   the current production calculator (reproduced faithfully here)
 *   compare  runs legacy AND noaa, returns both plus minute differences
 *   noaa     the NOAA engine as source of truth  (OFF until explicitly approved)
 *
 * Default mode is LEGACY, so wiring production through this layer does not
 * change production behaviour until the mode is deliberately changed.
 *
 * This layer performs NO astronomy of its own for the NOAA path; it delegates
 * to solar-engine.js. The legacy path reproduces the production getSunTimes
 * formula (current main: corrected - EqT sign, with the modulo-24 hour wrap).
 */
(function (global) {
  'use strict';

  var SELECTOR_VERSION = 'solar-selector-1.0.0';
  var MODES = { LEGACY: 'legacy', COMPARE: 'compare', NOAA: 'noaa' };
  var currentMode = MODES.LEGACY;                 // NOAA is NOT enabled by default.

  function engine() {
    if (typeof ACRSolarEngine !== 'undefined') return ACRSolarEngine;
    if (typeof require !== 'undefined') return require('./solar-engine.js');
    return null;
  }
  function tzm() {
    if (typeof ACRTimezoneManager !== 'undefined') return ACRTimezoneManager;
    if (typeof require !== 'undefined') return require('./timezone-manager.js');
    return null;
  }

  // LEGACY: faithful reproduction of production getSunTimes (sunrise / solar noon
  // / sunset). Legacy has no proper civil dawn/dusk (-6 deg); those stay null.
  function legacyUTC(y, m, d, lat, lon) {
    var RAD = Math.PI / 180, DEG = 180 / Math.PI;
    var date = new Date(Date.UTC(y, m - 1, d, 12, 0, 0));
    var JD = date.getTime() / 86400000 + 2440587.5, n = JD - 2451545.0;
    var L = (280.46 + 0.9856474 * n) % 360, g = ((357.528 + 0.9856003 * n) % 360) * RAD;
    var lam = (L + 1.915 * Math.sin(g) + 0.02 * Math.sin(2 * g)) * RAD, eps = 23.439 * RAD;
    var dec = Math.asin(Math.sin(eps) * Math.sin(lam));
    var RA = Math.atan2(Math.cos(eps) * Math.sin(lam), Math.cos(lam)) * DEG;
    var cosHA = (Math.cos(90.833 * RAD) - Math.sin(lat * RAD) * Math.sin(dec)) / (Math.cos(lat * RAD) * Math.cos(dec));
    if (cosHA > 1 || cosHA < -1)
      return { engine: 'legacy', polar: cosHA > 1 ? 'polar-night' : 'polar-day',
               civilDawn: null, sunrise: null, solarNoon: null, sunset: null, civilDusk: null };
    var HA = Math.acos(cosHA) * DEG;
    var EqT = 4 * (L - 0.0057183 - RA + 360 * Math.round((L - RA) / 360));
    var noon = 12 - lon / 15 - EqT / 60;
    var base = Date.UTC(y, m - 1, d);
    function wrap(h) { return ((h % 24) + 24) % 24; }
    function inst(h) { return new Date(base + Math.round(wrap(h) * 3600000)); }
    return { engine: 'legacy', polar: null, civilDawn: null,
             sunrise: inst(noon - HA / 15), solarNoon: inst(noon), sunset: inst(noon + HA / 15), civilDusk: null };
  }

  function noaaUTC(y, m, d, lat, lon, elev) {
    var u = engine().solarEventsUTC(y, m, d, lat, lon, elev || 0); u.engine = 'noaa'; return u;
  }

  function fmt(dt, tz) { return dt ? tzm().format(dt, tz) : null; }

  function pack(u, tz) {
    return { engine: u.engine, polar: u.polar || null,
      civilDawn: fmt(u.civilDawn, tz), sunrise: fmt(u.sunrise, tz), solarNoon: fmt(u.solarNoon, tz),
      sunset: fmt(u.sunset, tz), civilDusk: fmt(u.civilDusk, tz), utc: u };
  }

  function compare(y, m, d, lat, lon, tz, elev) {
    var l = legacyUTC(y, m, d, lat, lon), no = noaaUTC(y, m, d, lat, lon, elev);
    var lp = pack(l, tz), np = pack(no, tz);
    // Deviation is measured on the DISPLAYED local time (what the user sees),
    // wrapped over the day boundary.
    function dl(a, b) {
      if (a == null || b == null) return null;
      function M(s) { var x = s.split(':'); return +x[0] * 60 + +x[1]; }
      var d2 = Math.abs(M(a) - M(b)); return d2 > 720 ? 1440 - d2 : d2;
    }
    // Whole-day offset between the raw UTC instants. Nonzero flags the legacy
    // date-boundary artifact (correct time-of-day, wrong calendar day) that the
    // NOAA engine does not have.
    function dayShift(a, b) { if (!a || !b) return null; return Math.round((a.getTime() - b.getTime()) / 86400000); }
    return {
      date: y + '-' + ('0' + m).slice(-2) + '-' + ('0' + d).slice(-2), timezone: tz,
      legacy: lp, noaa: np,
      diffMin: {
        sunrise: dl(lp.sunrise, np.sunrise),
        solarNoon: dl(lp.solarNoon, np.solarNoon),
        sunset: dl(lp.sunset, np.sunset),
        civilDawn: 'no legacy equivalent',
        civilDusk: 'no legacy equivalent'
      },
      legacyUtcDayShift: { sunrise: dayShift(l.sunrise, no.sunrise), sunset: dayShift(l.sunset, no.sunset) },
      legacyVersion: 'production-getSunTimes', noaaVersion: (no.version || 'noaa'), selectorVersion: SELECTOR_VERSION
    };
  }

  // THE single decision point. Default LEGACY => production behaviour unchanged.
  function getTimes(y, m, d, lat, lon, tz, elev) {
    if (currentMode === MODES.NOAA) return pack(noaaUTC(y, m, d, lat, lon, elev), tz);
    if (currentMode === MODES.COMPARE) return compare(y, m, d, lat, lon, tz, elev);
    return pack(legacyUTC(y, m, d, lat, lon), tz);
  }

  var API = {
    version: SELECTOR_VERSION, MODES: MODES,
    getMode: function () { return currentMode; },
    setMode: function (x) { if (x === MODES.LEGACY || x === MODES.COMPARE || x === MODES.NOAA) currentMode = x; return currentMode; },
    getTimes: getTimes, compare: compare, legacyUTC: legacyUTC, noaaUTC: noaaUTC
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = API;
  else global.SolarEngine = API;
})(typeof self !== 'undefined' ? self : this);
