/* Load Science, fourth data file: the photon calculation page and the supernatural
   claims page, from the research addendum dated 2026-11-03. Loaded after data3.js.
   Every item is tagged. Calculated numbers come from the Elam tables (xraydb 4.5.8),
   not NIST XCOM. Claims are recorded as claims, with the claimant and the source
   found. Nothing here is a finding unless a source is named. */
(function () {
  var LS = window.LS;

  var photon = {
    id: "photon",
    title: "Photon calculation",
    blurb: "How much melanin stops X-rays and gamma rays. Tables, a chart, and what it means for the mouse results.",
    blocks: [
      {
        h: "What was run",
        items: [
          { tag: "OPEN", t: "NIST XCOM itself could not be reached. The NIST host returned 403 through the session proxy. So this is not an XCOM run." },
          { tag: "CALCULATED", t: "Instead: Python package xraydb 4.5.8, which holds the Elam photon cross-section tables. The total mass attenuation coefficient of each material is summed by the mass fraction of each element." },
          { tag: "CALCULATED", t: "Check against known values: water at 10 keV gave 5.330 and at 100 keV gave 0.1707. Lead at 100 keV gave 5.549 and at 661.6 keV gave 0.1102. These match the NIST tables as remembered. The NIST numbers were not fetched, so recheck them before citing." },
          { tag: "OPEN", t: "Melanin has no single fixed formula. Three unit formulas were tried: C8H5NO2 (indolequinone), C8H7NO2 (DHI) and C9H7NO4 (DHICA). Real melanin also holds water, metals and protein, and pheomelanin holds sulfur. None of that is included." },
          { tag: "OPEN", t: "Density 1.5 g/cm3 is an assumption, shown with 1.3 and 1.7. The mass coefficient does not depend on density. The half-value layer does.", go: "x/photon", goLabel: "Open the photon explorer" }
        ]
      },
      {
        h: "The chart",
        chart: "photon",
        items: []
      },
      {
        h: "Stopping per gram (cm2 per gram)",
        intro: "Lower means less stopping per gram. Melanin is shown as three unit formulas, beside cellulose, water and lead.",
        table: { head: ["Energy", "Values", "Tag"], rows: [
[
"10 keV",
"Melanin unit C8H5NO2 3.227. DHI unit 3.188. DHICA unit 3.596. Cellulose 4.016. Water 5.33. Lead 130.6. All in cm2 per gram.",
"CALCULATED"
],
[
"30 keV",
"Melanin unit C8H5NO2 0.2909. DHI unit 0.2918. DHICA unit 0.3039. Cellulose 0.3225. Water 0.3756. Lead 30.32. All in cm2 per gram.",
"CALCULATED"
],
[
"60 keV",
"Melanin unit C8H5NO2 0.1844. DHI unit 0.1864. DHICA unit 0.1864. Cellulose 0.1923. Water 0.2059. Lead 5.02. All in cm2 per gram.",
"CALCULATED"
],
[
"100 keV",
"Melanin unit C8H5NO2 0.1572. DHI unit 0.1591. DHICA unit 0.158. Cellulose 0.1621. Water 0.1707. Lead 5.549. All in cm2 per gram.",
"CALCULATED"
],
[
"200 keV",
"Melanin unit C8H5NO2 0.1272. DHI unit 0.1288. DHICA unit 0.1276. Cellulose 0.1308. Water 0.137. Lead 0.9987. All in cm2 per gram.",
"CALCULATED"
],
[
"400 keV",
"Melanin unit C8H5NO2 0.09873. DHI unit 0.09996. DHICA unit 0.09896. Cellulose 0.1014. Water 0.1061. Lead 0.2323. All in cm2 per gram.",
"CALCULATED"
],
[
"661.6 keV (Cs-137)",
"Melanin unit C8H5NO2 0.07978. DHI unit 0.08077. DHICA unit 0.07996. Cellulose 0.08193. Water 0.08575. Lead 0.1102. All in cm2 per gram.",
"CALCULATED"
]
] },
        items: []
      },
      {
        h: "Half-value layer in melanin",
        intro: "The thickness that cuts the beam to half, at three assumed densities.",
        table: { head: ["Energy", "Thickness", "Tag"], rows: [
[
"10 keV",
"Half-value layer in melanin: 0.165 cm at density 1.3, 0.143 cm at 1.5, 0.126 cm at 1.7 (g/cm3).",
"CALCULATED"
],
[
"30 keV",
"Half-value layer in melanin: 1.83 cm at density 1.3, 1.59 cm at 1.5, 1.4 cm at 1.7 (g/cm3).",
"CALCULATED"
],
[
"60 keV",
"Half-value layer in melanin: 2.89 cm at density 1.3, 2.51 cm at 1.5, 2.21 cm at 1.7 (g/cm3).",
"CALCULATED"
],
[
"100 keV",
"Half-value layer in melanin: 3.39 cm at density 1.3, 2.94 cm at 1.5, 2.59 cm at 1.7 (g/cm3).",
"CALCULATED"
],
[
"200 keV",
"Half-value layer in melanin: 4.19 cm at density 1.3, 3.63 cm at 1.5, 3.2 cm at 1.7 (g/cm3).",
"CALCULATED"
],
[
"400 keV",
"Half-value layer in melanin: 5.4 cm at density 1.3, 4.68 cm at 1.5, 4.13 cm at 1.7 (g/cm3).",
"CALCULATED"
],
[
"661.6 keV (Cs-137)",
"Half-value layer in melanin: 6.68 cm at density 1.3, 5.79 cm at 1.5, 5.11 cm at 1.7 (g/cm3).",
"CALCULATED"
]
] },
        items: []
      },
      {
        h: "What the numbers say",
        items: [
          { tag: "CALCULATED", t: "Mass for mass, melanin stops about 7.9 percent less than water at 100 keV and about 7.0 percent less at 661.6 keV." },
          { tag: "CALCULATED", t: "Against cellulose, melanin stops about 3.0 percent less at 100 keV and about 2.6 percent less at 661.6 keV." },
          { tag: "CALCULATED", t: "At 661.6 keV, lead stops about 10 times as much as melanin per centimetre (about 1.25 per cm for lead at 11.35 g/cm3, about 0.12 per cm for melanin at 1.5 g/cm3). Per gram lead is 0.1102 and melanin is 0.0798, so the gap is density and heavy atoms." },
          { tag: "CALCULATED", t: "A 1 mm layer of melanin at 100 keV removes about 2.3 percent of the photons. Half the photons need about 2.9 cm." },
          { tag: "CALCULATED", t: "Lead jumps at its absorption edges, 13.0, 15.2, 15.9 and 88.0 keV. Melanin, made of carbon, hydrogen, nitrogen and oxygen, has no edge in this range." }
        ]
      },
      {
        h: "The patent figure",
        items: [
          { tag: "SECONDARY", t: "A patent document claims a melanin linear attenuation coefficient of 1.4 x 10^4 per cm, far above lead. It names no photon energy and no method.", src: [{ l: "Patent document", u: "https://image-ppubs.uspto.gov/dirsearch-public/print/downloadPdf/8586090" }] },
          { tag: "CALCULATED", t: "At density 1.5 that number needs a mass coefficient near 9,300 cm2 per gram. Melanin's elements give about 2,760 cm2 per gram at 1 keV and less at every higher energy. For photons the patent number is more than three times what the composition allows. The patent may refer to something else, such as a nanoshell with metal or a different radiation. It does not say." }
        ]
      },
      {
        h: "What it means for the mouse results",
        items: [
          { tag: "VERIFIED", t: "Revskaya et al. 2012: mice fed melanin-rich mushrooms survived a lethal 9 Gy of Cs-137 gamma rays about 80 percent of the time. The authors proposed internal shielding by Compton scattering, then radical scavenging.", src: [{ l: "Revskaya paper", u: "https://einsteinmed.edu/uploadedFiles/labs/casadevall/new_website/paper/2011/Revskaya_Chu_12.pdf" }] },
          { tag: "READING", t: "Settled physics: at gamma energies, photon stopping by light-element materials depends mostly on electrons per gram, and that is nearly equal for water, cellulose and melanin. The calculation gives melanin no extra photon-stopping power. So the survival points to chemistry in the tissue, radical scavenging and the stable radicals, not to blocking the beam. This is a reading of the calculation and the mouse paper together. The authors' Compton proposal is not supported by the calculation as a melanin advantage." },
          { tag: "VERIFIED", t: "The beta result agrees: Vasileiou et al., PLOS ONE 2020, found melanin did not shield beta radiation better than cellulose. That is electrons, not photons. Do not mix the two.", src: [{ l: "Vasileiou 2020", u: "https://ideas.repec.org/a/plo/pone00/0229921.html" }] }
        ]
      },
      {
        h: "Still to do",
        items: [
          { tag: "OPEN", t: "Run the real NIST XCOM web tool and compare with these tables." },
          { tag: "OPEN", t: "Find a primary paper with measured melanin density and elemental analysis." },
          { tag: "OPEN", t: "Find any published gamma attenuation coefficient for melanin." }
        ]
      }
    ]
  };

  var claims = {
    id: "claims",
    title: "Supernatural claims",
    blurb: "What science still cannot explain, and what is only claimed.",
    blocks: [
      {
        h: "Two different things",
        items: [
          { tag: "OPEN", t: "Keep these apart. First: properties of melanin that science itself calls unexplained. Those are real and documented below. Second: claims of supernatural ability. Those are recorded as claims, with who made them and what source was found." },
          { tag: "OPEN", t: "Evidence and reading are kept separate. The page records what was searched and found. The determination of certainty belongs to the reader." }
        ]
      },
      {
        h: "Unexplained in the science",
        items: [
          { tag: "OPEN", t: "The molecular structure of melanin. Reviews list the right primary and secondary structural models for each melanin type as unanswered.", src: [{ l: "Soft Matter 2006", u: "https://pubs.rsc.org/en/content/articlehtml/2006/sm/b511922g" }] },
          { tag: "OPEN", t: "How oligomers build up into melanin particles is far less understood than the molecules themselves. A 2017 Int J Mol Sci review.", src: [{ l: "IJMS 2017", u: "https://mdpi.com/1422-0067/18/9/1901" }] },
          { tag: "OPEN", t: "Whether the protein host in living tissue is a leftover of synthesis or is needed for function." },
          { tag: "OPEN", t: "How melanin is made and how it is organised inside the melanosome.", src: [{ l: "PubMed review", u: "https://pubmed.ncbi.nlm.nih.gov:443/19627559" }] },
          { tag: "OPEN", t: "Why absorption is so broad: many chromophores, disorder, or scattering. And why exciting different chromophores gives a common excited-state signal, with parallels to disordered carbon nanomaterials.", src: [{ l: "Chemical Science 2020", u: "https://pubs.rsc.org/en/content/articlehtml/2020/sc/c9sc04527a" }] },
          { tag: "OPEN", t: "How conduction works: proton current and the water-made semiquinone radical.", src: [{ l: "RSC Advances 2019", u: "https://pubs.rsc.org/en/content/articlehtml/2019/ra/c8ra09093a" }] },
          { tag: "HYPOTHESIS", t: "Whether melanin can capture radiation energy for growth. Dadachova et al. 2007 showed faster growth of melanized fungi under radiation about 500 times background and a fourfold rise in melanin electron transfer in a lab test. The mechanism is not solved.", src: [{ l: "PLoS ONE 2007", u: "https://www.plosone.org/doi/pone.0000457" }] },
          { tag: "UNVERIFIED", t: "Any quantum effect, such as coherence or tunnelling, in eumelanin photoprotection. Nothing found." },
          { tag: "UNVERIFIED", t: "Any experiment showing a magnetic-field effect on eumelanin radical pairs, or melanin-based magnetoreception. Nothing found. The closest is a 2026 Materials Advances EPR study of Sepia melanin, dry and hydrated, which describes its magnetic behaviour. It is not a biological field-effect test.", src: [{ l: "Materials Advances 2026", u: "https://pubs.rsc.org/en/content/articlepdf/2026/ma/d6ma00204h" }] }
        ]
      },
      {
        h: "Measurement gaps found",
        items: [
          { tag: "UNVERIFIED", t: "Microwave, 0.3 to 300 GHz: no direct measurement of eumelanin permittivity or absorption was found. The broadband work covers 1 Hz to 1 MHz and 0.2 to 3 THz and skips the GHz band.", src: [{ l: "RSC Advances 2019", u: "https://pubs.rsc.org/en/content/articlehtml/2019/ra/c8ra09093a" }] },
          { tag: "VERIFIED", t: "Nearest method precedent: a 1977 Faraday Transactions study measured hydrated protein powders at 9.9 GHz by cavity perturbation. Only water bound in the secondary hydration layers added much dielectric loss. It is not about melanin.", src: [{ l: "Record", u: "https://dspace.bits-pilani.ac.in/items/e7d04a14-39b9-4ed5-b490-c0464d885703/full" }] },
          { tag: "VERIFIED", t: "A 2022 Phys. Chem. Chem. Phys. paper used dielectric spectroscopy on eumelanin and allomelanin at several hydration levels over 123 to 293 K. Low-frequency method.", src: [{ l: "PCCP 2022", u: "https://pubs.rsc.org/en/content/articlelanding/2022/cp/d2cp01383e" }] },
          { tag: "VERIFIED", t: "Ultrafast: Gauden et al. 2009 studied DHI, a eumelanin building block, at 266 nm. The first excited state decays in 5 to 10 ps. The DHI cation radical (band near 575 nm) and the triplet (440 to 450 nm) appear. A later step decays in about 140 to 180 ps." },
          { tag: "VERIFIED", t: "Aloi et al. 2015, femtosecond transient absorption of synthetic eumelanin: an inverse Raman effect changes the sign of the signal but not the relaxation times. The time constants were not in the abstract." },
          { tag: "VERIFIED", t: "The Kohler group at Ohio State studies photoprotection and photodamage together. Eumelanin can make radicals and reactive oxygen species. It is a double-edged sword.", src: [{ l: "Kohler lab", u: "https://research.cbc.osu.edu/kohler.40/research/melanin-photophysics/" }] },
          { tag: "UNVERIFIED", t: "A sub-picosecond component in eumelanin was not confirmed in any result. DHI is a building block, not whole melanin." }
        ]
      },
      {
        h: "Claims of supernatural ability",
        intro: "Each row is a claim, who made it, and what primary scientific evidence was found.",
        table: {
          head: ["Claim", "Source and finding", "Tag"],
          rows: [
            ["Supernatural powers such as extrasensory perception", "Frances Cress Welsing: essay 1970, reprinted in The Black Scholar 1974, expanded in The Isis Papers 1991. Example given: George Washington Carver, whose melanin let plants talk to him. Seen through Wikipedia and Encyclopedia.com summaries. No peer-reviewed measurement was found.", "NOTSUPPORTED"],
            ["Melanin is a room-temperature superconductor", "A non-peer-reviewed web article (qmrf.pages.dev), repeated in popular sources. Peer-reviewed work, Mostert et al. PNAS 2012, shows hydrated melanin is an electronic-ionic hybrid conductor. That is ordinary conduction, not superconductivity.", "NOTSUPPORTED"],
            ["Ordered sheets raise conductivity", "A 2019 Frontiers in Chemistry study, seen only through a Russian news summary, raised eumelanin conductivity by a large factor by ordering it. Still ordinary conduction.", "SECONDARY"],
            ["Melanin, the pineal gland and higher consciousness", "Lecture titles listed under Dr. Richard King, M.D.: Melanin and the Pineal Gland, Bi-polarism, Melanin and Higher Consciousness. Titles only. No claims or sources on the page.", "UNVERIFIED"],
            ["Melanin as a sound or acoustic transducer", "Nothing found.", "UNVERIFIED"],
            ["Melanin as the chemical key", "Carol Barnes, Melanin: The Chemical Key to Black Greatness (1988). The book was not found in this search.", "UNVERIFIED"]
          ]
        },
        items: [
          { tag: "OPEN", t: "Name clash: the historian Richard H. King (1942 to 2022, author of Race, Culture, and the Intellectuals) is a different person from the melanin lecturer. Do not attribute the melanin claims to the historian." },
          { tag: "SECONDARY", t: "Critique on record, as reported: Ortiz de Montellano published analyses of the biological basis of the melanin theory. Marc Kreidler wrote Magic Melanin in Skeptical Inquirer, 1992. The primary texts were not read.", src: [{ l: "Frances Cress Welsing", u: "https://en.wikipedia.org/wiki/Frances_Cress_Welsing" }, { l: "The Isis Papers", u: "https://en.wikipedia.org/wiki/The_Isis_Papers:_The_Keys_to_the_Colors" }] }
        ]
      },
      {
        h: "Pineal gland: melatonin is not melanin",
        items: [
          { tag: "VERIFIED", t: "The pineal gland's main product is melatonin. Melatonin is not melanin, the skin and hair pigment.", src: [{ l: "Science Feedback", u: "https://science.feedback.org/review/insufficient-evidence-to-support-kanye-west-claim-fluoride-in-toothpaste-harms-pineal-gland-joe-rogan-experience/" }] },
          { tag: "UNVERIFIED", t: "Melanin pigment in the human pineal was not found in the sources searched." },
          { tag: "VERIFIED", t: "Pineal calcification is common. Fluoride is readily taken into hydroxyapatite and can form fluoroapatite. Chlubek and Sikora 2020 report the gland may collect large amounts of calcium and fluoride.", src: [{ l: "Applied Sciences 2020", u: "https://mdpi-res.com/d_attachment/applsci/applsci-10-02885/article_deploy/applsci-10-02885.pdf" }] },
          { tag: "VERIFIED", t: "Luke 2001 found that more calcium in the gland went with more fluoride in cadavers. Reviews say human studies have not shown a clear link between fluoride and loss of pineal function. Causal harm in humans is not established.", src: [{ l: "Health Feedback", u: "https://healthfeedback.org/?p=26813" }] },
          { tag: "VERIFIED", t: "A 2019 rat study found a fluoride-free diet raised pineal growth in aged males.", src: [{ l: "PubMed 31713773", u: "https://pubmed.ncbi.nlm.nih.gov/31713773/" }] },
          { tag: "OPEN", t: "This is about the pineal gland and fluoride. It is not a melanin finding." }
        ]
      },
      {
        h: "What the ancient texts say",
        items: [
          { tag: "NOTEXT", t: "The ACR texts searched make no claim of supernatural ability from skin colour or from melanin. The word melanin appears once in all the ACR data files, in an Orit note, not in a verse.", go: "s/texts", goLabel: "Open the ancient texts page" }
        ]
      },
      {
        h: "The owner's reading",
        items: [
          { tag: "OPEN", t: "Evidence found: melanin has real, documented, still-unexplained properties, listed above. No peer-reviewed measurement of any extrasensory, spiritual or supernatural effect of melanin was found in the sources searched. The owner's reading, with the source it rests on, is recorded here as a Reading beside this evidence once supplied." }
        ]
      }
    ]
  };

  /* Insert: photon after the gamma page, claims after the notsupported page. */
  function insertAfter(id, sec) {
    var at = LS.sections.length;
    LS.sections.forEach(function (s, i) { if (s.id === id) { at = i + 1; } });
    LS.sections.splice(at, 0, sec);
  }
  insertAfter("gamma", photon);
  insertAfter("notsupported", claims);

  /* Pointers from existing pages. */
  LS.sections.forEach(function (s) {
    if (s.id === "gamma") {
      s.blocks[s.blocks.length - 1].items.push({ tag: "OPEN", t: "The full tables, a chart and what the calculation means for the mouse results are on the photon calculation page.", go: "s/photon", goLabel: "Open the photon calculation page" });
    }
    if (s.id === "notsupported") {
      s.blocks[s.blocks.length - 1].items.push({ tag: "OPEN", t: "The full record, with the claimants, the unexplained science and the pineal gland, is on the supernatural claims page.", go: "s/claims", goLabel: "Open the supernatural claims page" });
    }
  });

  /* Sources. */
  [
    { l: "Photon table check: Vasileiou 2020", u: "https://ideas.repec.org/a/plo/pone00/0229921.html" },
    { l: "Soft Matter 2006 (open questions)", u: "https://pubs.rsc.org/en/content/articlehtml/2006/sm/b511922g" },
    { l: "IJMS 2017 (melanin assembly)", u: "https://mdpi.com/1422-0067/18/9/1901" },
    { l: "Melanogenesis review (PubMed)", u: "https://pubmed.ncbi.nlm.nih.gov:443/19627559" },
    { l: "Materials Advances 2026 (Sepia melanin EPR)", u: "https://pubs.rsc.org/en/content/articlepdf/2026/ma/d6ma00204h" },
    { l: "Microwave precedent (9.9 GHz proteins)", u: "https://dspace.bits-pilani.ac.in/items/e7d04a14-39b9-4ed5-b490-c0464d885703/full" },
    { l: "Eumelanin and allomelanin dielectric (PCCP 2022)", u: "https://pubs.rsc.org/en/content/articlelanding/2022/cp/d2cp01383e" },
    { l: "Kohler lab melanin photophysics", u: "https://research.cbc.osu.edu/kohler.40/research/melanin-photophysics/" },
    { l: "Frances Cress Welsing (Wikipedia)", u: "https://en.wikipedia.org/wiki/Frances_Cress_Welsing" },
    { l: "The Isis Papers (Wikipedia)", u: "https://en.wikipedia.org/wiki/The_Isis_Papers:_The_Keys_to_the_Colors" },
    { l: "Pineal and melatonin (Science Feedback)", u: "https://science.feedback.org/review/insufficient-evidence-to-support-kanye-west-claim-fluoride-in-toothpaste-harms-pineal-gland-joe-rogan-experience/" },
    { l: "Pineal fluoride review (Health Feedback)", u: "https://healthfeedback.org/?p=26813" },
    { l: "Pineal and fluoride (Applied Sciences 2020)", u: "https://mdpi-res.com/d_attachment/applsci/applsci-10-02885/article_deploy/applsci-10-02885.pdf" },
    { l: "Fluoride-free diet and pineal growth (PubMed 31713773)", u: "https://pubmed.ncbi.nlm.nih.gov/31713773/" }
  ].forEach(function (s) {
    var have = LS.sources.some(function (x) { return x.u === s.u; });
    if (!have) { LS.sources.push(s); }
  });
})();
