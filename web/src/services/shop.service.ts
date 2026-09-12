import { mockShopItems } from '@/lib/mock/shop';
import type { ShopItem } from '@/types/shop';

export const shopService = {
  async getCatalog(): Promise<ShopItem[]> {
    return mockShopItems;
  },
};
