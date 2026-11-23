# CONTENT_GUIDELINES.md

## Règles de production de contenu

### 1. Structure des fichiers JSON

Chaque fichier de contenu doit respecter la structure suivante :

json
{
  "version": "1.0.0",
  "type": "hiragana|katakana|vocabulaire|grammaire|kanji|parcours",
  "category": "nom_de_la_categorie",
  "description": "Description du contenu",
  "prerequisites": ["liste_des_prerequis"],
  "concepts": [
    {
      "id": "identifiant_stable",
      "character": "caractère_japonais",
      "reading": "romaji",
      "type": "type_de_contenu",
      "group": "groupe_pédagogique",
      "order": 1,
      "difficulty": 1
    }
  ],
  "exercises": [
    {
      "id": "identifiant_exercice",
      "type": "reconnaissance|traduction|association",
      "answerFormat": "romaji|japonais|choix_multiple",
      "objective": "objectif_pedagogique",
      "difficulty": 1,
      "prompt": "invite_pour_l_utilisateur",
      "data": "donnees_complementaires",
      "expectedAnswers": ["reponses_attendues"],
      "explanation": "explication_apres_reponse",
      "conceptId": "identifiant_du_concept_associe"
    }
  ],
  "lessons": [
    {
      "id": "identifiant_lecon",
      "title": "Titre de la leçon",
      "description": "Description de la leçon",
      "conceptId": "identifiant_du_concept_principal",
      "conceptType": "hiragana|katakana|vocabulaire|grammaire|kanji",
      "order": 1,
      "estimatedDuration": 10,
      "steps": [
        {
          "type": "presentation|exercice|synthese",
          "content": "contenu_de_l_etape"
        }
      ],
      "exercises": ["liste_des_exercices_de_la_lecon"]
    }
  ]
}


### 2. Règles de nommage

- Les identifiants doivent être stables et prévisibles
- Format : `type_001`, `type_002`, etc.
- Exemples : `hir_001`, `kan_001`, `voc_001`, `gra_001`

### 3. Validation du contenu

Chaque entrée doit être vérifiée sur :
- L'orthographe japonaise
- La lecture (romaji)
- La traduction française
- La cohérence grammaticale
- Le niveau de difficulté
- Les exemples
- Les références aux autres notions

### 4. Niveaux de difficulté

- 1 : Débutant complet
- 2 : Facile
- 3 : Moyen
- 4 : Difficile
- 5 : Expert

### 5. Ordre pédagogique

Les concepts doivent être ordonnés progressivement :
1. Commencer par les bases (voyelles, sons simples)
2. Introduire progressivement la complexité
3. Réutiliser les notions précédentes
4. Prévoir des révisions régulières

### 6. Exercices

- Chaque exercice doit avoir un objectif pédagogique clair
- Les réponses attendues doivent être explicites
- Les explications doivent être pédagogiques
- Varier les types d'exercices

### 7. Leçons

- Chaque leçon doit avoir un objectif précis
- Durée estimée : 5-15 minutes
- Alternance théorie/pratique
- Révisions intégrées
