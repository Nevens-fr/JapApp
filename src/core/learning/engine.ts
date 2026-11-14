/**
 * Moteur pédagogique principal
 * Lot 3 : Moteur pédagogique
 * Lot 9 : Gamification et progression
 *
 * Ce module est indépendant de React et du navigateur.
 * Il peut être testé unitairement sans interface graphique.
 */

import {
  type MasteryLevel,
  type ExerciseResult,
  type LessonState,
  type PedagogicalEvent,
  type LearningEngineConfig,
  DEFAULT_CONFIG,
} from "./types";
import {
  updateMasteryWithSM2,
  initializeMastery,
  isReviewDue,
  isReviewOverdue,
  sortReviewsByPriority,
  getRecallQuality,
  type RecallQuality,
} from "./revision";
import {
  type UserProgression,
  createInitialProgression,
  getNextConceptToLearn,
  calculateGlobalProgression,
  getReviewCount,
  getLearningCount,
} from "./progression";
import {
  type GamificationState,
  type XPCalibration,
  type DailyGoal,
  type UserStatistics,
  DEFAULT_XP_CALIBRATION,
  calculateAnswerXP,
  calculateLessonCompletionXP,
  updateStreakAfterActivity,
  createNewDayGoal,
  updateDailyGoalXP,
  updateDailyGoalLessons,
  updateDailyGoalReviews,
  updateStatisticsAfterExercise,
  updateStatisticsAfterLesson,
  updateStatisticsMastery,
  createDailyActivityEntry,
  addActivityToHistory,
  checkLevelUp,
  getProgressionToNextLevel as calculateProgression,
  updateLevelFromXP,
  getTodayString,
  type DailyActivity,
  createInitialGamificationState,
} from "./scoring";

// ============================================================
// Types d'exercices liés au moteur
// ============================================================

/**
 * Données nécessaires pour évaluer une réponse
 */
export interface EvaluationContext {
  exerciseId: string;
  expectedAnswer: unknown;
  userAnswer: unknown;
  exerciseData: Record<string, unknown>;
}

/**
 * Résultat de l\'évaluation d\'une réponse
 */
export interface EvaluationResult {
  isCorrect: boolean;
  explanation?: string;
  feedback: string;
}

/**
 * Exercice tel que vu par le moteur
 */
export interface EngineExercise {
  id: string;
  type: string;
  difficulty: number;
  data: Record<string, unknown>;
  pedagogicalObjective: string;
  expectedAnswer: unknown;
  explanation?: string;
  associatedConcepts: string[];
}

// ============================================================
// Résultat enrichi avec gamification
// ============================================================

/**
 * Résultat d\'exercice incluant les informations de gamification
 */
export interface ExerciseResultWithScoring {
  exerciseResult: ExerciseResult;
  xpEarned: number;
  levelUp: boolean;
}

// ============================================================
// Moteur pédagogique principal
// ============================================================

export class LearningEngine {
  private config: LearningEngineConfig;
  private progression: UserProgression;
  private events: PedagogicalEvent[];
  private allConcepts: Array<{
    id: string;
    prerequisites?: string[];
    order: number;
    type: "vocab" | "kana" | "kanji" | "grammar";
  }>;
  private allExercises: EngineExercise[];

  // ============================================================
  // Champs de gamification (Lot 9)
  // ============================================================
  private gamificationState: GamificationState;
  private xpCalibration: XPCalibration;
  private exercisesToday: number;
  private correctToday: number;
  private incorrectToday: number;
  private lessonsToday: number;

  constructor(config?: Partial<LearningEngineConfig>) {
    this.config = { ...DEFAULT_CONFIG, ...config };
    this.progression = createInitialProgression();
    this.events = [];
    this.allConcepts = [];
    this.allExercises = [];
    this.xpCalibration = { ...DEFAULT_XP_CALIBRATION };
    this.gamificationState = createInitialGamificationState();
    this.exercisesToday = 0;
    this.correctToday = 0;
    this.incorrectToday = 0;
    this.lessonsToday = 0;
  }

