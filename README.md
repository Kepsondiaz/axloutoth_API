# axloutoth_API

## Structure du projet

Voici la structure de notre projet :
```
├── CODE_OF_CONDUCT.md
├── LICENCE.txt
├── README.md
├── config
│ └── db.config.js
├── controllers
├── middlewares
├── models
├── package-lock.json
├── package.json
├── routes
├── services
└── utils
├── index.js
```

### Détails des dossiers et fichiers

- **CODE_OF_CONDUCT.md** : Ce fichier contient les règles et les attentes pour la participation au projet, afin d'assurer un environnement inclusif et respectueux pour tous les contributeurs.

- **LICENCE.txt** : Ce fichier contient les termes de la licence sous laquelle le projet est distribué. Il définit comment le code peut être utilisé par d'autres.

- **README.md** : Vous lisez actuellement ce fichier. Il fournit une vue d'ensemble du projet, de son architecture, et des instructions pour démarrer et contribuer.

- **config** :

  - **db.config.js** : Ce fichier contient la configuration de la base de données. Il définit la connexion à la base de données MongoDB en utilisant Mongoose.

- **controllers** :
  Ce dossier contient les fichiers de contrôleurs. Les contrôleurs gèrent les requêtes HTTP entrantes, interagissent avec les modèles, et renvoient des réponses appropriées aux clients. Ils contiennent la logique métier principale de l'application.

- **index.js** :
  Il s'agit du fichier principal qui initialise l'application Express. Il configure les middlewares globaux, connecte à la base de données, et démarre le serveur.

- **middlewares** :
  Ce dossier contient les middlewares personnalisés. Les middlewares sont des fonctions qui ont accès à l'objet de requête (req), à l'objet de réponse (res), et à la fonction suivante dans le cycle de requête-réponse. Ils sont utilisés pour effectuer des opérations de traitement avant que les requêtes ne soient gérées par les routes ou les contrôleurs.

- **models** :
  Ce dossier contient les définitions des modèles Mongoose. Les modèles définissent la structure des documents dans les collections de MongoDB et fournissent des méthodes pour interagir avec les données.

- **package-lock.json** :
  Ce fichier est généré automatiquement pour toute opération où npm modifie le `node_modules` ou `package.json`. Il décrit la structure exacte des dépendances de votre projet, en s'assurant que les installations sont reproductibles.

- **package.json** :
  Ce fichier contient des informations de base sur le projet (nom, version, scripts, dépendances, etc.). Il est utilisé par npm pour gérer les dépendances du projet.

- **routes** :
  Ce dossier contient les fichiers de définition des routes. Chaque fichier définit un ensemble de routes liées à une partie spécifique de l'application, redirigeant les requêtes vers les contrôleurs appropriés.

- **services** :
  Ce dossier contient les fichiers de services. Les services encapsulent la logique complexe et les opérations communes (comme l'envoi d'e-mails, la communication avec des API externes, etc.) pour être réutilisés dans différents contrôleurs ou middlewares.

- **utils** :
  Ce dossier contient les fonctions utilitaires et les helpers. Ces fonctions sont des morceaux de code réutilisables qui effectuent des tâches communes et peuvent être utilisées partout dans l'application.

## Comment démarrer

1.  **Cloner le dépôt :**

    ```sh
    git clone git@github.com:SystechSmartService/axloutoth_API.git
    cd axloutoth_API
    ```

2.  **npm install**

3.  Configurer les variables d'environnement :
    Créez un fichier .env à la racine du projet et ajoutez les variables nécessaires (comme l'URI de la base de données MongoDB).

4.  Démarrer l'application :

        ```sh
        npm run nodemon
        ```

    Accéder à l'application :
    L'application devrait maintenant être en cours d'exécution sur http://localhost:3000. ou sur http://localhost:8000
