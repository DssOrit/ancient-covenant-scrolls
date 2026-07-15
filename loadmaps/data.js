/* Load Maps — data (Stage 1)
   Catalog places use REAL, checkable coordinates for the destination.
   The guided route's waypoints are marked approximate where noted — fine-tune on site.
   Emergency number 112 is the single Europe-wide number for all six countries. */

var LM = {};

LM.countries = [
  { cc:'PT', name:'Portugal' },
  { cc:'ES', name:'Spain' },
  { cc:'GB', name:'United Kingdom' },
  { cc:'FR', name:'France' },
  { cc:'IT', name:'Italy' },
  { cc:'GR', name:'Greece' }
];

/* Per-country emergency number. Each place uses its own country's number.
   Only verified numbers are listed; anything not listed falls back to 112.
   When a new country is added, add its verified number here too. */
LM.EMERGENCY_DEFAULT = '112';
LM.emergencyByCC = {
  // Europe — 112 is the single EU-wide emergency number (also works in the UK)
  PT:'112', ES:'112', GB:'112', FR:'112', IT:'112', GR:'112',
  DE:'112', IE:'112', NL:'112', BE:'112', AT:'112', CH:'112',
  SE:'112', NO:'112', DK:'112', FI:'112', PL:'112', CZ:'112', HR:'112',
  // Elsewhere — single national emergency numbers (verified)
  US:'911', CA:'911', MX:'911', AU:'000', NZ:'111'
};
LM.emergencyFor = function(cc){ return (LM.emergencyByCC && LM.emergencyByCC[cc]) || LM.EMERGENCY_DEFAULT; };

