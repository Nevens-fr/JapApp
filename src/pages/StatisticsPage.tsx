import { useLearningEngine } from '../hooks/useLearningEngine';
import { Card, SectionHeader } from '../components/common';

interface StatisticsItem {
  label: string;
  value: string | number;
  icon: string;
  color: string;
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  condition: (stats: any, streak: number, xp: number, level: number) => boolean;
  unlocked: boolean;
  category: 'streak' | 'progression' | 'perfection';
}

function useAchievements(): Achievement[] {
  const { getStatistics, getStreak, getXP, getLevel } = useLearningEngine();
  const stats = getStatistics();
  const streak = getStreak();
  const xp = getXP();
  const level = getLevel();

  const achievements: Achievement[] = [
    // SÉRIE
    {
      id: 'streak-7',
      name: 'Débutant motivé',
      description: '7 jours consécutifs',
      icon: '🔥',
      condition: (_s, st) => st >= 7,
      unlocked: false,
      category: 'streak',
    },
    {
      id: 'streak-30',
      name: 'Habitué',
      description: '30 jours consécutifs',
      icon: '🔥',
      condition: (_s, st) => st >= 30,
      unlocked: false,
      category: 'streak',
    },
    {
      id: 'streak-100',
      name: 'Déterminé',
      description: '100 jours consécutifs',
      icon: '🔥',
      condition: (_s, st) => st >= 100,
      unlocked: false,
      category: 'streak',
    },
    {
      id: 'streak-365',
      name: 'Inarrêtable',
      description: '365 jours consécutifs',
      icon: '🔥',
      condition: (_s, st) => st >= 365,
      unlocked: false,
      category: 'streak',
    },
    // PROGRESSION
    {
      id: 'progress-50',
      name: 'Premier pas',
      description: '50 exercices réussis',
      icon: '⭐',
      condition: (s) => s.totalCorrectAnswers >= 50,
      unlocked: false,
      category: 'progression',
    },
    {
      id: 'progress-200',
      name: 'En route',
      description: '200 exercices réussis',
      icon: '⭐',
      condition: (s) => s.totalCorrectAnswers >= 200,
      unlocked: false,
      category: 'progression',
    },
    {
      id: 'progress-500',
      name: 'Assidu',
      description: '500 exercices réussis',
      icon: '⭐',
      condition: (s) => s.totalCorrectAnswers >= 500,
      unlocked: false,
      category: 'progression',
    },
    {
      id: 'progress-1000',
      name: 'Expert',
      description: '1000 exercices réussis',
      icon: '⭐',
      condition: (s) => s.totalCorrectAnswers >= 1000,
      unlocked: false,
      category: 'progression',
    },
    {
      id: 'level-5',
      name: 'Apprenti confirmé',
      description: 'Atteindre le niveau 5',
      icon: '🎓',
      condition: (_s, _st, _xp, lv) => lv >= 5,
      unlocked: false,
      category: 'progression',
    },
    {
      id: 'level-10',
      name: 'Étudiant avancé',
      description: 'Atteindre le niveau 10',
      icon: '🎓',
      condition: (_s, _st, _xp, lv) => lv >= 10,
      unlocked: false,
      category: 'progression',
    },
    {
      id: 'level-15',
      name: 'Maître',
      description: 'Atteindre le niveau 15',
      icon: '🎓',
      condition: (_s, _st, _xp, lv) => lv >= 15,
      unlocked: false,
      category: 'progression',
    },
    // PERFECTION
    {
      id: 'perfect-10',
      name: 'Précision débutante',
      description: '10 exercices sans erreur',
      icon: '💯',
      condition: (s, _st, _xp, _lv) => {
        const total = s.totalExercisesAnswered;
        const correct = s.totalCorrectAnswers;
        return total > 0 && total === correct && total >= 10;
      },
      unlocked: false,
      category: 'perfection',
    },
    {
      id: 'perfect-50',
      name: 'Précision confirmée',
      description: '50 exercices sans erreur',
      icon: '💯',
      condition: (s, _st, _xp, _lv) => {
        const total = s.totalExercisesAnswered;
        const correct = s.totalCorrectAnswers;
        return total > 0 && total === correct && total >= 50;
      },
      unlocked: false,
      category: 'perfection',
    },
    {
      id: 'perfect-100',
      name: 'Perfectionniste',
      description: '100 exercices sans erreur',
      icon: '💯',
      condition: (s, _st, _xp, _lv) => {
        const total = s.totalExercisesAnswered;
        const correct = s.totalCorrectAnswers;
        return total > 0 && total === correct && total >= 100;
      },
      unlocked: false,
      category: 'perfection',
    },
    {
      id: 'perfect-500',
      name: 'Infaillible',
      description: '500 exercices sans erreur',
      icon: '💯',
      condition: (s, _st, _xp, _lv) => {
        const total = s.totalExercisesAnswered;
        const correct = s.totalCorrectAnswers;
        return total > 0 && total === correct && total >= 500;
      },
      unlocked: false,
      category: 'perfection',
    },
  ];

  return achievements.map(achievement => ({
    ...achievement,
    unlocked: achievement.condition(stats, streak, xp, level),
  }));
}

