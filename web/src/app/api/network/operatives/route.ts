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

  const mappedUsers = users.map((u) => ({
    id: u.id,
    name: u.username,
    role: rankForLevel(u.stats?.level ?? 1),
    level: u.stats?.level ?? 1,
    avatar: `/avatars/Avatar-${u.avatarIndex}.jpg`,
    streak: u.stats?.streakDays ?? 0,
    status: (() => {
      if (!u.stats?.lastActiveAt) return 'offline';
      const minutesAgo = (Date.now() - new Date(u.stats.lastActiveAt).getTime()) / 60000;
      if (minutesAgo < 5) return 'online';
      if (minutesAgo < 60) return 'in-mission';
      return 'offline';
    })() as 'online' | 'in-mission' | 'offline',
  }));

  const fallbackOperatives = [
    {
      id: 'op-1',
      name: 'Kaelen Vance',
      role: 'Void Ranger',
      level: 14,
      avatar: '/avatars/Avatar-2.jpg',
      streak: 21,
      status: 'online' as const,
    },
    {
      id: 'op-2',
      name: 'Lyra Moonwhisper',
      role: 'Aether Scholar',
      level: 11,
      avatar: '/avatars/Avatar-3.jpg',
      streak: 9,
      status: 'in-mission' as const,
    },
    {
      id: 'op-3',
      name: 'Darius Thorne',
      role: 'Ironclad Paladin',
      level: 16,
      avatar: '/avatars/Avatar-4.jpg',
      streak: 30,
      status: 'online' as const,
    },
    {
      id: 'op-4',
      name: 'Sylvia Cross',
      role: 'Chrono Alchemist',
      level: 10,
      avatar: '/avatars/Avatar-5.jpg',
      streak: 12,
      status: 'offline' as const,
    },
  ];

  const combined = [...mappedUsers, ...fallbackOperatives.filter(f => !mappedUsers.some(m => m.name.toLowerCase() === f.name.toLowerCase()))];
  return NextResponse.json(combined);
}
