'use client';

import React from 'react';
import Image from 'next/image';
import type { ShopItem } from '@/types/shop';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

interface ShopItemCardProps {
  item: ShopItem;
  playerGold: number;
  playerLevel: number;
  onPurchase: (item: ShopItem) => void;
}

export function ShopItemCard({
  item,
  playerGold,
  playerLevel,
  onPurchase,
}: ShopItemCardProps) {
  const isLockedByLevel =
    item.requiredLevel !== undefined && playerLevel < item.requiredLevel;
  const isInsufficientGold = playerGold < item.goldCost;
  const isMilestoneLocked = item.purchaseStatus === 'milestone-only';

  const rarityColors = {
    common: 'border-[#88dfbc] bg-[#88dfbc] text-black',
    rare: 'border-[#70c5ff] bg-[#70c5ff] text-black',
    epic: 'border-[#b892ff] bg-[#b892ff] text-black',
    legendary: 'border-[#fad02c] bg-[#fad02c] text-black',
  };

  return (
    <div className="bg-[#201335] border-4 border-black p-4 sm:p-5 shadow-solid-lg rounded-2xl flex flex-col justify-between relative group hover:-translate-y-1 transition-transform">
      <div>
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span
            className={cn(
              'font-black text-[10px] px-2.5 py-0.5 rounded border border-black uppercase shadow-solid-sm',
              rarityColors[item.rarity]
            )}
          >
            {item.rarity}
          </span>
          {item.requiredLevel && (
            <span className="bg-[#ff5a5a] text-white font-black text-[9px] px-2 py-0.5 rounded border border-black uppercase shadow-solid-sm">
              LVL {item.requiredLevel} REQ
            </span>
          )}
        </div>

        {/* Artwork Stage */}
        <div className="w-full h-44 bg-[#190c2d] border-3 border-black rounded-xl overflow-hidden relative mb-3 shadow-solid-sm">
          <Image
            src={item.imageUrl}
            alt={item.name}
            fill
            className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 300px"
          />
          {item.peachCost && (
            <div className="absolute top-2 right-2 bg-[#ffb68d] text-black text-[10px] font-black px-2 py-0.5 rounded border border-black shadow-solid-sm">
              🍑 {item.peachCost} Peach
            </div>
          )}
        </div>

        {/* Title & Lore */}
        <h3 className="text-lg font-black text-white uppercase tracking-tight font-heading">
          {item.name}
        </h3>
        <p className="text-xs text-[#bccac1] font-semibold mt-1 leading-relaxed line-clamp-2">
          {item.description}
        </p>

        {/* Stat chips */}
        <div className="flex flex-wrap gap-1.5 mt-2.5">
          {item.stats.map((st, idx) => (
            <span
              key={idx}
              className="bg-[#190c2d] text-[#7ef9c7] text-[10px] font-black px-2 py-0.5 rounded border border-black flex items-center gap-1"
            >
              <span>{st.icon}</span>
              <span>{st.label}</span>
            </span>
          ))}
        </div>

        {/* Milestone Bar if applicable */}
        {item.milestoneProgress !== undefined && (
          <div className="mt-3 space-y-1">
            <div className="flex justify-between text-[10px] font-black uppercase text-[#bccac1]">
              <span>Milestone Sync</span>
              <span className="text-[#ffb68d]">{item.milestoneProgress}%</span>
            </div>
            <div className="h-2 w-full bg-[#130728] border border-black rounded-full overflow-hidden">
              <div
                className="h-full bg-[#ffb68d]"
                style={{ width: `${item.milestoneProgress}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Purchase Action Footer */}
      <div className="mt-4 pt-3 border-t-2 border-black/40 flex items-center justify-between gap-3">
        <div className="flex items-center gap-1 font-mono font-black text-sm text-[#fad02c]">
          <span>🪙</span>
          <span>{item.goldCost.toLocaleString()}</span>
        </div>

        {isLockedByLevel ? (
          <Button variant="ghost" size="sm" disabled>
            LOCKED (L{item.requiredLevel})
          </Button>
        ) : isMilestoneLocked ? (
          <Button variant="ghost" size="sm" disabled>
            MILESTONE ONLY
          </Button>
        ) : isInsufficientGold ? (
          <Button variant="ghost" size="sm" disabled>
            NEED GOLD
          </Button>
        ) : (
          <Button
            variant="primary"
            size="sm"
            onClick={() => onPurchase(item)}
            withArrow
          >
            ACQUIRE
          </Button>
        )}
      </div>
    </div>
  );
}
