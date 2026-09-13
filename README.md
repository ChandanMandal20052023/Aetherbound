<div align="center">

# ⚔️ A E T H E R B O U N D
### *Neo-Brutalist Life RPG & Gamified Deep Work System*

[![Next.js 16](https://img.shields.io/badge/Next.js-16.3.5-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org)
[![React 19](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Prisma ORM](https://img.shields.io/badge/Prisma-7.10-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io)
[![Neon Postgres](https://img.shields.io/badge/Neon-PostgreSQL-00E599?style=for-the-badge&logo=postgresql&logoColor=black)](https://neon.tech)
[![License: MIT](https://img.shields.io/badge/License-MIT-fad02c?style=for-the-badge)](LICENSE)

<br/>

> **"Wake up, Operative. The daily grind is no longer a checklist—it is an ascension crucible."**
> 
> Inspired by the *Solo Leveling* Hunter System and cyberpunk high-friction aesthetics, **Aetherbound** transmutes procrastination, study grinds, and daily habits into high-stakes RPG quests, boss battle pomodoros, and viral holographic combat dossiers.

<br/>

[🚀 1-Click Cloud Deploy](#-instant-cloud-deployment) • [⚔️ Key Features](#-the-tactical-arsenal) • [📐 Progression Math](#-mathematical-progression-model) • [🏗️ Architecture](#-system-architecture) • [⚡ Quickstart](#-rapid-local-setup)

---

</div>

<br/>

## 🌌 The Tactical Arsenal

<table>
  <tr>
    <td width="50%">
      <h3 align="center">⚡ AI Quest Alchemist</h3>
      <p align="center">
        <b>Banish Task Paralysis with Procedural Goal Decomposition</b>
      </p>
      <p>
        Input any ambiguous real-world ambition (<i>"Master System Design"</i>, <i>"Ship Hackathon MVP"</i>, <i>"5k Marathon Prep"</i>). The engine breaks it into a 3-stage tactical RPG quest chain with calculated XP, Gold, rarity, risk multipliers, and actionable tips. Supports Google Gemini with an instant offline procedural fallback.
      </p>
    </td>
    <td width="50%">
      <h3 align="center">⏳ Chrono Focus Chamber</h3>
      <p align="center">
        <b>Boss Battle Pomodoro with In-Chamber Binaural Drone</b>
      </p>
      <p>
        Engage 15m (Scout), 25m (Skirmish), or 45m (Boss Raid) countdown crucibles. Features an animated circular SVG neon ring, real-time clock escapement audio ticks (<code>focusTick</code>), and a built-in real-time Web Audio low-pass synthesizer drone. Completing sprints grants bonus XP and Gold.
      </p>
    </td>
  </tr>
  <tr>
    <td width="50%">
      <h3 align="center">🎴 Operative Battle Card</h3>
      <p align="center">
        <b>Viral High-DPI Holographic Dossier Generator</b>
      </p>
      <p>
        Render a 1200x675 retro-cyberpunk combat dossier directly on HTML5 Canvas in the browser. Displays your avatar, level, title, momentum streak 🔥, gold balance, and math formula. Single-click <b>Download PNG</b> or <b>Direct Copy to Clipboard</b> to flex on Discord and social media.
      </p>
    </td>
    <td width="50%">
      <h3 align="center">🎛️ Slide-Out Tactical HUD</h3>
      <p align="center">
        <b>Docked Edge Command Drawer & Zero-Latency Audio</b>
      </p>
      <p>
        A floating edge tab (<code>TACTICAL FORGE ⚡</code>) or the universal <b><code>[T]</code></b> hotkey slides out the Aether Forge Suite from anywhere in the app. Houses the Alchemist, Focus Chamber, Battle Card, ambient drone switch, and core discipline charters.
      </p>
    </td>
  </tr>
</table>

---

<br/>

## 🏗️ System Architecture

```mermaid
flowchart TD
    subgraph Client["🖥️ CLIENT LAYER (Next.js 16 + React 19)"]
        UI["Neo-Brutalist Interface\n(Vanilla CSS Tokens + Glassmorphism)"]
        Audio["Web Audio API Synthesizer\n(Zero-Bandwidth SFX & Binaural Drone)"]
        Canvas["High-DPI Canvas Engine\n(Operative Battle Card PNG Export)"]
        HUD["Tactical Command Side Panel\n(Docked Drawer + Hotkey 'T')"]
    end

    subgraph CoreContext["🎮 GAME STATE & LOCAL ENGINE"]
        GState["GameContext State Controller\n(Player, Audio, Modals, Language Modes)"]
        ProcEng["Arcane Procedural Alchemy\n(Domain Heuristic & Math Balancer)"]
    end

    subgraph Server["⚡ BACKEND API ROUTERS (Next.js App Router)"]
        AuthRoute["/api/auth/*\n(Stateless HMAC-SHA256 JWT)"]
        QuestRoute["/api/quests/*\n(CRUD & Resolve Handlers)"]
        AlchemyRoute["/api/quests/alchemy\n(Gemini 1.5 Flash + Procedural Engine)"]
        FocusRoute["/api/player/focus-reward\n(Anti-Cheat Sprint Verification)"]
        NetworkRoute["/api/network/operatives\n(Guild Roster & Tactical Chatter)"]
    end

    subgraph Persistence["🗄️ PERSISTENCE LAYER"]
        Prisma["Prisma ORM 7 (Driver Adapters)"]
        NeonDB[("Neon Serverless PostgreSQL\n(AWS US-East Cloud)")]
        SQLiteDB[("SQLite dev.db\n(Local Zero-Config Fallback)")]
    end

    UI --> GState
    HUD --> GState
    GState --> Audio
    GState --> Canvas
    GState --> Server

    Server --> Prisma
    Prisma -->|Production| NeonDB
    Prisma -->|Local Dev| SQLiteDB
    AlchemyRoute --> ProcEng
```

---

<br/>

## 🔄 The Life RPG Gameplay Loop

```mermaid
sequenceDiagram
    autonumber
    actor Operative as 👤 Real-Life Operative
    participant Alchemist as ⚡ AI Quest Alchemist
    participant Codex as 📜 Active Quest Codex
    participant Chamber as ⏳ Chrono Focus Chamber
    participant Progression as 📐 Mathematical Engine
    participant Shop as 🛡️ Astral Black Market
    participant Social as 🎴 Holographic Battle Card

    Operative->>Alchemist: Enters raw goal ("Master Distributed Systems")
    Alchemist-->>Operative: Transmutes into 3-Phase Boss Quest Chain
    Operative->>Codex: Commits quests to active quest log
    Operative->>Chamber: Engages 25-minute Pomodoro Boss Sprint
    Note over Chamber: Web Audio Ambient Synth Drone Engaged<br/>Visual Countdown & Real-Time Clock Ticks
    Operative->>Chamber: Sprints to 00:00 without breaking focus
    Chamber->>Progression: Dispatches focus verification payload
    Progression-->>Operative: Awards +75 XP, +38 Gold & Updates Level
    Operative->>Shop: Equips Void Ranger Artifacts & Starlight Cloaks
    Operative->>Social: Generates 1200x675 Battle Card & Flexes on Discord
```

---

<br/>

## 📐 Mathematical Progression Model

Aetherbound rejects arbitrary leveling. All progression, inflation protection, and level-ups are governed by verifiable mathematical curves:

### 1. The Level-Up Requirement Curve
The XP needed to advance from Level $L$ to $L + 1$ scales progressively:

$$XP_{req}(L) = 100 \cdot L^{1.65} + 25 \cdot L^2$$

- **Early Levels ($L < 10$)**: Dominated by the $100L^{1.65}$ term. Progression feels generous and snappy to cultivate psychological momentum.
- **Late Levels ($L \ge 25$)**: The quadratic $25L^2$ kicks in, demanding sustained, real-world discipline to achieve master ranks.

### 2. Inflation-Controlled Gold Scaling
To prevent late-game economy collapse, gold rewards follow a logarithmic curve:

$$Gold(L) = 100 \cdot \left(1 + \ln(1 + L)\right)^{1.35}$$

### 3. Power & Reward Density
- **Player Power**: $Power(L) = 100 \cdot L^{1.72}$
- **Reward Density**: $Density(L) = \frac{Gold(L)}{Difficulty(L)}$ (Declines monotonically over time to incentivize higher-friction quests).

---

<br/>

## 🚀 Instant Cloud Deployment

Deploy Aetherbound freely in **under 3 minutes** with zero cloud bills.

### Stack: Vercel + Neon Serverless PostgreSQL

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FChandanMandal20052023%2FAetherbound&root-directory=web)

1. **Free Database**: Create a free PostgreSQL instance on [Neon.tech](https://neon.tech) and copy your connection string.
2. **Deploy on Vercel**: Import this repository, set Root Directory to `web`, and configure environment variables:

```env
DATABASE_URL="postgresql://neondb_owner:YOUR_PASSWORD@ep-xxx-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require"
JWT_SECRET="your-32-character-secret-key"
GEMINI_API_KEY="optional-google-gemini-key"
```

3. **Synchronize Schema**:
```bash
npx prisma db push
```

> Detailed instructions and troubleshooting can be found in [DEPLOYMENT.md](DEPLOYMENT.md).

---

<br/>

## ⚡ Rapid Local Setup

```bash
# 1. Clone the repository
git clone https://github.com/ChandanMandal20052023/Aetherbound.git
cd Aetherbound/web

# 2. Install dependencies
npm install

# 3. Synchronize database (zero setup SQLite or Neon Postgres)
npx prisma generate
npx prisma db push

# 4. Launch development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

<br/>

## 🎮 Operative Controls & Hotkeys

| Hotkey | Action | Description |
|---|---|---|
| **`T`** | **Toggle Tactical HUD** | Opens or dismisses the slide-out Aether Forge Suite drawer |
| **`Escape`** | **Dismiss Overlays** | Closes any open modal, side panel, or battle card |
| **`Click Top Avatar`** | **Open Dossier** | View character stats, XP bars, and avatar matrix switcher |
| **`🔊 Sound Toggle`** | **Mute / Unmute** | Toggles all synthesized Web Audio retro sound effects |

---

<br/>

## 🛡️ Built For Hackathon Evaluation

Developed with ❤️ for **IIT Bhubaneswar Tech Zephyr**. Designed with zero mock placeholders, zero external asset broken links, and 100% functional live interactions across all 23 routes.

<div align="center">
  <sub>Aetherbound Life RPG • Cycle 3: Moonfall • Sovereign Council Protocol</sub>
</div>
