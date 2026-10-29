/* Part 3: DIY food production and lawful food-catching. Adds lessons, crop cards, plant cards, legality gates, diet options and place sections.
   Written 29 Oct 2026 from the owner's Part 3 files (3A to 3D, read in full), a few search results, and general practice.
   Nothing here states that a place, a supplier, a planting date, a fishing rule or water is verified. Not medical advice. */
(function () {
  var NOTE = 'We read search results and the owner Part 3 files about these pages. We could not open the pages themselves, so they are cited to us, not checked by us.';
  var GEN = 'The steps marked as general guidance, and the tips, are common practice. We did not find a named source for each step.';
  var SRC = {
    unh: ['UNH Cooperative Extension: growing vegetables in containers, cited to us, not checked', 'https://extension.unh.edu/resource/growing-vegetables-containers-fact-sheet'],
    uvm: ['University of Vermont Extension: saving vegetable seeds, cited to us, not checked', 'https://www.uvm.edu/extension/news/saving-seeds-vegetable-crops'],
    ufifas: ['UF/IFAS: container growing media, cited to us, not checked', 'https://gardeningsolutions.ifas.ufl.edu/plants/edibles/vegetables/container-media/'],
    dgrmGear: ['Portugal DGRM: permitted and prohibited recreational marine fishing gear, cited to us, not checked', 'https://dgrm.pt/pt/web/guest/artes-e-utensilios-de-pesca'],
    dgrmZones: ['Portugal DGRM: fishing zones and the freshwater distinction, cited to us, not checked', 'https://www.dgrm.pt/web/guest/zonas-de-pesca'],
    dgrmLic: ['Portugal DGRM: recreational licences, cited to us, not checked', 'https://dgrm.pt/licencas'],
    fwcFresh: ['Florida FWC: freshwater fishing regulations, cited to us, not checked', 'https://myfwc.com/fishing/freshwater/regulations/'],
    fwcBait: ['Florida FWC: taking bait, cited to us, not checked', 'https://myfwc.com/fishing/freshwater/regulations/taking-bait/'],
    cdcPreg: ['CDC: high-risk food guidance for pregnancy, cited to us, not checked', 'https://www.cdc.gov/food-safety/foods/pregnant-women.html'],
    usdaAllium: ['USDA plant guide: wild onions (Allium), cited to us, not checked', 'https://plants.usda.gov/DocumentLibrary/plantguide/pdf/pg_alun.pdf'],
    infopedia: ['Infopedia (Portugal): aipo, wild celery, cited to us, not checked', 'https://www.infopedia.pt/$aipo'],
    umassLettuce: ['UMass Extension: prickly lettuce, cited to us, not checked', 'https://extension.umass.edu/weed-herbarium/weeds/lactuca-serriola/'],
    ucanrLettuce: ['UC IPM: prickly lettuce, cited to us, not checked', 'https://ipm.ucanr.edu/weeds-identification-gallery/prickly-lettuce/'],
    naturespot: ['NatureSpot (UK): prickly lettuce and great lettuce, cited to us, not checked', 'https://www.naturespot.org/node/2058'],
    b12: ['PubMed: vitamin B12 and vegetarian diets, cited to us, not checked', 'https://pubmed.ncbi.nlm.nih.gov/25369926/']
  };
  var G = [];
  function add(g) { g.checkedOn = '29 Oct 2026'; g.status = 'partly'; g.difficulty = g.difficulty || 'Practical'; g.source = g.sources.length ? g.sources[0][1] : ''; G.push(g); }
  function find(id) { var gs = (window.LOAD_CORE && window.LOAD_CORE.guides) || []; for (var i = 0; i < gs.length; i++) if (gs[i].id === id) return gs[i]; return null; }
  function patch(id, fn) { var g = find(id); if (g) fn(g); }
  var GATE = 'CHECK THE RULES FIRST. Legal status is not verified for your place. No emergency or power cut gives an automatic right to fish, trap, hunt, gather or enter private land. Do the 10 checks, then decide.';
  var PT = 'Portugal: for recreational marine fishing, DGRM prohibits traps, including cages, pots, baskets and other traps. Do not use this in Portuguese sea water.';
  var FL = 'Florida: some minnow traps are allowed under specific FWC rules. A home made bottle may not meet the size, species, place or marking rules.';
  var HOWTO = 'The steps below show how a device is built and used. Check the rules first with the Lawful food-catching checklist, and write the answers on paper.';

  /* ---------- LEGAL GATE ON TRAP GUIDES ---------- */
  patch('trap-fish-bottle', function (g) {
    g.title = 'Bottle trap: how to build and use it (check the rules first)';
    g.intro = 'A 2 litre bottle can be cut into a funnel trap. This guide shows how it works. Legal status is not verified, so check the rules first. Rod and line is easier to check and more selective.';
    g.first = [GATE, PT, FL, 'Do the Lawful food-catching checklist first. If an answer is unknown, write LEGALITY UNCONFIRMED on your paper. Rod and line is the easier choice. If you go ahead, you carry the risk: check the trap often and take all gear home.'];
    g.do = [HOWTO].concat(g.do);
    g.unconfirmed = g.unconfirmed.concat(['The Portugal and Florida lines come from the owner Part 3 file and DGRM and FWC pages cited to us. We did not open them. A trap can be legal in one place and banned in the next. Check the exact water, gear and date.']);
    g.sources = (g.sources || []).concat([SRC.dgrmGear, SRC.fwcBait]);
  });
  patch('trap-crate-crab', function (g) {
    g.title = 'Crate or basket trap for crabs and crayfish: how to build and use it (check the rules first)';
    g.intro = 'A crate or basket with bait can hold crabs or crayfish. This guide shows how it works. Legal status is not verified. In many places this kind of trap is banned or needs a licence and marking, so check first.';
    g.first = [GATE, PT, 'Crab and crayfish traps are restricted in many US states too. They often need a licence, a mark, escape openings and set check times. Check first.', 'If a rule is unknown, write LEGALITY UNCONFIRMED on your paper. A hand net or a baited line is easier to check. If you go ahead, you carry the risk.'];
    g.do = [HOWTO].concat(g.do);
    g.unconfirmed = g.unconfirmed.concat(['The statement that crab and crayfish traps need a licence, mark and escape openings in many US places is general knowledge. We did not check a named source.', 'The Portugal line comes from the owner Part 3 file and a DGRM page cited to us. We did not open it.']);
    g.sources = (g.sources || []).concat([SRC.dgrmGear]);
  });
  patch('trap-live-small', function (g) {
    g.title = 'Bucket live trap for small animals: how to build and use it (check the rules first)';
    g.first = [GATE, 'Use fishing, stored food and safe plants first. Trapping uses energy and often fails.'].concat(g.first.slice(2));
    g.do = [HOWTO.replace('device is built', 'trap is built').replace('water', 'ground')].concat(g.do);
    g.unconfirmed = g.unconfirmed.concat(['No named source says a bucket trap is allowed anywhere. Treat it as not allowed until you have checked the rules for your land, the species and the season.']);
  });
  patch('trap-no-snare', function (g) {
    g.first = [GATE].concat(g.first);
  });

  /* ---------- LAWFUL CHECKLIST ---------- */
  add({ id: 'gather-legal-checklist', area: 'Food • Traps and catch', icon: 'check',
    title: 'Lawful food-catching: the 10 checks before you try',
    intro: 'Not every home made trap is legal. A device can harm protected animals, pets and people, and left gear can pollute water. Do these 10 checks first and write the answers on paper. If an answer is unknown, write LEGALITY UNCONFIRMED.',
    first: [
      GATE,
      'A mapped river does not mean public access. Private land needs the owner permission.',
      'If any rule or safety condition is unknown, use rod and line, stored food or garden food instead.',
      'Write the answers on paper. Keep the paper with your gear.'
    ],
    do: [
      'Check 1. Write the country, state or region, who owns or manages the land, and the exact water body.',
      'Check 2. Confirm the species you may take, the season, and whether the place is protected or no-take.',
      'Check 3. Confirm the exact gear or trap type, its size, net mesh, bait, marking, how often you must check it, and where it may be used.',
      'Check 4. Confirm whether you need a licence or permission. Private land needs separate permission.',
      'Check 5. Check flood warnings, currents, tides, water quality and safe bank access. Never go into dangerous water to fetch gear.',
      'Check 6. Confirm the size, bag limits and what you must release.',
      'Check 7. Check fish advisories, shellfish closures, pollution and algae warnings.',
      'Check 8. Choose gear that lets you release a catch quickly and safely. Do not leave gear that can tangle animals unattended.',
      'Check 9. Prepare clean tools, safe water, a cooler with ice and a food thermometer.',
      'Check 10. If a rule or safety fact is unknown, write LEGALITY UNCONFIRMED. Prefer rod and line or another food source. If you go ahead, you carry the risk: keep gear selective, check it often and take it all home.',
      'Who sets the rules for your place: see the table below. It is a research list, not a verified rule. Always check the current rule.'
    ],
    sections: [
      { h: 'Safer ways to get protein than trapping', items: [
        'Hook and line (pesca à linha). Often easier to check and more selective. Rules still apply. Use barbless hooks if required. Identify fish and release protected ones.',
        'Approved shellfish gathering (apanha de marisco autorizada). Only during confirmed openings, for allowed species, methods and sizes. Cooking does not make every biotoxin safe.',
        'Calorie-dense crops. Potatoes and suitable dry beans take time but avoid wildlife risks.',
        'Stored protein. Keep canned fish, beans and lentils. Do not count on a catch.'
      ] },
    ],
    table: { head: ['Place', 'Authority to check'], rows: [
      ['San Pedro, California', 'California Department of Fish and Wildlife. Coastal marine rules and closures'],
      ['Palmdale, California', 'California Department of Fish and Wildlife. Private and public land access'],
      ['Los Angeles, California', 'California Department of Fish and Wildlife and property rules'],
      ['Valencia (Santa Clarita), California', 'California Department of Fish and Wildlife'],
      ['Jacksonville, Florida', 'Florida Fish and Wildlife Conservation Commission. Salt or fresh water'],
      ['Orlando, Florida', 'Florida Fish and Wildlife Conservation Commission. Freshwater rules'],
      ['Conway, South Carolina', 'South Carolina Department of Natural Resources. Public water access'],
      ['Ohio (choose your county first)', 'Ohio Department of Natural Resources. County park rules'],
      ['Coimbra, Portugal', 'ICNF for fresh water. DGRM for marine waters'],
      ['Lisboa, Portugal', 'DGRM and ICNF, depending on the water'],
      ['Porto, Portugal', 'DGRM and ICNF, by water and activity'],
      ['Setúbal, Portugal', 'DGRM, ICNF and protected-area rules']
    ] },
    warn: [
      PT,
      FL,
      'Do not eat shellfish or fish if there is a closure, a health advisory or a bloom warning. If you cannot check, do not eat.',
      'Do not set gear in dangerous water or near swimmers and boats.'
    ],
    tip: ['Write "LEGALITY UNCONFIRMED" on any home made model so no one deploys it by mistake.'],
    after: ['Keep your answers. If you check again later, update them with the date.'],
    sources: [SRC.dgrmGear, SRC.dgrmZones, SRC.dgrmLic, SRC.fwcFresh, SRC.fwcBait, SRC.cdcPreg],
    unconfirmed: [NOTE,
      'The 10 checks, the safe alternatives and the Portugal and Florida lines come from the owner Part 3D file, which cites the DGRM, FWC and CDC pages above. We did not open those pages. Rules change by place, water, species and date. We have verified no local rule.',
      'The table of authorities is the owner research list. We did not check that each authority covers each water.',
      GEN] });

  add({ id: 'gather-diy-safe-projects', area: 'Food • Traps and catch', icon: 'toolbox',
    title: 'Safe DIY fishing helpers: gear box, measuring board, catch cooler',
    intro: 'These three projects help you fish within the rules. None of them catches wildlife. Make them while you have time.',
    first: [
      'Make these before you fish, not on the bank.',
      'Use only the numbers on the current official rule. Do not guess a size.',
      'Keep hooks in a closed box away from children and pets.',
      'Keep raw fish cold and apart from other food.'
    ],
    sections: [
      { h: 'Fishing gear box', items: [
        'Materials: a clean small box, cardboard dividers, small labelled bags, tape, a marker, a ruler.',
        'Step 1. Wash and dry the box. Step 2. Make compartments for legal hooks, line, weights and a ruler. Step 3. Keep sharp hooks in a closed container. Step 4. Add a printed copy of the local rules and the 10 checks. Step 5. Store it out of reach of children and pets.'
      ] },
      { h: 'Fish measuring board', items: [
        'Materials: a smooth board or a waterproof cutting mat, a ruler, a permanent marker, tape. Round the edges.',
        'Step 1. Find the exact length rule for your water. Total length and fork length can differ. Step 2. Fix a ruler or waterproof scale to the board. Step 3. Mark the size limits from the current official rule. Step 4. Check the scale with a ruler. Step 5. Keep it clean and use it quickly so a prohibited fish can be released.'
      ] },
      { h: 'Catch cooler kit', items: [
        'Materials: a clean food-safe cooler, ice or ice packs, a food thermometer, a sealed container, gloves, a bag for waste.',
        'Step 1. Clean the cooler. Step 2. Add ice so the fish stay cold. Step 3. Keep raw fish apart from ready food. Step 4. Keep fish out of dirty water. Step 5. Cook promptly to a safe temperature, usually 145 F (63 C) for fish. Throw out fish that were not kept cold.'
      ] }
    ],
    do: [
      'Wash your hands before and after handling fish.',
      'Scale, gut and rinse fish in clean water.',
      'Cook the flesh until it is opaque and flakes.'
    ],
    warn: ['Do not use guessed size limits.', 'Do not leave hooks or line in the water or on the bank.', 'Discard fish that smell bad or were left warm.'],
    tip: ['A cheap thermometer makes cooking safe.'],
    after: ['Clean everything and dry it before storing.'],
    sources: [SRC.dgrmLic, SRC.fwcFresh],
    unconfirmed: [NOTE, 'These three projects come from the owner Part 3D file. The 145 F (63 C) figure for fish is common food safety advice. We did not find a named source in this search. ' + GEN] });

  /* ---------- SEED AND CROP LESSONS ---------- */
  add({ id: 'gr-crop-cards', area: 'Home skills • Grow food', icon: 'calendar',
    title: 'Crop cards: how long, how big, what to expect',
    intro: 'These are planning ranges, not promises. Seed age, temperature, light and season change the result. Follow a seed packet and your local calendar when you have them.',
    first: [
      'Start with fast crops: radish, lettuce, pea shoots.',
      'Choose a container big enough for the crop.',
      'Plan for a lot of light. A dim window is not enough for tomatoes and peppers.',
      'Keep your stored food. Plants take time and can fail.'
    ],
    do: [
      'Pick one or two crops from the table.',
      'Check the Time to harvest and the Space columns.',
      'Test your seed first with the 10-seed test.',
      'Write the planting date in a notebook and check the result.'
    ],
    table: { head: ['Crop (English / Portuguese)', 'Seed comes up', 'First useful harvest', 'Space and notes'], rows: [
      ['Radish / rabanete', '3 to 10 days', '25 to 45 days', 'Small deep pot, cool weather. You eat the root.'],
      ['Leaf lettuce / alface', '4 to 14 days', '30 to 60 days', 'Cut outer leaves. Bright window or lamp.'],
      ['Pea shoots / rebentos de ervilha', '5 to 12 days', '2 to 4 weeks', 'Use seed meant for growing. Cook if risk is a concern.'],
      ['Bush beans / feijão anão', '5 to 12 days', '50 to 75 days', 'Big pot, strong light. Cook beans well.'],
      ['Green onion from seed / cebolinha', '7 to 21 days', 'About 60 to 100 days', 'Slow from seed. Regrowing bases is quicker for greens.'],
      ['Tomato / tomate', '5 to 14 days', 'About 60 to 100 days or more after transplant', 'Strong light, a large pot, support and pollination.'],
      ['Pepper / pimento', '7 to 21 days or more', 'About 60 to 100 days or more after transplant', 'Warmth and a long season.'],
      ['Pumpkin / abóbora', '5 to 14 days', 'About 90 to 120 days or more', 'Usually outdoors. Needs a large area for vines.']
    ] },
    warn: ['Do not count on indoor crops to feed a household in a crisis. They are a supplement.', 'Wash all produce in safe water before eating.'],
    tip: ['Start a new row every 2 weeks so something is always ready.'],
    after: ['Write what grew well so you can repeat it.'],
    sources: [SRC.unh, SRC.uvm, SRC.ufifas],
    unconfirmed: [NOTE, 'These ranges come from the owner Part 3A file and are described there as general planning estimates. They change with seed, light and warmth. We did not check each number against a named source. ' + GEN] });

  function lesson(o) {
    add({ id: o.id, area: 'Home skills • Grow food', icon: o.icon || 'leaf', title: o.title, intro: o.intro,
      first: o.first, do: o.steps,
      sections: [
        { h: 'Materials', items: o.materials },
        { h: 'Time to harvest', items: o.time },
        { h: 'Common mistakes', items: o.mistakes }
      ],
      warn: o.warn, tip: o.tip, after: o.after, sources: o.sources || [SRC.unh, SRC.ufifas],
      unconfirmed: [NOTE, o.note || '', 'The steps come from the owner Part 3B file. Times and container sizes are planning ranges and change with light, warmth and seed. ' + GEN].filter(Boolean) });
  }

  lesson({ id: 'gr-lettuce-indoors', title: 'Grow lettuce indoors in a reused tub (4 to 8 weeks)',
    intro: 'Leaf lettuce is the easiest food to start indoors. You pick the outer leaves and let it keep growing.',
    first: ['Use a shallow, wide container with drainage and a tray.', 'Use fresh potting mix.', 'Give bright light. Lettuce needs strong light even in a window.', 'Wash the leaves before you eat them.'],
    steps: ['Step 1. Wash the container. Add drainage holes. Put it on a tray.', 'Step 2. Fill with moist potting mix, about 15 cm (6 in) deep.', 'Step 3. Sow lettuce seed shallowly, as the packet says. Do not sow a thick carpet.', 'Step 4. Label the date and the crop.', 'Step 5. Keep the soil evenly damp until seedlings appear (4 to 14 days).', 'Step 6. Move into bright light. Turn the pot if plants lean toward the window.', 'Step 7. Thin so each plant has room.', 'Step 8. Water at soil level when the top starts to dry. Do not leave the pot in standing water.', 'Step 9. Feed as the fertilizer label says, if needed.', 'Step 10. Harvest outer leaves when large enough. Leave the centre to grow.', 'Step 11. Check for insects, mildew or rot. Remove spoiled leaves.'],
    materials: ['Lettuce seed, untreated.', 'A shallow wide container at least 15 cm (6 in) of mix deep, with drainage.', 'A tray, potting mix, clean water, scissors, a label.', 'Light: a bright window or a lamp.'],
    time: ['Seeds come up in 4 to 14 days.', 'First leaves to cut in about 30 to 60 days.', 'Expect a small supplement, not a full meal.'],
    mistakes: ['Too little light: tall, thin plants. Move to a brighter place.', 'Too much water: rot and flies. Water less.', 'Sowing too thick: weak plants. Thin them.', 'Picking the centre: the plant stops. Pick outer leaves.'],
    warn: ['Do not use a container that held chemicals, paint, oil or fuel.', 'Do not eat spoiled or slimy leaves.'], tip: ['Sow a new tub every 2 weeks.'], after: ['Save seed from one plant that bolts.'] });

  lesson({ id: 'gr-radish-tub', title: 'Grow radishes in a reused tub (4 to 7 weeks)',
    intro: 'Radishes grow fast and fill a small pot. You eat the root and the young leaves.',
    first: ['Use a container 15 to 20 cm (6 to 8 in) deep with drainage.', 'Use loose potting mix.', 'Radishes like cool, mild weather.', 'Thin early. Crowding makes leaves but small roots.'],
    steps: ['Step 1. Use a container about 15 to 20 cm (6 to 8 in) deep with holes and a tray.', 'Step 2. Fill with loose, moist potting mix.', 'Step 3. Sow seed as the packet says, with space for the roots to grow.', 'Step 4. Keep moist but not standing in water.', 'Step 5. Put in bright light, cool to mild warmth.', 'Step 6. Thin seedlings early so roots have room.', 'Step 7. Check the size of the roots as harvest time nears.', 'Step 8. Pull one to test. Harvest when roots are about the size of a large marble or as the packet says.', 'Step 9. Wash the whole crop in safe water before eating.'],
    materials: ['Radish seed, untreated.', 'A tub 15 to 20 cm (6 to 8 in) deep with drainage and a tray.', 'Loose potting mix, clean water, a label.', 'Bright light.'],
    time: ['Seed comes up in 3 to 10 days.', 'Roots ready in about 25 to 45 days.'],
    mistakes: ['Crowded seed: leaves but no roots. Thin early.', 'Too warm: roots turn woody or the plant bolts. Choose cool weather.', 'Leaving them too long: roots crack. Harvest on time.'],
    warn: ['Wash well. Roots grow in soil.', 'Do not use soil from a polluted spot.'], tip: ['The young green leaves are edible. Cook them or add them to soup.'], after: ['Sow again in 2 weeks.'] });

  lesson({ id: 'gr-tomato-bucket', title: 'Grow a dwarf tomato in a food-grade bucket (months)',
    intro: 'Tomatoes give real food but need a lot of light, a large pot and time. Plan for months. Choose a dwarf kind.',
    first: ['Choose a compact or dwarf kind, not a large vine.', 'Plan for strong light. A winter windowsill is usually not enough.', 'Use a large food-grade bucket with drainage.', 'Never let water collect under the pot.'],
    steps: ['Step 1. Choose a compact or dwarf cultivar.', 'Step 2. Start seed in a small clean pot. Keep it warm and bright.', 'Step 3. When true leaves develop, move the seedling to a large food-grade bucket with drainage and potting mix.', 'Step 4. Give very strong light, much more than a typical winter window.', 'Step 5. Add a stable support before the plant gets heavy.', 'Step 6. Water deeply, then let the mix dry a little. Never leave water under the pot.', 'Step 7. Feed with a fertilizer made for edible container crops, as the label says.', 'Step 8. Indoors with no insects, gently shake flowering stems each day so pollen moves.', 'Step 9. Check leaves for pests. Use only products labelled for food crops and indoor use.', 'Step 10. Pick ripe fruit. Wash it. Check for spoilage.'],
    materials: ['Tomato seed or a seedling, dwarf kind.', 'A food-grade bucket, about 15 to 20 L or more, with drainage holes.', 'Potting mix, a stake or cage, fertilizer for edible crops, a tray.', 'Strong light: a sunny balcony or a grow lamp.'],
    time: ['Seed comes up in 5 to 14 days.', 'Fruit in about 60 to 100 days or more after transplant.', 'A long project. Do not count on it for early food.'],
    mistakes: ['Not enough light: tall weak plants, no fruit.', 'Too little help with pollination indoors.', 'Overwatering: rot.', 'No support: the plant falls over.', 'Using a large pot with no drainage.'],
    warn: ['Keep lamp cords and plugs away from water.', 'Do not eat the leaves or green parts of tomato plants.', 'Wash hands and fruit.'], tip: ['Grow one or two plants well rather than many badly.'], after: ['Save seed from your best ripe fruit.'] });

  lesson({ id: 'gr-potato-container', title: 'Grow potatoes in a deep container',
    intro: 'Potatoes are real food. They need a deep container, strong light and months. Use healthy seed potatoes if you can.',
    first: ['Do not eat green potatoes or sprouts. They contain toxins.', 'Use healthy, disease-free seed potatoes if you can. Grocery potatoes may carry disease or be treated to stop sprouting.', 'Use a clean container of 30 litres or more, with drainage.', 'Keep harvested potatoes in the dark.'],
    steps: ['Step 1. Choose firm, disease-free seed potatoes with healthy eyes. Skip rotten or mouldy ones.', 'Step 2. Use a clean 30 L or larger bag or container with drainage and deep potting mix.', 'Step 3. Plant under several centimetres of mix, with shoots facing up.', 'Step 4. Give strong light. Protect from frost and extreme heat.', 'Step 5. As shoots grow, add mix around the stems. Do not bury all the leaves.', 'Step 6. Keep moderately moist and feed as the label says.', 'Step 7. Watch for disease and rot. Remove suspect plants.', 'Step 8. Harvest when the plant dies back or as the variety says.', 'Step 9. Keep harvested potatoes dark. Never eat green, bitter or spoiled ones.'],
    materials: ['Seed potatoes or healthy sprouted potatoes.', 'A container of 30 L or more with drainage, or a strong fabric bag.', 'Potting mix, clean water, a tray or saucer.', 'Strong light and space.'],
    time: ['Months. Usually about 3 to 5 months, depending on the kind and the season.', 'Not a quick food.'],
    mistakes: ['Planting soft or diseased potatoes.', 'Too small a container.', 'Letting tubers turn green in the light.', 'No drainage: rot.', 'Not adding soil as the stems grow.'],
    warn: ['Do not eat green potatoes, sprouts, or the leaves and fruit of potato plants.', 'Throw away any potato that is deeply green or bitter.'], tip: ['Dry cut seed pieces for 1 to 2 days before planting, so they do not rot.'], after: ['Eat small potatoes first. Keep the best for seed.'],
    sources: [SRC.unh, SRC.ufifas], note: 'The green potato warning matches Purdue Extension as quoted to us in another guide. We did not find a named source for the harvest time.' });

  add({ id: 'gr-no-electricity', area: 'Home skills • Grow food', icon: 'sun',
    title: 'Indoor growing with no electricity, for older adults and homes with pets',
    intro: 'A grow lamp needs power. If the power is out, plan for daylight. This guide shows how to adapt and how to keep everyone safe.',
    first: [
      'Do not count on an electric lamp if you have no backup power. A battery power station may not run a lamp long enough.',
      'Grow greens, herbs and starter plants indoors. Use outdoor space for bigger crops when it is safe.',
      'Track water every day. Even a windowsill garden needs clean water.',
      'Candles and room lamps are not strong enough to grow food. Never use a flame as a plant light.'
    ],
    do: [
      'Use daylight crops: lettuce, radish, herbs, green onions, pea shoots.',
      'Measure your light. Note which window gets real sun for 6 or more hours.',
      'Water by hand. A small gravity-fed system from food-safe materials and a clean reservoir can work. Empty and clean stale water often.',
      'Heat behind glass can hurt plants. Open a window for air without chilling the room.',
      'Make a raised table garden for a person who sits: lightweight soil, small watering jugs, clear walking space.',
      'Put heavy pots low and where they cannot fall.',
      'Keep fertilizer, tools, potting mix bags and toxic plants away from children and dogs.',
      'Wear gloves for soil if you want. Wash your hands and the vegetables.',
      'Fix mould and damp early. Do not let a growing room become humid.'
    ],
    sections: [
      { h: 'Choose your set-up', items: [
        'Windowsill: low cost. Often not bright enough for tomatoes or peppers. Measure real light.',
        'Grow light: use a proper electric lamp, mount it as the maker says, and keep water away from plugs and power strips. A power station may not run it for a long outage.',
        'Balcony or doorstep: often better light. Check weight, wind, your landlord rules and fall risk. Never put pots where they can fall on people.',
        'Accessible table garden: raise plants to seated height, use light soil and small watering jugs.'
      ] },
      { h: 'Protect people and pets', items: [
        'Pregnant people, older adults and people with weak immune systems should avoid raw sprouts. Cook sprouts well.',
        'Five small dogs: keep plants and soil out of reach. Know every plant by name. Some are poisonous to dogs.',
        'Keep cords and lamps dry and away from cloth.'
      ] }
    ],
    warn: ['No flames for plant light. Fire risk.', 'Do not place heavy pots where they can fall.', 'Do not water near plugs or power strips.'],
    tip: ['Face plants to the window and turn them every few days.'],
    after: ['Keep a daily water and light note.'],
    sources: [SRC.unh, SRC.ufifas],
    unconfirmed: [NOTE, 'This guide comes from the owner Part 3B file. It is general practice. We did not find a named source for each point. ' + GEN] });

  add({ id: 'gr-troubleshoot', area: 'Home skills • Grow food', icon: 'search',
    title: 'Plant problems: what you see and what to do',
    intro: 'Most problems come from light, water or crowding. Use this chart before you throw a plant away.',
    first: ['Look at the whole plant, the soil and the container.', 'Change one thing at a time.', 'Write what you changed and the date.', 'Throw out plants with mould or bad smells. Start again in a clean container.'],
    do: [
      'Check the light. Is it bright for many hours?',
      'Check the water. Is the top of the soil dry or soggy?',
      'Check the drainage holes. Are they open?',
      'Check for crowding. Thin seedlings with scissors.',
      'Check for insects under leaves. Wipe them off.',
      'Check for mould. Remove it. Improve air.'
    ],
    table: { head: ['What you see', 'Likely cause', 'What to do'], rows: [
      ['No seeds sprout', 'Old, cooked, treated, immature, too cold or too wet', 'Do the 10-seed test. Use fresh seed. Use the right warmth.'],
      ['Tall, thin, weak seedlings', 'Not enough light', 'Move to a brighter place or use a lamp. Do not overheat.'],
      ['Seedlings fall over at the soil', 'Damping-off disease, crowding, wet soil', 'Start again in clean pots and mix. Water less. Give more air.'],
      ['Yellow leaves', 'Too much water, weak light or hungry soil', 'Check moisture. Add balanced feed as the label says.'],
      ['Soil always soggy', 'No drainage or a pot too big', 'Add holes. Use the right mix.'],
      ['White fuzz or bad smell', 'Mould or old organic matter', 'Remove it. Do not eat contaminated sprouts.'],
      ['Flowers but no fruit', 'Light, pollination or temperature', 'Improve light. Shake flowers gently.'],
      ['Green algae and flies', 'Standing water', 'Water less. Drain trays. Improve air.'],
      ['Brown dry edges', 'Drying, too much salt from feed, or heat', 'Water steadily. Feed less. Move from heat.'],
      ['Pot cracks or leaks', 'Weak recycled container', 'Move to a strong food-grade pot.']
    ] },
    warn: ['Never eat plants with mould, rot or a bad smell.', 'Do not use pesticides unless the label says they are for indoor food plants.'],
    tip: ['A notebook of problems and fixes becomes your best guide.'],
    after: ['Clean the container before you reuse it.'],
    sources: [SRC.unh, SRC.ufifas],
    unconfirmed: [NOTE, 'The chart combines the troubleshooting tables in the owner Part 3A and 3B files. The causes and fixes are general practice. ' + GEN] });

  add({ id: 'gr-reality-check', area: 'Home skills • Grow food', icon: 'alert',
    title: 'What indoor food can and cannot do: a plain reality check',
    intro: 'Herbs and leafy greens can supplement meals. They are not a quick replacement for stored food. This guide shows what to expect and when.',
    first: [
      'Indoor crops alone cannot feed a household in an emergency.',
      'Keep your stored food. Plants take time and can fail.',
      'Use the plan below to set honest goals.',
      'Check the hygiene list before you eat what you grow.'
    ],
    do: [
      'Day 1 to 7. Set up containers, test seeds, root green onion bases. Goal: a working set-up. You will not have new calories yet.',
      'Week 2 to 4. Some new onion leaves, pea shoots or leafy greens. Goal: small fresh harvests. Not enough for a whole household.',
      'Week 4 to 8. Some lettuce and radishes if light is good. Goal: salad and garnish.',
      'Month 2 to 4 or more. Some beans, herbs and leafy greens. Fruit crops may still be far away.',
      'Month 3 to 6 or more. Some tomatoes, peppers and potatoes in the right conditions. Weather, light and pests can cause losses.',
      'Year 1 or more. Build compost, a seed reserve and a yearly plan. This does not guarantee self-sufficiency.'
    ],
    sections: [
      { h: 'Real harvest or leaf regrowth', items: [
        'Leaf regrowth: green onions, lettuce, celery and carrot tops use the energy in the base to push out a few more leaves. They do not make a new head or a new carrot.',
        'Real harvest: potatoes, sweet potatoes, garlic bulbs, ginger and herb cuttings can make new roots or new plants if they have soil, light and time.',
        'Plants grown from seed, such as radishes, beans and tomatoes, can give a real harvest, but take weeks or months.'
      ] },
      { h: 'Food hygiene from home-grown crops', items: [
        'Wash produce with safe water. Do not wash with soap or bleach.',
        'Keep irrigation water away from sewage, floodwater and chemical runoff.',
        'Do not grow food in soil near old paint, treated wood or industrial sites, or in containers of unknown history.',
        'Do not eat mouldy, rotten or unfamiliar plants or mushrooms. Some decorative plants look like food plants and are toxic.',
        'Cooking helps with germs. It does not remove chemicals or natural toxins.',
        'Check produce after a power cut. Store food on clean surfaces with clean tools.'
      ] },
      { h: 'Local planting calendar (fill in for your place)', items: [
        'Planting dates for your place are NOT VERIFIED here. Use your own notebook and what neighbours who garden tell you, if you can reach them.',
        'Write: your place, elevation, soil, safe water source. Then for lettuce, peas, beans, tomatoes and potatoes: start indoors, move outdoors, harvest estimate and notes.'
      ] }
    ],
    warn: ['Do not treat any of this as a guarantee of food, yield or safety.', 'A dark room without a lamp is not a garden.'],
    tip: ['Pick the first crop for speed and the second for calories.'],
    after: ['Review after 4 weeks. Keep what worked.'],
    sources: [SRC.unh, SRC.uvm],
    unconfirmed: [NOTE, 'The timeline and the hygiene list come from the owner Part 3C file. They are general planning ranges. ' + GEN, 'Local planting dates are intentionally left blank. We did not find verified calendars for the 12 places.'] });

  /* ---------- PLANT CARDS ---------- */
  /* Rule from the owner: a guide must not send people to stores or offices during an emergency. Each card says what you may already have, how to get it with no store, and what grows wild (only what a source supports). */
  var NOSTORE = 'With no store: ask a neighbour, trade, or use seed and cuttings you saved yourself. Buying seed and potting mix is for planning before a crisis, not an emergency step.';
  var LOOK = 'Never eat a wild plant you cannot name for certain. See How to know which plants can be eaten.';
  add({ id: 'gr-plant-cards', area: 'Home skills • Grow food', icon: 'leaf',
    title: 'Plant cards: 10 kitchen plants, what they are, how to get them with no store',
    intro: 'Each card names the plant in English and Portuguese, shows the part you use, says what you really get, and says how to get it when shops are closed. The pictures keep their words.',
    first: [
      'Only leaf regrowth is promised for onions, green onions, lettuce, celery and cabbage. Do not expect a new head or bulb.',
      'Real harvest is possible with potatoes, garlic (months), ginger (slow), basil and mint cuttings, peppers and tomatoes.',
      'Do not plan on stores. Start from what is in your kitchen, your yard and your neighbours. Buying seed is for planning before a crisis.',
      'Cut potatoes need to dry first. The picture shows them in water. Follow the card.'
    ],
    sections: [
      { h: 'Onions / cebolas', img: 'assets/pics/scrap-onions.jpg', alt: 'Four steps: onion root end in water, green shoots, in a pot, in a box.', items: ['Name: onion / cebola. Part you use: the root end of an onion with the base.', 'What you get: green tops to cut. A full new bulb needs a full season in soil. Water alone gives only green tops.', 'Time: green shoots in 1 to 2 weeks.', 'At home now: any onion in the pantry that has started to sprout.', NOSTORE, 'Wild: wild onions (Allium) grow in many places. USDA plant guides say several California wild onions have edible leaves and bulbs. We did not find which kinds grow near each of your places. Some are uncommon: do not dig them up unless you must. ' + LOOK, 'Deadly look-alikes: death camas and lily of the valley. A true wild onion smells strongly of onion or garlic when crushed. If there is no onion smell, do not eat it. The smell on your fingers can fool you, so crush a fresh leaf each time.', 'Warning: do not eat sprouts that smell rotten. Discard slimy onions.'] },
      { h: 'Garlic / alho', img: 'assets/pics/scrap-garlic.jpg', alt: 'Four steps: garlic cloves, cloves in water, green shoots, green shoots in soil.', items: ['Name: garlic / alho. Part you use: a sound clove.', 'What you get: garlic greens in 1 to 2 weeks. A full bulb takes many months and the right season.', 'Time: greens in 1 to 2 weeks. Bulbs: many months.', 'At home now: cloves in your pantry, especially ones that have grown a green shoot.', NOSTORE, 'Wild: wild garlic grows in some places. We found no sourced list for your towns. It has deadly look-alikes. Use the smell test and the rule above, and do not eat a plant that does not smell strongly of garlic.', 'Warning: do not use mouldy or soft cloves.'] },
      { h: 'Ginger / gengibre', img: 'assets/pics/scrap-ginger.jpg', alt: 'Four steps: ginger in water, shoots, in soil, a plant growing.', items: ['Name: ginger / gengibre. Part you use: a plump piece with buds.', 'What you get: a slow plant. Harvest takes many months.', 'Time: new shoots in weeks. A usable root in 8 to 10 months or more.', 'At home now: a piece of ginger root in the kitchen.', NOSTORE, 'Wild: we found no wild ginger to eat near your places. A plant called wild ginger is a different plant. We did not confirm it is safe. Do not eat it.', 'Warning: do not use dried, shrivelled or mouldy pieces.'] },
      { h: 'Pineapple / ananás', img: 'assets/pics/scrap-pineapple.jpg', alt: 'Four steps: pineapple top in water, roots, in a pot, a pineapple plant.', items: ['Name: pineapple / ananás. Part you use: the leafy top.', 'What you get: a plant. A fruit takes about two years or more. This is not a quick food and is not realistic indoors in most homes.', 'Time: roots in a few weeks. Fruit: years.', 'At home now: only if you already have a whole pineapple with its top.', NOSTORE, 'Wild: there is no wild pineapple near your places that we found.', 'Warning: do not expect fruit. Treat this as a houseplant project, not a food plan.'] },
      { h: 'Basil and mint / manjericão e hortelã', img: 'assets/pics/scrap-basil-mint.jpg', alt: 'Four steps: cuttings in water, roots, in a pot, a bushy herb.', items: ['Name: basil / manjericão, mint / hortelã. Part you use: a 4 to 6 inch (10 to 15 cm) stem.', 'What you get: a real, permanent plant. Pinch the tops to make it bushy.', 'Time: roots in 1 to 2 weeks.', 'At home now: a potted herb, or a stem from a plant on your sill.', NOSTORE, 'Wild: wild mints grow in damp places in many regions. Our search did not return a sourced list for your places, so this is not confirmed. ' + LOOK, 'Warning: wash leaves. Keep mint out of reach if a dog chews it.'] },
      { h: 'Potatoes / batatas', img: 'assets/pics/scrap-potatoes.jpg', alt: 'Four steps: potato cut in halves, pieces in water, in a tray, a mature plant.', items: ['Name: potato / batata. Part you use: pieces with 1 or 2 eyes.', 'What you get: real harvest. New potatoes grow on buried stems.', 'Time: about 3 to 5 months.', 'At home now: any sprouting potato in your pantry. Healthy seed potatoes are best, but you may not have them.', NOSTORE, 'Wild: there is no wild potato near your places that we found. Do not eat other plants because they look like potato or tomato plants.', 'Warning: dry cut pieces for 1 to 2 days before you plant. The picture shows them in water, which can rot them. Never eat green potatoes or sprouts.'] },
      { h: 'Green onions / cebolinha', img: 'assets/pics/scrap-green-onions.jpg', alt: 'Four steps: green onion bases in water, roots, a box, a tall green crop.', items: ['Name: green onion or spring onion / cebolinha. Part you use: 4 to 6 cm (about 2 in) of white base with roots.', 'What you get: leaf regrowth only. A few cuttings, then it weakens.', 'Time: new green in about 1 week.', 'At home now: the white ends you saved from meals.', NOSTORE, 'Wild: see Onions above. Use the smell test and never eat a plant that has no onion smell.', 'Warning: change the water every day. Throw out slimy plants.'] },
      { h: 'Peppers / pimentos', img: 'assets/pics/scrap-peppers.jpg', alt: 'Four steps: pepper seeds on a towel, seedlings, a pot, a plant with fruit.', items: ['Name: pepper / pimento. Part you use: seeds from a fully ripe pepper.', 'What you get: a real harvest, but only with strong light, warmth and many weeks.', 'Time: seeds come up in 7 to 21 days or more. Fruit in about 60 to 100 days or more after transplant.', 'At home now: seeds from a ripe pepper you are about to eat. Dry them first.', NOSTORE, 'Wild: a wild pepper called chiltepin grows in parts of the southern United States. We did not confirm it near Florida or any of your places, so do not look for it.', 'Warning: wash hands after cutting hot peppers.'] },
      { h: 'Tomatoes / tomates', img: 'assets/pics/scrap-tomatoes.jpg', alt: 'Four steps: tomato seeds on a towel, seedlings, a pot, a plant with tomatoes.', items: ['Name: tomato / tomate. Part you use: seeds from a fully ripe tomato.', 'What you get: a real harvest, with strong light, a large pot and months.', 'Time: seeds come up in 5 to 14 days. Fruit in about 60 to 100 days or more after transplant.', 'At home now: seeds from a ripe tomato you are about to eat. Hybrid seed may not grow true.', NOSTORE, 'Wild: there is no wild tomato near your places that we found. Self-sown tomato plants may appear where seed fell. Do not eat other plants in the same family.', 'Warning: do not eat the leaves or green parts of the plant.'] },
      { h: 'Lettuce, celery and cabbage / alface, aipo e couve', img: 'assets/pics/scrap-lettuce-celery-cabbage.jpg', alt: 'Four steps: a lettuce base in water, new leaves, a pot, a leafy plant.', items: ['Name: lettuce / alface, celery / aipo, cabbage / couve. Part you use: a firm base with the centre.', 'What you get: leaf regrowth for a short time. A full head does not reform.', 'Time: new leaves in a few days. Growth may stall or rot.', 'At home now: the base left after you cut leaves.', NOSTORE, 'Wild lettuce: prickly lettuce is reported widespread in Europe and North America. Young leaves are edible but turn bitter, and the sap can irritate. It has a look-alike, great lettuce, with dark fruit. If unsure, leave it. ' + LOOK, 'Wild celery (aipo-silvestre): Portuguese encyclopedia says it grows on damp, flooded and salty ground near the coast in central and southern Portugal. Wild celery has deadly look-alikes in the hemlock family. Do not eat a plant that does not smell and taste like celery.', 'Wild cabbage: not confirmed.', 'Warning: refresh the water daily. Throw out slimy or smelly bases.'] }
    ],
    do: [
      'Pick a plant from the cards.',
      'Follow the strip left to right.',
      'Change the water every day for water-rooted plants.',
      'Write the date and the result.'
    ],
    warn: ['Do not eat raw green or sprouted potato parts.', 'Do not eat anything slimy, mouldy or smelly.', 'Treat pineapple, ginger and garlic bulbs as slow projects, not food for a crisis.', 'Do not eat a wild plant on a hunch. Several wild plants here have deadly look-alikes.'],
    tip: ['Start with green onions. They are quickest.'],
    after: ['After roots form, move the plant to potting mix.'],
    sources: [SRC.uvm, SRC.unh, SRC.usdaAllium, SRC.infopedia, SRC.umassLettuce, SRC.ucanrLettuce, SRC.naturespot],
    unconfirmed: [NOTE, 'The pictures were made by the owner. The cards correct what the pictures leave out: leaf regrowth only for onions and lettuce, drying cut potato, and the long time for pineapple. The times are general planning ranges. ' + GEN,
      'Wild onions: the California statement matches USDA plant guides as quoted to us. We did not find which species grow near each place, and we found nothing for Ohio, South Carolina or Florida. The deadly look-alike warning and the smell test come from several websites, many of low quality. Treat the smell test as a help, not proof.',
      'Wild celery in Portugal comes from the Infopedia encyclopedia entry as quoted to us. The hemlock-family look-alike warning is common knowledge and we did not check a named source.',
      'Prickly lettuce comes from UMass and UC IPM weed pages and a UK nature site as quoted to us. We did not open them.',
      'We found no sourced wild source for ginger, pineapple, potato, tomato, basil or cabbage near your places. Wild mint and the wild pepper chiltepin were not confirmed. Where a card says no wild source, we mean we found none, not that none exists.',
      'The "get it with no store" lines are general practice: neighbours, trading, saving your own seed and cuttings.'] });

  /* ---------- DIET ---------- */
  add({ id: 'diet-plant-based', area: 'Food • Eat and survive', icon: 'leaf',
    title: 'Vegetarian, vegan and pescatarian: stockpile and meals',
    intro: 'The Stockpile planner can now remove foods for your diet. This guide explains what changes, what to add, and what to plan for.',
    first: [
      'Open Tools, then Stockpile planner. Choose your diet.',
      'The planner removes foods that do not fit. It does not add more of the others for you.',
      'Add more beans, lentils, rice, oats, nuts and oil until calories reach your target.',
      'Vegans need a plan for vitamin B12. See below.'
    ],
    do: [
      'Vegetarian: no meat or fish. The planner removes canned tuna, sardines, salmon, canned meat, jerky, dried cod and freeze-dried meals. Dairy and eggs stay.',
      'Pescatarian: no meat but fish allowed. The planner removes canned meat, jerky and freeze-dried meals. Fish stays.',
      'Vegan: no meat, fish, dairy or eggs. The planner also removes powdered milk and powdered eggs. Choose plant milk where the list says milk.',
      'Check labels. Canned soup, crackers, bars and ready meals may contain meat, fish, dairy or egg.',
      'Cook beans safely. See Stretch rice, beans, oats and flour.',
      'Protein options: beans, lentils, chickpeas, peas, nuts, seeds, peanut butter, oats, whole grains.',
      'Recipes in this app: the rice and bean pot, oat porridge, flatbread, lentil soup and flour pancakes can be made vegan. Egg, broth from bones, and tinned fish are the non-vegan options.',
      'Grow protein: peas, beans and sprouts (cooked).',
      'Allergies: if anyone has a food allergy, remove that food from the list and check every label.'
    ],
    sections: [
      { h: 'Plan for vitamin B12 (vegans)', items: [
        'Plant foods do not reliably supply vitamin B12. People on a vegan diet need fortified foods or a supplement.',
        'Fortified foods include some breakfast cereals, plant milks and nutritional yeast. Amounts vary by brand. Check the label.',
        'Keep a supply of the supplement or fortified foods in your stockpile. Ask a doctor or pharmacist about the right amount.',
        'Older adults and people on some medicines may absorb B12 less well. Ask a doctor.'
      ] },
      { h: 'Other nutrients to watch', items: [
        'Iron, zinc, calcium, iodine and vitamin D can be low in plant-only diets. Ask a doctor or a dietitian what to store.',
        'Do not guess doses.'
      ] }
    ],
    warn: ['Not medical advice. Ask a doctor or dietitian, especially for pregnancy, children and older adults.', 'Do not rely on plants you grow for protein or vitamins in a short crisis.'],
    tip: ['Mark each recipe in your notebook: vegan, vegetarian or pescatarian.'],
    after: ['Review your stockpile every 6 months.'],
    sources: [SRC.b12],
    unconfirmed: [NOTE,
      'The B12 advice (vegans need fortified foods or supplements) matches a PubMed review as quoted to us. We could not open it. We found no NHS or NIH page in this search for iron, zinc, calcium, iodine or protein amounts.',
      'The planner removes foods by name. It does not rebalance calories or protein. It cannot tell if a canned soup or cracker contains animal products.',
      'The recipes marked vegan assume you leave out egg, bone broth and fish.',
      GEN] });

  /* ---------- PATCH EXISTING LESSONS: materials, time, mistakes ---------- */
  function addSec(id, secs, table) {
    patch(id, function (g) {
      g.sections = (g.sections || []).concat(secs);
      if (table) g.table = table;
    });
  }
  addSec('gr-find-seeds', [
    { h: 'Materials', items: ['A plate, a spoon, paper towels, a pencil, a clean glass, a strainer, small paper envelopes, and the seeds or fruit.', 'Clean water and a clean container with a lid or bag.'] },
    { h: 'Time to harvest', items: ['The 10-seed test: 3 to 14 days.', 'Drying seed: 1 to 2 weeks.', 'Time from sowing to food depends on the crop. See the Crop cards.'] },
    { h: 'Common mistakes', items: ['Using roasted, salted or cooked seed.', 'Using seed that is dyed or treated.', 'Not testing old seed.', 'Storing seed damp.', 'Planting tomato and squash seed from hybrids and expecting the same plant.'] },
    { h: 'What can work, and the reality check', items: ['The table below lists common household sources and what to expect.'] }
  ], { head: ['Source at home', 'What can work', 'Reality check'], rows: [
    ['Dry whole beans / feijão seco', 'Germination test, then planting', 'Grocery beans may be old. Some need a long season.'],
    ['Whole dry peas / ervilhas secas', 'Germination test and sowing', 'Whole peas, not split peas. Prefer cool weather.'],
    ['Whole lentils / lentilhas', 'May sprout', 'A small experiment. Needs time and room.'],
    ['Ripe tomato / tomate', 'Seeds for new plants', 'Needs strong light, a big pot and months.'],
    ['Ripe pepper / pimento', 'Seeds for new plants', 'Needs warmth and strong light.'],
    ['Mature pumpkin / abóbora', 'Large seed for outdoors', 'Vines need far more space than a windowsill.'],
    ['Whole coriander / coentro', 'Sometimes works', 'Spice seed may be old or treated. Ground spice cannot grow.'],
    ['Raw sunflower seed in the shell / girassol', 'Some work', 'Hulled, roasted or salted seed does not grow.'],
    ['Bought seed packets / sementes compradas', 'Usually the best start', 'Check the date, the crop and whether the seed is treated.']
  ] });
  addSec('gr-sprouts', [
    { h: 'Materials', items: ['A clean glass jar, a piece of clean cloth or mesh, a rubber band or the lid ring, 2 to 3 spoons of untreated seed, clean water, a bowl.'] },
    { h: 'Time to harvest', items: ['2 to 6 days. Lentils: 2 to 3 days. Mung beans: 3 to 5. Small seeds: 4 to 6.'] },
    { h: 'Common mistakes', items: ['Not draining well: sour smell and slime.', 'Leaving the jar in hot sun.', 'Using treated seed.', 'Not cooking the sprouts.', 'Sprouting red kidney beans or tomato seed.'] }
  ]);
  addSec('gr-microgreens', [
    { h: 'Materials', items: ['A shallow tub or tray with small holes and a tray underneath.', 'Clean potting soil, 1 inch (2.5 cm).', 'Untreated seed, scissors, a spray bottle or a cup, a plate or tray to cover.'] },
    { h: 'Time to harvest', items: ['7 to 14 days from sowing. Peas and sunflower: about 10 to 14 days.'] },
    { h: 'Common mistakes', items: ['Sowing too thin or too thick.', 'Keeping it dark too long.', 'Overwatering: mould.', 'Cutting too low and getting soil.', 'Not washing the greens.'] }
  ]);
  addSec('gr-regrow-scraps', [
    { h: 'Materials', items: ['Clear jars or glasses, shallow dishes, clean water, pots with drainage, potting mix, toothpicks, a knife.', 'A bright window.'] },
    { h: 'Real harvest or only leaves?', items: ['Leaf regrowth only: green onions, lettuce, celery, cabbage bases, carrot and beet tops.', 'Possible real harvest: potatoes, sweet potatoes, garlic (months), ginger (slow), herbs from cuttings, tomatoes and peppers from seed.', 'See the Plant cards for each plant, with pictures.'] },
    { h: 'Time to harvest', items: ['Green onions: new green in about 1 week.', 'Herb cuttings: roots in 1 to 2 weeks.', 'Potatoes: about 3 to 5 months.', 'Sweet potato slips: 1 to 3 weeks, then months for roots.'] },
    { h: 'Common mistakes', items: ['Not changing the water.', 'Submerging the whole stem.', 'Expecting a full head of lettuce.', 'Planting cut potato wet: rot.', 'Eating green potato.'] }
  ]);
  addSec('gr-indoor-garden', [
    { h: 'Materials', items: ['Containers from the kitchen with drainage holes and a tray.', 'Potting mix or seed-starting mix. A lamp if needed. Clean water. A notebook.'] },
    { h: 'Containers by crop', items: ['Lettuce, radish, herbs: about 15 to 20 cm (6 to 8 in) deep.', 'Green onions: 15 cm or more.', 'Bush beans: roughly 10 to 20 L per plant.', 'Dwarf tomato: about 15 to 20 L or more.', 'Pepper: about 10 to 20 L or more.', 'Potatoes: a deep 30 L or larger bag or container.'] },
    { h: 'Do not use', items: ['Containers that held motor oil, chemicals, paint, pesticide or fuel, or that held unknown things.', 'Painted scrap wood. It may contain lead.', 'Raw animal manure indoors.', 'Soil from a polluted place.', 'Undiluted urine or strong household chemicals as feed.'] },
    { h: 'Time to harvest', items: ['Greens: 4 to 8 weeks. Radish: 4 to 7 weeks. Tomatoes and peppers: months.'] },
    { h: 'Common mistakes', items: ['No drainage.', 'Too little light.', 'Overwatering.', 'Using dense garden soil indoors alone.', 'Pots too small for the crop.', 'Putting pots where they can fall.'] }
  ]);
  addSec('gr-start-bed', [
    { h: 'Materials', items: ['Plain cardboard or newspaper, leaves, kitchen scraps, straw, compost or soil, seed, a spade, water.', 'Stakes or stones to mark the bed.'] },
    { h: 'Time to harvest', items: ['Radish: 25 to 45 days. Lettuce: 30 to 60 days. Beans: 50 to 75 days. Potatoes: 3 to 5 months.'] },
    { h: 'Common mistakes', items: ['Too much shade.', 'Planting in polluted soil.', 'No water nearby.', 'Starting too big.', 'Letting dogs dig the bed.'] }
  ]);
  addSec('gr-save-seed-steps', [
    { h: 'Materials', items: ['Paper plates, a spoon, a jar, a strainer, paper envelopes, labels, a marker, a dry container for storage.'] },
    { h: 'Time to harvest', items: ['Seed must ripen on the plant. Beans and peas: weeks after the pods dry. Tomatoes: at ripe fruit. Drying: 1 to 2 weeks.'] },
    { h: 'Common mistakes', items: ['Picking seed too early.', 'Storing damp seed.', 'Mixing varieties that cross.', 'Saving from sick plants.', 'Forgetting labels.'] }
  ]);

  /* ---------- PLACE SECTIONS ---------- */
  var P = {
    'place-pt-lisboa': ['Lisboa', 'Hot-dry periods, balconies, urban soil quality.', 'DGRM and ICNF, depending on the water.', 'PT'],
    'place-pt-porto': ['Porto', 'Wet winters, fungal pressure, river and coast.', 'DGRM and ICNF, by water and activity.', 'PT'],
    'place-pt-coimbra': ['Coimbra', 'Inland heat and cold, Mondego flood context, rural fire.', 'ICNF for fresh water. DGRM for marine waters if relevant.', 'PT'],
    'place-pt-setubal': ['Setúbal', 'Summer drought, coastal protected areas, marine closures.', 'DGRM, ICNF and protected-area rules.', 'PT'],
    'place-ca-losangeles': ['Los Angeles', 'Heat-island, balcony growing, contaminated soils.', 'California Department of Fish and Wildlife and property rules.', 'US'],
    'place-ca-sanpedro': ['San Pedro', 'Coastal exposure, salt wind, container watering.', 'California Department of Fish and Wildlife. Coastal marine rules and closures.', 'US'],
    'place-ca-palmdale': ['Palmdale', 'Arid heat, cold nights, frost and watering.', 'California Department of Fish and Wildlife. Private and public land access.', 'US'],
    'place-ca-valencia': ['Valencia (Santa Clarita)', 'Hot-dry conditions, wildfire smoke, irrigation.', 'California Department of Fish and Wildlife.', 'US'],
    'place-fl-jacksonville': ['Jacksonville', 'Humidity, flooding, summer heat, pests.', 'Florida Fish and Wildlife Conservation Commission. Salt or fresh water.', 'FL'],
    'place-fl-orlando': ['Orlando', 'Humidity, heat, summer storms, sandy soils.', 'Florida Fish and Wildlife Conservation Commission. Freshwater rules.', 'FL'],
    'place-sc-conway': ['Conway', 'Flood risk, humidity, sandy soil.', 'South Carolina Department of Natural Resources. Public water access.', 'US'],
    'place-oh-ohio': ['Ohio', 'Large frost and season differences. Choose your county.', 'Ohio Department of Natural Resources. County park rules.', 'US']
  };
  var WILD_PT_COAST = 'Wild celery (aipo-silvestre) is reported on damp, flooded and salty ground near the coast in central and southern Portugal. It has deadly look-alikes in the hemlock family. Prickly lettuce is reported widespread in Europe: young leaves are edible, bitter later, and the sap can irritate.';
  var WILD_PT_INLAND = 'Wild celery is reported near the coast in central and southern Portugal. We could not confirm it grows near this place. Prickly lettuce is reported widespread in Europe: young leaves are edible, bitter later, and the sap can irritate.';
  var WILD_CA = 'Several wild onions (Allium) are native to California and have edible leaves and bulbs (USDA plant guides). We did not find which kind grows near this place. Some are uncommon, so do not dig them up unless you must. Prickly lettuce is reported widespread in North America. Wild onions have deadly look-alikes: death camas and lily of the valley.';
  var WILD_E = 'We found no sourced list of wild food plants for this place. Prickly lettuce is reported widespread in North America: young leaves are edible, bitter later, and the sap can irritate. Wild onions and garlic are said to grow in many eastern states (general knowledge, not confirmed). They have deadly look-alikes.';
  var WILDMAP = { 'place-pt-lisboa': WILD_PT_COAST, 'place-pt-setubal': WILD_PT_COAST, 'place-pt-porto': WILD_PT_INLAND, 'place-pt-coimbra': WILD_PT_INLAND, 'place-ca-losangeles': WILD_CA, 'place-ca-sanpedro': WILD_CA, 'place-ca-palmdale': WILD_CA, 'place-ca-valencia': WILD_CA, 'place-fl-jacksonville': WILD_E, 'place-fl-orlando': WILD_E, 'place-sc-conway': WILD_E, 'place-oh-ohio': WILD_E };
  Object.keys(P).forEach(function (id) {
    var p = P[id];
    patch(id, function (g) {
      var items = [
        'This section works with no shop and no office. Use what you have, what you can grow and what the weather tells you.',
        'Garden climate planning focus for ' + p[0] + ' (from the owner Part 3 notes, not verified): ' + p[1],
        'Planting dates for ' + p[0] + ': NOT VERIFIED. Do not wait for a date. Sow cool crops (lettuce, peas, radish) when nights are cool and the soil is not frozen. Plant tender crops (tomato, pepper, beans) only after the last frost, when nights stay warm. Watch the trees and wild plants around you leaf out. Write what works in your notebook.',
        'Seed and plants: use what you have first. Saved seed, kitchen seed, cuttings, sprouting potatoes, a neighbour. See Find seeds and things to plant.',
        'Wild food plants near ' + p[0] + ': ' + WILDMAP[id] + ' Never eat a wild plant you cannot name for certain. See the Plant cards and How to know which plants can be eaten.',
        'Fishing and food-catching rules: LEGALITY UNCONFIRMED. Check the rules before you set any trap. Rod and line is the easiest start. Read the authority below before a crisis, because you may not reach it in one: ' + p[2],
        'See the Plant cards, the Crop cards and the Lawful food-catching checklist in Guides.'
      ];
      if (p[3] === 'PT') items.splice(6, 0, PT);
      if (p[3] === 'FL') items.splice(6, 0, FL);
      if (id === 'place-oh-ohio') items.splice(6, 0, 'Ohio is a state. Pick your own county and write down the rule for it before a crisis.');
      g.sections = (g.sections || []).concat([{ h: 'Food plants and food gathering here', items: items }]);
      g.first = g.first.slice(0, 2).concat(['The store list on this page is for planning before a crisis. In a crisis shops may be closed. Use the guides and lists in this app, your stored food and your neighbours.'], g.first.slice(2));
      g.unconfirmed = (g.unconfirmed || []).concat(['The garden-climate focus and the authority to check come from the owner Part 3D table. They are research priorities, not verified rules. We did not find verified planting dates, seed suppliers or fishing permissions for this place.', 'The wild plant lines come from a few pages seen in search results (USDA plant guides, a Portuguese encyclopedia, extension weed pages). We did not open them. They name regions, not your town.', 'The planting rules (cool crops when nights are cool, tender crops after the last frost) are general gardening practice.']);
    });
  });

  /* pre-crisis planning guides: say plainly they are for before a crisis */
  ['hh-buy-order', 'stockpile-buying-tips', 'stockpile-basics', 'budget-offgrid'].forEach(function (id) {
    patch(id, function (g) { g.first = ['This is a plan for BEFORE a crisis. In a crisis shops and offices may be closed. Use what you already have, and do not plan on going out to buy.'].concat(g.first || []); });
  });

  if (window.LOAD_CORE && window.LOAD_CORE.guides) {
    G.forEach(function (g) { window.LOAD_CORE.guides.push(g); });
  }
})();
