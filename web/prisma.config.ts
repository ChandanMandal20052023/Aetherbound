/**
 * Prisma 7 config — datasource URL goes here (not in schema.prisma)
 * Dev:  DATABASE_URL="file:./dev.db"      (SQLite, zero setup)
 * Prod: DATABASE_URL="postgresql://..."   (Neon free tier on Vercel)
 */
import { defineConfig } from 'prisma/config';

export default defineConfig({
  schema: './prisma/schema.prisma',
  datasource: {
    url: process.env.DATABASE_URL ?? 'file:./dev.db',
  },
});
