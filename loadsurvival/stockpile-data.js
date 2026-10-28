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
    { id: 'fruit', cat: 'Ready to eat', en: 'Canned fruit (peaches, pears, pineapple, fruit cocktail, mandarins)', pt: 'Fruta em calda (pêssego, ananás, pêra, salada de fruta)', kcal: 60, r: [200, 100, 70], shelf: 1.5, fav: 1, us: { g: 425, u: 'can (15 oz)', p: 'cans (15 oz)' }, ptk: { g: 425, u: 'lata', p: 'latas' }, note: 'High-acid cans keep about 12 to 18 months. Choose juice or light syrup.' },
    { id: 'tuna', cat: 'Ready to eat', en: 'Canned tuna', pt: 'Atum em conserva', kcal: 150, r: [60, 35, 20], shelf: 4, fav: 1, us: { g: 142, u: 'can (5 oz)', p: 'cans (5 oz)' }, ptk: { g: 120, u: 'lata', p: 'latas' }, note: 'Low-acid cans keep about 2 to 5 years.' },
    { id: 'sardine', cat: 'Ready to eat', en: 'Canned sardines or mackerel', pt: 'Sardinhas ou cavala em conserva', kcal: 200, r: [60, 30, 15], shelf: 4, fav: 1, us: { g: 106, u: 'can (3.75 oz)', p: 'cans (3.75 oz)' }, ptk: { g: 125, u: 'lata', p: 'latas' }, note: 'Rich in fat and protein. Very popular and easy to find in Portugal.' },
    { id: 'salmon', cat: 'Ready to eat', en: 'Canned salmon', pt: 'Salmão em conserva', kcal: 180, r: [0, 15, 10], shelf: 4, fav: 1, us: { g: 170, u: 'can (6 oz)', p: 'cans (6 oz)' }, ptk: { g: 170, u: 'lata', p: 'latas' } },
    { id: 'meat', cat: 'Ready to eat', en: 'Canned chicken, ham or corned beef', pt: 'Carne em lata (frango, fiambre, salsichas)', kcal: 200, r: [40, 20, 10], shelf: 4, us: { g: 340, u: 'can (12 oz)', p: 'cans (12 oz)' }, ptk: { g: 200, u: 'lata', p: 'latas' }, note: 'Canned meat is less common in Portugal. Look for fiambre or salsichas in tins.' },
    { id: 'beanscan', cat: 'Ready to eat', en: 'Canned beans and chickpeas', pt: 'Feijão e grão-de-bico em lata', kcal: 90, r: [120, 50, 30], shelf: 3, us: { g: 425, u: 'can (15 oz)', p: 'cans (15 oz)' }, ptk: { g: 425, u: 'lata', p: 'latas' } },
    { id: 'vegcan', cat: 'Ready to eat', en: 'Canned vegetables (corn, peas, green beans, carrots, tomatoes)', pt: 'Legumes em lata (milho, ervilhas, feijão-verde, cenoura, tomate)', kcal: 40, r: [120, 90, 60], shelf: 3, us: { g: 425, u: 'can (15 oz)', p: 'cans (15 oz)' }, ptk: { g: 400, u: 'lata', p: 'latas' }, note: 'Tomatoes are high-acid and keep about 18 months.' },
    { id: 'soup', cat: 'Ready to eat', en: 'Canned soup, stew or ready meal', pt: 'Sopa, guisado ou refeição pronta em lata', kcal: 80, r: [200, 60, 0], shelf: 2, us: { g: 400, u: 'can (14 oz)', p: 'cans (14 oz)' }, ptk: { g: 400, u: 'lata', p: 'latas' }, note: 'Good for the first days because it needs no cooking.' },
    { id: 'crackers', cat: 'Ready to eat', en: 'Crackers (saltines, whole grain, water crackers)', pt: 'Bolachas (água e sal, integrais, Maria) e tostas', kcal: 430, r: [80, 30, 15], shelf: 0.7, lt: 2, fav: 1, us: { g: 454, u: 'box (16 oz)', p: 'boxes (16 oz)' }, ptk: { g: 200, u: 'pacote', p: 'pacotes' }, note: 'Saltines keep about 8 months. They go stale, so keep them sealed and rotate.' },
    { id: 'pb', cat: 'Ready to eat', en: 'Peanut butter or nut butter', pt: 'Manteiga de amendoim ou de frutos secos', kcal: 590, r: [40, 15, 10], shelf: 1.5, fav: 1, us: { g: 454, u: 'jar (16 oz)', p: 'jars (16 oz)' }, ptk: { g: 350, u: 'frasco', p: 'frascos' } },
    { id: 'nuts', cat: 'Ready to eat', en: 'Nuts and seeds (almonds, walnuts, peanuts)', pt: 'Frutos secos (amêndoa, noz, amendoim, castanha)', kcal: 600, r: [30, 15, 8], shelf: 0.75, lt: 2, fav: 1, us: { g: 300, u: 'bag (10 oz)', p: 'bags (10 oz)' }, ptk: { g: 300, u: 'saco', p: 'sacos' }, note: 'Oils go off. Keep cool and dark.' },
    { id: 'dried', cat: 'Ready to eat', en: 'Dried fruit (raisins, apricots, figs, prunes)', pt: 'Fruta seca (passas, alperces, figos, ameixas)', kcal: 290, r: [40, 20, 10], shelf: 1, lt: 2, fav: 1, us: { g: 300, u: 'bag (10 oz)', p: 'bags (10 oz)' }, ptk: { g: 250, u: 'saco', p: 'sacos' } },
    { id: 'bars', cat: 'Ready to eat', en: 'Granola and energy bars', pt: 'Barras de cereais e energéticas', kcal: 420, r: [30, 0, 0], shelf: 1, us: { g: 250, u: 'box', p: 'boxes' }, ptk: { g: 250, u: 'caixa', p: 'caixas' } },
    { id: 'cereal', cat: 'Ready to eat', en: 'Ready-to-eat cereal or muesli', pt: 'Cereais de pequeno-almoço ou muesli', kcal: 380, r: [40, 15, 0], shelf: 1, us: { g: 500, u: 'box', p: 'boxes' }, ptk: { g: 500, u: 'caixa', p: 'caixas' } },
    { id: 'jerky', cat: 'Ready to eat', en: 'Jerky or dried meat', pt: '', kcal: 410, r: [20, 8, 0], shelf: 1, nopt: 1, us: { g: 90, u: 'bag (3 oz)', p: 'bags (3 oz)' } },
    { id: 'uht', cat: 'Ready to eat', en: 'Shelf-stable milk (UHT) or plant milk', pt: 'Leite UHT (ou bebida vegetal)', kcal: 47, r: [250, 120, 0], shelf: 0.75, fav: 1, us: { g: 946, u: 'carton (1 qt)', p: 'cartons (1 qt)' }, ptk: { g: 1000, u: 'pacote de 1 L', p: 'pacotes de 1 L' }, note: 'Sources give 6 months to 1 year unopened. Check the date on the pack.' },
    /* ---- dry staples ---- */
    { id: 'rice', cat: 'Dry staples', en: 'White rice', pt: 'Arroz (agulha ou carolino)', kcal: 360, r: [0, 80, 110], shelf: 2, lt: 25, cook: 1, us: { g: 2268, u: 'bag (5 lb)', p: 'bags (5 lb)' }, ptk: { g: 1000, u: 'pacote de 1 kg', p: 'pacotes de 1 kg' }, note: 'About 2 years in the shop pack. 25 years or more in sealed cans or buckets with oxygen absorbers.' },
    { id: 'pasta', cat: 'Dry staples', en: 'Dry pasta', pt: 'Massa seca (esparguete, macarrão)', kcal: 360, r: [0, 45, 35], shelf: 2, lt: 8, cook: 1, us: { g: 454, u: 'box (1 lb)', p: 'boxes (1 lb)' }, ptk: { g: 500, u: 'pacote de 500 g', p: 'pacotes de 500 g' } },
    { id: 'wheat', cat: 'Dry staples', en: 'Wheat berries or flour', pt: 'Trigo em grão ou farinha de trigo', kcal: 340, r: [0, 35, 85], shelf: 1, lt: 25, cook: 1, us: { g: 2268, u: 'bag (5 lb)', p: 'bags (5 lb)' }, ptk: { g: 1000, u: 'pacote de 1 kg', p: 'pacotes de 1 kg' }, note: 'Flour keeps about a year. Wheat berries keep far longer. A hand mill is needed for berries.' },
    { id: 'oats', cat: 'Dry staples', en: 'Rolled oats', pt: 'Flocos de aveia', kcal: 380, r: [0, 30, 30], shelf: 2, lt: 20, cook: 1, us: { g: 1190, u: 'tub (42 oz)', p: 'tubs (42 oz)' }, ptk: { g: 500, u: 'pacote de 500 g', p: 'pacotes de 500 g' } },
    { id: 'beans', cat: 'Dry staples', en: 'Dry beans, lentils and chickpeas', pt: 'Feijão, lentilhas e grão-de-bico secos', kcal: 340, r: [0, 45, 50], shelf: 3, lt: 20, cook: 1, us: { g: 907, u: 'bag (2 lb)', p: 'bags (2 lb)' }, ptk: { g: 500, u: 'pacote de 500 g', p: 'pacotes de 500 g' }, note: 'Need soaking and a lot of fuel and water. Lentils cook faster.' },
    { id: 'cod', cat: 'Dry staples', en: '', pt: 'Bacalhau seco e salgado', kcal: 290, r: [0, 25, 20], shelf: 1, cook: 1, nous: 1, ptk: { g: 1000, u: 'peça de 1 kg', p: 'peças de 1 kg' }, note: 'Salted dried cod. Soak 24 to 48 hours in changed water before cooking. Keep dry and cool.' },
    { id: 'pmilk', cat: 'Dry staples', en: 'Powdered milk (nonfat dry)', pt: 'Leite em pó', kcal: 360, r: [0, 15, 25], shelf: 2, lt: 20, us: { g: 454, u: 'box (16 oz)', p: 'boxes (16 oz)' }, ptk: { g: 400, u: 'lata de 400 g', p: 'latas de 400 g' } },
    { id: 'eggs', cat: 'Dry staples', en: 'Powdered eggs', pt: 'Ovo em pó (difícil de encontrar em Portugal; encomende online)', kcal: 590, r: [0, 0, 8], shelf: 2, lt: 10, us: { g: 400, u: 'can', p: 'cans' }, ptk: { g: 400, u: 'lata', p: 'latas' } },
    { id: 'freeze', cat: 'Dry staples', en: 'Freeze-dried meals or meats (optional)', pt: 'Refeições liofilizadas (opcional, vendidas online)', kcal: 400, r: [0, 0, 10], shelf: 1, lt: 20, cook: 1, us: { g: 700, u: '#10 can', p: '#10 cans' }, ptk: { g: 700, u: 'lata grande', p: 'latas grandes' }, note: 'Costly. Optional. Needs hot water.' },
    /* ---- fats, sugar, seasoning ---- */
    { id: 'oil', cat: 'Fats, sugar, salt', en: 'Cooking oil (olive or vegetable)', pt: 'Azeite ou óleo', kcal: 880, r: [8, 18, 22], shelf: 1, lt: 2, us: { g: 872, u: 'bottle (1 qt)', p: 'bottles (1 qt)' }, ptk: { g: 690, u: 'garrafa de 750 ml', p: 'garrafas de 750 ml' }, note: 'Sources say 6 months to 2 years. Keep cool, dark and sealed.' },
    { id: 'sugar', cat: 'Fats, sugar, salt', en: 'Sugar', pt: 'Açúcar', kcal: 390, r: [0, 20, 25], shelf: 20, lt: 30, us: { g: 2268, u: 'bag (5 lb)', p: 'bags (5 lb)' }, ptk: { g: 1000, u: 'pacote de 1 kg', p: 'pacotes de 1 kg' }, note: 'Keeps for decades if kept dry.' },
    { id: 'honey', cat: 'Fats, sugar, salt', en: 'Honey', pt: 'Mel', kcal: 300, r: [0, 6, 8], shelf: 10, us: { g: 340, u: 'jar (12 oz)', p: 'jars (12 oz)' }, ptk: { g: 500, u: 'frasco de 500 g', p: 'frascos de 500 g' }, note: 'We found no reliable figure for honey. It keeps a very long time in a sealed jar.' },
    { id: 'jam', cat: 'Fats, sugar, salt', en: 'Jam or marmalade', pt: 'Doce, compota ou marmelada', kcal: 250, r: [20, 10, 5], shelf: 2, us: { g: 340, u: 'jar (12 oz)', p: 'jars (12 oz)' }, ptk: { g: 340, u: 'frasco', p: 'frascos' } },
    { id: 'salt', cat: 'Fats, sugar, salt', en: 'Salt (iodized)', pt: 'Sal (iodado)', kcal: 0, r: [2, 8, 10], shelf: 30, us: { g: 737, u: 'box (26 oz)', p: 'boxes (26 oz)' }, ptk: { g: 1000, u: 'pacote de 1 kg', p: 'pacotes de 1 kg' } },
    { id: 'spice', cat: 'Fats, sugar, salt', en: 'Spices and bouillon cubes', pt: 'Especiarias e cubos de caldo', kcal: 0, r: [1, 4, 5], shelf: 2, us: { g: 100, u: 'pack', p: 'packs' }, ptk: { g: 100, u: 'pacote', p: 'pacotes' } },
    { id: 'baking', cat: 'Fats, sugar, salt', en: 'Baking soda, baking powder and yeast', pt: 'Bicarbonato, fermento em pó e levedura', kcal: 0, r: [0, 1, 2], shelf: 2, us: { g: 200, u: 'pack', p: 'packs' }, ptk: { g: 200, u: 'pacote', p: 'pacotes' } },
    /* ---- comfort ---- */
    { id: 'choc', cat: 'Comfort and morale', en: 'Chocolate and candy', pt: 'Chocolate e doces', kcal: 540, r: [15, 8, 5], shelf: 1, fav: 1, us: { g: 100, u: 'bar', p: 'bars' }, ptk: { g: 100, u: 'tablete', p: 'tabletes' }, note: 'A small treat helps morale, especially for children.' },
    { id: 'coffee', cat: 'Comfort and morale', en: 'Coffee (instant or ground)', pt: 'Café (solúvel ou moído)', kcal: 0, r: [10, 10, 8], shelf: 1, lt: 3, fav: 1, us: { g: 250, u: 'tin', p: 'tins' }, ptk: { g: 250, u: 'pacote de 250 g', p: 'pacotes de 250 g' } },
    { id: 'tea', cat: 'Comfort and morale', en: 'Tea', pt: 'Chá', kcal: 0, r: [3, 3, 3], shelf: 2, us: { g: 50, u: 'box (25 bags)', p: 'boxes (25 bags)' }, ptk: { g: 50, u: 'caixa de 25 saquetas', p: 'caixas de 25 saquetas' } }
  ];
  /* non-food items: per = 'pm' (per person per month), 'pp' (per person, once), 'hh' (per household, fixed), 'n5' (one per 5 people, rounded up), 'pd' (per person per day), note */
  var NONFOOD = [
    { id: 'tp', cat: 'Hygiene', en: 'Toilet paper', pt: 'Papel higiénico', per: 'pm', q: 4, u: 'roll', p: 'rolls', ptu: 'rolo', ptp: 'rolos', note: 'Planner estimate: about 1 roll per person per week.' },
    { id: 'soap', cat: 'Hygiene', en: 'Bar soap or hand soap', pt: 'Sabonete', per: 'pm', q: 0.5, u: 'bar', p: 'bars', ptu: 'sabonete', ptp: 'sabonetes', note: 'Planner estimate.' },
    { id: 'tooth', cat: 'Hygiene', en: 'Toothpaste', pt: 'Pasta de dentes', per: 'pm', q: 0.5, u: 'tube', p: 'tubes', ptu: 'tubo', ptp: 'tubos' },
    { id: 'brush', cat: 'Hygiene', en: 'Toothbrush', pt: 'Escova de dentes', per: 'pm', q: 0.33, u: 'brush', p: 'brushes', ptu: 'escova', ptp: 'escovas', note: 'One every 3 months.' },
    { id: 'wipes', cat: 'Hygiene', en: 'Wet wipes', pt: 'Toalhetes', per: 'pm', q: 1, u: 'pack', p: 'packs', ptu: 'pacote', ptp: 'pacotes' },
    { id: 'fem', cat: 'Hygiene', en: 'Pads or tampons (for ONE person who uses them)', pt: 'Pensos ou tampões (para UMA pessoa que os usa)', per: 'pm1', q: 20, u: 'item', p: 'items', ptu: 'unidade', ptp: 'unidades', note: 'Multiply by the number of people who need them. Planner estimate: about 20 a month each.' },
    { id: 'diaper', cat: 'Hygiene', en: 'Diapers (for ONE baby)', pt: 'Fraldas (para UM bebé)', per: 'pm1', q: 240, u: 'diaper', p: 'diapers', ptu: 'fralda', ptp: 'fraldas', note: 'Multiply by the number of babies. About 8 a day. Planner estimate. Ask a doctor about formula and baby food.' },
    { id: 'detergent', cat: 'Cleaning', en: 'Laundry and dish soap', pt: 'Detergente da roupa e da loiça', per: 'pm', q: 0.5, u: 'litre', p: 'litres', ptu: 'litro', ptp: 'litros', note: 'Planner estimate.' },
    { id: 'bags', cat: 'Cleaning', en: 'Trash bags', pt: 'Sacos do lixo', per: 'pm', q: 10, u: 'bag', p: 'bags', ptu: 'saco', ptp: 'sacos' },
    { id: 'bleach', cat: 'Cleaning', en: 'Plain unscented household bleach (for water and cleaning)', pt: 'Lixívia simples, sem perfume (para a água e a limpeza)', per: 'bleach', u: 'litre', p: 'litres', ptu: 'litro', ptp: 'litros', note: 'Water: 8 drops per gallon (2 per litre). Bleach loses strength. Replace each year.' },
    { id: 'fuel', cat: 'Cooking and light', en: 'Camp stove gas (butane or propane canisters)', pt: 'Gás para o fogão de campismo (cartuchos)', per: 'pw', q: 1, u: 'canister (230 g)', p: 'canisters (230 g)', ptu: 'cartucho (230 g)', ptp: 'cartuchos (230 g)', note: 'Planner estimate: 1 per person per week if you cook. The more beans and rice, the more gas.' },
    { id: 'lighter', cat: 'Cooking and light', en: 'Lighters or matches', pt: 'Isqueiros ou fósforos', per: 'hh2', q: 1, u: 'item', p: 'items', ptu: 'unidade', ptp: 'unidades', note: 'One per 2 people, and a few more.' },
    { id: 'batt', cat: 'Cooking and light', en: 'AA batteries', pt: 'Pilhas AA', per: 'pm', q: 2, u: 'battery', p: 'batteries', ptu: 'pilha', ptp: 'pilhas', note: 'Planner estimate. Use rechargeable plus a solar charger for long plans.' },
    { id: 'torch', cat: 'Cooking and light', en: 'Flashlight or headlamp', pt: 'Lanterna ou frontal', per: 'pp', q: 1, u: 'light', p: 'lights', ptu: 'luz', ptp: 'luzes', note: 'One per person.' },
    { id: 'blanket', cat: 'Gear', en: 'Blanket or sleeping bag', pt: 'Cobertor ou saco-cama', per: 'pp', q: 1, u: 'blanket', p: 'blankets', ptu: 'cobertor', ptp: 'cobertores', note: 'One per person.' },
    { id: 'opener', cat: 'Gear', en: 'Manual can opener', pt: 'Abre-latas manual', per: 'hh', q: 2, u: 'opener', p: 'openers', ptu: 'abre-latas', ptp: 'abre-latas', note: 'Buy two. They break.' },
    { id: 'stove', cat: 'Gear', en: 'Camp stove', pt: 'Fogão de campismo', per: 'n5', q: 1, u: 'stove', p: 'stoves', ptu: 'fogão', ptp: 'fogões', note: 'One per 5 people. Use outdoors only.' },
    { id: 'filter', cat: 'Gear', en: 'Water filter or purifier', pt: 'Filtro ou purificador de água', per: 'n10', q: 1, u: 'filter', p: 'filters', ptu: 'filtro', ptp: 'filtros', note: 'One per 10 people. Spare cartridges for long plans.' },
    { id: 'radio', cat: 'Gear', en: 'Battery, solar or crank radio', pt: 'Rádio a pilhas, solar ou de manivela', per: 'hh', q: 1, u: 'radio', p: 'radios', ptu: 'rádio', ptp: 'rádios' },
    { id: 'firstaid', cat: 'Gear', en: 'First-aid kit', pt: 'Estojo de primeiros socorros', per: 'n5', q: 1, u: 'kit', p: 'kits', ptu: 'estojo', ptp: 'estojos', note: 'One per 5 people. See the first-aid kit guide.' },
    { id: 'ext', cat: 'Gear', en: 'Fire extinguisher and carbon monoxide alarm', pt: 'Extintor e alarme de monóxido de carbono', per: 'hh', q: 2, u: 'item', p: 'items', ptu: 'unidade', ptp: 'unidades' }
  ];
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
  function compute(country, people, days, opt) {
    opt = opt || {}; var b = band(days), us = country === 'us', lt = opt.lt !== false && days >= 365;
    var kids = Math.min(opt.kids || 0, people), eaters = people - kids + kids * 0.6;
    var food = [], kcal = 0, grams = 0;
    ITEMS.forEach(function (it) {
      if ((us && it.nous) || (!us && it.nopt)) return;
      var r = it.r[b]; if (!r) return;
      var pk = (us ? it.us : it.ptk) || it.us || it.ptk || { g: 500, u: 'pack', p: 'packs' };
      var shelf = lt && it.lt ? it.lt : it.shelf, total = r * eaters * days, perYear = r * eaters * 365;
      var keep = total, cap = '', years = 0;
      if (days / 365 > shelf) { keep = Math.min(total, perYear * shelf); years = shelf; }
      var packs = ceil(keep / pk.g);
      kcal += r * (it.kcal / 100); grams += keep;
      food.push({ id: it.id, cat: it.cat, name: us ? it.en : (it.pt || it.en), alt: us ? '' : (it.en && it.en !== it.pt ? it.en : ''), fav: !!it.fav, cook: !!it.cook,
        total: total, keep: keep, packs: packs, unit: packs === 1 ? pk.u : pk.p, rotate: years, perDay: r, note: it.note || '', shelf: shelf });
    });
    var perDayKcal = 0; ITEMS.forEach(function (it) { if ((us && it.nous) || (!us && it.nopt)) return; if (it.r[b]) perDayKcal += it.r[b] * it.kcal / 100; });
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
      nf.push({ id: it.id, cat: it.cat, name: us ? it.en : it.pt, alt: us ? '' : it.en, q: q, unit: us ? (q === 1 ? it.u : it.p) : (q === 1 ? it.ptu : it.ptp), note: it.note || '' });
    });
    return { country: country, people: people, days: days, band: b, food: food, water: water, nonfood: nf, perDayKcal: perDayKcal, grams: grams, eaters: eaters, longPack: lt };
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
      'Do not rely on the planner for medicine quantities.',
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
        'The US list uses pounds, ounces and 15 oz cans. The Portugal list uses kilograms and the cans and packs you find in Portuguese shops, with Portuguese names next to the English.',
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
      'Portugal: the 72 hour kit is quoted from a Portuguese news site that cites ANEPC and the EU. We did not find the ANEPC page.'
    ]
  };
  if (window.LOAD_CORE && window.LOAD_CORE.guides) {
    guide.do = guide.do; guide.source = guide.sources[0][1];
    window.LOAD_CORE.guides.push(guide);
  }
  window.LOAD_STOCK = { items: ITEMS, nonfood: NONFOOD, periods: PERIODS, sizes: SIZES, compute: compute, fmtMass: fmtMass, band: band, waterCapDays: WATER_CAP_DAYS, waterLitres: WATER_L };
  if (typeof module !== 'undefined') module.exports = window.LOAD_STOCK;
})();
