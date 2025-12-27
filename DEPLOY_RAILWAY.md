Railway deployment notes

Backend (service):
- Ensure `backend/package.json` has a `start` script (done).
- `backend/Procfile` is present: `web: node server.js`.
- Set environment variables on Railway project:
  - `PORT` (Railway sets automatically)
  - `MONGO_URI` (your MongoDB connection string)
  - Any JWT or other secrets (e.g., `JWT_SECRET`)
- Deploy the `backend` folder as a Node service or add a service pointing to the backend directory.

Frontend (static site service):
- `frontend/package.json` will run `npm run build` on `postinstall` and start with `serve -s build`.
- On Railway, create a separate service for the frontend (Node) and point it to the `frontend` folder.

Notes:
- Railway will run `npm install` then `postinstall` which builds the React app; the `start` script runs `serve -s build`.
- Alternatively, deploy the frontend as a static site using Railway static hosting or another provider (Vercel/Netlify) using the `frontend/build` output.

Local quick checks:
- Backend: from `backend` run:

```powershell
cd backend
npm install
npm run start
```

- Frontend (dev): from `frontend` run:

```powershell
cd frontend
npm install
npm run dev
```

- Frontend (simulate production locally):

```powershell
cd frontend
npm install
npm run build
npx serve -s build
```

If you want, I can:
- Commit these changes and create a git branch.
- Walk through creating Railway services and adding environment variables with screenshots.
- Configure a single Railway project with two services (backend + frontend).
