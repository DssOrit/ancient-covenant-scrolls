/* Place guides: Portugal (Lisboa, Porto, Coimbra, Setubal) and the United States (California: Los Angeles, San Pedro, Palmdale, Valencia;
   Florida: Jacksonville, Orlando; South Carolina: Conway; Ohio statewide). 12 guides built from one template and per-place facts.
   Written 29 Oct 2026 from search results. The official pages could not be opened from where this was written, so every guide is Partly checked.
   Store names are common chains in each region, from general knowledge. We did not check that a branch exists near you or what is in stock. */
(function () {
  var NOTE = 'We read search results about these pages. We could not open the pages themselves, so they are cited to us, not checked by us.';
  var STORENOTE = 'Store names are common chains in this region, from general knowledge. We did not check that a branch is near you, its hours, or its stock. Find the nearest branch on the chain website.';
  var WATERNOTE = 'Water body names are general geography. We did not check access, fishing or camping rules. Treat all natural water before you drink it, and check the local rules first.';
  var MAPNOTE = 'The map link needs internet. For offline maps of Portugal, open Load Maps from this site.';

  /* DIY steps by hazard. These are common preparedness steps. Where a named source is quoted for a place it is in that place sources. */
  var DIY = {
    quake: ['Earthquake: strap the water heater to the wall studs, fix tall furniture and the TV to the wall, and keep heavy items on low shelves.', 'Earthquake: keep shoes and a flashlight by every bed. Practice Drop, Cover, Hold On. Near the coast, move uphill when the shaking stops.'],
    wildfire: ['Wildfire: clear dead leaves, dry grass and low branches from around the home. Keep gutters and the roof free of leaves.', 'Wildfire: keep a go-bag by the door, know two ways out, keep a hose and buckets ready, and leave early when told.'],
    heat: ['Heat: shade the windows that face the sun, keep a cool room, drink water often, and check on older neighbours. See the heat wave guide.'],
    wind: ['High wind: bring in or tie down outdoor furniture and bins. Keep trees trimmed back from the house and power lines. Expect power cuts.'],
    flood: ['Flood: know your low spots. Raise valuables off the floor. Keep sandbags, plastic sheeting and a shovel ready. Never drive through floodwater.'],
    hurricane: ['Hurricane: know your evacuation zone and route. Keep plywood or shutters sized for your windows. Bring in outdoor items. Fill the car with fuel and water containers 48 hours before.'],
    tornado: ['Tornado: pick the lowest floor and an inside room with no windows. Keep shoes, a flashlight, a whistle and helmets there. Practice twice a year.'],
    winter: ['Winter storm: insulate exposed pipes, keep a car kit with blankets and a shovel, and know how to heat one room safely. See the staying warm guides.'],
    smoke: ['Smoke: keep N95 or FFP2 masks. Keep windows shut. Make one room with a clean-air filter.'],
    tsunami: ['Tsunami: know your uphill route on foot. Do not wait for an official alert if the shaking is strong or long.'],
    river: ['River flood: know the river level that floods your road. Move to higher ground early. Keep documents in a waterproof bag.']
  };
  var EXT = { quake: 'g-earthquake-tsunami', wildfire: 'g-wildfire', heat: 'g-heat-wave', flood: 'g-flood', hurricane: 'g-hurricane', tornado: 'g-tornado', winter: 'g-winter-storm', wind: 'g-power-outage', smoke: 'g-wildfire', tsunami: 'g-earthquake-tsunami', river: 'g-flood' };

  var US_STORES = {
    CA: [['Groceries', 'Ralphs, Vons, Albertsons, Smart & Final, Walmart, Target, Costco'], ['Hardware and tools', 'Home Depot, Lowe’s, Ace Hardware, Harbor Freight'], ['Outdoor and camping', 'REI, Big 5 Sporting Goods, Walmart'], ['Pharmacy', 'CVS, Walgreens'], ['Pets', 'Petco, PetSmart'], ['Farm and feed', 'Tractor Supply (outer areas)']],
    FL: [['Groceries', 'Publix, Winn-Dixie, Walmart, Aldi, Costco'], ['Hardware and tools', 'Home Depot, Lowe’s, Ace Hardware, Harbor Freight'], ['Outdoor and camping', 'Bass Pro Shops, Academy Sports, Walmart'], ['Pharmacy', 'CVS, Walgreens, Publix Pharmacy'], ['Pets', 'Petco, PetSmart'], ['Farm and feed', 'Tractor Supply']],
    SC: [['Groceries', 'Food Lion, Publix, Walmart, Aldi'], ['Hardware and tools', 'Lowe’s, Home Depot, Ace Hardware, Harbor Freight'], ['Outdoor and camping', 'Academy Sports, Walmart'], ['Pharmacy', 'CVS, Walgreens'], ['Pets', 'Petco, PetSmart'], ['Farm and feed', 'Tractor Supply']],
    OH: [['Groceries', 'Kroger, Meijer, Giant Eagle, Walmart, Aldi, Costco'], ['Hardware and tools', 'Menards, Lowe’s, Home Depot, Harbor Freight'], ['Outdoor and camping', 'Dick’s Sporting Goods, Cabela’s, Walmart'], ['Pharmacy', 'CVS, Walgreens, Kroger Pharmacy'], ['Pets', 'Petco, PetSmart'], ['Farm and feed', 'Tractor Supply']],
    PT: [['Groceries', 'Continente, Pingo Doce, Auchan, Lidl'], ['Hardware and tools', 'Leroy Merlin, IKEA Portugal'], ['Outdoor and camping', 'Decathlon'], ['Electronics and power', 'Worten, FNAC'], ['Pharmacy', 'Farmácia (medicines are sold only here)'], ['Pets', 'Tiendanimal, Kiwoko, Zooplus.pt']]
  };
  var SRC = {
    laAlert: ['Los Angeles County: Alert LA County sign-up (alert.lacounty.gov), cited to us, not checked', 'https://alert.lacounty.gov'],
    laReady: ['Los Angeles County: Ready LA County', 'https://ready.lacounty.gov'],
    sc: ['City of Santa Clarita: emergency preparedness information, cited to us, not checked', 'https://santaclarita.gov/emergency-management/preparedness-information/'],
    rsg: ['LA County Fire: Ready! Set! Go! wildfire action plan (LACounty.gov/RSG), cited to us, not checked', 'https://lacounty.gov/RSG'],
    jax: ['City of Jacksonville: know your evacuation zone, cited to us, not checked', 'https://www.jacksonville.gov/welcome/news/know-your-evacuation-zone'],
    orange: ['Orange County Florida: storm information and OCAlert (ocfl.net/storm), cited to us, not checked', 'https://www.ocfl.net/storm'],
    conway: ['City of Conway: hurricane preparedness, cited to us, not checked', 'https://cityofconway.com/hurricane_preparedness'],
    horry: ['Horry County: Emergency Management, cited to us, not checked', 'https://www.horrycountysc.gov/departments/emergency-management'],
    scemd: ['South Carolina Emergency Management Division (scemd.org), cited to us, not checked', 'https://www.scemd.org'],
    ohio: ['Ohio Emergency Management Agency, cited to us, not checked', 'https://ema.ohio.gov'],
    nws: ['National Weather Service', 'https://www.weather.gov'],
    ready: ['Ready.gov', 'https://www.ready.gov'],
    prociv: ['Proteção Civil (ANEPC), Portugal, cited to us, not checked', 'https://prociv.gov.pt'],
    ipma: ['IPMA: weather warnings, Portugal, cited to us, not checked', 'https://www.ipma.pt/pt/otempo/prev-sam/'],
    dgs: ['DGS: Direção-Geral da Saúde, Portugal, cited to us, not checked', 'https://www.dgs.pt'],
    ccdr: ['CCDR-LVT: sector diagnosis of civil protection risks, Lisbon region (2010 PDF), cited to us, not checked', 'https://www.ccdr-lvt.pt/wp-content/uploads/2022/02/diagnostico-sectorial-riscos-proteccao-civil.pdf']
  };

  var P = [
    { id: 'place-pt-lisboa', area: 'Places • Portugal', icon: 'compass', name: 'Lisboa, Portugal', stores: 'PT', lat: 38.722, lng: -9.139, zoom: 11,
      hazards: ['quake', 'tsunami', 'flood', 'heat', 'wildfire'],
      alerts: ['Call 112 in an emergency. SNS 24 health line: 808 24 24 24.', 'IPMA weather warnings use yellow, orange and red levels (ipma.pt).', 'Your city council runs a municipal civil protection service. Find its number on the Lisboa council website.', 'ANEPC runs the national civil protection service (prociv.gov.pt).'],
      local: ['Lisbon is described in a news report as one of the European capitals with the highest earthquake risk, with the Tagus Valley fault zone near the city. The regional diagnosis lists earthquakes, fast floods, coastal erosion and industrial accidents as high-destruction hazards for the Lisbon metropolitan area.', 'The national earthquake drill "A Terra Treme" involved the councils of Lisboa, Porto, Coimbra and Faro, per a news report.', 'Old buildings and narrow streets: know the exit and an open space near you.'],
      water: ['Tejo (Tagus) estuary and river', 'Rio Trancão', 'Rio Sorraia and the Tagus plain upstream'],
      sources: [SRC.prociv, SRC.ipma, SRC.dgs, SRC.ccdr], extra: ['The earthquake risk statements come from news reports and a 2010 regional diagnosis quoted to us. We did not open them.', 'We did not find the Lisboa council civil protection contact numbers. Find them on the council site.'] },
    { id: 'place-pt-porto', area: 'Places • Portugal', icon: 'compass', name: 'Porto, Portugal', stores: 'PT', lat: 41.157, lng: -8.629, zoom: 11,
      hazards: ['flood', 'wind', 'heat', 'wildfire', 'quake'],
      alerts: ['Call 112 in an emergency. SNS 24 health line: 808 24 24 24.', 'IPMA weather warnings use yellow, orange and red levels (ipma.pt).', 'Your city council runs a municipal civil protection service. Find its number on the Porto council website.', 'ANEPC runs the national civil protection service (prociv.gov.pt).'],
      local: ['Porto took part in the national earthquake drill "A Terra Treme", per a news report.', 'Atlantic storms bring heavy rain, flooding and falling trees in coastal Portugal. Follow IPMA warnings.'],
      water: ['Rio Douro', 'Atlantic coast beaches'],
      sources: [SRC.prociv, SRC.ipma, SRC.dgs], extra: ['We did not find hazard information specific to Porto in our search. The hazards listed are the national ones.', 'We did not find the Porto council civil protection numbers.'] },
    { id: 'place-pt-coimbra', area: 'Places • Portugal', icon: 'compass', name: 'Coimbra, Portugal', stores: 'PT', lat: 40.211, lng: -8.429, zoom: 11,
      hazards: ['flood', 'wildfire', 'heat', 'quake'],
      alerts: ['Call 112 in an emergency. SNS 24 health line: 808 24 24 24.', 'IPMA weather warnings use yellow, orange and red levels (ipma.pt).', 'Your city council runs a municipal civil protection service. Find its number on the Coimbra council website.', 'ANEPC runs the national civil protection service (prociv.gov.pt).'],
      local: ['Coimbra took part in the national earthquake drill "A Terra Treme", per a news report.', 'Rural fire risk is high in central Portugal in summer. Check the IPMA fire danger map.'],
      water: ['Rio Mondego'],
      sources: [SRC.prociv, SRC.ipma, SRC.dgs], extra: ['We did not find hazard information specific to Coimbra in our search. The hazards listed are the national ones.', 'We did not find the Coimbra council civil protection numbers.'] },
    { id: 'place-pt-setubal', area: 'Places • Portugal', icon: 'compass', name: 'Setúbal, Portugal', stores: 'PT', lat: 38.524, lng: -8.893, zoom: 11,
      hazards: ['quake', 'tsunami', 'heat', 'wildfire', 'flood'],
      alerts: ['Call 112 in an emergency. SNS 24 health line: 808 24 24 24.', 'IPMA weather warnings use yellow, orange and red levels (ipma.pt).', 'Your city council runs a municipal civil protection service. Find its number on the Setúbal council website.', 'ANEPC runs the national civil protection service (prociv.gov.pt).'],
      local: ['Setúbal is on the coast, so know your uphill route for a tsunami. Portugal coast is at tsunami risk, per the app earthquake and tsunami guide.', 'Setúbal fire services date from 1786, per a university chronology. This is history, not a current contact.'],
      water: ['Rio Sado and its estuary', 'Atlantic coast and Arrábida beaches'],
      sources: [SRC.prociv, SRC.ipma, SRC.dgs], extra: ['We did not find hazard information specific to Setúbal in our search. The hazards listed are the national ones.', 'We did not find the Setúbal council civil protection numbers.'] },

    { id: 'place-ca-losangeles', area: 'Places • California', icon: 'compass', name: 'Los Angeles (city), California', stores: 'CA', lat: 34.052, lng: -118.244, zoom: 10,
      hazards: ['quake', 'wildfire', 'wind', 'heat', 'smoke', 'flood'],
      alerts: ['Call 911 in an emergency.', 'Alert LA County: free sign-up at alert.lacounty.gov. Landlines are included. Cell phone, VoIP and email must be registered. Without internet, call 211 or 1-888-435-7565.', 'City of Los Angeles also runs NotifyLA (sign up with Everbridge). Check whether your city has its own system as well as the county one.', 'Turn on Wireless Emergency Alerts in your phone settings.'],
      local: ['Southern California: earthquakes, wildfire, high Santa Ana winds and heat.', 'Fires can bring floods and debris flows in the next rain. Follow county notices.'],
      water: ['Los Angeles River (mostly a concrete channel)', 'Pacific Ocean beaches', 'Local reservoirs (access is usually closed)'],
      sources: [SRC.laAlert, SRC.laReady, SRC.rsg, SRC.nws], extra: ['The Alert LA County details come from a 2018 county brochure and news guides quoted to us. Check the county site for current details.'] },
    { id: 'place-ca-sanpedro', area: 'Places • California', icon: 'compass', name: 'San Pedro, Los Angeles, California', stores: 'CA', lat: 33.736, lng: -118.292, zoom: 12,
      hazards: ['quake', 'tsunami', 'heat', 'wind', 'wildfire', 'flood'],
      alerts: ['Call 911 in an emergency.', 'San Pedro is part of the City of Los Angeles. Sign up for Alert LA County (alert.lacounty.gov) and NotifyLA.', 'Without internet, call 211 or 1-888-435-7565 to register for Alert LA County.', 'Turn on Wireless Emergency Alerts in your phone settings.'],
      local: ['San Pedro is a harbour area on the coast. Know your uphill route in case of a tsunami warning, and know where the nearest high ground is.', 'We did not find an official source on tsunami zones for San Pedro. Check the California tsunami hazard map.'],
      water: ['Pacific Ocean and the Port of Los Angeles', 'Cabrillo Beach and the marina'],
      sources: [SRC.laAlert, SRC.laReady, SRC.nws], extra: ['Tsunami exposure for San Pedro is our reading of its coastal position. We did not find a named source.'] },
    { id: 'place-ca-palmdale', area: 'Places • California', icon: 'compass', name: 'Palmdale, California', stores: 'CA', lat: 34.579, lng: -118.116, zoom: 11,
      hazards: ['heat', 'wind', 'quake', 'wildfire', 'flood', 'winter'],
      alerts: ['Call 911 in an emergency.', 'Alert LA County: free sign-up at alert.lacounty.gov. Without internet, call 211 or 1-888-435-7565.', 'Sheriff advisories give flood, wind and evacuation notices. Follow the sheriff station and the National Weather Service.', 'Turn on Wireless Emergency Alerts in your phone settings.'],
      local: ['Antelope Valley high desert: very hot summers, strong winds, cold nights, and rain that can bring flash floods.', 'The National Weather Service has issued Extreme Heat Warnings for the Antelope Valley with highs of 102 to 110 F, per search results.', 'Past sheriff advisories said sandbags are available at local fire stations, limited to 10 per resident, and not to drive around road-closed barricades. These notices were from 2019 to 2024. Check the current ones.'],
      water: ['Lake Palmdale and the California Aqueduct (restricted, not for drinking or swimming)', 'Dry washes that flood fast in rain'],
      sources: [SRC.laAlert, SRC.laReady, SRC.nws], extra: ['We did not find an earthquake or San Andreas preparedness page for Palmdale in our search. The earthquake steps are general.', 'The sandbag and heat notices are from past advisories and news. Check the current ones.'] },
    { id: 'place-ca-valencia', area: 'Places • California', icon: 'compass', name: 'Valencia (Santa Clarita), California', stores: 'CA', lat: 34.44, lng: -118.6, zoom: 12,
      hazards: ['wildfire', 'quake', 'wind', 'heat', 'flood', 'smoke'],
      alerts: ['Call 911 in an emergency.', 'City of Santa Clarita Nixle: text SCEMERGENCY to 888777 for free city alerts.', 'Genasys ALERT is the County of Los Angeles system. Download the free app and register your home address.', 'In a large incident the city opens SantaClaritaEmergency.com with news, maps, evacuation orders and road closures.', 'LA County Fire: Ready! Set! Go! wildfire action plan at LACounty.gov/RSG.'],
      local: ['Wildfire: clear dead vegetation and trim trees to create defensible space. Keep emergency kits at home and in the car.', 'The city page covers earthquakes, wildfires, storms, hazardous materials and power outages.'],
      water: ['Santa Clara River', 'Castaic Lake and Castaic Lagoon', 'Bouquet Canyon and Saugus area streams (seasonal)'],
      sources: [SRC.sc, SRC.rsg, SRC.laAlert, SRC.nws], extra: ['The Nixle and Genasys details come from a search summary of city and county pages. Check them.', 'We did not find earthquake-specific details on the city page.'] },

    { id: 'place-fl-jacksonville', area: 'Places • Florida', icon: 'compass', name: 'Jacksonville, Florida', stores: 'FL', lat: 30.332, lng: -81.656, zoom: 10,
      hazards: ['hurricane', 'flood', 'heat', 'tornado', 'wind'],
      alerts: ['Call 911 in an emergency.', 'JaxReady: the Duval County website and app for alerts, shelters and your evacuation zone. Look up your zone with the address search at maps.coj.net/evsearch.', 'The app uses your GPS position. If you are not at home, search your home address to see your own zone.', 'Duval uses 6 evacuation zones, A to F. Zones A and B are mandatory evacuations when ordered, per a local report. Zones are not the same as flood zones.'],
      local: ['Hurricane storm surge and flooding along the St. Johns River and the coast.', 'Zone orders are case by case. In 2016 Zone C was added to the order for one storm.'],
      water: ['St. Johns River', 'Atlantic Ocean and Intracoastal Waterway', 'Trout River and Ortega River'],
      sources: [SRC.jax, SRC.nws, SRC.ready], extra: ['The zone details come from city pages for 2016 and 2017, a 2026 news piece, and a county map tool quoted to us. Check JaxReady for current maps.'] },
    { id: 'place-fl-orlando', area: 'Places • Florida', icon: 'compass', name: 'Orlando, Florida', stores: 'FL', lat: 28.538, lng: -81.379, zoom: 10,
      hazards: ['hurricane', 'flood', 'tornado', 'heat', 'wind'],
      alerts: ['Call 911 in an emergency.', 'OCAlert: free county alerts at OCAlert.net. You can choose phone, text or email, and the county can target a neighbourhood.', 'OCFL Alert app: shelters, water and ice distribution points, evacuation routes.', 'Orange County Office of Emergency Management: 407-836-9140. Storm page: ocfl.net/storm.'],
      local: ['Inland city: wind, heavy rain, flooding, lightning and tornadoes from hurricanes. Power cuts can last days.', 'Heat and thunderstorms in summer.'],
      water: ['Lake Eola and many city lakes', 'Lake Apopka', 'St. Johns River (east)'],
      sources: [SRC.orange, SRC.nws, SRC.ready], extra: ['The OCAlert details come from county news releases of 2017, 2024 and 2025. Check ocfl.net/storm.'] },

    { id: 'place-sc-conway', area: 'Places • South Carolina', icon: 'compass', name: 'Conway, South Carolina', stores: 'SC', lat: 33.836, lng: -79.048, zoom: 11,
      hazards: ['hurricane', 'river', 'flood', 'tornado', 'winter', 'heat'],
      alerts: ['Call 911 in an emergency.', 'Horry County Emergency Management: 843-915-5150. Page: horrycountysc.gov/departments/emergency-management.', 'City of Conway hurricane page: cityofconway.com/hurricane_preparedness. City hall: 843-248-1760.', 'Look up your evacuation zone with the South Carolina Emergency Management Division (scemd.org). Road closures: 511sc.org.', 'Local TV: WMBF, WPDE and WBTW. Radio: WHMC 90.1 FM and WYAV 104.1 FM.'],
      local: ['The Waccamaw River floods slowly after hurricanes. Flood stage is 11 ft. It reached 12.3 ft in August 2025 and a record 17.89 ft in Hurricane Matthew in 2016.', 'Hurricane evacuation routes named in a 2023 guide: Highway 17 Bypass, US 501, and SC 544 and 9.', 'In 2019 the city of Conway was not in an evacuation zone, so county zone orders did not apply to city residents. Conway runs its own operations centre. Check each storm.', 'Ice storms are possible in winter.'],
      water: ['Waccamaw River', 'Lake Busbee and nearby lakes', 'Atlantic coast beaches (about 20 miles away)'],
      sources: [SRC.conway, SRC.horry, SRC.scemd, SRC.nws], extra: ['The contact numbers and routes come from a 2023 local guide and a 2019 city notice quoted to us. Check the county page for current ones.', 'River heights come from news and National Weather Service figures quoted to us.'] },

    { id: 'place-oh-ohio', area: 'Places • Ohio', icon: 'compass', name: 'Ohio (statewide)', stores: 'OH', lat: 40.4, lng: -82.8, zoom: 7,
      hazards: ['tornado', 'winter', 'flood', 'heat', 'wind'],
      alerts: ['Call 911 in an emergency.', 'Ohio Emergency Management Agency: ema.ohio.gov. Severe weather can happen any time of year, including tornadoes in February and ice storms.', 'Ohio holds a statewide tornado drill each March, during Severe Weather Awareness Week.', 'A Watch means be prepared. A Warning means act now.', 'Make sure you have a way to get warnings overnight, such as a weather radio or phone alerts.'],
      local: ['Flash floods can develop in minutes. Trim loose branches near the house and secure outdoor items.', 'Lake Erie and the north: lake-effect snow and winter storms. The south: Ohio River floods.'],
      water: ['Lake Erie', 'Ohio River', 'Scioto River, Great Miami River, Cuyahoga River and Maumee River', 'Many county lakes and reservoirs'],
      sources: [SRC.ohio, SRC.nws, SRC.ready], extra: ['Our search did not return the official Ohio EMA pages. The points come from news coverage of Ohio EMA advice. Check ema.ohio.gov.', 'Lake-effect snow and Ohio River flooding are general knowledge. We did not find a named source.'] }
  ];

  var G = P.map(function (p) {
    var i;
    var hz = p.hazards.map(function (h) { return DIY[h]; });
    var diy = [].concat.apply([], hz);
    var stores = US_STORES[p.stores];
    var osm = 'https://www.openstreetmap.org/#map=' + p.zoom + '/' + p.lat + '/' + p.lng;
    var rel = [];
    p.hazards.forEach(function (h) { if (EXT[h] && rel.indexOf(EXT[h]) < 0) rel.push(EXT[h]); });
    return {
      id: p.id, area: p.area, icon: 'compass', difficulty: 'Local', status: 'partly', checkedOn: '29 Oct 2026', place: p.id,
      title: p.name + ': hazards, alerts, stores and DIY',
      intro: 'What to expect, who tells you, where to buy supplies, and what you can do yourself, for ' + p.name + '. ' + MAPNOTE,
      first: [
        'Sign up for the local alerts below today, before you need them.',
        'Know your evacuation route and where you will go. Write it down.',
        'Keep your go-bag, water, medicines and papers ready. See the lists in this app.',
        p.stores === 'PT' ? 'Emergency: 112. Health line: SNS 24, 808 24 24 24.' : 'Emergency: 911. Keep paper copies of local numbers.'
      ],
      do: p.alerts,
      sections: [
        { h: 'Local hazards', items: ['Main hazards here: ' + p.hazards.join(', ') + '.'].concat(p.local) },
        { h: 'DIY: things you can do yourself', items: diy },
        { h: 'Water sources near you', items: p.water.concat(['Water from a river, lake or well must be treated before you drink it. See the water guides in this app. ' + WATERNOTE]) },
        { h: 'Off-grid resources', items: ['Learn the local rules on rain barrels, wells, burning wood and fuel storage before you build anything. Ask the city or county.', 'See the Power supplies guides for batteries, solar and generators, and the Home power calculator.', 'Keep a hand-crank radio. Keep one tank of fuel safely stored.'] },
        { h: 'Map', items: ['A map of this place is linked in the Sources list below. It needs internet.', 'Offline maps of Portugal: open Load Maps from this site (the Load Maps site is separate).'] }
      ],
      warn: ['Do not depend on this page for live alerts. It cannot detect emergencies. Check the official channels above.', 'Follow evacuation orders at once.'],
      tip: ['Print the numbers and the route and keep them in the go-bag.', 'Make a plan with your neighbours.'],
      after: ['Check on neighbours. Do not return until officials say it is safe.'],
      table: { head: ['Type of store', 'Common chains'], rows: stores },
      sources: p.sources.concat([['Open map (internet needed)', osm]]),
      source: p.sources[0][1],
      unconfirmed: [NOTE, STORENOTE, WATERNOTE].concat(p.extra, ['The DIY steps are common preparedness steps. The named sources for each hazard are on the related guides, for example the earthquake, wildfire, flood, hurricane and heat guides.']),
      related: rel
    };
  });

  if (window.LOAD_CORE && window.LOAD_CORE.guides) {
    G.forEach(function (g) { window.LOAD_CORE.guides.push(g); });
  }
  window.LOAD_PLACES = {
    portugal: ['place-pt-lisboa', 'place-pt-porto', 'place-pt-coimbra', 'place-pt-setubal'],
    us: [
      { state: 'California', ids: ['place-ca-losangeles', 'place-ca-sanpedro', 'place-ca-palmdale', 'place-ca-valencia'] },
      { state: 'Florida', ids: ['place-fl-jacksonville', 'place-fl-orlando'] },
      { state: 'South Carolina', ids: ['place-sc-conway'] },
      { state: 'Ohio', ids: ['place-oh-ohio'] }
    ],
    names: P.reduce(function (o, p) { o[p.id] = p.name.split(',')[0]; return o; }, {})
  };
})();
