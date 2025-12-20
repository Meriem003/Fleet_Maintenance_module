# Fleet & Maintenance Module - Technical Test

## Overview
Full-stack application starter for Fleet & Maintenance Module technical test.

**⚠️ IMPORTANT**: This is a clean starter structure with NO business logic implemented. All components and controllers are empty placeholders ready for implementation.

## Tech Stack

### Backend
- **Laravel 12.x** - REST API
- **Laravel Sanctum** - Authentication (structure only)
- **SQLite** - Database

### Frontend
- **React 18.x** - User Interface
- No styling framework (to be added)
- No routing library installed yet

## Project Structure

```
Fleet_Maintenance_module/
├── backend/              # Laravel REST API
│   ├── app/
│   │   ├── Http/Controllers/Api/  # Empty controllers
│   │   └── Models/                # Placeholder models
│   ├── database/
│   │   └── migrations/            # Basic migration templates
│   └── routes/
│       └── api.php                # API routes structure
│
├── frontend/             # React Application
│   └── src/
│       ├── pages/                 # Empty page components
│       ├── services/              # API config only
│       └── components/            # Empty folder
│
└── README.md             # This file
```

## Quick Start

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
composer install
```

3. Copy environment file:
```bash
cp .env.example .env
```

4. Generate application key:
```bash
php artisan key:generate
```

5. Run migrations:
```bash
php artisan migrate
```

6. Start Laravel server:
```bash
php artisan serve
```

Backend API will be available at: `http://localhost:8000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Start React development server:
```bash
npm start
```

Frontend will be available at: `http://localhost:3000`

## API Endpoints (Structure Only)

### Authentication
- `POST /api/login` - User login (not implemented)
- `POST /api/register` - User registration (not implemented)
- `POST /api/logout` - User logout (not implemented)

### Vehicles
- `GET /api/vehicles` - List all vehicles
- `GET /api/vehicles/{id}` - Get vehicle details
- `POST /api/vehicles` - Create vehicle
- `PUT /api/vehicles/{id}` - Update vehicle
- `DELETE /api/vehicles/{id}` - Delete vehicle

### Maintenances
- `GET /api/maintenances` - List all maintenances
- `GET /api/maintenances/{id}` - Get maintenance details
- `POST /api/maintenances` - Create maintenance
- `PUT /api/maintenances/{id}` - Update maintenance
- `DELETE /api/maintenances/{id}` - Delete maintenance

## Frontend Pages (Empty)

- **Login** - Login form (placeholder)
- **VehiclesList** - Display all vehicles (placeholder)
- **VehicleDetails** - Show vehicle details and maintenance history (placeholder)
- **AddMaintenance** - Form to add new maintenance (placeholder)

## What's NOT Included

✗ Business logic implementation  
✗ CRUD operations  
✗ Database relationships  
✗ Authentication logic  
✗ Form validation  
✗ API integration  
✗ Routing configuration  
✗ UI/Styling frameworks  
✗ Error handling  
✗ State management  

## What IS Included

✓ Clean project structure  
✓ Laravel API skeleton  
✓ React component structure  
✓ Empty controllers and models  
✓ Basic migration files  
✓ API routes configuration  
✓ Sanctum installation  
✓ API service configuration  
✓ Development environment setup  

## Documentation

- [Backend Documentation](./backend/README.md)
- [Frontend Documentation](./frontend/README.md)

## Requirements

- PHP >= 8.2
- Composer
- Node.js >= 16.x
- npm or yarn
- SQLite

## Notes for Technical Test

This structure provides a clean foundation to:
1. Implement authentication system
2. Create database migrations with proper fields
3. Develop CRUD operations for vehicles and maintenances
4. Build React components with forms and lists
5. Connect frontend to backend API
6. Add routing and navigation
7. Implement error handling and validation

All files are ready to receive implementation code without needing structural changes.

---

**Ready to start coding!** 🚀
