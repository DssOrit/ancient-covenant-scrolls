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
      id: "wf-raft-build", area: "Water", icon: "waves", title: "A simple log raft: principles and limits (last resort)",
      intro: "Use this only if you have no safe way to cross or get out, the water is slow and calm, and the distance is short. A raft can capsize. We found no checked plan or load figure, so treat these steps as principles, not a design.",
      first: [
        "Try to cross another way, wait or be rescued first. See the river guide.",
        "Wear a lifejacket if you have one. Do not raft in a flood or fast water.",
        "Test the raft in shallow water before you trust it.",
        "Do not raft on a busy river with boats or barges."
      ],
      do: [
        "Choose logs. Pine, spruce and cedar float better than oak, maple or hickory. Pick dry, dead, sound logs. Check for rot, cracks and insects. Bark can soak up water, so peeling it can help.",
        "Lay out the frame. Lay several logs side by side, and put cross-pieces on top and below. Keep the logs about the same size and length. Lay them so that the thick ends are even.",
        "Lash it tight. The strength of a raft depends on the lashing. Sources recommend a square lashing, started with a clove hitch, and finished with frapping turns that pull the joint tight. Re-tighten the lashings after the first test.",
        "Add buoyancy only if you must. Sources suggest sealed plastic barrels, tied-off plastic bags packed with brush, or foam. They disagree on where to put barrels. If you add them, tie them so they cannot slip out.",
        "Test it in shallow water. Stand on it with the load you will carry. If the raft sits very low or tips, add more floatation or logs. Spread weight evenly. A finished log raft can weigh hundreds of pounds, so you must be able to launch it.",
        "Make a paddle or pole. A long branch with a flat piece of wood lashed across one end works as a paddle. A pole helps in shallow, slow water.",
        "Cross only in calm conditions. Cross in daylight, in slow water, where you can see the far bank and a landing spot. Keep gear tied to the raft. Do not tie yourself to the raft.",
        "After crossing, warm up. Change out of wet clothes. Light a fire and dry out. See the fire guides and the hypothermia guide."
      ],
      warn: [
        "Rafts capsize. People have drowned on homemade and inflatable rafts.",
        "Cold water can shock the body within the first minute. A lifejacket keeps your head up.",
        "Do not tie yourself or your gear to the raft in a way that can trap you.",
        "Do not use a raft near weirs, waterfalls, rapids or boat traffic."
      ],
      tip: ["A lifejacket and a whistle weigh far less than a raft.", "A shorter crossing is always safer."],
      after: ["Take the raft apart or leave it safely.", "Tell someone where you are."],
      sources: [
        ["Battlbox: how to build a raft in the wilderness", "https://www.battlbox.com/blogs/preparedness/how-to-build-a-raft-in-the-wilderness-a-comprehensive-guide"],
        ["American Outdoor Guide: three ways of making a survival raft", "https://www.americanoutdoor.guide/survival-skills/equipment/3-ways-of-making-a-survival-raft/"],
        ["Transportation Safety Board of Canada: raft capsize investigation", "https://bst.gc.ca/eng/rapports-reports/marine/2005/m05w0080/m05w0080.html"],
        ["Washington State Parks: cold water shock", "https://parks.wa.gov/about/news-center/field-guide-blog/cold-water-shock-what-it-and-how-protect-yourself"]
      ],
      unconfirmed: [
        "The log choice, square lashing with clove hitch and frapping, buoyancy add-ons and testing come from survival blogs and a forum seen in search results. No official or tested source was found.",
        "We found no safe load figure and no source that says calm water only. The calm-water and daylight limits are our reasoning.",
        "The cold water shock point comes from a Washington State Parks page seen in search results.",
        "We could not confirm the paddle design beyond a one-line description."
      ],
      status: "general"
    })
  ];
  window.LOAD_WILDFOOD3 = G;
  if (window.LOAD_CORE) { window.LOAD_CORE.guides = window.LOAD_CORE.guides.concat(G); }
})();
