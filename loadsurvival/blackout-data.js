/* Total blackout and power-station guides: plug-and-play power station, what to ask an electrician, salvage and inspect, two-bucket toilet option,
   scheduled listening and neighbour log, keeping light low at night, and a total blackout checklist. 7 guides.
   Written 29 Oct 2026 from relayed reports plus search results (pages not opened). Buying and installing is BEFORE a crisis. Every guide has a no-store version.
   No product names. No wire or fuse size tables. Not electrical advice: a qualified electrician decides. */
(function () {
  var NOTE = "We read search results and relayed reports about these topics. We could not open the pages, so each source is labelled OFFICIAL SOURCE LINKED BUT NOT OPENED or DATA UNVERIFIED.";
  var GEN = "Steps marked as general practice are common advice. We did not find a named source for each one.";
  var ELEC = "Power can burn, start a fire and kill. Where this guide says call a qualified electrician, do that.";
  var BEFORE = "Plan, buy and test this BEFORE a crisis. In a crisis shops may be closed. The no-store steps are for when you could not prepare.";
  var SRC = {
    classT: ["Seller page: Class T fuse (interrupt rating 20,000 A, up to 125 V DC) (DATA UNVERIFIED: unofficial source, linked but not opened)", "https://www.currentconnected.com/product/blue-sea-class-t-fuse/"],
    aic: ["Victron Community: interrupt ratings for LiFePO4 (Class T and other fuses) (DATA UNVERIFIED: unofficial source, linked but not opened)", "https://community.victronenergy.com/t/aic-ratings-for-lifepo4-class-t-mrbf/16468"],
    mppt: ["Victron: MPPT 150/60 to 250/70 technical specifications (maximum PV voltage) (DATA UNVERIFIED: unofficial source, linked but not opened)", "https://victronenergy.com/media/pg/Manual_SmartSolar_MPPT_150-60_up_to_250-70/en/technical-specifications.html"],
    jump: ["Good Sam Community: jumper cables, copper-clad aluminium (a forum) (DATA UNVERIFIED: unofficial source, linked but not opened)", "https://forums.goodsamclub.com/t5/technical-issues/jumper-cables-a-jumble-of-compromises/m-p/3411176/highlight/true"],
    fda: ["FoodSafety.gov blog archive: food safety in a power outage (OFFICIAL SOURCE LINKED BUT NOT OPENED)", "https://webarchive.library.unt.edu/web/20130218132749/http://www.foodsafety.gov/blog/power_outages.html"]
  };
  var G = [];
  function add(g) { g.checkedOn = "29 Oct 2026"; g.status = "partly"; g.difficulty = g.difficulty || "Practical"; g.icon = g.icon || "sun"; g.source = g.sources.length ? g.sources[0][1] : ""; G.push(g); }

  add({ id: "pw-station-plug-play", area: "Power • Supplies", title: "A power station with no tools: set up, use and stay safe",
    intro: "A portable power station holds a battery, an inverter and sockets in one case. It needs no wiring. It is simpler than a home-made system, but it is not risk free. " + BEFORE,
    first: [
      ELEC,
      "Use it for small, important loads: lights, phone, radio, a medical device if its label fits. A big fridge or pump may be too much.",
      "Keep the case indoors, dry and with the vents clear. Panels go outside.",
      "Read the voltage on the label. Many are made for 120 V. Portugal uses 230 V, so you need the right model."
    ],
    do: [
      "Step 1. List what you must run. Write each item watts from its label. See the daily power use guide.",
      "Step 2. Pick a unit whose output watts and stored watt-hours fit the list. Check the surge rating for motors.",
      "Step 3. Buy a known maker with a recognised safety mark. Check the maker recall page before you buy and after.",
      "Step 4. Buy a panel that the maker says fits the unit. Check the voltage and plug on the unit label and the panel label. Do not force a plug.",
      "Step 5. Charge the unit full now and test it with a lamp.",
      "Step 6. Panel outside in the sun, tilted to the sun. Run the cable in so it is not pinched by a window or door and does not let rain in.",
      "Step 7. Plug the cable into the input socket. The screen should show power coming in.",
      "Step 8. Press the AC button to switch on the sockets. Plug in one load at a time.",
      "Step 9. The screen shows an estimate of run time. It changes with the load. Do not trust it to the minute.",
      "Step 10. Keep it away from heat and direct sun. Do not charge a LiFePO4 battery below 0 C. Do not cover the vents.",
      "Step 11. Wipe the panel with a damp cloth when it is dirty.",
      "Step 12. No-store version: use a power bank, a car battery for a phone through the car, or hand-crank gear you already own. Save the station for the most important items."
    ],
    warn: [
      "A battery can catch fire. If the case swells, smells, gets hot or smokes, move people out and call 911 (US) or 112 (Portugal).",
      "Do not use a unit that has been in water or has been crushed.",
      "Do not plug it into a house wall socket to feed the house.",
      "Do not run it in a closed cupboard or under blankets."
    ],
    tip: ["Label each cable. Keep the manual in a bag with the unit.", "A fridge needs a unit with enough surge. Check before you buy."],
    after: ["After a storm, check the case and cables before using them again."],
    sources: [SRC.mppt],
    unconfirmed: [NOTE, "That a battery management system lowers the risk but does not remove it is common guidance, and the site lithium guide says recalls happen. We did not check any model. Whether a 230 V model fits your home depends on the label. The run time and panel output you get depend on the model and the sun. We found no named source for the fridge advice. " + GEN] });

  add({ id: "pw-electrician-ask", area: "Power • Supplies", title: "A home battery with solar: what to ask your electrician",
    intro: "A fixed system that powers the house wiring must be fitted by a qualified electrician. This list helps you ask the right questions. It gives no wire or fuse sizes. " + ELEC + " " + BEFORE,
    first: [
      ELEC,
      "Do not feed the house by a double-ended cord. It can kill a worker on the street.",
      "Rules differ by country. The US National Electrical Code does not apply in Portugal. Ask which rules your installer follows."
    ],
    do: [
      "Step 1. Decide what must stay on: fridge, lights, a medical outlet, the well pump if you have one. Write the list.",
      "Step 2. Ask for a transfer switch or an interlock kit that suits your main panel, fitted by the electrician.",
      "Step 3. Ask for a separate panel for the critical loads only. This stops the battery being drained by big loads.",
      "Step 4. Ask what permit and inspection are needed where you live, and whether your insurer needs to be told.",
      "Step 5. Ask where the battery will sit, what space and ventilation it needs, and how far it must be from exits and living space.",
      "Step 6. Ask for a main battery fuse whose interrupt rating is high enough for the battery. A seller source says Class T fuses are rated 20,000 A, and that lithium banks can deliver very large fault current. Ask the installer to show the numbers.",
      "Step 7. Ask for a DC-rated disconnect between the panels and the controller, and between the battery and the rest.",
      "Step 8. Ask what the maximum panel voltage is on the coldest day, and that it stays under the controller limit.",
      "Step 9. Ask for a written safe start-up and shut-down sequence, with labels on each switch.",
      "Step 10. Ask for the surge rating needed for the pump or fridge and test it before you leave.",
      "Step 11. Ask for the written manuals and the maker safety sheet.",
      "Step 12. No-store version: if you cannot afford this, use the power station guide for small loads, and keep the house wiring as it is."
    ],
    warn: ["Do not hire anyone who cannot show a licence where one is needed.", "Do not accept an install with unlabelled switches or no fuse on the battery."],
    tip: ["Ask for a diagram you can keep.", "Take photos before the walls are closed."],
    after: ["Test the system under load once a year with your installer."],
    sources: [SRC.classT, SRC.aic, SRC.mppt],
    unconfirmed: [NOTE, "The Class T point comes from a seller page and a forum thread, given to us. We did not find a standard we could open. The relayed text tied the transfer switch to one US code article, and we could not confirm which. We did not check Portuguese rules or permits. Panel voltage rises in the cold, as the controller manual lists. " + GEN] });

  add({ id: "sal-salvage-inspect", area: "Power • Supplies", title: "Salvaged wire, panels and fuses: inspect first, and what not to reuse",
    intro: "Second-hand parts can save money before a crisis. Some are not safe to reuse. This is a checklist of what to test and what to refuse. " + ELEC + " " + BEFORE,
    first: [
      ELEC,
      "Do not use jumper cables as permanent battery wire. Many use copper-clad aluminium and carry less current than the gauge says.",
      "Do not make a bare copper busbar in a plastic tote. A dropped tool can short it.",
      "Do not test a panel by short-circuiting it with a basic meter."
    ],
    do: [
      "Step 1. Wire: use only wire with the size and the material printed on it. Solid copper is best. If you cannot tell the size or the metal, do not use it.",
      "Step 2. A simple check for copper-clad aluminium: scrape a strand end. A silver colour under the copper means aluminium. This is common practice.",
      "Step 3. Panels: look for cracks, burn marks, a damaged back sheet and a damaged junction box.",
      "Step 4. Cover the panel with a thick sheet before you touch the plugs. A covered panel makes almost no power.",
      "Step 5. Read open-circuit voltage with a meter set to DC volts, with nothing else connected. Compare it with the label. Do this in good light and note the temperature.",
      "Step 6. Panel voltage rises in the cold. Check the controller maximum input voltage, and keep the cold-day panel voltage under it.",
      "Step 7. Connect only with a DC-rated solar disconnect switched off, and the panels covered. Never pull panel plugs apart in the sun.",
      "Step 8. Fuses: read the amp rating and the interrupt rating on the fuse. A lithium battery needs a fuse that can stop a very large fault current. Ask a qualified electrician.",
      "Step 9. Reuse only parts that you can identify and label.",
      "Step 10. Buying second-hand: meet in daylight, bring a friend, test before you pay, and refuse anything with damage or no markings.",
      "Step 11. No-store version: reuse the cords and chargers that came with your devices, only for the loads they were made for. Do not join parts to make a bigger system."
    ],
    warn: ["A live panel plug pulled apart in sun can make a DC arc that burns and starts a fire.", "A meter can be damaged by the wrong test.", "Hidden damage in second-hand batteries can start fires."],
    tip: ["Take a photo of every label you rely on.", "If in doubt, ask a qualified electrician."],
    after: ["Re-check joints and cables after the first week and after storms."],
    sources: [SRC.jump, SRC.mppt, SRC.classT],
    unconfirmed: [NOTE, "That jumper cables are often copper-clad aluminium and carry less current is reported in forum and shop pages, not in a test. The scrape check is common practice. Fuse interrupt ratings come from a seller page and a forum. We found no source for pass marks on panel tests, so none is given. Buying advice is general. " + GEN] });

  add({ id: "san-two-bucket", area: "Essentials • Sanitation", title: "Two-bucket toilet: an option that keeps liquids and solids apart",
    intro: "If the water stops, do not flush. The one-bucket toilet in the sanitation guide works. Some people keep liquids and solids in two buckets to reduce smell. " + BEFORE,
    first: [
      "Do not flush the toilet when water pressure is gone. It can back up into the house.",
      "Keep the waste buckets away from food, sleeping places and water.",
      "Wash hands with soap and safe water after every use."
    ],
    do: [
      "Step 1. Line two sturdy buckets with strong bags. Mark one liquids and one solids.",
      "Step 2. Use the liquids bucket for urine only.",
      "Step 3. Use the solids bucket for solid waste. Cover each use with sawdust, dry soil, wood ash, shavings or kitty litter.",
      "Step 4. Keep lids on. Do not fill a bucket more than half.",
      "Step 5. Tie the bag, put it in a second bag and store it in a covered bin away from children and animals.",
      "Step 6. Do not put human waste in drains, streams or near wells or food gardens.",
      "Step 7. Wash hands every time. If there is no water, use sanitizer with at least 60 percent alcohol on clean hands.",
      "Step 8. No-store version: use any two buckets, tubs or lidded pots and any dry cover you already have, such as ash, dry soil, torn paper or leaves."
    ],
    warn: ["Keep a separate bucket for a sick person.", "Clean surfaces with a bleach solution, and never mix bleach with other cleaners."],
    tip: ["A seat or board on top makes it easier for older people.", "Keep a bag of cover by the bucket."],
    after: ["Follow local rules for waste disposal when services return."],
    sources: [],
    unconfirmed: [NOTE, "The one-bucket method matches the existing sanitation guide in this app. Keeping liquids and solids apart to reduce smell is common practice and we found no named source. The relayed text said it stops toxic gas and disease. We could not confirm that, so we do not claim it. " + GEN] });

  add({ id: "comm-listen-log", area: "Home skills • Communicate", title: "Save the battery: set listening times and keep a neighbour paper log",
    intro: "When networks fail, news and help come by radio and by neighbours. Do not leave a radio on all day. " + BEFORE,
    first: [
      "Listen at set times. Turn the radio off between.",
      "Use paper for local notes. It needs no power and no signal.",
      "In danger to life, call 911 (US) or 112 (Portugal) first, if the phone works."
    ],
    do: [
      "Step 1. Pick two or three times a day. Many people choose on the hour for a few minutes. Write them on the radio.",
      "Step 2. Turn on a battery or crank radio. Try local AM and FM first. Listen for official notices: water, roads, shelters, curfews.",
      "Step 3. Write down the time and what you heard.",
      "Step 4. If nothing is on, turn it off until the next time.",
      "Step 5. Neighbour log: agree with neighbours on one safe place in daylight, such as a gate or a notice board. Use a sheet of paper in a plastic bag.",
      "Step 6. Write short notes: date, time, what you need or can share, and where to meet. Do not write names of children, medicines or when you are away.",
      "Step 7. Do not go out at night to read or leave notes.",
      "Step 8. Share the log with the family check-in card.",
      "Step 9. No-store version: use any paper, a pencil and a bag, and your own door or fence."
    ],
    warn: ["Do not post your address, valuables or when the house is empty.", "Rumours spread fast. Check what you hear against an official broadcast."],
    tip: ["Keep spare batteries in a bag with the radio.", "Cover the log with a clear bag in rain."],
    after: ["When services return, keep the log for what you learned."],
    sources: [],
    unconfirmed: [NOTE, "The five minutes on the hour idea is common practice. We found no named source for the timing. The neighbour log is general practice. " + GEN] });

  add({ id: "sec-dark-night", area: "Security • Night", title: "Keep light and noise low at night (without candles)",
    intro: "In a long outage with a weak or unsafe neighbourhood, a bright lit window can draw attention. This guide is about low light and quiet. Safety comes first. " + BEFORE,
    first: [
      "Do not use candles or flames to light the house. Fire and carbon monoxide kill.",
      "Keep one clear way out. Never block a door or a window you may need.",
      "Do not tape over smoke or carbon monoxide alarms."
    ],
    do: [
      "Step 1. Pick one small room to live in at night. See the one-room guide.",
      "Step 2. Use battery lamps on the lowest setting. Shade them.",
      "Step 3. Cover that room windows from inside with thick blankets, curtains or cardboard. Leave a way to open one window.",
      "Step 4. From outside at night, check whether light shows. Fix the gaps.",
      "Step 5. Keep voices low and radio volume low.",
      "Step 6. Keep your phone dark and in airplane mode to save power.",
      "Step 7. Keep a torch and a whistle by each bed.",
      "Step 8. Agree a family signal. Teach children what to do.",
      "Step 9. Keep doors locked. Tell a trusted neighbour about your plan.",
      "Step 10. No-store version: use what you have: blankets, cardboard, a torch with a cloth over it."
    ],
    warn: ["Do not use a fuel heater or stove in a covered room.", "Do not leave children alone in a covered room.", "In a fire, remove covers and get out."],
    tip: ["Practise getting out in the dark."],
    after: ["Remove the covers in daylight to air the room."],
    sources: [],
    unconfirmed: [NOTE, "The advice to keep light low comes from relayed text. We found no named source that lit windows raise risk, so we do not claim it. The fire and carbon monoxide rules match the existing guides in this app. " + GEN] });

  add({ id: "scn-total-blackout", area: "Scenarios • Total blackout", icon: "list", title: "Total blackout checklist: water, warmth, sanitation, news and power",
    intro: "Power, phones and water all fail at once. This checklist points to the guides that you need. " + BEFORE,
    first: [
      "Call 911 (US) or 112 (Portugal) first for danger to life, if the phone works.",
      "Water, warmth, toilet, news, then power.",
      "Use what you already have."
    ],
    do: [
      "Step 1. Water: use the water already in your home. See the guide on water when none comes.",
      "Step 2. Water heater: switch off the power or gas, close the cold inlet, open the drain at the bottom and a hot tap upstairs. See that guide for the full steps.",
      "Step 3. Make water safe: boil, or use plain unscented bleach by the drop table in that guide.",
      "Step 4. Toilet: set up a bucket toilet, or the two-bucket option.",
      "Step 5. Warmth or cool: live in one small room. See the one-room and heat guides.",
      "Step 6. Never burn fuel indoors. Carbon monoxide kills.",
      "Step 7. Food: keep the fridge shut. A closed fridge keeps food safe about 4 hours. A full freezer about 48 hours. Discard perishable food above 40 F (4 C) for 2 hours or more.",
      "Step 8. News: listen at set times to a battery or crank radio.",
      "Step 9. Power: small loads only. See the power station and no-store power guides.",
      "Step 10. Night: keep light low without candles. See that guide.",
      "Step 11. Neighbours: check on each other in daylight. Keep a paper log."
    ],
    warn: ["Do not feed the house wiring from a generator or inverter by a plug.", "Do not run a generator or stove indoors."],
    tip: ["Print this page and keep it with a torch and a radio."],
    after: ["When services return, check food, water and your equipment before using them."],
    sources: [SRC.fda],
    unconfirmed: [NOTE, "This page links guides in this app. The food times come from news summaries of FDA advice, which we did not open. " + GEN] });

  if (window.LOAD_CORE && window.LOAD_CORE.guides) {
    G.forEach(function (g) { window.LOAD_CORE.guides.push(g); });
  }
})();
