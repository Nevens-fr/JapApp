Application d'apprentissage du japonais — Plan de développement

Version : 0.2
Statut : Document de référence
Objectif : Construire une application personnelle d'apprentissage du japonais, mobile-first, ludique, utilisable hors ligne et permettant une synchronisation facultative entre plusieurs appareils.

---

1. Présentation du projet

1.1 Objectif

Développer une application d'apprentissage du japonais destinée en priorité aux débutants complets.

L'application doit proposer un parcours pédagogique progressif et guidé, inspiré des mécanismes ludiques de Duolingo, sans reprendre ses mécanismes de monétisation ou de rétention artificielle.

L'objectif est de permettre un apprentissage régulier et équilibré du japonais, en travaillant simultanément :

- La lecture.
- L'écriture.
- Le vocabulaire.
- Les kana (hiragana et katakana).
- Les kanji.
- La grammaire.
- La compréhension écrite.
- La compréhension orale.
- La construction de phrases.

L'application doit privilégier l'apprentissage réel plutôt que la simple accumulation de points.

1.2 Principes fondamentaux

Les principes suivants doivent guider toutes les décisions de conception.

1. Parcours guidé : l'utilisateur doit savoir quoi apprendre et dans quel ordre.
2. Équilibre pédagogique : ne pas privilégier excessivement le vocabulaire au détriment de la grammaire, de la lecture ou de la compréhension.
3. Progressivité : chaque notion doit être introduite au bon moment, avec des prérequis identifiés.
4. Apprentissage actif : l'utilisateur doit régulièrement produire des réponses et pas seulement reconnaître des propositions.
5. Répétition espacée : les notions apprises doivent revenir au bon moment.
6. Ludification raisonnable : XP, progression, objectifs et statistiques peuvent encourager la régularité, mais ne doivent jamais bloquer l'apprentissage.
7. Autonomie : aucune publicité, aucun abonnement et aucun achat nécessaire.
8. Mode hors ligne : l'application doit rester utilisable sans connexion après son premier chargement complet.
9. Compte facultatif : il doit être possible d'utiliser l'application sans créer de compte.
10. Synchronisation facultative : un compte permet de retrouver sa progression sur plusieurs appareils.
11. Architecture évolutive : séparer clairement l'interface, le moteur pédagogique, les contenus et la persistance.
12. Mobile-first : l'application sera principalement utilisée sur téléphone. Le responsive est une exigence fondamentale, pas une adaptation secondaire.

1.3 Périmètre initial

La première version cible un débutant complet et couvre les premières notions du niveau JLPT N5.

Le contenu initial doit permettre de suivre un véritable parcours d'apprentissage, et non une simple collection d'exercices indépendants.

Objectifs indicatifs du premier contenu :

- Hiragana et katakana.
- Environ 200 à 300 mots de vocabulaire.
- Environ 20 à 30 leçons.
- Environ 10 à 15 notions grammaticales.
- Une première sélection de kanji.
- Plusieurs centaines d'exercices.
- Des phrases d'exemple et des dialogues simples.

Ces chiffres sont des objectifs de contenu, pas des contraintes techniques. La qualité pédagogique prime sur le volume.

Ne pas chercher à couvrir l'intégralité du JLPT N5 dès la première livraison.

---

2. Choix techniques

2.1 Stack principale

L'application sera développée sous forme de Progressive Web App (PWA).

Technologies retenues :

Domaine| Technologie
Langage| TypeScript
Interface| React
Construction| Vite
Styles| CSS
Navigation| React Router
Application installable| PWA
Service Worker| Workbox ou solution équivalente
Stockage local| IndexedDB
Accès IndexedDB| Dexie.js ou équivalent
Backend| Supabase
Authentification| Supabase Auth
Base distante| PostgreSQL via Supabase
Contenus pédagogiques| JSON
Tests unitaires| Vitest
Tests de composants| React Testing Library
Tests navigateur| Playwright
Hébergement initial| GitHub Pages

Les versions des dépendances doivent être choisies au démarrage du projet et conservées dans le fichier de verrouillage du gestionnaire de paquets.

Ne pas multiplier les bibliothèques sans nécessité.

2.2 Architecture générale

L'application doit être organisée autour de responsabilités clairement séparées.

JapaneseLearning/
│
├── public/
│   ├── icons/
│   ├── content/
│   └── manifest.json
│
├── src/
│   ├── app/
│   │   ├── App.tsx
│   │   ├── router.tsx
│   │   └── providers/
│   │
│   ├── components/
│   │   ├── common/
│   │   ├── layout/
│   │   └── learning/
│   │
│   ├── pages/
│   │   ├── Home/
│   │   ├── LearningPath/
│   │   ├── Lesson/
│   │   ├── Review/
│   │   ├── Dictionary/
│   │   ├── Statistics/
│   │   └── Settings/
│   │
│   ├── exercises/
│   │   ├── types/
│   │   ├── components/
│   │   └── engine/
│   │
│   ├── core/
│   │   ├── learning/
│   │   ├── progression/
│   │   ├── revision/
│   │   └── scoring/
│   │
│   ├── data/
│   │   ├── models/
│   │   ├── repositories/
│   │   └── loaders/
│   │
│   ├── database/
│   │   ├── local/
│   │   ├── remote/
│   │   ├── migrations/
│   │   └── sync/
│   │
│   ├── services/
│   │   ├── audio/
│   │   ├── authentication/
│   │   └── backup/
│   │
│   ├── hooks/
│   ├── styles/
│   └── utils/
│
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
│
├── documentation/
│
├── PLAN_DE_DEVELOPPEMENT.md
├── ARCHITECTURE.md
├── SUIVI.md
├── CHANGELOG.md
├── CONTENT_GUIDELINES.md
├── README.md
│
├── package.json
└── ...

