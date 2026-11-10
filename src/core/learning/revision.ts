/**
 * Spaced Repetition System (SRS) - SM-2 Algorithm Implementation
 * Lot 8: Spaced Repetition System
 */

import { type MasteryLevel, type KnowledgeState, DEFAULT_CONFIG } from './types';

// ============================================================
// Quality rating for SM-2 algorithm
// ============================================================

/**
 * Quality of response (0-5 scale)
 * 0: Complete blackout, no response
 * 1: Incorrect response (wrong answer)
 * 2: Correct response with extreme difficulty/guess
 * 3: Correct response after hesitation
 * 4: Correct response with slight hesitation
 * 5: Perfect recall, no hesitation
 */
export type RecallQuality = 0 | 1 | 2 | 3 | 4 | 5;

/**
 * Map user response to quality rating
 * @param isCorrect Whether the answer was correct
 * @param difficulty Optional difficulty override (1-5, lower is easier)
 */
export function getRecallQuality(isCorrect: boolean, difficulty: number = 3): RecallQuality {
  if (!isCorrect) {
    // Incorrect answer: quality 1 (or 0 if very difficult)
    return difficulty >= 4 ? 0 : 1;
  }
  
  // Correct answer: quality based on difficulty
  // Lower difficulty = easier = higher quality
  if (difficulty <= 2) return 5; // Easy, perfect recall
  if (difficulty <= 3) return 4; // Medium, slight hesitation
  return 3; // Hard, significant hesitation
}

// ============================================================
// SM-2 Algorithm Core
// ============================================================

/**
 * Update mastery level based on SM-2 algorithm
 * @param currentMastery Current mastery level of the concept
 * @param quality Quality of the response (0-5)
 * @param config Engine configuration
 * @returns Updated mastery level
 */
export function updateMasteryWithSM2(
  currentMastery: MasteryLevel,
  quality: RecallQuality,
  config: typeof DEFAULT_CONFIG = DEFAULT_CONFIG
): MasteryLevel {
  const now = new Date();
  let newMastery = { ...currentMastery };
  
  // Update basic statistics
  newMastery.totalAttempts++;
  if (quality >= 3) {
    newMastery.correctCount++;
  } else {
    newMastery.incorrectCount++;
  }
  
  // Update easiness factor (EF)
  // EF = EF + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
  const efDelta = 0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02);
  newMastery.easinessFactor = Math.max(1.3, newMastery.easinessFactor + efDelta);
  
  // Update interval and repetition count based on quality
  if (quality >= 3) {
    // Successful recall
    if (newMastery.repetitionCount === 0) {
      newMastery.intervalDays = 1;
    } else if (newMastery.repetitionCount === 1) {
      newMastery.intervalDays = 6;
    } else {
      newMastery.intervalDays = Math.round(newMastery.intervalDays * newMastery.easinessFactor);
    }
    newMastery.repetitionCount++;
  } else {
    // Failed recall - reset repetition and set short interval
    newMastery.repetitionCount = 0;
    newMastery.intervalDays = 1; // Review again tomorrow
  }
  
  // Update timestamps
  newMastery.lastReviewedAt = now;
  newMastery.nextReviewAt = calculateNextReviewDate(now, newMastery.intervalDays);
  
  // Update global mastery value (weighted average of EF and success rate)
  const successRate = newMastery.totalAttempts > 0 
    ? newMastery.correctCount / newMastery.totalAttempts 
    : 0;
  newMastery.value = Math.min(1.0, (newMastery.easinessFactor / 3.0 * 0.6) + (successRate * 0.4));
  
  // Update state based on mastery
  newMastery.state = determineKnowledgeState(newMastery, config);
  
  return newMastery;
}

/**
 * Initialize mastery level for a new concept
 * @param config Engine configuration
 * @returns Initial mastery level
 */