  // ============================================================
  // Chargement des données pédagogiques
  // ============================================================

  /**
   * Charge la liste des concepts (vocabulaire, kana, kanji, grammaire)
   */
  loadConcepts(concepts: Array<{
    id: string;
    prerequisites?: string[];
    order: number;
    type: "vocab" | "kana" | "kanji" | "grammar";
  }>): void {
    this.allConcepts = concepts;
  }

  /**
   * Charge la liste des exercices disponibles
   */
  loadExercises(exercises: EngineExercise[]): void {
    this.allExercises = exercises;
  }

  // ============================================================
  // Sélection d\'exercices
  // ============================================================

  /**
   * Sélectionne les exercices pertinents pour la session actuelle
   * Priorité : concepts en apprentissage, puis révisions, puis nouveaux concepts
   */
  selectExercisesForSession(maxExercises: number = 10): EngineExercise[] {
    const nextConceptId = getNextConceptToLearn(
      this.allConcepts,
      this.progression
    );

    if (!nextConceptId) {
      return [];
    }

    // Filtrer les exercices associés au concept sélectionné
    const conceptExercises = this.allExercises.filter((ex) =>
      ex.associatedConcepts.includes(nextConceptId)
    );

    // Trier par difficulté croissante
    conceptExercises.sort((a, b) => a.difficulty - b.difficulty);

    // Retourner le nombre demandé
    return conceptExercises.slice(0, maxExercises);
  }

  /**
   * Sélectionne les exercices de révision pour une session
   */
  selectReviewExercises(maxExercises: number = 10): EngineExercise[] {
    const reviewConcepts = this.allConcepts.filter((c) => {
      const mastery = this.progression.mastery[c.id];
      return mastery && mastery.state === "review";
    });

    if (reviewConcepts.length === 0) {
      return [];
    }

    // Trier par date de prochaine révision (plus urgente en premier)
    reviewConcepts.sort(
      (a, b) =>
        (this.progression.mastery[a.id]?.nextReviewAt?.getTime() ?? Infinity) -
        (this.progression.mastery[b.id]?.nextReviewAt?.getTime() ?? Infinity)
    );

    const selectedConceptIds = reviewConcepts.slice(0, maxExercises).map((c) => c.id);

    const reviewExercises = this.allExercises.filter((ex) =>
      selectedConceptIds.some((id) => ex.associatedConcepts.includes(id))
    );

    return reviewExercises.slice(0, maxExercises);
  }

  // ============================================================
  // évaluation des réponses
  // ============================================================

  /**
   * évalue la réponse de l\'utilisateur pour un exercice
   */
  evaluateAnswer(context: EvaluationContext): EvaluationResult {
    const expected = context.expectedAnswer;
    const userAnswer = context.userAnswer;

    // Comparaison simple (peut être étendue pour des comparaisons plus fines)
    const isCorrect = this.compareAnswers(expected, userAnswer);

    if (isCorrect) {
      return {
        isCorrect: true,
        feedback: "Bonne réponse !",
        explanation: context.exerciseData["explanation"] as string | undefined,
      };
    } else {
      return {
        isCorrect: false,
        feedback: `Mauvaise réponse. La réponse attendue était : ${expected}`,
        explanation: context.exerciseData["explanation"] as string | undefined,
      };
    }
  }

  /**
   * Compare deux réponses (extension possible pour la flexibilité)
   */
  private compareAnswers(expected: unknown, actual: unknown): boolean {
    // Cas simple : égalité stricte
    if (expected === actual) return true;

    // Cas des strings : comparaison insensible ê la casse et aux espaces
    if (typeof expected === "string" && typeof actual === "string") {
      return expected.trim().toLowerCase() === actual.trim().toLowerCase();
    }

    // Cas des arrays : même contenu dans le même ordre
    if (Array.isArray(expected) && Array.isArray(actual)) {
      if (expected.length !== actual.length) return false;
      return expected.every((e, i) => e === actual[i]);
    }

    return false;
  }

