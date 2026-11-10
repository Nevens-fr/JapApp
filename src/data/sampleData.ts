// Données de démonstration pour l'application
// Ces données sont utilisées par le hook useLearningEngine pour fournir des données réalistes

import type { Concept } from "../core/learning/types";
import type { Exercise, ExpectedAnswer } from "../exercises/types";

/**
 * Concepts pédagogiques de démonstration
 * Couvre différents types : kana, vocabulaire, kanji, grammaire
 */
export const SAMPLE_CONCEPTS: Concept[] = [
  {
    id: "kana-hiragana-1",
    name: "Hiragana de base",
    type: "kana",
    description: "Les caractères hiragana fondamentaux",
    difficulty: 1,
    prerequisites: [],
  },
  {
    id: "vocab-essentials-1",
    name: "Vocabulaire essentiel",
    type: "vocab",
    description: "Mots japonais courants pour débutants",
    difficulty: 1,
    prerequisites: ["kana-hiragana-1"],
  },
  {
    id: "kanji-basic-1",
    name: "Kanji de base",
    type: "kanji",
    description: "Les kanji les plus courants",
    difficulty: 1,
    prerequisites: ["kana-hiragana-1"],
  },
  {
    id: "grammar-basic-1",
    name: "Grammaire fondamentale",
    type: "grammar",
    description: "Structures grammaticales de base",
    difficulty: 1,
    prerequisites: ["vocab-essentials-1"],
  },
];

/**
 * Exercices de démonstration associés aux concepts
 */
const makeExpectedAnswer = (value: string, comparison: "exact" | "case-insensitive" = "exact", score: number = 1): ExpectedAnswer => ({
  value,
  comparison,
  score,
});

export const SAMPLE_EXERCISES: Exercise[] = [
  // Exercices pour les hiragana
  {
    id: "exercise-hiragana-1",
    type: "recognition-kana",
    answerFormat: "choice",
    objective: "Reconnaître les hiragana de base",
    difficulty: 1,
    prompt: "Quel est ce caractère ?",
    data: {
      character: "あ",
      options: ["a", "i", "u", "e"],
      correctIndex: 0,
    },
    expectedAnswers: [makeExpectedAnswer("a")],
    explanation: "Le caractère あ se prononce 'a'.",
    conceptId: "kana-hiragana-1",
  },
  {
    id: "exercise-hiragana-2",
    type: "recognition-kana",
    answerFormat: "choice",
    objective: "Reconnaître les hiragana de base",
    difficulty: 1,
    prompt: "Quel est ce caractère ?",
    data: {
      character: "い",
      options: ["a", "i", "u", "e"],
      correctIndex: 1,
    },
    expectedAnswers: [makeExpectedAnswer("i")],
    explanation: "Le caractère い se prononce 'i'.",
    conceptId: "kana-hiragana-1",
  },
  // Exercices pour le vocabulaire
  {
    id: "exercise-vocab-1",
    type: "recognition-vocab",
    answerFormat: "choice",
    objective: "Connaître le vocabulaire de base",
    difficulty: 1,
    prompt: "Comment dit-on 'eau' en japonais ?",
    data: {
      question: "みず",
      options: ["mizu", "hi", "kaze", "yama"],
      correctIndex: 0,
    },
    expectedAnswers: [makeExpectedAnswer("mizu")],
    explanation: "みず (水) signifie 'eau' en japonais.",
    conceptId: "vocab-essentials-1",
  },
  {
    id: "exercise-vocab-2",
    type: "recognition-vocab",
    answerFormat: "choice",
    objective: "Connaître le vocabulaire de base",
    difficulty: 1,
    prompt: "Comment dit-on 'soleil' en japonais ?",
    data: {
      question: "たいよう",
      options: ["tsuki", "hoshi", "taiyou", "sora"],
      correctIndex: 2,
    },
    expectedAnswers: [makeExpectedAnswer("taiyou")],
    explanation: "たいよう (太陽) signifie 'soleil' en japonais.",
    conceptId: "vocab-essentials-1",
  },
  // Exercices pour les kanji
  {
    id: "exercise-kanji-1",
    type: "recognition-kanji",
    answerFormat: "choice",
    objective: "Connaître les kanji de base",
    difficulty: 1,
    prompt: "Quel est le sens de ce kanji ?",
    data: {
      kanji: "人",
      options: ["personne", "eau", "feu", "bois"],
      correctIndex: 0,
    },
    expectedAnswers: [makeExpectedAnswer("personne")],
    explanation: "人 (ひと) signifie 'personne' en japonais.",
    conceptId: "kanji-basic-1",
  },
  {
    id: "exercise-kanji-2",
    type: "recognition-kanji",
    answerFormat: "choice",
    objective: "Connaître les kanji de base",
    difficulty: 1,
    prompt: "Quel est le sens de ce kanji ?",
    data: {
      kanji: "山",
      options: ["mer", "montagne", "rivière", "forêt"],
      correctIndex: 1,
    },
    expectedAnswers: [makeExpectedAnswer("montagne")],
    explanation: "山 (やま) signifie 'montagne' en japonais.",
    conceptId: "kanji-basic-1",
  },
  // Exercices pour la grammaire
  {
    id: "exercise-grammar-1",
    type: "grammar-fill",
    answerFormat: "text",
    objective: "Maîtriser les structures grammaticales de base",
    difficulty: 1,
    prompt: "Complétez la phrase : 'Watashi wa ___ desu.' (Je suis étudiant)",
    data: {
      sentence: "Watashi wa ___ desu.",
      translation: "Je suis étudiant",
      hint: "がくせい (学生)",
    },
    expectedAnswers: [
      makeExpectedAnswer("gakusei"),
      makeExpectedAnswer("がくせい"),
    ],
    explanation: "がくせい (学生) signifie 'étudiant' en japonais.",
    conceptId: "grammar-basic-1",
  },
  {
    id: "exercise-grammar-2",
    type: "grammar-fill",
    answerFormat: "text",
    objective: "Maîtriser les structures grammaticales de base",
    difficulty: 1,
    prompt: "Complétez la phrase : 'Kore wa ___ desu.' (Ceci est un livre)",
    data: {
      sentence: "Kore wa ___ desu.",
      translation: "Ceci est un livre",
      hint: "ほん (本)",
    },
    expectedAnswers: [
      makeExpectedAnswer("hon"),
      makeExpectedAnswer("ほん"),
    ],
    explanation: "ほん (本) signifie 'livre' en japonais.",
    conceptId: "grammar-basic-1",
  },
];

