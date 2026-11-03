/* Load Science, eighth data file: plain-words cards for the remaining pages (brain, genes,
   scientists, spectrum, electronics, discoveries) and limits gathered at the end of the
   scientists and discoveries pages. Same method as data6.js: each card explains the finding
   just above it in short sentences, tagged Reading, and adds no new claim. Loaded after
   data7.js. */
(function () {
  var LS = window.LS;
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
  function plainAfter(secId, prefix, text) {
    var f = findItem(find(secId), prefix);
    if (!f) { return; }
    f.block.items.splice(f.index + 1, 0, { tag: "READING", t: "In plain words: " + text });
  }
  function limitsToEnd(secId, prefixes, heading) {
    var sec = find(secId), moved = [];
    prefixes.forEach(function (p) {
      var f = findItem(sec, p);
      if (f) { f.block.items.splice(f.index, 1); moved.push(f.item); }
    });
    sec.blocks = sec.blocks.filter(function (b) { return (b.items && b.items.length) || b.table || b.spectrum || b.chart; });
    if (moved.length) { sec.blocks.push({ h: heading || "Limits of this page, in one place", items: moved }); }
  }

  /* Brain */
  plainAfter("brain", "It stops dopamine from turning into toxic quinones.",
    "Neuromelanin is the dark pigment in a small brain area that makes dopamine. It grabs iron, which could otherwise make harmful molecules, and it stops dopamine from turning into toxic chemicals. In Parkinson's disease the pigment breaks down, and that may let the iron out. Whether the breakdown is a cause or a result is open.");

  /* Genes */
  plainAfter("genes", "Both light and dark alleles are old African variants.",
    "A large study looked at the genes behind skin colour in people from Ethiopia, Tanzania and Botswana. Most of the gene versions it found are very old, about 300,000 to 1 million years, which is older than modern humans. Both the dark and the light versions are old African variants, so skin colour in Africa is not one uniform thing.");
  plainAfter("genes", "Popejoy and Fullerton, Nature 2016",
    "Most people in big gene studies have been of European descent: 81 out of 100 in 2016, down from 96 out of 100 in 2009. Tools built on those samples describe African genetics least well, even though Penn's release states Africa holds more genetic diversity than anywhere else.");

  /* Scientists */
  plainAfter("scientists", "Cobb, JNCI 1956",
    "In 1956 Cobb X-rayed slices of melanoma tissue, with pigment and without, and then tracked how they grew in mice. Her result is read as an early sign that pigment protects tissue from X-rays.");
  plainAfter("scientists", "McGinness, Corry and Proctor, Science 1974",
    "In 1972 to 1974 these scientists reported that melanin can switch like an electronic part. These were the first reports of melanin electronics.");
  limitsToEnd("scientists", [
    "The 1956 paper was not read.",
    "The abstracts were not seen.",
    "Grimes's vitiligo work was not described"
  ], "Limits of this page, in one place");

  /* Spectrum */
  plainAfter("spectrum", "Eumelanin absorbs broadly across UV, visible and near-infrared.",
    "Melanin takes in light across UV, visible and near-infrared, with no sharp peaks. The curve is smooth and rises toward higher-energy light. That broad, smooth absorption is why melanin can act across so much of the spectrum.");
  plainAfter("spectrum", "Eumelanin has two kinds of stable radical",
    "A radical is a molecule with an unpaired electron. Melanin carries stable ones. Some are built into its structure. Others form when water is present, and these (semiquinone) matter for carrying charge.");

  /* Electronics */
  plainAfter("electronics", "Mostert et al. PNAS 2012",
    "Melanin carries current in two ways at once: electrons, and charged particles called ions, mostly protons. How much current it carries depends on how much water it holds.");
  plainAfter("electronics", "Sheliakina, Mostert, Meredith.",
    "A transistor is a switch. This one is made from melanin. It turns signals carried by ions, as in living tissue, into electronic signals.");

  /* Discoveries */
  plainAfter("discoveries", "Toxigenic ablation of the intermediate cells in mice",
    "Pigment cells in the inner ear help make the electrical charge the ear needs to hear. In mice, removing those cells, or having fewer of them, took that charge away.");
  plainAfter("discoveries", "Powe et al. NEJM 369:1991-2000 (2013).",
    "Black participants had lower total vitamin D and about half as much of the blood protein that carries it. Estimated free vitamin D was close to the same: 2.9 against 3.1 ng/mL.");
  plainAfter("discoveries", "Zhang et al. Nature, 27 January 2010",
    "Tiny pigment packs called melanosomes were found in fossil feathers from Cretaceous China. They are used to work out feather colour. The colour call from one sample is debated. The melanosomes are not.");
  plainAfter("discoveries", "Stappers et al. Nature 555:382-386 (2018)",
    "The body has a sensor, MelLec, that spots fungal melanin on the spores of one common mould. Mice without it were less protected against the infection spreading. The sensor did not detect melanin made by the other route.");
  plainAfter("discoveries", "Kim, Wu, Chun, Whitacre, Bettinger.",
    "Melanin from cuttlefish worked as the negative end of a small sodium battery and stored 30.4 mAh/g. The aim is batteries that break down in the body for temporary medical devices.");
  limitsToEnd("discoveries", [
    "The study was observational.",
    "All of this is mouse work."
  ], "Limits of this page, in one place");

  LS.version = "loadscience-v15";
})();
