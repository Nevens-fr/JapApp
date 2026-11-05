# LOT 5.2 - TERMIN� ?

LOT 5.2 — Identité visuelle, design UI/UX et refonte de l'interface

1. Contexte et objectif

Les lots 3, 4 et 5 ont posé les fondations de l'application :

- Lot 3 : moteur pédagogique et gestion de la progression.
- Lot 4 : système d'exercices.
- Lot 5 : pages et navigation principales.
- Lot 5.1 : intégration du moteur pédagogique, du système d'exercices et de l'interface (en cours ou récemment terminé).

L'interface actuelle est fonctionnelle, mais très spartiate. Elle ressemble davantage à une première maquette technique qu'à une application destinée à être utilisée quotidiennement.

L'objectif du lot 5.2 est de transformer cette interface en une véritable application mobile d'apprentissage des langues, avec une identité visuelle cohérente, une ergonomie soignée et une expérience agréable.

Ce lot doit produire une amélioration visuelle et ergonomique majeure, pas simplement quelques ajustements CSS.

L'application doit donner envie de revenir apprendre quelques minutes chaque jour.

Attention : il ne s'agit pas de copier Duolingo. Nous souhaitons construire notre propre identité.

2. Direction artistique

Concept général

Créer une application d'apprentissage :

- Moderne.
- Chaleureuse.
- Ludique sans être enfantine.
- Accessible aux débutants.
- Élégante et relativement épurée.
- Visuellement distinctive.
- Agréable à utiliser pendant de courtes sessions comme pendant des sessions plus longues.

L'inspiration japonaise doit être présente de manière subtile et élégante, sans tomber dans les clichés.

Éviter notamment :

- Les sakuras omniprésentes.
- Les torii et illustrations japonaises décoratives sur tous les écrans.
- Les motifs japonais répétitifs utilisés sans raison.
- Les personnages enfantins et les mascottes envahissantes.
- L'imitation directe de l'identité graphique de Duolingo.

L'application doit pouvoir accueillir d'autres langues ultérieurement. Son identité visuelle ne doit donc pas être exclusivement japonaise.

Palette de couleurs

Je souhaite une palette chaleureuse, avec une couleur principale reconnaissable.

Direction proposée :

- Fond général : blanc cassé ou ivoire très léger.
- Surfaces et cartes : blanc.
- Couleur principale : indigo profond ou bleu nuit légèrement violacé.
- Couleur secondaire : corail doux ou orange chaleureux.
- Accent positif : vert sauge.
- Accent secondaire : jaune doux.
- Texte principal : gris très foncé, presque noir.
- Texte secondaire : gris neutre suffisamment contrasté.

Exemple de palette de départ à adapter si nécessaire :

Usage| Couleur
Fond| "#F7F6F2"
Surface| "#FFFFFF"
Primaire| "#5146A5"
Primaire clair| "#EEEAFB"
Accent corail| "#F28B78"
Succès| "#6EAA88"
Attention| "#E8B85C"
Texte principal| "#292735"
Texte secondaire| "#777582"
Bordures| "#EAE8E4"

Ces couleurs constituent une proposition de départ, pas une obligation absolue.

Le résultat doit être harmonieux. Éviter les couleurs trop saturées, les contrastes agressifs et les dégradés utilisés partout.

Prévoir des variables CSS centralisées pour pouvoir modifier facilement le thème.

Typographie

La typographie doit être agréable à lire, particulièrement pour les caractères japonais.

Prévoir :

- Une police lisible et moderne pour le français.
- Une police adaptée au japonais.
- Une hiérarchie claire entre titres, sous-titres, textes explicatifs et informations secondaires.
- Des tailles suffisamment confortables sur smartphone.

Ne pas utiliser une police fantaisiste pour les textes pédagogiques.

Les caractères japonais doivent être correctement rendus, avec une taille et un espacement adaptés.

3. Principes UX généraux

Mobile-first

L'application sera principalement utilisée sur smartphone.

La conception doit donc partir du mobile, puis s'adapter aux écrans plus larges.

Sur smartphone :

- Navigation facilement accessible au pouce.
- Boutons suffisamment grands.
- Pas de petits éléments cliquables difficiles à sélectionner.
- Pas de défilement horizontal involontaire.
- Contenu lisible sans zoom.
- Marges et espacements cohérents.
- Prise en compte des zones système du téléphone (safe areas).

Sur ordinateur :

- Exploiter intelligemment l'espace disponible.
- Éviter simplement d'étirer les composants mobiles sur toute la largeur.
- Utiliser des colonnes ou des conteneurs de largeur maîtrisée lorsque c'est pertinent.

Cohérence

Toutes les pages doivent partager :

- Les mêmes règles de couleurs.
- Les mêmes espacements.
- Les mêmes rayons de bordure.
- Les mêmes styles de boutons.
- Les mêmes cartes.
- Les mêmes icônes.
- Les mêmes conventions de feedback.

