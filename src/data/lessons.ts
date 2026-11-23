import type { Lesson } from "../core/learning/types";

export const SAMPLE_LESSONS: Lesson[] = [
  {
    id: "lesson-1",
    title: "Introduction aux Hiragana",
    description: "Apprenez les caractères hiragana de base",
    conceptId: "kana-hiragana-1",
    lessonSteps: [
      {
        id: "lesson-1-step-1",
        type: "presentation",
        content: {
          title: "Découverte des Hiragana",
          body: "Les hiragana sont les caractères japonais les plus fondamentaux. Ils sont utilisés pour écrire les mots japonais natifs et les particules grammaticales.",
          japanese: "あ い う え お",
          reading: "a i u e o",
        },
      },
      {
        id: "lesson-1-step-2",
        type: "explanation",
        content: {
          title: "Formation des Hiragana",
          body: "Chaque hiragana représente un son. Par exemple, あ se prononce a, い se prononce i, etc.",
          japanese: "あ",
          reading: "a",
          meaning: "Le premier caractère hiragana",
        },
      },
      {
        id: "lesson-1-step-3",
        type: "exercise",
        content: {
          title: "Exercice 1",
          body: "Testez vos connaissances !",
        },
        exerciseId: "hir_ex_001",
      },
      {
        id: "lesson-1-step-4",
        type: "check",
        content: {
          title: "Vérification",
          body: "Parfait ! Vous connaissez les 5 voyelles de base. Continuons avec plus de hiragana.",
        },
      },
      {
        id: "lesson-1-step-5",
        type: "presentation",
        content: {
          title: "Hiragana avec Dakuten",
          body: "Les dakuten (points) ajoutent un son g, z, d, b aux consonnes de base. Par exemple, か devient が.",
          japanese: "か ざ が",
          reading: "ka za ga",
        },
      },
      {
        id: "lesson-1-step-6",
        type: "exercise",
        content: {
          title: "Exercice 2",
          body: "Testez vos connaissances !",
        },
        exerciseId: "hir_ex_002",
      },
      {
        id: "lesson-1-step-7",
        type: "check",
        content: {
          title: "Vérification",
          body: "Excellent ! Les hiragana avec dakuten sont acquis.",
        },
      },
      {
        id: "lesson-1-step-8",
        type: "presentation",
        content: {
          title: "Hiragana avec Yoon",
          body: "Les yoon sont des combinaisons de hiragana pour former des sons composés. Par exemple, き + ゃ = きゃ (kya).",
          japanese: "き + ゃ = きゃ",
          reading: "ki + small ya = kya",
        },
      },
      {
        id: "lesson-1-step-9",
        type: "exercise",
        content: {
          title: "Exercice 3",
          body: "Testez vos connaissances !",
        },
        exerciseId: "hir_ex_003",
      },
      {
        id: "lesson-1-step-10",
        type: "check",
        content: {
          title: "Vérification",
          body: "Bien joué ! Les hiragana avec yoon sont maîtrisés.",
        },
      },
      {
        id: "lesson-1-step-11",
        type: "synthesis",
        content: {
          title: "Synthèse",
          body: "Félicitations ! Vous avez appris les bases des hiragana : les 5 voyelles, les dakuten et les yoon.",
          japanese: "あ い う え お",
          reading: "a i u e o",
        },
      },
    ],
    exercises: ["hir_ex_001", "hir_ex_002", "hir_ex_003"],
  },
  {
    id: "lesson-2",
    title: "Vocabulaire Essentiel",
    description: "Apprenez les mots japonais les plus courants",
    conceptId: "vocabulaire-1",
    lessonSteps: [
      {
        id: "lesson-2-step-1",
        type: "presentation",
        content: {
          title: "Vocabulaire Essentiel",
          body: "Découvrez les mots japonais les plus utilisés au quotidien.",
          japanese: "みず たいよう はく",
          reading: "mizu taiyou haku",
        },
      },
      {
        id: "lesson-2-step-2",
        type: "explanation",
        content: {
          title: "Mots courants",
          body: "Mizu signifie eau et Taiyou signifie soleil. Ce sont des mots très courants.",
          japanese: "みず",
          reading: "mizu",
          meaning: "Eau",
        },
      },
      {
        id: "lesson-2-step-3",
        type: "exercise",
        content: {
          title: "Exercice 1",
          body: "Testez vos connaissances !",
        },
        exerciseId: "voc_ex_001",
      },
      {
        id: "lesson-2-step-4",
        type: "check",
        content: {
          title: "Vérification",
          body: "Excellent ! Mizu est bien le mot pour eau. Passons au soleil.",
        },
      },
      {
        id: "lesson-2-step-5",
        type: "exercise",
        content: {
          title: "Exercice 2",
          body: "Testez vos connaissances !",
        },
        exerciseId: "voc_ex_002",
      },
      {
        id: "lesson-2-step-6",
        type: "check",
        content: {
          title: "Vérification",
          body: "Bien joué ! Taiyou signifie soleil. Passons à un autre exemple.",
        },
      },
      {
        id: "lesson-2-step-7",
        type: "exercise",
        content: {
          title: "Exercice 3",
          body: "Testez vos connaissances !",
        },
        exerciseId: "voc_ex_003",
      },
      {
        id: "lesson-2-step-8",
        type: "check",
        content: {
          title: "Vérification",
          body: "Vous avez appris mizu (eau) et taiyou (soleil). Ces mots sont fondamentaux pour communiquer en japonais.",
        },
      },
    ],
    exercises: ["voc_ex_001", "voc_ex_002", "voc_ex_003"],
  },
  {
    id: "lesson-3",
    title: "Kanji de Base",
    description: "Introduction aux kanji essentiels",
    conceptId: "kanji-1",
    lessonSteps: [
      {
        id: "lesson-3-step-1",
        type: "presentation",
        content: {
          title: "Découverte des Kanji",
          body: "Les kanji sont des caractères d'origine chinoise utilisés dans l'écriture japonaise. Ils représentent des concepts ou des idées.",
          japanese: "人 山 川",
          reading: "jin yama kawa",
        },
      },
      {
        id: "lesson-3-step-2",
        type: "explanation",
        content: {
          title: "Kanji courants",
          body: "人 signifie personne et 山 signifie montagne. Ce sont des kanji très courants.",
          japanese: "人",
          reading: "jin",
          meaning: "Personne",
        },
      },
      {
        id: "lesson-3-step-3",
        type: "exercise",
        content: {
          title: "Exercice 1",
          body: "Testez vos connaissances !",
        },
        exerciseId: "kanji_ex_001",
      },
      {
        id: "lesson-3-step-4",
        type: "check",
        content: {
          title: "Vérification",
          body: "Parfait ! 人 signifie bien personne. Continuons avec 山.",
        },
      },
      {
        id: "lesson-3-step-5",
        type: "exercise",
        content: {
          title: "Exercice 2",
          body: "Testez vos connaissances !",
        },
        exerciseId: "kanji_ex_002",
      },
      {
        id: "lesson-3-step-6",
        type: "check",
        content: {
          title: "Vérification",
          body: "Vous avez appris 人 (personne) et 山 (montagne). Ces kanji sont essentiels pour commencer à lire les textes japonais.",
        },
      },
      {
        id: "lesson-3-step-7",
        type: "exercise",
        content: {
          title: "Exercice 3",
          body: "Testez vos connaissances !",
        },
        exerciseId: "kan_ex_003",
      },
      {
        id: "lesson-3-step-8",
        type: "exercise",
        content: {
          title: "Exercice 4",
          body: "Testez vos connaissances !",
        },
        exerciseId: "kan_ex_004",
      },
      {
        id: "lesson-3-step-9",
        type: "exercise",
        content: {
          title: "Exercice 5",
          body: "Testez vos connaissances !",
        },
        exerciseId: "kan_ex_005",
      },
      {
        id: "lesson-3-step-10",
        type: "exercise",
        content: {
          title: "Exercice 6",
          body: "Testez vos connaissances !",
        },
        exerciseId: "kan_ex_006",
      },
      {
        id: "lesson-3-step-11",
        type: "exercise",
        content: {
          title: "Exercice 7",
          body: "Testez vos connaissances !",
        },
        exerciseId: "kan_ex_007",
      },
      {
        id: "lesson-3-step-12",
        type: "exercise",
        content: {
          title: "Exercice 8",
          body: "Testez vos connaissances !",
        },
        exerciseId: "kan_ex_008",
      },
      {
        id: "lesson-3-step-13",
        type: "exercise",
        content: {
          title: "Exercice 9",
          body: "Testez vos connaissances !",
        },
        exerciseId: "kan_ex_009",
      },
      {
        id: "lesson-3-step-14",
        type: "exercise",
        content: {
          title: "Exercice 10",
          body: "Testez vos connaissances !",
        },
        exerciseId: "kan_ex_010",
      },
    ],
    exercises: ["kanji_ex_001", "kanji_ex_002", "kan_ex_003", "kan_ex_004", "kan_ex_005", "kan_ex_006", "kan_ex_007", "kan_ex_008", "kan_ex_009", "kan_ex_010"],
  },
  {
    id: "lesson-4",
    title: "Grammaire Fondamentale",
    description: "Les bases de la structure grammaticale japonaise",
    conceptId: "grammaire-1",
    lessonSteps: [
      {
        id: "lesson-4-step-1",
        type: "presentation",
        content: {
          title: "Structure de phrase",
          body: "En japonais, la structure de base est : Sujet + Wa + Complément + Desu. Watashi wa signifie Je et desu est une forme polie.",
          japanese: "わたし は です",
          reading: "watashi wa desu",
        },
      },
      {
        id: "lesson-4-step-2",
        type: "exercise",
        content: {
          title: "Exercice 1",
          body: "Testez vos connaissances !",
        },
        exerciseId: "gra_ex_001",
      },
      {
        id: "lesson-4-step-3",
        type: "check",
        content: {
          title: "Vérification",
          body: "Bien joué ! Gakusei signifie étudiant. Passons à un autre exemple.",
        },
      },
      {
        id: "lesson-4-step-4",
        type: "exercise",
        content: {
          title: "Exercice 2",
          body: "Testez vos connaissances !",
        },
        exerciseId: "gra_ex_002",
      },
      {
        id: "lesson-4-step-5",
        type: "exercise",
        content: {
          title: "Exercice 3",
          body: "Testez vos connaissances !",
        },
        exerciseId: "gra_ex_003",
      },
      {
        id: "lesson-4-step-6",
        type: "exercise",
        content: {
          title: "Exercice 4",
          body: "Testez vos connaissances !",
        },
        exerciseId: "gra_ex_004",
      },
      {
        id: "lesson-4-step-7",
        type: "exercise",
        content: {
          title: "Exercice 5",
          body: "Testez vos connaissances !",
        },
        exerciseId: "gra_ex_005",
      },
      {
        id: "lesson-4-step-8",
        type: "exercise",
        content: {
          title: "Exercice 6",
          body: "Testez vos connaissances !",
        },
        exerciseId: "gra_ex_006",
      },
      {
        id: "lesson-4-step-9",
        type: "exercise",
        content: {
          title: "Exercice 7",
          body: "Testez vos connaissances !",
        },
        exerciseId: "gra_ex_007",
      },
      {
        id: "lesson-4-step-10",
        type: "exercise",
        content: {
          title: "Exercice 8",
          body: "Testez vos connaissances !",
        },
        exerciseId: "gra_ex_008",
      },
      {
        id: "lesson-4-step-11",
        type: "exercise",
        content: {
          title: "Exercice 9",
          body: "Testez vos connaissances !",
        },
        exerciseId: "gra_ex_009",
      },
      {
        id: "lesson-4-step-12",
        type: "exercise",
        content: {
          title: "Exercice 10",
          body: "Testez vos connaissances !",
        },
        exerciseId: "gra_ex_010",
      },
      {
        id: "lesson-4-step-13",
        type: "exercise",
        content: {
          title: "Exercice 11",
          body: "Testez vos connaissances !",
        },
        exerciseId: "gra_ex_011",
      },
      {
        id: "lesson-4-step-14",
        type: "exercise",
        content: {
          title: "Exercice 12",
          body: "Testez vos connaissances !",
        },
        exerciseId: "gra_ex_012",
      },
      {
        id: "lesson-4-step-15",
        type: "exercise",
        content: {
          title: "Exercice 13",
          body: "Testez vos connaissances !",
        },
        exerciseId: "gra_ex_013",
      },
      {
        id: "lesson-4-step-16",
        type: "exercise",
        content: {
          title: "Exercice 14",
          body: "Testez vos connaissances !",
        },
        exerciseId: "gra_ex_014",
      },
      {
        id: "lesson-4-step-17",
        type: "exercise",
        content: {
          title: "Exercice 15",
          body: "Testez vos connaissances !",
        },
        exerciseId: "gra_ex_015",
      },
      {
        id: "lesson-4-step-18",
        type: "exercise",
        content: {
          title: "Exercice 16",
          body: "Testez vos connaissances !",
        },
        exerciseId: "gra_ex_016",
      },
      {
        id: "lesson-4-step-19",
        type: "check",
        content: {
          title: "Vérification",
          body: "Vous avez appris à utiliser la structure Watashi wa ___ desu et les mots gakusei (étudiant) et hon (livre). Ces bases sont essentielles pour communiquer en japonais.",
        },
      },
    ],
    exercises: ["gra_ex_001", "gra_ex_002", "gra_ex_003", "gra_ex_004", "gra_ex_005", "gra_ex_006", "gra_ex_007", "gra_ex_008", "gra_ex_009", "gra_ex_010", "gra_ex_011", "gra_ex_012", "gra_ex_013", "gra_ex_014", "gra_ex_015", "gra_ex_016"],
  },
  {
    id: "lesson-5",
    title: "Hiragana Avancés",
    description: "Apprenez les consonnes, dakuten et yoon en hiragana",
    conceptId: "kana-hiragana-2",
    lessonSteps: [
      {
        id: "lesson-5-step-1",
        type: "presentation",
        content: {
          title: "Les Consonnes en Hiragana",
          body: "Les hiragana ne sont pas que des voyelles. Il existe aussi des syllabes avec des consonnes : ka, ki, ku, ke, ko, sa, shi, su, se, so...",
          japanese: "か き く け こ",
          reading: "ka ki ku ke ko",
        },
      },
      {
        id: "lesson-5-step-2",
        type: "explanation",
        content: {
          title: "Les Dakuten",
          body: "Les dakuten (marks) transforment les consonnes en sons voiced : ka が ga, sa ざ za, ta だ da, ha ば ba/pa.",
          japanese: "が ざ だ ば ぱ",
          reading: "ga za da ba pa",
        },
      },
      {
        id: "lesson-5-step-3",
        type: "explanation",
        content: {
          title: "Les Yoon (combinés)",
          body: "Les yoon sont des combinaisons de consonnes avec i + ya, yu, yo : kya, kyu, kyo, sha, shu, sho...",
          japanese: "きゃ きゅ きょ",
          reading: "kya kyu kyo",
        },
      },
      {
        id: "lesson-5-step-4",
        type: "exercise",
        content: {
          title: "Exercice 1",
          body: "Testez vos connaissances !",
        },
        exerciseId: "hir_ex_022",
      },
      {
        id: "lesson-5-step-5",
        type: "check",
        content: {
          title: "Vérification",
          body: "Parfait ! Vous connaissez maintenant les consonnes de base.",
        },
      },
      {
        id: "lesson-5-step-6",
        type: "exercise",
        content: {
          title: "Exercice 2",
          body: "Testez vos connaissances !",
        },
        exerciseId: "hir_ex_023",
      },
      {
        id: "lesson-5-step-7",
        type: "exercise",
        content: {
          title: "Exercice 3",
          body: "Testez vos connaissances !",
        },
        exerciseId: "hir_ex_024",
      },
      {
        id: "lesson-5-step-8",
        type: "check",
        content: {
          title: "Vérification",
          body: "Excellent ! Les dakuten sont maintenant acquis.",
        },
      },
      {
        id: "lesson-5-step-9",
        type: "exercise",
        content: {
          title: "Exercice 4",
          body: "Testez vos connaissances !",
        },
        exerciseId: "hir_ex_025",
      },
      {
        id: "lesson-5-step-10",
        type: "check",
        content: {
          title: "Vérification",
          body: "Bien joué ! Les yoon sont maîtrisés.",
        },
      },
    ],
    exercises: ["hir_ex_022", "hir_ex_023", "hir_ex_024", "hir_ex_025"],
  },
  {
    id: "lesson-6",
    title: "Katakana de Base",
    description: "Découvrez les caractères katakana utilisés pour les mots étrangers",
    conceptId: "kana-katakana-1",
    lessonSteps: [
      {
        id: "lesson-6-step-1",
        type: "presentation",
        content: {
          title: "Introduction au Katakana",
          body: "Le katakana est utilisé pour les mots étrangers, les noms scientifiques, et les onomatopées. Il a la même prononciation que les hiragana mais un style différent.",
          japanese: "ア イ ウ エ オ",
          reading: "a i u e o",
        },
      },
      {
        id: "lesson-6-step-2",
        type: "explanation",
        content: {
          title: "Comparaison Hiragana vs Katakana",
          body: "Chaque hiragana a un équivalent katakana. Par exemple: あ ア (a), い イ (i), う ウ (u).",
          japanese: "ア イ ウ エ オ",
          reading: "a i u e o",
        },
      },
      {
        id: "lesson-6-step-3",
        type: "exercise",
        content: {
          title: "Exercice 1",
          body: "Testez vos connaissances !",
        },
        exerciseId: "kan_ex_011",
      },
      {
        id: "lesson-6-step-4",
        type: "check",
        content: {
          title: "Vérification",
          body: "Parfait ! Les voyelles katakana sont acquises.",
        },
      },
      {
        id: "lesson-6-step-5",
        type: "exercise",
        content: {
          title: "Exercice 2",
          body: "Testez vos connaissances !",
        },
        exerciseId: "kan_ex_012",
      },
      {
        id: "lesson-6-step-6",
        type: "exercise",
        content: {
          title: "Exercice 3",
          body: "Testez vos connaissances !",
        },
        exerciseId: "kan_ex_013",
      },
      {
        id: "lesson-6-step-7",
        type: "check",
        content: {
          title: "Vérification",
          body: "Excellent ! Les consonnes katakana sont maîtrisées.",
        },
      },
      {
        id: "lesson-6-step-8",
        type: "exercise",
        content: {
          title: "Exercice 4",
          body: "Testez vos connaissances !",
        },
        exerciseId: "kan_ex_014",
      },
      {
        id: "lesson-6-step-9",
        type: "check",
        content: {
          title: "Vérification",
          body: "Bien joué ! Vous connaissez les bases du katakana.",
        },
      },
    ],
    exercises: ["kan_ex_011", "kan_ex_012", "kan_ex_013", "kan_ex_014"],
  },
  {
    id: "lesson-7",
    title: "Nombres et Dates",
    description: "Apprenez à compter et à dire la date en japonais",
    conceptId: "vocab-nombres",
    lessonSteps: [
      {
        id: "lesson-7-step-1",
        type: "presentation",
        content: {
          title: "Les Nombres de 1 à 10",
          body: "Les nombres en japonais sont fondamentaux pour les achats, les adresses et les dates. Ichi (1), Ni (2), San (3), Shi/Yon (4), Go (5)...",
          japanese: "いち に さん し ご",
          reading: "ichi ni san shi go",
        },
      },
      {
        id: "lesson-7-step-2",
        type: "explanation",
        content: {
          title: "Les Nombres de 10 à 100",
          body: "Ju (10), hyaku (100), sen (1000), man (10000). Les nombres se composent facilement : ni-juu (20), san-juu (30)...",
          japanese: "じゅう ひゃく せん まん",
          reading: "juu hyaku sen man",
        },
      },
      {
        id: "lesson-7-step-3",
        type: "exercise",
        content: {
          title: "Exercice 1",
          body: "Testez vos connaissances !",
        },
        exerciseId: "num_ex_001",
      },
      {
        id: "lesson-7-step-4",
        type: "check",
        content: {
          title: "Vérification",
          body: "Parfait ! Les nombres de 1 à 5 sont acquis.",
        },
      },
      {
        id: "lesson-7-step-5",
        type: "exercise",
        content: {
          title: "Exercice 2",
          body: "Testez vos connaissances !",
        },
        exerciseId: "num_ex_002",
      },
      {
        id: "lesson-7-step-6",
        type: "exercise",
        content: {
          title: "Exercice 3",
          body: "Testez vos connaissances !",
        },
        exerciseId: "num_ex_003",
      },
      {
        id: "lesson-7-step-7",
        type: "check",
        content: {
          title: "Vérification",
          body: "Excellent ! Les dizaines sont maîtrisées.",
        },
      },
      {
        id: "lesson-7-step-8",
        type: "exercise",
        content: {
          title: "Exercice 4",
          body: "Testez vos connaissances !",
        },
        exerciseId: "num_ex_004",
      },
      {
        id: "lesson-7-step-9",
        type: "check",
        content: {
          title: "Vérification",
          body: "Bien joué ! Vous savez compter en japonais.",
        },
      },
    ],
    exercises: ["num_ex_001", "num_ex_002", "num_ex_003", "num_ex_004"],
  },
  {
    id: "lesson-8",
    title: "Verbes Essentiels",
    description: "Les verbes les plus importants pour communiquer en japonais",
    conceptId: "verbes-1",
    lessonSteps: [
      {
        id: "lesson-8-step-1",
        type: "presentation",
        content: {
          title: "Les Verbes de Base",
          body: "Les verbes japonais se conjuguent selon le temps et le degré de politesse. Tabemasu (manger), nomimasu (boire), ikimasu (aller)...",
          japanese: "たべます のみます いきます",
          reading: "tabemasu nomimasu ikimasu",
        },
      },
      {
        id: "lesson-8-step-2",
        type: "explanation",
        content: {
          title: "La Conjugaison Polie",
          body: "La forme polite se termine par -masu. Pour la négation, ajoutez -masen. Pour le passé, utilisez -mashita.",
          japanese: "たべます たべません たべました",
          reading: "tabemasu tabemasen tabemashita",
        },
      },
      {
        id: "lesson-8-step-3",
        type: "exercise",
        content: {
          title: "Exercice 1",
          body: "Testez vos connaissances !",
        },
        exerciseId: "verb_ex_001",
      },
      {
        id: "lesson-8-step-4",
        type: "check",
        content: {
          title: "Vérification",
          body: "Parfait ! Les verbes de base sont acquis.",
        },
      },
      {
        id: "lesson-8-step-5",
        type: "exercise",
        content: {
          title: "Exercice 2",
          body: "Testez vos connaissances !",
        },
        exerciseId: "verb_ex_002",
      },
      {
        id: "lesson-8-step-6",
        type: "exercise",
        content: {
          title: "Exercice 3",
          body: "Testez vos connaissances !",
        },
        exerciseId: "verb_ex_003",
      },
      {
        id: "lesson-8-step-7",
        type: "check",
        content: {
          title: "Vérification",
          body: "Excellent ! La conjugaison polie est maîtrisée.",
        },
      },
      {
        id: "lesson-8-step-8",
        type: "exercise",
        content: {
          title: "Exercice 4",
          body: "Testez vos connaissances !",
        },
        exerciseId: "verb_ex_004",
      },
      {
        id: "lesson-8-step-9",
        type: "check",
        content: {
          title: "Vérification",
          body: "Bien joué ! Vous maîtrisez les verbes essentiels.",
        },
      },
    ],
    exercises: ["verb_ex_001", "verb_ex_002", "verb_ex_003", "verb_ex_004"],
  },
  {
    id: "lesson-9",
    title: "Adjectifs en -i et -na",
    description: "Apprenez à utiliser les adjectifs japonais pour décrire des choses",
    conceptId: "adjectifs-1",
    lessonSteps: [
      {
        id: "lesson-9-step-1",
        type: "presentation",
        content: {
          title: "Les Adjectifs en -i",
          body: "Les adjectifs en -i se terminent par i au présent. Par exemple: takai (cher/haut), yasui (bon marché), omoshiroi (intéressant).",
          japanese: "たかい やすい おもしろい",
          reading: "takai yasui omoshiroi",
        },
      },
      {
        id: "lesson-9-step-2",
        type: "explanation",
        content: {
          title: "Les Adjectifs en -na",
          body: "Les adjectifs en -na nécessitent na avant un nom. Par exemple: shizuka na (calme), kirei na (propre/beau).",
          japanese: "しずかな きれいな",
          reading: "shizuka na kirei na",
        },
      },
      {
        id: "lesson-9-step-3",
        type: "exercise",
        content: {
          title: "Exercice 1",
          body: "Testez vos connaissances !",
        },
        exerciseId: "adj_ex_001",
      },
      {
        id: "lesson-9-step-4",
        type: "check",
        content: {
          title: "Vérification",
          body: "Parfait ! Les adjectifs en -i sont acquis.",
        },
      },
      {
        id: "lesson-9-step-5",
        type: "exercise",
        content: {
          title: "Exercice 2",
          body: "Testez vos connaissances !",
        },
        exerciseId: "adj_ex_002",
      },
      {
        id: "lesson-9-step-6",
        type: "exercise",
        content: {
          title: "Exercice 3",
          body: "Testez vos connaissances !",
        },
        exerciseId: "adj_ex_003",
      },
      {
        id: "lesson-9-step-7",
        type: "check",
        content: {
          title: "Vérification",
          body: "Excellent ! Les adjectifs en -na sont maîtrisés.",
        },
      },
      {
        id: "lesson-9-step-8",
        type: "exercise",
        content: {
          title: "Exercice 4",
          body: "Testez vos connaissances !",
        },
        exerciseId: "adj_ex_004",
      },
      {
        id: "lesson-9-step-9",
        type: "check",
        content: {
          title: "Vérification",
          body: "Bien joué ! Vous maîtrisez les adjectifs de base.",
        },
      },
    ],
    exercises: ["adj_ex_001", "adj_ex_002", "adj_ex_003", "adj_ex_004"],
  },
  {
    id: "lesson-10",
    title: "Particules Avancées",
    description: "Maîtrisez les particules essentielles pour construire des phrases correctes",
    conceptId: "particules-1",
    lessonSteps: [
      {
        id: "lesson-10-step-1",
        type: "presentation",
        content: {
          title: "Les Particules Clés",
          body: "Les particules sont essentielles en japonais. wa (は) marque le sujet, ga (が) le sujet spécifique, o (を) l'objet direct.",
          japanese: "は が を",
          reading: "wa ga o",
        },
      },
      {
        id: "lesson-10-step-2",
        type: "explanation",
        content: {
          title: "Particules de Lieu",
          body: "ni (に) marque la destination, de (で) marque le lieu d'action, e (へ) indique la direction.",
          japanese: "に で へ",
          reading: "ni de e",
        },
      },
      {
        id: "lesson-10-step-3",
        type: "exercise",
        content: {
          title: "Exercice 1",
          body: "Testez vos connaissances !",
        },
        exerciseId: "part_ex_001",
      },
      {
        id: "lesson-10-step-4",
        type: "check",
        content: {
          title: "Vérification",
          body: "Parfait ! Les particules de base sont acquises.",
        },
      },
      {
        id: "lesson-10-step-5",
        type: "exercise",
        content: {
          title: "Exercice 2",
          body: "Testez vos connaissances !",
        },
        exerciseId: "part_ex_002",
      },
      {
        id: "lesson-10-step-6",
        type: "exercise",
        content: {
          title: "Exercice 3",
          body: "Testez vos connaissances !",
        },
        exerciseId: "part_ex_003",
      },
      {
        id: "lesson-10-step-7",
        type: "check",
        content: {
          title: "Vérification",
          body: "Excellent ! Les particules de lieu sont maîtrisées.",
        },
      },
      {
        id: "lesson-10-step-8",
        type: "exercise",
        content: {
          title: "Exercice 4",
          body: "Testez vos connaissances !",
        },
        exerciseId: "part_ex_004",
      },
      {
        id: "lesson-10-step-9",
        type: "check",
        content: {
          title: "Vérification",
          body: "Bien joué ! Vous maîtrisez les particules essentielles.",
        },
      },
    ],
    exercises: ["part_ex_001", "part_ex_002", "part_ex_003", "part_ex_004"],
  },
  {
    id: "lesson-11",
    title: "Vocabulaire Quotidien",
    description: "Apprenez le vocabulaire essentiel pour la vie quotidienne",
    conceptId: "vocab-quotidien",
    lessonSteps: [
      {
        id: "lesson-11-step-1",
        type: "presentation",
        content: {
          title: "La Maison",
          body: "Vocabulaire de la maison: ie (maison), heya (chambre), daidokoro (cuisine), ofuro (baignoire).",
          japanese: "いえ へや だいきょう",
          reading: "ie daidokoro ofuro",
        },
      },
      {
        id: "lesson-11-step-2",
        type: "explanation",
        content: {
          title: "La Nourriture",
          body: "Vocabulaire de la nourriture: meshi (repas), gohan (riz), sushi (sushi), mizu (eau).",
          japanese: "ごはん すし みず",
          reading: "gohan sushi mizu",
        },
      },
      {
        id: "lesson-11-step-3",
        type: "exercise",
        content: {
          title: "Exercice 1",
          body: "Testez vos connaissances !",
        },
        exerciseId: "daily_ex_001",
      },
      {
        id: "lesson-11-step-4",
        type: "check",
        content: {
          title: "Vérification",
          body: "Parfait ! Le vocabulaire de la maison est acquis.",
        },
      },
      {
        id: "lesson-11-step-5",
        type: "exercise",
        content: {
          title: "Exercice 2",
          body: "Testez vos connaissances !",
        },
        exerciseId: "daily_ex_002",
      },
      {
        id: "lesson-11-step-6",
        type: "exercise",
        content: {
          title: "Exercice 3",
          body: "Testez vos connaissances !",
        },
        exerciseId: "daily_ex_003",
      },
      {
        id: "lesson-11-step-7",
        type: "check",
        content: {
          title: "Vérification",
          body: "Excellent ! Le vocabulaire de la nourriture est maîtrisé.",
        },
      },
      {
        id: "lesson-11-step-8",
        type: "exercise",
        content: {
          title: "Exercice 4",
          body: "Testez vos connaissances !",
        },
        exerciseId: "daily_ex_004",
      },
      {
        id: "lesson-11-step-9",
        type: "check",
        content: {
          title: "Vérification",
          body: "Bien joué ! Vous connaissez le vocabulaire quotidien essentiel.",
        },
      },
    ],
    exercises: ["daily_ex_001", "daily_ex_002", "daily_ex_003", "daily_ex_004"],
  },
  {
    id: "lesson-12",
    title: "Expressions Courantes",
    description: "Apprenez les expressions essentielles pour communiquer au quotidien",
    conceptId: "expressions-1",
    lessonSteps: [
      {
        id: "lesson-12-step-1",
        type: "presentation",
        content: {
          title: "Salutations",
          body: "Expressions de salutation: ohayou gozaimasu (bonjour le matin), konnichiwa (bonjour), konbanwa (bonsoir).",
          japanese: "おはようございます こんにちは こんばんは",
          reading: "ohayou gozaimasu konnichiwa konbanwa",
        },
      },
      {
        id: "lesson-12-step-2",
        type: "explanation",
        content: {
          title: "Remerciements",
          body: "Expressions de remerciement: arigatou gozaimasu (merci), sumimasen (excusez-moi/désolé), dou itashimashite (de rien).",
          japanese: "ありがとうございます どういたしまして",
          reading: "arigatou gozaimasu dou itashimashite",
        },
      },
      {
        id: "lesson-12-step-3",
        type: "exercise",
        content: {
          title: "Exercice 1",
          body: "Testez vos connaissances !",
        },
        exerciseId: "expr_ex_001",
      },
      {
        id: "lesson-12-step-4",
        type: "check",
        content: {
          title: "Vérification",
          body: "Parfait ! Les salutations sont acquises.",
        },
      },
      {
        id: "lesson-12-step-5",
        type: "exercise",
        content: {
          title: "Exercice 2",
          body: "Testez vos connaissances !",
        },
        exerciseId: "expr_ex_002",
      },
      {
        id: "lesson-12-step-6",
        type: "exercise",
        content: {
          title: "Exercice 3",
          body: "Testez vos connaissances !",
        },
        exerciseId: "expr_ex_003",
      },
      {
        id: "lesson-12-step-7",
        type: "check",
        content: {
          title: "Vérification",
          body: "Excellent ! Les remerciements sont maîtrisés.",
        },
      },
      {
        id: "lesson-12-step-8",
        type: "exercise",
        content: {
          title: "Exercice 4",
          body: "Testez vos connaissances !",
        },
        exerciseId: "expr_ex_004",
      },
      {
        id: "lesson-12-step-9",
        type: "check",
        content: {
          title: "Vérification",
          body: "Bien joué ! Vous maîtrisez les expressions courantes essentielles.",
        },
      },
    ],
    exercises: ["expr_ex_001", "expr_ex_002", "expr_ex_003", "expr_ex_004"],
  },
  {
    id: "lesson-13",
    title: "Verbes Irréguliers",
    description: "Apprenez les verbes irréguliers essentiels du japonais",
    conceptId: "verbes-irreguliers-1",
    lessonSteps: [
      {
        id: "lesson-13-step-1",
        type: "presentation",
        content: {
          title: "Les Deux Verbes Irréguliers",
          body: "En japonais, il n'y a que deux verbes irréguliers essentiels : suru (faire) et kuru (venir). Ils sont très courants.",
          japanese: "する くる",
          reading: "suru kuru",
        },
      },
      {
        id: "lesson-13-step-2",
        type: "explanation",
        content: {
          title: "Suru - Faire",
          body: "Suru signifie faire. Il se combine avec des mots d'origine chinoise pour former des verbes : benkyou suru (étudier), shigoto suru (travailler).",
          japanese: "べんきょうする しごとする",
          reading: "benkyou suru shigoto suru",
        },
      },
      {
        id: "lesson-13-step-3",
        type: "explanation",
        content: {
          title: "Kuru - Venir",
          body: "Kuru signifie venir. Sa forme polie est kimasu. C'est un verbe très utile pour les invitations.",
          japanese: "きます",
          reading: "kimasu",
        },
      },
      {
        id: "lesson-13-step-4",
        type: "exercise",
        content: {
          title: "Exercice 1",
          body: "Testez vos connaissances !",
        },
        exerciseId: "irr_ex_001",
      },
      {
        id: "lesson-13-step-5",
        type: "check",
        content: {
          title: "Vérification",
          body: "Parfait ! Les verbes irréguliers de base sont acquis.",
        },
      },
      {
        id: "lesson-13-step-6",
        type: "exercise",
        content: {
          title: "Exercice 2",
          body: "Testez vos connaissances !",
        },
        exerciseId: "irr_ex_002",
      },
      {
        id: "lesson-13-step-7",
        type: "exercise",
        content: {
          title: "Exercice 3",
          body: "Testez vos connaissances !",
        },
        exerciseId: "irr_ex_003",
      },
      {
        id: "lesson-13-step-8",
        type: "check",
        content: {
          title: "Vérification",
          body: "Excellent ! Vous maîtrisez suru et kuru.",
        },
      },
      {
        id: "lesson-13-step-9",
        type: "exercise",
        content: {
          title: "Exercice 4",
          body: "Testez vos connaissances !",
        },
        exerciseId: "irr_ex_004",
      },
      {
        id: "lesson-13-step-10",
        type: "check",
        content: {
          title: "Vérification",
          body: "Bien joué ! Les verbes irréguliers sont maîtrisés.",
        },
      },
    ],
    exercises: ["irr_ex_001", "irr_ex_002", "irr_ex_003", "irr_ex_004"],
  },
  {
    id: "lesson-14",
    title: "Questions et Réponses",
    description: "Apprenez à poser des questions et à y répondre en japonais",
    conceptId: "questions-1",
    lessonSteps: [
      {
        id: "lesson-14-step-1",
        type: "presentation",
        content: {
          title: "Les Mots Interrogatifs",
          body: "Les mots interrogatifs japonais : nani (quoi), dare (qui), doko (où), itsu (quand), dou (comment), ikutsu (combien).",
          japanese: "なに だれ どこ いつ どう いくつ",
          reading: "nani dare doko itsu dou ikutsu",
        },
      },
      {
        id: "lesson-14-step-2",
        type: "explanation",
        content: {
          title: "Former une Question",
          body: "Pour poser une question, ajoutez ka (か) à la fin de la phrase. Exemple : Watashi wa gakusei desu → Watashi wa gakusei desu ka ?",
          japanese: "がくせい ですか？",
          reading: "gakusei desu ka?",
        },
      },
      {
        id: "lesson-14-step-3",
        type: "exercise",
        content: {
          title: "Exercice 1",
          body: "Testez vos connaissances !",
        },
        exerciseId: "quest_ex_001",
      },
      {
        id: "lesson-14-step-4",
        type: "check",
        content: {
          title: "Vérification",
          body: "Parfait ! Les mots interrogatifs sont acquis.",
        },
      },
      {
        id: "lesson-14-step-5",
        type: "exercise",
        content: {
          title: "Exercice 2",
          body: "Testez vos connaissances !",
        },
        exerciseId: "quest_ex_002",
      },
      {
        id: "lesson-14-step-6",
        type: "exercise",
        content: {
          title: "Exercice 3",
          body: "Testez vos connaissances !",
        },
        exerciseId: "quest_ex_003",
      },
      {
        id: "lesson-14-step-7",
        type: "check",
        content: {
          title: "Vérification",
          body: "Excellent ! La formation des questions est maîtrisée.",
        },
      },
      {
        id: "lesson-14-step-8",
        type: "exercise",
        content: {
          title: "Exercice 4",
          body: "Testez vos connaissances !",
        },
        exerciseId: "quest_ex_004",
      },
      {
        id: "lesson-14-step-9",
        type: "check",
        content: {
          title: "Vérification",
          body: "Bien joué ! Vous savez poser des questions.",
        },
      },
    ],
    exercises: ["quest_ex_001", "quest_ex_002", "quest_ex_003", "quest_ex_004"],
  },
  {
    id: "lesson-15",
    title: "La Famille",
    description: "Apprenez le vocabulaire de la famille en japonais",
    conceptId: "famille-1",
    lessonSteps: [
      {
        id: "lesson-15-step-1",
        type: "presentation",
        content: {
          title: "Les Membres de la Famille",
          body: "Vocabulaire de la famille : chichi (mon père), haha (ma mère), ani (mon frère aîné), ane (ma sœur aînée), imouto (ma jeune sœur).",
          japanese: "ちちはは あにいもうと",
          reading: "chichi haha ani ane imouto",
        },
      },
      {
        id: "lesson-15-step-2",
        type: "explanation",
        content: {
          title: "Familles élargies",
          body: "Grand-parents : soufu (grand-père paternel), soubo (grand-mère paternelle). Oncle/tante : oji (oncle paternel), oba (tante paternelle).",
          japanese: "そふ そぼ おじ おば",
          reading: "soufu soubo oji oba",
        },
      },
      {
        id: "lesson-15-step-3",
        type: "exercise",
        content: {
          title: "Exercice 1",
          body: "Testez vos connaissances !",
        },
        exerciseId: "fam_ex_001",
      },
      {
        id: "lesson-15-step-4",
        type: "check",
        content: {
          title: "Vérification",
          body: "Parfait ! Le vocabulaire de base de la famille est acquis.",
        },
      },
      {
        id: "lesson-15-step-5",
        type: "exercise",
        content: {
          title: "Exercice 2",
          body: "Testez vos connaissances !",
        },
        exerciseId: "fam_ex_002",
      },
      {
        id: "lesson-15-step-6",
        type: "exercise",
        content: {
          title: "Exercice 3",
          body: "Testez vos connaissances !",
        },
        exerciseId: "fam_ex_003",
      },
      {
        id: "lesson-15-step-7",
        type: "check",
        content: {
          title: "Vérification",
          body: "Excellent ! Les membres élargis de la famille sont maîtrisés.",
        },
      },
      {
        id: "lesson-15-step-8",
        type: "exercise",
        content: {
          title: "Exercice 4",
          body: "Testez vos connaissances !",
        },
        exerciseId: "fam_ex_004",
      },
      {
        id: "lesson-15-step-9",
        type: "check",
        content: {
          title: "Vérification",
          body: "Bien joué ! Vous connaissez le vocabulaire familial.",
        },
      },
    ],
    exercises: ["fam_ex_001", "fam_ex_002", "fam_ex_003", "fam_ex_004"],
  },
  {
    id: "lesson-16",
    title: "Les Animaux",
    description: "Apprenez le vocabulaire des animaux courants en japonais",
    conceptId: "animaux-1",
    lessonSteps: [
      {
        id: "lesson-16-step-1",
        type: "presentation",
        content: {
          title: "Les Animaux Courants",
          body: "Vocabulaire des animaux : inu (chien), neko (chat), tora (tigre), zou (éléphant), sakana (poisson).",
          japanese: "いねこ トラ ぞう さかな",
          reading: "inu neko tora zou sakana",
        },
      },
      {
        id: "lesson-16-step-2",
        type: "explanation",
        content: {
          title: "Les Animaux Sauvages",
          body: "Animaux sauvages : kuma (ours), ouki (loup), saru (singe), hebi (serpent), taka (faucon).",
          japanese: "くま おうき さる へび たか",
          reading: "kuma ouki saru hebi taka",
        },
      },
      {
        id: "lesson-16-step-3",
        type: "exercise",
        content: {
          title: "Exercice 1",
          body: "Testez vos connaissances !",
        },
        exerciseId: "ani_ex_001",
      },
      {
        id: "lesson-16-step-4",
        type: "check",
        content: {
          title: "Vérification",
          body: "Parfait ! Les animaux domestiques sont acquis.",
        },
      },
      {
        id: "lesson-16-step-5",
        type: "exercise",
        content: {
          title: "Exercice 2",
          body: "Testez vos connaissances !",
        },
        exerciseId: "ani_ex_002",
      },
      {
        id: "lesson-16-step-6",
        type: "exercise",
        content: {
          title: "Exercice 3",
          body: "Testez vos connaissances !",
        },
        exerciseId: "ani_ex_003",
      },
      {
        id: "lesson-16-step-7",
        type: "check",
        content: {
          title: "Vérification",
          body: "Excellent ! Les animaux sauvages sont maîtrisés.",
        },
      },
      {
        id: "lesson-16-step-8",
        type: "exercise",
        content: {
          title: "Exercice 4",
          body: "Testez vos connaissances !",
        },
        exerciseId: "ani_ex_004",
      },
      {
        id: "lesson-16-step-9",
        type: "check",
        content: {
          title: "Vérification",
          body: "Bien joué ! Vous connaissez le vocabulaire des animaux.",
        },
      },
    ],
    exercises: ["ani_ex_001", "ani_ex_002", "ani_ex_003", "ani_ex_004"],
  },
  {
    id: "lesson-17",
    title: "La Ville et les Directions",
    description: "Apprenez à demander et donner des directions dans la ville",
    conceptId: "ville-directions-1",
    lessonSteps: [
      {
        id: "lesson-17-step-1",
        type: "presentation",
        content: {
          title: "Lieux de la Ville",
          body: "Vocabulaire urbain : ekimae (devant la gare), ginkou (banque), hoteru (hôtel), byouin (hôpital), paaaku (parc).",
          japanese: "えきまえ ぎんこう ホテル びょういん パーク",
          reading: "ekimae ginkou hoteru byouin paaaku",
        },
      },
      {
        id: "lesson-17-step-2",
        type: "explanation",
        content: {
          title: "Les Directions",
          body: "Expressions de direction : migi (droite), hidari (gauche), massugu (tout droit), magaru (tournant).",
          japanese: "みぎ ひだり まっすぐ まがる",
          reading: "migi hidari massugu magaru",
        },
      },
      {
        id: "lesson-17-step-3",
        type: "exercise",
        content: {
          title: "Exercice 1",
          body: "Testez vos connaissances !",
        },
        exerciseId: "dir_ex_001",
      },
      {
        id: "lesson-17-step-4",
        type: "check",
        content: {
          title: "Vérification",
          body: "Parfait ! Les lieux de la ville sont acquis.",
        },
      },
      {
        id: "lesson-17-step-5",
        type: "exercise",
        content: {
          title: "Exercice 2",
          body: "Testez vos connaissances !",
        },
        exerciseId: "dir_ex_002",
      },
      {
        id: "lesson-17-step-6",
        type: "exercise",
        content: {
          title: "Exercice 3",
          body: "Testez vos connaissances !",
        },
        exerciseId: "dir_ex_003",
      },
      {
        id: "lesson-17-step-7",
        type: "check",
        content: {
          title: "Vérification",
          body: "Excellent ! Les directions sont maîtrisées.",
        },
      },
      {
        id: "lesson-17-step-8",
        type: "exercise",
        content: {
          title: "Exercice 4",
          body: "Testez vos connaissances !",
        },
        exerciseId: "dir_ex_004",
      },
      {
        id: "lesson-17-step-9",
        type: "check",
        content: {
          title: "Vérification",
          body: "Bien joué ! Vous savez demander votre chemin.",
        },
      },
    ],
    exercises: ["dir_ex_001", "dir_ex_002", "dir_ex_003", "dir_ex_004"],
  },
  {
    id: "lesson-18",
    title: "Les Couleurs et les Nombres",
    description: "Apprenez à nommer les couleurs et compter en japonais",
    conceptId: "couleurs-nombres-1",
    lessonSteps: [
      {
        id: "lesson-18-step-1",
        type: "presentation",
        content: {
          title: "Les Couleurs de Base",
          body: "Les couleurs : aka (rouge), ao (bleu), shiro (blanc), kuro (noir), midori (vert), ki (jaune).",
          japanese: "あか あお しろ くろ みどり き",
          reading: "aka ao shiro kuro midori ki",
        },
      },
      {
        id: "lesson-18-step-2",
        type: "explanation",
        content: {
          title: "Nombres Composés",
          body: "Les nombres composés : juu-ichi (11), ni-juu (20), san-juu-go (35), hyaku (100), sen (1000).",
          japanese: "じゅういち にじゅう さんじゅうご ひゃく せん",
          reading: "juu-ichi ni-juu san-juu-go hyaku sen",
        },
      },
      {
        id: "lesson-18-step-3",
        type: "exercise",
        content: {
          title: "Exercice 1",
          body: "Testez vos connaissances !",
        },
        exerciseId: "couleur_ex_001",
      },
      {
        id: "lesson-18-step-4",
        type: "check",
        content: {
          title: "Vérification",
          body: "Parfait ! Les couleurs de base sont acquises.",
        },
      },
      {
        id: "lesson-18-step-5",
        type: "exercise",
        content: {
          title: "Exercice 2",
          body: "Testez vos connaissances !",
        },
        exerciseId: "couleur_ex_002",
      },
      {
        id: "lesson-18-step-6",
        type: "exercise",
        content: {
          title: "Exercice 3",
          body: "Testez vos connaissances !",
        },
        exerciseId: "couleur_ex_003",
      },
      {
        id: "lesson-18-step-7",
        type: "check",
        content: {
          title: "Vérification",
          body: "Excellent ! Les nombres composés sont maîtrisés.",
        },
      },
      {
        id: "lesson-18-step-8",
        type: "exercise",
        content: {
          title: "Exercice 4",
          body: "Testez vos connaissances !",
        },
        exerciseId: "couleur_ex_004",
      },
      {
        id: "lesson-18-step-9",
        type: "check",
        content: {
          title: "Vérification",
          body: "Bien joué ! Vous maîtrisez couleurs et nombres.",
        },
      },
    ],
    exercises: ["couleur_ex_001", "couleur_ex_002", "couleur_ex_003", "couleur_ex_004"],
  },
  {
    id: "lesson-19",
    title: "Les Saisons et la Météo",
    description: "Apprenez à parler des saisons et du temps qu'il fait",
    conceptId: "saisons-meteo-1",
    lessonSteps: [
      {
        id: "lesson-19-step-1",
        type: "presentation",
        content: {
          title: "Les Quatre Saisons",
          body: "Les saisons : haru (printemps), natsu (été), aki (automne), fuyu (hiver). Chacune a ses caractéristiques.",
          japanese: "はる なつ あき ふゆ",
          reading: "haru natsu aki fuyu",
        },
      },
      {
        id: "lesson-19-step-2",
        type: "explanation",
        content: {
          title: "La Météo",
          body: "Le temps : tenki (météo), hare (ensoleillé), ame (pluie), yuki (neige), kaze (vent).",
          japanese: "てんき はれ あめ ゆき かぜ",
          reading: "tenki hare ame yuki kaze",
        },
      },
      {
        id: "lesson-19-step-3",
        type: "exercise",
        content: {
          title: "Exercice 1",
          body: "Testez vos connaissances !",
        },
        exerciseId: "meteo_ex_001",
      },
      {
        id: "lesson-19-step-4",
        type: "check",
        content: {
          title: "Vérification",
          body: "Parfait ! Les saisons sont acquises.",
        },
      },
      {
        id: "lesson-19-step-5",
        type: "exercise",
        content: {
          title: "Exercice 2",
          body: "Testez vos connaissances !",
        },
        exerciseId: "meteo_ex_002",
      },
      {
        id: "lesson-19-step-6",
        type: "exercise",
        content: {
          title: "Exercice 3",
          body: "Testez vos connaissances !",
        },
        exerciseId: "meteo_ex_003",
      },
      {
        id: "lesson-19-step-7",
        type: "check",
        content: {
          title: "Vérification",
          body: "Excellent ! Le vocabulaire météo est maîtrisé.",
        },
      },
      {
        id: "lesson-19-step-8",
        type: "exercise",
        content: {
          title: "Exercice 4",
          body: "Testez vos connaissances !",
        },
        exerciseId: "meteo_ex_004",
      },
      {
        id: "lesson-19-step-9",
        type: "check",
        content: {
          title: "Vérification",
          body: "Bien joué ! Vous savez parler des saisons et de la météo.",
        },
      },
    ],
    exercises: ["meteo_ex_001", "meteo_ex_002", "meteo_ex_003", "meteo_ex_004"],
  },
  {
    id: "lesson-20",
    title: "Le Shopping et les Prix",
    description: "Apprenez à faire vos courses et à négocier les prix",
    conceptId: "shopping-prix-1",
    lessonSteps: [
      {
        id: "lesson-20-step-1",
        type: "presentation",
        content: {
          title: "Magasins et Articles",
          body: "Types de magasins : depato (grand magasin), suupaa (supermarché), mise (magasin). Articles : mono (chose), kaku (prix).",
          japanese: "デパート スーパー みせ もの かく",
          reading: "depato suupaa mise mono kaku",
        },
      },
      {
        id: "lesson-20-step-2",
        type: "explanation",
        content: {
          title: "Poser la Question du Prix",
          body: "Comment demander le prix : ikura desu ka ? (combien ça coûte ?), kore wa ikura desu ka ? (combien coûte ceci ?).",
          japanese: "いくら ですか？",
          reading: "ikura desu ka?",
        },
      },
      {
        id: "lesson-20-step-3",
        type: "exercise",
        content: {
          title: "Exercice 1",
          body: "Testez vos connaissances !",
        },
        exerciseId: "shop_ex_001",
      },
      {
        id: "lesson-20-step-4",
        type: "check",
        content: {
          title: "Vérification",
          body: "Parfait ! Le vocabulaire du shopping est acquis.",
        },
      },
      {
        id: "lesson-20-step-5",
        type: "exercise",
        content: {
          title: "Exercice 2",
          body: "Testez vos connaissances !",
        },
        exerciseId: "shop_ex_002",
      },
      {
        id: "lesson-20-step-6",
        type: "exercise",
        content: {
          title: "Exercice 3",
          body: "Testez vos connaissances !",
        },
        exerciseId: "shop_ex_003",
      },
      {
        id: "lesson-20-step-7",
        type: "check",
        content: {
          title: "Vérification",
          body: "Excellent ! Les expressions de prix sont maîtrisées.",
        },
      },
      {
        id: "lesson-20-step-8",
        type: "exercise",
        content: {
          title: "Exercice 4",
          body: "Testez vos connaissances !",
        },
        exerciseId: "shop_ex_004",
      },
      {
        id: "lesson-20-step-9",
        type: "check",
        content: {
          title: "Vérification",
          body: "Bien joué ! Vous êtes prêt pour le shopping !",
        },
      },
    ],
    exercises: ["shop_ex_001", "shop_ex_002", "shop_ex_003", "shop_ex_004"],
  },
  {
    id: "lesson-21",
    title: "Culture Japonaise",
    description: "Découvrez les traditions, l'étiquette et la culture japonaise",
    conceptId: "culture-1",
    lessonSteps: [
      {
        id: "lesson-21-step-1",
        type: "presentation",
        content: {
          title: "Les Salutations Traditionnelles",
          body: "Le bow (おじぎ - ojigi) est une salutation traditionnelle. Plus la révérence est profonde, plus le respect est marqué. Ohayou gozaimasu (bonjour le matin), konnichiwa (bonjour), konbanwa (bonsoir).",
          japanese: "おじぎ おはようございます こんにちは こんばんは",
          reading: "ojigi ohayou gozaimasu konnichiwa konbanwa",
        },
      },
      {
        id: "lesson-21-step-2",
        type: "explanation",
        content: {
          title: "L'Étiquette à Table",
          body: "En japonais, on dit itadakimasu (いただきます) avant de manger et gochisousama deshita (ごちそうさまでした) après. Ces expressions montrent la gratitude.",
          japanese: "いただきます ごちそうさまでした",
          reading: "itadakimasu gochisousama deshita",
        },
      },
      {
        id: "lesson-21-step-3",
        type: "exercise",
        content: {
          title: "Exercice 1",
          body: "Testez vos connaissances !",
        },
        exerciseId: "cultur_ex_001",
      },
      {
        id: "lesson-21-step-4",
        type: "check",
        content: {
          title: "Vérification",
          body: "Parfait ! Les salutations traditionnelles sont acquises.",
        },
      },
      {
        id: "lesson-21-step-5",
        type: "exercise",
        content: {
          title: "Exercice 2",
          body: "Testez vos connaissances !",
        },
        exerciseId: "cultur_ex_002",
      },
      {
        id: "lesson-21-step-6",
        type: "exercise",
        content: {
          title: "Exercice 3",
          body: "Testez vos connaissances !",
        },
        exerciseId: "cultur_ex_003",
      },
      {
        id: "lesson-21-step-7",
        type: "check",
        content: {
          title: "Vérification",
          body: "Excellent ! L'étiquette japonaise est maîtrisée.",
        },
      },
      {
        id: "lesson-21-step-8",
        type: "exercise",
        content: {
          title: "Exercice 4",
          body: "Testez vos connaissances !",
        },
        exerciseId: "cultur_ex_004",
      },
      {
        id: "lesson-21-step-9",
        type: "check",
        content: {
          title: "Vérification",
          body: "Bien joué ! Vous connaissez les bases de la culture japonaise.",
        },
      },
    ],
    exercises: ["cultur_ex_001", "cultur_ex_002", "cultur_ex_003", "cultur_ex_004"],
  },
  {
    id: "lesson-22",
    title: "Le Corps Humain",
    description: "Apprenez le vocabulaire des parties du corps en japonais",
    conceptId: "corps-1",
    lessonSteps: [
      {
        id: "lesson-22-step-1",
        type: "presentation",
        content: {
          title: "Les Parties du Corps",
          body: "Vocabulaire du corps : atama (tête), te (main), ashi (pied), me (œil), mimi (oreille), hada (peau).",
          japanese: "あたま て あし め みみ はだ",
          reading: "atama te ashi me mimi hada",
        },
      },
      {
        id: "lesson-22-step-2",
        type: "explanation",
        content: {
          title: "Le Visage",
          body: "Parties du visage : kao (visage), hana (nez), kuchi (bouche), yubi (doigt). Ces mots sont essentiels pour décrire.",
          japanese: "かお はな くち ゆび",
          reading: "kao hana kuchi yubi",
        },
      },
      {
        id: "lesson-22-step-3",
        type: "exercise",
        content: {
          title: "Exercice 1",
          body: "Testez vos connaissances !",
        },
        exerciseId: "corps_ex_001",
      },
      {
        id: "lesson-22-step-4",
        type: "check",
        content: {
          title: "Vérification",
          body: "Parfait ! Les parties du corps de base sont acquises.",
        },
      },
      {
        id: "lesson-22-step-5",
        type: "exercise",
        content: {
          title: "Exercice 2",
          body: "Testez vos connaissances !",
        },
        exerciseId: "corps_ex_002",
      },
      {
        id: "lesson-22-step-6",
        type: "exercise",
        content: {
          title: "Exercice 3",
          body: "Testez vos connaissances !",
        },
        exerciseId: "corps_ex_003",
      },
      {
        id: "lesson-22-step-7",
        type: "check",
        content: {
          title: "Vérification",
          body: "Excellent ! Le vocabulaire du visage est maîtrisé.",
        },
      },
      {
        id: "lesson-22-step-8",
        type: "exercise",
        content: {
          title: "Exercice 4",
          body: "Testez vos connaissances !",
        },
        exerciseId: "corps_ex_004",
      },
      {
        id: "lesson-22-step-9",
        type: "check",
        content: {
          title: "Vérification",
          body: "Bien joué ! Vous connaissez le vocabulaire du corps humain.",
        },
      },
    ],
    exercises: ["corps_ex_001", "corps_ex_002", "corps_ex_003", "corps_ex_004"],
  },
  {
    id: "lesson-23",
    title: "Le Temps et les Heures",
    description: "Apprenez à dire l'heure et les jours de la semaine",
    conceptId: "temps-1",
    lessonSteps: [
      {
        id: "lesson-23-step-1",
        type: "presentation",
        content: {
          title: "Dire l'Heure",
          body: "Pour dire l'heure : nan-ji desu ka ? (quelle heure est-il ?). ichi-ji (1h), ni-ji (2h), san-ji (3h). Les demi-heures : han (半).",
          japanese: "なんじ ですか いちじ にじ さんじ はん",
          reading: "nan-ji desu ka ichi-ji ni-ji san-ji han",
        },
      },
      {
        id: "lesson-23-step-2",
        type: "explanation",
        content: {
          title: "Les Jours de la Semaine",
          body: "Dimanche à samedi : nichiyoubi (dimanche), getsuyoubi (lundi), kayoubi (mardi), suiyoubi (mercredi), mokuyoubi (jeudi), kinyoubi (vendredi), doyoubi (samedi).",
          japanese: "にちようび げつようび かようすいようび もくようび きんようび どうようび",
          reading: "nichiyoubi getsuyoubi kayoubi suiyoubi mokuyoubi kinyoubi doyoubi",
        },
      },
      {
        id: "lesson-23-step-3",
        type: "exercise",
        content: {
          title: "Exercice 1",
          body: "Testez vos connaissances !",
        },
        exerciseId: "temps_ex_001",
      },
      {
        id: "lesson-23-step-4",
        type: "check",
        content: {
          title: "Vérification",
          body: "Parfait ! Dire l'heure est acquis.",
        },
      },
      {
        id: "lesson-23-step-5",
        type: "exercise",
        content: {
          title: "Exercice 2",
          body: "Testez vos connaissances !",
        },
        exerciseId: "temps_ex_002",
      },
      {
        id: "lesson-23-step-6",
        type: "exercise",
        content: {
          title: "Exercice 3",
          body: "Testez vos connaissances !",
        },
        exerciseId: "temps_ex_003",
      },
      {
        id: "lesson-23-step-7",
        type: "check",
        content: {
          title: "Vérification",
          body: "Excellent ! Les jours de la semaine sont maîtrisés.",
        },
      },
      {
        id: "lesson-23-step-8",
        type: "exercise",
        content: {
          title: "Exercice 4",
          body: "Testez vos connaissances !",
        },
        exerciseId: "temps_ex_004",
      },
      {
        id: "lesson-23-step-9",
        type: "check",
        content: {
          title: "Vérification",
          body: "Bien joué ! Vous savez gérer le temps en japonais.",
        },
      },
    ],
    exercises: ["temps_ex_001", "temps_ex_002", "temps_ex_003", "temps_ex_004"],
  },
  {
    id: "lesson-24",
    title: "Numérique et Technologie",
    description: "Vocabulaire technologique et communication moderne",
    conceptId: "numerique-1",
    lessonSteps: [
      {
        id: "lesson-24-step-1",
        type: "presentation",
        content: {
          title: "Technologie Quotidienne",
          body: "Mots technologiques : pasu (mot de passe), internet, denwa (téléphone), pasokon (ordinateur), kamera (caméra).",
          japanese: "パス インターネット でんわ パソコン カメラ",
          reading: "pasu internet denwa pasokon kamera",
        },
      },
      {
        id: "lesson-24-step-2",
        type: "explanation",
        content: {
          title: "Communication Numérique",
          body: "Expressions numériques : email (メール), SNS, app, download (ダウンロード), upload (アップロード). Le japonais utilise beaucoup de katakana pour ces termes.",
          japanese: "メール SNS アプリ ダウンロード アップロード",
          reading: "email SNS app download upload",
        },
      },
      {
        id: "lesson-24-step-3",
        type: "exercise",
        content: {
          title: "Exercice 1",
          body: "Testez vos connaissances !",
        },
        exerciseId: "nume_ex_001",
      },
      {
        id: "lesson-24-step-4",
        type: "check",
        content: {
          title: "Vérification",
          body: "Parfait ! Le vocabulaire technologique est acquis.",
        },
      },
      {
        id: "lesson-24-step-5",
        type: "exercise",
        content: {
          title: "Exercice 2",
          body: "Testez vos connaissances !",
        },
        exerciseId: "nume_ex_002",
      },
      {
        id: "lesson-24-step-6",
        type: "exercise",
        content: {
          title: "Exercice 3",
          body: "Testez vos connaissances !",
        },
        exerciseId: "nume_ex_003",
      },
      {
        id: "lesson-24-step-7",
        type: "check",
        content: {
          title: "Vérification",
          body: "Excellent ! La communication numérique est maîtrisée.",
        },
      },
      {
        id: "lesson-24-step-8",
        type: "exercise",
        content: {
          title: "Exercice 4",
          body: "Testez vos connaissances !",
        },
        exerciseId: "nume_ex_004",
      },
      {
        id: "lesson-24-step-9",
        type: "check",
        content: {
          title: "Vérification",
          body: "Bien joué ! Vous maîtrisez le vocabulaire numérique.",
        },
      },
    ],
    exercises: ["nume_ex_001", "nume_ex_002", "nume_ex_003", "nume_ex_004"],
  },
];
