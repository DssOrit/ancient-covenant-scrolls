/* Start-to-finish guides for people with limited resources: no solar panels, no generator, no stored fuel.
   Facts come from the named sources. Search checks on 20 Oct 2026 saw official pages only through search results or copies on
   state and county sites, so most guides are "partly checked". Anything that is our own reasoning is labelled as such. */
(function () {
  var CD = "20 Oct 2026";
  var OWN = "Items marked 'our reasoning' are common-sense steps. They are not taken from a named source.";
  function g(o) {
    o.area = "Scenarios"; o.difficulty = o.difficulty || "Critical"; o.status = o.status || "partly"; o.checkedOn = CD;
    o.unconfirmed = (o.unconfirmed || []).concat([OWN]); o.tip = o.tip || []; o.after = o.after || []; o.warn = o.warn || [];
    o.sections = o.sections || []; o.sources = o.sources || []; o.source = (o.sources[0] && o.sources[0][1]) || "https://www.ready.gov/"; return o;
  }
  var G = [
    g({
      id: "lim-power-outage", icon: "bolt", title: "Power grid outage with no solar or generator: start to finish",
      intro: "You do not need solar panels or a generator to get through a blackout. This guide goes from the first minute, to the first day, to the first week and beyond, using only what most homes already have.",
      first: [
        "Stay calm. Check if the whole street is dark or only your home. Look at your breaker panel. If neighbours are dark too, it is a grid outage.",
        "Use a flashlight, not candles. Candles start fires.",
        "Keep the fridge and freezer doors closed.",
        "Unplug appliances and electronics, so a surge does not damage them when power returns.",
        "Check on anyone who uses a medical device that needs electricity, and on older neighbours."
      ],
      do: [
        "First 10 minutes: find out what is happening. Check your breakers and your street. Call or text your power company on a phone that still works. Switch on a battery radio, or a car radio, for official news. Turn off and unplug large appliances, TVs and computers. Leave one lamp switch on so you notice when power returns. Put your phone on low-power mode and lower its brightness. Put a flashlight in each room you use.",
        "First 4 hours: protect food, water and warmth. Do not open the fridge. An unopened fridge keeps food cold for about 4 hours, a full freezer about 48 hours, and a half-full freezer about 24 hours. Put an appliance thermometer in each if you own one. Fill clean containers, pots and the bathtub with tap water now, while water still runs, for flushing and washing. Put on layers. Decide which one room you will live in. Agree a meeting place and a message plan with family in case phones fail.",
        "Day 1 to 2: eat in order and stay safe. Eat from the fridge first, then the freezer, then the pantry. After 4 hours, move fridge food into a cooler packed with ice or frozen packs if you have them. Cook only on a camp stove or barbecue outdoors, never indoors. Never burn charcoal, run a generator or use a gas oven or stove to heat the home, because carbon monoxide can kill. Use a bucket and a plastic bag as a toilet if water stops. Use water heater tank water and clear toilet tank water (not the bowl) only after you treat it. Keep your car fuel above half.",
        "Days 3 to 7: set a daily routine and manage your limits. Eat, wash hands and rest at set times. Use daylight for chores and sleep early to save light and phone power. Charge your phone only when you need it, in the car if you have fuel, and keep it in airplane mode otherwise. Check on neighbours each day. Share tasks and tools. Keep waste in sealed bags outside. Write down what is running low. Decide in advance what would make you leave: no safe water, no safe heat, a medical need, or an official order.",
        "Power returns, or it does not: plan the next step. When power returns, wait a few minutes, then plug in the fridge and key items one at a time. Check food: throw away perishable food that was above 40 F (4 C) for 4 hours or more. If the outage passes a week, join forces with neighbours, share one heated room if it is cold, and move to a long-term plan: water, food, sanitation, heat and a way to get news. See the long-term guides in this app."
      ],
      table: { head: ["When", "Do this", "Watch for"], rows: [
        ["0 to 10 minutes", "Check breakers and street. Flashlight on. Unplug appliances.", "Candles. Panic buying. Elevators."],
        ["10 minutes to 4 hours", "Keep fridge shut. Fill containers. Get news on radio.", "Cold or heat building up."],
        ["4 to 24 hours", "Eat fridge food first. Use cooler and ice. Plan one warm room.", "Food above 40 F (4 C) for 4 hours or more."],
        ["Day 2 to 3", "Switch to freezer and pantry. Water from stored sources. Bucket toilet if needed.", "Carbon monoxide. Dirty hands. Low phone power."],
        ["Day 4 to 7", "Daily routine. Check neighbours. Count supplies. Decide what would make you leave.", "Medicine running out. Fatigue. Safety."],
        ["Week 2 and beyond", "Pool with neighbours. Plan water, food, heat and sanitation for weeks.", "Official orders. Health. Fuel and supplies."]
      ] },
      sections: [
        { h: "No solar, no generator: what to use instead", items: [
          "Light: LED flashlights and headlamps with spare batteries. A flashlight is safer than a candle.",
          "News: a battery or hand-crank radio. Keep fresh batteries. Car radios work if you have fuel.",
          "Phone power: low-power mode, airplane mode, lower brightness. Keep one charged power bank for emergencies.",
          "Cooking: a camp stove or barbecue used outdoors with fuel you already own. A gas stove may still light with a match, but never use it for heat.",
          "Heat: layers, blankets, a sleeping bag and one small room that is closed off. Do not use a gas oven, charcoal or a camp stove indoors.",
          "Cooling: shade, open windows at night, wet cloths, drink water. Stay on the lowest floor.",
          "Water: stored water, then water heater tank and clear toilet tank water. Treat before drinking."
        ] },
        { h: "People who need extra care", items: [
          "Anyone using a medical device that needs electricity: talk to your doctor now about a backup plan. If devices fail, call emergency services.",
          "Medicines that need refrigeration: ask your pharmacist how long they stay safe unrefrigerated.",
          "Babies, older adults and anyone ill: heat and cold hurt faster. Check them often.",
          "Pets need water and shade or warmth too."
        ] },
        { h: "When to leave your home", items: [
          "An official evacuation order.",
          "No safe water for 3 days or more.",
          "No way to stay warm in cold weather, or cool in extreme heat.",
          "A medical need you cannot meet at home.",
          "Fire, smoke, gas smell or structural damage.",
          "See the Evacuate guide in this app for packing and routes."
        ] },
        { h: "Portugal notes", items: [
          "In the April 2025 blackout, mobile and fixed networks failed in a chain, and more than 400 reports of people stuck in elevators were made. Avoid elevators during an outage and use stairs.",
          "Hospitals had low generator fuel within hours. Do not go to hospital unless it is truly urgent.",
          "Call 112 for emergencies. Listen for Proteção Civil messages on radio. The Proteção Civil sent SMS messages during the 2025 blackout.",
          "Keep cash. Multibanco machines and card terminals may not work."
        ] }
      ],
      warn: [
        "Never use a generator, charcoal grill, camp stove, gas oven or gas stove to heat the inside of a home. Carbon monoxide poisoning can kill within minutes. Use a battery carbon monoxide alarm.",
        "Do not use candles near curtains, bedding or children. Use flashlights.",
        "Do not open the fridge to check. Every opening costs cold.",
        "Do not eat food that was above 40 F (4 C) for 4 hours or more. You cannot judge by smell or look. When in doubt, throw it out.",
        "Do not use water if it is cloudy, smells, or may hold fuel or chemicals. Do not drink from the toilet bowl."
      ],
      tip: [
        "Freeze water bottles or gel packs before an outage. They keep the fridge and cooler cold. A full freezer stays cold longer.",
        "Put a coin on a frozen cup of ice in the freezer. If the coin is at the bottom after the outage, the food thawed. This is our reasoning, not a source.",
        "Keep a paper list of phone numbers and a family meeting place.",
        "Keep cash in small bills."
      ],
      after: [
        "Plug appliances back in one at a time after a few minutes.",
        "Check food against the 4-hour rule and throw away what is unsafe.",
        "Restock batteries, water, fuel and food. Write down what ran short.",
        "Tell neighbours what worked. Plan together for next time."
      ],
      sources: [["Ready.gov: power outages", "https://www.ready.gov/power-outages"], ["USDA FSIS: keeping food safe in an emergency", "https://www.fsis.usda.gov/es/node/3347"], ["CDC: finding other sources of water in an emergency", "https://www.cdc.gov/water-emergency/about/how-to-find-clean-water-in-an-emergency.html"], ["CDC: prevent carbon monoxide poisoning", "https://www.cdc.gov/natural-disasters/psa-toolkit/prevent-carbon-monoxide-poisoning.html"]],
      unconfirmed: [
        "Fridge about 4 hours, full freezer about 48 hours, half-full about 24 hours, and gas stoves not for heat, match USDA and FEMA text seen in search results and copies on county and state sites. The Ready.gov and FSIS pages were not opened directly.",
        "The 40 F (4 C) limit for 4 hours matches the copies we saw. Our earlier note on this in the power outage guide shows a different 2-hour rule. Check the current FSIS page.",
        "CDC lists the water heater tank and clear toilet tank water (not the bowl) as emergency sources. Treat the water before you drink it.",
        "Portugal details (400 elevator reports, hospital fuel, SMS messages) come from news reports on the 28 April 2025 blackout, not from an official Proteção Civil guide. Official ANEPC advice was not found in search results.",
        "The coin trick, the one-room heat plan and the neighbour-sharing advice are our reasoning."
      ]
    }),
    g({
      id: "lim-banks-down", icon: "can", title: "Banks, ATMs and card payments down: start to finish",
      intro: "A cyberattack, a power cut or a bank failure can stop cards, cash machines and online banking. This guide shows what to do in the first hour, first day, first week and first month, and what protects your money.",
      first: [
        "Do not panic. Try your card once at another shop or machine. If it fails, stop trying, so your card is not blocked or kept.",
        "Count the cash you have and write it down.",
        "List your essentials: food, water, medicine, fuel, shelter. Buy those first.",
        "Keep your card, ID and account numbers safe. Do not give details to anyone who calls you.",
        "Listen to a battery radio for official news on how long it will last."
      ],
      do: [
        "First hour: confirm and count. Ask who else has the problem: neighbours, shops, a second bank. Check a radio or a TV on battery for official news. Try a different card or machine once. Do not enter your PIN again and again, as the machine may keep your card. Count your cash and write it down. Do not rush to the bank or to a crowd. Do not post about it online. Tell your family where you are.",
        "Day 1: spend on essentials first. Buy food, water, medicine and fuel before anything else. Pay in small bills when you can, because shops may have no change. Ask shops whether they take cash only. Keep receipts. Carry only what you need for the day, and keep the rest hidden at home. Make a daily cash budget. Do not lend or show large amounts of cash.",
        "Days 2 to 7: protect yourself from scams and manage bills. Expect scam calls and messages that claim to be your bank, the police or an official asking for your PIN, a transfer or gift cards. Hang up. Call your bank back on the number printed on your card or your statement, when lines work. Write down what you owe and when it is due. Contact your landlord, lender or utility to explain. Keep a record of every call. Share and trade with neighbours fairly and safely. Do not hand over your bank details to anyone.",
        "Weeks 2 to 4: use your protections and prepare for banks reopening. In the United States, FDIC insurance covers up to 250,000 dollars per depositor, per insured bank, per ownership category. In Portugal, the Fundo de Garantia de Depósitos covers up to 100,000 euros per depositor, per bank. Deposits do not vanish when a bank has an outage. When banks reopen, expect queues, limits and slow systems. Go in the morning, take ID and account details, and ask for a written record of any request. Check your balance and your transactions for errors.",
        "After: rebuild and prepare for next time. Keep a cash reserve in small bills in a safe place at home. Spread money over two banks if you can. Keep paper copies of account numbers, insurance papers and key phone numbers, stored in a waterproof pouch. Keep a buffer of money for bills that auto-pay. Make a list of what you spent, and what you wished you had bought earlier."
      ],
      table: { head: ["When", "Do this", "Avoid"], rows: [
        ["First hour", "Try once, count cash, listen to radio.", "Repeating PIN. Crowding at a bank."],
        ["Day 1", "Buy food, water, medicine, fuel. Small bills.", "Showing cash. Large purchases."],
        ["Days 2 to 7", "Daily budget. Call creditors. Watch for scams.", "Giving details to callers."],
        ["Weeks 2 to 4", "Use insurance protections. Visit bank when open.", "Believing rumours about lost deposits."],
        ["After", "Cash reserve, two banks, paper records.", "Keeping all money in one place."]
      ] },
      sections: [
        { h: "How much cash to keep", items: [
          "Ready.gov advises keeping a small amount of cash at home in a safe place, in small bills, because ATMs and cards may not work in a disaster.",
          "The Banco de Portugal recommended in November 2025 that people keep some physical cash at home. It did not give an amount.",
          "One example from another country: the Dutch central bank suggests 70 euros per adult and 30 euros per child. This is an example from a news article, not a rule for you.",
          "Our reasoning: enough for 3 to 7 days of food, water and fuel for your household."
        ] },
        { h: "Paper records to keep", items: [
          "Bank names, account numbers and phone numbers.",
          "Insurance policy numbers and agent phone numbers.",
          "Loan and rent details.",
          "Medical insurance and prescription lists.",
          "FEMA and Operation HOPE publish an Emergency Financial First Aid Kit, a free guide to gathering these records. Find it at ready.gov/financial-preparedness."
        ] },
        { h: "What does not work in an outage", items: [
          "Contactless and chip card terminals, if the network is down.",
          "Cash machines, if they have no power or no connection.",
          "Online banking and bank apps.",
          "Phone calls to the bank, if the lines are busy or down."
        ] },
        { h: "Portugal notes", items: [
          "After the 28 April 2025 blackout, a large share of cash machines stopped working.",
          "The Banco de Portugal estimates about 570,000 people live more than 5 km from a cash point. Know where your nearest one is, and keep cash.",
          "If Multibanco keeps your card, contact your bank. Complaints can go to the Banco de Portugal or DECO Proteste.",
          "Cash is still the dominant payment at shops in Portugal, about 54 percent of operations, according to a news report."
        ] }
      ],
      warn: [
        "Never give your PIN, card number or online banking code to a caller. Banks do not ask for them.",
        "Do not send money, buy gift cards or transfer funds to a stranger who says your account is at risk.",
        "Do not keep large sums of cash in plain sight or tell people where it is.",
        "Do not believe rumours that your deposits are gone. Check official sources and your bank.",
        "Do not use a cash machine that looks tampered with."
      ],
      tip: [
        "Keep cash in small bills and coins. Shops may not have change.",
        "Keep a pen and notebook for a cash log.",
        "Pay important bills early when you can."
      ],
      after: [
        "Check every transaction once banks reopen. Report errors in writing.",
        "Rebuild your cash reserve and your supplies.",
        "Write down what worked and what did not."
      ],
      sources: [["Ready.gov: financial preparedness", "https://ready.gov/financial-preparedness"], ["Banco de Portugal: deposit guarantee FAQ", "https://clientebancario.bportugal.pt/en/deposit-guarantee"], ["Fundo de Garantia de Depósitos: FAQ", "https://www.fgd.pt/en/faqs"], ["FDIC: deposit insurance", "https://www.fdic.gov/resources/deposit-insurance/"]],
      unconfirmed: [
        "Ready.gov advice on cash in small bills was seen in a search result for its financial preparedness page. The page was not opened directly.",
        "The 250,000 dollar FDIC limit was confirmed only through bank and college pages and a trade article, not the FDIC site. Check fdic.gov.",
        "The 100,000 euro Portuguese limit and the repayment times (10,000 euros within 7 business days, the rest within 15) come from the Banco de Portugal and FGD pages seen in search results.",
        "The Banco de Portugal cash recommendation, the 570,000 figure and the 54 percent figure come from news articles. The Banco de Portugal pages were not found.",
        "The Dutch 70 and 30 euro figures come from one news article. They are not a recommendation for you.",
        "The advice not to repeat a wrong PIN is common bank advice. We did not find it on an official page.",
        "The guide does not give legal advice. For a bank failure or a dispute, ask your bank or your regulator."
      ]
    }),
    g({
      id: "lim-city-event", icon: "globe", title: "Something happens to a big city: stay or leave, start to finish",
      intro: "A large event in a major city can stop power, water, phones, transport and shops at once. This guide shows how to decide, what to do in the first minutes and the first day, and how to leave safely with little.",
      first: [
        "Get information. Use a battery radio, official alerts and your local authorities. Do not trust rumours or social media alone.",
        "Move away from windows, glass, crowds and tall buildings if shaking, smoke, or noise is near.",
        "Call or text family briefly: say where you are and that you are safe. Keep calls short.",
        "Follow official instructions to stay in or to leave. If there are none, use common sense.",
        "Fill containers with tap water now if water still runs."
      ],
      do: [
        "First 10 minutes: get facts and protect yourself. Move to the safest spot in your building, away from glass and outside walls. Turn on a battery radio. Check official alerts. Text family: where you are, that you are safe. Do not use the elevator. Use the stairs. If you smell smoke or gas, or the building is damaged, leave at once. If the event is chemical, radiation or smoke, follow the matching guide in this app.",
        "First 24 hours: decide to stay or to leave. Officials often tell people to shelter in place or to evacuate. If told to stay, stay indoors, close windows and doors, and listen for updates. If told to leave, go. If there is no instruction, stay if your home is safe and you have water, food and a way to stay warm or cool. Leave if your building is damaged, there is fire or smoke, or you have no safe water. Fill the bathtub and containers. Use the water heater tank and clear toilet tank water if tap water stops. Treat it before drinking.",
        "Prepare to leave: pack a small bag. Pack water, food, medicine, a flashlight, a radio, a phone and power bank, a map, cash in small bills, warm clothes, sturdy shoes, a copy of key documents in a waterproof bag, and a first-aid kit. Fuel: keep a car at least half full. Gas stations may be closed or unable to pump without power. Plan several routes and several destinations in different directions. Take one car per family to limit traffic. Tell someone where you are going.",
        "Leaving the city: move early and follow official routes. Leave early, before roads jam. Use official evacuation routes and do not take shortcuts that may be blocked. Do not rely only on your phone or GPS, as apps may not show closures. If you walk, go in a group, keep to main roads and sidewalks, carry water, rest often, and avoid crowds and fences you cannot get through. If you take public transport, expect delays and check the radio. Keep your bag close and your phone in power-saving mode.",
        "Arriving and after: stay safe and stay in touch. Go to the shelter or the place you chose. Register at shelters so family can find you. Keep your phone for brief messages. Do not go back until officials say it is safe. Get medical help for injuries and for medicine you need. Wash hands often. Keep a record of costs and damage for insurance."
      ],
      table: { head: ["Choice", "Stay if", "Leave if"], rows: [
        ["Home", "Home is safe, water and food last, officials say stay.", "Home is damaged, fire or smoke, officials say leave."],
        ["Water", "You have stored water or a source you can treat.", "No safe water for 3 days or more."],
        ["Heat or cold", "You can stay warm or cool in one room.", "No safe way to stay warm or cool."],
        ["Health", "Everyone is well and you have medicine.", "A medical need you cannot meet."],
        ["Safety", "Streets are calm and officials say stay.", "Crowds, violence or an order to go."]
      ] },
      sections: [
        { h: "Before you go: go-bag list", items: [
          "Water for at least 3 days and a way to treat more.",
          "Food that needs no cooking.",
          "Prescription medicines for at least a week and a first-aid kit.",
          "Flashlight, spare batteries, battery or crank radio, power bank, charging cables.",
          "Cash in small bills.",
          "Copies of ID, insurance and key phone numbers in a waterproof pouch.",
          "Warm clothes, rain jacket, sturdy shoes, a hat.",
          "A paper map of your area and the routes out."
        ] },
        { h: "If you cannot leave", items: [
          "Stay inside, away from windows. Seal gaps if told to shelter from smoke or chemicals.",
          "Make a plan for water, a bucket toilet and food.",
          "Check on neighbours who may need help.",
          "Keep listening to the radio for updates."
        ] },
        { h: "Portugal notes", items: [
          "Call 112 for emergencies. Follow messages from Proteção Civil (ANEPC).",
          "The Proteção Civil and the European Union ask households to prepare to cope for at least 3 days without outside help.",
          "In the April 2025 blackout, trains, metro and phone networks stopped. Plan to walk, and avoid elevators."
        ] }
      ],
      warn: [
        "Do not drive into a crowd, a flooded road or a closed route.",
        "Do not use the elevator in a blackout, shaking or fire.",
        "Do not spread rumours. Share only what officials say.",
        "Do not return home until officials say it is safe.",
        "Do not leave children, older adults or ill people behind or alone."
      ],
      tip: [
        "Practise your route out of the city now, in daylight.",
        "Agree on two meeting points with family: one near home and one outside the city.",
        "Keep half a tank of fuel in the car at all times."
      ],
      after: [
        "Let family know where you are.",
        "Take care of your health. Rest, drink safe water and eat.",
        "Write down what you learned. Update your go-bag and your plan."
      ],
      sources: [["Ready.gov: evacuation", "https://ready.gov/evacuation"], ["Ready.gov: power outages", "https://www.ready.gov/power-outages"], ["CDC: finding other sources of water in an emergency", "https://www.cdc.gov/water-emergency/about/how-to-find-clean-water-in-an-emergency.html"]],
      unconfirmed: [
        "Ready.gov advice on a half-full fuel tank, one car per family, several routes and leaving early was seen in a search summary of the evacuation page. The page was not opened directly.",
        "We did not find an official page for shelter in place after a large city event. A large city event is not one hazard. Follow the guide for the actual hazard: radiation, chemical, volcano, earthquake, cyber, civil unrest or war.",
        "Advice on walking out of a city (groups, main roads, resting) is general and our reasoning, not from a named source.",
        "Portugal: the 3-day preparation advice comes from news reports on ANEPC and EU guidance. The official ANEPC pages were not found.",
        "The 3-day no-water trigger to leave is our reasoning."
      ]
    })
  ];
  window.LOAD_LIMITED = G;
  if (window.LOAD_CORE) { window.LOAD_CORE.guides = window.LOAD_CORE.guides.concat(G); }
})();
