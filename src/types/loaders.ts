/**
 * Chargement des contenus pédagogiques
 * Lot 2 : Modèle de données pédagogiques
 *
 * Ce module gère le chargement des fichiers JSON de contenu pédagogique
 * et leur validation.
 */

import {
  validateVocabEntry,
  validateKanaEntry,
  validateKanjiEntry,
  validateGrammarEntry,
  validateSentenceEntry,
  validateLessonEntry,
  validateExerciseEntry,
  validateCrossReferences,
  ValidationResult,
  CrossReferenceResult,
} from "./schemas";
import {
  VocabEntry,
  KanaEntry,
  KanjiEntry,
  GrammarEntry,
  SentenceEntry,
  LessonEntry,
  ExerciseEntry,
} from "./pedagogical";

// --- Types de contenu ---

export type ContentType = "vocab" | "kana" | "kanji" | "grammar" | "sentence" | "lesson" | "exercise";

// --- Chargement d'un fichier JSON ---

async function loadJsonFile<T>(url: string): Promise<T[]> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Erreur lors du chargement de ${url} : ${response.status} ${response.statusText}`);
  }
  const data: unknown[] = await response.json();
  return data as T[];
}

// --- Validation individuelle ---

function validateEntries<T>(entries: unknown[], validator: (entry: unknown) => ValidationResult): ValidationResult {
  const errors: string[] = [];

  for (let i = 0; i < entries.length; i++) {
    const result = validator(entries[i]);
    if (!result.valid) {
      for (const error of result.errors) {
        errors.push(`Entrée à l'index ${i} : ${error}`);
      }
    }
  }

  return { valid: errors.length === 0, errors };
}

// --- Chargement et validation du vocabulaire ---

export async function loadVocab(url: string): Promise<VocabEntry[]> {
  const entries = await loadJsonFile<VocabEntry>(url);
  const result = validateEntries(entries, validateVocabEntry);
  if (!result.valid) {
    throw new Error(`Validation du vocabulaire échouée :\n${result.errors.join("\n")}`);
  }
  return entries;
}

// --- Chargement et validation des kana ---

export async function loadKana(url: string): Promise<KanaEntry[]> {
  const entries = await loadJsonFile<KanaEntry>(url);
  const result = validateEntries(entries, validateKanaEntry);
  if (!result.valid) {
    throw new Error(`Validation des kana échouée :\n${result.errors.join("\n")}`);
  }
  return entries;
}

// --- Chargement et validation des kanji ---

export async function loadKanji(url: string): Promise<KanjiEntry[]> {
  const entries = await loadJsonFile<KanjiEntry>(url);
  const result = validateEntries(entries, validateKanjiEntry);
  if (!result.valid) {
    throw new Error(`Validation des kanji échouée :\n${result.errors.join("\n")}`);
  }
  return entries;
}

// --- Chargement et validation de la grammaire ---

export async function loadGrammar(url: string): Promise<GrammarEntry[]> {
  const entries = await loadJsonFile<GrammarEntry>(url);
  const result = validateEntries(entries, validateGrammarEntry);
  if (!result.valid) {
    throw new Error(`Validation de la grammaire échouée :\n${result.errors.join("\n")}`);
  }
  return entries;
}

// --- Chargement et validation des phrases ---

export async function loadSentences(url: string): Promise<SentenceEntry[]> {
  const entries = await loadJsonFile<SentenceEntry>(url);
  const result = validateEntries(entries, validateSentenceEntry);
  if (!result.valid) {
    throw new Error(`Validation des phrases échouée :\n${result.errors.join("\n")}`);
  }
  return entries;
}

// --- Chargement et validation des leçons ---

export async function loadLessons(url: string): Promise<LessonEntry[]> {
  const entries = await loadJsonFile<LessonEntry>(url);
  const result = validateEntries(entries, validateLessonEntry);
  if (!result.valid) {
    throw new Error(`Validation des leçons échouée :\n${result.errors.join("\n")}`);
  }
  return entries;
}

// --- Chargement et validation des exercices ---

export async function loadExercises(url: string): Promise<ExerciseEntry[]> {
  const entries = await loadJsonFile<ExerciseEntry>(url);
  const result = validateEntries(entries, validateExerciseEntry);
  if (!result.valid) {
    throw new Error(`Validation des exercices échouée :\n${result.errors.join("\n")}`);
  }
  return entries;
}

// --- Chargement complet ---

export interface ContentLoadResult {
  vocab: VocabEntry[];
  kana: KanaEntry[];
  kanji: KanjiEntry[];
  grammar: GrammarEntry[];
  sentences: SentenceEntry[];
  lessons: LessonEntry[];
  exercises: ExerciseEntry[];
  crossReferenceResult: CrossReferenceResult;
}

export async function loadAllContent(
  vocabUrl: string,
  kanaUrl: string,
  kanjiUrl: string,
  grammarUrl: string,
  sentencesUrl: string,
  lessonsUrl: string,
  exercisesUrl: string
): Promise<ContentLoadResult> {
  const [vocab, kana, kanji, grammar, sentences, lessons, exercises] = await Promise.all([
    loadVocab(vocabUrl),
    loadKana(kanaUrl),
    loadKanji(kanjiUrl),
    loadGrammar(grammarUrl),
    loadSentences(sentencesUrl),
    loadLessons(lessonsUrl),
    loadExercises(exercisesUrl),
  ]);

  const crossReferenceResult = validateCrossReferences(vocab, kana, kanji, grammar, sentences, lessons, exercises);

  if (!crossReferenceResult.valid) {
    throw new Error(`Validation des références croisées échouée :\n${crossReferenceResult.errors.join("\n")}`);
  }

  return {
    vocab,
    kana,
    kanji,
    grammar,
    sentences,
    lessons,
    exercises,
    crossReferenceResult,
  };
}