Créer un petit design system réutilisable plutôt que de styliser chaque page indépendamment.

Animations et interactions

Ajouter des animations discrètes lorsque cela améliore l'expérience :

- Transitions entre les étapes d'une leçon.
- Feedback visuel lors d'une bonne ou mauvaise réponse.
- Progression des barres.
- Apparition des cartes.
- États actifs et survols.

Les animations doivent rester rapides, discrètes et fluides.

Respecter "prefers-reduced-motion".

Ne pas multiplier les animations décoratives. L'application doit rester réactive, notamment sur des téléphones modestes.

4. Refonte des pages

Chaque page doit être retravaillée en profondeur.

4.1 Accueil — HomePage

L'accueil doit donner immédiatement envie de commencer une session.

Il doit présenter clairement :

- Un message d'accueil.
- La progression générale.
- La prochaine leçon recommandée.
- Un accès évident pour reprendre l'apprentissage.
- Le nombre de révisions en attente.
- Les éventuelles statistiques utiles.
- Les accès rapides au parcours et au dictionnaire.

La prochaine leçon doit être l'élément central de l'écran.

Ne pas transformer l'accueil en tableau de bord administratif rempli de chiffres et de petites cartes.

Créer une hiérarchie visuelle évidente : l'utilisateur doit comprendre immédiatement ce qu'il peut faire.

4.2 Parcours — LearningPathPage

Le parcours est une page importante et doit avoir une vraie identité visuelle.

Je souhaite éviter une simple liste de chapitres et de leçons.

Présenter les chapitres comme des sections visuellement distinctes.

Les leçons peuvent être représentées sous forme de chemin de progression :

- Leçons terminées.
- Leçon actuelle.
- Leçons à réviser.
- Leçons disponibles.
- Leçons verrouillées.

Utiliser des éléments graphiques pour matérialiser la progression.

Les statuts doivent être compréhensibles sans dépendre uniquement des couleurs : utiliser également des icônes et des libellés.

Le parcours doit rester lisible sur smartphone. Éviter un chemin sinueux trop encombrant ou des éléments décoratifs qui compliquent la navigation.

4.3 Leçon — LessonPage

C'est probablement l'écran le plus important de l'application.

Il doit offrir une expérience pédagogique immersive et sans distraction.

Prévoir :

- Une progression de leçon clairement visible.
- Un indicateur de l'étape actuelle.
- Une présentation soignée des notions.
- Une mise en valeur des caractères japonais.
- Des exemples bien séparés des explications.
- Des zones de lecture confortables.
- Des boutons de navigation évidents.

Les caractères japonais doivent pouvoir être affichés en grand lorsque nécessaire.

Les exemples japonais doivent être visuellement distingués de leur traduction française et de leur lecture.

Éviter l'effet « formulaire avec six blocs de texte ».

La structure de la leçon doit avoir une véritable mise en scène pédagogique.

4.4 Exercices — ExerciseCard

Les exercices doivent être visuellement soignés et donner une sensation de véritable interaction.

Prévoir des styles adaptés aux différents types d'exercices :

- QCM.
- Association.
- Saisie de réponse.
- Reconnaissance de caractères.
- Traduction.
- Autres types déjà disponibles dans le lot 4.

Les réponses doivent avoir des états visuels distincts :

- Neutre.
- Sélectionnée.
- Correcte.
- Incorrecte.
- Désactivée.

Après validation :

- Afficher un feedback immédiatement compréhensible.
- Mettre en valeur la bonne réponse.
- Présenter une explication lorsque les données pédagogiques le permettent.
- Proposer une action claire pour continuer.

Ne pas se contenter d'un texte vert ou rouge.

4.5 Révisions — ReviewPage

La page doit donner envie de réviser plutôt que de montrer une liste de tâches en retard.

Mettre en valeur :

- Les révisions disponibles.
- Les notions à revoir.
- Les éléments maîtrisés.
- Le lancement d'une session de révision.

Les cartes doivent être lisibles et les informations secondaires ne doivent pas prendre le dessus.

4.6 Dictionnaire — DictionaryPage

Le dictionnaire doit être agréable à consulter.

Prévoir :

- Une recherche immédiatement accessible.
- Des catégories ou onglets clairement identifiables.
- Des résultats bien espacés.
- Des fiches détaillées élégantes.
- Une mise en valeur des caractères japonais.
- Une séparation claire entre écriture, lecture, traduction et exemples.

La recherche doit rester facile à utiliser sur smartphone.

5. Navigation générale

Revoir la navigation pour qu'elle soit adaptée à un usage mobile.

Je privilégie une barre de navigation inférieure sur smartphone, avec les principales destinations :

- Accueil.
- Parcours.
- Révisions.
- Dictionnaire.

