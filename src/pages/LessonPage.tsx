import { useState, useEffect, useMemo, useCallback } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useLearningEngine } from '../hooks/useLearningEngine';
import { ExerciseCard } from '../exercises/components/ExerciseCard';
import type { ExerciseResult as ExerciseResultLot4 } from '../exercises/types';
import type { Exercise } from '../exercises/types';
import type { LessonStep } from '../core/learning/types';
import { Card, ProgressBar, Button, JapaneseText, Badge } from '../components/common';

// Types pour les contenus pédagogiques
type PedagogicalContent = {
  type: 'presentation' | 'explanation' | 'example' | 'synthesis';
  content: {
    title: string;
    body: string;
    japanese?: string;
    reading?: string;
    meaning?: string;
  };
};

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
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
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

  // Hooks de calcul mémorisés - toujours appelés dans le même ordre
  const lessonSteps = useMemo(() => {
    if (!lessonData?.lessonSteps) return [];
    return lessonData.lessonSteps;
  }, [lessonData]);

  const exercises: Exercise[] = useMemo(() => {
    if (!lessonData?.exercises) return [];
    return lessonData.exercises
      .map((exerciseId) => allExercises.find((e) => e.id === exerciseId))
      .filter((e): e is Exercise => e !== undefined);
  }, [lessonData, allExercises]);

  // Valeurs dérivées
  const currentStep = lessonSteps[currentStepIndex];
  const isLastStep = currentStepIndex >= lessonSteps.length - 1;
  const isExerciseStep = currentStep?.type === 'exercise';
  
  // Récupérer l'exercice pour cette étape si c'est une étape d'exercice
  const currentExercise = useMemo(() => {
    if (!currentStep?.exerciseId) return null;
    return allExercises.find(e => e.id === currentStep.exerciseId) || null;
  }, [currentStep?.exerciseId, allExercises]);

  // Handlers de callbacks - toujours appelés dans le même ordre
  const handleNext = useCallback(async () => {
    if (isExerciseStep && !exerciseComplete) {
      // Si c'est un exercice et qu'il n'est pas complété, on marque comme complété
      setExerciseComplete(true);
    } else if (isLastStep) {
      // Si c'est la dernière étape, on termine la leçon
      try {
        const completed = await completeLesson(id || '');
        if (completed) {
          navigate('/learning-path');
        } else {
          setProgressError('La progression n\'a pas pu être sauvegardée. Réessayez.');
        }
      } catch (err) {
        console.error('Erreur complétion leçon:', err);
        // Même en cas d'erreur, on permet à l'utilisateur de continuer
        navigate('/learning-path');
      }
    } else {
      // Sinon, on passe à l'étape suivante
      setCurrentStepIndex((prev) => prev + 1);
      setExerciseComplete(false);
      setExerciseResult(null);
    }
  }, [isExerciseStep, exerciseComplete, isLastStep, completeLesson, navigate, id]);

  const handleBack = useCallback(() => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
      setExerciseComplete(false);
      setExerciseResult(null);
    } else {
      navigate('/learning-path');
    }
  }, [currentStepIndex, navigate]);

  const handleExerciseResult = useCallback(async (result: ExerciseResultLot4) => {
    setExerciseResult(result);
    setExerciseComplete(true);
    setProgressError(null);
    try {
      await recordExerciseResult(id || '', result);
    } catch {
      setProgressError('La progression n\'a pas pu être sauvegardée. Réessayez.');
    }
  }, [recordExerciseResult, id]);

  // Fonction de progression
  const getProgress = () => {
    return lessonSteps.length > 0
      ? ((currentStepIndex + (exerciseComplete ? 1 : 0)) / lessonSteps.length) * 100
      : 0;
  };

  // Rendu du contenu pédagogique
  const renderPedagogicalContent = (step: LessonStep) => {
    const { title, body, japanese, reading, meaning } = step.content;
    
    switch (step.type) {
      case 'presentation':
        return (
          <div>
            <h2 className="section-title mb-md">{title}</h2>
            <p className="mb-md">{body}</p>
            {japanese && (
              <div className="bg-primary-light p-md rounded">
                <JapaneseText text={japanese} size="large" />
                {reading && <p className="text-secondary mt-sm">{reading}</p>}
              </div>
            )}
          </div>
        );
      case 'explanation':
        return (
          <div>
            <h2 className="section-title mb-md">{title}</h2>
            <p className="mb-md">{body}</p>
            {japanese && (
              <div className="bg-accent-light p-md rounded">
                <JapaneseText text={japanese} size="medium" />
                {reading && <p className="text-secondary mt-sm">Lecture : {reading}</p>}
                {meaning && <p className="text-secondary">Sens : {meaning}</p>}
              </div>
            )}
          </div>
        );
      case 'example':
        return (
          <div>
            <h2 className="section-title mb-md">Exemple</h2>
            <p className="mb-md">{body}</p>
            {japanese && (
              <div className="bg-success-light p-md rounded">
                <JapaneseText text={japanese} size="large" />
                {reading && <p className="text-secondary mt-sm">{reading}</p>}
                {meaning && <p className="text-secondary mt-sm">{meaning}</p>}
              </div>
            )}
          </div>
        );
      case 'check':
        return (
          <div>
            <h2 className="section-title mb-md">Vérification</h2>
            <p className="mb-md">{body}</p>
          </div>
        );
      case 'synthesis':
        return (
          <div>
            <h2 className="section-title mb-md">Synthèse</h2>
            <p className="mb-md">{body}</p>
            {japanese && (
              <div className="bg-info-light p-md rounded">
                <JapaneseText text={japanese} size="medium" />
                {reading && <p className="text-secondary mt-sm">{reading}</p>}
                {meaning && <p className="text-secondary">{meaning}</p>}
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
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
            Retour au parcours
          </Link>
          <Badge variant="primary">
            Étape {currentStepIndex + 1} / {lessonSteps.length}
          </Badge>
        </div>
        <ProgressBar progress={getProgress()} size="lg" />
      </div>

      {/* Titre de la leçon */}
      <div className="mb-lg">
        <JapaneseText text={lessonData.title} size="large" />
        <p className="text-secondary mt-sm">{lessonData.description}</p>
      </div>

      {/* Contenu pédagogique ou exercice */}
      <Card className="mb-lg">
        {currentStep ? (
          <div>
            {isExerciseStep && currentExercise ? (
              // Affichage de l'exercice
              <div>
                <h2 className="section-title mb-md">{currentStep.content.title}</h2>
                <ExerciseCard
                  exercise={currentExercise}
                  onResult={handleExerciseResult}
                />
                {exerciseResult && (
                  <div className={`mt-md ${exerciseResult.isCorrect ? 'text-success' : 'text-error'}`}>
                    <p style={{ fontWeight: 500 }}>
                      {exerciseResult.isCorrect ? 'Correct !' : 'Incorrect'}
                    </p>
                    <p className="text-secondary mt-sm">{currentExercise.explanation}</p>
                  </div>
                )}
              </div>
            ) : (
              // Affichage du contenu pédagogique
              <div>
                {renderPedagogicalContent(currentStep)}
              </div>
            )}
          </div>
        ) : (
          <div className="text-center">
            <p className="text-secondary">Aucune étape disponible</p>
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
          {currentStepIndex === 0 ? 'Quitter' : 'Précédent'}
        </Button>
        {currentStep && !exerciseComplete && !isExerciseStep && (
          <Button variant="primary" onClick={handleNext} className="flex-1">
            Suivant
          </Button>
        )}
        {currentStep && exerciseComplete && (
          <Button 
            variant="accent" 
            onClick={handleNext} 
            className="flex-1"
          >
            {isLastStep ? 'Terminer la leçon' : 'Étape suivante'}
          </Button>
        )}
      </div>
    </div>
  );
}
