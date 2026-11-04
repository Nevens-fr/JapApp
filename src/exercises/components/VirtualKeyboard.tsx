// Clavier virtuel japonais - Lot 4
// Permet la saisie de caractères japonais sur mobile et desktop

import React, { useState, useCallback } from 'react';

interface VirtualKeyboardProps {
  onCharacterInsert: (char: string) => void;
  onBackspace: () => void;
  onSpace: () => void;
  disabled?: boolean;
}

const HIRAGANA = [
  'あ','い','う','え','お',
  'か','き','く','け','こ',
  'さ','し','す','せ','そ',
  'た','ち','つ','て','と',
  'な','に','ぬ','ね','の',
  'は','ひ','ふ','へ','ほ',
  'ま','み','む','め','も',
  'や','ゆ','よ',
  'ら','り','る','れ','ろ',
  'わ','を','ん',
];

const KATAKANA = [
  'ア','イ','ウ','エ','オ',
  'カ','キ','ク','ケ','コ',
  'サ','シ','ス','セ','ソ',
  'タ','チ','ツ','テ','ト',
  'ナ','ニ','ヌ','ネ','ノ',
  'ハ','ヒ','フ','ヘ','ホ',
  'マ','ミ','ム','メ','モ',
  'ヤ','ユ','ヨ',
  'ラ','リ','ル','レ','ロ',
  'ワ','ヲ','ン',
];

const COMMON_KANJI = [
  '一','二','三','四','五',
  '六','七','八','九','十',
  '人','口','山','川','田',
  '大','小','上','下','中',
  '日','月','火','水','木',
  '金','土','車','雨','風',
];

const SYMBOLES = [
  '。','、','？','！',
  '「','」','『','』',
  '（','）','—',
];

export const VirtualKeyboard: React.FC<VirtualKeyboardProps> = ({
  onCharacterInsert,
  onBackspace,
  onSpace,
  disabled = false,
}) => {
  const [activeTab, setActiveTab] = useState<'hiragana' | 'katakana' | 'kanji' | 'symbole'>('hiragana');

  const handleCharClick = useCallback(
    (char: string) => {
      if (!disabled) {
        onCharacterInsert(char);
      }
    },
    [disabled, onCharacterInsert],
  );

  const handleBackspaceClick = useCallback(() => {
    if (!disabled) {
      onBackspace();
    }
  }, [disabled, onBackspace]);

  const handleSpaceClick = useCallback(() => {
    if (!disabled) {
      onSpace();
    }
  }, [disabled, onSpace]);

  const renderTabButtons = () => (
    <div className="keyboard-tabs">
      <button
        className={'keyboard-tab ' + (activeTab === 'hiragana' ? 'active' : '')}
        onClick={() => setActiveTab('hiragana')}
        disabled={disabled}
      >
        あ
      </button>
      <button
        className={'keyboard-tab ' + (activeTab === 'katakana' ? 'active' : '')}
        onClick={() => setActiveTab('katakana')}
        disabled={disabled}
      >
        ア
      </button>
      <button
        className={'keyboard-tab ' + (activeTab === 'kanji' ? 'active' : '')}
        onClick={() => setActiveTab('kanji')}
        disabled={disabled}
      >
        漢
      </button>
      <button
        className={'keyboard-tab ' + (activeTab === 'symbole' ? 'active' : '')}
        onClick={() => setActiveTab('symbole')}
        disabled={disabled}
      >
        記
      </button>
    </div>
  );

  const renderKeyGrid = () => {
    const chars = activeTab === 'hiragana' ? HIRAGANA :
                  activeTab === 'katakana' ? KATAKANA :
                  activeTab === 'kanji' ? COMMON_KANJI :
                  SYMBOLES;
    return (
      <div className="keyboard-grid">
        {chars.map((char) => (
          <button
            key={char}
            className="keyboard-key"
            onClick={() => handleCharClick(char)}
            disabled={disabled}
          >
            {char}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="virtual-keyboard">
      {renderTabButtons()}
      {renderKeyGrid()}
      <div className="keyboard-actions">
        <button
          className="keyboard-key keyboard-key--action"
          onClick={handleSpaceClick}
          disabled={disabled}
        >
          Space
        </button>
        <button
          className="keyboard-key keyboard-key--action keyboard-key--backspace"
          onClick={handleBackspaceClick}
          disabled={disabled}
          aria-label="Effacer"
        >
          ⌫
        </button>
      </div>
    </div>
  );
};