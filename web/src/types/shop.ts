export type ShopItemRarity = 'common' | 'rare' | 'epic' | 'legendary';
export type ShopCategory =
  | 'all'
  | 'characters'
  | 'gear'
  | 'weapons'
  | 'apparel'
  | 'badges'
  | 'consumables';

export type PurchaseStatus = 'available' | 'locked' | 'insufficient-gold' | 'milestone-only';

export interface ShopItemStat {
  label: string;
  icon: string;
}

export interface ShopItem {
  id: string;
  name: string;
  description: string;
  lore?: string;
  rarity: ShopItemRarity;
  category: ShopCategory;
  goldCost: number;
  peachCost?: number;
  requiredLevel?: number;
  imageUrl: string;
  stats: ShopItemStat[];
  purchaseStatus: PurchaseStatus;
  milestoneProgress?: number; // 0–100
}

export type SortOption =
  | 'rarity-high'
  | 'price-low'
  | 'price-high'
  | 'affordable-first';
