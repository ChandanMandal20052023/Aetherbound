# 🚀 Aetherbound Life RPG — Zero-Cost Free Deployment Guide

Deploy Aetherbound to the cloud in **under 3 minutes** for 100% free hosting and global CDN edge availability.

---

## ⚡ Recommended Stack: Vercel + Neon Serverless PostgreSQL

- **Hosting**: [Vercel](https://vercel.com) (Free Hobby Tier — global edge, automated Next.js builds)
- **Database**: [Neon.tech](https://neon.tech) (Free Tier — 500 MB Serverless PostgreSQL, 0 config, 0 credit card)

---

### Step 1: Create Free Neon PostgreSQL Database (1 Minute)
1. Go to [Neon.tech](https://neon.tech) and sign up with GitHub or Google.
2. Click **Create Project**, name it `aetherbound-db`, and choose the region closest to you (e.g., `AWS US-East` or `AWS AP-South`).
3. Neon will instantly display your Connection String. Select **Prisma** or copy the **Direct connection string**:
   ```
   postgresql://alex:xxxxxxx@ep-cool-fog-12345.us-east-2.aws.neon.tech/neondb?sslmode=require
   ```

---

### Step 2: Push Initial Schema to Neon (30 Seconds)
In your local terminal inside the `web/` directory:
```bash
# Set your Neon URL temporarily to push the tables
$env:DATABASE_URL="your-neon-postgres-connection-string"
npx prisma db push
```
*(Your tables `User`, `PlayerStats`, `Quest`, `InventoryItem`, `ShopItem`, and `Ping` are now created in the cloud).*

---

### Step 3: Deploy to Vercel (1 Minute)
1. Go to [Vercel Dashboard](https://vercel.com/new).
2. Import your GitHub repository: `ChandanMandal20052023/Aetherbound`.
3. In **Project Settings**:
   - **Root Directory**: Click *Edit* and select `web`.
   - **Framework Preset**: Next.js (automatically detected).
4. Expand **Environment Variables** and add:
   - `DATABASE_URL`: `postgresql://your-neon-database-connection-string`
   - `JWT_SECRET`: Any random 32-character string (e.g. `aetherbound-super-secret-production-2026-key`)
   - `GEMINI_API_KEY` *(Optional)*: If you wish to use Google Gemini AI for the Quest Alchemist (otherwise it uses the built-in offline Arcane Procedural Engine).
5. Click **Deploy** 🚀!

---

## 🛡️ Architecture & Resilience Highlights

- **Dual-Engine Database Adapter**: Aetherbound's `src/lib/db.ts` automatically switches between `@prisma/adapter-better-sqlite3` (for local zero-setup dev) and `@prisma/adapter-pg` (when `DATABASE_URL` starts with `postgresql://` in production).
- **Web Audio Sound Synthesizer**: Zero external audio bandwidth. Ambient drones and game chimes are mathematically synthesized on-the-fly via Web Audio API.
- **Client-Side Dossier Rendering**: Operative Battle Cards are generated on high-DPI HTML5 Canvas and saved directly in the browser.
