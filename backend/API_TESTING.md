# API Testing Guide - Fleet Management System

## 🔐 Authentication

### Login (Admin Only)
```bash
curl -X POST http://localhost:8000/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@fleet.com","password":"password123"}'
```

**Response:**
```json
{
  "user": {
    "id": 1,
    "name": "Admin User",
    "email": "admin@fleet.com",
    "role": "admin"
  },
  "token": "1|your-generated-token-here"
}
```

**Save the token for subsequent requests!**

---

## 🚗 Vehicles API

### Get All Vehicles
```bash
curl -X GET http://localhost:8000/api/vehicles \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Get Vehicle by ID
```bash
curl -X GET http://localhost:8000/api/vehicles/1 \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Create Vehicle
```bash
curl -X POST http://localhost:8000/api/vehicles \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "plate_number": "TEST-123",
    "model": "Tesla Model 3",
    "year": 2024,
    "status": "active"
  }'
```

### Update Vehicle
```bash
curl -X PUT http://localhost:8000/api/vehicles/1 \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "Tesla Model 3 Updated",
    "status": "inactive"
  }'
```

### Delete Vehicle
```bash
curl -X DELETE http://localhost:8000/api/vehicles/1 \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## 🔧 Maintenance API

### Get Maintenance History for Vehicle
```bash
curl -X GET http://localhost:8000/api/vehicles/1/maintenance \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Add Maintenance to Vehicle
```bash
curl -X POST http://localhost:8000/api/vehicles/1/maintenance \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "maintenance_type": "oil_change",
    "maintenance_date": "2024-12-15",
    "next_maintenance_date": "2025-06-15",
    "cost": 250.50,
    "notes": "Regular oil change service"
  }'
```

### Update Maintenance Record
```bash
curl -X PUT http://localhost:8000/api/maintenance/1 \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "cost": 300.00,
    "notes": "Updated cost and notes"
  }'
```

### Delete Maintenance Record
```bash
curl -X DELETE http://localhost:8000/api/maintenance/1 \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## 🚪 Logout
```bash
curl -X POST http://localhost:8000/api/logout \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## 📋 API Endpoints Summary

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/login | Login (Admin only) |
| POST | /api/logout | Logout |
| GET | /api/vehicles | Get all vehicles |
| POST | /api/vehicles | Create vehicle |
| GET | /api/vehicles/{id} | Get vehicle details |
| PUT | /api/vehicles/{id} | Update vehicle |
| DELETE | /api/vehicles/{id} | Delete vehicle |
| GET | /api/vehicles/{id}/maintenance | Get maintenance history |
| POST | /api/vehicles/{id}/maintenance | Add maintenance |
| PUT | /api/maintenance/{id} | Update maintenance |
| DELETE | /api/maintenance/{id} | Delete maintenance |

---

## ✅ Validation Rules

### Vehicle
- **plate_number**: required, string, max:20, unique
- **model**: required, string, max:100
- **year**: required, integer, min:1900, max:current_year+1
- **status**: optional, in:active,inactive

### Maintenance
- **maintenance_type**: required, in:oil_change,tires,inspection,brake_service,battery_replacement,other
- **maintenance_date**: required, date, before_or_equal:today
- **next_maintenance_date**: optional, date, after:maintenance_date
- **cost**: required, numeric, min:0, max:999999.99
- **notes**: optional, string, max:1000

---

## 🛡️ Error Responses

### 401 Unauthorized
```json
{
  "message": "Unauthenticated."
}
```

### 403 Forbidden
```json
{
  "message": "Unauthorized. Admin access only."
}
```

### 404 Not Found
```json
{
  "message": "Resource not found"
}
```

### 422 Validation Error
```json
{
  "message": "The plate number has already been taken.",
  "errors": {
    "plate_number": [
      "The plate number has already been taken."
    ]
  }
}
```

---

## 🧪 Testing with Postman

1. Create a new collection "Fleet Management API"
2. Add environment variable `base_url` = `http://localhost:8000/api`
3. Add environment variable `token` = (empty, will be filled after login)
4. Test login endpoint first
5. Copy token from response and save to environment
6. Use `{{token}}` in Authorization header for other requests

---

## 📝 Notes

- All routes except `/login` require authentication
- Only admin users can access the API
- Tokens are generated using Laravel Sanctum
- All dates are in Y-m-d format
- All timestamps are in Y-m-d H:i:s format
- Soft delete is enabled for vehicles

---

**API is ready for testing!** 🚀