/**
 * Leçons structurées pour le parcours d'apprentissage
 */
export const SAMPLE_LESSONS = [
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
          body: "Chaque hiragana représente un son. Par exemple, 'あ' se prononce 'a', 'い' se prononce 'i', etc.",
          japanese: "あ",
          reading: "a",
          meaning: "Le premier caractère hiragana",
        },
      },
      {
        id: "lesson-1-step-3",
        type: "example",
        content: {
          title: "Exemple de lecture",
          body: "Voici comment lire ces caractères :",
          japanese: "あいうえお",
          reading: "a-i-u-e-o",
          meaning: "Les 5 voyelles de base",
        },
      },
      {
        id: "lesson-1-step-4",
        type: "exercise",
        content: {
          title: "Exercice 1",
          body: "Testez vos connaissances !",
        },
        exerciseId: "exercise-hiragana-1",
      },
      {
        id: "lesson-1-step-5",
        type: "check",
        content: {
          title: "Vérification",
          body: "Bien joué ! Vous avez reconnu le caractère 'あ'. Continuez avec le suivant.",
        },
      },
      {
        id: "lesson-1-step-6",
        type: "exercise",
        content: {
          title: "Exercice 2",
          body: "Encore un exercice pour renforcer votre apprentissage.",
        },
        exerciseId: "exercise-hiragana-2",
      },
      {
        id: "lesson-1-step-7",
        type: "synthesis",
        content: {
          title: "Synthèse",
          body: "Vous avez appris les bases des hiragana 'あ' et 'い'. Ces caractères sont essentiels pour commencer à lire le japonais.",
        },
      },
    ],
    exercises: ["exercise-hiragana-1", "exercise-hiragana-2"],
    estimatedDuration: 15,
  },
  {
    id: "lesson-2",
    title: "Vocabulaire Essentiel",
    description: "Découvrez les mots japonais courants",
    conceptId: "vocab-essentials-1",
    lessonSteps: [
      {
        id: "lesson-2-step-1",
        type: "presentation",
        content: {
          title: "Introduction au Vocabulaire",
          body: "Apprenons quelques mots essentiels en japonais. Ces mots vous seront utiles dans la vie quotidienne.",
          japanese: "みず たいよう",
          reading: "mizu taiyou",
        },
      },
      {
        id: "lesson-2-step-2",
        type: "explanation",
        content: {
          title: "Mots Clés",
          body: "'Mizu' signifie 'eau' et 'Taiyou' signifie 'soleil'. Ce sont des mots très courants.",
          japanese: "みず",
          reading: "mizu",
          meaning: "Eau",
        },
      },
      {
        id: "lesson-2-step-3",
        type: "example",
        content: {
          title: "Exemple en phrase",
          body: "Voici comment utiliser ces mots dans une phrase :",
          japanese: "みずはあまい",
          reading: "mizu wa amai",
          meaning: "L'eau est douce",
        },
      },
      {
        id: "lesson-2-step-4",
        type: "exercise",
        content: {
          title: "Exercice 1",
          body: "Quel est le mot pour 'eau' ?",
        },
        exerciseId: "exercise-vocab-1",
      },
      {
        id: "lesson-2-step-5",
        type: "check",
        content: {
          title: "Vérification",
          body: "Excellent ! 'Mizu' est bien le mot pour 'eau'. Passons au soleil.",
        },
      },
      {
        id: "lesson-2-step-6",
        type: "exercise",
        content: {
          title: "Exercice 2",
          body: "Testons votre connaissance du mot 'soleil'.",
        },
        exerciseId: "exercise-vocab-2",
      },
      {
        id: "lesson-2-step-7",
        type: "synthesis",
        content: {
          title: "Synthèse",
          body: "Vous avez appris 'mizu' (eau) et 'taiyou' (soleil). Ces mots sont fondamentaux pour communiquer en japonais.",
        },
      },
    ],
    exercises: ["exercise-vocab-1", "exercise-vocab-2"],
    estimatedDuration: 20,
  },
  {
    id: "lesson-3",
    title: "Kanji de Base",
    description: "Les kanji les plus importants",
    conceptId: "kanji-basic-1",
    lessonSteps: [
      {
        id: "lesson-3-step-1",
        type: "presentation",
        content: {
          title: "Introduction aux Kanji",
          body: "Les kanji sont des caractères d'origine chinoise utilisés dans l'écriture japonaise. Ils représentent des concepts ou des idées.",
          japanese: "人 山",
          reading: "hito yama",
        },
      },
      {
        id: "lesson-3-step-2",
        type: "explanation",
        content: {
          title: "Signification des Kanji",
          body: "'人' signifie 'personne' et '山' signifie 'montagne'. Ce sont des kanji très courants.",
          japanese: "人",
          reading: "hito",
          meaning: "Personne",
        },
      },
      {
        id: "lesson-3-step-3",
        type: "example",
        content: {
          title: "Exemple d'utilisation",
          body: "Voici comment ces kanji apparaissent dans des mots :",
          japanese: "日本人",
          reading: "nihonjin",
          meaning: "Japonais (personne japonaise)",
        },
      },
      {
        id: "lesson-3-step-4",
        type: "exercise",
        content: {
          title: "Exercice 1",
          body: "Quel est le sens du kanji '人' ?",
        },
        exerciseId: "exercise-kanji-1",
      },
      {
        id: "lesson-3-step-5",
        type: "check",
        content: {
          title: "Vérification",
          body: "Parfait ! '人' signifie bien 'personne'. Continuons avec '山'.",
        },
      },
      {
        id: "lesson-3-step-6",
        type: "exercise",
        content: {
          title: "Exercice 2",
          body: "Testons votre connaissance du kanji '山'.",
        },
        exerciseId: "exercise-kanji-2",
      },
      {
        id: "lesson-3-step-7",
        type: "synthesis",
        content: {
          title: "Synthèse",
          body: "Vous avez appris '人' (personne) et '山' (montagne). Ces kanji sont essentiels pour commencer à lire les textes japonais.",
        },
      },
    ],
    exercises: ["exercise-kanji-1", "exercise-kanji-2"],
    estimatedDuration: 25,
  },
  {
    id: "lesson-4",
    title: "Grammaire Fondamentale",
    description: "Les structures grammaticales essentielles",
    conceptId: "grammar-basic-1",
    lessonSteps: [
      {
        id: "lesson-4-step-1",
        type: "presentation",
        content: {
          title: "Introduction à la Grammaire",
          body: "Apprenons les structures grammaticales de base du japonais. Ces structures vous aideront à former des phrases simples.",
          japanese: "Watashi wa gakusei desu.",
          reading: "Watashi wa gakusei desu.",
        },
      },
      {
        id: "lesson-4-step-2",
        type: "explanation",
        content: {
          title: "Structure de la Phrase",
          body: "En japonais, la structure de base est : Sujet + Wa + Complément + Desu. 'Watashi wa' signifie 'Je' et 'desu' est une forme polie.",
          japanese: "Watashi wa",
          reading: "Watashi wa",
          meaning: "Je (sujet)",
        },
      },
      {
        id: "lesson-4-step-3",
        type: "example",
        content: {
          title: "Exemple de phrase",
          body: "Voici un exemple complet :",
          japanese: "Watashi wa gakusei desu.",
          reading: "Watashi wa gakusei desu.",
          meaning: "Je suis étudiant",
        },
      },
      {
        id: "lesson-4-step-4",
        type: "exercise",
        content: {
          title: "Exercice 1",
          body: "Complétez la phrase pour dire 'Je suis étudiant'.",
        },
        exerciseId: "exercise-grammar-1",
      },
      {
        id: "lesson-4-step-5",
        type: "check",
        content: {
          title: "Vérification",
          body: "Bien joué ! 'Gakusei' signifie 'étudiant'. Passons à un autre exemple.",
        },
      },
      {
        id: "lesson-4-step-6",
        type: "exercise",
        content: {
          title: "Exercice 2",
          body: "Complétez la phrase pour dire 'Ceci est un livre'.",
        },
        exerciseId: "exercise-grammar-2",
      },
      {
        id: "lesson-4-step-7",
        type: "synthesis",
        content: {
          title: "Synthèse",
          body: "Vous avez appris à utiliser la structure 'Watashi wa ___ desu' et les mots 'gakusei' (étudiant) et 'hon' (livre). Ces bases sont essentielles pour communiquer en japonais.",
        },
      },
    ],
    exercises: ["exercise-grammar-1", "exercise-grammar-2"],
    estimatedDuration: 30,
  },
];
