/**
 * Système de migration de schéma IndexedDB
 * Lot 6 : Stockage local et fonctionnement hors ligne
 *
 * Gère les migrations entre les versions du schéma de données
 * Dexie.js utilise les upgrades pour appliquer les migrations
 */

import Dexie from 'dexie';
import type {
  StoredProgression,
  StoredStatistics,
  StoredPreferences,
  StoredSyncOperation,
} from './database';
import type { JapAppDatabase } from './database';

// ============================================================
// Versions de schéma
// ============================================================

/**
 * Version actuelle du schéma
 * À incrémenter à chaque modification du schéma
 */
export const CURRENT_SCHEMA_VERSION = 1;

// ============================================================
// Interface de migration
// ============================================================

/**
 * Fonction de migration pour une version donnée
 * @param db - L'instance Dexie avec la version cible
 * @param previousVersion - La version précédente du schéma
 */
export type MigrationFn = (db: Dexie, previousVersion: number) => Promise<void>;

// ============================================================
// Migrations
// ============================================================

/**
 * Migration v1 : Schéma initial
 * Tables : progression, reviewSchedules, statistics, preferences, syncOperations
 */
const migrationV1: MigrationFn = async (db: Dexie) => {
  // Le schéma est défini dans database.ts via db.version(DB_VERSION).stores()
  // Cette migration sert de point d'extension pour les futures migrations
};

// ============================================================
// Gestion des migrations
// ============================================================

/**
 * Liste des migrations par version
 * Les migrations sont appliquées dans l'ordre croissant
 */
export const MIGRATIONS: Record<number, MigrationFn> = {
  1: migrationV1,
};

/**
 * Applique toutes les migrations nécessaires
 * @param db - L'instance Dexie
 * @param currentVersion - La version cible du schéma
 */
export async function applyMigrations(
  db: Dexie,
  currentVersion: number
): Promise<void> {
  let currentSchemaVersion = CURRENT_SCHEMA_VERSION;

  // Vérifier si des migrations sont nécessaires
  if (currentSchemaVersion === currentVersion) {
    return; // Aucune migration nécessaire
  }

  // Appliquer les migrations dans l'ordre
  for (
    let version = currentSchemaVersion + 1;
    version <= currentVersion;
    version++
  ) {
    const migration = MIGRATIONS[version];
    if (!migration) {
      throw new Error(
        'Migration non trouvée pour la version ' + version
      );
    }

    await migration(db, version - 1);
  }
}

// ============================================================
// Export / Import (sauvegarde et restauration)
// ============================================================

/**
 * Format de sauvegarde pour l'export/import
 */
export interface BackupData {
  version: number; // Version du format de sauvegarde
  createdAt: string; // Date de création (ISO)
  appVersion: string; // Version de l'application
  data: {
    progression: StoredProgression | null;
    statistics: StoredStatistics | null;
    preferences: StoredPreferences | null;
  };
}

/**
 * Exporte toutes les données locales dans un objet sérialisable
 */
export async function exportBackup(
  db: Dexie,
  appVersion: string
): Promise<BackupData> {
  // Récupérer les tables
  const progression = await db.table<StoredProgression>('progression').toArray();
  const statistics = await db.table<StoredStatistics>('statistics').toArray();
  const preferences = await db.table<StoredPreferences>('preferences').toArray();

  return {
    version: 1,
    createdAt: new Date().toISOString(),
    appVersion,
    data: {
      progression: progression.length > 0 ? progression[0] : null,
      statistics: statistics.length > 0 ? statistics[0] : null,
      preferences: preferences.length > 0 ? preferences[0] : null,
    },
  };
}

/**
 * Convertit un backup en JSON sérialisable
 */
export function backupToJson(backup: BackupData): string {
  return JSON.stringify(backup, null, 2);
}

/**
 * Parse un JSON de backup
 */
export function parseBackup(json: string): BackupData {
  const parsed = JSON.parse(json);

  // Valider la structure de base
  if (!parsed.version || !parsed.createdAt || !parsed.appVersion || !parsed.data) {
    throw new Error('Format de sauvegarde invalide : structure manquante');
  }

  // Valider la version
  if (parsed.version !== 1) {
    throw new Error(
      'Version de sauvegarde non supportée : ' + parsed.version
    );
  }

  return parsed;
}

/**
 * Importe un backup dans la base de données
 * @param db - L'instance Dexie
 * @param backupJson - JSON du backup
 * @param overwrite - Si true, écrase les données existantes
 */
export async function importBackup(
  db: Dexie,
  backupJson: string,
  overwrite: boolean = false
): Promise<void> {
  const backup = parseBackup(backupJson);

  // Vérifier la compatibilité
  if (backup.version !== CURRENT_SCHEMA_VERSION) {
    throw new Error(
      'Incompatibilité de version : backup v' + backup.version + ' vs schéma v' + CURRENT_SCHEMA_VERSION
    );
  }

  // Si les données existent et overwrite est false, lancer une erreur
  if (!overwrite) {
    const existingProgression = await db.table<StoredProgression>('progression').toArray();
    if (existingProgression.length > 0) {
      throw new Error(
        'Des données existent déjà. Utilisez overwrite=true pour les remplacer.'
      );
    }
  }

  // Importer les données
  if (backup.data.progression) {
    await db.table<StoredProgression>('progression').put(backup.data.progression);
  }

  if (backup.data.statistics) {
    await db.table<StoredStatistics>('statistics').put(backup.data.statistics);
  }

  if (backup.data.preferences) {
    await db.table<StoredPreferences>('preferences').put(backup.data.preferences);
  }
}

/**
 * Vérifie si un backup est valide sans l'importer
 */
export function validateBackup(json: string): { valid: boolean; error?: string } {
  try {
    const backup = parseBackup(json);
    if (backup.version !== CURRENT_SCHEMA_VERSION) {
      return {
        valid: false,
        error: 'Version de sauvegarde non supportée : ' + backup.version,
      };
    }
    return { valid: true };
  } catch (err) {
    return {
      valid: false,
      error: err instanceof Error ? err.message : 'Erreur inconnue',
    };
  }
}

export default {
  MIGRATIONS,
  applyMigrations,
  exportBackup,
  backupToJson,
  parseBackup,
  importBackup,
  validateBackup,
};
