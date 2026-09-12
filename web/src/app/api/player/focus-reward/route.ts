import { NextRequest, NextResponse } from 'next/server';
import { verifySession } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { checkLevelUp } from '@/lib/progression';

// POST /api/player/focus-reward — award XP & Gold for completing a Chrono Focus Chamber sprint
export async function POST(req: NextRequest) {
  const session = await verifySession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { minutes, questId } = await req.json();
    const duration = Math.max(1, Math.min(180, Number(minutes) || 25));

    // Base XP: 3 XP per minute, Gold: 1.5 Gold per minute (rounded)
    const earnedXP = Math.round(duration * 3);
    const earnedGold = Math.round(duration * 1.5);

    const stats = await prisma.playerStats.findUnique({
      where: { userId: session.userId },
    });

    if (!stats) {
      return NextResponse.json({ error: 'Stats not found' }, { status: 404 });
    }

    const levelResult = checkLevelUp(stats.xp, stats.level, earnedXP);

    const updated = await prisma.playerStats.update({
      where: { userId: session.userId },
      data: {
        xp: levelResult.newXP,
        level: levelResult.newLevel,
        xpToNextLevel: levelResult.newXpToNextLevel,
        gold: { increment: earnedGold },
        lastActiveAt: new Date(),
      },
    });

    // If quest was bound, we can optionally note it or update active timestamp
    if (questId) {
      await prisma.quest.updateMany({
        where: { id: questId, userId: session.userId },
        data: { status: 'active' },
      });
    }

    return NextResponse.json({
      success: true,
      earnedXP,
      earnedGold,
      leveledUp: levelResult.leveled,
      newLevel: levelResult.newLevel,
      currentGold: updated.gold,
      currentXP: updated.xp,
    });
  } catch (error) {
    console.error('Focus reward error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
