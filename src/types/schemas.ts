/**
 * Schémas de validation pour les données pédagogiques
 * Lot 2 : Modèle de données pédagogiques
 *
 * Ces fonctions permettent de valider la structure et les références
 * des fichiers JSON de contenu pédagogique.
 */

import type { VocabEntry, KanaEntry, KanjiEntry, GrammarEntry, SentenceEntry, LessonEntry, ExerciseEntry } from "./pedagogical";

// --- Utilitaires ---

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

function isValidId(id: string): boolean {
  return typeof id === "string" && id.length > 0 && /^[a-z0-9_]+$/.test(id);
}

function createResult(errors: string[]): ValidationResult {
  return { valid: errors.length === 0, errors };
}

// --- Validation Vocabulaire ---

export function validateVocabEntry(entry: unknown): ValidationResult {
  const errors: string[] = [];

  if (entry === null || typeof entry !== "object") {
    return createResult(["L'entrée vocabulaire doit être un objet"]);  
  }

  const data = entry as any;

  if (!isValidId(data.id)) {
    errors.push("id est obligatoire et doit être une chaîne alphanumérique");
  }
  if (typeof data.japanese !== "string" || data.japanese.length === 0) {
    errors.push("japanese est obligatoire");
  }
  if (typeof data.reading !== "string" || data.reading.length === 0) {
    errors.push("reading est obligatoire");
  }
  if (typeof data.meaning !== "string" || data.meaning.length === 0) {
    errors.push("meaning est obligatoire");
  }
  if (typeof data.categoryId !== "string" || data.categoryId.length === 0) {
    errors.push("categoryId est obligatoire");
  }
  if (typeof data.level !== "string" || data.level.length === 0) {
    errors.push("level est obligatoire");
  }
  if (data.examples !== undefined && !Array.isArray(data.examples)) {
    errors.push("examples doit être un tableau");
  }
  if (data.audioUrl !== undefined && typeof data.audioUrl !== "string") {
    errors.push("audioUrl doit être une chaîne");
  }
  if (data.tags !== undefined && !Array.isArray(data.tags)) {
    errors.push("tags doit être un tableau");
  }

  return createResult(errors);
}

// --- Validation Kana ---

export function validateKanaEntry(entry: unknown): ValidationResult {
  const errors: string[] = [];

  if (entry === null || typeof entry !== "object") {
    return createResult(["L'entrée kana doit être un objet"]);  
  }

  const data = entry as any;

  if (!isValidId(data.id)) {
    errors.push("id est obligatoire et doit être une chaîne alphanumérique");
  }
  if (typeof data.character !== "string" || data.character.length !== 1) {
    errors.push("character doit être un seul caractère");
  }
  if (data.type !== "hiragana" && data.type !== "katakana") {
    errors.push("type doit être 'hiragana' ou 'katakana'");
  }
  if (typeof data.romaji !== "string" || data.romaji.length === 0) {
    errors.push("romaji est obligatoire");
  }
  if (typeof data.group !== "string" || data.group.length === 0) {
    errors.push("group est obligatoire");
  }
  if (typeof data.pedagogicalOrder !== "number" || data.pedagogicalOrder < 0) {
    errors.push("pedagogicalOrder doit être un nombre positif");
  }
  if (data.variants !== undefined && !Array.isArray(data.variants)) {
    errors.push("variants doit être un tableau");
  }

  return createResult(errors);
}

// --- Validation Kanji ---

export function validateKanjiEntry(entry: unknown): ValidationResult {
  const errors: string[] = [];

  if (entry === null || typeof entry !== "object") {
    return createResult(["L'entrée kanji doit être un objet"]);  
  }

  const data = entry as any;

  if (!isValidId(data.id)) {
    errors.push("id est obligatoire et doit être une chaîne alphanumérique");
  }
  if (typeof data.character !== "string" || data.character.length === 0) {
    errors.push("character est obligatoire");
  }
  if (!Array.isArray(data.meanings) || data.meanings.length === 0) {
    errors.push("meanings doit être un tableau non vide");
  }
  if (typeof data.level !== "string" || data.level.length === 0) {
    errors.push("level est obligatoire");
  }
  if (data.onyomi !== undefined && !Array.isArray(data.onyomi)) {
    errors.push("onyomi doit être un tableau");
  }
  if (data.kunyomi !== undefined && !Array.isArray(data.kunyomi)) {
    errors.push("kunyomi doit être un tableau");
  }
  if (data.associatedVocab !== undefined && !Array.isArray(data.associatedVocab)) {
    errors.push("associatedVocab doit être un tableau");
  }
  if (data.examples !== undefined && !Array.isArray(data.examples)) {
    errors.push("examples doit être un tableau");
  }

  return createResult(errors);
}

