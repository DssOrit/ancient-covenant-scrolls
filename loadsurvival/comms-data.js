/* Communicating when cell service is down: radios, licences, satellite texting and Meshtastic. 8 guides.
   Written 29 Oct 2026 from search results (not opened) and common practice. Radio rules change by country and date.
   Everything you buy, set up or license is for BEFORE a crisis. No guide here sends anyone to a shop or office in an emergency. Not legal advice. */
(function () {
  var NOTE = 'We read search results about these pages. We could not open the pages themselves, so they are cited to us, not checked by us.';
  var GEN = 'The steps marked as general guidance, and the tips, are common practice. We did not find a named source for each step.';
  var SRC = {
    fccFrs: ['FCC: Family Radio Service (FRS), cited to us, not checked', 'https://www.fcc.gov/general/family-radio-service-frs'],
    fccGmrs: ['FCC: General Mobile Radio Service (GMRS), cited to us, not checked', 'https://www.fcc.gov/general/general-mobile-radio-service-gmrs'],
    wikiFrs: ['Wikipedia: Family Radio Service, cited to us, not checked', 'https://en.wikipedia.org/wiki/Family_Radio_Service'],
    pmr: ['Kenwood: PMR446 white paper, cited to us, not checked', 'https://kenwoodcommunications.co.uk/files/file/comms/uk/pmr446/PMR446-White-Paper-V6_18AUG2016_JT_KB.pdf'],
    portaria: ['Diário da República: Portaria 802/1999 (older law on licence-free radio, now out of date), cited to us, not checked', 'https://diariodarepublica.pt/dr/detalhe/portaria/802-1999-560777'],
    mesh: ['Linux Pro Magazine: messaging off the grid with Meshtastic, cited to us, not checked', 'https://www.linuxpromagazine.com/Issues/2025/299/Meshtastic'],
    meshHam: ['Meshtastic ham radio guide, cited to us, not checked', 'https://vu3dxr.in/meshtastic-ham-radio-guide-lora-mesh-networking-for-hams/'],
    iosSat: ['Western Hunter: Apple satellite messaging first impressions, cited to us, not checked', 'https://westernhunter.net/gear-reviews/camp-gear/new-apple-satellite-messaging-initial-thoughts/'],
    wikiGmrs: ['Wikipedia: General Mobile Radio Service (fee, term, family cover), cited to us, not checked', 'https://en.wikipedia.org/wiki/GMRS'],
    arrl: ['ARRL: International Operating (US amateurs in CEPT countries), May 2021, cited to us, not checked', 'https://www.arrl.org/files/file/Reciprocal%20operating%20forms/May%202021%20International%20Operating.pdf'],
    anacomHam: ['ANACOM: visiting amateur operators (page cited to us, we could not open it)', 'https://www.anacom.pt/render.jsp?contentId=978436'],
    pf5x: ['An operator blog: how to get a Portuguese callsign, 2025 (personal account, cited to us, we could not open it)', 'https://pf5x.wordpress.com/2025/06/23/how-to-get-a-portuguese-callsign/'],
    iaru60: ['IARU Region 1: CEPT licences do not allow 60 metres in Portugal, cited to us, not checked', 'https://www.iaru-r1.org/about-us/committees-and-working-groups/hf-committee-c4/news/cept-licenses-do-not-allow-operation-at-60-meters-in-portugal'],
    dl1: ['Diario da Republica: Decreto-Lei 1/2017 of 5 January (CB: no registration), cited to us, not checked', 'https://diariodarepublica.pt/dr/detalhe/decreto-lei/1-2017-105703294'],
    lei22: ['Diario da Republica: Lei 22/2026 of 27 May (amateur radio law, in force 25 Aug 2026), cited to us, not checked', 'https://diariodarepublica.pt/dr/detalhe/lei/22-2026-1126675654'],
    dl47: ['Diario da Republica: Decreto-Lei 47/2000 (ended CB licensing, left registration), cited to us, not checked', 'https://diariodarepublica.pt/dr/detalhe/decreto-lei/47-2000-508468'],
    bgrSat: ['BGR: Messages via satellite in iOS 18, cited to us, not checked', 'https://www.bgr.com/tech/move-over-garmin-messages-via-satellite-is-coming-in-ios-18/']
  };
  var G = [];
  function add(g) { g.checkedOn = '29 Oct 2026'; g.status = 'partly'; g.difficulty = g.difficulty || 'Practical'; g.source = g.sources.length ? g.sources[0][1] : ''; G.push(g); }
  var BEFORE = 'Buy, set up and test this BEFORE a crisis. In a crisis shops and offices may be closed. Do not plan on going out to get it.';
  var CALL = 'In danger to life, call 911 (US) or 112 (Portugal) first, if the phone works.';
  var LAW = 'Radio rules change by country and date. Learn the rule for where you live before you transmit. This is not legal advice.';

  add({ id: 'comm-start', area: 'Home skills • Communicate', icon: 'radio',
    title: 'When cell service is down: how to reach people (try these in order)',
    intro: 'Phones fail first in a big storm or outage. This is the order to try, from simplest to hardest. Most of it works with no shop, no office and no internet.',
    first: [
      CALL,
      'Text, do not call. A text uses less network than a call and may get through when a call does not.',
      'Use the family plan: a place to meet, a time to check in, and one person outside the area to call.',
      'Listen first. A battery or crank radio gives you news with no licence and no signal from your phone.'
    ],
    do: [
      'Step 1. Try a text or a message app on Wi-Fi if you still have power and internet.',
      'Step 2. Try a short text message. Wait. Do not send many copies.',
      'Step 3. Walk or drive a short way to the edge of town or high ground. Try again.',
      'Step 4. Turn on a battery or crank radio. Listen for local news and official instructions. See the guide on crank and battery radios.',
      'Step 5. Use a licence-free walkie-talkie to reach family nearby: FRS in the United States, PMR446 in Portugal. See the guide on licence-free walkie-talkies.',
      'Step 6. If you hold a licence, use GMRS (US) or a ham radio. See those guides.',
      'Step 7. Use a mesh radio (Meshtastic) if you and your neighbours set them up before. See that guide.',
      'Step 8. Use satellite texting if you have it and you are outdoors with a clear sky. See that guide.',
      'Step 9. Use paper and signals: a note on the door, a meeting place, a whistle (3 blasts is a common distress signal), a bright cloth.',
      'Step 10. Keep trying at set times. Save the battery.'
    ],
    sections: [
      { h: 'Family check-in card (write this on paper now)', items: [
        'Meeting place near home: ____________',
        'Meeting place outside the area: ____________',
        'Out-of-area contact (name and number): ____________',
        'Check-in times on the radio: ____ and ____ every day',
        'Radio channel (and privacy code, if used): ____________',
        'Who carries which radio: ____________',
        'Keep one copy in each go-bag and one on the fridge.'
      ] }
    ],
    warn: [
      'Do not use a radio to transmit on a frequency you are not allowed to use. Rules differ by country.',
      'Do not transmit during a thunderstorm with an outdoor antenna.',
      'A radio is not private. Anyone listening can hear you.'
    ],
    tip: ['Test every device now. Write down what worked and where.', 'Keep spare batteries, a power bank and a crank charger in the go-bag.'],
    after: ['Write down which methods worked, and where, for next time.'],
    sources: [SRC.fccFrs, SRC.pmr],
    unconfirmed: [NOTE, 'This page is a plan that links the guides below. The order and the check-in card are general practice. The three-blast whistle signal is common advice and we did not find a named source. ' + LAW, GEN] });

  add({ id: 'comm-radio-listen', area: 'Home skills • Communicate', icon: 'radio',
    title: 'Crank, battery and car radios: listen for news (no licence needed to listen)',
    intro: 'A crank or battery radio cannot send. It lets you hear local radio, news and warnings when the phone and internet are gone. Listening needs no licence. ' + BEFORE,
    first: [
      CALL,
      'Keep a radio with fresh batteries or a crank, in the go-bag.',
      'Test it now. Find the stations you can hear at home and write them down.',
      'Listen at set times to save the battery.'
    ],
    do: [
      'Step 1. Turn the radio on and set it to FM. Slowly turn the tuning knob until a station comes in clearly.',
      'Step 2. Write each strong station on your family card. Local stations and their dial numbers are different for every town.',
      'Step 3. Switch to AM. Write down the AM stations that come in clearly. AM can carry farther at night.',
      'Step 4. Learn how long the crank must be turned for one hour of listening. Write it on the radio with tape.',
      'Step 5. Listen to local radio announcers. In a crisis they read official notices: shelters, road closures, water advice, curfews. Write down times and places.',
      'Step 6. United States: many crank radios also receive National Weather Service weather radio, a separate set of channels. Test that button now. Portuguese stations are not listed here because we could not verify them.',
      'Step 7. Listen for the same news on two stations before you act on it.',
      'Step 8. Charge phones only if the radio has a USB port. Crank charging is slow. Use it for a short text.',
      'Step 9. Turn it off when you are not listening.',
      'Step 10. Keep it dry and out of reach of dogs.'
    ],
    warn: ['A crank radio is receive only. You cannot answer.', 'Do not spread rumours you hear. Wait for two sources.', 'Do not run a radio or charger in a room with fumes or a generator.'],
    tip: ['Pick a radio that also has a flashlight, a USB port and a weather band.', 'Keep a spare set of batteries sealed and dry.'],
    after: ['Replace batteries every year. Test on the first day of each month.'],
    sources: [SRC.fccFrs],
    unconfirmed: [NOTE, 'We found no named source for listening rules. Listening to broadcast radio does not need a licence in most places, but we did not confirm that for every country. Weather radio is US only and we did not check the details here. ' + GEN, 'We did not name any local station, because station lists change and we could not verify them.'] });

  add({ id: 'comm-frs-pmr', area: 'Home skills • Communicate', icon: 'radio',
    title: 'Licence-free walkie-talkies: FRS (US) and PMR446 (Portugal)',
    intro: 'Small walkie-talkies let a family stay in touch within a neighbourhood. ' + BEFORE,
    first: [
      CALL,
      'United States: FRS radios need no licence if they stay within the FRS rules.',
      'Portugal and the EU: PMR446 radios are licence-free.',
      'Do not mix them up. An FRS radio is not for use in Europe, and a PMR446 radio is not for use in the US.'
    ],
    do: [
      'Step 1. Pick radios sold for your country: FRS in the US, PMR446 in Portugal.',
      'Step 2. Buy at least two. Buy a charger or spare batteries.',
      'Step 3. Charge them. Put them in the go-bag.',
      'Step 4. Choose one family channel. Write it on a card. Test it now.',
      'Step 5. Press and hold the talk button. Wait one second. Speak. Release to listen.',
      'Step 6. Say who you are and who you call. Keep it short. Say "over" when you finish.',
      'Step 7. Test your range in a safe place. Buildings and hills cut range a lot. Expect a short distance, such as a few streets.',
      'Step 8. Set check-in times. Listen first and keep calls short.',
      'Step 9. Carry the radios together. Turn them off when not in use.',
      'Step 10. If one radio fails, use the other as a spare.'
    ],
    sections: [
      { h: 'United States: what the FRS rules say', items: [
        'No individual licence is needed if you use an approved FRS radio within the FRS rules.',
        'FRS has 22 channels. Power is limited: 2 watts on channels 1 to 7 and 15 to 22, and 0.5 watts on channels 8 to 14.',
        'All 22 channels are shared with GMRS, so you may hear licensed GMRS users.',
        'Since 2017 a radio that goes beyond the FRS power or channel limits counts as GMRS and needs a licence. See the GMRS guide.'
      ] },
      { h: 'Portugal: what we found about PMR446', items: [
        'PMR446 is a European licence-free two-way radio system. A trade paper says compatible radios can be used in Portugal without restriction.',
        'An older Portuguese law (1999) also lists PMR446 radios as exempt. That law is out of date. Rules may have changed.',
        'We could not confirm the current rules on an official Portuguese page. Check before you buy.'
      ] }
    ],
    warn: [
      'Do not use a GMRS or ham radio without the licence. Do not use a radio from another country.',
      'Radios are not private. Do not say addresses or plans you want to keep private.',
      LAW
    ],
    tip: ['Use the same brand for all radios in the family.', 'Write the channel on tape on the back of each radio.'],
    after: ['Replace weak batteries. Test every month.'],
    sources: [SRC.fccFrs, SRC.wikiFrs, SRC.pmr, SRC.portaria],
    unconfirmed: [NOTE, 'The FRS points match an FCC page and a Wikipedia summary as quoted to us. The power figures came from the summary. The PMR446 points come from a Kenwood paper and an older Portuguese law page as quoted to us. We found no ANACOM page. ' + LAW, GEN] });

  add({ id: 'comm-gmrs', area: 'Home skills • Communicate', icon: 'radio',
    title: 'GMRS radios (United States): licence, who it covers, how to use',
    intro: 'GMRS radios reach farther than FRS. They need an FCC licence in the United States. ' + BEFORE,
    first: [
      CALL,
      'You need an FCC licence to transmit on GMRS. Listening does not need one.',
      'One licence covers the holder and the immediate family. The holder must be 18 or older.',
      'GMRS is for the United States. It is not for use in Portugal.'
    ],
    do: [
      'Step 1. Decide if you need more range than FRS. Hills, woods and a farm may need GMRS.',
      'Step 2. Apply for the licence before you transmit. Use the FCC licensing page. Reported: the fee is $35 and the licence lasts 10 years, with no exam (fee cut in April 2022). Fees change, so check the page.',
      'Step 3. Keep your call sign on paper and in the radio case.',
      'Step 4. Buy GMRS radios or a base or car radio. Buy at least two.',
      'Step 5. Choose your family channel. Test range with a family member.',
      'Step 6. Say your call sign at the start and end of a talk. Say it again every 15 minutes as the rules require. Check the current rule.',
      'Step 7. Keep calls short. Do not use GMRS for business or to talk to people outside the family unless the rules allow it.',
      'Step 8. Write your radio plan on the family check-in card.',
      'Step 9. If you hear someone in trouble, tell the emergency services if you can.'
    ],
    warn: [
      'Do not transmit without a licence. Fines apply.',
      'Do not use GMRS in Portugal or another country without checking their rules.',
      'Do not use higher power than your radio is approved for. Do not change the antenna on an FRS radio.',
      LAW
    ],
    tip: ['Learn the channels and the repeaters in your area before a crisis.', 'A licence covers the family. Put family names on the paperwork.'],
    after: ['Renew the licence before it ends. Keep a copy.'],
    sources: [SRC.fccGmrs, SRC.fccFrs, SRC.wikiGmrs],
    unconfirmed: [NOTE, 'That GMRS needs an FCC licence, covers the family, and needs an adult holder matches FCC pages as quoted to us. The $35 fee, 10-year term and no exam come from Wikipedia and shop pages. We did not reach the FCC page, and some shops still show an old $70 fee. The call sign every 15 minutes is a common rule that we did not confirm in this search. ' + LAW, GEN] });

  add({ id: 'comm-ham', area: 'Home skills • Communicate', icon: 'radio',
    title: 'Hand radios and ham (amateur) radio: licence and uses',
    intro: 'Ham radio can reach far when phones and the internet fail. It needs a licence and learning. ' + BEFORE,
    first: [
      CALL,
      'A ham licence is required to transmit. Listening needs none.',
      'You learn the rules and pass a test. Do this before a crisis.',
      'Ham radio is not private and not for business.'
    ],
    do: [
      'Step 1. Decide what you want: nearby voice contact, or long distance.',
      'Step 2. Find a local radio club or a study guide. Learn the rules, the bands and safe operating.',
      'Step 3. United States: the FCC grants amateur licences after an exam. Beginners start with the entry level.',
      'Step 4. Visiting Portugal under 90 days with a US licence: a CEPT arrangement lets US Extra and Advanced licence holders operate for a short stay (US General class falls under a separate novice arrangement). Carry your original FCC licence, your passport and the FCC CEPT notice (DA 16-1048). Say CT1/ before your call sign, then /P if portable (CT7 also mainland; CT3 or CT9 Madeira; CU Azores). One operator report says no notice to ANACOM is needed for a short visit.',
      'Step 4b. Follow the European band plan in Portugal. On 40 metres, voice ends at 7.200 MHz, not 7.300 MHz as in the US. The 60 metre band needs a special ANACOM permission that a CEPT licence does not give.',
      'Step 4c. Living in Portugal over 90 days: one operator reports you need a Portuguese tax number (NIF), then send your passport, proof of residence and your licence or HAREC exam certificate to ANACOM, and pay a first fee of about 15 euros and about 20 euros a year. They report the licence lasts 10 years. This is one person account and fees change.',
      'Step 4d. New Portuguese licences by exam: Lei 22/2026 changed the amateur law (in force 25 August 2026). It was reported to us that minimum ages and minimum waiting times between categories were removed, so the old two-year wait is out of date. You need a National Amateur Certificate from ANACOM, by exam. We could not open the law.',
      'Step 4e. Reported to us by a Portuguese club (ARAL), not checked, and it may change when ANACOM publishes its final rules (due within 120 days of 25 August 2026): Category 3 may now transmit on its own, up to about 10 W on 80 m (3.7 to 3.8 MHz), 40 m (7.1 to 7.2 MHz) and 20 m (14.25 to 14.35 MHz); about 100 W on 10 m (28 to 29.7 MHz); about 50 W on 6 m (51 to 52 MHz), 2 m (144 to 145.806 MHz) and 70 cm (430 to 435 and 438 to 440 MHz). Categories 1 and 2 have wider privileges. Confirm every figure with ANACOM or a Portuguese amateur club before you transmit.',
      'Step 5. Buy a hand radio (handheld) for local contact. Buy a spare battery and a better antenna.',
      'Step 6. Learn the simple rules: say your call sign, keep it short, and do not interfere.',
      'Step 7. Join a local group or net. Practice every week.',
      'Step 8. Keep a printed band plan and a call list in your go-bag.',
      'Step 9. In a crisis, use the radio to pass messages, with permission. Keep a log.',
      'Step 10. Keep a power bank or a small solar panel for the radio.'
    ],
    warn: [
      'Do not transmit without a licence. Do not interfere with emergency traffic.',
      'Do not transmit during a thunderstorm with an outdoor antenna.',
      'Handheld radios with a stock antenna have short range. A better antenna helps.',
      LAW
    ],
    tip: ['Many people find a club the fastest way to learn.', 'A hand radio can also listen to many channels.'],
    after: ['Renew your licence on time. Keep a copy and a call sign card.'],
    sources: [SRC.lei22, SRC.arrl, SRC.anacomHam, SRC.pf5x, SRC.iaru60, SRC.meshHam],
    unconfirmed: [NOTE, 'The US-in-Portugal CEPT points match the ARRL guide as quoted to us (2021). Sources differ on the visit limit: 90 days or three months. The ANACOM page and the operator blog were cited to us and we could not open them. The NIF, HAREC, 15 euro and 20 euro figures, the CT7 prefix and the 10-year term are from that blog only. The removal of waits and ages and the Category 3 band and power figures come from messages relayed to us (the law, annex and an ARAL page were named but we could not open them). A search confirmed only that Lei 22/2026 exists and took effect on 25 August 2026. The final ANACOM technical rules may change the figures. The 7.200 MHz limit is from a video, cited to us. The US exam statement is general knowledge. ' + LAW, GEN] });

  add({ id: 'comm-satellite', area: 'Home skills • Communicate', icon: 'phone',
    title: 'Satellite texting: iPhone and satellite messengers',
    intro: 'Some phones and small devices can send short texts through a satellite when there is no cell signal. They need a clear view of the sky. ' + BEFORE,
    first: [
      CALL,
      'Satellite texting is slow and short. Expect about 177 characters, and it may vary with the signal.',
      'You must be outdoors with a clear sky. Even one bar of poor cell signal can stop it from starting.',
      'Keep the phone charged. Cold drains batteries quickly.'
    ],
    do: [
      'Step 1. Check if your phone supports it. Newer iPhones have Emergency SOS via satellite and Messages via satellite. Check your model and your country before you rely on it.',
      'Step 2. Practice now. Many phones have a demo in settings. Run it outdoors.',
      'Step 3. Learn the steps. Open Messages, or Emergency SOS. The screen shows where to point the phone. Follow it.',
      'Step 4. Go outdoors. Stand where you can see the sky in all directions. Move away from trees, walls and hills.',
      'Step 4b. Android: reported to us, not checked: some newer phones (for example Pixel 9 and Galaxy S25 series) have a Satellite SOS setting, found under Settings, Safety and emergency (Pixel) or Settings, Connections (Samsung), and it depends on your carrier. Check your own phone model and plan now.',
      'Step 5. Hold the phone as the screen shows. Keep still. Satellites move, so you may need to adjust.',
      'Step 6. Write a short message: who, where, what, how many. Send it.',
      'Step 7. Wait. Do not send many copies. Check again later.',
      'Step 8. Satellite messengers: some small devices (such as Garmin inReach) send texts and an SOS by satellite and need a subscription. We found no current prices. Check before you rely on one.',
      'Step 9. Tell family which method you will use and when you will check in.',
      'Step 10. Keep a power bank and a warm pocket for the phone.'
    ],
    warn: [
      'Satellite service may not work indoors, in a car, or with little sky.',
      'Do not count on it as your only plan.',
      'Cold weather can shut the phone down.',
      'It may not be available in your country or on your plan. Check.'
    ],
    tip: ['Write your location in plain words and in coordinates if your phone shows them.', 'Keep messages under 100 characters.'],
    after: ['Practice once every few months.'],
    sources: [SRC.iosSat, SRC.bgrSat],
    unconfirmed: [NOTE, 'The iPhone points (Emergency SOS via satellite, Messages via satellite since iOS 18, point the phone as shown, short messages of about 177 characters, one poor bar can stop it, cold hurts batteries) come from a reviewer page and an article as quoted to us. We did not open them. We found no Garmin price and no current Android status. We did not confirm which countries are covered. ' + GEN] });

  add({ id: 'comm-meshtastic', area: 'Home skills • Communicate', icon: 'radio',
    title: 'Meshtastic: text over a mesh of small radios',
    intro: 'Meshtastic uses small low-cost radios that relay short text messages from one to the next. It needs no cell service and no internet. Everyone in the mesh needs a radio. ' + BEFORE,
    first: [
      CALL,
      'Meshtastic sends short texts and locations. It cannot make phone calls.',
      'It uses licence-free radio bands in most places. The band depends on your country.',
      'Set the correct region on first use. A wrong region can be illegal.'
    ],
    do: [
      'Step 1. Pick a meshtastic radio sold for your region: 915 MHz in North America and 868 MHz in Europe, as the sources said.',
      'Step 2. Buy at least two. Buy a spare battery or power bank.',
      'Step 3. Install the Meshtastic app on your phone. Do this on Wi-Fi now.',
      'Step 4. Turn the radio on. Connect with Bluetooth in the app.',
      'Step 5. Set the region first. Then set a name for the radio.',
      'Step 6. Create a private channel for your family and share it as the app shows.',
      'Step 7. Send a short test message. Move apart and test range. Expect a few kilometres in the open. Hills and buildings cut it.',
      'Step 8. Give a radio to neighbours. More radios make a stronger mesh.',
      'Step 9. Put a radio on a high spot, such as an upper window, to relay better.',
      'Step 10. Set check-in times on the family card.'
    ],
    warn: [
      'In Europe the 868 MHz band has duty cycle limits that vary by country. Learn them.',
      'Do not set a region that is not legal where you are.',
      'Messages on a shared channel can be read by others. Use a private channel and a key.',
      'Do not rely on it for emergencies as your only method.',
      LAW
    ],
    tip: ['Keep radios charged. Turn off unused features to save the battery.', 'A phone app is needed to type messages. Keep it charged.'],
    after: ['Update the firmware only on Wi-Fi, before a crisis.'],
    sources: [SRC.mesh, SRC.meshHam],
    unconfirmed: [NOTE, 'The points that it uses licence-free LoRa bands, 915 MHz in North America and 868 MHz in Europe, a region setting, range of a few kilometres, short texts only, and duty cycle limits in Europe come from a magazine article and community guides as quoted to us. They are not official regulator pages. We did not check the rules for Portugal. ' + LAW, 'A claim of 20 km or more was marketing from a vendor. We do not rely on it.', GEN] });

  add({ id: 'comm-licence-chart', area: 'Home skills • Communicate', icon: 'list',
    title: 'Radio licences at a glance: United States and Portugal',
    intro: 'This chart shows what we found. Rules change. Check the current rule for where you live, before a crisis. ' + LAW,
    first: [
      'Listening needs no licence in most places.',
      'Transmitting may need a licence.',
      'FRS and PMR446 are the licence-free walkie-talkies.',
      'Satellite and mesh devices have their own rules and plans.'
    ],
    do: [
      'Step 1. Find your radio type in the table.',
      'Step 2. Read the licence column.',
      'Step 3. If it says licence, get it before you transmit.',
      'Step 4. If it says not confirmed, do not transmit until you check.'
    ],
    table: { head: ['Device', 'United States', 'Portugal'], rows: [
      ['Crank or battery radio (listen only)', 'No licence to listen', 'No licence to listen (not confirmed)'],
      ['FRS walkie-talkie', 'No licence if it stays within the FRS rules', 'Not for use. Use PMR446 instead'],
      ['PMR446 walkie-talkie', 'Not for use in the US', 'Licence-free, as a trade paper and an older law say. Not confirmed on an official page'],
      ['GMRS radio', 'FCC licence required. Covers the family. Reported $35, 10 years, no exam', 'Not for use'],
      ['Ham (amateur) radio', 'FCC licence required, after an exam', 'Licence required (certificate from ANACOM). US visitors: short stay under CEPT rules. Residents: apply to ANACOM'],
      ['CB (citizens band)', 'Not covered here', 'No licence and no registration since Decreto-Lei 1/2017 (reported to us, not checked). Use channels and power that the general radio rules allow. Rules for channels 6, 7, 24 and 25 not confirmed'],
      ['Meshtastic (LoRa)', 'Licence-free band, set the right region', 'Licence-free band, set the right region. Duty cycle limits. Not confirmed'],
      ['Satellite texting on a phone', 'A phone feature. Check your model and plan', 'A phone feature. Country coverage not confirmed']
    ] },
    warn: ['Do not transmit if the table says licence and you have none.', 'Rules and fees change. Check before you buy.'],
    tip: ['Print this page and keep it with your radios.'],
    after: ['Review this chart once a year.'],
    sources: [SRC.fccFrs, SRC.fccGmrs, SRC.wikiGmrs, SRC.pmr, SRC.portaria, SRC.dl47, SRC.dl1, SRC.lei22, SRC.arrl, SRC.mesh],
    unconfirmed: [NOTE, 'This chart combines points from the other radio guides. We found no official Portuguese page for PMR446. CB: a search summary shows Decreto-Lei 1/2017 exists and dropped registration; we could not open the page. Ham rows are from the ARRL guide and one operator blog. ' + LAW, GEN] });

  /* ---------- PICTURES FOR LESSONS (split from the owner sheets) ---------- */
  function pics(id, list) {
    var g = null, gs = (window.LOAD_CORE && window.LOAD_CORE.guides) || [];
    for (var i = 0; i < gs.length; i++) if (gs[i].id === id) { g = gs[i]; break; }
    if (!g) return;
    g.sections = (g.sections || []).concat(list.map(function (p, k) { return { h: k === 0 ? 'Pictures' : 'Pictures, continued', img: 'assets/pics/les-' + p[0] + '.jpg', alt: p[1], items: [p[2]] }; }));
  }
  var TR = 'Check the rules before you put gear in the water.';
  pics('gr-find-seeds', [
    ['b-seeds-four-fruits-board', 'Seeds from a tomato, a pepper, a cucumber and a pumpkin on a board.', 'Seeds from fruit you already have.'],
    ['b-seeds-wash-strainer', 'Hands rinsing seeds in a strainer under a tap.', 'Rinse the flesh off wet seed.'],
    ['b-seeds-dry-tray', 'Four kinds of seed drying on a paper towel on a tray.', 'Dry the seed in the shade.'],
    ['a-seeds-tomato-plate', 'Tomato seeds and pulp on a plate with a spoon.', 'Scoop tomato seed onto a plate.'],
    ['a-seeds-sorted-towel', 'Four kinds of seed sorted in piles on a paper towel.', 'Sort by kind. Keep each kind apart.'],
    ['a-seeds-germination-dish', 'Seeds with white sprouts on damp paper in a glass dish.', 'The paper towel test: sprouts show a live seed.'],
    ['b-germination-dish', 'Seeds with small white sprouts on a damp towel in a glass bowl.', 'Count the seeds that sprout.']]);
  pics('gr-save-seed-steps', [
    ['a-seed-jars', 'Glass jars filled with different seeds on a table.', 'Store seed in sealed, labelled jars.'],
    ['b-seeds-dry-tray', 'Seeds drying on a paper towel on a tray.', 'Dry seed fully before you store it.']]);
  pics('gr-indoor-garden', [
    ['a-pots-drainage-tray', 'Reused tubs with holes in the bottom on a tray, with plants growing.', 'Reused tubs with holes make good pots.'],
    ['b-reused-tubs-plants', 'Reused white and grey tubs with young plants on a windowsill.', 'Reused tubs on a sill.'],
    ['b-fill-tub-soil', 'Hands filling a reused tub with soil.', 'Fill a pot with moist potting mix.'],
    ['a-mix-soil-perlite-coir', 'Piles of soil, white perlite and brown coir.', 'A potting mix: soil, an airy part and a moisture part.'],
    ['a-light-foil-reflector', 'Pots in a window with a sheet of foil behind them to bounce light.', 'Foil behind plants bounces light onto them.'],
    ['b-window-foil-pots', 'Several pots of salad plants in a window with foil behind them.', 'Foil behind pots in a window.'],
    ['a-light-desk-lamp', 'A desk lamp over three young seedlings in pots.', 'A desk lamp can add light.'],
    ['b-lamp-lettuce-trays', 'A desk lamp over trays of lettuce and seedlings.', 'A lamp over lettuce trays. Needs power.'],
    ['a-herbs-on-sill', 'Herbs in pots and jars on a sunny windowsill.', 'Herbs on a sunny sill.'],
    ['b-tomato-lettuce-tubs', 'A tomato plant with ripe fruit and a lettuce plant in reused tubs.', 'Tomato and lettuce in large tubs.']]);
  pics('gr-regrow-scraps', [
    ['a-regrow-green-onion-jar', 'Green onions with roots in a jar of water on a windowsill.', 'Green onions in a jar.'],
    ['a-regrow-lettuce-base', 'A lettuce base with new leaves in a shallow dish of water.', 'A lettuce base gives a few new leaves.'],
    ['b-regrow-three-jars', 'Green onion, celery and lettuce bases in three jars of water.', 'Three bases in water.'],
    ['a-potato-sprouted-growbag', 'Sprouted potatoes beside a fabric bag with young plants.', 'Sprouted potatoes. Do not eat green parts.']]);
  pics('gr-sprouts', [['a-sprout-jar', 'A jar of sprouts with a cloth lid beside a jar of seeds.', 'A sprouting jar with a cloth lid.']]);
  pics('gr-lettuce-indoors', [['a-lettuce-tray', 'A shallow tray of lettuce and herbs on a counter.', 'A shallow tray of lettuce.']]);
  pics('gr-potato-container', [['a-potato-sprouted-growbag', 'Sprouted potatoes beside a fabric grow bag.', 'Seed potatoes and a grow bag.']]);
  pics('diet-plant-based', [
    ['a-legumes-tofu-bowls', 'Bowls of lentils, chickpeas, nuts, tofu and greens.', 'Plant protein: lentils, chickpeas, nuts, tofu.'],
    ['b-jars-legumes-grains', 'Jars of beans, grains and seeds beside kale and nuts.', 'Store beans and grains in jars.'],
    ['b-eggs-dairy-tofu', 'Eggs, milk, yogurt, tofu, nuts and greens on a table.', 'Vegetarian foods: eggs, milk, yogurt, tofu.'],
    ['a-chickpea-stew', 'A bowl of chickpea and vegetable stew with rice.', 'A chickpea stew (vegan).'],
    ['a-avocado-egg-bowl', 'A bowl of grains, greens, avocado and halved eggs.', 'A grain bowl with egg (vegetarian).'],
    ['a-veg-grain-bowl', 'A bowl of grains, kale, sweet potato and chickpeas.', 'A vegetable and grain bowl (vegan).'],
    ['a-fish-potato-plate', 'A plate of fish with potatoes and salad.', 'A fish meal (pescatarian).'],
    ['b-canned-fish-seaweed', 'Tinned fish, salmon, seaweed, grains and vegetables.', 'Pescatarian stock: tinned fish and seaweed.']]);
  pics('eat-stretch-food', [['b-staples-potatoes-rice-oats', 'Bowls of rice, oats and grains with potatoes and sweet potato.', 'Staples that stretch: rice, oats, potatoes.']]);
  pics('trap-fish-bottle', [
    ['a-bottle-trap-dock', 'A plastic bottle with holes lying on a wooden dock.', 'A bottle model with holes. ' + TR],
    ['b-bottle-trap-tube-water', 'A bottle with a funnel and a tube on a dock by water.', 'A bottle funnel model. ' + TR],
    ['b-bottle-netting-water', 'A bottle wrapped in netting on a dock by water.', 'A bottle with netting. ' + TR]]);

  if (window.LOAD_CORE && window.LOAD_CORE.guides) {
    G.forEach(function (g) { window.LOAD_CORE.guides.push(g); });
  }
})();
