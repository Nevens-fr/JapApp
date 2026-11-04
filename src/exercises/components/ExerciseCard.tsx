// Composant principal d'exercice - Lot 4
// Affiche un exercice et gere les interactions utilisateur

import React, { useState, useEffect, useCallback } from 'react';
import type { Exercise, ExerciseState, ExerciseResult, ExerciseType } from '../types';
import { JapaneseText } from '../../components/common';

interface ExerciseCardProps {
  exercise: Exercise;
  onResult: (result: ExerciseResult) => void;
  onAbandon?: () => void;
}

/**
 * Composant principal d'exercice
 * Gere l'affichage, la saisie et la validation des reponses
 */
export const ExerciseCard: React.FC<ExerciseCardProps> = ({ exercise, onResult, onAbandon }) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [result, setResult] = useState<ExerciseResult | null>(null);
  const [attempts, setAttempts] = useState<number>(0);
  const [selectedChoice, setSelectedChoice] = useState<string>('');

  const choices = getChoices(exercise);

  useEffect(() => {
    setInputValue('');
    setIsAnswered(false);
    setResult(null);
    setAttempts(0);
    setSelectedChoice('');
  }, [exercise.id]);

  const handleSubmit = useCallback(() => {
    if (isAnswered || (!inputValue.trim() && !selectedChoice)) return;

    const userAnswer = selectedChoice || inputValue.trim();
    setIsAnswered(true);
    setAttempts(prev => prev + 1);

    const now = Date.now();
    const isCorrect = checkAnswer(exercise, userAnswer);
    const score = isCorrect ? 1 : 0;

    const exerciseResult: ExerciseResult = {
      exerciseId: exercise.id,
      userAnswer,
      isCorrect,
      score,
      attempts: attempts + 1,
      timeSpentMs: now - (exercise.data?.startedAt as number || now),
      timestamp: now,
      explanation: exercise.explanation,
    };

    setResult(exerciseResult);
    onResult(exerciseResult);
  }, [isAnswered, inputValue, selectedChoice, exercise, onResult, attempts]);

  const handleRetry = useCallback(() => {
    setInputValue('');
    setIsAnswered(false);
    setResult(null);
    setSelectedChoice('');
  }, []);

  const handleAbandon = useCallback(() => {
    onAbandon?.();
  }, [onAbandon]);

  const renderExerciseContent = () => {
    switch (exercise.type) {
      case 'recognition-kana':
      case 'recognition-kanji':
      case 'recognition-vocab':
        return renderRecognitionExercise();
      case 'translation':
        return renderTranslationExercise();
      case 'grammar-fill':
        return renderGrammarFillExercise();
      case 'listening':
        return renderListeningExercise();
      case 'writing':
        return renderWritingExercise();
      default:
        return <p>Type d'exercice non supporte : {exercise.type}</p>;
    }
  };

  const renderRecognitionExercise = () => {
    // Affiche le caractere japonais a reconnaitre
    const displayChar = exercise.data?.character || exercise.data?.kanji || exercise.data?.question || '';

    return (
      <div className="exercise-recognition">
        <JapaneseText text={displayChar} size="large" />
        {exercise.answerFormat === 'choice' && choices ? (
          <div className="exercise-choice">
            {choices.map((choice) => (
              <button
                key={choice}
                className={`choice-btn ${selectedChoice === choice ? 'selected' : ''}`}
                onClick={() => setSelectedChoice(choice)}
                disabled={isAnswered}
              >
                {choice}
              </button>
            ))}
          </div>
        ) : (
          <div className="exercise-text-input">
            <input
              type="text"
              value={inputValue}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
              placeholder={exercise.answerFormat === 'dictation' ? 'Ecoutez et tapez la reponse' : 'Votre reponse'}
              disabled={isAnswered}
              className="exercise-input"
            />
          </div>
        )}
      </div>
    );
  };

  const renderTranslationExercise = () => {
    return (
      <div className="exercise-translation">
        <p className="exercise-prompt">{exercise.prompt}</p>
        {exercise.answerFormat === 'choice' && choices ? (
          <div className="exercise-choice">
            {choices.map((choice) => (
              <button
                key={choice}
                className={`choice-btn ${selectedChoice === choice ? 'selected' : ''}`}
                onClick={() => setSelectedChoice(choice)}
                disabled={isAnswered}
              >
                {choice}
              </button>
            ))}
          </div>
        ) : (
          <input
            type="text"
            value={inputValue}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
            placeholder="Votre traduction"
            disabled={isAnswered}
            className="exercise-input"
          />
        )}
      </div>
    );
  };

  const renderGrammarFillExercise = () => {
    return (
      <div className="exercise-grammar-fill">
        <p className="exercise-prompt">{exercise.prompt}</p>
        <input
          type="text"
          value={inputValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
          placeholder="Completez la phrase"
          disabled={isAnswered}
          className="exercise-input"
        />
      </div>
    );
  };

  const renderListeningExercise = () => {
    return (
      <div className="exercise-listening">
        <button className="play-audio-btn" aria-label="Ecouter">??</button>
        {exercise.answerFormat === 'choice' && choices ? (
          <div className="exercise-choice">
            {choices.map((choice) => (
              <button
                key={choice}
                className={`choice-btn ${selectedChoice === choice ? 'selected' : ''}`}
                onClick={() => setSelectedChoice(choice)}
                disabled={isAnswered}
              >
                {choice}
              </button>
            ))}
          </div>
        ) : (
          <input
            type="text"
            value={inputValue}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
            placeholder="Ce que vous avez entendu"
            disabled={isAnswered}
            className="exercise-input"
          />
        )}
      </div>
    );
  };

  const renderWritingExercise = () => {
    return (
      <div className="exercise-writing">
        <p className="exercise-prompt">{exercise.prompt}</p>
        <textarea
          value={inputValue}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setInputValue(e.target.value)}
          placeholder="Ecrivez votre reponse en japonais"
          disabled={isAnswered}
          className="exercise-textarea"
          rows={3}
        />
      </div>
    );
  };

  const renderResult = () => {
    if (!result) return null;

    return (
      <div className={`exercise-result ${result.isCorrect ? 'correct' : 'incorrect'}`}>
        <p className="result-message">
          {result.isCorrect ? '✅ Correct !' : '❌ Incorrect'}
        </p>
        {result.customFeedback && <p className="result-feedback">{result.customFeedback}</p>}
        {result.explanation && <p className="result-explanation">{result.explanation}</p>}
        {!result.isCorrect && attempts < 3 && (
          <button onClick={handleRetry} className="retry-btn">
            Reessayer
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="exercise-card">
      <div className="exercise-header">
        <span className="exercise-difficulty">{'⭐'.repeat(exercise.difficulty)}</span>
      </div>

      {renderExerciseContent()}

      {!isAnswered && (
        <div className="exercise-actions">
          <button
            onClick={handleSubmit}
            disabled={!inputValue.trim() && !selectedChoice}
            className="submit-btn"
          >
            Valider
          </button>
          {onAbandon && (
            <button onClick={handleAbandon} className="abandon-btn">
              Abandonner
            </button>
          )}
        </div>
      )}

      {renderResult()}
    </div>
  );
};

/**
 * Verifie si une reponse est correcte (version simplifiee)
 * Le moteur d'evaluation complet est dans engine/index.ts
 */
function checkAnswer(exercise: Exercise, answer: string): boolean {
  return exercise.expectedAnswers.some(
    (expected) =>
      (Array.isArray(expected.value)
        ? expected.value.map((v: string) => v.toLowerCase().trim()).includes(answer.toLowerCase().trim())
        : expected.value.toLowerCase().trim() === answer.toLowerCase().trim())
  );
}

/**
 * Extrait les choix possibles pour un QCM
 */
function getChoices(exercise: Exercise): string[] | null {
  if (exercise.answerFormat !== 'choice') return null;
  const choices = (exercise.data?.options as string[]) || null;
  return choices;
}
