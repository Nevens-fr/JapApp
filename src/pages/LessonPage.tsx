// Page Leçon du Lot 5 - Interface pédagogique et parcours
// Connectée au moteur pédagogique via useLearningEngine
// Intègre ExerciseCard pour les exercices

import { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useLearningEngine } from '../hooks/useLearningEngine';
import { ExerciseCard } from '../exercises/components/ExerciseCard';
import type { ExerciseResult as ExerciseResultLot4 } from '../exercises/types';
import type { Exercise } from '../exercises/types';

export default function LessonPage() {
  const navigate = useNavigate();
  const { lessonId } = useParams<{ lessonId: string }>();

  const {
    getLesson,
    recordExerciseResult,
    completeLesson,
    startLesson,
    exercises: allExercises,
  } = useLearningEngine();

  // Récupérer les données de la leçon depuis le moteur
  const lessonData = getLesson(lessonId || '');

  // État local pour suivre la progression
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [exerciseComplete, setExerciseComplete] = useState(false);
  const [exerciseResult, setExerciseResult] = useState<ExerciseResultLot4 | null>(null);
  const [isStarted, setIsStarted] = useState(false);

  // Initialiser la leçon si elle n'est pas en cours
  useEffect(() => {
    if (lessonId && !isStarted) {
      startLesson(lessonId);
      setIsStarted(true);
    }
  }, [lessonId, isStarted, startLesson]);

  // Construire la liste des exercices à partir des données réelles du moteur
  const exercises: Exercise[] = useMemo(() => {
    if (!lessonData?.exercises) return [];
    return lessonData.exercises
      .map((exerciseId) => {
        return allExercises.find((e) => e.id === exerciseId);
      })
      .filter((e): e is Exercise => e !== undefined);
  }, [lessonData, allExercises]);

  // Si la leçon n'est pas chargée, afficher un message
  if (!lessonData) {
    return (
      <div className="page lesson-page">
        <h1>Leçon non trouvée</h1>
        <Link to="/path" className="btn btn-primary">Retour au parcours</Link>
      </div>
    );
  }

  const currentExercise = exercises[currentExerciseIndex];
  const isLastExercise = currentExerciseIndex === exercises.length - 1;

  const handleNext = () => {
    if (isExerciseStep() && !exerciseComplete) {
      setExerciseComplete(true);
    } else if (isLastExercise) {
      handleCompleteLesson();
    } else {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
      setExerciseComplete(false);
      setExerciseResult(null);
    }
  };

  const handleBack = () => {
    if (currentExerciseIndex > 0) {
      setCurrentExerciseIndex(currentExerciseIndex - 1);
      setExerciseComplete(false);
      setExerciseResult(null);
    } else {
      navigate('/path');
    }
  };

  const handleExerciseResult = (result: ExerciseResultLot4) => {
    recordExerciseResult(lessonData.id, result);
    setExerciseResult(result);
    setExerciseComplete(true);
  };

  const handleCompleteLesson = () => {
    completeLesson(lessonData.id);
    navigate('/path');
  };

  const isExerciseStep = () => {
    return currentExercise !== undefined;
  };

  const getProgress = () => {
    return exercises.length > 0
      ? ((currentExerciseIndex + (exerciseComplete ? 1 : 0)) / exercises.length) * 100
      : 0;
  };

  return (
    <div className="page lesson-page">
      {/* Barre de progression */}
      <div className="lesson-progress">
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${getProgress()}%` }}
          />
        </div>
        <p className="progress-text">
          Exercice {currentExerciseIndex + 1} / {exercises.length}
        </p>
      </div>

      {/* Titre de la leçon */}
      <div className="lesson-header">
        <Link to="/path" className="back-link">← Retour au parcours</Link>
        <h1>{lessonData.title}</h1>
        <p className="lesson-description">{lessonData.description}</p>
      </div>

      {/* Contenu de l'exercice */}
      <div className="step-content">
        {currentExercise && (
          <div className="exercise-container">
            <h2>{currentExercise.prompt}</h2>
            <ExerciseCard
              exercise={currentExercise}
              onResult={handleExerciseResult}
            />
            {exerciseResult && (
              <div className="exercise-result">
                <p className={exerciseResult.isCorrect ? 'success' : 'error'}>
                  {exerciseResult.isCorrect ? 'Correct !' : 'Incorrect'}
                </p>
                <p className="explanation">{currentExercise.explanation}</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="lesson-navigation">
        <button onClick={handleBack} className="btn btn-secondary">
          {currentExerciseIndex === 0 ? 'Quitter' : 'Précédent'}
        </button>
        {isExerciseStep() && !exerciseComplete && (
          <button onClick={handleNext} className="btn btn-primary">
            Valider ma réponse
          </button>
        )}
        {isExerciseStep() && exerciseComplete && (
          <button onClick={handleNext} className="btn btn-primary">
            {isLastExercise ? 'Terminer la leçon' : 'Exercice suivant'}
          </button>
        )}
      </div>
    </div>
  );
}
