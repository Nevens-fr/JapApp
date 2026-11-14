/**
 * Système de gamification et scoring
 * Lot 9 : Gamification et progression
 * 
 * Ce module gère les mécaniques ludiques (XP, niveaux, séries, statistiques)
 * sans interférer avec les règles pédagogiques.
 */

import type { MasteryLevel } from './types';

// ============================================================
// Types pour la gamification
// ============================================================

/**
 * Points d'expérience (XP) gagnés pour différentes actions
 */
export interface XPCalibration {
  correctAnswer: number;        // XP pour une bonne réponse normale
  hardCorrectAnswer: number;    // XP pour une bonne réponse difficile
  easyCorrectAnswer: number;    // XP pour une bonne réponse facile
  lessonCompletion: number;     // XP pour compléter une leçon
  dailyGoalCompletion: number;  // XP bonus pour atteindre l'objectif quotidien
  streakBonus: number;          // XP bonus par jour de série
  masteryLevelUp: number;       // XP pour passer à un niveau de maîtrise supérieur
}

/**
 * Configuration par défaut des XP
 */
export const DEFAULT_XP_CALIBRATION: XPCalibration = {
  correctAnswer: 10,
  hardCorrectAnswer: 15,
  easyCorrectAnswer: 5,
  lessonCompletion: 50,
  dailyGoalCompletion: 30,
  streakBonus: 5,
  masteryLevelUp: 100,
};

/**
 * Série d'apprentissage quotidien
 */
export interface LearningStreak {
  currentStreak: number;        // Série actuelle en jours
  longestStreak: number;        // Meilleure série record
  lastActiveDate: string;       // Dernière date d'activité (YYYY-MM-DD)
  totalActiveDays: number;      // Total de jours actifs
}

/**
 * Objectif quotidien
 */
export interface DailyGoal {
  targetXP: number;             // XP cible du jour
  currentXP: number;            // XP gagnés aujourd'hui
  targetLessons: number;        // Leçons cible du jour
  currentLessons: number;       // Leçons complétées aujourd'hui
  targetReviews: number;        // Révisions cible du jour
  currentReviews: number;       // Révisions complétées aujourd'hui
  isCompleted: boolean;         // Objectif atteint ?
  date: string;                 // Date de l'objectif (YYYY-MM-DD)
}

/**
 * Statistiques utilisateur agrégées
 */
export interface UserStatistics {
  totalXP: number;              // XP total cumulé
  totalLessonsCompleted: number;
  totalExercisesAnswered: number;
  totalCorrectAnswers: number;
  totalIncorrectAnswers: number;
  accuracyRate: number;         // Taux de réussite (0-100)
  averageLessonScore: number;   // Score moyen des leçons (0-100)
  conceptsMastered: number;
  conceptsInLearning: number;
  conceptsInReview: number;
  firstActivityDate: string;    // Première activité (YYYY-MM-DD)
  lastActivityDate: string;     // Dernière activité (YYYY-MM-DD)
}

/**
 * Activité d'une journée spécifique
 */
export interface DailyActivity {
  date: string;                 // YYYY-MM-DD
  xpEarned: number;
  lessonsCompleted: number;
  exercisesAnswered: number;
  correctAnswers: number;
  incorrectAnswers: number;
}

/**
 * État complet de la gamification
 */
export interface GamificationState {
  xp: number;                   // XP total
  level: number;                // Niveau utilisateur
  streak: LearningStreak;
  dailyGoal: DailyGoal;
  statistics: UserStatistics;
  history: DailyActivity[];     // Historique des activités (triées par date décroissante)
}

// ============================================================
// Fonctions utilitaires
// ============================================================

/**
 * Génère la date du jour au format YYYY-MM-DD
 */
export function getTodayString(): string {
  return new Date().toISOString().split('T')[0];
}

/**
 * Calcule le niveau utilisateur basé sur les XP totaux
 * Formule : level = floor(sqrt(xp / 100)) + 1
 */
export function calculateLevel(totalXP: number): number {
  return Math.floor(Math.sqrt(totalXP / 100)) + 1;
}

/**
 * Calcule le XP nécessaire pour atteindre le niveau suivant
 */
export function getXpForNextLevel(level: number): number {
  return level * level * 100;
}

/**
 * Calcule la progression vers le niveau suivant (0-100%)
 */
