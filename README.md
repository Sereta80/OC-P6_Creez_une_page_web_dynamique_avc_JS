# Projet 6 OpenClassrooms : Portfolio de Sophie Bluel (Architecte d'intérieur)

Ce projet consiste en la création de la page de présentation d'une architecte d'intérieur. Il s'agit d'un site dynamique utilisant une **API** pour la gestion des travaux et de l'authentification.

<img width="400" alt="-preview-hp-admin" src="https://github.com/user-attachments/assets/c3939bcc-4a41-4432-a5d4-8bc8891cbb97" />


## 🚀 Fonctionnalités

- **Galerie dynamique** : Récupération et affichage des travaux via une API.
    
- **Filtres de recherche** : Tri des projets par catégorie (Objets, Appartements, Hotels & Restaurants).
    
- **Espace Administrateur** : Authentification sécurisée avec stockage du token via le `localStorage`.
    
- **Modale de gestion** :
    
    - Suppression de travaux existants en temps réel.
        
    - Ajout de nouveaux projets avec prévisualisation de l'image.
        
    - Validation dynamique du formulaire d'ajout.
        

## 🛠️ Technologies utilisées

- **HTML5 / CSS3** (Mise en page et animations)
    
- **JavaScript (Vanilla JS)** (Logique, manipulation du DOM, requêtes asynchrones Fetch)
    
- **Swagger** (Documentation de l'API fournie)
    

## 💻 Installation

### 1. Récupération du projet

Clonez le dépôt sur votre machine locale :

```bash
git clone https://github.com/Sereta80/OC-P6_Creez_une_page_web_dynamique_avc_JS.git
```

### 2. Le Backend

Le projet nécessite un serveur local pour fonctionner.

1. Allez dans le dossier `backend` :
    
    ```bash
    cd backend
    ```
    
2. Installez les dépendances :
    
    Bash
    
    ```bash
    npm install
    ```
    
3. Lancez le serveur :
    
    ```bash
    npm start
    ```
    

Le serveur sera accessible à l'adresse : `http://localhost:5678`

### 3. Le Frontend

1. Allez dans le dossier `FrontEnd`.
    
2. Ouvrez le fichier `index.html` dans votre navigateur (ou utilisez l'extension _Live Server_ sur VS Code).

## 🔑 Identifiants de test

Pour accéder à l'espace d'administration et tester les fonctionnalités de modification, vous pouvez utiliser les identifiants suivants sur la page de connexion :

- **E-mail** : `sophie.bluel@test.tld`
    
- **Mot de passe** : `S0phie`


## 📂 Structure du projet

- `/FrontEnd` : contient le code HTML, CSS et JavaScript.
    - `/assets` :
	    - `/icons` : contient les icônes du site
	    - `/images` : contient les images des projets de Sophie Bluel
	    - `/scripts` : fichiers JavaScript
			-  `connection.js` : Gestion de la connexion au compte d'administrateur
			 - `modal.js` : Gestion de la modale et des appels API (POST/DELETE).
			 - `script.js` : Gestion de la galerie et des filtres.
		 - `style.css` : fichier pour le style du site 
    - `index.html`
    - `login.html`
- `/Backend` : Serveur Node.js fourni pour le projet.
    
---

_Séréta THAI - Étudiante Intégratrice Web chez OpenClassrooms 2026_
