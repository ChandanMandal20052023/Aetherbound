'use client';

import React from 'react';
import type { ShopCategory } from '@/types/shop';

interface ShopSidebarProps {
  selectedCategory: ShopCategory;
  onSelectCategory: (cat: ShopCategory) => void;
  gold: number;
  peach: number;
}

export function ShopSidebar({
  selectedCategory,
  onSelectCategory,
  gold,
  peach,
}: ShopSidebarProps) {
  const categories: { id: ShopCategory; label: string; icon: string }[] = [
    { id: 'all', label: 'All Relics', icon: '✦' },
    { id: 'characters', label: 'Vessels / Avatars', icon: '👤' },
    { id: 'weapons', label: 'Weapons', icon: '🗡️' },
    { id: 'gear', label: 'Armor & Gear', icon: '🛡️' },
    { id: 'apparel', label: 'Apparel', icon: '🥋' },
    { id: 'badges', label: 'Titles & Badges', icon: '🏷️' },
    { id: 'consumables', label: 'Consumables', icon: '🧪' },
  ];

  return (
    <aside className="space-y-4">
      {/* Category Filter Menu */}
      <div className="bg-[#201335] border-4 border-black p-4 sm:p-5 shadow-solid-lg rounded-xl">
        <h3 className="font-black text-white text-xs uppercase tracking-wider mb-3 font-heading">
          EMPORIUM CATEGORIES
        </h3>
        <div className="flex flex-col gap-1.5">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onSelectCategory(cat.id)}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-lg font-black text-xs uppercase tracking-wider border-2 transition-all text-left ${
                  isActive
                    ? 'bg-[#7ef9c7] text-black border-black shadow-solid-sm -translate-x-0.5'
                    : 'bg-[#190c2d] text-[#ebdcff] border-black/40 hover:bg-[#302445] hover:text-white'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Vault Balance Card */}
      <div className="bg-[#25193a] border-4 border-black p-4 shadow-solid-lg rounded-xl space-y-2">
        <h4 className="font-black text-[#ffb68d] text-xs uppercase tracking-wider font-heading">
          VAULT BALANCES
        </h4>
        <div className="bg-[#130728] border-2 border-black p-2.5 rounded-lg flex items-center justify-between">
          <div className="flex items-center gap-1.5 font-black text-xs text-[#fad02c]">
            <span>🪙</span>
            <span>GOLD</span>
          </div>
          <span className="font-mono font-black text-sm text-white">
            {gold.toLocaleString()}
          </span>
        </div>
        <div className="bg-[#130728] border-2 border-black p-2.5 rounded-lg flex items-center justify-between">
          <div className="flex items-center gap-1.5 font-black text-xs text-[#ffb68d]">
            <span>🍑</span>
            <span>SUNLIT PEACH</span>
          </div>
          <span className="font-mono font-black text-sm text-white">
            {peach.toLocaleString()}
          </span>
        </div>
      </div>
    </aside>
  );
}
