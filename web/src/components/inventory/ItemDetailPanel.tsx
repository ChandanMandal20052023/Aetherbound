'use client';

import React from 'react';
import type { InventoryItem } from '@/types/inventory';
import { Button } from '@/components/ui/Button';

interface ItemDetailPanelProps {
  item: InventoryItem | null;
  onEquip?: (item: InventoryItem) => void;
  onUnequip?: (item: InventoryItem) => void;
}

export function ItemDetailPanel({
  item,
  onEquip,
  onUnequip,
}: ItemDetailPanelProps) {
  if (!item) {
    return (
      <div className="bg-[#201335] border-4 border-black p-5 shadow-solid-lg rounded-xl text-center text-[#bccac1]">
        <span className="text-3xl mb-2 block">🔍</span>
        <p className="font-bold text-sm">Select an item from the matrix to inspect specifications.</p>
      </div>
    );
  }

  const isEquipped = item.status === 'equipped';

  return (
    <div className="bg-[#201335] border-4 border-black p-5 shadow-solid-lg relative rounded-xl space-y-4">
      {/* Top Sticker Badge */}
      <div className="flex justify-between items-start">
        <div className="bg-[#ffb68d] text-black font-black text-xs uppercase px-3 py-0.5 border-2 border-black shadow-solid-sm -rotate-1 tracking-wider rounded">
          DETAIL INSPECTOR
        </div>
        <div className="w-7 h-7 bg-[#ffb68d] text-black border-2 border-black shadow-solid-sm flex items-center justify-center font-black text-xs rounded">
          i
        </div>
      </div>

      {/* Item Title & Rarity */}
      <div className="border-b-2 border-black/40 pb-3 space-y-1.5">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#fad02c] text-2xl">
            star
          </span>
          <h2 className="text-xl font-black text-white uppercase tracking-tight font-heading">
            {item.name}
          </h2>
        </div>
        <div>
          <span
            className={`inline-flex items-center gap-1 font-black text-[10px] px-2.5 py-0.5 border-2 border-black shadow-solid-sm rounded uppercase ${
              item.rarity === 'legendary'
                ? 'bg-[#fad02c] text-black'
                : item.rarity === 'epic'
                ? 'bg-[#b892ff] text-black'
                : item.rarity === 'rare'
                ? 'bg-[#70c5ff] text-black'
                : 'bg-[#88dfbc] text-black'
            }`}
          >
            ✦ {item.rarity} Relic
          </span>
        </div>
      </div>

      {/* Stats Section */}
      <div className="border-b-2 border-black/40 pb-3 space-y-2">
        <span className="font-black text-xs uppercase tracking-wider text-[#bccac1] block font-heading">
          TACTICAL ATTRIBUTES
        </span>
        <div className="space-y-1.5">
          {item.stats.map((stat, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between text-xs font-black bg-[#190c2d] border border-black p-2 rounded"
            >
              <span className="text-[#7ef9c7]">{stat.label}</span>
              <span className="text-white font-mono">{stat.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Lore Description */}
      {item.lore && (
        <div className="border-b-2 border-black/40 pb-3 space-y-1">
          <span className="font-black text-xs uppercase tracking-wider text-[#bccac1] block font-heading">
            CODEX LORE
          </span>
          <p className="text-xs text-[#ebdcff] font-medium leading-relaxed italic bg-[#190c2d]/50 p-2.5 rounded border border-black/30">
            {item.lore}
          </p>
        </div>
      )}

      {/* Actions */}
      <div className="pt-1 space-y-2">
        {isEquipped ? (
          <Button
            variant="secondary"
            size="md"
            fullWidth
            onClick={() => onUnequip && onUnequip(item)}
          >
            UNEQUIP ITEM
          </Button>
        ) : (
          <Button
            variant="primary"
            size="md"
            fullWidth
            onClick={() => onEquip && onEquip(item)}
            withArrow
          >
            EQUIP TO LOADOUT
          </Button>
        )}
      </div>
    </div>
  );
}
