# Student MS – Student Management System

A modern, responsive, and pixel-perfect Student Management System designed for BSIT Student Records (Human-Computer Interaction Final Project), faithfully matching the [Figma Design Draft](https://www.figma.com/design/r3gdQg4DXewjYrM7itsLH4/Student-Management-System-%E2%80%93-Design-Draft?node-id=0-1&t=Q8MEPmSXBfAngZEf-1).

---

## 📸 Implemented Screens

1. **Students Dashboard (`/students`)**
   - Top navigation with active indicator pill and profile avatar (`A`).
   - "Welcome, Admin" header block.
   - Real-time debounced search bar (`"Search student by name or ID"`).
   - Dynamic 3-card metric counter (`120 Students`, `5 Courses`, `16 Sections`).
   - Responsive Student Records table with custom pagination and inline action buttons (Edit & Delete).
2. **Courses & Sections View (`/courses`)**
   - Live course search by name or code (`"Search course by name or code"`).
   - "BSIT sections" grid displaying all 16 sections partitioned across 1st to 4th year (`1A` through `4D`).
   - BSIT course list table with `+ Add course` modal support and inline editing/deletion.
3. **Add / Edit Student Form**
   - Full-page responsive form matching Figma specifications.
   - Reusable across Create and Edit modes.
   - Input fields: Student ID, First name, Last name, Email, Course select, and Section select.
   - Validation feedback, cancel action, and toast notifications.
4. **HCI Usability Enhancements**
   - Safe deletion confirmation modal dialogs (prevents accidental data loss).
   - Add/Edit Course modal dialog.
   - Toast notification popups for created/updated/deleted actions.
   - Empty state placeholders when search results return zero matches.

---

## 🛠️ Technology Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Frontend** | React 19 + Vite + Tailwind CSS v4 + Lucide Icons | Pixel-perfect Figma design tokens, fast UI updates, zero build friction |
| **Backend API** | Laravel 12 (PHP 8.2+) | Eloquent ORM, RESTful API controllers, Form Request validation, CORS configuration |
| **Database** | SQLite (Local) / PostgreSQL (Production) | Normalized tables: `students`, `courses`, `sections` |

---

## 🚀 Running Locally (Windows)

### Option A: One-Click Quick Start (Recommended)
Double-click `start-all.bat` in the project root. This will automatically open both servers:
- **Frontend App:** [http://localhost:3000](http://localhost:3000)
- **Backend API:** [http://127.0.0.1:8000](http://127.0.0.1:8000)

### Option B: Manual Execution

#### 1. Backend Server
```powershell
# In a terminal:
.\run-backend.bat

# Or directly:
cd backend
copy .env.example .env
composer install
php artisan key:generate
php artisan migrate --seed
php artisan serve --port=8000
```

#### 2. Frontend Server
```powershell
# In a second terminal:
.\run-frontend.bat

# Or directly:
cd frontend
npm ci
npm.cmd run dev
```

---

## 🌐 100% Free ($0.00) Production Deployment Guide

You can deploy this entire stack to production without spending a dime and without providing credit card details.

### 1. Database: Neon Serverless PostgreSQL ($0.00)
1. Go to [neon.tech](https://neon.tech) and create a free account.
2. Click **Create Project** (e.g. `student-ms`).
3. Under **Connection Details**, copy your PostgreSQL connection parameters:
   - Host (`ep-xxxx.neon.tech`)
   - Database (`neondb`)
   - Username
   - Password
   - Port (`5432`)

### 2. Backend: Render.com or Koyeb.com ($0.00)
1. Push this repository to GitHub.
2. Sign in to [Render.com](https://render.com) and click **New + > Web Service**.
3. Select your GitHub repository and set the **Root Directory** to `backend`.
4. Set the **Environment** to `Docker` (using the included `backend/Dockerfile`).
5. Add the following **Environment Variables**:
   ```env
   APP_ENV=production
   APP_DEBUG=false
   APP_KEY=<your-laravel-app-key-from-backend/.env>
   APP_URL=https://your-api.onrender.com
   DB_CONNECTION=pgsql
   DB_HOST=ep-xxxx.neon.tech
   DB_PORT=5432
   DB_DATABASE=neondb
   DB_USERNAME=<your-neon-user>
   DB_PASSWORD=<your-neon-password>
   ```
6. Click **Deploy Web Service**. Render provides a free `https://your-api.onrender.com` URL with SSL.

### 3. Frontend: Vercel ($0.00)
1. Go to [vercel.com](https://vercel.com) and click **Add New > Project**.
2. Select your repository and configure:
   - **Framework Preset:** Vite
   - **Root Directory:** `frontend`
3. Add the **Environment Variable**:
   ```env
   VITE_API_URL=https://your-api.onrender.com/api
   ```
4. Click **Deploy**. Vercel will build and deploy your React app to `https://your-app.vercel.app` with free SSL and edge CDN caching.

---

## 📁 Repository Structure

```
HCIFinal/
├── backend/                  # Laravel 12 Backend API
│   ├── app/
│   │   ├── Http/Controllers/Api/
│   │   │   ├── StudentController.php
│   │   │   ├── CourseController.php
│   │   │   ├── SectionController.php
│   │   │   └── StatsController.php
│   │   └── Models/
│   │       ├── Student.php
│   │       ├── Course.php
│   │       └── Section.php
│   ├── database/
│   │   ├── migrations/       # Schema definitions
│   │   └── seeders/          # 120 students, 5 courses, 16 sections
│   ├── routes/
│   │   └── api.php           # REST API endpoints
│   ├── config/cors.php       # Pre-configured CORS
│   └── Dockerfile            # Container definition for free cloud hosting
├── frontend/                 # React 19 + Tailwind CSS + Vite SPA
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── StatCards.jsx
│   │   │   ├── SearchBar.jsx
│   │   │   ├── StudentsView.jsx
│   │   │   ├── CoursesView.jsx
│   │   │   ├── StudentForm.jsx
│   │   │   ├── CourseModal.jsx
│   │   │   ├── DeleteConfirmModal.jsx
│   │   │   └── Toast.jsx
│   │   ├── api.js            # Centralized API service layer
│   │   ├── App.jsx           # Main layout & state orchestrator
│   │   └── index.css         # Tailwind v4 import & base tokens
│   ├── vercel.json           # Vercel SPA rewrite configuration
│   └── vite.config.js        # Vite config with /api proxy
├── run-backend.bat           # Quick launcher for Laravel API
├── run-frontend.bat          # Quick launcher for React UI
├── start-all.bat             # Simultaneous launcher
├── SYSTEM_SPECIFICATION.md   # Architectural blueprint & Figma tokens
└── README.md                 # Project documentation
```
