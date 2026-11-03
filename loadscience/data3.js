/* Load Science, third data file: ties between the melanin research and the ancient
   texts in the ACR Reader (main record) and ACR2 (held under warning).
   Every quotation below was read from the ACR files on 2026-11-03 and matches the
   ACR wording and ACR verse numbering. No critical edition was used. Nothing here
   is taken from a Rabbinic, Christian or Western commentary layer.
   The Where lines give the ACR volume and the data file that holds the quoted text. */
(function () {
  var LS = window.LS;

  /* Tag set, with the three text tags placed after Reading. */
  var old = LS.tags, tags = {};
  Object.keys(old).forEach(function (k) {
    tags[k] = old[k];
    if (k === "READING") {
      tags.TEXT = "Quoted from the ACR Reader, the main record: DSS, Ge'ez Orit, pre-Rabbinic, pre-Christian. Checked against the file.";
      tags.HELD = "From ACR2. Held under warning. Documented as the later layer, never as the ancient baseline.";
      tags.NOTEXT = "The ACR text was searched and does not say this.";
    }
  });
  LS.tags = tags;

  var R = "ACR Reader, ";
  var texts = {
    id: "texts",
    title: "Ancient texts and the research",
    blurb: "Where the DSS and Ge'ez Orit record in the ACR Reader touches the science. ACR2 held under warning.",
    blocks: [
      {
        h: "How to read this page",
        items: [
          { tag: "OPEN", t: "Two source layers. The ACR Reader is the main record: the Dead Sea Scrolls and the Ge'ez Orit, before the Rabbinic and Christian layers. ACR2 holds later-layer texts under warning. They are documented as how the ancient record was altered. They are never the baseline." },
          { tag: "OPEN", t: "Every quotation was read from the ACR files by tool on 2026-11-03. The wording and the verse numbers are ACR's own, not a critical edition's. A quotation is tagged ACR text. A tie to the science is tagged Reading, because the ancient text does not state it. Where the text was searched and says nothing, it is tagged Not in the text." }
        ]
      },
      {
        h: "The map: research strand to text",
        items: [
          { tag: "READING", t: "UV filter and DNA protection (skin page): Shir HaShirim 1:5-6, Tehillim 121:6, Yesha'yahu 49:10, Chanokh 37.", go: "s/skin", goLabel: "Open the skin page" },
          { tag: "READING", t: "Heritable, polygenic pigmentation (genetics page): Bereshit 10:6-8 and Yirmeyahu 13:23, where ACR's own Orit note uses the word melanin.", go: "s/genes", goLabel: "Open the genetics page" },
          { tag: "READING", t: "The northeast African corridor: the Kush verses and the Beta Israel readings in ACR's Orit notes, set beside the Ethiopian sample in the genetics studies." },
          { tag: "READING", t: "The sun's course and UV (spectrum page): Chanokh 37, the Astronomical Book.", go: "s/spectrum", goLabel: "Open the spectrum page" },
          { tag: "HELD", t: "Colour in the later layer: ACR2 holds a colour-coded animal allegory and two newborn-appearance texts. They are documented here, not used as evidence about the people." }
        ]
      },
      {
        h: "Kush, Mitzrayim, Put and Kena'an",
        items: [
          { tag: "TEXT", t: "Bereshit chapter 10, The Table of Nations, verses 6 to 8: \"And the sons of Cham: Kush, and Mitzrayim, and Put, and Kena'an. And the sons of Kush: Seva, and Chavilah, and Savtah, and Ra'mah, and Savteka; and the sons of Ra'mah: Sheva, and Dedan. And Kush begot Nimrod; he began to be a mighty one on the earth.\"", cite: R + "Volume One, Part One, data/file_1.json" },
          { tag: "TEXT", t: "ACR's note on Bamidbar 12:1 says the term Kushite derives directly from Kush (𐤊𐤅𐤔, \"Kush\"), \"the geographic and ethnic designation for the region south of Egypt (Nubia) attested elsewhere in the Torah (e.g., Bereshit 2:13, 10:6-8).\"", cite: R + "Volume Four, Part One, Bamidbar chapter 12, critical note, data/file_9.json" },
          { tag: "TEXT", t: "Bamidbar 12:1: \"And Miryam and Aharon spoke against Moshe because of the Kushite woman whom he had married; for he had married a Kushite woman.\"", cite: R + "Volume Four, Part One, data/file_9.json" },
          { tag: "OPEN", t: "ACR's own note records an open question it does not resolve: whether the Kushite wife is Tzipporah under a second description, or a different wife. The text states only that Moshe married a Kushite woman." },
          { tag: "READING", t: "Standing ACR rule 16: the primary text comes first, and a reading that makes the Kushite wife an outsider or a boundary crossed is the later overlay. The verse itself says Moshe married a Kushite woman and that Miryam and Aharon spoke against him. It does not call her a foreigner." },
          { tag: "READING", t: "Tie to the genetics page: the pigmentation studies sampled people in Ethiopia, Tanzania and Botswana. Only Ethiopia lies in the northeast African corridor that ACR's notes tie to Kush. The studies do not mention these texts and do not test Hebrew descent." }
        ]
      },
      {
        h: "Skin and the sun in the text",
        items: [
          { tag: "TEXT", t: "Shir HaShirim 1:5-6: \"I am dark, but lovely, O daughters of Yerushalayim, like the tents of Kedar, like the curtains of Shelomoh. Do not gaze at me because I am dark, because the sun has looked upon me. My mother's sons were angry with me. They made me keeper of the vineyards, but my own vineyard I have not kept.\"", cite: R + "Volume Twenty-One, Shir HaShirim chapter 1, data/file_80.json" },
          { tag: "READING", t: "Tie to the skin page: the speaker is dark and calls it lovely, and says the sun has looked upon her. She works outdoors in the vineyards. Settled biology: sun exposure raises melanin, which filters UV and lowers DNA damage (Kaidbey 1979 and the DNA work on the skin page). The verse records the effect, sun and dark skin together. It names no mechanism." },
          { tag: "TEXT", t: "ACR's [DSS] note on Shir HaShirim says Cave 4 holds fragments 4QCant-a and 4QCant-b, \"confirming the canonical text.\"", cite: R + "Volume Twenty-One, data/file_80.json" },
          { tag: "UNVERIFIED", t: "ACR's note does not say that chapter 1, verses 5 and 6 are among the preserved fragments. Whether those verses are physically attested in 4QCant-a or 4QCant-b is not confirmed here." },
          { tag: "UNVERIFIED", t: "Hebrew words built on the root 𐤔𐤇𐤓 (sh-ch-r, \"dark, black\") are the expected wording for dark in these verses. ACR's file for Shir HaShirim shows English only. The Hebrew was not checked against a DSS or Ge'ez witness here." },
          { tag: "TEXT", t: "Iyov 30:30: \"My skin turns black and falls from me, and my bones burn with heat.\"", cite: R + "Volume Twenty, Part Three, Iyov chapter 30, data/file_79.json" },
          { tag: "TEXT", t: "Eikha 4:8: \"Now their face is blacker than soot. They are not recognized in the streets. Their skin has shriveled on their bones. It has become as dry as wood.\" Eikha 5:10: \"Our skin is hot as an oven with the burning heat of famine.\"", cite: R + "Volume Twenty-Three, Eikha chapters 4 and 5, data/file_82.json" },
          { tag: "READING", t: "The same field of words, dark and black, is a beauty in Shir HaShirim and an affliction in Iyov and Eikha. Context decides. Iyov and Eikha pair black skin with burning heat, famine and ruin. Shir HaShirim pairs it with loveliness. The texts do not equate dark skin with suffering." },
          { tag: "TEXT", t: "Tehillim 121:6: \"The sun shall not strike you by day, nor the moon by night.\" Yesha'yahu 49:10: \"They shall not hunger or thirst, neither scorching wind nor sun shall strike them.\"", cite: R + "Volume Eighteen, Part Eight, data/file_72.json; Volume Fourteen, Part Four, data/file_45.json" },
          { tag: "READING", t: "Tie to the UV science: both verses name the sun as a harm to be guarded against. The research measures that harm as UV-induced DNA damage, and the filter melanin provides. The verses name no pigment and no mechanism." }
        ]
      },
      {
        h: "Heritable skin: Yirmeyahu 13:23",
        items: [
          { tag: "TEXT", t: "Yirmeyahu 13:23: \"Can the Kushite change his skin or the leopard his spots? Then also you can do good who are accustomed to do evil.\"", cite: R + "Volume Fifteen, Part Two, data/file_48.json" },
          { tag: "TEXT", t: "ACR's [ORIT GE'EZ] note on this verse: \"is read as the covenant declaration of the depth of corruption: the evil has become so habitual that self-reformation is as impossible as changing one's melanin or a leopard's spots.\"", cite: R + "Volume Fifteen, Part Two, Yirmeyahu chapter 13, [ORIT GE'EZ] note, data/file_48.json" },
          { tag: "NOTEXT", t: "The word melanin appears once in all the ACR Reader and ACR2 data files searched. It is in that note, not in the ancient verse. The verse says skin. The note brings modern vocabulary." },
          { tag: "READING", t: "Tie to the genetics page: the verse treats the Kushite's skin as fixed. Modern genetics describes pigment as highly heritable and polygenic (Martin et al., Cell 2017), set by old alleles that predate modern humans (Crawford et al., Science 2017). The verse's premise, that skin colour is inherited and cannot be changed by effort, matches that finding. The verse is a moral figure of speech, not a genetics claim." },
          { tag: "TEXT", t: "ACR's [DSS] note says 4QJer-a preserves portions of chapter 13 and discusses the loincloth sign-act, verses 1 to 11.", cite: R + "Volume Fifteen, Part Two, data/file_48.json" },
          { tag: "UNVERIFIED", t: "The note does not say verse 23 is among the portions 4QJer-a preserves. Physical attestation of verse 23 in that scroll is not confirmed here." }
        ]
      },
      {
        h: "Kush in the covenant record: the Orit readings",
        items: [
          { tag: "TEXT", t: "Tehillim 68:31: \"Nobles shall come from Egypt — Kush shall hasten to stretch out her hands to Creator.\" ACR's [ORIT GE'EZ] note: \"is of particular significance in the Beta Israel tradition, read as the prophetic declaration that the nations of northeast Africa will worship YHWH.\"", cite: R + "Volume Eighteen, Part Three, data/file_67.json" },
          { tag: "TEXT", t: "Yesha'yahu 18:7: \"At that time tribute will be brought to YHWH of hosts from a people tall and smooth, from a people feared near and far, a nation mighty and conquering, whose land the rivers divide, to Mount Tziyon.\" ACR's [ORIT GE'EZ] note: the Ethiopian and Ge'ez tradition reads it as \"a declaration that the Kushite peoples — associated with the Afro-Asiatic corridor — will bring tribute to YHWH's mountain.\"", cite: R + "Volume Fourteen, Part Two, data/file_43.json" },
          { tag: "TEXT", t: "Tzefanyah 3:10: \"From beyond the rivers of Kush my worshipers, the daughter of my dispersed ones, shall bring my offering.\" Amos 9:7: \"Are you not like the Kushim to me, O people of Yisra'EL? declares YHWH.\"", cite: R + "Volume Seventeen, Part Four, data/file_63.json; Volume Seventeen, Part Two, data/file_61.json" },
          { tag: "TEXT", t: "ACR's [ORIT GE'EZ] note on Yirmeyahu 38 says Eved-Melekh the Kushite is \"a man from the Afro-Asiatic corridor, connected to the same cultural geography as the Hebrew people.\"", cite: R + "Volume Fifteen, Part Five, data/file_51.json" },
          { tag: "READING", t: "Tie to the genetics page: ACR's Orit notes place Kush in the northeast African corridor and read these oracles through the Beta Israel tradition. The pigmentation studies sampled people in Ethiopia. They do not test the Beta Israel or any Hebrew lineage. That link is the reading, not a finding." },
          { tag: "OPEN", t: "An internal difference in ACR's own notes, for the owner's decision. The [DSS] note on Yirmeyahu 38 calls Eved-Melekh \"a foreigner\" and an outsider to the community. The [ORIT GE'EZ] note on the same chapter ties him to the same cultural geography as the Hebrew people. ACR rule 16 treats the foreigner framing as the overlay. Nothing was changed in the Reader." }
        ]
      },
      {
        h: "The sun's course: Chanokh, the Astronomical Book",
        items: [
          { tag: "TEXT", t: "Chanokh chapter 37, The Sun, verse 10: \"And at the commencement of the morning with the rising of the sun through the eastern portals there is heat for thirty days.\" Verse 4 says one window \"at a certain season grows hot\" and \"blow a great heat when the sun goes forth from the portals.\"", cite: R + "Volume Six, Part Two, data/file_14.json (ACR chapter numbering)" },
          { tag: "READING", t: "Tie to the spectrum page: the 364-day solar calendar follows the sun's seasonal course, and so does the UV dose that reaches the skin. UV and latitude are the clines behind the Jablonski and Chaplin model of skin pigmentation. The Astronomical Book describes the sun's heat by month. It is a calendar text." },
          { tag: "NOTEXT", t: "The Astronomical Book, as ACR has it, says nothing about UV, skin or pigment. The tie is the reading above and nothing more." }
        ]
      },
      {
        h: "Newborn appearance: checked, and held",
        items: [
          { tag: "TEXT", t: "Genesis Apocryphon, column 2, verse 1: \"I Lamekh was afraid when I saw him -- for the child did not look like the children of men but was like the children of the holy angels.\"", cite: R + "Volume Forty-Three, 1QapGen, data/file_107.json" },
          { tag: "NOTEXT", t: "ACR's Reader text of column 2 gives no skin, hair or eye colour. No tie to pigmentation is made from the Reader." },
          { tag: "HELD", t: "ACR2, Birth of Noah, 4Q534 fragment 1, verse 1: \"[And when the child was born] his body was white as snow and his face shone like the sun and his eyes were like lamps of fire. When he opened his eyes the whole house was illuminated.\" ACR2's critical note calls it \"an ancient Afro-Asiatic literary convention\" of divine marking, and its [DSS] note says \"This is not a supernatural birth but a child marked from birth for divine purpose.\"", cite: "ACR2, Volume Nine, data/file_9.json (held under warning)" },
          { tag: "HELD", t: "ACR2, Chanokh site chapter 71 (The Birth of Noakh), verse 8: \"the color of his body is whiter than snow and redder than the bloom of a rose, and the hair of his head is whiter than white wool, and his eyes are like the rays of the sun.\" ACR2's [DSS] note names 4QEng (4Q212) for portions of the matching chapter.", cite: "ACR2, Chanokh 91-105 file, data/file_16.json (held under warning)" },
          { tag: "UNVERIFIED", t: "Some modern readers ask whether these descriptions record a pigment-loss condition. ACR's notes read them as a literary convention of divine marking. No source in this app tests the pigment-loss reading, so it is not tied." }
        ]
      },
      {
        h: "Colour symbolism in a held text",
        items: [
          { tag: "HELD", t: "ACR2, the Animal Apocalypse, site chapter 54, verse 1: \"one of those three was white like that bull, and one of them was red as blood, and one black.\" ACR2's critical note maps them: \"Shem the white, Ham the red or brown, and Yefet the black.\"", cite: "ACR2, Chanokh 85-90 file, data/file_15.json (held under warning)" },
          { tag: "HELD", t: "ACR2's forensic record gives the verdict: a text composed inside the events it claims to foresee, \"final composition sits in the Hasmonean crisis, not the pre-Second-Temple world.\" It is held on chronological grounds, not for absence from the Orit. The Ge'ez Orit preserves the chapters.", cite: "ACR2, data/file_15.json (held under warning)" },
          { tag: "READING", t: "The colours are animal symbols in a late allegory. The note puts the black bull with Yefet, not with the sons of Cham whom the main record names as Kush, Mitzrayim, Put and Kena'an in Bereshit 10:6. The held text's colour scheme is not a record of how any people looked, and it does not match the Table of Nations in the main record. It is not used as evidence here." }
        ]
      },
      {
        h: "What the texts do not say",
        items: [
          { tag: "NOTEXT", t: "None of the verses above gives a mechanism for skin colour, names UV, or mentions a pigment molecule. They record observations: dark skin, the sun's look, heat, and that a Kushite cannot change his skin." },
          { tag: "NOTEXT", t: "The ACR texts searched make no claim of supernatural ability from skin colour or from melanin." },
          { tag: "OPEN", t: "Checks still to do: confirm in the DSS and Ge'ez witnesses whether Shir HaShirim 1:5-6 and Yirmeyahu 13:23 are physically attested, and read the Hebrew and Ge'ez wording for dark, black and skin. Those need the manuscript data, not the ACR English files." }
        ]
      }
    ]
  };

  /* Insert after the Start here page. */
  var at = 1;
  LS.sections.forEach(function (s, i) { if (s.id === "start") { at = i + 1; } });
  LS.sections.splice(at, 0, texts);

  /* Pointer cards on the research pages. */
  function addPointer(id, text, label) {
    LS.sections.forEach(function (s) {
      if (s.id === id) {
        s.blocks.push({ h: "Ancient texts", items: [{ tag: "READING", t: text, go: "s/texts", goLabel: label }] });
      }
    });
  }
  addPointer("skin", "The ACR Reader records the sun and dark skin together in Shir HaShirim 1:5-6, and names the sun as a harm in Tehillim 121:6 and Yesha'yahu 49:10.", "Open the ancient texts page");
  addPointer("genes", "Yirmeyahu 13:23 treats a Kushite's skin as fixed, and ACR's own Orit note on it uses the word melanin. Bereshit 10:6 names Kush, Mitzrayim, Put and Kena'an.", "Open the ancient texts page");
  addPointer("spectrum", "Chanokh 37, the Astronomical Book, describes the sun's heat by month inside the 364-day calendar.", "Open the ancient texts page");

  /* Quick fact for the home page. */
  LS.facts.push({ t: "The word melanin appears once in all the ACR data files searched: in ACR's Orit note on Yirmeyahu 13:23, not in the verse.", tag: "TEXT", page: "texts", src: null });

  /* Glossary additions. */
  [
    ["ACR Reader", "The main record in this project: the Dead Sea Scrolls and the Ge'ez Orit, before the Rabbinic and Christian layers."],
    ["ACR2", "The segregated collection of later-layer texts, held under warning as documentation of how the ancient record was altered."],
    ["Dead Sea Scrolls (DSS)", "Manuscripts found at Qumran, caves 1 to 11. They are the oldest primary witnesses to many covenant texts."],
    ["Ge'ez Orit", "The Orit tradition in the Ge'ez language, kept by the Beta Israel and the Ethiopian covenant community. In ACR it stands beside the DSS as a primary source."],
    ["Held under warning", "A text kept for the record but not used as the ancient baseline. It is documented as a later layer."],
    ["Kush", "The land south of Egypt, Nubia, named in Bereshit 10 as a son of Cham."],
    ["Paleo-Hebrew", "The ancient Hebrew script. Quoted Hebrew in this app is shown in it, with the English beside it."]
  ].forEach(function (g) { LS.glossary.push(g); });
  LS.glossary.sort(function (a, b) { return a[0].toLowerCase() < b[0].toLowerCase() ? -1 : 1; });
})();
