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
        { h: "United States and Portugal", items: [
          "Portugal: many woods and protected areas are fire-risk zones. Do not cut live trees or light fires in the danger season. Ask ICNF or your câmara before camping.",
          "US: public land has rules about cutting trees and camping. In an emergency, use dead material on the ground, not live trees."
        ] }
      ],
      warn: [
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
        ["Wikipedia: snow cave", "https://en.wikipedia.org/wiki/Snow_cave"]
      ],
      unconfirmed: [
        "The debris hut steps (ridgepole, ribs about 10 to 12 inches apart, lattice, debris) are consistent across the outdoor and park pages seen in search results.",
        "Insulation thickness differs between sources: about one foot to about three feet. We chose three feet as the cautious value.",
        "The snow shelter points (vent, no cooking inside, shovel, mark the roof) come from outdoor-club and Wikipedia pages. We found nothing on avalanche risk for snow shelters. Check the local avalanche service before you build in the mountains.",
        "Lean-to details are limited. The 'fire in front' idea comes from one summary.",
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
        "Do not use a fire or stove inside a closed shelter.",
        "In a storm warning, a building or official shelter is safer than any outdoor shelter."
      ],
      tip: ["Practise pitching your tarp at home.", "Carry extra cord and spare stakes."],
      after: ["Check everyone for cold or wet injuries.", "Dry your gear."],
      sources: [
        ["Section Hiker: campsite selection tips", "https://sectionhiker.com/campsite-selection-tips/"],
        ["Section Hiker: sleep tarp in rain", "https://sectionhiker.com/sleep-tarp-rain/"],
        ["The Hiking Life: five tips for a successful tarp pitch", "https://www.thehikinglife.com/2016/10/five-tips-for-a-successful-tarp-pitch/"],
        ["Outward Bound: tarp shelter guidance", "https://outwardbound.org/blog/?p=11898"]
      ],
      unconfirmed: [
        "The hazards (widowmakers, flash floods, tide, rockfall, drainage, wind, tarp pitch, marking guy lines) come from hiking and outdoor-school pages seen in search results.",
        "We did not find named guidance on stake types, anchor strength or line tension. The anchor and tension steps are general guidance.",
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
        "A raft only if you have no other choice. A raft can capsize, and capsizing is the main danger. A homemade raft on a big river can meet barges and a coast guard stop. Use it only on slow, calm water, for a short distance, with lifejackets or flotation for everyone, and never in a flood. We give no build plan, because we found no checked source for one.",
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
        ["Transportation Safety Board of Canada: raft capsize investigation", "https://bst.gc.ca/eng/rapports-reports/marine/2005/m05w0080/m05w0080.html"]
      ],
      unconfirmed: [
        "The site-scouting and depth points come from outdoor-skills pages seen in search results. We did not find them in an official or lifesaving source.",
        "Cold-water shock, lifejacket use, floating on your back and unclipping a pack belt are widely taught. We did not find a named lifesaving page in this search. They are general guidance.",
        "We found no checked source for building a raft, so this guide gives no raft plan. A homemade raft can be dangerous.",
        "The coast guard and river-barge points come from a news item about a homemade raft on the Mississippi."
      ],
      status: "general"
    }),
    g({
      id: "wf-plant-method", area: "Food", icon: "leaf", difficulty: "Critical", title: "How to know which plants can be eaten: the safe method, step by step",
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
        ["University of the Algarve: Plantas silvestres comestíveis do Algarve (PDF)", "https://sapientia.ualg.pt/bitstreams/d8ba3262-9b14-4cc8-8490-28afd0d654d4/download"]
      ],
      unconfirmed: [
        "That there are no rules of thumb, that you should not rely on photos, that related plants are not necessarily edible, and that you should avoid roadsides come from a university herbarium guide and extension pages seen in search results.",
        "The death camas versus wild onion points (no onion smell, six stamens versus three) come from extension pages. One extension answer says smell alone should not settle an ID.",
        "The hemlock versus wild carrot differences come from gardening and homestead pages. Check a proper flora.",
        "The Quercus guides and the University of the Algarve book were found in search results. We did not open them.",
        "We found nothing on leaf arrangement, sap tests or umbrella flowers as safe indicators. Our caution about milky sap, white berries and umbrella flower heads is our own rule of caution, not a test."
      ]
    }),
    g({
      id: "wf-plants-watch", area: "Food", icon: "alert", difficulty: "Critical", title: "Plants to know: deadly look-alikes and beginner foods, US and Portugal",
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
        "Portugal: treat berries with great care. A Portuguese science-centre article warns that not all wild fruits are edible, and names belladonna, bryony, holly and privet as dangerous. Blackberries are a well-known wild fruit, and one source says to pick them before September. Medronho, acorn and chestnut are traditional foods in Portugal, but we did not find a safe-picking source. Learn them from a local guide.",
        "Never eat wild mushrooms without expert identification. In Portugal a study counted 93 serious mushroom poisonings in 1990 to 2008, and about 11.8 percent of the liver cases died. The deadly death cap, Amanita phalloides, causes most deaths. Its toxins survive cooking, and symptoms can be delayed for hours. Mushroom apps and guides are not enough.",
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
      tip: ["Take photos of leaf, stem, flower and root before you decide.", "Keep a list of the plants you know for certain."],
      after: ["If a person feels ill, call the poison centre or emergency services.", "Keep a sample and a photo."],
      sources: [
        ["Oregon State Extension: meadow deathcamas (PNW 104)", "https://extension.oregonstate.edu/catalog/pub/pnw-104-meadow-deathcamas-pacific-northwest"],
        ["Farmers' Almanac: Queen Anne's lace and its toxic look-alikes", "https://farmersalmanac.com/what-queen-annes-lace"],
        ["Postal.pt: wild fruits, dangers and pleasures", "https://postal.pt/nacional/os-frutos-silvestres-perigos-e-prazeres/"],
        ["Porto repository: mushroom poisoning in Portugal (study)", "https://repositorio-aberto.up.pt/bitstream/10216/71946/2/30720.pdf"],
        ["WebMD: are acorns safe to eat", "https://www.webmd.com/diet/are-acorns-safe-to-eat"]
      ],
      unconfirmed: [
        "This is a watch list only. The list of beginner plants comes from a commercial beginner's guide. Dandelion, plantain, chickweed, purslane and cattail were not confirmed by a source in our search. We do not list how to identify them.",
        "The acorn leaching steps come from several secondary sites and differ on timing.",
        "The Portuguese mushroom figures (93 cases, 11.8 percent of the liver cases) come from a Portuguese study summarised in a search result. We did not open it.",
        "The Portuguese berry list comes from a science-centre article in a search summary. We did not find an official Portuguese safe-picking guide.",
        "Hemlock versus wild carrot, and death camas versus wild onion, come from gardening pages and extension pages. Check each with a proper flora."
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
        "Keep food safe to eat. Eat fresh food first. A fridge or cooler keeps food safe about 4 hours without power, so do not leave warm food out. Do not keep cooked food more than 2 hours in warm weather (general guidance). Keep food cold in a cooler, in a stream in a sealed bag, or buried in shade.",
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
        "Do not cook inside a closed shelter."
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
        "The 165 F for wild game, the 2-hour limit for cooked food in warm weather, hanging food, washing dishes away from water and animal-proofing are common practice and general guidance. We did not find a named source for them in this research.",
        "We found no Portugal-specific field cooking guidance."
      ]
    })
  ];
  window.LOAD_WILDFOOD2 = G;
  if (window.LOAD_CORE) { window.LOAD_CORE.guides = window.LOAD_CORE.guides.concat(G); }
})();
