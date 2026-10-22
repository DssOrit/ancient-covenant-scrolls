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
