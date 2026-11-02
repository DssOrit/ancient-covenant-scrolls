/* Part 10: river survival systems. 5 guides: river water, fishing and handling, waterside plants (caution), micro-hydro, preservation and soap.
   Written 29 Oct 2026 from the owner Part 10A to 10D. Each module has a six-frame text outline. Only one river picture exists, so five of the six frames of 10A and all frames of 10B to 10D are text only.
   No river, plant, fish or hydro site is confirmed safe, legal or available. Verification labels follow Part 8D. Not safety, legal or engineering advice. */
(function () {
  var LINKED = "OFFICIAL SOURCE LINKED BUT NOT OPENED";
  var UNV = "DATA UNVERIFIED";
  var PENDING = "DEVICE TEST PENDING";
  var CALL = "In danger to life, call 911 (US) or 112 (Portugal) first, if the phone works.";
  var ILL = "The picture is an illustration made for this app. It is not a photograph of a real place and does not show that any water is safe, open or legal to use.";
  var FRAMES = "Every frame has a picture. Some are small, so they look soft on a large screen.";
  var NOGUARANTEE = "No river here is confirmed safe to drink, legal to fish or suitable for power. Check the exact place before you act.";
  var SRC = {
    cdcWater: ["CDC: emergency water (" + LINKED + ")", "https://www.cdc.gov/water-emergency/about/"],
    cdcFind: ["CDC: how to find clean water in an emergency (" + LINKED + ")", "https://www.cdc.gov/water-emergency/about/how-to-find-clean-water-in-an-emergency.html"],
    epa: ["US EPA: emergency disinfection of drinking water (" + LINKED + ")", "https://www.epa.gov/ground-water-and-drinking-water/emergency-disinfection-drinking-water"],
    fluke: ["CDC: Fasciola liver flukes, clinical overview (" + LINKED + ")", "https://www.cdc.gov/liver-flukes/hcp/clinical-overview-fasciola/index.html"],
    dgrmZones: ["Portugal DGRM: fishing zones (" + LINKED + ")", "https://dgrm.pt/en/web/guest/zonas-de-pesca"],
    dgrmLic: ["Portugal DGRM: licences (" + LINKED + ")", "https://dgrm.pt/en/licencas"],
    fdaSmoke: ["US FDA: processing needed to control pathogens in cold-smoked fish (" + LINKED + ")", "https://www.fda.gov/files/food/published/Processing-Parameters-Needed-to-Control-Pathogens-in-Cold-Smoked-Fish.pdf"]
  };
  var G = [];
  function add(g) { g.checkedOn = "29 Oct 2026"; g.status = "partly"; g.difficulty = g.difficulty || "Practical"; g.icon = g.icon || "water"; g.source = g.sources.length ? g.sources[0][1] : ""; G.push(g); }
  function find(id) { var gs = (window.LOAD_CORE && window.LOAD_CORE.guides) || []; for (var i = 0; i < gs.length; i++) if (gs[i].id === id) return gs[i]; return null; }
  function PT(rows) { return { head: ["English", "Português"], rows: rows }; }
  var PTNOTE = "Portuguese words are for orientation. " + UNV + ": not reviewed by a native speaker.";
  function unc(extra) { return [UNV + ": " + extra, "The steps follow the owner Part 10 report. We have not opened the linked pages. " + PENDING + ": not tested on a real iPad.", "All story pictures exist. They are illustrations, not photographs of real places, and they do not show that any water, fish or site is safe, open or legal to use."]; }

  /* ---- 10A ---- */
  add({ id: "river-10a-water", area: "Water • River", title: "Part 10A: River water, safe collection and treatment",
    intro: "Clear or fast water is not safe water. This guide separates where the water is, whether you may reach it, chemical risk and germ treatment. " + NOGUARANTEE + " " + ILL,
    first: [
      CALL,
      "Start with stored, tested drinking water. Use river water only when there is no safer choice.",
      "Do not use river water to drink during flooding, industrial discharge, sewage overflow, algal bloom, fuel spill or any unknown chemical risk.",
      "Never wade into fast or deep water to collect it. " + FRAMES
    ],
    do: [
      "Frame 1. From dry ground, check a map and any upstream pollution or flood notices. See the picture.",
      "Frame 2. Decide against visibly polluted or flooded water. Look for another source.",
      "Frame 3. If the source is allowed to use and you have no reason to suspect chemicals, collect from stable dry ground into a clean container that you keep only for raw water. Keep raw and treated containers apart.",
      "Frame 4. Let cloudy water settle and pass it through a clean cloth or coffee filter. This removes larger particles. It does NOT disinfect.",
      "Frame 5. Boil clear water at a rolling boil for 1 minute (3 minutes above 6,500 ft or 2,000 m) outdoors on a stable appliance. If you cannot boil, follow current official chemical disinfection guidance.",
      "Frame 6. Cool it, store it in a clean covered container and label it TREATED with its date.",
      "Long-term sources: have the water tested for chemicals and germs, use a properly certified treatment train, and keep a log of tests, filter changes and source changes."
    ],
    warn: [
      "Do not enter fast or deep water. Currents, hidden debris and banks can kill.",
      "Boiling, bleach and cloth do not remove fuel, pesticides, metals or salt.",
      "A sand and charcoal bottle filter cannot promise to remove pesticides, metals, Cryptosporidium, viruses or all bacteria. Barbecue charcoal is not certified activated carbon.",
      "A homemade solar still gives a small, variable amount. Its water is not guaranteed pure and is not sterile. Do not use it for medical needs."
    ],
    tip: ["Treat only water you may legally collect.", "Write the pickup spot and date on the container."],
    after: ["Wash hands and containers. Never mix raw and treated water."],
    sections: [{ h: "Picture", img: "assets/pics/river-10a-map-check.jpg", alt: "A bearded man in a beanie and backpack stands on a mossy bank holding a paper map and a white water jug beside a rocky river.", items: ["Frame 1: check a map and notices from dry ground before you collect water."] },
      { h: "Pictures, continued", img: "assets/pics/river-10a-f2-flooded.jpg", alt: "A bearded man in an olive jacket stands on a high gravel path with his arms folded, looking at a fast, muddy brown flooded river from a safe distance.", items: ["Frame 2: do not use flooded, muddy river water. Look for another source."] },
      { h: "Pictures, continued", img: "assets/pics/river-10a-f3-containers.jpg", alt: "Two clear water jugs with blue and green tape bands stand on separate trays on a folding table at a dry riverbank.", items: ["Frame 3: keep raw water (blue) and treated water (green) in separate, marked containers."] },
      { h: "Pictures, continued", img: "assets/pics/river-10a-f4-prefilter.jpg", alt: "Hands pour cloudy water from a pot through a paper coffee filter in a funnel into a glass jug.", items: ["Frame 4: pour cloudy water through a clean cloth or coffee filter. This removes dirt only. It does not make water safe."] },
      { h: "Pictures, continued", img: "assets/pics/river-10a-f5-boil.jpg", alt: "A pot of water boils on a camping stove on level ground beside a river while the bearded man in a hat stands back.", items: ["Frame 5: boil clear water at a rolling boil for 1 minute (3 minutes above 6,500 ft) on a stable stove, outdoors."] },
      { h: "Pictures, continued", img: "assets/pics/river-10a-f6-store.jpg", alt: "The man in a hat checks large covered water jugs with colour tape and blank paper tags on a wooden shelf under an outdoor canopy.", items: ["Frame 6: cool, cover and label treated water with the date."] }],
    table: PT([["river", "rio"], ["stream", "ribeiro"], ["drinking water", "água potável"], ["boil", "ferver"], ["flood", "cheia"], ["safe", "seguro"], ["polluted", "poluído"]]),
    sources: [SRC.cdcWater, SRC.cdcFind, SRC.epa],
    unconfirmed: unc("whether a given river is clean, open or legal to use is not known. " + PTNOTE) });

  /* ---- 10B ---- */
  add({ id: "river-10b-fishing", area: "Food • River", title: "Part 10B: Fishing, permits, advisories and safe handling",
    intro: "Fishing for food depends on the place, the rules and the water. Passive methods such as traps, weirs and multi-hook lines are location-dependent and never assumed allowed. " + NOGUARANTEE,
    first: [
      CALL,
      "Ordinary line fishing is the simplest to check and the most selective.",
      "Traps, weirs and trotlines: check the exact rule for the exact place before you build anything.",
      "Cooking does not remove mercury, PCBs or other pollutants. Check fish-consumption advice.",
      FRAMES
    ],
    do: [
      "Frame 1. Find who manages the water and whether the shore is open to the public. Read the rules: licence, season, species, size and bag limits, gear, protected habitat.",
      "Frame 2. Check the fish-consumption advice for the water, especially for pregnant people and children.",
      "Frame 3. Choose lawful gear. Prefer rod and line.",
      "Frame 4. Measure and identify the catch. Release protected or undersized fish quickly and gently.",
      "Frame 5. Keep the catch cool and clean in a cooler with ice or on ice in clean bags.",
      "Frame 6. Cook to a safe temperature (fish to 145 F, 63 C) with a thermometer, or decline to harvest when you are unsure.",
      "Do not eat fish found dead, or fish from water that is polluted, flooded or under an algae warning.",
      "Traps and weirs: they can block fish migration, change flow, tangle animals and often need environmental permits. Verify authorisation before any field work."
    ],
    warn: [
      "Never eat an unidentified fish.",
      "Do not wade in fast or deep water to set or take gear.",
      "In Portugal, recreational marine fishing has its own rules and traps are prohibited at sea. Inland waters need their own authority. We have not checked your water."
    ],
    tip: ["Keep a paper copy of the rules, with the date you checked them.", "A tape or board for measuring helps you follow size limits."],
    after: ["Take all gear home. Clean fish away from the water supply."],
    sections: [
      { h: "Pictures", img: "assets/pics/river-10b-f1-rules.jpg", alt: "A woman in a green jacket and cap reads a folded leaflet at a river access point beside a wooden fence.", items: ["Frame 1: read the rules for this water: licence, season, species, size, gear."] },
      { h: "Pictures, continued", img: "assets/pics/river-10b-f2-advisory.jpg", alt: "A woman holds a phone showing a plain map with a blue river and red fish icons, at a picnic table by the river.", items: ["Frame 2: check the fish-consumption advice for this water before you eat any catch."] },
      { h: "Pictures, continued", img: "assets/pics/river-10b-f3-gear.jpg", alt: "A woman crouches on dry grass choosing a spinning rod, with more rods and a tackle box beside her.", items: ["Frame 3: choose lawful gear. Rod and line is the easiest to check."] },
      { h: "Pictures, continued", img: "assets/pics/river-10b-f4-measure.jpg", alt: "A woman gently holds a trout over a wooden measuring board on a rock beside a river.", items: ["Frame 4: measure the catch. Release protected or undersized fish quickly and gently."] },
      { h: "Pictures, continued", img: "assets/pics/river-10b-f5-cool.jpg", alt: "A woman places a bagged fish on ice in an open cooler on a flat rock.", items: ["Frame 5: keep the catch cold and clean."] },
      { h: "Pictures, continued", img: "assets/pics/river-10b-f6-cook.jpg", alt: "A woman checks a pan-fried fish fillet on a camp stove with a probe thermometer.", items: ["Frame 6: cook to 145 F (63 C) with a thermometer, or decline to harvest when you are unsure."] }
    ],
    table: PT([["fish", "peixe"], ["fishing licence", "licença de pesca"], ["line fishing", "pesca à linha"], ["river", "rio"], ["permit", "licença"], ["season", "época"]]),
    sources: [SRC.dgrmZones, SRC.dgrmLic, SRC.fluke],
    unconfirmed: unc("licences, seasons, species and gear rules for your water are not known. The Portugal links are for sea zones and licences; inland waters need another authority. " + PTNOTE) });

  add({ id: "river-10b-plants", area: "Food • River", title: "Part 10B: Waterside plants, a caution guide (do not taste to test)",
    intro: "Some plants beside water are poisonous, and even a food plant can carry germs or pollution. This is a caution guide, not a harvest guide. " + NOGUARANTEE,
    first: [
      CALL,
      "Never taste, chew or cut an unknown plant to find out if it is safe.",
      "Do not use a short picture match or a stem test to decide.",
      "Beginners: prefer known food crops and shop greens."
    ],
    do: [
      "Step 1. Water hemlock (Cicuta) is highly poisonous and grows in wet ground. Do not touch or eat plants in the carrot family that you cannot name for certain.",
      "Step 2. Watercress from contaminated fresh water can carry Fasciola liver flukes. CDC advises against eating raw watercress from such water.",
      "Step 3. Cattails and other water plants can take up pollution from the water and the mud. Identification alone does not make a plant safe.",
      "Step 4. Ask the landowner or manager, check protected species, and think about upstream runoff before you pick any wild plant.",
      "Step 5. If in doubt, leave it. A mistake can be fatal.",
      "Step 6. Learn from a local expert and a good field guide before a crisis, in the season, with the plant in your hand and an experienced person beside you.",
      "Step 7. No-store version: use food crops you already grow, saved seed and the greens in the growing guides, not unknown wild plants."
    ],
    warn: ["Signs of poisoning can start within an hour. Call 911 or 112, and your poison centre.", "Do not give a child any wild plant."],
    tip: ["Take photos of a plant in all stages, and let an expert check them."],
    after: ["Wash hands after touching wild plants."],
    sources: [SRC.fluke],
    unconfirmed: unc("the look-alike details here are general; we found no field-guide page for your place. Which plants grow near your water is not known.") });

  /* ---- 10C ---- */
  add({ id: "river-10c-microhydro", area: "Power • River", title: "Part 10C: Micro-hydro power: how it works, and why it is not a quick fix",
    intro: "A waterwheel can be a demonstration. A real system needs permits, measurement, a controller and protection. For a family, solar and a battery are usually easier. " + NOGUARANTEE,
    first: [
      CALL,
      "Do not wire a car alternator or a scavenged motor straight to a car battery. A battery does not regulate voltage or current. It can overheat, burn or explode.",
      "Confirm land and water rights and permits before you touch the stream.",
      "Never work in swift water.",
      FRAMES
    ],
    do: [
      "Frame 1. Survey from a safe bank. Note the drop and the flow in each season.",
      "Frame 2. With a technician, measure head (vertical drop, in metres) and flow (cubic metres per second) and write them on paper.",
      "Frame 3. Review the permit map: land and water rights, environmental permits, fish passage.",
      "Frame 4. A professionally designed generator, rectifier or charge controller, overcurrent protection, a disconnect and battery management matched to the battery type and voltage.",
      "Frame 5. Test the protective devices before you connect any household load. Put batteries and electronics above flood level in a ventilated, weather-protected place.",
      "Frame 6. Compare with solar panels and a battery: permits, upkeep, seasons, cost and risk.",
      "Power estimate: watts about 9,810 times flow (m3 per second) times head (m) times efficiency. Example only: 0.01 m3/s, 10 m of head and 50 percent efficiency gives about 490 W. Real output varies with debris, drought, ice and flood."
    ],
    warn: [
      "A river may not run at a useful speed all year. Ice, drought and flood can stop or break equipment.",
      "A spinning bicycle wheel does not guarantee useful power. Motors and alternators need the right speed and regulation. Not every motor gives usable or clean DC.",
      "Intakes and structures can harm fish and are often regulated."
    ],
    tip: ["Measure through a full year before you spend money.", "Ask a qualified electrician and your water authority first."],
    after: ["Inspect screens and the intake after every storm."],
    sections: [
      { h: "Pictures", img: "assets/pics/river-10c-f1-survey.jpg", alt: "A woman in a grey fleece and a technician in a hard hat stand on a dry path and look at a small stream, one holding a clipboard.", items: ["Frame 1: survey from a dry, stable bank. Do not go into the flow."] },
      { h: "Pictures, continued", img: "assets/pics/river-10c-f2-measure.jpg", alt: "The woman writes in a notebook while the technician crouches on a rock beside a small waterfall with a tape measure and a level.", items: ["Frame 2: measure head and flow with a technician and write them down. Do it from a safe, dry spot, never from rocks in the flow."] },
      { h: "Pictures, continued", img: "assets/pics/river-10c-f3-permits.jpg", alt: "Two people look at a printed river map and a stack of permit papers on a picnic table.", items: ["Frame 3: check land and water rights, environmental permits and fish passage first."] },
      { h: "Pictures, continued", img: "assets/pics/river-10c-f4-controller.jpg", alt: "A wall panel holds a charge controller, a clear-cover fuse box and a red disconnect switch with tidy cable ducting above a battery.", items: ["Frame 4: a professionally wired controller, fuses and a disconnect."] },
      { h: "Pictures, continued", img: "assets/pics/river-10c-f5-test.jpg", alt: "A technician in a hard hat and gloves uses a multimeter inside a ventilated battery cabinet with a breaker panel.", items: ["Frame 5: protective devices are tested by a professional before any load is connected. This is not a home task."] },
      { h: "Pictures, continued", img: "assets/pics/river-10c-f6-compare.jpg", alt: "A woman and a technician stand near a small stream turbine house with a roof of solar panels, comparing them in a notebook.", items: ["Frame 6: compare solar and micro-hydro for permits, upkeep, seasons, cost and risk."] }
    ],
    table: PT([["flow", "caudal"], ["head (drop)", "altura de queda"], ["generator", "gerador"], ["charge controller", "controlador de carga"], ["permit", "licença"], ["battery", "bateria"]]),
    sources: [SRC.cdcWater],
    unconfirmed: unc("the power formula is standard physics; the example numbers are ours, not measured at any real site. Permits, water rights and rules for your stream are not known. No Part 10C source page was supplied, so the only link here is general. " + PTNOTE) });

  /* ---- 10D ---- */
  add({ id: "river-10d-preserve", area: "Food • River", title: "Part 10D: Preserving fish and food, soap and lighting: what is safe",
    intro: "Cooking, smoking, drying, canning and validated shelf-stable preservation are different things. Several old methods are not safe as beginner emergency recipes. " + NOGUARANTEE,
    first: [
      CALL,
      "Prefer fish that is kept cold or frozen, or cooked promptly.",
      "Cold-smoked fish is NOT safe for months without refrigeration. Smoking at 100 to 140 F is not a validated shelf-stable process.",
      "Use commercial soap, and battery lights. " + FRAMES
    ],
    do: [
      "Frame 1. Clean caught fish safely: gloves, clean board, cold water, away from your drinking water.",
      "Frame 2. Cook fish with a food thermometer to 145 F (63 C).",
      "Frame 3. Chill or freeze the rest quickly if power allows.",
      "Frame 4. Set up a handwashing station with packaged soap, water and a towel.",
      "Frame 5. Use a battery lantern, not an oil lamp.",
      "Frame 6. Review stored food and rotate: use the oldest first.",
      "Distinctions. Cooking makes food hot enough to kill germs for now. Smoking, drying and salting lower water or add smoke, and only a tested process with the right salt, temperature, airflow, final moisture and storage makes food keep. Canning needs tested pressure canning for low-acid foods such as fish. Shelf-stable means a validated process, not how it looks.",
      "Do not tell anyone that fish in a paper wrapper or a Mylar bag keeps for months. Texture and colour do not prove safety. A pit with brush is not a controlled smoker.",
      "Rendered fish fat is not guaranteed to keep, and is not a safe edible oil or fuel without proof.",
      "No-store version: eat fresh fish the same day, or keep it cold with ice and cook it within hours."
    ],
    warn: [
      "Do not make soap from wood-ash lye without measured alkali, protective gear and a tested recipe. Ash lye is caustic and uneven. An egg float test does not measure strength. A six-week cure does not prove a bar is skin-safe.",
      "Do not use open oil lamps with fabric wicks. They add fire and smoke, especially near children, pets and oxygen.",
      "Pregnant people, older adults and the ill should avoid cold-smoked fish."
    ],
    tip: ["Stock commercial soap, detergent and hand sanitiser (at least 60 percent alcohol)."],
    after: ["Throw out fish that was warm too long. When in doubt, throw it out."],
    sections: [
      { h: "Pictures", img: "assets/pics/river-10d-f1-clean-fish.jpg", alt: "A woman in an apron and black gloves cleans a fish on a white board with a bowl of clean water beside it in a kitchen.", items: ["Frame 1: clean fish safely: gloves, clean board, clean water, away from drinking water."] },
      { h: "Pictures, continued", img: "assets/pics/river-10d-f2-cook-probe.jpg", alt: "A teenager in a hoodie checks a seared fish fillet in a pan on a kitchen stove with a probe thermometer.", items: ["Frame 2: cook to 145 F (63 C) and check with a thermometer."] },
      { h: "Pictures, continued", img: "assets/pics/river-10d-f3-chill.jpg", alt: "A woman in black gloves slides a covered tray of fish fillets into a refrigerator.", items: ["Frame 3: chill or freeze fish quickly if power allows."] },
      { h: "Pictures, continued", img: "assets/pics/river-10d-f4-handwash.jpg", alt: "A white basin of water, a jug, a bar of soap in plain wrapping and a folded towel on a wooden table.", items: ["Frame 4: a handwashing station with packaged soap, water and a towel."] },
      { h: "Pictures, continued", img: "assets/pics/river-10d-f5-lantern.jpg", alt: "A teenager reads a book at a table beside a glowing lantern in a living room.", items: ["Frame 5: use a battery lantern. Never an oil lamp or a candle."] },
      { h: "Pictures, continued", img: "assets/pics/river-10d-f6-rotate.jpg", alt: "Hands move a jar of preserved food on a tidy pantry shelf lined with jars and cans.", items: ["Frame 6: rotate stored food. Use the oldest first and check for spoilage."] }
    ],
    table: PT([["soap", "sabão"], ["fish", "peixe"], ["lantern", "lanterna"], ["freeze", "congelar"], ["canning", "conservas"], ["smoked", "fumado"]]),
    sources: [SRC.fdaSmoke, SRC.cdcWater],
    unconfirmed: unc("the Listeria and pathogen risk of cold smoking comes from the FDA page linked here, which we have not opened. The soap and lamp warnings come from the owner Part 10D. " + PTNOTE) });

  /* ---- fix two existing river guides ---- */
  var wx = find("wx-river");
  if (wx && wx.do) {
    for (var i = 0; i < wx.do.length; i++) {
      if (/away from the bank/.test(wx.do[i])) {
        wx.do[i] = "Collect from stable, dry ground at the bank. Do not wade in. Take water from the moving part, just below the surface, with a clean container on a cord or pole. Skip water with foam, green scum, a bad smell or an oily shine.";
      }
    }
  }
  var still = find("hs-water-from-air");
  if (still) {
    still.warn = (still.warn || []).concat(["Water from a solar still is not guaranteed pure and is not sterile. Some chemicals carry over, and the plastic and the cup can add dirt. Do not use a still on chemically polluted water or for medical needs."]);
  }

  if (window.LOAD_CORE && window.LOAD_CORE.guides) {
    G.forEach(function (g) { window.LOAD_CORE.guides.push(g); });
  }
})();
