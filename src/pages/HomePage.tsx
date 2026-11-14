import { Link } from 'react-router-dom';
import { useLearningEngine } from '../hooks/useLearningEngine';
import { Card, ProgressBar, Badge, SectionHeader, JapaneseText, Button } from '../components/common';
import { GamificationHeader, DailyGoalBar } from '../components/learning';

export default function HomePage() {
  const { 
    getNextLessons, 
    getReviewLessons, 
    getTotalScore,
  } = useLearningEngine();

  const nextLessons = getNextLessons();
  const nextLesson = nextLessons[0];
  const reviewLessons = getReviewLessons();
  const pendingReviews = reviewLessons.length;
  const totalScore = getTotalScore();
      
  return (
    <div className="page">
      {/* En-tête de gamification */}
      <GamificationHeader />

      {/* Message d'accueil */}
      <div className="mb-lg">
        <h1 className="section-title" style={{ fontSize: '24px' }}>Bienvenue ! {"\u{1F44B}"}</h1>
        <p className="text-secondary">Prêt pour apprendre le japonais aujourd'hui ?</p>
      </div>

      {/* Carte progression globale */}
      <Card className="mb-lg">
        <div className="card-header">
          <h3 className="card-title">Progression globale</h3>
          <Badge variant="primary">{totalScore}%</Badge>
        </div>
        <div className="mb-md">
          <ProgressBar progress={totalScore} size="lg" />
        </div>
        <p className="text-secondary" style={{ fontSize: '14px' }}>
          {totalScore} % du parcours complété
        </p>
      </Card>

      {/* Prochaine leçon */}
      {nextLesson && (
        <Card className="mb-lg">
          <SectionHeader 
            title="Prochaine leçon" 
            action={<Badge variant="accent">À faire</Badge>}
          />
          <div className="mb-md">
            <JapaneseText text={nextLesson.title} size="large" />
            <p className="text-secondary mt-sm">{nextLesson.description}</p>
          </div>
          <Link to={`/lesson/${nextLesson.id}`}>
            <Button variant="accent" fullWidth>Continuer</Button>
          </Link>
        </Card>
      )}

      {/* Révisions en attente */}
      {pendingReviews > 0 && (
        <Card className="mb-lg">
          <SectionHeader 
            title="Révisions" 
            subtitle={`${pendingReviews} notion${pendingReviews > 1 ? 's' : ''} à réviser`}
          />
          <Link to="/reviews">
            <Button variant="secondary" fullWidth>Réviser maintenant</Button>
          </Link>
        </Card>
      )}

      {/* Objectif quotidien */}
      <DailyGoalBar />

      {/* Accès rapide au parcours */}
      <div className="text-center mt-lg">
        <Link to="/learning-path">
          <Button variant="primary" size="lg">Voir le parcours complet</Button>
        </Link>
      </div>
    </div>
  );
}
