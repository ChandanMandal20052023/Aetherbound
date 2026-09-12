'use client';

import React from 'react';
import type { InventoryItem } from '@/types/inventory';
import { cn } from '@/lib/utils';

interface InventoryTileProps {
  item: InventoryItem;
  isSelected: boolean;
  onSelect: (item: InventoryItem) => void;
}

export function InventoryTile({
  item,
  isSelected,
  onSelect,
}: InventoryTileProps) {
  const rarityColors = {
    common: {
      border: 'border-[#88dfbc]',
      badge: 'bg-[#88dfbc] text-black',
      iconText: 'text-[#88dfbc]',
    },
    rare: {
      border: 'border-[#70c5ff]',
      badge: 'bg-[#70c5ff] text-black',
      iconText: 'text-[#70c5ff]',
    },
    epic: {
      border: 'border-[#b892ff]',
      badge: 'bg-[#b892ff] text-black',
      iconText: 'text-[#b892ff]',
    },
    legendary: {
      border: 'border-[#fad02c]',
      badge: 'bg-[#fad02c] text-black',
      iconText: 'text-[#fad02c]',
    },
  };

  const theme = rarityColors[item.rarity];

  return (
    <div
      onClick={() => onSelect(item)}
      className={cn(
        'relative bg-[#25193a] border-3 p-2.5 flex flex-col items-center justify-between rounded-xl shadow-solid cursor-pointer select-none transition-all',
        theme.border,
        isSelected
          ? 'ring-2 ring-[#7ef9c7] -translate-y-1 bg-[#302445]'
          : 'hover:-translate-y-0.5'
      )}
    >
      {/* Selected Active Marker */}
      {isSelected && (
        <div className="absolute -top-2.5 -right-2 bg-[#7ef9c7] text-black font-black text-[9px] px-1.5 py-0.5 border border-black rotate-6 shadow-solid-sm rounded uppercase">
          ACTIVE
        </div>
      )}

      {/* Item Title Header Strip */}
      <div
        className={cn(
          'w-full py-0.5 px-1 text-center rounded mb-1.5 border border-black/40',
          item.rarity === 'legendary'
            ? 'bg-[#fad02c]/20 text-[#fad02c]'
            : item.rarity === 'epic'
            ? 'bg-[#b892ff]/20 text-[#b892ff]'
            : item.rarity === 'rare'
            ? 'bg-[#70c5ff]/20 text-[#70c5ff]'
            : 'bg-[#88dfbc]/20 text-[#88dfbc]'
        )}
      >
        <span className="text-[10px] font-black truncate block uppercase">
          {item.name}
        </span>
      </div>

      {/* Center Icon Box */}
      <div className="w-14 h-14 bg-[#190c2d] border-2 border-black flex items-center justify-center my-1 rounded-lg relative overflow-hidden shadow-solid-sm">
        <span
          className={cn(
            'material-symbols-outlined text-[32px] relative z-10',
            theme.iconText
          )}
        >
          {item.icon}
        </span>
      </div>

      {/* Footer Strip */}
      <div className="w-full text-center mt-1">
        <span
          className={cn(
            'inline-block text-[9px] font-black px-2 py-0.5 border border-black rounded uppercase shadow-solid-sm',
            theme.badge
          )}
        >
          {item.rarity}
        </span>
        <span className="block text-[10px] text-[#bccac1] font-semibold mt-0.5 capitalize truncate">
          {item.stats[0]?.label || item.type}
        </span>
      </div>
    </div>
  );
}
