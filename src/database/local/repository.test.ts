/**
 * Tests unitaires pour le repository local
 * Lot 6 : Stockage local et fonctionnement hors ligne
 *
 * Tests les opérations CRUD de base
 * Les tests Dexie nécessitent un environnement avec IndexedDB
 */

import { describe, it, expect, afterEach, vi } from 'vitest';
import { db, PROGRESSION_ID, STATISTICS_ID, PREFERENCES_ID } from './database';
import {
  serializeProgression,
  deserializeProgression,
  saveProgression,
  saveStatistics,
  savePreferences,
} from './repository';
import type { UserProgression } from '../../core/learning/progression';
import type { StoredProgression } from './database';

afterEach(() => {
  vi.restoreAllMocks();
});

describe('repository key-path writes', () => {
  it('stores the inline key in the record instead of passing an out-of-line key', async () => {
    const progressionPut = vi.spyOn(db.progression, 'put').mockResolvedValue(PROGRESSION_ID);
    const statisticsPut = vi.spyOn(db.statistics, 'put').mockResolvedValue(STATISTICS_ID);
    const preferencesPut = vi.spyOn(db.preferences, 'put').mockResolvedValue(PREFERENCES_ID);

    await saveProgression({ mastery: {}, lessons: {}, unlockedConcepts: [] });
    await saveStatistics({
      totalLessonsCompleted: 0,
      totalExercisesCompleted: 0,
      totalCorrectAnswers: 0,
      totalIncorrectAnswers: 0,
      xpTotal: 0,
      currentStreak: 0,
      lastActiveDate: null,
      sessionsThisWeek: 0,
    });
    await savePreferences({
      language: 'ja',
      dailyGoal: 5,
      notificationsEnabled: false,
      showRomaji: false,
    });

    expect(progressionPut).toHaveBeenCalledWith({
      id: PROGRESSION_ID,
      mastery: {},
      lessons: {},
      unlockedConcepts: [],
    });
    expect(statisticsPut).toHaveBeenCalledWith(expect.objectContaining({ id: STATISTICS_ID }));
    expect(preferencesPut).toHaveBeenCalledWith(expect.objectContaining({ id: PREFERENCES_ID }));
  });
});

// ============================================================
// Tests de sérialisation
// ============================================================

describe('serializeProgression', () => {
  it('doit sérialiser une progression vide', () => {
    const progression: UserProgression = {
      mastery: {},
      lessons: {},
      unlockedConcepts: [],
    };

    const stored = serializeProgression(progression);

    expect(stored.mastery).toEqual({});
    expect(stored.lessons).toEqual({});
    expect(stored.unlockedConcepts).toEqual([]);
  });

  it('doit sérialiser une progression avec des données', () => {
    const now = new Date('2026-01-15T10:00:00.000Z');
    const progression: UserProgression = {
      mastery: {
        'kana-hiragana-1': {
          value: 0.75,
          state: 'learning',
          lastReviewedAt: now,
          nextReviewAt: new Date('2026-01-18T10:00:00.000Z'),
          correctCount: 15,
          incorrectCount: 5,
          totalAttempts: 20,
        },
      },
      lessons: {
        'lesson-1': { completed: true, score: 85 },
      },
      unlockedConcepts: ['kana-hiragana-1', 'vocab-001'],
    };

    const stored = serializeProgression(progression);

    expect(stored.mastery['kana-hiragana-1'].value).toBe(0.75);
    expect(stored.mastery['kana-hiragana-1'].state).toBe('learning');
    expect(stored.mastery['kana-hiragana-1'].lastReviewedAt).toBe(now.toISOString());
    expect(stored.mastery['kana-hiragana-1'].correctCount).toBe(15);
    expect(stored.mastery['kana-hiragana-1'].incorrectCount).toBe(5);
    expect(stored.lessons['lesson-1'].completed).toBe(true);
    expect(stored.lessons['lesson-1'].score).toBe(85);
    expect(stored.unlockedConcepts).toContain('kana-hiragana-1');
  });

  it('doit convertir null en string null pour les dates', () => {
    const progression: UserProgression = {
      mastery: {
        'test-concept': {
          value: 0.0,
          state: 'not_discovered',
          lastReviewedAt: null,
          nextReviewAt: null,
          correctCount: 0,
          incorrectCount: 0,
          totalAttempts: 0,
        },
      },
      lessons: {},
      unlockedConcepts: [],
    };

    const stored = serializeProgression(progression);

    expect(stored.mastery['test-concept'].lastReviewedAt).toBeNull();
    expect(stored.mastery['test-concept'].nextReviewAt).toBeNull();
  });
});

