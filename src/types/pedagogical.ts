/**
 * Types partagés pour les données pédagogiques
 * Lot 2 : Modèle de données pédagogiques
 */

// --- Vocabulaire ---

export interface VocabEntry {
  id: string;
  japanese: string;
  reading: string;
  meaning: string;
  categoryId: string;
  level: string;
  examples?: string[];
  audioUrl?: string;
  tags?: string[];
}

// --- Kana ---

export type KanaType = 'hiragana' | 'katakana';

export interface KanaEntry {
  id: string;
  character: string;
  type: KanaType;
  romaji: string;
  group: string;
  variants?: string[];
  pedagogicalOrder: number;
}

// --- Kanji ---

export interface KanjiEntry {
  id: string;
  character: string;
  onyomi?: string[];
  kunyomi?: string[];
  meanings: string[];
  level: string;
  associatedVocab?: string[];
  examples?: string[];
}

// --- Grammaire ---

export interface GrammarEntry {
  id: string;
  name: string;
  explanation: string;
  structure: string;
  examples: string[];
  prerequisites?: string[];
  level: string;
  commonErrors?: string[];
}

// --- Phrases ---

export interface SentenceEntry {
  id: string;
  japanese: string;
  reading: string;
  translation: string;
  associatedVocab?: string[];
  associatedGrammar?: string[];
  difficultyLevel: number;
}

// --- Leçons ---

export interface LessonEntry {
  id: string;
  title: string;
  description: string;
  order: number;
  objectives: string[];
  prerequisites?: string[];
  conceptsIntroduced: string[];
  associatedExercises?: string[];
}

// --- Exercices ---

export interface ExerciseEntry {
  id: string;
  type: string;
  difficulty: number;
  data: Record<string, unknown>;
  pedagogicalObjective: string;
  expectedAnswer: unknown;
  explanation?: string;
}
