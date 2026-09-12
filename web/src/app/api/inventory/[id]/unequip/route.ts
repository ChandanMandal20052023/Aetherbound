import { NextRequest, NextResponse } from 'next/server';
import { verifySession } from '@/lib/auth';
import { prisma } from '@/lib/db';

// POST /api/inventory/[id]/unequip
export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await verifySession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;

  const item = await prisma.inventoryItem.findFirst({
    where: { id, userId: session.userId },
  });
  if (!item) {
    return NextResponse.json({ error: 'Item not found' }, { status: 404 });
  }

  const updated = await prisma.inventoryItem.update({
    where: { id },
    data: { status: 'stored' },
  });

  return NextResponse.json({ id: updated.id, status: updated.status });
}
