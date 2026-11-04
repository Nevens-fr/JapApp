import { useState } from 'react';
import { Card, Badge, SectionHeader, JapaneseText, Button, EmptyState } from '../components/common';

interface DictionaryEntry {
  id: string;
  type: 'vocab' | 'kana' | 'kanji' | 'grammar';
  japanese: string;
  reading?: string;
  meaning: string;
  category?: string;
  level?: string;
  examples?: string[];
  notes?: string;
}

export default function DictionaryPage() {
  const allEntries: DictionaryEntry[] = [
    { id: 'vocab-001', type: 'vocab', japanese: '水', reading: 'mizu', meaning: 'eau', category: 'nourriture', level: 'N5' },
    { id: 'vocab-002', type: 'vocab', japanese: '酒', reading: 'sake', meaning: 'saké', category: 'boissons', level: 'N5' },
    { id: 'vocab-003', type: 'vocab', japanese: '犬', reading: 'inu', meaning: 'chien', category: 'animaux', level: 'N5' },
    { id: 'vocab-004', type: 'vocab', japanese: '猫', reading: 'neko', meaning: 'chat', category: 'animaux', level: 'N5' },
    { id: 'vocab-005', type: 'vocab', japanese: '太陽', reading: 'taiyou', meaning: 'soleil', category: 'nature', level: 'N5' },
    { id: 'kana-001', type: 'kana', japanese: 'あ', reading: 'a', meaning: 'voyelle a', category: 'hiragana', level: 'N5' },
    { id: 'kana-002', type: 'kana', japanese: 'い', reading: 'i', meaning: 'voyelle i', category: 'hiragana', level: 'N5' },
    { id: 'kana-003', type: 'kana', japanese: 'う', reading: 'u', meaning: 'voyelle u', category: 'hiragana', level: 'N5' },
    { id: 'kana-004', type: 'kana', japanese: 'え', reading: 'e', meaning: 'voyelle e', category: 'hiragana', level: 'N5' },
    { id: 'kana-005', type: 'kana', japanese: 'お', reading: 'o', meaning: 'voyelle o', category: 'hiragana', level: 'N5' },
    { id: 'kanji-001', type: 'kanji', japanese: '水', reading: 'みず / mizu', meaning: 'eau', level: 'N5' },
    { id: 'kanji-002', type: 'kanji', japanese: '犬', reading: 'いぬ / inu', meaning: 'chien', level: 'N5' },
    { id: 'kanji-003', type: 'kanji', japanese: '人', reading: 'ひと / hito', meaning: 'personne', level: 'N5' },
    { id: 'kanji-004', type: 'kanji', japanese: '山', reading: 'やま / yama', meaning: 'montagne', level: 'N5' },
    { id: 'kanji-005', type: 'kanji', japanese: '太陽', reading: 'たいよう / taiyou', meaning: 'soleil', level: 'N5' },
    { id: 'grammar-001', type: 'grammar', japanese: 'は', reading: 'wa', meaning: 'particule thème', category: 'particules', level: 'N5', notes: 'Marque le thème de la phrase' },
    { id: 'grammar-002', type: 'grammar', japanese: 'を', reading: 'o', meaning: 'particule objet', category: 'particules', level: 'N5', notes: 'Marque l\'objet direct du verbe' },
    { id: 'grammar-003', type: 'grammar', japanese: 'です', reading: 'desu', meaning: 'être (poli)', category: 'verbes', level: 'N5', notes: 'Utilisé pour être poli' },
  ];

  const [activeTab, setActiveTab] = useState<DictionaryEntry['type']>('vocab');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEntry, setSelectedEntry] = useState<DictionaryEntry | null>(null);

  const filteredEntries = allEntries
    .filter((entry) => entry.type === activeTab)
    .filter((entry) => {
      if (!searchQuery) return true;
      const query = searchQuery.toLowerCase();
      return (
        entry.japanese.toLowerCase().includes(query) ||
        entry.reading?.toLowerCase().includes(query) ||
        entry.meaning.toLowerCase().includes(query)
      );
    });

  const tabs: { key: DictionaryEntry['type']; label: string; icon: string }[] = [
    { key: 'vocab', label: 'Vocabulaire', icon: '📖' },
    { key: 'kana', label: 'Kana', icon: 'あ' },
    { key: 'kanji', label: 'Kanji', icon: '漢' },
    { key: 'grammar', label: 'Grammaire', icon: '📝' },
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'vocab': return '📖';
      case 'kana': return 'あ';
      case 'kanji': return '漢';
      case 'grammar': return '📝';
      default: return '📌';
    }
  };

  const getLevelVariant = (level?: string) => {
    switch (level) {
      case 'N5': return 'success' as const;
      case 'N4': return 'primary' as const;
      default: return 'primary' as const;
    }
  };

  return (
    <div className="page">
      <SectionHeader title="Dictionnaire" />

      {/* Onglets */}
      <div className="mb-md">
        <div className="flex gap-sm" style={{ overflowX: 'auto', paddingBottom: '8px' }}>
          {tabs.map((tab) => (
            <button
              key={tab.key}
              className={`btn ${activeTab === tab.key ? 'btn-primary' : 'btn-secondary'} btn-sm`}
              onClick={() => {
                setActiveTab(tab.key);
                setSelectedEntry(null);
              }}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Barre de recherche */}
      <div className="mb-lg">
        <input
          type="text"
          placeholder={`Rechercher dans ${tabs.find((t) => t.key === activeTab)?.label}...`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: '100%',
            padding: '12px 16px',
            border: '2px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
            fontSize: '16px',
            fontFamily: 'var(--font-family)',
            outline: 'none',
            boxSizing: 'border-box',
          }}
        />
      </div>

      {/* Détail d'une entrée */}
      {selectedEntry && (
        <Card className="mb-lg">
          <div className="mb-md">
            <Button variant="secondary" size="sm" onClick={() => setSelectedEntry(null)}>
              ← Retour
            </Button>
          </div>
          <div className="flex items-center gap-sm mb-md">
            <Badge variant={getLevelVariant(selectedEntry.level)}>{selectedEntry.level}</Badge>
            <Badge variant="primary">{getTypeIcon(selectedEntry.type)} {tabs.find((t) => t.key === selectedEntry.type)?.label}</Badge>
          </div>
          <JapaneseText text={selectedEntry.japanese} size="large" />
          {selectedEntry.reading && (
            <p className="text-secondary mt-sm">{selectedEntry.reading}</p>
          )}
          <p style={{ fontSize: '18px', fontWeight: 500, marginTop: '8px' }}>{selectedEntry.meaning}</p>
          {selectedEntry.category && (
            <p className="text-secondary mt-sm" style={{ fontSize: '14px' }}>Catégorie : {selectedEntry.category}</p>
          )}
          {selectedEntry.notes && (
            <div className="mt-md" style={{ padding: '12px', backgroundColor: 'var(--color-primary-light)', borderRadius: 'var(--radius-md)' }}>
              <p style={{ fontWeight: 500, marginBottom: '4px' }}>💡 Note</p>
              <p style={{ fontSize: '14px' }}>{selectedEntry.notes}</p>
            </div>
          )}
        </Card>
      )}

      {/* Liste des entrées */}
      {!selectedEntry && (
        <div className="flex-col gap-sm">
          {filteredEntries.length === 0 ? (
            <EmptyState 
              icon="🔍" 
              title="Aucun résultat" 
              text={`Aucun résultat pour "${searchQuery}"`}
            />
          ) : (
            filteredEntries.map((entry) => (
              <Card 
                key={entry.id} 
                className="mb-sm"
                onClick={() => setSelectedEntry(entry)}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-sm">
                    <span style={{ fontSize: '24px' }}>{getTypeIcon(entry.type)}</span>
                    <div>
                      <JapaneseText text={entry.japanese} size="medium" />
                      {entry.reading && (
                        <p className="text-secondary" style={{ fontSize: '14px' }}>{entry.reading}</p>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p style={{ fontWeight: 500 }}>{entry.meaning}</p>
                    {entry.level && (
                      <Badge variant={getLevelVariant(entry.level)}>{entry.level}</Badge>
                    )}
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      )}
    </div>
  );
}
