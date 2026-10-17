window.LOAD_DATA={
regions:{us:{label:'United States',emergency:'911',agency:'Ready.gov, local emergency management, NWS',links:[['Ready.gov','https://www.ready.gov/'],['National Weather Service','https://www.weather.gov/']]},pt:{label:'Portugal',emergency:'112',agency:'Proteção Civil, IPMA, municipal authorities',links:[['Proteção Civil','https://prociv.gov.pt/'],['IPMA','https://www.ipma.pt/']]},global:{label:'Universal',emergency:'Confirm local number',agency:'Local civil protection and public health agencies',links:[]}},
scenarios:[
{id:'blackout',icon:'bolt',title:'Extended power outage',tag:'Power',times:[['First 5 minutes','Check immediate hazards. Use battery lighting. Check on household members. Do not use candles near combustible materials.'],['First hour','Confirm whether neighbors are affected. Protect refrigerated food by keeping doors closed. Conserve phone power.'],['First 24 hours','Use safe alternative lighting. Follow local utility updates when connection exists. Prioritize medication refrigeration according to professional guidance.'],['Days 2–7','Reassess water, food, indoor temperature, sanitation, and evacuation needs daily. Never run fuel-powered generators indoors or in garages.']]},
{id:'storm',icon:'storm',title:'Severe storm / tornado',tag:'Weather',times:[['Before impact','Follow official warnings. Charge devices. Secure loose outdoor objects only when safe.'],['During impact','Move away from windows. For tornado warning, shelter in an interior, lowest-level room; avoid mobile homes.'],['After impact','Avoid downed wires, floodwater and unstable structures. Check injuries and official all-clear.']]},
{id:'fire',icon:'flame',title:'Wildfire / rural fire',tag:'Fire',times:[['Before','Prepare a go-bag and evacuation routes. Stay aware of local restrictions and official alerts.'],['When ordered to evacuate','Leave immediately by official routes. Avoid smoke and blocked roads.'],['After','Do not return until authorities permit it. Watch for hot spots, compromised structures, and contaminated water.']]},
{id:'flood',icon:'waves',title:'Flood / flash flood',tag:'Flood',times:[['Before','Move vital supplies and documents higher if safe. Identify higher ground.'],['During','Move to higher ground. Never enter or drive through floodwater.'],['After','Avoid electrical equipment and contaminated water; follow official reentry guidance.']]},
{id:'quake',icon:'quake',title:'Earthquake',tag:'Earth',times:[['Shaking begins','Drop, cover, and hold on. Stay away from glass and falling objects.'],['When shaking stops','Check hazards and injuries; expect aftershocks. Outside, move away from damaged buildings.'],['Coastal warning','After strong or prolonged coastal shaking, move inland or to high ground if tsunami risk exists. Do not wait for an alert.']]},
{id:'heat',icon:'sun',title:'Extreme heat / cold',tag:'Temperature',times:[['Assess','Identify the immediate temperature threat and higher-risk household members.'],['Protect','Seek safe climate-controlled shelter or heating/cooling centers. Hydrate and monitor symptoms.'],['Escalate','Confusion, fainting, severe breathing problems, or heatstroke warning signs require urgent medical assistance.']]}
],
lessons:[
{id:'water',icon:'drop',title:'Making drinking water safer',area:'Water',difficulty:'Essential',intro:'Cloudy water is not automatically contaminated, and clear water is not automatically safe.',warning:'Do not drink water suspected of chemical, fuel, heavy-metal or radioactive contamination. Boiling and ordinary filters cannot make it safe.',steps:[['Check advisories','Check whether the warning is boil-water, do-not-drink, or do-not-use. Local official instructions override this guide.'],['Select a source','Prefer sealed commercial bottled water. Avoid sources with suspected chemical or fuel contamination.'],['Remove sediment','Let cloudy water settle and pour off the clearer water, or strain through a clean cloth or paper filter. This does not disinfect water.'],['Boil','Bring clear water to a rolling boil for 1 minute, or 3 minutes above 6,500 ft (about 2,000 m).'],['Cool and store','Cool safely, then use a clean, sanitized, tightly covered container. Keep treated and untreated water separate.']],source:'https://www.cdc.gov/water-emergency/about/'},
{id:'power',icon:'battery',title:'Emergency power without grid electricity',area:'Electricity',difficulty:'Essential',intro:'Prioritize light, communications and medically essential devices. Use approved batteries and power stations.',warning:'Never connect improvised power to household wiring. Never run generators or fuel-burning devices indoors or in garages. Never backfeed a utility socket.',steps:[['List critical loads','Write down wattage and daily run time for essential devices.'],['Conserve first','Enable device low-power settings and turn off unnecessary loads.'],['Select a suitable source','Use manufacturer-rated power banks or portable power stations. Solar charging is weather-dependent and must use compatible controllers.'],['Separate household wiring','Use plug-in devices as intended. Home transfer systems require a qualified electrician and locally compliant equipment.'],['Check ventilation and carbon monoxide','Operate portable fuel generators outdoors and well away from windows, doors and vents; use working CO alarms.']],source:'https://www.ready.gov/power-outages'},
{id:'shelter',icon:'tent',title:'Shelter and exposure protection',area:'Shelter',difficulty:'Essential',intro:'Choosing a safe location is more important than building a complex shelter.',warning:'Avoid flood plains, dead trees, unstable slopes, dry creek beds and enclosed spaces with combustion heaters.',steps:[['Assess the hazard','Identify wind, rain, flood, lightning, snow, heat and falling debris risk.'],['Choose safest existing shelter','Use a structurally sound building or official shelter if available.'],['Choose an outdoor location only if needed','Find stable, elevated terrain away from trees that may fall and water channels.'],['Create weather protection','Secure a rated tarp or tent with appropriate anchors without damaging trees or using unsafe tie-offs.'],['Insulate and monitor','Reduce heat loss to the ground and check for cold or heat illness.']],source:'https://www.ready.gov/shelter'},
{id:'fire-safety',icon:'flame',title:'Fire, heat and safe alternatives',area:'Fire',difficulty:'Essential',intro:'Fire can provide heat when legal and safe, but it can also cause burns, wildfires and carbon monoxide poisoning.',warning:'Never light outdoor fires during restrictions or hazardous wildfire conditions. Never burn fuel inside a tent or home for warmth.',steps:[['Check regulations and conditions','Follow local fire bans and landowner rules. High wind or dry vegetation may make a fire unsafe.'],['Prefer lower-risk alternatives','Use approved clothing layers, sleeping bags and battery lighting rather than flames where possible.'],['If fire is permitted','Use an established contained fire location clear of combustibles and maintain supervision.'],['Keep extinguishing resources available','Have water or another appropriate extinguishing method readily accessible.'],['Extinguish completely','Cool and stir ashes until no heat remains; do not leave an unattended fire.']],source:'https://www.ready.gov/wildfires'},
{id:'security',icon:'shield',title:'Theft prevention and home security',area:'Security',difficulty:'Essential',intro:'Protect people first, reduce opportunities for theft, and avoid escalations.',warning:'Do not confront armed intruders. Move to safety and contact emergency services when possible.',steps:[['Reduce visibility of valuables','Keep supplies discreet and avoid advertising empty properties or stored resources.'],['Improve passive protection','Check functioning door and window locks, exterior lighting, and safe exits.'],['Plan contact and escape','Agree on a household meeting point and communication plan.'],['Build a trusted neighbor network','Arrange check-ins without sharing private household details widely.'],['If an intrusion occurs','Avoid confrontation; move away or shelter safely, call emergency services when possible, and follow dispatcher directions.']],source:'https://www.ready.gov/home-fires'},
{id:'food',icon:'can',title:'Food safety during outages',area:'Food',difficulty:'Essential',intro:'Keeping refrigerators and freezers closed buys time; unsafe food can cause serious illness.',warning:'Do not taste food to determine whether it is safe. Discard perishable food held above safe temperatures too long.',steps:[['Keep doors closed','An unopened refrigerator generally keeps food cold about 4 hours; a full unopened freezer about 48 hours and half-full about 24 hours.'],['Track duration','Record the time the outage began and monitor temperatures with an appliance thermometer.'],['Prioritize shelf-stable foods','Use ready-to-eat food that does not need refrigeration or cooking.'],['Follow food safety rules','Discard questionable perishables; consult official food safety charts before eating.']],source:'https://www.foodsafety.gov/food-safety-charts/food-safety-during-power-outage'},
{id:'health',icon:'cross',title:'Medical preparedness basics',area:'First aid',difficulty:'Essential',intro:'Keep a stocked first aid kit, prescription list and plan for dependent medical equipment.',warning:'For severe injury, difficulty breathing, unconsciousness or other life-threatening symptoms, call emergency services immediately.',steps:[['Check safety','Do not enter an unsafe area to reach a casualty.'],['Call for help','Use the locally appropriate emergency number for serious situations.'],['Gather information','Know allergies, medication needs, relevant contacts and accessible supplies.'],['Learn certified skills','Take recognized CPR, AED and bleeding-control training. This app does not replace hands-on certification.']],source:'https://www.redcross.org/get-help/how-to-prepare-for-emergencies.html'},
{id:'comms',icon:'radio',title:'Offline communications and navigation',area:'Navigation',difficulty:'Starter',intro:'Planning ahead is more reliable than relying on a single device or network.',warning:'Offline maps and downloaded data can become outdated. Verify routes against current local official instructions whenever possible.',steps:[['Download maps','Save home, evacuation routes and regional maps for offline use.'],['Write contacts','Keep paper copies of family contacts and meeting points.'],['Prepare equipment','Charge power banks, identify local radio broadcast options and learn radio operation.'],['Set a household plan','Choose an out-of-area contact and two meeting locations.']],source:'https://www.ready.gov/plan'},
{id:'sanitation',icon:'soap',title:'Sanitation during utility failures',area:'Hygiene',difficulty:'Starter',intro:'Poor sanitation can turn a survivable emergency into a health crisis.',warning:'Keep human waste away from food and water sources and follow local waste disposal instructions.',steps:[['Separate clean and dirty zones','Keep untreated water and waste away from food-preparation areas.'],['Prioritize hand hygiene','Use soap and safe water; appropriate sanitizer can be a fallback when hands are not visibly dirty.'],['Prepare a toilet contingency','Use a safe lined waste container only when ordinary sanitation is unavailable and local instructions permit.'],['Prevent contact','Seal waste, clean surfaces, and prevent child or animal access.']],source:'https://www.cdc.gov/water-emergency/'},
{id:'evac',icon:'pack',title:'Evacuation and go-bags',area:'Planning',difficulty:'Starter',intro:'Decide when and how to leave before an emergency makes planning difficult.',warning:'Never delay a mandatory evacuation to collect nonessential supplies.',steps:[['Choose exits','Identify two routes and safe meeting points.'],['Pack essentials','Include water, essential medications, identification copies, light, charging supplies and weather-appropriate clothing.'],['Adapt for household','Include child, pet, mobility and medical equipment needs.'],['Leave when directed','Follow local authorities and avoid unsafe routes.']],source:'https://www.ready.gov/kit'}
],
checklist:[['water','Water and containers'],['food','Shelf-stable food'],['light','Flashlights and batteries'],['phone','Power banks and charging cables'],['radio','Battery or hand-crank radio'],['health','First-aid kit and medications'],['docs','Copies of essential documents'],['plans','Family contacts and evacuation route'],['security','Check locks and safe exits'],['pets','Pet and dependent supplies if needed']]
};