  // ============================================================
  // Gestion des leéons
  // ============================================================

  /**
   * Démarre une leéon
   */
  startLesson(lessonId: string): PedagogicalEvent {
    const event: PedagogicalEvent = {
      type: "lesson_started",
      timestamp: new Date(),
      data: { lessonId },
    };
    this.events.push(event);

    if (!this.progression.lessons[lessonId]) {
      this.progression.lessons[lessonId] = { completed: false, score: 0 };
    }

    return event;
  }

  /**
   * Enregistre le résultat d\'un exercice dans le contexte d\'une leéon
   */
  recordExerciseResult(
    lessonId: string,
    result: ExerciseResult
  ): PedagogicalEvent {
    const event: PedagogicalEvent = {
      type: "exercise_answered",
      timestamp: new Date(),
      data: { lessonId, ...result },
    };
    this.events.push(event);

    // Mettre ê jour la maǩtrise liée ê l\'exercice
    this.updateMasteryFromResult(result);

    return event;
  }

  /**
   * Termine une leéon et calcule le score
   */
  completeLesson(lessonId: string): PedagogicalEvent {
    // Créer l\'entrée de leéon si elle n\'existe pas (au cas oê startLesson n\'a pas êté appelé)
    if (!this.progression.lessons[lessonId]) {
      this.progression.lessons[lessonId] = { completed: false, score: 0 };
    }

    const lessonProgression = this.progression.lessons[lessonId];

    // Récupérer les résultats de cette leéon
    const lessonResults = this.events
      .filter((e) => e.type === "exercise_answered" && (e.data as any).lessonId === lessonId)
      .map((e) => (e.data as any).exerciseId);

    // Calculer le score
    const correctCount = lessonResults.filter((id: string) => {
      const result = this.events.find(
        (e) => e.type === "exercise_answered" && (e.data as any).exerciseId === id
      );
      return result && (result.data as any).isCorrect;
    }).length;

    const total = lessonResults.length;
    const score = total > 0 ? Math.round((correctCount / total) * 100) : 0;

    lessonProgression.completed = true;
    lessonProgression.score = score;

    const event: PedagogicalEvent = {
      type: "lesson_completed",
      timestamp: new Date(),
      data: { lessonId, score, correctCount, total },
    };
    this.events.push(event);

    return event;
  }

  /**
   * Abandonne une leéon en cours
   */
  abandonLesson(lessonId: string): PedagogicalEvent {
    const event: PedagogicalEvent = {
      type: "lesson_abandoned",
      timestamp: new Date(),
      data: { lessonId },
    };
    this.events.push(event);

    return event;
  }

  /**
   * Vérifie si une leéon est réussie selon les régles du moteur
   */
  isLessonSuccessful(lessonId: string): boolean {
    const lessonProgression = this.progression.lessons[lessonId];

    if (!lessonProgression || !lessonProgression.completed) {
      return false;
    }

    // Régle : score minimum de 70% pour valider la leéon
    return (lessonProgression.score ?? 0) >= 70;
  }

  // ============================================================
  // Mise ê jour de la maǩtrise
  // ============================================================

  /**
   * Met ê jour le niveau de maǩtrise aprés un résultat d\'exercice
   * Utilise l\'algorithme SM-2 pour la révision espacée
   */
  private updateMasteryFromResult(result: ExerciseResult): void {
    const exercise = this.allExercises.find((ex) => ex.id === result.exerciseId);
    if (!exercise) return;

    for (const conceptId of exercise.associatedConcepts) {
      if (!this.progression.mastery[conceptId]) {
        this.progression.mastery[conceptId] = initializeMastery(this.config);
      }

      const currentMastery = this.progression.mastery[conceptId];
      const quality: RecallQuality = getRecallQuality(result.isCorrect, exercise.difficulty);
      this.progression.mastery[conceptId] = updateMasteryWithSM2(currentMastery, quality, this.config);
    }
  }

  // ============================================================
  // Requétes sur la progression
  // ============================================================

