import { useLearningEngine } from '../../hooks/useLearningEngine';
import { Card } from '../common';

/**
 * Composant de résumé des statistiques utilisateur
 * Affiche les stats clés de manière concise
 */
export function StatsSummary() {
  const { getStatistics } = useLearningEngine();
  const stats = getStatistics();

  const statsItems = [
    { label: 'XP total', value: stats.totalXP, icon: '⭐', color: 'var(--color-accent)' },
    { label: 'Leçons', value: stats.totalLessonsCompleted, icon: '📖', color: 'var(--color-primary)' },
    { label: 'Précision', value: `${stats.accuracyRate}%`, icon: '🎯', color: 'var(--color-success)' },
    { label: 'Score moyen', value: `${stats.averageLessonScore}%`, icon: '📊', color: 'var(--color-warning)' },
  ];

  return (
    <Card className="stats-summary">
      <div className="stats-summary__grid">
        {statsItems.map((item) => (
          <div key={item.label} className="stats-summary__item">
            <span className="stats-summary__icon">{item.icon}</span>
            <div className="stats-summary__info">
              <span className="stats-summary__value" style={{ color: item.color }}>
                {item.value}
              </span>
              <span className="stats-summary__label">{item.label}</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
