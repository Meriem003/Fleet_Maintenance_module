# Guide d'Exécution - Database & Models

## ✅ État du Projet

Toutes les migrations, modèles et seeders ont été créés avec succès!

## 📊 Résultats de l'Implémentation

### Base de Données
- ✅ **Users** : 2 utilisateurs créés (1 admin + 1 user)
- ✅ **Vehicles** : 5 véhicules créés
- ✅ **Maintenances** : 15 maintenances créées (dont 3 en retard)

### Tests Effectués
```bash
Users: 2
Vehicles: 5
Maintenances: 15
Overdue maintenances: 3
```

## 📝 Commandes Utiles

### 1. Réinitialiser et Migrer la Base de Données
```bash
php artisan migrate:fresh
```

### 2. Exécuter les Seeders
```bash
php artisan db:seed
```

### 3. Tout en Une Fois (Migrations + Seeders)
```bash
php artisan migrate:fresh --seed
```

### 4. Vérifier les Données
```bash
# Compter les enregistrements
php artisan tinker --execute="echo 'Users: ' . App\Models\User::count(); echo PHP_EOL;"
php artisan tinker --execute="echo 'Vehicles: ' . App\Models\Vehicle::count(); echo PHP_EOL;"
php artisan tinker --execute="echo 'Maintenances: ' . App\Models\Maintenance::count(); echo PHP_EOL;"

# Lister les utilisateurs
php artisan tinker --execute="App\Models\User::all(['name', 'email', 'role'])"

# Lister les véhicules
php artisan tinker --execute="App\Models\Vehicle::all(['plate_number', 'model', 'status'])"

# Vérifier les maintenances en retard
php artisan tinker --execute="echo 'Overdue: ' . App\Models\Maintenance::whereNotNull('next_maintenance_date')->whereDate('next_maintenance_date', '<', now())->count();"
```

## 🔐 Identifiants de Connexion

### Administrateur
- **Email** : admin@fleet.com
- **Password** : password123
- **Role** : admin

### Utilisateur Standard
- **Email** : user@fleet.com
- **Password** : password123
- **Role** : user

## 📋 Structure de la Base de Données

### Table: users
| Champ | Type | Description |
|-------|------|-------------|
| id | bigint | Clé primaire |
| name | varchar(255) | Nom complet |
| email | varchar(255) | Email unique |
| password | varchar(255) | Mot de passe hashé |
| role | enum('admin','user') | Rôle utilisateur |
| remember_token | varchar(100) | Token de session |
| email_verified_at | timestamp | Date de vérification |
| created_at | timestamp | Date de création |
| updated_at | timestamp | Date de mise à jour |

### Table: vehicles
| Champ | Type | Description |
|-------|------|-------------|
| id | bigint | Clé primaire |
| plate_number | varchar(255) | Numéro d'immatriculation (unique) |
| model | varchar(255) | Modèle du véhicule |
| year | year | Année de fabrication |
| status | enum('active','inactive') | Statut du véhicule |
| created_at | timestamp | Date de création |
| updated_at | timestamp | Date de mise à jour |
| deleted_at | timestamp | Date de suppression (soft delete) |

### Table: maintenances
| Champ | Type | Description |
|-------|------|-------------|
| id | bigint | Clé primaire |
| vehicle_id | bigint | Référence vers vehicles (cascade) |
| maintenance_type | enum | Type de maintenance |
| maintenance_date | date | Date de la maintenance |
| next_maintenance_date | date | Prochaine maintenance (nullable) |
| cost | decimal(10,2) | Coût en dirhams |
| notes | text | Notes et observations (nullable) |
| created_at | timestamp | Date de création |
| updated_at | timestamp | Date de mise à jour |

**Types de maintenance disponibles:**
- oil_change (Vidange)
- tires (Pneus)
- inspection (Contrôle technique)
- brake_service (Freins)
- battery_replacement (Batterie)
- other (Autre)

## 🔗 Relations Eloquent

### User Model
```php
// Méthodes disponibles
$user->isAdmin() // Retourne true si role === 'admin'
```

### Vehicle Model
```php
// Relations
$vehicle->maintenances() // HasMany - Toutes les maintenances
$vehicle->latestMaintenance() // HasOne - Dernière maintenance

// Méthodes
$vehicle->hasOverdueMaintenance() // Vérifie si maintenance en retard
```

### Maintenance Model
```php
// Relations
$maintenance->vehicle() // BelongsTo - Véhicule associé

// Méthodes
$maintenance->isOverdue() // Vérifie si la date est dépassée
```

## 📊 Données de Test Créées

### Véhicules (5)
1. **A-12345-20** - Toyota Corolla (2022) - Active
2. **B-67890-19** - Renault Clio (2020) - Active
3. **C-54321-21** - Peugeot 208 (2021) - Inactive
4. **D-11223-18** - Dacia Logan (2019) - Active
5. **E-99887-24** - Hyundai Tucson (2024) - Active

### Maintenances (15)
- **3 en retard** (next_maintenance_date dans le passé)
- **12 à jour** (next_maintenance_date dans le futur)
- Types variés : vidange, pneus, inspection, freins, batterie
- Coûts réalistes : 120 - 500 DH

## 🧪 Tests de Validation

### Tester les Relations
```bash
php artisan tinker
```

```php
// Récupérer un véhicule avec ses maintenances
$vehicle = App\Models\Vehicle::with('maintenances')->first();
echo $vehicle->maintenances->count() . " maintenances";

// Vérifier si un véhicule a des maintenances en retard
$vehicle = App\Models\Vehicle::first();
echo $vehicle->hasOverdueMaintenance() ? "A des maintenances en retard" : "Aucune maintenance en retard";

// Récupérer la dernière maintenance d'un véhicule
$latest = App\Models\Vehicle::first()->latestMaintenance;
echo $latest->maintenance_type;

// Compter les maintenances en retard
$overdue = App\Models\Maintenance::whereNotNull('next_maintenance_date')
    ->whereDate('next_maintenance_date', '<', now())
    ->count();
echo $overdue . " maintenances en retard";

// Vérifier si une maintenance est en retard
$maintenance = App\Models\Maintenance::first();
echo $maintenance->isOverdue() ? "En retard" : "À jour";

// Récupérer tous les véhicules avec maintenances en retard
$vehicles = App\Models\Vehicle::whereHas('maintenances', function($query) {
    $query->whereNotNull('next_maintenance_date')
          ->whereDate('next_maintenance_date', '<', now());
})->get();
echo $vehicles->count() . " véhicules ont des maintenances en retard";
```

## ✨ Fonctionnalités Implémentées

✅ Migrations complètes avec contraintes de clés étrangères  
✅ Soft deletes sur les véhicules  
✅ Enums pour role, status et maintenance_type  
✅ Relations Eloquent bidirectionnelles  
✅ Méthodes helper sur les modèles  
✅ Seeders avec données réalistes  
✅ 3 maintenances en retard pour tests  
✅ Cast automatique des types (dates, decimals)  
✅ Validation des données via fillable  
✅ Timestamps automatiques  

## 🎯 Prochaines Étapes

1. Implémenter les Controllers API
2. Créer les routes API
3. Ajouter l'authentification avec Sanctum
4. Développer les fonctionnalités CRUD
5. Créer le frontend React
6. Connecter frontend et backend

---

**La couche Database & Models est maintenant complète et fonctionnelle!** ✅
