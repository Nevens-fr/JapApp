/**
 * Hook React pour la persistance locale
 * Lot 6 : Stockage local et fonctionnement hors ligne
 *
 * Ce hook gère le chargement, la sauvegarde et la synchronisation
 * automatique de la progression entre le moteur pédagogique et IndexedDB
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import type { UserProgression } from '../../core/learning/progression';
import type { MasteryLevel } from '../../core/learning/types';
import {
  loadProgression,
  saveProgression,
  loadStatistics,
  saveStatistics,
  loadPreferences,
  savePreferences,
  enqueueSyncOperation,
  getPendingOperations,
  markSynced,
  hasProgression,
} from './repository';
import type { StoredStatistics, StoredPreferences } from './database';
import { createInitialProgression } from '../../core/learning/progression';

// ============================================================
// Configuration
// ============================================================

/**
 * Délai en ms entre deux sauvegardes automatiques
 */
const AUTO_SAVE_DELAY_MS = 2000;

// ============================================================
// Hook principal : usePersistence
// ============================================================

/**
 * Hook de persistance pour la progression de l'utilisateur
 *
 * Ce hook :
 * 1. Charge la progression locale au démarrage
 * 2. Sauvegarde automatiquement la progression quand elle change
 * 3. Expose les fonctions de persistance pour les composants
 *
 * @param progression - La progression à persister (issue du moteur pédagogique)
 * @returns Un objet contenant l'état de persistance et les actions
 */
export function usePersistence(progression: UserProgression) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasData, setHasData] = useState(false);
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ============================================================
  // Chargement initial
  // ============================================================

  useEffect(() => {
    let cancelled = false;

    const init = async () => {
      try {
        setIsLoading(true);
        const exists = await hasProgression();
        if (!cancelled) {
          setHasData(exists);
          setIsLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err : new Error(String(err)));
          setIsLoading(false);
        }
      }
    };

    init();

    return () => {
      cancelled = true;
    };
  }, []);

  // ============================================================
  // Sauvegarde automatique
  // ============================================================

  const scheduleSave = useCallback(() => {
    // Annuler le délai précédent
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    // Programmer une nouvelle sauvegarde
    saveTimeoutRef.current = setTimeout(async () => {
      try {
        await saveProgression(progression);
        setLastSavedAt(new Date());
        setError(null);

        // Enregistrer une opération de sync (préparation pour Lot 13)
        await enqueueSyncOperation(
          'mastery',
          'progression',
          { type: 'progression_update', timestamp: new Date().toISOString() },
          'update'
        );
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
      }
    }, AUTO_SAVE_DELAY_MS);
  }, [progression]);

  // Sauvegarder quand la progression change
  useEffect(() => {
    scheduleSave();
  }, [scheduleSave]);

  // Nettoyer le timeout quand le composant est démonté
  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, []);

  // ============================================================
  // Actions publiques
  // ============================================================

  /**
   * Sauvegarde manuelle immédiate de la progression
   */
  const saveNow = useCallback(async () => {
    try {
      await saveProgression(progression);
      setLastSavedAt(new Date());
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    }
  }, [progression]);

  /**
   * Charge la progression depuis le stockage local
   */
  const loadNow = useCallback(async (): Promise<UserProgression | null> => {
    try {
      return await loadProgression();
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
      return null;
    }
  }, []);

  /**
   * Réinitialise la progression
   */
  const resetNow = useCallback(async () => {
    try {
      await saveProgression(createInitialProgression());
      setHasData(false);
      setLastSavedAt(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    }
  }, []);

  return {
    isLoading,
    hasData,
    lastSavedAt,
    error,
    saveNow,
    loadNow,
    resetNow,
  };
}

// ============================================================
// Hook pour les statistiques
// ============================================================

/**
 * Hook pour gérer les statistiques locales
 */
export function useStatistics() {
  const [statistics, setStatistics] = useState<StoredStatistics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const stats = await loadStatistics();
        if (!cancelled) {
          setStatistics(stats);
          setIsLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err : new Error(String(err)));
          setIsLoading(false);
        }
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  const recordExercise = useCallback(async (correct: boolean, xpGained: number) => {
    try {
      const currentStats = statistics || {
        totalLessonsCompleted: 0,
        totalExercisesCompleted: 0,
        totalCorrectAnswers: 0,
        totalIncorrectAnswers: 0,
        xpTotal: 0,
        currentStreak: 0,
        lastActiveDate: null,
        sessionsThisWeek: 0,
      };
      await saveStatistics({
        ...currentStats,
        totalExercisesCompleted: currentStats.totalExercisesCompleted + 1,
        totalCorrectAnswers: correct ? currentStats.totalCorrectAnswers + 1 : currentStats.totalCorrectAnswers,
        totalIncorrectAnswers: !correct ? currentStats.totalIncorrectAnswers + 1 : currentStats.totalIncorrectAnswers,
        xpTotal: currentStats.xpTotal + xpGained,
        lastActiveDate: new Date().toISOString(),
      });
      // Recharger les statistiques
      const updated = await loadStatistics();
      setStatistics(updated);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    }
  }, [statistics]);

  const incrementLessons = useCallback(async () => {
    try {
      const currentStats = statistics || {
        totalLessonsCompleted: 0,
        totalExercisesCompleted: 0,
        totalCorrectAnswers: 0,
        totalIncorrectAnswers: 0,
        xpTotal: 0,
        currentStreak: 0,
        lastActiveDate: null,
        sessionsThisWeek: 0,
      };
      await saveStatistics({
        ...currentStats,
        totalLessonsCompleted: currentStats.totalLessonsCompleted + 1,
        lastActiveDate: new Date().toISOString(),
      });
      const updated = await loadStatistics();
      setStatistics(updated);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    }
  }, [statistics]);

  return {
    statistics,
    isLoading,
    error,
    recordExercise,
    incrementLessons,
  };
}

// ============================================================
// Hook pour les préférences
// ============================================================

/**
 * Hook pour gérer les préférences utilisateur
 */
export function usePreferences() {
  const [preferences, setPreferences] = useState<StoredPreferences | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const prefs = await loadPreferences();
        if (!cancelled) {
          setPreferences(prefs);
          setIsLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err : new Error(String(err)));
          setIsLoading(false);
        }
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  const update = useCallback(async <K extends keyof StoredPreferences>(
    key: K,
    value: StoredPreferences[K]
  ) => {
    try {
      await savePreferences({
        ...preferences!,
        [key]: value,
      });
      const updated = await loadPreferences();
      setPreferences(updated);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    }
  }, [preferences]);

  return {
    preferences,
    isLoading,
    error,
    update,
  };
}

// ============================================================
// Hook pour les opérations de synchronisation
// ============================================================

/**
 * Hook pour gérer la file d'attente de synchronisation
 */
export function useSyncQueue() {
  const [pendingCount, setPendingCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const refreshCount = useCallback(async () => {
    try {
      const count = await getPendingOperations();
      setPendingCount(count.length);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        await refreshCount();
        if (!cancelled) {
          setIsLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err : new Error(String(err)));
          setIsLoading(false);
        }
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, [refreshCount]);

  return {
    pendingCount,
    isLoading,
    error,
    refreshCount,
  };
}
