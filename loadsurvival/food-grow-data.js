/* Grow food, eat and survive, and traps from home items. 14 guides.
   Written 29 Oct 2026. Safety points come from named pages seen in search results (we could not open the pages themselves).
   The step by step method is general practice and is marked general guidance. This is not medical advice. */
(function () {
  var NOTE = 'We read search results about these pages. We could not open the pages themselves, so they are cited to us, not checked by us.';
  var GEN = 'The steps marked as general guidance, and the tips, are common practice. We did not find a named source for each step.';
  var SRC = {
    cornell: ['Cornell Cooperative Extension: seed germination test, cited to us, not checked', 'https://dlc.cce.cornell.edu/pluginfile.php/376588/mod_resource/content/1/Seed%20Germination%20Test%20-%20Cornell%20Cooperative%20Extension.pdf'],
    fdaSprouts: ['US FDA: sprouts safety advice (archived page), cited to us, not checked', 'https://webarchive.library.unt.edu/eot2008/20090511175647/http://www.cfsan.fda.gov/~lrd/tpsprout.html'],
    purdue: ['Purdue Extension: potatoes turning green, cited to us, not checked', 'https://www.purdue.edu/hla/sites/yardandgarden/potatoes-turning-green'],
    kstate: ['Kansas State University: cooking dry beans safely, cited to us, not checked', 'https://www.k-state.edu/news/you-asked-it/articles/2017/10/cooking-dry-beans-safely.html'],
    osu: ['Ohio State University: dry kidney beans need to be boiled, cited to us, not checked', 'https://cfaes.osu.edu/news/articles/chow-line-dry-kidney-beans-need-be-boiled'],
    utahTul: ['Utah Department of Health: tularemia fact sheet, cited to us, not checked', 'https://epi.utah.gov/wp-content/uploads/tularemia_factsheet.pdf'],
    moTul: ['Missouri Department of Conservation: tularemia (rabbit fever), cited to us, not checked', 'https://mdc.mo.gov/node/201'],
    rice: ['Delicious magazine (UK): how to store cooked rice safely, cited to us, not checked', 'https://www.deliciousmagazine.co.uk/how-to-store-cooked-rice-safely/']
  };
  var G = [];
  function add(g) { g.checkedOn = '29 Oct 2026'; g.status = 'partly'; g.difficulty = g.difficulty || 'Practical'; g.source = g.sources.length ? g.sources[0][1] : ''; G.push(g); }
  var NOTMED = 'Not medical advice.';

  /* ---------- START HERE ---------- */
  add({ id: 'gr-start', area: 'Home skills • Grow food', icon: 'leaf',
    title: 'Food from almost nothing: start here',
    intro: 'This is the order to follow when food may run short. Start with the fastest food. Then plant for the long run. Then add food you can catch. Every step works with things you already have at home.',
    first: [
      'Water comes first. Keep drinking water safe before you grow or catch food. See the water guides.',
      'Count the food you have now. Write it on paper. See the plan in the guide How to make food last.',
      'Start the fastest food today: jar sprouts take 2 to 6 days.',
      'Then start greens on a tray (7 to 14 days), then regrow scraps and plant a bed.'
    ],
    do: [
      'Step 1. Find seeds and things to plant from your kitchen and your neighbours. Guide: Find seeds and things to plant.',
      'Step 2. Sprouts in a jar. Fast, needs no soil and no sun. Cook them. Guide: Sprout seeds in a jar.',
      'Step 3. Greens on a tray indoors. Guide: Microgreens on a tray.',
      'Step 4. Regrow food from scraps: green onions, lettuce bases, herbs, potatoes. Guide: Regrow food from kitchen scraps.',
      'Step 5. Grow in pots indoors or on a windowsill. Guide: Grow food indoors from household things.',
      'Step 6. Start a food bed outside with no money. Guide: Start a food bed outside.',
      'Step 7. Save seed so next year is free. Guide: Save seed step by step.',
      'Step 8. Stretch what you have. Guides: How to make food last, and Stretch rice, beans, oats and flour.',
      'Step 9. Add caught food only where it is legal and safe: fish and crab traps from household items, and live traps for small animals as a last resort. Check the law first.',
      'Share with neighbours. Food, seeds and cooked meals shared make everyone safer.'
    ],
    warn: [
      'Never eat a plant or seed you cannot name. Never eat treated seed (dyed pink, blue or green). It is poison.',
      'Do not eat raw sprouts if you are a child, an older adult, pregnant or ill. Cook them.',
      'Traps and snares are restricted or illegal in most places. Fish and crab traps need a licence in many places. Check first.'
    ],
    tip: ['Write the date and the result of everything you plant in a notebook. Your notes become your best guide.'],
    after: ['When the crisis ends, keep the garden going. Skills and seed you save are worth more than cans.'],
    sources: [SRC.fdaSprouts, SRC.cornell],
    unconfirmed: [NOTE, 'This page is a plan that links the guides below. The order is our own and is general guidance. ' + GEN] });

  /* ---------- FIND SEEDS ---------- */
  add({ id: 'gr-find-seeds', area: 'Home skills • Grow food', icon: 'search',
    title: 'Find seeds and things to plant',
    intro: 'You may already own seed. Many foods in your kitchen can be planted. This guide shows where to look, how to test, and how to keep what you find. ' + NOTMED,
    first: [
      'Look in your kitchen first. Write down everything that could be a seed or a root.',
      'Pick whole, plump, unbroken seed. Skip anything roasted, salted, cooked or chipped.',
      'Test 10 seeds before you plant a lot (the paper towel test below).',
      'Never plant or eat seed that is dyed pink, blue or green. It is treated with chemicals.'
    ],
    do: [
      'Dry foods that can grow: dry beans, lentils, peas, chickpeas, whole corn kernels for popcorn, raw sunflower seeds in the shell, pumpkin and squash seeds, mustard, coriander and fenugreek seed, whole wheat berries, raw peanuts in the shell.',
      'Fresh foods that give seed: tomatoes, peppers, pumpkin, squash, melon, cucumber (let one grow yellow and big), bean and pea pods left to dry, apples, oranges and lemons (the pips).',
      'Roots, bulbs and cuttings: potatoes with eyes, sweet potatoes, garlic cloves, onion and shallot bottoms, green onion roots, ginger pieces with buds, herb cuttings such as basil and mint.',
      'Ask people: neighbours who garden, a local garden club, a seed swap, a library seed box, a farmer, a market stall.',
      'Paper towel test, step 1. Dampen a paper towel. Squeeze it so it is wet, not dripping. Lay 10 seeds on it.',
      'Paper towel test, step 2. Fold the towel. Put it in a plastic bag or between two plates. Keep it warm, about 65 to 75 F (18 to 24 C).',
      'Paper towel test, step 3. Check each day. Keep the towel damp. Seeds that sprout in 3 to 10 days are alive. Wait up to 14 days for slow ones.',
      'Paper towel test, step 4. Count. If 8 of 10 sprout, that is 80 percent. Good. If fewer than 5 of 10 sprout, sow them thick or find other seed.',
      'Dry fresh seed. Scoop the seed out. Rinse off the flesh. Spread it on a plate. Dry it in the shade at room temperature for 1 to 2 weeks. It is dry when it snaps, not bends.',
      'Label every jar with the name, the date and where it came from.',
      'Store in a sealed jar, cool, dry and dark. Add a spoon of dry rice or powdered milk in a twist of cloth to take up damp.',
      'Plant a little of each kind. Keep half of your seed in reserve in case the first planting fails.'
    ],
    warn: [
      'Treated seed has a bright dye. It is meant for farmers and is poison to eat. Do not plant it where food grows.',
      'Do not eat apple, apricot, peach or cherry seeds and stones. Plant them only.',
      'Wild seed: only plant or eat plants you can name for sure. See How to know which plants can be eaten.',
      'Do not save seed from sick plants. Damp seed goes mouldy. Throw it out.'
    ],
    tip: ['Supermarket seed may not sprout or may not grow like the parent. It still may give food. Test first.', 'Hybrid fruit seed may give a different plant. That is fine for food, but not for saving true seed.'],
    after: ['Write down which seed sprouted and how well. Use that list to plan the next planting.'],
    sources: [SRC.cornell],
    unconfirmed: [NOTE,
      'The paper towel test (10 seeds or more, damp towel, warm place, count the seedlings) matches Cornell Cooperative Extension guidance as quoted to us. The 65 to 75 F range came from another extension guide in the same search.',
      'The lists of foods that can be planted, the drying times, and the storage tips are general practice. We did not find a named source for each. Some grocery seed is treated or may not sprout. ' + GEN,
      'We did not confirm that apple, apricot, peach and cherry seeds are unsafe to eat. It is common advice. We list it as a caution.'] });

  /* ---------- SPROUTS ---------- */
  add({ id: 'gr-sprouts', area: 'Home skills • Grow food', icon: 'jar',
    title: 'Sprout seeds in a jar',
    intro: 'Sprouts are the fastest food you can grow. They need a jar, water and a few days. No soil. No sun. Cook them before you eat them. ' + NOTMED,
    first: [
      'Use whole, raw, untreated seeds, beans or grains meant to eat.',
      'Wash the jar and your hands. Use clean water. If water is not safe, boil it and let it cool.',
      'Rinse and drain 2 to 3 times a day. Never let sprouts sit in water.',
      'Cook sprouts until steaming hot. Do not serve raw sprouts to children, older adults, pregnant women or sick people.'
    ],
    do: [
      'What you need: a clean glass jar, a piece of clean cloth or mesh, a rubber band or the ring of the lid, and 2 to 3 spoons of seed.',
      'Good seeds: lentils (green or brown), mung beans, whole peas, chickpeas, whole wheat or other grain, radish, broccoli, alfalfa, fenugreek.',
      'Step 1. Rinse the seeds in a bowl. Pick out stones and broken seed.',
      'Step 2. Put them in the jar. Add 3 times as much water. Cover with the cloth.',
      'Step 3. Soak. Small seeds (radish, alfalfa): 4 to 6 hours. Lentils, mung, peas, wheat: 8 to 12 hours.',
      'Step 4. Pour the water out through the cloth. Rinse once with fresh water. Pour it all out.',
      'Step 5. Tip the jar upside down at a slant in a bowl or rack so water can drip out and air can get in. Keep it out of hot sun.',
      'Step 6. Rinse and drain 2 to 3 times a day. Shake out all water each time.',
      'Step 7. Look each day. Tiny white tails show in 1 to 2 days. Lentils are ready in 2 to 3 days with a tail about the size of the seed. Mung beans in 3 to 5 days. Small seeds in 4 to 6 days.',
      'Step 8. Give a last rinse. Drain very well. Eat soon, or keep in a covered bowl in the fridge for a few days. With no fridge, eat within a day.',
      'Step 9. Cook before eating: stir fry, steam or boil in a soup until steaming hot. Add to rice, soup or flatbread.',
      'Start a new jar every 2 days so you always have a fresh batch.'
    ],
    warn: [
      'Raw sprouts can carry germs such as Salmonella and E. coli. Warm, damp seed is the perfect place for germs. FDA advice says children, older adults and people with weak immune systems should not eat raw sprouts, and that anyone who wants to cut risk should not eat them raw.',
      'Do not sprout red kidney beans or other beans that must be boiled. Do not sprout seeds from tomatoes, potatoes or peppers. Their leaves are poisonous.',
      'Throw the batch away if it smells sour or rotten, feels slimy or shows mould.',
      'Never use seed with a dye coating. It is treated and poison.'
    ],
    tip: ['Washing seed does not remove all germs. Cooking does.', 'Keep a notebook: date, seed, soak time, ready day.'],
    after: ['Wash the jar and cloth with soap and hot water after each batch.'],
    sources: [SRC.fdaSprouts],
    unconfirmed: [NOTE,
      'The groups that should avoid raw sprouts (children, older adults, people with weak immune systems) match FDA advisories from 1998 to 2002 as quoted to us. We could not open a current FDA page. Pregnant women were not named in the FDA pages we saw. Many health agencies do advise cooking sprouts in pregnancy, but we did not confirm that here. We list it as a caution.',
      'The jar method, the soak times and the days to harvest are general practice. They vary with temperature. ' + GEN,
      'We did not confirm that washing alone cannot make raw sprouts safe, except from one secondary source.'] });

  /* ---------- MICROGREENS ---------- */
  add({ id: 'gr-microgreens', area: 'Home skills • Grow food', icon: 'leaf',
    title: 'Greens on a tray: microgreens indoors',
    intro: 'Microgreens are young plants cut about 1 week to 2 weeks after sowing. They need a shallow tray, a little soil and a bright window. They give fresh greens when stored food has none.',
    first: [
      'Use a shallow container with holes for water to drain, and a tray or plate under it.',
      'Use clean potting soil or compost, not soil from a polluted spot.',
      'Use untreated seed meant for food.',
      'Cut the greens above the soil. Wash them well.'
    ],
    do: [
      'Containers you may have: a plastic food box, a baking tin, a cut milk carton, a foil tray. Punch 5 to 10 small holes in the bottom with a nail.',
      'Step 1. Add soil about 1 inch (2.5 cm) deep. Press it flat. Water it until it is damp, not soaked.',
      'Step 2. Scatter seed thickly, close together, on top. Good seeds: radish, mustard, pea, sunflower (black oil type), lentil, fenugreek, kale, broccoli, coriander.',
      'Step 3. Press the seed gently into the soil. Large seed (pea, sunflower): soak overnight first.',
      'Step 4. Cover with another tray, a plate or a sheet of paper. This keeps it dark and damp for 2 to 3 days.',
      'Step 5. Spray or sprinkle a little water each day. Keep the soil damp.',
      'Step 6. When the seeds sprout, take off the cover. Put the tray in a bright window or under a lamp.',
      'Step 7. Water the soil from below or with a gentle spray each day. Do not wet the leaves late in the day.',
      'Step 8. Cut with clean scissors just above the soil when the first leaves are open. This is usually day 7 to 14. Peas and sunflower take about 10 to 14 days.',
      'Step 9. Wash the greens in clean water. Eat them fresh in soups, rice or flatbread.',
      'Throw out the used soil. It is full of roots. Add it to compost.'
    ],
    warn: [
      'Mouldy seed, white fuzz that is not root hairs, or a bad smell means throw the tray out and start again.',
      'Microgreens are still a raw food. Wash them. Older adults, young children, pregnant women and people with weak immune systems should cook them if they are unsure.'
    ],
    tip: ['Start a new tray every 3 to 4 days so you always have one ready.', 'Root hairs look like white fuzz at the base of the seedling. They are normal.'],
    after: ['Keep notes: seed, day sown, day cut, how much you got.'],
    sources: [SRC.fdaSprouts],
    unconfirmed: [NOTE,
      'The method and days to harvest are general practice. They vary with warmth and light. ' + GEN,
      'We did not find a named source for the safety of microgreens compared with sprouts. We treat them as a raw food that should be washed. The FDA sprout advice we saw applies to sprouts, not microgreens.'] });

  /* ---------- REGROW ---------- */
  add({ id: 'gr-regrow-scraps', area: 'Home skills • Grow food', icon: 'leaf',
    title: 'Regrow food from kitchen scraps and cuttings',
    intro: 'Some food will grow again from the part you would throw away. This is slow food, but it costs nothing. Start with the easiest.',
    first: [
      'Start with green onions. They regrow in days.',
      'Use a clear glass or jar, clean water, and a bright window.',
      'Change the water every 1 to 2 days.',
      'Never eat green or sprouted potato skin or the leaves of potato and tomato plants.'
    ],
    do: [
      'Green onions. Keep the white root end with about 1 inch (2.5 cm) of stem. Stand it in a glass with a little water so only the roots are wet. Put it in a bright window. New green grows in about a week. Cut the green and let it grow again.',
      'Lettuce, romaine, cabbage and celery bases. Cut the base about 2 inches (5 cm) from the bottom. Stand it in a shallow dish with 1 inch (2.5 cm) of water. New leaves appear in a few days. After roots grow, plant it in soil in a pot.',
      'Garlic. Press a clove, pointed end up, 1 to 2 inches (2.5 to 5 cm) deep in soil. Green shoots come in 1 to 2 weeks. Eat the green tops. A bulb needs months.',
      'Sprouted potatoes. Cut a potato into pieces, each with 1 or 2 eyes. Let the cut sides dry for 1 to 2 days. Plant pieces about 4 inches (10 cm) deep, eyes up, in a bucket or bed. See the potato guide for bucket growing.',
      'Sweet potatoes. Push 3 toothpicks into the sides of a sweet potato. Stand it half in a jar of water. Slips (shoots) form in 1 to 3 weeks. Twist them off and root them in water, then plant in soil.',
      'Herbs. Cut a 4 inch (10 cm) piece of basil or mint below a leaf joint. Remove the lower leaves. Stand it in water. Roots form in 1 to 2 weeks. Plant in soil.',
      'Onions, shallots and leeks. Plant the root end in soil. Green tops grow.',
      'Ginger. Plant a piece with a bud in a pot. It grows slowly. It is a long project.',
      'Keep every project in a bright window. Water the soil when the top inch is dry.'
    ],
    warn: [
      'Potatoes that turn green or sprout make solanine. Solanine is poison. Cut off green skin and sprouts before cooking. If a potato is deeply green or tastes bitter, throw it away. Do not eat the leaves, fruit or sprouts of potato plants.',
      'Grocery potatoes may carry disease or have been treated to stop sprouting. They may grow badly. Use them only if you have no seed potatoes.',
      'Do not eat anything that has gone slimy, mouldy or smells rotten.'
    ],
    tip: ['Carrot and beet tops give greens, not roots. Use the greens as a cooked green.', 'A south facing window gives the most light in the United States and Portugal.'],
    after: ['Move rooted plants into pots. Keep a notebook of what worked.'],
    sources: [SRC.purdue],
    unconfirmed: [NOTE,
      'The solanine warning (green skin and sprouts have more solanine, cut them off, deep green or bitter potatoes should be thrown away) matches Purdue Extension as quoted to us. The symptoms listed in the search were nausea, vomiting and stomach pain.',
      'The methods and days for each plant are general practice. Our search did not cover planting sprouted grocery potatoes. The note that grocery potatoes may be treated or carry disease is general horticultural advice. ' + GEN] });

  /* ---------- INDOOR GARDEN ---------- */
  add({ id: 'gr-indoor-garden', area: 'Home skills • Grow food', icon: 'sun',
    title: 'Grow food indoors from household things',
    intro: 'You can grow real food in a window or under a lamp. Use pots made from things you already have. Start small and grow what you eat.',
    first: [
      'Pick the brightest window. South facing is best in the United States and Portugal.',
      'Make pots from household things. Every pot needs holes in the bottom and something under it to catch water.',
      'Use potting soil or compost. Not soil from a road, an old building site or near old paint.',
      'Start with greens, herbs, radishes and green onions.'
    ],
    do: [
      'Pots you may have: buckets, large tins (hammer a nail through the bottom), plastic bottles cut in half, milk cartons, plastic tubs, old bowls, tea chests, wooden boxes lined with a bag with holes.',
      'Never use a container that held chemicals, paint, oil or fuel.',
      'Put stones or broken pot in the bottom if you have them. Add soil to 1 inch (2.5 cm) below the rim.',
      'Light: most food plants need 6 or more hours of bright light. If the window is weak, use a lamp: an LED bulb 4 to 8 inches (10 to 20 cm) above the plants for 12 to 14 hours a day. Put the lamp on a timer if you have one.',
      'Water when the top inch (2.5 cm) of soil is dry. Water slowly until a little comes out the bottom. Empty the saucer after an hour.',
      'Warmth: most plants like 60 to 75 F (15 to 24 C). Keep them off cold glass at night and away from heaters.',
      'Easy plants for a window: lettuce, spinach, chard, kale, radishes, green onions, herbs, bush beans (with strong light), dwarf peppers and dwarf tomatoes (need a lamp and a large pot).',
      'Tomatoes and peppers indoors need help with pollination. When flowers open, tap the flower stem or flick the flower gently each day so pollen moves.',
      'Feed every 2 to 3 weeks with a little compost tea or diluted plant food. Do not overfeed.',
      'Pests: wipe leaves with a damp cloth. For aphids, spray leaves with a few drops of mild soap in water, then rinse. For little black flies in the soil, water less and let the top dry.',
      'Mould on the soil means too much water. Water less and let air move.',
      'Pick leaves often. Many greens grow back if you cut the outer leaves and leave the centre.'
    ],
    warn: [
      'Keep lamp cords and plugs away from water. Never put a hot lamp against curtains, paper or cloth.',
      'Do not use water from a source that may hold fuel, chemicals or sewage.',
      'Some plants are poisonous to dogs and cats. With five small dogs in the house, keep plants out of reach and know every plant by name. See the pets guide.'
    ],
    tip: ['Start a new row of seeds every 2 weeks so something is always ready.', 'Save your own seed from the best plants.'],
    after: ['Write down what grew well in each spot. Move pots to follow the sun.'],
    sources: [SRC.cornell],
    unconfirmed: [NOTE,
      'This guide is general practice for indoor growing. Light hours, lamp distance, watering and feeding amounts vary with the plant. We did not find a named source for each step. ' + GEN] });

  /* ---------- OUTDOOR BED ---------- */
  add({ id: 'gr-start-bed', area: 'Home skills • Grow food', icon: 'home',
    title: 'Start a food bed outside with almost no money',
    intro: 'You can make a growing bed with cardboard, leaves, kitchen scraps and a little soil. This guide is for a yard, a field edge or a patio. Plan for the sun, water and your own safety.',
    first: [
      'Pick the sunniest flat spot with water close by. Most food plants need 6 to 8 hours of sun.',
      'Check the soil is safe. Do not plant near old paint, a busy road or an old industrial site until the soil is tested.',
      'Start small. A bed 4 feet (1.2 m) wide and 8 feet (2.4 m) long is plenty to begin.',
      'Plant fast food first: radishes, lettuce, greens. Then beans, potatoes and squash for the long run.'
    ],
    do: [
      'Step 1. Mark the bed with string or stones. Cut weeds short.',
      'Step 2. Lay plain cardboard (no tape, staples or shiny print) or several layers of newspaper over the grass. Overlap the edges. Wet it well.',
      'Step 3. Pile on layers: kitchen scraps, leaves, grass cuttings, straw and old plant material. Wet each layer. Make the pile 6 to 12 inches (15 to 30 cm) deep.',
      'Step 4. Top with 2 to 4 inches (5 to 10 cm) of compost or soil. This is where seed goes.',
      'Step 5. Plant seed to a depth of 2 to 3 times the seed width. Tiny seed (lettuce, carrot) only needs a light cover of soil. Press down and water.',
      'Step 6. Keep the soil damp until seedlings show. Water in the morning. Water slowly and deeply.',
      'Step 7. Thin crowded seedlings so plants have room. Eat the thinnings.',
      'Step 8. Cover the soil with straw or leaves to hold water and stop weeds.',
      'Step 9. Plant a little every 2 weeks so the food does not all ripen at once.',
      'No yard: grow potatoes in a bucket with holes in the bottom. Put 4 inches (10 cm) of soil in, plant potato pieces, and add soil as the shoots grow until the bucket is full.',
      'Water: use stored water, rain or clean water. Do not use water from a source that may hold chemicals.',
      'Keep a notebook: date planted, what, where, and the result.'
    ],
    warn: [
      'Wash all produce before you eat it.',
      'Dogs dig. Fence the bed. Keep pets away from compost, fertiliser and slug pellets. Many are poison to dogs.',
      'Do not use human waste on food plants.',
      'Do not take plants, seed or water from land that is not yours without permission.'
    ],
    tip: ['Choose crops that fill you: potatoes, beans, squash, onions, cabbage and greens.', 'Ask neighbours when the last frost usually is. Plant tender crops after that date.'],
    after: ['Keep adding scraps and leaves to the bed each season. The soil gets better each year.'],
    sources: [SRC.cornell],
    unconfirmed: [NOTE,
      'The no-dig bed method, depths and spacing are common practice. They differ by place and by crop. We did not find a named source for each. ' + GEN,
      'We did not find frost dates for your area. Use the guide on frost dates in this app, or ask neighbours.'] });

  /* ---------- SAVE SEED ---------- */
  add({ id: 'gr-save-seed-steps', area: 'Home skills • Grow food', icon: 'jar',
    title: 'Save seed step by step',
    intro: 'Seed you save is free food for next year. Start with the easiest: beans, peas, lettuce and tomatoes. Use plants that are healthy and not hybrids if you can.',
    first: [
      'Pick the best, healthiest plant. Mark it so no one picks it.',
      'Let the seed ripen fully on the plant.',
      'Dry the seed completely before you store it.',
      'Label with name, date and place. Store in a sealed jar, cool, dry and dark.'
    ],
    do: [
      'Beans and peas. Leave the pods on the plant until they are dry and papery and the seeds rattle. Pick them. Shell them. Spread the seed on a plate to dry 1 to 2 more weeks. Store.',
      'Tomatoes. Pick a fully ripe fruit from a healthy plant. Scoop the seed and gel into a jar. Add a little water. Leave it 2 to 4 days, stirring once a day. A layer of mould on top is normal. When the seed sinks to the bottom, pour off the top, rinse the seed in a strainer, and spread on a plate to dry for 1 to 2 weeks.',
      'Peppers. Let the fruit ripen fully. Scoop out the seed. Dry on a plate for 1 to 2 weeks.',
      'Lettuce. Let one plant bolt (grow tall and flower). Seed heads turn fluffy. Shake them into a bag. Dry the seed 1 week.',
      'Squash and pumpkin. Different kinds cross easily. Let the fruit ripen fully, scoop the seed, rinse, and dry for 2 weeks. Seed may not grow like the parent if several kinds grew nearby.',
      'Keep different varieties of the same crop apart so they do not cross. If you cannot, plant them at different times, or bag and hand pollinate.',
      'Test the seed on damp paper before you plant it. See the guide Find seeds and things to plant.',
      'Store seed below about 60 percent humidity and below about 90 F (32 C). A sealed jar in a fridge keeps seed for years.',
      'Save more than you need. Share seed with neighbours.'
    ],
    warn: [
      'Do not save seed from diseased plants.',
      'Damp seed gets mouldy. Dry it fully.',
      'Keep seed away from mice and pets.'
    ],
    tip: ['Mark your best plant with a ribbon so you remember it.', 'Seed saved from hybrid plants may not grow like the parent. It will still give food.'],
    after: ['Write down which seed grew best. Plant that first next year.'],
    sources: [SRC.cornell],
    unconfirmed: [NOTE,
      'The test of seed on damp paper before planting matches Cornell Cooperative Extension as quoted to us.',
      'The storage rule (below about 60 percent humidity and 90 F) is the same as the guide Seeds and seed saving in this app, which had its own unconfirmed note.',
      'The steps for each crop, including the 2 to 4 day soak for tomato seed, are common practice. We did not find a named source for each. ' + GEN] });

  /* ---------- EAT AND SURVIVE ---------- */
  add({ id: 'eat-survive-plan', area: 'Food • Eat and survive', icon: 'can',
    title: 'How to make food last: a step by step survival eating plan',
    intro: 'When food may run short, a plan saves food and keeps people strong. Follow these steps in order. ' + NOTMED,
    first: [
      'Water first. A person can go much longer without food than without water. Keep drinking water safe. Plan about 1 gallon (3.8 litres) per person per day for drinking, cooking and a little washing.',
      'Count your food. Write every item and how much.',
      'Eat food that spoils first. Keep canned and dry food for later.',
      'Do not wait to start growing and saving.'
    ],
    do: [
      'Step 1. Count people and days. Write the number of people at home. Add dogs. Write how many days you may need to cover.',
      'Step 2. List all food. Write the amounts. Rice, beans, oats, flour, pasta, cans, oil, sugar, salt, nuts, dried fruit, honey, frozen food and fridge food.',
      'Step 3. Work out your calories. A planning number is about 2,000 calories a day for an adult, less for children and older adults. Use the Stockpile planner tool to check.',
      'Step 4. Eat in this order. Fridge food first (it spoils fast without power). Then freezer food while it is still frozen or cold. Then fresh produce. Then opened packages. Then cans. Then dry staples.',
      'Step 5. Plan meals. Two or three small meals a day. Cook one pot meals to save fuel and water. Soak beans and rice in advance if you have the water.',
      'Step 6. Protect the people who need most: children, pregnant women, breastfeeding mothers, the sick and the older woman. Keep their meals full. Adults who are healthy can eat smaller portions if food is short.',
      'Step 7. Do not ration water. Drink enough. Dehydration makes everything worse.',
      'Step 8. Add fresh food. Start jar sprouts and a tray of microgreens today. Regrow green onions and lettuce bases.',
      'Step 9. Start planting. Use the guides on indoor growing and the food bed.',
      'Step 10. Add protein and fat. Use beans, lentils, nuts, tinned fish, eggs if you have hens, and legal caught food (fish, crab). Fat gives lasting energy.',
      'Step 11. Share and trade. Pool a meal with neighbours. Trade seed, tools, skills and cooked food.',
      'Step 12. Keep records. Write what you ate, what is left, and the number of days left. Check every day.',
      'Step 13. Watch for warning signs: dizziness, confusion, weakness, fainting, not passing urine, or a child who is very quiet or floppy. Get medical help if you can.'
    ],
    warn: [
      'Throw out food that smells bad, is swollen, leaking, slimy or mouldy. When in doubt, throw it out. Fridge food above 4 C (40 F) for more than 2 hours should be thrown out.',
      'Do not eat wild plants, mushrooms or shellfish you cannot name or confirm are safe.',
      'Never cook or run a stove, grill or generator indoors. Carbon monoxide kills.'
    ],
    tip: ['Cook rice, pasta and beans in extra water and drink the broth if the water is safe.', 'A hot drink and a hot meal lift morale in a hard day.'],
    after: ['After the crisis, rebuild your stock slowly. See the Buy order guide.'],
    sources: [SRC.rice],
    unconfirmed: [NOTE,
      'The order of eating, the steps and the portions are general guidance written for this app. The 2,000 calorie planning number is the planner\'s own, used in the Stockpile planner, and is not a prescription.',
      'The 1 gallon of water per person per day and the 4 C (40 F) for 2 hours food rule are used in other guides in this app and carry their own Not confirmed notes.',
      'We did not find a named source on rationing amounts for adults. ' + GEN] });

  add({ id: 'eat-stretch-food', area: 'Food • Eat and survive', icon: 'jar',
    title: 'Stretch rice, beans, oats and flour: simple meals from a bare kitchen',
    intro: 'These meals use basic dry food, water and salt. They give filling meals from a small amount of food. Quantities are for about 2 people. Double for more.',
    first: [
      'Wash your hands. Use safe water.',
      'Cook beans fully. Raw or undercooked beans can make you ill.',
      'Cook rice fresh and eat it the same day if you can.',
      'Eat meals hot. Keep leftovers cold and covered.'
    ],
    sections: [
      { h: 'Rice and bean pot (vegan)', items: [
        'You need: 1 cup (200 g) dry beans or lentils, 1 cup (200 g) rice, 6 cups (1.4 litres) water, salt, oil if you have it, one onion or any seasoning.',
        'Step 1. Soak the beans in plenty of water for at least 5 hours. Pour off the soak water. Do not cook in it.',
        'Step 2. Put the beans in a pot with fresh water. Boil hard for at least 10 minutes. Then simmer until soft, 45 to 90 minutes for most beans, 20 to 30 minutes for lentils.',
        'Step 3. Add the rice and more water. Simmer 15 to 20 minutes until the rice is soft.',
        'Step 4. Add salt and seasoning at the end. Eat hot.'
      ] },
      { h: 'Oat porridge (vegan if made with water)', items: [
        'You need: 1 cup (90 g) rolled oats, 2 to 3 cups (500 to 700 ml) water, a pinch of salt.',
        'Step 1. Boil the water. Add the oats and salt.',
        'Step 2. Stir and simmer 5 to 10 minutes. Add more water if too thick.',
        'Step 3. Add sugar, honey, dried fruit or nuts if you have them.'
      ] },
      { h: 'Flatbread (vegan)', items: [
        'You need: 2 cups (250 g) flour, 3/4 cup (180 ml) water, 1/2 teaspoon salt.',
        'Step 1. Mix flour and salt. Add water slowly. Mix to a dough.',
        'Step 2. Knead 3 to 5 minutes. Rest 15 to 30 minutes.',
        'Step 3. Divide into 4 balls. Flatten each very thin.',
        'Step 4. Heat a dry pan or a flat metal sheet. Cook 2 to 3 minutes each side until brown spots show.'
      ] },
      { h: 'Lentil soup (vegan)', items: [
        'You need: 1 cup (200 g) lentils, 4 cups (1 litre) water, salt, one onion or garlic if you have it, a spoon of oil.',
        'Step 1. Rinse the lentils. Put them in a pot with water.',
        'Step 2. Boil, then simmer 20 to 30 minutes until soft. Add onion, salt and oil.',
        'Step 3. Mash a little for a thicker soup. Add greens or sprouts at the end and cook through.'
      ] },
      { h: 'Rice porridge from leftover rice (vegan; egg or tinned fish are optional extras)', items: [
        'Step 1. Put 1 cup of cooked rice in a pot with 4 to 5 cups of water.',
        'Step 2. Simmer 20 to 30 minutes until thick. Add salt, greens, egg or tinned fish if you have them.',
        'This turns a little rice into a filling meal.'
      ] },
      { h: 'Broth from scraps (vegan if you use only vegetable ends; bones are not vegetarian)', items: [
        'Step 1. Keep clean vegetable ends, onion skins and clean bones. Do not use spoiled food.',
        'Step 2. Put them in a pot with water. Simmer 1 hour or more. Strain.',
        'Step 3. Use the broth to cook rice, beans or soup. It adds flavour and some nutrition.'
      ] },
      { h: 'Flour pancakes (vegan without the egg)', items: [
        'Step 1. Mix 1 cup flour, 1 cup water, a pinch of salt and, if you have it, an egg.',
        'Step 2. Cook spoonfuls in a lightly oiled hot pan, 2 minutes each side.',
        'Eat with honey, jam or soup.'
      ] }
    ],
    do: [
      'Add sprouts or microgreens to any meal for fresh food.',
      'Make one big pot and eat from it for two meals to save fuel.',
      'Season with salt, pepper, dried herbs, garlic or onion. Good flavour helps people eat.',
      'Use a pot with a lid. It saves fuel and water.',
      'Cook outside or with good ventilation. Never use a charcoal grill or camp stove indoors.'
    ],
    warn: [
      'Red kidney beans and other dry beans contain a toxin when raw. Soak, throw away the soak water, and boil hard for at least 10 minutes. Slow cookers may not get hot enough. Some advice says to boil 30 minutes to be sure.',
      'Cooked rice can grow harmful bacteria. Cool leftover rice quickly, keep it cold, eat it within a day, and reheat until piping hot. Do not leave cooked rice out for hours.',
      'Do not eat food that smells bad or has mould.'
    ],
    tip: ['Cook beans in a big batch and freeze or keep cool for later meals.', 'Add a pinch of salt and some fat to lentil and bean dishes for flavour and energy.'],
    after: ['Wash your pots and hands well. Keep a notebook of recipes that worked.'],
    sources: [SRC.kstate, SRC.osu, SRC.rice],
    unconfirmed: [NOTE,
      'The rule for dry beans (soak, discard the soak water, boil hard for at least 10 minutes; slow cookers may not be enough; some advice says 30 minutes) matches Kansas State and Ohio State pages as quoted to us.',
      'The rice cooling and reheating advice matches a UK food magazine as quoted to us, not an NHS or FDA page. One source said to chill within an hour and keep leftovers no more than a day.',
      'The recipes, amounts and cooking times are common practice and will change with your pot, fuel and food. We did not find a named source for each recipe. ' + GEN] });

  /* ---------- TRAPS ---------- */
  var TRAPLAW = 'Check the law first. Traps, nets and snares are restricted or need a licence in many places, including most US states and Portugal. Some sources say authorities accept food gathering in a real survival emergency, but we could not confirm that. This guide does not give permission.';

  add({ id: 'trap-fish-bottle', area: 'Food • Traps and catch', icon: 'drop',
    title: 'Bottle fish trap from a plastic bottle',
    intro: 'A 2 litre plastic bottle makes a small fish trap. It catches small fish for food or bait. Use it only where the law allows and the water is safe.',
    first: [
      TRAPLAW,
      'Only use water that is not polluted. Fish from polluted water can make you ill.',
      'Check the trap often. Do not leave fish to suffer.',
      'Take the trap away when you leave. Do not leave plastic in the water.'
    ],
    do: [
      'You need: a clean 2 litre plastic bottle, scissors or a knife, string, a few small stones, a nail or pin, bait (bread, cooked rice, a little tinned fish or a crumbled cracker).',
      'Step 1. Wash the bottle. Take the label off.',
      'Step 2. Cut the bottle across, about one third down from the top, just where it starts to narrow. Make a clean, straight cut. Be careful with the knife.',
      'Step 3. Turn the top part upside down. Push it neck first into the bottom part so it makes a funnel.',
      'Step 4. Fix the two parts together with 3 or 4 small holes and string, or strong tape. The funnel must stay in place.',
      'Step 5. Punch 6 to 10 small holes in the bottom half with a nail so water can flow through.',
      'Step 6. Put the bait and a few stones inside through the funnel. The stones keep it from floating.',
      'Step 7. Tie a long string to the neck or around the trap. Tie the other end to a stake, a tree or a heavy stone on land.',
      'Step 8. Place the trap in water 1 to 2 feet (30 to 60 cm) deep, where small fish gather: near reeds, rocks, under banks or in shallow edges. The funnel opening should face open water.',
      'Step 9. Leave it for a few hours. Check at least once a day.',
      'Step 10. Pull it in gently. Take the fish out. Put back any fish that are too small, protected, or that you should not keep.',
      'Step 11. Clean fish at once: remove the guts, rinse, keep cold. Cook until the flesh is opaque and flakes. Cook fish through. See the fish cleaning guides.',
      'Step 12. Take the trap out when you are done. Wash it. Dry it.'
    ],
    warn: [
      'Do not set traps in busy places where people or pets could be hurt or the trap could tangle with boats or swimmers.',
      'Do not eat fish from water that is polluted, has an algae bloom, or has a health warning.',
      'Do not catch protected fish or species. Release anything you do not know.',
      'A knife cut can be serious. Cut away from your hand. Keep a first aid kit.'
    ],
    tip: ['Small fish can be fried whole or boiled in soup. Crushed bones add calcium.', 'Change the bait if nothing comes in after a few hours.'],
    after: ['Write down where you set the trap, the time, and what you caught.'],
    sources: [],
    unconfirmed: [NOTE, 'We found no named source for building a bottle trap. The steps are general practice for home made traps and may need changes. ' + GEN,
      'The law note above is from the wild food rules guide in this app: it says traps and snares are restricted or illegal in most places and need a licence in many places. We did not find a rule that allows trapping in an emergency.',
      'The steps for cleaning and cooking fish are general practice. We did not check a temperature source for fish in this guide.'] });

  add({ id: 'trap-crate-crab', area: 'Food • Traps and catch', icon: 'waves',
    title: 'Crate or basket trap for crabs and crayfish',
    intro: 'A plastic crate or laundry basket with bait can catch crabs or crayfish. This is slower than a hand net but needs little skill. Use it only where the law allows.',
    first: [
      TRAPLAW,
      'Use clean water. Do not eat shellfish from closed or polluted areas.',
      'Check the trap every 20 to 30 minutes.',
      'Remove the trap when you leave.'
    ],
    do: [
      'You need: a plastic milk crate or laundry basket, strong string or cord, a few large stones, bait (fish head, chicken bones or skin, tinned fish, bacon rind), a mesh bag (onion or fruit bag), and a rope or line long enough to reach shore.',
      'Step 1. Put the bait in the mesh bag. Tie the bag shut. This keeps small animals from stealing it.',
      'Step 2. Tie the bait bag to the middle of the crate, inside.',
      'Step 3. Tie stones to the bottom of the crate so it sinks and stays still.',
      'Step 4. Tie a line to the crate. Tie the other end to a stake or heavy stone on shore.',
      'Step 5. Lower the crate gently into water where crabs or crayfish live: rocky edges, weeds, a muddy bottom near cover. Depth about 1 to 3 feet (30 to 90 cm).',
      'Step 6. Wait 20 to 30 minutes. Pull the line up quickly and steadily so the crate rises level.',
      'Step 7. Look inside. Pick up crabs from behind with gloves or tongs. Keep the claws away from your fingers.',
      'Step 8. Put back animals that are too small, in egg, or protected. Keep only what the rules allow.',
      'Step 9. Keep the catch cool and alive until you cook. Cook crabs and crayfish alive in boiling water 8 to 12 minutes, or until bright and cooked through. Discard any that die before cooking.',
      'Step 10. Clean the crate and trap with fresh water. Dry them. Store.'
    ],
    warn: [
      'Do not leave a trap unattended where it could drown or tangle birds or other animals.',
      'Crab claws hurt. Wear gloves and handle from behind.',
      'Shellfish can carry toxins. Do not eat shellfish from areas with a closure or a health warning. If you cannot check closures, do not eat.',
      'Keep your hands and feet away from steep, slippery banks. Never go in the water alone.'
    ],
    tip: ['Crayfish are best in clear, flowing fresh water. Crabs are best in the sea or estuary.', 'See the crabs, shrimp and lobsters guide for cleaning and cooking.'],
    after: ['Write down the place, time and catch. Take the trap home. Do not leave plastic behind.'],
    sources: [],
    unconfirmed: [NOTE, 'We found no named source for building a crate trap. The steps are general practice for home made traps and may need changes. ' + GEN,
      'Cooking times for crabs and crayfish are general practice. We did not find a named source in this search. See the crabs guide in this app, which carries its own notes.'] });

  add({ id: 'trap-live-small', area: 'Food • Traps and catch', icon: 'shield',
    title: 'Bucket live trap for small animals (last resort)',
    intro: 'A deep bucket sunk in the ground can catch small animals alive. Use this only as a last resort, where it is legal, on land you may use. Wild animals can carry disease. Follow the safety steps.',
    first: [
      TRAPLAW,
      'Use fishing, stored food and safe plants first. Trapping uses energy and often fails.',
      'Wear gloves. Wash your hands with soap after any contact.',
      'Check the trap at dawn and dusk. Do not leave an animal to suffer.'
    ],
    do: [
      'You need: a deep bucket or tall bin (at least 12 inches / 30 cm deep with straight, smooth sides), a spade, leaves or sticks to cover, bait (peanut butter on bread, oats, seeds, fruit), gloves.',
      'Step 1. Pick a spot away from paths, children, pets and people. Look for animal runs near cover, banks, hedges or walls.',
      'Step 2. Dig a hole just big enough for the bucket. Put the bucket in so the rim is level with the ground.',
      'Step 3. Pack soil around the edge so there is no gap.',
      'Step 4. Put a little bait inside on the bottom. Lay a few leaves or small sticks across the top, loosely, so the rim is hidden.',
      'Step 5. Check at dawn and dusk. Wear gloves.',
      'Step 6. If you catch an animal you do not want or that is protected or sick, tilt the bucket gently on its side near cover and step back. Let it leave. Wash your hands.',
      'Step 7. If you catch a healthy animal you may keep, dispatch it quickly and humanely. Do this away from children.',
      'Step 8. Wear gloves. Cut the animal open only in a clean place. Skin and gut it. Look at the liver and organs. If anything looks spotted, discoloured or abnormal, throw the animal away and wash everything.',
      'Step 9. Wash the meat. Cook it through until at least 165 F (74 C) inside, hot all through, with no pink. Do not eat it rare.',
      'Step 10. Bury or burn the waste far from water, away from pets and wells. Wash your hands, knife and surfaces with soap and hot water.',
      'Step 11. Take the bucket out of the ground when you stop trapping, or cover the hole so no animal or child falls in.'
    ],
    warn: [
      'Wild small game can carry tularemia and other diseases. Wear gloves when skinning or handling wild rabbits and rodents, wash your hands, and cook meat thoroughly. Do not eat an animal that looks sick.',
      'Rodents can carry hantavirus and other disease. Do not touch dead or sick rodents with bare hands. Do not sweep up droppings or nests dry. Wear gloves and wet them with disinfectant first.',
      'Do not use poison. It is illegal in Portugal and dangerous to all animals, pets and people.',
      'This guide does not give steps for snares, deadfalls or spring traps. They injure pets, children and protected animals, and are illegal in most places.',
      'Do not set traps near paths, gardens where children or pets play, or protected areas.'
    ],
    tip: ['Cover the hole with a board when you are not trapping.', 'Keep a notebook: where, when and what you caught.'],
    after: ['Wash all clothes you wore. Keep pets away from the trap area and the waste.'],
    sources: [SRC.utahTul, SRC.moTul],
    unconfirmed: [NOTE,
      'The advice to wear gloves when handling wild rabbits, wash hands, cook meat thoroughly and avoid sick animals matches Utah and Missouri pages as quoted to us. The 165 F figure came from a military base health notice, and Colorado officials gave 160 to 170 F for game meat. We could not open a CDC page.',
      'The hantavirus and dead rodent steps are general practice. Our search did not cover them. Follow current public health advice.',
      'The bucket trap design is a general practice home made trap. We found no named source for it. Check the law. ' + GEN] });

  add({ id: 'trap-no-snare', area: 'Food • Traps and catch', icon: 'alert',
    title: 'Why this app does not give snare and spring trap steps',
    intro: 'This page explains the choice. It also lists the safer ways to get food. Read it before you try any trap.',
    first: [
      'Snares, deadfalls and spring traps hurt pets, children and protected animals. They are illegal or restricted in most places.',
      'They need skill, they often fail, and a failed trap wastes energy and food.',
      'Safer food comes first: stored food, sprouts, greens, a garden, then fishing, then fish and crab traps.',
      'Use traps for food only as a last resort and only within the law.'
    ],
    do: [
      'Step 1. Make sure you have water, shelter and fire safely first.',
      'Step 2. Use stored food. See How to make food last.',
      'Step 3. Grow fast food: sprouts and microgreens.',
      'Step 4. Fish with a line and hook where the law allows. See Make simple fishing gear.',
      'Step 5. Use the bottle fish trap or the crate trap for small fish, crab and crayfish where legal.',
      'Step 6. Use the bucket live trap only as a last resort. See Bucket live trap.',
      'Step 7. Ask a local hunter or trapper for lessons. A person who knows the area and the law is the best guide.',
      'Step 8. Take a hunter education or trapper course if one is offered where you live.'
    ],
    warn: [
      'Poison is illegal and dangerous. Never use it.',
      'Never set a trap where a person or pet could be caught.'
    ],
    tip: ['A fishing line takes less skill and less risk than a trap.'],
    after: ['If you do trap, keep notes and remove every trap when you leave.'],
    sources: [],
    unconfirmed: [NOTE, 'This page states the app policy. It is general guidance. The law differs by place. ' + GEN] });

  if (window.LOAD_CORE && window.LOAD_CORE.guides) {
    G.forEach(function (g) { window.LOAD_CORE.guides.push(g); });
  }
})();
