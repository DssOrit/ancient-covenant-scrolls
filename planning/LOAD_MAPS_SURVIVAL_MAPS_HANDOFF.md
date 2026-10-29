# LOAD MAPS - COMPREHENSIVE SURVIVAL MAPS (saved 2026-10-29, build AFTER everything else and after the images are placed)

Saved from the owner's message of 2026-10-29. Owner's note: save this for after Load Survival is fully built and the images from the prompts are added. Do not start without the exact unlock phrase for Load Maps ("edit Load Maps" or "fix Load Maps"), a backup, break-risk checks, and a merge link (CLAUDE.md rules 8, 38, 39). Companion research file: `planning/Location-Specific_Survival_and_Emergency-Preparedness_Research.docx` (owner upload).

## Owner principle (2026-10-29, applies to ALL Load Survival and Maps work)
The site must not depend on resources that cannot be reached during an event. Government sites (CDC, NHS, FEMA, agency pages) may be down or unreachable in a disaster. Every guide must carry its own full how-to steps inside the app, written so they work with no link opened. Outside links are for extra reading only, never the only place a step lives. Use non-government knowledge too (manuals, field craft, community practice), clearly labelled with what kind of source it is.

## Owner intent
Extend the existing Load Maps project. Do not rebuild from scratch, delete features, or change other Load products. Add-only. The survival module is named Survival Maps. Dyslexia-friendly, readable on iPad Safari, uncluttered, useful without paid API keys. User data stays private; never auto-send saved addresses, routes, contacts or plans to outside services.

## A. Goal and safety rules
Location-based preparedness map for 12 places in the US and Portugal: topographic and context maps, water features, risk overlays, evacuation and shelter references, infrastructure, off-grid supply resources, family and accessibility planning, and reliably sourced links. Every location gets a working basic map and a labelled source directory even if some GIS feeds are pending.

Never claim a map is a live dispatch service, a route is guaranteed safe, a water source is potable, a shelter is open, or a resource can lawfully be harvested. Only current local authorities decide active evacuations, closures and shelter status.

The four warnings on EVERY local page:
1. Source status: "Information is linked to the named source below. Each data layer shows whether the source has been opened and the date it was last checked. Unchecked information is marked 'Verification pending.'" Never write "cited to us."
2. Water safety: "Rivers, lakes, ponds, wells and springs are NOT confirmed drinking-water sources. Water must be tested and appropriately treated. Boiling or ordinary disinfection does not remove chemicals, heavy metals or salt; water exposed to chemicals may not be made safe by these methods."
3. Access and legality: "A mapped location does not establish public entry, fishing, camping, water extraction, fire-making or overnight-stay permission. Check the land manager and local law; closures change."
4. Connectivity: "Live alerts, directions, shopping, and external maps require internet. Offline information works only after its map package and guide have been downloaded. Saved data may become outdated."

Show briefly at page top via an expandable "Safety & map limits" control; full text always in the page footer and in printable/PDF versions. Critical water and evacuation warnings must be conspicuous near the relevant map interactions, not only the footer.

## B. The 12 locations (stable slug each, own landing page)
| ID / slug | Place and jurisdiction | Starting map emphasis |
|---|---|---|
| us-ca-san-pedro | San Pedro, City of Los Angeles, LA County, CA | Coastal tsunami evacuation, harbor/coastal flooding, earthquakes, wildfire smoke, public access |
| us-ca-palmdale | Palmdale, LA County, CA | Heat, wildfire, high winds, earthquakes, road closures, sparse water |
| us-ca-los-angeles | Los Angeles (city proper), CA | Neighborhood-scale earthquake, wildfire, extreme heat, flood and evacuation jurisdiction boundaries |
| us-ca-valencia | Valencia area of Santa Clarita, LA County, CA | Wildfire and evacuation corridors, heat, earthquakes, river/drainage features |
| us-fl-jacksonville | Jacksonville, Duval County, FL | Hurricane surge and riverine flooding, evacuation zones, St. Johns River, heat |
| us-fl-orlando | Orlando, Orange County, FL | Tropical-storm rainfall and inland flooding, extreme heat, shelters, lakes |
| us-sc-conway | Conway, Horry County, SC | Waccamaw River flooding, river forecasts, tropical storms, road closures |
| us-ohio-statewide | Ohio statewide | Statewide map; require county or city selector for local directions and resources |
| pt-coimbra | Coimbra, Portugal | Mondego River and flood risk, rural fire, extreme heat, power outages |
| pt-lisboa | Lisbon / Lisboa, Portugal | Earthquake preparedness, coastal/estuarine flood and tsunami zones, heat |
| pt-porto | Porto, Portugal | Douro River / coastal flood, intense rain, steep terrain, power outages |
| pt-setubal | Setubal (Setúbal), Portugal | Sado Estuary, coastal/storm hazards, rural fire, earthquake, heat |

