import { NextRequest, NextResponse } from 'next/server';
import { verifySession } from '@/lib/auth';
import { prisma } from '@/lib/db';

// POST /api/shop/[id]/purchase
export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await verifySession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;

  const [item, playerStats, alreadyOwned] = await Promise.all([
    prisma.shopItem.findUnique({ where: { id } }),
    prisma.playerStats.findUnique({ where: { userId: session.userId } }),
    prisma.ownedShopItem.findFirst({
      where: { userId: session.userId, shopItemId: id },
    }),
  ]);

  if (!item) return NextResponse.json({ error: 'Item not found' }, { status: 404 });
  if (!playerStats) return NextResponse.json({ error: 'Player not found' }, { status: 404 });
  if (alreadyOwned) return NextResponse.json({ error: 'Already owned' }, { status: 409 });

  if (item.requiredLevel && playerStats.level < item.requiredLevel) {
    return NextResponse.json(
      { error: `Requires level ${item.requiredLevel}` },
      { status: 403 },
    );
  }

  if (playerStats.gold < item.goldCost) {
    return NextResponse.json({ error: 'Insufficient gold' }, { status: 402 });
  }

  // Execute purchase in a transaction
  const [updatedStats] = await prisma.$transaction([
    prisma.playerStats.update({
      where: { userId: session.userId },
      data: {
        gold: playerStats.gold - item.goldCost,
        sunlitPeach: item.peachCost
          ? Math.max(0, playerStats.sunlitPeach - item.peachCost)
          : playerStats.sunlitPeach,
      },
    }),
    prisma.ownedShopItem.create({
      data: { userId: session.userId, shopItemId: id },
    }),
    // Add to inventory if it's a wearable item
    ...(item.category !== 'characters'
      ? [
          prisma.inventoryItem.create({
            data: {
              userId: session.userId,
              name: item.name,
              rarity: item.rarity,
              type: item.category === 'weapons' ? 'weapon' : item.category === 'consumables' ? 'consumable' : 'cosmetic',
              status: 'stored',
              icon: 'auto_awesome',
              stats: item.stats,
              lore: item.lore ?? null,
            },
          }),
        ]
      : []),
  ]);

  return NextResponse.json({
    success: true,
    newGold: updatedStats.gold,
    newSunlitPeach: updatedStats.sunlitPeach,
  });
}
