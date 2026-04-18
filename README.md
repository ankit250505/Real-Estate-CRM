# Real Estate CRM

Full-stack Real Estate CRM built with React, Vite, TypeScript, Tailwind CSS, Express, Prisma, PostgreSQL, and JWT authentication.

## Features

- Authentication with RBAC for `ADMIN`, `MANAGER`, and `AGENT`
- Lead, property, client, deal, task, notification, and report modules
- Dashboard analytics with charts and exports
- File uploads with local storage abstraction
- Follow-up reminders with `node-cron`
- Excel and PDF report export
- Seed data for local demos
- Unit, API, and component tests

## Project Structure

```text
backend/   Express + Prisma API
frontend/  React + Vite client
```

## Quick Start

1. Install dependencies:

```bash
npm run install:all
```

2. Copy env files:

```bash
copy backend\\.env.example backend\\.env
copy frontend\\.env.example frontend\\.env
```

3. Configure PostgreSQL in `backend/.env`.

4. Generate Prisma client and run migrations:

```bash
cd backend
npm run prisma:generate
npm run prisma:migrate
npm run seed
```

5. Start backend and frontend in separate terminals:

```bash
npm run dev:backend
npm run dev:frontend
```

## Default Seed Login

- Email: `admin@realestatecrm.local`
- Password: `Admin@123`

## Backend Notes

- API base: `http://localhost:5000/api`
- Health: `GET /health`
- Sample API docs: [backend/src/docs/API.md](backend/src/docs/API.md)

## Frontend Notes

- App base: `http://localhost:5173`
- The app stores auth state in local storage and refreshes protected data with TanStack Query.

## Testing

```bash
npm run test --workspace backend
npm run test --workspace frontend
```
