/*
 * Timezone Manager  —  platform-independent IANA timezone + DST handling.
 * Never uses a bare UTC offset as an identity; always an IANA zone name.
 * Uses the platform Intl tz database (available in browsers and Node).
 */
(function (global) {
  'use strict';

  function deviceZone() {
    try { return Intl.DateTimeFormat().resolvedOptions().timeZone || null; } catch (e) { return null; }
  }

  // UTC offset (minutes, east-positive) that the given IANA zone has AT that instant.
  function offsetMinutes(date, tz) {
    var dtf = new Intl.DateTimeFormat('en-US', {
      timeZone: tz, hourCycle: 'h23',
      year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', second: '2-digit'
    });
    var p = {}; dtf.formatToParts(date).forEach(function (x) { p[x.type] = x.value; });
    var h = parseInt(p.hour, 10); if (h === 24) h = 0;
    var asUTC = Date.UTC(+p.year, +p.month - 1, +p.day, h, +p.minute, +p.second);
    return Math.round((asUTC - date.getTime()) / 60000);
  }

  // Is the instant inside the zone's daylight-saving (summer) offset?
  function isDST(date, tz) {
    var y = new Date(date).getUTCFullYear();
    var jan = offsetMinutes(new Date(Date.UTC(y, 0, 15)), tz);
    var jul = offsetMinutes(new Date(Date.UTC(y, 6, 15)), tz);
    if (jan === jul) return false;                 // zone has no DST
    var now = offsetMinutes(date, tz);
    return now === Math.max(jan, jul);             // DST = the larger (forward) offset
  }

  function format(date, tz) {
    if (!date) return null;
    return new Intl.DateTimeFormat('en-GB',
      { timeZone: tz, hour: '2-digit', minute: '2-digit', hour12: false }).format(date);
  }

  // GPS-derived zone vs the device zone. Returns {match, gps, device} — the caller
  // must ask the user, never silently guess (per spec).
  function detectMismatch(gpsZone, deviceZoneName) {
    var d = deviceZoneName || deviceZone();
    if (!gpsZone || !d) return { match: null, gps: gpsZone, device: d };
    return { match: gpsZone === d, gps: gpsZone, device: d };
  }

  var API = { deviceZone: deviceZone, offsetMinutes: offsetMinutes, isDST: isDST,
              format: format, detectMismatch: detectMismatch };
  if (typeof module !== 'undefined' && module.exports) module.exports = API;
  else global.ACRTimezoneManager = API;
})(typeof self !== 'undefined' ? self : this);
