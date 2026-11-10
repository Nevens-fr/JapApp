
import { Card, SectionHeader } from '../components/common';

interface StatisticsItem {
  label: string;
  value: string | number;
  icon: string;
  color: string;
}

export default function StatisticsPage() {
  const stats: StatisticsItem[] = [
    { label: 'Leçons complétées', value: 12, icon: '📚', color: 'var(--color-primary)' },
    { label: 'Exercices réussis', value: 48, icon: '✅', color: 'var(--color-success)' },
    { label: 'Score moyen', value: '78%', icon: '📊', color: 'var(--color-accent)' },
    { label: 'Jours de streak', value: 5, icon: '🔥', color: 'var(--color-warning)' },
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

      {/* Cartes de statistiques */}
      <div className="flex gap-md mb-lg">
        {stats.map((stat) => (
          <Card key={stat.label} className="flex-1">
            <div className="text-center">
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>{stat.icon}</div>
              <p style={{ fontSize: '24px', fontWeight: 600, color: stat.color }}>
                {stat.value}
              </p>
              <p className="text-secondary" style={{ fontSize: '12px' }}>{stat.label}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Graphique hebdomadaire */}
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
          {[
            { name: 'Hiragana', percent: 85, color: 'var(--color-success)' },
            { name: 'Vocabulaire', percent: 62, color: 'var(--color-primary)' },
            { name: 'Kanji', percent: 45, color: 'var(--color-accent)' },
            { name: 'Grammaire', percent: 70, color: 'var(--color-warning)' },
          ].map((cat) => (
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
