import { useLearningEngine } from '../../hooks/useLearningEngine';
import { Card } from '../common';

/**
 * Composant de barre d'objectif quotidien
 * Affiche la progression des XP, leçons et révisions cibles
 */
export function DailyGoalBar() {
  const { getDailyGoal } = useLearningEngine();
  const dailyGoal = getDailyGoal();

  const xpProgress = dailyGoal.targetXP > 0
    ? Math.min(100, (dailyGoal.currentXP / dailyGoal.targetXP) * 100)
    : 0;

  const lessonsProgress = dailyGoal.targetLessons > 0
    ? Math.min(100, (dailyGoal.currentLessons / dailyGoal.targetLessons) * 100)
    : 0;

  const reviewsProgress = dailyGoal.targetReviews > 0
    ? Math.min(100, (dailyGoal.currentReviews / dailyGoal.targetReviews) * 100)
    : 0;

  return (
    <Card className="daily-goal-bar">
      <div className="daily-goal-bar__header">
        <h3 className="daily-goal-bar__title">Objectif du jour</h3>
        {dailyGoal.isCompleted && (
          <span className="daily-goal-bar__completed">{"\u2705"} Objectif atteint !</span>
        )}
      </div>

      <div className="daily-goal-bar__sections">
        <div className="daily-goal-bar__section">
          <div className="daily-goal-bar__section-header">
            <span className="daily-goal-bar__section-icon">{"\u2B50"}</span>
            <span className="daily-goal-bar__section-label">XP</span>
            <span className="daily-goal-bar__section-value">
              {dailyGoal.currentXP}/{dailyGoal.targetXP}
            </span>
          </div>
          <div className="progress-bar">
            <div
              className="progress-bar-fill"
              style={{ width: `${xpProgress}%`, backgroundColor: 'var(--color-accent)' }}
            />
          </div>
        </div>

        <div className="daily-goal-bar__section">
          <div className="daily-goal-bar__section-header">
            <span className="daily-goal-bar__section-icon">{"\u{1F4D6}"}</span>
            <span className="daily-goal-bar__section-label">Leçons</span>
            <span className="daily-goal-bar__section-value">
              {dailyGoal.currentLessons}/{dailyGoal.targetLessons}
            </span>
          </div>
          <div className="progress-bar">
            <div
              className="progress-bar-fill"
              style={{ width: `${lessonsProgress}%`, backgroundColor: 'var(--color-primary)' }}
            />
          </div>
        </div>

        <div className="daily-goal-bar__section">
          <div className="daily-goal-bar__section-header">
            <span className="daily-goal-bar__section-icon">{"\u{1F504}"}</span>
            <span className="daily-goal-bar__section-label">Révisions</span>
            <span className="daily-goal-bar__section-value">
              {dailyGoal.currentReviews}/{dailyGoal.targetReviews}
            </span>
          </div>
          <div className="progress-bar">
            <div
              className="progress-bar-fill"
              style={{ width: `${reviewsProgress}%`, backgroundColor: 'var(--color-warning)' }}
            />
          </div>
        </div>
      </div>
    </Card>
  );
}
