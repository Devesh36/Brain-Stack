# Mind Stack (BrainStack)

A full‑stack knowledge hub for organizing and sharing notes, links and collections.  
Frontend is a Vite + React + TypeScript app (BrainStack UI). Backend is an Express + TypeScript API with MongoDB (Mongoose).

---

## Demo / Purpose

This project provides:
- Personal knowledge management (notes, links, tags)
- User auth (signup / signin / verify)
- Simple content creation modal (title, optional link, description)
- Role for both local MongoDB and MongoDB Atlas

---

## Quickstart

Prerequisites
- Node.js 18+
- pnpm recommended (npm/yarn ok)
- MongoDB (local `mongod` or MongoDB Atlas)

Clone
```bash
git clone <repo-url> mind-stack
cd mind-stack
```

Backend (dev)
```bash
cd backend
cp .env.example .env     # then edit .env
pnpm install             # or npm install
pnpm run dev             # or npm run dev
```

Frontend (dev)
```bash
cd frontend
cp .env.example .env     # if present
pnpm install             # or npm install
pnpm run dev             # or npm run dev
# open http://localhost:5173 (Vite default)
```

Build (production)
```bash
# frontend
cd frontend
pnpm run build

# backend (if build script exists)
cd backend
pnpm run build
```

---

## Environment variables

Backend expects a `.env` inside `backend/`:

- PORT - server port (e.g. 5001)
- JWT_SECRET - JWT signing secret
- MONGO_URI - MongoDB connection string (Atlas or local)
- FRONTEND_URL - allowed frontend origin (CORS)

Example (backend/.env)
```
PORT=5001
JWT_SECRET=your_jwt_secret
MONGO_URI=
FRONTEND_URL=http://localhost:5173
```

Notes:
- If using Atlas, allow your IP in Network Access.
- URL‑encode special characters in passwords (use `encodeURIComponent`).

---

## Scripts (top-level folders)

Backend (backend/package.json)
- dev — starts nodemon + ts-node for local dev
- build, start — may be configured

Frontend (frontend/package.json)
- dev — vite dev server
- build — build static assets
- preview — preview production build

Run scripts via pnpm or npm.

---

## Project structure (important parts)

- backend/
  - api/
    - controllers/         # auth and user controllers
    - routes/              # auth.routes.ts, user.routes.ts
    - db/                  # mongoose connection
    - middleware/          # auth middleware
    - models/              # mongoose models (user, content, tags)
    - types/
  - .env, package.json, tsconfig.json

- frontend/
  - src/
    - components/          # UI components, CreateContentModal.tsx
    - pages/               # signin, signup, dashboard
    - lib/                 # axios wrapper
    - hooks/               # useContent, etc.
  - package.json, vite.config.ts

---



---

## Contributing

- Open an issue or PR.
- Keep changes small and focused.
- Add tests for new behavior where applicable.

---

