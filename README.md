# Smart Leads Dashboard

A full-stack Lead Management Dashboard built using the MERN stack with TypeScript.

## Tech Stack

### Frontend
- React
- TypeScript
- TailwindCSS

### Backend
- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose

---

# Features

## Authentication
- JWT Authentication
- User Registration
- User Login
- Protected Routes
- Role-Based Access Control

## Leads Management
- Create Lead
- Update Lead
- Delete Lead
- View Leads
- Single Lead Details

## Filtering & Search
- Filter by Status
- Filter by Source
- Search by Name or Email
- Combined Filters
- Sorting

## Pagination
- Backend Pagination
- Pagination Metadata

## Additional Features
- Debounced Search
- CSV Export
- Docker Support
- Toast Notifications
- Form Validation
- Responsive UI

---

# Project Structure

```txt
backend/
frontend/
```

---

# Setup Instructions

## Clone Repository

```bash
git clone YOUR_GITHUB_LINK
```

---

## Backend Setup

```bash
cd backend
npm install
npm run dev
```

---

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

# Docker Setup

```bash
docker compose up --build
```

---

# Environment Variables

Create `.env` inside backend:

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
```

---

# API Documentation

See:

```txt
backend/API_DOCUMENTATION.md
```