Cette structure est indicative. Elle peut évoluer si une meilleure organisation est justifiée, mais les responsabilités doivent rester séparées.

2.3 Séparation des responsabilités

L'architecture doit distinguer au minimum :

Interface

- Affichage.
- Navigation.
- Interactions utilisateur.
- Présentation des exercices.
- Responsive.

Moteur pédagogique

- Gestion des leçons.
- Sélection des exercices.
- Évaluation des réponses.
- Progression.
- Répétition espacée.
- Calcul des scores.

Contenus

- Vocabulaire.
- Kana.
- Kanji.
- Grammaire.
- Phrases.
- Exercices.
- Dialogues.

Persistance

- Stockage local.
- Stockage distant.
- Sauvegarde.
- Synchronisation.

Services

- Authentification.
- Audio.
- Gestion des paramètres.
- Export et import.

Le moteur pédagogique ne doit pas dépendre directement de React, du navigateur ou de Supabase.

Il doit être possible de tester le moteur sans lancer l'interface.

---

3. Règles d'architecture et de développement

Ces règles s'appliquent à tous les lots.

3.1 Données et identifiants

1. Les données pédagogiques doivent être pilotées par des fichiers JSON.
2. Les relations entre objets doivent utiliser des identifiants stables, jamais les noms ou les libellés.
3. Les identifiants doivent rester stables entre les versions du contenu.
4. Ne pas dupliquer inutilement les données.
5. Les données pédagogiques doivent être indépendantes des données de progression.
6. Les textes affichés doivent être séparés des mécanismes de traitement lorsque cela est pertinent.
7. Prévoir une version des schémas de données et une version du contenu pédagogique.

Exemple :

{
  "id": "vocab_001",
  "japanese": "水",
  "reading": "みず",
  "meaning": "eau",
  "categoryId": "food_drink",
  "level": "N5"
}

3.2 Qualité du code

- Utiliser TypeScript avec une configuration stricte.
- Éviter autant que possible les types "any".
- Factoriser les fonctionnalités réellement communes.
- Éviter les composants React excessivement volumineux.
- Ne pas mélanger logique métier et rendu graphique.
- Éviter les états globaux non maîtrisés.
- Documenter les choix architecturaux importants.
- Gérer explicitement les erreurs.
- Ne pas masquer les erreurs par des valeurs par défaut arbitraires.
- Écrire des tests pour les règles métier importantes.

3.3 Persistance

- L'interface ne doit pas accéder directement aux tables Supabase.
- L'interface ne doit pas manipuler directement IndexedDB.
- Passer par des repositories ou services spécialisés.
- Les règles métier doivent rester indépendantes du type de stockage.
- Les opérations locales doivent fonctionner sans réseau.
- Les erreurs de synchronisation doivent être détectables et récupérables.

3.4 Sécurité

- Ne jamais exposer de clé Supabase "service_role" dans le frontend.
- Utiliser uniquement la clé publique prévue pour le client.
- Activer et configurer les politiques Row Level Security (RLS) sur toutes les tables contenant des données utilisateur.
- Un utilisateur ne doit jamais pouvoir lire ou modifier les données d'un autre utilisateur.
- Ne jamais considérer une donnée envoyée par le navigateur comme fiable.
- Les données synchronisées doivent être validées côté serveur ou par les contraintes de la base.

3.5 Responsive et accessibilité

Le mobile est la cible principale.

- Concevoir d'abord pour une largeur de 360 à 390 pixels.
- Éviter tout défilement horizontal non justifié.
- Utiliser des zones tactiles suffisamment grandes.
- Ne jamais dépendre uniquement du survol de la souris.
- Prévoir l'apparition du clavier virtuel.
- Respecter les zones de sécurité des téléphones.
- Vérifier les affichages portrait et paysage.
- Prévoir des contrastes lisibles.
- Ne pas utiliser uniquement la couleur pour signaler une erreur ou une réussite.
- Les interactions doivent rester utilisables au clavier.

Tester régulièrement sur de vrais navigateurs mobiles, notamment Firefox Android.

---

4. Plan de développement

Le développement est découpé en lots indépendants.

Chaque lot doit être terminé, testé et documenté avant de passer au suivant.

Il est interdit de considérer un lot comme terminé simplement parce que le code a été écrit.

---

LOT 0 — Préparation et cadrage

Objectif

Définir le périmètre précis de la première version et préparer le dépôt.

Travaux

1. Vérifier l'environnement de développement.
2. Vérifier les versions de Node.js et npm.
3. Initialiser le dépôt Git.
4. Créer le projet React + TypeScript + Vite.
5. Configurer le linting et le formatage.
6. Configurer Vitest.
7. Définir les conventions de nommage.
8. Créer les documents de référence.
9. Définir les premières décisions d'architecture.
10. Définir les navigateurs cibles.
11. Définir le principe du mode invité et du compte facultatif.
12. Définir les objectifs pédagogiques de la première version.

Documents à créer

- "README.md"
- "ARCHITECTURE.md"
- "SUIVI.md"
- "CHANGELOG.md"
- "CONTENT_GUIDELINES.md"

Critères de validation

- Le projet démarre localement.
- La compilation fonctionne.
- Les tests peuvent être exécutés.
- Le dépôt Git est initialisé.
- Les documents sont présents.
- Les choix techniques sont documentés.

