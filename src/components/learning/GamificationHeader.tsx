import { useLearningEngine } from '../../hooks/useLearningEngine';

/**
 * Composant d'en-tête de gamification
 * Affiche le niveau, les XP et la série quotidienne
 */
export function GamificationHeader() {
  const { getXP, getLevel, getStreak } = useLearningEngine();

  const xp = getXP();
  const level = getLevel();
  const streak = getStreak();

  return (
    <div className="gamification-header">
      <div className="gamification-header__level">
        <span className="gamification-header__level-icon">{"\u{1F3C6}"}</span>
        <div className="gamification-header__level-info">
          <span className="gamification-header__level-text">Niveau {level}</span>
        </div>
      </div>

      <div className="gamification-header__xp">
        <span className="gamification-header__xp-icon">{"\u2B50"}</span>
        <span className="gamification-header__xp-value">{xp}</span>
        <span className="gamification-header__xp-label">XP</span>
      </div>

      <div className="gamification-header__streak">
        <span className="gamification-header__streak-icon">{"\u{1F525}"}</span>
        <span className="gamification-header__streak-value">{streak}</span>
        <span className="gamification-header__streak-label">j</span>
      </div>
    </div>
  );
}
