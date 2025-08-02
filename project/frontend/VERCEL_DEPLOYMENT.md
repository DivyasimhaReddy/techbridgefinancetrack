# Vercel Deployment Guide

## 🚀 Deploy Frontend to Vercel

### Prerequisites
- GitHub account
- Vercel account (free at [vercel.com](https://vercel.com))

### Step 1: Push Code to GitHub
1. Create a new repository on GitHub
2. Push your frontend code to GitHub:
   ```bash
   cd project/frontend
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/your-repo-name.git
   git push -u origin main
   ```

### Step 2: Deploy to Vercel
1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import your GitHub repository
4. Configure the project:
   - **Framework Preset**: Vite
   - **Root Directory**: `project/frontend` (if deploying from root repo)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

### Step 3: Set Environment Variables
1. In your Vercel project dashboard, go to "Settings" → "Environment Variables"
2. Add the following environment variable:
   - **Name**: `VITE_API_URL`
   - **Value**: `https://techbridgefinancetrack.onrender.com/api`
   - **Environment**: Production, Preview, Development

### Step 4: Deploy
1. Click "Deploy" in Vercel
2. Your app will be deployed to a URL like: `https://your-app-name.vercel.app`

### Step 5: Test the Deployment
1. Visit your deployed URL
2. Test registration and login functionality
3. Verify that the frontend connects to your backend at `https://techbridgefinancetrack.onrender.com`

## 🔧 Environment Variables

The application uses the following environment variable:
- `VITE_API_URL`: Your backend API URL (defaults to `https://techbridgefinancetrack.onrender.com/api`)

## 📝 Notes
- The frontend is configured with fallback URLs, so it will work even if environment variables are not set
- Make sure your backend at `https://techbridgefinancetrack.onrender.com` is running and accessible
- CORS is configured on the backend to allow requests from Vercel domains

## 🐛 Troubleshooting
- If you get CORS errors, check that your backend CORS configuration includes your Vercel domain
- If API calls fail, verify the `VITE_API_URL` environment variable is set correctly
- Check the browser console for any error messages 