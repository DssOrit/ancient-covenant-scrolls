/* Limited-resources series, part 2: water, food, heat and cold, sanitation, communication and staying safe, with nothing stored.
   Facts come from the named sources, seen only through search results on 20 Oct 2026. Our own reasoning is labelled. */
(function () {
  var CD = "20 Oct 2026";
  var OWN = "Items marked 'our reasoning' are common-sense steps. They are not taken from a named source.";
  function g(o) {
    o.difficulty = o.difficulty || "Critical"; o.status = o.status || "partly"; o.checkedOn = CD;
    o.unconfirmed = (o.unconfirmed || []).concat([OWN]); o.tip = o.tip || []; o.after = o.after || []; o.warn = o.warn || [];
    o.sections = o.sections || []; o.sources = o.sources || []; o.source = (o.sources[0] && o.sources[0][1]) || "https://www.ready.gov/"; return o;
  }
  var CDCW = ["CDC: finding other sources of water in an emergency", "https://www.cdc.gov/water-emergency/about/how-to-find-clean-water-in-an-emergency.html"];
  var G = [
    g({
      id: "lim-water-none", area: "Water", icon: "drop", title: "Water with nothing stored: find it, treat it, make it last",
      intro: "If you have no stored water, you still have more than you think. Find the water already in your home, collect more, make every drop safe, and use it wisely.",
      first: ["Do not drink tap water if officials say it is unsafe.", "Fill clean containers, pots and the bathtub now, while water still runs.", "Find the hidden water in your home: water heater tank and clear toilet tank.", "Treat every source before you drink it."],
      do: [
        "Collect while it still runs. Fill every clean container, pot, kettle and bottle. Fill the bathtub for washing and flushing, not drinking, unless you cleaned it first. If officials warn of contaminated water, close the main water valve to your home to keep contaminants out of your pipes.",
        "Use the water already in your home. The tank of your water heater holds about 30 to 50 gallons. Shut off the power or gas, close the cold water inlet, then open the drain at the bottom and a hot tap upstairs. The tank water for toilets (not the bowl) is a source only if it is clear and has no cleaner tablets. Ice cubes and the water in sealed pipes are also sources. Do not use water from a waterbed, a pool or a spa for drinking.",
        "Find outside water. Rain, rivers, streams, ponds and springs can work if you treat them. Catch rain in clean containers or a clean tarp. Take river water from moving water, clear and upstream. Never use floodwater. Never use water that smells of fuel or chemicals, or has an oily shine.",
        "Make it safe. Strain cloudy water through a clean cloth, paper towel or coffee filter, or let it settle. Then boil it at a rolling boil for 1 minute (3 minutes above 6,500 ft or 2,000 m). Or use plain unscented bleach, 5 to 6 percent: 8 drops per gallon (3.8 L) of clear water, 16 drops if cloudy, stir and wait 30 minutes. A filter alone does not remove viruses. See the boil and filter guide.",
        "Store and ration smartly. Keep treated water in clean, covered containers with a label and date. Plan for 1 gallon (4 L) per person per day. Drink what you need. Save the washing water for cleaning. Sip often, rest in the shade, and drink less sugary or salty drink. Send the sickest, youngest and oldest the safest water first."
      ],
      table: { head: ["Source", "Drink it?", "How"], rows: [
        ["Tap water (if officials say safe)", "Yes", "Check alerts first"],
        ["Water heater tank", "Yes, after treating", "Drain from the bottom, then boil or bleach"],
        ["Toilet tank (not bowl), if clear", "Yes, after treating", "Boil or bleach"],
        ["Rain", "Yes, after treating", "Catch clean, strain, treat"],
        ["River, stream, pond", "Only after strain, filter and disinfect", "See the river guide"],
        ["Floodwater, sea water, urine", "Never", "Do not use"]
      ] },
      sections: [{ h: "Portugal notes", items: ["Your câmara or water company may send tankers or set up points after a long outage. Listen to the radio and ask neighbours.", "Boil or disinfect water in the same way as above."] }],
      warn: ["Never drink floodwater, seawater or urine.", "Do not use water that smells of fuel or chemicals.", "Boiling kills germs. It does not remove chemicals or salt.", "Do not turn the water heater on while it is empty."],
      tip: ["After you drain the heater, refill it and relight only when water runs.", "Keep a bottle of unscented bleach with the dropper."],
      after: ["Wash your hands and containers with safe water.", "Refill and store water as soon as you can."],
      sources: [CDCW, ["CDC emergency water: bleach doses", "https://www.cdc.gov/water-emergency/communication-resources/"], ["Alameda County: emergency drinking water handout", "https://www.acgov.org/ready/documents/EmergencyDrinkingWaterHandout.pdf"]],
      unconfirmed: ["CDC lists the water heater tank and clear toilet tank water as emergency sources. The tank size and draining steps come from a county handout seen in search results.", "The bleach doses and the boiling times match CDC text seen in search results. The pages were not opened directly.", "Ice cubes, pipes and the advice not to use waterbed, pool or spa water are from common emergency lists. We did not match them to a named page.", "The advice to give the sickest, youngest and oldest the safest water first is our reasoning."]
    }),
    g({
      id: "lim-food-none", area: "Food", icon: "can", title: "Food with nothing stored: eat in order and stretch it",
      intro: "You can get through days with little food. Eat the food that spoils first, use what is already in the house, and stretch it with simple, cheap staples.",
      first: ["Eat the food that spoils first: fridge, then freezer, then pantry.", "Keep the fridge and freezer shut as long as you can.", "Cook only outdoors on a camp stove or barbecue.", "Drink water. Water matters more than food for the first days."],
      do: [
        "Take stock. Write down everything you have: fridge, freezer, pantry, garden, pet food, snacks, drinks. Count meals. Share the list with the household. Do not throw food away until you check it.",
        "Eat in the right order. A fridge keeps food cold for about 4 hours if the door stays shut. A full freezer holds about 48 hours, a half-full one about 24 hours. Eat fridge food first, then freezer food as it thaws, then shelf-stable food. Cook thawed meat, poultry, fish and eggs thoroughly. Do not taste food to test it. Throw out perishable food that was above 40 F (4 C) for 4 hours or more.",
        "Cook without power. Use a camp stove, a barbecue or a safe fire pit outdoors only. Never cook with charcoal or a stove indoors. Canned food can be eaten cold. Boil water for oats, rice, noodles and soup. See the cook-without-power and the hardtack guides.",
        "Stretch what you have. Cheap staples go far: rice, dried beans, oats, flour, oil, salt, sugar and honey. Add fish if you can legally fish. Cook one pot for the household. Eat smaller meals, and eat protein and fat with carbohydrates. Give children, pregnant people and the sick first call on food.",
        "Get more. Ask neighbours and share. Buy staples early if shops open. Use cash. Gardens, eggs and fishing help over time. Do not eat wild plants or mushrooms unless an expert has confirmed them. See the long-term guides for gardens and preserving."
      ],
      table: { head: ["Cheap, long-lasting food", "Why"], rows: [
        ["Rice, dried beans, oats, flour", "Cheap, keep for years, fill you up"],
        ["Cooking oil, salt, sugar, honey", "Calories and flavour. Honey keeps almost for ever"],
        ["Canned fish, beans, vegetables", "No cooking, safe cold"],
        ["Peanut butter, dried fruit", "Fat and energy"],
        ["Eggs from a few hens", "Steady protein"]
      ] },
      sections: [{ h: "Portugal notes", items: ["Local markets, neighbours and small shops often stay open longer than big shops. Take cash.", "Check local rules before you fish or gather wild food."] }],
      warn: ["Do not eat perishable food that was above 40 F (4 C) for 4 hours or more.", "Do not cook indoors on a camp stove, grill or charcoal.", "Do not eat wild plants or mushrooms unless an expert confirms them.", "Do not share food that you are not sure is safe."],
      tip: ["Keep ice or frozen water bottles in the fridge to hold the cold longer.", "Use a thermometer in the fridge and freezer if you own one."],
      after: ["Throw out unsafe food. When in doubt, throw it out.", "Restock staples, one or two a week."],
      sources: [["USDA FSIS: keeping food safe in an emergency", "https://www.fsis.usda.gov/es/node/3347"], ["Ready.gov: build a kit", "https://www.ready.gov/kit"], ["Ready.gov: power outages", "https://www.ready.gov/power-outages"]],
      unconfirmed: ["The 4 hour, 48 hour and 24 hour times and the 40 F rule match USDA and county pages seen in search results. The FSIS page was not opened directly.", "We did not find official text on canned and pantry food in a power outage. Shelf-stable food is not damaged by an outage. That is our reasoning.", "The list of cheap staples, the one-pot cooking and the sharing advice are our reasoning."]
    }),
    g({
      id: "lim-heat-cold", area: "Shelter", icon: "tent", title: "Heat and cold without power: stay safe in one room",
      intro: "Without power you cannot run heating or cooling. Pick one room, manage body heat and watch for danger signs. Never use fuel burners indoors.",
      first: ["Pick one small interior room and live there.", "Never use a gas oven, stove, grill, charcoal or generator indoors.", "Have a battery carbon monoxide alarm.", "If it is extreme, go to a community warming or cooling centre."],
      do: [
        "Pick your room. Choose a small, interior room with few windows. Close doors to other rooms. In cold, cover windows and gaps with blankets or towels. In heat, pick the coolest room, usually the lowest floor away from the sun.",
        "In the cold: layer up. Wear several loose, dry layers, a hat, gloves and warm socks. Put blankets and sleeping bags on beds. Sit and sleep together under covers. Eat and drink warm food and drinks. Move often to make heat. Keep clothes and bedding dry. Change out of wet clothes at once.",
        "In the heat: stay cool. Stay in shade and on low floors. Open windows at night if it is safe, close them and the curtains by day. Wear light, loose clothing. Wet a cloth and put it on your neck and wrists. Drink water often. Do not do hard work in the hottest hours. See the heat illness guide.",
        "Watch for danger signs. In cold: shivering that will not stop, confusion, slurred speech, fumbling hands, drowsiness. Below 95 F (35 C) is an emergency. Move the person to shelter, take off wet clothes, warm the chest, neck, head and groin first with dry layers and skin-to-skin contact. Give warm drinks if awake, no alcohol. Do not rub the arms and legs. In heat: very hot skin, confusion, fainting, no sweating. Cool the person quickly and call emergency services.",
        "Know when to move. Go to a community warming or cooling centre if the heat or cold is extreme, if there are babies, older people or sick people, or if your room cannot hold safe temperature. Keep babies at room temperature, about 68 to 72 F (20 to 22 C), and well dressed."
      ],
      table: { head: ["Danger", "Signs", "Do"], rows: [
        ["Hypothermia", "Shivering, confusion, slurred speech, drowsy", "Shelter, dry layers, warm the body core, call help"],
        ["Heat illness", "Hot skin, confusion, fainting", "Cool quickly, water, call help"],
        ["Carbon monoxide", "Headache, dizziness, nausea, drowsy", "Get to fresh air, call help"]
      ] },
      sections: [{ h: "Portugal notes", items: ["Check with your câmara for warming or cooling centres in a long outage.", "A wood heat-recovery stove (recuperador) keeps working in a power cut. A pellet stove does not. This is our reasoning."] }],
      warn: ["Never use a gas oven, gas stove, barbecue, charcoal grill, camp stove or generator inside a home. Carbon monoxide can kill. Use these outdoors, at least 20 feet (6 m) from windows.", "Do not use candles or heaters near bedding.", "Do not give alcohol to a cold person.", "Babies and older people lose or gain heat fast. Check them often."],
      tip: ["Keep a battery carbon monoxide alarm in the main living area.", "Keep a sleeping bag for each person."],
      after: ["Warm up slowly and keep dry.", "Check everyone for frostbite or heat illness."],
      sources: [["Ready.gov: power outages", "https://www.ready.gov/power-outages"], ["CDC: prevent carbon monoxide poisoning", "https://www.cdc.gov/natural-disasters/psa-toolkit/prevent-carbon-monoxide-poisoning.html"], ["CDC cold weather tips (reprinted on a health system site)", "https://www.fhn.org/hypothermia.asp"]],
      unconfirmed: ["The carbon monoxide and 20 foot generator advice match Ready.gov text seen in search results. The page was not opened directly.", "The hypothermia signs, the 95 F limit, warming the core first and not rubbing limbs come from CDC and Mayo advice reprinted by news and local sites. We did not open CDC.gov.", "The baby room temperature of 68 to 72 F is from the same reprint.", "The one-room plan, the window blankets and the heat steps are our reasoning and common advice. We did not match them to a named page.", "The recuperador note is our reasoning."]
    }),
    g({
      id: "lim-sanitation", area: "Essentials", icon: "toilet", title: "Sanitation with no running water: toilet, hands and waste",
      intro: "Waste and dirty hands spread disease fast when water stops. A bucket toilet, covered waste and handwashing keep your household healthy.",
      first: ["Stop flushing if water pressure is out or the sewer may be blocked.", "Set up a bucket toilet with a bag and an absorbent.", "Wash hands with soap and safe water after every toilet use and before food.", "Keep waste away from food, water and children."],
      do: [
        "Set up the toilet. Use a sturdy bucket with a lid, or line a toilet bowl you cannot flush. Put in a strong plastic bag. Put a seat or a board on top if you can. Put it in a private place away from where you eat and sleep, and away from your water.",
        "Cover every use. After each use, cover the waste with an absorbent: kitty litter, sawdust, wood shavings, shredded paper, peat moss, bark chips or a little bleach or lime. This controls smell and flies and dries the waste. Add a lid.",
        "Empty safely. Do not fill the bucket more than half. Tie the bag tightly. Put it in a second bag. Store it in a covered bin away from children and animals, until it can be collected or properly disposed. Do not put human waste in storm drains, streams or near wells or gardens that grow food.",
        "Wash hands every time. Wash with soap and safe water after the toilet, after changing a baby, before cooking or eating, and after handling waste. If you have no water, use hand sanitizer with at least 60 percent alcohol. It does not work on visibly dirty hands. Keep a small bucket with a tap or a bottle with a hole for handwashing.",
        "Handle the rest. Put rubbish in sealed bags. Keep a separate bucket for a sick person. Clean the bucket and surfaces with a bleach solution. Pack period products, nappies and wipes in sealed bags, not in the toilet. Use treated water for brushing teeth."
      ],
      table: { head: ["Material", "Use"], rows: [
        ["Strong plastic bags (heavy duty)", "Lining the bucket, double-bagging"],
        ["Kitty litter, sawdust, shredded paper, bark", "Cover after each use"],
        ["Bleach or lime", "Odour and disinfection (follow the pack)"],
        ["Soap and safe water", "Hand washing"],
        ["Hand sanitizer, at least 60 percent alcohol", "Only if hands are not visibly dirty"]
      ] },
      sections: [{ h: "Portugal notes", items: ["Ask your câmara or your building manager how rubbish and waste will be collected in a long outage.", "Do not use public water sources for toilets or washing if officials say water is unsafe."] }],
      warn: ["Do not put waste in storm drains, streams or near wells.", "Do not leave waste open. It spreads disease and attracts flies and rodents.", "Hand sanitizer does not clean dirty hands. Wash with soap and water if you can.", "Do not use human waste on food gardens."],
      tip: ["Keep two buckets: one for waste, one for a spare.", "Store extra garbage bags, litter and soap before a crisis."],
      after: ["Wash the bucket and your hands.", "Follow local rules for disposal when services return."],
      sources: [["NCDHHS: toilet use during an emergency", "https://www.ncdhhs.gov/toilet-use-during-emergency/open"], ["Washington County (Oregon): disaster sanitation", "https://www.washingtoncountyor.gov/take5/disaster-sanitation"], ["CDC: potential sanitation solutions during an emergency response", "https://www.cdc.gov/healthywater/global/sanitation/sanitation-emergency-response.html"], ["Loma Linda University: emergency sanitation", "https://llu.edu/campus-spiritual-life/emergency/emergency-sanitation"]],
      unconfirmed: ["The bucket and bag method, absorbents, the half-full limit and double-bagging come from state and county pages seen in search results (NCDHHS, Washington County). The CDC page seen covered only chemical toilets. No CDC page for the bucket method was found.", "The 60 percent alcohol rule and boiling questionable water for hygiene come from a university page.", "The advice not to use storm drains or food gardens comes from a local NET article seen in search results.", "The bleach cleaning and separate bucket for a sick person are common advice and our reasoning."]
    }),
    g({
      id: "lim-comms", area: "Essentials", icon: "radio", title: "Communication with no phone or internet",
      intro: "Phone networks fail or jam in a crisis. Plan how your family will find each other, get news and call for help before it happens.",
      first: ["Send a short text instead of calling. Texts often get through when calls fail.", "Pick an out-of-town contact everyone can reach.", "Pick two meeting places.", "Turn on a battery radio for official news.", "Save power: low-power mode and airplane mode."],
      do: [
        "Make the plan on paper. Write the phone numbers of each family member, the out-of-town contact, doctors, school or work, and emergency numbers. Save an ICE (in case of emergency) contact in each phone. Keep a paper copy in every bag.",
        "Choose the contact and meeting places. Pick someone outside your area as the family's central contact. Long-distance calls can work when local lines are jammed. Pick one meeting place near home and one outside your neighbourhood or town. Practise getting there and how each person would travel.",
        "Use texts and short messages. In a crisis send a text before you call. Keep messages short: 'I am OK. At home.' Decide who sends updates about meeting places. Practise group texting. Keep calls short to leave lines free for emergencies.",
        "Get news without the internet. Use a battery or hand-crank radio. Listen to the official emergency station. Sign up for local alerts before a crisis. A car radio works if you have fuel. Write down what you hear and the time.",
        "Signal and connect locally. Use a whistle (three blasts for help), a flashlight or bright cloth. Knock on neighbours' doors. Agree a signal with neighbours, such as a cloth in the window for 'we need help'. A ham radio or walkie-talkies can reach neighbours or nearby groups."
      ],
      table: { head: ["Method", "Works when", "Limits"], rows: [
        ["Text message", "Networks are busy, but not down", "May be delayed"],
        ["Voice call", "Networks are working", "Jams quickly"],
        ["Out-of-town contact", "Local lines are jammed", "Everyone must know the number"],
        ["Battery or crank radio", "Power and internet are out", "One-way. Needs batteries or a crank"],
        ["Whistle, light, cloth", "Anything fails", "Short range"],
        ["Meeting place on paper", "All phones fail", "Practise it first"]
      ] },
      sections: [{ h: "Portugal notes", items: ["Call 112 for emergencies.", "During the April 2025 blackout, mobile and fixed networks failed in a chain, according to a government report. The Proteção Civil sent text messages asking for calm. A radio was the main source of news.", "Keep a battery radio and paper phone numbers."] }],
      warn: ["Do not rely on your phone alone. Batteries die and networks fail.", "Do not spread rumours. Share only what officials say.", "Do not give your location or plans to strangers online."],
      tip: ["Practise the plan once a year.", "Keep a power bank charged and a spare cable."],
      after: ["Update the plan after every crisis.", "Tell everyone when the plan changes."],
      sources: [["FEMA family communication plan (copy on nj.gov)", "https://www.nj.gov/njoem/plan-prepare/pdf/FEMA_family_communication_plan.pdf"], ["Ready.gov: make a plan", "https://www.ready.gov/plan"], ["Portugal government: ANACOM, ANAC and IMT reports on the 2025 blackout", "https://portugal.gov.pt/gc25/comunicacao/noticias/anac-anacom-e-imt-entregam-relatorios-e-recomendacoes-sobre-impacto-do-apagao-eletrico"]],
      unconfirmed: ["The text-before-call, out-of-town contact, two meeting places and ICE advice come from copies of the FEMA plan on state and local sites (2015 to 2019). We did not open the current Ready.gov page.", "The 2025 blackout network failure comes from a Portuguese government news item seen in search results. The SMS from Proteção Civil comes from a news report.", "The window signal, the whistle three blasts and the neighbour agreement are common advice and our reasoning."]
    }),
    g({
      id: "lim-stay-safe", area: "Security", icon: "shield", title: "Stay safe during a long outage or crisis",
      intro: "In a long crisis, most danger comes from fire, carbon monoxide, cold, heat, accidents, bad information and stress. Keep calm, look after neighbours and avoid risks.",
      first: ["Get official information from a radio or local authorities.", "Check on neighbours, older people and anyone alone.", "Keep doors locked. Avoid crowds and risky places.", "Avoid floodwater and downed power lines.", "Know your trigger to leave."],
      do: [
        "Stay informed. Use a battery radio and official alerts. Ignore rumours. Write down what you hear. Decide each day if it is safe to stay.",
        "Stop fire and gas dangers. Use flashlights, not candles. If you must use a candle, put it in a holder on a flat surface, away from anything that burns, and never leave it alone. Keep a fire extinguisher. Know how to turn off water, gas and power at the main. Do not use fuel burners indoors.",
        "Look after each other. Check on neighbours every day, especially older people, sick people and anyone alone. Share tasks, tools and food fairly. Agree a signal for help. Keep a list of who needs what.",
        "Reduce risk outside. Travel in daylight and in a group. Keep to main roads. Avoid crowds, fences, and unlit places. Stay away from downed power lines and treat them as live. Do not drive or walk through floodwater. Do not display your supplies. Be wary of scams and strangers who ask for money or details.",
        "Look after your mind. Keep a routine. Sleep, eat and wash. Talk to family. Limit news. Give children a job and a game. Watch for signs of stress, and seek help for yourself or others if you feel unsafe or overwhelmed."
      ],
      sections: [
        { h: "Know your trigger to leave", items: ["An official order to evacuate.", "No safe water for 3 days or more.", "No way to stay warm or cool.", "Fire, smoke or gas smell.", "A medical need you cannot meet.", "Violence or threat near you. See the civil unrest guide."] },
        { h: "Related guides in this app", items: ["Civil unrest or trouble nearby", "Evacuate: grab and go", "Home fire safety", "Heat and cold without power", "Communication with no phone or internet"] }
      ],
      warn: ["Never use candles unattended.", "Never touch a downed power line or anything touching it.", "Do not walk or drive through floodwater.", "Do not confront looters or threatening people. Move away and call for help."],
      tip: ["Keep a flashlight within reach of every bed.", "Agree a plan for who does what each day."],
      after: ["Check yourself and others for injuries and stress.", "Report damage and hazards to the authorities."],
      sources: [["Ready.gov: power outages", "https://www.ready.gov/power-outages"], ["Ready.gov: evacuation", "https://ready.gov/evacuation"]],
      unconfirmed: ["The generator, candle and carbon monoxide advice matches Ready.gov text seen in search results. The page was not opened directly.", "The rest of this guide (checking neighbours, travelling in groups, daylight, not showing supplies, routine and stress care, downed lines treated as live) is common emergency advice and our reasoning. We did not match it to a named page."],
      status: "general"
    })
  ];
  window.LOAD_LIMITED2 = G;
  if (window.LOAD_CORE) { window.LOAD_CORE.guides = window.LOAD_CORE.guides.concat(G); }
})();
