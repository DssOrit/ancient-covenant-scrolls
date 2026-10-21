/* What to say when you call 112 in Portugal: English and Portuguese, by reason.
   Written 21 Oct 2026. Revised 23 Oct 2026 after our own check and an AI assistant's review (Portugal_112_European_Portuguese_Phrase_Review.docx).
   The Portuguese has NOT been reviewed by a native speaker. Rows are [English, Portuguese, optional text for the Listen voice].
   Lines are written without male or female endings, so the voice reads them cleanly. */
window.LOAD_CALL112 = {
  intro: "Call 112. The call is free. Speak slowly. Say where you are first. Stay on the line.",
  status: "Not confirmed: this Portuguese was checked by us and by an AI assistant, not by a native speaker. Ask a Portuguese speaker to check it. It is a communication aid, not an official 112 script. Follow the operator's instructions.",
  groups: [
    { id: "start", title: "Start here: say this first", rows: [
      ["I need help. This is an emergency.", "Preciso de ajuda. É uma emergência."],
      ["I need an ambulance.", "Preciso de uma ambulância."],
      ["Do you speak English?", "Fala inglês?"],
      ["Please call someone who speaks English.", "Pode chamar alguém que fale inglês?"],
      ["I do not speak Portuguese well.", "Não falo bem português."],
      ["Please speak slowly.", "Fale devagar, por favor."],
      ["I did not understand. Can you repeat?", "Não percebi. Pode repetir?"],
      ["I cannot speak loudly.", "Não posso falar em voz alta."],
      ["I cannot get out.", "Não consigo sair."]
    ] },
    { id: "where", title: "Say where you are", rows: [
      ["My address is:", "A minha morada é:"],
      ["The street is:", "A rua é:"],
      ["The number is:", "O número é:"],
      ["The town is:", "A localidade é:"],
      ["I am near:", "Estou perto de:"],
      ["I am on the motorway.", "Estou na autoestrada."],
      ["I am at kilometre:", "Estou no quilómetro:"],
      ["I do not know where I am.", "Não sei onde estou."],
      ["My phone number is:", "O meu número de telefone é:"]
    ] },
    { id: "medical", title: "Someone is hurt or ill", rows: [
      ["Someone is hurt.", "Há uma pessoa ferida."],
      ["Someone is not breathing.", "Alguém não está a respirar."],
      ["Someone is breathing with difficulty.", "A pessoa respira com dificuldade."],
      ["Someone does not respond.", "Há uma pessoa que não responde."],
      ["I cannot wake this person.", "Não consigo acordar esta pessoa."],
      ["Someone is bleeding badly.", "Alguém está a sangrar muito."],
      ["I have strong chest pain.", "Tenho uma dor forte no peito."],
      ["Someone has strong chest pain.", "Alguém tem uma dor forte no peito."],
      ["I think someone is having a stroke.", "Acho que alguém está a ter um AVC.", "Acho que alguém está a ter um A V C."],
      ["The person has trouble speaking and one side of the face is drooping.", "A pessoa tem dificuldade em falar e um lado da cara está descaído."],
      ["Someone is having a seizure.", "Alguém está a ter uma convulsão."],
      ["Someone is having a severe allergic reaction.", "Alguém está com uma reação alérgica grave."],
      ["The person has an allergic reaction and trouble breathing.", "A pessoa tem uma reação alérgica e dificuldade em respirar."],
      ["Someone is choking and cannot breathe.", "Há uma pessoa engasgada que não consegue respirar."],
      ["Someone swallowed a toxic substance.", "Alguém engoliu uma substância tóxica."],
      ["A baby is about to be born.", "O bebé está prestes a nascer."],
      ["It is a child.", "É uma criança."],
      ["It is an older person.", "É uma pessoa idosa."]
    ] },
    { id: "fire", title: "Fire, smoke or gas", rows: [
      ["There is a fire.", "Há um incêndio."],
      ["There is a wildfire near: (term used by civil protection)", "Há um incêndio rural perto de:"],
      ["There is a wildfire near: (common term)", "Há um incêndio florestal perto de:"],
      ["People are trapped.", "Há pessoas presas."],
      ["I smell gas.", "Sinto cheiro a gás."],
      ["There is a lot of smoke.", "Há muito fumo."]
    ] },
    { id: "police", title: "Danger from a person", rows: [
      ["I need the police.", "Preciso da polícia."],
      ["I am being threatened.", "Estão a ameaçar-me."],
      ["A robbery is happening now.", "Está a acontecer um assalto."],
      ["Someone has a weapon.", "Alguém tem uma arma."],
      ["I am in danger at home.", "Estou em perigo em casa."],
      ["A child is missing.", "Uma criança desapareceu."]
    ] },
    { id: "accident", title: "Accident or other emergency", rows: [
      ["There was a car accident.", "Houve um acidente de carro."],
      ["There are injured people.", "Há feridos."],
      ["There are two people who need help.", "Há duas pessoas a precisar de ajuda."],
      ["It happened a few minutes ago.", "Aconteceu há poucos minutos."],
      ["There is a flood.", "Há uma inundação."],
      ["We are stuck in a lift.", "Estamos presos no elevador."],
      ["I am lost in the mountains.", "Perdi-me na montanha."],
      ["I am in danger at sea.", "Estou em perigo no mar."]
    ] },
    { id: "answers", title: "What they may ask, and your answer", rows: [
      ["What is the emergency?", "Qual é a emergência?"],
      ["Where are you?", "Onde está?"],
      ["How many people are hurt?", "Quantas pessoas estão feridas?"],
      ["Is he or she breathing?", "Está a respirar?"],
      ["Is he or she awake?", "Está consciente?"],
      ["Yes.", "Sim."],
      ["No.", "Não."],
      ["I do not know.", "Não sei."],
      ["Stay on the line.", "Fique na linha."],
      ["Do not hang up.", "Não desligue."],
      ["Help is on the way.", "A ajuda está a caminho."],
      ["Thank you (a man is speaking).", "Obrigado."],
      ["Thank you (a woman is speaking).", "Obrigada."]
    ] }
  ],
  tips: [
    "Say where you are first. If you cannot say the address, give a landmark, the road or the kilometre.",
    "Say what happened in one short sentence.",
    "Do not hang up until they tell you to.",
    "Keep your phone free and switched on in case they call back.",
    "Send someone outside to meet the ambulance if you can.",
    "The operator decides what help to send and gives instructions. Do what they say.",
    "These phrases are a communication aid, not medical advice."
  ],
  sources: [["INEM: Instituto Nacional de Emergência Médica", "https://www.inem.pt/"], ["ANEPC: Proteção Civil", "https://prociv.gov.pt/"]],
  unconfirmed: [
    "The Portuguese phrases were written by us, then checked by us and by an AI assistant. No native speaker or emergency-service professional has reviewed them. Check them with a Portuguese speaker before you rely on them.",
    "We did not check whether the 112 operator speaks English at all hours. Use the Portuguese phrases if they do not.",
    "The question list is typical of emergency calls. The exact questions can differ.",
    "The voice is your device's own Portuguese voice. We did not test it on a real iPad. 'A V C' is spelled out for the voice, and we do not know how every voice reads it."
  ]
};
