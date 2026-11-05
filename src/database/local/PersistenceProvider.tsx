/**
 * Provider de persistance pour l'application
 * Lot 6 : Stockage local et fonctionnement hors ligne
 *
 * Ce provider gère le chargement et la persistance de la progression
 * via un contexte React
 */

import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { UserProgression } from '../../core/learning/progression';
import { createInitialProgression } from '../../core/learning/progression';
import { loadProgression, saveProgression, hasProgression } from './repository';

// ============================================================
// Types du contexte
// ============================================================

/**
 * État du contexte de persistance
 */
interface PersistenceContextType {
  /** La progression de l'utilisateur */
  progression: UserProgression;
  /** Si la progression est en cours de chargement */
  isLoading: boolean;
  /** Si des données existent déjà */
  hasData: boolean;
  /** Dernière date de sauvegarde */
  lastSavedAt: Date | null;
  /** Éventuelle erreur */
  error: Error | null;
  /** Sauvegarde manuelle immédiate */
  saveNow: () => Promise<void>;
  /** Charge la progression depuis le stockage local */
  loadNow: () => Promise<UserProgression | null>;
  /** Réinitialise la progression */
  resetNow: () => Promise<void>;
}

/**
 * Contexte de persistance
 */
const PersistenceContext = createContext<PersistenceContextType | undefined>(undefined);

// ============================================================
// Hook pour utiliser le contexte
// ============================================================

/**
 * Hook pour accéder au contexte de persistance
 * @throws Si utilisé en dehors du PersistenceProvider
 */
export function usePersistenceContext() {
  const context = useContext(PersistenceContext);
  if (!context) {
    throw new Error('usePersistenceContext doit être utilisé dans un PersistenceProvider');
  }
  return context;
}

// ============================================================
// Provider
// ============================================================

interface PersistenceProviderProps {
  children: ReactNode;
}

/**
 * Provider de persistance
 *
 * Ce provider :
 * 1. Charge la progression locale au démarrage
 * 2. Sauvegarde automatiquement la progression quand elle change
 * 3. Expose les fonctions de persistance via le contexte
 *
 * @param children - Les composants enfants
 */
export function PersistenceProvider({ children }: PersistenceProviderProps) {
  const [progression, setProgression] = useState<UserProgression>(createInitialProgression());
  const [isLoading, setIsLoading] = useState(true);
  const [hasData, setHasData] = useState(false);
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null);
  const [error, setError] = useState<Error | null>(null);

  // ============================================================
  // Chargement initial
  // ============================================================

  useEffect(() => {
    let cancelled = false;

    const init = async () => {
      try {
        setIsLoading(true);
        const exists = await hasProgression();
        if (exists) {
          const loaded = await loadProgression();
          if (loaded && !cancelled) {
            setProgression(loaded);
            setHasData(true);
          }
        }
        setIsLoading(false);
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err : new Error(String(err)));
          setIsLoading(false);
        }
      }
    };

    init();

    return () => {
      cancelled = true;
    };
  }, []);

  // ============================================================
  // Sauvegarde automatique
  // ============================================================

  useEffect(() => {
    if (!isLoading) {
      const timeout = setTimeout(async () => {
        try {
          await saveProgression(progression);
          setLastSavedAt(new Date());
          setError(null);
        } catch (err) {
          setError(err instanceof Error ? err : new Error(String(err)));
        }
      }, 2000);

      return () => clearTimeout(timeout);
    }
  }, [progression, isLoading]);

  // ============================================================
  // Actions publiques
  // ============================================================

  const saveNow = async () => {
    try {
      await saveProgression(progression);
      setLastSavedAt(new Date());
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    }
  };

  const loadNow = async (): Promise<UserProgression | null> => {
    try {
      const loaded = await loadProgression();
      if (loaded) {
        setProgression(loaded);
        setHasData(true);
      }
      return loaded;
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
      return null;
    }
  };

  const resetNow = async () => {
    try {
      const initial = createInitialProgression();
      setProgression(initial);
      await saveProgression(initial);
      setHasData(false);
      setLastSavedAt(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    }
  };

  return (
    <PersistenceContext.Provider
      value={{
        progression,
        isLoading,
        hasData,
        lastSavedAt,
        error,
        saveNow,
        loadNow,
        resetNow,
      }}
    >
      {children}
    </PersistenceContext.Provider>
  );
}

export default PersistenceProvider;