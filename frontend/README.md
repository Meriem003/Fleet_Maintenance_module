# Fleet & Maintenance Module - Frontend

## Overview
React frontend application for Fleet & Maintenance Module technical test.

## Tech Stack
- React 18.x
- React Router (to be installed)
- Axios (to be installed)

## Project Structure

```
frontend/
├── src/
│   ├── pages/
│   │   ├── Login.jsx (empty - login page)
│   │   ├── VehiclesList.jsx (empty - vehicles list)
│   │   ├── VehicleDetails.jsx (empty - vehicle details)
│   │   └── AddMaintenance.jsx (empty - add maintenance form)
│   ├── services/
│   │   └── api.js (basic API config only)
│   ├── components/
│   │   └── index.js (empty components folder)
│   ├── App.js
│   └── index.js
└── .env.example
```

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create environment file:
```bash
cp .env.example .env
```

3. Start development server:
```bash
npm start
```
The application will open at [http://localhost:3000](http://localhost:3000)

## API Configuration

Located in `src/services/api.js`:
- Base URL configured via environment variables
- Default: `http://localhost:8000/api`
- Ready for axios integration

## Next Steps (Not Implemented)

1. Install React Router for navigation
2. Install Axios for API calls
3. Implement authentication flow
4. Connect pages to backend API
5. Add form validation
6. Create reusable components
7. Add error handling
8. Implement routing logic

## Notes
- All components are empty placeholders
- No business logic implemented
- No styling or UI framework added
- No API integration yet
- No routing configured
- Ready for technical test implementation
