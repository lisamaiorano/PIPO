const GAME_URL = "GAME_URL_PLACEHOLDER";

window.PIPO_PUZZLES = [
  {
    id: "auth",
    title: "BOOT // AUTHENTICATION",
    progress: "AUTHENTICATION",
    type: "input",
    label: "Enter callsign",
    answer: ["pipo"],
    normalize: "word",
    intro: [
      "╔════════════════════════════════╗",
      "║  DEEP SPACE SIGNAL MONITOR    ║",
      "╚════════════════════════════════╝",
      "",
      "[BOOT SEQUENCE]",
      "Initializing telescope.......... OK",
      "Initializing optical sensor..... OK",
      "Initializing signal decoder..... OK",
      "Initializing security layer..... OK",
      "",
      "Searching for anomalous signals...",
      "",
      "1 signal detected.",
      "IDENTITY MATCH FOUND.",
      "",
      "TARGET: PIPO",
      "ACCESS LEVEL: 0",
      "",
      "Authentication required."
    ],
    hints: [
      "The system already identified the intended target.",
      "Use the target as the callsign.",
      "Type PIPO."
    ],
    wrong: [
      "CALLSIGN MISMATCH. Target identity remains locked.",
      "The receiver is personal. Try the name the system keeps repeating."
    ],
    success: "AUTHENTICATION ACCEPTED. Welcome, Pipo."
  },
  {
    id: "signal",
    title: "LEVEL 1 // SIGNAL DETECTION",
    progress: "SIGNAL PATTERN",
    type: "input",
    label: "Pattern output",
    answer: ["lisa"],
    normalize: "word",
    intro: [
      "Optical array has isolated four anomalous points.",
      "The normal stars are noise. Read only the marked coordinates.",
      "",
      "RULE DISCOVERED BY SENSOR:",
      "x = alphabet index, where 1=A, 2=B, 3=C..."
    ],
    custom: "starMap",
    hints: [
      "Ignore the faint background stars. Only the four bright nodes matter.",
      "Read the marked nodes from left to right by their sequence number.",
      "Convert x coordinates 12, 9, 19, 1 into letters."
    ],
    wrong: [
      "PATTERN REJECTED. The coordinates are valid, but the word is not.",
      "The y axis confirms the row; the x axis is the part that decodes."
    ],
    success: "PATTERN CONFIRMED. Signal structure identified. Proceeding to decoding layer..."
  },
  {
    id: "decoder",
    title: "LEVEL 2 // ENCODING LAYER",
    progress: "DECODER",
    type: "input",
    label: "Decoded token",
    answer: ["chill"],
    normalize: "word",
    intro: [
      "SIGNAL FRAGMENT",
      "",
      "01000110 01001011 01001100 01001111 01001111",
      "",
      "HEADER:",
      "binary_ascii=true",
      "caesar_shift=-3",
      "",
      "Decode the binary into text, then reverse the shift."
    ],
    hints: [
      "Split the data into binary bytes. Each byte becomes one ASCII character.",
      "The ASCII result is shifted three letters forward. Reverse it.",
      "FKLOO shifted back by 3 becomes CHILL."
    ],
    wrong: [
      "DECODER WARNING. The token is not in the expected memory format.",
      "Two passes are required: binary to ASCII, then Caesar -3."
    ],
    success: "TOKEN ACCEPTED. Decoder found a strangely relaxed response."
  },
  {
    id: "security",
    title: "LEVEL 3 // SECURITY LOG",
    progress: "SECURITY LOG",
    type: "input",
    label: "Date required",
    answer: ["14/04/2025", "14-04-2025", "14.04.2025", "14042025", "2025-04-14"],
    normalize: "date",
    intro: [
      "[AUTHENTICATION LOG]",
      "",
      "22:41:03 ssh login failed      user=pipo source=unknown",
      "22:41:04 ssh login failed      user=pipo source=unknown",
      "22:41:07 ssh login accepted    user=pipo source=beach-node",
      "",
      "MESSAGE:",
      "The key was created on the day the signal first existed.",
      "",
      "Recovered fragments:",
      "beach-node/day: 14",
      "observer/month: 04",
      "first_signal/year: 2025",
      "",
      "DATE REQUIRED: DD / MM / YYYY"
    ],
    hints: [
      "The log says the accepted source was beach-node.",
      "Use the three recovered fragments in the requested order.",
      "The date is 14 / 04 / 2025."
    ],
    wrong: [
      "DATE REJECTED. Format can vary, but the three fragments must match.",
      "The system wants DD/MM/YYYY from day, month, and year fragments."
    ],
    success: "TEMPORAL KEY ACCEPTED. Archive memory index unlocked."
  },
  {
    id: "logic",
    title: "LEVEL 4 // LOGIC CORE",
    progress: "LOGIC CORE",
    type: "input",
    label: "Where is the signal? A, B, or C",
    answer: ["c", "server c", "node c"],
    normalize: "word",
    intro: [
      "Three mirrored servers responded. The signal is stored on exactly one server.",
      "Exactly one server statement is true.",
      "",
      "SERVER A: The signal is on Server B.",
      "SERVER B: The signal is not on Server C.",
      "SERVER C: Server A is lying.",
      "",
      "WHERE IS THE SIGNAL?"
    ],
    hints: [
      "Test each possible storage location and count true statements.",
      "If the signal were on A or B, two statements become true. That violates the rule.",
      "Only Server C makes exactly one statement true."
    ],
    explanation: "If the signal is on A, A is false, B is true, and C is true: two true statements. If it is on B, A and B are true while C is false: two true statements. If it is on C, A is false, B is false, and C is true: exactly one true statement. Final storage node: C.",
    wrong: [
      "TRUTH TABLE INVALID. Count the number of true statements for that location.",
      "Only one statement may be true, and the mirror checksum requires a lying pointer chain."
    ],
    success: "LOGIC CORE SATISFIED. Signal fragment recovered from Server C."
  },
  {
    id: "terminal",
    title: "LEVEL 5 // TERMINAL SANDBOX",
    progress: "TERMINAL",
    type: "terminal",
    answer: ["decode signal.enc"],
    intro: [
      "Controlled Linux shell initialized.",
      "Explore the virtual filesystem and recover the launch phrase.",
      "",
      "Type help if you need available commands."
    ],
    hints: [
      "Start with ls, then cat files that look useful.",
      "notes.txt explains the coordinates. signal.enc needs the decode command.",
      "Run: decode signal.enc"
    ],
    success: "SANDBOX COMPLETE. No real systems were harmed."
  },
  {
    id: "hypnosis",
    title: "LEVEL 6 // NEURAL INTERFACE",
    progress: "NEURAL INTERFACE",
    type: "button",
    buttonText: "Initialize module",
    intro: [
      "╔══════════════════════════════╗",
      "║      NEURAL INTERFACE        ║",
      "╚══════════════════════════════╝",
      "",
      "WARNING:",
      "Unauthorized motor-control interface detected.",
      "",
      "This is a joke module. No actual hypnosis, no medical claims, no weird science.",
      "Just press initialize and watch the system embarrass itself."
    ],
    hints: [
      "This module is intentionally not a real puzzle.",
      "Press the initialize button.",
      "The machine is about to lose an argument with Pipo."
    ],
    success: "HYPNOSIS MODULE FAILED. Reason: Pipo's girlfriend is too powerful. Or maybe you just blinked."
  },
  {
    id: "memory",
    title: "LEVEL 7 // THE BEACH",
    progress: "MEMORY",
    type: "input",
    label: "Answer received",
    answer: ["chill"],
    normalize: "word",
    intro: [
      "Retrieving archived file...",
      "",
      "memory_2025-04-14.log",
      "",
      "MEMORY RECOVERED",
      "",
      "DATE: 14 APRIL 2025",
      "LOCATION: BEACH",
      "EVENT: CLASSIFIED",
      "",
      "Two people.",
      "One beach.",
      "One confession.",
      "One answer.",
      "",
      "ANSWER RECEIVED: ______"
    ],
    hints: [
      "The decoder already recovered a strangely relaxed token.",
      "It is one lowercase word, preserved exactly as the memory recorded it.",
      "The answer is chill."
    ],
    wrong: [
      "MEMORY CHECK FAILED. The archive is very specific about the answer.",
      "Do not make it more romantic than it was. The system respects historical accuracy."
    ],
    success: "MEMORY VERIFIED. Emotional payload detected."
  },
  {
    id: "final",
    title: "FINAL // SOURCE IDENTIFICATION",
    progress: "FINAL SIGNAL",
    type: "final",
    intro: [
      "DECODING FINAL SIGNAL...",
      "",
      "████████████████████ 100%",
      "",
      "SOURCE IDENTIFICATION:",
      "",
      "NOT A STAR.",
      "NOT A SATELLITE.",
      "NOT AN ALIEN SIGNAL.",
      "",
      "SOURCE:",
      "",
      "LISA"
    ],
    hints: [],
    success: "SIGNAL IDENTIFIED."
  }
];

