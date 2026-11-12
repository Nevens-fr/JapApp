/**
 * Moteur pédagogique principal
 * Lot 3 : Moteur pédagogique
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
 * Résultat de l'évaluation d'une réponse
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

  constructor(config?: Partial<LearningEngineConfig>) {
    this.config = { ...DEFAULT_CONFIG, ...config };
    this.progression = createInitialProgression();
    this.events = [];
    this.allConcepts = [];
    this.allExercises = [];
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
  // Sélection d'exercices
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
  // Évaluation des réponses
  // ============================================================

  /**
   * Évalue la réponse de l'utilisateur pour un exercice
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

    // Cas des strings : comparaison insensible à la casse et aux espaces
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
  // Gestion des leçons
  // ============================================================

  /**
   * Démarre une leçon
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
   * Enregistre le résultat d'un exercice dans le contexte d'une leçon
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

    // Mettre à jour la maîtrise liée à l'exercice
    this.updateMasteryFromResult(result);

    return event;
  }

  /**
   * Termine une leçon et calcule le score
   */
  completeLesson(lessonId: string): PedagogicalEvent {
    // Créer l'entrée de leçon si elle n'existe pas (au cas où startLesson n'a pas été appelé)
    if (!this.progression.lessons[lessonId]) {
      this.progression.lessons[lessonId] = { completed: false, score: 0 };
    }

    const lessonProgression = this.progression.lessons[lessonId];

    // Récupérer les résultats de cette leçon
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
   * Abandonne une leçon en cours
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
   * Vérifie si une leçon est réussie selon les règles du moteur
   */
  isLessonSuccessful(lessonId: string): boolean {
    const lessonProgression = this.progression.lessons[lessonId];

    if (!lessonProgression || !lessonProgression.completed) {
      return false;
    }

    // Règle : score minimum de 70% pour valider la leçon
    return (lessonProgression.score ?? 0) >= 70;
  }

  // ============================================================
  // Mise à jour de la maîtrise
  // ============================================================

  /**
   * Met à jour le niveau de maîtrise après un résultat d'exercice
   * Utilise l'algorithme SM-2 pour la révision espacée
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

  /**
   * Met à jour l'état de connaissance basé sur la maîtrise
   */
  // ============================================================
  // Requêtes sur la progression
  // ============================================================

  /**
   * Obtient la maîtrise actuelle pour un concept donné
   */
  getMastery(conceptId: string): MasteryLevel | undefined {
    return this.progression.mastery[conceptId];
  }

  /**
   * Obtient tous les concepts à réviser (triés par priorité SM-2)
   */
  getConceptsToReview(): string[] {
    console.log('[EngineDebug] getConceptsToReview - all masteries:', Object.keys(this.progression.mastery));
    for (const [id, m] of Object.entries(this.progression.mastery)) {
      console.log(`[EngineDebug]   ${id}: state=${m.state}, nextReviewAt=${m.nextReviewAt?.toISOString()}, isReviewDue=${isReviewDue(m)}, isReviewOverdue=${isReviewOverdue(m)}`);
    }
    const masteries = Object.entries(this.progression.mastery)
      .filter(([, mastery]) => {
        return isReviewDue(mastery) || isReviewOverdue(mastery);
      })
      .map(([id, mastery]) => ({ id, mastery }));

    console.log('[EngineDebug] Filtered masteries:', masteries.map(m => m.id));

    const sorted = sortReviewsByPriority(masteries.map(m => m.mastery));

    return sorted.map(sortedMastery => {
      const original = masteries.find(m => m.mastery === sortedMastery);
      return original?.id;
    }).filter((id): id is string => id !== undefined);
  }

  /**
   * Obtient la progression globale
   */
  getGlobalProgression(): number {
    return calculateGlobalProgression(this.allConcepts, this.progression);
  }

  /**
   * Obtient le nombre de concepts à réviser
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
   * Obtient l'état d'une leçon
   */
  getLessonState(lessonId: string): LessonState | undefined {
    const lp = this.progression.lessons[lessonId];
    if (!lp) return undefined;

    return {
      lessonId,
      status: lp.completed ? "completed" : "in_progress",
      results: [], // À remplir avec les résultats réels
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
   * Obtient l'état complet de progression (sérialisable)
   */
  getProgressionSnapshot(): UserProgression {
    const cloned = JSON.parse(JSON.stringify(this.progression));
    // Reconstruire les objets Date dans les masteries (JSON convertit les Date en strings ISO)
    const masteries = cloned.mastery as Record<string, any>;
    for (const mastery of Object.values(masteries)) {
      if (mastery.lastReviewedAt && typeof mastery.lastReviewedAt === 'string') {
        mastery.lastReviewedAt = new Date(mastery.lastReviewedAt);
      }
      if (mastery.nextReviewAt && typeof mastery.nextReviewAt === 'string') {
        mastery.nextReviewAt = new Date(mastery.nextReviewAt);
      }
    }
    return cloned as UserProgression;
  }

  /**
   * Restaure une progression à partir d'un snapshot
   * IMPORTANT: Fait un deep clone pour éviter les références partagées
   */
  restoreProgression(snapshot: UserProgression): void {
    // Deep clone pour éviter que les modifications ultérieures n'affectent le snapshot original
    const cloned = JSON.parse(JSON.stringify(snapshot));
    // Reconstruire les objets Date dans les masteries (JSON convertit les Date en strings ISO)
    const masteries = cloned.mastery as Record<string, any>;
    for (const mastery of Object.values(masteries)) {
      if (mastery.lastReviewedAt && typeof mastery.lastReviewedAt === 'string') {
        mastery.lastReviewedAt = new Date(mastery.lastReviewedAt);
      }
      if (mastery.nextReviewAt && typeof mastery.nextReviewAt === 'string') {
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
   * Met à jour la configuration
   */
  updateConfig(config: Partial<LearningEngineConfig>): void {
    this.config = { ...this.config, ...config };
  }
}
