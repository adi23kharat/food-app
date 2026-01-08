# Pre-Deployment Checklist ✓

## Code Preparation

- [x] Updated CORS to accept environment variable for frontend URL
- [x] Created `.env.example` with all required variables
- [x] Verified `backend/Procfile` is set correctly
- [x] Confirmed `frontend/package.json` has build and serve scripts
- [x] Root `package.json` configured as monorepo

## Environment Setup (Complete This Before Deployment)

### MongoDB Atlas
- [ ] Create MongoDB Atlas cluster at https://www.mongodb.com/cloud/atlas
- [ ] Create database user with secure password
- [ ] Copy connection string: `mongodb+srv://user:pass@cluster.mongodb.net/dbname`
- [ ] Add IP whitelist: `0.0.0.0/0` (or your IP)
- [ ] Generate 2-3 secure strings for:
  - [ ] `JWT_SECRET` (use: `openssl rand -base64 32`)
  - [ ] Any other secrets

### GitHub
- [ ] Initialize Git in your project: `git init`
- [ ] Add all files: `git add .`
- [ ] Initial commit: `git commit -m "Initial commit - ready for deployment"`
- [ ] Create GitHub repository
- [ ] Push to GitHub: `git push -u origin main`

## Railway Deployment Steps

### 1. Create Railway Account
- [ ] Go to https://railway.app
- [ ] Sign in with GitHub

### 2. Create Project
- [ ] Click "New Project"
- [ ] Select "Deploy from GitHub repo"
- [ ] Select your food-website repository

### 3. Create Backend Service
- [ ] Click "Add Service" → "GitHub"
- [ ] Configure:
  - Root directory: `/backend`
  - Build command: `npm install`
  - Start command: `node server.js`
  - Port: 5000

### 4. Set Backend Environment Variables
```
mongodb_URI = mongodb+srv://user:password@cluster.mongodb.net/dbname
JWT_SECRET = your_generated_secret_here
FRONTEND_URL = https://your-frontend-url.railway.app
IMAGEKIT_PUBLIC_KEY = your_key
IMAGEKIT_PRIVATE_KEY = your_key
IMAGEKIT_URL_ENDPOINT = your_endpoint
```

### 5. Create Frontend Service
- [ ] Click "Add Service" → "GitHub"
- [ ] Configure:
  - Root directory: `/frontend`
  - Build command: `npm install && npm run build`
  - Start command: `serve -s build`
  - Port: 3000

### 6. Set Frontend Environment Variables
```
REACT_APP_API_URL = https://your-backend-url.railway.app
```

### 7. Configure Public Domains
- [ ] Backend: Generate public URL (e.g., `backend-abc123.railway.app`)
- [ ] Frontend: Generate public URL (e.g., `frontend-abc123.railway.app`)

### 8. Verify Deployment
- [ ] Check backend logs for "Server is running"
- [ ] Check frontend build completed successfully
- [ ] Test backend: `curl https://your-backend-url.railway.app/`
- [ ] Test frontend: Open `https://your-frontend-url.railway.app/`
- [ ] Login and test functionality

## Continuous Deployment

From now on, simply push to GitHub and Railway will auto-deploy:

```powershell
git add .
git commit -m "Your changes"
git push origin main
```

## Troubleshooting

- **MongoDB connection fails**: Check credentials and IP whitelist
- **CORS errors**: Verify `FRONTEND_URL` matches your frontend domain
- **Build fails**: Check Railway logs for specific errors
- **Port 5000 already in use**: Railway sets `PORT` automatically

## Success! 🚀

Once both services show green checkmarks and are running, your food website is live!

Contact Railway support: https://docs.railway.app/
