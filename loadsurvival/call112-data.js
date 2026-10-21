/* What to say when you call 112 in Portugal: English and Portuguese, by reason.
   Written 21 Oct 2026. The Portuguese was NOT reviewed by a native speaker. The phrases are simple and standard.
   Ask a Portuguese speaker to check them. Where the Portuguese has a male and female form, both are shown with a slash. */
window.LOAD_CALL112 = {
  intro: "Call 112. The call is free. Speak slowly. Say where you are first. Stay on the line.",
  status: "Not confirmed: this Portuguese was not reviewed by a native speaker. Ask a Portuguese speaker to check it.",
  groups: [
    { id: "start", title: "Start here: say this first", rows: [
      ["I need help. This is an emergency.", "Preciso de ajuda. É uma emergência."],
      ["Do you speak English?", "Fala inglês?"],
      ["I do not speak Portuguese well.", "Não falo bem português."],
      ["Please speak slowly.", "Fale devagar, por favor."],
      ["My address is:", "A minha morada é:"],
      ["Street, number, town", "Rua, número, localidade"],
      ["I am near:", "Estou perto de:"],
      ["I do not know where I am.", "Não sei onde estou."],
      ["My phone number is:", "O meu número de telefone é:"]
    ] },
    { id: "medical", title: "Someone is hurt or ill", rows: [
      ["Someone is hurt.", "Alguém está ferido/a."],
      ["Someone is not breathing.", "Alguém não está a respirar."],
      ["Someone is unconscious.", "Alguém está inconsciente."],
      ["Someone is bleeding badly.", "Alguém está a sangrar muito."],
      ["Chest pain.", "Dor no peito."],
      ["I think it is a stroke.", "Acho que é um AVC."],
      ["Someone is having a seizure.", "Alguém está com uma convulsão."],
      ["Severe allergic reaction.", "Reação alérgica grave."],
      ["Someone is choking.", "Alguém está engasgado/a."],
      ["Someone swallowed poison.", "Alguém ingeriu veneno."],
      ["A baby is being born.", "Vai nascer um bebé."],
      ["It is a child.", "É uma criança."],
      ["It is an older person.", "É uma pessoa idosa."]
    ] },
    { id: "fire", title: "Fire, smoke or gas", rows: [
      ["There is a fire.", "Há um incêndio."],
      ["There is a wildfire near:", "Há um incêndio florestal perto de:"],
      ["People are trapped.", "Há pessoas presas."],
      ["I smell gas.", "Sinto cheiro a gás."],
      ["There is a lot of smoke.", "Há muito fumo."]
    ] },
    { id: "police", title: "Danger from a person", rows: [
      ["I need the police.", "Preciso da polícia."],
      ["I am being threatened.", "Estou a ser ameaçado/a."],
      ["There is a robbery.", "Há um assalto."],
      ["Someone has a weapon.", "Alguém tem uma arma."],
      ["I am in danger at home.", "Estou em perigo em casa."],
      ["A child is missing.", "Uma criança desapareceu."]
    ] },
    { id: "accident", title: "Accident or other emergency", rows: [
      ["There was a car accident.", "Houve um acidente de carro."],
      ["There are injured people.", "Há feridos."],
      ["There is a flood.", "Há uma inundação."],
      ["We are stuck in a lift.", "Estamos presos no elevador."],
      ["I am lost in the mountains.", "Estou perdido/a na montanha."],
      ["I am in danger at sea.", "Estou em perigo no mar."]
    ] },
    { id: "answers", title: "What they may ask, and your answer", rows: [
      ["What is the emergency?", "Qual é a emergência?"],
      ["Where are you?", "Onde está?"],
      ["How many people are hurt?", "Quantas pessoas estão feridas?"],
      ["Is he or she breathing?", "Está a respirar?"],
      ["Is he or she awake?", "Está consciente?"],
      ["Yes / No", "Sim / Não"],
      ["I do not know.", "Não sei."],
      ["Stay on the line.", "Fique na linha."],
      ["Do not hang up.", "Não desligue."],
      ["Help is on the way.", "A ajuda está a caminho."],
      ["Thank you.", "Obrigado/a."]
    ] }
  ],
  tips: [
    "Say where you are first. If you cannot say the address, give a landmark or the nearest road.",
    "Say what happened in one short sentence.",
    "Do not hang up until they tell you to.",
    "Keep your phone free and switched on in case they call back.",
    "Send someone outside to meet the ambulance if you can."
  ],
  sources: [["INEM: Instituto Nacional de Emergência Médica", "https://www.inem.pt/"], ["ANEPC: Proteção Civil", "https://prociv.gov.pt/"]],
  unconfirmed: [
    "The Portuguese phrases were written by us and not reviewed by a native speaker. Check them with a Portuguese speaker before you rely on them.",
    "We did not check whether the 112 operator speaks English at all hours. Use the Portuguese phrases if they do not.",
    "The question list is typical of emergency calls. The exact questions can differ."
  ]
};
