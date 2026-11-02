/* Load Maps: Survival Maps data (phase 1, static).
   Written 29 Oct 2026 from the owner Load Maps handoff (planning/LOAD_MAPS_SURVIVAL_MAPS_HANDOFF.md) and Load Survival Part 10, 11C and 11E.
   RULES: no coordinates, no water quality, no access, no fishing permission and no live status are invented. Anything not verified shows DATA UNVERIFIED.
   Source links are official starting pages, linked but not opened here. They are not proof that a layer or dataset works. */
var LMS = {};

LMS.labels = {
  opened: 'OFFICIAL SOURCE OPENED',
  linked: 'OFFICIAL SOURCE LINKED BUT NOT OPENED',
  unverified: 'DATA UNVERIFIED',
  live: 'LIVE INFORMATION REQUIRES CONNECTION',
  offline: 'VERIFIED OFFLINE IN THIS VERSION',
  device: 'DEVICE TEST PENDING',
  legal: 'LEGAL STATUS UNVERIFIED'
};

LMS.warnings = [
  { k: 'source', t: 'Source status', en: 'Information is linked to the named source below. Each data layer shows whether the source has been opened and the date it was last checked. Unchecked information is marked Verification pending.' },
  { k: 'water', t: 'Water safety', en: 'Rivers, lakes, ponds, wells and springs are NOT confirmed drinking-water sources. Water must be tested and appropriately treated. Boiling or ordinary disinfection does not remove chemicals, heavy metals or salt. Water exposed to chemicals may not be made safe by these methods.' },
  { k: 'access', t: 'Access and legality', en: 'A mapped location does not establish public entry, fishing, camping, water extraction, fire-making or overnight-stay permission. Check the land manager and local law. Closures change.' },
  { k: 'net', t: 'Connectivity', en: 'Live alerts, directions, shopping and external maps need the internet. Offline information works only after its page has been loaded once. Saved data may become outdated.' }
];

/* Load Survival links (relative to /loadmaps/). They open the Load Survival app. */
LMS.guideBase = '../loadsurvival/#/lesson/';
LMS.riverGuides = [
  { id: 'river-10a-water', t: 'River water, safe collection and treatment' },
  { id: 'river-10b-fishing', t: 'Fishing, permits, advisories and handling' },
  { id: 'river-10b-plants', t: 'Waterside plants: a caution guide' },
  { id: 'river-10c-microhydro', t: 'Micro-hydro: how it works and why it is not a quick fix' },
  { id: 'river-10d-preserve', t: 'Preserving fish and food, soap and lighting' },
  { id: 'p11c-water', t: 'Rainwater and gravity irrigation' },
  { id: 'p11e-bamboo-fishing', t: 'Traditional bamboo fishing equipment (check the rules first)' }
];

/* Fields every waterway must answer before it is displayed as anything more than a name. All start as DATA UNVERIFIED. */
LMS.waterFields = [
  'Official mapped name and source',
  'Known pollution or flood hazards',
  'Legal public access status',
  'Fishing permits and permitted gear',
  'Fish-consumption advisories',
  'Relevant conservation restrictions',
  'Source-verification date',
  'Offline availability status'
];

/* The seven checks before any fishing method is shown for a place (Part 11E). */
LMS.fishChecks = [
  'Country, state and the specific waterbody',
  'Permitted fishing gear',
  'Fishing licence requirements',
  'Permitted species and seasons',
  'Fish-consumption advisories',
  'Land-access permissions',
  'Conservation restrictions'
];

