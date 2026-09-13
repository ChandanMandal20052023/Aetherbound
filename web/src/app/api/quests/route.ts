import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { verifySession } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { calculateQuestReward } from '@/lib/progression';

const ALLOWED_CATEGORIES = [
  'INTELLECT',
  'STRENGTH',
  'DISCIPLINE',
  'FOCUS',
  'CREATIVITY',
  'main',
  'side',
  'active',
] as const;

const ALLOWED_DIFFICULTIES = [
  'TRIVIAL',
  'STANDARD',
  'RARE',
  'EPIC',
  'LEGENDARY',
  'trivial',
  'common',
  'rare',
  'epic',
  'legendary',
] as const;

const ALLOWED_FREQUENCIES = ['ONE_TIME', 'DAILY'] as const;

const CreateQuestSchema = z
  .object({
    title: z.string().trim().min(1, 'Quest title is required.').max(120, 'Title cannot exceed 120 characters.'),
    description: z.string().optional().default(''),
    category: z.string().refine(
      (val) => ALLOWED_CATEGORIES.some((c) => c.toLowerCase() === val.toLowerCase()),
      { message: 'Invalid category. Choose Intellect, Strength, Discipline, Focus, or Creativity.' },
    ),
    difficulty: z
      .string()
      .optional()
      .refine(
        (val) => !val || ALLOWED_DIFFICULTIES.some((d) => d.toLowerCase() === val.toLowerCase()),
        { message: 'Invalid difficulty. Choose Trivial, Standard, Rare, Epic, or Legendary.' },
      ),
    rarity: z
      .string()
      .optional()
      .refine(
        (val) => !val || ALLOWED_DIFFICULTIES.some((d) => d.toLowerCase() === val.toLowerCase()),
        { message: 'Invalid rarity/difficulty.' },
      ),
    frequency: z
      .string()
      .optional()
      .default('ONE_TIME')
      .refine(
        (val) => ALLOWED_FREQUENCIES.some((f) => f.toLowerCase() === val.toLowerCase()),
        { message: 'Invalid frequency. Choose ONE_TIME or DAILY.' },
      ),
    due_date: z.string().optional().nullable(),
    deadline: z.string().optional().nullable(),
    risk: z.enum(['low', 'medium', 'high']).optional().default('medium'),
    emoji: z.string().optional(),
  })
  .refine(
    (data) => {
      const dateStr = data.due_date ?? data.deadline;
      if (!dateStr) return true;
      const parsed = new Date(dateStr);
      if (isNaN(parsed.getTime())) return false;
      // Compare with beginning of today
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return parsed >= today;
    },
    {
      message: 'Due date cannot be earlier than today.',
      path: ['due_date'],
    },
  );

function formatQuest(q: any) {
  return {
    id: q.id,
    title: q.title,
    description: q.description,
    category: q.category,
    difficulty: q.difficulty ?? q.rarity?.toUpperCase() ?? 'STANDARD',
    rarity: q.rarity,
    frequency: q.frequency ?? 'ONE_TIME',
    risk: q.risk,
    status: q.status,
    xp_reward: q.xpReward,
    gold_reward: q.goldReward,
    reward: { xp: q.xpReward, gold: q.goldReward },
    emoji: q.emoji,
    due_date: q.deadline,
    deadline: q.deadline,
    is_archived: q.isArchived,
    created_at: q.createdAt,
    updated_at: q.updatedAt,
  };
}

// GET /api/quests
export async function GET() {
  const session = await verifySession();
  if (!session) {
    return NextResponse.json(
      { success: false, error: { code: 'UNAUTHORIZED', message: 'Authentication required.' } },
      { status: 401 },
    );
  }

  const quests = await prisma.quest.findMany({
    where: {
      userId: session.userId,
      isArchived: false,
    },
    orderBy: [
      { status: 'asc' }, // active first, then available, then completed
      { createdAt: 'desc' },
    ],
  });

  const formatted = quests.map(formatQuest);

  // Return both array structure and blueprint envelope for seamless compatibility
  const response = NextResponse.json(formatted);
  // Also attach standard headers and fields
  return Object.assign(response, {
    success: true,
    data: { quests: formatted },
  });
}

export async function POST(req: NextRequest) {
  try {
    const session = await verifySession();
    if (!session) {
      return NextResponse.json(
        { success: false, error: { code: 'UNAUTHORIZED', message: 'Authentication required.' } },
        { status: 401 },
      );
    }

    const body = await req.json().catch(() => ({}));
    const parsed = CreateQuestSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: parsed.error.issues[0].message,
          },
        },
        { status: 400 },
      );
    }

    const { title, description, category, difficulty, rarity, frequency, due_date, deadline, risk, emoji } =
      parsed.data;

    const finalDifficulty = (difficulty ?? rarity ?? 'STANDARD').toUpperCase();
    const finalCategory = category.toUpperCase();
    const finalDueDate = due_date ?? deadline ?? null;
    const finalFrequency = frequency.toUpperCase();

    // Fetch player level for accurate server-side progression calculations
    const stats = await prisma.playerStats.findUnique({ where: { userId: session.userId } });
    const playerLevel = stats?.level ?? 1;

    // XP and Gold are strictly calculated on the server. Client input is never trusted.
    const rewards = calculateQuestReward(finalDifficulty, finalCategory, playerLevel);

    const emojiCategoryMap: Record<string, string> = {
      INTELLECT: '🧠',
      STRENGTH: '⚔️',
      DISCIPLINE: '🔥',
      FOCUS: '🧪',
      CREATIVITY: '🎨',
      MAIN: '⚡',
      SIDE: '🧪',
      ACTIVE: '🐉',
    };

    const finalEmoji = emoji || emojiCategoryMap[finalCategory] || '⚡';

    const quest = await prisma.quest.create({
      data: {
        userId: session.userId,
        title,
        description: description || 'No briefing recorded. Venture boldly.',
        category: finalCategory,
        difficulty: finalDifficulty,
        rarity: finalDifficulty.toLowerCase(),
        risk: risk || 'medium',
        frequency: finalFrequency,
        xpReward: rewards.xp,
        goldReward: rewards.gold,
        emoji: finalEmoji,
        deadline: finalDueDate,
        status: 'available',
      },
    });

    const formatted = formatQuest(quest);

    return NextResponse.json(
      {
        success: true,
        data: {
          quest: formatted,
        },
        // Top-level convenience properties
        quest: formatted,
        id: quest.id,
        title: quest.title,
        reward: formatted.reward,
        message: 'Quest forged successfully.',
      },
      { status: 201 },
    );
  } catch (err: any) {
    console.error('CRITICAL POST /api/quests ERROR:', err);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'SERVER_ERROR',
          message: err?.message || 'Internal server error while forging quest.',
          stack: process.env.NODE_ENV !== 'production' ? err?.stack : undefined,
        },
      },
      { status: 500 },
    );
  }
}
