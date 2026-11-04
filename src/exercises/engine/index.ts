// Moteur d'exercices - Lot 4
// Gère la validation des réponses, le score, les tentatives et les événements

import { Exercise, ExerciseState, ExerciseResult, ExerciseConfig, ExpectedAnswer } from '../../exercises/types';

/**
 * Configuration par défaut d'un exercice
 */
const DEFAULT_CONFIG: ExerciseConfig = {
  maxAttempts: 3,
  passingScore: 0.7,
  showExplanationAfterEachAttempt: true,
  showScoreAfterAnswer: true,
};

/**
 * Normalise une chaîne pour la comparaison
 * Supprime les espaces superflus, normalise les caractères japonais
 */
function normalizeText(text: string): string {
  return text
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

/**
 * Compare deux chaînes selon le mode spécifié
 */
function compareAnswers(
  expected: string | string[],
  provided: string | string[],
  comparison: ExpectedAnswer['comparison']
): boolean {
  // Si les deux sont des tableaux, comparer élément par élément
  if (Array.isArray(expected) && Array.isArray(provided)) {
    if (expected.length !== provided.length) {
      return false;
    }
    if (comparison === 'exact') {
      return expected.every((e, i) => e === provided[i]);
    }
    const normExpected = expected.map(normalizeText);
    const normProvided = provided.map(normalizeText);
    if (comparison === 'case-insensitive') {
      return normExpected.every((e, i) => e.toLowerCase() === normProvided[i].toLowerCase());
    }
    return normExpected.every((e, i) => e === normProvided[i]);
  }

  // Si les deux sont des strings
  if (typeof expected === 'string' && typeof provided === 'string') {
    const normExpected = normalizeText(expected);
    const normProvided = normalizeText(provided);

    switch (comparison) {
      case 'exact':
        return expected === provided;
      case 'case-insensitive':
        return normExpected === normProvided;
      case 'whitespace-insensitive':
        return normExpected === normProvided;
      case 'fuzzy':
        // Correspondance approximative : vérifie si la réponse fournie
        // contient la réponse attendue ou vice-versa
        return (
          normProvided.includes(normExpected) ||
          normExpected.includes(normProvided)
        );
      default:
        return false;
    }
  }

  // Si un est un tableau et l'autre un string
  if (Array.isArray(expected) && typeof provided === 'string') {
    return expected.some(e => compareAnswers(e, provided, comparison));
  }
  if (typeof expected === 'string' && Array.isArray(provided)) {
    return provided.some(p => compareAnswers(expected, p, comparison));
  }

  return false;
}

/**
 * Crée un état d'exercice initial
 */
export function createExerciseState(
  exercise: Exercise,
  config: Partial<ExerciseConfig> = {}
): ExerciseState {
  const effectiveConfig = { ...DEFAULT_CONFIG, ...config };
  return {
    exerciseId: exercise.id,
    type: exercise.type,
    status: 'pending',
    attempts: 0,
    maxAttempts: effectiveConfig.maxAttempts,
    currentAnswer: undefined,
    lastSubmittedAnswer: undefined,
    isAnswered: false,
    timeSpentMs: 0,
    startedAt: Date.now(),
  };
}

/**
 * Enregistre une tentative et évalue la réponse
 * Retourne le résultat de l'exercice
 */
export function evaluateAnswer(
  state: ExerciseState,
  exercise: Exercise,
  userAnswer: string | string[],
  config: Partial<ExerciseConfig> = {}
): ExerciseResult {
  const effectiveConfig = { ...DEFAULT_CONFIG, ...config };
  const newAttempts = state.attempts + 1;
  const timeSpentMs = Date.now() - state.startedAt;

  // Trouver la réponse attendue correspondante
  let matchedAnswer: ExpectedAnswer | null = null;
  for (const expected of exercise.expectedAnswers) {
    if (compareAnswers(expected.value, userAnswer, expected.comparison)) {
      matchedAnswer = expected;
      break;
    }
  }

  const isCorrect = matchedAnswer !== null && matchedAnswer.score >= effectiveConfig.passingScore;
  const score = matchedAnswer ? matchedAnswer.score : 0;

  // Mettre à jour l'état
  const updatedState: ExerciseState = {
    ...state,
    attempts: newAttempts,
    currentAnswer: userAnswer,
    lastSubmittedAnswer: userAnswer,
    isAnswered: true,
    isCorrect,
    score,
    timeSpentMs,
  };

  // Déterminer le statut final
  let finalStatus: ExerciseState['status'] = state.status;
  if (isCorrect) {
    finalStatus = 'completed';
  } else if (newAttempts >= effectiveConfig.maxAttempts) {
    finalStatus = 'abandoned';
  }

  updatedState.status = finalStatus;

  return {
    exerciseId: exercise.id,
    userAnswer,
    isCorrect,
    score,
    attempts: newAttempts,
    timeSpentMs,
    timestamp: Date.now(),
    explanation: exercise.explanation,
    customFeedback: matchedAnswer?.customFeedback,
  };
}

/**
 * Marque un exercice comme abandonné
 */
export function abandonExercise(state: ExerciseState): ExerciseState {
  return {
    ...state,
    status: 'abandoned',
    isAnswered: true,
    score: 0,
  };
}

/**
 * Vérifie si un exercice est terminé (réussi ou abandonné)
 */
export function isExerciseFinished(state: ExerciseState): boolean {
  return state.status === 'completed' || state.status === 'abandoned';
}

/**
 * Vérifie si un exercice est réussi
 */
export function isExerciseSuccessful(state: ExerciseState): boolean {
  return state.status === 'completed';
}

/**
 * Génère les événements pédagogiques liés à un exercice
 */
export function generateExerciseEvents(
  previousState: ExerciseState,
  newState: ExerciseState,
  result?: ExerciseResult
): Array<{ type: string; timestamp: number; data: Record<string, unknown> }> {
  const events: Array<{ type: string; timestamp: number; data: Record<string, unknown> }> = [];

  // Si le statut a changé de pending à in-progress
  if (previousState.status === 'pending' && newState.status === 'in-progress') {
    events.push({
      type: 'exercise-started',
      timestamp: Date.now(),
      data: { exerciseId: newState.exerciseId, type: newState.type },
    });
  }

  // Si une tentative a été faite
  if (newState.attempts > previousState.attempts && result) {
    events.push({
      type: 'exercise-attempted',
      timestamp: Date.now(),
      data: {
        exerciseId: newState.exerciseId,
        attemptNumber: newState.attempts,
        isCorrect: result.isCorrect,
        score: result.score,
      },
    });
  }

  // Si l'exercice est maintenant terminé (réussi)
  if (newState.status === 'completed' && previousState.status !== 'completed') {
    events.push({
      type: 'exercise-correct',
      timestamp: Date.now(),
      data: {
        exerciseId: newState.exerciseId,
        attempts: newState.attempts,
        score: newState.score ?? 0,
      },
    });
  }

  // Si l'exercice est abandonné
  if (newState.status === 'abandoned' && previousState.status !== 'abandoned') {
    events.push({
      type: 'exercise-abandoned',
      timestamp: Date.now(),
      data: {
        exerciseId: newState.exerciseId,
        attempts: newState.attempts,
      },
    });
  }

  return events;
}
