/* Status labels for guides written earlier. Anything not listed here shows as "Not confirmed" (general guidance).
   Checked date: 18 Oct 2026. Sources are named pages found in search results. The pages themselves could not be opened directly. */
window.LOAD_STATUS = {
  'g-power-outage': { status: 'partly', checkedOn: '18 Oct 2026',
    sources: [['USDA FSIS: keeping food safe in an emergency', 'https://www.fsis.usda.gov/es/node/3347'], ['CDC: prevent carbon monoxide poisoning', 'https://www.cdc.gov/natural-disasters/psa-toolkit/prevent-carbon-monoxide-poisoning.html']],
    unconfirmed: ['Fridge about 4 hours, full freezer about 48 hours and half-full about 24 hours match FSIS. The rule to discard perishables above 40 F (4 C) for more than 2 hours was not found on the FSIS pages we saw. They show a 4-hour rule. Check the current FSIS page.', 'Refreezing is safe when food still has ice crystals or is at 40 F or below (FSIS).'] },
  'g-making-electricity': { status: 'partly', checkedOn: '18 Oct 2026',
    sources: [['CDC: prevent carbon monoxide poisoning', 'https://www.cdc.gov/natural-disasters/psa-toolkit/prevent-carbon-monoxide-poisoning.html']],
    unconfirmed: ['Generator at least 20 ft (6 m) from doors, windows and vents, and a battery CO alarm, match CDC.', 'The watt-hours for a phone charge, the 0.85 efficiency figure and device wattages are general figures. They were not checked against a named source.'] },
  'wx-river': { status: 'partly', checkedOn: '18 Oct 2026',
    sources: [['CDC emergency water: bleach doses', 'https://www.cdc.gov/water-emergency/communication-resources/'], ['CDC: a guide to water filters', 'https://www.cdc.gov/parasites/crypto/gen_info/filters.html']],
    unconfirmed: ['8 drops of bleach per gallon for clear water, 16 for cloudy water, and a 30-minute wait match CDC. Strain or settle cloudy water first.', 'A filter of 1 micron or smaller (absolute) removes Cryptosporidium and Giardia (CDC).', 'We did not find a source for 0.3 micron removing bacteria, or for filters not removing viruses. Read the label of your filter.'] },
  'wx-rain': { status: 'partly', checkedOn: '18 Oct 2026',
    sources: [['CDC emergency water: bleach doses', 'https://www.cdc.gov/water-emergency/communication-resources/']],
    unconfirmed: ['The bleach dose and wait time match CDC. The 10-minute first flush and roof advice are general guidance and were not checked against a named source.'] },
  'water-bleach-dose': { status: 'partly', checkedOn: '18 Oct 2026',
    sources: [['CDC emergency water: bleach doses', 'https://www.cdc.gov/water-emergency/communication-resources/']],
    unconfirmed: ['8 drops per gallon for clear water, and a 30-minute wait, match CDC. CDC gives 16 drops for cloudy water.', 'This dose is for plain, unscented bleach of 5 to 6%. Stronger bleach needs a bit less. Read the label.', 'A dose for 1% bleach was seen only on a secondary table. It is not included.'] },
  'g-wildfire': { status: 'general' }, 'g-earthquake-tsunami': { status: 'general' },
  'g-hurricane': { status: 'general' }, 'g-tornado': { status: 'general' }
};