window.PIPO_TERMINAL = {
  files: {
    "README.txt": "DEEP SPACE SIGNAL SANDBOX\n\nCommands are simulated. Try ls, cat, whoami, uptime, help, clear, decode.\nObjective: recover the launch phrase hidden in signal.enc.",
    "notes.txt": "The observer knows where to look, but not what to see.\nCoordinates: 14.04.25\nIf a file looks encoded, do not cat harder. Decode it.",
    "access.log": "ssh accepted for pipo from beach-node\nkey_date=14.04.2025\ncomment=the day the signal first existed",
    "signal.enc": "base64: c2NhbiB0byBiZWdpbg==\nexpected_command: decode signal.enc",
    ".secret": "You weren't supposed to find this yet.\nBut I'm glad you did."
  },
  easterEggs: {
    "sudo": "Nice try, Pipo.",
    "sudo make_me_a_sandwich": "Permission denied.\n\nReason:\nYou already have a girlfriend.",
    "uname -a": "pipo-observatory 14.04.2025-lisa #1 SMP PREEMPT_SIGNAL x86_64 GNU/chill",
    "uptime": "relationship_uptime: forever",
    "date": "Mon Apr 14 22:41:07 beach-node time",
    "telnet stars": "Connection refused. Stars only accept photons.",
    "rm -rf /": "Simulation protected. Universe not deleted.",
    "hypnotize pipo": "ERROR: subject resistance detected."
  }
};
