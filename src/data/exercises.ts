import type { Exercise } from "../exercises/types";

export const SAMPLE_EXERCISES: Exercise[] = [



  {

    id: "hir_ex_001",

    type: "recognition-kana",

    answerFormat: "choice",

    objective: "Reconnaître les voyelles hiragana",

    difficulty: 1,

    prompt: "Comment se prononce ce caractère ?",

    expectedAnswers: [{ value: "a", comparison: "exact", score: 1 }],

    explanation: "あ \"\"",

    conceptId: "hir_001",

    data: { character: "あ", options: ["a", "i", "u", "e"], correctIndex: 0 }

  },



  {

    id: "hir_ex_002",

    type: "recognition-kana",

    answerFormat: "choice",

    objective: "Reconnaître les voyelles hiragana",

    difficulty: 1,

    prompt: "Comment se prononce ce caractère ?",

    expectedAnswers: [{ value: "i", comparison: "exact", score: 1 }],

    explanation: "い \"\"",

    conceptId: "hir_002",

    data: { character: "い", options: ["a", "i", "u", "e"], correctIndex: 1 }

  },



  {

    id: "hir_ex_003",

    type: "recognition-kana",

    answerFormat: "choice",

    objective: "Reconnaître les consonnes hiragana",

    difficulty: 1,

    prompt: "Comment se prononce ce caractère ?",

    expectedAnswers: [{ value: "ka", comparison: "exact", score: 1 }],

    explanation: "か se prononce-ka",

    conceptId: "hir_006",

    data: { character: "か", options: ["ka", "ki", "ku", "ke"], correctIndex: 0 }

  },



  {

    id: "hir_ex_004",

    type: "recognition-kana",

    answerFormat: "choice",

    objective: "Reconnaître les dakuten",

    difficulty: 2,

    prompt: "Comment se prononce ce caractère ?",

    expectedAnswers: [{ value: "ga", comparison: "exact", score: 1 }],

    explanation: "が se prononce-ga (dakuten)",

    conceptId: "hir_dakuten_001",

    data: { character: "が", options: ["ka", "ga", "ha", "ba"], correctIndex: 1 }

  },



  {

    id: "kan_ex_001",

    type: "recognition-kana",

    answerFormat: "choice",

    objective: "Reconnaître les voyelles katakana",

    difficulty: 1,

    prompt: "Comment se prononce ce caractère ?",

    expectedAnswers: [{ value: "a", comparison: "exact", score: 1 }],

    explanation: "ア \"\"",

    conceptId: "kan_001",

    data: { character: "ア", options: ["a", "i", "u", "e"], correctIndex: 0 }

  },



  {

    id: "kan_ex_002",

    type: "recognition-kana",

    answerFormat: "choice",

    objective: "Reconnaître les consonnes katakana",

    difficulty: 1,

    prompt: "Comment se prononce ce caractère ?",

    expectedAnswers: [{ value: "ka", comparison: "exact", score: 1 }],

    explanation: "カ se prononce-ka",

    conceptId: "kan_con_001",

    data: { character: "カ", options: ["ka", "ki", "ku", "ke"], correctIndex: 0 }

  },



  {

    id: "voc_ex_001",

    type: "recognition-vocab",

    answerFormat: "choice",

    objective: "Connaître le vocabulaire de base",

    difficulty: 1,

    prompt: "Comment dit-on \"eau\" en japonais ?",

    expectedAnswers: [{ value: "mizu", comparison: "exact", score: 1 }],

    explanation: "みず (水) signifie \"eau\"",

    conceptId: "vocab-nourriture",

    data: { "reading-comprehension": "みず", options: ["mizu", "hi", "kaze", "yama"], correctIndex: 0 }

  },



  {

    id: "voc_ex_002",

    type: "recognition-vocab",

    answerFormat: "choice",

    objective: "Connaître le vocabulaire de base",

    difficulty: 1,

    prompt: "Comment dit-on \"soleil\" en japonais ?",

    expectedAnswers: [{ value: "taiyou", comparison: "exact", score: 1 }],

    explanation: "たいよう (太陽) signifie \"soleil\"",

    conceptId: "vocab-temps",

    data: { "reading-comprehension": "たいよう", options: ["tsuki", "hoshi", "taiyou", "sora"], correctIndex: 2 }

  },



  {

    id: "voc_ex_003",

    type: "recognition-vocab",

    answerFormat: "choice",

    objective: "Connaître le vocabulaire de base",

    difficulty: 1,

    prompt: "Comment dit-on \"père\" en japonais ?",

    expectedAnswers: [{ value: "otousan", comparison: "exact", score: 1 }],

    explanation: "おとうさん (お父さん) signifie \"père\"",

    conceptId: "vocab-famille",

    data: { "reading-comprehension": "おとうさん", options: ["okaasan", "otousan", "oniisan", "oneesan"], correctIndex: 1 }

  },



  {

    id: "kanji_ex_001",

    type: "recognition-kanji",

    answerFormat: "choice",

    objective: "Connaître les kanji de base",

    difficulty: 1,

    prompt: "Quel est le sens de ce kanji ?",

    expectedAnswers: [{ value: "soleil/jour", comparison: "exact", score: 1 }],

    explanation: "日 (ひ/にち) signifie \"soleil\" ou \"jour\"",

    conceptId: "kanji_001",

    data: { kanji: "日", options: ["soleil/jour", "lune", "étoile", "ciel"], correctIndex: 0 }

  },



  {

    id: "kanji_ex_002",

    type: "recognition-kanji",

    answerFormat: "choice",

    objective: "Connaître les kanji de base",

    difficulty: 1,

    prompt: "Quel est le sens de ce kanji ?",

    expectedAnswers: [{ value: "montagne", comparison: "exact", score: 1 }],

    explanation: "山 (やま) signifie \"montagne\"",

    conceptId: "kanji_002",

    data: { kanji: "山", options: ["rivière", "montagne", "forêt", "plaine"], correctIndex: 1 }

  },



  {

    id: "gra_ex_001",

    type: "grammar-fill",

    answerFormat: "multi-choice",

    objective: "Identifier la particule de sujet",

    difficulty: 1,

    prompt: "Quelle particule marque le sujet dans \"わたしは いしゃです\" ?",

    expectedAnswers: [{ value: "は", comparison: "exact", score: 1 }],

    explanation: "は (wa) est la particule de sujet.",

    conceptId: "gra_001",

    data: { options: ["は", "を", "に", "の"], correctAnswer: "は" }

  },



  {

    id: "gra_ex_002",

    type: "translation",

    answerFormat: "text",

    objective: "Traduire une phrase simple",

    difficulty: 1,

    prompt: "Traduisez : \"みず を のみます\"",

    expectedAnswers: [{ value: "mizu o nomimasu", comparison: "case-insensitive", score: 1 }, { value: "je bois de l'eau", comparison: "case-insensitive", score: 1 }],

    explanation: "を marque l\"objet direct.",

    conceptId: "gra_002",

    data: { hint: "mizu = eau, nomu = boire" }

  },



  {

    id: "gra_ex_003",

    type: "grammar-fill",

    answerFormat: "match",

    objective: "Associer particule et fonction",

    difficulty: 2,

    prompt: "Quelle particule marque le complément d\"objet direct ?",

    expectedAnswers: [{ value: "を", comparison: "exact", score: 1 }],

    explanation: "を (o) marque le COD.",

    conceptId: "gra_002",

    data: { options: ["は", "を", "に", "の"], correctAnswer: "を" }

  },



  {

    id: "gra_ex_004",

    type: "grammar-fill",

    answerFormat: "multi-choice",

    objective: "Identifier la particule de possession",

    difficulty: 2,

    prompt: "Dans \"わたしほん\", quelle particule indique la possession ?",

    expectedAnswers: [{ value: "の", comparison: "exact", score: 1 }],

    explanation: "の (no) indique la possession.",

    conceptId: "gra_004",

    data: { options: ["は", "を", "に", "の"], correctAnswer: "の" }

  },



  {

    id: "gra_ex_005",

    type: "translation",

    answerFormat: "text",

    objective: "Traduire une phrase affirmative",

    difficulty: 1,

    prompt: "Traduisez : \"たべます\"",

    expectedAnswers: [{ value: "tabemasu", comparison: "exact", score: 1 }, { value: "je mange", comparison: "case-insensitive", score: 1 }],

    explanation: "ます marque l'affirmatif poli.",

    conceptId: "gra_008",

    data: { hint: "tabe = manger" }

  },



  {

    id: "gra_ex_006",

    type: "grammar-fill",

    answerFormat: "multi-choice",

    objective: "Identifier la forme négative",

    difficulty: 1,

    prompt: "Quelle est la forme négative de \"たべます\" ?",

    expectedAnswers: [{ value: "たべません", comparison: "exact", score: 1 }],

    explanation: "ません marque la négation polie.",

    conceptId: "gra_009",

    data: { options: ["たべません", "たべない", "たべた", "たべて"], correctAnswer: "たべません" }

  },



  {

    id: "gra_ex_007",

    type: "reading-comprehension",

    answerFormat: "multi-choice",

    objective: "Identifier une question",

    difficulty: 1,

    prompt: "Comment transforme-t-on une phrase en question ?",

    expectedAnswers: [{ value: "か", comparison: "exact", score: 1 }],

    explanation: "か marque la question.",

    conceptId: "gra_014",

    data: { options: ["Ajouter か à la fin", "Changer le verbe", "Ajouter は", "Changer la particule"], correctAnswer: "Ajouter か à la fin" }

  },



  {

    id: "gra_ex_008",

    type: "grammar-fill",

    answerFormat: "multi-choice",

    objective: "Identifier la forme passée affirmative",

    difficulty: 2,

    prompt: "Quelle est la forme passée de \"たべます\" ?",

    expectedAnswers: [{ value: "たべました", comparison: "exact", score: 1 }],

    explanation: "ました marque la forme passée affirmative.",

    conceptId: "gra_016",

    data: { options: ["たべました", "たべませんでした", "たべない", "たべた"], correctAnswer: "たべました" }

  },



  {

    id: "gra_ex_009",

    type: "translation",

    answerFormat: "text",

    objective: "Traduire une phrase au passé",

    difficulty: 2,

    prompt: "Traduisez : \"たべませんでした\"",

    expectedAnswers: [{ value: "tabemasen deshita", comparison: "case-insensitive", score: 1 }, { value: "je n'ai pas mangé", comparison: "case-insensitive", score: 1 }],

    explanation: "ませんでした marque la négation au passé.",

    conceptId: "gra_017",

    data: { hint: "tabe = manger, masen = négatif, deshita = passé" }

  },



  {

    id: "gra_ex_010",

    type: "grammar-fill",

    answerFormat: "multi-choice",

    objective: "Identifier la forme de volonté",

    difficulty: 3,

    prompt: "Comment dit-on \"Allons-y\" en japonais ?",

    expectedAnswers: [{ value: "いきましょう", comparison: "exact", score: 1 }],

    explanation: "ましょう exprime la volonté ou la suggestion.",

    conceptId: "gra_019",

    data: { options: ["いきましょう", "いきます", "いきますか", "いきました"], correctAnswer: "いきましょう" }

  },



  {

    id: "hir_ex_005",

    type: "recognition-kana",

    answerFormat: "choice",

    objective: "Reconnaître les voyelles hiragana",

    difficulty: 1,

    prompt: "Comment se prononce ce caractère ?",

    expectedAnswers: [{ value: "u", comparison: "exact", score: 1 }],

    explanation: "う \"\"",

    conceptId: "hir_003",

    data: { character: "う", options: ["a", "i", "u", "e"], correctIndex: 2 }

  },



  {

    id: "hir_ex_006",

    type: "recognition-kana",

    answerFormat: "choice",

    objective: "Reconnaître les voyelles hiragana",

    difficulty: 1,

    prompt: "Comment se prononce ce caractère ?",

    expectedAnswers: [{ value: "e", comparison: "exact", score: 1 }],

    explanation: "え \"\"",

    conceptId: "hir_004",

    data: { character: "え", options: ["a", "i", "e", "o"], correctIndex: 2 }

  },



  {

    id: "hir_ex_007",

    type: "recognition-kana",

    answerFormat: "choice",

    objective: "Reconnaître les voyelles hiragana",

    difficulty: 1,

    prompt: "Comment se prononce ce caractère ?",

    expectedAnswers: [{ value: "o", comparison: "exact", score: 1 }],

    explanation: "お \"\"",

    conceptId: "hir_005",

    data: { character: "お", options: ["a", "i", "e", "o"], correctIndex: 3 }

  },



  {

    id: "hir_ex_008",

    type: "recognition-kana",

    answerFormat: "choice",

    objective: "Reconnaître les consonnes hiragana",

    difficulty: 1,

    prompt: "Comment se prononce ce caractère ?",

    expectedAnswers: [{ value: "ki", comparison: "exact", score: 1 }],

    explanation: "き se prononce-ki",

    conceptId: "hir_007",

    data: { character: "き", options: ["ka", "ki", "ku", "ke"], correctIndex: 1 }

  },



  {

    id: "hir_ex_009",

    type: "recognition-kana",

    answerFormat: "choice",

    objective: "Reconnaître les consonnes hiragana",

    difficulty: 1,

    prompt: "Comment se prononce ce caractère ?",

    expectedAnswers: [{ value: "ku", comparison: "exact", score: 1 }],

    explanation: "く se prononce-ku",

    conceptId: "hir_008",

    data: { character: "く", options: ["ka", "ki", "ku", "ke"], correctIndex: 2 }

  },



  {

    id: "hir_ex_010",

    type: "recognition-kana",

    answerFormat: "choice",

    objective: "Reconnaître les consonnes hiragana",

    difficulty: 1,

    prompt: "Comment se prononce ce caractère ?",

    expectedAnswers: [{ value: "ke", comparison: "exact", score: 1 }],

    explanation: "け se prononce-ke",

    conceptId: "hir_009",

    data: { character: "け", options: ["ka", "ki", "ku", "ke"], correctIndex: 3 }

  },



  {

    id: "hir_ex_011",

    type: "recognition-kana",

    answerFormat: "choice",

    objective: "Reconnaître les consonnes hiragana",

    difficulty: 1,

    prompt: "Comment se prononce ce caractère ?",

    expectedAnswers: [{ value: "ko", comparison: "exact", score: 1 }],

    explanation: "こ se prononce-ko",

    conceptId: "hir_010",

    data: { character: "こ", options: ["ka", "ki", "ku", "ko"], correctIndex: 3 }

  },



  {

    id: "hir_ex_012",

    type: "recognition-kana",

    answerFormat: "choice",

    objective: "Reconnaître les dakuten",

    difficulty: 2,

    prompt: "Comment se prononce ce caractère ?",

    expectedAnswers: [{ value: "za", comparison: "exact", score: 1 }],

    explanation: "ざ se prononce-za (dakuten)",

    conceptId: "hir_dakuten_002",

    data: { character: "ざ", options: ["sa", "za", "sha", "za"], correctIndex: 1 }

  },



  {

    id: "hir_ex_013",

    type: "recognition-kana",

    answerFormat: "choice",

    objective: "Reconnaître les dakuten",

    difficulty: 2,

    prompt: "Comment se prononce ce caractère ?",

    expectedAnswers: [{ value: "da", comparison: "exact", score: 1 }],

    explanation: "だ se prononce-da (dakuten)",

    conceptId: "hir_dakuten_003",

    data: { character: "だ", options: ["ta", "da", "na", "da"], correctIndex: 1 }

  },



  {

    id: "hir_ex_014",

    type: "recognition-kana",

    answerFormat: "choice",

    objective: "Reconnaître les dakuten",

    difficulty: 2,

    prompt: "Comment se prononce ce caractère ?",

    expectedAnswers: [{ value: "ba", comparison: "exact", score: 1 }],

    explanation: "ば se prononce-ba (dakuten)",

    conceptId: "hir_dakuten_004",

    data: { character: "ば", options: ["ha", "ba", "pa", "ma"], correctIndex: 1 }

  },



  {

    id: "hir_ex_015",

    type: "recognition-kana",

    answerFormat: "choice",

    objective: "Reconnaître les dakuten",

    difficulty: 2,

    prompt: "Comment se prononce ce caractère ?",

    expectedAnswers: [{ value: "pa", comparison: "exact", score: 1 }],

    explanation: "ぱ se prononce-pa (handakuten)",

    conceptId: "hir_dakuten_005",

    data: { character: "ぱ", options: ["ha", "ba", "pa", "ma"], correctIndex: 2 }

  },



  {

    id: "hir_ex_016",

    type: "recognition-kana",

    answerFormat: "choice",

    objective: "Reconnaître les yoon",

    difficulty: 2,

    prompt: "Comment se prononce ce caractère ?",

    expectedAnswers: [{ value: "nya", comparison: "exact", score: 1 }],

    explanation: "にゃ se prononce-nya",

    conceptId: "hir_yoon_002",

    data: { character: "にゃ", options: ["nya", "ni", "na", "nya"], correctIndex: 0 }

  },



  {

    id: "hir_ex_017",

    type: "recognition-kana",

    answerFormat: "choice",

    objective: "Reconnaître les yoon",

    difficulty: 2,

    prompt: "Comment se prononce ce caractère ?",

    expectedAnswers: [{ value: "nyu", comparison: "exact", score: 1 }],

    explanation: "にゅ se prononce-nyu",

    conceptId: "hir_yoon_003",

    data: { character: "にゅ", options: ["nyu", "nu", "nu", "nyu"], correctIndex: 0 }

  },



  {

    id: "hir_ex_018",

    type: "recognition-kana",

    answerFormat: "choice",

    objective: "Reconnaître les yoon",

    difficulty: 2,

    prompt: "Comment se prononce ce caractère ?",

    expectedAnswers: [{ value: "nyo", comparison: "exact", score: 1 }],

    explanation: "にょ se prononce-nyo",

    conceptId: "hir_yoon_004",

    data: { character: "にょ", options: ["nyo", "no", "no", "nyo"], correctIndex: 0 }

  },



  {

    id: "hir_ex_019",

    type: "recognition-kana",

    answerFormat: "choice",

    objective: "Reconnaître les yoon",

    difficulty: 2,

    prompt: "Comment se prononce ce caractère ?",

    expectedAnswers: [{ value: "wa", comparison: "exact", score: 1 }],

    explanation: "わ se prononce-wa",

    conceptId: "hir_yoon_005",

    data: { character: "わ", options: ["wa", "wi", "wa", "wo"], correctIndex: 0 }

  },



  {

    id: "hir_ex_020",

    type: "recognition-kana",

    answerFormat: "choice",

    objective: "Reconnaître les yoon",

    difficulty: 2,

    prompt: "Comment se prononce ce caractère ?",

    expectedAnswers: [{ value: "wo", comparison: "exact", score: 1 }],

    explanation: "を se prononce-wo",

    conceptId: "hir_yoon_006",

    data: { character: "を", options: ["wi", "wa", "wo", "o"], correctIndex: 2 }

  },



  {

    id: "hir_ex_021",

    type: "recognition-kana",

    answerFormat: "choice",

    objective: "Reconnaître les yoon",

    difficulty: 2,

    prompt: "Comment se prononce ce caractère ?",

    expectedAnswers: [{ value: "n", comparison: "exact", score: 1 }],

    explanation: "ん \"\"",

    conceptId: "hir_yoon_007",

    data: { character: "ん", options: ["n", "na", "ni", "n"], correctIndex: 0 }

  },



  {

    id: "kan_ex_003",

    type: "recognition-kana",

    answerFormat: "choice",

    objective: "Reconnaître les voyelles katakana",

    difficulty: 1,

    prompt: "Comment se prononce ce caractère ?",

    expectedAnswers: [{ value: "i", comparison: "exact", score: 1 }],

    explanation: "イ \"\"",

    conceptId: "kan_002",

    data: { character: "イ", options: ["a", "i", "u", "e"], correctIndex: 1 }

  },



  {

    id: "kan_ex_004",

    type: "recognition-kana",

    answerFormat: "choice",

    objective: "Reconnaître les voyelles katakana",

    difficulty: 1,

    prompt: "Comment se prononce ce caractère ?",

    expectedAnswers: [{ value: "u", comparison: "exact", score: 1 }],

    explanation: "ウ \"\"",

    conceptId: "kan_003",

    data: { character: "ウ", options: ["a", "i", "u", "e"], correctIndex: 2 }

  },



  {

    id: "kan_ex_005",

    type: "recognition-kana",

    answerFormat: "choice",

    objective: "Reconnaître les voyelles katakana",

    difficulty: 1,

    prompt: "Comment se prononce ce caractère ?",

    expectedAnswers: [{ value: "e", comparison: "exact", score: 1 }],

    explanation: "エ \"\"",

    conceptId: "kan_004",

    data: { character: "エ", options: ["a", "i", "u", "e"], correctIndex: 3 }

  },



  {

    id: "kan_ex_006",

    type: "recognition-kana",

    answerFormat: "choice",

    objective: "Reconnaître les voyelles katakana",

    difficulty: 1,

    prompt: "Comment se prononce ce caractère ?",

    expectedAnswers: [{ value: "o", comparison: "exact", score: 1 }],

    explanation: "オ \"\"",

    conceptId: "kan_005",

    data: { character: "オ", options: ["a", "i", "u", "o"], correctIndex: 3 }

  },



  {

    id: "kan_ex_007",

    type: "recognition-kana",

    answerFormat: "choice",

    objective: "Reconnaître les consonnes katakana",

    difficulty: 1,

    prompt: "Comment se prononce ce caractère ?",

    expectedAnswers: [{ value: "ki", comparison: "exact", score: 1 }],

    explanation: "キ se prononce-ki",

    conceptId: "kan_con_002",

    data: { character: "キ", options: ["ka", "ki", "ku", "ke"], correctIndex: 1 }

  },



  {

    id: "kan_ex_008",

    type: "recognition-kana",

    answerFormat: "choice",

    objective: "Reconnaître les consonnes katakana",

    difficulty: 1,

    prompt: "Comment se prononce ce caractère ?",

    expectedAnswers: [{ value: "ku", comparison: "exact", score: 1 }],

    explanation: "ク se prononce-ku",

    conceptId: "kan_con_003",

    data: { character: "ク", options: ["ka", "ki", "ku", "ke"], correctIndex: 2 }

  },



  {

    id: "kan_ex_009",

    type: "recognition-kana",

    answerFormat: "choice",

    objective: "Reconnaître les consonnes katakana",

    difficulty: 1,

    prompt: "Comment se prononce ce caractère ?",

    expectedAnswers: [{ value: "ke", comparison: "exact", score: 1 }],

    explanation: "ケ se prononce-ke",

    conceptId: "kan_con_004",

    data: { character: "ケ", options: ["ka", "ki", "ku", "ke"], correctIndex: 3 }

  },



  {

    id: "kan_ex_010",

    type: "recognition-kana",

    answerFormat: "choice",

    objective: "Reconnaître les consonnes katakana",

    difficulty: 1,

    prompt: "Comment se prononce ce caractère ?",

    expectedAnswers: [{ value: "ko", comparison: "exact", score: 1 }],

    explanation: "コ se prononce-ko",

    conceptId: "kan_con_005",

    data: { character: "コ", options: ["ka", "ki", "ku", "ko"], correctIndex: 3 }

  },



  {

    id: "gra_ex_011",

    type: "grammar-fill",

    answerFormat: "multi-choice",

    objective: "Identifier la forme passée affirmative",

    difficulty: 2,

    prompt: "Quelle est la forme passée de \"たべます\" ?",

    expectedAnswers: [{ value: "たべました", comparison: "exact", score: 1 }],

    explanation: "ました marque la forme passée affirmative.",

    conceptId: "gra_010",

    data: { options: ["たべました", "たべません", "たべない", "たべた"], correctAnswer: "たべました" }

  },



  {

    id: "gra_ex_012",

    type: "translation",

    answerFormat: "text",

    objective: "Traduire une phrase au passé négatif",

    difficulty: 2,

    prompt: "Traduisez : \"たべませんでした\"",

    expectedAnswers: [{ value: "tabemasen deshita", comparison: "case-insensitive", score: 1 }, { value: "je n'ai pas mangé", comparison: "case-insensitive", score: 1 }],

    explanation: "ませんでした marque la négation au passé.",

    conceptId: "gra_011",

    data: { hint: "tabe = manger, masen = négatif, deshita = passé" }

  },



  {

    id: "gra_ex_013",

    type: "grammar-fill",

    answerFormat: "multi-choice",

    objective: "Identifier la forme des adjectifs en i",

    difficulty: 2,

    prompt: "Comment dit-on \"ce n'est pas cher\" avec \"yasui\" ?",

    expectedAnswers: [{ value: "yasukunai", comparison: "exact", score: 1 }],

    explanation: "Les adjectifs en i perdent \"i\" et ajoutent \"kunai\" pour la négation.",

    conceptId: "gra_012",

    data: { options: ["yasukunai", "yasukunai desu", "yasui masen", "yasuku masen"], correctAnswer: "yasukunai" }

  },



  {

    id: "gra_ex_014",

    type: "grammar-fill",

    answerFormat: "multi-choice",

    objective: "Identifier la forme des adjectifs en na",

    difficulty: 2,

    prompt: "Comment dit-on \"ce n'est pas calme\" avec \"shizuka\" ?",

    expectedAnswers: [{ value: "shizuka janai", comparison: "exact", score: 1 }],

    explanation: "Les adjectifs en na utilisent \"janai\" pour la négation.",

    conceptId: "gra_013",

    data: { options: ["shizuka janai", "shizuka kunai", "shizuka masen", "shizuka nai"], correctAnswer: "shizuka janai" }

  },



  {

    id: "gra_ex_015",

    type: "grammar-fill",

    answerFormat: "multi-choice",

    objective: "Identifier un démonstratif",

    difficulty: 2,

    prompt: "Quel mot signifie \"celui-là\" (près de l'interlocuteur) ?",

    expectedAnswers: [{ value: "それ", comparison: "exact", score: 1 }],

    explanation: "それ (sore) signifie \"celui-là\".",

    conceptId: "gra_015",

    data: { options: ["これ", "それ", "あれ", "どれ"], correctAnswer: "それ" }

  },



  {

    id: "gra_ex_016",

    type: "grammar-fill",

    answerFormat: "multi-choice",

    objective: "Identifier la particule ni",

    difficulty: 2,

    prompt: "Quelle particule marque la destination ?",

    expectedAnswers: [{ value: "に", comparison: "exact", score: 1 }],

    explanation: "に (ni) marque la destination.",

    conceptId: "gra_003",

    data: { options: ["を", "に", "へ", "で"], correctAnswer: "に" }

  },





  {
    id: "hir_ex_022",
    type: "recognition-kana",
    answerFormat: "choice",
    objective: "Reconnaître les consonnes hiragana",
    difficulty: 1,
    prompt: "Comment se prononce ce caractère ?",
    expectedAnswers: [{ value: "ka", comparison: "exact", score: 1 }],
    explanation: "か se prononce ka",
    conceptId: "hir_011",
    data: { character: "か", options: ["ka", "ga", "sa", "ta"], correctIndex: 0 }
  },

  {
    id: "hir_ex_023",
    type: "recognition-kana",
    answerFormat: "choice",
    objective: "Reconnaître les dakuten hiragana",
    difficulty: 2,
    prompt: "Comment se prononce ce caractère ?",
    expectedAnswers: [{ value: "ga", comparison: "exact", score: 1 }],
    explanation: "が se prononce ga (dakuten de か)",
    conceptId: "hir_dakuten_006",
    data: { character: "が", options: ["ka", "ga", "ha", "ba"], correctIndex: 1 }
  },

  {
    id: "hir_ex_024",
    type: "recognition-kana",
    answerFormat: "choice",
    objective: "Reconnaître les yoon hiragana",
    difficulty: 2,
    prompt: "Comment se prononce ce caractère ?",
    expectedAnswers: [{ value: "kya", comparison: "exact", score: 1 }],
    explanation: "きゃ se prononce kya (yoon)",
    conceptId: "hir_yoon_008",
    data: { character: "きゃ", options: ["ka", "kya", "ki", "kyu"], correctIndex: 1 }
  },

  {
    id: "hir_ex_025",
    type: "recognition-kana",
    answerFormat: "choice",
    objective: "Reconnaître les yoon hiragana",
    difficulty: 2,
    prompt: "Comment se prononce ce caractère ?",
    expectedAnswers: [{ value: "shu", comparison: "exact", score: 1 }],
    explanation: "しゅ se prononce shu (yoon)",
    conceptId: "hir_yoon_009",
    data: { character: "しゅ", options: ["su", "shu", "shi", "sa"], correctIndex: 1 }
  },

  {
    id: "kan_ex_011",
    type: "recognition-kana",
    answerFormat: "choice",
    objective: "Reconnaître les voyelles katakana",
    difficulty: 1,
    prompt: "Comment se prononce ce caractère ?",
    expectedAnswers: [{ value: "a", comparison: "exact", score: 1 }],
    explanation: "ア se prononce a",
    conceptId: "kan_006",
    data: { character: "ア", options: ["a", "i", "u", "e"], correctIndex: 0 }
  },

  {
    id: "kan_ex_012",
    type: "recognition-kana",
    answerFormat: "choice",
    objective: "Reconnaître les consonnes katakana",
    difficulty: 1,
    prompt: "Comment se prononce ce caractère ?",
    expectedAnswers: [{ value: "ka", comparison: "exact", score: 1 }],
    explanation: "カ se prononce ka",
    conceptId: "kan_con_006",
    data: { character: "カ", options: ["ka", "ki", "ku", "ke"], correctIndex: 0 }
  },

  {
    id: "kan_ex_013",
    type: "recognition-kana",
    answerFormat: "choice",
    objective: "Reconnaître les consonnes katakana",
    difficulty: 1,
    prompt: "Comment se prononce ce caractère ?",
    expectedAnswers: [{ value: "sa", comparison: "exact", score: 1 }],
    explanation: "サ se prononce sa",
    conceptId: "kan_con_007",
    data: { character: "サ", options: ["sa", "su", "se", "so"], correctIndex: 0 }
  },

  {
    id: "kan_ex_014",
    type: "recognition-kana",
    answerFormat: "choice",
    objective: "Reconnaître les consonnes katakana",
    difficulty: 1,
    prompt: "Comment se prononce ce caractère ?",
    expectedAnswers: [{ value: "ta", comparison: "exact", score: 1 }],
    explanation: "タ se prononce ta",
    conceptId: "kan_con_008",
    data: { character: "タ", options: ["ta", "cha", "tsu", "to"], correctIndex: 0 }
  },

  {
    id: "num_ex_001",
    type: "recognition-vocab",
    answerFormat: "choice",
    objective: "Connaître les nombres de 1 à 5",
    difficulty: 1,
    prompt: "Comment dit-on \"trois\" en japonais ?",
    expectedAnswers: [{ value: "san", comparison: "exact", score: 1 }],
    explanation: "さん (三) signifie \"trois\"",
    conceptId: "nombre-1",
    data: { "reading-comprehension": "さん", options: ["ichi", "ni", "san", "yon"], correctIndex: 2 }
  },

  {
    id: "num_ex_002",
    type: "recognition-vocab",
    answerFormat: "choice",
    objective: "Connaître les nombres de 10 à 100",
    difficulty: 1,
    prompt: "Comment dit-on \"dix\" en japonais ?",
    expectedAnswers: [{ value: "juu", comparison: "exact", score: 1 }],
    explanation: "じゅう (十) signifie \"dix\"",
    conceptId: "nombre-10",
    data: { "reading-comprehension": "じゅう", options: ["hyaku", "juu", "sen", "man"], correctIndex: 1 }
  },

  {
    id: "num_ex_003",
    type: "translation",
    answerFormat: "text",
    objective: "Traduire un nombre composé",
    difficulty: 2,
    prompt: "Comment dit-on \"20\" en japonais ?",
    expectedAnswers: [{ value: "ni-juu", comparison: "case-insensitive", score: 1 }],
    explanation: "にじゅう (二十) signifie \"vingt\"",
    conceptId: "nombre-20",
    data: { hint: "ni = 2, juu = 10" }
  },

  {
    id: "num_ex_004",
    type: "recognition-vocab",
    answerFormat: "choice",
    objective: "Connaître les grands nombres",
    difficulty: 2,
    prompt: "Comment dit-on \"cent\" en japonais ?",
    expectedAnswers: [{ value: "hyaku", comparison: "exact", score: 1 }],
    explanation: "ひゃく (百) signifie \"cent\"",
    conceptId: "nombre-100",
    data: { "reading-comprehension": "ひゃく", options: ["juu", "sen", "hyaku", "man"], correctIndex: 2 }
  },

  {
    id: "verb_ex_001",
    type: "recognition-vocab",
    answerFormat: "choice",
    objective: "Connaître les verbes de base",
    difficulty: 1,
    prompt: "Comment dit-on \"manger\" en japonais ?",
    expectedAnswers: [{ value: "tabemasu", comparison: "exact", score: 1 }],
    explanation: "たべます (食べる) signifie \"manger\" (forme polie)",
    conceptId: "verbe-manger",
    data: { "reading-comprehension": "たべます", options: ["nomimasu", "tabemasu", "ikimasu", "kimasu"], correctIndex: 1 }
  },

  {
    id: "verb_ex_002",
    type: "translation",
    answerFormat: "text",
    objective: "Traduire une phrase avec verbe",
    difficulty: 1,
    prompt: "Traduisez : \"水 を のみます\"",
    expectedAnswers: [{ value: "mizu o nomimasu", comparison: "case-insensitive", score: 1 }, { value: "je bois de l'eau", comparison: "case-insensitive", score: 1 }],
    explanation: "のみます (nomimasu) signifie \"boire\" (forme polie)",
    conceptId: "verbe-boire",
    data: { hint: "mizu = eau, nomu = boire" }
  },

  {
    id: "verb_ex_003",
    type: "grammar-fill",
    answerFormat: "multi-choice",
    objective: "Identifier la forme négative d'un verbe",
    difficulty: 2,
    prompt: "Quelle est la forme négative de \"たべます\" ?",
    expectedAnswers: [{ value: "たべません", comparison: "exact", score: 1 }],
    explanation: "たべません (tabemasen) signifie \"ne pas manger\"",
    conceptId: "verbe-negation",
    data: { options: ["たべません", "たべます", "たべた", "たべない"], correctAnswer: "たべません" }
  },

  {
    id: "verb_ex_004",
    type: "translation",
    answerFormat: "text",
    objective: "Traduire au passé",
    difficulty: 2,
    prompt: "Traduisez : \"たべました\"",
    expectedAnswers: [{ value: "tabemashita", comparison: "case-insensitive", score: 1 }, { value: "j'ai mangé", comparison: "case-insensitive", score: 1 }],
    explanation: "たべました (tabemashita) signifie \"j'ai mangé\" (passé poli)",
    conceptId: "verbe-passe",
    data: { hint: "tabe = manger, mashita = passé" }
  },


  {
    id: "adj_ex_001",
    type: "recognition-vocab",
    answerFormat: "choice",
    objective: "Connaître les adjectifs en -i",
    difficulty: 1,
    prompt: "Comment dit-on \"cher\" en japonais ?",
    expectedAnswers: [{ value: "takai", comparison: "exact", score: 1 }],
    explanation: "高い (takai) signifie \"cher\" ou \"haut\"",
    conceptId: "adj-i-001",
    data: { "reading-comprehension": "高い", options: ["yasui", "takai", "omoshiroi", "muzukashii"], correctIndex: 1 }
  },

  {
    id: "adj_ex_002",
    type: "recognition-vocab",
    answerFormat: "choice",
    objective: "Connaître les adjectifs en -i",
    difficulty: 1,
    prompt: "Comment dit-on \"bon marché\" en japonais ?",
    expectedAnswers: [{ value: "yasui", comparison: "exact", score: 1 }],
    explanation: "安い (yasui) signifie \"bon marché\"",
    conceptId: "adj-i-002",
    data: { "reading-comprehension": "安い", options: ["takai", "yasui", "hikui", "oosii"], correctIndex: 1 }
  },

  {
    id: "adj_ex_003",
    type: "recognition-vocab",
    answerFormat: "choice",
    objective: "Connaître les adjectifs en -na",
    difficulty: 1,
    prompt: "Comment dit-on \"calme\" en japonais ?",
    expectedAnswers: [{ value: "shizuka", comparison: "exact", score: 1 }],
    explanation: "静かな (shizuka na) signifie \"calme\"",
    conceptId: "adj-na-001",
    data: { "reading-comprehension": "静かな", options: ["shizuka", "gomi", "kirei", "akai"], correctIndex: 0 }
  },

  {
    id: "adj_ex_004",
    type: "recognition-vocab",
    answerFormat: "choice",
    objective: "Connaître les adjectifs en -na",
    difficulty: 1,
    prompt: "Comment dit-on \"propre\" en japonais ?",
    expectedAnswers: [{ value: "kirei", comparison: "exact", score: 1 }],
    explanation: "きれいな (kirei na) signifie \"propre\" ou \"beau\"",
    conceptId: "adj-na-002",
    data: { "reading-comprehension": "きれいな", options: ["kirei", "kitanai", "shizuka", "takai"], correctIndex: 0 }
  },

  {
    id: "part_ex_001",
    type: "grammar-fill",
    answerFormat: "multi-choice",
    objective: "Identifier la particule de sujet",
    difficulty: 1,
    prompt: "Quelle particule marque le sujet dans \"私は学生です\" ?",
    expectedAnswers: [{ value: "は", comparison: "exact", score: 1 }],
    explanation: "は (wa) est la particule de sujet.",
    conceptId: "part-wa",
    data: { options: ["は", "が", "を", "に"], correctAnswer: "は" }
  },

  {
    id: "part_ex_002",
    type: "grammar-fill",
    answerFormat: "multi-choice",
    objective: "Identifier la particule d'objet direct",
    difficulty: 1,
    prompt: "Quelle particule marque l'objet direct dans \"水を飲みます\" ?",
    expectedAnswers: [{ value: "を", comparison: "exact", score: 1 }],
    explanation: "を (o) marque l'objet direct.",
    conceptId: "part-o",
    data: { options: ["は", "が", "を", "に"], correctAnswer: "を" }
  },

  {
    id: "part_ex_003",
    type: "grammar-fill",
    answerFormat: "multi-choice",
    objective: "Identifier la particule de destination",
    difficulty: 2,
    prompt: "Quelle particule marque la destination dans \"学校に行きます\" ?",
    expectedAnswers: [{ value: "に", comparison: "exact", score: 1 }],
    explanation: "に (ni) marque la destination.",
    conceptId: "part-ni",
    data: { options: ["は", "を", "に", "で"], correctAnswer: "に" }
  },

  {
    id: "part_ex_004",
    type: "grammar-fill",
    answerFormat: "multi-choice",
    objective: "Identifier la particule de lieu d'action",
    difficulty: 2,
    prompt: "Quelle particule marque le lieu d'action dans \"公園で遊びます\" ?",
    expectedAnswers: [{ value: "で", comparison: "exact", score: 1 }],
    explanation: "で (de) marque le lieu d'action.",
    conceptId: "part-de",
    data: { options: ["は", "を", "に", "で"], correctAnswer: "で" }
  },

  {
    id: "daily_ex_001",
    type: "recognition-vocab",
    answerFormat: "choice",
    objective: "Connaître le vocabulaire de la maison",
    difficulty: 1,
    prompt: "Comment dit-on \"maison\" en japonais ?",
    expectedAnswers: [{ value: "ie", comparison: "exact", score: 1 }],
    explanation: "家 (ie) signifie \"maison\"",
    conceptId: "daily-maison",
    data: { "reading-comprehension": "家", options: ["ie", "heya", "daidokoro", "ofuro"], correctIndex: 0 }
  },

  {
    id: "daily_ex_002",
    type: "recognition-vocab",
    answerFormat: "choice",
    objective: "Connaître le vocabulaire de la cuisine",
    difficulty: 1,
    prompt: "Comment dit-on \"cuisine\" en japonais ?",
    expectedAnswers: [{ value: "daidokoro", comparison: "exact", score: 1 }],
    explanation: "台所 (daidokoro) signifie \"cuisine\"",
    conceptId: "daily-cuisine",
    data: { "reading-comprehension": "台所", options: ["ie", "heya", "daidokoro", "ofuro"], correctIndex: 2 }
  },

  {
    id: "daily_ex_003",
    type: "recognition-vocab",
    answerFormat: "choice",
    objective: "Connaître le vocabulaire de la nourriture",
    difficulty: 1,
    prompt: "Comment dit-on \"riz\" en japonais ?",
    expectedAnswers: [{ value: "gohan", comparison: "exact", score: 1 }],
    explanation: "ご飯 (gohan) signifie \"riz\" ou \"repas\"",
    conceptId: "daily-nourriture",
    data: { "reading-comprehension": "ご飯", options: ["sushi", "gohan", "mizu", "sakana"], correctIndex: 1 }
  },

  {
    id: "daily_ex_004",
    type: "recognition-vocab",
    answerFormat: "choice",
    objective: "Connaître le vocabulaire de la salle de bain",
    difficulty: 1,
    prompt: "Comment dit-on \"baignoire\" en japonais ?",
    expectedAnswers: [{ value: "ofuro", comparison: "exact", score: 1 }],
    explanation: "お風呂 (ofuro) signifie \"baignoire\" ou \"salle de bain\"",
    conceptId: "daily-salle-bain",
    data: { "reading-comprehension": "お風呂", options: ["heya", "daidokoro", "ofuro", "toire"], correctIndex: 2 }
  },

  {
    id: "expr_ex_001",
    type: "recognition-vocab",
    answerFormat: "choice",
    objective: "Connaître les salutations du matin",
    difficulty: 1,
    prompt: "Comment dit-on \"bonjour le matin\" en japonais ?",
    expectedAnswers: [{ value: "ohayou gozaimasu", comparison: "exact", score: 1 }],
    explanation: "おはようございます (ohayou gozaimasu) signifie \"bonjour le matin\"",
    conceptId: "expr-salutations",
    data: { "reading-comprehension": "おはようございます", options: ["ohayou gozaimasu", "kon'nichiwa", "konbanwa", "sayonara"], correctIndex: 0 }
  },

  {
    id: "expr_ex_002",
    type: "recognition-vocab",
    answerFormat: "choice",
    objective: "Connaître les salutations de la journée",
    difficulty: 1,
    prompt: "Comment dit-on \"bonjour\" en japonais ?",
    expectedAnswers: [{ value: "kon'nichiwa", comparison: "exact", score: 1 }],
    explanation: "こんにちは (kon'nichiwa) signifie \"bonjour\"",
    conceptId: "expr-salutations-2",
    data: { "reading-comprehension": "こんにちは", options: ["ohayou gozaimasu", "kon'nichiwa", "konbanwa", "sayonara"], correctIndex: 1 }
  },

  {
    id: "expr_ex_003",
    type: "recognition-vocab",
    answerFormat: "choice",
    objective: "Connaître les remerciements",
    difficulty: 1,
    prompt: "Comment dit-on \"merci\" en japonais ?",
    expectedAnswers: [{ value: "arigatou gozaimasu", comparison: "exact", score: 1 }],
    explanation: "ありがとうございます (arigatou gozaimasu) signifie \"merci\"",
    conceptId: "expr-remerciements",
    data: { "reading-comprehension": "ありがとうございます", options: ["arigatou gozaimasu", "sumimasen", "dou itashimashite", "gomen nasai"], correctIndex: 0 }
  },

  {
    id: "expr_ex_004",
    type: "recognition-vocab",
    answerFormat: "choice",
    objective: "Connaître les excuses",
    difficulty: 1,
    prompt: "Comment dit-on \"excusez-moi\" en japonais ?",
    expectedAnswers: [{ value: "sumimasen", comparison: "exact", score: 1 }],
    explanation: "すみません (sumimasen) signifie \"excusez-moi\" ou \"désolé\"",
    conceptId: "expr-excuses",
    data: { "reading-comprehension": "すみません", options: ["arigatou gozaimasu", "sumimasen", "dou itashimashite", "gomen nasai"], correctIndex: 1 }
  },


  {
    id: "irr_ex_001",
    type: "recognition-vocab",
    answerFormat: "choice",
    objective: "Connaître le verbe irrégulier 'suru'",
    difficulty: 1,
    prompt: "Comment dit-on \"faire\" en japonais ?",
    expectedAnswers: [{ value: "suru", comparison: "exact", score: 1 }],
    explanation: "する (suru) signifie \"faire\"",
    conceptId: "verbe-irreg-suru",
    data: { "reading-comprehension": "する", options: ["kuru", "suru", "iku", "kuru"], correctIndex: 1 }
  },

  {
    id: "irr_ex_002",
    type: "recognition-vocab",
    answerFormat: "choice",
    objective: "Connaître le verbe irrégulier 'kuru'",
    difficulty: 1,
    prompt: "Comment dit-on \"venir\" en japonais ?",
    expectedAnswers: [{ value: "kuru", comparison: "exact", score: 1 }],
    explanation: "来る (kuru) signifie \"venir\"",
    conceptId: "verbe-irreg-kuru",
    data: { "reading-comprehension": "来る", options: ["iku", "kuru", "taberu", "nomu"], correctIndex: 1 }
  },

  {
    id: "irr_ex_003",
    type: "recognition-vocab",
    answerFormat: "choice",
    objective: "Comprendre 'benkyou suru'",
    difficulty: 1,
    prompt: "Que signifie \"勉強する\" (benkyou suru) ?",
    expectedAnswers: [{ value: "étudier", comparison: "exact", score: 1 }],
    explanation: "勉強する (benkyou suru) signifie \"étudier\"",
    conceptId: "benkyou-suru",
    data: { "reading-comprehension": "勉強する", options: ["étudier", "travailler", "jouer", "dormir"], correctIndex: 0 }
  },

  {
    id: "irr_ex_004",
    type: "recognition-vocab",
    answerFormat: "choice",
    objective: "Comprendre 'shigoto suru'",
    difficulty: 1,
    prompt: "Que signifie \"仕事する\" (shigoto suru) ?",
    expectedAnswers: [{ value: "travailler", comparison: "exact", score: 1 }],
    explanation: "仕事する (shigoto suru) signifie \"travailler\"",
    conceptId: "shigoto-suru",
    data: { "reading-comprehension": "仕事する", options: ["étudier", "travailler", "manger", "boire"], correctIndex: 1 }
  },

  {
    id: "quest_ex_001",
    type: "recognition-vocab",
    answerFormat: "choice",
    objective: "Connaître le mot interrogatif 'nani'",
    difficulty: 1,
    prompt: "Comment dit-on \"quoi\" en japonais ?",
    expectedAnswers: [{ value: "nani", comparison: "exact", score: 1 }],
    explanation: "何 (nani) signifie \"quoi\"",
    conceptId: "quest-nani",
    data: { "reading-comprehension": "何", options: ["dare", "nani", "doko", "itsu"], correctIndex: 1 }
  },

  {
    id: "quest_ex_002",
    type: "recognition-vocab",
    answerFormat: "choice",
    objective: "Connaître le mot interrogatif 'doko'",
    difficulty: 1,
    prompt: "Comment dit-on \"où\" en japonais ?",
    expectedAnswers: [{ value: "doko", comparison: "exact", score: 1 }],
    explanation: "どこ (doko) signifie \"où\"",
    conceptId: "quest-doko",
    data: { "reading-comprehension": "どこ", options: ["dare", "nani", "doko", "dou"], correctIndex: 2 }
  },

  {
    id: "quest_ex_003",
    type: "recognition-vocab",
    answerFormat: "choice",
    objective: "Connaître le mot interrogatif 'itsu'",
    difficulty: 1,
    prompt: "Comment dit-on \"quand\" en japonais ?",
    expectedAnswers: [{ value: "itsu", comparison: "exact", score: 1 }],
    explanation: "いつ (itsu) signifie \"quand\"",
    conceptId: "quest-itsu",
    data: { "reading-comprehension": "いつ", options: ["dare", "nani", "doko", "itsu"], correctIndex: 3 }
  },

  {
    id: "quest_ex_004",
    type: "recognition-vocab",
    answerFormat: "choice",
    objective: "Connaître le mot interrogatif 'dou'",
    difficulty: 1,
    prompt: "Comment dit-on \"comment\" en japonais ?",
    expectedAnswers: [{ value: "dou", comparison: "exact", score: 1 }],
    explanation: "どう (dou) signifie \"comment\"",
    conceptId: "quest-dou",
    data: { "reading-comprehension": "どう", options: ["dare", "nani", "doko", "dou"], correctIndex: 3 }
  },

  {
    id: "fam_ex_001",
    type: "recognition-vocab",
    answerFormat: "choice",
    objective: "Connaître le vocabulaire de la famille",
    difficulty: 1,
    prompt: "Comment dit-on \"père\" en japonais ?",
    expectedAnswers: [{ value: "chichi", comparison: "exact", score: 1 }],
    explanation: "父 (chichi) signifie \"père\" (forme polie)",
    conceptId: "famille-pere",
    data: { "reading-comprehension": "父", options: ["haha", "chichi", "ani", "ane"], correctIndex: 1 }
  },

  {
    id: "fam_ex_002",
    type: "recognition-vocab",
    answerFormat: "choice",
    objective: "Connaître le vocabulaire de la famille",
    difficulty: 1,
    prompt: "Comment dit-on \"mère\" en japonais ?",
    expectedAnswers: [{ value: "haha", comparison: "exact", score: 1 }],
    explanation: "母 (haha) signifie \"mère\" (forme polie)",
    conceptId: "famille-mere",
    data: { "reading-comprehension": "母", options: ["chichi", "haha", "otoosan", "okaasan"], correctIndex: 1 }
  },

  {
    id: "fam_ex_003",
    type: "recognition-vocab",
    answerFormat: "choice",
    objective: "Connaître le vocabulaire de la famille",
    difficulty: 1,
    prompt: "Comment dit-on \"frère aîné\" en japonais ?",
    expectedAnswers: [{ value: "ani", comparison: "exact", score: 1 }],
    explanation: "兄 (ani) signifie \"frère aîné\"",
    conceptId: "famille-frere",
    data: { "reading-comprehension": "兄", options: ["oto", "ani", "imouto", "ane"], correctIndex: 1 }
  },

  {
    id: "fam_ex_004",
    type: "recognition-vocab",
    answerFormat: "choice",
    objective: "Connaître le vocabulaire de la famille",
    difficulty: 1,
    prompt: "Comment dit-on \"sœur aînée\" en japonais ?",
    expectedAnswers: [{ value: "ane", comparison: "exact", score: 1 }],
    explanation: "姉 (ane) signifie \"sœur aînée\"",
    conceptId: "famille-soeur",
    data: { "reading-comprehension": "姉", options: ["imouto", "ane", "oneesan", "ane"], correctIndex: 2 }
  },

  {
    id: "ani_ex_001",
    type: "recognition-vocab",
    answerFormat: "choice",
    objective: "Connaître le vocabulaire des animaux",
    difficulty: 1,
    prompt: "Comment dit-on \"chien\" en japonais ?",
    expectedAnswers: [{ value: "inu", comparison: "exact", score: 1 }],
    explanation: "犬 (inu) signifie \"chien\"",
    conceptId: "animal-chien",
    data: { "reading-comprehension": "犬", options: ["neko", "inu", "tora", "zou"], correctIndex: 1 }
  },

  {
    id: "ani_ex_002",
    type: "recognition-vocab",
    answerFormat: "choice",
    objective: "Connaître le vocabulaire des animaux",
    difficulty: 1,
    prompt: "Comment dit-on \"chat\" en japonais ?",
    expectedAnswers: [{ value: "neko", comparison: "exact", score: 1 }],
    explanation: "猫 (neko) signifie \"chat\"",
    conceptId: "animal-chat",
    data: { "reading-comprehension": "猫", options: ["inu", "neko", "saru", "hebi"], correctIndex: 1 }
  },

  {
    id: "ani_ex_003",
    type: "recognition-vocab",
    answerFormat: "choice",
    objective: "Connaître le vocabulaire des animaux",
    difficulty: 1,
    prompt: "Comment dit-on \"tigre\" en japonais ?",
    expectedAnswers: [{ value: "tora", comparison: "exact", score: 1 }],
    explanation: "虎 (tora) signifie \"tigre\"",
    conceptId: "animal-tigre",
    data: { "reading-comprehension": "虎", options: ["kuma", "tora", "ouki", "taka"], correctIndex: 1 }
  },

  {
    id: "ani_ex_004",
    type: "recognition-vocab",
    answerFormat: "choice",
    objective: "Connaître le vocabulaire des animaux",
    difficulty: 1,
    prompt: "Comment dit-on \"éléphant\" en japonais ?",
    expectedAnswers: [{ value: "zou", comparison: "exact", score: 1 }],
    explanation: "象 (zou) signifie \"éléphant\"",
    conceptId: "animal-elephant",
    data: { "reading-comprehension": "象", options: ["zou", "saru", "hebi", "taka"], correctIndex: 0 }
  },


  {
    id: "dir_ex_001",
    type: "recognition-vocab",
    answerFormat: "choice",
    objective: "Connaître les lieux de la ville",
    difficulty: 1,
    prompt: "Comment dit-on \"gare\" en japonais ?",
    expectedAnswers: [{ value: "eki", comparison: "exact", score: 1 }],
    explanation: "駅 (eki) signifie \"gare\"",
    conceptId: "ville-eki",
    data: { "reading-comprehension": "駅", options: ["hoteru", "eki", "byouin", "ginkou"], correctIndex: 1 }
  },

  {
    id: "dir_ex_002",
    type: "recognition-vocab",
    answerFormat: "choice",
    objective: "Connaître les directions",
    difficulty: 1,
    prompt: "Comment dit-on \"droite\" en japonais ?",
    expectedAnswers: [{ value: "migi", comparison: "exact", score: 1 }],
    explanation: "右 (migi) signifie \"droite\"",
    conceptId: "direction-migi",
    data: { "reading-comprehension": "右", options: ["hidari", "migi", "massugu", "moteru"], correctIndex: 1 }
  },

  {
    id: "dir_ex_003",
    type: "recognition-vocab",
    answerFormat: "choice",
    objective: "Connaître les directions",
    difficulty: 1,
    prompt: "Comment dit-on \"gauche\" en japonais ?",
    expectedAnswers: [{ value: "hidari", comparison: "exact", score: 1 }],
    explanation: "左 (hidari) signifie \"gauche\"",
    conceptId: "direction-hidari",
    data: { "reading-comprehension": "左", options: ["migi", "hidari", "massugu", "moteru"], correctIndex: 1 }
  },

  {
    id: "dir_ex_004",
    type: "recognition-vocab",
    answerFormat: "choice",
    objective: "Connaître les directions",
    difficulty: 1,
    prompt: "Comment dit-on \"tout droit\" en japonais ?",
    expectedAnswers: [{ value: "massugu", comparison: "exact", score: 1 }],
    explanation: "真っ直ぐ (massugu) signifie \"tout droit\"",
    conceptId: "direction-massugu",
    data: { "reading-comprehension": "真っ直ぐ", options: ["migi", "hidari", "massugu", "moteru"], correctIndex: 2 }
  },

  {
    id: "couleur_ex_001",
    type: "recognition-vocab",
    answerFormat: "choice",
    objective: "Connaître les couleurs de base",
    difficulty: 1,
    prompt: "Comment dit-on \"rouge\" en japonais ?",
    expectedAnswers: [{ value: "aka", comparison: "exact", score: 1 }],
    explanation: "赤 (aka) signifie \"rouge\"",
    conceptId: "couleur-aka",
    data: { "reading-comprehension": "赤", options: ["ao", "aka", "shiro", "kuro"], correctIndex: 1 }
  },

  {
    id: "couleur_ex_002",
    type: "recognition-vocab",
    answerFormat: "choice",
    objective: "Connaître les couleurs de base",
    difficulty: 1,
    prompt: "Comment dit-on \"bleu\" en japonais ?",
    expectedAnswers: [{ value: "ao", comparison: "exact", score: 1 }],
    explanation: "青 (ao) signifie \"bleu\"",
    conceptId: "couleur-ao",
    data: { "reading-comprehension": "青", options: ["aka", "ao", "midori", "ki"], correctIndex: 1 }
  },

  {
    id: "couleur_ex_003",
    type: "recognition-vocab",
    answerFormat: "choice",
    objective: "Connaître les couleurs de base",
    difficulty: 1,
    prompt: "Comment dit-on \"vert\" en japonais ?",
    expectedAnswers: [{ value: "midori", comparison: "exact", score: 1 }],
    explanation: "緑 (midori) signifie \"vert\"",
    conceptId: "couleur-midori",
    data: { "reading-comprehension": "緑", options: ["aka", "ao", "midori", "kuro"], correctIndex: 2 }
  },

  {
    id: "couleur_ex_004",
    type: "recognition-vocab",
    answerFormat: "choice",
    objective: "Connaître les couleurs de base",
    difficulty: 1,
    prompt: "Comment dit-on \"noir\" en japonais ?",
    expectedAnswers: [{ value: "kuro", comparison: "exact", score: 1 }],
    explanation: "黒 (kuro) signifie \"noir\"",
    conceptId: "couleur-kuro",
    data: { "reading-comprehension": "黒", options: ["shiro", "kuro", "aka", "ao"], correctIndex: 1 }
  },

  {
    id: "meteo_ex_001",
    type: "recognition-vocab",
    answerFormat: "choice",
    objective: "Connaître les saisons",
    difficulty: 1,
    prompt: "Comment dit-on \"printemps\" en japonais ?",
    expectedAnswers: [{ value: "haru", comparison: "exact", score: 1 }],
    explanation: "春 (haru) signifie \"printemps\"",
    conceptId: "saison-haru",
    data: { "reading-comprehension": "春", options: ["natsu", "haru", "aki", "fuyu"], correctIndex: 1 }
  },

  {
    id: "meteo_ex_002",
    type: "recognition-vocab",
    answerFormat: "choice",
    objective: "Connaître les saisons",
    difficulty: 1,
    prompt: "Comment dit-on \"été\" en japonais ?",
    expectedAnswers: [{ value: "natsu", comparison: "exact", score: 1 }],
    explanation: "夏 (natsu) signifie \"été\"",
    conceptId: "saison-natsu",
    data: { "reading-comprehension": "夏", options: ["haru", "natsu", "aki", "fuyu"], correctIndex: 1 }
  },

  {
    id: "meteo_ex_003",
    type: "recognition-vocab",
    answerFormat: "choice",
    objective: "Connaître la météo",
    difficulty: 1,
    prompt: "Comment dit-on \"pluie\" en japonais ?",
    expectedAnswers: [{ value: "ame", comparison: "exact", score: 1 }],
    explanation: "雨 (ame) signifie \"pluie\"",
    conceptId: "meteo-ame",
    data: { "reading-comprehension": "雨", options: ["yuki", "ame", "kaze", "tenki"], correctIndex: 1 }
  },

  {
    id: "meteo_ex_004",
    type: "recognition-vocab",
    answerFormat: "choice",
    objective: "Connaître la météo",
    difficulty: 1,
    prompt: "Comment dit-on \"neige\" en japonais ?",
    expectedAnswers: [{ value: "yuki", comparison: "exact", score: 1 }],
    explanation: "雪 (yuki) signifie \"neige\"",
    conceptId: "meteo-yuki",
    data: { "reading-comprehension": "雪", options: ["ame", "yuki", "kaze", "tenki"], correctIndex: 1 }
  },

  {
    id: "shop_ex_001",
    type: "recognition-vocab",
    answerFormat: "choice",
    objective: "Connaître le vocabulaire du shopping",
    difficulty: 1,
    prompt: "Comment dit-on \"grand magasin\" en japonais ?",
    expectedAnswers: [{ value: "depāto", comparison: "exact", score: 1 }],
    explanation: "デパート (depāto) signifie \"grand magasin\"",
    conceptId: "shopping-departo",
    data: { "reading-comprehension": "デパート", options: ["suupā", "depāto", "mise", "ichi"], correctIndex: 1 }
  },

  {
    id: "shop_ex_002",
    type: "recognition-vocab",
    answerFormat: "choice",
    objective: "Connaître les expressions de prix",
    difficulty: 1,
    prompt: "Comment dit-on \"combien ça coûte ?\" en japonais ?",
    expectedAnswers: [{ value: "ikura desu ka", comparison: "exact", score: 1 }],
    explanation: "いくらですか？ (ikura desu ka ?) signifie \"combien ça coûte ?\"",
    conceptId: "prix-ikura",
    data: { "reading-comprehension": "いくらですか？", options: ["ikura desu ka", "doko desu ka", "itsu desu ka", "dare desu ka"], correctIndex: 0 }
  },

  {
    id: "shop_ex_003",
    type: "recognition-vocab",
    answerFormat: "choice",
    objective: "Connaître le vocabulaire du shopping",
    difficulty: 1,
    prompt: "Comment dit-on \"supermarché\" en japonais ?",
    expectedAnswers: [{ value: "suupā", comparison: "exact", score: 1 }],
    explanation: "スーパー (suupā) signifie \"supermarché\"",
    conceptId: "shopping-suupaa",
    data: { "reading-comprehension": "スーパー", options: ["depāto", "suupā", "mise", "ichi"], correctIndex: 1 }
  },

  {
    id: "shop_ex_004",
    type: "recognition-vocab",
    answerFormat: "choice",
    objective: "Connaître les expressions de prix",
    difficulty: 1,
    prompt: "Comment dit-on \"magasin\" en japonais ?",
    expectedAnswers: [{ value: "mise", comparison: "exact", score: 1 }],
    explanation: "店 (mise) signifie \"magasin\"",
    conceptId: "shopping-mise",
    data: { "reading-comprehension": "店", options: ["depāto", "suupā", "mise", "ichi"], correctIndex: 2 }
  },

  {
    id: "cultur_ex_001",
    type: "recognition-vocab",
    answerFormat: "choice",
    objective: "Connaître les salutations traditionnelles",
    difficulty: 1,
    prompt: "Comment dit-on \"bow/révérence\" en japonais ?",
    expectedAnswers: [{ value: "ojigi", comparison: "exact", score: 1 }],
    explanation: "お辞儀 (ojigi) signifie \"révérence/bow\"",
    conceptId: "culture-ojigi",
    data: { "reading-comprehension": "お辞儀", options: ["ojigi", "arigatou", "sumimasen", "kon'nichiwa"], correctIndex: 0 }
  },

  {
    id: "cultur_ex_002",
    type: "recognition-vocab",
    answerFormat: "choice",
    objective: "Connaître l'étiquette à table",
    difficulty: 1,
    prompt: "Que dit-on avant de manger ?",
    expectedAnswers: [{ value: "itadakimasu", comparison: "exact", score: 1 }],
    explanation: "いただきます (itadakimasu) se dit avant de manger",
    conceptId: "culture-itadakimasu",
    data: { "reading-comprehension": "いただきます", options: ["itadakimasu", "gochisousama", "arigatou", "sumimasen"], correctIndex: 0 }
  },

  {
    id: "cultur_ex_003",
    type: "recognition-vocab",
    answerFormat: "choice",
    objective: "Connaître l'étiquette à table",
    difficulty: 1,
    prompt: "Que dit-on après avoir mangé ?",
    expectedAnswers: [{ value: "gochisousama deshita", comparison: "exact", score: 1 }],
    explanation: "ごちそうさまでした (gochisousama deshita) se dit après le repas",
    conceptId: "culture-gochisousama",
    data: { "reading-comprehension": "ごちそうさまでした", options: ["itadakimasu", "gochisousama deshita", "arigatou", "omishii"], correctIndex: 1 }
  },

  {
    id: "cultur_ex_004",
    type: "recognition-vocab",
    answerFormat: "choice",
    objective: "Connaître les salutations",
    difficulty: 1,
    prompt: "Comment dit-on \"bonjour le matin\" en japonais ?",
    expectedAnswers: [{ value: "ohayou gozaimasu", comparison: "exact", score: 1 }],
    explanation: "おはようございます (ohayou gozaimasu) signifie \"bonjour le matin\"",
    conceptId: "culture-ohayou",
    data: { "reading-comprehension": "おはようございます", options: ["ohayou gozaimasu", "kon'nichiwa", "konbanwa", "oyasuminasai"], correctIndex: 0 }
  },

  {
    id: "corps_ex_001",
    type: "recognition-vocab",
    answerFormat: "choice",
    objective: "Connaître les parties du corps",
    difficulty: 1,
    prompt: "Comment dit-on \"tête\" en japonais ?",
    expectedAnswers: [{ value: "atama", comparison: "exact", score: 1 }],
    explanation: "頭 (atama) signifie \"tête\"",
    conceptId: "corps-atama",
    data: { "reading-comprehension": "頭", options: ["atama", "te", "ashi", "me"], correctIndex: 0 }
  },

  {
    id: "corps_ex_002",
    type: "recognition-vocab",
    answerFormat: "choice",
    objective: "Connaître les parties du corps",
    difficulty: 1,
    prompt: "Comment dit-on \"main\" en japonais ?",
    expectedAnswers: [{ value: "te", comparison: "exact", score: 1 }],
    explanation: "手 (te) signifie \"main\"",
    conceptId: "corps-te",
    data: { "reading-comprehension": "手", options: ["te", "ashi", "me", "mimi"], correctIndex: 0 }
  },

  {
    id: "corps_ex_003",
    type: "recognition-vocab",
    answerFormat: "choice",
    objective: "Connaître le visage",
    difficulty: 1,
    prompt: "Comment dit-on \"nez\" en japonais ?",
    expectedAnswers: [{ value: "hana", comparison: "exact", score: 1 }],
    explanation: "鼻 (hana) signifie \"nez\"",
    conceptId: "corps-hana",
    data: { "reading-comprehension": "鼻", options: ["hana", "kuchi", "kao", "yubi"], correctIndex: 0 }
  },

  {
    id: "corps_ex_004",
    type: "recognition-vocab",
    answerFormat: "choice",
    objective: "Connaître le visage",
    difficulty: 1,
    prompt: "Comment dit-on \"bouche\" en japonais ?",
    expectedAnswers: [{ value: "kuchi", comparison: "exact", score: 1 }],
    explanation: "口 (kuchi) signifie \"bouche\"",
    conceptId: "corps-kuchi",
    data: { "reading-comprehension": "口", options: ["kuchi", "hana", "me", "yubi"], correctIndex: 0 }
  },

  {
    id: "temps_ex_001",
    type: "recognition-vocab",
    answerFormat: "choice",
    objective: "Connaître la structure de l'heure",
    difficulty: 1,
    prompt: "Comment demande-t-on l'heure ?",
    expectedAnswers: [{ value: "nan-ji desu ka", comparison: "exact", score: 1 }],
    explanation: "なんじですか (nan-ji desu ka) signifie \"quelle heure est-il ?\"",
    conceptId: "temps-nanji",
    data: { "reading-comprehension": "なんじですか", options: ["nan-ji desu ka", "nan-nichi desu ka", "nan-ji desu", "nan desu ka"], correctIndex: 0 }
  },

  {
    id: "temps_ex_002",
    type: "recognition-vocab",
    answerFormat: "choice",
    objective: "Connaître les heures",
    difficulty: 1,
    prompt: "Comment dit-on \"2 heures\" en japonais ?",
    expectedAnswers: [{ value: "ni-ji", comparison: "exact", score: 1 }],
    explanation: "にじ (ni-ji) signifie \"2 heures\"",
    conceptId: "temps-niji",
    data: { "reading-comprehension": "にじ", options: ["ni-ji", "ichi-ji", "san-ji", "yon-ji"], correctIndex: 0 }
  },

  {
    id: "temps_ex_003",
    type: "recognition-vocab",
    answerFormat: "choice",
    objective: "Connaître les jours de la semaine",
    difficulty: 1,
    prompt: "Comment dit-on \"lundi\" en japonais ?",
    expectedAnswers: [{ value: "getsuyoubi", comparison: "exact", score: 1 }],
    explanation: "月曜日 (getsuyoubi) signifie \"lundi\"",
    conceptId: "temps-getsuyoubi",
    data: { "reading-comprehension": "月曜日", options: ["getsuyoubi", "kayoubi", "suiyoubi", "nichiyoubi"], correctIndex: 0 }
  },

  {
    id: "temps_ex_004",
    type: "recognition-vocab",
    answerFormat: "choice",
    objective: "Connaître les jours de la semaine",
    difficulty: 1,
    prompt: "Comment dit-on \"samedi\" en japonais ?",
    expectedAnswers: [{ value: "doyoubi", comparison: "exact", score: 1 }],
    explanation: "土曜日 (doyoubi) signifie \"samedi\"",
    conceptId: "temps-doyoubi",
    data: { "reading-comprehension": "土曜日", options: ["doyoubi", "kinyoubi", "mokuyoubi", "nichiyoubi"], correctIndex: 0 }
  },

  {
    id: "nume_ex_001",
    type: "recognition-vocab",
    answerFormat: "choice",
    objective: "Connaître le vocabulaire technologique",
    difficulty: 1,
    prompt: "Comment dit-on \"téléphone\" en japonais ?",
    expectedAnswers: [{ value: "denwa", comparison: "exact", score: 1 }],
    explanation: "電話 (denwa) signifie \"téléphone\"",
    conceptId: "numerique-denwa",
    data: { "reading-comprehension": "電話", options: ["denwa", "pasokon", "kamera", "internet"], correctIndex: 0 }
  },

  {
    id: "nume_ex_002",
    type: "recognition-vocab",
    answerFormat: "choice",
    objective: "Connaître le vocabulaire technologique",
    difficulty: 1,
    prompt: "Comment dit-on \"ordinateur\" en japonais ?",
    expectedAnswers: [{ value: "pasokon", comparison: "exact", score: 1 }],
    explanation: "パソコン (pasokon) signifie \"ordinateur\"",
    conceptId: "numerique-pasokon",
    data: { "reading-comprehension": "パソコン", options: ["pasokon", "denwa", "pasu", "app"], correctIndex: 0 }
  },

  {
    id: "nume_ex_003",
    type: "recognition-vocab",
    answerFormat: "choice",
    objective: "Connaître les termes numériques",
    difficulty: 1,
    prompt: "Comment dit-on \"download\" en japonais ?",
    expectedAnswers: [{ value: "download", comparison: "exact", score: 1 }],
    explanation: "ダウンロード (download) signifie \"télécharger\"",
    conceptId: "numerique-download",
    data: { "reading-comprehension": "ダウンロード", options: ["download", "upload", "pasu", "email"], correctIndex: 0 }
  },

  {
    id: "nume_ex_004",
    type: "recognition-vocab",
    answerFormat: "choice",
    objective: "Connaître les termes numériques",
    difficulty: 1,
    prompt: "Comment dit-on \"mot de passe\" en japonais ?",
    expectedAnswers: [{ value: "pasu", comparison: "exact", score: 1 }],
    explanation: "パスワード (pasu) signifie \"mot de passe\"",
    conceptId: "numerique-pasu",
    data: { "reading-comprehension": "パスワード", options: ["pasu", "email", "SNS", "app"], correctIndex: 0 }
  },
];