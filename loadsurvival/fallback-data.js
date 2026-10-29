/* "If you cannot reach it" boxes. For guides that send the reader to a website, an app, a council or a rule book.
   Each box says what to do when no internet, phone or office can be reached. General guidance written for this app, no named source.
   No phone numbers, radio stations or rules are invented here. Only 911 (US) and 112 (Portugal), which are used across the app. */
(function () {
  var T = {
    rules: ['Rules may be out of reach. Pick the careful choice.', [
      'If you do not know the rule, do not guess. Wait, or choose another way that needs no rule.',
      'Ask a neighbour or a local person who has done it before. Ask at the town hall, the council or a ranger or park office when you can reach it.',
      'Take only what you need. Leave protected animals, plants and closed areas alone.',
      'Write down what you decided and why, with the date.',
      'If your life is in danger and no one can be reached, protect life first. Then tell an official when you can.'
    ]],
    shell: ['The closure list may be out of reach. Treat the shellfish as unsafe.', [
      'If you cannot check that the area is open, do not eat the shellfish. Use other food.',
      'Cooking does not make poisoned shellfish safe. Freezing does not either.',
      'Shellfish that look and smell fine can still be poisonous.',
      'Ask a local who gathers there, or the harbour or fishing office, when you can reach them.',
      'If someone feels ill after eating shellfish, call 911 (US) or 112 (Portugal).'
    ]],
    alertsPt: ['If the phone, internet or app is down (Portugal)', [
      'Danger to life: call 112.',
      'Turn on a battery or car radio and tune to local radio. Listen for warnings.',
      'Go to the fire station (bombeiros), the town hall (câmara municipal) or the parish office (junta de freguesia) and ask. Ask neighbours.',
      'This app cannot hold local numbers we have not checked. Write on paper now: your council number, the nearest fire station and the nearest hospital.',
      'Put the paper in your go-bag and tape a copy inside the front door.'
    ]],
    alertsUs: ['If the phone, internet or app is down (United States)', [
      'Danger to life: call 911.',
      'Turn on a battery or car radio, or a battery weather radio, for warnings.',
      'Go to the nearest fire station or city hall and ask. Ask neighbours.',
      'This app cannot hold local numbers we have not checked. Write on paper now: your city or county emergency office number, the nearest fire station and the nearest hospital.',
      'Put the paper in your go-bag and tape a copy inside the front door.'
    ]],
    alertsBoth: ['If the phone, internet or app is down', [
      'Danger to life: call 911 (US) or 112 (Portugal).',
      'Turn on a battery or car radio, or a battery weather radio, for warnings.',
      'Go to the nearest fire station (bombeiros in Portugal), the town hall or city hall, and ask. Ask neighbours.',
      'This app cannot hold local numbers we have not checked. Write on paper now: your council or county emergency number, the nearest fire station and the nearest hospital.',
      'Put the paper in your go-bag and tape a copy inside the front door.'
    ]],
    maps: ['If you did not download maps or the phone is dead', [
      'Ask for a paper map at a petrol station, a tourist office, a shop or a town hall.',
      'Draw your own map on paper: home, two ways out, two meeting places, the nearest hospital, fire station and shop.',
      'Learn the landmarks on each route. The sun rises in the east and sets in the west. Use road signs and river directions.',
      'Make a paper copy while you still have power: Tools, then Download and print, then print the pack for your place.',
      'Keep a paper map and a compass in the go-bag.'
    ]],
    lib: ['If you have no internet now', [
      'Downloads need internet and space. Do them early, on Wi-Fi, with the device plugged in.',
      'This app already holds first aid, water, power, food, shelter and place guides. They work offline.',
      'Save them as files: Tools, then Download and print. Pick a pack, then Download zip. Save it to Files. It opens with no internet and no app.',
      'Print the packs you need most. Keep a copy on paper and on a second device.'
    ]],
    news: ['If no official source can be reached', [
      'Use a battery radio for local news. Do not rely on social media.',
      'Do not repeat a rumour. Wait for two independent sources that agree before you act on news.',
      'If danger is close and no one is giving directions (smoke, fire, rising water, strong shaking), act on what you can see. Move to safer ground by the route you planned.',
      'Tell your check-in person where you are going.',
      'Danger to life: call 911 (US) or 112 (Portugal) if the phone works.'
    ]],
    sani: ['If you cannot reach anyone about waste', [
      'Put waste in strong bags. Seal them and store them outside, away from living and cooking areas, in a covered container.',
      'Keep waste away from wells, streams, floodwater and the places you collect water.',
      'If you must bury it, dig a hole at least 30 cm (1 foot) deep, far from wells, streams and gardens.',
      'Wash your hands with soap and clean water after. Use hand sanitiser if there is no water.',
      'When services return, follow the local rules for collection.'
    ]],
    food: ['If you cannot check a food safety chart', [
      'Fridge: discard perishable food that has been above 4 C (40 F) for more than 2 hours. When in doubt, throw it out.',
      'Do not taste food to test it.',
      'Keep fridge and freezer doors closed. Use the Fridge and freezer timer in Tools.',
      'Eat the food that spoils first. Keep canned and dry food for later.'
    ]],
    frost: ['If you cannot look up your zone or dates', [
      'Ask neighbours who garden for the usual first and last frost dates.',
      'Plant hardy crops first. Wait until the cold has clearly passed for tender plants.',
      'Watch the local weather and cover young plants on cold nights.',
      'Write down your own dates each year. Your notes become your best guide.'
    ]],
    air: ['If you cannot check the forecast or air quality', [
      'Use your senses. If you can see or smell smoke, treat the air as unhealthy and stay in the clean room.',
      'Use a battery radio for weather. Watch the sky and the wind.',
      'Keep a room thermometer. Write down the readings so you can see a trend.',
      'Danger to life: call 911 (US) or 112 (Portugal).'
    ]]
  };
  var FB = {};
  function put(ids, key) { ids.forEach(function (id) { FB[id] = { h: 'If you cannot reach it', lead: T[key][0], items: T[key][1] }; }); }
  put(['water-rain', 'wx-rain', 'lt-fishing', 'lt-permanent-water', 'ex-river-hydro', 'lt2-livestock', 'lt2-pt-food', 'lt2-pt-energy', 'budget-offgrid', 'wf-fire-wet', 'wf-fishing-gear', 'wf-wild-food-rules', 'wild-birds-prep', 'crabs-shrimp-lobster', 'other-sea-life', 'wf-pt-words'], 'rules');
  put(['wf-shore-shellfish', 'shellfish-safe-collect'], 'shell');
  put(['place-pt-lisboa', 'place-pt-porto', 'place-pt-coimbra', 'place-pt-setubal'], 'alertsPt');
  put(['place-ca-losangeles', 'place-ca-sanpedro', 'place-ca-palmdale', 'place-ca-valencia', 'place-fl-jacksonville', 'place-fl-orlando', 'place-sc-conway', 'place-oh-ohio'], 'alertsUs');
  put(['es-radios-alerts', 'lim-comms'], 'alertsBoth');
  put(['comms', 'p6-offline-maps-and-wayfinding', 'foundation-communication', 'foundation-navigation', 'ht-family-plan'], 'maps');
  put(['med-library', 'ex-offline-library', 'ex-offline-skills'], 'lib');
  put(['evac', 'lim-city-event', 'lim-stay-safe', 'sc-war', 'g-group-calm', 'security-scam'], 'news');
  put(['water-sanitation', 'p6-sanitation-when-toilets-fail', 'lim-sanitation', 'sc-volcano', 'lt-sanitation'], 'sani');
  put(['food'], 'food');
  put(['lt2-us'], 'frost');
  put(['scn-smoke-clean-room', 'hh-weather-home'], 'air');
  FB['lim-food-none'] = { h: 'If you cannot reach it', lead: 'Rules may be out of reach. Protect life first.', items: [
    'In normal times, follow the fishing and gathering rules. If no food is left and no one can be reached, take only what you need to stay alive.',
    'Leave protected animals, plants and closed areas alone. Do not eat shellfish you cannot confirm are open.',
    'Ask a local person or an official as soon as you can reach one.',
    'Write down what you took and when.'
  ] };
  /* The Portugal place guides also point to alerts by phone app. The US wording says 911; Portugal says 112. */
  window.LOAD_FALLBACK = FB;
})();
