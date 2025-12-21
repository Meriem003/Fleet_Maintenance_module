# Guide de Démarrage Rapide - Fleet Manager

## Accès à l'Application

### 1. URLs d'Accès
- **Frontend** : http://localhost:3000
- **Backend API** : http://localhost:8000

### 2. Identifiants de Connexion

```
Email    : admin@example.com
Password : password
```

## Navigation

### Page de Connexion (Login)
- Design professionnel sobre
- Formulaire centré avec animations subtiles
- Identifiants pré-remplis pour test rapide

### Page d'Accueil (Dashboard)
Sections disponibles :

1. **Statistiques Principales**
   - Total des véhicules
   - Véhicules actifs
   - Véhicules inactifs
   - Maintenances en retard

2. **Actions Rapides**
   - Ajouter un nouveau véhicule
   - Voir tous les véhicules
   - Consulter les maintenances

3. **Indicateurs de Santé**
   - Taux d'activité de la flotte
   - Statut des maintenances

### Liste des Véhicules
- Vue complète de tous les véhicules
- Filtres par statut et maintenance
- Recherche par marque/modèle
- Actions : Voir détails, Modifier, Supprimer

## Caractéristiques Professionnelles

### Design
✓ Interface sobre et élégante
✓ Aucun emoji (100% professionnel)
✓ Palette de couleurs automobile (gris slate, blanc)
✓ Typographie claire (Inter)
✓ Animations subtiles et fluides

### Expérience Utilisateur
✓ Navigation intuitive
✓ Feedback visuel immédiat
✓ Messages de confirmation
✓ Responsive design (mobile/tablette/desktop)

### Performance
✓ Chargement rapide
✓ Animations GPU optimisées
✓ Cache intelligent
✓ États de chargement

## Démarrage de l'Application

### Si l'application n'est pas lancée :

**Frontend :**
```bash
cd frontend
npm install
npm start
```

**Backend :**
```bash
cd backend
composer install
php artisan migrate
php artisan serve
```

## Support

Pour toute question, consultez :
- `THEME_DOCUMENTATION.md` - Documentation complète du thème
- `README.md` - Instructions détaillées du projet

---

© 2024 Fleet Manager - Système Professionnel de Gestion de Flotte