export function getProgressionToNextLevel(totalXP: number): number {
  const currentLevel = calculateLevel(totalXP);
  const xpForCurrentLevel = (currentLevel - 1) * (currentLevel - 1) * 100;
  const xpForNextLevel = currentLevel * currentLevel * 100;
  const progress = totalXP - xpForCurrentLevel;
  const totalNeeded = xpForNextLevel - xpForCurrentLevel;

  if (totalNeeded === 0) return 100;
  return Math.min(100, Math.max(0, (progress / totalNeeded) * 100));
}

// ============================================================
// Gestion de la série (streak)
// ============================================================

/**
 * Crée une série d'apprentissage initiale
 */
export function createInitialStreak(): LearningStreak {
  return {
    currentStreak: 0,
    longestStreak: 0,
    lastActiveDate: '',
    totalActiveDays: 0,
  };
}

/**
 * Met à jour la série après une activité quotidienne
 */
export function updateStreakAfterActivity(streak: LearningStreak, today: string): LearningStreak {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayString = yesterday.toISOString().split('T')[0];

  let newStreak = { ...streak };

  if (today === streak.lastActiveDate) {
    // Déjà actif aujourd'hui, pas de changement
    return newStreak;
  }

  if (streak.lastActiveDate === yesterdayString) {
    // Série continue
    newStreak.currentStreak += 1;
  } else if (streak.lastActiveDate !== today && streak.lastActiveDate !== yesterdayString) {
    // Série brisée, recommence à 1
    newStreak.currentStreak = 1;
  }

  newStreak.lastActiveDate = today;
  newStreak.totalActiveDays += 1;
  newStreak.longestStreak = Math.max(newStreak.longestStreak, newStreak.currentStreak);

  return newStreak;
}

/**
 * Vérifie si la série est toujours active (pas brisée)
 */
export function isStreakActive(streak: LearningStreak, today: string): boolean {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayString = yesterday.toISOString().split('T')[0];

  return streak.lastActiveDate === today || streak.lastActiveDate === yesterdayString;
}

// ============================================================
// Gestion des objectifs quotidiens
// ============================================================

/**
 * Crée un objectif quotidien initial
 */
export function createDailyGoal(today: string): DailyGoal {
  return {
    targetXP: 100,
    currentXP: 0,
    targetLessons: 2,
    currentLessons: 0,
    targetReviews: 10,
    currentReviews: 0,
    isCompleted: false,
    date: today,
  };
}

/**
 * Met à jour l'objectif quotidien avec des XP gagnés
 */
export function updateDailyGoalXP(goal: DailyGoal, xpEarned: number): DailyGoal {
  const newGoal = { ...goal };
  newGoal.currentXP += xpEarned;
  newGoal.isCompleted = newGoal.currentXP >= newGoal.targetXP;
  return newGoal;
}

/**
 * Met à jour l'objectif quotidien avec des leçons complétées
 */
export function updateDailyGoalLessons(goal: DailyGoal, lessonsCompleted: number): DailyGoal {
  const newGoal = { ...goal };
  newGoal.currentLessons += lessonsCompleted;
  newGoal.isCompleted = newGoal.currentXP >= newGoal.targetXP &&
                        newGoal.currentLessons >= newGoal.targetLessons &&
                        newGoal.currentReviews >= newGoal.targetReviews;
  return newGoal;
}

/**
 * Met à jour l'objectif quotidien avec des révisions complétées
 */
export function updateDailyGoalReviews(goal: DailyGoal, reviewsCompleted: number): DailyGoal {
  const newGoal = { ...goal };
  newGoal.currentReviews += reviewsCompleted;
  newGoal.isCompleted = newGoal.currentXP >= newGoal.targetXP &&
                        newGoal.currentLessons >= newGoal.targetLessons &&
                        newGoal.currentReviews >= newGoal.targetReviews;
  return newGoal;
}

/**
 * Crée un nouvel objectif pour une nouvelle journée
 */
export function createNewDayGoal(oldGoal: DailyGoal, today: string): DailyGoal {
  return {
    targetXP: oldGoal.targetXP,
    currentXP: 0,
    targetLessons: oldGoal.targetLessons,
    currentLessons: 0,
    targetReviews: oldGoal.targetReviews,
    currentReviews: 0,
    isCompleted: false,
    date: today,
  };
}

// ============================================================
// Calcul des XP
// ============================================================

/**
 * Calcule les XP gagnés pour une réponse correcte
 */
export function calculateAnswerXP(
  calibration: XPCalibration,
  isCorrect: boolean,
  difficulty: number
): number {
  if (!isCorrect) return 0;

  if (difficulty >= 0.7) {
    return calibration.hardCorrectAnswer;
  } else if (difficulty <= 0.3) {
    return calibration.easyCorrectAnswer;
  }

  return calibration.correctAnswer;
}

