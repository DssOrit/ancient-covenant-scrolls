/* Load Science, second data file: lesser-known research, quick facts, spectrum bands,
   photon table (calculated), glossary. Loaded after data.js. */
(function () {
  var LS = window.LS;

  LS.tags.CALCULATED = "Calculated in this project from published tables. Assumptions are shown.";

  /* Lesser-known research page, inserted after the electronics page. */
  var discoveries = {
    id: "discoveries",
    title: "Lesser-known research",
    blurb: "Hearing, heart, fossils, feathers, batteries, fungi and more.",
    blocks: [
      {
        h: "Hearing: pigment cells inside the ear",
        items: [
          { tag: "VERIFIED", t: "Pigment cells (melanocytes) sit in the stria vascularis of the inner ear. They come from the neural crest. The melanin-making cells there (intermediate cells) are needed for stria development, endolymph production and the endocochlear potential, the electrical charge that hearing depends on.", src: [{ l: "Targeting the melanocytes of the inner ear", u: "https://researchworks.creighton.edu/esploro/outputs/journalArticle/Targeting-the-melanocytes-of-the-inner/991006241222002656" }] },
          { tag: "VERIFIED", t: "Toxigenic ablation of the intermediate cells in mice abolished the endocochlear potential. Mitf-mutant mice with fewer melanocytes had raised hearing thresholds, no endocochlear potential and stria abnormalities.", src: [{ l: "Intermediate-cell ablation record", u: "https://experts.arizona.edu/en/publications/precise-toxigenic-ablation-of-intermediate-cells-abolishes-the-ba/" }] },
          { tag: "SECONDARY", t: "Steel and Barkway (1989): mice of the viable dominant spotting mutant (KitW-v/W-v) lacked strial melanocytes and most lost the endocochlear potential. Seen only through later summaries. The 1989 paper was not read." },
          { tag: "VERIFIED", t: "Lin, Maas, Chien, Carey, Ferrucci, Thorpe. JARO 13(1):109-117 (2012). NHANES 2003-2004, 1,258 adults aged 20 to 59, skin colour on the Fitzpatrick scale. Race and ethnicity were linked to hearing thresholds, but the link was not significant once adults were grouped by skin colour. Among Hispanic participants, darker skin went with about 2.5 dB better speech thresholds.", src: [{ l: "JARO 2012 (Springer)", u: "https://link.springer.com/article/10.1007/s10162-011-0298-8" }] },
          { tag: "OPEN", t: "In the same study the skin-colour link was not significant among white or Black participants. The authors concluded skin pigmentation is independently linked to hearing in Hispanics and may mediate the race and ethnicity link. One study. Not settled." }
        ]
      },
      {
        h: "Vitamin D: the binding-protein finding",
        items: [
          { tag: "VERIFIED", t: "Powe et al. NEJM 369:1991-2000 (2013). Mean total 25-hydroxyvitamin D was 15.6 ng/mL in Black participants and 25.8 ng/mL in white participants. Vitamin D-binding protein was about half as high (168 against 337 mcg/mL).", src: [{ l: "PubMed 24256378", u: "https://pubmed.ncbi.nlm.nih.gov/24256378/" }, { l: "Healio summary", u: "https://www.healio.com/news/endocrinology/20131126/et1113powe_10_3928_1081_597x_20131101_25_1321882" }] },
          { tag: "VERIFIED", t: "Two common variants in the binding-protein gene explained about 79 percent of the variation in binding protein and about 10 percent of the variation in total 25-hydroxyvitamin D." },
          { tag: "VERIFIED", t: "Estimated bioavailable 25-hydroxyvitamin D was 2.9 ng/mL in Black participants and 3.1 ng/mL in white participants (homozygous groups). These were calculated estimates, with a subset measured directly. Bone mineral density was 1.05 g/cm2 in Black participants against 0.94 in white participants." },
          { tag: "OPEN", t: "The study was observational. A Clinical Chemistry commentary said that, if confirmed, the findings would require revisiting guidelines. Several authors disclosed a pending patent on using bioavailable vitamin D to assess status.", src: [{ l: "Clinical Chemistry commentary", u: "https://academic.oup.com/clinchem/article/60/6/809/5621548" }] },
          { tag: "READING", t: "The study is about a binding-protein gene, not melanin itself. It matters here because total vitamin D alone may mislead when comparing groups. That link to the melanin debate is an interpretation." }
        ]
      },
      {
        h: "Fossil colour",
        items: [
          { tag: "VERIFIED", t: "Zhang et al. Nature, 27 January 2010, DOI 10.1038/nature08740. Scanning electron microscopy found fossilised melanosomes in Cretaceous feathers and filaments from north-eastern China. Sinosauropteryx tail filaments with dark bands packed with phaeomelanosomes were read as a striped chestnut to reddish-brown tail. Confuciusornis showed black, grey, red and brown. Sinornithosaurus ranged from orange to black.", src: [{ l: "ScienceDaily", u: "https://sciencedaily.com/releases/2010/01/100127134245.htm" }, { l: "Phys.org", u: "https://phys.org/news/2010-01-dinosaur-feathers.html" }] },
          { tag: "OPEN", t: "Vinther accepted the melanosomes but called a red colour call from one sample a stretch. The colour inference is debated. The melanosomes are not." },
          { tag: "SECONDARY", t: "Vinther's group found pigmented structures in a Cretaceous bird feather in 2008 and showed in 2009 that another fossil feather would have been iridescent. Seen through news summaries." }
        ]
      },
      {
        h: "Feathers: melanin as a photonic crystal",
        items: [
          { tag: "VERIFIED", t: "Bird feather colour is most often made by a regular arrangement of melanin-holding organelles (melanosomes) in a beta-keratin matrix.", src: [{ l: "eLife 2021", u: "https://elifesciences.org/articles/71179" }] },
          { tag: "VERIFIED", t: "Norden, Eliason, Stoddard. eLife 2021, \"Evolution of brilliant iridescent feather nanostructures.\" Melanin layers were under 190 nm thick in every brilliantly iridescent feather. Thin layers nearly doubled the range of colours a feather could make. Lineages got thin layers by flattening melanosomes, hollowing them, or shrinking the rods." },
          { tag: "SECONDARY", t: "Not all iridescence comes from melanosomes. A report on manakins found whitish iridescence made by a different periodic nanostructure." }
        ]
      },
      {
        h: "The heart",
        items: [
          { tag: "VERIFIED", t: "Yajima and Larue (2008) found melanocytes in the mitral, tricuspid and aortic valves and in the ventricular and atrial septa of mice. Heart melanocyte numbers appeared to follow skin melanocyte numbers.", src: [{ l: "PMC2827447", u: "https://pmc.ncbi.nlm.nih.gov/articles/PMC2827447" }] },
          { tag: "VERIFIED", t: "Mice lacking skin and heart melanocytes live to adulthood without gross heart abnormalities. The 2008 authors concluded the heart melanocytes are probably not essential in a healthy, low-stress setting." },
          { tag: "SECONDARY", t: "Work from the same period suggests melanocytes may add to the mechanical properties of heart valves. Levin et al. (J Clin Invest) is cited for melanocyte-like cells in the heart and pulmonary veins contributing to atrial arrhythmia triggers. Not checked." },
          { tag: "OPEN", t: "All of this is mouse work." }
        ]
      },
      {
        h: "Brain imaging: neuromelanin as a signal",
        items: [
          { tag: "VERIFIED", t: "Neuromelanin-sensitive MRI maps neuromelanin in the substantia nigra and the locus coeruleus. A 2023 BMC Neurology case-control study in Parkinson's disease found neuromelanin loss in both sides of the brain, and more in the locus coeruleus than in the substantia nigra.", src: [{ l: "PMC10424360", u: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10424360/" }, { l: "BMC Neurology 2023 record", u: "https://doaj.org/article/e5390d5b49c34e1c8309aaeb16f94e51" }] },
          { tag: "SECONDARY", t: "An Emory reproducibility study on two cohorts reported reduced nigral and locus coeruleus volume in Parkinson's disease. It is a medRxiv preprint and is not peer reviewed.", src: [{ l: "medRxiv preprint", u: "https://medrxiv.org/content/10.1101/2022.02.23.22271356v1" }] },
          { tag: "OPEN", t: "A 2022 Frontiers in Neuroscience study proposes locus coeruleus imaging as a possible Alzheimer's marker. Its results were not retrieved. The evidence is smaller and earlier than for Parkinson's.", src: [{ l: "Frontiers 2022", u: "https://www.frontiersin.org/articles/10.3389/fnins.2022.1014485/full" }] }
        ]
      },
      {
        h: "Fungal melanin and the immune system",
        items: [
          { tag: "VERIFIED", t: "Stappers et al. Nature 555:382-386 (2018), DOI 10.1038/nature25974. The receptor MelLec recognises DHN-melanin on Aspergillus fumigatus spores. It was needed for protection against disseminated infection in mice.", src: [{ l: "UEA eprints record", u: "https://ueaeprints.uea.ac.uk/66516/" }, { l: "PMC5857201", u: "https://pmc.ncbi.nlm.nih.gov/articles/PMC5857201" }] },
          { tag: "VERIFIED", t: "MelLec did not detect melanin made by the L-DOPA route, the route used by Cryptococcus neoformans." },
          { tag: "VERIFIED", t: "In humans, a single-nucleotide variant of MelLec weakened myeloid inflammatory responses and raised the risk of disseminated Aspergillus infection in stem-cell transplant recipients." }
        ]
      },
      {
        h: "The light-driven radical",
        items: [
          { tag: "VERIFIED", t: "Mostert, Rienecker, Noble, Hanson, Meredith. Science Advances 2018. In situ photoinduced EPR with simultaneous electrical measurements separated the two radicals in eumelanin. Semiquinone production is light-driven and water-driven. That explains the electrical behaviour and shows a biologically relevant photoreactivity.", src: [{ l: "PMC5873843", u: "https://pmc.ncbi.nlm.nih.gov/articles/PMC5873843" }] }
        ]
      },
      {
        h: "Hair colour loss",
        items: [
          { tag: "SECONDARY", t: "Nishimura, Granter, Fisher. Science 2005, \"Mechanisms of hair graying: incomplete melanocyte stem cell maintenance in the niche.\" Aging melanocyte stem cells showed ectopic pigmentation or differentiation in the niche, faster with a Mitf mutation. The venue is Science, not Nature. Seen through summaries.", src: [{ l: "Reference record", u: "https://jci.org/references/scholar/29858/B42" }] },
          { tag: "SECONDARY", t: "Wood et al. FASEB J 2009;23(7):2065-2075. Hydrogen peroxide stress blunted methionine sulfoxide repair in human hair follicles, with falling catalase activity. Inomata et al. Cell 2009: genotoxic stress made mouse melanocyte stem cells differentiate in the niche instead of dying or stalling.", src: [{ l: "Hair graying summary", u: "https://journals.viamedica.pl/forum_dermatologicum/article/view/70122" }, { l: "Phys.org report", u: "https://phys.org/news/2009-06-stress-hair-gray.pdf" }] }
        ]
      },
      {
        h: "Melanin as a battery material",
        items: [
          { tag: "VERIFIED", t: "Kim, Wu, Chun, Whitacre, Bettinger. PNAS 110(52):20912-20917 (2013). Cuttlefish (Sepia officinalis) melanin and synthetic melanin were tested as anodes in aqueous sodium-ion storage. Sodium-loaded melanin anodes reached 30.4 +/- 1.6 mAh/g. Full cells with lambda-MnO2 cathodes gave an initial 1.03 +/- 0.06 V and up to 16.1 +/- 0.8 mAh/g. Natural melanin beat synthetic melanin.", src: [{ l: "PubMed 24324163", u: "https://pubmed.ncbi.nlm.nih.gov/24324163" }, { l: "PMC3876213", u: "https://pmc.ncbi.nlm.nih.gov/articles/PMC3876213" }] },
          { tag: "VERIFIED", t: "The aim was biodegradable, temporary medical electronics where toxic battery chemistries raise regulatory hurdles." }
        ]
      },
      {
        h: "Sticky coatings: polydopamine",
        items: [
          { tag: "VERIFIED", t: "Lee, Dellatore, Miller, Messersmith. Science 318(5849):426-430 (2007). Dopamine self-polymerises into thin, surface-sticking films on metals, oxides, polymers, semiconductors and ceramics. The idea came from mussel adhesive proteins.", src: [{ l: "PubMed 17947576", u: "https://pubmed.ncbi.nlm.nih.gov/17947576/" }] },
          { tag: "UNVERIFIED", t: "Polydopamine is often compared with melanin. The sources checked did not use the words melanin-like for this paper. Check the link to eumelanin before citing it." }
        ]
      },
      {
        h: "Splitting water with light",
        items: [
          { tag: "SECONDARY", t: "US patent 8,455,145 describes a photoelectrochemical method that uses melanin as the water-splitting element under light of about 200 to 900 nm. A patent is not a peer-reviewed measurement.", src: [{ l: "US8455145B2", u: "https://patents.google.com/patent/US8455145B2/" }] },
          { tag: "SECONDARY", t: "A 2018 report described synthetic melanin and polyoxometalate films on semiconductor photoanodes that improved solar water oxidation, with higher photocurrent and lower onset potential. Journal details were not confirmed.", src: [{ l: "PubMed 29979491", u: "https://www.pubmed.gov/29979491/" }] },
          { tag: "UNVERIFIED", t: "A peer-reviewed melanin water-splitting study by the Meredith group was not found." }
        ]
      }
    ]
  };
  /* Calculated results, added to the gamma page. */
  LS.sections.forEach(function (sec) {
    if (sec.id === "gamma") {
      sec.blocks.push({
        h: "Calculated here: how much melanin stops",
        items: [
          { tag: "CALCULATED", t: "Per gram, melanin (unit C8H5NO2) stops about 8 percent less than water at 100 keV (0.1572 against 0.1707 cm2 per gram) and about 7 percent less at 661.6 keV (0.07978 against 0.08575). It stops about 3 percent less than cellulose at 100 keV and about 2.6 percent less at 661.6 keV.", go: "x/photon", goLabel: "Open the photon explorer" },
          { tag: "CALCULATED", t: "With an assumed density of 1.5 g/cm3, half of the photons pass through about 2.9 cm of melanin at 100 keV and about 5.8 cm at 661.6 keV. A 1 mm layer at 100 keV removes about 2.3 percent of the photons." },
          { tag: "CALCULATED", t: "The patent figure of 1.4 x 10^4 per cm implies about 9,300 cm2 per gram at density 1.5. Melanin's elements allow about 2,760 cm2 per gram at 1 keV and less at every higher energy. The patent number does not fit photon physics for melanin." },
          { tag: "OPEN", t: "Method: Elam tables through xraydb 4.5.8, summed by element mass fraction. Checked against known values for water and lead. This is not NIST XCOM, which could not be reached. Real melanin also holds water, metals and protein, and its density is assumed." }
        ]
      });
    }
  });

  var at = 0;
  LS.sections.forEach(function (s, i) { if (s.id === "electronics") { at = i + 1; } });
  LS.sections.splice(at, 0, discoveries);

  /* Quick facts for the "Did you know" card on the home page. */
  LS.facts = [
    { t: "A small group of pigment cells in the inner ear helps make the electrical charge that hearing depends on.", tag: "VERIFIED", page: "discoveries", src: { l: "Inner-ear melanocytes", u: "https://researchworks.creighton.edu/esploro/outputs/journalArticle/Targeting-the-melanocytes-of-the-inner/991006241222002656" } },
    { t: "Melanin granules preserved in fossils let scientists infer the colours of feathered Cretaceous dinosaurs such as Sinosauropteryx.", tag: "VERIFIED", page: "discoveries", src: { l: "Zhang 2010", u: "https://sciencedaily.com/releases/2010/01/100127134245.htm" } },
    { t: "In every brilliantly iridescent bird feather studied, the melanin layers were under 190 nanometres thick.", tag: "VERIFIED", page: "discoveries", src: { l: "eLife 2021", u: "https://elifesciences.org/articles/71179" } },
    { t: "Cuttlefish melanin has been tested as a battery electrode. A full cell gave about 1.03 volts.", tag: "VERIFIED", page: "discoveries", src: { l: "Kim 2013", u: "https://pubmed.ncbi.nlm.nih.gov/24324163" } },
    { t: "Mouse hearts carry pigment cells in their valves and septa.", tag: "VERIFIED", page: "discoveries", src: { l: "Yajima and Larue 2008", u: "https://pmc.ncbi.nlm.nih.gov/articles/PMC2827447" } },
    { t: "Lower total vitamin D in Black Americans was largely explained by a binding-protein gene difference. Estimated bioavailable levels were similar.", tag: "VERIFIED", page: "discoveries", src: { l: "Powe 2013", u: "https://pubmed.ncbi.nlm.nih.gov/24256378/" } },
    { t: "Human immune cells carry a receptor, MelLec, that recognises fungal melanin.", tag: "VERIFIED", page: "discoveries", src: { l: "Stappers 2018", u: "https://pmc.ncbi.nlm.nih.gov/articles/PMC5857201" } },
    { t: "Light and water make the radical that lets eumelanin conduct electricity.", tag: "VERIFIED", page: "discoveries", src: { l: "Mostert 2018", u: "https://pmc.ncbi.nlm.nih.gov/articles/PMC5873843" } },
    { t: "Synthetic melanin kept its stable radicals after 300 Gy of Cs-137 gamma rays.", tag: "VERIFIED", page: "gamma", src: { l: "Dadachova 2009", u: "https://www.einsteinmed.edu/uploadedFiles/casadevall/dadachovaradio.pdf" } },
    { t: "Neuromelanin can be imaged with MRI. In Parkinson's disease the signal loss is larger in the locus coeruleus than in the substantia nigra.", tag: "VERIFIED", page: "discoveries", src: { l: "BMC Neurology 2023", u: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10424360/" } },
    { t: "Per gram, melanin stops about 8 percent fewer 100 keV photons than water. Its protection in mice is not shielding.", tag: "CALCULATED", page: "x/photon", src: null }
  ];

  /* Spectrum explorer bands. Ranges are approximate, settled physics. */
  LS.bands = [
    { name: "Radio and extremely low frequency", range: "Wavelengths longer than about 1 metre, down to 30 Hz and below", tag: "CONFLICTING",
      sum: "Cell studies: 30 to 75 Hz fields raised melanin and tyrosinase in cultured melanocytes. A 2024 RF study raised melanin synthesis through p53, MC1R, MITF and tyrosinase, not by heat. An earlier study at 1.76 and 28 GHz found no effect. Melanin conductivity was measured from 1 Hz to 1 MHz.",
      terms: ["radio", "RF fields", "50 Hz", "30-75 Hz", "1 Hz to 1 MHz"] },
    { name: "Microwave", range: "About 1 mm to 1 m (0.3 to 300 GHz)", tag: "UNVERIFIED",
      sum: "No direct measurement of eumelanin in the GHz band was found. The broadband work skips it. A 1977 study of hydrated protein powders at 9.9 GHz is the nearest method precedent.",
      terms: ["microwave", "GHz"] },
    { name: "Terahertz", range: "About 0.1 to 1 mm (0.3 to 3 THz)", tag: "VERIFIED",
      sum: "Motovilov and colleagues measured eumelanin dielectric behaviour at 0.2 to 3 THz and at 5 to 325 K. It ties to the water-made semiquinone model.",
      terms: ["terahertz", "THz"] },
    { name: "Infrared", range: "About 700 nm to 1 mm", tag: "VERIFIED",
      sum: "Natural melanin nanoparticles turn near-infrared light to heat at about 40 percent efficiency, against about 29 percent for synthetic polydopamine. Nanoparticles, not skin.",
      terms: ["infrared", "near-infrared"] },
    { name: "Visible light", range: "About 380 to 750 nm", tag: "VERIFIED",
      sum: "Eumelanin absorbs broadly and smoothly across the visible range, with no sharp peaks. In feathers, regular melanin layers also make structural colour.",
      terms: ["visible", "smooth"] },
    { name: "Ultraviolet", range: "About 10 to 380 nm", tag: "VERIFIED",
      sum: "Strong absorption. About five times more UV reaches the upper dermis of Caucasian skin than Black skin (Kaidbey 1979). Higher built-in melanin goes with less UV DNA damage.",
      terms: ["UV", "ultraviolet"] },
    { name: "X-ray", range: "About 0.01 to 10 nm", tag: "UNVERIFIED",
      sum: "No published melanin X-ray attenuation coefficients were found. A calculation in this app shows melanin stops about as many photons per gram as other light-element materials.",
      terms: ["X-ray", "photon", "attenuation"] },
    { name: "Gamma ray", range: "Shorter than about 0.01 nm", tag: "VERIFIED",
      sum: "Radical quenching and survival results in fungi, cells and mice. Synthetic melanin kept its stable radicals after 300 Gy of Cs-137. Mice fed melanin survived a lethal 9 Gy about 80 percent of the time. Preclinical only.",
      terms: ["gamma", "Cs-137", "Gy"] }
  ];

  /* Photon table. Total mass attenuation coefficient, cm2 per gram, summed by element
     mass fraction from the Elam tables (xraydb 4.5.8). Checked against known values for
     water and lead. Melanin unit C8H5NO2 and cellulose C6H10O5. */
  LS.photon = {"E":[10.0,11.15,12.43,13.022,13.04,13.048,13.87,15.185,15.2,15.215,15.46,15.845,15.86,15.877,17.24,19.22,21.44,23.9,26.66,29.72,30.0,33.14,36.96,41.21,45.96,51.25,57.14,60.0,63.72,71.05,79.23,87.917,88.0,88.093,88.35,98.52,100.0,109.86,122.5,136.6,152.32,169.85,189.4,211.2,235.5,262.61,292.83,326.53,364.11,406.02,452.75,504.86,562.96,627.75,661.6,700.0],"mu":{"melanin":[3.227,2.358,1.739,1.531,1.526,1.523,1.294,1.025,1.022,1.02,0.9801,0.9225,0.9204,0.918,0.7552,0.5948,0.4794,0.397,0.3372,0.294,0.2909,0.2623,0.2388,0.2211,0.2074,0.1967,0.1879,0.1844,0.1805,0.1741,0.1683,0.1632,0.1632,0.1631,0.163,0.1579,0.1572,0.153,0.1482,0.1435,0.1388,0.1342,0.1296,0.1249,0.1204,0.1158,0.1113,0.1069,0.1025,0.09814,0.09391,0.08976,0.08568,0.08168,0.07978,0.07777],"cellulose":[4.016,2.925,2.147,1.885,1.878,1.875,1.586,1.248,1.244,1.241,1.191,1.118,1.116,1.113,0.9073,0.705,0.5595,0.4557,0.3805,0.3264,0.3225,0.2869,0.2577,0.236,0.2194,0.2066,0.1963,0.1923,0.1878,0.1805,0.1741,0.1685,0.1685,0.1684,0.1683,0.1628,0.1621,0.1576,0.1526,0.1477,0.1428,0.138,0.1332,0.1284,0.1237,0.119,0.1143,0.1097,0.1052,0.1008,0.09644,0.09218,0.08799,0.08388,0.08193,0.07986],"water":[5.33,3.87,2.826,2.475,2.466,2.461,2.074,1.618,1.614,1.609,1.542,1.444,1.441,1.437,1.161,0.8887,0.6931,0.5538,0.453,0.3808,0.3756,0.3282,0.2897,0.2613,0.2399,0.2236,0.2108,0.2059,0.2004,0.1917,0.1843,0.1779,0.1779,0.1778,0.1776,0.1715,0.1707,0.1658,0.1603,0.155,0.1498,0.1446,0.1395,0.1345,0.1295,0.1246,0.1197,0.1149,0.1102,0.1055,0.1009,0.09648,0.09209,0.08779,0.08575,0.08359],"lead":[130.6,99.23,75.49,67.17,161.9,161.7,137.4,108.1,148.5,148.2,142.7,134.7,134.4,154.4,125.5,95.46,72.13,54.46,41.08,31.06,30.32,23.39,17.62,13.28,10.0,7.542,5.691,5.02,4.301,3.259,2.479,1.914,1.91,7.663,7.606,5.763,5.549,4.377,3.332,2.54,1.94,1.483,1.138,0.8779,0.6825,0.5352,0.424,0.3396,0.2754,0.2263,0.1884,0.159,0.136,0.1177,0.1102,0.103]}};
  LS.photon.rho = { melanin: 1.5, cellulose: 1.5, water: 1.0, lead: 11.35 };
  LS.photon.names = { melanin: "Melanin", cellulose: "Cellulose", water: "Water", lead: "Lead" };

  /* Glossary. Settled science, plain words. */
  LS.glossary = [
    ["Allele", "One version of a gene. People can carry different alleles at the same spot."],
    ["Allomelanin", "A kind of melanin made by fungi and plants, from different building blocks than eumelanin."],
    ["Attenuation", "The loss of a beam as it passes through a material, by absorbing or scattering it."],
    ["Compton scattering", "A photon bounces off an electron and loses some energy. It depends mostly on how many electrons a material has per gram."],
    ["Dielectric", "How a material responds to an electric field. Water-rich materials often respond strongly."],
    ["DHN-melanin", "Melanin made from a building block called 1,8-dihydroxynaphthalene. Many fungi make it."],
    ["Endocochlear potential", "A positive electrical charge in the fluid of the inner ear. Hearing cells need it to work."],
    ["EPR", "Electron paramagnetic resonance. A method that detects unpaired electrons, such as the stable radicals in melanin."],
    ["Eumelanin", "The dark brown to black melanin. It protects against UV."],
    ["Gene flow", "Genes moving from one population into another when people from the groups have children together."],
    ["Gray (Gy)", "A unit of absorbed radiation dose. One gray is one joule of energy absorbed per kilogram. 1 Gy equals 100 cGy."],
    ["Haplotype", "A set of gene variants that sit close together on a chromosome and are inherited together."],
    ["Half-value layer", "The thickness of a material that cuts a beam to half."],
    ["In vitro", "Done in a dish or test tube, not in a living body."],
    ["keV", "Kilo-electron-volt. A unit of photon energy. X-rays and gamma rays are measured in keV and MeV."],
    ["Locus", "A place on a chromosome where a gene sits. The plural is loci."],
    ["Mass attenuation coefficient", "How much a material stops per gram, in cm2 per gram. It does not depend on density."],
    ["Melanocyte", "A cell that makes melanin."],
    ["Melanosome", "The small packet inside a melanocyte where melanin is made and stored."],
    ["Neural crest", "A group of cells in the early embryo that go on to make many tissues, including pigment cells."],
    ["Neuromelanin", "The dark pigment in certain brain cells, such as those of the substantia nigra and the locus coeruleus."],
    ["Peer review", "Experts outside the authors check a paper before a journal prints it."],
    ["Pheomelanin", "The red to yellow melanin. It protects less against UV than eumelanin."],
    ["Photon", "A particle of light. X-rays and gamma rays are photons with very high energy."],
    ["Photothermal", "Turning light into heat."],
    ["Preprint", "A paper posted before peer review. It may change."],
    ["Radical", "A molecule with an unpaired electron. Radicals are very reactive."],
    ["Semiquinone", "A radical form of a quinone. It is the radical in eumelanin that moves with water and light."],
    ["Stratum corneum", "The thin dead outer layer of the skin."],
    ["Tyrosinase", "The enzyme that starts melanin production."]
  ];
})();
