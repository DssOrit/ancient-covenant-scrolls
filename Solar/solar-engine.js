/*
 * ACR Solar Engine  —  fully offline, deterministic astronomical calculator.
 *
 * NO network. NO AI. Pure mathematics. Same inputs always give the same output.
 *
 * MATHEMATICAL SOURCE
 *   NOAA Solar Calculator equations (NOAA_Solar_Calculations spreadsheet),
 *   which implement Jean Meeus, "Astronomical Algorithms" (2nd ed., 1998).
 *   These are the U.S. reference equations for solar position.
 *
 * CONVENTIONS / HANDLING
 *   - Julian Date: computed for the civil date at 00:00 UTC (Gregorian).
 *   - Longitude convention: degrees, POSITIVE EAST, negative West
 *       (Coimbra = -8.4103, New York = -74.0060, Sydney = +151.2093).
 *   - UTC conversion: every event is produced as an absolute UTC instant
 *       (a JS Date). Wall-clock time in the user's zone is derived with
 *       Intl.DateTimeFormat({timeZone: IANA}) so DST is handled by the
 *       platform tz database, never by a hand-coded offset.
 *   - Atmospheric refraction: sunrise/sunset use sun-centre altitude
 *       -0.833 deg (34' refraction + 16' semidiameter). Civil dawn/dusk
 *       use -6 deg.
 *   - Elevation: optional. Horizon dip lowers the altitude by
 *       0.0347*sqrt(metres) deg when a positive elevation is supplied.
 *   - Polar day / polar night: when the sun never reaches the target
 *       altitude, sunrise/sunset are returned as null with a polar flag,
 *       so the caller never shows a fabricated time.
 *   - Accuracy: solar params are refined once at the estimated solar-noon
 *       instant, keeping error well under one minute at all latitudes.
 */
(function (global) {
  'use strict';

  var VERSION = 'acr-solar-engine-1.0.0-noaa';
  var RAD = Math.PI / 180, DEG = 180 / Math.PI;

  function julianDay(y, m, d) {           // Gregorian date -> JD at 00:00 UTC
    if (m <= 2) { y -= 1; m += 12; }
    var A = Math.floor(y / 100), B = 2 - A + Math.floor(A / 4);
    return Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + d + B - 1524.5;
  }

  function sunParams(jc) {                 // jc = Julian centuries from J2000
    var L0 = (280.46646 + jc * (36000.76983 + jc * 0.0003032)) % 360; if (L0 < 0) L0 += 360;
    var M = 357.52911 + jc * (35999.05029 - 0.0001537 * jc);
    var e = 0.016708634 - jc * (0.000042037 + 0.0000001267 * jc);
    var C = Math.sin(M * RAD) * (1.914602 - jc * (0.004817 + 0.000014 * jc)) +
            Math.sin(2 * M * RAD) * (0.019993 - 0.000101 * jc) +
            Math.sin(3 * M * RAD) * 0.000289;
    var trueLong = L0 + C;
    var appLong = trueLong - 0.00569 - 0.00478 * Math.sin((125.04 - 1934.136 * jc) * RAD);
    var obliq0 = 23 + (26 + ((21.448 - jc * (46.815 + jc * (0.00059 - jc * 0.001813))) ) / 60) / 60;
    var obliq = obliq0 + 0.00256 * Math.cos((125.04 - 1934.136 * jc) * RAD);
    var decl = Math.asin(Math.sin(obliq * RAD) * Math.sin(appLong * RAD)) * DEG;
    var vy = Math.tan(obliq / 2 * RAD); vy *= vy;
    var eqTime = 4 * DEG * (vy * Math.sin(2 * L0 * RAD)
              - 2 * e * Math.sin(M * RAD)
              + 4 * e * vy * Math.sin(M * RAD) * Math.cos(2 * L0 * RAD)
              - 0.5 * vy * vy * Math.sin(4 * L0 * RAD)
              - 1.25 * e * e * Math.sin(2 * M * RAD));
    return { decl: decl, eqTime: eqTime };   // decl deg, eqTime minutes
  }

  function hourAngle(latDeg, declDeg, altDeg) {
    var lat = latDeg * RAD, decl = declDeg * RAD;
    var cosH = (Math.sin(altDeg * RAD) - Math.sin(lat) * Math.sin(decl)) /
               (Math.cos(lat) * Math.cos(decl));
    if (cosH > 1) return { polar: 'below' };   // never reaches altitude (e.g. polar night)
    if (cosH < -1) return { polar: 'above' };  // always above altitude (e.g. polar day)
    return { ha: Math.acos(cosH) * DEG };
  }

  // Core: returns UTC Date instants for the given civil date + location.
  function solarEventsUTC(y, m, d, lat, lon, elevM) {
    var jd0 = julianDay(y, m, d);
    function paramsAtMin(min) { return sunParams((jd0 + min / 1440 - 2451545.0) / 36525.0); }
    var sp = paramsAtMin(720);                       // first guess at 12:00 UTC
    var noonMin = 720 - 4 * lon - sp.eqTime;          // NOAA solar-noon (UTC minutes)
    sp = paramsAtMin(noonMin);                        // refine at estimated noon
    noonMin = 720 - 4 * lon - sp.eqTime;
    var dip = -0.833 - ((elevM && elevM > 0) ? 0.0347 * Math.sqrt(elevM) : 0);
    var base = Date.UTC(y, m - 1, d);
    function at(min) { return new Date(base + Math.round(min * 60000)); }
    var out = { version: VERSION, solarNoon: at(noonMin),
                sunrise: null, sunset: null, civilDawn: null, civilDusk: null, polar: null };
    var sr = hourAngle(lat, sp.decl, dip);
    if (sr.ha != null) { out.sunrise = at(noonMin - sr.ha * 4); out.sunset = at(noonMin + sr.ha * 4); }
    else { out.polar = (sr.polar === 'below') ? 'polar-night' : 'polar-day'; }
    var cv = hourAngle(lat, sp.decl, -6);
    if (cv.ha != null) { out.civilDawn = at(noonMin - cv.ha * 4); out.civilDusk = at(noonMin + cv.ha * 4); }
    return out;
  }

  function fmt(date, tz) {                  // absolute instant -> "HH:MM" in IANA zone
    if (!date) return null;
    return new Intl.DateTimeFormat('en-GB',
      { timeZone: tz, hour: '2-digit', minute: '2-digit', hour12: false }).format(date);
  }

  var API = {
    version: VERSION,
    solarEventsUTC: solarEventsUTC,
    format: fmt,
    // Convenience: local "HH:MM" strings for a date+location+zone.
    localTimes: function (y, m, d, lat, lon, tz, elevM) {
      var u = solarEventsUTC(y, m, d, lat, lon, elevM);
      return {
        version: u.version, polar: u.polar,
        sunrise: fmt(u.sunrise, tz), solarNoon: fmt(u.solarNoon, tz), sunset: fmt(u.sunset, tz),
        civilDawn: fmt(u.civilDawn, tz), civilDusk: fmt(u.civilDusk, tz),
        utc: u
      };
    }
  };

  if (typeof module !== 'undefined' && module.exports) module.exports = API;
  else global.ACRSolarEngine = API;
})(typeof self !== 'undefined' ? self : this);