LMS.sources = {
  us: [
    ['USGS National Map Viewer', 'https://www.usgs.gov/tools/national-map-viewer'],
    ['USGS National Map services', 'https://apps.nationalmap.gov/services/'],
    ['FEMA flood maps', 'https://msc.fema.gov/portal/home'],
    ['California Geological Survey tsunami maps', 'https://conservation.ca.gov/cgs/tsunami/maps'],
    ['LA County hazards MapServer', 'https://public.gis.lacounty.gov/public/rest/services/LACounty_Dynamic/Hazards/MapServer'],
    ['Florida Know Your Zone', 'https://www.floridadisaster.org/planprepare/know-your-zone-know-your-home/'],
    ['Florida emergency information', 'https://www.floridadisaster.org/info/info2/'],
    ['Jacksonville and Duval evacuation zones', 'https://www.jaxready.com/Alerts/Evacuation-Zones'],
    ['SC DNR floodplain viewer', 'https://scfloodimpact.com/Index'],
    ['SC DNR flood map directory', 'https://dnr.sc.gov/water/flood/floodmaps.html'],
    ['Ohio DNR floodplain mapping', 'https://ohiodnr.gov/discover-and-learn/land-water/issues-for-landowners/floodplain-mapping'],
    ['NWS tsunami maps', 'https://www.weather.gov/nthmp/tsunamimaps']
  ],
  pt: [
    ['APA and SNIRH water resources service', 'https://www.gov.pt/servicos/consultar-o-sistema-nacional-de-informacao-de-recursos-hidricos'],
    ['IPMA rural fire danger', 'https://www.ipma.pt/pt/riscoincendio'],
    ['DGT rural fire hazard map', 'https://www.dgterritorio.gov.pt/atividades/paisagem/ptp/carta-perigosidade-incendio-rural'],
    ['ANEPC risk material', 'https://prociv.gov.pt/pt/prevencao-e-preparacao/avaliacao-de-riscos/riscos-mistos/'],
    ['ICNF', 'https://www.icnf.pt/'],
    ['DGRM fishing zones', 'https://www.dgrm.pt/web/guest/zonas-de-pesca'],
    ['DGRM recreational licences', 'https://dgrm.pt/licencas'],
    ['DGRM permitted and prohibited recreational marine gear', 'https://dgrm.pt/pt/web/guest/artes-e-utensilios-de-pesca']
  ]
};

