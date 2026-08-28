# 🍽️ Restaurant Website

> Site vitrine moderne et responsive pour un restaurant, développé avec React, TypeScript, Vite et Tailwind CSS.

## 📌 À propos du projet

**Restaurant Website** est un site vitrine conçu pour présenter l'univers d'un restaurant à travers une expérience web moderne, élégante et immersive.

Le site permet aux visiteurs de découvrir le restaurant, consulter son menu, en apprendre davantage sur son histoire, effectuer une réservation et prendre contact avec l'établissement.

L'objectif principal est de créer une **présence digitale professionnelle** pour un restaurant tout en proposant une navigation simple, fluide et agréable sur tous les appareils.

---

## 🧭 Navigation

Le site est organisé autour de plusieurs pages principales :

| Page               | Description                                                   |
| ------------------ | ------------------------------------------------------------- |
| 🏠 **Home**        | Présentation du restaurant et mise en avant de son univers    |
| 👨‍🍳 **About**    | Présentation du restaurant, de son histoire et de ses valeurs |
| 🍴 **Menu**        | Présentation des plats et spécialités proposés                |
| 📅 **Reservation** | Interface permettant au client de demander une réservation    |
| 📞 **Contact**     | Informations de contact et formulaire de prise de contact     |
| ❌ **Error404**     | Page affichée lorsqu'une route demandée n'existe pas          |

---

## ✨ Fonctionnalités

### 🏠 Home

La page d'accueil constitue la première interaction avec le restaurant.

Elle a pour objectif de :

* Présenter l'identité du restaurant
* Mettre en avant son univers culinaire
* Présenter les spécialités
* Orienter les visiteurs vers le menu
* Encourager la réservation
* Offrir une expérience visuelle immersive

### 👨‍🍳 About

La page **About** présente l'identité du restaurant.

Elle pourra notamment présenter :

* L'histoire du restaurant
* Sa philosophie
* Ses valeurs
* Son savoir-faire
* Son équipe
* Son approche de la cuisine

### 🍴 Menu

La page **Menu** permet aux visiteurs de découvrir les différents plats proposés.

Elle est destinée à présenter :

* Les catégories de plats
* Les plats
* Les descriptions
* Les prix
* Les spécialités du restaurant

### 📅 Reservation

La page **Reservation** permet aux visiteurs d'effectuer une demande de réservation.

Le formulaire pourra notamment contenir :

* Nom
* Email
* Téléphone
* Nombre de personnes
* Date
* Heure
* Informations complémentaires

### 📞 Contact

La page **Contact** regroupe les différents moyens permettant de contacter le restaurant :

* Adresse
* Téléphone
* Email
* Horaires d'ouverture
* Formulaire de contact
* Localisation

### ❌ Error404

Une page dédiée aux routes inexistantes afin de proposer une expérience utilisateur cohérente lorsqu'une page demandée n'est pas disponible.

---

## 🛠️ Technologies

Le projet utilise principalement :

* **React**
* **TypeScript**
* **Vite**
* **Tailwind CSS**
* **PostCSS**
* **ESLint**

---

## 📂 Architecture actuelle

L'architecture actuelle du dossier `src` est la suivante :

```text
src/
├── App.css
├── App.tsx
├── assets/
├── components/
│   ├── Footer.tsx
│   └── Navbar.tsx
├── index.css
├── main.tsx
└── pages/
    ├── About.tsx
    ├── Contact.tsx
    ├── Error404.tsx
    ├── Home.tsx
    ├── Menu.tsx
    └── Reservation.tsx
```

### 📁 `components/`

Ce dossier contient les composants réutilisables de l'interface.

#### `Navbar.tsx`

Barre de navigation principale permettant d'accéder aux différentes pages du site :

* Home
* About
* Menu
* Reservation
* Contact

#### `Footer.tsx`

Pied de page commun aux différentes pages du site.

---

### 📁 `pages/`

Ce dossier contient les différentes pages du site.

```text
pages/
├── About.tsx
├── Contact.tsx
├── Error404.tsx
├── Home.tsx
├── Menu.tsx
└── Reservation.tsx
```

Chaque fichier représente une page principale de l'application.

---

### 📁 `assets/`

Ce dossier est destiné aux ressources visuelles utilisées par le site :

* Images
* Illustrations
* Icônes
* Logos
* Autres ressources graphiques

---

## 🎨 Direction artistique

Le projet cherche à proposer une identité visuelle **élégante, moderne et premium**, adaptée à l'univers de la restauration.

L'interface doit mettre l'accent sur :

* Une forte identité visuelle
* Des images culinaires de qualité
* Une typographie élégante
* Une hiérarchie visuelle claire
* Des espaces généreux
* Des animations discrètes
* Des transitions fluides
* Une navigation intuitive

L'objectif est de donner au visiteur une impression de **qualité, de raffinement et de confiance** dès son arrivée sur le site.

---

## 📱 Responsive Design

Le site est conçu pour être responsive et s'adapter aux différentes tailles d'écran :

* 📱 Mobile
* 📱 Tablette
* 💻 Laptop
* 🖥️ Desktop
* 🖥️ Large Desktop

L'expérience utilisateur doit rester cohérente et agréable quel que soit le périphérique utilisé.

---

## 🚀 Installation

### 1. Cloner le projet

```bash
git clone https://github.com/bl4ck-w0lf-project/restaurant_site.git
```

### 2. Accéder au projet

```bash
cd restaurant_site
```

### 3. Installer les dépendances

```bash
npm install
```

### 4. Lancer le serveur de développement

```bash
npm run dev
```

Vite affichera ensuite l'adresse locale permettant d'accéder à l'application.

---

## 📦 Scripts disponibles

```bash
npm run dev
```

Lance le serveur de développement.

```bash
npm run build
```

Construit l'application pour la production.

```bash
npm run lint
```

Analyse le code avec ESLint.

```bash
npm run preview
```

Permet de prévisualiser la version de production localement.

---

## 🔮 Évolutions prévues

Le projet pourra progressivement évoluer vers une plateforme plus complète avec notamment :

* 🔐 Authentification
* 📊 Dashboard administrateur
* 📅 Gestion des réservations
* 🍴 Gestion dynamique du menu
* 🗃️ Base de données
* 📧 Notifications par email
* 💬 Notifications WhatsApp
* ⭐ Système d'avis clients
* 🛒 Système de commande en ligne
* 💳 Paiement en ligne
* 🌍 Support multilingue

---

## 🎯 Objectif

L'objectif final est de transformer cette vitrine en une **expérience digitale complète pour un restaurant**, tout en conservant une interface moderne, performante, responsive et agréable à utiliser.

---
