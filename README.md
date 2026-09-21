# MERN Todo

MongoDB + Express + React + Node.js task manager.

## Prerequisites
- Node.js 18+ (`node -v`)
- MongoDB running locally on port 27017 (or a MongoDB Atlas URI in `server/.env`)

## Setup
```bash
npm run install:all
```

## Run (two terminals)
```bash
# Terminal 1 - API on http://localhost:5000
cd server
npm run dev

# Terminal 2 - React app on http://localhost:3000
cd client
npm run dev
```
Or, from the project root, both at once: `npm run dev`

## API
| Method | Endpoint          | Purpose        |
|--------|-------------------|----------------|
| GET    | /api/todos        | List tasks     |
| POST   | /api/todos        | Add a task     |
| PUT    | /api/todos/:id    | Update a task  |
| DELETE | /api/todos/:id    | Delete a task  |