// --- Validation Grammaire ---

export function validateGrammarEntry(entry: unknown): ValidationResult {
  const errors: string[] = [];

  if (entry === null || typeof entry !== "object") {
    return createResult(["L'entrée grammaire doit être un objet"]);  
  }

  const data = entry as any;

  if (!isValidId(data.id)) {
    errors.push("id est obligatoire et doit être une chaîne alphanumérique");
  }
  if (typeof data.name !== "string" || data.name.length === 0) {
    errors.push("name est obligatoire");
  }
  if (typeof data.explanation !== "string" || data.explanation.length === 0) {
    errors.push("explanation est obligatoire");
  }
  if (typeof data.structure !== "string" || data.structure.length === 0) {
    errors.push("structure est obligatoire");
  }
  if (!Array.isArray(data.examples) || data.examples.length === 0) {
    errors.push("examples doit être un tableau non vide");
  }
  if (typeof data.level !== "string" || data.level.length === 0) {
    errors.push("level est obligatoire");
  }
  if (data.prerequisites !== undefined && !Array.isArray(data.prerequisites)) {
    errors.push("prerequisites doit être un tableau");
  }
  if (data.commonErrors !== undefined && !Array.isArray(data.commonErrors)) {
    errors.push("commonErrors doit être un tableau");
  }

  return createResult(errors);
}

// --- Validation Phrases ---

export function validateSentenceEntry(entry: unknown): ValidationResult {
  const errors: string[] = [];

  if (entry === null || typeof entry !== "object") {
    return createResult(["L'entrée phrase doit être un objet"]);  
  }

  const data = entry as any;

  if (!isValidId(data.id)) {
    errors.push("id est obligatoire et doit être une chaîne alphanumérique");
  }
  if (typeof data.japanese !== "string" || data.japanese.length === 0) {
    errors.push("japanese est obligatoire");
  }
  if (typeof data.reading !== "string" || data.reading.length === 0) {
    errors.push("reading est obligatoire");
  }
  if (typeof data.translation !== "string" || data.translation.length === 0) {
    errors.push("translation est obligatoire");
  }
  if (typeof data.difficultyLevel !== "number" || data.difficultyLevel < 1) {
    errors.push("difficultyLevel doit être un nombre positif");
  }
  if (data.associatedVocab !== undefined && !Array.isArray(data.associatedVocab)) {
    errors.push("associatedVocab doit être un tableau");
  }
  if (data.associatedGrammar !== undefined && !Array.isArray(data.associatedGrammar)) {
    errors.push("associatedGrammar doit être un tableau");
  }

  return createResult(errors);
}

// --- Validation Leçons ---

export function validateLessonEntry(entry: unknown): ValidationResult {
  const errors: string[] = [];

  if (entry === null || typeof entry !== "object") {
    return createResult(["L'entrée leçon doit être un objet"]);  
  }

  const data = entry as any;

  if (!isValidId(data.id)) {
    errors.push("id est obligatoire et doit être une chaîne alphanumérique");
  }
  if (typeof data.title !== "string" || data.title.length === 0) {
    errors.push("title est obligatoire");
  }
  if (typeof data.description !== "string" || data.description.length === 0) {
    errors.push("description est obligatoire");
  }
  if (typeof data.order !== "number" || data.order < 0) {
    errors.push("order doit être un nombre positif");
  }
  if (!Array.isArray(data.objectives) || data.objectives.length === 0) {
    errors.push("objectives doit être un tableau non vide");
  }
  if (typeof data.conceptsIntroduced !== "object" || data.conceptsIntroduced === null || !Array.isArray(data.conceptsIntroduced)) {
    errors.push("conceptsIntroduced doit être un tableau");
  }
  if (data.prerequisites !== undefined && !Array.isArray(data.prerequisites)) {
    errors.push("prerequisites doit être un tableau");
  }
  if (data.associatedExercises !== undefined && !Array.isArray(data.associatedExercises)) {
    errors.push("associatedExercises doit être un tableau");
  }

  return createResult(errors);
}

// --- Validation Exercices ---

