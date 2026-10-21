/* Fire, wild food, fishing and field-cooking skills for emergencies, United States and Portugal.
   Researched 24 Oct 2026 through search results only. We did not open the pages themselves, and most sources are expert and extension pages
   or well-known outdoor magazines, not official manuals. Items we could not find a source for are listed under "Not confirmed".
   Legal rules change by state, region and year. Check the current rule with the named authority before you rely on any of them. */
(function () {
  var CD = "24 Oct 2026";
  var RULES = "Rules, seasons and licences change by US state and in Portugal by region and year. Check with your state wildlife agency or, in Portugal, ICNF, DGRM, IPMA and your câmara.";
  var OWN = "Items marked 'our reasoning' or 'general guidance' are common-sense advice. They are not taken from a named source.";
  function g(o) {
    o.difficulty = o.difficulty || "Practical"; o.status = o.status || "partly"; o.checkedOn = CD;
    o.unconfirmed = (o.unconfirmed || []).concat([RULES, OWN]); o.tip = o.tip || []; o.after = o.after || []; o.warn = o.warn || [];
    o.sections = o.sections || []; o.sources = o.sources || []; o.source = (o.sources[0] && o.sources[0][1]) || "https://www.ready.gov/"; return o;
  }
  var UNSURE = "If you are not 100 percent sure, do not eat it. Water, shelter and warmth come before food. A person can live about three weeks without food.";
  var G = [
    g({
      id: "wf-fire-wet", area: "Fire", icon: "flame", title: "Make a fire in rain, wind and snow",
      intro: "Fire gives warmth, dry clothes, boiled water and cooked food. Wet weather makes it harder, not impossible. Plan, build a dry base, find dry fuel inside wood, and protect the flame.",
      first: [
        "Check the fire rules first. In Portugal fires are banned on many days. In the US burn bans are common.",
        "Light a fire only if you need it and it is safe. Never inside a tent or closed shelter.",
        "Keep water and a shovel or pot of water within reach.",
        "Get out of the wet first: pick a sheltered spot, but not under overhanging branches."
      ],
      do: [
        "Check the rules and the site. In Portugal, campfires and bonfires are banned from 1 July to 30 September, and on other days when the fire danger is very high or maximum. Check the IPMA fire danger level each day. In the US, check local and state burn bans. Choose a spot out of the wind, away from tents, dry grass and overhanging branches. Clear the ground. Keep water beside you.",
        "Build a dry base. In rain, make a slight mound instead of a pit, because pits fill with water. Use a flat rock, or a layer of dry sticks or bark, to keep the fire off wet ground. In snow, stamp down a flat area and build a platform of green logs laid in crossing layers, so the fire does not melt through. In strong wind, dig a trench about 6 to 8 inches (15 to 20 cm) deep and pile the soil on the windward side as a windbreak.",
        "Find dry fuel inside the wood. Wet outside does not mean wet inside. The inner core of a dead standing tree is often dry, even on a very wet day. Dead lower branches of evergreens make dry kindling. Split wood to reach the dry heart. Shred the inner bark, the cambium, into a fibre for tinder. Fatwood and resin burn even when slightly damp. Do not use pine bark, because it burns poorly. A chip of wood that sticks to the tongue is dry (a field test from one source).",
        "Prepare tinder and stage your fuel before you light. Make small piles in the order you will use them: fine tinder, pencil-lead thin twigs, thumb-thick sticks, then bigger wood. Keep a small teepee structure. Put the tinder bundle inside the structure and light it there. Carry a waterproof fire starter, such as cotton balls with petroleum jelly, or a fire starter cord, so you do not depend on finding dry tinder.",
        "Light, feed and protect the fire. Use a lighter, match or ferro rod. Add wood slowly. Build a small windshield of snow, rock or logs with a gap, so the fire still gets air. Dry wet wood near the flames before it goes on. Never leave a fire alone. When you leave, drown it, stir the ashes, and repeat until it is cold to the touch."
      ],
      table: { head: ["Problem", "What to do"], rows: [
        ["Rain", "Mound, not pit. Dry base of rock, sticks or bark. Tinder from inside dead wood. Small fire."],
        ["Wet ground", "Platform of dry sticks or bark, or a flat rock."],
        ["Snow", "Stamp the snow flat. Platform of green logs in crossing layers."],
        ["Strong wind", "Trench fire with a windbreak. Keep the tinder shielded."],
        ["No dry tinder", "Shave inner bark. Use fatwood or resin. Use petroleum-jelly cotton balls you carried."],
        ["Fire danger very high or maximum (Portugal)", "No campfire. Follow the ban."]
      ] },
      sections: [
        { h: "Fire safety rules for the US and Portugal", items: [
          "Portugal: campfires and bonfires are banned from 1 July to 30 September, and outside those dates whenever the danger is very high or maximum. Burning piles and burning an area need prior authorisation, which you request through the ICNF app. Fines can be large. These rules come from civil-protection posters and news and law-firm pages. Check the official pages.",
          "Portugal: IPMA gives a daily fire danger level, from reduced to maximum, from temperature, humidity, wind and the last 24 hours of rain.",
          "US: rules vary by state, county and land manager. Look for posted restrictions and ask the local fire authority."
        ] }
      ],
      warn: [
        "Never light a fire, stove or charcoal inside a tent, hut or closed shelter. Carbon monoxide can kill.",
        "Do not use gasoline or other fuel to start a fire.",
        "Do not build a fire under overhanging branches or on dry grass. Do not light a fire when the danger is high. Wildfires kill.",
        "Do not leave a fire. Put it out completely.",
        "Staying dry and warm is a matter of life. Change out of wet clothes. See the hypothermia guide."
      ],
      tip: [
        "Carry two ways to make a flame and a waterproof tinder in a sealed container.",
        "Practise in rain once, with a safe fire and water beside you."
      ],
      after: ["Put the fire out and check the ashes are cold.", "Dry your clothes and gear.", "Replace what you used from your kit."],
      sources: [
        ["Field & Stream: how to start a survival fire in the rain", "https://www.fieldandstream.com/story/survival/how-to-start-a-survival-fire-in-the-rain/?amp"],
        ["Backpacker: how to make a fire in the rain", "https://www.backpacker.com/skills/how-to-make-a-fire-in-the-rain/?scope=anon"],
        ["Off Grid Web: fire-starting tips for wet weather", "https://www.offgridweb.com/survival/no-rain-delay-fire-starting-tips-for-wet-weather"],
        ["Backpacker: build a fire on snow", "https://www.backpacker.com/survival/build-a-fire-on-snow/?scope=anon"],
        ["Beyond Clothing: building a platform fire in the snow", "https://beyondclothing.com/blogs/news/winter-fire-skills-part-2-building-a-platform-fire-in-the-snow"],
        ["RFM: Portugal fire risk and what you cannot do", "https://rfm.pt/atualidade/amp/23368/risco-de-incendio-sobe-em-portugal-ve-o-que-nao-se-pode-fazer-nos-dias-de-maior-perigo"],
        ["Santander: queimas and queimadas rules", "https://www.santander.pt/salto/queimas-queimadas-regras-autorizacao-portugal"]
      ],
      unconfirmed: [
        "The wet-weather methods (mound, dry base, inner dead wood, tongue test, fatwood, teepee, petroleum-jelly cotton) come from outdoor magazines and bushcraft sites seen in search results. They are common teaching, but not an official manual. We did not read the US Army manual's fire chapter.",
        "The snow platform of green logs and the 6 to 8 inch trench with a windbreak come from several bushcraft and survival pages. Sources differ on details.",
        "Portugal's 1 July to 30 September ban and the daily IPMA levels come from a civil-protection poster and news pages. The dates can change each year. The ICNF and IPMA pages were not opened.",
        "We found nothing official on fires in snow."
      ]
    }),
    g({
      id: "wf-fire-nomatches", area: "Fire", icon: "spark", title: "Make a fire without matches: ferro rod, flint and steel",
      intro: "A lighter or waterproof matches is best. If you have none, a ferro rod or flint and steel make sparks. Get your tinder and fuel ready first. The spark is the last step.",
      first: [
        "Have your tinder bundle and fuel ready before you make a spark.",
        "Keep your spark tool and tinder dry.",
        "Check fire rules and the weather. Never light a fire in a closed shelter.",
        "Practise at home. Do not learn it in an emergency."
      ],
      do: [
        "Make a safe place and get the fuel ready. Clear the ground, put down a dry base, and make a small pile of fine tinder, thin twigs and thicker sticks. A fire needs three things: heat, fuel and air. The tinder must be ready before the spark. See the fire in rain, wind and snow guide.",
        "Ferro rod. A ferro rod gives hotter sparks than flint and steel. Hold the rod close to the tinder. Press the striker edge against the rod and rake it down in one firm stroke, so the sparks fall into the tinder. Blow gently on any glow and feed it small, dry tinder.",
        "Flint and steel with char cloth. Strike the steel against a sharp edge of hard stone, such as flint, so it shears off hot specks of metal. Let the sparks land on char cloth. When the char cloth glows, put it into the tinder bundle, fold it in, and blow gently until it flames.",
        "Make char cloth. Cut small strips of 100 percent cotton cloth. Fold them tightly in a small metal tin and put it in a fire. The cloth chars and smoulders, but does not burn. Let it cool before you open the tin. Keep char cloth in a waterproof container, because it takes up moisture.",
        "Keep a backup and take care. Carry more than one way: a lighter, waterproof matches, a ferro rod. A bow drill is an advanced method. It is hard in humid air and needs a lot of practice. Do not rely on it in an emergency."
      ],
      table: { head: ["Method", "Good", "Limits"], rows: [
        ["Lighter or waterproof matches", "Easiest and quickest", "Can run out or fail when wet. Carry two."],
        ["Ferro rod and striker", "Hot sparks. Works when wet.", "Needs ready tinder and practice."],
        ["Flint, steel and char cloth", "Traditional. Cheap.", "Cooler sparks. Needs char cloth and a sharp-edged stone."],
        ["Bow drill", "No kit needed", "Hard. Fails in humid air. Not for emergencies unless you have practised."]
      ] },
      warn: [
        "Never use fuel or gasoline on a fire.",
        "Keep sparks away from dry grass, tents and clothing.",
        "Do not light a fire when the fire danger is high or banned (Portugal: very high or maximum, and 1 July to 30 September).",
        "Put the fire out completely."
      ],
      tip: ["Keep the ferro rod and a striker on a cord with your keys or pack.", "Make a few char cloth strips ahead of time."],
      after: ["Dry and store your tools.", "Replace the char cloth and tinder."],
      sources: [
        ["Field & Stream: start a fire without a lighter (survival instructor)", "https://www.fieldandstream.com/stories/survival/wilderness-survival/how-to-start-fire-without-lighter"],
        ["Ferro rod versus flint: which fire starter is right for you", "https://subdeb12-rm0001.quickbox.io/?p=12756"],
        ["Fire starting tutorial", "https://rethinkrural.raydientrural.com/blog/fire-starting-tutorial"]
      ],
      unconfirmed: [
        "The ferro rod and flint-and-steel steps, the char cloth recipe (100 percent cotton in a small metal tin heated in a fire) and keeping it dry come from outdoor and rural-skills pages seen in search results.",
        "We found little step-by-step detail on the bow drill. We only say it is advanced and hard in humid air. Learn it from a qualified instructor.",
        "Letting the tin cool before opening it, and the one-stroke striking method, are common practice and our reasoning."
      ]
    }),
    g({
      id: "wf-find-plants", area: "Food", icon: "leaf", difficulty: "Critical", title: "Find food from the land: wild plants, safely",
      intro: UNSURE + " Wild plants can kill. This guide is about the rules that keep you alive. Learn plants from a local expert before an emergency.",
      first: [
        UNSURE,
        "Eat a plant only if you can identify it with 100 percent certainty. Use at least three trusted guides.",
        "Never eat wild mushrooms. See the mushroom and fish guide.",
        "Get water, warmth and shelter first."
      ],
      do: [
        "Put water, shelter and warmth first. A person can go about three weeks without food but only days without water. Food from the land is the last priority in most emergencies. Eat your stored food first.",
        "Identify with certainty, or do not eat. Use at least three different guides, ideally with a local expert, and compare leaves, stems, flowers, fruit and smell. Many safe plants have deadly look-alikes. There is no simple rule or test that tells edible from poisonous. If you are not sure, leave it.",
        "Learn the deadly look-alikes. Poison hemlock and water hemlock look like carrot, parsley or Queen Anne's lace. Poison hemlock has a smooth stem with purple blotches and no carrot smell. Wild carrot has a hairy stem and smells of carrot when crushed. Water hemlock root forms clusters and its poison can pass through skin, so wear gloves. In Portugal, berries of belladonna, bryony, holly and privet are among those that are dangerous.",
        "Pick safe places and prepare food well. Avoid roadsides, farm edges and industrial land, because of chemicals and dirt. Do not strip a plant. Take only a little. Wash what you pick and cook it. Some foods are unsafe raw. Acorns are bitter from tannins and need leaching: soak or boil the meal and change the water until it stays clear.",
        "Start small and know the limits. Beginner guides suggest a few easy plants, such as blackberries, dandelion, nettles (cook them) and elderflowers. Eat a small amount first and wait. Stop if you feel unwell. Use the guide for your own region. In Portugal, local guides exist, including a University of the Algarve book on 70 traditionally eaten wild plants of the Algarve."
      ],
      table: { head: ["Rule", "Why"], rows: [
        ["100 percent sure, or do not eat", "Many safe plants look like deadly ones"],
        ["Use three guides and a local expert", "One guide can be wrong"],
        ["Avoid roads, farms and industry", "Chemicals and dirt"],
        ["Cook it", "Some foods are unsafe or bitter raw"],
        ["Take a little", "Protects the plant and your stomach"]
      ] },
      sections: [
        { h: "The edibility test: why we do not teach it", items: [
          "Some manuals describe a long test of touching, tasting and waiting about 24 hours for each plant part.",
          "Even a tiny bite of a toxic plant can cause severe stomach illness or death. The same plant can affect people differently. Experts call it a last resort, and say the only certain way to avoid poisoning is to eat only what you can positively identify."
        ] },
        { h: "United States", items: [
          "Cooperative extension offices run foraging courses and give plant guides. Mississippi State and Illinois extension have pages and courses.",
          "State parks and wildlife refuges often ban picking plants without a permit. Ask first."
        ] },
        { h: "Portugal", items: [
          "A Portuguese study found 93 serious mushroom poisonings between 1990 and 2008. About 11.8 percent of the liver cases died.",
          "Quercus (a Portuguese nature group) and the University of the Algarve have published guides to edible and poisonous wild plants.",
          "Protected areas and private land may have rules. Ask the câmara or ICNF."
        ] }
      ],
      warn: [
        "Do not eat any plant you cannot identify with certainty.",
        "Do not rely on a phone app or one picture.",
        "Do not touch water hemlock without gloves.",
        "Poison centre: US 1-800-222-1222. Portugal, CIAV, 800 250 250. Call 112 or 911 if someone is sick."
      ],
      tip: ["Take a local plant course before an emergency.", "Photograph the plant, leaf and stem before you eat, so doctors can identify it."],
      after: ["If someone feels unwell, call the poison centre or emergency services. Keep a photo and a sample.", "Write down what you picked and where."],
      sources: [
        ["Mississippi State Extension: forgotten foods, wild edible plants", "https://extension.msstate.edu/publications/forgotten-foods-introduction-wild-edible-plants"],
        ["Farmers' Almanac: Queen Anne's lace and its toxic look-alikes", "https://farmersalmanac.com/what-queen-annes-lace"],
        ["Off Grid Web: the universal edibility test", "https://www.offgridweb.com/survival/the-universal-edibility-test"],
        ["Postal.pt: wild fruits, dangers and pleasures (Portugal)", "https://postal.pt/nacional/os-frutos-silvestres-perigos-e-prazeres/"],
        ["WebMD: are acorns safe to eat (leaching)", "https://www.webmd.com/diet/are-acorns-safe-to-eat"]
      ],
      unconfirmed: [
        "The hemlock versus wild carrot differences come from gardening and homestead pages, not a botany reference. Check a proper flora.",
        "The list of beginner plants comes from a commercial beginner's guide, not an extension service. Check each one in a local guide.",
        "The acorn leaching steps come from several secondary sites and differ on timing.",
        "We found no official Portuguese guidance on safe wild-plant picking. The Portugal plant list (belladonna, bryony, holly, privet) comes from a science-centre article seen in a news summary. The Quercus and University of the Algarve guides were not opened.",
        "The 'three weeks without food' figure is the app's rule of three. We did not find a named source for it in this research.",
        "We did not verify cattail, wild garlic or other plants as beginner foods."
      ]
    }),
    g({
      id: "wf-shore-shellfish", area: "Food", icon: "waves", difficulty: "Critical", title: "Shore food and shellfish: check closures first",
      intro: "Shellfish can carry toxins that cooking does not destroy. Closures change often. Never take shellfish from a closed area. Fish from the same water is often safer.",
      first: [
        "Check the official shellfish closure list for the exact area first.",
        "Never take shellfish from a closed area.",
        "Cooking or freezing does not destroy red tide or similar toxins.",
        "If your mouth, face or limbs tingle after eating shellfish, call 112 or 911."
      ],
      do: [
        "Check the official closure notice. In Portugal, IPMA publishes bulletins by production zone that list which bivalves are open or banned for biotoxins. Zones change often. In the US, check your state health or fisheries agency for shellfish closures. Do this on the day.",
        "Do not harvest from closed areas, at all. A bloom can be present in clear water. Many blooms are colourless. Cooking and freezing do not destroy the toxin. Some shellfish, such as butter clams and blue mussels, can keep toxin for months.",
        "Know which foods are lower risk. Lobster meat and most finfish do not normally build up the toxin and are generally safe from affected waters. Lobster tomalley, the liver, is an exception. Do not eat the guts of fish or shellfish.",
        "Handle shellfish with care. Keep them cold and alive until you cook them. Throw away any that are dead or have broken shells. Cook thoroughly. Wash your hands. These handling steps are general advice.",
        "Know the signs and act. Numb or tingling lips, face, arms or legs are early signs of paralytic shellfish poisoning. Severe cases can stop breathing. There is no antidote. Call 112 or 911 at once and say what was eaten."
      ],
      warn: [
        "Never rely on clear water, colour or smell. Do not rely on cooking.",
        "Do not harvest in a closed area, even if it looks fine.",
        "Do not eat shellfish if you cannot check the closure list."
      ],
      tip: ["Look for a fish instead when shellfish status is unknown.", "Save the IPMA page or your state agency page before you go."],
      after: ["If anyone feels unwell, get emergency help. Keep a sample.", "Report symptoms to the health authority."],
      sources: [
        ["Maine CDC: paralytic shellfish poisoning fact sheet", "https://www.maine.gov/dhhs/mecdc/infectious-disease/epi/shm/PSP_FS_2016.pdf"],
        ["Massachusetts: information about red tide", "https://www.mass.gov/doc/information-about-red-tide/download"],
        ["IPMA: bivalve biotoxin bulletin", "https://www.ipma.pt/resources.www/transf/biotoxinas/rb_bivalves_100516.pdf"],
        ["Postal.pt: IPMA keeps ban on clams and mussels in part of the Ria Formosa", "https://postal.pt/nacional/ipma-mantem-proibicao-de-apanha-e-comercializacao-de-ameijoa-boa-berbigao-lingueirao-e-mexilhao-em-parte-da-ria-formosa/"]
      ],
      unconfirmed: [
        "The statements that cooking and freezing do not destroy the toxin, that clear water is not safe, and that finfish are generally safe come from US state health fact sheets seen in search results. We did not find FDA or CDC pages.",
        "One Massachusetts sheet says shellfish are safe during blooms because of monitoring. That conflicts with the closure guidance. Follow the official closures.",
        "The IPMA bulletin status in our results is dated July to August 2026 and changes often. The link above is an older bulletin. Use the current IPMA list.",
        "Handling tips (keep alive, cold, throw away dead) are general guidance. We did not find a named source. Rules for gathering shellfish by hand in Portugal were not confirmed."
      ]
    }),
    g({
      id: "wf-clean-fish", area: "Food", icon: "can", title: "Clean and cook a fish safely",
      intro: "Keep the fish cold, gut it soon, cook it fully, and wash your hands. These steps cut the risk of illness and make the meat last longer.",
      first: [
        "Keep the catch cold and out of the sun.",
        "Wash your hands with soap and safe water before and after.",
        "Cook fish to 145 F (63 C). Do not eat freshwater fish raw.",
        "Check the size and bag limits before you keep a fish."
      ],
      do: [
        "Keep it cold. Put the fish in a cooler with ice as soon as you can. If you wade, keep a stringer in the water. Bleeding the fish by cutting the gills while it is fresh is optional.",
        "Scale it. Hold the fish by the tail and scrape from tail to head with a scaler or the back of a knife, on both sides, until the skin is smooth. Skip this if you will not eat the skin.",
        "Gut it. Put the knife tip in the vent next to the tail and cut forward toward the head. Pull out the organs with your hand or a spoon. Take care not to burst the gall bladder, which makes the meat bitter. Rinse the inside in cold, safe water.",
        "Fillet or cook whole. For a whole fish, cut along the backbone and lift off each fillet. Check for small bones, such as in trout. You can also cook the fish whole on a grate, on a stick or in a pan.",
        "Cook fully and clean up. Cook until the inside reaches 145 F (63 C) and the flesh flakes. This kills parasites and bacteria. Wash knife, board and hands with soap and safe water. Bury or bin the waste away from your camp and your water, so it does not draw animals."
      ],
      warn: [
        "Do not eat raw or undercooked freshwater fish. Parasites can live in it.",
        "Do not eat fish that smells bad or has been warm for hours.",
        "Check local advisories for fish from polluted water or with high toxin levels.",
        "Wash your hands after handling raw fish."
      ],
      tip: ["Eat fish the same day when you can.", "Dry, smoke or salt extra fish. See the smoke, dry and salt guide."],
      after: ["Clean the board and knife with soap and safe water.", "Store leftover cooked fish cold and eat within a day or two (general guidance)."],
      sources: [
        ["CDC: preventing parasites from freshwater fish (clonorchis)", "https://www.cdc.gov/parasites/clonorchis/prevent.html"],
        ["How to clean a fish: step guide (public lands)", "https://www.publiclands.com/blog/a/how-to-clean-a-fish"],
        ["Take Me Fishing: how to fillet a fish", "https://www.takemefishing.org/how-to-fish/how-to-catch-fish/how-to-fillet-a-fish/"]
      ],
      unconfirmed: [
        "The 145 F (63 C) cooking temperature for parasites is from the CDC page seen in search results, which says the FDA recommends it.",
        "The scale, gut and fillet steps come from fishing and outdoor-guide pages, not an official source.",
        "We did not find a named source for icing fish at 40 F, for scombroid (histamine) poisoning, or for how long cooked fish keeps. Those are general guidance."
      ]
    }),
    g({
      id: "wf-fishing-gear", area: "Food", icon: "tent", title: "Make simple fishing gear: line, hook, hand line",
      intro: "Fishing is safer and more reliable than trapping. If you have no gear, you can make a line and a hook from natural materials. Check the fishing rules first, because a licence is usually needed.",
      first: [
        "Check the fishing rules and whether you need a licence.",
        "Use your own kit if you have one. Making gear is a backup.",
        "Fish near cover: logs, rocks and shade.",
        "Clean and cook the fish fully."
      ],
      do: [
        "Check the rules. Most places need a fishing licence. In Portugal, fishing in inland waters needs an annual recreational licence, which you can buy from 1 January at Multibanco machines. In the US, most states want a licence from about age 16, and the age differs by state. Use the guide on wild food rules.",
        "Make a line. Twist plant fibre into cordage. Flexible vine runners, long rubbery roots and strips of inner bark can be used. Inner bark fibre from some trees can be twisted into a two-ply cord. A line must be long and strong enough for the fish you expect. Test it before you use it.",
        "Make a hook. A gorge hook is a thin, hard sliver of bone, hard wood or cactus spine, about an inch (2.5 cm) long, pointed at both ends. Tie the line to its middle. Hide it in bait. When the fish swallows it and you pull, it turns and lodges in the gullet. It is for fish you plan to keep, not to release. A thorn from a bush bound with cordage and resin also works as a hook.",
        "Rig and bait a hand line. Tie the line to a green stick or a firm sapling, or hold it by hand. Bait with worms, insects or small pieces of food. Drop it near logs, rocks or shade, where fish hide. Watch the line. Pull gently when you feel a bite.",
        "Land and handle the fish. Pull it in smoothly. Kill it quickly. Keep it cold and gut it soon. See the clean and cook a fish guide. Nets, weirs and fish traps are often illegal and are not covered here."
      ],
      warn: [
        "A gorge hook can be dangerous to the fish and to you. Handle with care.",
        "Do not use a cut or damaged line for large fish.",
        "Do not use illegal gear, such as nets or traps, without checking the law."
      ],
      tip: ["Keep a small fishing kit in your bag: line, hooks, weights.", "Fish at dawn and dusk when fish feed (general guidance)."],
      after: ["Clean the fish and your hands.", "Dry and store your line."],
      sources: [
        ["Field & Stream: survival fishing, how to make a gorge hook", "https://www.fieldandstream.com/stories/survival/wilderness-survival/survival-fishing-how-to-make-a-gorge-hook"],
        ["Off Grid Web: fishing line and hooks from agave", "https://www.offgridweb.com/survival/video-making-fishing-line-hooks-from-agave-plants"],
        ["Outdoor Life: primitive survival skills that will keep you alive", "https://www.outdoorlife.com/story/survival/primitive-survival-skills-that-will-keep-you-alive.md"],
        ["Portugal government: obtain a sport fishing licence in inland waters", "https://www.gov.pt/servicos/obter-licenca-de-pesca-desportiva-em-aguas-interiores"]
      ],
      unconfirmed: [
        "The gorge hook, thorn hook, agave and plant cordage methods come from outdoor and survival pages seen in search results. We did not find nets, weirs or traps in an official source.",
        "The Portugal licence facts come from the government and a regional (CCDR) page seen in search results. Sizes, seasons and sea fishing rules were not covered.",
        "Using a green stick as a rod, baits and dawn-and-dusk feeding are general guidance."
      ]
    }),
    g({
      id: "wf-trapping", area: "Food", icon: "alert", difficulty: "Critical", title: "Trapping and snaring: what to know first",
      intro: "Traps and snares are an emergency tool. They are illegal or restricted in most places. Fishing is safer. If you are in a real survival situation, know the law, and take care.",
      first: [
        "Trapping and snaring are restricted or illegal in most places. Check first.",
        "Use fishing, stored food and safe plants before traps.",
        "In Portugal, snares are non-selective traps, which are prohibited.",
        "Handle wild animals with gloves."
      ],
      do: [
        "Check the law. Snares and many traps are illegal in most US states and in Portugal, except under licence. Even practising may break the law. Some sources say authorities accept food gathering in a real survival emergency. We could not confirm that, so do not count on it.",
        "Try safer food first. Use stored food, fishing and safe plants. Trapping uses energy and often fails. It should be a last resort.",
        "Look for signs. In a real survival situation, look for tracks, droppings, runs and burrows near water and cover. Set traps where animals pass, and in several places. This is general guidance and was not checked against a named source.",
        "Check traps often. Check at dawn and dusk. Do not leave an animal to suffer. Kill any animal quickly and humanely. Remove traps when you leave.",
        "Handle the catch safely. Wear gloves. See the game handling guide for cleaning, cooling and cooking. Do not eat animals that look sick."
      ],
      warn: [
        "Snares can catch pets, protected animals and people. Do not set them near paths people use.",
        "Do not use poison. Poison is illegal in Portugal and dangerous to all animals.",
        "Do not trap protected species."
      ],
      tip: ["A well-set fishing line gives more food for less risk.", "Learn the rules before an emergency."],
      after: ["Remove all traps and wire.", "Report any pet or protected animal you catch to the authorities."],
      sources: [
        ["Bass Pro: simple snares for survival", "https://1source.basspro.com/news-tips/hunting-information/5237/simple-snares-survival"],
        ["Notícias ao Minuto: wardens and GNR seize hunting traps across Portugal", "https://www.noticiasaominuto.com/pais/801933/vigilantes-e-gnr-apreendem-armadilhas-de-caca-em-acoes-por-todo-o-pais"],
        ["Hunter exam manual (ICNF, Portugal)", "https://www.cinergetica.pt/en/icnf/carta-de-cacador/manual"]
      ],
      unconfirmed: [
        "That snares are illegal in most places comes from a retail and a blog source. They also say law enforcement accepts survival food gathering. We could not confirm that.",
        "In Portugal, a news report says non-selective traps such as snares and birdlime are prohibited. We did not read the hunting law (Decreto-Lei 202/2004) or the ICNF rules.",
        "How to place traps and where to look for signs is general guidance. We did not find a named step-by-step source, so we give no build instructions."
      ],
      status: "general"
    }),
    g({
      id: "wf-game-handling", area: "Food", icon: "shield", difficulty: "Critical", title: "Handle wild game safely: cool it, clean it, cook it",
      intro: "Wild meat can carry bacteria and disease. Cool it fast, keep it clean, wear gloves, and cook it fully. Do not eat any animal that looks sick.",
      first: [
        "Do not handle or eat an animal that looks sick or acts strangely.",
        "Wear gloves and eye protection.",
        "Cool the meat as fast as you can.",
        "Cook wild meat fully."
      ],
      do: [
        "Check the animal and protect yourself. Do not take an animal that looks sick. Wear rubber gloves and eye protection. Even a small cut or hangnail can let infection in. Use a tarp or cloth under the carcass, to keep dirt away.",
        "Field dress it quickly. Remove the organs as soon as you can, so the body loses heat and bacteria cannot spread. Keep the meat clean. Do not touch your face. Do not cut into the gut or bladder.",
        "Cool and keep it clean. Cool the meat quickly and keep it as cold as you can. Keep it out of the sun and away from flies. Wash with clean water. A common target is 40 F (4 C) or below.",
        "Mind the diseases. Deer, elk and moose may carry chronic wasting disease. No evidence links it to human illness, but the CDC advises caution. Rabbits and hares can carry tularemia, so wear gloves and cook well.",
        "Cook fully and clean up. Cook wild game thoroughly. Use 165 F (74 C) as a safe target. Wash hands, knives and boards with soap and safe water. Do not put cooked food on a surface that held raw meat."
      ],
      warn: [
        "Do not eat raw or undercooked wild meat.",
        "Do not eat the brain or spinal cord of deer, elk or moose.",
        "Do not eat any animal found dead or sick.",
        "Hunting needs a licence and follows season and species rules, in the US and in Portugal."
      ],
      tip: ["Have a friend help. Two people clean faster.", "Take photos if you need to report a sick animal."],
      after: ["Wash everything, including your clothes.", "Tell the wildlife agency about a sick animal."],
      sources: [
        ["Penn State Extension: proper field dressing and handling of wild game and fish", "https://extension.psu.edu/proper-field-dressing-and-handling-of-wild-game-and-fish"],
        ["Food Safety News: game food safety tips for hunters", "https://www.foodsafetynews.com/2021/10/game-food-safety-tips-for-hunters/"],
        ["ICNF hunter exam manual (Portugal)", "https://www.cinergetica.pt/en/icnf/carta-de-cacador/manual"]
      ],
      unconfirmed: [
        "Gloves, eye protection, quick field dressing, a tarp, chronic wasting disease caution and cross-contamination come from Penn State and food-safety news pages seen in search results.",
        "We did not confirm the 40 F cooling target, the 165 F cooking temperature for wild game, brain and spinal cord handling, or tularemia in rabbits in a named source. They are common food-safety advice.",
        "USDA's hotline advice is 160 F for meat and 165 F for poultry in jerky. Wild game at 165 F is a cautious choice from non-USDA pages.",
        "We found no Portugal-specific game handling guidance."
      ]
    }),
    g({
      id: "wf-smoke-dry-salt", area: "Food", icon: "steam", title: "Smoke, dry and salt meat and fish",
      intro: "Drying and smoking help meat and fish last, but they can go wrong. Heat meat first, dry it hot enough, and be careful with smoked fish.",
      first: [
        "Heat meat to a safe temperature before you dry it.",
        "Dry at a steady 130 to 140 F (54 to 60 C).",
        "Treat smoked fish with care. Pregnant people, older adults and the ill should avoid cold-smoked fish.",
        "Keep dried food dry and cool."
      ],
      do: [
        "Cut and prepare. Use fresh, cold, clean meat or fish cut in thin strips, with fat trimmed. Wash hands and tools. Keep raw and cooked food apart.",
        "Heat first for jerky. USDA advises heating meat to 160 F (71 C), and poultry to 165 F (74 C), before drying. Many sources use 165 F for wild game. This kills bacteria before a low drying heat, which does not.",
        "Dry at a steady heat. After heating, dry at 130 to 140 F (54 to 60 C) in a dehydrator or oven with the door open a crack, until the meat is dry and bends without snapping. Cool it, then store it in a clean, dry, sealed container.",
        "Smoke fish with care. Hot smoking cooks the fish. Cold smoking, below about 80 to 90 F (27 to 32 C), leaves it uncooked and carries more Listeria risk. Neither is risk-free, because bacteria can get on the fish after smoking from dirty equipment. Keep equipment clean. Keep smoked fish cold.",
        "Salt and store. Salting and sun-drying are traditional ways to keep fish and meat. We did not find a checked recipe here. Use a tested recipe from a food-safety source and keep dried food cool and dry. Check it often for mould or smell. If in doubt, throw it out."
      ],
      table: { head: ["Method", "Safe target", "Watch for"], rows: [
        ["Jerky: heat before drying", "Meat 160 F (71 C), poultry 165 F (74 C)", "A dehydrator alone may not reach this."],
        ["Jerky: drying", "130 to 140 F (54 to 60 C)", "Under about 145 F, meat can look done but not be safe."],
        ["Hot-smoked fish", "Fish cooked through", "Dirty equipment can add Listeria afterward."],
        ["Cold-smoked fish", "Not cooked", "Higher Listeria risk. Avoid in pregnancy, old age and illness."],
        ["Salted or sun-dried", "Tested recipe needed", "Mould, smell, damp."]
      ] },
      warn: [
        "Do not dry or smoke meat that has been warm for hours.",
        "Do not give cold-smoked fish to pregnant people, older adults or people with weak immunity.",
        "Throw out anything that smells bad or has mould.",
        "Do not eat wild game raw."
      ],
      tip: ["Dry small batches.", "Use the preserving guide for canning and fermenting."],
      after: ["Label and date what you store.", "Check stored food each week."],
      sources: [
        ["USDA FSIS: jerky and food safety", "https://www.fsis.usda.gov/es/node/3309"],
        ["UC Cooperative Extension: jerky and drying", "https://ucanr.edu/sites/NSJMFP/files/386887.pdf"],
        ["USDA National Agricultural Library: Listeria in ready-to-eat smoked fish", "https://nal.usda.gov/research-tools/food-safety-research-projects/risk-listeria-monocytogenes-ready-eat-smoked-fish-executive-summary"],
        ["USDA ARS: keeping smoked salmon safe", "https://agresearchmag.ars.usda.gov/2010/oct/safe"]
      ],
      unconfirmed: [
        "The USDA jerky advice (160 F for meat, 165 F for poultry before drying, then 130 to 140 F) is from the USDA hotline as quoted in search results. A Wisconsin extension method differs. The FSIS page was not opened.",
        "Cold smoking below about 80 to 90 F and the Listeria warnings come from USDA research and UK Food Standards Agency pages seen in search results.",
        "We found no checked recipe for salting or sun-drying fish. This guide does not give one.",
        "The 'door open a crack' oven tip is common practice and our reasoning."
      ]
    }),
    g({
      id: "wf-wild-food-rules", area: "Food", icon: "book", difficulty: "Essential", title: "Wild food rules: fishing, hunting, plants and fire in the US and Portugal",
      intro: "Rules decide what you can catch, pick and burn. They change by state, region and year. Check the current rule before you act. In a real emergency, call for help first.",
      first: [
        "Check the rule with the authority named below.",
        "Get a licence before you fish or hunt.",
        "Check shellfish closures and fire danger on the day.",
        "Do not use snares, nets, poison or traps without a licence."
      ],
      do: [
        "Fishing licences. US: most states require a licence from about age 16. It differs: some start at age 10 or 12, and some free fishing days waive the licence. Check your state wildlife agency. Portugal: fishing for leisure in inland waters needs an annual licence, valid for the calendar year. It can be bought from 1 January at Multibanco machines. Licences are recorded digitally. Exceptions include hand gathering without tools, children under 16 with a licence holder, and registered foreign competitors.",
        "Hunting. US: licence, season and species rules are set by each state. Portugal: ICNF issues hunting licences. Non-selective traps, such as snares and birdlime, are prohibited. Poison is illegal. Protected animals must not be touched.",
        "Wild plants and mushrooms. US: parks and refuges often ban picking without a permit. Ask. Portugal: ask the câmara and ICNF, especially in protected areas. Never eat wild mushrooms without expert identification.",
        "Shellfish and the shore. Portugal: IPMA publishes bivalve biotoxin bulletins. US: state agencies publish closures. Do not harvest closed areas.",
        "Fire. Portugal: campfires and bonfires are banned from 1 July to 30 September, and on other days when the danger is very high or maximum. Burning needs authorisation through the ICNF app. Reported fines for burning on very high or maximum days are 2,500 to 25,000 euros for individuals. US: follow state and local burn bans."
      ],
      table: { head: ["Activity", "United States", "Portugal"], rows: [
        ["Fishing", "Licence from about 16, varies. State agency.", "Annual licence for inland leisure fishing. DGRM or ICNF."],
        ["Hunting", "State licence, season, species.", "ICNF licence. Snares and poison prohibited."],
        ["Wild plants", "Park and refuge permits often needed.", "Ask câmara and ICNF."],
        ["Shellfish", "State closure notices.", "IPMA biotoxin bulletins."],
        ["Fire", "State and local burn bans.", "No campfires 1 Jul to 30 Sep, or at very high or maximum danger."]
      ] },
      sections: [{ h: "Who to ask", items: [
        "US: your state fish and wildlife agency, state health department and local fire authority.",
        "Portugal: ICNF (fishing in inland waters, hunting, protected areas), DGRM (sea fishing licences), IPMA (fire danger, bivalve biotoxins), your câmara municipal.",
        "Emergency: 112 in Portugal, 911 in the US."
      ] }],
      warn: [
        "Do not assume you may take food from the land because you are in an emergency. We could not confirm any emergency exception.",
        "A fine or a crime may apply. Fire rules are strict in Portugal.",
        "Rules in this guide may be out of date."
      ],
      tip: ["Save the agency page before you go.", "Keep a copy of your licence on your phone and on paper."],
      after: ["Keep your licence and records.", "Report problems to the authority."],
      sources: [
        ["Portugal: obtain a sport fishing licence in inland waters", "https://www.gov.pt/servicos/obter-licenca-de-pesca-desportiva-em-aguas-interiores"],
        ["CCDR Centro: recreational fishing (pesca lúdica)", "https://www.ccdrc.pt/en/pesca-ludica"],
        ["DGRM: licensing for recreational fishing", "https://dgrm.pt/en/pesca-pp-licenciamento"],
        ["ICNF hunter exam manual", "https://www.cinergetica.pt/en/icnf/carta-de-cacador/manual"],
        ["Santander: queimas and queimadas rules", "https://www.santander.pt/salto/queimas-queimadas-regras-autorizacao-portugal"],
        ["US fishing licence ages and free fishing days (summary)", "https://tacklevillage.com/how-old-do-you-have-to-be-to-get-a-fishing-license/"]
      ],
      unconfirmed: [
        "US licence ages come from a tackle shop's summary and state examples (Utah, Ohio, New York, Virginia). Check your own state.",
        "The Portugal licence facts come from the government and CCDR pages seen in search results. We did not find size limits, bag limits, closed seasons or sea and shellfish rules.",
        "We found nothing on emergency or survival exceptions for fishing, hunting or plants.",
        "Portugal's hunting law (Decreto-Lei 202/2004) and the current text of the fire rules were not read. Fire dates and fines come from civil-protection, law-firm and news pages."
      ]
    })
  ];
  window.LOAD_WILDFOOD = G;
  if (window.LOAD_CORE) { window.LOAD_CORE.guides = window.LOAD_CORE.guides.concat(G); }
})();
