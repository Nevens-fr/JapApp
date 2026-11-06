# Suivi du Projet - JapApp

## État d'Avancement

| Lot | Nom | Statut | Date |
|-----|-----|--------|------|
| 0 | Préparation et cadrage | ✅ Terminé | 2026-11-03 |
| 1 | Socle technique et interface initiale | ✅ Terminé | 2026-11-03 |
| 2 | Modèle de données pédagogiques | ✅ Terminé | 2026-11-03 |
| 3 | Moteur pédagogique | ✅ Terminé | 2026-11-03 |
| 4 | Système d'exercices | ✅ Terminé | 2026-11-03 |
| 5 | Interface pédagogique et parcours | ✅ Terminé | 2026-11-04 |
| 6 | Stockage local et fonctionnement hors ligne | ✅ Terminé | 2026-11-05 |
| 7 | PWA et installation | ✅ Terminé | 2026-11-06 |
| 8 | Répétition espacée | 🔒 En attente | - |
| 9 | Gamification et progression | 🔒 En attente | - |
| 10 | Création du contenu pédagogique initial | 🔒 En attente | - |
| 11 | Audio et compréhension orale | 🔒 En attente | - |
| 12 | Authentification et backend Supabase | 🔒 En attente | - |
| 13 | Synchronisation multi-appareils | 🔒 En attente | - |
| 14 | Tests, qualité et optimisation | 🔒 En attente | - |
| 15 | Déploiement et distribution | 🔒 En attente | - |

## Décisions Techniques

| Date | Décision | Responsable | Statut |
|------|----------|-------------|--------|
| 2026-11-03 | Vitest 5 avec jsdom | Agent | ✅ Validé |
| 2026-11-03 | ESLint standard | Agent | ✅ Appliqué |
| 2026-11-03 | Cible Firefox Android | Utilisateur | ✅ Validé |
| 2026-11-03 | React Router pour la navigation | Agent | ✅ Appliqué |
| 2026-11-03 | Vite avec host 0.0.0.0 pour accès réseau local | Agent | ✅ Configurée |
| 2026-11-03 | GitHub Pages avec base /japapp/ | Agent | ✅ Configurée |

## Blocages

- Aucun

## Notes

- LOT 0 : Environnement initialisé, tests configurés, documents créés
- LOT 1 : Structure de l'application mise en place, navigation configurée, pages provisoires créées
  - react-router-dom installé et configuré
  - Layout principal avec navigation bottom mobile-first
  - 7 pages créées (Accueil, Parcours, Leçon, Révisions, Dictionnaire, Statistiques, Paramètres)
  - Styles globaux et responsive implémentés
  - Tests unitaires passant (3/3)
  - ESLint sans erreurs
  - Build TypeScript/Vite sans erreur
- LOT 2 : Modèles de données pédagogiques définis
  - Interfaces TypeScript pour Vocabulaire, Kana, Kanji, Grammaire, Phrases, Leçons, Exercices
  - Schémas de validation JSON définis
  - Relations entre entités documentées
  - Identifiants stables définis

- LOT 3 : Moteur pédagogique implémenté
  - Types définis (KnowledgeState, MasteryLevel, etc.)
  - Moteur principal (LearningEngine) indépendant de React
  - Gestion de la progression, prérequis et déblocage
  - Sélection d'exercices (apprentissage et révision)
  - Évaluation des réponses et calcul de maîtrise
  - Gestion des leçons et des événements pédagogiques
  - Tests unitaires couvrant les critères de validation

- LOT 4 : Système d'exercices implémenté
  - Interface commune Exercise avec types, formats de réponse, règles de correction
  - Moteur d'évaluation (evaluateAnswer) avec normalisation et comparaison flexible
  - Gestion des tentatives (max 3) et des exercices abandonnés
  - Composant ExerciseCard avec rendu adapté par type d'exercice
  - Mécanisme de session (ExerciseSession) pour l'enchaînement séquentiel
  - Clavier virtuel japonais (VirtualKeyboard) avec onglets hiragana/katakana/kanji/symboles
  - Sérialisation/désérialisation des sessions pour persistance future

- LOT 5.1 : Intégration du moteur pédagogique et système d'exercices dans l'interface (2026-11-04)
  - Adaptateur Lot 3/Lot 4 créé (`src/adapters/exerciseAdapter.ts`) pour convertir les exercices et résultats entre les deux lots
  - Hook `useLearningEngine.ts` mis à jour pour instancier le LearningEngine, charger les données démo, exposer la progression, et gérer startLesson/recordExerciseResult/completeLesson
  - LessonPage.tsx corrigé : utilise ExerciseCard au lieu de placeholder, gère les résultats via l'adaptateur
  - LearningPathPage.tsx corrigé : apostrophes échappées correctement dans les strings
  - HomePage.tsx mis à jour : connectée au moteur via useLearningEngine
  - ReviewPage.tsx mis à jour : connectée au moteur via useLearningEngine
  - DictionaryPage.tsx mis à jour : données de démonstration avec caractères japonais et français valides
  - Build TypeScript validé (tsc --noEmit sans erreur)
- LOT 6 : Stockage local et fonctionnement hors ligne (2026-11-05)
  - Schéma Dexie.js défini (5 tables : progression, reviewSchedules, statistics, preferences, syncOperations)
  - Repository CRUD complet avec sérialisation/désérialisation
  - Hooks React : usePersistence, useStatistics, usePreferences, useSyncQueue
  - Système de migrations et backup/export-import JSON
  - Tests de sérialisation
  - Correction hooks.ts : utilisation de createInitialProgression()
  - SettingsPage.tsx : boutons export/import JSON fonctionnels
  - Provider de persistance (PersistenceProvider) intégré dans main.tsx
  - index.ts mis à jour pour exporter les migrations


- LOT 7 : PWA et installation (2026-11-06)
  - Dépendances installées (vite-plugin-pwa, workbox-window)
  - Configuration Vite mise à jour avec VitePWA
  - Manifest JSON créé (public/manifest.json)
  - Icônes PWA générées (192x192, 512x512)
  - index.html mis à jour (balises manifest, meta apple, theme-color)
  - Service Worker enregistré via workbox-window
  - Composant OfflineIndicator créé et intégré dans MainLayout
  - Cache Workbox configuré (ressources statiques + JSON)
  - Mécanisme autoUpdate activé pour les mises à jour

## Déploiement et Test

### Commandes de base

bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev

# Build pour la production
npm run build

# Tester le build en local
npm run preview

# Lancer les tests
npm run test


### Accès depuis un téléphone (même réseau Wi-Fi)

1. Lancer `npm run dev` sur l'ordinateur
2. Le serveur est accessible à l'adresse `http://0.0.0.0:5173`
3. Sur le téléphone, ouvrir `http://<IP-ordinateur>:5173` dans le navigateur
4. Exemple : `http://192.168.1.10:5173` (remplacer par l'IP réelle)

### Compatibilité GitHub Pages

- Configuration `base: '/japapp/'` dans vite.config.ts pour la production
- `BrowserRouter` avec `basename={import.meta.env.BASE_URL}` dans main.tsx
- React Router gérera automatiquement les routes sous `/japapp/`
- Le build produit un dossier `dist/` compatible avec GitHub Pages

## Prochaine étape

- LOT 7 : PWA et installation (Terminé)
- LOT 8 : Répétition espacée
- LOT 10 : Création du contenu pédagogique initial