---

LOT 1 — Socle technique et interface initiale

Objectif

Construire une application React fonctionnelle avec une structure propre.

Travaux

1. Configurer React Router.
2. Créer le layout principal.
3. Définir les composants communs.
4. Mettre en place les styles globaux.
5. Créer les premières pages.
6. Créer une navigation adaptée au mobile.
7. Définir les règles responsive.
8. Prévoir les états de chargement et d'erreur.
9. Mettre en place une gestion cohérente des paramètres.
10. Ajouter une page d'accueil temporaire.

Pages initiales

- Accueil.
- Parcours d'apprentissage.
- Leçon.
- Révisions.
- Dictionnaire.
- Statistiques.
- Paramètres.

Les pages peuvent être provisoires à ce stade.

Critères de validation

- Toutes les pages sont accessibles.
- La navigation fonctionne.
- L'affichage est correct sur téléphone.
- Aucun défilement horizontal involontaire.
- Les composants communs sont réutilisables.
- La logique métier n'est pas intégrée directement dans les composants d'interface.

---

LOT 2 — Modèle de données pédagogiques

Objectif

Définir les structures de données qui représenteront les connaissances japonaises.

Entités principales

Vocabulaire

- Identifiant.
- Écriture japonaise.
- Lecture en kana.
- Signification française.
- Catégorie.
- Niveau.
- Exemples.
- Audio éventuel.
- Tags.

Kana

- Identifiant.
- Caractère.
- Type : hiragana ou katakana.
- Lecture romaji.
- Groupe.
- Variantes.
- Ordre pédagogique.

Kanji

- Identifiant.
- Caractère.
- Lectures principales.
- Significations.
- Niveau.
- Vocabulaire associé.
- Exemples.

Grammaire

- Identifiant.
- Nom de la notion.
- Explication.
- Structure.
- Exemples.
- Prérequis.
- Niveau.
- Erreurs fréquentes.

Phrases

- Identifiant.
- Phrase japonaise.
- Lecture.
- Traduction française.
- Vocabulaire associé.
- Notions grammaticales associées.
- Niveau de difficulté.

Leçons

- Identifiant.
- Titre.
- Description.
- Ordre.
- Objectifs.
- Prérequis.
- Notions introduites.
- Exercices associés.

Exercices

- Identifiant.
- Type.
- Difficulté.
- Données nécessaires.
- Objectif pédagogique.
- Réponse attendue.
- Explication éventuelle.

Travaux

1. Définir les interfaces TypeScript.
2. Définir les schémas de validation JSON.
3. Définir les relations entre entités.
4. Définir les identifiants stables.
5. Définir le chargement des contenus.
6. Définir la gestion des versions de contenu.
7. Prévoir la validation des références entre fichiers.
8. Prévoir les messages d'erreur utiles en cas de contenu invalide.

Critères de validation

- Tous les modèles sont définis.
- Les fichiers JSON peuvent être chargés.
- Les données invalides sont détectées.
- Les relations entre objets sont vérifiées.
- Les contenus ne dépendent pas de l'interface.

---

LOT 3 — Moteur pédagogique

Objectif

Développer le cœur de l'application indépendamment de l'interface.

Travaux

1. Définir la notion de connaissance.
2. Définir la notion de maîtrise.
3. Définir les prérequis.
4. Définir les règles de progression.
5. Définir les conditions de déblocage.
6. Définir la sélection des exercices.
7. Définir l'évaluation des réponses.
8. Définir la gestion des erreurs.
9. Définir les règles de réussite d'une leçon.
10. Définir les mécanismes de révision.
11. Définir les événements pédagogiques générés par les actions de l'utilisateur.

Le moteur doit pouvoir répondre à des questions telles que :

- Quelles notions l'utilisateur connaît-il ?
- Quelles notions doit-il apprendre ensuite ?
- Quelles notions doit-il réviser ?
- Quels exercices sont pertinents maintenant ?
- Une réponse incorrecte doit-elle entraîner une nouvelle tentative ?
- Une notion peut-elle être considérée comme maîtrisée ?

Principes

La progression ne doit pas être uniquement linéaire.

Une notion peut être :

- Non découverte.
- Introduite.
- En cours d'apprentissage.
- À réviser.
- Maîtrisée.

Il faudra éviter de considérer qu'une réponse correcte suffit à prouver une maîtrise durable.

Critères de validation

- Le moteur fonctionne sans React.
- Les règles principales sont testées.
- Les prérequis sont respectés.
- Les notions peuvent être révisées.
- Les exercices peuvent être sélectionnés par le moteur.

---

LOT 4 — Système d'exercices

Objectif

Construire un système générique permettant d'ajouter de nouveaux types d'exercices sans réécrire le moteur.

Types d'exercices initiaux

Reconnaissance

- Reconnaître un hiragana.
- Reconnaître un katakana.
- Reconnaître un kanji.
- Associer un caractère à sa lecture.
- Associer un mot à sa signification.

Vocabulaire

- QCM de traduction.
- Association japonais/français.
- Reconnaissance d'un mot.
- Choix de la bonne lecture.
- Complétion d'une phrase.

Grammaire

- Identifier une particule.
- Choisir la bonne structure.
- Remettre les mots dans l'ordre.
- Compléter une phrase.
- Choisir la bonne conjugaison.
- Identifier une erreur grammaticale.

Lecture

- Lire une phrase simple.
- Comprendre une phrase.
- Répondre à une question sur un texte.
- Associer une phrase à sa traduction.

Compréhension orale

