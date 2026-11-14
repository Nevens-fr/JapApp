import { useLearningEngine } from '../hooks/useLearningEngine';
import { Card, SectionHeader } from '../components/common';

interface StatisticsItem {
  label: string;
  value: string | number;
  icon: string;
  color: string;
}

export default function StatisticsPage() {
  const { getStatistics, getStreak, getXP, getLevel, getDailyGoal, getActivityHistory } = useLearningEngine();
  const stats = getStatistics();
  const streak = getStreak();
  const xp = getXP();
  const level = getLevel();
  const dailyGoal = getDailyGoal();

  const statItems: StatisticsItem[] = [
    { label: 'XP total', value: xp, icon: '\u2B50', color: 'var(--color-accent)' },
    { label: 'Niveau', value: level, icon: '\u{1F3C6}', color: 'var(--color-primary)' },
    { label: 'Le\u00e7ons compl\u00e9t\u00e9es', value: stats.totalLessonsCompleted, icon: '\u{1F4D6}', color: 'var(--color-success)' },
    { label: 'Exercices r\u00e9ussis', value: stats.totalCorrectAnswers, icon: '\u2705', color: 'var(--color-success)' },
    { label: 'Pr\u00e9cision', value: `${stats.accuracyRate}%`, icon: '\u{1F4CA}', color: 'var(--color-accent)' },
    { label: 'Score moyen', value: `${stats.averageLessonScore}%`, icon: '\u{1F4C8}', color: 'var(--color-warning)' },
    { label: 'S\u00e9rie actuelle', value: `${streak} jours`, icon: '\u{1F525}', color: 'var(--color-warning)' },
    { label: 'Meilleure s\u00e9rie', value: `${stats.totalLessonsCompleted > 0 ? streak : 0} jours`, icon: '\u{1F3C6}', color: 'var(--color-primary)' },
  ];

  const categoryData = [
    { name: 'Hiragana', percent: stats.conceptsMastered > 0 ? Math.min(100, (stats.conceptsMastered / Math.max(1, stats.totalExercisesAnswered)) * 100) : 0, color: 'var(--color-success)' },
    { name: 'Vocabulaire', percent: stats.conceptsInLearning > 0 ? Math.min(100, (stats.conceptsInLearning / Math.max(1, stats.totalExercisesAnswered)) * 100) : 0, color: 'var(--color-primary)' },
    { name: 'Kanji', percent: stats.conceptsInReview > 0 ? Math.min(100, (stats.conceptsInReview / Math.max(1, stats.totalExercisesAnswered)) * 100) : 0, color: 'var(--color-accent)' },
    { name: 'Grammaire', percent: stats.totalExercisesAnswered > 0 ? Math.min(100, (stats.totalCorrectAnswers / stats.totalExercisesAnswered) * 100) : 0, color: 'var(--color-warning)' },
  ];

  // Donn\u00e9es hebdomadaires r\u00e9elles depuis getActivityHistory()
  const activityHistory = getActivityHistory();

  const getWeeklyData = (): Array<{ day: string; score: number; isToday: boolean }> => {
    const days = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
    const today = new Date();
    const weeklyMap: Record<string, number> = {};

    // Remplir avec les donn\u00e9es r\u00e9elles
    activityHistory.forEach((activity) => {
      weeklyMap[activity.date] = activity.xpEarned;
    });

    // Retourner les 7 derniers jours (du plus ancien au plus r\u00e9cent)
    const result = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const dayName = days[d.getDay()];
      const isToday = i === 0;
      const xpEarned = weeklyMap[dateStr] || 0;
      result.push({ day: dayName, score: Math.min(100, xpEarned * 2), isToday });
    }
    return result;
  };

  const weeklyData = getWeeklyData();

  return (
    <div className="page">
      <SectionHeader title="Statistiques" />

      {/* R\u00e9sum\u00e9 rapide */}
      <div className="flex gap-md mb-lg">
        <Card className="flex-1">
          <div className="text-center">
            <div style={{ fontSize: '28px', marginBottom: '8px' }}>\u2B50</div>
            <p style={{ fontSize: '24px', fontWeight: 600, color: 'var(--color-accent)' }}>
              {xp}
            </p>
            <p className="text-secondary" style={{ fontSize: '12px' }}>XP total</p>
          </div>
        </Card>
        <Card className="flex-1">
          <div className="text-center">
            <div style={{ fontSize: '28px', marginBottom: '8px' }}>{'\u{1F3C6}'}</div>
            <p style={{ fontSize: '24px', fontWeight: 600, color: 'var(--color-primary)' }}>
              {level}
            </p>
            <p className="text-secondary" style={{ fontSize: '12px' }}>Niveau</p>
          </div>
        </Card>
        <Card className="flex-1">
          <div className="text-center">
            <div style={{ fontSize: '28px', marginBottom: '8px' }}>{'\u{1F525}'}</div>
            <p style={{ fontSize: '24px', fontWeight: 600, color: 'var(--color-warning)' }}>
              {streak}
            </p>
            <p className="text-secondary" style={{ fontSize: '12px' }}>Jours de s\u00e9rie</p>
          </div>
        </Card>
      </div>

      {/* D\u00e9tails des statistiques */}
      <Card className="mb-lg">
        <SectionHeader title="D\u00e9tails" />
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
              ? <span className="text-success">\u2705 Atteint</span>
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
            <span>Le\u00e7ons</span>
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
            <span>R\u00e9visions</span>
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
                  backgroundColor: data.isToday ? 'var(--color-accent)' : 'var(--color-primary)',
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

      {/* R\u00e9partition par cat\u00e9gorie */}
      <Card>
        <SectionHeader title="R\u00e9partition par cat\u00e9gorie" />
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
