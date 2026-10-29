/* Household guides: older woman, weather, dust and allergies, menopause, power outage and well pump, buying order, storage. 7 guides.
   Written 29 Oct 2026 from search results. The official pages could not be opened from where this was written, so every guide is Partly checked.
   Steps without a named source are marked general guidance in the Not confirmed list. This is not medical advice. */
(function () {
  var NOTE = 'We read search results about these pages. We could not open the pages themselves, so each source is labelled OFFICIAL SOURCE LINKED BUT NOT OPENED or DATA UNVERIFIED. The web addresses may have moved.';
  var GEN = 'The steps marked as general guidance, and the tips, are common practice. We did not find a named source for them.';
  var SRC = {
    epaWells: ['EPA: private drinking water wells (OFFICIAL SOURCE LINKED BUT NOT OPENED)', 'https://www.epa.gov/privatewells'],
    nhsMeno: ['NHS: menopause (OFFICIAL SOURCE LINKED BUT NOT OPENED)', 'https://www.nhs.uk/conditions/menopause/'],
    niaMeno: ['National Institute on Aging: menopause (OFFICIAL SOURCE LINKED BUT NOT OPENED)', 'https://www.nia.nih.gov/health/menopause'],
    mayoMeno: ['Mayo Clinic: menopause symptoms and causes (DATA UNVERIFIED: unofficial source, linked but not opened)', 'https://www.mayoclinic.org/diseases-conditions/menopause/symptoms-causes/syc-20353397'],
    acaaiMite: ['ACAAI: dust mite allergy (OFFICIAL SOURCE LINKED BUT NOT OPENED)', 'https://acaai.org/allergies/allergic-conditions/dust-mite-allergy/'],
    nhsHay: ['NHS: hay fever (OFFICIAL SOURCE LINKED BUT NOT OPENED)', 'https://www.nhs.uk/conditions/hay-fever/'],
    readyFood: ['Ready.gov: food (OFFICIAL SOURCE LINKED BUT NOT OPENED)', 'https://www.ready.gov/food'],
    readyWater: ['Ready.gov: water (OFFICIAL SOURCE LINKED BUT NOT OPENED)', 'https://www.ready.gov/water'],
    usdaShelf: ['USDA FSIS: shelf-stable food safety (OFFICIAL SOURCE LINKED BUT NOT OPENED)', 'https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/shelf-stable-food-safety'],
    redCross: ['American Red Cross: survival kit supplies (OFFICIAL SOURCE LINKED BUT NOT OPENED)', 'https://www.redcross.org/get-help/how-to-prepare-for-emergencies/survival-kit-supplies.html'],
    readyOlder: ['Ready.gov: disaster preparedness guide for older adults (PDF) (OFFICIAL SOURCE LINKED BUT NOT OPENED)', 'https://www.ready.gov/sites/default/files/2023-09/ready-gov_disaster-preparedness-guide-for-older-adults.pdf']
  };
  var G = [];
  function add(g) { g.checkedOn = '29 Oct 2026'; g.status = 'partly'; g.difficulty = g.difficulty || 'Practical'; g.source = g.sources[0][1]; G.push(g); }

  add({ id: 'hh-older-woman', area: 'Seniors • Household', icon: 'heart',
    title: 'Caring for the older woman in the house',
    intro: 'One older woman in the house needs a plan of her own: her medicines, her heat and cold, her balance, her sleep. Fill in the blanks for her. Not medical advice.',
    first: [
      'Write one page for her: name, age, medicines and doses, allergies, doctor name and phone. Pollen and dust mite allergies go on it. Keep a copy in the grab bag.',
      'Keep 7 to 14 days of her medicines in one box, with the list. Ask the pharmacy about an early refill.',
      'Choose who checks on her each morning and each night.',
      'Keep her glasses, hearing aids, walking aid and a torch within reach of her bed.'
    ],
    do: [
      'Put her bed in the warmest room in winter and the coolest room in summer.',
      'Water: offer a drink every hour she is awake in hot weather. Older people may not feel thirst.',
      'Falls: clear the floor, put a night light on the way to the toilet, use non-slip socks. Keep a torch and a whistle by the bed.',
      'Power cut: she goes in the one warm room. Keep her medicines, water and torch with her.',
      'Sleep and rest: keep a normal routine as far as you can. Short naps in the day are fine.',
      'Write down the name of the nearest clinic and the emergency numbers: 112 in Portugal, 911 in the US.'
    ],
    warn: [
      'Call the emergency number for: a fall with a hit to the head, chest pain, trouble breathing, sudden confusion, one side of the face or body weak, a very high or very low body temperature, or severe vomiting.',
      'Do not stop her medicines without a doctor. Do not give new medicines or herbal products on a guess.'
    ],
    tip: ['Fill in the blanks on this page on paper and keep it where the family can find it.', 'See the Seniors guides for heat, cold, falls, confusion and check-ins.'],
    after: ['After an emergency, check her sleep, food, water and medicines, and call her doctor if anything changed.'],
    sources: [SRC.readyOlder, SRC.nhsMeno],
    unconfirmed: [NOTE,
      'The idea of a one-page medical list, a medicine supply, and a check-in person match Ready.gov text quoted to us.',
      'The bed placement, drink every hour, night light and whistle are general guidance. ' + GEN,
      'We do not know her medicines or health. The owner has not yet given details. Ask her doctor.'] });

  add({ id: 'hh-weather-home', area: 'Home skills • Weather', icon: 'sun',
    title: 'Weather at home: heat, cold, rain and wind',
    intro: 'A simple routine for each kind of weather for a house of six people and five small dogs. Check your local weather service for warnings.',
    first: [
      'Check the forecast each morning. Portugal: IPMA. US: your local National Weather Service.',
      'Heat: stay in the coolest room, close shutters in the day, drink water, no hard work at midday. Never leave dogs in a car or a hot room.',
      'Cold: one warm room, layers, a hat, dry socks. See the staying warm guides.',
      'Storm or rain: bring dogs inside, check the roof, drains and gutters, charge the lights and phones.'
    ],
    do: [
      'Heat: wet cloths on the neck, a cool foot bath, light clothes. Give dogs shade, water and a cool floor. Small dogs overheat fast.',
      'Cold: dogs need a bed off the floor and a blanket. Small dogs get cold quickly.',
      'Wind: store loose items, close shutters, keep away from trees and windows.',
      'Heavy rain: clear the drains, move things off the ground in low rooms, know the way to higher ground.',
      'Keep a battery radio for warnings when the phone or power is down.'
    ],
    warn: [
      'Heat stroke signs: hot dry skin, confusion, fainting, a very high temperature. Call the emergency number and cool the person while you wait.',
      'Do not drive through floodwater. Do not shelter under trees in a storm.'
    ],
    tip: ['A cheap room thermometer tells you more than guessing.'],
    after: ['Check the house, the well pump and the dogs. Write what worked.'],
    sources: [SRC.readyFood, SRC.readyWater],
    unconfirmed: [NOTE,
      'IPMA is the Portuguese weather service and the National Weather Service is the US one. We did not open either site.',
      'These routines are general guidance. See the heat wave, flood and winter storm guides for sourced steps. ' + GEN] });

  add({ id: 'hh-dust-allergy', area: 'Medical • Allergies', icon: 'wind',
    title: 'Dust, dust mites and pollen at home',
    intro: 'For the older woman with pollen and dust mite allergies, and anyone else who sneezes. These steps cut how much allergen she breathes. Not medical advice.',
    first: [
      'Wash sheets and pillow covers every week in hot water. Hot is 60 C (140 F) by the UK/NHS style advice and 130 F by some US advice. We found both. Use the hottest the fabric allows.',
      'Put zip-up covers on her mattress and pillows.',
      'Keep dogs off her bed.',
      'Pollen days: keep windows shut, wash hair and change clothes after being outside.'
    ],
    do: [
      'Dust with a damp cloth, not a dry one. Vacuum often, with a filter if you have one.',
      'Remove rugs and heavy curtains from her room if you can.',
      'Keep the room dry. Mites like damp. Let in air on dry days and low-pollen hours.',
      'After a power cut, clean up mould and dust before she goes back into the room.',
      'Fine dust or smoke: stay in one clean room with the door shut, and see the smoke guide.',
      'Wash dog beds often.'
    ],
    warn: [
      'Wheezing, a tight chest, or trouble breathing is an emergency. Call 112 or 911.',
      'Ask her doctor about allergy medicines. Do not guess doses.'
    ],
    tip: ['Pollen is highest on dry windy days and in the morning in many places.'],
    after: ['If symptoms stay after cleaning, ask a doctor.'],
    sources: [SRC.acaaiMite, SRC.nhsHay],
    unconfirmed: [NOTE,
      'The hot wash temperature differs between sources we saw: 60 C in UK advice and 130 F (about 54 C) in some US advice. We did not settle it.',
      'Covers, damp dusting and keeping dry match what we saw in dust mite advice quoted to us.',
      'The pollen-day routine and dog bed advice are general guidance. ' + GEN] });

  add({ id: 'hh-menopause', area: 'Medical • Menopause', icon: 'thermo',
    title: 'Menopause symptoms in an emergency',
    intro: 'Hot flushes, night sweats and poor sleep get worse with heat and stress. These self-help steps come from health sites. This is not medical advice. Talk to her doctor about treatment.',
    first: [
      'Dress in thin layers you can take off. Keep a fan or a damp cloth near the bed.',
      'Keep the bedroom cool. Use cotton sheets.',
      'Drink water. Cut down on alcohol, caffeine and spicy food if they set off flushes.',
      'Do not stop any medicine she takes without her doctor.'
    ],
    do: [
      'Keep a regular sleep time and a calm routine.',
      'Gentle exercise such as walking helps many people.',
      'If she takes hormone treatment, keep a supply and the doctor name in her medicine box.',
      'Mood changes, low mood and worry are common. Talk, rest and ask for help.'
    ],
    warn: [
      'Heavy or unusual bleeding, bleeding after the menopause, chest pain, or severe low mood or thoughts of self-harm: get medical help. Call the emergency number if urgent.',
      'Do not take supplements or herbal products on a guess. Ask a doctor or pharmacist.'
    ],
    tip: ['A small battery fan is a good power-cut item for hot flushes.'],
    after: ['Make a doctor visit when things are calm.'],
    sources: [SRC.nhsMeno, SRC.niaMeno, SRC.mayoMeno],
    unconfirmed: [NOTE,
      'Thin layers, cool room, less caffeine and alcohol, and exercise match the self-help lists we saw quoted from the NHS, National Institute on Aging and Mayo Clinic.',
      'We do not know her symptoms or any treatment she takes.',
      'The battery fan tip is general guidance. ' + GEN] });

  add({ id: 'hh-outage-well', area: 'Water • Well pump', icon: 'drop',
    title: 'Power cut and the well pump',
    intro: 'The electric pump stops when the power stops. No power means no water from the tap. Plan for it before it happens.',
    first: [
      'Store water now. A common rule is 1 gallon (about 4 litres) per person per day for at least 3 days. For 6 people and 5 dogs, count the dogs too.',
      'Know where your pump switch, breaker and pressure tank are. Write the pump label numbers (running and start-up watts) on a card.',
      'Fill bottles and buckets as soon as a storm is forecast.',
      'Use stored water for drinking first. Use other water for flushing and washing.'
    ],
    do: [
      'A generator or battery power station can run the pump only if it is big enough for the start-up surge. See the Power supplies guides. Have a qualified electrician fit a safe connection. Never plug a generator into a wall socket.',
      'After a flood or if the well was under water: do not drink the water. Disinfect and test it before you use it.',
      'Keep a way to treat water: bleach, tablets or a filter, and a pot to boil.',
      'Do not run the pump dry. Switch it off if the water stops.',
      'Keep a few days of water for the dogs as well.'
    ],
    warn: [
      'Do not use generator exhaust indoors. Carbon monoxide kills.',
      'If the well may be contaminated, boil or treat water for drinking and cooking.'
    ],
    tip: ['The owner still needs to give the well pump label. Ask the installer.'],
    after: ['Test the well water after a flood or long outage.'],
    sources: [SRC.epaWells, SRC.readyWater],
    unconfirmed: [NOTE,
      'The 1 gallon per person per day for at least 3 days rule matches Ready.gov text quoted to us.',
      'Do not drink well water after a flood until it is disinfected and tested matches what we saw from EPA well pages quoted to us.',
      'We found no named source for a hand pump option. We did not include one.',
      'We do not know the pump size. The owner has not given the label.',
      GEN] });

  add({ id: 'hh-buy-order', area: 'Essentials • Buy order', icon: 'list',
    title: 'What to buy first: order for 6 people and 5 dogs',
    intro: 'Buy in this order. Do the first step, then the next. You can stop at any step and still be safer than before.',
    first: [
      '1. Water: containers and enough for 3 days for everyone, dogs too. Then bleach or tablets.',
      '2. Food that needs no cooking for 3 days. A can opener. Dog food for 3 days.',
      '3. Light and radio: torches, a battery radio, spare batteries, power banks.',
      '4. Medicines for 7 to 14 days, first aid kit, glasses, her medicine list.'
    ],
    do: [
      '5. Warmth and shelter: blankets, sleeping bags, a tarp, layers.',
      '6. Toilet and hygiene: bags, soap, wipes, period products, nappy or incontinence items if needed.',
      '7. Cooking: a safe stove for outdoors, fuel, matches.',
      '8. Power: a power station sized with the Power supplies guides.',
      '9. Move food and water up to 2 weeks.',
      '10. Papers, cash and copies in a waterproof bag.',
      'Write the shop price yourself. This app does not store prices.'
    ],
    warn: ['Do not buy a generator before you know the well pump label and how to run it safely.'],
    tip: ['Buy a little each time you shop. Two extra cans a week adds up.'],
    after: ['Check dates every six months.'],
    sources: [SRC.redCross, SRC.readyFood],
    unconfirmed: [NOTE,
      'The kit item lists match Red Cross and Ready.gov text quoted to us. The order of buying is our own plan, not from a named source.',
      'We do not know how many of the women use tampons or pads. The owner has not answered.',
      GEN] });

  add({ id: 'hh-storage', area: 'Food • Storage', icon: 'jar',
    title: 'Storing food and water for the long run',
    intro: 'Good storage keeps food safe and stops waste. Cool, dry and dark is the rule.',
    first: [
      'Keep food in a cool, dry place away from sun, below 85 F (about 29 C) if you can.',
      'Put new food at the back and old food at the front. Use the oldest first.',
      'Write the date on every item.',
      'Replace stored water about every 6 months.'
    ],
    do: [
      'Canned goods: low-acid cans such as meat and vegetables last about 2 to 5 years. High-acid cans such as tomatoes and fruit last about 12 to 18 months.',
      'Keep dry food in sealed, pest-proof containers.',
      'Keep dog food sealed. Rotate it as well.',
      'Check cans each time. Throw out bulging, leaking or rusty ones.',
      'Keep food off the floor and away from damp walls.'
    ],
    warn: ['Do not eat food from a swollen or leaking can. Throw it out.', 'Heat shortens shelf life. Do not store food in a hot shed or loft.'],
    tip: ['A small notebook by the shelf makes checking dates easy.'],
    after: ['Do a check every six months and eat the oldest first.'],
    sources: [SRC.usdaShelf, SRC.readyFood, SRC.readyWater, SRC.redCross],
    unconfirmed: [NOTE,
      'Cool and dry, canned goods ranges, and replace water every 6 months match USDA, Ready.gov and Red Cross text quoted to us. Sources differ a little on the ranges.',
      'First in, first out and the notebook are common practice. ' + GEN] });

  if (window.LOAD_CORE && window.LOAD_CORE.guides) {
    G.forEach(function (g) { window.LOAD_CORE.guides.push(g); });
  }
})();