LM.places = [
  // ---------- Portugal ----------
  { id:'pt-belem',   name:'Belém Tower',            area:'Lisbon, Portugal',   cc:'PT', lat:38.6916, lng:-9.2160, blurb:'16th-century riverside fortress on the Tagus.' },
  { id:'pt-jeronimos',name:'Jerónimos Monastery',  area:'Lisbon, Portugal',   cc:'PT', lat:38.6979, lng:-9.2065, blurb:'Grand Manueline monastery beside Belém.' },
  { id:'pt-pena',    name:'Pena Palace',            area:'Sintra, Portugal',   cc:'PT', lat:38.7876, lng:-9.3906, blurb:'Colourful romantic palace above Sintra.' },
  { id:'pt-lello',   name:'Livraria Lello',         area:'Porto, Portugal',    cc:'PT', lat:41.1470, lng:-8.6150, blurb:'Ornate historic bookshop in central Porto.' },
  { id:'pt-coimbra', name:'University of Coimbra',  area:'Coimbra, Portugal',  cc:'PT', lat:40.2077, lng:-8.4256, blurb:'Ancient university and the Joanina Library.' },
  { id:'pt-benagil', name:'Benagil Sea Cave',       area:'Algarve, Portugal',  cc:'PT', lat:37.0876, lng:-8.4270, blurb:'Sea cave with a natural skylight.' },
  { id:'pt-douro',   name:'Douro Valley',           area:'Pinhão, Portugal',   cc:'PT', lat:41.1896, lng:-7.5541, blurb:'Terraced vineyards along the Douro river.' },

  // ---------- Spain ----------
  { id:'es-sagrada', name:'Sagrada Família',        area:'Barcelona, Spain',   cc:'ES', lat:41.4036, lng:2.1744, blurb:"Gaudí's unfinished basilica." },
  { id:'es-guell',   name:'Park Güell',             area:'Barcelona, Spain',   cc:'ES', lat:41.4145, lng:2.1527, blurb:'Gaudí mosaic park over the city.' },
  { id:'es-alhambra',name:'Alhambra',               area:'Granada, Spain',     cc:'ES', lat:37.1761, lng:-3.5881, blurb:'Moorish palace and fortress complex.' },
  { id:'es-palace',  name:'Royal Palace',           area:'Madrid, Spain',      cc:'ES', lat:40.4179, lng:-3.7143, blurb:"Spain's grand royal palace." },
  { id:'es-mezquita',name:'Mosque-Cathedral',       area:'Córdoba, Spain',     cc:'ES', lat:37.8790, lng:-4.7794, blurb:'Vast arched hall of the Mezquita.' },
  { id:'es-guggen',  name:'Guggenheim Museum',      area:'Bilbao, Spain',      cc:'ES', lat:43.2687, lng:-2.9340, blurb:'Titanium-clad modern-art landmark.' },
  { id:'es-seville', name:'Seville Cathedral',      area:'Seville, Spain',     cc:'ES', lat:37.3859, lng:-5.9932, blurb:'Gothic cathedral and the Giralda tower.' },
  { id:'es-prado',   name:'Prado Museum',           area:'Madrid, Spain',      cc:'ES', lat:40.4138, lng:-3.6921, blurb:'Spain’s national art museum.' },

  // ---------- United Kingdom ----------
  { id:'gb-bigben',  name:'Big Ben',                area:'London, UK',         cc:'GB', lat:51.5007, lng:-0.1246, blurb:'The clock tower at Westminster.' },
  { id:'gb-tower',   name:'Tower of London',        area:'London, UK',         cc:'GB', lat:51.5081, lng:-0.0759, blurb:'Historic castle and Crown Jewels.' },
  { id:'gb-british', name:'British Museum',         area:'London, UK',         cc:'GB', lat:51.5194, lng:-0.1270, blurb:'World history and antiquities.' },
  { id:'gb-stone',   name:'Stonehenge',             area:'Wiltshire, UK',      cc:'GB', lat:51.1789, lng:-1.8262, blurb:'Prehistoric standing-stone circle.' },
  { id:'gb-edin',    name:'Edinburgh Castle',       area:'Edinburgh, UK',      cc:'GB', lat:55.9486, lng:-3.1999, blurb:'Fortress on the volcanic rock.' },
  { id:'gb-bath',    name:'Roman Baths',            area:'Bath, UK',           cc:'GB', lat:51.3811, lng:-2.3590, blurb:'Ancient Roman bathing complex.' },
  { id:'gb-windsor', name:'Windsor Castle',         area:'Windsor, UK',        cc:'GB', lat:51.4839, lng:-0.6044, blurb:'The oldest occupied castle in the world.' },
  { id:'gb-cause',   name:"Giant's Causeway",       area:'Co. Antrim, UK',     cc:'GB', lat:55.2408, lng:-6.5116, blurb:'Basalt columns on the coast.' },

  // ---------- France ----------
  { id:'fr-eiffel',  name:'Eiffel Tower',           area:'Paris, France',      cc:'FR', lat:48.8584, lng:2.2945, blurb:'The iron tower over Paris.' },
  { id:'fr-louvre',  name:'Louvre Museum',          area:'Paris, France',      cc:'FR', lat:48.8606, lng:2.3376, blurb:"World's largest art museum." },
  { id:'fr-notre',   name:'Notre-Dame',             area:'Paris, France',      cc:'FR', lat:48.8530, lng:2.3499, blurb:'Gothic cathedral on the Île de la Cité.' },
  { id:'fr-arc',     name:'Arc de Triomphe',        area:'Paris, France',      cc:'FR', lat:48.8738, lng:2.2950, blurb:'Triumphal arch on the Champs-Élysées.' },
  { id:'fr-versai',  name:'Palace of Versailles',   area:'Versailles, France', cc:'FR', lat:48.8049, lng:2.1204, blurb:'Royal palace and gardens.' },
  { id:'fr-montsm',  name:'Mont-Saint-Michel',      area:'Normandy, France',   cc:'FR', lat:48.6361, lng:-1.5115, blurb:'Island abbey in the tidal bay.' },
  { id:'fr-pontgard',name:'Pont du Gard',           area:'Occitanie, France',  cc:'FR', lat:43.9476, lng:4.5350, blurb:'Ancient Roman aqueduct bridge.' },
  { id:'fr-nice',    name:'Promenade des Anglais',  area:'Nice, France',       cc:'FR', lat:43.6947, lng:7.2660, blurb:'Seafront promenade on the Riviera.' },

  // ---------- Italy ----------
  { id:'it-coloss',  name:'Colosseum',              area:'Rome, Italy',        cc:'IT', lat:41.8902, lng:12.4922, blurb:'Ancient Roman amphitheatre.' },
  { id:'it-stpeter', name:"St. Peter's Basilica",   area:'Vatican City',       cc:'IT', lat:41.9022, lng:12.4539, blurb:'The great basilica of the Vatican.' },
  { id:'it-pisa',    name:'Leaning Tower',          area:'Pisa, Italy',        cc:'IT', lat:43.7230, lng:10.3966, blurb:'The famous tilting bell tower.' },
  { id:'it-florence',name:'Florence Cathedral',     area:'Florence, Italy',    cc:'IT', lat:43.7731, lng:11.2560, blurb:"Brunelleschi's domed Duomo." },
  { id:'it-venice',  name:"St. Mark's Square",      area:'Venice, Italy',      cc:'IT', lat:45.4341, lng:12.3388, blurb:'The heart of Venice.' },
  { id:'it-pompeii', name:'Pompeii',                area:'Naples, Italy',      cc:'IT', lat:40.7497, lng:14.4869, blurb:'Roman city buried by Vesuvius.' },
  { id:'it-milan',   name:'Milan Cathedral',        area:'Milan, Italy',       cc:'IT', lat:45.4642, lng:9.1900, blurb:'Vast Gothic Duomo of Milan.' },
  { id:'it-positano',name:'Positano',               area:'Amalfi Coast, Italy',cc:'IT', lat:40.6281, lng:14.4850, blurb:'Cliffside village on the Amalfi Coast.' },

  // ---------- Greece ----------
  { id:'gr-acro',    name:'Acropolis',              area:'Athens, Greece',     cc:'GR', lat:37.9715, lng:23.7267, blurb:'The Parthenon above Athens.' },
  { id:'gr-meteora', name:'Meteora',                area:'Thessaly, Greece',   cc:'GR', lat:39.7217, lng:21.6306, blurb:'Monasteries atop rock pillars.' },
  { id:'gr-oia',     name:'Oia',                    area:'Santorini, Greece',  cc:'GR', lat:36.4618, lng:25.3753, blurb:'White cliffs and blue domes.' },
  { id:'gr-delphi',  name:'Delphi',                 area:'Phocis, Greece',     cc:'GR', lat:38.4824, lng:22.5010, blurb:'Ancient sanctuary of the oracle.' },
  { id:'gr-knossos', name:'Palace of Knossos',      area:'Crete, Greece',      cc:'GR', lat:35.2980, lng:25.1630, blurb:'Bronze-Age Minoan palace.' },
  { id:'gr-mykonos', name:'Mykonos Town',           area:'Mykonos, Greece',    cc:'GR', lat:37.4467, lng:25.3289, blurb:'Windmills and whitewashed lanes.' },
  { id:'gr-rhodes',  name:'Rhodes Old Town',        area:'Rhodes, Greece',     cc:'GR', lat:36.4441, lng:28.2270, blurb:'Medieval walled city.' },
  { id:'gr-navagio', name:'Navagio Beach',          area:'Zakynthos, Greece',  cc:'GR', lat:37.8592, lng:20.6250, blurb:'Shipwreck cove reached by boat.' }
];

