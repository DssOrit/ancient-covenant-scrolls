/* Load Science, fifth data file: dark skin and melanin at full strength, overlooked
   scientists, genetic diversity, space and government programs, and the claims check.
   Built from the deep research report and the claims check dated 2026-11-03, after both
   reports were re-checked against the search results they came from. Standard: no
   downplaying, no exaggeration, no selective omissions. Numbers are stated as the sources
   state them. Limits are stated once, after the finding. Full texts were not available
   in this session (pmc.ncbi.nlm.nih.gov, pubmed.ncbi.nlm.nih.gov and
   projectbiodiversify.org are blocked), so tags say what was seen. */
(function () {
  var LS = window.LS;
  function S(l, u) { return { l: l, u: u }; }

  var darkskin = {
    id: "darkskin",
    title: "Dark skin and melanin at full strength",
    blurb: "The measured UV, DNA and cancer findings, with the numbers.",
    blocks: [
      {
        h: "The headline numbers",
        items: [
          { tag: "VERIFIED", t: "Fajuyigbe et al., FASEB Journal 2018;32(7):3700-3706, DOI 10.1096/fj.201701472R. The study compares extreme skin types. Melanin in black West African skin gave 8.0-fold protection against UV-induced DNA damage (cyclobutane pyrimidine dimers) across the whole epidermis, measured straight after solar-simulated UV.", src: [S("PubMed 29394104", "https://www.pubmed.gov/29394104/"), S("Record", "https://aminer.org/pub/5c0f772eda562944ac711e28/melanin-distribution-in-human-epidermis-affords-localized-protection-against-dna-photodamage-and")] },
          { tag: "VERIFIED", t: "The protection is strongest where melanin is most concentrated: 59.0-fold in the basal layer, 16.5-fold in the middle layer and 5.0-fold in the upper epidermis." },
          { tag: "VERIFIED", t: "The paper's background cites keratinocyte (non-melanoma) skin cancer rates 20 to 60 times higher in white than in black populations. The authors say their findings may explain, at least in part, the skin colour difference in that cancer. They conclude a DNA protection factor of at least 60 is needed in sunscreens to bring white skin to the cancer level of black skin." },
          { tag: "OPEN", t: "The full text was not read. The sample sizes, the comparison group and the UV dose were not seen." },
          { tag: "VERIFIED", t: "Melanoma incidence among non-Hispanic Black Americans was 1.0 per 100,000 in a CDC-based analysis of 2011 to 2015.", src: [S("PMC6638592", "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6638592/")] },
          { tag: "VERIFIED", t: "SEER 1992 to 2002 (JAMA Internal Medicine 2006, Ethnic differences among patients with cutaneous melanoma): 18.4 per 100,000 in whites against 0.8 in African Americans. That is about 23 times (calculated).", src: [S("PubMed 17000949", "https://pubmed.ncbi.nlm.nih.gov/17000949/")] },
          { tag: "SECONDARY", t: "A secondary article quoting SEER 2019 to 2023 gives 1.1 (Black men) and 0.9 (Black women) per 100,000 against 40.7 and 27.6 for white men and women. That is about 37 and 31 times (calculated). It was not checked against the SEER site." },
          { tag: "SECONDARY", t: "A 2022 Springer photochemistry review (DOI 10.1007/s43630-022-00314-z) gives epidermal protection figures of 13.4 for dark skin and 3.3 for light skin, citing an earlier reference, and credits melanocyte size and the distribution and packaging of melanosomes. Popular pages quote 13.4 and 3.4. These are estimates, not sunscreen-test SPF values. The original measurement was not traced.", src: [S("Review", "https://springerlink.bibliotecabuap.elogim.com/10.1007/s43630-022-00314-z")] },
          { tag: "VERIFIED", t: "Kaidbey 1979: Black skin lets through about one fifth of the UV that reaches the upper dermis in Caucasian skin. The skin and DNA findings are on the skin page.", go: "s/skin", goLabel: "Open the skin page" }
        ]
      },
      {
        h: "Same redness is not the same dose",
        items: [
          { tag: "VERIFIED", t: "Tadokoro et al., FASEB Journal 2003;17(9):1177, UV-induced DNA damage and melanin content in human skin differing in racial/ethnic origin. Rising built-in melanin goes with falling DNA damage. After 1 MED every group had significant DNA damage. The authors found the MED predicts DNA photodamage better than race or skin type.", src: [S("Record", "https://vufind-test.katalog.k.utb.cz/SummonRecord/FETCH-LOGICAL-p289E-1462869216b212e4bf36292ee534d561569a96853567a129109b168659d75ad82/Details")] },
          { tag: "READING", t: "1 MED is the dose that just reddens skin. Darker skin needs a bigger UV dose to reach it. So similar damage at 1 MED does not cancel the advantage. At the same dose, as in the Fajuyigbe study, the difference is large. This is the logic of the definition, not a finding of either paper." },
          { tag: "SECONDARY", t: "Tadokoro et al., Journal of Investigative Dermatology 2005;124(6), DOI 10.1111/j.0022-202X.2005.23760.x, is reported to show higher immediate DNA damage in whites and Asians than in blacks and Hispanics, and no link between melanin content or ethnic group and how well damage was removed. Seen through a review summary.", src: [S("Record", "https://data.zhenzhi.com/details/1/889349622")] }
        ]
      },
      {
        h: "How much more UV it takes to redden skin (MED)",
        intro: "The direction is the same in every study. The size depends on the method.",
        table: {
          head: ["Study", "Result", "Tag"],
          rows: [
            ["Narrowband UVB, vitiligo study", "Normal-skin MED rose from 0.73 J/cm2 in skin type II to 2.20 J/cm2 in type VI. That is about 3 times (calculated).", "VERIFIED"],
            ["Types I to VI, one study", "MED rose from a mean of 21 to a mean of 152 mJ/cm2. That is about 7 times across the whole scale (calculated).", "VERIFIED"],
            ["Taiwanese cohort, broadband UVB", "Mean MED 122.9, 136.2, 148.3 and 165.0 mJ/cm2 for types II, III, IV and V. That is about 1.3 times from II to V (calculated). Type VI was not reported.", "VERIFIED"]
          ]
        },
        items: [
          { tag: "OPEN", t: "The size depends on wavelength, light source, body site and population. No well-powered comparison of type VI against type II under identical broadband conditions was found.", src: [S("Acta Dermato-Venereologica", "https://medicaljournals.se/acta/download/10.1080/00015550410022203"), S("Taiwan cohort", "https://scholars.lib.ntu.edu.tw/handle/123456789/434978")] }
        ]
      },
      {
        h: "Eumelanin shields, pheomelanin does not",
        items: [
          { tag: "VERIFIED", t: "Brenner and Hearing, Photochemistry and Photobiology 2008;84:539-549, The protective role of melanin against UV damage in human skin. The traditional and main view: skin pigmentation is the most important photoprotective factor. Melanin absorbs a broad band of UV and has antioxidant and radical-scavenging properties.", src: [S("PMC2671032", "https://pmc.ncbi.nlm.nih.gov/articles/PMC2671032/")] },
          { tag: "VERIFIED", t: "The abstract calls the role of melanin in photoprotection still controversial. A Frontiers in Physiology review places the harm with the red-yellow pigment, pheomelanin, which makes reactive oxygen species and DNA strand breaks, while the dark pigment, eumelanin, shields. A related NIH project summary reports an inverse link between pigmentation and DNA damage, and notes that even very low UV doses damage DNA in every skin type.", src: [S("Frontiers in Physiology", "https://frontiersin.org/journals/physiology/articles/10.3389/fphys.2015.00276/full")] },
          { tag: "READING", t: "This is about pheomelanin and about no skin being immune. It does not reduce the eumelanin finding above." }
        ]
      },
      {
        h: "The other side, stated plainly",
        items: [
          { tag: "SECONDARY", t: "Black patients are more often diagnosed late: 55 percent with localized disease against 78 percent for white patients, in a secondary article." },
          { tag: "VERIFIED", t: "Acral lentiginous melanoma (palms, soles and nails) was the most commonly diagnosed defined type in Black patients, 16.7 percent, in the CDC-based report. The report recommends better education for clinicians and the public about how acral melanoma looks." },
          { tag: "VERIFIED", t: "A 2025 JAAD SEER analysis: acral lentiginous melanoma was the only major subtype with higher melanoma-specific mortality in Black patients, hazard ratio 2.04 (95% CI 1.31 to 3.11). Stage at diagnosis and socioeconomic factors did not fully explain it." },
          { tag: "VERIFIED", t: "SEER 1992 to 2002: risk-adjusted stage-specific mortality was 1.48-fold higher in African Americans, and differences in stage at presentation contributed to the survival gap." },
          { tag: "CONFLICTING", t: "A 2001 review reported no difference in incidence between races for acral, subungual and plantar melanoma. Recent data show acral melanoma is the main type in Black patients. Read the two together." },
          { tag: "READING", t: "The UV-driven cancer advantage and the acral melanoma gap are two separate findings. Both are documented. The advantage is large. The gap is a documented outcome difference that needs attention." }
        ]
      },
      {
        h: "Oxidative stress: what is known",
        items: [
          { tag: "OPEN", t: "No human study showing lower oxidative stress in darker skin in living people was found in the sources searched." },
          { tag: "VERIFIED", t: "A Brown University cell study reported that UVA causes greater oxidative DNA damage in cells with less melanin, which have higher levels of reactive oxygen species." },
          { tag: "VERIFIED", t: "A DHICA-derived eumelanin polymer at 10 micrograms per mL stopped reactive oxygen species from building up in UVA-treated keratinocytes and partly reduced glutathione oxidation (HaCaT cells, 2020). It is cell culture and does not compare skin types.", src: [S("PMC7222206", "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7222206/")] },
          { tag: "CONFLICTING", t: "A Scientific Reports study of reconstructed human epidermis found tanned models made more free radicals than light models under some conditions, and every model had significant DNA damage after UV." },
          { tag: "CONFLICTING", t: "UVA-driven reactive oxygen species also act as a signal for melanin making, and melanin can add to UVA reactive oxygen species. Mostert et al. 2018 and the Kohler lab describe eumelanin photochemistry as a double-edged sword." },
          { tag: "OPEN", t: "This is an open question about the balance inside skin. It is not a reason to set aside the DNA-damage findings above." }
        ]
      },
      {
        h: "Photoaging",
        items: [
          { tag: "UNVERIFIED", t: "Montagna and Carlisle, Journal of the American Academy of Dermatology 1991;24(6):929-937, The architecture of black and white facial skin, exists. Its findings were not retrieved." },
          { tag: "SECONDARY", t: "A 2025 narrative review says a higher melanin concentration gives significant protection against photoaging." }
        ]
      },
      {
        h: "Barrier, hearing and vitamin D",
        items: [
          { tag: "VERIFIED", t: "Already in the app: the skin barrier finding (Man, Elias 2014), inner-ear melanocytes and hearing, and the vitamin D binding-protein study (Powe 2013).", go: "s/discoveries", goLabel: "Open the lesser-known research page" }
        ]
      }
    ]
  };

  var scientists = {
    id: "scientists",
    title: "Overlooked scientists",
    blurb: "People whose melanin and pigmentation work deserves more attention, with what is and is not confirmed.",
    blocks: [
      {
        h: "Jewel Plummer Cobb (1924 to 2017), cell biologist",
        items: [
          { tag: "SECONDARY", t: "Her early work looked at how tyrosinase makes pigment granules. It became a lasting focus on melanin and skin cancer.", src: [S("JAX blog", "https://resources.jax.org/jax-blog/women-in-science-jewel-plummer-cobb-1924-2017")] },
          { tag: "SECONDARY", t: "Cobb, JNCI 1956;17(5):657-666, Effect of in Vitro X Irradiation on Pigmented and Pale Slices of Cloudman S91 Mouse Melanoma as Measured by Subsequent Proliferation in Vivo. Pigmented and pale slices of the same tumour were X-rayed at different doses, implanted in mice and tracked. At 2,500 r growth was similar. At higher doses, especially 3,000 r, the pigmented tumour persisted through 13 weeks and the pale one did not." },
          { tag: "SECONDARY", t: "Later work on melanoma cell lines reports that pigmented cells are significantly more resistant to gamma radiation than non-pigmented cells." },
          { tag: "READING", t: "This is an early, controlled observation that pigment protects melanoma tissue from X-rays, more than 50 years before the fungal radiation papers of 2007 and 2008." },
          { tag: "SECONDARY", t: "Profiles credit her with early tissue-culture work on melanoma, a finding that methotrexate slows melanoma cell growth, and work with Jane Wright at Harlem Hospital testing chemotherapy on melanoma. One profile says she was the first Black woman appointed to the National Science Board. Blackpast says NYU first refused her fellowship on grounds of race.", src: [S("Wikipedia", "https://en.wikipedia.org/wiki/Jewel_Plummer_Cobb"), S("Blackpast", "https://www.blackpast.org/aah/cobb-jewel-plummer-1924"), S("Finding Ada", "https://findingada.com/?p=17873")] },
          { tag: "OPEN", t: "The 1956 paper was not read. The details come from a secondary presentation summary. The primary text is the next thing to check." }
        ]
      },
      {
        h: "Cheikh Anta Diop (died 1986), Senegalese physicist and historian",
        items: [
          { tag: "SECONDARY", t: "Diop proposed a melanin dosage test: a microscopic analysis of melanin in the skin of ancient Egyptian mummies, on the reasoning that the skin colour of an ancient body can be inferred from its melanin content.", src: [S("Wikipedia", "https://en.wikipedia.org/wiki/Cheikh_Anta_Diop"), S("Pambazuka", "https://pambazuka.org/node/66371")] },
          { tag: "SECONDARY", t: "One source quoting his book says the test run on Egyptian mummies at the Museum of Man in Paris indicated the remains were of Black people. That source is a forum post, not a peer-reviewed study. A source says he argued the test could still work on Ramses II despite gamma-ray damage that greyed the skin." },
          { tag: "SECONDARY", t: "He founded the first radiocarbon laboratory in Africa, at the University of Dakar in 1966, with the French Atomic Energy Commission laboratory at Gif-sur-Yvette. That is a dating laboratory, not a melanin laboratory." },
          { tag: "SECONDARY", t: "At the UNESCO symposium on the peopling of ancient Egypt in Cairo, 28 January to 3 February 1974, his conclusions met a range of responses, from strong objection to enthusiastic support. Accounts of his reception conflict." },
          { tag: "VERIFIED", t: "The proceedings, The peopling of ancient Egypt and the deciphering of Meroitic script, UNESCO, Paris, 1978, 136 pages, General History of Africa Studies and Documents no. 1. The papers listed include Vercouter, Blanc, Obenga and Leclant.", src: [S("Open Library", "https://openlibrary.org/books/OL4482132M")] },
          { tag: "UNVERIFIED", t: "Diop's name is not in the listing seen, and the full table of contents was not checked. Whether his melanin report is printed in the proceedings is not confirmed. The actual measurements, the sample counts and any critique of the method were not found." },
          { tag: "READING", t: "The question he posed, whether melanin in preserved skin can show skin colour, is a real and measurable question. The data has to be read from his own publications (The African Origin of Civilization, 1974 English edition) and the proceedings." }
        ]
      },
      {
        h: "Susan C. Taylor, dermatologist",
        items: [
          { tag: "VERIFIED", t: "Taylor founded the Skin of Color Society in 2004 to promote awareness of and excellence in dermatology for patients with skin of color, and to support research and mentorship. She first ran the Skin of Color Center in New York City. She is a past Vice President of the American Academy of Dermatology. Her focus is skin of color, alopecia and pigmentary disorders.", src: [S("Healio", "https://www.healio.com/dermatology/skin-care/news/online/%7Bda5fcc66-eedf-4c08-9c55-91faf5c608c9%7D/society-helps-increase-awareness-research-in-skin-of-color")] },
          { tag: "VERIFIED", t: "A Skin of Color Society Black History Month piece names Pearl Grimes and the pioneer of ethnic dermatology John A. Kenney Jr.", src: [S("Skin of Color Society", "https://www.livderm.org/partner-of-the-month-skin-of-color-society/")] },
          { tag: "OPEN", t: "Grimes's vitiligo work was not described in the sources seen." }
        ]
      },
      {
        h: "McGinness, Corry and Proctor: the first melanin electronics",
        items: [
          { tag: "VERIFIED", t: "McGinness, Corry and Proctor, Science 1974;183(4127):853-855, Amorphous semiconductor switching in melanins. McGinness, Science 1972;177(4052):896-897, Mobility gaps: a mechanism for band gaps in melanins. A 1992 review credits Proctor and McGinness with the hypothesis that melanin is an energy transducer with the properties of an amorphous semiconductor.", src: [S("John McGinness", "https://en.wikipedia.org/wiki/John_McGinness")] },
          { tag: "OPEN", t: "The abstracts were not seen. Their race was not checked, and nothing is claimed about it. They are listed because the 1972 to 1974 discoveries are rarely credited." }
        ]
      }
    ]
  };

  /* Genetic diversity block on the genes page. */
  var diversity = {
    h: "Genetic diversity, and who gets studied",
    items: [
      { tag: "VERIFIED", t: "Tishkoff et al., Science 2009;324(5930):1035-1044, The Genetic Structure and History of Africans and African Americans, DOI 10.1126/science.1172257. 1,327 markers (848 microsatellites, 476 insertions and deletions, 3 SNPs) in 2,432 Africans from 113 populations, plus African Americans and Yemenites. Penn's release counts 121 African, 4 African-American and 60 non-African populations, more than 3,000 people. The counts differ by source.", src: [S("Penn release", "https://webarchive.library.unt.edu/eot2008/20090505192042/http://www.nigms.nih.gov/News/Results/043009b.htm"), S("Paper", "https://faculty.washington.edu/wjs18/Pop_Structure/TishkoffAfrican.pdf")] },
      { tag: "VERIFIED", t: "The African samples fell into 14 ancestral population clusters that follow ethnicity and shared cultural and language patterns. African American ancestry was about 71 percent Niger-Kordofanian, 13 percent European and 8 percent other African." },
      { tag: "SECONDARY", t: "Penn's release states there is more genetic diversity in Africa than anywhere else on earth. That is the highest diversity of any continent. The exact abstract sentence was not retrieved." },
      { tag: "VERIFIED", t: "Popejoy and Fullerton, Nature 2016;538(7624):161-164, Genomics is failing on diversity, DOI 10.1038/538161a. 81 percent of participants in the GWAS Catalog were of European descent in 2016, down from 96 percent in 2009.", src: [S("PubMed 27734877", "https://www.pubmed.gov/27734877/")] },
      { tag: "SECONDARY", t: "Bio-IT World reports the African share of the catalogue at 3 percent.", src: [S("Bio-IT World", "https://bio-itworld.com/news/2016/10/13/among-the-multitude-a-look-at-the-complexity-of-diversity-in-genetics")] },
      { tag: "READING", t: "The continent with the most genetic diversity, and the oldest pigmentation alleles (Crawford et al. 2017), is the least sampled in reference data. Tools built on those panels describe it least well." }
    ]
  };

  /* Per-gram melanin against lead, on the photon page. */
  var pergram = {
    h: "Per gram, melanin against lead",
    intro: "Same calculation as above (Elam tables, melanin unit C8H5NO2). Elam tables are unreliable above 800 keV, so no numbers are given above it.",
    table: { head: ["Energy", "Values", "Tag"], rows: [["60 keV", "Melanin 0.1844 cm2 per gram. Lead 5.02. Per gram melanin stops 3.7 percent of what lead stops. For the same stopping, lead needs 27.21 times less mass.", "CALCULATED"], ["100 keV", "Melanin 0.1572 cm2 per gram. Lead 5.549. Per gram melanin stops 2.8 percent of what lead stops. For the same stopping, lead needs 35.29 times less mass.", "CALCULATED"], ["150 keV", "Melanin 0.1395 cm2 per gram. Lead 2.015. Per gram melanin stops 6.9 percent of what lead stops. For the same stopping, lead needs 14.44 times less mass.", "CALCULATED"], ["200 keV", "Melanin 0.1272 cm2 per gram. Lead 0.9987. Per gram melanin stops 12.7 percent of what lead stops. For the same stopping, lead needs 7.85 times less mass.", "CALCULATED"], ["300 keV", "Melanin 0.1103 cm2 per gram. Lead 0.4032. Per gram melanin stops 27.4 percent of what lead stops. For the same stopping, lead needs 3.65 times less mass.", "CALCULATED"], ["400 keV", "Melanin 0.09873 cm2 per gram. Lead 0.2323. Per gram melanin stops 42.5 percent of what lead stops. For the same stopping, lead needs 2.35 times less mass.", "CALCULATED"], ["450 keV", "Melanin 0.09415 cm2 per gram. Lead 0.1903. Per gram melanin stops 49.5 percent of what lead stops. For the same stopping, lead needs 2.02 times less mass.", "CALCULATED"], ["500 keV", "Melanin 0.09012 cm2 per gram. Lead 0.1614. Per gram melanin stops 55.9 percent of what lead stops. For the same stopping, lead needs 1.79 times less mass.", "CALCULATED"], ["600 keV", "Melanin 0.08333 cm2 per gram. Lead 0.1248. Per gram melanin stops 66.8 percent of what lead stops. For the same stopping, lead needs 1.50 times less mass.", "CALCULATED"], ["661.6 keV (Cs-137)", "Melanin 0.07978 cm2 per gram. Lead 0.1102. Per gram melanin stops 72.4 percent of what lead stops. For the same stopping, lead needs 1.38 times less mass.", "CALCULATED"], ["800 keV", "Melanin 0.07318 cm2 per gram. Lead 0.0887. Per gram melanin stops 82.5 percent of what lead stops. For the same stopping, lead needs 1.21 times less mass.", "CALCULATED"]] },
    items: [
      { tag: "CALCULATED", t: "Per gram, melanin reaches half of lead's stopping at about 454 keV. It reaches 56 percent at 500 keV, 72 percent at 661.6 keV and 82 percent at 800 keV. In the gamma range from about 450 keV up, melanin stops at least half as much as lead by mass." },
      { tag: "CALCULATED", t: "In the X-ray range it is not close. At 100 keV melanin stops 2.8 percent of what lead stops per gram. Lead needs 35 times less mass for the same stopping." },
      { tag: "CALCULATED", t: "So melanin is not lighter than lead for the same shielding. At 800 keV it needs about 1.2 times lead's mass, and at 100 keV about 35 times. The advantages named in sources, such as flexibility and handling, were not tested here." },
      { tag: "OPEN", t: "A search listing shows a 2025 study of metal-doped eumelanin attenuation (PMC11902467). It was not opened, so measured coefficients for metal-doped melanin are still to be read.", src: [S("PMC11902467", "https://pmc.ncbi.nlm.nih.gov/articles/PMC11902467")] }
    ]
  };

  /* Government and space programs, on the gamma page. */
  var programs = {
    h: "Government and space programs",
    items: [
      { tag: "VERIFIED", t: "NASA Glenn flew polylactic acid (PLA) with fungal, synthetic or animal melanin on the Materials International Space Station Experiment Flight Facility for about 6 months, in zenith-facing and wake-facing positions. PNAS 2025, DOI 10.1073/pnas.2427118122. Fungal melanin reduced mass loss and surface wrinkling, so it protected the PLA in low Earth orbit. Mass loss, optical properties and surface changes differed by composition and orientation.", src: [S("Summary", "https://astrobiology.com/2025/05/01/radiation-protection-and-structural-stability-of-fungal-melanin-polylactic-acid-biocomposites-in-low-earth-orbit/")] },
      { tag: "VERIFIED", t: "Naval Research Laboratory fungal experiment on Artemis I (part of NASA's BioExpt-01): Aspergillus niger in four strains. One wild type, two mutants that cannot repair DNA, and one mutant that cannot make melanin. The aim is to see how deep space affects DNA repair and survival, then process the samples for survival, genomic and metabolic changes. No published results were found.", src: [S("NRL", "https://www.nrl.navy.mil/Media/News/Article/3140516/nrl-fungal-experiment-launches-as-artemis-i-payload/"), S("NASA", "https://science.nasa.gov/biological-physical/stories/why-is-nasa-studying-fungi/")] },
      { tag: "VERIFIED", t: "Army STTR topic A19B-T010, Production of Natural Melanin for Affordable EMP Shielding (May 2019). It states synthetic melanin is estimated to be 40 to 60 percent less efficient than naturally derived melanin, and lists uses: EMP shielding, radiation shielding and countermeasure, and harvesting thermal energy for cold-weather coatings. MelaTech with Johns Hopkins worked under an Army STTR partnership, and a later MelaTech abstract names Army STTR Phase I and II and NASA SBIR Phase I funding.", src: [S("Topic listing", "https://www.highergov.com/sbir-opportunity/production-of-natural-melanin-for-afford-a19b-t010-sttr-2019-b7a121dd"), S("MelaTech", "https://www.tedcomd.com/insight/melatech-unlocks-potential-melanin-technologies-through-army-sttr-program")] },
      { tag: "OPEN", t: "The scale of the research and the award amounts were not verified. Whether prototypes exist was not verified." },
      { tag: "SECONDARY", t: "Cobb's 1956 X-ray work on pigmented melanoma tissue is an early observation of this protection.", go: "s/scientists", goLabel: "Open the overlooked scientists page" }
    ]
  };

  /* Electronics page additions. */
  var electronics = {
    h: "The first melanin electronics, metal binding, and energy storage",
    items: [
      { tag: "VERIFIED", t: "The first report of melanin switching behaviour was McGinness, Corry and Proctor, Science 1974. Mostert et al. (PNAS 2012) later showed melanin is an electronic-ionic hybrid conductor. The two disagree on the mechanism and agree that the conduction is real.", go: "s/scientists", goLabel: "Open the overlooked scientists page" },
      { tag: "VERIFIED", t: "A 2022 Applied Magnetic Resonance review (DOI 10.1007/s00723-021-01386-3): dopa-melanin binds copper and zinc with a capacity that depends on pH. Iron(III) binds ortho-phenolic hydroxy groups and forms high-spin complexes. Melanosomes sequester iron and copper, which protects against the oxidative stress those metals cause. Melanin is a reservoir for calcium and zinc.", src: [S("Review", "https://link.springer.com/10.1007/s00723-021-01386-3"), S("PMC5691108", "https://pmc.ncbi.nlm.nih.gov/articles/PMC5691108")] },
      { tag: "CONFLICTING", t: "In a melanosome and synthetic melanin study, copper and iron sped chemical degradation by tert-butyl hydroperoxide, zinc did not, and strong pro-oxidant action appeared with melanosomes degraded in the presence of iron. So the antioxidant protection depends on which metal is bound." },
      { tag: "SECONDARY", t: "A marine black yeast melanin removed 85.7 percent of lead, 84.8 percent of cadmium and 81.5 percent of nickel at 100 mg/L. Seen in an encyclopedia.pub entry from a search listing." },
      { tag: "UNVERIFIED", t: "A citable quantitative binding capacity for copper, zinc or iron was not found." },
      { tag: "SECONDARY", t: "A 2016 eumelanin supercapacitor study reports a power density up to 20 mW/cm2. Its surface area per mass is much lower than activated carbon, but its charge-transfer reactions give more capacity per unit of real surface area. A recent review covers melanin-inspired supercapacitors for wearable and flexible devices. Seen through search summaries." },
      { tag: "UNVERIFIED", t: "Melanin photovoltaics and melanin as a battery cathode were not found." }
    ]
  };

  /* Water splitting: the claim record, on the lesser-known research page. */
  var water = [
    { tag: "SECONDARY", t: "The claim of reversible, room-temperature water splitting by melanin comes from Arturo Solis Herrera: US patent 8,455,145 and a solid-state melanin battery patent (US 11,101,511), a 2014 review by Solis Herrera and Solis Arias in MOJ Cell Science and Report, and a popular book, The Human Photosynthesis. The patents say the reverse reaction releases energy.", src: [S("US8455145B2", "https://patents.google.com/patent/US8455145B2/"), S("2014 review", "https://medcraveonline.com/MOJCSR/einstein-cosmological-constant-the-cell-and-the-intrinsic-property-of-melanin-to-split-and-re-form-the-water-molecule.html")] },
    { tag: "UNVERIFIED", t: "No independent peer-reviewed experimental confirmation of melanin photolysis of water was found, and no MDPI paper was found. The peer-reviewed work found is different: melanin-based p-n heterojunction photoanodes that improve solar water oxidation (ChemSusChem 2018)." }
  ];

  /* Claims check table, on the supernatural claims page. */
  var govclaims = {
    h: "A pasted claim set about government research, checked",
    intro: "Each row is a claim from a pasted summary, and what was found.",
    table: {
      head: ["Claim", "What was found", "Tag"],
      rows: [
        ["NASA, the Naval Research Laboratory and the Army are heavily researching melanin", "Confirmed in part: the NRL Artemis I experiment, Army STTR topic A19B-T010 with MelaTech and Johns Hopkins, and the NASA Glenn flight of melanin-PLA published in PNAS 2025. The scale (heavily) and the award amounts were not verified.", "VERIFIED"],
        ["Melanin has a high LET absorption coefficient and turns radiation into heat and harmless low-energy photons", "No source found. LET (linear energy transfer) is the energy a particle gives up along its path, and an absorption coefficient is for photons, so the phrase mixes two quantities. Protection is supported by the PNAS 2025 result and the mouse and fungal work. The energy-conversion mechanism is not confirmed.", "UNVERIFIED"],
        ["X-ray attenuation of certain melanins is half that of lead by mass", "No source found. Calculated here: per gram melanin reaches half of lead's stopping at about 454 keV, in the gamma range, and is 2.8 percent of lead at 100 keV. A patent's much larger linear figure does not fit photon physics.", "CALCULATED"],
        ["Artemis I sent melanized organisms to show how melanin repairs DNA", "The NRL experiment compares four Aspergillus niger strains, one of which cannot make melanin, to study DNA repair and survival in deep space. No published results were found.", "VERIFIED"],
        ["Melanized cells use ionizing radiation to grow faster (radiosynthesis)", "Dadachova 2007: faster growth under radiation about 500 times background, and a fourfold rise in melanin electron transfer in a lab test. Whether it is energy capture is the authors' open question.", "VERIFIED"],
        ["MDPI studies show melanin splits water, reversibly, at room temperature", "No MDPI paper found. The claim rests on patents, a self-authored 2014 review and a book. No independent peer-reviewed confirmation was found.", "UNVERIFIED"],
        ["Natural melanin is 40 to 60 percent more efficient at absorbing energy than synthetic", "Army topic A19B-T010 says synthetic melanin is estimated to be 40 to 60 percent less efficient than natural melanin. If so, natural is about 1.7 to 2.5 times as efficient. That is the same direction as the claim, and a bigger gap. At absorbing energy was not confirmed.", "VERIFIED"],
        ["Melanin conducts electronic and ionic current and is the candidate for linking machines to tissue", "The dual conduction is documented (Mostert 2012, the melanin transistor 2018). Primary candidate for implants was not sourced.", "VERIFIED"],
        ["The military is prototyping solid melanin materials for EMP shielding", "The Army topic lists prototyping solid melanin-based material for EMP shielding and radiation shielding. Whether prototypes exist was not verified.", "SECONDARY"],
        ["Melanin binds toxic heavy metals and neutralises free radicals", "Documented: metal binding and radical scavenging (electronics page).", "VERIFIED"],
        ["Melanin resists massive acid exposure", "No source in the pages opened.", "UNVERIFIED"]
      ]
    },
    items: [
      { tag: "OPEN", t: "The pasted summary cited a PMC article, PMC5132026, which could not be opened because the host is blocked in this session. Its title is not known." }
    ]
  };

  function find(id) { for (var i = 0; i < LS.sections.length; i++) { if (LS.sections[i].id === id) { return LS.sections[i]; } } return null; }
  function insertAfter(id, sec) {
    var at = LS.sections.length;
    LS.sections.forEach(function (s, i) { if (s.id === id) { at = i + 1; } });
    LS.sections.splice(at, 0, sec);
  }

  /* New pages go right after Start here and the ancient texts page. */
  insertAfter("texts", darkskin);
  insertAfter("darkskin", scientists);

  find("genes").blocks.push(diversity);
  var ph = find("photon");
  if (ph) {
    var pos = ph.blocks.length;
    ph.blocks.forEach(function (b, i) { if (b.h === "The patent figure") { pos = i; } });
    ph.blocks.splice(pos, 0, pergram);
  }
  find("gamma").blocks.push(programs);
  find("electronics").blocks.push(electronics);
  var disc = find("discoveries");
  disc.blocks.forEach(function (b) {
    if (b.h === "Splitting water with light") { water.forEach(function (it) { b.items.push(it); }); }
  });
  find("claims").blocks.push(govclaims);

  /* Pointers from existing pages. */
  find("skin").blocks.push({ h: "Dark skin at full strength", items: [{ tag: "VERIFIED", t: "The measured DNA damage, cancer and dose numbers, with the findings that cut the other way, are on their own page.", go: "s/darkskin", goLabel: "Open the dark skin page" }] });
  find("gamma").blocks[find("gamma").blocks.length - 1].items.push({ tag: "OPEN", t: "The per-gram comparison with lead across energies is on the photon calculation page.", go: "s/photon", goLabel: "Open the photon calculation page" });

  /* Sources. */
  [
    S("Fajuyigbe 2018 (PubMed 29394104)", "https://www.pubmed.gov/29394104/"),
    S("Tadokoro 2003 record", "https://vufind-test.katalog.k.utb.cz/SummonRecord/FETCH-LOGICAL-p289E-1462869216b212e4bf36292ee534d561569a96853567a129109b168659d75ad82/Details"),
    S("Tadokoro 2005 record", "https://data.zhenzhi.com/details/1/889349622"),
    S("Brenner and Hearing 2008 (PMC2671032)", "https://pmc.ncbi.nlm.nih.gov/articles/PMC2671032/"),
    S("Frontiers in Physiology melanin review", "https://frontiersin.org/journals/physiology/articles/10.3389/fphys.2015.00276/full"),
    S("Melanoma among non-Hispanic Black Americans (PMC6638592)", "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6638592/"),
    S("Ethnic differences among patients with cutaneous melanoma (PubMed 17000949)", "https://pubmed.ncbi.nlm.nih.gov/17000949/"),
    S("Natural protection factor review (Springer)", "https://springerlink.bibliotecabuap.elogim.com/10.1007/s43630-022-00314-z"),
    S("Narrowband UVB MED, Acta Dermato-Venereologica", "https://medicaljournals.se/acta/download/10.1080/00015550410022203"),
    S("MED in Taiwanese adults", "https://scholars.lib.ntu.edu.tw/handle/123456789/434978"),
    S("Eumelanin polymer antioxidant (PMC7222206)", "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7222206/"),
    S("Jewel Plummer Cobb (JAX blog)", "https://resources.jax.org/jax-blog/women-in-science-jewel-plummer-cobb-1924-2017"),
    S("Jewel Plummer Cobb (Wikipedia)", "https://en.wikipedia.org/wiki/Jewel_Plummer_Cobb"),
    S("Jewel Plummer Cobb (Blackpast)", "https://www.blackpast.org/aah/cobb-jewel-plummer-1924"),
    S("Jewel Plummer Cobb (Finding Ada)", "https://findingada.com/?p=17873"),
    S("Cheikh Anta Diop (Wikipedia)", "https://en.wikipedia.org/wiki/Cheikh_Anta_Diop"),
    S("Lessons from Cheikh Anta Diop (Pambazuka)", "https://pambazuka.org/node/66371"),
    S("Peopling of ancient Egypt, UNESCO 1978 (Open Library)", "https://openlibrary.org/books/OL4482132M"),
    S("Skin of Color Society founder (Healio)", "https://www.healio.com/dermatology/skin-care/news/online/%7Bda5fcc66-eedf-4c08-9c55-91faf5c608c9%7D/society-helps-increase-awareness-research-in-skin-of-color"),
    S("Skin of Color Society history", "https://www.livderm.org/partner-of-the-month-skin-of-color-society/"),
    S("John McGinness (Wikipedia)", "https://en.wikipedia.org/wiki/John_McGinness"),
    S("Tishkoff 2009 (Penn release)", "https://webarchive.library.unt.edu/eot2008/20090505192042/http://www.nigms.nih.gov/News/Results/043009b.htm"),
    S("Tishkoff 2009 (paper PDF)", "https://faculty.washington.edu/wjs18/Pop_Structure/TishkoffAfrican.pdf"),
    S("Popejoy and Fullerton 2016 (PubMed 27734877)", "https://www.pubmed.gov/27734877/"),
    S("Popejoy and Fullerton coverage (Bio-IT World)", "https://bio-itworld.com/news/2016/10/13/among-the-multitude-a-look-at-the-complexity-of-diversity-in-genetics"),
    S("Metal-doped eumelanin attenuation (PMC11902467)", "https://pmc.ncbi.nlm.nih.gov/articles/PMC11902467"),
    S("Melanin PLA in low Earth orbit, PNAS 2025 (summary)", "https://astrobiology.com/2025/05/01/radiation-protection-and-structural-stability-of-fungal-melanin-polylactic-acid-biocomposites-in-low-earth-orbit/"),
    S("NRL fungal experiment on Artemis I", "https://www.nrl.navy.mil/Media/News/Article/3140516/nrl-fungal-experiment-launches-as-artemis-i-payload/"),
    S("NASA: why study fungi", "https://science.nasa.gov/biological-physical/stories/why-is-nasa-studying-fungi/"),
    S("Army STTR topic A19B-T010", "https://www.highergov.com/sbir-opportunity/production-of-natural-melanin-for-afford-a19b-t010-sttr-2019-b7a121dd"),
    S("MelaTech and the Army STTR program", "https://www.tedcomd.com/insight/melatech-unlocks-potential-melanin-technologies-through-army-sttr-program"),
    S("Metal ions and melanin review (Applied Magnetic Resonance)", "https://link.springer.com/10.1007/s00723-021-01386-3"),
    S("Metal binding to melanin (PMC5691108)", "https://pmc.ncbi.nlm.nih.gov/articles/PMC5691108"),
    S("Solis Herrera 2014 review (MOJ Cell Science and Report)", "https://medcraveonline.com/MOJCSR/einstein-cosmological-constant-the-cell-and-the-intrinsic-property-of-melanin-to-split-and-re-form-the-water-molecule.html")
  ].forEach(function (s) {
    var have = LS.sources.some(function (x) { return x.u === s.u; });
    if (!have) { LS.sources.push(s); }
  });
})();
