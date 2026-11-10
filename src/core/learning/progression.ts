/**
 * Gestion de la progression et des prérequis
 * Lot 3 : Moteur pédagogique
 */

/**
 * Gestion de la progression et des prérequis
 * Lot 3 : Moteur pédagogique
 */
import type { MasteryLevel, PedagogicalEvent } from "./types";

/**
 * État complet de progression d'un utilisateur
 */
export interface UserProgression {
  mastery: Record<string, MasteryLevel>;       // Par ID de notion
  lessons: Record<string, { completed: boolean; score: number }>; // Par ID de leçon
  unlockedConcepts: string[];                  // Concepts déjà déblocés
}

/**
 * État initial de progression (nouvel utilisateur)
 */
export function createInitialProgression(): UserProgression {
  return {
    mastery: {},
    lessons: {},
    unlockedConcepts: [],
  };
}

/**
 * Vérifie si toutes les prérequis d'une notion sont satisfaites
 */
export function checkPrerequisites(
  _conceptId: string,
  prerequisites: string[] | undefined,
  progression: UserProgression
): boolean {
  // Pas de prérequis = toujours débloqué
  if (!prerequisites || prerequisites.length === 0) {
    return true;
  }

  // Vérifie que chaque prérequis est au moins "introduced" ou mieux
  return prerequisites.every((prereqId) => {
    const mastery = progression.mastery[prereqId];
    if (!mastery) return false;
    return mastery.state !== "not_discovered";
  });
}

/**
 * Calcule le prochain concept à apprendre
 * Priorité : concepts introduits mais non maîtrisés, puis concepts à réviser
 */
export function getNextConceptToLearn(
  allConcepts: {
    id: string;
    prerequisites?: string[];
    order: number;
  }[],
  progression: UserProgression
): string | null {
  // 1. Chercher un concept en cours d'apprentissage ( Learning )
  const learningConcepts = allConcepts.filter((c) => {
    const mastery = progression.mastery[c.id];
    return mastery && mastery.state === "learning";
  });

  if (learningConcepts.length > 0) {
    // Retourner celui avec la maîtrise la plus faible
    learningConcepts.sort(
      (a, b) =>
        (progression.mastery[a.id]?.value ?? 0) -
        (progression.mastery[b.id]?.value ?? 0)
    );
    return learningConcepts[0].id;
  }

  // 2. Chercher un concept à réviser
  const reviewConcepts = allConcepts.filter((c) => {
    const mastery = progression.mastery[c.id];
    return mastery && mastery.state === "review";
  });

  if (reviewConcepts.length > 0) {
    // Retourner celui dont la révision est la plus urgente
    reviewConcepts.sort(
      (a, b) =>
        (progression.mastery[a.id]?.nextReviewAt?.getTime() ?? Infinity) -
        (progression.mastery[b.id]?.nextReviewAt?.getTime() ?? Infinity)
    );
    return reviewConcepts[0].id;
  }

  // 3. Chercher un concept introduit mais pas encore en apprentissage
  const introducedConcepts = allConcepts.filter((c) => {
    const mastery = progression.mastery[c.id];
    return mastery && mastery.state === "introduced";
  });

  if (introducedConcepts.length > 0) {
    // Retourner celui avec le plus petit ordre
    introducedConcepts.sort((a, b) => a.order - b.order);
    return introducedConcepts[0].id;
  }

  // 4. Chercher un concept non découvert dont les prérequis sont satisfaits
  const discoverableConcepts = allConcepts.filter((c) => {
    const mastery = progression.mastery[c.id];
    if (!mastery || mastery.state !== "not_discovered") return false;
    return checkPrerequisites(c.id, c.prerequisites, progression);
  });

  if (discoverableConcepts.length > 0) {
    // Retourner celui avec le plus petit ordre
    discoverableConcepts.sort((a, b) => a.order - b.order);
    return discoverableConcepts[0].id;
  }

  return null; // Plus rien à apprendre
}

/**
 * Marque un concept comme introduit pour un utilisateur
 */
export function introduceConcept(
  conceptId: string,
  progression: UserProgression
): PedagogicalEvent {
  if (!progression.mastery[conceptId]) {
    progression.mastery[conceptId] = {
      value: 0.0,
      state: "introduced",
      lastReviewedAt: null,
      nextReviewAt: null,
      easinessFactor: 2.5,
      intervalDays: 0,
      repetitionCount: 0,
      correctCount: 0,
      incorrectCount: 0,
      totalAttempts: 0,
    };
  } else {
    progression.mastery[conceptId].state = "introduced";
  }

  // Débloquer le concept
  if (!progression.unlockedConcepts.includes(conceptId)) {
    progression.unlockedConcepts.push(conceptId);
  }

  return {
    type: "knowledge_updated",
    timestamp: new Date(),
    data: { conceptId, newState: "introduced" },
  };
}

/**
 * Calcule la progression globale (pourcentage de concepts maîtrisés)
 */
export function calculateGlobalProgression(
  allConcepts: { id: string }[],
  progression: UserProgression
): number {
  if (allConcepts.length === 0) return 0;

  const masteredCount = allConcepts.filter((c) => {
    const mastery = progression.mastery[c.id];
    return mastery && mastery.state === "mastered";
  }).length;

  return (masteredCount / allConcepts.length) * 100;
}

/**
 * Calcule le nombre de concepts à réviser
 */
export function getReviewCount(progression: UserProgression): number {
  return Object.values(progression.mastery).filter(
    (m) => m.state === "review"
  ).length;
}

/**
 * Calcule le nombre de concepts en cours d'apprentissage
 */
export function getLearningCount(progression: UserProgression): number {
  return Object.values(progression.mastery).filter(
    (m) => m.state === "learning"
  ).length;
}