export function validateExerciseEntry(entry: unknown): ValidationResult {
  const errors: string[] = [];

  if (entry === null || typeof entry !== "object") {
    return createResult(["L'entrée exercice doit être un objet"]);  
  }

  const data = entry as any;

  if (!isValidId(data.id)) {
    errors.push("id est obligatoire et doit être une chaîne alphanumérique");
  }
  if (typeof data.type !== "string" || data.type.length === 0) {
    errors.push("type est obligatoire");
  }
  if (typeof data.difficulty !== "number" || data.difficulty < 1) {
    errors.push("difficulty doit être un nombre positif");
  }
  if (typeof data.data !== "object" || data.data === null) {
    errors.push("data doit être un objet");
  }
  if (typeof data.pedagogicalObjective !== "string" || data.pedagogicalObjective.length === 0) {
    errors.push("pedagogicalObjective est obligatoire");
  }
  if (data.expectedAnswer === undefined || data.expectedAnswer === null) {
    errors.push("expectedAnswer est obligatoire");
  }
  if (data.explanation !== undefined && typeof data.explanation !== "string") {
    errors.push("explanation doit être une chaîne");
  }

  return createResult(errors);
}

// --- Validation de lots complets ---

export interface CrossReferenceResult {
  valid: boolean;
  errors: string[];
}

export function validateCrossReferences(
  vocabEntries: VocabEntry[],
  kanaEntries: KanaEntry[],
  kanjiEntries: KanjiEntry[],
  grammarEntries: GrammarEntry[],
  sentenceEntries: SentenceEntry[],
  lessonEntries: LessonEntry[],
  exerciseEntries: ExerciseEntry[]
): CrossReferenceResult {
  const errors: string[] = [];

  // Collecter tous les IDs existants
  const vocabIds = new Set(vocabEntries.map((e) => e.id));
  const kanaIds = new Set(kanaEntries.map((e) => e.id));
  const kanjiIds = new Set(kanjiEntries.map((e) => e.id));
  const grammarIds = new Set(grammarEntries.map((e) => e.id));
  const lessonIds = new Set(lessonEntries.map((e) => e.id));
  const exerciseIds = new Set(exerciseEntries.map((e) => e.id));

  // Vérifier les références croisées

  // Phrases -> vocab et grammaire
  for (const sentence of sentenceEntries) {
    if (sentence.associatedVocab) {
      for (const vocabId of sentence.associatedVocab) {
        if (!vocabIds.has(vocabId)) {
          errors.push(`La phrase "${sentence.id}" référence un vocabulaire inexistant : "${vocabId}"`);
        }
      }
    }
    if (sentence.associatedGrammar) {
      for (const grammarId of sentence.associatedGrammar) {
        if (!grammarIds.has(grammarId)) {
          errors.push(`La phrase "${sentence.id}" référence une grammaire inexistante : "${grammarId}"`);
        }
      }
    }
  }

  // Kanji -> vocab
  for (const kanji of kanjiEntries) {
    if (kanji.associatedVocab) {
      for (const vocabId of kanji.associatedVocab) {
        if (!vocabIds.has(vocabId)) {
          errors.push(`Le kanji "${kanji.id}" référence un vocabulaire inexistant : "${vocabId}"`);
        }
      }
    }
  }

  // Grammaire -> prerequisites
  for (const grammar of grammarEntries) {
    if (grammar.prerequisites) {
      for (const prereqId of grammar.prerequisites) {
        if (!grammarIds.has(prereqId)) {
          errors.push(`La grammaire "${grammar.id}" a un prérequis inexistant : "${prereqId}"`);
        }
      }
    }
  }

  // Leçons -> concepts, exercices, prerequisites
  for (const lesson of lessonEntries) {
    for (const conceptId of lesson.conceptsIntroduced) {
      if (
        !vocabIds.has(conceptId) &&
        !kanaIds.has(conceptId) &&
        !kanjiIds.has(conceptId) &&
        !grammarIds.has(conceptId)
      ) {
        errors.push(`La leçon "${lesson.id}" introduit un concept inexistant : "${conceptId}"`);
      }
    }
    if (lesson.prerequisites) {
      for (const prereqId of lesson.prerequisites) {
        if (!lessonIds.has(prereqId)) {
          errors.push(`La leçon "${lesson.id}" a un prérequis inexistant : "${prereqId}"`);
        }
      }
    }
    if (lesson.associatedExercises) {
      for (const exerciseId of lesson.associatedExercises) {
        if (!exerciseIds.has(exerciseId)) {
          errors.push(`La leçon "${lesson.id}" référence un exercice inexistant : "${exerciseId}"`);
        }
      }
    }
  }

  // Exercices -> données pédagogiques
  for (const exercise of exerciseEntries) {
    if (!exerciseIds.has(exercise.id)) {
      // Déjà détecté par isValidId
      continue;
    }
  }

  return createResult(errors);
}
