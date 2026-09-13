import { NextRequest, NextResponse } from 'next/server';
import { verifySession } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { calculateQuestReward } from '@/lib/progression';

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

// GET /api/quests/:id
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await verifySession();
  if (!session) {
    return NextResponse.json(
      { success: false, error: { code: 'UNAUTHORIZED', message: 'Authentication required.' } },
      { status: 401 },
    );
  }

  const { id } = await params;
  const quest = await prisma.quest.findFirst({
    where: { id, userId: session.userId, isArchived: false },
  });

  if (!quest) {
    return NextResponse.json(
      { success: false, error: { code: 'NOT_FOUND', message: 'Quest not found or access denied.' } },
      { status: 404 },
    );
  }

  return NextResponse.json({
    success: true,
    data: { quest: formatQuest(quest) },
  });
}

// PATCH /api/quests/:id
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await verifySession();
  if (!session) {
    return NextResponse.json(
      { success: false, error: { code: 'UNAUTHORIZED', message: 'Authentication required.' } },
      { status: 401 },
    );
  }

  const { id } = await params;
  const existingQuest = await prisma.quest.findFirst({
    where: { id, userId: session.userId },
  });

  if (!existingQuest) {
    return NextResponse.json(
      { success: false, error: { code: 'NOT_FOUND', message: 'Quest not found or access denied.' } },
      { status: 404 },
    );
  }

  const body = await req.json();
  const updateData: Record<string, any> = {};

  if (body.title !== undefined) updateData.title = String(body.title).trim();
  if (body.description !== undefined) updateData.description = String(body.description).trim();
  if (body.category !== undefined) updateData.category = String(body.category);
  if (body.status !== undefined) updateData.status = String(body.status);
  if (body.frequency !== undefined) updateData.frequency = String(body.frequency);
  if (body.is_archived !== undefined || body.isArchived !== undefined) {
    updateData.isArchived = Boolean(body.is_archived ?? body.isArchived);
  }
  if (body.due_date !== undefined || body.deadline !== undefined) {
    updateData.deadline = body.due_date ?? body.deadline;
  }

  if (body.difficulty !== undefined) {
    const diff = String(body.difficulty).toUpperCase();
    updateData.difficulty = diff;
    updateData.rarity = diff.toLowerCase();
    // Server recalculates rewards
    const stats = await prisma.playerStats.findUnique({ where: { userId: session.userId } });
    const reward = calculateQuestReward(
      diff,
      updateData.category ?? existingQuest.category,
      stats?.level ?? 1,
    );
    updateData.xpReward = reward.xp;
    updateData.goldReward = reward.gold;
  }

  const updatedQuest = await prisma.quest.update({
    where: { id },
    data: updateData,
  });

  return NextResponse.json({
    success: true,
    data: { quest: formatQuest(updatedQuest) },
    message: 'Quest updated successfully.',
  });
}

// DELETE /api/quests/:id
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await verifySession();
  if (!session) {
    return NextResponse.json(
      { success: false, error: { code: 'UNAUTHORIZED', message: 'Authentication required.' } },
      { status: 401 },
    );
  }

  const { id } = await params;
  const existingQuest = await prisma.quest.findFirst({
    where: { id, userId: session.userId },
  });

  if (!existingQuest) {
    return NextResponse.json(
      { success: false, error: { code: 'NOT_FOUND', message: 'Quest not found or access denied.' } },
      { status: 404 },
    );
  }

  await prisma.quest.delete({
    where: { id },
  });

  return NextResponse.json({
    success: true,
    message: 'Quest deleted successfully.',
  });
}