/* ---------- Guided routes (full waypoint + hazard detail) ---------- */
LM.guided = [
  {
    id:'sete-lagoas',
    name:'Sete Lagoas Trail',
    area:'Peneda-Gerês, Portugal',
    cc:'PT',
    type:'hike',
    distanceKm:1.4,
    timeMin:'25–40',
    difficulty:'Moderate',
    elevGainM:120,
    tolls:'No tolls on the drive in.',
    signal:'No mobile signal on the trail — download before you go.',
    comfort:'Wide, safe start. First caution at the stone bridge.',
    images:[
      { src:'routes/sete-trail-map.jpg',    cap:'Trail map — parking to the water' },
      { src:'routes/sete-safety-map.png',   cap:'Detailed safety map and guide' },
      { src:'routes/sete-parents-guide.png',cap:'Safety guide — where it is safe' }
    ],
    coordsApprox:true, // waypoints below the parking are placed approximately
    waypoints:[
      { n:1, name:'Parking Area',       desc:'Free parking in Xertelo. Restrooms and info board.', lat:41.6984, lng:-8.1538, elev:430, approx:false, hazard:null },
      { n:2, name:'Start of Trail',     desc:'Wide dirt path (calçada). Gentle uphill.',      lat:41.6979, lng:-8.1536, elev:440, approx:true,  hazard:null },
      { n:3, name:'Forest Path',        desc:'Shaded section, roots and rocks. Gentle climb.',      lat:41.6969, lng:-8.1533, elev:480, approx:true,  hazard:null },
      { n:4, name:'Stone Bridge',       desc:'Cross the small stone bridge over the stream.',        lat:41.6959, lng:-8.1531, elev:510, approx:true,  hazard:{ level:'caution', text:'Slippery when wet — hold the side.' } },
      { n:5, name:'Descent to Lagoons', desc:'Rocky downhill section.',                              lat:41.6949, lng:-8.1529, elev:450, approx:true,  hazard:{ level:'caution', text:'Rocky downhill — slow on wet rocks.' } },
      { n:6, name:'First Viewpoint',    desc:'Beautiful view over the first lagoons. Photo spot.',   lat:41.6941, lng:-8.1527, elev:430, approx:true,  hazard:null },
      { n:7, name:'To the Water',       desc:'Short final descent on rocks to the natural pools.',   lat:41.6934, lng:-8.1525, elev:410, approx:true,  hazard:{ level:'high', text:'Deep water, strong currents after rain. No jumping or diving.' } }
    ]
  },
  {
    id:'coimbra-sete-lagoas',
    name:'Coimbra to Sete Lagoas',
    area:'Coimbra to Peneda-Gerês, Portugal',
    cc:'PT',
    type:'drive',
    distanceKm:180,
    timeMin:'about 165',
    difficulty:'Easy — fear-of-heights safe',
    tolls:'No tolls on this route.',
    signal:'Signal drops near the park — download before you go.',
    comfort:'Wide highways almost the whole way. Only the last road (M535) is narrow.',
    images:[
      { src:'routes/drive-scenic-safe.png', cap:'Scenic and safe drive — roads to avoid' },
      { src:'routes/drive-comfort-map.png', cap:'Driver comfort roadmap' }
    ],
    coordsApprox:true, // section points sit on the towns along the way
    stops:[ 'Fuel: Coimbra, Porto, Braga, Terras de Bouro.', 'No fuel or shops near the park — fill up in Terras de Bouro.' ],
    waypoints:[
      { n:1, name:'Coimbra — start',            desc:'Join the A1 heading north.',                  lat:40.2077, lng:-8.4256, approx:false, hazard:null },
      { n:2, name:'Porto — A1',                 desc:'Wide motorway. Continue toward Braga.',       lat:41.1579, lng:-8.6291, approx:true,  hazard:null },
      { n:3, name:'Braga — A3 to A7',           desc:'Take the A7 toward Terras de Bouro.',         lat:41.5454, lng:-8.4265, approx:true,  hazard:null },
      { n:4, name:'Terras de Bouro — N205',     desc:'Good two-lane road with guardrails. Last fuel.', lat:41.7205, lng:-8.1610, approx:true, hazard:null },
      { n:5, name:'Campo do Gerês — N205-3',    desc:'Narrower, more curves.',                      lat:41.7626, lng:-8.1900, approx:true,  hazard:{ level:'caution', text:'Narrower road, curves and some drop-offs. Slow down.' } },
      { n:6, name:'Xertelo Parking — M535',     desc:'Final 1.4 km to the parking area.',           lat:41.6984, lng:-8.1538, approx:true,  hazard:{ level:'caution', text:'Very narrow, one lane in places, drop-offs. Drive slowly.' } }
    ]
  },

  /* ===== More HIKING routes (real trailhead data, sourced) ===== */
  {
    id:'seven-valleys',
    name:'Seven Hanging Valleys',
    area:'Carvoeiro, Algarve, Portugal',
    cc:'PT', type:'hike',
    distanceKm:11.2, timeMin:'180–240', difficulty:'Moderate',
    elevGainM:230,
    tolls:'',
    signal:'Coastal clifftop — signal is patchy. Download before you go.',
    comfort:'Clifftop out-and-back. Stay behind the barriers near cliffs and blowholes.',
    images:[
      { src:'routes/seven-valleys-map.png', cap:'Trail map — Marinha to Vale Centeanes' }
    ],
    coordsApprox:true,
    waypoints:[
      { n:1, name:'Praia da Marinha (start)',   desc:'Iconic cliffs and turquoise water. Car park, restrooms, cafe.', lat:37.0903, lng:-8.4127, approx:false, hazard:null },
      { n:2, name:'Benagil Viewpoint',          desc:'Panoramic views of the Benagil coastline.',             lat:37.0888, lng:-8.4225, approx:true,  hazard:null },
      { n:3, name:'Benagil Sea Cave (above)',   desc:'The clifftop above the world-famous sea cave.',         lat:37.0876, lng:-8.4270, approx:false, hazard:null },
      { n:4, name:'Algar de Benagil Blowhole',  desc:'Natural blowhole where waves shoot up.',                lat:37.0898, lng:-8.4360, approx:true,  hazard:{ level:'high', text:'Waves shoot up the blowhole. Keep well back.' } },
      { n:5, name:'Cliff Edge Section',         desc:'Breathtaking views — the most exposed stretch.',        lat:37.0925, lng:-8.4435, approx:true,  hazard:{ level:'high', text:'Unstable cliff edge. Keep a safe distance.' } },
      { n:6, name:'Praia do Carvalho',          desc:'Small hidden beach, a good rest spot.',                 lat:37.0942, lng:-8.4475, approx:true,  hazard:null },
      { n:7, name:'Praia de Vale Centeanes (finish)', desc:'Beautiful beach and cafes to relax and finish.',  lat:37.0955, lng:-8.4558, approx:false, hazard:null }
    ]
  },

  /* ===== More DRIVING routes (real city coordinates) ===== */
  {
    id:'lisbon-porto', name:'Lisbon to Porto', area:'Lisbon to Porto, Portugal', cc:'PT', type:'drive',
    distanceKm:313, timeMin:'about 180', difficulty:'Easy — wide motorway',
    tolls:'Tolls on the A1.', signal:'Good signal along the motorway.',
    comfort:'Wide A1 motorway the whole way. Easy driving.', coordsApprox:true,
    waypoints:[
      { n:1, name:'Lisbon — start', desc:'Join the A1 heading north.', lat:38.7223, lng:-9.1393, approx:false, hazard:null },
      { n:2, name:'Coimbra',        desc:'Roughly halfway. Services and fuel.', lat:40.2033, lng:-8.4103, approx:false, hazard:null },
      { n:3, name:'Porto',          desc:'Arrive in Porto.', lat:41.1579, lng:-8.6291, approx:false, hazard:null }
    ]
  },
  {
    id:'madrid-barcelona', name:'Madrid to Barcelona', area:'Madrid to Barcelona, Spain', cc:'ES', type:'drive',
    distanceKm:620, timeMin:'about 360', difficulty:'Easy — long motorway',
    tolls:'The A-2 is toll-free.', signal:'Good signal along the A-2.',
    comfort:'Long but easy. Wide motorway; take breaks.', coordsApprox:true,
    waypoints:[
      { n:1, name:'Madrid — start', desc:'Join the A-2 heading east.', lat:40.4168, lng:-3.7038, approx:false, hazard:null },
      { n:2, name:'Zaragoza',       desc:'Roughly halfway. Good place to rest.', lat:41.6488, lng:-0.8891, approx:false, hazard:null },
      { n:3, name:'Barcelona',      desc:'Arrive in Barcelona.', lat:41.3874, lng:2.1686, approx:false, hazard:null }
    ]
  },
  {
    id:'paris-nice', name:'Paris to Nice', area:'Paris to Nice, France', cc:'FR', type:'drive',
    distanceKm:930, timeMin:'about 540', difficulty:'Long — plan an overnight',
    tolls:'Tolls on the autoroutes.', signal:'Good signal along the autoroutes.',
    comfort:'A very long drive. Break it up; consider a stop in Lyon.', coordsApprox:true,
    waypoints:[
      { n:1, name:'Paris — start', desc:'Head south on the A6.', lat:48.8566, lng:2.3522, approx:false, hazard:null },
      { n:2, name:'Lyon',          desc:'Good place to break the drive.', lat:45.7640, lng:4.8357, approx:false, hazard:null },
      { n:3, name:'Nice',          desc:'Arrive on the Riviera.', lat:43.7102, lng:7.2620, approx:false, hazard:null }
    ]
  },
  {
    id:'rome-florence', name:'Rome to Florence', area:'Rome to Florence, Italy', cc:'IT', type:'drive',
    distanceKm:280, timeMin:'about 180', difficulty:'Easy — motorway',
    tolls:'Tolls on the A1 autostrada.', signal:'Good signal along the A1.',
    comfort:'Wide A1 autostrada. Easy driving.', coordsApprox:true,
    waypoints:[
      { n:1, name:'Rome — start', desc:'Join the A1 heading north.', lat:41.9028, lng:12.4964, approx:false, hazard:null },
      { n:2, name:'Arezzo',       desc:'Roughly two-thirds of the way.', lat:43.4633, lng:11.8797, approx:false, hazard:null },
      { n:3, name:'Florence',     desc:'Arrive in Florence.', lat:43.7696, lng:11.2558, approx:false, hazard:null }
    ]
  },
  {
    id:'london-edinburgh', name:'London to Edinburgh', area:'London to Edinburgh, UK', cc:'GB', type:'drive',
    distanceKm:660, timeMin:'about 450', difficulty:'Long — motorway',
    tolls:'No tolls on this route.', signal:'Good signal along the motorways.',
    comfort:'Long but straightforward on the A1(M) / M6. Take breaks.', coordsApprox:true,
    waypoints:[
      { n:1, name:'London — start', desc:'Head north on the A1(M).', lat:51.5074, lng:-0.1278, approx:false, hazard:null },
      { n:2, name:'York',          desc:'A good midway stop.', lat:53.9600, lng:-1.0873, approx:false, hazard:null },
      { n:3, name:'Edinburgh',     desc:'Arrive in Edinburgh.', lat:55.9533, lng:-3.1883, approx:false, hazard:null }
    ]
  },
  {
    id:'athens-delphi', name:'Athens to Delphi', area:'Athens to Delphi, Greece', cc:'GR', type:'drive',
    distanceKm:180, timeMin:'about 150', difficulty:'Easy — some mountain road',
    tolls:'Some tolls on the national road.', signal:'Signal drops in the mountains near Delphi.',
    comfort:'Motorway most of the way, then a winding climb to Delphi. Drive it in daylight.', coordsApprox:true,
    waypoints:[
      { n:1, name:'Athens — start', desc:'Head northwest toward Livadeia.', lat:37.9838, lng:23.7275, approx:false, hazard:null },
      { n:2, name:'Livadeia',       desc:'Leave the motorway for the mountain road.', lat:38.4361, lng:22.8756, approx:false, hazard:{ level:'caution', text:'Winding mountain road ahead. Take it slow.' } },
      { n:3, name:'Delphi',         desc:'Arrive at the ancient site.', lat:38.4824, lng:22.5010, approx:false, hazard:null }
    ]
  }
];

