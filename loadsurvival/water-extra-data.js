/* Water guides for river water, rainwater and seawater. Figures follow CDC and EPA emergency-water guidance.
   Rule: homemade filters remove dirt only. They do not make water safe. */
(function () {
  var G = [
    {
      id: "wx-river", icon: "drop", area: "Water", difficulty: "Essential",
      title: "Make river or stream water safer",
      intro: "River water is never safe to drink as it is. Make it safe in three steps: strain it, filter it, then disinfect it.",
      first: ["Never drink river, stream or lake water raw.", "Pick the clearest, moving water you can find, upstream of towns, farms, animals and roads.", "Treat it in three steps: strain, filter, then disinfect."],
      do: ["Collect from moving water, just below the surface and away from the bank, in a clean container. Skip water with foam, green scum, a bad smell or an oily shine.", "Let it settle for at least 30 minutes. Pour the clearer water from the top into a second clean container. Leave the dirt behind.", "Strain it through a clean cloth or coffee filter. A homemade layer of sand, charcoal and gravel only removes dirt. It does not make water safe.", "Filter it through a portable water filter that the label says removes bacteria and protozoa. Many filters do not remove viruses.", "Disinfect it. Boil for 1 minute, or 3 minutes above 6,500 ft (2,000 m). Or use unscented household bleach that is 5 to 6%, 8 drops per gallon (3.8 L), stir and wait 30 minutes. Or use tablets as the label says."],
      table: { head: ["Step", "What it removes"], rows: [["Settle and strain", "Dirt and large particles only"], ["Portable filter", "Most bacteria and protozoa (check the label)"], ["Boil, bleach or tablets", "Bacteria, viruses and most parasites"], ["Homemade sand or charcoal filter", "Dirt only. Not safe on its own"]] },
      warn: ["Never rely on a homemade filter to make water safe.", "Do not use water that may hold fuel, chemicals, farm runoff, sewage or a dead animal. Look for another source.", "Never drink floodwater.", "Bleach does not kill every parasite. Boiling is the most reliable choice when you have fuel."],
      tip: ["Boil first if you only have one method.", "Store treated water in a clean, covered container and label it."],
      after: ["Wash your hands and containers with safe water.", "If anyone has stomach pain, vomiting or diarrhea, give safe fluids and seek medical help."]
    },
    {
      id: "wx-rain", icon: "rain", area: "Water", difficulty: "Essential",
      title: "Make rainwater safe to drink",
      intro: "Rain from a clean sky is the cleanest water outdoors. Roofs, gutters and tanks add dirt and germs, so treat it before you drink.",
      first: ["Catch the rain in a clean, covered container.", "Throw away the first minutes of runoff from a roof.", "Treat it before you drink."],
      do: ["Catch rain in clean, food-safe containers set in the open, away from trees, or from a clean tarp or plastic sheet.", "From a roof: let the first 10 minutes of rain run to waste to wash off dust and droppings. A first-flush diverter does this for you.", "Strain the water through a clean cloth to remove leaves and grit.", "Disinfect it. Boil for 1 minute, or 3 minutes above 6,500 ft (2,000 m). Or use unscented household bleach that is 5 to 6%, 8 drops per gallon (3.8 L), stir and wait 30 minutes. Or use tablets as the label says.", "Store it in a clean, covered container with a tight lid and a mosquito screen. Keep it in the shade. Label it and use it first."],
      warn: ["Do not collect from roofs coated with chemicals, or from roofs with ash on them, for example after a fire. Do not use runoff from lead flashing or treated wood.", "Boiling kills germs. It does not remove chemicals or metals.", "Check local rules on collecting rainwater. Some places limit it during drought."],
      tip: ["Rain is the best answer when you are far from fresh water. Set out every clean container when it starts to rain.", "Keep a tarp ready to use as a catcher."],
      after: ["Rinse and dry your containers between storms.", "Rotate stored water every 6 months."]
    },
    {
      id: "wx-sea", icon: "waves", area: "Water", difficulty: "Critical",
      title: "Seawater: what works and what does not",
      intro: "Seawater cannot be filtered or boiled to make it drinkable. Salt dehydrates the body and can kill. Only desalination or distillation removes salt.",
      first: ["Never drink seawater.", "Do not drink urine.", "Look for rain, dew or fresh water first."],
      do: ["Know what fails: cloth, sand, charcoal, camping filters, tablets, bleach and boiling do not remove salt.", "Know what works: distillation (boil the water and catch the steam), and a manufactured reverse-osmosis desalinator.", "If you have a reverse-osmosis desalinator, follow its manual and flush it with fresh water after use.", "To distill, follow the Make seawater drinkable by distilling guide. It makes only small amounts.", "Catch rain with a tarp or sheet as soon as it falls, and drink that first. Rest in shade and sip small amounts often."],
      table: { head: ["Method", "Removes salt?"], rows: [["Cloth, sand or charcoal filter", "No"], ["Portable camping filter", "No"], ["Boiling", "No"], ["Bleach or tablets", "No"], ["Distillation (catch the steam)", "Yes, in small amounts"], ["Reverse-osmosis desalinator", "Yes"]] },
      warn: ["Drinking seawater makes you more dehydrated and can cause serious illness or death.", "Boiling seawater without catching the steam only leaves stronger brine.", "Never drink urine or floodwater."],
      tip: ["Carry a small manufactured desalinator on boats and beach trips.", "Store fresh water. Do not plan to rely on the sea."],
      after: ["Rehydrate with safe fresh water.", "Seek medical help for confusion, vomiting or very dark urine."]
    }
  ];
  G.forEach(function (g) { g.after = g.after || []; g.tip = g.tip || []; g.source = "https://www.cdc.gov/water-emergency/about/"; });
  window.LOAD_WATER_EXTRA = G;
  if (window.LOAD_CORE) { window.LOAD_CORE.guides = window.LOAD_CORE.guides.concat(G); }
})();
