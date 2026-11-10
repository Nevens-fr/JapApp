/**
 * Scénarios de test pour le système de révision
 * Ce fichier permet de tester les différentes situations de révision
 * avec des dates simulées.
 */

/**
 * Scénarios de test pour le système de révision
 * Ce fichier permet de tester les différentes situations de révision
 * avec des dates simulées.
 */
import type { MasteryLevel } from './types';
import { isReviewDue, isReviewOverdue, calculateReviewPriority, sortReviewsByPriority, updateMasteryWithSM2, initializeMastery } from './revision';

// ============================================================
// Helper pour créer un MasteryLevel avec des dates personnalisées
// ============================================================

function createMasteryWithDate(
  intervalDays: number = 1,
  easinessFactor: number = 2.5,
  repetitionCount: number = 0,
  correctCount: number = 0,
  totalAttempts: number = 0
): MasteryLevel {
  const now = new Date();
  const nextReview = new Date(now);
  nextReview.setDate(nextReview.getDate() + intervalDays);

  return {
    value: 0.5,
    state: 'review',
    lastReviewedAt: new Date(now.getTime() - intervalDays * 24 * 60 * 60 * 1000),
    nextReviewAt: nextReview,
    easinessFactor,
    intervalDays,
    repetitionCount,
    correctCount,
    incorrectCount: totalAttempts - correctCount,
    totalAttempts,
  };
}

// ============================================================
// Scénario 1: Concept en retard (overdue)
// ============================================================

function testOverdueScenario() {
  console.log('=== SCENARIO 1: Concept en retard (overdue) ===');
  
  // Concept avec date de révision il y a 3 jours
  const overdueMastery = createMasteryWithDate(-3, 2.0, 1, 1, 3);
  
  console.log(`Date de révision: ${overdueMastery.nextReviewAt}`);
  console.log(`Est en retard: ${isReviewOverdue(overdueMastery)}`);
  console.log(`Est dû: ${isReviewDue(overdueMastery)}`);
  console.log(`Priorité: ${calculateReviewPriority(overdueMastery)}`);
  console.log('');
}

// ============================================================
// Scénario 2: Concept à réviser aujourd'hui (due)
// ============================================================

function testDueTodayScenario() {
  console.log('=== SCENARIO 2: Concept à réviser aujourd\'hui (due) ===');
  
  // Concept avec date de révision aujourd\'hui
  const dueTodayMastery = createMasteryWithDate(0, 2.5, 2, 2, 4);
  
  console.log(`Date de révision: ${dueTodayMastery.nextReviewAt}`);
  console.log(`Est en retard: ${isReviewOverdue(dueTodayMastery)}`);
  console.log(`Est dû: ${isReviewDue(dueTodayMastery)}`);
  console.log(`Priorité: ${calculateReviewPriority(dueTodayMastery)}`);
  console.log('');
}

// ============================================================
// Scénario 3: Concept à venir (upcoming)
// ============================================================

function testUpcomingScenario() {
  console.log('=== SCENARIO 3: Concept à venir (upcoming) ===');
  
  // Concept avec date de révision dans 5 jours
  const upcomingMastery = createMasteryWithDate(5, 3.0, 3, 3, 5);
  
  console.log(`Date de révision: ${upcomingMastery.nextReviewAt}`);
  console.log(`Est en retard: ${isReviewOverdue(upcomingMastery)}`);
  console.log(`Est dû: ${isReviewDue(upcomingMastery)}`);
  console.log(`Priorité: ${calculateReviewPriority(upcomingMastery)}`);
  console.log('');
}

// ============================================================
// Scénario 4: Tri par priorité
// ============================================================

function testPrioritySorting() {
  console.log('=== SCENARIO 4: Tri par priorité ===');
  
  const masteries = [
    createMasteryWithDate(10, 3.0, 4, 4, 6), // Upcoming, facile
    createMasteryWithDate(-5, 1.5, 0, 0, 1), // Très en retard, difficile
    createMasteryWithDate(0, 2.5, 2, 2, 4),  // À réviser aujourd\'hui
    createMasteryWithDate(-1, 2.0, 1, 1, 2), // En retard d\'un jour
  ];
  
  console.log('Avant tri:');
  masteries.forEach((m, i) => {
    console.log(`  ${i + 1}. Priorité: ${calculateReviewPriority(m)}, Date: ${m.nextReviewAt!.toISOString().split('T')[0]}, État: ${isReviewOverdue(m) ? 'overdue' : isReviewDue(m) ? 'due' : 'upcoming'}`);
  });
  
  const sorted = sortReviewsByPriority(masteries);
  
  console.log('\nAprès tri (priorité décroissante):');
  sorted.forEach((m, i) => {
    console.log(`  ${i + 1}. Priorité: ${calculateReviewPriority(m)}, Date: ${m.nextReviewAt!.toISOString().split('T')[0]}, État: ${isReviewOverdue(m) ? 'overdue' : isReviewDue(m) ? 'due' : 'upcoming'}`);
  });
  console.log('');
}

// ============================================================
// Scénario 5: Mise à jour de la maîtrise après révision
// ============================================================

function testMasteryUpdate() {
  console.log('=== SCENARIO 5: Mise à jour de la maîtrise après révision ===');
  
  let mastery = initializeMastery();
  console.log(`Maîtrise initiale: ${mastery.value}, EF: ${mastery.easinessFactor}, Interval: ${mastery.intervalDays} jours`);
  
  // Réponse correcte (qualité 4)
  mastery = updateMasteryWithSM2(mastery, 4);
  console.log(`Après réponse correcte (qualité 4):`);
  console.log(`  Maîtrise: ${mastery.value}, EF: ${mastery.easinessFactor}, Interval: ${mastery.intervalDays} jours`);
  console.log(`  Prochaine révision: ${mastery.nextReviewAt!.toISOString().split('T')[0]}`);
  
  // Réponse incorrecte (qualité 1)
  mastery = updateMasteryWithSM2(mastery, 1);
  console.log(`\nAprès réponse incorrecte (qualité 1):`);
  console.log(`  Maîtrise: ${mastery.value}, EF: ${mastery.easinessFactor}, Interval: ${mastery.intervalDays} jours`);
  console.log(`  Prochaine révision: ${mastery.nextReviewAt!.toISOString().split('T')[0]}`);
  
  // Réponse correcte (qualité 5)
  mastery = updateMasteryWithSM2(mastery, 5);
  console.log(`\nAprès réponse correcte (qualité 5):`);
  console.log(`  Maîtrise: ${mastery.value}, EF: ${mastery.easinessFactor}, Interval: ${mastery.intervalDays} jours`);
  console.log(`  Prochaine révision: ${mastery.nextReviewAt!.toISOString().split('T')[0]}`);
  console.log('');
}

// ============================================================
// Exécution de tous les scénarios
// ============================================================

console.log('========================================');
console.log('TESTS DU SYSTÈME DE RÉVISION');
console.log('========================================\n');

testOverdueScenario();
testDueTodayScenario();
testUpcomingScenario();
testPrioritySorting();
testMasteryUpdate();

console.log('========================================');
console.log('TOUS LES SCÉNARIOS ONT ÉTÉ EXÉCUTÉS');
console.log('========================================');
