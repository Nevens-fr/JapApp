import { Link } from 'react-router-dom';
import { useLearningEngine } from '../hooks/useLearningEngine';
import { Card, ProgressBar, Badge, SectionHeader, Button } from '../components/common';

export default function LearningPathPage() {
  const { getAllLessons, getLessonProgress } = useLearningEngine();

  const allLessons = getAllLessons();
  const lessons = allLessons.map((lesson) => {
    const progress = getLessonProgress(lesson.id);
    return {
      id: lesson.id,
      lesson,
      status: progress?.status || 'not_discovered',
    };
  });

  const chapters = [
    {
      id: 'chapter-001',
      title: 'Hiragana',
      description: "Les bases de l'écriture japonaise",
      lessons: lessons.filter((l) => l.lesson && l.lesson.title.includes('Hiragana')),
    },
    {
      id: 'chapter-002',
      title: 'Vocabulaire de base',
      description: "Les premiers mots japonais",
      lessons: lessons.filter((l) => l.lesson && l.lesson.title.includes('Vocabulaire')),
    },
    {
      id: 'chapter-003',
      title: 'Kanji de base',
      description: "Les kanji les plus importants",
      lessons: lessons.filter((l) => l.lesson && l.lesson.title.includes('Kanji')),
    },
    {
      id: 'chapter-004',
      title: 'Grammaire fondamentale',
      description: "Les structures grammaticales essentielles",
      lessons: lessons.filter((l) => l.lesson && l.lesson.title.includes('Grammaire')),
    },
  ];

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'completed':
        return { icon: '✅', label: 'Maîtrisé', variant: 'success' as const };
      case 'in_progress':
        return { icon: '🔄', label: 'En cours', variant: 'primary' as const };
      case 'not_started':
        return { icon: '⏳', label: 'À faire', variant: 'warning' as const };
      case 'not_discovered':
        return { icon: '🔒', label: 'Verrouillé', variant: 'error' as const };
      default:
        return { icon: '❓', label: 'Inconnu', variant: 'primary' as const };
    }
  };

  const completedCount = lessons.filter((l) => l.status === 'completed').length;

  return (
    <div className="page">
      <SectionHeader title="Parcours d'apprentissage" />

      {/* Progression globale */}
      <Card className="mb-lg">
        <div className="card-header">
          <h3 className="card-title">Progression</h3>
          <Badge variant="primary">{completedCount} / {lessons.length}</Badge>
        </div>
        <ProgressBar progress={lessons.length > 0 ? (completedCount / lessons.length) * 100 : 0} size="lg" />
        <p className="text-secondary mt-sm" style={{ fontSize: '14px' }}>
          {completedCount} leçon{completedCount > 1 ? 's' : ''} complétée{completedCount > 1 ? 's' : ''}
        </p>
      </Card>

      {/* Chapitres et leçons */}
      {chapters.map((chapter) => {
        const chapterCompleted = chapter.lessons.filter((l) => l.status === 'completed').length;
        const chapterTotal = chapter.lessons.length;

        return (
          <Card key={chapter.id} className="mb-lg">
            <SectionHeader title={chapter.title} subtitle={chapter.description} />
            
            {chapter.lessons.length > 0 && (
              <div className="mb-md">
                <ProgressBar 
                  progress={chapterTotal > 0 ? (chapterCompleted / chapterTotal) * 100 : 0} 
                  size="sm" 
                />
              </div>
            )}

            <div className="lessons-list">
              {chapter.lessons.map((lesson) => {
                const statusInfo = getStatusInfo(lesson.status);
                
                return (
                  <div key={lesson.id} className={`lesson-node lesson-${lesson.status} mb-sm`}>
                    <div className="flex items-center gap-sm">
                      <span style={{ fontSize: '20px' }}>{statusInfo.icon}</span>
                      <div className="flex-col">
                        <span style={{ fontWeight: 500, color: 'var(--color-text-primary)' }}>
                          {lesson.lesson?.title}
                        </span>
                        <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>
                      </div>
                    </div>

                    {lesson.status !== 'not_discovered' && lesson.lesson && (
                      <Link to={`/lesson/${lesson.id}`}>
                        <Button variant="secondary" size="sm" fullWidth className="mt-sm">
                          {lesson.status === 'completed' ? 'Revoir' : 'Commencer'}
                        </Button>
                      </Link>
                    )}
                  </div>
                );
              })}
            </div>
          </Card>
        );
      })}
    </div>
  );
}
