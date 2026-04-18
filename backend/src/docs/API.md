# API Overview

Base URL: `http://localhost:5000/api`

## Auth

- `POST /auth/login`
- `POST /auth/refresh`
- `GET /auth/me`

## Leads

- `GET /leads`
- `POST /leads`
- `POST /leads/capture`
- `GET /leads/:id`
- `PATCH /leads/:id`

## Users

- `GET /users`
- `POST /users`

## Properties

- `GET /properties`
- `GET /properties/:id`
- `POST /properties`
- `PATCH /properties/:id`

## Clients

- `GET /clients`
- `GET /clients/:id`
- `POST /clients`
- `PATCH /clients/:id`

## Deals

- `GET /deals`
- `POST /deals`
- `PATCH /deals/:id`

## Dashboard / Notifications / Reports

- `GET /dashboard/summary`
- `GET /notifications`
- `PATCH /notifications/:id/read`
- `GET /tasks`
- `GET /reports/export?format=excel`
- `GET /reports/export?format=pdf`

## Example Login

```json
{
  "email": "admin@realestatecrm.local",
  "password": "Admin@123"
}
```