- Écouter un mot.
- Identifier le mot entendu.
- Comprendre une phrase courte.

Production

- Écrire un mot en kana.
- Construire une phrase.
- Traduire une phrase simple.
- Saisir une réponse en japonais.

Travaux

1. Définir une interface commune d'exercice.
2. Définir les formats de réponses.
3. Définir les règles de correction.
4. Définir les explications affichées après une réponse.
5. Créer les composants des exercices.
6. Créer un mécanisme d'enchaînement.
7. Gérer les réponses correctes et incorrectes.
8. Gérer les tentatives.
9. Gérer les exercices abandonnés.
10. Prévoir l'affichage des caractères japonais et les claviers virtuels.

Critères de validation

- Plusieurs types d'exercices fonctionnent.
- Le moteur peut les utiliser sans connaître leur rendu.
- Les réponses sont évaluées correctement.
- Les explications sont affichées.
- Les exercices sont utilisables sur téléphone.

---

LOT 5 — Interface pédagogique et parcours

Objectif

Construire une véritable expérience d'apprentissage.

Accueil

Afficher :

- La progression globale.
- La prochaine leçon recommandée.
- Les révisions à effectuer.
- Les objectifs quotidiens éventuels.
- Un accès au parcours.

Parcours

Afficher :

- Les leçons.
- Les chapitres.
- Les prérequis.
- Les notions acquises.
- Les notions à découvrir.
- Les éléments verrouillés.
- La progression générale.

Le parcours doit être visuel et compréhensible, sans devenir une simple liste de menus.

Leçons

Une leçon doit alterner :

- Présentation d'une notion.
- Explication.
- Exemple.
- Exercice.
- Vérification de compréhension.
- Synthèse.

Ne pas transformer chaque leçon en une succession interminable de QCM.

Révisions

Afficher les notions à réviser et permettre de lancer une session adaptée.

Dictionnaire

Permettre de consulter :

- Le vocabulaire.
- Les kana.
- Les kanji.
- Les notions grammaticales.

Critères de validation

- Le parcours est compréhensible.
- L'utilisateur sait quoi faire ensuite.
- Les leçons sont utilisables.
- Les pages fonctionnent sur mobile.
- La navigation reste simple.

---

LOT 6 — Stockage local et fonctionnement hors ligne

Objectif

Permettre à l'application de fonctionner sans compte et sans connexion Internet.

Technologie

IndexedDB, via Dexie.js ou une bibliothèque équivalente.

Données locales

- Progression.
- Leçons terminées.
- Maîtrise des notions.
- Échéances de révision.
- Statistiques.
- Préférences.
- XP.
- Événements de progression en attente de synchronisation.

Travaux

1. Définir le schéma IndexedDB.
2. Définir les repositories locaux.
3. Implémenter les opérations CRUD.
4. Implémenter les migrations de schéma.
5. Enregistrer les résultats des exercices.
6. Enregistrer la progression.
7. Enregistrer les paramètres.
8. Prévoir les données de démonstration ou le profil initial.
9. Prévoir les erreurs de stockage.
10. Tester la persistance après fermeture du navigateur.
11. Prévoir l'export des données personnelles.
12. Prévoir l'import d'une sauvegarde.

Sauvegarde

L'export et l'import JSON doivent permettre de récupérer une progression même sans compte Supabase.

Le fichier exporté doit contenir :

- Une version du format de sauvegarde.
- La date de création.
- Les données de progression.
- Les paramètres.
- Les informations nécessaires à une restauration.

L'import doit vérifier la validité du fichier avant de modifier les données existantes.

Prévoir une confirmation avant tout remplacement de progression.

Critères de validation

- La progression est conservée après fermeture.
- L'application fonctionne hors ligne.
- Les données ne disparaissent pas après un rechargement.
- L'export fonctionne.
- L'import fonctionne.
- Les migrations sont testées.

---

LOT 7 — PWA et installation

Objectif

Rendre l'application installable et utilisable comme une application mobile.

Travaux

1. Créer le manifest.
2. Définir le nom de l'application.
3. Définir les icônes.
4. Définir les couleurs de thème.
5. Configurer le Service Worker.
6. Mettre en cache les ressources nécessaires.
7. Mettre en cache les contenus pédagogiques.
8. Gérer les mises à jour.
9. Gérer les erreurs de réseau.
10. Prévoir une indication de fonctionnement hors ligne.
11. Prévoir les mises à jour du contenu sans effacer la progression.

Stratégie de cache

Distinguer :

- Le code de l'application.
- Les ressources graphiques.
- Les contenus pédagogiques.
- Les éventuels fichiers audio.
- Les données personnelles.

Les données personnelles ne doivent pas être gérées comme de simples ressources de cache HTTP.

Prévoir une stratégie de versionnement et de nettoyage des anciens caches.

L'application doit éviter de laisser l'utilisateur avec un mélange incohérent de versions de code et de contenu.

Contraintes

- Le Service Worker nécessite un contexte sécurisé (HTTPS ou localhost).
- Le premier chargement complet nécessite une connexion.
- L'installation et le comportement PWA doivent être testés sur les navigateurs cibles.
- Ne pas supposer que toutes les fonctionnalités PWA sont identiques sur Chrome Android et Firefox Android.

Critères de validation

- L'application est installable.
- Elle s'ouvre sans interface de navigateur lorsqu'elle est installée et que le navigateur le permet.
- Elle fonctionne hors ligne après chargement complet.
- Les mises à jour ne détruisent pas la progression.
- Les erreurs de mise à jour sont gérées.

