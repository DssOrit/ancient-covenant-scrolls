/* Daily life in an emergency: staying warm (2), hygiene and hair care (5), glasses and eyesight (2), and scenarios (3). 12 guides.
   Written 29 Oct 2026 from search results. The official pages could not be opened from where this was written, so every guide is Partly checked.
   Steps without a named source are marked general guidance in the Not confirmed list. This is not medical advice. */
(function () {
  var NOTE = 'We read search results about these pages. We could not open the pages themselves, so they are cited to us, not checked by us.';
  var SRC = {
    cdcHyg: ['CDC: guidelines for personal hygiene during an emergency, cited to us, not checked', 'https://www.cdc.gov/water-emergency/safety/guidelines-for-personal-hygiene-during-an-emergency.html'],
    cdcHands: ['CDC: wash your hands factsheet for disasters, cited to us, not checked', 'https://www.cdc.gov/natural-disasters/communication-resources/wash-your-hands-factsheet.html'],
    cdcBoil: ['CDC: boil water advisory, cited to us, not checked', 'https://www.cdc.gov/natural-disasters/psa-toolkit/boil-water-advisory.html'],
    cdcCrypto: ['CDC: preventing Crypto at home during a boil water advisory, cited to us, not checked', 'https://www.cdc.gov/cryptosporidium/prevention/crypto-home-boil-water.html'],
    cdcSafeWater: ['CDC: use safe water during an emergency (one-pager), cited to us, not checked', 'https://www.cdc.gov/water-emergency/media/pdfs/334749-B_UseSafeWater-OnePager-508.pdf'],
    ifrcMhm: ['IFRC: menstrual hygiene management guidelines (PDF), cited to us, not checked', 'https://wash.ifrc.org/wp-content/uploads/2025/01/mhm-guidelines-v7.pdf'],
    unicefMh: ['UNICEF: menstrual hygiene, cited to us, not checked', 'https://www.unicef.org/supply/topics/menstrual-hygiene'],
    cdcPregSafety: ['CDC: safety messages for pregnant, postpartum and breastfeeding women in disasters, cited to us, not checked', 'https://www.cdc.gov/reproductive-health/emergency-preparation-response/safety-messages.html'],
    aaoEvac: ['American Academy of Ophthalmology: make eyeglasses and medication part of your evacuation checklist, cited to us, not checked', 'https://www.aao.org/eye-health/tips-prevention/eyeglasses-medication-evacuation-checklist'],
    aaoRx: ['American Academy of Ophthalmology: can my glasses be read for my prescription, cited to us, not checked', 'https://www.aao.org/eye-health/ask-ophthalmologist-q/is-it-possible-that-my-glasses-can-be-read-my-pres'],
    aaoPlan: ['American Academy of Ophthalmology EyeNet: why ophthalmologists should plan for disaster, cited to us, not checked', 'https://www.aao.org/eyenet/article/trauma-disaster-planning'],
    readyKit: ['Ready.gov: build a kit, cited to us, not checked', 'https://www.ready.gov/kit'],
    neiLow: ['National Eye Institute: free or low-cost eye care (US), cited to us, not checked', 'https://www.nei.nih.gov/eye-health-information/healthy-vision/finding-eye-doctor/get-free-or-low-cost-eye-care'],
    airnow: ['AirNow: be smoke ready, cited to us, not checked', 'https://www.airnow.gov/wildfires/be-smoke-ready/'],
    airnowFilter: ['AirNow: indoor air filtration factsheet (PDF), cited to us, not checked', 'https://www.airnow.gov/sites/default/files/2021-07/indoor-air-filtration-factsheet.pdf'],
    epaDiy: ['EPA: research on DIY air cleaners to reduce wildfire smoke indoors, cited to us, not checked', 'https://www.epa.gov/air-research/research-diy-air-cleaners-reduce-wildfire-smoke-indoors'],
    cdcWinter: ['CDC: safety guidelines during and after a winter storm, cited to us, not checked', 'https://www.cdc.gov/winter-weather/safety/stay-safe-during-after-a-winter-storm-safety.html'],
    cdcCO: ['CDC: prevent carbon monoxide poisoning, cited to us, not checked', 'https://www.cdc.gov/natural-disasters/psa-toolkit/prevent-carbon-monoxide-poisoning.html'],
    cpscGen: ['CPSC: what to know about generators and carbon monoxide (PDF), cited to us, not checked', 'https://www.cpsc.gov/s3fs-public/468-WhattoKnowGenerators_2022.pdf'],
    nhsHypo: ['NHS: hypothermia, cited to us, not checked', 'https://www.nhs.uk/conditions/hypothermia/'],
    dgsCold: ['Observador: DGS recommends measures to prevent the effects of cold (news report, 2021), cited to us, not checked', 'https://observador.pt/2021/01/06/dgs-recomenda-medidas-para-prevenir-efeitos-do-frio-e-admite-repercussoes-na-mortalidade/'],
    readyOlder: ['Ready.gov: disaster preparedness guide for older adults (PDF), cited to us, not checked', 'https://www.ready.gov/sites/default/files/2023-09/ready-gov_disaster-preparedness-guide-for-older-adults.pdf']
  };
  var G = [];
  function add(g) { g.checkedOn = '29 Oct 2026'; g.status = 'partly'; g.difficulty = g.difficulty || 'Practical'; g.source = g.sources[0][1]; G.push(g); }
  var GEN = 'The steps marked as general guidance, and the tips, are common practice. We did not find a named source for them.';

  /* ---------- STAYING WARM ---------- */
  add({ id: 'warm-one-room', area: 'Shelter • Staying warm', icon: 'snow',
    title: 'Stay warm when the heat goes out: one warm room',
    intro: 'If the power goes out in winter, keep everyone warm in one small room. You do not need to heat the whole house. This works for a family and for pets. Not medical advice.',
    first: [
      'Pick one small room with few windows. Move everyone there, pets too. Shut the other doors.',
      'Put on layers, a hat and wool socks. Change wet clothes at once.',
      'Block drafts under doors with rolled towels. Cover windows at night with blankets or thick curtains. Keep cloth away from heaters and flames.',
      'Never burn anything for heat in a closed room. Carbon monoxide kills with no smell. Fit battery carbon monoxide alarms.'
    ],
    do: [
      'Put rugs or foam mats on cold floors. Move sleeping bags, blankets, pillows, water and lights into the room.',
      'Three layers: a dry base layer, a fleece or wool middle layer, and a warm outer layer. Several loose layers beat one tight one.',
      'Sleeping: put a mat or thick mattress under each person. The floor pulls heat out. Use a sleeping bag or layers of dry blankets. Cover shoulders and neck. Keep the nose and mouth free.',
      'Share body heat. Keep dogs and people close. Give pets a bed off the cold floor and a dry blanket.',
      'Eat and drink. Food makes body heat. Warm drinks help if you can heat water safely. Skip alcohol.',
      'Open curtains in the sun to let in free heat. Close them at night.',
      'Keep a room thermometer. Check each person every hour at night, especially children and older people.',
      'Older people lose heat faster and may not feel it. Give the older person the warmest bed spot, extra blankets, a hat and socks.',
      'If you use a hot water bottle, wrap it in cloth and keep it away from anyone who may have hypothermia.',
      'Plan where you will go if the house keeps getting colder. See the leave-the-house note below.'
    ],
    warn: [
      'Signs of hypothermia: shivering that is severe or that stops, confusion or sleepiness, slurred speech, clumsy movement, slow breathing, pale cold skin. Call the emergency number.',
      'While you wait for help: move to shelter, take off wet clothes, wrap in dry blankets with the head covered. If awake, give a warm sweet non-alcoholic drink. Do not rub the arms and legs. Do not give alcohol. Do not use a hot bath, hot water bottle or heat lamp on the person.',
      'Leave the house for a heated home, hotel or shelter if it keeps getting colder and someone cannot get warm, if anyone is old or ill, or if someone needs powered medical equipment.',
      'Headache, dizziness or nausea, or an alarm: go outside into fresh air and call the emergency number. It can be carbon monoxide.'
    ],
    tip: ['Fill a thermos with hot water before the power goes. It keeps you drinking warm fluids with no power.', 'Keep sleeping bags, mats, wool socks and hats together in one box.'],
    after: ['Warm up slowly. Tell a doctor about any signs of hypothermia. Check pipes and pets.'],
    sources: [SRC.cdcWinter, SRC.nhsHypo, SRC.cdcCO, SRC.dgsCold, SRC.readyOlder],
    unconfirmed: [NOTE,
      'Never use a gas oven, grill, camp stove or generator indoors, and fit battery carbon monoxide alarms, match CDC text quoted to us.',
      'The hypothermia signs and the steps while waiting for help, including no rubbing, no alcohol and no hot bath or hot water bottle, match NHS text quoted to us. The hot bath and hot water bottle warning came from an NHS 111 Wales page quoted to us, not the main NHS page.',
      'Closing rooms, blocking drafts, covering windows at night and layers match what we saw quoted from a CDC winter storm page. We did not open that page.',
      'Portugal: layers, hat and gloves, and care for older people match DGS advice as reported in the news.',
      GEN + ' This includes the sleeping mat, the thermos and the leave-the-house list.'] });

  add({ id: 'warm-safe-heat', area: 'Shelter • Staying warm', icon: 'flame',
    title: 'Safe heat and unsafe heat when the power is out',
    intro: 'Some heat sources are safe if made for the job. Some kill. This page tells them apart.',
    first: [
      'Safe if made for indoor use and fitted right: a professionally fitted wood stove, a heater on a generator or power system big enough, a heat pump on backup power.',
      'Never indoors, never in a garage, never in a tent: a gas oven or hob, a barbecue or charcoal brazier, a camp stove, a candle heater, a generator.',
      'Run a generator outdoors, at least 20 ft (6 m) from windows, doors and vents, with the exhaust pointed away. Opening a window does not make it safe.',
      'Fit battery carbon monoxide alarms near every sleeping area. Test them.'
    ],
    do: [
      'Wood stove: needs a proper chimney and fresh air. Have it inspected and cleaned. Keep a window slightly open when burning, as Portuguese authorities advise for fires and braziers. Put embers out before you sleep.',
      'Electric heater: it uses a lot of power. A small power station may run one only briefly. Keep it at least 3 ft (1 m) from anything that burns. Plug it straight into the wall or the power station.',
      'Heat pump or split unit: needs backup power that can carry its real watts. Check the label.',
      'Generator: let it cool before refuelling. Keep fuel in labelled non-glass containers away from heaters. Never plug it into a wall outlet. Have an electrician fit a transfer switch.',
      'Do not use outdoor heaters, braziers or grills indoors, even for a short time.',
      'Do not sleep next to a heater. Before bed, turn off every heater and check the stove.',
      'Candles: use battery lanterns instead. Never leave a flame alone.',
      'Dogs and children: keep them back from hot stoves and heaters.',
      'See the power supplies guides for batteries, solar and generators.'
    ],
    warn: [
      'Carbon monoxide has no smell and can kill in minutes. Never use a fuel-burning device in a closed space.',
      'In Portugal, news reports from 2026 describe people who died or were poisoned by generators used inside houses, cellars and garages.',
      'A blocked chimney pushes poisonous gas back into the home.'
    ],
    tip: ['Test carbon monoxide alarms every month and keep spare batteries.', 'Keep a fire extinguisher in the kitchen.'],
    after: ['Have heaters and chimneys checked each autumn.'],
    sources: [SRC.cpscGen, SRC.cdcCO, SRC.cdcWinter, SRC.dgsCold],
    unconfirmed: [NOTE,
      'Generators outdoors, 20 ft from the home, opening windows not enough, no plugging into a wall outlet and the transfer switch match CPSC text quoted to us.',
      'Window ajar for fireplaces and braziers, cleaning chimneys and putting out embers match GNR advice quoted in a news summary.',
      'The 3 ft (1 m) distance from combustibles was quoted to us from a CDC page. We did not open it.',
      'The Portugal poisonings come from news reports of 2026.',
      GEN] });

  /* ---------- HYGIENE ---------- */
  add({ id: 'hyg-body-hair', area: 'Home skills • Hygiene', icon: 'soap',
    title: 'Hygiene in an emergency: wash your body, hair and face with little water',
    intro: 'Staying clean prevents infections and keeps morale up. You can do it with very little water. Treat water for drinking first.',
    first: [
      'Drinking and cooking come first. Use leftover or non-drinking water for washing.',
      'Wash your hands often. This matters more than a full bath.',
      'Do a sponge bath with a basin, a cloth and a little soap. Wash the face, armpits, groin and feet.',
      'Follow local advice about whether tap water is safe for bathing. Water that is not safe to drink can sometimes be used for bathing, but do not swallow it or get it in your eyes.'
    ],
    do: [
      'Sponge bath: wet a cloth with warm water, lather a little soap, wash one body part at a time, rinse with a second cloth, dry well.',
      'For babies and young children, a sponge bath lowers the chance of swallowing water.',
      'Hair: brush or comb it daily. Rinse with a jug over a basin, using a little shampoo. Use as little water as you can.',
      'No water at all: brush the hair, rub a little cornstarch or baby powder into oily roots, and brush it out. Wear a clean hat or scarf.',
      'Keep the scalp dry and clean. Tie long hair up. Keep hair short if the emergency is long.',
      'Face and eyes: wipe with a clean damp cloth. Do not use unsafe water near the eyes or mouth.',
      'Wet wipes are useful for hands, face and body, but do not flush them. They block toilets. Put them in a bag.',
      'Change underwear and socks every day if you can. Dry clothes in the sun.',
      'Wash cloths and towels in hot soapy water when you can. Dry them fully.',
      'Skin: keep skin dry in folds and between toes. Use a clean dry cloth. Watch for rashes and tell a pharmacist or doctor if they spread.',
      'Keep one set of clean clothes for sleeping.'
    ],
    warn: [
      'Do not wash wounds or eyes with water you are not sure about. Use clean or boiled and cooled water.',
      'Do not share towels, razors, combs or toothbrushes.',
      'Stop and get help if you have a fever, pus, spreading redness or a rash with fever.'
    ],
    tip: ['Keep a basin, two cloths, soap, a jug and a towel together in a box.', 'Warm the wash water in the sun or on a stove outdoors.'],
    after: ['Wash all cloths and basins with soap and let them dry in the sun.'],
    sources: [SRC.cdcHyg, SRC.cdcHands, SRC.cdcSafeWater],
    unconfirmed: [NOTE,
      'Follow local advice on bathing, do not swallow the water, and use a sponge bath for babies, match CDC text quoted to us.',
      'Hair care with little or no water (cornstarch, brushing, a jug rinse), the skin tips and the order of washing are general guidance. We searched for a named source on hair washing in emergencies and did not find one.',
      GEN] });

  add({ id: 'hyg-hands-teeth-feet', area: 'Home skills • Hygiene', icon: 'hand',
    title: 'Hands, teeth, feet and nails in an emergency',
    intro: 'Clean hands stop most stomach illness. Teeth and feet need care too. Small problems get big in a long emergency.',
    first: [
      'Wash hands with soap and water for at least 20 seconds. Do it after the toilet, before eating and before touching food.',
      'If you have no soap, use a hand sanitizer with at least 60% alcohol. It does not kill every germ, so soap and water are better.',
      'Set up a handwashing station: a large water jug with a tap or a small hole, soap and a bucket.',
      'Brush your teeth twice a day. In a boil water or do not drink notice, use bottled or boiled and cooled water.'
    ],
    do: [
      'Handwashing station: hang or place a jug, let a little water run over the hands, soap, scrub, rinse, dry on a clean cloth or let them air dry.',
      'Teeth: use a soft brush and a small amount of toothpaste. Spit, do not rinse with tap water you are unsure about.',
      'No water: brush dry, or use a clean damp cloth over the teeth. Floss if you have it.',
      'Do not share toothbrushes. Keep each in its own cup, bristles up and dry.',
      'Feet: wash and dry them every day, especially between the toes. Change socks daily. Wool socks keep feet warm when damp.',
      'Check feet for blisters, cuts and sores each day. Cover blisters with a clean dressing. People with diabetes should check feet very carefully.',
      'Nails: keep them short and clean. Trim with clean clippers.',
      'Wipe phones, door handles and shared things with soap and a damp cloth when you can.',
      'Cover coughs and sneezes. Stay away from others if you are ill.',
      'Dental pain or swelling with fever needs a dentist or doctor. Keep a small dental kit: floss, toothpicks, temporary filling material.'
    ],
    warn: [
      'Alcohol hand rub does not kill Cryptosporidium, a germ in some water. In a boil water advisory use soap and water.',
      'Do not swallow water that may be unsafe.',
      'A swollen face or a high fever with a toothache is an emergency.'
    ],
    tip: ['Keep soap by every sink and by the toilet bucket.', 'Pack a spare toothbrush for each person.'],
    after: ['Wash the brush and station. Let them air dry.'],
    sources: [SRC.cdcHands, SRC.cdcHyg, SRC.cdcCrypto, SRC.cdcBoil],
    unconfirmed: [NOTE,
      'At least 20 seconds with soap and water, sanitizer with at least 60% alcohol, and a temporary handwashing station from a large jug match CDC text quoted to us.',
      'Brush teeth with boiled or bottled water in a boil water advisory, and alcohol sanitizer does not kill Cryptosporidium, match CDC text quoted to us.',
      'The foot, nail and tooth care tips are general guidance. We did not find a named source on them in an emergency.',
      GEN] });

  add({ id: 'hyg-period-incontinence', area: 'Home skills • Hygiene', icon: 'heart',
    title: 'Periods, incontinence and baby care when supplies run short',
    intro: 'Periods and bladder problems do not stop in an emergency. Plan for them. Everyone needs privacy and dignity.',
    first: [
      'Pack your own supply of pads, tampons or liners. Products may not be available when you need them.',
      'Pack incontinence pads and wipes for anyone who uses them. Add 15 percent more than usual use.',
      'Keep a small bag for used products. Do not flush pads, wipes or diapers. They block toilets.',
      'Wash your hands after every change.'
    ],
    do: [
      'Period kit: pads or tampons for the days you expect, spare underwear, wipes, a small waterproof bag for used items, a clean cloth, soap and pain relief you can use.',
      'Plan the number. A cycle may last several days. The master stockpile list gives a starting number.',
      'Change often. Wash your hands before and after. Wash and dry the skin gently.',
      'Reusable pads: wash with soap and water, dry fully in the sun. Keep one clean set.',
      'Menstrual cup: it is emptied, rinsed and put back every 6 to 12 hours, and boiled for 5 to 10 minutes at the end of each cycle, per a UNICEF product page. That needs water and fuel, so it may be hard in a long emergency.',
      'Privacy: set up a private space and a bucket with a lid and a bag for disposal.',
      'Incontinence: change pads quickly, wash and dry the skin, use a barrier cream, and check for sores. Keep waterproof sheets.',
      'Babies: change diapers often. Wash the skin with a damp cloth and let it dry. Keep a spare set of clothes. Use a sponge bath if water is unsafe.',
      'Toddlers: keep a potty with a lid and a bag.',
      'Pregnant or after birth: see the pregnancy guides. Heavy bleeding is an emergency.'
    ],
    warn: [
      'Soaking one or more pads in an hour, or sudden severe pain, is an emergency.',
      'Fever, a bad smell, or pain when passing urine can mean infection. Get medical help.',
      'Do not reuse a disposable product.'
    ],
    tip: ['Ask a friend or neighbour who can help with supplies. Share.', 'A menstrual cup, a few reusable pads and a bucket with lid make a small low-water kit.'],
    after: ['Replace supplies. Wash reusable items and dry them in the sun.'],
    sources: [SRC.cdcPregSafety, SRC.ifrcMhm, SRC.unicefMh, SRC.cdcHyg],
    unconfirmed: [NOTE,
      'Packing your own supply because products may not be available matches CDC text quoted to us. The IFRC says menstrual products become harder to get in disasters and includes washing, drying, disposal and storage items in its kits.',
      'The menstrual cup figures (empty and rinse every 6 to 12 hours, boil 5 to 10 minutes at the end of each cycle) came from a UNICEF product page quoted to us. They are not a field study.',
      'The incontinence supply of 15 percent extra is from the older adult guide in this app. We did not find a named source.',
      GEN] });

  add({ id: 'hyg-laundry-clean', area: 'Home skills • Hygiene', icon: 'jar',
    title: 'Laundry, dishes and cleaning with little water',
    intro: 'Dirty cloths and dishes spread illness. You can clean well with a basin, soap and sun.',
    first: [
      'Use disposable plates, cups and cutlery if you can. It saves water.',
      'If you wash dishes by hand: wash in hot soapy water, rinse, then soak for 1 minute in a bleach mix, then air dry.',
      'Bleach mix for dishes: 1 teaspoon of plain unscented household bleach in 1 gallon (about 4 litres) of warm water.',
      'Wash clothes by hand in a basin. Dry them in the sun.'
    ],
    do: [
      'Dishes: scrape first. Use three basins if you can: wash, rinse, sanitize. Air dry on a clean rack. Do not wipe with a towel.',
      'Baby bottles: wash with soap, rinse and sanitize in boiled water or the bleach mix.',
      'Clothes: soak in a basin with a little soap, rub, rinse in a second basin, wring and hang in the sun. Sun helps dry and freshen.',
      'Use less water: wash small loads, use the rinse water to flush a bucket toilet.',
      'Bedding: air it in the sun. Wash the pillowcase and sheet most often.',
      'Surfaces: wipe tables and handles with soap and water. For raw meat or sick people, use a bleach wipe mix.',
      'Waste: bag it, tie it, keep it away from food and animals.',
      'After floods, see the safe cleanup guide. Wear gloves, boots and a mask.'
    ],
    warn: [
      'Never mix bleach with ammonia or other cleaners. It makes poison gas.',
      'Use plain unscented bleach only.',
      'Wear gloves and keep bleach away from children and pets.'
    ],
    tip: ['Keep a bucket, a cloth and a bar of soap in the kitchen box.', 'Store extra bin bags and gloves.'],
    after: ['Let basins dry in the sun. Wash hands.'],
    sources: [SRC.cdcBoil, SRC.cdcHyg],
    unconfirmed: [NOTE,
      'Disposable tableware where possible, hot soapy wash and rinse, a 1 minute soak in 1 teaspoon of unscented bleach per gallon of warm water, and air drying match CDC text quoted to us.',
      'The laundry method, the three-basin setup and the surface cleaning tips are general guidance. We did not find a named source.',
      GEN] });

  add({ id: 'scn-boil-notice', area: 'Scenarios • Water', icon: 'drop',
    title: 'Boil water notice at home: what to do each day',
    intro: 'A boil water notice means the tap water may carry germs. Follow your local officials, because they decide the advice for your area.',
    first: [
      'Do not drink untreated tap water. Use bottled water, or boil tap water at a full rolling boil for 1 minute. Above 6,500 ft (2,000 m) boil for 3 minutes. Let it cool.',
      'Boil water even if you filter it. Boiling does not remove chemicals.',
      'Do not use ice or water from the fridge dispenser.',
      'If you feed a baby with formula, use ready-to-feed formula if you can. If you must use powder, mix it with bottled or boiled water.'
    ],
    do: [
      'Use boiled or bottled water for drinking, cooking, making ice and brushing teeth.',
      'Hand washing: soap and tap water is usually fine. Scrub 20 seconds. Alcohol gel does not kill Cryptosporidium.',
      'Dishes: use disposable ones if you can. A dishwasher is fine with a sanitizing cycle or a final rinse of at least 150 F (66 C). By hand: wash, rinse, soak 1 minute in 1 teaspoon of unscented bleach per gallon of warm water, then air dry.',
      'Showers and baths: ask local officials. Avoid swallowing water. Give babies a sponge bath.',
      'Pets: give them boiled and cooled or bottled water.',
      'Boil a big pot each morning and store it in clean covered containers in the fridge.',
      'After the notice ends: run taps, flush and clean appliances as local officials advise. Throw out ice.'
    ],
    warn: [
      'A notice that says do not drink or do not use is stricter. Follow it.',
      'Diarrhoea, vomiting or fever after drinking untreated water needs medical advice. Older people, babies and pregnant women are at higher risk.',
      'Do not use bleach or boiling to make water with chemicals safe.'
    ],
    tip: ['Keep a few litres of bottled water in the cupboard for the first day.', 'See the boil and filter water guide and the water guides in this app.'],
    after: ['Follow the officials all-clear instructions. Replace water filters if advised.'],
    sources: [SRC.cdcBoil, SRC.cdcCrypto, SRC.cdcSafeWater],
    unconfirmed: [NOTE,
      'Boil 1 minute (3 minutes above 6,500 ft), use boiled or bottled water for drinking, cooking and brushing teeth, formula advice, no fridge ice, hand washing with soap, and the dish advice match CDC text quoted to us.',
      'We did not find a named source for the pets and the boil-a-big-pot tips.',
      'In Portugal and elsewhere the rules and agencies differ. Follow your local water authority.'] });

  /* ---------- GLASSES ---------- */
  add({ id: 'vis-glasses-kit', area: 'Medical • Vision', icon: 'camera',
    title: 'Glasses and contacts: keep a spare and plan for loss',
    intro: 'Losing glasses is a common problem after disasters. Without them you may not read signs, medicine labels or maps, and you may fall.',
    first: [
      'Keep a spare pair of glasses or readers in your go-bag and a second spare at home.',
      'Keep a copy of your prescription, on paper and as a photo on your phone.',
      'If you wear contacts, keep spare lenses, solution and a case, and a pair of glasses as a backup.',
      'Put your glasses on the same place every night, in a case, near your bed.'
    ],
    do: [
      'Make a small vision kit: spare glasses, case, cloth, repair screws and a tiny screwdriver, a strap or cord, a magnifier, contact lens supplies, eye drops, and a copy of the prescription.',
      'Test your spare pair. Make sure the prescription is not out of date.',
      'Photograph the front of your glasses and the prescription card. Store the photo with your papers.',
      'An optician or eye doctor can read the prescription from your old glasses with a machine, so an old pair is useful.',
      'Keep a pair of cheap reading glasses in the car and the kitchen box if you need readers.',
      'Medicines and eye drops: pack enough to last until you see a doctor.',
      'Ask your eye doctor what to do if you lose your lenses in a disaster. Ask about a spare supply.',
      'Mark your glasses case with your name and phone number.',
      'In the US, free or low-cost eye care and vouchers for new glasses exist for some people. Ask the National Eye Institute list or a local charity. In Portugal, ask an optician or the SNS.',
      'Safety: do not drive or climb stairs in the dark without your glasses.'
    ],
    warn: [
      'Do not sleep in contact lenses in an emergency unless your doctor says it is safe. Eye infections are serious.',
      'A sudden loss of sight, eye pain, or flashing lights is an emergency.',
      'Do not share glasses or lenses.'
    ],
    tip: ['Store a spare in a hard case so it does not break in the bag.', 'Replace the spare when your prescription changes.'],
    after: ['After an emergency, book an eye exam if your glasses were damaged or you had eye strain or headaches.'],
    sources: [SRC.aaoEvac, SRC.aaoRx, SRC.aaoPlan, SRC.readyKit, SRC.neiLow],
    unconfirmed: [NOTE,
      'A spare pair of glasses or readers in the emergency bag, and enough medication until you can see a doctor, match an American Academy of Ophthalmology page quoted to us (dated 2018).',
      'Ready.gov lists prescription eyeglasses and contact lens supplies as things to add to a kit, per a search summary.',
      'An eye doctor or optical shop can read the prescription from existing glasses with a device. This is from an AAO answer quoted to us (dated 2017).',
      'Loss of glasses and contacts was described as the second-biggest problem for hurricane evacuees in an AAO EyeNet article quoted to us. We did not open it.',
      'New Eyes vouchers and free or low-cost eye care are from a National Eye Institute page quoted to us. They apply to the US only. We did not find a Portugal source.',
      GEN] });

  add({ id: 'vis-lost-glasses', area: 'Medical • Vision', icon: 'camera',
    title: 'If you lose or break your glasses: what to do now',
    intro: 'Stay calm. Make the area safe, find a way to see well enough, and plan a replacement.',
    first: [
      'Stop moving. Feel the floor around you. Do not step on glasses. Ask someone to look.',
      'Use your spare pair if you have one.',
      'If you have no spare, stay where it is safe. Do not drive or climb.',
      'Ask someone you trust to help you. Say you cannot see clearly.'
    ],
    do: [
      'Check the last places: pockets, bed, bag, near water, the floor. Use a flashlight low to the ground.',
      'Broken frame: tape a small piece of tape over a loose hinge or arm. Tie a string behind the head if an arm is gone. This is a temporary fix.',
      'Loose screw: a tiny screwdriver fixes it. A sewing kit or the repair kit may have one.',
      'To see better for a short time: a small pinhole in a card held close to the eye can sharpen blurred sight for reading. Use only for a short time.',
      'Use your phone camera zoom to read small print. Turn up text size. Use a magnifier.',
      'Cheap reading glasses from a pharmacy can help if you are long-sighted. They do not correct everything.',
      'Replacement: ask an optician with a copy of your prescription or a photo of it. An optician can read the prescription from an old pair of glasses.',
      'In a disaster ask the local emergency services, a shelter or a hospital for help getting glasses.',
      'Contacts: if you lose lenses, use your backup glasses. Do not use old contacts.',
      'Tell people around you so they can help you move and read.'
    ],
    warn: [
      'Do not drive without the correct glasses.',
      'A sudden loss of sight, eye pain, or flashing lights is an emergency. Call the emergency number.',
      'Do not use a pinhole trick while walking or driving.'
    ],
    tip: ['Keep a spare in more than one place.', 'Take a photo of your glasses today.'],
    after: ['Get a new spare as soon as you can. Update the photo of your prescription.'],
    sources: [SRC.aaoEvac, SRC.aaoRx, SRC.aaoPlan],
    unconfirmed: [NOTE,
      'Check with local emergency services or hospitals for help if you need medication or glasses in a disaster, and the optician can read the prescription from existing glasses, match AAO pages quoted to us.',
      'The tape and string fixes, the pinhole card, phone zoom and pharmacy readers are common practice. We did not find a named source for them.',
      GEN] });

  /* ---------- SCENARIOS ---------- */
  add({ id: 'scn-smoke-clean-room', area: 'Scenarios • Smoke', icon: 'wind',
    title: 'Wildfire smoke: make a clean-air room at home',
    intro: 'Smoke can reach far from a fire. A clean-air room protects you when you cannot leave. Check the air quality first.',
    first: [
      'Check the air quality (AQI) on the AirNow app or fire.airnow.gov before you go out. In Portugal check IPMA and the local authority.',
      'Stay inside. Keep doors and windows closed.',
      'Pick one room with few windows and doors. A bedroom is a good choice.',
      'Run an air cleaner with a HEPA filter in that room on high.'
    ],
    do: [
      'Choose an air cleaner sized for the room. Avoid models that make ozone.',
      'Run it as much as you can. Use the highest fan speed.',
      'If you have central air, use a filter rated MERV 13 or higher if the system allows it. Change filters more often in heavy smoke.',
      'Close fireplace dampers. Do not burn candles, gas stoves or incense indoors. Do not vacuum, which stirs dust.',
      'No air cleaner: the EPA has researched a do-it-yourself air cleaner. A box fan with a good furnace filter taped on can reduce smoke indoors.',
      'Keep N95 or FFP2 masks for when you must go out. A cloth mask does not protect from smoke.',
      'Keep pets inside. Keep water and food in the room.',
      'Take care of children, older people, pregnant women and anyone with asthma or heart or lung disease. Have their medicines in reach.',
      'Use a damp cloth to wipe dust. Keep a thermometer and a small fan in the room in hot weather.',
      'If the smoke is thick and the room is hot, leave early to a clean-air place such as a library or shelter.'
    ],
    warn: [
      'Chest pain, trouble breathing, severe cough, dizziness or fainting: call the emergency number.',
      'HEPA filters do not remove smoke gases and smells. These need an activated charcoal filter.',
      'Do not run a fan in a way that blows smoke into the room from outside.'
    ],
    tip: ['Buy the air cleaner and masks before fire season.', 'Fill the car with fuel and keep the go-bag ready.'],
    after: ['Clean up with a mask on. Wash surfaces. Replace the filters.'],
    sources: [SRC.airnow, SRC.airnowFilter, SRC.epaDiy],
    unconfirmed: [NOTE,
      'Pick an interior room with few windows and doors, a HEPA air cleaner of the right size with little or no ozone, run on high, keep doors and windows closed, MERV 13 or higher for central air, and N95 for going out, match AirNow and EPA text quoted to us.',
      'HEPA filters do not remove gases and smells is from EPA text quoted to us.',
      'The box fan with a furnace filter is from EPA research on DIY air cleaners quoted to us. We did not open it. The exact build matters. Follow the EPA instructions.',
      'We did not find Portugal-specific smoke advice. Check IPMA and the local authority.',
      GEN] });

  add({ id: 'scn-days-at-home', area: 'Scenarios • Staying home', icon: 'home',
    title: 'Staying home for days with no services: a daily plan',
    intro: 'A routine keeps you safe, warm and calm when the power, water or shops are out.',
    first: [
      'Check everyone. Check the house for hazards. Listen to a radio for official news.',
      'Count water, food, medicines and fuel. Plan to share.',
      'Keep one warm or cool room. Keep one clean place to eat and one for the toilet.',
      'Check on neighbours, especially older people.'
    ],
    do: [
      'Morning: check everyone, take medicines, boil water, eat a warm meal, wash hands, charge devices from a power bank or the sun.',
      'Midday: do chores, check the radio, rest, drink water, check on neighbours.',
      'Afternoon: gather water or wood, clean up, cook a main meal outdoors if you must cook.',
      'Evening: eat, wash, prepare lights, set up sleeping, charge lights and radio.',
      'Night: keep a lantern. Take turns to check on children, older people and the sick.',
      'Food: eat food from the fridge first, then the freezer, then cans. See the food after a blackout guide.',
      'Water: use stored water first. Treat any other water before you drink it.',
      'Hygiene: see the hygiene guides. Wash hands often.',
      'Mind: keep a routine. Talk, play, read, listen to music with batteries off or low. Tell someone if you feel very low.',
      'Children: keep them busy. Give them small jobs. Explain what is happening in simple words.',
      'Pets: feed, water and walk them. Clean up after them.',
      'Write down what you used each day. Change the plan if the outage is long.'
    ],
    warn: [
      'Do not use a generator, grill or camp stove indoors.',
      'Do not drink floodwater. Do not touch downed power lines.',
      'Go to a shelter or leave if heat or cold becomes dangerous, or if someone needs powered medical equipment.'
    ],
    tip: ['Keep a paper plan on the fridge.', 'Use daylight for jobs. Save the battery for the evening.'],
    after: ['Replace what you used. Write down what worked and what did not.'],
    sources: [SRC.readyKit, SRC.cdcCO, SRC.cdcWinter],
    unconfirmed: [NOTE,
      'Ready.gov kit lists, no fuel-burning devices indoors and cold-weather safety match pages quoted to us.',
      'The daily timetable, children, mind and pets tips are general guidance. We did not find a named source for them.',
      GEN] });

  add({ id: 'scn-evacuate-pets-seniors', area: 'Scenarios • Evacuation', icon: 'users',
    title: 'Evacuating with pets and older family members',
    intro: 'Leaving with pets and older people takes more time and more planning. Plan the route, the car and where you will stay.',
    first: [
      'Leave early. A slow start with older people or animals can be too late.',
      'Take the medicines, the medicine list, glasses, hearing aids, mobility aids, and food and water for pets.',
      'Know which shelters or hotels take pets. Ask before you go.',
      'Take your phone, charger, papers and cash.'
    ],
    do: [
      'Seat belts for everyone. Put pets in carriers or secured crates so they cannot move in the car.',
      'Take pet vaccination papers, a recent photo, a leash and collar with a tag, food, water, bowls, a blanket and bags.',
      'Older people: put the person in the front seat if they need space, with a pillow, blanket, water and a bag for sickness. Check for the toilet needs.',
      'Take spare clothes, warm layers, and a hat for each person. Dress for the weather.',
      'Plan stops. Older people and pets need breaks and water. Never leave a pet or older person in a parked hot car.',
      'Keep dogs on a leash at stops. Frightened animals may bolt.',
      'If the person uses a wheelchair or oxygen, make sure the car can carry it and the power. Tell the shelter on arrival.',
      'Tell a friend or relative where you are going and when you plan to arrive.',
      'Check in with your check-in person once you are there. Update them if you move.',
      'Keep calm. Move at the pace of the slowest person.'
    ],
    warn: [
      'Do not leave pets behind if you can help it. They may not survive.',
      'Do not drive in floodwater or through smoke.',
      'Call 911 (US) or 112 (Portugal) if someone is in danger.'
    ],
    tip: ['Practice a short drill with the pets in carriers.', 'Keep a copy of the vet and doctor numbers.'],
    after: ['When you return, check the house before letting pets in. Watch for stress in pets and older people.'],
    sources: [SRC.readyOlder, SRC.readyKit],
    unconfirmed: [NOTE,
      'Take medicines and the list, glasses, hearing aids, mobility aids, and check that transport can carry equipment match Ready.gov text quoted to us.',
      'The pet carrier, leash, paperwork and car tips and the rest of this guide are general guidance. See also the Pets and animals guide and the evacuation guides. We did not find a named source for them in our search.',
      GEN] });

  if (window.LOAD_CORE && window.LOAD_CORE.guides) {
    G.forEach(function (g) { window.LOAD_CORE.guides.push(g); });
  }
})();
