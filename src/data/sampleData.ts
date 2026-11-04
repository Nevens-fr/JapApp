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
      hint: "学生 (がくせい)",
    },
    expectedAnswers: [
      makeExpectedAnswer("gakusei"),
      makeExpectedAnswer("学生"),
    ],
    explanation: "学生 (がくせい) signifie 'étudiant' en japonais.",
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
      hint: "本 (ほん)",
    },
    expectedAnswers: [
      makeExpectedAnswer("hon"),
      makeExpectedAnswer("本"),
    ],
    explanation: "本 (ほん) signifie 'livre' en japonais.",
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
    exercises: ["exercise-hiragana-1", "exercise-hiragana-2"],
    estimatedDuration: 10,
  },
  {
    id: "lesson-2",
    title: "Vocabulaire Essentiel",
    description: "Découvrez les mots japonais courants",
    conceptId: "vocab-essentials-1",
    exercises: ["exercise-vocab-1", "exercise-vocab-2"],
    estimatedDuration: 15,
  },
  {
    id: "lesson-3",
    title: "Kanji de Base",
    description: "Les kanji les plus importants",
    conceptId: "kanji-basic-1",
    exercises: ["exercise-kanji-1", "exercise-kanji-2"],
    estimatedDuration: 20,
  },
  {
    id: "lesson-4",
    title: "Grammaire Fondamentale",
    description: "Les structures grammaticales essentielles",
    conceptId: "grammar-basic-1",
    exercises: ["exercise-grammar-1", "exercise-grammar-2"],
    estimatedDuration: 25,
  },
];
