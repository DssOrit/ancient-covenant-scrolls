/* Solar and battery projects: safety lines, energy budget, wiring and fuse method, inverter surge, kit check, first power-up, troubleshooting, solar air conditioning, mobile and fixed, and power with no store. 10 guides.
   Written 29 Oct 2026 from a relayed report plus search results (pages not opened). No wire gauge or fuse table is given because no named chart was supplied.
   Buying and installing is planning for BEFORE a crisis. Every guide has a version that needs no shop. Not electrical advice: a qualified electrician decides. */
(function () {
  var NOTE = "We read search results and a relayed report about these topics. We could not open the pages, so they are cited to us, not checked by us.";
  var GEN = "Steps marked as general practice are common advice. We did not find a named source for each one.";
  var ELEC = "Power can burn, start a fire and kill. Do not treat a home-made power system as safe by default. Where this guide says call a qualified electrician, do that.";
  var BEFORE = "Plan, buy and test this BEFORE a crisis. In a crisis shops may be closed. The no-store steps are for when you could not prepare.";
  var SRC = {
    vicForum: ["Victron Community: cable resistance and voltage drop thread (a 3 percent rule of thumb from a forum answer), cited to us, not checked", "https://communityarchive.victronenergy.com/questions/202260/why-doesnt-victron-specify-the-resistance-of-the-p.html"],
    vicBook: ["Wiring Unlimited by Victron (book listing: current, cable resistance, voltage drop, fuses), cited to us, not checked", "https://www.bimblesolar.com/wiring-unlimited-book"],
    pwm: ["Victron Community: PWM reality against expected MPPT output, cited to us, not checked", "https://communityarchive.victronenergy.com/questions/59779/pwm-reality-vs-expected-mppt-production-for-rv.html"],
    pwm2: ["Footprint Hero: PWM vs MPPT charge controllers (a blog), cited to us, not checked", "https://footprinthero.com/pwm-vs-mppt-charge-controllers"],
    fda: ["FoodSafety.gov blog archive: food safety in a power outage, cited to us, not checked", "https://webarchive.library.unt.edu/web/20130218132749/http://www.foodsafety.gov/blog/power_outages.html"],
    fdaNews: ["News summary of FDA advice: fridge keeps food cold about 4 hours, cited to us, not checked", "https://okcfox.com/news/local/fda-fridge-will-keep-food-cold-for-4-hours-in-a-power-outage"],
    starter: ["Pedal Commander: deep cycle and starter batteries (a blog), cited to us, not checked", "https://pedalcommander.com/blogs/backyard/difference-between-deep-cycle-and-starter-batteries"],
    safety: ["Occupational Safety Academy: electrical hazards of solar PV and battery storage, cited to us, not checked", "https://occupationalsafetyacademy.com/blogs/news/electrical-hazards-and-safety-controls-for-solar-pv-and-battery-storage-systems"],
    ufsw: ["UFSW: solar PV system safety and fire ground procedures, cited to us, not checked", "https://ufsw.org"],
    seBat: ["SolarEdge: home battery emergency response guide, cited to us, not checked", "https://knowledge-center.solaredge.com"]
  };
  var G = [];
  function add(g) { g.checkedOn = "29 Oct 2026"; g.status = "partly"; g.difficulty = g.difficulty || "Practical"; g.area = "Power • Solar projects"; g.icon = g.icon || "sun"; g.source = g.sources.length ? g.sources[0][1] : ""; G.push(g); }

  add({ id: "sol-safety-lines", title: "Solar and battery safety: when you must call an electrician",
    intro: "A solar and battery system looks simple. One wrong connection can burn a house. " + ELEC + " " + BEFORE,
    first: [
      ELEC,
      "Never plug a generator or inverter into a wall socket with a double-ended cord to feed the house. It can send power back up the street and kill a person who is repairing the lines.",
      "Do not connect any inverter, generator or battery system to the main electrical panel yourself. A qualified electrician must fit an approved transfer switch.",
      "Do not cut into, splice or reroute the fixed wiring in the walls, junction boxes or the main panel."
    ],
    do: [
      "Step 1. Decide what you want to run. Small items (lights, phone, radio, a fridge on its own cord) can run from a power station or a small system without touching the house wiring.",
      "Step 2. Keep it separate. Plug each device into the system with its own cord. Do not feed the house circuits.",
      "Step 3. If you want the house wiring powered, hire a qualified electrician to fit the transfer switch and to check local rules.",
      "Step 4. Check your building rules and your insurance before you fit a fixed battery. Rules differ by country, state and area. We could not check the rules for your place.",
      "Step 5. Keep a fire extinguisher, a working smoke alarm and a clear exit near the battery.",
      "Step 6. Write down where the main shut-off for each part is. Show every adult."
    ],
    warn: ["Do not touch bare wires or live connections.", "Do not leave a damaged battery in the house. If it swells, smells, gets hot or smokes, move people out and call 911 (US) or 112 (Portugal).", "Do not use a battery that has been crushed, punctured or soaked."],
    tip: ["Small and separate is safer than big and joined to the house.", "Ask the maker or installer for the written safety sheet for your battery."],
    after: ["After a storm or flood, do not use a battery or panel that was in water or was hit. Have it checked."],
    sources: [SRC.safety, SRC.seBat, SRC.ufsw],
    unconfirmed: [NOTE, "That a transfer switch is needed, and that feeding the house by plug is dangerous, are common electrical safety rules. We did not confirm the exact law for each place. Whether it is illegal depends on the place, so we say unsafe and widely banned. The National Electrical Code is named in the report. We found no section number. " + GEN] });

  add({ id: "sol-wh-budget", title: "Work out your daily power use: a worked example in watt-hours",
    intro: "Size a system from real numbers, not guesses. This example shows the method. Use the numbers on your own labels. " + BEFORE,
    first: [
      "Watts times hours equals watt-hours (Wh). Add every device. That is your daily use.",
      "If a label shows only volts and amps, multiply them to get watts.",
      "A fridge does not run all day. It cycles, so count the hours the motor actually runs."
    ],
    do: [
      "Step 1. List every device you would run in a crisis. Read the watts on its label.",
      "Step 2. Write the hours per day for each. Multiply watts by hours.",
      "Step 3. Example only: lights 10 W for 6 hours is 60 Wh. Radio or router 15 W for 12 hours is 180 Wh. Two phones, 12 W for 2 hours each, is 48 Wh. A breathing machine 60 W for 8 hours is 480 Wh (read your own label). A fridge 200 W for 4 running hours is 800 Wh. The total is 1,568 Wh.",
      "Step 4. Allow for inverter loss. Divide by 0.85 (a typical figure). 1,568 divided by 0.85 is about 1,845 Wh from the battery.",
      "Step 5. Change Wh to amp-hours. Divide by the battery voltage. 1,845 divided by 12 volts is about 154 Ah per day.",
      "Step 6. Add a safety margin for how deep the battery may be drained. LiFePO4 at 80 percent: 154 divided by 0.8 is about 192 Ah for one day. Lead-acid at 50 percent: 154 divided by 0.5 is about 307 Ah.",
      "Step 7. Check against the battery you have. One 12 V 100 Ah LiFePO4 battery holds about 1,280 Wh, or about 1,024 Wh at 80 percent. That is less than this example needs, so cut loads or use more batteries.",
      "Step 8. Do not forget the start-up surge of motors such as a fridge. See the inverter surge guide.",
      "Step 9. No-store version: cross off the biggest items. Keep lights, radio, phones and medical items. Run the fridge only in short, timed cycles (see the no-store power guide)."
    ],
    warn: ["The example numbers are typical, not yours. Replace them with your labels.", "Do not drain a battery below its safe level. It lowers its life and can be unsafe."],
    tip: ["Write the table on paper and keep it with the battery.", "Cut the biggest user first. It saves the most."],
    after: ["Test the plan for one day before a real outage."],
    sources: [SRC.vicBook],
    unconfirmed: [NOTE, "The arithmetic was checked by us and is correct. The 0.85 inverter figure, the 80 and 50 percent depth limits and the example watts are typical planning figures, not from a named source. They match the existing off-grid solar guide in this app. " + GEN] });

  add({ id: "sol-wiring-fuse", title: "Wire size, voltage drop and fuses: the method (and when to ask an electrician)",
    intro: "Thin wire gets hot and wastes power. A missing fuse can start a fire. This guide gives the method. It gives no wire or fuse table, because we found no named chart. " + ELEC,
    first: [
      "Wire must carry the current without getting hot, and must not lose much voltage over the length.",
      "A fuse or breaker protects the wire. It does not protect the appliance.",
      "A battery can push thousands of amps into a shorted wire. Every battery needs a fuse close to it."
    ],
    do: [
      "Step 1. Find the current. Divide watts by volts. A 1,000 W load at 12 V is about 83 A, more with loss.",
      "Step 2. Longer runs need thicker wire. If you double the length, the loss doubles unless the wire is thicker.",
      "Step 3. Keep voltage drop low. One forum answer on a Victron page gives about 3 percent as the most for the main battery-to-inverter run. Treat that as a rule of thumb.",
      "Step 4. Fuse the positive wire close to the battery, before the wire passes near metal or through a wall. Many installers keep it within a few inches. Treat that as common practice.",
      "Step 5. For a steady load, a common method is to size the fuse about 125 percent of the steady current, and to pick wire that is rated for at least the fuse. Check the maker chart for your wire and fuse.",
      "Step 6. Read the wire maker chart and the fuse maker chart for the actual sizes. If you cannot, ask a qualified electrician.",
      "Step 7. Make tight, clean joints. A loose joint heats up. Use proper lugs and heat shrink.",
      "Step 8. Test with a meter before switching on. See the first power-up guide.",
      "Step 9. No-store version: use only the cords that came with your equipment. Do not add thin wire to carry a big load."
    ],
    warn: ["Do not guess a wire size or a fuse size.", "Do not use thin kit wire for long, high-current runs.", "Do not skip the fuse."],
    tip: ["Keep battery-to-inverter wires short and thick.", "Label each wire and fuse."],
    after: ["Check joints for heat and loose bolts once a year."],
    sources: [SRC.vicForum, SRC.vicBook],
    unconfirmed: [NOTE, "The 3 percent figure is from a forum answer, not from the Victron book. The close-to-the-battery distance is common practice. We found no source for a specific distance, so we give none as a rule. The 125 percent method is common and we could not tie it to a named code section. No wire or fuse size is given, by design. " + GEN] });

  add({ id: "sol-inverter-surge", title: "Inverters: surge power and the right waveform",
    intro: "A fridge, freezer, fan or pump uses far more power for a second or two when it starts. An inverter that is too small shuts off. " + BEFORE,
    first: [
      "Motors need a big surge to start. Plan for it.",
      "Use a pure sine wave inverter for motors and electronics.",
      "Read both the continuous watts and the surge watts on the inverter."
    ],
    do: [
      "Step 1. Find the running watts on the appliance label.",
      "Step 2. Plan for a start-up surge several times higher. A common range for a fixed-speed compressor is 3 to 7 times. Check your label or maker.",
      "Step 3. Read the inverter surge rating and how many seconds it lasts. A common figure is only 1 to 3 seconds.",
      "Step 4. Choose an inverter whose continuous rating covers all items running together, and whose surge covers the biggest motor starting.",
      "Step 5. Choose pure sine wave for fridges, freezers, pumps and anything with a motor or a screen.",
      "Step 6. Start the biggest motor first, and alone. Add small items after.",
      "Step 7. No-store version: if the inverter trips on start, switch off other loads first. Try again with only that item."
    ],
    warn: ["A modified sine wave inverter can make a motor run hot and wear out sooner.", "Do not run more load than the continuous rating."],
    tip: ["Write the continuous and surge watts of each device on its plug.", "A soft-start or variable-speed motor needs less surge."],
    after: ["Note which loads tripped the inverter and plan around them."],
    sources: [SRC.vicBook],
    unconfirmed: [NOTE, "The 3 to 7 times surge range and the 1 to 3 second surge window are common figures in the relayed report. We found no named source for the numbers, so read your own labels. " + GEN] });

  add({ id: "sol-kit-check", title: "How to spot a weak solar kit before you buy",
    intro: "Some kits give a big watt number on the box and do not deliver. Check these things first. " + BEFORE,
    first: [
      "A big inverter does not make a strong kit. The panels, battery and wire matter as much.",
      "Check that the panels can refill what you use in a day.",
      "Do not buy a kit in an emergency. Choose before."
    ],
    do: [
      "Step 1. Compare the panel watts with your daily use. A kit that shows 1,500 W of inverter with one 100 W panel cannot refill a battery that a large load drains.",
      "Step 2. Read the charge controller type. PWM is cheaper. MPPT often harvests more, one vendor says 10 to 30 percent more. In small systems the difference may not matter.",
      "Step 3. Read the wire size and the plugs. Thin wire with small plastic plugs, used for a high current, loses power and can get hot.",
      "Step 4. Check the battery type and the usable amp-hours. See the energy budget guide.",
      "Step 5. Check there is a fuse or breaker on the battery.",
      "Step 6. Read reviews that show real measured output, not only the box numbers.",
      "Step 7. Write down the voltage of the panels, controller and battery. They must match.",
      "Step 8. No-store version: if you already own parts, use the energy budget to decide what you can run. Do not mix mismatched parts."
    ],
    warn: ["Do not trust the box watt number alone.", "Do not join parts with unknown voltage limits."],
    tip: ["Ask for the data sheet. A good maker publishes it."],
    after: ["Keep the manuals and the receipts."],
    sources: [SRC.pwm, SRC.pwm2],
    unconfirmed: [NOTE, "The relayed report says PWM wastes 30 to 40 percent. Search results do not support that. They show gaps of about 6 points in peak efficiency up to 10 to 30 percent more harvested for MPPT, depending on the setup. We use the 10 to 30 percent harvest figure, from a vendor. We found no official Victron percentage. " + GEN] });

  add({ id: "sol-first-power-up", title: "First power-up: the safe order for a new solar system",
    intro: "The first switch-on is the riskiest moment. Follow this order. " + ELEC,
    first: [
      "Connect the battery first. Disconnect the solar panels first.",
      "Check polarity with a meter at every joint. Do not trust wire colours.",
      "Start with every breaker and switch off."
    ],
    do: [
      "Step 1. Confirm every breaker, fuse and switch is OFF or removed.",
      "Step 2. With a meter, check plus to plus and minus to minus at each joint.",
      "Step 3. Put in the battery fuse, or switch on the battery breaker. The controller or inverter screen should light and show a battery voltage that matches your meter.",
      "Step 4. Switch on the solar disconnect. The controller will wait a short time, then start charging.",
      "Step 5. Switch on the inverter output.",
      "Step 6. Plug in one small load, such as a lamp. Watch for error lights, clicking relays or heat.",
      "Step 7. Add loads one at a time.",
      "Step 8. To shut down: switch off loads, then the inverter, then the solar, then the battery last.",
      "Step 9. No-store version: if you have only a small panel and a battery, still connect battery first and panel second."
    ],
    warn: ["If anything smells, hisses or heats, switch off and step away.", "Connecting panels before the battery can damage some controllers. Read your manual."],
    tip: ["Take a photo of the final wiring for later.", "Write the shut-down order on the box."],
    after: ["Re-check joints for heat after the first full day."],
    sources: [SRC.vicBook, SRC.safety],
    unconfirmed: [NOTE, "Battery first and panel last is the usual advice in controller manuals. Your controller manual decides. We did not open one. " + GEN] });

  add({ id: "sol-troubleshoot", title: "Solar troubleshooting and upkeep",
    intro: "Panels have few moving parts, but weather, dirt and loose joints cause trouble. " + ELEC,
    first: [
      "Never pull apart the plugs between panels while the sun is on them and power is flowing. The arc can burn you or start a fire.",
      "Switch off the solar disconnect first.",
      "Check simple things first: shade, dirt, loose joints, a blown fuse."
    ],
    do: [
      "Step 1. Look for shade, dirt, snow or leaves on the panels.",
      "Step 2. Check fuses and breakers.",
      "Step 3. Switch off the solar disconnect. Then, with a meter, read the open circuit voltage of the panels and compare to the label.",
      "Step 4. If the panel reads near its label with no load, but power collapses under load, a cell crack or a failed diode in the junction box may be the cause. Ask a qualified person.",
      "Step 5. Look at joints for heat marks, green corrosion or looseness.",
      "Step 6. Wipe panels with water and a soft cloth when cool. Do not use harsh cleaners.",
      "Step 7. Check battery voltage and temperature on a schedule.",
      "Step 8. Keep a notebook of dates, readings and what you changed.",
      "Step 9. No-store version: clean panels with water and a cloth, check joints by hand with the system off, and keep a log."
    ],
    warn: ["Do not walk on panels.", "Do not work on a roof in wind or rain.", "A damaged panel can still produce power in light."],
    tip: ["Check after every big storm."],
    after: ["Do a full check twice a year."],
    sources: [SRC.safety, SRC.ufsw],
    unconfirmed: [NOTE, "The advice not to unplug live panel connectors, and to switch off first, is common safety guidance. The diagnosis steps are general practice. " + GEN] });

  add({ id: "sol-ac", title: "Air conditioning on solar: what is realistic",
    intro: "Cooling needs a lot of power. It changes the whole system. " + BEFORE,
    first: [
      "A fixed-speed window unit starts with a big surge and can overwhelm a small battery system.",
      "An inverter (variable-speed) mini-split ramps up gently and needs far less surge.",
      "Plan for daytime cooling. Night cooling drains the battery fast."
    ],
    do: [
      "Step 1. Read the watts of the cooling unit. Add its start-up surge. See the inverter surge guide.",
      "Step 2. Size panels to run the unit in the day, and size the battery only for the hours you need after dark. Use the energy budget guide.",
      "Step 3. Choose an inverter-driven mini-split if you can. It starts gently.",
      "Step 4. Some systems use units that run directly on panel DC power. A source in the relayed report says this avoids an inverter loss of 10 to 15 percent. We found no source for that number.",
      "Step 5. Cool one room only. Close doors and shade windows.",
      "Step 6. Plan a fallback for hot nights: fans, water, light clothes, the coolest room, see the heat guides in this app.",
      "Step 7. No-store version: use shade, ventilation at night, wet cloths, and a small fan on a small battery. See the heat and cold guides.",
      "Step 8. Do not run cooling off a car battery for long."
    ],
    warn: ["Heat illness is dangerous. Do not depend on a solar cooler alone.", "Do not oversize loads on a small inverter."],
    tip: ["Insulate and shade first. It lowers the load."],
    after: ["Note how many hours of cooling the system gave."],
    sources: [SRC.vicBook],
    unconfirmed: [NOTE, "The inverter-driven mini-split point is common engineering advice. The 10 to 15 percent direct-DC saving has no named source. Mini-split, window and DC units differ by model. We did not check any model. " + GEN] });

  add({ id: "sol-mobile-fixed", title: "Vehicle (RV) and fixed (cabin or tiny home) solar: what differs",
    intro: "The same electrical rules apply. The setting changes the wire, the mounting and the grounding. " + ELEC,
    first: [
      "In a vehicle, vibration breaks stiff wire. Use flexible, fine-stranded wire.",
      "In a fixed building, long runs from panels to the building need thicker wire.",
      "Grounding differs. Ask a qualified person for yours."
    ],
    do: [
      "Step 1. Vehicle: keep wire runs short and well clamped. Protect wire where it passes through metal.",
      "Step 2. Vehicle: expect vibration, so check joints more often.",
      "Step 3. Vehicle: grounding uses the vehicle chassis. Do not guess. Check the maker guide.",
      "Step 4. Fixed: roof mounts must be rated for wind and snow in your area. Ask an installer.",
      "Step 5. Fixed: long panel-to-building runs lose voltage. See the wire and fuse guide.",
      "Step 6. Fixed: grounding usually means an earth connection. Rules vary by place. Ask a qualified electrician.",
      "Step 7. No-store version: in a vehicle, a small panel on the dash or ground, with a battery you already own, can charge a radio and phone."
    ],
    warn: ["Do not copy a grounding method from another place."],
    tip: ["Take photos of wiring in both cases."],
    after: ["Check mounts and joints every season."],
    sources: [SRC.safety],
    unconfirmed: [NOTE, "The vehicle and fixed differences come from the relayed report, with no named source. They are general. Grounding rules differ by country. We did not check Portugal or US rules. " + GEN] });

  add({ id: "sol-no-store-power", title: "Power with no store: car battery, small panel and the fridge",
    intro: "This is for when you did not prepare and shops are shut. It uses what many homes already have. " + ELEC,
    first: [
      "A car starter battery is not made for deep use. Keep draws short and shallow, and keep it charged by running the car.",
      "A closed fridge keeps food safe about 4 hours without power. A full freezer about 48 hours.",
      "Above 40 F (4 C) for 2 hours or more, discard perishable food."
    ],
    do: [
      "Step 1. Put a thermometer in the fridge and the freezer now, if you can.",
      "Step 2. Keep doors shut. Open only to take what you need, fast.",
      "Step 3. Fill spare space in the fridge and freezer with bottles of water. They hold cold longer.",
      "Step 4. Car battery: run the car outdoors, never in a closed garage, to keep the battery charged. Use a small plug-in inverter only for light loads such as a phone or radio.",
      "Step 5. Do not drain a starter battery more than a little. If the car will not start, you have lost your transport.",
      "Step 6. If you must try to run the fridge in short bursts from a small supply, treat it as an experiment. Watch the thermometer. Stop and discard food if it is above 40 F for 2 hours.",
      "Step 7. Eat the fridge food first, then the freezer food. Keep the rest in a cool, shaded place.",
      "Step 8. Plan the next step before the food spoils. See the stay-safe and food guides."
    ],
    warn: ["Never run a car or a generator indoors. Carbon monoxide kills.", "Do not trust smell or looks for food safety. Use temperature and time."],
    tip: ["Frozen water bottles are a free cold pack."],
    after: ["After the outage, throw away any food that stayed warm too long."],
    sources: [SRC.fda, SRC.fdaNews, SRC.starter],
    unconfirmed: [NOTE, "The 4 hour fridge and 48 hour full freezer windows and the 40 F and 2 hour discard rule are in the news summaries of FDA advice. We did not open the FDA page. The relayed report said run the fridge 30 to 45 minutes every 3 to 4 hours and that it saves up to 75 percent. We found no source and it can risk food safety, so it is only an experiment here. Where starter battery harm begins differs by source, from about 50 to about 80 percent. We found no Delphi page. " + GEN] });

  if (window.LOAD_CORE && window.LOAD_CORE.guides) {
    G.forEach(function (g) { window.LOAD_CORE.guides.push(g); });
  }
})();
