# 🚀 Aetherbound Deployment & Free Hosting Guide

This guide details how to host **Aetherbound** 100% free with zero cost for hackathon presentations and live demos.

---

## ⚡ Option 1: Local Presentation (Already Running!)

The development server is already compiled and running locally:
- **URL**: [http://localhost:3000](http://localhost:3000)
- **Database**: Zero-setup embedded SQLite (`web/prisma/dev.db`), pre-seeded with initial gear, quests, and operatives.
- **Run command**: `cd web && npm run dev`
- **Demo Accounts**: You can register any account or log in with:
  - Email: `test@arcane.net`
  - Password: `test123456`

---

## 🌐 Option 2: 100% Free Cloud Deployment (Vercel + Neon)

This is the standard, best-in-class stack for Next.js applications:

### Step 1: Free Cloud Database (Neon Postgres — 30 seconds)
1. Go to [neon.tech](https://neon.tech) and create a free account (no credit card required).
2. Create a new project (e.g., `aetherbound-db`).
3. Copy the **Direct connection string** (e.g., `postgresql://username:password@ep-xyz.us-east-2.aws.neon.tech/neondb?sslmode=require`).

### Step 2: Initialize Database Schema
From your local terminal in the `web` folder, run:
```bash
# Push the Prisma schema directly to your free Neon DB
DATABASE_URL="your-neon-connection-string" npx prisma db push
```

### Step 3: Deploy to Vercel (1 minute)
1. Push this repository to your **GitHub** account.
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Import your GitHub repository.
4. Set **Root Directory** to `web`.
5. Under **Environment Variables**, add:
   - `DATABASE_URL` = `your-neon-connection-string`
   - `JWT_SECRET` = `aetherbound_super_secure_jwt_secret_2025`
6. Click **Deploy**!

> **Why this works seamlessly:**
> The database client (`src/lib/db.ts`) dynamically detects whether `DATABASE_URL` is a local SQLite database or a cloud PostgreSQL database. It automatically uses `@prisma/adapter-pg` in production and `@prisma/adapter-better-sqlite3` in development with zero code changes needed.

---

## 🛠️ Tech Architecture & Note Logic Verification

### 1. Progression Math Curve
Implemented in `src/lib/progression.ts`:
$$XP_{req}(L) = \lfloor 100 \cdot L^{1.65} + 25 \cdot L^2 \rfloor$$

- **Level 1 → 2**: Requires 125 XP (accessible initial progression).
- **Level 2 → 3**: Requires 414 XP.
- **Level 5 → 6**: Requires 1,514 XP.
- Early progression rewards prompt quest completions, while higher tiers require strategic habit mastery.

### 2. Full Feature Matrix
- **Authentication**: JWT HttpOnly cookie session (`/login`, `/register`, `/api/auth/*`)
- **Sanctuary Dashboard**: Live status card, character stats, momentum streak, quick quests
- **Quest Hub**: Main, side, and active quests with real XP & gold payouts and level-up detection
- **Aether Shop**: Artifact catalog with live purchasing and currency deduction
- **Vault Inventory**: Equipment loadout slots (Weapon, Armor, Boots, Relic) with Equip/Unequip support
- **Operatives Network**: Guild status, operative transmissions, and live Aether pings
- **Level-Up System**: Dynamic congratulatory modal with sound-ready celebratory effects
