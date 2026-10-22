/* Load Survival core content: guides, checklists, numbers, region boxes, sources.
   General information only. Figures follow FEMA, CDC, EPA and Red Cross guidance. */
window.LOAD_CORE = {
  note: 'This is a reference, not a substitute for training. Take a certified first-aid course.',
  rule3: [
    ['Air', '3 minutes'],
    ['Harsh weather (shelter)', '3 hours'],
    ['Water', '3 days'],
    ['Food', '3 weeks']
  ],
  numbers: [
    { who: 'United States', num: '911', tel: '911' },
    { who: 'Portugal', num: '112', tel: '112' },
    { who: 'United Kingdom', num: '999', tel: '999' }
  ],
  regionBoxes: {
    us: {
      title: 'United States',
      numbers: [['Emergency', '911', '911'], ['Poison Control', '1-800-222-1222', '18002221222']],
      lines: [
        'FEMA and Ready.gov: planning and recovery help.',
        'National Weather Service: a Watch means conditions are possible. A Warning means it is happening or about to happen. Act on a Warning.',
        'NOAA Weather Radio and Wireless Emergency Alerts (phone alerts) bring official warnings.',
        'American Red Cross: shelters, first-aid courses and disaster help.',
        'Power plugs: 120 V, Type A and B.'
      ],
      hazards: 'Main hazards: hurricane, tornado, winter storm, flood, wildfire, earthquake.'
    },
    pt: {
      title: 'Portugal',
      numbers: [['Emergency', '112', '112'], ['SNS 24 health line', '808 24 24 24', '808242424'], ['Poison line (CIAV)', '800 250 250', '800250250']],
      lines: [
        'ANEPC (Proteção Civil): civil protection and evacuation notices.',
        'IPMA: weather and earthquake warnings. Levels are yellow, orange and red. Orange and red need action.',
        'Cruz Vermelha Portuguesa (Portuguese Red Cross): shelter and aid.',
        'Local Câmara Municipal (town hall) notices: local evacuations and shelters.',
        'Power plugs: 230 V, Type C and F.'
      ],
      hazards: 'Main hazards: wildfire (the biggest summer risk), heat waves, earthquake and tsunami, floods, storms, long blackouts.',
      blackout: {
        title: 'Lessons from the April 2025 Iberian blackout',
        items: [
          'Keep some cash in small bills. Card payments and cash machines stopped working.',
          'Keep a battery or hand-crank radio. Mobile and internet networks were unreliable.',
          'Plan for no phone signal: agree meeting places and check-in times in advance.',
          'Keep water, food and medicines ready for a day or more without power.'
        ]
      }
    }
  },
  sources: [
    ['FEMA / Ready.gov (US)', 'https://www.ready.gov/'],
    ['CDC emergency water and health guidance', 'https://www.cdc.gov/water-emergency/about/'],
    ['US EPA', 'https://www.epa.gov/'],
    ['American Red Cross', 'https://www.redcross.org/'],
    ['National Weather Service', 'https://www.weather.gov/'],
    ['ANEPC / Proteção Civil (Portugal)', 'https://prociv.gov.pt/'],
    ['IPMA (Portugal)', 'https://www.ipma.pt/'],
    ['Cruz Vermelha Portuguesa', 'https://www.cruzvermelha.pt/']
  ],
  helpNow: [
    ['Severe bleeding', 'g-bleeding', 'cross'],
    ['Not breathing / no pulse', 'g-cpr', 'heart'],
    ['Choking', 'g-choking', 'alert'],
    ['Burn', 'g-burns', 'flame'],
    ['Too hot', 'g-heat-illness', 'sun'],
    ['Too cold', 'g-hypothermia', 'snow'],
    ['No power', 'g-power-outage', 'bolt'],
    ['Flood or storm', 'g-flood', 'waves']
  ],
  guides: [
    /* ---------------- DISASTERS ---------------- */
    {
      id: 'g-power-outage', icon: 'bolt', area: 'Disasters', difficulty: 'Essential',
      title: 'Power outage',
      intro: 'Keep everyone warm, fed, lit and safe until the power returns.',
      first: ['Use battery lights, not candles.', 'Keep fridge and freezer doors closed.', 'Never run a generator, grill, camp stove or car indoors or in a garage.'],
      do: ['Check on neighbors, especially older people and anyone using medical equipment.', 'Unplug sensitive electronics. Leave one lamp on so you know when power returns.', 'Eat from the fridge first, then the freezer, then the pantry.', 'Text instead of calling. Save phone battery.', 'Use a battery or hand-crank radio for official news.'],
      table: { head: ['Food storage during an outage', 'Safe time'], rows: [['Fridge, door closed', 'About 4 hours'], ['Full freezer, door closed', 'About 48 hours'], ['Half-full freezer, door closed', 'About 24 hours']] },
      warn: ['Carbon monoxide kills. Run generators outdoors, at least 20 ft (6 m) from windows and doors. Use a CO alarm.', 'CO symptoms: headache, dizziness, nausea. Move to fresh air and call emergency services.', 'Discard perishable food above 40 F (4 C) for more than 2 hours. Never taste food to test it.'],
      tip: ['Fill bathtubs and containers with water if a storm is coming.', 'A full freezer stays cold longer. Freeze water bottles ahead of time.'],
      after: ['Check food temperatures before eating.', 'Reset clocks and appliances. Restock your kit.']
    },
    {
      id: 'g-winter-storm', icon: 'snow', area: 'Disasters', difficulty: 'Essential',
      title: 'Winter storm',
      intro: 'Cold kills slowly. Stay dry, stay insulated and stay inside.',
      first: ['Stay indoors. Do not drive unless you must.', 'Dress in layers and keep your head, hands and feet covered.', 'Heat one room, not the whole house.'],
      do: ['Pick the smallest, best-insulated room and close the door.', 'Hang blankets over windows. Stuff towels under doors.', 'Eat regularly and drink water. Food fuels body heat.', 'Move around gently to stay warm. Do not overexert shoveling snow.', 'If water pipes may freeze, let a faucet drip and open cabinet doors under sinks.'],
      warn: ['Never use a gas oven, grill or camp stove for heat indoors. Carbon monoxide kills.', 'If stranded in a car: stay in the car, keep the tailpipe clear of snow, and run the engine about 10 minutes each hour with a window slightly open.', 'Watch for hypothermia and frostbite. See the Hypothermia guide.'],
      tip: ['Keep a blanket, hat, gloves, water, snacks and a shovel in your car.', 'Sleep in a sleeping bag with a pad underneath. The ground steals heat.'],
      after: ['Check on neighbors. Clear snow away from vents and exhaust pipes.', 'Check pipes for damage before turning water back on.']
    },
    {
      id: 'g-hurricane', icon: 'wind', area: 'Disasters', difficulty: 'Essential',
      title: 'Hurricane and storm',
      intro: 'Leave early when told to. Storm surge and flood kill more people than wind.',
      first: ['Follow official evacuation orders at once.', 'Know your evacuation zone and route.', 'Take your go-bag, medicines, documents, pets and phone chargers.'],
      do: ['48 hours before: fill the car with fuel, get cash in small bills, charge power banks.', 'Bring in or tie down outdoor items. Shutter or board windows.', 'Fill water containers. Store 1 gal (3.8 L) per person per day.', 'If you stay: shelter in a small interior room on the lowest safe floor, away from windows.', 'Listen to a battery radio for updates.'],
      warn: ['Do not go outside in the calm of the eye. The wind returns suddenly.', 'Never drive through flooded roads. 12 in (30 cm) of water can float a car.', 'Portugal and coastal Europe: strong Atlantic storms can bring flooding and falling trees. Follow IPMA warnings.'],
      tip: ['Photograph your home and valuables before the storm for insurance.', 'Charge everything while power is on.'],
      after: ['Stay away from downed power lines.', 'Do not drink floodwater. Boil or treat water until officials say it is safe.', 'Photograph damage before cleanup.']
    },
    {
      id: 'g-tornado', icon: 'wind', area: 'Disasters', difficulty: 'Essential',
      title: 'Tornado',
      intro: 'You may have only minutes. Move to shelter at the first warning.',
      first: ['Go to the lowest floor, in a small interior room.', 'Cover your head and neck with your arms, a mattress or a helmet.', 'Stay away from windows.'],
      do: ['Know the difference: a Watch means tornadoes are possible. A Warning means one is happening or about to. Act on a Warning.', 'If you are in a mobile home or vehicle, get to a sturdy building if you safely can.', 'If outside with no shelter, lie flat in a low area and cover your head.', 'Keep shoes, a flashlight and a whistle where you shelter.'],
      warn: ['Do not shelter under a highway overpass. Wind speeds can be higher there.', 'Do not try to outrun a tornado in a car in heavy traffic.'],
      tip: ['Practice with your family twice a year.', 'A bicycle or sports helmet protects your head.'],
      after: ['Stay in shelter until the warning ends.', 'Watch for broken glass, nails, downed power lines and gas leaks.', 'Help others only when safe. Call emergency services for injuries.']
    },
    {
      id: 'g-flood', icon: 'waves', area: 'Disasters', difficulty: 'Essential',
      title: 'Flood',
      intro: 'Water is stronger than it looks. Move to higher ground early.',
      first: ['Move to higher ground now. Do not wait for water to reach you.', 'Turn around, do not drown. Never walk or drive through floodwater.', 'Never drink floodwater.'],
      do: ['Take your go-bag, medicines, documents and phone.', 'If time allows, switch off gas, water and electricity at the main controls. Do not touch electrical equipment if you are wet or standing in water.', 'Go upstairs if trapped. Do not go into a closed attic.', 'Call emergency services if you are trapped.'],
      table: { head: ['Floodwater danger', 'Depth'], rows: [['Can knock an adult down (moving water)', '6 in (15 cm)'], ['Can float a car', '12 in (30 cm)']] },
      warn: ['Floodwater can carry sewage, chemicals and sharp debris.', 'Do not touch downed power lines or anything they touch.', 'Portugal: heavy rain can flood towns quickly. Follow IPMA and Proteção Civil warnings.'],
      tip: ['Park your car on high ground when a flood warning is issued.', 'Keep important papers in a waterproof bag.'],
      after: ['Wear boots and gloves during cleanup.', 'Throw away food, bottled water and cooking items that touched floodwater.', 'Dry the house quickly to prevent mold.']
    },
    {
      id: 'g-earthquake-tsunami', icon: 'quake', area: 'Disasters', difficulty: 'Essential',
      title: 'Earthquake and tsunami',
      intro: 'Protect yourself during the shaking. Near the coast, move uphill at once.',
      first: ['Drop, Cover, Hold On.', 'Do not run outside.', 'Near the coast: if shaking is strong or long, go uphill at once. Do not wait for an alert.'],
      do: ['Drop to your hands and knees. Cover your head and neck under a sturdy table. Hold on.', 'If in bed, stay there and cover your head with a pillow.', 'If outdoors, move away from buildings, trees and power lines.', 'If driving, pull over in a clear area and stay in the car.', 'After shaking stops, check for injuries and fires. Expect aftershocks.'],
      warn: ['If you smell gas or hear hissing, leave the building and report it from a safe place.', 'Do not use elevators.', 'A tsunami can be many waves over hours. Stay on high ground until officials say it is safe.', 'Portugal: the coast is at tsunami risk. Know your uphill route.'],
      tip: ['Secure tall furniture to walls.', 'Keep shoes and a flashlight by your bed.'],
      after: ['Check for gas leaks, damaged wiring and cracked walls.', 'Use text messages, not calls, to keep lines free.']
    },
    {
      id: 'g-wildfire', icon: 'flame', area: 'Disasters', difficulty: 'Essential',
      title: 'Wildfire',
      intro: 'Leave early. A fire can move faster than you can run.',
      first: ['Leave early when told to, or when you see smoke or flame near you.', 'Take your go-bag, medicines, documents and pets.', 'Wear an N95 mask. A cloth mask does not stop smoke particles.'],
      do: ['Close all windows and doors. Turn off gas. Leave lights on for firefighters.', 'Drive with headlights on, windows up and vents closed.', 'Know two ways out of your area.', 'Clear dry leaves and brush from around your home before fire season.'],
      warn: ['If trapped in a car: keep windows up, park in a clear area away from trees, lie below the dash, and cover yourself with blankets.', 'Do not use fire outdoors in dry weather. Follow local fire restrictions.', 'Portugal: wildfire is the biggest summer risk. Follow Proteção Civil and ICNF notices.'],
      tip: ['Keep a pair of sturdy shoes, a flashlight and a battery radio near the door.', 'Fill a bathtub or buckets with water if you must stay.'],
      after: ['Return only when officials say it is safe.', 'Watch for hot spots, falling trees and ash. Wear an N95 mask during cleanup.']
    },
    {
      id: 'g-heat-wave', icon: 'sun', area: 'Disasters', difficulty: 'Essential',
      title: 'Heat wave',
      intro: 'Heat is a silent killer. Stay cool, drink water and check on others.',
      first: ['Move to the coolest place you can, out of the sun.', 'Drink water regularly. Do not wait until you are thirsty.', 'Never leave a child, older person or pet in a parked car.'],
      do: ['Stay indoors in air conditioning or a shaded, ventilated room. Fans alone do not cool you enough in extreme heat.', 'Wear light, loose clothing and a hat outside.', 'Take cool showers. Put a damp cloth on your neck.', 'Avoid hard work in the hottest hours.', 'Check on older neighbors and anyone living alone.'],
      warn: ['Know the signs of heat stroke: confusion, hot dry or very sweaty skin, body temperature about 103 F (39.4 C) or higher. Call emergency services. See Heat exhaustion vs heat stroke.', 'Portugal: IPMA uses yellow, orange and red warning levels. Take action at orange and red.'],
      tip: ['Close curtains on sunny windows during the day.', 'Libraries, malls and cooling centers give free relief.'],
      after: ['Keep drinking water and rest for a day.', 'Check on others again.']
    },
    /* ---------------- ESSENTIALS ---------------- */
    {
      id: 'g-making-electricity', icon: 'battery', area: 'Essentials', difficulty: 'Practical',
      title: 'Making electricity',
      intro: 'Know what you can power, for how long, and how to charge safely.',
      first: ['Make a list of what you must power: phones, radio, medical devices, lights.', 'Know your battery size in watt-hours (Wh).', 'Never run a generator, grill, camp stove or car indoors.'],
      do: ['Power banks: charge them now. A phone uses about 10 to 15 Wh per full charge.', 'Solar panel plus portable power station: the panel charges the station and the station powers your devices.', 'Car inverter: run the engine outdoors only, with the exhaust clear.', 'Hand-crank devices: slow but need no fuel. Good for a radio and a light.', 'Generator: use outdoors, at least 20 ft (6 m) from windows and doors, with a CO alarm and the right fuel. Never backfeed the house wiring.'],
      table: { head: ['Quick watt-hour math', 'Formula'], rows: [['Energy used (Wh)', 'Watts x hours'], ['Example: 60 W for 5 hours', '300 Wh'], ['Rough runtime (hours)', 'Battery Wh x 0.85, divided by watts'], ['Why 0.85', 'Some energy is lost as heat']] },
      warn: ['"Lemon battery" and potato tricks do NOT produce usable power. They make a tiny voltage and almost no current. They cannot charge a phone.', 'Never connect bare wires from solar panels or batteries to a house outlet.', 'Damaged batteries can ignite. Do not charge them on soft bedding.'],
      tip: ['Use the Watt-hours calculator in Tools.', 'Turn off screens and use airplane mode to stretch battery life.'],
      after: ['Recharge everything as soon as power returns.', 'Store power banks half charged in a cool place.']
    },
    {
      id: 'g-signaling', icon: 'radio', area: 'Essentials', difficulty: 'Practical',
      title: 'Communication and signaling',
      intro: 'Reach family, hear official news and signal for help when networks fail.',
      first: ['Text instead of calling. Texts use less network and battery.', 'Contact your out-of-area contact. Tell them you are safe.', 'Save phone battery: lower brightness, close apps, use low-power mode.'],
      do: ['Keep a battery or hand-crank radio for official news.', 'Agree meeting places and check-in times before an emergency.', 'Keep a whistle on your go-bag. Three blasts means distress.', 'Use a signal mirror on a sunny day to flash toward searchers or aircraft.', 'Use airplane mode when there is no signal. The phone burns battery searching for it.'],
      warn: ['Do not rely on one device. Have a backup.', 'Official numbers: confirm them in advance. Verify before you rely on them.'],
      tip: ['Write phone numbers on paper. A dead phone cannot show contacts.', 'Use the SOS flash in Tools as a visual signal.'],
      after: ['Tell everyone when you are safe.', 'Update your family plan with what worked.']
    },
    {
      id: 'g-pets', icon: 'paw', area: 'Essentials', difficulty: 'Practical',
      title: 'Pets and animals',
      intro: 'Pets need a plan too. Never leave them behind.',
      first: ['Take your pets with you when you evacuate.', 'Keep carriers, leashes and ID ready.', 'Pack at least 3 days of food and water for each pet.'],
      do: ['Make a pet go-bag: food, water, bowls, medicines, vaccination records, a photo, a blanket and waste bags.', 'Make sure pets wear ID tags and, if possible, have a microchip with current contact details.', 'Know pet-friendly shelters, hotels or friends in advance. Many shelters do not take pets.', 'Keep cats and small animals in carriers. Keep dogs on a leash.', 'Offer water often in heat. Never leave a pet in a parked car.'],
      warn: ['Frightened animals can bite or run. Handle them calmly.', 'Do not let pets drink floodwater.'],
      tip: ['Practice getting your pet into the carrier.', 'Keep a recent photo of you with your pet to prove ownership.'],
      after: ['Reintroduce food slowly.', 'Check paws for debris and cuts.']
    },
    {
      id: 'g-grid-down', icon: 'bolt', area: 'Essentials', difficulty: 'Practical',
      title: 'Long-term grid-down',
      intro: 'If power and services fail for weeks, plan by priority: water, food, warmth, sanitation, safety, communication.',
      first: ['Count your water. 1 gal (3.8 L) per person per day. Two weeks is ideal.', 'Make a daily routine and stick to it.', 'Work with neighbors. Groups are safer and stronger.'],
      do: ['Water first: store, filter, then disinfect. Strain through cloth, filter, then disinfect.', 'Food: about 2,000 kcal per person per day. Eat fridge food first, then freezer, then pantry.', 'Cook outdoors or in a proper fireplace only.', 'Sanitation: use a bucket toilet with a bag and lid. Wash hands with soap and safe water.', 'Power: plan a daily energy budget. Use Tools.', 'Keep cash in small bills and a battery radio.'],
      warn: ['Do not advertise your supplies.', 'Do not burn fuel indoors. Carbon monoxide kills.', 'Illness spreads fast without clean water and sanitation.'],
      tip: ['Rotate food and water every year.', 'Learn skills now: first aid, fire safety, water treatment.'],
      after: ['Review what worked and what you ran short of.', 'Restock and improve your plan.']
    },
    {
      id: 'g-group-calm', icon: 'users', area: 'Essentials', difficulty: 'Practical',
      title: 'Staying calm and working as a group',
      intro: 'Calm minds make good decisions. A well-organized group lasts longer.',
      first: ['Stop. Breathe slowly. Think. Plan.', 'Check that everyone is safe.', 'Take the next small step.'],
      do: ['Hold a short daily meeting: what we have, what we need, what we do today.', 'Give each person a role: water, food, first aid, watch, communication.', 'Share the work fairly. Rotate hard jobs.', 'Make decisions simply. Agree who decides if there is a disagreement.', 'Include children with small jobs. Give them comfort and routine.', 'Rest in shifts. Tired people make mistakes.'],
      warn: ['Rumors spread fast. Check news from official sources.', 'Fatigue, hunger and fear cause conflict. Eat, drink and sleep.', 'Do not confront strangers. Keep distance and call authorities.'],
      tip: ['Praise what goes well.', 'Keep a written log of supplies and tasks.'],
      after: ['Talk about what you learned.', 'Thank everyone. Rest.']
    },
    /* ---------------- MEDICAL ---------------- */
    {
      id: 'g-bleeding', icon: 'cross', area: 'Medical', difficulty: 'Critical',
      title: 'Severe bleeding',
      intro: 'Stop the bleeding first. Every second counts.',
      first: ['Call emergency services (911 in the US, 112 in Portugal).', 'Press hard directly on the wound with a clean cloth.', 'Do not let go. Keep pressing.'],
      do: ['Use gloves or a plastic bag if you have them.', 'For a deep wound, and only if you are trained: pack the wound with clean cloth or gauze and press hard on top. Packing is for the scalp, neck, shoulder, groin and back, or a limb when you have no tourniquet. If you are not trained, keep pressing hard.', 'For a limb that keeps bleeding, apply a tourniquet 2 to 3 in (5 to 8 cm) above the wound, between the wound and the heart. Tighten until the bleeding stops. Do not place it on a joint.', 'Note the time the tourniquet was applied. Write it on the person or on the tourniquet.', 'Keep the person lying down and warm.'],
      warn: ['Do not remove a cloth that is soaked. Put one more pad on top and keep pressing. Do not build up a stack of pads.', 'Do not loosen a tourniquet. Leave it for medical staff.', 'Do not give food or drink.'],
      tip: ['Keep a tourniquet and gauze in your first-aid kit and car kit.', 'Take a bleeding-control course.'],
      after: ['Stay with the person until help arrives.', 'Tell responders when and where the tourniquet was applied.'],
      note: true
    },
    {
      id: 'g-cpr', icon: 'heart', area: 'Medical', difficulty: 'Critical',
      title: 'Hands-only CPR',
      intro: 'If an adult collapses and is not breathing normally, start chest compressions at once.',
      first: ['Check the scene is safe. Tap the person and shout. Check for breathing.', 'No response and not breathing normally: call emergency services and get an AED.', 'Start pressing on the chest now.'],
      do: ['Kneel beside the person on a firm surface.', 'Place the heel of one hand on the center of the chest. Put the other hand on top.', 'Push hard and fast: 100 to 120 compressions per minute, about 2 in (5 cm) deep and no deeper than 2.4 in (6 cm). Let the chest come back up fully.', 'Use an AED as soon as it arrives. Turn it on and follow the spoken instructions.', 'Keep going until help takes over, an AED tells you to stop, the person moves, the scene becomes unsafe, or you cannot go on.'],
      table: { head: ['CPR numbers', 'Value'], rows: [['Where', 'Center of chest'], ['Rate', '100 to 120 per minute'], ['Depth', 'About 2 in (5 cm), no more than 2.4 in (6 cm)'], ['AED', 'Use as soon as available']] },
      warn: ['Do not stop to check for a pulse once you have started.', 'Ribs may crack. Keep going.', 'Hands-only CPR is for teens and adults. Infants and children usually need breaths as well as compressions. See the child and infant CPR guide.'],
      tip: ['A song at 100 to 120 beats per minute helps keep the rhythm.', 'Take a CPR and AED course.'],
      after: ['Stay with the person until help takes over.', 'Tell responders what you did and for how long.'],
      note: true
    },
    {
      id: 'g-choking', icon: 'alert', area: 'Medical', difficulty: 'Critical',
      title: 'Choking',
      intro: 'A choking adult cannot speak, cough or breathe. Act at once.',
      first: ['Ask: "Are you choking?" If they cannot speak or cough, act now.', 'Call emergency services or ask someone else to call.', 'Give 5 back blows, then 5 abdominal thrusts.'],
      do: ['Stand behind the person. Lean them forward. Give 5 firm back blows between the shoulder blades with the heel of your hand.', 'Then make a fist above the belly button. Pull in and up firmly 5 times.', 'Repeat 5 back blows and 5 thrusts until the object comes out or the person becomes unresponsive.', 'If the person becomes unresponsive, lower them to the ground and start CPR. After each set of compressions, look in the mouth before you give breaths. Take out only an object you can see.'],
      warn: ['Do not slap the back of a person who is coughing strongly. Let them cough. Act if the cough turns weak or silent, or they cannot breathe.', 'For pregnant or very large people, give chest thrusts instead of belly thrusts.', 'Infants: use 5 back blows and 5 chest thrusts. The 2025 AHA and AAP guidance says to use the heel of one hand for the chest thrusts. An older Red Cross page says two fingers. Never use belly thrusts on an infant.'],
      tip: ['Cut food into small pieces for children.', 'Take a first-aid course to practice.'],
      after: ['Anyone who needed abdominal thrusts should be checked by a doctor.'],
      note: true
    },
    {
      id: 'g-burns', icon: 'flame', area: 'Medical', difficulty: 'Critical',
      title: 'Burns',
      intro: 'Cool the burn fast with running water.',
      first: ['Move away from the source of the burn.', 'Cool with cool running water for 10 to 20 minutes. The NHS says 20 minutes. For a chemical burn, rinse for at least 15 minutes.', 'Do not use ice, butter or ointments.'],
      do: ['Remove rings, watches and tight clothing near the burn before it swells. Do not pull off clothing stuck to the skin.', 'After cooling, cover loosely with a clean, non-stick dressing or clean plastic wrap. Chemical and electrical burns: leave them uncovered, unless help is delayed or you must travel. Then cover loosely.', 'Give pain relief if appropriate and available.', 'Keep the person warm.'],
      warn: ['Call emergency services for large burns, burns to the face, hands, feet or genitals, deep burns, chemical burns, electrical burns, or any burn in a baby or older person.', 'Do not pop blisters.', 'Do not put cold water on a large burn for too long. The person can become too cold.'],
      tip: ['Keep a burn dressing in your first-aid kit.'],
      after: ['Watch for infection: more pain, redness, pus or fever.'],
      note: true
    },
    {
      id: 'g-hypothermia', icon: 'snow', area: 'Medical', difficulty: 'Critical',
      title: 'Hypothermia',
      intro: 'The body loses heat faster than it makes it. Warm the person gently.',
      first: ['Call emergency services if the person is confused or very drowsy.', 'Move the person to a warm, dry place.', 'Remove wet clothing and wrap in blankets.'],
      do: ['Signs: shivering, slurred speech, clumsiness, confusion, drowsiness.', 'Put a blanket or sleeping pad under the person. The ground takes heat.', 'Cover the head and neck.', 'If awake and able to swallow, give warm sweet drinks.', 'Apply warm, not hot, packs to the chest, neck and groin.'],
      warn: ['Handle gently. Rough movement can harm the heart.', 'Do not rub arms and legs.', 'Do not give alcohol.', 'Do not use a hot bath or put anything hot straight on the skin. If medical care is far away, a heating pad or hot water bottle can be used, wrapped in a thin, dry cloth.'],
      tip: ['Dress in layers. Stay dry. Eat and drink.'],
      after: ['Keep the person warm and watch them. See a doctor.'],
      note: true
    },
    {
      id: 'g-heat-illness', icon: 'sun', area: 'Medical', difficulty: 'Critical',
      title: 'Heat exhaustion vs heat stroke',
      intro: 'Heat exhaustion is serious. Heat stroke is life-threatening.',
      first: ['Move the person out of the sun to a cool place.', 'Heat stroke (confusion, hot dry or very sweaty skin, body temperature about 104 F (40 C) or higher): call emergency services now. You do not need a thermometer. Confusion or collapse in the heat is the sign.', 'Cool fast: cold water, ice on neck, armpits and groin.'],
      table: { head: ['', 'Heat exhaustion', 'Heat stroke'], rows: [['Mind', 'Tired, dizzy, headache', 'Confused, may collapse'], ['Skin', 'Cool, clammy, heavy sweat', 'Hot and dry, or very sweaty'], ['Temperature', 'Normal to slightly high', 'About 104 F (40 C) or higher'], ['Action', 'Rest, cool, sip water', 'CALL emergency services, cool fast']] },
      do: ['Heat exhaustion: rest in a cool place, remove extra clothing, sip cool water, use wet cloths.', 'Heat stroke: lay the person down, cool the whole body with cold water, put ice on the neck, armpits and groin. Keep cooling until help comes.'],
      warn: ['Do not give fluids if the person is vomiting, confused or unconscious.', 'Heat exhaustion can become heat stroke. If symptoms last more than an hour or get worse, call emergency services.'],
      tip: ['Drink water before you feel thirsty.', 'Check on children, older people and pets.'],
      after: ['Rest. Drink fluids. Avoid heat for the next day.'],
      note: true
    },
    {
      id: 'g-fractures', icon: 'cross', area: 'Medical', difficulty: 'Practical',
      title: 'Fractures',
      intro: 'A broken bone needs support and stillness. Do not try to straighten it.',
      first: ['Call emergency services for severe injuries.', 'Do not move the person if you suspect a neck or back injury.', 'Keep the injured part still.'],
      do: ['Control bleeding with gentle pressure around, not on, a protruding bone.', 'Cover an open wound with a clean dressing.', 'Splint the limb in the position found. Use a rigid object such as a board or rolled newspaper, padded with cloth, extending past the joints above and below the break.', 'Apply a cold pack wrapped in cloth to reduce swelling.', 'Check the fingers or toes. If they are cold, pale or numb, loosen the splint slightly.'],
      warn: ['Do not push a bone back in.', 'Do not move someone with a suspected spine injury unless there is immediate danger.', 'Do not give food or drink if surgery may be needed.'],
      tip: ['Keep a padded splint and bandages in your kit.'],
      after: ['Keep the person calm and warm. Watch for shock.'],
      note: true
    },
    {
      id: 'g-shock', icon: 'heart', area: 'Medical', difficulty: 'Critical',
      title: 'Shock',
      intro: 'Shock means the body is not getting enough blood flow. It can follow bleeding, burns or injuries.',
      first: ['Call emergency services.', 'Lay the person down on their back. If they are drowsy or vomiting, put them on their side (recovery position).', 'Keep them warm, not hot.'],
      do: ['Signs: pale, cold, clammy skin, fast weak pulse, fast breathing, weakness, confusion.', 'Treat the cause: control bleeding.', 'Raise the legs about 6 to 12 in (15 to 30 cm) only if there is no sign of injury, and it does not cause pain or make breathing harder.', 'Cover with a blanket if they are cold. Take a layer off if they are hot.', 'Reassure the person and stay with them.'],
      warn: ['Do not give food or drink.', 'Do not move the person more than needed.'],
      tip: ['Calm talk helps. Keep the person informed.'],
      after: ['Stay with the person until medical help takes over.'],
      note: true
    }
  ],
  lists: [
    { id: 'kit72', title: '72-hour kit', items: ['Water: 1 gal (3.8 L) per person per day, 3 days', 'Water filter and purification tablets', 'Non-perishable food for 3 days', 'Can opener or ready-to-eat food', 'First-aid kit and medicines', 'Flashlight and spare batteries', 'Battery or hand-crank radio', 'Power bank and charging cables', 'Multi-tool', 'Lighter, waterproof matches or ferro rod', 'Tarp and paracord', 'Warm layer, rain jacket, socks', 'Sleeping bag or emergency blanket', 'N95 masks', 'Whistle', 'Cash in small bills', 'Copies of important documents', 'Hygiene items and toilet paper', 'Trash bags and zip bags', 'Local map'] },
    { id: 'stock14', title: 'Two-week home stock', items: ['Water: 1 gal (3.8 L) per person per day, 14 days', 'Rice, beans, pasta, oats', 'Canned meat, fish, vegetables and fruit', 'Peanut butter, nuts, dried fruit', 'Cooking oil, salt, sugar, spices', 'Powdered or shelf-stable milk', 'Baby food and formula if needed', 'Pet food', 'Prescription medicines for 14 days', 'Soap, hand sanitizer, toilet paper', 'Bleach (plain, unscented, 6%)', 'Fuel for outdoor cooking', 'Matches or lighters', 'Batteries and lanterns', 'Water filter and tablets', 'Door wedge and window film'] },
    { id: 'gobag', title: 'Go-bag', items: ['Water bottles or a filter bottle', 'Snacks and ready-to-eat food', 'First-aid kit and personal medicines', 'Flashlight or headlamp', 'Power bank and cables', 'Radio', 'Warm clothes and rain layer', 'Tarp', 'Cash in small bills', 'N95 masks', 'Whistle and signal mirror', 'Copies of documents in a waterproof bag', 'Phone numbers on paper', 'Map', 'Hygiene items', 'Glasses or contact lenses', 'Pet supplies', 'Multi-tool'] },
    { id: 'carkit', title: 'Car kit', items: ['Water and snacks', 'Blankets or sleeping bag', 'Warm hat, gloves, boots', 'Flashlight and spare batteries', 'First-aid kit', 'Jumper cables', 'Phone charger and power bank', 'Tire repair kit and pump', 'Ice scraper and small shovel', 'Reflective triangles or flares', 'Paper map', 'Basic tools', 'Cash in small bills', 'N95 masks', 'Whistle'] },
    { id: 'storm48', title: 'Before the storm (48 hours)', items: ['Charge phones, power banks and radios', 'Fill the car with fuel', 'Get cash in small bills', 'Fill bathtub and water containers', 'Bring in or tie down outdoor items', 'Check that you know your evacuation route', 'Charge and test flashlights', 'Pack the go-bag', 'Refill medicines', 'Freeze water bottles', 'Photograph the home and valuables', 'Check on neighbors', 'Know where the main water, gas and power controls are', 'Agree a family meeting place'] },
    { id: 'winter', title: 'Winter storm', items: ['Warm clothes in layers', 'Extra blankets and sleeping bags', 'One-room heating plan (no flame indoors)', 'Carbon monoxide alarm with fresh batteries', 'Food that needs no cooking', 'Water, 1 gal (3.8 L) per person per day', 'Flashlights and battery radio', 'Snow shovel and ice melt', 'Car kit with blanket and shovel', 'Full fuel tank', 'Medicines for 7 days', 'Pet supplies', 'Insulation for windows', 'Power bank'] },
    { id: 'docs', title: 'Important documents', items: ['Passports and ID cards', 'Birth and marriage certificates', 'Insurance policies', 'Medical records and prescriptions', 'Property deeds and rental agreements', 'Bank and card details', 'Emergency contact list', 'Vaccination records', 'Photos of valuables', 'Pet records', 'Digital copies on an encrypted USB drive', 'Waterproof pouch for originals'] },
    { id: 'quarterly', title: 'Quarterly check', items: ['Check expiry dates on food and medicines', 'Replace batteries in flashlights and alarms', 'Test smoke and carbon monoxide alarms', 'Rotate stored water', 'Charge power banks and radios', 'Refresh the go-bag for the season', 'Update the family plan and phone numbers', 'Refill car fuel and check the car kit', 'Practice a drill with the family', 'Restock anything used'] }
  ]
};
