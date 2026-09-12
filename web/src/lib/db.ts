/**
 * Prisma 7 client with driver adapter.
 *
 * Automatically detects environment:
 * - Local / SQLite:  DATABASE_URL="file:./dev.db" (zero config, instant dev)
 * - Free Cloud (Vercel + Neon / Supabase): DATABASE_URL="postgresql://..." (uses @prisma/adapter-pg)
 */
import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

function createClient(): PrismaClient {
  const url = process.env.DATABASE_URL ?? 'file:./dev.db';

  if (url.startsWith('postgres://') || url.startsWith('postgresql://')) {
    // Production cloud postgres (Neon, Supabase, Render free tier)
    // Lazy-require or import pg adapter
    const { Pool } = require('pg');
    const { PrismaPg } = require('@prisma/adapter-pg');
    const pool = new Pool({ connectionString: url });
    const adapter = new PrismaPg(pool);
    return new PrismaClient({
      adapter,
      log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
    });
  }

  // SQLite for local zero-setup dev & hackathon demo
  const { PrismaBetterSqlite3 } = require('@prisma/adapter-better-sqlite3');
  const dbPath = url.replace('file:', '');
  const adapter = new PrismaBetterSqlite3({ url: `file:${dbPath}` });
  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  });
}

export const prisma = globalForPrisma.prisma ?? createClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
