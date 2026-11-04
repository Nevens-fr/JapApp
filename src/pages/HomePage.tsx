// Page d'accueil du Lot 5 - Interface pédagogique et parcours
// Connectée au moteur pédagogique via useLearningEngine

import { Link } from 'react-router-dom';
import { useLearningEngine } from '../hooks/useLearningEngine';

/**
 * Page d'accueil du Lot 5 - Interface pédagogique et parcours
 * 
 * Affiche :
 * - La progression globale (score)
 * - La prochaine leçon recommandée
 * - Les révisions à effectuer
 * - Un accès au parcours
 */
export default function HomePage() {
  const { 
    getAllLessons, 
    getNextLessons, 
    getReviewLessons, 
    getTotalScore 
  } = useLearningEngine();

  // Récupérer les prochaines leçons
  const nextLessons = getNextLessons();
  const nextLesson = nextLessons[0];

  // Récupérer les leçons à réviser
  const reviewLessons = getReviewLessons();
  const pendingReviews = reviewLessons.length;

  // Récupérer le score global
  const totalScore = getTotalScore();

  return (
    <div className="page">
      <h1>Accueil</h1>
      
      {/* Progression globale */}
      <section className="progress-section">
        <h2>Progression globale</h2>
        <p className="progress-value">{totalScore}% complété</p>
        {nextLesson && (
          <Link to={`/lesson/${nextLesson.id}`} className="btn btn-primary">
            Continuer le parcours
          </Link>
        )}
      </section>

      {/* Prochaine leçon recommandée */}
      <section className="next-lesson-section">
        <h2>Prochaine leçon</h2>
        {nextLesson ? (
          <Link to={`/lesson/${nextLesson.id}`} className="lesson-card">
            <h3>{nextLesson.title}</h3>
            <p>{nextLesson.description}</p>
          </Link>
        ) : (
          <p>Aucune leçon disponible pour le moment</p>
        )}
      </section>

      {/* Révisions en attente */}
      {pendingReviews > 0 && (
        <section className="reviews-section">
          <h2>Révisions en attente</h2>
          <p>{pendingReviews} notion{pendingReviews > 1 ? 's' : ''} à réviser</p>
          <Link to="/reviews" className="btn btn-secondary">
            Réviser maintenant
          </Link>
        </section>
      )}

      {/* Accès rapide au parcours */}
      <section className="path-section">
        <Link to="/learning-path" className="btn btn-primary">
          Voir le parcours complet
        </Link>
      </section>
    </div>
  );
}
