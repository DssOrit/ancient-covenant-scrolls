/* Load Science, sixth data file: plain-words cards, limits gathered at the end of a page,
   twelve findings added, metal-binding numbers, three text ties, and the claims check for
   the later pasted sets. Loaded after data5.js. Main pages are done first; the remaining
   pages follow after the owner checks the style. Tags say what was seen. Full texts were
   not available (pmc, pubmed, projectbiodiversify and wikipedia hosts are blocked in this
   session), so VERIFIED means abstract, release or search-summary level. */
(function () {
  var LS = window.LS;
  function S(l, u) { return { l: l, u: u }; }
  function find(id) { for (var i = 0; i < LS.sections.length; i++) { if (LS.sections[i].id === id) { return LS.sections[i]; } } return null; }
  function findItem(sec, prefix) {
    for (var b = 0; b < sec.blocks.length; b++) {
      var items = sec.blocks[b].items || [];
      for (var i = 0; i < items.length; i++) {
        if (items[i].t.indexOf(prefix) === 0) { return { block: sec.blocks[b], index: i, item: items[i] }; }
      }
    }
    return null;
  }
  /* Insert a plain-words card right after the item whose text starts with prefix. */
  function plainAfter(secId, prefix, text) {
    var f = findItem(find(secId), prefix);
    if (!f) { return; }
    f.block.items.splice(f.index + 1, 0, { tag: "READING", t: "In plain words: " + text });
  }
  /* Move cards that state a limit into one block at the end of the page. */
  function limitsToEnd(secId, prefixes, heading) {
    var sec = find(secId), moved = [];
    prefixes.forEach(function (p) {
      var f = findItem(sec, p);
      if (f) { f.block.items.splice(f.index, 1); moved.push(f.item); }
    });
    sec.blocks = sec.blocks.filter(function (b) { return (b.items && b.items.length) || b.table; });
    if (moved.length) { sec.blocks.push({ h: heading || "Limits, in one place", items: moved }); }
  }
  var R = "ACR Reader, ";

  /* ---------- Dark skin page: plain words after each headline finding ---------- */
  plainAfter("darkskin", "The protection is strongest where melanin",
    "UV light breaks DNA. This study counted the breaks. Black West African skin had 8 times the protection overall. In the bottom skin layer, where new skin cells are made, the protection was 59 times. Higher up it was 16.5 times in the middle layer and 5 times in the top layer. The more melanin in a layer, the more protection that layer had.");
  plainAfter("darkskin", "The paper's background cites keratinocyte",
    "Non-melanoma skin cancer is 20 to 60 times more common in white populations than in black populations. The authors say the DNA protection may explain at least part of that gap.");
  plainAfter("darkskin", "SEER 1992 to 2002",
    "Melanoma is skin cancer that starts in pigment cells. In the older data, 0.8 Black Americans in 100,000 got it each year. For whites it was 18.4 in 100,000. That is about 23 times more. The newer data show the same direction.");
  plainAfter("darkskin", "Kaidbey 1979",
    "For about every 5 units of UV that reach the deeper skin of a white person, about 1 unit reaches the deeper skin of a Black person. The rest is stopped higher up.");
  plainAfter("darkskin", "Tadokoro et al., FASEB Journal 2003",
    "More melanin in the skin went with less UV damage to DNA. This held across people from different backgrounds.");
  plainAfter("darkskin", "Brenner and Hearing",
    "Eumelanin is the dark brown-black pigment. It protects. Pheomelanin is the red-yellow pigment. It can make harmful molecules when UV hits it.");
  limitsToEnd("darkskin", [
    "The full text was not read.",
    "The size depends on wavelength, light source, body site and population."
  ], "Limits of this page, in one place");

  /* ---------- Skin page ---------- */
  plainAfter("skin", "Kaidbey, Agin, Sayre, Kligman",
    "Black skin lets about one fifth of the UV through to the deeper skin, compared with white skin. Melanin is the main reason.");
  plainAfter("skin", "Higher built-in melanin goes with less UV DNA damage",
    "Less UV damage to DNA means fewer errors that can lead to cancer later.");

  /* ---------- Gamma page ---------- */
  var g = find("gamma"), gi = findItem(g, "Melanin is mostly carbon, hydrogen, nitrogen and oxygen.");
  if (gi) {
    gi.item.tag = "CALCULATED";
    gi.item.t = "Melanin is made mostly of carbon, hydrogen, nitrogen and oxygen. These are light elements. The calculation is done (photon page). Per gram, melanin reaches half of lead's stopping at about 454 keV, 72.4 percent at 661.6 keV (the Cs-137 gamma used in the mouse work), and 82.5 percent at 800 keV. At 100 keV it reaches 2.8 percent.";
    gi.item.go = "s/photon"; gi.item.goLabel = "Open the photon calculation page";
  }
  plainAfter("gamma", "Revskaya et al. 2012",
    "Mice that ate melanin-rich mushrooms were more likely to survive a lethal dose of gamma rays. Gamma rays damage tissue by making harmful molecules called free radicals. Melanin is known to calm free radicals.");
  var dad = findItem(g, "Dadachova et al. PLoS ONE 2007");
  if (dad) {
    dad.item.t = dad.item.t.replace("Melanin electron transfer rose about 4 times in a lab test after irradiation.",
      "Two lab measures after irradiation: melanin's capacity to reduce NADH (a molecule cells use to carry electrons) was 4-fold higher, and cells took in 3-fold more 14C-acetate (a labelled building block).");
  }
  plainAfter("gamma", "Dadachova et al. PLoS ONE 2007",
    "Fungi with melanin grew faster when they sat in radiation about 500 times stronger than normal background. The authors ask whether melanin helps the cell use radiation energy. That question is open.");

  g.blocks.splice(3, 0, {
    h: "More lab and programme results",
    items: [
      { tag: "VERIFIED", t: "Turick et al., Bioelectrochemistry 2011;82:69-73, DOI 10.1016/j.bioelechem.2011.04.009 (Savannah River National Laboratory). Gamma radiation changed melanin's redox potential and produced an electric current. The melanin restored itself afterwards.", src: [S("Bioelectrochemistry 2011 DOI", "https://doi.org/10.1016/j.bioelechem.2011.04.009")] },
      { tag: "READING", t: "In plain words: Redox potential is how strongly a material gives up or takes electrons. Radiation changed it, a current flowed, and the melanin went back to its starting state. A material that survives the dose it absorbs is what a radiation-stable material needs." },
      { tag: "VERIFIED", t: "The US Army DEVCOM Chemical Biological Center developed a process to recover melanin (Army release, 2022). The release was seen as a summary; the process steps and yields were not seen." },
      { tag: "VERIFIED", t: "ESA and DLR abstract: melanin aerogels improved survival under X-rays. The abstract also discusses secondary radiation, which is the shower of extra particles made when radiation hits heavier materials such as aluminium, titanium and polymers." },
      { tag: "READING", t: "In plain words: Aerogels are very light solids made mostly of air. A light melanin material helped living things survive X-rays. A heavy metal wall can add its own secondary radiation. A light carbon material avoids part of that." }
    ]
  });

  /* ---------- Photon page: plain words ---------- */
  plainAfter("photon", "Per gram, melanin reaches half of lead's stopping",
    "Lead is the standard wall against X-rays and gamma rays. Gram for gram, melanin stops half as much as lead once the photons reach 454 keV, and nearly three quarters as much at the energy of Cs-137 gamma (661.6 keV). At low X-ray energies lead is far better. Melanin is a light material, so its strength is stopping a lot per gram in the high-energy range.");

  /* ---------- Electronics page: numbers added, plus metal binding ---------- */
  var el = find("electronics");
  el.blocks.push({
    h: "Conduction and shielding numbers",
    intro: "S/cm (siemens per centimetre) is how well a material carries electric current. A bigger number carries more.",
    items: [
      { tag: "VERIFIED", t: "Migliaccio et al., Frontiers in Chemistry 2019: annealed synthetic eumelanin (HVAE) reached a conductivity of 318 S/cm." },
      { tag: "CALCULATED", t: "Copper carries about 6 x 10^7 S/cm. Copper is about 190,000 times higher than 318 S/cm. Hydrated melanin is reported from 10^-13 to 10^-5 S/cm. So 318 S/cm is about 30 million times above the top of that hydrated range." },
      { tag: "READING", t: "In plain words: Dry, heat-treated melanin carries current far better than wet melanin. It is still well below a metal such as copper." },
      { tag: "VERIFIED", t: "Jastrzebska and co-workers: melanin conductivity changes with water content, from about 10^-13 to 10^-5 S/cm. That is 8 orders of magnitude (10^8, a factor of 100 million). Water is a main control." },
      { tag: "CONFLICTING", t: "Mostert's work questions the older picture of melanin as an amorphous semiconductor (a disordered material that conducts like silicon does). It shows that hydrated melanin conducts both electrons and ions. The size of each part is still being worked out." },
      { tag: "VERIFIED", t: "Chen et al., Nature Communications, August 2025, DOI 10.1038/s41467-025-62367-9: melanin-like nanofibers gave an electromagnetic interference shielding figure of 47909.9 dB cm2/g (abstract level). These are melanin-like fibres, not natural melanin.", src: [S("Nature Communications 2025 DOI", "https://doi.org/10.1038/s41467-025-62367-9")] },
      { tag: "READING", t: "In plain words: Electromagnetic interference (EMI) shielding means blocking radio and electrical noise. A big dB cm2/g number means a lot of shielding per gram. This is a material built to copy melanin, so it shows what the melanin design can do. It is not a measurement of natural melanin." }
    ]
  });
  el.blocks.push({
    h: "Metal binding: the numbers from named studies",
    intro: "Chelation means a molecule grabs a metal ion and holds it. Biosorption means a living-origin material soaks up a metal from water.",
    items: [
      { tag: "VERIFIED", t: "Squid (Ommastrephes bartrami) melanin powder, Adsorption of Pb(II) and Cd(II), PMC2817865: at 2 mM metal, biosorption efficiency reached 95 percent for both Cd(II) and Pb(II). Maximum bound amounts were 0.93 mM/g for Cd and 0.65 mM/g for Pb.", src: [S("PMC2817865", "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2817865/")] },
      { tag: "READING", t: "In plain words: Squid melanin took about 95 parts in every 100 of lead and of cadmium out of the water, under the test conditions. Cadmium and lead are toxic metals. This was melanin powder, not nanoparticles." },
      { tag: "VERIFIED", t: "Melanin nanopigment from the marine bacterium Pseudomonas stutzeri, PMC6092452, maximum capacities in mg/g: Hg(II) 82.4, Cr(VI) 126.9, Pb(II) 147.5, Cu(II) 167.8. This is bacterial melanin, not squid ink.", src: [S("PMC6092452", "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6092452/")] },
      { tag: "CONFLICTING", t: "Binding order differs by melanin type and conditions. Fungal melanin (Amorphotheca resinae): Cu(II) > Pb(II) >> Cd(II) > Zn(II). Synthetic eumelanin coatings: Pb strongest, then Cu at 77 percent, Cd 53 percent and Zn 35 percent of the lead affinity. Squid melanin: salts did not change Pb binding but cut Cd binding a great deal, so different groups on the pigment hold the two metals." },
      { tag: "SECONDARY", t: "Carboxyl groups hold Cd more than catechol groups do: a DHICA-containing melanin bound at least eight times more Cd than polydopamine. Catechol sites are good holders of Hg(II). Seen in search summaries of the studies." },
      { tag: "UNVERIFIED", t: "A removal figure for Cr(VI) by squid-ink melanin was not found. The 2018 squid ink sac melanin bead study (PMC5824532) says no earlier study had tested squid ink melanin for chromium. Its Cr(VI) result was not seen.", src: [S("PMC5824532", "https://pmc.ncbi.nlm.nih.gov/articles/PMC5824532")] },
      { tag: "UNVERIFIED", t: "A single fixed hierarchy of metals, a hard-and-soft acid-base explanation, and irreversible binding: none was tested in the studies found. A 97 percent figure was not seen." }
    ]
  });

  /* ---------- Texts page: three more ties ---------- */
  var tx = find("texts");
  var tie = {
    h: "Gichon, Moshe's face, and the 4Q186 check",
    items: [
      { tag: "TEXT", t: "Bereshit 2:13: \"And the name of the second river is Gichon; the same is it that encompasses the whole land of Kush.\"", cite: R + "Volume One, Part One, data/file_1.json" },
      { tag: "READING", t: "In plain words: The oldest record names the land Kush by a river in the garden account. Kush is named in the first chapters of the record, not added later. The earlier Kush verses on this page continue from here." },
      { tag: "TEXT", t: "Shemot 34:29-35 (verses 29, 30 and 35): \"...Moshe did not know that the skin of his face shone, because he had spoken with him.\" \"...behold, the skin of his face shone; and they were afraid to come near him.\" \"...the skin of Moshe's face shone; and Moshe put the veil on his face again...\" Verse 33: \"he put a veil on his face.\"", cite: R + "Volume Two, Part Two, Shemot chapter 34, data/file_6.json" },
      { tag: "TEXT", t: "ACR's critical note on Shemot 34 keeps \"shone\" literal: it is \"retained literally ('shone') rather than glossed with a later interpretive tradition about the nature or cause of the radiance\" and the Hebrew's description is \"vivid, undefined\".", cite: R + "Volume Two, Part Two, Shemot chapter 34, critical note, data/file_6.json" },
      { tag: "READING", t: "In plain words: The text says the skin of the face shone, that people were afraid to come near, and that a veil was used. The text gives no cause and the melanin research does not explain this verse. This page records the wording and does not assign a cause." },
      { tag: "NOTEXT", t: "4Q186 (the Qumran horoscope or physiognomy text) is not in the ACR Reader or in ACR2. Searched in both. Kebra Nagast and the phrase \"garments of light\" are also not in either.", cite: R + "searched, data/ files" },
      { tag: "VERIFIED", t: "What search summaries say about 4Q186: it is called Astrological Physiognomies or Horoscopes. It describes people by body features and by their shares of light and darkness, with proportions in ninths (1:8, 6:3 and so on). It names no star positions. The zodiac reading rests on the phrase \"in the foot of the bull\". Popovic's 2009 article and his 2011 edition (STDJ) are the main studies. Scholars read it beside Greek physiognomic writing (Teukros).", src: [S("Qumran Horoscopes (4Q186), summary", "https://en.wikipedia.org/wiki/Qumran_%22Horoscopes%22_(4Q186)"), S("Qumran Physiognomies, summary", "https://en.wikipedia.org/wiki/Qumran_Physiognomies"), S("Popovic, Reading the Human Body and Discerning Zodiacal Spirits", "https://orion-bibliography.huji.ac.il/orion_editor/node/89731")] },
      { tag: "OPEN", t: "Decision for the owner: 4Q186 is a Qumran find with a zodiac and Greek physiognomic frame. ACR rules 25 and 30 set the test as the tradition the content carries. The text is not in the Reader. Reject, or hold under warning like ACR2, is the owner's call. Nothing was added." }
    ]
  };
  tx.blocks.splice(tx.blocks.length - 1, 0, tie);

  /* ---------- Claims page: pasted sets 2, 3 and the Uncompromised Architecture paste ---------- */
  var cl = find("claims");
  cl.blocks.push({
    h: "Later pasted sets and the Uncompromised Architecture paste, checked",
    intro: "Each row is a claim from a pasted report. The middle column is what was found.",
    table: {
      head: ["Claim", "What was found", "Tag"],
      rows: [
        ["Squid-ink melanin removes more than 95 to 97 percent of Cd, Cr6+ and Pb", "95 percent for Cd(II) and Pb(II) at 2 mM in one squid melanin powder study (PMC2817865). No Cr(VI) figure for squid ink was seen. 97 percent was not seen.", "VERIFIED"],
        ["Melanin binds metals in one fixed order", "The order differs by melanin type: fungal Cu > Pb >> Cd > Zn; synthetic coatings Pb > Cu > Cd > Zn. No single order holds.", "CONFLICTING"],
        ["Hard and soft acid-base chemistry explains the binding", "Not tested in the studies found.", "UNVERIFIED"],
        ["The binding is irreversible", "No source seen in the searches run.", "UNVERIFIED"],
        ["4Q186 is a Qumran text with nine-part light and dark shares", "4Q186 is a Qumran text. The shares are given in ninths (for example 6 parts light and 3 dark). It names no star positions.", "VERIFIED"],
        ["The quoted lines and the three profiles in the pasted 4Q186 text", "The sources found do not carry a full translation. The pasted lines were not matched to one. The gestation claim was not found.", "UNVERIFIED"],
        ["The pasted 4Q186 text belongs in the ACR record", "Not in the ACR Reader or ACR2. Owner decision pending (see the texts page).", "NOTEXT"],
        ["The solar garment tradition is in the Orit and Kebra Nagast", "Kebra Nagast is dated about 1314 to 1322 CE. Neither it nor the phrase garments of light is in the ACR Reader or ACR2.", "NOTEXT"],
        ["Adamah (volcanic soil) explains the origin of dark skin", "Bereshit 2:7 in the ACR Reader says \"dust of the ground\" and gives no colour words and no volcanic soil.", "NOTEXT"],
        ["Melanin is the only known biological substance that resists radiation", "Deinococcus radiodurans resists radiation through manganese antioxidants (PNAS 2024, DOI 10.1073/pnas.2417389121). The claim of a sole substance is not supported.", "NOTSUPPORTED"],
        ["Artemis I showed 50 percent to 10-fold better survival of melanized organisms", "The NRL experiment flew four Aspergillus niger strains. No results were published in the sources found.", "NOTSUPPORTED"],
        ["Synthetic melanin reaches 318 S/cm", "Annealed synthetic eumelanin, Migliaccio 2019. Copper is about 190,000 times higher.", "VERIFIED"],
        ["Melanin-based material gives huge EMI shielding", "Melanin-like nanofibers, Nature Communications 2025: 47909.9 dB cm2/g (abstract level). Not natural melanin.", "VERIFIED"],
        ["Melanin conducts across a huge range", "10^-13 to 10^-5 S/cm with hydration: 8 orders, not 10.", "VERIFIED"],
        ["Radiation produces current in melanin and it restores itself", "Turick 2011 (Savannah River National Laboratory), Bioelectrochemistry 82:69-73.", "VERIFIED"]
      ]
    }
  });

  /* ---------- Government claim row: refine the 2007 wording ---------- */
  find("claims").blocks.forEach(function (b) {
    if (!b.table) { return; }
    b.table.rows.forEach(function (r) {
      if (r[1] && r[1].indexOf("a fourfold rise in melanin electron transfer in a lab test") >= 0) {
        r[1] = r[1].replace("a fourfold rise in melanin electron transfer in a lab test",
          "a 4-fold higher capacity to reduce NADH and 3-fold more 14C-acetate taken in");
      }
    });
  });

  /* ---------- Start page: how the site is written, and the limit moved to the end ---------- */
  var st = find("start");
  st.blocks.unshift({
    h: "How this site is written",
    items: [
      { tag: "READING", t: "In plain words: Each main finding is followed by a card that starts with In plain words. Hard terms are explained the first time they appear. Limits are listed once, at the end of the page." }
    ]
  });
  var imp = st.blocks.filter(function (b) { return b.h === "Important limit"; })[0];
  if (imp) {
    st.blocks = st.blocks.filter(function (b) { return b !== imp; });
    imp.h = "Limits, in one place";
    st.blocks.push(imp);
  }

  /* ---------- Glossary ---------- */
  [
    ["NADH", "A molecule cells use to carry electrons."],
    ["Redox potential", "How strongly a material gives up or takes electrons."],
    ["S/cm", "Siemens per centimetre. How well a material carries electric current. Bigger carries more."],
    ["Chelation", "A molecule grabs a metal ion and holds it."],
    ["Biosorption", "A living-origin material soaks up a metal from water."],
    ["Secondary radiation", "The extra particles made when radiation hits a material, especially a heavy metal."],
    ["EMI shielding", "Blocking radio and electrical noise. Measured here in dB cm2/g."],
    ["Aerogel", "A very light solid that is mostly air."]
  ].forEach(function (g2) {
    var have = LS.glossary.some(function (x) { return x[0] === g2[0]; });
    if (!have) { LS.glossary.push(g2); }
  });

  /* ---------- Sources ---------- */
  [
    S("Squid melanin Pb(II) and Cd(II) adsorption (PMC2817865)", "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2817865/"),
    S("Pseudomonas stutzeri melanin nanopigment (PMC6092452)", "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6092452/"),
    S("Squid ink sac melanin beads (PMC5824532)", "https://pmc.ncbi.nlm.nih.gov/articles/PMC5824532"),
    S("Turick 2011, Bioelectrochemistry (DOI)", "https://doi.org/10.1016/j.bioelechem.2011.04.009"),
    S("Chen 2025, Nature Communications (DOI)", "https://doi.org/10.1038/s41467-025-62367-9"),
    S("Qumran Horoscopes (4Q186), summary", "https://en.wikipedia.org/wiki/Qumran_%22Horoscopes%22_(4Q186)"),
    S("Qumran Physiognomies, summary", "https://en.wikipedia.org/wiki/Qumran_Physiognomies"),
    S("Popovic, Reading the Human Body (Orion)", "https://orion-bibliography.huji.ac.il/orion_editor/node/89731"),
    S("Deinococcus radiodurans manganese antioxidants (PNAS 2024 DOI)", "https://doi.org/10.1073/pnas.2417389121")
  ].forEach(function (s) {
    var have = LS.sources.some(function (x) { return x.u === s.u; });
    if (!have) { LS.sources.push(s); }
  });

  LS.version = "loadscience-v10";
})();
