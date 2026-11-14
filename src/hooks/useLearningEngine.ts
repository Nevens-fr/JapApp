// Hook React central pour le moteur pédagogique
// Connecte le LearningEngine (Lot 3 + Lot 9 Gamification) aux données de démonstration

import { createContext, createElement, useContext, useState, useEffect, useCallback } from "react";
import type { ReactNode } from "react";
import { LearningEngine } from "../core/learning/engine";
import type { Lesson, LessonProgress } from "../core/learning/types";
import type { ExerciseResult as ExerciseResultTypes } from "../exercises/types";
import type { Concept } from "../core/learning/types";
import type { Exercise } from "../exercises/types";
import { SAMPLE_CONCEPTS, SAMPLE_EXERCISES, SAMPLE_LESSONS } from "../data/sampleData";
import { toEngineExercise, toLearningEngineResult } from "../adapters/exerciseAdapter";
import { usePersistence } from "../database/local/hooks";
import { createInitialProgression } from "../core/learning/progression";
import { loadProgression, saveProgression, forceReviewsDue, saveGamification } from "../database/local/repository";
import { isReviewOverdue } from "../core/learning/revision";
import type { MasteryLevel } from "../core/learning/types";
import type {
  GamificationState,
  DailyGoal,
  UserStatistics,
  DailyActivity,
  XPCalibration,
} from "../core/learning/scoring";

