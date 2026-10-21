/* Wild-food series part 3: named plants with look-alikes (US) and a raft guide, from a second research round on 24 Oct 2026.
   Search results only; pages were not opened. Many sources are blogs, so each plant is marked and the rule stays: identify with certainty or do not eat. */
(function () {
  var CD = "24 Oct 2026";
  var OWN = "Items marked 'general guidance' or 'our reasoning' are common-sense advice. They are not taken from a named source.";
  function g(o) {
    o.difficulty = o.difficulty || "Critical"; o.status = o.status || "partly"; o.checkedOn = CD;
    o.unconfirmed = (o.unconfirmed || []).concat([OWN]); o.tip = o.tip || []; o.after = o.after || []; o.warn = o.warn || [];
    o.sections = o.sections || []; o.sources = o.sources || []; o.source = (o.sources[0] && o.sources[0][1]) || "https://www.ready.gov/"; return o;
  }
  var G = [
    g({
      id: "wf-plants-us", area: "Food", icon: "leaf", title: "Six wild plants and their look-alikes: dandelion, plantain, nettle, purslane, cattail, wild garlic",
      intro: "These are commonly named beginner plants. Each has a look-alike that is harmful. This is a study aid. Learn each one in the field with an expert and a guide for your region. If you are not 100 percent sure, do not eat it.",
      first: [
        "If you are not 100 percent sure, do not eat it.",
        "Check every feature, not one. A single test, such as smell, can mislead.",
        "Learn each plant with an expert in the field and a regional guide.",
        "Avoid roadsides, farms, sprayed ground and polluted water."
      ],
      do: [
        "Dandelion. Leaves are jagged and grow in a rosette. The flower stem is hollow and unforked, with one flower per stem. The look-alike cat's ear has forked, solid flower stems with several blooms, and hairy lobed leaves. Sources disagree on how harmful the look-alikes are. Every part of a dandelion is described as edible, but check each feature.",
        "Plantain (Plantago). Leaves grow in a rosette and have about five parallel veins running along the leaf. Young leaves are best, and older leaves are stringy. The look-alike to fear is foxglove, which is toxic: its leaves are larger, hairy, jagged and lack the strong parallel veins. Pick only a rosette with parallel veins and no hairs.",
        "Stinging nettle. Leaves are opposite, pointed and coarsely toothed, and the plant stings. Wear gloves and use scissors. Pick before it flowers. Cooking or drying removes the sting. Look-alikes include clearweed (no sting, not toxic), wood nettle (alternate leaves), white snakeroot (poisonous) and, in some regions, horse nettle, which has a toxic substance. The sting is a clue, but check every feature.",
        "Purslane. It lies flat, with fleshy, smooth-edged leaves and elastic stems with no hairs. The harmful look-alike is spotted or prostrate spurge. When you break a spurge stem, milky white sap comes out. Purslane sap is clear. Spurge stems are thin and tough, and its leaves can be serrated. Thin spurge may not show sap, so use all the features. Spurge can cause vomiting and diarrhoea.",
        "Cattail (Typha). The sure sign is the brown cigar-shaped flower spike. The look-alikes are blue flag and yellow flag iris, and all parts of iris are toxic. Iris stems are flattened or oval, not round, and iris has no cigar spike. Young shoots, before the spike forms, are the most risky stage to mistake. Sweet flag is a non-toxic look-alike with a sweet, spicy smell. Cattails take up pollution from the water, so avoid runoff, farm ditches and roadsides.",
        "Wild garlic (Allium ursinum, mainly Europe). Leaves have a stalk and smell of garlic when crushed. The deadly look-alikes are autumn crocus, which has no leaf stalk, a spear-shaped leaf and no garlic smell, and lily of the valley, which has two or three leaves around one stem and no garlic smell. Three or four autumn crocus leaves can be fatal, and symptoms are delayed. Do not rely on smell alone. One crushed leaf can leave garlic smell on your fingers, so the next leaf may seem to smell of garlic.",
        "Prepare and test with care. Wash and cook what needs cooking. Eat a very small amount of a well-identified plant first. Some people react even to safe plants.",
        "If you made a mistake or are unsure, act. Stop eating. Call the poison centre (US 1-800-222-1222, Portugal 800 250 250) or emergency services (112 or 911). Keep a sample and a photo."
      ],
      table: { head: ["Plant", "Harmful look-alike", "Check"], rows: [
        ["Dandelion", "Cat's ear and others (sources disagree on harm)", "Hollow unforked stem, single flower, jagged leaves"],
        ["Plantain", "Foxglove (toxic)", "Parallel veins, no hairs, smooth edge"],
        ["Stinging nettle", "White snakeroot (poisonous), horse nettle in some regions", "Opposite leaves, toothed, stings"],
        ["Purslane", "Spotted or prostrate spurge", "Clear sap, smooth leaves, hairless stem"],
        ["Cattail", "Blue flag and yellow flag iris (toxic)", "Cigar-shaped brown spike, round stem"],
        ["Wild garlic", "Autumn crocus (deadly), lily of the valley", "Leaf stalk, garlic smell on each leaf, but smell can mislead"]
      ] },
      warn: [
        "A mistake with autumn crocus, hemlock or death camas can kill.",
        "Do not eat a plant because it matches one feature on this page.",
        "Do not eat foxglove, iris, spurge or snakeroot. Do not touch water hemlock without gloves.",
        "Pregnant people and people on blood thinners should ask a doctor before eating some plants, such as plantain, which one source flags."
      ],
      tip: ["Learn one plant a season, with an expert.", "Photograph leaf, stem, flower and root together."],
      after: ["If you feel ill, call the poison centre or emergency services.", "Write down what you ate."],
      sources: [
        ["Mississippi State Extension: purslane versus spurge (P4175)", "https://extension.msstate.edu/sites/default/files/document/2026-02/P4175_web.pdf"],
        ["German Federal Institute for Risk Assessment (BfR): wild garlic and poisonous doppelgangers", "https://www.bfr.bund.de/en/press-release/wild-garlic-poisonous-doppelgangers/"],
        ["Toxinfo (Switzerland): toxic look-alikes of wild garlic", "https://www.toxinfo.ch/wild_garlics_toxic_lookalikes"],
        ["Practical Self Reliance: identifying dandelions and look-alikes", "https://practicalselfreliance.com/dandelion-identification/"],
        ["Farmers' Almanac: wild edible cattails", "https://www.farmersalmanac.com/cooking-wild-edible-cattails"],
        ["Wild Edible: stinging nettle, where to find and how to identify", "https://www.wildedible.com/node/516"],
        ["Wild Edible: plantain", "https://www.wildedible.com/wild-food-guide/plantain"]
      ],
      unconfirmed: [
        "Only the purslane versus spurge point (milky sap, spurge poisonous) and the wild garlic look-alikes (BfR and Toxinfo) come from an extension or government health source. The rest come from blogs, homestead sites and reference pages, which can be wrong or disagree.",
        "Dandelion: sources disagree on whether the look-alikes are harmful. One mentions cat's ear causing a horse condition. No extension page was found.",
        "Plantain: one source says it has no toxic look-alikes, then lists foxglove. We follow the cautious one. The advice for pregnancy and blood thinners comes from one non-authoritative source.",
        "Nettle: the cooking time was not found. We say cooking or drying removes the sting, as the pages say.",
        "Cattail: iris stem shape differs between sources (oval, flattened or D-shaped). Use the cigar spike and an expert.",
        "Wild garlic and its look-alikes come from German-speaking countries and Croatia. We found no source for Portugal."
      ]
    }),
    g({
      id: "wf-raft-build", area: "Water", icon: "waves", title: "Rafts: why they fail, and a safe tabletop buoyancy demonstration",
      intro: "A homemade raft is not a rescue boat. Buoyancy alone says little about stability, current, swamping, cold shock or steering. This guide teaches why rafts fail and lets you study the physics safely. It does not tell you how to launch one.",
      first: [
        "Do not launch a homemade raft into a river, reservoir, surf or cold open water.",
        "Ask first: must you cross at all? Find a bridge, a ferry, or wait and call for rescue.",
        "If you do use any boat, wear an approved life jacket.",
        "Never tie people to a raft or a rope while crossing moving water."
      ],
      do: [
        "Ask if crossing is necessary. Look for a bridge, a road, an authorised ferry or a known safe crossing. Delaying and calling for help is often safer than crossing.",
        "Check the water. Look at the current, depth, cold, strainers (trees and debris the water pushes through), submerged obstacles, tides, release structures and where you would come ashore if you fell in. If the water is fast, opaque, high or rising, or above knee level, or the weather is getting worse, do not cross.",
        "Check what you have. Without approved life jackets, a support crew, a rescue plan and a safe place to launch and land, do not launch a raft. If you must cross, ask for rescue instead of trusting homemade flotation.",
        "Learn the physics with a model. An object floats when the water it pushes aside weighs as much as the whole load. One litre of fully submerged, sealed volume gives about one kilogram of ideal lift. That is not a safe load. A real safe load must subtract the weight of the raft, leave a large reserve, allow for uneven loads and movement, and include the effect of waves and current.",
        "Do the tabletop demonstration, indoors only. Use a shallow basin, capped small bottles, string, a board and small weights. Fix the bottles symmetrically under the board so they cannot roll. Put weights in the centre, then toward one edge, and watch the tilt, how low it sits and where it fails. Change the width, the spare flotation and the load spread and see which stays level in still water.",
        "Understand the limits of the model. It cannot predict rivers, waves, leaks, cold-water exposure or how people move on a real raft.",
        "Learn why television raft builds fail. Too little freeboard (the raft sits too low and swamps when anyone moves). Loose logs or barrels that shift and roll the raft. No way to steer, so the current pushes it into debris. Cold shock, which can stop even a good swimmer from swimming. No legal right to cut trees, launch or travel on that water.",
        "If anyone ends up in cold water, act. Float on your back with your face clear, control your breathing for the first minute, and get out as soon as you can. Call 112 or 911 for help. See the river guide."
      ],
      table: { head: ["Why rafts fail", "What happens"], rows: [
        ["Too little freeboard", "Swamps when people move"],
        ["Loose flotation", "Rolls and tips at once"],
        ["No steering", "Current pushes it onto debris"],
        ["Cold shock", "Even strong swimmers cannot swim"],
        ["No legal access", "Cutting trees, launching or travel may be banned"]
      ] },
      warn: [
        "Do not treat a homemade raft as a rescue boat.",
        "Do not tie anyone to a raft or rope in moving water.",
        "Do not use a raft to enter floodwater, surf or open sea.",
        "Wear an approved life jacket on any boat and get training.",
        "Moving water, debris, a sudden rise or rain upstream: no crossing. Cold water, poor visibility or unknown hazards: no entry. A flooded ford is not a safe alternative.",
        "If you must cross a waterway, go back to a bridge or maintained crossing that is officially open. If you are stranded, stay on high ground and call 911 or 112. Do not improvise a rescue crossing."
      ],
      tip: ["A life jacket and a whistle weigh far less than a raft.", "Take a water-rescue course."],
      after: ["Keep the model for teaching others.", "Tell someone where you are."],
      sources: [
        ["Transportation Safety Board of Canada: raft capsize investigation", "https://bst.gc.ca/eng/rapports-reports/marine/2005/m05w0080/m05w0080.html"],
        ["Washington State Parks: cold water shock", "https://parks.wa.gov/about/news-center/field-guide-blog/cold-water-shock-what-it-and-how-protect-yourself"],
        ["Canadian Safe Boating Council: the 1-10-1 principle", "https://csbc.ca/1-10-1-principle/"],
        ["US Coast Guard: life jacket wear", "https://uscgboating.org/recreational-boaters/life-jacket-wear-wearing-your-life-jacket.php"]
      ],
      unconfirmed: [
        "This guide replaced an earlier version that listed raft building steps from survival blogs. The user-supplied field manual argues that rafts are disproportionately dangerous and should not be taught as a launch method, so we switched to why they fail and a model.",
        "The buoyancy figure (1 litre of sealed volume is about 1 kilogram of ideal lift, not a safe load) and the list of failure causes come from that supplied manual. We did not find them in an independent engineering source. The physics is standard.",
        "The Canadian report (a raft capsize with a death) and the cold-water pages were found in search results.",
        "We did not verify the US Coast Guard life jacket page beyond its title in search results.",
        "The no-crossing, no-entry and flooded-ford lines come from the second user-supplied document (Portugal plant study and raft safety, AI-written, not independently verified). They match the first manual."
      ],
      status: "general"
    })
  ];
  window.LOAD_WILDFOOD3 = G;
  if (window.LOAD_CORE) { window.LOAD_CORE.guides = window.LOAD_CORE.guides.concat(G); }
})();
