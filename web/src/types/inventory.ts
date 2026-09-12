export type ItemRarity = 'common' | 'rare' | 'epic' | 'legendary';
export type ItemType = 'weapon' | 'armor' | 'consumable' | 'cosmetic' | 'key-item';
export type ItemStatus = 'equipped' | 'stored';

export interface ItemStat {
  label: string;
  value: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  rarity: ItemRarity;
  type: ItemType;
  status: ItemStatus;
  icon: string; // Material Symbol name
  stats: ItemStat[];
  lore?: string;
  slot?: 'head' | 'chest' | 'weapon' | 'boots' | 'accessory';
}

export interface EquipmentLoadout {
  head?: InventoryItem;
  chest?: InventoryItem;
  weapon?: InventoryItem;
  boots?: InventoryItem;
}

export interface InventoryState {
  items: InventoryItem[];
  capacity: number;
  equipped: EquipmentLoadout;
  totalWeight: number;
  maxWeight: number;
}

export interface InventoryFilters {
  types: ItemType[];
  rarities: ItemRarity[];
  status: 'all' | 'equipped' | 'stored';
}