Jacksonville = Florida (not the historic Jacksonville in California, now under Don Pedro Reservoir per the research file). Ohio is a state: require a county or city selector. Los Angeles proper: neighborhood selection, not uniform city-wide hazards. Keep accents in visible names (Setúbal; Lisboa when Portuguese is selected).

## C. Information architecture
Main navigation: Maps | Survival Maps | Saved Offline | My Safety Plan | Sources | Settings. Under Survival Maps: country tabs United States / Portugal, location search, 12 location cards. Each city page:
1. Summary: name, jurisdiction, hazards to review, offline status, official-alert shortcut.
2. Large map with overlays and legend.
3. Water and Terrain: rivers, reservoirs, ponds, lakes, wetlands, springs, public taps/fountains ONLY if documented; elevation, contours, steep roads, bridges, land cover, trail condition where licensed.
4. Safety and Hazards: official floodplain, coastal inundation/tsunami where relevant, evacuation zone, fire hazard, earthquakes, extreme heat, closures; label permanent hazard reference vs live incident.
5. Help and Essential Services: hospitals, clinics, pharmacies, fire and police, designated shelters/assembly points, cooling/warming centers, accessible resources, animal shelters. Never assert open-now unless verified from an authoritative live feed.
6. Off-grid preparation: power and charging, solar suitability (planning only), potable storage, well pump backup checklist, propane/wood rules, generator safety, supply retailers and equipment services. Stores are not promises of inventory.
7. Family and Access Needs: seniors, pregnancy, babies, wheelchair users, cognitive/sensory access, chronic illness, powered medical equipment, service animals, pets. Printable checklist without requiring diagnoses.
8. Routes: online navigation, alternates, bridge/steep-grade preferences when trustworthy data exists, exportable GPX/KML for user-set routes. Never label generic routing as an official evacuation route; official guidance is a separate authoritative layer or link.
9. Offline / Print: download area package, plain-language instructions, printable regional source list, local safety plan. Show coverage, package size, publication date, freshness, storage use.
10. Sources and verification: agency URLs, maps, licenses, check timestamps, failure details.

## D. Layers and provenance
Layer order: base street map; terrain/contour/elevation; verified hydrology; official flood hazards; official fire hazard; official tsunami/coastal hazard; earthquakes/faults; local evacuation zones (official, never inferred); emergency services; public/restricted lands; accessible resources; saved user pins. Opacity slider, visible legends, tap-to-explain symbols. Not all risk overlays are live.

Per-feature fields: id, locationId, nameEnglish, nameLocal, geometry, category, subtype, managingAgency, sourceTitle, sourceUrl, sourceDatasetId, sourceAgency, accessVerification (verified_public, restricted, unknown), waterPotability (untested, tested_date, prohibited, not_applicable), collectionRulesUrl, fishingRulesUrl, campingRulesUrl, updateFrequency, sourceLastPublishedAt, sourceLastCheckedAt, sourceOpened (boolean), verificationStatus (verified, partial, pending, failed, expired), connectivity (offline_packaged, live_online, external_online), license, attribution, notes, reviewDueAt.

Never fake last-verified timestamps. A retrieved HTML page does not prove an individual geospatial feed, embed or POI is validated; track separately. If a source fails: "Verification pending - link could not be opened"; keep the reference; suppress claims that depend on unseen content. Never publish guessed coordinates; use authoritative GeoJSON or validated geocoding with boundary sanity checks. Blue "Surface water - not certified potable" vs green "Official potable-water distribution point - verified". Never present hydrants, fire ponds, wells or streams as drinking sources. Track seasonal drying, private ownership, chemical/flood contamination unknowns.

