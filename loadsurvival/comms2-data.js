/* Communications update, 2 Nov 2026, at the owner request. Loads after comms-data.js.
   Updates 6 existing guides (satellite texting, licence chart, walkie-talkies, ham radio, Meshtastic, start) and adds 3 new ones:
   satellite phones, where to buy and what to pay by place, and a plain five-step setup.
   Places covered: California, Florida, London and Coimbra. The owner said NO Starlink, so no Starlink service is described anywhere here.
   Everything below comes from search results and shop or news pages that were NOT opened on the official site. Prices are rough and dated.
   Verification labels follow Part 8D. Not legal advice. Buy, set up and test BEFORE a crisis. */
(function () {
  var LINKED = 'OFFICIAL SOURCE LINKED BUT NOT OPENED';
  var UNV = 'DATA UNVERIFIED';
  var PENDING = 'DEVICE TEST PENDING';
  var CALL = 'In danger to life, call 911 (California, Florida), 999 or 112 (London) or 112 (Portugal) first, if the phone works.';
  var BEFORE = 'Buy, set up and test this BEFORE a crisis. In a crisis shops and offices may be closed. Do not plan on going out to get it.';
  var NOTE = 'We read search results and shop or news pages. We did not open any official price page, and garmin.com could not be reached from our session. Prices are rough guides from shops and reviews, with different dates. Check with the seller before you buy.';
  var LAW = 'Radio and satellite rules change by country and date. Learn the rule for where you live before you transmit. This is not legal advice.';
  var shop = function (n) { return n + ' (' + UNV + ': shop or news page, linked but not opened)'; };
  var S = {
    gtc: [shop('Iridium sat phone prepaid SIMs, Global Telesat (GTC)'), 'https://gtc.co.uk/iridium-prepaid-satellite-airtime'],
    gtcGarmin: [shop('Garmin inReach subscription plans, GTC'), 'https://gtc.co.uk/inreach-subscription-plans'],
    gtcZoleo: [shop('New ZOLEO plans, GTC'), 'https://gtc.co.uk/blogs/all/new-zoleo-subscription-plans-prepare-and-protect'],
    hikeGarmin: [shop('Garmin inReach subscription cost breakdown, HikingGuy'), 'https://hikingguy.com/hiking-gear/garmin-inreach-subscription-cost-breakdown'],
    hikeZoleo: [shop('ZOLEO review, HikingGuy'), 'https://hikingguy.com/gear/zoleo-review/'],
    iriWhere: ['Iridium: where to buy (' + LINKED + ')', 'https://www.iridium.com/where-to-buy/?pid=313106'],
    ain: [shop('Iridium GO! exec release, AIN, 31 May 2026'), 'https://backend.ainonline.com/sites/default/files/article_export/rtf/Iridium_Releases_Certus-based_Portable_Communicator-31-05-2026.rtf'],
    satmodo: [shop('Sat phone cost and comparison, Satmodo'), 'https://www.satmodo.com/satellite-phone'],
    gearjunkie: [shop('The 6 best satellite phones of 2026, GearJunkie'), 'https://gearjunkie.com/technology/best-satellite-phone'],
    appleSupport: ['Apple Support: About Messages via satellite (' + LINKED + ')', 'https://support.apple.com/hi-in/120930'],
    macTrast: [shop('Emergency SOS via satellite in two more countries, MacTrast, July 2026'), 'https://www.mactrast.com/2026/07/emergency-sos-via-satellite-now-available-in-two-additional-countries/amp/'],
    macTrast2: [shop('Apple extends free satellite access, MacTrast, September 2026'), 'https://www.mactrast.com/2026/09/apple-once-again-extends-free-satellite-access-for-an-additional-year/'],
    ofcom: ['Ofcom: licence exemption for radio equipment (' + LINKED + ')', 'https://www.ofcom.org.uk/spectrum/radio-equipment/wireless_exemption'],
    essexham: [shop('UK amateur radio licensing, Essex Ham'), 'https://essexham.co.uk/?p=20667'],
    gmrsFee: [shop('GMRS licence 2026, Baofeng Tech'), 'https://baofengtech.com/tag/licensing-and-regulations/'],
    gmrsOnesdr: [shop('GMRS radios and licence, OneSDR'), 'https://www.onesdr.com/gmrs-radios-license'],
    hamFee: [shop('US amateur radio exam fees, KS6M'), 'https://jrabold.net/ks6m/licensing/index.html'],
    meshDocs: ['Meshtastic: radio settings (' + LINKED + ')', 'https://meshtastic.org/docs/overview/radio-settings/'],
    pivotel: [shop('Satellite phone restrictions by country, Pivotel'), 'https://pivotel.com.au/knowledge-base/understanding-global-restrictions-on-satellite-communication-devices.html']
  };
  function find(id) { var gs = (window.LOAD_CORE && window.LOAD_CORE.guides) || []; for (var i = 0; i < gs.length; i++) if (gs[i].id === id) return gs[i]; return null; }
  function stamp(g) { g.checkedOn = '2 Nov 2026'; g.status = 'partly'; if (g.sources && g.sources.length) g.source = g.sources[0][1]; }
  function addSources(g, list) { g.sources = (g.sources || []).concat(list.filter(function (x) { return !(g.sources || []).some(function (y) { return y[1] === x[1]; }); })); }
  function addUnc(g, lines) { g.unconfirmed = (g.unconfirmed || []).concat(lines); }
  var NEW = [];

  /* ---------------- 1. Satellite texting (existing) ---------------- */
  var sat = find('comm-satellite');
  if (sat) {
    sat.first = sat.first.map(function (x) { return /^In danger to life/.test(x) ? CALL : x; });
    sat.do = sat.do.map(function (x) {
      return /^Step 8\./.test(x) ? 'Step 8. Satellite messengers: small devices such as Garmin inReach and ZOLEO send texts and an SOS by satellite and need a subscription. Prices seen are in the section below. Check the seller before you rely on one.' : x;
    });
    sat.sections = (sat.sections || []).concat([
      { h: 'Your iPhone: what the sources say about each place', items: [
        'You need an iPhone 14 or a newer model.',
        'Emergency SOS via satellite: a July 2026 news page lists the United States, the United Kingdom and Portugal among the countries (so California, Florida, London and Coimbra).',
        'Messages via satellite: Apple\'s support page lists only the United States, Canada, Mexico and Japan. It does not list the United Kingdom or Portugal. So in your four places only California and Florida are listed.',
        'It is free for two years after you activate the phone. Apple has extended the free period more than once. We found no announced paid plan. One source gives September 2026 for the latest extension and another gives November 2026, and we could not tell which is right.',
        'Check Apple\'s own page for your country before you rely on it.'
      ] },
      { h: 'Satellite messengers: prices seen (not official)', items: [
        'Garmin inReach Mini 2: about $250 on sale in 2026 listings, $399.99 list price.',
        'Garmin inReach Messenger Plus: about $300 in one deal listing. Photo and voice messages need a Plus device and a Plus plan.',
        'Garmin plans: from about $14.99 a month (the Essential plan). Plans can be changed, and in the United Kingdom a pause is listed at £4.99 a month. We could not open Garmin\'s own price page.',
        'ZOLEO: about $149 for the device in one shop listing. United Kingdom 2026 plans: Prepare £17.99 a month (50 messages), Protect £29.99 a month (unlimited), £19.99 to activate, all with VAT. United States: older plans of about $20 (75 messages) to $50 (unlimited) were still listed, and we could not confirm the 2026 plans there.',
        'A subscription is needed for both. Without one, the device cannot send. Ask about the contract before you buy.'
      ] },
      { h: 'Satellite phones: where to read next', items: ['If you want to talk, not only text, read the guide "Satellite phones: Iridium, Inmarsat, Globalstar". For prices by place, read "Where to buy and what to pay".'] }
    ]);
    addSources(sat, [S.macTrast, S.macTrast2, S.appleSupport, S.gtcGarmin, S.hikeGarmin, S.gtcZoleo, S.hikeZoleo]);
    addUnc(sat, [NOTE, 'Messages via satellite for the United Kingdom and Portugal: Apple\'s page did not list them, but a page can be out of date. ' + UNV + '.', 'Garmin and ZOLEO prices are from shop and review pages and may be out of date. ' + UNV + '.']);
    stamp(sat);
  }

  /* ---------------- 2. Licence chart (existing): add United Kingdom ---------------- */
  var lic = find('comm-licence-chart');
  if (lic && lic.table && lic.table.head.length === 3) {
    var extra = {
      'Crank or battery radio (listen only)': 'No licence to listen (not confirmed)',
      'FRS walkie-talkie': 'Not for use in the UK on a licence-exempt basis (an Ofcom paper says so). Use PMR446',
      'PMR446 walkie-talkie': 'Licence-free (Ofcom licence exemption). Analogue PMR446 only; digital PMR446 is not harmonised across Europe. Handheld, fixed antenna, 500 mW limit',
      'GMRS radio': 'Not for use (not confirmed)',
      'Ham (amateur) radio': 'Licence required from Ofcom. Foundation is the entry level; one source says the licence is free for life and the exam fee was £27.50 in 2020 (out of date)',
      'CB (citizens band)': 'Not covered here',
      'Meshtastic (LoRa)': 'Licence-free 868 MHz band, set the right region. Duty cycle limits. Not confirmed for the UK',
      'Satellite texting on a phone': 'iPhone Emergency SOS via satellite listed. Messages via satellite not listed. Check your model'
    };
    lic.table.head = lic.table.head.concat(['United Kingdom (London)']);
    lic.table.rows = lic.table.rows.map(function (r) { return r.concat([extra[r[0]] || 'Not confirmed']); });
    lic.table.rows.push(['Satellite messenger (Garmin, ZOLEO)', 'Device plus a subscription. Rules for the user: not confirmed', 'Device plus a subscription. Rules for the user: not confirmed', 'Device plus a subscription. Rules for the user: not confirmed']);
    lic.table.rows.push(['Satellite phone (Iridium, Inmarsat, Globalstar)', 'Handset plus airtime. Rules for the user: not confirmed', 'Not found: ask ANACOM and Portuguese customs before you buy', 'Not found: ask Ofcom before you buy']);
    lic.first = lic.first.concat(['United States rules are federal, so they are the same in California and Florida (not confirmed on an official page).']);
    lic.intro = (lic.intro || '') + ' A column for London was added on 2 Nov 2026.';
    lic.sections = (lic.sections || []).concat([{ h: 'Fees seen (not official)', items: [
      'GMRS (United States): $35, no exam, 10 years, in 2026 sources.',
      'US amateur radio: the exam is about $10 to $15 per session, plus a $35 FCC application fee. Some groups waive fees for young people, students and military.',
      'UK amateur radio: Foundation licence. About 6 hours of study, then a multiple-choice exam.',
      'Portugal: see the ham radio guide. We found no fee page for the new law.'
    ] }]);
    addSources(lic, [S.ofcom, S.essexham, S.gmrsFee, S.gmrsOnesdr, S.hamFee, S.pivotel]);
    addUnc(lic, [NOTE, 'The United Kingdom column comes from an Ofcom exemption page, a PMR446 paper and a UK hobby site, as quoted in search results. We did not open them. ' + UNV + '.']);
    stamp(lic);
  }

  /* ---------------- 3. Walkie-talkies (existing): United Kingdom ---------------- */
  var frs = find('comm-frs-pmr');
  if (frs) {
    frs.sections = (frs.sections || []).concat([{ h: 'United Kingdom (London): PMR446', items: [
      'PMR446 walkie-talkies are licence-free under Ofcom\'s licence exemption. They use 8 channels.',
      'Equipment must be handheld, with a fixed antenna, and not more than 500 mW.',
      'Analogue PMR446 is harmonised across Europe. Digital PMR446 is not, so a radio bought in the UK may not be allowed in other countries.',
      'US FRS radios are not allowed in the UK on a licence-exempt basis. Buy radios sold for the UK.',
      'California and Florida: FRS is a federal service, so the rules are the same in both (not confirmed on an official page).'
    ] }]);
    addSources(frs, [S.ofcom]);
    addUnc(frs, [UNV + ': the United Kingdom points come from search results about an Ofcom page and an older Ofcom paper. We did not open them. Rules change.']);
    stamp(frs);
  }

  /* ---------------- 4. Ham (existing) ---------------- */
  var ham = find('comm-ham');
  if (ham) {
    ham.sections = (ham.sections || []).concat([{ h: 'Fees and licences by place (not official)', items: [
      'California and Florida (United States): the exam is about $10 to $15 per session, then a $35 FCC fee. Some groups waive fees for students, military and young people.',
      'London (United Kingdom): the entry level is the Foundation licence from Ofcom. About 6 hours of study, a few practical exercises and a multiple-choice exam. One source says no yearly fee, and the exam fee was £27.50 in 2020, which is out of date.',
      'Coimbra (Portugal): see the section above. The new law (Lei 22/2026) is in the sources. We found no fee page.',
      'Standard cheap handhelds that are not approved for GMRS are not legal on GMRS, even with a licence. Ham radios are for ham frequencies only.'
    ] }]);
    addSources(ham, [S.hamFee, S.essexham]);
    addUnc(ham, [UNV + ': the exam fee ranges are from one volunteer exam team page and a UK hobby site. Ask your local exam team or club.']);
    stamp(ham);
  }

  /* ---------------- 5. Meshtastic (existing) ---------------- */
  var mesh = find('comm-meshtastic');
  if (mesh) {
    mesh.sections = (mesh.sections || []).concat([{ h: 'Bands by place and what to buy', items: [
      'California and Florida: the North America setting, 915 MHz. Meshtastic\'s own page gives a power limit of +30 dBm ERP for North America.',
      'London and Coimbra: the Europe setting, 868 MHz. The same page gives +27 dBm ERP. A third-party table lists the European band as 869.4 to 869.65 MHz with a 10 percent duty cycle, which limits how often a node can send.',
      'A 915 MHz radio is not an 868 MHz radio. Buy the band for your place. Do not assume the antenna is the same.',
      'The software is free and open source. The only cost is the radios. We found no device prices, so ask a seller.',
      'Set the correct region on every node before you use it.'
    ] }]);
    addSources(mesh, [S.meshDocs]);
    addUnc(mesh, [UNV + ': the power and duty-cycle figures disagree between sources. Check the current rules for your region before you transmit.']);
    stamp(mesh);
  }

  /* ---------------- 6. Start (existing) ---------------- */
  var st = find('comm-start');
  if (st) {
    st.first = st.first.map(function (x) { return /^In danger to life/.test(x) ? CALL : x; });
    st.sections = (st.sections || []).concat([{ h: 'More guides added 2 Nov 2026', items: [
      'Satellite phones: Iridium, Inmarsat, Globalstar (voice calls).',
      'Where to buy and what to pay, by place: California, Florida, London and Coimbra.',
      'Set up your device in 5 steps (plain, short).',
      'The licence chart now has a column for London.'
    ] }]);
    stamp(st);
  }

  /* ---------------- NEW A. Satellite phones ---------------- */
  NEW.push({
    id: 'comm-satphones', area: 'Home skills • Communicate', icon: 'radio', difficulty: 'Practical',
    title: 'Satellite phones: Iridium, Inmarsat, Globalstar (voice calls)',
    intro: 'A satellite phone lets you talk when the cell towers are out. It costs more than a messenger and needs airtime. This guide says what the sources found, in plain words. ' + BEFORE,
    first: [
      CALL,
      NOTE,
      'Start here: step 1, pick the network that works where you are. Step 2, buy the phone and the airtime. Step 3, test it outdoors. Step 4, write the numbers of your contacts.',
      'You need a clear view of the sky. It does not work well indoors.'
    ],
    do: [
      'Step 1. Choose the network. Iridium covers the whole world including the poles, so it works in California, Florida, London and Coimbra. Inmarsat covers most of the world but not the poles. Globalstar is best in North America and limited elsewhere. Thuraya covers some regions but not the Americas, so it is not for California or Florida.',
      'Step 2. Choose a handset. Prices seen: Globalstar GSP-1700 about $495; Inmarsat IsatPhone 2 about $599; Iridium Extreme 9575 about $1,295 to $1,345; Thuraya X5-Touch about $1,229. One guide gives a range of $546 to $1,349 for handsets.',
      'Step 3. Choose airtime. Prepaid is simplest for a back-up phone. An Iridium prepaid SIM works in the 9555, 9575 and 9505A. The minimum is 100 minutes and 30 days. One UK dealer lists 100 minutes and 30 days at £136 before VAT (£163.20 with VAT). A US reseller lists a 30-day extension at $65 to $71. Prepaid vouchers may expire, so check the dates.',
      'Step 4. Monthly plans seen: Iridium handset plans about $72 to $120 a month; Inmarsat IsatPhone plans about $83 to $99 a month.',
      'Step 5. For a Wi-Fi hotspot that connects your own phone, the Iridium GO! exec was listed at about $1,579 from dealers in May 2026. Plans run from about $99 a month to $2,299 a year, and there is no unlimited plan.',
      'Step 6. Ask the seller three things: is the SIM included, how long is the airtime valid, and can it be used in my country.',
      'Step 7. Test it now. Go outdoors, point the antenna up, wait for a signal, and call a friend. Write down how long it took.',
      'Step 8. Keep it charged. Keep a power bank with it. Keep the list of numbers on paper.',
      'Step 9. Tell your family which phone it is and when you will check in.'
    ],
    warn: [
      'Some countries ban or restrict satellite phones. We found nothing for Portugal or the United Kingdom. Ask ANACOM and Portuguese customs, or Ofcom, before you buy or carry one. We found no answer, and that is not the same as "legal".',
      'Do not rely on a prepaid SIM that has run out. Check the dates.',
      'Never use it in the middle of a storm outdoors in the open. Keep safe first.'
    ],
    tip: ['Buy the airtime in the amount you will really use. A short prepaid pack can be enough for a back-up.', 'A messenger plus a phone is a good pair: text first, call if you must.'],
    after: ['Write down what you paid and when the airtime ends. Put the date in your calendar.'],
    table: { head: ['Network', 'Where it works (per the sources)', 'Handset price seen', 'Note'], rows: [
      ['Iridium', 'Worldwide, including the poles', '$1,295 to $1,345 (9575)', 'The only one for all four of your places'],
      ['Inmarsat', 'Most of the world, not the poles', '$599 (IsatPhone 2)', 'Plans about $83 to $99 a month'],
      ['Globalstar', 'North America best, limited elsewhere', '$495 (GSP-1700)', 'Check coverage for London and Coimbra'],
      ['Thuraya', 'Regional. Not the Americas', '$1,229 (X5-Touch)', 'Not for California or Florida']
    ] },
    sections: [{ h: 'What we could not find', items: [
      'Whether a permit or import rule applies in Portugal or the United Kingdom.',
      'Official Iridium, Inmarsat or Globalstar price pages. All prices here come from shop and review pages.',
      'Whether Globalstar covers London or Coimbra.'
    ] }],
    sources: [S.satmodo, S.gearjunkie, S.gtc, S.ain, S.iriWhere, S.pivotel],
    unconfirmed: [NOTE, UNV + ': legal status in Portugal and the United Kingdom.', PENDING + ': not tested on a real iPad. We have not tested any satellite phone.']
  });

  /* ---------------- NEW B. Where to buy and what to pay ---------------- */
  NEW.push({
    id: 'comm-where-to-buy', area: 'Home skills • Communicate', icon: 'radio', difficulty: 'Practical',
    title: 'Where to buy and what to pay: satellite phones, messengers and radios (by place)',
    intro: 'A table of what we found for California, Florida, London and Coimbra. All prices are rough, from shop and review pages, with different dates. ' + BEFORE,
    first: [
      CALL,
      NOTE,
      'Start here: step 1, find your place below. Step 2, choose one thing to buy first. Step 3, check the price with the seller.'
    ],
    do: [
      'Step 1. Everyone: check your phone. An iPhone 14 or newer has Emergency SOS via satellite, and it is free to use for now.',
      'Step 2. Add a way to text without a phone: a Garmin inReach or a ZOLEO messenger plus a subscription.',
      'Step 3. If you want voice calls without towers, add an Iridium satellite phone with prepaid airtime.',
      'Step 4. For people near you, add licence-free walkie-talkies (PMR446 in the UK and Portugal, FRS in the United States).',
      'Step 5. Write down your choices and the price you found. Check the price again before you buy.',
      'Step 6. Ask about import VAT and delivery when you buy from another country. UK sellers can ship to Portugal, but ask about tax and customs.'
    ],
    warn: [LAW, 'No price here is official. Do not pay a seller who will not show you the price and the SIM terms.'],
    tip: ['Buy from a seller that can reply by phone or email before you pay.', 'A satellite phone is only as good as its airtime. Check the dates.'],
    after: ['Keep the receipt and the SIM details together with your documents.'],
    table: { head: ['Item', 'Price seen (not official)', 'Where seen', 'Places'], rows: [
      ['iPhone 14 or newer: Emergency SOS via satellite', 'Free for now, two years from activation', 'Apple and news pages', 'California, Florida, London, Coimbra (listed)'],
      ['iPhone: Messages via satellite', 'Free for now', 'Apple support page', 'California and Florida only (listed)'],
      ['Garmin inReach Mini 2', 'About $250 on sale', 'Shop and review pages', 'All four'],
      ['Garmin inReach Messenger Plus', 'About $300 in one deal', 'Shop deal page', 'All four'],
      ['Garmin inReach plan', 'From about $14.99 a month', 'Review and UK shop pages', 'All four'],
      ['ZOLEO device', 'About $149', 'REI listing', 'All four'],
      ['ZOLEO plan, United Kingdom', '£17.99 or £29.99 a month, £19.99 to activate', 'GTC and GPS Training', 'London'],
      ['ZOLEO plan, United States', 'About $20 to $50 a month (older tiers)', 'Review pages', 'California, Florida'],
      ['Iridium 9575 handset', 'About $1,295 to $1,345', 'Satmodo and a buyers guide', 'All four'],
      ['Iridium prepaid SIM, 100 minutes, 30 days', '£136 before VAT (£163.20 with VAT)', 'GTC, UK', 'All four (ask about delivery)'],
      ['Iridium GO! exec', 'About $1,579, plans from $99 a month', 'AIN, May 2026', 'All four'],
      ['Inmarsat IsatPhone 2', 'About $599', 'Shop comparison', 'London, Coimbra, and most of the world'],
      ['Globalstar GSP-1700', 'About $495', 'Shop comparison', 'California, Florida (best in North America)'],
      ['GMRS licence', '$35, 10 years, no exam', '2026 radio sites', 'California, Florida'],
      ['US amateur radio exam', 'About $10 to $15, plus $35 FCC fee', 'Exam team page', 'California, Florida'],
      ['PMR446 walkie-talkies', 'No licence; ask a shop for prices', 'Ofcom and radio papers', 'London, Coimbra (Coimbra not confirmed)']
    ] },
    sections: [
      { h: 'California and Florida', items: [
        'iPhone: Emergency SOS and Messages via satellite are both listed for the United States.',
        'Satellite messengers: Garmin and ZOLEO from US shops. Satmodo, Outfitter Satellite and BlueCosmo came up in the search. This is not a recommendation.',
        'Satellite phones: Iridium works everywhere. Globalstar is best in North America.',
        'Radios: FRS walkie-talkies need no licence. GMRS needs a $35 licence. A US amateur licence needs an exam.',
        'Meshtastic: the 915 MHz North America setting.',
        'Florida: charge everything and test your gear before storm season, and keep it in a waterproof bag. This is general practice.'
      ] },
      { h: 'London', items: [
        'iPhone: Emergency SOS via satellite is listed. Messages via satellite is not.',
        'Satellite messengers: ZOLEO plans in pounds are listed by UK shops. Garmin plans were also listed by a UK shop.',
        'Satellite phones: Global Telesat (GTC) is a UK seller of Iridium SIMs, and says it ships almost anywhere. Ask about the airtime dates.',
        'Radios: PMR446 walkie-talkies are licence-free. US FRS radios are not allowed. A ham licence is from Ofcom.',
        'Meshtastic: the 868 MHz Europe setting.',
        'We found no UK rule on satellite phones. Ask Ofcom.'
      ] },
      { h: 'Coimbra, Portugal', items: [
        'iPhone: Emergency SOS via satellite is listed for Portugal. Messages via satellite is not.',
        'Satellite messengers: the shops that came up were mostly in the UK and the US. Ask about delivery to Portugal.',
        'Satellite phones: Iridium\'s "where to buy" page lists a Portuguese dealer, Verasat Global SL. Ask them for the price and the SIM terms. Desertcart.pt also listed an Iridium 9555 bundle, but its prices did not match other sources.',
        'Radios: PMR446 is reported as licence-free, but we found no ANACOM page. A Portuguese amateur licence comes from ANACOM, under Lei 22/2026 (see the ham guide).',
        'We found no Portuguese rule on satellite phones. Ask ANACOM and customs (Autoridade Tributaria e Aduaneira).',
        'Meshtastic: the 868 MHz Europe setting.'
      ] }
    ],
    sources: [S.iriWhere, S.gtc, S.gtcGarmin, S.gtcZoleo, S.hikeZoleo, S.satmodo, S.ain, S.macTrast, S.appleSupport, S.ofcom, S.gmrsFee, S.hamFee],
    unconfirmed: [NOTE, UNV + ': every price in the table. Check with the seller.', UNV + ': Portuguese and United Kingdom rules on satellite phones and on PMR446.', 'We did not check Verasat Global SL or any shop. Naming a seller is not a recommendation.', PENDING + ': not tested on a real iPad.']
  });

  /* ---------------- NEW C. Setup in 5 steps ---------------- */
  NEW.push({
    id: 'comm-setup', area: 'Home skills • Communicate', icon: 'radio', difficulty: 'Essential',
    title: 'Set up your device in 5 steps (satellite phone, messenger, iPhone, radios)',
    intro: 'Short, plain steps for each device. These are general guidance and common practice. We did not find a named source for each step. Do them BEFORE a crisis.',
    first: [CALL, 'Do one device at a time. Tick each step. Keep the paper with your go-bag.'],
    do: [
      'Step 1. All devices. Charge it. Update it. Write the name, number and plan on paper. Put a power bank with it.',
      'Step 2. All devices. Go outdoors with a clear view of the sky (for satellite) or open ground (for radios).',
      'Step 3. All devices. Run a test. Send a text, make a call, or call a friend by radio. Write down how long it took.',
      'Step 4. All devices. Show every adult in the house how to use it. Write a card with the steps in big print.',
      'Step 5. All devices. Set a date every 3 months to test again and to check the airtime and the batteries.',
      'iPhone satellite: Settings, then Emergency SOS. Run the demo outdoors.',
      'Satellite messenger (Garmin, ZOLEO): create the account, pick a plan, activate, pair it with your phone app, send a test message, and add your contacts. Check the pause or cancel rules.',
      'Satellite phone (Iridium and others): put in the SIM, charge the battery, switch on, point the antenna up, wait for the signal, and call a friend. Write the PIN and the expiry date on paper.',
      'Walkie-talkies (PMR446 or FRS): charge, pick one channel, write it on a card, and test the range in a safe place. Buy the type sold for your country.',
      'Meshtastic: set the region (915 MHz in California and Florida, 868 MHz in London and Coimbra), name the node, set the channel, and test with a second node.'
    ],
    warn: ['Never open or tamper with a battery. Never charge in a closed cupboard.', LAW],
    tip: ['Put the card with the steps inside the bag with the device.', 'Test with a friend, so you know the other end works.'],
    after: ['Write the date of the test on the card.'],
    sections: [],
    sources: [S.appleSupport, S.gtcGarmin, S.gtcZoleo, S.gtc, S.meshDocs],
    unconfirmed: [UNV + ': we did not test any of these devices. The steps are common practice.', PENDING + ': not tested on a real iPad.']
  });

  NEW.forEach(function (g) { g.checkedOn = '2 Nov 2026'; g.status = 'partly'; g.source = g.sources[0][1]; if (!g.sections) g.sections = []; });
  if (window.LOAD_CORE && window.LOAD_CORE.guides) NEW.forEach(function (g) { window.LOAD_CORE.guides.push(g); });
})();