export default function StatisticsPage() {
  const { getStatistics, getStreak, getXP, getLevel, getDailyGoal } = useLearningEngine();
  const stats = getStatistics();
  const streak = getStreak();
  const xp = getXP();
  const level = getLevel();
  const dailyGoal = getDailyGoal();
  const achievements = useAchievements();

  const statItems: StatisticsItem[] = [
    { label: 'XP total', value: xp, icon: '⚡', color: 'var(--color-accent)' },
    { label: 'Niveau', value: level, icon: '🎯', color: 'var(--color-primary)' },
    { label: 'Leçons complétées', value: stats.totalLessonsCompleted, icon: '📚', color: 'var(--color-success)' },
    { label: 'Exercices réussis', value: stats.totalCorrectAnswers, icon: '✅', color: 'var(--color-success)' },
    { label: 'Précision', value: `${stats.accuracyRate}%`, icon: '🎯', color: 'var(--color-accent)' },
    { label: 'Score moyen', value: `${stats.averageLessonScore}%`, icon: '📊', color: 'var(--color-warning)' },
    { label: 'Série actuelle', value: `${streak} jours`, icon: '🔥', color: 'var(--color-warning)' },
    { label: 'Meilleure série', value: `${streak} jours`, icon: '🏆', color: 'var(--color-primary)' },
  ];

  const categoryData = [
    { name: 'Hiragana', percent: stats.conceptsMastered > 0 ? Math.min(100, (stats.conceptsMastered / Math.max(1, stats.totalExercisesAnswered)) * 100) : 0, color: 'var(--color-success)' },
    { name: 'Vocabulaire', percent: stats.conceptsInLearning > 0 ? Math.min(100, (stats.conceptsInLearning / Math.max(1, stats.totalExercisesAnswered)) * 100) : 0, color: 'var(--color-primary)' },
    { name: 'Kanji', percent: stats.conceptsInReview > 0 ? Math.min(100, (stats.conceptsInReview / Math.max(1, stats.totalExercisesAnswered)) * 100) : 0, color: 'var(--color-accent)' },
    { name: 'Grammaire', percent: stats.totalExercisesAnswered > 0 ? Math.min(100, (stats.totalCorrectAnswers / stats.totalExercisesAnswered) * 100) : 0, color: 'var(--color-warning)' },
  ];
  const streakAchievements = achievements.filter(a => a.category === 'streak');
  const progressionAchievements = achievements.filter(a => a.category === 'progression');
  const perfectionAchievements = achievements.filter(a => a.category === 'perfection');

  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const totalCount = achievements.length;

  const renderAchievementCard = (achievement: Achievement) => (
    <div
      key={achievement.id}
      className={`achievement-card ${achievement.unlocked ? 'unlocked' : 'locked'}`}
    >
      <div className='achievement-card__icon'>
        {achievement.unlocked ? achievement.icon : '🔒'}
      </div>
      <div className='achievement-card__info'>
        <span className='achievement-card__name'>{achievement.name}</span>
        <span className='achievement-card__description'>{achievement.description}</span>
      </div>
      <div className='achievement-card__badge'>
        {achievement.unlocked ? '🏆' : '🔒'}
      </div>
    </div>
  );

  return (
    <div className='page'>
      <SectionHeader title='Statistiques' />

      <div className='flex gap-md mb-lg'>
        <Card className='flex-1'>
          <div className='text-center'>
            <div style={{ fontSize: '28px', marginBottom: '8px' }}>⚡</div>
            <p style={{ fontSize: '24px', fontWeight: 600, color: 'var(--color-accent)' }}>
              {xp}
            </p>
            <p className='text-secondary' style={{ fontSize: '12px' }}>XP total</p>
          </div>
        </Card>
        <Card className='flex-1'>
          <div className='text-center'>
            <div style={{ fontSize: '28px', marginBottom: '8px' }}>🎯</div>
            <p style={{ fontSize: '24px', fontWeight: 600, color: 'var(--color-primary)' }}>
              {level}
            </p>
            <p className='text-secondary' style={{ fontSize: '12px' }}>Niveau</p>
          </div>
        </Card>
        <Card className='flex-1'>
          <div className='text-center'>
            <div style={{ fontSize: '28px', marginBottom: '8px' }}>🔥</div>
            <p style={{ fontSize: '24px', fontWeight: 600, color: 'var(--color-warning)' }}>
              {streak}
            </p>
            <p className='text-secondary' style={{ fontSize: '12px' }}>Jours de série</p>
          </div>
        </Card>
      </div>

      <Card className='mb-lg'>
        <SectionHeader
          title='Succès'
          subtitle={`${unlockedCount}/${totalCount} débloqués`}
          action={
            <span className='text-accent'>
              {Math.round((unlockedCount / totalCount) * 100)}%
            </span>
          }
        />

        <div className='mb-md'>
          <h4 className='text-secondary mb-sm' style={{ fontSize: '14px', fontWeight: 600 }}>
            🔥 Série quotidienne
          </h4>
          <div className='achievements-grid'>
            {streakAchievements.map(renderAchievementCard)}
          </div>
        </div>

        <div className='mb-md'>
          <h4 className='text-secondary mb-sm' style={{ fontSize: '14px', fontWeight: 600 }}>
            ⭐ Progression
          </h4>
          <div className='achievements-grid'>
            {progressionAchievements.map(renderAchievementCard)}
          </div>
        </div>

        <div>
          <h4 className='text-secondary mb-sm' style={{ fontSize: '14px', fontWeight: 600 }}>
            💯 Perfection
          </h4>
          <div className='achievements-grid'>
            {perfectionAchievements.map(renderAchievementCard)}
          </div>
        </div>
      </Card>

      <Card className='mb-lg'>
        <SectionHeader title='Détails' />
        <div className='stats-detail-grid'>
          {statItems.slice(3).map((stat) => (
            <div key={stat.label} className='stats-detail-item'>
              <span className='stats-detail-icon'>{stat.icon}</span>
              <div className='stats-detail-info'>
                <span className='stats-detail-value' style={{ color: stat.color }}>
                  {stat.value}
                </span>
                <span className='stats-detail-label'>{stat.label}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className='mb-lg'>
        <SectionHeader
          title='Objectif du jour'
          action={
            dailyGoal.isCompleted
              ? <span className='text-success'>✅ Atteint</span>
              : <span className='text-secondary'>En cours</span>
          }
        />
        <div className='daily-goal-detail'>
          <div className='flex justify-between mb-sm'>
            <span>XP</span>
            <span>{dailyGoal.currentXP}/{dailyGoal.targetXP}</span>
          </div>
          <div className='progress-bar mb-md'>
            <div
              className='progress-bar-fill'
              style={{
                width: `${dailyGoal.targetXP > 0 ? (dailyGoal.currentXP / dailyGoal.targetXP) * 100 : 0}%`,
                backgroundColor: 'var(--color-accent)',
              }}
            />
          </div>
          <div className='flex justify-between mb-sm'>
            <span>Leçons</span>
            <span>{dailyGoal.currentLessons}/{dailyGoal.targetLessons}</span>
          </div>
          <div className='progress-bar mb-md'>
            <div
              className='progress-bar-fill'
              style={{
                width: `${dailyGoal.targetLessons > 0 ? (dailyGoal.currentLessons / dailyGoal.targetLessons) * 100 : 0}%`,
                backgroundColor: 'var(--color-primary)',
              }}
            />
          </div>
          <div className='flex justify-between mb-sm'>
            <span>Révisions</span>
            <span>{dailyGoal.currentReviews}/{dailyGoal.targetReviews}</span>
          </div>
          <div className='progress-bar'>
            <div
              className='progress-bar-fill'
              style={{
                width: `${dailyGoal.targetReviews > 0 ? (dailyGoal.currentReviews / dailyGoal.targetReviews) * 100 : 0}%`,
                backgroundColor: 'var(--color-warning)',
              }}
            />
          </div>
        </div>
      </Card>



      <Card>
        <SectionHeader title='Répartition par catégorie' />
        <div className='flex-col gap-md'>
          {categoryData.map((cat) => (
            <div key={cat.name}>
              <div className='flex justify-between items-center mb-sm'>
                <span style={{ fontWeight: 500 }}>{cat.name}</span>
                <span className='text-secondary'>{cat.percent}%</span>
              </div>
              <div className='progress-bar'>
                <div
                  className='progress-bar-fill'
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
