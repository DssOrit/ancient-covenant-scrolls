/* Part 11E: Traditional bamboo fishing equipment, an educational section kept separate from Part 11A to 11D.
   Three traditional ideas are explained: hollow bamboo funnel traps, historical bamboo gorge hooks and multi-pronged bamboo spears.
   Written 29 Oct 2026 at the owner request. They are described as traditional knowledge. No device is called legal, effective, humane or safe.
   Nothing here is a beginner procedure. Legal status is never assumed. Verification labels follow Part 8D. Not legal advice. */
(function () {
  var LINKED = "OFFICIAL SOURCE LINKED BUT NOT OPENED";
  var UNV = "DATA UNVERIFIED";
  var PENDING = "DEVICE TEST PENDING";
  var CALL = "In danger to life, call 911 (US) or 112 (Portugal) first, if the phone works.";
  var SRC = {
    fwc: ["Florida FWC: freshwater fishing regulations (" + LINKED + ")", "https://myfwc.com/fishing/freshwater/regulations/"],
    fwcBait: ["Florida FWC: taking bait (" + LINKED + ")", "https://myfwc.com/fishing/freshwater/regulations/taking-bait/"],
    dgrmGear: ["Portugal DGRM: permitted and prohibited recreational marine fishing gear (" + LINKED + ")", "https://dgrm.pt/pt/web/guest/artes-e-utensilios-de-pesca"],
    dgrmLic: ["Portugal DGRM: recreational licences (" + LINKED + ")", "https://dgrm.pt/licencas"],
    dgrmZones: ["Portugal DGRM: map jurisdiction and the freshwater distinction (" + LINKED + ")", "https://www.dgrm.pt/web/guest/zonas-de-pesca"],
    cdcFluke: ["CDC: Fasciola liver flukes (" + LINKED + ")", "https://www.cdc.gov/liver-flukes/hcp/clinical-overview-fasciola/index.html"]
  };
  var G = [];
  function add(g) { g.checkedOn = "29 Oct 2026"; g.status = "partly"; g.difficulty = g.difficulty || "Advanced"; g.icon = g.icon || "water"; g.source = g.sources.length ? g.sources[0][1] : ""; G.push(g); }
  var PLACES = [
    ["Lisboa, Portugal", "DGRM for sea waters; ICNF and the local authority for inland waters"],
    ["Porto, Portugal", "DGRM for sea waters; ICNF and the local authority for inland waters"],
    ["Coimbra, Portugal", "ICNF for fresh water (Mondego); DGRM for sea waters"],
    ["Setúbal, Portugal", "DGRM, ICNF and the protected-area rules"],
    ["Los Angeles (city), California", "California Department of Fish and Wildlife"],
    ["San Pedro, California", "California Department of Fish and Wildlife (coastal marine rules and closures)"],
    ["Palmdale, California", "California Department of Fish and Wildlife"],
    ["Valencia (Santa Clarita), California", "California Department of Fish and Wildlife"],
    ["Jacksonville, Florida", "Florida Fish and Wildlife Conservation Commission (salt and fresh water differ)"],
    ["Orlando, Florida", "Florida Fish and Wildlife Conservation Commission (freshwater rules)"],
    ["Conway, South Carolina", "South Carolina Department of Natural Resources"],
    ["Ohio (statewide, pick a county)", "Ohio Department of Natural Resources and county park rules"]
  ];

  add({ id: "p11e-bamboo-fishing", area: "Food • Bamboo fishing", title: "Part 11E: Traditional bamboo fishing equipment (traditional knowledge, check the rules first)",
    intro: "People have used bamboo tools to catch fish for a very long time. This section explains three of them as traditional knowledge: the hollow-culm funnel trap, the gorge hook and the multi-pronged spear. It does not say any of them is legal, effective, humane or safe, and it is not a beginner how-to. Where you may fish, and with what, depends on the exact water and the exact rule. Safer, lawful alternatives come first.",
    first: [
      CALL,
      "LEGAL STATUS UNVERIFIED for every place in this app. Do the 7 checks below before you use any method.",
      "Safer first: rod and line with a modern hook where the rules allow it. It is easier to check and more selective.",
      "A rule that allows a trap or spear in one water can ban it in the next. In Portugal, recreational sea fishing bans traps such as baskets, pots and cages. Florida allows certain freshwater traps, setlines and hand-held spears for named fish in named places under detailed limits.",
      "Do not wade into fast or deep water for any method. Every frame has a picture. None shows a trap, hook or spear in use."
    ],
    do: [
      "Check 1. Country, state and the exact waterbody. A mapped river does not mean public access.",
      "Check 2. The gear you may use there: trap, hook, spear, line, net, bait.",
      "Check 3. Whether a fishing licence or permission is needed.",
      "Check 4. Which species and seasons are allowed, and size and bag limits.",
      "Check 5. Fish-consumption advice and any closure, pollution or algae warning.",
      "Check 6. Land access and the owner permission.",
      "Check 7. Conservation limits: protected areas, protected species, migration routes.",
      "If any check cannot be answered, write LEGAL STATUS UNVERIFIED on your paper. Choose a method you can verify, or another food source. If you go ahead anyway, you carry the risk and the duty to keep every piece of gear safe and removed.",
      "Frame 1. Safe material inspection: look over the bamboo for cracks, splits, decay, insects and sharp splinters.",
      "Frame 2. Bamboo handling: eye protection, gloves, long sleeves and boots. Cut on a stable bench with a maintained hand tool, never in water.",
      "Frame 3. Read the local fishing rules at the access point or from an official page. Write down the answers.",
      "Frame 4. A lawful alternative: rod and line with a modern hook, from dry, stable ground, where it is permitted.",
      "Frame 5. Check the catch against size and species rules, release protected fish quickly, keep the keepers cold and clean.",
      "Frame 6. Maintenance: dry and inspect all gear, remove splinters, store it out of children and pets reach."
    ],
    warn: [
      "Never present any of these three as a recommended beginner method.",
      "Bamboo has a hard, silica-rich outer skin. That does not make a handmade bamboo point as strong or durable as a steel fishing tool. Tips can split, snap and leave fragments in a fish, in food or in a person.",
      "Abandoned gear keeps catching and pollutes water. Take every piece home."
    ],
    tip: ["Write the rules, the date and the web page on paper and keep it with the gear.", "Ask a local fishing office or a licensed guide before you try any traditional method."],
    after: ["Wash hands. Clean and cook fish properly. Never eat a fish you cannot identify or that came from polluted or flooded water."],
    sections: [
      { h: "Pictures", img: "assets/pics/p11e-01.jpg", alt: "A man in safety glasses and gloves turns a green bamboo pole in his hands to look for cracks, with a magnifying glass and ruler on the bench.", items: ["Frame 1: look over the bamboo for cracks, splits, decay, insects and sharp splinters."], at: 9 },
      { h: "Pictures, continued", img: "assets/pics/p11e-02.jpg", alt: "A man in safety glasses and gloves saws a bamboo pole that is clamped in a vise on a workbench.", items: ["Frame 2: eye protection and gloves. Clamp the pole and keep your hand behind the cut."], at: 10 },
      { h: "Pictures, continued", img: "assets/pics/p11e-03.jpg", alt: "A man with a backpack and safety glasses reads a folded leaflet at a river access point beside a notice board.", items: ["Frame 3: read the local fishing rules at the access point or from an official page."], at: 11 },
      { h: "Pictures, continued", img: "assets/pics/p11e-04.jpg", alt: "A man in a life vest casts a spinning rod from a stable gravel bank into calm water.", items: ["Frame 4: a lawful alternative: rod and line with a modern hook, from dry ground, where it is permitted."], at: 12 },
      { h: "Pictures, continued", img: "assets/pics/p11e-05.jpg", alt: "A man kneels on a rocky bank and holds a trout over a wooden measuring board, with a cooler of ice and a phone showing a map beside him.", items: ["Frame 5: check size and species rules, release protected fish quickly, keep the keepers cold and clean."], at: 13 },
      { h: "Pictures, continued", img: "assets/pics/p11e-06.jpg", alt: "A man dries a bamboo pole with a grey cloth at a workbench, with a rod and reel laid out beside him.", items: ["Frame 6: dry and inspect all gear, remove splinters and store it out of reach of children and pets."], at: 14 },
      { h: "Method 1: Hollow bamboo funnel trap (traditional concept)", items: [
        "Traditional purpose: a hollow bamboo tube or cage with a funnel-shaped entrance lets small fish swim in and makes it hard for them to turn around. Many fishing cultures made versions of this.",
        "Material limits: bamboo splits and rots when wet, and joints and ties can fail. It can float away in a flood and become litter.",
        "Environmental impact: a passive trap catches whatever enters, including young, protected and non-target animals. It can block movement, and dead fish and lost traps pollute.",
        "Injury and handling risks: slippery banks, cold water, and sharp split edges when you pull one out.",
        "Animal welfare: fish can die in a trap if it is not checked often. Traps left set are a known cause of waste.",
        "Legal: many places ban traps for recreational use or allow only named types for named fish and places, with marks and check times. Never set a trap without verified permission, and check it often."
      ] },
      { h: "Method 2: Bamboo gorge hook (historical technique, not recommended)", items: [
        "Traditional purpose: a short, pointed bamboo or bone sliver set crosswise in bait and tied at the middle. When swallowed it turns and lodges in the fish.",
        "Material limits: the points can split, snap or leave fragments. Strength varies with the bamboo.",
        "Injury risk to fish: the fish usually swallows the bait and is hooked deep inside, which causes serious internal injury and a high chance of death if released.",
        "Injury risk to people: sharp points while carving, baiting and handling.",
        "Safer choice: where fishing with a hook is permitted, use a modern hook of the allowed type and size, a barbless or circle hook if the rules say so, and release tools. Ask a local shop or agency.",
        "Legal: hook type, number of hooks and bait rules vary, and some waters ban or limit them."
      ] },
      { h: "Method 3: Multi-pronged bamboo fishing spear (highly restricted)", items: [
        "Traditional purpose: a pole with several sharpened prongs to strike fish in shallow, clear water.",
        "Material limits: bamboo prongs can split on a strike or snap in the water. A handmade bamboo point is not the same as steel.",
        "Injury risks: sharp-point injuries to you and others, losing balance, falling on slippery rocks, cold-water shock and drowning in a current. Do not wade in fast or deep water for any reason.",
        "Animal welfare: a missed or poor strike can wound a fish that then escapes and suffers. Spearing cannot pick the species before the strike if the water is cloudy.",
        "Legal: spearfishing is banned or limited in many waters and for many species. Some places allow hand-held spears for named fish in named places. Never use one without verified permission."
      ] },
      { h: "Check before you use any method here (all 12 places)", items: [
        "Status for every place in this app: LEGAL STATUS UNVERIFIED. We have not confirmed any waterbody, gear rule, licence, species, season, advisory, land access or conservation limit for any of these."
      ] }
    ],
    table: { head: ["Place", "Who sets the rules (to check; nothing verified)"], rows: PLACES },
    sources: [SRC.fwc, SRC.fwcBait, SRC.dgrmGear, SRC.dgrmLic, SRC.dgrmZones, SRC.cdcFluke],
    unconfirmed: [UNV + ": no rule, licence, season, species or access status is confirmed for any place. The Florida and Portugal examples come from the owner message and the linked pages, which we have not opened.", "The three traditional methods are described in general terms. We have no source page for how any bamboo trap, gorge hook or spear performs. The statement that bamboo points are weaker than steel and can split is general knowledge about the material, not from a named test.", PENDING + ": not tested on a real iPad. All six story pictures exist. They are illustrations. Frames 2 and 5 show hand tools and a fish, and none shows a trap, hook or spear in use.", "Load Maps river and fishing display for each place is not built; it needs the owner own edit Load Maps message."] });

  if (window.LOAD_CORE && window.LOAD_CORE.guides) {
    G.forEach(function (g) { window.LOAD_CORE.guides.push(g); });
  }
})();
