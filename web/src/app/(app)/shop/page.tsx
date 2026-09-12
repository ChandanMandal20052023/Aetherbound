'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ShopBanner } from '@/components/shop/ShopBanner';
import { ShopSidebar } from '@/components/shop/ShopSidebar';
import { ShopItemCard } from '@/components/shop/ShopItemCard';
import { shopService } from '@/services/shop.service';
import { playerService } from '@/services/player.service';
import type { ShopItem, ShopCategory, SortOption } from '@/types/shop';
import { Button } from '@/components/ui/Button';

export default function ShopPage() {
  const [items, setItems] = useState<ShopItem[]>([]);
  const [playerGold, setPlayerGold] = useState(0);
  const [playerPeach, setPlayerPeach] = useState(0);
  const [playerLevel, setPlayerLevel] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<ShopCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>('rarity-high');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const reload = async () => {
    const [catalog, profile] = await Promise.all([
      shopService.getCatalog(),
      playerService.getProfile(),
    ]);
    setItems(catalog);
    setPlayerGold(profile.stats.gold);
    setPlayerPeach(profile.stats.sunlitPeach);
    setPlayerLevel(profile.stats.level);
  };

  useEffect(() => {
    reload().catch(console.error).finally(() => setLoading(false));
  }, []);

  const handlePurchase = async (item: ShopItem) => {
    try {
      const result = await shopService.purchaseItem(item.id);
      setPlayerGold(result.newGold);
      setPlayerPeach(result.newSunlitPeach);
      // Refresh catalog to update purchaseStatus
      const catalog = await shopService.getCatalog();
      setItems(catalog);
      triggerToast(`Acquired: "${item.name}"! Dispatched to your inventory.`);
    } catch (err: unknown) {
      triggerToast(err instanceof Error ? err.message : 'Purchase failed');
    }
  };

  const filteredItems = items
    .filter((item) => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
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
      const rarityRank = { legendary: 4, epic: 3, rare: 2, common: 1 };
      return rarityRank[b.rarity as keyof typeof rarityRank] - rarityRank[a.rarity as keyof typeof rarityRank];
    });

  const featuredItem = items.find((i) => i.rarity === 'legendary') ?? items[0];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-[#fad02c] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-[#bccac1] font-bold text-sm uppercase tracking-wider">
            Loading Arcane Shop...
          </p>
        </div>
      </div>
    );
  }

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
          {featuredItem && (
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
          )}

          {/* Product Catalog Grid */}
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b-2 border-black/50 pb-2">
              <h3 className="font-black text-white text-base uppercase tracking-wider font-heading">
                CATALOG SHOWCASE ({filteredItems.length} ITEMS)
              </h3>
              <span className="text-xs text-[#bccac1] font-bold">Cycle 3 Seasonal Stock</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredItems.map((item) => (
                <ShopItemCard
                  key={item.id}
                  item={item}
                  playerGold={playerGold}
                  playerLevel={playerLevel}
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