---

LOT 8 — Répétition espacée

Objectif

Mettre en place un système de révision efficace.

Principes

Les notions apprises doivent revenir à intervalles adaptés à la maîtrise de l'utilisateur.

La répétition espacée doit être appliquée à plusieurs types de connaissances :

- Vocabulaire.
- Kana.
- Kanji.
- Grammaire.
- Structures de phrases.

Travaux

1. Définir le modèle de révision.
2. Définir les états d'une notion.
3. Définir les intervalles initiaux.
4. Définir l'évolution après une bonne réponse.
5. Définir l'évolution après une mauvaise réponse.
6. Définir le nombre de tentatives.
7. Définir la sélection des notions à réviser.
8. Définir les priorités.
9. Prévoir les révisions dues et en retard.
10. Prévoir la prise en compte de la difficulté.
11. Tester les algorithmes avec des scénarios simulés.

Un algorithme connu comme SM-2 peut servir de point de départ, mais il ne doit pas être adopté sans réflexion.

Le système doit rester compréhensible et ajustable.

Critères de validation

- Les révisions sont planifiées.
- Une mauvaise réponse influence la prochaine échéance.
- Les notions maîtrisées reviennent moins souvent.
- Les révisions peuvent être lancées indépendamment des leçons.
- Les dates sont correctement gérées.

---

LOT 9 — Gamification et progression

Objectif

Ajouter des mécanismes ludiques sans nuire à l'apprentissage.

Éléments envisagés

- XP.
- Niveau utilisateur.
- Progression par chapitre.
- Objectifs quotidiens facultatifs.
- Séries de jours d'apprentissage.
- Statistiques.
- Historique.
- Récompenses symboliques.
- Indicateurs de maîtrise.

Règles

- Aucun contenu pédagogique ne doit être bloqué derrière une mécanique de récompense.
- Pas de système de vies limitant les tentatives.
- Pas de pénalité excessive après une mauvaise réponse.
- Pas de publicité.
- Pas d'abonnement.
- Pas de pression artificielle à maintenir une série quotidienne.
- La progression doit refléter autant que possible les connaissances réellement acquises.

Les XP ne doivent pas devenir le principal indicateur de réussite.

Critères de validation

- Les XP sont calculés de manière cohérente.
- Les statistiques sont persistées.
- Les récompenses sont indépendantes des règles pédagogiques.
- Les mécaniques ne bloquent jamais l'apprentissage.

---

LOT 10 — Création du contenu pédagogique initial

Objectif

Produire un premier parcours cohérent et exploitable.

Le contenu doit être construit progressivement et validé avant d'être intégré.

10.1 Hiragana

- Voyelles.
- Consonnes et voyelles.
- Sons combinés.
- Dakuten et handakuten.
- Yōon.
- Sokuon.
- Sons longs.

10.2 Katakana

Introduire les katakana assez tôt, sans attendre que tout le parcours hiragana soit terminé.

- Caractères de base.
- Sons combinés.
- Dakuten.
- Sokuon.
- Sons longs.
- Emprunts étrangers simples.

10.3 Vocabulaire

Créer un premier corpus d'environ 200 à 300 mots.

Catégories possibles :

- Salutations.
- Présentation.
- Famille.
- Nombres.
- Temps.
- Nourriture.
- Boissons.
- Lieux.
- Déplacements.
- Objets du quotidien.
- Verbes fréquents.
- Adjectifs fréquents.

Chaque entrée doit être validée.

10.4 Grammaire

Introduire progressivement :

- Structure sujet / complément / verbe.
- Particules は, が, を, に, で, の, も.
- Formes affirmatives et négatives.
- Présent et passé.
- Adjectifs en い et en な.
- Questions.
- Démonstratifs.
- Formes de politesse.
- Possession.
- Existence.
- Premières constructions courantes.

10.5 Kanji

Introduire progressivement une première sélection de kanji.

Ne pas demander de mémoriser immédiatement toutes les lectures possibles.

Privilégier :

- Reconnaissance.
- Signification principale.
- Lecture dans des mots connus.
- Réutilisation dans des phrases.

10.6 Organisation du parcours

Construire environ 20 à 30 leçons initiales.

Chaque leçon doit avoir :

- Un objectif pédagogique.
- Des prérequis.
- Des notions nouvelles.
- Des exemples.
- Des exercices.
- Une évaluation.
- Des notions à réviser ultérieurement.

L'apprentissage des kana doit commencer tôt, tandis que le vocabulaire et la grammaire progressent en parallèle.

Le romaji peut être utilisé temporairement comme aide, mais doit progressivement disparaître.

10.7 Qualité du contenu

Créer "CONTENT_GUIDELINES.md" pour fixer les règles de production.

Chaque contenu doit être vérifié sur :

- L'orthographe japonaise.
- La lecture.
- La traduction française.
- La cohérence grammaticale.
- Le niveau de difficulté.
- Les exemples.
- Les références aux autres notions.

Ne pas générer massivement du contenu sans contrôle.

Les sources externes comme JMdict ou KANJIDIC2 peuvent être étudiées, sous réserve de vérifier leurs licences et les obligations d'attribution.

Critères de validation

- Le parcours est cohérent.
- Les notions sont correctement ordonnées.
- Les exemples sont valides.
- Les exercices correspondent aux notions introduites.
- Les contenus ont été relus.
- Les références entre fichiers sont valides.

---

LOT 11 — Audio et compréhension orale

Objectif

Introduire une première dimension audio.

Première approche

