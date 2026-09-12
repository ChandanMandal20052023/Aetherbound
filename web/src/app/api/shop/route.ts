import { NextResponse } from 'next/server';
import { verifySession } from '@/lib/auth';
import { prisma } from '@/lib/db';

// GET /api/shop
export async function GET() {
  const session = await verifySession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const [shopItems, playerStats, ownedItems] = await Promise.all([
    prisma.shopItem.findMany({ orderBy: { goldCost: 'asc' } }),
    prisma.playerStats.findUnique({ where: { userId: session.userId } }),
    prisma.ownedShopItem.findMany({ where: { userId: session.userId } }),
  ]);

  const ownedIds = new Set(ownedItems.map((o) => o.shopItemId));
  const playerLevel = playerStats?.level ?? 1;
  const playerGold = playerStats?.gold ?? 0;

  return NextResponse.json(
    shopItems.map((item) => {
      const owned = ownedIds.has(item.id);
      let purchaseStatus: string;

      if (owned) {
        purchaseStatus = 'owned';
      } else if (item.requiredLevel && playerLevel < item.requiredLevel) {
        purchaseStatus = 'locked';
      } else if (playerGold < item.goldCost) {
        purchaseStatus = 'insufficient-gold';
      } else if (item.milestoneProgress !== null && item.milestoneProgress !== undefined && item.milestoneProgress < 100 && item.goldCost > 3000) {
        purchaseStatus = 'milestone-only';
      } else {
        purchaseStatus = 'available';
      }

      return {
        id: item.id,
        name: item.name,
        description: item.description,
        lore: item.lore ?? undefined,
        rarity: item.rarity,
        category: item.category,
        goldCost: item.goldCost,
        peachCost: item.peachCost ?? undefined,
        requiredLevel: item.requiredLevel ?? undefined,
        imageUrl: item.imageUrl,
        stats: JSON.parse(item.stats),
        purchaseStatus,
        milestoneProgress: item.milestoneProgress ?? undefined,
      };
    }),
  );
}
