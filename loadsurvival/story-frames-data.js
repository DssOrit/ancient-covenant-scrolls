/* Story frame pictures, added 30 Oct 2026 from the owner second set of generated pictures.
   Each row attaches one picture to one step (frame) of an existing picture story. A row with step 0 has no matching step text, so it is shown as an extra picture.
   Stories are called complete only when all six frames have a picture. Pictures are illustrations, not photographs of real places.
   Nothing here changes a safety rule. Not safety, medical or legal advice. */
(function () {
  var F = [
    /* Flood stories (story-NN guides). File names: assets/pics/story-NN-fN.jpg */
    ["story-01-flood-warning", 1, "story-01-f1", "A man and a woman at a kitchen table listen closely to a small battery radio while the woman rests her chin on her hand.", "Frame 1: listen to the whole official warning on a battery radio."],
    ["story-01-flood-warning", 5, "story-01-f5", "A man and a woman stand at an open front door putting on rain jackets and backpacks, with a car on the wet driveway.", "Frame 5: put on jackets, pick up the packs and leave at once."],
    ["story-01-flood-warning", 6, "story-01-f6", "A man and a woman with backpacks walk uphill on a dry road, with a flooded low field far behind them.", "Frame 6: walk to high ground by a road with no water on it."],

    ["story-02-protect-if-safe", 1, "story-02-f1", "A man shows a phone with a plain weather map to a woman beside him, with a small radio and a paper map on the table.", "Frame 1: check for an evacuation order first. If there is one, leave."],
    ["story-02-protect-if-safe", 2, "story-02-f2", "Indoors on a dry floor, a woman lifts a storage box to a higher shelf while a man lifts a sealed tub of cleaning products to a top shelf.", "Frame 2: move papers and sealed chemicals higher, only if it is safe and quick."],
    ["story-02-protect-if-safe", 3, "story-02-f3", "A man carries folded garden chairs and a plant pot toward a shed in light rain, standing on dry gravel.", "Frame 3: bring in loose outdoor objects. Stay out of any water."],
    ["story-02-protect-if-safe", 4, "story-02-f4", "A woman and a man place a few filled sandbags along the base of a grey garage door on a dry driveway, with the front door open behind them.", "Frame 4: a few sandbags may slow a little water. Never block an exit."],
    ["story-02-protect-if-safe", 5, "story-02-f5", "A man and a woman stand back from a closed grey electrical panel on a garage wall while the woman looks at a phone. Neither touches the panel.", "Frame 5: do not touch the electric panel. Leave it alone."],

    ["story-05-sanitation", 4, "story-05-f4", "A woman in blue gloves lines a lidded bucket toilet with a strong bag, with a scoop of dry sawdust and a roll of paper beside her.", "Frame 4: cover each use with dry sawdust or paper, then close the lid."],
    ["story-05-sanitation", 0, "story-05-f1", "A woman in a dark apron and gloves stands at a bathroom doorway with a hand over her nose, looking at the toilet from a distance.", "The toilet will not flush. Do not use it or touch it. Set up a bucket toilet in another place."],
    ["story-06-rescue-signals", 0, "story-06-f6", "A man, a woman and a girl with backpacks stand on high ground beside a road and look down at a flooded valley. A small dog waits on a lead beside them.", "After you reach high ground, wait there. Nobody goes near the water."],

    ["story-07-vulnerable-family", 2, "story-07-f2", "A woman measures formula powder into a baby bottle with bottled water at a kitchen counter while a man holds the baby.", "Frame 2: make formula exactly as the pack says, with safe water."],
    ["story-07-vulnerable-family", 3, "story-07-f3-full", "An older woman at a table holds a small battery beside a glasses case, a pill organiser and a blank sheet of paper, with a small dog at her side.", "Frame 3: older adults need spare glasses, spare batteries and a medicine list."],
    ["story-07-vulnerable-family", 4, "story-07-f4", "An older woman with a walking frame stands at an open door with a ramp outside, and a phone charges on a small table beside her.", "Frame 4: a way out they can use, and charging for equipment."],
    ["story-07-vulnerable-family", 0, "story-07-x1", "A pregnant woman, a man holding a baby and an older woman with a walking frame stand beside a car with a small dog, ready to leave early.", "Leave early when anyone needs more time. Everyone, including the dog, goes together."],
    ["story-07-vulnerable-family", 6, "story-07-f6", "A family with go-bags stands in a line at the front door, practising leaving. A man holds a baby and an older woman uses a walking frame.", "Frame 6: practise the plan once, with everyone."],

    ["story-08-hazards", 1, "story-08-f1", "A man and a woman stand on a dry pavement beside a traffic cone and look at a flooded road from a distance.", "Frame 1: stay out of floodwater. Look from a safe distance."],
    ["story-08-hazards", 0, "story-08-x1", "A man and a woman stand on a dry pavement beside a traffic cone and look down a flooded street from a distance.", "Look from a safe distance. Nobody goes into the water."],
    ["story-08-hazards", 0, "story-08-x2", "A man and a woman stand on grass beside a small portable generator in an open yard, well away from the house with its doors and windows closed.", "Keep the generator and its cable outdoors, far from every door and window."],
    ["story-08-hazards", 3, "story-08-f3", "A man stands beside a small portable generator running on the grass in an open yard, well away from the house. The house doors and windows are closed.", "Frame 3: a generator runs outdoors only, far from every door and window."],
    ["story-08-hazards", 4, "story-08-f4", "A woman and a man step away from a damaged house with a cracked wall and a sagging roof, with warning tape across the gate.", "Frame 4: do not enter a building with cracks or a sagging roof."],
    ["story-08-hazards", 5, "story-08-f5", "A woman and a man read a book beside a plain white battery lantern on a dark kitchen table.", "Frame 5: use battery lights, not candles."],

    ["story-09-lost-glasses", 2, "story-09-f2", "A woman looks inside a handbag while a bedside drawer stands open. An older woman in a red cardigan sits watching from an armchair.", "Frame 2: check bags, pockets and the bedside."],
    ["story-09-lost-glasses", 3, "story-09-f3", "A woman hands an older woman a spare pair of glasses from a small case in an open kit box.", "Frame 3: use the spare glasses from the emergency kit."],
    ["story-09-lost-glasses", 4, "story-09-f4", "An older woman in glasses reads a medicine bottle with a handheld magnifier, with a sheet of blank lined paper beside her.", "Frame 4: use a magnifier to read labels, and write names in large print."],

    ["story-10-14-day-drill", 2, "story-10-f2", "A man adds drops from a small dropper bottle into a glass of water at a kitchen counter while a woman holds a kitchen timer and two children watch.", "Frame 2 (Day 2): test water treatment on a small amount, and time it."],
    ["story-10-14-day-drill", 5, "story-10-f5", "A family sits at a table with a blank paper grid and pencils, with water jugs on a shelf behind them.", "Frame 5 (Day 14): review together what ran short and what broke."],
    ["story-10-14-day-drill", 6, "story-10-f6", "A man writes in a notebook while a family sits around the table smiling, with water jugs on the shelf behind them.", "Frame 6: write down the fixes and the next drill date."],

    /* Part 8 stories (p8-sNN guides). File names: assets/pics/p8-sNN-fN.jpg */
    ["p8-s01-water-stops", 1, "p8-s01-f1", "A woman turns a kitchen tap with no water coming out while a man checks a phone beside her.", "Frame 1: check whether the supply has stopped."],
    ["p8-s01-water-stops", 6, "p8-s01-f6", "A man in a black beanie writes in a notebook with a blank grid, with large water jugs on a shelf behind him.", "Frame 6: write down how much water is used each day."],

    ["p8-s02-no-cooking", 1, "p8-s02-f1", "A man in a black beanie stands at a window and looks at a dark street of houses with no lights, with a battery lantern glowing on the table behind him.", "Frame 1: check how far the outage reaches. Is it only your home?"],
    ["p8-s02-no-cooking", 5, "p8-s02-f5", "A man opens a tin over a steel bowl with a manual can opener while a boy watches.", "Frame 5: open cans with a manual can opener."],

    ["p8-s03-freezing-night", 1, "p8-s03-f1", "A man looks around a bedroom with dry walls and a slightly open window.", "Frame 1: check the room is dry and aired, away from hazards."],
    ["p8-s03-freezing-night", 2, "p8-s03-f2", "A woman zips a coat on a boy who wears a woolly hat, while a wet jacket hangs over a chair to dry.", "Frame 2: dry layers and a hat. Wet clothes come off."],
    ["p8-s03-freezing-night", 3, "p8-s03-f3", "A bed with folded cardboard under the mattress, a rug on the floor and thick blankets on top. A white battery lantern glows on a shelf.", "Frame 3: cardboard, rugs and blankets under the bed, more blankets over."],
    ["p8-s03-freezing-night", 4, "p8-s03-f4", "A small dog sleeps on a warm blanket in a dog bed beside the family bed.", "Frame 4: warm bedding for pets."],
    ["p8-s03-freezing-night", 5, "p8-s03-f5", "A white battery lantern glows on a shelf in the foreground while a family reads a book together in bed.", "Frame 5: a battery lantern only. No flame."],
    ["p8-s03-freezing-night", 6, "p8-s03-f6", "A man gently feels a boy's cheek while a woman holds a phone ready to call, with blankets on the bed.", "Frame 6: watch for cold danger. Get urgent help if it appears."],

    ["p8-s04-week1-to-day90", 1, "p8-s04-f1", "A woman helps an older woman sit in an armchair and checks her cardigan pockets, with a walking frame beside them.", "Day 7: sit the person down and look for the glasses."],
    ["p8-s04-week1-to-day90", 2, "p8-s04-f2", "A woman writes in a notebook while a man points at water jugs on a shelf and a lidded bucket toilet in the corner.", "Day 14: check water and the toilet, and write it down."],
    ["p8-s04-week1-to-day90", 4, "p8-s04-f4", "A man holds two pill bottles and a phone beside a medical kit and a blood pressure monitor while an older woman watches.", "Day 30: check medicines and anything that needs power."],
    ["p8-s04-week1-to-day90", 5, "p8-s04-f5", "A family and an older woman sit around a paper map and a phone with packed go-bags by the front door behind them.", "Day 60: plan safe resupply or moving on."],

    ["p8-s05-toilet-stops", 1, "p8-s05-f1", "A woman in an apron and gloves stands at a bathroom doorway with a phone in her hand, looking at the toilet from a distance.", "Frame 1: check for a sewer hazard before you use the toilet."],
    ["p8-s05-toilet-stops", 2, "p8-s05-f2", "A woman in an apron and gloves points to a private corner of a laundry room away from the kitchen.", "Frame 2: pick a private place away from food, children and pets."],

    ["p8-s05-toilet-stops", 0, "p8-s05-x1", "A woman with a phone in her hand stands at a bathroom doorway and looks at the toilet from a distance.", "Do not use the toilet until it is checked. Use the bucket toilet instead."],
    ["p8-s05-toilet-stops", 0, "p8-s05-x2", "A woman with a phone in her hand points to a lidded bucket toilet in a storage corner beside water jugs and a roll of paper.", "Put the bucket toilet in a private corner away from food, children and pets."],
    ["p8-s06-flood-warning-pets", 6, "p8-s06-f6", "A family with backpacks and a small dog in a carrier stands on high ground beside a road and looks down at a flooded valley.", "Frame 6: stay on safe high ground until officials say it is safe."],

    ["p8-s07-upper-floor", 1, "p8-s07-f1", "A family carries bags and a small dog in a carrier up a clear staircase toward an open upstairs door.", "Frame 1: move everyone and the pets to an upper room with a way out."],
    ["p8-s07-upper-floor", 2, "p8-s07-f2", "A man in a black beanie looks up at a closed ceiling hatch and holds up one hand as a stop sign.", "Frame 2: do not go into a closed attic."],
    ["p8-s07-upper-floor", 3, "p8-s07-f3", "A girl puts down a bowl of water for a small dog in an upstairs room while a boy packs a bag.", "Frame 3: keep pets in the room with water."],
    ["p8-s07-upper-floor", 4, "p8-s07-f4", "A woman speaks on a phone beside an upstairs window.", "Frame 4: call 911 or 112. Give the address, the floor and who is with you."],
    ["p8-s07-upper-floor", 5, "p8-s07-f5", "A man and a young woman hold a bright orange cloth at an open upstairs window from inside the room.", "Frame 5: signal with bright cloth from inside a safe window. Stay off the roof."],
    ["p8-s07-upper-floor", 0, "p8-s07-x1", "A woman and a man hold a bright orange cloth at an upstairs window from inside the room.", "Signal with a bright cloth from inside a safe window. Stay off the roof."],
    ["p8-s07-upper-floor", 0, "p8-s07-x2", "A family and a small dog sit together on the floor of an upstairs room, listening, with go-bags behind them.", "Stay together in the upper room and wait for rescue guidance."],
    ["p8-s07-upper-floor", 6, "p8-s07-f6", "A family sits together on the floor of an upstairs room with the door open behind them, listening.", "Frame 6: wait together for rescue guidance."],

    ["p8-s08-older-person-alone", 1, "p8-s08-f1", "An older man with white hair and a walking stick looks at a wall clock and a blank paper list on the refrigerator.", "Frame 1: check the clock, the date and the contact list."],
    ["p8-s08-older-person-alone", 0, "p8-s08-x1", "An older man with white hair and a walking stick looks at a wall clock and a blank paper list on the refrigerator in his kitchen.", "Check the clock, the date and the list on the fridge."],
    ["p8-s08-older-person-alone", 2, "p8-s08-f2", "An older man sits on a bed and lifts a glasses case out of an open bedside drawer.", "Frame 2: look in the bedside, the kit and a bag for the spare glasses."],
    ["p8-s08-older-person-alone", 3, "p8-s08-f3", "An older man in glasses sorts pills into a weekly organiser at a table, with a blank paper list and his walking frame beside him.", "Frame 3: gather prescriptions, a medicine list and the walking aid."],
    ["p8-s08-older-person-alone", 6, "p8-s08-f6", "A woman helps an older man with a walking stick into the passenger seat of a car, with a small bag on his lap.", "Frame 6: if care is not possible, leave with help."],

    ["p8-s09-pregnancy-child-medical", 1, "p8-s09-f1", "A pregnant woman writes a list on blank paper beside medicine bottles while a man and a toddler with a soft toy sit beside her.", "Frame 1: write down each person's care needs."],
    ["p8-s09-pregnancy-child-medical", 2, "p8-s09-f2", "A pregnant woman packs bottled water into a cardboard box while a man holds a pack of food and a toddler holds another.", "Frame 2: pack safe water and food."],
    ["p8-s09-pregnancy-child-medical", 3, "p8-s09-f3", "A man checks a home breathing machine on a bedside table beside a battery power pack while a pregnant woman sits next to him.", "Frame 3: plan power for a medical device, and a back-up."],
    ["p8-s09-pregnancy-child-medical", 5, "p8-s09-f5", "A pregnant woman and a man with backpacks look at a paper map beside a loaded car.", "Frame 5: keep a transit plan and a place to go."],
    ["p8-s09-pregnancy-child-medical", 6, "p8-s09-f6", "A pregnant woman rests a hand on her stomach while a man speaks on the phone, with car keys and a paper map on the table.", "Frame 6: get early care or move if a warning sign appears."],

    ["p8-s10-storage-problem", 1, "p8-s10-f1", "A man crouches in a garage and looks at white buckets standing against a wall with a damp patch.", "Frame 1: find the damp corner."],
    ["p8-s10-storage-problem", 2, "p8-s10-f2", "A woman and a man check bags of grain over plastic tubs in a storage room with shelves of tins and jars.", "Frame 2: inspect dry goods for damp, mould, insects and bad smells."],
    ["p8-s10-storage-problem", 3, "p8-s10-f3", "A man in blue gloves holds up a bag of grain with dark spots, with two more suspect bags on a grey tray.", "Frame 3: set suspect packages apart."],
    ["p8-s10-storage-problem", 5, "p8-s10-f5", "A woman writes in a notebook beside jars of grains and beans with coloured tape bands.", "Frame 5: log dates and defects."],
    ["p8-s10-storage-problem", 6, "p8-s10-f6", "A woman in blue gloves puts bags with dark spots into a black bin bag while a man holds the garage door open.", "Frame 6: throw out uncertain food. Do not smell-test it."],

    ["story-p8-home-safe", 2, "p8-home-f2", "A man draws thick curtains at a window with a latch, while a woman and a girl watch and a smoke alarm sits on the ceiling.", "Frame 2: cover windows from inside, keep one you can open, never cover an alarm."],
    ["story-p8-home-safe", 3, "p8-home-f3", "A woman holding a flashlight and a girl walk out of a hallway to an open front door at night, practising leaving.", "Frame 3: practise leaving in the dark."],
    ["story-p8-home-safe", 4, "p8-home-f4", "A man fits a battery door alarm on a door frame with a screwdriver while a girl watches.", "Frame 4: a battery door alarm. No candles."],
    ["story-p8-home-safe", 5, "p8-home-f5", "A woven basket by the front door holds flashlights, a small radio and a whistle.", "Frame 5: keep flashlights, a radio and a whistle where everyone can reach them."],
    ["story-p8-home-safe", 6, "p8-home-f6", "A woman, a girl and a man sit around a blank sheet of paper with a phone beside it, making a plan.", "Frame 6: agree a check-in plan and write it down."],

    ["story-p8-pets", 0, "p8-pets-x1", "A girl, a woman and a boy sit on the kitchen floor with a small dog and a cat, beside a basket and two bowls.", "Keep bowls, toys and supplies together where everyone can find them."],
    ["story-p8-pets", 3, "p8-pets-f3", "A woman reaches up to move a bowl of grapes and a bar of chocolate onto a high shelf.", "Frame 3: grapes and chocolate go out of reach of pets."],
    ["story-p8-pets", 4, "p8-pets-f4", "A girl in blue gloves scoops dog waste into a black bag in the yard, with a dog, a cat and an outdoor tap nearby.", "Frame 4: scoop and bag waste, then wash hands."],
    ["story-p8-pets", 5, "p8-pets-f5", "A woman and two children load a dog carrier and a cat carrier onto the back seat floor of a car.", "Frame 5: pets are part of the evacuation plan."],

    /* Older pictures (assets/steps and earlier assets/pics) tied to frames that had no picture. Added 30 Oct 2026. */
    ["story-02-protect-if-safe", 6, "assets/steps/ht-evacuate-4.jpg", "Cars stop at a barrier across a flooded road with water over the road ahead.", "Frame 6: if water rises or an order comes, stop and leave. Never drive into a flooded road."],
    ["story-03-upper-floor", 2, "assets/steps/g-flood-1.jpg", "A packed backpack with a water bottle and a medicine bottle beside the front door.", "Frame 2: take water, a light, medicines, glasses, a phone and charger, a whistle and warm clothes."],
    ["story-03-upper-floor", 3, "assets/steps/g-flood-4.jpg", "A woman on the phone looks out of a window at floodwater and trees.", "Frame 3: call 911 or 112 if you can. Give the address, the floor and who is with you."],
    ["story-03-upper-floor", 4, "p8-s07-f2", "A man in a black beanie looks up at a closed ceiling hatch and holds up one hand as a stop sign.", "Frame 4: keep the way out clear. Do not go into a closed attic."],
    ["story-03-upper-floor", 5, "p8-s07-f5", "A man and a young woman hold a bright orange cloth at an open upstairs window from inside the room.", "Frame 5: signal from a safe window with bright cloth. Stay off the roof."],
    ["story-03-upper-floor", 6, "assets/steps/g-flood-3.jpg", "Two adults on a staircase look down at floodwater in the hall below, keeping well back from it.", "Frame 6: stay away from floodwater and wait for rescue."],
    ["story-04-week1-to-day90", 4, "assets/steps/hs-food-storage-1.jpg", "A room thermometer standing on a dark storage shelf beside a basket.", "Day 60: check storage temperature, pests, damp and food variety."],
    ["story-05-sanitation", 2, "assets/steps/lim-sanitation-1.jpg", "A bucket toilet with a strong liner and a wooden seat, with spare paper beside it.", "Frame 2: fit a strong liner and keep dry cover material ready."],
    ["story-05-sanitation", 6, "assets/steps/lim-sanitation-3.jpg", "Two tied waste bags inside a lidded outdoor bin beside a fence.", "Frame 6: keep tied bags in a covered container until you can dispose of them in an approved way."],
    ["story-06-rescue-signals", 6, "assets/steps/g-signaling-3.jpg", "An orange whistle clipped to the strap of a backpack.", "Frame 6: a whistle, bright cloth or flashlight from a safe upper window. Never the roof."],
    ["story-07-vulnerable-family", 5, "assets/steps/ht-evacuate-1.jpg", "A packed backpack, a pet carrier, a lead and a box of supplies laid out on a rug by the door.", "Frame 5: pets need a carrier, lead, food, water, medicines and records."],
    ["story-08-hazards", 2, "assets/steps/lim-stay-safe-4.jpg", "A road blocked by a fallen utility pole, wires and branches, with a barrier in front.", "Frame 2: keep far away from fallen lines and wet electrical equipment."],
    ["story-09-lost-glasses", 5, "p8-s04-f4", "A man holds two pill bottles and a phone beside a medical kit while an older woman watches.", "Frame 5: check each medicine with another person. Do not guess."],
    ["story-10-14-day-drill", 3, "assets/steps/lim-sanitation-1.jpg", "A bucket toilet with a strong liner and a wooden seat, with spare paper beside it.", "Frame 3 (Day 3): set up the bucket toilet for one day and write what you learned."],
    ["story-10-14-day-drill", 4, "assets/steps/water-storage-1.jpg", "Three large water jugs on a shelf beside a notepad with ticks.", "Frame 4 (Day 7): check how much water you really used and change the plan."],

    ["p8-s01-water-stops", 3, "assets/steps/water-storage-3.jpg", "A hand writes on a blank label on a large water jug.", "Frame 3: label each container for drinking or for washing."],
    ["p8-s01-water-stops", 4, "assets/steps/es-radios-alerts-1.jpg", "A battery radio on a shelf beside a framed map.", "Frame 4: check the official water advisory by radio or an official page."],
    ["p8-s01-water-stops", 5, "assets/steps/water-boil-3.jpg", "A pot of water at a rolling boil on a camp stove with a timer beside it.", "Frame 5: boil at a rolling boil for 1 minute (3 minutes at high altitude) and let it cool."],
    ["p8-s02-no-cooking", 2, "assets/steps/lim-food-none-2.jpg", "A small thermometer hanging on a shelf inside a refrigerator.", "Frame 2: keep the fridge and freezer closed and check the temperature."],
    ["p8-s02-no-cooking", 4, "assets/steps/lim-food-none-1.jpg", "Food sorted into trays: eggs, vegetables, packs, tins and jars.", "Frame 4: choose foods that fit each person's needs."],
    ["p8-s02-no-cooking", 6, "story-s04-inventory", "A notebook and pencil on a counter beside a jar of oats, a bowl of flour and cans.", "Frame 6: write down what you have and what you ate."],
    ["p8-s04-week1-to-day90", 3, "assets/steps/hs-food-storage-2.jpg", "Pantry shelves with glass jars of grains, beans and pasta.", "Day 21: check the pantry for balance. Rice, beans and oats alone are not a complete diet."],
    ["p8-s05-toilet-stops", 3, "assets/steps/lim-sanitation-1.jpg", "A bucket toilet with a strong liner and a wooden seat, with spare paper beside it.", "Frame 3: line stable buckets with strong liners."],
    ["p8-s05-toilet-stops", 5, "assets/steps/lim-sanitation-4.jpg", "Hands washed with water poured from a jug over a basin.", "Frame 5: wash hands with soap and safe water every time."],
    ["p8-s05-toilet-stops", 6, "assets/steps/lim-sanitation-3.jpg", "Two tied waste bags inside a lidded outdoor bin beside a fence.", "Frame 6: keep waste bags secure until there is an approved disposal route."],
    ["p8-s06-flood-warning-pets", 1, "assets/steps/g-signaling-1.jpg", "A hand cranks a green emergency radio on a rock.", "Frame 1: check the official hazard: warnings, water level and routes."],
    ["p8-s06-flood-warning-pets", 2, "assets/steps/g-pets-4.jpg", "A cat in a carrier beside a dog on a lead.", "Frame 2: gather the family and pets. Pets go in carriers or on leads."],
    ["p8-s06-flood-warning-pets", 3, "assets/steps/g-flood-1.jpg", "A packed backpack with a water bottle and a medicine bottle beside the front door.", "Frame 3: take medicines, glasses, a charged phone, water and papers."],
    ["p8-s06-flood-warning-pets", 4, "assets/steps/g-signaling-2.jpg", "A family leans over a paper map and points at a route.", "Frame 4: choose a safe way to leave and where to go. Tell someone."],
    ["p8-s08-older-person-alone", 4, "assets/steps/g-power-outage-4.jpg", "A hand holds a phone with a low battery sign and a short message.", "Frame 4: save water and phone power. Use short calls."],
    ["p8-s08-older-person-alone", 5, "assets/steps/g-power-outage-1.jpg", "An older woman at her open door talks with a neighbour on the step.", "Frame 5: arrange a neighbour check-in at set times."],
    ["story-p8-pets", 2, "assets/steps/g-pets-1.jpg", "An open pet bag holding food, a collapsible bowl, a blanket and a lead.", "Frame 2: keep a pet bag with food, a bowl, a lead, medicines, records and a photo."],
    ["story-p8-pets", 6, "p8-s03-f4", "A small dog sleeps on a warm blanket in a dog bed beside a bed.", "Frame 6: keep pets warm, cool and safe. Never leave a pet in a closed car or in floodwater."]  ];
  /* A story is complete when its frames 1 to 6 all have a picture (the older pictures supply the rest). */
  var OLD = {
    "story-01-flood-warning": [2, 3, 4],
    "p8-s09-pregnancy-child-medical": [4],
    "p8-s10-storage-problem": [4],
    "story-p8-home-safe": [1]
  };
  function find(id) { var gs = (window.LOAD_CORE && window.LOAD_CORE.guides) || []; for (var i = 0; i < gs.length; i++) if (gs[i].id === id) return gs[i]; return null; }
  var have = {};
  F.forEach(function (r) {
    var g = find(r[0]); if (!g) return;
    var first = !(g.sections || []).some(function (x) { return x.img; });
    g.sections = (g.sections || []).concat([{ h: first ? "Pictures" : "Pictures, continued", img: /\//.test(r[2]) ? r[2] : "assets/pics/" + r[2] + ".jpg", alt: r[3], items: [r[4]], at: r[1] || undefined }]);
    (have[r[0]] = have[r[0]] || []).push(r[1]);
  });
  /* Tie older cover pictures that had no step number to their frame. */
  [["story-p8-home-safe", "p8-home-door", 1], ["story-p8-pets", "p8-pets", 1]].forEach(function (x) {
    var g = find(x[0]); if (!g) return;
    (g.sections || []).forEach(function (s) { if (s.img === "assets/pics/" + x[1] + ".jpg" && !s.at) { s.at = x[2]; } });
    (have[x[0]] = have[x[0]] || []).push(x[2]);
  });
  /* Tick the six frames: complete stories say so, the others keep the old note. */
  var ALSO = { "p8-s03-freezing-night": [], "p8-s07-upper-floor": [] };
  Object.keys(have).forEach(function (id) {
    var g = find(id), set = {}; if (!g) return;
    have[id].concat(OLD[id] || []).concat(ALSO[id] || []).forEach(function (n) { set[n] = 1; });
    (g.sections || []).forEach(function (s) { if (s.at) set[s.at] = 1; });
    var all = [1, 2, 3, 4, 5, 6].every(function (n) { return set[n]; });
    if (!all) return;
    g.first = (g.first || []).map(function (x) { return /^Only some steps have a picture/.test(x) ? "Every step has a picture." : x; });
    g.unconfirmed = (g.unconfirmed || []).map(function (x) {
      return x.replace("The Part 8 pack has only cover pictures. Frames without a picture are text only.", "All six frames have a picture.")
              .replace("show one picture for some steps only.", "show one picture for each step.");
    });
  });
})();
