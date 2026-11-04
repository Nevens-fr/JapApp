// Mécanisme d'enchaînement des exercices - Lot 4
// Gère l'enchaînement séquentiel des exercices dans une session

import {
  Exercise,
  ExerciseState,
  ExerciseResult,
  ExerciseConfig,
  ExerciseEvent,
} from '../types';
import {
  createExerciseState,
  evaluateAnswer,
  abandonExercise,
  isExerciseFinished,
  generateExerciseEvents,
} from './index';

/**
 * État d'une session d'exercices
 */
export interface ExerciseSession {
  /** Liste des exercices de la session */
  exercises: Exercise[];
  
  /** Index de l'exercice actuel (0-based) */
  currentIndex: number;
  
  /** États de chaque exercice */
  exerciseStates: Record<string, ExerciseState>;
  
  /** Résultats de chaque exercice */
  results: Record<string, ExerciseResult>;
  
  /** Configuration globale de la session */
  config: ExerciseConfig;
  
  /** Événements générés pendant la session */
  events: ExerciseEvent[];
  
  /** Timestamp de début de session */
  startedAt: number;
  
  /** Statut de la session */
  status: 'pending' | 'in-progress' | 'completed' | 'abandoned';
}

/**
 * Crée une nouvelle session d'exercices
 */
export function createExerciseSession(
  exercises: Exercise[],
  config: Partial<ExerciseConfig> = {}
): ExerciseSession {
  const effectiveConfig = {
    maxAttempts: 3,
    passingScore: 0.7,
    showExplanationAfterEachAttempt: true,
    showScoreAfterAnswer: true,
    ...config,
  };

  const exerciseStates: Record<string, ExerciseState> = {};
  const results: Record<string, ExerciseResult> = {};

  for (const exercise of exercises) {
    exerciseStates[exercise.id] = createExerciseState(exercise, effectiveConfig);
  }

  return {
    exercises,
    currentIndex: 0,
    exerciseStates,
    results,
    config: effectiveConfig,
    events: [],
    startedAt: Date.now(),
    status: 'pending',
  };
}

/**
 * Récupère l'exercice actuel
 */
export function getCurrentExercise(session: ExerciseSession): Exercise | null {
  if (session.status !== 'in-progress' && session.status !== 'pending') {
    return null;
  }
  return session.exercises[session.currentIndex] || null;
}

/**
 * Récupère l'état de l'exercice actuel
 */
export function getCurrentExerciseState(session: ExerciseSession): ExerciseState | null {
  const current = getCurrentExercise(session);
  if (!current) return null;
  return session.exerciseStates[current.id] || null;
}

/**
 * Soumet une réponse pour l'exercice actuel
 */
export function submitAnswer(
  session: ExerciseSession,
  userAnswer: string | string[]
): { result: ExerciseResult; events: ExerciseEvent[] } {
  const current = getCurrentExercise(session);
  if (!current) {
    throw new Error('Aucun exercice en cours');
  }

  const previousState = session.exerciseStates[current.id];
  const result = evaluateAnswer(previousState, current, userAnswer, session.config);
  
  // Mettre à jour l'état de l'exercice
  const newState = {
    ...previousState,
    attempts: result.attempts,
    currentAnswer: result.userAnswer,
    lastSubmittedAnswer: result.userAnswer,
    isAnswered: true,
    isCorrect: result.isCorrect,
    score: result.score,
    timeSpentMs: result.timeSpentMs,
  };

  if (result.isCorrect) {
    newState.status = 'completed';
  } else if (result.attempts >= session.config.maxAttempts) {
    newState.status = 'abandoned';
  } else {
    newState.status = 'in-progress';
  }

  session.exerciseStates[current.id] = newState;
  session.results[current.id] = result;

  // Générer les événements
  const events = generateExerciseEvents(previousState, newState, result);
  session.events.push(...events);

  // Si l'exercice est terminé, passer au suivant
  if (isExerciseFinished(newState)) {
    advanceToNextExercise(session);
  }

  return { result, events };
}

