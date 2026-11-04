// Page R\u00e9visions du Lot 5 - Interface p\u00e9dagogique et parcours
// Connect\u00e9e au moteur p\u00e9dagogique via useLearningEngine

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLearningEngine } from '../hooks/useLearningEngine';

/**
 * Page R\u00e9visions du Lot 5 - Interface p\u00e9dagogique et parcours
 * 
 * Affiche les le\u00e7ons \u00e0 r\u00e9viser et permet de lancer une session adapt\u00e9e.
 */

interface ReviewItem {
  id: string;
  type: 'kana' | 'vocab' | 'kanji' | 'grammar';
  title: string;
  description: string;
  japanese?: string;
  reading?: string;
  meaning?: string;
  masteryLevel: number;
  status: 'due' | 'overdue' | 'upcoming';
}

export default function ReviewPage() {
  const { getReviewLessons, getLessonProgress } = useLearningEngine();

  // R\u00e9cup\u00e9rer les le\u00e7ons \u00e0 r\u00e9viser
  const reviewLessons = getReviewLessons();

  // Convertir les le\u00e7ons en ReviewItem pour l'affichage
  const pendingReviews: ReviewItem[] = reviewLessons.map((lesson) => {
    const progress = getLessonProgress(lesson.id);
    return {
      id: lesson.id,
      type: (lesson.conceptId.split('-')[0] || 'vocab') as 'kana' | 'vocab' | 'kanji' | 'grammar',
      title: lesson.title,
      description: lesson.description,
      masteryLevel: progress?.score || 0,
      status: progress?.status === 'completed' ? 'upcoming' : 'overdue',
    };
  });

  const [sessionActive, setSessionActive] = useState(false);
  const [sessionItems, setSessionItems] = useState<ReviewItem[]>([]);

  const overdueCount = pendingReviews.filter((r) => r.status === 'overdue').length;
  const upcomingCount = pendingReviews.filter((r) => r.status === 'upcoming').length;

  const startSession = () => {
    // Prendre uniquement les r\u00e9visions en retard, max 10
    const dueItems = pendingReviews
      .filter((r) => r.status === 'overdue')
      .slice(0, 10);
    setSessionItems(dueItems);
    setSessionActive(true);
  };

  const endSession = () => {
    setSessionActive(false);
    setSessionItems([]);
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'overdue':
        return 'En retard';
      case 'due':
        return 'à réviser';
      case 'upcoming':
        return 'Prochainement';
      default:
        return 'Inconnu';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'kana':
        return 'ཆ';
      case 'vocab':
        return 'Ὅa';
      case 'kanji':
        return '文';
      case 'grammar':
        return '✍';
      default:
        return '❓';
    }
  };

  const getMasteryColor = (level: number) => {
    if (level >= 0.8)
      return 'mastery-high';
    if (level >= 0.5)
      return 'mastery-medium';
    return 'mastery-low';
  };

  if (sessionActive) {
    return (
      <div className="page review-page">
        <div className="session-header">
          <h1>Session de révision</h1>
          <p>
            {sessionItems.length} notion{sessionItems.length > 1 ? 's' : ''} à réviser
          </p>
          <button onClick={endSession} className="btn btn-secondary">
            Terminer la session
          </button>
        </div>

        <div className="session-items">
          {sessionItems.map((item) => (
            <div key={item.id} className={`review-item ${item.type}`}>
              <div className="review-item-header">
                <span className="type-icon">{getTypeIcon(item.type)}</span>
                <span className={`status-badge ${item.status}`}>{getStatusLabel(item.status)}</span>
              </div>

              {item.japanese && <p className="japanese-text">{item.japanese}</p>}
              {item.reading && <p className="reading-text">{item.reading}</p>}
              {item.meaning && <p className="meaning-text">{item.meaning}</p>}

              <div className={`mastery-bar ${getMasteryColor(item.masteryLevel)}`}>
                <div
                  className="mastery-fill"
                  style={{ width: `${item.masteryLevel * 100}%` }}
                />
              </div>
              <p className="mastery-label">
                Ma\u00eetris\u00e9 : {Math.round(item.masteryLevel * 100)}%
              </p>

              <button className="btn btn-primary review-btn">
                R\u00e9viser {item.title}
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="page review-page">
      <h1>Révisions</h1>

      {/* R\u00e9sum\u00e9 des r\u00e9visions */}
      <section className="review-summary">
        <div className="summary-card overdue">
          <h2>En retard</h2>
          <p className="summary-count">{overdueCount}</p>
          <p className="summary-hint">à faire en priorité</p>
        </div>
        <div className="summary-card upcoming">
          <h2>Prochaines</h2>
          <p className="summary-count">{upcomingCount}</p>
          <p className="summary-hint">à venir</p>
        </div>
      </section>

      {/* Lancer une session */}
      {overdueCount > 0 && (
        <section className="start-session-section">
          <button onClick={startSession} className="btn btn-primary btn-large">
            Réviser maintenant ({overdueCount} notion{overdueCount > 1 ? 's' : ''})
          </button>
        </section>
      )}

      {/* Liste des r\u00e9visions */}
      <section className="reviews-list">
        <h2>Toutes les révisions</h2>

        {pendingReviews.length === 0 && (
          <p className="no-reviews">Aucune révision en attente. Bravo !</p>
        )}

        {pendingReviews.map((item) => (
          <div key={item.id} className={`review-item ${item.type}`}>
            <div className="review-item-header">
              <span className="type-icon">{getTypeIcon(item.type)}</span>
              <span className={`status-badge ${item.status}`}>{getStatusLabel(item.status)}</span>
            </div>

            {item.japanese && <p className="japanese-text">{item.japanese}</p>}
            {item.reading && <p className="reading-text">{item.reading}</p>}
            {item.meaning && <p className="meaning-text">{item.meaning}</p>}

            <div className={`mastery-bar ${getMasteryColor(item.masteryLevel)}`}>
              <div
                className="mastery-fill"
                style={{ width: `${item.masteryLevel * 100}%` }}
              />
            </div>
            <p className="mastery-label">
              Maîtrisé : {Math.round(item.masteryLevel * 100)}%
            </p>
          </div>
        ))}
      </section>
    </div>
  );
}
