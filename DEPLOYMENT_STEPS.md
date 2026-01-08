# Deployment Guide - Food Website (MERN Stack)

This guide walks you through deploying your MERN food website to Railway with MongoDB Atlas.

## Prerequisites

1. **GitHub Account** - Railway deploys from GitHub
2. **MongoDB Atlas Account** - For cloud database (free tier available)
3. **Railway Account** - Free tier with $5 monthly credits
4. **Git Repository** - Push your code to GitHub first

## Step 1: Prepare Your Repository

```powershell
# Initialize Git (if not already done)
git init

# Add all files
git add .

# Commit changes
git commit -m "Prepare for deployment"

# Add your GitHub remote
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Step 2: Set Up MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account and cluster
3. Create a database user with username and password
4. Get your connection string (looks like: `mongodb+srv://user:password@cluster.mongodb.net/dbname`)
5. Add your IP to the IP Whitelist (or allow all IPs: 0.0.0.0/0)

## Step 3: Deploy Backend to Railway

1. Go to [Railway.app](https://railway.app)
2. Sign in with GitHub
3. Click **"Create New Project"** → **"Deploy from GitHub repo"**
4. Select your repository
5. Railway will auto-detect the project structure
6. Create two services:

### Service 1: Backend (Node.js)
- **GitHub branch**: main
- **Root directory**: `/backend`
- **Build command**: `npm install`
- **Start command**: `node server.js`

### Service 2: Frontend (Node.js / Static)
- **GitHub branch**: main
- **Root directory**: `/frontend`
- **Build command**: `npm install && npm run build`
- **Start command**: `serve -s build`
- **Port**: 3000

## Step 4: Set Environment Variables

In Railway dashboard for each service:

### Backend Environment Variables

1. Click on the **Backend service**
2. Go to **Variables** tab
3. Add these variables:

```
mongodb_URI = mongodb+srv://username:password@cluster.mongodb.net/dbname
JWT_SECRET = your_secure_secret_key_here
FRONTEND_URL = https://your-frontend-url.railway.app
PORT = 5000
IMAGEKIT_PUBLIC_KEY = your_key_here
IMAGEKIT_PRIVATE_KEY = your_key_here
IMAGEKIT_URL_ENDPOINT = your_endpoint_here
```

### Frontend Environment Variables

```
REACT_APP_API_URL = https://your-backend-url.railway.app
```

> Replace `your-*-url.railway.app` with your actual Railway-assigned domains

## Step 5: Configure Network & Domains

1. Go to each service in Railway
2. Click **Settings** → **Networking**
3. Generate or assign a public domain for both backend and frontend
4. Backend domain will look like: `your-backend-abc123.railway.app`
5. Frontend domain will look like: `your-frontend-abc123.railway.app`

## Step 6: Update CORS in Code

The CORS is already configured to read from environment variables. Ensure your backend's `app.js` has:

```javascript
const allowedOrigins = [
  "http://localhost:3000",
  process.env.FRONTEND_URL || ""
];
```

## Step 7: Verify Deployment

1. Check Railway **Deployments** tab for both services
2. Look for green checkmarks indicating successful builds
3. Click on logs to view any errors
4. Test the backend: `https://your-backend-url.railway.app/`
5. Test the frontend: `https://your-frontend-url.railway.app/`

## Common Issues & Solutions

### MongoDB Connection Fails
- ✓ Check `mongodb_URI` has correct username/password
- ✓ Verify MongoDB Atlas IP whitelist includes 0.0.0.0/0
- ✓ Check internet connection in Railway logs

### CORS Errors
- ✓ Verify `FRONTEND_URL` environment variable is set correctly
- ✓ Add `FRONTEND_URL` to the allowed origins in backend

### Frontend Shows 404
- ✓ Verify `REACT_APP_API_URL` points to backend domain
- ✓ Check that `npm run build` completes successfully
- ✓ Ensure `postinstall` script runs (builds React app)

### Port Issues
- ✓ Railway automatically assigns `PORT` environment variable
- ✓ Backend should listen on `process.env.PORT || 5000`

## Pushing Updates

After making changes:

```powershell
git add .
git commit -m "Your changes description"
git push origin main
```

Railway will automatically redeploy when you push to GitHub.

## Monitoring & Logs

1. Go to your Railway project
2. Click on each service
3. View **Logs** tab for real-time output
4. Check **Metrics** for CPU and memory usage

## Getting Help

- [Railway Documentation](https://docs.railway.app/)
- [MongoDB Atlas Docs](https://docs.atlas.mongodb.com/)
- Check service logs in Railway dashboard for detailed error messages

---

**Your Project is ready for deployment!** 🚀
