# 🧺 Esemka Laundry - SMKN 2 Cikarang Barat

🚀 Inventory & Laundry Management System built with modern technologies for **SMKN 2 Cikarang Barat**.

This system comprises a desktop and mobile application (frontend) using React + Tauri and web (frontend) React. Backend API using Bun.js + Hono, all managed within a single monorepo with Turborepo.

---

## 📦 Monorepo Structure

```
apps/
├── backend ← Bun.js + Hono API server
├── frontend ← React + Tauri frontend app
├── shared ← shared utilities/types
```

---

## 📊 Features

-🧾 Laundry transaction management
-✨ Modern UI using ShadCN 
-👥 Admin authentication using JWT
-🧺 Real-time laundry status checking
-⚡ Light & fast backend with Bun & Hono

---

## 🛠️  Technologies Used

- **Frontend:** React, TailwindCSS,ShadCN, Zod, Tauri(Desktop & Mobile)
- **Backend:** Bun.js, Hono, Zod, Drizzle ORM
- **Auth:** JWT(Acces token & refresh token)
- **Database:** PostgreSQL (Serverless Supabase / Neon)
- **Tooling:** Turborepo (Monorepo Management)

---

## 🚀 Getting Started

### 1. Clone Repository

```bash
git clone https://github.com/radithyaa/tauri-monorepo-app.git
cd tauri-monorepo-app
```

### 2. Run The Development Server

```bash
bun install
bun dev
# or use npm, yarn, pnpm
```

---

## 📁 Environment Variables

### 📦 Backend (`apps/backend/.env`)
```env
DATABASE_URL=
JWT_SECRET=
FRONTEND_URL=http://127.0.0.1:1420
```

### 💻 Frontend (`apps/frontend/.env`)
```env
BACKEND_URL=http://127.0.0.1:3000
```

## ✨ Credits

Made with ❤️ by radithyaa
For Final Project & real-world application👨‍💻
Feel free to ask me a question!🤝

---
