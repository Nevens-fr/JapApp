import { useState, useEffect, useMemo, useCallback } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useLearningEngine } from '../hooks/useLearningEngine';
import { ExerciseCard } from '../exercises/components/ExerciseCard';
import type { ExerciseResult as ExerciseResultLot4 } from '../exercises/types';
import type { Exercise } from '../exercises/types';
import { Card, ProgressBar, Button, JapaneseText, Badge } from '../components/common';

export default function LessonPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const {
    getLesson,
    recordExerciseResult,
    completeLesson,
    startLesson,
    exercises: allExercises,
    loading,
  } = useLearningEngine();

  // Récupérer les données de la leçon
  const lessonData = getLesson(id || '');

  // Hooks d'état - toujours appelés dans le même ordre
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [exerciseComplete, setExerciseComplete] = useState(false);
  const [exerciseResult, setExerciseResult] = useState<ExerciseResultLot4 | null>(null);
  const [isStarted, setIsStarted] = useState(false);
  const [progressError, setProgressError] = useState<string | null>(null);

  // Effet pour démarrer la leçon
  useEffect(() => {
    if (id && !isStarted && !loading) {
      startLesson(id);
      setIsStarted(true);
    }
  }, [id, isStarted, loading, startLesson]);

  // Hooks de calcul mémorisé - toujours appelés dans le même ordre
  const exercises: Exercise[] = useMemo(() => {
    if (!lessonData?.exercises) return [];
    return lessonData.exercises
      .map((exerciseId) => allExercises.find((e) => e.id === exerciseId))
      .filter((e): e is Exercise => e !== undefined);
  }, [lessonData, allExercises]);

  // Valeurs dérivées
  const currentExercise = exercises[currentExerciseIndex];
  const isLastExercise = currentExerciseIndex >= exercises.length - 1;

  // Handlers de callbacks - toujours appelés dans le même ordre
  const handleNext = useCallback(async () => {
    if (currentExercise && !exerciseComplete) {
      setExerciseComplete(true);
    } else if (isLastExercise) {
      try {
        const completed = await completeLesson(id || '');
        if (completed) navigate('/learning-path');
      } catch {
        setProgressError('La progression n’a pas pu être sauvegardée. Réessayez.');
      }
    } else {
      setCurrentExerciseIndex((prev) => prev + 1);
      setExerciseComplete(false);
      setExerciseResult(null);
    }
  }, [currentExercise, exerciseComplete, isLastExercise, completeLesson, navigate, id]);

  const handleBack = useCallback(() => {
    if (currentExerciseIndex > 0) {
      setCurrentExerciseIndex((prev) => prev - 1);
      setExerciseComplete(false);
      setExerciseResult(null);
    } else {
      navigate('/learning-path');
    }
  }, [currentExerciseIndex, navigate]);

  const handleExerciseResult = useCallback(async (result: ExerciseResultLot4) => {
    setExerciseResult(result);
    setExerciseComplete(true);
    setProgressError(null);
    try {
      await recordExerciseResult(id || '', result);
    } catch {
      setProgressError('La progression n’a pas pu être sauvegardée. Réessayez.');
    }
  }, [recordExerciseResult, id]);

  // Fonction de progression
  const getProgress = () => {
    return exercises.length > 0
      ? ((currentExerciseIndex + (exerciseComplete ? 1 : 0)) / exercises.length) * 100
      : 0;
  };

  // RETURN CONDITIONNEL - avant le JSX mais après TOUS les hooks
  if (loading) {
    return (
      <div className="page">
        <Card>
          <p className="text-secondary">Chargement de la progression...</p>
        </Card>
      </div>
    );
  }

  if (!lessonData) {
    return (
      <div className="page">
        <Card>
          <div className="text-center">
            <div className="empty-state-icon">🚫</div>
            <h2 className="empty-state-title">Leçon non trouvée</h2>
            <Link to="/learning-path">
              <Button variant="primary">Retour au parcours</Button>
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  // JSX principal
  return (
    <div className="page">
      {/* Barre de progression */}
      <div className="mb-lg">
        <div className="flex justify-between items-center mb-sm">
          <Link to="/learning-path" className="text-secondary" style={{ textDecoration: 'none', fontSize: '14px' }}>
            ← Retour au parcours
          </Link>
          <Badge variant="primary">
            Exercice {currentExerciseIndex + 1} / {exercises.length}
          </Badge>
        </div>
        <ProgressBar progress={getProgress()} size="lg" />
      </div>

      {/* Titre de la leçon */}
      <div className="mb-lg">
        <JapaneseText text={lessonData.title} size="large" />
        <p className="text-secondary mt-sm">{lessonData.description}</p>
      </div>

      {/* Contenu de l'exercice */}
      <Card className="mb-lg">
        {currentExercise && (
          <div>
            <h2 className="section-title mb-md">{currentExercise.prompt}</h2>
            <ExerciseCard
              exercise={currentExercise}
              onResult={handleExerciseResult}
            />
            {exerciseResult && (
              <div className={`mt-md ${exerciseResult.isCorrect ? 'text-success' : 'text-error'}`}>
                <p style={{ fontWeight: 500 }}>
                  {exerciseResult.isCorrect ? '✓ Correct !' : '✗ Incorrect'}
                </p>
                <p className="text-secondary mt-sm">{currentExercise.explanation}</p>
              </div>
            )}
          </div>
        )}
      </Card>

      {/* Navigation */}
      {progressError && (
        <p className="text-error mb-sm" role="alert">{progressError}</p>
      )}
      <div className="flex gap-sm">
        <Button 
          variant="secondary" 
          onClick={handleBack} 
          className="flex-1"
        >
          {currentExerciseIndex === 0 ? 'Quitter' : 'Précédent'}
        </Button>
        {currentExercise && !exerciseComplete && (
          <Button variant="primary" onClick={handleNext} className="flex-1">
            Valider ma réponse
          </Button>
        )}
        {currentExercise && exerciseComplete && (
          <Button 
            variant="accent" 
            onClick={handleNext} 
            className="flex-1"
          >
            {isLastExercise ? 'Terminer la leçon' : 'Exercice suivant'}
          </Button>
        )}
      </div>
    </div>
  );
}
