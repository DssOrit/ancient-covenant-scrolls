/* Food catching, growing to replace stored food, and special diets. 9 new guides and 2 patches.
   Written 29 Oct 2026 at the owner request: food catching must be fully on the site, and gardening is shown as how stored food is replaced over time.
   Legal status is never claimed. Every catching guide says legal status is not verified and tells the reader how to check. No product names. Not legal or medical advice. */
(function () {
  var NOTE = "We read search results and relayed reports about these topics. We could not open the pages, so each source is labelled OFFICIAL SOURCE LINKED BUT NOT OPENED or DATA UNVERIFIED.";
  var GEN = "Steps marked as general practice are common advice. We did not find a named source for each one.";
  var LEGAL = "LEGAL STATUS NOT VERIFIED for your place. No emergency gives an automatic right to trap, fish, hunt or enter private land. Do the 10 checks in the trapping rules guide first, and write the answers on paper before a crisis.";
  var CALL = "In danger to life, call 911 (US) or 112 (Portugal) first, if the phone works.";
  var SRC = {
    army: ["US Army Survival manual FM 21-76 (publisher site, the manual itself was not opened) (OFFICIAL SOURCE LINKED BUT NOT OPENED)", "https://armypubs.army.mil/"],
    psu: ["Penn State Extension: proper field dressing and handling of wild game and fish (OFFICIAL SOURCE LINKED BUT NOT OPENED)", "https://extension.psu.edu/proper-field-dressing-and-handling-of-wild-game-and-fish"],
    tul: ["Utah Department of Health: tularemia fact sheet (OFFICIAL SOURCE LINKED BUT NOT OPENED)", "https://epi.utah.gov/wp-content/uploads/tularemia_factsheet.pdf"],
    dgrm: ["Portugal DGRM: permitted and prohibited recreational marine fishing gear (from the owner Part 3D file) (OFFICIAL SOURCE LINKED BUT NOT OPENED)", "https://dgrm.pt/pt/web/guest/artes-e-utensilios-de-pesca"],
    fwc: ["Florida FWC: freshwater fishing regulations (from the owner Part 3D file) (OFFICIAL SOURCE LINKED BUT NOT OPENED)", "https://myfwc.com/fishing/freshwater/regulations/"],
    celiac: ["Celiac Disease Foundation (site home page, specific page not opened) (DATA UNVERIFIED: unofficial source, linked but not opened)", "https://celiac.org/"],
    fda: ["US FDA (site home page, specific allergen page not opened) (OFFICIAL SOURCE LINKED BUT NOT OPENED)", "https://www.fda.gov/"],
    eu: ["European Commission food safety (site home page, specific allergen page not opened) (OFFICIAL SOURCE LINKED BUT NOT OPENED)", "https://food.ec.europa.eu/"],
    aap: ["American Academy of Pediatrics HealthyChildren (site home page, specific page not opened) (OFFICIAL SOURCE LINKED BUT NOT OPENED)", "https://www.healthychildren.org/"]
  };
  var G = [];
  function add(g) { g.checkedOn = "29 Oct 2026"; g.status = "partly"; g.difficulty = g.difficulty || "Practical"; g.icon = g.icon || "leaf"; g.source = g.sources.length ? g.sources[0][1] : ""; G.push(g); }
  function patch(id, fn) { var gs = (window.LOAD_CORE && window.LOAD_CORE.guides) || []; for (var i = 0; i < gs.length; i++) { if (gs[i].id === id) { fn(gs[i]); return; } } }

  /* ---- Trapping rules: replaces the page that withheld snare steps ---- */
  patch("trap-no-snare", function (g) {
    g.title = "Trapping and catching food: the rules to check and which method to choose";
    g.intro = "Catching food is a survival skill. This page gives the checks to make first and helps you choose a method. The method guides follow: snare, deadfall, fish trap, small game. " + LEGAL;
    g.first = [
      CALL,
      LEGAL,
      "Stored food and fast food (sprouts, greens) come first. Fishing with a line is usually the simplest catch to check.",
      "Never set a trap where a child, a pet or another person could be hurt. Never use poison."
    ];
    g.do = [
      "Check 1. Know the country, state, land owner and the exact water or land. A mapped river does not mean public access.",
      "Check 2. Find the allowed species, the season, and any no-take or protected area.",
      "Check 3. Find the rule for the gear: trap type, size, mesh, bait, labels, how often to check, where it may be set.",
      "Check 4. Find out if a licence or permission is needed. Private land needs the owner permission.",
      "Check 5. Check floods, current, tide, water quality and a safe bank. Never go into dangerous water for gear.",
      "Check 6. Find the size, bag limit and release rules.",
      "Check 7. Check fish advice, shellfish closures, pollution and algae warnings.",
      "Check 8. Choose gear that lets you release a wrong catch quickly. Do not leave gear that can tangle animals unchecked.",
      "Check 9. Get clean handling gear: safe water, a cooler or ice, gloves, a food thermometer.",
      "Check 10. If a rule is unknown, write LEGALITY UNCONFIRMED on your paper. Prefer line fishing or another food source. If you choose to go ahead, you carry the risk: keep gear selective, checked often and fully removed.",
      "Which method: line fishing (most selective, easy to check), then fish trap or weir, then snare, then deadfall. See each guide.",
      "Write your answers on paper and keep them with the guide. The law may change, and your phone may not work."
    ];
    g.warn = [
      "Traps can catch pets, protected animals and children. Keep them away from paths and homes.",
      "Abandoned gear pollutes and keeps catching. Always take every piece back.",
      "In Portugal, recreational marine traps (cages, pots, baskets) are prohibited, as the DGRM page given to us says. Freshwater rules differ. We did not check your water."
    ];
    g.tip = ["Learn from a local hunter or fisher before a crisis. They know the land and the rules.", "Take a hunter education or trapper course if one is offered."];
    g.after = ["Check traps at dawn and dusk. Clean the catch fast. Cook it fully."];
    g.sources = [SRC.army, SRC.dgrm, SRC.fwc];
    g.source = g.sources[0][1];
    g.unconfirmed = [NOTE, "The 10 checks come from the owner Part 3D file, given to us. We did not verify any local rule. The ranking of methods by how selective they are is general practice. " + GEN];
    g.status = "partly";
  });

  add({ id: "trap-snare-small", area: "Food • Traps and catch", title: "Snare for small game: how it works, how to set it, how to check it",
    intro: "A snare is a wire or cord loop that tightens when an animal pushes through. It is one of the oldest ways to catch small animals. " + LEGAL,
    first: [LEGAL, "Wear gloves. Wash hands after handling any wild animal. See the small game guide.", "Check a snare at dawn and dusk so an animal does not suffer.", "Never set one near a path, a home, a school or where pets run."],
    do: [
      "You need: thin strong wire or cord (soft wire is easiest), a stake or a strong anchor, gloves, a knife.",
      "Step 1. Find signs of animals: trails through grass, droppings, chewed plants, tracks near cover, banks, hedges and walls.",
      "Step 2. Pick a narrow run where the animal must pass. Do not set on a wide open path.",
      "Step 3. Make a loop with a slip knot so it tightens and slides freely. Keep the wire straight and free of kinks.",
      "Step 4. Size: about the size of your fist for rabbit-size animals, with the loop about a hand-width above the ground. Change the size and height for other animals. This is general practice.",
      "Step 5. Tie the other end firmly to a stake or a strong root so the animal cannot drag it far.",
      "Step 6. Hold the loop open with the light stick or grass so it stands in the run. Clear loose twigs that could set it off.",
      "Step 7. Wash your hands before you set it. Rubbing your hands with soil or leaves lowers your scent. This is common practice.",
      "Step 8. Leave and keep away. Come back at dawn and dusk.",
      "Step 9. If an animal is caught, approach calmly and end its suffering quickly. Never let it suffer.",
      "Step 10. Take the snare up if you catch nothing for two days. Move it. Take every piece home."
    ],
    warn: ["A snare can catch a pet or a protected animal. If you catch the wrong animal, release it if you safely can.", "Snares can hurt people. Mark the area for your own family and warn them.", "Never leave a snare set when you leave the area."],
    tip: ["More traps do not mean more food. Check each one often.", "Practise tying the knot at home with string first."],
    after: ["Skin and cook the catch the same day. See the small game guide."],
    sources: [SRC.army, SRC.psu],
    unconfirmed: [NOTE, "The loop size and height are common figures in survival teaching. We did not open the manual, so we cannot confirm exact numbers. Laws on snares differ by place and we did not check any. " + GEN] });

  add({ id: "trap-deadfall", area: "Food • Traps and catch", title: "Deadfall (figure-4 trigger): how it works and how to set it safely",
    intro: "A deadfall drops a heavy weight on an animal that moves a bait stick. It is dangerous to the person setting it. " + LEGAL,
    first: [LEGAL, "The weight can crush your hand. Test the trigger with a small weight first.", "Keep children and pets away. Never set where a person might step.", "Wear gloves. Wash hands after any contact with a wild animal."],
    do: [
      "You need: a heavy flat rock or log, three straight sticks (one upright, one diagonal, one bait arm), a knife, bait.",
      "Step 1. Pick a place on an animal run, with a flat firm base.",
      "Step 2. Cut the three sticks. The upright is about as long as the weight is wide. The bait arm is longer. The diagonal links the two.",
      "Step 3. Cut a notch in the top of the upright and a matching notch near the end of the bait arm. Cut the diagonal so it links the top of the upright to the notch in the bait arm. Together they form the number 4 shape.",
      "Step 4. Practise the trigger on the ground with no weight until it holds and then falls apart when the bait arm is nudged.",
      "Step 5. Stand the upright. Lean the edge of the weight on its top. Fit the diagonal and the bait arm so the figure-4 holds the weight up.",
      "Step 6. Put bait on the end of the bait arm. Use a long stick to set the last piece so your hand is never under the weight.",
      "Step 7. Check it from a distance. Come back at dawn and dusk.",
      "Step 8. Take it down when you leave. Lower the weight with a lever, never with your hands under it."
    ],
    warn: ["Never reach under the weight. Use a long stick to set it.", "Pets, children and protected animals can be killed. Keep it away from paths.", "A heavy weight can fall if the ground shifts."],
    tip: ["Use a smaller weight than you think. It only needs to kill small game quickly.", "Practise with a pebble first, then a small stone."],
    after: ["Handle the animal with gloves and cook it fully. See the small game guide."],
    sources: [SRC.army],
    unconfirmed: [NOTE, "The figure-4 design is described from general survival teaching. We did not open the manual and cannot confirm the exact dimensions, so we give none. Laws differ by place. " + GEN] });

  add({ id: "trap-fish-weir", area: "Food • Traps and catch", title: "Stone fish trap or basket trap in a stream: how it works",
    intro: "A V-shaped line of stones guides small fish into a basket or a pool. It is a very old method. " + LEGAL,
    first: [LEGAL, "In Portugal recreational marine traps (cages, pots, baskets) are prohibited, per the DGRM page given to us. Rivers and streams follow other rules. We did not check yours.", "Never go into fast or deep water for gear.", "Fish need cooking fully. Check pollution and fish advice."],
    do: [
      "Step 1. Find slow shallow flowing water with a firm bed and a safe bank.",
      "Step 2. Check pollution, floods, algae and fish advice. If you cannot check, do not eat the catch.",
      "Step 3. Build two lines of stones in a V shape, with the point facing downstream.",
      "Step 4. At the point, leave a small gap and place a basket, net or pool so fish gather there.",
      "Step 5. Keep the walls low and the gaps small. Fish should be able to swim around if you want to release them.",
      "Step 6. Check twice a day. Take out the fish you may keep. Release the others fast.",
      "Step 7. Take down the stones and take every piece of gear home when you finish. Do not block the whole stream.",
      "Step 8. Keep fish cold and clean it fast. See the guide on cleaning and cooking fish."
    ],
    warn: ["Do not block the whole stream. Fish and people downstream need it.", "Do not wade in flood or fast water.", "Do not eat fish from polluted water or during an algae warning."],
    tip: ["Line fishing is easier to check against the rules. Try that first. See the simple fishing gear guide."],
    after: ["Cook fish to 145 F (63 C) or until it flakes. Discard fish that was not kept cold."],
    sources: [SRC.army, SRC.dgrm],
    unconfirmed: [NOTE, "The V-shaped weir is a traditional method described in survival teaching. We did not confirm the design with a source. The Portugal marine ban is from the owner Part 3D file. The cooking temperature is a common figure we did not verify here. " + GEN] });

  add({ id: "game-skin-small", area: "Food • Traps and catch", title: "Skin, gut and cook small game (rabbit, squirrel): step by step",
    intro: "Small game can be a good food. Wild animals can carry disease, so handle and cook them with care. " + LEGAL,
    first: ["Do not handle an animal that looks sick or acts strangely.", "Wear gloves and eye protection. Even a small cut can let germs in.", "Cool the meat fast and cook it fully.", "Wash your hands with soap and safe water after."],
    do: [
      "Step 1. Look at the animal. Discard it if it is slow, has spots on the liver, sores, or smells wrong.",
      "Step 2. Wear gloves. Put the animal on a clean board away from the kitchen.",
      "Step 3. Make a small cut across the back skin. Pull the skin apart each way, like taking off a coat. Cut off the feet and the head.",
      "Step 4. Make a shallow cut along the belly. Do not cut the gut. Pull out the organs with your hand.",
      "Step 5. Check the liver. White or yellow spots mean throw the animal away. Wash your hands and gloves.",
      "Step 6. Bury or burn the guts well away from water, children and dogs. Do not feed raw guts to dogs.",
      "Step 7. Rinse the body with clean water and cool it. Keep it below 40 F (4 C) if you can.",
      "Step 8. Cook until the meat reaches 165 F (74 C) all through. Cut one piece open to check.",
      "Step 9. Wash the knife and board with soap and hot safe water. Wash hands again."
    ],
    warn: ["Rabbits and other wild animals can carry tularemia. Wear gloves, and cook meat fully.", "If you get fever or a sore after handling a wild animal, see a clinician.", "Do not eat meat from an animal found dead."],
    tip: ["Do this outside on a board you can wash. Keep flies off the meat."],
    after: ["Cooked meat keeps only a short time without cold. Eat it the same day."],
    sources: [SRC.psu, SRC.tul],
    unconfirmed: [NOTE, "The 165 F cooking target and the glove advice come from the extension and health pages given to us. The skinning steps are general practice. Laws on taking game differ by place and we did not check any. " + GEN] });

  /* ---- Gardening as the long-term replacement for stored food ---- */
  add({ id: "gr-replace-stored-food", area: "Home skills • Grow food", icon: "leaf", title: "Growing food to replace stored food: the plan, the months and the crops that feed you",
    intro: "Stored food runs out. In a long event, growing is how you replace it. It takes months. This plan shows how to bridge the gap and which crops give calories. Keep your stored food while you grow.",
    first: [
      "Start growing early, before stores run low. Plants need months.",
      "Calorie crops feed you: potatoes, dry beans, corn, winter squash, sweet potatoes, grains. Salad crops give vitamins and little energy.",
      "A windowsill gives herbs and greens, not a family meal. A yard or field is what replaces stored food.",
      "Save seed from the best plants. Seed is the next season food."
    ],
    do: [
      "Step 1. Count your stored food in days. Write the number on paper.",
      "Step 2. Count the days from planting to a first harvest of a calorie crop. Use the seed packet number.",
      "Step 3. If your stored food will run out before that harvest, the gap is hunger. Plan to stretch stores, trade, or catch food to cover the gap. See How to make food last.",
      "Step 4. Plant fast crops first (radish, greens, sprouts) for vitamins and morale. Plant calorie crops at the same time.",
      "Step 5. Typical time from seed to harvest, from seed packets (check your own packet): radish 3 to 4 weeks, lettuce 4 to 8 weeks, bush beans 50 to 65 days, tomatoes 60 to 85 days after transplanting, corn 60 to 100 days, potatoes 70 to 120 days, winter squash 85 to 120 days, sweet potatoes 90 to 150 days.",
      "Step 6. Give each crop what it needs: sun, water, soil and space. See the crop and plant cards.",
      "Step 7. Keep pests off and water steady. Watch for disease. See troubleshooting.",
      "Step 8. Harvest, dry and store beans and grain. Cure potatoes and squash in a cool dark place. See the preserve food guide.",
      "Step 9. Save seed from the strongest plants and store it dry. See the seed saving guide.",
      "Step 10. Share the work and the seed with neighbours. A group can grow more than one person.",
      "Step 11. No-store version: use seeds from food you already have (dry beans, potatoes with eyes, a squash seed), saved seed and cuttings from neighbours, and scrap regrowing. See Find seeds and things to plant."
    ],
    warn: ["Do not rely on indoor greens alone. They do not give enough calories.", "A failed crop in the first season can happen. Do not use up your last stored food waiting for a harvest.", "Wash garden food. Do not use unsafe water or fresh human waste on food crops."],
    tip: ["Plant more than you think you need. Some will fail.", "Write down dates, what you planted and what worked."],
    after: ["After harvest, plan next season now. Save seed and compost scraps."],
    sources: [SRC.army],
    unconfirmed: [NOTE, "The growing times are typical seed-packet ranges and vary by variety, climate and light. We did not verify them for your place. We found no source for the order in this plan, which is general practice. Crops and planting windows differ in the United States and Portugal and we did not check local calendars. " + GEN] });

  patch("gr-start", function (g) {
    g.first = (g.first || []).concat(["Growing is how stored food is replaced over time. Read Growing food to replace stored food for the plan and the months."]);
  });

  /* ---- Special diets ---- */
  add({ id: "diet-gluten-free", area: "Food • Special diets", icon: "leaf", title: "Gluten-free eating and stockpiling (including celiac disease)",
    intro: "Gluten is in wheat, barley and rye. People with celiac disease or gluten sensitivity must avoid it. Plan this before a crisis. Ask a clinician about your own needs.",
    first: ["Avoid wheat, barley, rye and foods made from them. Spelt, kamut and triticale also contain gluten.", "Oats are often mixed with wheat. Choose oats labelled gluten-free.", "Even small amounts can harm a person with celiac disease.", "If you cannot be sure a food is safe, choose a food that is naturally gluten-free."],
    do: [
      "Step 1. Naturally gluten-free foods: rice, corn and cornmeal, potatoes, dry beans, lentils and chickpeas, buckwheat (a seed, not wheat), millet, quinoa, meat, fish, eggs, fruit, vegetables, plain dairy.",
      "Step 2. Watch for hidden gluten: soup, sauces, soy sauce, bouillon cubes, flavoured snacks, some canned foods, and mixed spices. Read every label.",
      "Step 3. Stockpile: use the Stockpile planner and choose Gluten-free in the Diet box. It removes wheat, pasta, oats, crackers, cereal, bars and bouillon from the list. It does not add more of the other foods, so add more rice, corn, potatoes and beans.",
      "Step 4. Buy foods labelled gluten-free. Keep them in a separate bin.",
      "Step 5. Avoid cross-contact: use clean pots, a separate toaster or board, and clean utensils. Crumbs of wheat bread can contaminate.",
      "Step 6. Cook simple: rice and beans, potatoes, eggs, fish, soup from scratch.",
      "Step 7. Keep gluten-free medicine: ask your pharmacist, as some tablets use wheat starch.",
      "Step 8. If a crisis leaves you with only unsafe food, ask a clinician for a plan before eating it. Seek care for severe symptoms."
    ],
    warn: ["Do not guess. If a label is unclear, do not eat it.", "Baby cereal and many ready meals contain wheat. Check them."],
    tip: ["Keep a printed list of safe foods and a small card to show others."],
    after: ["Replace opened stores and check dates every six months."],
    sources: [SRC.celiac],
    unconfirmed: [NOTE, "The list of foods and the cross-contact advice are general knowledge about celiac disease. We did not open a specific page. The planner removal list is our own rule. " + GEN] });

  add({ id: "diet-allergy-aware", area: "Food • Special diets", icon: "leaf", title: "Allergy-aware eating: food allergies in an emergency",
    intro: "Food allergies can be life-threatening. In an emergency, shops and clinics may be closed. Plan before a crisis. Ask your clinician for a written allergy plan.",
    first: [CALL, "Know the signs of a severe reaction: trouble breathing, swelling of the face or throat, widespread hives, vomiting, fainting.", "If you have an epinephrine auto-injector, use it as your plan says, then call 911 (US) or 112 (Portugal).", "Antihistamine tablets do not treat a severe reaction."],
    do: [
      "Step 1. List each allergy in your household. Write it on paper and keep it in the kit.",
      "Step 2. Know the main allergens. In the United States, common ones are milk, egg, fish, shellfish, tree nuts, peanuts, wheat, soy and sesame. In the European Union the list is longer and also includes celery, mustard, lupin, molluscs and sulphites.",
      "Step 3. Stockpile with the Stockpile planner. Use the Nut-free diet box for nuts and peanuts. For other allergies, read labels and remove those items by hand.",
      "Step 4. Read every label, every time. Words like may contain can matter. Recipes change.",
      "Step 5. Keep epinephrine in date. Keep at least two with the person. Ask the clinician how to store them and how many to keep.",
      "Step 6. Keep a written plan, the doses, and the clinician phone number.",
      "Step 7. Avoid cross-contact: clean pots and boards, separate spoons.",
      "Step 8. Tell neighbours and helpers about the allergy. Wear an allergy tag.",
      "Step 9. Safe swaps: plant milk or water for milk, cooked apple or banana for egg in baking, seeds for nuts (not if allergic). Ask a clinician, as swaps are not safe for everyone.",
      "Step 10. In an emergency shelter, ask what is in the food. If you cannot be sure, do not eat it."
    ],
    warn: ["Do not test a food you are unsure about.", "A mild reaction can become severe. Do not wait.", "Do not share food that others in the household are allergic to."],
    tip: ["Practise with a trainer auto-injector.", "Keep a spare in the car and the go bag."],
    after: ["See a clinician after any serious reaction, even if you feel better."],
    sources: [SRC.fda, SRC.eu],
    unconfirmed: [NOTE, "The allergen lists are general knowledge. We did not open the specific US or EU pages, so check them. The emergency steps are general, and your own clinician plan decides. " + GEN] });

  add({ id: "nutrition-children", area: "Food • Special diets", icon: "leaf", title: "Feeding babies and children in an emergency",
    intro: "Babies and children need more care with food and water. Plan before a crisis. Ask a children clinician about your child. This guide is general.",
    first: [CALL, "Babies under 6 months need only breast milk or infant formula.", "Never dilute or stretch formula. Mix it exactly as the pack says, with safe water.", "Do not give honey to a baby under 12 months.", "Keep a sick child drinking. See the oral rehydration guide."],
    do: [
      "Step 1. Babies: if breastfeeding, keep going. Feed often and drink water yourself.",
      "Step 2. Formula: keep at least two weeks of formula and feeding gear. Use boiled water cooled, or ready-to-feed formula. Clean bottles with safe water and soap.",
      "Step 3. Do not give plain water to a baby under 6 months unless a clinician says so.",
      "Step 4. Starting solids at about 6 months: soft mashed foods, rice cereal or porridge, mashed beans, cooked vegetables and fruit. Keep breast milk or formula as the main drink.",
      "Step 5. Toddlers and children: offer small meals and snacks often. Include protein (beans, eggs, fish, meat) and fats (oil, nut butter if no allergy).",
      "Step 6. Choking: for children under 4 avoid whole nuts, whole grapes, hard raw vegetables and popcorn. Cut food small.",
      "Step 7. In the planner, put the number of children under 10. The planner counts them at about 60 percent of an adult amount.",
      "Step 8. Water: keep extra. Children dry out faster in heat and with diarrhoea or vomiting.",
      "Step 9. Vegetarian or vegan children need planning for iron, B12, zinc and calories. Ask a clinician.",
      "Step 10. Check on children who refuse food for more than a day. Seek care for fever, dry mouth, no urine for 8 hours, or lethargy.",
      "Step 11. See also the pregnancy and seniors guides for the people who care for them."
    ],
    warn: ["Never leave a baby with a bottle propped.", "Do not feed honey to babies.", "Do not give adult medicines to children without checking the dose."],
    tip: ["A comfort food from home helps a stressed child eat.", "Keep baby food in small jars or pouches you can open quickly."],
    after: ["Re-check formula dates and stored baby food every few months."],
    sources: [SRC.aap],
    unconfirmed: [NOTE, "The advice is general child feeding guidance. We did not open a specific page, so check with your child clinician. The 60 percent figure is from the planner. " + GEN] });

  if (window.LOAD_CORE && window.LOAD_CORE.guides) {
    G.forEach(function (g) { window.LOAD_CORE.guides.push(g); });
  }
})();
