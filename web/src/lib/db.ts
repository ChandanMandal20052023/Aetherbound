/**
 * Prisma 7 client with driver adapter.
 *
 * Automatically detects environment:
 * - Local / SQLite:  DATABASE_URL="file:./dev.db" (zero config, instant dev)
 * - Free Cloud (Vercel + Neon / Supabase): DATABASE_URL="postgresql://..." (uses @prisma/adapter-pg)
 */
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
  pool?: Pool;
};

function createClient(): PrismaClient {
  const url = process.env.DATABASE_URL ?? 'file:./dev.db';

  if (url.startsWith('postgres://') || url.startsWith('postgresql://')) {
    const pool = globalForPrisma.pool ?? new Pool({ connectionString: url });
    globalForPrisma.pool = pool;
    const adapter = new PrismaPg(pool);
    return new PrismaClient({
      adapter,
      log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
    });
  }

  // SQLite fallback (local dev only)
  const { PrismaBetterSqlite3 } = require('@prisma/adapter-better-sqlite3');
  const dbPath = url.replace('file:', '');
  const adapter = new PrismaBetterSqlite3({ url: `file:${dbPath}` });
  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  });
}

export const prisma = globalForPrisma.prisma ?? createClient();
globalForPrisma.prisma = prisma;