describe('deserializeProgression', () => {
  it('doit désérialiser une progression vide', () => {
    const stored: StoredProgression = {
      mastery: {},
      lessons: {},
      unlockedConcepts: [],
    };

    const progression = deserializeProgression(stored);

    expect(progression.mastery).toEqual({});
    expect(progression.lessons).toEqual({});
    expect(progression.unlockedConcepts).toEqual([]);
  });

  it('doit désérialiser une progression avec des données', () => {
    const stored: StoredProgression = {
      mastery: {
        'kana-hiragana-1': {
          value: 0.75,
          state: 'learning',
          lastReviewedAt: '2026-01-15T10:00:00.000Z',
          nextReviewAt: '2026-01-18T10:00:00.000Z',
          correctCount: 15,
          incorrectCount: 5,
          totalAttempts: 20,
        },
      },
      lessons: {
        'lesson-1': { completed: true, score: 85 },
      },
      unlockedConcepts: ['kana-hiragana-1', 'vocab-001'],
    };

    const progression = deserializeProgression(stored);

    expect(progression.mastery['kana-hiragana-1'].value).toBe(0.75);
    expect(progression.mastery['kana-hiragana-1'].state).toBe('learning');
    expect(progression.mastery['kana-hiragana-1'].lastReviewedAt).toBeInstanceOf(Date);
    expect(progression.mastery['kana-hiragana-1'].lastReviewedAt?.toISOString()).toBe('2026-01-15T10:00:00.000Z');
    expect(progression.mastery['kana-hiragana-1'].correctCount).toBe(15);
    expect(progression.lessons['lesson-1'].completed).toBe(true);
    expect(progression.unlockedConcepts).toContain('kana-hiragana-1');
  });

  it('doit convertir null en null pour les dates', () => {
    const stored: StoredProgression = {
      mastery: {
        'test-concept': {
          value: 0.0,
          state: 'not_discovered',
          lastReviewedAt: null,
          nextReviewAt: null,
          correctCount: 0,
          incorrectCount: 0,
          totalAttempts: 0,
        },
      },
      lessons: {},
      unlockedConcepts: [],
    };

    const progression = deserializeProgression(stored);

    expect(progression.mastery['test-concept'].lastReviewedAt).toBeNull();
    expect(progression.mastery['test-concept'].nextReviewAt).toBeNull();
  });
});

describe('Round-trip sérialisation', () => {
  it('doit retrouver la même progression après sérialisation/désérialisation', () => {
    const now = new Date('2026-01-15T10:00:00.000Z');
    const original: UserProgression = {
      mastery: {
        'kana-hiragana-1': {
          value: 0.75,
          state: 'learning',
          lastReviewedAt: now,
          nextReviewAt: new Date('2026-01-18T10:00:00.000Z'),
          correctCount: 15,
          incorrectCount: 5,
          totalAttempts: 20,
        },
        'vocab-001': {
          value: 1.0,
          state: 'mastered',
          lastReviewedAt: now,
          nextReviewAt: new Date('2026-02-15T10:00:00.000Z'),
          correctCount: 20,
          incorrectCount: 0,
          totalAttempts: 20,
        },
      },
      lessons: {
        'lesson-1': { completed: true, score: 85 },
        'lesson-2': { completed: false, score: 0 },
      },
      unlockedConcepts: ['kana-hiragana-1', 'vocab-001'],
    };

    // Sérialiser
    const stored = serializeProgression(original);

    // Désérialiser
    const restored = deserializeProgression(stored);

    // Comparer
    expect(restored.mastery['kana-hiragana-1'].value).toBe(original.mastery['kana-hiragana-1'].value);
    expect(restored.mastery['kana-hiragana-1'].state).toBe(original.mastery['kana-hiragana-1'].state);
    expect(restored.mastery['kana-hiragana-1'].lastReviewedAt?.toISOString()).toBe(original.mastery['kana-hiragana-1'].lastReviewedAt?.toISOString());
    expect(restored.mastery['kana-hiragana-1'].correctCount).toBe(original.mastery['kana-hiragana-1'].correctCount);
    expect(restored.mastery['kana-hiragana-1'].incorrectCount).toBe(original.mastery['kana-hiragana-1'].incorrectCount);
    expect(restored.lessons['lesson-1'].completed).toBe(original.lessons['lesson-1'].completed);
    expect(restored.lessons['lesson-1'].score).toBe(original.lessons['lesson-1'].score);
    expect(restored.unlockedConcepts).toEqual(original.unlockedConcepts);
  });
});
