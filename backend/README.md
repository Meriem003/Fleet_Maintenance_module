# Fleet & Maintenance Module - Backend API

## Overview
Laravel REST API backend for Fleet & Maintenance Module technical test.

## Tech Stack
- Laravel 12.x
- Laravel Sanctum (Authentication)
- SQLite (Database)

## Project Structure

```
backend/
├── app/
│   ├── Http/
│   │   └── Controllers/
│   │       └── Api/
│   │           ├── AuthController.php (empty - auth endpoints)
│   │           ├── VehicleController.php (empty - vehicle endpoints)
│   │           └── MaintenanceController.php (empty - maintenance endpoints)
│   └── Models/
│       ├── Vehicle.php (placeholder)
│       └── Maintenance.php (placeholder)
├── database/
│   └── migrations/
│       ├── create_vehicles_table.php (placeholder)
│       └── create_maintenances_table.php (placeholder)
└── routes/
    └── api.php (configured routes structure)
```

## Installation

1. Install dependencies:
```bash
composer install
```

2. Copy environment file:
```bash
cp .env.example .env
```

3. Generate application key:
```bash
php artisan key:generate
```

4. Run migrations:
```bash
php artisan migrate
```

5. Start development server:
```bash
php artisan serve
```

## API Endpoints Structure

### Authentication
- `POST /api/login` - User login
- `POST /api/register` - User registration
- `POST /api/logout` - User logout (protected)

### Vehicles
- `GET /api/vehicles` - List all vehicles (protected)
- `GET /api/vehicles/{id}` - Get vehicle details (protected)
- `POST /api/vehicles` - Create vehicle (protected)
- `PUT /api/vehicles/{id}` - Update vehicle (protected)
- `DELETE /api/vehicles/{id}` - Delete vehicle (protected)

### Maintenances
- `GET /api/maintenances` - List all maintenances (protected)
- `GET /api/maintenances/{id}` - Get maintenance details (protected)
- `POST /api/maintenances` - Create maintenance (protected)
- `PUT /api/maintenances/{id}` - Update maintenance (protected)
- `DELETE /api/maintenances/{id}` - Delete maintenance (protected)

## Notes
- Controllers are empty - ready for implementation
- Models are placeholders - need fillable fields and relationships
- Migrations are basic templates - need column definitions
- Sanctum is installed but not fully configured
- No business logic implemented
