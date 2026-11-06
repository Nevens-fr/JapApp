// Hook React central pour le moteur pédagogique
// Connecte le LearningEngine (Lot 3) aux données de démonstration et expose la progression

import { createContext, createElement, useContext, useState, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';
import { LearningEngine } from '../core/learning/engine';
import type { Lesson, LessonProgress } from '../core/learning/types';
import type { Concept } from '../core/learning/types';
import type { Exercise, ExerciseResult as ExerciseResultLot4 } from '../exercises/types';
import { SAMPLE_CONCEPTS, SAMPLE_EXERCISES, SAMPLE_LESSONS } from '../data/sampleData';
import { toEngineExercise, toLearningEngineResult } from '../adapters/exerciseAdapter';
import { useStatistics, usePersistence } from '../database/local/hooks';
import { createInitialProgression } from '../core/learning/progression';
import { loadProgression, saveProgression } from '../database/local/repository';

function useLearningEngineState() {
  const [engine] = useState(() => new LearningEngine());
  const [userProgression, setUserProgression] = useState(() => createInitialProgression());
  const [concepts, setConcepts] = useState<Concept[]>([]);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [progress, setProgress] = useState<Record<string, LessonProgress>>({});
  const [currentLessonId, setCurrentLessonId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Hook de persistance pour les statistiques locales
  const { recordExercise, incrementLessons } = useStatistics();

  // Hook de persistance pour la progression du moteur
  usePersistence(userProgression, !loading);

  const [totalScore, setTotalScore] = useState(0);

  // Fonction pour rafraîchir la progression depuis la base de données
  // Utilisé après un import de données pour synchroniser l'UI avec la DB
  const refreshProgression = useCallback(async () => {
    try {
      const savedProgression = await loadProgression();
      if (savedProgression) {
        // Restaurer la progression dans le moteur
        engine.restoreProgression(savedProgression);
        const snapshot = engine.getProgressionSnapshot();
        setUserProgression(snapshot);
        setTotalScore(calculateLessonProgress(snapshot.lessons));

        // Mettre à jour l'état local 'progress' pour refléter les statuts de la DB
        // IMPORTANT: snapshot.lessons est de type Record<string, { completed: boolean, score: number }>
        // Il faut mapper 'completed' vers 'status' correctement
        const newProgress: Record<string, LessonProgress> = {};
        for (const [lessonId, lessonData] of Object.entries(snapshot.lessons)) {
          newProgress[lessonId] = {
            status: lessonData.completed ? 'completed' : 'in_progress',
            currentStep: 0,
            score: lessonData.score,
          };
        }
        setProgress(newProgress);

        // IMPORTANT: Réinitialiser currentLessonId si la leçon en cours est complétée
        // Cela permet de débloquer les leçons suivantes
        if (currentLessonId) {
          const currentState = engine.getLessonState(currentLessonId);
          if (currentState?.status === 'completed') {
            setCurrentLessonId(null);
          }
        }
      } else {
        // Si pas de progression, réinitialiser
        const initial = createInitialProgression();
        engine.restoreProgression(initial);
        setUserProgression(initial);
        setTotalScore(0);
        setProgress({});
        setCurrentLessonId(null);
      }
    } catch (err) {
      console.error('Erreur rafraîchissement progression:', err);
    }
  }, [engine, currentLessonId]);

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

    let cancelled = false;
    const initialize = async () => {
      try {
        // Charger la progression au démarrage
        await refreshProgression();
      } catch (err) {
        console.error('Erreur chargement progression:', err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    setConcepts(SAMPLE_CONCEPTS);
    setExercises(SAMPLE_EXERCISES);
    setLessons(SAMPLE_LESSONS);
    void initialize();

    return () => {
      cancelled = true;
    };
  }, [engine, refreshProgression]);

  const syncProgression = useCallback(async () => {
    const snapshot = engine.getProgressionSnapshot();
    setUserProgression(snapshot);
    await saveProgression(snapshot);
    return snapshot;
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

      const currentState = engine.getLessonState(lessonId);

      // Ne pas réinitialiser une leçon déjà complétée
      if (currentState?.status === 'completed') {
        console.log(`Leçon ${lessonId} déjà complétée.`);
        return lesson;
      }

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
    async (lessonId: string, result: ExerciseResultLot4): Promise<boolean> => {
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

        const isCorrect = result.isCorrect;
        const xpGained = Math.round(result.score * 50);
        await syncProgression();
        await recordExercise(isCorrect, xpGained);
      }

      return !!success;
    },
    [engine, getLessonProgress, recordExercise, syncProgression]
  );

  const completeLesson = useCallback(
    async (lessonId: string): Promise<boolean> => {
      const alreadyCompleted = engine.getLessonState(lessonId)?.status === 'completed';
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
        const snapshot = await syncProgression();
        setTotalScore(calculateLessonProgress(snapshot.lessons));

        if (!alreadyCompleted) {
          await incrementLessons();
        }
      }
      return !!success;
    },
    [engine, getLessonProgress, incrementLessons, syncProgression]
  );

  const getNextLessons = useCallback((): Lesson[] => {
    return lessons.filter((l) => {
      if (l.id === currentLessonId) return false;
      if (engine.getLessonState(l.id)?.status === 'completed') return false;
      return true;
    });
  }, [engine, lessons, currentLessonId]);

  const getReviewLessons = useCallback((): Lesson[] => {
    return [];
  }, []);

  const getTotalScore = useCallback((): number => {
    return totalScore;
  }, [totalScore]);

  return {
    concepts,
    exercises,
    lessons,
    progress,
    currentLessonId,
    loading,
    totalScore,
    getLesson,
    getLessonProgress,
    getAllLessons,
    startLesson,
    recordExerciseResult,
    completeLesson,
    getNextLessons,
    getReviewLessons,
    getTotalScore,
    refreshProgression, // Exposer la fonction de rafraîchissement
  };
}

function calculateLessonProgress(lessonProgression: Record<string, { completed: boolean }>): number {
  if (SAMPLE_LESSONS.length === 0) return 0;
  const completedLessons = SAMPLE_LESSONS.filter((lesson) => lessonProgression[lesson.id]?.completed).length;
  return Math.round((completedLessons / SAMPLE_LESSONS.length) * 100);
}

type LearningEngineState = ReturnType<typeof useLearningEngineState>;
const LearningEngineContext = createContext<LearningEngineState | null>(null);

export function LearningEngineProvider({ children }: { children: ReactNode }) {
  const state = useLearningEngineState();
  return createElement(LearningEngineContext.Provider, { value: state }, children);
}

export function useLearningEngine(): LearningEngineState {
  const context = useContext(LearningEngineContext);
  if (!context) {
    throw new Error('useLearningEngine doit être utilisé dans un LearningEngineProvider');
  }
  return context;
}
