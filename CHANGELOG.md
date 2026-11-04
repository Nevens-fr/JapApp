# Changelog

Tous les changements notables de ce projet seront documentés dans ce fichier.

Le format est basé sur [Keep a Changelog](https://keepachangelog.com/fr/1.1.0/),
et ce projet adhère à [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2026-11-03

### Ajouté
- Initialisation du projet React/TypeScript/Vite
- Configuration Vitest pour les tests unitaires
- Documentation : ARCHITECTURE.md, SUIVI.md, CHANGELOG.md
- Initialisation Git du dépôt
- Scripts de build, lint et test

### Modifié
- Configuration Vite pour inclure Vitest

### Supprimé
- Rien

### Corrigé
- Rien

### Sécurisé
- Rien

---

## [0.2.0] - 2026-11-03

### Ajouté
- Installation et configuration de react-router-dom
- Structure de l'application avec navigation
- Layout principal (MainLayout) avec navigation bottom mobile-first
- Pages provisoires : Accueil, Parcours, Leçon, Révisions, Dictionnaire, Statistiques, Paramètres
- Configuration des routes React Router
- Styles globaux avec approche mobile-first
- Gestion des états de chargement et d'erreur
- Conventions de nommage et structure de dossiers

### Modifié
- main.tsx pour utiliser le Router
- App.tsx désactivé (remplacé par Router)

### Supprimé
- Contenu par défaut de Vite dans App.tsx

### Corrigé
- Rien

### Sécurisé
- Rien