  /**
   * Obtient la maǩtrise actuelle pour un concept donné
   */
  getMastery(conceptId: string): MasteryLevel | undefined {
    return this.progression.mastery[conceptId];
  }

  /**
   * Obtient tous les concepts ê réviser (triés par priorité SM-2)
   */
  getConceptsToReview(): string[] {
    const masteries = Object.entries(this.progression.mastery)
      .filter(([, mastery]) => {
        return isReviewDue(mastery) || isReviewOverdue(mastery);
      })
      .map(([id, mastery]) => ({ id, mastery }));

    const sorted = sortReviewsByPriority(masteries.map((m) => m.mastery));

    return sorted.map((sortedMastery) => {
      const original = masteries.find((m) => m.mastery === sortedMastery);
      return original?.id;
    }).filter((id): id is string => id !== undefined);
  }

  /**
   * Obtient les révisions ê venir (dans les N prochains jours)
   * Inclut les révisions dues aujourd\'hui/hors mais pas encore affichées
   */
  getUpcomingReviews(daysAhead: number = 7): string[] {
    const now = new Date();
    // Définir maxDate ê now + daysAhead
    const maxDate = new Date(now);
    maxDate.setDate(maxDate.getDate() + daysAhead);

    const upcoming = Object.entries(this.progression.mastery)
      .filter(([, mastery]) => {
        // Exclure les concepts sans nextReviewAt
        if (!mastery.nextReviewAt) return false;
        // Exclure les concepts déjê révisés (nextReviewAt <= now)
        if (mastery.nextReviewAt <= now) return false;
        // Inclure les concepts dont nextReviewAt est dans la fenêtre future
        return mastery.nextReviewAt <= maxDate;
      })
      .map(([id]) => id);

    return upcoming;
  }

  /**
   * Obtient la progression globale
   */
  getGlobalProgression(): number {
    return calculateGlobalProgression(this.allConcepts, this.progression);
  }

  /**
   * Obtient le nombre de concepts ê réviser
   */
  getReviewCount(): number {
    return getReviewCount(this.progression);
  }

  /**
   * Obtient le nombre de concepts en apprentissage
   */
  getLearningCount(): number {
    return getLearningCount(this.progression);
  }

  /**
   * Obtient l\'état d\'une leéon
   */
  getLessonState(lessonId: string): LessonState | undefined {
    const lp = this.progression.lessons[lessonId];
    if (!lp) return undefined;

    return {
      lessonId,
      status: lp.completed ? "completed" : "in_progress",
      results: [], // ê remplir avec les résultats réels
      startedAt: new Date(),
      completedAt: lp.completed ? new Date() : null,
      score: lp.score,
    };
  }

  /**
   * Obtient tous les événements pédagogiques
   */
  getEvents(): PedagogicalEvent[] {
    return [...this.events];
  }

  /**
   * Obtient l\'état complet de progression (sérialisable)
   */
  getProgressionSnapshot(): UserProgression {
    const cloned = JSON.parse(JSON.stringify(this.progression));
    // Reconstruire les objets Date dans les masteries (JSON convertit les Date en strings ISO)
    const masteries = cloned.mastery as Record<string, any>;
    for (const mastery of Object.values(masteries)) {
      if (mastery.lastReviewedAt && typeof mastery.lastReviewedAt === "string") {
        mastery.lastReviewedAt = new Date(mastery.lastReviewedAt);
      }
      if (mastery.nextReviewAt && typeof mastery.nextReviewAt === "string") {
        mastery.nextReviewAt = new Date(mastery.nextReviewAt);
      }
    }
    return cloned as UserProgression;
  }

