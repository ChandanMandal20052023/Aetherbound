import { mockInventoryItems, mockEquipment } from '@/lib/mock/inventory';
import type { InventoryItem, EquipmentLoadout } from '@/types/inventory';

export const inventoryService = {
  async getInventory(): Promise<InventoryItem[]> {
    return mockInventoryItems;
  },

  async getEquipment(): Promise<EquipmentLoadout> {
    return mockEquipment;
  },
};
