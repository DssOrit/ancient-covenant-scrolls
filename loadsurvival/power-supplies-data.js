/* Power supplies: the types compared, how to size them, safety for every kind, lithium battery care, battery cooking gear and a budget ladder. 6 guides.
   Written 29 Oct 2026 from search results. The official pages could not be opened from where this was written, so every guide is Partly checked.
   No prices are given. Prices change by place and shop. Type your own in the tools. */
(function () {
  var NOTE = 'We read search results about these pages. We could not open the pages themselves, so they are cited to us, not checked by us.';
  var SRC = {
    cpscGen: ['CPSC: what to know about generators and carbon monoxide (PDF), cited to us, not checked', 'https://www.cpsc.gov/s3fs-public/468-WhattoKnowGenerators_2022.pdf'],
    cpscAlert: ['CPSC: portable generator safety alert (2017, PDF), cited to us, not checked', 'https://www.cpsc.gov/s3fs-public/Portable-Generator-Safety-Alert-2017_5123.pdf'],
    cdcCO: ['CDC: prevent carbon monoxide poisoning, cited to us, not checked', 'https://www.cdc.gov/natural-disasters/psa-toolkit/prevent-carbon-monoxide-poisoning.html'],
    osha: ['OSHA: lithium-ion battery safety (SHIB 011819), cited to us, not checked', 'https://www.osha.gov/sites/default/files/publications/SHIB011819.pdf'],
    nfpa: ['NFPA: lithium-ion batteries in your home, cited to us, not checked', 'https://www.nfpa.org/-/media/Project/Storefront/Catalog/Files/Fire-Prevention-Week/2025/FPW25_10minutelessonplan.pdf'],
    recalls: ['CPSC: recalls and warnings for power banks (for example 2025 Anker recall), cited to us, not checked', 'https://www.cpsc.gov/Recalls/2025/More-than-One-Million-Anker-Power-Banks-Recalled-Due-to-Fire-and-Burn-Hazards-Manufactured-by-Anker-Innovations'],
    cpscStorm: ['CPSC: winter storms, carbon monoxide risks and fires during power outages (2026), cited to us, not checked', 'https://www.cpsc.gov/Newsroom/News-Releases/2026/Winter-Storms-Arent-Over-CPSC-Warns-of-Deadly-Carbon-Monoxide-Risks-and-Fires-During-Power-Outages'],
    ptGen: ['RTP: man dies of carbon monoxide poisoning from a generator in Leiria (news report, 2026), cited to us, not checked', 'https://www.rtp.pt/noticias/especiais/homem-morre-de-intoxicacao-associada-a-gerador_e1714915']
  };
  var PHY = 'This figure is our own arithmetic from a physics fact (about 4.2 kilojoules to warm 1 litre of water by 1 degree C). It is not from a named source.';
  var G = [];
  function add(g) { g.checkedOn = '29 Oct 2026'; g.status = 'partly'; g.difficulty = g.difficulty || 'Practical'; g.area = 'Power • Supplies'; g.source = g.sources[0][1]; G.push(g); }

  add({ id: 'ps-types', icon: 'battery',
    title: 'Power supplies compared: what each kind can and cannot do',
    intro: 'There are many ways to get power when the grid is down. Each has limits. Pick by what you need to run, for how long, and what you can safely store. Prices are not listed. They change by place and shop.',
    first: [
      'List what you must keep running: phone, light, radio, medical device, fridge, well pump, cooking.',
      'Watts are how much a device draws at one moment. Watt-hours (Wh) are how much energy a battery stores.',
      'Small needs (phones, lights, radio): batteries and power banks are enough.',
      'Large needs (fridge, well pump, heating): a generator, or a large battery with solar, fitted safely.'
    ],
    table: { head: ['Kind', 'Good for', 'Cannot do well', 'Main danger'], rows: [
      ['Disposable batteries (AA, AAA)', 'Flashlights, radios, a few devices. Store for years.', 'Anything that draws a lot.', 'Leaks if left in devices for years. Mixing old and new.'],
      ['Rechargeable batteries and a charger', 'Same devices as above, again and again.', 'Needs power to recharge. Lose charge in storage.', 'Wrong charger. Heat.'],
      ['Power bank', 'Charging phones, tablets, small lights.', 'Anything that needs a mains plug.', 'Lithium fire if damaged or cheap.'],
      ['Portable power station', 'Lights, laptop, router, a small fridge for hours, a CPAP if sized right.', 'Heaters, kettles and hobs for long.', 'Lithium fire. Do not use if swollen or damaged.'],
      ['Solar panel (portable)', 'Refills power banks and power stations in sun.', 'Works poorly in cloud, snow or shade.', 'Wet cables. Heat on the back.'],
      ['Inverter generator (petrol, gas or dual)', 'A fridge, freezer, well pump, lights. Long runs with fuel.', 'Indoor use. Silent use.', 'Carbon monoxide. Fuel fire. Backfeed to the grid.'],
      ['Open-frame generator', 'Large loads and rough work. Often cheaper.', 'Sensitive electronics (voltage can vary).', 'Same as inverter, and noisier.'],
      ['Car or vehicle inverter', 'Phones and a laptop for a short time.', 'Large loads. Drains the starter battery.', 'Never run the engine in a garage.'],
      ['Hand-crank radio or light', 'No fuel and no sun. Low power.', 'Charging a phone quickly.', 'Cheap ones break. Test them.'],
      ['Home battery with solar (installed)', 'Whole-home use for days, with an electrician.', 'Self-installation.', 'Wiring. Always hire a licensed electrician.']
    ] },
    do: [
      'Add up the watts of what you want to run at the same time. Use the Home power calculator in Tools.',
      'Multiply watts by hours to get watt-hours. Make the battery bigger than that to allow for losses.',
      'For solar, size panels so one sunny day refills what you used. The Home power calculator shows this.',
      'Buy products with a recognised safety mark. Check the maker recall page before you buy and after.',
      'Keep one of each cheap kind (flashlight, radio, spare batteries) before you buy one big item.',
      'Test every supply once, when it is not an emergency. Write down how long it ran.',
      'Know where each device plugs in. Label cables.'
    ],
    warn: [
      'A generator is the only item here that makes carbon monoxide. Never run one indoors or in a garage.',
      'Never plug a generator into a wall outlet to power the house. It can electrocute neighbours and utility workers.',
      'A power bank or power station that swells, smells or gets hot must be taken out of use.'
    ],
    tip: ['Start with the cheapest kinds and add one step at a time. See the budget ladder.', 'See also the Home power calculator and the power outage guides.'],
    after: ['Recharge and test after every use. Write the date on each battery.'],
    sources: [SRC.cpscGen, SRC.osha, SRC.nfpa, SRC.cdcCO],
    unconfirmed: [NOTE,
      'The generator facts (carbon monoxide, 20 ft minimum, backfeed, transfer switch) match CPSC text quoted to us.',
      'Lithium battery warnings match OSHA and NFPA text quoted to us. Our search found little on power stations specifically. Follow the maker manual.',
      'The table is our own summary. We did not find a single named source that ranks these power supplies. The strengths and limits are general guidance.',
      'We did not look up or give prices.'] });

  add({ id: 'ps-sizing', icon: 'calc',
    title: 'How much power do you need: watts, watt-hours and run time',
    intro: 'This is the simple arithmetic behind every power supply. The Home power calculator in Tools does it for you.',
    first: [
      'Watts (W) = how hard a device pulls right now. Watt-hours (Wh) = energy stored or used over time.',
      'Run time in hours is about the battery watt-hours, times 0.8, divided by the device watts.',
      'Add the watts of devices that will run at the same time. The supply must be able to give that many watts.',
      'Some devices need much more power for a second when they start. Motors, such as a fridge or a well pump, are the main ones.'
    ],
    do: [
      'Find the watts on the label of each device. If it shows volts and amps, multiply them: watts = volts x amps.',
      'Multiply watts by the hours per day to get watt-hours per day. Add the devices.',
      'Example: a 10 W light for 5 hours = 50 Wh. A 60 W laptop for 3 hours = 180 Wh.',
      'A battery that says 500 Wh gives about 400 Wh you can really use, after losses.',
      'For solar: panel watts x sun hours x about 0.75 = the Wh a panel gives in a day. The factor allows for losses.',
      'For a generator, add up running watts and add the largest start-up surge. The Home power calculator shows this.',
      'Write the numbers down for your own devices. Keep them with the stockpile list.',
      'Reduce what you run first. Turn off what you do not need. Use LED lights.'
    ],
    warn: [
      'The figures here are general. Always check the label of your own device and supply.',
      'A power station that is rated for 1,000 W cannot run a 1,500 W kettle, even for a moment.',
      'A fridge or a pump may need 3 to 6 times its running watts for a second at start. Check the label.'
    ],
    tip: ['Use the Watt-hours tool in Tools for quick checks.', 'A plug-in power meter shows the real watts of a device.'],
    after: ['After a real outage, compare what you used with what you planned. Change the plan.'],
    sources: [SRC.cpscAlert, SRC.cdcCO],
    unconfirmed: [NOTE,
      'The watts, watt-hours and run time arithmetic is general knowledge and our own calculations. It is not from a named source.',
      'The 0.8 usable battery fraction and 0.75 solar factor are the figures used in the app planners. Real products differ.',
      'We searched for a named official page on sizing a portable power station and found none.'] });

  add({ id: 'ps-safety', icon: 'shield',
    title: 'Power supply safety: generators, batteries, cords and fuel',
    intro: 'Most deaths and injuries in power outages come from carbon monoxide, fires and electric shock, not from the outage itself. This page covers every kind of supply.',
    first: [
      'Never run a generator, grill, camp stove or gas oven indoors, in a garage, or near a window, door or vent.',
      'Run a generator outdoors, at least 20 ft (6 m) from the house, with the exhaust pointed away. Put a battery carbon monoxide alarm on every floor and near beds.',
      'Never plug a generator into a wall outlet. Use heavy-duty extension leads, or have an electrician fit a transfer switch.',
      'Headache, dizziness, nausea, confusion or sleepiness: go outside into fresh air and call the emergency number.'
    ],
    do: [
      'Generators: turn off and let the engine cool before refuelling. Keep fuel in approved labelled non-glass containers, away from heaters and pilot lights.',
      'Keep a generator dry and on level ground. Do not run it in rain without a proper cover that leaves space around it.',
      'Look for a generator with a carbon monoxide shut-off. Fit carbon monoxide alarms on every floor.',
      'Portugal: news reports from 2026 say people died or were poisoned when generators were used inside houses, cellars and garages. Authorities say outdoors only, even with the window open. One municipality said keep the exhaust at least 6 m from any air intake.',
      'Batteries and power stations: use the charger that came with the product. Charge on a hard surface, not on a bed, sofa or under a pillow.',
      'Do not leave lithium items charging unattended overnight if you can avoid it. Keep them away from heat and sun.',
      'Stop using any battery that is swollen, hot, leaking, hissing or smoking. Move it outdoors on bare ground away from anything that burns.',
      'Cords: use cords rated for the load. Do not run cords under rugs. Do not daisy-chain extension leads.',
      'Wet and electric do not mix. Keep cords and units off wet ground. Dry your hands.',
      'Candles and flames: use battery lanterns instead. If you must use a flame, keep it away from curtains and never leave it.',
      'Keep a charged fire extinguisher where you cook and where you charge. Know how to use it.',
      'Keep children and pets away from generators, fuel, cords and chargers.'
    ],
    warn: [
      'Opening a door or window does not make a generator safe indoors. Carbon monoxide can kill in minutes.',
      'The 20 ft figure is a minimum. A stationary-generator report found carbon monoxide travelling at least 25 ft in some cases.',
      'Do not touch a downed power line or anything touching it.',
      'Do not throw damaged lithium batteries in the household bin. Take them to a battery recycling point.'
    ],
    tip: ['Test carbon monoxide alarms monthly and keep spare batteries.', 'Keep a fire blanket in the kitchen.'],
    after: ['Let a generator cool, then store it dry. Store fuel safely and use it up in time. Replace damaged cords.'],
    sources: [SRC.cpscGen, SRC.cpscAlert, SRC.cdcCO, SRC.osha, SRC.nfpa, SRC.cpscStorm, SRC.ptGen],
    unconfirmed: [NOTE,
      'Generators outdoors, 20 ft from the home, exhaust away from windows and doors, opening windows does not help, backfeeding danger, transfer switch, non-glass labelled fuel containers, refuelling only when cool, CO shut-off and CO alarms match CPSC text quoted to us.',
      'The 25 ft figure for stationary units comes from a CPSC report as quoted to us.',
      'Inspect batteries for swelling, heat, leaking, hissing or smoke, and remove them from service, match OSHA text quoted to us. Charging on a hard surface and not on a bed or sofa matches NFPA text quoted to us. Never leave unattended overnight came from a 2026 NFPA worksite article, aimed at construction sites.',
      'The Portugal points come from news reports of 2026 events and a municipal statement quoted in them. We did not find an official page.',
      'We did not find a named source for the cord, fire extinguisher, fire blanket, wet ground and children points. They are general guidance.'] });

  add({ id: 'ps-lithium', icon: 'battery',
    title: 'Lithium batteries, power banks and power stations: buy, store and check',
    intro: 'Lithium batteries pack a lot of energy in a small space. Damaged or cheap ones can overheat and catch fire.',
    first: [
      'Buy from known makers. Check for a recognised safety mark and for recalls.',
      'Stop using any unit that is swollen, hot, leaking, hissing or smoking.',
      'Charge on a hard surface with the right charger. Not under a pillow or on a bed.',
      'Keep them dry, away from heat and out of a hot car.'
    ],
    do: [
      'Before you buy, search the maker name and the word recall on the national consumer safety site. Recalls of power banks for fire and burn hazards happen often.',
      'Read the manual. Note the maximum watts and the amp-hours or watt-hours.',
      'Keep a power bank charged to about half or more. Top up every 3 months.',
      'Inspect each unit every time you take it out. Look for swelling, cracks, dents and burn marks.',
      'Keep the charger and cables that came with it. Do not use damaged cables.',
      'Store lithium items in a cool dry place, not in a hot garage or a car in summer.',
      'If a unit is damaged: take it out of use. Put it outdoors on bare ground, or in a metal container with sand, away from anything that burns. Do not throw it in the bin.',
      'Take old or damaged batteries to a battery recycling point or a hazardous waste site.',
      'Do not charge it near a gas cooker, flammable liquids or a pile of paper.',
      'If one catches fire, leave the room and call the emergency number. Do not carry a burning unit.'
    ],
    warn: [
      'Do not pierce, crush or open a lithium battery.',
      'Do not mix cheap unknown-brand cells with good ones.',
      'Do not use a power station that has been in floodwater.'
    ],
    tip: ['Write the purchase date on each unit.', 'Keep the manual with it.'],
    after: ['After use, charge to about half or more, then store.'],
    sources: [SRC.osha, SRC.nfpa, SRC.recalls],
    unconfirmed: [NOTE,
      'Inspecting for bulging, cracking, hissing, leaking, heat or smoke, removing a damaged unit, a fire-resistant container with sand, and disposal at a recycling centre match OSHA text quoted to us.',
      'Charging on a hard surface, not on a bed, sofa or under a pillow, matches NFPA home guidance quoted to us.',
      'Recalls of power banks for fire and burn hazards are shown in CPSC recall pages quoted to us. We did not check any single product.',
      'Our search found nothing on power stations specifically. The advice to store at about half charge, top up every 3 months, and the hot garage point are general guidance. Follow the maker manual.'] });

  add({ id: 'ps-cooking-battery', icon: 'steam',
    title: 'Cooking without gas: battery and low-power cooking gear',
    intro: 'Electric cooking gear can run on a generator or a large power station. It uses a lot of energy, so plan before you buy.',
    first: [
      'An induction hob or a kettle is about 1,000 to 1,800 W. A power station must be able to give that many watts.',
      'Boiling 1 litre of water from cold takes about 100 Wh. A 500 Wh power station gives about 3 to 4 litres, after losses.',
      'A thermos, a hay box and a gas camp stove outdoors use no electricity.',
      'Never cook with a flame indoors. Use a stove outdoors only.'
    ],
    do: [
      'Induction hob: needs a pot with a magnetic base. Heats fast. Check the watts on the label.',
      'Electric kettle: boils fast. One kettle at a time. Check the watts.',
      'Rice cooker or multicooker: about 300 to 700 W. Good for rice, beans and stew in one pot.',
      'Thermos flasks: pour boiled water in at once. It stays hot for hours, so you boil only once.',
      'Hay box or cool box cooking: bring food to a boil, then close it in an insulated box to finish cooking with no power.',
      'Use lids. Use the smallest pot that fits. Soak beans and rice first to save energy.',
      'Cook large batches once, then keep warm in a thermos or insulated container. Reheat only what you eat.',
      'Keep a gas camp stove outdoors as a back-up. See the camp stove and cooking without power guides.',
      'Write the watts of each cooking device in the Home power calculator. The generator size changes a lot.'
    ],
    warn: [
      'Never use a barbecue, camp stove or gas oven indoors. Carbon monoxide kills.',
      'Do not run a hob or kettle from a power bank. They are rated for far less.',
      'Use a food thermometer for meat and fish. Food kept at a warm, unsafe temperature can make you sick.'
    ],
    tip: ['Use the stove for long boils and the kettle for short ones when the sun is out.', 'Boil water once in the morning and keep it in thermos flasks.'],
    after: ['Let hot equipment cool before storing. Wipe the induction hob and keep it dry.'],
    sources: [SRC.cpscGen, SRC.cdcCO],
    unconfirmed: [NOTE,
      'About 100 Wh to boil 1 litre from cold, and about 3 to 4 litres from a 500 Wh power station, are our own arithmetic. ' + PHY,
      'The watts for an induction hob, kettle and rice cooker are typical values used in the app planners. Check each label.',
      'No cooking indoors with a flame and carbon monoxide match CDC and CPSC text quoted to us.',
      'The thermos and hay box methods are general practice. We did not find a named source.'] });

  add({ id: 'ps-budget', icon: 'jar',
    title: 'Power on a budget: what to buy first, step by step',
    intro: 'You do not need an expensive system to be safer in an outage. Add one step at a time. No prices are given. Prices change by place. Type your own prices in the stockpile tracker.',
    first: [
      'Step 1, almost free: charge every phone, power bank and light before bad weather. Fill a bottle with water. Make a paper list of numbers.',
      'Step 2, low cost: headlamps or flashlights and spare batteries, and a battery or hand-crank radio.',
      'Step 3: rechargeable AA batteries and a charger, and a power bank for each person.',
      'Step 4: a small solar panel to refill the power banks and lights.'
    ],
    do: [
      'Step 5: a portable power station sized for your must-haves. Match watts and watt-hours to the Home power calculator.',
      'Step 6: an inverter generator and a transfer switch fitted by a licensed electrician, if you need to run a fridge, freezer or well pump.',
      'Step 7: a home battery with solar, installed by a licensed electrician. This is the big step, so leave it until the rest is done.',
      'Spend on safety first: carbon monoxide alarms, a fire extinguisher, a good extension lead and a transfer switch.',
      'Buy what you need to run, not the biggest unit. Write down your list of must-haves and their watts first.',
      'Buy certified products. A very cheap unknown unit may be unsafe. Check recalls.',
      'Second-hand: be careful with used lithium units. You cannot see their damage. Ask for the date and test it.',
      'Share and borrow: ask neighbours or family who have a generator. Agree on safe rules and who pays for fuel.',
      'Use less: switch to LED lights, unplug what you do not need, cook with lids and a thermos, and plan to eat food that needs no cooking.',
      'Keep ice or frozen water bottles in the freezer. They keep food cold longer when the power is off.',
      'Ask your council or utility about help for people on medical equipment. Some places offer priority or loans.'
    ],
    warn: [
      'Do not try to save money on carbon monoxide alarms, fire extinguishers or the electrician.',
      'Do not wire a generator into the house yourself.',
      'Cheap power banks from unknown makers have been recalled for fires. Check before you buy.'
    ],
    tip: ['Add one item a month. Test it when you get it.', 'See the Cheap power with limited money guide and the Home power calculator.'],
    after: ['Review once a year. Replace batteries that are old. Update your list of must-haves.'],
    sources: [SRC.cpscGen, SRC.recalls, SRC.osha],
    unconfirmed: [NOTE,
      'The order of the steps is our own advice. We did not find a named source that sets this order.',
      'Safety first, transfer switch by an electrician, no backfeeding, and recall warnings match CPSC text quoted to us.',
      'We did not look up prices. We did not check priority help schemes for people on medical equipment in any country.',
      'The tips on frozen bottles, borrowing and used lithium units are general guidance.'] });

  if (window.LOAD_CORE && window.LOAD_CORE.guides) {
    G.forEach(function (g) { window.LOAD_CORE.guides.push(g); });
  }
})();