export function initializeMastery(config: typeof DEFAULT_CONFIG = DEFAULT_CONFIG): MasteryLevel {
  const now = new Date();
  const nextReview = calculateNextReviewDate(now, 1); // First review in 1 day
  
  return {
    value: 0.0,
    state: 'introduced',
    lastReviewedAt: null,
    nextReviewAt: nextReview,
    easinessFactor: config.initialEasinessFactor,
    intervalDays: config.initialIntervalDays,
    repetitionCount: 0,
    correctCount: 0,
    incorrectCount: 0,
    totalAttempts: 0,
  };
}

// ============================================================
// State Determination
// ============================================================

/**
 * Determine knowledge state based on mastery metrics
 */
function determineKnowledgeState(
  mastery: MasteryLevel,
  config: typeof DEFAULT_CONFIG = DEFAULT_CONFIG
): KnowledgeState {
  // Already mastered
  if (mastery.value >= config.masteryThreshold && mastery.repetitionCount >= 5) {
    return 'mastered';
  }
  
  // Needs review (has been reviewed before and has upcoming review)
  if (mastery.totalAttempts > 0 && mastery.nextReviewAt) {
    return 'review';
  }
  
  // Learning phase (has been introduced but not yet reviewed)
  if (mastery.totalAttempts === 0 && mastery.state !== 'not_discovered') {
    return 'learning';
  }
  
  // Default to introduced if just introduced
  return 'introduced';
}

// ============================================================
// Date Calculation Helpers
// ============================================================

/**
 * Calculate the next review date based on interval
 * @param currentDate Current date
 * @param intervalDays Number of days until next review
 * @returns Next review date
 */
function calculateNextReviewDate(currentDate: Date, intervalDays: number): Date {
  const nextDate = new Date(currentDate);
  nextDate.setDate(nextDate.getDate() + intervalDays);
  return nextDate;
}

// ============================================================
// Review Selection & Prioritization
// ============================================================

/**
 * Check if a concept is due for review
 * @param mastery Current mastery level
 * @param currentDate Current date
 * @returns Whether the concept is due for review
 */
export function isReviewDue(mastery: MasteryLevel, currentDate: Date = new Date()): boolean {
  if (!mastery.nextReviewAt) return false;
  return currentDate >= mastery.nextReviewAt;
}

/**
 * Check if a concept is overdue for review
 * @param mastery Current mastery level
 * @param currentDate Current date
 * @returns Whether the concept is overdue
 */
export function isReviewOverdue(mastery: MasteryLevel, currentDate: Date = new Date()): boolean {
  if (!mastery.nextReviewAt) return false;
  return currentDate > mastery.nextReviewAt;
}

/**
 * Calculate priority score for review selection
 * Higher score = higher priority
 * @param mastery Current mastery level
 * @param currentDate Current date
 * @returns Priority score
 */
export function calculateReviewPriority(mastery: MasteryLevel, currentDate: Date = new Date()): number {
  let priority = 0;
  
  // Overdue reviews have highest priority
  if (isReviewOverdue(mastery, currentDate)) {
    const daysOverdue = Math.floor((currentDate.getTime() - mastery.nextReviewAt!.getTime()) / (1000 * 60 * 60 * 24));
    priority += 100 + (daysOverdue * 10);
  } else if (isReviewDue(mastery, currentDate)) {
    priority += 50;
  }
  
  // Lower easiness factor = higher priority (harder concepts)
  priority += (3.0 - mastery.easinessFactor) * 20;
  
  // Fewer repetitions = higher priority (newer concepts)
  priority += (5 - mastery.repetitionCount) * 5;
  
  return priority;
}

/**
 * Sort mastery levels by review priority (descending)
 */
export function sortReviewsByPriority(
  masteries: MasteryLevel[],
  currentDate: Date = new Date()
): MasteryLevel[] {
  return masteries.sort((a, b) => 
    calculateReviewPriority(b, currentDate) - calculateReviewPriority(a, currentDate)
  );
}
