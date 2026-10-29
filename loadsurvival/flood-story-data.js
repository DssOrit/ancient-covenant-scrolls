/* Flood and long-outage modules and picture stories. 4 module guides and 10 picture stories.
   Written 29 Oct 2026 from the owner four-part report and story pack. Pictures are illustrations, not photographs of real places.
   Order of action: leave early if told to or if the way out is getting worse. An upper accessible room is a last resort only.
   No sealing of rooms, no attics, no towels in drains, no roof signalling. Sources are given to us, not opened. Not safety or legal advice. */
(function () {
  var NOTE = "We read a relayed four-part report and search results. We could not open the pages, so each source is labelled OFFICIAL SOURCE LINKED BUT NOT OPENED or DATA UNVERIFIED.";
  var GEN = "Steps marked as general practice are common advice. We did not find a named source for each step.";
  var CALL = "In danger to life, call 911 (US) or 112 (Portugal) first, if the phone works. Follow orders from local officials.";
  var ILL = "The pictures are illustrations made for this app. They are not photographs of real places, and they do not show that any place is safe, open or legal to use.";
  var FRAMES = "Only some steps have a picture. The other steps are text only until pictures are made.";
  var SRC = {
    ready: ["Ready.gov: floods (from the owner report) (OFFICIAL SOURCE LINKED BUT NOT OPENED)", "https://www.ready.gov/floods"],
    cdcFlood: ["CDC: floodwater safety (from the owner report) (OFFICIAL SOURCE LINKED BUT NOT OPENED)", "https://www.cdc.gov/floods/about/index.html"],
    nws: ["US National Weather Service: flood safety (from the owner report) (OFFICIAL SOURCE LINKED BUT NOT OPENED)", "https://www.weather.gov/safety/flood"],
    cdcWater: ["CDC: emergency water treatment (from the owner report) (OFFICIAL SOURCE LINKED BUT NOT OPENED)", "https://www.cdc.gov/water-emergency/about/index.html"],
    fsDisaster: ["FoodSafety.gov: food and water in a disaster (from the owner report) (OFFICIAL SOURCE LINKED BUT NOT OPENED)", "https://www.foodsafety.gov/keep-food-safe/food-safety-in-disaster-or-emergency"],
    fsOutage: ["FoodSafety.gov: food safety during a power outage (from the owner report) (OFFICIAL SOURCE LINKED BUT NOT OPENED)", "https://www.foodsafety.gov/food-safety-charts/food-safety-during-power-outage"],
    cdcDis: ["CDC: disasters (from the owner report) (OFFICIAL SOURCE LINKED BUT NOT OPENED)", "https://www.cdc.gov/disasters/index.html"],
    nchfp: ["USDA Complete Guide to Home Canning (from the owner report) (OFFICIAL SOURCE LINKED BUT NOT OPENED)", "https://nchfp.uga.edu/resources/category/usda-guide"],
    usu: ["Utah State University Extension: preserve the harvest (from the owner report) (OFFICIAL SOURCE LINKED BUT NOT OPENED)", "https://extension.usu.edu/preserve-the-harvest/"]
  };
  var G = [];
  function add(g) { g.checkedOn = "29 Oct 2026"; g.status = "partly"; g.difficulty = g.difficulty || "Practical"; g.icon = g.icon || "shield"; g.source = g.sources.length ? g.sources[0][1] : ""; G.push(g); }
  function P(file) { return "assets/pics/story-" + file + ".jpg"; }

  /* ---------------- Modules ---------------- */
  add({ id: "flood-decisions", area: "Disasters • Flood", title: "Flood: decide fast, leave early, and what barriers can and cannot do",
    intro: "Life comes before property. A flood plus a blackout is not a reason to stay in a threatened building. " + CALL,
    first: [
      CALL,
      "Leave early when officials tell you to, when water is nearing rooms you use, or when your way out is getting worse.",
      "An upper accessible room is a LAST RESORT, only when leaving is unsafe.",
      "Never drive or walk through floodwater."
    ],
    do: [
      "Step 1. Check official flood alerts and the water level near you. Choose high ground you can reach without crossing flooded roads.",
      "Step 2. Count every person and pet. Gather mobility aids, glasses, medicines, documents, a charged phone, water and a small go-bag.",
      "Step 3. Leave at once if there is an order, or if the way out is disappearing. Do not wait to protect furniture or build a barrier.",
      "Step 4. Only if it is safe and you have time: move valuables and sealed chemicals above the expected water. Bring in loose objects. Do not touch floodwater.",
      "Step 5. Electric panel: only a person with dry access and training may use the main breaker. Otherwise leave it alone and report the hazard.",
      "Step 6. Gas: follow the utility instructions. If you smell gas, leave and call for help from outside.",
      "Step 7. Sandbags, soil-filled bags and sheeting may slow a small amount of water. They are not floodproofing in fast or deep water. Never block an exit.",
      "Step 8. Do not stuff towels or rags into sewers, toilets or drains. Only proper backflow devices do that job.",
      "Step 9. Go. Follow the route officials give. Tell someone where you are going."
    ],
    warn: [
      "Do not stay in a flooded building just to guard it.",
      "Do not enter a closed attic. It can trap everyone.",
      "Do not seal doors, windows or vents with plastic and tape.",
      "Do not hide from rescue workers."
    ],
    tip: ["Practise the route with every person and pet before a flood.", "Keep a go-bag by the door."],
    after: ["Return only when officials say it is safe. Do not use wet electrical equipment. Photograph damage before cleaning."],
    table: { head: ["Place", "Right use"], rows: [
      ["Outdoors, high ground", "Best place to go before routes flood. Never drive or walk through floodwater."],
      ["Stairs and escape route", "Keep clear, lit and free of trip hazards. Help anyone who needs support."],
      ["Upper accessible room", "Last resort only. People, pets, water, light, medicines, a phone and a safe way out. Never a sealed, airless room."],
      ["Ground floor", "Avoid if water is present. Never use a wet electrical panel."]
    ] },
    sources: [SRC.ready, SRC.cdcFlood, SRC.nws],
    unconfirmed: [NOTE, "The order of action and the rules on barriers, drains and attics come from the owner report, not from pages we opened. We did not check Portuguese alert rules (ANEPC, APA, IPMA) or US local rules. " + GEN] });

  add({ id: "flood-upper-room", area: "Disasters • Flood", title: "Trapped by flood: the upper accessible room as a last resort",
    intro: "Use this only when leaving is unsafe or impossible. " + CALL,
    first: [
      CALL,
      "Leaving early is safer. This is the last resort.",
      "Choose an upper room with a clear way out and a window you can open. Never an attic that can trap everyone.",
      "Never seal the room or the vents."
    ],
    do: [
      "Step 1. Move everyone, including pets, to the upper room. Help anyone with limited movement.",
      "Step 2. Take drinking water, a light, medicines, glasses, a phone and charger, a whistle and warm clothes.",
      "Step 3. Call 911 (US) or 112 (Portugal) if you can. Say your address, the floor, how many people, medical needs and pets.",
      "Step 4. Signal from a safe upper window with bright cloth, a flashlight or a whistle. Do not go onto a wet roof.",
      "Step 5. Stay away from floodwater, wet electrical equipment, fallen lines and weak structures.",
      "Step 6. Keep the way out clear. Keep everyone together and calm.",
      "Step 7. Wait for rescue. Follow rescuers instructions."
    ],
    warn: ["Do not enter a closed attic.", "Do not walk or drive into floodwater to get a signal.", "Do not make candles or open flames in the room."],
    tip: ["Keep a bag with water and light on the upper floor if you live in a flood area."],
    after: ["When rescued, tell workers about anyone missing or any medical need."],
    sources: [SRC.ready, SRC.nws],
    unconfirmed: [NOTE, "The last-resort order comes from the owner report. " + GEN] });

  add({ id: "water-14day-plan", area: "Water • Plan", title: "Fourteen-day water plan for 6 to 15 people",
    intro: "Start with at least 1 US gallon (3.785 L) per person per day for drinking and basic needs. Add more for heat, illness, pregnancy, pets and food. Plan and store BEFORE a crisis.",
    first: [
      "1 gallon per person per day is a starting reserve, not a comfortable amount.",
      "Label drinking water and non-drinking water. Never reuse fuel or chemical containers.",
      "Cloth filtering removes only coarse dirt. Boiling and chlorine do not remove salt, fuel, pesticides or metals.",
      "Do not use floodwater that may be chemically contaminated."
    ],
    do: [
      "Step 1. Count people. Work out gallons: people times 14. Six people need 84 gallons (about 318 L). Fifteen people need 210 gallons (about 795 L).",
      "Step 2. Add extra for pets, hot weather, illness, pregnancy and cooking. Measure what you really use.",
      "Step 3. Fill clean food-grade jugs and drink bottles with safe tap water while the supply is confirmed safe.",
      "Step 4. Label DRINKING or UTILITY. Store sealed jugs away from fuel and above likely flood level.",
      "Step 5. A bathtub filled before an outage can serve utility needs. It is not automatically drinkable.",
      "Step 6. Do not shut the main water supply because of a pressure change alone. Follow notices about contamination.",
      "Step 7. Treatment order: sealed or tested water first. For questionable fresh water, boil when you safely can. Filter cloudy water through cloth first.",
      "Step 8. Household bleach, plain and unscented, 5 to 9 percent sodium hypochlorite as the owner report states: 8 drops per gallon of clear water, 16 for cloudy, coloured or very cold water. Stir. Wait at least 30 minutes. Other strengths need other doses. Check your bottle. See the Bleach dose tool.",
      "Step 9. Sunlight bottle disinfection depends on clear water, the bottle and strong sun. Do not rely on it in storms.",
      "Step 10. Record what you use each day. Use the Pantry and bucket planner tool for the totals."
    ],
    warn: ["Do not ration water so hard that anyone is dehydrated.", "Bleach does not make chemical or fuel-contaminated water safe."],
    tip: ["Keep water for pets separate."],
    after: ["Rotate stored water on a schedule you write down."],
    table: { head: ["People", "14 days, US gallons", "14 days, litres"], rows: [
      ["6", "84", "318"], ["8", "112", "424"], ["10", "140", "530"], ["12", "168", "636"], ["15", "210", "795"]
    ] },
    sources: [SRC.cdcWater, SRC.fsDisaster],
    unconfirmed: [NOTE, "The table is plain arithmetic by us (people times 14 gallons, times 3.785 for litres). The bleach strength and dose come from the owner report. The existing Water and Bleach pages in this app say 5 to 6 percent. Read your bottle label and the official CDC page. " + GEN] });

  add({ id: "week1-day90-plan", area: "Scenarios • Long outage", title: "One week to day 90: a plan for water, food, medicines, pets and the decision to stay or go",
    intro: "This is not a two-day outage. It follows a household from day 7 to day 90. " + CALL,
    first: [
      "First week: stabilise. Safe water, toilet, medicines, safe temperatures, communication, pet care, calm.",
      "A closed fridge keeps food safe about 4 hours. A full freezer about 48 hours, half full about 24 hours. Check real temperatures.",
      "Do not use open-flame candles. Generators and outdoor cookers stay outdoors, away from doors and windows.",
      "Decide early if the home is safe to stay in."
    ],
    do: [
      "Day 7. Count safe water, pet food, medicines and meals. Choose a way to resupply, or choose to leave.",
      "Day 14. Review the toilet, storage, each persons needs, contact with neighbours, battery power and strain on the family.",
      "Day 30. Rotate staples by best-use date. Inspect packs for damp, pests and damage. Restock where services return.",
      "Day 60. Check variety of food, health, pests, heating or cooling and any workable off-grid resources.",
      "Day 90. Decide whether to keep living in the home: is the water source safe, is food safe, is waste handled, and is there a way to reach help?",
      "Every day. Check water amounts, wash hands, watch for illness, keep a log.",
      "Older adults: spare glasses, hearing aid batteries, large-print labels, a medicine list, easy-open food.",
      "Pregnant people and infants: enough safe water, special food, care continuity, formula made exactly as the pack says, and early evacuation if needed.",
      "Disabled people: mobility and charging, a way to call for help, back-up carers, a toilet they can reach."
    ],
    warn: ["Do not stay for weeks in a flood-damaged, contaminated or unsafe building.", "Never taste a food to test it."],
    tip: ["Write the Day 7, 14, 30, 60 and 90 checks on paper and tick them."],
    after: ["Keep receipts and photos for later help."],
    table: { head: ["Day", "Decision"], rows: [
      ["7", "Count water, pet food, medicines, meals. Resupply or leave."],
      ["14", "Review toilet, storage, needs, contact, batteries, strain."],
      ["30", "Rotate staples, inspect packs, restock."],
      ["60", "Variety, health, pests, heating or cooling, off-grid options."],
      ["90", "Stay or go: water, food safety, waste, contact."]
    ] },
    sources: [SRC.fsOutage, SRC.cdcDis],
    unconfirmed: [NOTE, "The day-by-day plan is from the owner report. The fridge and freezer times are in the FoodSafety.gov chart given to us. We did not open it. " + GEN] });

  add({ id: "pantry-90-year-plan", area: "Food • Stockpile", icon: "can", title: "90-day, one-year and bulk pantry: what the numbers mean (and do not mean)",
    intro: "This is a planning example for 6 to 15 people. The three staples used (rice, dry beans, rolled oats) are not a balanced diet. Use the Pantry and bucket planner tool and change every number. Plan BEFORE a crisis.",
    first: [
      "Rice, beans and oats alone do not give a balanced 2,000-calorie diet. Add oil, vegetables, fruit, protein, vitamins and minerals.",
      "Infants, pregnancy, older age and activity change needs a lot.",
      "Pets are NOT in the human totals. Work out pet food and water on their own, from species, weight, medicines and the label or a vet.",
      "Do not claim any food keeps for 20 to 30 years. Oils go rancid and storage heat shortens life."
    ],
    do: [
      "Step 1. Open Tools, then Pantry and bucket planner. Enter people and days.",
      "Step 2. The example staples per person per day: 0.50 lb white rice, 0.25 lb dry beans, 0.15 lb rolled oats. Change them to match what you really eat.",
      "Step 3. Example capacity of a 5-gallon bucket: rice about 30 lb, beans about 30 lb, oats about 12 lb. Weigh a test bucket. Real weights vary.",
      "Step 4. For each bucket plan one food-grade liner, one lid and the oxygen absorbers the maker states for that food and bag. Buy a few spare buckets.",
      "Step 5. Mylar bags and oxygen absorbers are for very dry foods only. Do not use them for damp, oily or home-dried foods of unknown moisture, or anything needing a fridge.",
      "Step 6. Follow a tested method from the maker or an extension service. Seal seams properly, check for holes, label dates. A sealed bag does not guarantee the food is safe.",
      "Step 7. Store cool, dry and dark, away from fuel and chemicals and above flood level. Use the oldest first. Check for pests and damp.",
      "Step 8. Never eat from bulging, leaking, badly rusted or damaged cans. Only use tested home-canning methods.",
      "Step 9. Plan meals that need no cooking, and the water and outdoor fuel you need to cook.",
      "Step 10. Pets: enter grams a day for each pet from the label and your vet. The tool multiplies by days.",
      "Step 11. No-store version: use what you already own. Weigh your own bags of rice, beans and oats and count days from your own use."
    ],
    warn: ["Do not treat the table as a nutrition plan.", "Do not buy a huge amount before you have water, fuel and a way to cook it."],
    tip: ["Buy a few buckets first and test one before you buy many."],
    after: ["Review the numbers every six months."],
    table: { head: ["People", "90 days: rice / beans / oats (lb)", "Buckets, 90 days"], rows: [
      ["6", "270 / 135 / 81", "21"], ["8", "360 / 180 / 108", "27"], ["10", "450 / 225 / 135", "35"], ["12", "540 / 270 / 162", "41"], ["15", "675 / 338 / 202", "52"]
    ] },
    sources: [SRC.fsDisaster, SRC.nchfp, SRC.usu],
    unconfirmed: [NOTE, "The example amounts and bucket capacities are the owner report planning figures. We checked the arithmetic: 6 people for 90 days gives 270 lb rice, 135 lb beans and 81 lb oats, and 9, 5 and 7 buckets, so 21. Real bucket weights vary. Bucket counts here are examples. " + GEN] });

  /* ---------------- Picture stories ---------------- */
  function story(n, id, title, intro, pics, frames, warn, extra) {
    var secs = pics.map(function (p, k) { return { h: k === 0 ? "Pictures" : "Pictures, continued", img: P(p[0]), alt: p[1], items: [p[2]] }; });
    var g = { id: id, area: "Scenarios • Picture stories", icon: "image", title: title, intro: intro + " " + ILL,
      first: ["Story " + n + " of 10. Six steps, one action each.", CALL, "Beginner mode: read one step at a time. Expert mode: read the whole list.", FRAMES],
      do: frames.map(function (f, i) { return "Frame " + (i + 1) + ". " + f; }),
      warn: warn, tip: ["Print this page and keep it with your go-bag.", "Tick each step when you do it."], after: ["Practise the steps once with your household."],
      sections: secs, sources: (extra && extra.sources) || [SRC.ready], unconfirmed: [NOTE, "The pictures are illustrations and show one picture for some steps only. " + (extra && extra.unc ? extra.unc + " " : "") + GEN] };
    add(g);
  }

  story(1, "story-01-flood-warning", "Story 1: Early flood warning and safe evacuation",
    "A family hears a flood warning and leaves in time.",
    [["s01-watch-flood", "Two adults looking from a staircase at floodwater in the hall below.", "See the water. Do not wait."], ["s01-go-bag", "A packed go-bag with a water bottle and a medicine bottle by the front door.", "The go-bag is ready by the door."], ["s01-call-help", "A woman on the phone looking out a window at floodwater and trees.", "Call 911 or 112 if you need help to leave."]],
    ["An official alert or radio warns of rising water. Listen to the whole message.", "Look at the water level from a safe place. Do not go near it.", "Count everyone, including pets. Pick up glasses, medicines, documents and a charged phone.", "Take the go-bag and water. Call 911 or 112 if someone needs help to leave.", "Leave at once if told to, or if the way out is getting worse. Do not delay to save furniture.", "Go to high ground by a road with no water on it. Never drive or walk through floodwater."],
    ["Never wade or drive through floodwater.", "Do not stay to guard the house."], { sources: [SRC.ready, SRC.nws] });

  story(2, "story-02-protect-if-safe", "Story 2: Limited home protection when it is safe and no order to leave",
    "Only when officials have not ordered you out and the water is not close, a family takes small steps. They stay ready to go.",
    [],
    ["Check for an evacuation order. If there is one, leave.", "Move valuables and sealed chemicals to a higher shelf or floor, if safe and quick.", "Bring in loose outdoor objects. Stay out of any water.", "Sandbags or sheeting can slow a little water. They are not floodproofing. Never block an exit.", "Do not touch the electric panel unless you have dry access and training. Otherwise leave it alone.", "If water rises or an order comes, stop and leave."],
    ["Do not stuff towels or rags into drains or toilets.", "Do not seal doors or windows.", "Do not stand in water to place barriers."], { sources: [SRC.ready, SRC.cdcFlood], unc: "The supplied picture for this story shows boarding and sheeting of windows, which does not fit flood safety, so it is not used." });

  story(3, "story-03-upper-floor", "Story 3: Upper accessible room as a LAST RESORT (never an enclosed attic)",
    "Leaving was not possible. The family moves to an upper room with a clear way out.",
    [["s03-upper-room", "An empty upper room with folded blankets, water bottles and a flashlight on the floor.", "Water, light and blankets in the upper room."]],
    ["Leaving is unsafe. Move everyone and the pets to an upper room with a way out.", "Take water, a light, medicines, glasses, a phone and charger, a whistle and warm clothes.", "Call 911 or 112 if you can. Say your address, the floor, how many people, medical needs and pets.", "Keep the way out clear. Do not go into a closed attic.", "Signal from a safe window with bright cloth, a flashlight or a whistle. Stay off the roof.", "Stay away from floodwater, wet electrical equipment and weak structures. Wait for rescue."],
    ["Never seal the room or vents.", "Never use a closed attic.", "Do not climb onto a wet roof."], { sources: [SRC.ready, SRC.nws] });

  story(4, "story-04-week1-to-day90", "Story 4: One week to day 90: a household keeps going",
    "A household is cut off for weeks. This is not a two-day outage. It follows the family from day 7 to day 90.",
    [["s04-inventory", "A notebook and pencil on a counter beside a jar of oats, a bowl of flour and cans.", "Day 7: count what you have and write it down."], ["s04-neighbour", "A person passing a cloth bag of bread and greens over a garden fence.", "Day 14: stay in contact. Share what you can."], ["s04-pantry", "Tidy pantry shelves with jars of grains and pasta and a crate of vegetables.", "Day 30: rotate staples by date."], ["s04-medicines", "Hands holding a pill organiser and a medicine bottle in a cupboard.", "Day 60: check medicines and how long they last."], ["s04-documents", "Two bank cards and a phone on a dark table.", "Day 90: keep cards, cash and documents together, and decide stay or go."]],
    ["Day 7. Count safe water, pet food, medicines and meals. Write the numbers down.", "Day 14. Review the toilet, storage, each persons needs, contact with neighbours and the strain on the family.", "Day 30. Rotate staples by date. Check packs for damp, pests and damage.", "Day 60. Check food variety, health, pests, heating or cooling.", "Day 60. Check medicines and plan how to get more.", "Day 90. Decide: is the water source safe, is food safe, is waste handled, is there a way to reach help? Stay or go."],
    ["Do not stay in an unsafe, flood-damaged or contaminated home.", "Do not ration water so hard that anyone is dehydrated."], { sources: [SRC.fsOutage, SRC.cdcDis] });

  story(5, "story-05-sanitation", "Story 5: Safe, contained emergency toilet",
    "When the toilets will not flush, a family sets up a contained bucket toilet.",
    [["s05-boil-water", "A pot of boiling water on a camp stove beside a glass of water.", "Safe water for washing hands: boil, then let it cool."]],
    ["Pick a stable bucket or portable toilet. Place it away from food, children and pets.", "Fit a strong liner. Keep a modest amount of dry sawdust or paper to cover each use.", "Keep urine and solids apart if you can.", "Cover after each use. Keep the lid on.", "Wash hands with soap and safe water every time.", "Keep the bags in a covered container until you can dispose of them in an approved way."],
    ["Do not pour waste into soil, drains or floodwater.", "Do not add powder detergent or bleach to the waste bucket.", "Do not leave waste bags on a balcony in a storm."], { sources: [SRC.cdcWater, SRC.fsDisaster] });

  story(6, "story-06-rescue-signals", "Story 6: Rescue signals and communication",
    "A household keeps in touch and makes itself easy to find.",
    [["s06-radio-map", "A battery radio on a shelf beside a framed map.", "Listen for official news."], ["s06-alerts", "A hand holding a phone with a storm, cloud and speaker icon.", "Check alerts on the phone."], ["s06-warning", "A phone showing a warning triangle and four colour bars.", "Know the warning levels."], ["s06-handhelds", "Two hand radios on a table with a blank card.", "Hand radios for neighbours, only within the rules."], ["s06-plan-card", "A hand drawing a plan card with two houses and a phone.", "Write a contact plan on paper."]],
    ["Listen to a battery radio for official news at set times.", "Check alerts on your phone. Save battery.", "Learn what each warning level means in your area.", "Agree a meet point and a contact outside the area. Learn the radio rules where you live. See the radio guides.", "Write the plan on a card and give a copy to each person.", "If you must signal, use a bright cloth, a flashlight or a whistle from a safe upper window. Do not go onto the roof."],
    ["Do not use radios on frequencies you do not have the right to use.", "Do not climb on a roof to signal."], { sources: [SRC.ready, SRC.nws] });

  story(7, "story-07-vulnerable-family", "Story 7: A household with a pregnant person, an infant, an older adult, a disabled person and pets",
    "Some households need to leave sooner and plan more.",
    [["s07-family-plan", "A family of five around a table looking at a large sheet of paper and a notebook.", "Plan together before the flood."]],
    ["Decide early. Leave sooner than others if anyone needs more time.", "Pregnant people and infants: safe water, safe formula made exactly as the pack says, and care continuity.", "Older adults: spare glasses, hearing aid batteries, large-print labels, a medicine list.", "Disabled people: a way out they can use, charging for equipment, a way to call for help, a back-up carer.", "Pets: carriers, leads, food, water, medicines and records. Find where pets are allowed before you need it.", "Write the plan, give copies to everyone and practise it once."],
    ["Do not wait for the last moment if anyone needs help to move."], { sources: [SRC.ready, SRC.cdcDis] });

  story(8, "story-08-hazards", "Story 8: Floodwater, live electricity, carbon monoxide and unsafe buildings",
    "Dangers that do not look dangerous.",
    [["s08-crank-radio", "A hand turning the crank of a green hand-crank radio.", "A crank radio needs no mains power."]],
    ["Stay out of floodwater. It can hide holes, current, chemicals and wires.", "Stay away from wet electrical equipment and fallen lines.", "Never run a generator, grill or camp stove indoors or in a garage. Carbon monoxide kills.", "Do not enter a building with cracks, leaning walls or a sagging roof.", "Use battery lights, not candles.", "Listen for official news on a crank radio and follow it."],
    ["Do not turn on wet appliances.", "Do not rely on a window being open to make fuel burning safe indoors."], { sources: [SRC.cdcFlood, SRC.ready] });

  story(9, "story-09-lost-glasses", "Story 9: An older adult has lost their glasses",
    "Without glasses, signs, labels and medicine bottles are hard to read. This story shows what to do.",
    [["s09-armchair", "An older woman smiling in an armchair under a blanket, holding a mug, with a radio beside her.", "Keep the person calm and warm while you look."]],
    ["Stay calm and sit the person down in a lit room with a clear floor.", "Check pockets, bags, bedside, bathroom and the car. Look in the go-bag.", "Use spare glasses from the emergency kit if you have them.", "Use a magnifier, or the phone camera zoom, to read labels. Put medicine names in large print on paper.", "Check each medicine with another person. Do not guess.", "When services return, get new glasses. See the vision guides in this app."],
    ["Do not let anyone take medicine they cannot read.", "Keep floors clear to prevent falls."], { sources: [SRC.cdcDis], unc: "This story links to the Lost glasses and Glasses kit guides already in this app." });

  story(10, "story-10-14-day-drill", "Story 10: A fourteen-day water and toilet drill",
    "Practise before you need it. A family tries two weeks of water and a bucket toilet.",
    [["s10-water-jugs", "Shelves with large water jugs, tins, jars and a flashlight.", "Day 1: store water for 14 days."], ["s10-documents-drawer", "A hand putting an envelope in a drawer with a metal tin.", "Keep documents and cash together."], ["s10-map-clock", "A family looking at a map with a clock on the table.", "Plan the route and the time."], ["s10-radio-lantern", "A hand cranking a radio beside a lit lantern.", "Test the radio and the light."], ["s10-fuel", "A hand fuelling a car at a petrol station.", "Keep a car at least half full."]],
    ["Day 1. Work out gallons: people times 14. Fill and label the jugs.", "Day 2. Test water treatment on a small amount. Use the Bleach dose tool.", "Day 3. Set up the bucket toilet for one day. Write what you learned.", "Day 7. Check how much water you really used. Change the plan.", "Day 14. Review: what ran short, what broke, who needed help?", "Afterwards. Fix the gaps and write the next drill date."],
    ["A drill does not replace real stored water or a real plan."], { sources: [SRC.cdcWater, SRC.fsDisaster], unc: "The supplied picture for this story is about food storage. We use the water and supply pictures from it." });

  if (window.LOAD_CORE && window.LOAD_CORE.guides) {
    G.forEach(function (g) { window.LOAD_CORE.guides.push(g); });
  }
})();
