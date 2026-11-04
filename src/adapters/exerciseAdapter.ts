// Adaptateur entre le système d'exercices (Lot 4) et le moteur pédagogique (Lot 3)

// Adaptateur entre le système d'exercices (Lot 4) et le moteur pédagogique (Lot 3)
import type { EngineExercise } from "../core/learning/engine";
import type { Exercise, ExerciseResult } from "../exercises/types";

/**
 * Convertit un exercice du Lot 4 (Exercise) en format du Lot 3 (EngineExercise)
 * Nécessaire car les deux lots utilisent des interfaces différentes pour les exercices.
 */
export function toEngineExercise(exercise: Exercise): EngineExercise {
  return {
    id: exercise.id,
    type: exercise.type,
    difficulty: exercise.difficulty,
    data: exercise.data,
    pedagogicalObjective: exercise.objective,
    expectedAnswer: exercise.expectedAnswers[0], // Prend la première réponse attendue
    explanation: exercise.explanation,
    associatedConcepts: exercise.conceptId ? [exercise.conceptId] : [],
  };
}

/**
 * Convertit un résultat du Lot 4 (ExerciseResult) en format du Lot 3 (ExerciseResult)
 * Nécessaire car les deux lots utilisent des interfaces différentes pour les résultats.
 */
export function toLearningEngineResult(result: ExerciseResult) {
  return {
    exerciseId: result.exerciseId,
    isCorrect: result.isCorrect,
    attempts: result.attempts,
    timeSpentMs: result.timeSpentMs,
    timestamp: new Date(result.timestamp), // Convertit le timestamp en Date
  };
}