  /**
   * Restaure une progression ê partir d\'un snapshot
   * IMPORTANT: Fait un deep clone pour éviter les références partagées
   */
  restoreProgression(snapshot: UserProgression): void {
    // Deep clone pour éviter que les modifications ultérieures n\'affectent le snapshot original
    const cloned = JSON.parse(JSON.stringify(snapshot));
    // Reconstruire les objets Date dans les masteries (JSON convertit les Date en strings ISO)
    const masteries = cloned.mastery as Record<string, any>;
    for (const mastery of Object.values(masteries)) {
      if (mastery.lastReviewedAt && typeof mastery.lastReviewedAt === "string") {
        mastery.lastReviewedAt = new Date(mastery.lastReviewedAt);
      }
      if (mastery.nextReviewAt && typeof mastery.nextReviewAt === "string") {
        mastery.nextReviewAt = new Date(mastery.nextReviewAt);
      }
    }
    this.progression = cloned as UserProgression;
    // Réinitialiser les événements car ils ne sont pas sérialisés dans le snapshot
    this.events = [];
  }

  /**
   * Obtient la configuration actuelle
   */
  getConfig(): LearningEngineConfig {
    return { ...this.config };
  }

  /**
   * Met ê jour la configuration
   */
  updateConfig(config: Partial<LearningEngineConfig>): void {
    this.config = { ...this.config, ...config };
  }

  // ============================================================
  // Gamification - Lot 9
  // ============================================================

  /**
   * Vérifie et réinitialise l\'objectif quotidien si c\'est un nouveau jour
   */
  private checkAndResetDailyGoal(): void {
    const today = getTodayString();

    if (this.gamificationState.dailyGoal.date !== today) {
      // Nouveau jour : reset de l\'objectif
      this.gamificationState.dailyGoal = createNewDayGoal(
        this.gamificationState.dailyGoal,
        today
      );
      this.exercisesToday = 0;
      this.correctToday = 0;
      this.incorrectToday = 0;
      this.lessonsToday = 0;

      // Mise ê jour des statistiques de maǩtrise
      this.gamificationState.statistics = updateStatisticsMastery(
        this.gamificationState.statistics,
        this.progression.mastery
      );
    }
  }

  /**
   * Ajoute des XP ê l\'utilisateur
   */
  private addXP(xp: number): void {
    this.gamificationState.xp += xp;
    this.gamificationState.level = updateLevelFromXP(this.gamificationState.xp);
    this.gamificationState.statistics.totalXP = this.gamificationState.xp;

    // Mise ê jour de l\'objectif quotidien
    this.gamificationState.dailyGoal = updateDailyGoalXP(
      this.gamificationState.dailyGoal,
      xp
    );
  }

  /**
   * Enregistre un résultat d\'exercice avec calcul des XP
   */
  recordExerciseResultWithScoring(
    lessonId: string,
    result: ExerciseResult
  ): ExerciseResultWithScoring {
    // Vérifier le reset quotidien
    this.checkAndResetDailyGoal();

    // Enregistrer le résultat pédagogique
    this.recordExerciseResult(lessonId, result);

    // Trouver l\'exercice pour obtenir la difficulté
    const exercise = this.allExercises.find((ex) => ex.id === result.exerciseId);
    const difficulty = exercise ? exercise.difficulty : 0.5;

    // Calculer les XP
    const xpEarned = calculateAnswerXP(this.xpCalibration, result.isCorrect, difficulty);

    // Mise ê jour des statistiques
    this.gamificationState.statistics = updateStatisticsAfterExercise(
      this.gamificationState.statistics,
      result.isCorrect,
      getTodayString()
    );

    // Mise ê jour des compteurs quotidiens
    this.exercisesToday += 1;
    if (result.isCorrect) {
      this.correctToday += 1;
    } else {
      this.incorrectToday += 1;
    }

    // Ajouter les XP
    const oldLevel = this.gamificationState.level;
    this.addXP(xpEarned);
    const levelUp = checkLevelUp(oldLevel, this.gamificationState.xp);

    // Mise ê jour de l\'activité quotidienne
    const today = getTodayString();
    const dailyActivity = createDailyActivityEntry(
      today,
      xpEarned,
      this.lessonsToday,
      this.exercisesToday,
      this.correctToday,
      this.incorrectToday
    );
    this.gamificationState.history = addActivityToHistory(
      this.gamificationState.history,
      dailyActivity
    );

    return {
      exerciseResult: result,
      xpEarned,
      levelUp,
    };
  }

