/* Shelter, river crossing, plant identification and field food skills, part 2 of the wild-food series.
   Researched 24 Oct 2026 through search results only. Pages were not opened. Where we found no named source we say so under "Not confirmed". */
(function () {
  var CD = "24 Oct 2026";
  var RULES = "Rules and conditions change by US state and in Portugal by region and year. Ask the local authority before you build, pick, cross water or light a fire.";
  var OWN = "Items marked 'general guidance' or 'our reasoning' are common-sense advice. They are not taken from a named source.";
  function g(o) {
    o.difficulty = o.difficulty || "Practical"; o.status = o.status || "partly"; o.checkedOn = CD;
    o.unconfirmed = (o.unconfirmed || []).concat([RULES, OWN]); o.tip = o.tip || []; o.after = o.after || []; o.warn = o.warn || [];
    o.sections = o.sections || []; o.sources = o.sources || []; o.source = (o.sources[0] && o.sources[0][1]) || "https://www.ready.gov/"; return o;
  }
  var G = [
    g({
      id: "wf-shelter-build", area: "Shelter", icon: "tent", title: "Build a shelter from natural materials: debris hut, lean-to, snow shelter",
      intro: "Use a building, a car or an official shelter first. Build in the wild only if you must. A shelter must keep off wind, rain and cold ground. A small, well-insulated space holds body heat best.",
      first: [
        "Get out of wind, wet and cold first. Danger from cold comes faster than hunger.",
        "Use an existing building, a car or an official shelter if you can.",
        "Pick the site before you collect anything. See the guide on securing a shelter.",
        "Build small. Body heat warms only a small space.",
        "Never light a fire, stove or charcoal inside a closed shelter."
      ],
      do: [
        "Decide if you need to build. If you can walk to a building or an official shelter safely, go there. Build only if you cannot move or must stay put. Check the weather, the light left and how many hours you have.",
        "Choose the site. Look up for dead branches and look down for water paths. Pick dry, level ground with natural windbreak, such as rocks or a bank. Avoid low spots where water pools. See the guide on securing a shelter for hazards.",
        "Debris hut: set the ridgepole. Find a straight, sturdy pole a little longer than your body, and about two feet (60 cm) longer than your height in some guides. Prop one end on a stump, rock or fork about waist high. Rest the other end on the ground.",
        "Debris hut: add ribs and a lattice. Lean sticks along both sides of the ridgepole about 10 to 12 inches (25 to 30 cm) apart, to make a frame like a long A-shape. Weave thin sticks across the ribs, so the covering does not fall through.",
        "Debris hut: cover and insulate the roof. Pile dry leaves, grass or pine needles over the frame. Sources differ on thickness, from about one foot for rain to three feet (1 m) for cold. Aim for about three feet. Thicker is warmer. Pile more on the weather side.",
        "Debris hut: insulate the floor and make a small door. Fill the inside with a deep layer of dry leaves or needles, because the ground steals heat. Keep the space tight, just enough to lie in. Leave a small entrance and pull a pile of debris or a pack across it from inside.",
        "Lean-to: a faster, open option. Lean poles against a ridgepole or a fallen log, face the open side away from wind, and cover the poles the same way. A lean-to gives less protection. It works best with a fire in front, which sends heat in. Put the fire a safe distance away.",
        "Snow shelter, only if you must and only with a shovel. A quinzhee is a pile of snow that has set, then hollowed out. Keep a vent hole open at the top. Do not block the door. Do not cook inside, because carbon dioxide can build up. Keep a shovel inside to dig out. Mark the outside so nobody walks on the roof."
      ],
      table: { head: ["Shelter", "Good for", "Watch for"], rows: [
        ["Debris hut", "Cold and wet nights, with plenty of leaves", "Takes hours. Needs deep, dry insulation. Keep it small."],
        ["Lean-to", "Quick cover from wind and rain, with a fire", "Open side loses heat. Needs a fire in front."],
        ["Snow shelter", "Deep snow when nothing else works", "Air supply, collapse, wet clothes. Keep a shovel."],
        ["Building, car or official shelter", "Always first choice", "Do not run the engine in a closed space."]
      ] },
      sections: [
        { h: "Snow shelters and avalanche terrain", items: [
          "Most avalanches start on slopes of about 30 to 45 degrees. One avalanche centre treats any slope over 30 degrees as avalanche terrain.",
          "Flat ground can be unsafe if a steeper slope sits above it. Avoid the run-out zone below a slope.",
          "Watch for terrain traps such as gullies, cliffs, trees and rocks, which make burial deeper.",
          "Choose low-angle ground clear of steeper slopes above. Check the local avalanche centre bulletin before you build."
        ] },
        { h: "United States and Portugal", items: [
          "Portugal: many woods and protected areas are fire-risk zones. Do not cut live trees or light fires in the danger season. Ask ICNF or your câmara before camping.",
          "US: public land has rules about cutting trees and camping. In an emergency, use dead material on the ground, not live trees."
        ] }
      ],
      warn: [
        "A tarp or tent you already carry, or a safe building or vehicle, is better than a natural shelter. Natural shelters take hours and energy and can harm protected habitat.",
        "Build a debris shelter only where taking fallen material is legal. Use fallen material from the ground, not live branches.",
        "Never burrow into an unstable snowbank or dig under overhanging snow. Snow shelters need trained partners, ventilation and a check of the snowpack.",
        "Never use a fire, stove or charcoal inside a closed shelter. Carbon monoxide and carbon dioxide can kill.",
        "Do not build under dead branches, in a dry stream bed, or where water can run in.",
        "Change out of wet or sweaty clothes. Cold kills faster than hunger.",
        "A snow shelter can collapse or run short of air. Keep a vent and a shovel."
      ],
      tip: ["Take a short course in shelter building before you need it.", "Keep an emergency blanket and a tarp in your kit."],
      after: ["Leave the site natural when you go. Scatter the debris.", "Check yourself for signs of cold injury."],
      sources: [
        ["Wilderness Awareness: how to build a survival shelter", "https://wildernessawareness.org/articles/how-to-build-a-survival-shelter/"],
        ["Outdoor Hub: how to make a debris hut shelter", "https://outdoorhub.com/?p=5767"],
        ["New Jersey State Parks: building a forest debris hut", "https://nj.gov/dep/parksandforests/education/docs/eo-Building%20a%20Forest%20Debris%20Hut.pdf"],
        ["UBC Varsity Outdoor Club: snow shelters", "https://wiki.ubc-voc.com/Snow_shelter"],
        ["Wikipedia: snow cave", "https://en.wikipedia.org/wiki/Snow_cave"],
        ["REI: reducing risk, how to recognize avalanche terrain", "https://www.rei.com/learn/expert-advice/avalanche-reducing-risk.html"],
        ["US National Park Service: avalanche awareness bulletin", "https://www.nps.gov/lavo/planyourvisit/upload/Avalanche-Awareness-site-bulletin-508.pdf"],
        ["Utah Avalanche Center: terrain over 30 degrees", "https://fuac.utahavalanchecenter.org/sites/default/files/attached_files/Staples.Terrain30.TAR41.2.pdf"]
      ],
      unconfirmed: [
        "The debris hut steps (ridgepole, ribs about 10 to 12 inches apart, lattice, debris) are consistent across the outdoor and park pages seen in search results.",
        "Insulation thickness differs between sources: about one foot to about three feet. We chose three feet as the cautious value.",
        "The snow shelter points (vent, no cooking inside, shovel, mark the roof) come from outdoor-club and Wikipedia pages. Avalanche pages (REI, US National Park Service, Utah Avalanche Center) put most slides on slopes of about 30 to 45 degrees, and flat ground below a steeper slope can still be hit. None of them gives a rule for placing a snow shelter, so check the local avalanche service.",
        "Lean-to details are limited. The 'fire in front' idea comes from one summary.",
        "The user-supplied field manual (AI-written, not independently verified) adds that natural-material shelters are for short-term, fair-to-moderate weather, that a carried tarp is preferred, and that none is guaranteed storm-proof. We follow that caution.",
        "We did not find Portugal-specific guidance on building shelters or on cutting trees."
      ]
    }),
    g({
      id: "wf-shelter-secure", area: "Shelter", icon: "shield", title: "Secure your shelter: site, tarp, wind, rain, flood and snow",
      intro: "A good shelter in the wrong place fails. Choose the site, anchor the tarp or frame, and manage water and wind before the storm arrives.",
      first: [
        "Look up and look down before you set up.",
        "Pitch against wind and rain, on ground that drains.",
        "Anchor every line to something strong. Never to a utility line.",
        "Plan how to leave fast if water or fire comes."
      ],
      do: [
        "Scout the site in good light. Look up for dead branches and weak trees, called widowmakers. Some trees such as beech can drop heavy branches. Look down for dry stream beds, low spots and tide lines where flash floods, high tide or rockfalls can reach you. Check for avalanche slopes in the mountains.",
        "Use natural protection. Big rocks, cliffs and banks cut wind and hold some warmth. Below the tree line is easier to hold a tarp in wind than open ground. Do not stand directly under a single tree.",
        "Pick ground that drains. Water that pools under a shelter is a common failure. Avoid sites that are dished out and compacted from heavy use. Soft layers of leaves or pine needles let rain soak in instead of splashing back. Keep a ground cloth inside the tarp edge, not outside it, or it catches rain.",
        "Pitch low and against the weather. Face the low edge into the wind and rain. Check the tarp, lines and stakes for damage first. Keep the lowest edge close to the ground in wind. Never tie to utilities, fences or fragile branches.",
        "Anchor and tension the lines. Use strong anchors: stakes pushed deep, rocks or logs buried or weighted. Keep the lines tight. Mark each guy line with tape or a flag so no one trips at night. Check lines again after the first gusts.",
        "Manage water. Make sure runoff goes away from where you sleep. Do not dig destructive channels. Sleep on an insulated pad or a bed of dry material, not directly on wet ground.",
        "Keep air and exits. Leave gaps for air to prevent condensation. Do not seal yourself in. Keep the way out clear. Do not place fires or fuel stoves inside. In wind, keep the door away from the wind.",
        "Check after the weather changes. Re-tighten lines, clear snow from the roof so it does not collapse, and move if water rises or a branch cracks. Pack your essentials so you can leave in minutes."
      ],
      sections: [{ h: "Anchors that hold", items: [
        "Stake: set it deep, leaned about 45 to 60 degrees away from the shelter, so the guy line meets it at close to a right angle. Stakes pushed in upright come out in wind.",
        "Rock: lay the line over a large flat rock, push the stake behind it, then stack rocks on the stake. A line wrapped round a big rock is very strong.",
        "Buried anchor (deadman): dig about 12 inches (30 cm), lay the line under a stick, stake or rock, leave a long running end above ground, bury it, and tie off the running end with a hitch. Do not tie the line to the anchor before you bury it.",
        "Snow: bury a log or large stick sideways. Tie a stake in the middle and bury it flat. A buried log is stronger than a bag.",
        "Sand: bury a sack filled with sand with only the cord showing."
      ] }],
      table: { head: ["Hazard", "Check", "Do"], rows: [
        ["Falling branches", "Look up. Dead or heavy branches.", "Move to a clear site."],
        ["Flash flood or high tide", "Dry stream bed, low ground, tide line.", "Go higher. Do not camp in channels."],
        ["Wind", "Open ridge or open field.", "Use rocks, banks or lower ground. Pitch low."],
        ["Rain pooling", "Dished or compacted ground.", "Move to ground that drains. Ground cloth inside the edge."],
        ["Snow load", "Snow on the roof.", "Clear it. Do not let the shelter sag."]
      ] },
      warn: [
        "Do not camp under dead trees, in dry stream beds or on avalanche slopes.",
        "Do not tie to power lines or poles.",
        "Do not surround camp with snares, sharp stakes, tripwires or alarms that could hurt animals or other people.",
        "Do not use these notes to rig rope rescue, climbing anchors, raised sleeping platforms or anything that holds body weight. That needs rated equipment and instruction.",
        "Do not use a fire or stove inside a closed shelter.",
        "In a storm warning, a building or official shelter is safer than any outdoor shelter."
      ],
      tip: ["Practise pitching your tarp at home.", "Carry extra cord and spare stakes.", "In bear country, cook and store food away from where you sleep, use required bear-resistant containers, and remove fish scraps and grease.", "Check clothing, shoes and bedding for ticks and insects. Keep a whistle, light and shoes within reach at night."],
      after: ["Check everyone for cold or wet injuries.", "Dry your gear."],
      sources: [
        ["Section Hiker: campsite selection tips", "https://sectionhiker.com/campsite-selection-tips/"],
        ["Section Hiker: sleep tarp in rain", "https://sectionhiker.com/sleep-tarp-rain/"],
        ["The Hiking Life: five tips for a successful tarp pitch", "https://www.thehikinglife.com/2016/10/five-tips-for-a-successful-tarp-pitch/"],
        ["Outward Bound: tarp shelter guidance", "https://outwardbound.org/blog/?p=11898"],
        ["The Ultimate Hang: using stakes and snow anchors", "https://theultimatehang.com/2014/09/using-stakes-snow-anchors/"],
        ["Andrew Skurka: guyline tension system", "https://andrewskurka.com/guyline-tension-system-backpacking-tents-tarps-hammocks"]
      ],
      unconfirmed: [
        "The hazards (widowmakers, flash floods, tide, rockfall, drainage, wind, tarp pitch, marking guy lines) come from hiking and outdoor-school pages seen in search results.",
        "The user-supplied field manual (AI-written, not independently verified) adds: check stitching, eyelets and cord before pitching, test stakes by pulling in the direction of the expected load, flag lines near paths, retension wet synthetic line, and learn the bowline, taut-line hitch, trucker's hitch and clove hitch with their limits.",
        "Stake and anchor methods (stake leaned 45 to 60 degrees away, rocks, buried deadman) come from outdoor-gear pages seen in search results. Strength depends on the ground and the anchor size, and no tested load figure was found.",
        "The Portugal weather and fire rules were not covered here. See the fire and shelter guides."
      ]
    }),
    g({
      id: "wf-raft-river", area: "Water", icon: "waves", difficulty: "Critical", title: "Cross a river or use a raft: last resort only",
      intro: "Rivers kill more people than people expect. First choice: do not cross. Wait, signal for help, or go around. If you must cross, scout, wear a lifejacket if you have one, and use the safest method. A homemade raft is a last resort.",
      first: [
        "Do not cross moving water if you can wait, go around or be rescued.",
        "Never cross alone if others are with you. Never cross at night or in flood.",
        "Put on a lifejacket if you have one.",
        "Tell someone your plan if you can reach anyone."
      ],
      do: [
        "Decide if you must cross. Ask yourself if you can wait for water to drop, go around, find a bridge or be found. If rescue is possible, stay put. Do not cross in flood. Call 112 or 911 when you can.",
        "Scout the crossing from high ground. Look for a wide, shallow, straight stretch. Heavy timber growth often marks the deepest channel. A ledge of rocks across the river can mean rapids. Avoid crossing above or near a waterfall or a deep channel. Choose a route where you would be carried onto a shallow bank or sandbar if you fall.",
        "Check depth, speed and the bottom. Sources suggest knee-deep water or less for one person, and a little above mid-thigh for a group. Debris can trap or trip you. If the water is above knee deep and fast, do not wade. Wear boots in the river, not bare feet.",
        "If you must wade: prepare and cross carefully. Unfasten your pack hip belt, so you can drop it if you fall. Face upstream, lean on a pole and move one foot at a time. Cross at an angle downstream. Stay together if you are a group.",
        "If you fall, do not fight the current. Float on your back, feet downstream and up, and aim for the shallow side. Do not stand in fast water, because your foot can catch. Swim at an angle to the bank.",
        "A raft only if you have no other choice. A raft can capsize, and capsizing is the main danger. A homemade raft on a big river can meet barges and a coast guard stop. Use it only on slow, calm water, for a short distance, with lifejackets or flotation for everyone, and never in a flood. See the separate raft guide for principles. We found no checked design or load figure.",
        "Think of safer floats. Where the river is deep but slow, improvised flotation, such as a ball or sealed containers, may help a person cross. Check that it holds you. This works only where the current is not swift.",
        "After the crossing, warm up. Change out of wet clothes. Build a fire and dry out. See the fire guides and the hypothermia guide."
      ],
      warn: [
        "Do not cross floodwater. Moving water over knee depth can knock you down.",
        "Cold water can shock the body and cause drowning. Do not swim in cold water if you can avoid it.",
        "Do not tie yourself to a rope or a raft in current. It can drown you.",
        "Rafts can capsize. People have drowned on homemade and inflatable rafts."
      ],
      tip: ["Carry a whistle and a dry bag for your phone.", "A lifejacket is far better than any improvised float."],
      after: ["Warm up and check for cold injury.", "Tell someone where you are."],
      sources: [
        ["Art of Manliness: how to ford a river or stream", "https://www.artofmanliness.com/skills/survival/ford-river-stream/"],
        ["Mental Floss: how to cross a river without a bridge", "https://www.mentalfloss.com/article/53005/how-cross-river-without-bridge"],
        ["Transportation Safety Board of Canada: raft capsize investigation", "https://bst.gc.ca/eng/rapports-reports/marine/2005/m05w0080/m05w0080.html"],
        ["Canadian Safe Boating Council: the 1-10-1 principle", "https://csbc.ca/1-10-1-principle/"],
        ["Washington State Parks: cold water shock and how to protect yourself", "https://parks.wa.gov/about/news-center/field-guide-blog/cold-water-shock-what-it-and-how-protect-yourself"]
      ],
      unconfirmed: [
        "The site-scouting and depth points come from outdoor-skills pages seen in search results. We did not find them in an official or lifesaving source.",
        "Cold-water shock, lifejacket use, floating on your back and unclipping a pack belt are widely taught. We did not find a named lifesaving page in this search. They are general guidance.",
        "The cold-water points (first minute: control the gasp; about 10 minutes of useful movement; about an hour before hypothermia) are the 1-10-1 memory aid from Canadian and Washington State pages. Researchers say the timings are approximate. We found only survival-blog sources for building a raft. See the separate raft guide. A homemade raft can be dangerous.",
        "The coast guard and river-barge points come from a news item about a homemade raft on the Mississippi."
      ],
      status: "general"
    }),
    g({
      id: "wf-plant-method", image: "assets/steps/wf-plant-raft-notes.jpg", area: "Food", icon: "leaf", difficulty: "Critical", title: "How to know which plants can be eaten: the safe method, step by step",
      intro: "There is no quick trick. Smell, colour, animals eating it and folk rules are not safe tests. The safe method is to learn a few plants well, with an expert, before you need them.",
      first: [
        "No simple rule tells edible from poisonous. Do not trust single-feature tests.",
        "Never eat a plant you cannot name with 100 percent certainty.",
        "Do not assume a plant related to an edible one is edible.",
        "Do not rely on a phone photo search or one picture."
      ],
      do: [
        "Learn before you need it. Take a local foraging course, or ask a cooperative extension office or a local botanist. In Portugal, use the Quercus guides and the University of the Algarve book. Practise on a few plants over a year, in different seasons.",
        "Use guides for your own region. Plant ranges differ. A guide for another country can mislead. Use at least three trusted guides, and compare them.",
        "Look at the whole plant. Note the leaf shape, edge, veins and texture, the stem, the flower and its petals, the fruit or seed, the roots and the habitat. Write them down and take photos. Compare each feature with the guide.",
        "Learn the look-alikes. Many edible plants have deadly twins. Wild carrot and poison hemlock look alike: hemlock has a smooth stem with purple blotches and no carrot smell, wild carrot has a hairy stem and smells of carrot when crushed. Death camas bulbs can be mistaken for wild onion or camas. Wild onions smell of onion and have three stamens, death camas has six and no onion smell. Smell alone is not enough to decide.",
        "Check the place. Avoid roadsides, farm edges, industrial land and sprayed areas. Plants take up pollution. Check whether picking is allowed. Parks and protected areas often ban it.",
        "Identify, then prepare correctly. Some plants are edible in one part and poisonous in another. Some need cooking or leaching, like acorns. Prepare as a trusted guide says.",
        "Test your body, only after certain identification. Eat a small amount of a well-identified plant first. Wait. Stop if you feel unwell. Some people are allergic to safe plants.",
        "If you cannot identify it, do not eat it. Use stored food, fishing or other safe food. If someone eats an unknown plant, call the poison centre or emergency services and keep a sample and a photo."
      ],
      sections: [
        { h: "Eight gates before any plant is eaten (from the supplied field manual)", items: [
          "1. Record the place: region, habitat, season, likely look-alikes.",
          "2. Photograph the whole plant where it grows, not a detached leaf.",
          "3. Check traits: leaf arrangement and edge, stem cross-section, sap, flowers, seeds, fruit, roots (only where legal).",
          "4. Use an authoritative flora or regional key. A phone app is a lead, not proof.",
          "5. Compare every plausible dangerous look-alike, not just the edible name. If a diagnostic feature is missing, wait for another season or give up.",
          "6. Cross-check at least two independent expert references for your region, and ideally a local botanist or forager.",
          "7. Check that this part, at this stage, is edible and what processing it needs. Do not guess leaching or cooking.",
          "8. Check landowner consent, legality, protected species and polluted ground. If any gate fails, do not eat it."
        ] },
        { h: "Field record template", items: [
          "Exact place, region, habitat and land permission.",
          "Date, weather, recent frost or rain.",
          "Plant traits: leaves, stem, flowers, fruit, roots.",
          "Candidate scientific name and the reference used.",
          "Look-alikes ruled out, with scientific names and the difference.",
          "Edible part and preparation, with an expert source.",
          "Contamination risk: roadside, farming, industry, dog areas.",
          "Verification: two sources, and an expert where appropriate."
        ] },
        { h: "Groups to avoid until an expert trains you", items: [
          "White-flowered carrot and parsley relatives (poison hemlock and other deadly look-alikes).",
          "Onion- or garlic-like bulbs.",
          "Unknown red, white or black berries. Colour is not a rule.",
          "All wild mushrooms.",
          "Unknown coastal algae or shellfish."
        ] }
      ],
      table: { head: ["Unsafe shortcut", "Why it fails"], rows: [
        ["Animals eat it, so it is safe", "Many plants that animals eat are poisonous to people."],
        ["Smell or taste test", "Some deadly plants taste mild. Taste does not prove safety."],
        ["Touch or small bite test", "A tiny bite of a toxic plant can cause severe illness or death."],
        ["Looks like a plant I know", "Many deadly plants look like edible ones."],
        ["A phone app or one photo", "Photos can be misidentified."]
      ] },
      sections: [
        { h: "Where to learn: United States", items: [
          "State cooperative extension offices give plant identification help and publish guides. Oregon State and Washington State extension publish a bulletin on meadow deathcamas.",
          "Mississippi State and Illinois extension have wild edible plant pages and courses."
        ] },
        { h: "Where to learn: Portugal", items: [
          "Quercus published practical illustrated guides to edible wild herbs and fruits, poisonous herbs and toxic-fruit plants.",
          "The University of the Algarve published 'Plantas silvestres comestíveis do Algarve', about 70 traditionally eaten species. It is a free PDF on the university repository.",
          "A Portuguese book, 'Alimentação, Natureza e Paisagem', covers wild edible and medicinal plants."
        ] }
      ],
      warn: [
        "A mistake can kill. Do not take a chance.",
        "Poison hemlock, water hemlock and death camas have killed people. Water hemlock can pass poison through skin, so wear gloves.",
        "Do not eat any plant with milky sap, white berries or an umbrella-shaped flower head unless an expert identifies it. This is our rule of caution, not a test.",
        "Poison centre: US 1-800-222-1222. Portugal CIAV 800 250 250. In an emergency call 112 or 911."
      ],
      tip: ["Start with plants you can already name for certain.", "Keep a notebook with photos and the date."],
      after: ["If you feel unwell, get help at once.", "Record what you ate and where it grew."],
      sources: [
        ["Oregon State Extension: meadow deathcamas in the Pacific Northwest (PNW 104)", "https://extension.oregonstate.edu/catalog/pub/pnw-104-meadow-deathcamas-pacific-northwest"],
        ["Ask Extension: onion smell and plant identification", "https://ask.extension.org/kb/faq.php?id=867128"],
        ["College of Saint Benedict herbarium: edible wild plants (no rules of thumb)", "https://faculty.csbsju.edu/SSAUPE/essays/edible_wild_plants.pdf"],
        ["Mississippi State Extension: forgotten foods, wild edible plants", "https://extension.msstate.edu/publications/forgotten-foods-introduction-wild-edible-plants"],
        ["University of Galway: smartphone apps cannot identify plant species accurately (2023)", "https://universityofgalway.ie/about-us/news-and-events/news-archive/2023/april/new-study-reveals-smartphone-apps-are-unable-to-identify-plant-species-accurately.html"],
        ["Swipe Right: accuracy of plant identification apps for toxic plants", "https://experts.colorado.edu/display/pubid_306084"],
        ["Long et al. 2023, Clinical Toxicology 61(7): plant identification apps in the American Midwest (PMID 37535032, not independently found)", "https://pubmed.ncbi.nlm.nih.gov/37535032/"],
        ["University of the Algarve: Plantas silvestres comestíveis do Algarve (PDF)", "https://sapientia.ualg.pt/bitstreams/d8ba3262-9b14-4cc8-8490-28afd0d654d4/download"]
      ],
      unconfirmed: [
        "That there are no rules of thumb, that you should not rely on photos, that related plants are not necessarily edible, and that you should avoid roadsides come from a university herbarium guide and extension pages seen in search results.",
        "The death camas versus wild onion points (no onion smell, six stamens versus three) come from extension pages. One extension answer says smell alone should not settle an ID.",
        "The hemlock versus wild carrot differences come from gardening and homestead pages. Check a proper flora.",
        "The Quercus guides and the University of the Algarve book were found in search results. We did not open them.",
        "Phone apps: a 2023 PLOS ONE study (Galway and Leeds) tested six apps on 38 plants, and the best reached about 80 to 88 percent accuracy. A 2021 Journal of Medical Toxicology study tested three apps on 17 toxic species, and the best fully identified 10 of 17. The authors call apps aids, not proof. A further study is cited to us as: Long K, et al. (2023). Plant identification applications do not reliably identify toxic and edible plants in the American Midwest. Clinical Toxicology 61(7): 524-528. PMID 37535032, DOI 10.1080/15563650.2023.2237282. It is reported to have tested 16 plant species, with 58 percent overall species-level accuracy and one app calling five potentially toxic species edible. We could not find this paper ourselves, so we have not checked those figures. It was done in the American Midwest, so its numbers do not describe apps in Portugal or elsewhere. A 2024 Queensland study of 25 real plant exposures found the best app correct for 74 percent of cases and concluded apps are not reliable enough to guide poison-centre advice.",
        "The eight gates, the field record and the groups to avoid come from the user-supplied field manual (AI-written, not independently verified). They match what the extension and herbarium pages we found say: no rules of thumb, use several regional references, avoid look-alikes.",
        "We found nothing on leaf arrangement, sap tests or umbrella flowers as safe indicators. Our caution about milky sap, white berries and umbrella flower heads is our own rule of caution, not a test."
      ]
    }),
    g({
      id: "wf-plants-watch", image: "assets/steps/wf-plant-raft-notes.jpg", area: "Food", icon: "alert", difficulty: "Critical", title: "Plants to know: deadly look-alikes and beginner foods, US and Portugal",
      intro: "This is a short watch list, not an identification guide. Learn each plant from a trusted guide and an expert. Never eat from this list alone.",
      first: [
        "This page is a reminder of dangers. It is not enough to identify any plant.",
        "Learn each plant with a local expert and a regional guide.",
        "If you are not 100 percent sure, do not eat it.",
        "Poison centre: US 1-800-222-1222, Portugal 800 250 250."
      ],
      do: [
        "Learn the deadly pairs first. Wild carrot and poison hemlock, and cowbane or water hemlock. Wild onion and death camas. Learn each pair side by side, from a field guide and an expert. These have killed people.",
        "Know the bitter or raw-unsafe foods. Acorns have tannins and are bitter. They are not recommended raw. Cold or hot leaching removes them. Hot leaching: boil in double the volume of water and change the water until it stays clear. White oak acorns need less leaching than red oak. Do not use acorns with holes or grubs.",
        "Learn a small set of beginner plants well. Beginner guides suggest a handful, such as blackberries, dandelion, nettles, wild garlic and elderflowers. These come from a commercial guide, not an extension service. Check each in your own regional guide first. Cook nettles. Never eat wild garlic you cannot confirm by smell and leaf.",
        "Portugal: treat berries with great care. A Portuguese science-centre article warns that not all wild fruits are edible, and names belladonna, bryony, holly and privet as dangerous. Blackberries are a well-known wild fruit, and one source says to pick them before September. The University of the Algarve book lists fennel (funcho) and strawberry tree (medronheiro) among its 70 traditionally eaten species. A 2007 ethnobotany study of six rural areas in the north-west Iberian Peninsula (five in Spain and one, Montesinho, in Portugal) names sweet chestnut (Castanea sativa), elmleaf blackberry (Rubus ulmifolius) and wild strawberry (Fragaria vesca) among its most significant wild foods, and notes that much of this knowledge is being lost. A related study looked at evidence for eating wild asparagus, curly dock (Rumex crispus), holm oak acorns (Quercus rotundifolia) and Corema album (camarinha). We found no safe-picking steps for them. Learn them from a local guide.",
        "Never eat wild mushrooms without expert identification. In Portugal, permission to pick wild mushrooms depends on who owns the land and on local or protected-area rules. Get permission from the landowner or the managing authority, and check for extra limits. Do not assume one national ICNF licence covers all picking. For example, an old report on Montesinho Natural Park says picking was banned on Wednesdays and between sunset and sunrise, and required open baskets, not plastic bags. That report is old, so check the park. In Portugal a study counted 93 serious mushroom poisonings in 1990 to 2008, and about 11.8 percent of the liver cases died. The deadly death cap, Amanita phalloides, causes most deaths. Its toxins survive cooking, and symptoms can be delayed for hours. Mushroom apps and guides are not enough.",
        "Take a local course. Cooperative extension in the US and groups such as Quercus in Portugal run courses. This is the safest way to learn."
      ],
      table: { head: ["Edible", "Deadly look-alike", "How people tell them apart (check with a guide)"], rows: [
        ["Wild carrot (Queen Anne's lace)", "Poison hemlock, water hemlock", "Hemlock: smooth stem with purple blotches, no carrot smell. Wild carrot: hairy stem, carrot smell."],
        ["Wild onion", "Death camas", "Onion smell. Three stamens. Death camas: no onion smell, six stamens. Smell alone is not enough."],
        ["Edible mushrooms", "Death cap (Amanita phalloides) and others", "Do not eat wild mushrooms without expert identification."],
        ["Safe wild berries", "Belladonna, bryony, holly, privet berries (Portugal)", "Learn from a local guide. Do not eat unknown berries."]
      ] },
      warn: [
        "Do not eat anything from this table without expert help.",
        "Mushroom poisoning can be delayed for hours. Cooking does not make death cap safe.",
        "Water hemlock can poison through skin. Wear gloves.",
        "Poisoning needs urgent care. Call 112 or 911."
      ],
      sections: [
        { h: "Portugal: plants to study with a local expert (not a list to eat from)", items: [
          "Fennel (funcho) and strawberry tree (medronheiro) appear in the University of the Algarve wild-plant book index.",
          "Bramble (Rubus ulmifolius, silva) appears in a 2007 study of traditional wild plant use in the north-west Iberian Peninsula.",
          "Sea fennel (Crithmum maritimum, funcho-marinho) appears in the Flora Digital de Portugal.",
          "These are names to study with a Portuguese guide and a local expert. Presence in a book is not a safe-to-eat test. Learn the look-alikes of each one."
        ] }
      ],
      tip: ["Take photos of leaf, stem, flower and root before you decide.", "Keep a list of the plants you know for certain."],
      after: ["If a person feels ill, call the poison centre or emergency services.", "Keep a sample and a photo."],
      sources: [
        ["Oregon State Extension: meadow deathcamas (PNW 104)", "https://extension.oregonstate.edu/catalog/pub/pnw-104-meadow-deathcamas-pacific-northwest"],
        ["Farmers' Almanac: Queen Anne's lace and its toxic look-alikes", "https://farmersalmanac.com/what-queen-annes-lace"],
        ["Postal.pt: wild fruits, dangers and pleasures", "https://postal.pt/nacional/os-frutos-silvestres-perigos-e-prazeres/"],
        ["Porto repository: mushroom poisoning in Portugal (study)", "https://repositorio-aberto.up.pt/bitstream/10216/71946/2/30720.pdf"],
        ["Traditional knowledge of wild edible plants in the north-west Iberian Peninsula (2007)", "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC1904191/"],
        ["Agroportal: wild mushroom picking in Montesinho gets rules and fines", "https://www.agroportal.pt/cogumelos-silvestres-apanha-em-montesinho-passa-a-ter-regras-e-coimas/"],
        ["WebMD: are acorns safe to eat", "https://www.webmd.com/diet/are-acorns-safe-to-eat"]
      ],
      unconfirmed: [
        "This is a watch list only. The list of beginner plants comes from a commercial beginner's guide. Dandelion, plantain, chickweed, purslane and cattail were not confirmed by a source in our search. We do not list how to identify them.",
        "The acorn leaching steps come from several secondary sites and differ on timing.",
        "The Portuguese mushroom figures (93 cases, 11.8 percent of the liver cases) come from a Portuguese study summarised in a search result. We did not open it.",
        "The Portuguese berry list comes from a science-centre article in a search summary. We did not find an official Portuguese safe-picking guide. Fennel and strawberry tree appear in the book index, and the book says it is not exhaustive. Beldroega (purslane) and nettle were not confirmed in the book by our search.",
        "Hemlock versus wild carrot, and death camas versus wild onion, come from gardening pages and extension pages. Check each with a proper flora.",
        "The Portugal study list comes from the user-supplied field manual (AI-written). We confirmed only that fennel and strawberry tree are in the Algarve book index, bramble is in the 2007 study, and sea fennel is in the Flora Digital. We did not confirm that any of them is safe to eat or give identification keys."
      ]
    }),
    g({
      id: "wf-field-kitchen", area: "Food", icon: "can", title: "Prep, cook, store and clean in the field",
      intro: "Wild food and camp cooking spoil fast. Keep hands, tools and food clean, cook to a safe heat, store cold and dry, and wash up away from water sources and animals.",
      first: [
        "Wash your hands with soap and safe water before you prepare food.",
        "Boil or treat all water you cook with or drink.",
        "Keep raw and cooked food apart.",
        "Cook meat and fish through."
      ],
      do: [
        "Set up a clean area. Choose flat ground away from your sleeping place and your water. Put down a clean cloth or a board. Keep a pot of safe water, soap and a cloth for hands. Keep animals and flies off food.",
        "Prepare food safely. Wash hands with soap and safe water. Use a separate board and knife for raw meat and fish. Wash wild plants well and cook them. Cut away damaged parts. Do not eat anything you cannot identify.",
        "Cook to a safe heat. Fish to 145 F (63 C). Wild game to 165 F (74 C) as a cautious target. Poultry to 165 F (74 C). Boil water for 1 minute, or 3 minutes above 6,500 ft (2,000 m). Cook over coals and use a grate or pot stand. See the fire and cooking guides.",
        "Keep food safe to eat. Eat fresh food first. A fridge or cooler keeps food safe about 4 hours without power, so do not leave warm food out. Do not leave perishable food out more than 2 hours, or 1 hour when it is above 90 F (32 C) (USDA food safety rule). Keep food cold in a cooler, in a stream in a sealed bag, or buried in shade.",
        "Store and carry food. Dry or smoke extra meat and fish, only with a tested method. See the smoke, dry and salt guide. Keep dried food dry and sealed. Hang food bags away from your shelter, to keep animals away.",
        "Clean up. Wash dishes and tools with soap and safe water, away from streams and lakes. Throw wash water on the ground, not in water. Bury or bag waste and scraps. Do not leave food that attracts animals.",
        "Wash hands and check your health. Wash your hands again. Watch for stomach illness after eating. If someone has vomiting or diarrhoea, give safe fluids and get help.",
        "Prepare for the next meal. Boil more water, keep the fire tended or safely out, and re-pack food and tools."
      ],
      table: { head: ["Food", "Cook or treat to"], rows: [
        ["Water", "Rolling boil 1 minute (3 minutes above 6,500 ft)"],
        ["Fish", "145 F (63 C) inside"],
        ["Wild game", "165 F (74 C) as a cautious target"],
        ["Poultry", "165 F (74 C)"],
        ["Fridge food in a power cut", "About 4 hours cold. Freezer about 48 hours full."]
      ] },
      warn: [
        "Do not eat raw or undercooked wild meat or freshwater fish.",
        "Do not wash dishes in a stream or lake.",
        "Do not keep food in your sleeping area. Animals can follow the smell.",
        "Do not cook inside a closed shelter.",
        "Do not drink or cook with water that has a green scum, paint-like film or bad smell. Algal blooms can make toxins that boiling does not remove. Use another source.",
        "Keep two clear containers or marks: DIRTY water and TREATED water. Never mix them up."
      ],
      tip: ["Carry soap, a cloth and a small pot just for water.", "Keep a thermometer if you can."],
      after: ["Check that the fire is out.", "Dry your tools and cloth."],
      sources: [
        ["CDC: boil water and find clean water in an emergency", "https://www.cdc.gov/water-emergency/about/how-to-find-clean-water-in-an-emergency.html"],
        ["CDC: preventing parasites from freshwater fish", "https://www.cdc.gov/parasites/clonorchis/prevent.html"],
        ["USDA FSIS: keeping food safe in an emergency", "https://www.fsis.usda.gov/es/node/3347"],
        ["Penn State Extension: proper field dressing and handling of wild game and fish", "https://extension.psu.edu/proper-field-dressing-and-handling-of-wild-game-and-fish"]
      ],
      unconfirmed: [
        "The boiling times, 145 F for fish and the 4-hour and 48-hour fridge and freezer times come from CDC and food-safety pages seen in search results.",
        "The 2-hour and 1-hour (above 90 F) rule matches USDA food-safety guidance found in search. The algal bloom warning comes from EPA material seen in search. The 165 F for wild game, hanging food, washing dishes away from water and animal-proofing are common practice and general guidance. We did not find a named source for them in this research.",
        "We found no Portugal-specific field cooking guidance."
      ]
    })
  ];
  window.LOAD_WILDFOOD2 = G;
  if (window.LOAD_CORE) { window.LOAD_CORE.guides = window.LOAD_CORE.guides.concat(G); }
})();
