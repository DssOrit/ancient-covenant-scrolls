/* Medical emergency how-to guides, based on public and free medical sources (open textbooks, public health pages, public-release manuals).
   Search checks on 20 Oct 2026 saw these sources only through search results. The textbooks themselves were not opened here.
   No drug doses are given except where a source states them and the label says so. Follow the label of any medicine. */
(function () {
  var CD = "20 Oct 2026";
  var BASE = "Steps follow widely taught first-aid advice found in public health pages and free textbooks. We found these only through search results and did not open the textbooks themselves.";
  var NOT_DOC = "This is first-aid information, not medical care. It does not replace a trained person or a doctor. In an emergency, call for help first.";
  function g(o) {
    o.area = "Medical"; o.difficulty = o.difficulty || "Critical"; o.status = o.status || "partly"; o.checkedOn = CD;
    o.unconfirmed = [BASE].concat(o.unconfirmed || []).concat([NOT_DOC]); o.tip = o.tip || []; o.after = o.after || []; o.warn = o.warn || [];
    o.sections = o.sections || []; o.sources = o.sources || []; o.source = (o.sources[0] && o.sources[0][1]) || "https://www.who.int/publications/i/item/9789241513081"; return o;
  }
  var BEC = ["WHO-ICRC Basic Emergency Care (free open-access course and book)", "https://www.who.int/publications/i/item/9789241513081"];
  var OPENWHO = ["OpenWHO: Basic Emergency Care course", "https://openwho.org/courses/bec"];
  var G = [
    g({
      id: "med-library", icon: "book", difficulty: "Practical", title: "Free medical textbooks: what to download now",
      intro: "When doctors and the internet are out of reach, a good free textbook is the next best thing. Download these while you still have a connection, and keep a paper copy of the key pages.",
      first: ["Download the WHO Basic Emergency Care material first.", "Save it to your phone or tablet and to a spare drive.", "Print the pages on bleeding, breathing and shock.", "Keep one printed copy in your kit."],
      do: [
        "WHO and ICRC Basic Emergency Care (BEC). A free open-access course and book for people with limited resources. It teaches how to check an ill or injured person in order: airway, breathing, circulation, disability, exposure (ABCDE), and how to take a history (SAMPLE). It covers trauma, difficulty breathing, shock and confusion. Find it on the WHO site or at OpenWHO. Download the quick cards.",
        "US Army first aid manual FM 4-25.11 (2002). The text says it is approved for public release with unlimited distribution. It has been replaced by the newer manual TC 4-02.1. The 2002 edition is a plain, step-by-step first aid book. Check the current Army Publishing Directorate listing before you share it.",
        "NCBI Bookshelf and StatPearls. The US National Library of Medicine hosts free medical textbooks and StatPearls articles. Search the topic, for example 'anaphylaxis'. These are written for clinicians. Read them with this guide.",
        "MedlinePlus and the Merck Manual. MedlinePlus (US National Library of Medicine) and the Merck Manual consumer version give free plain-language health pages. Save the pages for your family's known conditions.",
        "Hesperian health guides. Hesperian's 'Where There Is No Doctor' is a village health guide. The full book is for sale, in print and PDF. Hesperian's site offers some chapters as free downloads, and says free copying of parts for free distribution is allowed. Check the language page for what is free now."
      ],
      table: { head: ["Source", "Free?", "Best for"], rows: [
        ["WHO-ICRC Basic Emergency Care", "Yes, open-access course", "Checking an ill or injured person"],
        ["US Army FM 4-25.11 (2002)", "Approved for public release", "Step-by-step first aid"],
        ["NCBI Bookshelf and StatPearls", "Yes", "Detail on one condition"],
        ["MedlinePlus, Merck Manual consumer pages", "Yes, online", "Plain-language health pages"],
        ["Hesperian: Where There Is No Doctor", "Some chapters free, full book paid", "Village-level care with few resources"]
      ] } }),
  ];
  G[0].warn = ["Do not download medical files from unknown sites. They may be copies with missing pages or wrong figures. Use the maker's own site.", "A textbook does not replace training. Take a first-aid course and a Stop the Bleed course.", "Check the date of any book. Advice changes."];
  G[0].tip = ["Print the one-page cards and keep them in the first-aid kit.", "Practise the ABCDE check on a family member."];
  G[0].after = ["Check your saved files open without internet.", "Check for new editions once a year."];
  G[0].sources = [BEC, OPENWHO, ["US Army FM 4-25.11 First Aid (2002 PDF)", "https://irp.fas.org/doddir/milmed/first.pdf"], ["NCBI Bookshelf: StatPearls anaphylaxis", "https://www.ncbi.nlm.nih.gov/books/NBK482160/"], ["Hesperian: Where There Is No Doctor", "https://store.hesperian.org/products/where-there-is-no-doctor"], ["Hesperian free downloads (English page)", "https://languages.hesperian.org/pages/en/pdf.html"]];
  G[0].unconfirmed = ["The WHO page lists a free open-access course. We did not find a free direct PDF of the book on an official site.", "The Army manual copy on irp.fas.org carries a public-release notice. We did not check the Army Publishing Directorate. The manual was superseded in 2016 by TC 4-02.1.", "Hesperian: one result says only one chapter is free in some languages. Check what is free for English.", BASE];

  G = G.concat([
    g({
      id: "med-assess", icon: "check", title: "Check a sick or injured person: ABCDE",
      intro: "Check in the same order every time. Fix the most dangerous problem first. This order is taught in the WHO and ICRC Basic Emergency Care course.",
      first: ["Make sure the scene is safe for you.", "Call for help: 112 (Portugal) or 911 (US).", "Check if the person responds. Shake gently and ask loudly.", "Do not move them unless they are in danger.", "Start with airway, then breathing, then circulation."],
      do: [
        "Safety and help. Look for danger: fire, traffic, gas, falling objects. Make it safe, or move away. Send someone to call emergency services. Put on gloves if you have them.",
        "A is for airway. Ask a question. If they answer clearly, the airway is open. If they do not respond, tilt the head back and lift the chin gently, and look in the mouth. Do not tilt the head back if you suspect a neck injury. Use the jaw thrust instead if you are trained.",
        "B is for breathing. Look, listen and feel for 10 seconds. Count breaths. Look for blue lips, struggling to breathe, or noises. If they are not breathing normally, begin CPR. See the CPR guide in this app.",
        "C is for circulation. Look for heavy bleeding and stop it with firm pressure. Check skin: pale, cold, clammy skin and fast pulse may mean shock. Lay them down and keep them warm. See the severe bleeding and shock guides.",
        "D is disability, E is exposure, and history. Check if they are alert, confused or drowsy. Check for pain, weakness or a drooping face. Check blood sugar if you can. Look for other injuries, but keep them covered and warm. Ask about allergies, medicines, past illness and events (SAMPLE). Write down what you find and the time. Hand over to the ambulance team."
      ],
      sections: [{ h: "SAMPLE history: ask this", items: ["Signs and symptoms: what is wrong?", "Allergies: to medicines, food or stings?", "Medicines: what do they take?", "Past history: heart, asthma, diabetes, pregnancy?", "Last meal or drink: when?", "Events: what happened before?"] }],
      warn: ["Do not give food or drink to someone who is drowsy or cannot swallow.", "Do not move someone with a possible neck or back injury unless there is immediate danger.", "Do not leave the person alone if you can avoid it."],
      tip: ["Write times down: when it began, when you called, what you did.", "Speak calmly. Tell the person what you are doing."],
      after: ["Keep checking every few minutes until help arrives.", "Give the notes to the ambulance team."],
      sources: [BEC, OPENWHO, ["US Army FM 4-25.11 First Aid (2002 PDF)", "https://irp.fas.org/doddir/milmed/first.pdf"]],
      unconfirmed: ["The ABCDE and SAMPLE approach is from the WHO-ICRC course summary seen in search results. We did not open the book.", "The 10 second breathing check is common first-aid teaching. We did not match it to a named page."]
    }),
    g({
      id: "med-wounds", icon: "cross", difficulty: "Essential", title: "Wounds: clean, cover and watch for infection",
      intro: "Stop the bleeding first, then clean and cover. Infection is the main danger in the days after, and it is more likely when you have no access to care.",
      first: ["Wash your hands, or put on gloves.", "Press firmly on the wound with a clean cloth to stop bleeding.", "If bleeding is severe, use the Severe bleeding guide.", "Do not touch the wound with dirty hands."],
      do: [
        "Stop the bleeding. Press firmly on the wound with a clean cloth or gauze. Do not lift it to look. If blood soaks through, add more on top. If it keeps bleeding after several minutes of pressure, get emergency care.",
        "Clean the wound. When bleeding has stopped, rinse the wound gently with bottled water or clean running water. Saline is best if you have it. Clean the skin around it with soap and water. Pat dry. Do not scrub inside the wound.",
        "Cover it. Put on a clean dressing or bandage. Leave bites, deep puncture wounds and very dirty wounds open to be seen by a health worker, and cover them loosely. Do not close a dirty wound tightly.",
        "Change the dressing. Change it every day, or when it gets wet or dirty. Wash hands first. Look at the wound each time.",
        "Watch for infection. Look for spreading redness, swelling, warmth, increasing pain, pus, red streaks going up the arm or leg, and fever. On darker skin, redness may be hard to see and streaks may look purple-grey. If you see these signs, get medical help."
      ],
      table: { head: ["Sign", "What it can mean", "Do"], rows: [
        ["Redness, swelling, warmth", "Infection starting", "Clean, cover, watch closely"],
        ["Pus or bad smell", "Infection", "Get medical help"],
        ["Red streaks up the limb", "Infection spreading", "Get help at once"],
        ["Confusion, fast heart rate, fever, clammy skin", "Possible sepsis", "Emergency care now"],
        ["Bite, rusty or dirty puncture, object stuck in", "High risk", "Get medical help, do not pull out the object"]
      ] },
      warn: ["Do not pull out an object stuck in a wound. Pad around it and get help.", "Do not use hydrogen peroxide or alcohol inside the wound. They can harm tissue. This is our reasoning, not a named source.", "Tetanus: a wound that is deep or dirty may need a tetanus shot. Sources differ on the interval (5 or 10 years). Ask a health worker and check your record."],
      tip: ["Keep a few saline vials and dressings in the kit.", "Take a photo each day of the wound to see changes."],
      after: ["Keep the wound clean and dry.", "Get medical review if it is not healing in a few days."],
      sources: [["Florida Health: emergency wound care", "https://www.floridahealth.gov/about/_documents/emergency-information-factsheet-woundcare.pdf"], ["Mayo Clinic: first aid for puncture wounds", "https://www.mayoclinic.org/first-aid/first-aid-puncture-wounds/basics/ART-20056665"], BEC],
      unconfirmed: ["Cleaning, covering, daily dressing changes and the signs of infection match the Florida Health and Mayo Clinic text seen in search results. The pages were not opened directly.", "The tetanus interval differs between sources (5 years in one, at least 10 years protection in another). Ask a clinician.", "The advice about peroxide and alcohol is our reasoning."]
    }),
    g({
      id: "med-dehydration", icon: "drop", title: "Vomiting, diarrhoea and dehydration",
      intro: "Fluid loss is the main danger. Replace it early, with small, frequent sips. Babies, older people and anyone very ill need urgent help.",
      first: ["Give small sips of clean fluid often.", "Use oral rehydration salts (ORS) if you have them.", "Wash hands with soap and water after every toilet use.", "Seek help for a baby, an older person or anyone who cannot drink."],
      do: [
        "Spot dehydration. Dry mouth, little or no urine, dark urine, sunken eyes, dizziness, weakness, fast breathing. In babies: no wet nappies for hours, sunken soft spot, no tears.",
        "Give ORS. Mix commercial ORS sachets exactly as the pack says, with clean, boiled and cooled water. Give a few sips every few minutes. Keep going, even after vomiting. Wait 10 minutes after a vomit, then start again slowly.",
        "Home mix if there is no ORS. Use clean water that has been boiled and cooled. Sources give different amounts. A common home mix is 6 level teaspoons of sugar and half a level teaspoon of salt in 1 litre of water. Measure exactly. Too much salt is harmful. Use commercial ORS as soon as you can.",
        "Keep eating. Continue breast milk or normal feeds for babies. Give simple food when able: rice, bread, bananas. Avoid sugary drinks, which can make diarrhoea worse.",
        "Prevent spread. Wash hands with soap and clean water. Use a separate bucket or toilet for the sick person. Clean surfaces with bleach water. Boil or treat all drinking water. Get help if there is blood in the stool, high fever, severe pain, or no improvement in a day or two."
      ],
      warn: ["Do not give anti-diarrhoea medicine to young children or when there is blood in the stool or high fever, unless a clinician says so. This is our reasoning, not a named source.", "Do not use homemade mixes with more salt than the recipe says.", "A baby who is drowsy, will not drink or has sunken eyes needs urgent medical help."],
      tip: ["Keep ORS sachets in the kit. They are cheap and last long.", "Use a spoon or syringe for small children."],
      after: ["Keep drinking extra fluid for a day or two.", "Restart normal food slowly."],
      sources: [BEC, ["Hesperian free downloads (English page)", "https://languages.hesperian.org/pages/en/pdf.html"], ["PubMed: sugar-salt solutions for diarrhoea at home in African countries", "https://pubmed.ncbi.nlm.nih.gov/2456720/"]],
      unconfirmed: ["Home ORS amounts disagree between sources: 6 or 8 level teaspoons of sugar with half or 1 level teaspoon of salt per litre. We did not confirm WHO's current home recipe. Use commercial ORS when you can.", "The signs of dehydration are common teaching. We did not match them to a named page.", "The advice on anti-diarrhoea medicine is our reasoning."]
    }),
    g({
      id: "med-allergic", icon: "alert", title: "Severe allergic reaction (anaphylaxis)",
      intro: "A severe allergic reaction can close the airway within minutes. If the person has an adrenaline (epinephrine) auto-injector, use it at once and call emergency services.",
      first: ["Call emergency services: 112 or 911.", "Use the person's epinephrine auto-injector at once if they have one.", "Lay them down. Do not stand them up.", "Note the time you gave the injection."],
      do: [
        "Recognise it. Swelling of the lips, face or tongue, hives, trouble breathing, wheeze, throat tightness, dizziness, vomiting or collapse, after a sting, food or medicine. Call for help straight away.",
        "Use the auto-injector. Follow the label on the device. Inject into the outer middle thigh, through clothing if needed. Hold it in place for the time on the label (one school protocol says about 10 seconds). Note the time.",
        "Position the person. Lay them flat. If they struggle to breathe, let them sit up. If they feel faint or are vomiting, lay them on their side. Do not let them stand or walk.",
        "Give a second dose if needed. If there is no improvement, or symptoms worsen, a second dose can be given 5 to 15 minutes after the first, with a new device. Food Allergy Canada says as early as 5 minutes. Always call emergency services, even if the person improves.",
        "Stay and watch. Keep checking breathing. Start CPR if they stop breathing and do not respond. Tell the paramedics the time and number of doses. The person must go to hospital, because symptoms can return."
      ],
      warn: ["Do not wait to see if it gets better. Use the injector early.", "Do not give food or drink.", "An auto-injector is single-use. A second dose needs a new one.", "Do not use another person's injector unless an emergency and you cannot get help. Follow the label."],
      tip: ["Know where the injector is kept. Check its date.", "Keep a copy of the person's allergy plan."],
      after: ["Go to hospital, even if recovered.", "Replace the used injector."],
      sources: [["NCBI Bookshelf: StatPearls anaphylaxis", "https://www.ncbi.nlm.nih.gov/books/NBK482160/"], BEC],
      unconfirmed: ["The outer thigh site and repeat dose after 5 to 15 minutes are from school and clinic protocols and a Food Allergy Canada page seen in search results.", "We did not find official ASCIA or Red Cross wording. Lying flat with legs raised was not confirmed in our search. We say lay flat, or sit up if breathing is hard.", "No dose numbers are given. Follow the label on the device."]
    }),
    g({
      id: "med-breathing", icon: "wind", title: "Asthma attack and difficulty breathing",
      intro: "Sit the person up, give their reliever inhaler, and call for help if it does not improve fast. Struggling to speak is a danger sign.",
      first: ["Sit the person upright. Stay calm.", "Give their reliever inhaler (blue or grey).", "Call emergency services if they do not improve, or if breathing is severe.", "Loosen tight clothes."],
      do: [
        "Sit them upright. Lying flat makes breathing harder. Keep them calm. Stay with them.",
        "Give the reliever. Shake the inhaler. Use a spacer if you have one. Give one puff at a time, with 4 breaths after each puff, up to 4 puffs. Without a spacer, breathe in each puff directly.",
        "Wait and repeat. Wait 4 minutes. If there is no improvement, give 4 more puffs. This 4-puff method comes from Australian first aid pages. Follow the person's own action plan if they have one.",
        "Call for help. Call emergency services if there is no improvement, if they cannot speak in full sentences, if lips or fingertips are blue or grey, or if they are very drowsy or confused. Keep giving puffs every 4 minutes until help comes.",
        "Other causes. Breathing trouble can also come from a heart problem, an allergic reaction, choking or smoke. If there is swelling of the face, use the allergy guide. If choking, use the choking guide. If chest pain, use the heart guide."
      ],
      warn: ["Do not let them lie down.", "Blue or grey lips, very fast or very slow breathing, and drowsiness are emergencies.", "Do not use someone else's medicine unless it is a reliever inhaler and you are following the steps."],
      tip: ["Keep a spare reliever and spacer in the kit.", "Know the person's triggers."],
      after: ["See a doctor after any serious attack.", "Review the asthma plan."],
      sources: [["Better Health Channel: 4 steps of asthma first aid", "https://www.betterhealth.vic.gov.au/sites/default/files/2021-10/4-steps-of-asthma-first-aid-A3.pdf"], BEC],
      unconfirmed: ["The 4 puffs, 4 breaths, 4 minutes method comes from Australian and New Zealand pages. We did not find the US NHLBI wording. Your doctor's action plan comes first.", "The danger signs match the pages seen in search results."]
    }),
    g({
      id: "med-heart-stroke", icon: "heart", title: "Heart attack and stroke: spot them and act",
      intro: "Both are emergencies where minutes count. Call for help first. Do not drive yourself.",
      first: ["Call emergency services now: 112 or 911.", "Keep the person calm and seated or lying down.", "Note the time symptoms began.", "Do not give food or drink."],
      do: [
        "Heart attack signs. Chest pressure or tightness, pain spreading to the arm, back, neck or jaw, shortness of breath, cold sweat, nausea or lightheadedness. Women may have less chest pain and more back or jaw pain, fatigue or dizziness. Call emergency services at once.",
        "Heart attack actions. Sit the person down and keep them calm. Loosen tight clothing. Some health systems advise an adult to chew one 325 mg aspirin, or about 4 low-dose 80 mg tablets, if they are not allergic and have no condition that forbids it. Do this only if the emergency operator or a doctor says so. Be ready to start CPR.",
        "Stroke signs: FAST. Face: ask them to smile, does one side droop? Arm: raise both arms, does one drift down? Speech: is it slurred or strange? Time: call emergency services at once, even if symptoms pass.",
        "Stroke actions. Note when symptoms began. Lay them down with the head slightly raised, or on their side if drowsy. Do not give food, drink or aspirin. Do not leave them alone.",
        "If they collapse and stop breathing. Start CPR and use an AED if there is one. See the CPR guide in this app. Keep going until help arrives or they recover."
      ],
      table: { head: ["Heart attack", "Stroke"], rows: [
        ["Chest pressure, pain to arm, jaw, back", "Face droops on one side"],
        ["Shortness of breath, cold sweat", "One arm weak or drifts down"],
        ["Nausea, lightheaded", "Slurred or strange speech"],
        ["May chew aspirin if told to", "Never give aspirin or food"]
      ] },
      warn: ["Do not drive yourself or the person to hospital if you can call an ambulance.", "Aspirin is not for stroke. It can cause harm if the stroke is caused by bleeding.", "Do not wait to see if it passes."],
      tip: ["Learn CPR. Keep a list of the person's medicines.", "Know where the nearest AED is."],
      after: ["Go to hospital, even if symptoms pass.", "Tell the doctors the time symptoms started."],
      sources: [BEC, ["Merck Manual consumer version (free online)", "https://www.merckmanuals.com/home"]],
      unconfirmed: ["The signs and the FAST test come from hospital and health-system pages seen in search results. We did not open NIH or Merck pages.", "The 325 mg chewed aspirin advice comes from hospital pages. Official guidance was not found in our search. Follow the emergency operator.", "The advice not to give aspirin for stroke is our reasoning from common teaching. Confirm with a clinician."]
    }),
    g({
      id: "med-head-spine", icon: "alert", title: "Head, neck and back injury",
      intro: "A head injury can look minor and become serious. Suspect a neck or back injury after a fall, a crash or a blow to the head. Keep the person still.",
      first: ["Call emergency services.", "Keep the person still. Do not move the head or neck.", "Ask them to stay still and not nod or shake the head.", "Watch breathing and responses."],
      do: [
        "Keep them still. Tell the person not to move. Hold the head and neck in line with the body with your hands, or place rolled towels on both sides of the head. Do not move them unless there is immediate danger, such as fire.",
        "Check airway and breathing. If they are not breathing, you may have to start CPR, which takes priority over a possible spine injury. If you are trained, use the jaw thrust to open the airway.",
        "Control bleeding. Press gently around the wound with a clean cloth. Do not press on a skull deformity. Do not pull out objects. Clear fluid from the nose or ears is a danger sign.",
        "Watch for danger signs. Loss of consciousness, drowsiness, confusion, repeated vomiting, severe headache, seizure, weakness or numbness, unequal pupils, clear fluid from the nose or ears. Any of these means emergency care at once.",
        "If it seems minor. A person who is alert after a bump needs to rest and to be watched for 24 hours. Wake them as advised by a doctor if they are sleepy. Seek medical care if they get worse. Always have a head injury checked by a doctor or hospital."
      ],
      warn: ["Do not move a person with a suspected neck or back injury unless there is immediate danger.", "Do not remove a helmet unless you are trained, or it blocks breathing.", "Seeing little blood does not mean the injury is minor."],
      tip: ["After a fall from height or a car crash, always suspect a spine injury.", "Note when it happened and how the person behaved."],
      after: ["Rest and avoid sport for as long as a doctor says.", "Watch for new symptoms for several days."],
      sources: [["Better Health Channel: head and spinal injuries first aid", "https://betterhealth.vic.gov.au/health/conditionsandtreatments/head-and-spinal-injuries-first-aid"], BEC],
      unconfirmed: ["The danger signs and the keep-still advice match the Australian and UK pages seen in search results.", "Helmet removal and the jaw thrust need training. We did not match them to a named page.", "The 24 hour watch period is common teaching. We did not match it to a named page."]
    }),
    g({
      id: "med-poison", icon: "flask", title: "Poisoning and overdose",
      intro: "Call a poison centre or emergency services at once. Do not make the person vomit. Keep the container so responders know what was taken.",
      first: ["Call emergency services if the person is drowsy, fitting, or not breathing.", "Call the poison centre if they are awake.", "Do not make them vomit.", "Keep the container or pack."],
      do: [
        "Get them out of danger. Move them away from fumes or the source. Open windows. Do not breathe fumes yourself. Take off contaminated clothing, and rinse skin with plenty of clean water.",
        "Call for advice. In the US call Poison Help at 1-800-222-1222. In Portugal call the Centro de Informação Antivenenos (CIAV) on 800 250 250, free, 24 hours. Call 112 or 911 if they are unconscious, fitting or not breathing. Say what, how much, and when.",
        "Keep the evidence. Keep the container, the label, the pills or the plant. Take them with the person.",
        "Do what they tell you. Do not give anything by mouth unless told to. If they are unconscious and breathing, lay them on their side. If they are not breathing, begin CPR.",
        "Special cases. Carbon monoxide: get to fresh air and call for help. Chemicals in the eye: rinse with clean water for at least 15 minutes (our reasoning). Swallowed button batteries or magnets: this is an emergency, go straight to hospital."
      ],
      warn: ["Do not make a person vomit. This can cause harm.", "Do not give milk or food unless told.", "Do not wait for symptoms. Some poisons act late."],
      tip: ["Save the poison centre number in your phone and on paper.", "Keep medicines and chemicals out of reach of children."],
      after: ["Medical review is needed, even if the person feels fine.", "Store and label chemicals safely."],
      sources: [["Portugal: Centro de Informação Antivenenos (CIAV) number, reported by news sites", "https://www.rtp.pt/noticias/pais/centro-de-informacao-antivenenos-realizou-cerca-de-70-consultas-diarias-em-2022_n1468383"], BEC],
      unconfirmed: ["CIAV 800 250 250 is confirmed by several news pages seen in search results. The official INEM page was not opened.", "The US Poison Help number 1-800-222-1222 is well known. We did not find it in our search results.", "The SNS 24 number 808 24 24 24 was not confirmed and is not given here.", "The 15 minute eye rinse is our reasoning from common teaching.", "The advice not to make a person vomit is common first-aid teaching. We did not match it to a named page."]
    }),
    g({
      id: "med-low-sugar", icon: "can", title: "Diabetes: low blood sugar",
      intro: "A person with diabetes who is shaky, sweaty and confused may have low blood sugar. If they can swallow, give fast sugar. If they cannot, call for help.",
      first: ["Check the person is awake and can swallow.", "Give fast sugar if they can swallow.", "Call emergency services if they are unconscious, fitting, or cannot swallow.", "Do not give food or drink by mouth to an unconscious person."],
      do: [
        "Recognise it. Shaking, sweating, hunger, headache, confusion, irritability, blurred vision, fast heartbeat. A blood glucose below 70 mg/dL (3.9 mmol/L) is low.",
        "Give 15 g of fast carbohydrate. Glucose tablets or gel as the pack says, or 4 ounces (120 ml) of juice or regular soda, or 1 tablespoon of sugar or honey, or hard candies. Use real sugar, not diet drinks.",
        "Wait 15 minutes and recheck. If you can, test blood sugar again after 15 minutes. If it is still low, or they still feel unwell, give another 15 g. Repeat while they are awake.",
        "Eat a snack. When they feel better, give a snack or meal with starch and protein, to keep the sugar up.",
        "Severe low sugar. If they are unconscious, fitting or cannot swallow: do not put anything in their mouth. Lay them on their side. Call emergency services. If they have glucagon, follow the label on the pack."
      ],
      warn: ["Do not give food or drink to a person who cannot swallow.", "Do not give insulin to a person who is low.", "If you cannot test blood sugar and the person has diabetes and is confused, treat as low. Sugar is safer than waiting."],
      tip: ["People with diabetes should keep glucose tablets in every bag and in the car.", "Keep insulin cool but not frozen. Plan for power outages."],
      after: ["Tell the person's doctor about any severe low.", "Review the plan for meals and medicine."],
      sources: [["American Diabetes Association: treatment for low blood glucose", "https://professionaleducation.diabetes.org/AssetListing/Insulin-Management-and-Strategies-20624/Treatment-for-Low-Blood-Glucose-40762"], BEC],
      unconfirmed: ["The 15 g, wait 15 minutes, recheck rule is attributed to the American Diabetes Association by several pages seen in search results. The ADA page was not opened.", "We did not find glucagon dosing. Follow the pack.", "Treating a confused diabetic as low when you cannot test is common teaching and our reasoning, not from a named page."]
    }),
    g({
      id: "med-seizure", icon: "alert", title: "Seizure: how to help",
      intro: "Most seizures stop by themselves. Stay with the person, keep them safe and time it. Do not hold them down or put anything in their mouth.",
      first: ["Stay with the person. Stay calm.", "Note the time it started.", "Move hard or sharp things away. Cushion the head.", "Do not hold them down or put anything in the mouth."],
      do: [
        "Stay and time it. Look at a clock. Stay with the person. Check for a medical ID.",
        "Make it safe. Move furniture and sharp objects away. Put something soft under the head. Loosen anything tight at the neck. Take off glasses.",
        "Do not restrain. Do not hold them down. Do not put anything in their mouth. People cannot swallow their tongue.",
        "Roll them on their side. When the jerking stops, or if they are not awake and aware, roll them onto their side. This keeps the airway clear.",
        "Call for help in these cases: the seizure lasts longer than 5 minutes, it is the first one, they have trouble breathing, it happens in water, they are injured, pregnant or ill, there are repeat seizures, or they do not return to their usual state. Stay until they are fully awake. Speak calmly."
      ],
      warn: ["Do not give food or drink until they are fully awake.", "Do not leave the person alone.", "Do not give medicine unless prescribed for the person and the label says so."],
      tip: ["Learn the 'stay, safe, side' steps.", "A person with epilepsy may carry a plan. Follow it."],
      after: ["Let them rest. They may be confused or tired.", "A first seizure needs medical review."],
      sources: [["CDC: first aid for seizures", "https://www.cdc.gov/epilepsy/first-aid-for-seizures/index.html"], BEC],
      unconfirmed: ["The steps and the 5 minute rule come from Epilepsy Foundation material that the CDC funds, seen in search results. The CDC page itself showed only a training link in our search."]
    })
  ]);
  window.LOAD_MEDICAL = G;
  if (window.LOAD_CORE) { window.LOAD_CORE.guides = window.LOAD_CORE.guides.concat(G); }
})();
