/* Part 8 picture-story outlines: ten stories, six steps each. Text first; pictures only where a safe, usable picture was supplied.
   Written 29 Oct 2026 from the owner Part 8A to 8D. The supplied pack has 10 cover pictures, not 60 frames. Missing frames are listed in planning/PART8_IMAGE_MANIFEST.md.
   Verification labels follow Part 8D. Pictures are illustrations, not photographs of real places. Not safety, medical or legal advice. */
(function () {
  var LINKED = "OFFICIAL SOURCE LINKED BUT NOT OPENED";
  var UNV = "DATA UNVERIFIED";
  var PENDING = "DEVICE TEST PENDING";
  var ILL = "The pictures are illustrations made for this app. They are not photographs of real places.";
  var CALL = "In danger to life, call 911 (US) or 112 (Portugal) first, if the phone works.";
  var NOFRAMES = "Only some steps have a picture. The other frames are not made yet. They show as text only.";
  var SRC = {
    cdcWater: ["CDC: emergency water treatment (" + LINKED + ")", "https://www.cdc.gov/water-emergency/about/index.html"],
    fsOutage: ["FoodSafety.gov: food safety during a power outage (" + LINKED + ")", "https://www.foodsafety.gov/food-safety-charts/food-safety-during-power-outage"],
    fsDisaster: ["FoodSafety.gov: food and water in a disaster (" + LINKED + ")", "https://www.foodsafety.gov/keep-food-safe/food-safety-in-disaster-or-emergency"],
    ready: ["Ready.gov (" + LINKED + ")", "https://www.ready.gov/"],
    floods: ["Ready.gov: floods (" + LINKED + ")", "https://www.ready.gov/floods"],
    cdcFlood: ["CDC: floodwater (" + LINKED + ")", "https://www.cdc.gov/floods/about/index.html"],
    cdcDis: ["CDC: disasters (" + LINKED + ")", "https://www.cdc.gov/disasters/index.html"]
  };
  var G = [];
  function add(g) { g.checkedOn = "29 Oct 2026"; g.status = "partly"; g.difficulty = g.difficulty || "Practical"; g.icon = g.icon || "image"; g.area = "Scenarios • Part 8 stories"; g.source = g.sources.length ? g.sources[0][1] : ""; G.push(g); }
  function story(n, id, title, intro, frames, warn, opt) {
    opt = opt || {};
    var secs = (opt.pics || []).map(function (p, k) { return { h: k === 0 ? "Picture" : "Picture, continued", img: "assets/pics/" + p[0] + ".jpg", alt: p[1], items: [p[2]] }; });
    add({ id: id, title: "Part 8, Story " + n + ": " + title, intro: intro + " " + ILL,
      first: ["Story " + n + " of 10. Six frames, one action each.", CALL, "Every day ask: is there enough safe water for the next 72 hours, a safe way to dispose of waste, a safe building, a livable temperature, medicine, and a way to talk or leave? A NO on any of these means get help or move, not more improvising.", NOFRAMES],
      do: frames.map(function (f, i) { return "Frame " + (i + 1) + ". " + f; }),
      warn: warn, tip: ["Beginner mode: one step at a time. Expert mode: the whole list.", "Print it and tick each step."], after: ["Practise once with your household."],
      sections: secs, sources: opt.sources || [SRC.ready],
      unconfirmed: [UNV + ": " + (opt.unc || "The steps follow the owner Part 8 text. We have not opened the linked pages."), "The Part 8 pack has only cover pictures. Frames without a picture are text only. " + PENDING + ": not tested on a real iPad."] });
  }

  story(1, "p8-s01-water-stops", "The water stops",
    "The taps go dry. This story covers finding, labelling, treating and refilling safe water.",
    ["Check whether the supply has stopped: your taps, a neighbour, any notice from the water company.", "Gather clean food-grade bottles, jugs and lidded pots. Never use containers that held chemicals or fuel.", "Label each one: DRINKING or UTILITY (washing, flushing).", "Check the official water advisory by radio or official site while it works. Follow local instructions.", "Treat water only if it suits the source. For germs: boil at a rolling boil for 1 minute (3 minutes above 6,500 ft or 2,000 m), or use plain unscented household bleach, 5 to 9 percent, 8 drops per US gallon of clear water (16 if cloudy, coloured or very cold), stir, wait 30 minutes. Neither removes salt, fuel or chemicals.", "Plan the next safe refill and write down how much is used each day."],
    ["Do not drink floodwater or water that may hold chemicals.", "Never mix bleach with other chemicals.", "Do not shut the main supply only because of a pressure drop."],
    { pics: [["p8-01-water-stops", "A family in a kitchen filling a pot at the tap, with large water jugs and bottles in front.", "Fill clean containers while water still runs."]], sources: [SRC.cdcWater, SRC.fsDisaster] });

  story(2, "p8-s02-no-cooking", "No electricity, no cooking",
    "No power and no way to cook. Eat safely from what you have.",
    ["Check how far the outage reaches. Is it your home only or the whole street?", "Keep the fridge and freezer closed. A closed fridge keeps food safe about 4 hours, a full freezer about 48 hours, half full about 24 hours. Use a thermometer.", "Find the ready-to-eat packages: sealed commercial cans and packs marked ready to eat, nut or seed butters, dry crackers, cereal, shelf-stable milk. Check each label.", "Choose foods that fit each person: allergies, gluten-free, vegetarian or vegan, age and medical needs.", "Open cans with a manual can opener. Never pry them open with sharp tools or concrete.", "Write down what you have and what you ate. Throw out bulging, leaking or badly damaged cans and food that was above 40 F (4 C) too long."],
    ["Never use a camp stove, grill or heater indoors.", "Do not taste food to test it.", "Do not drink the salty liquid from cans."],
    { sources: [SRC.fsOutage, SRC.fsDisaster] });

  story(3, "p8-s03-freezing-night", "A freezing night",
    "The heating is off. Stay warm without fuel or flames indoors.",
    ["Check the room: dry, aired, away from hazards and water.", "Put on dry, thin layers and a hat. Remove wet clothes.", "Insulate the sleeping place: dry cardboard, rugs and blankets under the bed, more blankets over.", "Add warm bedding for pets.", "Use a battery lantern. No flame, no fuel heater, no candles in a bedroom, tent or closed space.", "Watch for cold danger: confusion, heavy drowsiness or clumsiness need urgent medical help. If you cannot keep warm, relocate."],
    ["A blanket canopy must stay breathable and easy to leave.", "Carbon monoxide kills. Never burn fuel indoors."],
    { sources: [SRC.ready, SRC.cdcDis], unc: "The supplied cover picture for this story shows a lantern in a blanket tent, which does not fit the no-flame rule, so it is not used." });

  story(4, "p8-s04-week1-to-day90", "One week to 90 days (and a lost pair of glasses)",
    "This follows a household from day 7 to day 90. It is not a two-day outage.",
    ["Day 7. An older adult cannot find their glasses. Help them sit safely, check pockets and bags, use spare glasses or a magnifier, and keep the floor clear.", "Day 14. Audit water and waste: how much safe water is left, and is the toilet working safely?", "Day 21. Check the pantry for balance and for pets. Rice, beans and oats alone are not a complete diet.", "Day 30. Review medicines and anything that needs power or cold. Plan how to get more.", "Day 60. Assess safe resupply, or relocation if you cannot keep water, food, sanitation, medicine and a livable temperature.", "Day 90. Make the safety decision: do not remain indefinitely without the essentials."],
    ["Do not stay in an unsafe, flood-damaged or contaminated home."],
    { sources: [SRC.fsOutage, SRC.cdcDis] });

  story(5, "p8-s05-toilet-stops", "The toilet does not work",
    "No water or a blocked sewer. Set up a contained bucket toilet and keep clean.",
    ["Check for a sewer hazard. If sewage is backing up or flooding is suspected, do not use the toilets until a qualified person says it is safe.", "Pick a private place everyone can reach, away from food, children and pets.", "Line two stable buckets with strong liners. Mark one for urine and one for solids.", "Cover each use of solids with absorbent material such as sawdust or dry soil. Close the lids at once.", "Wash hands with soap and safe water every time. Wear gloves when handling waste.", "Keep waste bags secure until an approved disposal route is available. Write down the local method."],
    ["Do not throw waste on soil, in gardens or into floodwater.", "Towels and bags are NOT backflow valves. A rated backwater valve fitted by a plumber is."],
    { pics: [["p8-05-bucket-toilet", "A woman in gloves pouring sawdust into a lined bucket toilet with a lid and a second bucket beside it.", "Cover each use with dry absorbent material."]], sources: [SRC.cdcWater, SRC.fsDisaster] });

  story(6, "p8-s06-flood-warning-pets", "Flood warning, with pets",
    "A flood warning arrives for a family with pets. They leave early.",
    ["Check the official hazard: warnings, water level, routes.", "Gather family and pets. Put pets in carriers or on leads.", "Take medicines, glasses and mobility aids, a charged phone, water and papers.", "Choose a safe way to leave and where to go. Tell someone.", "Avoid flooded roads. Never walk or drive through floodwater.", "Reach safe high ground. Stay there until officials say it is safe."],
    ["Never wade or drive through floodwater.", "Do not leave pets behind."],
    { sources: [SRC.floods, SRC.cdcFlood], unc: "The supplied cover picture for this story shows a family wading in floodwater, so it is not used." });

  story(7, "p8-s07-upper-floor", "Trapped on the upper floor",
    "Leaving was not possible. This is the last resort, not the first choice.",
    ["Move everyone off the lower level to an upper room with a clear way out.", "Do not go into a closed attic.", "Secure pets in the room with water.", "Call 911 or 112 if you can. Say address, floor, how many people, medical needs and pets.", "Signal from a safe window with bright cloth, a flashlight or a whistle. Do not go on the roof.", "Wait for safe rescue guidance. Do not hide from rescuers."],
    ["Never seal the room or vents.", "Never climb on a wet roof."],
    { sources: [SRC.floods, SRC.ready] });

  story(8, "p8-s08-older-person-alone", "An older person alone",
    "An older person is alone at home after a storm.",
    ["Check the clock, the date and the contact list.", "Find the spare glasses. Look in the kit, a bag and the bedside.", "Gather prescriptions, a medicine list and the walking aid.", "Save water and phone power. Use short calls.", "Arrange a neighbour check-in at set times.", "If essential care is not possible, leave with help. Do not stay alone without medicine or safe water."],
    ["Do not take medicine you cannot read.", "Keep floors clear to prevent falls."],
    { sources: [SRC.cdcDis, SRC.ready] });

  story(9, "p8-s09-pregnancy-child-medical", "Pregnancy, a child and a medical device",
    "A household with a pregnant person, a young child and a medical device plans early.",
    ["Write down each persons care needs: medicines, feeding, devices, appointments.", "Pack safe water and food. Make formula exactly as the pack says, with safe water.", "Plan power for medical devices and a back-up. Ask a clinician in advance.", "Check supplies for the child: food, diapers, medicine, comfort.", "Keep a transit plan and a place to go.", "Seek early care or relocate for warning signs: bleeding, severe pain, fever, trouble breathing, a child who will not drink."],
    ["Do not replace medicines or add supplements without advice.", "Avoid raw sprouts for pregnant people and older adults."],
    { pics: [["p8-09-child-care", "A mother checking a child wrapped in a blanket with a thermometer, with a first-aid kit and medicines on the table.", "Check the child and keep medicines and a first-aid kit together."]], sources: [SRC.cdcDis, SRC.ready] });

  story(10, "p8-s10-storage-problem", "A home storage problem",
    "You find damp or damaged food storage. Check it before it harms anyone.",
    ["Find the damp corner, garage or buckets.", "Inspect dry goods and where each came from. Look for damp, mould, insects, holes and bad smells.", "Separate suspect packages from the rest.", "Move intact sealed stock to a dry, safe place off the floor, away from fuel and chemicals.", "Log dates and defects.", "Throw out uncertain food. Do not smell-test food to prove it is safe."],
    ["Do not use cat litter, charcoal, motor oil absorbent or sprays on or near food to fight damp.", "Do not add oxygen absorbers to damp or oily foods."],
    { pics: [["p8-10-dry-storage", "A woman scooping lentils and grains into labelled glass jars on a counter.", "Store dry food in sealed, labelled containers in a dry place."]], sources: [SRC.fsDisaster, SRC.cdcDis] });

  if (window.LOAD_CORE && window.LOAD_CORE.guides) {
    G.forEach(function (g) { window.LOAD_CORE.guides.push(g); });
  }
})();
