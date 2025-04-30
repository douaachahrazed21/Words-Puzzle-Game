### Word Puzzle Game  🧩

## Description

Word Puzzle Game est un jeu de devinettes de mots basé sur des proverbes français. Le joueur doit deviner le mot manquant dans un proverbe en utilisant les lettres fournies dans une grille. Le jeu sélectionne aléatoirement 10 questions parmi une base de données de plus de 100 proverbes à chaque partie.

## Fonctionnalités

- Plus de 100 proverbes français
- Sélection aléatoire de 10 questions par partie
- Système de score
- Interface utilisateur intuitive
- Feedback immédiat sur les réponses
- Compatible avec tous les navigateurs modernes


## Comment jouer

1. Sur la page d'accueil, cliquez sur le bouton "Play!"
2. Une phrase avec un mot manquant s'affiche
3. Utilisez les lettres de la grille pour former le mot manquant
4. Cliquez sur une lettre dans un emplacement pour la retirer
5. Une fois tous les emplacements remplis, le jeu vérifie automatiquement votre réponse
6. Si la réponse est correcte, vous passez au niveau suivant
7. Si la réponse est incorrecte, vous pouvez réessayer
8. Votre score est affiché tout au long du jeu


## Structure des fichiers

```plaintext
word-puzzle-game/
├── server.js                # Serveur Node.js avec Express
├── simple-server.js         # Alternative: serveur Node.js natif
├── questions.json           # Base de données de questions
├── package.json             # Configuration npm
└── public/                  # Fichiers statiques
    ├── index.html           # Page d'accueil
    ├── thegame.html         # Page principale du jeu
    ├── winpage.html         # Page de victoire
    ├── lostpage.html        # Page de défaite
    ├── mainjs.js            # Logique principale du jeu
    ├── mainpage.js          # Script de la page d'accueil
    ├── winpage.js           # Script de la page de victoire
    ├── lostpage.js          # Script de la page de défaite
    ├── stylegame.css        # Styles du jeu
    ├── stylemain.css        # Styles généraux
    └── image/               # Dossier d'images
        ├── gamelogo.png     # Logo du jeu
        ├── youwon.gif       # Animation de victoire
        └── youlost.gif      # Animation de défaite
```

## Technologies utilisées

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Node.js, Express
- **Stockage**: JSON, SessionStorage

## Licence

Ce projet est sous licence MIT. Voir le fichier LICENSE pour plus de détails.