Utiliser la Web Speech API lorsque le navigateur et le système proposent une voix japonaise utilisable.

Créer une abstraction "SpeechProvider" pour ne pas dépendre directement de l'API du navigateur.

Travaux

1. Détecter la disponibilité de la synthèse vocale.
2. Vérifier la présence d'une voix japonaise.
3. Permettre la lecture d'un mot.
4. Permettre la lecture d'une phrase.
5. Ajouter un contrôle de lecture.
6. Gérer les erreurs et indisponibilités.
7. Tester sur Firefox Android et les autres navigateurs cibles.

Limites

La disponibilité des voix dépend du navigateur et du système d'exploitation.

Ne jamais supposer qu'une voix japonaise est installée.

Prévoir à terme la possibilité d'utiliser des fichiers audio préenregistrés pour les contenus importants.

La reconnaissance vocale n'est pas prévue dans cette première version.

Critères de validation

- L'audio fonctionne lorsqu'une voix est disponible.
- L'application reste utilisable lorsqu'il ne l'est pas.
- Les erreurs sont gérées.
- La lecture ne bloque pas l'interface.

---

LOT 12 — Authentification et backend Supabase

Objectif

Permettre à l'utilisateur de créer un compte facultatif et de retrouver sa progression sur plusieurs appareils.

Le mode invité doit continuer à fonctionner sans Supabase.

12.1 Architecture

Utiliser Supabase pour :

- L'authentification.
- Le stockage distant de la progression.
- La synchronisation.
- Les préférences utilisateur éventuellement partagées.

Conserver IndexedDB pour :

- Le fonctionnement hors ligne.
- La progression locale.
- Le cache.
- La file d'attente des modifications non synchronisées.

Les contenus pédagogiques restent dans les fichiers JSON de l'application.

12.2 Authentification

Étudier les méthodes disponibles dans Supabase Auth.

Prévoir au minimum :

- Création de compte.
- Connexion.
- Déconnexion.
- Récupération de compte.
- Gestion de session.
- Expiration de session.
- Gestion des erreurs.

La connexion ne doit jamais être obligatoire pour accéder au parcours.

12.3 Modèle distant

Définir les tables nécessaires.

Exemples indicatifs :

profiles

- "id"
- "created_at"
- "updated_at"
- Préférences utilisateur.

user_progress

- "id"
- "user_id"
- "content_id"
- "content_type"
- "mastery_level"
- "correct_count"
- "incorrect_count"
- "last_reviewed_at"
- "next_review_at"
- "updated_at"

user_lessons

- "id"
- "user_id"
- "lesson_id"
- "completed_at"
- "score"
- "updated_at"

user_statistics

À ajouter uniquement si cela apporte une réelle valeur et évite des calculs excessifs.

Ne pas créer des tables inutilement nombreuses.

Les schémas doivent être documentés et versionnés dans le dépôt.

12.4 Sécurité Supabase

- Activer RLS sur toutes les tables utilisateur.
- Autoriser uniquement l'accès aux enregistrements appartenant à l'utilisateur authentifié.
- Vérifier les opérations de lecture, création, modification et suppression.
- Ne jamais exposer la clé "service_role".
- Ne pas faire confiance aux identifiants "user_id" transmis par le frontend.
- Tester les politiques avec plusieurs utilisateurs distincts.

12.5 Mode invité et association de compte

Prévoir un mécanisme permettant à un utilisateur de commencer sans compte, puis de créer un compte sans perdre sa progression.

Lors de l'association :

1. Lire la progression locale.
2. Récupérer la progression distante éventuelle.
3. Comparer les données.
4. Appliquer une stratégie de fusion définie.
5. Vérifier le résultat.
6. Marquer les modifications comme synchronisées.

Ne jamais écraser silencieusement une progression existante.

Critères de validation

- L'utilisateur peut utiliser l'application sans compte.
- La création de compte fonctionne.
- La connexion fonctionne sur un autre appareil.
- Les données sont isolées par utilisateur.
- Les règles RLS sont testées.
- La progression locale n'est pas perdue lors de l'association d'un compte.

---

LOT 13 — Synchronisation multi-appareils

Objectif

Synchroniser les données de progression entre IndexedDB et Supabase.

Ce lot dépend du fonctionnement correct des stockages local et distant.

13.1 Principes

La synchronisation doit être :

- Bidirectionnelle.
- Résiliente aux coupures réseau.
- Idempotente.
- Rejouable.
- Traçable.
- Compatible avec le mode hors ligne.

Une opération répétée ne doit pas créer plusieurs fois la même progression.

13.2 File d'attente locale

Enregistrer les modifications qui n'ont pas encore été envoyées.

Chaque opération doit disposer d'informations suffisantes :

- Identifiant unique.
- Type d'opération.
- Identifiant de la donnée concernée.
- Date de création.
- État de synchronisation.
- Version éventuelle.

13.3 Déroulement

Lorsqu'une connexion est disponible :

1. Vérifier la session.
2. Charger les opérations locales en attente.
3. Envoyer les modifications vers Supabase.
4. Vérifier les résultats.
5. Récupérer les modifications distantes.
6. Fusionner les données.
7. Mettre à jour IndexedDB.
8. Marquer les opérations traitées.
9. Signaler les éventuelles erreurs.

Prévoir une synchronisation :

- À la connexion.
- À l'ouverture de l'application.
- Après certaines opérations importantes.
- À la demande de l'utilisateur.

Ne pas lancer des synchronisations trop fréquentes.

13.4 Gestion des conflits

Définir une stratégie explicite.

Exemples :

