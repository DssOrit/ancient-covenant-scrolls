/* Extra guides and checklists added from the user's own preparedness notes (20 Oct 2026):
   wartime prep, long-outage kit, bug-out bag, offline library, offline skills, cheap power, sealing a home,
   boil and filter water, living near a river and small hydro.
   Items from the Ready.gov kit list pasted by the user are marked as official. Items we could not match to a named source
   are marked "(extra)" in the checklists and listed under "Not confirmed" in the guides. */
(function () {
  var CD = "20 Oct 2026";
  var OWN = "Items marked 'our reasoning' or 'extra' are common-sense suggestions from the user's notes or ours. They are not taken from a named official source.";
  function g(o) {
    o.area = o.area || "Essentials"; o.difficulty = o.difficulty || "Practical"; o.status = o.status || "partly"; o.checkedOn = CD;
    o.unconfirmed = (o.unconfirmed || []).concat([OWN]); o.tip = o.tip || []; o.after = o.after || []; o.warn = o.warn || [];
    o.sections = o.sections || []; o.sources = o.sources || []; o.source = (o.sources[0] && o.sources[0][1]) || "https://www.ready.gov/kit"; return o;
  }
  var KIT = ["Ready.gov: build a kit", "https://www.ready.gov/kit"];
  var G = [
    g({
      id: "ex-wartime-prep", icon: "shield", area: "Scenarios", difficulty: "Critical", title: "Prepare for wartime: the basics",
      intro: "War can cut power, water, fuel, phones and shops, and can force you to move. Start with the basics that keep a household alive for the first 3 days, then build up.",
      first: [
        "Store water: at least 1 gallon (4 L) per person per day. 2 gallons (8 L) per person per day gives you drinking, cooking and washing water.",
        "Store food that needs no cooking, and a manual can opener.",
        "Have flashlights, spare batteries, a battery or hand-crank radio and a power bank.",
        "Pack warm clothes, wet-weather gear and sturdy boots for every person.",
        "Keep a good first-aid kit and 7 to 14 days of medicines."
      ],
      do: [
        "Water and food for 3 days. Store at least 1 gallon (4 L) of water per person per day for drinking and hygiene. Count 3 days for every person and pet, then keep adding. Add canned food, dried beans, rice, oats, honey, ramen and protein powder. Honey keeps for years and a little goes a long way. Add a manual can opener, matches or lighters, and a camp stove with fuel. Check dates every 3 months.",
        "Light, power and news. Keep a flashlight for every person, spare batteries, a battery or hand-crank radio, and a power bank. Add a NOAA weather radio with tone alert if you live in the United States. Keep an old-style feature phone with a power bank, because a simple phone can last a week on one charge. See the cheap power guide for solar and inverters.",
        "Clothes, boots and shelter. Pack warm layers, socks, gloves, a rain jacket or poncho, a sleeping bag or blanket, and a good pair of hiking boots for each person. Add duct tape, plastic sheeting, rope and a tarp. Keep spare clothes in a go-bag, not only in the wardrobe.",
        "Medical, hygiene and documents. Keep a good-sized first-aid kit, such as the kits made for EMTs, plus bandages, gauze, tape, gloves, pain relief, a thermometer and a sewing kit. Keep prescriptions, spare glasses and contact lens solution. Keep soap, hand sanitizer, wipes, toilet paper, garbage bags, and feminine and baby supplies. Keep copies of ID, insurance and bank papers in a waterproof pouch, and a second copy with a trusted person.",
        "Plan, learn and prepare to move. Pick two meeting places and a way to leave. Keep a paper topographic map of your area and know how to use it. Keep the car at least half full. Pack a bug-out bag. Learn first aid, navigation, water treatment, food preservation and basic repairs. Keep a list of what you have and review it every 6 months."
      ],
      table: { head: ["Item", "Minimum", "Better"], rows: [
        ["Water", "1 gal (4 L) per person per day", "2 gal (8 L) per person per day, plus a filter and bleach"],
        ["Food", "3 days, no cooking", "14 days, plus staples"],
        ["Light", "1 flashlight per person", "Headlamps, lantern, spare batteries"],
        ["Power", "1 power bank", "Solar panel, feature phone, large power bank"],
        ["Clothes", "1 warm layer, boots", "Rain gear, spare socks, sleeping bag"],
        ["Medical", "First-aid kit, 7 days of medicine", "EMT-grade kit, 30 days of medicine, textbook"]
      ] },
      sections: [
        { h: "Wartime kit checklist", items: ["The full checklist is in the Lists tab under Wartime and long-outage kit.", "The bug-out bag checklist is in the Lists tab under Bug-out bag."] },
        { h: "Portugal notes", items: ["The Proteção Civil and the European Union ask households to prepare to cope for at least 3 days without outside help.", "Keep a paper map of Portugal and Spain, and know which roads and borders you could use.", "Call 112 for emergencies. Follow official alerts."] }
      ],
      warn: ["Do not wait for a crisis to buy supplies. Shops empty in hours.", "Do not leave water or food in a hot car or a place that freezes.", "Do not store fuel inside your home."],
      tip: ["Buy a little each month.", "Use your supplies and replace them, so nothing expires."],
      after: ["Review your kit every 6 months.", "Replace what you used.", "Practise your plan with the family."],
      sources: [KIT],
      unconfirmed: [
        "The Ready.gov supplies list (radio, flashlight, first aid, batteries, whistle, dust mask, plastic sheeting and duct tape, wipes, garbage bags, wrench, can opener, prescriptions, cash, documents, sleeping bag, change of clothes, fire extinguisher, matches, paper and pencil and more) was pasted by the user from the Ready.gov kit page. We did not open the page ourselves.",
        "1 gallon of water per person per day is the Ready.gov figure used elsewhere in this app. 2 gallons per person per day is our reasoning for drinking, cooking and washing.",
        "Honey, ramen, protein powder, boots and feature phones are suggestions from the user's notes, not from a named source.",
        "Portugal: the 3-day advice comes from news reports on ANEPC and EU guidance. We did not find the official page."
      ]
    }),
    g({
      id: "ex-boil-filter", icon: "steam", area: "Water", difficulty: "Essential", title: "Boil and filter water: the CDC steps",
      intro: "Boiling is the surest way to kill disease-causing germs, including viruses, bacteria and parasites. A filter removes some germs, but it does not make water safe on its own.",
      first: [
        "If the water is cloudy, strain it through a clean cloth, paper towel or coffee filter, or let it settle first.",
        "Draw off the clear water.",
        "Bring it to a rolling boil for 1 minute, or 3 minutes above 6,500 ft (2,000 m).",
        "Let it cool and store it in clean, covered containers."
      ],
      do: [
        "Clear the water. If it is cloudy, filter it through a clean cloth, paper towel or coffee filter, or let it settle. Then pour off the clear water into a clean pot, and leave the mud behind.",
        "Boil it. Bring the clear water to a rolling boil for 1 minute. At elevations above 6,500 feet (2,000 m), boil for 3 minutes. Start timing when the bubbles roll across the whole surface.",
        "Cool it and store it. Let the boiled water cool on its own. Pour it into clean, sanitised containers with tight covers. Label the date.",
        "Improve the taste. Boiled water tastes flat. Pour it from one clean container to another and let it stand for a few hours, or add a pinch of salt to each quart or litre.",
        "If you use a portable filter: pick one with an absolute pore size of 1 micron or smaller, to remove parasites such as Giardia and Cryptosporidium. Read and follow the maker's instructions. After filtering, add a disinfectant such as iodine, chlorine or chlorine dioxide to kill viruses and bacteria."
      ],
      table: { head: ["Method", "Parasites", "Bacteria", "Viruses"], rows: [
        ["Boiling", "Yes", "Yes", "Yes"],
        ["Portable filter (1 micron or smaller)", "Yes", "Most filters do not", "No"],
        ["Filter plus chlorine, iodine or chlorine dioxide", "Yes", "Yes", "Yes"],
        ["Cloth, sand or charcoal strainer", "No", "No", "No"]
      ] },
      warn: ["A filter alone does not remove viruses, and most portable filters do not remove bacteria.", "Boiling does not remove chemicals, fuel or salt.", "Do not use water that smells of fuel or chemicals."],
      tip: ["Boil first if you only have one method.", "Keep a spare lid and a clean pot just for water."],
      after: ["Wash hands and containers with safe water.", "Use boiled water within a few days, or re-treat it."],
      sources: [["CDC: boil water, filters and disinfectants (emergency water)", "https://www.cdc.gov/water-emergency/about/how-to-find-clean-water-in-an-emergency.html"], ["CDC: a guide to water filters", "https://www.cdc.gov/parasites/crypto/gen_info/filters.html"]],
      unconfirmed: ["The boiling steps, the taste tips, the 1 micron filter advice and the disinfectant step were pasted by the user from CDC text. We did not open the CDC pages ourselves, only found them in search results.", "The table of methods is a summary of that text. 'Most filters do not remove bacteria' is from the CDC text."]
    }),
    g({
      id: "ex-offline-library", icon: "book", area: "Essentials", difficulty: "Practical", title: "Keep a library offline: Wikipedia, videos and books",
      intro: "When the internet is down you can still read Wikipedia, medical facts and how-to guides if you saved them first. Do this now, on fast Wi-Fi.",
      first: ["Check free space on your device.", "Install the Kiwix app.", "Choose a version that fits your space.", "Download on Wi-Fi with the device plugged in.", "Test it in airplane mode."],
      do: [
        "Check space. Open Settings, General, iPad Storage. The full Wikipedia with pictures is about 90 to 100 GB. You need about 110 GB free for the file and working space. Smaller versions need much less.",
        "Install Kiwix. Kiwix is a free app that stores Wikipedia as one compressed file (a ZIM file) you can read with no internet. Install it from the App Store on iPad or iPhone, or Kiwix Desktop from kiwix.org on a laptop.",
        "Pick a version. Open the Library in Kiwix and search 'Wikipedia'. Choose English all with pictures (about 90 to 100 GB), English all without pictures (about 12 to 46 GB, sources disagree), or Simple English (about 600 MB). Search the library for Portuguese Wikipedia, medicine, how-to and disaster collections.",
        "Download. Use fast Wi-Fi, keep the device plugged in, and expect hours. For 100 GB a laptop is faster and more reliable. Keep the file on an external drive if the laptop is small. You can run Kiwix Server on the laptop so other devices read it in a browser.",
        "Test and add books. Turn on airplane mode and open the file to check it works. Save PDFs of first aid, repair and plant guides, a car repair manual, and medical textbooks. Keep a paper copy of the most important pages. Keep a battery or solar charger for the device."
      ],
      table: { head: ["Version", "Approx. size", "What you get"], rows: [
        ["English, all, with pictures", "About 90 to 100 GB", "Everything, with images"],
        ["English, all, no pictures", "12 to 46 GB (sources disagree)", "All text, no images"],
        ["Simple English", "About 600 MB", "Short, easy articles"],
        ["Portuguese Wikipedia", "Not confirmed", "Search Kiwix for current size"]
      ] },
      warn: ["Check the size shown in Kiwix before you start. The numbers above conflict between sources.", "Downloading videos from some websites may break their terms. Save only videos that allow it or that you own, and prefer Kiwix collections and open guides.", "Offline files do not update. Check them once a year."],
      tip: ["Keep the library on two devices, or on an external drive in a drawer.", "Play how-to videos you saved while you do chores. Repeat helps you learn."],
      after: ["Check the library works every 6 months with your checklist.", "Keep the device charged."],
      sources: [["Kiwix (offline Wikipedia and other libraries)", "https://www.kiwix.org/"]],
      unconfirmed: ["File sizes come from two third-party articles (Inverse for 2022 files, Selfhosting.sh) that disagree on the no-pictures size. Kiwix's own download list could not be opened.", "The Portuguese Wikipedia file size and the names of medicine and disaster collections were not confirmed.", "The steps for iPad and laptop come from the user's notes and Kiwix basics. We did not test them on a device."]
    }),
    g({
      id: "ex-offline-skills", icon: "compass", area: "Essentials", difficulty: "Practical", title: "Skills to learn offline: maps, signals, plants and repairs",
      intro: "Gear fails and batteries die. Skills in your head do not. Practise a few each month, and keep paper books for the rest.",
      first: ["Keep a paper map and a compass.", "Learn the SOS signal.", "Never eat a wild plant unless you are sure.", "Keep a repair book in the car.", "Start with one skill this month."],
      do: [
        "Navigate with and without a compass. Learn to read a topographic map: contour lines show hills, close lines mean steep ground. Match the map to landmarks. Without a compass, use the sun, which rises roughly east and sets roughly west, and the night sky. Keep to roads and rivers you can name. Practise on a short walk with a map before you need it.",
        "Signal for help. Learn Morse code. SOS is three short, three long, three short. Use a whistle, three blasts, a flashlight, a mirror or bright cloth. Practise with a family member so you both know it.",
        "Identify wild plants and preserve food. Print a field guide for your area. Eat only what an expert has confirmed. Learn drying, salting, canning and fermenting. See the preserving guides in this app. Keep printed facts on local plants and animals.",
        "Repair and fix. Keep a repair book in your car, for the engine, tyres and battery. Learn to change a tyre, jump a battery and check oil. Keep basic tools: a saw, hammer, nails, pliers and a wrench. Learn simple sewing and patching.",
        "Learn medicine and safety. Take a first-aid course and a Stop the Bleed course. Keep medical textbooks, such as a field first-aid manual, and a book for common illness. Practise lock safety on your own locks only, for example to avoid being locked out. Review all skills every 6 months."
      ],
      sections: [{ h: "Skills checklist", items: ["Map reading and compass use", "SOS and Morse code", "First aid and Stop the Bleed", "Water treatment and boiling", "Fire building and safe cooking", "Food preserving", "Plant safety", "Basic car repair", "Basic sewing and patching", "Radio use", "Knots and rope"] }],
      warn: ["Never eat a wild plant or mushroom unless an expert has identified it. Many poisonous plants look like edible ones.", "Do not rely on a phone map. Keep a paper map.", "Do not pick other people's locks."],
      tip: ["Download or print guides while you still have internet.", "Practise on weekends, with the family."],
      after: ["Write down what you can do and what you cannot.", "Pick one skill a month."],
      sources: [["Ready.gov: build a kit", "https://www.ready.gov/kit"]],
      unconfirmed: ["This guide is general guidance from the user's notes. It was not checked against a named official source.", "The Morse SOS pattern is standard (three short, three long, three short). We did not check it against a named page.", "Compass-free direction by the sun is approximate. Practise before you rely on it."],
      status: "general"
    }),
    g({
      id: "ex-cheap-power", icon: "battery", area: "Power", difficulty: "Practical", title: "Cheap power with limited money",
      intro: "You do not need a big system. A small solar panel, a power bank and a simple phone cover the most important needs.",
      first: ["Buy a power bank and keep it charged.", "Buy a small solar panel with a USB connector.", "Keep it in a closet and test it every 6 months.", "Keep an old-style phone."],
      do: [
        "Power bank first. A large power bank (for example 40,000 mAh) can keep a phone charged for several days. Charge it fully and check it every month. Know that airlines limit large banks. Check your airline's rules before you fly.",
        "Small solar panel. A basic 10 watt solar panel with a USB connector is cheap. Keep it in a closet. Put 'test the solar panel' on your six-month list with air filters and smoke alarms. Test it in sun, plugged into a power bank. Panels charge best in direct sun, not behind glass.",
        "An old-style phone. A simple 'candy bar' or flip phone that charges by USB can last about a week on one charge. Keep it, a charger and a small power bank together. Use it for calls and texts.",
        "A bigger step. A 12 volt battery, a charge controller and an inverter can power lights and a router. Add a 12V battery and a converter of about 15 dollars, and a small panel will charge a laptop too. An inverter works for a few hours at a time, and a generator with fuel lasts days. Use both outdoors, with a carbon monoxide alarm.",
        "Plan your power. Write down what you need to run: phone, radio, light, medical device. Add the watts. Use the Watts tool in this app. Charge only when you need to, and use airplane mode. Keep spare cables."
      ],
      table: { head: ["Item", "What it does", "Cost level"], rows: [
        ["40,000 mAh power bank", "Several phone charges", "Low"],
        ["10 W USB solar panel", "Slowly charges a phone or bank in sun", "Low"],
        ["Old-style phone", "Calls and texts, a week per charge", "Low"],
        ["12V battery, controller, inverter", "Lights, router, laptop for hours", "Medium"],
        ["Generator with fuel", "Days of power, used outdoors", "Higher"]
      ] },
      warn: ["Never run a generator or burn fuel indoors. Carbon monoxide kills.", "Do not leave a power bank in a hot car.", "Do not use a cheap inverter on devices that need steady power, such as medical machines."],
      tip: ["Test every item you own, and put the date on it.", "Our reasoning: a 10 W panel in full sun may give about 30 to 50 watt-hours in a day, enough for a few phone charges."],
      after: ["Test your solar panel every 6 months.", "Replace damaged cables."],
      sources: [["Ready.gov: power outages", "https://www.ready.gov/power-outages"], ["CDC: prevent carbon monoxide poisoning", "https://www.cdc.gov/natural-disasters/psa-toolkit/prevent-carbon-monoxide-poisoning.html"]],
      unconfirmed: ["Panel, power bank, feature phone and inverter advice comes from the user's notes. It was not checked against a named source.", "The daily output of a 10 W panel is our reasoning. It depends on sun and angle.", "Airline limits on large power banks (about 100 watt-hours without approval) were not checked in this session. Check your airline.", "The generator and carbon monoxide warnings match CDC and Ready.gov text seen in search results."],
      status: "general"
    }),
    g({
      id: "ex-seal-home", icon: "home", area: "Shelter", difficulty: "Practical", title: "Seal and board up your home",
      intro: "Duct tape, plastic sheeting, plywood and rope turn an ordinary room into a safer one in a chemical, smoke or storm emergency.",
      first: ["Know which room to use: one with few windows.", "Keep plastic sheeting, scissors and duct tape together.", "Cut the sheeting to size now.", "Keep plywood for the main windows and doors."],
      do: [
        "Pick the room. Choose an interior room, with few windows, and close to a bathroom if you can. Know where the water, gas and power shut-offs are, and keep a wrench or pliers for them.",
        "Cut sheeting to size. Cut plastic sheeting 6 inches (15 cm) larger than each door, window and vent. Label each piece. Keep it, duct tape and scissors in one container.",
        "Seal the room when told to shelter in place. Close windows and doors. Turn off fans, heating and air conditioning. Tape the sheeting over windows, doors and vents. Tape gaps. Bring in water, food, radio and a first-aid kit.",
        "Board up for storms. Cut plywood to fit each window and keep it in a dry place with screws. Mark each board for its window. Fit them before a storm. Use rope to secure loose items and to tie down a tarp.",
        "After. Wait for the all-clear on the radio. Remove the tape and sheeting. Open windows and air the room. Replace what you used."
      ],
      warn: ["Do not seal a room for long. Sealed rooms run low on fresh air. Follow officials' instructions on how long.", "Never use a fuel stove, grill or candle in a sealed room.", "Do not board windows you need as an exit."],
      tip: ["Practise taping one window so you know how long it takes.", "Keep tape, sheeting and a wrench with the kit."],
      after: ["Check seals and replace damaged sheeting.", "Store boards and tape for next time."],
      sources: [KIT],
      unconfirmed: ["Plastic sheeting, scissors and duct tape for shelter in place, and a wrench or pliers to turn off utilities, are on the Ready.gov kit list pasted by the user. The page was not opened by us.", "The 6 inch overlap, room choice and plywood steps are general guidance. They were not checked against a named source."],
      status: "general"
    }),
    g({
      id: "ex-river-hydro", icon: "waves", area: "Long-term", difficulty: "Practical", title: "Living near a river: water, power and food",
      intro: "A river gives water, fish, fertile land and sometimes power. It also brings floods, disease and risk. Plan for both.",
      first: ["Never drink river water raw.", "Know the flood level of your site.", "Check local rules before you take water or build.", "Treat all river water before use."],
      do: [
        "Water. A river is a reliable source of fresh water. Always treat it: strain, filter, then boil or disinfect. See the river water guide and the boil and filter guide.",
        "Food. Rivers hold fish, and floodplains hold rich soil for gardens. See the fishing and garden guides. Check local fishing rules and licences.",
        "Power. Hydroelectricity is power from moving water. Small home systems are called micro-hydropower. A 10-kilowatt micro-hydro system generally can power a large home, a small resort or a hobby farm. You need a steady flow, a drop in height, a permit, and a qualified installer. A watermill can also drive tools.",
        "Transport. Rivers carried goods and people for centuries. A boat that can carry 10 to 20 people could help with an evacuation. Buy life jackets, learn to handle it, and check permits and insurance.",
        "Defence and risk. A river can also act as a barrier. It can flood, wash out roads and spread disease. Know your flood zone, keep a boat or a route out, and have a plan for water borne illness."
      ],
      warn: ["Never swim in or drink floodwater.", "River water can carry parasites, bacteria and chemicals. Treat it every time.", "Do not build in a flood plain without checking the flood level."],
      tip: ["Walk the river with a local to see flood marks.", "Take photos of water levels in each season."],
      after: ["Check your flood plan each year.", "Check water quality if the river changes colour or smell."],
      sources: [["US Department of Energy: microhydropower systems", "https://www.energy.gov/energysaver/microhydropower-systems"], ["CDC: finding other sources of water in an emergency", "https://www.cdc.gov/water-emergency/about/how-to-find-clean-water-in-an-emergency.html"]],
      unconfirmed: ["The 10 kilowatt micro-hydro statement comes from the user's notes and matches US Department of Energy text. We did not open that page.", "The list of advantages of river settlements (water, transport, soil, power, defence, fishing) comes from the user's notes. It is general history, not checked against a named source.", "The boat size (10 to 20 people) is from the user's notes. Permits and safety rules were not checked."],
      status: "general"
    })
  ];
  window.LOAD_EXTRAS = G;
  if (window.LOAD_CORE) { window.LOAD_CORE.guides = window.LOAD_CORE.guides.concat(G); }
  var LISTS = [
    { id: 'wartimekit', title: 'Wartime and long-outage kit', items: [
      'Water: 1 gal (4 L) per person per day, and a filter or bleach (Ready.gov)', 'Canned food and no-cook food for 3 days or more (Ready.gov)', 'Manual can opener (Ready.gov)', 'Honey, dried beans, rice, oats and ramen (extra)', 'Protein powder (extra)', 'Salt, sugar and cooking oil (extra)',
      'Flashlight for each person and extra batteries (Ready.gov)', 'Battery or hand-crank radio (Ready.gov)', 'NOAA Weather Radio with tone alert, US only (Ready.gov)', 'Whistle to signal for help (Ready.gov)', 'Power bank, 40,000 mAh if you can (extra)', '10 W USB solar panel, tested every 6 months (extra)', 'Old-style feature phone with USB charge (extra)', 'Large inverter and 12 V battery for lights and WiFi (extra)', 'Cheap solar phone charger (extra)',
      'Warm clothes and wet-weather gear (extra)', 'Hiking boots for each person (extra)', 'Rain ponchos (extra)', 'Water shoes (extra)', 'Socks and gloves (Ready.gov)', 'Complete change of clothing and sturdy shoes (Ready.gov)', 'Sleeping bag or warm blanket for each person (Ready.gov)', 'Extra clothes, blankets and pillows (extra)',
      'Large first-aid kit, such as an EMT-grade kit (extra)', 'Bandages, gauze, medical tape and sewing supplies (extra)', 'Prescription medicines, organised and protected (Ready.gov)', 'Non-prescription medicines: pain relief, anti-diarrhoea, antacids, laxatives (Ready.gov)', 'Prescription glasses and contact lens solution (Ready.gov)', 'Potassium iodide tablets for nuclear emergencies (extra)', 'Iodine tablets for water treatment (extra)', 'Aloe vera (extra)', 'Alcohol (extra)', 'Medical textbooks (extra)',
      'Soap, hand sanitizer and disinfecting wipes (Ready.gov)', 'Moist towelettes (Ready.gov)', 'Toilet paper (extra)', 'Garbage bags and plastic ties (Ready.gov)', 'Feminine supplies and a box of tampons (Ready.gov and extra)', 'Personal hygiene items (Ready.gov)', 'Dust mask (Ready.gov)',
      'Plastic sheeting, scissors and duct tape (Ready.gov)', 'Big roll of duct tape (extra)', 'Plywood to cover doors and windows (extra)', 'Rope (extra)', 'Wrench or pliers to turn off utilities (Ready.gov)', 'Fire extinguisher (Ready.gov)', 'Matches in a waterproof container (Ready.gov)', 'Plenty of Bic lighters, also a useful trade item (extra)', 'Mess kits, paper cups, plates, paper towels and plastic utensils (Ready.gov)', 'Utensils (extra)',
      'Saw, hammer and nails (extra)', 'A good knife or machete (extra)', 'Fishing supplies (extra)', 'Boat that can carry 10 to 20 people, if you live near a river (extra)',
      'Paper and pencil (Ready.gov)', 'Paper topographic map of your area, including Portugal and Spain if relevant (extra)', 'Compass (extra)', 'Printed facts on local plants (extra)', 'Car repair book kept in the car (extra)', 'Ham radio (extra)', 'Offline library: Wikipedia and guides on a device (extra)', 'Books, games, puzzles and a deck of cards (Ready.gov and extra)',
      'Pet food and extra water, and dog food (Ready.gov)', 'Infant formula, bottles, diapers, wipes and diaper rash cream (Ready.gov)',
      'Cash in small bills, and traveler\'s checks if you use them (Ready.gov)', 'Copies of ID, insurance and bank records in a waterproof, portable container (Ready.gov)', 'Legal firearm and ammunition, only where lawful, with a licence, training and locked storage (extra, from the user\'s notes)'
    ] },
    { id: 'bugout', title: 'Bug-out bag', items: [
      'Water and a way to treat more', 'Storable food', 'Medical kit', 'Tools and a knife', 'Backpack for each person', 'Physical topographic map of your surrounding area (Portugal, Spain and others)', 'Iodine tablets', 'Rain ponchos', 'Box of tampons', 'Bic lighter', 'Big roll of duct tape', 'Water shoes', 'Toilet tissue', 'Wipes', 'Alcohol', 'Aloe vera', 'Socks and gloves', 'Warm layer', 'Flashlight and spare batteries', 'Radio', 'Power bank', 'Cash in small bills', 'Copies of documents', 'Deck of cards'
    ] }
  ];
  if (window.LOAD_CORE && window.LOAD_CORE.lists) { window.LOAD_CORE.lists = window.LOAD_CORE.lists.concat(LISTS); }
})();
