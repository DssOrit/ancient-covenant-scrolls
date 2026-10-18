/* Home skills guides. Written for Load Survival from general USDA, CDC, FEMA and extension-service guidance.
   General information only. Reference, not training. Spec format: first / do / warn / tip / after. */
(function () {
  var FOOD = "Food preservation is a reference, not training. Follow current USDA or your national food-safety guidance and take a course before you preserve food to store.";
  var G = [
    {
      id: "hs-bread-no-yeast", icon: "can", difficulty: "Practical", title: "Bake bread without yeast",
      intro: "Baking soda and an acid raise bread with no yeast and no waiting. Good for a quick loaf when the shop is empty.",
      first: ["Use a heat source that is safe: an oven, or a covered pot outdoors on a stove.", "Wash your hands and clean the surface.", "Measure with the same cup or spoon every time."],
      do: ["Soda bread: mix about 3 cups (400 g) flour, 1 tsp baking soda and 1 tsp salt in a bowl.", "Stir in about 1 1/4 cups (300 ml) buttermilk, or milk with 1 tbsp vinegar or lemon juice. Mix only until it comes together.", "Shape a round loaf, cut a deep cross on top and bake at about 400 F (200 C) for 30 to 40 minutes. It sounds hollow when tapped underneath.", "Flatbread, no oven: mix flour, water and a little salt into a soft dough, roll thin, and cook in a dry pan 1 to 2 minutes each side.", "Cool before slicing."],
      table: { head: ["Quick flatbread", "Amount"], rows: [["Flour", "2 cups (250 g)"], ["Water", "About 3/4 cup (180 ml)"], ["Salt", "1/2 tsp"], ["Cook time", "1 to 2 min per side"]] },
      warn: ["Do not cook with charcoal, a grill or a camp stove indoors. Carbon monoxide kills.", "Wet dough left out for hours can grow bacteria. Bake soon.", "Eat fresh. Do not seal warm bread in a jar to store it. See Dry-pack baking mixes."],
      tip: ["Keep flour, baking soda and salt dry in a sealed container so you can bake at any time.", "Add herbs or cheese for flavor."],
      after: ["Store cooled bread wrapped at room temperature for 1 to 2 days, or freeze slices.", "Wash pans and bowls with safe water."]
    },
    {
      id: "hs-hardtack", icon: "can", difficulty: "Practical", title: "Hardtack: a dry emergency biscuit",
      intro: "Hardtack is a very dry, hard biscuit made from flour, water and salt. It keeps well when it is truly dry and sealed.",
      first: ["Mix and bake it at home before you need it. Do not wait for an emergency.", "Work on a clean surface with clean hands.", "Plan to soften it before eating."],
      do: ["Mix 2 cups (250 g) flour, about 3/4 cup (180 ml) water and 1 tsp salt into a stiff dough.", "Roll it out about 1/2 in (1.3 cm) thick and cut it into squares. Poke holes in each with a fork.", "Bake at about 250 to 300 F (120 to 150 C) for about 2 hours, flip once, then leave in the turned-off oven until fully dry.", "Cool completely. Store in an airtight container with a food-safe moisture packet.", "To eat: dunk in hot soup, tea or water until soft."],
      warn: ["It is very hard. It can break teeth. Always soften it.", "Any moisture grows mold. Throw it away if it smells musty or shows spots or insects.", "Shelf life varies with how dry it is. Check it every few months."],
      tip: ["It is a fuel food, not a full meal. Pair it with protein and water.", "Add a little extra water when you soften it for children."],
      after: ["Rotate your stock. Eat old biscuits and bake new ones.", "Label the container with the date."]
    },
    {
      id: "hs-beans", icon: "can", difficulty: "Practical", title: "Cook dried beans safely",
      intro: "Dried beans are cheap, filling protein that keeps a long time. They must be cooked properly.",
      first: ["Sort the beans and throw out stones and shriveled beans.", "Rinse them in clean water.", "Use safe drinking water for soaking and cooking."],
      do: ["Soak overnight (8 hours) in plenty of water, or quick soak: boil 2 minutes, then stand 1 hour.", "Pour off the soaking water. This removes some of the gas-causing sugars.", "Cover with fresh water and bring to a hard boil. Then simmer until tender, usually 1 to 2 hours.", "Add salt and acidic foods like tomato near the end. They can slow softening.", "Cook a big pot. Beans keep in the fridge about 3 days when cooled quickly."],
      warn: ["Raw or undercooked kidney beans contain a toxin. Boil them hard for at least 10 minutes, then simmer until soft. Do not use a low-heat slow cooker for raw kidney beans.", "Cool leftovers within 2 hours. Discard anything left out longer.", "Beans swell. Use a big pot."],
      tip: ["Pair beans with rice for a more complete protein.", "A pinch of baking soda in the soak water can soften old beans."],
      after: ["Freeze cooked portions for later if you have power.", "Keep dry beans in sealed containers away from moisture."]
    },
    {
      id: "hs-eggs", icon: "jar", difficulty: "Practical", title: "Eggs: store and test them",
      intro: "Eggs keep longer than many people think. Know how to store them and how to check one that may be old.",
      first: ["Never use a cracked or dirty-shelled egg for anything you will not cook fully.", "Wash your hands after touching raw eggs.", "Cook eggs until firm."],
      do: ["Keep eggs cold at 40 F (4 C) or below. Refrigerated eggs keep for weeks.", "If you have no fridge, store clean eggs in a cool place and use them within days to a couple of weeks.", "Float test: put the egg in a bowl of cold water. It sinks and lies flat: fresh. It stands upright at the bottom: older, use soon. It floats: throw it out.", "Crack it into a separate bowl first. Throw it out if it smells bad or looks pink or green.", "Dried (powdered) eggs from a shop keep well sealed. Use them for baking and scrambled eggs."],
      warn: ["The float test shows age, not safety. A sinking egg can still be bad. Always smell and look.", "Do not eat raw eggs when you are pregnant, very young, old or ill.", "Discard eggs left above 40 F (4 C) for more than 2 hours."],
      tip: ["Write the date on the carton.", "Hard-boil eggs for travel and eat within a week when chilled."],
      after: ["Wash hands, bowls and counters with soap and safe water.", "Use older eggs first."]
    },
    {
      id: "hs-food-storage", icon: "can", difficulty: "Essential", title: "Store food safely long term",
      intro: "Cool, dry, dark and sealed is the rule. Good storage protects your food from pests, moisture and mold.",
      first: ["Pick a cool, dry, dark place away from heat and chemicals.", "Use food-grade containers with tight lids.", "Write the date on everything."],
      do: ["Keep food at about 50 to 70 F (10 to 21 C). Heat shortens shelf life.", "Store food off the floor and away from outside walls and pipes.", "Use first in, first out. Put new food at the back, old food at the front.", "Use thick, sealed containers for flour, rice and beans so mice and insects cannot get in.", "Use oxygen absorbers only with very dry foods like rice, wheat and dry beans."],
      table: { head: ["Rough guide", "Time"], rows: [["Canned food, cool and dry", "1 to 2 years for best quality"], ["Dry rice, beans, pasta", "Many months to years if dry and sealed"], ["Flour and baking mixes", "6 to 12 months for best quality"], ["Opened packs", "Weeks to months"]] },
      warn: ["Throw away swollen, dented-at-the-seam or leaking cans.", "Do not use oxygen absorbers with moist foods, oils or honey. Botulism risk.", "Never taste food to test it."],
      tip: ["Keep a simple stock list on the fridge.", "Store foods your family already eats."],
      after: ["Check stock every 3 months.", "Use up what is old and replace it."]
    },
    {
      id: "hs-canning", icon: "jar", difficulty: "Advanced", title: "Home canning: the safe rules",
      intro: "Canning preserves food for months, but it can make botulism if done wrong. Follow tested methods only.",
      noteText: FOOD,
      first: ["Use only tested recipes from USDA, the National Center for Home Food Preservation or your national food-safety agency.", "Use proper canning jars with new lids.", "Take a course before your first batch."],
      do: ["High-acid foods (most fruits, jams, pickles) can be processed in a boiling-water canner.", "Low-acid foods (vegetables, meat, beans, soups) need a pressure canner. A boiling-water canner is not hot enough.", "Follow the recipe exactly for time, pressure and headspace. Adjust for your altitude.", "Cool jars undisturbed for 12 to 24 hours. Check that each lid is sealed and does not flex.", "Store jars without the ring in a cool, dark, dry place and label with the date."],
      warn: ["Never can bread, butter, flour, dairy, pumpkin purée or thick mixtures. There are no safe home methods.", "Never use an oven, microwave, dishwasher or open-kettle method.", "Throw out any jar that is bulging, leaking, spurting liquid, or smells off. Do not taste it.", "Boil home-canned low-acid food for 10 minutes before eating, for added safety. Add 1 minute for each 1,000 ft (300 m) above 1,000 ft (300 m)."],
      tip: ["Keep a record of each batch.", "Start with high-acid foods like jam and pickles."],
      after: ["Check jars every month for the first year.", "Eat old jars first."]
    },
    {
      id: "hs-fire-pit", icon: "flame", difficulty: "Practical", title: "Low-smoke outdoor fire pit",
      intro: "A small, hot, well-built fire burns cleaner and uses less wood. Outdoors only.",
      first: ["Check local fire restrictions. Do not light a fire in dry, windy conditions.", "Build outdoors, never in a garage, tent, car or room.", "Keep water, sand or a shovel within reach."],
      do: ["Pick bare ground at least 10 ft (3 m) from buildings, fences, trees and dry grass. Clear leaves and branches in a circle.", "Dig a shallow pit or ring it with stones. For a Dakota fire hole, dig a hole about 12 in (30 cm) wide and deep and a small air tunnel on the windward side.", "Use dry, seasoned hardwood, split small. Wet wood makes thick smoke.", "Start small with tinder, then kindling, then fuel. Add wood slowly.", "Cook on a grate or pot stand over the coals, not the flame."],
      warn: ["Never leave a fire alone. Never leave it burning when you sleep.", "Smoke and carbon monoxide are deadly in closed spaces.", "Do not burn painted, treated or pressure-treated wood, plastic or trash.", "Portugal: open fires are banned in many areas in summer. Check ICNF and local notices."],
      tip: ["A small fire with a ring of stones concentrates heat for cooking.", "Keep wood dry under a tarp."],
      after: ["Drown the fire with water, stir the ashes and feel for heat with the back of your hand. It must be cold.", "Take ashes only when fully cold. See Wood ash."]
    },
    {
      id: "hs-wood-ash", icon: "flame", difficulty: "Practical", title: "Wood ash: use it safely",
      intro: "Cold ash from clean wood has uses in the garden and the home. It can also burn skin and start fires.",
      first: ["Make sure the ash is completely cold. Embers can hide for days.", "Store it in a metal container with a lid, outdoors, on a non-flammable surface.", "Wear gloves, eye protection and a dust mask."],
      do: ["Garden: sprinkle a thin layer on soil that needs to be less acidic. Mix it in. Test soil pH first if you can.", "Compost: add small amounts, a handful at a time.", "Paths: use cold ash to give grip on ice.", "Cleaning: a paste of cold ash and water can scrub burnt pots and glass. Rinse well.", "Keep it dry. Rain turns it into a strong alkaline liquid."],
      warn: ["Hot ash starts fires. Never put it in a paper bag, cardboard box or the trash while warm.", "Ash is caustic. It irritates skin and eyes. Wash with plenty of water.", "Never use ash from coal, painted, treated or pressure-treated wood.", "Do not use around acid-loving plants like blueberries, or in large amounts. It can harm soil."],
      tip: ["Keep ash away from pets and children.", "Sieve out charcoal and use it in the garden as well."],
      after: ["Wash your hands and tools.", "Label the container so no one mistakes it."]
    },
    {
      id: "hs-cast-iron", icon: "flame", difficulty: "Practical", title: "Cast-iron care",
      intro: "Cast iron lasts for generations and works on any heat source. It needs simple care so it does not rust.",
      first: ["Let the pan cool before washing.", "Never put it in a dishwasher.", "Dry it right away."],
      do: ["Wash with warm water and a brush or scraper. A little mild soap is fine.", "Dry with a towel, then warm the pan on the stove or fire for a minute to drive out all moisture.", "Rub a very thin layer of cooking oil over the pan inside and out. Wipe off the excess so it does not feel sticky.", "To re-season: coat thinly with oil and bake upside down at about 450 F (230 C) for 1 hour, with a tray under it.", "Store in a dry place with a paper towel inside."],
      warn: ["The handle gets as hot as the pan. Use gloves.", "Do not soak. Rust forms fast.", "Never heat a cold pan on a very hot fire. It can crack."],
      tip: ["Cook with some fat to build the seasoning.", "Rusty pan: scrub it, dry it, and re-season."],
      after: ["Check the pan for rust after storage.", "Season it again after heavy use."]
    },
    {
      id: "hs-faraday", icon: "radio", difficulty: "Practical", title: "Faraday bag or bin: what it can and cannot do",
      intro: "A Faraday enclosure is a closed metal shell that blocks radio waves. It may protect small electronics from some surges. No one can promise it works against every threat.",
      first: ["Decide what you want to protect: a small radio, a spare phone, chargers, a spare battery.", "Make a plan that does not depend on one device.", "Never rely on it as your only backup."],
      do: ["Use a metal container with a tight lid, such as a metal bin or ammunition-style can, or a commercial shielded bag.", "Line the inside with cardboard or foam so the device does not touch the metal.", "Put the item in, close the lid, and make sure the lid touches the metal all around.", "Test with a radio: put a working radio inside and close it. If it falls silent, it is blocking signals. A phone in it should not ring when called.", "Keep it closed. Keep a list of what is inside."],
      warn: ["Do not promise yourself it works. Real-world effects of rare events are uncertain.", "Do not put batteries that are charging or hot inside.", "A leaky, loose lid does not shield."],
      tip: ["A hand-crank radio and paper maps need no shielding and always work.", "Check the container once a year."],
      after: ["Update the contents list when you add or remove items.", "Test it again if the lid is damaged."]
    },
    {
      id: "hs-grow-small", icon: "spark", difficulty: "Practical", title: "Grow food in a small space",
      intro: "A balcony, windowsill or fence can feed you fresh greens, herbs and fruit all year.",
      first: ["Pick the sunniest place you have. Most food plants need 6 to 8 hours of sun.", "Use clean food-safe pots with drainage holes.", "Use fresh potting soil, not soil from a polluted site."],
      do: ["Start with easy plants: lettuce, radishes, green onions, herbs, peas and chard.", "Use a pot of at least 5 gallons (19 L) for tomatoes and peppers.", "Dwarf fruit trees do well in a large pot of about 15 to 20 gallons (57 to 76 L). Choose a dwarf variety.", "Water when the top inch (2.5 cm) of soil is dry. Water deeply.", "Feed with compost or plant food every few weeks."],
      warn: ["Wash all produce before eating.", "Do not eat plants grown beside busy roads or where chemicals were used.", "Sprouts grown in jars can carry harmful bacteria. Rinse often. Cook sprouts for young children, older people and anyone who is pregnant or ill."],
      tip: ["Grow what you eat most.", "Save seeds from open-pollinated plants."],
      after: ["Harvest often. It makes plants produce more.", "Compost scraps and put them back in the pots."]
    },
    {
      id: "hs-root-storage", icon: "home", difficulty: "Practical", title: "Store root vegetables and make a root cellar",
      intro: "Cool, damp and dark keeps potatoes, carrots, beets and apples for months.",
      first: ["Use only firm, unbruised produce. One rotten vegetable spoils the box.", "Do not wash before storing. Brush off loose soil.", "Pick a place that stays cold but does not freeze."],
      table: { head: ["Item", "Good storage"], rows: [["Carrots, beets, parsnips", "Near freezing, humid, in sand or sawdust"], ["Potatoes", "Cool (about 40 to 45 F, 4 to 7 C), dark"], ["Onions, garlic, winter squash", "Cool, dry, airy"], ["Apples", "Cold, apart from potatoes"]] },
      do: ["Use a cool basement corner, a garage cabinet that stays above freezing, or a bin in a shaded, insulated spot.", "Pack roots in boxes between layers of damp sand, sawdust or leaves.", "Give air flow. Do not seal vegetables in plastic.", "Keep apples away from potatoes. Apples give off a gas that makes potatoes sprout.", "Check weekly and remove anything soft or moldy."],
      warn: ["Buried barrel cellars can flood or cave in. Never enter a deep pit alone or if you notice any strange air. Bad air or low oxygen can kill.", "Throw away green or sprouting potatoes. They contain a toxin.", "Do not store food where it can freeze solid."],
      tip: ["A simple cool basement does most of the job.", "Keep a thermometer in the storage area."],
      after: ["Use the softest items first.", "Clean the storage spot each year."]
    },
    {
      id: "hs-pemmican", icon: "can", difficulty: "Advanced", title: "Pemmican: dried meat and fat",
      intro: "Pemmican is a dense food of dried lean meat, rendered fat and dried berries. Done badly it spoils or makes you sick.",
      noteText: FOOD,
      first: ["Use fresh lean meat and clean fat. Wash your hands and tools.", "Dry it fully. Any moisture lets bacteria grow.", "Make a small batch first and learn the method."],
      do: ["Trim all visible fat from lean meat and slice thin. Heat the meat to 160 F (71 C) first, then dry it in a dehydrator or low oven until it snaps.", "Grind or pound the dry meat into a coarse powder.", "Render clean fat slowly and strain it. Mix about equal weight of melted fat and meat powder.", "Add dried berries if you like. Press into a pan and let set.", "Cut into pieces. Wrap tightly and store in a cool, dark, dry place."],
      warn: ["Do not promise yourself it keeps for years. Shelf life depends on how dry and clean it is and on how it is stored.", "Throw it away if it smells rancid, shows mold, or feels damp.", "Do not make it with wet meat or add moist fruit."],
      tip: ["It is dense energy, so a little goes a long way.", "Keep a small supply in your go-bag and replace it often."],
      after: ["Check it every month.", "Eat older pieces first."]
    },
    {
      id: "hs-dry-bread-mix", icon: "can", difficulty: "Practical", title: "Dry-pack baking mixes (not bread in a jar)",
      intro: "Baking bread in a jar and sealing it hot is not safe canning. Keep the dry ingredients instead and bake fresh.",
      first: ["Do not seal baked bread in jars to store it.", "Use clean, dry jars and tools.", "Label each jar with the recipe and date."],
      do: ["Mix dry ingredients for soda bread: flour, baking soda, salt and powdered milk.", "Put the mix in a clean, dry airtight jar or bag. Add a note with the wet ingredients and the baking time.", "Store in a cool, dark, dry place. Use within 6 to 12 months for best quality.", "When needed, add water or buttermilk and bake right away.", "Freeze fresh-baked bread in slices for up to 3 months if you have power."],
      warn: ["Baked bread sealed in a jar can grow dangerous bacteria, including botulism. Hot sealing does not make it safe.", "Throw out mix that smells off or has bugs or lumps."],
      tip: ["Crackers and hardtack store longer than soft bread.", "Keep a jar of baking soda for quick bread."],
      after: ["Rotate your mixes.", "Write the recipe on the jar."]
    },
    {
      id: "hs-pallet-garden", icon: "spark", difficulty: "Practical", title: "Grow food on a pallet fence",
      intro: "A pallet makes a free vertical planter for greens, herbs and strawberries along a fence.",
      first: ["Use only heat-treated pallets stamped HT.", "Do not use pallets stamped MB (treated with methyl bromide) or pallets that held chemicals.", "Wear gloves. Pallets splinter."],
      do: ["Stand a pallet upright against a fence in a sunny spot. Fix it to the fence with strong brackets.", "Staple landscape fabric on the back and bottom to hold the soil.", "Fill the slots with potting soil, tilt the pallet back, and plant shallow-rooted plants like lettuce, herbs and strawberries.", "Water slowly from the top and check often. Vertical planters dry out fast.", "Feed with compost tea or plant food."],
      warn: ["Do not grow food on a pallet if you cannot confirm the treatment.", "The planter is heavy when wet. Secure it so it cannot fall.", "Do not plant near polluted soil or roads."],
      tip: ["Grow trailing plants at the top and herbs at the bottom.", "Put the planter where you can water easily."],
      after: ["Replace soil each year.", "Harvest often."]
    },
    {
      id: "hs-water-from-air", icon: "drop", difficulty: "Practical", title: "Collect water from air: dew, fog and condensation",
      intro: "You can collect small amounts of water from dew, fog and a solar still. It is slow and gives little. Do not depend on it.",
      first: ["Count your stored water first. Store 1 gal (3.8 L) per person per day.", "Treat all collected water before you drink it.", "Do this in addition to, not instead of, safe water storage."],
      do: ["Dew: wipe a clean plastic sheet or tarp at dawn and squeeze the water into a clean container.", "Fog: hang a fine mesh or net between two poles facing the wind and let the drops run down into a bucket.", "Solar still: dig a hole, put a cup in the middle, cover the hole with clear plastic held down by stones, and put a small stone in the center so water drips into the cup.", "Collect often. In hot, humid places you may get a cup or two a day.", "Strain, filter and disinfect what you collect. See Chemical disinfection and Bleach dose."],
      warn: ["Any project that promises endless water is not true. Yields are small.", "Dew from dirty surfaces carries dirt and germs.", "Do not drink water from a still that touched chemicals or fuel."],
      tip: ["Use a dark, clean surface to warm the air near the plastic.", "Combine with rain collection."],
      after: ["Store water in clean, covered containers.", "Label treated and untreated water."]
    },
    {
      id: "hs-seawater", icon: "waves", difficulty: "Advanced", title: "Make seawater drinkable by distilling",
      intro: "Seawater cannot be drunk. It can be made safe by boiling it and collecting the steam.",
      first: ["Never drink seawater. Salt dehydrates you and can kill.", "Boil the water outdoors. Steam is hot and fuel makes carbon monoxide.", "Be patient. This makes small amounts."],
      do: ["Fill a pot about half full of seawater and set it on a stove outdoors.", "Stand a clean bowl or cup on a small stone or stand inside the pot, above the water line.", "Put the pot lid upside down on top so that the handle is lowest. Add ice or cold water on top of the lid to cool it.", "Steam turns to water on the lid and drips into the bowl. Pour the bowl into a clean container.", "Let the water cool, then drink it. The salt stays in the pot."],
      warn: ["Do not drink the brine in the pot.", "Never run a stove or fire indoors.", "Do not distil water that has fuel or chemicals in it. Some can carry over in steam.", "Hot steam burns. Use gloves."],
      tip: ["Rainwater and desalination units are better when available.", "Save fuel by using a solar still on hot, sunny days."],
      after: ["Store the water in a clean, covered container.", "Rinse the pot in fresh water to stop rust."]
    },
    {
      id: "hs-car-escape", icon: "alert", difficulty: "Critical", title: "Trapped in a car: how to get out",
      intro: "A fire, a sinking car or a crash can trap you. Learn the steps now. They take seconds.",
      first: ["Stay calm. Act at once. Call emergency services when you can (911 in the US, 112 in Portugal).", "Undo your seatbelt.", "Get everyone out through a window or door as fast as you can."],
      do: ["Keep a seatbelt cutter and a spring-loaded window breaker where you can reach them, such as on a visor strap or in the door pocket.", "Sinking car: seatbelts off, window open or broken, children out first, then you. Do this at once. Do not wait for the car to fill, and do not try to open the door against the water.", "To break a side window, strike a bottom corner with the tool. Do not strike the windshield.", "Fire: get out right away, leave belongings, and move at least 100 ft (30 m) away.", "Locked in a trunk: pull the glow-in-the-dark release handle if present, or push out the back seat, kick out the tail-light, and shout and bang."],
      warn: ["Headrest posts can sometimes break a side window, but this is not reliable. Carry a proper tool.", "A windshield is laminated and hard to break.", "Do not stay in a burning car to look for belongings."],
      tip: ["Practice finding your belt release with your eyes closed.", "Tell all passengers where the tool is."],
      after: ["Check for injuries. Call emergency services.", "Replace the tool if you used it."]
    },
    {
      id: "hs-eggshells", icon: "spark", difficulty: "Practical", title: "Eggshells in the garden",
      intro: "Crushed eggshells add calcium to the soil and compost. They do not treat water or wounds.",
      first: ["Rinse the shells and let them dry.", "Wash your hands after touching raw egg.", "Use them only in the garden."],
      do: ["Dry the shells fully. Crush them into small pieces or a powder.", "Mix into compost or into the soil around tomatoes, peppers and squash.", "Bake the shells at about 200 F (95 C) for 10 minutes for extra safety before crushing.", "Add them to the compost pile in small amounts.", "Use only on plants, not on food or water."],
      warn: ["Eggshells do not purify water. Use boiling, filters or disinfectant.", "Eggshells do not stop bleeding. Use direct pressure, packing and, if needed, a tourniquet.", "Raw shell can carry germs. Keep it away from food and pets."],
      tip: ["Keep a jar by the sink for shells.", "They break down slowly, so crush them finely."],
      after: ["Wash the jar.", "Keep adding to the compost."]
    },
    {
      id: "hs-garlic-honey", icon: "jar", difficulty: "Practical", title: "Garlic in honey or oil: the safety rules",
      intro: "Fresh garlic in a jar can grow dangerous bacteria. It is not a medicine. Know the safe way to handle it.",
      first: ["Treat it as food, not as treatment for illness.", "See a doctor if you are sick or if a fever lasts.", "Never give honey to a baby under 12 months."],
      do: ["Garlic in oil: keep it in the fridge and use it within 4 days, or freeze it.", "Garlic in honey: keep it in the fridge, use it within a short time, and discard it if it bubbles a lot, smells sour or looks cloudy and unusual.", "Use clean, dry jars and tools.", "Use it as flavor, not as a cure.", "Store honey on its own in a sealed jar at room temperature. It keeps for a very long time."],
      warn: ["Garlic in oil at room temperature can grow botulism. This can be deadly.", "Honey can carry spores that harm babies under 12 months.", "Do not rely on it for illness. Call a doctor for fever, trouble breathing or severe symptoms."],
      tip: ["Buy dried or fresh garlic and use it in cooking.", "Write the date on every jar."],
      after: ["Throw out any jar that is bulging, fizzing, or older than the safe time."]
    },
    {
      id: "hs-solar-heater", icon: "sun", difficulty: "Practical", title: "Solar air heater from bottles or cans",
      intro: "A black solar panel can warm a room a little on a sunny day. It is a small helper, not a heater.",
      first: ["Do not rely on it to keep you warm.", "Keep it away from anything that burns.", "Use it only in daylight."],
      do: ["Build a shallow frame facing the sun on a south-facing wall (north-facing in the southern hemisphere).", "Paint cans or bottles black on the outside. Keep the opening clear for air to flow.", "Cover the front with clear plastic or glass. Insulate the back.", "Let cold room air enter at the bottom and warm air leave at the top.", "Block the vents at night so you do not lose heat."],
      warn: ["Output is small. It will not heat a house.", "Do not store flammable materials against it.", "It gives no heat at night or in clouds.", "Plastic bottles weaken in sunlight. Do not put water in them."],
      tip: ["Insulate windows and use a safe one-room heating plan as your main heat.", "Place it where it gets sun all day."],
      after: ["Clean the glazing.", "Check for cracks in plastic."]
    },
    {
      id: "hs-hand-pump", icon: "drop", difficulty: "Advanced", title: "Hand pump for a well",
      intro: "A hand pump lets you get water from a well when power is out. Choose a tested pump and keep the well clean.",
      first: ["Know your well depth and type.", "Never pump from a well that may be flooded or contaminated.", "Test and treat the water."],
      do: ["For a shallow well (about 20 ft or 6 m deep or less), a suction hand pump on the pipe may work.", "For a deeper well, you need a deep-well hand pump made for that depth.", "Buy a tested pump with parts and install it according to the maker, ideally with a professional.", "Keep the cap tight and the top of the well above ground and clean.", "After use, treat the water: strain, filter, then disinfect."],
      warn: ["An improvised pump from pipe and parts is risky. It can break and can contaminate the well.", "After a flood, do not use the well until it has been tested and disinfected.", "Do not use a well near a septic system or fuel tank without testing."],
      tip: ["Ask your local water authority about testing.", "Keep spare seals and a repair kit."],
      after: ["Disinfect the well if the authority tells you to.", "Keep stored water as a backup."]
    }
  ];
  G.forEach(function (g) { g.area = "Home skills"; g.after = g.after || []; g.tip = g.tip || []; g.warn = g.warn || []; g.do = g.do || []; g.source = g.source || "https://www.ready.gov/"; });
  window.LOAD_HOME_SKILLS = G;
  if (window.LOAD_CORE) { window.LOAD_CORE.guides = window.LOAD_CORE.guides.concat(G); }
})();