- Une leçon terminée sur deux appareils ne doit pas être perdue.
- Une progression de révision doit tenir compte des réponses enregistrées.
- Une préférence peut utiliser la dernière modification valide.
- Des statistiques cumulatives ne doivent pas être additionnées deux fois.

Éviter une règle universelle de type « dernière écriture gagnante » pour toutes les données.

Privilégier les événements idempotents lorsque cela simplifie la fusion.

13.5 Robustesse

Tester :

- Coupure réseau pendant un envoi.
- Fermeture de l'application pendant une synchronisation.
- Reprise après redémarrage.
- Double envoi d'une opération.
- Connexion sur deux appareils.
- Modifications simultanées.
- Session expirée.
- Erreur serveur.
- Import d'une sauvegarde locale sur un compte existant.

Critères de validation

- Une progression réalisée sur un appareil apparaît sur l'autre.
- Les opérations hors ligne sont synchronisées ultérieurement.
- Aucun doublon n'est créé lors d'un nouvel essai.
- Les conflits suivent les règles définies.
- Les erreurs ne détruisent pas les données locales.
- L'utilisateur peut connaître l'état de synchronisation.

---

LOT 14 — Tests, qualité et optimisation

Objectif

Stabiliser l'application et vérifier son comportement réel.

Tests unitaires

Tester :

- Moteur pédagogique.
- Calcul de progression.
- Évaluation des réponses.
- Répétition espacée.
- Sélection des exercices.
- Validation des contenus.
- Gestion des données.
- Règles de synchronisation.

Tests d'intégration

Tester :

- Interface et moteur.
- Repositories locaux.
- Repositories distants.
- Authentification.
- Synchronisation.
- Import et export.

Tests end-to-end

Scénarios prioritaires :

1. Première ouverture sans compte.
2. Apprentissage des premiers hiragana.
3. Terminer une leçon.
4. Fermer puis rouvrir l'application.
5. Effectuer des révisions.
6. Passer hors ligne.
7. Continuer à apprendre.
8. Revenir en ligne.
9. Créer un compte.
10. Synchroniser la progression.
11. Se connecter sur un second appareil.
12. Vérifier la récupération de la progression.
13. Importer une sauvegarde.

Tests mobiles

Tester au minimum :

- Firefox Android.
- Chrome Android.
- Un navigateur desktop moderne.

Vérifier :

- Affichage.
- Clavier virtuel.
- Défilement.
- Touches tactiles.
- Installation PWA.
- Mode hors ligne.
- Audio.
- Reprise après fermeture.

Optimisation

- Limiter les chargements inutiles.
- Éviter les gros bundles.
- Charger les ressources à la demande si nécessaire.
- Éviter les recalculs React inutiles.
- Vérifier le coût des requêtes IndexedDB.
- Vérifier le volume de données synchronisées.

Critères de validation

- Les tests critiques passent.
- Les parcours principaux fonctionnent.
- Aucun défaut bloquant sur mobile.
- Le fonctionnement hors ligne est validé.
- La synchronisation est fiable.
- Les erreurs sont compréhensibles.

---

LOT 15 — Déploiement et distribution

Objectif

Mettre l'application à disposition.

Hébergement initial

Utiliser GitHub Pages.

Le projet doit être configuré pour compiler et publier automatiquement l'application via GitHub Actions.

Travaux

1. Configurer le build de production.
2. Configurer le chemin de base Vite pour GitHub Pages.
3. Configurer les routes pour l'hébergement statique.
4. Vérifier le fonctionnement du rafraîchissement des pages.
5. Configurer HTTPS.
6. Configurer les variables publiques Supabase.
7. Vérifier les règles RLS en production.
8. Configurer le déploiement automatique.
9. Vérifier l'installation PWA en production.
10. Vérifier le fonctionnement hors ligne après installation.
11. Documenter la procédure de mise à jour.

Évolution éventuelle

Le Raspberry Pi 5 pourra héberger ultérieurement :

- Le frontend.
- Une API personnalisée.
- Des outils d'administration.
- Des services complémentaires.

L'application ne doit toutefois pas dépendre du Raspberry Pi pour fonctionner.

Le changement d'hébergement ne doit pas nécessiter de modification du moteur pédagogique.

Critères de validation

- Le déploiement est automatisé.
- L'application est accessible en HTTPS.
- La PWA est installable.
- Supabase fonctionne en production.
- Les fonctionnalités hors ligne sont opérationnelles.
- Les données utilisateur sont protégées.

---

5. Organisation du travail avec un agent de développement local

Ce document est destiné à servir de référence à un modèle local chargé de réaliser le développement.

Les règles suivantes sont impératives.

5.1 Travail par lots

- Ne réaliser qu'un seul lot à la fois.
- Ne pas commencer le lot suivant sans validation du lot courant.
- Ne pas anticiper inutilement des fonctionnalités prévues pour les lots ultérieurs.
- Ne pas modifier le périmètre du projet sans justification.
- Si un lot révèle un problème architectural, le signaler avant de poursuivre.

5.2 Avant chaque lot

1. Lire "PLAN_DE_DEVELOPPEMENT.md".
2. Lire "ARCHITECTURE.md".
3. Lire "SUIVI.md".
4. Examiner le code existant.
5. Identifier les fonctionnalités déjà réalisées.
6. Identifier les éventuels problèmes existants.
7. Définir les fichiers à créer ou modifier.
8. Proposer un découpage du lot en sous-tâches si nécessaire.

Ne jamais supposer que le code correspond exactement à la documentation.

Toujours vérifier l'état réel du dépôt.

