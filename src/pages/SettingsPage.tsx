/**
 * Page des paramètres
 * Lot 5.2 - Refonte UI
 */

import { useState } from 'react';
import { Card, SectionHeader, Button, Badge } from '../components/common';
import { db } from '../database/local/database';
import { exportBackup, backupToJson, importBackup, validateBackup } from '../database/local/migrations';

// Constantes pour éviter les apostrophes dans les strings TS
const ERR_EXPORT = "Erreur lors de l'export";
const ERR_IMPORT = "Erreur lors de l'import";
const MSG_RESET = "Cette action n'est pas encore implémentée.";
const MSG_CONFIRM = 'Êtes-vous sûr de vouloir réinitialiser votre progression ? Cette action est irréversible.';

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [autoPlay, setAutoPlay] = useState(false);
  const [language, setLanguage] = useState('fr');
  const [isExporting, setIsExporting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);

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

  const handleExport = async () => {
    setIsExporting(true);
    setImportError(null);
    try {
      const backup = await exportBackup(db, '1.0.0');
      const json = backupToJson(backup);
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `japapp-backup-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      setImportError(err instanceof Error ? err.message : ERR_EXPORT);
    } finally {
      setIsExporting(false);
    }
  };

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsImporting(true);
    setImportError(null);

    try {
      const text = await file.text();
      const validation = validateBackup(text);
      if (!validation.valid) {
        throw new Error(validation.error || 'Backup invalide');
      }
      await importBackup(db, text, false);
      alert('Données importées avec succès !');
    } catch (err) {
      setImportError(err instanceof Error ? err.message : ERR_IMPORT);
    } finally {
      setIsImporting(false);
      event.target.value = '';
    }
  };

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
          description: "Langue de l'interface",
          type: 'select' as const,
          options: [
            { value: 'fr', label: 'Français' },
            { value: 'ja', label: 'Japonais' },
            { value: 'en', label: 'English' },
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
          label: 'Exporter les données',
          description: 'Sauvegarder votre progression en fichier JSON',
          type: 'action' as const,
          action: handleExport,
          actionLabel: 'Exporter',
          actionDisabled: isExporting,
        },
        {
          label: 'Importer des données',
          description: 'Restaurer une sauvegarde depuis un fichier JSON',
          type: 'action' as const,
          action: undefined,
          actionLabel: 'Importer',
          actionDisabled: isImporting,
          fileInput: true,
        },
        {
          label: 'Réinitialiser la progression',
          description: 'Effacer toutes les données et recommencer',
          type: 'action' as const,
          action: () => {
            if (window.confirm(MSG_CONFIRM)) {
              alert(MSG_RESET);
            }
          },
          actionLabel: 'Réinitialiser',
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
                    {importError && item.label === 'Importer des données' && (
                      <p style={{ color: 'var(--color-error)', fontSize: '12px', marginTop: '4px' }}>{importError}</p>
                    )}
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
                      <>
                        <Button
                          variant={item.label === 'Réinitialiser la progression' ? 'secondary' : 'primary'}
                          size="sm"
                          onClick={item.action}
                          disabled={item.actionDisabled}
                        >
                          {item.actionLabel}
                        </Button>
                        {item.fileInput && (
                          <input
                            type="file"
                            accept=".json"
                            onChange={handleImport}
                            style={{ display: 'none' }}
                            id={`file-import-${item.label}`}
                          />
                        )}
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>

      <div className="text-center mt-lg">
        <p className="text-secondary" style={{ fontSize: '12px' }}>
          JapApp v1.0.0
        </p>
        <Badge variant="primary">Lot 5.2 - Refonte UI</Badge>
      </div>
    </div>
  );
}
