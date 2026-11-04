// Types communs pour le système d'exercices
// Lot 4 - Système d'exercices

/**
 * Types d'exercices supportés
 */
export type ExerciseType =
  | 'recognition-kana'
  | 'recognition-kanji'
  | 'recognition-vocab'
  | 'translation'
  | 'grammar-fill'
  | 'grammar-order'
  | 'grammar-conjugation'
  | 'listening'
  | 'writing'
  | 'reading-comprehension';

/**
 * Formats de réponse supportés
 */
export type AnswerFormat =
  | 'text'           // Réponse texte libre
  | 'choice'         // Choix unique (QCM)
  | 'multi-choice'   // Choix multiples
  | 'order'          // Remettre dans l'ordre
  | 'drop'           // Glisser-déposer
  | 'match'          // Associer des paires
  | 'dictation';     // Dictée (écoute + saisie)

/**
 * Interface commune pour tous les exercices
 */
export interface Exercise {
  /** Identifiant unique stable */
  id: string;
  
  /** Type d'exercice */
  type: ExerciseType;
  
  /** Format de réponse attendu */
  answerFormat: AnswerFormat;
  
  /** Objectif pédagogique */
  objective: string;
  
  /** Difficulté (1-5) */
  difficulty: number;
  
  /** Contenu affiché à l'utilisateur */
  prompt: string;
  
  /** Données spécifiques au type d'exercice */
  data: Record<string, unknown>;
  
  /** Réponse(s) attendue(s) */
  expectedAnswers: ExpectedAnswer[];
  
  /** Explication affichée après la réponse */
  explanation: string;
  
  /** Identifiant de la notion pédagogique liée */
  conceptId: string;
  
  /** Identifiants des prérequis (optionnel) */
  prerequisites?: string[];
}

/**
 * Réponse attendue avec ses règles de validation
 */
export interface ExpectedAnswer {
  /** Valeur attendue */
  value: string | string[];
  
  /** Mode de comparaison */
  comparison: 'exact' | 'case-insensitive' | 'whitespace-insensitive' | 'fuzzy';
  
  /** Score attribué si cette réponse est donnée (0-1) */
  score: number;
  
  /** Message personnalisé pour cette réponse (optionnel) */
  customFeedback?: string;
}

/**
 * Résultat d'un exercice après réponse
 */
export interface ExerciseResult {
  /** Identifiant de l'exercice */
  exerciseId: string;
  
  /** Réponse fournie par l'utilisateur */
  userAnswer: string | string[];
  
  /** Est-ce que la réponse est correcte ? */
  isCorrect: boolean;
  
  /** Score obtenu (0-1) */
  score: number;
  
  /** Nombre de tentatives utilisées */
  attempts: number;
  
  /** Temps passé en millisecondes */
  timeSpentMs: number;
  
  /** Timestamp de la réponse */
  timestamp: number;
  
  /** Explication affichée */
  explanation?: string;
  
  /** Feedback personnalisé (optionnel) */
  customFeedback?: string;
}

/**
 * État d'un exercice en cours
 */
export interface ExerciseState {
  /** Identifiant de l'exercice */
  exerciseId: string;
  
  /** Type d'exercice */
  type: ExerciseType;
  
  /** État actuel */
  status: 'pending' | 'in-progress' | 'completed' | 'abandoned';
  
  /** Tentatives actuelles */
  attempts: number;
  
  /** Tentatives maximales autorisées */
  maxAttempts: number;
  
  /** Réponse actuelle de l'utilisateur */
  currentAnswer?: string | string[];
  
  /** Dernière réponse soumise */
  lastSubmittedAnswer?: string | string[];
  
  /** Est-ce que la réponse a été validée ? */
  isAnswered: boolean;
  
  /** Est-ce que la réponse est correcte ? */
  isCorrect?: boolean;
  
  /** Score obtenu */
  score?: number;
  
  /** Temps écoulé en millisecondes */
  timeSpentMs: number;
  
  /** Timestamp de début */
  startedAt: number;
}

/**
 * Configuration d'un exercice
 */
export interface ExerciseConfig {
  /** Tentatives maximales par exercice */
  maxAttempts: number;
  
  /** Score minimum pour considérer l'exercice comme réussi (0-1) */
  passingScore: number;
  
  /** Afficher ou non l'explication après chaque réponse */
  showExplanationAfterEachAttempt: boolean;
  
  /** Afficher ou non le score après la réponse */
  showScoreAfterAnswer: boolean;
}

/**
 * Événement généré par un exercice
 */
export interface ExerciseEvent {
  type: 'exercise-started' | 'exercise-attempted' | 'exercise-correct' | 'exercise-incorrect' | 'exercise-abandoned' | 'exercise-completed';
  timestamp: number;
  data: Record<string, unknown>;
}
