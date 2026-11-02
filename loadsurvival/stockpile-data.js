/* Stockpile planner: what to store per person for 3 days up to 10 years, for the US and for Portugal.
   Written 28 Oct 2026. The method: about 2,000 kcal per person per day, 1 gallon (3.8 L) of water per person per day
   (stored for up to 14 days, treated after that). Official sources only cover 3 days to 2 weeks. The longer amounts follow the
   widely used long-term storage pattern (grains, beans, sugar, oil, milk, salt) and are the planner's own estimate.
   Rate arrays are grams (or ml) per person per day for [short, medium, long] plans:
   short = 3 days and 1 week, medium = 1, 3 and 6 months, long = 1 year and more. 0 means not used in that plan. */
(function () {
  var D = { shortMax: 7, longMin: 365 };
  /* item fields: id, cat, en, pt, kcal (per 100 g as stored), r [S,M,L], shelf (years, ordinary packaging),
     lt (years with oxygen absorbers or sealed tin, optional), fav (a favourite), cook (needs fire and water),
     us / pt overrides: {n: name, g: pack grams, u: unit word, p: unit word plural}, nous / nopt (not for that country), note */
  var ITEMS = [
    /* ---- ready to eat favourites ---- */
    { id: 'fruit', cat: 'Ready to eat', en: 'Canned fruit (peaches, pears, pineapple, fruit cocktail, mandarins)', pt: 'Fruta em calda (pêssego, ananás, pêra, salada de fruta)', kcal: 60, r: [200, 100, 70], shelf: 1.5, fav: 1, us: { g: 425, u: 'can (15 oz)', p: 'cans (15 oz)' }, ptk: { g: 425, u: 'can', p: 'cans' }, note: 'High-acid cans keep about 12 to 18 months. Choose juice or light syrup.' },
    { id: 'tuna', cat: 'Ready to eat', en: 'Canned tuna', pt: 'Atum em conserva', kcal: 150, r: [60, 35, 20], shelf: 4, fav: 1, us: { g: 142, u: 'can (5 oz)', p: 'cans (5 oz)' }, ptk: { g: 120, u: 'can', p: 'cans' }, note: 'Low-acid cans keep about 2 to 5 years.' },
    { id: 'sardine', cat: 'Ready to eat', en: 'Canned sardines or mackerel', pt: 'Sardinhas ou cavala em conserva', kcal: 200, r: [60, 30, 15], shelf: 4, fav: 1, us: { g: 106, u: 'can (3.75 oz)', p: 'cans (3.75 oz)' }, ptk: { g: 125, u: 'can', p: 'cans' }, note: 'Rich in fat and protein.', ptnote: 'Rich in fat and protein. Very popular and easy to find in Portugal.' },
    { id: 'salmon', cat: 'Ready to eat', en: 'Canned salmon', pt: 'Salmão em conserva', kcal: 180, r: [0, 15, 10], shelf: 4, fav: 1, us: { g: 170, u: 'can (6 oz)', p: 'cans (6 oz)' }, ptk: { g: 170, u: 'can', p: 'cans' } },
    { id: 'meat', cat: 'Ready to eat', en: 'Canned chicken, ham or corned beef', pt: 'Carne em lata (frango, fiambre, salsichas)', kcal: 200, r: [40, 20, 10], shelf: 4, us: { g: 340, u: 'can (12 oz)', p: 'cans (12 oz)' }, ptk: { g: 200, u: 'can', p: 'cans' }, ptnote: 'Canned meat is less common in Portugal. Look for ham or sausages in tins.' },
    { id: 'beanscan', cat: 'Ready to eat', en: 'Canned beans and chickpeas', pt: 'Feijão e grão-de-bico em lata', kcal: 90, r: [120, 50, 30], shelf: 3, us: { g: 425, u: 'can (15 oz)', p: 'cans (15 oz)' }, ptk: { g: 425, u: 'can', p: 'cans' } },
    { id: 'vegcan', cat: 'Ready to eat', en: 'Canned vegetables (corn, peas, green beans, carrots, tomatoes)', pt: 'Legumes em lata (milho, ervilhas, feijão-verde, cenoura, tomate)', kcal: 40, r: [120, 90, 60], shelf: 3, us: { g: 425, u: 'can (15 oz)', p: 'cans (15 oz)' }, ptk: { g: 400, u: 'can', p: 'cans' }, note: 'Tomatoes are high-acid and keep about 18 months.' },
    { id: 'soup', cat: 'Ready to eat', en: 'Canned soup, stew or ready meal', pt: 'Sopa, guisado ou refeição pronta em lata', kcal: 80, r: [200, 60, 0], shelf: 2, us: { g: 400, u: 'can (14 oz)', p: 'cans (14 oz)' }, ptk: { g: 400, u: 'can', p: 'cans' }, note: 'Good for the first days because it needs no cooking.' },
    { id: 'crackers', cat: 'Ready to eat', en: 'Crackers (saltines, whole grain, water crackers)', pt: 'Bolachas (água e sal, integrais, Maria) e tostas', kcal: 430, r: [80, 30, 15], shelf: 0.7, lt: 2, fav: 1, us: { g: 454, u: 'box (16 oz)', p: 'boxes (16 oz)' }, ptk: { g: 200, u: 'pack', p: 'packs' }, note: 'Saltines keep about 8 months. They go stale, so keep them sealed and rotate.' },
    { id: 'pb', cat: 'Ready to eat', en: 'Peanut butter or nut butter', pt: 'Manteiga de amendoim ou de frutos secos', kcal: 590, r: [40, 15, 10], shelf: 1.5, fav: 1, us: { g: 454, u: 'jar (16 oz)', p: 'jars (16 oz)' }, ptk: { g: 350, u: 'jar', p: 'jars' } },
    { id: 'nuts', cat: 'Ready to eat', en: 'Nuts and seeds (almonds, walnuts, peanuts)', pt: 'Frutos secos (amêndoa, noz, amendoim, castanha)', kcal: 600, r: [30, 15, 8], shelf: 0.75, lt: 2, fav: 1, us: { g: 300, u: 'bag (10 oz)', p: 'bags (10 oz)' }, ptk: { g: 300, u: 'bag', p: 'bags' }, note: 'Oils go off. Keep cool and dark.' },
    { id: 'dried', cat: 'Ready to eat', en: 'Dried fruit (raisins, apricots, figs, prunes)', pt: 'Fruta seca (passas, alperces, figos, ameixas)', kcal: 290, r: [40, 20, 10], shelf: 1, lt: 2, fav: 1, us: { g: 300, u: 'bag (10 oz)', p: 'bags (10 oz)' }, ptk: { g: 250, u: 'bag', p: 'bags' } },
    { id: 'bars', cat: 'Ready to eat', en: 'Granola and energy bars', pt: 'Barras de cereais e energéticas', kcal: 420, r: [30, 0, 0], shelf: 1, us: { g: 250, u: 'box', p: 'boxes' }, ptk: { g: 250, u: 'box', p: 'boxes' } },
    { id: 'cereal', cat: 'Ready to eat', en: 'Ready-to-eat cereal or muesli', pt: 'Cereais de pequeno-almoço ou muesli', kcal: 380, r: [40, 15, 0], shelf: 1, us: { g: 500, u: 'box', p: 'boxes' }, ptk: { g: 500, u: 'box', p: 'boxes' } },
    { id: 'jerky', cat: 'Ready to eat', en: 'Jerky or dried meat', pt: '', kcal: 410, r: [20, 8, 0], shelf: 1, nopt: 1, us: { g: 90, u: 'bag (3 oz)', p: 'bags (3 oz)' } },
    { id: 'uht', cat: 'Ready to eat', en: 'Shelf-stable milk (UHT) or plant milk', pt: 'Leite UHT (ou bebida vegetal)', kcal: 47, r: [250, 120, 0], shelf: 0.75, fav: 1, us: { g: 946, u: 'carton (1 qt)', p: 'cartons (1 qt)' }, ptk: { g: 1000, u: 'carton (1 L)', p: 'cartons (1 L)' }, note: 'Sources give 6 months to 1 year unopened. Check the date on the pack.' },
    /* ---- dry staples ---- */
    { id: 'rice', cat: 'Dry staples', en: 'White rice', pt: 'Arroz (agulha ou carolino)', kcal: 360, r: [0, 80, 110], shelf: 2, lt: 25, cook: 1, us: { g: 2268, u: 'bag (5 lb)', p: 'bags (5 lb)' }, ptk: { g: 1000, u: 'pack (1 kg)', p: 'packs (1 kg)' }, note: 'About 2 years in the shop pack. 25 years or more in sealed cans or buckets with oxygen absorbers.' },
    { id: 'pasta', cat: 'Dry staples', en: 'Dry pasta', pt: 'Massa seca (esparguete, macarrão)', kcal: 360, r: [0, 45, 35], shelf: 2, lt: 8, cook: 1, us: { g: 454, u: 'box (1 lb)', p: 'boxes (1 lb)' }, ptk: { g: 500, u: 'pack (500 g)', p: 'packs (500 g)' } },
    { id: 'wheat', cat: 'Dry staples', en: 'Wheat berries or flour', pt: 'Trigo em grão ou farinha de trigo', kcal: 340, r: [0, 35, 85], shelf: 1, lt: 25, cook: 1, us: { g: 2268, u: 'bag (5 lb)', p: 'bags (5 lb)' }, ptk: { g: 1000, u: 'pack (1 kg)', p: 'packs (1 kg)' }, note: 'Flour keeps about a year. Wheat berries keep far longer. A hand mill is needed for berries.' },
    { id: 'oats', cat: 'Dry staples', en: 'Rolled oats', pt: 'Flocos de aveia', kcal: 380, r: [0, 30, 30], shelf: 2, lt: 20, cook: 1, us: { g: 1190, u: 'tub (42 oz)', p: 'tubs (42 oz)' }, ptk: { g: 500, u: 'pack (500 g)', p: 'packs (500 g)' } },
    { id: 'beans', cat: 'Dry staples', en: 'Dry beans, lentils and chickpeas', pt: 'Feijão, lentilhas e grão-de-bico secos', kcal: 340, r: [0, 45, 50], shelf: 3, lt: 20, cook: 1, us: { g: 907, u: 'bag (2 lb)', p: 'bags (2 lb)' }, ptk: { g: 500, u: 'pack (500 g)', p: 'packs (500 g)' }, note: 'Need soaking and a lot of fuel and water. Lentils cook faster.' },
    { id: 'cod', cat: 'Dry staples', en: 'Dried salted cod (sold as bacalhau)', pt: 'Bacalhau seco e salgado', kcal: 290, r: [0, 25, 20], shelf: 1, cook: 1, nous: 1, ptk: { g: 1000, u: 'piece (1 kg)', p: 'pieces (1 kg)' }, note: 'Soak 24 to 48 hours in changed water before cooking. Keep dry and cool. Portugal only.' },
    { id: 'pmilk', cat: 'Dry staples', en: 'Powdered milk (nonfat dry)', pt: 'Leite em pó', kcal: 360, r: [0, 15, 25], shelf: 2, lt: 20, us: { g: 454, u: 'box (16 oz)', p: 'boxes (16 oz)' }, ptk: { g: 400, u: 'tin (400 g)', p: 'tins (400 g)' } },
    { id: 'eggs', cat: 'Dry staples', en: 'Powdered eggs', pt: 'Ovo em pó', ptnote: 'Hard to find in Portugal. Order online.', kcal: 590, r: [0, 0, 8], shelf: 2, lt: 10, us: { g: 400, u: 'can', p: 'cans' }, ptk: { g: 400, u: 'can', p: 'cans' } },
    { id: 'freeze', cat: 'Dry staples', en: 'Freeze-dried meals or meats (optional)', pt: 'Refeições liofilizadas', ptnote: 'Costly. Optional. Order online in Portugal. Needs hot water.', kcal: 400, r: [0, 0, 10], shelf: 1, lt: 20, cook: 1, us: { g: 700, u: '#10 can', p: '#10 cans' }, ptk: { g: 700, u: 'large can', p: 'large cans' }, note: 'Costly. Optional. Needs hot water.' },
    /* ---- fats, sugar, seasoning ---- */
    { id: 'oil', cat: 'Fats, sugar, salt', en: 'Cooking oil (olive or vegetable)', pt: 'Azeite ou óleo', kcal: 880, r: [8, 18, 22], shelf: 1, lt: 2, us: { g: 872, u: 'bottle (1 qt)', p: 'bottles (1 qt)' }, ptk: { g: 690, u: 'bottle (750 ml)', p: 'bottles (750 ml)' }, note: 'Sources say 6 months to 2 years. Keep cool, dark and sealed.' },
    { id: 'sugar', cat: 'Fats, sugar, salt', en: 'Sugar', pt: 'Açúcar', kcal: 390, r: [0, 20, 25], shelf: 20, lt: 30, us: { g: 2268, u: 'bag (5 lb)', p: 'bags (5 lb)' }, ptk: { g: 1000, u: 'pack (1 kg)', p: 'packs (1 kg)' }, note: 'Keeps for decades if kept dry.' },
    { id: 'honey', cat: 'Fats, sugar, salt', en: 'Honey', pt: 'Mel', kcal: 300, r: [0, 6, 8], shelf: 10, us: { g: 340, u: 'jar (12 oz)', p: 'jars (12 oz)' }, ptk: { g: 500, u: 'jar (500 g)', p: 'jars (500 g)' }, note: 'We found no reliable figure for honey. It keeps a very long time in a sealed jar.' },
    { id: 'jam', cat: 'Fats, sugar, salt', en: 'Jam or marmalade', pt: 'Doce, compota ou marmelada', kcal: 250, r: [20, 10, 5], shelf: 2, us: { g: 340, u: 'jar (12 oz)', p: 'jars (12 oz)' }, ptk: { g: 340, u: 'jar', p: 'jars' } },
    { id: 'salt', cat: 'Fats, sugar, salt', en: 'Salt (iodized)', pt: 'Sal (iodado)', kcal: 0, r: [2, 8, 10], shelf: 30, us: { g: 737, u: 'box (26 oz)', p: 'boxes (26 oz)' }, ptk: { g: 1000, u: 'pack (1 kg)', p: 'packs (1 kg)' } },
    { id: 'spice', cat: 'Fats, sugar, salt', en: 'Spices and bouillon cubes', pt: 'Especiarias e cubos de caldo', kcal: 0, r: [1, 4, 5], shelf: 2, us: { g: 100, u: 'pack', p: 'packs' }, ptk: { g: 100, u: 'pack', p: 'packs' } },
    { id: 'baking', cat: 'Fats, sugar, salt', en: 'Baking soda, baking powder and yeast', pt: 'Bicarbonato, fermento em pó e levedura', kcal: 0, r: [0, 1, 2], shelf: 2, us: { g: 200, u: 'pack', p: 'packs' }, ptk: { g: 200, u: 'pack', p: 'packs' } },
    /* ---- comfort ---- */
    { id: 'choc', cat: 'Comfort and morale', en: 'Chocolate and candy', pt: 'Chocolate e doces', kcal: 540, r: [15, 8, 5], shelf: 1, fav: 1, us: { g: 100, u: 'bar', p: 'bars' }, ptk: { g: 100, u: 'bar', p: 'bars' }, note: 'A small treat helps morale, especially for children.' },
    { id: 'coffee', cat: 'Comfort and morale', en: 'Coffee (instant or ground)', pt: 'Café (solúvel ou moído)', kcal: 0, r: [10, 10, 8], shelf: 1, lt: 3, fav: 1, us: { g: 250, u: 'tin', p: 'tins' }, ptk: { g: 250, u: 'pack (250 g)', p: 'packs (250 g)' } },
    { id: 'tea', cat: 'Comfort and morale', en: 'Tea', pt: 'Chá', kcal: 0, r: [3, 3, 3], shelf: 2, us: { g: 50, u: 'box (25 bags)', p: 'boxes (25 bags)' }, ptk: { g: 50, u: 'box (25 bags)', p: 'boxes (25 bags)' } }
  ];
  /* non-food items: per = 'pm' (per person per month), 'pp' (per person, once), 'hh' (per household, fixed), 'n5' (one per 5 people, rounded up), 'pd' (per person per day), note */
  var NONFOOD = [
    { id: 'tp', cat: 'Hygiene', en: 'Toilet paper', pt: 'Papel higiénico', per: 'pm', q: 4, u: 'roll', p: 'rolls', note: 'Planner estimate: about 1 roll per person per week.' },
    { id: 'soap', cat: 'Hygiene', en: 'Bar soap or hand soap', pt: 'Sabonete', per: 'pm', q: 0.5, u: 'bar', p: 'bars', note: 'Planner estimate.' },
    { id: 'tooth', cat: 'Hygiene', en: 'Toothpaste', pt: 'Pasta de dentes', per: 'pm', q: 0.5, u: 'tube', p: 'tubes' },
    { id: 'brush', cat: 'Hygiene', en: 'Toothbrush', pt: 'Escova de dentes', per: 'pm', q: 0.33, u: 'brush', p: 'brushes', note: 'One every 3 months.' },
    { id: 'wipes', cat: 'Hygiene', en: 'Wet wipes', pt: 'Toalhetes', per: 'pm', q: 1, u: 'pack', p: 'packs' },
    { id: 'fem', cat: 'Hygiene', en: 'Pads or tampons (for ONE person who uses them)', pt: 'Pensos ou tampões (para UMA pessoa que os usa)', per: 'pm1', q: 20, u: 'item', p: 'items', note: 'Multiply by the number of people who need them. Planner estimate: about 20 a month each.' },
    { id: 'diaper', cat: 'Hygiene', en: 'Diapers (for ONE baby)', pt: 'Fraldas (para UM bebé)', per: 'pm1', q: 240, u: 'diaper', p: 'diapers', note: 'Multiply by the number of babies. About 8 a day. Planner estimate. Ask a doctor about formula and baby food.' },
    { id: 'detergent', cat: 'Cleaning', en: 'Laundry and dish soap', pt: 'Detergente da roupa e da loiça', per: 'pm', q: 0.5, u: 'litre', p: 'litres', note: 'Planner estimate.' },
    { id: 'bags', cat: 'Cleaning', en: 'Trash bags', pt: 'Sacos do lixo', per: 'pm', q: 10, u: 'bag', p: 'bags' },
    { id: 'bleach', cat: 'Cleaning', en: 'Plain unscented household bleach (for water and cleaning)', pt: 'Lixívia simples, sem perfume (para a água e a limpeza)', per: 'bleach', u: 'litre', p: 'litres', note: 'Water: 8 drops per gallon (2 per litre). Bleach loses strength. Replace each year.' },
    { id: 'fuel', cat: 'Cooking and light', en: 'Camp stove gas (butane or propane canisters)', pt: 'Gás para o fogão de campismo (cartuchos)', per: 'pw', q: 1, u: 'canister (230 g)', p: 'canisters (230 g)', note: 'Planner estimate: 1 per person per week if you cook. The more beans and rice, the more gas.' },
    { id: 'lighter', cat: 'Cooking and light', en: 'Lighters or matches', pt: 'Isqueiros ou fósforos', per: 'hh2', q: 1, u: 'item', p: 'items', note: 'One per 2 people, and a few more.' },
    { id: 'batt', cat: 'Cooking and light', en: 'AA batteries', pt: 'Pilhas AA', per: 'pm', q: 2, u: 'battery', p: 'batteries', note: 'Planner estimate. Use rechargeable plus a solar charger for long plans.' },
    { id: 'torch', cat: 'Cooking and light', en: 'Flashlight or headlamp', pt: 'Lanterna ou frontal', per: 'pp', q: 1, u: 'light', p: 'lights', note: 'One per person.' },
    { id: 'blanket', cat: 'Gear', en: 'Blanket or sleeping bag', pt: 'Cobertor ou saco-cama', per: 'pp', q: 1, u: 'blanket', p: 'blankets', note: 'One per person.' },
    { id: 'opener', cat: 'Gear', en: 'Manual can opener', pt: 'Abre-latas manual', per: 'hh', q: 2, u: 'opener', p: 'openers', note: 'Buy two. They break.' },
    { id: 'stove', cat: 'Gear', en: 'Camp stove', pt: 'Fogão de campismo', per: 'n5', q: 1, u: 'stove', p: 'stoves', note: 'One per 5 people. Use outdoors only.' },
    { id: 'filter', cat: 'Gear', en: 'Water filter or purifier', pt: 'Filtro ou purificador de água', per: 'n10', q: 1, u: 'filter', p: 'filters', note: 'One per 10 people. Spare cartridges for long plans.' },
    { id: 'radio', cat: 'Gear', en: 'Battery, solar or crank radio', pt: 'Rádio a pilhas, solar ou de manivela', per: 'hh', q: 1, u: 'radio', p: 'radios' },
    { id: 'firstaid', cat: 'Gear', en: 'First-aid kit', pt: 'Estojo de primeiros socorros', per: 'n5', q: 1, u: 'kit', p: 'kits', note: 'One per 5 people. See the first-aid kit guide.' },
    { id: 'ext', cat: 'Gear', en: 'Fire extinguisher and carbon monoxide alarm', pt: 'Extintor e alarme de monóxido de carbono', per: 'hh', q: 2, u: 'item', p: 'items' }
  ];

  /* Medicines: a THEORETICAL planning amount for adults, per person per year, for common over-the-counter items.
     These are planner estimates of how many doses a person might use in a year, not doctor advice. Always follow the package label. */
  var MEDS = [
    { id: 'para', en: 'Pain and fever tablets: paracetamol (acetaminophen) 500 mg', u: 'tablet', p: 'tablets', y: 100, pack: 100, note: 'About 4 illnesses a year, 3 days each. Follow the label for how many and how often.' },
    { id: 'ibu', en: 'Pain and swelling tablets: ibuprofen 200 mg', u: 'tablet', p: 'tablets', y: 100, pack: 100, note: 'Take with food. Not for people with stomach ulcers or kidney disease, or late in pregnancy. Ask a pharmacist.' },
    { id: 'ors', en: 'Oral rehydration salts (sachets)', u: 'sachet', p: 'sachets', y: 12, pack: 10, note: 'About 2 stomach illnesses a year, 3 days each. You can also make the sugar and salt drink in the natural alternatives guide.' },
    { id: 'lop', en: 'Anti-diarrhoea capsules: loperamide 2 mg', u: 'capsule', p: 'capsules', y: 16, pack: 12, note: 'Not for bloody diarrhoea, fever or children. Use rehydration first.' },
    { id: 'anti', en: 'Allergy tablets: loratadine or cetirizine 10 mg', u: 'tablet', p: 'tablets', y: 60, pack: 30, note: 'About 2 months of allergy season a year.' },
    { id: 'acid', en: 'Antacid chewable tablets', u: 'tablet', p: 'tablets', y: 60, pack: 36 },
    { id: 'hydro', en: 'Hydrocortisone 1 percent cream for itching and rashes (30 g tube)', u: 'tube', p: 'tubes', y: 0.5, pack: 1 },
    { id: 'oint', en: 'Antibiotic ointment for small cuts (30 g tube)', u: 'tube', p: 'tubes', y: 0.5, pack: 1 },
    { id: 'saline', en: 'Sterile saline for eyes and wounds (250 ml bottle)', u: 'bottle', p: 'bottles', y: 2, pack: 1 },
    { id: 'multi', en: 'Multivitamin with vitamin C (one a day)', u: 'tablet', p: 'tablets', y: 365, pack: 100, minDays: 90, note: 'Only for plans of 3 months or more, when fresh fruit and vegetables run low. Planner estimate.' }
  ];
  function medsPlan(adults, days, rx) {
    var years = days / 365, out = [];
    MEDS.forEach(function (m) {
      if (m.minDays && days < m.minDays) return;
      var q = Math.ceil(m.y * adults * (days < 30 ? days / 365 * 3 : years) - 1e-9);
      q = Math.max(q, m.y < 1 ? 1 : Math.min(m.pack, Math.ceil(m.y)));
      out.push({ id: m.id, name: m.en, q: q, unit: q === 1 ? m.u : m.p, packs: Math.ceil(q / m.pack), note: m.note || '' });
    });
    var rxq = rx > 0 ? Math.ceil(rx * days * 1.15 - 1e-9) : 0;
    return { items: out, rx: rx, rxTotal: rxq, rxPerYear: rx > 0 ? Math.ceil(rx * 365 * 1.15 - 1e-9) : 0 };
  }
  var PERIODS = [
    { id: '3d', label: '3 days', days: 3 },
    { id: '1w', label: '1 week', days: 7 },
    { id: '1m', label: '1 month', days: 30 },
    { id: '3m', label: '3 months', days: 90 },
    { id: '6m', label: '6 months', days: 180 },
    { id: '1y', label: '1 year', days: 365 },
    { id: '3y', label: '3 years', days: 1095 },
    { id: '5y', label: '5 years', days: 1825 },
    { id: '10y', label: '10 years', days: 3650 }
  ];
  var SIZES = [2, 4, 6, 10, 15, 20];
  var WATER_L = 3.785, WATER_CAP_DAYS = 14;
  function band(days) { return days <= D.shortMax ? 0 : days >= D.longMin ? 2 : 1; }
  function ceil(x) { return Math.ceil(x - 1e-9); }
  /* opt: {lt: use long-term packaging, kids: number of children under 10 (eat about 60 percent)} */
  var DIETS = { veg: ['tuna', 'sardine', 'salmon', 'meat', 'jerky', 'cod', 'freeze'], pesc: ['meat', 'jerky', 'freeze'], vegan: ['tuna', 'sardine', 'salmon', 'meat', 'jerky', 'cod', 'freeze', 'pmilk', 'eggs'], gf: ['pasta', 'wheat', 'oats', 'crackers', 'cereal', 'bars', 'spice'], nf: ['pb', 'nuts', 'bars'] };
  function compute(country, people, days, opt) {
    opt = opt || {}; var skipIds = DIETS[opt.diet] || []; var b = band(days), us = country === 'us', uk = country === 'uk', lt = opt.lt !== false && days >= 365;
    var kids = Math.min(opt.kids || 0, people), eaters = people - kids + kids * 0.6;
    var food = [], kcal = 0, grams = 0;
    ITEMS.forEach(function (it) {
      if (((us || uk) && it.nous) || (!us && it.nopt)) return;
      if (skipIds.indexOf(it.id) >= 0) return;
      var r = it.r[b]; if (!r) return;
      var pk = (us ? it.us : it.ptk) || it.us || it.ptk || { g: 500, u: 'pack', p: 'packs' };
      var shelf = lt && it.lt ? it.lt : it.shelf, total = r * eaters * days, perYear = r * eaters * 365;
      var keep = total, cap = '', years = 0;
      if (days / 365 > shelf) { years = shelf; if (!opt.full) keep = Math.min(total, perYear * shelf); }
      var packs = ceil(keep / pk.g);
      kcal += r * (it.kcal / 100); grams += keep;
      food.push({ id: it.id, cat: it.cat, name: it.en, alt: '', fav: !!it.fav, cook: !!it.cook,
        total: total, keep: keep, packs: packs, unit: packs === 1 ? pk.u : pk.p, rotate: years, perDay: r, note: ((us || uk) ? it.note : (it.ptnote || it.note)) || '', shelf: shelf });
    });
    var perDayKcal = 0; ITEMS.forEach(function (it) { if (((us || uk) && it.nous) || (!us && it.nopt)) return; if (skipIds.indexOf(it.id) >= 0) return; if (it.r[b]) perDayKcal += it.r[b] * it.kcal / 100; });
    /* water */
    var storeDays = Math.min(days, WATER_CAP_DAYS), litres = people * storeDays * WATER_L, gallons = people * storeDays;
    var totalGal = people * days;
    var water = { storeDays: storeDays, litres: litres, gallons: gallons, totalGal: totalGal, treatDays: Math.max(0, days - storeDays) };
    /* non-food */
    var nf = [];
    NONFOOD.forEach(function (it) {
      var q = 0, months = Math.min(days / 30, 12);
      if (it.per === 'pm') q = it.q * people * months;
      else if (it.per === 'pm1') q = it.q * months;
      else if (it.per === 'pp') q = it.q * people;
      else if (it.per === 'hh') q = it.q;
      else if (it.per === 'hh2') q = Math.max(4, ceil(people / 2) + 2);
      else if (it.per === 'n5') q = ceil(people / 5);
      else if (it.per === 'n10') q = ceil(people / 10);
      else if (it.per === 'pw') q = it.q * people * (Math.min(days, 365) / 7) * 0.6;
      else if (it.per === 'bleach') q = Math.max(0.5, Math.min(totalGal, people * 365) * 0.4 / 1000 + people * Math.min(days, 365) * 0.002);
      q = it.per === 'bleach' ? Math.round(q * 10) / 10 : ceil(q);
      if (days < 7 && (it.id === 'fuel' || it.id === 'detergent')) q = Math.max(1, q);
      nf.push({ id: it.id, cat: it.cat, name: it.en, alt: '', q: q, unit: q === 1 ? it.u : it.p, note: it.note || '' });
    });
    return { diet: opt.diet || '', skipped: ITEMS.filter(function (it) { return skipIds.indexOf(it.id) >= 0; }).map(function (it) { return it.en; }), country: country, people: people, days: days, band: b, full: !!opt.full, food: food, water: water, nonfood: nf, perDayKcal: perDayKcal, grams: grams, eaters: eaters, longPack: lt };
  }
  function fmtMass(g, us) {
    if (us) { var lb = g / 453.592; if (lb >= 2000) return (Math.round(lb / 200) / 10) + ' tons'; return lb >= 2 ? (Math.round(lb * 10) / 10) + ' lb' : (Math.round(g / 28.3495)) + ' oz'; }
    return g >= 1000000 ? (Math.round(g / 100000) / 10) + ' tonnes' : g >= 1000 ? (Math.round(g / 100) / 10) + ' kg' : Math.round(g) + ' g';
  }

  /* guide that explains the planner */
  var guide = {
    id: 'stockpile-basics', area: 'Essentials', icon: 'can', difficulty: 'Practical', status: 'partly', checkedOn: '28 Oct 2026',
    title: 'Stockpile basics: how much to store, how long it keeps, and where the numbers come from',
    intro: 'Open Tools, then Stockpile planner, to get a full list for the US or Portugal, for 2 to 20 people, from 3 days to 10 years. This guide explains the method and what we could not confirm.',
    first: [
      'Start with 3 days, then 2 weeks, then a month. Add more over time.',
      'Store what your family will really eat. Include your favourites.',
      'Eat the oldest first and replace it. Write the date on every item.',
      'Keep 1 gallon (3.8 L) of water per person per day.'
    ],
    do: [
      'Open Tools, then Stockpile planner. Pick your country, the number of people and how long.',
      'Read the Water part first. Official advice is to store 1 gallon per person per day. We store up to 14 days of water. After that, plan a filter, plain unscented bleach or boiling.',
      'Buy the ready-to-eat foods first: canned fruit, canned fish, crackers, peanut butter, nuts, dried fruit, beans, soup. They need no cooking.',
      'Add dry staples next: rice, pasta, flour or wheat, oats, beans, with oil, sugar, salt and powdered milk. They need fire, water and time.',
      'For 1 year or more, pack dry staples in sealed cans or food buckets with oxygen absorbers. Keep them cool, dark and dry.',
      'Rotate canned goods and crackers. Cans with fruit and tomatoes keep about 12 to 18 months. Cans of fish, beans and meat keep about 2 to 5 years. Crackers keep months.',
      'Check every can. Do not use a can that is bulging, dented badly, leaking or rusty. After opening, use fish within a day or two.',
      'Add the non-food list: toilet paper, soap, toothpaste, bags, bleach, stove gas, batteries, lights, first aid, a manual can opener.',
      'Add what only you need: medicines (ask for a larger supply), baby food and formula, diapers, pet food, special diets, glasses.',
      'Do a shopping check every 6 months. Use the oldest items in your meals and buy new ones.'
    ],
    table: { head: ['Time', 'What it is for'], rows: [
      ['3 days', 'Official starting kit (US Ready.gov, Portugal and the EU: at least 72 hours). Ready-to-eat food.'],
      ['1 to 2 weeks', 'Storms, power cuts, floods. Official advice for water is up to 2 weeks.'],
      ['1 to 6 months', 'Job loss, long outages, shortages. Add dry staples and fuel.'],
      ['1 year or more', 'Our estimate from the common long-term pattern: grains, beans, sugar, oil, milk, salt in sealed packs.'],
      ['5 to 10 years', 'Rotate shelf-limited foods. Keep long-life staples in sealed packs. Review every year.']
    ] },
    warn: [
      'The planner is a guide. Check allergies and health needs. Ask a doctor about babies, pregnancy and illness.',
      'Do not store food where it gets hot or wet. Rodents and damp ruin it.',
      'The medicine amounts in the planner are theoretical. Read the package label, ask a pharmacist, and see the natural alternatives guide.',
      'Never use a can that is bulging.'
    ],
    sections: [
      { h: 'How the numbers are made', items: [
        'We plan about 2,000 calories per person per day. Men, teens and hard workers need more. Young children need less, so the planner lets you enter the number of children under 10 and counts them at 60 percent.',
        'Short plans (3 days and 1 week) use foods that need no cooking. Medium plans (1 to 6 months) add dry staples. Long plans (1 year and more) lean on rice, wheat, oats, beans, oil, sugar, salt and powdered milk.',
        'Quantities are per person per day, then multiplied by people and days, then rounded up to whole cans, jars and bags.',
        'For foods that spoil, the list shows how much to keep now, how long it keeps, and how much you will use in total, so you can rotate.'
      ] },
      { h: 'United States and Portugal: what differs', items: [
        'The US list uses pounds, ounces and 15 oz cans. The Portugal list is in English and uses kilograms, litres and the can and pack sizes sold in Portuguese shops.',
        'Portugal adds canned sardines and mackerel, bacalhau seco (salted dried cod), azeite (olive oil), UHT milk and bolachas.',
        'The US list has peanut butter, canned chicken, jerky and rolled oats in bigger packs. Some items are hard to find in Portugal, such as powdered eggs and freeze-dried meals.'
      ] }
    ],
    tip: ['Start with 3 days and grow by one week each month.', 'Buy a few extra cans each shop and put them on the shelf.'],
    after: ['Put a reminder on your phone every 6 months to rotate.', 'Share the list with your family and neighbours.'],
    sources: [
      ['Virginia Department of Health: Build a Kit (1 gallon of water per person per day, 3 days of food)', 'https://www.vdh.virginia.gov/content/uploads/sites/23/2022/09/Build-A-Kit.pdf'],
      ['FEMA-linked brochure: food and water in an emergency (1 gallon a day, 2 weeks of water)', 'https://henrycounty.in.gov/DocumentCenter/View/295/Food-and-Water-in-an-Emergency-PDF'],
      ['BBK checklist (Germany) for 10 days, reported by Verbraucherzentrale Sachsen', 'https://verbraucherzentrale-sachsen.de/sites/default/files/2025-02/250206_marktcheck_notfallvorrat_vzs.pdf'],
      ['BYU: an approach to longer-term food storage (2024)', 'https://ndfs.byu.edu/https:/brightspotcdn.byu.edu/66/a8/0a18984741f6a699f6034adbbb30/an-approach-to-longer-term-food-storage-6june2024.pdf'],
      ['BYU Y Magazine: Ask an Expert, new tips for old food', 'https://magazine.byu.edu/article/ask-an-expert-new-tips-for-old-food'],
      ['Food bank shelf life guide (crackers, pasta, rice, UHT milk, oil)', 'https://foodbankiowa.org/app/uploads/2022/03/Food-Shelf-Life-Recommendations.pdf'],
      ['DECO Proteste: best-before dates, what you can eat after the date (Portugal)', 'https://www.deco.proteste.pt/alimentacao/seguranca-alimentar/dicas/prazo-validade-alimentos-podemos-comer-depois-data'],
      ['EU Preparedness Union Strategy: 72 hours, reported by Food Ingredients First', 'https://www.foodingredientsfirst.com/news/eu-preparedness-strategy-household-food-stockpile-disaster.html'],
      ['Postal.pt: three-day survival kit (Portugal)', 'https://postal.pt/europedirectalgarve/kit-de-sobrevivencia-para-tres-dias-a-recomendacao-oficial-que-muitos-ainda-ignoram/']
    ],
    unconfirmed: [
      'We did not open any of these pages. The figures come from search results and summaries. We found no official ANEPC list with quantities per person, and no official US source for amounts beyond 2 weeks.',
      'Official advice we found covers 3 days to 2 weeks: 1 gallon of water per person per day and non-perishable food. The 2 weeks of water is from a FEMA-linked brochure seen in a search result.',
      'Amounts for 1 month and longer are the planner estimate. They follow the long-term pattern in BYU and church storage material (grains, beans, sugar, oil, milk, salt) and the German BBK 10-day list for foods, quoted in news and a consumer group PDF. We did not open the church calculator or the BBK page.',
      'The BBK 10-day amounts per person we saw: 20 litres of drink, 3.5 kg of grain and bread products, 4 kg of vegetables and legumes, 2.5 kg of fruit and nuts, 2.6 kg of dairy, 1.5 kg of fish, meat and eggs, 300 g of fat and oil. Sources differed on fruit and milk. We did not copy them. Our short-term amounts are smaller on weight because canned foods are heavier.',
      'The 2,000 calories figure is our planning number. We did not find a published figure in the sources. The Portuguese food wheel gives portions that depend on calories (1,300 to 3,000).',
      'Shelf lives are from food bank and university guides and BYU, seen in search results: canned fruit 12 to 18 months, canned fish and beans 2 to 5 years, saltine crackers about 8 months, dry rice and pasta about 2 years, UHT milk 6 months to 1 year (sources differ), oil 6 months to 2 years (sources differ), wheat, rice, beans, oats, sugar and salt 20 to 30 years or more sealed with oxygen absorbers. We found no source for peanut butter, honey, pasta in sealed packs, nuts or dried fruit in sealed packs. Those numbers are our estimates.',
      'We found no Portuguese source for the shelf life of bacalhau seco, and the soaking time is common advice.',
      'We found no source for the non-food amounts (toilet paper, soap, toothpaste, bleach, gas, batteries, diapers, pads). They are planner estimates. The 8 drops of bleach per gallon is CDC advice used elsewhere in this app.',
      'The cap of 14 days of stored water follows the 2 week figure. For long plans we assume you can filter, boil or treat water. See the water guides.',
      'Portugal: the 72 hour kit is quoted from a Portuguese news site that cites ANEPC and the EU. We did not find the ANEPC page.',
      'United Kingdom: the planner uses the same food list and metric pack sizes as Portugal, minus Portuguese-only items such as dried salted cod. We did not check UK pack sizes, UK shops or UK government advice. Pack sizes and amounts are planner estimates. Type your own pack sizes in My stockpile tracker.'
    ]
  };
  if (window.LOAD_CORE && window.LOAD_CORE.guides) {
    guide.do = guide.do; guide.source = guide.sources[0][1];
    window.LOAD_CORE.guides.push(guide);
  }

  var natural = {
    id: 'meds-natural-alternatives', area: 'Medical', icon: 'pill', difficulty: 'Practical', status: 'partly', checkedOn: '28 Oct 2026',
    title: 'Medicines in a long emergency: what to store, and natural options when they run out',
    intro: 'Open Tools, then Stockpile planner, to see a theoretical amount of common medicines for your household. This guide explains the limits and lists natural options. Natural options help with mild problems. They do not replace prescription medicine.',
    first: [
      'Keep a written list of every medicine you take: name, dose, times, and who prescribed it.',
      'Ask your prescriber and pharmacist for the largest refill you are allowed. Official advice we found is 2 weeks to 30 days.',
      'Read the package label for every dose. Do not guess doses.',
      'Do not swap a prescription medicine for a natural product on your own.'
    ],
    do: [
      'Open Tools, then Stockpile planner. Pick your people and how long. Read the Medicines part.',
      'For prescriptions, type how many doses you take each day. The planner multiplies by the days and adds 15 percent. This is a theoretical total only.',
      'Store tablets in a cool, dry, dark place in their original packs. Write the date on each pack.',
      'Rotate the oldest first. Replace anything past its date when you can.',
      'Keep oral rehydration salts. If you have none, use the sugar and salt drink in the table below.',
      'For a mild problem, try the natural option in the table first. For a serious problem, use emergency care.',
      'Check every natural product for interactions. Natural does not mean safe for everyone.'
    ],
    table: { head: ['Problem', 'Natural option', 'Evidence we found', 'Do not use if'], rows: [
      ['Dehydration from diarrhoea or vomiting', 'Sugar and salt drink: 6 level teaspoons of sugar and half a level teaspoon of salt in 1 litre of clean water. Sip often.', 'Published by the Rehydration Project. Older WHO guidance gave 8 teaspoons of sugar and 1 of salt. IFRC uses about 40 g sugar and 3.5 g salt. Sources differ. Packets are better.', 'Child, heart disease or kidney disease: ask a doctor. Too much sugar or salt makes it worse.'],
      ['Cough in people aged 1 year and older', 'A spoonful of honey, warm or on its own, at bedtime', 'Cochrane review: honey may help more than no treatment. The benefit is small and the trials were short.', 'Any baby under 1 year. Honey can cause infant botulism.'],
      ['Low back pain and muscle aches', 'Willow bark tea or extract (contains salicin, the chemical aspirin came from)', 'NCCIH and a Cochrane review: moderate evidence for low back pain in small trials. A 2019 review was less positive.', 'Aspirin allergy, asthma, stomach ulcer, blood thinners, pregnancy. Common label advice also says children and teens.'],
      ['Blocked nose', 'Salt water rinse made with distilled, sterile, or boiled and cooled water', 'CDC and FDA: use only distilled, sterile or boiled and cooled water, never plain tap water.', 'Never use untreated tap water for a nasal rinse.'],
      ['Sore throat', 'Warm salt water gargle', 'Common advice. We did not find a source.', 'Young children who cannot gargle.'],
      ['Upset stomach and nausea', 'Ginger tea, peppermint tea', 'Traditional use. We did not find a source in our search.', 'Ginger and blood thinners: ask a pharmacist.'],
      ['Itching and insect bites', 'Cool wet cloth, oatmeal bath, baking soda paste', 'Common advice. We did not find a source.', 'Broken or infected skin.'],
      ['Low vitamin C on a long stay indoors', 'Canned tomatoes and citrus, potatoes, cabbage, peppers, a multivitamin', 'Standard nutrition teaching. We did not look it up for this guide.', 'None for foods.'],
      ['Constipation from stored foods', 'Water, oats, beans, prunes, dried fruit', 'Common advice. We did not find a source.', 'Severe pain, vomiting or blood: get care.']
    ] },
    warn: [
      'Natural options do NOT replace insulin, heart medicine, blood thinners, seizure medicine, asthma inhalers, thyroid medicine, transplant medicine, HIV medicine or antibiotics for an infection.',
      'Do not stop a prescription because you cannot get more. Call a pharmacist or doctor, or go to emergency care. In the US call 911. In Portugal call 112 or SNS 24 (808 24 24 24).',
      'Pregnant, nursing, older and very young people need extra care. Ask first.',
      'High fever, trouble breathing, chest pain, confusion, or a wound that spreads redness are emergencies. See the first aid guides.',
      'Insulin and other cold-chain medicine cannot be stored for years. Ask a pharmacist how long it keeps without a fridge.'
    ],
    sections: [
      { h: 'How the medicine amounts are worked out', items: [
        'For adults only. Children need a dose by weight. Ask a pharmacist for children\'s products and use the label.',
        'Each item has a planner guess of how many doses one adult uses in a year. We multiply by the adults and the years.',
        'For a plan shorter than a month we use a higher share so you are not left short. Plans of 3 days still show at least one pack.',
        'Prescriptions: doses per day times the days times 1.15. A 10 year total is theoretical. Most people cannot get that much, and most medicines expire sooner.'
      ] },
      { h: 'Do medicines still work after the date?', items: [
        'The US military and FDA tested many stockpiled medicines. In the data we found, nearly 90 percent of 122 products met the test for an extension, about 5.5 years on average, under ideal storage.',
        'Home storage is rarely ideal. Liquids and suspensions may not last. For ibuprofen and acetaminophen we found no specific data, so we do not promise they work after the date.'
      ] }
    ],
    tip: ['Take a photo of your medicine list and keep a paper copy.', 'Ask the pharmacist which of your medicines can go without a fridge and for how long.'],
    after: ['Check the dates every 6 months.', 'Share your list with one person you trust.'],
    sources: [
      ['Rehydration Project: homemade sugar and salt drink', 'https://rehydrate.org/solutions/homemade.htm'],
      ['IFRC: preparing oral rehydration solution', 'https://epidemics.ifrc.org/volunteer/action/09-preparing-oral-rehydration-solution-ors'],
      ['PubMed: sugar-salt solutions recommended for home treatment of diarrhoea in African countries', 'https://pubmed.ncbi.nlm.nih.gov/2456720/'],
      ['Cochrane: honey for acute cough in children', 'https://cochranelibrary.com/cdsr/doi/10.1002/14651858.CD007094.pub5/information'],
      ['NCCIH: nutritional approaches for musculoskeletal pain (willow bark)', 'https://nccih.nih.gov/health/providers/digest/nutritional-approaches-for-musculoskeletal-pain-and-inflammation-science'],
      ['Cochrane: herbal medicine for low back pain', 'https://pubmed.ncbi.nlm.nih.gov/17202897/'],
      ['FDA on safe neti pot use, reported by Infection Control Today', 'https://www.infectioncontroltoday.com/view/fda-urges-safe-use-neti-pots-avoid-infections'],
      ['FDA Shelf Life Extension Program summary (Medical Xpress, 2012)', 'https://medicalxpress.com/news/2012-10-drugs-fine-years-expire.html']
    ],
    unconfirmed: [
      'We did not open any of these pages. The facts come from search results and summaries.',
      'The yearly medicine amounts are planner estimates. We found no official guidance on how many tablets a person needs for 1 to 10 years.',
      'We found no official advice to store more than 2 weeks (CDC) or 30 days (Red Cross, older adults) of prescription medicine. The 10 year figures are theory.',
      'We did not look up label dose limits for paracetamol, ibuprofen or loperamide. Follow the package label.',
      'The sugar and salt amounts differ between sources. We could not confirm a current WHO page for the 6 and half teaspoon version.',
      'The honey review covers cough for one night of treatment. The botulism warning is from Cochrane text and an Australian guideline. We did not find the CDC page.',
      'We did not find a source for ginger, peppermint, salt gargle, oatmeal baths, baking soda paste or prunes. They are common advice only.',
      'The 2019 review cited by NCCIH recommended against willow bark for chronic musculoskeletal pain. The evidence is mixed.',
      'The children and teens warning for willow bark is common label advice. We did not confirm it.',
      'The pillo.care report of acetaminophen potency after 28 to 40 years is not confirmed and is not used.'
    ]
  };
  var sea = {
    id: 'sea-desalinate', area: 'Water', icon: 'waves', difficulty: 'Advanced', status: 'partly', checkedOn: '28 Oct 2026',
    title: 'Seawater: what removes the salt, and what does not',
    intro: 'Seawater is too salty to drink. Boiling and normal filters do not remove salt. Only methods that take the water away from the salt work. Read this with the distilling guide.',
    first: [
      'Do not drink seawater. Not even a little, and not boiled.',
      'Use stored fresh water, rain, or ice first.',
      'A normal camp filter or purifier does NOT remove salt.',
      'Only distilling, a reverse osmosis hand pump, or a still removes salt.'
    ],
    do: [
      'Store fresh water first. See the water guides. Make seawater your last backup.',
      'Decide how much you need. Plan 1 gallon (3.8 L) per person per day.',
      'Pick a method. A hand-pump reverse osmosis unit is the fastest. Distilling over a fire is slow and uses fuel. A solar still is slowest.',
      'For distilling, follow the Make seawater drinkable by distilling guide. Collect only the steam that turns back to water.',
      'For a hand pump, follow the maker\'s manual. Rinse and store it as the manual says. Buy spare parts.',
      'Collect seawater away from harbours, drains and oil. Strain out sand first.',
      'Drink the new water with food if you can. Store any extra in clean, covered containers.',
      'If the water tastes salty, do not drink it. Pump or distil it again.'
    ],
    table: { head: ['People', 'Litres a day (1 gal each)', 'Hours of pumping at 0.9 L an hour', 'Hours of pumping at 4.5 L an hour'], rows: [] },
    warn: [
      'Do not drink seawater to "get used to it". It dehydrates you.',
      'Do not trust a normal filter or boiling to take out the salt.',
      'Burning fuel to distil makes carbon monoxide. Use outdoors only.',
      'Do not distil water with oil or fuel on it. Fumes can get into the water.'
    ],
    sections: [
      { h: 'The options', items: [
        'Distilling: boil seawater and catch the steam. It works. It needs fuel and takes a long time for a small amount. See the distilling guide.',
        'Reverse osmosis hand pump: a manual watermaker pushes seawater through a membrane. The Katadyn Survivor 06 is listed at about 0.9 litres an hour and the Survivor 35 at about 4.5 litres an hour. These are maker claims.',
        'Solar still: a sealed cover over seawater in the sun. One vendor source says about 1 litre a day in ideal conditions. That is not enough for a family.',
        'Osmotic pouches: some life raft supplies give a sweet drink from seawater but not pure water.'
      ] }
    ],
    tip: ['Buy a hand-pump unit before you need it and test it on fresh water.', 'Practice once so you know the real output.'],
    after: ['Rinse the equipment with fresh water.', 'Check the membrane storage rules in the manual.'],
    sources: [
      ['Katadyn Survivor 06 listing: about 30 oz (0.9 L) an hour, plus or minus 15 percent', 'https://defender.ca/en_ca/katadyn-survivor-06-watermaker-8013419'],
      ['Nautiradar listing for the Survivor 06 handheld manual watermaker', 'https://www.nautiradar.pt/en/products/spectra-katadyn/survivor-06-ls-res-handheld-manual-emergency-watermaker-0-9-l-h-and-24-l-day'],
      ['Katadyn Survivor 35 catalogue excerpt: 4.5 litres an hour', 'https://pdf.nauticexpo.com/pdf/katadyn/survivor-35/22212-23942.html'],
      ['Crate Club: how to desalinate water in an emergency', 'https://crateclub.com/blogs/loadout/how-to-desalinate-water-in-an-emergency-a-vital-survival-skill'],
      ['Battlbox: how to make seawater drinkable', 'https://battlbox.com/blogs/outdoors/how-to-make-seawater-drinkable']
    ],
    unconfirmed: [
      'We did not open any of these pages. The facts come from search results and summaries.',
      'We found no CDC, FEMA or Red Cross page for these methods. Most sources are gear shops and blogs.',
      'The litres an hour are maker claims and can be lower in cold water or with a worn membrane.',
      'We found no output per square metre for solar stills. The 1 litre a day figure is from one vendor blog.',
      'We found no yield figure for distilling over a fire. It depends on the pot, the fire and the cover.',
      'The hours of pumping in the table are our arithmetic from the maker claims.',
      'We did not confirm the safe salt level for drinking water.',
      'The warning about oil in distilled water is general advice. We did not find a source.'
    ]
  };
  SIZES.forEach(function (n) {
    var L = n * WATER_L;
    sea.table.rows.push([String(n), (Math.round(L * 10) / 10) + ' L', (Math.round(L / 0.9 * 10) / 10) + ' h', (Math.round(L / 4.5 * 10) / 10) + ' h']);
  });
  if (window.LOAD_CORE && window.LOAD_CORE.guides) {
    natural.source = natural.sources[0][1]; sea.source = sea.sources[0][1];
    window.LOAD_CORE.guides.push(natural);
    window.LOAD_CORE.guides.push(sea);
  }
  window.LOAD_STOCK = { items: ITEMS, nonfood: NONFOOD, periods: PERIODS, sizes: SIZES, meds: MEDS, medsPlan: medsPlan, compute: compute, fmtMass: fmtMass, band: band, waterCapDays: WATER_CAP_DAYS, waterLitres: WATER_L };
  if (typeof module !== 'undefined') module.exports = window.LOAD_STOCK;
})();
