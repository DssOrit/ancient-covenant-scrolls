/* Communications guides from the owner's three Word documents (Part 1 subscription-free options, Part 2 iPhone satellite and TIDRADIO TD-G19, Part 3 iPad and satellite),
   plus a storage guide for shelf creamers, milk powder, wheat and flour. Added 3 Nov 2026 at the owner request (option A: written in the site's own words;
   the Word files stay off the site). The owner said NO Starlink, so no Starlink service is described here.
   Everything comes from the Word files, search results and shop or news pages. No official price, rule or coverage page was opened. Verification labels follow Part 8D.
   Not safety, medical or legal advice. Buy, set up and test BEFORE a crisis. */
(function () {
  var LINKED = 'OFFICIAL SOURCE LINKED BUT NOT OPENED';
  var UNV = 'DATA UNVERIFIED';
  var PENDING = 'DEVICE TEST PENDING';
  var CALL = 'In danger to life, call 911 (California, Florida), 999 or 112 (London) or 112 (Portugal) first, if the phone works.';
  var BEFORE = 'Buy, set up and test this BEFORE a crisis. In a crisis shops and offices may be closed. Do not plan on going out to get it.';
  var NOTE = 'We read the owner\'s documents, search results and shop or news pages. We did not open any official price, rule or coverage page. Check with the seller or the official page before you rely on it.';
var GEN = 'Steps marked as general guidance, and the tips, are common practice. We did not find a named source for each step.';
  var LAW = 'Radio and satellite rules change by country and date. Learn the rule for where you live before you transmit. This is not legal advice.';
  var off = function (n) { return n + ' (' + LINKED + ')'; };
  var page = function (n) { return n + ' (' + UNV + ': shop, news or blog page, linked but not opened)'; };
  var S = {
    apple1: [off('Apple Support: Use Emergency SOS via satellite on your iPhone'), 'https://support.apple.com/en-us/101573'],
    apple2: [off('Apple Support: iPhone satellite features'), 'https://support.apple.com/en-us/105097'],
    macTrast: [page('Emergency SOS via satellite in two more countries, MacTrast, July 2026'), 'https://www.mactrast.com/2026/07/emergency-sos-via-satellite-now-available-in-two-additional-countries/amp/'],
    demo: [page('How to use Emergency SOS via satellite, iGeeksBlog'), 'https://www.igeeksblog.com/satellite-connectivity-on-iphone/'],
    acr: [off('ACR: personal locator beacons'), 'https://www.acrartex.com/'],
    manual: [page('ResQLink manual (reseller copy)'), 'https://www.dewolfmaritime.com/app/uploads/2020/12/Manual-ResQLink.pdf'],
    noaaReg: [off('NOAA SARSAT: beacon registration brochure'), 'https://www.sarsat.noaa.gov/wp-content/uploads/Registration-Brochure.pdf'],
    uscgReg: [off('US Coast Guard: beacon registration brochure'), 'https://www.dco.uscg.mil/Portals/9/CG-5R/SARfactsInfo/Beacon_Registration_Brochure.pdf'],
    tid: [off('TIDRADIO: TD-G19 product page'), 'https://tidradio.com/products/td-g19-global-lte-unlimited-range-ptt-walkie-talkies-with-sim-card'],
    tidFix: [page('TIDRADIO: how to fix a PoC radio "no network" issue'), 'https://tidradio.com/blogs/news/how-to-fix-poc-radio-no-network-issue'],
    iriApp: [off('Iridium: GO! exec app'), 'https://www.iridium.com/products/iridium-go-exec-app'],
    iriGo: [off('Iridium: GO! exec'), 'https://www.iridium.com/go-exec/'],
    garmin: [off('Garmin: inReach Messenger (given to us, we could not open it)'), 'https://www.garmin.com/en-US/p/893837/'],
    mesh: [off('Meshtastic'), 'https://meshtastic.org'],
    deseret: [page('Food storage containers, Deseret News (quotes USU Extension)'), 'https://www.deseret.com/2011/2/4/20369011/food-storage-essentials-best-food-storage-containers-extend-shelf-life-and-eliminate-bugs'],
    wheat: [page('Wheat berries storage life, a grain retailer blog'), 'https://countrylifefoods.com/blogs/grain-foods/the-practical-guide-to-wheat-berries-storage-life'],
    uht: [page('How long does UHT or long-life milk last once opened, Dairy Australia'), 'https://dairy.com.au/dairy-matters/you-ask-we-answer/how-long-does-uht-long-life-milk-last-once-opened'],
    creamer: [page('How long coffee creamer lasts, Tasting Table'), 'https://www.tastingtable.com/870063/how-long-can-you-leave-coffee-creamer-on-the-counter'],
    fcm: [page('Sale and labelling of food contact materials, Finnish Food Authority'), 'https://www.ruokavirasto.fi/en/foodstuffs/food-sector/packages-and-other-food-contact-materials/question-and-answers/sale-and-labelling-of-contact-materials/'],
    fcm2: [page('Testing to substantiate food contact material labeling in the EU, Measurlabs'), 'https://measurlabs.com/blog/food-contact-material-performance-labels/'],
    cdcWater: [off('FoodSafety.gov: food and water in a disaster'), 'https://www.foodsafety.gov/keep-food-safe/food-safety-in-disaster-or-emergency']
  };
  function find(id) { var gs = (window.LOAD_CORE && window.LOAD_CORE.guides) || []; for (var i = 0; i < gs.length; i++) if (gs[i].id === id) return gs[i]; return null; }
  var NEW = [];

  /* ---------------- 1. Subscription-free options ---------------- */
  NEW.push({
    id: 'comm-no-subscription', area: 'Home skills • Communicate', icon: 'radio', difficulty: 'Practical',
    title: 'No subscription: ways to call for help or reach people without a monthly plan',
    intro: 'Some ways to reach help or family cost nothing every month. This guide compares them in plain words. ' + BEFORE,
    first: [
      CALL,
      NOTE,
      'Start here: step 1, read the table. Step 2, pick one thing for calling for help and one for talking to people near you. Step 3, open the matching guide and set it up.',
      'A subscription-free tool is not the same as a free tool. Some need a one-off purchase, a registration, or a licence.'
    ],
    do: [
      'Step 1. For a life-threatening emergency with no phone signal, the two no-plan choices are an iPhone 14 or newer (Emergency SOS via satellite, free during the eligible period) and a 406 MHz personal locator beacon (no plan, distress only).',
      'Step 2. For talking to people near you, use walkie-talkies: PMR446 in the United Kingdom and Portugal, FRS in the United States. They need no plan.',
      'Step 3. For text messages to people near you, use Meshtastic. It needs no plan, but it only reaches other nearby nodes.',
      'Step 4. For voice calls to anyone in the world, you need paid airtime (for example an Iridium phone). That is not a no-plan option.',
      'Step 5. Write down your choices on the check-ins tool in the Tools tab, with the dates you tested them.'
    ],
    warn: [LAW, 'A beacon is not a phone and cannot send a message to your family. It sends a distress signal to rescue authorities.', 'A beacon must be registered. An unregistered beacon can slow a rescue.'],
    tip: ['Test the free options first. They cost nothing to practise.', 'Keep the paper copy of your choices with the go-bag.'],
    after: ['Write down which one you chose, and the date you tested it.'],
    table: { head: ['Method', 'Monthly plan', 'What works without towers'], rows: [
      ['406 MHz personal locator beacon (ACR ResQLink View)', 'None', 'One-way distress signal to rescue coordination. Not a phone and cannot text.'],
      ['iPhone 14 or newer, Emergency SOS via satellite', 'None during the eligible free period', 'Emergency text in supported countries. Not ordinary voice calls.'],
      ['PMR446 or FRS walkie-talkies', 'None', 'Short-range voice with compatible nearby radios'],
      ['Meshtastic LoRa', 'None', 'Text between nearby radio nodes. It does not cross an ocean.'],
      ['Iridium 9555 satellite phone', 'Paid airtime', 'Voice and text worldwide']
    ] },
    sections: [{ h: 'Where to read next', items: ['The 406 MHz beacon: see "406 MHz personal locator beacon".', 'The iPhone: see "iPhone satellite SOS: set it up and practise".', 'Radios: see "Licence-free walkie-talkies" and "Meshtastic".', 'Satellite phones: see "Satellite phones: Iridium, Inmarsat, Globalstar".'] }],
    sources: [S.apple1, S.acr, S.mesh, S.noaaReg],
    unconfirmed: [NOTE, UNV + ': whether the iPhone free period has been extended again. One source gives September 2026 and another November 2026.', PENDING + ': not tested on a real iPad.']
  });

  /* ---------------- 2. iPhone satellite SOS ---------------- */
  NEW.push({
    id: 'comm-iphone-sos', area: 'Home skills • Communicate', icon: 'radio', difficulty: 'Essential',
    title: 'iPhone satellite SOS: set it up and practise',
    intro: 'A newer iPhone can text emergency services by satellite when there is no cell signal. This guide shows how to check your phone, practise safely, and what to do in a real emergency. It is for emergencies. It is not a phone for everyday calls. ' + BEFORE,
    first: [
      CALL,
      NOTE,
      'Start here: step 1, check your model. Step 2, update the phone. Step 3, set up Medical ID. Step 4, run the demo outdoors. Step 5, tell your family.',
      'You need an iPhone 14 or newer (all models) and a clear view of the sky.',
      'Emergency SOS via satellite is listed for the United States, the United Kingdom and Portugal. Messages via satellite is listed only for the United States, Canada, Mexico and Japan, so do not count on it in London or Coimbra.'
    ],
    do: [
      'Step 1. Check the model. Open Settings, then General, then About, and read Model Name. It must be iPhone 14 or newer.',
      'Step 2. Update. Open Settings, then General, then Software Update, and install the current iOS.',
      'Step 3. Set up Medical ID and emergency contacts in the Health app. Decide whether to show Medical ID when the phone is locked.',
      'Step 4. Charge the phone, and keep a power bank with it. Cold drains batteries quickly.',
      'Step 5. Practise, without calling anyone. Go outdoors. Open Settings, then Emergency SOS, scroll to Emergency SOS via Satellite, and tap Try Demo. Another way is Control Center, the connectivity buttons, then Satellite, then Try Demo. The words can change between iOS versions.',
      'Step 6. In the demo, follow the screen to learn how to aim the phone. The demo does not contact emergency services.',
      'Step 7. In a real emergency, move to a safe outdoor spot with a clear view of the sky and the horizon. Do not put yourself in danger to get a better signal.',
      'Step 8. Try the local emergency number first: 911 in the United States, 999 or 112 in the United Kingdom, 112 in Portugal.',
      'Step 9. If calls and texts fail and the phone offers it, choose the emergency text by satellite. Answer the questions on the screen. Follow the arrows to keep the phone pointed. Stay in the conversation.',
      'Step 10. Tell your family that this is the plan and how to know you are safe. Agree check-in times.'
    ],
    warn: [
      'It is emergency messaging. It is not ordinary satellite voice calling.',
      'Apple says it is free for two years after you activate an eligible iPhone, and has extended this before. We found no announced paid plan. Check Apple\'s page for your phone.',
      'Do not use the demo as a way to practise calling emergency services.'
    ],
    tip: ['Practise once every 3 months. Write the date in the check-ins tool.', 'Keep the phone warm in an inside pocket.'],
    after: ['Write the date of your practice and how long the phone took to connect.'],
    table: { head: ['Place', 'Emergency SOS via satellite', 'Messages via satellite', 'Number to try first'], rows: [
      ['California, Florida (United States)', 'Listed', 'Listed (Apple support page)', '911'],
      ['London (United Kingdom)', 'Listed (news page, July 2026)', 'Not listed', '999 or 112'],
      ['Coimbra (Portugal)', 'Listed (news page, July 2026)', 'Not listed', '112']
    ] },
    sections: [{ h: 'What we could not confirm', items: ['The exact words on your screen, because they change between iOS versions.', 'Whether Apple has extended the free period again.', 'Any Apple page listing the current countries. The lists in the news pages differ.'] }],
    sources: [S.apple1, S.apple2, S.macTrast, S.demo],
    unconfirmed: [NOTE, UNV + ': the country list and the free period. Check Apple\'s own pages.', PENDING + ': not tested on a real iPhone.']
  });

  /* ---------------- 3. 406 MHz beacon ---------------- */
  NEW.push({
    id: 'comm-plb', area: 'Home skills • Communicate', icon: 'radio', difficulty: 'Practical',
    title: '406 MHz personal locator beacon (ACR ResQLink View): what it does and how to register it',
    intro: 'A personal locator beacon sends a distress signal to rescue authorities by satellite. It has no monthly plan. It is not a phone, it cannot send a text, and it cannot reach your family. It is a last-resort tool for a life-threatening emergency. ' + BEFORE,
    first: [
      CALL,
      NOTE,
      'Start here: step 1, buy a beacon from a trusted seller. Step 2, register it. Step 3, read the maker\'s manual. Step 4, keep it where you can reach it. Step 5, check the registration and the battery date.',
      'Use it only for a life-threatening emergency. A false alarm wastes rescue resources.',
      'It needs a clear view of the sky.'
    ],
    do: [
      'Step 1. Buy a 406 MHz personal locator beacon. The owner\'s document names the ACR ResQLink View. Buy from the maker or a trusted seller, and check that the model is coded for your country.',
      'Step 2. Register it. The ACR manual says the owner must register a 406 MHz beacon with the national authority of their country, and that in many countries the registration must be renewed every two years.',
      'Step 3. United States: register online with NOAA at beaconregistration.noaa.gov. It is free. Update it when your details change, and tell NOAA if you sell the beacon.',
      'Step 4. Portugal and the United Kingdom: ask your national beacon authority how to register. We did not find the Portuguese or UK office. The ACR manual lists many countries, but the list we saw was unclear.',
      'Step 5. Read the manual from the maker. Do not guess how to switch it on. Learn where the antenna is and how it must point.',
      'Step 6. Choose where to keep it: in the go-bag or on your clothing, where you can reach it fast. Tell your family where it is.',
      'Step 7. If you must use it: go outdoors where you can, keep a clear view of the sky, follow the manual, and stay where you are, because rescuers are coming to the beacon\'s position.',
      'Step 8. Put the registration date, the battery date and the test date in the check-ins tool in the Tools tab. Test it as the manual says. A self-test does not call rescuers.'
    ],
    warn: [
      'It is not a phone. It cannot text your family.',
      'An unregistered beacon can slow a rescue. A false alarm wastes rescue resources.',
      'Do not set it off to practise.',
      'Do not rely on a beacon in place of a plan to leave early.'
    ],
    tip: ['Pair it with a phone feature or a messenger, so family knows you are safe.', 'Put a note with the registration number inside the go-bag.'],
    after: ['Record the date you registered it and when to renew.'],
    sections: [{ h: 'What we could not find', items: ['The battery runtime of the ResQLink View. The results did not give a figure. Check the maker\'s sheet.', 'The Portuguese and United Kingdom registration offices.', 'Whether a beacon needs any permit to carry in Portugal or the United Kingdom.'] }],
    sources: [S.acr, S.manual, S.noaaReg, S.uscgReg],
    unconfirmed: [NOTE, UNV + ': registration in Portugal and the United Kingdom, and the renewal period in each country.', UNV + ': the battery life.', PENDING + ': we have not tested a beacon.', GEN]
  });

  /* ---------------- 4. TIDRADIO TD-G19 ---------------- */
  NEW.push({
    id: 'comm-tidradio', area: 'Home skills • Communicate', icon: 'radio', difficulty: 'Practical',
    title: 'TIDRADIO TD-G19: a push-to-talk radio that runs over 4G (it needs a cell network)',
    intro: 'The TD-G19 looks like a walkie-talkie, but it sends your voice over the 4G cell network and the maker\'s servers. "Unlimited range" means it can reach any other unit that has a 4G signal. It does not work when the cell towers are down. This guide says how to set it up and what it can and cannot do. ' + BEFORE,
    first: [
      CALL,
      NOTE,
      'Start here: step 1, understand that it needs 4G. Step 2, buy at least two. Step 3, check the SIM and service terms in writing. Step 4, set up and test.',
      'It is not a way to call for help when the towers are out.',
      'Use PMR446 or FRS radios or a satellite option for that.'
    ],
    do: [
      'Step 1. Understand it. It is push-to-talk over cellular. It sends voice over a 4G data connection and an internet server. It does not talk directly from radio to radio.',
      'Step 2. Buy at least two units that suit your region. Ask the seller in writing: which SIM and carrier, which countries, how long the data service lasts, and what renewal costs.',
      'Step 3. Charge each radio fully. Check that the right SIM is in.',
      'Step 4. Install the maker\'s management app (ODmaster) from the maker\'s own instructions.',
      'Step 5. Activate each radio and bind it to your account or device number.',
      'Step 6. Check that each radio shows a 4G or LTE data connection.',
      'Step 7. Create or join a private family group. Add the other radios.',
      'Step 8. Press and hold the talk button to speak. Release to listen.',
      'Step 9. Test from both places you will use it (for example Portugal and the United States) before you rely on it.',
      'Step 10. Put the service end date in the check-ins tool.'
    ],
    warn: [
      'No 4G or no server means no call. It will not work in a blackout that takes down the cell network.',
      'A package that says "lifetime service" does not promise that the carrier or the server will be up in a disaster. Ask for the terms in writing.',
      'Related models in the search results come with a prepaid data period and a renewal through the app. We did not find the same for the TD-G19.'
    ],
    tip: ['Keep a licence-free PMR446 or FRS pair as the back-up.', 'Test it every 3 months.'],
    after: ['Write the date the service ends and set a reminder before it does.'],
    sections: [{ h: 'What we could not confirm', items: ['Which countries the TD-G19 SIM works in. The page advertises worldwide use. That is a maker claim.', 'The carrier on the SIM, the length of the included data and the renewal price.', 'Any official check that it can be used legally in Portugal or the United States.'] }],
    sources: [S.tid, S.tidFix],
    unconfirmed: [NOTE, UNV + ': country coverage, the SIM carrier and renewal terms for the TD-G19.', PENDING + ': we have not tested one.']
  });

  /* ---------------- 5. iPad with Iridium GO! exec ---------------- */
  NEW.push({
    id: 'comm-ipad-satellite', area: 'Home skills • Communicate', icon: 'radio', difficulty: 'Practical',
    title: 'iPad and satellite: use an iPad as the screen for an Iridium GO! exec',
    intro: 'An iPad cannot turn into a satellite phone. It has no satellite radio or antenna. What works is to connect it by Wi-Fi to a satellite terminal that you buy, and use the iPad as the screen. This guide says how. ' + BEFORE,
    first: [
      CALL,
      NOTE,
      'Start here: step 1, understand that the terminal does the satellite work. Step 2, buy the terminal and airtime. Step 3, activate it. Step 4, install the app. Step 5, test it outdoors.',
      'There are other choices: a satellite messenger, or a Meshtastic node. See the table below.'
    ],
    do: [
      'Option A, Iridium GO! exec: voice and limited data.',
      'Step 1. Buy an Iridium GO! exec terminal, a charger and an approved service plan. See the guide "Where to buy and what to pay".',
      'Step 2. Activate the terminal and the SIM with the seller before you need it.',
      'Step 3. Install the Iridium GO! exec app on the iPad from the App Store. One page lists iOS 14 or newer.',
      'Step 4. Take the terminal outdoors with a clear view of the sky. Switch it on and wait for service.',
      'Step 5. On the iPad, join the terminal\'s Wi-Fi network, then open the app. You can also scan the QR code on the terminal. Joining the Wi-Fi by hand also works.',
      'Step 6. Follow the pairing steps. Set your SOS contacts as the maker says. Make a test call.',
      'Step 7. Use only low-bandwidth uses. Do not expect streaming.',
      'Step 8. Text messages: sources disagree on whether the exec supports ordinary SMS. The owner\'s document says it does not. A reseller suggests Iridium Chat as a messaging route. Ask Iridium before you rely on either.',
      'Option B, a satellite messenger: devices such as Garmin inReach send texts and need a subscription. Check that the app works on your exact iPad before you buy. A phone app listing does not promise iPad support.',
      'Option C, no airtime: connect the iPad to a nearby Meshtastic node by Bluetooth or Wi-Fi, where the client allows it. This is local text only. It is not satellite.',
      'In all cases, keep a registered 406 MHz beacon for a life-threatening emergency.'
    ],
    warn: ['It needs a clear view of the sky.', 'Satellite data is slow and costly. Keep it for short messages.', 'Do not buy a satellite plan you have not read in writing.'],
    tip: ['Charge the terminal and the iPad before a storm.', 'Test the call with a friend and write down how long it took.'],
    after: ['Put the plan end date and the test date in the check-ins tool.'],
    table: { head: ['System', 'Works if towers fail', 'Voice for the family', 'Ongoing cost'], rows: [
      ['iPhone emergency satellite', 'Yes, emergency use', 'No ordinary voice', 'Free in the eligible period'],
      ['TIDRADIO TD-G19', 'No. It needs 4G and the server', 'Yes, over the data network', 'SIM and service terms vary'],
      ['Iridium GO! exec with an iPad', 'Yes, with a clear sky', 'Yes, limited satellite voice', 'Paid satellite plan'],
      ['Meshtastic with an iPad', 'Yes, locally', 'No, text only', 'No plan'],
      ['406 MHz beacon', 'Yes', 'No, distress only', 'No plan']
    ] },
    sections: [{ h: 'What we could not confirm', items: ['Whether the exec supports ordinary SMS. The sources disagree.', 'Whether a given Garmin app works on a given iPad. Garmin\'s page could not be opened.', 'The minimum iOS version. One aggregator page says 14.'] }],
    sources: [S.iriApp, S.iriGo, S.garmin, S.mesh],
    unconfirmed: [NOTE, UNV + ': SMS on the exec, and Garmin app support on an iPad.', PENDING + ': we have not tested these on an iPad.']
  });

  /* ---------------- 6. Storage guide ---------------- */
  NEW.push({
    id: 'store-dry-goods-creamers', area: 'Food • Stockpile', icon: 'can', difficulty: 'Practical',
    title: 'Store shelf creamers, milk powder, wheat and flour: boxes, buckets and checks',
    intro: 'Shelf creamers and milk powder keep well in a cool, dark place. Fresh milk and cream do not. Wheat keeps far longer than flour. The box matters as much as the food. This guide says what to check. The shelf-life numbers come from shop and dairy pages and are rough. The label on your pack decides. ' + BEFORE,
    first: [
      'Start here: step 1, read the date on each pack. Step 2, pick a box. Step 3, put it in a cool, dark, dry place off the floor. Step 4, check it every month.',
      NOTE,
      'A bug-out bag has to be light. Pack ready-to-eat food in the bag. Keep bulk wheat and flour at home.',
      'Fresh milk and cream do not keep in any box without a fridge.'
    ],
    do: [
      'Step 1. Shelf creamers: unopened single cups are reported to keep up to about a year in a cool, dry cupboard. Liquid shelf-stable creamer is reported at about 6 to 12 months unopened. The date on your pack decides.',
      'Step 2. Shelf-stable (UHT or long-life) milk: one dairy page gives about 6 to 9 months unopened in the pantry, and 7 days once opened and kept in the fridge.',
      'Step 3. Once opened, use a single cup or carton the same day if you have no fridge. Liquid creamer is reported to last 7 to 14 days in the fridge after opening.',
      'Step 4. Keep them cool, dark and dry. Heat and sunlight shorten the life. Do not let them freeze. Do not store them near fuel, paint or cleaning products.',
      'Step 5. Keep them in their own sealed packs inside the box. Put heavy things beside them, not on top, because single cups split.',
      'Step 6. Whole wheat (wheat berries): the whole grain keeps much longer than flour, because the oils in the germ are protected. Whole wheat flour is reported to go off in a few months.',
      'Step 7. In sealed food-grade buckets in a cool, dark place, one grain seller estimates 1 to 3 years of good quality. Claims of decades depend on foil bags and oxygen absorbers, and come from sellers. One quoted maker gives 10 to 15 years in a sealed can or bucket with an absorber, and about 1 year in a plain bag.',
      'Step 8. A quoted university extension view is that oxygen-free storage is not needed unless insects are present, and that dry ice and diatomaceous earth are not recommended. We did not open the extension page.',
      'Step 9. Cardboard and thin bags are weak. They let in damp, insects and mice. Use a sealed tub or a bucket with a tight lid, kept off the floor.',
      'Step 10. Choose the box. For food that touches the plastic, look for the glass-and-fork mark or the words "for food contact" on the product page or the box. If it is missing, ask the seller for the food-contact declaration before you put loose grain in it. A box sold for clothes and toys is not proven for food.',
      'Step 11. "Airtight" is a seller claim. Check the lid: a gasket and a firm clip are better than a loose lid.',
      'Step 12. Clear plastic lets light in. Keep it in a dark cupboard or cover it.',
      'Step 13. Check every month for damp, mould, insects and bad smells. Throw out anything uncertain. Do not smell-test food to prove it is safe.',
      'Step 14. Write the pack date on the lid. Use the oldest first. Replace stock before it runs out.'
    ],
    warn: [
      'Never store food near fuel, paint or chemicals.',
      'Do not put wet or damp food in a sealed box. It can grow mould.',
      'Do not use a box that held chemicals or fuel for food.',
      'The shelf-life figures are rough and come from shops and blogs. Follow the date on your pack.'
    ],
    tip: ['Put a small card inside the lid with the contents and the dates.', 'A 25 L box holds roughly 15 to 19 kg of dry wheat (our estimate), which is too heavy for a bag.'],
    after: ['Write the date of each monthly check on the lid.'],
    table: { head: ['Food', 'Reported keeping time (rough)', 'Notes'], rows: [
      ['Shelf creamer, single cups', 'Up to about 1 year unopened', 'Use at once when opened. Do not let it freeze.'],
      ['Shelf-stable liquid creamer', 'About 6 to 12 months unopened', 'Fridge after opening: about 7 to 14 days'],
      ['Shelf-stable (UHT) milk', 'About 6 to 9 months unopened', 'Fridge after opening: about 7 days'],
      ['Whole wheat berries, sealed bucket', 'About 1 to 3 years good quality; longer with absorbers (seller claims)', 'Keep cool, dark and dry'],
      ['Whole wheat flour', 'A few months', 'Oils go off. Keep sealed and cool.'],
      ['Grain in cardboard or a plain bag', 'About 1 year at best (one quoted maker)', 'Pests and damp get in']
    ] },
    sections: [{ h: 'What we could not confirm', items: ['An official shelf-life figure. The numbers are from shop, dairy and blog pages.', 'Whether the extension view on wheat and oxygen is current. It comes through a news article.', 'Whether any particular plastic box is food-safe. Check the maker.', 'Rules in Portugal, the United Kingdom, California and Florida for food-contact boxes. The labelling points come from a Finnish authority page and a testing company page about the EU.'] }],
    sources: [S.wheat, S.deseret, S.uht, S.creamer, S.fcm, S.fcm2, S.cdcWater],
    unconfirmed: [NOTE, UNV + ': every shelf-life figure here. The label on your pack decides.', UNV + ': the food-contact point for plastic boxes, which comes from a regulator page and a lab blog about the EU.', PENDING + ': not tested on a real iPad.', GEN]
  });

  /* ---------------- overlay: pointers and licence chart rows ---------------- */
  var st = find('comm-start');
  if (st) st.sections = (st.sections || []).concat([{ h: 'More guides added 3 Nov 2026', items: [
    'No subscription: ways to call for help or reach people without a monthly plan.',
    'iPhone satellite SOS: set it up and practise.',
    '406 MHz personal locator beacon: what it does and how to register it.',
    'TIDRADIO TD-G19: a push-to-talk radio that runs over 4G (it needs a cell network).',
    'iPad and satellite: use an iPad as the screen for an Iridium GO! exec.'
  ] }]);
  var lic = find('comm-licence-chart');
  if (lic && lic.table && lic.table.head.length === 4) {
    lic.table.rows.push(['406 MHz personal locator beacon', 'Register with NOAA (free). The brochure says all 406 MHz beacons must be registered', 'Register with the national authority (the maker\'s manual). Which office: not found', 'Not found: ask before you buy']);
    lic.table.rows.push(['TIDRADIO TD-G19 (push-to-talk over 4G)', 'Needs a 4G network. Rules for the user: not confirmed', 'Needs a 4G network. Rules for the user: not confirmed', 'Needs a 4G network. Rules for the user: not confirmed']);
    lic.checkedOn = '3 Nov 2026';
    lic.unconfirmed = (lic.unconfirmed || []).concat([UNV + ': the beacon and TD-G19 rows come from the owner\'s documents and search results. We did not open an official page.']);
  }

  NEW.forEach(function (g) { g.checkedOn = '3 Nov 2026'; g.status = 'partly'; g.source = g.sources[0][1]; if (!g.sections) g.sections = []; });
  if (window.LOAD_CORE && window.LOAD_CORE.guides) NEW.forEach(function (g) { window.LOAD_CORE.guides.push(g); });
})();
