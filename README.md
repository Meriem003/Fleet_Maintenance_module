# Fleet & Maintenance Module - Technical Test

**Technology Stack:** Laravel (Backend) + React (Frontend)  
**Developer:** [Salhi Meryem]  

## Overview

This is a full-stack Fleet & Maintenance management system that allows administrators to:
- Manage vehicles (Create, Read, Update, Delete)
- Record maintenance operations for each vehicle
- Track maintenance costs and history
- Receive alerts for overdue maintenance

The application follows REST API architecture with Laravel backend and React frontend, featuring professional UI/UX design specifically tailored for the automotive and mechanical industry.

---

## Features

### Vehicle Management
- ✅ Create new vehicles with detailed information
- ✅ Update vehicle information (plate number, model, year, status)
- ✅ Delete vehicles from the system
- ✅ List all vehicles with filtering and search capabilities
- ✅ View individual vehicle details with complete maintenance history

### Maintenance Management
- ✅ Add maintenance records to vehicles
- ✅ Track different maintenance types (oil change, tires, inspection, etc.)
- ✅ Record maintenance dates and costs
- ✅ View complete maintenance history per vehicle
- ✅ Update or delete maintenance records

### Alert System
- ✅ Automatic detection of overdue maintenance
- ✅ Visual alerts in dashboard and vehicle listings
- ✅ Status indicators for maintenance requirements
- ✅ Real-time statistics display

---

## Installation Steps

### Prerequisites
- PHP 8.1 or higher
- Composer
- Node.js 16+ and npm
- MySQL 8.0+
- Git

### Backend Setup (Laravel)

1. **Clone the repository**
```bash
git clone < https://github.com/Meriem003/Fleet_Maintenance_module.git >
cd Fleet_Maintenance_module
```

2. **Navigate to backend directory**
```bash
cd backend
```

3. **Install PHP dependencies**
```bash
composer install
```

4. **Configure environment**
```bash
cp .env.example .env
```

5. **Edit `.env` file with your database credentials**
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=fleet_maintenance
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

6. **Generate application key**
```bash
php artisan key:generate
```

7. **Run database migrations**
```bash
php artisan migrate
```

8. **Seed database with sample data (optional)**
```bash
php artisan db:seed
```

9. **Start Laravel development server**
```bash
php artisan serve
```

The backend API will be available at `http://localhost:8000`

### Frontend Setup (React)

1. **Navigate to frontend directory**
```bash
cd frontend
```

2. **Install npm dependencies**
```bash
npm install
```

3. **Configure API endpoint (if needed)**

Edit `src/services/api.js` to point to your backend URL:
```javascript
const API_BASE_URL = 'http://localhost:8000/api';
```

4. **Start React development server**
```bash
npm start
```

The frontend application will be available at `http://localhost:3000`

### Default Login Credentials

```
Email: admin@fleet.com
Password: password123
```

---

### Entity-Relationship Diagram

```
┌─────────────────┐
│     users       │
│─────────────────│
│ id (PK)         │
│ name            │
│ email           │
│ password        │
│ created_at      │
│ updated_at      │
└─────────────────┘

┌─────────────────┐           ┌──────────────────┐
│    vehicles     │           │   maintenances   │
│─────────────────│           │──────────────────│
│ id (PK)         │───────────│ id (PK)          │
│ plate_number    │    1:N    │ vehicle_id (FK)  │
│ model           │           │ maintenance_type │
│ year            │           │ maintenance_date │
│ status          │           │ cost             │
│ created_at      │           │ description      │
│ updated_at      │           │ created_at       │
└─────────────────┘           │ updated_at       │
                              └──────────────────┘
```

## Technologies Used

### Backend
- **Laravel 12.x** - PHP Framework
- **Laravel Sanctum** - API Authentication
- **MySQL** - Relational Database
- **PHP 8.1+** - Programming Language

### Frontend
- **React 19** - JavaScript Library
- **React Router** - Client-side Routing
- **Framer Motion** - Animation Library
- **Tailwind CSS** - Utility-first CSS Framework
- **Lucide React** - Icon Library
- **React Hot Toast** - Notification System
- **Axios** - HTTP Client

### Development Tools
- **Composer** - PHP Dependency Manager
- **npm** - JavaScript Package Manager
- **Git** - Version Control
- **VS Code** - Code Editor

---

## Project Structure

```
Fleet_Maintenance_module/
├── backend/                      # Laravel REST API
│   ├── app/
│   │   ├── Http/
│   │   │   ├── Controllers/     # API Controllers
│   │   │   │   ├── AuthController.php
│   │   │   │   ├── VehicleController.php
│   │   │   │   └── MaintenanceController.php
│   │   │   ├── Requests/        # Form Request Validation
│   │   │   ├── Resources/       # API Resources
│   │   │   └── Middleware/      # Custom Middleware
│   │   ├── Models/              # Eloquent Models
│   │   │   ├── User.php
│   │   │   ├── Vehicle.php
│   │   │   └── Maintenance.php
│   │   └── Services/            # Business Logic
│   │       ├── AuthService.php
│   │       ├── VehicleService.php
│   │       └── MaintenanceService.php
│   ├── database/
│   │   ├── migrations/          # Database Migrations
│   │   ├── factories/           # Model Factories
│   │   └── seeders/             # Database Seeders
│   ├── routes/
│   │   └── api.php              # API Routes
│   ├── tests/                   # PHPUnit Tests
│   └── .env.example             # Environment Configuration
│
├── frontend/                     # React Application
│   ├── public/
│   ├── src/
│   │   ├── components/          # Reusable Components
│   │   │   ├── common/         # Common UI Components
│   │   │   ├── layout/         # Layout Components
│   │   │   └── features/       # Feature-specific Components
│   │   ├── pages/              # Page Components
│   │   │   ├── LoginPage.jsx
│   │   │   ├── DashboardPage.jsx
│   │   │   ├── VehiclesListPage.jsx
│   │   │   └── VehicleDetailsPage.jsx
│   │   ├── context/            # React Context
│   │   │   └── AuthContext.jsx
│   │   ├── services/           # API Services
│   │   │   ├── api.js
│   │   │   └── vehicles.js
│   │   ├── App.js              # Main App Component
│   │   └── index.js            # Entry Point
│   ├── package.json
│   └── tailwind.config.js      # Tailwind Configuration
│
├── THEME_DOCUMENTATION.md       # Design System Documentation
├── QUICK_START.md              # Quick Start Guide
├── COLOR_PALETTE.md            # Color Palette Reference
└── README.md                   # This File
```

---

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
- **VehicleDetails** - Show vehicle details and maintenance history 
- **AddMaintenance** - Form to add new maintenance (placeholder)
 
**Ready to start coding!** 🚀