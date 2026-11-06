/**
 * Repository local pour IndexedDB
 * Lot 6 : Stockage local et fonctionnement hors ligne
 *
 * Fournit les opérations CRUD pour toutes les données locales
 * via Dexie.js
 */

import { db, type StoredProgression, type StoredStatistics, type StoredPreferences, type StoredSyncOperation, PROGRESSION_ID, STATISTICS_ID, PREFERENCES_ID, generateSyncOperationId } from './database';
import type { UserProgression } from '../../core/learning/progression';
import type { MasteryLevel } from '../../core/learning/types';

// ============================================================
// Conversion entre types moteur et types stockés
// ============================================================

/**
 * Convertit une UserProgression (moteur) en StoredProgression (stockage)
 * Les Date sont convertis en strings ISO
 */
export function serializeProgression(progression: UserProgression): StoredProgression {
  return {
    mastery: Object.fromEntries(
      Object.entries(progression.mastery).map(([key, value]) => [
        key, {
          value: value.value,
          state: value.state,
          lastReviewedAt: value.lastReviewedAt?.toISOString() ?? null,
          nextReviewAt: value.nextReviewAt?.toISOString() ?? null,
          correctCount: value.correctCount,
          incorrectCount: value.incorrectCount,
          totalAttempts: value.totalAttempts,
        }
      ])
    ),
    lessons: { ...progression.lessons },
    unlockedConcepts: [...progression.unlockedConcepts],
  };
}

/**
 * Convertit une StoredProgression (stockage) en UserProgression (moteur)
 * Les strings ISO sont reconvertis en Date
 */
export function deserializeProgression(stored: StoredProgression): UserProgression {
  return {
    mastery: Object.fromEntries(
      Object.entries(stored.mastery).map(([key, value]) => [
        key, {
          value: value.value,
          state: value.state as MasteryLevel['state'],
          lastReviewedAt: value.lastReviewedAt ? new Date(value.lastReviewedAt) : null,
          nextReviewAt: value.nextReviewAt ? new Date(value.nextReviewAt) : null,
          correctCount: value.correctCount,
          incorrectCount: value.incorrectCount,
          totalAttempts: value.totalAttempts,
        }
      ])
    ),
    lessons: { ...stored.lessons },
    unlockedConcepts: [...stored.unlockedConcepts],
  };
}

// ============================================================
// Repository de progression
// ============================================================

/**
 * Sauvegarde la progression de l'utilisateur dans IndexedDB
 */
export async function saveProgression(progression: UserProgression): Promise<void> {
  const stored = serializeProgression(progression);
  await db.progression.put({ ...stored, id: PROGRESSION_ID });
}

/**
 * Charge la progression de l'utilisateur depuis IndexedDB
 * Retourne null si aucune progression n'existe
 */
export async function loadProgression(): Promise<UserProgression | null> {
  const stored = await db.progression.get(PROGRESSION_ID);
  if (!stored) return null;
  return deserializeProgression(stored);
}

/**
 * Réinitialise la progression (supprime les données) et recrée un profil initial
 */
export async function resetProgression(): Promise<void> {
  await db.progression.delete(PROGRESSION_ID);
}

/**
 * Vérifie si une progression existe dans le stockage local
 */
export async function hasProgression(): Promise<boolean> {
  const stored = await db.progression.get(PROGRESSION_ID);
  return stored != null;
}

// ============================================================
// Repository de statistiques
// ============================================================

/**
 * Sauvegarde les statistiques de l'utilisateur dans IndexedDB
 */
export async function saveStatistics(stats: StoredStatistics): Promise<void> {
  await db.statistics.put({ ...stats, id: STATISTICS_ID });
}

/**
 * Charge les statistiques de l'utilisateur depuis IndexedDB
 * Retourne null si aucune statistique n'existe
 */
export async function loadStatistics(): Promise<StoredStatistics | null> {
  const result = await db.statistics.get(STATISTICS_ID);
  return result ?? null;
}

/**
 * Incrémente le nombre de leçons complétées
 */
export async function incrementLessonsCompleted(): Promise<void> {
  const stats = await loadStatistics();
  if (!stats) {
    await saveStatistics({
      totalLessonsCompleted: 1,
      totalExercisesCompleted: 0,
      totalCorrectAnswers: 0,
      totalIncorrectAnswers: 0,
      xpTotal: 0,
      currentStreak: 0,
      lastActiveDate: new Date().toISOString(),
      sessionsThisWeek: 1,
    });
  } else {
    stats.totalLessonsCompleted++;
    await saveStatistics(stats);
  }
}

