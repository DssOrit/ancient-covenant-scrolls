/* Scenario and extra guides. Written for Load Survival in plain language.
   status: "checked" (figures match a named official source), "partly" (some figures checked, listed in "unconfirmed"),
   "general" (general guidance, not confirmed against a named source).
   Checked date: 18 Oct 2026. Sources that could not be opened directly are marked in the unconfirmed list. */
(function () {
  var CD = "18 Oct 2026";
  var GEN = ["This guide is general guidance. It was not checked against a named official source."];
  var G = [
    /* ---------------- SCENARIOS ---------------- */
    {
      id: "sc-radiation", icon: "alert", area: "Scenarios", difficulty: "Critical",
      title: "Radiation or nuclear emergency",
      intro: "Walls and distance protect you. The plan is short: get inside, stay inside, stay tuned.",
      status: "checked", checkedOn: CD,
      sources: [["CDC: About Radiation Emergencies", "https://www.cdc.gov/radiation-emergencies/about/"]],
      unconfirmed: ["Advice not to collect children from school was not found in the CDC results. Follow what the school and officials say.", "Local shelter names and alert systems differ. Check your own area."],
      first: ["Get inside a building at once.", "Stay inside until officials say it is safe.", "Stay tuned to a battery radio or TV for official news."],
      do: ["Go to the middle of the building or a basement if you have one. Walls block much of the radiation.", "If you were outside, take off your outer layer of clothes. This can remove up to 90% of radioactive dust. Put the clothes in a sealed bag, away from people.", "Wash your skin and hair with soap and water. Do not scrub hard.", "Close windows and doors. Turn off fans and air conditioning that bring in outside air.", "Take potassium iodide only if officials tell you to. It protects only the thyroid and can harm you if you take it when you do not need it."],
      warn: ["Do not go outside to look at what happened.", "Do not drive toward the event or try to collect people before officials say it is safe.", "Do not take potassium iodide on your own. It does not protect against everything."],
      tip: ["Keep a battery or hand-crank radio charged and ready.", "Keep water and food in the room where you shelter."],
      after: ["Follow official instructions on when to leave and where to go.", "Bag and keep contaminated clothes until officials tell you how to dispose of them."]
    },
    {
      id: "sc-chemical", icon: "flask", area: "Scenarios", difficulty: "Critical",
      title: "Chemical or industrial accident",
      intro: "Air carries the danger. Get indoors, seal the room and listen for instructions, or leave if told to.",
      status: "general", unconfirmed: GEN,
      first: ["Follow the official instruction: shelter in place or evacuate.", "Go indoors if you are told to shelter.", "Call emergency services if anyone is sick."],
      do: ["Close all windows and doors. Turn off fans, air conditioning and heating that bring in outside air.", "Go to an interior room with no windows, above ground if the gas is heavier than air and below it if lighter. Follow the advice on the radio.", "Block gaps under the door with wet towels. Use tape only if officials say so.", "Keep a battery radio on. Wait for the all-clear.", "If you must evacuate, go crosswind and uphill, away from the source."],
      warn: ["Do not stay in a closed room for hours without official advice. Air can run low in a very small room.", "Do not touch spilled liquids or powder.", "Eyes burning, coughing or dizziness: move to fresh air and call emergency services."],
      tip: ["Know the hazard sites near your home and work.", "Keep a first-aid kit and masks in the shelter room."],
      after: ["Open windows and ventilate only when officials say it is safe.", "Wash skin and clothes that touched chemicals."]
    },
    {
      id: "sc-volcano", icon: "mountain", area: "Scenarios", difficulty: "Practical",
      title: "Volcano and ash fall",
      intro: "Ash is heavy, sharp and bad for lungs. Protect your breathing, your water and your roof.",
      status: "general", unconfirmed: GEN.concat(["Alert-level names differ by country. Check the volcano observatory for your area (in the Azores, CIVISA)."]),
      first: ["Follow the official alert level and evacuation orders.", "Stay indoors during ash fall.", "Cover your nose and mouth with an N95 or FFP2 mask."],
      do: ["Close windows and doors. Block gaps with damp cloths.", "Bring pets and animals indoors.", "Cover water tanks and wells. Do not drink water from open containers during ash fall.", "Keep ash off your roof only if you can do it safely. Wet ash is very heavy and can collapse a roof.", "Wear goggles and a mask when you go out. Drive slowly, or not at all. Ash clogs engines."],
      warn: ["Do not run a car engine in thick ash. It can stall.", "Do not wash ash into drains. It sets like cement.", "Do not climb on a roof in the dark or in rain."],
      tip: ["Keep spare air filters for your car.", "Keep goggles in your go-bag."],
      after: ["Wet ash lightly before sweeping so it does not rise. Wear a mask.", "Bag the ash. Follow local rules for disposal."]
    },
    {
      id: "sc-solar-storm", icon: "sun", area: "Scenarios", difficulty: "Practical",
      title: "Solar storm",
      intro: "A strong solar storm can disturb power grids, radio, satellites and GPS. Use your long-outage plan.",
      status: "general", unconfirmed: GEN.concat(["Warning levels and the length of a possible outage depend on the storm. Check NOAA Space Weather."]),
      first: ["Follow official warnings from your space weather service.", "Use your power outage plan.", "Do not rely on GPS."],
      do: ["Keep a paper map and a compass.", "Keep a battery or hand-crank radio. Some long-range signals may fail.", "Unplug sensitive electronics during a severe warning, if officials advise it.", "Keep fuel above half in your car.", "Keep cash in small bills in case cards stop working."],
      warn: ["Do not panic. Most storms cause little or no damage at ground level.", "Do not rely on satellite phones or GPS."],
      tip: ["Charge power banks before a warning.", "Know where your meeting places are."],
      after: ["Check devices before you plug them back in.", "Check food in the fridge if power was out."]
    },
    {
      id: "sc-emp", icon: "bolt", area: "Scenarios", difficulty: "Practical",
      title: "EMP and electronics",
      intro: "An electromagnetic pulse is a rare event. The plan is the same as for a long power outage.",
      status: "general", unconfirmed: GEN.concat(["How much damage an EMP would cause, and how well a Faraday cage protects, is uncertain. No one can promise a result."]),
      first: ["Treat it as a long outage.", "Do not depend on any one device.", "Use paper and simple tools as a backup."],
      do: ["Keep a hand-crank radio, paper maps, a compass and printed contact numbers.", "Keep spare electronics, such as a small radio and a charger, in a metal bin with a tight lid. See the Faraday guide.", "Keep water, food and cash for at least two weeks.", "Know how to start your car without relying on one electronic part. Keep a manual for it.", "Keep first aid and medicines on paper lists."],
      warn: ["A Faraday bin is optional and not a guarantee.", "Do not spend money on products that promise full protection."],
      tip: ["Simple old tools work in every outage.", "Practise your plan once a year."],
      after: ["Test your backup devices.", "Replace anything that failed the test."]
    },
    {
      id: "sc-cyber-grid", icon: "grid", area: "Scenarios", difficulty: "Practical",
      title: "Cyberattack on the grid or banks",
      intro: "A cyberattack can stop power, banks, shops and phones. Plan for a week or more.",
      status: "general", unconfirmed: GEN.concat(["How long an attack would last is unknown."]),
      first: ["Check official channels on a battery radio.", "Stay calm and use your outage plan.", "Keep cash and fuel."],
      do: ["Keep cash in small bills. Cards and cash machines may fail.", "Keep a full tank of fuel.", "Keep two weeks of food, water and medicines.", "Keep paper copies of bank details and numbers.", "Keep a hand-crank radio for news."],
      warn: ["Do not click links in messages that claim to be from banks or officials.", "Do not share your accounts or passwords."],
      tip: ["Use more than one bank if you can.", "Keep important papers in a waterproof bag."],
      after: ["Check your accounts when services return.", "Change passwords on important accounts."]
    },
    {
      id: "sc-pandemic", icon: "pill", area: "Scenarios", difficulty: "Practical",
      title: "Pandemic or serious illness spreading",
      intro: "Stay home when ill, keep supplies for two weeks, and follow your health authority.",
      status: "general", unconfirmed: GEN.concat(["Advice changes with each illness. Follow your health authority (CDC, WHO, DGS in Portugal)."]),
      first: ["Follow your health authority.", "Stay home if you are ill.", "Call a doctor or health line for serious symptoms."],
      do: ["Keep two weeks of food, water and your usual medicines.", "Keep a thermometer, masks, soap and oral rehydration salts at home.", "Wash hands with soap and safe water for 20 seconds, or use gel with at least 60% alcohol.", "Refill prescriptions early.", "Keep one room for a sick person if you can. Ask them to wear a mask and use separate dishes."],
      warn: ["Do not take medicine for a condition you have not been diagnosed with.", "Call emergency services for trouble breathing, blue lips, confusion or chest pain."],
      tip: ["Keep a list of everyone's medicines and doctors.", "Check on older neighbours by phone."],
      after: ["Clean surfaces that were touched often.", "Restock what you used."]
    },
    {
      id: "sc-supply-chain", icon: "can", area: "Scenarios", difficulty: "Practical",
      title: "Supply shortage or money problems",
      intro: "Shops, fuel and banks can fail. A rotated two-week pantry and some cash cover the first weeks.",
      status: "general", unconfirmed: GEN,
      first: ["Do not panic-buy. Buy a little extra each week.", "Keep cash in small bills.", "Keep your fuel tank above half."],
      do: ["Build a two-week pantry of foods your family eats. Rotate it.", "Keep medicines refilled and a month ahead if your doctor allows.", "Keep accounts at more than one bank if you can.", "Keep a list of what you use each week so you know what to stock.", "Share and trade with neighbours when it is safe and fair."],
      warn: ["Do not hoard so much that others go without.", "Do not store food you will not eat."],
      tip: ["Buy in small amounts each week.", "Use up older food first."],
      after: ["Review your pantry every three months.", "Replace what you used."]
    },
    {
      id: "sc-civil-unrest", icon: "shield", area: "Scenarios", difficulty: "Practical",
      title: "Civil unrest or trouble nearby",
      intro: "Stay informed, stay away from the area and keep your options open. Avoid confrontation.",
      status: "general", unconfirmed: GEN,
      first: ["Stay away from the area.", "Keep informed from official news.", "Keep your car fuelled."],
      do: ["Stay indoors if the street is not safe. Lock doors and keep lights low.", "Keep your phone charged and your documents ready.", "Know a second place you can go to, such as a relative's home.", "Do not show large amounts of cash or supplies.", "Check on neighbours. Agree a signal if you need help."],
      warn: ["Do not go to see what is happening.", "Do not confront anyone. Call emergency services (911 in the US, 112 in Portugal) if you are in danger."],
      tip: ["Plan two routes out of your area.", "Keep a go-bag by the door."],
      after: ["Wait for official all-clear before you travel.", "Photograph any damage for records."]
    },
    {
      id: "sc-war", icon: "alert", area: "Scenarios", difficulty: "Practical",
      title: "War or armed conflict",
      intro: "Know your local alert system and shelter, and keep a 72-hour kit ready.",
      status: "general", unconfirmed: GEN.concat(["Alert systems and shelters differ by country. Check your local authority."]),
      first: ["Follow official instructions.", "Take shelter when told to.", "Keep your 72-hour kit ready."],
      do: ["Learn the alert signals and the nearest public shelter.", "Keep documents, cash and medicines in a waterproof bag.", "Keep passports and residence papers current.", "Keep a battery radio for official news.", "Plan two meeting places and an out-of-area contact."],
      warn: ["Do not spread rumours. Check official sources.", "Do not approach damaged buildings or unexploded items. Call emergency services."],
      tip: ["Keep your tank above half.", "Keep a paper map of your area."],
      after: ["Follow official guidance on when it is safe to move.", "Help neighbours who need it."]
    },
    {
      id: "sc-drought", icon: "drop", area: "Scenarios", difficulty: "Practical",
      title: "Drought and water shortage",
      intro: "Store water, use less, and follow local rules.",
      status: "general", unconfirmed: GEN.concat(["Check rainwater and water-use rules with your local authority."]),
      first: ["Follow local water rules.", "Store 1 gallon (3.8 L) per person per day.", "Use water twice where you can."],
      do: ["Collect rainwater when it comes. See the rainwater guide.", "Catch shower and sink water for flushing and plants (not for drinking).", "Fix leaks. Wash only full loads.", "Mulch garden beds. Water early or late in the day.", "Treat all outside water before you drink it."],
      warn: ["Do not drink water of unknown source untreated.", "Do not use chemicals or soap in water that drains to a stream."],
      tip: ["Keep a few larger containers filled when rain is forecast.", "Find nearby springs or wells and check who owns them."],
      after: ["Keep up the water habits you built.", "Rotate your stored water."]
    },
    {
      id: "sc-iberian-blackout", icon: "bolt", area: "Scenarios", difficulty: "Practical",
      title: "Lessons from the April 2025 Iberian blackout",
      intro: "In April 2025 a large blackout hit Spain and Portugal. Phones, cards and traffic lights failed.",
      status: "partly", checkedOn: CD,
      sources: [],
      unconfirmed: ["The length of the outage (about 5 hours in Portugal, about 10 hours for full power) and the cause come from press reports. We did not find an official report to confirm them.", "Mobile network and 112 failures were reported in the press. Check official reports."],
      first: ["Keep a battery radio.", "Keep cash in small bills.", "Plan for no phone signal."],
      do: ["Keep small cash for food, fuel and transport. Cards and cash machines stopped.", "Keep a battery or hand-crank radio. Mobile networks were unreliable.", "Agree meeting places and check-in times in advance.", "Fill your fuel tank before a storm. Fuel pumps need power.", "Keep water, food and medicines for a day or more."],
      warn: ["Traffic lights fail. Treat every junction as a stop sign.", "Do not depend on phone calls. Use texts."],
      tip: ["Keep a paper list of phone numbers.", "Keep a torch in every room."],
      after: ["Write down what went wrong in your home.", "Fix the gaps before the next event."]
    },
    {
      id: "sc-fire-safety", icon: "flame", area: "Fire", difficulty: "Essential",
      title: "Home fire safety",
      intro: "Most home fires are preventable. Alarms, exits and a plan save lives.",
      status: "general", unconfirmed: GEN,
      first: ["Get out and stay out.", "Call emergency services from outside.", "Never go back in."],
      do: ["Put a smoke alarm on every level and near bedrooms. Test them monthly.", "Keep a multipurpose fire extinguisher in the kitchen. Learn how to use it.", "Plan two ways out of every room. Pick a meeting place outside.", "Keep heaters about 3 ft (1 m) away from anything that burns. Never leave them on when you sleep.", "Prefer battery lights to candles."],
      warn: ["Never use water on a grease or electrical fire.", "If your clothes catch fire: stop, drop and roll.", "Crawl low under smoke."],
      tip: ["Practise your escape plan twice a year.", "Fit a carbon monoxide alarm too."],
      after: ["Do not re-enter until firefighters say it is safe.", "Replace used extinguishers and alarm batteries."]
    },
    {
      id: "es-kit-tiers", icon: "pack", area: "Essentials", difficulty: "Essential",
      title: "Kit builder: 72 hours, 2 weeks and longer term",
      intro: "Build the 72-hour kit first. Then grow it. All amounts are per person.",
      status: "partly", checkedOn: CD,
      sources: [["Ready.gov water guidance", "https://Ready.Illinois.Gov/plan/water.html"], ["EU 72-hour advice (Reuters via Fidelity)", "https://fidelity.com/news/article/default/202503260726RTRSNEWSCOMBINED_KCN3G311A-OUSWD_1"]],
      unconfirmed: ["Two weeks of supplies as a FEMA recommendation was not found in the sources. We use it as good practice.", "The Portuguese ANEPC amount of water (3 L per day) was reported by one site. The ANEPC page was not found.", "Medicine and cash amounts are general advice."],
      first: ["Start with water, food, light and a radio.", "Build in three tiers: 72 hours, 2 weeks, then longer term.", "Write the date on everything."],
      do: ["72 hours: 1 gal (3.8 L) of water per day, about 2,000 kcal of food per day with no cooking, a torch, a radio, power banks, a first-aid kit and 7 days of medicines.", "2 weeks: 14 gal (53 L) of water per person, rotated pantry food, a stove and fuel, lanterns, a power station, and 14 days of medicines.", "Longer term: rain collection and a filter, a garden and bulk staples, solar panels, hand tools and spare parts.", "Always add: soap, gel, toilet bags, a blanket or sleeping bag, spare clothes and a multi-tool.", "Add documents in a waterproof bag, and small bills and coins."],
      table: { head: ["Item", "72 hours", "2 weeks"], rows: [["Water", "1 gal (3.8 L) a day = 3 gal", "14 gal (53 L)"], ["Food", "2,000 kcal a day", "Rotated pantry"], ["Medicines", "7 days", "14 days"], ["Power", "Power banks", "Power station"], ["Cash", "Small notes", "A larger buffer"]] },
      warn: ["Common mistakes: not testing radios and power banks, letting medicines run low, storing water in old milk jugs.", "Check expiry dates every three months."],
      tip: ["Use the Lists tab to tick items.", "Portugal: copy each person's Cartão de Cidadão."],
      after: ["Review the kit every six months.", "Replace what you used."]
    },
    {
      id: "es-radios-alerts", icon: "radio", area: "Essentials", difficulty: "Practical",
      title: "Radios and alerts: United States and Portugal",
      intro: "Do not rely on one alert channel. Use more than one.",
      status: "partly", checkedOn: CD,
      sources: [["NWS: NOAA Weather Radio", "https://www.weather.gov/marine/wxradio"], ["FCC: FRS and GMRS", "https://Www.fcc.gov/node/25319"], ["IPMA warnings", "https://ipma.pt/pt/enciclopedia/otempo/sam"], ["ANEPC: SMS warnings", "https://prociv.gov.pt/en/noticias/02072026-anepc-issues-public-warning-by-sms/"]],
      unconfirmed: ["Whether ANEPC SMS goes only for the highest alert level was not confirmed.", "A national cell-broadcast system for Portugal (sometimes called PT-Alert) was announced as a study in 2023. No source confirms it is live, so we do not name it as available.", "PMR446 limits, the GMRS licence fee, and the names of official apps were not checked.", "Text-to-911 is not available in every area. Check yours."],
      first: ["Carry a battery or hand-crank radio.", "Know your emergency number: 911 in the US, 112 in Portugal.", "Text instead of calling."],
      do: ["US weather radio: NOAA Weather Radio uses 7 channels from 162.400 to 162.550 MHz. A SAME radio can be set to alert only for your county.", "US phone alerts: Wireless Emergency Alerts include Presidential, Imminent Threat and AMBER alerts.", "Portugal: ANEPC sends warnings by SMS from AvisoPROCIV. It is free and needs no sign-up. IPMA colours: green no risk, yellow keep watching, orange moderate to high risk, red extreme risk.", "Short-range radio: FRS radios need no licence in the US. GMRS needs an FCC licence.", "Write your phone numbers on a card. Pick one out-of-area contact and two meeting places."],
      warn: ["Do not wait for an alert to leave if you see signs of danger.", "Official apps and alerts can fail in a blackout. Keep a radio."],
      tip: ["Download offline maps and keep a paper map.", "Test your radio once a month."],
      after: ["Update your numbers card.", "Tell your family what worked."]
    },
    {
      id: "es-portugal-notes", icon: "globe", area: "Essentials", difficulty: "Practical",
      title: "Portugal notes",
      intro: "Portugal's main risks are wildfire, earthquake and tsunami, heat, floods and grid or fuel disruption.",
      status: "partly", checkedOn: CD,
      sources: [["Aldeia Segura (Observador, Jan 2024)", "https://observador.pt/2024/01/29/incendios-mais-de-2-200-povoacoes-aderiram-ao-programa-aldeia-segura-em-seis-anos/"], ["EU 72-hour advice (Reuters via Fidelity)", "https://fidelity.com/news/article/default/202503260726RTRSNEWSCOMBINED_KCN3G311A-OUSWD_1"]],
      unconfirmed: ["Child helpline 116 111, poison line 800 250 250 and the FFP2 mask advice were not confirmed in the sources. Check before you rely on them.", "Aldeia Segura numbers change. A January 2024 report said 919 of 2,242 villages had evacuation plans, so fewer than half. Check ANEPC.", "The Portuguese ANEPC pages for the 72-hour kit and wildfire evacuation were not opened."],
      first: ["Call 112 in an emergency. SNS 24 is 808 24 24 24 for health advice.", "Keep a 72-hour kit.", "Join your village safety plan."],
      do: ["The EU Preparedness Union Strategy (March 2025) asks households to hold essentials for at least 72 hours.", "Aldeia Segura, Pessoas Seguras began in October 2017. Ask your Câmara Municipal if your village has an evacuation plan and a refuge.", "Keep a copy of each family member's Cartão de Cidadão, insurance, prescriptions and pet papers in a waterproof bag.", "Check insurance for earthquake and tsunami cover.", "Follow IPMA warnings and ANEPC notices."],
      warn: ["Open fires are restricted in high-risk periods. Check with your municipality.", "Heat kills more people than most hazards. Take hot days seriously."],
      tip: ["Know your uphill route if you live near the coast.", "Keep a mask for smoke."],
      after: ["Update your kit every six months.", "Check on neighbours after any event."]
    },
    {
      id: "wx-sodis", icon: "sun", area: "Water", difficulty: "Practical",
      title: "Sun disinfection of water (SODIS): a backup",
      intro: "Clear plastic bottles and strong sun can treat clear water. It is a backup, not a first choice.",
      status: "partly", checkedOn: CD,
      sources: [["Eawag SODIS information package", "https://susana.org/_resources/documents/default/2-395-sodis-info-pachage-eawag-en.pdf"]],
      unconfirmed: ["Some pages say the World Health Organization recommends SODIS. We did not verify that against a WHO document.", "Boil water if you can. Boiling is more reliable."],
      first: ["Use only clear water.", "Use clear, colourless PET plastic bottles.", "Use it only when you cannot boil or treat the water another way."],
      do: ["Pour the water through a clean cloth first. The water must be clear. You should be able to read a printed page through the bottle.", "Fill a clear PET bottle. Close it and shake it so the water has air in it.", "Lay the bottle on a bright, reflective surface in full sun.", "Leave it for about 6 hours in strong sun. In cloudy weather leave it for 2 days in a row.", "Drink from the bottle or pour into a clean cup. Keep it covered."],
      warn: ["Do not use scratched or old bottles. They block the sun.", "Sun does not remove chemicals or fuel.", "Do not use cloudy water. Strain or filter it first."],
      tip: ["Keep a few bottles for this in your kit.", "Wash the bottles with soap and safe water."],
      after: ["Store treated water in a clean, covered container.", "Use boiling or a filter as your main method."]
    },
    {
      id: "es-medical-kit", icon: "cross", area: "Medical", difficulty: "Essential",
      title: "First-aid kit and medicines",
      intro: "A good kit and a few days of medicines cover most small problems. Take a first-aid course.",
      status: "general", unconfirmed: GEN.concat(["Amounts of medicines to keep depend on your doctor."]),
      first: ["Keep the kit where you can reach it.", "Keep a written list of everyone's medicines.", "Take a first-aid course."],
      do: ["Add dressings, tape, gloves, scissors, tweezers and a thermometer.", "Add antiseptic wipes, pain relief and an antihistamine.", "Add oral rehydration salts for diarrhoea and vomiting.", "Keep at least 7 days of regular medicines, and 14 days if you can. Note any that must stay cold, such as insulin.", "Check dates every three months."],
      warn: ["A tourniquet needs training. See the Severe bleeding guide.", "Do not give medicine to children without checking the dose."],
      tip: ["Keep a small kit in the car and go-bag.", "Soap and water, or gel with at least 60% alcohol, are your first defence against illness."],
      after: ["Replace anything you used.", "Update the medicines list when it changes."]
    }
  ];
  var LISTS = [
    { id: 'kitlong', title: 'Longer-term kit (months)', items: ['Rain collection barrels or tanks with screens', 'Water filter and spare parts', 'Purification tablets and plain bleach', 'Bulk rice, beans, oats, flour, oil, salt and sugar', 'Seeds, tools and compost', 'Wood stove and dry wood, or another safe heat source', 'Portable solar panel and power station', 'Hand tools, spare screws, tape and cord', 'Soap, toothpaste and hygiene supplies for months', 'Medicines refilled and rotated', 'Books, games and paper for children', 'Paper maps and a hand-crank radio'] },
    { id: 'firstaid', title: 'First-aid kit', items: ['Dressings and gauze', 'Adhesive tape and bandages', 'Disposable gloves', 'Scissors and tweezers', 'Thermometer', 'Antiseptic wipes', 'Pain relief', 'Antihistamine', 'Oral rehydration salts', 'Personal medicines for 7 to 14 days', 'Written list of medicines and allergies', 'Emergency numbers card'] }
  ];
  if (window.LOAD_CORE && window.LOAD_CORE.lists) { window.LOAD_CORE.lists = window.LOAD_CORE.lists.concat(LISTS); }
  window.LOAD_SCENARIOS = G;
  if (window.LOAD_CORE) { window.LOAD_CORE.guides = window.LOAD_CORE.guides.concat(G); }
})();
