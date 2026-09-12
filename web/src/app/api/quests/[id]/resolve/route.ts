import { NextRequest, NextResponse } from 'next/server';
import { verifySession } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { checkLevelUp, rankForLevel } from '@/lib/progression';

// POST /api/quests/[id]/resolve
export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await verifySession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;

  const quest = await prisma.quest.findFirst({
    where: { id, userId: session.userId },
  });
  if (!quest) {
    return NextResponse.json({ error: 'Quest not found' }, { status: 404 });
  }
  if (quest.status === 'completed') {
    return NextResponse.json({ error: 'Quest already completed' }, { status: 409 });
  }
  if (quest.status === 'failed') {
    return NextResponse.json({ error: 'Quest has failed' }, { status: 409 });
  }

  const stats = await prisma.playerStats.findUnique({
    where: { userId: session.userId },
  });
  if (!stats) {
    return NextResponse.json({ error: 'Player stats not found' }, { status: 404 });
  }

  const levelResult = checkLevelUp(stats.xp, stats.level, quest.xpReward);

  // Apply rewards in a transaction
  const [updatedStats, updatedQuest] = await prisma.$transaction([
    prisma.playerStats.update({
      where: { userId: session.userId },
      data: {
        xp: levelResult.newXP,
        level: levelResult.newLevel,
        xpToNextLevel: levelResult.newXpToNextLevel,
        gold: stats.gold + quest.goldReward,
      },
    }),
    prisma.quest.update({
      where: { id },
      data: { status: 'completed', completedAt: new Date() },
    }),
  ]);

  return NextResponse.json({
    quest: {
      id: updatedQuest.id,
      status: updatedQuest.status,
    },
    rewards: {
      xp: quest.xpReward,
      gold: quest.goldReward,
    },
    player: {
      level: updatedStats.level,
      xp: updatedStats.xp,
      xpToNextLevel: updatedStats.xpToNextLevel,
      gold: updatedStats.gold,
      rank: rankForLevel(updatedStats.level),
    },
    levelUp: {
      leveled: levelResult.leveled,
      levelsGained: levelResult.levelsGained,
      previousLevel: stats.level,
      newLevel: updatedStats.level,
    },
  });
}
