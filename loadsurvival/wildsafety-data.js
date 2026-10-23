/* Carbon monoxide, Portugal beach and sun, child and infant CPR. Written 22 Oct 2026.
   Facts come from pages seen in search results (not opened) and are named in each guide. The Not confirmed lists say what was not found. */
(function () {
  var CD = "22 Oct 2026";
  function g(o) {
    o.difficulty = o.difficulty || "Critical"; o.status = o.status || "partly"; o.checkedOn = CD;
    o.tip = o.tip || []; o.after = o.after || []; o.warn = o.warn || []; o.sections = o.sections || []; o.sources = o.sources || [];
    o.source = (o.sources[0] && o.sources[0][1]) || "https://www.ready.gov/"; return o;
  }
  var G = [
    g({
      id: "med-carbon-monoxide", area: "Medical", icon: "alert", title: "Carbon monoxide poisoning: spot it, get out, prevent it",
      intro: "Carbon monoxide (CO) is a gas you cannot see or smell. It comes from generators, gas heaters, water heaters, braziers, stoves and car exhaust. It is a main killer in power cuts.",
      first: [
        "Get everyone out into fresh air now. Do not stay to look for the cause.",
        "Call 112 (Portugal) or 911 (US). Poison help: Portugal CIAV 800 250 250, US 1-800-222-1222.",
        "Do not go back in until the fire service says it is safe.",
        "Never run a generator, grill, brazier or gas stove for heat indoors."
      ],
      do: [
        "Know the signs. Headache, dizziness, weakness, upset stomach, vomiting, chest pain and confusion. It feels like flu but with no fever. Several people in the home feel ill at once, or feel better when they go outside.",
        "Act at once. Leave the building. If you can do it in a second, open a door or window and turn off the appliance on your way out. Tell the fire service who is still inside.",
        "Call 112 or 911 from outside. Say 'carbon monoxide' and give the address. Stay outside.",
        "Get checked even if you feel better. People who were asleep or drunk can be badly hurt without feeling symptoms. Tell the doctor you were exposed.",
        "Run a generator outdoors only, at least 20 feet (6 m) from the house, with the exhaust pointing away from doors, windows and vents. Never in a garage, basement or shed, even with the door open.",
        "Never heat a home with a gas oven, stove or an outdoor grill. Do not burn charcoal or a brazier in a closed room.",
        "Fit CO alarms with battery power. Put one on every level and outside every sleeping area. Test them. Keep fresh batteries.",
        "Have gas heaters, water heaters and chimneys checked once a year by a qualified technician. In Portugal, water heaters (esquentadores) and braziers (braseiras) are named by the poison centre as common causes."
      ],
      table: { head: ["Source of CO", "Rule"], rows: [
        ["Portable generator", "Outdoors only, 20 ft (6 m) away, exhaust away from the house"],
        ["Gas heater or water heater", "Needs air and a yearly check. Never block the vent"],
        ["Brazier or charcoal", "Never in a closed room, even to heat it"],
        ["Car or van engine", "Never run in a garage, even with the door open"],
        ["Gas stove or oven", "Never use as a heater"]
      ] },
      warn: [
        "A CO alarm that sounds is an emergency. Do not wait to see if it stops.",
        "You cannot smell CO. Do not use smell to check that a room is safe.",
        "Do not use a generator in a garage or basement, or close to a window.",
        "Sleeping people and children can be hurt first."
      ],
      tip: ["Write the address and 'carbon monoxide' on a card by the phone. It helps in a panic.", "Check CO alarm batteries when you change your clocks or when you test your smoke alarms."],
      after: ["Do not use the appliance again until it has been checked.", "Air out the home when the fire service says it is safe."],
      sources: [
        ["CPSC (US Consumer Product Safety Commission): page seen in search results about generators (title not shown)", "https://www.cpsc.gov/node/12724"],
        ["CPSC: second page seen in search results about CO alarms (title not shown)", "https://www.cpsc.gov/node/65786"],
        ["CDC feature, archived copy: 'The quiet killer' (carbon monoxide)", "https://cybercemetery.unt.edu/oilspill/20130213203100mp_/http://m.cdc.gov/en/Features/quiet-killer"],
        ["Indiana Department of Homeland Security: Carbon Monoxide Safety Tips (cites CDC)", "https://www.in.gov/dhs/files/Carbon-Monoxide-Safety-Tips.pdf"],
        ["Renascença: INEM warns of rise in CO poisonings in 2025 (quotes CIAV advice)", "https://rr.pt/noticia/pais/2025/11/27/inem-alerta-para-aumento-de-intoxicacoes-por-monoxido-de-carbono-em-2025/449576/"],
        ["RTP: INEM warns of CO poisonings (2025)", "https://www.rtp.pt/noticias/economia/inem-alerta-para-aumento-de-intoxicacoes-por-monoxido-de-carbono-com-quase-30-casos-este-ano_n1701152"],
        ["DECO Proteste: CO poisoning symptoms", "https://www.deco.proteste.pt/saude/doencas/dicas/intoxicacao-monoxido-carbono-sintomas"]
      ],
      unconfirmed: [
        "The 20 foot generator distance and the 'never in a garage or enclosed space' rule come from CPSC and a CDC-based notice seen in search results. We did not open the CPSC pages and the search did not show their titles, so we do not know which page says what.",
        "The symptom list comes from an archived CDC page and Indiana state guidance, found in search results. We found no current cdc.gov page.",
        "The Portuguese advice (open doors and windows, go outside, call 112 or CIAV 800 250 250, braziers and water heaters as common causes) comes from news reports of INEM and CIAV warnings. We did not find a DGS page and did not open the official INEM or CIAV pages.",
        "Alarm placement (every level and outside sleeping areas) is from a CPSC-based summary in search results. Other sites give distances such as 10 feet from a bedroom door and 15 feet from appliances. Those came from blogs and forums, so we give no distance. Follow the alarm's instructions.",
        "We found no source for the 'open a door or window on the way out' step. It is common advice, and the Portuguese reports include it. Never delay leaving to do it.",
        "We did not check treatment in hospital (oxygen). The poison centre or doctor decides.",
        "The US Poison Help number 1-800-222-1222 is used across this app. We did not check it again here."
      ]
    }),
    g({
      id: "pt-beach-sun", area: "Portugal", icon: "waves", title: "Portugal beaches and sun: flags, rip currents, stings, heat",
      intro: "The beach is where most visitors meet danger in a Portuguese summer: strong currents, jellyfish and spiny fish, and heat. Learn the flags and the first steps before you go.",
      first: [
        "Swim only on a beach with lifeguards, and between the flags.",
        "Emergency: 112. Poison centre (CIAV): 800 250 250.",
        "Caught in a current: stay calm, do not swim straight back, swim along the beach.",
        "In heat: shade, water, no sport in the middle of the day."
      ],
      do: [
        "Read the flag before you enter. Green: calm sea, swimming allowed. Yellow: some waves or currents, take care. Red: danger, do not enter the water. Chequered: the beach has no lifeguard for now.",
        "Red and yellow flags mark the guarded zone where lifeguards watch. Swim inside it. The zone can move during the day, so look again.",
        "Know a rip current (agueiro, corrente de retorno). It can form beside piers and rocks, and often looks like a calmer patch with fewer waves. That calm patch is not safe.",
        "If a current pulls you: do not fight it and do not try to swim straight back. Swim along the beach, parallel to the shore, until the pull stops. Then angle back to the beach.",
        "If you are tired: float or tread water, save energy, raise one arm and shout so the lifeguards see you.",
        "Peixe-aranha (weever fish): a sting in the foot, often in shallow sand. Soak the area in water as hot as can be tolerated, about 40 C, for about 30 minutes. Remove spines with tweezers or with your hands protected. See a doctor if pain stays, the foot swells a lot, or you have signs of infection or allergy.",
        "Caravela-portuguesa (Portuguese man o' war) and jellyfish: rinse with sea water, never fresh water, and do not rub. Lift tentacles off with tweezers or a card. A warm compress can ease pain. Do not touch a dead one on the sand, it can still sting.",
        "Go to hospital or call 112 for trouble breathing, chest pain, collapse, a sting over a large area, or a sting on the face or genitals.",
        "Sun: avoid direct sun in the middle of the day (about 11:00 to 17:00). Use sunscreen of SPF 30 or more and put it on again every 2 hours and after swimming. Wear a hat, light loose clothes and sunglasses. Drink water. Skip alcohol.",
        "Heat warnings: IPMA uses colours, yellow to red. Check IPMA before you go out. Take extra care with children, older people, pregnant people and people with long-term illness. See the heat illness guide for heat exhaustion and heat stroke."
      ],
      table: { head: ["Flag", "Meaning"], rows: [
        ["Green", "Calm sea. Swimming allowed."],
        ["Yellow", "Some waves or currents. Take care."],
        ["Red", "Danger. Do not enter the water."],
        ["Chequered", "No lifeguard on this beach for now."],
        ["Red and yellow", "Guarded zone. Swim inside it."]
      ] },
      warn: [
        "Never swim alone, and never swim after alcohol.",
        "Do not jump or dive from rocks or piers into the sea.",
        "Do not use fresh water, rubbing or sand on a man o' war sting.",
        "Do not test the hot water with a numb foot. Check the temperature with your hand so you do not scald.",
        "A beach with no lifeguard is a higher risk. Choose another beach."
      ],
      tip: ["Look at the beach, the flag and the lifeguard post before you put a towel down.", "Carry water and sunscreen in your beach bag, and a small first-aid kit with tweezers."],
      after: ["Check children and older relatives for sunburn, headache or dizziness later in the day.", "Rinse sand and salt off the skin."],
      sources: [
        ["National Weather Service: rip current safety", "https://weather.gov/news/242205-rip-current-safety"],
        ["Postal.pt: Autoridade Marítima Nacional warns about rip currents (agueiros)", "https://postal.pt/nacional/autoridade-maritima-nacional-alerta-para-perigos-dos-agueiros/"],
        ["DNotícias: what each beach flag means", "https://www.dnoticias.pt/2025/7/21/456895-descubra-o-que-significa-cada-bandeira-na-praia/"],
        ["RFM: red and yellow flag meaning", "https://rfm.pt/atualidade/23454/muitos-portugueses-ignoram-o-significado-da-bandeira-vermelha-e-amarela-na-praia-e-pode-ser-um-erro"],
        ["CUF: weever fish sting, what to do", "https://www.cuf.pt/mais-saude/fui-picado-por-peixe-aranha"],
        ["DECO Proteste: weever fish, jellyfish and insect stings", "https://www.deco.proteste.pt/saude/doencas/dicas/picadas-peixe-aranha-alforrecas-insetos-como-tratar-alergias"],
        ["Diário de Notícias: DGS advice for heat waves", "https://www.dn.pt/sociedade/as-recomendacoes-da-dgs-para-se-proteger-da-vaga-de-calor-14027090.html"],
        ["IPMA: weather and warnings", "https://www.ipma.pt/"]
      ],
      unconfirmed: [
        "The flag meanings and the rip current advice for Portugal come from Portuguese news and explainer pages. They quote or paraphrase the maritime authority (AMN). We did not find or open the official AMN page. Check the flag and the lifeguard on the day.",
        "The rip current steps (do not fight it, swim parallel, then angle in, float and signal) match National Weather Service wording seen in search results. We did not open the page.",
        "The hot water soak for weever fish (about 40 C, about 30 minutes) is from Portuguese health and consumer pages. Sources gave 39 to 45 C and 20 to 90 minutes. We use one simple figure.",
        "Vinegar for man o' war and jellyfish stings: the sources disagree. DECO and another news site say it can be used for the man o' war, and other pages say it does not always apply. We left vinegar out. Ask the lifeguard or a doctor.",
        "We found no INEM or CIAV page on marine stings. The 112 advice for serious signs is common sense, not a quoted rule.",
        "The sun and heat advice (11:00 to 17:00, SPF 30 or more, every 2 hours) comes from news reports of DGS advice in 2025. We did not open the DGS pages.",
        "We did not check IPMA warning levels or other beach dangers such as cliffs and rock falls."
      ]
    }),
    g({
      id: "car-in-water", area: "Disasters", icon: "waves", title: "Car in water: how to get out of a sinking or flooded car",
      intro: "A car can float for only about 30 seconds to 2 minutes. Act in the first seconds. Do not wait for the car to fill. Do not open the door.",
      first: [
        "Seat belt off.",
        "Window open or broken. Do it now.",
        "Out at once. Children first.",
        "Then call 112 (Portugal) or 911 (US)."
      ],
      do: [
        "Stay as calm as you can and move at once. Sources give 30 to 120 seconds before the car fills. Every second you spend thinking is lost.",
        "Undo your seat belt first. Undo the children's belts next.",
        "Open a window. Most electric windows keep working for some time under water. Use the switch now, before the water rises.",
        "Do not open the door. Rushing water can slam it shut or hold it closed, and an open door lets the car fill faster.",
        "If the window will not open, break a side window with an escape tool. Spring-loaded tools work best. Hammer-style tools are hard to swing under water.",
        "Get children out first. One expert says take the oldest first, because older children can wait while a younger one is helped.",
        "Go out through the window and push away from the car. Swim or wade to the nearest bank, and keep away from fast water.",
        "Call 112 (Portugal) or 911 (US) when you are safe. Do not go back for belongings.",
        "Car stalled in rising floodwater, not yet sinking: leave when the water reaches the bottom of the doors. Leave the car and go to higher ground. Do not try to move it.",
        "Do not restart a car that has been in water. Wait for it to be checked."
      ],
      table: { head: ["Step", "Do this"], rows: [
        ["S", "Seat belts off"],
        ["W", "Window open or broken"],
        ["O", "Out at once"],
        ["C", "Children first"]
      ] },
      warn: [
        "Do not wait for the car to fill so you can open the door. Experts say to leave at once.",
        "Do not open the door. Use a window.",
        "A new car's side window may be hard to break. Check your window for a Tempered label and keep a tool within reach.",
        "Do not stand on top of the car in fast water. You can be swept away.",
        "Do not drive into water on the road. See the Flood guide."
      ],
      sections: [
        { h: "Get ready before you need it", items: [
          "Keep an escape tool within reach of the driver, for example on a keychain or on the dashboard. Do not keep it in the glove box.",
          "Check the tool works on your car's side window. A US study (AAA) found six common tools could not break stronger glass.",
          "Tell every passenger the steps. Practise finding your belt release with your eyes closed.",
          "See the 'Trapped in a car' guide for belt cutters and window breakers, and the Flood guide for road flooding."
        ] }
      ],
      tip: ["Choose a tool that is spring-loaded.", "Practise the four steps with the family while the car is parked, with the engine off."],
      after: ["Get a medical check even if you feel fine, especially if you swallowed water.", "Report the car to the police, your insurer or your breakdown service when you are safe."],
      sources: [
        ["AAA: How to Escape a Sinking Vehicle", "https://cluballiance.aaa.com/the-extra-mile/advice/car/how-to-escape-a-sinking-vehicle"],
        ["NPR and WHYY: What to do if your vehicle is submerged in water", "https://whyy.org/npr-story/car-submerged-underwater-escape/"],
        ["Kids and Cars: if your vehicle is going underwater, seconds count", "https://www.kidsandcars.org/news/if-your-vehicle-is-going-underwater-seconds-count-here-are-4-tips-to-help-you-survive"],
        ["Kids and Cars: what to do if your car is sinking with you inside", "https://www.kidsandcars.org/news/florida-has-water-everywhere-heres-what-to-do-if-your-car-is-sinking-with-you-inside"],
        ["City of Brownsville: what to do if you are driving during a flood", "https://www.brownsvilletx.gov/243/What-to-Do-if-Your-Are-Driving-During-a-"],
        ["Postal.pt: how to act when your car is submerged (Portugal)", "https://postal.pt/nacional/saiba-como-agir-em-caso-de-submersao-do-seu-carro/"],
        ["RTP: what to do and avoid on flooded roads (Portugal)", "https://www.rtp.pt/noticias/pais/mau-tempo-o-que-devemos-fazer-e-evitar-quando-as-estradas-estao-alagadas_n1698474"]
      ],
      unconfirmed: [
        "We found no page from NHTSA, the Red Cross, RoSPA, ANSR or ANEPC on a sinking car. The steps come from AAA, NPR and WHYY, Kids and Cars, and news and city pages found in search results. We did not open them.",
        "The timing of 30 to 120 seconds, and the sequence seat belt, window, out, children, are from these sources. The timing varies between sources, and we found no measured figure for a particular car.",
        "The sources disagree about waiting. One article says to wait for the water to rise so the pressure equalises and then open the door. An expert quoted in a search result says that is wrong and the escape must be at once. We follow the second.",
        "On child order, one expert says oldest first. Other sources say only children first.",
        "Whether electric windows work, and for how long, differs between cars. We found no figure.",
        "Spring-loaded tools being better than hammers, and the AAA finding that six tools could not break stronger glass, are from search results about the AAA study. We did not open the study.",
        "One Portuguese article suggests using the metal prongs of a headrest on the rear window. We found no second source, so we left it out.",
        "Leaving the car when the water reaches the bottom of the doors, and not trying to move a stalled car, come from a city flood guide and a motoring page. We found conflicting advice about the roof. One guide says do not stand on the roof. A summary of FEMA advice, which we could not confirm, says to get on the roof if water is rising inside. We did not include the roof advice.",
        "Not restarting a car that has been in water is from Portuguese motoring pages. We did not check the reason given (engine damage).",
        "We found no source for the medical check or the report-to-insurer lines. They are common sense."
      ]
    }),
    g({
      id: "fire-upper-floors", area: "Fire", icon: "flame", title: "Fire in a building: what to do on the second floor or higher",
      intro: "Smoke is what kills first. Get out if the way is clear. If it is not, stay in a closed room, seal the door, and signal at the window.",
      first: [
        "Get out now if the stairs are clear. Close the doors behind you.",
        "Never use the lift (elevator). Use the stairs.",
        "Hot door or smoke in the stairs: do not go that way.",
        "Call 112 (Portugal) or 911 (US) and say your floor and flat number."
      ],
      do: [
        "Leave at once if the alarm sounds or you smell smoke. Take your phone and keys. Do not stop for belongings.",
        "Feel the door with the back of your hand before you open it. If it is hot, do not open it.",
        "If the door is cool, open it slowly and stand behind it. If you feel heat or pressure, shut it.",
        "Close every door behind you. This slows the smoke and the fire. A door left open lets smoke into the stairs for everyone.",
        "Use the stairs, not the lift. A lift can stop or fill with smoke.",
        "In smoke, stay low, where the air is better, and cover your mouth with a damp cloth.",
        "If the stairs are blocked by fire or smoke, go back to your flat or room and close the door.",
        "Seal the door: put wet towels or sheets along the bottom and tape the cracks and vents. Do not open a window if smoke comes in through it.",
        "Call 112 or 911 and tell them your address, your floor and which room you are in. Stay on the line.",
        "Go to the window or balcony, away from the smoke. Open it for air if no smoke comes in. Stay where firefighters can see you. Wave or hang a sheet or towel so they can find you.",
        "Do not jump. Falls from a height are very dangerous. Stay and signal. One UK fire service says to try to leave by a window only if there is no other way and the room cannot be survived."
      ],
      table: { head: ["Situation", "Do this"], rows: [
        ["Stairs are clear and the door is cool", "Go out, close doors, use the stairs"],
        ["Door is hot, or smoke in the stairs", "Stay in. Seal the door. Signal at the window"],
        ["Fire is in your flat", "Get out and close the door. Warn others"],
        ["Fire is elsewhere in the building", "Follow the alarm and the firefighters. Some buildings say stay in your flat"]
      ] },
      warn: [
        "Do not use the lift in a fire.",
        "Do not open a hot door.",
        "Do not jump from a window on the second floor or higher.",
        "Do not go back inside for people or pets. Tell the firefighters where they are."
      ],
      sections: [
        { h: "Plan ahead", items: [
          "Know two ways out of your flat, and where the stairs are. Count the doors from your door to the stairs.",
          "Keep your phone, keys and shoes by the bed.",
          "Learn how the building's alarm sounds, and what the building plan says: leave, or stay in your flat.",
          "Fit a smoke alarm in each room where you sleep, and test it."
        ] }
      ],
      tip: ["Practise the route in the dark.", "Tell visitors and children the plan."],
      after: ["Do not go back inside until the fire service says it is safe.", "Get a medical check if you breathed smoke."],
      sources: [
        ["Albany (NY) Fire Department: high-rise residential fire safety flyer", "https://albanyny.gov/DocumentCenter/View/884/High-Rise-Residential-Fire-Safety-Flyer-PDF"],
        ["Canada Safety Council: high-rise fire, smoke and flames", "https://canadasafetycouncil.org/high-rise-fire-smoke-and-flames/"],
        ["Surrey Fire and Rescue: fire safety in high rises", "https://www.surreycc.gov.uk/community/fire-and-rescue/businesses/buildings/high-rises"],
        ["Fire and Rescue Service Scotland: Escaping a fire", "https://www.firescotland.gov.uk/at-home/in-an-emergency"],
        ["Toronto Fire Services: high-rise fire safety (Portuguese)", "https://www.toronto.ca/wp-content/uploads/2021/01/9678-20-00237-FireHighRise-NOV5-noon-Portuguese.pdf"],
        ["DGE (Portugal): Incêndios, sabes o que fazer? (school booklet)", "https://www.dge.mec.pt/sites/default/files/ECidadania/educacao_Risco/documentos/incendios-escola-sabes-o-que-fazer.pdf"]
      ],
      unconfirmed: [
        "We found no NFPA, ANEPC or Portuguese fire service page. The steps come from a US city fire flyer, safety council and UK and Canadian fire service pages, and a Portuguese school booklet, seen in search results. We did not open them.",
        "Leave the building or stay in the flat depends on the building. Most sources say leave if it is safe. The Toronto guide and the Canada Safety Council say staying can be safer in a building with fire-resistant doors and walls or working sprinklers. We cannot tell which kind of building you are in. Follow the building alarm and the firefighters.",
        "Feeling a door, closing doors behind you, no lift, sealing the door with wet towels and tape, and going to the window are in the Albany flyer and the other pages seen in search results.",
        "Hanging a sheet or towel at the window to show where you are came from a Brazilian fire service page in search results. UK pages say to wave a sheet and stay at the open window.",
        "We found no source for how to get out of a window above the first floor. The UK service says to try a window escape only when there is no other way and the advice we found is for a first-floor window. We found no advice for the third floor and higher. Our line not to jump is our choice and matches the 'stay and signal' advice.",
        "We did not check fire-escape ladders or building rules about them.",
        "The line that a hot door must not be opened and that you should stay low and cover your mouth with a damp cloth is from the Portuguese school booklet and the Albany flyer in search results. We did not check a medical source on how much a damp cloth helps."
      ]
    }),
    g({
      id: "flood-at-home", area: "Disasters", icon: "waves", title: "Flooding at home: before, during and after",
      intro: "Floodwater is strong, dirty and may be live with electricity. Get yourself and your family up and out of the water first. Things can be replaced.",
      first: [
        "Move to higher ground or upstairs now. Take your phone and go-bag.",
        "Do not walk or drive through floodwater.",
        "Do not touch electrical things if you are wet or standing in water.",
        "Trapped: call 112 (Portugal) or 911 (US)."
      ],
      do: [
        "Before heavy rain: clear drains, gutters and gullies near your home, so the water can run away.",
        "Move valuables, papers, medicines and electrical items up, off the floor. Move your car and animals out of places that often flood.",
        "Pack a go-bag with your documents, medicines, phone charger and torch. Know your route to high ground.",
        "If water is coming in: take people and pets upstairs or to a high place that has a way out.",
        "If it is safe and before the water enters, turn off gas, electricity and water at the mains. Only do this if you do not have to stand in water.",
        "Do not touch switches, sockets or electrical equipment while you are standing in water.",
        "Do not walk through floodwater. As little as 15 cm (6 in) of fast water can knock you over, and you cannot see holes, open manholes or sharp objects.",
        "Do not use a petrol generator indoors or in a closed space. It makes carbon monoxide.",
        "Follow the warnings from Proteção Civil and IPMA (Portugal) or the National Weather Service (US).",
        "After the flood: go home only when the authorities say it is safe. Check for damage before you go in.",
        "Floodwater is dirty. Do not use it to drink, wash dishes, clean teeth or prepare food. Wear rubber gloves and boots when you clean up.",
        "Throw out food, drink and medicine that touched floodwater, and soft things you cannot clean such as mattresses and carpets.",
        "Do not turn the gas back on until a qualified person has checked it. Get the electrics checked before you switch them on."
      ],
      table: { head: ["Do", "Do not"], rows: [
        ["Go up and out early", "Wait for water to reach you"],
        ["Turn off the mains if it is safe", "Touch electrics when you are wet"],
        ["Stay out of floodwater", "Walk or drive through flood"],
        ["Wear boots and gloves after", "Use floodwater to wash or drink"]
      ] },
      warn: [
        "Do not drive through a flooded road. See the Car in water guide.",
        "Do not touch downed power lines or anything they touch.",
        "Do not go back in until it is declared safe.",
        "Do not run a generator inside. Keep it outdoors, away from doors, windows and vents."
      ],
      tip: ["Take photos of the damage for your insurer before you clean.", "Keep important papers in a waterproof bag."],
      after: ["Dry the home well and watch for mould. Keep children, older people and pregnant people out of mouldy rooms until cleaned.", "Check on neighbours."],
      sources: [
        ["FEMA: Returning home after the flood", "https://fema.gov/ht/node/639163"],
        ["American Red Cross: 20 safety steps for returning home after a flood", "https://www.redcross.org/about-us/news-and-events/news/20-Red-Cross-Safety-Steps-for-Returning-Home-After-the-Flood.html"],
        ["Sutton Council (UK): what to do if there is a flood in your home", "https://www.sutton.gov.uk/w/flooding-advice-what-should-i-do-if-i-am-experiencing-flooding-in-my-home"],
        ["Spelthorne Council (UK): flooding do's and don'ts", "https://www.spelthorne.gov.uk/page/841/flooding-dos-and-donts"],
        ["Kingston Council (UK): flooding advice before, during and after", "https://kingston.gov.uk/emergency-planning/flooding-advice-1/2"],
        ["Proteção Civil dos Açores: leaflet on flash floods", "https://prociv.azores.gov.pt/fotos/paginas/141677253027.pdf"],
        ["Postal.pt: heavy rain, how to protect home, car and garage (Portugal)", "https://postal.pt/nacional/chuva-em-forca-como-proteger-casa-carro-garagem-chuva/"],
        ["Iowa DNR: after a flood", "https://www.iowadnr.gov/media/1599/download"]
      ],
      unconfirmed: [
        "The steps come from UK council pages, FEMA and Red Cross pages and a regional civil protection leaflet seen in search results. We did not open them. We found no Ready.gov, CDC or national ANEPC page.",
        "Go up to a higher floor or a high place with a way out, turn off gas, electricity and water if it is safe, never touch electrics when standing in water, and not walking through floodwater are in the council pages and FEMA text seen in search results.",
        "The 15 cm (6 in) figure for fast water is from a UK council page in search results. The US National Weather Service uses the same 6 inches for moving water.",
        "Never cross flooded areas on foot or by car, and move cars and animals out of flood-prone places before the rain, are ANEPC advice quoted in a search summary. We did not open the page.",
        "Clearing drains, gutters and gullies before heavy rain is quoted ANEPC advice in a search summary.",
        "Not using floodwater to drink or wash, gloves and boots, throwing out food and soft items, and waiting until it is safe to return are FEMA and Red Cross text seen in search results. Not turning the gas back on until it is checked is from a UK council page.",
        "We found no source specific to basements or to going upstairs in Portugal. The upstairs advice is from UK councils.",
        "The mould and who should stay out comes from an Iowa state page in search results.",
        "We did not check generator rules for Portugal. The 20 foot distance from doors, windows and vents is FEMA advice quoted in a search summary."
      ]
    }),
    g({
      id: "robbery", area: "Security", icon: "shield", title: "If you are being robbed: stay safe, then report",
      intro: "Your safety matters more than any thing. Money and phones can be replaced. You cannot be replaced.",
      first: [
        "Stay calm. Do not resist or argue.",
        "Do exactly what they say, no more and no less. Move slowly.",
        "Hand over what they ask for.",
        "When it is safe, get to a safe place and call 112 (Portugal) or 911 (US)."
      ],
      do: [
        "Stay as calm as you can. Breathe. Keep your voice low and your hands where they can see them.",
        "Do not fight, chase or argue. Do not resist, especially if the person has a weapon.",
        "Do what the person tells you to do, no more and no less. Avoid sudden movements that could surprise them.",
        "Give them what they ask for. Money and goods can be replaced.",
        "If there are children in your car or with you, tell the robbers so they know.",
        "Try to remember them: height, build, clothes, hair, voice, shoes. Do not stare. Look when it is safe.",
        "If they leave in a car, note the plate, make, model and the direction. Write it down as soon as you can.",
        "Do not follow them. Pay attention to which way they go.",
        "When it is safe, get to a safe place, such as a shop or a crowded street, and ask for help. Call 112 (Portugal) or 911 (US) and give as many details as you can.",
        "If it is your home: if the robber may still be inside, do not go in. Call 112 from outside.",
        "Do not touch or move anything, so you do not destroy evidence.",
        "Make a list of what was taken, with serial numbers and photos if you have them.",
        "Report it to the police, and tell your bank at once if cards or phones were taken."
      ],
      table: { head: ["Do", "Do not"], rows: [
        ["Stay calm and comply", "Fight, chase or argue"],
        ["Remember details", "Stare at the robber"],
        ["Move to a safe place, then call", "Follow them"],
        ["Report and block cards", "Touch evidence at home"]
      ] },
      warn: [
        "Do not resist an armed person.",
        "Do not chase the robber.",
        "Do not enter your home if the robber may still be there.",
        "Do not delay reporting. Details are fresh at the start."
      ],
      tip: ["Keep your phone and wallet in different pockets.", "Photograph your valuables and note serial numbers at home before anything happens."],
      after: ["Talk to someone you trust. It is normal to feel scared or shaky afterwards.", "Ask for victim support if you need it.", "Change door locks if keys were taken."],
      sources: [
        ["PSP: what to do in a robbery (reported by Notícias ao Minuto)", "https://www.noticiasaominuto.com/pais/1801180/como-re-agir-em-caso-de-assalto-eis-as-recomendacoes-da-psp"],
        ["PSP: security advice leaflet (EU migrant integration site)", "https://ec.europa.eu/migrant-integration/system/files/2023-02/Leaflet Security Advice_PSP_EN.pdf"],
        ["Generali Tranquilidade: your home was robbed, first 10 steps", "https://www.generalitranquilidade.pt/blog/familia/a-sua-casa-foi-assaltada-eis-os-primeiros-10-passos-a-dar"],
        ["Crimestoppers UK: robbery explained", "https://crimestoppers-uk.org/fearless/more-info/crime-types-explained/robbery"],
        ["Police Grand-Ducal Luxembourg: violent thefts", "https://police.public.lu/en/prevention/vols/vols-avec-violences.html"],
        ["WSPS: do not be the hero, hand over cash and valuables", "https://www.wsps.ca/resource-hub/young-worker-my-first-job/don-t-be-the-hero-hand-over-any-and-all-cash-products-and-valuables-during-a-robbery"]
      ],
      unconfirmed: [
        "The advice (stay calm, do not resist, hand over valuables, note details, call the police when safe) is consistent across the pages seen in search results: PSP advice reported in the press, UK, Luxembourg and Canadian pages. We did not open them. We did not find the psp.pt or gnr.pt page itself. The main Portuguese source is a press article about five years old.",
        "Do exactly what the robber says, no more and no less, and do not surprise them, comes from a retail robbery guide in search results.",
        "Telling the robbers that children are in the car is from the PSP advice quoted in the press.",
        "At home: not entering if the robber is inside, not touching anything, and listing the stolen items with serial numbers and photos, are from the PSP advice quoted in the press and an insurer's blog.",
        "We found no US police source. The US numbers and the bank step are common practice.",
        "We did not check advice for carjackings, knives or guns. Follow the dispatcher.",
        "The wellbeing and victim support lines come from UK victim support wording in search results."
      ]
    }),
    g({
      id: "med-child-cpr", area: "Medical", icon: "heart", title: "Child and infant CPR and choking: the differences from adults",
      intro: "A child is about 1 year to puberty. An infant is under 1 year. Children and babies often stop breathing first, so breaths matter more than for adults. This guide does not replace a course.",
      first: [
        "Check: tap the shoulder (tap the foot of a baby) and shout. Look at the chest. If not responding and not breathing normally, start.",
        "Call 112 (Portugal) or 911 (US), or send someone. Ask for an AED.",
        "Lay the child or baby on a firm, flat surface.",
        "Push hard and fast in the centre of the chest, 100 to 120 times a minute."
      ],
      do: [
        "Call for help first. Say 'child' or 'baby', 'not breathing', and the address. Put the phone on speaker and follow the operator.",
        "Chest compressions, child: use the heel of one hand on the centre of the chest. For a bigger child use two hands. Push down about one third of the chest depth, about 2 inches (5 cm). Let the chest come fully back up each time.",
        "Chest compressions, infant: use two fingers, or both thumbs with your hands around the chest. Push about 1.5 inches (4 cm), about one third of the depth. Press on the centre of the chest.",
        "Keep a steady rate of 100 to 120 pushes a minute. Use the CPR rhythm tool in Tools if it is in your app.",
        "Breaths, if you are trained: tilt the head back a little, lift the chin, cover the mouth (and nose of a baby) and give 2 gentle breaths that make the chest rise. Then go back to compressions.",
        "Ratio in the US (Red Cross and AHA): 30 compressions then 2 breaths. With two trained rescuers: 15 then 2.",
        "Ratio in Europe (ERC, used for Portuguese training): start with 5 rescue breaths, then 15 compressions to 2 breaths.",
        "If you are not sure of the breaths, keep pressing and follow the 112 operator.",
        "Use an AED as soon as one arrives. Switch it on and follow its voice. Keep pressing until it tells you to stop.",
        "Do not stop until help takes over, the child breathes normally, or you cannot go on.",
        "Choking baby (under 1) who cannot cry or cough: 5 back blows between the shoulder blades with the heel of the hand, face down along your forearm with the head lower than the body. Then 5 chest thrusts with two fingers. Repeat.",
        "Choking child (1 to puberty) who cannot cough or speak: 5 back blows, then 5 abdominal thrusts (Heimlich). Repeat.",
        "If a choking child or baby becomes unresponsive: lay them down, call 112 or 911 and start CPR with compressions. Look in the mouth before breaths, and take out only an object you can see."
      ],
      table: { head: ["", "Child (1 to puberty)", "Infant (under 1)"], rows: [
        ["Hands", "Heel of one hand (two for a big child)", "Two fingers or two thumbs"],
        ["Depth", "About 2 in (5 cm)", "About 1.5 in (4 cm)"],
        ["Rate", "100 to 120 a minute", "100 to 120 a minute"],
        ["US ratio", "30 to 2 (15 to 2 with two rescuers)", "30 to 2 (15 to 2 with two rescuers)"],
        ["Europe ratio", "5 breaths first, then 15 to 2", "5 breaths first, then 15 to 2"],
        ["Choking", "5 back blows, 5 belly thrusts", "5 back blows, 5 chest thrusts"]
      ] },
      warn: [
        "Never use belly thrusts on a baby under 1.",
        "Do not sweep the mouth blind with a finger. Remove only what you can see.",
        "Do not delay starting for any reason. Not breathing is an emergency.",
        "Do not shake a baby to wake them."
      ],
      tip: ["Take a CPR course with a mannequin. Reading is not enough.", "Practise the hand position on a cushion, not on a child."],
      after: ["Every child who needed CPR or had choking needs a hospital check, even if they seem fine.", "Write down the time you started and what you did, for the paramedics."],
      sources: [
        ["American Red Cross: child and baby CPR", "https://www.redcross.org/take-a-class/cpr/performing-cpr/child-baby-cpr"],
        ["American Red Cross: infant choking", "https://redcross.org/take-a-class/resources/learn-first-aid/infant-choking"],
        ["Red Cross Canada: CPR for a child (poster)", "https://cdn.redcross.ca/prodmedia/crc/documents/fa-poster-CPR-for-a-Child.pdf"],
        ["Red Cross Canada: CPR for a baby (poster)", "https://cdn.redcross.ca/prodmedia/crc/documents/fa-poster-CPR-for-a-Baby.pdf"],
        ["European Resuscitation Council Guidelines 2021: Paediatric Life Support (PDF)", "https://cprguidelines.eu/assets/guidelines/European-Resuscitation-Council-Guidelines-2021-Pa.pdf"],
        ["Mayo Clinic: choking first aid", "https://www.mayoclinic.org/first-aid/first-aid-choking/basics/art-20056637"],
        ["Conselho Português de Ressuscitação (cpr.pt): Portuguese resuscitation council", "https://www.cpr.pt/"]
      ],
      unconfirmed: [
        "The depths (about 2 in for a child, about 1.5 in for an infant), the rate of 100 to 120 and the 30 to 2 ratio come from Red Cross pages and a summary of the AHA 2020 guidelines, found in search results. We did not open the AHA guideline.",
        "The ERC sequence (5 rescue breaths first, then 15 to 2, two-thumb method preferred for infants) comes from search results about the ERC 2021 paediatric guidelines. We did not open the PDF. We did not find the INEM or Portuguese Resuscitation Council course content, so we do not know if Portuguese courses follow it exactly.",
        "A search result said the AHA and the American Academy of Pediatrics issued a 2025 update that dropped the two-finger infant method. We did not confirm it. If a current course teaches a different hand method, follow the course.",
        "We found no source for AED pad type or placement on children. Follow the AED's own voice and picture instructions.",
        "We found no source for the hand position on a baby beyond two fingers or two thumbs in the centre of the chest, and none for tapping the foot to check a baby. Both are common practice.",
        "We found no source for how long to check breathing. 'Not breathing normally' is the Red Cross Canada wording.",
        "The choking steps (5 back blows then 5 chest thrusts for a baby, 5 back blows then 5 belly thrusts for a child) match Red Cross and Mayo Clinic wording seen in search results. We did not open those pages.",
        "The advice to put the phone on speaker and follow the operator, and the advice that every child who needed CPR must be checked, is common practice. We found no named source for it."
      ]
    })
  ];
  window.LOAD_SAFETY = G;
  if (window.LOAD_CORE) { window.LOAD_CORE.guides = window.LOAD_CORE.guides.concat(G); }
})();
