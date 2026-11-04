// Page Parcours du Lot 5 - Interface pédagogique et parcours
// Connectée au moteur pédagogique via useLearningEngine

import { Link } from 'react-router-dom';
import { useLearningEngine } from '../hooks/useLearningEngine';

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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return '✅';
      case 'in_progress':
        return '🔄';
      case 'not_started':
        return '⏳';
      case 'not_discovered':
        return '🔒';
      default:
        return '❓';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Maîtrisé';
      case 'in_progress':
        return 'En cours';
      case 'not_started':
        return 'À faire';
      case 'not_discovered':
        return 'Verrouillé';
      default:
        return 'Inconnu';
    }
  };

  return (
    <div className="page">
      <h1>Parcours d'apprentissage</h1>

      {/* Progression générale */}
      <section className="progress-section">
        <h2>Progression</h2>
        <p className="progress-value">
          {lessons.filter((l) => l.status === 'completed').length} / {lessons.length} leçons complétées
        </p>
      </section>

      {/* Chapitres et leçons */}
      <section className="path-section">
        {chapters.map((chapter) => (
          <div key={chapter.id} className="chapter">
            <h2>{chapter.title}</h2>
            <p className="chapter-description">{chapter.description}</p>

            <div className="lessons-list">
              {chapter.lessons.map((lesson, index) => (
                <div key={lesson.id} className={`lesson-node ${lesson.status}`}>
                  <div className="lesson-status">
                    <span className="status-icon">{getStatusIcon(lesson.status)}</span>
                    <span className="status-label">{getStatusLabel(lesson.status)}</span>
                  </div>

                  {lesson.status !== 'not_discovered' && lesson.lesson && (
                    <Link to={`/lesson/${lesson.id}`} className="lesson-card">
                      <h3>{lesson.lesson.title}</h3>
                      <p>{lesson.lesson.description}</p>
                    </Link>
                  )}

                  {index < chapter.lessons.length - 1 && (
                    <div className="lesson-connector">
                      <span className="connector-icon">↓</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