Sur écran large, une navigation latérale ou supérieure peut être envisagée si elle apporte une meilleure ergonomie.

La navigation doit :

- Indiquer clairement la page active.
- Rester cohérente entre les pages.
- Ne pas prendre trop de place.
- Être facilement utilisable au pouce.

La navigation existante et React Router doivent être conservés, sauf justification technique.

6. Design system et composants

Créer ou améliorer des composants réutilisables.

Exemples :

- Button.
- Card.
- ProgressBar.
- Badge.
- SectionHeader.
- BottomNavigation.
- Modal.
- ExerciseCard.
- JapaneseText.
- EmptyState.
- LoadingState.

Centraliser les variables CSS :

- Couleurs.
- Espacements.
- Rayons.
- Ombres.
- Tailles de texte.
- Largeurs maximales.
- Breakpoints.

Éviter les styles dupliqués et les valeurs arbitraires dans chaque composant.

Ne pas multiplier les dépendances externes uniquement pour obtenir quelques effets visuels.

7. Qualité et accessibilité

Respecter autant que possible les bonnes pratiques WCAG :

- Contrastes suffisants.
- Navigation au clavier.
- Focus visible.
- Labels accessibles.
- Attributs ARIA lorsque nécessaires.
- Zones tactiles adaptées.
- Ne pas transmettre une information uniquement par la couleur.

Prévoir les états :

- Chargement.
- Erreur.
- Absence de données.
- Succès.
- État vide.

Le design doit fonctionner avec les vraies données du moteur, pas uniquement avec des données de démonstration.

Ne pas inventer de statistiques ou de fonctionnalités qui n'existent pas.

8. Contraintes techniques

- Conserver React, TypeScript et Vite.
- Conserver React Router.
- Conserver l'architecture existante et la séparation entre interface, moteur pédagogique et données.
- Ne pas modifier les règles métier du LearningEngine.
- Ne pas modifier la logique de correction des exercices.
- Ne pas introduire de dépendance au japonais dans le design system.
- Ne pas anticiper artificiellement le développement d'autres langues.
- Ne pas développer IndexedDB, la synchronisation ou les fonctionnalités des lots suivants.
- Préserver la compatibilité avec GitHub Pages.
- Préserver le fonctionnement responsive.
- Ne pas casser les tests existants.

Si une modification structurelle est nécessaire pour obtenir une meilleure interface, la justifier avant de l'effectuer.

9. Méthode de travail demandée

Ne commence pas par modifier immédiatement toutes les pages.

Étape A — Audit

Examine le code existant et identifie :

- Les composants déjà disponibles.
- Les styles existants.
- Les éventuelles incohérences.
- Les contraintes de l'architecture.
- Les éléments à conserver.
- Les éléments à revoir.

Étape B — Proposition visuelle

Présente une proposition concrète de direction artistique :

- Palette définitive.
- Typographie.
- Style des cartes et boutons.
- Navigation.
- Hiérarchie visuelle.
- Principes de mise en page mobile et desktop.

Décris également l'apparence envisagée pour l'accueil, le parcours et une leçon.

Si possible, réalise d'abord un écran représentatif ou une petite maquette dans l'application afin de valider la direction avant de généraliser le design.

Ne passe pas à une refonte complète si la direction proposée n'est pas encore validée.

Étape C — Implémentation

Après validation :

1. Construire les fondations du design system.
2. Refaire la navigation.
3. Refaire les pages principales.
4. Soigner les composants d'exercices.
5. Vérifier les différentes tailles d'écran.
6. Supprimer les anciens styles devenus inutiles.

Travailler par étapes cohérentes et vérifier régulièrement le rendu dans le navigateur.

Étape D — Vérification

Effectuer au minimum :

- Vérification TypeScript.
- Lint.
- Tests existants.
- Build de production.
- Vérification visuelle de chaque page.
- Vérification responsive sur plusieurs largeurs.
- Vérification de la navigation.
- Vérification des états des exercices.

Mettre à jour :

- "SUIVI.md"
- "CHANGELOG.md"
- "ARCHITECTURE.md" si nécessaire.

10. Critères d'acceptation

Le lot ne sera pas considéré comme terminé simplement parce que le build passe.

Je veux obtenir :

- Une identité visuelle reconnaissable et cohérente.
- Une interface qui ne ressemble plus à une maquette technique.
- Une expérience mobile réellement soignée.
- Des pages agréables à consulter.
- Des exercices visuellement engageants.
- Une navigation claire.
- Une bonne lisibilité des caractères japonais.
- Un design system réutilisable.
- Aucun recul fonctionnel par rapport au lot 5.1.

Le critère principal est qualitatif : l'application doit commencer à ressembler à un produit fini, et non à un prototype de développeur.

Ne commence pas le lot 6 avant validation du lot 5.2.
