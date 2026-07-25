/*
 * Prayer Engine  —  platform-independent. Turns solar events into a prayer
 * schedule. NEVER hardcodes times. Every prayer references a solar anchor
 * (civilDawn | sunrise | solarNoon | sunset | civilDusk) plus a minute offset.
 *
 * Depends only on the Solar Engine's output (absolute UTC instants). Has NO
 * knowledge of notifications, DOM, or platform — it emits data and hands the
 * schedule to whatever Notification Provider is active (see notification-provider).
 */
(function (global) {
  'use strict';

  var CALC_VERSION = 'prayer-engine-1.0.0';

  // Default anchors (community rule: gather at sunrise, solar noon, sunset).
  var DEFAULT_PRAYERS = [
    { name: 'Dawn Watch',     anchor: 'civilDawn', offsetMin: 0 },
    { name: 'Sunrise Prayer', anchor: 'sunrise',   offsetMin: 0 },
    { name: 'Noon Prayer',    anchor: 'solarNoon', offsetMin: 0 },
    { name: 'Evening Prayer', anchor: 'sunset',    offsetMin: 0 },
    { name: 'Dusk Watch',     anchor: 'civilDusk', offsetMin: 0 }
  ];

  // solarUTC: object of Date|null (from ACRSolarEngine.solarEventsUTC)
  // location: {name,country,lat,lon,tz,mode}; dateISO: 'YYYY-MM-DD'; fmt(date,tz)->'HH:MM'
  function buildSchedule(solarUTC, location, dateISO, fmt, prayers) {
    prayers = prayers || DEFAULT_PRAYERS;
    var out = [];
    prayers.forEach(function (p) {
      var anchorDate = solarUTC[p.anchor];
      if (!anchorDate) return;                       // polar / no such event: skip, never fake
      var when = new Date(anchorDate.getTime() + (p.offsetMin || 0) * 60000);
      out.push({
        name: p.name, anchor: p.anchor, offsetMin: p.offsetMin || 0,
        location: location.name + (location.country ? ', ' + location.country : ''),
        lat: location.lat, lon: location.lon, tz: location.tz,
        date: dateISO,
        utcTimestamp: when.getTime(),
        utcISO: when.toISOString(),
        displayTime: fmt(when, location.tz),
        engineVersion: (solarUTC.version || 'unknown'),
        calcVersion: CALC_VERSION,
        polar: solarUTC.polar || null
      });
    });
    out.sort(function (a, b) { return a.utcTimestamp - b.utcTimestamp; });
    return out;
  }

  // Countdown source of truth: current + next prayer, seconds to next.
  // Countdown display NEVER determines prayer times — it only reads these.
  function currentAndNext(schedule, nowMs) {
    var current = null, next = null;
    for (var i = 0; i < schedule.length; i++) {
      if (schedule[i].utcTimestamp <= nowMs) current = schedule[i];
      else { next = schedule[i]; break; }
    }
    var secondsToNext = next ? Math.max(0, Math.round((next.utcTimestamp - nowMs) / 1000)) : null;
    return { current: current, next: next, secondsToNext: secondsToNext };
  }

  var API = { CALC_VERSION: CALC_VERSION, DEFAULT_PRAYERS: DEFAULT_PRAYERS,
              buildSchedule: buildSchedule, currentAndNext: currentAndNext };
  if (typeof module !== 'undefined' && module.exports) module.exports = API;
  else global.ACRPrayerEngine = API;
})(typeof self !== 'undefined' ? self : this);