/**
 * Passe à l'exercice suivant
 */
export function advanceToNextExercise(session: ExerciseSession): void {
  if (session.currentIndex < session.exercises.length - 1) {
    session.currentIndex++;
    session.status = 'in-progress';
  } else {
    session.status = 'completed';
  }
}

/**
 * Abandonne la session
 */
export function abandonSession(session: ExerciseSession): ExerciseSession {
  const current = getCurrentExercise(session);
  if (current) {
    const previousState = session.exerciseStates[current.id];
    const newState = abandonExercise(previousState);
    session.exerciseStates[current.id] = newState;
  }
  
  session.status = 'abandoned';
  session.events.push({
    type: 'exercise-abandoned',
    timestamp: Date.now(),
    data: {
      sessionId: session.startedAt,
      totalExercises: session.exercises.length,
      completedExercises: Object.values(session.results).filter(
        (r) => r.isCorrect
      ).length,
    },
  });

  return session;
}

/**
 * Vérifie si la session est terminée
 */
export function isSessionFinished(session: ExerciseSession): boolean {
  return session.status === 'completed' || session.status === 'abandoned';
}

/**
 * Calcule le score global de la session
 */
export function getSessionScore(session: ExerciseSession): number {
  const results = Object.values(session.results);
  if (results.length === 0) return 0;

  const totalScore = results.reduce((sum, r) => sum + r.score, 0);
  return totalScore / results.length;
}

/**
 * Calcule le pourcentage de réussite
 */
export function getSessionSuccessRate(session: ExerciseSession): number {
  const results = Object.values(session.results);
  if (results.length === 0) return 0;

  const correctCount = results.filter((r) => r.isCorrect).length;
  return correctCount / results.length;
}

/**
 * Récupère les statistiques de la session
 */
export function getSessionStats(session: ExerciseSession): {
  totalExercises: number;
  completedExercises: number;
  abandonedExercises: number;
  correctExercises: number;
  incorrectExercises: number;
  averageScore: number;
  totalTimeSpentMs: number;
} {
  const results = Object.values(session.results);
  const totalExercises = session.exercises.length;
  const completedExercises = results.filter((r) => r.isCorrect).length;
  const abandonedExercises = results.filter((r) => !r.isCorrect && r.attempts >= session.config.maxAttempts).length;
  const correctExercises = results.filter((r) => r.isCorrect).length;
  const incorrectExercises = results.filter((r) => !r.isCorrect).length;
  const averageScore = results.length > 0
    ? results.reduce((sum, r) => sum + r.score, 0) / results.length
    : 0;
  const totalTimeSpentMs = results.reduce((sum, r) => sum + r.timeSpentMs, 0);

  return {
    totalExercises,
    completedExercises,
    abandonedExercises,
    correctExercises,
    incorrectExercises,
    averageScore,
    totalTimeSpentMs,
  };
}

/**
 * Sérialise la session pour la persistance
 */
export function serializeSession(session: ExerciseSession): string {
  return JSON.stringify({
    exercises: session.exercises.map((e) => ({
      id: e.id,
      type: e.type,
      answerFormat: e.answerFormat,
      objective: e.objective,
      difficulty: e.difficulty,
      prompt: e.prompt,
      data: e.data,
      expectedAnswers: e.expectedAnswers,
      explanation: e.explanation,
      conceptId: e.conceptId,
      prerequisites: e.prerequisites,
    })),
    currentIndex: session.currentIndex,
    exerciseStates: session.exerciseStates,
    results: session.results,
    config: session.config,
    events: session.events,
    startedAt: session.startedAt,
    status: session.status,
  });
}

/**
 * Désérialise une session depuis une chaîne JSON
 */
export function deserializeSession(json: string): ExerciseSession {
  const data = JSON.parse(json);
  return {
    exercises: data.exercises.map((e: any) => e as Exercise),
    currentIndex: data.currentIndex,
    exerciseStates: data.exerciseStates,
    results: data.results,
    config: data.config,
    events: data.events,
    startedAt: data.startedAt,
    status: data.status,
  };
}
