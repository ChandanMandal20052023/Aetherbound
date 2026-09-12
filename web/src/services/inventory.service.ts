import type { InventoryItem, EquipmentLoadout } from '@/types/inventory';

export const inventoryService = {
  async getInventory(): Promise<InventoryItem[]> {
    const res = await fetch('/api/inventory', { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch inventory');
    return res.json();
  },

  /** Derives equipment loadout from the items list (equipped items with a slot). */
  extractEquipment(items: InventoryItem[]): EquipmentLoadout {
    const equipped = items.filter((i) => i.status === 'equipped' && i.slot);
    return {
      head:   equipped.find((i) => i.slot === 'head'),
      chest:  equipped.find((i) => i.slot === 'chest'),
      weapon: equipped.find((i) => i.slot === 'weapon'),
      boots:  equipped.find((i) => i.slot === 'boots'),
    };
  },

  async equipItem(itemId: string): Promise<{ id: string; status: string }> {
    const res = await fetch(`/api/inventory/${itemId}/equip`, { method: 'POST' });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error ?? 'Failed to equip item');
    }
    return res.json();
  },

  async unequipItem(itemId: string): Promise<{ id: string; status: string }> {
    const res = await fetch(`/api/inventory/${itemId}/unequip`, { method: 'POST' });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error ?? 'Failed to unequip item');
    }
    return res.json();
  },
};
