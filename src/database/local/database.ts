/**
 * Schéma IndexedDB pour le stockage local
 * Lot 6 : Stockage local et fonctionnement hors ligne
 *
 * Utilise Dexie.js pour accéder à IndexedDB
 */

import Dexie, { type Table } from 'dexie';

// ============================================================
// Types pour IndexedDB
// ============================================================

/**
 * Progression utilisateur sérialisable pour le stockage
 */
export interface StoredProgression {
  id?: string;
  mastery: Record<string, {
    value: number;
    state: string;
    lastReviewedAt: string | null;
    nextReviewAt: string | null;
    easinessFactor: number;
    intervalDays: number;
    repetitionCount: number;
    correctCount: number;
    incorrectCount: number;
    totalAttempts: number;
  }>;
  lessons: Record<string, {
    completed: boolean;
    score: number;
  }>;
  unlockedConcepts: string[];
}

/**
 * Échéance de révision sérialisable
 */
export interface StoredReviewSchedule {
  conceptId: string;
  nextReviewAt: string | null;
  lastReviewAt: string | null;
  priority: number;
}

/**
 * Statistiques utilisateur
 */
export interface StoredStatistics {
  id?: string;
  totalLessonsCompleted: number;
  totalExercisesCompleted: number;
  totalCorrectAnswers: number;
  totalIncorrectAnswers: number;
  xpTotal: number;
  currentStreak: number;
  lastActiveDate: string | null;
  sessionsThisWeek: number;
}

/**
 * Préférences utilisateur
 */
export interface StoredPreferences {
  id?: string;
  language: 'ja';
  dailyGoal: number;
  notificationsEnabled: boolean;
  showRomaji: boolean;
  darkMode: boolean;
}

/**
 * Opération en attente de synchronisation
 * Lot 13 : Synchronisation
 */
export interface StoredSyncOperation {
  id: string;
  type: 'create' | 'update' | 'delete';
  entityType: 'lesson' | 'mastery' | 'statistics' | 'preferences';
  entityId: string;
  data: unknown;
  createdAt: string;
  syncedAt: string | null;
  status: 'pending' | 'synced' | 'failed';
}

/**
 * Schéma complet de la base de données locale
 */

/**
 * État de gamification sérialisable pour le stockage
 * Lot 9 : Gamification - Persistance de l'état XP, niveau, streak, etc.
 */
export interface StoredGamification {
  id?: string;
  xp: number;
  level: number;
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string | null;
  totalActiveDays: number;
  dailyGoalTargetXP: number;
  dailyGoalCurrentXP: number;
  dailyGoalTargetLessons: number;
  dailyGoalCurrentLessons: number;
  dailyGoalTargetReviews: number;
  dailyGoalCurrentReviews: number;
  dailyGoalIsCompleted: boolean;
  dailyGoalDate: string;
  statisticsTotalXP: number;
  statisticsTotalLessonsCompleted: number;
  statisticsTotalExercisesAnswered: number;
  statisticsTotalCorrectAnswers: number;
  statisticsTotalIncorrectAnswers: number;
  statisticsAccuracyRate: number;
  statisticsAverageLessonScore: number;
  statisticsConceptsMastered: number;
  statisticsConceptsInLearning: number;
  statisticsConceptsInReview: number;
  statisticsFirstActivityDate: string;
  statisticsLastActivityDate: string;
  history: Array<{
    date: string;
    xpEarned: number;
    lessonsCompleted: number;
    exercisesAnswered: number;
    correctAnswers: number;
    incorrectAnswers: number;
  }>;
}

export interface JapAppDatabase {
  progression: Table<StoredProgression, string>;
  reviewSchedules: Table<StoredReviewSchedule, string>;
  statistics: Table<StoredStatistics, string>;
  preferences: Table<StoredPreferences, string>;
  syncOperations: Table<StoredSyncOperation, string>;
  gamification: Table<StoredGamification, string>;
}

// ============================================================
// Version de la base de données
// ============================================================

/**
 * Version actuelle du schéma de données
 * À incrémenter à chaque modification du schéma
 */
export const DB_VERSION = 1;

/**
 * Nom de la base de données IndexedDB
 */
export const DB_NAME = 'JapAppDB';

// ============================================================
// Instance Dexie
// ============================================================

/**
 * Base de données IndexedDB pour l'application
 *
 * Tables :
 * - progression : Progression de l'utilisateur (mastery, leçons, concepts débloqués)
 * - reviewSchedules : Échéances de révision espacée
 * - statistics : Statistiques globales de l'utilisateur
 * - preferences : Préférences utilisateur
 * - syncOperations : File d'attente de synchronisation (Lot 13)
 */
export const db = new Dexie(DB_NAME) as Dexie & JapAppDatabase;

// ============================================================
// Définition du schéma
// ============================================================

db.version(DB_VERSION).stores({
  // Progression : clé = 'user_progress' (une seule progression par utilisateur)
  progression: '&id',
  
  // Échéances de révision : clé = conceptId
  reviewSchedules: '&conceptId',
  
  // Statistiques : clé = 'user_stats' (une seule entrée)
  statistics: '&id',
  
  // Préférences : clé = 'user_prefs' (une seule entrée)
  preferences: '&id',
  
  // Opérations de synchronisation : clé = id (uuid)
  syncOperations: '&id, status, createdAt',
  
  // Gamification : cl� = 'user_gamification' (une seule entr�e)
  gamification: '&id',
});

// ============================================================
// Fonctions utilitaires pour les IDs
// ============================================================

/**
 * ID unique pour la progression
 */
export const PROGRESSION_ID = 'user_progress';

/**
 * ID unique pour les statistiques
 */
export const STATISTICS_ID = 'user_stats';

/**
 * ID unique pour les préférences
 */
export const PREFERENCES_ID = 'user_prefs';

/**
 * Génère un ID unique pour les opérations de synchronisation
 */
export function generateSyncOperationId(): string {
  return Date.now().toString(36) + '-' + Math.random().toString(36).substr(2, 9);
}

export default db;

/**
 * ID unique pour la gamification
 */
export const GAMIFICATION_ID = 'user_gamification';
