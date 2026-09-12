import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { z } from 'zod';
import { prisma } from '@/lib/db';
import { signAndSetCookie } from '@/lib/auth';
import { xpRequired, STARTER_GOLD, STARTER_XP, questXpReward, questGoldReward } from '@/lib/progression';
import { STARTER_QUESTS, STARTER_INVENTORY, SHOP_CATALOG } from '@/lib/seed-data';

const RegisterSchema = z.object({
  username: z.string().min(3).max(24).regex(/^[a-zA-Z0-9_]+$/, 'Username must be alphanumeric'),
  email: z.string().email(),
  password: z.string().min(6),
  avatarIndex: z.number().int().min(1).max(8).optional().default(1),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = RegisterSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
    }

    const { username, email, password, avatarIndex } = parsed.data;

    // Check uniqueness
    const existing = await prisma.user.findFirst({
      where: { OR: [{ email }, { username }] },
    });
    if (existing) {
      const field = existing.email === email ? 'Email' : 'Username';
      return NextResponse.json({ error: `${field} already registered` }, { status: 409 });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    // Seed shop catalog if this is the first user ever
    const shopCount = await prisma.shopItem.count();
    if (shopCount === 0) {
      await prisma.shopItem.createMany({
        data: SHOP_CATALOG.map((item) => ({
          ...item,
          stats: JSON.stringify(item.stats),
          peachCost: item.peachCost ?? null,
          requiredLevel: item.requiredLevel ?? null,
          milestoneProgress: item.milestoneProgress ?? null,
          lore: item.lore ?? null,
        })),
      });
    }

    // Create user with all related data in a transaction
    const user = await prisma.$transaction(async (tx) => {
      const newUser = await tx.user.create({
        data: { username, email, passwordHash, avatarIndex },
      });

      // Seed PlayerStats
      await tx.playerStats.create({
        data: {
          userId: newUser.id,
          level: 1,
          xp: STARTER_XP,
          xpToNextLevel: xpRequired(1),
          gold: STARTER_GOLD,
          sunlitPeach: 50,
        },
      });

      // Seed starter quests (rewards calculated via progression math at level 1)
      await tx.quest.createMany({
        data: STARTER_QUESTS.map((q) => ({
          userId: newUser.id,
          title: q.title,
          description: q.description,
          category: q.category,
          rarity: q.rarity,
          risk: q.risk,
          emoji: q.emoji,
          xpReward: questXpReward(1, q.rarity, q.risk),
          goldReward: questGoldReward(1, q.rarity, q.risk),
          status: q.category === 'active' ? 'active' : 'available',
        })),
      });

      // Seed starter inventory
      await tx.inventoryItem.createMany({
        data: STARTER_INVENTORY.map((item) => ({
          userId: newUser.id,
          name: item.name,
          rarity: item.rarity,
          type: item.type,
          status: item.status,
          icon: item.icon,
          slot: item.slot ?? null,
          stats: JSON.stringify(item.stats),
          lore: item.lore ?? null,
        })),
      });

      return newUser;
    });

    await signAndSetCookie({ userId: user.id, email: user.email, username: user.username });

    return NextResponse.json({
      id: user.id,
      username: user.username,
      email: user.email,
      avatarIndex: user.avatarIndex,
    }, { status: 201 });
  } catch (err) {
    console.error('[register]', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
