/* Extra needs: pregnancy and seniors in an emergency. 17 guides.
   Written 29 Oct 2026 from search results. The official pages could not be opened from where this was written, so every guide is Partly checked
   and the Not confirmed list says what was and was not found. This is not medical advice. Call the local emergency number for an emergency. */
(function () {
  var NOTE = 'We read search results about these pages. We could not open the pages themselves, so they are cited to us, not checked by us.';
  var NOTMED = 'This guide is general information. It is not medical advice and does not replace your doctor, midwife or emergency services.';
  var SRC = {
    hearher: ['CDC: Urgent Maternal Warning Signs and Symptoms (Hear Her), cited to us, not checked', 'https://www.cdc.gov/hearher/maternal-warning-signs/index.html'],
    mod: ['March of Dimes: know when to seek medical care during pregnancy and after giving birth, cited to us, not checked', 'https://www.marchofdimes.org/find-support/blog/know-when-to-seek-medical-care-during-pregnancy-and-after-giving-birth'],
    mayoBleed: ['Mayo Clinic: bleeding during pregnancy, when to see a doctor, cited to us, not checked', 'https://www.mayoclinic.org/symptoms/bleeding-during-pregnancy/basics/when-to-see-doctor/sym-20050636'],
    acogEctopic: ['ACOG: ectopic pregnancy, cited to us, not checked', 'https://www.acog.org/womens-health/faqs/ectopic-pregnancy'],
    nhsPre: ['NHS: pre-eclampsia symptoms, cited to us, not checked', 'https://www.nhs.uk/conditions/pre-eclampsia/symptoms/'],
    acogPre: ['ACOG: preeclampsia and high blood pressure during pregnancy, cited to us, not checked', 'https://www.acog.org/womens-health/faqs/preeclampsia-and-high-blood-pressure-during-pregnancy'],
    rfm: ['NHS England North West: reduced fetal movement guideline (2019), cited to us, not checked', 'https://www.england.nhs.uk/north-west/wp-content/uploads/sites/48/2019/09/Reduced-Fetal-Movement-Guidelines.pdf'],
    acogPreterm: ['ACOG: preterm labor and birth, cited to us, not checked', 'https://www.acog.org/womens-health/faqs/preterm-labor-and-birth'],
    mayoLabor: ['Mayo Clinic: signs of labor, cited to us, not checked', 'https://www.mayoclinic.org/healthy-lifestyle/labor-and-delivery/in-depth/signs-of-labor/art-20046184'],
    nhsVit: ['NHS: pregnancy vitamins and supplements, cited to us, not checked', 'https://www.nhs.uk/pregnancy/keeping-well/pregnancy-vitamins-and-supplements/'],
    cdcWater: ['CDC: drinking water advisories, cited to us, not checked', 'https://www.cdc.gov/water-emergency/about/drinking-water-advisories-an-overview.html'],
    cdcInfant: ['CDC: infant feeding in emergencies, special considerations, cited to us, not checked', 'https://www.cdc.gov/infant-feeding-emergencies-toolkit/php/special-considerations.html'],
    cdcPregDisaster: ['CDC (archived): safety messages for pregnant, postpartum and breastfeeding women in disasters, cited to us, not checked', 'https://archive.cdc.gov/www_cdc_gov/reproductive-health/emergency-preparation-response/safety-messages.html'],
    cdcHeatPreg: ['CDC: five steps for heat and pregnancy (PDF), cited to us, not checked', 'https://cdc.gov/heat-health/media/pdfs/2025/09/Five-steps-for-heat-and-pregnancy-H.pdf'],
    cdph: ['California Department of Public Health: safe pregnancies in extreme heat, cited to us, not checked', 'https://www.cdph.ca.gov/Programs/CFH/DMCAH/Pages/Health-Topics/Safe-Pregnancies-in-Extreme-Heat.aspx'],
    txChildrens: ['Texas Childrens: disaster preparedness during pregnancy and postpartum, cited to us, not checked', 'https://www.texaschildrens.org/content/disaster-preparedness-during-pregnancy-and-postpartum'],
    snsGravida: ['DN: pregnant women are asked to call SNS 24 before obstetric emergency rooms (news report, 2026), cited to us, not checked', 'https://www.dn.pt/sociedade/gravidas-de-lisboa-e-vale-do-tejo-passam-a-ter-de-ligar-para-o-sns24-antes-de-ir-as-urgencias'],
    readyOlder: ['Ready.gov: disaster preparedness guide for older adults (PDF), cited to us, not checked', 'https://www.ready.gov/sites/default/files/2023-09/ready-gov_disaster-preparedness-guide-for-older-adults.pdf'],
    hud: ['HUD: older adult emergency preparedness checklist (PDF), cited to us, not checked', 'https://www.hud.gov/sites/dfiles/HH/documents/HUD_OLHCHH_Older_Adult-Emergency_Preparedness_Checklist.pdf'],
    cdcOlder: ['CDC: emergency preparedness concerns for older adults (PDF), cited to us, not checked', 'https://tools.cdc.gov/podcasts/media/pdf/HealthyAgingDisasterPrep.pdf'],
    redCrossOlder: ['American Red Cross: closing the gaps for older adults in disasters (white paper, 2020), cited to us, not checked', 'https://www.redcross.org/content/dam/redcross/training-services/scientific-advisory-council/253901-03%20BRCR-Older%20Adults%20Whitepaper%20FINAL%201.23.2020.pdf'],
    cdcCog: ['CDC: emergency preparedness for people with cognitive impairment (brief), cited to us, not checked', 'https://www.cdc.gov/aging-programs/media/pdfs/2024/06/emer-prep-cognitive-impairment-brief-july-2015.pdf'],
    pmcWeather: ['PubMed Central: actions to reduce risk of older adults during extreme weather events, cited to us, not checked', 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6846451/'],
    nhsHypo: ['NHS: hypothermia, cited to us, not checked', 'https://www.nhs.uk/conditions/hypothermia/'],
    dgsCold: ['Observador: DGS recommends measures to prevent the effects of cold (news report, 2021), cited to us, not checked', 'https://observador.pt/2021/01/06/dgs-recomenda-medidas-para-prevenir-efeitos-do-frio-e-admite-repercussoes-na-mortalidade/'],
    dgsHeat: ['RTP: DGS warns of extra care in the coming hot days (news report), cited to us, not checked', 'https://www.rtp.pt/noticias/pais/dgs-alerta-para-necessidade-de-cuidados-extra-nos-proximos-dias-de-calor_n1665186']
  };
  var NUM = 'Emergency: 911 (US), 112 (Portugal), 999 (UK).';

  var G = [];
  function add(g) { g.checkedOn = '29 Oct 2026'; g.status = 'partly'; g.difficulty = g.difficulty || 'Essential'; g.source = g.sources[0][1]; G.push(g); }

  /* ---------- PREGNANCY ---------- */
  add({ id: 'preg-early', area: 'Pregnancy', icon: 'heart',
    title: 'Early pregnancy: what to do and when to call',
    intro: 'This covers the first weeks of pregnancy, at home or in an emergency. ' + NOTMED,
    first: [
      'If you might be pregnant, tell a doctor or midwife early. Keep their phone number with you.',
      'Take folic acid 400 micrograms a day until week 12. The NHS says to start before pregnancy or as soon as you find out.',
      'Call at once for heavy bleeding, bleeding with pain or dizziness, or one-sided belly pain with shoulder pain.',
      'Keep your pregnancy papers and medicines in your go-bag.'
    ],
    do: [
      'Tell your doctor or midwife about every medicine you take. Do not stop a prescribed medicine without asking.',
      'Take vitamin D 10 micrograms a day if your doctor or midwife agrees. The NHS gives this advice, mainly for October to March.',
      'Do not take vitamin A (retinol) supplements or cod liver oil. Ask a pharmacist before any new medicine or herbal product.',
      'For pain or fever, paracetamol at the lowest dose for the shortest time is the usual first choice in the NHS advice. Sources differ on ibuprofen. Ask a pharmacist or doctor first.',
      'Eat small regular meals. Drink water often. Rest when you can.',
      'Avoid unpasteurized cheese and undercooked meat. These can carry germs that are a risk in pregnancy.',
      'If you cannot keep fluids down because of vomiting, call your doctor or midwife. Do not wait.',
      'Write down the date of your last period and your due date if you know it. Keep it with your papers.'
    ],
    warn: [
      'Heavy bleeding, or bleeding with belly pain, cramps, dizziness or fainting: go to the emergency room or call the emergency number.',
      'Sharp pain on one side of the belly, with pain at the tip of the shoulder, dizziness or looking very pale: this can be an ectopic pregnancy. Call the emergency number now.',
      'Fever of 100.4 F (38 C) or higher, especially with severe belly or back pain: call at once.',
      'Light spotting that stops within a day: tell your doctor or midwife. Bleeding that lasts longer than a day: contact them within 24 hours.'
    ],
    tip: ['Put your due date, blood type if you know it, and doctor number on a card in your wallet.', 'Pack prenatal vitamins in the go-bag.'],
    after: ['Write down any symptoms and when they started. Take the notes to your next visit.', 'Ask your doctor or midwife what to do in a disaster and who to call.'],
    sources: [SRC.nhsVit, SRC.mayoBleed, SRC.acogEctopic, SRC.mod, SRC.txChildrens],
    unconfirmed: [NOTE,
      'Folic acid 400 micrograms for the first 12 weeks and vitamin D 10 micrograms come from NHS pages quoted to us. A higher dose of folic acid is prescribed for some groups. Ask your doctor.',
      'Paracetamol as the usual first choice matches NHS advice quoted to us. The ibuprofen advice differs between the sources we read, so this guide says to ask.',
      'We did not find a source for the tips about wallet cards or the go-bag.',
      'Avoiding unpasteurized cheese and undercooked meat was given as a CDC point in a search summary. We did not open the page.'] });

  add({ id: 'preg-warning-signs', area: 'Pregnancy', icon: 'alert',
    title: 'Urgent warning signs at any time in pregnancy and after birth',
    intro: 'These signs mean get medical help right away. They apply during pregnancy and for a year after the birth. ' + NOTMED,
    first: [
      'If you have any sign on this page, call your doctor or midwife now. If you cannot reach them, go to the emergency room.',
      'Tell the staff that you are pregnant, or were pregnant in the past year.',
      'For fainting, chest pain, trouble breathing, a seizure or bleeding you cannot control: call the emergency number.',
      NUM
    ],
    do: [
      'Headache that will not go away, gets worse, or comes on suddenly and severely.',
      'Dizziness or fainting.',
      'Changes in your sight, such as blurring or flashing lights.',
      'Fever of 100.4 F (38 C) or higher.',
      'Extreme swelling of the hands or face.',
      'Trouble breathing, chest pain, or a racing heartbeat.',
      'Severe nausea and vomiting that is not like normal morning sickness.',
      'Severe belly pain that does not go away.',
      'Baby moving less, or stopping.',
      'Vaginal bleeding, or fluid leaking, during pregnancy.',
      'After birth: soaking one or more pads in an hour, or a bad smell from the discharge.',
      'Swelling, redness or pain in one leg or arm. This can happen any time in pregnancy and up to 6 weeks after birth.',
      'Overwhelming tiredness, or thoughts of harming yourself or your baby. Get help at once.'
    ],
    warn: [
      'This list is not complete. If something feels wrong, get checked. You know your body best.',
      'In Portugal, news reports say pregnant women should call SNS 24 (808 24 24 24) before going to an obstetric emergency room. Heavy bleeding and very severe pain are exceptions: call 112. Check the current rule.',
      'If you cannot get through, do not wait at home. Go to the nearest emergency room and say you are pregnant.'
    ],
    tip: ['Write the doctor, the hospital and SNS 24 numbers on a card in your bag.', 'Teach your partner or a friend this list so they can speak up for you.'],
    after: ['After you are seen, write down what you were told and any follow-up date.'],
    sources: [SRC.hearher, SRC.mod, SRC.snsGravida],
    unconfirmed: [NOTE,
      'The list of warning signs matches the CDC Hear Her page as quoted to us. The CDC says the list is not complete.',
      'The Portugal rule about calling SNS 24 first comes from news reports from 2026. We did not find an official page. Rules can change by region. Check SNS 24.',
      'We did not find a source for the card and partner tips.'] });

  add({ id: 'preg-bleeding-pain', area: 'Pregnancy', icon: 'cross',
    title: 'Bleeding and severe pain in pregnancy, including ectopic pregnancy',
    intro: 'Bleeding or pain in early pregnancy can have many causes. Some are an emergency. ' + NOTMED,
    first: [
      'Heavy bleeding, bleeding with pain or dizziness, or fainting: go to the emergency room or call the emergency number.',
      'Sudden sharp pain on one side of the belly, with shoulder-tip pain: call the emergency number now.',
      'Lie down. Do not drive yourself if you feel faint.',
      'Keep any tissue you pass in a clean container and take it with you.'
    ],
    do: [
      'Count the pads you use. Note the time. Tell the medical staff how many pads you soaked and over how long.',
      'Ectopic pregnancy signs: pain low on one side of the belly, which can be sharp or come and go; pain at the tip of the shoulder; dizziness or fainting; feeling sick; looking very pale.',
      'Do not eat or drink if you may need an emergency operation, if you can avoid it. Take sips of water only if you are very thirsty and help is delayed.',
      'Bring someone with you if you can. Bring your pregnancy papers and medicine list.',
      'Light spotting that stops within a day: tell your doctor or midwife. If bleeding lasts longer than a day, contact them within 24 hours.',
      'If you cannot reach anyone and the bleeding is moderate to heavy, go to the nearest emergency room.'
    ],
    warn: [
      'A ruptured ectopic pregnancy can cause heavy bleeding inside the body. It is life-threatening.',
      'Symptoms can look like other problems. Only a doctor can tell what is wrong. Do not wait to see if it settles.',
      'Fever with bleeding or pain can mean infection. Call at once.'
    ],
    tip: ['Know the way to the nearest emergency room before you need it.', 'Keep a spare pad supply in the go-bag.'],
    after: ['Ask the doctor what to watch for in the next days and when to come back.'],
    sources: [SRC.mayoBleed, SRC.acogEctopic, SRC.mod],
    unconfirmed: [NOTE,
      'Go to the emergency room for heavy bleeding or bleeding with pain or dizziness matches March of Dimes and Mayo Clinic text quoted to us.',
      'The ectopic pregnancy signs match NHS and ACOG pages quoted to us.',
      'The advice about not eating, counting pads and keeping tissue is common practice. We did not find a named source.'] });

  add({ id: 'preg-later', area: 'Pregnancy', icon: 'heart',
    title: 'Later pregnancy: baby moving less, high blood pressure and swelling',
    intro: 'This covers the second and third trimester, when problems can start without a clear sign. ' + NOTMED,
    first: [
      'If your baby moves less than usual, call your maternity unit or doctor at once, even at night. Do not wait until the next day.',
      'Severe headache, blurred or flashing sight, pain just under the ribs, vomiting, or sudden swelling of the face, hands or feet: call at once. This can be pre-eclampsia.',
      'Seizure, chest pain, or trouble breathing: call the emergency number.',
      NUM
    ],
    do: [
      'Learn your baby usual pattern of movement. A change, especially fewer movements, is what matters. There is no single number that is normal.',
      'Do not rely on a home listening device to check the baby.',
      'If the baby moves less, tell the staff when you last felt normal movement.',
      'Keep your regular checkups. Early pre-eclampsia often shows only as high blood pressure or protein in the urine, with no symptoms.',
      'If you have a blood pressure cuff and were told your numbers, write each reading down. A reading over 140/90 needs a call to your doctor.',
      'Drink water and rest on your side. Do not lie flat on your back for long.',
      'In a power cut or disaster, move your checkups by phone. Tell the clinic where you are staying.',
      'Know two ways to reach the hospital in case a road is closed.'
    ],
    warn: [
      'Some people with pre-eclampsia have no symptoms. Any new symptom late in pregnancy is a reason to call.',
      'Sources differ on waiting 2 hours and counting movements before calling. A 2019 UK guideline says do not wait. This guide follows that.',
      'Pre-eclampsia can also start soon after the birth.'
    ],
    tip: ['Keep the maternity unit number where you can find it in the dark.', 'Keep your bag packed from about 36 weeks.'],
    after: ['After any scare, ask the clinic whether to change how often you are checked.'],
    sources: [SRC.rfm, SRC.nhsPre, SRC.acogPre, SRC.hearher],
    unconfirmed: [NOTE,
      'Call at once for reduced movement, even at night, matches the UK guideline and a Welsh NHS page as quoted to us. They differ on waiting 2 hours.',
      'The pre-eclampsia signs match NHS and ACOG text quoted to us.',
      'The 140/90 figure is from a CDC page for clinicians as quoted to us. Ask your doctor what your own limit is.',
      'We did not find a source for the tips on resting on your side or packing the bag at 36 weeks.'] });

  add({ id: 'preg-waters-preterm', area: 'Pregnancy', icon: 'drop',
    title: 'Waters breaking and early labour (before 37 weeks)',
    intro: 'Fluid leaking, or contractions before 37 weeks, needs checking even if you are not sure. ' + NOTMED,
    first: [
      'If fluid leaks or gushes, call your doctor or maternity unit and go to the hospital.',
      'If you have regular contractions before 37 weeks, do not wait. Call or go to the hospital.',
      'Go in at once if you also have bleeding, the baby moves less, or the fluid smells bad or is coloured.',
      NUM
    ],
    do: [
      'Signs of early labour: regular or frequent contractions that tighten the belly like a fist, pressure in the pelvis, a constant low backache, mild cramps, a change in vaginal discharge.',
      'Put a clean pad on. Note the time and the colour of the fluid. Do not use a tampon.',
      'Lie on your side while you wait for help.',
      'Drink a glass of water. Do not eat a large meal.',
      'Take your hospital bag, papers and medicines. Ask someone else to drive.',
      'If you cannot reach the clinic, go to the nearest hospital. Say how many weeks pregnant you are.'
    ],
    warn: [
      'In about 7 of 10 cases, the signs settle and the baby is born at full term. Still get checked. Do not assume it is false labour.',
      'A cord that you can see or feel at the opening, or a gush with a lot of bleeding, is an emergency. Call the emergency number and get on hands and knees with your chest down and hips up.',
      'If help is far away, call early. Roads may be closed in a disaster.'
    ],
    tip: ['Keep a towel and a spare pad in the car.', 'Know your hospital and a second hospital.'],
    after: ['Write down the time the waters broke and the time contractions began for the medical staff.'],
    sources: [SRC.acogPreterm, SRC.mayoLabor, SRC.mod],
    unconfirmed: [NOTE,
      'Do not wait, call or go to the hospital, and the list of early labour signs match ACOG and March of Dimes text quoted to us.',
      '7 in 10 cases settling comes from an NHS leaflet quoted to us.',
      'We did not find a named source for the cord and hands-and-knees advice, the clean pad advice, or the tips. They are common practice. Follow the instructions of the emergency operator first.'] });

  add({ id: 'preg-labour', area: 'Pregnancy', icon: 'heart', difficulty: 'Practical',
    title: 'Labour: signs, when to go, and if the baby is coming fast',
    intro: 'This covers labour, and what to do if the baby may be born before help arrives. General guidance steps are marked. The emergency operator instructions come first. ' + NOTMED,
    first: [
      'If the baby may be born soon, call the emergency number now. Put the phone on speaker. Follow the operator.',
      'Signs birth is close: contractions come often and strong, you feel a strong urge to push, or you can see the baby head.',
      'Do not try to hold the baby in. Do not pull on the baby, the cord or the afterbirth.',
      'Keep the baby warm and the mother warm and lying down.'
    ],
    do: [
      'Signs of labour: contractions that come regularly and get stronger and closer, the waters breaking, a pink or bloody show.',
      'Ask your own midwife for her rule on when to leave. Many give a pattern of contractions. We did not find a named source for one number.',
      'Go early if the road may close, if help is far, or if you have a long drive.',
      'IF BIRTH CANNOT BE AVOIDED (general guidance, not checked against a named source): stay calm and stay with the mother.',
      'Wash your hands if you can. Put clean towels or sheets under her. She can lie on her back with her knees bent, or on her side.',
      'Let the baby come by itself. If the head comes out first, support it gently. Do not pull.',
      'After the birth, dry the baby with a clean towel. Put the baby skin to skin on the mother chest. Cover both with a blanket and cover the baby head.',
      'Do not pull the cord. Do not cut the cord unless the operator tells you how.',
      'The afterbirth usually comes within about 30 minutes. Do not pull on the cord to help it.',
      'Check the mother for heavy bleeding. Soaking one or more pads in an hour is an emergency.'
    ],
    warn: [
      'If the baby is not breathing, follow the emergency operator instructions. They can guide you step by step.',
      'Never leave the mother alone with a new baby if she is bleeding heavily or feels faint.',
      'These steps are not a replacement for a trained midwife. Get help as fast as you can.'
    ],
    tip: ['Keep clean towels, a blanket, a hat for the baby and a clean plastic sheet in the bag from 36 weeks.', 'Write the address and cross streets on a card for the operator.'],
    after: ['Keep the baby on the mother chest and keep them warm until help arrives.', 'Tell the medical staff the exact time of birth.'],
    sources: [SRC.mayoLabor, SRC.hearher, SRC.acogPreterm],
    unconfirmed: [NOTE,
      'The signs of labour match Mayo Clinic text quoted to us.',
      'The emergency birth steps are general guidance. We searched for an NHS, Red Cross, Mayo Clinic or ACOG page and did not find one that gave step-by-step steps for an unplanned birth. A search summary said the usual advice is to keep the baby warm skin to skin, not to pull the cord, and to keep the mother lying down. We have not checked that against a named page. Follow the emergency operator.',
      'Soaking one or more pads in an hour as an emergency sign is from the CDC Hear Her page as quoted to us.',
      'The roughly 30 minutes for the afterbirth came from a community handout quoted to us, not an official page.',
      'Ambulance arrival times were quoted by one UK trust as 7 to 15 minutes. They vary by place and demand.'] });

  add({ id: 'preg-after-birth', area: 'Pregnancy', icon: 'heart',
    title: 'After the birth: the mother, the baby and feeding in an emergency',
    intro: 'The first weeks after a birth still carry risk. The warning signs apply for a year. ' + NOTMED,
    first: [
      'Soaking one or more pads in an hour, a very bad smell from the discharge, or a fever of 100.4 F (38 C): get help at once.',
      'Chest pain, trouble breathing, fainting, a bad headache, or a swollen painful leg: call the emergency number.',
      'Keep the baby warm and fed. Breastfeeding is still the best choice for most babies in a disaster.',
      'If you feel you might harm yourself or the baby, tell someone and get help now.'
    ],
    do: [
      'Mother: rest, drink water, eat often. Keep pads, clean underwear and your medicines in the bag.',
      'Watch the bleeding and the stitches. Wash hands before and after you use the toilet.',
      'Baby: keep warm with skin to skin and a hat. Feed whenever the baby shows hunger.',
      'If you must use formula, mix it with boiled water that has cooled, or with bottled water. Clean bottles and items with safe water.',
      'Throw away nipples, pacifiers and bottle parts that touched floodwater.',
      'Wash your hands before every feed. Keep the formula tin closed and dry.',
      'Keep the baby away from smoke and from any generator or stove exhaust.'
    ],
    warn: [
      'The risk of problems continues for one year after the birth. Tell any doctor or nurse that you gave birth in the past year.',
      'A baby that will not feed, is very sleepy, has trouble breathing, or has a fever needs a doctor. We did not find a named source for this. It is general guidance.',
      'Do not use water that has not been boiled or treated to make formula.'
    ],
    tip: ['Store extra formula, bottles, a clean basin and bottled water if you use formula.', 'Keep a copy of the baby birth record.'],
    after: ['Write down feeding times and nappies. Take the notes to the clinic.', 'Ask your clinic who to call if you are cut off at home.'],
    sources: [SRC.hearher, SRC.cdcInfant, SRC.cdcPregDisaster],
    unconfirmed: [NOTE,
      'The warning signs match the CDC Hear Her page as quoted to us.',
      'Breastfeeding still best in a disaster, formula mixed with boiled and cooled or bottled water, and discarding items that touched floodwater match CDC text quoted to us.',
      'The newborn warning signs (not feeding, very sleepy, trouble breathing, fever) are general guidance. We did not find a named source in our search.'] });

  add({ id: 'preg-disaster-water-food', area: 'Pregnancy', icon: 'drop',
    title: 'Pregnancy in a disaster: safe water, food, medicines and your kit',
    intro: 'Pregnancy changes what is safe to drink and eat. ' + NOTMED,
    first: [
      'Use bottled water, or boil tap water for 1 full minute and let it cool.',
      'Do not drink water treated with iodine in pregnancy.',
      'Throw away any food touched by floodwater. When in doubt, throw it out.',
      'Pack your medicines, prenatal vitamins and records in a waterproof bag.'
    ],
    do: [
      'Store at least 3 days of food and water. Two weeks of water is better if you can. Drink more than usual in the heat.',
      'Avoid unpasteurized cheese, undercooked meat and food that has stood warm. These carry germs that are a risk in pregnancy.',
      'Eat tinned or dry food you can heat well. Wash your hands before eating.',
      'Keep a list of your medicines, allergies and your due date. Keep your doctor and hospital numbers on paper.',
      'Keep copies of your prenatal papers, insurance details and ID in a waterproof container.',
      'Ask the clinic ahead of time which hospital to go to and how to reach them in a disaster.',
      'Call the hospital before you travel to confirm it is open and taking patients.',
      'Know the signs of labour and the warning signs. Do not wait.',
      'Pack: medicines, prenatal vitamins, pads, clean towels and sheets, a hat and blanket for the baby, snacks, water, a phone charger, and cash.'
    ],
    warn: [
      'Diarrhoea can dehydrate a pregnant person faster. Use strict hand washing and safe water. Call your doctor if it lasts.',
      'Do not take a new medicine without asking a pharmacist, doctor or midwife.',
      'Do not drink floodwater or use it to wash food or bottles.'
    ],
    tip: ['Use your normal food in the stockpile. Add a bag of dry biscuits for nausea.', 'See the water guides in this app for boiling and treating water.'],
    after: ['Replace opened water and stock. Tell your clinic where you are living.'],
    sources: [SRC.cdcWater, SRC.cdcPregDisaster, SRC.txChildrens, SRC.nhsVit],
    unconfirmed: [NOTE,
      'Boil for 1 minute and avoid iodine-treated water in pregnancy are from CDC text quoted to us. At high altitude boiling time is longer.',
      'A 3-day food and water kit and a 2-week water supply if possible are from a CDC text quoted to us.',
      'Calling the hospital ahead, the records container and the pack list are from Texas Childrens and March of Dimes text quoted to us.',
      'We did not find a source for the biscuits tip.'] });

  add({ id: 'preg-heat-cold-power', area: 'Pregnancy', icon: 'thermo',
    title: 'Pregnancy: heat, cold, power cuts and carbon monoxide',
    intro: 'Pregnant people overheat and dehydrate more easily. A power cut can remove cooling or heating. ' + NOTMED,
    first: [
      'In heat, move to the coolest place. Drink more water than usual. Do not wait until you are thirsty.',
      'Never use a generator, grill, camp stove or gas oven indoors. Carbon monoxide has no smell and can kill.',
      'Headache, dizziness, nausea or a sounding alarm: go outside into fresh air and call the emergency number.',
      NUM
    ],
    do: [
      'Stay in a cool, shaded, insulated room. Wear light, loose clothes.',
      'Limit time outdoors in the hottest hours. Take cool showers or use a damp cloth.',
      'Choose water. Avoid sugary and caffeinated drinks.',
      'In a heat wave, check on a pregnant neighbour or relative.',
      'In the cold, wear layers and a hat. Eat and drink often. Keep to one warm room. See the staying warm guides in this app.',
      'In a power cut, charge your phone first. Keep the hospital number on paper.',
      'Run a generator outdoors, at least 20 ft (6 m) from windows, doors and vents.',
      'Fit battery carbon monoxide alarms near every sleeping area. Test them.'
    ],
    warn: [
      'Signs of too much heat: a headache, feeling faint, very hot dry or sweaty skin, a fast pulse or confusion. Cool down and call the emergency number.',
      'Fever of 100.4 F (38 C) or higher in pregnancy needs a call to a doctor.',
      'Heat in pregnancy is linked to risks for the baby. The details are in the CDC heat sheet. Talk to your doctor.'
    ],
    tip: ['Keep a battery fan and a spray bottle of water.', 'Keep water bottles cold in a cooler.'],
    after: ['After a very hot day, drink extra water and rest. Tell your midwife if the baby moves less.'],
    sources: [SRC.cdcHeatPreg, SRC.cdph, SRC.cdcPregDisaster],
    unconfirmed: [NOTE,
      'Drinking more than usual, not waiting for thirst, cool rooms and avoiding the hottest hours match a summary of the CDC heat sheet quoted to us.',
      'A cool, shaded, insulated room and avoiding sugary and caffeinated drinks match California public health text quoted to us.',
      'No generator, grill, camp stove or gas oven indoors is from an archived CDC page as quoted to us.',
      'The 20 ft generator distance is from CDC text quoted to us.',
      'We did not find a source for the spray bottle, cooler and fan tips.'] });

  /* ---------- SENIORS ---------- */
  add({ id: 'sen-kit-lists', area: 'Seniors', icon: 'pack',
    title: 'Seniors: your kit, your lists and your papers',
    intro: 'This is what an older adult needs in a go-bag and at home. It is for you or for the person who looks after you. ' + NOTMED,
    first: [
      'Keep a list of every medicine with the name, dose and times, and the doctor and pharmacy numbers.',
      'Keep at least a few days of medicine in the bag. Work with your doctor on a 30-day supply if you can.',
      'Pack hearing aids, spare batteries, glasses, dentures and mobility aids.',
      'Name one person who will check on you.'
    ],
    do: [
      'Make 2 copies of your list. Keep one in the bag and one on the fridge.',
      'Write down the model numbers of medical devices such as a wheelchair, walker or oxygen machine.',
      'Keep waterproof copies of ID, insurance and legal papers.',
      'Pack: water, easy-to-eat food, a blanket, a warm hat, socks, a flashlight, a radio, a phone charger and cash.',
      'Add incontinence supplies and wipes if you use them.',
      'Keep a cane or walker tip spare. Keep a whistle to call for help.',
      'Plan a way out of your home. Plan how you will get out if the lift stops.',
      'Ask a neighbour or relative to have your key and your list. Agree how you will signal that you need help.',
      'Know a second route to a safe place. Make sure the vehicle can carry you and your equipment.'
    ],
    warn: [
      'Do not stop any medicine without asking the doctor. Some medicines, such as insulin and blood thinners, are dangerous to miss.',
      'People who use wheelchairs, canes or walkers cannot use stairs if the lift stops. Plan help ahead.'
    ],
    tip: ['Put a bright label on the go-bag with your name and phone.', 'Check the bag every 6 months.'],
    after: ['Replace used items. Update the medicine list after any change.'],
    sources: [SRC.readyOlder, SRC.hud, SRC.cdcOlder, SRC.redCrossOlder],
    unconfirmed: [NOTE,
      'A medicine list with doses and contacts, hearing aids and spare batteries, device model numbers, copies of ID and insurance, and a check-in person match Ready.gov and HUD checklists as quoted to us.',
      'A 30-day medicine supply is from a Red Cross white paper quoted to us.',
      'Wheelchair, cane and walker users cannot use stairs when lifts stop is from a CDC text quoted to us.',
      'We did not find a source for the whistle, the bright label or the 6-month check.'] });

  add({ id: 'sen-medicines-power', area: 'Seniors', icon: 'pill',
    title: 'Seniors: medicines, medical equipment and power cuts',
    intro: 'Missing medicines or losing power for medical equipment can cause serious harm. Plan before an emergency. ' + NOTMED,
    first: [
      'Ask your doctor and pharmacist how to get an emergency supply of each medicine.',
      'If you use a powered device, such as oxygen or a breathing machine, plan backup power now.',
      'Call the electricity company ahead of time. Ask about priority help for people on medical equipment.',
      'If the equipment fails and you cannot breathe well, call the emergency number.'
    ],
    do: [
      'Keep medicines in the original containers, in a bag you can grab, away from heat and wet.',
      'Use a weekly pill box. Mark the next dose.',
      'Insulin: ask your doctor how to keep it cool in an outage and how long it stays good.',
      'Write the settings and supplier number of each device on a card.',
      'Keep spare batteries and a charged power bank for your devices. Ask the supplier what size you need.',
      'Ask the supplier about a backup, for example a battery, a manual option or a spare cylinder.',
      'If you plan to stay at home, tell a neighbour which equipment you use.',
      'If you have to leave, take your devices, charger and list. Tell the shelter about your equipment on arrival.'
    ],
    warn: [
      'Do not run a generator or oxygen near a flame, a stove or a cigarette.',
      'Never use a generator indoors. Place it outdoors, far from windows and doors.',
      'Do not share or change doses on your own.'
    ],
    tip: ['See the Medication and medical power guide in this app.', 'Keep your pharmacy phone number on the fridge list.'],
    after: ['Get refills as soon as you can after the emergency.'],
    sources: [SRC.cdcOlder, SRC.redCrossOlder, SRC.readyOlder],
    unconfirmed: [NOTE,
      'Missing essential medicines such as insulin or blood thinners can cause harm after a disaster, and caregivers of people on powered medical devices should arrange backup power and contact the electricity company ahead of time. These are from CDC and Red Cross texts quoted to us.',
      'We did not find oxygen-specific guidance in our search. Ask your oxygen supplier.',
      'We did not find a source for the pill box and device card tips.'] });

  add({ id: 'sen-heat', area: 'Seniors', icon: 'sun',
    title: 'Seniors: heat, dehydration and heat stroke',
    intro: 'Older adults get too hot and dehydrated more easily. Heat can be dangerous even when it is not extreme. ' + NOTMED,
    first: [
      'Go to the coolest place you can. Drink water often, even if you are not thirsty.',
      'Stay out of the sun, especially from 11:00 to 17:00.',
      'Check on older neighbours and relatives, especially if they live alone.',
      'Confusion, hot dry or very sweaty skin, or a body temperature about 104 F (40 C) or higher: call the emergency number and cool the person.'
    ],
    do: [
      'Wear light, loose clothes. Wear a hat outdoors.',
      'Take cool showers or use a damp cloth on the neck and wrists.',
      'Use a fan with a cool damp cloth or a bowl of cool water. Fans alone do not cool you enough in extreme heat.',
      'Drink water and clear fluids. Avoid alcohol.',
      'Heat exhaustion signs: thirst, dizziness, weakness, poor coordination, feeling sick. Move to a cool place and sip water.',
      'Heat stroke signs: temperature above about 104 F (40 C), hot red dry or sweaty skin, a rapid strong pulse, confusion. This is an emergency.',
      'While you wait for help: move the person to shade, remove extra clothes and cool with water and a fan.',
      'In a power cut, use a battery fan, a wet washcloth, an ice pack and electrolyte drinks. Keep them in the kit.',
      'Know where a cool public place is, such as a library or a mall.'
    ],
    warn: [
      'Some medicines make heat harder to handle. Ask your doctor or pharmacist.',
      'Older people may not feel thirst or heat. Do not wait to feel thirsty.',
      'Never leave an older person or pet in a parked car.'
    ],
    tip: ['Keep a thermometer in the room.', 'Plan a cool place to go before the heat wave.'],
    after: ['Drink extra water and rest for a day after a very hot spell.'],
    sources: [SRC.pmcWeather, SRC.cdcCog, SRC.dgsHeat],
    unconfirmed: [NOTE,
      'Older adults are more at risk of heat stroke is from a journal article quoted to us. That older adults can overheat at about 80 F came from a news article and we did not confirm it.',
      'The heat exhaustion signs match an NIA summary quoted to us, as repeated in a news article.',
      'The heat stroke temperature is about 103 to 104 F (39.4 to 40 C) depending on the source quoted to us. This guide uses about 104 F.',
      'Drink more water, avoid the sun from 11:00 to 17:00, avoid alcohol and check on isolated older people match DGS advice as reported in the news.',
      'The hot-weather kit with water, a wet washcloth, an instant ice pack, a battery fan and electrolyte drinks is from a CDC brief quoted to us.'] });

  add({ id: 'sen-cold', area: 'Seniors', icon: 'snow',
    title: 'Seniors: cold, hypothermia and staying warm indoors',
    intro: 'Older adults lose body heat faster and may not feel dangerous cold. Cold can be dangerous indoors too. ' + NOTMED,
    first: [
      'Wear layers, a hat and warm socks indoors. Use extra covers at night.',
      'Eat enough and drink warm drinks. Food gives you heat.',
      'Choose one small room to stay in. Close the other doors. See the staying warm guides in this app.',
      'Shivering that stops, confusion, slurred speech or very slow movement: call the emergency number.'
    ],
    do: [
      'Early signs of hypothermia: cold hands and feet, a puffy face, pale skin, shivering, slow or slurred speech, being sleepy, confused or sometimes cross.',
      'Late signs: shivering stops, clumsy stiff movement, a slow heartbeat, shallow breathing, blacking out.',
      'While you wait for help: move the person to shelter, remove wet clothes, wrap in blankets with the head covered.',
      'If awake, give a warm non-alcoholic drink and sugary food. Keep talking to the person.',
      'Do not rub the arms and legs. Do not give alcohol. Do not use a hot bath or a hot water bottle on them.',
      'Block drafts. Hang blankets over windows at night.',
      'Never heat with a gas oven, grill, camp stove or generator indoors. Carbon monoxide kills.',
      'Check on older neighbours often. Portugal: DGS advises layers, gloves and hat, and non-slip shoes to avoid falls.'
    ],
    warn: [
      'About 1 in 5 injuries from cold are said to happen inside the home. Cold indoors still matters.',
      'Cold can make chronic illness worse. Call your doctor if you feel worse.'
    ],
    tip: ['Keep a warm hat for sleeping.', 'Keep a thermos of hot water filled before the power goes.'],
    after: ['Warm up slowly. Tell your doctor if you had signs of hypothermia.'],
    sources: [SRC.nhsHypo, SRC.pmcWeather, SRC.dgsCold],
    unconfirmed: [NOTE,
      'The first steps for hypothermia, no rubbing and no alcohol match NHS text quoted to us. The hot bath and hot water bottle warning comes from an NHS 111 Wales page quoted to us, not the main NHS page.',
      'The early and late signs of hypothermia and the 1 in 5 indoor cold injuries figure come from an article that cites the National Institute on Aging. We did not open the NIA page.',
      'The advice for layers, hat, gloves and non-slip shoes is from DGS as reported in the news.',
      'We did not find a source for the thermos and sleeping hat tips.'] });

  add({ id: 'sen-falls-mobility', area: 'Seniors', icon: 'shield',
    title: 'Seniors: falls, walking aids and stairs when the lift stops',
    intro: 'A fall in the dark or in a hurry can be serious. Plan for it. ' + NOTMED,
    first: [
      'Keep paths clear. Keep a flashlight by the bed.',
      'Wear shoes with grip. Do not rush.',
      'If you fall, stay still for a moment. Do not rush to stand. Call for help if you are hurt.',
      'If you use a walker, cane or wheelchair, plan how you will leave if the lift stops.'
    ],
    do: [
      'Keep a night light or a lantern and a whistle by the bed.',
      'Keep a phone in a pocket. Keep a charged power bank.',
      'Remove loose rugs and cords. Mark steps with tape.',
      'Keep a spare cane tip and a spare battery for any powered aid.',
      'Ask a helper to be your stair partner in an emergency.',
      'If you must use stairs, go slowly, hold the rail, and use a chair or a bump-down method if you can. Ask for a person on each side.',
      'If you are on a high floor and cannot leave, tell the emergency services and your neighbours. Stay near a window and signal.',
      'After any fall or injury, get medical attention, even if you feel fine.'
    ],
    warn: [
      'Some medicines raise the risk of falls. Ask your doctor to review them.',
      'Do not use lifts in a fire or a quake.',
      'A fall with a hit to the head needs a check, especially if you take blood thinners.'
    ],
    tip: ['Practice your route out of your home in daylight.', 'Keep a spare pair of glasses where you can reach them in the dark.'],
    after: ['Tell your doctor about any fall.'],
    sources: [SRC.cdcOlder, SRC.readyOlder, SRC.hud],
    unconfirmed: [NOTE,
      'Wheelchair, cane and walker users cannot use stairs when lifts stop is from a CDC text quoted to us. Any fall or injury needs medical attention is from a caregiver guide quoted to us.',
      'Mobility aids, a plan for transport that can carry your equipment, and a way to signal for help match Ready.gov, HUD and county checklists quoted to us.',
      'We did not find a named source for the stair method, the tape on steps, the whistle or the head injury advice. They are general guidance.'] });

  add({ id: 'sen-confusion', area: 'Seniors', icon: 'alert',
    title: 'Seniors: sudden confusion or a change in behaviour',
    intro: 'A sudden change can be a sign of illness, dehydration or infection. It needs checking. ' + NOTMED,
    first: [
      'Sudden confusion, strange behaviour or sleepiness in an older person needs a health check the same day.',
      'Look for dehydration, fever, pain, a fall, or a missed medicine.',
      'Give water if the person is awake and can swallow. Call the doctor or SNS 24 or the local line.',
      'Call the emergency number for a seizure, trouble breathing, chest pain or unresponsiveness.'
    ],
    do: [
      'Check the mouth and skin. A dry mouth or dry skin can be a sign of dehydration.',
      'Check the temperature. Check for signs of a fall or injury.',
      'Check the medicine box for missed or double doses.',
      'Speak calmly. Face the person. Use short sentences.',
      'Keep the room lit and quiet. Keep glasses and hearing aids on.',
      'Write down what changed and when. Tell the doctor.',
      'In heat or cold, move the person to a comfortable room.'
    ],
    warn: [
      'Do not assume it is just old age. A sudden change is a reason to get a check.',
      'Never leave a confused person alone near a door, stove or road.'
    ],
    tip: ['Keep a card with the person name, medicines and doctor.', 'Keep a regular routine as much as you can in an emergency.'],
    after: ['Follow up with the doctor. Ask what to watch for.'],
    sources: [SRC.cdcCog, SRC.redCrossOlder],
    unconfirmed: [NOTE,
      'Sudden changes in behaviour, confusion or disorientation as possible signs of an underlying health problem, dry mouth or skin as possible dehydration, and a fall or injury needing medical attention come from a caregiver guide quoted to us. That source is about care at home, not disasters.',
      'The rest of the steps are general guidance. We did not find a named source.',
      'Calling SNS 24 in Portugal is a general pointer. Check the current rules.'] });

  add({ id: 'sen-dementia', area: 'Seniors', icon: 'users',
    title: 'Seniors: caring for someone with memory loss or dementia in an emergency',
    intro: 'Change and noise can frighten a person with memory loss. Plan to keep them safe and calm. ' + NOTMED,
    first: [
      'Stay with the person. Do not leave them alone.',
      'Keep a recent photo, a medicine list and a contact card with you. Put an ID bracelet on them.',
      'Keep a routine as much as you can: meals, sleep, favourite things.',
      'Plan a calm way out. Take medicines, glasses, hearing aids and comfort items.'
    ],
    do: [
      'Pack incontinence supplies, wipes, spare clothes and a favourite blanket or object.',
      'In hot weather pack water, a wet washcloth, an instant ice pack, a battery fan and electrolyte drinks.',
      'Tell the shelter staff about the person needs right away. Ask for a quiet space.',
      'Speak slowly and calmly. Say what you are doing before you do it.',
      'Lock doors and keep keys out of reach if the person may wander. Do not lock them in alone.',
      'Take pictures of the person each day in an emergency, so you can show people if they get lost.',
      'Rest. Ask another person to give you a break.'
    ],
    warn: [
      'Wandering is a real danger in a crowd, a storm or a night evacuation. Keep close.',
      'Do not argue or correct. Stay calm and redirect.',
      'Watch for dehydration and missed medicines.'
    ],
    tip: ['Practice leaving the house in daylight so the person knows the steps.', 'Keep a copy of the legal papers with you.'],
    after: ['Return to the usual routine slowly. Tell the doctor about any change after the emergency.'],
    sources: [SRC.cdcCog, SRC.cdcOlder, SRC.readyOlder],
    unconfirmed: [NOTE,
      'The hot-weather kit with water, a wet washcloth, an instant ice pack, a battery fan and electrolyte fluids, and supplies such as incontinence items and medicines, are from a CDC brief quoted to us.',
      'We did not find a source for the daily pictures, the routine advice, speaking slowly, or the wandering steps. They are general guidance.'] });

  add({ id: 'sen-checkin-evac', area: 'Seniors', icon: 'users',
    title: 'Seniors: check-in plans, getting out and shelters',
    intro: 'Many older people are alone in a disaster. A simple plan saves lives. ' + NOTMED,
    first: [
      'Agree on a check-in person and how you will reach each other. Agree on a second person.',
      'Ask a neighbour to knock if there is a warning, and to check on you after.',
      'Know your evacuation route and where you will go.',
      'If you are ordered to leave, go early. Do not wait.'
    ],
    do: [
      'Make a short list of people who can drive you, carry equipment and help on stairs.',
      'Tell emergency services early if you need help to get out. In many places you can register.',
      'Ask shelters if they can take your equipment and pets. Ask before you go.',
      'Keep the go-bag by the door. Keep your shoes, glasses, keys and phone at the bed.',
      'If you are alone, agree on a daily signal, such as a curtain open or a light on.',
      'Know the emergency numbers and keep them on paper.',
      'Portugal: call 112 in an emergency. DGS advises contacting and following isolated older people in heat and cold, and calling SNS 24 (808 24 24 24) before going to the emergency room for illness.',
      'US: call 911. In many areas 211 can give help with shelters and services.',
      'Include a plan for pets or a service animal.'
    ],
    warn: [
      'Do not stay if you are ordered to evacuate. Help may not reach you.',
      'Do not drive in floodwater or at night in a storm if you can avoid it.'
    ],
    tip: ['Give your neighbours a copy of your medicine list.', 'Practice your plan once a year.'],
    after: ['Tell your check-in person you are safe. Update the plan after.'],
    sources: [SRC.readyOlder, SRC.hud, SRC.dgsHeat, SRC.dgsCold],
    unconfirmed: [NOTE,
      'A check-in person, a neighbour network, an escape route and a plan to signal for help match Ready.gov, HUD and county checklists quoted to us.',
      'Contact and follow isolated older people, and SNS 24 before the emergency room, are from DGS advice as reported in the news.',
      'We did not find a source for registering with emergency services, the 211 line, the daily signal or the shelter question. They are general guidance. Check what exists where you live.'] });

  if (window.LOAD_CORE && window.LOAD_CORE.guides) {
    G.forEach(function (g) { window.LOAD_CORE.guides.push(g); });
  }
})();