5.3 Pendant le développement

- Avancer progressivement.
- Privilégier les modifications cohérentes et limitées.
- Ne pas réécrire des fichiers entiers sans nécessité.
- Réutiliser les mécanismes existants.
- Éviter les dépendances superflues.
- Tester les fonctionnalités au fur et à mesure.
- Signaler les décisions techniques importantes.
- Ne pas inventer de contenu pédagogique non vérifié.
- Ne pas contourner les erreurs pour obtenir artificiellement une compilation réussie.

5.4 À la fin de chaque lot

1. Exécuter les tests.
2. Exécuter le lint.
3. Exécuter le build.
4. Vérifier les fonctionnalités réalisées.
5. Corriger les anomalies.
6. Mettre à jour "SUIVI.md".
7. Mettre à jour "CHANGELOG.md".
8. Mettre à jour "ARCHITECTURE.md" si nécessaire.
9. Documenter les problèmes restants.
10. Présenter un compte rendu.

Le compte rendu doit contenir :

- Fonctionnalités réalisées.
- Fichiers créés.
- Fichiers modifiés.
- Tests exécutés et résultats.
- Décisions techniques.
- Problèmes connus.
- Éventuels écarts par rapport au plan.
- État du lot : terminé ou incomplet.

Ne jamais déclarer un lot terminé si ses critères de validation ne sont pas satisfaits.

5.5 Gestion du contexte

Le modèle doit utiliser "SUIVI.md" comme résumé persistant de l'avancement.

Ce document doit rester concis et contenir :

- Lot en cours.
- Dernier lot terminé.
- État réel du projet.
- Fonctionnalités existantes.
- Choix techniques importants.
- Problèmes connus.
- Prochaine étape.

Ne pas recopier l'intégralité du plan dans ce fichier.

Avant toute modification, relire les fichiers concernés afin d'éviter de travailler sur une version obsolète du code.

---

6. Ordre de réalisation recommandé

Ordre prévu :

Lot| Sujet| Priorité
0| Préparation| Indispensable
1| Socle technique| Indispensable
2| Modèle de données| Indispensable
3| Moteur pédagogique| Indispensable
4| Exercices| Indispensable
5| Interface pédagogique| Indispensable
6| Stockage local| Indispensable
7| PWA et hors ligne| Indispensable
8| Répétition espacée| Indispensable
9| Gamification| Importante
10| Contenu pédagogique| Indispensable
11| Audio| Secondaire
12| Authentification Supabase| Importante
13| Synchronisation| Importante
14| Tests et optimisation| Indispensable
15| Déploiement| Indispensable

Le lot 10 est un travail qui peut commencer progressivement dès que le modèle de données est stabilisé. Il ne faut pas attendre que tous les mécanismes techniques soient terminés pour préparer les contenus.

De même, les tests doivent être écrits tout au long du développement et pas uniquement au lot 14.

---

7. Définition de la première version utilisable

La première version réellement utilisable doit permettre :

- D'ouvrir l'application sur téléphone.
- De commencer sans compte.
- De suivre un parcours guidé.
- D'apprendre les hiragana.
- D'apprendre progressivement les katakana.
- D'apprendre du vocabulaire.
- De découvrir les premières règles grammaticales.
- De réaliser différents types d'exercices.
- De terminer des leçons.
- De conserver sa progression.
- De réviser les notions apprises.
- De fonctionner hors ligne après le premier chargement.
- D'exporter et importer sa progression.

La synchronisation Supabase et le compte utilisateur constituent une évolution importante de cette première version, mais ne doivent pas conditionner le fonctionnement pédagogique de base.

---

8. Principes de conception à ne pas perdre de vue

Quelques risques devront être surveillés tout au long du projet.

8.1 Ne pas construire un simple clone de Duolingo

L'objectif n'est pas de reproduire exactement son interface ou ses mécaniques.

L'application doit proposer une expérience pédagogique cohérente, agréable et suffisamment variée.

8.2 Ne pas confondre gamification et apprentissage

Un utilisateur qui obtient beaucoup de XP n'est pas nécessairement un utilisateur qui maîtrise le japonais.

Les statistiques doivent distinguer activité et maîtrise.

8.3 Ne pas multiplier les fonctionnalités trop tôt

Il vaut mieux avoir un parcours court mais de bonne qualité qu'un catalogue immense d'exercices répétitifs.

8.4 Préserver l'indépendance du moteur

Le moteur pédagogique doit pouvoir évoluer sans imposer une réécriture de l'interface ou du système de stockage.

8.5 Préserver les données utilisateur

La progression est une donnée importante.

Aucune migration, mise à jour ou synchronisation ne doit pouvoir l'effacer silencieusement.

Prévoir des tests de migration et de restauration.

8.6 Ne pas rendre le réseau indispensable

Le compte et la synchronisation sont facultatifs.

L'application doit rester utile sans connexion et sans compte.

---

9. Résultat attendu

À terme, le projet doit fournir une application personnelle d'apprentissage du japonais :

- Mobile-first.
- Installable comme une application.
- Utilisable hors ligne.
- Sans publicité.
- Sans abonnement.
- Sans compte obligatoire.
- Avec un parcours pédagogique progressif.
- Avec une répétition espacée.
- Avec une progression persistante.
- Avec une synchronisation facultative entre appareils.
- Avec une architecture permettant d'ajouter du contenu et des fonctionnalités sans réécriture majeure.

La priorité reste la qualité de l'apprentissage et la fiabilité de l'application, pas la quantité de fonctionnalités.