/* Fishing from start to meal, written step by step for a beginner, plus one fire-for-cooking guide. 14 guides. Added 4 Nov 2026 at the owner request.
   Written from search results only. We could NOT open any source page (the build machine blocks them). Every source is labelled as such.
   Steps marked general practice are common advice with no single named source. Fish is the only meat in this app. No weapons, no hunting.
   Fishing and fire rules differ by country, state and water. This is not legal, medical or safety advice. */
(function () {
  var SRCONLY = 'SEARCH RESULT ONLY, PAGE NOT OPENED';
  var LINKED = 'OFFICIAL SOURCE LINKED BUT NOT OPENED';
  var UNV = 'DATA UNVERIFIED';
  var GEN = 'Steps marked general practice are common advice. We did not find a named source for each one.';
  var NOTE = 'We read search results only. We could not open the source pages. ' + GEN;
  var RULES = 'Fishing rules differ by country, state and water. Most places need a licence. Read the wild food rules guide first. If you cannot find the rule, do not keep any fish you cannot name, and do not fish where signs say not to.';
  var CALL = 'In danger to life, call 911 (California, Florida), 999 or 112 (London) or 112 (Portugal) first, if the phone works.';
  var ARE = 'Food • Fishing from start to meal';
  var S = {
    clem: ['Clemson Extension: safe handling of fish (' + SRCONLY + ')', 'https://hgic.clemson.edu/factsheet/safe-handling-of-fish/'],
    psu: ['Penn State Extension: proper care and handling of fish from stream to table (' + SRCONLY + ')', 'https://extension.psu.edu/proper-care-and-handling-of-fish-from-stream-to-table'],
    temp: ['FoodSafety.gov: safe minimum cooking temperatures (' + LINKED + ')', 'https://www.foodsafety.gov/food-safety-charts/safe-minimum-cooking-temperature'],
    knot1: ['Take Me Fishing: improved clinch knot steps (' + SRCONLY + ')', 'https://www.takemefishing.org/blog/april-2018/improved-clinch-knot-fishing-knot-tying-steps/'],
    knot2: ['The Knots Manual: improved clinch knot (' + SRCONLY + ')', 'https://www.theknotsmanual.com/knots/fishing-knots/improved-clinch-knot/'],
    crawl: ['Outdoor Life: how to catch nightcrawlers for bait (' + SRCONLY + ')', 'https://www.outdoorlife.com/fishing/how-to-catch-nightcrawlers-bait/']
  };
  var NEW = [];
  function add(g) { g.area = ARE; g.icon = g.icon || 'waves'; g.difficulty = g.difficulty || 'Easy'; g.checkedOn = '4 Nov 2026'; g.status = 'partly'; g.source = g.sources[0][1]; if (!g.sections) g.sections = []; NEW.push(g); }

  /* ---------- 1. kit ---------- */
  add({
    id: 'fish-1-kit', title: 'Fishing step 1: what you need and what to use if you have none',
    intro: 'This is step 1 of 12 for fishing, from the tools to the meal. This guide lists every item, what it does, and what to use if you do not have it.',
    first: [NOTE, 'First ask: is fishing the right job right now? Read "Fishing: when NOT to fish" before you start. Shelter and safe water come first.', 'Do the kit check on flat dry ground, away from the water edge.'],
    do: [
      'Step 1. Lay a cloth or a clean sheet on the ground.',
      'Step 2. Put out every item from the table below.',
      'Step 3. Check the line. Pull it hard with both hands. If it is frayed, kinked or snaps, cut that part off.',
      'Step 4. Check each hook. The point must be sharp. If it is rusty or bent, do not use it.',
      'Step 5. Check the knife. A sharp knife is safer than a blunt one.',
      'Step 6. Put the small sharp things (hooks, knife) in a small box or stick them in a cork or a folded cloth.',
      'Step 7. Put everything in one bucket or bag, so you can carry it in one trip.'
    ],
    warn: ['Hooks and knives cut and pierce. Keep the points away from your skin and from children and pets.', 'Do not carry the knife with the blade out. Cover it.', 'Wear a life jacket near deep or fast water. Do not go in over your knees.'],
    tip: ['Pack a small first aid kit with a plaster or bandage. See the first aid kit guide.', 'Keep a spare hook, spare line and a spare sinker in your kit.'],
    after: ['Dry the gear before you pack it away. Wet line and hooks go bad faster.', 'Write down what you used up, so you can replace it.'],
    table: { head: ['Item', 'What it does', 'If you do not have it'],
      rows: [
        ['Rod and reel', 'Holds the line. Lets you throw the bait out and pull the fish in.', 'A hand line: wind the line on a flat stick or a plastic bottle, or tie it to a green stick.'],
        ['Line', 'Joins you to the hook.', 'Strong cord or twisted plant fibre. Pull it hard to test it.'],
        ['Hooks', 'Catch the fish.', 'Make one from bone, hard wood or a thorn (see "Make gear"). Use a small hook for a small fish.'],
        ['Sinker (weight)', 'Takes the bait down.', 'A small smooth stone, a nut or a washer tied on.'],
        ['Float', 'Holds the bait at one depth. Shows you when a fish bites.', 'A cork, a dry stick or a plastic bottle cap tied on the line.'],
        ['Bait', 'What the fish eat.', 'See "Fishing step 3: bait".'],
        ['Knife', 'Cuts line. Cleans the fish.', 'Any sharp blade. Cover it after use.'],
        ['Pliers, or a cloth', 'Take the hook out safely.', 'A cloth and your fingers. Keep the hook point away from your hand.'],
        ['Landing net, or a wet cloth', 'Lifts the fish out of the water without dropping it.', 'Wet hands or a wet cloth.'],
        ['Bucket or cooler with a lid', 'Keeps the catch cold and clean.', 'A covered container in the shade, with a wet cloth over it.'],
        ['A clean flat board', 'A place to clean the fish.', 'A clean flat piece of wood or a plate. Wash it first.'],
        ['Soap and safe water', 'Wash hands and tools.', 'Safe water: see the boil and filter guide.'],
        ['Life jacket', 'Keeps you afloat.', 'Stay where the water is below your knees.']
      ] },
    sections: [{ h: 'The whole fishing series, in order', items: [
      '1. What you need (this guide).', '2. A safe place, and the rules.', '3. Bait.', '4. If you have no gear: make a hand line.', '5. Knots.', '6. Rig the line.', '7. Cast and catch.', '8. Keep or let go?', '9. Clean the fish.', '10. Cook the fish.', '11. Serve and eat safely.', '12. Clean up and keep the rest.', 'Also: when NOT to fish. And fire for cooking.'] }],
    sources: [S.clem, S.psu],
    unconfirmed: [NOTE, UNV + ': the substitutes in the last column are general practice.', 'Not confirmed: which hook size suits which fish in your water. Ask a local angler.']
  });

  /* ---------- 2. place ---------- */
  add({
    id: 'fish-2-place', title: 'Fishing step 2: choose a safe place and check the rules',
    intro: 'Where you fish matters for your safety, for the fish, and for the food you will eat. Do these steps before you put a line in the water.',
    first: [NOTE, RULES, 'After a flood, storm or power cut, water may carry sewage and chemicals. Do not fish in or eat fish from floodwater.'],
    do: [
      'Step 1. Find the rule for this water. Look for signs. Read the wild food rules guide. Ask a park office or a local fishing shop if you can.',
      'Step 2. Look at the water. Walk away if you see: a sign saying no fishing or no eating fish, oil on the water, a bad smell, thick green or blue-green scum, or many dead fish.',
      'Step 3. Look upstream. A sewage pipe, a farm drain or a factory pipe upstream makes the water unsafe.',
      'Step 4. Look at the bank. Pick firm, flat ground. Avoid steep, slippery or crumbling banks, and wet rocks.',
      'Step 5. Look up. Check for power lines and low branches. Stay clear of them when you swing a rod.',
      'Step 6. Look at the sky. If you hear thunder or see lightning, leave the water edge and go to a safe building or a car.',
      'Step 7. Find where fish hide: near rocks, logs, reeds or shade, where fast water meets slow water, and in deeper pools. Early morning and evening are often best.',
      'Step 8. Tell someone where you are going and when you will be back. Take a partner if you can.',
      'Step 9. Put your kit on dry ground behind you, not at the water edge.'
    ],
    warn: ['Do not wade in fast or deep water. Fast water at knee height can knock you over (general practice).', 'Do not fish from a bridge, a dam or a lock gate.', 'Fish from floodwater, or from water with a warning sign, are not safe to eat. Do not eat them.', 'Never fish alone near deep or fast water if you cannot swim.'],
    tip: ['Fish from the bank before you think about a boat.', 'Write down the place and the date. It helps you remember where fish were.'],
    after: ['Look back at the place before you leave. Take everything with you, including line and hooks.', 'Never leave line or hooks behind. Animals get tangled in them.'],
    sections: [{ h: 'How to find the rule, in order', items: ['First: signs at the water.', 'Second: the wild food rules guide in this app.', 'Third: a park office, a fishing shop or a wildlife office.', 'If you cannot find it: only keep a fish you can name and know is allowed. Let the others go.'] }],
    sources: [S.clem, S.psu],
    unconfirmed: [NOTE, 'Not confirmed: the licence, season, size and limit rules for your water in California, Florida, London and Coimbra. See the wild food rules guide.', UNV + ': the 5 warning signs of unsafe water are general practice.']
  });

  /* ---------- 3. bait ---------- */
  add({
    id: 'fish-3-bait', title: 'Fishing step 3: bait. What to use, how to find it, how to keep it',
    intro: 'Bait is what makes a fish bite. This guide shows what bait to choose, where to find it, how to put it on a hook, and how to keep it alive or fresh.',
    first: [NOTE, 'Use what is easy to find first: worms, insects, small pieces of fish, bread or cooked rice.', 'Bait rules differ by place. Some waters limit live bait. Check the rule in step 2.'],
    do: [
      'Step 1. Pick the bait. Start with a worm. Worms work for many freshwater fish (general practice). Ask a local angler what fish eat in your water.',
      'Step 2. To find worms: after rain, look under logs, stones and wet leaves. Dig in damp, dark soil with a stick or a trowel. Look near compost and in garden soil.',
      'Step 3. To find insects: in the early morning, when the air is cool, look in grass for grasshoppers and crickets. They move slowly when cold.',
      'Step 4. To use fish as bait: cut a small strip from the belly of a fish you caught. Keep it cold. Use a small piece.',
      'Step 5. Other bait: a small ball of bread dough, cooked rice, cooked pasta or cooked corn. Mould it on the hook.',
      'Step 6. Put the bait in a small container with damp soil or damp leaves. Put the lid on loosely, so air can get in. Do not seal it.',
      'Step 7. Keep it cool, dark and damp. Do not leave it in the sun. A cool shade is better than a hot car.',
      'Step 8. Take only as much bait as you need for one trip, and a little extra.',
      'Step 9. At the end, do not throw leftover live bait into the water. Put it on the ground far from the water, or in the bin.'
    ],
    warn: ['Do not use food that is rotten or that you would eat. Keep your food clean.', 'Wash your hands with soap and safe water after you touch bait, and before you touch food.', 'Do not use bait from a source that may have chemicals on it, such as sprayed lawns.', 'Do not carry live bait from one water to another. It can spread pests (general practice).'],
    tip: ['Sources disagree on the best storage temperature for worms: one says about 40 to 50 F (4 to 10 C), another says about 58 to 68 F (14 to 20 C). Keep them cool and damp, and check them often.', 'Keep damp, not wet. Too wet drowns worms. Too dry kills them.', 'Fish that bite at night or early morning may not take bait in the heat of the day.'],
    after: ['Check the bait box after the trip. Remove dead worms. They smell and spoil the others.', 'Wash the container and let it dry.'],
    table: { head: ['Bait', 'Where to find it', 'How to keep it', 'Notes'],
      rows: [
        ['Worm', 'Under logs and stones. Damp soil after rain.', 'Damp soil or leaves, cool, dark, lid not tight.', 'Works for many freshwater fish.'],
        ['Grasshopper or cricket', 'In grass early in the morning.', 'A box with air holes and grass, in the shade.', 'Hook through the thick part behind the head.'],
        ['Cut bait (a strip of fish)', 'From a fish you caught.', 'Cold, covered, and use soon.', 'Use a small strip. Keep it cold or it spoils.'],
        ['Bread dough', 'From bread and a little water.', 'Make it fresh. Do not keep it long.', 'Mould around the hook. Leave the point free.'],
        ['Cooked rice, pasta or corn', 'From your food.', 'Cold and covered, for one day.', 'Use only a small amount.']
      ] },
    sections: [],
    sources: [S.crawl],
    unconfirmed: [NOTE, UNV + ': which bait works best on which fish in your water. Ask a local angler.', UNV + ': the best storage temperature for worms. Sources disagree.', 'Not confirmed: live bait rules for California, Florida, London and Coimbra.']
  });

  /* ---------- 4. no gear ---------- */
  add({
    id: 'fish-4-no-gear', title: 'Fishing step 4: if you have no gear, make a hand line',
    intro: 'This is for when you have no rod, no hooks and no line. It uses plain things you can find. It is the same method as the "Make simple fishing gear" guide, written in smaller steps.',
    first: [NOTE, RULES, 'A home-made hook can hurt. Go slowly. Keep the point away from your skin.'],
    do: [
      'Step 1. Make a line. Twist plant fibre into cord. Use strong vine runners or long, rubbery roots. Twist two strands together in the same direction, then twist them together in the other direction.',
      'Step 2. Pull the cord hard to test it. If it snaps, twist it again or use thicker strands.',
      'Step 3. Make a gorge hook. Take a thin, hard sliver of bone, hard wood or a cactus spine, about 1 inch (2.5 cm) long. Make both ends sharp.',
      'Step 4. Tie the cord to the middle of the sliver. Tie it twice.',
      'Step 5. Hide the sliver inside the bait. A worm or a small piece of fish is good.',
      'Step 6. Tie a small smooth stone on the cord, about 6 to 12 inches (15 to 30 cm) above the bait, to take it down.',
      'Step 7. Tie the other end to a green stick, or hold it in your hand and wrap it around a flat stick.',
      'Step 8. Drop the bait near logs, rocks or shade. Watch the cord. Pull gently when you feel it move.',
      'Step 9. Keep the cord tight and steady. Pull the fish to the bank. Then go to the step on landing and keeping it.'
    ],
    warn: ['A gorge hook is for a fish you plan to keep, not to let go. It goes down the throat.', 'Do not use nets, weirs or traps unless the local rule allows them. They are often against the law.', 'Do not tie the cord around your hand or finger. A strong fish can pull you in.'],
    tip: ['If you have a pin, a bent nail or a staple, ask: is it safe? A bent metal hook can break or slip. A gorge hook is safer to make (general practice).'],
    after: ['Wind the cord up. Dry it. Keep the spare hooks in a box.'],
    sections: [], sources: [S.clem],
    unconfirmed: [NOTE, 'Not confirmed: that a home-made line holds a fish of any size. Test the pull before you use it.', 'See also the guide "Make simple fishing gear: line, hook, hand line".']
  });

  /* ---------- 5. knots ---------- */
  add({
    id: 'fish-5-knots', title: 'Fishing step 5: tie the hook to the line (two knots, step by step)',
    intro: 'A knot that slips loses the fish. Learn one good knot and practise it before you go. This guide shows the improved clinch knot and the palomar knot.',
    first: [NOTE, 'Practise with a piece of cord and a big safe ring, not a hook, until you can do it without looking.', 'Wet the knot before you pull it tight. Dry line can heat up and weaken.'],
    do: [
      'Improved clinch knot, for ordinary line.',
      'Step 1. Push about 6 inches (15 cm) of line through the eye of the hook.',
      'Step 2. Fold the end back along the main line.',
      'Step 3. Wrap the end around the main line 5 to 7 times. For thick line use 3 or 4 turns.',
      'Step 4. Push the end back through the small gap right next to the eye.',
      'Step 5. Now push the end through the big loop that formed above the gap. This last step is what makes it the improved knot.',
      'Step 6. Wet the knot with water or spit.',
      'Step 7. Hold the hook. Pull the main line slowly. The coils slide down and close tight.',
      'Step 8. Trim the end, leaving a very short tail.',
      'Step 9. Test it. Pull the hook and the line hard. If it slips, cut it off and tie again.',
      'Palomar knot, for slippery or braided line.',
      'Step 10. Fold 6 inches (15 cm) of line into a loop and push the loop through the eye.',
      'Step 11. Tie a loose overhand knot with the doubled line. The hook hangs below.',
      'Step 12. Pass the loop over the whole hook.',
      'Step 13. Wet it. Pull both the main line and the end, slowly, to close the knot. Trim, and test.'
    ],
    warn: ['Do not pull a dry knot tight with a jerk. Friction can heat and weaken the line.', 'Hold the hook by the bend with a cloth, not by the point. Keep the point away from your hands.', 'Cut off the old knot every time you change the hook. A used knot is weaker.'],
    tip: ['Sources disagree on the improved clinch knot with braided line. One says it can fail. The palomar knot is often used with braid.', 'Keep a short piece of line to practise with.'],
    after: ['Check the knot again after each fish. Fish pull hard and knots loosen.'],
    sections: [{ h: 'Parts of a hook', img: 'assets/fish/hook.svg', alt: 'A hook with its eye, shank, bend, point and barb labelled', items: ['Know the parts of a hook. The eye takes the line. The point is the sharp end. The barb stops the hook slipping out.'] }],
    sources: [S.knot1, S.knot2],
    unconfirmed: [NOTE, UNV + ': the 6 inch tail length and the turn counts come from search results for two knot guides. They are common but vary a little between guides.', 'Not confirmed: which knot is best for the line you have.']
  });

  /* ---------- 6. rig ---------- */
  add({
    id: 'fish-6-rig', title: 'Fishing step 6: rig the line (sinker, float, hook and bait)',
    intro: 'A rig is the line set up ready to fish. This guide shows a simple float rig with a sinker, and how to put the bait on the hook.',
    first: [NOTE, 'Rig on dry ground, not at the water edge. Keep the hook point covered or stuck in a cork when you are not using it.', 'Look at the picture at the bottom of this guide.'],
    do: [
      'Step 1. Tie the hook to the line (see the knots guide).',
      'Step 2. Put a sinker on the line about 6 to 12 inches (15 to 30 cm) above the hook. A small split shot pinched on the line, or a small stone or nut tied on.',
      'Step 3. Put the float on the line above the sinker. Slide it up to set how deep the bait hangs. The float sits at the water and the bait hangs below.',
      'Step 4. To put a worm on the hook: push the hook point in near one end, thread the worm along the hook two or three times, and leave the ends free to wiggle.',
      'Step 5. To put an insect on: push the hook through the thick part under the head. Do not squash it.',
      'Step 6. To put cut bait on: push the hook through the strip twice. Leave the point of the hook free.',
      'Step 7. To put dough on: squeeze a small ball of dough around the hook, with the point free.',
      'Step 8. Check: the hook point is clear and sharp, the bait is firm, the knot is tight.',
      'Step 9. Test the depth. Cast and look at the float. If the float lies on its side, the line below is too long and the sinker is on the bottom. Move the float up the line. If the float stands up straight, the depth is about right.'
    ],
    warn: ['Mind the hook point when you thread bait. Hold the bait with a cloth, not your finger.', 'A hook can swing back. Keep people and pets well back when you cast.', 'Pinch split shot gently with pliers. Do not bite it.'],
    tip: ['Fish often feed near the bottom or near cover. Try to keep the bait within a hand or two of the bottom (general practice).', 'If you get no bite in 15 minutes, change the depth or the spot.'],
    after: ['Take the bait off the hook at the end. Do not leave baited hooks lying around.'],
    sections: [{ h: 'A simple float rig', img: 'assets/fish/rig.svg', alt: 'A float rig: rod tip, line, float, sinker, hook and a worm', items: ['The float sits on the water. The sinker takes the line down. The hook and bait are at the bottom of the line.'] }],
    sources: [S.clem],
    unconfirmed: [NOTE, UNV + ': the sinker distance, the float depth test and the bait hooking methods are general practice, not from a named page.', 'Not confirmed: the best rig for each fish in your water.']
  });

  /* ---------- 7. cast and catch ---------- */
  add({
    id: 'fish-7-cast-catch', title: 'Fishing step 7: cast, wait, set the hook and land the fish',
    intro: 'This guide shows how to put the bait in the water, how to know a fish has bitten, and how to bring it in safely.',
    first: [NOTE, 'Look behind you and above you before you swing the rod. Make sure nobody is close.', 'Stand on firm ground, a few steps back from the edge.'],
    do: [
      'Step 1. With a spinning reel: hold the rod in one hand. Open the bail arm (the wire on the reel) and hold the line against the rod with one finger.',
      'Step 2. Look at where you want the bait to go. Bring the rod back over your shoulder to about 1 on a clock face.',
      'Step 3. Swing the rod forward in a smooth motion. When the rod points at about 10 on a clock face, let the line go from your finger.',
      'Step 4. Close the bail arm by turning the reel handle. Take up any loose line until the line is tight and straight.',
      'Step 5. With a hand line: hold the weight in one hand and the line in the other. Swing the weight gently and let it go. Let the line run out through your fingers.',
      'Step 6. Hold the rod or the line. Watch the float. If the float bobs, dips, or moves across, a fish may be there.',
      'Step 7. Wait until the float goes down firmly, or the line pulls tight. Then lift the rod tip up smoothly, to set the hook. Do not jerk.',
      'Step 8. Keep the rod tip up. Turn the reel handle steadily, and keep the line tight. If the fish pulls hard, stop reeling and let it pull. Then reel again. Do not wrap the line around your hand.',
      'Step 9. Bring the fish toward the bank. Slide it onto grass or into a net. Do not lift a big fish by the line.',
      'Step 10. Wet your hands first. Hold the fish firmly, behind the head, or use a cloth if it has spines.',
      'Step 11. Go to the next step: decide to keep it or let it go.'
    ],
    warn: ['Do not cast near people, power lines or low branches.', 'Never put your fingers in a fish mouth or gills. Some fish have sharp teeth or spines.', 'If a hook goes into your skin: stop, do not pull it. Cut the line. If it is deep, near the eye or the face, or you cannot get it out, get medical help. See the wounds guide.', 'Do not stand on wet rocks to land a fish.'],
    tip: ['Practise the cast on dry grass with a small weight and no hook. Aim at a target.', 'If you miss a bite, wait. Fish often come back.'],
    after: ['Check the line and the hook after every fish. Re-tie if needed.'],
    sections: [], sources: [S.clem],
    unconfirmed: [NOTE, UNV + ': the clock face cast positions and the strike advice are general practice. Many people learn them best in person.', 'Not confirmed: how hard your line can be pulled. Use the drag setting on the reel if it has one.']
  });

  /* ---------- 8. keep or release ---------- */
  add({
    id: 'fish-8-keep-or-release', title: 'Fishing step 8: keep it or let it go? Safety and rule checks',
    intro: 'Not every fish you catch is a fish you should eat or keep. Do these checks in order, every time.',
    first: [NOTE, RULES, 'If you are not sure about any check, let the fish go. A meal is not worth getting sick.'],
    do: [
      'Check 1. Is it allowed? Look up the species, the size, the season and the daily limit. If you cannot find out, let it go unless you can name it and know it is allowed.',
      'Check 2. Can you name it? If you cannot, let it go.',
      'Check 3. Is the water safe? Look for posted advisories about eating fish from this water. If there is one, follow it. Floodwater fish are not safe.',
      'Check 4. Look at the fish. Keep it only if: the eyes are clear and not sunken, the gills are red or pink, the skin is shiny with no sores or sores that look like rot, and it smells fresh, like water, not sharp or sour.',
      'Check 5. Do you need it? Catch only what you can clean, cook and eat or keep cold. More than that is waste.',
      'To keep it: kill it quickly. Give it a firm blow to the top of the head, just behind the eyes, with a stick or the back of a knife. Put it on ice or in a cool, covered container at once.',
      'To let it go: keep it in the water if you can. Wet your hands. Hold the fish gently, do not squeeze. Take the hook out fast. Hold it facing the current until it swims away.'
    ],
    warn: ['Reef fish in warm seas can carry a poison called ciguatera that cooking does not remove. If you fish warm reefs, ask a local before you eat large reef fish (general practice, ' + UNV + ').', 'Do not eat raw wild fish. Cook it fully.', 'Some people need extra care: pregnant women, young children, older people and people with weak immune systems. Follow local fish advisories (general practice).'],
    tip: ['Put a small ruler mark on your board or rod to measure size. Write the size rule on it.', 'If you let a fish go, take care. A released fish may be tired. Let it recover in the water.'],
    after: ['Write down what you kept and let go.'],
    table: { head: ['Check', 'Keep if', 'Let go if'],
      rows: [
        ['Allowed?', 'You know it is allowed, size and season.', 'You cannot find out, or it is not allowed.'],
        ['Named?', 'You can name it.', 'You cannot name it.'],
        ['Water?', 'No warning, not floodwater.', 'Warning sign, floodwater, oil or scum.'],
        ['Eyes and gills', 'Eyes clear. Gills red or pink.', 'Eyes sunken. Gills grey or slimy.'],
        ['Skin and smell', 'Shiny, firm, fresh smell.', 'Sores, soft flesh, sour smell.'],
        ['Need', 'You will use it.', 'You already have enough.']
      ] },
    sections: [], sources: [S.clem, S.psu],
    unconfirmed: [NOTE, 'Not confirmed: fish advisories for your water. Look for local signs and local health or wildlife office pages.', UNV + ': the freshness signs and the ciguatera note are general practice.']
  });

  /* ---------- 9. clean ---------- */
  add({
    id: 'fish-9-clean', title: 'Fishing step 9: clean the fish, step by step',
    intro: 'Clean the fish soon after you catch it, keep it cold, and keep it away from other food. This guide shows how to scale, open, clean and rinse a whole fish.',
    first: [NOTE, 'Clean fish within 1 to 2 hours of catching it if you can, and keep it under 40 F (4 C) before then (search result advice).', 'Set up a clean station away from the water you drink from and away from other food.'],
    do: [
      'Step 1. Wash your hands with soap and safe water.',
      'Step 2. Put a clean board on a flat surface. Keep the fish in the cool until you are ready.',
      'Step 3. Rinse the fish in safe water.',
      'Step 4. Scale it, unless it is a trout. Hold the tail. With the back of the knife, scrape from the tail toward the head, in short strokes. Do both sides. Rinse off loose scales.',
      'Step 5. Lay the fish on its back. Find the small hole near the tail, called the vent.',
      'Step 6. Put the knife tip just inside the vent. Keep the cut shallow, only through the skin. Cut up the belly toward the head, to the bottom of the gills.',
      'Step 7. Open the belly. Put your fingers in and pull out the insides in one go.',
      'Step 8. Look at the insides. If you see lots of worms, a bad colour or a bad smell, throw the fish away.',
      'Step 9. Along the backbone you will see a dark red line. This is the blood line. Scrape it out with your thumb or a spoon.',
      'Step 10. Cut out the gills if you want. Rinse the inside with safe water until it is clean.',
      'Step 11. Cut off the fins with a knife or scissors if they are sharp. You can cook the fish whole, with or without the head.',
      'Step 12. Rinse the whole fish. Put it in a clean container, covered, in the cool.',
      'Step 13. Put the insides and scales in a sealed bag or bury them far from camp and far from water. Wash the board, the knife and your hands with soap and safe water.'
    ],
    warn: ['Cut away from your body and away from your hands. Keep your free hand behind the blade.', 'Do not hold the fish on your lap while you cut.', 'Do not use the same board and knife for raw fish and for other food without washing them first.', 'Fish spines and fins can puncture the skin. Use a cloth or glove.', 'Do not throw waste in the water you drink from. It brings animals and spoils the water.'],
    tip: ['Trout have very small scales and you usually do not need to scale them (search result).', 'A flexible fillet knife gives clean cuts. Any sharp knife works.', 'Start with a small fish. It is easier.'],
    after: ['Keep the cleaned fish under 40 F (4 C) until you cook it. Cook it the same day if you cannot keep it cold.'],
    sections: [], sources: [S.clem, S.psu],
    unconfirmed: [NOTE, UNV + ': the cutting steps are general practice and vary a little between fish. We did not open a fish agency guide.', 'Not confirmed: that every fish needs scaling. Fish differ.']
  });

  /* ---------- 10. cook ---------- */
  add({
    id: 'fish-10-cook', title: 'Fishing step 10: cook the fish all the way through',
    intro: 'Cooking kills the germs that make people ill. This guide shows four ways to cook a fish, and how to know it is done.',
    first: [NOTE, 'Cook the fish all the way through. Never eat wild fish raw.', 'Cook outside, or in a well-aired space. Never use a fire, charcoal or a stove inside a tent or a closed room. It can make carbon monoxide, which kills with no smell.', 'Read "Fire for cooking" before you light a fire.'],
    do: [
      'Step 1. Wash your hands. Use clean tools and a clean plate. Keep raw fish away from cooked food.',
      'Step 2. Pick a method: pan, grill or rack over coals, wrapped in foil on coals, or boiled in a pot.',
      'Pan method. Step 3. Heat a pan on a stove or over a bed of coals, not over flames. Add a little oil if you have it. Put the fish in. Cook one side until it turns opaque, then turn it over.',
      'Grill method. Step 4. Wait for the fire to burn down to glowing coals. Put a rack over them. Lay the fish on the rack. Turn it once.',
      'Foil method. Step 5. Wrap the fish in foil, folded closed. Put it on the coals. Turn it once.',
      'Boil method. Step 6. Put the fish in a pot of safe water. Boil until the flesh flakes.',
      'Step 7. Check it is done. The thickest part must reach 145 F (63 C) on a food thermometer. With no thermometer: the flesh turns opaque all the way through and flakes easily with a fork.',
      'Step 8. If the middle is still shiny, see-through or jelly-like, cook it longer.',
      'Step 9. Take it off the heat. Use a cloth or a glove. Put it on a clean plate.',
      'Step 10. Put out the fire completely (see "Fire for cooking").'
    ],
    warn: ['Never cook in a tent or a closed room. Carbon monoxide kills. See the carbon monoxide guide.', 'A pan or a rack is hot long after you take it off the fire. Do not touch it. Warn children.', 'Do not leave the fire or the stove alone.', 'Do not use water on a hot oil fire. Smother it with a lid.', 'Do not put cooked fish on the plate that held raw fish.'],
    tip: ['Cut the fish into smaller pieces to cook it faster.', 'Cook fish on a bed of coals, not on high flames. Flames burn the outside and leave the middle raw.', 'A cooked fish smells good. If it smells off, do not eat it.'],
    after: ['Wash the pan, the rack and your hands with soap and safe water.'],
    sections: [], sources: [S.temp, S.clem],
    unconfirmed: [NOTE, UNV + ': 145 F (63 C) is quoted by university extension pages found in search and is the figure on the official chart we linked but did not open.', 'Not confirmed: cooking times for your fish. Use the doneness tests, not a timer.']
  });

  /* ---------- 11. eat ---------- */
  add({
    id: 'fish-11-eat', title: 'Fishing step 11: serve and eat the fish safely',
    intro: 'Serving and storing the food is part of the meal. This guide covers bones, portions, leftovers and what to do if someone feels ill.',
    first: [NOTE, 'Leftovers need cold storage within 2 hours of cooking (search result advice). With no cold storage, eat it within about 2 hours or do not keep it.', 'Remove bones carefully for children and older people.'],
    do: [
      'Step 1. Wash everyone hands before eating.',
      'Step 2. Put the fish on clean plates. Use clean tools.',
      'Step 3. Pull the flesh away from the bones with a fork. Look and feel for small bones. Remove them.',
      'Step 4. Give children and older people bone-free pieces. Watch them eat the first bites.',
      'Step 5. Share the portions fairly. Give extra to children, pregnant people and people who are weak or ill.',
      'Step 6. Eat slowly. Chew well.',
      'Step 7. Cover any leftovers. Put them in a cold place within 2 hours. If you have no cold place, do not keep them. Bury or bin them far from camp.',
      'Step 8. Write down what was eaten and what was left, so you can plan the next meal.',
      'Step 9. Watch everyone for the next day. If someone has vomiting, diarrhoea, fever or stomach pain, give them safe water in small sips and rest. See the dehydration guide.',
      'Step 10. Get medical help if the illness is severe, lasts more than a day, or the person is a child, pregnant, elderly or has a weak immune system.'
    ],
    warn: ['A fish bone stuck in the throat is an emergency if the person cannot breathe or talk. Call for help.', 'Do not reheat fish that was left out for more than 2 hours.', 'Do not share one fork or cup between sick people and others.'],
    tip: ['Pair the fish with rice, bread, cooked beans or vegetables if you have them.', 'Keep a bucket and a cloth near the meal for spills.'],
    after: ['Wash dishes with soap and safe water, and let them dry in the air.'],
    sections: [], sources: [S.clem, S.psu],
    unconfirmed: [NOTE, UNV + ': the portion and the 2-hour limit come from general guidance in search results. A hot day can make the limit shorter.', 'Not confirmed: how long cooked fish stays safe in your cold storage. Use the simplest rule: when in doubt, throw it out.']
  });

  /* ---------- 12. clean up ---------- */
  add({
    id: 'fish-12-cleanup', title: 'Fishing step 12: clean up, store and keep the rest',
    intro: 'After the meal, clean the tools, deal with the waste, and decide how to keep the rest of the catch.',
    first: [NOTE, 'Clean first. Germs from raw fish stay on boards, knives and hands.', 'Waste attracts animals. Put it away from where you sleep.'],
    do: [
      'Step 1. Wash the board, the knife, the pan and your hands with soap and safe water. Let them dry in the air.',
      'Step 2. Clean the gear. Rinse the line and the hooks. Dry them. Put the hooks in a box.',
      'Step 3. Put the fish waste in a sealed bag, or bury it in a hole at least 8 inches (20 cm) deep, well away from water and from where you sleep (general practice).',
      'Step 4. Wash the bucket or cooler.',
      'Step 5. If you have fish left raw: keep it cold, covered, and cook it the same day if you can.',
      'Step 6. To keep fish longer with no fridge: see the guides on smoking, drying and salting fish, and on preserving food. Read the safety lines first.',
      'Step 7. Write down: place, date, how many fish, what bait worked, and any problem.',
      'Step 8. Plan the next trip. Do you need more bait? More line? A better spot?',
      'Step 9. Check yourself and others for cuts, burns and hook scratches. Clean and cover any wound.'
    ],
    warn: ['Do not throw fish waste in the water near where you drink.', 'Do not leave fish scraps in the open. They attract animals and flies.', 'Never leave line or hooks behind.'],
    tip: ['A fish that is smoked or dried well keeps longer. The guides tell you how to do it safely.', 'Share a good spot and good bait information with neighbours.'],
    after: ['Keep a simple notebook of every fishing trip. It helps you get better.'],
    sections: [], sources: [S.clem, S.psu],
    unconfirmed: [NOTE, UNV + ': the 8 inch burial depth is general practice. Local rules may differ.', 'Not confirmed: that smoking, drying or salting is safe for your fish and your weather. See the guides.']
  });

  /* ---------- 13. when not to fish ---------- */
  add({
    id: 'fish-13-when-not', title: 'Fishing: when NOT to fish, and what to do instead',
    intro: 'Fishing is not always the right job. Sometimes it is unsafe, not allowed, or less important than shelter and water. This guide helps you decide.',
    first: [NOTE, 'A common survival rule of thumb: you can last about 3 hours in harsh weather without shelter, about 3 days without water, and about 3 weeks without food (general practice, ' + UNV + '). Shelter and water come before fishing.', CALL],
    do: [
      'Step 1. Ask: is anyone in danger now? If yes, deal with that first.',
      'Step 2. Ask: do we have shelter that keeps us warm and dry or cool? If no, build or find shelter first.',
      'Step 3. Ask: do we have safe water to drink today? If no, make water safe first (boil and filter guide).',
      'Step 4. Ask: is the water safe to fish in and to eat from? If you see floodwater, oil, scum, a warning sign or a sewage smell, do not fish there.',
      'Step 5. Ask: is it allowed? If you cannot find the rule, do not keep fish you cannot name.',
      'Step 6. Ask: can we clean and cook it safely today? If you have no clean water, no fuel and no safe way to cook, do not catch fish you cannot use.',
      'Step 7. Ask: is the weather safe? Lightning, strong wind, ice or fast high water mean stay away from the edge.',
      'Step 8. Ask: is the effort worth it? Fishing costs time and energy. If you are tired, hungry and cold, rest and eat first from stored food.',
      'Step 9. If any answer is no, use a safer food source: stored food, rationing, a garden, or help from a neighbour. See the stockpile and food guides.',
      'Step 10. Come back to fishing when the answers are all yes.'
    ],
    warn: ['Do not fish in floodwater or in water that may carry sewage.', 'Do not fish on thin ice.', 'Do not eat fish you cannot cook all the way through.', 'Do not go alone into danger because you are hungry.'],
    tip: ['Make a small decision card with the 8 questions and keep it with your kit.', 'Hunger is slower to hurt than thirst and cold. Do the urgent things first.'],
    after: ['After a failed or unsafe trip, write down why, so you choose better next time.'],
    sections: [], sources: [S.clem],
    unconfirmed: [NOTE, UNV + ': the rule of 3 hours, 3 days and 3 weeks is a common rule of thumb. Real limits vary a lot with the person and the weather.']
  });

  /* ---------- 14. fire for cooking ---------- */
  add({
    id: 'fire-cooking-steps', icon: 'flame', title: 'Fire for cooking: decide first, build it safely, put it out completely',
    intro: 'This is the fire guide to read before you cook the fish. The first lesson is when NOT to light a fire. Then the steps to build, light, use and put out a small cooking fire.',
    first: [NOTE, 'First ask: should I light a fire at all? A fire is a risk. A stove or a no-fire meal may be safer.', 'Never use a fire, charcoal or a stove inside a tent, a car or a closed room. Carbon monoxide kills with no smell.', 'Fire rules differ by place and season. Portugal has times of high rural fire danger when outdoor fire is limited (' + UNV + ': stated in a source we were given, page not opened). Check the civil protection page. In the US, check the local fire danger and burn rules.'],
    do: [
      'Step 1. Stop. Ask: is there a fire ban or very high fire danger? Is it very windy? Is the ground dry grass or leaves? If yes to any, do not light a fire. Use a camp stove or eat food that needs no cooking.',
      'Step 2. Pick a place that is allowed, bare and flat. A fire ring or a metal pan is best. Stay at least 10 feet (3 m) from tents, trees, bushes, fences and buildings (general practice).',
      'Step 3. Clear a circle of ground about 10 feet (3 m) wide down to bare soil. Take away leaves, grass and sticks.',
      'Step 4. Put a bucket of water and a shovel or a strong stick next to the fire place before you start.',
      'Step 5. Gather three sizes of fuel, all dry. Tinder is tiny, dry things that catch easily: dry grass, thin bark, paper. Kindling is sticks as thin as a pencil. Fuel is wood as thick as your wrist.',
      'Step 6. Make a small nest of tinder in the middle. Lean kindling over it like a small tent, leaving gaps for air.',
      'Step 7. Light the tinder from the upwind side with a match, a lighter or a ferro rod. Shield it from wind. Blow gently at the base.',
      'Step 8. When the kindling burns well, add thin fuel, one piece at a time. Keep the fire small.',
      'Step 9. For cooking, wait until the flames drop and you have glowing coals. Cook over coals, not flames.',
      'Step 10. Stay with the fire at all times. Keep children and pets back. Keep a clear space around it.',
      'Step 11. When done, let the fire burn down. Spread the ashes. Pour water slowly on all the embers. Stir with a stick. Pour again.',
      'Step 12. Feel the ashes with the back of your hand held close, not touching. If any part is warm, add water and stir again until it is cold.',
      'Step 13. Leave the place clean. Take your rubbish. If it rains or the wind rises, stop and put the fire out.'
    ],
    warn: ['Do not leave a fire alone, even for a short time.', 'Do not use petrol, lighter fluid on a lit fire, or other fuel to start a fire.', 'Do not light a fire under trees or in dry grass.', 'A fire that looks out can still hold heat for hours. Make sure it is cold.', 'Do not burn plastic, treated wood or rubbish. The smoke is poisonous.', 'For wet or windy weather, see the guide on making a fire in rain, wind and snow. For starting with no matches, see the ferro rod guide.'],
    tip: ['Use a small fire. It is safer and uses less wood.', 'A reflector of stones behind the fire throws heat toward you and shields the wind.', 'If a fire starts to spread, back away, call for help and get to safety. Do not fight a big fire.'],
    after: ['Check the fire place again before you leave and again in an hour if you can.', 'Put out any spark that flew outside the circle.'],
    sections: [], sources: [S.clem, S.psu],
    unconfirmed: [NOTE, UNV + ': the 10 foot clearance distances and the 3 size of fuel are general practice.', 'Not confirmed: the current fire rules where you are. Check the civil protection page (Portugal) or the local fire agency (US), and let the local rules overrule this guide.', 'Not confirmed: that a fire is allowed at your site.']
  });

  /* ---------- link the existing guides back to the series ---------- */
  function find(id) { var gs = (window.LOAD_CORE && window.LOAD_CORE.guides) || []; for (var i = 0; i < gs.length; i++) if (gs[i].id === id) return gs[i]; return null; }
  var lt = find('lt-fishing');
  if (lt) lt.sections = (lt.sections || []).concat([{ h: 'Step-by-step fishing series, added 4 Nov 2026', items: [
    'Fishing step 1: what you need and what to use if you have none.',
    'Fishing step 2: choose a safe place and check the rules.',
    'Fishing step 3: bait.',
    'Fishing step 4: if you have no gear, make a hand line.',
    'Fishing step 5: tie the hook to the line.',
    'Fishing step 6: rig the line.',
    'Fishing step 7: cast, wait, set the hook and land the fish.',
    'Fishing step 8: keep it or let it go.',
    'Fishing step 9: clean the fish.',
    'Fishing step 10: cook the fish.',
    'Fishing step 11: serve and eat safely.',
    'Fishing step 12: clean up, store and keep the rest.',
    'Fishing: when NOT to fish. And fire for cooking.'] }]);

  if (window.LOAD_CORE && window.LOAD_CORE.guides) NEW.forEach(function (g) { window.LOAD_CORE.guides.push(g); });
})();
