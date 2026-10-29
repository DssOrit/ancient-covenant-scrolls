/* Basic metal repair and forging safety, from a research round on 24 Oct 2026. Search results only; pages were not opened.
   Sources are a blacksmith association safety policy and hobbyist forums. No OSHA or NIOSH page was found. No weapon making is covered. */
(function () {
  var CD = "24 Oct 2026";
  function g(o) {
    o.difficulty = o.difficulty || "Practical"; o.status = o.status || "general"; o.checkedOn = CD;
    o.tip = o.tip || []; o.after = o.after || []; o.warn = o.warn || []; o.sections = o.sections || []; o.sources = o.sources || [];
    o.source = (o.sources[0] && o.sources[0][1]) || "https://abana.org/"; return o;
  }
  var G = [
    g({
      id: "wf-metal-repair", area: "Home skills", icon: "toolbox", title: "Basic metal repair and forge safety: bend, straighten, fix (no weapons)",
      intro: "Metal repair can mend a tent stake, pot hook or tool when no shop is open. Heating metal is dangerous. This guide is mainly about doing it safely. It does not cover making weapons.",
      first: [
        "Wear eye protection every time, and everyone watching wears it too.",
        "This is not an emergency priority. A purpose-built forge, with an instructor, is the safe way to learn.",
        "Work outdoors, away from doors, windows and dry material. Keep water or an extinguisher beside you.",
        "Never heat shiny or galvanized metal. The zinc coating gives off toxic fumes.",
        "Ask first: can you fix it cold, without heat?"
      ],
      do: [
        "Decide if you need heat at all. Many repairs need only cold work: bending a bent stake straight, flattening a dented lid, or bending a wire hook. Cold work is much safer than heat. Use gloves and a solid surface.",
        "Set up a safe place. Choose bare, level ground outdoors, away from dry grass, buildings, fuel and trees. Keep a bucket of water, a shovel and a fire extinguisher or sand near. Check the fire danger and rules first. In Portugal, fires are banned on very high or maximum danger days.",
        "Protect your body. Wear eye protection, which ordinary prescription glasses do not replace, plus leather gloves, long cotton or wool clothes and closed boots. Do not wear synthetic clothing that melts. Tie back hair.",
        "Check the metal before heating. Use plain, bare mild steel. If it sits outside and is shiny, do not heat it. Many tent stakes are galvanized. Heating zinc-coated steel releases toxic fumes. Remove the coating with a file, or use another metal. If you are not sure what it is, do not heat it.",
        "Heat and work with care. A forge is a hot fire and needs air. Use it outdoors only, never in a tent, shed, cabin, vehicle or garage, because fire gives off carbon monoxide, which is odourless. Outdoor placement alone may not control exposure in every layout. A carbon monoxide monitor and good exhaust are advised. Never put damp rocks or sealed containers in a hot forge, because trapped moisture can burst. Keep your head out of the smoke. Keep tools and tongs dry. Do not hit wet metal or wet tools, which can spit.",
        "Shape and test. Bend or straighten in small steps. Let the metal cool slowly. Test by bending by hand and pulling. Do not use a repaired piece for anything that bears a heavy load, a person, or pressure.",
        "Put out the fire and make the site safe. Pour water on the coals, stir and repeat until cold. Remember hot metal can look cool. Leave it on safe ground to cool, away from people and animals.",
        "Know when to stop. If you cannot fix it safely, do not heat it. Use a spare, a rock, a knot or a different design. Do not make blades or weapons."
      ],
      table: { head: ["Rule", "Why"], rows: [
        ["Eye protection always", "Flying sparks and chips. Prescription glasses are not enough."],
        ["Outdoors, never enclosed", "Carbon monoxide is odourless and builds up."],
        ["No shiny or galvanized metal", "Zinc fumes are toxic."],
        ["Water and an extinguisher near", "Hot metal and sparks start fires."],
        ["Cold work first", "Safer than heat."]
      ] },
      warn: [
        "Carbon monoxide from a forge can kill. Do not forge indoors, in a tent or in a shed.",
        "Heating galvanized metal makes toxic fumes. Do not heat it.",
        "Hot metal can look cool. Treat all metal near a fire as hot. Mark and keep hot pieces apart.",
        "Never put damp rocks or sealed containers in a hot forge. They can explode.",
        "Never read an industrial OSHA rule as approving a homemade forge.",
        "Do not use repaired metal for loads that can injure."
      ],
      tip: ["Learn from a local blacksmith or a class.", "Keep spare stakes and a small file in your kit."],
      after: ["Check the fire is cold.", "Clean and dry tools."],
      sources: [
        ["ABANA (blacksmiths' association): safety policy", "https://abana.org/wp-content/uploads/2025/08/ABANA-Safety-Policy-1.pdf"],
        ["iForgeIron: gas forge safety (forum)", "https://www.iforgeiron.com/topic/45146-gas-forge-safety/"],
        ["Newslj: common blacksmithing safety risks", "https://newslj.com/content/common-blacksmithing-safety-risks-and-how-stay-safe"],
        ["iFixit: basics for blacksmithing", "https://www.ifixit.com/Topic/Blacksmithing"],
        ["OSHA 29 CFR 1910.218: forging machines (industrial standard)", "https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.218"],
        ["NIOSH HHE report 91-090-2175: blacksmith forge, Fort Myer (mirror copy)", "https://corpora.tika.apache.org/base/docs/govdocs1/942/942268.pdf"]
      ],
      unconfirmed: [
        "The eye protection point (prescription glasses are not safety glasses) is from the ABANA safety policy as seen in search results. The page was not opened.",
        "Carbon monoxide, galvanized zinc fumes, keeping a fire extinguisher or water beside you, and 'do not heat shiny outdoor metal' come from hobbyist forums and a blog. We found no OSHA or NIOSH page for forges, so these are general guidance.",
        "Precise sources, as given to us and partly checked: OSHA 29 CFR 1910.218, Forging Machines, is an industrial standard on guarding, maintenance, tongs and flying scale. We saw its structure in search results but not the text. NIOSH Health Hazard Evaluation 91-090-2175 (Fort Myer, Virginia, 1992) concerns a blacksmith forge, smoke reaching a tack room and forge flue repairs; it also noted welding hazards. We confirmed that report. A second NIOSH report given to us, HHE 80-101-9001, was not found. These show particular hazards. They do not approve a homemade forge design or prove any improvised setup is safe.",
        "The user-supplied field manual (AI-written, not independently verified) says forging is not an emergency priority, recommends a supervised, purpose-built forge with mechanical exhaust and carbon monoxide monitoring, and warns against heating galvanized, painted, plated or unknown scrap. It also lists tarp, strap and container repairs that need no heat.",
        "We found no checked method for forging a tent stake or a pot hook. The steps here are safety rules and the idea of cold work first. Learn forging from a qualified person.",
        "We found no Portugal-specific rules on forges or metal work. Fire rules apply: check IPMA danger and local bans.",
        "Rules, seasons and conditions change by US state and in Portugal by region and year. Ask the local authority."
      ]
    })
  ];
  window.LOAD_WILDFOOD4 = G;
  if (window.LOAD_CORE) { window.LOAD_CORE.guides = window.LOAD_CORE.guides.concat(G); }
})();
