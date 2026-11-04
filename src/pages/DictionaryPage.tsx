// Page Dictionnaire du Lot 5 - Interface pédagogique et parcours
// Connectée aux données de démonstration via sampleData

import { useState } from 'react';
import { SAMPLE_CONCEPTS, SAMPLE_EXERCISES } from '../data/sampleData';

/**
 * Page Dictionnaire du Lot 5 - Interface pédagogique et parcours
 * 
 * Permet de consulter :
 * - Le vocabulaire
 * - Les kana
 * - Les kanji
 * - Les notions grammaticales
 */

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
  // Données de démonstration pour le dictionnaire
  const allEntries: DictionaryEntry[] = [
    // Vocabulaire
    { id: 'vocab-001', type: 'vocab', japanese: '水', reading: 'mizu', meaning: 'eau', category: 'nourriture', level: 'N5' },
    { id: 'vocab-002', type: 'vocab', japanese: '酒', reading: 'sake', meaning: 'saké', category: 'boissons', level: 'N5' },
    { id: 'vocab-003', type: 'vocab', japanese: '犬', reading: 'inu', meaning: 'chien', category: 'animaux', level: 'N5' },
    { id: 'vocab-004', type: 'vocab', japanese: '猫', reading: 'neko', meaning: 'chat', category: 'animaux', level: 'N5' },
    { id: 'vocab-005', type: 'vocab', japanese: '太陽', reading: 'taiyou', meaning: 'soleil', category: 'nature', level: 'N5' },
    // Kana
    { id: 'kana-001', type: 'kana', japanese: 'あ', reading: 'a', meaning: 'voyelle a', category: 'hiragana', level: 'N5' },
    { id: 'kana-002', type: 'kana', japanese: 'い', reading: 'i', meaning: 'voyelle i', category: 'hiragana', level: 'N5' },
    { id: 'kana-003', type: 'kana', japanese: 'う', reading: 'u', meaning: 'voyelle u', category: 'hiragana', level: 'N5' },
    { id: 'kana-004', type: 'kana', japanese: 'え', reading: 'e', meaning: 'voyelle e', category: 'hiragana', level: 'N5' },
    { id: 'kana-005', type: 'kana', japanese: 'お', reading: 'o', meaning: 'voyelle o', category: 'hiragana', level: 'N5' },
    // Kanji
    { id: 'kanji-001', type: 'kanji', japanese: '水', reading: '水の / mizu', meaning: 'eau', level: 'N5' },
    { id: 'kanji-002', type: 'kanji', japanese: '犬', reading: '犬の / inu', meaning: 'chien', level: 'N5' },
    { id: 'kanji-003', type: 'kanji', japanese: '人', reading: '人の / hito', meaning: 'personne', level: 'N5' },
    { id: 'kanji-004', type: 'kanji', japanese: '山', reading: '山の / yama', meaning: 'montagne', level: 'N5' },
    { id: 'kanji-005', type: 'kanji', japanese: '太陽', reading: '太陽の / taiyou', meaning: 'soleil', level: 'N5' },
    // Grammaire
    { id: 'grammar-001', type: 'grammar', japanese: 'は', reading: 'wa', meaning: 'particule thème', category: 'particules', level: 'N5', notes: 'Marque le thème de la phrase' },
    { id: 'grammar-002', type: 'grammar', japanese: 'を', reading: 'o', meaning: 'particule objet', category: 'particules', level: 'N5', notes: 'Marque l\'objet direct du verbe' },
    { id: 'grammar-003', type: 'grammar', japanese: 'です', reading: 'desu', meaning: 'Être (poli)', category: 'verbes', level: 'N5', notes: 'Utilisé pour être poli' },
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
    { key: 'vocab', label: 'Vocabulaire', icon: '📚' },
    { key: 'kana', label: 'Kana', icon: 'あ' },
    { key: 'kanji', label: 'Kanji', icon: '文' },
    { key: 'grammar', label: 'Grammaire', icon: '✍' },
  ];

  const getLevelColor = (level?: string) => {
    if (level === 'N5') return 'level-n5';
    if (level === 'N4') return 'level-n4';
    return '';
  };

  return (
    <div className="page dictionary-page">
      <h1>Dictionnaire</h1>

      {/* Onglets de catégories */}
      <div className="dictionary-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={`dictionary-tab ${activeTab === tab.key ? 'active' : ''}`}
            onClick={() => {
              setActiveTab(tab.key);
              setSelectedEntry(null);
            }}
          >
            <span className="tab-icon">{tab.icon}</span>
            <span className="tab-label">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Barre de recherche */}
      <div className="dictionary-search">
        <input
          type="text"
          placeholder={`Rechercher dans ${tabs.find((t) => t.key === activeTab)?.label}...`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>

      {/* Détail d'une entrée sélectionnée */}
      {selectedEntry && (
        <div className="entry-detail">
          <button onClick={() => setSelectedEntry(null)} className="btn btn-secondary back-btn">
            ← Retour
          </button>

          <div className={`entry-type-badge ${selectedEntry.type}`}>
            {tabs.find((t) => t.key === selectedEntry.type)?.icon}{' '}
            {tabs.find((t) => t.key === selectedEntry.type)?.label}
          </div>

          <h2>{selectedEntry.japanese}</h2>
          {selectedEntry.reading && (
            <p className="entry-reading">{selectedEntry.reading}</p>
          )}
          <p className="entry-meaning">{selectedEntry.meaning}</p>

          {selectedEntry.level && (
            <span className={`level-badge ${getLevelColor(selectedEntry.level)}`}>
              {selectedEntry.level}
            </span>
          )}

          {selectedEntry.category && (
            <p className="entry-category">Catégorie : {selectedEntry.category}</p>
          )}

          {selectedEntry.examples && selectedEntry.examples.length > 0 && (
            <div className="entry-examples">
              <h3>Exemples</h3>
              <ul>
                {selectedEntry.examples.map((example, index) => (
                  <li key={index}>{example}</li>
                ))}
              </ul>
            </div>
          )}

          {selectedEntry.notes && (
            <div className="entry-notes">
              <h3>Notes</h3>
              <p>{selectedEntry.notes}</p>
            </div>
          )}
        </div>
      )}

      {/* Liste des entrées */}
      {!selectedEntry && (
        <div className="dictionary-list">
          {filteredEntries.length === 0 ? (
            <p className="no-results">Aucun résultat pour "{searchQuery}"</p>
          ) : (
            filteredEntries.map((entry) => (
              <div
                key={entry.id}
                className={`dictionary-entry ${entry.type}`}
                onClick={() => setSelectedEntry(entry)}
              >
                <div className="entry-header">
                  <span className="entry-japanese">{entry.japanese}</span>
                  {entry.reading && (
                    <span className="entry-reading-small">{entry.reading}</span>
                  )}
                </div>
                <p className="entry-meaning-short">{entry.meaning}</p>
                {entry.level && (
                  <span className={`level-badge-small ${getLevelColor(entry.level)}`}>
                    {entry.level}
                  </span>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
