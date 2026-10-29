/* Part 5 pictures (exact supplied filenames), diet planning guides, and two Part 8 stories (home safety, pets). 4 new guides and 12 pictures.
   Written 29 Oct 2026 from the owner Part 5A and Part 8 sheet. Pictures are illustrations, not photographs of real places.
   Indoor growing is a supplement, not calorie insurance. Not medical, nutrition or legal advice. Sources are given to us, not opened. */
(function () {
  var NOTE = "We read the owner Part 5 manual and search results. We could not open the pages, so each source is labelled OFFICIAL SOURCE LINKED BUT NOT OPENED or DATA UNVERIFIED.";
  var GEN = "Steps marked as general practice are common advice. We did not find a named source for each step.";
  var CALL = "In danger to life, call 911 (US) or 112 (Portugal) first, if the phone works.";
  var ILL = "The pictures are illustrations made for this app. They are not photographs of real places.";
  var SRC = {
    ods: ["NIH Office of Dietary Supplements (from the owner Part 5A) (OFFICIAL SOURCE LINKED BUT NOT OPENED)", "https://ods.od.nih.gov/"],
    myplate: ["USDA MyPlate (from the owner Part 5A) (OFFICIAL SOURCE LINKED BUT NOT OPENED)", "https://www.myplate.gov/"],
    fish: ["FDA: advice about eating fish (from the owner Part 5A) (OFFICIAL SOURCE LINKED BUT NOT OPENED)", "https://www.fda.gov/food/consumers/advice-about-eating-fish"],
    outage: ["FoodSafety.gov: food safety during a power outage (from the owner Part 5A) (OFFICIAL SOURCE LINKED BUT NOT OPENED)", "https://www.foodsafety.gov/food-safety-charts/food-safety-during-power-outage"],
    umn: ["University of Minnesota Extension: lighting houseplants (from the owner Part 5B) (OFFICIAL SOURCE LINKED BUT NOT OPENED)", "https://extension.umn.edu/planting-and-growing-guides/lighting-houseplants"],
    ready: ["Ready.gov (from the owner report) (OFFICIAL SOURCE LINKED BUT NOT OPENED)", "https://www.ready.gov/"]
  };
  var G = [];
  function add(g) { g.checkedOn = "29 Oct 2026"; g.status = "partly"; g.difficulty = g.difficulty || "Practical"; g.icon = g.icon || "leaf"; g.source = g.sources.length ? g.sources[0][1] : ""; G.push(g); }
  function find(id) { var gs = (window.LOAD_CORE && window.LOAD_CORE.guides) || []; for (var i = 0; i < gs.length; i++) if (gs[i].id === id) return gs[i]; return null; }
  function pic(id, file, alt, cap) { var g = find(id); if (!g) return; g.sections = (g.sections || []).concat([{ h: "Picture (Part 5)", img: "assets/pics/" + file + ".jpg", alt: alt, items: [cap] }]); }

  /* exact supplied filenames: p5-*.jpg */
  pic("gr-find-seeds", "p5-seed-selection", "Food-safe seeds from tomatoes, peppers and squash laid out on a board beside the fruit.", "Seeds from tomatoes, peppers and squash. Hybrid shop fruit may not grow the same plant.");
  pic("gr-find-seeds", "p5-seed-test", "Paper-towel germination test: seeds sprouting on a damp paper towel in a glass dish.", "Paper-towel test: count ten seeds, keep the towel damp, not dripping.");
  pic("gr-indoor-garden", "p5-drainage-pots", "Clean recycled pots with drainage holes holding young plants.", "Reused tubs need drainage holes and a tray underneath.");
  pic("gr-indoor-garden", "p5-reused-container", "A hand filling a reused food tub with growing mix.", "Fill a clean food tub with clean growing mix. Leave headspace.");
  pic("gr-indoor-garden", "p5-foil-reflector", "Plants in tubs on a windowsill with a foil-covered backdrop behind them.", "A foil backdrop only redirects daylight that is already there. It does not double the light.");
  pic("gr-indoor-garden", "p5-led-desk-lamp", "An LED desk lamp over trays of small leafy plants.", "A cool-running LED lamp over seedlings. Keep wiring dry and away from children and pets.");
  pic("gr-regrow-scraps", "p5-water-regrowth", "Green onion and celery scraps regrowing in jars of water on a windowsill.", "Green onion and celery bases in shallow water. Change the water often.");
  pic("gr-start", "p5-growing-harvest", "Container tomato plants and leafy greens in tubs.", "Container tomatoes and greens. Indoor growing adds fresh food. It does not replace stored food.");
  pic("diet-plant-based", "p5-vegan-pantry", "A plant-based pantry: jars of beans and grains, tofu, nuts and greens.", "Vegan pantry foods. Plan a reliable vitamin B12 source.");
  pic("diet-plant-based", "p5-vegetarian-food", "Eggs, milk, yogurt, tofu and legumes on a table.", "Vegetarian foods. Eggs and dairy do not keep safely without cold storage.");
  pic("diet-plant-based", "p5-pescatarian-food", "Canned and fresh fish with grains, beans and greens.", "Pescatarian foods. Canned fish keeps without cold storage. Check mercury advice for pregnancy and children.");
  pic("diet-gluten-free", "p5-gluten-free-staples", "Bowls of rice, grains and oats with potatoes.", "Gluten-free staples such as rice and potatoes. Oats must be labelled gluten-free.");

  add({ id: "diet-profile-checklist", area: "Food • Special diets", title: "Choose your household diet profile and work out the stockpile (3, 30, 90, 365 days)",
    intro: "This is a teaching guide, not a calorie prescription or a clinical nutrition plan. Ask a clinician or dietitian if anyone has a medical need. Plan BEFORE a crisis. " + ILL,
    first: ["Pick the diet profile first: vegan, vegetarian, pescatarian, gluten-free, allergy-safe, or mixed.", "A stockpile also needs water, fuel, a can opener and storage.", "Do not assume garden vegetables can replace the calories from stored grains, oils and legumes.", "Fridge foods such as eggs and dairy must not be assumed safe after a long outage."],
    do: [
      "Step 1. List every household member and their diet and any allergy, pregnancy, age or medical limit.",
      "Step 2. Work out each persons calories with a clinician or dietitian where there is a medical need.",
      "Step 3. Write a realistic 7-day menu using shelf-stable foods you already eat.",
      "Step 4. Write the exact amount of each ingredient per serving.",
      "Step 5. Multiply the 7-day menu by 3 over 7, 30 over 7, 90 over 7 or 365 over 7. Round up to whole packs.",
      "Step 6. Add a margin for spoilage and replacement. Plan to rotate stock, oldest first.",
      "Step 7. Work out drinking and cooking water separately.",
      "Step 8. Use the Stockpile planner and pick your diet in the Diet box. Vegan, vegetarian, pescatarian, gluten-free and nut-free are there. It removes foods, and does not rebalance calories.",
      "Step 9. Test the menu with no fridge and no electric stove.",
      "Step 10. Checklist: household members and diets, allergies and medical limits, a vitamin B12 plan if vegan, food rotation dates, hand-washing and clean tools, no-power food and cooking water, and a plan for any medicine that needs power or cold.",
      "Step 11. No-store version: count what you already have in your cupboards, write your own 7-day menu from it, and see how many days it lasts."
    ],
    warn: ["Do not use adult amounts for babies or small children.", "Kidney disease, diabetes and other medical diets need clinician-approved swaps. Do not swap in extra potassium foods or protein powders without advice."],
    tip: ["Keep a printed copy of the profile with the kit."],
    after: ["Re-check dates and the menu every six months."],
    sources: [SRC.myplate, SRC.ods],
    unconfirmed: [NOTE, "The method follows the owner Part 5A. We did not open MyPlate or NIH pages. " + GEN] });

  add({ id: "diet-nutrient-watch", area: "Food • Special diets", title: "Nutrients to watch, and food safety when the power is out",
    intro: "A stockpile of cans and grains can be short of key nutrients. This is a plain watch list. Pregnancy, infancy and long illness need personal advice. Plan BEFORE a crisis.",
    first: ["Protein at every meal: beans, lentils, soy, eggs or dairy where allowed, fish.", "Vegans need a reliable vitamin B12 source. Plain plant foods do not supply it.", "Never taste a food to test it. Throw out bulging, leaking or badly damaged cans.", "Keep food above floodwater."],
    do: [
      "Protein. Include meaningful protein from legumes, soy, dairy or eggs where allowed, or fish.",
      "Vitamin B12. Vegans: use fortified foods or a supplement from a reliable source.",
      "Iron. Beans, lentils and fortified foods. Foods with vitamin C help plant iron absorption.",
      "Calcium and vitamin D. Fortified plant milks or suitable dairy.",
      "Iodine. Iodised salt or verified sources. Do not rely on unmeasured seaweed.",
      "Omega-3. Flax, chia or walnuts, and ask about other sources for some diets.",
      "Sodium. Check how salty canned products are.",
      "Pregnancy. Avoid raw sprouts and high-mercury fish. Have a prenatal vitamin and a food-safety plan with your clinician.",
      "Older adults. Check water, chewing and swallowing, calories, protein and packaging they can open.",
      "Children. Match food texture and choking safety to age. Do not use adult amounts.",
      "Power-out food safety. A closed fridge keeps food safe about 4 hours, a full freezer about 48 hours. Once opened, food may need eating at once if there is no cold. Follow official outage advice.",
      "Fish. Read product warnings and local fish advice.",
      "No-store version: rice and beans, potatoes, canned fish you already own, eggs and milk powder if your diet allows, and a note of what you are missing."
    ],
    warn: ["Do not add supplements without checking the dose.", "A medical diet needs a clinician plan."],
    tip: ["Write the watch list on the stockpile sheet."],
    after: ["Review the list when anyone is pregnant, ill or starts a new diet."],
    sources: [SRC.ods, SRC.fish, SRC.outage],
    unconfirmed: [NOTE, "The list follows the owner Part 5A. We did not open the NIH, FDA or FoodSafety.gov pages. The fridge and freezer times are the same figures used in the power outage guides. " + GEN] });

  function story(id, title, intro, frames, warn) {
    add({ id: id, area: "Scenarios • Picture stories", icon: "shield", title: title, intro: intro + " " + ILL,
      first: ["Six steps, one action each.", CALL, "Beginner mode: read one step at a time. Expert mode: read the whole list.", "No pictures are made for this story yet. It is text only until they are supplied."],
      do: frames.map(function (f, i) { return "Frame " + (i + 1) + ". " + f; }),
      warn: warn, tip: ["Print this page and keep it with your go-bag.", "Tick each step when you do it."], after: ["Practise the steps once with your household."],
      sources: [SRC.ready], unconfirmed: [NOTE, "The story follows the owner Part 8 sheet. " + GEN] });
  }

  story("story-p8-home-safe", "Story: Keep your home safe",
    "Simple steps for a household that wants to stay safe at home, with a clear way out.",
    ["Lock doors and check weak points such as a loose latch or a gap. Do not block any way out.", "Cover windows from the inside for privacy and to hide light, if there is a real need. Keep one window you can open, and never cover smoke or carbon monoxide alarms.", "Keep exits clear and easy to use. Practise leaving in the dark.", "Use battery-operated door or window alarms that cannot trip a person. Do not use candles for light.", "Keep flashlights, a radio and a whistle where everyone can reach them.", "Agree a household check-in plan: who checks the doors, when, and who calls for help. In danger, call 911 or 112."],
    ["Fire first: never block or lock an exit you may need.", "Do not use candles, fuel heaters or stoves in a covered room.", "Do not set traps or hurtful devices at doors."]);

  story("story-p8-pets", "Story: Pets and animals",
    "Keep pets fed, healthy, warm and part of the plan. Use the Dog supply planner and the Pantry planner for numbers.",
    ["Store pet food and water. Use the label and your vet for amounts. Rotate the food.", "Keep essential pet supplies: carrier, lead, medicines, records and a recent photo.", "Plan for when supplies run low. Do not feed pets chocolate, grapes, raisins, onions or anything with xylitol. Ask a vet about safe swaps.", "Manage waste: scoop and bag it. Keep it away from food and water. Wash hands.", "Include pets in the evacuation plan. Find where pets are allowed before you need it.", "Keep pets warm, cool and safe. Never leave a pet in a closed car or in floodwater."],
    ["Do not leave pets behind in a flood.", "Pet medicines need a vet. Do not guess a dose."]);

  if (window.LOAD_CORE && window.LOAD_CORE.guides) {
    G.forEach(function (g) { window.LOAD_CORE.guides.push(g); });
  }
})();
