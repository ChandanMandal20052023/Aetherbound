import { NextResponse } from 'next/server';
import { verifySession } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { rankForLevel } from '@/lib/progression';

/** Builds weekly XP breakdown from quest completions in the last 7 days. */
async function getWeeklyBreakdown(userId: string) {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const now = new Date();

  const weeklyData: Record<string, number> = {};
  for (let i = 6; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(now.getDate() - i);
    weeklyData[days[d.getDay()]] = 0;
  }

  const recentCompletions = await prisma.quest.findMany({
    where: {
      userId,
      status: 'completed',
      completedAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
    },
    select: { completedAt: true, xpReward: true },
  });

  for (const q of recentCompletions) {
    if (q.completedAt) {
      const dayLabel = days[q.completedAt.getDay()];
      if (dayLabel in weeklyData) {
        weeklyData[dayLabel] += q.xpReward;
      }
    }
  }

  return Object.entries(weeklyData).map(([day, xp]) => ({ day, xp }));
}

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

  const weeklyBreakdown = await getWeeklyBreakdown(user.id);
  const weeklyTotal = weeklyBreakdown.reduce((sum, d) => sum + d.xp, 0);

  const prevWeekXP = await prisma.quest.aggregate({
    where: {
      userId: user.id,
      status: 'completed',
      completedAt: {
        gte: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
        lt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      },
    },
    _sum: { xpReward: true },
  });
  const prevWeekTotal = prevWeekXP._sum.xpReward ?? 0;
  const weeklyChange = prevWeekTotal > 0
    ? Math.round(((weeklyTotal - prevWeekTotal) / prevWeekTotal) * 100)
    : 0;

  const bestDayEntry = weeklyBreakdown.reduce(
    (best, d) => (d.xp > best.xp ? d : best),
    { day: 'N/A', xp: 0 },
  );

  // Refresh daily streak
  const today = new Date().toDateString();
  const lastActive = user.stats.lastActiveAt
    ? new Date(user.stats.lastActiveAt).toDateString()
    : null;
  const yesterday = new Date(Date.now() - 86400000).toDateString();

  let { streakDays, dailyBonusClaimed } = user.stats;

  if (lastActive !== today) {
    if (lastActive === yesterday) {
      streakDays += 1;
    } else if (lastActive !== today) {
      streakDays = 1;
    }
    dailyBonusClaimed = false;
    await prisma.playerStats.update({
      where: { userId: user.id },
      data: { streakDays, dailyBonusClaimed: false, lastActiveAt: new Date() },
    });
  }

  const profile = {
    id: user.id,
    username: user.username,
    email: user.email,
    avatarIndex: user.avatarIndex,
    stats: {
      xp: user.stats.xp,
      xpToNextLevel: user.stats.xpToNextLevel,
      level: user.stats.level,
      streakDays,
      rank: rankForLevel(user.stats.level),
      gold: user.stats.gold,
      sunlitPeach: user.stats.sunlitPeach,
      dailyBonusClaimed,
      season: user.stats.season,
      seasonName: user.stats.seasonName,
      seasonDaysRemaining: user.stats.seasonDaysRemaining,
    },
    momentum: {
      weeklyTotal,
      weeklyChange,
      currentStreak: streakDays,
      bestDay: bestDayEntry.day,
      bestDayXP: bestDayEntry.xp,
      weeklyBreakdown,
    },
  };

  return NextResponse.json(profile);
}