  /**
   * Termine une leéon avec calcul des XP de gamification
   */
  completeLessonWithScoring(lessonId: string): PedagogicalEvent {
    // Enregistrer la complétion pédagogique
    const event = this.completeLesson(lessonId);

    // Vérifier le reset quotidien
    this.checkAndResetDailyGoal();

    // Récupérer le score
    const lessonProgression = this.progression.lessons[lessonId];
    const score = lessonProgression?.score ?? 0;

    // Calculer les XP pour la complétion
    const xpEarned = calculateLessonCompletionXP(this.xpCalibration, score);

    // Mise ê jour des statistiques
    this.gamificationState.statistics = updateStatisticsAfterLesson(
      this.gamificationState.statistics,
      score,
      getTodayString()
    );

    // Mise ê jour des compteurs quotidiens
    this.lessonsToday += 1;

    // Ajouter les XP
    const oldLevel = this.gamificationState.level;
    this.addXP(xpEarned);
    checkLevelUp(oldLevel, this.gamificationState.xp);

    // Mise ê jour de l\'objectif quotidien
    this.gamificationState.dailyGoal = updateDailyGoalLessons(
      this.gamificationState.dailyGoal,
      this.lessonsToday
    );

    // Mise ê jour de la série
    this.gamificationState.streak = updateStreakAfterActivity(
      this.gamificationState.streak,
      getTodayString()
    );

    // Mise ê jour de l\'activité quotidienne
    const today = getTodayString();
    const dailyActivity = createDailyActivityEntry(
      today,
      xpEarned,
      this.lessonsToday,
      this.exercisesToday,
      this.correctToday,
      this.incorrectToday
    );
    this.gamificationState.history = addActivityToHistory(
      this.gamificationState.history,
      dailyActivity
    );

    // Mise ê jour des statistiques de maǩtrise
    this.gamificationState.statistics = updateStatisticsMastery(
      this.gamificationState.statistics,
      this.progression.mastery
    );

    return event;
  }

  /**
   * Enregistre des révisions complétées pour l\'objectif quotidien
   */
  recordReviewsCompleted(count: number): void {
    this.checkAndResetDailyGoal();

    this.gamificationState.dailyGoal = updateDailyGoalReviews(
      this.gamificationState.dailyGoal,
      this.gamificationState.dailyGoal.currentReviews + count
    );
  }

  // ============================================================
  // Accesseurs gamification
  // ============================================================

  /**
   * Obtient l\'état complet de gamification
   */
  getGamificationState(): GamificationState {
    return { ...this.gamificationState };
  }

  /**
   * Obtient les XP totaux
   */
  getXP(): number {
    return this.gamificationState.xp;
  }

  /**
   * Obtient le niveau utilisateur
   */
  getLevel(): number {
    return this.gamificationState.level;
  }

  /**
   * Obtient la série d\'activité
   */
  getStreak(): number {
    return this.gamificationState.streak.currentStreak;
  }

  /**
   * Obtient l\'objectif quotidien
   */
  getDailyGoal(): DailyGoal {
    return { ...this.gamificationState.dailyGoal };
  }

  /**
   * Obtient les statistiques utilisateur
   */
  getStatistics(): UserStatistics {
    return { ...this.gamificationState.statistics };
  }

  /**
   * Obtient la progression vers le prochain niveau (0-100%)
   */
  getProgressionToNextLevel(): number {
    return calculateProgression(this.gamificationState.xp);
  }

  /**
   * Obtient la configuration XP
   */
  getXPCalibration(): XPCalibration {
    return { ...this.xpCalibration };
  }

  /**
   * Met ê jour la configuration XP
   */
  setXPCalibration(partial: Partial<XPCalibration>): void {
    this.xpCalibration = { ...this.xpCalibration, ...partial };
  }

  /**
   * Obtient l\'historique d\'activité
   */
  getActivityHistory(): DailyActivity[] {
    return [...this.gamificationState.history];
  }
}
