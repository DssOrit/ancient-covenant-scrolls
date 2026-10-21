/* Practice plan, Portugal outdoor words, and outdoor storm and wildfire rules. Written 25 Oct 2026.
   Plan and words come from the user-supplied field manual (AI-written, not independently verified).
   Lightning timing was checked against National Weather Service pages seen in search results (pages not opened). */
(function () {
  var CD = "25 Oct 2026";
  function g(o) {
    o.difficulty = o.difficulty || "Practical"; o.status = o.status || "general"; o.checkedOn = CD;
    o.tip = o.tip || []; o.after = o.after || []; o.warn = o.warn || []; o.sections = o.sections || []; o.sources = o.sources || [];
    o.source = (o.sources[0] && o.sources[0][1]) || "https://www.ready.gov/"; return o;
  }
  var G = [
    g({
      id: "wf-practice-plan", area: "Home skills", icon: "toolbox", title: "Practise before you need it: 8-week skills plan and trip checklist",
      intro: "Skills fail when they are first tried in an emergency. This plan gives one small lesson a week on lawful land, with a pass test for each. Do it with a group or an instructor where you can.",
      first: [
        "Practise only on land where you have permission.",
        "Never practise fire, water crossings or plant tasting alone.",
        "Tell someone your route and your return time.",
        "Do the preflight checklist before every practice trip."
      ],
      do: [
        "Week 1: Trip planning, hazard scan, emergency call script. Write your route, check the weather, and write the call script: what is wrong, where you are, how many people, your phone number. Pass: you give correct coordinates and write down shelter-or-leave as your choice.",
        "Week 2: Tarp A-frame and lean-to on lawful training land. Pass: the pitch is stable, there is a clear way out, and nothing can fall on it from above.",
        "Week 3: Cold and wet clothing and ground insulation. Pass: your sleeping layers stay dry after simulated rain.",
        "Week 4: Water treatment with commercial gear. Pass: you use the correct CDC boil time and never mix dirty and clean water.",
        "Week 5: Paper map, compass and offline GPS. Pass: you find 3 checkpoints without leaving the marked course.",
        "Week 6: Fishing rig demonstration and rules lookup. Pass: the rig is legal, you control the line, and you can say how to treat a fish humanely.",
        "Week 7: Plant identification without tasting. Pass: you write down what you see (leaf, stem, flower, smell, place) and rule out look-alikes. Nobody eats anything.",
        "Week 8: Shelter check, cooking hygiene and a mock rescue. Pass: you show safe cooking temperatures and hold a group debrief.",
        "After each week, write one line in your field record: what worked, what failed, what to change."
      ],
      table: { head: ["Before every trip, check", "Done"], rows: [
        ["Route and time agreed, weather checked, emergency contact told", "Yes / No"],
        ["Land-use, camping, fishing and fire rules checked for the state or Portuguese region", "Yes / No"],
        ["Shelter, dry layers and ground insulation packed", "Yes / No"],
        ["Safe water plus a tested backup method; sealed food", "Yes / No"],
        ["First-aid kit and medication reachable; maps saved offline; phone charged", "Yes / No"],
        ["No-go decided in advance for lightning, flash flood, extreme heat, wildfire and cold water", "Yes / No"]
      ] },
      warn: [
        "Do not practise fire during a fire ban or high fire danger.",
        "Do not practise rafts or water crossings. See the raft guide.",
        "Do not taste a wild plant as part of Week 7."
      ],
      tip: ["Do the plan with a friend and swap roles.", "Keep the field record in the same notebook each week."],
      after: ["Repack your kit and note anything missing.", "Tell your contact you are back."],
      sources: [
        ["CDC: how to make water safe in an emergency", "https://www.cdc.gov/water-emergency/about/how-to-find-clean-water-in-an-emergency.html"],
        ["USDA FSIS: safe minimum internal temperature chart", "https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/safe-temperature-chart"],
        ["National Park Service: Leave No Trace", "https://www.nps.gov/subjects/leavenotrace/index.htm"]
      ],
      unconfirmed: [
        "The 8-week plan and its pass tests come from the user-supplied field manual (AI-written, not independently verified). We did not find the plan in any official or trainer source. Treat it as a practice outline, not a qualification.",
        "The CDC boil time and USDA fish temperature are from official pages. Everything else in the plan is general practice.",
        "We did not check land-use or fire rules for any state or Portuguese region. Check them for your place and date."
      ]
    }),
    g({
      id: "wf-pt-words", area: "Portugal", icon: "alert", title: "Portugal outdoor words: fire, fishing, shelter and safety",
      intro: "Words you may see on signs, forms and websites in Portugal when camping, fishing or in a fire warning. English first, then European Portuguese.",
      first: [
        "The emergency number is 112.",
        "These words are not checked by a native speaker.",
        "Use them to read signs and search official sites."
      ],
      do: [
        "Learn the fire words first. Incêndio rural is the term used by civil protection. Incêndio florestal is the common term. Fogueira means campfire.",
        "Learn the licence words before you fish. Licença de pesca lúdica or desportiva is a fishing licence. Pesca em águas interiores is freshwater fishing. Pesca lúdica em águas marítimas is sea fishing.",
        "Learn the gear words. Abrigo is shelter. Lona impermeável is a waterproof tarp. Colete salva-vidas is a life jacket. Estojo de primeiros socorros is a first-aid kit.",
        "Use the words to search. Type the Portuguese phrase into the official sites (ICNF, DGRM, IPMA, Proteção Civil) to find current rules.",
        "For speaking in an emergency, use the 112 phrases in the Portugal guide. They have a Listen button."
      ],
      table: { head: ["English", "Portuguese (Portugal)"], rows: [
        ["Wildfire / rural fire", "Incêndio rural"],
        ["Forest fire", "Incêndio florestal"],
        ["Campfire", "Fogueira"],
        ["Fishing licence", "Licença de pesca lúdica / desportiva"],
        ["Freshwater fishing", "Pesca em águas interiores"],
        ["Sea fishing", "Pesca lúdica em águas marítimas"],
        ["Wild mushrooms", "Cogumelos silvestres"],
        ["Shelter", "Abrigo"],
        ["Tarp", "Lona impermeável"],
        ["First-aid kit", "Estojo de primeiros socorros"],
        ["Life jacket", "Colete salva-vidas"],
        ["Emergency number", "112"]
      ] },
      warn: [
        "Do not rely on this list for a medical or legal conversation. Get a Portuguese speaker or the official page."
      ],
      tip: ["Save the official pages for offline use before you travel."],
      after: ["Ask a Portuguese speaker to check this list."],
      sources: [
        ["ICNF: Queimas e Queimadas (fire rules)", "https://www.icnf.pt/imprensa/queimasequeimadas"],
        ["gov.pt: inland sport fishing licence", "https://www.gov.pt/servicos/obter-licenca-de-pesca-desportiva-em-aguas-interiores"],
        ["DGRM: recreational fishing licences", "https://www.dgrm.pt/licencas"]
      ],
      unconfirmed: [
        "This word list comes from the user-supplied field manual (AI-written). It was not reviewed by a native speaker. We confirmed only that the official pages above use terms such as licença de pesca lúdica and queimas e queimadas.",
        "We did not confirm every word against a Portuguese dictionary."
      ]
    }),
    g({
      id: "wf-storm-fire-out", area: "Weather", icon: "alert", difficulty: "Critical", title: "Outdoors in a thunderstorm or wildfire: when to leave and where to shelter",
      intro: "Two outdoor dangers that act fast. Decide your no-go lines before the trip, and act at the first sign.",
      first: [
        "Thunder heard means you are close enough to be struck. Go to a safe place now.",
        "Safe place: a substantial building or a hard-topped vehicle with the windows up. A tent is not safe.",
        "Wildfire: leave early by an official route. Do not fight it.",
        "Call 911 in the US or 112 in Portugal."
      ],
      do: [
        "Thunderstorm, before: check the forecast and watch the clouds. Leave ridges, open ground, open water and lone trees early.",
        "Thunderstorm, during: get into a substantial building or a hard-topped vehicle with the windows up. Shelter from rain is not shelter from lightning. Tents, sheds, porches and open shelters do not protect you.",
        "Thunderstorm, if caught outside: keep away from metal objects and water. In a group, spread out so one strike does not hurt everyone (field manual advice, not confirmed).",
        "Thunderstorm, after: wait 30 minutes after the last thunder before going back out. If thunder sounds again, the 30 minutes start again.",
        "Wildfire, before: learn the official alerts and the evacuation routes for the place you will be.",
        "Wildfire, at the first smoke or warning: leave early on a known safe route. Do not go up a canyon or through dry vegetation.",
        "Wildfire: do not try to fight a spreading fire. Give your location and the hazards to the authorities.",
        "Wildfire, if trapped: call emergency services and follow the dispatcher. Do not light a burnout or backfire yourself.",
        "In Portugal, check IPMA warnings, ICNF fire restrictions and local alerts from Proteção Civil before you go and while you are there."
      ],
      warn: [
        "Do not shelter under a lone tree.",
        "Do not wait to see how bad it gets.",
        "Do not light any fire when a ban or high danger is in force."
      ],
      tip: ["Save the emergency number and your coordinates where you can read them fast.", "Check alerts the evening before and the morning of the trip."],
      after: ["Check everyone for injury. Lightning victims need emergency care even if they seem fine.", "Report a new fire at once."],
      sources: [
        ["National Weather Service: lightning safety overview", "https://www.weather.gov/safety/lightning-safety-overview"],
        ["IPMA: Portuguese weather and warnings", "https://www.ipma.pt/"],
        ["ANEPC: Proteção Civil", "https://prociv.gov.pt/"],
        ["ICNF: Queimas e Queimadas", "https://www.icnf.pt/imprensa/queimasequeimadas"]
      ],
      unconfirmed: [
        "The 30-minute wait after the last thunder, the restart rule, and that tents and open shelters are not safe are from National Weather Service pages seen in search results. We did not open them.",
        "The wildfire steps (leave early, do not fight it, no burnouts) and the advice to spread out come from the user-supplied field manual (AI-written, not independently verified). We did not find a named wildfire agency page for them.",
        "We did not check Portuguese lightning or wildfire guidance. Use the IPMA, ICNF and Proteção Civil pages.",
        "We did not check first aid for lightning injury. See the medical guides and call emergency services."
      ]
    })
  ];
  window.LOAD_WILDFOOD5 = G;
  if (window.LOAD_CORE) { window.LOAD_CORE.guides = window.LOAD_CORE.guides.concat(G); }
})();
