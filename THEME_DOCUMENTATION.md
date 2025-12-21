# Fleet Manager - Thème Professionnel Automobile & Mécanique

## Description du Thème

Un système de gestion de flotte véhiculaire avec un design **professionnel, sobre et moderne**, spécialement conçu pour refléter le sérieux, la fiabilité et l'expertise dans le domaine de l'automobile et de la mécanique.

## Caractéristiques du Design

### Palette de Couleurs Professionnelle
- **Gris Slate** (Slate 700-900) : Couleur principale représentant le professionnalisme et la solidité
- **Gris Neutre** : Textes et éléments secondaires pour une lisibilité optimale
- **Orange Mécanique** (Accents) : Touches de couleur pour les alertes et éléments importants
- **Blanc Pur** : Arrière-plans des cartes et sections pour une clarté maximale

### Philosophie du Design
- ✅ **Sobre et Élégant** : Pas d'éléments superflus, design épuré
- ✅ **Sans Emojis** : Interface 100% professionnelle
- ✅ **Typographie Claire** : Police Inter pour une excellente lisibilité
- ✅ **Hiérarchie Visuelle** : Organisation logique de l'information
- ✅ **Accessibilité** : Contrastes respectant les standards WCAG

## Pages Principales

### 1. Page Login
- Design minimaliste et élégant
- Formulaire centré avec animations subtiles
- Identifiants de démonstration clairement affichés
- Éléments de fond animés de manière discrète

**Identifiants de démonstration :**
- Email : `admin@example.com`
- Mot de passe : `password`

### 2. Page Home (Dashboard)
- Vue d'ensemble complète de la flotte
- Statistiques en temps réel :
  - Nombre total de véhicules
  - Véhicules actifs
  - Véhicules inactifs
  - Maintenances en retard
- Actions rapides pour une navigation efficace
- Indicateurs de santé de la flotte
- Statut des maintenances

### 3. Composants Réutilisables
- **Logo** : Composant personnalisé avec icône de voiture
- **Header** : Navigation cohérente sur toutes les pages
- **Cards** : Cartes d'information avec effets hover subtils
- **Buttons** : Boutons avec états hover/active professionnels
- **Inputs** : Champs de formulaire avec validation

## Technologies Utilisées

### Frontend
- **React 19** : Framework JavaScript moderne
- **Framer Motion** : Animations fluides et performantes
- **Tailwind CSS** : Styling utilitaire personnalisé
- **Lucide React** : Icônes cohérentes et professionnelles
- **React Router** : Navigation SPA
- **React Hot Toast** : Notifications élégantes

### Backend
- **Laravel** : Framework PHP robuste
- **MySQL** : Base de données relationnelle
- **Sanctum** : Authentification API

## Structure du Projet

```
frontend/
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Logo.jsx          # Logo professionnel
│   │   │   ├── Button.jsx        # Boutons stylisés
│   │   │   ├── Input.jsx         # Champs de formulaire
│   │   │   ├── StatCard.jsx      # Cartes de statistiques
│   │   │   └── ...
│   │   ├── layout/
│   │   │   ├── Header.jsx        # En-tête navigation
│   │   │   └── Layout.jsx        # Structure de page
│   │   └── features/
│   │       └── VehicleCard.jsx   # Carte véhicule
│   ├── pages/
│   │   ├── LoginPage.jsx         # Page de connexion
│   │   ├── DashboardPage.jsx     # Page d'accueil
│   │   └── VehiclesListPage.jsx  # Liste des véhicules
│   ├── context/
│   │   └── AuthContext.jsx       # Contexte d'authentification
│   ├── services/
│   │   └── vehicles.js           # Service API véhicules
│   └── index.css                 # Styles globaux
```

## Installation et Démarrage

### Prérequis
- Node.js 16+
- PHP 8.1+
- MySQL 8.0+
- Composer

### Installation Frontend

```bash
cd frontend
npm install
npm start
```

L'application sera accessible sur `http://localhost:3000`

### Installation Backend

```bash
cd backend
composer install
php artisan migrate
php artisan serve
```

L'API sera accessible sur `http://localhost:8000`

## Conventions de Design

### Espacement
- Padding des cartes : `p-6` (24px)
- Gaps entre éléments : `gap-4` ou `gap-6`
- Marges de section : `mb-8` (32px)

### Bordures
- Radius des cartes : `rounded-2xl` (16px)
- Radius des boutons : `rounded-xl` (12px)
- Bordures : `border-gray-300` pour la subtilité

### Ombres
- Cartes : `shadow-md` pour la profondeur
- Hover : `shadow-lg` pour l'interactivité
- Boutons : `shadow-lg` pour l'emphase

### Transitions
- Durée standard : `duration-200` ou `duration-300`
- Hover scale : `scale-95` au click, `scale-102` au hover des cartes
- Opacity : Transitions fluides pour les animations

## Accessibilité

- ✅ Contraste de couleurs conforme WCAG AA
- ✅ Navigation au clavier fonctionnelle
- ✅ Labels accessibles sur tous les formulaires
- ✅ Feedback visuel clair pour toutes les actions
- ✅ Messages d'erreur explicites

## Performance

- ⚡ Animations GPU optimisées (transform, opacity)
- ⚡ Code splitting avec React.lazy
- ⚡ Images optimisées
- ⚡ Cache API intelligent

## Maintenance et Support

Pour toute question ou support :
- Consultez la documentation technique
- Vérifiez les logs d'erreur dans la console
- Testez avec les identifiants de démonstration

## Licence

© 2024 Fleet Manager. Tous droits réservés.

---

**Design par** : Système de conception professionnel automobile
**Version** : 1.0.0
**Dernière mise à jour** : Décembre 2024
