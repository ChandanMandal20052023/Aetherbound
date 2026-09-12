import { NextResponse } from 'next/server';
import { verifySession } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { DAILY_BONUS_XP, DAILY_BONUS_GOLD, checkLevelUp, rankForLevel } from '@/lib/progression';

export async function POST() {
  const session = await verifySession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const stats = await prisma.playerStats.findUnique({
    where: { userId: session.userId },
  });
  if (!stats) {
    return NextResponse.json({ error: 'Player not found' }, { status: 404 });
  }

  // Idempotency: only one claim per UTC day
  const today = new Date().toDateString();
  const claimedAt = stats.dailyBonusClaimedAt
    ? new Date(stats.dailyBonusClaimedAt).toDateString()
    : null;

  if (claimedAt === today) {
    return NextResponse.json({ error: 'Daily bonus already claimed today' }, { status: 409 });
  }

  const levelResult = checkLevelUp(stats.xp, stats.level, DAILY_BONUS_XP);

  const updated = await prisma.playerStats.update({
    where: { userId: session.userId },
    data: {
      xp: levelResult.newXP,
      level: levelResult.newLevel,
      xpToNextLevel: levelResult.newXpToNextLevel,
      gold: stats.gold + DAILY_BONUS_GOLD,
      dailyBonusClaimed: true,
      dailyBonusClaimedAt: new Date(),
    },
  });

  return NextResponse.json({
    goldAwarded: DAILY_BONUS_GOLD,
    xpAwarded: DAILY_BONUS_XP,
    leveled: levelResult.leveled,
    newLevel: updated.level,
    newXP: updated.xp,
    newGold: updated.gold,
    rank: rankForLevel(updated.level),
  });
}