function useLearningEngineState() {
  const [engine] = useState(() => new LearningEngine());
  const [userProgression, setUserProgression] = useState(() => createInitialProgression());
  const [concepts, setConcepts] = useState<Concept[]>([]);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [progress, setProgress] = useState<Record<string, LessonProgress>>({});
  const [currentLessonId, setCurrentLessonId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Hook de persistance pour la progression du moteur
  usePersistence(userProgression, !loading);

  const [totalScore, setTotalScore] = useState(0);
  const [lastKnownLevel, setLastKnownLevel] = useState(0);
  const [showLevelUp, setShowLevelUp] = useState(false);

  // Détection du passage de niveau
  useEffect(() => {
    const currentLevel = engine.getLevel();
    if (lastKnownLevel > 0 && currentLevel > lastKnownLevel) {
      // Niveau augmenté !
      setShowLevelUp(true);
      setTimeout(() => setShowLevelUp(false), 3000); // Disparaît après 3s
    }
    setLastKnownLevel(currentLevel);
  }, [engine.getLevel(), lastKnownLevel, engine]);

  // Fonction pour rafraîchir la progression depuis la base de données
  const refreshProgression = useCallback(async () => {
    try {
      const savedProgression = await loadProgression();
      if (savedProgression) {
        // Restaurer la progression dans le moteur
        engine.restoreProgression(savedProgression);
        const snapshot = engine.getProgressionSnapshot();
        setUserProgression(snapshot);
        setTotalScore(calculateLessonProgress(snapshot.lessons));

        // Mettre à jour l'état local àprogress?
        const newProgress: Record<string, LessonProgress> = {};
        for (const [lessonId, lessonData] of Object.entries(snapshot.lessons)) {
          newProgress[lessonId] = {
            status: lessonData.completed ? "completed" : "in_progress",
            currentStep: 0,
            score: lessonData.score,
          };
        }
        setProgress(newProgress);

        // Réinitialiser currentLessonId si la leçon en cours est complétée
        if (currentLessonId) {
          const currentState = engine.getLessonState(currentLessonId);
          if (currentState?.status === "completed") {
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
      console.error("Erreur rafraîchissement progression:", err);
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
        await refreshProgression();
      } catch (err) {
        console.error("Erreur chargement progression:", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    setConcepts(SAMPLE_CONCEPTS);
    setExercises(SAMPLE_EXERCISES);
    setLessons(SAMPLE_LESSONS as Lesson[]);
    void initialize();

    return () => {
      cancelled = true;
    };
  }, [engine, refreshProgression]);

  const syncProgression = useCallback(async () => {
    try {
      const snapshot = engine.getProgressionSnapshot();
      setUserProgression(snapshot);
      await saveProgression(snapshot);
      // Sauvegarder aussi la gamification
      const gamificationState = engine.getGamificationState();
      await saveGamification(gamificationState);
      return snapshot;
    } catch (err) {
      console.error("Erreur syncProgression:", err);
      throw err;
    }
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
      if (currentState?.status === "completed") {
        return lesson;
      }

      engine.startLesson(lessonId);
      setCurrentLessonId(lessonId);
      setProgress((prev) => ({
        ...prev,
        [lessonId]: { status: "in_progress", currentStep: 0, score: null },
      }));
      return lesson;
    },
    [engine, lessons]
  );

  // ============================================================
  // Lot 9 : Enregistrement de résultat avec gamification
  // ============================================================
  const recordExerciseResult = useCallback(
    async (lessonId: string, result: ExerciseResultTypes): Promise<boolean> => {
      const engineResult = toLearningEngineResult(result);

      // Utiliser la méthode avec scoring (Lot 9)
      const scoringResult = engine.recordExerciseResultWithScoring(lessonId, engineResult);

      if (scoringResult.exerciseResult) {
        const lessonProgress = getLessonProgress(lessonId);
        if (lessonProgress) {
          setProgress((prev) => ({
            ...prev,
            [lessonId]: lessonProgress,
          }));
        }

        try {
          await syncProgression();
        } catch (err) {
          console.error("Erreur sauvegarde résultat:", err);
        }
      }

      return !!scoringResult.exerciseResult;
    },
    [engine, getLessonProgress, syncProgression]
  );

  // ============================================================
  // Lot 9 : Complétion de leçon avec gamification
  // ============================================================
  const completeLesson = useCallback(
    async (lessonId: string): Promise<boolean> => {
      const success = engine.completeLessonWithScoring(lessonId);

      if (success) {
        const lessonProgress = getLessonProgress(lessonId);
        setProgress((prev) => ({
          ...prev,
          [lessonId]: lessonProgress || {
            status: "completed",
            currentStep: 0,
            score: 0,
          },
        }));
        setCurrentLessonId(null);

        try {
          const snapshot = await syncProgression();
          setTotalScore(calculateLessonProgress(snapshot.lessons));
        } catch (err) {
          console.error("Erreur sauvegarde completeLesson:", err);
        }
      }

      return !!success;
    },
    [engine, getLessonProgress, syncProgression]
  );

  const getNextLessons = useCallback((): Lesson[] => {
    return lessons.filter((l) => {
      if (l.id === currentLessonId) return false;
      if (engine.getLessonState(l.id)?.status === "completed") return false;
      return true;
    });
  }, [engine, lessons, currentLessonId]);

  const getReviewLessons = useCallback((): Lesson[] => {
    const conceptsToReview = engine.getConceptsToReview();

    if (conceptsToReview.length === 0) {
      return [];
    }

    return lessons.filter((lesson) => {
      return conceptsToReview.includes(lesson.conceptId);
    });
  }, [engine, lessons]);

  const getReviewInfo = useCallback((): Array<{
    conceptId: string;
    mastery: MasteryLevel;
    isOverdue: boolean;
    priority: number;
  }> => {
    const reviewConcepts = engine.getConceptsToReview();

    const results: Array<{ conceptId: string; mastery: MasteryLevel; isOverdue: boolean; priority: number }> = [];

    for (const conceptId of reviewConcepts) {
      const mastery = engine.getMastery(conceptId);
      if (mastery) {
        const overdue = isReviewOverdue(mastery);
        results.push({
          conceptId,
          mastery,
          isOverdue: overdue,
          priority: overdue ? 100 : 0,
        });
      }
    }

    results.sort((a, b) => b.priority - a.priority);
    return results;
  }, [engine]);

  const getTotalScore = useCallback((): number => {
    return totalScore;
  }, [totalScore]);

  // Wrapper pour forceReviewsDue
  const handleForceReviewsDue = useCallback(async () => {
    await forceReviewsDue();
    await refreshProgression();
  }, [refreshProgression]);

  // ============================================================
  // Lot 9 : Accesseurs gamification
  // ============================================================
  const getGamificationState = useCallback((): GamificationState => {
    return engine.getGamificationState();
  }, [engine]);

  const getXP = useCallback((): number => {
    return engine.getXP();
  }, [engine]);

  const getLevel = useCallback((): number => {
    return engine.getLevel();
  }, [engine]);

  const getStreak = useCallback((): number => {
    return engine.getStreak();
  }, [engine]);

  const getDailyGoal = useCallback((): DailyGoal => {
    return engine.getDailyGoal();
  }, [engine]);

  const getStatistics = useCallback((): UserStatistics => {
    return engine.getStatistics();
  }, [engine]);

  const getProgressionToNextLevel = useCallback((): number => {
    return engine.getProgressionToNextLevel();
  }, [engine]);

  const getActivityHistory = useCallback((): DailyActivity[] => {
    return engine.getActivityHistory();
  }, [engine]);

  const getXPCalibration = useCallback((): XPCalibration => {
    return engine.getXPCalibration();
  }, [engine]);

  const setXPCalibration = useCallback((partial: Partial<XPCalibration>): void => {
    engine.setXPCalibration(partial);
  }, [engine]);

  const getLevelUpState = useCallback((): { show: boolean; level: number } => {
    return { show: showLevelUp, level: engine.getLevel() };
  }, [showLevelUp, engine]);

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
    getReviewInfo,
    getTotalScore,
    refreshProgression,
    forceReviewsDue: handleForceReviewsDue,
    getUpcomingReviews: (daysAhead?: number) => engine.getUpcomingReviews(daysAhead),

    // Lot 9 : Gamification
    getGamificationState,
    getXP,
    getLevel,
    getStreak,
    getLevelUpState,
    getDailyGoal,
    getStatistics,
    getProgressionToNextLevel,
    getActivityHistory,
    getXPCalibration,
    setXPCalibration,
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
    throw new Error("useLearningEngine doit être utilisé dans un LearningEngineProvider");
  }
  return context;
}