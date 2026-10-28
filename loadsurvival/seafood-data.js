/* Wild food with few or no appliances: birds, crabs and lobsters, shellfish, other sea life, a field-safety checklist and solar oven cooking.
   Written 28 Oct 2026 from the illustrated survival food PDF the owner supplied, plus search results. Each guide is Partly checked.
   Rules differ by place and change. This app cannot show current closures or seasons. */
(function () {
  var PDFNOTE = 'This guide follows the illustrated survival food PDF you gave us. We did not open the official pages it names.';
  var SAFE = [
    ['USDA FSIS: when fishing, how do I keep my catch safe to eat? (cited to us, not checked)', 'https://ask.fsis.usda.gov/article/When-fishing-how-do-I-keep-my-catch-safe-to-eat'],
    ['FDA: selecting and serving fresh and frozen seafood safely (cited to us, not checked)', 'https://www.fda.gov/food/buy-store-serve-safe-food/selecting-and-serving-fresh-and-frozen-seafood-safely'],
    ['FoodSafety.gov: safe minimum internal temperatures (cited to us, not checked)', 'https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures']
  ];

  var birds = {
    id: 'wild-birds-prep', area: 'Food', icon: 'can', difficulty: 'Practical', status: 'partly', checkedOn: '28 Oct 2026',
    title: 'Legally harvested wild birds: inspect, clean and cook',
    intro: 'This covers game birds such as ducks, geese and pheasants that were harvested legally. It is not a guide to catching wild birds. Seasons, gear and licences differ by country and place.',
    first: [
      'Use only birds that were legally harvested, in season, by a legal method.',
      'Never handle a bird found dead or one that looks ill. Wear gloves.',
      'Keep raw bird and its juices away from clean food, water and tools.',
      'Cook to 165 F (74 C) in the thickest parts. Use a thermometer.'
    ],
    do: [
      'Inspect the bird. Confirm it was legally harvested. Reject a bird that was already dead when found, had an unknown cause of death, or shows illness, unusual discharge, bad swelling or decay. Put on disposable gloves and cover cuts on your hands.',
      'Pluck or skin it. Use a washable work area and a board for this job only. To pluck, pull small groups of feathers in the direction they grow, to reduce tearing. Skinning is quicker but removes the skin and the fat.',
      'Open and clean the cavity. Find the vent under the tail. Make a shallow cut without cutting into the intestines. Remove the organs gently. Do not burst the stomach, intestines or gall bladder. Look inside for lesions, odd colour, pus or a bad smell. Reject a suspicious bird. Do not cut away only the bad part.',
      'Cook it without electricity. Use a covered Dutch oven or heavy pot with a little safe liquid, a skillet with cut pieces, or a covered outdoor grill away from strong flame. Never cook indoors with charcoal or a camp stove.',
      'Check the temperature. Push a food thermometer into the thickest part of the breast and thigh, away from bone. Poultry is safe at 165 F (74 C). Do not trust brown skin, clear juices or cooking time. Chill leftovers fast and keep them cold.'
    ],
    warn: [
      'Birds with avian influenza can look healthy. Wear gloves and wash your hands well.',
      'Do not eat a bird that fails the inspection.',
      'Do not use the same board or knife for raw bird and for ready-to-eat food.',
      'Check the rules before you hunt. Lead shot may be banned for wildfowl where you are.'
    ],
    sections: [
      { h: 'Country notes to check', items: [
        'United States: each state sets hunting seasons, licences and protected species.',
        'United Kingdom: sources we found give duck and goose seasons of 1 September to 31 January inland and to 20 February on the foreshore. They disagree on some dates and differ for Northern Ireland. They also say no shooting after dark, and that lead shot is not allowed for wildfowl. Check GOV.UK for the current rules.',
        'Portugal: we found no hunting rules. DGRM lists all seabirds as protected from capture in recreational fishing. Check the national rules.'
      ] }
    ],
    tip: ['Keep gloves, a thermometer and a dedicated board in your wild food kit.', 'Bury or bin the waste away from camp.'],
    after: ['Wash the board, knife and your hands with soap and safe water.', 'Chill or cook the meat the same day.'],
    sources: [['CDC: hunters and bird flu (cited to us, not checked)', 'https://www.cdc.gov/bird-flu/risk-factors/hunters-and-bird-flu.html'], SAFE[2], ['Shooting UK: dates for UK game shooting seasons (search result)', 'https://www.shootinguk.co.uk/shooting/game-shooting/game-shooting-seasons-32229/'], ['BASC: why the extra 20 days (foreshore season)', 'https://basc.org.uk/why-the-extra-20-days']],
    unconfirmed: [
      PDFNOTE,
      'The 165 F (74 C) poultry temperature and the bird flu warning are from the PDF. We did not open FoodSafety.gov or the CDC page.',
      'The plucking and gutting steps are general preparation steps, not a species-specific game-handling manual.',
      'The UK season dates are from shooting sites. They disagree. One gives 1 February as the end date. We found no GOV.UK page and no licence rules.',
      'We found no Portugal hunting authority page and no US state rules in this search.',
      'We did not look up the lead shot rules. One UK source says lead is illegal for wildfowl.'
    ]
  };

  var crabs = {
    id: 'crabs-shrimp-lobster', area: 'Food', icon: 'waves', difficulty: 'Practical', status: 'partly', checkedOn: '28 Oct 2026',
    title: 'Crabs, shrimp and lobsters: catch, keep, clean and cook',
    intro: 'Check that the species, the place and the season are legal first. Keep crabs and lobsters alive until you cook them. Cook until the flesh is pearly or opaque.',
    first: [
      'Check the species, size, place and season are legal.',
      'Keep crabs and lobsters alive and cool until cooking.',
      'Do not use an animal found dead if you do not know when it died.',
      'Cook fully in a covered pot.'
    ],
    do: [
      'Catch. Check the rules. Use only permitted gear: a hand net, a trap or a baited line. Measure each animal. Check any size, egg-bearing or sex limits. Release small, protected or egg-bearing animals gently. Avoid polluted harbours, drains and restricted areas. Handle claws and sharp shells with care.',
      'Keep them alive. Put crabs and lobsters in a bucket with cool seawater and a damp cloth, in the shade. Do not use an animal found dead if you do not know when it died. For shrimp, use a properly identified species and keep it cold.',
      'Cook in a covered pot. Use a large covered pot on a camp stove or fire pit outdoors. For crab, cook promptly, then separate the body, discard the gills and the digestive organs, and take out the meat. For lobster, use a large pot or steamer, then remove the tail and claw meat and discard the internal organs. There is no one time that is right for every size, so look at the flesh.',
      'Shrimp. Cook in a pot or skillet until the flesh is firm and opaque. Remove the head and shell. If you wish, make a shallow cut along the back and remove the dark digestive thread. Keep cleaned shrimp cold until cooking.'
    ],
    warn: [
      'Properly cooked flesh is pearly or opaque. Time alone does not tell you it is cooked.',
      'Marine toxins are not removed by cooking. Do not collect during a closure or a toxin warning.',
      'Do not collect from sewage outlets, marinas or runoff.',
      'Do not cook indoors with charcoal or a stove.'
    ],
    sections: [
      { h: 'Rules to check', items: [
        'Portugal: DGRM sets species restrictions, minimum sizes and closed seasons.',
        'United States and United Kingdom: rules differ by state, region and species. Check the local authority.'
      ] }
    ],
    tip: ['Carry a ruler, a bucket, gloves and a thermometer.', 'Cook the same day.'],
    after: ['Wash tools and hands with soap and safe water.', 'Bin the shells away from camp.'],
    sources: [SAFE[0], SAFE[1], ['DGRM Portugal: licensing of recreational fishing', 'https://dgrm.pt/en/pesca-pl-licenciamento']],
    unconfirmed: [
      PDFNOTE,
      'The "keep crabs and lobsters alive until cooking" advice is attributed to USDA in the PDF. The "pearly or opaque" test is attributed to FDA. We did not open either page.',
      'The steps for catching, separating the crab body and removing the shrimp vein are general kitchen practice. We did not find a source.',
      'We found no UK or US size limits and no Portugal limits. Check with the local authority.'
    ]
  };

  var shell = {
    id: 'shellfish-safe-collect', area: 'Food', icon: 'waves', difficulty: 'Critical', status: 'partly', checkedOn: '28 Oct 2026',
    title: 'Mussels, clams and oysters: only from open areas',
    intro: 'Shellfish can hold toxins and germs that cooking does not remove. Do not collect from a closed or unchecked area. This app cannot show whether an area is open now.',
    first: [
      'Do not collect unless the exact area is officially open today.',
      'Cooking does not remove marine toxins.',
      'Skip any area near sewage, marinas, runoff or an algal bloom.',
      'If you cannot check, do not collect. Eat something else.'
    ],
    do: [
      'Check permission. Confirm that collecting is legal and the exact area is officially open. In Portugal, IPMA publishes bivalve harvesting permissions and closures by production area. They change over time. Open the IPMA page when you have a signal. If you are offline, do not collect.',
      'Check the shells. Confirm the species and the minimum legal size. Collect only live shellfish. Check that each shell is whole. Discard damaged ones. Tap a shell that is open. A live shellfish should close. Rinse off dirt and debris with clean water. Keep them separate from other food until cooking.',
      'Steam. Put live, inspected shellfish in a covered pot that suits steaming. Add enough heat and steam them thoroughly.',
      'Discard. Throw away shells that do not open during cooking. Do not eat any shellfish from a closed or unverified area.'
    ],
    warn: [
      'Harmful algal toxins cannot be seen, smelled or tasted, and cooking does not remove them.',
      'The shells opening is not proof that toxins are absent.',
      'Do not collect near sewage outlets, marinas, runoff or an algal bloom.',
      'Closure status written in this app is not current. Check the official page on the same day.'
    ],
    sections: [
      { h: 'Where to check, as of 28 Oct 2026', items: [
        'Portugal: IPMA bivalve harvesting status page. It separates areas approved for direct eating from areas that need professional purification or processing.',
        'United States: check your state shellfish closures and the CDC page on harmful algal blooms.',
        'United Kingdom: we found no UK source. Check with your local council and the Food Standards Agency.'
      ] }
    ],
    tip: ['Save the IPMA page in your phone before you go.', 'Write the date you checked in your notebook.'],
    after: ['Wash your hands and tools with soap and safe water.', 'Throw the shells away from camp.'],
    sources: [['IPMA Portugal: bivalve harvesting permissions and prohibitions (cited to us, not checked)', 'https://www.ipma.pt/en/bivalves/'], ['CDC: preventing illnesses caused by harmful algal blooms (cited to us, not checked)', 'https://www.cdc.gov/harmful-algal-blooms/prevention/index.html'], SAFE[1]],
    unconfirmed: [
      PDFNOTE,
      'The IPMA closures change over time. This guide is dated 28 Oct 2026 and must never be read as current.',
      'We found no UK shellfish source in our search.',
      'The "tap the shell and it should close" check and the "discard shells that stay closed" rule are the PDF steps. The FDA opening criterion is from the PDF. We did not open the FDA page.',
      'The CDC statement that harmful algal toxins cannot be detected by smell, appearance or taste and are not removed by cooking is from the PDF.'
    ]
  };

  var other = {
    id: 'other-sea-life', area: 'Food', icon: 'waves', difficulty: 'Critical', status: 'partly', checkedOn: '28 Oct 2026',
    title: 'Other sea life: what to leave alone in an emergency',
    intro: 'For unfamiliar sea animals, a list of cleaning steps cannot prove they are safe to eat. Some hazards stay after cooking. Protected species rules also differ by place.',
    first: [
      'Do not eat a sea animal you cannot name.',
      'A cleaning list does not make an animal safe.',
      'Check the rules for protected species.',
      'When unsure, leave it.'
    ],
    do: [
      'Name the animal. Use a local guide, an official list or an experienced local person.',
      'Check that taking it is legal at your place and on this date.',
      'Use the table. If the table says leave it, leave it.',
      'Clean and cook only the kinds the table allows. Cook thoroughly.',
      'Wash your hands, board and knife with soap and safe water.'
    ],
    table: { head: ['Animal', 'Preparation', 'Safety decision'], rows: [
      ['Squid and cuttlefish', 'Remove the organs, ink sac, beak and the clear support. Clean and cook thoroughly.', 'Only when the species and legal harvest are confirmed.'],
      ['Octopus', 'Remove the organs and the beak. Clean and cook thoroughly.', 'Species, capture rules and proper handling are needed.'],
      ['Sea snails', 'Clean and cook only approved edible species.', 'Do not assume every sea snail is edible.'],
      ['Sea urchins', 'Only certain species have edible parts.', 'Needs a sure name and legal check. The spines can hurt.'],
      ['Sea cucumbers', 'Needs species-specific processing.', 'Leave out of an emergency food plan.'],
      ['Pufferfish and unfamiliar reef fish', 'There is no general cleaning method.', 'Do not eat. Not a beginner survival food.']
    ] },
    warn: [
      'Some hazards remain after cooking.',
      'Protected species rules differ by place.',
      'Do not eat pufferfish or reef fish you cannot name.',
      'Spines and stings are a handling hazard.'
    ],
    tip: ['Learn the safe local species before an emergency.', 'Carry gloves.'],
    after: ['Wash tools and hands.', 'Write down what you saw.'],
    sources: [SAFE[1], ['DGRM Portugal: licensing of recreational fishing', 'https://dgrm.pt/en/pesca-pl-licenciamento'], ['CDC MMWR: ciguatera fish poisoning, large predatory reef fish', 'https://www.cdc.gov/mmwr/preview/mmwrhtml/mm5811a3.htm']],
    unconfirmed: [
      PDFNOTE,
      'The table is the PDF table. It is general. It is not a species-by-species edibility list.',
      'We did not find a source on the toxins in sea snails, sea urchins, sea cucumbers or pufferfish in our search.',
      'The PDF says Portugal protects seabirds from recreational fishing capture. We did not open the DGRM page.'
    ]
  };

  var check = {
    id: 'wild-food-field-checklist', area: 'Food', icon: 'check', difficulty: 'Essential', status: 'partly', checkedOn: '28 Oct 2026',
    title: 'Wild food field-safety checklist',
    intro: 'Run through this before you prepare fish, birds, crabs or shellfish. Finishing the list does not prove the food is safe. It helps you notice what you missed.',
    first: [
      'Identify it. Check the law. Check for warnings.',
      'Keep it cool. Keep it clean.',
      'Cook it fully and check with a thermometer.',
      'If anything is unclear, do not eat it.'
    ],
    do: [
      'The species is positively identified.',
      'Harvesting is legal at this exact place and date.',
      'No fish-consumption or shellfish-toxin warning applies.',
      'The animal was handled quickly and has not spoiled.',
      'Clean water, gloves and a clean work surface are ready.',
      'Raw meat and seafood stay apart from cooked food.',
      'The cooking method and fuel are safe outdoors.',
      'A food thermometer confirms the temperature: fish 145 F (63 C), poultry 165 F (74 C).',
      'Leftovers can be kept cold. If they cannot, do not keep them.'
    ],
    warn: [
      'A normal-looking fish or shellfish can still hold toxins or chemicals.',
      'Never cook indoors with a stove or charcoal.',
      'Wash your hands after touching raw food.'
    ],
    tip: ['Copy this list into your notebook.', 'Put the thermometer in your wild food kit.'],
    after: ['Note what went well.', 'Replace used gloves and soap.'],
    sources: [SAFE[0], SAFE[2], SAFE[1]],
    unconfirmed: [PDFNOTE, 'The checklist is the PDF checklist. It is a planning aid, not a safety certificate.', 'The temperatures are from the PDF. We did not open the official pages.']
  };

  var solar = {
    id: 'solar-oven-cooking', area: 'Food', icon: 'sun', difficulty: 'Practical', status: 'partly', checkedOn: '28 Oct 2026',
    title: 'Solar oven cooking: what it can and cannot do',
    intro: 'A solar oven uses sunlight, not fuel. It is slow and depends on the weather. Raw meat, fish and poultry should only be cooked in one that can reach and hold a safe temperature.',
    first: [
      'Use a thermometer. Do not guess.',
      'Fish needs 145 F (63 C). Poultry needs 165 F (74 C).',
      'If it cannot reach the temperature, finish on a stove or fire.',
      'Use it for rice, beans and vegetables on sunny days.'
    ],
    do: [
      'Set the oven in full sun on level ground, away from shade, and aim it at the sun.',
      'Use a dark pot with a lid. Put the thermometer in the food.',
      'Preheat the oven for a short time before you put the food in.',
      'Turn the oven toward the sun every 30 to 60 minutes.',
      'Cook raw fish, meat and poultry only if the thickest part reaches the safe temperature and stays there.',
      'If the sun fades, finish on a camp stove or a fire.',
      'Use oven mitts. Reflectors and the pot can be hot.'
    ],
    warn: [
      'Do not rely on a solar oven for raw animal food on a cloudy day.',
      'Reflectors can hurt your eyes. Do not look at them.',
      'Do not leave raw food in a lukewarm oven.'
    ],
    tip: ['Use it for beans and rice to save fuel.', 'Keep a thermometer with it.'],
    after: ['Let the pot cool before you wash it.', 'Keep reflectors clean.'],
    sources: [SAFE[2]],
    unconfirmed: [
      PDFNOTE,
      'The only claim from the PDF is that a solar oven uses sunlight, heats slowly and depends on the weather, and that raw animal foods need a cooker that reaches and holds a safe temperature.',
      'The set-up steps (dark pot with a lid, preheating, turning toward the sun) are common practice. We did not find a source.',
      'We did not find how hot a given solar oven gets.'
    ]
  };

  if (window.LOAD_CORE && window.LOAD_CORE.guides) {
    [birds, crabs, shell, other, check, solar].forEach(function (g) { g.source = g.sources[0][1]; window.LOAD_CORE.guides.push(g); });
  }
})();
