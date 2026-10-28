/* Stockpile part 2: dog supplies for 1 to 6 dogs, the 5 to 10 year two-layer plan (replenishment, storage space, cost),
   and guides for storage setup, buying tips, and budget and off-grid options. Written 28 Oct 2026.
   All amounts are planner estimates unless a guide says otherwise. */
(function () {
  var SK = window.LOAD_STOCK;
  var DOG = { small: { kg: 8, lb: 18, label: 'Small dog (about 18 lb, 8 kg)' }, large: { kg: 30, lb: 66, label: 'Large dog (about 66 lb, 30 kg)' }, kcalPerG: 3.6, factor: 1.6 };
  var KG_LB = 2.20462, L_GAL = 3.785;
  function ceil(x) { return Math.ceil(x - 1e-9); }
  function dogGramsPerDay(kg) { return 70 * Math.pow(kg, 0.75) * DOG.factor / DOG.kcalPerG; }
  function dogWaterLitres(lb) { return lb * 29.5735 / 1000; }

  /* one dog size, n dogs, days, us = US units */
  function dogPlan(us, nSmall, nLarge, days) {
    var n = nSmall + nLarge, gS = dogGramsPerDay(DOG.small.kg), gL = dogGramsPerDay(DOG.large.kg);
    var perDayG = nSmall * gS + nLarge * gL, totalG = perDayG * days, keepDays = Math.min(days, 365), keepG = perDayG * keepDays;
    var bagKg = us ? 13.6 : 15;
    var wDay = nSmall * dogWaterLitres(DOG.small.lb) + nLarge * dogWaterLitres(DOG.large.lb);
    var storeDays = Math.min(days, 14), wStore = wDay * storeDays;
    var out = { dogs: n, small: nSmall, large: nLarge, days: days, perDayG: perDayG, totalG: totalG, keepG: keepG, keepDays: keepDays,
      waterPerDay: wDay, waterStore: wStore, waterStoreDays: storeDays, waterTotal: wDay * days, items: [] };
    function add(cat, name, q, unit, note) { out.items.push({ cat: cat, name: name, q: q, unit: q === 1 ? unit[0] : unit[1], note: note || '' }); }
    /* the best bag size is about 4 weeks of food for the whole group, because an opened bag keeps about 4 to 6 weeks */
    var best = Math.max(1, Math.round(perDayG * 28 / 1000 * 10) / 10);
    var bag = Math.min(bagKg, Math.max(1, best));
    add('Food', 'Dry dog food (kibble), to keep on the shelf now', ceil(keepG / 1000 / bag), ['bag of ' + nfx(bag) + ' kg', 'bags of ' + nfx(bag) + ' kg'], nfx(keepG / 1000) + ' kg (' + nfx(keepG / 1000 * KG_LB) + ' lb) for ' + keepDays + ' days. Unopened dry food keeps about 12 to 18 months. An opened bag keeps about 4 to 6 weeks, so buy bags of about ' + nfx(best) + ' kg or split a big bag into sealed portions.');
    if (days > 365) add('Food', 'Dry dog food to buy over the whole plan', ceil(totalG / 1000 / bag), ['bag of ' + nfx(bag) + ' kg', 'bags of ' + nfx(bag) + ' kg'], nfx(totalG / 1000) + ' kg in total. Kibble cannot be stored for years, so replace it every year.');
    add('Food', 'Canned dog food (backup, 2 weeks)', ceil(perDayG * 0.5 * 14 / 400), ['can (400 g)', 'cans (400 g)'], 'Planner estimate. Half the daily food as cans for 14 days if the dogs will eat it. Use the date on the can.');
    add('Water', 'Water for the dogs (stored)', Math.round(wStore * 10) / 10, [us ? 'litre' : 'litre', 'litres'], us ? 'About ' + nfx(wStore / L_GAL) + ' gallons for ' + storeDays + ' days (1 oz per pound a day). Add this to the water for the people.' : storeDays + ' days at about 30 ml per 1 kg a day. Add this to the water for the people.');
    add('Medicine', 'Each medicine your dog takes', ceil(n), ['dog covered', 'dogs covered'], 'Keep 2 weeks of every medicine for each dog, with the dose written down. Ask your vet for a bigger refill.');
    add('Medicine', 'Flea, tick and heartworm prevention', n * Math.max(1, Math.round(Math.min(days, 365) / 30)), ['dose', 'doses'], 'CDC checklist: 1 month. For longer plans, 1 dose a month, up to 12 months.');
    add('Sanitation', 'Poop bags', ceil(n * 2 * Math.min(days, 365) / 15), ['roll (15 bags)', 'rolls (15 bags)'], 'Planner estimate: 2 a day for each dog, up to 1 year. Buy more each year.');
    add('Sanitation', 'Pet-safe cleaner and paper towels', ceil(Math.max(1, n / 2)), ['set', 'sets'], 'For accidents and for cleaning bowls.');
    add('Gear', 'Collar with ID tag and phone number', n, ['collar', 'collars']);
    add('Gear', 'Leash (plus 1 spare for the group)', n + 1, ['leash', 'leashes']);
    add('Gear', 'Harness', n, ['harness', 'harnesses']);
    add('Gear', 'Bowls that do not spill (food and water)', n * 2, ['bowl', 'bowls']);
    add('Gear', 'Crate or carrier that fits each dog', n, ['crate', 'crates'], 'Large dogs need a large crate. If you cannot fit one, use a harness and a seat belt clip.');
    add('Gear', 'Towels and a blanket for each dog', n * 2, ['item', 'items']);
    add('Papers', 'Vaccination and vet records, a recent photo, microchip number', n, ['dog', 'dogs'], 'Keep a paper copy and a phone photo. Keep them in a waterproof bag.');
    add('Gear', 'Dog first-aid kit', 1, ['kit', 'kits'], 'Gauze, tape, non-stick pads, saline, tweezers, a thermometer, a muzzle or soft cloth, and your vet phone number.');
    return out;
  }
  function nfx(x) { return (Math.round(x * 10) / 10).toLocaleString(); }

  /* all household sizes of dogs side by side */
  function dogTable(us, days) {
    var rows = [], i, cols = [1, 2, 3, 4, 5, 6];
    ['small', 'large'].forEach(function (kind) {
      var plans = cols.map(function (n) { return dogPlan(us, kind === 'small' ? n : 0, kind === 'large' ? n : 0, days); });
      rows.push({ kind: kind, label: DOG[kind].label, plans: plans });
    });
    return rows;
  }

  /* 5 to 10 year plan: two layers, replenishment, storage space, cost */
  var COST = { us: { lo: 180, hi: 300, cur: '$' }, pt: { lo: 150, hi: 240, cur: 'EUR ' } };
  function longPlan(country, people, days, kids) {
    var us = country === 'us', R = SK.compute(country, people, days, { lt: true, kids: kids, full: true });
    var years = days / 365, rolling = [], longL = [], rMass = 0, lMass = 0;
    R.food.forEach(function (f) {
      if (f.rotate > 0) { rolling.push({ name: f.name, perYear: Math.max(1, ceil(f.packs * 365 / days)), unit: f.unit, shelf: f.shelf, massYear: f.total * 365 / days }); rMass += f.total; }
      else { longL.push({ name: f.name, packs: f.packs, unit: f.unit, shelf: f.shelf, mass: f.total }); lMass += f.total; }
    });
    var months = days / 30, c = COST[country], full = [c.lo * people * months, c.hi * people * months];
    var share = rMass + lMass > 0 ? rMass / (rMass + lMass) : 0;
    var rollingKg = rolling.reduce(function (a, r) { return a + r.massYear; }, 0) / 1000, longKg = lMass / 1000;
    var rollM3 = rollingKg * 1.7 / 1000, longM3 = longKg * 1.5 / 1000;
    var perYear = [c.lo * people * 12 * share, c.hi * people * 12 * share];
    var hygiene = R.nonfood.filter(function (n) { return n.cat === 'Hygiene' || n.cat === 'Cleaning'; });
    return { us: us, years: years, rolling: rolling, long: longL, rollingKg: rollingKg, longKg: longKg, rollM3: rollM3, longM3: longM3,
      buckets: ceil(longKg / 18), rollShare: share, fullCost: full, perYearRolling: perYear, cur: c.cur, hygiene: hygiene };
  }

  var sizes = SK.sizes;
  var storage = {
    id: 'storage-area-setup', area: 'Essentials', icon: 'pack', difficulty: 'Practical', status: 'partly', checkedOn: '28 Oct 2026',
    title: 'Storage area setup: where and how to store a stockpile',
    intro: 'A stockpile fails if it gets hot, wet, or eaten by pests. This guide shows how to set up the space, how much space you need, and how to rotate.',
    first: [
      'Pick the coolest, driest, darkest space you have.',
      'Keep everything off the floor and away from outside walls.',
      'Put the date on every item. Oldest at the front.',
      'Spread the stockpile over two places if you can.'
    ],
    do: [
      'Choose the space. Best is a cool, dry room inside the house. Do not use a hot attic, a car garage in summer, or a damp basement.',
      'Check the temperature. Sources we found say keep it below 70 F (21 C). One food bank guide gives 50 to 70 F (10 to 21 C).',
      'Check the damp. Look for water stains, mould and condensation. Fix leaks first. Use a small dehumidifier if the room is damp.',
      'Set up shelves. Use metal or strong plastic shelves. Keep the lowest shelf off the floor. Sources give 6 inches (15 cm) to 2 to 3 feet. Keep goods about 2 inches (5 cm) from the wall.',
      'Put heavy items low and light items high. Put water on the floor level on a strong surface. Water is about 1 kg a litre.',
      'Move food out of cardboard boxes. Cardboard can carry insects. Use covered food-grade plastic, glass, cans or foil pouches.',
      'Make zones: ready-to-eat food, dry staples, oil and sugar, water, hygiene and cleaning, medicines, pet food, tools.',
      'Label every container with the name and the date. Use a marker and a label on two sides.',
      'Put new items behind or under the older ones of the same type. This is first in, first out.',
      'Seal gaps. Close cracks and holes where mice and insects get in. Keep pet food in hard lids.',
      'Check the space every week for pests, damp and swollen cans. Do a full count every 6 months.',
      'Keep a one-page list on the wall: item, number, date, replace-by date.'
    ],
    table: { head: ['People', 'Months of rotating food', 'Space for rotating food', 'Space for 1 year of sealed staples'], rows: [] },
    warn: [
      'Do not store fuel, gas cans or bleach next to food. Keep them outside the living area.',
      'Do not store food in a place that gets hot. Heat shortens shelf life.',
      'Do not use a can that is bulging, leaking, rusty or badly dented.',
      'Keep medicines out of the heat and away from children.',
      'Very heavy shelves can fall. Fix them to the wall. Check the floor can take the weight of large water stores.'
    ],
    sections: [
      { h: 'Setup ideas for small spaces', items: [
        'Under beds: flat bins for rice, pasta and canned goods.',
        'Behind doors and in closets: narrow shelves for cans.',
        'Under stairs: a rack with bins and labels.',
        'Use a pantry, a closet or a spare room. Keep each bin to a weight you can lift.',
        'Stack cans in rows by date. A can rotator or a slope shelf keeps the oldest at the front.',
        'Rent a small storage room only if it stays cool and dry. Do not put food in an unheated metal unit in summer.'
      ] },
      { h: 'Setup ideas for large and rural spaces', items: [
        'A dedicated room with shelves, a closed door and a thermometer.',
        'A root cellar or a cool basement room, only if it is dry.',
        'Use sealed food buckets for rice, wheat, oats and beans. A 6 gallon (22 L) bucket holds about 18 kg of rice. Use a gasket lid.',
        'Keep a small working pantry in the kitchen and a bigger reserve elsewhere. Refill the pantry from the reserve every month.'
      ] },
      { h: 'How much space you need', items: [
        'Planner estimates: about 50 litres of shelf space per person per month for ordinary rotating food. About 0.2 cubic metres per person per year for sealed staples in buckets.',
        'The table above shows the space. Add the space for water, hygiene, pet food and gear.',
        'Water needs the most weight. A 4 person family with 14 days of water has about 212 litres, about 212 kg.'
      ] }
    ],
    tip: ['Buy a cheap thermometer and put it in the room.', 'Write a "use first" label on anything near its date.'],
    after: ['Take a photo of your shelves once a year.', 'Use the planner to check you have enough for each period.'],
    sources: [
      ['University of Georgia Extension: long-term emergency food storage', 'https://secure.caes.uga.edu/extension/publications/files/pdf/C%201310_1.PDF'],
      ['Greater Boston Food Bank: evaluating shelf-stable foods', 'https://www.gbfb.org/wp-content/uploads/2016/08/Evaluating-Shelf-Stable-Foods.pdf'],
      ['Colorado State Extension: food storage and emergency preparedness', 'https://elpaso.extension.colostate.edu/wp-content/uploads/sites/44/2020/04/Food-Storage-and-Emergency-Preparedness.pdf'],
      ['NC State Extension: smart storage for hurricane season', 'https://orange.ces.ncsu.edu/2025/08/keeping-your-food-safe-smart-storage-for-hurricane-season/'],
      ['ANFP: top 10 food receiving and storage tips', 'https://www.anfponline.org/news-resources/top-10-resource-lists/top-10-food-receiving---storage-tips']
    ],
    unconfirmed: [
      'We did not open these pages. The facts come from search results and summaries.',
      'The sources disagree on damp. One says 50 to 60 percent relative humidity, another says under 15 percent. We did not pick one. Use a dehumidifier if the room feels damp.',
      'The sources disagree on shelf height: 6 inches in one, 2 to 3 feet in another.',
      'The space estimates (50 litres per person per month, 0.2 cubic metres per person per year) are the planner\'s own, not from a source.',
      'The weight of rice in a bucket (18 kg per 6 gallon bucket) is a planner estimate. Check the bucket.',
      'We found no Portuguese source for storage in Portugal. We used the US sources. Damp is a bigger problem near the coast.'
    ]
  };
  sizes.forEach(function (n) {
    var rm = n * 0.05 * 12, ls = n * 0.2;
    storage.table.rows.push([String(n), '12 months', (Math.round(rm * 10) / 10) + ' m3', (Math.round(ls * 10) / 10) + ' m3']);
  });

  var buying = {
    id: 'stockpile-buying-tips', area: 'Essentials', icon: 'list', difficulty: 'Practical', status: 'partly', checkedOn: '28 Oct 2026',
    title: 'Buying tips for a stockpile: how to buy, how much, and where',
    intro: 'Buy food your family already eats. Build slowly. Watch prices per kilo, not the sticker. This guide gives a buying order and tips for the US and Portugal.',
    first: [
      'Buy what you already eat and use.',
      'Add a few extra items every shop.',
      'Compare the price per kilo or per 100 g.',
      'Check the date before you buy.'
    ],
    do: [
      'Make a list from the planner for your household and length of plan.',
      'Buy in this order: water, food you already eat, essential medicines, hygiene, lighting, then dog supplies.',
      'Each shop, buy 1 to 3 extra of your regular items. Put them on the shelf at the back.',
      'Compare the price per kilo. Large packs are cheaper only if you can use them before they spoil.',
      'Look at the best-before dates. Pick the longest dates from the back of the shelf.',
      'Buy cases when your regular items are on sale. Use shop cards and weekly offers.',
      'Split big packs with a neighbour or relative if you cannot store or use them.',
      'Do not buy food you do not like. It will not be eaten.',
      'Skip dented, swollen or rusty cans. Skip torn bags.',
      'For long-term staples, buy sealed packs or buy bulk rice, wheat, oats and beans and seal them yourself.',
      'Keep the receipts and the date list. Update it each time.'
    ],
    table: { head: ['Where', 'US examples', 'Portugal examples'], rows: [
      ['Everyday groceries', 'Supermarkets, Walmart, Costco', 'Continente, Auchan, local supermercados'],
      ['Bulk and wholesale', 'Warehouse clubs, food-service wholesalers', 'Recheio Cash and Carry'],
      ['Canned fish and fruit', 'Supermarkets, warehouse clubs', 'Supermarkets (sardines, tuna, mackerel are everyday items)'],
      ['Water containers', 'Walmart, hardware stores', 'Hardware stores, supermarkets, online'],
      ['First aid items', 'Pharmacies, Red Cross store', 'Pharmacies (farmacias)'],
      ['Online', 'Amazon and others', 'Amazon.es and Portuguese online shops. Check delivery to Portugal.']
    ] },
    warn: [
      'Do not buy medicines from unknown online sellers. In Portugal, medicine sold online should come from authorised pharmacies.',
      'Compare calories, not "servings". A bucket can say 150 servings and be only about 12 to 13 days of food for one adult.',
      'Do not spend your emergency money on a big purchase you cannot store properly.',
      'Do not take on debt for a stockpile.'
    ],
    sections: [
      { h: 'Budget-first order', items: [
        '1. Water: containers and a way to treat water.',
        '2. Food you already eat: canned fish, canned fruit, crackers, rice, beans, oil.',
        '3. Essential medicines and first aid.',
        '4. Hygiene and sanitation: toilet paper, soap, bags, bleach.',
        '5. Light and radio: rechargeable lights, power banks, a battery radio.',
        '6. Supplies for every dog.',
        'Later: larger batteries, solar panels and generators. Only buy sooner if a medical device needs backup power.'
      ] },
      { h: 'Replacement cost', items: [
        'For 1 year or more, spread the buying over months. Rotating food is eaten, so it replaces your normal grocery spending.',
        'The extra one-time cost is the long-storage staples, buckets, shelves and containers.',
        'Every year replace the rotating items and the hygiene items you used.'
      ] }
    ],
    tip: ['Keep a price book for your 10 most-bought items.', 'Set a small weekly stockpile budget and keep to it.'],
    after: ['Review prices every 6 months.', 'Replace the oldest items first.'],
    sources: [
      ['University of Georgia Extension: long-term emergency food storage', 'https://secure.caes.uga.edu/extension/publications/files/pdf/C%201310_1.PDF']
    ],
    unconfirmed: [
      'The shop names, the example prices and the SNS 24 point about medicines sold online came from the document you gave us. We did not open any shop page or the SNS 24 page. Prices change.',
      'We found no official price statistics for either country.',
      'The order of buying is the order you gave us.',
      'The servings versus calories example is from the document you gave us. We did not check the listing.',
      'The buying tips (price per kilo, split packs, buy on sale) are common advice. We did not find a source for them.'
    ]
  };

  var dogGuide = {
    id: 'dog-stockpile', area: 'Essentials', icon: 'paw', difficulty: 'Practical', status: 'partly', checkedOn: '28 Oct 2026',
    title: 'Supplies for 1 to 6 dogs: small and large',
    intro: 'Each dog needs its own food, water, medicine and gear. Open Tools, then Dog supply planner, to get a full list for 1 to 6 dogs, small and large, for 3 days up to 10 years.',
    first: [
      'The CDC checklist says 2 weeks of food, water and medicine for each animal.',
      'Count each dog on its own. Do not use one number for the whole group.',
      'Dry food keeps about 12 to 18 months unopened. Do not stockpile years of kibble.',
      'Keep their papers, a photo and an ID tag.'
    ],
    do: [
      'Open Tools, then Dog supply planner. Pick how many small and large dogs, and how long.',
      'Small dog in the planner: about 18 lb (8 kg). Large dog: about 66 lb (30 kg). Adjust if yours are different. Ask your vet.',
      'Food: the planner works out grams a day for each dog from its weight. Check the dog food label too.',
      'Buy bags that last about 4 weeks once opened. For one small dog, that is a small bag.',
      'Water: about 1 ounce per pound a day, about 30 ml per kg. Add more in heat. Add it to the water for people.',
      'Medicines: keep 2 weeks of every medicine and 1 month of flea, tick and heartworm prevention.',
      'Put a leash, collar with tag, harness, bowls and a crate or carrier for each dog in one bag or bin.',
      'Keep poop bags, towels, a blanket and a cleaner.',
      'Keep a copy of vaccination papers, the microchip number and a recent photo for each dog.',
      'For a long plan, buy kibble each year and rotate. Use the oldest first.'
    ],
    table: { head: ['Dog', 'Food a day', 'Water a day', 'Bag size to buy'], rows: [] },
    warn: [
      'Do not feed dogs chocolate, grapes, raisins, onions or xylitol sweetener.',
      'Do not change a dog\'s food suddenly. Mix new food in slowly.',
      'Ask your vet about puppies, old dogs, pregnant dogs and dogs with illness.',
      'Never leave a dog in a hot car.',
      'Large dogs in a shelter or evacuation may not be allowed. Plan a place that takes your dogs before you need it.'
    ],
    sections: [
      { h: 'How the amounts are worked out', items: [
        'Calories a day = 70 x weight in kg to the power 0.75, times 1.6 for a neutered adult. This is a common vet formula.',
        'We turn calories into grams of dry food using 3.6 calories per gram. Check your food label. Some foods are richer.',
        'Very active dogs, puppies and nursing dogs need more. Overweight dogs need less.',
        'Water is 1 ounce per pound of body weight a day, from the sources we found.'
      ] },
      { h: 'Budget tips', items: [
        'Buy the food your dog already eats. Rotate it each shop.',
        'Buy one bag extra every few shops and use the oldest first.',
        'Rice, cooked plain, can stretch food for a short time. Ask your vet first.',
        'Keep medicine refills on schedule so you always have a spare.'
      ] }
    ],
    tip: ['Take a photo of each dog beside you in case you are separated.', 'Practice crate time so evacuation is calm.'],
    after: ['Check dates on dog food and medicines every 6 months.', 'Update the dog list when a dog is added or leaves.'],
    sources: [
      ['CDC pet disaster kit checklist', 'https://www.cdc.gov/healthy-pets/media/pdfs/disaster-prep-Pet-Emergency-Checklist-1.pdf'],
      ['CDC Pet Emergency Checklist (state copy)', 'https://des.mt.gov/Preparedness/disaster-prep-Pet-Emergency-Checklist.pdf'],
      ['Hill\'s: estimated energy requirements for dogs and cats (RER and factors)', 'https://www.hillsvet.com.mx/content/dam/cp-sites/hills/hills-vet/es_mx/general/pdf/estimated_energy_requirements_canine_feline-secured.pdf'],
      ['Whole Dog Journal: how long dry dog food lasts', 'https://www.whole-dog-journal.com/food/how-long-does-dry-dog-food-last'],
      ['Eukanuba: how long dry dog food lasts', 'https://www.eukanuba.eu/en-gb/dog/dog-advisor/nutrition/how-long-does-dry-dog-food-last'],
      ['Louisiana water safety for pets: 1 ounce per pound of water a day', 'https://ready.nola.gov/NOLAReady/media/Updates/Saltwater-Intrusion/SELA-Ready-Saltwater-Intrusion-Water-Safety-for-Pets-(Online)-(002).docx'],
      ['Itatiaia: grams of dog food a day by size (Brazil)', 'https://www.itatiaia.com.br/pets-e-animais/caes-e-gatos-quanto-tempo-dura-1-kg-de-racao/']
    ],
    unconfirmed: [
      'We did not open these pages. The facts come from search results and summaries.',
      'The CDC checklist gives 2 weeks of food, water and medicine and 1 month of flea, tick and heartworm prevention. It gives no amount of water per day.',
      'The 1 ounce per pound water rule is from secondary sources. We could not find it on a government page. One source said 1 gallon per pet a day. We did not use it.',
      'The calorie formula and the 1.6 factor are from Hill\'s veterinary guidance. A study of working dogs found about twice the resting need, so real dogs vary a lot.',
      'The 3.6 calories per gram for kibble is the planner\'s assumption.',
      'Shelf lives of dry food (12 to 18 months unopened, 4 to 6 weeks opened) are from pet food sites. We found no FDA or AAFCO page.',
      'The size of the dogs (18 lb and 66 lb) is our choice. We found no standard.',
      'We found no Portuguese source for pet food amounts or prices. The Portuguese search gave only Brazilian results.',
      'We did not look up the safety of rice or foods for dogs. Ask your vet.'
    ]
  };

  var budget = {
    id: 'budget-offgrid', area: 'Essentials', icon: 'bolt', difficulty: 'Practical', status: 'partly', checkedOn: '28 Oct 2026',
    title: 'Budget-first survival and off-grid options for the US and Portugal',
    intro: 'Start with low-cost essentials. Add bigger systems later. Safety equipment comes first. Solar, larger batteries and generators come later unless a medical device needs backup power.',
    first: [
      'Buy in this order: water, food you eat, essential medicines, sanitation, lighting, dog supplies.',
      'Safety first: smoke alarms, carbon monoxide alarms, fire extinguisher.',
      'Generators run outdoors only, far from windows and doors.',
      'Build from groceries and pet food you already use.'
    ],
    do: [
      'Low-cost essentials first: water containers, a manual can opener, a rechargeable light, a power bank, a battery or crank radio, and a safe way to cook.',
      'Add safety items: smoke alarm, carbon monoxide alarm, fire extinguisher, first-aid kit.',
      'Build the food reserve from regular groceries. Eat and replace.',
      'Build the medicine reserve with your pharmacist. See the medicines guide.',
      'Add sanitation: toilet paper, soap, trash bags, plain bleach, a bucket toilet kit.',
      'Add lighting: headlamps, lanterns, rechargeable batteries. Add a small solar charger for phones.',
      'Add supplies for every dog. See the dog guide.',
      'Expandable systems, later: larger water storage, a correctly sized water filter, rainwater collection where it is allowed, solar panels, battery storage, backup cooking.',
      'A generator is a later purchase. Use it outdoors only. See the carbon monoxide guide.',
      'Check your local rules before you collect rainwater or store fuel.'
    ],
    table: { head: ['Priority', 'Low-cost', 'Expandable', 'Safety-critical'], rows: [
      ['Water', 'Food-grade containers, a bleach and boiling plan', 'Larger tanks, a good filter, rainwater collection where allowed', 'Water treatment that matches the source'],
      ['Food', 'Groceries you already eat, rotated', 'Sealed long-storage staples', 'Check cans and dates'],
      ['Medicine', 'First-aid basics, refills on time', 'Bigger reserve with a doctor', 'Backup power for any medical device'],
      ['Sanitation', 'Bucket toilet, bags, soap', 'Composting toilet', 'Hand washing'],
      ['Light and power', 'Headlamps, power banks, radio', 'Solar panel and battery', 'Smoke and carbon monoxide alarms'],
      ['Cooking', 'Camp stove outdoors', 'Second stove, more fuel', 'Never burn charcoal or a stove indoors']
    ] },
    warn: [
      'Carbon monoxide kills. Never run a generator, stove or grill inside a home, garage or near a window.',
      'Do not store fuel inside the house. Check local limits.',
      'Do not use a rainwater supply for drinking without treatment.',
      'Do not buy a solar system before you have the basics above.',
      'Medical devices that need power are the one reason to buy backup electricity early. Talk to your device supplier.'
    ],
    sections: [
      { h: 'Rainwater', items: [
        'In the US, rules differ by state. Some states limit how much you can collect. Check your state.',
        'In Portugal, we found conflicting information. Check with your local council (camara municipal) before you build a system.',
        'Treat rainwater before drinking.'
      ] },
      { h: 'Solar and batteries, later', items: [
        'A small panel can charge phones and lights. It will not run much more on a cloudy day.',
        'Do not buy a large system until the water, food, medicine and sanitation basics are done.',
        'We found no trustworthy price for a small panel in Portugal or the US in this search. Check shops and compare.'
      ] }
    ],
    tip: ['Buy rechargeable AA batteries and a small solar charger.', 'Test every light and radio once a month.'],
    after: ['Check alarm batteries twice a year.', 'Review your list each season.'],
    sources: [
      ['CDC pet disaster kit checklist (2 weeks of food, water and medicine per animal)', 'https://www.cdc.gov/healthy-pets/media/pdfs/disaster-prep-Pet-Emergency-Checklist-1.pdf'],
      ['KOIN: is it legal to collect rainwater in your state (US)', 'https://digital-release.koin.com/news/is-it-legal-to-collect-rainwater-in-your-state'],
      ['MyRainPlan: rainwater collection 50-state guide (US)', 'https://myrainplan.com/rain-water-collection/'],
      ['Frontiers in Environmental Science: rainwater harvesting study (Portugal and Lisbon area)', 'https://www.frontiersin.org/journals/environmental-science/articles/10.3389/fenvs.2025.1587050/full'],
      ['University of Lisbon repository: rainwater harvesting', 'https://repositorio.ulisboa.pt/bitstreams/4e64ae79-a8f7-4030-a960-96c9f21ba338/download']
    ],
    unconfirmed: [
      'We did not open these pages. The facts come from search results and summaries.',
      'The order of buying (water, food, medicine, sanitation, lighting, dogs) is the order you gave us.',
      'The CDC statements about lighting, batteries, power banks, radios and safe backup power are from the text you gave us. We did not check the CDC page.',
      'US rainwater laws are in dispute between sources. Some say it is legal in all 50 states with limits. Others list about 15 states with restrictions. Check your state.',
      'For Portugal we found only one web page, which we could not confirm, and some studies. We cannot say what the rule is. Ask your local council.',
      'We found no trustworthy price for solar panels, batteries or generators for either country.',
      'The low-cost, expandable and safety-critical split is your framing. We added examples.'
    ]
  };

  /* fill the dog guide table with example amounts for 1 small and 1 large dog */
  [['Small dog (18 lb, 8 kg)', DOG.small], ['Large dog (66 lb, 30 kg)', DOG.large]].forEach(function (a) {
    var g = dogGramsPerDay(a[1].kg), w = dogWaterLitres(a[1].lb), best = Math.round(g * 28 / 1000 * 10) / 10;
    dogGuide.table.rows.push([a[0], Math.round(g) + ' g (about ' + nfx(g / 28.3495) + ' oz)', nfx(w) + ' L', 'about ' + nfx(best) + ' kg']);
  });

  if (window.LOAD_CORE && window.LOAD_CORE.guides) {
    [storage, buying, dogGuide, budget].forEach(function (g) { g.source = g.sources[0][1]; window.LOAD_CORE.guides.push(g); });
  }
  window.LOAD_STOCK2 = { dog: DOG, dogPlan: dogPlan, dogTable: dogTable, longPlan: longPlan, cost: COST };
  if (typeof module !== 'undefined') module.exports = window.LOAD_STOCK2;
})();
