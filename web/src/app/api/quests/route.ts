import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { verifySession } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { questXpReward, questGoldReward } from '@/lib/progression';
import type { QuestRarity, QuestRisk, QuestCategory } from '@/types/quest';

// GET /api/quests
export async function GET() {
  const session = await verifySession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const quests = await prisma.quest.findMany({
    where: { userId: session.userId },
    orderBy: [
      // active first, then available, then completed
      { status: 'asc' },
      { createdAt: 'desc' },
    ],
  });

  return NextResponse.json(quests.map((q) => ({
    id: q.id,
    title: q.title,
    description: q.description,
    category: q.category,
    rarity: q.rarity,
    risk: q.risk,
    status: q.status,
    reward: { xp: q.xpReward, gold: q.goldReward },
    emoji: q.emoji,
    deadline: q.deadline ?? undefined,
  })));
}

const CreateQuestSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().optional().default('No briefing recorded. Venture boldly.'),
  category: z.enum(['main', 'side', 'active']),
  rarity: z.enum(['trivial', 'common', 'rare', 'epic', 'legendary']),
  risk: z.enum(['low', 'medium', 'high']),
  emoji: z.string().optional(),
  deadline: z.string().optional(),
});

// POST /api/quests — create a new quest (XP/Gold auto-calculated)
export async function POST(req: NextRequest) {
  const session = await verifySession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const parsed = CreateQuestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
  }

  const { title, description, category, rarity, risk, emoji, deadline } = parsed.data;

  const stats = await prisma.playerStats.findUnique({ where: { userId: session.userId } });
  const level = stats?.level ?? 1;

  // XP and Gold are server-calculated using progression math
  const xpReward = questXpReward(level, rarity as QuestRarity, risk as QuestRisk);
  const goldReward = questGoldReward(level, rarity as QuestRarity, risk as QuestRisk);

  const emojiMap: Record<QuestCategory, string> = {
    main: '⚡',
    side: '🧪',
    active: '🐉',
  };

  const quest = await prisma.quest.create({
    data: {
      userId: session.userId,
      title,
      description,
      category,
      rarity,
      risk,
      xpReward,
      goldReward,
      emoji: emoji ?? emojiMap[category as QuestCategory],
      deadline: deadline ?? null,
      status: category === 'active' ? 'active' : 'available',
    },
  });

  return NextResponse.json({
    id: quest.id,
    title: quest.title,
    description: quest.description,
    category: quest.category,
    rarity: quest.rarity,
    risk: quest.risk,
    status: quest.status,
    reward: { xp: quest.xpReward, gold: quest.goldReward },
    emoji: quest.emoji,
    deadline: quest.deadline ?? undefined,
  }, { status: 201 });
}
