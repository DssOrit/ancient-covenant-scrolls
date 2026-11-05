/* Battery bank and a car: three guides. (1) Five ways to charge a bank from a car and which to pick. (2) How to connect it, step by step. (3) How to mount and secure the bank in a vehicle.
   Added 5 Nov 2026 at the owner request ("both directions": charge from the car, and anchor the bank). Written from search results only: vendor pages, installer blogs and forum posts.
   We could NOT open any page (the build machine blocks them). Cable and fuse sizes are NOT given: use the maker table. No price is given as a fact.
   Not electrical advice: a qualified electrician decides. A car is a backup charger, not a home power source. */
(function () {
  var SRCONLY = 'SEARCH RESULT ONLY, PAGE NOT OPENED';
  var UNV = 'DATA UNVERIFIED';
  var GEN = 'Steps marked general practice are common advice. We did not find a named source for each one.';
  var NOTE = 'We read search results only (vendor pages, installer blogs, forum posts). We could not open the pages. ' + GEN;
  var ELEC = 'Power can burn, start a fire and kill. Use a qualified electrician for any fixed wiring. Use the maker manual and the maker cable and fuse table. We give no cable or fuse sizes.';
  var CO = 'Never run a car engine in a garage, a closed space or near a window, even with the door open. Carbon monoxide kills with no smell.';
  var ARE = 'Power • Car and battery bank';
  var S = {
    renogy: ['Renogy: wire and fuse sizing guide (' + SRCONLY + ')', 'https://www.renogy.com/blogs/learn-center/wire-and-fuse-sizing-guide'],
    redarc: ['REDARC: lithium battery RV installation guide (' + SRCONLY + ')', 'https://www.redarcelectronics.com/nz/resources/lithium-battery-wiring-guides/lithium-battery-rv-installation-guide'],
    standard: ['Summary of the AS/NZS 3001.2 rule for lithium batteries in vehicles, a battery shop page (' + SRCONLY + ')', 'https://batteriessunshinecoast.com.au/lithium-battery-guidelines'],
    alt: ['REDARC: the truth about alternators (' + SRCONLY + ')', 'https://redarcelectronics.com/blogs/blog/the-truth-about-alternators'],
    vic: ['Victron community: charging a vehicle auxiliary battery from a variable alternator (' + SRCONLY + ')', 'https://communityarchive.victronenergy.com/questions/4229/charging-vehicle-auxiliary-battery-from-a-variable.html'],
    orion: ['Victron: Orion XS DC-DC battery chargers (' + SRCONLY + ')', 'https://www.victronenergy.com/dc-dc-converters/orion-xs-dc-dc-battery-chargers'],
    bluetti: ['BLUETTI: Charger 1, 560 W alternator charger, official US page (' + SRCONLY + ')', 'https://shop-us.bluettipower.com/products/bluetti-charger-1'],
    eco: ['EcoFlow 800 W alternator charger, a retailer listing (' + SRCONLY + ')', 'https://www.electrocity.ie/product/ecoflow-800w-alternator-charger/']
  };
  var NEW = [];
  function add(g) { g.area = ARE; g.icon = 'battery'; g.difficulty = g.difficulty || 'Advanced'; g.checkedOn = '5 Nov 2026'; g.status = 'partly'; g.source = g.sources[0][1]; if (!g.sections) g.sections = []; NEW.push(g); }

  /* ---------- 1. options ---------- */
  add({
    id: 'carbank-1-options', title: 'Charge a battery bank from a car: five ways, and which one to pick',
    intro: 'A car can charge a battery bank when the engine runs. This guide compares five ways, says what each can and cannot do, and tells you which to choose. It is a backup charger, not a home power source.',
    first: [NOTE, ELEC, CO, 'Start here: step 1, decide what you need to charge. Step 2, pick the way from the table. Step 3, open the connect guide. Step 4, open the mount guide.'],
    do: [
      'Step 1. Write down what you need to charge: phones and a radio, a portable power station, or a bigger battery bank. Write the bank size in watt-hours (Wh).',
      'Step 2. Write down the vehicle: petrol, diesel, hybrid or electric, and the year. Many newer vehicles have a smart alternator (see below).',
      'Step 3. Pick the way from the table. For phones and a radio, the car socket is enough. For a power station, an alternator charger made for it. For a fixed bank, a DC-DC charger.',
      'Step 4. Work out the time. Divide the bank size in Wh by the charger watts. Example: 1,000 Wh at 600 W is about 1.7 hours of engine time, before losses.',
      'Step 5. Plan the engine. Run it outside, in the open, with the car parked on firm ground. Driving charges as well, and uses fuel better than idling.',
      'Step 6. Never connect the bank straight to the car battery or alternator with jumper cables. Always use a charger that controls the current.',
      'Step 7. Read the next guide, "Connect the bank to the car, step by step", before you buy or wire anything.'
    ],
    warn: [
      ELEC, CO,
      'Never feed house wiring through a wall outlet from a car, inverter or bank (back-feeding). It can kill utility workers and start a fire. Use a proper transfer arrangement fitted by an electrician.',
      'Do not wire the bank to the car battery with plain cables. A fault can melt cables and start a fire.',
      'A car socket is fused. Do not swap in a bigger fuse to get more power.'
    ],
    tip: [
      'A smart alternator is controlled by the car computer and can give little spare current. A DC-DC charger copes better, but one forum report found a charger barely charging on a smart-alternator van (' + UNV + ').',
      'Check the bank and the charger agree on battery type: lithium and lead-acid need different charging settings.',
      'Keep a note of how long each charge takes, so you can plan.'
    ],
    after: ['Write down how many watt-hours you really got per hour of engine time. Use that number from now on.', 'Check the cables and the charger for heat after the first run. See the connect guide.'],
    table: { head: ['Way', 'Typical power', 'What it needs', 'Use it for', 'Watch out'],
      rows: [
        ['Car socket (12 V plug) and a charger', 'About 60 to 150 W (typical, ' + UNV + ')', 'Nothing fitted. A fused socket.', 'Phones, radios, laptops, small power banks.', 'Slow. Too weak for a big bank.'],
        ['Alternator charger made for a portable power station', 'Up to about 560 W to 800 W for the models we saw (search results)', 'Fitted to the car battery with the supplied cable. Check the power station matches.', 'A portable power station.', 'Compatibility is not confirmed. One retailer said one model works only with its own power stations.'],
        ['DC-DC charger to a fixed bank', 'About 20 to 60 A at 12 V, about 0.25 to 0.7 kW. One model we saw is rated 700 W.', 'Fused wiring, a proper install, a charger set for your battery type.', 'A fixed bank in a vehicle, or a bank you carry.', 'Needs an electrician. Cable and fuse size come from the maker table.'],
        ['Inverter in the car feeding a mains charger', 'Limited by the inverter, with extra loss', 'A car inverter and a mains charger', 'Last resort when nothing else works.', 'Wastes energy. Do not overload the inverter.'],
        ['Car power-out (an electric or hybrid car with a vehicle-to-load socket)', 'A few kW on some models. Varies a lot. ' + UNV, 'A car that has this feature', 'Powering a small load or a charger.', 'Not every car has it. Read the manual. It uses the traction battery.']
      ] },
    sections: [
      { h: 'Why a smart alternator matters', items: [
        'Many newer cars control the alternator with the car computer. It may give only what the car needs.',
        'Its voltage can swing between about 12.3 V and 15 V (search result).',
        'A plain relay link or direct wire can fail to charge, or can charge wrongly. A DC-DC charger separates the two batteries and sets a safe charge for the second one.',
        'It is not a guarantee. Ask the maker of the charger or a car dealer whether your car suits it.'
      ] },
      { h: 'What a car cannot do', items: [
        'A charger at 600 W for 10 hours gives about 6 kWh before losses.',
        'The off-grid plan in this app needs about 74 kWh a day. At 600 W that is about 123 hours of engine time every day. A car cannot be the main source.',
        'Use solar and a stationary battery for a home. Use the car as a backup.'
      ] }
    ],
    sources: [S.alt, S.vic, S.orion, S.bluetti, S.eco],
    unconfirmed: [NOTE, UNV + ': the power for the car socket, and all the typical power numbers.', 'Not confirmed: that any charger named here suits your car or your bank. We name them only as examples we saw in search results. Prices vary by seller and country. We give no price.', 'Not confirmed: which cars have a vehicle-to-load socket, or how much power they give.', 'Not confirmed: that a DC-DC charger works well with your smart alternator.', 'DEVICE TEST PENDING: not read on an iPad yet.']
  });

  /* ---------- 2. connect ---------- */
  add({
    id: 'carbank-2-connect', title: 'Connect the bank to the car, step by step',
    intro: 'This guide shows the order of a safe DC-DC charger connection between a car and a battery bank: what goes where, in what order, and what to check. It gives no cable or fuse size. Use the maker table and a qualified electrician.',
    first: [NOTE, ELEC, CO, 'Disconnect and prepare before you touch anything. Turn the engine off. Take the key out. Remove any rings and watches.'],
    do: [
      'Step 1. Read the manuals for the charger, the bank and the car. Write down the charger input current and the maker fuse and cable table.',
      'Step 2. Ask: is this a smart alternator car? If you do not know, ask the car dealer or the charger maker. Write down the answer.',
      'Step 3. Choose the place for the charger. Put it close to the bank, not close to the car engine. A short, thick cable on the bank side loses less power (search result advice).',
      'Step 4. Put the charger in a dry, shaded place with air around it. Chargers get warm. Do not cover them.',
      'Step 5. Choose the cable and the fuse from the maker table, for the length you will use. A fuse protects the cable, not the charger. Ask an electrician to check.',
      'Step 6. Fit a fuse holder close to the car battery positive terminal. One source says within about 8 inches (20 cm) and no more than about 5 feet (1.5 m). Keep the fuse out until the very end.',
      'Step 7. Run the positive cable from the fuse holder to the charger input. Protect it where it passes metal edges. Keep it away from hot parts and moving parts. Seal where it goes through a panel.',
      'Step 8. Run the negative cable from the charger input to a good ground point on the car body or to the car battery negative, as the maker says.',
      'Step 9. Fit a second fuse between the charger output and the bank, close to the bank. Use the size on the maker table.',
      'Step 10. Connect the charger output cables to the bank. Positive and negative must go to the right places. Check twice.',
      'Step 11. Set the charger for the battery type (lithium or lead-acid) and the right voltage. Use the maker app or switch.',
      'Step 12. Set the charger to start only when the engine is running, or when the car battery is above a safe level. This stops it flattening the car battery.',
      'Step 13. Fit the fuses. Start the engine outside. Check the bank voltage after 5 minutes, and the cables and charger for heat after 10 minutes. Touch only with the back of the hand, near, not on. Turn off if anything is hot, smells, or smokes.',
      'Step 14. Charge a small load first. Look at the watts. Compare with the charger rating.',
      'Step 15. Write down the date, the settings and the first results.'
    ],
    warn: [
      ELEC, CO,
      'Never connect the bank straight to the car battery or alternator.',
      'Never back-feed house wiring.',
      'Do not use thin cable or a long cable. It heats and wastes power. A fire can start.',
      'Do not skip the fuses. Do not use a bigger fuse than the maker table says.',
      'Do not charge a lithium bank when it is freezing. Many lithium batteries must not be charged below about 0 C (32 F). Read the battery manual (general practice, ' + UNV + ').',
      'Keep metal tools and jewellery away from the battery terminals. A short circuit can weld metal and burn.'
    ],
    tip: ['Keep the whole run as short as you can. Voltage drop makes a DC-DC charger draw more current. A source aims for under about 2.5 percent drop.', 'Take photos of the wiring before you close any panels.', 'For the safe order of first power-up, see "First power-up: the safe order for a new solar system".'],
    after: ['Check the connections and the cables after a week. Look for heat marks and loose terminals.', 'Check the fuse holders each year.'],
    sections: [{ h: 'The order, in one line', items: ['Car battery, then fuse, then cable, then charger, then fuse, then cable, then bank.', 'Fit the fuses last, and remove them first when you take it apart.'] }],
    sources: [S.renogy, S.vic, S.orion, S.alt],
    unconfirmed: [NOTE, 'Not confirmed: the cable and fuse size. We give none. The maker table decides.', UNV + ': the 8 inch and 5 foot fuse distances. They come from a Renogy page in search results. Follow your maker manual.', UNV + ': the 2.5 percent voltage drop aim, from a Victron community answer.', 'Not confirmed: that the charger suits your car, your bank, or your alternator.', 'Not confirmed: the rules in your country for fitting a second battery to a vehicle. Ask a local electrician or testing station.', 'DEVICE TEST PENDING: not read on an iPad yet.']
  });

  /* ---------- 3. mount ---------- */
  add({
    id: 'carbank-3-mount', title: 'Mount and secure a battery bank in a vehicle',
    intro: 'A battery bank is heavy and holds a lot of energy. In a bump or a crash it must not move, short out or start a fire. This guide shows how to choose a place, secure the bank, protect it and test the mounting.',
    first: [NOTE, ELEC, 'Weigh the bank first. Know its weight before you pick the place.', 'Lift with help. Batteries are heavy and can hurt your back.'],
    do: [
      'Step 1. Weigh the bank, and write down the weight and the size.',
      'Step 2. Choose a place that is dry, cool, away from hot parts, away from the fuel tank and fuel lines, and away from sharp edges. Away from where people sit is best.',
      'Step 3. For lithium in the passenger body of a vehicle, one standard summary says to use a sealed box that is vented to the outside. Ask your electrician and read the battery manual.',
      'Step 4. For flooded lead-acid, the box must be vented. These batteries give off gas. Keep sparks and flames away.',
      'Step 5. Put the bank in a battery box with a lid, if the maker allows. Cover the terminals.',
      'Step 6. Fix the box to the vehicle floor or frame with bolts, or with strong straps and tie-down points. Do not rely on its weight or on friction.',
      'Step 7. Use rubber isolators or battery straps made for vehicles, to cut vibration. Use bolts and washers that do not rust.',
      'Step 8. Seal the places where cables enter the box. Use cable glands or something similar, so cables cannot rub or be pulled.',
      'Step 9. Fit the fuse close to the bank, as in the connect guide. Keep cables tight and supported.',
      'Step 10. Shake test. Push and pull the box hard by hand in every direction. It must not move.',
      'Step 11. Drive a short way on a rough road and look again at the bolts, straps and cables.',
      'Step 12. Keep a fire extinguisher in the vehicle, near the exit. Know where it is.',
      'Step 13. Label the bank, the fuses and the master switch. Add a note with the maker name and the date fitted.'
    ],
    warn: [
      ELEC,
      'Do not leave the bank loose on a seat or in a boot.',
      'Do not put the bank where it can get wet, hot or crushed.',
      'Do not charge or store lithium batteries below freezing without checking the manual.',
      'If the bank swells, smells, hisses, smokes or gets very hot, stop, get out and away, and call for help. Do not touch it.',
      'A rule of thumb for the strength of the mounting (about five times the battery weight) is a vendor claim. Do not rely on it. Ask an engineer or the maker.'
    ],
    tip: ['A portable bank can be carried home. Use a crate with handles, and two people to lift.', 'Check the bank and the mounting after the first week, then every month.'],
    after: ['Look at the bolts, straps, terminals and cables every month and after any hard knock.', 'If the vehicle is in a crash, have the bank and the wiring checked before you use them again.'],
    sections: [{ h: 'Questions for your electrician', items: ['Where is the best place in my vehicle?', 'Does my battery need a vented box?', 'What fuse size and cable size do I need?', 'What are the rules for fitting this in my country?', 'Is the mounting strong enough for the weight?'] }],
    sources: [S.standard, S.redarc, S.renogy],
    unconfirmed: [NOTE, 'Not confirmed: the vehicle and battery rules in your country. The AS/NZS 3001.2 summary is for Australia and New Zealand. We could not check a rule for the United States, the United Kingdom or Portugal.', UNV + ': that vented boxes are needed for every lithium battery. Vendors disagree. Follow the battery manual.', UNV + ': mounting strength. We give no number.', 'DEVICE TEST PENDING: not read on an iPad yet.']
  });

  if (window.LOAD_CORE && window.LOAD_CORE.guides) NEW.forEach(function (g) { window.LOAD_CORE.guides.push(g); });
})();
