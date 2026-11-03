# Lignes Directrices pour le Contenu Pédagogique

## Principes Généraux

1. **Simplicité** : Le contenu doit être clair et accessible
2. **Cohérence** : Respecter les conventions de nommage et de formatage
3. **Modularité** : Chaque élément doit être autonome et réutilisable
4. **Accessibilité** : Prévoir le support multilingue dès la conception

## Structure des Fichiers JSON

### Nommage
- Utiliser des noms descriptifs en anglais
- Exemple : `lesson_01_greetings.json`

### Encodage
- Toujours utiliser UTF-8
- Pas de BOM

### Contenu
- Séparer le contenu de la logique
- Utiliser des clés standardisées
- Prévoir les fallbacks pour les langues non supportées

## Règles de Production

### Vocabulaire
- Un mot par entrée
- Exemples en contexte
- Traductions dans toutes les langues supportées

### Grammaire
- Règles explicites
- Exemples progressifs
- Exercices associés

### Kanji
- Découpage par composant
- Lecture et sens séparés
- Ordre des traits (si applicable)

## Validation

- Vérifier la syntaxe JSON à chaque modification
- Tester le chargement du contenu dans l'application
- Valider la cohérence multilingue

## Outils

- Utiliser un linter JSON pour valider les fichiers
- Vérifier l'encodage UTF-8
- Tester les caractères spéciaux japonais (hiragana, katakana, kanji)
