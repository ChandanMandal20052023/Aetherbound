'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ShopBanner } from '@/components/shop/ShopBanner';
import { ShopSidebar } from '@/components/shop/ShopSidebar';
import { ShopItemCard } from '@/components/shop/ShopItemCard';
import { mockShopItems } from '@/lib/mock/shop';
import { mockPlayer } from '@/lib/mock/player';
import type { ShopItem, ShopCategory, SortOption } from '@/types/shop';
import { Button } from '@/components/ui/Button';

export default function ShopPage() {
  const [items, setItems] = useState<ShopItem[]>(mockShopItems);
  const [playerGold, setPlayerGold] = useState(mockPlayer.stats.gold);
  const [playerPeach, setPlayerPeach] = useState(mockPlayer.stats.sunlitPeach);
  const [selectedCategory, setSelectedCategory] = useState<ShopCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>('rarity-high');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handlePurchase = (item: ShopItem) => {
    if (playerGold < item.goldCost) {
      triggerToast('Insufficient Gold in celestial vault!');
      return;
    }

    setPlayerGold((prev) => prev - item.goldCost);
    if (item.peachCost) {
      setPlayerPeach((prev) => Math.max(0, prev - item.peachCost!));
    }

    triggerToast(`Acquired: "${item.name}"! Dispatched to your inventory.`);
  };

  const filteredItems = items
    .filter((item) => {
      const matchesCategory =
        selectedCategory === 'all' || item.category === selectedCategory;
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortOption === 'price-low') return a.goldCost - b.goldCost;
      if (sortOption === 'price-high') return b.goldCost - a.goldCost;
      if (sortOption === 'affordable-first') {
        const canA = playerGold >= a.goldCost ? 1 : 0;
        const canB = playerGold >= b.goldCost ? 1 : 0;
        return canB - canA;
      }
      // Rarity order
      const rarityRank = { legendary: 4, epic: 3, rare: 2, common: 1 };
      return rarityRank[b.rarity] - rarityRank[a.rarity];
    });

  const featuredItem = items.find((i) => i.id === 'shop-01') || items[0];

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-[#fad02c] text-black font-black text-sm px-4 py-3 rounded-xl border-pixel-thick shadow-solid-lg flex items-center gap-2 animate-bounce">
          <span>✨</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Banner */}
      <ShopBanner
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        sortOption={sortOption}
        onSortChange={setSortOption}
      />

      {/* Main 2-Column Catalog Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Category Sidebar (3 cols) */}
        <div className="lg:col-span-3">
          <ShopSidebar
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            gold={playerGold}
            peach={playerPeach}
          />
        </div>

        {/* Right Catalog Area (9 cols) */}
        <div className="lg:col-span-9 space-y-6">
          {/* Featured Spotlight Card */}
          <div className="bg-[#6853a8] border-pixel-thick shadow-solid-lg rounded-2xl p-5 sm:p-7 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-3 z-10 max-w-md">
              <div className="inline-block px-3 py-1 bg-[#fad02c] text-black text-xs font-black rounded border-2 border-black shadow-solid-sm uppercase -rotate-1">
                ★ FEATURED CELESTIAL RELIC
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight font-heading">
                {featuredItem.name}
              </h2>
              <p className="text-sm text-[#ebdcff] font-medium leading-relaxed italic">
                {featuredItem.description}
              </p>
              <div className="flex items-center gap-2 pt-1">
                {featuredItem.stats.map((st, i) => (
                  <span
                    key={i}
                    className="bg-[#130728] text-[#7ef9c7] text-xs font-black px-2.5 py-1 rounded border border-black"
                  >
                    {st.icon} {st.label}
                  </span>
                ))}
              </div>
              <div className="pt-2 flex items-center gap-3">
                <Button
                  variant="gold"
                  size="lg"
                  onClick={() => handlePurchase(featuredItem)}
                  withArrow
                >
                  FORGE RELIC • {featuredItem.goldCost} 🪙
                </Button>
              </div>
            </div>

            {/* Featured Image Frame */}
            <div className="w-56 h-64 relative border-4 border-black rounded-2xl overflow-hidden shadow-solid-lg bg-[#190c2d] rotate-2 shrink-0">
              <Image
                src={featuredItem.imageUrl}
                alt={featuredItem.name}
                fill
                className="object-cover object-top"
                sizes="240px"
              />
            </div>
          </div>

          {/* Product Catalog Grid */}
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b-2 border-black/50 pb-2">
              <h3 className="font-black text-white text-base uppercase tracking-wider font-heading">
                CATALOG SHOWCASE ({filteredItems.length} ITEMS)
              </h3>
              <span className="text-xs text-[#bccac1] font-bold">
                Cycle 3 Seasonal Stock
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredItems.map((item) => (
                <ShopItemCard
                  key={item.id}
                  item={item}
                  playerGold={playerGold}
                  playerLevel={mockPlayer.stats.level}
                  onPurchase={handlePurchase}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
