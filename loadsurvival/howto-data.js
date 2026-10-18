/* How-to guides and supply lists from the "Step-by-Step How-To and Supply Lists" document.
   Rewritten in plain language. Status labels follow the checks done on 18 Oct 2026.
   Checked = a named official page shows the figure. Not confirmed = we found no source. */
(function () {
  var CD = "18 Oct 2026";
  var CDC_WATER = ["CDC: how to create and store an emergency water supply", "https://cdc.gov/water-emergency/about/how-to-create-and-store-an-emergency-water-supply.html"];
  var G = [
    {
      id: "ht-store-water", icon: "drop", area: "Water", difficulty: "Essential",
      title: "Store emergency water in containers",
      intro: "Clean, sealed, labelled containers keep water safe to drink for months.",
      status: "checked", checkedOn: CD, sources: [CDC_WATER],
      unconfirmed: ["Whether to add bleach to stored tap water differs between local water suppliers and the CDC. The CDC says clean tap water can be stored without bleach and treated later if needed. Follow your local water supplier."],
      first: ["Use food-grade containers with tight lids. Use unbreakable material, not glass.", "Never use a container that held bleach, pesticides or other chemicals.", "Plan at least 1 gal (4 L) per person per day for 3 days. Aim for 2 weeks."],
      do: ["Wash the container with soap and rinse it well.", "Sanitize it. Mix 1 teaspoon of plain unscented household bleach (5% to 9%) into 1 quart (about 1 L) of water. Pour it in, cover, and shake so it touches every inside surface. Wait at least 30 seconds.", "Pour the solution out and let the container air-dry.", "Fill it with clean water and close the lid tightly. Label it \"drinking water\" with today's date.", "Store it in a cool place, 50 to 70 F (10 to 21 C), away from sunlight, gasoline and pesticides. Replace home-filled water every 6 months. Take water out with a clean scoop and never touch the inside."],
      warn: ["Do not store water near fuel or chemicals. Fumes pass through plastic.", "Add more water for pregnancy, illness, pets and hot weather."],
      tip: ["Follow the date printed on store-bought water.", "Keep a small bottle of plain unscented bleach for treating water later."],
      after: ["Set a reminder to swap the water every 6 months.", "Check containers for leaks and cracks."]
    },
    {
      id: "ht-cook-no-power", icon: "flame", area: "Food", difficulty: "Practical",
      title: "Cook without power",
      intro: "Eat what spoils first. Cook only outdoors or in a well-ventilated space.",
      status: "general", unconfirmed: ["This guide is general guidance. It was not checked against a named official source."],
      first: ["Eat fresh food first, then frozen food, then tinned and dry food.", "Cook outdoors, or in a well-ventilated space, on a camp stove or gas burner.", "Never use charcoal or a camp stove indoors."],
      do: ["Place the stove on stable, level ground, away from anything that burns.", "Keep spare fuel away from the flame.", "Boil only the water you need. Use a lid to save fuel.", "Keep a manual can opener in the kit.", "Wash hands and tools with safe water before you cook."],
      warn: ["Carbon monoxide kills. Never run any fuel-burning stove, grill or heater inside.", "Throw out food that was above 40 F (4 C) for too long. See Power outage."],
      tip: ["Plan meals that need little water and little cooking.", "Cook one big pot and share it."],
      after: ["Let the stove cool before you store it.", "Wash pots with safe water."]
    },
    {
      id: "ht-shelter-in-place", icon: "home", area: "Shelter", difficulty: "Critical",
      title: "Shelter in place",
      intro: "Use this for chemical events, smoke, radiation or severe storms when officials tell you to stay where you are.",
      status: "partly", checkedOn: CD, sources: [["CDC: About Radiation Emergencies", "https://www.cdc.gov/radiation-emergencies/about/"]],
      unconfirmed: ["Only the radiation advice (get inside, stay inside, stay tuned, remove outer clothing) was confirmed with the CDC.", "The advice not to collect children from school was not found in the CDC results. Follow the school and officials.", "The steps for chemical and smoke events are general guidance and were not checked against a named source."],
      first: ["Go inside and stay inside. Bring pets.", "Close and lock all windows and doors.", "Keep the radio on and wait for officials to say it is safe."],
      do: ["For chemical or smoke events, turn off fans, air conditioning and heating that draw in outside air. Do not do this for storms.", "Choose an interior room with few windows.", "If officials advise it, cover door and window gaps with plastic sheeting and tape the edges.", "For radiation, take off your outer clothing, wash, and put the clothes in a sealed bag.", "Stay until officials say it is safe to leave."],
      warn: ["Never seal a room that has a fuel-burning heater, stove or generator. Carbon monoxide kills.", "Do not go out to look. Wait for official word."],
      tip: ["Keep water, a radio, a torch and a first-aid kit in your shelter room.", "Practise once a year."],
      after: ["Open windows and ventilate only when officials say it is safe.", "Follow instructions about contaminated clothes."]
    },
    {
      id: "ht-warm-cool", icon: "thermo", area: "Shelter", difficulty: "Essential",
      title: "Stay warm or stay cool",
      intro: "Heat and cold both hurt quickly. Use one room, layers and water.",
      status: "general", unconfirmed: ["This guide is general guidance. It was not checked against a named official source."],
      first: ["Cold: heat one room only and close the doors to the others.", "Heat: go to the coolest room and close the curtains on sunny windows.", "Never use a charcoal grill, camp stove or generator indoors."],
      do: ["Cold: wear layers and a hat. Stay dry. Use blankets or a sleeping bag. Insulate windows and floors.", "Cold: shivering, confusion or drowsiness are warning signs. Warm the person slowly and call for help.", "Heat: drink water often. Put wet cloths on skin.", "Heat: check on older neighbours.", "Heat: hot, dry skin with confusion is heat stroke. Call 911 or 112 at once."],
      warn: ["Carbon monoxide kills. Never burn fuel indoors for heat.", "Do not give hot drinks to someone who is confused."],
      tip: ["Sleep with a hat in the cold.", "In heat, rest in the shade in the middle of the day."],
      after: ["Check yourself and others for cold or heat injury the next day.", "Restock blankets and water."]
    },
    {
      id: "ht-family-plan", icon: "users", area: "Essentials", difficulty: "Essential",
      title: "Make a family communication plan",
      intro: "When networks fail, an agreed plan lets everyone find each other.",
      status: "general", unconfirmed: ["This guide is general guidance. It was not checked against a named official source."],
      first: ["Choose one out-of-area contact every family member can reach.", "Write all numbers on paper cards.", "Choose two meeting points."],
      do: ["Pick one meeting point near home and one in your neighbourhood or town.", "Agree who collects children from school if networks are down.", "Agree that everyone texts \"OK\" and their location, rather than calling.", "Download offline maps (for example OsmAnd or Organic Maps) and keep a paper map.", "Practise the plan twice a year. Use the Plan tab to write it down."],
      warn: ["Phones die. Keep paper copies of numbers.", "Do not rely on one meeting point. It may be unsafe."],
      tip: ["Put a contact card in every bag and coat.", "Teach children the plan with a game."],
      after: ["Update the plan when anything changes.", "Tell the out-of-area contact about the plan."]
    },
    {
      id: "ht-evacuate", icon: "pack", area: "Essentials", difficulty: "Essential",
      title: "Evacuate: grab and go",
      intro: "Leave early. Roads fill quickly. Have the bag ready and the route known.",
      status: "general", unconfirmed: ["This guide is general guidance. It was not checked against a named official source."],
      first: ["Keep the go-bag by the door.", "Keep the car's tank at least half full.", "Leave early when told to leave."],
      do: ["Take the go-bag, medicines, documents, phone and chargers, and pets with their supplies.", "Turn off gas, power and water if you have time and know how.", "Leave a note saying where you went.", "Follow the route officials give. Do not drive through floodwater.", "Do not return until officials say it is safe."],
      warn: ["Do not wait to see if it gets worse.", "Do not take shortcuts that officials have closed."],
      tip: ["Know two routes out of your area.", "Keep a paper map and cash."],
      after: ["Tell your contact where you are.", "Check your home only when officials allow."]
    },
    {
      id: "ht-kit-quantities", icon: "list", area: "Essentials", difficulty: "Essential",
      title: "Kit quantities: 3 days, 14 days, family of four",
      intro: "A simple table of what to hold for one person and for a family.",
      status: "partly", checkedOn: CD, sources: [["Ready.gov: build a kit", "https://www.ready.gov/build-a-kit"]],
      unconfirmed: ["Core items follow Ready.gov and FEMA kit lists. FEMA's version is from 2020, and Ready.gov is being updated.", "The 14-day amounts and the numbers for a family of four are practical additions. They were not checked against a named source."],
      first: ["Build the 3-day kit first.", "Then grow it to 14 days.", "Store it where you can reach it."],
      table: { head: ["Item", "3 days, 1 person", "14 days, 1 person", "Family of 4, 14 days"], rows: [["Water", "12 L (3 gal)", "56 L (14 gal)", "224 L (56 gal)"], ["Food, ready to eat", "3 days", "14 days", "56 person-days"], ["Flashlight", "1", "1", "4"], ["Extra batteries", "1 set", "2 sets", "8 sets"], ["Whistle", "1", "1", "4"], ["Masks (N95 or FFP2)", "3", "14", "56"], ["Garbage bags and ties", "6", "20", "80"], ["Moist towelettes", "1 pack", "2 packs", "8 packs"], ["Sleeping bag or blanket", "1", "1", "4"], ["Change of clothes and sturdy shoes", "1 set", "1 set", "4 sets"], ["Lighter or waterproof matches", "1", "2", "2"], ["Plain unscented bleach", "1 small bottle", "1 bottle", "1 bottle"]] },
      do: ["One per home: battery or hand-crank radio, first-aid kit, manual can opener, wrench or pliers for utilities, paper map, paper and pencil, fire extinguisher.", "US: add a NOAA Weather Radio with tone alert.", "One per person: phone, charger and backup battery, soap, hand sanitizer with at least 60% alcohol, a mess kit.", "Add plastic sheeting, scissors and duct tape.", "Keep some cash in small notes and coins, in several places."],
      warn: ["Check dates every three months.", "Do not store water in old milk jugs."],
      tip: ["Pack items in airtight plastic bags in one or two easy-to-carry containers.", "Use the Lists tab to tick items off."],
      after: ["Review the kit every 6 months and replace expired items.", "Grow the kit one step at a time."]
    },
    {
      id: "ht-buy-order", icon: "check", area: "Essentials", difficulty: "Essential",
      title: "What to buy first: a 10-step order",
      intro: "Buy in this order. Each step builds on the last. No prices are given.",
      status: "general", unconfirmed: ["This order is a practical suggestion. It was not checked against a named official source."],
      first: ["Start with water.", "Then food, light and radio.", "Then health and safety."],
      table: { head: ["Step", "Buy", "Why first"], rows: [["1", "Water containers, bleach, 3 days of water", "Water fails first"], ["2", "3 days of ready-to-eat food, can opener", "No cooking needed"], ["3", "Radio, torches, batteries, power banks", "Information and light"], ["4", "First-aid kit, medicines, masks, hygiene", "Health"], ["5", "CO alarm, fire extinguisher, smoke alarms", "Stops the most common killers"], ["6", "Documents folder, cash, paper maps", "Recovery"], ["7", "Grow the kit to 14 days", "Longer disruption"], ["8", "Camp stove, fuel, sleeping bags", "Comfort and safety"], ["9", "Power station and solar panel", "Medium-term power"], ["10", "Water filter, extra storage, first-aid course", "Resilience"]] },
      do: ["Buy one or two steps a month. Do not rush.", "Check every item works when you buy it.", "Write the date on every item.", "Keep a list of what you have.", "Use the Lists tab to track it."],
      warn: ["Do not buy more than you can store safely.", "Do not buy untested gadgets that promise too much."],
      tip: ["Buy what your family will actually use.", "Take a first-aid course early."],
      after: ["Review the list every 6 months.", "Add steps as your budget allows."]
    }
  ];
  G.forEach(function (g) { g.after = g.after || []; g.tip = g.tip || []; g.warn = g.warn || []; g.source = (g.sources && g.sources[0] && g.sources[0][1]) || "https://www.ready.gov/"; });
  window.LOAD_HOWTO = G;
  if (window.LOAD_CORE) { window.LOAD_CORE.guides = window.LOAD_CORE.guides.concat(G); }
  var LISTS = [
    { id: 'homekit', title: 'Home kit items (Ready.gov and FEMA)', items: ['Water, 1 gal (4 L) per person per day', 'Ready-to-eat food, about 2,000 kcal a day', 'Battery or hand-crank radio', 'NOAA Weather Radio with tone alert (US)', 'Flashlight and extra batteries', 'Whistle', 'First-aid kit', 'Dust or FFP2/N95 masks', 'Plastic sheeting, scissors and duct tape', 'Moist towelettes', 'Garbage bags and plastic ties', 'Wrench or pliers to turn off utilities', 'Manual can opener', 'Local paper map', 'Phone, charger and backup battery', 'Soap, hand sanitizer (60% alcohol or more), disinfecting wipes', 'Sleeping bag or warm blanket', 'Complete change of clothes and sturdy shoes', 'Fire extinguisher', 'Waterproof matches or lighter', 'Hygiene and feminine supplies', 'Mess kit, cups, plates and utensils', 'Paper and pencil', 'Cash in small notes and coins', 'Plain unscented bleach'] },
    { id: 'special', title: 'Infants, pets, older adults, children', items: ['Infants: formula, bottles, diapers, wipes, diaper rash cream', 'Pets: food, extra water, leash or carrier, vaccination records, waste bags', 'Older adults: extra medicines and supplies, spare glasses, hearing aid batteries', 'People with ongoing needs: spare batteries and a list of devices', 'Children: books, games, puzzles and comfort items'] },
    { id: 'workkit', title: 'Work or school kit (24 hours)', items: ['Water and food for 24 hours', 'Medicines', 'Comfortable walking shoes', 'Torch', 'Phone charger or power bank', 'Paper contact card', 'Small first-aid kit', 'Warm layer'] },
    { id: 'buyorder', title: 'Buying order (10 steps)', items: ['1. Water containers, bleach, 3 days of water', '2. 3 days of ready-to-eat food and a can opener', '3. Radio, torches, batteries and power banks', '4. First-aid kit, medicines, masks, hygiene', '5. CO alarm, fire extinguisher, smoke alarms', '6. Documents folder, cash, paper maps', '7. Grow to 14 days', '8. Camp stove, fuel, sleeping bags', '9. Power station and solar panel', '10. Water filter, extra storage, first-aid course'] }
  ];
  if (window.LOAD_CORE && window.LOAD_CORE.lists) {
    window.LOAD_CORE.lists = window.LOAD_CORE.lists.concat(LISTS);
    var add = { gobag: ['Space blanket or light blanket', 'Mask (FFP2 or N95)', 'Multi-tool', 'Phone with offline maps downloaded', 'Paper contact card'], carkit: ['Reflective triangle and high-visibility vest (required by law in Portugal)', 'Tyre repair kit or spare, and a tyre inflator', 'Ice scraper and gloves in cold climates'], firstaid: ['Triangular or elastic bandage', 'Burn dressing', 'Anti-diarrhea medicine', 'Eye wash and eye pad', 'CPR face shield', 'Tourniquet (learn how to use it first)'] };
    window.LOAD_CORE.lists.forEach(function (L) { (add[L.id] || []).forEach(function (x) { if (L.items.indexOf(x) < 0) L.items.push(x); }); });
  }
})();
