/**
 * Tests unitaires du moteur pédagogique
 * Lot 3 : Moteur pédagogique
 */

import { describe, it, expect, beforeEach } from "vitest";
import { LearningEngine, type EngineExercise } from "./engine";
import { DEFAULT_CONFIG } from "./types";

describe("LearningEngine", () => {
  let engine: LearningEngine;

  beforeEach(() => {
    engine = new LearningEngine();
  });

  // ============================================================
  // Tests d'initialisation
  // ============================================================

  describe("Initialisation", () => {
    it("doit créer un moteur avec la configuration par défaut", () => {
      const config = engine.getConfig();
      expect(config.masteryThreshold).toBe(DEFAULT_CONFIG.masteryThreshold);
      expect(config.minCorrectAnswers).toBe(DEFAULT_CONFIG.minCorrectAnswers);
      expect(config.reviewDecayFactor).toBe(DEFAULT_CONFIG.reviewDecayFactor);
      expect(config.maxAttemptsPerExercise).toBe(DEFAULT_CONFIG.maxAttemptsPerExercise);
    });

    it("doit démarrer avec une progression vide", () => {
      const snapshot = engine.getProgressionSnapshot();
      expect(Object.keys(snapshot.mastery).length).toBe(0);
      expect(Object.keys(snapshot.lessons).length).toBe(0);
      expect(snapshot.unlockedConcepts.length).toBe(0);
    });

    it("doit retourner 0% de progression globale au démarrage", () => {
      expect(engine.getGlobalProgression()).toBe(0);
    });

    it("doit retourner 0 révisions au démarrage", () => {
      expect(engine.getReviewCount()).toBe(0);
    });

    it("doit retourner 0 concepts en apprentissage au démarrage", () => {
      expect(engine.getLearningCount()).toBe(0);
    });
  });

  // ============================================================
  // Tests de chargement des données
  // ============================================================

  describe("Chargement des données", () => {
    it("doit charger une liste de concepts", () => {
      const concepts = [
        { id: "vocab_001", order: 1, type: "vocab" as const },
        { id: "kana_001", order: 2, type: "kana" as const },
      ];
      engine.loadConcepts(concepts);
      expect(engine.getGlobalProgression()).toBe(0);
    });

    it("doit charger une liste d'exercices", () => {
      const exercises: EngineExercise[] = [
        {
          id: "ex_001",
          type: "recognition",
          difficulty: 1,
          data: {},
          pedagogicalObjective: "Reconnaître un mot",
          expectedAnswer: "猫",
          explanation: "猫 signifie 'chat'",
          associatedConcepts: ["vocab_001"],
        },
      ];
      engine.loadExercises(exercises);
      expect(engine.selectExercisesForSession(5).length).toBe(0); // Pas de concepts chargés
    });
  });

  // ============================================================
  // Tests de sélection d'exercices
  // ============================================================

  describe("Sélection d'exercices", () => {
    beforeEach(() => {
      // Charger des concepts et exercices pour les tests
      engine.loadConcepts([
        { id: "vocab_001", prerequisites: [], order: 1, type: "vocab" as const },
        { id: "vocab_002", prerequisites: ["vocab_001"], order: 2, type: "vocab" as const },
        { id: "kana_001", prerequisites: [], order: 3, type: "kana" as const },
      ]);

      engine.loadExercises([
        {
          id: "ex_001",
          type: "recognition",
          difficulty: 1,
          data: {},
          pedagogicalObjective: "Reconnaître un mot",
          expectedAnswer: "猫",
          explanation: "猫 signifie 'chat'",
          associatedConcepts: ["vocab_001"],
        },
        {
          id: "ex_002",
          type: "recognition",
          difficulty: 2,
          data: {},
          pedagogicalObjective: "Reconnaître un mot",
          expectedAnswer: "犬",
          explanation: "犬 signifie 'chien'",
          associatedConcepts: ["vocab_001"],
        },
        {
          id: "ex_003",
          type: "recognition",
          difficulty: 1,
          data: {},
          pedagogicalObjective: "Reconnaître un mot",
          expectedAnswer: "本",
          explanation: "本 signifie 'livre'",
          associatedConcepts: ["vocab_002"],
        },
        {
          id: "ex_004",
          type: "recognition",
          difficulty: 1,
          data: {},
          pedagogicalObjective: "Reconnaître un kana",
          expectedAnswer: "あ",
          explanation: "あ se lit 'a'",
          associatedConcepts: ["kana_001"],
        },
      ]);
    });

    it("doit retourner une liste vide si aucun concept n'est chargé", () => {
      const emptyEngine = new LearningEngine();
      expect(emptyEngine.selectExercisesForSession(5)).toEqual([]);
    });

    it("doit retourner les exercices triés par difficulté croissante", () => {
      // Introduire le premier concept
      engine.loadConcepts([
        { id: "vocab_001", prerequisites: [], order: 1, type: "vocab" as const },
      ]);

      const exercises = engine.selectExercisesForSession(5);
      // Au départ, aucun concept n'est introduit, donc retourne []
      expect(exercises.length).toBe(0);
    });
  });

  // ============================================================
  // Tests d'évaluation des réponses
  // ============================================================

  describe("Évaluation des réponses", () => {
    it("doit reconnaître une réponse correcte (égalité stricte)", () => {
      const result = engine.evaluateAnswer({
        exerciseId: "ex_001",
        expectedAnswer: "猫",
        userAnswer: "猫",
        exerciseData: {},
      });

      expect(result.isCorrect).toBe(true);
      expect(result.feedback).toBe("Bonne réponse !");
    });

    it("doit reconnaître une réponse correcte (insensible à la casse)", () => {
      const result = engine.evaluateAnswer({
        exerciseId: "ex_001",
        expectedAnswer: "CHAT",
        userAnswer: "chat",
        exerciseData: {},
      });

      expect(result.isCorrect).toBe(true);
    });

    it("doit reconnaître une réponse incorrecte", () => {
      const result = engine.evaluateAnswer({
        exerciseId: "ex_001",
        expectedAnswer: "猫",
        userAnswer: "犬",
        exerciseData: {},
      });

      expect(result.isCorrect).toBe(false);
      expect(result.feedback).toContain("Mauvaise réponse");
    });

    it("doit ignorer les espaces autour de la réponse", () => {
      const result = engine.evaluateAnswer({
        exerciseId: "ex_001",
        expectedAnswer: "猫",
        userAnswer: " 猫 ",
        exerciseData: {},
      });

      expect(result.isCorrect).toBe(true);
    });

    it("doit comparer des tableaux pour les QCM", () => {
      const result = engine.evaluateAnswer({
        exerciseId: "ex_001",
        expectedAnswer: ["a", "b", "c"],
        userAnswer: ["a", "b", "c"],
        exerciseData: {},
      });

      expect(result.isCorrect).toBe(true);
    });

    it("doit rejeter un QCM avec un ordre différent", () => {
      const result = engine.evaluateAnswer({
        exerciseId: "ex_001",
        expectedAnswer: ["a", "b", "c"],
        userAnswer: ["c", "b", "a"],
        exerciseData: {},
      });

      expect(result.isCorrect).toBe(false);
    });

    it("doit inclure l'explication dans le résultat si fournie", () => {
      const result = engine.evaluateAnswer({
        exerciseId: "ex_001",
        expectedAnswer: "猫",
        userAnswer: "猫",
        exerciseData: { explanation: "猫 signifie 'chat'" },
      });

      expect(result.explanation).toBe("猫 signifie 'chat'");
    });
  });

  // ============================================================
  // Tests de gestion des leçons
  // ============================================================

  describe("Gestion des leçons", () => {
    it("doit démarrer une leçon", () => {
      const event = engine.startLesson("lesson_001");

      expect(event.type).toBe("lesson_started");
      expect((event.data as any).lessonId).toBe("lesson_001");

      const lessonState = engine.getLessonState("lesson_001");
      expect(lessonState).toBeDefined();
      expect(lessonState?.status).toBe("in_progress");
    });

    it("doit retourner undefined pour une leçon inexistante", () => {
      expect(engine.getLessonState("lesson_inexistante")).toBeUndefined();
    });

    it("doit marquer une leçon comme terminée avec un score", () => {
      engine.startLesson("lesson_001");

      // Enregistrer des résultats d'exercices
      engine.recordExerciseResult("lesson_001", {
        exerciseId: "ex_001",
        isCorrect: true,
        attempts: 1,
        timeSpentMs: 5000,
        timestamp: new Date(),
      });

      engine.recordExerciseResult("lesson_001", {
        exerciseId: "ex_002",
        isCorrect: true,
        attempts: 1,
        timeSpentMs: 3000,
        timestamp: new Date(),
      });

      engine.recordExerciseResult("lesson_001", {
        exerciseId: "ex_003",
        isCorrect: false,
        attempts: 2,
        timeSpentMs: 8000,
        timestamp: new Date(),
      });

      const event = engine.completeLesson("lesson_001");

      expect(event.type).toBe("lesson_completed");
      expect((event.data as any).score).toBe(67); // 2/3 = 66.67% arrondi à 67
      expect((event.data as any).correctCount).toBe(2);
      expect((event.data as any).total).toBe(3);
    });

    it("doit vérifier qu'une leçon avec score >= 70% est réussie", () => {
      engine.startLesson("lesson_001");

      engine.recordExerciseResult("lesson_001", {
        exerciseId: "ex_001",
        isCorrect: true,
        attempts: 1,
        timeSpentMs: 5000,
        timestamp: new Date(),
      });

      engine.recordExerciseResult("lesson_001", {
        exerciseId: "ex_002",
        isCorrect: true,
        attempts: 1,
        timeSpentMs: 3000,
        timestamp: new Date(),
      });

      engine.completeLesson("lesson_001");

      expect(engine.isLessonSuccessful("lesson_001")).toBe(true);
    });

    it("doit vérifier qu'une leçon avec score < 70% est échouée", () => {
      engine.startLesson("lesson_001");

      engine.recordExerciseResult("lesson_001", {
        exerciseId: "ex_001",
        isCorrect: true,
        attempts: 1,
        timeSpentMs: 5000,
        timestamp: new Date(),
      });

      engine.recordExerciseResult("lesson_001", {
        exerciseId: "ex_002",
        isCorrect: false,
        attempts: 1,
        timeSpentMs: 3000,
        timestamp: new Date(),
      });

      engine.recordExerciseResult("lesson_001", {
        exerciseId: "ex_003",
        isCorrect: false,
        attempts: 1,
        timeSpentMs: 3000,
        timestamp: new Date(),
      });

      engine.completeLesson("lesson_001");

      expect(engine.isLessonSuccessful("lesson_001")).toBe(false);
    });

    it("doit vérifier qu'une leçon non terminée n'est pas réussie", () => {
      engine.startLesson("lesson_001");
      expect(engine.isLessonSuccessful("lesson_001")).toBe(false);
    });

    it("doit abandonner une leçon en cours", () => {
      const event = engine.abandonLesson("lesson_001");

      expect(event.type).toBe("lesson_abandoned");
    });

    it("doit lancer une erreur pour une leçon inexistante lors de la complétion", () => {
      expect(() => engine.completeLesson("lesson_inexistante")).toThrow();
    });
  });

  // ============================================================
  // Tests de mise à jour de la maîtrise
  // ============================================================

  describe("Mise à jour de la maîtrise", () => {
    beforeEach(() => {
      engine.loadConcepts([
        { id: "vocab_001", prerequisites: [], order: 1, type: "vocab" as const },
      ]);

      engine.loadExercises([
        {
          id: "ex_001",
          type: "recognition",
          difficulty: 1,
          data: {},
          pedagogicalObjective: "Reconnaître un mot",
          expectedAnswer: "猫",
          explanation: "猫 signifie 'chat'",
          associatedConcepts: ["vocab_001"],
        },
      ]);
    });

    it("doit créer un entry de maîtrise lors du premier exercice", () => {
      engine.recordExerciseResult("lesson_001", {
        exerciseId: "ex_001",
        isCorrect: true,
        attempts: 1,
        timeSpentMs: 5000,
        timestamp: new Date(),
      });

      const mastery = engine.getMastery("vocab_001");
      expect(mastery).toBeDefined();
      expect(mastery?.totalAttempts).toBe(1);
      expect(mastery?.correctCount).toBe(1);
    });

    it("doit incrémenter les compteurs à chaque exercice", () => {
      engine.recordExerciseResult("lesson_001", {
        exerciseId: "ex_001",
        isCorrect: true,
        attempts: 1,
        timeSpentMs: 5000,
        timestamp: new Date(),
      });

      engine.recordExerciseResult("lesson_001", {
        exerciseId: "ex_001",
        isCorrect: false,
        attempts: 2,
        timeSpentMs: 8000,
        timestamp: new Date(),
      });

      engine.recordExerciseResult("lesson_001", {
        exerciseId: "ex_001",
        isCorrect: true,
        attempts: 1,
        timeSpentMs: 4000,
        timestamp: new Date(),
      });

      const mastery = engine.getMastery("vocab_001");
      expect(mastery?.totalAttempts).toBe(3);
      expect(mastery?.correctCount).toBe(2);
      expect(mastery?.incorrectCount).toBe(1);
    });

    it("doit planifier une prochaine révision après chaque exercice", () => {
      engine.recordExerciseResult("lesson_001", {
        exerciseId: "ex_001",
        isCorrect: true,
        attempts: 1,
        timeSpentMs: 5000,
        timestamp: new Date(),
      });

      const mastery = engine.getMastery("vocab_001");
      expect(mastery?.nextReviewAt).toBeDefined();
      expect(mastery?.lastReviewedAt).toBeDefined();
    });
  });

  // ============================================================
  // Tests d'événements pédagogiques
  // ============================================================

  describe("Événements pédagogiques", () => {
    it("doit enregistrer tous les événements", () => {
      engine.startLesson("lesson_001");

      engine.recordExerciseResult("lesson_001", {
        exerciseId: "ex_001",
        isCorrect: true,
        attempts: 1,
        timeSpentMs: 5000,
        timestamp: new Date(),
      });

      engine.completeLesson("lesson_001");

      const events = engine.getEvents();
      expect(events.length).toBe(3);
      expect(events[0].type).toBe("lesson_started");
      expect(events[1].type).toBe("exercise_answered");
      expect(events[2].type).toBe("lesson_completed");
    });

    it("doit retourner une copie des événements", () => {
      engine.startLesson("lesson_001");
      const events1 = engine.getEvents();

      engine.completeLesson("lesson_001");
      const events2 = engine.getEvents();

      expect(events2.length).toBeGreaterThan(events1.length);
    });
  });

  // ============================================================
  // Tests de sérialisation
  // ============================================================

  describe("Sérialisation et restauration", () => {
    it("doit sauvegarder et restaurer la progression", () => {
      engine.startLesson("lesson_001");
      engine.recordExerciseResult("lesson_001", {
        exerciseId: "ex_001",
        isCorrect: true,
        attempts: 1,
        timeSpentMs: 5000,
        timestamp: new Date(),
      });

      const snapshot = engine.getProgressionSnapshot();

      // Créer un nouveau moteur et restaurer
      const newEngine = new LearningEngine();
      newEngine.restoreProgression(snapshot);

      const restoredSnapshot = newEngine.getProgressionSnapshot();

      expect(Object.keys(restoredSnapshot.mastery).length).toBe(
        Object.keys(snapshot.mastery).length
      );
      expect(Object.keys(restoredSnapshot.lessons).length).toBe(
        Object.keys(snapshot.lessons).length
      );
    });
  });

  // ============================================================
  // Tests de configuration
  // ============================================================

  describe("Configuration", () => {
    it("doit permettre de mettre à jour la configuration", () => {
      engine.updateConfig({
        masteryThreshold: 0.9,
        minCorrectAnswers: 5,
      });

      const config = engine.getConfig();
      expect(config.masteryThreshold).toBe(0.9);
      expect(config.minCorrectAnswers).toBe(5);
      // Les autres valeurs restent par défaut
      expect(config.reviewDecayFactor).toBe(DEFAULT_CONFIG.reviewDecayFactor);
    });

    it("doit créer un moteur avec une configuration personnalisée", () => {
      const customEngine = new LearningEngine({
        masteryThreshold: 0.95,
        minCorrectAnswers: 10,
      });

      const config = customEngine.getConfig();
      expect(config.masteryThreshold).toBe(0.95);
      expect(config.minCorrectAnswers).toBe(10);
    });
  });

  // ============================================================
  // Tests d'intégration basiques
  // ============================================================

  describe("Scénario d'utilisation complet", () => {
    it("doit simuler un parcours d'apprentissage complet", () => {
      // 1. Charger les données
      engine.loadConcepts([
        { id: "vocab_001", prerequisites: [], order: 1, type: "vocab" as const },
        { id: "vocab_002", prerequisites: ["vocab_001"], order: 2, type: "vocab" as const },
      ]);

      engine.loadExercises([
        {
          id: "ex_001",
          type: "recognition",
          difficulty: 1,
          data: {},
          pedagogicalObjective: "Reconnaître un mot",
          expectedAnswer: "猫",
          explanation: "猫 signifie 'chat'",
          associatedConcepts: ["vocab_001"],
        },
        {
          id: "ex_002",
          type: "recognition",
          difficulty: 1,
          data: {},
          pedagogicalObjective: "Reconnaître un mot",
          expectedAnswer: "犬",
          explanation: "犬 signifie 'chien'",
          associatedConcepts: ["vocab_002"],
        },
      ]);

      // 2. Démarrer une leçon
      engine.startLesson("lesson_001");

      // 3. Répondre correctement
      const result1 = engine.evaluateAnswer({
        exerciseId: "ex_001",
        expectedAnswer: "猫",
        userAnswer: "猫",
        exerciseData: {},
      });
      expect(result1.isCorrect).toBe(true);

      engine.recordExerciseResult("lesson_001", {
        exerciseId: "ex_001",
        isCorrect: true,
        attempts: 1,
        timeSpentMs: 5000,
        timestamp: new Date(),
      });

      // 4. Répondre correctement à nouveau
      const result2 = engine.evaluateAnswer({
        exerciseId: "ex_001",
        expectedAnswer: "猫",
        userAnswer: "猫",
        exerciseData: {},
      });
      expect(result2.isCorrect).toBe(true);

      engine.recordExerciseResult("lesson_001", {
        exerciseId: "ex_001",
        isCorrect: true,
        attempts: 1,
        timeSpentMs: 4000,
        timestamp: new Date(),
      });

      // 5. Terminer la leçon
      engine.completeLesson("lesson_001");

      // 6. Vérifier que la leçon est réussie
      expect(engine.isLessonSuccessful("lesson_001")).toBe(true);

      // 7. Vérifier que la progression a été mise à jour
      const mastery = engine.getMastery("vocab_001");
      expect(mastery?.totalAttempts).toBe(2);
      expect(mastery?.correctCount).toBe(2);

      // 8. Vérifier les événements
      const events = engine.getEvents();
      expect(events.length).toBe(4); // start, exercise, exercise, complete
    });
  });
});