## E. Source starting pages (found 2026-10-29; NOT proof that sublinks or datasets work)
United States:
- USGS National Map Viewer: https://www.usgs.gov/tools/national-map-viewer
- USGS National Map services: https://apps.nationalmap.gov/services/
- FEMA flood maps: https://msc.fema.gov/portal/home
- California Geological Survey tsunami maps: https://conservation.ca.gov/cgs/tsunami/maps
- LA County hazards MapServer: https://public.gis.lacounty.gov/public/rest/services/LACounty_Dynamic/Hazards/MapServer
- Florida Know Your Zone: https://www.floridadisaster.org/planprepare/know-your-zone-know-your-home/
- Florida emergency information: https://www.floridadisaster.org/info/info2/
- Jacksonville/Duval evacuation zones: https://www.jaxready.com/Alerts/Evacuation-Zones
- SC DNR floodplain viewer: https://scfloodimpact.com/Index
- SC DNR flood map directory: https://dnr.sc.gov/water/flood/floodmaps.html
- Ohio DNR floodplain mapping: https://ohiodnr.gov/discover-and-learn/land-water/issues-for-landowners/floodplain-mapping
- NWS tsunami maps: https://www.weather.gov/nthmp/tsunamimaps

Portugal:
- APA / SNIRH service: https://www.gov.pt/servicos/consultar-o-sistema-nacional-de-informacao-de-recursos-hidricos
- IPMA rural fire danger: https://www.ipma.pt/pt/riscoincendio
- DGT rural fire hazard map: https://www.dgterritorio.gov.pt/atividades/paisagem/ptp/carta-perigosidade-incendio-rural
- ANEPC risk material: https://prociv.gov.pt/pt/prevencao-e-preparacao/avaliacao-de-riscos/riscos-mistos/
- ICNF: https://www.icnf.pt/

Still to research: municipal civil-protection and local flood/evacuation map links for each of the 12 pages, current contacts, shelters, free public-water locations, legal land-use rules. Not verified until opened. (Government hosts are blocked in some sessions; see Network access.)

## F. Per-location minimum
location.json plus a human-readable guide: verified boundary, basemap, one authoritative hazard link, one authoritative water/terrain link, emergency phone and authority, utility-outage checklist, vulnerable-population guidance, attribution, offline status.
- San Pedro: coast and Port of LA tsunami hazard areas; shoreline/harbor is not drinkable; do not extrapolate evacuation streets from polygons.
- Palmdale: desert heat, wildfire, wind, faults; mark reservoirs/channels only from GIS; never suggest aqueduct water is accessible or potable.
- Los Angeles proper: city boundaries plus neighborhoods, local emergency maps and corridors; adjacent county city boundaries differ.
- Valencia: Santa Clarita area; wildfire interface and route access; validate Santa Clara River and public access.
- Jacksonville: official Duval A-F zone lookup; St. Johns River is surface water, NOT potable.
- Orlando: county flood and storm shelter systems, heat; lakes need water-source warnings and access review.
- Conway: Waccamaw River with SCDNR viewer; show its disclaimer that approximations are not for personal evacuation decisions.
- Ohio: statewide overview with mandatory county/city drill-down before any shelters, routes, river access or local rules.
- Coimbra: Mondego and tributaries with APA/SNIRH; fire danger with IPMA/DGT; water resource mapping is not safe public collection.
- Lisbon: Tagus/Tejo estuary and flood/tsunami/earthquake sources; validate municipal civil-protection instructions.
- Porto: Douro, estuary, coastal flooding; accessible routes on steep streets cannot be asserted without slope/sidewalk audits.
- Setúbal: Sado estuary, coast, rural fire; distinguish protected-area constraints from geographic visibility.

## G. Seniors, pregnancy, disability, animals
Filters/toggles: Senior-friendly, Pregnancy, Mobility accessible, Powered medical equipment, Infants/children, Sensory accessibility, Pets/service animals. Filters never hide other emergency resources by default. Each location has: senior plan (transport contact, medicines and prescription copies, glasses/hearing-aid batteries, insulated sleep area in cold outages, cooling in heat, check-in buddy, pickup and stair/elevator outage plan); pregnancy (prenatal record and clinician contact, verified obstetric-capable hospital directory - not live admissions, transport alternatives, clean water, heat management, urgent-symptom plan, never delay emergency care); powered equipment (runtime per device as supplied by user, backup compatibility, provider and utility registration, verified refuge/charging, no guaranteed power); disability/neurodiversity (keyboard and screen reader, simple directions, high contrast, large type, verified wheelchair metadata, accessible alert links); pets (pet-friendly shelter policy only if confirmed for that shelter and date; never assume a shelter accepts five dogs). Emergency numbers: USA 911, Portugal 112. Always show "Call the local emergency number if in immediate danger."

