import { useState, useEffect, useMemo } from 'react';
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
  } = useLearningEngine();

  const lessonData = getLesson(id || '');

  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [exerciseComplete, setExerciseComplete] = useState(false);
  const [exerciseResult, setExerciseResult] = useState<ExerciseResultLot4 | null>(null);
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    if (id && !isStarted) {
      startLesson(id);
      setIsStarted(true);
    }
  }, [id, isStarted, startLesson]);

  const exercises: Exercise[] = useMemo(() => {
    if (!lessonData?.exercises) return [];
    return lessonData.exercises
      .map((exerciseId) => allExercises.find((e) => e.id === exerciseId))
      .filter((e): e is Exercise => e !== undefined);
  }, [lessonData, allExercises]);

  if (!lessonData) {
    return (
      <div className="page">
        <Card>
          <div className="text-center">
            <div className="empty-state-icon">📭</div>
            <h2 className="empty-state-title">Leçon non trouvée</h2>
            <Link to="/learning-path">
              <Button variant="primary">Retour au parcours</Button>
            </Link>
          </div>
        </Card>
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
      navigate('/learning-path');
    }
  };

  const handleExerciseResult = (result: ExerciseResultLot4) => {
    recordExerciseResult(lessonData.id, result);
    setExerciseResult(result);
    setExerciseComplete(true);
  };

  const handleCompleteLesson = () => {
    completeLesson(lessonData.id);
    navigate('/learning-path');
  };

  const isExerciseStep = () => currentExercise !== undefined;

  const getProgress = () => {
    return exercises.length > 0
      ? ((currentExerciseIndex + (exerciseComplete ? 1 : 0)) / exercises.length) * 100
      : 0;
  };

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
                  {exerciseResult.isCorrect ? '✅ Correct !' : '❌ Incorrect'}
                </p>
                <p className="text-secondary mt-sm">{currentExercise.explanation}</p>
              </div>
            )}
          </div>
        )}
      </Card>

      {/* Navigation */}
      <div className="flex gap-sm">
        <Button 
          variant="secondary" 
          onClick={handleBack} 
          className="flex-1"
        >
          {currentExerciseIndex === 0 ? 'Quitter' : 'Précédent'}
        </Button>
        {isExerciseStep() && !exerciseComplete && (
          <Button variant="primary" onClick={handleNext} className="flex-1">
            Valider ma réponse
          </Button>
        )}
        {isExerciseStep() && exerciseComplete && (
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
