# 💰 Personal Finance Tracker

A modern, full-stack personal finance management application built with React, Node.js, and MongoDB. Track your income, expenses, and financial goals with a beautiful, professional interface.

![Finance Tracker](https://img.shields.io/badge/React-18.3.1-blue)
![Node.js](https://img.shields.io/badge/Node.js-22.14.0-green)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-blue)

## ✨ Features

### 🎯 Core Features
- **📊 Dashboard**: Real-time financial overview with income, expenses, and balance tracking
- **💳 Transaction Management**: Add, edit, and delete financial transactions
- **📈 Analytics**: Visual charts and insights for spending patterns
- **👥 User Management**: Role-based access control (Admin, User, Read-only)
- **🔐 Authentication**: Secure JWT-based authentication system
- **📱 Responsive Design**: Works perfectly on desktop and mobile devices

### 🎨 Modern UI/UX
- **Glass-morphism Design**: Modern glass effects and backdrop blur
- **Gradient Themes**: Beautiful gradient color schemes
- **Smooth Animations**: Professional micro-interactions and transitions
- **Dark/Light Mode Ready**: Built-in theme support
- **Professional Typography**: Clean, readable fonts and spacing

### 🔧 Technical Features
- **Real-time Updates**: Live data synchronization
- **Search & Filter**: Advanced transaction filtering
- **Pagination**: Efficient data loading
- **Error Handling**: Graceful error management
- **API Documentation**: Built-in Swagger documentation

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas account (or local MongoDB)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/personal-finance-tracker.git
   cd personal-finance-tracker
   ```

2. **Install dependencies**
   ```bash
   # Install backend dependencies
   cd project/backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. **Environment Setup**

   **Backend (.env)**
   ```env
   MONGODB_URI=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/finance-tracker
   JWT_SECRET=your-super-secret-jwt-key-change-in-production
   PORT=5000
   NODE_ENV=development
   ```

   **Frontend (.env)**
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```
   
   **For Production Deployment**
   ```env
   VITE_API_URL=https://techbridgefinancetrack.onrender.com/api
   ```

4. **Start the application**
   ```bash
   # Start backend server
   cd project/backend
   npm start

   # Start frontend (in new terminal)
   cd project/frontend
   npm run dev
   ```

5. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000
   - API Documentation: http://localhost:5000/api-docs

## 📋 Demo Credentials

### Admin Account
- **Email**: admin@demo.com
- **Password**: admin123
- **Role**: Administrator (full access)

### User Account
- **Email**: user@demo.com
- **Password**: user123
- **Role**: User (standard access)

### Read-only Account
- **Email**: readonly@demo.com
- **Password**: readonly123
- **Role**: Read-only (view only)

## 🏗️ Project Structure

```
techbridgetracker/
├── project/
│   ├── backend/
│   │   ├── config/          # Configuration files
│   │   ├── middleware/       # Authentication & validation
│   │   ├── models/          # MongoDB schemas
│   │   ├── routes/          # API endpoints
│   │   └── server.js        # Express server
│   └── frontend/
│       ├── src/
│       │   ├── components/  # Reusable UI components
│       │   ├── contexts/    # React contexts
│       │   ├── pages/       # Application pages
│       │   └── main.jsx     # React entry point
│       └── public/          # Static assets
└── README.md
```

## 🛠️ Technology Stack

### Frontend
- **React 18** - Modern UI library
- **Vite** - Fast build tool
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icons
- **Chart.js** - Data visualization
- **Axios** - HTTP client

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Swagger** - API documentation

## 🔐 Authentication & Authorization

### User Roles
- **Admin**: Full system access, user management
- **User**: Standard access, own transactions
- **Read-only**: View-only access, no modifications

### Security Features
- JWT token-based authentication
- Password hashing with bcrypt
- Role-based access control
- Input validation and sanitization
- CORS protection

## 📊 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/verify` - Token verification

### Transactions
- `GET /api/transactions` - Get user transactions
- `POST /api/transactions` - Create transaction
- `PUT /api/transactions/:id` - Update transaction
- `DELETE /api/transactions/:id` - Delete transaction

### Users (Admin only)
- `GET /api/users` - Get all users
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

## 🎨 Customization

### Styling
The application uses Tailwind CSS with custom components. To modify the design:

1. **Colors**: Update `tailwind.config.js`
2. **Components**: Modify `src/index.css`
3. **Themes**: Add theme context in `src/contexts/ThemeContext.jsx`

### Features
- Add new transaction categories
- Implement budget goals
- Add export functionality
- Integrate with banking APIs

## 🚀 Deployment

### Backend Deployment (Render.com)
Your backend is already deployed at: `https://techbridgefinancetrack.onrender.com`

**To deploy to Render:**
1. Connect your GitHub repository to Render
2. Set environment variables:
   - `MONGODB_URI`: Your MongoDB connection string
   - `JWT_SECRET`: Your JWT secret key
   - `NODE_ENV`: production
3. Build Command: `npm install`
4. Start Command: `npm start`

### Frontend Deployment

#### **Vercel (Recommended)**
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy from frontend directory
cd project/frontend
vercel --prod
```

#### **Netlify**
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build and deploy
cd project/frontend
npm run build
netlify deploy --prod --dir=dist
```

#### **GitHub Pages**
```bash
# Add to package.json
"homepage": "https://yourusername.github.io/FinanceTracker",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}

# Deploy
npm run deploy
```

### Environment Variables for Production

**Frontend (.env):**
```env
VITE_API_URL=https://techbridgefinancetrack.onrender.com/api
```

**Backend (.env):**
```env
MONGODB_URI=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/finance-tracker
JWT_SECRET=your-super-secret-jwt-key-change-in-production
PORT=5000
NODE_ENV=production
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Icons**: [Lucide React](https://lucide.dev/)
- **Charts**: [Chart.js](https://www.chartjs.org/)
- **UI Framework**: [Tailwind CSS](https://tailwindcss.com/)
- **Backend**: [Express.js](https://expressjs.com/)

## 📞 Support

If you have any questions or need help:

- **Issues**: Create an issue on GitHub
- **Email**: support@financetracker.com
- **Documentation**: Check the API docs at `/api-docs`

---

**Made with ❤️ for better financial management** 