## H. Offline-first engineering
Suggested: MapLibre GL JS where compatible; PMTiles or similar licensed archives; downloadable GeoJSON for emergency features. Use the existing map engine if stable; no second incompatible stack. Area packs in IndexedDB/OPFS with per-package consent, versioning, integrity checks, low-storage detection. Service worker for app shell, offline guides, user plans, permitted static resources.
HARD CONSTRAINT: do NOT bulk download tiles from tile.openstreetmap.org or vector.openstreetmap.org (policy: https://operations.osmfoundation.org/policies/tiles/). Do not assume Google Maps tiles may be saved. Keep attributions visible.
Offline screen must separate: Downloaded and available (map geometry, embedded guide, static source directory, user plans); Internet needed (new alerts, evacuation orders, weather, road status, live shelters, shopping inventory, new geocoding/routing, agency sites); Not yet downloaded. Offline routing is a later milestone needing licensed graph data; until then a saved route is reference only with a closure warning. iPad Safari tests: persistence, updates, large downloads, airplane-mode reopen, storage eviction, gestures, pinch zoom, restored connectivity.

## I. Governance
Source registry and admin review dashboard. Every feed declares data_kind (static_hazard | forecast | live_alert | resource_directory), refresh interval, last successful fetch, next review, agency, jurisdiction, terms, local fallback. Never label a historic hazard map "current emergency conditions." If a live feed fails: LIVE STATUS UNAVAILABLE and open the agency page when online. No claims on statutes, fishing seasons, water withdrawal, free camping, access or burning rules without a current official source and date. Flood-risk maps are not instructions to enter a flood area. Show "Report incorrect data" and "View original source."

## J. UI
Premium slim icons, large readable controls, restrained high-contrast palette. English first, Portuguese second on Portugal pages (Water Sources / Fontes de água). No dense walls of text; short numbered steps, accessible tables, Beginner / Expert modes. Markers use icon and text, never colour alone. Plain words (e.g. "Flood hazard map" with explainer). Ask before GPS; never send GPS out without explicit choice. Presets work without geolocation. Never expose private saved addresses.
Location card: [City, Country] [Choose Map] [Download Offline] [Official Alerts]. Detail tabs: Overview | Water | Hazards | Help | Off-grid | Accessibility | Sources.

## K. Phases and QA
1. Safe foundation: inspect repo, preserve behaviour; 12 presets and boundaries, source registry, legend, mandatory notices, layer toggles, official links; static first.
2. US geodata (USGS hydrography/terrain, FEMA, California county and tsunami, Florida zones, SC, Ohio).
3. Portugal geodata (APA, IPMA/DGT, municipal directories, Portuguese names, legal-access checks).
4. Accessibility and family plans; printable one-page local guides.
5. Offline packages: authorised tiles, source directory, offline guide, progress, quotas, airplane-mode QA.
6. Live data where practical; disabled when no feed; never an unofficial "all clear".
Tests: each preset loads correct country/city/bounds; Jacksonville = Florida; Ohio prompts county; overlays stay inside coverage; water features show non-potable warning; unknown access shows unknown; every source shows agency and link; offline mode shows no fake live info; no tile scraping; iPad Safari touch/VoiceOver/keyboard; readable offline guide remains if map or alert fails; official evacuations override app routes.
Deliver: changed-files manifest, screenshots per location, source-verification ledger (URL/opened/time/agency/license), offline coverage matrix, QA results, known limitations, and the full deployed test URL (or an honest statement that nothing was deployed).

## L. Instruction to Claude
Inspect the existing Load Maps repo and implement without regressions. No API keys or subscriptions for the basic MVP. Real source-backed layers over decorative placeholders. All 12 pages and core map shell first, then layers only when licensing and provenance are verified. Privacy-preserving, beginner-friendly, offline-capable in the strict sense above. Never invent routes, features, POI coordinates, public access, drinkability or live status. Return changed files, verification audit, test report, and a full deployed URL if actually deployed.
