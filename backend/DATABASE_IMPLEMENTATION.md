# 🗄️ DATABASE & MODELS - Guide d'Exécution

## 📋 Vue d'ensemble

Ce document décrit l'implémentation complète de la couche Database & Models pour le système Fleet & Maintenance.

---

## 🎯 Ce qui a été implémenté

### ✅ MIGRATIONS (3 fichiers)

1. **users** - Utilisateurs avec rôles admin/user
2. **vehicles** - Véhicules avec soft deletes
3. **maintenances** - Maintenances avec relations et coûts

### ✅ MODELS (3 fichiers)

1. **User.php** - Avec méthode `isAdmin()`
2. **Vehicle.php** - Avec relations et `hasOverdueMaintenance()`
3. **Maintenance.php** - Avec relation et `isOverdue()`

### ✅ SEEDERS (4 fichiers)

1. **UserSeeder** - 2 utilisateurs (admin + user)
2. **VehicleSeeder** - 5 véhicules variés
3. **MaintenanceSeeder** - 15 maintenances (3 en retard!)
4. **DatabaseSeeder** - Orchestrateur principal

---

## 🚀 Commandes d'Exécution

### Étape 1: Réinitialiser la base de données

```bash
php artisan migrate:fresh
```

**⚠️ ATTENTION:** Cette commande supprime TOUTES les données existantes!

### Étape 2: Exécuter les seeders

```bash
php artisan db:seed
```

Ou en une seule commande:

```bash
php artisan migrate:fresh --seed
```

---

## 👥 Données de Test Créées

### Utilisateurs

| Email | Password | Rôle |
|-------|----------|------|
| admin@fleet.com | password123 | admin |
| user@fleet.com | password123 | user |

### Véhicules

- **5 véhicules** créés
- Modèles: Toyota Corolla, Renault Clio, Peugeot 208, Dacia Logan, Hyundai Tucson
- Années: 2019-2024
- Statuts: mix active/inactive

### Maintenances

- **15 maintenances** créées
- **3 maintenances EN RETARD** (next_maintenance_date dans le passé)
- Types: oil_change, tires, inspection, brake_service, battery_replacement, other
- Coûts: 50 DH - 500 DH

---

## 🧪 Tester les Fonctionnalités

### Test 1: Vérifier les véhicules avec maintenances en retard

```bash
php artisan tinker
```

```php
// Dans tinker:
Vehicle::all()->each(function($v) {
    echo $v->plate_number . ' - En retard: ' . ($v->hasOverdueMaintenance() ? 'OUI' : 'NON') . "\n";
});
```

### Test 2: Lister toutes les maintenances en retard

```php
Maintenance::all()->filter(fn($m) => $m->isOverdue())->each(function($m) {
    echo $m->vehicle->plate_number . ' - ' . $m->maintenance_type . ' - ' . $m->next_maintenance_date . "\n";
});
```

### Test 3: Vérifier les rôles utilisateurs

```php
User::all()->each(function($u) {
    echo $u->name . ' - Admin: ' . ($u->isAdmin() ? 'OUI' : 'NON') . "\n";
});
```

---

## 📊 Structure de la Base de Données

### Table: users
```
- id (PK)
- name
- email (unique)
- password (hashed)
- role (enum: admin, user)
- email_verified_at
- remember_token
- timestamps
```

### Table: vehicles
```
- id (PK)
- plate_number (unique)
- model
- year
- status (enum: active, inactive)
- timestamps
- deleted_at (soft delete)
```

### Table: maintenances
```
- id (PK)
- vehicle_id (FK → vehicles.id, cascade)
- maintenance_type (enum: oil_change, tires, inspection, brake_service, battery_replacement, other)
- maintenance_date
- next_maintenance_date (nullable)
- cost (decimal 10,2)
- notes (text, nullable)
- timestamps
```

---

## 🔗 Relations Eloquent

### User
- Aucune relation pour le moment (peut être étendu)

### Vehicle
- `maintenances()` → HasMany → Maintenance
- `latestMaintenance()` → HasOne → Maintenance

### Maintenance
- `vehicle()` → BelongsTo → Vehicle

---

## ✨ Méthodes Helper Importantes

### User Model
```php
$user->isAdmin() // Retourne true si admin
```

### Vehicle Model
```php
$vehicle->hasOverdueMaintenance() // Retourne true si maintenance en retard
$vehicle->latestMaintenance // Récupère la dernière maintenance
$vehicle->maintenances // Collection de toutes les maintenances
```

### Maintenance Model
```php
$maintenance->isOverdue() // Retourne true si next_maintenance_date dans le passé
$maintenance->vehicle // Le véhicule associé
```

---

## 🎓 Exemples d'Utilisation

### Récupérer tous les véhicules actifs avec leurs maintenances
```php
$vehicles = Vehicle::where('status', 'active')
    ->with('maintenances')
    ->get();
```

### Trouver les véhicules nécessitant une maintenance urgente
```php
$overdueVehicles = Vehicle::all()->filter(fn($v) => $v->hasOverdueMaintenance());
```

### Calculer le coût total des maintenances par véhicule
```php
$vehicle = Vehicle::find(1);
$totalCost = $vehicle->maintenances->sum('cost');
```

### Compter les maintenances par type
```php
$counts = Maintenance::selectRaw('maintenance_type, COUNT(*) as count')
    ->groupBy('maintenance_type')
    ->get();
```

---

## 📝 Notes Importantes

- ✅ Toutes les migrations utilisent les types de données appropriés
- ✅ Foreign keys avec cascade delete configurées
- ✅ Soft deletes activé sur vehicles
- ✅ Casts configurés pour dates et decimals
- ✅ DocBlocks en français pour faciliter la compréhension
- ✅ PSR-12 respecté
- ✅ Laravel 11+ syntax utilisé

---

## 🎯 Prochaines Étapes

Maintenant que la couche Database & Models est complète, vous pouvez:

1. Implémenter les Controllers API
2. Créer les routes d'API
3. Ajouter l'authentification Sanctum
4. Développer le frontend React
5. Tester les endpoints avec Postman

---

**✅ Implémentation terminée avec succès!**
