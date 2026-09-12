import { NextRequest, NextResponse } from 'next/server';
import { verifySession } from '@/lib/auth';
import { prisma } from '@/lib/db';

// GET /api/inventory
export async function GET() {
  const session = await verifySession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const items = await prisma.inventoryItem.findMany({
    where: { userId: session.userId },
    orderBy: [{ status: 'asc' }, { rarity: 'desc' }],
  });

  return NextResponse.json(
    items.map((item) => ({
      id: item.id,
      name: item.name,
      rarity: item.rarity,
      type: item.type,
      status: item.status,
      icon: item.icon,
      slot: item.slot ?? undefined,
      stats: JSON.parse(item.stats),
      lore: item.lore ?? undefined,
    })),
  );
}
