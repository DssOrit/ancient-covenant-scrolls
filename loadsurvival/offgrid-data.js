/* Whole-home off-grid: size a system from your own bills, keeping existing appliances. Added 4 Nov 2026 at the owner request.
   Figures are general working rules and worked examples, not quotes. Two sources are linked but were not opened. No price, permit rule or product was checked.
   Not electrical, legal or safety advice: a qualified electrician and your local office decide. */
(function () {
  var LINKED = 'OFFICIAL SOURCE LINKED BUT NOT OPENED';
  var UNV = 'DATA UNVERIFIED';
  var NOTE = 'We did not open any source for this guide. The numbers are working rules and worked examples. Replace them with your own bills and the maker data sheet.';
  var GEN = 'Steps marked as general practice are common advice. We did not find a named source for each step.';
  var ELEC = 'Power can burn, start a fire and kill. A whole-home system is a job for a qualified electrician. Do not wire a house by yourself.';
  var S = {
    eia: ['US Energy Information Administration: how much electricity does a US home use (' + LINKED + ')', 'https://www.eia.gov/tools/faqs/faq.php?id=97&t=3'],
    pvwatts: ['NREL PVWatts: sun hours and solar output for a US address (' + LINKED + ')', 'https://pvwatts.nrel.gov/'],
    pvgis: ['European Commission PVGIS: sun hours and solar output for a UK or Portugal address (' + LINKED + ')', 'https://re.jrc.ec.europa.eu/pvg_tools/en/']
  };
  var g = {
    id: 'offgrid-whole-home', area: 'Power • Solar projects', icon: 'sun', difficulty: 'Advanced',
    title: 'Whole-home off-grid: size it from your bills and keep your appliances',
    intro: 'This guide shows how to size a solar, battery and generator system so your whole home runs with no public grid, and you keep all your existing appliances. It gives the method and two worked examples. It does not give a shopping list or a price. ' + ELEC,
    first: [
      NOTE,
      ELEC,
      'Keeping every appliance means a bigger system. Heat, hot water and air conditioning decide the size more than anything else.',
      'Start here: step 1, collect 12 months of bills. Step 2, find your worst month. Step 3, list your heavy appliances. Step 4, use the method below.',
      'Not confirmed: whether you may disconnect from the grid at your address, and which permits you need. Ask your local building office before you buy anything.'
    ],
    do: [
      'Step 1. Get 12 months of electricity bills. Write down the kWh used each month.',
      'Step 2. Find the worst month. In a cold place this is usually winter. In a hot place it is summer.',
      'Step 3. Divide the worst month kWh by the days in that month. This is your daily need in kWh.',
      'Step 4. List each heavy appliance: air conditioner or heat pump, electric water heater, oven, dryer, well pump, fridge, freezer, car charger. Write its watts and the start-up surge from the label or data sheet.',
      'Step 5. Find the sun hours for your worst month. Use PVWatts (United States) or PVGIS (United Kingdom, Portugal). Write the number of peak sun hours for that month.',
      'Step 6. Panels in kW = daily need ÷ sun hours ÷ 0.75. The 0.75 allows for losses in wires, the inverter and heat. This is a working rule (general practice).',
      'Step 7. Battery in kWh = daily need × days you want to run with no sun. One day is the least. Two days is safer. Then add some extra, because a battery should not be emptied to zero (general practice).',
      'Step 8. Inverter size in kW = all the appliances that can run at the same time, plus the start-up surge of the biggest motor. Add the numbers from Step 4.',
      'Step 9. Add a backup generator that can run the house and charge the battery in a long grey spell. Store its fuel safely.',
      'Step 10. Give your list and numbers to a qualified electrician. They check wire size, fuses, earthing and the permit.'
    ],
    warn: [
      ELEC,
      'Do not run a generator indoors or in a garage. It makes carbon monoxide, which kills with no smell.',
      'Place the battery in a ventilated spot your electrician approves. Follow the maker and local fire rules.',
      'Do not size the system from an average. Size it from your own worst month.',
      'Do not assume you may disconnect from the grid, store fuel, or fit a large battery. Rules differ by country, state and area. We could not check them for your place.'
    ],
    tip: [
      'Heat and hot water are the biggest lever. If you ever decide to change an appliance, a heat-pump water heater uses far less power than an old electric tank (general practice). You said to keep your appliances, so this guide does not assume a swap.',
      'Run the big loads in daylight (dishwasher, washing, pump) so the panels feed them directly and the battery works less.',
      'A generator is cheaper than doubling the battery for the worst weeks. Many off-grid homes use both.',
      GEN
    ],
    after: [
      'Keep a log of daily use for one month after you switch. Compare it with your estimate.',
      'Test the generator monthly. Run the home on battery for a day each season, so you learn the real limits.',
      'Keep the electrician number, the permit papers and the system diagram together in a waterproof folder.'
    ],
    table: {
      head: ['Step', 'Example A: large home, worst month 30 kWh a day', 'Example B: smaller home, worst month 8 kWh a day'],
      rows: [
        ['Daily need', '30 kWh', '8 kWh'],
        ['Sun hours in the worst month (example only)', '4', '4'],
        ['Panels = need ÷ sun hours ÷ 0.75', '30 ÷ 4 ÷ 0.75 = 10.0 kW (25 panels of 400 W)', '8 ÷ 4 ÷ 0.75 = 2.7 kW (7 panels of 400 W is 2.8 kW)'],
        ['Battery for 1 day', '30 kWh', '8 kWh'],
        ['Battery for 2 days', '60 kWh', '16 kWh'],
        ['Inverter', 'Often 10 to 15 kW for a large home (add up your own loads)', 'Often 3 to 6 kW (add up your own loads)'],
        ['Backup generator', 'Sized to run the house and charge the battery', 'Sized to run the house and charge the battery']
      ]
    },
    sections: [
      { h: 'Typical daily use, for a first guess only', items: [
        'United States: about 29 kWh a day for an average home (from a US government page, linked but not opened).',
        'United Kingdom: about 7 to 8 kWh a day for electricity in a typical home (working figure, not opened).',
        'Portugal: lower than both (working figure, not opened).',
        'Your own bills replace every one of these numbers.'
      ] },
      { h: 'Why a bigger system is needed to keep every appliance', items: [
        'An air conditioner, electric heat or electric water heater can use more than all your other appliances together.',
        'The start-up surge of a well pump, fridge or air conditioner can be several times its running power. The inverter must handle it.',
        'Cloudy days in a row empty the battery. The generator covers them.'
      ] }
    ],
    sources: [S.eia, S.pvwatts, S.pvgis],
    unconfirmed: [
      NOTE,
      UNV + ': the typical daily use numbers for the United Kingdom and Portugal.',
      UNV + ': the 0.75 loss factor, the battery safety margin and the inverter ranges. They are general working rules.',
      'Not confirmed: prices, the legal right to disconnect from the grid, permit rules, fuel storage limits and insurance rules in California, Florida, London and Coimbra.',
      'Not confirmed: that a solar and battery system sized this way keeps a specific appliance running. Check each data sheet.',
      'DEVICE TEST PENDING: this guide has not been read on an iPad yet.'
    ]
  };
  g.checkedOn = '4 Nov 2026'; g.status = 'partly'; g.source = g.sources[0][1];
  if (window.LOAD_CORE && window.LOAD_CORE.guides) window.LOAD_CORE.guides.push(g);
})();
