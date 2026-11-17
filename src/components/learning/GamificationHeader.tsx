import { useLearningEngine } from '../../hooks/useLearningEngine';
import { getTitleForLevel } from '../../core/learning/scoring';
import { ProgressBar } from '../common';

/**
 * Composant d'en-tête de gamification
 * Affiche le titre, le niveau, les XP, la progression vers le prochain niveau et la série quotidienne
 */
export function GamificationHeader() {
  const { getXP, getLevel, getStreak, getProgressionToNextLevel } = useLearningEngine();

  const xp = getXP();
  const level = getLevel();
  const streak = getStreak();
  const progression = getProgressionToNextLevel();
  const title = getTitleForLevel(level);

  return (
    <div className="gamification-header">
      <div className="gamification-header__level">
        <span className="gamification-header__level-icon">{'⭐'}</span>
        <div className="gamification-header__level-info">
          <div className="gamification-header__level-title-row">
            {title && (
              <span className="gamification-header__title">
                {title.icon} {title.name}
              </span>
            )}
            <span className="gamification-header__level-text">Niveau {level}</span>
          </div>
          <span className="gamification-header__level-progress">
            {Math.round(progression)}% vers niveau {level + 1}
          </span>
          <div className="gamification-header__progress-bar">
            <ProgressBar progress={progression} size="sm" />
          </div>
        </div>
      </div>

      <div className="gamification-header__xp">
        <span className="gamification-header__xp-icon">{'⭐'}</span>
        <span className="gamification-header__xp-value">{xp}</span>
        <span className="gamification-header__xp-label">XP</span>
      </div>

      <div className="gamification-header__streak">
        <span className="gamification-header__streak-icon">{'⭐'}</span>
        <span className="gamification-header__streak-value">{streak}</span>
        <span className="gamification-header__streak-label">j</span>
      </div>
    </div>
  );
}
