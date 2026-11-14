import { useLearningEngine } from '../hooks/useLearningEngine';
import { Card, SectionHeader } from '../components/common';

interface StatisticsItem {
  label: string;
  value: string | number;
  icon: string;
  color: string;
}

export default function StatisticsPage() {
  const { getStatistics, getStreak, getXP, getLevel, getDailyGoal } = useLearningEngine();
  const stats = getStatistics();
  const streak = getStreak();
  const xp = getXP();
  const level = getLevel();
  const dailyGoal = getDailyGoal();

  const statItems: StatisticsItem[] = [
    { label: 'XP total', value: xp, icon: '⭐', color: 'var(--color-accent)' },
    { label: 'Niveau', value: level, icon: '🏆', color: 'var(--color-primary)' },
    { label: 'Leçons complétées', value: stats.totalLessonsCompleted, icon: '📖', color: 'var(--color-success)' },
    { label: 'Exercices réussis', value: stats.totalCorrectAnswers, icon: '✅', color: 'var(--color-success)' },
    { label: 'Précision', value: `${stats.accuracyRate}%`, icon: '🎯', color: 'var(--color-accent)' },
    { label: 'Score moyen', value: `${stats.averageLessonScore}%`, icon: '📊', color: 'var(--color-warning)' },
    { label: 'Série actuelle', value: `${streak} jours`, icon: '🔥', color: 'var(--color-warning)' },
    { label: 'Meilleure série', value: `${stats.totalLessonsCompleted > 0 ? streak : 0} jours`, icon: '🏅', color: 'var(--color-primary)' },
  ];

  const categoryData = [
    { name: 'Hiragana', percent: stats.conceptsMastered > 0 ? Math.min(100, (stats.conceptsMastered / Math.max(1, stats.totalExercisesAnswered)) * 100) : 0, color: 'var(--color-success)' },
    { name: 'Vocabulaire', percent: stats.conceptsInLearning > 0 ? Math.min(100, (stats.conceptsInLearning / Math.max(1, stats.totalExercisesAnswered)) * 100) : 0, color: 'var(--color-primary)' },
    { name: 'Kanji', percent: stats.conceptsInReview > 0 ? Math.min(100, (stats.conceptsInReview / Math.max(1, stats.totalExercisesAnswered)) * 100) : 0, color: 'var(--color-accent)' },
    { name: 'Grammaire', percent: stats.totalExercisesAnswered > 0 ? Math.min(100, (stats.totalCorrectAnswers / stats.totalExercisesAnswered) * 100) : 0, color: 'var(--color-warning)' },
  ];

  const weeklyData = [
    { day: 'Lun', score: 65 },
    { day: 'Mar', score: 80 },
    { day: 'Mer', score: 45 },
    { day: 'Jeu', score: 90 },
    { day: 'Ven', score: 70 },
    { day: 'Sam', score: 55 },
    { day: 'Dim', score: 85 },
  ];

  return (
    <div className="page">
      <SectionHeader title="Statistiques" />

      {/* Résumé rapide */}
      <div className="flex gap-md mb-lg">
        <Card className="flex-1">
          <div className="text-center">
            <div style={{ fontSize: '28px', marginBottom: '8px' }}>⭐</div>
            <p style={{ fontSize: '24px', fontWeight: 600, color: 'var(--color-accent)' }}>
              {xp}
            </p>
            <p className="text-secondary" style={{ fontSize: '12px' }}>XP total</p>
          </div>
        </Card>
        <Card className="flex-1">
          <div className="text-center">
            <div style={{ fontSize: '28px', marginBottom: '8px' }}>🏆</div>
            <p style={{ fontSize: '24px', fontWeight: 600, color: 'var(--color-primary)' }}>
              {level}
            </p>
            <p className="text-secondary" style={{ fontSize: '12px' }}>Niveau</p>
          </div>
        </Card>
        <Card className="flex-1">
          <div className="text-center">
            <div style={{ fontSize: '28px', marginBottom: '8px' }}>🔥</div>
            <p style={{ fontSize: '24px', fontWeight: 600, color: 'var(--color-warning)' }}>
              {streak}
            </p>
            <p className="text-secondary" style={{ fontSize: '12px' }}>Jours de série</p>
          </div>
        </Card>
      </div>

      {/* Détails des statistiques */}
      <Card className="mb-lg">
        <SectionHeader title="Détails" />
        <div className="stats-detail-grid">
          {statItems.slice(3).map((stat) => (
            <div key={stat.label} className="stats-detail-item">
              <span className="stats-detail-icon">{stat.icon}</span>
              <div className="stats-detail-info">
                <span className="stats-detail-value" style={{ color: stat.color }}>
                  {stat.value}
                </span>
                <span className="stats-detail-label">{stat.label}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Objectif quotidien */}
      <Card className="mb-lg">
        <SectionHeader 
          title="Objectif du jour" 
          action={
            dailyGoal.isCompleted 
              ? <span className="text-success">✅ Atteint</span> 
              : <span className="text-secondary">En cours</span>
          }
        />
        <div className="daily-goal-detail">
          <div className="flex justify-between mb-sm">
            <span>XP</span>
            <span>{dailyGoal.currentXP}/{dailyGoal.targetXP}</span>
          </div>
          <div className="progress-bar mb-md">
            <div
              className="progress-bar-fill"
              style={{
                width: `${dailyGoal.targetXP > 0 ? (dailyGoal.currentXP / dailyGoal.targetXP) * 100 : 0}%`,
                backgroundColor: 'var(--color-accent)',
              }}
            />
          </div>
          <div className="flex justify-between mb-sm">
            <span>Leçons</span>
            <span>{dailyGoal.currentLessons}/{dailyGoal.targetLessons}</span>
          </div>
          <div className="progress-bar mb-md">
            <div
              className="progress-bar-fill"
              style={{
                width: `${dailyGoal.targetLessons > 0 ? (dailyGoal.currentLessons / dailyGoal.targetLessons) * 100 : 0}%`,
                backgroundColor: 'var(--color-primary)',
              }}
            />
          </div>
          <div className="flex justify-between mb-sm">
            <span>Révisions</span>
            <span>{dailyGoal.currentReviews}/{dailyGoal.targetReviews}</span>
          </div>
          <div className="progress-bar">
            <div
              className="progress-bar-fill"
              style={{
                width: `${dailyGoal.targetReviews > 0 ? (dailyGoal.currentReviews / dailyGoal.targetReviews) * 100 : 0}%`,
                backgroundColor: 'var(--color-warning)',
              }}
            />
          </div>
        </div>
      </Card>

      {/* Performance hebdomadaire */}
      <Card className="mb-lg">
        <SectionHeader title="Performance hebdomadaire" />
        <div className="flex items-end gap-sm" style={{ height: '120px', padding: '16px 0' }}>
          {weeklyData.map((data) => (
            <div key={data.day} className="flex-col items-center flex-1">
              <div
                className="flex-1"
                style={{
                  backgroundColor: 'var(--color-primary)',
                  borderRadius: '4px',
                  height: `${data.score}%`,
                  minHeight: '8px',
                  transition: 'height 0.3s ease',
                }}
              />
              <span className="text-secondary" style={{ fontSize: '12px', marginTop: '8px' }}>
                {data.day}
              </span>
            </div>
          ))}
        </div>
      </Card>

      {/* Répartition par catégorie */}
      <Card>
        <SectionHeader title="Répartition par catégorie" />
        <div className="flex-col gap-md">
          {categoryData.map((cat) => (
            <div key={cat.name}>
              <div className="flex justify-between items-center mb-sm">
                <span style={{ fontWeight: 500 }}>{cat.name}</span>
                <span className="text-secondary">{cat.percent}%</span>
              </div>
              <div className="progress-bar">
                <div
                  className="progress-bar-fill"
                  style={{ width: `${cat.percent}%`, backgroundColor: cat.color }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
