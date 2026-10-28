/* Stockpile part 3: "My stockpile tracker" (editable rates, pack sizes, your own prices, what you already own, CSV and JSON),
   equipment checklist, dog profiles (each dog on its own), and two guides: vitamins and natural items, and fish from catch to cooking
   with few or no appliances. Written 28 Oct 2026. Rates are editable monthly per-person planning numbers, not nutrition prescriptions.
   No prices are built in. Blank prices are left out of totals. */
(function () {
  var CUR = { US: '$', PT: 'EUR ', UK: 'GBP ' };
  var RETAIL = {
    US: [['Amazon.com', 'https://www.amazon.com/s?k=bulk+emergency+food+supplies', 'Search listings. Compare unit price.'], ['Walmart', 'https://www.walmart.com/', 'Regular and bulk groceries'], ['Costco', 'https://www.costco.com/', 'Warehouse club. Membership may apply.'], ["Sam's Club", 'https://www.samsclub.com/', 'Warehouse club. Membership may apply.'], ['Target', 'https://www.target.com/', 'Household and hygiene']],
    UK: [['Amazon.co.uk', 'https://www.amazon.co.uk/s?k=bulk+emergency+food+supplies', 'Search listings. Compare unit price.'], ['Tesco', 'https://www.tesco.com/', 'Groceries and household'], ['ASDA', 'https://www.asda.com/', 'Groceries and household'], ['Costco UK', 'https://www.costco.co.uk/', 'Warehouse club. Membership may apply.'], ["Sainsbury's", 'https://www.sainsburys.co.uk/', 'Groceries and household']],
    PT: [['Amazon.es', 'https://www.amazon.es/s?k=alimentos+conservas+por+grosso', 'Check that it delivers to Portugal.'], ['Continente', 'https://www.continente.pt/', 'Groceries and hygiene'], ['Pingo Doce', 'https://www.pingodoce.pt/', 'Groceries and hygiene'], ['Auchan Portugal', 'https://www.auchan.pt/', 'Groceries and hygiene'], ['Makro Portugal', 'https://www.makro.pt/', 'Wholesale. Eligibility may apply.']]
  };
  /* id, name, category, unit, monthly rate per person, pack size, note */
  var ITEMS = [
    ['rice', 'White rice', 'Food', 'kg', 3, 1, 'Dry grain'], ['oats', 'Oats', 'Food', 'kg', 2, 1, 'Breakfast grain'], ['pasta', 'Pasta or couscous', 'Food', 'kg', 1.5, 0.5, 'Dry grain'],
    ['beans', 'Dry beans and lentils', 'Food', 'kg', 2, 1, 'Needs safe cooking'], ['crackers', 'Crackers', 'Food', 'kg', 1, 0.2, 'Rotate for freshness'], ['nuts', 'Nuts and peanut butter', 'Food', 'kg', 1, 0.5, 'Check allergens and shelf life'],
    ['oil', 'Cooking oil', 'Food', 'L', 0.75, 1, 'Rotate. Heat spoils it.'], ['fish', 'Canned fish', 'Food', 'cans', 10, 1, 'Sardines, tuna, salmon'], ['fruit', 'Canned fruit', 'Food', 'cans', 10, 1, 'Choose familiar kinds'],
    ['vegetables', 'Canned vegetables and tomato', 'Food', 'cans', 15, 1, 'Mixed vegetables'], ['milk', 'Powdered or UHT milk equivalent', 'Food', 'kg', 1, 1, 'Adjust if dairy-free'], ['sweet', 'Sugar or honey', 'Food', 'kg', 0.5, 0.5, 'Optional. Adjust to your diet.'],
    ['meat', 'Canned meat or ready beans', 'Food', 'cans', 5, 1, 'Ready-to-eat protein'],
    ['vit', 'Multivitamin with vitamin C', 'Vitamins', 'tablets', 30, 100, 'One a day. Read the label. See the vitamins guide.'],
    ['toilet', 'Toilet paper', 'Hygiene', 'rolls', 3, 1, 'Roll sizes vary'], ['tissues', 'Facial tissues', 'Hygiene', 'boxes', 1, 1, 'Box sizes vary'], ['soap', 'Bar soap', 'Hygiene', 'bars', 1, 1, 'Hands and body'],
    ['toothpaste', 'Toothpaste', 'Hygiene', 'mL', 60, 100, 'Use the tube size as the pack'], ['brush', 'Toothbrush replacement', 'Hygiene', 'brushes', 0.33, 1, 'Replace as needed'], ['laundry', 'Laundry detergent', 'Hygiene', 'loads', 8, 25, 'Edit for your laundry'],
    ['dishsoap', 'Dishwashing liquid', 'Hygiene', 'mL', 150, 500, 'Edit if you use a dishwasher'], ['sanitizer', 'Hand sanitizer', 'Hygiene', 'mL', 90, 250, 'Soap and water are better when you have them'],
    ['trash', 'Heavy-duty trash bags', 'Sanitation', 'bags', 10, 20, 'Pack size varies'], ['wipes', 'Cleaning wipes', 'Sanitation', 'wipes', 30, 80, 'Not a replacement for water'], ['gloves', 'Disposable cleaning gloves', 'Sanitation', 'pairs', 4, 50, 'Choose the right protection'],
    ['gauze', 'Sterile gauze pads', 'Medical', 'pads', 4, 20, 'Not a prescription'], ['bandages', 'Adhesive bandages', 'Medical', 'pieces', 8, 50, 'Mixed sizes'], ['medgloves', 'Disposable medical gloves', 'Medical', 'pairs', 4, 50, 'Right size and material'],
    ['masks', 'Respirator masks (N95 or FFP2)', 'Medical', 'pieces', 2, 10, 'Fit and setting matter']
  ].map(function (x) { return { id: x[0], name: x[1], cat: x[2], unit: x[3], rate: x[4], pack: x[5], note: x[6] }; });
  var GEAR = [['radio', 'Battery or hand-crank radio'], ['lights', 'LED lanterns and headlamps'], ['power', 'Power banks and charging cables'], ['charger', 'Portable solar charger (optional)'], ['opener', 'Manual can opener'], ['watercontainers', 'Food-safe water containers'], ['treatment', 'Water treatment that matches your source'], ['fire', 'Fire extinguisher and smoke alarms'], ['co', 'Carbon monoxide alarms'], ['cook', 'Safe backup cooking arrangement'], ['medkit', 'Household first-aid kit'], ['bleed', 'Bleeding-control kit and training'], ['burn', 'Burn care supplies'], ['thermometer', 'Thermometer and essential medical devices'], ['meds', 'Personal medicines and medicine records'], ['sanitation', 'Emergency toilet supplies'], ['shelter', 'Blankets, insulation and weather clothing'], ['docs', 'Copies of documents and emergency contacts'], ['cash', 'Small cash reserve'], ['tools', 'Basic hand tools and repair supplies'], ['hygiene', 'Menstrual, infant and incontinence supplies as needed'], ['petkit', 'Pet carriers, leashes and records']];
  var PERIODS = [[3, '3 days'], [7, '1 week'], [30, '1 month'], [90, '3 months'], [180, '6 months'], [365, '1 year'], [1825, '5 years'], [3650, '10 years']];
  function ceil(x) { return Math.ceil(x - 1e-9); }
  function blank() { return { country: 'US', people: 4, days: 90, custom: '', water: 3.785, mens: 0, rate: {}, pack: {}, price: { US: {}, PT: {}, UK: {} }, have: {}, gear: {}, dogs: [], dogDays: 14, owned: {} }; }
  /* st: the tracker state. Returns rows and totals. */
  function compute(st) {
    var days = Math.max(1, Number(st.days) || 1), people = Math.max(1, Number(st.people) || 1), rows = [], known = 0, unknown = 0, left = 0;
    ITEMS.forEach(function (it) {
      var rate = st.rate[it.id] === undefined || st.rate[it.id] === '' ? it.rate : Number(st.rate[it.id]) || 0;
      var pack = st.pack[it.id] === undefined || st.pack[it.id] === '' ? it.pack : Math.max(0.0001, Number(st.pack[it.id]) || it.pack);
      var needed = rate * people * days / 30, packs = ceil(needed / pack), units = packs * pack;
      var p = (st.price[st.country] || {})[it.id], price = p === undefined || p === '' ? null : Number(p);
      var have = Math.max(0, Number(st.have[it.id]) || 0), remain = Math.max(0, packs - have);
      var cost = price === null || isNaN(price) ? null : packs * price, costLeft = price === null || isNaN(price) ? null : remain * price;
      if (cost === null) unknown++; else { known += cost; left += costLeft; }
      rows.push({ it: it, rate: rate, pack: pack, needed: needed, packs: packs, units: units, price: price, cost: cost, have: have, remain: remain, costLeft: costLeft });
    });
    var mens = Math.max(0, Number(st.mens) || 0), mensUnits = mens * 30 * days / 30;
    var waterL = people * days * (Number(st.water) || 3.785);
    return { rows: rows, known: known, left: left, unknown: unknown, mens: mensUnits, water: waterL, containers: ceil(waterL / 20), waterKg: waterL, days: days, people: people };
  }
  function csv(st) {
    var C = compute(st), cur = CUR[st.country], q = function (s) { return '"' + String(s).replace(/"/g, '""') + '"'; };
    var lines = [['Item', 'Category', 'Unit', 'Needed', 'Pack size', 'Packs to buy', 'Units bought', 'Price per pack', 'Cost', 'Packs owned', 'Packs still to buy', 'Cost still to buy'].map(q).join(',')];
    C.rows.forEach(function (r) { lines.push([q(r.it.name), q(r.it.cat), q(r.it.unit), (Math.round(r.needed * 100) / 100), r.pack, r.packs, Math.round(r.units * 100) / 100, r.price === null ? '' : r.price, r.cost === null ? '' : Math.round(r.cost * 100) / 100, r.have, r.remain, r.costLeft === null ? '' : Math.round(r.costLeft * 100) / 100].join(',')); });
    lines.push(['Water litres', '', 'L', Math.round(C.water), '', C.containers, '', '', '', '', '', ''].map(function (x) { return typeof x === 'string' ? q(x) : x; }).join(','));
    lines.push([q('Total of rows with a price (' + cur.trim() + ')'), '', '', '', '', '', '', '', Math.round(C.known * 100) / 100, '', '', Math.round(C.left * 100) / 100].join(','));
    lines.push(q('Rows with no price are left out of the totals: ' + C.unknown));
    return lines.join('\n');
  }
  /* one dog: weight kg, optional daily grams, bag kg, water ml per kg a day */
  function dogGrams(kg) { return 70 * Math.pow(kg, 0.75) * 1.6 / 3.6; }
  function dogCalc(d, days) {
    var kg = Math.max(0, Number(d.kg) || 0), g = d.g === undefined || d.g === '' ? dogGrams(kg) : Number(d.g) || 0, bag = Math.max(0.1, Number(d.bag) || 13.6), w = Number(d.w) || 30;
    var foodKg = g * days / 1000, waterL = kg * w * days / 1000;
    return { kg: kg, grams: g, bag: bag, foodKg: foodKg, bags: ceil(foodKg / bag), waterPerDay: kg * w / 1000, waterL: waterL, bagWeeks: g > 0 ? bag * 1000 / g / 7 : 0 };
  }

  var vit = {
    id: 'vitamins-natural-items', area: 'Medical', icon: 'leaf', difficulty: 'Practical', status: 'partly', checkedOn: '28 Oct 2026',
    title: 'Vitamins and natural items that can help in a long emergency',
    intro: 'A stockpile of rice, beans and cans can run short on some vitamins and minerals, mostly vitamin C, vitamin D and iron. This guide lists what to store, which foods give each, and which natural items help with mild problems.',
    first: [
      'Keep a multivitamin with vitamin C in the stockpile. One a day for each adult.',
      'Keep foods rich in vitamin C: canned tomatoes, citrus, potatoes, cabbage, peppers.',
      'Keep canned fish and powdered or UHT milk. They give vitamin D and B12.',
      'Read every label. Do not take more than the label says.'
    ],
    do: [
      'Add a multivitamin with vitamin C to your list. The Tracker and the Stockpile planner include one.',
      'For plans of 3 months or more, plan 1 tablet a day for each adult. That is 365 a year.',
      'Eat fruit and vegetables first while they are fresh. Then use canned tomatoes and fruit, potatoes, and cabbage.',
      'Keep canned fatty fish (sardines, salmon, mackerel, tuna) for vitamin D. Add fortified milk, if you use it.',
      'Get safe daylight outdoors when you can. Skin makes vitamin D from sunlight.',
      'Use iodized salt for iodine. Keep it in the pantry list.',
      'For iron, keep beans, lentils, canned fish and meat. Eat vitamin C foods with them.',
      'Use the natural items below for mild problems. Use the medicines guide for the table.',
      'Check dates on vitamins every 6 months. Rotate them like food.',
      'Ask a pharmacist before you give vitamins to children, or take them if you are pregnant or on prescription medicine.'
    ],
    table: { head: ['Nutrient', 'Adult amount (NIH ODS)', 'Foods that give it', 'In a stockpile'], rows: [
      ['Vitamin C', 'Men 90 mg, women 75 mg. Smokers add 35 mg.', 'Citrus, peppers, cabbage, potatoes, canned tomatoes', 'Multivitamin. Canned tomatoes and fruit. Fresh when you can.'],
      ['Vitamin D', '15 mcg (600 IU) for ages 1 to 70. 20 mcg (800 IU) at 71 and over. Babies 10 mcg (400 IU).', 'Fatty fish (trout, salmon, tuna, mackerel), fish liver, fortified milk. Skin makes it in sunlight.', 'Canned fish. Fortified milk. Daylight. Multivitamin.'],
      ['Iron', 'Men 8 mg. For women check the NIH fact sheet.', 'Beans, lentils, meat, canned fish', 'Beans, lentils, canned meat. Eat with vitamin C.'],
      ['Iodine', '150 mcg for adults', 'Iodized salt, fish, dairy', 'Iodized salt. Canned fish.'],
      ['Vitamin B12', '2.4 mcg for adults', 'Fish, meat, dairy, eggs, fortified foods', 'Canned fish, powdered milk, powdered eggs. Multivitamin.']
    ] },
    warn: [
      'Vitamins are not a replacement for food. Do not take more than the label says.',
      'Keep iron tablets and all vitamins away from children.',
      'Pregnant, nursing, older people, children and people on prescription medicine need advice from a pharmacist.',
      'Natural does not mean safe. Some herbs change how medicines work.',
      'Do not use a natural product in place of a prescription medicine.'
    ],
    sections: [
      { h: 'Natural items that can help with mild problems', items: [
        'Honey for cough in people aged 1 and over. Never for a baby under 1. See the medicines guide.',
        'Sugar and salt drink for dehydration. See the medicines guide for the amounts and the sources.',
        'Ginger or peppermint tea for an upset stomach. Traditional use. Not confirmed.',
        'Oats, beans, prunes and water for constipation from stored food. Common advice.',
        'Oatmeal bath or a cool cloth for itching. Common advice.',
        'Willow bark for back pain has some evidence. It contains a salicylate. See the medicines guide before use.'
      ] },
      { h: 'Signs you may be short of vitamin C', items: [
        'Tiredness, sore gums that bleed, bruising and slow healing can be signs. Get care if you see them.',
        'Prevent it: eat vitamin C foods every day. A multivitamin helps.'
      ] }
    ],
    tip: ['Buy a multivitamin that includes vitamin C and vitamin D.', 'Store tablets cool, dry and in the original pack.'],
    after: ['Check dates every 6 months.', 'Update your list when someone joins or leaves the household.'],
    sources: [
      ['NIH Office of Dietary Supplements: vitamin C fact sheet for consumers', 'https://ods.od.nih.gov/factsheets/vitaminc-consumer/?print=1'],
      ['NIH Office of Dietary Supplements: vitamin D fact sheet for consumers', 'https://ods.od.nih.gov/factsheets/vitamind-consumer/?print=1'],
      ['Reprinted DRI tables for vitamins (RDA for B12 and iodine)', 'https://pressbooks.pub/nutritionessentials/back-matter/appendix-2-dietary-reference-intake-tables'],
      ['NIH Office of Dietary Supplements: fact sheets (iron, iodine and B12)', 'https://ods.od.nih.gov/factsheets/'],
      ['Cochrane: honey for acute cough in children', 'https://cochranelibrary.com/cdsr/doi/10.1002/14651858.CD007094.pub5/information']
    ],
    unconfirmed: [
      'We did not open these pages. The facts come from search results and summaries.',
      'Vitamin C (90 mg, 75 mg, plus 35 mg for smokers) and vitamin D (15 mcg and 20 mcg, babies 10 mcg) are from the NIH ODS consumer fact sheets seen in search results.',
      'The iron figure for men (8 mg), iodine (150 mcg) and B12 (2.4 mcg) are from a reprinted table, not the NIH page. We did not find the iron figure for women.',
      'The food lists for iron, iodine and B12, and the claim that iodized salt gives iodine, are common knowledge. We did not find a source in our search.',
      'The vitamin C amounts in foods came from one table in a search result. We did not use them. Canning keeps most vitamin C in acid foods such as tomatoes and citrus, per one source.',
      'We did not find how long it takes to get scurvy. We did not give a time.',
      'We found no source for the amount of vitamin D in a can of fish. Sources disagree, so we gave none.',
      'The warnings about iron and children and about overdosing are common safety advice. We did not find a source.',
      'We did not look up dose limits for vitamins. Follow the package label and ask a pharmacist.',
      'The statement that skin makes vitamin D from sunlight is from an archived 2009 NIH page seen in search results. The current page may word it differently.'
    ]
  };

  var fish = {
    id: 'fish-catch-inspect-clean-cook', area: 'Food', icon: 'waves', difficulty: 'Practical', status: 'partly', checkedOn: '28 Oct 2026',
    title: 'Fish from catch to meal: catch, inspect, clean and cook with few or no appliances',
    intro: 'One route from the water to the plate. It covers checking the rules, catching, deciding if a fish is safe to keep, cleaning it, and cooking it over a fire or a camp stove. It links to the guides for making gear and for smoking and drying.',
    first: [
      'Check the fishing rules and the water first.',
      'Keep the fish cold and in the shade from the moment you catch it.',
      'Inspect it before you clean it. If you are unsure, do not eat it.',
      'Use a food thermometer. Cook to 145 F (63 C). Cooking does not remove some toxins.'
    ],
    do: [
      'Rules and water. Check the licence rules and the water before you fish. Portugal: fishing with gear generally needs a DGRM licence. Hand-collecting without tools is an exception. England and Wales: a rod licence from the Environment Agency is needed from age 13 for freshwater fish, and you also need the owner\'s permission. US: each state sets its own rules. Do not fish where there is a closure, a pollution or toxin warning, or sewage. Never use a fish you find dead on the shore.',
      'Spot and gear. Fish near logs, rocks, shade and drop-offs, early or late in the day. Use your kit, or make a hand line and a gorge hook with the making gear guide. Bait with worms, insects or small pieces of fish.',
      'Catch the fish. Hold the line. When you feel a bite, pull gently and steady. Use a net if you have one. Keep your hands away from hooks and spines. Wet your hands before you handle the fish. Measure it. Release any fish that is too small, protected or that you cannot name.',
      'Dispatch and chill. Strike the head once, firmly, just behind the eyes, then cut the gills. Put the fish in the shade, in cold water or under a damp cloth. Clean it within an hour or two. Do not plan to keep raw fish for later without cooling.',
      'Inspect the fish. Use the table. Look at the eyes, gills, skin, flesh, belly and smell. Do not eat large predatory reef fish (examples: barracuda, grouper, amberjack, snapper, shark) because ciguatera toxin is not removed by cooking. Do not eat pufferfish. Keep tuna, mackerel and mahi-mahi cold at once, because histamine from spoiled fish is not destroyed by cooking. Inspection is needed but it does not prove safety.',
      'Scale and open the belly. Wear a cut-resistant glove if you have one. Hold the fish by the tail. Scrape from tail to head with a scaler or the back of a spoon. Place the fish on a stable board. Make a shallow cut from the vent toward the head. Do not cut into the intestines.',
      'Gut, remove the gills and rinse. Lift out the organs and the gills. Do not burst the gall bladder. Rinse the cavity with clean water. Look inside. Reject a fish with a strong bad smell, grey or green flesh, slime that smears, many worms or cysts, or a very soft belly. Wash your hands, board and knife.',
      'Cook in a pot or pan. A food thermometer is the safe way to check. You cannot judge a safe temperature from how long food has been over a fire. Cook until the thickest part reaches 145 F (63 C). Boiling pieces in a covered pot is the safest method. Use a pan with a little oil on a camp stove. Use the stove outdoors only. Without a thermometer, the flesh should be opaque and flake easily with a fork. This is a weaker check.',
      'Cook over a fire. Use a metal grate over embers, not flames, and turn the fish every few minutes. Or wrap it loosely in foil and place it on hot coals. Or lay it on a hot, dry, flat stone. Check the thickest part with a thermometer. Never cook on a stove or grill indoors, in a tent or in a vehicle.',
      'Eat, store and clean up. Eat the same day if you can. Keep leftovers cold and eat within a day or two. For long storage see the smoke, dry and salt guide. Wash the knife, board and hands with soap and safe water. Bury or bin the waste far from camp and water.'
    ],
    table: { head: ['Check', 'Good sign', 'Reject if'], rows: [
      ['Eyes', 'Clear, bright, slightly bulging', 'Cloudy, sunken, dull'],
      ['Gills', 'Red or pink, clean', 'Brown, grey, slimy, strong smell'],
      ['Skin', 'Shiny, tight, covered with clear slime', 'Dull, dry, sores, ulcers, odd colour'],
      ['Flesh', 'Firm. Springs back when pressed.', 'Soft, leaves a dent, falls from the bone'],
      ['Smell', 'Fresh, like water or the sea', 'Sour, ammonia, strong fishy smell'],
      ['Belly', 'Intact, firm', 'Swollen, burst, soft'],
      ['Inside', 'Clean organs, no cysts', 'Many worms or cysts, green or black organs']
    ] },
    warn: [
      'Ciguatera toxin and histamine from spoiled fish are NOT destroyed by cooking or freezing. Inspection and keeping fish cold are the only protection.',
      'Do not eat raw wild fish. Freshwater fish can carry parasites. Cook it fully.',
      'Do not eat fish from polluted water, from a closure, or during a red tide warning.',
      'If you get tingling, flushing, hot-cold reversal, a headache, cramps or vomiting after fish, get medical care. Call 911 in the US or 112 in Portugal if breathing is hard.',
      'Never cook on a stove or grill indoors. Carbon monoxide kills. See the carbon monoxide guide.',
      'Wash your hands after you touch raw fish.'
    ],
    sections: [
      { h: 'Keeping fish for later, with no fridge', items: [
        'Hot-smoked fish should reach at least 160 F (71 C) inside and stay there for about 30 minutes, per the Alaska and Oregon extension notes we found.',
        'Light salt and smoke alone do not preserve fish. Refrigerate it. For long storage, freeze or can it.',
        'Plan to eat or preserve a catch the same day. See the smoke, dry and salt guide for steps.'
      ] },
      { h: 'Make the most of a small catch', items: [
        'Boil the bones and head for broth. Strain it.',
        'Eat the fish with rice, oats or potatoes to make a meal.',
        'Do not eat the liver or roe of a fish you cannot identify.'
      ] }
    ],
    tip: ['Carry a small knife, a cloth and a pot lid or can for cooking.', 'A cheap kitchen thermometer shows 145 F.'],
    after: ['Wash and dry your gear.', 'Note where you caught what, and any closures.'],
    sources: [
      ['CDC MMWR: scombroid (histamine) fish poisoning. Heat-stable, keep fish cold.', 'https://www.cdc.gov/mmwr/preview/mmwrhtml/00000723.htm'],
      ['CDC MMWR: ciguatera fish poisoning, large predatory reef fish', 'https://www.cdc.gov/mmwr/preview/mmwrhtml/mm5811a3.htm'],
      ['University of Alaska Fairbanks Extension: smoking fish at home', 'https://www.uaf.edu/ces/publications/database/food/smoking-fish.php'],
      ['Oregon State Extension (archived): smoking fish, 160 F for 30 minutes', 'https://webarchive.library.unt.edu/web/20090116024610/http://extension.oregonstate.edu/catalog/pdf/pnw/pnw238.pdf'],
      ['DGRM Portugal: licensing of recreational fishing', 'https://dgrm.pt/en/pesca-pl-licenciamento'],
      ['Canal and River Trust: fishing FAQs, licences in England and Wales', 'https://canalrivertrust.org.uk/enjoy-the-waterways/fishing/fishing-faqs'],
      ['GOV.UK fishing licences (archived copy)', 'https://tnaqa.mirrorweb.com/ukgwa/20260715155243mp_/https://www.gov.uk/fishing-licences/print'],
      ['USDA FSIS: when fishing, how do I keep my catch safe to eat? (cited to us, not checked)', 'https://ask.fsis.usda.gov/article/When-fishing-how-do-I-keep-my-catch-safe-to-eat'],
      ['FDA: selecting and serving fresh and frozen seafood safely (cited to us, not checked)', 'https://www.fda.gov/food/buy-store-serve-safe-food/selecting-and-serving-fresh-and-frozen-seafood-safely'],
      ['CDC: preventing parasites from freshwater fish', 'https://www.cdc.gov/parasites/clonorchis/prevent.html']
    ],
    unconfirmed: [
      'We did not open these pages. The facts come from search results and summaries.',
      'The CDC text we found says histamine and ciguatera toxins are not destroyed by cooking. For histamine it says keep fish at 0 C (32 F) or below. For ciguatera it names barracuda, grouper, amberjack, snapper and shark as examples.',
      'The 145 F (63 C) cooking temperature came from the CDC page seen in the clean and cook guide. We did not find a separate FDA page for it in this search.',
      'The signs of fresh fish (clear eyes, red gills, firm flesh, fresh smell) are common knowledge. We did not find a source in our search.',
      'We found nothing in our search on pufferfish toxin or on parasites in the cooked fish. The advice not to eat pufferfish is general.',
      'The no-appliance cooking methods (green stick, foil on coals, hot flat stone, boiling in a pot or can, boil about 10 minutes) are common outdoor practice. We did not find an official source for them.',
      'We did not find the Portugal licence rules for handlines, gill nets or traps. Check the current rules with DGRM. We found no US state rules in this search.',
      'England and Wales: the rod licence from age 13 is from search results. Sources differ on the junior age limit. We found nothing on sea fishing in England and nothing on Scotland, Northern Ireland or the Border Esk beyond a small note. Check GOV.UK.',
      'The thermometer-first rule and the USDA and FDA pages are from the illustrated survival food PDF you gave us. We did not open those pages.',
      'The method of striking the head and cutting the gills, and keeping fish in wet cloth and shade, is common practice. We did not find a source.',
      'The smoking notes (160 F for 30 minutes, light salt does not preserve, freeze or can for long storage) are from the extension pages seen in search results. We did not open them.',
      'Leftover cooked fish keeping 1 to 2 days is general guidance.',
      'The advice not to eat the liver or roe of a fish you cannot identify is general caution. We did not find a source.'
    ]
  };

  if (window.LOAD_CORE && window.LOAD_CORE.guides) {
    [vit, fish].forEach(function (g) { g.source = g.sources[0][1]; window.LOAD_CORE.guides.push(g); });
  }
  window.LOAD_TRACK = { items: ITEMS, gear: GEAR, retail: RETAIL, periods: PERIODS, cur: CUR, blank: blank, compute: compute, csv: csv, dogCalc: dogCalc, dogGrams: dogGrams };
  if (typeof module !== 'undefined') module.exports = window.LOAD_TRACK;
})();
