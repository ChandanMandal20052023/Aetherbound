'use client';

import React from 'react';
import type { ItemType, ItemRarity } from '@/types/inventory';

interface FilterPanelProps {
  selectedTypes: ItemType[];
  selectedRarities: ItemRarity[];
  statusFilter: 'all' | 'equipped' | 'stored';
  onToggleType: (type: ItemType) => void;
  onToggleRarity: (rarity: ItemRarity) => void;
  onStatusChange: (status: 'all' | 'equipped' | 'stored') => void;
  onClearFilters: () => void;
}

export function FilterPanel({
  selectedTypes,
  selectedRarities,
  statusFilter,
  onToggleType,
  onToggleRarity,
  onStatusChange,
  onClearFilters,
}: FilterPanelProps) {
  const itemTypes: { id: ItemType; label: string }[] = [
    { id: 'weapon', label: 'Weapon' },
    { id: 'armor', label: 'Armor' },
    { id: 'consumable', label: 'Consumable' },
    { id: 'cosmetic', label: 'Cosmetic' },
    { id: 'key-item', label: 'Key Item (Saga)' },
  ];

  const rarities: { id: ItemRarity; label: string; color: string }[] = [
    { id: 'common', label: 'Common', color: 'border-black text-[#bccac1]' },
    { id: 'rare', label: 'Rare', color: 'border-[#70C5FF] text-[#70C5FF]' },
    { id: 'epic', label: 'Epic', color: 'border-[#b892ff] text-[#b892ff]' },
    { id: 'legendary', label: 'Legendary', color: 'border-[#FAD02C] text-[#FAD02C]' },
  ];

  return (
    <div className="bg-[#201335] border-4 border-black p-4 sm:p-5 shadow-solid-lg relative rounded-xl">
      {/* Tape Sticker Badge */}
      <div className="absolute -top-3 left-4 bg-[#ffb68d] text-black font-black text-xs uppercase px-3 py-0.5 border-2 border-black shadow-solid-sm -rotate-1 tracking-wider">
        INVENTORY FILTERS
      </div>

      <div className="mt-3 flex flex-col gap-4">
        {/* Filter Group: Item Type */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="font-black text-white text-xs uppercase tracking-wider font-heading">
              ITEM TYPE
            </span>
            <span className="text-[10px] font-black text-[#7ef9c7] uppercase">
              {selectedTypes.length} ACTIVE
            </span>
          </div>

          <div className="grid grid-cols-2 gap-1.5">
            {itemTypes.map((t) => {
              const isChecked = selectedTypes.includes(t.id);
              const isColSpan = t.id === 'key-item';

              return (
                <label
                  key={t.id}
                  className={`flex items-center gap-2 border-2 border-black p-1.5 cursor-pointer rounded transition-colors ${
                    isChecked
                      ? 'bg-[#2a174a] text-white'
                      : 'bg-[#190c2d] text-[#86948c]'
                  } ${isColSpan ? 'col-span-2' : ''}`}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => onToggleType(t.id)}
                    className="w-3.5 h-3.5 text-[#7ef9c7] rounded accent-[#7ef9c7]"
                  />
                  <span className="text-[11px] font-bold uppercase truncate">
                    {t.label}
                  </span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Filter Group: Rarity Tier */}
        <div className="border-t-2 border-black/40 pt-3">
          <span className="font-black text-white text-xs uppercase tracking-wider block mb-2 font-heading">
            RARITY TIER
          </span>
          <div className="grid grid-cols-2 gap-1.5">
            {rarities.map((r) => {
              const isChecked = selectedRarities.includes(r.id);

              return (
                <label
                  key={r.id}
                  className={`flex items-center gap-1.5 bg-[#190c2d] border-2 p-1.5 cursor-pointer rounded ${r.color}`}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => onToggleRarity(r.id)}
                    className="w-3.5 h-3.5 accent-[#7ef9c7]"
                  />
                  <span className="text-[11px] font-black uppercase">
                    {r.label}
                  </span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Filter Group: Status */}
        <div className="border-t-2 border-black/40 pt-3">
          <span className="font-black text-white text-xs uppercase tracking-wider block mb-2 font-heading">
            EQUIPMENT STATUS
          </span>
          <div className="flex gap-1.5">
            {(['all', 'equipped', 'stored'] as const).map((status) => {
              const isSelected = statusFilter === status;
              return (
                <button
                  key={status}
                  type="button"
                  onClick={() => onStatusChange(status)}
                  className={`flex-1 py-1.5 px-2 font-black text-[11px] uppercase border-2 border-black rounded shadow-solid-sm transition-all ${
                    isSelected
                      ? 'bg-[#7ef9c7] text-black -translate-y-0.5'
                      : 'bg-[#190c2d] text-[#bccac1] hover:text-white'
                  }`}
                >
                  {status}
                </button>
              );
            })}
          </div>
        </div>

        {/* Clear Filters CTA */}
        <button
          type="button"
          onClick={onClearFilters}
          className="w-full mt-1 bg-[#ffb68d] hover:bg-[#ffa170] text-black font-black text-xs py-2 rounded border-2 border-black shadow-solid-sm btn-press flex items-center justify-center gap-1.5 uppercase"
        >
          <span className="material-symbols-outlined text-[16px]">
            filter_alt_off
          </span>
          <span>CLEAR ALL FILTERS</span>
        </button>
      </div>
    </div>
  );
}
