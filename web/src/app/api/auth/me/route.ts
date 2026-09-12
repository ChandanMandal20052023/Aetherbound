import { NextResponse } from 'next/server';
import { verifySession } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { rankForLevel } from '@/lib/progression';

export async function GET() {
  const session = await verifySession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    include: { stats: true },
  });

  if (!user || !user.stats) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  return NextResponse.json({
    id: user.id,
    username: user.username,
    email: user.email,
    avatarIndex: user.avatarIndex,
    stats: {
      ...user.stats,
      rank: rankForLevel(user.stats.level),
    },
  });
}
