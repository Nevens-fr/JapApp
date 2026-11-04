// Hook React central pour le moteur pédagogique
// Connecte le LearningEngine (Lot 3) aux données de démonstration et expose la progression

import { useState, useEffect, useCallback } from 'react';
import { LearningEngine, type EngineExercise } from '../core/learning/engine';
import type { Lesson, LessonProgress, ExerciseResult, Concept as EngineConcept } from '../core/learning/types';
import type { Concept } from '../core/learning/types';
import type { Exercise, ExerciseResult as ExerciseResultLot4 } from '../exercises/types';
import { SAMPLE_CONCEPTS, SAMPLE_EXERCISES, SAMPLE_LESSONS } from '../data/sampleData';
import { toEngineExercise, toLearningEngineResult } from '../adapters/exerciseAdapter';

export function useLearningEngine() {
  const [engine] = useState(() => new LearningEngine());
  const [concepts, setConcepts] = useState<Concept[]>([]);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [progress, setProgress] = useState<Record<string, LessonProgress>>({});
  const [currentLessonId, setCurrentLessonId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const engineExercises = SAMPLE_EXERCISES.map(toEngineExercise);

    engine.loadConcepts(
      SAMPLE_CONCEPTS.map((c) => ({
        id: c.id,
        type: c.type,
        order: c.difficulty,
        prerequisites: c.prerequisites,
      }))
    );
    engine.loadExercises(engineExercises);

    setConcepts(SAMPLE_CONCEPTS);
    setExercises(SAMPLE_EXERCISES);
    setLessons(SAMPLE_LESSONS);
    setLoading(false);
  }, [engine]);

  const getLesson = useCallback(
    (lessonId: string): Lesson | undefined => {
      return lessons.find((l) => l.id === lessonId);
    },
    [lessons]
  );

  const getLessonProgress = useCallback(
    (lessonId: string): LessonProgress | undefined => {
      const state = engine.getLessonState(lessonId);
      if (!state) return undefined;
      return {
        status: state.status,
        currentStep: 0,
        score: state.score,
      };
    },
    [engine]
  );

  const getAllLessons = useCallback((): Lesson[] => {
    return lessons;
  }, [lessons]);

  const startLesson = useCallback(
    (lessonId: string): Lesson | undefined => {
      const lesson = lessons.find((l) => l.id === lessonId);
      if (!lesson) return undefined;

      engine.startLesson(lessonId);
      setCurrentLessonId(lessonId);
      setProgress((prev) => ({
        ...prev,
        [lessonId]: { status: 'in_progress', currentStep: 0, score: null },
      }));
      return lesson;
    },
    [engine, lessons]
  );

  const recordExerciseResult = useCallback(
    (lessonId: string, result: ExerciseResultLot4): boolean => {
      const engineResult = toLearningEngineResult(result);
      const success = engine.recordExerciseResult(lessonId, engineResult);

      if (success) {
        const lessonProgress = getLessonProgress(lessonId);
        if (lessonProgress) {
          setProgress((prev) => ({
            ...prev,
            [lessonId]: lessonProgress,
          }));
        }
      }

      return !!success;
    },
    [engine, getLessonProgress]
  );

  const completeLesson = useCallback(
    (lessonId: string): boolean => {
      const success = engine.completeLesson(lessonId);
      if (success) {
        const lessonProgress = getLessonProgress(lessonId);
        setProgress((prev) => ({
          ...prev,
          [lessonId]: lessonProgress || {
            status: 'completed',
            currentStep: 0,
            score: 0,
          },
        }));
        setCurrentLessonId(null);
      }
      return !!success;
    },
    [engine, getLessonProgress]
  );

  const getNextLessons = useCallback((): Lesson[] => {
    return lessons.filter((l) => l.id !== currentLessonId);
  }, [lessons, currentLessonId]);

  const getReviewLessons = useCallback((): Lesson[] => {
    return [];
  }, []);

  const getTotalScore = useCallback((): number => {
    return engine.getGlobalProgression();
  }, [engine]);

  return {
    concepts,
    exercises,
    lessons,
    progress,
    currentLessonId,
    loading,
    getLesson,
    getLessonProgress,
    getAllLessons,
    startLesson,
    recordExerciseResult,
    completeLesson,
    getNextLessons,
    getReviewLessons,
    getTotalScore,
  };
}
