/* Part 11: Orchard food and preservation, Bamboo household projects, Rainwater and gravity irrigation, Solar charging and household skills.
   Written 29 Oct 2026 from the owner Part 11A to 11D. Four guides, each with a six-frame text outline. The 24 story photographs (p11a-01 to p11d-06) do not exist yet,
   so no story is complete. Verification labels follow Part 8D. Guidance, not a certification of any product or site. */
(function () {
  var LINKED = "OFFICIAL SOURCE LINKED BUT NOT OPENED";
  var UNV = "DATA UNVERIFIED";
  var PENDING = "DEVICE TEST PENDING";
  var CALL = "In danger to life, call 911 (US) or 112 (Portugal) first, if the phone works.";
  var NOPIC = "No pictures are made for these frames yet. They are text only.";
  var SRC = {
    nchfp: ["USDA Complete Guide to Home Canning and food preservation (" + LINKED + ")", "https://nchfp.uga.edu/resources/category/usda-guide"],
    cdcWater: ["CDC: emergency water (" + LINKED + ")", "https://www.cdc.gov/water-emergency/about/"],
    fsDisaster: ["FoodSafety.gov: food and water in a disaster (" + LINKED + ")", "https://www.foodsafety.gov/keep-food-safe/food-safety-in-disaster-or-emergency"]
  };
  var G = [];
  function add(g) { g.checkedOn = "29 Oct 2026"; g.status = "partly"; g.difficulty = g.difficulty || "Practical"; g.icon = g.icon || "leaf"; g.source = g.sources.length ? g.sources[0][1] : ""; G.push(g); }
  function PT(rows) { return { head: ["English", "Português"], rows: rows }; }
  var PTNOTE = "Portuguese words are for orientation. " + UNV + ": not reviewed by a native speaker.";
  function unc(extra, pic) { return [UNV + ": " + extra, "The steps follow the owner Part 11 manual. We have not opened any linked page. " + PENDING + ": not tested on a real iPad.", pic || "The six story photographs for this module do not exist yet, so the story is NOT complete."]; }

  add({ id: "p11a-orchard", area: "Food • Orchard", title: "Part 11A: Orchard fruit, drying and preserving (pomar e conservação)",
    intro: "Grapes, pears, guava, lemons, oranges and quince add variety and nutrients. They are a seasonal supplement, not a year-round calorie or drinking-water supply. Fruit acidity, sugar, salt or pectin is not sterilisation.",
    first: [
      CALL,
      "Identify the fruit for certain before you eat it. The fruit called Martello is UNIDENTIFIED. Do not give it a botanical name until it is confirmed.",
      "Use a tested method for drying and preserving. Never promise 6 to 12 months from how dry the fruit feels.",
      "Do not climb unsafe ladders or enter storm-damaged trees. " + "Every frame has a picture. Some are small, so they look soft on a large screen."
    ],
    do: [
      "Frame 1. Identify the fruit confidently and check it is right to eat.",
      "Frame 2. Harvest sound fruit safely from the ground or a steady, low reach. Set aside bruised fruit for quick use. Discard mouldy, flood-exposed or chemically contaminated fruit.",
      "Frame 3. Wash with drinking-quality water. Sort and record the harvest date and rough amount.",
      "Frame 4. Cut on a clean food-safe board with a manual knife. Core and cut pears into even pieces.",
      "Frame 5. Dry on clean food-safe trays protected from insects and animals, using a tested drying method: temperature, airflow and time from a food-preservation authority. Sun drying needs warm, dry weather and is not reliable everywhere.",
      "Frame 6. Inspect for retained moisture. Condition properly dried fruit as advised (often 7 to 10 days for many dried fruits), checking for condensation or mould, and discard spoiled batches. Pack in clean dry containers, label and rotate.",
      "Guava or quince paste and leather: use a validated recipe and clean tools. High pectin helps it set but does not make it keep indefinitely. Treat homemade fruit leather as limited-storage food. Do not swap an untested open-fire reduction for a tested canning process.",
      "Citrus: preserved lemons are a condiment made by a tested salt recipe. They are not a sterile hydration reserve. Keep safe drinking water apart. Vitamin C foods add variety, but check the whole diet.",
      "Quince or medlar tea is not a treatment for infectious diarrhoea. Replace lost fluids and seek medical help for serious illness."
    ],
    warn: ["Do not use treated bamboo, dirty cloth, wax paper near high heat or raw river water in food preparation.", "Never eat fruit you cannot identify."],
    tip: ["Keep fruit and drinking water supplies separate.", "Write the date on every container."],
    after: ["Check stored fruit often. When in doubt, throw it out."],
    sections: [
      { h: "Pictures", img: "assets/pics/p11a-01.jpg", alt: "A woman in a straw hat holds a ripe pear beside a pear tree and compares it with a field guide page.", items: ["Frame 1: identify the fruit before you eat it."] },
      { h: "Pictures, continued", img: "assets/pics/p11a-02.jpg", alt: "An older man picks a pear from a low branch while standing on the ground and places it in a wooden crate.", items: ["Frame 2: pick from the ground or a low reach. No ladder."] },
      { h: "Pictures, continued", img: "assets/pics/p11a-03.jpg", alt: "Hands rinse pears and grapes in a bowl under a running tap, with bruised pears set aside in a separate bowl.", items: ["Frame 3: wash with drinking water and set bruised fruit aside."] },
      { h: "Pictures, continued", img: "assets/pics/p11a-04.jpg", alt: "Hands cut a pear into even slices on a wooden board with a kitchen knife.", items: ["Frame 4: cut on a clean board. Keep fingers curled, away from the blade."] },
      { h: "Pictures, continued", img: "assets/pics/p11a-05.jpg", alt: "Sliced pears and grapes laid in single layers on mesh trays under fine insect netting on a shaded porch.", items: ["Frame 5: dry in single layers on clean trays, covered from insects."] },
      { h: "Pictures, continued", img: "assets/pics/p11a-06.jpg", alt: "A woman holds a glass jar of dried fruit with a blank tag, with more jars on a shelf behind her.", items: ["Frame 6: inspect, label with the date and rotate. Do not promise months from how dry it feels."] }
    ],
    table: PT([["grapes", "uvas"], ["pears", "peras"], ["guava", "goiaba"], ["lemons", "limões"], ["oranges", "laranjas"], ["quince", "marmelo"], ["to dry", "secar"], ["harvest", "colher"]]),
    sources: [SRC.nchfp, SRC.fsDisaster],
    unconfirmed: unc("no drying temperature, time or storage life is given because no tested figure was supplied. The Martello fruit is unidentified. " + PTNOTE, "All six story pictures exist. Some are small and soft. They are illustrations, not photographs of a real place. " + PENDING + ".") });

  add({ id: "p11b-bamboo", area: "Home skills • Bamboo", title: "Part 11B: Bamboo for the garden and household (projetos com bambu)",
    intro: "Use identified, sound bamboo for low-risk garden supports and storage aids. Strength varies with species, age, moisture, damage and joints. Bamboo is not stronger than steel, and a woven platform must not carry people.",
    first: [
      CALL,
      "Check who owns the bamboo and any local limits on cutting it.",
      "Wear eye protection, thick gloves, long sleeves and sturdy shoes.",
      "Keep people and pets out of the cutting path. Every frame has a picture."
    ],
    do: [
      "Frame 1. Select a sound culm sized for a stake or trellis. Check for splits, decay, insects and sharp splinters.",
      "Frame 2. Put on eye protection, gloves, long sleeves and sturdy shoes.",
      "Frame 3. Measure and mark the length. Cut on stable ground with a correctly maintained hand tool. Do not hit blades with makeshift hammers or force rebar into poles.",
      "Frame 4. Smooth the cut ends with sandpaper or a file.",
      "Frame 5. Install a simple garden stake in firm soil away from buried utilities. Tie plants loosely with soft ties.",
      "Frame 6. Inspect the finished trellis. Check it after wind. It is not for people or heavy overhead loads.",
      "Irrigation trough. For utility water only: mark a short route with a gentle downward slope from a collected utility-water container to a garden bed. Use purpose-made split bamboo or pre-cut channels. Support each section on its own. Test with a little water. Send overflow away from foundations and paths. Clean often to stop algae and mosquitoes. Never connect it to drinking-water pipes.",
      "Baskets, small racks and ties. Practise weaving with softened strips and gloves. Strip ties are for garden jobs only. They are not rope for lifting, anchoring, rescue or a hammock. Store food on clean food-grade surfaces."
    ],
    warn: [
      "Do not make sharpened stake traps, flood rafts, untested sleeping platforms or sharp skinning knives from bamboo.",
      "Do not claim bamboo ignites reliably.",
      "Do not drink liquid from bamboo joints without treatment. A bamboo sand and charcoal device shows how sediment settles. It does not make water safe."
    ],
    tip: ["Practise on a small project before a bigger one."],
    after: ["Re-check stakes and trellises after storms. Replace split poles."],
    sections: [
      { h: "Pictures", img: "assets/pics/p11b-01.jpg", alt: "A man in safety glasses looks up a tall green bamboo culm in a bamboo grove, with one hand resting on the stem.", items: ["Frame 1: look the culm over for splits and decay. No tool in hand."] },
      { h: "Pictures, continued", img: "assets/pics/p11b-02.jpg", alt: "A man puts on safety glasses and thick gloves beside a workbench with a hand saw, sandpaper and a bamboo pole.", items: ["Frame 2: eye protection and gloves on before you cut."] },
      { h: "Pictures, continued", img: "assets/pics/p11b-03.jpg", alt: "A man in safety glasses and gloves measures a bamboo pole on a workbench with a tape measure and marks it with a pencil.", items: ["Frame 3: measure and mark on a steady bench. Cut only with a maintained hand tool."] },
      { h: "Pictures, continued", img: "assets/pics/p11b-04.jpg", alt: "Gloved hands smooth the cut end of a bamboo pole with sandpaper on a workbench.", items: ["Frame 4: smooth the cut end. Hold the pole steady and sand away from your body."] },
      { h: "Pictures, continued", img: "assets/pics/p11b-05.jpg", alt: "A man crouches in a vegetable bed, pushing a bamboo stake into firm soil beside a tomato plant and tying the plant loosely with a soft strip.", items: ["Frame 5: set the stake in firm soil and tie loosely with a soft tie."] },
      { h: "Pictures, continued", img: "assets/pics/p11b-06.jpg", alt: "A man stands beside a finished bamboo trellis covered in climbing beans, with one hand resting on the frame. Nobody is on it.", items: ["Frame 6: inspect the finished trellis. It is for plants only, never for people or heavy loads."] }
    ],
    table: PT([["bamboo", "bambu"], ["garden stakes", "estacas para horta"], ["irrigation trough", "calha de rega"], ["basket", "cesto"], ["rack", "suporte"], ["rope", "corda"]]),
    sources: [],
    unconfirmed: unc("no source page was supplied for bamboo strength or species. " + PTNOTE, "All six story pictures exist. In frames 1 and 2 the man wears a grey top and yellow gloves, and in frames 3 to 6 an olive shirt and grey gloves, so the clothes do not match. They are illustrations, not photographs of a real place. " + PENDING + ".") });

  add({ id: "p11c-water", area: "Water • Garden", title: "Part 11C: Rainwater and gravity irrigation (água e rega por gravidade)",
    intro: "Keep three kinds of water apart. DRINKING (potável): verified treated water. RAW (bruta): rain, river or other unverified water that needs evaluation and treatment. UTILITY (utilitária): water for the garden or cleaning only.",
    first: [
      CALL,
      "Never assume rainwater is drinkable because it fell from the sky.",
      "Water on a map is not permission to divert it. Check access and collection rules before you take river or spring water.",
      "Protect the privacy of private wells. Every frame has a picture."
    ],
    do: [
      "Frame 1. Identify a clean, stable collection surface made for rain.",
      "Frame 2. Use a clean container with a lid.",
      "Frame 3. Cover the utility tank so mosquitoes cannot breed. Divert dirty first runoff where you can. There is no universal safe first-flush time.",
      "Frame 4. Label it UTILITY WATER / ÁGUA NÃO POTÁVEL. Keep it away from floodwater, fuel, chemicals and sewage.",
      "Frame 5. Gravity garden line: survey the route on your own land and avoid buried utilities. Place the tank above the garden only if the support is built for its weight (1 litre weighs about 1 kg). Use a closed valve and a rated garden hose, or a short supported bamboo trough. Trial with a little water and check for leaks, erosion and slips.",
      "Frame 6. Inspect the garden delivery. Turn off and drain when not in use. Never run dirty water into living spaces or across exits.",
      "Filters. Cloth, sand and wood charcoal can remove visible dirt. They do not reliably remove germs, pesticides, fuel, salts or dissolved metals. Ordinary fire charcoal is not certified activated carbon. For drinking, use a validated treatment suited to the real hazard, or choose another source."
    ],
    warn: ["Do not drink utility water.", "A tank on a high shelf can fall. Support it properly.", "Never connect a utility line to drinking-water plumbing."],
    tip: ["Mark tanks with colour tape as well as words, so everyone can tell them apart."],
    after: ["Drain and clean tanks when the season ends."],
    sections: [
      { h: "Pictures", img: "assets/pics/p11c-01.jpg", alt: "A woman in a green rain jacket points at the clean roof gutter of a garden shed in the rain while a boy in a yellow raincoat watches.", items: ["Frame 1: pick a clean, stable roof surface made for rain."] },
      { h: "Pictures, continued", img: "assets/pics/p11c-02.jpg", alt: "A boy in a yellow raincoat rinses a lidded plastic barrel with a garden hose while a woman crouches beside him.", items: ["Frame 2: rinse the container clean before you use it."] },
      { h: "Pictures, continued", img: "assets/pics/p11c-03.jpg", alt: "A woman fits a lid with fine mesh over a rain barrel under a downpipe while a boy watches.", items: ["Frame 3: cover the tank with a lid and fine mesh so mosquitoes cannot breed."] },
      { h: "Pictures, continued", img: "assets/pics/p11c-04.jpg", alt: "A boy sticks a red band of tape around a rain barrel while a woman helps. A blue jug sits apart on a shelf beside it.", items: ["Frame 4: mark utility-only water with colour tape and keep drinking water in a different jug, apart."] },
      { h: "Pictures, continued", img: "assets/pics/p11c-05.jpg", alt: "A boy and a woman stand clear and watch a plain split pipe on wooden stands carry a stream of water from a raised barrel to a raised vegetable bed.", items: ["Frame 5: lay a short, supported garden channel from the raised tank to the bed. Test it with a little water."] },
      { h: "Pictures, continued", img: "assets/pics/p11c-06.jpg", alt: "A woman crouches at the end of the channel to check water reaching a vegetable bed while the boy holds a bucket.", items: ["Frame 6: check the water reaching the garden. Make sure nothing overflows onto paths."] }
    ],
    table: PT([["drinking water", "água potável"], ["raw water", "água bruta"], ["utility water", "água utilitária"], ["rainwater", "água da chuva"], ["irrigation", "rega"], ["gravity", "gravidade"]]),
    sources: [SRC.cdcWater],
    unconfirmed: unc("the support strength, slope and first-flush amount for your site are not known. No water quality for any collection point is confirmed. " + PTNOTE, "All six story pictures exist. The barrel looks black, green and dark grey in different frames. They are illustrations, not photographs of a real place. " + PENDING + ".") });

  add({ id: "p11d-solar-skills", area: "Power • Skills", title: "Part 11D: Solar charging, a power budget and household skills (solar e competências)",
    intro: "Keep phones, radios and power banks usable with equipment rated for their input voltage, plugs and weather. Do not use exposed wires, twisted copper, bare batteries or improvised car sockets.",
    first: [
      CALL,
      "Use a panel with a matching controller, or a made-for-purpose USB solar charger.",
      "Use only the approved cable.",
      "A 12 V label does not mean a USB device will charge safely. Every frame has a picture."
    ],
    do: [
      "Frame 1. Inventory your solar gear: panel, cable, power bank, phone, radio.",
      "Frame 2. Read the connector and voltage details. Match the panel output to the controller or USB product. Inspect cables, seals and connectors for damage.",
      "Frame 3. Place the panel securely outdoors on a stable dry surface in sunlight, away from floodwater and walkways.",
      "Frame 4. Connect only the manufacturer-approved cable and controller, or use an integrated USB solar product.",
      "Frame 5. Charge the power bank in shade, not in the sun. Check it is charging, feel for heat, and disconnect it if it overheats.",
      "Frame 6. Inspect and store the equipment dry. Check it monthly for water, corrosion, damaged cables and batteries, and loose supports.",
      "Power budget. List each device and its watt-hours or input power. Estimate daily use and allow for charging loss, bad weather and darkness. A 10 to 100 W label is not full output all day. Prefer a tested power bank and an approved cable. See the Pantry and Watt-hours tools.",
      "Bamboo shoots as food. Only an identified edible species. Some raw shoots contain cyanide-forming compounds and must not be eaten raw. Safe preparation depends on the species and a validated method. Do not say that 20 to 30 minutes of boiling is safe for every species. If you cannot identify it and confirm the preparation, do not eat it.",
      "Safe decisions. Do not use a homemade bamboo raft in floodwater, build sharpened traps or use untested bamboo to lift or carry people. Use nonviolent security and clear, safe ways out."
    ],
    warn: ["Do not twist wires together to charge a phone.", "A battery that swells, smells or gets hot must be moved outside and not used.", "Never leave charging gear in rain or floodwater."],
    tip: ["Keep a paper list of which cable goes with which device."],
    after: ["Check stored gear monthly and write the date."],
    sections: [
      { h: "Pictures", img: "assets/pics/p11d-01.jpg", alt: "A teenager in a grey hoodie unfolds a small solar panel on a garden table beside a power bank, a phone and two cables, while a woman watches.", items: ["Frame 1: inventory your solar gear: panel, cable, power bank, phone."] },
      { h: "Pictures, continued", img: "assets/pics/p11d-02.jpg", alt: "The teenager and the woman compare the plug on a cable with the port on a power bank, with the panel and phone on the table.", items: ["Frame 2: read the connector and voltage details. Match the plugs before you connect."] },
      { h: "Pictures, continued", img: "assets/pics/p11d-03.jpg", alt: "A teenager props a folding solar panel on a dry garden table in full sun, with its cable lying straight.", items: ["Frame 3: place the panel on a stable, dry surface in sunlight."] },
      { h: "Pictures, continued", img: "assets/pics/p11d-04.jpg", alt: "Hands plug a USB cable into a power bank, with the cable running from the solar panel.", items: ["Frame 4: connect only the approved cable."] },
      { h: "Pictures, continued", img: "assets/pics/p11d-05.jpg", alt: "A power bank and a phone charge on a table in the shade of an umbrella, with the solar panel in the sun nearby.", items: ["Frame 5: charge the power bank in shade. Check it for heat."] },
      { h: "Pictures, continued", img: "assets/pics/p11d-06.jpg", alt: "A woman wipes a power bank with a dry cloth and puts it in a dry plastic box with its cable.", items: ["Frame 6: inspect and store the gear dry."] }
    ],
    table: PT([["solar panel", "painel solar"], ["power bank", "bateria externa"], ["cable", "cabo"], ["charger", "carregador"], ["shade", "sombra"], ["maintenance", "manutenção"]]),
    sources: [],
    unconfirmed: unc("no source page was supplied. Whether a given panel, cable or power bank fits is not known; read the labels. " + PTNOTE, "All six story pictures exist. They are illustrations, not photographs of a real place. " + PENDING + ".") });

  if (window.LOAD_CORE && window.LOAD_CORE.guides) {
    G.forEach(function (g) { window.LOAD_CORE.guides.push(g); });
  }
})();
