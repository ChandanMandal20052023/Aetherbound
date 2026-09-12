import type { ShopItem } from '@/types/shop';

export const shopService = {
  async getCatalog(): Promise<ShopItem[]> {
    const res = await fetch('/api/shop', { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch shop catalog');
    return res.json();
  },

  async purchaseItem(itemId: string): Promise<{
    success: boolean;
    newGold: number;
    newSunlitPeach: number;
  }> {
    const res = await fetch(`/api/shop/${itemId}/purchase`, { method: 'POST' });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error ?? 'Purchase failed');
    }
    return res.json();
  },
};
