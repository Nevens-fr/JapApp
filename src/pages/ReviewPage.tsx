import { useState } from 'react';
import { useLearningEngine } from '../hooks/useLearningEngine';
import { Card, ProgressBar, Badge, SectionHeader, Button, EmptyState, JapaneseText } from '../components/common';

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

  const reviewLessons = getReviewLessons();

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

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'overdue':
        return { label: 'En retard', variant: 'error' as const };
      case 'due':
        return { label: 'À réviser', variant: 'warning' as const };
      case 'upcoming':
        return { label: 'Prochainement', variant: 'primary' as const };
      default:
        return { label: 'Inconnu', variant: 'primary' as const };
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'kana': return 'あ';
      case 'vocab': return '📖';
      case 'kanji': return '漢';
      case 'grammar': return '📝';
      default: return '📌';
    }
  };

  if (sessionActive) {
    return (
      <div className="page">
        <div className="mb-lg">
          <div className="flex justify-between items-center mb-sm">
            <SectionHeader title="Session de révision" />
            <Button variant="secondary" size="sm" onClick={endSession}>
              Terminer
            </Button>
          </div>
          <p className="text-secondary">
            {sessionItems.length} notion{sessionItems.length > 1 ? 's' : ''} à réviser
          </p>
        </div>

        <div className="flex-col gap-md">
          {sessionItems.map((item) => {
            const statusInfo = getStatusInfo(item.status);
            return (
              <Card key={item.id}>
                <div className="card-header">
                  <div className="flex items-center gap-sm">
                    <span style={{ fontSize: '24px' }}>{getTypeIcon(item.type)}</span>
                    <div>
                      <span style={{ fontWeight: 500 }}>{item.title}</span>
                      <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>
                    </div>
                  </div>
                </div>
                {item.japanese && (
                  <div className="mb-md">
                    <JapaneseText text={item.japanese} size="large" />
                  </div>
                )}
                {item.reading && (
                  <p className="text-secondary mb-sm">{item.reading}</p>
                )}
                {item.meaning && (
                  <p className="mb-md">{item.meaning}</p>
                )}
                <div className="mb-sm">
                  <ProgressBar 
                    progress={item.masteryLevel * 100} 
                    size="sm" 
                    color={
                      item.masteryLevel >= 0.8 ? 'var(--color-success)' :
                      item.masteryLevel >= 0.5 ? 'var(--color-warning)' :
                      'var(--color-error)'
                    }
                  />
                </div>
                <p className="text-secondary" style={{ fontSize: '14px' }}>
                  Maîtrisé : {Math.round(item.masteryLevel * 100)}%
                </p>
                <Button variant="primary" fullWidth className="mt-md">
                  Réviser {item.title}
                </Button>
              </Card>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <SectionHeader title="Révisions" />

      {/* Résumé des révisions */}
      <div className="flex gap-md mb-lg">
        <Card className="flex-1">
          <div className="text-center">
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>⚠️</div>
            <p className="text-secondary" style={{ fontSize: '14px' }}>En retard</p>
            <p style={{ fontSize: '28px', fontWeight: 600, color: 'var(--color-error)' }}>{overdueCount}</p>
          </div>
        </Card>
        <Card className="flex-1">
          <div className="text-center">
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>📅</div>
            <p className="text-secondary" style={{ fontSize: '14px' }}>Prochaines</p>
            <p style={{ fontSize: '28px', fontWeight: 600, color: 'var(--color-primary)' }}>{upcomingCount}</p>
          </div>
        </Card>
      </div>

      {/* Lancer une session */}
      {overdueCount > 0 && (
        <Card className="mb-lg">
          <SectionHeader 
            title="Prêt à réviser ?" 
            subtitle={`${overdueCount} notion${overdueCount > 1 ? 's' : ''} en attente`}
          />
          <Button variant="accent" fullWidth onClick={startSession}>
            Réviser maintenant ({overdueCount})
          </Button>
        </Card>
      )}

      {/* Liste des révisions */}
      <Card>
        <SectionHeader title="Toutes les révisions" />
        
        {pendingReviews.length === 0 ? (
          <EmptyState 
            icon="🎉" 
            title="Aucune révision en attente" 
            text="Bravo ! Tu es à jour."
          />
        ) : (
          <div className="flex-col gap-md">
            {pendingReviews.map((item) => {
              const statusInfo = getStatusInfo(item.status);
              return (
                <div key={item.id}>
                  <div className="flex justify-between items-center mb-sm">
                    <div className="flex items-center gap-sm">
                      <span style={{ fontSize: '20px' }}>{getTypeIcon(item.type)}</span>
                      <span style={{ fontWeight: 500 }}>{item.title}</span>
                    </div>
                    <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>
                  </div>
                  {item.japanese && (
                    <JapaneseText text={item.japanese} size="medium" />
                  )}
                  {item.reading && (
                    <p className="text-secondary" style={{ fontSize: '14px' }}>{item.reading}</p>
                  )}
                  {item.meaning && (
                    <p className="text-secondary" style={{ fontSize: '14px' }}>{item.meaning}</p>
                  )}
                  <div className="mt-sm">
                    <ProgressBar 
                      progress={item.masteryLevel * 100} 
                      size="sm" 
                      color={
                        item.masteryLevel >= 0.8 ? 'var(--color-success)' :
                        item.masteryLevel >= 0.5 ? 'var(--color-warning)' :
                        'var(--color-error)'
                      }
                    />
                  </div>
                  <p className="text-secondary" style={{ fontSize: '12px', marginTop: '4px' }}>
                    Maîtrisé : {Math.round(item.masteryLevel * 100)}%
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </Card>
    </div>
  );
}
