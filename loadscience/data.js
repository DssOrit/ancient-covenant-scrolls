/* Load Science: melanin research note, 2026-11-03.
   Every item carries a tag. VERIFIED means the paper exists and says this,
   checked at abstract or search-summary level. Full texts were not read. */
window.LS = {
  version: "loadscience-v10",
  date: "2026-11-03",
  tags: {
    VERIFIED: "The paper exists and says this. Checked at abstract or summary level.",
    SECONDARY: "Seen only in a news story or summary, not in the paper.",
    UNVERIFIED: "Could not be confirmed. Do not cite yet.",
    READING: "An interpretive reading. The papers do not state it.",
    NOTSUPPORTED: "No primary source found.",
    OPEN: "The science itself is not settled.",
    CONFLICTING: "Studies disagree.",
    HYPOTHESIS: "A proposal. The mechanism is not shown."
  },
  sections: [
    {
      id: "start",
      title: "Start here",
      blurb: "How to read this app, and the 10-line summary.",
      blocks: [
        {
          h: "Important limit",
          items: [
            { tag: "OPEN", t: "Verified in this app does not mean the full text was read. The full-text site (pmc.ncbi.nlm.nih.gov) was blocked when this research was done. So there are no effect sizes and no allele-frequency tables here." }
          ]
        },
        {
          h: "The short version",
          items: [
            { tag: "VERIFIED", t: "1. Melanin blocks UV light and lowers DNA damage." },
            { tag: "VERIFIED", t: "2. Darker skin has a stronger water barrier. This was shown in a mouse study." },
            { tag: "VERIFIED", t: "3. Melanin in the brain binds iron. Too much may harm. That part is open." },
            { tag: "VERIFIED", t: "4. Melanin protects living cells from gamma rays in the lab." },
            { tag: "VERIFIED", t: "5. Mice fed melanin survived a lethal gamma dose about 80 percent of the time." },
            { tag: "HYPOTHESIS", t: "6. Melanin turning radiation into growth energy is a hypothesis. It is not settled." },
            { tag: "VERIFIED", t: "7. African pigmentation genes are older and more varied than anywhere else studied." },
            { tag: "VERIFIED", t: "8. Most of those gene variants are older than modern humans." },
            { tag: "VERIFIED", t: "9. One light-skin gene (SLC24A5) entered East Africa by gene flow." },
            { tag: "NOTSUPPORTED", t: "10. Popular claims about melanin and superconductors, energy conversion in people, or spiritual power have no primary source found." }
          ]
        }
      ]
    },
    {
      id: "skin",
      title: "Melanin in skin",
      blurb: "UV filter, DNA protection, water barrier.",
      blocks: [
        {
          h: "It filters UV light",
          items: [
            { tag: "VERIFIED", t: "Kaidbey, Agin, Sayre, Kligman. J Am Acad Dermatol 1979;1(3):249-60. Black skin lets through about one fifth of the UV (UVB and UVA) that reaches the upper dermis in Caucasian skin.", src: [{ l: "PubMed 512075", u: "https://pubmed.ncbi.nlm.nih.gov/512075/" }] },
            { tag: "VERIFIED", t: "In Caucasian skin the top dead layer (stratum corneum) does most of the filtering. In Black skin the living epidermal layers do it. The authors credit melanin amount plus how melanosomes are packed and spread." },
            { tag: "SECONDARY", t: "Natural protection factors of about 13.4 for dark skin and 3.3 for light skin appear in a 2022 Springer photochemistry review (DOI 10.1007/s43630-022-00314-z), citing an earlier reference. They are estimates, not sunscreen-test SPF values, and the original measurement was not traced. Popular pages quote 3.4 for light skin.", go: "s/darkskin", goLabel: "Open the dark skin page" }
          ]
        },
        {
          h: "It lowers DNA damage",
          items: [
            { tag: "VERIFIED", t: "Higher built-in melanin goes with less UV DNA damage. Damage in the lower epidermis, where melanocytes sit, is better prevented in darker skin. Summary level.", src: [{ l: "Bohrium: MC1R and dark eumelanin", u: "https://bohrium.dp.tech/paper/arxiv/23303275" }] },
            { tag: "SECONDARY", t: "Eumelanin and pheomelanin protect differently. Eumelanin protects more. A 2018 review in Int J Mol Sci covers this. Seen through summaries only." },
            { tag: "OPEN", t: "A 2024 Scientific Reports study on lab-grown skin found tanned models still had more damage after some UV doses. Seen via news. Melanin can both protect and sensitize. This is not settled." }
          ]
        },
        {
          h: "It strengthens the skin barrier",
          items: [
            { tag: "VERIFIED", t: "Man, Elias et al. J Invest Dermatol 2014, \"Basis for enhanced barrier function of pigmented skin.\" Darker skin holds water better. Cause: lower surface pH, linked to melanin granule release and the enzyme sPLA2f. Acidifying light skin raised its barrier to the dark-skin level.", src: [{ l: "PubMed 24732399", u: "https://pubmed.ncbi.nlm.nih.gov/24732399/" }] },
            { tag: "OPEN", t: "Shown in mice: acidifying light skin raised its barrier to the dark-skin level. That is a clear result. Testing it in people is the next step." }
          ]
        },
        {
          h: "Antimicrobial role",
          items: [
            { tag: "HYPOTHESIS", t: "Mackintosh 2001 proposed that melanocytes and melanin work as an antimicrobial defense. No primary data on human skin was found." },
            { tag: "UNVERIFIED", t: "Treat the antimicrobial role as unconfirmed until a primary study is found." }
          ]
        }
      ]
    },
    {
      id: "brain",
      title: "Melanin in the brain",
      blurb: "Neuromelanin: it protects, and too much may harm.",
      blocks: [
        {
          h: "What neuromelanin does",
          items: [
            { tag: "VERIFIED", t: "Neuromelanin sits in the substantia nigra. It binds iron and blocks hydroxyl radicals made by the Fenton reaction.", src: [{ l: "PubMed 11724917", u: "https://pubmed.ncbi.nlm.nih.gov/11724917/" }, { l: "PMC2791353", u: "https://pmc.ncbi.nlm.nih.gov/articles/PMC2791353" }] },
            { tag: "VERIFIED", t: "It stops dopamine from turning into toxic quinones." },
            { tag: "VERIFIED", t: "When it breaks down in Parkinson's disease, it may release iron. The finding is verified. The cause is open." },
            { tag: "VERIFIED", t: "In rodents, pushing neuromelanin too high caused Lewy-body-like clumps. Summary level." },
            { tag: "OPEN", t: "Plain reading of the evidence: protective at normal levels, possibly harmful when overloaded. This is not settled." }
          ]
        }
      ]
    },
    {
      id: "genes",
      title: "African pigmentation genetics",
      blurb: "Which genes, how old, and where the light variant came from.",
      blocks: [
        {
          h: "The big study",
          items: [
            { tag: "VERIFIED", t: "Crawford et al. Science 2017. DOI 10.1126/science.aan8433. 2,092 people from Ethiopia, Tanzania and Botswana. Genes found: SLC24A5, MFSD12, DDB1/TMEM138, OCA2, HERC2.", src: [{ l: "CARTA summary", u: "https://carta.anthropogeny.org/node/315268" }, { l: "ScienceDaily 2017", u: "https://www.sciencedaily.com/releases/2017/10/171012143324.htm" }] },
            { tag: "VERIFIED", t: "The authors report that alleles at all loci except SLC24A5 are ancient and predate the origin of modern humans. Reported ages are about 300,000 to 1 million years. Press and summary level." },
            { tag: "VERIFIED", t: "Both light and dark alleles are old African variants. Pigmentation in Africa is not one uniform thing." }
          ]
        },
        {
          h: "Gene by gene",
          table: {
            head: ["Gene", "What the papers report", "Tag"],
            rows: [
              ["MFSD12", "Makes a lysosome protein that affects melanin making in zebrafish and mice. Two low-expression mutations are common in the darkest-skinned people and arose about half a million years ago. Common in Nilo-Saharan-ancestry groups.", "VERIFIED"],
              ["DDB1 / TMEM138", "Melanocyte control regions here link to UV-response genes that are under selection in Eurasians.", "VERIFIED"],
              ["OCA2 and HERC2", "Light-linked variants are most frequent in the San of southern Africa. Note that light and dark alleles are both old African variants.", "VERIFIED"],
              ["SLC24A5", "The light variant (A111T) entered East Africa by gene flow from outside Africa. Canfield et al., G3 2013: nearly all copies share one 78-kb haplotype, so one origin.", "VERIFIED"]
            ]
          },
          items: [
            { tag: "VERIFIED", t: "Canfield 2013 source.", src: [{ l: "PubMed 24048645", u: "https://pubmed.ncbi.nlm.nih.gov/24048645" }] }
          ]
        },
        {
          h: "Southern Africa: Khoe-San",
          items: [
            { tag: "VERIFIED", t: "Martin et al. Cell 2017;171(6):1340-1353. DOI 10.1016/j.cell.2017.11.015. Pigmentation is highly heritable. Known loci explain only a small share of it, so the trait is very polygenic. Loci found near SLC24A5, TYRP1, SMARCA2/VLDLR and SNX13.", src: [{ l: "Broad Institute record", u: "https://www.broadinstitute.org/publications/broad625081" }] },
            { tag: "VERIFIED", t: "Lin et al. PNAS 2018. The light SLC24A5 allele reached the Khoe-San from East Africa about 2,000 years ago. Migration alone was too small to explain how common it is, so selection is proposed. Why selection happened is unclear. News level.", src: [{ l: "ScienceDaily 2018", u: "https://www.sciencedaily.com/releases/2018/12/181210165103.htm" }] }
          ]
        },
        {
          h: "Shared dark alleles",
          items: [
            { tag: "SECONDARY", t: "Dark alleles in Africans are reported identical by descent with those in southern Asian and Australo-Melanesian groups. Confirm in the Crawford full text before citing.", src: [{ l: "Search summary", u: "https://mixedracestudies.org/?p=55340" }] }
          ]
        },
        {
          h: "Admixed-population replication",
          items: [
            { tag: "VERIFIED", t: "Lona-Durazo et al. 2019. N = 2,104 from Cuba, Cape Verde, Puerto Rico and San Francisco. Replicated MFSD12 (lead SNP rs112332856).", src: [{ l: "PMC6341102", u: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6341102" }] },
            { tag: "OPEN", t: "This is not African-population evidence. Do not use it as such." }
          ]
        },
        {
          h: "Not found",
          items: [
            { tag: "UNVERIFIED", t: "Beleza 2013 and Pagani-related back-migration claims." },
            { tag: "UNVERIFIED", t: "Per-locus allele frequencies and effect sizes. Full text was blocked." }
          ]
        },
        {
          h: "The reading",
          items: [
            { tag: "READING", t: "The dark-pigmentation variants are very old and predate modern humans. Dark alleles shared with Asia and Australia point back to the Nile Valley and its neighbours as the source. This fits the Kush, Mitzrayim, Put and Kena'an lineage framing used across ACR sites. The papers do not state this conclusion. It is the reading of the evidence." }
          ]
        },
        {
          h: "Where mainstream scholarship frames it differently",
          items: [
            { tag: "OPEN", t: "Jablonski and Chaplin (J Hum Evol 2000; PNAS 2010) say dark skin evolved to protect folate from UV, and light skin at high latitude evolved for vitamin D. Rivals are the skin barrier and mutagenesis hypotheses. Reviewers say they overlap.", src: [{ l: "PMC5986434", u: "https://pmc.ncbi.nlm.nih.gov/articles/PMC5986434/" }, { l: "PMC10083917", u: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10083917" }] }
          ]
        }
      ]
    },
    {
      id: "spectrum",
      title: "The electromagnetic spectrum",
      blurb: "Melanin from radio waves up to gamma rays.",
      blocks: [
        {
          h: "Read the spectrum in order",
          intro: "Low energy to high energy: radio, microwave, infrared, visible light, UV, X-ray, gamma. Frequency goes up. Wavelength gets shorter. Energy per photon goes up.",
          spectrum: true,
          items: []
        },
        {
          h: "Band by band",
          table: {
            head: ["Band", "What is documented", "Tag"],
            rows: [
              ["Extremely low frequency, 30-75 Hz", "Cell studies: 50 Hz fields raised melanin content and tyrosinase activity in cultured melanocytes by 1.2 to 1.5 times. Cells only.", "VERIFIED"],
              ["Radio, 1 Hz to 1 MHz", "Motovilov et al.: first broadband, temperature-dependent (5-325 K) measurement of eumelanin AC conductivity and dielectric properties.", "VERIFIED"],
              ["Radio and microwave, cell exposure", "A 2024 study: RF fields raised melanin synthesis in Mel-Ab melanocytes through p53, MC1R, MITF and tyrosinase. The authors say it was not a heat effect. An earlier study at 1.76 GHz and 28 GHz found no effect.", "CONFLICTING"],
              ["Microwave, 0.3-300 GHz", "No melanin-specific absorption data found.", "UNVERIFIED"],
              ["Terahertz, 0.2-3 THz", "The same Motovilov work covers 0.2-3 THz dielectric behaviour. It ties to the comproportionation model (water making semiquinone).", "VERIFIED"],
              ["Near-infrared", "Natural melanin nanoparticles turn light to heat at about 40 percent efficiency, against about 29 percent for synthetic polydopamine. Used in photothermal therapy research. Nanoparticles, not skin.", "VERIFIED"],
              ["Visible", "Broad, smooth absorption with no sharp peaks.", "VERIFIED"],
              ["UV", "Strong absorption. Filters UV. Lowers DNA damage.", "VERIFIED"],
              ["X-ray photons", "No published melanin attenuation coefficients found.", "UNVERIFIED"],
              ["Beta (electrons, not photons)", "Vasileiou et al., PLOS ONE 2020: melanin did not shield beta radiation better than cellulose.", "VERIFIED"],
              ["Gamma", "Radical quenching and survival results in fungi, cells and mice. See the gamma page.", "VERIFIED"]
            ]
          },
          items: []
        },
        {
          h: "Visible and UV: the documented range",
          items: [
            { tag: "VERIFIED", t: "Eumelanin absorbs broadly across UV, visible and near-infrared. The curve is smooth with no sharp peaks, and rises toward higher energy. Sources: Meredith et al. 2006 (Soft Matter); a 2020 Chemical Science study on DOPA melanin.", src: [{ l: "Chemical Science 2020", u: "https://pubs.rsc.org/en/content/articlehtml/2020/sc/c9sc04527a" }, { l: "Soft Matter 2006", u: "https://pubs.rsc.org/en/content/articlehtml/2006/sm/b511922g" }] },
            { tag: "OPEN", t: "Why so broad: many different light-absorbing pieces add together. Chemical disorder is the leading idea. The exact structure of melanin is not resolved." },
            { tag: "OPEN", t: "Wolbarsht suggested light scattering could add to the shape. Results may depend on how the sample is prepared." }
          ]
        },
        {
          h: "Why melanin reacts across so many bands",
          items: [
            { tag: "VERIFIED", t: "Eumelanin has two kinds of stable radical, seen by EPR: carbon-centred radicals, built into the structure, and semiquinone radicals, made when water is present (comproportionation).", src: [{ l: "PMC9060503", u: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9060503" }, { l: "RSC Advances 2019", u: "https://pubs.rsc.org/en/content/articlehtml/2019/ra/c8ra09093a" }] },
            { tag: "VERIFIED", t: "Semiquinone is the key radical for charge transport." },
            { tag: "VERIFIED", t: "A 2018 EPR study separated the two radical types and reported light makes more semiquinone. The summary was cut off, so details are unverified." },
            { tag: "SECONDARY", t: "Photothermal heating rises with free-radical content through non-radiative transitions. The abstract was garbled. Check the original paper." },
            { tag: "READING", t: "Stable radicals, plus a mix of absorbing pieces, plus water-driven proton movement. That combination is what lets it respond over a wide range. This is an interpretation." }
          ]
        },
        {
          h: "Correction recorded",
          items: [
            { tag: "OPEN", t: "The first version of the research note said no primary study of melanin at radio frequency exists. That was too broad. Broadband measurements do exist, listed above." }
          ]
        },
        {
          h: "Gaps in this part",
          items: [
            { tag: "UNVERIFIED", t: "Femtosecond transient-absorption work (excited-state lifetimes): not found." },
            { tag: "UNVERIFIED", t: "Static magnetic field studies: not found." },
            { tag: "UNVERIFIED", t: "Microwave absorption of melanin: not found." }
          ]
        }
      ]
    },
    {
      id: "gamma",
      title: "X-ray and gamma ray",
      blurb: "Radiation protection, the radiosynthesis question, and space tests.",
      blocks: [
        {
          h: "Lab results on melanin itself",
          items: [
            { tag: "VERIFIED", t: "Synthetic melanin took 30,000 cGy (300 Gy) of Cs-137 gamma (661.6 keV). Its stable free radicals did not change in quality or quantity. Dadachova group, PLoS ONE 2009." },
            { tag: "VERIFIED", t: "Melanized Cryptococcus and Histoplasma resisted radiation up to 8 kGy. Protection depended on melanin chemistry, radical quenching and spherical shape.", src: [{ l: "Dadachova paper", u: "https://www.einsteinmed.edu/uploadedFiles/casadevall/dadachovaradio.pdf" }] },
            { tag: "VERIFIED", t: "Melanin also breaks down a little. It protects partly by being used up.", src: [{ l: "PMC3178601", u: "https://pmc.ncbi.nlm.nih.gov/articles/PMC3178601" }] }
          ]
        },
        {
          h: "Mice",
          items: [
            { tag: "VERIFIED", t: "Revskaya et al. 2012 (Einstein / Dadachova). CD-1 mice fed melanin-rich black mushrooms. Dose: lethal 9 Gy from Cs-137. About 80 percent survived. Controls died of gastrointestinal syndrome.", src: [{ l: "Revskaya paper", u: "https://einsteinmed.edu/uploadedFiles/labs/casadevall/new_website/paper/2011/Revskaya_Chu_12.pdf" }] },
            { tag: "VERIFIED", t: "White mushrooms plus melanin did as well. This points to melanin as the active part. Blood counts returned to normal by day 45." },
            { tag: "HYPOTHESIS", t: "Proposed mechanism, from the authors: internal shielding by Compton scattering, then radical scavenging." },
            { tag: "VERIFIED", t: "Later work with soluble fungal allomelanin: better survival at a lethal 10 Gy when given 24 hours after exposure. A trend toward better survival at a sublethal 8 Gy, given up to 48 hours after.", src: [{ l: "Record", u: "https://katalog.lib.cas.cz/KNAV/EdsRecord/edsair,edsair.doi.dedup.....5c3613412fe7fc627b041e61d3caadad" }] },
            { tag: "OPEN", t: "80 percent of the mice survived a lethal dose. Melanin given after the exposure also raised survival at a lethal 10 Gy. Done in mice so far. The protection lasts a limited time." }
          ]
        },
        {
          h: "Feeding on radiation (radiosynthesis)",
          items: [
            { tag: "VERIFIED", t: "Dadachova et al. PLoS ONE 2007;2(5):e457. DOI 10.1371/journal.pone.0000457. Melanized fungi grew faster under radiation about 500 times background. Melanin electron transfer rose about 4 times in a lab test after irradiation.", src: [{ l: "PLoS ONE", u: "https://www.plosone.org/doi/pone.0000457" }] },
            { tag: "HYPOTHESIS", t: "The authors say this raises a question about melanin capturing energy. The mechanism is not solved. Press stories went further than the paper. Do not repeat the press version." }
          ]
        },
        {
          h: "Space tests",
          items: [
            { tag: "VERIFIED", t: "NASA Glenn flew polylactic acid (PLA) with fungal, synthetic or animal melanin on the space station for about 6 months. PNAS 2025, DOI 10.1073/pnas.2427118122. Fungal melanin reduced mass loss and surface wrinkling. Peer reviewed. Details are in the government and space programs block below.", src: [{ l: "Summary", u: "https://astrobiology.com/2025/05/01/radiation-protection-and-structural-stability-of-fungal-melanin-polylactic-acid-biocomposites-in-low-earth-orbit/" }] },
            { tag: "SECONDARY", t: "Bland et al.: Cladosporium sphaerospermum on the ISS for 30 days. Reported radiation reduction. A bioRxiv preprint, not peer reviewed in the version found.", src: [{ l: "bioRxiv preprint", u: "https://www.biorxiv.org/content/10.1101/2020.07.16.205534v4" }] },
            { tag: "UNVERIFIED", t: "No measured X-ray or gamma attenuation coefficients for pure melanin were found in the sources opened. A search listing shows a study of metal-doped eumelanin (PMC11902467). It was not opened." }
          ]
        },
        {
          h: "Two honest limits",
          items: [
            { tag: "VERIFIED", t: "Beta shielding: melanin did not beat cellulose (Vasileiou 2020). This does not contradict the gamma survival results. Those are about radical quenching in living tissue, not stopping the particle. Do not mix the two.", src: [{ l: "Vasileiou 2020, PLOS ONE", u: "https://ideas.repec.org/a/plo/pone00/0229921.html" }] },
            { tag: "UNVERIFIED", t: "A patent document claims a melanin linear attenuation coefficient of 1.4 x 10^4 per cm, far above lead. It names no photon energy. It is a patent, not a measurement paper. Not usable until the energy and method are named.", src: [{ l: "Patent document", u: "https://image-ppubs.uspto.gov/dirsearch-public/print/downloadPdf/8586090" }] },
            { tag: "READING", t: "Melanin is mostly carbon, hydrogen, nitrogen and oxygen. These are light elements, which points to weak photon stopping. This is an expectation, not a result. A real number can be computed from melanin's composition and density with NIST XCOM." }
          ]
        },
        {
          h: "What is not shown",
          items: [
            { tag: "UNVERIFIED", t: "No human trial of melanin as a gamma shield." },
            { tag: "UNVERIFIED", t: "No evidence that skin melanin protects a person from gamma radiation. Skin melanin evidence is for UV, not gamma." }
          ]
        },
        {
          h: "The reading",
          items: [
            { tag: "READING", t: "Melanin acts across a very wide energy range. It filters UV, and quenches radicals made by X-rays and gamma. This supports melanin as an ancient, general-purpose protective molecule. The papers support the radical-quenching and survival results. The general-purpose label is an interpretation." }
          ]
        }
      ]
    },
    {
      id: "electronics",
      title: "Melanin as electronics",
      blurb: "Hydration, protons, and a melanin transistor.",
      blocks: [
        {
          h: "Documented physics",
          items: [
            { tag: "VERIFIED", t: "Mostert et al. PNAS 2012: eumelanin is an electronic-ionic hybrid conductor, not a simple amorphous semiconductor. Conductivity depends on water content and is mostly proton current.", src: [{ l: "Swansea record", u: "https://cronfa.swansea.ac.uk/Record/cronfa38486" }] },
            { tag: "VERIFIED", t: "Sheliakina, Mostert, Meredith. Materials Horizons 2018: an all-solid-state transistor made from melanin. It converts ionic biological signals into electronic ones.", src: [{ l: "RSC Advances 2019", u: "https://pubs.rsc.org/en/content/articlehtml/2019/ra/c8ra09093a" }] },
            { tag: "OPEN", t: "The exact conduction mechanism is still being refined." }
          ]
        }
      ]
    },
    {
      id: "notsupported",
      title: "Claims with no source",
      blurb: "Popular claims where no primary source was found.",
      blocks: [
        {
          h: "No primary source found",
          items: [
            { tag: "NOTSUPPORTED", t: "Melanin as a superconductor in the body." },
            { tag: "NOTSUPPORTED", t: "Melanin absorbing radio waves in a law-like way. One web page claimed an inverse fourth-power law. That page is not a primary source." },
            { tag: "NOTSUPPORTED", t: "Melanin as a human energy converter." },
            { tag: "NOTSUPPORTED", t: "Melanin giving cognitive or spiritual ability." },
            { tag: "OPEN", t: "If you hold a named source for any of these, send it and the exact locus will be checked." }
          ]
        }
      ]
    },
    {
      id: "checks",
      title: "Open checks",
      blurb: "What still has to be done.",
      blocks: [
        {
          h: "Next steps",
          items: [
            { tag: "OPEN", t: "1. Allow pmc.ncbi.nlm.nih.gov in the session network settings, then read the Crawford and Martin full texts." },
            { tag: "OPEN", t: "2. Confirm the identical-by-descent claim: African dark alleles shared with Asia and Australia." },
            { tag: "OPEN", t: "3. Confirm Kaidbey protection factors from the full 1979 paper." },
            { tag: "OPEN", t: "4. Find the peer-reviewed version of the Cordero ISS result." },
            { tag: "OPEN", t: "5. Find any published gamma attenuation coefficient for melanin." },
            { tag: "OPEN", t: "6. Check Beleza 2013 and Pagani on East Africa gene flow." },
            { tag: "OPEN", t: "7. Compute X-ray attenuation for melanin with NIST XCOM." }
          ]
        }
      ]
    }
  ],
  sources: [
    { l: "Kaidbey 1979", u: "https://pubmed.ncbi.nlm.nih.gov/512075/" },
    { l: "Man, Elias 2014", u: "https://pubmed.ncbi.nlm.nih.gov/24732399/" },
    { l: "Neuromelanin, PubMed 11724917", u: "https://pubmed.ncbi.nlm.nih.gov/11724917/" },
    { l: "Neuromelanin, PMC2791353", u: "https://pmc.ncbi.nlm.nih.gov/articles/PMC2791353" },
    { l: "Crawford 2017 (CARTA)", u: "https://carta.anthropogeny.org/node/315268" },
    { l: "Crawford 2017 (ScienceDaily)", u: "https://www.sciencedaily.com/releases/2017/10/171012143324.htm" },
    { l: "Martin 2017 (Broad)", u: "https://www.broadinstitute.org/publications/broad625081" },
    { l: "Lin 2018 (ScienceDaily)", u: "https://www.sciencedaily.com/releases/2018/12/181210165103.htm" },
    { l: "Canfield 2013", u: "https://pubmed.ncbi.nlm.nih.gov/24048645" },
    { l: "Lona-Durazo 2019", u: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6341102" },
    { l: "Jablonski and Chaplin (PMC5986434)", u: "https://pmc.ncbi.nlm.nih.gov/articles/PMC5986434/" },
    { l: "Jablonski review (PMC10083917)", u: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10083917" },
    { l: "Melanin absorption, Chemical Science 2020", u: "https://pubs.rsc.org/en/content/articlehtml/2020/sc/c9sc04527a" },
    { l: "Melanin absorption, Soft Matter 2006", u: "https://pubs.rsc.org/en/content/articlehtml/2006/sm/b511922g" },
    { l: "Melanin conduction (Swansea)", u: "https://cronfa.swansea.ac.uk/Record/cronfa38486" },
    { l: "Melanin comproportionation, RSC Advances 2019", u: "https://pubs.rsc.org/en/content/articlehtml/2019/ra/c8ra09093a" },
    { l: "EPR and conductivity (PMC9060503)", u: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9060503" },
    { l: "Radio and terahertz work, record to confirm (PMC12631427)", u: "https://pmc.ncbi.nlm.nih.gov/articles/PMC12631427" },
    { l: "RF cell study", u: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC11595227/" },
    { l: "ELF cell study", u: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5666802/" },
    { l: "Natural melanin photothermal", u: "https://ngdc.cncb.ac.cn/openlb/publication/OLB-PM-28756194" },
    { l: "Radiation, fungi (Dadachova)", u: "https://www.einsteinmed.edu/uploadedFiles/casadevall/dadachovaradio.pdf" },
    { l: "Radiation, fungi (PMC3178601)", u: "https://pmc.ncbi.nlm.nih.gov/articles/PMC3178601" },
    { l: "Radiation, mice (Revskaya)", u: "https://einsteinmed.edu/uploadedFiles/labs/casadevall/new_website/paper/2011/Revskaya_Chu_12.pdf" },
    { l: "Radiosynthesis (PLoS ONE 2007)", u: "https://www.plosone.org/doi/pone.0000457" },
    { l: "ISS preprint (bioRxiv)", u: "https://www.biorxiv.org/content/10.1101/2020.07.16.205534v4" },
    { l: "Beta shielding (Vasileiou 2020)", u: "https://ideas.repec.org/a/plo/pone00/0229921.html" }
  ]
};