/**
 * Calcule les XP pour la complétion d'une leçon
 */
export function calculateLessonCompletionXP(
  calibration: XPCalibration,
  score: number
): number {
  const baseXP = calibration.lessonCompletion;
  const bonus = Math.round(baseXP * (score / 100));
  return baseXP + bonus;
}

// ============================================================
// Statistiques
// ============================================================

/**
 * Crée des statistiques initiales
 */
export function createInitialStatistics(today: string): UserStatistics {
  return {
    totalXP: 0,
    totalLessonsCompleted: 0,
    totalExercisesAnswered: 0,
    totalCorrectAnswers: 0,
    totalIncorrectAnswers: 0,
    accuracyRate: 0,
    averageLessonScore: 0,
    conceptsMastered: 0,
    conceptsInLearning: 0,
    conceptsInReview: 0,
    firstActivityDate: today,
    lastActivityDate: today,
  };
}

/**
 * Met à jour les statistiques après une réponse d'exercice
 */
export function updateStatisticsAfterExercise(
  stats: UserStatistics,
  isCorrect: boolean,
  today: string
): UserStatistics {
  const newStats = { ...stats };
  newStats.totalExercisesAnswered += 1;
  newStats.lastActivityDate = today;

  if (isCorrect) {
    newStats.totalCorrectAnswers += 1;
  } else {
    newStats.totalIncorrectAnswers += 1;
  }

  const total = newStats.totalExercisesAnswered;
  newStats.accuracyRate = total > 0
    ? Math.round((newStats.totalCorrectAnswers / total) * 100)
    : 0;

  return newStats;
}

/**
 * Met à jour les statistiques après complétion d'une leçon
 */
export function updateStatisticsAfterLesson(
  stats: UserStatistics,
  lessonScore: number,
  today: string
): UserStatistics {
  const newStats = { ...stats };
  newStats.totalLessonsCompleted += 1;
  newStats.lastActivityDate = today;

  const totalLessons = newStats.totalLessonsCompleted;
  const currentAverage = newStats.averageLessonScore;
  newStats.averageLessonScore = Math.round(
    ((currentAverage * (totalLessons - 1)) + lessonScore) / totalLessons
  );

  return newStats;
}

/**
 * Met à jour les statistiques de maîtrise à partir des masteries
 */
export function updateStatisticsMastery(
  stats: UserStatistics,
  mastery: Record<string, MasteryLevel>
): UserStatistics {
  const newStats = { ...stats };
  let mastered = 0;
  let learning = 0;
  let review = 0;

  for (const m of Object.values(mastery)) {
    if (m.state === 'mastered') mastered += 1;
    else if (m.state === 'learning') learning += 1;
    else if (m.state === 'review') review += 1;
  }

  newStats.conceptsMastered = mastered;
  newStats.conceptsInLearning = learning;
  newStats.conceptsInReview = review;

  return newStats;
}

/**
 * Crée une entrée d'activité quotidienne
 */
export function createDailyActivityEntry(
  today: string,
  xpEarned: number,
  lessonsCompleted: number,
  exercisesAnswered: number,
  correctAnswers: number,
  incorrectAnswers: number
): DailyActivity {
  return {
    date: today,
    xpEarned,
    lessonsCompleted,
    exercisesAnswered,
    correctAnswers,
    incorrectAnswers,
  };
}

/**
 * Ajoute une activité à l'historique
 */
export function addActivityToHistory(
  history: DailyActivity[],
  activity: DailyActivity
): DailyActivity[] {
  const existingIndex = history.findIndex((a) => a.date === activity.date);

  if (existingIndex >= 0) {
    const newHistory = [...history];
    newHistory[existingIndex] = activity;
    return newHistory;
  }

  return [activity, ...history].sort((a, b) => b.date.localeCompare(a.date));
}

/**
 * Crée l'état initial de gamification
 */
export function createInitialGamificationState(): GamificationState {
  const today = getTodayString();
  return {
    xp: 0,
    level: 1,
    streak: createInitialStreak(),
    dailyGoal: createDailyGoal(today),
    statistics: createInitialStatistics(today),
    history: [],
  };
}

/**
 * Met à jour le niveau basé sur les XP
 */
export function updateLevelFromXP(xp: number): number {
  return calculateLevel(xp);
}

/**
 * Vérifie si l'utilisateur a monté de niveau
 */
export function checkLevelUp(oldLevel: number, newXP: number): boolean {
  return calculateLevel(newXP) > oldLevel;
}
