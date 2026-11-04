import { useState } from 'react';
import { Card, SectionHeader, Button, Badge } from '../components/common';

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [autoPlay, setAutoPlay] = useState(false);
  const [language, setLanguage] = useState('fr');

  const ToggleSwitch = ({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) => (
    <button
      onClick={onToggle}
      style={{
        width: '48px',
        height: '26px',
        borderRadius: '13px',
        border: 'none',
        backgroundColor: enabled ? 'var(--color-primary)' : 'var(--color-border)',
        cursor: 'pointer',
        position: 'relative',
        transition: 'background-color 0.2s ease',
      }}
    >
      <div
        style={{
          width: '20px',
          height: '20px',
          borderRadius: '50%',
          backgroundColor: 'white',
          position: 'absolute',
          top: '3px',
          left: enabled ? '25px' : '3px',
          transition: 'left 0.2s ease',
          boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
        }}
      />
    </button>
  );

  const settingsGroups = [
    {
      title: 'Préférences',
      items: [
        {
          label: 'Mode sombre',
          description: 'Activer le thème sombre',
          type: 'toggle' as const,
          value: darkMode,
          onChange: () => setDarkMode(!darkMode),
        },
        {
          label: 'Langue',
          description: 'Langue de l\'interface',
          type: 'select' as const,
          options: [
            { value: 'fr', label: '🇫🇷 Français' },
            { value: 'ja', label: '🇯🇵 日本語' },
            { value: 'en', label: '🇬🇧 English' },
          ],
          value: language,
          onChange: (val: string) => setLanguage(val),
        },
      ],
    },
    {
      title: 'Notifications',
      items: [
        {
          label: 'Rappels de révision',
          description: 'Recevoir des notifications pour réviser',
          type: 'toggle' as const,
          value: notifications,
          onChange: () => setNotifications(!notifications),
        },
        {
          label: 'Sons',
          description: 'Activer les sons de feedback',
          type: 'toggle' as const,
          value: autoPlay,
          onChange: () => setAutoPlay(!autoPlay),
        },
      ],
    },
    {
      title: 'Données',
      items: [
        {
          label: 'Réinitialiser la progression',
          description: 'Effacer toutes les données et recommencer',
          type: 'action' as const,
          action: () => alert('Cette action n\'est pas encore implémentée.'),
        },
      ],
    },
  ];

  return (
    <div className="page">
      <SectionHeader title="Paramètres" />

      <div className="flex-col gap-md">
        {settingsGroups.map((group) => (
          <Card key={group.title}>
            <SectionHeader title={group.title} />
            <div className="flex-col">
              {group.items.map((item) => (
                <div
                  key={item.label}
                  className="flex justify-between items-center"
                  style={{ padding: '12px 0', borderBottom: item.label !== group.items[group.items.length - 1].label ? '1px solid var(--color-border-light)' : 'none' }}
                >
                  <div>
                    <p style={{ fontWeight: 500 }}>{item.label}</p>
                    <p className="text-secondary" style={{ fontSize: '13px' }}>{item.description}</p>
                  </div>
                  <div>
                    {item.type === 'toggle' && (
                      <ToggleSwitch enabled={item.value as boolean} onToggle={item.onChange} />
                    )}
                    {item.type === 'select' && (
                      <select
                        value={item.value}
                        onChange={(e) => item.onChange(e.target.value)}
                        style={{
                          padding: '6px 12px',
                          border: '2px solid var(--color-border)',
                          borderRadius: 'var(--radius-sm)',
                          fontFamily: 'var(--font-family)',
                          fontSize: '14px',
                          backgroundColor: 'var(--color-surface)',
                          outline: 'none',
                        }}
                      >
                        {item.options?.map((opt) => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                    )}
                    {item.type === 'action' && (
                      <Button variant="error" size="sm" onClick={item.action}>
                        Réinitialiser
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>

      {/* Version */}
      <div className="text-center mt-lg">
        <p className="text-secondary" style={{ fontSize: '12px' }}>
          JapApp v1.0.0
        </p>
        <Badge variant="primary">Lot 5.2 - Refonte UI</Badge>
      </div>
    </div>
  );
}