/* The 12 locations. emphasis, waterway names and authorities come only from the owner handoff and Part 3D file. */
LMS.locations = [
  { id: 'us-ca-san-pedro', cc: 'us', name: 'San Pedro, California', juris: 'City of Los Angeles, Los Angeles County, California', emphasis: 'Coastal tsunami evacuation, harbor and coastal flooding, earthquakes, wildfire smoke, public access', water: [{ n: 'Coast and Port of Los Angeles harbor (not a river)', note: 'Shoreline and harbor water is not drinkable.' }], fish: 'California Department of Fish and Wildlife (coastal marine rules and closures)', srcs: ['California Geological Survey tsunami maps', 'NWS tsunami maps', 'LA County hazards MapServer', 'FEMA flood maps'], guide: 'place-ca-sanpedro' },
  { id: 'us-ca-palmdale', cc: 'us', name: 'Palmdale, California', juris: 'Los Angeles County, California', emphasis: 'Heat, wildfire, high winds, earthquakes, road closures, sparse water', water: [{ n: 'No waterway named in our research file', note: 'Mark reservoirs and channels only from verified GIS. Never suggest aqueduct water is accessible or drinkable.' }], fish: 'California Department of Fish and Wildlife; private and public land access', srcs: ['LA County hazards MapServer', 'FEMA flood maps', 'USGS National Map Viewer'], guide: 'place-ca-palmdale' },
  { id: 'us-ca-los-angeles', cc: 'us', name: 'Los Angeles (city), California', juris: 'City of Los Angeles, California', emphasis: 'Neighborhood-scale earthquake, wildfire, extreme heat, flood and evacuation boundaries', water: [{ n: 'River and drainage features not named in our research file', note: 'Pick a neighborhood. Hazards are not the same across the whole city.' }], fish: 'California Department of Fish and Wildlife and property rules', srcs: ['LA County hazards MapServer', 'FEMA flood maps', 'USGS National Map Viewer'], guide: 'place-ca-losangeles' },
  { id: 'us-ca-valencia', cc: 'us', name: 'Valencia (Santa Clarita), California', juris: 'Valencia area of Santa Clarita, Los Angeles County, California', emphasis: 'Wildfire and evacuation corridors, heat, earthquakes, river and drainage features', water: [{ n: 'Santa Clara River (to validate)', note: 'Validate the river and public access before showing anything about it.' }], fish: 'California Department of Fish and Wildlife', srcs: ['LA County hazards MapServer', 'FEMA flood maps', 'USGS National Map Viewer'], guide: 'place-ca-valencia' },
  { id: 'us-fl-jacksonville', cc: 'us', name: 'Jacksonville, Florida', juris: 'Duval County, Florida (not the old Jacksonville in California)', emphasis: 'Hurricane surge and river flooding, evacuation zones, St. Johns River, heat', water: [{ n: 'St. Johns River', note: 'Surface water. Not drinkable.' }], fish: 'Florida Fish and Wildlife Conservation Commission (salt and fresh water differ)', srcs: ['Jacksonville and Duval evacuation zones', 'Florida Know Your Zone', 'FEMA flood maps'], guide: 'place-fl-jacksonville' },
  { id: 'us-fl-orlando', cc: 'us', name: 'Orlando, Florida', juris: 'Orange County, Florida', emphasis: 'Tropical-storm rain and inland flooding, extreme heat, shelters, lakes', water: [{ n: 'Lakes (not named in our research file)', note: 'Lakes need water-source warnings and an access review.' }], fish: 'Florida Fish and Wildlife Conservation Commission (freshwater rules)', srcs: ['Florida emergency information', 'Florida Know Your Zone', 'FEMA flood maps'], guide: 'place-fl-orlando' },
  { id: 'us-sc-conway', cc: 'us', name: 'Conway, South Carolina', juris: 'Horry County, South Carolina', emphasis: 'Waccamaw River flooding, river forecasts, tropical storms, road closures', water: [{ n: 'Waccamaw River', note: 'Flood-map approximations are not for personal evacuation decisions.' }], fish: 'South Carolina Department of Natural Resources; public water access', srcs: ['SC DNR floodplain viewer', 'SC DNR flood map directory', 'FEMA flood maps'], guide: 'place-sc-conway' },
  { id: 'us-oh-statewide', cc: 'us', name: 'Ohio (statewide)', juris: 'State of Ohio. Pick a county or city for local detail.', emphasis: 'Statewide overview. A county or city is required before any shelter, route, river access or local rule is shown.', water: [{ n: 'Choose a county first', note: 'River access and rules are local. None is shown at state level.' }], fish: 'Ohio Department of Natural Resources; county park restrictions', srcs: ['Ohio DNR floodplain mapping', 'FEMA flood maps', 'USGS National Map Viewer'], guide: 'place-oh-ohio' },
  { id: 'pt-coimbra', cc: 'pt', name: 'Coimbra, Portugal', juris: 'Coimbra', emphasis: 'Mondego River and flood risk, rural fire, extreme heat, power outages', water: [{ n: 'Rio Mondego and tributaries', pt: 'Rio Mondego e afluentes', note: 'Water resource mapping is not safe public collection.' }], fish: 'ICNF for fresh water; DGRM for sea waters', srcs: ['APA and SNIRH water resources service', 'IPMA rural fire danger', 'DGT rural fire hazard map', 'ICNF'], guide: 'place-pt-coimbra' },
  { id: 'pt-lisboa', cc: 'pt', name: 'Lisboa, Portugal', juris: 'Lisboa', emphasis: 'Earthquake preparedness, coastal and estuary flood and tsunami zones, heat', water: [{ n: 'Tagus (Tejo) estuary', pt: 'Estuário do Tejo', note: 'Check the municipal civil-protection instructions.' }], fish: 'DGRM for sea waters; ICNF and the local authority for inland waters', srcs: ['ANEPC risk material', 'APA and SNIRH water resources service', 'DGRM fishing zones'], guide: 'place-pt-lisboa' },
  { id: 'pt-porto', cc: 'pt', name: 'Porto, Portugal', juris: 'Porto', emphasis: 'Douro River and coast flooding, intense rain, steep terrain, power outages', water: [{ n: 'Douro and its estuary', pt: 'Rio Douro e estuário', note: 'Accessible routes on steep streets cannot be stated without a slope and footpath check.' }], fish: 'DGRM for sea waters; ICNF and the local authority for inland waters', srcs: ['APA and SNIRH water resources service', 'ANEPC risk material', 'DGRM fishing zones'], guide: 'place-pt-porto' },
  { id: 'pt-setubal', cc: 'pt', name: 'Setúbal, Portugal', juris: 'Setúbal', emphasis: 'Sado estuary, coastal and storm hazards, rural fire, earthquake, heat', water: [{ n: 'Sado estuary', pt: 'Estuário do Sado', note: 'Protected-area limits are a different question from what is visible on a map.' }], fish: 'DGRM, ICNF and protected-area rules', srcs: ['APA and SNIRH water resources service', 'IPMA rural fire danger', 'ICNF', 'DGRM fishing zones'], guide: 'place-pt-setubal' }
];
