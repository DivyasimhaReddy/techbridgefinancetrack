# Personal Finance Tracker

A full-stack personal finance management application built with React.js, Node.js, Express.js, and MongoDB.

## Features

- **User Authentication**: JWT-based authentication with role-based access control
- **Role Management**: Support for admin, user, and read-only roles
- **Transaction Management**: Add, edit, delete, and categorize income/expense transactions
- **Analytics Dashboard**: Interactive charts showing spending patterns and trends
- **Performance**: Redis caching, rate limiting, and lazy loading
- **Security**: XSS protection, input validation, and secure API endpoints

## Tech Stack

- **Frontend**: React 18+, Chart.js, React Router
- **Backend**: Node.js, Express.js, MongoDB Atlas, Redis
- **Authentication**: JWT tokens
- **Caching**: Redis for performance optimization

## Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- MongoDB Atlas account
- Redis server (local or cloud)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd personal-finance-tracker
```

2. Install dependencies for all projects:
```bash
npm run install:all
```

3. Setup environment variables:

**Backend (.env)**:
```
MONGODB_URI=mongodb+srv://chinnag927:techbridgee@techbridgee.h3enlwl.mongodb.net/?retryWrites=true&w=majority&appName=techbridgee
JWT_SECRET=your-super-secret-jwt-key
REDIS_URL=redis://localhost:6379
PORT=5000
```

**Frontend (.env)**:
```
VITE_API_URL=http://localhost:5000/api
```

### Running the Application

1. Start the backend server:
```bash
npm run dev:backend
```

2. Start the frontend development server:
```bash
npm run dev:frontend
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## Demo Credentials

- **Admin**: admin@demo.com / admin123
- **User**: user@demo.com / user123
- **Read-only**: readonly@demo.com / readonly123

## API Documentation

The API documentation is available at `http://localhost:5000/api-docs` when the server is running.

## Project Structure

```
personal-finance-tracker/
├── frontend/          # React.js frontend application
├── backend/           # Node.js backend API
└── README.md
```