/* ---------- Curated route notes shown on the Alerts tab (work offline) ---------- */
LM.notes = [
  { level:'amber', title:'Stone Bridge — slippery when wet', body:'On the Sete Lagoas trail. Hold the side if it has rained.' },
  { level:'red',   title:'Deep water at the lagoons',           body:'Strong currents after rain. No jumping or diving. Swim at your own risk.' },
  { level:'amber', title:'M535 to parking — narrow',        body:'Last 1.4 km of the drive is one lane in places, with drop-offs. Drive slow.' },
  { level:'amber', title:'Animals on N205',                     body:'Free-roaming cattle reported near the bends. Slow down.' },
  { level:'green', title:'Road closures — none known',      body:'No closures recorded on the route to Sete Lagoas.' }
];

/* ---------- Prep checklists (tickable, saved on the device) ---------- */
LM.prep = {
  hike: ['Proper shoes with good grip','1.5–2 L water each person','First aid kit + phone charged','Offline map downloaded','Told someone your plan and return time','Checked the weather'],
  drive:['Fuel topped up before remote roads','Rest breaks planned','Weather checked','Drive in daylight if possible','Phone charged / car charger']
};

/* ---------- How to Use content ---------- */
LM.help = [
  { q:'What is Load Maps', a:'A guide that shows where you are, speaks the next step out loud, and warns you about hazards — for driving and hiking. It works offline once loaded.' },
  { q:'Does it work offline with no signal', a:'Yes. The app, your places and the voice all work with no signal. GPS itself needs no signal. Live extras (weather, traffic) only update when you are online.' },
  { q:'How do I get directions to a place', a:'Open Places, tap a place, then tap Guide me there. It shows the straight-line distance and direction, and speaks it. Turn on location first so it knows where you are.' },
  { q:'What is a guided route', a:'A full trail like Sete Lagoas with every waypoint, the climb, and spoken hazard warnings. Open the Guided tab to start one.' },
  { q:'Which voice does it use', a:'Samantha by default, using the voice built into your device. You can turn the voice on or off with the voice button. On some iPads the system may pick its own default voice.' },
  { q:'How do I turn on the voice', a:'Tap the voice button near the top of Places. Tap it again to mute. The first tap also lets the device start speaking.' },
  { q:'What does the hard refresh button do', a:'The orange circle-arrow at the top reloads your position, the places and the alerts. Tap it any time things look stale.' },
  { q:'How do hazard warnings work', a:'On a guided route, as you get near a marked danger spot it speaks the warning — for example the slippery bridge or the deep water.' },
  { q:'What is comfort mode', a:'On a route it reassures you before hard or exposed sections and tells you when a wide, safe stretch is coming. Helpful if you dislike heights.' },
  { q:'How do I call for help', a:'Every route and place has an Emergency button. It dials the local number (112 across Europe) and shows your exact coordinates to read out.' },
  { q:'Can other places and countries be added', a:'Yes. Load Maps is worldwide. New places are added as data — name, coordinates, notes — so any country can be included over time.' },
  { q:'Why are some coordinates approximate', a:'For the guided trail, the parking point is exact. The waypoints along the trail are placed roughly for now and get fine-tuned by walking the route.' }
];
