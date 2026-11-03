# Architecture Technique - JapApp

## Vue d'ensemble

JapApp est une application web progressive (PWA) d'apprentissage du japonais, développée avec React, TypeScript et Vite.

## Stack Technique

- **Framework** : React 19
- **Langage** : TypeScript 7
- **Build** : Vite 8
- **Tests** : Vitest 5 avec jsdom
- **Linting** : ESLint 10 + typescript-eslint
- **Navigation** : Réaction (à venir)
- **Base de données locale** : IndexedDB via Dexie.js (à venir)
- **Backend** : Supabase (à venir)

## Architecture des Dossiers


src/
├── assets/          # Images, icônes, polices
├── components/      # Composants React réutilisables
├── hooks/           # Hooks personnalisés
├── lib/             # Fonctions utilitaires et logique métier
├── locales/         # Fichiers de localisation (JSON)
├── pages/           # Pages de l'application
├── services/        # Services (API, IndexedDB, etc.)
├── test/            # Configuration de tests
├── types/           # Types TypeScript
├── App.tsx          # Composant racine
└── main.tsx         # Point d'entrée


## Principes Architecturaux

### 1. Moteur Pédagogique Indépendant

Le moteur pédagogique est séparé de React pour permettre :
- Tests unitaires sans DOM
- Portabilité vers d'autres frameworks
- Réutilisabilité du contenu

### 2. Données JSON

Le contenu pédagogique est stocké en JSON pour :
- Facilité de production et maintenance
- Séparation contenu/logique
- Support multilingue natif

### 3. Mode Invité

Les utilisateurs peuvent explorer l'application sans compte :
- Progression stockée localement (IndexedDB)
- Synchronisation cloud optionnelle via Supabase

## Cibles Navigateurs

- **Priorité** : Firefox Android
- **Secondaire** : Chrome Android
- **Desktop** : Firefox, Chrome (configurations par défaut de Vite)

## Gestion des Dépendances

- Dépendances minimales en production
- Dépendances de dev séparées
- Pas de frameworks UI lourds (pas de Material-UI, etc.)
- Styles CSS custom ou CSS Modules

## Sécurité

- Pas de données sensibles côté client
- API Supabase avec auth
- Validation des données JSON
- Protection XSS via React

## Tests

- Tests unitaires : Vitest + jsdom
- Tests E2E : Playwright (à venir)
- Couverture cible : 80%+ sur le moteur pédagogique
