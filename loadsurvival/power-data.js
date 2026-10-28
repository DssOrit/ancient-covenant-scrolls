/* Home power calculator: backup power for 5 home sizes and 1 to 20 people, from floor area, rooms, people and appliances.
   Written 28 Oct 2026. All watts and hours are typical planner estimates. Overwrite them with the numbers on your own labels.
   Method: daily energy = sum of (number x watts x hours a day). Generator size = total running watts + the largest single start-up surge.
   Battery = daily energy x days / (usable fraction x inverter efficiency). Solar = daily energy / (sun hours x 0.75). */
(function () {
  var M2 = 10.7639;
  var SIZES = [
    { id: 's1', label: '1,500 sq ft (139 m2)', ft: 1500 },
    { id: 's2', label: '2,000 to 2,500 sq ft (186 to 232 m2)', ft: 2250 },
    { id: 's3', label: '3,000 sq ft (279 m2)', ft: 3000 },
    { id: 's4', label: '5,000 sq ft (465 m2)', ft: 5000 },
    { id: 's5', label: '8,000 to 10,000 sq ft (743 to 929 m2)', ft: 9000 }
  ];
  var PEOPLE = [1, 2, 4, 6, 10, 15, 20];
  var ROOM_TYPES = ['Bedroom', 'Living room', 'Kitchen', 'Bathroom', 'Office', 'Garage or other', 'Hall or storage'];
  var MODES = [['e', 'Essentials only'], ['c', 'Comfort'], ['w', 'Whole home']];
  /* id, name, w (running watts each), s (start-up watts each, 0 = none), h (hours a day, as a running average), g (group e, c or w),
     sys (start-up surge counts for every unit, such as one big air system), q: default number from the home */
  var CATALOG = [
    { id: 'fridge', name: 'Refrigerator', w: 200, s: 1200, h: 8, g: 'e', q: function (c) { return c.ft >= 5000 ? 2 : 1; }, note: 'Sources gave 180 to 800 running watts and 600 to 2,400 start-up. Hours is the average time the compressor runs.' },
    { id: 'freezer', name: 'Freezer', w: 150, s: 1000, h: 8, g: 'e', q: function (c) { return c.ft >= 2000 ? 1 : 0; } },
    { id: 'lights', name: 'LED light bulbs', w: 9, s: 0, h: 5, g: 'e', q: function (c) { return c.lights; }, note: 'About 1 bulb for every 60 sq ft of room.' },
    { id: 'charge', name: 'Phone and tablet charging', w: 10, s: 0, h: 3, g: 'e', q: function (c) { return c.people * 2; } },
    { id: 'router', name: 'Internet modem and router', w: 12, s: 0, h: 24, g: 'e', q: function () { return 1; } },
    { id: 'laptop', name: 'Laptop', w: 50, s: 0, h: 4, g: 'e', q: function (c) { return Math.ceil(c.people / 2); } },
    { id: 'radio', name: 'Radio and small electronics', w: 5, s: 0, h: 4, g: 'e', q: function () { return 1; } },
    { id: 'cpap', name: 'Sleep apnea machine (medical)', w: 40, s: 0, h: 8, g: 'e', q: function () { return 0; }, note: 'Check your own label. Add one for each user.' },
    { id: 'oxy', name: 'Oxygen concentrator (medical)', w: 300, s: 600, h: 24, g: 'e', q: function () { return 0; }, note: 'Check your own label. Ask your supplier for a backup plan.' },
    { id: 'well', name: 'Well pump, 1/3 HP', w: 1000, s: 2000, h: 0.75, g: 'e', q: function () { return 0; }, note: 'Sources gave 1,000 to 1,250 running and 2,000 to 3,750 start-up watts. A 1 HP pump is about 1,900 to 2,100 running and 3,800 to 4,300 start-up.' },
    { id: 'tv', name: 'Television', w: 100, s: 0, h: 4, g: 'c', q: function (c) { return c.ft >= 5000 ? 3 : c.ft >= 3000 ? 2 : 1; } },
    { id: 'fan', name: 'Fan', w: 50, s: 0, h: 8, g: 'c', q: function (c) { return Math.ceil(c.people / 2); } },
    { id: 'micro', name: 'Microwave oven', w: 1100, s: 0, h: 0.3, g: 'c', q: function () { return 1; } },
    { id: 'kettle', name: 'Electric kettle', w: 1500, s: 0, h: 0.3, g: 'c', q: function () { return 1; } },
    { id: 'coffee', name: 'Coffee maker', w: 900, s: 0, h: 0.3, g: 'c', q: function () { return 1; } },
    { id: 'washer', name: 'Washing machine', w: 500, s: 1000, h: 0.5, g: 'c', q: function () { return 1; } },
    { id: 'blower', name: 'Gas or oil furnace blower', w: 700, s: 1400, h: 8, g: 'c', q: function (c) { return Math.ceil(c.ft / 2500); }, note: 'Sources gave 500 to 800 running and 1,200 to 1,800 start-up watts.' },
    { id: 'sheater', name: 'Electric space heater', w: 1500, s: 0, h: 4, g: 'c', q: function () { return 0; } },
    { id: 'wac', name: 'Window air conditioner', w: 1000, s: 3000, h: 6, g: 'c', q: function () { return 0; } },
    { id: 'ac', name: 'Central air conditioner or heat pump (per ton)', w: 1400, s: 4200, h: 6, g: 'w', sys: true, q: function (c) { return Math.max(1, Math.round(c.ft / 600)); }, note: 'About 1 ton for every 600 sq ft. Sources gave 2,800 to 3,800 running watts for a 2 ton unit. Check the nameplate.' },
    { id: 'wh', name: 'Electric water heater', w: 4500, s: 0, h: 3, g: 'w', q: function () { return 1; } },
    { id: 'range', name: 'Electric cooking range', w: 2000, s: 0, h: 1, g: 'w', q: function () { return 1; } },
    { id: 'dryer', name: 'Electric clothes dryer', w: 3000, s: 0, h: 0.7, g: 'w', q: function () { return 1; } },
    { id: 'dish', name: 'Dishwasher', w: 1200, s: 0, h: 1, g: 'w', q: function () { return 1; } }
  ];
  function ceil(x) { return Math.ceil(x - 1e-9); }
  /* rooms from the home size and the number of people */
  function defaultRooms(ft, people) {
    var n = Math.max(5, Math.min(40, Math.round(ft / 250))), rooms = [], i;
    var beds = Math.max(1, Math.min(ceil(people / 2), n - 3)), baths = Math.max(1, ceil(people / 3));
    var list = [];
    for (i = 0; i < beds; i++) list.push('Bedroom');
    for (i = 0; i < baths; i++) list.push('Bathroom');
    list.push('Living room'); list.push('Kitchen');
    if (ft >= 2000) list.push('Office');
    while (list.length < n) list.push(list.length % 3 === 0 ? 'Living room' : 'Garage or other');
    var each = Math.round(ft / list.length);
    list.forEach(function (t) { rooms.push({ t: t, ft: each }); });
    return rooms;
  }
  function ctxOf(ft, people, rooms) {
    var lights = 0; rooms.forEach(function (r) { lights += Math.max(1, Math.round((Number(r.ft) || 0) / 60)); });
    return { ft: ft, people: people, rooms: rooms, nrooms: rooms.length, lights: lights };
  }
  function defaultQty(ft, people, rooms) {
    var c = ctxOf(ft, people, rooms), q = {};
    CATALOG.forEach(function (it) { q[it.id] = it.q(c); });
    return q;
  }
  function inMode(it, mode) { return mode === 'w' || it.g === 'e' || (mode === 'c' && it.g === 'c'); }
  /* st: {mode, q, w, h, days, sun, dod} (w and h override the catalog) */
  function calc(st) {
    var Wh = 0, run = 0, extra = 0, rows = [], inv = 0.9;
    CATALOG.forEach(function (it) {
      if (!inMode(it, st.mode)) return;
      var q = Number((st.q || {})[it.id]) || 0, w = (st.w || {})[it.id], h = (st.h || {})[it.id];
      w = w === undefined || w === '' ? it.w : Number(w) || 0; h = h === undefined || h === '' ? it.h : Number(h) || 0;
      var wh = q * w * h; Wh += wh;
      if (q > 0 && h > 0) { run += q * w; var ex = Math.max(0, (it.s || 0) - w) * (it.sys ? q : 1); if (q > 0 && ex > extra) extra = ex; }
      rows.push({ id: it.id, q: q, w: w, h: h, wh: wh });
    });
    var days = st.days || 3, dod = st.dod || 0.8, sun = st.sun || 4;
    var kwh = Wh / 1000, gen = run + extra;
    var batt = kwh * days / (dod * inv);
    var solar = Wh / (sun * 0.75);
    return { rows: rows, Wh: Wh, kwh: kwh, run: run, extra: extra, gen: gen, genRound: Math.ceil(gen / 500) * 500, batt: batt, battUnits: ceil(batt / 1.28), solar: solar, panels: ceil(solar / 400), days: days };
  }
  function estimate(ft, people, mode) {
    var rooms = defaultRooms(ft, people), q = defaultQty(ft, people, rooms);
    return calc({ mode: mode, q: q, days: 3, dod: 0.8, sun: 4 });
  }
  function reference(mode) {
    return SIZES.map(function (s) { return { size: s, cols: PEOPLE.map(function (n) { var r = estimate(s.ft, n, mode); return { people: n, kwh: r.kwh, run: r.run, gen: r.genRound }; }) }; });
  }

  var guide = {
    id: 'home-power-sizing', area: 'Essentials', icon: 'bolt', difficulty: 'Practical', status: 'partly', checkedOn: '28 Oct 2026',
    title: 'Home power for an outage: how much for your home size and people',
    intro: 'Open Tools, then Home power calculator. Enter your floor area, rooms, people and appliances. You get daily energy, generator size, battery size and solar size. This guide shows the typical numbers for 5 home sizes.',
    first: [
      'Start with essentials only: fridge, lights, phone charging, router, medical devices.',
      'Medical devices that need power come first. Plan backup for them before anything else.',
      'Never run a generator, grill or stove indoors, in a garage, or near a window.',
      'Check the watts on your own appliance labels. The calculator uses typical numbers.'
    ],
    do: [
      'Open Tools, then Home power calculator. Pick square feet or square metres and type your floor area.',
      'Enter the number of people. Use Fill rooms and appliances to get a starting list for your home.',
      'Change the rooms and their sizes. Each room adds lights.',
      'Change the number of each appliance. Add a medical device if you use one.',
      'Overwrite the watts and hours with the numbers on your own labels or a plug-in power meter.',
      'Pick a mode: essentials, comfort or whole home. Read the daily energy and the peak watts.',
      'For a generator, use the generator size. It is the running watts of everything plus the largest start-up surge.',
      'For batteries, set the days of backup and the battery type. For solar, set the sun hours for your worst month.',
      'Write the result on your storage list. Buy the safety items first and the large systems later.'
    ],
    table: { head: ['Home size', '1 person', '2 people', '4 people', '6 people', '10 people', '20 people'], rows: [] },
    warn: [
      'Carbon monoxide kills. Run a generator outdoors, far from windows and doors, with a working carbon monoxide alarm indoors.',
      'Do not connect a generator to a house outlet without a proper transfer switch fitted by an electrician.',
      'Do not size a large system from these typical numbers. Read your own meter or labels first.',
      'Motors need extra power to start. A fridge, a well pump and an air conditioner can need 2 to 3 times their running watts.',
      'Heating and cooling can be the biggest load. A whole home on a generator needs a much larger generator.'
    ],
    sections: [
      { h: 'The table above', items: [
        'It shows the typical daily energy in kWh for essentials only, for 5 home sizes and 1 to 20 people.',
        'The comfort and whole home numbers are in the calculator under Reference tables.',
        'Larger homes use more because they have more rooms, more lights, a second fridge and bigger air systems.'
      ] },
      { h: 'The formulas', items: [
        'Daily energy in Wh = number of appliances x watts x hours a day, added together.',
        'Generator watts = all running watts added together + the largest single start-up surge (the extra watts above its running watts).',
        'Battery kWh = daily kWh x days of backup / (usable fraction x inverter efficiency). We use 0.8 for lithium iron phosphate, 0.5 for lead-acid, and 0.9 for the inverter.',
        'Solar watts = daily Wh / (sun hours x 0.75). Use the sun hours of your worst month.',
        'A 100 Ah 12.8 V lithium battery holds about 1.28 kWh. A 400 W panel is the unit we count.'
      ] },
      { h: 'Portugal and the US', items: [
        'Portugal: the average household used about 2,531 kWh in 2024, about 6.9 kWh a day, from PORDATA (DGEG data). Use the Whole home mode only as a rough comparison.',
        'US homes use more. We did not extract the US figure from the EIA tables.',
        'Portugal mains power is 230 V. US mains power is 120 V and 240 V. Check the voltage of any appliance you bring from another country.'
      ] }
    ],
    tip: ['A plug-in power meter costs little and shows real watts.', 'Buy rechargeable batteries and a small solar charger first.'],
    after: ['Check the numbers again each year.', 'Test the backup once while the power is on.'],
    sources: [
      ['EIA: 2020 Residential Energy Consumption Survey data tables (electricity by home size and household size)', 'https://www.eia.gov/consumption/residential/data/2020/c&e/pdf/ce5.3b.pdf'],
      ['EIA: 2020 RECS electricity by household size', 'https://www.eia.gov/consumption/residential/data/2020/c&e/pdf/ce5.1b.pdf'],
      ['PORDATA: electricity consumption by consumer type in Portugal (DGEG data)', 'https://www.pordata.pt/en/portugal/electricity+consumption+by+consumer+total+and+by+type+of+consumption-1231'],
      ['DTE Energy: appliance usage guide and generator worksheet', 'https://www.dteenergy.com/content/dam/dteenergy/deg/website/residential/service-and-price/protection/Appliance-Usage-Guide-GenerLink-Worksheet.pdf'],
      ['Elephant Energy: what size generator do I need for my house', 'https://elephantenergy.org/?p=595'],
      ['Anern: sizing solar panels and batteries for off-grid', 'https://www.anernstore.com/blogs/off-grid-solar-solutions/sizing-solar-panels-batteries-off-grid'],
      ['Jackery: 100Ah lithium battery sizing guide', 'https://www.jackery.com/blogs/knowledge/100ah-lithium-battery-a-sizing-guide-that-wont-leave-you-in-the-dark']
    ],
    unconfirmed: [
      'We did not open these pages. The facts come from search results and summaries.',
      'We could not read the numbers in the EIA tables. We found no kWh per day by home size or by number of people. The table in this guide is our own model, not EIA data.',
      'The appliance watts are typical values from generator guides. They disagree a lot. A fridge was 180 to 800 running watts and 600 to 2,400 start-up watts. A 2 ton air conditioner was 2,800 or 3,800 running watts.',
      'The hours a day, the number of bulbs per room (1 per 60 sq ft), the 1 ton per 600 sq ft rule and the default appliance counts are the planner\'s own.',
      'The generator rule (all running watts plus the largest start-up surge) is from a generator guide. The "2 to 3 times" rule for motors is from another one. We did not check them against a standard.',
      'The usable battery fraction (80 percent lithium, 50 percent lead-acid) and the 0.75 solar loss factor are from vendor blogs. They disagree (lithium 80 to 95 percent, system efficiency 0.75 to 0.85).',
      'Sources say to size solar on the worst-month sun hours. We use the number you type. We did not find sun hours for US or Portuguese towns.',
      'The Portugal figure is a mean per household electricity account, not per person. We did not find an INE household figure.',
      'We did not find an official figure for the US average.',
      'Heat pump start-up watts in one source looked wrong, so we used the air conditioner values.'
    ]
  };
  SIZES.forEach(function (s) {
    var row = [s.label];
    PEOPLE.forEach(function (n) { if ([1, 2, 4, 6, 10, 20].indexOf(n) >= 0) { var r = estimate(s.ft, n, 'e'); row.push((Math.round(r.kwh * 10) / 10) + ' kWh'); } });
    guide.table.rows.push(row);
  });
  if (window.LOAD_CORE && window.LOAD_CORE.guides) { guide.source = guide.sources[0][1]; window.LOAD_CORE.guides.push(guide); }
  window.LOAD_POWER = { sizes: SIZES, people: PEOPLE, roomTypes: ROOM_TYPES, modes: MODES, catalog: CATALOG, m2: M2, defaultRooms: defaultRooms, defaultQty: defaultQty, ctxOf: ctxOf, inMode: inMode, calc: calc, estimate: estimate, reference: reference };
  if (typeof module !== 'undefined') module.exports = window.LOAD_POWER;
})();
