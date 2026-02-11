# AyuNext - Plant Nursery Management Dashboard

A full-stack MERN application for managing plant nursery operations including plants, inventory, purchases, sales, suppliers, expenses, and damage tracking.

## Tech Stack

- **Backend:** Node.js, Express.js, MongoDB (Mongoose), JWT Auth
- **Frontend:** React 18, TypeScript, Vite, React Router
- **Database:** MongoDB Atlas

## Project Structure

```
├── client/              # React frontend (Vite + TypeScript)
│   ├── src/
│   │   ├── api/         # Axios instance & API services
│   │   ├── components/  # Layout, shared components
│   │   ├── context/     # Auth context provider
│   │   └── pages/       # All page components
│   └── dist/            # Production build output
├── config/              # Database configuration
├── controllers/         # Express route controllers
├── middleware/           # Auth, error handler, validators
├── models/              # Mongoose schemas (9 models)
├── routes/              # Express route definitions
├── seeds/               # Seed data & seeder script
├── server.js            # Express app entry point
└── package.json
```

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB Atlas account (or local MongoDB)

### 1. Clone & Install

```bash
git clone <your-repo-url>
cd AyuNext-Dashboard

# Install backend dependencies
npm install

# Install frontend dependencies
npm install --prefix client
```

### 2. Environment Variables

Copy the example and fill in your values:

```bash
cp .env.example .env
```

Required variables:
| Variable | Description |
|----------|-------------|
| `MONGODB_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret key for JWT tokens |
| `JWT_EXPIRE` | Token expiry (e.g. `30d`) |
| `PORT` | Server port (default: 5000) |
| `NODE_ENV` | `development` or `production` |

### 3. Seed Database (Optional)

```bash
npm run seed          # Import sample data
npm run seed:delete   # Remove all data
```

Default admin credentials after seeding: `admin` / `admin123`

### 4. Run Development

```bash
# Backend only
npm run dev

# Frontend only
npm run client

# Both (requires concurrently: npm i -D concurrently)
npm run dev:full
```

- Backend: http://localhost:5000
- Frontend: http://localhost:3000

### 5. Production Build

```bash
npm run build    # Builds the React app
npm start        # Serves both API + frontend on one port
```

## Deployment

### Render (recommended)

1. Push to GitHub
2. Create a **Web Service** on [render.com](https://render.com)
3. Connect your repo
4. Settings will be auto-detected from `render.yaml`
5. Add environment variables (`MONGODB_URI`, `JWT_SECRET`)

### Railway / Heroku

1. Push to GitHub
2. Connect repo on the platform
3. Set environment variables
4. Build command: `npm install && npm run build`
5. Start command: `npm start`

### Vercel (Frontend) + Separate Backend

If deploying separately:
1. Deploy backend to Railway/Render
2. Update `client/src/api/axios.ts` baseURL to your backend URL
3. Deploy `client/` to Vercel

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | Login |
| POST | `/api/auth/register` | Register admin |
| GET | `/api/auth/me` | Get current admin |
| GET/POST | `/api/plants` | List / Create plants |
| GET/PUT/DELETE | `/api/plants/:id` | Get / Update / Delete plant |
| GET/POST | `/api/purchases` | List / Create purchases |
| GET/POST | `/api/sells` | List / Create sales |
| GET/POST | `/api/damages` | List / Create damages |
| GET/POST | `/api/suppliers` | List / Create suppliers |
| GET/POST | `/api/inventory` | List / Create inventory |
| GET | `/api/inventory/low-stock` | Get low stock items |
| GET/POST | `/api/expenses` | List / Create expenses |
| GET/POST | `/api/users` | List / Create users |

All endpoints except `/api/auth/login` and `/api/auth/register` require a Bearer token.

## License

ISC
