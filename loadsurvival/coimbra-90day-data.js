/* Worked example: 90 days at home for 4 people and 5 small dogs in Coimbra, Portugal. Added 1 Nov 2026 at the owner request.
   It is a HYPOTHETICAL planning example. Every amount is the author's own arithmetic from the assumptions on the page.
   Two figures come from the app guides: 4 L of water and about 2,000 kcal per person per day.
   No Coimbra rule, service, price or risk was opened or confirmed. Verification labels follow Part 8D. Not safety, medical, veterinary or legal advice.
   The matching Word document was made the same day. */
(function () {
  var LINKED = "OFFICIAL SOURCE LINKED BUT NOT OPENED";
  var UNV = "DATA UNVERIFIED";
  var PENDING = "DEVICE TEST PENDING";
  var CALL = "In danger to life, call 112 (Portugal) first, if the phone works.";
  var HYP = "This is a worked example for planning practice. It is not a promise that anyone can last 90 days.";
  var SRC = {
    ready: ["Ready.gov: floods (" + LINKED + ")", "https://www.ready.gov/floods"],
    cdcWater: ["CDC: emergency water treatment (" + LINKED + ")", "https://www.cdc.gov/water-emergency/about/index.html"],
    fsDisaster: ["FoodSafety.gov: food and water in a disaster (" + LINKED + ")", "https://www.foodsafety.gov/keep-food-safe/food-safety-in-disaster-or-emergency"]
  };
  var G = [];
  function add(g) { g.checkedOn = "1 Nov 2026"; g.status = "partly"; g.difficulty = g.difficulty || "Practical"; g.icon = g.icon || "pack"; g.area = "Scenarios • Worked examples"; g.source = g.sources.length ? g.sources[0][1] : ""; G.push(g); }

  add({ id: "coimbra-90-plan", title: "90 days at home: 4 people and 5 small dogs, Coimbra (worked example, steps)",
    intro: HYP + " Four people (three women and one man) and five small dogs (8, 10, 10, 11 and 16 lb) stay at home in Coimbra with no shops, and mains water and power failing for long spells. This guide gives the steps. The next guide gives every amount and how it was worked out.",
    first: [
      CALL,
      "Everything here is a to-do list for practice. Nothing about Coimbra rules, services or prices is confirmed. Check each one before you rely on it.",
      "Leaving early is safer than staying with too little. Be ready to go with the dogs.",
      "Do one step at a time. You do not need to do it all in one week.",
      "Time to prepare: about 10 weeks."
    ],
    do: [
      "Step 1. Week 1. Write down every person and every dog: name, age, weight and medicines. Weigh each dog.",
      "Step 2. Week 1. Check the flood risk at your address and the nearest high ground you can reach without crossing water. Check the local flood and weather warnings.",
      "Step 3. Week 1. Choose a dry, cool storage place off the floor. It must carry about 570 kg (food, dog food and water).",
      "Step 4. Week 1. Write a leave-early plan: where to go, which road, who drives, where the dogs go. Pick a meeting place and an out-of-area contact.",
      "Step 5. Weeks 2 and 3. Water: buy 13 clean food-grade jugs of 20 L and fill and label them. This is the first 14 days. Buy a water filter and 1 L of plain unscented bleach. Find a safe source for the other 76 days.",
      "Step 6. Weeks 3 to 6. Food: buy staples in stages (rice, pasta, oats, beans, lentils, flour, oil, sugar, salt, canned fish, nut butter, tinned tomato, vegetables and fruit) plus multivitamins. Store them sealed, labelled and dated, off the floor.",
      "Step 7. Weeks 3 to 6. Dogs: buy 52 kg of dry food, 1,200 waste bags, five carriers, leads and collars with ID tags. Gather vaccination records. Ask your vet about flea, tick and sand-fly cover.",
      "Step 8. Weeks 6 to 8. Toilet: make two bucket toilets with lids, one for urine and one for solids. Stock liners, dry cover material, paper, soap and gloves.",
      "Step 9. Weeks 6 to 8. Fuel and power: buy cooking gas, a stove, a solar panel, a power station, battery lanterns, a radio and whistles. Use battery lights only. No candles and no flame.",
      "Step 10. Weeks 6 to 8. Medicine: get 90 days of each prescription. Ask a doctor first. Build a first-aid kit with a pharmacist. Put documents in a waterproof folder and copy them.",
      "Step 11. Weeks 8 to 10. Practise: run a 7-day drill with only stored water, the bucket toilet, the stove and the menu. Write the real use each day. Correct the numbers.",
      "Step 12. Weeks 8 to 10. Practise leaving at night with all five dogs, the go-bags and the lanterns. Time it.",
      "Step 13. The 90 days. Every day ask six questions: is there safe water for 72 hours, a safe way to dispose of waste, a safe building, a livable temperature, enough medicine, and a way to talk or leave? A NO means get help or move, not more improvising.",
      "Step 14. Checkpoints. Day 7: count everything. Day 14: stored water is used up, so the source must work. Day 30: rotate food and check damp and pests. Day 60: check medicines and decide on resupply or moving. Day 90: decide whether to stay or go."
    ],
    warn: [
      "Never run a stove, grill or heater indoors or in a garage. Carbon monoxide kills.",
      "Never drink floodwater or water that may hold chemicals or fuel. Never walk or drive through floodwater.",
      "Do not ration water so hard that anyone is dehydrated.",
      "Never leave a pet behind in a flood. Never leave a dog in a closed car.",
      "Do not stay without safe water, food, waste handling, medicine and a way to reach help."
    ],
    tip: [
      "Print this page and tick each step.",
      "Write the date and the web page next to every rule you check.",
      "Use the Pantry and bucket planner and the Dog supply planner tools to redo the sums with your own numbers."
    ],
    after: ["Write down what ran short, what broke and who needed help. Fix the gaps and write the next drill date."],
    sections: [
      { h: "Every day", items: [
        "Morning: check the radio or phone for official news at a set time. Save battery.",
        "Treat the day's water, fill the jugs and write the amounts used.",
        "Feed and water the dogs and check each one.",
        "Cook outdoors once or twice a day.",
        "Empty and cover the toilet. Wash hands with soap and safe water after every use.",
        "Scoop and bag dog waste. Keep it away from food and water.",
        "Evening: charge phones and lanterns. Write the day log."
      ] },
      { h: "Every week", items: [
        "Count food, water, gas, medicine and dog food and write the numbers down.",
        "Check stored food for damp, mould, insects, holes and bad smells. Throw out anything uncertain. Do not smell-test food.",
        "Eat the oldest food first.",
        "Weigh each dog. A fast weight loss needs the vet.",
        "Run the leave-early check: bags packed, carriers ready, fuel in the car, route clear."
      ] },
      { h: "If something goes wrong", items: [
        "Flood warning: leave early with the dogs. Never walk or drive through floodwater.",
        "Water source fails: use stored water first, try a second source, treat everything. If you cannot get safe water within 3 days, get help or move.",
        "Someone is ill: call 112 for danger to life. A person who cannot keep fluids down needs help.",
        "A dog is ill or stops drinking or eating: call the vet.",
        "Gas smell: leave at once and call for help from outside. Do not use switches.",
        "Headache, dizziness or nausea near a stove: go outside and call 112."
      ] }
    ],
    sources: [SRC.ready, SRC.cdcWater, SRC.fsDisaster],
    unconfirmed: [
      UNV + ": every Coimbra rule, service, risk and contact. None of the local pages was opened. Ask the local municipality, the civil protection service, your vet and a licensed gas supplier.",
      "The steps are the author's own plan from the amounts in the next guide. " + PENDING + ": not tested on a real iPad."
    ] });

  add({ id: "coimbra-90-numbers", title: "90 days at home, Coimbra: every amount and how it was worked out",
    intro: HYP + " The table gives the totals for 4 people and 5 dogs for 90 days, with 10 percent extra. The sections below show each sum so you can change a number and redo it.",
    first: [
      CALL,
      "Assumptions: 3 women at 2,000 kcal a day and 1 man at 2,400 kcal a day (8,400 kcal a day in all). Water 4 L per person per day. Dogs 8, 10, 10, 11 and 16 lb (about 25 kg together).",
      "The 4 L and 2,000 kcal figures come from the app guides. The dog amounts come from a common vets' formula, not from a vet. Check them.",
      "Buy 10 percent extra of everything for spoilage, spills and mistakes."
    ],
    do: [
      "Step 1. Check the weight of each dog and each person's needs. Change the assumptions if they differ.",
      "Step 2. Use the table to make a shopping list. Add the price you find, because no prices were checked.",
      "Step 3. Store water for the first 14 days (245 L, or 13 jugs of 20 L). Plan a safe source and treatment for the other 76 days (1,330 L).",
      "Step 4. Buy food in stages and store it sealed, labelled and dated.",
      "Step 5. Run a 7-day drill and compare real use with these numbers. Correct them."
    ],
    warn: [
      "These are estimates, not tested figures. Gas, power and sleeping gear especially need your own drill.",
      "Anyone with an allergy, a special diet, a medical device or a long-term condition needs different amounts. Ask a clinician.",
      "Never mix bleach with any other chemical."
    ],
    tip: ["Weigh the food for the first week and compare it with the plan.", "Soak beans and lentils overnight and cook with a lid to save gas."],
    after: ["Keep the sheet of real daily use. It is worth more than any estimate."],
    table: { head: ["Need", "For 90 days", "Buy (with 10 percent extra)"], rows: [
      ["Water to store for 14 days (people 224 L, dogs 21 L)", "245 L", "13 jugs of 20 L = 260 L"],
      ["Water from a source for the other 76 days", "1,330 L", "Filter, 1 L plain bleach, containers"],
      ["Rice", "31.5 kg", "35 kg"],
      ["Pasta", "22.5 kg", "25 kg"],
      ["Oats", "13.5 kg", "15 kg"],
      ["Dried beans, lentils, chickpeas", "31.5 kg", "35 kg"],
      ["Flour", "36 kg", "40 kg"],
      ["Olive oil", "10.8 L", "12 L"],
      ["Sugar", "9 kg", "10 kg"],
      ["Canned fish, 125 g cans", "180 cans", "200 cans"],
      ["Nut butter", "13.5 kg", "15 kg"],
      ["Tinned tomato, vegetables, fruit", "36 kg", "40 kg"],
      ["Salt", "1.8 kg", "2.5 kg"],
      ["Multivitamins", "360 tablets", "400 tablets"],
      ["Dry dog food (525 g a day for all five)", "47.3 kg", "52 kg"],
      ["Dog waste bags", "1,080", "1,200"],
      ["Toilet liners", "180", "220"],
      ["Dry cover material (sawdust)", "450 L", "500 L"],
      ["Toilet paper", "72 rolls", "80 rolls"],
      ["Soap", "17 bars", "20 bars"],
      ["Pads and tampons (3 women)", "180", "200, half of each"],
      ["Cooking gas", "27 kg", "30 kg: two 13 kg bottles plus 20 cartridges of 230 g"],
      ["Power (about 115 Wh a day)", "10.4 kWh", "100 W solar panel plus 500 Wh power station"],
      ["Weight to store (food, dog food, water)", "about 570 kg", "Check that the floor can carry it"]
    ] },
    sections: [
      { h: "Water", items: [
        "People: 4 people x 4 L x 90 days = 1,440 L. Dogs: about 1.5 L a day x 90 = 135 L. Total 1,575 L, which is 17.5 L a day.",
        "The 4 L per person is 2 L to drink, 1 L to cook and 1 L to wash.",
        "Stored for 14 days: people 4 x 4 x 14 = 224 L, dogs 1.5 x 14 = 21 L. Total 245 L.",
        "Bleach: plain unscented, 5 to 9 percent, 8 drops per 3.785 L of clear water (16 if cloudy). 1,330 L is 351 gallons, so about 2,808 drops, about 140 mL (about 280 mL if cloudy). Stir, then wait 30 minutes. Read the label of the bleach you buy.",
        "In hot weather, add 1 L per person and half as much again for the dogs: 4.75 L a day more, or 428 L over 90 days."
      ] },
      { h: "Food for people", items: [
        "Target 8,400 kcal a day. The table foods give about 8,240 kcal, which is 98 percent. The 10 percent extra covers the gap.",
        "Daily amounts for 4 people: rice 350 g, pasta 250 g, oats 150 g, beans or lentils 350 g, flour 400 g, olive oil 120 mL, sugar 100 g, 2 cans of fish, nut butter 150 g, tinned tomato, vegetables and fruit 400 g.",
        "Rice, beans and oats alone are not a complete diet. The plan adds fish, oil, nut butter, tinned vegetables and fruit and a multivitamin a day (4 x 90 = 360)."
      ] },
      { h: "The five dogs", items: [
        "Weights: 8, 10, 10, 11 and 16 lb, which is 3.6, 4.5, 4.5, 5.0 and 7.3 kg (lb x 0.4536). Together 25 kg.",
        "Food: resting need = 70 x kg to the power 0.75, then x 1.6 for daily life, with dry food at about 3.6 kcal a gram. That gives about 80, 100, 100, 105 and 140 g a day, 525 g in all. 525 g x 90 = 47.25 kg.",
        "Water: about 60 mL per kg a day: 0.22, 0.27, 0.27, 0.30 and 0.44 L, 1.5 L in all.",
        "A young, old, pregnant, very active or ill dog needs a different amount. Ask your vet.",
        "Never feed chocolate, grapes, raisins, onions or anything with xylitol. Weigh each dog every week."
      ] },
      { h: "Toilet and hygiene", items: [
        "Solid uses: about 1.2 per person a day x 4 x 90 = about 450. Cover each with about 1 L of dry sawdust: 450 L.",
        "Liners: 2 a day x 90 = 180. Toilet paper: 1 roll per person per 5 days = 72. Soap: 1 bar per person per 21 days = 17.",
        "Menstrual products: about 20 per cycle x 3 cycles = 60 each for 3 women = 180."
      ] },
      { h: "Cooking gas, power, warmth", items: [
        "Cooking: a 2 kW burner for 2 hours a day uses about 0.3 kg of gas. 0.3 x 90 = 27 kg.",
        "Boiling all the water is not practical on stored gas: it would take about 33 kg more. Use bleach or a filter for drinking water.",
        "Power: 4 phones 60 Wh, 4 lanterns 48 Wh, radio 5 Wh, about 115 Wh a day. 115 x 90 = 10.35 kWh.",
        "Warmth: 4 sleeping bags, 9 wool blankets (4 people and 5 dogs), hats and dry socks. No fuel heaters indoors."
      ] },
      { h: "A correction made while writing this", items: [
        "The first rough chat answer said about 45 gas cartridges. That was too low. The sum above gives about 27 kg for cooking.",
        "The first sample menu came to only about 40 percent of the daily calories. It was rebuilt to match the table."
      ] }
    ],
    sources: [SRC.cdcWater, SRC.fsDisaster, SRC.ready],
    unconfirmed: [
      UNV + ": shop prices. None were checked.",
      UNV + ": Coimbra rules, services and risks: where waste may go, whether you may take water from a source, butane bottle sizes and refills, and the sand-fly and tick risk for dogs.",
      "The 4 L water and 2,000 kcal figures are from the app guides, whose sources are labelled " + LINKED + ".",
      "Calorie values, the dog food formula, gas, power and sleeping-bag figures are typical or estimated, not tested. Test them in the drill.",
      "Medicine, first-aid and dog health items are suggestions. Ask a pharmacist, doctor and vet.",
      PENDING + ": not tested on a real iPad."
    ] });

  if (window.LOAD_CORE && window.LOAD_CORE.guides) {
    G.forEach(function (g) { window.LOAD_CORE.guides.push(g); });
  }
})();
