Je souhaite revoir la structure pédagogique des leçons ainsi que certains éléments de présentation du dictionnaire.

1. Ajouter une véritable phase d'apprentissage avant les exercices

Actuellement, lorsqu'on démarre une leçon, on arrive directement sur un exercice. Par exemple, lors de mon premier lancement de l'application, j'ai voulu commencer par l'introduction aux Hiragana et le premier exercice m'a immédiatement demandé d'identifier le caractère あ.

Le problème est que l'application suppose ainsi que l'utilisateur connaît déjà la notion abordée, alors qu'elle s'adresse justement à des débutants complets.

Je souhaite que chaque leçon comporte désormais deux grandes phases :

Phase 1 — Apprentissage

- Présentation de la notion étudiée.
- Explication progressive et accessible à un débutant.
- Présentation des caractères ou éléments concernés.
- Prononciation et exemples si pertinents.
- Éventuellement quelques associations visuelles ou moyens mnémotechniques pour faciliter la mémorisation.

Phase 2 — Exercices

- Exercices permettant de vérifier la compréhension de ce qui vient d'être présenté.
- Difficulté progressive.
- Réutilisation des notions abordées dans la phase d'apprentissage.

L'utilisateur doit donc pouvoir découvrir une notion avant d'être interrogé dessus.

La partie Dictionnaire ne doit pas remplacer cette phase d'apprentissage : elle doit plutôt servir d'outil de consultation et de rappel, permettant de retrouver rapidement une information déjà étudiée.

Examine l'architecture actuelle des leçons et du moteur pédagogique pour déterminer comment intégrer cette séparation proprement, sans dupliquer inutilement les contenus ni introduire de logique métier directement dans les composants React.

2. Clarifier la représentation visuelle du dictionnaire Kanji

J'ai également remarqué une ambiguïté dans le dictionnaire.

Le symbole japonais あ est actuellement utilisé comme icône pour représenter la catégorie Kanji, mais il est également affiché sur chaque carte du dictionnaire Kanji, en plus du caractère réellement étudié.

Cela crée une confusion : on ne distingue pas immédiatement le symbole servant à identifier la catégorie du caractère qui constitue le contenu de la fiche.

Je souhaite donc :

- Utiliser une icône ou un symbole distinct pour identifier la catégorie Kanji.
- Afficher sur chaque fiche uniquement le ou les caractères correspondant réellement à l'entrée consultée.
- Éviter qu'un même caractère soit utilisé à la fois comme élément décoratif de catégorie et comme contenu pédagogique.

Plus généralement, vérifier que les icônes des catégories Vocabulaire, Kana et Kanji sont suffisamment distinctes et cohérentes.

3. Méthode de travail

Avant toute modification :

- Examiner le fonctionnement actuel des leçons, des étapes pédagogiques et des exercices.
- Identifier les données et composants concernés.
- Présenter brièvement les modifications envisagées et les éventuelles décisions architecturales nécessaires.

Ensuite, implémenter ces changements en préservant la séparation entre contenu pédagogique, moteur d'apprentissage et interface.

Ne pas élargir le périmètre à d'autres fonctionnalités sans me consulter.

Enfin, vérifier qu'un débutant complet peut :

1. Ouvrir une leçon.
2. Découvrir et comprendre une nouvelle notion sans connaissance préalable.
3. Passer ensuite aux exercices correspondants.
4. Obtenir une correction et terminer sa leçon normalement.

Exécuter les tests et le build, corriger les éventuelles erreurs, puis mettre à jour le suivi du projet avec les modifications réalisées et les points restant à traiter.