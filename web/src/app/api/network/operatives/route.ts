import { NextRequest, NextResponse } from 'next/server';
import { verifySession } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { rankForLevel } from '@/lib/progression';

// GET /api/network/operatives — list all other users as operatives
export async function GET() {
  const session = await verifySession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const users = await prisma.user.findMany({
    where: { id: { not: session.userId } },
    include: { stats: true },
    orderBy: { createdAt: 'desc' },
    take: 20,
  });

  return NextResponse.json(
    users.map((u) => ({
      id: u.id,
      name: u.username,
      role: rankForLevel(u.stats?.level ?? 1),
      level: u.stats?.level ?? 1,
      avatar: `/avatars/Avatar-${u.avatarIndex}.jpg`,
      streak: u.stats?.streakDays ?? 0,
      // simple status heuristic based on last active time
      status: (() => {
        if (!u.stats?.lastActiveAt) return 'offline';
        const minutesAgo = (Date.now() - new Date(u.stats.lastActiveAt).getTime()) / 60000;
        if (minutesAgo < 5) return 'online';
        if (minutesAgo < 60) return 'in-mission';
        return 'offline';
      })(),
    })),
  );
}
