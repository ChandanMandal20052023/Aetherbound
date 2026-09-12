'use client';

import React, { useState, useEffect } from 'react';
import { FilterPanel } from '@/components/inventory/FilterPanel';
import { EquipmentDoll } from '@/components/inventory/EquipmentDoll';
import { InventoryTile } from '@/components/inventory/InventoryTile';
import { ItemDetailPanel } from '@/components/inventory/ItemDetailPanel';
import { inventoryService } from '@/services/inventory.service';
import type { InventoryItem, ItemType, ItemRarity, EquipmentLoadout } from '@/types/inventory';

export default function InventoryPage() {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [equipment, setEquipment] = useState<EquipmentLoadout>({});
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [loading, setLoading] = useState(true);

  const [selectedTypes, setSelectedTypes] = useState<ItemType[]>([
    'weapon', 'armor', 'consumable', 'cosmetic', 'key-item',
  ]);
  const [selectedRarities, setSelectedRarities] = useState<ItemRarity[]>([
    'common', 'rare', 'epic', 'legendary',
  ]);
  const [statusFilter, setStatusFilter] = useState<'all' | 'equipped' | 'stored'>('all');
  const [emptyDemo, setEmptyDemo] = useState(false);

  const reload = async () => {
    const fetched = await inventoryService.getInventory();
    setItems(fetched);
    setEquipment(inventoryService.extractEquipment(fetched));
    if (!selectedItem) setSelectedItem(fetched[0] ?? null);
  };

  useEffect(() => {
    reload().catch(console.error).finally(() => setLoading(false));
  }, []);

  const toggleType = (type: ItemType) =>
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type],
    );

  const toggleRarity = (rarity: ItemRarity) =>
    setSelectedRarities((prev) =>
      prev.includes(rarity) ? prev.filter((r) => r !== rarity) : [...prev, rarity],
    );

  const clearFilters = () => {
    setSelectedTypes(['weapon', 'armor', 'consumable', 'cosmetic', 'key-item']);
    setSelectedRarities(['common', 'rare', 'epic', 'legendary']);
    setStatusFilter('all');
    setEmptyDemo(false);
  };

  const handleEquip = async (item: InventoryItem) => {
    await inventoryService.equipItem(item.id);
    await reload();
    setSelectedItem({ ...item, status: 'equipped' });
  };

  const handleUnequip = async (item: InventoryItem) => {
    await inventoryService.unequipItem(item.id);
    await reload();
    setSelectedItem({ ...item, status: 'stored' });
  };

  const filteredItems = emptyDemo
    ? []
    : items.filter((item) => {
        const matchesType = selectedTypes.includes(item.type);
        const matchesRarity = selectedRarities.includes(item.rarity);
        const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
        return matchesType && matchesRarity && matchesStatus;
      });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-[#b892ff] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-[#bccac1] font-bold text-sm uppercase tracking-wider">
            Loading Inventory...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Sub-bar Status Header */}
      <div className="bg-[#130728] border-2 border-black py-2 px-4 rounded-xl flex flex-wrap justify-between items-center text-xs text-[#bccac1]">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2.5 h-2.5 bg-[#7ef9c7] rounded-full border border-black animate-pulse" />
          <span>
            Aetherbound Life • Inventory System •{' '}
            <span className="text-[#7ef9c7] font-extrabold uppercase">Filtered Matrix Active</span>
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-[10px] font-black uppercase text-[#ffb68d]">
            PROTOCOL: ARCANE_INSPECTOR
          </span>
        </div>
      </div>

      {/* Main 3-Column Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Column 1: Filters & Paper Doll (4 cols) */}
        <div className="lg:col-span-4 space-y-5">
          <FilterPanel
            selectedTypes={selectedTypes}
            selectedRarities={selectedRarities}
            statusFilter={statusFilter}
            onToggleType={toggleType}
            onToggleRarity={toggleRarity}
            onStatusChange={setStatusFilter}
            onClearFilters={clearFilters}
          />
          <EquipmentDoll equipment={equipment} />
        </div>

        {/* Column 2: Inventory Grid (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[#201335] border-4 border-black p-4 sm:p-5 shadow-solid-lg relative rounded-xl">
            <div className="absolute -top-3.5 left-6 bg-[#7ef9c7] text-black font-black text-xs uppercase px-4 py-0.5 border-2 border-black shadow-solid-sm -rotate-1 flex items-center gap-1.5 rounded">
              <span>✦</span>
              <span>INVENTORY MATRIX</span>
            </div>

            <div className="mt-3 mb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b-2 border-black/50 pb-2.5">
              <div>
                <h3 className="font-black text-white text-lg tracking-tight uppercase font-heading">
                  EQUIPMENT SLOTS
                </h3>
                <p className="text-[11px] text-[#bccac1] font-semibold mt-0.5">
                  Showing {filteredItems.length} relics in bag
                </p>
              </div>
              <div className="flex items-center gap-1 bg-[#130728] border-2 border-black p-0.5 rounded">
                <button
                  type="button"
                  onClick={() => setEmptyDemo(false)}
                  className={`px-2 py-0.5 font-black text-[10px] border rounded ${
                    !emptyDemo ? 'bg-[#7ef9c7] text-black border-black' : 'text-[#bccac1] border-transparent'
                  }`}
                >
                  GRID
                </button>
                <button
                  type="button"
                  onClick={() => setEmptyDemo(true)}
                  className={`px-2 py-0.5 font-black text-[10px] border rounded ${
                    emptyDemo ? 'bg-[#ffb68d] text-black border-black' : 'text-[#bccac1] border-transparent'
                  }`}
                >
                  EMPTY DEMO
                </button>
              </div>
            </div>

            {filteredItems.length === 0 ? (
              <div className="bg-[#190c2d] border-2 border-dashed border-[#ffb68d]/60 p-6 text-center rounded-lg space-y-2">
                <span className="material-symbols-outlined text-[#ffb68d] text-3xl">inventory_2</span>
                <h4 className="font-black text-white text-sm uppercase font-heading">
                  No Items Match Active Filters
                </h4>
                <p className="text-xs text-[#bccac1] max-w-xs mx-auto">
                  Your astral pouch contains no relics matching the active parameters.
                </p>
                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-2 bg-[#ffb68d] text-black font-black text-xs px-3 py-1.5 border-2 border-black rounded uppercase shadow-solid-sm"
                >
                  RESET FILTERS
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {filteredItems.map((item) => (
                  <InventoryTile
                    key={item.id}
                    item={item}
                    isSelected={selectedItem?.id === item.id}
                    onSelect={setSelectedItem}
                  />
                ))}
              </div>
            )}

            <div className="mt-4 pt-3 border-t-2 border-black flex items-center justify-between text-xs text-[#bccac1]">
              <span className="flex items-center gap-1 text-[#7ef9c7] font-black text-[11px] uppercase">
                SORT: RARITY (HIGH TO LOW)
              </span>
              <span className="font-black text-white text-[11px]">
                SLOTS: {filteredItems.length}/12 OCCUPIED
              </span>
            </div>
          </div>
        </div>

        {/* Column 3: Item Detail Inspector (3 cols) */}
        <div className="lg:col-span-3">
          <ItemDetailPanel
            item={selectedItem}
            onEquip={handleEquip}
            onUnequip={handleUnequip}
          />
        </div>
      </div>
    </div>
  );
}