/**
 * Incrémente le nombre d'exercices complétés et met à jour les scores
 */
export async function recordExerciseCompletion(correct: boolean, xpGained: number): Promise<void> {
  const stats = await loadStatistics();
  if (!stats) {
    await saveStatistics({
      totalLessonsCompleted: 0,
      totalExercisesCompleted: 1,
      totalCorrectAnswers: correct ? 1 : 0,
      totalIncorrectAnswers: correct ? 0 : 1,
      xpTotal: xpGained,
      currentStreak: 0,
      lastActiveDate: new Date().toISOString(),
      sessionsThisWeek: 1,
    });
  } else {
    stats.totalExercisesCompleted++;
    if (correct) {
      stats.totalCorrectAnswers++;
    } else {
      stats.totalIncorrectAnswers++;
    }
    stats.xpTotal += xpGained;
    stats.lastActiveDate = new Date().toISOString();
    await saveStatistics(stats);
  }
}

// ============================================================
// Repository de préférences
// ============================================================

/**
 * Sauvegarde les préférences de l'utilisateur dans IndexedDB
 */
export async function savePreferences(prefs: StoredPreferences): Promise<void> {
  await db.preferences.put({ ...prefs, id: PREFERENCES_ID });
}

/**
 * Charge les préférences de l'utilisateur depuis IndexedDB
 * Retourne les préférences par défaut si aucune n'existe
 */
export async function loadPreferences(): Promise<StoredPreferences> {
  const stored = await db.preferences.get(PREFERENCES_ID);
  if (!stored) {
    const defaults: StoredPreferences = {
      language: 'ja',
      dailyGoal: 5,
      notificationsEnabled: false,
      showRomaji: false,
    };
    await savePreferences(defaults);
    return defaults;
  }
  return stored;
}

/**
 * Met à jour une seule préférence
 */
export async function updatePreference<K extends keyof StoredPreferences>(
  key: K,
  value: StoredPreferences[K]
): Promise<void> {
  const prefs = await loadPreferences();
  (prefs as any)[key] = value;
  await savePreferences(prefs);
}

// ============================================================
// Repository de synchronisation (file d'attente)
// ============================================================

/**
 * Ajoute une opération à la file d'attente de synchronisation
 */
export async function enqueueSyncOperation(
  entityType: StoredSyncOperation['entityType'],
  entityId: string,
  data: unknown,
  type: StoredSyncOperation['type'] = 'update'
): Promise<string> {
  const operation: StoredSyncOperation = {
    id: generateSyncOperationId(),
    type,
    entityType,
    entityId,
    data,
    createdAt: new Date().toISOString(),
    syncedAt: null,
    status: 'pending',
  };
  await db.syncOperations.add(operation);
  return operation.id;
}

/**
 * Marque une opération comme synchronisée
 */
export async function markSynced(operationId: string): Promise<void> {
  const operation = await db.syncOperations.get(operationId);
  if (operation) {
    operation.status = 'synced';
    operation.syncedAt = new Date().toISOString();
    await db.syncOperations.update(operationId, operation);
  }
}

/**
 * Marque une opération comme ayant échoué
 */
export async function markFailed(operationId: string): Promise<void> {
  const operation = await db.syncOperations.get(operationId);
  if (operation) {
    operation.status = 'failed';
    await db.syncOperations.update(operationId, operation);
  }
}

/**
 * Retourne les opérations en attente de synchronisation
 * Triées par date de création (les plus anciennes en premier)
 */
export async function getPendingOperations(): Promise<StoredSyncOperation[]> {
  return db.syncOperations
    .where('status')
    .equals('pending')
    .sortBy('createdAt');
}

/**
 * Supprime les opérations synchronisées (nettoyage)
 */
export async function cleanSyncedOperations(): Promise<void> {
  await db.syncOperations.where('status').equals('synced').delete();
}

/**
 * Retourne le nombre d'opérations en attente
 */
export async function getPendingOperationsCount(): Promise<number> {
  return db.syncOperations.where('status').equals('pending').count();
}

export default {
  progression: {
    save: saveProgression,
    load: loadProgression,
    reset: resetProgression,
    has: hasProgression,
  },
  statistics: {
    save: saveStatistics,
    load: loadStatistics,
    incrementLessonsCompleted,
    recordExerciseCompletion,
  },
  preferences: {
    save: savePreferences,
    load: loadPreferences,
    update: updatePreference,
  },
  sync: {
    enqueue: enqueueSyncOperation,
    markSynced,
    markFailed,
    getPending: getPendingOperations,
    clean: cleanSyncedOperations,
    getPendingCount: getPendingOperationsCount,
  },
};
