# Système d'Alertes de Maintenance

## Vue d'ensemble

Le système d'alertes de maintenance détecte automatiquement les maintenances en retard et les affiche dans l'interface d'administration.

## Fonctionnalités

### 1. Détection Backend
- **Modèle Maintenance** : Méthode `isOverdue()` pour vérifier si une maintenance est en retard
- **Modèle Vehicle** : 
  - `hasOverdueMaintenance()` : Vérifie si un véhicule a des maintenances en retard
  - `overdueMaintenancesCount()` : Compte le nombre de maintenances en retard
- **MaintenanceService** :
  - `getAllOverdueMaintenances()` : Récupère toutes les maintenances en retard
  - `getOverdueMaintenancesCount()` : Compte toutes les maintenances en retard

### 2. API Endpoints
```
GET /api/maintenance/alerts/summary
- Retourne le résumé des alertes (nombre de maintenances en retard)

GET /api/maintenance/overdue/all
- Retourne toutes les maintenances en retard avec les informations du véhicule

GET /api/vehicles/{vehicle}/maintenance/overdue
- Retourne les maintenances en retard pour un véhicule spécifique
```

### 3. Interface Utilisateur

#### a. Badge d'Alertes dans le Header (AlertsBadge)
- Badge animé avec le nombre de maintenances en retard
- Dropdown avec la liste des 10 premières alertes
- Rafraîchissement automatique toutes les 5 minutes
- Clic pour naviguer vers les détails du véhicule

#### b. Composant MaintenanceAlerts (Dashboard)
- Carte d'alerte proéminente sur le dashboard
- Liste des 5 premières maintenances en retard
- Animations pour attirer l'attention
- Informations détaillées :
  - Numéro de plaque et modèle du véhicule
  - Type de maintenance
  - Nombre de jours de retard
  - Date prévue de la maintenance

#### c. Indicateurs dans VehicleCard
- Badge "Urgent" rouge pour les véhicules avec maintenances en retard
- Affichage du nombre de maintenances en retard
- Animation pulsante pour attirer l'attention

#### d. Badge dans VehicleDetailsPage
- Badge "Maintenance en Retard" dans l'en-tête du véhicule
- Visible immédiatement lors de la consultation des détails

#### e. Indicateur dans MaintenanceList
- Fond rouge pour les maintenances en retard
- Badge "En Retard" avec icône
- Bordure gauche rouge pour mise en évidence
- Animation pulsante sur le badge

### 4. Statistiques Dashboard
- Carte "Maintenances en Retard" dans les statistiques
- Filtre par statut de maintenance dans la liste des véhicules

## Logique de Détection

Une maintenance est considérée en retard si :
- `next_maintenance_date` est défini (NOT NULL)
- `next_maintenance_date < date du jour`

## Calcul des Jours de Retard

```javascript
const daysOverdue = Math.ceil(
  (new Date() - new Date(maintenance.next_maintenance_date)) / (1000 * 60 * 60 * 24)
);
```

## Codes Couleur

- **Rouge** : Alertes urgentes, maintenances en retard
- **Vert** : Véhicules actifs, statut OK
- **Gris** : Véhicules inactifs
- **Bleu** : Informations générales

## Utilisation

### Pour l'Administrateur

1. **Consulter les alertes**
   - Cliquer sur l'icône de cloche dans le header
   - Consulter le widget d'alertes sur le dashboard

2. **Filtrer les véhicules avec maintenances en retard**
   - Aller dans "Flotte de Véhicules"
   - Utiliser le filtre "Maintenance" > "En retard"

3. **Voir les détails d'une alerte**
   - Cliquer sur une alerte dans le dropdown ou le widget
   - Navigation automatique vers la page de détails du véhicule

4. **Planifier une maintenance**
   - Ouvrir les détails du véhicule
   - Ajouter ou modifier un enregistrement de maintenance
   - Définir la prochaine date de maintenance

## Tests

### Créer une maintenance en retard pour test
1. Ajouter un véhicule
2. Créer un enregistrement de maintenance
3. Définir `next_maintenance_date` à une date passée
4. Les alertes apparaîtront automatiquement

### Vérifier les alertes
- Dashboard : Widget MaintenanceAlerts
- Header : Badge avec compteur
- Liste des véhicules : Badge rouge "Urgent"
- Détails du véhicule : Badge "Maintenance en Retard"
- Liste des maintenances : Fond rouge et badge

## Performance

- Les alertes sont calculées côté backend
- Pas de calcul lourd côté frontend
- Rafraîchissement automatique toutes les 5 minutes pour le badge
- Utilisation de requêtes SQL optimisées avec index sur `next_maintenance_date`

## Améliorations Futures Possibles

1. Notifications push
2. Emails automatiques
3. Alertes à X jours avant l'échéance
4. Niveaux de criticité (urgent, important, normal)
5. Intégration calendrier
6. Rappels personnalisés
7. Statistiques d'historique des retards