window.LOAD_WATER=[
  {
    "id": "water-source",
    "icon": 'drop',
    "title": "Choose an emergency water source",
    "area": "Water • Source selection",
    "difficulty": "Essential",
    "intro": "Choose sealed commercially bottled water first. Evaluate official advisories and contamination before attempting treatment.",
    "warning": "Do not use floodwater, fuel-contaminated, chemically contaminated, or radioactively contaminated water as drinking water. Ordinary boiling, disinfectants, and DIY filters cannot fix these hazards.",
    "steps": [
      [
        "Read the advisory",
        "Determine whether officials have declared boil water, do not drink, or do not use. A do-not-use advisory may forbid skin contact as well."
      ],
      [
        "Prioritize safe supplies",
        "Use sealed bottled water or previously stored potable water where available. Never assume collected rainwater is safe without assessment and treatment."
      ],
      [
        "Identify a backup",
        "If officials say microbiological treatment is appropriate, consider clean stored tap water, uncontaminated ice, or a source permitted by local authorities."
      ],
      [
        "Reject suspicious water",
        "Odors of fuel, chemical spills, flooded industrial sites, and unknown well contamination demand an alternative supply and local health advice."
      ]
    ],
    "source": "https://www.cdc.gov/water-emergency/about/",
    "image": "assets/water/source.svg"
  },
  {
    "id": "water-sediment",
    "icon": 'thread',
    "title": "Remove sediment before treatment",
    "area": "Water • Pre-filtration",
    "difficulty": "Essential",
    "intro": "Make cloudy water clearer before boiling or approved disinfection. This step does not make water drinkable.",
    "warning": "A cloth, sand, charcoal, or improvised bottle filter does not reliably remove pathogens or dissolved chemicals.",
    "steps": [
      [
        "Let water settle",
        "Place cloudy water in a clean container and allow visible particles to settle."
      ],
      [
        "Decant carefully",
        "Slowly pour clearer water into a second clean vessel without stirring the settled sediment."
      ],
      [
        "Use clean cloth",
        "Pass the water through a clean cloth, paper towel, or coffee filter to catch larger particles."
      ],
      [
        "Treat afterward",
        "Boil or use a suitable approved disinfection method for microbial hazards. If chemicals or fuels are suspected, reject the source."
      ]
    ],
    "source": "https://www.cdc.gov/water-emergency/about/",
    "image": "assets/water/sediment.svg"
  },
  {
    "id": "water-boil",
    "icon": 'steam',
    "title": "Disinfect water by boiling",
    "area": "Water • Microbial treatment",
    "difficulty": "Essential",
    "intro": "Boiling is a reliable way to kill common disease-causing microbes when the hazard is biological.",
    "warning": "Boiling does not remove fuels, toxic chemicals, salts, or radioactive materials. It can concentrate some dissolved contaminants.",
    "steps": [
      [
        "Confirm the contamination type",
        "Follow local boil-water advisories. If chemical contamination is suspected, use another source."
      ],
      [
        "Clarify cloudy water",
        "Allow sediment to settle; strain through clean cloth or paper before boiling."
      ],
      [
        "Bring to a rolling boil",
        "Use the CDC elevation rule: boil for 1 minute, or 3 minutes above 6,500 feet (about 2,000 m)."
      ],
      [
        "Cool and protect",
        "Allow water to cool, then pour into a clean sanitized container with a tight cover. Prevent recontamination."
      ]
    ],
    "source": "https://www.cdc.gov/water-emergency/about/",
    "image": "assets/water/boil.svg"
  },
  {
    "id": "water-filters",
    "icon": 'flask',
    "title": "Understand portable filters",
    "area": "Water • Filtration",
    "difficulty": "Essential",
    "intro": "Select equipment by verified contaminant-reduction claims rather than marketing or appearance.",
    "warning": "Many backpacking filters do not remove viruses; improvised charcoal and sand do not make unsafe water reliably drinkable.",
    "steps": [
      [
        "Identify the problem",
        "Microbial threats differ from chemicals, dissolved salts, and heavy metals. No single standard camping filter solves every issue."
      ],
      [
        "Check certification",
        "Read the product label and test standard; verify claimed parasite, bacteria, virus, or chemical removal and flow limitations."
      ],
      [
        "Follow setup guidance",
        "Prime, assemble, backflush and maintain the filter according to its manufacturer. Keep dirty parts separate from clean outlets."
      ],
      [
        "Apply additional treatment if needed",
        "Where viruses remain a concern, follow CDC recommendations for appropriate disinfection after filtering."
      ],
      [
        "Retire compromised equipment",
        "Freezing, cracks, exhausted elements, or contamination may make a filter unsafe. Follow manufacturer replacement guidance."
      ]
    ],
    "source": "https://www.cdc.gov/water-emergency/about/",
    "image": "assets/water/filter.svg"
  },
  {
    "id": "water-disinfection",
    "icon": 'bottle',
    "title": "Chemical disinfection choices",
    "area": "Water • Microbial treatment",
    "difficulty": "Essential",
    "intro": "Use labeled drinking-water disinfectants and follow instructions matched to the water and product.",
    "warning": "Never guess bleach drops for an unknown concentration or use scented, splashless, additive-containing, or mixed cleaners. Do not mix household chemicals.",
    "steps": [
      [
        "Prefer boiling when possible",
        "Boiling is generally the most reliable household method for microbial hazards."
      ],
      [
        "Choose an appropriate product",
        "Use drinking-water purification tablets/drops per label; for household bleach use only regular unscented product with verified sodium hypochlorite concentration and official matching directions."
      ],
      [
        "Prepare water",
        "Let sediment settle and filter out cloudiness first. Treatment performance depends on clarity, temperature, and product."
      ],
      [
        "Follow official dose and contact time",
        "Use the current CDC directions for the exact concentration. Allow the specified contact time. Never improvise a dosage."
      ],
      [
        "Know the limitations",
        "Chemical disinfection may not kill all parasites. It cannot make water with fuel, industrial chemicals, or radioactive contaminants safe."
      ]
    ],
    "source": "https://www.cdc.gov/water-emergency/about/",
    "image": "assets/water/disinfect.svg"
  },
  {
    "id": "water-storage",
    "icon": 'jar',
    "title": "Store and rotate drinking water",
    "area": "Water • Storage",
    "difficulty": "Essential",
    "intro": "Prevent recontamination and plan a household emergency reserve.",
    "warning": "Avoid previous chemical containers, open buckets, and unclean reused bottles for potable-water storage.",
    "steps": [
      [
        "Estimate demand",
        "Start with at least one US gallon (about 3.8 L) per person daily for emergency planning; increase for heat, pregnancy, health needs and pets."
      ],
      [
        "Use safe containers",
        "Use food-grade containers intended for drinking water. Clean and sanitize them per CDC guidance."
      ],
      [
        "Label and close",
        "Date containers; use tight-fitting lids; handle water with clean tools."
      ],
      [
        "Store appropriately",
        "Keep away from sunlight, heat, pesticides, gasoline and chemicals. Follow guidance for replacement and commercial expiration labels."
      ],
      [
        "Separate uses",
        "Mark untreated and treated water clearly; reserve the safest water for drinking, infant feeding, and food preparation."
      ]
    ],
    "source": "https://www.cdc.gov/water-emergency/about/",
    "image": "assets/water/storage.svg"
  },
  {
    "id": "water-rain",
    "icon": 'rain',
    "title": "Collecting rainwater safely",
    "area": "Water • Collection",
    "difficulty": "Essential",
    "intro": "Learn rainwater collection for non-potable uses and when additional drinking-water treatment may be appropriate.",
    "warning": "Roof runoff can contain bird droppings, metals, smoke debris, chemicals and microorganisms; clear rainwater is not automatically potable.",
    "steps": [
      [
        "Check local laws",
        "Review rainwater collection rules, particularly during drought or fire seasons."
      ],
      [
        "Use clean collection surfaces",
        "Avoid roofing and gutters contaminated by ash, chemicals, lead or other hazards."
      ],
      [
        "Divert polluted first runoff",
        "Commercial first-flush diverters can reduce debris; they do not guarantee potable water."
      ],
      [
        "Use separate containers",
        "Label stored untreated rainwater and prevent mosquito breeding with covered screens."
      ],
      [
        "Treat only when appropriate",
        "Follow local health authority advice and testing for drinking use; boiling alone does not address roof-derived chemical contaminants."
      ]
    ],
    "source": "https://www.cdc.gov/water-emergency/about/",
    "image": "assets/water/rain.svg"
  },
  {
    "id": "water-wells",
    "icon": 'home',
    "title": "Wells and cisterns after disasters",
    "area": "Water • Rural systems",
    "difficulty": "Essential",
    "intro": "Protect private wells, Portuguese boreholes and cisterns before and after flooding or power loss.",
    "warning": "If a well is flooded, damaged, or may be polluted, do not drink its water until appropriately inspected, disinfected and tested.",
    "steps": [
      [
        "Document the system",
        "Identify whether the property has a private well, furo, cisterna, municipal water, or shared supply."
      ],
      [
        "Plan pump power",
        "Know pump voltage, starting surge and approved backup power options. Never improvise house wiring."
      ],
      [
        "After flooding",
        "Do not operate potentially flood-damaged pumps or electrical systems before professional inspection."
      ],
      [
        "Seek testing and treatment",
        "Contact local environmental or public health authorities for sampling, disinfection and return-to-service requirements."
      ],
      [
        "Create separate storage",
        "Maintain treated emergency drinking-water reserves even when a well or cistern is present."
      ]
    ],
    "source": "https://www.cdc.gov/water-emergency/about/",
    "image": "assets/water/well.svg"
  },
  {
    "id": "water-sanitation",
    "icon": 'soap',
    "title": "Water priorities for hygiene",
    "area": "Water • Sanitation",
    "difficulty": "Essential",
    "intro": "Keep potable water for high-priority uses and prevent waste contamination when utilities fail.",
    "warning": "Do not use contaminated water to make infant formula, brush teeth, wash food, or clean wounds unless officials specifically permit its use.",
    "steps": [
      [
        "Protect drinking water",
        "Allocate safest water for drinking, cooking and necessary medical uses."
      ],
      [
        "Separate water uses",
        "Clearly label potable water versus non-potable cleaning or toilet flushing water."
      ],
      [
        "Prevent cross-contamination",
        "Keep dirty containers and wastewater away from treated water, food areas and children."
      ],
      [
        "Wash hands safely",
        "Use safe water and soap when available; follow relevant public-health guidance during outages."
      ],
      [
        "Dispose of wastewater safely",
        "Follow municipality or local authority instructions; do not contaminate streams, wells, or floodwaters."
      ]
    ],
    "source": "https://www.cdc.gov/water-emergency/about/",
    "image": "assets/water/sanitize.svg"
  }
];
window.LOAD_DATA.lessons.push(...window.LOAD_WATER);
